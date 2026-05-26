"use client"

import { motion } from "framer-motion"
import { Sun, CloudRain } from "phosphor-react"

interface WeatherToggleProps {
  mode: "sunlit" | "rain"
  onToggle: () => void
}

export function WeatherToggle({ mode, onToggle }: WeatherToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <motion.span
        key={mode}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {mode === "sunlit" ? (
          <Sun className="w-4 h-4 text-amber-500" weight="bold" />
        ) : (
          <CloudRain className="w-4 h-4 text-blue-400" weight="bold" />
        )}
      </motion.span>
      <span className="text-sm font-medium text-slate-700 uppercase tracking-wider">
        {mode === "sunlit" ? "Sunlit" : "Rain"}
      </span>
    </motion.button>
  )
}
