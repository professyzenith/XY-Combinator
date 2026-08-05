/*
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║                                                                  ║
 * ║   ██╗  ██╗██╗   ██╗     ██████╗ ██████╗ ███╗   ███╗██████╗      ║
 * ║   ╚██╗██╔╝╚██╗ ██╔╝    ██╔════╝██╔═══██╗████╗ ████║██╔══██╗     ║
 * ║    ╚███╔╝  ╚████╔╝     ██║     ██║   ██║██╔████╔██║██████╔╝     ║
 * ║    ██╔██╗   ╚██╔╝      ██║     ██║   ██║██║╚██╔╝██║██╔══██╗     ║
 * ║   ██╔╝ ██╗   ██║       ╚██████╗╚██████╔╝██║ ╚═╝ ██║██████╔╝     ║
 * ║   ╚═╝  ╚═╝   ╚═╝        ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═════╝      ║
 * ║                                                                  ║
 * ║   🏠 Landing Page — The Front Door of XyncRoom              ║
 * ║   📦 Version: 1.0.0                                              ║
 * ║   👤 Author: Pratik Jha                                           ║
 * ║   📅 Last Updated: July 2026                                     ║
 * ║                                                                  ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeSection from "@/components/MarqueeSection";
import FeaturesSection from "@/components/FeaturesSection";
import SecuritySection from "@/components/SecuritySection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const CustomCursor   = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/ScrollProgressBar"), { ssr: false });
const ParticleCanvas = dynamic(() => import("@/components/ParticleCanvas"), { ssr: false });
const ScrollFXInit   = dynamic(() => import("@/components/ScrollFXInit"), { ssr: false });

/* ─────────────────────────────────────────────────────────────────────────────
   AMBIENT BACKGROUND — Light Mode
   Concept: Warm off-white paper. Soft sage bloom from top. Apple.com energy.
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
        background: "var(--surface-base)", /* #f2f1ef — warm off-white */
      }}
    >
      {/* ── Layer 1: Subtle cool dot grid ── */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        maskImage: "radial-gradient(ellipse 80% 75% at 50% 40%, black 20%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 75% at 50% 40%, black 20%, transparent 100%)",
      }} />

      {/* ── Layer 2: Sage bloom from top — the only color hint ── */}
      <div style={{
        position: "absolute", top: 0, left: "50%",
        transform: "translateX(-50%)",
        width: "140%", height: "60vh",
        background: "radial-gradient(ellipse 60% 90% at 50% -5%, rgba(74,144,112,0.08) 0%, rgba(74,144,112,0.02) 55%, transparent 70%)",
      }} />

      {/* ── Layer 3: Cool silver shimmer — right edge ── */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "40vw", height: "80vh",
        background: "radial-gradient(ellipse at 100% 20%, rgba(200,200,220,0.18) 0%, transparent 60%)",
      }} />

      {/* ── Layer 4: Darker silver depth — bottom-left ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        width: "50vw", height: "50vh",
        background: "radial-gradient(ellipse at 0% 100%, rgba(0,0,0,0.06) 0%, transparent 60%)",
      }} />

      {/* ── Layer 5: Horizontal guide lines ── */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)",
        backgroundSize: "100% 88px",
        maskImage: "radial-gradient(ellipse 55% 50% at 50% 0%, black, transparent 65%)",
        WebkitMaskImage: "radial-gradient(ellipse 55% 50% at 50% 0%, black, transparent 65%)",
      }} />

      {/* ── Layer 6: Film grain ── */}
      <div style={{
        position: "absolute", inset: "-50%",
        width: "200%", height: "200%",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "220px 220px",
        opacity: 0.028,
        mixBlendMode: "multiply",
        animation: "grain 1.1s steps(2) infinite",
      }} />

      {/* ── Layer 7: Live particle constellation ── */}
      <ParticleCanvas />
    </div>
  );
}


/* ─────────────────────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      <CustomCursor />
      <ScrollProgress />
      <AmbientBackground />

      <div
        id="main-content"
        role="main"
        style={{
          position: "relative", zIndex: 1,
          opacity: 1,
          transition: "opacity 0.9s ease",
        }}
      >
        <SmoothScroll>
          <ScrollFXInit />
          <Navbar />
          <main>
            <Hero visible={true} />
            <MarqueeSection />
            <FeaturesSection />
            <PricingSection />
            <SecuritySection />
          </main>
          <Footer />
        </SmoothScroll>
      </div>
    </>
  );
}
