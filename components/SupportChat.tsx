"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";

type Phase = "idle" | "sending" | "success" | "error";

// ── Minimal icon set ──────────────────────────────────────────────────────────
const IconChat = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const IconX = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconSend = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" stroke="none"/>
  </svg>
);
const IconHeadset = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

// ── Design tokens — light, clean, green ──────────────────────────────────────
const T = {
  bg:         "#f0fdf4",   // light mint green
  bgMuted:    "#dcfce7",   // slightly richer mint
  bgCard:     "#ffffff",   // white only for inputs
  border:     "#bbf7d0",   // fresh green border
  borderMid:  "#86efac",
  green:      "#16a34a",
  greenLight: "#22c55e",
  greenPale:  "#dcfce7",
  greenText:  "#166534",
  textDark:   "#14532d",   // deep green for headings
  textMid:    "#166534",
  textLight:  "#4ade80",
  shadow:     "0 4px 24px rgba(22,163,74,0.08)",
  shadowSm:   "0 2px 8px rgba(22,163,74,0.06)",
};

export default function SupportChat() {
  const [open, setOpen]       = useState(false);
  const [phase, setPhase]     = useState<Phase>("idle");
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
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
        setName(prev  => prev  || meta?.full_name || meta?.name || "");
        setEmail(prev => prev  || data.user!.email || "");
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
      setErrorMsg("Please enter a valid email.");
      return;
    }
    setErrorMsg("");
    setPhase("sending");
    try {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();
      const { error } = await supabase.from("support_messages").insert({
        name:    name.trim(),
        email:   email.trim().toLowerCase(),
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

  const handleReset = () => { setPhase("idle"); setMessage(""); setErrorMsg(""); };

  if (!hasMounted) return null;

  return (
    <>
      {/* ── Floating Bubble ────────────────────────────────────────────── */}
      <motion.button
        id="support-bubble"
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Support chat"
        style={{
          position:     "fixed",
          bottom:       24,
          right:        24,
          zIndex:       9900,
          width:        50,
          height:       50,
          borderRadius: "50%",
          background:   open ? "#f9fafb" : T.green,
          border:       open ? `1.5px solid ${T.borderMid}` : "none",
          cursor:       "pointer",
          display:      "flex",
          alignItems:   "center",
          justifyContent: "center",
          color:        open ? T.textMid : "#fff",
          boxShadow:    open
            ? T.shadowSm
            : "0 4px 16px rgba(22,163,74,0.25), 0 1px 4px rgba(0,0,0,0.08)",
          transition: "all 0.22s ease",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "x" : "chat"}
            initial={{ rotate: -60, opacity: 0, scale: 0.7 }}
            animate={{ rotate: 0,   opacity: 1, scale: 1   }}
            exit={{   rotate:  60, opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.15 }}
            style={{ display: "flex" }}
          >
            {open ? <IconX /> : <IconChat />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* ── Panel ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="support-panel"
            key="panel"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: 8,  scale: 0.97 }}
            transition={{ type: "spring", stiffness: 480, damping: 36 }}
            style={{
              position:    "fixed",
              bottom:      84,
              right:       24,
              zIndex:      9899,
              width:       "min(340px, calc(100vw - 48px))",
              borderRadius: 20,
              overflow:    "hidden",
              background:  T.bg,
              border:      `1px solid ${T.border}`,
              boxShadow:   "0 8px 40px rgba(22,163,74,0.12), 0 2px 8px rgba(0,0,0,0.04)",
              fontFamily:  "'Nunito', sans-serif",
            }}
          >
            {/* Header — clean white + green strip */}
            <div style={{
              background:  T.bgMuted,
              borderBottom: `1px solid ${T.border}`,
              padding:     "16px 18px",
              display:     "flex",
              alignItems:  "center",
              gap:         12,
            }}>
              {/* Icon badge */}
              <div style={{
                width:        38,
                height:       38,
                borderRadius: "50%",
                background:   T.greenPale,
                border:       `1.5px solid ${T.borderMid}`,
                display:      "flex",
                alignItems:   "center",
                justifyContent: "center",
                color:        T.greenText,
                flexShrink:   0,
              }}>
                <IconHeadset />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, color: "#14532d", fontWeight: 800, fontSize: "0.92rem" }}>
                  XyncRoom Support
                </p>
                <p style={{ margin: 0, color: "#4ade80", fontSize: "0.73rem", fontWeight: 600, marginTop: 1 }}>
                  We'll reply to your email
                </p>
              </div>
              {/* Online dot */}
              <div style={{
                width: 8, height: 8, borderRadius: "50%",
                background: T.greenLight,
                flexShrink: 0,
              }} />
            </div>

            {/* Body */}
            <div style={{ padding: "18px 18px 20px" }}>
              <AnimatePresence mode="wait">

                {/* Success */}
                {phase === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ textAlign: "center", padding: "16px 0 8px" }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.08 }}
                      style={{
                        width: 56, height: 56, borderRadius: "50%",
                        background: "#f0fdf4",
                      border: `1.5px solid ${T.border}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        margin: "0 auto 14px",
                        fontSize: "1.5rem",
                      }}
                    >✓</motion.div>
                    <p style={{ color: "#14532d", fontWeight: 800, fontSize: "0.95rem", margin: "0 0 6px" }}>
                      Message sent!
                    </p>
                    <p style={{ color: "#166534", fontSize: "0.8rem", fontWeight: 600, margin: "0 0 18px", lineHeight: 1.5 }}>
                      We'll reply to <span style={{ color: T.greenText, fontWeight: 700 }}>{email}</span>
                    </p>
                    <button
                      onClick={handleReset}
                      style={{
                        background: T.greenPale,
                        border: `1px solid ${T.borderMid}`,
                        color: T.greenText,
                        padding: "8px 20px",
                        borderRadius: "100px",
                        fontWeight: 700,
                        fontSize: "0.82rem",
                        cursor: "pointer",
                        fontFamily: "'Nunito', sans-serif",
                      }}
                    >
                      Send another
                    </button>
                  </motion.div>
                )}

                {/* Form */}
                {phase !== "success" && (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                    {/* Welcome pill */}
                    <div style={{
                      background:   T.bgMuted,
                      border:       `1px solid ${T.border}`,
                      borderRadius: "12px 12px 12px 3px",
                      padding:      "11px 14px",
                      marginBottom: 16,
                    }}>
                      <p style={{ margin: 0, color: "#14532d", fontWeight: 700, fontSize: "0.85rem", lineHeight: 1.55 }}>
                        👋 Hi! Facing an issue? Tell us and we'll sort it out.
                      </p>
                    </div>

                    {/* Fields */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                      <input
                        id="support-name"
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={e => { setName(e.target.value); setErrorMsg(""); }}
                        style={field}
                      />
                      <input
                        id="support-email"
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={e => { setEmail(e.target.value); setErrorMsg(""); }}
                        style={field}
                      />
                      <textarea
                        id="support-message"
                        ref={textareaRef}
                        placeholder="Describe your issue..."
                        value={message}
                        onChange={e => { setMessage(e.target.value); setErrorMsg(""); }}
                        rows={3}
                        style={{ ...field, resize: "none", lineHeight: 1.6 }}
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
                            color: "#dc2626",
                            fontSize: "0.76rem",
                            fontWeight: 700,
                            margin: "8px 0 0",
                            padding: "7px 12px",
                            background: "#fef2f2",
                            borderRadius: 8,
                            border: "1px solid #fecaca",
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
                      whileHover={phase !== "sending" ? { y: -1 } : {}}
                      whileTap={phase !== "sending" ? { scale: 0.98 } : {}}
                      style={{
                        marginTop:    13,
                        width:        "100%",
                        background:   phase === "sending" ? "#86efac" : T.green,
                        border:       "none",
                        color:        "#fff",
                        padding:      "12px 20px",
                        borderRadius: 12,
                        fontWeight:   800,
                        fontSize:     "0.88rem",
                        cursor:       phase === "sending" ? "not-allowed" : "pointer",
                        fontFamily:   "'Nunito', sans-serif",
                        display:      "flex",
                        alignItems:   "center",
                        justifyContent: "center",
                        gap:          7,
                        boxShadow:    phase !== "sending"
                          ? "0 2px 12px rgba(22,163,74,0.2)"
                          : "none",
                        transition: "all 0.18s ease",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {phase === "sending" ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.75, ease: "linear" }}
                            style={{
                              width: 14, height: 14,
                              border: "2px solid rgba(255,255,255,0.4)",
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
                      color:     T.textLight,
                      fontSize:  "0.7rem",
                      fontWeight: 600,
                      margin:    "9px 0 0",
                      letterSpacing: "0.02em",
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

      <style>{`
        #support-panel input::placeholder,
        #support-panel textarea::placeholder { color: #c4c4c4; }
        #support-panel input:focus,
        #support-panel textarea:focus {
          outline: none;
          border-color: #86efac !important;
          box-shadow: 0 0 0 3px rgba(134,239,172,0.25);
        }
      `}</style>
    </>
  );
}

// ── Field style ───────────────────────────────────────────────────────────────
const field: React.CSSProperties = {
  width:        "100%",
  padding:      "10px 13px",
  borderRadius: 10,
  border:       `1.5px solid #bbf7d0`,
  background:   "#f0fdf4",
  color:        "#14532d",
  fontSize:     "0.86rem",
  fontWeight:   600,
  fontFamily:   "'Nunito', sans-serif",
  boxSizing:    "border-box",
  transition:   "border-color 0.18s, box-shadow 0.18s",
};
