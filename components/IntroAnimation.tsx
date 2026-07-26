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
            background: "#060810",
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
              background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)",
              filter: "blur(40px)",
              pointerEvents: "none",
            }}
          />

          <div style={{ textAlign: "center", position: "relative" }}>
            {/* XY mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: phase === "reveal" ? 1 : 0, scale: phase === "reveal" ? 1 : 0.7 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                boxShadow: "0 0 0 1px rgba(34,197,94,0.3), 0 0 40px rgba(34,197,94,0.2)",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: "1.2rem",
                color: "#fff",
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
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "-0.02em",
              }}
            >
              Combinator
            </motion.div>

            {/* Thin progress line */}
            <div style={{ marginTop: 32, width: 120, height: 1, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden", margin: "32px auto 0" }}>
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: phase === "reveal" ? "100%" : "0%" }}
                transition={{ duration: 1.4, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                style={{ height: "100%", background: "linear-gradient(90deg, rgba(34,197,94,0.3), rgba(34,197,94,0.8))", borderRadius: 99 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
