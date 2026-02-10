'use client'

import { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react'
import Image from 'next/image'

export function LocationFooter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <footer id="contact" ref={ref} className="relative bg-black/40 border-t border-border">
      {/* <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center -z-1"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 800%22%3E%3Crect fill=%22%23111%22 width=%221200%22 height=%22800%22/%3E%3Cdefs%3E%3ClinearGradient id=%22grad%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:%23222;stop-opacity:1%22 /%3E%3Cstop offset=%22100%25%22 style=%22stop-color:%23000;stop-opacity:1%22 /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill=%22url(%23grad)%22 width=%221200%22 height=%22800%22/%3E%3C/svg%3E")',
          }}
        />
      </div> */}
      {/* Location Section */}
      <div className="max-w-6xl mx-auto px-6 py-24">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-26 mb-16 mx-12"
        >

          {/* Map Placeholder */}
          <motion.div
            variants={itemVariants}
            className="relative h-80 rounded-2xl overflow-hidden border border-border"
          >
            {/* <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-black" /> */}

            <Image
              src="/assets/loc.jpg"
              alt="Map Location"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover w-full h-full"
            />
            <motion.div
              initial={{ scale: 1.1 }}
              animate={isInView ? { scale: 1 } : { scale: 1.1 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-gradient-to-tr from-black via-accent/10 to-transparent flex items-center justify-center"
            >
              <div className="text-center">
                <MapPin className="w-12 h-12 text-accent mx-auto mb-4 opacity-100" />
                {/* <p className="text-foreground/60 font-serif">view Map</p> */}
              </div>
            </motion.div>
          </motion.div>

          {/* Location Info */}
          <motion.div
            variants={containerVariants}
            className="flex flex-col justify-center space-y-3  mx-22"
          >
            <motion.h2
              variants={itemVariants}
              className="text-5xl font-display font-bold text-white"
            >
              Visit Us
            </motion.h2>

            {/* Address */}
            <motion.a
              variants={itemVariants}
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 p-4 rounded-lg hover:bg-card transition-colors"
            >
              <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <p className="text-white font-serif text-lg">
                  123 Culinary Lane
                </p>
                <p className="text-foreground/60 font-serif">
                  San Francisco, CA 94105
                </p>
              </div>
            </motion.a>

            {/* Phone */}
            <motion.a
              variants={itemVariants}
              href="tel:+14155551234"
              className="group flex items-center gap-4 p-4 rounded-lg hover:bg-card transition-colors"
            >
              <Phone className="w-6 h-6 text-accent flex-shrink-0" />
              <div>
                <p className="text-white font-serif text-lg">
                  +1 (415) 555-1234
                </p>
                <p className="text-foreground/60 text-sm">
                  Call for reservations
                </p>
              </div>
            </motion.a>

            {/* Email */}
            <motion.a
              variants={itemVariants}
              href="mailto:reservations@aurora.com"
              className="group flex items-center gap-4 p-4 rounded-lg hover:bg-card transition-colors"
            >
              <Mail className="w-6 h-6 text-accent flex-shrink-0" />
              <div>
                <p className="text-white font-serif text-lg">
                  reservations@aurora.com
                </p>
                <p className="text-foreground/60 text-sm">
                  Email us anytime
                </p>
              </div>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Hours */}
        <motion.div
          variants={itemVariants}
          className=" bg-gradient-to-b from-accent/10 to-black border border-border rounded-2xl p-8 mb-16"
        >
          <h3 className="text-2xl font-display font-bold text-white mb-6">
            Hours of Operation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-serif">
            {[
              { day: 'Tuesday - Thursday', hours: '5:00 PM - 11:00 PM' },
              { day: 'Friday - Saturday', hours: '5:00 PM - Midnight' },
              { day: 'Sunday', hours: '5:00 PM - 10:00 PM' },
              { day: 'Monday', hours: 'Closed' },
            ].map((schedule, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-foreground/70">{schedule.day}</span>
                <span className="text-white font-semibold">
                  {schedule.hours}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="border-t border-border bg-gradient-to-b from-accent/20 to-black"
      >
        <div className="max-w-6xl mx-auto px-6 py-9">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-1">
            {/* Brand */}
            <motion.div variants={itemVariants}>
              <h4 className="text-white font-display text-lg tracking-wider mb-4">
                AURORA
              </h4>
              <p className="text-foreground/60 font-serif text-sm leading-relaxed">
                Where flavor becomes art. A culinary experience designed to transcend the ordinary.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-white font-display text-lg tracking-wider mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {['About', 'Menu', 'Reservations', 'Contact'].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-foreground/60 font-serif text-sm hover:text-accent transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-white font-display text-lg tracking-wider mb-4">
                Follow Us
              </h4>
              <div className="flex gap-4">
                {[
                  { Icon: Instagram, href: '#' },
                  { Icon: Facebook, href: '#' },
                  { Icon: Twitter, href: '#' },
                ].map(({ Icon, href }, index) => (
                  <motion.a
                    key={index}
                    href={href}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-black transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            variants={itemVariants}
            className=" mt-13 text-center text-foreground/30 underline text-sm font-serif"
          >
            <p>
              &copy; {new Date().getFullYear()} Aurora. All rights reserved. | Design & Culinary Excellence
            </p>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  )
}
