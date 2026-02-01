'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const testimonials = [
  {
    quote: "An absolutely transcendent dining experience. Every dish was a masterpiece.",
    author: "Sarah Mitchell",
    title: "Food Critic, Culinary Review"
  },
  {
    quote: "Aurora isn't just a restaurant—it's a journey. The precision and artistry are unmatched.",
    author: "James Chen",
    title: "Travel & Lifestyle Editor"
  },
  {
    quote: "We've dined at the finest establishments worldwide. This surpasses them all.",
    author: "Elena Rossi",
    title: "Michelin Guide Inspector"
  },
  {
    quote: "The storytelling through food is extraordinary. A truly unforgettable night.",
    author: "Marcus Thompson",
    title: "Entertainment Magazine"
  },
]

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="testimonials" ref={ref} className="relative py-24 bg-black">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
            What They Say
          </h2>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="overflow-hidden">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* Star Rating */}
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-accent text-2xl">★</span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-3xl md:text-4xl font-serif text-white mb-8 italic">
                "{testimonials[activeIndex].quote}"
              </blockquote>

              {/* Author */}
              <div>
                <p className="text-xl font-serif text-accent font-semibold">
                  {testimonials[activeIndex].author}
                </p>
                <p className="text-foreground/60 text-sm tracking-widest">
                  {testimonials[activeIndex].title}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Carousel Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center gap-3 mt-12"
          >
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === index
                    ? 'w-8 bg-accent'
                    : 'w-2 bg-accent/30 hover:bg-accent/50'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
