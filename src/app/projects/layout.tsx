import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Projects | The Move',
  description: 'Explore our portfolio of luxury interior design projects in Myanmar, spanning commercial, residential, and hospitality spaces.',
  alternates: {
    canonical: 'https://themovearchids.vercel.app/projects',
  },
  openGraph: {
    title: 'Projects | The Move',
    description: 'Explore our portfolio of luxury & minimalist interior design projects in Myanmar, spanning commercial, residential, and hospitality spaces.',
    images: [
      {
        url: 'https://themovearchids.vercel.app/preview.jpg',
        width: 1200,
        height: 630,
        alt: 'The Move — a luxury & minimalist interior design studio in Myanmar',
      }
    ]
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
