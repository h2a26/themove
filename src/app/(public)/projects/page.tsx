import { ProjectsSection } from '@/shared/components/projects/ProjectsSection';
import { blobMediaUrl } from '@/shared/lib/blob-client';
import { getProjectList, getChapters } from '@/shared/lib/blob-data';
import type { ProjectCatalogueEntry } from '@/shared/types/project';
import type { ScrollOfSpacesProject } from '@/shared/components/projects/ScrollOfSpaces';

function toScrollProject(entry: ProjectCatalogueEntry): ScrollOfSpacesProject {
  return {
    id: entry.id,
    title: entry.title,
    description: entry.description,
    image: blobMediaUrl(entry.image),
    routeTo: entry.routeTo,
    location: entry.location,
    locationCity: entry.locationCity,
    category: entry.category,
    style: entry.style,
    moodTags: entry.moodTags,
    frameArchetype: entry.frameArchetype,
  };
}

export default async function ProjectsPage() {
  const [projectList, chapterList] = await Promise.all([getProjectList(), getChapters()]);
  const projects = projectList.map(toScrollProject);
  return <ProjectsSection projects={projects} chapters={chapterList} />;
}
