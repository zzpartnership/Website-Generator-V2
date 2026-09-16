---
description: Build the full site from the locked direction.
argument-hint: <client-slug> <variant-name> [notes on what to borrow from other variants]
---

Build the site for `$1` from variant `$2`. $3

1. Record the choice in `projects/$1/DECISIONS.md`: the chosen variant, what is borrowed from others, and every variant that was rejected with the client's stated reason from `reactions.md`.
2. Run the `art-director` subagent in build mode. Its design language is `projects/$1/pack/$2/rationale.md`. It builds every page in `sitemap.md` into `projects/$1/site/src/pages/`, with the home page replacing `index.astro`. Character budgets per page and beat go into `rationale.md`.
3. Run the `copywriter` subagent. It writes `projects/$1/copy.md` to those budgets. Then the Art Director places the copy.
4. Run `./checks/all.sh projects/$1/site`. Fix breakage until green.
5. Deploy to preview. Report the URL and the three things Levi should look at first.
