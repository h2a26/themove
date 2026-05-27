'use client';

import { AnimatedLine, AnimatedPath } from '@/shared/components/line-art/AnimatedPath';
import { getFrameStrokes, STROKE_WEIGHT } from '@/shared/components/line-art/tokens';
import type { FrameMood } from './types';

type HeritageFrameProps = {
  mood: FrameMood;
  drawProgress: number;
  useMountAnimation?: boolean;
};

/** Itomori-inspired templated frame for Scroll of Spaces / detail opening */
export function HeritageFrame({
  mood,
  drawProgress,
  useMountAnimation = false,
}: HeritageFrameProps) {
  const s = getFrameStrokes(mood);

  return (
    <svg
      viewBox="0 0 250 300"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <g fill="none" strokeLinecap="round">
        {/* Mountains */}
        <AnimatedPath
          d="M -20 200 L 50 140 L 100 170 L 150 120 L 220 180 L 270 160 L 270 200 Z"
          stroke={s.faint}
          strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.1}
          duration={2}
          opacity={0.35}
        />

        {/* Torii */}
        <AnimatedLine
          x1={45}
          y1={220}
          x2={45}
          y2={155}
          stroke={s.primary}
          strokeWidth={STROKE_WEIGHT.structural}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.4}
        />
        <AnimatedLine
          x1={85}
          y1={220}
          x2={85}
          y2={155}
          stroke={s.primary}
          strokeWidth={STROKE_WEIGHT.structural}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.45}
        />
        <AnimatedPath
          d="M 35 158 Q 65 148, 95 158"
          stroke={s.primary}
          strokeWidth={STROKE_WEIGHT.medium}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.55}
        />

        {/* House body */}
        <AnimatedPath
          d="M 110 220 L 110 155 L 200 155 L 200 220 Z"
          stroke={s.wood}
          strokeWidth={STROKE_WEIGHT.structural}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.65}
          duration={1.4}
        />
        <AnimatedPath
          d="M 95 155 L 155 115 L 215 155"
          stroke={s.wood}
          strokeWidth={STROKE_WEIGHT.bold}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.75}
        />

        {/* Engawa */}
        <AnimatedLine
          x1={105}
          y1={205}
          x2={205}
          y2={205}
          stroke={s.wood}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.9}
        />

        {/* Shoji */}
        {[0, 1, 2].map((i) => (
          <AnimatedPath
            key={`shoji-${i}`}
            d={`M ${118 + i * 28} 165 L ${118 + i * 28} 198 L ${142 + i * 28} 198 L ${142 + i * 28} 165 Z`}
            stroke={s.light}
            strokeWidth={STROKE_WEIGHT.faint}
            drawProgress={drawProgress}
            useMountAnimation={useMountAnimation}
            delay={0.95 + i * 0.08}
            opacity={0.65}
          />
        ))}

        {/* Stone path */}
        <AnimatedPath
          d="M 60 230 Q 125 225, 190 235"
          stroke={s.faint}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={1.1}
          opacity={0.5}
        />

        {/* Second mountain layer — deeper atmosphere */}
        <AnimatedPath
          d="M -20 210 Q 80 160, 150 180 Q 200 165, 270 190"
          stroke={s.faint}
          strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.05}
          opacity={0.20}
        />

        {/* Pine trunk — left foreground */}
        <AnimatedPath
          d="M 20 220 L 20 175"
          stroke={s.wood}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.85}
          opacity={0.55}
        />
        {/* Pine foliage — upper triangle */}
        <AnimatedPath
          d="M 10 185 L 20 170 L 30 185"
          stroke={s.wood}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.95}
          opacity={0.50}
        />
        {/* Pine branch overhang — sweeps into composition */}
        <AnimatedPath
          d="M 10 180 Q 45 175, 80 185"
          stroke={s.wood}
          strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={1.0}
          opacity={0.45}
        />
        {/* Ground shadow — organic foreground texture */}
        <AnimatedPath
          d="M 30 225 Q 80 220, 100 222"
          stroke={s.faint}
          strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={1.15}
          opacity={0.25}
        />
      </g>
    </svg>
  );
}
