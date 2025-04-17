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
                    {projects.map(({id, image, aspect}) => (
                        <div
                            key={id}
                            className={aspect === 'landscape' ? 'col-span-1 md:col-span-2' : 'col-span-1'}
                        >
                            <ProjectCard image={image} aspect={aspect}/>
                        </div>
                    ))}
                </section>
            </div>
        </MotionWrapper>
    );
};
