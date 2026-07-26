"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const LINKS = {
  Product: ["Features", "How it works", "Security", "Changelog"],
  Company: ["About", "Blog", "Careers", "Press"],
  Legal: ["Privacy", "Terms", "Cookies"],
};

export default function Footer() {
  return (
    <footer>
      {/* Final CTA */}
      <div style={{ padding: "120px 24px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0, margin: "200px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Monospace section label */}
            <div
              style={{
                fontFamily: "ui-monospace, 'Cascadia Code', monospace",
                fontSize: "0.68rem",
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 32,
              }}
            >
              Get started
            </div>

            {/* Headline */}
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(3rem, 7vw, 6rem)",
                fontWeight: 900,
                letterSpacing: "-0.06em",
                lineHeight: 0.95,
                color: "var(--text-100)",
                marginBottom: 40,
                maxWidth: 800,
              }}
            >
              Your team deserves
              <br />
              <span style={{ color: "rgba(34,197,94,0.85)" }}>better meetings.</span>
            </h2>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
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
                    fontSize: "0.9rem",
                    color: "var(--text-400)",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  Join a meeting <ArrowUpRight size={14} />
                </Link>
              </motion.div>
            </div>

            {/* Micro copy */}
            <p
              style={{
                fontSize: "0.78rem",
                color: "var(--text-500)",
                marginTop: 20,
                letterSpacing: "0.01em",
              }}
            >
              Free forever. No credit card. No contracts.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom nav */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "48px 24px",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              gap: 40,
              marginBottom: 48,
            }}
          >
            {/* Brand column */}
            <div>
              <Link
                href="/"
                style={{
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 9,
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 900,
                    fontSize: "0.78rem",
                    color: "#fff",
                  }}
                >
                  XY
                </div>
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "var(--text-100)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Combinator
                </span>
              </Link>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--text-500)",
                  lineHeight: 1.7,
                  maxWidth: 220,
                }}
              >
                Next-generation video conferencing built for teams that care about craft.
              </p>
            </div>

            {/* Link groups */}
            {Object.entries(LINKS).map(([group, links]) => (
              <div key={group}>
                <div
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.25)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: 18,
                    fontFamily: "ui-monospace, 'Cascadia Code', monospace",
                  }}
                >
                  {group}
                </div>
                {links.map((link) => (
                  <motion.a
                    key={link}
                    href="#"
                    whileHover={{ x: 2, color: "var(--text-200)" }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    style={{
                      display: "block",
                      fontSize: "0.85rem",
                      color: "var(--text-400)",
                      textDecoration: "none",
                      marginBottom: 11,
                    }}
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--text-500)",
                fontFamily: "ui-monospace, 'Cascadia Code', monospace",
              }}
            >
              © 2025 XY Combinator, Inc.
            </span>
            <motion.a
              href="https://github.com/professyzenith/XY-Combinator"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ color: "#22c55e" }}
              style={{
                fontSize: "0.75rem",
                color: "var(--text-500)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontFamily: "ui-monospace, 'Cascadia Code', monospace",
              }}
            >
              Open source on GitHub <ArrowUpRight size={11} />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
