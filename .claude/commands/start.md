---
description: Start a project. Intake then Strategist, then create the project folder from the template and the site from the starter.
argument-hint: <client-slug> <path-to-material>
---

Start project `$1` from the material at `$2`.

1. Run `scripts/new-project.sh $1`. This creates `projects/$1/` from `projects/_template/` and `projects/$1/site/` from `starter/`.
2. Run the `intake` subagent on everything under `$2`. It writes `projects/$1/facts.md` and `projects/$1/signals.md`. Accept whatever is there. Nothing is required.
3. Run the `strategist` subagent. It writes `projects/$1/strategy.md` and `projects/$1/sitemap.md`.
4. Report in five lines: altitude, primary conversion action, pages, the strongest signal, and what would help (from `signals.md`). Do not ask for anything before proceeding.
