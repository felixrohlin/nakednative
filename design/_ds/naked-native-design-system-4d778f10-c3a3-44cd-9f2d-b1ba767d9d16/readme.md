# Naked Native Design System

Naked Native is a surf / golf / climbing / nature lifestyle brand and community with Nordic roots. It sells fair-trade, ethically-produced apparel (its hero product is a hand-loomed hooded poncho) and speaks to an outdoor, conservation-minded audience — "brought to you by Scandinavian frothers."

**Sources provided (all local uploads, no Figma/codebase attached):**
- `uploads/NakedNative font.pdf` — vector logotype specimen ("NAKED NATIVE")
- `uploads/NN-circle-logo.pdf` — vector circular brand mark
- `uploads/IMG_9925-1.jpg`, `uploads/Copy of DSC02167-1.jpg`, `uploads/IMG_8525.jpg`, `uploads/IMG_0109.JPG` — lifestyle photography
- `uploads/green-poncho-front.jpg`, `uploads/grey-poncho-side.jpg`, `uploads/navy-poncho-side.jpg` — studio product shots of the poncho, 3 colorways
- `uploads/poncho_tag_web.jpg` — macro shot of the leather hangtag (source of truth for the circular mark)

No design system, style guide, or codebase was attached beyond these images — every token, font pairing, and component below was derived from this material, not copied from an existing system.

## Index
- `styles.css` — global stylesheet entry (imports everything in `tokens/`)
- `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css` — design tokens
- `assets/` — logo mark, wordmark, product photography, lifestyle photography
- `guidelines/` — foundation specimen cards (Brand, Colors, Type, Spacing groups in the Design System tab)
- `components/core/` — Button, Tag, Badge, Card
- `components/forms/` — Input, Select, Checkbox
- `components/commerce/` — ProductCard (intentional addition, see below)
- `templates/landing-page/` — full homepage template (hero, brand story, product grid, footer)
- `SKILL.md` — portable skill file for use in Claude Code

## Components
- **Button** — `components/core/Button.jsx` — primary / secondary / accent / ghost, 3 sizes
- **Tag** — `components/core/Tag.jsx` — pill label, 4 tones
- **Badge** — `components/core/Tag.jsx` — numeric count badge
- **Card** — `components/core/Card.jsx` — generic image + eyebrow + title card
- **Input** — `components/forms/Input.jsx` — labeled text field
- **Select** — `components/forms/Input.jsx` — labeled select
- **Checkbox** — `components/forms/Input.jsx` — labeled checkbox
- **ProductCard** — `components/commerce/ProductCard.jsx` — PLP grid tile: image, name, colorway, price

*Intentional addition:* no source codebase or Figma defined a component inventory, so this is a standard starter set sized to the product photography we have (Button/Tag/Card/Input family + one commerce-specific ProductCard) — not a copy of an existing system.

## Content fundamentals
**Voice:** first-person-plural ("we"), speaks to the reader as part of the community rather than a customer — "Brought to you by Scandinavian frothers." Confident, unpretentious, mission-forward. Short declarative sentences mixed with one longer values statement.

