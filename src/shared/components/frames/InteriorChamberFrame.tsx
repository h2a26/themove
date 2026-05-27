'use client';

import { AnimatedLine, AnimatedPath } from '@/shared/components/line-art/AnimatedPath';
import { getFrameStrokes, STROKE_WEIGHT } from '@/shared/components/line-art/tokens';
import type { FrameComponentProps } from './frame-props';

/** Warm interior — one-point perspective room, tall window, low sofa, pendant */
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

        {/* === Room shell — one-point perspective === */}

        {/* Back wall */}
        <AnimatedPath
          d="M 60 78 L 190 78 L 190 235 L 60 235 Z"
          stroke={s.primary}
          strokeWidth={STROKE_WEIGHT.structural}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.1}
        />

        {/* Left wall */}
        <AnimatedPath
          d="M 14 292 L 60 235 L 60 78 L 14 20"
          stroke={s.primary}
          strokeWidth={STROKE_WEIGHT.structural}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.14}
        />

        {/* Right wall */}
        <AnimatedPath
          d="M 236 292 L 190 235 L 190 78 L 236 20"
          stroke={s.primary}
          strokeWidth={STROKE_WEIGHT.structural}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.18}
        />

        {/* Ceiling plane */}
        <AnimatedPath
          d="M 14 20 L 236 20 L 190 78 L 60 78"
          stroke={s.faint}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.22}
          opacity={0.45}
        />

        {/* Floor plane */}
        <AnimatedPath
          d="M 14 292 L 236 292 L 190 235 L 60 235"
          stroke={s.faint}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.26}
          opacity={0.45}
        />

        {/* === Tall casement window — primary light source === */}

        <AnimatedPath
          d="M 90 88 L 160 88 L 160 180 L 90 180 Z"
          stroke={s.light}
          strokeWidth={STROKE_WEIGHT.medium}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.38}
        />

        {/* Window centre vertical muntin */}
        <AnimatedLine
          x1={125} y1={88} x2={125} y2={180}
          stroke={s.light}
          strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.42}
          opacity={0.5}
        />

        {/* Window horizontal rail — upper third */}
        <AnimatedLine
          x1={90} y1={122} x2={160} y2={122}
          stroke={s.light}
          strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.44}
          opacity={0.45}
        />

        {/* Window inner reveal — subtle depth */}
        <AnimatedPath
          d="M 93 91 L 157 91 L 157 177 L 93 177 Z"
          stroke={s.light}
          strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.46}
          opacity={0.18}
        />

        {/* Window sill */}
        <AnimatedLine
          x1={87} y1={180} x2={163} y2={180}
          stroke={s.light}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.48}
          opacity={0.6}
        />

        {/* === Pendant light === */}

        {/* Wire drop from ceiling */}
        <AnimatedLine
          x1={125} y1={20} x2={125} y2={60}
          stroke={s.faint}
          strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.52}
          opacity={0.55}
        />

        {/* Shade dome */}
        <AnimatedPath
          d="M 110 60 Q 125 73 140 60"
          stroke={s.light}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.54}
          opacity={0.75}
        />

        {/* Shade top rim */}
        <AnimatedLine
          x1={110} y1={60} x2={140} y2={60}
          stroke={s.light}
          strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.56}
          opacity={0.45}
        />

        {/* === Low sofa against back wall === */}

        {/* Seat */}
        <AnimatedPath
          d="M 70 235 L 170 235 L 170 213 L 70 213 Z"
          stroke={s.wood}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.62}
          opacity={0.82}
        />

        {/* Backrest */}
        <AnimatedPath
          d="M 70 213 L 70 192 L 170 192 L 170 213"
          stroke={s.wood}
          strokeWidth={STROKE_WEIGHT.light}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.66}
          opacity={0.82}
        />

        {/* Left arm */}
        <AnimatedPath
          d="M 70 192 L 70 213 L 76 213 L 76 192"
          stroke={s.wood}
          strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.69}
          opacity={0.55}
        />

        {/* Right arm */}
        <AnimatedPath
          d="M 170 192 L 170 213 L 164 213 L 164 192"
          stroke={s.wood}
          strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.71}
          opacity={0.55}
        />

        {/* Cushion seam */}
        <AnimatedLine
          x1={120} y1={192} x2={120} y2={213}
          stroke={s.wood}
          strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.73}
          opacity={0.35}
        />

        {/* Sofa legs — tiny hints */}
        <AnimatedLine x1={78} y1={235} x2={78} y2={240}
          stroke={s.wood} strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress} useMountAnimation={useMountAnimation}
          delay={0.75} opacity={0.45}
        />
        <AnimatedLine x1={162} y1={235} x2={162} y2={240}
          stroke={s.wood} strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress} useMountAnimation={useMountAnimation}
          delay={0.76} opacity={0.45}
        />

        {/* === Small side table — right of sofa === */}
        <AnimatedPath
          d="M 172 235 L 188 235 L 188 220 L 172 220"
          stroke={s.wood}
          strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.78}
          opacity={0.55}
        />

        {/* === Wainscoting rail on back wall === */}
        <AnimatedLine
          x1={60} y1={188} x2={190} y2={188}
          stroke={s.faint}
          strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.82}
          opacity={0.28}
        />

        {/* Cornice shadow under ceiling */}
        <AnimatedLine
          x1={60} y1={86} x2={190} y2={86}
          stroke={s.faint}
          strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress}
          useMountAnimation={useMountAnimation}
          delay={0.32}
          opacity={0.3}
        />

        {/* === Floor board lines — perspective trapezoid === */}
        {/* t=0.20 */}
        <AnimatedLine
          x1={26} y1={278} x2={224} y2={278}
          stroke={s.faint} strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress} useMountAnimation={useMountAnimation}
          delay={0.86} opacity={0.35}
        />
        {/* t=0.45 */}
        <AnimatedLine
          x1={40} y1={262} x2={210} y2={262}
          stroke={s.faint} strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress} useMountAnimation={useMountAnimation}
          delay={0.88} opacity={0.28}
        />
        {/* t=0.70 */}
        <AnimatedLine
          x1={51} y1={248} x2={199} y2={248}
          stroke={s.faint} strokeWidth={STROKE_WEIGHT.faint}
          drawProgress={drawProgress} useMountAnimation={useMountAnimation}
          delay={0.90} opacity={0.22}
        />

      </g>
    </svg>
  );
}
