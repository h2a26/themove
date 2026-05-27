"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface WeatherEffectsProps {
  mode: "sunlit" | "rain"
}

// Dust motes for sunlit mode
function DustMotes() {
  const [motes, setMotes] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([])
  
  useEffect(() => {
    const newMotes = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      delay: Math.random() * 5
    }))
    setMotes(newMotes)
  }, [])
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {motes.map((mote) => (
        <motion.div
          key={mote.id}
          className="absolute rounded-full"
          style={{
            left: `${mote.x}%`,
            top: `${mote.y}%`,
            width: mote.size,
            height: mote.size,
            backgroundColor: 'var(--shinkai-dust-mote)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: mote.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Rain drops for rain mode
function RainDrops() {
  const [drops, setDrops] = useState<Array<{ id: number; x: number; delay: number; duration: number }>>([])
  
  useEffect(() => {
    const newDrops = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 0.5 + Math.random() * 0.5
    }))
    setDrops(newDrops)
  }, [])
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute"
          style={{
            left: `${drop.x}%`,
            height: 30 + Math.random() * 20,
            width: 1,
            background:
              'linear-gradient(to bottom, transparent, var(--shinkai-rain-via), var(--shinkai-rain-to))',
          }}
          animate={{
            y: ["-10%", "110%"],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: drop.duration,
            delay: drop.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

// Light shimmer effect
function LightShimmer() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          'radial-gradient(ellipse at 60% 30%, var(--shinkai-shimmer) 0%, transparent 60%)',
      }}
      animate={{
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

export function WeatherEffects({ mode }: WeatherEffectsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <LightShimmer />
      {mode === "sunlit" ? <DustMotes /> : <RainDrops />}
    </div>
  )
}