**Casing:** sentence case for body copy and headlines; wide-tracked ALL CAPS for nav labels, eyebrows, and tags (matches the wordmark's own uppercase treatment). The wordmark itself is always set in caps with the custom triangular "A."

**Examples straight from the brief:**
- "Naked Native is a lifestyle brand that stems from Nordic roots with an ingrained impulse for adventure and surf exploration."
- "Our products embody our mission for sustainability, creativity and conservation."
- "Inspired by our native heritage, NN brings you quality goods sewn from an ethical thread."
- "We are committed to transparent supply chains and grass root social development for a new way of doing business."
- "Brought to you by Scandinavian frothers"

**Emoji:** none observed or used — the tone is earned through photography and plainspoken copy, not decoration.

**Vibe:** earned, outdoorsy, quietly proud of the supply chain — a brand that talks about making things right more than it talks about style.

## Visual foundations
**Color:** an ink-and-sand palette pulled directly from the product and photography — deep navy-charcoal (`--nn-navy-900`, sampled from the navy poncho colorway and dusk mountain light) for text and dark surfaces; warm sand/cream (`--nn-sand-50/100`) for page backgrounds, sampled from the leather tag and beach sand; heather charcoal-grey (`--nn-charcoal-600`) from the grey poncho colorway; leather tan (`--nn-tan-500/700`) sampled from the hangtag itself, used as the primary accent/CTA color; moss/olive green (`--nn-moss-500/700`) sampled from the poncho's green colorway and surrounding foliage, used as a secondary accent. Max two background colors in any single layout: sand (light sections) and navy (dark/footer sections).

**Type:** the brand's real logotype is a bespoke geometric display face (seen only in the two vector PDFs) whose defining trait is an "A" rendered as a bare triangle with no crossbar. That face isn't distributed as a webfont, so Jost (Google Fonts) stands in for display/heading use — the closest free geometric match to the logotype's proportions — and Work Sans carries body copy for warmth and readability at small sizes. Font substitution flagged below.

**Backgrounds:** always full-bleed photography for hero/brand moments (never illustration or pattern); flat sand or navy fields elsewhere. No gradients except a single soft dark-to-transparent scrim behind hero text for legibility. No repeating patterns, no textures, no illustration.

**Animation:** minimal — a short (120–200ms) ease-standard transition on hover states only (button background, product image zoom). No bounces, no page-load choreography; the brand's energy comes from photography, not motion.

**Hover / press states:** buttons darken (primary navy → darker navy) or fill in (secondary outline → solid navy) on hover; product images scale up ~4% on hover. No press/active-specific treatment beyond the hover state holding through click — keeps interactions calm rather than springy.

**Borders & shadows:** hairline 1px borders in a warm light grey (`--border-subtle`) separate cards and inputs from the sand background; shadows are soft, low-contrast, and rare (`--shadow-sm` on cards only) — nothing floats aggressively.

**Corner radii:** small and consistent — 2–4px on buttons, inputs, and cards. Nothing pill-shaped except true pills (tags, the numeric badge).

**Cards:** white surface on the sand page background, 1px subtle border, small radius, minimal shadow, image on top (4:3), padded content below. No colored left-border accents.

**Transparency / blur:** none in UI chrome; the only "blur" is the natural photographic depth-of-field already present in the lifestyle shots.

**Imagery color vibe:** natural daylight, slightly desaturated, cool-grey Nordic skies in the mountain/field shots and warmer golden tones in the beach shot — no heavy filters, no black-and-white, no added grain. Product studio shots are clean white-background cutouts.

## Iconography
No icon system, icon font, or SVG set was found in the source material — the brand currently communicates through photography and typography only, not iconography. Where a UI genuinely needs a functional glyph (cart, chevron, search), the design components in this system fall back to plain text/labels rather than inventing icons; if the brand wants a proper icon set later, Lucide (stroke-based, geometric, pairs well with the Jost/Work Sans pairing) is the recommended free substitute — flagged here rather than assumed. No emoji or unicode-glyph icons are used anywhere in the source material.

## Caveats — please help us iterate
1. **Custom logotype font is not distributed as a webfont.** We extracted the "NAKED NATIVE" wordmark and the circular mark as PNGs from your vector PDFs (see `assets/logo-wordmark.png` and `assets/logo-mark.png`) — these are safe to use as locked lockups, but headings/body currently use Jost and Work Sans as substitutes. If you have the real retail font files, send them and we'll wire up true `@font-face` rules.
2. **No component inventory or codebase was provided**, so the component set is a standard starter sized to what we saw in your product photography — not a copy of an existing system. Tell us what screens/components matter most (PLP, PDP, cart, journal?) and we'll expand deliberately.
3. **No icon system exists yet** — flagged above, Lucide suggested as a starting point only.
4. Only one product (the poncho, 3 colorways) was in the source material, so the landing-page template and ProductCard demo are built around it — more product photography will make the system feel less repetitive.
