import { motion } from "framer-motion";

type ProjectCardProps = {
    image: string;
    title: string;
};

export const ProjectCard = ({ image, title }: ProjectCardProps) => (
    <div className="w-full cursor-pointer group  box-border">
        {/* Image Container with Border Overlay */}
        <div className="relative overflow-hidden">
            {/* Border Overlay (inside image container only) */}
            <div className="absolute inset-0 border-[20px] border-[#633b2f] opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out z-10 pointer-events-none"></div>

            {/* Image */}
            <motion.img
                src={image}
                alt={title}
                className="w-full h-auto object-cover"
                whileHover={{ scale: 1.05 }}
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
