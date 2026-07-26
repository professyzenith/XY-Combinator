"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ArrowRight, Video, Shield, Zap, ChevronRight } from "lucide-react";

/* ─── Animated gradient orbs ─── */
function Orbs() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {/* Top left orb */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.09) 0%, transparent 70%)",
          top: "-20%",
          left: "-15%",
          filter: "blur(40px)",
        }}
      />
      {/* Bottom right orb */}
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)",
          bottom: "-20%",
          right: "-10%",
          filter: "blur(60px)",
        }}
      />
      {/* Center subtle glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(34,197,94,0.04) 0%, transparent 70%)",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}

/* ─── Particle canvas ─── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      particles.length = 0;
      const count = Math.floor((canvas.width * canvas.height) / 18000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 197, 94, ${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();

    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(canvas);

    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.6 }}
    />
  );
}

/* ─── Stat item ─── */
function Stat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ textAlign: "center" }}
    >
      <div
        className="font-display"
        style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}
      >
        {value}
      </div>
      <div style={{ fontSize: "0.8rem", color: "var(--text-300)", marginTop: 6, fontWeight: 500 }}>
        {label}
      </div>
    </motion.div>
  );
}

/* ─── Meeting preview card ─── */
function MeetingPreview() {
  const participants = [
    { name: "Zenith", color: "#22c55e", speaking: true },
    { name: "Alex", color: "#3b82f6", speaking: false },
    { name: "Maria", color: "#a855f7", speaking: false },
    { name: "Sam", color: "#f59e0b", speaking: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: "100%",
        maxWidth: 700,
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Glow behind card */}
      <div
        style={{
          position: "absolute",
          inset: -40,
          background: "radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(20px)",
        }}
      />

      {/* Main card */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          borderRadius: 20,
          overflow: "hidden",
          background: "var(--bg-card)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
          position: "relative",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            padding: "14px 18px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(0,0,0,0.2)",
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
              <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
            ))}
          </div>
          <div
            style={{
              flex: 1,
              height: 24,
              background: "rgba(255,255,255,0.04)",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              paddingLeft: 10,
              fontSize: "0.7rem",
              color: "var(--text-400)",
              fontFamily: "monospace",
            }}
          >
            xycombinator.app/room/team-standup
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.2)",
              borderRadius: 6,
              padding: "3px 10px",
              fontSize: "0.7rem",
              color: "#4ade80",
              fontWeight: 600,
            }}
          >
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", animation: "pulse-green 1.5s infinite" }} />
            LIVE
          </div>
        </div>

        {/* Video grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 4,
            padding: 4,
            background: "rgba(0,0,0,0.3)",
          }}
        >
          {participants.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + i * 0.1 }}
              style={{
                borderRadius: 12,
                padding: "24px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                background: `linear-gradient(145deg, ${p.color}14, ${p.color}06)`,
                border: p.speaking
                  ? `1.5px solid ${p.color}80`
                  : "1.5px solid rgba(255,255,255,0.05)",
                position: "relative",
                minHeight: 90,
                justifyContent: "center",
                boxShadow: p.speaking ? `0 0 20px ${p.color}20` : "none",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${p.color}, ${p.color}99)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#fff",
                  boxShadow: `0 4px 16px ${p.color}40`,
                }}
              >
                {p.name[0]}
              </div>
              <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>
                {p.name}
              </span>
              {p.speaking && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#22c55e",
                    animation: "pulse-green 1.2s ease-in-out infinite",
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Controls */}
        <div
          style={{
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            borderTop: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(0,0,0,0.2)",
          }}
        >
          {[
            { emoji: "🎤", active: true },
            { emoji: "📹", active: true },
            { emoji: "🖥️", active: false },
            { emoji: "💬", active: false },
            { emoji: "👥", active: false },
          ].map(({ emoji, active }, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.18, y: -2 }}
              whileTap={{ scale: 0.88 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: active ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.05)",
                border: active ? "1px solid rgba(34,197,94,0.25)" : "1px solid rgba(255,255,255,0.06)",
                cursor: "pointer",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {emoji}
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "9px 18px",
              borderRadius: 10,
              background: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.25)",
              color: "#ef4444",
              fontSize: "0.78rem",
              fontWeight: 700,
              cursor: "pointer",
              marginLeft: 8,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            End call
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero({ visible }: { visible: boolean }) {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!visible || !headlineRef.current) return;
    const letters = headlineRef.current.querySelectorAll(".char");
    gsap.fromTo(
      letters,
      { y: 60, opacity: 0, rotateX: -30 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.02,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      }
    );
  }, [visible]);

  if (!visible) return null;

  const headline = "The future of remote work is here.";
  const words = headline.split(" ");

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
        padding: "100px 24px 60px",
      }}
    >
      <ParticleField />
      <Orbs />

      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 22,
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="badge badge-green">
            <Zap size={11} />
            Now in public beta · Free forever
          </div>
        </motion.div>

        {/* Headline with GSAP split text */}
        <h1
          ref={headlineRef}
          className="font-display"
          style={{
            fontSize: "clamp(2.6rem, 6.5vw, 5.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            maxWidth: 860,
            perspective: "800px",
            overflow: "hidden",
          }}
        >
          {words.map((word, wi) => (
            <span key={wi} style={{ display: "inline-block", marginRight: "0.25em", overflow: "hidden" }}>
              {word.split("").map((char, ci) => (
                <span
                  key={ci}
                  className="char"
                  style={{
                    display: "inline-block",
                    color: ["future", "remote", "here."].includes(word.toLowerCase()) ? undefined : "#fff",
                    background:
                      ["future", "remote", "here."].includes(word.toLowerCase())
                        ? "linear-gradient(135deg, #4ade80, #22c55e)"
                        : undefined,
                    WebkitBackgroundClip:
                      ["future", "remote", "here."].includes(word.toLowerCase()) ? "text" : undefined,
                    WebkitTextFillColor:
                      ["future", "remote", "here."].includes(word.toLowerCase()) ? "transparent" : undefined,
                    backgroundClip:
                      ["future", "remote", "here."].includes(word.toLowerCase()) ? "text" : undefined,
                    opacity: 0,
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "var(--text-300)",
            maxWidth: 540,
            lineHeight: 1.75,
            fontWeight: 400,
          }}
        >
          XY Combinator gives your team a meeting space that&apos;s fast, beautiful,
          and completely free — no downloads, no friction.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}
        >
          <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 500, damping: 30 }}>
            <Link href="/register" className="btn btn-primary" style={{ padding: "15px 32px", fontSize: "0.95rem" }}>
              Start for free
              <ArrowRight size={16} />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 500, damping: 30 }}>
            <Link href="/join" className="btn btn-ghost" style={{ padding: "15px 32px", fontSize: "0.95rem" }}>
              <Video size={15} />
              Join a meeting
            </Link>
          </motion.div>
        </motion.div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-400)", fontSize: "0.8rem" }}
        >
          <Shield size={12} style={{ color: "#22c55e" }} />
          End-to-end encrypted &nbsp;·&nbsp; No credit card &nbsp;·&nbsp; Works in any browser
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          style={{
            display: "flex",
            gap: 60,
            justifyContent: "center",
            flexWrap: "wrap",
            padding: "20px 40px",
            borderRadius: 16,
            background: "rgba(255,255,255,0.02)",
            border: "1px solid var(--border-100)",
            marginTop: 8,
          }}
        >
          <Stat value="10k+" label="Active users" delay={0} />
          <div style={{ width: 1, background: "var(--border-100)" }} />
          <Stat value="99.9%" label="Uptime SLA" delay={0.1} />
          <div style={{ width: 1, background: "var(--border-100)" }} />
          <Stat value="< 50ms" label="Avg latency" delay={0.2} />
        </motion.div>

        {/* Hero visual */}
        <div style={{ width: "100%", marginTop: 24 }}>
          <MeetingPreview />
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
        >
          <span style={{ fontSize: "0.72rem", color: "var(--text-500)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronRight size={14} color="var(--text-500)" style={{ transform: "rotate(90deg)" }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
