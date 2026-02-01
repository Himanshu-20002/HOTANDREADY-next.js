'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MobileMenu } from './MobileMenu'

interface NavigationProps {
  restaurantName: string
}

export function Navigation({ restaurantName }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = ['Menu', 'Experience', 'Reservations', 'Contact']

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-md border-b border-accent/20' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          {/* Logo / Restaurant Name */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.6 }}
            className="text-xl font-display tracking-wider text-white"
          >
            {restaurantName}
          </motion.div>

          {/* Navigation Links - Desktop Only */}
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.3 + index * 0.1, duration: 0.5 }}
                className="text-sm tracking-widest text-foreground/70 hover:text-accent transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* CTA Button - Desktop Only */}
          <motion.a
            href="#reservations"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.5, duration: 0.5 }}
            className="hidden md:block px-6 py-2 border border-accent text-accent text-sm font-medium tracking-widest hover:bg-accent hover:text-black transition-all duration-300"
          >
            RESERVE
          </motion.a>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu restaurantName={restaurantName} />
    </>
  )
}
