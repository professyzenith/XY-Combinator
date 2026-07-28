"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";

/* ─── Muted Apple-calibrated palette ─── */
const P = {
  sage:   "#7fa898",
  steel:  "#6b8eb5",
  violet: "#9478b4",
  amber:  "#b89050",
};

/* ─── Acts ─── */
interface Act {
  id: number;
  num: string;
  label: string;
  headline: string;
  sub: string;
}

const ACTS: Act[] = [
  { id: 1, num: "01", label: "The room",    headline: "One link.\nEveryone in.",          sub: "Share a URL. Your team joins in under two seconds — no downloads, no friction." },
  { id: 2, num: "02", label: "Your team",   headline: "Every voice,\ncrystal clear.",     sub: "Adaptive HD video with AI noise removal. Every seat, every participant." },
  { id: 3, num: "03", label: "Your work",   headline: "Show what\nyou're building.",      sub: "One-click screen share. Annotate in real time. No plugins, no lag." },
  { id: 4, num: "04", label: "The thread",  headline: "Context that\noutlives the call.", sub: "Persistent chat, shared files, timestamped decisions. Nothing disappears." },
  { id: 5, num: "05", label: "The record",  headline: "Nothing\ngets lost.",              sub: "AI-generated notes, action items, and summaries delivered after every call." },
];

