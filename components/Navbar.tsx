"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? "14px 0" : "22px 0",
        background: scrolled ? "rgba(8,11,16,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div className="container" style={{ padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
          >
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
                boxShadow: "0 0 16px rgba(34,197,94,0.35)",
                letterSpacing: "-0.02em",
              }}
            >
              XY
            </div>
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "#fff",
                letterSpacing: "-0.03em",
              }}
            >
              Combinator
            </span>
          </motion.div>
        </Link>

        {/* Desktop Nav Links */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 2 }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              whileHover={{ color: "#fff" }}
              style={{
                color: "var(--text-300)",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: "0.875rem",
                fontWeight: 500,
                transition: "background 0.2s ease",
                display: "block",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="hidden md:flex">
          <Link
            href="/login"
            style={{ color: "var(--text-300)", textDecoration: "none", padding: "9px 18px", fontSize: "0.875rem", fontWeight: 500, borderRadius: 8, transition: "color 0.2s ease" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-300)"; }}
          >
            Sign in
          </Link>
          <motion.div
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Link href="/register" className="btn btn-primary btn-sm">
              Get started free
            </Link>
          </motion.div>
        </div>

        {/* Mobile toggle */}
        <motion.button
          className="md:hidden"
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 8, borderRadius: 8 }}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden", borderTop: "1px solid var(--border-100)", marginTop: 12 }}
            className="md:hidden"
          >
            <div style={{ padding: "12px 24px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{ color: "var(--text-300)", textDecoration: "none", padding: "12px 0", fontSize: "0.95rem", fontWeight: 500 }}
                >
                  {link.label}
                </a>
              ))}
              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                <Link href="/login" className="btn btn-ghost btn-sm" style={{ flex: 1 }}>Sign in</Link>
                <Link href="/register" className="btn btn-primary btn-sm" style={{ flex: 1 }}>Get started</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
