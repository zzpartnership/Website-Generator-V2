# imageTreatment

## What it does
Puts a treatment on an image so it stops looking like stock. Duotone is an exact SVG filter built from two colours (OKLCH accepted); halftone, grade, crush, grain and mask are CSS classes from `treatments.css` that also work with no JavaScript at all.

Import the stylesheet once: `import '@zz/motion/treatments.css';`

## Props
| Prop | Default | Notes |
|---|---|---|
| `treatment` | | `duotone` `halftone` `grade` `crush` `grain` `mask` |
| `shadow` | `oklch(22% 0.06 270)` | duotone dark end |
| `highlight` | `oklch(88% 0.10 85)` | duotone light end |
| `contrast` | `1.1` | duotone |
| `vars` | `{}` | custom properties for the CSS treatments |

CSS-only use, no JS:
```html
<figure class="t-halftone" style="--t-dot-pitch: 6px; --t-dot: var(--color-ink)"><img src="..." alt="..."></figure>
<figure class="t-grade" style="--t-grade: contrast(1.2) saturate(0.6); --t-tint: var(--color-accent)"><img ...></figure>
```
JS duotone:
```js
imageTreatment('.team img', { treatment: 'duotone', shadow: 'var(--color-ink)', highlight: 'var(--color-paper)' });
```

## When to use
Every image the client supplied that is not already a considered photograph. Every licensed stock image, without exception. To make a mixed set of phone photos read as one series (same duotone, same grain, same crop).

## When not to use
On a client's professional product or food photography where the colour is the point; use `crush` or `mask` there instead of a colour treatment. On logos. On the same image with two colour treatments stacked.

## Reduced motion
Not motion. Nothing changes.

## Mobile
SVG filters on very large images cost paint time on older phones. Serve a sized image (Astro `<Image>` with widths) rather than filtering a 4000px original. The CSS treatments are cheap everywhere.
