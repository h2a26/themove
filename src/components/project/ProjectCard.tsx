// components/project/ProjectCard.tsx
import { memo } from 'react';

type ProjectCardProps = {
    image: string;
    aspect: 'landscape' | 'portrait';
    caption?: string;
};

export const ProjectCard = memo(({ image, aspect, caption }: ProjectCardProps) => {
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

            {/* Optional overlay caption for the first card */}
            {caption && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <p className="text-white text-2xl md:text-4xl tracking-wide text-center px-4 font-caption">
                        {caption}
                    </p>
                </div>
            )}
        </div>
    );
});
