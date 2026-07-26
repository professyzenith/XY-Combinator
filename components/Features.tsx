"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Video, Shield, Share2, MessageSquare, Mic, Globe, Zap, Users } from "lucide-react";

const FEATURES = [
  {
    icon: Video,
    title: "Crystal-clear HD video",
    description: "1080p video with AI-powered noise cancellation. Every call feels like you're in the same room, whether you're across the hall or across the world.",
    color: "#22c55e",
    tag: "Video",
  },
  {
    icon: Shield,
    title: "Zero-knowledge encryption",
    description: "Every meeting uses end-to-end encryption by default. We can't read your conversations — and neither can anyone else.",
    color: "#3b82f6",
    tag: "Security",
  },
  {
    icon: Share2,
    title: "One-click screen sharing",
    description: "Share your screen, a window, or a single browser tab. Annotate in real-time. No plugins, no setup — just click and share.",
    color: "#a855f7",
    tag: "Collaboration",
  },
  {
    icon: MessageSquare,
    title: "Persistent team chat",
    description: "Real-time messages, reactions, and file sharing that persist after the meeting ends. Context never gets lost.",
    color: "#f59e0b",
    tag: "Messaging",
  },
  {
    icon: Mic,
    title: "AI noise cancellation",
    description: "Background noise disappears automatically. Works in coffee shops, co-working spaces, or anywhere your team actually works.",
    color: "#ec4899",
    tag: "AI",
  },
  {
    icon: Globe,
    title: "Works in any browser",
    description: "No download, no plugin, no friction. Send a link. They click it. They're in the meeting. That's it.",
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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
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
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = `${color}30`;
        el.style.boxShadow = `0 0 48px ${color}0d, 0 20px 40px rgba(0,0,0,0.3)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "var(--border-100)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Subtle corner glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 120,
          height: 120,
          background: `radial-gradient(circle at 100% 0%, ${color}0a 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Tag */}
      <div
        style={{
          display: "inline-flex",
          alignSelf: "flex-start",
          padding: "3px 10px",
          borderRadius: 99,
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          background: `${color}12`,
          color: color,
          border: `1px solid ${color}25`,
        }}
      >
        {tag}
      </div>

      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 3 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: `${color}12`,
          border: `1px solid ${color}25`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: color,
        }}
      >
        <Icon size={22} />
      </motion.div>

      {/* Text */}
      <div>
        <h3
          className="font-display"
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "var(--text-100)",
            letterSpacing: "-0.02em",
            marginBottom: 10,
          }}
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
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section id="features" className="section" style={{ position: "relative" }}>
      {/* Section divider */}
      <div className="divider" style={{ marginBottom: 80, maxWidth: 1160, margin: "0 auto 80px" }} />

      <div className="container">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <div className="badge badge-green" style={{ marginBottom: 20 }}>
            <Zap size={11} />
            Built different
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              marginBottom: 18,
              lineHeight: 1.1,
            }}
          >
            <span style={{ color: "var(--text-100)" }}>Everything you need.</span>
            <br />
            <span className="text-gradient-green">Nothing you don&apos;t.</span>
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--text-300)",
              maxWidth: 500,
              margin: "0 auto",
              lineHeight: 1.75,
            }}
          >
            Every feature purpose-built to make your meetings faster, cleaner,
            and more enjoyable than anything else on the market.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 18,
          }}
        >
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: 60,
            padding: "24px 32px",
            borderRadius: 16,
            background: "var(--bg-card)",
            border: "1px solid var(--border-100)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            {[
              { icon: Users, text: "Up to 100 participants" },
              { icon: Zap, text: "< 50ms latency" },
              { icon: Globe, text: "Works globally" },
            ].map(({ icon: I, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-300)", fontSize: "0.875rem" }}>
                <I size={14} color="#22c55e" />
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
            Try it free — no card needed
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
