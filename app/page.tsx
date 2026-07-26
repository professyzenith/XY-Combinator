"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import IntroAnimation from "@/components/IntroAnimation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeSection from "@/components/MarqueeSection";
import BentoFeatures from "@/components/BentoFeatures";
import SecuritySection from "@/components/SecuritySection";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

/* ─── Premium animated background ─── */
function AmbientBackground() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>

      {/* Primary: vivid green — top right */}
      <div style={{
        position: "absolute", top: "-20%", right: "-10%",
        width: "72vw", height: "72vw", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,197,94,0.13) 0%, rgba(34,197,94,0.04) 40%, transparent 65%)",
        animation: "orb1 22s ease-in-out infinite",
        willChange: "transform",
      }} />

      {/* Secondary: deep violet — bottom left */}
      <div style={{
        position: "absolute", bottom: "-15%", left: "-15%",
        width: "70vw", height: "70vw", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.11) 0%, rgba(124,58,237,0.03) 40%, transparent 65%)",
        animation: "orb2 28s ease-in-out infinite",
        willChange: "transform",
      }} />

      {/* Tertiary: electric blue — center */}
      <div style={{
        position: "absolute", top: "35%", left: "25%",
        width: "55vw", height: "55vw", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 55%)",
        animation: "orb3 35s ease-in-out infinite",
        willChange: "transform",
      }} />

      {/* Quaternary: teal — top left */}
      <div style={{
        position: "absolute", top: "5%", left: "-8%",
        width: "35vw", height: "35vw", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(20,184,166,0.07) 0%, transparent 60%)",
        animation: "orb1 18s ease-in-out infinite reverse",
        willChange: "transform",
      }} />

      {/* Pink accent — mid right */}
      <div style={{
        position: "absolute", top: "50%", right: "-5%",
        width: "28vw", height: "28vw", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 60%)",
        animation: "orb2 24s ease-in-out infinite reverse",
        willChange: "transform",
      }} />

      {/* Noise texture overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
        backgroundSize: "200px 200px",
        opacity: 0.4,
        mixBlendMode: "overlay",
      }} />

      {/* Radial vignette — edges darker */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 110% 80% at 50% 50%, transparent 35%, rgba(6,8,16,0.5) 100%)",
      }} />
    </div>
  );
}

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <>
      <CustomCursor />
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}
      <AmbientBackground />

      <div style={{
        position: "relative", zIndex: 1,
        opacity: introComplete ? 1 : 0,
        transform: introComplete ? "scale(1)" : "scale(1.02)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        pointerEvents: introComplete ? "auto" : "none",
      }}>
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
