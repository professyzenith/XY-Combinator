/**
 * particles.js — Vanilla JS canvas particle field
 * Runs entirely outside React/TypeScript for performance.
 * Used by ParticleCanvas component via ref + useEffect.
 */

export function initParticles(canvas) {
  const ctx = canvas.getContext("2d");
  let W = canvas.width;
  let H = canvas.height;
  let raf;
  let mouse = { x: W / 2, y: H / 2 };

  const COUNT = 55;
  const SAGE  = [74, 144, 112];
  const STEEL = [74, 120, 168];
  const GREY  = [29, 29, 31];

  /* ─── Particle pool ─── */
  const particles = Array.from({ length: COUNT }, (_, i) => ({
    x:    Math.random() * W,
    y:    Math.random() * H,
    r:    0.8 + Math.random() * 1.6,
    vx:   (Math.random() - 0.5) * 0.35,
    vy:   (Math.random() - 0.5) * 0.35,
    life: Math.random() * Math.PI * 2,
    speed: 0.005 + Math.random() * 0.012,
    color: [SAGE, STEEL, GREY][Math.floor(Math.random() * 3)],
    opacity: 0.06 + Math.random() * 0.18,
  }));

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  function draw() {
    ctx.clearRect(0, 0, W, H);

    /* Draw connection lines between nearby particles */
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const p = particles[i], q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          const alpha = (1 - dist / 130) * 0.055;
          ctx.strokeStyle = `rgba(${GREY[0]},${GREY[1]},${GREY[2]},${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    /* Draw particles */
    particles.forEach((p) => {
      p.life += p.speed;

      /* Gentle sine float */
      p.x += p.vx + Math.sin(p.life * 1.3) * 0.15;
      p.y += p.vy + Math.cos(p.life * 0.9) * 0.12;

      /* Soft mouse repulsion */
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90) {
        p.x += (dx / dist) * 0.55;
        p.y += (dy / dist) * 0.55;
      }

      /* Wrap */
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

    raf = requestAnimationFrame(draw);
  }

  draw();

  /* Cleanup */
  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
  };
}
