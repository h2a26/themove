import { ProjectCard } from "./ProjectCard";

const projects = [
    {
        title: "St Germain Grand Apartment",
        image:
            "https://cdn.sanity.io/images/4jb8q7bc/production/725850fa288c724585c4e76e2655005cc3ce83ca-1440x1860.jpg?w=1440&h=1860&auto=format",
    },
    {
        title: "Parkside Family Home",
        image:
            "https://cdn.sanity.io/images/4jb8q7bc/production/476280b78f60252d73e37d572fbc09fb2e4520fb-1440x1860.jpg?w=1440&amp;h=1860&amp;auto=format",
    },
    {
        title: "San Francisco Apartment",
        image:
            "https://cdn.sanity.io/images/4jb8q7bc/production/45a2c2a11346ddd7dc923a665e5c7a1b2be7ecc9-1440x1860.jpg?w=1440&amp;h=1860&amp;auto=format",
    },
    {
        title: "Belgravia Jewel Bo",
        image:
            "https://cdn.sanity.io/images/4jb8q7bc/production/d599ed69bfa03d6dd1c3bb144ad012e4c260f16f-774x1000.jpg?w=774&amp;h=1000&amp;auto=format",
    },
    {
        title: "Mayfair Pied-à-Terre",
        image:
            "https://cdn.sanity.io/images/4jb8q7bc/production/c04a86c3615fef9bb3346ae02a11d341a8bd611e-1440x1860.jpg?w=1440&amp;h=1860&amp;auto=format",
    },
    {
        title: "Brighton Beach House",
        image:
            "https://cdn.sanity.io/images/4jb8q7bc/production/697a7b32d12b34f9a26e2043d088fba0e1898d5a-1440x1860.jpg?w=1440&amp;h=1860&amp;auto=format",
    },
];

export const ProjectsSection = () => {
    return (
        <section className="pt-16 bg-light-beige">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-0 md:gap-x-[2px]">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        image={project.image}
                        title={project.title}
                    />
                ))}
            </div>
        </section>
    );
};
