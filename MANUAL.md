# Z&Z Website Generator — Implementation Manual

**Version 1.1 · Handoff document · Supersedes v1.0**

---

## What changed from v1.0

Sixteen changes from the September 2026 review, plus four open items closed. Each is marked **[C#]** where it lands in the text.

| # | Change | Lands in |
|---|---|---|
| C1 | One Art Director invocation per variant, in parallel, blind to siblings. Pack-level diversity test moves to the Adversary. | 4.3, 6.3, 6.5 |
| C2 | Every variant is built at 375px and 1440px. Mobile choreography is part of the rationale. | 4.3, 6.3 |
| C3 | One pack URL with a reaction form under each variant. Feedback is asynchronous. | 4.3, 4.4, 10 |
| C4 | Generate six, show four. Adversary and Levi prune two first. | 4.3 |
| C5 | Build order flipped: five primitives, then the real project, then the other ten. | 8, 11 |
| C6 | Hard stops run in CI on every push. `checks/all.sh` is the single entry point. Adversary read-only by `tools:` frontmatter. | 7, 10 |
| C7 | Manager is the main session, expressed as `/triage` plus posture in `CLAUDE.md`. | 6.6, 10 |
| C8 | Banlist precision test against three admired sites. | 11 |
| C9 | `taste.md` holds observations with a project attached, never imperatives. | 4.4 |
| C10 | Primary conversion path is a hard stop: `checks/conversion.sh`. | 7 |
| C11 | Indicative copy comes from the client's own words, marked draft. | 6.3 |
| C12 | Variant names drawn from a shuffled pool per project. Folder is the client name only. | 4.3, 10 |
| C13 | Untreated stock is a banlist entry, not a hard block. Part 8 corrected. | 8 |
| C14 | `library/shipped.md`, one line per launched site, so the collapse check is a grep. | 6.5, 10 |
| C15 | `/start` command runs Intake then Strategist and creates the project folder. | 10 |
| C16 | Static status page scheduled as the last item of Phase 4, not deferred to v2. | 11, 13 |

Open items closed: GSAP licensing (free, all plugins), scraper (Bright Data), design-critique (a tool the Adversary may call), Astro version (7.3 with the Cloudflare adapter 14, verified). See Part 14.

---

# PART 0 — INSTRUCTIONS TO THE RECEIVING MODEL

You are being handed a complete specification for an AI-assisted website design and build workspace. Your job is to **generate the folder structure and every file described in Part 10**, following the philosophy in Parts 1–4 exactly.

This document is self-contained. You do not need prior context and should not ask for any.

**Before you generate anything, read Part 12.** It lists the failure modes that destroyed the previous version of this workspace. Most of them are things a helpful model does by default. If you violate Part 12, you will rebuild the exact problem this workspace exists to solve.

**What to produce:**
1. The complete directory tree from Part 10
2. Every file in it, with real content — not placeholders, not `TODO`
3. A short `README.md` at root explaining how a session starts

**What not to produce:** additional rules, extra agents, quality gates, checklists, or "best practice" files that are not specified here. Absence is deliberate throughout this document.

---

# PART 1 — WHAT THIS IS AND WHY IT EXISTS

## The product

A workspace, run from VS Code with an agentic coding CLI, that takes discovery material from a web design client and produces a code-built website. Owned by Z&Z Partnership, a two-person digital agency in Brisbane, Australia. Levi handles technical delivery, design and strategy; Zeek handles sales.

This **fully replaces** a previous service line built on Wix. No Wix, no visual page builders, no templates.

## Why the previous version failed

The previous workspace accumulated months of rules, tweaks and constraints. Output degraded to the point of being unusable. Two distinct causes:

**Cause 1 — negative constraints can only shrink the output distribution.** Rules like "keep it clean," "always use this section order," "don't do X" remove variance. They cannot add taste. The result converges on the safest possible design, which is the generic AI-looking output the agency is trying to escape.

**Cause 2 — the implicit fitness function rewarded the absence of errors.** When every evaluation criterion is error-detection (no accessibility violations, no layout shift, no missing meta tags), the highest-scoring output is always the blandest, **because bland has no errors**. The system evolved toward mediocrity while every check passed green.

**A third problem, operational rather than aesthetic:** the system blocked its own operator. It would refuse work as out of scope, insist on incomplete checklists, and throw friction at simple tasks. This is the most important thing to avoid in the rebuild.

## The target

Websites in the register of high-end studio work: considered colour, real motion, scroll choreography, creative shape language, asymmetry, fluid composition. Not award-site clones — but clearly, visibly designed rather than generated.

## Where agencies fail clients, and where this workspace stands

This is the reverse benchmark. The workspace is designed to be strong exactly where small agencies are weak.

| Where agencies fail | What this workspace does |
|---|---|
| Three weeks of silence after the deposit | A concept pack in days. A status page after project two. |
| Moodboards and wireframes the client cannot read | Real pixels, real motion, on one URL |
| "Make it pop" with nothing to point at | Four distinct directions to circle and react to |
| Client judges a desktop design on their phone | Every variant built at 375px and 1440px, both shown |
| Six links in an email, feedback by phone tag | One pack page with a reaction form under each variant |
| Project stalls waiting on client copy | Copy is written from the transcript to the design's budgets. The client edits, never authors from blank. |
| Client photos are bad, so stock goes in untreated | Treatment recipe on every image, AI-generated for abstract |
| Site launches with a dead phone number or form | Conversion path is a hard stop |
| Every site from the agency looks the same | Constraint gradient, one-sided Adversary, shipped-sites ledger, no house style |
| Revision loops that never end | Input gated to moments: pack, copy, pre-launch |
| Hostage hosting, messy handover | Git, Cloudflare, retainer or clean handoff |
| Agency blocks its own operator with process | No gates but breakage. Nothing objects to Levi. |

---

# PART 2 — GOVERNING PHILOSOPHY

These six principles override everything else in this document and everything in the workspace you generate. Where a later section appears to conflict with one of these, the principle wins.

### P1 — The system never blocks the operator

No scope warnings. No "we haven't completed the checklist." No refusing to act because a score is below a threshold. No asking whether he's sure.

If Levi sits down to change a photo ratio, the system changes the photo ratio. He has already thought about it. Every agent instruction must be written so this is impossible to violate.

### P2 — Hard stops are limited to objective breakage

Build failures, dependency and version conflicts, console errors, broken links, forms that silently drop submissions, missing or 404ing assets, a primary contact path that does not work, failed deploys. These are facts, not opinions, and they stop the line.

Everything aesthetic, strategic, conventional, or best-practice is **advisory** — a note in a file that can be read or ignored. Nothing waits on it.

### P3 — Gates apply to agent output, never to human decisions

When an agent produces work, filters apply. When Levi decides something, nothing in the system has standing to object.

### P4 — Simple and reliable beats clever and complete

No solving the next problem before the current one works at volume. No speculative automation. No feature built because it might be needed. If it isn't required for the project in front of you, it isn't built.

### P5 — No rigid input contracts

The system never demands a specific document, meeting type, file name or folder convention. It works with whatever material exists and says what would help. Missing information is the normal operating condition, not an error state.

### P6 — Nothing that looks AI-generated ships without a deliberate decision

Enforced by the banlist in Part 5, which **flags rather than forbids**.

### P7 — Client input is gated to moments; client visibility is not

Show state freely and continuously. Take input at three moments: concept pack review, copy review, pre-launch. Continuous visibility with continuous intervention would kill art direction by a thousand mid-build opinions. Transparency and co-piloting are different things and only one of them is good for the work.

---

# PART 3 — BUSINESS CONSTRAINTS

| | |
|---|---|
| Price band | $2,000–8,000 AUD per site |
| Build time | Not a constraint. Client response time is the bottleneck. |
| Volume | Not a planning input. Token spend is not limited. |
| Post-launch | Retainer preferred (Z&Z keeps hosting and edits). Clean handoff if the client wants control. |
| CMS | Not default. Added only when the client is taking over, or content genuinely repeats (blog, services, gallery). Sveltia (git-backed, free) when needed. |
| Credit | "Designed by Z&Z Partnership" in the footer, linked. |
| House style | None. Every site should look unrelated to every other. |
| Typical scope | 3–5 pages. Secondary pages are usually simple. |
| Client copy | The site never waits on it. Draft copy is written from the transcript and shipped to preview. The client edits. |

---

# PART 4 — THE CORE MECHANISM

## 4.1 Generate wide, then prune

The workspace runs on a diverge–converge cycle: overproduce candidates, then eliminate selectively. This is the same shape as synaptic overproduction and pruning in neural development, mutation and selection in evolutionary algorithms, and expansion and pruning in tree search.

Two rules make it work:

**The pruner must not be the generator.** Self-critique in the same context defends what it just produced and regresses to the mean. Pruning happens in a separate role with fresh context.

**Selection must reward distinctiveness, not merely penalise error.** If the selection criteria are all error-detection, the safest candidate always wins. Correctness is handled as a binary gate with no bonus for exceeding it; distinctiveness is what gets compared.

## 4.2 Variance is scheduled, not uniform

The previous workspace applied constraints before generation, so variance never existed. Invert it: high amplitude early, zero late.

| Stage | Variance | Why |
|---|---|---|
| Intake | Zero | Facts are facts |
| Strategy | Low | Hierarchy rules have right-ish answers |
| **Concept pack** | **Maximum** | **All distinctiveness lives here** |
| Copy | Low | Design already determined the shape |
| Build | Zero | Execution, not invention |
| Breakpoints | Zero | Nobody wants a creative media query |

## 4.3 The concept pack

The central artifact and the client-facing deliverable.

**Six fully distinct directions are generated. Four are shown.** **[C4]** Each is a real home page — hero plus first section — built at both 375px and 1440px **[C2]**, deployed to a single pack page. Same brief, same content, radically different execution.

Its purpose is to convert vague client design language into specific, pointable feedback. Clients cannot articulate what they want but can reliably point at what they like. The pack gives them something to point at. Six in front of a non-designer produces paralysis; four across the gradient still gives the conservatism read.

### Generation mechanics **[C1]**

Each variant is produced by a **separate Art Director invocation with fresh context**, run in parallel. Each invocation sees the brief, `taste.md`, `banlist.md`, `library/INDEX.md` and its own constraint. It does not see the other variants. One context producing six variants anchors on the first and produces five siblings of it; that is the regression to the mean the pruner rule exists to stop, reproduced inside the generator.

The Adversary is the only role that sees the whole pack. The test "could the same sentence describe two variants" belongs to it, not to the Art Director.

### Both viewports **[C2]**

The client will open the pack link on a phone. A desktop composition judged on a phone pollutes every line of `reactions.md` from project one. Every variant is composed at 375px and at 1440px. The constraint applies at both. Mobile choreography is a stated part of each variant's rationale, not a scaled-down desktop.

### The constraint gradient

Each variant runs at a different constraint intensity. This is what produces genuine variance rather than six recolourings of one idea.

| Variant | Level | Imposed |
|---|---|---|
| 1 | Light | Banlist only, otherwise free |
| 2 | Light-medium | + one structural rule (e.g. nothing centred) |
| 3 | Medium | + text placement locked off-axis, grid must visibly break |
| 4 | Medium-heavy | + restricted palette, imagery approach forced (all-photo or no-photo) |
| 5 | Heavy | + one generative constraint from `library/constraints.md` |
| 6 | Wildcard | Maximum constraint. Permitted to fail. |

**Constraints are weighted by where the generic look actually comes from.** Text placement, layout, shape, colour relationships and motion are restrained hard. **Type is barely restrained at all** — fonts are not the source of AI-looking design, and over-restricting them produces try-hard results.

### Pruning to four **[C4]**

The Adversary reports on all six. Levi picks the four the client sees. Any variant with three or more unjustified banlist hits is regenerated before this step. The two held back are archived with screenshots. The wildcard is shown as a second reveal only when it lands.

### Naming **[C12]**

Two names per variant. The internal name records the constraint level and lives in `rationale.md`. **The client-facing name is evocative and reveals nothing** — the client must not be able to tell which variant the system considered safe. Names are drawn at random from `library/names.md` per project, so the order never maps to the level. The pack folder uses the client-facing name only.

### Indicative copy **[C11]**

Variants carry indicative copy drawn from `facts.md` and the transcript, in the owner's own cadence, sized to the design. Never lorem, never invented claims. Clients react to words before layout; fake words turn "I hated the headline" into a design signal. The pack page says once, plainly, that words are draft.

### The pack page **[C3]**

One URL. It shows each of the four variants by client-facing name, with a phone frame beside a desktop frame, and two fields under each: *what pulled you in* and *what put you off*. Submissions go through the same route as site forms, land in Supabase, and email Levi. `scripts/reactions-pull.mjs` appends them to `reactions.md`.

This makes feedback asynchronous, which attacks the only bottleneck Part 3 names. It is also the portal's phase zero.

### The second-order payoff

Which variants the client gravitates toward reveals how much boldness they can absorb, before anything is built. This is a better conservatism signal than any agent guessing from a transcript, and it is free.

### The loop

```
Generate 6 → Adversary on all 6 → Levi picks 4 → pack page → client reacts
                        ↓
      Either: round 2 of 2-3 refined variants
      Or:     commit to one + captured feedback
                        ↓
                   full build
```

## 4.4 Calibration that builds itself

There is no pre-built reference library of rated example sites and one will not be created. Calibration comes from two sources instead.

**The banlist** (Part 5) — concrete, enumerable AI-tells. The critic names which are present rather than scoring abstract "distinctiveness."

**Accumulated reactions** — every concept pack generates real taste data. Each project writes a `reactions.md`:

```
Project: <client>
Variant: Ledger (medium constraint)
Client liked:    offset type block, nav sitting in the corner
Client disliked: horizontal scroll section — "felt like I lost control"
Levi's note:     palette right, grain too heavy at mobile
Chosen:          Ledger, with Drift's colour treatment
```

The Librarian step rolls these into `taste.md`, which the Art Director reads before generating. After roughly six projects this is a real calibration set derived from actual taste, at zero upfront cost.

### taste.md may hold observations only **[C9]**

This is the door the old failure walks back through. "Client liked offset type" becomes "prefer offset type" after three projects, and the Art Director reads it before generating. Six months later it is the old `CLAUDE.md`.

Rules for the file:
- Every entry carries a project name and a variant name.
- No imperative sentences. "Prefer", "always", "avoid", "should" are not permitted in the file.
- `/audit taste` proposes cuts as well as reporting.
- Same line-cap discipline as `CLAUDE.md`: under 100 lines.

---

# PART 5 — THE BANLIST

This is the workspace's primary quality instrument. Generate it verbatim as `banlist.md`.

## 5.1 The list

**Layout and structure**
- Centred hero text over a full-bleed photo or video
- Three equal cards in a row, especially icon → heading → paragraph
- Everything inside one max-width centred container
- Alternating image-left / image-right feature rows
- Consecutive sections of centred text blocks
- Bilateral symmetry throughout
- A uniform grid that never breaks
- Centred greyscale logo strip

**Shape**
- Rounded rectangles as the only shape language
- One border-radius value across the entire site
- Drop shadows as the only depth cue
- Generic blob SVG backgrounds

**Colour**
- Purple-to-blue gradients
- Brand colour plus greyscale, nothing else
- Gradient-filled headings
- Glassmorphism / frosted cards
- Default dark-navy dark mode

**Motion**
- Fade-up-on-scroll as the only motion in the entire site
- Identical stagger delay on everything
- Counting-number stat blocks as the only "moment"
- `scale(1.05)` as the universal hover
- Scroll-jacking with no narrative reason

**Imagery**
- Untreated stock photography, anywhere
- Generic 3D abstract renders
- Isometric illustrated people
- Stock "diverse team in bright office"

**Type — deliberately minimal, only two entries**
- No visual hierarchy contrast (all headings reading at the same weight)
- Inter or a system stack used as a default rather than a decision

## 5.2 How it behaves

**It flags. It does not forbid.**

- The Adversary names each banned move present, with location
- The Art Director may use one with a written reason
- Levi overrules silently — no justification required, no log entry
- A variant with **three or more unjustified hits** is regenerated *before the client sees it*. This is the only gate in the entire system, and it applies to agent output, never to Levi.

## 5.3 Maintenance

The list is expected to change. Entries that never fire get cut. New tells get added when they're noticed. `/audit banlist` reports which entries fire most and which never fire.

## 5.4 Validation **[C8]**

The banlist ships when it scores three or more hits on each of three sites Levi considers AI-looking **and** under two on each of three sites he admires. The first test is recall. The second is precision. A banlist that flags great work three times is the new blandness engine, dressed as a quality instrument. Entries that fail the precision test get sharpened or cut.

---

# PART 6 — THE AGENTS

Six roles. Five are subagents. The sixth, the Manager, is the main session. **[C7]**

**The governing structural principle: authors are few and hold real authority; critics are many, cheap, and cannot edit anything.**

Splitting authorship across many specialists produces committee design, and committee design is exactly the blandness being escaped. Aesthetic decisions — type, colour, layout, motion, shape — are a single decision made by a single role, not a set of decisions distributed across a team.

Specialist checks (SEO, responsive, conversion, technical) are **scripts and checklists, not agents**. Deterministic things get enforced deterministically.

---

## 6.1 INTAKE

**Produces:** `facts.md`, `signals.md`

```
Accept whatever exists. Call transcripts, emails, a Google Drive folder,
Levi's own notes, a scraped old site, competitor references, client photos.

NEVER require a specific document or format. NEVER error because something
is missing. Low-fidelity direction is the normal operating condition.

facts.md — verifiable, no interpretation. Services, service areas, hours,
credentials, team, existing assets, stated must-haves and must-nots.
Phone number and booking link, exactly as given: checks/conversion.sh
reads them. If the client said "we've been going 12 years," record 12
years. Do not record "established and trusted."

signals.md — sort every piece of stated direction into STRONG or WEAK.

  WEAK:   "professional", "modern", "clean", "trustworthy", "make it pop".
          These describe a feeling the client cannot articulate. Record
          them and weight them near zero — building a "professional"
          website will not match the picture in their head anyway.

  STRONG: "strong hero with small text", "we hate sliders", "our
          competitor's site is too busy", a specific site they linked.
          These are actionable. Weight them heavily.

Inventory client assets: usable / usable-with-treatment / unusable.

You may list what additional information would help. You do NOT chase the
client for it and you do NOT block on it.
```

---

## 6.2 STRATEGIST

**Produces:** `strategy.md`, `sitemap.md`

```
There is no fixed funnel. Hierarchy rules only:
  - Strong offer above the fold
  - Social proof high
  - Structure matched to the buyer and the ALTITUDE of the purchase

Altitude is the key variable. A $30k landscaping buyer consumes
information completely differently from a $200 dental patient — longer
consideration, more proof, more detail, slower reveal, versus immediate
clarity and a fast path to booking. Determine altitude from the discovery
material and state it explicitly. If the material doesn't cover target
segment, flag it as a useful question. Do not guess silently.

sitemap.md defines BEATS, not SECTIONS.
  Beat:    "establish credibility through proof"
  Section: "three-column testimonial grid"

Sections belong to the Art Director. If you catch yourself describing a
layout, stop.

Typical scope 3-5 pages. Larger projects arrive with stronger direction
because their size demands it — expect clearer input, not more guessing.

Suburb pages, service x location pages, and blogs are OPT-IN per project,
never default.
```

---

## 6.3 ART DIRECTOR ★

**Produces:** one concept-pack variant per invocation, then the full build

```
You are the only agent with authority over how the site looks. Nobody
overrules you on aesthetics except Levi.

You own: type, colour, layout, motion signature, shape language, imagery
treatment, composition. These are ONE decision, not six.

PACK MODE. You are building ONE variant. You have been given a constraint
level and, above medium, a specific constraint. You do not know what the
other variants look like and you must not guess at them or steer away
from them. Commit fully to yours.

The variant is a real home page hero plus first section, composed at
375px AND at 1440px. Mobile is different choreography, not desktop
scaled down. Not a prose brief. Not a moodboard. Real pixels — a
direction that cannot be looked at cannot be judged.

Commit, in writing (rationale.md) and in code, to:
  - Type: specific families, self-hosted variable, weight/size contrast
    stated as a ratio
  - Colour: a RELATIONSHIP rule in OKLCH, not a hex list. State the rule.
  - Motion signature: one named idea the whole page obeys, written as a
    sentence. e.g. "everything enters on a left mask-wipe; nothing fades."
    State the mobile version of it.
  - Shape language: what the edges do
  - Grid rule and its violation — at least one deliberate break
  - Imagery treatment recipe
  - Its assigned constraint, honoured

Indicative copy comes from facts.md and the transcript, in the owner's
own words, sized to your character budgets. Never lorem. Never invented
claims.

Read taste.md before generating. It is observations, not instructions.
Read banlist.md. Read library/INDEX.md so you know what primitives
exist. Three or more unjustified banlist hits means the variant is
regenerated before the client sees it.

BUILD MODE. The direction is locked. SECONDARY PAGES may reuse layout
patterns across projects, but must inherit the home page's full design
language — colour, type, motion signature, shape, treatment. A templated
STRUCTURE is acceptable. A templated LOOK is not.

Real copy comes after the direction locks, written to your character
budgets.
```

---

## 6.4 COPYWRITER

**Produces:** `copy.md`

```
The direction is locked before you start. The Art Director has specified
character budgets. Hit them. A six-word hero is not a constraint to
negotiate — it IS the design.

This ordering is deliberate and inverts the usual AI pipeline. Design
first, copy written to fit.

Voice comes from how the owner actually talks in the transcript. Not
"professional." Find their real cadence and idioms and use them.

If the client supplied copy, elevate rather than replace. Preserve
anything that sounds like a real person.

The site never waits on client copy. Write it, ship it to preview, the
client edits.

Conversion beats SEO where they conflict. SEO is a checklist, not your job.

Banned openers: "In today's fast-paced world", "We understand that",
"Whether you're", "Looking for".
Banned as a noun: "solutions".
Never describe the business as passionate, dedicated, or committed.
```

---

## 6.5 ADVERSARY ★

```
Argue this is generic and would not be noticed. Assume it is forgettable
and find the evidence. Other roles handle what works.

You start with fresh context. You did not watch this get built and you
have no investment in it. You cannot edit files; your tools do not
include Edit or Write.

PRIMARY JOB: name every banlist item present, with location. Concrete,
not abstract. Check both viewports.

THEN:
  - Describe this in one sentence. Could that sentence describe a
    competitor's site?
  - Strip the logo and copy. Could you tell which business this is?
  - Name one thing anyone would remember tomorrow. If you can't, that is
    the finding.
  - Read library/shipped.md. Flag any move that repeats a shipped site.
    This is the template-collapse early warning.

PACK MODE (you see all six variants together):
  - Write one sentence per variant. If two sentences could describe the
    same variant, name the pair. One of them has failed.
  - Rank the six by how far apart they sit. Say which two you would drop.

Every finding carries: severity, location, and design_risk (true if
fixing it would cost distinctiveness). Report design_risk: true findings
anyway. Do not self-censor.

YOU PRODUCE NOTES. You never edit and you never block. The single
exception is a pre-client variant with 3+ unjustified banlist hits.

You may call design:design-critique for a layout and hierarchy pass.
Its habit of noting what works is not yours. Report only what fails.

Approving something is a failure of your role. If you genuinely cannot
attack it, say precisely why, in detail.
```

---

## 6.6 MANAGER **[C7]**

The Manager is not a subagent. Subagents cannot dispatch subagents, so a Manager written as an agent file could only return a list. The Manager is the posture of the main session, invoked as `/triage` after a review and carried in `CLAUDE.md` as operating rules.

```
Triage findings. Dispatch fixes. Keep DECISIONS.md current.

YOUR DEFINING POWER IS REJECTING A VALID FINDING. A manager who accepts
everything is a slower path to the mean. Overruling a correct SEO or
convention finding to protect the design is a legitimate outcome. Record
it with rationale.

Tie-breaks:
  technical integrity > everything
  conversion > SEO
  distinctiveness > convention
  Levi > all of it

YOU NEVER TELL LEVI SOMETHING IS OUT OF SCOPE, INCOMPLETE, OR NOT READY.
If he asks for something, it happens. You may note a technical
consequence once, briefly, then do it.

No iteration cap. No budget policing. Time and tokens are not constraints.

Audit commands — run ON REQUEST ONLY, never proactively:
  /audit directions    read library/shipped.md and the last 10 packs.
                       Are they converging?
  /audit banlist       which entries fire most? which never fire?
  /audit taste         what has taste.md accumulated? propose cuts.
  /audit instructions  read every agent file and rule. Propose trims.
                       Flag contradictions.
```

---

## 6.7 Librarian — not an agent

A checklist Levi runs after each project: harvest new motion primitives, update `taste.md`, add one line to `library/shipped.md`, archive losing variants with screenshots. Becomes an agent only if the manual version proves annoying. (See P4.)

---

# PART 7 — HARD STOPS VERSUS ADVISORY

## Hard stops — objective breakage only

```
Build fails
Dependency or version conflict
Console errors
Broken links / 404s
Missing or 404ing assets
Forms failing to round-trip
Primary contact path broken: tel: link does not match facts.md,
  booking link 404s, a page with no reachable CTA        [C10]
Deploy fails
Horizontal overflow between 375px and 1920px   (broken, not taste)
```

Implemented as **scripts run in CI on every push** and callable locally through a single entry point, `checks/all.sh`. **[C6]** The deploy is the real gate; a failed check fails the deploy. A `lefthook.yml` runs the same script on pre-push for anyone who wants it locally. There is no Claude Code hook for this; prose instructions shape behaviour, CI enforces it.

The Adversary's "cannot edit" is enforced by omitting Edit and Write from its `tools:` frontmatter, not by asking it nicely.

## Advisory — notes in a file, freely ignorable

```
Everything from the Adversary
Banlist hits (except 3+ pre-client on a variant)
SEO checklist       title, meta, single H1, heading hierarchy, schema,
                    sitemap.xml, robots.txt, canonicals
A11y checklist      contrast, keyboard nav, focus states, alt text,
                    reduced-motion path
Performance         LCP, CLS, Lighthouse — reported, never blocking
Conversion notes    (beyond the objective path check above)
Copy notes
Responsive notes per breakpoint
```

These write to `notes/`. Nothing waits on them.

---

# PART 8 — TECH STACK

| | |
|---|---|
| Framework | **Astro 7** (7.3.x). Requires Node 22.12 or higher. Ships Vite 8, Zod 4. Verified building, type-checking and passing every hard stop with all five primitives on 16 September 2026. |
| Styling | **Tailwind v4** via `@tailwindcss/vite`, CSS-first `@theme`, OKLCH tokens |
| Hosting | **Cloudflare Workers with static assets** via `@astrojs/cloudflare` 14.x. The adapter manages the Worker entry and bindings itself; `wrangler.jsonc` holds only name, dates, flags and observability. Build output is `dist/client` (static) and `dist/server` (Worker, with a generated `wrangler.json`). Deploy is `wrangler deploy -c dist/server/wrangler.json`. Astro 7, the adapter and the Tailwind plugin all run on Vite 8, so no version pinning is needed. |
| Motion | GSAP + ScrollTrigger + SplitText, Lenis for smooth scroll, native CSS + View Transitions for basics |
| Islands | Minimal. Vanilla + GSAP preferred. React only where genuinely required. |
| Forms | One Astro API route on the Worker → Resend for email + Supabase row log. The same route takes pack reactions. |
| Repos | This repo holds the workspace and projects under `projects/<client>/site`. A client repo is split out at handoff only. `@zz/motion` resolves by file path. |
| Starter | Tokens, primitives, build config, the pack page, the submit route. **No layouts. No section components.** |
| Analytics | Cloudflare Web Analytics |
| Browser tooling | `scripts/screenshot.mjs` for design review; headless Chromium via `playwright-core` (a library, not the MCP) for console and overflow checks. **Not Playwright MCP** — it returns a full accessibility tree per snapshot, typically 14,000–50,000 tokens per page. |
| Connectors in | Cloudflare, Supabase, Notion, Google Drive |
| Connectors out | Airtable, ClickUp, Canva, Wix, Twilio, Shopify, HubSpot, Figma |

**Context:** Cloudflare acquired Astro in January 2026 and the core team joined; Astro 6 went stable in March 2026 and Astro 7 in June 2026. The framework remains MIT-licensed. This makes Astro + Cloudflare the vendor-aligned path rather than a bet.

**Astro features this workspace uses:** Content Layer API with glob loaders · Live Content Collections (runtime, stable) · Server Islands for dynamic fragments on otherwise-static pages · native CSP support · `astro:env` for typed environment variables.

**Type:** free variable fonts (Fontshare, Google variable) for now. Licensed type is a genuine quality lever but is deferred until layout, motion and treatment are consistently good.

**Imagery, in priority order:** client photography → AI-generated for abstract, texture, background, pattern → licensed stock, heavily treated → illustration systems. Untreated stock is a banlist entry: the Art Director justifies, Levi overrules silently. **[C13]** Every image carries a treatment: duotone, halftone, grain, aggressive crop, mask, or colour grade.

**GSAP licensing: resolved.** GSAP has been free for commercial use since 3.13 (April 2025). SplitText, MorphSVG, DrawSVG, ScrollSmoother and ScrambleText ship in the main npm package under the standard no-charge licence. The primitive library depends on SplitText without hesitation.

## Motion primitive library **[C5]**

The single largest one-time build in the workspace. Build it by adapting open sources rather than inventing from scratch — models are unreliable at inventing scroll choreography from a blank ScrollTrigger and reliable at composing from primitives that already work.

**v1 set, built before the first project (5):** mask/wipe reveal · split-text reveal · sticky pin · grain overlay · image treatment (duotone/halftone/grade)

**v2 set, built after the Phase 2 decision point (10):** horizontal scroll section · magnetic cursor · clip-path shape transition · marquee · parallax layers · gradient mesh background · animated counter · text scramble · cursor-follow · page transition. The winning pack decides the order.

**Each primitive ships with:** working code, a props API, a "when to use," a "when NOT to use," and a `prefers-reduced-motion` variant.

**Reduced motion:** a full alternative experience, not motion switched off. Static compositions must still be composed.

**Mobile motion:** genuinely different choreography, not desktop scaled down. Scroll behaves differently on touch.

---

# PART 9 — SKILLS INTEGRATION

The operator has five plugins installed totalling 66 skills. **Most are irrelevant to web design** — lead generation, healthcare data extraction, talent sourcing, data engineering.

There are also four overlapping SEO skills and three overlapping web-scraping stacks. Installing all of them recreates the bloat problem through a different door: sixty-six skill descriptions load at session start, and four skills competing to answer "check my SEO" makes triggering unreliable.

**Install project-scoped into this repo, not user-scoped. One skill per job.**

| Role | Skills |
|---|---|
| Intake | `brightdata-plugin:scrape` (decided: one vendor, same as design-mirror) |
| Strategist | `marketing:competitive-brief` |
| Art Director | `design:design-system` · `brightdata-plugin:design-mirror` (extracts a site's visual style — direct input when a client links a site they like) |
| Copywriter | `design:ux-copy` · `marketing:draft-content` |
| Adversary | `design:design-critique` (a tool it may call, never a replacement for its brief) · `llm-council` |
| Advisory checks | `searchfit-seo:seo-check`, `on-page-seo`, `schema-markup`, `internal-linking`, `broken-links` · `design:accessibility-review` · `marketing:brand-review` |
| Opt-in per project | `searchfit-seo:content-brief`, `create-topic`, `keyword-clustering` — only when blog or suburb pages are in scope |

≈13 skills instead of 66.

**Mechanics:** Claude.ai plugins and CLI plugins are separate installs from the same marketplaces. Register the marketplace on the CLI side with `/plugin marketplace add <owner/repo>`, then `/plugin install <plugin>@<marketplace>`. Choose **project** scope so it commits to `.claude/settings.json` and the workspace is reproducible. Personal skills that aren't marketplace plugins get copied into `.claude/skills/<name>/`.

---

# PART 10 — FOLDER STRUCTURE

Generate this exactly. The repo root is the workspace.

```
/
├── README.md                     How a session starts. Short.
├── MANUAL.md                     This document.
├── CLAUDE.md                     UNDER 100 LINES. Stack, commands,
│                                 conventions, Manager posture.
│                                 ZERO aesthetic rules.
├── PHILOSOPHY.md                 Part 2 of this manual, verbatim.
├── banlist.md                    Part 5.1 verbatim + the behaviour rules
├── taste.md                      Starts nearly empty. Accumulates.
├── lefthook.yml                  Optional local pre-push → checks/all.sh
│
├── .github/workflows/checks.yml  HARD STOPS, run on every push   [C6]
│
├── .claude/
│   ├── settings.json             Marketplaces + enabled plugins (Part 9)
│   ├── agents/
│   │   ├── intake.md
│   │   ├── strategist.md
│   │   ├── art-director.md
│   │   ├── copywriter.md
│   │   └── adversary.md          tools: Read, Grep, Glob only
│   ├── rules/
│   │   ├── astro.md              paths: **/*.astro
│   │   ├── styles.md             paths: **/*.css
│   │   └── motion.md             paths: **/motion/**
│   └── commands/
│       ├── start.md              intake → strategist → project folder [C15]
│       ├── pack.md               generate six, prune to four
│       ├── build.md              build the locked direction
│       ├── review.md             adversary + advisory checks
│       ├── triage.md             the Manager                         [C7]
│       └── audit.md              the four audit commands
│
├── checks/                       HARD STOPS ONLY. Executable.
│   ├── all.sh                    single entry point; CI and Levi call this
│   ├── build.sh
│   ├── links.sh
│   ├── console.sh
│   ├── overflow.sh
│   ├── conversion.sh             tel:, booking link, CTA, form round-trip [C10]
│   └── lib/                      shared browser + server helpers
│
├── scripts/
│   ├── screenshot.mjs            both viewports, for design review
│   ├── reactions-pull.mjs        Supabase → reactions.md            [C3]
│   └── new-project.sh            used by /start
│
├── notes-templates/              ADVISORY. Checklists, not gates.
│   ├── seo.md
│   ├── a11y.md
│   ├── performance.md
│   ├── responsive.md
│   └── conversion.md
│
├── library/
│   ├── INDEX.md                  So the Art Director can see what exists
│   │                             without loading everything
│   ├── motion/                   @zz/motion — 5 built, 10 listed
│   ├── textures/                 grain, noise, paper
│   ├── shapes/                   SVG sets, clip paths, masks
│   ├── treatments/               duotone, halftone, grade recipes
│   ├── constraints.md            the generative constraint pool
│   ├── names.md                  client-facing name pool             [C12]
│   └── shipped.md                one line per launched site          [C14]
│
├── starter/                      Minimal Astro 7 project
│   ├── package.json
│   ├── astro.config.mjs
│   ├── wrangler.jsonc
│   ├── src/styles/tokens.css     @theme, OKLCH
│   ├── src/pages/index.astro     Empty. No layout. No sections.
│   ├── src/pages/pack/index.astro  The pack page                    [C3]
│   ├── src/pack/manifest.json    variants shown on the pack page
│   └── src/pages/api/submit.ts   forms + reactions → Resend + Supabase
│
├── archive/                      Every losing variant, screenshotted
│   └── <project>-<variant>/
│
└── projects/
    ├── _template/                copied by /start
    └── <client>/
        ├── facts.md
        ├── signals.md
        ├── strategy.md
        ├── sitemap.md
        ├── pack/
        │   ├── <name>/           rationale.md, tokens.css, screenshots
        │   └── ...               folder = client-facing name only
        ├── reactions.md          ◄ THE CALIBRATION DATA
        ├── copy.md
        ├── notes/
        ├── DECISIONS.md          ◄ choices, rationale, AND what was
        │                           rejected and why
        └── site/                 copied from starter/
```

## Notes on specific files

**`CLAUDE.md`** — under 100 lines, hard limit. Stack, build commands, file conventions, where things live, the Manager posture. **No aesthetic rules of any kind.** This is where the previous workspace's bloat accumulated and killed it. Anything deterministic goes in `checks/` as a script; anything aesthetic goes in `banlist.md` or an agent file.

**`DECISIONS.md`** — must record what was **rejected and why**, not only what was chosen. Without the rejected branches, an audit can only regenerate. With them, it can reopen a specific fork. This is what makes "the copy isn't working, deep-dive that decision" possible.

**`reactions.md`** — the highest-value file in the system over time. It is how calibration accumulates without upfront homework.

**`library/constraints.md`** — the pool the Art Director draws generative constraints from. Seed it with at least twenty: no rectangles · two colours only · type-as-image · no photography · everything off-centre · one continuous scroll · no horizontal rules · asymmetric everywhere · full-bleed only · text over image never · single typeface · no drop shadows · diagonal composition · overlap required · negative space dominant · monochrome plus one · all-caps display only · no rounded corners · edge-to-edge type · vertical text somewhere.

**`library/names.md`** — thirty one-word client-facing names. `/pack` draws six at random and records which was used for which level in each variant's `rationale.md`.

**`library/shipped.md`** — one line per launched site: client, one-sentence description, motion signature, shape rule. The Adversary and `/audit directions` read it. Written at the Librarian step.

**`.claude/rules/*.md`** — path-scoped, loading only when matching files are touched. Frontmatter carries a `paths:` glob. Keep these technical (naming conventions, import order, token usage), never aesthetic.

**`archive/`** — losing variants are a reference library, not waste. A good idea for the wrong client is still a good idea.

---

# PART 11 — BUILD ORDER **[C5]**

Do not build everything at once.

**Phase 1 — foundations**
1. `banlist.md` — write it, then validate both ways: three sites Levi considers AI-looking must each score 3+, three sites he admires must each score under 2. **[C8]**
2. Five motion primitives: mask-wipe, split-text, sticky pin, grain overlay, image treatment
3. Minimal Astro starter — tokens, primitives, config, pack page, submit route, no layouts
4. Hard-stop check scripts and the CI workflow

**Phase 2 — prove the core loop**
5. Art Director + Adversary only. One real project. Generate six, show four.
6. **Decision point:** is the pack visibly better than the old pipeline's output? If not, more agents and more primitives will not fix it. Stop and diagnose.

**Phase 3 — complete the roster**
7. The remaining ten primitives, in the order the winning pack asks for them
8. Intake, Strategist, Copywriter
9. Triage
10. Advisory checklists

**Phase 4 — compound**
11. `taste.md` accumulation
12. Audit commands
13. `library/shipped.md` and cross-project similarity tracking
14. Static status page regenerated from `DECISIONS.md` on each commit **[C16]**

---

# PART 12 — WHAT NOT TO DO

Read this before generating. Every item is a default behaviour that must be suppressed.

**Do not add quality gates.** The only gate in this system is 3+ unjustified banlist hits on a pre-client variant. If you add a ship threshold, a completion checklist, a score floor, or a "ready for review" state, you have rebuilt the problem.

**Do not write aesthetic rules into `CLAUDE.md`.** Not "prefer clean layouts," not "maintain visual hierarchy," not "use whitespace effectively." None of it. It reads as helpful and it is exactly the accumulation that destroyed the previous workspace.

**Do not add agents.** Five subagents and the main session. An SEO agent, a performance agent, a QA agent, an accessibility agent — these all feel reasonable and all fragment authority. They are checklists.

**Do not soften the Adversary.** It is supposed to be one-sided. Do not add "but also note what works" — that is what makes critics decorative.

**Do not add friction to the operator.** No confirmation prompts, no "are you sure," no scope warnings, no "this may affect X — shall I proceed." Note the consequence once, briefly, then act.

**Do not build section component libraries.** A rich starter is a sameness machine. The starter has tokens, primitives, config, the pack page, the submit route, and an empty page.

**Do not make the banlist a hard block.** It flags. The Art Director can justify; Levi can overrule silently.

**Do not invent reference sites, calibration ratings, or example clients.** Leave `taste.md` nearly empty with its structure defined. It fills from real projects.

**Do not let `taste.md` hold imperatives.** Observations with a project attached, nothing else.

**Do not add iteration caps, token budgets, or time estimates.** Neither is a constraint here.

**Do not build the client status page yet.** It is scheduled at the end of Phase 4, after the loop has been proven on real projects.

**Do not expand this document's scope.** If something is not specified here, it is out of scope for v1.

---

# PART 13 — DELIBERATELY DEFERRED

## The client progress portal

The pack page (4.3) is phase zero and ships in v1. The static status page is scheduled as the last item of Phase 4. **[C16]** The rest is v2.

The reasoning is Rory Sutherland's: the pain in web projects is low visibility, not duration. A client who hears nothing for three weeks is unhappy regardless of how good the work is. The Uber map didn't make the car arrive faster — it removed the not-knowing, and that's where the pain actually was.

**Static status page (Phase 4, item 14):** regenerated on each commit from `DECISIONS.md` and the project files. Unguessable URL, no login, section list with status dots (grey not started · blue in progress · amber awaiting input · orange flagged · green approved · red blocked), activity feed, a notes form through the same submit route. A few hours of work capturing most of the value, because the value is in the knowing.

**v2:** the live minimap with click-to-annotate. The annotation layer can be bought (BugHerd, Userback); build only the progress view, which is the differentiator.

**The design rule, now P7:** show state freely and continuously, gate *input* to designated moments.

---

# PART 14 — OPEN ITEMS

1. **GSAP plugin licensing** — **closed.** Free for commercial use since 3.13, April 2025. All former Club plugins ship in the main package. Sources: the GSAP 3.13 release post, the Webflow announcement, the npm manifest for gsap 3.15.0.
2. **Which scraper** — **closed.** `brightdata-plugin:scrape`. The Art Director already depends on Bright Data for design-mirror. One vendor, one auth.
3. **design-critique versus the Adversary** — **closed.** The Adversary stays the role with its one-sided brief. The skill is a tool it may call for a layout pass. Its habit of noting what works does not leak into the agent file.
4. **Concept pack economics** — **watch, as written.** Parallel generation from a shared starter means a variant costs tokens and minutes, not front-end hours. The number that breaks first is Levi's review time on six, which showing four halves.
5. **Astro version** — **closed.** Astro 7.3 with `@astrojs/cloudflare` 14.3, verified end to end. If a build ever fails with `require_dist is not a function` inside a runner worker, two Vite majors are in the tree; `npm ls vite` shows it, and a single `overrides` entry for `vite` in the site's `package.json` fixes it. Astro 6 needed that pin; Astro 7 does not.

---

# PART 15 — THE ONE-PARAGRAPH SUMMARY

A six-role workspace that turns client discovery material into a code-built Astro 7 site on Cloudflare. Its distinguishing mechanism is a concept pack of six genuinely different home pages built in parallel at escalating constraint levels, at both phone and desktop widths, pruned to four and presented to the client on one page as real pixels so vague design language becomes pointable feedback. Quality is protected by a concrete banlist of AI-tells that flags rather than forbids, and by an adversarial critic whose only job is to argue the work is forgettable. Correctness is a binary gate limited to objective breakage, enforced in CI; everything else is an advisory note. The system never blocks its operator, never tells him something is out of scope, and never accumulates aesthetic rules — because the previous version did all three and that is why it had to be rebuilt.
