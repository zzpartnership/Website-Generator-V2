import { prefersReducedMotion, resolve } from '../reduced-motion.js';

/** SVG turbulence as a data URI. Regenerated per call so two overlays never share a seed. */
function grainImage(seed, frequency) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220"><filter id="g"><feTurbulence type="fractalNoise" baseFrequency="${frequency}" numOctaves="3" seed="${seed}" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.4 1.1"/></filter><rect width="100%" height="100%" filter="url(#g)"/></svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}

/**
 * Film grain over the page or over one element.
 * @param {string|Element} [target=document.body]  body → fixed full-page overlay; anything else → scoped overlay (target gets position:relative if static)
 * @param {object} [opts]
 * @param {number} [opts.opacity=0.12]
 * @param {number} [opts.size=220]        tile size in px; bigger = coarser
 * @param {number} [opts.frequency=0.8]   feTurbulence baseFrequency; lower = larger grain
 * @param {'multiply'|'overlay'|'soft-light'|'screen'|'normal'} [opts.blend='multiply']
 * @param {boolean} [opts.animate=true]   flicker at 10fps via CSS steps
 * @param {number} [opts.z=9999]
 * @returns {{ kill(): void, el: HTMLElement }}
 */
export function grainOverlay(target = document.body, opts = {}) {
  const { opacity = 0.12, size = 220, frequency = 0.8, blend = 'multiply', animate = true, z = 9999 } = opts;
  const [host] = resolve(target);
  if (!host) return { kill() {}, el: null };

  const el = document.createElement('div');
  el.className = 'zz-grain';
  el.setAttribute('aria-hidden', 'true');
  el.style.setProperty('--zz-grain-image', grainImage(Math.floor(Math.random() * 1000), frequency));
  el.style.setProperty('--zz-grain-opacity', String(opacity));
  el.style.setProperty('--zz-grain-size', `${size}px`);
  el.style.setProperty('--zz-grain-blend', blend);
  el.style.setProperty('--zz-grain-z', String(z));

  if (host !== document.body) {
    el.dataset.scoped = '';
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
  }
  // Reduced motion: the grain stays (it is texture, not motion); only the flicker goes.
  if (animate && !prefersReducedMotion()) el.dataset.animate = '';

  host.appendChild(el);
  return {
    el,
    kill() {
      el.remove();
    },
  };
}
