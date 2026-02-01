'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoaderProps {
  onLoadingComplete: () => void
  restaurantName: string
}

export function Loader({ onLoadingComplete, restaurantName }: LoaderProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Loader plays for 2.2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
      onLoadingComplete()
    }, 2200)

    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden"
          exit={{
            y: '-100vh',
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          <div className="flex flex-col items-center gap-8">
            {/* Restaurant Name Animation */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: [-60, -60],
                opacity: 1
              }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: 'easeOut'
              }}
              className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white tracking-widest text-center"
            >
              {restaurantName}
            </motion.h1>

            {/* Loading Bar Animation */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: '120px',
                opacity: 1,
              }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: 'easeOut'
              }}
              className="h-1 bg-white rounded-full overflow-hidden"
            >
              {/* Pulse effect on the bar */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="h-full w-1/3 bg-gradient-to-r from-transparent via-white to-transparent"
              />
            </motion.div>

            {/* Subtle loading text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-xs text-foreground/50 tracking-widest mt-4"
            >
              LOADING
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
