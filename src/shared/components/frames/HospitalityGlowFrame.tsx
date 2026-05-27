'use client';

import { AnimatedLine, AnimatedPath } from '@/shared/components/line-art/AnimatedPath';
import { getFrameStrokes, STROKE_WEIGHT } from '@/shared/components/line-art/tokens';
import type { FrameComponentProps } from './frame-props';

/** Cafes, hotels — pendant curves, steam, warm threshold */
export function HospitalityGlowFrame({
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
          d="M 50 220 L 50 130 L 200 130 L 200 220"
          stroke={s.primary}
          strokeWidth={STROKE_WEIGHT.structural}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.2}
        />
        <AnimatedPath
          d="M 40 130 Q 125 105, 210 130"
          stroke={s.primary}
          strokeWidth={STROKE_WEIGHT.medium}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.35}
        />
        {[0, 1, 2].map((i) => (
          <AnimatedPath
            key={`lamp-${i}`}
            d={`M ${75 + i * 50} 130 Q ${75 + i * 50} 95, ${68 + i * 50} 85`}
            stroke={s.light}
            strokeWidth={STROKE_WEIGHT.light}
            drawProgress={drawProgress}
            useMountAnimation={useMountAnimation}
            delay={0.5 + i * 0.1}
          />
        ))}
        {[0, 1].map((i) => (
          <AnimatedPath
            key={`steam-${i}`}
            d={`M ${100 + i * 40} 175 Q ${108 + i * 40} 155, ${100 + i * 40} 140`}
            stroke={s.faint}
            strokeWidth={STROKE_WEIGHT.faint}
            drawProgress={drawProgress}
            useMountAnimation={useMountAnimation}
            delay={0.85 + i * 0.08}
            opacity={0.5}
          />
        ))}
        <AnimatedLine
          x1={70}
          y1={200}
          x2={180}
          y2={200}
          stroke={s.wood}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.75}
          opacity={0.55}
        />
        <AnimatedPath
          d="M 90 220 L 90 175 L 160 175 L 160 220"
          stroke={s.wood}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.9}
          opacity={0.5}
        />
      </g>
    </svg>
  );
}
