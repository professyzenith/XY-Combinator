"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mic, MicOff, Video, VideoOff, Settings, ArrowRight, User } from "lucide-react";

function JoinPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("code") || "";

  const [code, setCode] = useState(initialCode);
  const [name, setName] = useState("");
  
  // Media states
  const [isCamOn, setIsCamOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mediaError, setMediaError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // Request permissions and initialize stream
  useEffect(() => {
    async function initMedia() {
      try {
        const userStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 3840, min: 1280 },
            height: { ideal: 2160, min: 720 },
            frameRate: { ideal: 60, min: 30 }
          },
          audio: true,
        });
        setStream(userStream);
        if (videoRef.current) {
          videoRef.current.srcObject = userStream;
        }
      } catch (err: any) {
        console.error("Error accessing media devices.", err);
        setMediaError("Could not access camera or microphone. Please check permissions.");
        setIsCamOn(false);
        setIsMicOn(false);
      }
    }
    initMedia();

    // Cleanup on unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Toggle Tracks
  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !isCamOn;
      });
      setIsCamOn(!isCamOn);
    }
  };

  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !isMicOn;
      });
      setIsMicOn(!isMicOn);
    }
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !name.trim()) return;
    
    // Cleanup stream before navigating, or we can pass state via URL/Context
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    
    // In a real app, we'd pass the mic/cam preferences via Context/Zustand or URL params
    router.replace(`/room/${code.trim()}?name=${encodeURIComponent(name.trim())}&cam=${isCamOn}&mic=${isMicOn}`);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", background: "#f8f9fa", position: "relative" }}>
      
      {/* Logo */}
      <div style={{ position: "absolute", top: 32, left: 40 }}>
        <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10 }}>
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
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: 24,
          padding: 24,
          boxShadow: "0 20px 40px rgba(0,0,0,0.04)",
          gap: 32,
          maxWidth: 960,
          width: "100%",
        }}
      >
        {/* Left: Video Preview */}
        <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              width: "100%",
              aspectRatio: "16/9",
              background: "#111827",
              borderRadius: 16,
              overflow: "hidden",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)",
            }}
          >
            {isCamOn && !mediaError ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)" }}
              />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, color: "#6b7280" }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#1f2937", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <User size={32} color="#9ca3af" />
                </div>
                <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>Camera is off</span>
              </div>
            )}

            {mediaError && (
              <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, padding: "8px 12px", background: "rgba(239,68,68,0.9)", color: "#fff", fontSize: "0.8rem", borderRadius: 8, backdropFilter: "blur(4px)" }}>
                {mediaError}
              </div>
            )}

            {/* Media Controls Overlay */}
            <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 12 }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleAudio}
                style={{
                  width: 48, height: 48, borderRadius: "50%", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: isMicOn ? "rgba(255,255,255,0.1)" : "#ef4444",
                  backdropFilter: "blur(8px)", color: "#fff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: isMicOn ? "1px solid rgba(255,255,255,0.2)" : "1px solid transparent",
                }}
              >
                {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleVideo}
                style={{
                  width: 48, height: 48, borderRadius: "50%", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: isCamOn ? "rgba(255,255,255,0.1)" : "#ef4444",
                  backdropFilter: "blur(8px)", color: "#fff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: isCamOn ? "1px solid rgba(255,255,255,0.2)" : "1px solid transparent",
                }}
              >
                {isCamOn ? <Video size={20} /> : <VideoOff size={20} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Right: Join Form */}
        <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", justifyContent: "center", padding: "16px 8px" }}>
          <h1 className="font-display" style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.04em", color: "#111827", marginBottom: 8 }}>
            Ready to join?
          </h1>
          <p style={{ fontSize: "0.95rem", color: "#6b7280", marginBottom: 32 }}>
            Set up your camera and microphone before entering the room.
          </p>

          <form onSubmit={handleJoin} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: 8 }}>
                Your Name
              </label>
              <input
                type="text"
                placeholder="How should we call you?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: "100%", padding: "14px 16px",
                  background: "#ffffff", border: "1px solid #d1d5db",
                  borderRadius: 12, fontSize: "0.95rem", color: "#1f2937",
                  outline: "none", boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: 8 }}>
                Meeting Code
              </label>
              <input
                type="text"
                placeholder="e.g. abc-defg-hij"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                style={{
                  width: "100%", padding: "14px 16px",
                  background: "#f9fafb", border: "1px solid #d1d5db",
                  borderRadius: 12, fontSize: "1.05rem", color: "#111827",
                  fontFamily: "var(--font-mono)", letterSpacing: "0.05em",
                  outline: "none", boxSizing: "border-box", textTransform: "lowercase",
                }}
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={!name.trim() || !code.trim()}
              style={{
                width: "100%", marginTop: 12, padding: "14px 24px",
                background: "#0d9488",
                border: "none", borderRadius: 12,
                color: "#fff", fontFamily: "'Outfit', sans-serif",
                fontWeight: 600, fontSize: "1rem",
                cursor: (!name.trim() || !code.trim()) ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                opacity: (!name.trim() || !code.trim()) ? 0.7 : 1,
              }}
            >
              Join meeting <ArrowRight size={18} />
            </motion.button>
          </form>
          
          <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 8, color: "#6b7280", fontSize: "0.85rem" }}>
            <Settings size={14} />
            <span>Check your audio and video settings</span>
          </div>
        </div>

      </motion.div>
    </div>
  );
}

export default function JoinPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#f8f9fa" }} />}>
      <JoinPageContent />
    </Suspense>
  );
}
