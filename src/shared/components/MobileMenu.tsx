'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { List, X } from 'phosphor-react';

export type MenuItem = { label: string; href: string };

interface MobileMenuProps {
  menuItems: MenuItem[];
  textColor: string;
  pathname: string;
}

function getNavItemClass(isActive: boolean, base: string) {
  return [
    base,
    isActive ? 'text-olive font-bold underline underline-offset-4' : '',
  ].join(' ');
}

export default function MobileMenu({ menuItems, textColor, pathname }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden z-50 text-deep-black"
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
              className="absolute top-full left-0 w-full bg-light-beige/95 backdrop-blur-md shadow-md z-50 py-6 px-8"
              id="mobile-menu"
              role="menu"
            >
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
