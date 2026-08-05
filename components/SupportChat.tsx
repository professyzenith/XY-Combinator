"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";

// ─── Types ───────────────────────────────────────────────────────────────────
type Phase = "idle" | "form" | "sending" | "success" | "error";

// ─── Icons (inline SVGs to avoid extra deps) ─────────────────────────────────
const IconChat = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconSend = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const IconCheck = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ─── Component ───────────────────────────────────────────────────────────────
export default function SupportChat() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [hasMounted, setHasMounted] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Hydration guard
  useEffect(() => { setHasMounted(true); }, []);

  // Auto-fill if user is logged in
  useEffect(() => {
    if (!open) return;
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        const meta = data.user.user_metadata;
        setName(prev => prev || meta?.full_name || meta?.name || "");
        setEmail(prev => prev || data.user!.email || "");
      }
    });
    // stop pulse when opened
    setShowPulse(false);
    // focus textarea after animation
    setTimeout(() => textareaRef.current?.focus(), 350);
  }, [open]);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg("Please fill in all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setErrorMsg("");
    setPhase("sending");

    try {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();
      const { error } = await supabase.from("support_messages").insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        user_id: userData?.user?.id ?? null,
      });

      if (error) throw error;
      setPhase("success");
    } catch {
      setPhase("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  const handleReset = () => {
    setPhase("idle");
    setMessage("");
    setErrorMsg("");
  };

  if (!hasMounted) return null;

  // ─── Colour tokens ────────────────────────────────────────────────────────
  const bg       = "rgba(13,14,20,0.97)";
  const surface  = "rgba(255,255,255,0.05)";
  const border   = "rgba(255,255,255,0.08)";
  const accent   = "#6366f1";        // indigo
  const accentHi = "#818cf8";
  const textW    = "#f8fafc";
  const textMid  = "rgba(248,250,252,0.6)";

  return (
    <>
      {/* ─── Floating Bubble ─────────────────────────────────────────────── */}
      <div
        style={{
          position: "fixed", bottom: 28, right: 28,
          zIndex: 9000,
          display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12,
        }}
      >
        {/* Tooltip label */}
        <AnimatePresence>
          {!open && showPulse && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ delay: 2, duration: 0.4 }}
              style={{
                background: bg, color: textW,
                padding: "8px 16px", borderRadius: "100px",
                fontSize: "0.85rem", fontWeight: 700,
                border: `1px solid ${border}`,
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                backdropFilter: "blur(12px)",
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              💬 Need help? Chat with us!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bubble button */}
        <motion.button
          id="support-chat-bubble"
          onClick={() => setOpen(v => !v)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          style={{
            width: 56, height: 56, borderRadius: "50%",
            background: `linear-gradient(135deg, ${accent} 0%, #4f46e5 100%)`,
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff",
            boxShadow: `0 8px 32px rgba(99,102,241,0.45), 0 2px 8px rgba(0,0,0,0.3)`,
            position: "relative", zIndex: 1,
            transition: "box-shadow 0.2s",
          }}
          aria-label="Open support chat"
        >
          {/* Pulse ring */}
          {showPulse && (
            <span style={{
              position: "absolute", inset: -6,
              borderRadius: "50%",
              border: `2px solid ${accent}`,
              animation: "supportPulse 2s ease-out infinite",
              pointerEvents: "none",
            }} />
          )}
          <motion.div
            key={open ? "close" : "chat"}
            initial={{ rotate: -30, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 30, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <IconClose /> : <IconChat />}
          </motion.div>
        </motion.button>
      </div>

      {/* ─── Chat Panel ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="support-chat-panel"
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            style={{
              position: "fixed",
              bottom: 100, right: 28,
              zIndex: 8999,
              width: 360,
              borderRadius: 24,
              overflow: "hidden",
              background: bg,
              border: `1px solid ${border}`,
              boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 4px 16px rgba(99,102,241,0.15)",
              backdropFilter: "blur(24px)",
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            {/* Header */}
            <div style={{
              background: `linear-gradient(135deg, #3730a3 0%, #4f46e5 50%, #6366f1 100%)`,
              padding: "20px 24px",
              display: "flex", alignItems: "center", gap: 14,
            }}>
              {/* Avatar */}
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.4rem", flexShrink: 0,
                border: "2px solid rgba(255,255,255,0.3)",
              }}>🛟</div>
              <div>
                <p style={{ margin: 0, color: "#fff", fontWeight: 800, fontSize: "1rem" }}>XyncRoom Support</p>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.75)", fontSize: "0.8rem", fontWeight: 600 }}>
                  <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "#4ade80", marginRight: 5, verticalAlign: "middle" }} />
                  Usually replies in minutes
                </p>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "24px 24px 20px" }}>
              <AnimatePresence mode="wait">

                {/* ── Success Screen ── */}
                {phase === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ textAlign: "center", padding: "24px 0" }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                      style={{
                        width: 72, height: 72, borderRadius: "50%",
                        background: "rgba(34,197,94,0.12)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        margin: "0 auto 16px",
                        border: "2px solid rgba(34,197,94,0.3)",
                      }}
                    >
                      <IconCheck />
                    </motion.div>
                    <p style={{ color: textW, fontWeight: 800, fontSize: "1.1rem", margin: "0 0 8px" }}>Message Sent! 🎉</p>
                    <p style={{ color: textMid, fontSize: "0.88rem", fontWeight: 600, margin: "0 0 24px" }}>
                      We've received your message and will get back to you at <strong style={{ color: accentHi }}>{email}</strong> soon.
                    </p>
                    <button
                      onClick={handleReset}
                      style={{
                        background: surface, border: `1px solid ${border}`,
                        color: textW, padding: "10px 24px", borderRadius: "100px",
                        fontWeight: 700, fontSize: "0.9rem", cursor: "pointer",
                        fontFamily: "'Nunito', sans-serif",
                        transition: "background 0.2s",
                      }}
                      onMouseOver={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                      onMouseOut={e => (e.currentTarget.style.background = surface)}
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}

                {/* ── Form Screen ── */}
                {(phase === "idle" || phase === "sending" || phase === "error") && (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {/* Welcome bubble */}
                    <div style={{
                      background: surface,
                      border: `1px solid ${border}`,
                      borderRadius: "16px 16px 16px 4px",
                      padding: "14px 16px",
                      marginBottom: 20,
                    }}>
                      <p style={{ margin: 0, color: textW, fontWeight: 700, fontSize: "0.92rem", lineHeight: 1.5 }}>
                        Hi there! 👋 Having trouble with XyncRoom?
                      </p>
                      <p style={{ margin: "6px 0 0", color: textMid, fontSize: "0.83rem", fontWeight: 600, lineHeight: 1.5 }}>
                        Fill in the form below and we'll get back to you as soon as possible.
                      </p>
                    </div>

                    {/* Fields */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <input
                        id="support-name"
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        style={inputStyle(border, surface, textW)}
                      />
                      <input
                        id="support-email"
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={inputStyle(border, surface, textW)}
                      />
                      <textarea
                        id="support-message"
                        ref={textareaRef}
                        placeholder="Describe your issue..."
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        rows={4}
                        style={{
                          ...inputStyle(border, surface, textW),
                          resize: "none",
                          lineHeight: 1.6,
                        }}
                      />
                    </div>

                    {/* Error */}
                    <AnimatePresence>
                      {errorMsg && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          style={{
                            color: "#f87171", fontSize: "0.82rem", fontWeight: 700,
                            margin: "10px 0 0", padding: "8px 12px",
                            background: "rgba(239,68,68,0.1)",
                            borderRadius: 10, border: "1px solid rgba(239,68,68,0.2)",
                          }}
                        >
                          {errorMsg}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <motion.button
                      id="support-send-btn"
                      onClick={handleSubmit}
                      disabled={phase === "sending"}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        marginTop: 16,
                        width: "100%",
                        background: phase === "sending"
                          ? "rgba(99,102,241,0.5)"
                          : `linear-gradient(135deg, ${accent} 0%, #4f46e5 100%)`,
                        border: "none",
                        color: "#fff",
                        padding: "14px 24px",
                        borderRadius: "14px",
                        fontWeight: 800,
                        fontSize: "0.95rem",
                        cursor: phase === "sending" ? "not-allowed" : "pointer",
                        fontFamily: "'Nunito', sans-serif",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                        boxShadow: "0 4px 20px rgba(99,102,241,0.35)",
                        transition: "background 0.2s, box-shadow 0.2s",
                      }}
                    >
                      {phase === "sending" ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                            style={{
                              width: 18, height: 18,
                              border: "2.5px solid rgba(255,255,255,0.3)",
                              borderTopColor: "#fff",
                              borderRadius: "50%",
                            }}
                          />
                          Sending...
                        </>
                      ) : (
                        <><IconSend /> Send Message</>
                      )}
                    </motion.button>

                    <p style={{ textAlign: "center", color: textMid, fontSize: "0.75rem", fontWeight: 600, margin: "12px 0 0" }}>
                      🔒 Your message is private and secure
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Animation keyframe ──────────────────────────────────────────── */}
      <style>{`
        @keyframes supportPulse {
          0%   { transform: scale(1);    opacity: 0.8; }
          70%  { transform: scale(1.6);  opacity: 0;   }
          100% { transform: scale(1.6);  opacity: 0;   }
        }
        #support-chat-panel input::placeholder,
        #support-chat-panel textarea::placeholder {
          color: rgba(248,250,252,0.35);
        }
        #support-chat-panel input:focus,
        #support-chat-panel textarea:focus {
          outline: none;
          border-color: rgba(99,102,241,0.6) !important;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
        }
      `}</style>
    </>
  );
}

// ─── Shared input style ───────────────────────────────────────────────────────
function inputStyle(border: string, surface: string, textW: string): React.CSSProperties {
  return {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 12,
    border: `1px solid ${border}`,
    background: surface,
    color: textW,
    fontSize: "0.9rem",
    fontWeight: 600,
    fontFamily: "'Nunito', sans-serif",
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };
}
