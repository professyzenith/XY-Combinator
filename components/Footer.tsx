"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.055)" }}>
      {/* CTA */}
      <div style={{ padding: "140px 40px 100px" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0, margin: "200px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label" style={{ display: "block", marginBottom: 32 }}>
              Get started
            </span>

            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(3.5rem, 8vw, 7rem)",
                fontWeight: 900,
                letterSpacing: "-0.07em",
                lineHeight: 0.92,
                color: "#f0f4ff",
                marginBottom: 44,
                maxWidth: 900,
              }}
            >
              Your team deserves
              <br />
              <span style={{ color: "rgba(34,197,94,0.8)" }}>better meetings.</span>
            </h2>

            <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
              >
                <Link
                  href="/register"
                  className="btn btn-primary"
                  style={{ padding: "16px 40px", fontSize: "0.95rem" }}
                >
                  Start for free
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 500, damping: 30 }}>
                <Link
                  href="/join"
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.3)",
                    textDecoration: "none",
                  }}
                >
                  Join a meeting →
                </Link>
              </motion.div>
            </div>

            <p style={{ marginTop: 20, fontSize: "0.75rem", color: "rgba(255,255,255,0.18)", letterSpacing: "0.01em" }}>
              Free forever · No credit card · Cancel anytime
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.055)", padding: "32px 40px" }}>
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 7,
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: "0.65rem",
                color: "#fff",
              }}
            >
              XY
            </div>
            <span
              style={{
                fontFamily: "ui-monospace, monospace",
                fontSize: "0.72rem",
                color: "rgba(255,255,255,0.22)",
              }}
            >
              © 2025 XY Combinator, Inc.
            </span>
          </div>

          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy", "Terms", "GitHub"].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  fontFamily: "ui-monospace, monospace",
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.22)",
                  textDecoration: "none",
                }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
