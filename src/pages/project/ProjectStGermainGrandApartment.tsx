// pages/project/ProjectStGermainGrandApartment.tsx
import { useEffect, useState } from 'react';
import { ProjectSection } from '../../components/project/ProjectSection.tsx';

type Project = {
    id: number;
    image: string;
    aspect: 'landscape' | 'portrait';
};

export const ProjectStGermainGrandApartment = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        // IIFE pattern to avoid returning a promise from useEffect
        (async () => {
            try {
                const res = await fetch('/data/ProjectParksideFamilyHome.json');
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

    return <ProjectSection projects={projects} />;
};