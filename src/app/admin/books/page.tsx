import { getBooks } from '@/shared/lib/blob-data';
import Link from 'next/link';
import { Plus, Pencil, BookOpen } from 'lucide-react';

export default async function AdminBooksPage() {
  let books: Awaited<ReturnType<typeof getBooks>> = [];
  let error = '';
  try {
    books = await getBooks();
  } catch {
    error = 'Could not load books. Check your database connection.';
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">CMS</p>
          <h1 className="text-2xl font-semibold text-gray-900">
            Books
            <span className="ml-2 text-lg font-normal text-gray-400">({books.length})</span>
          </h1>
        </div>
        <Link
          href="/admin/books/new"
          className="flex items-center gap-1.5 bg-gray-900 text-white text-xs uppercase tracking-widest px-4 py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Plus size={13} />
          New Book
        </Link>
      </div>

      {error && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg px-4 py-3 text-sm mb-6">{error}</div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* Column headers */}
        <div className="grid grid-cols-[32px_1fr_80px_80px] gap-4 px-4 py-2.5 border-b border-gray-100 bg-gray-50">
          <div />
          <p className="text-xs uppercase tracking-widest text-gray-400">Book</p>
          <p className="text-xs uppercase tracking-widest text-gray-400">Status</p>
          <div />
        </div>

        {books.length === 0 ? (
          <p className="px-5 py-8 text-sm text-gray-400 text-center">No books yet.</p>
        ) : (
          books.map((b, i) => (
            <div
              key={b.slug}
              className={`grid grid-cols-[32px_1fr_80px_80px] gap-4 items-center px-4 py-3.5 hover:bg-gray-50 transition-colors ${
                i < books.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <BookOpen size={15} className="text-gray-300" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{b.title}</p>
                <p className="text-xs text-gray-400">{b.subtitle} · {b.pages ?? '?'} pp · {b.year}</p>
              </div>
              <div>
                <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                  b.published ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {b.published ? 'Published' : 'Draft'}
                </span>
              </div>
              <div className="flex justify-end">
                <Link
                  href={`/admin/books/${b.slug}`}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-900 transition-colors px-2 py-1 rounded hover:bg-gray-100"
                >
                  <Pencil size={12} />
                  Edit
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
