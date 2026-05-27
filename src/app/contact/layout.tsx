import { Metadata } from 'next';
import React from 'react';
import {
  CONTACT_DESCRIPTION,
  CONTACT_TITLE,
  OG_IMAGE,
  OG_IMAGE_ALT,
  SITE_URL,
} from '@/shared/constants/site-metadata';

export const metadata: Metadata = {
  title: CONTACT_TITLE,
  description: CONTACT_DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: CONTACT_TITLE,
    description: CONTACT_DESCRIPTION,
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

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
