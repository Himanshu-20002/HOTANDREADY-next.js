'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion'
import Image from 'next/image'

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import CurvedLoop from '../../components/CurvedLoop';
gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  isLoadingComplete: boolean
}

export function HeroSection({ isLoadingComplete }: HeroSectionProps) {
  const { scrollY } = useScroll()
  const scale = useTransform(scrollY, [0, 500], [1, 0.85])
  const opacity = useTransform(scrollY, [0, 400], [1, 0.6])
  const y = useTransform(scrollY, [0, 500], [0, 100])
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.to('.hero-image', {
        rotation: 260,
        scrollTrigger: {
          trigger: '.hero-image',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,

        },
        ease: 'none',
      })
      gsap.to('.hero-image2', {
        rotation: -360,
        scrollTrigger: {
          trigger: '.hero-image2',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,

        },
        ease: 'none',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-black py-20"
    >

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%), url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 800%22%3E%3Crect fill=%22%23111%22 width=%221200%22 height=%22800%22/%3E%3Cdefs%3E%3ClinearGradient id=%22grad%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:%23222;stop-opacity:1%22 /%3E%3Cstop offset=%22100%25%22 style=%22stop-color:%23000;stop-opacity:1%22 /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill=%22url(%23grad)%22 width=%221200%22 height=%22800%22/%3E%3C/svg%3E")',
          }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 md:opacity-70">
        <CurvedLoop
          marqueeText="Diverse ✦  Cuisine ✦ With ✦ Signature  ✦ Chef ✦"
          speed={1}
          curveAmount={500}
          direction="right"
          className="custom-text-style"
        />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden ">
        <motion.div
          style={{ y: useTransform(scrollY, [0, 500], [0, -100]) }}
          className="absolute top-[15%] left-[10%]"
        >
          <Image alt='dish3' src='/assets/Remove-bg-3.png' width={200} height={160} className="hero-image2 w-32 md:w-48 lg:w-64" />
        </motion.div>
        <motion.div
          style={{ y: useTransform(scrollY, [0, 500], [0, -140]) }}
          className="absolute bottom-[20%] right-[10%]"
        >
          <Image alt='dish4' src='/assets/Remove-bg-4.png' width={120} height={80} className="hero-image2 w-24 md:w-32 lg:w-40" />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        ref={containerRef}
        style={{ scale, y }}
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-4 sm:mb-6 tracking-tight"
        >
          Where Flavor <br /> Becomes Art
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/50 font-serif leading-relaxed max-w-xl mx-auto mb-10"
        >
          An immersive culinary journey through innovation and tradition
        </motion.p>

        <div className="flex flex-col items-center gap-6">
          <Image alt='dish1' src='/assets/Remove-bg-1.png' width={250} height={80} priority className="hero-image w-48 sm:w-64 md:w-80" />
          <Image alt='dish2' src='/assets/Remove-bg-2.png' width={120} height={40} priority className="hero-image2 w-24 sm:w-32 md:w-40 -mt-6" />
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.6 }}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xl text-accent animate-bounce">↓</span>
          <span className="text-[10px] text-foreground/40 tracking-[0.3em] uppercase">SCROLL</span>
        </motion.div>
      </motion.div>
    </motion.section>


  )
}
