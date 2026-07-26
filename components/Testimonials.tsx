"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const QUOTE = {
  text: "We tried six video tools in 2024. XY Combinator is the only one where nobody complained — about call quality, about joining, about anything. It just works.",
  name: "Sarah Chen",
  role: "Head of Engineering",
  company: "Notion",
};

const STATS = [
  { v: "12k+", l: "Active teams" },
  { v: "99.97%", l: "Uptime" },
  { v: "< 50ms", l: "Avg latency" },
  { v: "4.9", l: "User rating" },
];

export default function Testimonials() {
  return (
    <section
      id="about"
      style={{
        padding: "120px 40px",
        borderTop: "1px solid rgba(255,255,255,0.055)",
      }}
    >
      <div className="container">
        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0, margin: "200px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 14,
            overflow: "hidden",
            marginBottom: 100,
          }}
        >
          {STATS.map(({ v, l }) => (
            <div
              key={l}
              style={{
                background: "#060810",
                padding: "28px 24px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "2rem",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  color: "#f0f4ff",
                  lineHeight: 1,
                  marginBottom: 7,
                }}
              >
                {v}
              </div>
              <div
                style={{
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.28)",
                  letterSpacing: "0.06em",
                  fontFamily: "ui-monospace, monospace",
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Single large quote */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0, margin: "200px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 800 }}
        >
          {/* Serif quote mark */}
          <div
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "5rem",
              lineHeight: 0.7,
              color: "rgba(34,197,94,0.18)",
              marginBottom: 28,
              userSelect: "none",
            }}
          >
            &ldquo;
          </div>

          <blockquote
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.25,
              color: "#f0f4ff",
              marginBottom: 36,
            }}
          >
            {QUOTE.text}
          </blockquote>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              paddingTop: 24,
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(34,197,94,0.25), rgba(34,197,94,0.1))",
                border: "1px solid rgba(34,197,94,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "0.9rem",
                color: "rgba(34,197,94,0.8)",
              }}
            >
              {QUOTE.name[0]}
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#f0f4ff",
                  letterSpacing: "-0.01em",
                }}
              >
                {QUOTE.name}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.3)",
                  marginTop: 1,
                }}
              >
                {QUOTE.role}, {QUOTE.company}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
