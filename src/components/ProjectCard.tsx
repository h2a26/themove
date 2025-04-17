import { motion } from "framer-motion";

type ProjectCardProps = {
    image: string;
    title: string;
};

export const ProjectCard = ({ image, title }: ProjectCardProps) => (
    <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="w-full cursor-pointer group"
    >
        {/* Image Container with Border Overlay */}
        <div className="relative overflow-hidden">
            {/* Border Overlay (inside image container only) */}
            <div className="absolute inset-0 border-[0px] border-[#633b2f] opacity-0 group-hover:opacity-100 group-hover:border-[20px] transition-all duration-1000 ease-in-out z-10 pointer-events-none"></div>

            {/* Image */}
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.05]"
            />
        </div>

        {/* Caption - outside image container */}
        <p className="mt-[17px] mb-[54px] text-sm uppercase tracking-wide text-center text-deep-black">
            {title}
        </p>
    </motion.div>
);
