"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import IntroAnimation from "@/components/IntroAnimation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeSection from "@/components/MarqueeSection";
import ProductDemoScene from "@/components/ProductDemoScene";
import SecuritySection from "@/components/SecuritySection";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const CustomCursor   = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/ScrollProgressBar"), { ssr: false });

/* ─────────────────────────────────────────────────────────────────────────────
   AMBIENT BACKGROUND
   Pure black + architectural dot grid + single focused spotlight + scanner
   ───────────────────────────────────────────────────────────────────────────── */
function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        background: "var(--surface-base)",
      }}
    >
      {/* Layer 1: Architectural dot grid */}
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      {/* Layer 2: Top-center spotlight — single source */}
      <div
        style={{
          position: "absolute", top: 0, left: "50%",
          transform: "translateX(-50%)",
          width: "100%", height: "70vh",
          background: "radial-gradient(ellipse 75% 100% at 50% 0%, rgba(34,197,94,0.15) 0%, rgba(34,197,94,0.04) 45%, transparent 70%)",
        }}
      />

      {/* Layer 3: Bottom-left violet counter-light */}
      <div
        style={{
          position: "absolute", bottom: 0, left: 0,
          width: "55vw", height: "55vh",
          background: "radial-gradient(ellipse 80% 80% at 0% 100%, rgba(109,40,217,0.12) 0%, rgba(109,40,217,0.02) 45%, transparent 65%)",
        }}
      />

      {/* Layer 4: Right-edge blue accent */}
      <div
        style={{
          position: "absolute", top: "25%", right: 0,
          width: "28vw", height: "55vh",
          background: "radial-gradient(ellipse 80% 80% at 100% 50%, rgba(59,130,246,0.07) 0%, transparent 60%)",
        }}
      />

      {/* Layer 5: Animated scanner line — accent green */}
      <motion.div
        animate={{ top: ["-1%", "101%"] }}
        transition={{ duration: 9, repeat: Infinity, repeatDelay: 6, ease: [0.4, 0, 0.6, 1] }}
        style={{
          position: "absolute", left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent 0%, rgba(34,197,94,0.0) 5%, rgba(34,197,94,0.3) 30%, rgba(34,197,94,0.6) 50%, rgba(34,197,94,0.3) 70%, rgba(34,197,94,0.0) 95%, transparent 100%)",
          boxShadow: "0 0 10px rgba(34,197,94,0.35), 0 0 28px rgba(34,197,94,0.08)",
        }}
      />

      {/* Layer 6: Horizontal lines masked to spotlight */}
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "100% 80px",
          maskImage: "radial-gradient(ellipse 65% 55% at 50% 0%, black, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 55% at 50% 0%, black, transparent 70%)",
        }}
      />

      {/* Layer 7: Film grain — breaks AI-smooth look */}
      <div
        style={{
          position: "absolute", inset: "-50%",
          width: "200%", height: "200%",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          opacity: 0.05,
          mixBlendMode: "overlay",
          animation: "grain 0.8s steps(2) infinite",
        }}
      />

      {/* Layer 8: Edge vignette */}
      <div
        style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 38%, rgba(0,0,0,0.55) 100%)",
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
      {/* Skip to content — accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      <CustomCursor />
      <ScrollProgress />

      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}
      <AmbientBackground />

      <div
        id="main-content"
        role="main"
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
            {/* Chapter 1: The promise */}
            <Hero visible={introComplete} />

            {/* Capability scroll */}
            <MarqueeSection />

            {/* Chapter 2: The product — scroll narrative, replaces bento cards */}
            <ProductDemoScene />

            {/* Chapter 3: The trust */}
            <SecuritySection />
          </main>
          <Footer />
        </SmoothScroll>
      </div>
    </>
  );
}
