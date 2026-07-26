"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  const isHovering = useRef(false);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const enterHover = () => {
      isHovering.current = true;
      if (ringRef.current) {
        ringRef.current.style.transform = "translate(-50%, -50%) scale(2.2)";
        ringRef.current.style.opacity = "0.5";
        ringRef.current.style.borderColor = "#22c55e";
      }
    };

    const leaveHover = () => {
      isHovering.current = false;
      if (ringRef.current) {
        ringRef.current.style.transform = "translate(-50%, -50%) scale(1)";
        ringRef.current.style.opacity = "1";
        ringRef.current.style.borderColor = "rgba(255,255,255,0.5)";
      }
    };

    const interactables = document.querySelectorAll("a, button, [role='button'], input, .card");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", enterHover);
      el.addEventListener("mouseleave", leaveHover);
    });

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", enterHover);
        el.removeEventListener("mouseleave", leaveHover);
      });
    };
  }, [cursorX, cursorY, dotX, dotY]);

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: springX,
          y: springY,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.5)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 99999,
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease, border-color 0.3s ease",
          mixBlendMode: "difference",
        }}
      />
      {/* Dot */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "#fff",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 99999,
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
