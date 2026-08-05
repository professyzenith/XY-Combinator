"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";

// Emerald colour tokens
const E = {
  solid:   "#10b981",
  dark:    "#059669",
  light:   "#34d399",
  grad:    "linear-gradient(135deg, #059669 0%, #10b981 100%)",
  gradH:   "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
  headerG: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
  glow:    "rgba(16,185,129,0.45)",
  ring:    "rgba(16,185,129,0.35)",
  soft:    "rgba(16,185,129,0.1)",
};

type Phase = "idle" | "sending" | "success" | "error";

const IconChat = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const IconX = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
// Headset icon — the real support symbol
const IconHeadset = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

export default function SupportChat() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [hasMounted, setHasMounted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { setHasMounted(true); }, []);

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
    setTimeout(() => textareaRef.current?.focus(), 300);
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

  return (
    <>
      {/* ── Floating Bubble ─────────────────────────────── */}
      <motion.button
        id="support-bubble"
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Support chat"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9900,
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: open
            ? "rgba(30,40,35,0.95)"
            : E.grad,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          boxShadow: open
            ? "0 4px 20px rgba(0,0,0,0.3)"
            : `0 6px 24px ${E.glow}`,
          transition: "background 0.25s, box-shadow 0.25s",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "x" : "chat"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{ display: "flex" }}
          >
            {open ? <IconX /> : <IconChat />}
          </motion.span>
        </AnimatePresence>

        {/* Pulse ring (when closed) */}
        {!open && (
          <span style={{
            position: "absolute",
            inset: -5,
            borderRadius: "50%",
            border: `2px solid ${E.solid}`,
            animation: "chatPulse 2.4s ease-out infinite",
            pointerEvents: "none",
          }} />
        )}
      </motion.button>

      {/* ── Chat Panel ──────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="support-panel"
            key="panel"
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 460, damping: 34 }}
            style={{
              position: "fixed",
              bottom: 88,
              right: 24,
              zIndex: 9899,
              width: "min(340px, calc(100vw - 48px))",
              borderRadius: 20,
              overflow: "hidden",
              background: "rgba(12,12,18,0.97)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.55), 0 2px 12px rgba(99,102,241,0.12)",
              backdropFilter: "blur(20px)",
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            {/* Header */}
            <div style={{
              background: E.headerG,
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}>
              <div style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                border: "1.5px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                flexShrink: 0,
              }}><IconHeadset /></div>
              <div>
                <p style={{ margin: 0, color: "#fff", fontWeight: 800, fontSize: "0.95rem" }}>
                  XyncRoom Support
                </p>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.65)", fontSize: "0.75rem", fontWeight: 600 }}>
                  We'll reply to your email
                </p>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "18px 20px 20px" }}>
              <AnimatePresence mode="wait">

                {/* ── Success ── */}
                {phase === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ textAlign: "center", padding: "20px 0 12px" }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 280, delay: 0.1 }}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        background: E.soft,
                        border: `2px solid ${E.ring}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 14px",
                        fontSize: "1.8rem",
                      }}
                    >
                      ✅
                    </motion.div>
                    <p style={{ color: "#f8fafc", fontWeight: 800, fontSize: "1rem", margin: "0 0 6px" }}>
                      Message Sent!
                    </p>
                    <p style={{ color: "rgba(248,250,252,0.55)", fontSize: "0.82rem", fontWeight: 600, margin: "0 0 20px", lineHeight: 1.5 }}>
                      We'll get back to you at<br />
                      <span style={{ color: "#818cf8" }}>{email}</span>
                    </p>
                    <button
                      onClick={handleReset}
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#f8fafc",
                        padding: "9px 22px",
                        borderRadius: "100px",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        fontFamily: "'Nunito', sans-serif",
                      }}
                    >
                      Send another
                    </button>
                  </motion.div>
                )}

                {/* ── Form ── */}
                {phase !== "success" && (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                    {/* Welcome bubble */}
                    <div style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: "14px 14px 14px 4px",
                      padding: "12px 14px",
                      marginBottom: 16,
                    }}>
                      <p style={{ margin: 0, color: "#f8fafc", fontWeight: 700, fontSize: "0.88rem", lineHeight: 1.5 }}>
                        👋 Hi! Having trouble with XyncRoom? Tell us below and we'll help you out.
                      </p>
                    </div>

                    {/* Inputs */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <input
                        id="support-name"
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={e => { setName(e.target.value); setErrorMsg(""); }}
                        style={fieldStyle}
                      />
                      <input
                        id="support-email"
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={e => { setEmail(e.target.value); setErrorMsg(""); }}
                        style={fieldStyle}
                      />
                      <textarea
                        id="support-message"
                        ref={textareaRef}
                        placeholder="Describe your issue..."
                        value={message}
                        onChange={e => { setMessage(e.target.value); setErrorMsg(""); }}
                        rows={3}
                        style={{ ...fieldStyle, resize: "none", lineHeight: 1.6 }}
                      />
                    </div>

                    {/* Error */}
                    <AnimatePresence>
                      {errorMsg && (
                        <motion.p
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          style={{
                            color: "#fca5a5",
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            margin: 0,
                            padding: "7px 12px",
                            background: "rgba(239,68,68,0.1)",
                            borderRadius: 10,
                            border: "1px solid rgba(239,68,68,0.2)",
                          }}
                        >
                          {errorMsg}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <motion.button
                      id="support-send"
                      onClick={handleSubmit}
                      disabled={phase === "sending"}
                      whileHover={phase !== "sending" ? { scale: 1.02 } : {}}
                      whileTap={phase !== "sending" ? { scale: 0.98 } : {}}
                      style={{
                        marginTop: 14,
                        width: "100%",
                        background: phase === "sending"
                          ? "rgba(16,185,129,0.35)"
                          : E.grad,
                        border: "none",
                        color: "#fff",
                        padding: "13px 20px",
                        borderRadius: 13,
                        fontWeight: 800,
                        fontSize: "0.9rem",
                        cursor: phase === "sending" ? "not-allowed" : "pointer",
                        fontFamily: "'Nunito', sans-serif",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        boxShadow: phase !== "sending" ? `0 4px 16px ${E.ring}` : "none",
                        transition: "background 0.2s, box-shadow 0.2s",
                      }}
                    >
                      {phase === "sending" ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.75, ease: "linear" }}
                            style={{
                              width: 16, height: 16,
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

                    <p style={{
                      textAlign: "center",
                      color: "rgba(248,250,252,0.3)",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      margin: "10px 0 0",
                    }}>
                      🔒 Private & secure
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyframes */}
      <style>{`
        @keyframes chatPulse {
          0%   { transform: scale(1);   opacity: 0.9; }
          70%  { transform: scale(1.7); opacity: 0;   }
          100% { transform: scale(1.7); opacity: 0;   }
        }
        #support-panel input::placeholder,
        #support-panel textarea::placeholder {
          color: rgba(248,250,252,0.28);
        }
        #support-panel input:focus,
        #support-panel textarea:focus {
          outline: none;
          border-color: rgba(16,185,129,0.55) !important;
          box-shadow: 0 0 0 3px rgba(16,185,129,0.12);
        }
      `}</style>
    </>
  );
}

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 13px",
  borderRadius: 11,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.04)",
  color: "#f8fafc",
  fontSize: "0.88rem",
  fontWeight: 600,
  fontFamily: "'Nunito', sans-serif",
  boxSizing: "border-box",
  transition: "border-color 0.2s, box-shadow 0.2s",
};
