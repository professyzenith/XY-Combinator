"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ─── Types ─── */
interface Act {
  id: number;
  label: string;
  headline: string;
  sub: string;
  accentColor: string;
}

const ACTS: Act[] = [
  { id: 1, label: "01 — The room", headline: "One link.\nEveryone in.", sub: "Share a URL. Your team joins in under two seconds, no downloads, no friction.", accentColor: "#ffffff" },
  { id: 2, label: "02 — Your team", headline: "Every voice,\ncrystal clear.", sub: "HD video with adaptive bitrate and AI noise removal. Every seat, every participant.", accentColor: "#3b82f6" },
  { id: 3, label: "03 — Your work", headline: "Show what\nyou're building.", sub: "One-click screen share. Annotate in real time. No plugins, no lag.", accentColor: "#a855f7" },
  { id: 4, label: "04 — The thread", headline: "Context that\noutlives the call.", sub: "Persistent chat, shared files, timestamped decisions. Nothing disappears.", accentColor: "#f59e0b" },
  { id: 5, label: "05 — The record", headline: "Nothing\ngets lost.", sub: "AI-generated notes, action items, and summaries — delivered after every call.", accentColor: "#22c55e" },
];

/* ─── Progress indicator (left side) ─── */
function ActNav({ progress, accentColor }: { progress: number; accentColor: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {ACTS.map((act, i) => {
        const start = i / ACTS.length;
        const end = (i + 1) / ACTS.length;
        const isActive = progress >= start && progress < end;
        const isPast = progress >= end;
        return (
          <div key={act.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: isActive ? 24 : 8,
              height: 2,
              borderRadius: 2,
              background: isActive ? accentColor : isPast ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)",
              transition: "all 0.4s ease",
            }} />
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.06em",
              color: isActive ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
              transition: "color 0.4s ease",
              whiteSpace: "nowrap",
            }}>
              {act.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Screen share panel ─── */
function ScreenSharePanel({ opacity, x }: { opacity: number; x: number }) {
  return (
    <motion.div
      style={{ opacity, x }}
      aria-hidden="true"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div style={{
        borderRadius: 10,
        border: "1px solid rgba(168,85,247,0.25)",
        background: "#0c0c14",
        overflow: "hidden",
        width: "100%",
      }}>
        {/* Screen share header */}
        <div style={{
          height: 36, background: "#08080f",
          borderBottom: "1px solid rgba(168,85,247,0.12)",
          display: "flex", alignItems: "center", gap: 8, padding: "0 12px",
        }}>
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#a855f7", boxShadow: "0 0 6px #a855f7" }}
          />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "rgba(168,85,247,0.7)" }}>
            Sharing: product-roadmap.fig
          </span>
        </div>
        {/* Fake code/presentation area */}
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8, height: 140 }}>
          {[
            { w: "85%", c: "rgba(168,85,247,0.5)" },
            { w: "65%", c: "rgba(168,85,247,0.3)" },
            { w: "75%", c: "rgba(255,255,255,0.08)" },
            { w: "45%", c: "rgba(255,255,255,0.06)" },
            { w: "80%", c: "rgba(168,85,247,0.25)" },
            { w: "55%", c: "rgba(255,255,255,0.05)" },
          ].map((line, i) => (
            <motion.div
              key={i}
              initial={{ width: 0 }}
              animate={{ width: line.w }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
              style={{ height: 8, borderRadius: 4, background: line.c }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Chat panel ─── */
function ChatPanel({ opacity, x }: { opacity: number; x: number }) {
  const messages = [
    { from: "Alex", color: "#3b82f6", text: "Shipping at 3pm today." },
    { from: "Maria", color: "#a855f7", text: "Confirmed — PR is up." },
    { from: "Zenith", color: "#22c55e", text: "Strong work everyone." },
  ];
  return (
    <motion.div style={{ opacity, x }} aria-hidden="true">
      <div style={{
        borderRadius: 10,
        border: "1px solid rgba(245,158,11,0.2)",
        background: "#0e0b00",
        overflow: "hidden",
        width: "100%",
      }}>
        <div style={{
          height: 36, background: "#09070a",
          borderBottom: "1px solid rgba(245,158,11,0.1)",
          display: "flex", alignItems: "center", padding: "0 12px",
        }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "rgba(245,158,11,0.6)" }}>
            # general
          </span>
        </div>
        <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.25, duration: 0.4 }}
              style={{ display: "flex", gap: 8, alignItems: "flex-start" }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: "50%",
                background: `${msg.color}18`,
                border: `1px solid ${msg.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.55rem", fontWeight: 700, color: msg.color, flexShrink: 0,
                fontFamily: "var(--font-display)",
              }}>
                {msg.from[0]}
              </div>
              <div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: msg.color, display: "block", marginBottom: 2 }}>
                  {msg.from}
                </span>
                <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)" }}>
                  {msg.text}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── AI Notes panel ─── */
function AINotesPanel({ opacity }: { opacity: number }) {
  return (
    <motion.div style={{ opacity }} aria-hidden="true">
      <div style={{
        borderRadius: 10,
        border: "1px solid rgba(34,197,94,0.2)",
        background: "#030a05",
        padding: "14px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }}
          />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--accent-text)", letterSpacing: "0.06em" }}>
            AI NOTES — LIVE
          </span>
        </div>
        {[
          "Decision: ship v2 on Thursday",
          "Action: Alex to open PR by 3pm",
          "Action: Maria to update docs",
          "Next standup: tomorrow 10am",
        ].map((note, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 0.55, x: 0 }}
            transition={{ delay: i * 0.2, duration: 0.4 }}
            style={{
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.55)",
              fontFamily: "var(--font-body)",
              padding: "5px 0",
              borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
              display: "flex", alignItems: "center", gap: 8,
            }}
          >
            <span style={{ color: "var(--accent)", opacity: 0.6, fontSize: "0.5rem" }}>●</span>
            {note}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCT DEMO SCENE
   400vh tall — content pinned with sticky, driven by scroll position
═══════════════════════════════════════════════════════════════════════════ */
export default function ProductDemoScene() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  /* ── Map scroll → per-act progress ─── */
  // Act 1: 0–0.20
  // Act 2: 0.20–0.40
  // Act 3: 0.40–0.60
  // Act 4: 0.60–0.80
  // Act 5: 0.80–1.00

  // Text — current headline
  const act1Opacity   = useTransform(scrollYProgress, [0, 0.12, 0.18, 0.22], [1, 1, 1, 0]);
  const act2Opacity   = useTransform(scrollYProgress, [0.18, 0.22, 0.38, 0.42], [0, 1, 1, 0]);
  const act3Opacity   = useTransform(scrollYProgress, [0.38, 0.42, 0.58, 0.62], [0, 1, 1, 0]);
  const act4Opacity   = useTransform(scrollYProgress, [0.58, 0.62, 0.78, 0.82], [0, 1, 1, 0]);
  const act5Opacity   = useTransform(scrollYProgress, [0.78, 0.82, 1.0, 1.0], [0, 1, 1, 1]);

  // Camera feeds — slide in at act 2
  const feedsOpacity  = useTransform(scrollYProgress, [0.18, 0.30], [0, 1]);
  const feedsY        = useTransform(scrollYProgress, [0.18, 0.30], [20, 0]);

  // Screen share — act 3
  const shareOpacity  = useTransform(scrollYProgress, [0.38, 0.48], [0, 1]);
  const shareX        = useTransform(scrollYProgress, [0.38, 0.48], [40, 0]);

  // Chat — act 4
  const chatOpacity   = useTransform(scrollYProgress, [0.58, 0.68], [0, 1]);
  const chatX         = useTransform(scrollYProgress, [0.58, 0.68], [40, 0]);

  // AI notes — act 5
  const notesOpacity  = useTransform(scrollYProgress, [0.78, 0.88], [0, 1]);

  // Meeting room scale — grows slightly as demo progresses
  const meetingScale  = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.02]);

  // Accent color — shifts by act
  const rawProgress   = scrollYProgress;

  return (
    /* Outer wrapper — 500vh gives the scroll space */
    <div
      ref={wrapperRef}
      style={{ height: "500vh", position: "relative" }}
      aria-label="Interactive product demonstration"
    >
      {/* Pinned inner — stays fixed for the whole scroll range */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "0.35fr 1fr 0.35fr",
            gap: "var(--space-12)",
            alignItems: "center",
          }}>

            {/* ── Left: Act navigation + copy ── */}
            <div>
              {/* Act nav */}
              <motion.div style={{ marginBottom: "var(--space-10)" }}>
                <ActNav progress={0} accentColor="#ffffff" />
              </motion.div>

              {/* Act copy — one visible at a time */}
              <div style={{ position: "relative", height: 180 }}>
                {ACTS.map((act, i) => {
                  const opacities = [act1Opacity, act2Opacity, act3Opacity, act4Opacity, act5Opacity];
                  return (
                    <motion.div
                      key={act.id}
                      style={{
                        position: "absolute",
                        top: 0, left: 0, right: 0,
                        opacity: opacities[i],
                      }}
                    >
                      <h2 style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                        fontWeight: "var(--weight-black)",
                        letterSpacing: "var(--tracking-h1)",
                        lineHeight: "var(--leading-tight)",
                        color: "var(--text-primary)",
                        marginBottom: "var(--space-4)",
                        whiteSpace: "pre-line",
                      }}>
                        {act.headline}
                      </h2>
                      <p style={{
                        fontSize: "var(--text-base)",
                        color: "var(--text-secondary)",
                        lineHeight: "var(--leading-relaxed)",
                        letterSpacing: "var(--tracking-body)",
                        maxWidth: 260,
                      }}>
                        {act.sub}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* ── Center: Meeting room UI ── */}
            <motion.div style={{ scale: meetingScale }} aria-live="polite" aria-label="Meeting room demo updating as you scroll">
              <div style={{
                borderRadius: 14,
                overflow: "hidden",
                background: "#080808",
                border: "1px solid rgba(255,255,255,0.09)",
                boxShadow: "0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)",
              }}>
                {/* Chrome */}
                <div style={{
                  height: 40, background: "#040404",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  display: "flex", alignItems: "center", padding: "0 14px", gap: 10,
                }}>
                  <div style={{ display: "flex", gap: 5 }}>
                    {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
                      <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.6 }} />
                    ))}
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(255,255,255,0.2)", flex: 1 }}>
                    XY Combinator
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                      style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 6px var(--accent)" }}
                    />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--accent-text)" }}>LIVE</span>
                  </div>
                </div>

                {/* Video feeds — fade in at act 2 */}
                <motion.div
                  style={{ opacity: feedsOpacity, y: feedsY }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, padding: "5px 5px 0", background: "#030303" }}>
                    {[
                      { name: "Zenith", initials: "Z", color: "#22c55e", speaking: true },
                      { name: "Alex", initials: "A", color: "#3b82f6", speaking: false },
                      { name: "Maria", initials: "M", color: "#a855f7", speaking: false },
                      { name: "Sam", initials: "S", color: "#f59e0b", speaking: false },
                    ].map((p, i) => (
                      <div key={p.name} style={{
                        position: "relative",
                        borderRadius: 7,
                        overflow: "hidden",
                        aspectRatio: "16/9",
                        border: p.speaking ? `1.5px solid ${p.color}` : "1px solid rgba(255,255,255,0.06)",
                        background: `linear-gradient(135deg, ${p.color}10, #020202)`,
                      }}>
                        <div style={{
                          position: "absolute", top: "50%", left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 34, height: 34, borderRadius: "50%",
                          background: `${p.color}18`, border: `1px solid ${p.color}30`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "var(--font-display)", fontWeight: 900,
                          fontSize: "0.85rem", color: p.color,
                        }}>
                          {p.initials}
                        </div>
                        {p.speaking && (
                          <motion.div
                            animate={{ opacity: [0.8, 0.2, 0.8] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            style={{
                              position: "absolute", top: 6, right: 6,
                              width: 5, height: 5, borderRadius: "50%",
                              background: "var(--accent)", boxShadow: "0 0 6px var(--accent)",
                            }}
                          />
                        )}
                        <span style={{
                          position: "absolute", bottom: 5, left: 6,
                          fontSize: "0.55rem", color: "rgba(255,255,255,0.6)",
                          background: "rgba(0,0,0,0.6)", padding: "1px 5px", borderRadius: 3,
                          fontFamily: "var(--font-body)",
                        }}>
                          {p.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Controls */}
                <div style={{
                  height: 48, background: "#040404",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}>
                  {["Mic", "Camera", "Share"].map((ctrl) => (
                    <div key={ctrl} style={{
                      width: 30, height: 30, borderRadius: 7,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: "rgba(255,255,255,0.2)" }} />
                    </div>
                  ))}
                  <div style={{ marginLeft: 4, width: 60, height: 28, borderRadius: 6, background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.2)" }} />
                </div>
              </div>
            </motion.div>

            {/* ── Right: Contextual panel (share/chat/notes) ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <ScreenSharePanel opacity={shareOpacity.get()} x={shareX.get()} />
              <ChatPanel opacity={chatOpacity.get()} x={chatX.get()} />
              <AINotesPanel opacity={notesOpacity.get()} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
