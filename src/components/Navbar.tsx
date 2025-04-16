// components/Navbar.tsx
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const [isScrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <motion.nav
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 1.4,
                ease: [0.43, 0.13, 0.23, 0.96],
            }}
            className={`
                        fixed w-full top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                        ${isScrolled ? 'bg-[#f5f2eb]/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}
                      `}
            >
            <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between relative">
                {/* Logo on the left */}
                <h1 className={`text-base font-semibold tracking-[0.25em] uppercase font-caption ${isScrolled ? 'text-[#1a1a1a] hover:text-[#f6f0de]' : 'text-[#f6f0de] hover:text-[#1a1a1a]'}  `}>
                    <Link to="/">TheMove</Link>
                </h1>

                {/* Nav items centered absolutely */}
                <ul className="absolute left-1/2 -translate-x-1/2 flex gap-10 text-[12px] uppercase tracking-[0.25em]">
                    <li className={`transition-colors duration-300 cursor-pointer font-nav-item ${isScrolled ? 'text-[#1a1a1a] hover:text-[#f6f0de]' : 'text-[#f6f0de] hover:text-[#1a1a1a]'} `}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={`transition-colors duration-300 cursor-pointer font-nav-item ${isScrolled ? 'text-[#1a1a1a] hover:text-[#f6f0de]' : 'text-[#f6f0de] hover:text-[#1a1a1a]'} `}>
                        <Link to="/gallery">Gallery</Link>
                    </li>
                    <li className={`transition-colors duration-300 cursor-pointer font-nav-item ${isScrolled ? 'text-[#1a1a1a] hover:text-[#f6f0de]' : 'text-[#f6f0de] hover:text-[#1a1a1a]'} `}>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </div>
        </motion.nav>
    );
};
