"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { KumihimoCord } from "./kumihimo-cord"
import { TokyoCityscape } from "./tokyo-cityscape"
import { ItomoriVillage } from "./itomori-village"
import { WeatherEffects } from "./weather-effects"
import { useWeatherMode } from "@/shared/state/weather-mode-context"

export function HeroSection() {
  const { mode: weatherMode } = useWeatherMode()
  
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden transition-colors duration-1000"
      style={{
        backgroundImage: `linear-gradient(to bottom right, var(--shinkai-hero-from), var(--shinkai-hero-via), var(--shinkai-hero-to))`,
      }}
    >
      <WeatherEffects mode={weatherMode} />
      
      <KumihimoCord weatherMode={weatherMode} />
      
      {/* Clickable atmospheric halves → /projects */}
      <Link
        href="/projects"
        className="absolute left-0 top-0 z-[8] h-full w-1/2"
        aria-label="Explore projects — heritage and tradition"
      />
      <Link
        href="/projects"
        className="absolute right-0 top-0 z-[8] h-full w-1/2"
        aria-label="Explore projects — contemporary and urban"
      />
      
      <ItomoriVillage weatherMode={weatherMode} />
      <TokyoCityscape weatherMode={weatherMode} />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-20 pointer-events-none">
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
        
        <motion.p 
          className="mt-8 text-center text-lg md:text-xl text-slate-500 max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          A gentle catalogue of spaces, light, and memory.
        </motion.p>
        
        <motion.div
          className="mt-12 pointer-events-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
        >
          <Link
            href="/projects"
            className="group inline-flex flex-col items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors"
          >
            <span className="text-xs font-medium tracking-[0.35em] uppercase">explore</span>
            <motion.span
              className="block h-px w-8 bg-slate-400 group-hover:w-12 transition-all duration-700"
              style={{ transitionTimingFunction: 'cubic-bezier(0.43, 0.13, 0.23, 0.96)' }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </Link>
        </motion.div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-white/20" />
    </section>
  )
}
