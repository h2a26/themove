import './globals.css';
import type { Metadata } from 'next';
import { MainLayout } from '@/shared/layouts/MainLayout';
import React from 'react';
import { acaslonPro, euclidCircularB, euclid, allrounderAntiqua } from './fonts';
import { LenisProvider } from '@/shared/components/LenisProvider';

export const metadata: Metadata = {
  title: 'The Move',
  description: 'Discover The Move — a luxury & minimalist interior design studio in Myanmar specializing in aesthetic, minimalist, and functional spaces for homes and businesses.',
  alternates: {
    canonical: 'https://themovearchids.vercel.app/about',
  },
  openGraph: {
    title: 'The Move',
    description: 'Discover The Move — a luxury & minimalist interior design studio in Myanmar specializing in aesthetic, minimalist, and functional spaces for homes and businesses.',
    images: 'https://themovearchids.vercel.app/preview.jpg'
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={[
        acaslonPro.variable,
        euclidCircularB.variable,
        euclid.variable,
        allrounderAntiqua.variable,
      ].join(' ')}
    >
      <body className="bg-light-beige">
        <LenisProvider>
          <MainLayout>{children}</MainLayout>
        </LenisProvider>
      </body>
    </html>
  );
}
