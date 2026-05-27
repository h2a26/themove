import { ScrollOfSpaces, type ScrollOfSpacesProject } from '@/shared/components/projects/ScrollOfSpaces';

type ProjectsSectionProps = {
  projects: ScrollOfSpacesProject[];
};

export const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  return <ScrollOfSpaces projects={projects} />;
};
