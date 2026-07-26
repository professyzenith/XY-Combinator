"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Animated waveform for the video card ─── */
function MiniWaveform({ color }: { color: string }) {
  const bars = [40, 65, 90, 55, 75, 45, 80, 60, 95, 50, 70, 85, 40, 65, 75];
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 48 }}>
      {bars.map((h, i) => (
        <motion.div
          key={i}
          animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.55}%`, `${h * 0.8}%`, `${h * 0.4}%`] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
          style={{ width: 4, borderRadius: 3, background: color, opacity: 0.6 }}
        />
      ))}
    </div>
  );
}

/* ─── Animated lock icon ─── */
function AnimatedLock() {
  return (
    <motion.div
      animate={{ rotate: [0, -5, 5, -3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "relative", width: 52, height: 52 }}
    >
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <motion.rect
          x="8" y="22" width="36" height="24" rx="6"
          fill="rgba(168,85,247,0.2)"
          stroke="rgba(168,85,247,0.6)"
          strokeWidth="1.5"
          animate={{ stroke: ["rgba(168,85,247,0.6)", "rgba(168,85,247,1)", "rgba(168,85,247,0.6)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path
          d="M16 22V18C16 12.477 20.477 8 26 8C31.523 8 36 12.477 36 18V22"
          stroke="rgba(168,85,247,0.6)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          animate={{ stroke: ["rgba(168,85,247,0.6)", "rgba(168,85,247,1)", "rgba(168,85,247,0.6)"] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        />
        <motion.circle
          cx="26" cy="33" r="3"
          fill="rgba(168,85,247,0.8)"
          animate={{ fill: ["rgba(168,85,247,0.8)", "rgba(168,85,247,1)", "rgba(168,85,247,0.8)"] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </svg>
    </motion.div>
  );
}

/* ─── Animated join link ─── */
function AnimatedLink() {
  return (
    <div style={{ fontFamily: "ui-monospace, monospace" }}>
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          fontSize: "0.72rem",
          color: "rgba(34,197,94,0.9)",
          background: "rgba(34,197,94,0.08)",
          border: "1px solid rgba(34,197,94,0.2)",
          borderRadius: 7,
          padding: "6px 12px",
          display: "inline-block",
          letterSpacing: "0.01em",
        }}
      >
        xy.app/your-team
      </motion.div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: ["0%", "100%", "0%"] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        style={{
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.6), transparent)",
          marginTop: 8,
        }}
      />
    </div>
  );
}

/* ─── Chat messages preview ─── */
function ChatPreview() {
  const messages = [
    { text: "Call was great 🔥", from: "A", color: "#3b82f6" },
    { text: "Syncing the doc now", from: "M", color: "#a855f7" },
    { text: "Ship it today 🚀", from: "Z", color: "#22c55e" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {messages.map((msg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.8, duration: 0.5, repeat: Infinity, repeatDelay: 2.4 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div style={{
            width: 26, height: 26, borderRadius: "50%",
            background: `${msg.color}22`,
            border: `1px solid ${msg.color}40`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.6rem", fontWeight: 700, color: msg.color,
            fontFamily: "'Outfit', sans-serif",
            flexShrink: 0,
          }}>
            {msg.from}
          </div>
          <div style={{
            fontSize: "0.78rem",
            color: "rgba(255,255,255,0.55)",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 8,
            padding: "5px 10px",
          }}>
            {msg.text}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Bento Card ─── */
function BentoCard({
  children,
  accentColor,
  title,
  desc,
  metric,
  metricLabel,
  wide = false,
  i,
}: {
  children: React.ReactNode;
  accentColor: string;
  title: string;
  desc: string;
  metric: string;
  metricLabel: string;
  wide?: boolean;
  i: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -4, borderColor: `${accentColor}40` }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        gridColumn: wide ? "span 2" : "span 1",
        borderRadius: 18,
        border: `1px solid rgba(255,255,255,0.07)`,
        background: `linear-gradient(140deg, ${accentColor}06 0%, rgba(6,8,16,0.8) 60%)`,
        padding: "28px 28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        overflow: "hidden",
        position: "relative",
        cursor: "default",
        backdropFilter: "blur(12px)",
        transition: "border-color 0.3s ease, transform 0.3s ease",
      }}
    >
      {/* Corner glow */}
      <div style={{
        position: "absolute",
        top: 0, right: 0,
        width: 120, height: 120,
        background: `radial-gradient(circle at 100% 0%, ${accentColor}12, transparent 60%)`,
        pointerEvents: "none",
      }} />

      {/* Visual area */}
      <div style={{ flex: 1, minHeight: 72, display: "flex", alignItems: "center" }}>
        {children}
      </div>

      {/* Text */}
      <div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 8 }}>
          <h3 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "1.15rem",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: "#f0f4ff",
          }}>
            {title}
          </h3>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.9rem", fontWeight: 700, color: accentColor, letterSpacing: "-0.02em" }}>
              {metric}
            </div>
            <div style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.55rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {metricLabel}
            </div>
          </div>
        </div>
        <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.32)", lineHeight: 1.65, letterSpacing: "-0.005em" }}>
          {desc}
        </p>
      </div>

      {/* Bottom accent line */}
      <div style={{ height: 1, background: `linear-gradient(90deg, ${accentColor}30, transparent)` }} />
    </motion.div>
  );
}

/* ─── Bento Features Section ─── */
export default function BentoFeatures() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "100px" });

  return (
    <section id="features" style={{ padding: "100px 40px 120px" }}>
      <div className="container">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 56 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <span className="section-label">What you get</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
          </div>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 900,
            letterSpacing: "-0.06em",
            lineHeight: 1.0,
            color: "#f0f4ff",
            maxWidth: 600,
          }}>
            Everything in one
            <br />
            <span style={{ background: "linear-gradient(135deg, #3b82f6 0%, #a855f7 60%, #ec4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              seamless experience.
            </span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, gridAutoRows: "auto" }}>

          {/* 1: HD Video — wide */}
          <BentoCard
            accentColor="#3b82f6"
            title="Crystal-clear video"
            desc="1080p HD with adaptive bitrate. AI background noise removal. Every call sounds studio-quality."
            metric="1080p"
            metricLabel="HD Quality"
            wide={true}
            i={0}
          >
            <MiniWaveform color="#3b82f6" />
          </BentoCard>

          {/* 2: Security */}
          <BentoCard
            accentColor="#a855f7"
            title="End-to-end encrypted"
            desc="256-bit AES on every call. Zero-knowledge architecture. We cannot read your meetings."
            metric="256-bit"
            metricLabel="AES Encrypted"
            i={1}
          >
            <AnimatedLock />
          </BentoCard>

          {/* 3: Instant Join */}
          <BentoCard
            accentColor="#22c55e"
            title="Instant join"
            desc="No downloads. No installs. Share a link. Everyone is in under two seconds."
            metric="< 2s"
            metricLabel="Join time"
            i={2}
          >
            <AnimatedLink />
          </BentoCard>

          {/* 4: Screen Share */}
          <BentoCard
            accentColor="#f59e0b"
            title="One-click sharing"
            desc="Share your screen, a tab, or an app window. Annotate in real-time. No plugins."
            metric="1-click"
            metricLabel="Screen share"
            i={3}
          >
            <div style={{ display: "flex", gap: 6 }}>
              {["#f59e0b", "#f59e0b60", "#f59e0b30"].map((c, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  style={{ width: 40, height: 28, borderRadius: 5, background: c, border: `1px solid ${c}` }}
                />
              ))}
            </div>
          </BentoCard>

          {/* 5: Persistent chat — wide */}
          <BentoCard
            accentColor="#ec4899"
            title="Context that outlives the call"
            desc="Chat, reactions, and shared files persist after the meeting ends. Your work doesn't disappear."
            metric="∞"
            metricLabel="Message history"
            wide={true}
            i={4}
          >
            <ChatPreview />
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
