"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ─── Waveform bars (speaking animation) ─── */
function Waveform({ color }: { color: string }) {
  const heights = [3, 8, 14, 8, 5, 12, 6, 10, 4, 9, 14, 7, 3];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2, height: 16 }}>
      {heights.map((h, i) => (
        <motion.div
          key={i}
          animate={{ height: [h, h * 1.8, h * 0.5, h * 1.4, h] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.06,
            ease: "easeInOut",
          }}
          style={{
            width: 2,
            borderRadius: 2,
            background: color,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Camera Feed ─── */
function CameraFeed({
  name,
  initials,
  color,
  speaking,
  muted = false,
}: {
  name: string;
  initials: string;
  color: string;
  speaking: boolean;
  muted?: boolean;
}) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 10,
        overflow: "hidden",
        aspectRatio: "16/9",
        border: speaking
          ? `1.5px solid ${color}`
          : "1px solid rgba(255,255,255,0.06)",
        boxShadow: speaking
          ? `0 0 0 3px ${color}20, 0 0 24px ${color}12`
          : "none",
      }}
    >
      {/* Animated gradient background — each feed subtly breathes */}
      <motion.div
        animate={{
          background: speaking
            ? [
                `linear-gradient(160deg, ${color}18 0%, rgba(6,8,16,0.95) 100%)`,
                `linear-gradient(160deg, ${color}28 0%, rgba(6,8,16,0.85) 100%)`,
                `linear-gradient(160deg, ${color}18 0%, rgba(6,8,16,0.95) 100%)`,
              ]
            : [
                `linear-gradient(160deg, ${color}08 0%, rgba(6,8,16,0.98) 100%)`,
                `linear-gradient(160deg, ${color}12 0%, rgba(6,8,16,0.95) 100%)`,
                `linear-gradient(160deg, ${color}08 0%, rgba(6,8,16,0.98) 100%)`,
              ],
        }}
        transition={{ duration: speaking ? 1.5 : 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", inset: 0 }}
      />

      {/* Ambient glow from "camera light" */}
      <motion.div
        animate={{ opacity: speaking ? [0.6, 1, 0.6] : [0.3, 0.5, 0.3] }}
        transition={{ duration: speaking ? 1.5 : 3, repeat: Infinity }}
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 70% 60% at 50% 20%, ${color}10, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      {/* Avatar */}
      <motion.div
        animate={speaking ? { scale: [1, 1.04, 1] } : { scale: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 42,
          height: 42,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${color}35, ${color}15)`,
          border: `1px solid ${color}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800,
          fontSize: "1rem",
          color,
          boxShadow: speaking ? `0 0 16px ${color}40` : "none",
        }}
      >
        {initials}
      </motion.div>

      {/* Name tag */}
      <div
        style={{
          position: "absolute",
          bottom: 8,
          left: 8,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        {/* Waveform if speaking, name tag always */}
        {speaking && (
          <div style={{ marginRight: 2 }}>
            <Waveform color={color} />
          </div>
        )}
        <span
          style={{
            fontSize: "0.62rem",
            color: "rgba(255,255,255,0.75)",
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            padding: "2px 7px",
            borderRadius: 4,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
          }}
        >
          {name}
        </span>
        {muted && (
          <span
            style={{
              fontSize: "0.58rem",
              background: "rgba(239,68,68,0.15)",
              color: "#ef4444",
              padding: "2px 5px",
              borderRadius: 4,
            }}
          >
            muted
          </span>
        )}
      </div>

      {/* Speaking pulse top-right */}
      {speaking && (
        <motion.div
          animate={{ scale: [1, 1.6, 1], opacity: [0.9, 0.3, 0.9] }}
          transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 12px ${color}, 0 0 4px ${color}`,
          }}
        />
      )}
    </div>
  );
}

/* ─── Inline SVG Icons ─── */
const MicIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="22" />
  </svg>
);
const CamIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 8-6 4 6 4V8z" />
    <rect x="2" y="6" width="14" height="12" rx="2" />
  </svg>
);
const ShareIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="14" rx="2" />
    <path d="m8 21 4-4 4 4" />
    <path d="M12 17V13" />
  </svg>
);
const ChatIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

function CtrlBtn({ children, label, danger = false }: {
  children: React.ReactNode;
  label: string;
  danger?: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.12, y: -1 }}
      whileTap={{ scale: 0.9 }}
      title={label}
      style={{
        width: 36, height: 36, borderRadius: 9,
        background: danger ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.06)",
        border: `1px solid ${danger ? "rgba(239,68,68,0.25)" : "rgba(255,255,255,0.07)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
        color: danger ? "#ef4444" : "rgba(255,255,255,0.65)",
        flexShrink: 0,
      }}
    >
      {children}
    </motion.button>
  );
}

/* ─── Meeting Room UI ─── */
function MeetingRoomUI() {
  return (
    <div
      style={{
        borderRadius: 16,
        overflow: "hidden",
        background: "#07091a",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "0 48px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04), 0 0 80px rgba(34,197,94,0.05)",
        width: "100%",
        userSelect: "none",
      }}
    >
      {/* Chrome */}
      <div
        style={{
          height: 44,
          background: "#060814",
          borderBottom: "1px solid rgba(255,255,255,0.055)",
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
        }}
      >
        <div style={{ display: "flex", gap: 5, marginRight: 14 }}>
          {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />
          ))}
        </div>
        <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", fontFamily: "ui-monospace, monospace", flex: 1 }}>
          XY Combinator — Team Standup
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <motion.div
              animate={{ opacity: [1, 0.2, 1], scale: [1, 1.2, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }}
            />
            <span style={{ fontSize: "0.62rem", color: "rgba(34,197,94,0.8)", fontFamily: "monospace", fontWeight: 600 }}>
              LIVE
            </span>
          </div>
          <div style={{ padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.05)", fontSize: "0.62rem", color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
            04:32
          </div>
        </div>
      </div>

      {/* Video grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, background: "#050810", padding: "8px 8px 0" }}>
        <CameraFeed name="Zenith" initials="Z" color="#22c55e" speaking={true} />
        <CameraFeed name="Alex" initials="A" color="#3b82f6" speaking={false} />
        <CameraFeed name="Maria" initials="M" color="#a855f7" speaking={false} muted={true} />
        <CameraFeed name="Sam" initials="S" color="#f59e0b" speaking={false} />
      </div>

      {/* Controls */}
      <div
        style={{
          height: 58,
          background: "#060814",
          borderTop: "1px solid rgba(255,255,255,0.055)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 14px",
          marginTop: 5,
        }}
      >
        <div style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.65rem", color: "rgba(255,255,255,0.2)" }}>
          4 participants
        </div>
        <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
          <CtrlBtn label="Mute"><MicIcon /></CtrlBtn>
          <CtrlBtn label="Camera"><CamIcon /></CtrlBtn>
          <CtrlBtn label="Share screen"><ShareIcon /></CtrlBtn>
          <CtrlBtn label="Chat"><ChatIcon /></CtrlBtn>
          <div style={{ width: 1, height: 22, background: "rgba(255,255,255,0.07)", margin: "0 2px" }} />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "0 16px", height: 32, borderRadius: 8,
              background: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.25)",
              color: "#ef4444", fontSize: "0.72rem", fontWeight: 600,
              cursor: "pointer", fontFamily: "'Inter', sans-serif", letterSpacing: "-0.01em",
            }}
          >
            End call
          </motion.button>
        </div>
        <div style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.62rem", color: "rgba(255,255,255,0.18)" }}>
          e2e encrypted
        </div>
      </div>
    </div>
  );
}

/* ─── Hero ─── */
export default function Hero({ visible }: { visible: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const smoothX = useSpring(rawX, { stiffness: 50, damping: 22 });
  const smoothY = useSpring(rawY, { stiffness: 50, damping: 22 });

  const uiX       = useTransform(smoothX, [0, 1], [-10, 10]);
  const uiY       = useTransform(smoothY, [0, 1], [-6, 6]);
  const uiRotateX = useTransform(smoothY, [0, 1], [4, -4]);
  const uiRotateY = useTransform(smoothX, [0, 1], [-5, 5]);

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
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        padding: "80px 40px 60px",
      }}
    >
      {/* Subtle grid lines */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 10%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 10%, transparent 100%)",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.15fr",
            gap: 72,
            alignItems: "center",
            minHeight: "calc(100vh - 140px)",
          }}
        >
          {/* ── Left text ── */}
          <div>
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 28 }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2.8rem, 5.2vw, 5rem)",
                fontWeight: 900,
                letterSpacing: "-0.065em",
                lineHeight: 1.0,
                color: "#f0f4ff",
                marginBottom: 26,
              }}
            >
              The standard for
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #ffffff 20%, #4ade80 80%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                team communication.
              </span>
            </motion.h1>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
              transition={{ delay: 0.38, duration: 0.7 }}
              style={{
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.38)",
                lineHeight: 1.8,
                marginBottom: 40,
                maxWidth: 380,
                letterSpacing: "-0.01em",
              }}
            >
              HD video, end-to-end encrypted, zero setup. Your entire team joins in seconds &mdash; with nothing to install.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: visible ? 1 : 0 }}
              transition={{ delay: 0.52, duration: 0.6 }}
              style={{ display: "flex", gap: 14, alignItems: "center" }}
            >
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
              >
                <Link href="/register" className="btn btn-primary" style={{ padding: "14px 34px" }}>
                  Get started
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 600, damping: 30 }}>
                <Link href="/join" style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.32)", textDecoration: "none", letterSpacing: "-0.01em" }}>
                  Join a meeting →
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* ── Right: Meeting Room ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.88, y: visible ? 0 : 24 }}
            transition={{ delay: 0.3, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ x: uiX, y: uiY, rotateX: uiRotateX, rotateY: uiRotateY, transformPerspective: 900, position: "relative" }}
          >
            {/* Ambient glow behind UI */}
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                width: "85%", height: "55%",
                background: "radial-gradient(circle, rgba(34,197,94,0.12), transparent 70%)",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                filter: "blur(40px)",
                pointerEvents: "none",
                zIndex: 0,
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