/* ─── Act nav — reads current active act index ─── */
function ActNav({ activeIndex }: { activeIndex: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {ACTS.map((act, i) => {
        const active = i === activeIndex;
        const past   = i < activeIndex;
        return (
          <div key={act.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: active ? 22 : 6,
              height: 1.5,
              borderRadius: 2,
              background: active
                ? "var(--accent)"
                : past ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.09)",
              transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
            }} />
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.6rem",
              letterSpacing: "0.06em",
              color: active ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.22)",
              transition: "color 0.4s ease",
              whiteSpace: "nowrap",
            }}>
              {act.num} — {act.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Screen share panel ─── */
function ScreenSharePanel({ opacity, x }: { opacity: MotionValue<number>; x: MotionValue<string> }) {
  return (
    <motion.div style={{ opacity, x }}>
      <div style={{
        borderRadius: 10,
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px) saturate(160%)",
        border: "1px solid rgba(210,210,220,0.13)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
        overflow: "hidden",
      }}>
        <div style={{
          height: 34,
          background: "rgba(255,255,255,0.03)",
          borderBottom: "1px solid rgba(210,210,220,0.09)",
          display: "flex", alignItems: "center", gap: 8,
          padding: "0 12px",
        }}>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            style={{ width: 5, height: 5, borderRadius: "50%", background: P.violet }}
          />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "rgba(255,255,255,0.3)" }}>
            Sharing: product-roadmap.fig
          </span>
        </div>
        <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 7, height: 120 }}>
          {[
            { w: "84%", c: `${P.violet}55` }, { w: "62%", c: `${P.violet}30` },
            { w: "78%", c: "rgba(255,255,255,0.07)" }, { w: "44%", c: "rgba(255,255,255,0.05)" },
            { w: "70%", c: `${P.violet}22` }, { w: "52%", c: "rgba(255,255,255,0.04)" },
          ].map((line, i) => (
            <motion.div
              key={i}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: line.w, opacity: 1 }}
              transition={{ delay: i * 0.09, duration: 0.55, ease: "easeOut" }}
              style={{ height: 7, borderRadius: 4, background: line.c }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Chat panel ─── */
function ChatPanel({ opacity, x }: { opacity: MotionValue<number>; x: MotionValue<string> }) {
  const msgs = [
    { from: "Alex",   color: P.steel,  text: "Shipping at 3pm today." },
    { from: "Maria",  color: P.violet, text: "PR is up and reviewed." },
    { from: "Zenith", color: P.sage,   text: "Strong work everyone." },
  ];
  return (
    <motion.div style={{ opacity, x }}>
      <div style={{
        borderRadius: 10,
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px) saturate(160%)",
        border: "1px solid rgba(210,210,220,0.13)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
        overflow: "hidden",
      }}>
        <div style={{
          height: 34, background: "rgba(255,255,255,0.03)",
          borderBottom: "1px solid rgba(210,210,220,0.09)",
          display: "flex", alignItems: "center", padding: "0 12px",
        }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "rgba(255,255,255,0.28)" }}>
            # general
          </span>
        </div>
        <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
          {msgs.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2, duration: 0.45 }}
              style={{ display: "flex", gap: 8, alignItems: "flex-start" }}
            >
              <div style={{
                width: 20, height: 20, borderRadius: "50%",
                background: `${msg.color}14`, border: `1px solid ${msg.color}28`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.52rem", fontWeight: 700, color: `${msg.color}cc`,
                fontFamily: "var(--font-display)", flexShrink: 0,
              }}>
                {msg.from[0]}
              </div>
              <div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.56rem", color: `${msg.color}aa`, display: "block", marginBottom: 2 }}>
                  {msg.from}
                </span>
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}>
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
function AINotesPanel({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <motion.div style={{ opacity }}>
      <div style={{
        borderRadius: 10,
        background: "rgba(127,168,152,0.05)",
        backdropFilter: "blur(20px) saturate(160%)",
        border: "1px solid rgba(127,168,152,0.18)",
        padding: 14,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)" }}
          />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--accent-text)", letterSpacing: "0.07em" }}>
            AI NOTES — LIVE
          </span>
        </div>
        {["Decision: ship v2 on Thursday", "Action: Alex to open PR by 3pm", "Action: Maria to update docs", "Next standup: tomorrow 10am"].map((note, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -5 }} animate={{ opacity: 0.52, x: 0 }}
            transition={{ delay: i * 0.2, duration: 0.4 }}
            style={{
              fontSize: "0.68rem", color: "rgba(255,255,255,0.52)", fontFamily: "var(--font-body)",
              padding: "5px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
              display: "flex", alignItems: "center", gap: 7,
            }}
          >
            <span style={{ color: "var(--accent)", opacity: 0.55, fontSize: "0.45rem" }}>●</span>
            {note}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Meeting room ─── */
function DemoMeetingRoom({ feedsVisible }: { feedsVisible: boolean }) {
  const participants = [
    { name: "Zenith", initials: "Z", color: P.sage,   speaking: true  },
    { name: "Alex",   initials: "A", color: P.steel,  speaking: false },
    { name: "Maria",  initials: "M", color: P.violet, speaking: false },
    { name: "Sam",    initials: "S", color: P.amber,  speaking: false },
  ];
  return (
    <div style={{
      borderRadius: 14, overflow: "hidden",
      background: "rgba(14,14,18,0.75)",
      backdropFilter: "blur(28px) saturate(180%)",
      border: "1px solid rgba(255,255,255,0.11)",
      boxShadow: "0 0 0 1px rgba(210,210,220,0.06), 0 24px 48px rgba(0,0,0,0.4)",
    }}>
      {/* Chrome */}
      <div style={{
        height: 38, background: "rgba(255,255,255,0.025)",
        borderBottom: "1px solid rgba(210,210,220,0.08)",
        display: "flex", alignItems: "center", padding: "0 12px", gap: 10,
      }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#ef4444","#f59e0b","#22c55e"].map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.45 }} />
          ))}
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "rgba(255,255,255,0.18)", flex: 1 }}>
          XY Combinator
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <motion.div animate={{ opacity: [1, 0.25, 1] }} transition={{ duration: 1.6, repeat: Infinity }}
            style={{ width: 5, height: 5, borderRadius: "50%", background: P.sage }}
          />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.56rem", color: P.sage, opacity: 0.8 }}>LIVE</span>
        </div>
      </div>

      {/* Feeds */}
      <motion.div
        animate={{ opacity: feedsVisible ? 1 : 0, y: feedsVisible ? 0 : 12 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 3, padding: "4px 4px 0", background: "rgba(8,8,11,0.9)",
        }}>
          {participants.map((p) => (
            <div key={p.name} style={{
              position: "relative", borderRadius: 7, overflow: "hidden",
              aspectRatio: "16/9",
              background: `linear-gradient(140deg, ${p.color}0c, rgba(10,10,14,0.97))`,
              border: p.speaking ? `1.5px solid ${p.color}45` : "1px solid rgba(210,210,220,0.07)",
              boxShadow: p.speaking ? `0 0 0 2px ${p.color}12` : "none",
            }}>
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: 32, height: 32, borderRadius: "50%",
                background: "rgba(17,17,22,0.7)", backdropFilter: "blur(6px)",
                border: `1px solid ${p.color}28`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "0.78rem",
                color: p.speaking ? p.color : `${p.color}88`,
              }}>
                {p.initials}
              </div>
              {p.speaking && (
                <motion.div animate={{ opacity: [0.8, 0.2, 0.8] }} transition={{ duration: 1.2, repeat: Infinity }}
                  style={{ position: "absolute", top: 5, right: 5, width: 5, height: 5, borderRadius: "50%", background: P.sage }}
                />
              )}
              <span style={{
                position: "absolute", bottom: 4, left: 5, fontSize: "0.52rem",
                color: "rgba(255,255,255,0.55)", background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(8px)", padding: "1px 5px", borderRadius: 3,
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
        height: 46, background: "rgba(255,255,255,0.018)", backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(210,210,220,0.06)",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      }}>
        {[0,1,2].map((i) => (
          <div key={i} style={{
            width: 28, height: 28, borderRadius: 7,
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(210,210,220,0.09)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ width: 9, height: 9, borderRadius: 2, background: "rgba(255,255,255,0.18)" }} />
          </div>
        ))}
        <div style={{ marginLeft: 6, width: 54, height: 26, borderRadius: 6, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.18)" }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCT DEMO SCENE
═══════════════════════════════════════════════════════════════════════════ */
export default function ProductDemoScene() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeAct, setActiveAct] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  /* Map scroll → active act index (0–4) */
  const actIndex = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 1, 2, 3, 4, 4]);

  useMotionValueEvent(actIndex, "change", (v) => {
    setActiveAct(Math.round(v));
  });

  /* Per-act opacities — tight transitions, no overlap */
  const act1 = useTransform(scrollYProgress, [0,    0.15,  0.20,  0.24], [1, 1, 0.5, 0]);
  const act2 = useTransform(scrollYProgress, [0.18, 0.24,  0.35,  0.40], [0, 1, 1, 0]);
  const act3 = useTransform(scrollYProgress, [0.38, 0.44,  0.55,  0.60], [0, 1, 1, 0]);
  const act4 = useTransform(scrollYProgress, [0.58, 0.64,  0.75,  0.80], [0, 1, 1, 0]);
  const act5 = useTransform(scrollYProgress, [0.78, 0.84,  1.0,   1.0 ], [0, 1, 1, 1]);
  const actOpacities = [act1, act2, act3, act4, act5];

  /* Panel entrance animations */
  const feedsVisible  = activeAct >= 1;
  const shareOpacity  = useTransform(scrollYProgress, [0.38, 0.50], [0, 1]);
  const shareX        = useTransform(scrollYProgress, [0.38, 0.50], [32, 0]);
  const chatOpacity   = useTransform(scrollYProgress, [0.58, 0.70], [0, 1]);
  const chatX         = useTransform(scrollYProgress, [0.58, 0.70], [32, 0]);
  const notesOpacity  = useTransform(scrollYProgress, [0.78, 0.90], [0, 1]);
  const roomScale     = useTransform(scrollYProgress, [0, 1], [0.94, 1.03]);

  return (
    <div
      ref={wrapperRef}
      style={{ height: "500vh", position: "relative" }}
      aria-label="Scroll to explore product features"
    >
      <div
        style={{
          position: "sticky", top: 0, height: "100vh",
          overflow: "hidden",
          display: "flex", alignItems: "center",
          /* ── Silver / frosted section background ──
             Lifts off the ambient, reads as "lighter silver" zone */
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(40px) saturate(200%)",
          WebkitBackdropFilter: "blur(40px) saturate(200%)",
          borderTop: "1px solid rgba(210,210,220,0.10)",
          borderBottom: "1px solid rgba(210,210,220,0.10)",
          /* Subtle inner top shimmer — silver edge */
          boxShadow: "0 1px 0 rgba(255,255,255,0.06) inset",
        }}
      >
        {/* Soft silver ambient inside section */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.025) 0%, transparent 70%)",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "0.35fr 1fr 0.38fr",
            gap: "var(--space-10)",
            alignItems: "center",
          }}>

            {/* ── Left: nav + copy ── */}
            <div>
              <div style={{ marginBottom: "var(--space-8)" }}>
                <ActNav activeIndex={activeAct} />
              </div>

              {/* Act headlines — only ONE visible at a time */}
              <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                {ACTS.map((act, i) => (
                  <motion.div
                    key={act.id}
                    style={{
                      position: "absolute", top: 0, left: 0, right: 0,
                      opacity: actOpacities[i],
                      pointerEvents: activeAct === i ? "auto" : "none",
                    }}
                  >
                    <h2 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.7rem, 2.8vw, 2.6rem)",
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
                      fontSize: "var(--text-sm)",
                      color: "var(--text-secondary)",
                      lineHeight: "var(--leading-relaxed)",
                      maxWidth: 260,
                      letterSpacing: "var(--tracking-body)",
                    }}>
                      {act.sub}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Center: Meeting room ── */}
            <motion.div style={{ scale: roomScale }} aria-live="polite">
              <DemoMeetingRoom feedsVisible={feedsVisible} />
            </motion.div>

            {/* ── Right: Contextual panels ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <ScreenSharePanel opacity={shareOpacity} x={shareX} />
              <ChatPanel opacity={chatOpacity} x={chatX} />
              <AINotesPanel opacity={notesOpacity} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
