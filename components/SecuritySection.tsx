"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Animated encryption particles ─── */
function EncryptionViz() {
  const chars = "01AE4F8B2CD9".split("");
  return (
    <div style={{ position: "relative", height: 80, overflow: "hidden", borderRadius: 8 }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: ["-10%", "110%"], opacity: [0, 0.6, 0] }}
          transition={{
            duration: 1.5 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${(i / 20) * 100}%`,
            fontFamily: "ui-monospace, monospace",
            fontSize: "0.65rem",
            color: i % 3 === 0 ? "#22c55e" : i % 3 === 1 ? "#3b82f6" : "#a855f7",
            userSelect: "none",
          }}
        >
          {chars[i % chars.length]}
        </motion.div>
      ))}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(0deg, #060810 0%, transparent 40%, transparent 60%, #060810 100%)",
      }} />
    </div>
  );
}

export default function SecuritySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "100px" });

  return (
    <section style={{ padding: "100px 40px", borderTop: "1px solid rgba(255,255,255,0.055)" }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
        }}>
          {/* Left: Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
              <span className="section-label">Security</span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h1)",
              fontWeight: "var(--weight-black)",
              letterSpacing: "var(--tracking-h1)",
              lineHeight: "var(--leading-tight)",
              color: "var(--text-primary)",
              marginBottom: 24,
            }}>
              Your conversations
              <br />
              <span style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                stay yours.
              </span>
            </h2>
            <p style={{
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1.8,
              marginBottom: 36,
              maxWidth: 420,
              letterSpacing: "-0.005em",
            }}>
              Every call is end-to-end encrypted with 256-bit AES. Zero-knowledge architecture means even we cannot access your meetings.
            </p>

            {/* Security specs */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "256-bit AES encryption", color: "#a855f7" },
                { label: "Zero-knowledge architecture", color: "#3b82f6" },
                { label: "No data stored post-call", color: "#22c55e" },
              ].map(({ label, color }) => (
                <motion.div
                  key={label}
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -12 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ width: 6, height: 6, borderRadius: "50%", background: color, boxShadow: `0 0 6px ${color}` }}
                  />
                  <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", letterSpacing: "-0.005em" }}>
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              borderRadius: 20,
              border: "1px solid rgba(168,85,247,0.15)",
              background: "linear-gradient(140deg, rgba(168,85,247,0.06) 0%, rgba(59,130,246,0.04) 50%, rgba(6,8,16,0.8) 100%)",
              padding: 32,
              backdropFilter: "blur(12px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Corner glow */}
            <div style={{
              position: "absolute", top: 0, left: 0,
              width: 200, height: 200,
              background: "radial-gradient(circle at 0% 0%, rgba(168,85,247,0.12), transparent 60%)",
              pointerEvents: "none",
            }} />

            {/* Encryption viz */}
            <EncryptionViz />

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(168,85,247,0.15)", margin: "20px 0" }} />

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { v: "256-bit", l: "AES" },
                { v: "E2E", l: "Encrypted" },
                { v: "Zero", l: "Data stored" },
                { v: "Always", l: "On by default" },
              ].map(({ v, l }) => (
                <div key={l} style={{ textAlign: "center", padding: "12px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-0.04em", color: "#f0f4ff", marginBottom: 3 }}>{v}</div>
                  <div style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.07em", textTransform: "uppercase" }}>{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
