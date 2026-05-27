'use client';

import { AnimatedLine, AnimatedPath } from '@/shared/components/line-art/AnimatedPath';
import { getFrameStrokes, STROKE_WEIGHT } from '@/shared/components/line-art/tokens';
import type { FrameComponentProps } from './frame-props';

/** Retail / storefront threshold — awning, doorframe, display window */
export function ThresholdFrame({
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
          d="M 40 220 L 40 120 L 210 120 L 210 220"
          stroke={s.primary}
          strokeWidth={STROKE_WEIGHT.structural}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.2}
        />
        <AnimatedPath
          d="M 30 120 L 125 95 L 220 120"
          stroke={s.primary}
          strokeWidth={STROKE_WEIGHT.medium}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.35}
        />
        <AnimatedPath
          d="M 95 220 L 95 145 L 155 145 L 155 220"
          stroke={s.wood}
          strokeWidth={STROKE_WEIGHT.structural}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.5}
        />
        <AnimatedLine
          x1={125}
          y1={145}
          x2={125}
          y2={220}
          stroke={s.light}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.65}
        />
        {[0, 1].map((i) => (
          <AnimatedPath
            key={`shelf-${i}`}
            d={`M ${55 + i * 70} 165 L ${115 + i * 70} 165 L ${115 + i * 70} 175 L ${55 + i * 70} 175 Z`}
            stroke={s.faint}
            strokeWidth={STROKE_WEIGHT.faint}
            drawProgress={drawProgress}
            useMountAnimation={useMountAnimation}
            delay={0.75 + i * 0.08}
            opacity={0.6}
          />
        ))}
        <AnimatedPath
          d="M 50 230 Q 125 225, 200 230"
          stroke={s.faint}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.95}
          opacity={0.45}
        />
      </g>
    </svg>
  );
}
