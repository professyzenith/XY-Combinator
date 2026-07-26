"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "We switched from Zoom three months ago and never looked back. The interface is miles ahead and call quality is consistently better.",
    name: "Sarah Chen",
    role: "Engineering Lead",
    company: "Notion",
    color: "#22c55e",
    stars: 5,
  },
  {
    quote:
      "Finally a video tool that respects minimalism. No clutter, just the meeting. Our remote team's productivity has visibly improved.",
    name: "Marcus Webb",
    role: "Founder",
    company: "Raycast",
    color: "#3b82f6",
    stars: 5,
  },
  {
    quote:
      "The browser-only approach is a game changer for client calls. They just click the link. No 'let me install the update' moments.",
    name: "Priya Sharma",
    role: "Product Designer",
    company: "Linear",
    color: "#a855f7",
    stars: 5,
  },
  {
    quote:
      "XY Combinator feels like the video tool that Figma users would build. Opinionated, minimal, and surprisingly powerful once you dig in.",
    name: "David Park",
    role: "CTO",
    company: "Vercel",
    color: "#f59e0b",
    stars: 5,
  },
];

/* Each card is its own component — hooks always called at component top-level */
function TestimonialCard({
  quote,
  name,
  role,
  company,
  color,
  stars,
  index,
}: (typeof TESTIMONIALS)[0] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "200px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -5,
        transition: { type: "spring", stiffness: 300, damping: 22 },
      }}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-100)",
        borderRadius: 20,
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${color}35`;
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 20px 40px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "var(--border-100)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Corner accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 80,
          height: 80,
          background: `radial-gradient(circle at 100% 0%, ${color}0d 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Stars */}
      <div style={{ display: "flex", gap: 3 }}>
        {Array.from({ length: stars }).map((_, i) => (
          <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />
        ))}
      </div>

      {/* Quote */}
      <p
        style={{
          fontSize: "0.9rem",
          color: "var(--text-200)",
          lineHeight: 1.78,
          flex: 1,
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${color}, ${color}99)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "0.85rem",
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {name[0]}
        </div>
        <div>
          <div
            style={{
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "var(--text-100)",
            }}
          >
            {name}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-400)" }}>
            {role} · {company}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "200px" });

  return (
    <section id="about" style={{ padding: "80px 24px" }}>
      <div className="container">
        <div className="divider" style={{ marginBottom: 72 }} />

        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <div className="badge badge-green" style={{ marginBottom: 20 }}>
            Loved by teams
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            <span className="text-gradient-green">People actually</span>
            <br />
            <span style={{ color: "var(--text-100)" }}>enjoy using this.</span>
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} {...t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
