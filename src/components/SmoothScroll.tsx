"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";
import { setLenis } from "@/lib/scrollLock";

gsap.registerPlugin(ScrollTrigger);

/**
 * Momentum smooth-scrolling via Lenis.
 *
 * Lenis smooths the *native* scroll position (it doesn't transform a content
 * wrapper), so the existing GSAP ScrollTrigger pins/scrubs keep reading the
 * real `window.scrollY` and behave exactly as before — just with eased input.
 * We drive Lenis from GSAP's ticker and forward its scroll events to
 * ScrollTrigger so the two stay in lockstep.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Respect reduced-motion: leave native scrolling untouched.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Expose the instance so menus/modals can lock scrolling via Lenis itself.
    setLenis(lenis);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
