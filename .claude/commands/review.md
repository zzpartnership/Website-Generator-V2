---
description: Adversary pass plus advisory checklists. Everything goes to notes/. Nothing blocks.
argument-hint: <client-slug> [variant-name]
---

Review `$1` $2.

1. If a variant name was given, screenshot that variant; otherwise screenshot every page of the site at 375 and 1440 with `scripts/screenshot.mjs`.
2. Launch one `adversary` subagent on the target. Notes to `projects/$1/notes/adversary-<date>.md`.
3. Copy any of `notes-templates/*.md` not yet in `projects/$1/notes/` into it, then work through each checklist against the current build and fill in what fails. These are advisory. Use the searchfit-seo skills for the SEO checklist and `design:accessibility-review` for a11y.
4. Run `./checks/all.sh projects/$1/site` and report the result separately, since that is the only part that blocks.
5. Report: hard-stop status in one line, then the Adversary's top three findings, then a count of advisory items per checklist. Then say `/triage` is ready.
