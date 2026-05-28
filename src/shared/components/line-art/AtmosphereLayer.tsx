'use client';

import { motion } from 'framer-motion';
import type { FrameMood } from '@/shared/components/frames/types';

export type AtmosphereVariant = 'golden' | 'mist' | 'rain' | 'blueHour';

export function getAtmosphereVariant(mood: FrameMood): AtmosphereVariant {
  switch (mood) {
    case 'traditional-golden':
    case 'paris-morning':
    case 'summer-bright':
    case 'mandalay-warm':
      return 'golden';
    case 'london-mist':
    case 'yangon-mist':
      return 'rain';
    case 'winter-still':
    case 'hill-station-calm':
      return 'mist';
    case 'contemporary-blue':
    default:
      return 'blueHour';
  }
}

type AtmosphereLayerProps = {
  variant: AtmosphereVariant;
  opacity?: number;
  className?: string;
};

/** Deterministic 0–1 — SSR-safe */
function variation(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
}

export function AtmosphereLayer({
  variant,
  opacity = 1,
  className = '',
}: AtmosphereLayerProps) {
  const isRain = variant === 'rain';
  const isGolden = variant === 'golden';
  const count = isRain ? 28 : 18;

  const particleColor = isRain
    ? 'rgba(148, 163, 184, 0.45)'
    : isGolden
      ? 'rgba(251, 191, 36, 0.4)'
      : variant === 'blueHour'
        ? 'rgba(99, 102, 168, 0.30)'
        : 'rgba(203, 213, 225, 0.4)';

  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden
    >
      {Array.from({ length: count }, (_, i) => {
        const left = (i * 17 + 11) % 100;
        const top = (i * 23 + 7) % 100;

        if (isRain) {
          return (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: 1,
                height: 6 + (i % 5) * 2,
                backgroundColor: particleColor,
              }}
              animate={{ y: [0, 28, 0], opacity: [0.15, 0.55, 0.15] }}
              transition={{
                duration: 1.1 + (i % 4) * 0.12,
                repeat: Infinity,
                delay: i * 0.04,
                ease: 'linear',
              }}
            />
          );
        }

        const size = 1.5 + variation(i) * 1.5;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              backgroundColor: particleColor,
            }}
            animate={{
              y: [0, -14, 0],
              x: [0, 5, -3, 0],
              opacity: [0.2, 0.55, 0.2],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              delay: i * 0.1,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </motion.div>
  );
}
