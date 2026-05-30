import { getChapters, getCategories } from '@/shared/lib/blob-data';
import { updateChapter, createChapter } from './actions';
import { DeleteChapterButton } from './DeleteChapterButton';
import { Plus } from 'lucide-react';

const INPUT = 'border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900';
const SELECT = 'border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900';

export default async function AdminChaptersPage() {
  const [chapterList, categoryList] = await Promise.all([getChapters(), getCategories()]);

  const coveredSlugs = new Set(chapterList.map((c) => c.categorySlug));
  const missingCategories = categoryList.filter((c) => !coveredSlugs.has(c.slug));

  // Build a name map for display
  const categoryName: Record<string, string> = Object.fromEntries(
    categoryList.map((c) => [c.slug, c.name]),
  );

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">CMS</p>
        <h1 className="text-2xl font-semibold text-gray-900">
          Chapters
          <span className="ml-2 text-lg font-normal text-gray-400">
            ({chapterList.length} / {categoryList.length})
          </span>
        </h1>
        <p className="text-xs text-gray-400 mt-2">
          Each chapter provides the section heading for a category on{' '}
          <code className="bg-gray-100 px-1 rounded">/projects</code>.
          Add categories first in{' '}
          <a href="/admin/categories" className="underline hover:text-gray-600">Categories</a>.
        </p>
      </div>

      {/* Existing chapters */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
        <div className="grid grid-cols-[120px_1fr_1fr_60px_60px] gap-4 px-5 py-2.5 border-b border-gray-100 bg-gray-50">
          <p className="text-xs uppercase tracking-widest text-gray-400">Category</p>
          <p className="text-xs uppercase tracking-widest text-gray-400">Title</p>
          <p className="text-xs uppercase tracking-widest text-gray-400">Subtitle</p>
          <p className="text-xs uppercase tracking-widest text-gray-400">Order</p>
          <div />
        </div>

        {chapterList.length === 0 ? (
          <p className="px-5 py-8 text-sm text-gray-400 text-center">No chapters yet.</p>
        ) : (
          chapterList.map((chapter, i) => (
            <form
              key={chapter.id}
              action={updateChapter.bind(null, chapter.id)}
              className={`grid grid-cols-[120px_1fr_1fr_60px_60px] gap-4 items-center px-5 py-3 hover:bg-gray-50 transition-colors ${
                i < chapterList.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              {/* Category — locked */}
              <div>
                <span
                  className="inline-block text-[11px] font-medium text-gray-500 bg-gray-100 rounded-md px-2 py-0.5 capitalize truncate max-w-[108px]"
                  title={chapter.categorySlug}
                >
                  {categoryName[chapter.categorySlug] ?? chapter.categorySlug}
                </span>
              </div>

              {/* Title */}
              <input
                name="title"
                defaultValue={chapter.title}
                required
                placeholder="e.g. Spaces to live"
                className={INPUT}
              />

              {/* Subtitle */}
              <input
                name="subtitle"
                defaultValue={chapter.subtitle}
                placeholder="e.g. Residential"
                className={INPUT}
              />

              {/* Sort order */}
              <input
                name="sortOrder"
                type="number"
                defaultValue={chapter.sortOrder ?? i}
                className={`${INPUT} w-full`}
              />

              {/* Actions */}
              <div className="flex items-center justify-end gap-2">
                <button
                  type="submit"
                  className="text-xs text-gray-400 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-md transition-colors"
                >
                  Save
                </button>
                <DeleteChapterButton id={chapter.id} label={chapter.title} />
              </div>
            </form>
          ))
        )}
      </div>

      {/* Add new chapter — only if categories without chapters exist */}
      {missingCategories.length > 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-xl p-6">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-5">Add Chapter</p>
          <form action={createChapter} className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-gray-400">Category *</label>
                <select name="categorySlug" required className={SELECT}>
                  <option value="">— pick category —</option>
                  {missingCategories.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-gray-400">Title *</label>
                <input name="title" required placeholder="e.g. Spaces to serve" className={SELECT} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-gray-400">Subtitle</label>
                <input name="subtitle" placeholder="e.g. Hospitality & F&B" className={SELECT} />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex items-center gap-1.5 bg-gray-900 text-white text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Plus size={13} />
                Add Chapter
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
          <p className="text-xs text-gray-400">
            All {categoryList.length} {categoryList.length === 1 ? 'category has' : 'categories have'} chapters.
          </p>
        </div>
      )}
    </div>
  );
}
