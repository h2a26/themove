'use client';

import { AnimatedLine, AnimatedPath } from '@/shared/components/line-art/AnimatedPath';
import { STROKE_WEIGHT } from '@/shared/components/line-art/tokens';
import type { FrameComponentProps } from './frame-props';

/** Cafes, hotels — pendant curves, steam, warm threshold */
export function HospitalityGlowFrame({
  drawProgress,
  useMountAnimation = false,
}: FrameComponentProps) {
  const s = { primary: '#475569', light: '#94a3b8', faint: '#cbd5e1', wood: '#64748b' } as const;

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

        {/* Ceiling reflections — warm glow arcs */}
        <AnimatedPath
          d="M 55 132 Q 125 120, 195 132"
          stroke={s.faint}
          strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.40}
          opacity={0.20}
        />
        <AnimatedPath
          d="M 60 138 Q 125 128, 190 138"
          stroke={s.faint}
          strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.44}
          opacity={0.15}
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

        {/* Pendant lamp globes — teardrop at cord end */}
        <AnimatedPath
          d="M 61 85 Q 68 78, 75 85 Q 68 92, 61 85"
          stroke={s.wood}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.55}
          opacity={0.85}
        />
        <AnimatedPath
          d="M 111 85 Q 118 78, 125 85 Q 118 92, 111 85"
          stroke={s.wood}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.65}
          opacity={0.85}
        />
        <AnimatedPath
          d="M 161 85 Q 168 78, 175 85 Q 168 92, 161 85"
          stroke={s.wood}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.75}
          opacity={0.85}
        />
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
