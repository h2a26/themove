import { ScrollOfSpaces, type ScrollOfSpacesProject } from '@/shared/components/projects/ScrollOfSpaces';
import type { ChapterDefinition } from '@/shared/lib/group-catalogue-by-chapter';

type ProjectsSectionProps = {
  projects: ScrollOfSpacesProject[];
  chapters: ChapterDefinition[];
  savedSlugs?: string[];
  userId?: string | null;
};

export const ProjectsSection = ({ projects, chapters, savedSlugs, userId }: ProjectsSectionProps) => {
  return <ScrollOfSpaces projects={projects} chapters={chapters} savedSlugs={savedSlugs} userId={userId} />;
};
