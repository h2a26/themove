'use client';

import { useId, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion';
import { useWeatherMode } from '@/shared/state/weather-mode-context';
import { getShinkaiWeatherTheme } from '@/shared/theme/shinkaiWeather';

/**
 * CordSegment — Akai Ito (赤い糸)
 *
 * "Musubi — the threads twist, tangle, unravel, connect again.
 *  That's time. That's musubi." — Miyamizu Hitoha, Your Name
 *
 * A short piece of authentic 8-bobbin kumihimo cord rendered between
 * adjacent project cards. As each gap enters the viewport the cord
 * draws in — the red string of fate connecting each client's story
 * to the next. Musubi. The binding of fates across The Move's work.
 *
 * Structure (viewBox 0 0 24 70, cord body x=6–18):
 *   TopBinding    — 3 mount-animated binding wraps (the knot at the top)
 *   EdgeLines     — left + right shadow edges giving cylindrical form
 *   BraidStitches — 10 rows × 4 lines = 40 chevron stitches (8-bobbin)
 *   BottomBinding — 3 wraps mirroring the top
 */
export function CordSegment() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reducedMotion = usePrefersReducedMotion();
  const { mode } = useWeatherMode();
  const cord = getShinkaiWeatherTheme(mode).cord;
  // Each instance needs a unique gradient ID — there are ~30 CordSegments per page
  const gradId = useId();

  const shouldDraw = inView || reducedMotion;

  // Convenience: skip pathLength animation in reduced-motion
  const pl = (delay: number) =>
    reducedMotion
      ? { initial: { pathLength: 1 }, animate: { pathLength: 1 }, transition: {} }
      : {
          initial: { pathLength: 0 },
          animate: { pathLength: 1 },
          transition: { duration: 0.18, ease: 'easeOut' as const, delay },
        };

  return (
    <div
      ref={ref}
      className="flex justify-center py-2"
      aria-hidden
    >
      {!shouldDraw ? (
        // Reserve layout space while the segment is off-screen — prevents shift
        <div className="h-[56px] w-8" />
      ) : (
        <svg
          viewBox="0 0 24 70"
          className="h-[56px] w-8"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            {/* Horizontal gradient: darker at edges, vibrant at center (3D depth) */}
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor={cord.shadow}  stopOpacity="0.5" />
              <stop offset="50%"  stopColor={cord.primary} stopOpacity="0.85" />
              <stop offset="100%" stopColor={cord.shadow}  stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Ambient depth fill — subtle cord body behind the stitches */}
          <rect x="6" y="10" width="12" height="50" fill={`url(#${gradId})`} opacity={0.28} />

          {/* ── Top binding — 3 wraps, where the cord is knotted ──────────── */}
          {[
            { y: 4,  x1: 6.5, x2: 17.5, sw: 1.2, op: 0.90, stroke: cord.primary, d: 0.00 },
            { y: 6,  x1: 7.0, x2: 17.0, sw: 0.9, op: 0.75, stroke: cord.primary, d: 0.06 },
            { y: 8,  x1: 7.5, x2: 16.5, sw: 0.6, op: 0.55, stroke: cord.shadow,  d: 0.10 },
          ].map(({ y, x1, x2, sw, op, stroke, d }, i) => (
            <motion.line
              key={`tb-${i}`}
              x1={x1} y1={y} x2={x2} y2={y}
              stroke={stroke}
              strokeWidth={sw}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              opacity={op}
              initial={{ pathLength: reducedMotion ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut', delay: reducedMotion ? 0 : d }}
            />
          ))}

          {/* ── Left edge line ─────────────────────────────────────────────── */}
          <motion.line
            x1={6} y1={10} x2={6} y2={60}
            stroke={cord.shadow}
            strokeWidth={0.8}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity={0.70}
            initial={{ pathLength: reducedMotion ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0 }}
          />

          {/* ── Right edge line ────────────────────────────────────────────── */}
          <motion.line
            x1={18} y1={10} x2={18} y2={60}
            stroke={cord.shadow}
            strokeWidth={0.8}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity={0.70}
            initial={{ pathLength: reducedMotion ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: reducedMotion ? 0 : 0.05 }}
          />

          {/* ── Chevron braid stitches — 10 rows, 8-bobbin pattern ─────────
              Each row: left arm + right arm converge at center midpoint,
              then left return + right return diverge to the next row.
              Even rows use primary→midtone, odd rows use midtone→primary,
              creating the alternating weave colour of real kumihimo.         */}
          {Array.from({ length: 10 }, (_, i) => {
            const y     = 10 + i * 5;
            const midY  = y + 2.5;
            const nextY = y + 5;
            const even  = i % 2 === 0;
            const delay = 0.12 + i * 0.04;
            return (
              <g key={`cs-${i}`}>
                {/* Left arm: outer-left → centre-mid */}
                <motion.line
                  x1={6}  y1={y}    x2={12} y2={midY}
                  stroke={even ? cord.primary : cord.midtone}
                  strokeWidth={0.5}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  opacity={even ? 0.75 : 0.65}
                  {...pl(delay)}
                />
                {/* Right arm: outer-right → centre-mid */}
                <motion.line
                  x1={18} y1={y}    x2={12} y2={midY}
                  stroke={even ? cord.midtone : cord.primary}
                  strokeWidth={0.5}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  opacity={even ? 0.75 : 0.65}
                  {...pl(delay)}
                />
                {/* Left return: centre-mid → outer-left-next */}
                <motion.line
                  x1={12} y1={midY} x2={6}  y2={nextY}
                  stroke={even ? cord.shadow : cord.primary}
                  strokeWidth={0.4}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  opacity={even ? 0.65 : 0.55}
                  {...pl(delay + 0.02)}
                />
                {/* Right return: centre-mid → outer-right-next */}
                <motion.line
                  x1={12} y1={midY} x2={18} y2={nextY}
                  stroke={even ? cord.primary : cord.shadow}
                  strokeWidth={0.4}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  opacity={even ? 0.65 : 0.55}
                  {...pl(delay + 0.02)}
                />
              </g>
            );
          })}

          {/* ── Bottom binding — 3 wraps, the knot at the cord's free end ── */}
          {[
            { y: 62, x1: 6.5, x2: 17.5, sw: 1.2, op: 0.90, stroke: cord.primary, d: 0.60 },
            { y: 64, x1: 7.0, x2: 17.0, sw: 0.9, op: 0.75, stroke: cord.primary, d: 0.64 },
            { y: 66, x1: 7.5, x2: 16.5, sw: 0.6, op: 0.55, stroke: cord.shadow,  d: 0.68 },
          ].map(({ y, x1, x2, sw, op, stroke, d }, i) => (
            <motion.line
              key={`bb-${i}`}
              x1={x1} y1={y} x2={x2} y2={y}
              stroke={stroke}
              strokeWidth={sw}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              opacity={op}
              initial={{ pathLength: reducedMotion ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut', delay: reducedMotion ? 0 : d }}
            />
          ))}
        </svg>
      )}
    </div>
  );
}
