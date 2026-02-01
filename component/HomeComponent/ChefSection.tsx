'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

export function ChefSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="chef" ref={ref} className="relative py-24 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - Chef Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-black" />
            <motion.div
              initial={{ scale: 1.1 }}
              animate={isInView ? { scale: 1 } : { scale: 1.1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-gradient-to-tr from-black via-accent/10 to-transparent"
            />
            <Image src="/assets/chef.jpg" width={200} height={200} alt="Chef Marcus" className="w-full h-full object-cover object-center" />
          </motion.div>

          {/* Right - Chef's Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-accent text-sm tracking-widest font-display">
                THE VISIONARY
              </span>
              <h2 className="text-5xl md:text-6xl font-display font-bold text-white mt-4 mb-8">
                Chef Marcus
              </h2>
            </motion.div>

            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-2xl md:text-3xl font-serif text-foreground/90 mb-8 italic"
            >
              "Cooking is not just about feeding the body. It's about nourishing the soul, telling stories, and creating memories that will last a lifetime."
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4 text-foreground/80 font-serif text-lg leading-relaxed"
            >
              <p>
                With three Michelin stars and over two decades at the helm of Aurora, Chef Marcus has revolutionized fine dining. His approach blends classical techniques with cutting-edge innovation, always respecting the ingredient's integrity.
              </p>
              <p>
                Every dish is a canvas for his artistic vision—a meditation on flavor, texture, and the dining experience itself. He believes the best restaurants don't just serve food; they create moments of transcendence.
              </p>
            </motion.div>

            {/* Credentials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 grid grid-cols-3 gap-8"
            >
              {[
                { number: '3', label: 'Michelin Stars' },
                { number: '20+', label: 'Years Excellence' },
                { number: '1000+', label: 'Signature Dishes' },
              ].map((item, index) => (
                <div key={index}>
                  <div className="text-3xl font-display text-accent mb-2">
                    {item.number}
                  </div>
                  <p className="text-sm text-foreground/60 tracking-widest">
                    {item.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
