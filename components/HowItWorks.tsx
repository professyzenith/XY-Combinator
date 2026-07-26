"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link2, Video, Sparkles } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Link2,
    title: "Create your room",
    description: "Sign up in seconds. Your personal room link is ready instantly — share it anywhere, anytime. No configuration required.",
    visual: (
      <div style={{ padding: "20px 24px", background: "var(--bg-elevated)", borderRadius: 14, border: "1px solid var(--border-100)", fontFamily: "monospace", fontSize: "0.85rem" }}>
        <div style={{ color: "var(--text-400)", marginBottom: 8 }}>Your meeting link</div>
        <div style={{ color: "#4ade80", fontWeight: 600 }}>xycombinator.app/r/your-name</div>
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ display: "inline-block", width: 2, height: 14, background: "#22c55e", marginLeft: 2, verticalAlign: "middle" }}
        />
      </div>
    ),
  },
  {
    number: "02",
    icon: Video,
    title: "Invite your team",
    description: "Send the link via Slack, email, or text. Your guests click it and join instantly — no account, no download, no waiting room hell.",
    visual: (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {["alex@company.com", "maria@startup.io", "sam@team.dev"].map((email, i) => (
          <motion.div
            key={email}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              background: "var(--bg-elevated)",
              borderRadius: 10,
              border: "1px solid var(--border-100)",
            }}
          >
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: ["#22c55e", "#3b82f6", "#a855f7"][i] + "25", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", color: ["#22c55e", "#3b82f6", "#a855f7"][i], fontWeight: 700 }}>
              {email[0].toUpperCase()}
            </div>
            <span style={{ fontSize: "0.82rem", color: "var(--text-300)" }}>{email}</span>
            <div style={{ marginLeft: "auto", fontSize: "0.72rem", color: "#22c55e", fontWeight: 600 }}>Invited ✓</div>
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Meet, focus, get things done",
    description: "Crystal-clear video, AI noise cancellation, instant screen share, and a chat that keeps context alive after the call ends.",
    visual: (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[
          { label: "HD Video", active: true },
          { label: "Noise Cancel", active: true },
          { label: "Screen Share", active: false },
          { label: "Live Chat", active: false },
          { label: "Reactions", active: false },
          { label: "Recording", active: false },
        ].map(({ label, active }) => (
          <motion.div
            key={label}
            whileHover={{ scale: 1.05 }}
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              fontSize: "0.78rem",
              fontWeight: 600,
              background: active ? "rgba(34,197,94,0.1)" : "var(--bg-elevated)",
              border: active ? "1px solid rgba(34,197,94,0.25)" : "1px solid var(--border-100)",
              color: active ? "#4ade80" : "var(--text-400)",
            }}
          >
            {label}
          </motion.div>
        ))}
      </div>
    ),
  },
];

export default function HowItWorks() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" className="section">
      <div className="container">
        <div className="divider" style={{ marginBottom: 80 }} />

        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 72 }}
        >
          <div className="badge badge-green" style={{ marginBottom: 20 }}>
            How it works
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              marginBottom: 16,
              lineHeight: 1.1,
            }}
          >
            <span style={{ color: "var(--text-100)" }}>Up and running</span>
            <br />
            <span className="text-gradient-green">in under 60 seconds.</span>
          </h2>
          <p style={{ color: "var(--text-300)", fontSize: "1.05rem", maxWidth: 480, margin: "0 auto", lineHeight: 1.75 }}>
            No IT setup. No enterprise contracts. No 47-step onboarding.
          </p>
        </motion.div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {STEPS.map((step, i) => {
            const ref = useRef<HTMLDivElement>(null);
            const inView = useInView(ref, { once: true, margin: "-60px" });
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={step.number}
                ref={ref}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 60,
                  alignItems: "center",
                  padding: "48px 0",
                  borderBottom: i < STEPS.length - 1 ? "1px solid var(--border-100)" : "none",
                }}
              >
                {/* Text side */}
                <div style={{ order: isEven ? 0 : 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                    <span
                      className="font-display"
                      style={{ fontSize: "0.75rem", fontWeight: 800, color: "#22c55e", letterSpacing: "0.1em" }}
                    >
                      {step.number}
                    </span>
                    <div style={{ flex: 1, height: 1, background: "rgba(34,197,94,0.2)" }} />
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: "rgba(34,197,94,0.08)",
                        border: "1px solid rgba(34,197,94,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#22c55e",
                      }}
                    >
                      <step.icon size={16} />
                    </div>
                  </div>

                  <h3
                    className="font-display"
                    style={{
                      fontSize: "1.7rem",
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      marginBottom: 16,
                      color: "var(--text-100)",
                      lineHeight: 1.2,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-300)", lineHeight: 1.8 }}>
                    {step.description}
                  </p>
                </div>

                {/* Visual side */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  style={{
                    order: isEven ? 1 : 0,
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-100)",
                    borderRadius: 20,
                    padding: "32px 28px",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                  }}
                >
                  {step.visual}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
