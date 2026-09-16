# Performance notes — advisory

Reported, never blocking. Run Lighthouse or PageSpeed on the preview URL at mobile and desktop and record the numbers. The client will look at PageSpeed whether we do or not.

| Metric | Mobile | Desktop | Note |
|---|---|---|---|
| LCP | | | |
| CLS | | | |
| INP | | | |
| Lighthouse performance | | | |
| Total JS transferred | | | |
| Largest image transferred | | | |
| Fonts: count and total bytes | | | |

Usual suspects, in order: an unsized hero image · a font without `font-display: swap` · GSAP loaded twice · a full-resolution image with an SVG filter · Lenis on a page that did not need it · a video hero on mobile.
