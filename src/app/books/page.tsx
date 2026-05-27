import { BooksGrid } from '@/shared/components/books/BooksGrid'
import { Book } from '@/shared/types/book'
import booksData from '@/public/data/books.json'

export default function BooksPage() {
  const books: Book[] = (booksData as Book[]).filter((b) => b.published)

  return (
    <section className="max-w-7xl mx-auto px-8 pt-32 pb-24">
      {/* Chapter-style header */}
      <div className="mb-16">
        <p
          className="text-[10px] uppercase tracking-[5px] text-[var(--mode-text-tertiary)] mb-3"
          style={{ fontFamily: 'var(--font-acaslon-pro)' }}
        >
          The Move
        </p>
        <h1
          className="text-[28px] md:text-[36px] uppercase tracking-[6px] text-[var(--mode-text-primary)] font-bold mb-6"
          style={{ fontFamily: 'var(--font-acaslon-pro)' }}
        >
          Books
        </h1>
        <div className="w-full h-px bg-[var(--mode-stroke-faint)]" />
      </div>

      {books.length === 0 ? (
        <p
          className="text-[13px] text-[var(--mode-text-tertiary)] tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-acaslon-pro)' }}
        >
          No books available.
        </p>
      ) : (
        <BooksGrid books={books} />
      )}
    </section>
  )
}
