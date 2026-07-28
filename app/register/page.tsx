"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react";

import ThreeCanvas from "@/components/ThreeCanvas";

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /\d/.test(p) },
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  const strength = PASSWORD_RULES.filter((r) => r.test(form.password)).length;
  const strengthColor = ["#ef4444", "#f59e0b", "#22c55e"][strength - 1] || "var(--border-100)";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "var(--bg-base)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 3D Background to fill the empty space with floating premium shapes */}
      <ThreeCanvas />

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
          zIndex: 0,
        }}
      />
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
          zIndex: 0,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 10 }}
      >
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 42, height: 42, borderRadius: 12,
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: "0.95rem", color: "#fff",
                boxShadow: "0 0 24px rgba(34,197,94,0.35)",
              }}
            >
              XY
            </div>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--text-100)", letterSpacing: "-0.03em" }}>
              Combinator
            </span>
          </Link>
        </div>

        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-100)",
            borderRadius: 24,
            padding: "40px 36px",
            boxShadow: "0 32px 64px rgba(0,0,0,0.15)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div style={{ marginBottom: 32 }}>
            <h1 className="font-display" style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 8, color: "var(--text-100)" }}>
              Create your account
            </h1>
            <p style={{ fontSize: "0.875rem", color: "var(--text-400)" }}>
              Free forever. No credit card required.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-300)", marginBottom: 8 }}>
                Full name
              </label>
              <input
                type="text"
                className="input"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                autoComplete="name"
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-300)", marginBottom: 8 }}>
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
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-300)", marginBottom: 8 }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  autoComplete="new-password"
                  style={{ paddingRight: 46 }}
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", color: "var(--text-400)", cursor: "pointer", display: "flex", padding: 4,
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </motion.button>
              </div>

              {/* Strength bar */}
              <AnimatePresence>
                {form.password.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: "hidden", marginTop: 12 }}
                  >
                    <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ background: i < strength ? strengthColor : "var(--border-100)" }}
                          transition={{ duration: 0.3 }}
                          style={{ flex: 1, height: 3, borderRadius: 99 }}
                        />
                      ))}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {PASSWORD_RULES.map(({ label, test }) => {
                        const passed = test(form.password);
                        return (
                          <motion.div
                            key={label}
                            animate={{ opacity: 1 }}
                            style={{ display: "flex", alignItems: "center", gap: 8 }}
                          >
                            <motion.div
                              animate={{
                                background: passed ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.04)",
                                border: passed ? "1px solid rgba(34,197,94,0.35)" : "1px solid var(--border-100)",
                                scale: passed ? [1, 1.2, 1] : 1,
                              }}
                              transition={{ duration: 0.2 }}
                              style={{ width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                            >
                              {passed && <Check size={9} color="#22c55e" strokeWidth={3} />}
                            </motion.div>
                            <span style={{ fontSize: "0.77rem", color: passed ? "#4ade80" : "var(--text-500)", transition: "color 0.2s ease" }}>
                              {label}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
                <>Create account <ArrowRight size={16} /></>
              )}
            </motion.button>

            <p style={{ fontSize: "0.76rem", color: "var(--text-500)", textAlign: "center", lineHeight: 1.6 }}>
              By signing up you agree to our{" "}
              <a href="#" style={{ color: "#22c55e", textDecoration: "none" }}>Terms</a> and{" "}
              <a href="#" style={{ color: "#22c55e", textDecoration: "none" }}>Privacy Policy</a>.
            </p>
          </form>

          <p style={{ textAlign: "center", fontSize: "0.85rem", color: "var(--text-400)", marginTop: 24 }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#22c55e", textDecoration: "none", fontWeight: 600 }}>
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
