"use client"

import { useCallback, useRef } from "react"
import { motion, useAnimationFrame, useMotionValue, useSpring } from "framer-motion"
import { getShinkaiWeatherTheme } from '@/shared/theme/shinkaiWeather'

interface KumihimoCordProps {
  weatherMode: "sunlit" | "rain"
}

/** Deterministic 0–1 value — avoids SSR/client hydration mismatch from Math.random() */
function variation(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453123
  return x - Math.floor(x)
}

/**
 * Kumihimo - 組紐 (braided cord)
 *
 * "Musubi - the threads twist, tangle, unravel, connect again.
 *  That's time. That's musubi." — Miyamizu Hitoha, Your Name
 *
 * The cord hangs from its top knot and sways in a gentle breeze.
 * On pointer contact it leans toward the touch and springs back —
 * the physical memory of silk.
 *
 * Sway mechanics:
 *   Auto-wave  — ±2° sine, period ≈12s (imperceptible breeze)
 *   Pointer    — ±3° lean driven by vertical pointer position
 *   Spring     — stiffness 18 / damping 7 / mass 1.2 — loose, pendulum-like
 *   Pivot      — top of the cord (transformOrigin top-center of the braid group)
 */
export function KumihimoCord({ weatherMode }: KumihimoCordProps) {
  const colors = getShinkaiWeatherTheme(weatherMode).cord
  const opacity = weatherMode === "sunlit" ? 0.9 : 0.75

  // ── Sway state ──────────────────────────────────────────────────
  const elapsed      = useRef(0)
  const isPointing   = useRef(false)
  const returnTimer  = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // Spring-damped angle — feels like a real hanging cord
  const rawAngle  = useMotionValue(0)
  const cordAngle = useSpring(rawAngle, { stiffness: 18, damping: 7, mass: 1.2 })

  // Automatic gentle breeze when the pointer is away
  useAnimationFrame((_, delta) => {
    if (!isPointing.current) {
      elapsed.current += delta
      rawAngle.set(Math.sin(elapsed.current / 6000) * 2)
    }
  })

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isPointing.current = true
    clearTimeout(returnTimer.current)
    const rect = e.currentTarget.getBoundingClientRect()
    // Upper pointer → lean right; lower pointer → lean left (natural touch feel)
    const relY = (e.clientY - rect.top) / rect.height
    rawAngle.set((0.5 - relY) * 6)
    // Return to breeze after 1.2s of no movement
    returnTimer.current = setTimeout(() => { isPointing.current = false }, 1200)
  }, [rawAngle])

  const handlePointerLeave = useCallback(() => {
    clearTimeout(returnTimer.current)
    returnTimer.current = setTimeout(() => { isPointing.current = false }, 800)
  }, [])

  // ── Braid generation ─────────────────────────────────────────────
  const generateBraidPattern = (
    centerX: number,
    startY: number,
    width: number,
    stitchCount: number,
    stitchHeight: number
  ) => {
    const stitches = []
    const hw = width / 2
    for (let i = 0; i < stitchCount; i++) {
      const y = startY + i * stitchHeight
      stitches.push({
        y,
        left:        { x1: centerX - hw, y1: y,                       x2: centerX,      y2: y + stitchHeight * 0.5 },
        right:       { x1: centerX + hw, y1: y,                       x2: centerX,      y2: y + stitchHeight * 0.5 },
        leftReturn:  { x1: centerX,      y1: y + stitchHeight * 0.5,  x2: centerX - hw, y2: y + stitchHeight },
        rightReturn: { x1: centerX,      y1: y + stitchHeight * 0.5,  x2: centerX + hw, y2: y + stitchHeight },
        delay: i * 0.006,
        even: i % 2 === 0,
      })
    }
    return stitches
  }

  const generateTassel = (
    centerX: number,
    startY: number,
    count: number,
    spread: number,
    length: number
  ) => {
    const threads = []
    for (let i = 0; i < count; i++) {
      const t     = (i / (count - 1)) - 0.5
      const xOff  = t * spread
      const curve = Math.abs(t) * 6
      threads.push({
        sx: centerX + xOff * 0.2,
        sy: startY,
        mx: centerX + xOff * 0.6 + curve,
        my: startY + length * 0.5,
        ex: centerX + xOff + curve,
        ey: startY + length + variation(i) * 4,
        delay:       i * 0.025,
        color:       i % 3,
        strokeWidth: 0.4 + variation(i + 100) * 0.2,
        opacity:     0.6 + variation(i + 200) * 0.3,
      })
    }
    return threads
  }

  const cx         = 38
  const bw         = 12
  const startY     = -5
  const stitchH    = 2.5
  const stitchCount = 140
  const endY       = startY + stitchCount * stitchH

  const braidPattern = generateBraidPattern(cx, startY, bw, stitchCount, stitchH)
  // endY + 5 closes the gap — tassel begins right after the last binding wrap
  const tassel = generateTassel(cx, endY + 5, 11, 16, 28)

  return (
    <>
      {/* ── Pointer-capture strip ─────────────────────────────────────
          Transparent 80px strip over the cord so pointer events reach
          us without blocking the rest of the hero.                    */}
      <div
        className="absolute left-0 top-0 h-full z-[13]"
        style={{ width: '80px' }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      />

      <svg
        className="absolute left-0 top-0 h-full pointer-events-none z-[12]"
        style={{ width: "80px" }}
        viewBox="0 0 80 900"
        preserveAspectRatio="xMinYMin slice"
      >
        <defs>
          <linearGradient id="braidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={colors.shadow}  stopOpacity={0.5} />
            <stop offset="50%"  stopColor={colors.primary} stopOpacity={0.7} />
            <stop offset="100%" stopColor={colors.shadow}  stopOpacity={0.5} />
          </linearGradient>
        </defs>

        {/* ── Cord group — pivots at the top knot ─────────────────────
            transformBox fill-box + transformOrigin top-center means
            the rotation axis sits exactly at the braid's upper edge,
            so the cord swings like a real hanging ribbon.             */}
        <motion.g
          style={{
            transformBox:    'fill-box' as React.CSSProperties['transformBox'],
            transformOrigin: 'top center',
            rotate:          cordAngle,
          }}
        >
          {/* Braid body — gradient rect drawn behind the stitches */}
          <motion.rect
            x={cx - bw / 2}
            y={startY}
            width={bw}
            height={stitchCount * stitchH}
            fill="url(#braidGrad)"
            opacity={0.38 * opacity}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            style={{ transformOrigin: "top" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          />

          {/* Edge lines */}
          <motion.line
            x1={cx - bw / 2} y1={startY} x2={cx - bw / 2} y2={endY}
            stroke={colors.shadow} strokeWidth="0.7" opacity={0.75 * opacity}
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          />
          <motion.line
            x1={cx + bw / 2} y1={startY} x2={cx + bw / 2} y2={endY}
            stroke={colors.shadow} strokeWidth="0.7" opacity={0.75 * opacity}
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          />

          {/* 8-bobbin chevron braid */}
          <g opacity={opacity}>
            {braidPattern.map((s, i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + s.delay, duration: 0.2 }}
              >
                <line x1={s.left.x1}        y1={s.left.y1}        x2={s.left.x2}        y2={s.left.y2}
                  stroke={s.even ? colors.primary : colors.midtone} strokeWidth="0.5" strokeLinecap="round" opacity={0.85} />
                <line x1={s.right.x1}       y1={s.right.y1}       x2={s.right.x2}       y2={s.right.y2}
                  stroke={s.even ? colors.midtone : colors.primary} strokeWidth="0.5" strokeLinecap="round" opacity={0.85} />
                <line x1={s.leftReturn.x1}  y1={s.leftReturn.y1}  x2={s.leftReturn.x2}  y2={s.leftReturn.y2}
                  stroke={s.even ? colors.shadow : colors.primary} strokeWidth="0.4" strokeLinecap="round" opacity={0.65} />
                <line x1={s.rightReturn.x1} y1={s.rightReturn.y1} x2={s.rightReturn.x2} y2={s.rightReturn.y2}
                  stroke={s.even ? colors.primary : colors.shadow} strokeWidth="0.4" strokeLinecap="round" opacity={0.65} />
              </motion.g>
            ))}
          </g>

          {/* Binding wrap — closes the braid body, immediately above the tassel */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: opacity }}
            transition={{ delay: 1.4, duration: 0.4 }}
          >
            {[0, 1.5, 3, 4.5].map((off) => (
              <line
                key={off}
                x1={cx - bw / 2 - 0.3} y1={endY + off}
                x2={cx + bw / 2 + 0.3} y2={endY + off}
                stroke={colors.primary} strokeWidth="0.8" opacity={0.8}
              />
            ))}
          </motion.g>

          {/* Tassel — 11 silk threads, Bézier morph for gentle infinite sway */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: opacity }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            {tassel.map((t, i) => (
              <motion.path
                key={i}
                d={`M ${t.sx} ${t.sy} Q ${t.mx} ${t.my}, ${t.ex} ${t.ey}`}
                fill="none"
                stroke={t.color === 0 ? colors.primary : t.color === 1 ? colors.highlight : colors.midtone}
                strokeWidth={t.strokeWidth}
                strokeLinecap="round"
                opacity={t.opacity}
                initial={{ pathLength: 0 }}
                animate={{
                  pathLength: 1,
                  d: [
                    `M ${t.sx} ${t.sy} Q ${t.mx}        ${t.my},       ${t.ex}        ${t.ey}`,
                    `M ${t.sx} ${t.sy} Q ${t.mx + 1.5}  ${t.my + 2},   ${t.ex + 0.5}  ${t.ey + 1}`,
                    `M ${t.sx} ${t.sy} Q ${t.mx - 0.5}  ${t.my + 0.5}, ${t.ex - 0.3}  ${t.ey + 0.5}`,
                    `M ${t.sx} ${t.sy} Q ${t.mx}        ${t.my},       ${t.ex}        ${t.ey}`,
                  ],
                }}
                transition={{
                  pathLength: { duration: 0.6, delay: 1.7 + t.delay },
                  d: { duration: 5 + i * 0.2, repeat: Infinity, ease: "easeInOut", delay: 2.5 + t.delay },
                }}
              />
            ))}
          </motion.g>
        </motion.g>
      </svg>

      {/* ── Ethereal presence — light motes & warm glow ───────────────
          These remain at rest outside the sway group — they float in
          the atmosphere independent of the cord's movement.           */}
      <div className="absolute inset-0 pointer-events-none z-[3] overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`mote-${i}`}
            className="absolute rounded-full"
            style={{
              width:           1.5 + variation(i) * 1,
              height:          1.5 + variation(i + 50) * 1,
              backgroundColor: colors.lightMote,
              left:            `${5 + i * 8 + variation(i + 25) * 5}%`,
              top:             `${35 + i * 3 + variation(i + 75) * 10}%`,
              filter:          "blur(0.5px)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.4 * opacity, 0.2 * opacity, 0],
              scale:   [0.3, 1, 0.8, 0.3],
              x:       [0, 30 + i * 5, 60 + i * 8],
              y:       [0, -5 - i * 2, 5],
            }}
            transition={{ duration: 15 + i * 3, repeat: Infinity, delay: 4 + i * 2, ease: "easeInOut" }}
          />
        ))}

        <motion.div
          className="absolute rounded-full"
          style={{
            width:      "120px",
            height:     "120px",
            background: `radial-gradient(circle, ${colors.warmGlow} 0%, transparent 70%)`,
            left:       "2%",
            top:        "45%",
            filter:     "blur(30px)",
          }}
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </>
  )
}
