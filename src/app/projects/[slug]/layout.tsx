import { Metadata } from 'next';
import React from 'react';
import { isValidProjectSlug } from '@/shared/guard/projectValidation';

async function getProjectData(slug: string) {
  if (!isValidProjectSlug(slug)) return null;
  try {
    const data = await import(`@/public/data/projects/${slug}/data`);
    return data.default;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const projects = await getProjectData(slug);
  const project = projects?.[0];

  if (!project) {
    return {
      title: 'Project Not Found | The Move',
      description: 'This project does not exist in our studio.',
      alternates: {
        canonical: `https://themovearchids.vercel.app/projects/${slug}`,
      },
    };
  }

  return {
    title: `${project.caption || 'Project'} | The Move`,
    description: project.purpose
      ? `${project.purpose}${project.location ? ' – ' + project.location : ''} | Luxury & Minimalist design by The Move.`
      : 'Discover details of this project from our studio. Luxury & Minimalist design by The Move.',
    alternates: {
      canonical: `https://themovearchids.vercel.app/projects/${slug}`,
    },
    openGraph: {
      title: `${project.caption || 'Project'} | The Move`,
      description: project.purpose || '',
      images: [
        {
          url: project.image ? `${project.image}` : 'https://themovearchids.vercel.app/preview.jpg',
          width: 1200,
          height: 630,
          alt: 'The Move — a luxury & minimalist interior design studio in Myanmar',
        },
      ],
    },
  };
}

export default function ProjectSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
