"use client"

import { motion } from "framer-motion"

interface TokyoCityscapeProps {
  weatherMode: "sunlit" | "rain"
}

export function TokyoCityscape({ weatherMode }: TokyoCityscapeProps) {
  // Taki's Tokyo - modern urban buildings with Makoto Shinkai's detailed line art style
  const strokeColor = weatherMode === "sunlit" ? "#64748b" : "#475569"
  const strokeLight = weatherMode === "sunlit" ? "#94a3b8" : "#64748b"
  const strokeFaint = weatherMode === "sunlit" ? "#cbd5e1" : "#94a3b8"
  
  return (
    <svg 
      className="absolute right-0 bottom-0 w-[500px] h-[600px] pointer-events-none"
      viewBox="0 0 500 600"
      preserveAspectRatio="xMaxYMax slice"
    >
      {/* Far background buildings - faint */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        {/* Distant skyscraper silhouette */}
        <motion.path
          d="M 380 600 L 380 380 L 395 380 L 395 350 L 410 350 L 410 380 L 425 380 L 425 600"
          fill="none"
          stroke={strokeFaint}
          strokeWidth="0.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
        />
        
        {/* Small antenna on top */}
        <motion.line
          x1="403" y1="350" x2="403" y2="320"
          stroke={strokeFaint}
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        />
      </motion.g>
      
      {/* Mid-ground buildings - medium opacity */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        {/* Modern office building with glass panels */}
        <motion.path
          d="M 300 600 L 300 420 L 360 420 L 360 600"
          fill="none"
          stroke={strokeLight}
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 1.2 }}
        />
        
        {/* Window grid pattern */}
        {[0, 1, 2, 3, 4, 5].map((row) => (
          <motion.g key={`office-row-${row}`}>
            {[0, 1, 2].map((col) => (
              <motion.rect
                key={`office-win-${row}-${col}`}
                x={308 + col * 16}
                y={435 + row * 26}
                width="10"
                height="18"
                fill="none"
                stroke={strokeLight}
                strokeWidth="0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1.5 + row * 0.1 + col * 0.05 }}
              />
            ))}
          </motion.g>
        ))}
        
        {/* Apartment complex */}
        <motion.path
          d="M 220 600 L 220 480 L 280 480 L 280 600"
          fill="none"
          stroke={strokeLight}
          strokeWidth="0.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1.4 }}
        />
        
        {/* Balcony lines */}
        {[0, 1, 2, 3].map((i) => (
          <motion.line
            key={`balcony-${i}`}
            x1="220" y1={495 + i * 25} x2="280" y2={495 + i * 25}
            stroke={strokeLight}
            strokeWidth="0.4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1.8 + i * 0.1 }}
          />
        ))}
      </motion.g>
      
      {/* Foreground buildings - full detail */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1.5, delay: 1.5 }}
      >
        {/* Main tall building - Tokyo tower inspired */}
        <motion.path
          d="M 420 600 L 420 280 L 440 260 L 460 280 L 460 600"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.8 }}
        />
        
        {/* Spire */}
        <motion.line
          x1="440" y1="260" x2="440" y2="220"
          stroke={strokeColor}
          strokeWidth="0.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        />
        
        {/* Floor lines */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <motion.line
            key={`floor-${i}`}
            x1="420" y1={310 + i * 32} x2="460" y2={310 + i * 32}
            stroke={strokeColor}
            strokeWidth="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, delay: 2.4 + i * 0.05 }}
          />
        ))}
        
        {/* Train tracks/elevated railway - iconic Tokyo element */}
        <motion.path
          d="M 150 550 L 500 520"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 2.5 }}
        />
        
        <motion.path
          d="M 150 555 L 500 525"
          fill="none"
          stroke={strokeColor}
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 2.6 }}
        />
        
        {/* Railway support pillars */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.line
            key={`pillar-${i}`}
            x1={180 + i * 55} y1={548 - i * 5} x2={180 + i * 55} y2="600"
            stroke={strokeColor}
            strokeWidth="0.6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 2.8 + i * 0.1 }}
          />
        ))}
        
        {/* Stairs - like the famous Suga Shrine stairs from the movie */}
        <motion.g>
          <motion.path
            d="M 480 600 L 480 480 L 500 480"
            fill="none"
            stroke={strokeColor}
            strokeWidth="0.8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 3 }}
          />
          
          {/* Individual steps */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <motion.line
              key={`step-${i}`}
              x1="480" y1={490 + i * 11} x2="500" y2={490 + i * 11}
              stroke={strokeColor}
              strokeWidth="0.4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 3.2 + i * 0.05 }}
            />
          ))}
          
          {/* Handrail */}
          <motion.path
            d="M 485 480 L 485 600"
            fill="none"
            stroke={strokeColor}
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 3.4 }}
          />
        </motion.g>
        
        {/* Street lamp */}
        <motion.g>
          <motion.line
            x1="200" y1="600" x2="200" y2="520"
            stroke={strokeColor}
            strokeWidth="0.6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 3.5 }}
          />
          <motion.path
            d="M 195 520 L 200 515 L 210 520 L 210 525 L 195 525 Z"
            fill="none"
            stroke={strokeColor}
            strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 3.7 }}
          />
        </motion.g>
        
        {/* Power lines - very characteristic of Shinkai's urban scenes */}
        <motion.path
          d="M 100 400 Q 250 420, 400 390"
          fill="none"
          stroke={strokeLight}
          strokeWidth="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 3.8 }}
        />
        
        <motion.path
          d="M 100 408 Q 250 430, 400 398"
          fill="none"
          stroke={strokeLight}
          strokeWidth="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 3.9 }}
        />
      </motion.g>
      
      {/* Additional detail: Small buildings in far distance */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 4 }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.rect
            key={`distant-${i}`}
            x={120 + i * 25}
            y={450 - i * 8}
            width="18"
            height={150 + i * 8}
            fill="none"
            stroke={strokeFaint}
            strokeWidth="0.4"
          />
        ))}
      </motion.g>
    </svg>
  )
}
