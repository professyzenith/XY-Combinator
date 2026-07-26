"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link2, Video, Sparkles } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Link2,
    title: "Create your room",
    description:
      "Sign up in seconds. Your personal room link is ready instantly — share it anywhere, anytime. No configuration required.",
    visual: <CreateRoomVisual />,
  },
  {
    number: "02",
    icon: Video,
    title: "Invite your team",
    description:
      "Send the link via Slack, email, or text. Guests click it and join instantly — no account, no download, no waiting room.",
    visual: <InviteVisual />,
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Meet, focus, get things done",
    description:
      "Crystal-clear video, AI noise cancellation, instant screen share, and chat that keeps context alive after the call ends.",
    visual: <MeetVisual />,
  },
];

function CreateRoomVisual() {
  return (
    <div
      style={{
        padding: "20px 24px",
        background: "var(--bg-elevated)",
        borderRadius: 14,
        border: "1px solid var(--border-100)",
        fontFamily: "monospace",
        fontSize: "0.875rem",
      }}
    >
      <div style={{ color: "var(--text-400)", marginBottom: 8, fontSize: "0.75rem" }}>
        Your meeting link
      </div>
      <div style={{ color: "#4ade80", fontWeight: 600 }}>
        xycombinator.app/r/your-name
      </div>
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.2, repeat: Infinity }}
        style={{
          display: "inline-block",
          width: 2,
          height: 14,
          background: "#22c55e",
          marginLeft: 2,
          verticalAlign: "middle",
        }}
      />
      <div
        style={{
          marginTop: 20,
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        {["Copy link", "Share via Slack", "Send email"].map((a) => (
          <motion.div
            key={a}
            whileHover={{ y: -2 }}
            style={{
              padding: "6px 12px",
              borderRadius: 8,
              background: "rgba(34,197,94,0.07)",
              border: "1px solid rgba(34,197,94,0.18)",
              fontSize: "0.75rem",
              color: "#4ade80",
              cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {a}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function InviteVisual() {
  const emails = [
    { email: "alex@company.com", color: "#22c55e" },
    { email: "maria@startup.io", color: "#3b82f6" },
    { email: "sam@team.dev", color: "#a855f7" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {emails.map(({ email, color }, i) => (
        <motion.div
          key={email}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12 }}
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
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: `${color}20`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.8rem",
              color,
              fontWeight: 700,
            }}
          >
            {email[0].toUpperCase()}
          </div>
          <span style={{ fontSize: "0.82rem", color: "var(--text-300)" }}>{email}</span>
          <div
            style={{
              marginLeft: "auto",
              fontSize: "0.72rem",
              color: "#22c55e",
              fontWeight: 600,
            }}
          >
            Joined ✓
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function MeetVisual() {
  const features = [
    { label: "HD Video", active: true },
    { label: "Noise Cancel", active: true },
    { label: "Screen Share", active: false },
    { label: "Live Chat", active: false },
    { label: "Reactions", active: false },
    { label: "Recording", active: false },
  ];
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {features.map(({ label, active }) => (
        <motion.div
          key={label}
          whileHover={{ scale: 1.05 }}
          style={{
            padding: "7px 14px",
            borderRadius: 8,
            fontSize: "0.78rem",
            fontWeight: 600,
            background: active ? "rgba(34,197,94,0.1)" : "var(--bg-elevated)",
            border: active
              ? "1px solid rgba(34,197,94,0.25)"
              : "1px solid var(--border-100)",
            color: active ? "#4ade80" : "var(--text-400)",
            cursor: "default",
          }}
        >
          {label}
        </motion.div>
      ))}
    </div>
  );
}

/* ── Each step as its own component so hooks are always called at top-level ── */
function StepRow({
  step,
  index,
  isLast,
}: {
  step: (typeof STEPS)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 56,
        alignItems: "center",
        padding: "56px 0",
        borderBottom: isLast ? "none" : "1px solid var(--border-100)",
      }}
    >
      {/* Text */}
      <div style={{ order: isEven ? 0 : 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 800,
              color: "#22c55e",
              letterSpacing: "0.12em",
            }}
          >
            {step.number}
          </span>
          <div
            style={{ flex: 1, height: 1, background: "rgba(34,197,94,0.18)" }}
          />
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
            fontSize: "1.65rem",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: 14,
            color: "var(--text-100)",
            lineHeight: 1.25,
          }}
        >
          {step.title}
        </h3>
        <p
          style={{
            fontSize: "0.925rem",
            color: "var(--text-300)",
            lineHeight: 1.8,
          }}
        >
          {step.description}
        </p>
      </div>

      {/* Visual */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{
          order: isEven ? 1 : 0,
          background: "var(--bg-card)",
          border: "1px solid var(--border-100)",
          borderRadius: 20,
          padding: "32px 28px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}
      >
        {step.visual}
      </motion.div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" style={{ padding: "80px 24px" }}>
      <div className="container">
        <div className="divider" style={{ marginBottom: 72 }} />

        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 16 }}
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
          <p
            style={{
              color: "var(--text-300)",
              fontSize: "1rem",
              maxWidth: 460,
              margin: "0 auto",
              lineHeight: 1.75,
            }}
          >
            No IT setup. No enterprise contracts. No 47-step onboarding.
          </p>
        </motion.div>

        {/* Steps */}
        <div>
          {STEPS.map((step, i) => (
            <StepRow
              key={step.number}
              step={step}
              index={i}
              isLast={i === STEPS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
