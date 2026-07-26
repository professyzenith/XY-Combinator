"use client";

import { motion } from "framer-motion";

const ITEMS = [
  "· HD Video", "· E2E Encrypted", "· AI Noise Removal",
  "· < 2s Join", "· Zero Downloads", "· Screen Share",
  "· Persistent Chat", "· All Browsers", "· Adaptive Bitrate",
  "· 1080p Quality", "· Real-time Reactions", "· File Sharing",
  "· HD Video", "· E2E Encrypted", "· AI Noise Removal",
  "· < 2s Join", "· Zero Downloads", "· Screen Share",
  "· Persistent Chat", "· All Browsers", "· Adaptive Bitrate",
  "· 1080p Quality", "· Real-time Reactions", "· File Sharing",
];

const COLORS = [
  "#22c55e", "#3b82f6", "#a855f7", "#f59e0b",
  "#ec4899", "#14b8a6", "#22c55e", "#3b82f6",
  "#a855f7", "#f59e0b", "#ec4899", "#14b8a6",
];

export default function MarqueeSection() {
  return (
    <div
      style={{
        padding: "0 0",
        borderTop: "1px solid rgba(255,255,255,0.055)",
        borderBottom: "1px solid rgba(255,255,255,0.055)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Edge fade masks */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(90deg, #060810 0%, transparent 8%, transparent 92%, #060810 100%)",
        zIndex: 1,
      }} />

      <div style={{ padding: "18px 0", overflow: "hidden" }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          style={{
            display: "flex",
            gap: 0,
            width: "max-content",
            willChange: "transform",
          }}
        >
          {ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 0,
                padding: "0 20px",
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  fontFamily: "ui-monospace, monospace",
                  color: COLORS[i % COLORS.length],
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  opacity: 0.7,
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
