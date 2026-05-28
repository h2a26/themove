'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

type CategoryFilter = 'all' | 'residential' | 'commercial' | 'hospitality'

interface SearchResult {
  id:       string
  title:    string
  meta:     string
  href:     string
  type:     'project' | 'book'
  category: string
}

const CATEGORIES: { value: CategoryFilter; label: string }[] = [
  { value: 'all',         label: 'All'         },
  { value: 'residential', label: 'Residential' },
  { value: 'commercial',  label: 'Commercial'  },
  { value: 'hospitality', label: 'Hospitality' },
]

interface SearchOverlayProps {
  open:    boolean
  onClose: () => void
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const router    = useRouter()
  const inputRef  = useRef<HTMLInputElement>(null)
  const [query,    setQuery   ] = useState('')
  const [focused,  setFocused ] = useState(0)
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [allProjects, setAllProjects] = useState<SearchResult[]>([])
  const [allBooks,    setAllBooks   ] = useState<SearchResult[]>([])

  // Fetch once on first open
  const fetchedRef = useRef(false)
  useEffect(() => {
    if (!open || fetchedRef.current) return
    fetchedRef.current = true
    fetch('/api/search-data')
      .then((r) => r.json())
      .then(({ projects, books }: { projects: SearchResult[]; books: SearchResult[] }) => {
        setAllProjects(projects)
        setAllBooks(books)
      })
      .catch(() => { /* silently fail — stale data still works */ })
  }, [open])

  const allResults = useMemo(() => [...allProjects, ...allBooks], [allProjects, allBooks])

