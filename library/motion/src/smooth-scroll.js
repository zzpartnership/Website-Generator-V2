import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { prefersReducedMotion } from './reduced-motion.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis smooth scroll wired to ScrollTrigger. Call once per page.
 * Reduced motion: native scroll, nothing instantiated.
 * @param {import('lenis').LenisOptions} [options]
 */
export function smoothScroll(options = {}) {
  if (prefersReducedMotion()) return { lenis: null, kill() {} };
  const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, ...options });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return {
    lenis,
    kill() {
      gsap.ticker.remove(tick);
      lenis.destroy();
    },
  };
}
