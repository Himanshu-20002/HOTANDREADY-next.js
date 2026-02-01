'use client'

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navigation() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
        isScrolled
          ? "bg-black/80 backdrop-blur-md py-4"
          : "bg-transparent py-8",
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 1 }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Left nav */}
        <nav className="flex items-center gap-8 w-1/3">
          {["About", "Menu"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(item.toLowerCase())
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-[10px] uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Center spacer (logo lives elsewhere) */}
        <div className="w-1/3" />

        {/* Right nav */}
        <nav className="flex items-center justify-end gap-8 w-1/3">
          {["Reviews", "Reservations"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(item.toLowerCase())
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-[10px] uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
