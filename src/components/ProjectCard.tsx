import { motion } from "framer-motion";

type ProjectCardProps = {
    image: string;
    title: string;
    borderColor: string;
};

export const ProjectCard = ({ image, title, borderColor }: ProjectCardProps) => (
    <div className="w-full cursor-pointer group box-border">
        {/* Image Container with Border Overlay */}
        <div className="relative overflow-hidden">
            {/* Border Overlay (inside image container only) */}
            <div className="border-overlay" style={{borderColor}}></div>

            {/* Image */}
            <motion.img
                src={image}
                alt={title}
                className="w-full h-auto object-cover"
                whileHover={{scale: 1.05}}
                transition={{
                    duration: 1.6,
                    ease: [0.19, 1, 0.22, 1],
                }}
            />
        </div>

        {/* Caption */}
        <p className="mt-[17px] mb-[54px] text-sm uppercase tracking-wide text-center text-deep-black">
            {title}
        </p>
    </div>
);
