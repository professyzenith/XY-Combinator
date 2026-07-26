"use client";

import { useRef, useEffect, useState } from "react";
import { Video, MessageSquare, Share2, Shield, Zap, Globe, Users, Mic } from "lucide-react";

const FEATURES = [
  {
    icon: <Video size={22} />,
    title: "HD Video & Audio",
    description:
      "Crystal-clear 1080p video with noise-cancelling AI audio. Every call feels like you're in the same room.",
    color: "#22c55e",
  },
  {
    icon: <Shield size={22} />,
    title: "End-to-End Encrypted",
    description:
      "Every meeting is encrypted by default. Zero data stored on our servers. Your conversations stay private.",
    color: "#3b82f6",
  },
  {
    icon: <Share2 size={22} />,
    title: "Screen Sharing",
    description:
      "Share your screen, a single window, or browser tab in one click. Annotate in real-time together.",
    color: "#a855f7",
  },
  {
    icon: <MessageSquare size={22} />,
    title: "Live Chat",
    description:
      "Real-time chat with reactions, file sharing, and persistent history. Never lose important context.",
    color: "#f59e0b",
  },
  {
    icon: <Mic size={22} />,
    title: "AI Noise Cancellation",
    description:
      "Background noise removed automatically. Works on construction sites, coffee shops, anywhere.",
    color: "#ec4899",
  },
  {
    icon: <Globe size={22} />,
    title: "No Download Required",
    description:
      "Works in any modern browser. Send a link, they join instantly. Zero friction for guests.",
    color: "#06b6d4",
  },
  {
    icon: <Users size={22} />,
    title: "Up to 100 Participants",
    description:
      "Host team standups, all-hands, webinars, or 1-on-1s. Scales to your needs effortlessly.",
    color: "#22c55e",
  },
  {
    icon: <Zap size={22} />,
    title: "Instant Join Links",
    description:
      "One-click meeting rooms with persistent links. Schedule, share, and join in seconds.",
    color: "#f59e0b",
  },
];

function FeatureCard({
  icon,
  title,
  description,
  color,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="card"
      style={{
        padding: 28,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s, border-color 0.3s ease, box-shadow 0.3s ease`,
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${color}44`;
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${color}12, 0 20px 40px rgba(0,0,0,0.3)`;
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-subtle)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: `${color}15`,
          border: `1px solid ${color}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: color,
          marginBottom: 18,
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontSize: "1.05rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: 10,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
        {description}
      </p>
    </div>
  );
}

export default function Features() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" style={{ padding: "120px 24px", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Section header */}
        <div
          ref={titleRef}
          style={{
            textAlign: "center",
            marginBottom: 72,
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="badge badge-green" style={{ marginBottom: 20, display: "inline-flex" }}>
            Everything you need
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              marginBottom: 20,
            }}
          >
            <span className="text-gradient-white">Built different.</span>
            <br />
            <span className="text-gradient">Works better.</span>
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Every feature designed to make your meetings faster, cleaner, and more productive
            than anything else out there.
          </p>
        </div>

        {/* Features grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
