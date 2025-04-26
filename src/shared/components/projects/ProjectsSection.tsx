import { MotionWrapper } from '@/shared/components/MotionWrapper';
import { ProjectsCard } from '@/shared/components/projects/ProjectsCard';

type Project = {
  id: number;
  title: string;
  image: string;
  borderColor: string;
  routeTo: string;
};

type ProjectsSectionProps = {
  projects: Project[];
};

export const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  return (
    <MotionWrapper>
      <section className="pt-13">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-0 md:gap-x-[2px]">
          {projects.map((project) => (
            <ProjectsCard
              key={project.id}
              title={project.title}
              image={project.image}
              borderColor={project.borderColor}
              routeTo={project.routeTo}
            />
          ))}
        </div>
      </section>
    </MotionWrapper>
  );
};
