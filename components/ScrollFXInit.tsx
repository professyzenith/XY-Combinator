"use client";

import { useEffect } from "react";

/**
 * Mounts all vanilla JS scroll effects (reveal, ripple, magnetic, tilt, parallax).
 * The actual logic is in utils/scroll-fx.js — pure JavaScript.
 */
export default function ScrollFXInit() {
  useEffect(() => {
    /* Dynamic import so the vanilla JS only runs client-side */
    import("@/utils/scroll-fx.js").then(({ initAllScrollFX }) => {
      const cleanup = initAllScrollFX();
      return () => { if (cleanup) cleanup(); };
    });
  }, []);

  return null; /* renders nothing — just side effects */
}
