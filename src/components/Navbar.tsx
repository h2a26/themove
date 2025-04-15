import { useEffect, useState } from 'react';

export const Navbar = () => {
    const [isScrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav
            className={`
        fixed w-full top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isScrolled ? 'bg-[#f5f2eb]/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}
      `}
        >
            <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between relative">
                {/* Logo on the left */}
                <h1 className="text-base font-semibold tracking-[0.25em] text-[#1a1a1a] uppercase font-caption">
                    Luxury
                </h1>

                {/* Nav items centered absolutely */}
                <ul className="absolute left-1/2 -translate-x-1/2 flex gap-10 text-[12px] uppercase tracking-[0.25em] font-light text-[#333]">
                    <li className="hover:text-black transition-colors duration-300 cursor-pointer font-nav-item">
                        Home
                    </li>
                    <li className="hover:text-black transition-colors duration-300 cursor-pointer font-nav-item">
                        Gallery
                    </li>
                    <li className="hover:text-black transition-colors duration-300 cursor-pointer font-nav-item">
                        Contact
                    </li>
                </ul>
            </div>
        </nav>
    );
};
