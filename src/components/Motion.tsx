// components/Motion.tsx
import { motion, Variants, Transition } from 'framer-motion';
import React from 'react';

// Define shared transition presets
const transitions = {
    springy: {
        type: 'spring',
        stiffness: 80,
        damping: 20,
        mass: 0.8,
    },
    smooth: {
        duration: 0.6,
        ease: 'easeInOut',
    },
};

// Define animation variant presets
const variantsPreset: Record<string, Variants> = {
    fadeUp: {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -30 },
    },
    zoomIn: {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
    },
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    },
};

type PageWrapperProps = {
    children: React.ReactNode;

    /**
     * Choose a preset name (fadeUp, zoomIn, fade) or pass custom variants
     */
    preset?: keyof typeof variantsPreset;

    /**
     * Custom variants override (optional)
     */
    variants?: Variants;

    /**
     * Transition override
     */
    transition?: Transition;
};

export const Motion = ({
                                children,
                                preset = 'fadeUp',
                                variants,
                                transition = transitions.smooth,
                            }: PageWrapperProps) => {
    const selectedVariants = variants ?? variantsPreset[preset];

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={selectedVariants}
            transition={transition}
        >
            {children}
        </motion.div>
    );
};
