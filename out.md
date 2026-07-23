# Breakpoint proposal for hero height and product grid

## Template directory check

`design/_ds/*/templates/landing-page/` does **not** exist. The only contents under
`design/_ds/naked-native-design-system-4d778f10-c3a3-44cd-9f2d-b1ba767d9d16/` are:

```
readme.md
_adherence.oxlintrc.json
_ds_manifest.json
_ds_bundle.js
styles.css
tokens/colors.css
tokens/typography.css
tokens/spacing.css
```

There is no `templates/` folder at all, landing-page or otherwise. The plan's file-structure
section (item b) drew an analogy to a `templates/landing-page/` composition layer that isn't
actually present in the export — that reference should be treated as this app's own
`/app/page.tsx` + `/components/sections` composition, not a DS-provided template to port from.
Adjusting for this: nothing changes structurally (the proposed `/sections` folder already covers
it), but no landing-page-specific markup/CSS should be assumed to exist in the DS beyond the
three token files and the compiled component bundle.

## Breakpoint tokens

No `--bp-*` tokens exist in `tokens/spacing.css` today. Adding two, consistent with the
adherence config's intent of no raw magic-number literals in component/JS code:

```css
:root{
--bp-tablet: 960px;
--bp-mobile: 599px;
}
```

**Caveat flagged, not hidden**: `_adherence.oxlintrc.json`'s `no-restricted-syntax` rule
matches JS/JSX `Literal` AST nodes — it lints `.tsx`/`.ts`, not `.css`, so it wouldn't
literally fire on a raw px inside a CSS `@media` block. More importantly, **`var()` cannot
appear inside a CSS `@media` feature value** — that's a CSS spec limitation, not a tooling
gap, and no browser resolves custom properties there. So `--bp-tablet`/`--bp-mobile` become
the single source of truth for **JS** breakpoint logic (the hamburger's `matchMedia` check,
any resize-driven behavior), while the `@media (max-width: 960px)` / `(max-width: 599px)`
rules in CSS necessarily repeat the literal. To keep the two from drifting silently, both
declarations live in the same file (`styles/tokens/breakpoints.css`) with the media queries
directly below the `:root` block and a one-line comment pointing at each other. (If strict
single-source enforcement across CSS *and* JS matters enough to justify it, `postcss-custom-media`
would let `@media (--bp-tablet)` consume the same declaration — that's a build-tooling addition
beyond the approved "plain CSS, no extra layers" stack, so flagging it as optional rather than doing it by default.)

## Hero height

| Breakpoint | Height | Rationale |
|---|---|---|
| Desktop (default) | `640px` | as authored |
| Tablet (≤`--bp-tablet`, 960px) | `480px` | keeps the crop's subject (60% 30% object-position) framed without excessive letterboxing on shorter viewports; side padding for the text block drops from `48px` to `--space-6` (32px) |
| Mobile (≤`--bp-mobile`, 599px) | `clamp(340px, 50vw + 180px, 480px)` | see below — one fluid rule, no flat floor |

**Fix for the broken mobile rule**: the previous `min-height:420px; height:62vw; capped at 520px`
had the vw term below the 420px floor for every width under 677px — since the mobile breakpoint
tops out at 599px, the floor was winning across the *entire* mobile range and the rule was
silently a flat `420px`. Replacing with a single `clamp()` where the preferred (middle) term is
what actually resolves across all of 320–599px, chosen so the top end (599px) lands right at the
tablet value (480px) for continuity across the breakpoint boundary, and the bottom end (320px,
the narrowest commonly-supported viewport) sits at 340px:

```css
height: clamp(340px, 50vw + 180px, 480px);
```

Computed values:

