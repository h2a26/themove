'use client';

import { AnimatedLine, AnimatedPath } from '@/shared/components/line-art/AnimatedPath';
import { getFrameStrokes, STROKE_WEIGHT } from '@/shared/components/line-art/tokens';
import type { FrameMood } from './types';

type UrbanFrameProps = {
  mood: FrameMood;
  drawProgress: number;
  useMountAnimation?: boolean;
};

/** Tokyo-inspired templated frame for Scroll of Spaces / detail opening */
export function UrbanFrame({
  mood,
  drawProgress,
  useMountAnimation = false,
}: UrbanFrameProps) {
  const s = getFrameStrokes(mood);

  return (
    <svg
      viewBox="0 0 250 300"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <g fill="none" strokeLinecap="round">
        {/* Distant tower */}
        <AnimatedPath
          d="M 175 220 L 175 100 L 188 88 L 201 100 L 201 220"
          stroke={s.faint}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.15}
          duration={1.8}
          opacity={0.45}
        />

        {/* Mid building + windows */}
        <AnimatedPath
          d="M 95 220 L 95 130 L 145 130 L 145 220"
          stroke={s.light}
          strokeWidth={STROKE_WEIGHT.medium}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.35}
        />
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <AnimatedPath
              key={`win-${row}-${col}`}
              d={`M ${102 + col * 14} ${140 + row * 22} L ${102 + col * 14} ${155 + row * 22} L ${112 + col * 14} ${155 + row * 22} L ${112 + col * 14} ${140 + row * 22} Z`}
              stroke={s.light}
              strokeWidth={STROKE_WEIGHT.faint}
              drawProgress={drawProgress}
              useMountAnimation={useMountAnimation}
              delay={0.5 + row * 0.06 + col * 0.03}
              opacity={0.55}
            />
          )),
        )}

        {/* Foreground tower */}
        <AnimatedPath
          d="M 155 220 L 155 75 L 175 58 L 195 75 L 195 220"
          stroke={s.primary}
          strokeWidth={STROKE_WEIGHT.structural}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.55}
          duration={1.6}
        />
        <AnimatedLine
          x1={175}
          y1={58}
          x2={175}
          y2={38}
          stroke={s.primary}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.75}
        />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <AnimatedLine
            key={`floor-${i}`}
            x1={155}
            y1={95 + i * 20}
            x2={195}
            y2={95 + i * 20}
            stroke={s.primary}
            strokeWidth={STROKE_WEIGHT.faint}
            drawProgress={drawProgress}
            useMountAnimation={useMountAnimation}
            delay={0.85 + i * 0.04}
            opacity={0.6}
          />
        ))}

        {/* Elevated tracks */}
        <AnimatedPath
          d="M 20 195 L 230 175"
          stroke={s.primary}
          strokeWidth={STROKE_WEIGHT.medium}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.95}
        />
        <AnimatedPath
          d="M 20 200 L 230 180"
          stroke={s.faint}
          strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={1}
        />

        {/* Shrine stairs hint */}
        <AnimatedPath
          d="M 35 220 L 55 200 L 55 185 L 75 165 L 75 220"
          stroke={s.light}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={1.05}
          opacity={0.7}
        />

        {/* Balcony apartment */}
        <AnimatedPath
          d="M 15 220 L 15 160 L 55 160 L 55 220"
          stroke={s.light}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.7}
        />
        {[0, 1, 2].map((i) => (
          <AnimatedLine
            key={`balcony-${i}`}
            x1={15}
            y1={175 + i * 14}
            x2={55}
            y2={175 + i * 14}
            stroke={s.faint}
            strokeWidth={STROKE_WEIGHT.faint}
            drawProgress={drawProgress}
            useMountAnimation={useMountAnimation}
            delay={0.8 + i * 0.05}
            opacity={0.55}
          />
        ))}
      </g>
    </svg>
  );
}
