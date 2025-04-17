// pages/Projects.tsx
import { MotionWrapper } from "../../components/MotionWrapper.tsx";
import { ProjectsSection } from "../../components/projects/ProjectsSection.tsx";
import {useEffect, useState} from "react";

type Project = {
    id: number;
    title: string;
    image: string;
    borderColor: string;
    routeTo: string;
};

export const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch('/data/ProjectList.json')
            .then((res) => res.json())
            .then((data) => setProjects(data))
            .catch((err) => console.error('Failed to load project data:', err));
    }, []);

    if (projects.length === 0) {
        return <div className="text-center mt-24">Loading projects...</div>;
    }

    return (
        <MotionWrapper>
            <ProjectsSection projects={projects} />;
        </MotionWrapper>
    );
};