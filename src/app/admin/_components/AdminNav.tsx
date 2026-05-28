'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const NAV = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/books', label: 'Books' },
  { href: '/admin/about', label: 'About' },
  { href: '/admin/contact', label: 'Contact' },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="w-56 shrink-0 border-r border-[var(--mode-border)] min-h-screen flex flex-col bg-white/60 backdrop-blur-sm">
      <div className="px-6 py-5 border-b border-[var(--mode-border)]">
        <p className="text-[10px] uppercase tracking-[4px] text-[var(--mode-text-tertiary)]">The Move</p>
        <p className="text-sm font-semibold tracking-wide text-[var(--mode-text-primary)] mt-0.5">Admin</p>
      </div>

      <div className="flex-1 py-4 flex flex-col gap-0.5 px-3">
        {NAV.map(({ href, label, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`px-3 py-2 rounded text-sm tracking-wide transition-colors ${
                active
                  ? 'bg-[var(--color-deep-earth)] text-white'
                  : 'text-[var(--mode-text-secondary)] hover:text-[var(--mode-text-primary)] hover:bg-black/5'
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      <div className="px-3 py-4 border-t border-[var(--mode-border)]">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full px-3 py-2 rounded text-sm text-[var(--mode-text-tertiary)] hover:text-red-600 hover:bg-red-50 transition-colors text-left tracking-wide"
        >
          Sign out
        </button>
      </div>
    </nav>
  );
}
