# @zz/motion

Five primitives built. Ten listed for v2 in `library/INDEX.md`. Each folder has `index.js` and a README with props, when to use, when not to, reduced motion and mobile.

```js
import { smoothScroll, maskWipe, splitText, stickyPin, grainOverlay, imageTreatment } from '@zz/motion';
import '@zz/motion/grain.css';
import '@zz/motion/treatments.css';
```

Every primitive returns `{ kill() }`. Every primitive reads `prefers-reduced-motion` and composes a static state rather than leaving anything hidden.

GSAP and all its plugins, SplitText included, are free for commercial use since 3.13.
