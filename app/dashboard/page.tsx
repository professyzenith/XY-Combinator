"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Video, Plus, Calendar, Clock, Users, Settings,
  LogOut, ChevronRight, Mic, Share2, BarChart2,
  Home, BookOpen, Bell, Search, ArrowUpRight,
} from "lucide-react";

const UPCOMING = [
  { id: 1, title: "Team Standup", time: "Today, 10:00 AM", participants: 5, room: "standup", color: "#22c55e" },
  { id: 2, title: "Product Review", time: "Today, 2:00 PM", participants: 8, room: "product", color: "#3b82f6" },
  { id: 3, title: "Investor Call", time: "Tomorrow, 11:00 AM", participants: 3, room: "investor", color: "#a855f7" },
];

const RECENT = [
  { id: 1, title: "Design Sprint", duration: "1h 24m", participants: 6, date: "Yesterday", color: "#f59e0b" },
  { id: 2, title: "Engineering Sync", duration: "45m", participants: 4, date: "2 days ago", color: "#22c55e" },
  { id: 3, title: "Sales Review", duration: "2h 10m", participants: 12, date: "3 days ago", color: "#ec4899" },
];

const QUICK_ACTIONS = [
  { icon: Plus, label: "New Meeting", color: "#22c55e", href: "/room/new", desc: "Start instantly" },
  { icon: Video, label: "Join Meeting", color: "#3b82f6", href: "/join", desc: "Enter a code" },
  { icon: Calendar, label: "Schedule", color: "#a855f7", href: "#", desc: "Plan ahead" },
  { icon: Share2, label: "Share Screen", color: "#f59e0b", href: "#", desc: "Quick share" },
];

const NAV_ITEMS = [
  { icon: Home, label: "Home", href: "/dashboard", active: true },
  { icon: Video, label: "Meetings", href: "#", active: false },
  { icon: Calendar, label: "Schedule", href: "#", active: false },
  { icon: BookOpen, label: "Recordings", href: "#", active: false },
  { icon: BarChart2, label: "Analytics", href: "#", active: false },
];

function SidebarLink({ icon: Icon, label, href, active }: { icon: typeof Home; label: string; href: string; active: boolean }) {
  return (
    <motion.div whileHover={{ x: 2 }} transition={{ type: "spring", stiffness: 500, damping: 30 }}>
      <Link
        href={href}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 12px",
          borderRadius: 10,
          textDecoration: "none",
          fontSize: "0.875rem",
          fontWeight: active ? 600 : 500,
          color: active ? "var(--text-100)" : "var(--text-400)",
          background: active ? "rgba(34,197,94,0.08)" : "transparent",
          border: active ? "1px solid rgba(34,197,94,0.15)" : "1px solid transparent",
          transition: "background 0.2s ease, color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          if (!active) {
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-200)";
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
          }
        }}
        onMouseLeave={(e) => {
          if (!active) {
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-400)";
            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
          }
        }}
      >
        <Icon size={17} color={active ? "#22c55e" : undefined} />
        {label}
        {active && (
          <div
            style={{
              marginLeft: "auto",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#22c55e",
              animation: "pulse-green 2s infinite",
            }}
          />
        )}
      </Link>
    </motion.div>
  );
}