| Viewport width | `50vw + 180px` | Clamp output |
|---|---|---|
| 320px | 160 + 180 = **340px** | 340px (touches the floor exactly — by design, not a stuck flat value) |
| 390px | 195 + 180 = **375px** | 375px (fluid term is what's rendering) |
| 599px | 299.5 + 180 = **479.5px** | ≈480px (touches the ceiling exactly, matching tablet's fixed 480px) |

The middle value (390px) proves the vw term is actually engaged — unlike the old rule, this
doesn't resolve to the same number at every width in range. Headline size steps down from `56px`
to `36px` and the text block's `max-width:520px` becomes `calc(100% - 48px)` at this breakpoint,
unchanged from the original proposal.

## Product grid

| Breakpoint | Columns | Gap |
|---|---|---|
| Desktop (default) | 3 (`repeat(3,1fr)`) | `28px` |
| Tablet (≤`--bp-tablet`, 960px) | 2 (`repeat(2,1fr)`) | `--space-6` (32px) |
| Mobile (≤`--bp-mobile`, 599px) | 1 (`repeat(1,1fr)`) | `--space-5` (24px) |

Section side padding (`0 48px 96px` in source) steps down to `0 32px 64px` at tablet and
`0 20px 48px` at mobile, matching the nav/hero padding contraction and existing `--space-*`
scale rather than introducing new arbitrary values.

## Nav / hamburger breakpoint

**Recommendation: move the hamburger switch to `--bp-tablet` (960px), not to 767px.**

The original "hamburger below tablet" decision left the actual pixel number unstated, and a
768px default crept in — which matches neither of the two breakpoints this layout actually
uses (960 / 599). Two ways to fix the mismatch were on the table:

1. **Hamburger at 960px** — nav collapses at the exact moment the grid stops being 3-column.
2. **Mobile breakpoint moved to 767px** — keeps hamburger at 768px, but introduces a third
   breakpoint value (768) that only the mobile boundary would use, while hero/grid still
   switch at 599/960 — i.e., tablet range becomes 600–767 for hero/grid but 768–960 shows a
   full nav, splitting tablet into two visually-inconsistent sub-ranges.

Going with (1): it collapses the layout to **two** breakpoints total instead of three, and
gives a single, easy-to-state rule — "anything that isn't the full 3-column desktop layout
gets the collapsed nav." That's also the safer fit spatially: at 768–960px the header still
has to fit a wordmark + 4 nav items + cart in the same `48px`-padded bar the desktop version
uses, and now alongside a 2-column product grid rather than 3 — collapsing chrome at the same
point content reflows is the more defensible default than carrying a wide horizontal nav into
a narrower, already-denser layout. `SiteHeader`'s media query becomes
`@media (max-width: 960px)` (mirroring `--bp-tablet`), matching the grid/hero switch exactly.

**Waiting for confirmation on the hero clamp, the nav breakpoint call, and the breakpoint-token
approach before proceeding to scaffolding stage 1.**

All three approved 2026-07-23. Stage 1 complete — see below.

---

# Stage 1 summary: Next.js init, tokens, fonts, lint rule

## What was created

**App scaffold** (`create-next-app`, App Router, TypeScript, no Tailwind, root-level — not
`/src`), merged into the existing repo without touching `README.md`/`.gitignore`'s prior
content:
- `app/layout.tsx` — root layout, loads fonts and token CSS
- `app/page.tsx` — minimal placeholder (real sections are stage 3)
- `app/globals.css` — body/link defaults
- `next.config.ts`, `tsconfig.json` (path alias `@/*` → repo root), `eslint.config.mjs`
- `package.json` (name set to `nakednative`), `package-lock.json`

**Token CSS**, ported into `styles/tokens/`:
- `colors.css`, `spacing.css` — verbatim copies of the DS export
- `typography.css` — same values, but `--font-display`/`--font-body` now point at
  `var(--font-jost)` / `var(--font-work-sans)` (the CSS variables `next/font/google` generates)
  instead of bare `'Jost'`/`'Work Sans'` strings, and the Google Fonts `@import` line is gone
- `breakpoints.css` — **new**. Defines `--bp-tablet:960px` and `--bp-mobile:599px`, with the
  `@media (max-width: 960px)` / `(max-width: 599px)` literal forms documented directly below in
  a comment, since `var()` can't be read inside an `@media` feature value — flagged and agreed
  in the prior round.
- `styles/tokens.css` — barrel file importing all four, in place of the DS's own `styles.css`
  import list (colors → typography → spacing → breakpoints)

**Fonts**: `app/layout.tsx` loads `Jost` (weights 400/500/600/700) and `Work_Sans` (weights
400/500/600) via `next/font/google`, self-hosted, each exposing a `variable` (`--font-jost`,
`--font-work-sans`) applied via `className` on `<html>`. No runtime request to Google's CDN —
resolves the GDPR/performance concern from the earlier plan.

**Lint rule for `var(--nn-` outside the token file** — implemented, but not where originally
planned. Two things surfaced while wiring it up:

1. `_adherence.oxlintrc.json`'s `no-restricted-syntax` rule (the one the plan proposed
   extending) turned out to **not be a runnable oxlint config** — real `oxlint` doesn't
   implement `no-restricted-syntax` at all (`Rule 'no-restricted-syntax' not found in plugin
   'eslint'`, confirmed by actually running it). That file is AST-selector metadata shaped like
   an oxlint config, probably consumed by whatever internal tool the `x-omelette` key belongs
   to — not something `npx oxlint` can execute. Installed real `oxlint`, hit this immediately,
   and removed it again rather than ship a lint step that silently never runs.
2. The rule now lives in `eslint.config.mjs` (ESLint natively supports `no-restricted-syntax`
   with esquery selectors), carrying forward the hex-color and raw-px bans from the DS's
   original intent alongside the new one:
   `Literal[value=/var\(--nn-/]` → warns on any raw primitive-token reference outside JS/JSX.
   Verified live: a test file with `style={{ color: "var(--nn-tan-500)" }}` triggers the
   warning; removed after confirming.
3. ESLint only parses JS/TS/JSX, so it can't see `.css` files — and this app's styling is plain
   CSS Modules, where `var(--nn-...)` is actually most likely to show up. Added
   `scripts/check-token-usage.mjs`, a small dependency-free script that walks `styles/`, `app/`,
   `components/` for `.css` files (excluding `styles/tokens/colors.css`, the one place `--nn-*`
   may legitimately appear) and fails with file:line output on any match. Verified live with a
   planted `var(--nn-tan-500)` in a throwaway CSS file — caught it, exit code 1. Wired into
   `npm run lint` as `eslint && node scripts/check-token-usage.mjs`.
4. `app/globals.css`'s anchor colors were adjusted from the DS's literal
   `a{color:var(--nn-tan-700)}` / `a:hover{color:var(--nn-tan-500)}` to the semantic equivalents
   already defined in `colors.css` — `var(--accent-primary-hover)` / `var(--accent-primary)` —
   since those tokens exist for exactly this purpose and a verbatim port would have tripped the
   rule just added. Values are unchanged (`--accent-primary-hover` *is* `--nn-tan-700`), so this
   is not a visual change, just routing through the semantic layer.
5. Component-level prop-shape rules (the `<Button>`/`<Card>`/`<Tag>` selectors in the DS's
   adherence file) were **not** ported — those components don't exist in this app yet, and
   porting rules for JSX that isn't written yet would be dead config. Deferred to stage 2, to be
   added alongside `Button`/`ProductCard`/`Input` as they're built (scope already limits this app
   to those three; `Card`/`Tag`/`Select`/`Checkbox` rules won't be needed at all).

**Other adjustments made along the way**:
- `eslint.config.mjs` excludes `design/**` — it was linting the vendor DS export itself
  (`_ds_bundle.js`, `support.js`) and surfacing unrelated errors there (deprecated
  `ReactDOM.render`, a `module` variable assignment) that have nothing to do with this app.
- `.gitignore` merged: kept the existing `plan.md`/`prompt.txt` exclusions, added the full
  Next.js-standard ignore list (`.next/`, `node_modules/`, `.vercel`, `*.tsbuildinfo`,
  `next-env.d.ts`, etc.) that `create-next-app` normally generates.

## Verified before stopping

- `npx tsc --noEmit` — clean
- `npm run build` — compiles and prerenders `/` successfully (Turbopack, Next 16.2.11)
- `npm run dev` — served `/`, confirmed via curl: fonts preloaded as `.woff2` with the
  `jost_...__variable`/`work_sans_...__variable` classes on `<html>`, and the compiled CSS
  chunk contains `--nn-tan-500:#b98358`, `--font-display:var(--font-jost), sans-serif`, and
  `--bp-tablet:960px` — token/font/breakpoint wiring all reach the browser
- `npm run lint` — clean on real app code; both new checks (ESLint selector, CSS scanner)
  independently verified to fire on planted violations, then reverted

## Not done (by design, later stages)

- No `SiteHeader`/`SiteFooter`/`Hero`/`BrandStory`/`ProductGrid` — stage 2/3
- No `Button`/`ProductCard`/`Input` ports, so no component-scoped lint rules yet
- `components/` doesn't exist yet — `scripts/check-token-usage.mjs` already scans for it
  (harmless no-op today, ready once stage 2 adds the directory)

Stopping here per instructions. Ready for go-ahead on stage 2 (layout components:
`SiteHeader` with hamburger, `SiteFooter`).
