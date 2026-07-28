"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react";

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /\d/.test(p) },
];

// Animated aurora blobs
function AuroraBackground() {
  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", zIndex: 0 }}>
      {/* Base */}
      <div style={{ position: "absolute", inset: 0, background: "#050608" }} />

      {/* Blob 1 — Emerald, top-left */}
      <motion.div
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: 700, height: 700,
          top: "-20%", left: "-15%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 65%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* Blob 2 — Deep blue, bottom-right */}
      <motion.div
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 50, -20, 0],
          scale: [1, 1.1, 1.05, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{
          position: "absolute",
          width: 800, height: 800,
          bottom: "-25%", right: "-20%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 65%)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      {/* Blob 3 — Indigo, center */}
      <motion.div
        animate={{
          x: [0, 30, -40, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.08, 0.98, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        style={{
          position: "absolute",
          width: 600, height: 600,
          top: "20%", left: "30%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 65%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      {/* Blob 4 — Teal accent, top-right */}
      <motion.div
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 30, -50, 0],
          scale: [1, 0.9, 1.12, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 9 }}
        style={{
          position: "absolute",
          width: 500, height: 500,
          top: "-10%", right: "-5%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(20,184,166,0.09) 0%, transparent 65%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
        maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)",
      }} />

      {/* Film grain noise */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.35,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
      }} />

      {/* Vignette */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(5,6,8,0.7) 100%)",
      }} />
    </div>
  );
}

// Floating particles
const INITIAL_DOTS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1 + Math.random() * 2,
  delay: Math.random() * 8,
  duration: 8 + Math.random() * 12,
  color: i % 4 === 0 ? "rgba(34,197,94,0.6)" : i % 4 === 1 ? "rgba(99,102,241,0.4)" : i % 4 === 2 ? "rgba(59,130,246,0.35)" : "rgba(255,255,255,0.2)",
}));

