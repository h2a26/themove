import { ProjectsSection } from '@/shared/components/projects/ProjectsSection';
import projectList from '@/public/data/project-list.json';

export default function ProjectsPage() {
  return <ProjectsSection projects={projectList} />;
}
