"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background: "var(--accent)",
        transformOrigin: "0%",
        scaleX,
        zIndex: "var(--z-cursor)",
        opacity: 0.8,
        boxShadow: "0 0 6px var(--accent-glow)",
      }}
    />
  );
}
