# grainOverlay

## What it does
Lays film grain over the whole page or over one element. SVG turbulence generated per call (fresh seed), blended with the page. Optional low-frame-rate flicker done in CSS `steps()`, so it costs nothing on the main thread.

Import the stylesheet once: `import '@zz/motion/grain.css';`

## Props
| Prop | Default | Notes |
|---|---|---|
| `target` | `document.body` | body → fixed full-page; element → scoped |
| `opacity` | `0.12` | 0.06 is subtle, 0.2 is a look |
| `size` | `220` | tile px; larger = coarser |
| `frequency` | `0.8` | lower = bigger grain |
| `blend` | `'multiply'` | `overlay` on dark grounds, `soft-light` for photos |
| `animate` | `true` | flicker |
| `z` | `9999` | |

```js
grainOverlay();                                   // whole page
grainOverlay('.hero-image', { opacity: 0.2, blend: 'soft-light', animate: false });
```

## When to use
Photographic and dark pages that need surface. To unify mixed-quality client photos under one texture. As part of an imagery treatment recipe: grade, then grain.

## When not to use
Over small type on light grounds (it reads as dirty, not textured). On pages that already use halftone; pick one texture. Above 0.2 opacity on a page the client will judge on a phone; the review note "grain too heavy at mobile" is the most common reaction in this category.

## Reduced motion
The grain stays. It is texture, not motion. Only the flicker is removed, in CSS, so the still frame is the composed state.

## Mobile
`mix-blend-mode` on a fixed full-page layer is fine on modern mobile Safari, but combined with a Lenis transform on the body it can flash; scope the grain to sections when using smooth scroll on iOS. Halve `opacity` under 768px if the client's photos are already noisy.
