"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Video, Plus, Calendar, Clock, Users, Settings,
  LogOut, ChevronRight, Mic, Share2, BarChart2,
  Home, BookOpen, Bell
} from "lucide-react";

const UPCOMING = [
  { id: 1, title: "Team Standup", time: "Today, 10:00 AM", participants: 5, room: "abc-123" },
  { id: 2, title: "Product Review", time: "Today, 2:00 PM", participants: 8, room: "def-456" },
  { id: 3, title: "Investor Call", time: "Tomorrow, 11:00 AM", participants: 3, room: "ghi-789" },
];

const RECENT = [
  { id: 1, title: "Design Sprint", duration: "1h 24m", participants: 6, date: "Yesterday" },
  { id: 2, title: "Engineering Sync", duration: "45m", participants: 4, date: "2 days ago" },
  { id: 3, title: "Sales Review", duration: "2h 10m", participants: 12, date: "3 days ago" },
];

const QUICK_ACTIONS = [
  { icon: <Plus size={20} />, label: "New Meeting", color: "#22c55e", href: "/room/new" },
  { icon: <Video size={20} />, label: "Join Meeting", color: "#3b82f6", href: "/join" },
  { icon: <Calendar size={20} />, label: "Schedule", color: "#a855f7", href: "#" },
  { icon: <Share2 size={20} />, label: "Share Screen", color: "#f59e0b", href: "#" },
];

const NAV_ITEMS = [
  { icon: <Home size={18} />, label: "Home", href: "/dashboard", active: true },
  { icon: <Video size={18} />, label: "Meetings", href: "#", active: false },
  { icon: <Calendar size={18} />, label: "Schedule", href: "#", active: false },
  { icon: <BookOpen size={18} />, label: "Recordings", href: "#", active: false },
  { icon: <BarChart2 size={18} />, label: "Analytics", href: "#", active: false },
];

export default function DashboardPage() {
  const [joinCode, setJoinCode] = useState("");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-base)" }}>
      {/* Sidebar */}
      <aside
        className="hidden md:flex"
        style={{
          width: 240,
          flexDirection: "column",
          background: "var(--bg-surface)",
          borderRight: "1px solid var(--border-subtle)",
          padding: "24px 16px",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 100,
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 32, padding: "0 8px",
          }}
        >
          <div
            style={{
              width: 34, height: 34, borderRadius: 10,
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "0.85rem", color: "#fff",
            }}
          >
            XY
          </div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#fff" }}>
            Combinator
          </span>
        </Link>

        {/* Nav */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10,
                textDecoration: "none", fontSize: "0.88rem", fontWeight: 500,
                color: item.active ? "#fff" : "var(--text-muted)",
                background: item.active ? "rgba(34,197,94,0.1)" : "transparent",
                border: item.active ? "1px solid rgba(34,197,94,0.2)" : "1px solid transparent",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!item.active) {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
                }
              }}
              onMouseLeave={(e) => {
                if (!item.active) {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }
              }}
            >
              <span style={{ color: item.active ? "#22c55e" : "inherit" }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Link href="#" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10, textDecoration: "none", fontSize: "0.88rem", fontWeight: 500, color: "var(--text-muted)", transition: "all 0.2s ease" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)"; }}
          >
            <Settings size={18} /> Settings
          </Link>
          <Link href="/login" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10, textDecoration: "none", fontSize: "0.88rem", fontWeight: 500, color: "var(--text-muted)", transition: "all 0.2s ease" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#ef4444"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)"; }}
          >
            <LogOut size={18} /> Sign out
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, marginLeft: 240, padding: "32px 40px", maxWidth: "calc(100vw - 240px)" }} className="md:ml-60 ml-0">
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
          <div>
            <h1 className="font-display" style={{ fontSize: "1.7rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 4 }}>
              Good morning, Zenith 👋
            </h1>
            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
              You have {UPCOMING.length} meetings today
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button style={{ width: 40, height: 40, borderRadius: 10, background: "var(--bg-card)", border: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", cursor: "pointer", transition: "all 0.2s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)"; }}
            >
              <Bell size={17} />
            </button>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #22c55e, #16a34a)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.9rem", color: "#fff", cursor: "pointer" }}>
              Z
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 36 }}>
          {[
            { label: "Total Meetings", value: "128", icon: <Video size={16} />, color: "#22c55e" },
            { label: "Hours in Calls", value: "47h", icon: <Clock size={16} />, color: "#3b82f6" },
            { label: "Teammates", value: "23", icon: <Users size={16} />, color: "#a855f7" },
            { label: "Recordings", value: "12", icon: <Mic size={16} />, color: "#f59e0b" },
          ].map(({ label, value, icon, color }) => (
            <div key={label} className="card" style={{ padding: "20px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 500 }}>{label}</span>
                <div style={{ color, opacity: 0.8 }}>{icon}</div>
              </div>
              <div className="font-display" style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 36 }}>
          {QUICK_ACTIONS.map(({ icon, label, color, href }) => (
            <Link
              key={label}
              href={href}
              className="card"
              style={{
                padding: "24px 20px", display: "flex", flexDirection: "column", alignItems: "flex-start",
                gap: 12, textDecoration: "none", cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = `${color}44`;
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-subtle)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}15`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", color }}>
                {icon}
              </div>
              <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#fff" }}>{label}</span>
            </Link>
          ))}
        </div>

        {/* Join by code */}
        <div className="glass-green" style={{ borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16, marginBottom: 36, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 6 }}>Join with meeting code</p>
            <input
              className="input"
              placeholder="Enter code (e.g. abc-123-xyz)"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              style={{ background: "rgba(255,255,255,0.04)" }}
            />
          </div>
          <Link href={`/room/${joinCode || "demo"}`} className="btn btn-primary btn-sm" style={{ alignSelf: "flex-end", marginBottom: 0 }}>
            Join now <ChevronRight size={15} />
          </Link>
        </div>

        {/* Two columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Upcoming */}
          <div className="card" style={{ padding: 24 }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 20, letterSpacing: "-0.02em" }}>Upcoming meetings</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {UPCOMING.map((m) => (
                <div key={m.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-subtle)", transition: "all 0.2s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(34,197,94,0.2)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-subtle)"; }}
                >
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#fff", marginBottom: 3 }}>{m.title}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{m.time} · {m.participants} people</div>
                  </div>
                  <Link href={`/room/${m.room}`} className="btn btn-primary btn-sm" style={{ fontSize: "0.78rem", padding: "8px 14px" }}>
                    Join
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Recent */}
          <div className="card" style={{ padding: 24 }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 20, letterSpacing: "-0.02em" }}>Recent meetings</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {RECENT.map((m) => (
                <div key={m.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-subtle)" }}>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#fff", marginBottom: 3 }}>{m.title}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{m.date} · {m.duration} · {m.participants} people</div>
                  </div>
                  <button style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-subtle)", cursor: "pointer", color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)"; }}
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
