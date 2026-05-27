import './globals.css';
import type { Metadata, Viewport } from 'next';
import { MainLayout } from '@/shared/layouts/MainLayout';
import React from 'react';
import { acaslonPro, euclidCircularB, euclid, allrounderAntiqua } from './fonts';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import {
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from '@/shared/constants/site-metadata';

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: OG_IMAGE,
  },
  icons: {
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'The Move',
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={[
        acaslonPro.variable,
        euclidCircularB.variable,
        euclid.variable,
        allrounderAntiqua.variable,
      ].join(' ')}
    >
      {/* suppressHydrationWarning: browser extensions (e.g. cz-shortcut-listen) mutate body before hydrate */}
      <body suppressHydrationWarning>
        <SpeedInsights />
        <Analytics />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
