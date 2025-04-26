import { notFound } from 'next/navigation';
import { ProjectSection } from '@/shared/components/project/ProjectSection';
import { ProjectDetails } from '@/shared/components/project/ProjectDetails';
import { featuredProjectGuard } from '@/shared/guard/featuredProjectGuard';
import ProjectIndexGalleryClient from './ProjectIndexGalleryClient';
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

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const projects = await getProjectData(slug);
  if (!projects) return notFound();
  const featuredProject = featuredProjectGuard(projects);
  return (
    <>
      <ProjectSection projects={projects} />
      {featuredProject && <ProjectDetails {...featuredProject} />}
      <ProjectIndexGalleryClient slug={slug} />
    </>
  );
}
