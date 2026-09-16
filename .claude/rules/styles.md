---
paths: "**/*.css"
---

# CSS conventions

- Tailwind v4, CSS-first. `@import "tailwindcss";` then `@theme { ... }` for tokens.
- Colour tokens are OKLCH: `--color-ink: oklch(20% 0.02 60);`. The relationship rule (how tokens derive from each other) is stated in a comment at the top of the tokens file.
- Token names: `--color-*`, `--font-*`, `--text-*`, `--space-*`, `--radius-*`, `--ease-*`, `--dur-*`.
- Fonts: `@font-face` with `font-display: swap`, variable files, `src: url(/fonts/...)`.
- `prefers-reduced-motion: reduce` gets its own block in every stylesheet that animates. It composes a static state; it does not only remove transitions.
- No `!important`. No inline `<style>` on elements.
- Container queries over media queries for component-level layout; media queries for page-level breakpoints only.
