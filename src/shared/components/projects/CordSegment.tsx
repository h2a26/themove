'use client';

import { useId, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion';
import { useWeatherMode } from '@/shared/state/weather-mode-context';
import { getShinkaiWeatherTheme } from '@/shared/theme/shinkaiWeather';

/** Deterministic 0–1 seed — no SSR/client hydration mismatch */
function variation(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
}

/**
 * CordSegment — Akai Ito (赤い糸)
 *
 * "Musubi — the threads twist, tangle, unravel, connect again.
 *  That's time. That's musubi." — Miyamizu Hitoha, Your Name
 *
 * A short piece of Mitsuha's kumihimo cord rendered between adjacent
 * project cards. Like the red string of fate it flows naturally —
 * curving, hanging free — connecting each client's story to the next.
 *
 * Structure:
 *   TopBinding    — 2 subtle wraps where the cord is tied above
 *   CordBody      — 4 overlapping S-curved paths giving cylindrical depth
 *                   (left shadow + highlight + center spine + right shadow)
 *   BraidHints    — 4 crossing diagonals suggesting herringbone weave
 *   Tassel        — 5 threads hanging free, gentle infinite Bézier sway
 *
 * Visual technique: same 3-path depth method as the Shinkai hero cord.
 * The S-curve (Q control points offset ±1.5 units) gives natural hang.
 * No rigid horizontal caps → no spool. Tassel makes it read as cord.
 */
export function CordSegment() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reducedMotion = usePrefersReducedMotion();
  const { mode } = useWeatherMode();
  const cord = getShinkaiWeatherTheme(mode).cord;
  // Each of the ~30 instances needs its own gradient id — no duplicate IDs
  const gradId = useId();

  const shouldDraw = inView || reducedMotion;

  // Tassel: 5 threads fanning from the cord's free end
  const tassels = Array.from({ length: 5 }, (_, i) => {
    const t   = i / 4 - 0.5;           // −0.5 … +0.5
    const xOff = t * 9;
    const bow  = Math.abs(t) * 3.5;
    const sx   = 12 + xOff * 0.18;     // start near centre (tassel knot)
    const sy   = 78;
    const mx   = 12 + xOff * 0.65 + bow;
    const my   = 86;
    const ex   = 12 + xOff + bow;
    const ey   = 93 + variation(i) * 3;
    const sw   = 0.48 + variation(i + 100) * 0.22;
    const op   = 0.55 + variation(i + 200) * 0.35;
    const stroke =
      i % 3 === 0 ? cord.primary
      : i % 3 === 1 ? cord.highlight
      : cord.midtone;
    return { sx, sy, mx, my, ex, ey, sw, op, stroke };
  });

  return (
    <div
      ref={ref}
      className="flex justify-center py-1"
      aria-hidden
    >
      {!shouldDraw ? (
        // Reserve identical height while off-screen — no layout shift
        <div className="h-24 w-8" />
      ) : (
        <svg
          viewBox="0 0 24 96"
          className="h-24 w-8"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            {/* Horizontal gradient: shadow at edges → vibrant at centre (3D depth) */}
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor={cord.shadow}  stopOpacity="0.50" />
              <stop offset="40%"  stopColor={cord.primary} stopOpacity="0.85" />
              <stop offset="60%"  stopColor={cord.primary} stopOpacity="0.85" />
              <stop offset="100%" stopColor={cord.shadow}  stopOpacity="0.50" />
            </linearGradient>
          </defs>

          {/* Ambient depth fill — subtle warm body behind the strokes */}
          <rect x="6" y="6" width="12" height="72" fill={`url(#${gradId})`} opacity={0.20} />

          {/* ── Top binding — 2 wraps, where the cord is tied ─────────────
              Minimal — just enough to show the knot at the attachment
              point. Kept subtle so the eye reads "cord" not "spool".    */}
          {[
            { y: 2,   x1: 5.5, x2: 18.5, sw: 1.0, op: 0.80, stroke: cord.primary, d: 0.00 },
            { y: 3.8, x1: 6.2, x2: 17.8, sw: 0.7, op: 0.55, stroke: cord.shadow,  d: 0.06 },
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
              transition={{ duration: 0.25, ease: 'easeOut', delay: reducedMotion ? 0 : d }}
            />
          ))}

          {/* ── Cord body — S-curved paths, 3D depth technique ────────────
              Four overlapping paths share the same gentle S-curve.
              Upper half bows ≈1.5 units right, lower half ≈1.5 left —
              the natural catenary hang of a cord tied at its top end.
              vectorEffect="non-scaling-stroke" keeps stroke widths in px
              regardless of the preserveAspectRatio="none" stretch.       */}

          {/* Left shadow edge */}
          <motion.path
            d="M 6 6 Q 7.5 28 6 52 Q 4.5 68 6 78"
            fill="none"
            stroke={cord.shadow}
            strokeWidth={1.2}
            strokeLinecap="round"
            opacity={0.55}
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: reducedMotion ? 1 : 0 }}
            animate={reducedMotion ? { pathLength: 1 } : {
              pathLength: 1,
              d: [
                'M 6 6 Q 7.5 28 6 52 Q 4.5 68 6 78',
                'M 6 6 Q 8.0 28 6 52 Q 4.0 68 6 78',
                'M 6 6 Q 7.0 28 6 52 Q 5.0 68 6 78',
                'M 6 6 Q 7.5 28 6 52 Q 4.5 68 6 78',
              ],
            }}
            transition={{
              pathLength: { duration: 0.65, ease: 'easeOut', delay: 0.08 },
              ...(reducedMotion ? {} : {
                d: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2.0 },
              }),
            }}
          />

          {/* Highlight luster — silk sheen, slightly left of centre */}
          <motion.path
            d="M 9.5 6 Q 11 28 9.5 52 Q 8 68 9.5 78"
            fill="none"
            stroke={cord.highlight}
            strokeWidth={0.4}
            strokeLinecap="round"
            opacity={0.32}
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: reducedMotion ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: reducedMotion ? 0 : 0.05 }}
          />

          {/* Centre spine — the akai ito, the primary cord */}
          <motion.path
            d="M 12 6 Q 13.5 28 12 52 Q 10.5 68 12 78"
            fill="none"
            stroke={cord.primary}
            strokeWidth={2.2}
            strokeLinecap="round"
            opacity={1.0}
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: reducedMotion ? 1 : 0 }}
            animate={reducedMotion ? { pathLength: 1 } : {
              pathLength: 1,
              d: [
                'M 12 6 Q 13.5 28 12 52 Q 10.5 68 12 78',
                'M 12 6 Q 14.0 28 12 52 Q 10.0 68 12 78',
                'M 12 6 Q 13.0 28 12 52 Q 11.0 68 12 78',
                'M 12 6 Q 13.5 28 12 52 Q 10.5 68 12 78',
              ],
            }}
            transition={{
              pathLength: { duration: 0.65, ease: 'easeOut', delay: reducedMotion ? 0 : 0.03 },
              ...(reducedMotion ? {} : {
                d: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2.0 },
              }),
            }}
          />

          {/* Right shadow edge */}
          <motion.path
            d="M 18 6 Q 19.5 28 18 52 Q 16.5 68 18 78"
            fill="none"
            stroke={cord.shadow}
            strokeWidth={1.2}
            strokeLinecap="round"
            opacity={0.55}
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: reducedMotion ? 1 : 0 }}
            animate={reducedMotion ? { pathLength: 1 } : {
              pathLength: 1,
              d: [
                'M 18 6 Q 19.5 28 18 52 Q 16.5 68 18 78',
                'M 18 6 Q 20.0 28 18 52 Q 16.0 68 18 78',
                'M 18 6 Q 19.0 28 18 52 Q 17.0 68 18 78',
                'M 18 6 Q 19.5 28 18 52 Q 16.5 68 18 78',
              ],
            }}
            transition={{
              pathLength: { duration: 0.65, ease: 'easeOut', delay: reducedMotion ? 0 : 0.10 },
              ...(reducedMotion ? {} : {
                d: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2.0 },
              }),
            }}
          />

          {/* ── Braid texture hints — 4 crossing diagonals ────────────────
              Four alternating diagonals (left→right, right→left …) span
              the full cord width at even intervals. Subtle enough to read
              as weave texture without dominating the cord silhouette.
              Opacity 0.28 — the eye fills in the pattern.               */}
          {[
            { x1: 6, y1: 18, x2: 18, y2: 25, d: 0.20 },
            { x1: 18, y1: 35, x2: 6, y2: 42, d: 0.26 },
            { x1: 6, y1: 50, x2: 18, y2: 57, d: 0.32 },
            { x1: 18, y1: 63, x2: 6, y2: 70, d: 0.38 },
          ].map(({ x1, y1, x2, y2, d }, i) => (
            <motion.line
              key={`bh-${i}`}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={cord.midtone}
              strokeWidth={0.4}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              opacity={0.28}
              initial={{ pathLength: reducedMotion ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.22, ease: 'easeOut', delay: reducedMotion ? 0 : d }}
            />
          ))}

          {/* ── Tassel — 5 threads, free end, gentle infinite sway ────────
              Threads fan from the cord's lower knot (y=78) and curve down
              to staggered endpoints. Infinite Bézier morphing simulates
              the gentle movement of real silk threads in still air.      */}
          {tassels.map(({ sx, sy, mx, my, ex, ey, sw, op, stroke }, i) => (
            <motion.path
              key={`tt-${i}`}
              d={`M ${sx} ${sy} Q ${mx} ${my}, ${ex} ${ey}`}
              fill="none"
              stroke={stroke}
              strokeWidth={sw}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              opacity={op}
              initial={{ pathLength: reducedMotion ? 1 : 0 }}
              animate={{
                pathLength: 1,
                ...(reducedMotion ? {} : {
                  d: [
                    `M ${sx} ${sy} Q ${mx} ${my}, ${ex} ${ey}`,
                    `M ${sx} ${sy} Q ${mx + 1.0} ${my + 1.2}, ${ex + 0.3} ${ey + 0.6}`,
                    `M ${sx} ${sy} Q ${mx - 0.4} ${my + 0.5}, ${ex - 0.3} ${ey + 0.3}`,
                    `M ${sx} ${sy} Q ${mx} ${my}, ${ex} ${ey}`,
                  ],
                }),
              }}
              transition={{
                pathLength: { duration: 0.4, ease: 'easeOut', delay: reducedMotion ? 0 : 0.50 + i * 0.05 },
                ...(reducedMotion ? {} : {
                  d: {
                    duration: 4.2 + i * 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.8 + i * 0.15,
                  },
                }),
              }}
            />
          ))}
        </svg>
      )}
    </div>
  );
}
