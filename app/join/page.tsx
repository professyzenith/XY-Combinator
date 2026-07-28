"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Video, ArrowRight } from "lucide-react";

export default function JoinPage() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    router.push(`/room/${code.trim()}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
      className="grid-bg"
    >
      <div
        style={{
          position: "fixed", inset: 0,
          background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(34,197,94,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          width: "100%", maxWidth: 400, position: "relative", zIndex: 1,
          animation: "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 44, height: 44, borderRadius: 14,
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1rem", color: "#fff",
                boxShadow: "0 0 30px rgba(34,197,94,0.35)",
              }}
            >
              XY
            </div>
          </Link>
        </div>

        <div className="glass" style={{ borderRadius: 24, padding: "40px 36px", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ width: 60, height: 60, borderRadius: 18, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "#22c55e" }}>
              <Video size={26} />
            </div>
            <h1 className="font-display" style={{ fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>
              Join a meeting
            </h1>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
              Enter a meeting code or link to join instantly.
            </p>
          </div>

          <form onSubmit={handleJoin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
                Meeting code
              </label>
              <input
                className="input"
                placeholder="e.g. abc-123-xyz"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                autoFocus
                style={{ textAlign: "center", fontSize: "1.1rem", letterSpacing: "0.05em", fontFamily: "monospace" }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={!code.trim()}>
              Join meeting <ArrowRight size={16} />
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
            <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
          </div>

          <Link href="/register" className="btn btn-ghost" style={{ width: "100%" }}>
            Create a free account
          </Link>
        </div>
      </div>
    </div>
  );
}
