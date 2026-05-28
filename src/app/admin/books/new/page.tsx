import { createBook } from './actions';

export default function NewBookPage() {
  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[4px] text-[var(--mode-text-tertiary)] mb-1">Books</p>
        <h1 className="text-2xl font-semibold tracking-wide text-[var(--mode-text-primary)]">New Book</h1>
      </div>

      <form action={createBook} className="flex flex-col gap-5 bg-white/80 border border-[var(--mode-border)] rounded-lg p-6">
        <Field label="Title *" name="title" required />
        <Field label="Slug *" name="slug" required hint="kebab-case, e.g. showcase-book-2023-2025" />
        <Field label="Subtitle" name="subtitle" hint="e.g. 2023 – 2025" />
        <Field label="Year" name="year" hint="e.g. 2023–2025" />
        <Field label="Pages" name="pages" type="number" />

        <div className="flex flex-col gap-1">
          <label className="text-xs tracking-wide text-[var(--mode-text-secondary)]">Description</label>
          <textarea
            name="description"
            rows={3}
            className="border border-[var(--mode-border)] rounded px-3 py-2 text-sm text-[var(--mode-text-primary)] bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-deep-earth)] resize-y"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs tracking-wide text-[var(--mode-text-secondary)]">Status</label>
          <select name="published" className="border border-[var(--mode-border)] rounded px-3 py-2 text-sm bg-white focus:outline-none">
            <option value="true">Published</option>
            <option value="false">Draft</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs tracking-wide text-[var(--mode-text-secondary)]">PDF File *</label>
          <input
            type="file"
            name="pdfFile"
            accept="application/pdf"
            required
            className="text-sm text-[var(--mode-text-secondary)] file:mr-3 file:py-1.5 file:px-4 file:rounded file:border file:border-[var(--mode-border)] file:text-xs file:uppercase file:tracking-widest file:text-[var(--mode-text-primary)] file:bg-white"
          />
          <p className="text-[11px] text-[var(--mode-text-tertiary)]">Max 10MB</p>
        </div>

        <button
          type="submit"
          className="bg-[var(--color-deep-earth)] text-white text-[11px] uppercase tracking-[3px] px-6 py-3 rounded hover:opacity-90 transition-opacity mt-2"
        >
          Upload Book
        </button>
      </form>
    </div>
  );
}

function Field({ label, name, required, hint, type }: { label: string; name: string; required?: boolean; hint?: string; type?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs tracking-wide text-[var(--mode-text-secondary)]">{label}</label>
      <input
        name={name}
        type={type ?? 'text'}
        required={required}
        className="border border-[var(--mode-border)] rounded px-3 py-2 text-sm text-[var(--mode-text-primary)] bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-deep-earth)]"
      />
      {hint && <p className="text-[11px] text-[var(--mode-text-tertiary)]">{hint}</p>}
    </div>
  );
}
