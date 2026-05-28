import { getProjectList } from '@/shared/lib/blob-data';
import { getBooks } from '@/shared/lib/blob-data';
import Link from 'next/link';

async function getCounts() {
  try {
    const [projects, books] = await Promise.all([getProjectList(), getBooks()]);
    return { projects: projects.length, books: books.length };
  } catch {
    return { projects: 0, books: 0 };
  }
}

export default async function AdminDashboard() {
  const counts = await getCounts();

  const cards = [
    { label: 'Projects', count: counts.projects, href: '/admin/projects', action: 'Manage' },
    { label: 'Books', count: counts.books, href: '/admin/books', action: 'Manage' },
  ];

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[4px] text-[var(--mode-text-tertiary)] mb-1">The Move CMS</p>
        <h1 className="text-2xl font-semibold tracking-wide text-[var(--mode-text-primary)]">Dashboard</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {cards.map(({ label, count, href, action }) => (
          <div key={label} className="bg-white/80 border border-[var(--mode-border)] rounded-lg p-6">
            <p className="text-[10px] uppercase tracking-[3px] text-[var(--mode-text-tertiary)] mb-1">{label}</p>
            <p className="text-4xl font-light text-[var(--mode-text-primary)] mb-4">{count}</p>
            <Link
              href={href}
              className="text-[11px] uppercase tracking-[3px] text-[var(--color-deep-earth)] hover:opacity-70 transition-opacity"
            >
              {action} →
            </Link>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { href: '/admin/about', label: 'Edit About / Team' },
          { href: '/admin/contact', label: 'Edit Contact Info' },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="bg-white/60 border border-[var(--mode-border)] rounded-lg px-6 py-4 text-sm tracking-wide text-[var(--mode-text-secondary)] hover:text-[var(--mode-text-primary)] hover:bg-white/80 transition-colors"
          >
            {label} →
          </Link>
        ))}
      </div>
    </div>
  );
}
