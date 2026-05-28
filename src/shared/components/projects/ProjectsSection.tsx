import { ScrollOfSpaces, type ScrollOfSpacesProject } from '@/shared/components/projects/ScrollOfSpaces';
import type { ChapterDefinition } from '@/shared/lib/group-catalogue-by-chapter';

type ProjectsSectionProps = {
  projects: ScrollOfSpacesProject[];
  chapters: ChapterDefinition[];
};

export const ProjectsSection = ({ projects, chapters }: ProjectsSectionProps) => {
  return <ScrollOfSpaces projects={projects} chapters={chapters} />;
};
