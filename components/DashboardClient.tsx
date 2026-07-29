"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Video, Clock, Copy, Plus, ArrowRight, Home, Users, Settings, Calendar as CalendarIcon, Search, Star } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";

interface UserInfo {
  email: string;
  fullName: string;
  initials: string;
  avatarUrl?: string | null;
  phone?: string;
}

export default function DashboardClient({ user }: { user: UserInfo }) {
  const router = useRouter();
  const supabase = createClient();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isStartingMeeting, setIsStartingMeeting] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  const [activeTab, setActiveTab] = useState<'home' | 'settings'>('home');

  // Settings states
  const [settingsName, setSettingsName] = useState(user.fullName);
  const [settingsEmail, setSettingsEmail] = useState(user.email);
  const [settingsPhone, setSettingsPhone] = useState(user.phone || "");
  const [settingsAvatar, setSettingsAvatar] = useState(user.avatarUrl || "");
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsMessage, setSettingsMessage] = useState("");

  const PRESET_AVATARS = [
    // Girls
    `https://api.dicebear.com/9.x/lorelei/svg?seed=Mia&backgroundColor=ffd5dc`,
    `https://api.dicebear.com/9.x/lorelei/svg?seed=Sophia&backgroundColor=f4d8e8`,
    `https://api.dicebear.com/9.x/micah/svg?seed=Lily&backgroundColor=ffdfbf`,
    `https://api.dicebear.com/9.x/micah/svg?seed=Chloe&backgroundColor=d1d4f9`,
    `https://api.dicebear.com/9.x/adventurer/svg?seed=Zoe&backgroundColor=c0aede`,
    `https://api.dicebear.com/9.x/adventurer/svg?seed=Aria&backgroundColor=ffdfbf`,
    `https://api.dicebear.com/9.x/notionists/svg?seed=Ella&backgroundColor=ffd5dc`,
    
    // Boys
    `https://api.dicebear.com/9.x/micah/svg?seed=Noah&backgroundColor=b6e3f4`,
    `https://api.dicebear.com/9.x/micah/svg?seed=Oliver&backgroundColor=c0aede`,
    `https://api.dicebear.com/9.x/adventurer/svg?seed=Liam&backgroundColor=b6e3f4`,
    `https://api.dicebear.com/9.x/adventurer/svg?seed=Elijah&backgroundColor=f4f2eb`,
    `https://api.dicebear.com/9.x/notionists/svg?seed=Mateo&backgroundColor=c0aede`,
    `https://api.dicebear.com/9.x/notionists/svg?seed=Lucas&backgroundColor=b6e3f4`,
    
    // Fun / Robots
    `https://api.dicebear.com/9.x/bottts/svg?seed=R2D2&backgroundColor=f4f2eb`,
    `https://api.dicebear.com/9.x/bottts/svg?seed=C3PO&backgroundColor=d1d4f9`,
    `https://api.dicebear.com/9.x/fun-emoji/svg?seed=Smile&backgroundColor=ffd5dc`,
    `https://api.dicebear.com/9.x/fun-emoji/svg?seed=Wink&backgroundColor=b6e3f4`
  ];

  const handleSaveSettings = async () => {
    setIsSavingSettings(true);
    setSettingsMessage("");
    try {
      // Only include email in payload if it actually changed, to prevent redundant confirmation emails
      const updatePayload: any = {
        data: { full_name: settingsName, avatar_url: settingsAvatar, phone: settingsPhone }
      };
      
      if (settingsEmail !== user.email) {
        updatePayload.email = settingsEmail;
      }

      const { error } = await supabase.auth.updateUser(updatePayload);
      if (error) throw error;
      setSettingsMessage("Profile updated successfully!");
      setTimeout(() => router.refresh(), 1000);
    } catch (err: any) {
      console.error(err);
      setSettingsMessage(`Error: ${err.message || JSON.stringify(err)}`);
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSettingsMessage("Uploading avatar...");
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.email}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      setSettingsAvatar(data.publicUrl);
      setSettingsMessage("Avatar uploaded! Remember to click Save.");
    } catch (error: any) {
      setSettingsMessage(`Upload error: ${error.message}`);
    }
  };

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

  const [isInstantLaunching, setIsInstantLaunching] = useState(false);

  const handleStartMeeting = () => {
    setIsStartingMeeting(true);
    router.push(`/setup?name=${encodeURIComponent(user.fullName)}`);
  };

  const handleInstantMeeting = () => {
    setIsInstantLaunching(true);
    const roomId = Math.random().toString(36).substring(2, 9) + "-" + Math.random().toString(36).substring(2, 9);
    router.push(`/room/${roomId}?name=${encodeURIComponent(user.fullName)}&topic=Instant%20Meeting&capacity=50&host=true`);
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
        <div style={{ 
          padding: "20px 16px", background: "rgba(255, 255, 255, 0.6)", borderRadius: "24px", 
          display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.02)", marginBottom: "40px"
        }}>
          <div style={{ width: 64, height: 64, background: user.avatarUrl ? "#fff" : charcoal, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", fontWeight: "800", color: "#fff", overflow: "hidden", border: user.avatarUrl ? "3px solid #fff" : "none", flexShrink: 0, boxShadow: "0 4px 14px rgba(0,0,0,0.12)" }}>
            {user.avatarUrl ? <img src={user.avatarUrl} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : user.initials}
          </div>
          <span style={{ fontSize: "1rem", fontWeight: 800, color: textDark, textAlign: "center", lineHeight: "1.3", letterSpacing: "-0.3px", wordBreak: "break-word" }}>{user.fullName}</span>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
          <div onClick={() => setActiveTab('home')} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: activeTab === 'home' ? charcoal : "transparent", color: activeTab === 'home' ? "#fff" : textLight, fontWeight: 700, cursor: "pointer", borderRadius: "100px", boxShadow: activeTab === 'home' ? "0 8px 24px rgba(36,37,40,0.2)" : "none", fontSize: "0.95rem" }} onMouseOver={(e) => { if(activeTab !== 'home') { e.currentTarget.style.background = "#f7f7f7"; e.currentTarget.style.color = textDark; } }} onMouseOut={(e) => { if(activeTab !== 'home') { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = textLight; } }}>
            <Home size={20} color={activeTab === 'home' ? yellowAccent : "currentColor"} strokeWidth={2.5} />
            <span>Home</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", color: textLight, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", borderRadius: "100px", fontSize: "0.95rem" }} onMouseOver={(e) => { e.currentTarget.style.background = "#f7f7f7"; e.currentTarget.style.color = textDark; }} onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = textLight; }}>
            <CalendarIcon size={20} strokeWidth={2.5} />
            <span>Schedule</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", color: textLight, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", borderRadius: "100px", fontSize: "0.95rem" }} onMouseOver={(e) => { e.currentTarget.style.background = "#f7f7f7"; e.currentTarget.style.color = textDark; }} onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = textLight; }}>
            <Users size={20} strokeWidth={2.5} />
            <span>Contacts</span>
          </div>
          <div onClick={() => setActiveTab('settings')} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: activeTab === 'settings' ? charcoal : "transparent", color: activeTab === 'settings' ? "#fff" : textLight, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", borderRadius: "100px", fontSize: "0.95rem" }} onMouseOver={(e) => { if(activeTab !== 'settings') { e.currentTarget.style.background = "#f7f7f7"; e.currentTarget.style.color = textDark; } }} onMouseOut={(e) => { if(activeTab !== 'settings') { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = textLight; } }}>
            <Settings size={20} color={activeTab === 'settings' ? yellowAccent : "currentColor"} strokeWidth={2.5} />
            <span>Settings</span>
          </div>
          
          <div onClick={() => router.push("/pricing")} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", color: "#fbbf24", fontWeight: 700, cursor: "pointer", transition: "all 0.2s", borderRadius: "100px", fontSize: "0.95rem", marginTop: 8 }} onMouseOver={(e) => { e.currentTarget.style.background = "rgba(251,191,36,0.1)"; }} onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; }}>
            <Star size={20} strokeWidth={2.5} />
            <span>Upgrade</span>
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
            {activeTab === 'home' ? (
              <>
                <h1 style={{ fontSize: "2.2rem", fontWeight: 800, margin: "0 0 4px 0", color: textDark, letterSpacing: "-1px" }}>Hi, {user.fullName.split(' ')[0]}!</h1>
                <p style={{ margin: 0, color: textLight, fontSize: "1rem", fontWeight: 600 }}>Let's take a look at your activity today</p>
              </>
            ) : (
              <>
                <h1 style={{ fontSize: "2.2rem", fontWeight: 800, margin: "0 0 4px 0", color: textDark, letterSpacing: "-1px" }}>Settings</h1>
                <p style={{ margin: 0, color: textLight, fontSize: "1rem", fontWeight: 600 }}>Manage your personal details and preferences</p>
              </>
            )}
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Clock Pill */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, background: charcoal, padding: "12px 24px", borderRadius: "100px", boxShadow: "0 8px 24px rgba(36,37,40,0.2)" }}>
              <span style={{ fontSize: "1rem", fontWeight: 800, color: "#fff", fontVariantNumeric: "tabular-nums" }}>
                {currentTime ? formatTime(currentTime) : "--:--"}
              </span>
            </div>
            {/* Exit to Main Web Button */}
            <button
              onClick={() => router.replace("/")}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "#fecaca", color: "#ef4444", border: "none",
                padding: "12px 24px", borderRadius: "100px",
                fontSize: "0.95rem", fontWeight: 700, cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = "#f87171"; e.currentTarget.style.color = "#fff"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "#fecaca"; e.currentTarget.style.color = "#ef4444"; }}
            >
              <LogOut size={18} strokeWidth={2.5} /> Exit
            </button>
          </motion.div>
        </header>

        <motion.div 
          style={{ maxWidth: "1100px", width: "100%" }}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          
          {activeTab === 'home' ? (
            <>
              {/* 3. Upcoming Meeting Card (Taupe with soft glowing orbs) */}
              <motion.div variants={itemVariants} style={{ 
            background: "linear-gradient(135deg, #d7d2c6 0%, #e8e4db 100%)", borderRadius: "40px", padding: "40px",
            display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32,
            boxShadow: softShadow, color: textDark,
            position: "relative", overflow: "hidden", minHeight: "220px"
          }}>
            <div style={{ position: "relative", zIndex: 10 }}>
              <h3 style={{ margin: "0 0 12px 0", fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-0.5px" }}>Premium Calling</h3>
              <p style={{ margin: 0, fontSize: "1rem", fontWeight: 600, color: "rgba(42,43,46,0.8)" }}>Experience the highest quality video meetings.</p>
              
              <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>
                 <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 32, height: 8, borderRadius: "4px", background: yellowAccent }}></div>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "rgba(42,43,46,0.7)" }}>1080p HD Video</span>
                 </motion.div>
                 <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.3 }} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 32, height: 8, borderRadius: "4px", background: "#ff6b6b" }}></div>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "rgba(42,43,46,0.7)" }}>Crystal Clear Audio</span>
                 </motion.div>
                 <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2.6 }} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 32, height: 8, borderRadius: "4px", background: charcoal }}></div>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "rgba(42,43,46,0.7)" }}>End-to-End Encryption</span>
                 </motion.div>
              </div>
            </div>
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
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    style={{ width: 18, height: 18, border: `3px solid rgba(255,255,255,0.3)`, borderTopColor: "#fff", borderRadius: "50%" }} 
                  />
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

            </>
          ) : (
            <motion.div variants={itemVariants} style={{ background: bgCard, borderRadius: "40px", padding: "40px", boxShadow: softShadow, color: textDark }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: "0 0 24px 0" }}>Profile Picture</h2>
              <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", marginBottom: "40px" }}>
                <div style={{ width: 100, height: 100, background: bgApp, borderRadius: "50%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", fontWeight: 800, color: textLight, flexShrink: 0 }}>
                  {settingsAvatar ? <img src={settingsAvatar} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : user.initials}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <label style={{ cursor: "pointer", background: charcoal, color: "#fff", padding: "10px 20px", borderRadius: "100px", fontWeight: 700, fontSize: "0.9rem", display: "inline-block", textAlign: "center", width: "fit-content" }}>
                    Upload from device
                    <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarUpload} />
                  </label>
                  <span style={{ fontSize: "0.85rem", color: textLight, fontWeight: 600 }}>Or choose a preset:</span>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    {PRESET_AVATARS.map((url, idx) => (
                      <div key={idx} onClick={() => setSettingsAvatar(url)} style={{ width: 48, height: 48, borderRadius: "50%", background: bgApp, cursor: "pointer", overflow: "hidden", border: settingsAvatar === url ? `2px solid ${charcoal}` : "2px solid transparent", flexShrink: 0 }}>
                        <img src={url} alt={`Preset ${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: "0 0 24px 0" }}>Personal Details</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "0.9rem", fontWeight: 700, color: textDark }}>Full Name</label>
                  <input type="text" value={settingsName} onChange={e => setSettingsName(e.target.value)} style={{ padding: "14px 16px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.1)", background: bgApp, fontSize: "1rem", outline: "none", fontFamily: fontFam, color: textDark }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "0.9rem", fontWeight: 700, color: textDark }}>Email Address</label>
                  <input type="email" value={settingsEmail} onChange={e => setSettingsEmail(e.target.value)} style={{ padding: "14px 16px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.1)", background: bgApp, fontSize: "1rem", outline: "none", fontFamily: fontFam, color: textDark }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "0.9rem", fontWeight: 700, color: textDark }}>Phone Number</label>
                  <input type="tel" value={settingsPhone} onChange={e => setSettingsPhone(e.target.value)} placeholder="+1 234 567 8900" style={{ padding: "14px 16px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.1)", background: bgApp, fontSize: "1rem", outline: "none", fontFamily: fontFam, color: textDark }} />
                </div>
              </div>
              
              {settingsMessage && (
                <div style={{ marginBottom: "24px", padding: "12px 16px", borderRadius: "12px", background: settingsMessage.toLowerCase().includes("error") ? "#fecaca" : "#d1fae5", color: settingsMessage.toLowerCase().includes("error") ? "#ef4444" : "#059669", fontSize: "0.9rem", fontWeight: 600 }}>
                  {settingsMessage}
                </div>
              )}

              <button onClick={handleSaveSettings} disabled={isSavingSettings} style={{ background: charcoal, color: "#fff", border: "none", padding: "16px 32px", borderRadius: "100px", fontSize: "1rem", fontWeight: 700, cursor: isSavingSettings ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 8px 24px rgba(36,37,40,0.2)", width: "fit-content" }}>
                {isSavingSettings ? "Saving..." : "Save Changes"}
              </button>
            </motion.div>
          )}

        </motion.div>
      </main>
      
    </div>
  );
}
