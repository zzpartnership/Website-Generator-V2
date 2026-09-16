---
description: Generate the concept pack. Six Art Directors in parallel, one per constraint level, then the Adversary on all six, then prune to four.
argument-hint: <client-slug>
---

Generate the concept pack for `$1`.

1. Draw six names at random from `library/names.md`. Draw one generative constraint from `library/constraints.md` for level 5 and a second, harder one for level 6. Write the mapping (name → level → constraint) to `projects/$1/pack/plan.md`. The client never sees this file.
2. Launch six `art-director` subagents **in parallel, in one message**, one per variant. Each prompt contains only: the client slug, its own client-facing name, its own constraint level and constraint, and the instruction to read the project files, `taste.md`, `banlist.md` and `library/INDEX.md`. Do not mention the other variants. Do not summarise the other variants. Each builds `site/src/pages/pack/<name>/index.astro`, its `tokens.css`, and `pack/<name>/rationale.md`, and adds itself to `src/pack/manifest.json`.
3. Run `./checks/all.sh projects/$1/site`. Fix breakage. Run `node scripts/screenshot.mjs projects/$1/site projects/$1/pack` so every variant has 375 and 1440 screenshots in its folder.
4. Launch one `adversary` subagent in pack mode on all six. Its notes go to `projects/$1/notes/adversary-pack.md`.
5. Any variant with three or more unjustified banlist hits: relaunch its Art Director with the Adversary's list attached, then re-screenshot. Repeat until under three.
6. Present the six to Levi in one table: name, level, the Adversary's one sentence, banlist count, the Adversary's drop recommendation. Levi picks four. Set `shown: false` on the other two in `manifest.json` and move copies of their folders to `archive/$1-<name>/` with screenshots.
7. Deploy the site. Report the pack URL (`/pack`).
