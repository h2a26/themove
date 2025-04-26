import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contact | The Move',
  description: 'Contact The Move — luxury interior designers in Myanmar. Get in touch for collaborations, inquiries, or consultations.',
  alternates: {
    canonical: 'https://themovearchids.vercel.app/contact',
  },
  openGraph: {
    title: 'Contact | The Move',
    description: 'Contact The Move — luxury interior designers in Myanmar. Get in touch for collaborations, inquiries, or consultations.',
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

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
