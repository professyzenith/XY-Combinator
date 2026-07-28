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
            background: "#e4e4e9",   /* silver — matches page bg */
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Radial ambient light */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: phase === "reveal" ? 1 : 0, scale: phase === "reveal" ? 1 : 0.5 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              width: 600,
              height: 600,
              borderRadius: "50%",
              /* Subtle sage bloom — very light */
              background: "radial-gradient(circle, rgba(74,144,112,0.06) 0%, transparent 70%)",
              filter: "blur(40px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* Premium Mesh Gradient / Aurora Background */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: "-30%", y: "-20%" }}
              animate={{
                opacity: phase === "reveal" ? 0.6 : 0,
                scale: phase === "reveal" ? 1.5 : 0.8,
                x: phase === "reveal" ? "10%" : "-30%",
                y: phase === "reveal" ? "10%" : "-20%"
              }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              style={{
                position: "absolute", width: "80vw", height: "80vw", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(74,144,112,0.15) 0%, transparent 60%)",
                filter: "blur(80px)",
                mixBlendMode: "multiply"
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: "30%", y: "20%" }}
              animate={{
                opacity: phase === "reveal" ? 0.5 : 0,
                scale: phase === "reveal" ? 1.8 : 0.8,
                x: phase === "reveal" ? "-10%" : "30%",
                y: phase === "reveal" ? "-10%" : "20%"
              }}
              transition={{ duration: 2.5, ease: "easeOut", delay: 0.2 }}
              style={{
                position: "absolute", width: "70vw", height: "70vw", borderRadius: "50%", right: 0, bottom: 0,
                background: "radial-gradient(circle, rgba(122,94,168,0.1) 0%, transparent 60%)",
                filter: "blur(80px)",
                mixBlendMode: "multiply"
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: "40%" }}
              animate={{
                opacity: phase === "reveal" ? 0.7 : 0,
                scale: phase === "reveal" ? 2 : 0.8,
                y: phase === "reveal" ? "-10%" : "40%"
              }}
              transition={{ duration: 2.5, ease: "easeOut", delay: 0.1 }}
              style={{
                position: "absolute", width: "100vw", height: "50vw", borderRadius: "50%", left: "50%", bottom: "-20%",
                transform: "translateX(-50%)",
                background: "radial-gradient(ellipse, rgba(74,120,168,0.12) 0%, transparent 60%)",
                filter: "blur(80px)",
                mixBlendMode: "multiply"
              }}
            />
          </div>

          <div style={{ textAlign: "center", position: "relative", zIndex: 10 }}>
            {/* XY mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: phase === "reveal" ? 1 : 0, scale: phase === "reveal" ? 1 : 0.7 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: "#4a9070",   /* deeper sage — readable */
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                boxShadow: "0 0 0 1px rgba(74,144,112,0.2), 0 8px 24px rgba(0,0,0,0.14)",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: "1.2rem",
                color: "#ffffff",
                letterSpacing: "-0.04em",
              }}
            >
              XY
            </motion.div>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: phase === "reveal" ? 1 : 0, y: phase === "reveal" ? 0 : 8 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "rgba(29,29,31,0.5)",   /* dark on light */
                letterSpacing: "-0.02em",
              }}
            >
              Combinator
            </motion.div>

            {/* Thin progress line */}
            <div style={{ marginTop: 32, width: 120, height: 1, background: "rgba(0,0,0,0.1)", borderRadius: 99, overflow: "hidden", margin: "32px auto 0" }}>
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: phase === "reveal" ? "100%" : "0%" }}
                transition={{ duration: 1.4, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                style={{ height: "100%", background: "#4a9070", borderRadius: 99 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
