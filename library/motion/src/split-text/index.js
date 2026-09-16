import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { prefersReducedMotion, resolve } from '../reduced-motion.js';

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Split a heading into lines, words or chars and reveal each unit through a mask.
 * @param {string|Element|Element[]} target
 * @param {object} [opts]
 * @param {'lines'|'words'|'chars'} [opts.type='lines']
 * @param {object} [opts.from]  gsap.from vars per unit. Default slides up from below the mask.
 * @param {number} [opts.duration=0.9]
 * @param {number} [opts.stagger=0.06]
 * @param {string} [opts.ease='power4.out']
 * @param {string} [opts.start='top 85%']
 * @param {boolean} [opts.once=true]
 * @param {boolean} [opts.immediate=false]
 * @returns {{ kill(): void }}
 */
export function splitText(target, opts = {}) {
  const { type = 'lines', from = { yPercent: 110 }, duration = 0.9, stagger = 0.06, ease = 'power4.out', start = 'top 85%', once = true, immediate = false } = opts;
  const els = resolve(target);
  if (!els.length) return { kill() {} };

  if (prefersReducedMotion()) {
    // Type stays as authored. No split, no mask, nothing to wait for.
    return { kill() {} };
  }

  const splits = els.map((el) =>
    SplitText.create(el, {
      type,
      mask: type,        // each unit wrapped in an overflow:hidden mask (3.13+)
      autoSplit: true,   // re-split on resize / font load; onSplit re-runs the tween
      linesClass: 'zz-line',
      wordsClass: 'zz-word',
      charsClass: 'zz-char',
      onSplit(self) {
        const units = self[type];
        const vars = { ...from, duration, stagger, ease };
        return immediate
          ? gsap.from(units, vars)
          : gsap.from(units, { ...vars, scrollTrigger: { trigger: el, start, once, toggleActions: once ? 'play none none none' : 'play none none reverse' } });
      },
    })
  );

  return {
    kill() {
      splits.forEach((s) => s.revert());
    },
  };
}
