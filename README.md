# Z&Z Website Generator

Turns client discovery material into a code-built Astro site. Owned by Z&Z Partnership, Brisbane.

The full specification is `MANUAL.md`. The philosophy that overrides it is `PHILOSOPHY.md`. Read Part 12 of the manual before changing anything about how the workspace behaves.

## How a session starts

1. Open this repo in VS Code with Claude Code.
2. Drop whatever discovery material exists anywhere on disk. A transcript, an email thread, a folder of photos, a competitor URL. There is no required format.
3. Run `/start <client> <path-to-material>`. Intake and Strategist run, and `projects/<client>/` is created with `facts.md`, `signals.md`, `strategy.md`, `sitemap.md` and a copy of `starter/` in `site/`.
4. Run `/pack`. Six Art Directors run in parallel, one per constraint level. The Adversary reports on all six. Pick four. The pack page is at `/pack` on the preview deploy.
5. Send the client the pack URL. Reactions arrive by email and in Supabase. `node scripts/reactions-pull.mjs <client>` appends them to `reactions.md`.
6. Run `/build <variant>` once a direction is locked. Then `/review`, then `/triage`.
7. After launch, run the Librarian checklist at the bottom of `library/INDEX.md`.

## Commands

| Command | Does |
|---|---|
| `/start <client> <path>` | Intake → Strategist → project folder |
| `/pack` | Generate six variants, Adversary pass, prune to four |
| `/build <variant>` | Full build of the locked direction |
| `/review` | Adversary + advisory checklists → `notes/` |
| `/triage` | Manager: accept, reject, dispatch. Updates `DECISIONS.md` |
| `/audit <directions|banlist|taste|instructions>` | On request only |

## Hard stops

`checks/all.sh <site-dir>` runs every hard stop. CI runs it on every push. Nothing else in this repo blocks anything.

## Plugins

`.claude/settings.json` lists the enabled plugins. Marketplaces are registered once per machine with `/plugin marketplace add <owner/repo>` using the same sources as the user-scoped installs already on Levi's machine (`~/.claude/settings.json` lists them).

## Requirements

Node 22.12 or higher. Chromium or Chrome on the path, or `CHROME_PATH` set, for the console and overflow checks and screenshots.
