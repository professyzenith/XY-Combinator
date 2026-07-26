"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TESTIMONIALS = [
  {
    quote: "We tried six video tools in 2024. XY Combinator is the only one where no one complained about call quality, joining friction, or missing features. It just works.",
    name: "Sarah Chen",
    role: "Head of Engineering",
    company: "Notion",
    initial: "S",
  },
  {
    quote: "The interface is the product. Minimal, fast, and intentional — which is more than I can say for any Zoom alternative we've tried in the past three years.",
    name: "Marcus Webb",
    role: "Founder",
    company: "Raycast",
    initial: "M",
  },
  {
    quote: "Our clients don't have a company laptop. They just need to join a call. XY Combinator solves this completely — no download, no friction, just a link that works.",
    name: "Priya Sharma",
    role: "Director of Design",
    company: "Linear",
    initial: "P",
  },
];

const STATS = [
  { value: "10,000+", label: "Active teams" },
  { value: "99.97%", label: "Uptime" },
  { value: "< 50ms", label: "Avg latency" },
  { value: "4.9 / 5", label: "User rating" },
];

function QuoteCard({
  quote,
  name,
  role,
  company,
  initial,
  index,
}: (typeof TESTIMONIALS)[0] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "200px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: "32px",
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.02)",
        display: "flex",
        flexDirection: "column",
        gap: 24,
        transition: "border-color 0.3s ease, background 0.3s ease",
        cursor: "default",
      }}
      whileHover={{
        y: -4,
        transition: { type: "spring", stiffness: 300, damping: 24 },
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.12)";
        (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.035)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
        (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)";
      }}
    >
      {/* Opening quote mark */}
      <div
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "3rem",
          lineHeight: 0.8,
          color: "rgba(34,197,94,0.25)",
          userSelect: "none",
        }}
      >
        &ldquo;
      </div>

      {/* Quote */}
      <p
        style={{
          fontSize: "0.9rem",
          color: "var(--text-200)",
          lineHeight: 1.85,
          flex: 1,
          letterSpacing: "0.01em",
        }}
      >
        {quote}
      </p>

      {/* Author */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          paddingTop: 16,
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "0.8rem",
            color: "rgba(34,197,94,0.8)",
            flexShrink: 0,
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          {initial}
        </div>
        <div>
          <div
            style={{
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "var(--text-100)",
              letterSpacing: "-0.01em",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--text-500)",
              letterSpacing: "0.01em",
            }}
          >
            {role}, {company}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "200px" });

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "200px" });

  return (
    <section id="about" style={{ padding: "100px 24px" }}>
      <div className="container">
        {/* Label */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 72 }}>
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
            From the teams using it
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
        </div>

        {/* Stats bar */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 16 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 16,
            overflow: "hidden",
            marginBottom: 64,
          }}
        >
          {STATS.map(({ value, label }, i) => (
            <div
              key={label}
              style={{
                background: "var(--bg-base)",
                padding: "28px 24px",
                textAlign: "center",
              }}
            >
              <div
                className="font-display"
                style={{
                  fontSize: "1.9rem",
                  fontWeight: 900,
                  color: "var(--text-100)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "var(--text-500)",
                  letterSpacing: "0.04em",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Section title */}
        <motion.h2
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display"
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 900,
            letterSpacing: "-0.05em",
            lineHeight: 1.1,
            color: "var(--text-100)",
            marginBottom: 48,
            maxWidth: 540,
          }}
        >
          Trusted by teams
          <br />
          that care about craft.
        </motion.h2>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <QuoteCard key={t.name} {...t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