export default function DashboardPage() {
  const [joinCode, setJoinCode] = useState("");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-base)" }}>
      {/* Sidebar */}
      <aside
        className="hidden md:flex"
        style={{
          width: 232,
          flexDirection: "column",
          background: "var(--bg-surface)",
          borderRight: "1px solid var(--border-100)",
          padding: "20px 12px",
          position: "fixed",
          top: 0, left: 0, bottom: 0,
          zIndex: 100,
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex", alignItems: "center", gap: 10,
            textDecoration: "none", marginBottom: 28, padding: "4px 8px",
          }}
        >
          <div
            style={{
              width: 32, height: 32, borderRadius: 9,
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: "0.8rem", color: "#fff",
            }}
          >
            XY
          </div>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "var(--text-100)", letterSpacing: "-0.02em" }}>
            Combinator
          </span>
        </Link>

        <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
          {NAV_ITEMS.map((item) => (
            <SidebarLink key={item.label} icon={item.icon} label={item.label} href={item.href} active={item.active} />
          ))}
        </nav>

        {/* Bottom profile */}
        <div style={{ borderTop: "1px solid var(--border-100)", paddingTop: 12, display: "flex", flexDirection: "column", gap: 2 }}>
          <SidebarLink icon={Settings} label="Settings" href="#" active={false} />
          <SidebarLink icon={LogOut} label="Sign out" href="/login" active={false} />
          <div
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "12px", marginTop: 8,
              background: "var(--bg-elevated)",
              borderRadius: 12,
              border: "1px solid var(--border-100)",
            }}
          >
            <div
              style={{
                width: 34, height: 34, borderRadius: "50%",
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: "0.85rem", color: "#fff", flexShrink: 0,
              }}
            >
              Z
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-100)" }}>Zenith</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-400)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                Free plan
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, marginLeft: 232, padding: "32px 36px", overflowY: "auto" }} className="md:ml-58 ml-0">
        {/* Topbar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 36 }}>
          <div>
            <h1 className="font-display" style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text-100)", marginBottom: 4 }}>
              Good morning, Zenith 👋
            </h1>
            <p style={{ fontSize: "0.85rem", color: "var(--text-400)" }}>
              You have {UPCOMING.filter(m => m.time.includes("Today")).length} meetings today
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              style={{
                width: 38, height: 38, borderRadius: 10,
                background: "var(--bg-card)",
                border: "1px solid var(--border-100)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--text-400)", cursor: "pointer",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-100)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-400)"; }}
            >
              <Bell size={15} />
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.08 }}
              style={{
                width: 38, height: 38, borderRadius: "50%",
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: "0.85rem", color: "#fff", cursor: "pointer",
                boxShadow: "0 0 16px rgba(34,197,94,0.3)",
              }}
            >
              Z
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14, marginBottom: 28 }}>
          {[
            { label: "Total Meetings", value: "128", icon: Video, color: "#22c55e" },
            { label: "Hours in Calls", value: "47h", icon: Clock, color: "#3b82f6" },
            { label: "Teammates", value: "23", icon: Users, color: "#a855f7" },
            { label: "Recordings", value: "12", icon: Mic, color: "#f59e0b" },
          ].map(({ label, value, icon: Icon, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, transition: { type: "spring", stiffness: 400, damping: 25 } }}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-100)",
                borderRadius: 16,
                padding: "20px 20px",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${color}30`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-100)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{ fontSize: "0.78rem", color: "var(--text-400)", fontWeight: 500 }}>{label}</span>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: `${color}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={14} color={color} />
                </div>
              </div>
              <div className="font-display" style={{ fontSize: "1.9rem", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text-100)", lineHeight: 1 }}>
                {value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 28 }}>
          {QUICK_ACTIONS.map(({ icon: Icon, label, color, href, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 25 } }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href={href}
                style={{
                  display: "flex", flexDirection: "column", gap: 14,
                  padding: "22px 20px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-100)",
                  borderRadius: 16,
                  textDecoration: "none",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                  overflow: "hidden",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = `${color}30`;
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 12px 32px rgba(0,0,0,0.3)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-100)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    position: "absolute", top: 0, right: 0,
                    width: 80, height: 80,
                    background: `radial-gradient(circle at 100% 0%, ${color}0a 0%, transparent 70%)`,
                  }}
                />
                <div
                  style={{
                    width: 42, height: 42, borderRadius: 12,
                    background: `${color}12`, border: `1px solid ${color}25`,
                    display: "flex", alignItems: "center", justifyContent: "center", color,
                  }}
                >
                  <Icon size={19} />
                </div>
                <div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-100)", marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: "0.76rem", color: "var(--text-400)" }}>{desc}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Join by code */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            background: "rgba(34,197,94,0.04)",
            border: "1px solid rgba(34,197,94,0.15)",
            borderRadius: 16,
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 28,
            flexWrap: "wrap",
          }}
        >
          <Search size={16} color="#22c55e" style={{ flexShrink: 0 }} />
          <input
            className="input"
            placeholder="Enter meeting code to join (e.g. abc-123)"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            style={{ flex: 1, minWidth: 200, background: "transparent", border: "none", boxShadow: "none", padding: "0" }}
          />
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href={`/room/${joinCode || "demo"}`} className="btn btn-primary btn-sm">
              Join <ChevronRight size={14} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Two col */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {/* Upcoming */}
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-100)",
              borderRadius: 20,
              padding: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 className="font-display" style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-100)", letterSpacing: "-0.02em" }}>
                Upcoming meetings
              </h2>
              <Link href="#" style={{ fontSize: "0.78rem", color: "var(--text-400)", textDecoration: "none", display: "flex", alignItems: "center", gap: 2 }}>
                View all <ArrowUpRight size={11} />
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {UPCOMING.map((m) => (
                <motion.div
                  key={m.id}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "13px 16px",
                    borderRadius: 12,
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-100)",
                    transition: "border-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${m.color}30`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-100)"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.color, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-100)", marginBottom: 2 }}>{m.title}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-400)" }}>{m.time} · {m.participants} people</div>
                    </div>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href={`/room/${m.room}`} className="btn btn-primary btn-sm" style={{ fontSize: "0.76rem", padding: "7px 14px" }}>
                      Join
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent */}
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-100)",
              borderRadius: 20,
              padding: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 className="font-display" style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-100)", letterSpacing: "-0.02em" }}>
                Recent meetings
              </h2>
              <Link href="#" style={{ fontSize: "0.78rem", color: "var(--text-400)", textDecoration: "none", display: "flex", alignItems: "center", gap: 2 }}>
                View all <ArrowUpRight size={11} />
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {RECENT.map((m) => (
                <motion.div
                  key={m.id}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "13px 16px", borderRadius: 12,
                    background: "var(--bg-elevated)", border: "1px solid var(--border-100)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        width: 34, height: 34, borderRadius: 10,
                        background: `${m.color}12`,
                        border: `1px solid ${m.color}25`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Video size={14} color={m.color} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-100)", marginBottom: 2 }}>{m.title}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-400)" }}>{m.date} · {m.duration} · {m.participants} people</div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, color: "var(--text-100)" }}
                    style={{
                      width: 30, height: 30, borderRadius: 8,
                      background: "var(--bg-subtle)", border: "1px solid var(--border-100)",
                      cursor: "pointer", color: "var(--text-400)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <ChevronRight size={13} />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
