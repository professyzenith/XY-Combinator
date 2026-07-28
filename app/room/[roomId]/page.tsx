"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Mic, MicOff, Video, VideoOff, Share2, MessageSquare,
  Users, PhoneOff, Smile, MoreHorizontal, Shield,
  Hand, Maximize2,
} from "lucide-react";

const MOCK_PARTICIPANTS = [
  { id: 1, name: "Zenith", initials: "Z", color: "#22c55e", speaking: true, muted: false, videoOff: false },
  { id: 2, name: "Alex", initials: "A", color: "#3b82f6", speaking: false, muted: true, videoOff: false },
  { id: 3, name: "Maria", initials: "M", color: "#a855f7", speaking: false, muted: false, videoOff: true },
  { id: 4, name: "Sam", initials: "S", color: "#f59e0b", speaking: false, muted: false, videoOff: false },
];

const CHAT_MESSAGES = [
  { id: 1, sender: "Alex", text: "Can everyone hear me?", time: "10:01 AM", self: false },
  { id: 2, sender: "You", text: "Yes, loud and clear!", time: "10:01 AM", self: true },
  { id: 3, sender: "Maria", text: "Let's start the demo 🚀", time: "10:02 AM", self: false },
];

const REACTIONS = ["👍", "❤️", "😂", "😮", "👏", "🎉"];

function VideoTile({
  participant,
  large = false,
}: {
  participant: (typeof MOCK_PARTICIPANTS)[0];
  large?: boolean;
}) {
  return (
    <div
      style={{
        borderRadius: large ? 20 : 14,
        overflow: "hidden",
        position: "relative",
        background: `linear-gradient(135deg, ${participant.color}18, ${participant.color}08)`,
        border: participant.speaking
          ? `2px solid ${participant.color}`
          : "2px solid rgba(255,255,255,0.06)",
        boxShadow: participant.speaking ? `0 0 30px ${participant.color}30` : "none",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: large ? "100%" : 140,
        aspectRatio: "16/9",
      }}
    >
      {/* Avatar */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: large ? 80 : 48,
            height: large ? 80 : 48,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${participant.color}, ${participant.color}cc)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: large ? "2rem" : "1.2rem",
            color: "#fff",
            margin: "0 auto 8px",
            boxShadow: `0 4px 20px ${participant.color}40`,
          }}
        >
          {participant.initials}
        </div>
        {large && (
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", fontWeight: 500 }}>
            {participant.name}
          </div>
        )}
      </div>

      {/* Name tag */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "4px 10px",
          borderRadius: 8,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(8px)",
        }}
      >
        {participant.muted && <MicOff size={10} color="#ef4444" />}
        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#fff" }}>
          {participant.name}
        </span>
        {participant.speaking && (
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#22c55e",
              animation: "pulse-green 1s ease-in-out infinite",
            }}
          />
        )}
      </div>
    </div>
  );
}