  const categoryCount = useMemo(() => {
    if (category === 'all') return allProjects.length
    return allProjects.filter((r) => r.category === category).length
  }, [category, allProjects])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const pool = category === 'all'
      ? allResults
      : allResults.filter((r) => r.type !== 'project' || r.category === category)
    // No query + no category selected → show nothing (empty state hint)
    if (!q && category === 'all') return []
    // Category selected but no query → show all in that category
    if (!q) return pool.slice(0, 20)
    return pool.filter(
      (r) => r.title.toLowerCase().includes(q) || r.meta.toLowerCase().includes(q)
    ).slice(0, 10)
  }, [query, category, allResults])

  // Reset on open/close
  useEffect(() => {
    if (open) {
      setQuery('')
      setFocused(0)
      setCategory('all')
      setTimeout(() => inputRef.current?.focus(), 60)
    }
  }, [open])

  // Keyboard navigation
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowDown') { e.preventDefault(); setFocused((f) => Math.min(f + 1, results.length - 1)) }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setFocused((f) => Math.max(f - 1, 0)) }
      if (e.key === 'Enter' && results[focused]) navigate(results[focused])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, results, focused, onClose])

  useEffect(() => setFocused(0), [results])

  function navigate(result: SearchResult) {
    router.push(result.href)
    onClose()
  }

  const projectResults = results.filter((r: SearchResult) => r.type === 'project')
  const bookResults    = results.filter((r: SearchResult) => r.type === 'book')

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col"
          style={{
            backgroundColor: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-8 text-[var(--mode-text-tertiary)] hover:text-[var(--mode-text-primary)] transition-colors"
            aria-label="Close search"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="w-full max-w-2xl mx-auto px-6 pt-24 pb-8 flex flex-col">
            {/* Input row */}
            <div className="flex items-center gap-4 border-b border-[var(--mode-stroke-faint)] pb-4">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-[var(--mode-text-tertiary)] flex-none" aria-hidden="true">
                <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M12 12l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, books…"
                className="flex-1 bg-transparent text-[20px] tracking-wide text-[var(--mode-text-primary)] placeholder:text-[var(--mode-text-tertiary)] outline-none"
                style={{ fontFamily: 'var(--font-acaslon-pro)' }}
                autoComplete="off"
                spellCheck="false"
              />
              {query && (
                <button
                  onClick={() => { setQuery(''); inputRef.current?.focus() }}
                  className="text-[var(--mode-text-tertiary)] hover:text-[var(--mode-text-primary)] transition-colors flex-none"
                  aria-label="Clear"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </button>
              )}
            </div>

            {/* Category filter */}
            <div className="flex gap-7 mt-3.5">
              {CATEGORIES.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => { setCategory(value); setFocused(0) }}
                  className={`text-[9px] uppercase tracking-[3px] transition-colors duration-200 ${
                    category === value
                      ? 'text-[var(--mode-cord)]'
                      : 'text-[var(--mode-text-tertiary)] hover:text-[var(--mode-text-secondary)]'
                  }`}
                  style={{ fontFamily: 'var(--font-acaslon-pro)' }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Results */}
            <AnimatePresence mode="wait">
              {results.length > 0 && (
                <motion.div
                  className="mt-5 space-y-6"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {projectResults.length > 0 && (
                    <ResultGroup
                      label="Projects"
                      items={projectResults}
                      allResults={results}
                      focusedIndex={focused}
                      onNavigate={navigate}
                      onHover={setFocused}
                    />
                  )}
                  {bookResults.length > 0 && (
                    <ResultGroup
                      label="Books"
                      items={bookResults}
                      allResults={results}
                      focusedIndex={focused}
                      onNavigate={navigate}
                      onHover={setFocused}
                    />
                  )}
                </motion.div>
              )}

              {query.trim() && results.length === 0 && (
                <motion.p
                  className="mt-8 text-[13px] text-[var(--mode-text-tertiary)] tracking-widest uppercase text-center"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{ fontFamily: 'var(--font-acaslon-pro)' }}
                >
                  No results for &ldquo;{query}&rdquo;
                </motion.p>
              )}

              {!query.trim() && (
                <motion.p
                  className="mt-8 text-[11px] text-[var(--mode-text-tertiary)] tracking-[3px] uppercase text-center"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{ fontFamily: 'var(--font-acaslon-pro)' }}
                >
                  {category === 'all'
                    ? `${allProjects.length} projects · ${allBooks.length} books`
                    : `${categoryCount} ${category} projects`}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Hint */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-6">
            {[['↑↓', 'navigate'], ['↵', 'open'], ['esc', 'close']].map(([key, label]) => (
              <span key={key} className="flex items-center gap-1.5 text-[10px] text-[var(--mode-text-tertiary)] tracking-widest uppercase" style={{ fontFamily: 'var(--font-acaslon-pro)' }}>
                <kbd className="px-1.5 py-0.5 border border-[var(--mode-stroke-faint)] rounded text-[9px]">{key}</kbd>
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ResultGroup({
  label, items, allResults, focusedIndex, onNavigate, onHover,
}: {
  label:        string
  items:        SearchResult[]
  allResults:   SearchResult[]
  focusedIndex: number
  onNavigate:   (r: SearchResult) => void
  onHover:      (i: number) => void
}) {
  return (
    <div>
      <p
        className="text-[9px] uppercase tracking-[4px] text-[var(--mode-text-tertiary)] mb-2 px-2"
        style={{ fontFamily: 'var(--font-acaslon-pro)' }}
      >
        {label}
      </p>
      <ul>
        {items.map((item) => {
          const globalIndex = allResults.indexOf(item)
          const isFocused   = globalIndex === focusedIndex
          return (
            <li key={item.id}>
              <button
                className={`w-full text-left px-3 py-2.5 rounded flex items-baseline gap-3 transition-colors duration-100 ${
                  isFocused
                    ? 'bg-[var(--mode-surface)] text-[var(--mode-cord)]'
                    : 'text-[var(--mode-text-primary)] hover:bg-[var(--mode-surface)]'
                }`}
                onClick={() => onNavigate(item)}
                onMouseEnter={() => onHover(globalIndex)}
              >
                <span
                  className="text-[13px] font-bold tracking-wide flex-1 truncate"
                  style={{ fontFamily: 'var(--font-acaslon-pro)' }}
                >
                  {item.title}
                </span>
                <span
                  className="text-[10px] tracking-widest uppercase text-[var(--mode-text-tertiary)] flex-none"
                  style={{ fontFamily: 'var(--font-acaslon-pro)' }}
                >
                  {item.meta}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
