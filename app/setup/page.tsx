"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Users, BookOpen, User, ArrowRight } from "lucide-react";

function SetupPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialName = searchParams.get("name") || "";

  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [capacity, setCapacity] = useState("10");
  const [isLaunching, setIsLaunching] = useState(false);

  const handleLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !topic.trim() || !capacity.trim()) return;
    
    setIsLaunching(true);
    
    // Generate Room ID
    const roomId = Math.random().toString(36).substring(2, 9) + "-" + Math.random().toString(36).substring(2, 9);
    
    // Push to room with parameters
    const query = new URLSearchParams({
      name: name.trim(),
      topic: topic.trim(),
      capacity: capacity.trim(),
      host: "true"
    });

    router.replace(`/room/${roomId}?${query.toString()}`);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", background: "#f8f9fa", position: "relative" }}>
      
      {/* Logo */}
      <div style={{ position: "absolute", top: 32, left: 40 }}>
        <Link href="/dashboard" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: "#0d9488",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 14, height: 14, border: "2px solid #fff", borderRadius: "50%" }} />
          </div>
          <span className="font-display" style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#1f2937" }}>
            XY Combinator
          </span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: 24,
          padding: 40,
          boxShadow: "0 20px 40px rgba(0,0,0,0.04)",
          maxWidth: 480,
          width: "100%",
        }}
      >
        <div style={{ marginBottom: 32, textAlign: "center" }}>
          <h1 style={{ margin: "0 0 8px 0", fontSize: "1.8rem", fontWeight: 800, color: "#111827", letterSpacing: "-0.5px" }}>Set up your meeting</h1>
          <p style={{ margin: 0, color: "#6b7280", fontSize: "0.95rem" }}>Configure the room details before letting others in.</p>
        </div>

        <form onSubmit={handleLaunch} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          
          {/* Display Name */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151" }}>Host Display Name</label>
            <div style={{ position: "relative" }}>
              <User size={18} color="#9ca3af" style={{ position: "absolute", left: 14, top: 14 }} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                style={{
                  width: "100%", padding: "12px 16px 12px 42px",
                  background: "#f9fafb", border: "1px solid #d1d5db", borderRadius: 12,
                  fontSize: "0.95rem", color: "#1f2937", outline: "none",
                  transition: "all 0.2s"
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#0d9488"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(13,148,136,0.1)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#d1d5db"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>
          </div>

          {/* Meeting Topic */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151" }}>Class / Meeting Topic</label>
            <div style={{ position: "relative" }}>
              <BookOpen size={18} color="#9ca3af" style={{ position: "absolute", left: 14, top: 14 }} />
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Intro to Chemistry"
                required
                style={{
                  width: "100%", padding: "12px 16px 12px 42px",
                  background: "#f9fafb", border: "1px solid #d1d5db", borderRadius: 12,
                  fontSize: "0.95rem", color: "#1f2937", outline: "none",
                  transition: "all 0.2s"
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#0d9488"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(13,148,136,0.1)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#d1d5db"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>
          </div>

          {/* Capacity */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151" }}>Maximum Capacity</label>
            <div style={{ position: "relative" }}>
              <Users size={18} color="#9ca3af" style={{ position: "absolute", left: 14, top: 14 }} />
              <select
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                style={{
                  width: "100%", padding: "12px 16px 12px 42px",
                  background: "#f9fafb", border: "1px solid #d1d5db", borderRadius: 12,
                  fontSize: "0.95rem", color: "#1f2937", outline: "none", cursor: "pointer",
                  appearance: "none",
                  transition: "all 0.2s"
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#0d9488"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(13,148,136,0.1)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#d1d5db"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <option value="2">2 Participants (1-on-1)</option>
                <option value="5">5 Participants (Small Group)</option>
                <option value="10">10 Participants (Class)</option>
                <option value="50">50 Participants (Lecture)</option>
              </select>
              {/* Custom arrow for select */}
              <div style={{ position: "absolute", right: 16, top: 14, pointerEvents: "none" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLaunching || !name.trim() || !topic.trim()}
            type="submit"
            style={{
              marginTop: 16,
              background: "#0d9488",
              color: "#fff",
              border: "none",
              padding: "16px 24px",
              borderRadius: 100,
              fontSize: "1rem",
              fontWeight: 700,
              cursor: (isLaunching || !name.trim() || !topic.trim()) ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              opacity: (isLaunching || !name.trim() || !topic.trim()) ? 0.7 : 1,
              boxShadow: "0 8px 24px rgba(13,148,136,0.3)",
              transition: "opacity 0.2s"
            }}
          >
            {isLaunching ? (
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                style={{ width: 20, height: 20, border: "3px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%" }} 
              />
            ) : (
              <>Launch Room <ArrowRight size={20} strokeWidth={2.5} /></>
            )}
          </motion.button>

        </form>
      </motion.div>
    </div>
  );
}

export default function SetupPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#f8f9fa" }} />}>
      <SetupPageContent />
    </Suspense>
  );
}
