// layouts/DefaultLayout.tsx
import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

type DefaultLayoutProps = {
    children: React.ReactNode;
};

export const DefaultLayout = ({ children }: DefaultLayoutProps) => (
    <div className="flex flex-col min-h-screen">
        <Navbar />
            <main className="flex-grow">{children}</main>
        <Footer />
    </div>
);