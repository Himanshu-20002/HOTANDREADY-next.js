'use client'
import { motion, useScroll, useTransform } from "framer-motion";

export function FloatingLogo() {
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 120], [0, -14]);
  const scale = useTransform(scrollY, [0, 120], [1, 0.85]);
  const textShadow = useTransform(
    scrollY,
    [0, 120],
    [
      "0 0 0 rgba(255,255,255,0)",
      "0 0 14px rgba(255,255,255,0.4)",
    ]
  );

  return (
    <motion.div
      layoutId="brand-logo"
      style={{ y, scale, textShadow }}
      className="
        fixed
        top-6
        left-1/2
        -translate-x-1/2
        z-[60]
        text-2xl
        font-serif
        tracking-[0.2em]
        text-white
        mix-blend-difference
        pointer-events-none
        will-change-transform
      "
    >
      AURORA
    </motion.div>
  );
}
