// components/Navbar.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type NavbarProps = {
    isScrolled?: boolean;
};

export const Navbar = ({ isScrolled = true }: NavbarProps) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const navTextColor = isScrolled
        ? 'text-deep-black hover:text-olive'
        : 'text-light-beige hover:text-deep-black';

    const navColor = isScrolled
        ? 'bg-light-beige/80 backdrop-blur-md shadow-sm'
        : 'bg-transparent'

    return (
        <motion.nav
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 1.4,
                ease: [0.43, 0.13, 0.23, 0.96],
            }}
            className={`fixed w-full top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.43, 0.13, 0.23, 0.96)] ${navColor}`} >
            <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between relative">
                {/* Logo */}
                <h1 className={`text-base uppercase font-adobe-caslon-pro font-[800] text-[18px] tracking-[8px] ${navTextColor}`}>
                    <Link to="/">TheMove</Link>
                </h1>

                {/* Nav items */}
                <ul className="absolute left-1/2 -translate-x-1/2 flex gap-10 uppercase cursor-pointer">

                    {/* Dropdown Parent */}
                    <li
                        className={`relative transition-colors duration-300 font-euclid text-[12px] tracking-[2px] ${navTextColor}`}
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                    >
                        <span>Architecture</span>

                        <AnimatePresence>
                            {showDropdown && (
                                <motion.ul
                                    initial={{opacity: 0, y: -10, scale: 0.98}}
                                    animate={{opacity: 1, y: 0, scale: 1}}
                                    exit={{opacity: 0, y: -6, scale: 0.98}}
                                    transition={{
                                        duration: 0.3,
                                        ease: [0.4, 0.0, 0.2, 1]
                                    }}
                                    className="
                                        absolute top-full mt-4 left-0 min-w-[200px] rounded-2xl py-4 px-5
                                        bg-white/80 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.06)]
                                        text-deep-black text-[13px] font-light tracking-wider border border-beige/20
                                        transition-all duration-300
                                    "
                                >
                                    <li>
                                        <Link
                                            to="/project_category/commercial"
                                            className="block px-2 py-1.5 rounded-md transition-all duration-200 hover:bg-light-beige/30 hover:text-[#C6A664]"
                                        >
                                            Commercial
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/project_category/hospitality"
                                            className="block px-2 py-1.5 rounded-md transition-all duration-200 hover:bg-light-beige/30 hover:text-[#C6A664]"
                                        >
                                            Hospitality
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/project_category/residential"
                                            className="block px-2 py-1.5 rounded-md transition-all duration-200 hover:bg-light-beige/30 hover:text-[#C6A664]"
                                        >
                                            Residential
                                        </Link>
                                    </li>
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </li>

                    {/* Other Nav Items */}
                    <li className={`transition-colors duration-300 font-euclid text-[12px] tracking-[2px] ${navTextColor}`}>
                        <Link to="/projects">Projects</Link>
                    </li>

                    <li className={`transition-colors duration-300 font-euclid text-[12px] tracking-[2px] ${navTextColor}`}>
                        <Link to="/gallery">Gallery</Link>
                    </li>

                    <li className={`transition-colors duration-300 font-euclid text-[12px] tracking-[2px] ${navTextColor}`}>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </div>
        </motion.nav>
    );
};
