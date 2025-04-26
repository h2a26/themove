import './globals.css';
import type { Metadata, Viewport } from 'next';
import { MainLayout } from '@/shared/layouts/MainLayout';
import React from 'react';
import { acaslonPro, euclidCircularB, euclid, allrounderAntiqua } from './fonts';
import { LenisProvider } from '@/shared/components/LenisProvider';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

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
  icons: {
    shortcut: '/favicon.ico',
    apple: [{url: '/apple-touch-icon.png', sizes: '180x180'}],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: 'The Move',
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
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
        <SpeedInsights />
        <Analytics />

        <LenisProvider>
          <MainLayout>{children}</MainLayout>
        </LenisProvider>
      </body>
    </html>
  );
}
