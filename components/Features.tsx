"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const FEATURES = [
  {
    number: "01",
    title: "Crystal-clear video, always.",
    spec: "1080p · AI noise cancel",
    body: "Adaptive HD video that stays sharp on any connection. AI noise cancellation removes background sound before it reaches your teammates.",
  },
  {
    number: "02",
    title: "Zero-knowledge encrypted.",
    spec: "256-bit AES",
    body: "End-to-end encryption on every meeting, by default. We cannot see your calls. Your data never leaves your control.",
  },
  {
    number: "03",
    title: "Share anything. Instantly.",
    spec: "Screen · Window · Tab",
    body: "Share your full screen, a specific window, or a single browser tab. Real-time annotation is built in — no plugins, no extensions.",
  },
  {
    number: "04",
    title: "Works in any browser.",
    spec: "No downloads. Ever.",
    body: "Click a link. Join a meeting. Zero plugins, zero setup. Your clients, guests, and executives can join in under five seconds.",
  },
  {
    number: "05",
    title: "Persistent team messaging.",
    spec: "Context lives on",
    body: "Chat, reactions, threads, and file sharing that outlive the meeting. Your conversation history never disappears when the call ends.",
  },
  {
    number: "06",
    title: "Built for real scale.",
    spec: "< 50ms · 100 participants",
    body: "Sub-50 millisecond latency. Up to 100 participants on any plan. No enterprise contract needed to run your company all-hands.",
  },
];

/* Mouse-follow spotlight row */
function FeatureRow({
  number,
  title,
  spec,
  body,
  index,
  isLast,
}: (typeof FEATURES)[0] & { index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "200px" });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, visible: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      visible: true,
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setSpotlight((p) => ({ ...p, visible: false }))}
      style={{
        display: "grid",
        gridTemplateColumns: "60px 1fr auto",
        alignItems: "start",
        gap: "0 32px",
        padding: "36px 0",
        borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        cursor: "default",
        overflow: "hidden",
        transition: "background 0.2s ease",
      }}
    >
      {/* Spotlight overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: spotlight.visible
            ? `radial-gradient(350px circle at ${spotlight.x}% ${spotlight.y}%, rgba(34,197,94,0.04) 0%, transparent 70%)`
            : "transparent",
          transition: spotlight.visible ? "none" : "background 0.4s ease",
          zIndex: 0,
        }}
      />

      {/* Hover left accent line */}
      <motion.div
        animate={{ scaleY: spotlight.visible ? 1 : 0, opacity: spotlight.visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 2,
          background: "linear-gradient(180deg, rgba(34,197,94,0.6), rgba(34,197,94,0))",
          transformOrigin: "top",
        }}
      />

      {/* Number */}
      <div
        className="font-display"
        style={{
          fontSize: "0.7rem",
          fontWeight: 700,
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.08em",
          paddingTop: 3,
          position: "relative",
          zIndex: 1,
        }}
      >
        {number}
      </div>

      {/* Text */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <h3
          className="font-display"
          style={{
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "var(--text-100)",
            letterSpacing: "-0.03em",
            marginBottom: 10,
            lineHeight: 1.3,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--text-300)",
            lineHeight: 1.75,
            maxWidth: 560,
          }}
        >
          {body}
        </p>
      </div>

      {/* Spec — right side, monospace, subtle */}
      <div
        style={{
          fontFamily: "ui-monospace, 'Cascadia Code', monospace",
          fontSize: "0.72rem",
          color: "rgba(34,197,94,0.5)",
          letterSpacing: "0.04em",
          textAlign: "right",
          whiteSpace: "nowrap",
          paddingTop: 3,
          position: "relative",
          zIndex: 1,
          lineHeight: 1.6,
        }}
      >
        {spec.split(" · ").map((s, i) => (
          <div key={i}>{s}</div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Features() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "200px" });

  return (
    <section id="features" style={{ padding: "100px 24px" }}>
      <div className="container">
        {/* Top divider with label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 72,
          }}
        >
          <span
            style={{
              fontFamily: "ui-monospace, 'Cascadia Code', monospace",
              fontSize: "0.68rem",
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Platform capabilities
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
        </div>

        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 64 }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: 900,
              letterSpacing: "-0.05em",
              lineHeight: 1.05,
              color: "var(--text-100)",
              maxWidth: 640,
            }}
          >
            Everything your team
            <br />
            needs to do great work.
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--text-400)",
              marginTop: 18,
              maxWidth: 480,
              lineHeight: 1.75,
            }}
          >
            Purpose-built for remote teams that care about the quality of their communication, not just the quantity of their meetings.
          </p>
        </motion.div>

        {/* Feature rows */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {FEATURES.map((f, i) => (
            <FeatureRow
              key={f.number}
              {...f}
              index={i}
              isLast={i === FEATURES.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
