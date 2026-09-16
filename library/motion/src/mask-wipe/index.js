import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, resolve } from '../reduced-motion.js';

gsap.registerPlugin(ScrollTrigger);

const INSET = {
  left: 'inset(0 100% 0 0)',
  right: 'inset(0 0 0 100%)',
  top: 'inset(0 0 100% 0)',
  bottom: 'inset(100% 0 0 0)',
};

/**
 * Reveal elements by wiping a clip-path open from one edge.
 * @param {string|Element|Element[]} target
 * @param {object} [opts]
 * @param {'left'|'right'|'top'|'bottom'} [opts.from='left']
 * @param {number} [opts.duration=1.1]
 * @param {string} [opts.ease='power3.inOut']
 * @param {string} [opts.start='top 80%']  ScrollTrigger start
 * @param {boolean} [opts.once=true]
 * @param {number} [opts.stagger=0.08]
 * @param {boolean} [opts.immediate=false]  play on call instead of on scroll (hero use)
 * @returns {{ kill(): void }}
 */
export function maskWipe(target, opts = {}) {
  const { from = 'left', duration = 1.1, ease = 'power3.inOut', start = 'top 80%', once = true, stagger = 0.08, immediate = false } = opts;
  const els = resolve(target);
  if (!els.length) return { kill() {} };

  if (prefersReducedMotion()) {
    // Static composition: fully revealed, no clip at all.
    els.forEach((el) => (el.style.clipPath = 'none'));
    return { kill() {} };
  }

  gsap.set(els, { clipPath: INSET[from] ?? INSET.left, willChange: 'clip-path' });
  const vars = { clipPath: 'inset(0 0 0 0)', duration, ease, stagger, clearProps: 'willChange' };
  const tween = immediate
    ? gsap.to(els, vars)
    : gsap.to(els, { ...vars, scrollTrigger: { trigger: els[0], start, once, toggleActions: once ? 'play none none none' : 'play none none reverse' } });

  return {
    kill() {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(els, { clearProps: 'clipPath,willChange' });
    },
  };
}
