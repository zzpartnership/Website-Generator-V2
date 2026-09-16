---
description: Audits. Run on request only, never proactively.
argument-hint: directions | banlist | taste | instructions
---

Run the `$1` audit.

**directions** — Read `library/shipped.md` and every `projects/*/pack/*/rationale.md` from the last ten projects. Cluster the motion signatures, shape rules, colour rules and grid breaks. Report any move that appears in three or more projects. Report whether packs are converging: are the level-1 variants of different projects describable by the same sentence? Propose nothing. Report.

**banlist** — Read every `projects/*/notes/adversary-*.md`. Count hits per banlist entry. Report the five that fire most and every entry that has never fired. For never-fired entries, propose cutting. For the top five, propose whether each needs splitting into something more specific.

**taste** — Read `taste.md`. Report: line count, entries per project, and any sentence that is an imperative rather than an observation (contains prefer, always, avoid, should, never, must). Propose cuts to bring it under the cap and to remove every imperative. Report which observations have appeared for three or more clients; those are calibration, the rest are noise.

**instructions** — Read `CLAUDE.md`, `PHILOSOPHY.md`, every file in `.claude/agents/`, `.claude/rules/`, `.claude/commands/`. Report line counts. Flag any sentence in `CLAUDE.md` or a rules file that is aesthetic rather than technical. Flag any contradiction between files. Flag any gate, threshold, confirmation prompt or scope check that is not the single banlist gate. Propose trims. Do not apply them.