function Particles() {
  const [dots] = useState(INITIAL_DOTS);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }}>
      {dots.map((d) => (
        <motion.div
          key={d.id}
          animate={{ y: [0, -30, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: d.duration, repeat: Infinity, delay: d.delay, ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: `${d.x}%`, top: `${d.y}%`,
            width: d.size, height: d.size,
            borderRadius: "50%",
            background: d.color,
            boxShadow: `0 0 ${d.size * 4}px ${d.color}`,
          }}
        />
      ))}
    </div>
  );
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.name,
        }
      }
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    if (!data.session) {
      setErrorMsg("Success! Please check your email inbox to verify your account, then log in.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });
    
    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    }
  };

  const strength = PASSWORD_RULES.filter((r) => r.test(form.password)).length;
  const strengthColor = ["#ef4444", "#f59e0b", "#22c55e"][strength - 1] || "rgba(255,255,255,0.1)";

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", position: "relative" }}>
      <AuroraBackground />
      <Particles />

      {/* Subtle mouse parallax on the whole card */}
      <motion.div
        animate={{ x: mousePos.x * 0.3, y: mousePos.y * 0.3 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 440 }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 36 }}
        >
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10 }}>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 0 32px rgba(34,197,94,0.5)" }}
              style={{
                width: 44, height: 44, borderRadius: 13,
                background: "linear-gradient(135deg, #22c55e, #15803d)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: "1rem", color: "#fff",
                boxShadow: "0 0 24px rgba(34,197,94,0.4)",
              }}
            >XY</motion.div>
            <span style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 700,
              fontSize: "1.15rem", color: "rgba(255,255,255,0.9)", letterSpacing: "-0.03em",
            }}>Combinator</span>
          </Link>
        </motion.div>

        {/* Glass card */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(40px) saturate(180%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 28,
            padding: "44px 40px",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Card inner glow — emerald top edge */}
          <div style={{
            position: "absolute", top: 0, left: "20%", right: "20%", height: 1,
            background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)",
            pointerEvents: "none",
          }} />

          <div style={{ marginBottom: 32 }}>
            <motion.h1
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1.8rem", fontWeight: 800,
                letterSpacing: "-0.04em", marginBottom: 8,
                color: "rgba(255,255,255,0.95)",
              }}
            >
              Create your account
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.32, duration: 0.6 }}
              style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5,
            }}>
              Join the future of high-fidelity team communication.
            </motion.p>
          </div>

          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              style={{
                background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#ef4444", padding: "12px 16px", borderRadius: 12, marginBottom: 24,
                fontSize: "0.85rem", fontFamily: "var(--font-mono)"
              }}
            >
              {errorMsg}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Name */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "rgba(255,255,255,0.4)", marginBottom: 8, letterSpacing: "0.01em" }}>
                Full name
              </label>
              <input
                type="text" placeholder="Your full name"
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                required autoComplete="name"
                style={{
                  width: "100%", padding: "13px 16px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12, fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.88)",
                  outline: "none", boxSizing: "border-box",
                  fontFamily: "'Outfit', sans-serif",
                  transition: "border-color 0.2s ease, background 0.2s ease",
                } as React.CSSProperties}
                onFocus={(e) => { e.target.style.borderColor = "rgba(34,197,94,0.5)"; e.target.style.background = "rgba(255,255,255,0.07)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.background = "rgba(255,255,255,0.05)"; }}
              />
            </motion.div>

            {/* Email */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>
                Email address
              </label>
              <input
                type="email" placeholder="you@example.com"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                required autoComplete="email"
                style={{
                  width: "100%", padding: "13px 16px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12, fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.88)",
                  outline: "none", boxSizing: "border-box",
                  fontFamily: "'Outfit', sans-serif",
                  transition: "border-color 0.2s ease, background 0.2s ease",
                } as React.CSSProperties}
                onFocus={(e) => { e.target.style.borderColor = "rgba(34,197,94,0.5)"; e.target.style.background = "rgba(255,255,255,0.07)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.background = "rgba(255,255,255,0.05)"; }}
              />
            </motion.div>

            {/* Password */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }}>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required autoComplete="new-password"
                  style={{
                    width: "100%", padding: "13px 48px 13px 16px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12, fontSize: "0.9rem",
                    color: "rgba(255,255,255,0.88)",
                    outline: "none", boxSizing: "border-box",
                    fontFamily: "'Outfit', sans-serif",
                    transition: "border-color 0.2s ease, background 0.2s ease",
                  } as React.CSSProperties}
                  onFocus={(e) => { e.target.style.borderColor = "rgba(34,197,94,0.5)"; e.target.style.background = "rgba(255,255,255,0.07)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.background = "rgba(255,255,255,0.05)"; }}
                />
                <motion.button
                  type="button" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", display: "flex", padding: 4 }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </motion.button>
              </div>

              <AnimatePresence>
                {form.password.length > 0 && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ overflow: "hidden", marginTop: 12 }}>
                    <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
                      {[0, 1, 2].map((i) => (
                        <motion.div key={i}
                          animate={{ background: i < strength ? strengthColor : "rgba(255,255,255,0.08)" }}
                          transition={{ duration: 0.3 }}
                          style={{ flex: 1, height: 2, borderRadius: 99 }} />
                      ))}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                      {PASSWORD_RULES.map(({ label, test }) => {
                        const passed = test(form.password);
                        return (
                          <motion.div key={label} animate={{ opacity: 1 }} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <motion.div
                              animate={{
                                background: passed ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.04)",
                                border: passed ? "1px solid rgba(34,197,94,0.35)" : "1px solid rgba(255,255,255,0.1)",
                                scale: passed ? [1, 1.2, 1] : 1,
                              }}
                              transition={{ duration: 0.2 }}
                              style={{ width: 15, height: 15, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                            >
                              {passed && <Check size={8} color="#22c55e" strokeWidth={3} />}
                            </motion.div>
                            <span style={{ fontSize: "0.74rem", color: passed ? "#4ade80" : "rgba(255,255,255,0.28)", transition: "color 0.2s ease" }}>{label}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Submit */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2, boxShadow: "0 12px 40px rgba(34,197,94,0.35)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
                disabled={loading}
                style={{
                  width: "100%", padding: "14px 24px",
                  background: loading ? "rgba(34,197,94,0.5)" : "linear-gradient(135deg, #22c55e, #16a34a)",
                  border: "none", borderRadius: 14,
                  color: "#fff", fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700, fontSize: "0.95rem", letterSpacing: "-0.01em",
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  boxShadow: "0 0 24px rgba(34,197,94,0.25)",
                }}
              >
                {loading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%" }} />
                ) : (<>Create account <ArrowRight size={16} /></>)}
              </motion.button>
            </motion.div>

            <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.2)", textAlign: "center", lineHeight: 1.6, marginTop: -4 }}>
              By signing up you agree to our{" "}
              <a href="#" style={{ color: "rgba(34,197,94,0.7)", textDecoration: "none" }}>Terms</a> and{" "}
              <a href="#" style={{ color: "rgba(34,197,94,0.7)", textDecoration: "none" }}>Privacy Policy</a>.
            </p>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.2)" }}>or continue with</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleLogin}
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px 24px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              color: "rgba(255,255,255,0.88)",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: loading ? "default" : "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
              transition: "all 0.2s ease",
            }}
          >
            <GoogleIcon />
            Sign up with Google
          </motion.button>

          <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
            <p style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.28)" }}>
              Already have an account?{" "}
              <Link href="/login" style={{ color: "#22c55e", textDecoration: "none", fontWeight: 600 }}>Sign in</Link>
            </p>
          </div>
        </motion.div>

        {/* Below card — feature chips */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24, flexWrap: "wrap" }}
        >
          {["HD Video", "E2E Encrypted", "No Install", "Free to Start"].map((chip) => (
            <span key={chip} style={{
              fontSize: "0.62rem", color: "rgba(255,255,255,0.25)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 999, padding: "4px 12px",
              fontFamily: "'Outfit', sans-serif", fontWeight: 500,
              letterSpacing: "0.02em",
            }}>{chip}</span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
