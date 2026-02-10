'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface ImageSliderProps {
  images: string[]
  interval?: number
}

export function ImageSlider({ images, interval = 2000 }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (images.length === 0) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            fill
            className="object-cover w-full h-full"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition"
        aria-label="Previous image"
      >
        ←
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition"
        aria-label="Next image"
      >
        →
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition ${
              idx === currentIndex ? 'w-8 bg-accent' : 'w-2 bg-accent/30 hover:bg-accent/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}