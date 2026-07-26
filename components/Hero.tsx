"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Video, Users, Shield, Zap } from "lucide-react";

/* ─── Animated counter ─── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!ref.current) return;
      const progress = Math.min(timestamp / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      ref.current.textContent = Math.floor(ease * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        requestAnimationFrame(step);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ─── Floating video tile ─── */
function VideoTile({
  name,
  color,
  speaking = false,
  delay = 0,
  style = {},
}: {
  name: string;
  color: string;
  speaking?: boolean;
  delay?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        borderRadius: 16,
        overflow: "hidden",
        background: `linear-gradient(135deg, ${color}22, ${color}11)`,
        border: speaking ? `2px solid #22c55e` : "2px solid rgba(255,255,255,0.08)",
        width: 120,
        height: 90,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        position: "relative",
        boxShadow: speaking ? "0 0 20px rgba(34,197,94,0.25)" : "none",
        animation: `float ${3 + delay * 0.5}s ease-in-out ${delay * 0.3}s infinite`,
        ...style,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${color}, ${color}bb)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: "0.85rem",
          color: "#fff",
        }}
      >
        {name[0]}
      </div>
      <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
        {name}
      </span>
      {speaking && (
        <div
          style={{
            position: "absolute",
            bottom: 8,
            right: 8,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#22c55e",
            animation: "pulse-green 1.5s ease-in-out infinite",
          }}
        />
      )}
    </div>
  );
}

export default function Hero({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: 100,
        paddingBottom: 80,
      }}
      className="grid-bg radial-glow"
    >
      {/* Animated blobs */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          animation: "spin-slow 30s linear infinite",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 32,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Badge */}
        <div
          className="badge badge-green animate-fade-up"
          style={{ animationDelay: "0.1s", opacity: 0 }}
        >
          <Zap size={12} />
          Now in public beta — free forever
        </div>

        {/* Headline */}
        <h1
          className="font-display animate-fade-up"
          style={{
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            maxWidth: 900,
            opacity: 0,
            animationDelay: "0.2s",
          }}
        >
          <span className="text-gradient-white">Meet better.</span>
          <br />
          <span className="text-gradient">Work smarter.</span>
        </h1>

        {/* Subheadline */}
        <p
          className="animate-fade-up"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "var(--text-secondary)",
            maxWidth: 600,
            lineHeight: 1.7,
            opacity: 0,
            animationDelay: "0.3s",
          }}
        >
          XY Combinator reimagines video meetings — premium design, zero friction,
          and everything your team needs to move fast.
        </p>

        {/* CTA buttons */}
        <div
          className="animate-fade-up"
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            justifyContent: "center",
            opacity: 0,
            animationDelay: "0.4s",
          }}
        >
          <Link href="/register" className="btn btn-primary">
            Start for free
            <ArrowRight size={16} />
          </Link>
          <Link href="/join" className="btn btn-ghost">
            <Video size={16} />
            Join a meeting
          </Link>
        </div>

        {/* Stats row */}
        <div
          className="animate-fade-up"
          style={{
            display: "flex",
            gap: 48,
            flexWrap: "wrap",
            justifyContent: "center",
            opacity: 0,
            animationDelay: "0.5s",
            marginTop: 8,
          }}
        >
          {[
            { value: 10, suffix: "k+", label: "Active users" },
            { value: 99, suffix: ".9%", label: "Uptime" },
            { value: 50, suffix: "ms", label: "Avg latency" },
          ].map(({ value, suffix, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  fontFamily: "'Syne', sans-serif",
                  color: "#22c55e",
                  letterSpacing: "-0.03em",
                }}
              >
                <Counter target={value} suffix={suffix} />
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 2 }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Floating meeting preview */}
        <div
          className="animate-fade-up"
          style={{
            marginTop: 24,
            opacity: 0,
            animationDelay: "0.6s",
            width: "100%",
            maxWidth: 780,
          }}
        >
          <div
            className="glass"
            style={{
              borderRadius: 24,
              padding: 24,
              position: "relative",
              border: "1px solid rgba(34,197,94,0.15)",
              boxShadow: "0 0 60px rgba(34,197,94,0.1), 0 40px 80px rgba(0,0,0,0.4)",
            }}
          >
            {/* Window chrome */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 20,
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#22c55e" }} />
              <div
                style={{
                  flex: 1,
                  height: 26,
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 8,
                  marginLeft: 8,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 12,
                }}
              >
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  xycombinator.app/room/xyz-9k2a
                </span>
              </div>
            </div>

            {/* Video grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: 12,
                justifyItems: "center",
              }}
            >
              <VideoTile name="Zenith" color="#22c55e" speaking delay={0} />
              <VideoTile name="Alex" color="#3b82f6" delay={1} />
              <VideoTile name="Maria" color="#a855f7" delay={2} />
              <VideoTile name="Sam" color="#f59e0b" delay={3} />
            </div>

            {/* Meeting controls bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                marginTop: 20,
                padding: "12px 16px",
                background: "rgba(255,255,255,0.04)",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {[
                { icon: "🎤", label: "Mic", active: true },
                { icon: "📹", label: "Cam", active: true },
                { icon: "🖥️", label: "Share", active: false },
                { icon: "💬", label: "Chat", active: false },
                { icon: "👥", label: "People", active: false },
              ].map(({ icon, label, active }) => (
                <button
                  key={label}
                  title={label}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: active ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.05)",
                    border: active ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(255,255,255,0.06)",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.15)";
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(34,197,94,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                    (e.currentTarget as HTMLButtonElement).style.background = active
                      ? "rgba(34,197,94,0.15)"
                      : "rgba(255,255,255,0.05)";
                  }}
                >
                  {icon}
                </button>
              ))}
              <button
                style={{
                  padding: "10px 20px",
                  borderRadius: 12,
                  background: "rgba(239,68,68,0.15)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#ef4444",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                  marginLeft: 8,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.15)";
                }}
              >
                Leave
              </button>
            </div>
          </div>

          {/* Trust bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              marginTop: 24,
              flexWrap: "wrap",
            }}
          >
            {[
              { icon: <Shield size={14} />, text: "End-to-end encrypted" },
              { icon: <Users size={14} />, text: "Up to 100 participants" },
              { icon: <Zap size={14} />, text: "No download required" },
            ].map(({ icon, text }) => (
              <div
                key={text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: "var(--text-muted)",
                  fontSize: "0.82rem",
                }}
              >
                <span style={{ color: "#22c55e" }}>{icon}</span>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
