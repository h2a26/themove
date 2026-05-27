'use client';

import { AnimatedLine, AnimatedPath } from '@/shared/components/line-art/AnimatedPath';
import { getFrameStrokes, STROKE_WEIGHT } from '@/shared/components/line-art/tokens';
import type { FrameComponentProps } from './frame-props';

/** Warm minimal interior — room box, window light */
export function InteriorChamberFrame({
  mood,
  drawProgress,
  useMountAnimation = false,
}: FrameComponentProps) {
  const s = getFrameStrokes(mood);

  return (
    <svg
      viewBox="0 0 250 300"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <g fill="none" strokeLinecap="round">
        <AnimatedPath
          d="M 35 220 L 35 90 L 215 90 L 215 220 Z"
          stroke={s.faint}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.15}
          opacity={0.4}
        />
        <AnimatedPath
          d="M 55 220 L 55 110 L 195 110 L 195 220"
          stroke={s.primary}
          strokeWidth={STROKE_WEIGHT.structural}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.35}
        />
        <AnimatedPath
          d="M 75 110 L 75 55 L 175 55 L 175 110"
          stroke={s.light}
          strokeWidth={STROKE_WEIGHT.medium}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.5}
        />
        <AnimatedLine
          x1={125}
          y1={55}
          x2={125}
          y2={35}
          stroke={s.light}
          strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.6}
          opacity={0.5}
        />
        {[0, 1, 2].map((i) => (
          <AnimatedLine
            key={`floor-${i}`}
            x1={55}
            y1={145 + i * 28}
            x2={195}
            y2={145 + i * 28}
            stroke={s.faint}
            strokeWidth={STROKE_WEIGHT.faint}
            drawProgress={drawProgress}
            useMountAnimation={useMountAnimation}
            delay={0.7 + i * 0.06}
            opacity={0.45}
          />
        ))}
        <AnimatedPath
          d="M 90 220 L 90 155 L 160 155 L 160 220"
          stroke={s.wood}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.85}
          opacity={0.65}
        />
      </g>
    </svg>
  );
}
