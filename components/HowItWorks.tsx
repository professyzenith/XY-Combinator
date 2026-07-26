"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STEPS = [
  {
    n: "01",
    head: "Create your room.",
    body: "One permanent link. No configuration, no waiting room, no app install. Share it in Slack, in an email, or as a text.",
    sub: "Ready in under 10 seconds",
  },
  {
    n: "02",
    head: "Invite anyone.",
    body: "Guests click the link and they're in. No account. No download. Zero barrier. Your clients will thank you.",
    sub: "No account needed for guests",
  },
  {
    n: "03",
    head: "Meet. Ship. Repeat.",
    body: "HD video, real-time annotation, chat that outlives the call. Everything your team needs, nothing they don't.",
    sub: "Context survives every call",
  },
];

function Step({
  n,
  head,
  body,
  sub,
  i,
}: (typeof STEPS)[0] & { i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "200px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Big faded number */}
      <div
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "5rem",
          fontWeight: 900,
          letterSpacing: "-0.08em",
          color: "rgba(255,255,255,0.05)",
          lineHeight: 1,
          marginBottom: 24,
          userSelect: "none",
        }}
      >
        {n}
      </div>

      {/* Thin accent line */}
      <div
        style={{
          height: 1,
          background:
            i === 0
              ? "linear-gradient(90deg, rgba(34,197,94,0.45), rgba(255,255,255,0.06))"
              : "rgba(255,255,255,0.07)",
          marginBottom: 28,
        }}
      />

      <h3
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "1.5rem",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1.2,
          color: "#f0f4ff",
          marginBottom: 14,
        }}
      >
        {head}
      </h3>

      <p
        style={{
          fontSize: "0.9rem",
          color: "rgba(255,255,255,0.35)",
          lineHeight: 1.8,
          letterSpacing: "-0.005em",
          marginBottom: 20,
        }}
      >
        {body}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
        }}
      >
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "rgba(34,197,94,0.45)",
          }}
        />
        <span
          style={{
            fontFamily: "ui-monospace, monospace",
            fontSize: "0.68rem",
            color: "rgba(255,255,255,0.22)",
            letterSpacing: "0.04em",
          }}
        >
          {sub}
        </span>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const labelRef = useRef<HTMLDivElement>(null);
  const labelInView = useInView(labelRef, { once: true, margin: "200px" });

  return (
    <section
      id="how-it-works"
      style={{
        padding: "120px 40px",
        borderTop: "1px solid rgba(255,255,255,0.055)",
      }}
    >
      <div className="container">
        {/* Label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 80,
          }}
        >
          <span className="section-label">How it works</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
        </div>

        {/* Header */}
        <motion.div
          ref={labelRef}
          initial={{ opacity: 0, y: 24 }}
          animate={labelInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 32,
            marginBottom: 80,
            flexWrap: "wrap",
          }}
        >
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.065em",
              lineHeight: 1.0,
              color: "#f0f4ff",
            }}
          >
            Up and running
            <br />
            <span style={{ color: "rgba(34,197,94,0.8)" }}>in 60 seconds.</span>
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.3)",
              maxWidth: 280,
              lineHeight: 1.8,
              letterSpacing: "-0.005em",
            }}
          >
            No IT setup. No enterprise contracts. No 47-step onboarding.
          </p>
        </motion.div>

        {/* Steps */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 48 }}>
          {STEPS.map((s, i) => (
            <Step key={s.n} {...s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
