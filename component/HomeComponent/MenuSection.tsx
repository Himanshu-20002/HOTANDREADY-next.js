'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
gsap.registerPlugin(ScrollTrigger)

const diverseCuisineDishes = [
  {
    name: 'Angel Delight',
    description: 'Effortlessly organize and prioritize your tasks.',
    image: '/assets/dish1.png',
  },
  {
    name: 'Bird\'s Custard',
    description: 'Effortlessly organize and prioritize your tasks.',
    image: '/assets/dish2.png',
  },
  {
    name: 'Bompas & Parr',
    description: 'Effortlessly organize and prioritize your tasks.',
    image: '/assets/dish3.png',
  },
]

const dishes = [

  {
    name: 'Garden\'s Gift',
    description: 'Heirloom vegetables with charred broccolini and herb emulsion',
    image: '/assets/sig1.jpg',
    price: '₹ 99',
  },
  {
    name: 'Delicate Balance',
    description: 'Pan-seared halibut with champagne foam and caviar pearls',
    image: '/assets/sig2.jpg',
    price: '₹ 99',
  },
  {
    name: 'Chef\'s Curiosity',
    description: 'Seasonal selection inspired by global culinary traditions',
    image: '/assets/sig3.jpg',
    price: '₹ 69',
  },
]

export function MenuSection() {
  const ref = useRef(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const plateRef = useRef<HTMLImageElement>(null)
  useEffect(() => {
    if (!containerRef.current) return

    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      lerp: 0.07, // light, premium smooth
    })

    // CONNECT Lenis → ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          // 🚫 DO NOT use immediate: true
          if (typeof value === 'number') {
            lenis.scrollTo(value)
          }
        } else {
          return lenis.scroll
        }
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
    })

    ScrollTrigger.refresh()

    const ctx = gsap.context(() => {
      gsap.to(".diverse-dish-image", {
        rotation: 50,
        ease: "none",
        scrollTrigger: {
          trigger: ".diverse-dish-image",
          start: "top bottom",
          end: "top top",

          // ✅ THIS is the magic
          scrub: 7, // smooth catch-up after fast scroll


        },
      })
    }, containerRef)

    return () => {
      ctx.revert()
      lenis.destroy()
    }
  }, [])
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <section id="menu" ref={ref} className="relative bg-black">
      {/* Diverse Cuisine Section */}
      <div ref={containerRef} className="diverse-cuisine-section py-24 border-b border-border/20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-20 text-center"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
              Diverse Cuisine
            </h2>
            <p className="text-foreground/60 font-serif text-lg max-w-2xl mx-auto">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {diverseCuisineDishes.map((dish, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative text-center flex flex-col items-center"
              >
                <div className="mb-6 overflow-hidden rounded-lg relative w-full max-w-xs h-78 sm:h-96 md:h-84 flex items-center justify-center">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    width={200}
                    height={200}
                    className="diverse-dish-image w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-white mb-2">
                  {dish.name}
                </h3>
                <p className="text-foreground/70 text-sm font-serif">
                  {dish.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Signature Dishes Section */}
      <div className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
              Signature Dishes
            </h2>
            <p className="text-foreground/60 font-serif text-lg">
              Curated creations from our kitchen
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {dishes.map((dish, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative bg-card border border-border rounded-lg p-8 overflow-hidden"
              >
                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* Dish Image */}
                  <div className="h-40 sm:h-48 md:h-56 rounded-lg mb-6 overflow-hidden relative">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-serif font-semibold text-white mb-3">
                    {dish.name}
                  </h3>
                  <p className="text-foreground/70 text-sm mb-6 leading-relaxed font-serif">
                    {dish.description}
                  </p>

                  {/* Price and Hover Action */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-display font-bold text-accent">
                      {dish.price}
                    </span>
                    <motion.button
                      whileHover={{ x: 4 }}
                      className="text-accent text-sm tracking-widest group-hover:opacity-100 opacity-0 transition-opacity"
                    >
                      LEARN MORE →
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
