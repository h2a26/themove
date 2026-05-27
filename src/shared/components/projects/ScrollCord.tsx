'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import type { RefObject } from 'react';
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion';
import { useWeatherMode } from '@/shared/state/weather-mode-context';
import { getShinkaiWeatherTheme } from '@/shared/theme/shinkaiWeather';

type ScrollCordProps = {
  containerRef: RefObject<HTMLElement | null>;
};

/**
 * Subtle vertical kumihimo strand — connects vignettes (hero cord vocabulary, scroll-only).
 */
export function ScrollCord({ containerRef }: ScrollCordProps) {
  const { mode } = useWeatherMode();
  const cord = getShinkaiWeatherTheme(mode).cord;
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.06, 0.94, 1], [0, 0.35, 0.35, 0]);
  const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [1, 0]);

  if (reducedMotion) return null;

  return (
    <motion.div
      className="pointer-events-none absolute left-3 top-0 z-10 block h-full w-4 md:left-6 lg:left-10"
      style={{ opacity }}
      aria-hidden
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 4 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 2 0 Q 2.8 25, 2 50 T 2 100"
          fill="none"
          stroke={cord.primary}
          strokeWidth={0.35}
          strokeLinecap="round"
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          style={{
            strokeDasharray: 1,
            strokeDashoffset,
          }}
        />
      </svg>
    </motion.div>
  );
}
