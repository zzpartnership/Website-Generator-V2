import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, resolve } from '../reduced-motion.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * Pin a section while the visitor scrolls a set distance, reporting progress 0→1.
 * The section decides what progress means (a timeline, a counter, a layer stack).
 * @param {string|Element} target
 * @param {object} [opts]
 * @param {string} [opts.end='+=150%']  scroll distance to stay pinned
 * @param {string} [opts.start='top top']
 * @param {boolean|number} [opts.scrub=true]
 * @param {(progress:number, self:ScrollTrigger)=>void} [opts.onProgress]
 * @param {gsap.core.Timeline} [opts.timeline]  optional timeline scrubbed across the pin
 * @param {boolean} [opts.pinSpacing=true]
 * @param {boolean} [opts.anticipatePin=true]
 * @returns {{ kill(): void, trigger: ScrollTrigger|null }}
 */
export function stickyPin(target, opts = {}) {
  const { end = '+=150%', start = 'top top', scrub = true, onProgress, timeline, pinSpacing = true, anticipatePin = true } = opts;
  const [el] = resolve(target);
  if (!el) return { kill() {}, trigger: null };

  if (prefersReducedMotion()) {
    // No pin. The section stacks in flow at its final state.
    onProgress?.(1, null);
    timeline?.progress(1);
    return { kill() {}, trigger: null };
  }

  const trigger = ScrollTrigger.create({
    trigger: el,
    start,
    end,
    pin: true,
    pinSpacing,
    anticipatePin: anticipatePin ? 1 : 0,
    scrub,
    animation: timeline,
    onUpdate: onProgress ? (self) => onProgress(self.progress, self) : undefined,
  });

  return {
    trigger,
    kill() {
      trigger.kill();
    },
  };
}
