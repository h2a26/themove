import { getProjectList } from '@/shared/lib/blob-data';
import Link from 'next/link';

export default async function AdminProjectsPage() {
  let projects: Awaited<ReturnType<typeof getProjectList>> = [];
  let error = '';
  try {
    projects = await getProjectList();
  } catch {
    error = 'Could not load projects. Run the migration script first.';
  }

  const byCategory = {
    residential: projects.filter((p) => p.category === 'residential'),
    commercial: projects.filter((p) => p.category === 'commercial'),
    hospitality: projects.filter((p) => p.category === 'hospitality'),
  };

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[4px] text-[var(--mode-text-tertiary)] mb-1">CMS</p>
          <h1 className="text-2xl font-semibold tracking-wide text-[var(--mode-text-primary)]">
            Projects <span className="text-[var(--mode-text-tertiary)] font-light text-xl">({projects.length})</span>
          </h1>
        </div>
        <Link
          href="/admin/projects/new"
          className="bg-[var(--color-deep-earth)] text-white text-[11px] uppercase tracking-[3px] px-5 py-2.5 rounded hover:opacity-90 transition-opacity"
        >
          + New Project
        </Link>
      </div>

      {error && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg px-4 py-3 text-sm mb-6">
          {error}
        </div>
      )}

      {Object.entries(byCategory).map(([cat, items]) => (
        <div key={cat} className="mb-8">
          <h2 className="text-[10px] uppercase tracking-[4px] text-[var(--mode-text-tertiary)] mb-3">
            {cat} ({items.length})
          </h2>
          <div className="border border-[var(--mode-border)] rounded-lg overflow-hidden bg-white/80">
            {items.length === 0 ? (
              <p className="px-5 py-4 text-sm text-[var(--mode-text-tertiary)]">None</p>
            ) : (
              items.map((p, i) => (
                <div
                  key={p.slug}
                  className={`flex items-center justify-between px-5 py-3.5 ${
                    i < items.length - 1 ? 'border-b border-[var(--mode-border)]' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] text-[var(--mode-text-tertiary)] w-5 text-right">{p.id}</span>
                    <div>
                      <p className="text-sm font-medium text-[var(--mode-text-primary)]">{p.title}</p>
                      <p className="text-[11px] text-[var(--mode-text-tertiary)]">{p.locationCity} · {p.frameArchetype}</p>
                    </div>
                  </div>
                  <Link
                    href={`/admin/projects/${p.slug}`}
                    className="text-[11px] uppercase tracking-[2px] text-[var(--mode-text-tertiary)] hover:text-[var(--color-deep-earth)] transition-colors"
                  >
                    Edit →
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
