# Banlist

The workspace's primary quality instrument. Concrete, enumerable AI-tells. The Adversary names which are present, with location. It flags. It does not forbid.

## The list

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

## How it behaves

**It flags. It does not forbid.**

- The Adversary names each banned move present, with location, at both viewports
- The Art Director may use one with a written reason in `rationale.md`
- Levi overrules silently — no justification required, no log entry
- A variant with **three or more unjustified hits** is regenerated *before the client sees it*. This is the only gate in the entire system, and it applies to agent output, never to Levi.

## Maintenance

The list is expected to change. Entries that never fire get cut. New tells get added when they're noticed. `/audit banlist` reports which entries fire most and which never fire.

## Validation

The list is validated both ways before it is trusted:

| Test | Sites | Pass condition |
|---|---|---|
| Recall | Three sites Levi considers AI-looking | Each scores 3 or more hits |
| Precision | Three sites Levi admires | Each scores fewer than 2 hits |

An entry that fires on admired work gets sharpened or cut. Record the six URLs and their scores below when the test is run.

### Validation record

_Not yet run._
