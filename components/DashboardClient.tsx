"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Video, Clock, Copy, Plus, ArrowRight, Home, Users, Settings, Calendar as CalendarIcon, Search } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";

interface UserInfo {
  email: string;
  fullName: string;
  initials: string;
}

export default function DashboardClient({ user }: { user: UserInfo }) {
  const router = useRouter();
  const supabase = createClient();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isStartingMeeting, setIsStartingMeeting] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  // Hydration-safe clock
  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSignOut = () => {
    setIsSigningOut(true);
    // Instantly navigate to the home page for a smooth, zero-delay transition
    router.push("/");
    
    // Clear the session in the background and tell Next.js to refresh its cache
    supabase.auth.signOut().then(() => {
      router.refresh();
    });
  };

  const handleStartMeeting = () => {
    setIsStartingMeeting(true);
    const roomId = Math.random().toString(36).substring(2, 9) + "-" + Math.random().toString(36).substring(2, 9);
    router.push(`/room/${roomId}`);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  // Soft Organic Theme Colors
  const bgApp = "#f4f2eb";
  const bgCard = "#ffffff";
  const bgTaupe = "#d7d2c6"; 
  const textDark = "#2a2b2e";
  const textLight = "#8a8b8e";
  const yellowAccent = "#ffcc00";
  const charcoal = "#242528";
  const softShadow = "0 12px 40px rgba(0,0,0,0.04)";
  
  const fontFam = "'Nunito', 'Quicksand', 'Inter', system-ui, sans-serif";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div style={{ 
      display: "flex", 
      minHeight: "100vh", 
      background: bgApp, 
      color: textDark, 
      fontFamily: fontFam, 
      padding: "24px", 
      gap: "24px" 
    }}>
      
      {/* 1. Left Sidebar Navigation (Floating Pill) */}
      <aside style={{ 
        width: "240px", 
        background: bgCard, 
        display: "flex", flexDirection: "column", 
        padding: "32px 20px",
        borderRadius: "32px", 
        boxShadow: softShadow
      }}>
        {/* User Profile at the top (Replaced JEDI) */}
        <div style={{ 
          marginBottom: "40px", padding: "12px", background: bgApp, 
          borderRadius: "100px",
          display: "flex", alignItems: "center", justifyContent: "space-between" 
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, overflow: "hidden" }}>
            <div style={{ width: 36, height: 36, background: charcoal, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: "800", color: "#fff" }}>
              {user.initials}
            </div>
            <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <span style={{ fontSize: "0.9rem", fontWeight: 800, color: textDark, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", letterSpacing: "-0.2px" }}>{user.fullName}</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: charcoal, color: "#fff", fontWeight: 700, cursor: "pointer", borderRadius: "100px", boxShadow: "0 8px 24px rgba(36,37,40,0.2)", fontSize: "0.95rem" }}>
            <Home size={20} color={yellowAccent} strokeWidth={2.5} />
            <span>Home</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", color: textLight, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", borderRadius: "100px", fontSize: "0.95rem" }} onMouseOver={(e) => { e.currentTarget.style.background = "#f7f7f7"; e.currentTarget.style.color = textDark; }} onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = textLight; }}>
            <CalendarIcon size={20} strokeWidth={2.5} />
            <span>Schedule</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", color: textLight, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", borderRadius: "100px", fontSize: "0.95rem" }} onMouseOver={(e) => { e.currentTarget.style.background = "#f7f7f7"; e.currentTarget.style.color = textDark; }} onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = textLight; }}>
            <Users size={20} strokeWidth={2.5} />
            {/* Replaced Trainers with Contacts */}
            <span>Contacts</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", color: textLight, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", borderRadius: "100px", fontSize: "0.95rem" }} onMouseOver={(e) => { e.currentTarget.style.background = "#f7f7f7"; e.currentTarget.style.color = textDark; }} onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = textLight; }}>
            <Settings size={20} strokeWidth={2.5} />
            {/* Replaced Preferences with Settings */}
            <span>Settings</span>
          </div>
        </nav>

        {/* Sign out at bottom */}
        <button onClick={handleSignOut} disabled={isSigningOut} style={{ 
          marginTop: "auto", background: "#fff", border: "none", color: textLight, cursor: "pointer", padding: "14px", 
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: "100px", 
          fontWeight: 700, transition: "background 0.2s, color 0.2s" 
        }} 
        onMouseOver={(e) => { e.currentTarget.style.background = "#f7f7f7"; e.currentTarget.style.color = "#ef4444"; }} 
        onMouseOut={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = textLight; }}>
          {isSigningOut ? <div style={{ width: 14, height: 14, border: `2px solid ${textLight}`, borderTopColor: "transparent", animation: "spin 1s linear infinite", borderRadius: "50%" }} /> : (
            <>
              <LogOut size={16} strokeWidth={2.5} /> Sign out
            </>
          )}
        </button>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto", padding: "8px" }}>
        
        {/* 2. Header & Live Clock */}
        <header style={{ 
          display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px"
        }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h1 style={{ fontSize: "2.2rem", fontWeight: 800, margin: "0 0 4px 0", color: textDark, letterSpacing: "-1px" }}>Hi, {user.fullName.split(' ')[0]}!</h1>
            <p style={{ margin: 0, color: textLight, fontSize: "1rem", fontWeight: 600 }}>Let's take a look at your activity today</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Clock Pill (Search bar removed) */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, background: charcoal, padding: "12px 24px", borderRadius: "100px", boxShadow: "0 8px 24px rgba(36,37,40,0.2)" }}>
              <span style={{ fontSize: "1rem", fontWeight: 800, color: "#fff", fontVariantNumeric: "tabular-nums" }}>
                {currentTime ? formatTime(currentTime) : "--:--"}
              </span>
            </div>
          </motion.div>
        </header>

        <motion.div 
          style={{ maxWidth: "1100px", width: "100%" }}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          
          {/* 3. Upcoming Meeting Card (Taupe with soft glowing orbs) */}
          <motion.div variants={itemVariants} style={{ 
            background: bgTaupe, borderRadius: "40px", padding: "40px",
            display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32,
            boxShadow: softShadow, color: textDark,
            position: "relative", overflow: "hidden", minHeight: "220px"
          }}>
            {/* Background glowing orbs matching the image vibe */}
            <motion.div 
              animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", top: "20%", right: "30%", width: "150px", height: "150px", background: "rgba(255,204,0,0.4)", filter: "blur(40px)", borderRadius: "50%" }} 
            />
            <motion.div 
              animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              style={{ position: "absolute", bottom: "10%", right: "45%", width: "120px", height: "120px", background: "rgba(255,100,100,0.3)", filter: "blur(30px)", borderRadius: "50%" }} 
            />

            <div style={{ position: "relative", zIndex: 10 }}>
              <h3 style={{ margin: "0 0 12px 0", fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-0.5px" }}>Premium Calling</h3>
              <p style={{ margin: 0, fontSize: "1rem", fontWeight: 600, color: "rgba(42,43,46,0.8)" }}>Experience the highest quality video meetings.</p>
              
              <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>
                 <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 32, height: 8, borderRadius: "4px", background: yellowAccent }}></div>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "rgba(42,43,46,0.7)" }}>1080p HD Video</span>
                 </div>
                 <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 32, height: 8, borderRadius: "4px", background: "#ff6b6b" }}></div>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "rgba(42,43,46,0.7)" }}>Crystal Clear Audio</span>
                 </div>
                 <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 32, height: 8, borderRadius: "4px", background: charcoal }}></div>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "rgba(42,43,46,0.7)" }}>End-to-End Encryption</span>
                 </div>
              </div>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ 
              position: "relative", zIndex: 10, alignSelf: "flex-start",
              background: charcoal, color: "#fff", border: "none", padding: "16px 32px", borderRadius: "100px",
              fontSize: "0.95rem", fontWeight: 700, cursor: "pointer",
              boxShadow: "0 8px 24px rgba(36,37,40,0.3)"
            }}>
              Test Connection
            </motion.button>
          </motion.div>

          {/* 4. Action Tiles */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 40 }}>
            
            {/* New Meeting Tile (White Soft Card) */}
            <motion.div variants={itemVariants} whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.06)" }} style={{
              background: bgCard, borderRadius: "40px", padding: "32px",
              display: "flex", flexDirection: "column",
              boxShadow: softShadow
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
                 <div style={{ width: 56, height: 56, background: bgApp, borderRadius: "50%", color: textDark, display: "flex", alignItems: "center", justifyContent: "center" }}>
                   <Video size={24} strokeWidth={2.5} />
                 </div>
                 <div style={{ background: "rgba(255,204,0,0.1)", color: "#e6b800", padding: "6px 12px", borderRadius: "100px", fontSize: "0.8rem", fontWeight: 800 }}>Instant</div>
              </div>

              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: textDark, margin: "0 0 8px 0", letterSpacing: "-0.5px" }}>Start Meeting</h2>
              <p style={{ fontSize: "0.95rem", fontWeight: 600, color: textLight, margin: "0 0 24px 0" }}>Launch a high-fidelity video room.</p>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartMeeting}
                disabled={isStartingMeeting}
                style={{
                  marginTop: "auto", background: charcoal, border: "none", padding: "16px 24px", borderRadius: "100px",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  fontSize: "0.95rem", fontWeight: 700, color: "#fff", cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(36,37,40,0.2)"
                }}
              >
                {isStartingMeeting ? (
                  <div style={{ width: 18, height: 18, border: `3px solid rgba(255,255,255,0.3)`, borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                ) : (
                  <>
                    Launch Room <ArrowRight size={18} strokeWidth={3} />
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Join Meeting Tile (White Soft Card) */}
            <motion.div variants={itemVariants} whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.06)" }} style={{
              background: bgCard, borderRadius: "40px", padding: "32px",
              display: "flex", flexDirection: "column",
              boxShadow: softShadow
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
                 <div style={{ width: 56, height: 56, background: bgApp, borderRadius: "50%", color: textDark, display: "flex", alignItems: "center", justifyContent: "center" }}>
                   <Plus size={24} strokeWidth={3} />
                 </div>
                 <div style={{ background: "rgba(36,37,40,0.05)", color: textLight, padding: "6px 12px", borderRadius: "100px", fontSize: "0.8rem", fontWeight: 800 }}>Join</div>
              </div>

              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: textDark, margin: "0 0 8px 0", letterSpacing: "-0.5px" }}>Join Meeting</h2>
              <p style={{ fontSize: "0.95rem", fontWeight: 600, color: textLight, margin: "0 0 24px 0" }}>Enter a code to join a room.</p>
              
              <div style={{ position: "relative", marginTop: "auto" }}>
                <input 
                  type="text" 
                  placeholder="Paste room ID" 
                  style={{ 
                    width: "100%", padding: "16px 56px 16px 24px", borderRadius: "100px",
                    border: "none", background: bgApp,
                    color: textDark, fontSize: "0.95rem", fontWeight: 700, outline: "none",
                  }}
                />
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{
                  position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)",
                  background: charcoal, border: "none", borderRadius: "50%",
                  width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", cursor: "pointer", boxShadow: "0 4px 12px rgba(36,37,40,0.2)"
                }}>
                  <ArrowRight size={18} strokeWidth={2.5} />
                </motion.button>
              </div>
            </motion.div>

          </div>

        </motion.div>
      </main>
      
    </div>
  );
}
