// pages/Projects.tsx
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
        // IIFE pattern to avoid returning a promise from useEffect
        (async () => {
            try {
                const res = await fetch('/data/ProjectList.json');
                const data = await res.json();
                setProjects(data);
            } catch (err) {
                console.error('Failed to load project data:', err);
            }
        })();
    }, []);

    if (projects.length === 0) {
        return <div className="text-center mt-24">Loading projects...</div>;
    }

    return <ProjectsSection projects={projects} />;
};