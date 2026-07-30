/*
 * ╔═══════════════════════════════════════════════════════════════════╗
 * ║                                                                   ║
 * ║   🎥  V I D E O   R O O M   E N G I N E                          ║
 * ║   ═══════════════════════════════════                              ║
 * ║                                                                   ║
 * ║   The core real-time communication engine of XyncRoom.       ║
 * ║   Powers peer-to-peer video calls via WebRTC with Supabase        ║
 * ║   Realtime as the signaling layer.                                ║
 * ║                                                                   ║
 * ║   ┌──────────────────────────────────────────┐                    ║
 * ║   │  WebRTC  ←→  Supabase Realtime Channel   │                    ║
 * ║   │  Video   ←→  MediaStream API              │                    ║
 * ║   │  Chat    ←→  Broadcast Messages            │                    ║
 * ║   │  Invite  ←→  Clipboard API                 │                    ║
 * ║   └──────────────────────────────────────────┘                    ║
 * ║                                                                   ║
 * ║   👤 Author: Pratik Jha                                            ║
 * ║   📦 Version: 1.0.0  |  📅 July 2026                              ║
 * ║   ⚡ Lines: 700+  |  🏗️ Architecture: Client-Side SPA             ║
 * ║                                                                   ║
 * ╚═══════════════════════════════════════════════════════════════════╝
 */

"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  Mic, MicOff, Video, VideoOff, Share2, MonitorUp, MessageSquare,
  Users, PhoneOff, Smile, Shield, Copy, CheckCircle2, Send
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";

