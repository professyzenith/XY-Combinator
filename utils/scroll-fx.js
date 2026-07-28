/**
 * scroll-fx.js — Vanilla JS scroll-driven effects
 * Zero dependencies. Uses IntersectionObserver (works on all devices).
 * Adds .is-visible to .reveal elements when they scroll into view.
 * Also handles staggered children, parallax divs, and ripple buttons.
 */

/* ─────────────────────────────────────────────────────────────────────────
   SCROLL REVEAL — IntersectionObserver (GPU-friendly, no scroll listener)
   ───────────────────────────────────────────────────────────────────────── */
export function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          /* Stagger children if present */
          const children = entry.target.querySelectorAll("[data-stagger]");
          children.forEach((child, i) => {
            child.style.animationDelay = `${i * 0.08}s`;
            child.classList.add("anim-fade-up");
          });

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}

/* ─────────────────────────────────────────────────────────────────────────
   RIPPLE EFFECT — Click burst on .ripple-host elements
   ───────────────────────────────────────────────────────────────────────── */
export function initRipple() {
  document.addEventListener("click", (e) => {
    const host = e.target.closest(".ripple-host");
    if (!host) return;

    const rect = host.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = (e.clientX - rect.left - 20) + "px";
    ripple.style.top  = (e.clientY - rect.top  - 20) + "px";
    host.appendChild(ripple);

    ripple.addEventListener("animationend", () => ripple.remove());
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   MAGNETIC BUTTONS — Vanilla JS, no GSAP needed
   Desktop only (detected via pointer:fine media query)
   ───────────────────────────────────────────────────────────────────────── */
export function initMagnetic() {
  /* Skip on touch devices */
  if (!window.matchMedia("(pointer: fine)").matches) return;

  const elements = document.querySelectorAll(".magnetic");
  const STRENGTH = 0.3;

  elements.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * STRENGTH;
      const dy = (e.clientY - cy) * STRENGTH;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "translate(0, 0)";
    });
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   TILT CARDS — Vanilla JS 3D tilt (desktop only)
   Much lighter than CSS :hover — responds to actual cursor position
   ───────────────────────────────────────────────────────────────────────── */
export function initTilt() {
  if (!window.matchMedia("(pointer: fine)").matches) return;

  const cards = document.querySelectorAll("[data-tilt]");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (y - 0.5) * -8;
      const tiltY = (x - 0.5) * 8;
      card.style.transform =
        `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(600px) rotateX(0) rotateY(0) translateY(0)";
      card.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
    });

    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform 0.1s ease";
    });
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   PARALLAX SECTIONS — Lightweight CSS transform-based parallax
   Only on desktop, uses IntersectionObserver + rAF for perf
   ───────────────────────────────────────────────────────────────────────── */
export function initParallax() {
  if (window.innerWidth < 768) return; /* skip mobile */

  const elements = document.querySelectorAll("[data-parallax]");
  if (!elements.length) return;

  let ticking = false;

  function update() {
    const scrollY = window.scrollY;
    elements.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.15;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = (center - window.innerHeight / 2) * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

/* ─────────────────────────────────────────────────────────────────────────
   INIT ALL — Call once from a useEffect
   ───────────────────────────────────────────────────────────────────────── */
export function initAllScrollFX() {
  const cleanupReveal = initScrollReveal();
  initRipple();
  initMagnetic();
  initTilt();
  initParallax();

  return () => {
    if (cleanupReveal) cleanupReveal();
  };
}
