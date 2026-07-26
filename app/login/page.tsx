"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Video } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        position: "relative",
        background: "var(--bg-base)",
      }}
    >
      {/* Background orb */}
      <div
        style={{
          position: "fixed",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          filter: "blur(60px)",
        }}
      />

      {/* Grid background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10 }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: "0.95rem",
                color: "#fff",
                boxShadow: "0 0 24px rgba(34,197,94,0.35)",
              }}
            >
              XY
            </motion.div>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--text-100)", letterSpacing: "-0.03em" }}>
              Combinator
            </span>
          </Link>
        </div>

        {/* Card */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-100)",
            borderRadius: 24,
            padding: "40px 36px",
            boxShadow: "0 32px 64px rgba(0,0,0,0.4)",
          }}
        >
          <div style={{ marginBottom: 32 }}>
            <h1
              className="font-display"
              style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 8, color: "var(--text-100)" }}
            >
              Welcome back
            </h1>
            <p style={{ fontSize: "0.875rem", color: "var(--text-400)" }}>
              Sign in to your XY Combinator account
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-300)", marginBottom: 8, letterSpacing: "0.01em" }}>
                Email address
              </label>
              <input
                type="email"
                className="input"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                autoComplete="email"
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-300)", letterSpacing: "0.01em" }}>
                  Password
                </label>
                <a href="#" style={{ fontSize: "0.8rem", color: "#22c55e", textDecoration: "none", fontWeight: 500 }}>
                  Forgot?
                </a>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  autoComplete="current-password"
                  style={{ paddingRight: 46 }}
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "var(--text-400)",
                    cursor: "pointer",
                    display: "flex",
                    padding: 4,
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </motion.button>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
              className="btn btn-primary"
              style={{ width: "100%", marginTop: 4, padding: "14px 24px" }}
              disabled={loading}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%" }}
                />
              ) : (
                <>Sign in <ArrowRight size={16} /></>
              )}
            </motion.button>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
            <div style={{ flex: 1, height: 1, background: "var(--border-100)" }} />
            <span style={{ fontSize: "0.78rem", color: "var(--text-500)" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "var(--border-100)" }} />
          </div>

          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
            <Link href="/join" className="btn btn-ghost" style={{ width: "100%", padding: "13px 24px" }}>
              <Video size={15} />
              Join as guest
            </Link>
          </motion.div>

          <p style={{ textAlign: "center", fontSize: "0.85rem", color: "var(--text-400)", marginTop: 24 }}>
            No account?{" "}
            <Link href="/register" style={{ color: "#22c55e", textDecoration: "none", fontWeight: 600 }}>
              Sign up free
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
