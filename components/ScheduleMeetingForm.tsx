"use client";

import { useState } from "react";
import { Calendar, Clock, Lock, Shield, Video as VideoIcon, Copy, Check, Info } from "lucide-react";
import { motion } from "framer-motion";

// Brand Colors
const primaryBlue = "#2D5BFF";
const bgLight = "#f4f6f8";
const textDark = "#0a0a0a";
const textMuted = "#666";
const borderLight = "rgba(0,0,0,0.08)";

interface ScheduleMeetingFormProps {
  userFullName: string;
}

export default function ScheduleMeetingForm({ userFullName }: ScheduleMeetingFormProps) {
  // Form State
  const [topic, setTopic] = useState(`${userFullName}'s Meeting`);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00");
  const [durationHrs, setDurationHrs] = useState("1");
  const [durationMins, setDurationMins] = useState("0");
  const [passcodeEnabled, setPasscodeEnabled] = useState(true);
  const [passcode, setPasscode] = useState(Math.random().toString(36).substring(2, 8).toUpperCase());
  const [waitingRoom, setWaitingRoom] = useState(true);
  const [hostVideo, setHostVideo] = useState("on");
  const [participantVideo, setParticipantVideo] = useState("on");
  
  // Submit State
  const [isSaving, setIsSaving] = useState(false);
  const [successLink, setSuccessLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call / save to DB
    setTimeout(() => {
      const roomId = Math.random().toString(36).substring(2, 10);
      const link = `${window.location.origin}/room/${roomId}${passcodeEnabled ? `?pwd=${passcode}` : ''}`;
      setSuccessLink(link);
      setIsSaving(false);
    }, 1000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`Join my meeting: ${successLink}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (successLink) {
    return (
      <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", background: "#fff", borderRadius: "24px", boxShadow: "0 10px 40px rgba(0,0,0,0.04)" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ width: 64, height: 64, background: "rgba(45, 91, 255, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Check size={32} color={primaryBlue} />
          </div>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: textDark, marginBottom: "8px" }}>Meeting Scheduled!</h2>
          <p style={{ color: textMuted }}>Your meeting "{topic}" is all set.</p>
        </div>

        <div style={{ background: bgLight, padding: "24px", borderRadius: "16px", marginBottom: "24px" }}>
          <div style={{ marginBottom: "16px" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: textMuted, textTransform: "uppercase", letterSpacing: "1px" }}>Invite Link</span>
            <div style={{ fontSize: "1.1rem", fontWeight: 500, color: primaryBlue, marginTop: "4px", wordBreak: "break-all" }}>
              {successLink}
            </div>
          </div>
          {passcodeEnabled && (
            <div>
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: textMuted, textTransform: "uppercase", letterSpacing: "1px" }}>Passcode</span>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: textDark, marginTop: "4px" }}>
                {passcode}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          <button 
            onClick={handleCopy}
            style={{ flex: 1, padding: "16px", background: primaryBlue, color: "#fff", border: "none", borderRadius: "12px", fontSize: "1.1rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "0.2s" }}
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
            {copied ? "Copied to Clipboard!" : "Copy Invitation"}
          </button>
          <button 
            onClick={() => setSuccessLink("")}
            style={{ padding: "16px 24px", background: "transparent", color: textDark, border: `1px solid ${borderLight}`, borderRadius: "12px", fontSize: "1.1rem", fontWeight: 600, cursor: "pointer" }}
          >
            Schedule Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "60px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: textDark, letterSpacing: "-0.5px" }}>Schedule a Meeting</h1>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        
        {/* TOPIC & DESCRIPTION */}
        <div style={{ background: "#fff", padding: "24px", borderRadius: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "16px", alignItems: "start" }}>
            <label style={{ fontSize: "0.95rem", fontWeight: 600, color: textDark, paddingTop: "12px" }}>Topic</label>
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: `1px solid ${borderLight}`, background: bgLight, fontSize: "1rem", outline: "none" }}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "16px", alignItems: "start", marginTop: "16px" }}>
            <label style={{ fontSize: "0.95rem", fontWeight: 600, color: textDark, paddingTop: "12px" }}>Description</label>
            <textarea 
              placeholder="Optional"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: `1px solid ${borderLight}`, background: bgLight, fontSize: "1rem", outline: "none", minHeight: "80px", resize: "vertical" }}
            />
          </div>
        </div>

        {/* DATE & TIME */}
        <div style={{ background: "#fff", padding: "24px", borderRadius: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "16px", alignItems: "center" }}>
            <label style={{ fontSize: "0.95rem", fontWeight: 600, color: textDark }}>When</label>
            <div style={{ display: "flex", gap: "12px" }}>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ flex: 1, padding: "12px 16px", borderRadius: "12px", border: `1px solid ${borderLight}`, background: bgLight, fontSize: "1rem", outline: "none" }}
              />
              <input 
                type="time" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={{ flex: 1, padding: "12px 16px", borderRadius: "12px", border: `1px solid ${borderLight}`, background: bgLight, fontSize: "1rem", outline: "none" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "16px", alignItems: "start", marginTop: "24px" }}>
            <label style={{ fontSize: "0.95rem", fontWeight: 600, color: textDark, paddingTop: "12px" }}>Duration</label>
            <div>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <select 
                  value={durationHrs}
                  onChange={(e) => setDurationHrs(e.target.value)}
                  style={{ padding: "12px 16px", borderRadius: "12px", border: `1px solid ${borderLight}`, background: bgLight, fontSize: "1rem", outline: "none", width: "100px" }}
                >
                  <option value="0">0 hr</option>
                  <option value="1">1 hr</option>
                  <option value="2">2 hr</option>
                  <option value="3">3 hr</option>
                  <option value="4">4 hr</option>
                </select>
                <select 
                  value={durationMins}
                  onChange={(e) => setDurationMins(e.target.value)}
                  style={{ padding: "12px 16px", borderRadius: "12px", border: `1px solid ${borderLight}`, background: bgLight, fontSize: "1rem", outline: "none", width: "120px" }}
                >
                  <option value="0">0 min</option>
                  <option value="15">15 min</option>
                  <option value="30">30 min</option>
                  <option value="45">45 min</option>
                </select>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px", color: "#b45309", background: "#fef3c7", padding: "12px", borderRadius: "8px", fontSize: "0.9rem" }}>
                <Info size={16} />
                <span>Max duration is currently limited to 4 hours per meeting.</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECURITY */}
        <div style={{ background: "#fff", padding: "24px", borderRadius: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "16px", alignItems: "start" }}>
            <label style={{ fontSize: "0.95rem", fontWeight: 600, color: textDark, paddingTop: "12px" }}>Security</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <input 
                  type="checkbox" 
                  checked={passcodeEnabled}
                  onChange={(e) => setPasscodeEnabled(e.target.checked)}
                  style={{ width: "18px", height: "18px", accentColor: primaryBlue }}
                />
                <span style={{ fontSize: "0.95rem", color: textDark }}>Passcode</span>
                {passcodeEnabled && (
                  <input 
                    type="text" 
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    style={{ padding: "8px 12px", borderRadius: "8px", border: `1px solid ${borderLight}`, background: bgLight, fontSize: "0.95rem", outline: "none", width: "120px" }}
                  />
                )}
              </div>
              <p style={{ margin: "-8px 0 0 30px", fontSize: "0.85rem", color: textMuted }}>
                Only users who have the invite link or passcode can join the meeting.
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
                <input 
                  type="checkbox" 
                  checked={waitingRoom}
                  onChange={(e) => setWaitingRoom(e.target.checked)}
                  style={{ width: "18px", height: "18px", accentColor: primaryBlue }}
                />
                <span style={{ fontSize: "0.95rem", color: textDark }}>Waiting Room</span>
              </div>
              <p style={{ margin: "-8px 0 0 30px", fontSize: "0.85rem", color: textMuted }}>
                Only users admitted by the host can join the meeting.
              </p>
            </div>
          </div>
        </div>

        {/* VIDEO SETTINGS */}
        <div style={{ background: "#fff", padding: "24px", borderRadius: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "16px", alignItems: "start" }}>
            <label style={{ fontSize: "0.95rem", fontWeight: 600, color: textDark }}>Video</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              
              <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", alignItems: "center" }}>
                <span style={{ fontSize: "0.95rem", color: textDark }}>Host</span>
                <div style={{ display: "flex", gap: "16px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.95rem", cursor: "pointer" }}>
                    <input type="radio" name="hostVideo" value="on" checked={hostVideo === "on"} onChange={() => setHostVideo("on")} style={{ accentColor: primaryBlue }} />
                    on
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.95rem", cursor: "pointer" }}>
                    <input type="radio" name="hostVideo" value="off" checked={hostVideo === "off"} onChange={() => setHostVideo("off")} style={{ accentColor: primaryBlue }} />
                    off
                  </label>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", alignItems: "center" }}>
                <span style={{ fontSize: "0.95rem", color: textDark }}>Participant</span>
                <div style={{ display: "flex", gap: "16px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.95rem", cursor: "pointer" }}>
                    <input type="radio" name="participantVideo" value="on" checked={participantVideo === "on"} onChange={() => setParticipantVideo("on")} style={{ accentColor: primaryBlue }} />
                    on
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.95rem", cursor: "pointer" }}>
                    <input type="radio" name="participantVideo" value="off" checked={participantVideo === "off"} onChange={() => setParticipantVideo("off")} style={{ accentColor: primaryBlue }} />
                    off
                  </label>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            style={{ padding: "14px 32px", background: primaryBlue, color: "#fff", border: "none", borderRadius: "12px", fontSize: "1.1rem", fontWeight: 700, cursor: isSaving ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "0.2s", opacity: isSaving ? 0.7 : 1 }}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button 
            style={{ padding: "14px 32px", background: "transparent", color: textDark, border: "none", borderRadius: "12px", fontSize: "1.1rem", fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}
            onMouseOver={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.05)"}
            onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
