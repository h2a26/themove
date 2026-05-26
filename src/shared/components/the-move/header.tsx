"use client"

import { MagnifyingGlass } from "phosphor-react"
import { motion } from "framer-motion"

export function Header() {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 px-8 py-5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative w-6 h-6">
            {/* Stacked layers icon */}
            <div className="absolute inset-0 border border-slate-700 rounded-sm" />
            <div className="absolute inset-0.5 border border-slate-500 rounded-sm translate-x-0.5 -translate-y-0.5" />
            <div className="absolute inset-1 border border-slate-400 rounded-sm translate-x-1 -translate-y-1" />
          </div>
          <span className="font-medium text-slate-800 text-lg tracking-tight">The Move</span>
        </motion.div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {["Stories", "Spaces", "Memory", "About"].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors relative group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-slate-400 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </nav>

        {/* Search */}
        <motion.button 
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Search"
        >
          <MagnifyingGlass className="w-5 h-5 text-slate-600" weight="bold" />
        </motion.button>
      </div>
    </motion.header>
  )
}
