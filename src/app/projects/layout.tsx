import { Metadata } from 'next';
import React from 'react';
import {
  OG_IMAGE,
  OG_IMAGE_ALT,
  PROJECTS_DESCRIPTION,
  PROJECTS_TITLE,
  SITE_URL,
} from '@/shared/constants/site-metadata';

export const metadata: Metadata = {
  title: PROJECTS_TITLE,
  description: PROJECTS_DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
  openGraph: {
    title: PROJECTS_TITLE,
    description: PROJECTS_DESCRIPTION,
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

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
