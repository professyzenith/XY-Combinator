"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ─── Waveform bars ─── */
function Waveform({ color }: { color: string }) {
  const heights = [3, 8, 14, 8, 5, 12, 6, 10, 4, 9, 14, 7, 3];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2, height: 16 }}>
      {heights.map((h, i) => (
        <motion.div
          key={i}
          animate={{ height: [h, h * 1.8, h * 0.5, h * 1.4, h] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.06, ease: "easeInOut" }}
          style={{ width: 2, borderRadius: 2, background: color, opacity: 0.7 }}
        />
      ))}
    </div>
  );
}

/* ─── Camera Feed ─── */
function CameraFeed({
  name, initials, color, speaking, muted = false, delay = 0,
}: {
  name: string; initials: string; color: string; speaking: boolean; muted?: boolean; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "relative",
        borderRadius: 8,
        overflow: "hidden",
        aspectRatio: "16/9",
        border: speaking
          ? `1.5px solid ${color}`
          : "1px solid rgba(255,255,255,0.07)",
        boxShadow: speaking ? `0 0 0 3px ${color}18, 0 0 20px ${color}10` : "none",
      }}
    >
      <motion.div
        animate={{
          background: speaking
            ? [`linear-gradient(160deg, ${color}16 0%, rgba(0,0,0,0.95) 100%)`,
               `linear-gradient(160deg, ${color}24 0%, rgba(0,0,0,0.85) 100%)`,
               `linear-gradient(160deg, ${color}16 0%, rgba(0,0,0,0.95) 100%)`]
            : [`linear-gradient(160deg, ${color}06 0%, rgba(0,0,0,0.98) 100%)`,
               `linear-gradient(160deg, ${color}10 0%, rgba(0,0,0,0.95) 100%)`,
               `linear-gradient(160deg, ${color}06 0%, rgba(0,0,0,0.98) 100%)`],
        }}
        transition={{ duration: speaking ? 1.5 : 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", inset: 0 }}
      />

      {/* Avatar */}
      <motion.div
        animate={speaking ? { scale: [1, 1.04, 1] } : { scale: 1 }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 38, height: 38, borderRadius: "50%",
          background: `linear-gradient(135deg, ${color}30, ${color}12)`,
          border: `1px solid ${color}35`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "0.9rem", color,
          boxShadow: speaking ? `0 0 14px ${color}35` : "none",
        }}
      >
        {initials}
      </motion.div>

      {/* Name + waveform */}
      <div style={{ position: "absolute", bottom: 7, left: 7, display: "flex", alignItems: "center", gap: 5 }}>
        {speaking && <Waveform color={color} />}
        <span style={{
          fontSize: "0.6rem", color: "rgba(255,255,255,0.7)",
          background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)",
          padding: "2px 6px", borderRadius: 4,
          fontFamily: "var(--font-body)", fontWeight: 500,
        }}>
          {name}
        </span>
        {muted && (
          <span style={{ fontSize: "0.55rem", background: "rgba(239,68,68,0.15)", color: "#ef4444", padding: "2px 4px", borderRadius: 3 }}>
            muted
          </span>
        )}
      </div>

      {speaking && (
        <motion.div
          animate={{ scale: [1, 1.6, 1], opacity: [0.9, 0.3, 0.9] }}
          transition={{ duration: 1.0, repeat: Infinity }}
          style={{
            position: "absolute", top: 7, right: 7,
            width: 6, height: 6, borderRadius: "50%",
            background: "var(--accent)", boxShadow: "0 0 8px var(--accent)",
          }}
        />
      )}
    </motion.div>
  );
}

