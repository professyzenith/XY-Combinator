"use client";

import { motion } from "framer-motion";

const ITEMS = [
  "· HD Video", "· E2E Encrypted", "· AI Noise Removal",
  "· < 2s Join", "· Zero Downloads", "· Screen Share",
  "· Persistent Chat", "· All Browsers", "· Adaptive Bitrate",
  "· 1080p Quality", "· Real-time Captions", "· File Sharing",
  "· HD Video", "· E2E Encrypted", "· AI Noise Removal",
  "· < 2s Join", "· Zero Downloads", "· Screen Share",
  "· Persistent Chat", "· All Browsers", "· Adaptive Bitrate",
  "· 1080p Quality", "· Real-time Captions", "· File Sharing",
];

/* Boosted opacity — visible on silver-grey #e4e4e9 */
const COLORS = [
  "rgba(29,29,31,0.52)",
  "rgba(74,144,112,0.90)",   /* sage accent */
  "rgba(29,29,31,0.45)",
  "rgba(29,29,31,0.52)",
  "rgba(74,144,112,0.75)",   /* sage dim */
  "rgba(29,29,31,0.48)",
  "rgba(29,29,31,0.40)",
  "rgba(74,144,112,0.65)",
  "rgba(29,29,31,0.50)",
  "rgba(29,29,31,0.55)",
  "rgba(74,144,112,0.60)",
  "rgba(29,29,31,0.45)",
];

export default function MarqueeSection() {
  return (
    <div style={{
      borderTop: "1px solid rgba(0,0,0,0.10)",
      borderBottom: "1px solid rgba(0,0,0,0.10)",
      overflow: "hidden",
      position: "relative",
      background: "rgba(0,0,0,0.018)",  /* very slight dark tint so text pops */
    }}>
      {/* Edge fades */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(90deg, var(--surface-base) 0%, transparent 12%, transparent 88%, var(--surface-base) 100%)",
        zIndex: 1,
      }} />

      <div style={{ padding: "16px 0", overflow: "hidden" }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 38, ease: "linear", repeat: Infinity }}
          style={{ display: "flex", gap: 0, width: "max-content", willChange: "transform" }}
        >
          {ITEMS.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 0, padding: "0 24px", whiteSpace: "nowrap" }}>
              <span style={{
                fontSize: "0.74rem",
                fontFamily: "var(--font-mono)",
                color: COLORS[i % COLORS.length],
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}>
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
