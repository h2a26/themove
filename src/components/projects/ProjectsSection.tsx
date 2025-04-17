// components/project/ProjectSection.tsx
import { ProjectsCard } from "./ProjectsCard.tsx";

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
        <section className="pt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-0 md:gap-x-[2px]">
                {projects.map(project => (
                    <ProjectsCard
                        key={project.id}
                        image={project.image}
                        title={project.title}
                        borderColor={project.borderColor}
                        routeTo={project.routeTo}
                    />
                ))}
            </div>
        </section>
    );
};
