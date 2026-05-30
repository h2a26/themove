'use client';

import { AnimatedLine, AnimatedPath } from '@/shared/components/line-art/AnimatedPath';
import { STROKE_WEIGHT } from '@/shared/components/line-art/tokens';
import type { FrameComponentProps } from './frame-props';

/** Biophilic / porch / garden — trees, horizon, water line */
export function GardenFrame({
  drawProgress,
  useMountAnimation = false,
}: FrameComponentProps) {
  const s = { primary: '#78716c', light: '#94a3b8', faint: '#cbd5e1', wood: '#78716c' } as const;

  return (
    <svg
      viewBox="0 0 250 300"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <g fill="none" strokeLinecap="round">
        <AnimatedPath
          d="M 0 175 Q 60 165, 125 170 Q 190 175, 250 168"
          stroke={s.faint}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.1}
          opacity={0.5}
        />
        <AnimatedPath
          d="M 0 195 Q 125 188, 250 192"
          stroke={s.light}
          strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.2}
          opacity={0.35}
        />
        {/* Water surface ripples */}
        <AnimatedPath
          d="M 0 202 Q 80 197, 160 200 Q 210 198, 250 201"
          stroke={s.faint}
          strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.25}
          opacity={0.30}
        />
        <AnimatedPath
          d="M 20 208 Q 100 204, 180 207"
          stroke={s.faint}
          strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.30}
          opacity={0.22}
        />

        <AnimatedPath
          d="M 30 175 Q 45 120, 60 175"
          stroke={s.wood}
          strokeWidth={STROKE_WEIGHT.medium}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.35}
        />
        {/* Left tree foliage — organic swept form */}
        <AnimatedPath
          d="M 15 175 Q 30 155, 50 165 Q 60 145, 30 135"
          stroke={s.wood}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.38}
          opacity={0.50}
        />
        <AnimatedPath
          d="M 180 175 Q 195 110, 210 175"
          stroke={s.wood}
          strokeWidth={STROKE_WEIGHT.medium}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.42}
        />
        {/* Right tree foliage — mirrored */}
        <AnimatedPath
          d="M 165 175 Q 180 155, 200 165 Q 210 145, 180 135"
          stroke={s.wood}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.45}
          opacity={0.50}
        />
        <AnimatedPath
          d="M 85 220 L 85 165 L 165 165 L 165 220"
          stroke={s.primary}
          strokeWidth={STROKE_WEIGHT.structural}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.55}
        />
        <AnimatedPath
          d="M 70 165 L 125 135 L 180 165"
          stroke={s.wood}
          strokeWidth={STROKE_WEIGHT.bold}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.65}
        />
        <AnimatedPath
          d="M 55 220 L 195 220 L 195 205 L 55 205 Z"
          stroke={s.light}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.8}
          opacity={0.6}
        />
        <AnimatedLine
          x1={55}
          y1={212}
          x2={195}
          y2={212}
          stroke={s.faint}
          strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.95}
        />

        {/* Bamboo / grass marks — right edge foreground */}
        <AnimatedPath
          d="M 220 220 L 215 185"
          stroke={s.wood}
          strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.60}
          opacity={0.40}
        />
        <AnimatedPath
          d="M 228 220 L 225 190"
          stroke={s.wood}
          strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.65}
          opacity={0.35}
        />
      </g>
    </svg>
  );
}
