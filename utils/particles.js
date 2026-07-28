/**
 * particles.js — Vanilla JS canvas particle field
 * GPU-accelerated, mobile-optimized, 60fps.
 * Reduces particle count on mobile for zero-lag performance.
 */

export function initParticles(canvas) {
  const ctx = canvas.getContext("2d");
  let W, H, raf;
  let mouse = { x: -999, y: -999 };

  /* ─── Mobile detection ─── */
  const isMobile  = window.innerWidth < 768;
  const isTablet   = window.innerWidth < 1024 && !isMobile;
  const COUNT      = isMobile ? 18 : isTablet ? 32 : 55;
  const LINE_DIST  = isMobile ? 90 : 130;
  const MOUSE_DIST = isMobile ? 0 : 90;  /* disable mouse on mobile */

  const SAGE  = [74, 144, 112];
  const STEEL = [74, 120, 168];
  const GREY  = [29, 29, 31];
  const VIOLET = [122, 94, 168];

  /* ─── Particle pool ─── */
  const particles = Array.from({ length: COUNT }, () => {
    const palette = [SAGE, STEEL, GREY, VIOLET];
    return {
      x:     Math.random() * (W || window.innerWidth),
      y:     Math.random() * (H || window.innerHeight),
      r:     0.6 + Math.random() * (isMobile ? 1.0 : 1.8),
      vx:    (Math.random() - 0.5) * (isMobile ? 0.15 : 0.3),
      vy:    (Math.random() - 0.5) * (isMobile ? 0.15 : 0.3),
      life:  Math.random() * Math.PI * 2,
      speed: 0.004 + Math.random() * 0.01,
      color: palette[Math.floor(Math.random() * palette.length)],
      opacity: 0.04 + Math.random() * 0.16,
    };
  });

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    /* re-scatter particles on resize */
    particles.forEach(p => {
      if (p.x > W) p.x = Math.random() * W;
      if (p.y > H) p.y = Math.random() * H;
    });
  }
  resize();

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  /* Only track mouse on non-mobile */
  if (!isMobile) {
    canvas.style.pointerEvents = "none";
    document.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
  }

  /* ─── Frame limiter for mobile ─── */
  let lastTime = 0;
  const FPS_CAP = isMobile ? 30 : 60;
  const frameDuration = 1000 / FPS_CAP;

  function draw(timestamp) {
    raf = requestAnimationFrame(draw);

    /* Throttle on mobile */
    if (timestamp - lastTime < frameDuration) return;
    lastTime = timestamp;

    ctx.clearRect(0, 0, W, H);

    /* Connection lines (skip on mobile for perf) */
    if (!isMobile) {
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const p = particles[i], q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINE_DIST) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            const alpha = (1 - dist / LINE_DIST) * 0.045;
            ctx.strokeStyle = `rgba(${GREY[0]},${GREY[1]},${GREY[2]},${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    }

    /* Draw particles */
    particles.forEach((p) => {
      p.life += p.speed;

      /* Sine float */
      p.x += p.vx + Math.sin(p.life * 1.3) * 0.12;
      p.y += p.vy + Math.cos(p.life * 0.9) * 0.10;

      /* Mouse repulsion (desktop only) */
      if (MOUSE_DIST > 0) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DIST) {
          p.x += (dx / dist) * 0.45;
          p.y += (dy / dist) * 0.45;
        }
      }

      /* Wrap edges */
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;

      const pulse = 0.5 + 0.5 * Math.sin(p.life * 1.8);
      const alpha = p.opacity * (0.5 + 0.5 * pulse);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * (0.85 + 0.15 * pulse), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${alpha})`;
      ctx.fill();
    });
  }

  raf = requestAnimationFrame(draw);

  /* Cleanup */
  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
  };
}
