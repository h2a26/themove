// components/MotionWrapper.tsx
import { motion, Variants, Transition } from 'framer-motion';
import React from 'react';

const transitions = {
    smooth: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96], // Apple-style luxury curve
    },
    slow: {
        duration: 1,
        ease: [0.43, 0.13, 0.23, 0.96],
    },
};

const variantsPreset: Record<string, Variants> = {
    //You want elements to softly rise into view – great for sections, pages
    fadeUp: {
        initial: { opacity: 0, y: -16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
    },
    //You want a horizontal motion – for page transitions, carousels
    fadeSlide: {
        initial: { opacity: 0, x: 40 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
    },
    //You want cards/modals to feel like they “grow” in with subtle presence
    zoomIn: {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
    },
    //You just want clean opacity transitions – for tooltips, snacks, etc
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    },
};

type MotionWrapperProps = {
    children: React.ReactNode;
    preset?: keyof typeof variantsPreset;
    variants?: Variants;
    transition?: Transition;
    className?: string;
};

export const MotionWrapper = ({
                                  children,
                                  preset = 'fadeUp',
                                  variants,
                                  transition = transitions.smooth,
                                  className,
                              }: MotionWrapperProps) => {
    const selectedVariants = variants ?? variantsPreset[preset];

    return (
        <motion.div
            className={className}
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
