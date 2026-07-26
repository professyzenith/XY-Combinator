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

      {/* Main site — fades in after intro */}
      <div
        style={{
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
