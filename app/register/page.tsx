"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Check } from "lucide-react";

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

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.name },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
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
  const strengthColor = ["#ef4444", "#f59e0b", "#22c55e"][strength - 1] || "#e5e7eb";

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", position: "relative", overflow: "hidden", background: "#f8f9fa" }}>
      
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4vw",
        width: "100%",
        maxWidth: 1200,
        position: "relative",
        zIndex: 10
      }}>

        {/* Left Character Graphic */}
        <motion.div 
          initial={{ opacity: 0, x: -20, y: 0 }} 
          animate={{ opacity: 1, x: 0, y: [-8, 8, -8] }} 
          transition={{ 
            opacity: { duration: 0.8, delay: 0.1 },
            x: { duration: 0.8, delay: 0.1 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="hidden lg:flex" 
          style={{ flexDirection: "column", alignItems: "center", flex: 1 }}
        >
          <img src="/images/auth-left.png" alt="Characters walking" style={{ width: "100%", maxWidth: 350, objectFit: "contain" }} />
        </motion.div>

        {/* Center Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: "100%", maxWidth: 420 }}
        >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10 }}>
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.4 }}
              style={{
                width: 32,
                height: 32,
                background: "#0d9488",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ width: 14, height: 14, border: "2px solid #fff", borderRadius: "50%" }} />
            </motion.div>
            <span
              className="font-display"
              style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#1f2937" }}
            >
              XyncRoom
            </span>
          </Link>
        </div>

        {/* Card */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: 16,
            padding: "40px 36px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h1
                className="font-display"
                style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 8, color: "#111827" }}
              >
                Create an account.
              </h1>
              <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                Already have an account? <Link href="/login" style={{ color: "#0d9488", textDecoration: "none", fontWeight: 600 }}>Sign in.</Link>
              </p>
            </div>
            
            {/* Google Sign In moved next to the header */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGoogleLogin}
              disabled={loading}
              title="Sign up with Google"
              style={{
                width: 44,
                height: 44,
                background: "#ffffff",
                border: "1px solid #d1d5db",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: loading ? "default" : "pointer",
                flexShrink: 0,
                marginTop: 4,
              }}
            >
              <GoogleIcon />
            </motion.button>
          </div>

          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              style={{
                background: "#fef2f2", border: "1px solid #fee2e2",
                color: "#dc2626", padding: "12px 16px", borderRadius: 8, marginBottom: 24,
                fontSize: "0.85rem"
              }}
            >
              {errorMsg}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            
            {/* Name */}
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#374151", marginBottom: 8 }}>
                Full name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                style={{
                  width: "100%", padding: "12px 16px",
                  background: "#ffffff", border: "1px solid #d1d5db",
                  borderRadius: 8, fontSize: "0.9rem", color: "#1f2937",
                  outline: "none", boxSizing: "border-box",
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#374151", marginBottom: 8 }}>
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                style={{
                  width: "100%", padding: "12px 16px",
                  background: "#ffffff", border: "1px solid #d1d5db",
                  borderRadius: 8, fontSize: "0.9rem", color: "#1f2937",
                  outline: "none", boxSizing: "border-box",
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#374151", marginBottom: 8 }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required autoComplete="new-password"
                  style={{
                    width: "100%", padding: "12px 46px 12px 16px",
                    background: "#ffffff", border: "1px solid #d1d5db",
                    borderRadius: 8, fontSize: "0.9rem", color: "#1f2937",
                    outline: "none", boxSizing: "border-box",
                  }}
                />
                <motion.button
                  type="button" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#9ca3af", cursor: "pointer", display: "flex", padding: 4 }}
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
                          animate={{ background: i < strength ? strengthColor : "#e5e7eb" }}
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
                                background: passed ? "#dcfce7" : "#f3f4f6",
                                border: passed ? "1px solid #86efac" : "1px solid #e5e7eb",
                                scale: passed ? [1, 1.2, 1] : 1,
                              }}
                              transition={{ duration: 0.2 }}
                              style={{ width: 15, height: 15, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                            >
                              {passed && <Check size={8} color="#22c55e" strokeWidth={3} />}
                            </motion.div>
                            <span style={{ fontSize: "0.74rem", color: passed ? "#16a34a" : "#9ca3af", transition: "color 0.2s ease" }}>{label}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
              <input type="checkbox" id="remember" style={{ width: 16, height: 16, accentColor: "#0d9488" }} />
              <label htmlFor="remember" style={{ fontSize: "0.85rem", color: "#4b5563" }}>Remember this device</label>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              style={{
                width: "100%", marginTop: 8, padding: "12px 24px",
                background: "#0d9488",
                border: "none", borderRadius: 8,
                color: "#fff", fontFamily: "'Outfit', sans-serif",
                fontWeight: 600, fontSize: "0.95rem",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Creating account..." : "Sign up"}
            </motion.button>

            <p style={{ fontSize: "0.72rem", color: "#9ca3af", textAlign: "center", lineHeight: 1.6, marginTop: -4 }}>
              By signing up you agree to our{" "}
              <a href="#" style={{ color: "#0d9488", textDecoration: "none" }}>Terms</a> and{" "}
              <a href="#" style={{ color: "#0d9488", textDecoration: "none" }}>Privacy Policy</a>.
            </p>
          </form>
        </div>
      </motion.div>

      {/* Right Character Graphic */}
      <motion.div 
        initial={{ opacity: 0, x: 20, y: 0 }} 
        animate={{ opacity: 1, x: 0, y: [8, -8, 8] }} 
        transition={{ 
          opacity: { duration: 0.8, delay: 0.2 },
          x: { duration: 0.8, delay: 0.2 },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" }
        }}
        className="hidden lg:flex" 
        style={{ flexDirection: "column", alignItems: "center", flex: 1 }}
      >
        <img src="/images/auth-right.png" alt="Characters chatting" style={{ width: "100%", maxWidth: 350, objectFit: "contain" }} />
      </motion.div>

      </div>
    </div>
  );
}
