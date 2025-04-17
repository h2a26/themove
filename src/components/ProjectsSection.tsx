import { ProjectCard } from "./ProjectCard";

const projects = [
    {
        title: "St Germain Grand Apartment",
        image: "https://cdn.sanity.io/images/4jb8q7bc/production/725850fa288c724585c4e76e2655005cc3ce83ca-1440x1860.jpg?w=1440&h=1860&auto=format",
        borderColor: "#633b2f",
    },
    {
        title: "Parkside Family Home",
        image: "https://cdn.sanity.io/images/4jb8q7bc/production/476280b78f60252d73e37d572fbc09fb2e4520fb-1440x1860.jpg?w=1440&amp;h=1860&amp;auto=format",
        borderColor: "#EEE9E2",
    },
    {
        title: "San Francisco Apartment",
        image: "https://cdn.sanity.io/images/4jb8q7bc/production/45a2c2a11346ddd7dc923a665e5c7a1b2be7ecc9-1440x1860.jpg?w=1440&amp;h=1860&amp;auto=format",
        borderColor: "#B0BFDE",
    },
    {
        title: "Belgravia Jewel Bo",
        image: "https://cdn.sanity.io/images/4jb8q7bc/production/d599ed69bfa03d6dd1c3bb144ad012e4c260f16f-774x1000.jpg?w=774&amp;h=1000&amp;auto=format",
        borderColor: "#645E26",
    },
    {
        title: "Mayfair Pied-à-Terre",
        image: "https://cdn.sanity.io/images/4jb8q7bc/production/c04a86c3615fef9bb3346ae02a11d341a8bd611e-1440x1860.jpg?w=1440&amp;h=1860&amp;auto=format",
        borderColor: "#45519F",
    },
    {
        title: "Brighton Beach House",
        image: "https://cdn.sanity.io/images/4jb8q7bc/production/697a7b32d12b34f9a26e2043d088fba0e1898d5a-1440x1860.jpg?w=1440&amp;h=1860&amp;auto=format",
        borderColor: "#C6A664",
    },
    {
        title: "Parisian Bolthole",
        image: "https://cdn.sanity.io/images/4jb8q7bc/production/893a121595e0480b0fd3fa7dedcb310462b16289-1440x1860.jpg?w=1440&amp;h=1860&amp;auto=format",
        borderColor: "#893521",
    },
    {
        title: "Kensington Pied-à-Terre",
        image: "https://cdn.sanity.io/images/4jb8q7bc/production/23043c29629379f9ffe31c1451e5af59116f606c-1440x1860.jpg?w=1440&amp;h=1860&amp;auto=format",
        borderColor: "#45519F",
    },
    {
        title: "Holland Park Townhouse",
        image: "https://cdn.sanity.io/images/4jb8q7bc/production/e0d4a31a31b34bbc740dcbe653201009b1ec8cb9-1440x1860.jpg?w=1440&amp;h=1860&amp;auto=format",
        borderColor: "#C6A664",
    },
    {
        title: "The Blewcoat School",
        image: "https://cdn.sanity.io/images/4jb8q7bc/production/5e2b7b745a63c9e1e19f80514c26fb8f09ae99e1-1440x1860.jpg?w=1440&amp;h=1860&amp;auto=format",
        borderColor: "#645E26",
    },
    {
        title: "Kensington Villa",
        image: "https://cdn.sanity.io/images/4jb8q7bc/production/52956ba9c93f0929fad99cd73024945a38be2f8e-1440x1860.jpg?w=1440&amp;h=1860&amp;auto=format",
        borderColor: "#EEE9E2",
    },
    {
        title: "Sophie&#x27;s Family Home",
        image: "https://cdn.sanity.io/images/4jb8q7bc/production/17fb0e1fe2cef81d560b0785c9a144d5deba0dd6-1440x1860.jpg?w=1440&amp;h=1860&amp;auto=format",
        borderColor: "#633B2F",
    },
    {
        title: "Kensington Family Townhouse",
        image: "https://cdn.sanity.io/images/4jb8q7bc/production/50e590efaeceecbf531458d8546c38dde7f3e58f-1440x1860.jpg?w=1440&amp;h=1860&amp;auto=format",
        borderColor: "#c3c0bb",
    },
    {
        title: "Peter Pan House",
        image: "https://cdn.sanity.io/images/4jb8q7bc/production/31c376dd4f39aa18f67fabfefd7622419c19eedd-1440x1860.jpg?w=1440&amp;h=1860&amp;auto=format",
        borderColor: "#645E26",
    },
    {
        title: "Covent Garden Penthouse",
        image: "https://cdn.sanity.io/images/4jb8q7bc/production/805b1f201587b66cf51a2fd247d408e7279d064f-1440x1860.jpg?w=1440&amp;h=1860&amp;auto=format",
        borderColor: "#893521",
    },
    {
        title: "Riverside Penthouse",
        image: "https://cdn.sanity.io/images/4jb8q7bc/production/9c18893ae2c5cd4f35241ce3fc0a8cde846eb687-1440x1860.jpg?w=1440&amp;h=1860&amp;auto=format",
        borderColor: "#f2e5dc",
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
                        borderColor={project.borderColor}
                    />
                ))}
            </div>
        </section>
    );
};
