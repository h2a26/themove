// components/project/ProjectCard.tsx
import { memo } from 'react';

type ProjectCardProps = {
    image: string;
    aspect: 'landscape' | 'portrait';
};

export const ProjectCard = memo(({ image, aspect }: ProjectCardProps) => {
    const aspectClass = aspect === 'landscape' ? 'aspect-[16/10]' : 'aspect-[9/13]';

    return (
        <div className={`relative w-full ${aspectClass}`}>
            <img
                src={image}
                alt=""
                className="object-cover w-full h-full transition-opacity duration-500 ease-in-out"
                loading="lazy"
                decoding="async"
            />
        </div>
    );
});
