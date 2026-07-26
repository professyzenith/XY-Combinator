"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Create your room.",
    body: "One permanent link. No configuration. No waiting room. Share it in Slack, drop it in an email, or text it. It just works.",
    footnote: "Ready in under 10 seconds",
  },
  {
    number: "02",
    title: "Invite your team.",
    body: "Guests click the link and join. No account required. No 'please install the update' friction. Zero barrier to entry.",
    footnote: "No download for guests",
  },
  {
    number: "03",
    title: "Meet. Ship. Repeat.",
    body: "HD video, real-time collaboration, persistent chat and file sharing that keep the context alive long after the call ends.",
    footnote: "Everything stays, nothing is lost",
  },
];

function StepItem({
  number,
  title,
  body,
  footnote,
  index,
}: (typeof STEPS)[0] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "200px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "flex", flexDirection: "column", gap: 0 }}
    >
      {/* Number */}
      <div
        className="font-display"
        style={{
          fontSize: "4rem",
          fontWeight: 900,
          letterSpacing: "-0.06em",
          color: "rgba(255,255,255,0.06)",
          lineHeight: 1,
          marginBottom: 24,
          userSelect: "none",
        }}
      >
        {number}
      </div>

      {/* Thin top line */}
      <div
        style={{
          width: "100%",
          height: 1,
          background: `linear-gradient(90deg, rgba(34,197,94,${index === 0 ? "0.5" : "0.15"}) 0%, rgba(255,255,255,0.06) 100%)`,
          marginBottom: 28,
        }}
      />

      {/* Title */}
      <h3
        className="font-display"
        style={{
          fontSize: "1.55rem",
          fontWeight: 800,
          color: "var(--text-100)",
          letterSpacing: "-0.04em",
          lineHeight: 1.2,
          marginBottom: 16,
        }}
      >
        {title}
      </h3>

      {/* Body */}
      <p
        style={{
          fontSize: "0.9rem",
          color: "var(--text-400)",
          lineHeight: 1.8,
          flex: 1,
          marginBottom: 24,
        }}
      >
        {body}
      </p>

      {/* Footnote */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "rgba(34,197,94,0.5)",
          }}
        />
        <span
          style={{
            fontFamily: "ui-monospace, 'Cascadia Code', monospace",
            fontSize: "0.72rem",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.04em",
          }}
        >
          {footnote}
        </span>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "200px" });

  return (
    <section id="how-it-works" style={{ padding: "100px 24px" }}>
      <div className="container">
        {/* Label + divider */}
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
            How it works
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
        </div>

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 32,
            marginBottom: 72,
            flexWrap: "wrap",
          }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: 900,
              letterSpacing: "-0.05em",
              lineHeight: 1.05,
              color: "var(--text-100)",
              maxWidth: 540,
            }}
          >
            Up and running
            <br />
            <span style={{ color: "rgba(34,197,94,0.85)" }}>in 60 seconds.</span>
          </h2>
          <p
            style={{
              fontSize: "0.925rem",
              color: "var(--text-400)",
              maxWidth: 320,
              lineHeight: 1.75,
            }}
          >
            No IT setup. No enterprise contracts. No 47-step onboarding. Just a link.
          </p>
        </motion.div>

        {/* Three columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 48,
          }}
        >
          {STEPS.map((step, i) => (
            <StepItem key={step.number} {...step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
