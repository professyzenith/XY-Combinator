"use client";

import { useEffect, useRef } from "react";

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (overlayRef.current) {
        overlayRef.current.classList.add("intro-exit");
        setTimeout(onComplete, 500);
      }
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div id="intro-overlay" ref={overlayRef}>
      {/* Ambient glow behind logo */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)",
          animation: "fadeIn 1s ease 0.3s forwards",
          opacity: 0,
        }}
      />

      {/* Logo mark */}
      <div style={{ position: "relative", textAlign: "center", zIndex: 1 }}>
        <div className="intro-logo">XY</div>
        <div className="intro-sub">Combinator</div>
      </div>

      {/* Progress bar */}
      <div className="intro-progress" style={{ position: "relative", zIndex: 1 }}>
        <div className="intro-progress-fill" />
      </div>
    </div>
  );
}
