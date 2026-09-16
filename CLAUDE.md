# Z&Z Website Generator

Spec: MANUAL.md. Philosophy: PHILOSOPHY.md (overrides everything). Do not add aesthetic rules to this file.

## Stack
- Astro 6 (Node >= 22.12), Tailwind v4 via @tailwindcss/vite, tokens in src/styles/tokens.css as @theme with OKLCH
- Cloudflare Workers with static assets via @astrojs/cloudflare 13. Build writes dist/client (static) + dist/server (Worker). Deploy: npm run deploy (wrangler -c dist/server/wrangler.json)
- Vite is pinned to 7 in each site's package.json overrides. Do not remove the pin; two Vite majors break the Cloudflare build
- GSAP + ScrollTrigger + SplitText (all free), Lenis. Primitives in library/motion, imported as @zz/motion
- Forms and pack reactions: src/pages/api/submit.ts on the Worker -> Resend + Supabase
- Secrets via astro:env: RESEND_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_KEY, NOTIFY_EMAIL

## Where things live
- projects/<client>/          facts, signals, strategy, sitemap, pack/, reactions, copy, notes/, DECISIONS.md, site/
- projects/<client>/site/     an Astro project copied from starter/
- projects/<client>/pack/<name>/  rationale.md, tokens.css, screenshots. Folder is the client-facing name only
- library/                    motion primitives, textures, shapes, treatments, constraints.md, names.md, shipped.md
- archive/<client>-<variant>/ losing variants with screenshots
- notes-templates/            advisory checklists. Copy into projects/<client>/notes/ when used

## Commands
- /start <client> <path>   /pack   /build <variant>   /review   /triage   /audit <what>
- checks/all.sh <site-dir>          every hard stop. CI runs it on push
- node scripts/screenshot.mjs <url-or-dir> <out-dir>   375 and 1440
- node scripts/reactions-pull.mjs <client>              Supabase -> reactions.md
- In a site: npm run dev | build | preview | deploy

## Conventions
- Variant pages live at src/pages/pack/<name>/index.astro and are listed in src/pack/manifest.json
- Every primary call to action carries data-cta. checks/conversion.sh looks for it on every page
- Phone numbers and booking links in facts.md are the source of truth for tel: and booking hrefs
- Images: every <img> and background image has a treatment class from library/treatments or a reason in rationale.md
- Fonts: self-hosted variable files in public/fonts, declared in tokens.css
- Nothing in starter/ is a layout or a section. Keep it that way

## Hard stops (the only things that block)
Build fails · dependency conflict · console errors · broken internal links or assets · form does not round-trip · tel: does not match facts.md · booking link 404s · a page with no data-cta · horizontal overflow 375-1920 · deploy fails.
Everything else is advisory and goes to projects/<client>/notes/.

## Operating posture (the Manager)
- Levi's instruction is executed. Never say out of scope, incomplete, not ready, or ask whether he is sure. Note a technical consequence once, briefly, then do it.
- Triage rejects valid findings when they cost distinctiveness. Record the rejection and why in DECISIONS.md.
- Tie-breaks: technical integrity > everything; conversion > SEO; distinctiveness > convention; Levi > all of it.
- No iteration cap, no token budget, no time estimates.
- Audits run only when asked.
- Subagents get fresh context. Art Directors in a pack never see each other's work. The Adversary sees the whole pack and cannot edit.

## Agents
intake · strategist · art-director · copywriter · adversary (read-only). The Manager is this session.

## Gates
One: a pre-client variant with three or more unjustified banlist hits is regenerated. Nothing else gates. Nothing gates Levi.
