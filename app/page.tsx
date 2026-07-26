"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import IntroAnimation from "@/components/IntroAnimation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

// Custom cursor only on desktop — no SSR
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

/* ─── Animated ambient orbs — break the pure-black void ─── */
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
      {/* Orb 1 — top right, green tint */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          right: "-10%",
          width: "55vw",
          height: "55vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,197,94,0.055) 0%, transparent 65%)",
          animation: "orb1 20s ease-in-out infinite",
          willChange: "transform",
          filter: "blur(1px)",
        }}
      />

      {/* Orb 2 — bottom left, indigo tint */}
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "-15%",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 65%)",
          animation: "orb2 26s ease-in-out infinite",
          willChange: "transform",
          filter: "blur(1px)",
        }}
      />

      {/* Orb 3 — center, very subtle warm */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "35%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,197,94,0.025) 0%, transparent 60%)",
          animation: "orb3 32s ease-in-out infinite",
          willChange: "transform",
          filter: "blur(1px)",
        }}
      />

      {/* Horizontal gradient sweep */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(34,197,94,0.015) 0%, transparent 30%, transparent 70%, rgba(99,102,241,0.01) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <CustomCursor />

      {/* Cinematic intro */}
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}

      {/* Ambient animated background — always visible */}
      <AmbientBackground />

      {/* Main site — fades in after intro */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          opacity: introComplete ? 1 : 0,
          transform: introComplete ? "scale(1)" : "scale(1.01)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
          pointerEvents: introComplete ? "auto" : "none",
        }}
      >
        <SmoothScroll>
          <Navbar />
          <main>
            <Hero visible={introComplete} />
            <Features />
            <HowItWorks />
            <Testimonials />
          </main>
          <Footer />
        </SmoothScroll>
      </div>
    </>
  );
}
