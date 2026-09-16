# Treatment recipes

A recipe is a named combination applied to every image on a page so the imagery reads as one series. Write the recipe into `rationale.md` and implement it with `@zz/motion/treatments.css`, `imageTreatment()`, `library/shapes` and `library/textures`.

## Recipes

**Newsprint** — `t-halftone` with `--t-dot-pitch: 5px`, `--t-dot-angle: 22deg`, dot colour = ink token. Grain overlay at 0.1. Crop tight. Reads as a printed page. Suits trades, industrial, anything with hands in the photos.

**Two-tone** — `imageTreatment(..., { treatment: 'duotone', shadow: ink, highlight: accent })`. Every photo in the same two colours, no exceptions. The strongest way to unify bad phone photos. Suits services where the person, not the product, is the offer.

**Warm grade** — `t-grade` with `--t-grade: contrast(1.15) saturate(0.7) sepia(0.2)`, `--t-tint` = a warm accent at 0.35 soft-light. Grain at 0.08. Photos keep their colour but share a temperature. Suits food, hospitality, home.

**Cold grade** — as above with `saturate(0.55) hue-rotate(-8deg)`, tint = a cool token. Suits clinical, technical, finance.

**Crush and mask** — `t-crush` with `--t-zoom: 1.5` and a focus point, inside a `clip-*` or `mask-*` shape. No colour change. Suits product and food photography where the colour is the point.

**Torn and stamped** — `clip-path: url(#mask-torn)` on the wrapper, `t-grain` on the image, one hard drop of colour behind it offset by a token spacing. Suits anything that wants to feel handled.

**Ghost** — `t-duotone` (CSS version) with shadow = paper token, highlight = a near-paper tint, at 0.6 opacity behind type. Imagery as texture rather than subject. Suits pages where the copy carries the offer and photos are weak.

## Rule

No untreated stock. It is a banlist entry; the Art Director can justify it in `rationale.md`, and Levi can overrule silently.
