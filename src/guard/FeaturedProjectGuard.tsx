// guard/FeaturedProjectGuard.tsx

export type Project = {
    id: number;
    image: string;
    aspect: 'landscape' | 'portrait';
    caption?: string;
    featured?: boolean;
    client?: string;
    location?: string;
    status?: string;
    sectors?: string[];
    purpose?: string;
};

export const FeaturedProjectGuard = (projects: Project[]) => {
    return projects.find(project => project.featured === true);
};