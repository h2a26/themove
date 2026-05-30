import { getCategories, getCategoryProjectCounts } from '@/shared/lib/blob-data';
import { updateCategory, createCategory } from './actions';
import { DeleteCategoryButton } from './DeleteCategoryButton';
import { Plus } from 'lucide-react';

const INPUT = 'border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900';

export default async function AdminCategoriesPage() {
  const [categoryList, projectCounts] = await Promise.all([
    getCategories(),
    getCategoryProjectCounts(),
  ]);

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">CMS</p>
        <h1 className="text-2xl font-semibold text-gray-900">
          Categories
          <span className="ml-2 text-lg font-normal text-gray-400">({categoryList.length})</span>
        </h1>
        <p className="text-xs text-gray-400 mt-2">
          Category slugs are permanent machine keys used in project assignments, URLs, and frame logic.
          Only the display <strong>name</strong> and <strong>sort order</strong> are editable after creation.
        </p>
      </div>

      {/* Existing categories */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
        <div className="grid grid-cols-[100px_1fr_60px_80px_80px] gap-4 px-5 py-2.5 border-b border-gray-100 bg-gray-50">
          <p className="text-xs uppercase tracking-widest text-gray-400">Slug</p>
          <p className="text-xs uppercase tracking-widest text-gray-400">Display Name</p>
          <p className="text-xs uppercase tracking-widest text-gray-400">Order</p>
          <p className="text-xs uppercase tracking-widest text-gray-400">Projects</p>
          <div />
        </div>

        {categoryList.length === 0 ? (
          <p className="px-5 py-8 text-sm text-gray-400 text-center">No categories yet.</p>
        ) : (
          categoryList.map((cat, i) => {
            const count = projectCounts[cat.slug] ?? 0;
            return (
              <form
                key={cat.id}
                action={updateCategory.bind(null, cat.id)}
                className={`grid grid-cols-[100px_1fr_60px_80px_80px] gap-4 items-center px-5 py-3 hover:bg-gray-50 transition-colors ${
                  i < categoryList.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                {/* Slug — locked */}
                <div>
                  <span className="inline-block text-[11px] font-medium text-gray-500 bg-gray-100 rounded-md px-2 py-0.5 font-mono">
                    {cat.slug}
                  </span>
                </div>

                {/* Name */}
                <input
                  name="name"
                  defaultValue={cat.name}
                  required
                  placeholder="e.g. Hospitality & F&B"
                  className={INPUT}
                />

                {/* Sort order */}
                <input
                  name="sortOrder"
                  type="number"
                  defaultValue={cat.sortOrder}
                  className={`${INPUT} w-full`}
                />

                {/* Project count */}
                <div>
                  <span className={`inline-block text-[11px] font-medium rounded-md px-2 py-0.5 ${
                    count > 0
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {count} project{count === 1 ? '' : 's'}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="submit"
                    className="text-xs text-gray-400 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-md transition-colors"
                  >
                    Save
                  </button>
                  <DeleteCategoryButton id={cat.id} slug={cat.slug} projectCount={count} />
                </div>
              </form>
            );
          })
        )}
      </div>

      {/* Add new category */}
      <div className="bg-white border border-dashed border-gray-300 rounded-xl p-6">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Add Category</p>
        <p className="text-[11px] text-amber-600 mb-5">
          The slug is permanent — choose carefully. Use lowercase kebab-case (e.g. <code className="bg-amber-50 px-1 rounded">landscape</code>).
        </p>
        <form action={createCategory} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-widest text-gray-400">Slug *</label>
              <input
                name="slug"
                required
                placeholder="e.g. landscape"
                pattern="[a-z0-9-]+"
                title="Lowercase letters, numbers and hyphens only"
                className={INPUT}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-widest text-gray-400">Display Name *</label>
              <input
                name="name"
                required
                placeholder="e.g. Landscape & Outdoor"
                className={INPUT}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-gray-900 text-white text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Plus size={13} />
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
