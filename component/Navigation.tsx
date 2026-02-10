'use client'

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const handleNavClick = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: "About", id: "about" },
    { label: "Menu", id: "menu" },
    { label: "Reviews", id: "reviews" },
    { label: "Reservations", id: "reservations" },
  ];

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
        {/* Desktop nav - hidden on mobile */}
        <nav className="hidden md:flex items-center gap-8 w-1/3">
          {["About", "Menu"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.toLowerCase());
              }}
              className="text-[10px] uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Center spacer (logo lives elsewhere) */}
        <div className="hidden md:block w-1/3" />

        {/* Desktop right nav - hidden on mobile */}
        <nav className="hidden md:flex items-center justify-end gap-8 w-1/3">
          {["Reviews", "Reservations"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.toLowerCase());
              }}
              className="text-[10px] uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger button - visible only on mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center -my-3 justify-center w-10 h-10 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/10"
        >
          <nav className="flex flex-col items-start p-6 gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-sm uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors w-full text-left"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}