# stickyPin

## What it does
Pins a section to the viewport for a scroll distance and hands back progress 0→1, or scrubs a timeline you supply. This is the base for layered reveals, step-through sequences, and the "scroll to change the picture" moment.

## Props
| Prop | Default | Notes |
|---|---|---|
| `end` | `'+=150%'` | how far the visitor scrolls while pinned |
| `start` | `'top top'` | |
| `scrub` | `true` | number for smoothing, e.g. `0.6` |
| `onProgress` | | `(progress, trigger) => void` |
| `timeline` | | a gsap timeline scrubbed across the pin |
| `pinSpacing` | `true` | |
| `anticipatePin` | `true` | |

```js
const tl = gsap.timeline();
tl.to('.layer-2', { yPercent: -100 }).to('.layer-3', { yPercent: -100 });
stickyPin('.stack', { end: '+=200%', timeline: tl });
```

## When to use
One narrative moment per page: the process, the before/after, the three things that matter. It is the strongest tool in the set and the easiest to overuse.

## When not to use
More than once or twice on a page. On the hero (pinning the first screen reads as broken). When the content is a list; a list scrolls. Anywhere a banlist reviewer would call it scroll-jacking with no narrative reason.

## Reduced motion
No pin. `onProgress(1)` fires once and the timeline is set to its end, so the section composes at its final state in normal document flow. Design that end state to stand alone.

## Mobile
Address-bar resize changes viewport height mid-pin. Keep `end` relative (`+=`), avoid `100vh` heights inside the pinned element (use `100svh` or `100dvh`), and test at 375×667 with the bar visible. Consider a shorter `end` under 768px since flick-scrolling covers distance fast.
