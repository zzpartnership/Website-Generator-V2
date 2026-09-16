# splitText

## What it does
Splits a heading into lines, words or characters with GSAP SplitText and reveals each unit through its own overflow mask. Kinetic typography without hand-wrapping spans. Re-splits on resize and after fonts load.

## Props
| Prop | Default | Notes |
|---|---|---|
| `type` | `'lines'` | `lines` `words` `chars` |
| `from` | `{ yPercent: 110 }` | gsap.from vars per unit. Try `{ xPercent: -100 }` or `{ rotateX: -90, transformOrigin: '50% 100%' }` |
| `duration` | `0.9` | |
| `stagger` | `0.06` | |
| `ease` | `'power4.out'` | |
| `start` | `'top 85%'` | |
| `once` | `true` | |
| `immediate` | `false` | hero use |

```js
splitText('h1', { type: 'lines', immediate: true });
splitText('.pull-quote', { type: 'words', from: { yPercent: 100, rotate: 4 }, stagger: 0.03 });
```

## When to use
Display type that carries the page. One heading per screen at most. Pair with `maskWipe` on the image beside it and the page has an edge language.

## When not to use
Body copy. Anything under about 28px. Every heading on the page (then it is fade-up with extra steps). Headings inside a pinned section that changes text; split once, not per state.

## Reduced motion
No split at all. The heading renders exactly as authored, with no mask and no observer. This is deliberate: split DOM plus reduced motion still costs layout for no reason.

## Mobile
Lines re-flow, so `type: 'lines'` is the safe choice at 375px; `autoSplit` handles the re-split. Characters on a five-line mobile heading is a lot of nodes; prefer words or lines below 768px.
