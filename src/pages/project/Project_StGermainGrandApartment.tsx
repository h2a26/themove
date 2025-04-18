// pages/project/Project_StGermainGrandApartment.tsx
import { useEffect, useState } from 'react';
import { ProjectSection } from '../../components/project/ProjectSection.tsx';
import {ProjectDetails} from "../../components/project/ProjectDetails.tsx";
import {FeaturedProjectGuard, Project} from "../../guard/FeaturedProjectGuard.tsx";


export const Project_StGermainGrandApartment = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        // IIFE pattern to avoid returning a promise from useEffect
        (async () => {
            try {
                const res = await fetch('/data/Project_StGermainGrandApartment.json');
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

    const featuredProject = FeaturedProjectGuard(projects);

    return (
        <>
            <ProjectSection projects={projects} />
            {featuredProject && <ProjectDetails {...featuredProject} />}
        </>
    );
};