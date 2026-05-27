'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import type { RefObject } from 'react';
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion';
import { useWeatherMode } from '@/shared/state/weather-mode-context';
import { getShinkaiWeatherTheme } from '@/shared/theme/shinkaiWeather';

type ScrollCordProps = {
  containerRef: RefObject<HTMLElement | null>;
};

/**
 * Akai Ito (赤い糸) — The Red String of Fate
 *
 * "Musubi — the threads twist, tangle, unravel, connect again.
 *  That's time. That's musubi." — Miyamizu Hitoha, Your Name
 *
 * The Move doesn't work for money. The Move works for love, with good
 * intention, kindness, and passion for helping people's daily lives.
 * Like Mitsuha's kumihimo cord binding her to Taki across time, this
 * cord is the red thread connecting The Move with each client's story.
 *
 * Structure:
 *   TopBinding   — 4 mount-animated binding strokes (the knot, always visible)
 *   CordBody     — full-height scroll-draw spine with cylindrical depth
 *   BottomTassel — 7 threads with Bézier morph, revealed at journey's end
 */

/** Deterministic 0–1 seed — no SSR/client hydration mismatch */
function variation(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
}

export function ScrollCord({ containerRef }: ScrollCordProps) {
  const { mode } = useWeatherMode();
  const cord = getShinkaiWeatherTheme(mode).cord;
  const reducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Cord body fades in on first scroll, fades out near section end
  const cordOpacity = useTransform(scrollYProgress, [0, 0.04, 0.96, 1], [0, 0.55, 0.55, 0]);
  // Draw cord from top to bottom as user scrolls
  const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [1, 0]);
  // Tassel blooms as the journey nears completion
  const tasselOpacity = useTransform(scrollYProgress, [0.88, 0.96], [0, 1]);

  if (reducedMotion) return null;

  return (
    <div
      className="pointer-events-none absolute left-3 top-0 z-10 block h-full w-6 md:left-6 lg:left-10"
      aria-hidden
    >
      {/* ── Top binding — always visible, mount-animated ──────────────────
          Represents the knot where the cord is fixed — the origin of
          The Move's intention before the journey begins.                   */}
      <div className="absolute left-0 top-0 w-full" style={{ height: '64px' }}>
        <svg viewBox="0 0 12 16" className="h-full w-full">
          {[
            { y: 2.5, x1: 2.5, x2: 9.5, sw: 1.8, op: 1.00, stroke: cord.primary, delay: 0.4 },
            { y: 4.5, x1: 3.0, x2: 9.0, sw: 1.4, op: 0.80, stroke: cord.primary, delay: 0.5 },
            { y: 6.5, x1: 3.5, x2: 8.5, sw: 1.0, op: 0.60, stroke: cord.midtone, delay: 0.6 },
            { y: 8.5, x1: 4.0, x2: 8.0, sw: 0.7, op: 0.45, stroke: cord.shadow,  delay: 0.7 },
          ].map(({ y, x1, x2, sw, op, stroke, delay }, i) => (
            <motion.line
              key={i}
              x1={x1} y1={y} x2={x2} y2={y}
              stroke={stroke}
              strokeWidth={sw}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              opacity={op}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut', delay }}
            />
          ))}
        </svg>
      </div>

      {/* ── Cord body — full height, scroll-draw ──────────────────────────
          Three overlapping paths create a cylindrical cord:
            left shadow edge + center primary spine + right shadow edge
          with a thin highlight luster suggesting round cross-section.
          All paths share the same strokeDashoffset, unspooling together
          as the user moves through the spaces.                             */}
      <motion.svg
        className="h-full w-full"
        viewBox="0 0 12 100"
        preserveAspectRatio="none"
        style={{ opacity: cordOpacity }}
      >
        <defs>
          {/* Horizontal gradient: darker at edges, vibrant at center (3D depth) */}
          <linearGradient id="scrollCordDepth" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={cord.shadow}  stopOpacity="0.5" />
            <stop offset="40%"  stopColor={cord.primary} stopOpacity="0.85" />
            <stop offset="60%"  stopColor={cord.primary} stopOpacity="0.85" />
            <stop offset="100%" stopColor={cord.shadow}  stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Ambient depth fill — subtle body behind the strokes */}
        <rect x="2" y="0" width="8" height="100" fill="url(#scrollCordDepth)" opacity={0.22} />

        {/* Left shadow edge */}
        <motion.path
          d="M 2.5 0 Q 2.8 25, 2.5 50 T 2.5 100"
          fill="none"
          stroke={cord.shadow}
          strokeWidth={1.4}
          strokeLinecap="round"
          opacity={0.6}
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          style={{ strokeDasharray: 1, strokeDashoffset }}
        />

        {/* Center spine — the primary cord, the akai ito */}
        <motion.path
          d="M 6 0 Q 6.5 25, 6 50 T 6 100"
          fill="none"
          stroke={cord.primary}
          strokeWidth={2.2}
          strokeLinecap="round"
          opacity={1.0}
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          style={{ strokeDasharray: 1, strokeDashoffset }}
        />

        {/* Right shadow edge */}
        <motion.path
          d="M 9.5 0 Q 9.2 25, 9.5 50 T 9.5 100"
          fill="none"
          stroke={cord.shadow}
          strokeWidth={1.4}
          strokeLinecap="round"
          opacity={0.6}
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          style={{ strokeDasharray: 1, strokeDashoffset }}
        />

        {/* Highlight luster — silk sheen on the cylindrical surface */}
        <motion.path
          d="M 5.2 0 Q 5.5 25, 5.2 50 T 5.2 100"
          fill="none"
          stroke={cord.highlight}
          strokeWidth={0.45}
          strokeLinecap="round"
          opacity={0.38}
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          style={{ strokeDasharray: 1, strokeDashoffset }}
        />
      </motion.svg>

      {/* ── Bottom tassel — scroll-triggered, Bézier morph ───────────────
          7 silk threads hanging free — the end of the cord, the
          completion of the story. Each thread sways in its own rhythm,
          like the intertwining fates of The Move and its clients.
          Appears only as the user nears the end of all the spaces.         */}
      <motion.div
        className="absolute bottom-0 left-0 w-full"
        style={{ height: '80px', opacity: tasselOpacity }}
      >
        <svg viewBox="0 0 12 22" className="h-full w-full">
          {/* Binding wrap — the knot at the cord's end */}
          {[1.0, 1.6, 2.2, 2.8].map((y, i) => (
            <motion.line
              key={`tw-${i}`}
              x1={2.5} y1={y} x2={9.5} y2={y}
              stroke={cord.primary}
              strokeWidth={1.2}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              opacity={0.9 - i * 0.12}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.25, ease: 'easeOut', delay: 0.1 + i * 0.05 }}
            />
          ))}

          {/* Tassel threads — 7 threads, deterministic variation, infinite sway */}
          {Array.from({ length: 7 }, (_, i) => {
            const t = i / 6 - 0.5;
            const xOff = t * 7;
            const curve = Math.abs(t) * 4;
            const sx = 6 + xOff * 0.15;
            const sy = 4;
            const mx = 6 + xOff * 0.55 + curve * 0.5;
            const my = 12;
            const ex = 6 + xOff + curve;
            const ey = 19 + variation(i) * 2.5;
            const sw = 0.45 + variation(i + 100) * 0.25;
            const op = 0.55 + variation(i + 200) * 0.35;
            const colorIdx = i % 3;
            const stroke =
              colorIdx === 0 ? cord.primary
              : colorIdx === 1 ? cord.highlight
              : cord.midtone;

            return (
              <motion.path
                key={`tt-${i}`}
                d={`M ${sx} ${sy} Q ${mx} ${my}, ${ex} ${ey}`}
                fill="none"
                stroke={stroke}
                strokeWidth={sw}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                opacity={op}
                initial={{ pathLength: 0 }}
                animate={{
                  pathLength: 1,
                  d: [
                    `M ${sx} ${sy} Q ${mx} ${my}, ${ex} ${ey}`,
                    `M ${sx} ${sy} Q ${mx + 1.2} ${my + 1.5}, ${ex + 0.4} ${ey + 0.8}`,
                    `M ${sx} ${sy} Q ${mx - 0.4} ${my + 0.4}, ${ex - 0.3} ${ey + 0.4}`,
                    `M ${sx} ${sy} Q ${mx} ${my}, ${ex} ${ey}`,
                  ],
                }}
                transition={{
                  pathLength: { duration: 0.5, delay: 0.2 + i * 0.04, ease: 'easeOut' },
                  d: {
                    duration: 4.5 + i * 0.25,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1 + i * 0.1,
                  },
                }}
              />
            );
          })}
        </svg>
      </motion.div>
    </div>
  );
}
