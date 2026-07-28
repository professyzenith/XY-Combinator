/**
 * gsap-animations.js — Pure JS GSAP animation presets
 * Written in plain JavaScript (not TypeScript) for maximum
 * expressiveness and flexibility with GSAP's API.
 *
 * Usage: import { revealHeadline, staggerCards, counterUp } from "@/utils/gsap-animations"
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

/* ─── Shared eases ─── */
export const EASE_OUT_EXPO = "power4.out";
export const EASE_ELASTIC  = "elastic.out(0.8, 0.4)";
export const EASE_SMOOTH   = "power2.inOut";

/* ─────────────────────────────────────────────────────────────────────────
   revealWords
   Splits headline text into words, animates each in sequence.
   ───────────────────────────────────────────────────────────────────────── */
export function revealWords(element, options = {}) {
  if (!element) return;
  const {
    delay    = 0,
    duration = 0.7,
    stagger  = 0.08,
    y        = 36,
    trigger  = element,
  } = options;

  const text  = element.innerText;
  const words = text.split(" ");

  element.innerHTML = words
    .map(w => `<span class="word-wrap" style="display:inline-block;overflow:hidden;vertical-align:bottom">
                 <span class="word" style="display:inline-block">${w}&nbsp;</span>
               </span>`)
    .join("");

  const wordEls = element.querySelectorAll(".word");

  gsap.fromTo(wordEls,
    { y, opacity: 0 },
    {
      y: 0, opacity: 1,
      duration, stagger,
      ease: EASE_OUT_EXPO,
      delay,
      scrollTrigger: {
        trigger,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   staggerCards
   Animate a list of cards in from below, staggered.
   ───────────────────────────────────────────────────────────────────────── */
export function staggerCards(elements, options = {}) {
  if (!elements || !elements.length) return;
  const { stagger = 0.1, y = 40, duration = 0.75 } = options;

  gsap.fromTo(elements,
    { opacity: 0, y, scale: 0.96 },
    {
      opacity: 1, y: 0, scale: 1,
      duration, stagger,
      ease: EASE_OUT_EXPO,
      scrollTrigger: {
        trigger: elements[0],
        start: "top 88%",
        toggleActions: "play none none none",
      },
    }
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   counterUp
   Animates a number from 0 to target.
   ───────────────────────────────────────────────────────────────────────── */
export function counterUp(element, target, options = {}) {
  if (!element) return;
  const { duration = 1.8, prefix = "", suffix = "", delay = 0 } = options;

  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration,
    delay,
    ease: EASE_SMOOTH,
    roundProps: "val",
    onUpdate() {
      element.textContent = prefix + obj.val.toLocaleString() + suffix;
    },
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   revealFromLeft
   Slide element in from the left.
   ───────────────────────────────────────────────────────────────────────── */
export function revealFromLeft(element, options = {}) {
  if (!element) return;
  const { delay = 0, duration = 0.9 } = options;

  gsap.fromTo(element,
    { opacity: 0, x: -50 },
    {
      opacity: 1, x: 0,
      duration, delay,
      ease: EASE_OUT_EXPO,
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   revealFromRight
   ───────────────────────────────────────────────────────────────────────── */
export function revealFromRight(element, options = {}) {
  if (!element) return;
  const { delay = 0.15, duration = 0.9 } = options;

  gsap.fromTo(element,
    { opacity: 0, x: 50 },
    {
      opacity: 1, x: 0,
      duration, delay,
      ease: EASE_OUT_EXPO,
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   magneticHover
   Makes an element follow mouse with a "magnetic" pull effect.
   ───────────────────────────────────────────────────────────────────────── */
export function magneticHover(element, strength = 0.35) {
  if (!element) return;

  const onMove = (e) => {
    const rect  = element.getBoundingClientRect();
    const cx    = rect.left + rect.width  / 2;
    const cy    = rect.top  + rect.height / 2;
    const dx    = (e.clientX - cx) * strength;
    const dy    = (e.clientY - cy) * strength;
    gsap.to(element, { x: dx, y: dy, duration: 0.4, ease: "power2.out" });
  };

  const onLeave = () => {
    gsap.to(element, { x: 0, y: 0, duration: 0.6, ease: EASE_ELASTIC });
  };

  element.addEventListener("mousemove", onMove);
  element.addEventListener("mouseleave", onLeave);

  return () => {
    element.removeEventListener("mousemove", onMove);
    element.removeEventListener("mouseleave", onLeave);
  };
}

/* ─────────────────────────────────────────────────────────────────────────
   parallaxScroll
   Applies a gentle parallax Y offset on scroll.
   ───────────────────────────────────────────────────────────────────────── */
export function parallaxScroll(element, speed = 0.2) {
  if (!element) return;

  gsap.to(element, {
    yPercent: speed * -60,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
    },
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   fadeInScale
   Simple fade in + scale for a single element.
   ───────────────────────────────────────────────────────────────────────── */
export function fadeInScale(element, options = {}) {
  if (!element) return;
  const { delay = 0, duration = 0.8, scale = 0.92 } = options;

  gsap.fromTo(element,
    { opacity: 0, scale },
    {
      opacity: 1, scale: 1,
      duration, delay,
      ease: EASE_OUT_EXPO,
      scrollTrigger: {
        trigger: element,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    }
  );
}
