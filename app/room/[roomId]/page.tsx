"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Mic, MicOff, Video, VideoOff, Share2, MessageSquare,
  Users, PhoneOff, Smile, Shield
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";

// Helper component to render video streams
function VideoTile({
  stream,
  name,
  isLocal,
  isSpeaking = false,
  muted = false,
  large = false,
}: {
  stream: MediaStream | null;
  name: string;
  isLocal: boolean;
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
    <div
      style={{
        borderRadius: large ? 0 : 14,
        overflow: "hidden",
        position: "relative",
        background: large ? "transparent" : "#1c1c1e",
        border: (isSpeaking && !large)
          ? `2px solid #7FE8C9`
          : large ? "none" : "2px solid rgba(255,255,255,0.06)",
        boxShadow: (isSpeaking && !large) ? `0 0 30px rgba(127, 232, 201, 0.3)` : "none",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: large ? "100%" : 140,
        width: large ? "100%" : undefined,
        aspectRatio: large ? undefined : "16/9",
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
          objectFit: large ? "contain" : "cover", 
          transform: isLocal ? "scaleX(-1)" : "none", // Mirror local video
          display: stream?.getVideoTracks()[0]?.enabled ? "block" : "none"
        }}
      />

      {/* Avatar Fallback if video is off */}
      {(!stream || !stream.getVideoTracks()[0]?.enabled) && (
        <div style={{ textAlign: "center", position: "absolute" }}>
          <div
            style={{
              width: large ? 80 : 48,
              height: large ? 80 : 48,
              borderRadius: "50%",
              background: `linear-gradient(135deg, #4b5563, #374151)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: large ? "2rem" : "1.2rem",
              color: "#fff",
              margin: "0 auto 8px",
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
        {muted && <MicOff size={10} color="#ef4444" />}
        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#fff" }}>
          {name} {isLocal ? "(You)" : ""}
        </span>
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
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <button
        title={label}
        onClick={onClick}
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
            ? "rgba(127, 232, 201, 0.12)"
            : "rgba(255,255,255,0.07)",
          color: danger ? "#ef4444" : active ? "#7FE8C9" : "rgba(255,255,255,0.7)",
          border: danger
            ? "1px solid rgba(239,68,68,0.25)"
            : active
            ? "1px solid rgba(127, 232, 201, 0.25)"
            : "1px solid rgba(255,255,255,0.08)",
          transition: "all 0.15s",
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

// WebRTC Configuration
const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" }
  ],
};

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.roomId as string;
  const supabase = createClient();

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<Record<string, MediaStream>>({});
  
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [userId, setUserId] = useState<string>("");

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
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          }, 
          audio: true 
        });
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
  }, [roomId, supabase]);

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
    router.push("/dashboard");
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#0A0A0A", // Match the dark aesthetic
        overflow: "hidden",
        position: "relative",
      }}
    >
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
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "#7FE8C9", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.7rem", color: "#0A0A0A" }}>
            XY
          </div>
          <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#fff" }}>
            Room: <span style={{ color: "#7FE8C9", fontFamily: "monospace" }}>{roomId}</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#7FE8C9", fontSize: "0.85rem", fontWeight: 600 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#7FE8C9", animation: "pulse-green 1.5s ease-in-out infinite" }} />
            {formatTime(elapsed)}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.5)", fontSize: "0.82rem" }}>
            <Shield size={13} color="#7FE8C9" /> Encrypted
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.5)", fontSize: "0.82rem" }}>
            <Users size={13} /> {Object.keys(remoteStreams).length + 1}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Video area */}
        <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 12, overflow: "hidden" }}>
          
          {/* Main speaker (Local stream for now, or first remote) */}
          <div style={{ flex: 1, minHeight: 0 }}>
            {Object.keys(remoteStreams).length > 0 ? (
               <VideoTile stream={Object.values(remoteStreams)[0]} name="Remote User" isLocal={false} large />
            ) : (
               <VideoTile stream={localStream} name="Me" isLocal={true} muted={!micOn} large />
            )}
          </div>

          {/* Filmstrip */}
          <div style={{ display: "flex", gap: 10, height: 140, flexShrink: 0, overflowX: "auto" }}>
            {/* Always show local in filmstrip if we have remote users in main */}
            {Object.keys(remoteStreams).length > 0 && (
              <div style={{ minWidth: 200, flex: "0 0 200px" }}>
                <VideoTile stream={localStream} name="Me" isLocal={true} muted={!micOn} />
              </div>
            )}
            
            {/* Other remote streams */}
            {Object.entries(remoteStreams).slice(1).map(([id, stream]) => (
              <div key={id} style={{ minWidth: 200, flex: "0 0 200px" }}>
                <VideoTile stream={stream} name="Participant" isLocal={false} />
              </div>
            ))}
          </div>
        </div>
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
        <ControlButton icon={<MicOff size={20} />} activeIcon={<Mic size={20} />} label={micOn ? "Mute" : "Unmute"} active={micOn} onClick={toggleMic} />
        <ControlButton icon={<VideoOff size={20} />} activeIcon={<Video size={20} />} label={camOn ? "Stop" : "Start"} active={camOn} onClick={toggleCam} />
        <ControlButton icon={<Share2 size={20} />} label="Share" active={false} />
        <ControlButton icon={<Smile size={20} />} label="React" active={false} />
        <ControlButton icon={<MessageSquare size={20} />} label="Chat" active={false} />
        <ControlButton icon={<Users size={20} />} label="People" active={false} />

        {/* Leave button */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <button
            onClick={leaveRoom}
            style={{
              width: 52, height: 52, borderRadius: 16, border: "none", cursor: "pointer",
              background: "rgba(239,68,68,0.9)", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
              boxShadow: "0 0 20px rgba(239,68,68,0.3)",
            }}
          >
            <PhoneOff size={20} />
          </button>
          <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>Leave</span>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-green {
          0% { box-shadow: 0 0 0 0 rgba(127, 232, 201, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(127, 232, 201, 0); }
          100% { box-shadow: 0 0 0 0 rgba(127, 232, 201, 0); }
        }
      `}} />
    </div>
  );
}
