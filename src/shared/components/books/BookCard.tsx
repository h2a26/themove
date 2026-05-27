'use client'

import dynamic from 'next/dynamic'
import { Book } from '@/shared/types/book'

const BookCover = dynamic(() => import('./BookCover'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 animate-pulse bg-[var(--mode-surface)]" />,
})

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  return (
    <a
      href={book.pdfUrl}
      download
      className="group relative block cursor-pointer"
      aria-label={`Download ${book.title}`}
    >
      {/* Cover — natural PDF page ratio */}
      <div className="relative overflow-hidden bg-[var(--mode-surface)]" style={{ aspectRatio: '1 / 1.414' }}>
        <BookCover pdfUrl={book.pdfUrl} />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex flex-col items-center justify-center gap-3">
          <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex flex-col items-center gap-2">
            {/* Download arrow */}
            <svg
              width="28" height="28" viewBox="0 0 28 28" fill="none"
              className="text-white drop-shadow-sm"
              aria-hidden="true"
            >
              <circle cx="14" cy="14" r="13" stroke="white" strokeWidth="1.2" />
              <path d="M14 8v9M9 13l5 5 5-5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span
              className="text-white text-[10px] uppercase tracking-[3px] drop-shadow-sm"
              style={{ fontFamily: 'var(--font-acaslon-pro)' }}
            >
              Download
            </span>
          </div>
        </div>
      </div>

      {/* Caption below cover */}
      <div className="mt-3 space-y-0.5">
        <p
          className="text-[10px] uppercase tracking-[3px] text-[var(--mode-text-tertiary)]"
          style={{ fontFamily: 'var(--font-acaslon-pro)' }}
        >
          {book.subtitle}{book.pages && <span className="ml-2">{book.pages} pp</span>}
        </p>
        <p
          className="text-[12px] uppercase tracking-[2px] text-[var(--mode-text-primary)] font-bold leading-snug"
          style={{ fontFamily: 'var(--font-acaslon-pro)' }}
        >
          {book.title}
        </p>
      </div>
    </a>
  )
}
