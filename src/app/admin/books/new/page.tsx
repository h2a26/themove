import { createBook } from './actions';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewBookPage() {
  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <Link
          href="/admin/books"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-900 transition-colors mb-2"
        >
          <ArrowLeft size={12} />
          Books
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">New Book</h1>
      </div>

      <form action={createBook} className="flex flex-col gap-5">
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
          <p className="text-xs uppercase tracking-widest text-gray-400">Details</p>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Title *" name="title" required />
            <Field label="Slug *" name="slug" required hint="e.g. showcase-book-2023-2025" />
            <Field label="Subtitle" name="subtitle" hint="e.g. 2023 – 2025" />
            <Field label="Year" name="year" hint="e.g. 2023–2025" />
          </div>
          <Field label="Pages" name="pages" type="number" />
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-widest text-gray-400">Description</label>
            <textarea
              name="description"
              rows={3}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 resize-y"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-widest text-gray-400">Status</label>
            <select
              name="published"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900"
            >
              <option value="true">Published</option>
              <option value="false">Draft</option>
            </select>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
          <p className="text-xs uppercase tracking-widest text-gray-400">PDF File</p>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-widest text-gray-400">Upload PDF *</label>
            <input
              type="file"
              name="pdfFile"
              accept="application/pdf"
              required
              className="text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border file:border-gray-200 file:text-xs file:uppercase file:tracking-widest file:text-gray-700 file:bg-white hover:file:bg-gray-50"
            />
            <p className="text-[11px] text-gray-400">Max 10MB</p>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="bg-gray-900 text-white text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Upload Book
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label, name, required, hint, type,
}: {
  label: string; name: string; required?: boolean; hint?: string; type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs uppercase tracking-widest text-gray-400">{label}</label>
      <input
        name={name}
        type={type ?? 'text'}
        required={required}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900"
      />
      {hint && <p className="text-[11px] text-gray-400">{hint}</p>}
    </div>
  );
}
