'use client';

import dynamic from 'next/dynamic';

const ProjectIndexGallery = dynamic(
  () =>
    import('@/shared/components/project/ProjectIndexGallery').then(
      (mod) => mod.ProjectIndexGallery,
    ),
  { ssr: false },
);

export default function ProjectIndexGalleryClient({ slug }: { slug: string }) {
  return <ProjectIndexGallery slug={slug} />;
}
