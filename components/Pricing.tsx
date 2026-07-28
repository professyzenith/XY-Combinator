"use client";

import { useRef, useState, useEffect } from "react";
import { Check, Zap } from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    name: "Free",
    price: "0",
    period: "",
    description: "Perfect to get started. No credit card required.",
    highlight: false,
    features: [
      "Up to 4 participants",
      "40-min meeting limit",
      "HD video & audio",
      "Browser-based (no download)",
      "Basic chat",
      "Personal room link",
    ],
    cta: "Start for free",
    href: "/register",
  },
  {
    name: "Pro",
    price: "12",
    period: "/mo",
    description: "For power users and growing teams.",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Up to 50 participants",
      "Unlimited meeting time",
      "4K video support",
      "Screen sharing + annotation",
      "Meeting recordings (10GB)",
      "AI noise cancellation",
      "Custom room branding",
      "Calendar integrations",
    ],
    cta: "Start Pro trial",
    href: "/register?plan=pro",
  },
  {
    name: "Team",
    price: "29",
    period: "/mo",
    description: "Built for teams that collaborate daily.",
    highlight: false,
    features: [
      "Up to 100 participants",
      "Everything in Pro",
      "Unlimited cloud recordings",
      "Admin dashboard",
      "Team management",
      "Analytics & reports",
      "Priority support",
      "SSO & advanced security",
    ],
    cta: "Start Team trial",
    href: "/register?plan=team",
  },
];

export default function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="pricing"
      style={{ padding: "120px 24px", position: "relative" }}
      className="radial-glow"
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div
          ref={ref}
          style={{
            textAlign: "center",
            marginBottom: 72,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="badge badge-green" style={{ marginBottom: 20, display: "inline-flex" }}>
            <Zap size={12} />
            Transparent pricing
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              marginBottom: 16,
            }}
          >
            <span className="text-gradient">Simple pricing,</span>
            <br />
            <span className="text-gradient-white">no surprises.</span>
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            Start free. Upgrade when you need more. Cancel anytime.
          </p>
        </div>

        {/* Plans */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
            alignItems: "start",
          }}
        >
          {PLANS.map((plan, i) => (
            <div
              key={plan.name}
              style={{
                borderRadius: 24,
                padding: 32,
                position: "relative",
                background: plan.highlight ? "rgba(34,197,94,0.06)" : "var(--bg-card)",
                border: plan.highlight
                  ? "1px solid rgba(34,197,94,0.35)"
                  : "1px solid var(--border-subtle)",
                boxShadow: plan.highlight ? "0 0 60px rgba(34,197,94,0.12)" : "none",
                opacity: visible ? 1 : 0,
                transform: visible
                  ? plan.highlight ? "translateY(-8px)" : "translateY(0)"
                  : "translateY(30px)",
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
              }}
            >
              {plan.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: -14,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    color: "#fff",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    padding: "6px 18px",
                    borderRadius: 99,
                    whiteSpace: "nowrap",
                  }}
                >
                  {plan.badge}
                </div>
              )}

              <div style={{ marginBottom: 24 }}>
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: plan.highlight ? "#22c55e" : "var(--text-secondary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 12,
                  }}
                >
                  {plan.name}
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 10 }}>
                  <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)", alignSelf: "flex-start", marginTop: 8 }}>
                    $
                  </span>
                  <span
                    className="font-display"
                    style={{
                      fontSize: "3.5rem",
                      fontWeight: 800,
                      letterSpacing: "-0.04em",
                      color: "#fff",
                      lineHeight: 1,
                    }}
                  >
                    {plan.price}
                  </span>
                  <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: 6 }}>
                    {plan.period}
                  </span>
                </div>
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {plan.description}
                </p>
              </div>

              <Link
                href={plan.href}
                className={`btn ${plan.highlight ? "btn-primary" : "btn-ghost"}`}
                style={{ width: "100%", marginBottom: 28 }}
              >
                {plan.cta}
              </Link>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {plan.features.map((feature) => (
                  <div key={feature} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: "rgba(34,197,94,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Check size={11} color="#22c55e" strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
