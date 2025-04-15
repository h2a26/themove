import { motion } from 'framer-motion';

export const Gallery = () => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1, ease: 'easeInOut'}}
        >
            <h1 className="text-center text-3xl mt-24">Gallery Page</h1>
        </motion.div>
    );
};
