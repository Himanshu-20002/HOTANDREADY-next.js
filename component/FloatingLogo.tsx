'use client'
import { useRef, useEffect } from "react";

export function FloatingLogo() {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!logoRef.current) return;
      const scroll = window.scrollY;
      const progress = Math.min(scroll / 120, 1);
      
      const y = progress * -14;
      const scale = 1 - (progress * 0.15);
      const blur = progress * 14;
      
      logoRef.current.style.transform = `translate3d(-50%, ${y}px, 0) scale(${scale})`;
      logoRef.current.style.textShadow = `0 0 ${blur}px rgba(255,255,255,0.4)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={logoRef}
      className="
        fixed
        top-4 md:top-6
        left-1/2
        z-[60]
        text-xl md:text-2xl
        font-serif
        tracking-[0.2em]
        text-white
        pointer-events-none
        will-change-transform
      "
      style={{ transform: 'translate3d(-50%, 0, 0)' }}
    >
      AURORA
    </div>
  );
}
