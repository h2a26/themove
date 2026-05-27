"use client"

import { motion } from "framer-motion"
import { getHeroStrokes } from "@/shared/components/line-art/tokens"

interface ItomoriVillageProps {
  weatherMode: "sunlit" | "rain"
}

/**
 * Hero left: heritage / traditional Move archetype in Shinkai Itomori vocabulary.
 * Torii, irimoya roof, shoji, and mountains evoke restoration & craft (e.g. listed homes,
 * Cotswolds estates)—not a literal film location. See THE_MOVE_MASTER_CONTEXT.md §6.
 */
export function ItomoriVillage({ weatherMode }: ItomoriVillageProps) {
  const { primary: strokeColor, light: strokeLight, faint: strokeFaint, wood: woodColor } =
    getHeroStrokes(weatherMode)
  
  return (
    <svg 
      className="absolute left-0 bottom-0 w-[450px] h-[550px] pointer-events-none"
      viewBox="0 0 450 550"
      preserveAspectRatio="xMinYMax slice"
    >
      {/* Mountains in far background */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, delay: 0.3 }}
      >
        <motion.path
          d="M -50 400 L 80 280 L 150 350 L 220 260 L 320 380 L 450 350 L 450 400 Z"
          fill="none"
          stroke={strokeFaint}
          strokeWidth="0.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, delay: 0.5 }}
        />
      </motion.g>
      
      {/* Forest treeline - distant */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <motion.path
            key={`tree-distant-${i}`}
            d={`M ${i * 50 + 20} 420 L ${i * 50 + 35} ${380 - (i % 3) * 15} L ${i * 50 + 50} 420`}
            fill="none"
            stroke={strokeFaint}
            strokeWidth="0.6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 1.2 + i * 0.1 }}
          />
        ))}
      </motion.g>
      
      {/* Miyamizu Shrine torii gate - iconic from the movie */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1.5, delay: 1.5 }}
      >
        {/* Main vertical posts */}
        <motion.line
          x1="80" y1="550" x2="80" y2="380"
          stroke={strokeColor}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 1.8 }}
        />
        <motion.line
          x1="140" y1="550" x2="140" y2="380"
          stroke={strokeColor}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 1.9 }}
        />
        
        {/* Top beam (kasagi) - curved */}
        <motion.path
          d="M 60 385 Q 110 375, 160 385"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
        />
        
        {/* Second beam (nuki) */}
        <motion.line
          x1="70" y1="410" x2="150" y2="410"
          stroke={strokeColor}
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 2.4 }}
        />
        
        {/* Small roof extensions */}
        <motion.path
          d="M 55 380 L 60 385 L 55 390"
          fill="none"
          stroke={strokeColor}
          strokeWidth="0.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 2.6 }}
        />
        <motion.path
          d="M 165 380 L 160 385 L 165 390"
          fill="none"
          stroke={strokeColor}
          strokeWidth="0.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 2.7 }}
        />
      </motion.g>
      
      {/* Traditional house (Mitsuha's home) */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        transition={{ duration: 1.5, delay: 2 }}
      >
        {/* Main house structure */}
        <motion.path
          d="M 200 550 L 200 460 L 320 460 L 320 550"
          fill="none"
          stroke={woodColor}
          strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 2.3 }}
        />
        
        {/* Traditional sloped roof (irimoya style) */}
        <motion.path
          d="M 185 460 L 260 400 L 335 460"
          fill="none"
          stroke={woodColor}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 2.5 }}
        />
        
        {/* Roof ridge detail */}
        <motion.path
          d="M 240 410 L 260 400 L 280 410"
          fill="none"
          stroke={woodColor}
          strokeWidth="0.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 2.8 }}
        />
        
        {/* Engawa (veranda) */}
        <motion.line
          x1="195" y1="520" x2="325" y2="520"
          stroke={woodColor}
          strokeWidth="0.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 3 }}
        />
        
        {/* Shoji screens (sliding doors) */}
        {[0, 1, 2].map((i) => (
          <motion.g key={`shoji-${i}`}>
            <motion.rect
              x={208 + i * 35}
              y="470"
              width="30"
              height="45"
              fill="none"
              stroke={strokeLight}
              strokeWidth="0.6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 3.2 + i * 0.1 }}
            />
            {/* Grid pattern inside shoji */}
            <motion.line
              x1={223 + i * 35} y1="470" x2={223 + i * 35} y2="515"
              stroke={strokeLight}
              strokeWidth="0.3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 3.4 + i * 0.1 }}
            />
            <motion.line
              x1={208 + i * 35} y1="492" x2={238 + i * 35} y2="492"
              stroke={strokeLight}
              strokeWidth="0.3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 3.4 + i * 0.1 }}
            />
          </motion.g>
        ))}
      </motion.g>
      
      {/* Small shrine building */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ duration: 1.5, delay: 2.8 }}
      >
        {/* Small hokora (miniature shrine) */}
        <motion.path
          d="M 350 550 L 350 490 L 400 490 L 400 550"
          fill="none"
          stroke={strokeColor}
          strokeWidth="0.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 3.2 }}
        />
        
        {/* Shrine roof */}
        <motion.path
          d="M 340 490 L 375 460 L 410 490"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 3.4 }}
        />
        
        {/* Chigi (roof ornament) */}
        <motion.path
          d="M 370 460 L 375 450 L 380 460"
          fill="none"
          stroke={strokeColor}
          strokeWidth="0.6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 3.6 }}
        />
      </motion.g>
      
      {/* Stone path leading to shrine */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 3.5 }}
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.ellipse
            key={`stone-${i}`}
            cx={110 + i * 20 + (i % 2) * 5}
            cy={540 - i * 3}
            rx="8"
            ry="4"
            fill="none"
            stroke={strokeLight}
            strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 3.8 + i * 0.1 }}
          />
        ))}
      </motion.g>
      
      {/* Nearby trees - closer, more detail */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.5, delay: 3.8 }}
      >
        {/* Pine tree near torii */}
        <motion.path
          d="M 30 550 L 30 450"
          fill="none"
          stroke={woodColor}
          strokeWidth="0.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 4 }}
        />
        <motion.path
          d="M 10 480 Q 30 460, 50 480"
          fill="none"
          stroke={strokeColor}
          strokeWidth="0.6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 4.2 }}
        />
        <motion.path
          d="M 15 460 Q 30 440, 45 460"
          fill="none"
          stroke={strokeColor}
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 4.3 }}
        />
        <motion.path
          d="M 20 442 Q 30 425, 40 442"
          fill="none"
          stroke={strokeColor}
          strokeWidth="0.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 4.4 }}
        />
        
        {/* Bamboo grove near house */}
        {[0, 1, 2].map((i) => (
          <motion.g key={`bamboo-${i}`}>
            <motion.line
              x1={170 - i * 8}
              y1="550"
              x2={170 - i * 8}
              y2={430 + i * 15}
              stroke={strokeLight}
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 4.5 + i * 0.1 }}
            />
            {/* Bamboo nodes */}
            <motion.line
              x1={168 - i * 8}
              y1={480 + i * 10}
              x2={172 - i * 8}
              y2={480 + i * 10}
              stroke={strokeLight}
              strokeWidth="0.3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 4.7 + i * 0.1 }}
            />
          </motion.g>
        ))}
      </motion.g>
      
      {/* Subtle grass/ground texture */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 4.5 }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <motion.path
            key={`grass-${i}`}
            d={`M ${i * 50 + 10} 548 Q ${i * 50 + 15} 540, ${i * 50 + 20} 548`}
            fill="none"
            stroke={strokeFaint}
            strokeWidth="0.4"
          />
        ))}
      </motion.g>
    </svg>
  )
}
