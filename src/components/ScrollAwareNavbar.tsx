// components/ScrollAwareNavbar.tsx
import { useEffect, useState } from 'react';
import { Navbar } from './Navbar';

export const ScrollAwareNavbar = () => {
    const [isScrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return <Navbar isScrolled={isScrolled} />;
};
