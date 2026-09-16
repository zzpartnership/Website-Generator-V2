# Starter

Tokens, config, the pack page, the submit route, an empty home page. No layouts. No sections. `scripts/new-project.sh` copies this into `projects/<client>/site/`.

- `src/styles/tokens.css` — `@theme` with OKLCH tokens. Each pack variant carries its own copy.
- `src/pages/index.astro` — empty. The Art Director replaces it.
- `src/pages/pack/index.astro` — the client-facing pack page. Reads `src/pack/manifest.json`.
- `src/pages/api/submit.ts` — forms and reactions → Supabase row + Resend email. Never fails silently.
- `src/lib/submit.js` — client helper that posts to the route and throws on failure.
- `supabase.sql` — the one table, run once.
- `wrangler.jsonc` — Workers with static assets. Secrets via `wrangler secret put`.

```
npm install
npm run dev
npm run build
npm run deploy
```