function ControlButton({
  icon,
  activeIcon,
  label,
  active = true,
  danger = false,
  onClick,
}: {
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  label: string;
  active?: boolean;
  danger?: boolean;
  onClick?: () => void;
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <button
        title={label}
        onClick={() => {
          setPressed(true);
          setTimeout(() => setPressed(false), 200);
          onClick?.();
        }}
        style={{
          width: 52,
          height: 52,
          borderRadius: 16,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: danger
            ? "rgba(239,68,68,0.15)"
            : active
            ? "rgba(34,197,94,0.12)"
            : "rgba(255,255,255,0.07)",
          color: danger ? "#ef4444" : active ? "#22c55e" : "rgba(255,255,255,0.7)",
          border: danger
            ? "1px solid rgba(239,68,68,0.25)"
            : active
            ? "1px solid rgba(34,197,94,0.25)"
            : "1px solid rgba(255,255,255,0.08)",
          transform: pressed ? "scale(0.88)" : "scale(1)",
          transition: "all 0.15s cubic-bezier(0.34,1.56,0.64,1)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
          if (!danger && !active) {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)";
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          if (!danger && !active) {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)";
          }
        }}
      >
        {active && activeIcon ? activeIcon : icon}
      </button>
      <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>
        {label}
      </span>
    </div>
  );
}

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.roomId as string;

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [participantsOpen, setParticipantsOpen] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [floatingReaction, setFloatingReaction] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  const [elapsed, setElapsed] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Meeting timer
  useEffect(() => {
    const timer = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const sendReaction = (emoji: string) => {
    setFloatingReaction(emoji);
    setShowReactions(false);
    setTimeout(() => setFloatingReaction(null), 2500);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "You", text: message.trim(), time: "Now", self: true },
    ]);
    setMessage("");
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const leaveRoom = () => router.push("/dashboard");

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#080808",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Floating reaction */}
      {floatingReaction && (
        <div
          style={{
            position: "fixed",
            bottom: 160,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "4rem",
            zIndex: 9999,
            animation: "fadeUp 0.4s ease forwards",
            pointerEvents: "none",
          }}
        >
          {floatingReaction}
        </div>
      )}

      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 24px",
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #22c55e, #16a34a)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "0.7rem", color: "#fff" }}>
            XY
          </div>
          <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#fff" }}>
            Room: <span style={{ color: "#22c55e", fontFamily: "monospace" }}>{roomId}</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#22c55e", fontSize: "0.85rem", fontWeight: 600 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", animation: "pulse-green 1.5s ease-in-out infinite" }} />
            {formatTime(elapsed)}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--text-muted)", fontSize: "0.82rem" }}>
            <Shield size={13} color="#22c55e" /> Encrypted
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--text-muted)", fontSize: "0.82rem" }}>
            <Users size={13} /> {MOCK_PARTICIPANTS.length}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Video area */}
        <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 12, overflow: "hidden" }}>
          {/* Main speaker */}
          <div style={{ flex: 1, minHeight: 0 }}>
            <VideoTile participant={MOCK_PARTICIPANTS[0]} large />
          </div>

          {/* Filmstrip */}
          <div style={{ display: "flex", gap: 10, height: 140, flexShrink: 0, overflowX: "auto" }}>
            {MOCK_PARTICIPANTS.slice(1).map((p) => (
              <div key={p.id} style={{ minWidth: 200, flex: "0 0 200px" }}>
                <VideoTile participant={p} />
              </div>
            ))}
          </div>
        </div>

        {/* Side panel */}
        {(chatOpen || participantsOpen) && (
          <div
            style={{
              width: 320,
              background: "var(--bg-surface)",
              borderLeft: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              flexDirection: "column",
              animation: "scaleIn 0.2s ease forwards",
            }}
          >
            {/* Panel header */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 8 }}>
              <button
                onClick={() => { setChatOpen(true); setParticipantsOpen(false); }}
                style={{ flex: 1, padding: "8px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600, background: chatOpen ? "rgba(34,197,94,0.1)" : "transparent", color: chatOpen ? "#22c55e" : "var(--text-muted)", transition: "all 0.2s ease" }}
              >
                Chat
              </button>
              <button
                onClick={() => { setParticipantsOpen(true); setChatOpen(false); }}
                style={{ flex: 1, padding: "8px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600, background: participantsOpen ? "rgba(34,197,94,0.1)" : "transparent", color: participantsOpen ? "#22c55e" : "var(--text-muted)", transition: "all 0.2s ease" }}
              >
                People ({MOCK_PARTICIPANTS.length})
              </button>
            </div>

            {/* Chat */}
            {chatOpen && (
              <>
                <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
                  {messages.map((msg) => (
                    <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: msg.self ? "flex-end" : "flex-start" }}>
                      {!msg.self && (
                        <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: 4 }}>{msg.sender}</span>
                      )}
                      <div
                        style={{
                          padding: "10px 14px",
                          borderRadius: 12,
                          background: msg.self ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.05)",
                          border: msg.self ? "1px solid rgba(34,197,94,0.25)" : "1px solid rgba(255,255,255,0.06)",
                          maxWidth: "80%",
                          fontSize: "0.875rem",
                          color: "#fff",
                          lineHeight: 1.5,
                        }}
                      >
                        {msg.text}
                      </div>
                      <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 4 }}>{msg.time}</span>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                <form onSubmit={sendMessage} style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 8 }}>
                  <input
                    className="input"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ background: "rgba(255,255,255,0.04)", fontSize: "0.85rem" }}
                  />
                  <button type="submit" className="btn btn-primary btn-sm" style={{ flexShrink: 0 }}>
                    Send
                  </button>
                </form>
              </>
            )}

            {/* Participants */}
            {participantsOpen && (
              <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
                {MOCK_PARTICIPANTS.map((p) => (
                  <div
                    key={p.id}
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10, background: "rgba(255,255,255,0.03)" }}
                  >
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg, ${p.color}, ${p.color}cc)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.85rem", color: "#fff", flexShrink: 0 }}>
                      {p.initials}
                    </div>
                    <span style={{ flex: 1, fontSize: "0.875rem", fontWeight: 500, color: "#fff" }}>{p.name}</span>
                    <div style={{ display: "flex", gap: 6 }}>
                      {p.muted && <MicOff size={13} color="#ef4444" />}
                      {p.videoOff && <VideoOff size={13} color="var(--text-muted)" />}
                      {p.speaking && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", marginTop: 2, animation: "pulse-green 1s infinite" }} />}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Controls bar */}
      <div
        style={{
          position: "relative",
          padding: "16px 24px",
          background: "rgba(5,5,5,0.9)",
          backdropFilter: "blur(24px)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          flexWrap: "wrap",
          zIndex: 10,
        }}
      >
        {/* Reactions popup */}
        {showReactions && (
          <div
            style={{
              position: "absolute",
              bottom: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-default)",
              borderRadius: 16,
              padding: "12px 16px",
              display: "flex",
              gap: 8,
              marginBottom: 8,
              animation: "scaleIn 0.2s ease forwards",
            }}
          >
            {REACTIONS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => sendReaction(emoji)}
                style={{ fontSize: "1.5rem", background: "none", border: "none", cursor: "pointer", borderRadius: 8, padding: "4px 8px", transition: "transform 0.15s cubic-bezier(0.34,1.56,0.64,1)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.3)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        <ControlButton icon={<MicOff size={20} />} activeIcon={<Mic size={20} />} label={micOn ? "Mute" : "Unmute"} active={micOn} onClick={() => setMicOn(!micOn)} />
        <ControlButton icon={<VideoOff size={20} />} activeIcon={<Video size={20} />} label={camOn ? "Stop" : "Start"} active={camOn} onClick={() => setCamOn(!camOn)} />
        <ControlButton icon={<Share2 size={20} />} label="Share" active={false} />
        <ControlButton icon={<Hand size={20} />} label="Raise hand" active={false} />
        <ControlButton icon={<Smile size={20} />} label="React" active={showReactions} onClick={() => setShowReactions(!showReactions)} />
        <ControlButton icon={<MessageSquare size={20} />} label="Chat" active={chatOpen} onClick={() => { setChatOpen(!chatOpen); setParticipantsOpen(false); }} />
        <ControlButton icon={<Users size={20} />} label="People" active={participantsOpen} onClick={() => { setParticipantsOpen(!participantsOpen); setChatOpen(false); }} />
        <ControlButton icon={<Maximize2 size={20} />} label="Fullscreen" active={false} />
        <ControlButton icon={<MoreHorizontal size={20} />} label="More" active={false} />

        {/* Leave button */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <button
            onClick={leaveRoom}
            style={{
              width: 52, height: 52, borderRadius: 16, border: "none", cursor: "pointer",
              background: "rgba(239,68,68,0.9)", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
              boxShadow: "0 0 20px rgba(239,68,68,0.3)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 30px rgba(239,68,68,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(239,68,68,0.3)";
            }}
          >
            <PhoneOff size={20} />
          </button>
          <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>Leave</span>
        </div>
      </div>
    </div>
  );
}
