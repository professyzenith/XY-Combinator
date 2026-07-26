"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── One massive statement per feature ─── */
const FEATURES = [
  {
    index: "01",
    statement: "Crystal-clear video. Always.",
    detail:
      "1080p with adaptive bitrate. AI noise cancellation removes background sound before it reaches your teammates. Every call feels like the same room.",
    metric: "1080p",
    color: "#22c55e",
  },
  {
    index: "02",
    statement: "No account. No download. Ever.",
    detail:
      "Send a link. They click. They're in. Your clients, investors, and guests join instantly — no friction, no install, no IT ticket required.",
    metric: "< 5s to join",
    color: "#3b82f6",
  },
  {
    index: "03",
    statement: "End-to-end encrypted. Always.",
    detail:
      "Zero-knowledge 256-bit AES encryption on every meeting. We cannot read your calls. Neither can anyone else. Architecture, not policy.",
    metric: "256-bit AES",
    color: "#a855f7",
  },
  {
    index: "04",
    statement: "Context that outlives the call.",
    detail:
      "Persistent chat, reactions, and shared files that live after the meeting ends. Your team's work doesn't disappear when you hang up.",
    metric: "Forever",
    color: "#f59e0b",
  },
];

function FeatureStatement({
  index,
  statement,
  detail,
  metric,
  color,
  i,
}: (typeof FEATURES)[0] & { i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "200px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      style={{
        display: "grid",
        gridTemplateColumns: "80px 1fr",
        gap: "0 40px",
        padding: "52px 0",
        borderBottom: i < FEATURES.length - 1 ? "1px solid rgba(255,255,255,0.055)" : "none",
        position: "relative",
        cursor: "default",
      }}
    >
      {/* Left: number column */}
      <div style={{ paddingTop: 6 }}>
        <div
          style={{
            fontFamily: "ui-monospace, monospace",
            fontSize: "0.68rem",
            color: "rgba(255,255,255,0.18)",
            letterSpacing: "0.1em",
          }}
        >
          {index}
        </div>
      </div>

      {/* Right: content */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "0 60px",
          alignItems: "start",
        }}
      >
        {/* Text */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 1.1,
              color: "#f0f4ff",
              marginBottom: 18,
            }}
          >
            {statement}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "0.925rem",
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1.8,
              maxWidth: 560,
              letterSpacing: "-0.005em",
            }}
          >
            {detail}
          </motion.p>
        </div>

        {/* Metric — right column */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ textAlign: "right", paddingTop: 4 }}
        >
          <div
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: "0.75rem",
              color: color,
              opacity: 0.6,
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
            }}
          >
            {metric}
          </div>
        </motion.div>
      </div>

      {/* Hover glow — left edge */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        whileHover={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 2,
          background: `linear-gradient(180deg, ${color}60, transparent)`,
          transformOrigin: "top",
          pointerEvents: "none",
        }}
      />
    </motion.div>
  );
}

export default function Features() {
  const labelRef = useRef<HTMLDivElement>(null);
  const labelInView = useInView(labelRef, { once: true, margin: "200px" });

  return (
    <section id="features" style={{ padding: "120px 40px" }}>
      <div className="container">
        {/* Section label */}
        <motion.div
          ref={labelRef}
          initial={{ opacity: 0 }}
          animate={labelInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 80,
          }}
        >
          <span className="section-label">Platform</span>
          <div
            style={{
              flex: 1,
              height: 1,
              background: "rgba(255,255,255,0.06)",
            }}
          />
        </motion.div>

        {/* Giant section headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={labelInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 80 }}
        >
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              fontWeight: 900,
              letterSpacing: "-0.06em",
              lineHeight: 1.0,
              color: "#f0f4ff",
              maxWidth: 720,
            }}
          >
            Everything your team
            <br />
            needs.{" "}
            <span style={{ color: "rgba(255,255,255,0.2)" }}>Nothing it doesn&apos;t.</span>
          </h2>
        </motion.div>

        {/* Feature statements */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.055)" }}>
          {FEATURES.map((f, i) => (
            <FeatureStatement key={f.index} {...f} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
