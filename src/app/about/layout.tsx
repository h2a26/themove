import { Metadata } from 'next';
import React from 'react';
import {
  ABOUT_DESCRIPTION,
  ABOUT_TITLE,
  OG_IMAGE,
  OG_IMAGE_ALT,
  SITE_URL,
} from '@/shared/constants/site-metadata';

export const metadata: Metadata = {
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: OG_IMAGE_ALT,
      },
    ],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
