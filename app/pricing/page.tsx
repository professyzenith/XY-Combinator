"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, ArrowRight, Zap, Star } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function PricingPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });
  }, []);

  const handleSubscribe = (planId: string) => {
    if (!isAuthenticated) {
      // Redirect to login if not signed in, they can come back later
      router.push("/login");
      return;
    }

    // If authenticated, simulate proceeding to checkout
    setProcessingPlan(planId);
    setTimeout(() => {
      alert(`Proceeding to secure checkout for the ${planId} plan! (Stripe/Razorpay Integration Coming Soon)`);
      setProcessingPlan(null);
    }, 1000);
  };

  const basicFeatures = [
    "High Quality Video Meetings",
    "Essential Host Controls",
    "Standard Security Encryption",
    "Community Support",
  ];

  const ultraFeatures = [
    "Highest Possible Video Quality",
    "Advanced Host Controls",
    "Priority Network Routing",
    "Exclusive Founder Perks",
    "24/7 Priority Support",
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header */}
      <header style={{ padding: "32px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 10 }}>
        <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, background: "#0d9488", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 14, height: 14, border: "2px solid #fff", borderRadius: "50%" }} />
          </div>
          <span className="font-display" style={{ fontSize: "1.25rem", fontWeight: 800, color: "#111827", letterSpacing: "-0.03em" }}>
            XY Combinator
          </span>
        </Link>
        <div style={{ display: "flex", gap: 16 }}>
          {!isLoading && !isAuthenticated && (
            <Link href="/login" style={{ textDecoration: "none", color: "#4b5563", fontWeight: 600, padding: "10px 20px" }}>
              Sign In
            </Link>
          )}
          {!isLoading && isAuthenticated && (
            <Link href="/dashboard" style={{ textDecoration: "none", color: "#4b5563", fontWeight: 600, padding: "10px 20px", background: "#e5e7eb", borderRadius: "100px" }}>
              Dashboard
            </Link>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "64px 24px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ textAlign: "center", maxWidth: 600, marginBottom: 64 }}>
          <h1 style={{ fontSize: "3.5rem", fontWeight: 800, color: "#111827", letterSpacing: "-0.04em", margin: "0 0 20px 0", lineHeight: 1.1 }}>
            Simple, transparent pricing
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#4b5563", margin: 0, lineHeight: 1.6 }}>
            Upgrade your meeting experience with our premium plans. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 32, width: "100%", maxWidth: 1000, position: "relative" }}>
          
          {/* Decorative Glow */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 400, background: "rgba(13, 148, 136, 0.15)", filter: "blur(100px)", borderRadius: "50%", zIndex: 0, pointerEvents: "none" }} />

          {/* BASIC TIER (₹59) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              position: "relative", zIndex: 1,
              flex: "1 1 340px", maxWidth: 400,
              background: "#ffffff", borderRadius: 32, padding: 40,
              boxShadow: "0 20px 40px rgba(0,0,0,0.04)",
              border: "1px solid #e5e7eb",
              display: "flex", flexDirection: "column"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <Zap size={24} color="#0d9488" />
              <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 700, color: "#111827" }}>Basic Pro</h2>
            </div>
            <p style={{ margin: "0 0 32px 0", color: "#6b7280", fontSize: "0.95rem" }}>Perfect for individuals and small teams looking for reliable video calls.</p>
            
            <div style={{ marginBottom: 32, display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#4b5563" }}>₹</span>
              <span style={{ fontSize: "3.5rem", fontWeight: 800, color: "#111827", letterSpacing: "-0.03em" }}>59</span>
              <span style={{ fontSize: "1rem", color: "#6b7280", fontWeight: 500 }}>/mo</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => handleSubscribe('Basic Pro')}
              disabled={processingPlan === 'Basic Pro'}
              style={{
                width: "100%", padding: "16px", borderRadius: 100, border: "2px solid #0d9488",
                background: "transparent", color: "#0d9488", fontSize: "1rem", fontWeight: 700, cursor: "pointer",
                marginBottom: 40, transition: "background 0.2s, color 0.2s"
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = "#0d9488"; e.currentTarget.style.color = "#fff"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#0d9488"; }}
            >
              {processingPlan === 'Basic Pro' ? "Processing..." : isAuthenticated ? "Subscribe Now" : "Sign in to Subscribe"}
            </motion.button>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: "auto" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#111827", textTransform: "uppercase", letterSpacing: "0.05em" }}>What's included</span>
              {basicFeatures.map((feature, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <Check size={18} color="#0d9488" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ color: "#4b5563", fontSize: "0.95rem" }}>{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ULTRA TIER (₹149) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              position: "relative", zIndex: 1,
              flex: "1 1 340px", maxWidth: 400,
              background: "#111827", borderRadius: 32, padding: 40,
              boxShadow: "0 24px 50px rgba(0,0,0,0.2)",
              border: "1px solid #374151",
              display: "flex", flexDirection: "column",
              overflow: "hidden"
            }}
          >
            {/* Premium Gold Accent Glow inside card */}
            <div style={{ position: "absolute", top: -50, right: -50, width: 150, height: 150, background: "rgba(251, 191, 36, 0.2)", filter: "blur(40px)", borderRadius: "50%" }} />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Star size={24} color="#fbbf24" fill="#fbbf24" />
                <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 700, color: "#fff" }}>Ultra</h2>
              </div>
              <div style={{ background: "rgba(251, 191, 36, 0.1)", color: "#fbbf24", padding: "4px 12px", borderRadius: 100, fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", border: "1px solid rgba(251, 191, 36, 0.2)" }}>
                Most Popular
              </div>
            </div>
            
            <p style={{ margin: "0 0 32px 0", color: "#9ca3af", fontSize: "0.95rem", position: "relative" }}>The ultimate meeting experience for power users and growing communities.</p>
            
            <div style={{ marginBottom: 32, display: "flex", alignItems: "baseline", gap: 4, position: "relative" }}>
              <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#9ca3af" }}>₹</span>
              <span style={{ fontSize: "3.5rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>149</span>
              <span style={{ fontSize: "1rem", color: "#9ca3af", fontWeight: 500 }}>/mo</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => handleSubscribe('Ultra')}
              disabled={processingPlan === 'Ultra'}
              style={{
                width: "100%", padding: "16px", borderRadius: 100, border: "none",
                background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)", color: "#111827", fontSize: "1rem", fontWeight: 800, cursor: "pointer",
                marginBottom: 40, boxShadow: "0 8px 24px rgba(245, 158, 11, 0.3)", position: "relative"
              }}
            >
              {processingPlan === 'Ultra' ? "Processing..." : isAuthenticated ? "Subscribe to Ultra" : "Sign in to Subscribe"}
            </motion.button>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: "auto", position: "relative" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em" }}>Everything in Basic, plus</span>
              {ultraFeatures.map((feature, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <Check size={18} color="#fbbf24" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ color: "#d1d5db", fontSize: "0.95rem" }}>{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
