---
paths: "**/motion/**"
---

# Motion primitive conventions

- One folder per primitive in `library/motion/src/<name>/` with `index.js` and `README.md`.
- Export a single function `<name>(target, options)` that returns `{ kill() }`. `target` accepts a selector string or an element.
- Every primitive reads `prefersReducedMotion()` from `../reduced-motion.js` and branches to a composed static state, not an early return that leaves elements hidden.
- Register plugins once at module top: `gsap.registerPlugin(ScrollTrigger)`. Import GSAP from `gsap` and plugins from `gsap/<Plugin>`.
- Options are plain objects with documented defaults. No required options beyond `target`.
- README sections, in this order: What it does · Props · When to use · When not to use · Reduced motion · Mobile.
- Add the primitive to `library/INDEX.md` and to `library/motion/src/index.js` when it is done.
