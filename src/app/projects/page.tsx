import { ProjectsSection } from '@/shared/components/projects/ProjectsSection';
import { normalizeImageUrl } from '@/shared/lib/project-data';
import projectList from '@/public/data/project-list.json';
import type { ProjectCatalogueEntry } from '@/shared/types/project';
import type { ScrollOfSpacesProject } from '@/shared/components/projects/ScrollOfSpaces';

function toScrollProject(entry: ProjectCatalogueEntry): ScrollOfSpacesProject {
  return {
    id: entry.id,
    title: entry.title,
    description: entry.description,
    image: normalizeImageUrl(entry.image),
    routeTo: entry.routeTo,
    location: entry.location,
    locationCity: entry.locationCity,
    category: entry.category,
    style: entry.style,
    moodTags: entry.moodTags,
    frameArchetype: entry.frameArchetype,
  };
}

export default function ProjectsPage() {
  const projects = (projectList as ProjectCatalogueEntry[]).map(toScrollProject);
  return <ProjectsSection projects={projects} />;
}
