import { MotionWrapper } from '@/shared/components/MotionWrapper';
import { ProjectCard } from '@/shared/components/project/ProjectCard';
import { Project } from '@/shared/types/project';

type ProjectsSectionProps = {
  projects: Project[];
};

export const ProjectSection = ({ projects }: ProjectsSectionProps) => {
  return (
    <MotionWrapper>
      <div className="max-w-[1920px] mx-auto pt-16">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
          {projects.map(({ id, image, aspect, caption }) => (
            <div
              key={id}
              className={aspect === 'landscape' ? 'col-span-1 md:col-span-2' : 'col-span-1'}
            >
              <ProjectCard image={image} aspect={aspect} caption={caption} />
            </div>
          ))}
        </section>
      </div>
    </MotionWrapper>
  );
};
