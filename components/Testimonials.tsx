"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* Real product specs — not fake business metrics */
const SPECS = [
  { v: "1080p", l: "Video quality" },
  { v: "256-bit", l: "AES encrypted" },
  { v: "Zero", l: "Downloads needed" },
  { v: "Free", l: "To get started" },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "200px" });

  return (
    <section
      id="about"
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
          <span className="section-label">Product specs</span>
          <div
            style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }}
          />
        </div>

        {/* Spec grid — honest product facts */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            background: "rgba(255,255,255,0.055)",
            borderRadius: 14,
            overflow: "hidden",
            marginBottom: 100,
          }}
        >
          {SPECS.map(({ v, l }) => (
            <div
              key={l}
              style={{
                background: "#060810",
                padding: "32px 24px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "2.2rem",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  color: "#f0f4ff",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {v}
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "0.07em",
                  fontFamily: "ui-monospace, monospace",
                  textTransform: "uppercase",
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Editorial statement — no fake quotes */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 780 }}
        >
          {/* Section headline */}
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.06em",
              lineHeight: 1.05,
              color: "#f0f4ff",
              marginBottom: 24,
            }}
          >
            Built for the way
            <br />
            remote teams actually work.
          </h2>

          <p
            style={{
              fontSize: "1rem",
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1.85,
              maxWidth: 560,
              letterSpacing: "-0.005em",
              marginBottom: 48,
            }}
          >
            Most meeting tools were designed around the office. XY Combinator
            was built from scratch for distributed teams — where clarity,
            speed, and simplicity aren&apos;t features, they&apos;re the
            foundation.
          </p>

          {/* Honest feature list */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px 40px",
            }}
          >
            {[
              "HD video that adapts to your connection",
              "End-to-end encrypted on every call",
              "No download required for guests",
              "Persistent chat after the call ends",
              "Share your screen in one click",
              "Works in every major browser",
            ].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.45)",
                  letterSpacing: "-0.005em",
                  lineHeight: 1.5,
                }}
              >
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "rgba(34,197,94,0.5)",
                    marginTop: 6,
                    flexShrink: 0,
                  }}
                />
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
