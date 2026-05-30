'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { List, X } from 'phosphor-react';
import { LayoutGrid } from 'lucide-react';
import Image from 'next/image';

export type MenuItem = { label: string; href: string };
type NavUser = { name?: string | null; email?: string | null; image?: string | null } | null;

interface MobileMenuProps {
  menuItems: MenuItem[];
  textColor: string;
  pathname: string;
  user?: NavUser;
  isAdmin?: boolean;
}

function getNavItemClass(isActive: boolean, base: string) {
  return [base, isActive ? 'text-[var(--mode-cord)] font-bold underline underline-offset-4' : ''].join(' ');
}

export default function MobileMenu({ menuItems, textColor, pathname, user, isAdmin = false }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden z-50 text-[var(--mode-text-primary)]"
        aria-label="Toggle menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        {open ? <X size={24} /> : <List size={24} />}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 w-full shinkai-panel shadow-md z-50 py-6 px-8"
              id="mobile-menu"
              role="menu"
            >
              {/* Auth row */}
              <div className="mb-5 pb-5 border-b border-[var(--mode-border)]">
                {isAdmin ? (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 text-[13px] uppercase tracking-[1.5px] text-[var(--mode-text-secondary)] hover:text-[var(--mode-text-primary)] transition-colors"
                    role="menuitem"
                    style={{ fontFamily: 'var(--font-acaslon-pro)' }}
                  >
                    <LayoutGrid size={14} />
                    Studio
                  </Link>
                ) : user ? (
                  <Link
                    href="/me"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3"
                    role="menuitem"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-[var(--mode-border)] shrink-0">
                      {user.image ? (
                        <Image src={user.image} alt={user.name ?? ''} width={32} height={32} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[10px] font-semibold text-[var(--mode-text-secondary)] bg-[var(--mode-border)] w-full h-full flex items-center justify-center">
                          {initials}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[var(--mode-text-primary)]">{user.name}</p>
                      <p className="text-[10px] text-[var(--mode-text-tertiary)]">View profile</p>
                    </div>
                  </Link>
                ) : (
                  <Link
                    href="/join"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 text-[13px] uppercase tracking-[1.5px] text-[var(--mode-text-secondary)] hover:text-[var(--mode-text-primary)] transition-colors"
                    role="menuitem"
                    style={{ fontFamily: 'var(--font-acaslon-pro)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                      <circle cx="6.5" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M1 12c0-3.038 2.462-5.5 5.5-5.5S12 8.962 12 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    Join The Move
                  </Link>
                )}
              </div>

              <ul
                className="space-y-4 uppercase text-[13px] tracking-[1.5px]"
                style={{ fontFamily: 'var(--font-euclid-circular-b, sans-serif)' }}
              >
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href} role="menuitem">
                      <Link href={item.href} onClick={() => setOpen(false)}>
                        <span className={getNavItemClass(isActive, textColor)}>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
