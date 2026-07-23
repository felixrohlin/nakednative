# Two pre-stage-2 fixes, then stage 2: SiteHeader, SiteFooter

## 1. Wired `check-token-usage.mjs` into the build

Confirmed via Vercel's own docs (`/docs/builds/configure-a-build`): "Vercel checks for
the `build` command in `scripts` and uses this to build the project" — since
`package.json` already has `"build": "next build"`, Vercel runs that npm script, not
the raw `next` binary directly. That means npm's lifecycle hooks apply, so a
`prebuild` script is a real, working fix — not a no-op.

Added:
```json
"prebuild": "node scripts/check-token-usage.mjs",
```

Verified both directions: planted a `var(--nn-tan-500)` in a throwaway CSS file and
confirmed `npm run build` exits 1 before `next build` ever runs; removed the plant and
confirmed a clean build passes through prebuild → `next build` → static generation.
`npm run lint` keeps its own copy of the same check (unaffected — still runs eslint
too, which prebuild deliberately doesn't duplicate).

## 2. Template-literal gap — confirmed real, closed for all four rules

Tested directly: a raw `` `var(--nn-tan-500)` `` written as the static text of a
template literal produced zero lint output, exit 0. `Literal[value=...]` only matches
string/number literal nodes; a template literal's static chunks are `TemplateElement`
nodes with a `value.raw`/`value.cooked` shape, invisible to that selector. (Literals
*nested inside* a template's `${}` slots — e.g. a ternary — were already caught, since
those are ordinary `Literal` nodes; only the template's own static text was blind.)

This isn't hypothetical: the DS's own `Input.jsx` writes its focus border as
`` `1px solid ${focus ? 'var(--focus-ring)' : 'var(--border-subtle)'}` `` — conditional
inline styles via template literal is exactly the pattern stage-3 component ports
(Button's hover states, Input's focus state) are likely to reuse, so a raw primitive
token typed into that pattern would have sailed through invisibly.

Closed it by pairing every existing `Literal[value=...]` rule with a
`TemplateElement[value.raw=...]` twin using the same regex (hex color, raw px,
`--nn-` primitive, font-family — all four, for consistency, not just the one asked
about). Verified each pairing fires on a planted template-literal violation, then
confirmed `npm run lint` is still clean on real code.

---

# Stage 2: SiteHeader, SiteFooter

## What was built

- `components/ui/Input.tsx` + `.module.css` — ported from the DS's `Input.jsx`
  (scope already limited porting to Button/ProductCard/Input; Input is what the
  footer needs). Focus-ring styling moved from the DS's JS-driven `useState` +
  template-literal border to a plain CSS `:focus` rule — simpler, and sidesteps the
  exact template-literal-conditional-style pattern flagged in fix #2 above. `"use
  client"` because it accepts an `onChange` prop for future wiring.
- `components/layout/SiteHeader.tsx` + `.module.css`
- `components/layout/SiteFooter.tsx` + `.module.css`
- `public/images/brand/logo-wordmark.png`, `logo-mark.png` — copied from
  `design/assets/` (plan.md's approved `/public/images/brand` location)
- `app/page.tsx` now composes `SiteHeader` + placeholder `main` + `SiteFooter`

## SiteHeader

- Desktop: wordmark (`next/link` to `/`) + inline nav (Shop / Journal / Our Story /
  Cart (2)) + hairline bottom border, matching `design/LandingPage.dc.html:13-18`.
- **Nav items stay non-navigating `<span>`s, same as the source markup** — this was
  already flagged as an open question in the approved plan (real destinations
  "unknown") and hasn't been resolved since, so I carried the ambiguity forward rather
  than inventing routes for pages that don't exist yet. Same treatment for the
  footer's Shipping/Returns/Contact.
- **Hamburger breakpoint: exactly `max-width: 960px`**, matching the `--bp-tablet`
  token and the already-agreed collapse point from the stage-1 round. Verified with
  Playwright: nav visible and hamburger hidden at 961px; at 960px nav hides and the
  hamburger appears — confirms the CSS `@media (max-width: 960px)` boundary lands
  exactly where intended, not one pixel off.
- Since `var()` can't resolve inside a CSS `@media` feature value (the same spec limit
  documented in `breakpoints.css`), the CSS media query repeats the literal `960px`.
  JS-side, `useEffect` reads `--bp-tablet` via `getComputedStyle` at runtime and builds
  the `matchMedia` query string from that — so the JS half never hardcodes the number
  (which also would've tripped the raw-px lint rule).
- That `matchMedia` listener does real work beyond initial paint: if the mobile menu
  is open and the viewport is resized back past 960px, it force-closes the menu.
  Verified live — opened the menu at 960px, resized to 1280px, button reverted to
  "Menu" and the panel closed.
- Hamburger toggle is text ("Menu"/"Close"), not a glyph — per the DS readme's own
  iconography guidance ("no icon system... falls back to plain text/labels rather than
  inventing icons").
- Mobile panel is `position: absolute` under the header bar (doesn't push page content
  down), with `aria-expanded`/`aria-controls` wired to the toggle button.

## SiteFooter

- Navy background / sand text, matching `design/LandingPage.dc.html:44-53` — but
  routed through the **semantic** tokens (`--surface-inverse`, `--text-inverse`) since
  the source literal (`var(--nn-navy-900)`, `var(--nn-sand-50)`) would trip the new
  primitive-token lint rule. Same substitution stage 1 already made for
  `globals.css`'s anchor colors — values are identical, this only changes which layer
  it's read through.
- Logo mark inverted via `filter: invert(1) brightness(1.6)`, same as source.
- Newsletter field uses the new `Input` component (`type="email"`, no label — matches
  source, which has no visible `<label>`, just the "Join the tribe" heading above it).
  **No submit button or form action** — matches the source markup exactly; whether
  this needs real wiring was already flagged as open in the approved plan and still
  isn't resolved, so nothing was invented here.
- Responsive: padding contracts at `--bp-tablet` (960px); at `--bp-mobile` (599px) the
  layout switches to `flex-direction: column` so mark / newsletter / links stack
  instead of relying on `flex-wrap` alone. Verified at 375px width — stacks cleanly,
  full-width email field.

## Values snapped to the token scale (flagging, not hiding)

The source's literal pixel values don't all land on `--space-*` exactly. Snapped each
to the nearest token rather than introducing new one-off values, matching how stage 1
handled the hero/grid breakpoints:
- Header vertical padding: source `20px` → `--space-4` (16px)
- Footer padding: source `56px 48px` → `--space-7` (48px) both axes (56 sits exactly
  between `--space-6`/32 and `--space-8`/64's neighbor `--space-7`/48 and
  `--space-8`/64 — nearer to 48, and uniform padding reads cleaner than a mismatched
  pair)
- Input padding: source `12px 14px` → `--space-3 --space-4` (12px 16px)

## Verified before stopping

- `npx tsc --noEmit` — clean
- `npm run lint` — clean (both the ESLint config and the CSS scanner)
- `npm run build` — compiles, prerenders `/`; also re-verified the prebuild gate fails
  the build on a planted violation and passes clean otherwise
- Playwright against `npm run dev` (headless Chromium, deps installed via
  `playwright install-deps` for this sandbox — not added to the project):
  - Desktop (1280px, 961px): full nav, no hamburger
  - 960px: hamburger appears, nav hides
  - Hamburger click opens the mobile panel; resizing back to desktop auto-closes it
  - 375px: footer stacks vertically, no console errors at any width
- No new devDependency was persisted — `playwright` was installed with `--no-save`
  purely to drive the manual browser check; `package.json`/`package-lock.json` diff is
  the single `prebuild` line.

## Not done (by design, later stages)

- No `Hero`/`BrandStory`/`ProductGrid` — stage 3
- No `Button`/`ProductCard` ports — not needed until stage 3's Hero/ProductGrid
- Nav item and footer link destinations remain unresolved (inherited ambiguity, not
  newly introduced)
- Newsletter form has no submission handling (inherited ambiguity, not newly
  introduced)

Stopping here per instructions. Ready for go-ahead on stage 3 (sections: Hero,
BrandStory, ProductGrid).
