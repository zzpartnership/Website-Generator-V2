# Library index

Read this instead of loading the library. Everything here is composable material; none of it is a layout.

## Motion primitives — `@zz/motion`

| Primitive | Status | One line |
|---|---|---|
| `maskWipe` | built | Clip-path reveal from an edge. Nothing fades. |
| `splitText` | built | Lines / words / chars through a mask, SplitText, re-splits on resize. |
| `stickyPin` | built | Pin a section, hand back progress 0→1 or scrub a timeline. |
| `grainOverlay` | built | Film grain, page or element, CSS-stepped flicker. |
| `imageTreatment` | built | Exact SVG duotone; CSS halftone, grade, crush, grain, mask. |
| `smoothScroll` | built | Lenis wired to ScrollTrigger. Off under reduced motion. |
| horizontal scroll section | v2 | Pinned section that scrolls sideways. |
| magnetic cursor | v2 | Elements lean toward the pointer. Pointer-fine only. |
| clip-path shape transition | v2 | Morph between shapes from `library/shapes`. |
| marquee | v2 | Continuous strip, pauses on hover, static under reduced motion. |
| parallax layers | v2 | Depth by scroll rate. |
| gradient mesh background | v2 | Slow-moving OKLCH mesh. |
| animated counter | v2 | Number rolls up. Never the only moment on the page. |
| text scramble | v2 | Characters resolve into the word. |
| cursor-follow | v2 | Element trails the pointer. Pointer-fine only. |
| page transition | v2 | View Transitions with a named wipe. |

Build the v2 set after the Phase 2 decision point, in the order the first winning pack asks for them.

Each built primitive: `library/motion/src/<name>/README.md` has props, when to use, when not to, reduced motion and mobile.

## Textures — `library/textures`
`grain.svg` (tile) · `paper.svg` (tile) · `noise.css` (`.noise-fine`, `.noise-coarse`, inline data URIs)

## Shapes — `library/shapes`
`clip-paths.css` — 20 clip-path classes (`.clip-wedge`, `.clip-blade`, `.clip-arch`, `.clip-notch-tl`, `.clip-stair` …) and corner-only radii (`.r-tl`, `.r-leaf` …)
`masks.svg` — inline once; `clip-path: url(#mask-arch | #mask-blob-1 | #mask-torn | #mask-stamp | #mask-window | #mask-slash)`

## Treatments — `library/treatments`
`README.md` — seven named recipes (Newsprint, Two-tone, Warm grade, Cold grade, Crush and mask, Torn and stamped, Ghost)
`duotone.svg` — a static duotone filter for CSS-only use
Classes live in `@zz/motion/treatments.css`.

## Pools
`constraints.md` — 26 generative constraints for levels 5 and 6
`names.md` — 30 client-facing variant names
`shipped.md` — one line per launched site

## Librarian checklist (after each launch)
1. Add one line to `shipped.md`.
2. Roll `projects/<client>/reactions.md` into `taste.md` as observations with the project and variant named. No imperatives.
3. Move the pack folders of unchosen variants to `archive/<client>-<name>/` with both screenshots, if `/pack` has not already.
4. If the build produced a reusable motion idea, add it as a primitive folder with a README and list it here.
5. Add any new AI-tell noticed during the project to `banlist.md`.
