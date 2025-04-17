// components/projects/ProjectsCard.tsx
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { memo } from 'react';

type ProjectCardProps = {
    title: string;
    image: string;
    borderColor: string;
    routeTo: string;
};

export const ProjectsCard = memo(({ title, image, borderColor, routeTo }: ProjectCardProps) => {
    return (
        <Link to={routeTo} className="w-full cursor-pointer group box-border">
            {/* Image Container with Border Overlay */}
            <div className="relative overflow-hidden">
                {/* Border Overlay */}
                <div className="border-overlay" style={{ borderColor }}></div>

                {/* Image */}
                <motion.img
                    alt={title}
                    src={image}
                    className="w-full h-auto object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{
                        duration: 1.6,
                        ease: [0.19, 1, 0.22, 1],
                    }}
                    loading="lazy"
                />
            </div>

            {/* Caption */}
            <p className="mt-[17px] mb-[54px] text-sm uppercase tracking-wide text-center text-deep-black">
                {title}
            </p>
        </Link>
    );
});
