'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import MobileMenu from './MobileMenu';
import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion';
import { WeatherToggle } from './the-move/weather-toggle';
import { useWeatherMode } from '@/shared/state/weather-mode-context';
import { SearchOverlay } from './search/SearchOverlay';
import Image from 'next/image';
import { PenLine } from 'lucide-react';

type NavUser = { name?: string | null; email?: string | null; image?: string | null } | null;

type CategoryOption = { slug: string; name: string };

const MENU_ITEMS = [
  { label: 'Projects', href: '/projects' },
  { label: 'Books', href: '/books' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

interface NavbarProps {
  user?: NavUser;
  isAdmin?: boolean;
  categories?: CategoryOption[];
}

export function Navbar({ user, isAdmin = false, categories = [] }: NavbarProps) {
  const pathname = usePathname();
  const { mode, toggle } = useWeatherMode();
  const [searchOpen, setSearchOpen] = useState(false);

  const { scrollY } = useScroll();
  const bgOpacity     = useTransform(scrollY, [0, 80], [0.0, 0.18]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const baseBg = mode === 'rain' ? '220,228,240' : '255,255,255';

  // Cmd+K / Ctrl+K global shortcut
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="fixed w-full top-0 z-50 text-[var(--mode-text-primary)]"
        style={{
          backgroundColor: useTransform(bgOpacity, (v) => `rgba(${baseBg},${v})`),
          backdropFilter: 'blur(32px) saturate(180%)',
          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          borderBottom: '1px solid transparent',
          borderColor: useTransform(borderOpacity, (v) => `rgba(255,255,255,${v * 0.25})`),
        }}
        data-lenis-prevent
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-8 py-3 flex items-center">
          {/* Logo */}
          <div className="flex-none">
            <Link
              href="/"
              className="text-[18px] uppercase hover:text-[var(--mode-cord)] font-[800] tracking-[8px]"
              style={{ fontFamily: 'var(--font-acaslon-pro)' }}
            >
              TheMove
            </Link>
          </div>

          {/* Desktop Links */}
          <ul className="hidden lg:flex ml-auto gap-10 uppercase text-[12px] tracking-[2px]">
            {MENU_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href} className="relative overflow-hidden">
                  <Link
                    href={item.href}
                    className={`block font-bold transition-colors duration-300 ${isActive ? 'text-[var(--mode-cord)]' : 'text-[var(--mode-text-primary)] hover:text-[var(--mode-cord)]'}`}
                    aria-current={isActive ? 'page' : undefined}
                    style={{ fontFamily: 'var(--font-acaslon-pro)' }}
                  >
                    {item.label}
                  </Link>
                  <motion.span
                    className="absolute left-0 bottom-0 w-full h-[1px] bg-[var(--mode-cord)] origin-left"
                    initial={{ scaleX: isActive ? 1 : 0 }}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
                  />
                </li>
              );
            })}
          </ul>

          {/* Right controls */}
          <div className="flex-none flex items-center gap-4 ml-8">
            {/* Search icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex items-center justify-center text-[var(--mode-text-secondary)] hover:text-[var(--mode-text-primary)] transition-colors duration-200"
              aria-label="Search (⌘K)"
              title="Search (⌘K)"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="6.5" cy="6.5" r="4.75" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="pointer-events-auto">
              <WeatherToggle mode={mode} onToggle={toggle} compact />
            </div>

            {/* Auth — desktop only */}
            <div className="hidden lg:flex items-center">
              {isAdmin ? (
                /* Studio panel button for admin */
                <Link
                  href="/admin"
                  aria-label="Studio"
                  title="Studio"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-[var(--mode-border-strong)] shinkai-panel shadow-sm hover:shadow-md text-[var(--mode-text-secondary)] hover:text-[var(--mode-text-primary)] transition-all duration-200"
                >
                  <PenLine size={14} />
                </Link>
              ) : user ? (
                /* Profile avatar */
                <Link
                  href="/me"
                  aria-label="My profile"
                  className="flex items-center justify-center w-7 h-7 rounded-full overflow-hidden ring-1 ring-[var(--mode-border)] hover:ring-[var(--mode-cord)] transition-all"
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name ?? 'Profile'}
                      width={28}
                      height={28}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[9px] font-semibold text-[var(--mode-text-secondary)] bg-[var(--mode-border)] w-full h-full flex items-center justify-center">
                      {initials}
                    </span>
                  )}
                </Link>
              ) : (
                /* Join button — icon-only circle to match the profile avatar */
                <Link
                  href="/join"
                  aria-label="Join / Sign in"
                  title="Join"
                  className="flex items-center justify-center w-7 h-7 rounded-full ring-1 ring-[var(--mode-border)] hover:ring-[var(--mode-cord)] text-[var(--mode-text-secondary)] hover:text-[var(--mode-text-primary)] transition-all duration-200"
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                    <circle cx="6.5" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M1 12c0-3.038 2.462-5.5 5.5-5.5S12 8.962 12 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </Link>
              )}
            </div>

            <MobileMenu
              menuItems={MENU_ITEMS}
              textColor="text-[var(--mode-text-primary)]"
              pathname={pathname}
              user={user}
              isAdmin={isAdmin}
            />
          </div>
        </div>
      </motion.nav>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} categories={categories} />
    </>
  );
}
