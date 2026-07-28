"use client";

import { useEffect, useRef } from "react";
import { initThreeScene } from "@/utils/three-scene";

export default function ThreeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Initialize the Three.js scene on the canvas
    const cleanup = initThreeScene(canvasRef.current);
    
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none", // Let clicks pass through to the UI
        zIndex: 0, // Behind the UI
      }}
      aria-hidden="true"
    />
  );
}
