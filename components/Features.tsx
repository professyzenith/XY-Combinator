"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Video, Shield, Share2, MessageSquare, Mic, Globe, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: Video,
    title: "Crystal-clear HD video",
    description: "1080p with AI noise cancellation. Every call feels in-person whether you're across the street or the world.",
    color: "#22c55e",
    tag: "Video",
  },
  {
    icon: Shield,
    title: "Zero-knowledge encryption",
    description: "End-to-end encrypted by default. We can't read your conversations — and neither can anyone else.",
    color: "#3b82f6",
    tag: "Security",
  },
  {
    icon: Share2,
    title: "One-click screen sharing",
    description: "Share your screen, a window, or a single tab. Annotate in real-time. No plugins, no setup.",
    color: "#a855f7",
    tag: "Collaboration",
  },
  {
    icon: MessageSquare,
    title: "Persistent team chat",
    description: "Messages, reactions, and file sharing that persist after the meeting ends. Context never gets lost.",
    color: "#f59e0b",
    tag: "Messaging",
  },
  {
    icon: Mic,
    title: "AI noise cancellation",
    description: "Background noise disappears automatically. Works in coffee shops, offices, or anywhere your team works.",
    color: "#ec4899",
    tag: "AI",
  },
  {
    icon: Globe,
    title: "Works in any browser",
    description: "No download, no plugin, no friction. Send a link. They click. They're in. That's it.",
    color: "#06b6d4",
    tag: "Accessibility",
  },
];

function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
  tag,
  index,
}: (typeof FEATURES)[0] & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0, margin: "200px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 22 } }}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-100)",
        borderRadius: 20,
        padding: "28px 28px 32px",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = `${color}35`;
        el.style.boxShadow = `0 0 48px ${color}0d, 0 20px 40px rgba(0,0,0,0.3)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "var(--border-100)";
        el.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          position: "absolute", top: 0, right: 0, width: 120, height: 120,
          background: `radial-gradient(circle at 100% 0%, ${color}0a 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          display: "inline-flex", alignSelf: "flex-start",
          padding: "3px 10px", borderRadius: 99,
          fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
          background: `${color}12`, color, border: `1px solid ${color}25`,
        }}
      >
        {tag}
      </div>
      <motion.div
        whileHover={{ scale: 1.1, rotate: 3 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        style={{
          width: 48, height: 48, borderRadius: 14,
          background: `${color}12`, border: `1px solid ${color}25`,
          display: "flex", alignItems: "center", justifyContent: "center", color,
        }}
      >
        <Icon size={22} />
      </motion.div>
      <div>
        <h3
          className="font-display"
          style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-100)", letterSpacing: "-0.02em", marginBottom: 10 }}
        >
          {title}
        </h3>
        <p style={{ fontSize: "0.875rem", color: "var(--text-300)", lineHeight: 1.7 }}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "200px" });

  return (
    <section id="features" style={{ padding: "72px 24px" }}>
      <div className="container">
        <div className="divider" style={{ marginBottom: 64 }} />

        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 52 }}
        >
          <div className="badge badge-green" style={{ marginBottom: 18 }}>
            <Zap size={11} />
            Built different
          </div>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 16, lineHeight: 1.1 }}
          >
            <span style={{ color: "var(--text-100)" }}>Everything you need.</span>
            <br />
            <span className="text-gradient-green">Nothing you don&apos;t.</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text-300)", maxWidth: 480, margin: "0 auto", lineHeight: 1.75 }}>
            Every feature purpose-built to make your meetings faster, cleaner, and more enjoyable.
          </p>
        </motion.div>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}
        >
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0, margin: "200px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: 48,
            padding: "22px 28px",
            borderRadius: 14,
            background: "var(--bg-card)",
            border: "1px solid var(--border-100)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            {[
              { icon: Video, text: "Up to 100 participants" },
              { icon: Zap, text: "< 50ms latency" },
              { icon: Globe, text: "Works globally" },
            ].map(({ icon: I, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--text-300)", fontSize: "0.875rem" }}>
                <I size={13} color="#22c55e" />
                {text}
              </div>
            ))}
          </div>
          <motion.a
            href="/register"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="btn btn-primary btn-sm"
          >
            Try free — no card needed
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
