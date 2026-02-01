'use client'


import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [isFinished, setIsFinished] = useState(false);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isFinished && (
        <motion.div
          key="intro-screen"
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* LOGO */}
          <motion.div
            className="text-4xl md:text-6xl font-serif text-white tracking-[0.3em] font-light mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            AURORA
          </motion.div>

          {/* LOADING BAR */}
          <div className="w-48 h-[1px] bg-white/10 overflow-hidden relative">
            <motion.div
              className="absolute inset-y-0 left-0 bg-white/60"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ 
                duration: 2.5, 
                ease: [0.45, 0, 0.55, 1],
                delay: 0.5 
              }}
              onAnimationComplete={() => setIsFinished(true)}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
