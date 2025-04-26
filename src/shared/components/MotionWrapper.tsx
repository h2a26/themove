'use client';
import { motion, Variants } from 'framer-motion';
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
  fadeUp: {
    initial: { opacity: 0, y: -16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 16 },
  },
  fadeSlide: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
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

export function MotionWrapper({
  children,
  variant = 'fadeUp',
  transition = 'smooth',
  className = '',
}: {
  children: React.ReactNode;
  variant?: keyof typeof variantsPreset;
  transition?: keyof typeof transitions;
  className?: string;
}) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variantsPreset[variant]}
      transition={transitions[transition]}
      className={className}
    >
      {children}
    </motion.div>
  );
}
