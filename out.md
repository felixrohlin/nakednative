# Stage 2 correction: reverted the token snapping

You were right on both — checked `styles/tokens/spacing.css` and the full
`--space-*` scale is:

```
--space-1: 4px    --space-6: 32px
--space-2: 8px    --space-7: 48px
--space-3: 12px   --space-8: 64px
--space-4: 16px   --space-9: 96px
--space-5: 24px   --space-10: 128px
```

- Header vertical padding: source is **20px** (`design/LandingPage.dc.html:13`),
  equidistant between `--space-4` (16px) and `--space-5` (24px). I'd rounded down to
  16px. Reverted to the literal `20px`, comment in place, horizontal `48px` stays
  `var(--space-7)` since that's an exact match.
- Footer padding: source is **56px 48px** (`:44`), and 56px is equidistant between
  `--space-7` (48px) and `--space-8` (64px) — not "nearer to 48," that was wrong.
  I'd also flattened it to a uniform 48px, erasing the asymmetry. Reverted to
  `56px var(--space-7)` — literal vertical, token horizontal (exact match).
- Also caught the same mistake in `Input.module.css`: source is `12px 14px`, and 14px
  is equidistant between `--space-3` (12px) and `--space-4` (16px). I'd rounded up to
  16px. Reverted to `var(--space-3) 14px`.

All three now carry a comment stating the source value, which two neighboring tokens
it falls between, and that it's kept literal rather than rounded. Re-verified
`tsc`/`lint`/`build` clean and re-screenshotted — no visual regression, header/footer
are back to their authored proportions.

---

# Stage 3: Hero, BrandStory, ProductGrid, Button, ProductCard

Applied the same rule throughout: substitute a token only on an **exact** match;
anything else stays a literal with a comment. Full list of every non-exact value
below — nothing rounded silently.

## Values kept as literals (no exact token match)

