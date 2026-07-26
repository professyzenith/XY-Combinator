"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "We switched from Zoom three months ago and have never looked back. The interface is miles ahead and the call quality is consistently better.",
    name: "Sarah Chen",
    role: "Engineering Lead",
    company: "Notion",
    color: "#22c55e",
    stars: 5,
  },
  {
    quote: "Finally a video tool that respects minimalism. No clutter, just the meeting. Our remote team's productivity has visibly improved.",
    name: "Marcus Webb",
    role: "Founder",
    company: "Raycast",
    color: "#3b82f6",
    stars: 5,
  },
  {
    quote: "The browser-only approach is a game changer for client calls. They just click the link. No 'let me install the update' moments anymore.",
    name: "Priya Sharma",
    role: "Product Designer",
    company: "Linear",
    color: "#a855f7",
    stars: 5,
  },
  {
    quote: "XY Combinator feels like the video tool that Figma users would build. Opinionated, minimal, and surprisingly powerful once you dig in.",
    name: "David Park",
    role: "CTO",
    company: "Vercel",
    color: "#f59e0b",
    stars: 5,
  },
];

export default function Testimonials() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="divider" style={{ marginBottom: 80 }} />

        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <div className="badge badge-green" style={{ marginBottom: 20 }}>
            Loved by teams
          </div>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1 }}
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
          {TESTIMONIALS.map((t, i) => {
            const ref = useRef<HTMLDivElement>(null);
            const inView = useInView(ref, { once: true, margin: "-40px" });

            return (
              <motion.div
                key={t.name}
                ref={ref}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 22 } }}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-100)",
                  borderRadius: 20,
                  padding: "28px 28px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${t.color}30`;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 40px rgba(0,0,0,0.3)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-100)";
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
                    background: `radial-gradient(circle at 100% 0%, ${t.color}10 0%, transparent 70%)`,
                    pointerEvents: "none",
                  }}
                />

                {/* Stars */}
                <div style={{ display: "flex", gap: 3 }}>
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>

                {/* Quote */}
                <p style={{ fontSize: "0.925rem", color: "var(--text-200)", lineHeight: 1.75, flex: 1 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${t.color}, ${t.color}99)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-100)" }}>{t.name}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-400)" }}>
                      {t.role} · {t.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
