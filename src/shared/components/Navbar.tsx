'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';

const MENU_ITEMS = [
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

// Utility for scalable, clean active class logic
function getNavItemClass(isActive: boolean, base: string) {
  return [
    base,
    isActive ? 'text-olive font-bold underline underline-offset-4' : '',
  ].join(' ');
}

export function Navbar({ isScrolled = true }: { isScrolled?: boolean }) {
  const pathname = usePathname();
  const navTextColor = isScrolled
    ? 'text-deep-black hover:text-olive'
    : 'text-light-beige hover:text-deep-black';
  const navBg = isScrolled ? 'bg-light-beige/80 backdrop-blur-md shadow-sm' : 'bg-transparent';

  return (
    <nav
      className={`fixed w-full top-0 z-50 ${navBg} transition-all duration-700 ease-[cubic-bezier(0.43,0.13,0.23,0.96)]`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center">
        {/* Left: Logo */}
        <div className="flex-1">
          <h1
            className={`text-base uppercase font-[800] text-[18px] tracking-[8px] ${navTextColor}`}
            style={{ fontFamily: 'var(--font-acaslon-pro, sans-serif)' }}
          >
            <Link href="/">TheMove</Link>
          </h1>
        </div>

        {/* Center: Desktop Links */}
        <ul className="hidden lg:flex flex-1 justify-center gap-10 uppercase">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li
                key={item.href}
                className={getNavItemClass(isActive, `text-[12px] tracking-[2px] transition-colors duration-300 ${navTextColor}`)}
                style={{ fontFamily: 'var(--font-acaslon-pro, sans-serif)' }}
                role="menuitem"
                aria-label={item.label}
              >
                <Link href={item.href}>{item.label}</Link>
              </li>
            );
          })}
        </ul>

        {/* Right: Mobile Menu Toggle */}
        <div className="flex-1 flex justify-end lg:justify-end">
          <MobileMenu menuItems={MENU_ITEMS} textColor={navTextColor} pathname={pathname} />
        </div>
      </div>
    </nav>
  );
}
