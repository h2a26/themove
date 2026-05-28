import { notFound } from 'next/navigation';
import { getBooks } from '@/shared/lib/blob-data';
import { blobMediaUrl } from '@/shared/lib/blob-client';
import { updateBook, deleteBook } from './actions';
import Link from 'next/link';

interface Props { params: Promise<{ slug: string }> }

export default async function EditBookPage({ params }: Props) {
  const { slug } = await params;
  const books = await getBooks().catch(() => []);
  const book = books.find((b) => b.slug === slug);
  if (!book) return notFound();

  const updateBound = updateBook.bind(null, slug);
  const deleteBound = deleteBook.bind(null, slug);

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[4px] text-[var(--mode-text-tertiary)] mb-1">
            <Link href="/admin/books" className="hover:text-[var(--mode-text-primary)]">Books</Link> / Edit
          </p>
          <h1 className="text-2xl font-semibold tracking-wide text-[var(--mode-text-primary)]">{book.title}</h1>
        </div>
        <form action={deleteBound}>
          <button
            type="submit"
            className="text-[11px] uppercase tracking-[2px] text-red-600 hover:bg-red-50 border border-red-200 rounded px-4 py-2 transition-colors"
            onClick={(e) => { if (!confirm('Delete this book?')) e.preventDefault(); }}
          >
            Delete
          </button>
        </form>
      </div>

      <form action={updateBound} className="flex flex-col gap-5 bg-white/80 border border-[var(--mode-border)] rounded-lg p-6">
        <Field label="Title *" name="title" required defaultValue={book.title} />
        <Field label="Subtitle" name="subtitle" defaultValue={book.subtitle} />
        <Field label="Year" name="year" defaultValue={book.year} />
        <Field label="Pages" name="pages" type="number" defaultValue={String(book.pages ?? '')} />

        <div className="flex flex-col gap-1">
          <label className="text-xs tracking-wide text-[var(--mode-text-secondary)]">Description</label>
          <textarea
            name="description"
            rows={3}
            defaultValue={book.description}
            className="border border-[var(--mode-border)] rounded px-3 py-2 text-sm text-[var(--mode-text-primary)] bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-deep-earth)] resize-y"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs tracking-wide text-[var(--mode-text-secondary)]">Status</label>
          <select
            name="published"
            defaultValue={book.published ? 'true' : 'false'}
            className="border border-[var(--mode-border)] rounded px-3 py-2 text-sm bg-white focus:outline-none"
          >
            <option value="true">Published</option>
            <option value="false">Draft</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs tracking-wide text-[var(--mode-text-secondary)]">Current PDF</label>
          <a
            href={blobMediaUrl(book.pdfUrl)}
            target="_blank"
            className="text-sm text-[var(--color-deep-earth)] hover:underline"
          >
            {book.pdfUrl.split('/').pop()}
          </a>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs tracking-wide text-[var(--mode-text-secondary)]">Replace PDF</label>
          <input
            type="file"
            name="pdfFile"
            accept="application/pdf"
            className="text-sm text-[var(--mode-text-secondary)] file:mr-3 file:py-1.5 file:px-4 file:rounded file:border file:border-[var(--mode-border)] file:text-xs file:uppercase file:tracking-widest file:text-[var(--mode-text-primary)] file:bg-white"
          />
          <p className="text-[11px] text-[var(--mode-text-tertiary)]">Leave empty to keep existing PDF.</p>
        </div>

        <button
          type="submit"
          className="bg-[var(--color-deep-earth)] text-white text-[11px] uppercase tracking-[3px] px-6 py-3 rounded hover:opacity-90 transition-opacity mt-2"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

function Field({ label, name, required, defaultValue, type }: { label: string; name: string; required?: boolean; defaultValue?: string; type?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs tracking-wide text-[var(--mode-text-secondary)]">{label}</label>
      <input
        name={name}
        type={type ?? 'text'}
        required={required}
        defaultValue={defaultValue ?? ''}
        className="border border-[var(--mode-border)] rounded px-3 py-2 text-sm text-[var(--mode-text-primary)] bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-deep-earth)]"
      />
    </div>
  );
}
