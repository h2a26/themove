"use client"

import { motion } from "framer-motion"
import { Sun, CloudRain } from "phosphor-react"
import { getShinkaiWeatherTheme } from "@/shared/theme/shinkaiWeather"

interface WeatherToggleProps {
  mode: "sunlit" | "rain"
  onToggle: () => void
  compact?: boolean
  className?: string
}

export function WeatherToggle({
  mode,
  onToggle,
  compact = false,
  className = '',
}: WeatherToggleProps) {
  const theme = getShinkaiWeatherTheme("sunlit")
  const iconColor = mode === "sunlit" ? theme.toggleIcon.sunlit : theme.toggleIcon.rain

  const buttonBaseClass = compact
    ? "flex items-center gap-2 px-3 py-2 rounded-full border border-slate-200 shinkai-panel shadow-sm hover:shadow-md transition-all"
    : "flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 shinkai-panel shadow-sm hover:shadow-md transition-all"

  const buttonClass = `${buttonBaseClass} ${className}`.trim()

  return (
    <motion.button
      onClick={onToggle}
      className={buttonClass}
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
          <Sun className="w-4 h-4" weight="bold" style={{ color: iconColor }} />
        ) : (
          <CloudRain className="w-4 h-4" weight="bold" style={{ color: iconColor }} />
        )}
      </motion.span>
      {!compact && (
        <span className="text-sm font-medium text-slate-700 uppercase tracking-wider">
          {mode === "sunlit" ? "Sunlit" : "Rain"}
        </span>
      )}
    </motion.button>
  )
}
