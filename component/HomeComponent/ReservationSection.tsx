'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function ReservationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.4 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section id="reservations" ref={ref} className="relative py-32 bg-black overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Main Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-6xl md:text-7xl font-display font-bold text-white mb-6"
          >
            Ready for the Experience?
          </motion.h2>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-xl text-foreground/80 font-serif mb-12 max-w-2xl mx-auto"
          >
            Secure your seat at our table and embark on a culinary journey you'll never forget.
          </motion.p>

          {/* Info Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {[
              { label: 'Hours', value: 'Tues - Sun, 5PM - 11PM' },
              { label: 'Parties', value: '2 - 8 Guests' },
              { label: 'Dress Code', value: 'Smart Casual' },
            ].map((info, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card border border-border rounded-lg p-6"
              >
                <p className="text-accent text-sm tracking-widest font-display mb-2">
                  {info.label}
                </p>
                <p className="text-white font-serif text-lg">
                  {info.value}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Primary CTA */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="tel:+1234567890"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-4 bg-accent text-black font-display font-bold tracking-wider hover:bg-accent/90 transition-all duration-300 rounded-lg"
            >
              CALL TO RESERVE
            </motion.a>
            <motion.a
              href="mailto:reservations@aurora.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-4 border-2 border-accent text-accent font-display font-bold tracking-wider hover:bg-accent hover:text-black transition-all duration-300 rounded-lg"
            >
              EMAIL US
            </motion.a>
          </motion.div>

          {/* Secondary Message */}
          <motion.p
            variants={itemVariants}
            className="text-foreground/60 font-serif text-sm mt-10"
          >
            Reservations are essential. Walk-ins welcome based on availability.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
