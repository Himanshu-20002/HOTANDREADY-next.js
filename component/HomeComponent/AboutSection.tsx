'use client'

import { useRef } from 'react'
import { motion, useInView, easeOut, Variants } from 'framer-motion'
import { ImageSlider } from './ImageSlider'

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  }

  return (
    <section id="about" ref={ref} className="relative py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >
          {/* Left Side - Content */}
          <div>
            <motion.div variants={itemVariants}>
              <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
                The Story
              </h2>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-foreground/80 font-serif mb-6 leading-relaxed"
            >
              For over two decades, we've been at the forefront of culinary innovation. Our kitchen is a laboratory of flavors where tradition meets creativity.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg text-foreground/80 font-serif mb-8 leading-relaxed"
            >
              Every dish tells a story. Every ingredient is sourced with intention. Every moment dining with us is crafted to be unforgettable.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex gap-6 flex-wrap"
            >
              {['Innovation', 'Tradition', 'Excellence'].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 border border-accent/40 text-accent text-sm tracking-widest"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Image Slider */}
          <motion.div
            variants={itemVariants}
            className="relative h-96 md:h-[500px] bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-accent/5 z-20" />
            <ImageSlider
              images={[
                '/assets/aboutimage/about1.jpg',
                '/assets/aboutimage/about2.jpg',
                '/assets/aboutimage/about3.jpg',
                '/assets/aboutimage/about4.jpg',
              ]}
              interval={5000}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
