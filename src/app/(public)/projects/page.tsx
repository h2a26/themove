import { ProjectsSection } from '@/shared/components/projects/ProjectsSection';
import { blobMediaUrl } from '@/shared/lib/blob-client';
import { getProjectList, getChapters, getSavedSlugs } from '@/shared/lib/blob-data';
import type { ProjectCatalogueEntry } from '@/shared/types/project';
import type { ScrollOfSpacesProject } from '@/shared/components/projects/ScrollOfSpaces';
import { auth } from '@/auth';

function toScrollProject(entry: ProjectCatalogueEntry): ScrollOfSpacesProject {
  return {
    id: entry.id,
    slug: entry.slug,
    title: entry.title,
    description: entry.description,
    image: blobMediaUrl(entry.image),
    routeTo: entry.routeTo,
    category: entry.category,
    frameArchetype: entry.frameArchetype,
  };
}

export default async function ProjectsPage() {
  const session = await auth();
  const userId = (session?.user as { id?: string; role?: string } | undefined);
  const publicUserId = userId?.role === 'admin' ? null : (userId?.id ?? null);

  const [projectList, chapterList, savedSlugs] = await Promise.all([
    getProjectList(),
    getChapters(),
    publicUserId
      ? getSavedSlugs(publicUserId).catch(() => [] as string[])
      : Promise.resolve([] as string[]),
  ]);

  const projects = projectList.map(toScrollProject);
  return (
    <ProjectsSection
      projects={projects}
      chapters={chapterList}
      savedSlugs={savedSlugs}
      userId={publicUserId}
    />
  );
}