function VideoTile({
  stream,
  name,
  isLocal,
  isScreenSharing = false,
  isSpeaking = false,
  muted = false,
  large = false,
}: {
  stream: MediaStream | null;
  name: string;
  isLocal: boolean;
  isScreenSharing?: boolean;
  isSpeaking?: boolean;
  muted?: boolean;
  large?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // Derive initial from name
  const initial = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        borderRadius: 24,
        overflow: "hidden",
        position: "relative",
        background: stream?.getVideoTracks()[0]?.enabled ? "#111827" : "#e5e7eb", // Dark background for pillarboxing when video is on
        border: isSpeaking ? `2px solid #0d9488` : "2px solid transparent",
        boxShadow: isSpeaking ? `0 0 0 4px rgba(13, 148, 136, 0.1)` : "0 4px 12px rgba(0,0,0,0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isLocal} // Always mute local video to prevent echo
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain", 
          transform: (isLocal && !isScreenSharing) ? "scaleX(-1)" : "none", // Mirror local video unless sharing screen
          display: stream?.getVideoTracks()[0]?.enabled ? "block" : "none"
        }}
      />

      {/* Avatar Fallback if video is off */}
      {(!stream || !stream.getVideoTracks()[0]?.enabled) && (
        <div style={{ textAlign: "center", position: "absolute" }}>
          <div
            style={{
              width: large ? 120 : 60,
              height: large ? 120 : 60,
              borderRadius: "50%",
              background: `linear-gradient(135deg, #0d9488, #0f766e)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: large ? "3rem" : "1.5rem",
              color: "#fff",
              margin: "0 auto",
              boxShadow: "0 8px 16px rgba(13,148,136,0.2)"
            }}
          >
            {initial}
          </div>
        </div>
      )}

      {/* Name tag */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 16,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 12px",
          borderRadius: 12,
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        {muted && <MicOff size={14} color="#ef4444" />}
        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#1f2937" }}>
          {name} {isLocal ? "(You)" : ""}
        </span>
      </div>
    </motion.div>
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
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <motion.button
        title={label}
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: 52,
          height: 52,
          borderRadius: 16,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: danger
            ? "#fee2e2"
            : active
            ? "#ffffff"
            : "#f3f4f6",
          color: danger ? "#ef4444" : active ? "#0d9488" : "#6b7280",
          border: danger
            ? "1px solid #fca5a5"
            : active
            ? "1px solid #e5e7eb"
            : "1px solid transparent",
          boxShadow: active ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
        }}
      >
        {active && activeIcon ? activeIcon : icon}
      </motion.button>
      <span style={{ fontSize: "0.75rem", color: "#4b5563", fontWeight: 500 }}>
        {label}
      </span>
    </div>
  );
}

// WebRTC Configuration
const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" }
  ],
};

function RoomContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const roomId = params.roomId as string;
  const initialName = searchParams.get("name") || "Guest";
  const initialTopic = searchParams.get("topic") || "XyncRoom Meeting";
  const initialCapacity = searchParams.get("capacity") ? parseInt(searchParams.get("capacity") as string, 10) : 50;
  const initialCam = searchParams.get("cam") !== "false";
  const initialMic = searchParams.get("mic") !== "false";
  
  const supabase = createClient();

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<Record<string, MediaStream>>({});
  
  const [micOn, setMicOn] = useState(initialMic);
  const [camOn, setCamOn] = useState(initialCam);
  const [elapsed, setElapsed] = useState(0);
  const [userId, setUserId] = useState<string>("");
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [peopleOpen, setPeopleOpen] = useState(false);
  const [messages, setMessages] = useState<{sender: string, text: string, time: string}[]>([]);
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const peersRef = useRef<Record<string, RTCPeerConnection>>({});
  const channelRef = useRef<RealtimeChannel | null>(null);

  // Initialize Media and Signaling
  useEffect(() => {
    let currentStream: MediaStream | null = null;
    const uid = Math.random().toString(36).substring(2, 10);
    setUserId(uid);

    async function init() {
      try {
        // 1. Get Local Media in HD
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: {
            width: { ideal: 3840, min: 1280 },
            height: { ideal: 2160, min: 720 },
            frameRate: { ideal: 60, min: 30 }
          }, 
          audio: true 
        });
        
        // Apply initial preferences from /join page
        stream.getVideoTracks().forEach(t => t.enabled = initialCam);
        stream.getAudioTracks().forEach(t => t.enabled = initialMic);
        
        currentStream = stream;
        setLocalStream(stream);

        // 2. Setup Supabase Realtime Channel
        const channel = supabase.channel(`room-${roomId}`);
        channelRef.current = channel;

        channel.on("broadcast", { event: "webrtc" }, async ({ payload }) => {
          const { sender, type, data } = payload;
          if (sender === uid) return; // Ignore own messages

          // Join: Create offer
          if (type === "join") {
            const pc = createPeerConnection(sender, stream);
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            channel.send({
              type: "broadcast",
              event: "webrtc",
              payload: { sender: uid, target: sender, type: "offer", data: offer }
            });
          }

          // Offer: Create answer
          if (type === "offer" && payload.target === uid) {
            const pc = createPeerConnection(sender, stream);
            await pc.setRemoteDescription(new RTCSessionDescription(data));
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            channel.send({
              type: "broadcast",
              event: "webrtc",
              payload: { sender: uid, target: sender, type: "answer", data: answer }
            });
          }

          // Answer: Set remote description
          if (type === "answer" && payload.target === uid) {
            const pc = peersRef.current[sender];
            if (pc) {
              await pc.setRemoteDescription(new RTCSessionDescription(data));
            }
          }

          // ICE Candidate: Add candidate
          if (type === "ice-candidate" && payload.target === uid) {
            const pc = peersRef.current[sender];
            if (pc && data) {
              await pc.addIceCandidate(new RTCIceCandidate(data));
            }
          }

          // Leave: Remove peer
          if (type === "leave") {
            const pc = peersRef.current[sender];
            if (pc) {
              pc.close();
              delete peersRef.current[sender];
            }
            setRemoteStreams((prev) => {
              const newStreams = { ...prev };
              delete newStreams[sender];
              return newStreams;
            });
          }

          if (type === "chat") {
            setMessages((prev) => [...prev, data]);
          }
        });

        // 3. Subscribe and announce join
        channel.subscribe((status) => {
          if (status === "SUBSCRIBED") {
            channel.send({
              type: "broadcast",
              event: "webrtc",
              payload: { sender: uid, type: "join" }
            });
          }
        });

      } catch (err) {
        console.error("Error accessing media devices.", err);
      }
    }

    init();

    // Timer
    const timer = setInterval(() => setElapsed((s) => s + 1), 1000);

    return () => {
      clearInterval(timer);
      currentStream?.getTracks().forEach((track) => track.stop());
      channelRef.current?.send({
        type: "broadcast",
        event: "webrtc",
        payload: { sender: uid, type: "leave" }
      });
      supabase.removeChannel(channelRef.current!);
      Object.values(peersRef.current).forEach((pc) => pc.close());
    };
  }, [roomId, supabase, initialCam, initialMic]);

  // Create RTCPeerConnection helper
  const createPeerConnection = (peerId: string, stream: MediaStream) => {
    const pc = new RTCPeerConnection(ICE_SERVERS);
    peersRef.current[peerId] = pc;

    // Add local tracks to connection
    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });

    // Listen for remote tracks
    pc.ontrack = (event) => {
      setRemoteStreams((prev) => ({
        ...prev,
        [peerId]: event.streams[0]
      }));
    };

    // Send ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate && channelRef.current) {
        channelRef.current.send({
          type: "broadcast",
          event: "webrtc",
          payload: { sender: userId, target: peerId, type: "ice-candidate", data: event.candidate }
        });
      }
    };

    // Clean up disconnected peers (ghosts)
    pc.oniceconnectionstatechange = () => {
      if (pc.iceConnectionState === "disconnected" || pc.iceConnectionState === "failed" || pc.iceConnectionState === "closed") {
        setRemoteStreams((prev) => {
          const newStreams = { ...prev };
          delete newStreams[peerId];
          return newStreams;
        });
        pc.close();
        delete peersRef.current[peerId];
      }
    };

    return pc;
  };

  const toggleMic = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(t => t.enabled = !micOn);
      setMicOn(!micOn);
    }
  };

  const toggleCam = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(t => t.enabled = !camOn);
      setCamOn(!camOn);
    }
  };

  const leaveRoom = () => {
    if (window.confirm("Are you sure you want to exit this meeting?")) {
      router.replace("/dashboard");
    }
  };

  const stopScreenShare = async () => {
    if (!localStream) return;
    try {
      const camStream = await navigator.mediaDevices.getUserMedia({ 
        video: {
          width: { ideal: 3840, min: 1280 },
          height: { ideal: 2160, min: 720 },
          frameRate: { ideal: 60, min: 30 }
        } 
      });
      const camTrack = camStream.getVideoTracks()[0];
      camTrack.enabled = camOn;
      
      const currentVideoTrack = localStream.getVideoTracks()[0];
      if (currentVideoTrack) {
        currentVideoTrack.stop();
        localStream.removeTrack(currentVideoTrack);
      }
      localStream.addTrack(camTrack);
      setLocalStream(new MediaStream(localStream.getTracks()));

      Object.values(peersRef.current).forEach(peer => {
        const sender = peer.getSenders().find(s => s.track?.kind === 'video');
        if (sender) sender.replaceTrack(camTrack);
      });
      setIsScreenSharing(false);
    } catch (err) {
      console.error("Error stopping screen share", err);
    }
  };

  const toggleScreenShare = async () => {
    if (!localStream) return;
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ 
          video: {
            width: { ideal: 3840, max: 3840 },
            height: { ideal: 2160, max: 2160 },
            frameRate: { ideal: 60, max: 60 }
          }
        });
        const screenTrack = screenStream.getVideoTracks()[0];
        
        screenTrack.onended = () => {
          stopScreenShare();
        };

        const currentVideoTrack = localStream.getVideoTracks()[0];
        if (currentVideoTrack) {
          localStream.removeTrack(currentVideoTrack);
        }
        localStream.addTrack(screenTrack);
        setLocalStream(new MediaStream(localStream.getTracks()));

        Object.values(peersRef.current).forEach(peer => {
          const sender = peer.getSenders().find(s => s.track?.kind === 'video');
          if (sender) sender.replaceTrack(screenTrack);
        });
        setIsScreenSharing(true);
      } else {
        stopScreenShare();
      }
    } catch (err) {
      console.error("Error sharing screen", err);
    }
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!draft.trim() || !channelRef.current) return;
    
    const msg = { sender: initialName, text: draft.trim(), time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    
    // Broadcast to others
    channelRef.current.send({
      type: "broadcast",
      event: "webrtc",
      payload: { sender: userId, type: "chat", data: msg }
    });
    
    // Add locally
    setMessages((prev) => [...prev, msg]);
    setDraft("");
  };

  useEffect(() => {
    if (chatOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatOpen]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const totalParticipants = Object.keys(remoteStreams).length + 1;

  // Determine grid layout based on participants
  const getGridStyle = () => {
    if (totalParticipants === 1) return { gridTemplateColumns: "1fr", gridTemplateRows: "1fr" };
    if (totalParticipants === 2) return { gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr" };
    if (totalParticipants <= 4) return { gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr" };
    return { gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(auto-fit, minmax(200px, 1fr))" };
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f8f9fa", // Bright Gusto theme
        overflow: "hidden",
        position: "relative",
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 32px",
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "#0d9488", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 14, height: 14, border: "2px solid #fff", borderRadius: "50%" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", letterSpacing: "-0.02em" }}>
              {initialTopic}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: "0.8rem", color: "#6b7280", fontFamily: "var(--font-mono)" }}>
                {roomId}
              </span>
              <button 
                onClick={copyInviteLink}
                title="Copy Invite Link"
                style={{ background: "none", border: "none", cursor: "pointer", color: copied ? "#10b981" : "#6b7280", padding: 4, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4 }}
              >
                {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#0d9488", fontSize: "0.9rem", fontWeight: 600, background: "rgba(13,148,136,0.1)", padding: "6px 12px", borderRadius: 20 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#0d9488", animation: "pulse-green 1.5s ease-in-out infinite" }} />
            {formatTime(elapsed)}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#4b5563", fontSize: "0.85rem", fontWeight: 500 }}>
            <Shield size={16} color="#0d9488" /> Encrypted
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#4b5563", fontSize: "0.85rem", fontWeight: 500 }}>
            <Users size={16} /> {totalParticipants}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ display: "flex", flex: 1, padding: 24, overflow: "hidden", gap: 24, justifyContent: "center" }}>
        {/* Video Grid */}
        <motion.div 
          layout
          style={{ 
            display: "grid", 
            gap: 20, 
            width: "100%", 
            height: "100%", 
            maxWidth: (chatOpen || peopleOpen) ? 1200 : 1600,
            ...getGridStyle()
          }}
        >
          <AnimatePresence>
            {/* Local Stream */}
            <motion.div layout key="local" style={{ minHeight: 0, width: "100%", height: "100%" }}>
              <VideoTile stream={localStream} name={initialName} isLocal={true} isScreenSharing={isScreenSharing} muted={!micOn} large={totalParticipants <= 2} />
            </motion.div>
            
            {/* Remote Streams */}
            {Object.entries(remoteStreams).map(([id, stream]) => (
              <motion.div layout key={id} style={{ minHeight: 0, width: "100%", height: "100%" }}>
                <VideoTile stream={stream} name="Participant" isLocal={false} large={totalParticipants <= 2} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* People Sidebar */}
        <AnimatePresence>
          {peopleOpen && (
            <motion.div
              initial={{ opacity: 0, width: 0, x: 20 }}
              animate={{ opacity: 1, width: 340, x: 0 }}
              exit={{ opacity: 0, width: 0, x: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: "#fff",
                borderRadius: 24,
                boxShadow: "0 12px 32px rgba(0,0,0,0.05)",
                border: "1px solid rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                flexShrink: 0,
                height: "100%"
              }}
            >
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#111827" }}>People</h3>
                <span style={{ fontSize: "0.75rem", color: "#6b7280", background: "#f3f4f6", padding: "4px 10px", borderRadius: 12, fontWeight: 600 }}>{totalParticipants}</span>
              </div>
              
              <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#0d9488", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
                    {initialName.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: 600, color: "#111827", fontSize: "0.9rem" }}>{initialName} (You)</span>
                    <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>Meeting Host</span>
                  </div>
                </div>

                {Object.keys(remoteStreams).map((id, index) => (
                  <div key={id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#f3f4f6", color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
                      P
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontWeight: 600, color: "#111827", fontSize: "0.9rem" }}>Participant {index + 1}</span>
                      <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>Joined</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Sidebar */}
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, width: 0, x: 20 }}
              animate={{ opacity: 1, width: 340, x: 0 }}
              exit={{ opacity: 0, width: 0, x: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: "#fff",
                borderRadius: 24,
                boxShadow: "0 12px 32px rgba(0,0,0,0.05)",
                border: "1px solid rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                flexShrink: 0,
                height: "100%"
              }}
            >
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#111827" }}>Room Chat</h3>
                <span style={{ fontSize: "0.75rem", color: "#6b7280", background: "#f3f4f6", padding: "4px 10px", borderRadius: 12, fontWeight: 600 }}>{messages.length}</span>
              </div>
              
              <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
                {messages.length === 0 ? (
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#9ca3af", gap: 8 }}>
                    <MessageSquare size={32} opacity={0.3} />
                    <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>No messages yet</span>
                  </div>
                ) : (
                  messages.map((msg, i) => {
                    const isMe = msg.sender === initialName;
                    return (
                      <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: isMe ? "flex-end" : "flex-start" }}>
                        <span style={{ fontSize: "0.7rem", color: "#9ca3af", marginBottom: 4, fontWeight: 500 }}>{isMe ? "You" : msg.sender} • {msg.time}</span>
                        <div style={{ 
                          background: isMe ? "#0d9488" : "#f3f4f6", 
                          color: isMe ? "#fff" : "#1f2937", 
                          padding: "10px 14px", 
                          borderRadius: 16, 
                          borderBottomRightRadius: isMe ? 4 : 16,
                          borderBottomLeftRadius: isMe ? 16 : 4,
                          fontSize: "0.9rem",
                          maxWidth: "90%",
                          lineHeight: 1.4
                        }}>
                          {msg.text}
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              <div style={{ padding: 16, borderTop: "1px solid #f3f4f6", background: "#fff" }}>
                <form onSubmit={sendMessage} style={{ display: "flex", gap: 8 }}>
                  <input 
                    type="text" 
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Message..." 
                    style={{ 
                      flex: 1, background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 100, 
                      padding: "10px 16px", fontSize: "0.9rem", outline: "none", color: "#111827"
                    }} 
                  />
                  <button 
                    type="submit"
                    disabled={!draft.trim()}
                    style={{ 
                      width: 40, height: 40, borderRadius: "50%", border: "none", 
                      background: draft.trim() ? "#0d9488" : "#f3f4f6", 
                      color: draft.trim() ? "#fff" : "#9ca3af",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: draft.trim() ? "pointer" : "default",
                      transition: "all 0.2s",
                      flexShrink: 0
                    }}
                  >
                    <Send size={16} style={{ marginLeft: -2 }} />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls bar */}
      <div
        style={{
          padding: "24px",
          display: "flex",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <div style={{
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(0,0,0,0.05)",
          borderRadius: 24,
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
        }}>
          <ControlButton icon={<MicOff size={22} />} activeIcon={<Mic size={22} />} label={micOn ? "Mute" : "Unmute"} active={micOn} onClick={toggleMic} />
          <ControlButton icon={<VideoOff size={22} />} activeIcon={<Video size={22} />} label={camOn ? "Stop" : "Start"} active={camOn} onClick={toggleCam} />
          
          <div style={{ width: 1, height: 40, background: "#e5e7eb", margin: "0 8px" }} />
          
          <ControlButton icon={<MonitorUp size={22} />} label={isScreenSharing ? "Stop Sharing" : "Screen Share"} active={isScreenSharing} onClick={toggleScreenShare} />
          <ControlButton icon={<Smile size={22} />} label="React" active={false} />
          <ControlButton icon={<MessageSquare size={22} />} label="Chat" active={chatOpen} onClick={() => { setChatOpen(!chatOpen); setPeopleOpen(false); }} />
          <ControlButton icon={<Users size={22} />} label="People" active={peopleOpen} onClick={() => { setPeopleOpen(!peopleOpen); setChatOpen(false); }} />

          <div style={{ width: 1, height: 40, background: "#e5e7eb", margin: "0 8px" }} />

          {/* Leave button */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={leaveRoom}
              style={{
                width: 64, height: 52, borderRadius: 16, border: "none", cursor: "pointer",
                background: "#ef4444", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 8px 16px rgba(239,68,68,0.2)",
              }}
            >
              <PhoneOff size={24} />
            </motion.button>
            <span style={{ fontSize: "0.75rem", color: "#4b5563", fontWeight: 500 }}>Leave</span>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-green {
          0% { box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(13, 148, 136, 0); }
          100% { box-shadow: 0 0 0 0 rgba(13, 148, 136, 0); }
        }
      `}} />
    </div>
  );
}

export default function RoomPage() {
  return (
    <Suspense fallback={<div style={{ height: "100vh", background: "#f8f9fa" }} />}>
      <RoomContent />
    </Suspense>
  );
}
