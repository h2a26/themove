// layouts/DefaultLayout.tsx
import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

type DefaultLayoutProps = {
    children: React.ReactNode;
    navbar?: React.ReactNode;
};

export const DefaultLayout = ({ children, navbar = <Navbar /> }: DefaultLayoutProps) => (
    <div className="flex flex-col min-h-screen">
        {navbar}
            <main className="flex-grow bg-light-beige/80">{children}</main>
        <Footer />
    </div>
);