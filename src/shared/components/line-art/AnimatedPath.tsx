'use client';

import { motion } from 'framer-motion';
import { SHINKAI_EASE } from './tokens';

type AnimatedPathProps = {
  d: string;
  stroke: string;
  strokeWidth?: number;
  drawProgress: number;
  /** Mount animation delay (seconds) when drawProgress is driven externally */
  delay?: number;
  duration?: number;
  useMountAnimation?: boolean;
  opacity?: number;
};

export function AnimatedPath({
  d,
  stroke,
  strokeWidth = 0.8,
  drawProgress,
  delay = 0,
  duration = 1.2,
  useMountAnimation = false,
  opacity = 1,
}: AnimatedPathProps) {
  if (useMountAnimation) {
    return (
      <motion.path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={opacity}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration, delay, ease: [...SHINKAI_EASE] }}
      />
    );
  }

  return (
    <path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={opacity}
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - drawProgress}
    />
  );
}

type AnimatedLineProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke: string;
  strokeWidth?: number;
  drawProgress: number;
  delay?: number;
  duration?: number;
  useMountAnimation?: boolean;
  opacity?: number;
};

export function AnimatedLine({
  x1,
  y1,
  x2,
  y2,
  stroke,
  strokeWidth = 0.5,
  drawProgress,
  delay = 0,
  duration = 0.8,
  useMountAnimation = false,
  opacity = 1,
}: AnimatedLineProps) {
  const d = `M ${x1} ${y1} L ${x2} ${y2}`;

  return (
    <AnimatedPath
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      drawProgress={drawProgress}
      delay={delay}
      duration={duration}
      useMountAnimation={useMountAnimation}
      opacity={opacity}
    />
  );
}
