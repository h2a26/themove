import { Metadata } from 'next'
import React from 'react'
import { SITE_URL, OG_IMAGE, OG_IMAGE_ALT } from '@/shared/constants/site-metadata'

export const metadata: Metadata = {
  title: 'Books | The Move',
  description:
    'Download The Move Project Showcase Book — a curated collection of residential, commercial, and hospitality interiors in Myanmar.',
  alternates: {
    canonical: `${SITE_URL}/books`,
  },
  openGraph: {
    title: 'Books | The Move',
    description:
      'Download The Move Project Showcase Book — interior design and architecture across Myanmar.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_IMAGE_ALT }],
  },
}

export default function BooksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