/* ─── Control button ─── */
function CtrlBtn({ children, label, danger = false, active = false }: {
  children: React.ReactNode; label: string; danger?: boolean; active?: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, y: -1 }}
      whileTap={{ scale: 0.92 }}
      aria-label={label}
      title={label}
      style={{
        width: 34, height: 34, borderRadius: 8,
        background: danger ? "rgba(239,68,68,0.1)" : active ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.05)",
        border: `1px solid ${danger ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.07)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
        color: danger ? "#ef4444" : active ? "#ffffff" : "rgba(255,255,255,0.55)",
      }}
    >
      {children}
    </motion.button>
  );
}

const MicIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/>
  </svg>
);
const CamIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m22 8-6 4 6 4V8z"/><rect x="2" y="6" width="14" height="12" rx="2"/>
  </svg>
);
const ShareIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="14" rx="2"/>
    <path d="m8 21 4-4 4 4"/><path d="M12 17V13"/>
  </svg>
);

/* ─── Meeting Room ─── */
function MeetingRoomUI() {
  return (
    <div
      role="img"
      aria-label="Live meeting room interface with 4 participants"
      style={{
        borderRadius: 14,
        overflow: "hidden",
        background: "#080808",
        border: "1px solid rgba(255,255,255,0.09)",
        boxShadow:
          "0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04), 0 0 60px rgba(34,197,94,0.04)",
        width: "100%",
      }}
    >
      {/* Chrome bar */}
      <div style={{
        height: 42, background: "#050505",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", padding: "0 14px", gap: 12,
      }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
            <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.65 }} />
          ))}
        </div>
        <span style={{ flex: 1, fontSize: "0.68rem", color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono)" }}>
          XY Combinator — Engineering Standup
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* LIVE — accent green (permitted use) */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <motion.div
              animate={{ opacity: [1, 0.2, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 6px var(--accent)" }}
            />
            <span style={{ fontSize: "0.6rem", color: "var(--accent-text)", fontFamily: "var(--font-mono)", fontWeight: 600, letterSpacing: "0.08em" }}>
              LIVE
            </span>
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "rgba(255,255,255,0.22)", background: "rgba(255,255,255,0.04)", padding: "2px 7px", borderRadius: 4 }}>
            14:07
          </span>
        </div>
      </div>

      {/* Video grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, background: "#040404", padding: "6px 6px 0" }}>
        <CameraFeed name="Zenith" initials="Z" color="#22c55e" speaking={true} delay={0.1} />
        <CameraFeed name="Alex" initials="A" color="#3b82f6" speaking={false} delay={0.25} />
        <CameraFeed name="Maria" initials="M" color="#a855f7" speaking={false} muted={true} delay={0.4} />
        <CameraFeed name="Sam" initials="S" color="#f59e0b" speaking={false} delay={0.55} />
      </div>

      {/* Controls */}
      <div style={{
        height: 54, background: "#050505",
        borderTop: "1px solid rgba(255,255,255,0.055)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 14px", marginTop: 4,
      }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "rgba(255,255,255,0.18)" }}>
          4 participants
        </span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <CtrlBtn label="Toggle microphone" active><MicIcon /></CtrlBtn>
          <CtrlBtn label="Toggle camera" active><CamIcon /></CtrlBtn>
          <CtrlBtn label="Share screen"><ShareIcon /></CtrlBtn>
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.06)", margin: "0 2px" }} />
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            aria-label="End meeting call"
            style={{
              padding: "0 14px", height: 30, borderRadius: 7,
              background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.22)",
              color: "#ef4444", fontSize: "0.7rem", fontWeight: 600,
              cursor: "pointer", fontFamily: "var(--font-body)", letterSpacing: "-0.01em",
            }}
          >
            End call
          </motion.button>
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "rgba(255,255,255,0.15)" }}>
          e2e encrypted
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════════════ */
export default function Hero({ visible }: { visible: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const smoothX = useSpring(rawX, { stiffness: 60, damping: 25 });
  const smoothY = useSpring(rawY, { stiffness: 60, damping: 25 });

  const rotateX = useTransform(smoothY, [0, 1], [3, -3]);
  const rotateY = useTransform(smoothX, [0, 1], [-4, 4]);
  const uiX     = useTransform(smoothX, [0, 1], [-8, 8]);
  const uiY     = useTransform(smoothY, [0, 1], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width);
    rawY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      aria-label="Hero section — XY Combinator video meetings platform"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        padding: "var(--nav-height) var(--container-pad) 60px",
      }}
    >
      {/* Subtle dot grid overlay just in hero */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "0.9fr 1.1fr",
          gap: "var(--space-16)",
          alignItems: "center",
          minHeight: "calc(100vh - 140px)",
        }}>

          {/* ── Left: Copy ── */}
          <div>
            {/* Label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: visible ? 1 : 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "var(--space-6)" }}
            >
              <span className="section-label">Video conferencing</span>
              <div style={{ width: 40, height: 1, background: "var(--border-default)" }} />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 32 }}
              transition={{ delay: 0.18, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-display)",
                fontWeight: "var(--weight-black)",
                letterSpacing: "var(--tracking-display)",
                lineHeight: "var(--leading-tight)",
                color: "var(--text-primary)",
                marginBottom: "var(--space-6)",
              }}
            >
              The standard
              <br />
              for team
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.4) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                communication.
              </span>
            </motion.h1>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
              transition={{ delay: 0.32, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: "var(--text-lg)",
                color: "var(--text-secondary)",
                lineHeight: "var(--leading-relaxed)",
                marginBottom: "var(--space-10)",
                maxWidth: 360,
                letterSpacing: "var(--tracking-body)",
              }}
            >
              HD video, end-to-end encrypted, zero setup.
              Your team joins in seconds — with nothing to install.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
              transition={{ delay: 0.44, duration: 0.6 }}
              style={{ display: "flex", gap: "var(--space-4)", alignItems: "center", flexWrap: "wrap" }}
            >
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 600, damping: 30 }}
              >
                <Link href="/register" className="btn btn-primary" style={{ padding: "14px 36px", fontSize: "0.9rem" }}>
                  Get started
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
              >
                <Link
                  href="/join"
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--text-tertiary)",
                    textDecoration: "none",
                    letterSpacing: "var(--tracking-body)",
                    display: "flex", alignItems: "center", gap: 6,
                  }}
                >
                  Join a meeting
                  <span style={{ opacity: 0.6 }}>→</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Spec tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: visible ? 1 : 0 }}
              transition={{ delay: 0.58, duration: 0.5 }}
              style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap", marginTop: "var(--space-10)" }}
            >
              {["1080p HD", "256-bit AES", "< 2s join", "Zero plugins"].map((spec) => (
                <span key={spec} style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                  color: "var(--text-tertiary)", letterSpacing: "0.05em",
                  background: "var(--surface-1)", border: "1px solid var(--border-subtle)",
                  padding: "4px 10px", borderRadius: "var(--radius-md)",
                }}>
                  {spec}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Meeting Room UI ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.9, y: visible ? 0 : 20 }}
            transition={{ delay: 0.25, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              x: uiX, y: uiY,
              rotateX, rotateY,
              transformPerspective: 1000,
              position: "relative",
            }}
          >
            {/* Ambient glow — green accent (permitted) */}
            <motion.div
              aria-hidden="true"
              animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.06, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                width: "80%", height: "45%",
                background: "radial-gradient(circle, rgba(34,197,94,0.1), transparent 70%)",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                filter: "blur(36px)",
                pointerEvents: "none", zIndex: 0,
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <MeetingRoomUI />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
