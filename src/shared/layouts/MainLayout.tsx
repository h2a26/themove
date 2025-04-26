import React from 'react';
import { Navbar } from '@/shared/components/Navbar';
import { Footer } from '@/shared/components/Footer';

type MainLayoutProps = {
  children: React.ReactNode;
  navbar?: React.ReactNode;
};

export const MainLayout = ({ children, navbar = <Navbar /> }: MainLayoutProps) => (
  <div className="flex flex-col min-h-screen">
    {navbar}
    <main className="flex-grow bg-light-beige/80">{children}</main>
    <Footer />
  </div>
);
