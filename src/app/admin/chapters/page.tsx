import { getChapters } from '@/shared/lib/blob-data';
import { updateChapter, createChapter, deleteChapter } from './actions';

export default async function AdminChaptersPage() {
  const chapterList = await getChapters();

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[4px] text-[var(--mode-text-tertiary)] mb-1">CMS</p>
        <h1 className="text-2xl font-semibold tracking-wide text-[var(--mode-text-primary)]">
          Chapters <span className="text-[var(--mode-text-tertiary)] font-light text-xl">({chapterList.length})</span>
        </h1>
        <p className="text-xs text-[var(--mode-text-tertiary)] mt-1">
          Section headings displayed on the /projects scroll — one chapter per category.
        </p>
      </div>

      {/* Existing chapters */}
      <div className="space-y-4 mb-10">
        {chapterList.map((chapter, i) => (
          <form
            key={chapter.id}
            action={updateChapter.bind(null, chapter.id)}
            className="bg-white/80 border border-[var(--mode-border)] rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-[4px] text-[var(--mode-text-tertiary)]">
                #{i + 1} · <code className="font-mono">{chapter.id}</code>
              </span>
              <button
                formAction={deleteChapter.bind(null, chapter.id)}
                type="submit"
                className="text-[10px] uppercase tracking-[2px] text-red-400 hover:text-red-600 transition-colors"
                onClick={(e) => { if (!confirm(`Delete chapter "${chapter.id}"?`)) e.preventDefault(); }}
              >
                Delete
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-[3px] text-[var(--mode-text-tertiary)]">Title</label>
                <input
                  name="title"
                  defaultValue={chapter.title}
                  required
                  className="border border-[var(--mode-border)] rounded px-3 py-2 text-sm text-[var(--mode-text-primary)] bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-deep-earth)]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-[3px] text-[var(--mode-text-tertiary)]">Subtitle</label>
                <input
                  name="subtitle"
                  defaultValue={chapter.subtitle}
                  className="border border-[var(--mode-border)] rounded px-3 py-2 text-sm text-[var(--mode-text-primary)] bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-deep-earth)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-[3px] text-[var(--mode-text-tertiary)]">Category</label>
                <input
                  name="category"
                  defaultValue={chapter.category}
                  required
                  className="border border-[var(--mode-border)] rounded px-3 py-2 text-sm text-[var(--mode-text-primary)] bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-deep-earth)]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-[3px] text-[var(--mode-text-tertiary)]">Sort Order</label>
                <input
                  name="sortOrder"
                  type="number"
                  defaultValue={i}
                  className="border border-[var(--mode-border)] rounded px-3 py-2 text-sm text-[var(--mode-text-primary)] bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-deep-earth)]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-[var(--color-deep-earth)] text-white text-[10px] uppercase tracking-[3px] px-5 py-2 rounded hover:opacity-90 transition-opacity"
            >
              Save
            </button>
          </form>
        ))}
      </div>

      {/* Add new chapter */}
      <div className="border border-dashed border-[var(--mode-border)] rounded-lg p-6">
        <p className="text-[10px] uppercase tracking-[4px] text-[var(--mode-text-tertiary)] mb-4">Add Chapter</p>
        <form action={createChapter} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-[3px] text-[var(--mode-text-tertiary)]">ID (slug)</label>
              <input
                name="id"
                required
                placeholder="e.g. hospitality"
                className="border border-[var(--mode-border)] rounded px-3 py-2 text-sm text-[var(--mode-text-primary)] bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-deep-earth)]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-[3px] text-[var(--mode-text-tertiary)]">Category</label>
              <input
                name="category"
                required
                placeholder="e.g. hospitality"
                className="border border-[var(--mode-border)] rounded px-3 py-2 text-sm text-[var(--mode-text-primary)] bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-deep-earth)]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-[3px] text-[var(--mode-text-tertiary)]">Title</label>
              <input
                name="title"
                required
                placeholder="e.g. Spaces to serve"
                className="border border-[var(--mode-border)] rounded px-3 py-2 text-sm text-[var(--mode-text-primary)] bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-deep-earth)]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-[3px] text-[var(--mode-text-tertiary)]">Subtitle</label>
              <input
                name="subtitle"
                placeholder="e.g. Hospitality & F&B"
                className="border border-[var(--mode-border)] rounded px-3 py-2 text-sm text-[var(--mode-text-primary)] bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-deep-earth)]"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-[var(--color-deep-earth)] text-white text-[10px] uppercase tracking-[3px] px-5 py-2 rounded hover:opacity-90 transition-opacity"
          >
            + Add Chapter
          </button>
        </form>
      </div>
    </div>
  );
}