| Component | Property | Source value | Falls between | Note |
|---|---|---|---|---|
| Hero `.copy` | `bottom` | 56px | `--space-7`(48)/`--space-8`(64) | equidistant |
| Hero `.copy` | `max-width` | 520px | — | no scale value in range at all |
| Hero `.eyebrow` | `font-size` | 13px | `--text-xs`(12)/`--text-sm`(14) | equidistant |
| Hero `.eyebrow` | `letter-spacing` | .2em | `--tracking-wide`(.08)/`--tracking-wider`(.16) | no match either side |
| Hero `.eyebrow` | `margin-bottom` | 14px | `--space-3`(12)/`--space-4`(16) | equidistant |
| Hero `.headline` | `font-size` | 56px | `--text-3xl`(44)/`--text-4xl`(60) | no match |
| Hero `.headline` | `margin-bottom` | 20px | `--space-4`(16)/`--space-5`(24) | equidistant |
| Hero `.description` | `font-size` | 17px | `--text-base`(16) | off by 1, not exact |
| Hero `.description` | `line-height` | 1.5 | `--leading-normal`(1.55) | not exact |
| Hero `.description` | `margin-bottom` | 28px | `--space-5`(24)/`--space-6`(32) | equidistant |
| Hero `.hero` | `height` (640px) | — | — | element height, not a spacing/gap value — not the kind of thing `--space-*` covers regardless |
| BrandStory `.section` | `padding` (vertical) | 88px | `--space-8`(64)/`--space-9`(96) | **not equidistant** (off by 24/8) but still no exact match — kept literal rather than rounded to the closer one |
| BrandStory `.section` | `max-width` | 720px | — | no scale value in range |
| BrandStory `.heading` | `margin-bottom` | 20px | `--space-4`(16)/`--space-5`(24) | equidistant (same value as Hero's) |
| BrandStory `.body` | `font-size` | 17px | `--text-base`(16) | off by 1 |
| BrandStory `.body` | `line-height` | 1.6 | `--leading-normal`(1.55) | not exact |
| ProductGrid `.header` | `margin-bottom` | 28px | `--space-5`(24)/`--space-6`(32) | equidistant |
| ProductGrid `.title` | `font-size` | 28px | `--text-xl`(24)/`--text-2xl`(32) | equidistant |
| ProductGrid `.eyebrow` | `font-size` | 13px | `--text-xs`(12)/`--text-sm`(14) | equidistant |
| ProductGrid `.eyebrow` | `letter-spacing` | .1em | `--tracking-wide`(.08)/`--tracking-wider`(.16) | no match either side |
| ProductGrid `.grid` (desktop) | `gap` | 28px | `--space-5`(24)/`--space-6`(32) | equidistant |
| ProductCard `.row` | `margin-top` | 10px | `--space-2`(8)/`--space-3`(12) | equidistant |
| ProductCard `.colorway` | `margin-top` | 2px | below `--space-1`(4) | no smaller token |
| Button | `letter-spacing` | .04em | `--tracking-wide`(.08)/`--tracking-wider`(.16) | no match either side |

**Pattern worth flagging**: `28px` recurs four times (Hero description margin,
BrandStory heading margin, ProductGrid header margin, ProductGrid desktop gap) and
`20px`/`13px` twice each — reads like the original design used an informal spacing
unit that never made it into `spacing.css`'s token scale. Not something I changed,
just noting the scale may be worth revisiting if this pattern keeps showing up.

**One correction to the stage-1 record**: that round's `out.md` described the mobile
product-grid side padding as "20px... matching the existing `--space-*` scale" — it
doesn't; 20px is equidistant between `--space-4` and `--space-5`, same as the header
issue you just caught. Implemented it as a literal with a comment rather than
perpetuating that description; flagging it here since I didn't relitigate the
tablet/mobile breakpoint values themselves (those were approved and unaffected by this
round's fix), just the one inaccurate claim about token-exactness inside that text.

## Values that ARE exact token matches (used as tokens)

Button's three size paddings (`8/16`, `12/24`, `16/32` — all exact), `1px` border →
`--border-w`, `.05em`... no — `600` weight → `--weight-semibold`, `1.05` line-height →
`--leading-tight`, ProductGrid's desktop section padding (`48/96` → `--space-7`/
`--space-9`, both exact), tablet contraction (`32/64` → `--space-6`/`--space-8`),
mobile grid gap (`24` → `--space-5`) and tablet grid gap (`32` → `--space-6`),
BrandStory heading `32px` → `--text-2xl`.

## A gap the token layer itself had, not a rounding call

Porting `Button.jsx`'s `primary`/`secondary` variants hit a real gap: the DS source
writes `background: var(--nn-navy-900)` and a hover shade `var(--nn-navy-700)`
directly — fine inside the DS's own bundle, but this app's lint rule (the one
hardened before stage 2) bans raw primitives in any file but `colors.css`. `navy-900`
already has two semantic aliases (`--text-primary`, `--surface-inverse`), but
`navy-700` — the hover shade — had **no semantic token at all**. Added one:

```css
--surface-inverse-hover: var(--nn-navy-700);
```

in `styles/tokens/colors.css`, following the naming convention already established by
`--accent-primary-hover`/`--accent-secondary-hover`. This isn't a rounding call, it's
filling in a real omission in the semantic layer — flagging it since it's a token-file
change you didn't explicitly ask for, done because there was no other lint-compliant
way to port the component's documented hover state faithfully.

## What was built

- `components/ui/Button.tsx` + `.module.css` — variants primary/secondary/accent/ghost
  × sizes sm/md/lg, ported from `Button.jsx`
- `components/commerce/ProductCard.tsx` + `.module.css` — image/name/colorway/price
  tile, hover zoom via CSS (`transform: scale(1.04)` on the DS's own hover trigger,
  moved from JS `useState` to a plain `:hover` selector since no other interactivity
  is needed)
- `components/sections/Hero.tsx`, `BrandStory.tsx`, `ProductGrid.tsx` + `.module.css`
  each — composed per `design/LandingPage.dc.html`, using the approved responsive
  rules from the stage-1 round (hero clamp, grid column/gap steps at `--bp-tablet`/
  `--bp-mobile`)
- `public/images/hero/photo-lifestyle-mountain.jpg`,
  `public/images/products/product-poncho-{green-front,grey-side,navy-side}.jpg` —
  copied from `design/assets/`; the 1200/2400 pre-cuts stay unreferenced per the
  approved Vercel/`next/image` decision. Next's **default** `deviceSizes` already caps
  at 3840 (`[640,750,828,1080,1200,1920,2048,3840]`), so no `next.config.ts` override
  was needed to satisfy "don't include 5184."
- `app/page.tsx` now composes `SiteHeader` → `Hero` → `BrandStory` → `ProductGrid` →
  `SiteFooter` — the full landing page.

## Two lint false-positives hit while wiring this up, both fixed

1. My own explanatory CSS comment in `Button.module.css` said "raw `var(--nn-navy-
   900/700)`" — `check-token-usage.mjs` scans `.css` files line-by-line with a plain
   regex, not a real CSS parser, so it doesn't distinguish comments from rules and
   flagged its own explanation. Reworded to describe the primitive without spelling
   out `var(--nn-`.
2. `ProductCard`'s `next/image` `sizes` attribute (`"(max-width: 599px) 100vw, ..."`)
   tripped the raw-px rule — 599/960 mirror `--bp-mobile`/`--bp-tablet`, but the HTML
   `sizes` attribute has no `var()` support, so the literal has to be there. Same
   situation as every CSS `@media` query in this codebase; suppressed with
   `eslint-disable-next-line` and a comment pointing at the breakpoint tokens, rather
   than silently rounding or ignoring the warning.

## Verified before stopping

- `npx tsc --noEmit` — clean
- `npm run lint` — clean (both ESLint and the CSS scanner)
- `npm run build` — compiles, prerenders `/`, prebuild gate runs first
- Full page screenshotted at 1280px (desktop: 3-col grid, inline nav), 800px (tablet:
  2-col grid, hamburger), 375px (mobile: 1-col grid, hamburger, stacked footer) — no
  console errors at any width, hero/grid/footer all render as expected, hover-zoom and
  Button hover states visually confirmed

## Not done

- No cart/checkout logic, no real nav/footer-link destinations (unresolved since the
  original plan, unchanged this round)
- `Card`, `Tag`, `Badge`, `Select`, `Checkbox` — out of scope per the approved
  Button/ProductCard/Input-only port list

Stopping here — this is the full landing page, all three approved stages complete.
