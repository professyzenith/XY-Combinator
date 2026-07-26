"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import IntroAnimation from "@/components/IntroAnimation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

/* ─── Premium ambient background ─── */
function AmbientBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Primary glow — top right green */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-5%",
          width: "70vw",
          height: "70vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.09) 0%, rgba(34,197,94,0.02) 40%, transparent 65%)",
          animation: "orb1 22s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Secondary glow — bottom left indigo */}
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-15%",
          width: "65vw",
          height: "65vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79,70,229,0.07) 0%, rgba(79,70,229,0.01) 40%, transparent 65%)",
          animation: "orb2 28s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Tertiary — center drift */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "30%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 55%)",
          animation: "orb3 35s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Top-left warm accent */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "-5%",
          width: "30vw",
          height: "30vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 60%)",
          animation: "orb1 18s ease-in-out infinite reverse",
          willChange: "transform",
        }}
      />

      {/* Horizontal vignette for depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 120% 80% at 50% 50%, transparent 30%, rgba(6,8,16,0.4) 100%)",
        }}
      />
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

      <div
        style={{
          position: "relative",
          zIndex: 1,
          opacity: introComplete ? 1 : 0,
          transform: introComplete ? "scale(1)" : "scale(1.02)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
          pointerEvents: introComplete ? "auto" : "none",
        }}
      >
        <SmoothScroll>
          <Navbar />
          <main>
            <Hero visible={introComplete} />
            <Features />
          </main>
          <Footer />
        </SmoothScroll>
      </div>
    </>
  );
}
