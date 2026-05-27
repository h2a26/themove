import { Book } from '@/shared/types/book'
import { BookCard } from './BookCard'

interface BooksGridProps {
  books: Book[]
}

export function BooksGrid({ books }: BooksGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}
