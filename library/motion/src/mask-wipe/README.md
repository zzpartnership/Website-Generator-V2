# maskWipe

## What it does
Reveals an element by animating a `clip-path: inset()` open from one edge. Nothing fades; the element is fully opaque behind a moving edge. Works on images, blocks of type, whole sections.

## Props
| Prop | Default | Notes |
|---|---|---|
| `from` | `'left'` | `left` `right` `top` `bottom` |
| `duration` | `1.1` | seconds |
| `ease` | `'power3.inOut'` | |
| `start` | `'top 80%'` | ScrollTrigger start |
| `once` | `true` | `false` reverses on scroll back |
| `stagger` | `0.08` | between elements in the same call |
| `immediate` | `false` | `true` plays on call, for the hero |

```js
maskWipe('[data-wipe]', { from: 'left', stagger: 0.12 });
maskWipe(heroImage, { from: 'bottom', immediate: true, duration: 1.4 });
```

## When to use
As a motion signature: "everything enters on a left mask-wipe; nothing fades." Editorial and photographic pages. Anywhere the fade-up default is the banlist hit you are avoiding.

## When not to use
On small inline elements (buttons, labels): the wipe reads as a glitch at that size. On anything already using an overflow mask for a split-text reveal; pick one edge language per page.

## Reduced motion
`clip-path: none` set on call. Everything is visible and composed as the static layout. No observer, no delay.

## Mobile
Wipes from the side read well in portrait because the travel is short. Wipes from the bottom on a tall element travel the whole screen; shorten `duration` or switch `from` to a side at coarse pointer.
