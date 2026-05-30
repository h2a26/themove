import { notFound } from 'next/navigation';
import { getBooks } from '@/shared/lib/blob-data';
import { blobMediaUrl } from '@/shared/lib/blob-client';
import { updateBook, deleteBook } from './actions';
import { ConfirmButton } from '@/app/admin/_components/ConfirmButton';
import Link from 'next/link';
import { ArrowLeft, Trash2, FileText } from 'lucide-react';

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
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <Link
            href="/admin/books"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-900 transition-colors mb-2"
          >
            <ArrowLeft size={12} />
            Books
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">{book.title}</h1>
          <p className="text-xs text-gray-400 font-mono mt-0.5">{slug}</p>
        </div>
        <ConfirmButton
          formAction={deleteBound}
          message="Delete this book? This cannot be undone."
          className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 border border-red-200 rounded-lg px-3.5 py-2 hover:bg-red-50 transition-colors mt-1"
        >
          <Trash2 size={12} />
          Delete
        </ConfirmButton>
      </div>

      <form action={updateBound} className="flex flex-col gap-5">
        {/* Details */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
          <p className="text-xs uppercase tracking-widest text-gray-400">Details</p>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Title *" name="title" required defaultValue={book.title} />
            <Field label="Subtitle" name="subtitle" defaultValue={book.subtitle} />
            <Field label="Year" name="year" defaultValue={book.year} />
            <Field label="Pages" name="pages" type="number" defaultValue={String(book.pages ?? '')} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-widest text-gray-400">Description</label>
            <textarea
              name="description"
              rows={3}
              defaultValue={book.description}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 resize-y"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-widest text-gray-400">Status</label>
            <select
              name="published"
              defaultValue={book.published ? 'true' : 'false'}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900"
            >
              <option value="true">Published</option>
              <option value="false">Draft</option>
            </select>
          </div>
        </div>

        {/* PDF */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
          <p className="text-xs uppercase tracking-widest text-gray-400">PDF File</p>
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <FileText size={15} className="text-gray-400 shrink-0" />
            <a
              href={blobMediaUrl(book.pdfUrl)}
              target="_blank"
              className="text-sm text-gray-600 hover:text-gray-900 hover:underline truncate"
            >
              {book.pdfUrl.split('/').pop()}
            </a>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-widest text-gray-400">Replace PDF</label>
            <input
              type="file"
              name="pdfFile"
              accept="application/pdf"
              className="text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border file:border-gray-200 file:text-xs file:uppercase file:tracking-widest file:text-gray-700 file:bg-white hover:file:bg-gray-50"
            />
            <p className="text-[11px] text-gray-400">Leave empty to keep existing PDF.</p>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="bg-gray-900 text-white text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label, name, required, defaultValue, type,
}: {
  label: string; name: string; required?: boolean; defaultValue?: string; type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs uppercase tracking-widest text-gray-400">{label}</label>
      <input
        name={name}
        type={type ?? 'text'}
        required={required}
        defaultValue={defaultValue ?? ''}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900"
      />
    </div>
  );
}
