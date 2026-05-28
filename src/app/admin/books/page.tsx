import { getBooks } from '@/shared/lib/blob-data';
import Link from 'next/link';

export default async function AdminBooksPage() {
  let books: Awaited<ReturnType<typeof getBooks>> = [];
  let error = '';
  try {
    books = await getBooks();
  } catch {
    error = 'Could not load books. Run the migration script first.';
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[4px] text-[var(--mode-text-tertiary)] mb-1">CMS</p>
          <h1 className="text-2xl font-semibold tracking-wide text-[var(--mode-text-primary)]">
            Books <span className="text-[var(--mode-text-tertiary)] font-light text-xl">({books.length})</span>
          </h1>
        </div>
        <Link
          href="/admin/books/new"
          className="bg-[var(--color-deep-earth)] text-white text-[11px] uppercase tracking-[3px] px-5 py-2.5 rounded hover:opacity-90 transition-opacity"
        >
          + New Book
        </Link>
      </div>

      {error && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg px-4 py-3 text-sm mb-6">{error}</div>
      )}

      <div className="border border-[var(--mode-border)] rounded-lg overflow-hidden bg-white/80">
        {books.length === 0 ? (
          <p className="px-5 py-4 text-sm text-[var(--mode-text-tertiary)]">No books yet.</p>
        ) : (
          books.map((b, i) => (
            <div
              key={b.slug}
              className={`flex items-center justify-between px-5 py-4 ${i < books.length - 1 ? 'border-b border-[var(--mode-border)]' : ''}`}
            >
              <div>
                <p className="text-sm font-medium text-[var(--mode-text-primary)]">{b.title}</p>
                <p className="text-[11px] text-[var(--mode-text-tertiary)]">{b.subtitle} · {b.pages ?? '?'} pages · {b.published ? 'Published' : 'Draft'}</p>
              </div>
              <Link
                href={`/admin/books/${b.slug}`}
                className="text-[11px] uppercase tracking-[2px] text-[var(--mode-text-tertiary)] hover:text-[var(--color-deep-earth)] transition-colors"
              >
                Edit →
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
