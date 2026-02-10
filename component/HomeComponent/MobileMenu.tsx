'use client'

import { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Menu, X } from 'lucide-react'

interface MobileMenuProps {
  restaurantName: string
}

export function MobileMenu({ restaurantName }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = ['Menu', 'Experience', 'Reservations', 'Contact']

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      x: 300,
    },
    open: {
      opacity: 1,
      x: 0,
    },
  }

  const itemVariants: Variants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
      },
    }),
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-6 right-6 z-30">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-white hover:text-accent transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-screen w-3/4 bg-black border-l border-border z-40 md:hidden overflow-y-auto"
            >
              <div className="p-8 pt-24">
                <h3 className="text-2xl font-display text-white mb-8">
                  Navigation
                </h3>

                {/* Mobile Nav Items */}
                <nav className="space-y-4 mb-12">
                  {navItems.map((item, i) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      custom={i}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      onClick={() => setIsOpen(false)}
                      className="block text-lg text-foreground/70 hover:text-accent transition-colors font-serif"
                    >
                      {item}
                    </motion.a>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <motion.a
                  href="#reservations"
                  custom={navItems.length}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-6 py-3 border border-accent text-accent text-center text-sm font-display tracking-widest hover:bg-accent hover:text-black transition-all"
                >
                  RESERVE
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
