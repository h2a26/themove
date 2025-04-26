import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'About Us | Luxury Interior Designers in Myanmar - The Move',
  description: 'Meet the creative team behind The Move — a minimalist and luxury interior design studio in Myanmar, redefining spaces with aesthetic elegance.',
  alternates: {
    canonical: 'https://themovearchids.vercel.app/about',
  },
  openGraph: {
    title: 'About Us | Luxury Interior Designers in Myanmar - The Move',
    description: 'Meet the creative team behind The Move — a minimalist and luxury interior design studio in Myanmar, redefining spaces with aesthetic elegance.',
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

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
