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

export default function Home() {
    useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      duration: 1.2,
    })
     return () => {
      lenis.destroy()
    }
  }, [])
  
    const [isIntroComplete, setIsIntroComplete] = useState(false);

    return (
        <main>
            <IntroAnimation onComplete={() => setIsIntroComplete(true)} />
                 <FloatingLogo />
                    <Navigation />

                     {/* Hero Section - Full viewport cinematic intro */}
      {isIntroComplete && <HeroSection isLoadingComplete={isIntroComplete} />}

      {/* About Section - Editorial layout with story */}
      {isIntroComplete && <AboutSection />}

      {/* Menu Section - Signature dishes grid */}
      {isIntroComplete && <MenuSection />}
        
      {/* Chef's Philosophy - Portrait and quote */}
      {isIntroComplete && <ChefSection />}

      {/* Dining Experience - Immersive imagery and parallax */}
      {isIntroComplete && <DiningExperienceSection />}

      {/* Testimonials - Elegant carousel */}
      {isIntroComplete && <TestimonialsSection />}

      {/* Reservation CTA - High contrast call to action */}
      {isIntroComplete && <ReservationSection />}
      {/* Location & Footer - Map, hours, contact info */}
      {isIntroComplete && <LocationFooter />}
        
      {/* Scroll to Top Button */}
      <ScrollToTop />

        </main>
    );
}
