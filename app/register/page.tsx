"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react";

const PASSWORD_CHECKS = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /[0-9]/.test(p) },
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

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        position: "relative",
      }}
      className="grid-bg"
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(34,197,94,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: 440,
          position: "relative",
          zIndex: 1,
          animation: "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "1rem",
                color: "#fff",
                boxShadow: "0 0 30px rgba(34,197,94,0.35)",
              }}
            >
              XY
            </div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "#fff" }}>
              Combinator
            </span>
          </Link>
        </div>

        <div
          className="glass"
          style={{ borderRadius: 24, padding: "40px 36px", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div style={{ marginBottom: 32 }}>
            <h1
              className="font-display"
              style={{ fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}
            >
              Create your account
            </h1>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
              Join XY Combinator for free. No credit card needed.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Name */}
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
                Full name
              </label>
              <input
                type="text"
                className="input"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
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

            {/* Password */}
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
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
                  style={{ paddingRight: 48 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 4, display: "flex",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)"; }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Password strength */}
              {form.password.length > 0 && (
                <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                  {PASSWORD_CHECKS.map(({ label, test }) => {
                    const pass = test(form.password);
                    return (
                      <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div
                          style={{
                            width: 16, height: 16, borderRadius: "50%",
                            background: pass ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.05)",
                            border: pass ? "1px solid rgba(34,197,94,0.4)" : "1px solid rgba(255,255,255,0.1)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "all 0.3s ease",
                          }}
                        >
                          {pass && <Check size={9} color="#22c55e" strokeWidth={3} />}
                        </div>
                        <span style={{ fontSize: "0.78rem", color: pass ? "#4ade80" : "var(--text-muted)", transition: "color 0.3s ease" }}>
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", marginTop: 8 }}
              disabled={loading}
            >
              {loading ? (
                <div style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin-slow 0.6s linear infinite" }} />
              ) : (
                <>
                  Create account
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", textAlign: "center", lineHeight: 1.6 }}>
              By signing up, you agree to our{" "}
              <a href="#" style={{ color: "#22c55e", textDecoration: "none" }}>Terms</a> and{" "}
              <a href="#" style={{ color: "#22c55e", textDecoration: "none" }}>Privacy Policy</a>.
            </p>
          </form>

          <p style={{ textAlign: "center", fontSize: "0.875rem", color: "var(--text-muted)", marginTop: 24 }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#22c55e", textDecoration: "none", fontWeight: 600 }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
