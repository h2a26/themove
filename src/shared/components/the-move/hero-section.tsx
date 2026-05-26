"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CaretRight, Sun, CloudRain } from "phosphor-react"
import { KumihimoCord } from "./kumihimo-cord"
import { TokyoCityscape } from "./tokyo-cityscape"
import { ItomoriVillage } from "./itomori-village"
import { WeatherEffects } from "./weather-effects"
import { WeatherToggle } from "./weather-toggle"

export function HeroSection() {
  const [weatherMode, setWeatherMode] = useState<"sunlit" | "rain">("sunlit")
  
  const toggleWeather = () => {
    setWeatherMode(prev => prev === "sunlit" ? "rain" : "sunlit")
  }
  
  // Background gradient based on weather mode
  const bgGradient = weatherMode === "sunlit" 
    ? "bg-gradient-to-br from-white via-slate-50 to-sky-100/60"
    : "bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300/60"
  
  return (
    <section className={`relative min-h-screen w-full overflow-hidden transition-colors duration-1000 ${bgGradient}`}>
      {/* Weather effects overlay */}
      <WeatherEffects mode={weatherMode} />
      
      {/* Kumihimo cord - the red string of fate connecting Taki and Mitsuha */}
      <KumihimoCord weatherMode={weatherMode} />
      
      {/* Itomori Village - Mitsuha's rural home (left side) */}
      <ItomoriVillage weatherMode={weatherMode} />
      
      {/* Tokyo Cityscape - Taki's urban world (right side) */}
      <TokyoCityscape weatherMode={weatherMode} />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-20">
        {/* Main headline */}
        <motion.h1 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="block font-serif text-5xl md:text-6xl lg:text-7xl text-slate-800 leading-tight tracking-tight">
            Interior stories
          </span>
          <span className="block font-serif text-5xl md:text-6xl lg:text-7xl text-slate-800 leading-tight tracking-tight">
            in quiet motion.
          </span>
        </motion.h1>
        
        {/* Subheadline */}
        <motion.p 
          className="mt-8 text-center text-lg md:text-xl text-slate-500 max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          A gentle catalogue of spaces, light, and memory.
        </motion.p>
        
        {/* CTA Button */}
        <motion.button
          className="mt-10 group flex items-center gap-3 px-8 py-4 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <span className="text-sm font-medium tracking-widest uppercase">Explore the Story</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <CaretRight className="w-4 h-4" weight="bold" />
          </motion.span>
        </motion.button>
        
        {/* Weather Toggle */}
        <div className="mt-16">
          <WeatherToggle mode={weatherMode} onToggle={toggleWeather} />
        </div>
      </div>
      
      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-white/20" />
    </section>
  )
}
