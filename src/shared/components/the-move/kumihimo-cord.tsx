"use client"

import { motion } from "framer-motion"
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
 * That's time. That's musubi."
 * — Miyamizu Hitoha, Your Name
 * 
 * The Move's Philosophy:
 * The connection between The Move and its projects (stories) is like 
 * Mitsuha and Taki - invisible yet deeply felt through atmosphere, 
 * weather, light, memory, and the emotion of space.
 * 
 * This is NOT a physical cord spanning the screen.
 * It is an ethereal presence - threads of memory woven into light,
 * fragments of connection drifting through the atmosphere.
 * 
 * Heart-to-heart architectural work doesn't need to be seen.
 * It needs to be felt.
 */
export function KumihimoCord({ weatherMode }: KumihimoCordProps) {
  const colors = getShinkaiWeatherTheme(weatherMode).cord
  
  const opacity = weatherMode === "sunlit" ? 0.9 : 0.75

  // Generate subtle flat braid pattern - delicate hand-drawn style
  // 8 threads crossing in herringbone/chevron pattern
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
      // Alternating chevron pattern
      stitches.push({
        y,
        left: { x1: centerX - hw, y1: y, x2: centerX, y2: y + stitchHeight * 0.5 },
        right: { x1: centerX + hw, y1: y, x2: centerX, y2: y + stitchHeight * 0.5 },
        leftReturn: { x1: centerX, y1: y + stitchHeight * 0.5, x2: centerX - hw, y2: y + stitchHeight },
        rightReturn: { x1: centerX, y1: y + stitchHeight * 0.5, x2: centerX + hw, y2: y + stitchHeight },
        delay: i * 0.006,
        even: i % 2 === 0,
      })
    }
    return stitches
  }

  // Tassel - delicate brushed silk threads
  const generateTassel = (centerX: number, startY: number, count: number, spread: number, length: number) => {
    const threads = []
    for (let i = 0; i < count; i++) {
      const t = (i / (count - 1)) - 0.5
      const xOff = t * spread
      const curve = Math.abs(t) * 6
      threads.push({
        sx: centerX + xOff * 0.2,
        sy: startY,
        mx: centerX + xOff * 0.6 + curve,
        my: startY + length * 0.5,
        ex: centerX + xOff + curve,
        ey: startY + length + variation(i) * 4,
        delay: i * 0.025,
        color: i % 3,
        strokeWidth: 0.4 + variation(i + 100) * 0.2,
        opacity: 0.6 + variation(i + 200) * 0.3,
      })
    }
    return threads
  }

  const cx = 38 // Position near left edge, subtle
  const bw = 5 // Thin width - delicate
  const startY = -5
  const stitchH = 2.5 // Small stitches for fine detail
  const stitchCount = 140
  const endY = startY + stitchCount * stitchH

  const braidPattern = generateBraidPattern(cx, startY, bw, stitchCount, stitchH)
  const tassel = generateTassel(cx, endY + 8, 9, 10, 22)

  return (
    <>
      {/* ===== SUBTLE KUMIHIMO - Mitsuha's Ribbon ===== */}
      {/* Delicate, thin, hand-drawn style matching the architecture */}
      
      <svg
        className="absolute left-0 top-0 h-full pointer-events-none z-[12]"
        style={{ width: "80px" }}
        viewBox="0 0 80 900"
        preserveAspectRatio="xMinYMin slice"
      >
        <defs>
          <linearGradient id="braidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.shadow} stopOpacity={0.5} />
            <stop offset="50%" stopColor={colors.primary} stopOpacity={0.7} />
            <stop offset="100%" stopColor={colors.shadow} stopOpacity={0.5} />
          </linearGradient>
        </defs>

        {/* Braid body - subtle foundation */}
        <motion.rect
          x={cx - bw / 2}
          y={startY}
          width={bw}
          height={stitchCount * stitchH}
          fill="url(#braidGrad)"
          opacity={0.2 * opacity}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          style={{ transformOrigin: "top" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        />

        {/* Edge lines - hand-drawn style */}
        <motion.line
          x1={cx - bw / 2} y1={startY} x2={cx - bw / 2} y2={endY}
          stroke={colors.shadow}
          strokeWidth="0.4"
          opacity={0.5 * opacity}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
        />
        <motion.line
          x1={cx + bw / 2} y1={startY} x2={cx + bw / 2} y2={endY}
          stroke={colors.shadow}
          strokeWidth="0.4"
          opacity={0.5 * opacity}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
        />

        {/* ===== FLAT BRAID WEAVE - 8-bobbin chevron ===== */}
        <g opacity={opacity}>
          {braidPattern.map((s, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + s.delay, duration: 0.2 }}
            >
              {/* Chevron left arm */}
              <line
                x1={s.left.x1} y1={s.left.y1} x2={s.left.x2} y2={s.left.y2}
                stroke={s.even ? colors.primary : colors.midtone}
                strokeWidth="0.35"
                strokeLinecap="round"
                opacity={0.7}
              />
              {/* Chevron right arm */}
              <line
                x1={s.right.x1} y1={s.right.y1} x2={s.right.x2} y2={s.right.y2}
                stroke={s.even ? colors.midtone : colors.primary}
                strokeWidth="0.35"
                strokeLinecap="round"
                opacity={0.7}
              />
              {/* Return - left */}
              <line
                x1={s.leftReturn.x1} y1={s.leftReturn.y1} x2={s.leftReturn.x2} y2={s.leftReturn.y2}
                stroke={s.even ? colors.shadow : colors.primary}
                strokeWidth="0.3"
                strokeLinecap="round"
                opacity={0.5}
              />
              {/* Return - right */}
              <line
                x1={s.rightReturn.x1} y1={s.rightReturn.y1} x2={s.rightReturn.x2} y2={s.rightReturn.y2}
                stroke={s.even ? colors.primary : colors.shadow}
                strokeWidth="0.3"
                strokeLinecap="round"
                opacity={0.5}
              />
            </motion.g>
          ))}
        </g>

        {/* Binding wrap */}
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
              stroke={colors.primary}
              strokeWidth="0.8"
              opacity={0.8}
            />
          ))}
        </motion.g>

        {/* Tassel threads */}
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
                  `M ${t.sx} ${t.sy} Q ${t.mx} ${t.my}, ${t.ex} ${t.ey}`,
                  `M ${t.sx} ${t.sy} Q ${t.mx + 1.5} ${t.my + 2}, ${t.ex + 0.5} ${t.ey + 1}`,
                  `M ${t.sx} ${t.sy} Q ${t.mx - 0.5} ${t.my + 0.5}, ${t.ex - 0.3} ${t.ey + 0.5}`,
                  `M ${t.sx} ${t.sy} Q ${t.mx} ${t.my}, ${t.ex} ${t.ey}`,
                ],
              }}
              transition={{
                pathLength: { duration: 0.6, delay: 1.7 + t.delay },
                d: { duration: 5 + i * 0.2, repeat: Infinity, ease: "easeInOut", delay: 2.5 + t.delay },
              }}
            />
          ))}
        </motion.g>
      </svg>

      {/* ===== INVISIBLE CONNECTION - Felt, Not Seen ===== */}
      {/* The heart-to-heart bond between The Move and its stories */}
      {/* Like Mitsuha and Taki - connected across time and space */}
      {/* Through atmosphere, light, memory, emotion of space */}
      
      <div className="absolute inset-0 pointer-events-none z-[3] overflow-hidden">
        {/* Ethereal light motes - memory fragments drifting invisibly */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`mote-${i}`}
            className="absolute rounded-full"
            style={{
              width: 1.5 + variation(i) * 1,
              height: 1.5 + variation(i + 50) * 1,
              backgroundColor: colors.lightMote,
              left: `${5 + i * 8 + variation(i + 25) * 5}%`,
              top: `${35 + i * 3 + variation(i + 75) * 10}%`,
              filter: "blur(0.5px)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.4 * opacity, 0.2 * opacity, 0],
              scale: [0.3, 1, 0.8, 0.3],
              x: [0, 30 + i * 5, 60 + i * 8],
              y: [0, -5 - i * 2, 5],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              delay: 4 + i * 2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Subtle warm glow - the emotion of light */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "120px",
            height: "120px",
            background: `radial-gradient(circle, ${colors.warmGlow} 0%, transparent 70%)`,
            left: "2%",
            top: "45%",
            filter: "blur(30px)",
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </>
  )
}
