"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const FOOTER_LINKS = {
  Product: ["Features", "How it works", "Security", "Changelog"],
  Company: ["About", "Blog", "Careers", "Press"],
  Legal: ["Privacy", "Terms", "Cookies", "Security"],
};

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border-100)", position: "relative" }}>
      {/* Big CTA section */}
      <div style={{ padding: "100px 24px" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              borderRadius: 28,
              padding: "72px 48px",
              textAlign: "center",
              background: "var(--bg-card)",
              border: "1px solid var(--border-100)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background orb */}
            <div
              style={{
                position: "absolute",
                width: 600,
                height: 300,
                background: "radial-gradient(ellipse, rgba(34,197,94,0.08) 0%, transparent 70%)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                filter: "blur(40px)",
              }}
            />

            {/* Top line decoration */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "10%",
                right: "10%",
                height: 1,
                background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div className="badge badge-green" style={{ marginBottom: 28 }}>
                Get started today
              </div>

              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(2.4rem, 5vw, 4rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  lineHeight: 1.05,
                  marginBottom: 20,
                }}
              >
                <span style={{ color: "var(--text-100)" }}>Your team deserves</span>
                <br />
                <span className="text-gradient-green">better meetings.</span>
              </h2>

              <p
                style={{
                  color: "var(--text-300)",
                  fontSize: "1.05rem",
                  marginBottom: 40,
                  maxWidth: 460,
                  margin: "0 auto 40px",
                  lineHeight: 1.7,
                }}
              >
                Join thousands of teams already using XY Combinator. Free to start,
                scales with you. No contracts, cancel anytime.
              </p>

              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <motion.div
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 500, damping: 28 }}
                >
                  <Link
                    href="/register"
                    className="btn btn-primary"
                    style={{ padding: "16px 36px", fontSize: "0.95rem" }}
                  >
                    Start for free
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 500, damping: 28 }}
                >
                  <Link
                    href="/join"
                    className="btn btn-ghost"
                    style={{ padding: "16px 36px", fontSize: "0.95rem" }}
                  >
                    Join a meeting
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer nav */}
      <div style={{ borderTop: "1px solid var(--border-100)", padding: "60px 24px 40px" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              gap: 40,
              marginBottom: 56,
            }}
          >
            {/* Brand */}
            <div>
              <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 900,
                    fontSize: "0.85rem",
                    color: "#fff",
                  }}
                >
                  XY
                </div>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--text-100)", letterSpacing: "-0.02em" }}>
                  Combinator
                </span>
              </Link>
              <p style={{ fontSize: "0.875rem", color: "var(--text-400)", lineHeight: 1.7, maxWidth: 240, marginBottom: 24 }}>
                The next-generation video conferencing platform for teams that care about quality.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { icon: <GithubIcon />, href: "https://github.com/professyzenith/XY-Combinator" },
                ].map(({ icon, href }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, color: "#22c55e" }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border-100)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-400)",
                      textDecoration: "none",
                      transition: "border-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(34,197,94,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-100)";
                    }}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Link groups */}
            {Object.entries(FOOTER_LINKS).map(([group, links]) => (
              <div key={group}>
                <h4
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--text-100)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: 20,
                  }}
                >
                  {group}
                </h4>
                {links.map((link) => (
                  <motion.a
                    key={link}
                    href="#"
                    whileHover={{ x: 3, color: "var(--text-100)" }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: "0.875rem",
                      color: "var(--text-400)",
                      textDecoration: "none",
                      marginBottom: 12,
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
              borderTop: "1px solid var(--border-100)",
              paddingTop: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <span style={{ fontSize: "0.8rem", color: "var(--text-500)" }}>
              © 2025 XY Combinator. All rights reserved.
            </span>
            <motion.a
              href="https://github.com/professyzenith/XY-Combinator"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ color: "#22c55e" }}
              style={{ fontSize: "0.8rem", color: "var(--text-500)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}
            >
              Open source on GitHub <ArrowUpRight size={12} />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
