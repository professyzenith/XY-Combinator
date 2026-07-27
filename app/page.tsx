"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import IntroAnimation from "@/components/IntroAnimation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeSection from "@/components/MarqueeSection";
import BentoFeatures from "@/components/BentoFeatures";
import SecuritySection from "@/components/SecuritySection";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

/* ─────────────────────────────────────────────────────────────────────────────
   BACKGROUND: Pure black + architectural dot grid + single spotlight + scanner
   ───────────────────────────────────────────────────────────────────────────── */
function AmbientBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        background: "#000000",
      }}
    >
      {/* ── Layer 1: Architectural dot grid ──────────────────────────────────── */}
      {/* Not a blob — a structure. Every premium tech brand uses this. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      {/* ── Layer 2: Single top-center spotlight ─────────────────────────────── */}
      {/* One source of light — not 5 random floating orbs */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          height: "75vh",
          background:
            "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(34,197,94,0.18) 0%, rgba(34,197,94,0.05) 45%, transparent 70%)",
        }}
      />

      {/* ── Layer 3: Bottom-left counter-light (violet) ──────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "55vw",
          height: "55vh",
          background:
            "radial-gradient(ellipse 80% 80% at 0% 100%, rgba(109,40,217,0.14) 0%, rgba(109,40,217,0.03) 45%, transparent 65%)",
        }}
      />

      {/* ── Layer 4: Right-edge blue accent ──────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: 0,
          width: "30vw",
          height: "50vh",
          background:
            "radial-gradient(ellipse 80% 80% at 100% 50%, rgba(59,130,246,0.08) 0%, transparent 60%)",
        }}
      />

      {/* ── Layer 5: Animated scanner line ───────────────────────────────────── */}
      {/* Moves top→bottom every 9s, pauses 5s between — feels alive, not random */}
      <motion.div
        animate={{ top: ["-1%", "101%"] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          repeatDelay: 5,
          ease: [0.4, 0, 0.6, 1],
        }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(34,197,94,0.0) 5%, rgba(34,197,94,0.35) 30%, rgba(34,197,94,0.65) 50%, rgba(34,197,94,0.35) 70%, rgba(34,197,94,0.0) 95%, transparent 100%)",
          boxShadow: "0 0 12px rgba(34,197,94,0.4), 0 0 30px rgba(34,197,94,0.1)",
        }}
      />

      {/* ── Layer 6: Horizontal grid lines ───────────────────────────────────── */}
      {/* Subtle — only visible near spotlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "100% 80px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent 70%)",
        }}
      />

      {/* ── Layer 7: Film grain ───────────────────────────────────────────────── */}
      {/* Breaks the "AI-smooth" look. Real premium sites all use grain. */}
      <div
        style={{
          position: "absolute",
          inset: "-50%",
          width: "200%",
          height: "200%",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          opacity: 0.055,
          mixBlendMode: "overlay",
          animation: "grain 0.8s steps(2) infinite",
        }}
      />

      {/* ── Layer 8: Edge vignette ────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────────────────────── */
export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <>
      <CustomCursor />
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}

      {/* Background renders always — even during intro */}
      <AmbientBackground />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          opacity: introComplete ? 1 : 0,
          transform: introComplete ? "scale(1)" : "scale(1.015)",
          transition: "opacity 0.8s ease, transform 1s ease",
          pointerEvents: introComplete ? "auto" : "none",
        }}
      >
        <SmoothScroll>
          <Navbar />
          <main>
            <Hero visible={introComplete} />
            <MarqueeSection />
            <BentoFeatures />
            <SecuritySection />
          </main>
          <Footer />
        </SmoothScroll>
      </div>
    </>
  );
}
