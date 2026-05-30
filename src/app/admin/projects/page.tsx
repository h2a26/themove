import { getProjectList, getCategories } from '@/shared/lib/blob-data';
import { blobMediaUrl } from '@/shared/lib/blob-client';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Pencil, MapPin } from 'lucide-react';

const CATEGORY_COLOR: Record<string, string> = {
  residential: 'bg-blue-50 text-blue-700',
  commercial:  'bg-amber-50 text-amber-700',
  hospitality: 'bg-emerald-50 text-emerald-700',
};

function categoryColor(slug: string): string {
  return CATEGORY_COLOR[slug] ?? 'bg-gray-100 text-gray-600';
}

export default async function AdminProjectsPage() {
  const [projects, categories] = await Promise.all([
    getProjectList().catch(() => [] as Awaited<ReturnType<typeof getProjectList>>),
    getCategories().catch(() => []),
  ]);

  const categoryLabel: Record<string, string> = Object.fromEntries(
    categories.map((c) => [c.slug, c.name]),
  );

  const error = projects.length === 0 && categories.length === 0
    ? 'Could not load projects. Check your database connection.'
    : '';

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">CMS</p>
          <h1 className="text-2xl font-semibold text-gray-900">
            Projects
            <span className="ml-2 text-lg font-normal text-gray-400">({projects.length})</span>
          </h1>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-1.5 bg-gray-900 text-white text-xs uppercase tracking-widest px-4 py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Plus size={13} />
          New Project
        </Link>
      </div>

      {error && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg px-4 py-3 text-sm mb-6">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="grid grid-cols-[48px_1fr_120px_100px_80px] gap-4 px-4 py-2.5 border-b border-gray-100 bg-gray-50">
          <div />
          <p className="text-xs uppercase tracking-widest text-gray-400">Project</p>
          <p className="text-xs uppercase tracking-widest text-gray-400">Category</p>
          <p className="text-xs uppercase tracking-widest text-gray-400">Location</p>
          <div />
        </div>

        {projects.length === 0 ? (
          <p className="px-5 py-8 text-sm text-gray-400 text-center">No projects yet.</p>
        ) : (
          projects.map((p, i) => (
            <div
              key={p.slug}
              className={`grid grid-cols-[48px_1fr_120px_100px_80px] gap-4 items-center px-4 py-3 hover:bg-gray-50 transition-colors ${
                i < projects.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 shrink-0">
                {p.image ? (
                  <Image
                    src={blobMediaUrl(p.image)}
                    alt={p.title}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{p.title}</p>
                <p className="text-xs text-gray-400 font-mono truncate">{p.slug}</p>
              </div>

              <div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${categoryColor(p.category)}`}>
                  {categoryLabel[p.category] ?? p.category}
                </span>
              </div>

              <div className="flex items-center gap-1 min-w-0">
                <MapPin size={11} className="text-gray-300 shrink-0" />
                <p className="text-xs text-gray-500 truncate">{p.locationCity}</p>
              </div>

              <div className="flex justify-end">
                <Link
                  href={`/admin/projects/${p.slug}`}
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
