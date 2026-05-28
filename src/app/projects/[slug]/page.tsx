import { notFound } from 'next/navigation';
import { ProjectSection } from '@/shared/components/project/ProjectSection';
import { ProjectDetails } from '@/shared/components/project/ProjectDetails';
import { featuredProjectGuard } from '@/shared/guard/featuredProjectGuard';
import { toDetailGallery } from '@/shared/lib/project-data';
import { blobMediaUrl } from '@/shared/lib/blob-client';
import { getProjectMeta, getProjectGallery } from '@/shared/lib/blob-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectSlugPage({ params }: PageProps) {
  const { slug } = await params;

  let meta, gallery;
  try {
    [meta, gallery] = await Promise.all([getProjectMeta(slug), getProjectGallery(slug)]);
  } catch {
    return notFound();
  }

  const projectDataFile = {
    meta,
    gallery: gallery.map((item) => ({ ...item, image: blobMediaUrl(item.image) })),
  };

  const projects = toDetailGallery(projectDataFile);
  if (!projects.length) return notFound();

  const featuredProject = featuredProjectGuard(projects);
  return (
    <>
      <ProjectSection projects={projects} />
      {featuredProject && <ProjectDetails {...featuredProject} />}
    </>
  );
}
