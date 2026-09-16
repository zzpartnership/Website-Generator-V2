import { resolve } from '../reduced-motion.js';

let svgHost = null;
let counter = 0;

/** Parse any CSS colour (oklch included) to [r,g,b] in 0..1 via a canvas. */
function toRGB(color) {
  const c = document.createElement('canvas');
  c.width = c.height = 1;
  const ctx = c.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255];
}

function ensureHost() {
  if (svgHost) return svgHost;
  svgHost = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgHost.setAttribute('aria-hidden', 'true');
  svgHost.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  document.body.appendChild(svgHost);
  return svgHost;
}

/** Exact duotone as an SVG filter: luminance mapped from shadow colour to highlight colour. */
function duotoneFilter(shadow, highlight, contrast) {
  const s = toRGB(shadow), h = toRGB(highlight);
  const id = `zz-duo-${++counter}`;
  const ns = 'http://www.w3.org/2000/svg';
  const f = document.createElementNS(ns, 'filter');
  f.setAttribute('id', id);
  f.setAttribute('color-interpolation-filters', 'sRGB');
  const lum = document.createElementNS(ns, 'feColorMatrix');
  lum.setAttribute('type', 'matrix');
  const c = contrast;
  const o = 0.5 - 0.5 * c;
  lum.setAttribute('values', `${0.2126 * c} ${0.7152 * c} ${0.0722 * c} 0 ${o}  ${0.2126 * c} ${0.7152 * c} ${0.0722 * c} 0 ${o}  ${0.2126 * c} ${0.7152 * c} ${0.0722 * c} 0 ${o}  0 0 0 1 0`);
  const map = document.createElementNS(ns, 'feComponentTransfer');
  for (const [ch, i] of [['R', 0], ['G', 1], ['B', 2]]) {
    const fn = document.createElementNS(ns, `feFunc${ch}`);
    fn.setAttribute('type', 'table');
    fn.setAttribute('tableValues', `${s[i]} ${h[i]}`);
    map.appendChild(fn);
  }
  f.appendChild(lum);
  f.appendChild(map);
  ensureHost().appendChild(f);
  return { id, el: f };
}

/**
 * Apply a treatment to images. CSS classes for halftone/grade/crush/grain; an exact SVG filter for duotone.
 * @param {string|Element|Element[]} target  wrapper elements containing an <img> (or the <img> itself for duotone)
 * @param {object} opts
 * @param {'duotone'|'halftone'|'grade'|'crush'|'grain'|'mask'} opts.treatment
 * @param {string} [opts.shadow]     duotone: any CSS colour, oklch fine
 * @param {string} [opts.highlight]  duotone
 * @param {number} [opts.contrast=1.1] duotone
 * @param {Record<string,string>} [opts.vars]  custom properties for the CSS treatments, e.g. { '--t-dot-pitch': '6px' }
 * @returns {{ kill(): void }}
 */
export function imageTreatment(target, opts) {
  const { treatment, shadow = 'oklch(22% 0.06 270)', highlight = 'oklch(88% 0.10 85)', contrast = 1.1, vars = {} } = opts ?? {};
  const els = resolve(target);
  if (!els.length || !treatment) return { kill() {} };

  if (treatment === 'duotone') {
    const { id, el } = duotoneFilter(shadow, highlight, contrast);
    const imgs = els.flatMap((e) => (e.tagName === 'IMG' ? [e] : Array.from(e.querySelectorAll('img'))));
    imgs.forEach((img) => (img.style.filter = `url(#${id})`));
    return {
      kill() {
        imgs.forEach((img) => (img.style.filter = ''));
        el.remove();
      },
    };
  }

  const cls = `t-${treatment}`;
  els.forEach((e) => {
    e.classList.add(cls);
    for (const [k, v] of Object.entries(vars)) e.style.setProperty(k, v);
  });
  return {
    kill() {
      els.forEach((e) => {
        e.classList.remove(cls);
        for (const k of Object.keys(vars)) e.style.removeProperty(k);
      });
    },
  };
}
