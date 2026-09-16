---
paths: "**/*.astro"
---

# Astro conventions

- One page per file under `src/pages/`. Pack variants at `src/pages/pack/<name>/index.astro`.
- Import order: framework, then `@zz/motion`, then local components, then styles.
- Styles: tokens come from `src/styles/tokens.css` (or the variant's own `tokens.css` in pack mode). Tailwind utilities reference `--color-*`, `--font-*`, `--space-*` tokens. No hex literals in `.astro` files.
- Scripts: `<script>` tags are module scope by default. Import GSAP primitives from `@zz/motion`; never load GSAP twice.
- Images: `<Image>` from `astro:assets` for local files. Every image element has `alt` and a treatment class or `data-treatment="none"` with a reason in `rationale.md`.
- Primary calls to action carry `data-cta`. `tel:` hrefs use the number from `facts.md` exactly.
- On-demand routes (`src/pages/api/*`) declare `export const prerender = false`.
- Fonts are self-hosted from `public/fonts` and declared in the tokens file, never linked from a CDN.
