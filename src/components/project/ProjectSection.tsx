// components/project/ProjectSection.tsx
import { MotionWrapper } from '../../components/MotionWrapper';
import { ProjectCard } from './ProjectCard';

type Project = {
    id: number;
    image: string;
    aspect: 'landscape' | 'portrait';
};

type ProjectsSectionProps = {
    projects: Project[];
};

export const ProjectSection = ({ projects }: ProjectsSectionProps) => {
    return (
        <MotionWrapper>
            <div className="max-w-[1920px] mx-auto pt-16">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
                    {projects.map(project => {
                        if (project.aspect === 'landscape') {
                            return (
                                <div
                                    key={project.id}
                                    className="col-span-1 md:col-span-2"
                                >
                                    <ProjectCard image={project.image} aspect={project.aspect} />
                                </div>
                            );
                        }

                        return (
                            <div key={project.id} className="col-span-1">
                                <ProjectCard image={project.image} aspect={project.aspect} />
                            </div>
                        );
                    })}
                </section>
            </div>
        </MotionWrapper>
    );
};
