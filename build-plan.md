Two things to confirm before I write any code.

## 1. `templates/landing-page/` does not exist

Confirmed by directory listing — there is no `templates/` folder anywhere under `design/_ds/`. The actual page markup lives at the top level: `design/LandingPage.dc.html`. The `_ds/naked-native-design-system-.../` folder contains only `tokens/` (colors, spacing, typography), `_ds_bundle.js` (compiled components), `_ds_manifest.json`, `_adherence.oxlintrc.json`, and `readme.md`.

This doesn't change the plan materially — I was already treating `LandingPage.dc.html` as the markup source and the DS folder as the component/token source. I'll just stop referring to a `templates/landing-page/` path that doesn't exist. No other adjustment needed unless you see one.

## 2. Proposed breakpoints (no tokens exist to derive these from — your call)

Standard three-tier scale, since nothing in the export defines one:
- **Mobile**: `<768px`
- **Tablet**: `768–1023px`
- **Desktop**: `≥1024px`

**Nav**: hamburger shows only `<768px` (mobile). Tablet and desktop keep the full inline nav as designed — this is my reading of "hamburger below the tablet breakpoint" (i.e., below where tablet starts).

**Hero** (`height:640px` in the source, `design/LandingPage.dc.html:19`):
| Breakpoint | Height | Notes |
|---|---|---|
| Desktop ≥1024px | 640px | as authored |
| Tablet 768–1023px | 520px | |
| Mobile <768px | 440px | display text drops 56px→32px, copy block goes from fixed `max-width:520px` to `100% minus padding` — at mobile viewport widths 520px alone can exceed the screen |

**Product grid** (`grid-template-columns:repeat(3,1fr)`, `design/LandingPage.dc.html:38`):
| Breakpoint | Columns | Gap |
|---|---|---|
| Desktop ≥1024px | 3 | 28px (as authored) |
| Tablet 768–1023px | 2 | 20px |
| Mobile <768px | 1 | 16px |

One more spot the same breakpoints will touch, flagging it now rather than silently deciding later: the header/hero/footer horizontal padding is a flat `48px` in the source. At mobile widths that's a lot of margin eaten on both sides — I'd drop it to `24px` at tablet and `16px` at mobile. Let me know if you'd rather keep it fixed.

Confirm these (or amend) and I'll start Stage 1.
