'use client'

import { IntroAnimation } from "@/component/IntroAnimation";


import { Navigation } from "./Navigation";
import { FloatingLogo } from "./FloatingLogo";
import { useEffect, useState } from "react";
import { AboutSection } from "./HomeComponent/AboutSection";
import { MenuSection } from "./HomeComponent/MenuSection";
import { ChefSection } from "./HomeComponent/ChefSection";

import { DiningExperienceSection } from "./HomeComponent/DiningExperienceSection";
import { TestimonialsSection } from "./HomeComponent/TestimonialsSection";
import { ReservationSection } from "./HomeComponent/ReservationSection";
import { LocationFooter } from "./HomeComponent/LocationFooter";
import { ScrollToTop } from "./HomeComponent/ScrollToTop";
import { HeroSection } from "./HomeComponent/HeroSection";
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      smoothTouch: true,
      touchMultiplier: 1.5,
      infinite: false,
    })

    // GSAP Ticker Integration
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update)
    
    // GSAP global settings
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  useEffect(() => {
    if (isIntroComplete) {
      ScrollTrigger.refresh()
    }
  }, [isIntroComplete])

  return (
    <main>
      <IntroAnimation onComplete={() => setIsIntroComplete(true)} />
      <FloatingLogo />
      <Navigation />

      {/* Hero Section - Full viewport cinematic intro */}
      {isIntroComplete && <div className="section-animate"><HeroSection isLoadingComplete={isIntroComplete} /></div>}

      {/* About Section - Editorial layout with story */}
      {isIntroComplete && <div className="section-animate"><AboutSection /></div>}

      {/* Menu Section - Signature dishes grid */}
      {isIntroComplete && <div className="section-animate"><MenuSection /></div>}

      {/* Chef's Philosophy - Portrait and quote */}
      {isIntroComplete && <div className="section-animate"><ChefSection /></div>}

      {/* Dining Experience - Immersive imagery and parallax */}
      {isIntroComplete && <div className="section-animate"><DiningExperienceSection /></div>}

      {/* Testimonials - Elegant carousel */}
      {isIntroComplete && <div className="section-animate"><TestimonialsSection /></div>}

      {/* Reservation CTA - High contrast call to action */}
      {isIntroComplete && <div className="section-animate"><ReservationSection /></div>}
      
      {/* Location & Footer - Map, hours, contact info */}
      {isIntroComplete && <div className="section-animate"><LocationFooter /></div>}

      {/* Scroll to Top Button */}
      <ScrollToTop />

    </main>
  );
}
