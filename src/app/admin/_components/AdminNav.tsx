'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  FolderOpen,
  BookOpen,
  Tag,
  AlignLeft,
  User,
  Phone,
  LogOut,
  Globe,
} from 'lucide-react';

const NAV = [
  { href: '/admin',             label: 'Dashboard',  icon: LayoutDashboard, exact: true },
  { href: '/admin/projects',    label: 'Projects',   icon: FolderOpen },
  { href: '/admin/books',       label: 'Books',      icon: BookOpen },
  { href: '/admin/categories',  label: 'Categories', icon: Tag },
  { href: '/admin/chapters',    label: 'Chapters',   icon: AlignLeft },
  { href: '/admin/about',       label: 'About',      icon: User },
  { href: '/admin/contact',     label: 'Contact',    icon: Phone },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="w-60 shrink-0 border-r border-gray-200 min-h-screen flex flex-col bg-white">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-gray-100">
        <p className="text-[10px] uppercase tracking-[4px] text-gray-400 mb-0.5">The Move</p>
        <p className="text-sm font-semibold text-gray-900">Admin CMS</p>
      </div>

      {/* Links */}
      <div className="flex-1 py-3 flex flex-col gap-0.5 px-2">
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                active
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Icon size={15} className="shrink-0" />
              {label}
            </Link>
          );
        })}
      </div>

      {/* Bottom actions */}
      <div className="px-2 py-3 border-t border-gray-100 flex flex-col gap-0.5">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        >
          <Globe size={15} className="shrink-0" />
          View Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-2.5 w-full px-3 py-2 rounded-md text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={15} className="shrink-0" />
          Sign out
        </button>
      </div>
    </nav>
  );
}
