"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"init" | "reveal" | "exit">("init");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 200);
    const t2 = setTimeout(() => setPhase("exit"), 1800);
    const t3 = setTimeout(() => onComplete(), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            /* Extremely cool, deep rich dark gradient */
            background: "linear-gradient(135deg, #050505 0%, #0a0f12 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Subtle slow-moving dark grid pattern */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "reveal" ? 0.3 : 0 }}
            transition={{ duration: 1.5 }}
            style={{
              position: "absolute", inset: -100, pointerEvents: "none", zIndex: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), " +
                "linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              transform: "perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)",
            }}
          />

          {/* Deep ambient glow in the center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: phase === "reveal" ? 1 : 0, scale: phase === "reveal" ? 1 : 0.5 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              width: 800,
              height: 800,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(74,144,112,0.08) 0%, transparent 60%)",
              filter: "blur(60px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          <div style={{ textAlign: "center", position: "relative", zIndex: 10 }}>
            {/* XY mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: phase === "reveal" ? 1 : 0, scale: phase === "reveal" ? 1 : 0.7 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                /* Dark frosted glass look for the logo box */
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(74,144,112,0.2) inset",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: "1.4rem",
                color: "#ffffff",
                letterSpacing: "-0.04em",
              }}
            >
              XR
            </motion.div>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: phase === "reveal" ? 1 : 0, y: phase === "reveal" ? 0 : 8 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "1.4rem",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              XyncRoom
            </motion.div>

            {/* Glowing progress line */}
            <div style={{ marginTop: 40, width: 140, height: 2, background: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden", margin: "40px auto 0", position: "relative" }}>
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: phase === "reveal" ? "100%" : "0%" }}
                transition={{ duration: 1.4, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                style={{ 
                  height: "100%", 
                  background: "#4a9070", 
                  borderRadius: 99,
                  boxShadow: "0 0 10px rgba(74,144,112,0.8)"
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
