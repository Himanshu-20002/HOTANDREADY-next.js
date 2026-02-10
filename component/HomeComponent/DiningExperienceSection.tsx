'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView, useViewportScroll, useTransform } from 'framer-motion'

const experiences = [
  {
    title: 'Immersive Ambiance',
    description: 'Our dining room is designed to transport you to another world, with carefully curated lighting and acoustics.',
    icon: '✦'
  },
  {
    title: 'Expert Service',
    description: 'Our sommelier-trained staff ensures every detail of your meal is perfectly orchestrated.',
    icon: '⚜'
  },
  {
    title: 'Private Events',
    description: 'Exclusive spaces for intimate gatherings and milestone celebrations.',
    icon: '◆'
  },
]

export function DiningExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { scrollY } = useViewportScroll()
  const y = useTransform(scrollY, [800, 1400], [100, 0])

  const images = [
    '/assets/exp/exp.jpg',
    '/assets/exp/exp2.jpg',
    '/assets/exp/exp3.jpg',
    '/assets/exp/exp4.jpg',
  ]
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="experience" ref={ref} className="relative py-24 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
            The Experience
          </h2>
          <p className="text-foreground/60 font-serif text-lg">
            Beyond the plate
          </p>
        </motion.div>

        {/* Main Experience Image with Parallax */}
        <motion.div
          style={{ y }}
          className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-16"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <Image
                src={images[current]}
                alt={`Dining experience ${current + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover w-full h-full"
              />
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-tr from-black via-accent/10 to-transparent"
          />
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: 'easeOut' },
                },
              }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-5xl mb-6 text-accent"
              >
                {exp.icon}
              </motion.div>
              <h3 className="text-2xl font-serif font-semibold text-white mb-4">
                {exp.title}
              </h3>
              <p className="text-foreground/70 font-serif leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-foreground/70 font-serif text-lg mb-8">
            Book your unforgettable experience today
          </p>
          <motion.a
            href="#reservations"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block px-12 py-4 border-2 border-accent text-accent font-display font-bold tracking-wider hover:bg-accent hover:text-black transition-all duration-300"
          >
            RESERVE YOUR TABLE
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
