import { Metadata } from 'next';
import React from 'react';
import { OG_IMAGE_ALT } from '@/shared/constants/site-metadata';
import { isValidProjectSlug } from '@/shared/guard/projectValidation';
import { parseProjectData } from '@/shared/lib/project-data';

async function getProjectMeta(slug: string) {
  if (!isValidProjectSlug(slug)) return null;
  try {
    const data = await import(`@/public/data/projects/${slug}/data`);
    return parseProjectData(data.default).meta;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getProjectMeta(slug);

  if (!meta) {
    return {
      title: 'Project Not Found | The Move',
      description: 'This project does not exist in our studio.',
      alternates: {
        canonical: `https://themovearchids.vercel.app/projects/${slug}`,
      },
    };
  }

  return {
    title: `${meta.title} | The Move`,
    description: meta.purpose
      ? `${meta.purpose}${meta.location ? ' – ' + meta.location : ''} | Interior design & architecture by The Move.`
      : 'Discover details of this project from our studio. Interior design & architecture by The Move.',
    alternates: {
      canonical: `https://themovearchids.vercel.app/projects/${slug}`,
    },
    openGraph: {
      title: `${meta.title} | The Move`,
      description: meta.oneLine || meta.purpose,
      images: [
        {
          url: 'https://themovearchids.vercel.app/preview.jpg',
          width: 1200,
          height: 630,
          alt: OG_IMAGE_ALT,
        },
      ],
    },
  };
}

export default function ProjectSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
