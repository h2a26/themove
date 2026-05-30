import { getProjectList, getBooks, getChapters } from '@/shared/lib/blob-data';
import Link from 'next/link';
import { FolderOpen, BookOpen, AlignLeft, User, Phone, ArrowRight } from 'lucide-react';

async function getCounts() {
  try {
    const [projects, books, chapters] = await Promise.all([
      getProjectList(),
      getBooks(),
      getChapters(),
    ]);
    return { projects: projects.length, books: books.length, chapters: chapters.length };
  } catch {
    return { projects: 0, books: 0, chapters: 0 };
  }
}

export default async function AdminDashboard() {
  const counts = await getCounts();

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">The Move CMS</p>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Projects', count: counts.projects, href: '/admin/projects', icon: FolderOpen },
          { label: 'Books',    count: counts.books,    href: '/admin/books',    icon: BookOpen },
          { label: 'Chapters', count: counts.chapters, href: '/admin/chapters', icon: AlignLeft },
        ].map(({ label, count, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <Icon size={16} className="text-gray-400" />
              <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
            </div>
            <p className="text-3xl font-light text-gray-900 mb-1">{count}</p>
            <p className="text-xs uppercase tracking-widest text-gray-400">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { href: '/admin/about',   label: 'About / Team',   icon: User },
          { href: '/admin/contact', label: 'Contact Info',   icon: Phone },
        ].map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-4 text-sm text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:shadow-sm transition-all group"
          >
            <Icon size={15} className="text-gray-400" />
            {label}
            <ArrowRight size={13} className="ml-auto text-gray-300 group-hover:text-gray-500 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
