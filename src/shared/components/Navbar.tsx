'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';
import { motion } from 'framer-motion';

const MENU_ITEMS = [
  { label: 'Projects', href: '/projects' },
  { label: 'About',   href: '/about'   },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();

  const navColor = 'bg-white/75 backdrop-blur-md text-deep-black shadow-[0_2px_8px_rgba(0,0,0,0.05)]';

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, ease: [0.43, 0.13, 0.23, 0.96] }}
      className={`fixed w-full top-0 z-50 z-50 transition-all duration-700 ease-[cubic-bezier(0.43, 0.13, 0.23, 0.96)] ${navColor}`}
      data-lenis-prevent
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-8 py-3 flex items-center">
        {/* Logo */}
        <div className="flex-1">
          <Link
            href="/"
            className="text-[18px] uppercase hover:text-olive font-[800] tracking-[8px]"
            style={{ fontFamily: 'var(--font-acaslon-pro)' }}
          >
            TheMove
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex flex-1 justify-center gap-10 uppercase text-[12px] tracking-[2px]">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href} className="relative overflow-hidden">
                <Link
                  href={item.href}
                  className={`block font-bold transition-colors duration-300 ${isActive ? 'text-olive' : 'text-deep-black hover:text-olive'}`}
                  aria-current={isActive ? 'page' : undefined}
                  style={{ fontFamily: 'var(--font-acaslon-pro)' }}
                >
                  {item.label}
                </Link>
                {/* Animated underline */}
                <motion.span
                  className="absolute left-0 bottom-0 w-full h-[1px] bg-olive origin-left"
                  initial={{ scaleX: isActive ? 1 : 0 }}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
                />
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu */}
        <div className="flex-1 flex justify-end lg:justify-end">
          <MobileMenu
            menuItems={MENU_ITEMS}
            textColor={navColor.includes('text-deep-black') ? 'text-deep-black' : 'text-white'}
            pathname={pathname}
          />
        </div>
      </div>
    </motion.nav>
  );
}
