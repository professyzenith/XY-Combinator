"use client";

import { useEffect, useRef } from "react";

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (overlayRef.current) {
        overlayRef.current.classList.add("intro-exit");
        setTimeout(() => {
          onComplete();
        }, 600);
      }
    }, 2600);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div id="intro-overlay" ref={overlayRef}>
      {/* Radial background pulse */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 40% 40% at 50% 50%, rgba(34,197,94,0.08) 0%, transparent 70%)",
          animation: "fadeIn 1s ease forwards",
        }}
      />

      {/* Logo */}
      <div className="intro-logo">XY</div>

      {/* Progress bar */}
      <div className="intro-bar" />

      {/* Tagline */}
      <p className="intro-tagline">Combinator</p>

      {/* Corner dots */}
      {[
        { top: "10%", left: "10%" },
        { top: "10%", right: "10%" },
        { bottom: "10%", left: "10%" },
        { bottom: "10%", right: "10%" },
      ].map((style, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#22c55e",
            opacity: 0,
            animation: `fadeIn 0.4s ease ${0.5 + i * 0.1}s forwards`,
            ...style,
          }}
        />
      ))}
    </div>
  );
}
