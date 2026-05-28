import { BooksGrid } from '@/shared/components/books/BooksGrid'
import { Book } from '@/shared/types/book'
import { getBooks } from '@/shared/lib/blob-data'
import { blobMediaUrl } from '@/shared/lib/blob-client'

export default async function BooksPage() {
  const booksData = await getBooks()
  const books: Book[] = booksData
    .filter((b) => b.published)
    .map((b) => ({ ...b, pdfUrl: blobMediaUrl(b.pdfUrl) }))

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
