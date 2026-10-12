# Sprint 8–9 (secondary pages re-skin + transfer tool) — review vs agency-design-v2

Scope: commits `68f4669` (Sprint 8 — places, guides, about, faq, contact)
and `6513e45` (Sprint 9 — transfer tool with data-driven indicative pricing).
Review-only pass: traces the diffs, runs the project checks, and compares the
transfers hub widget with the design export
(`C:\projects\design\agency-design-v2`, `src/index.css` + `src/App.tsx`,
`.utility-transfer`, `.transfer-tool`, `.widget-grid`, `.vehicle-grid`,
`.transfer-tool__result`). No source files were changed.

## Checks run (all against the live production output on `:3100`)

- `eslint .` — clean. `tsc --noEmit` — clean.
- `vitest run` — 92/92 (includes the 7 new `transferToolQuote` unit tests
  written first).
- `node scripts/validate-data.mjs` — passes.
- `playwright test` — 19/19 (booking + SEO suites), per the documented
  stale-server trap of killing any unrelated listener first.
- Interactive browser pass (Playwright) on `/{en,fr}/transfers` at
  375 / 768 / 1440: route change, passenger bands 2→8→12, vehicle
  select/override, keyboard operability, focus visibility, CTA href.

## Sprint 9 behaviour — verified correct

- Vehicle recommendation (seat ladder) matches the shared quote engine — form
  and widget cannot disagree, as `usesTieredPricing` guarantees on the booking
  form.
- Route 0 (city centre) at 2 passengers → 20 € "Price basis: catalogue";
  estimate-basis routes render the estimate wording. Basis string comes from
  the route object, no literals in the component.
- Vehicle override: clicking van re-quotes to 30 €, `"Recommended (by group
  size)"` badge hides while overridden, recommendation returns when the
  override is cleared.
- Route dedup: `collectToolRoutes` collapses the same `from|to` pair across the
  three transfer services; widget shows 8 distinct destinations.
- CTA books by service **id** — served HTML carries
  `/en/book?service=airport-agadir` (the booking form's contract).
- FR parity: all 10 `tool.*` keys exist in both locale files with no key-only
  drift (checked programmatically); `Total indicatif`, `véhicule`, etc. render.
- No horizontal overflow at 375 px; selects 46 px, CTA 48 px, focus outline
  2 px visible, radios keyboard-operable (Space toggles, arrow navigates).

## Design-fidelity findings (padding + responsive gaps)

Measured from live computed styles. Numbers that already match the design:
shell gutters (`calc(100% - 2rem / 4rem)`, 80rem cap at ≥48rem), widget-gutter
rhythm, select heights ~46 px vs the design's 2.75rem target, result-row
padding 20 px, fieldset top margin 32 px, caveat max-width 46rem, and the
single-column collapse below 640 px. No action needed there.

Findings, largest first:

1. **F1 — Intro text and widget are stacked full-width, not side-by-side.** The
   design's `.utility-transfer__grid` is `0.8fr 1.2fr` with the widget right of
   the intro at desktop, collapsing to `1fr` + `gap: var(--space-5)` on mobile.
   Ours mounts `<TransferTool>` full-bleed above the hub content, so at 1440 px
   the widget is ~1280 px wide instead of the design's ~680 px content column.
2. **F2 — Widget is not the design's paper card.** `.transfer-tool` in the
   design is `radius-md` + 24 px padding (mobile 16 px) on paper with `shadow`;
   ours sits directly on `bg-surface-muted`, no card wrapper, so inputs run
   edge-to-edge within the shell gutter at 375 px.
3. **F3 — Field grid ratio.** Ours `sm:grid-cols-[1fr_1.4fr_0.8fr]`; design
   `.widget-grid` is `1fr 1.2fr 1fr`. The "To" select reads wider and
   "Passengers" narrower than the template.
4. **F4 — Vehicle grid gap.** Ours `sm:grid-cols-3 gap-4` (16 px); design
   `.vehicle-grid` uses `gap: var(--space-5)` (24 px).
5. **F5 — Total row is a dark band; the design keeps it paper-on-paper.**
   Design `.transfer-tool__result`: hairline top border, no background change.
   Ours: `mt-6 bg-ink p-5 rounded-sm`. This may be an intentional house-style
   adaptation (dark bands are used elsewhere in the re-skin) — flagged, not
   auto-fixed.
6. **F6 (minor) — Intro copy.** The hub intro keeps "Private Transfers &
   Tourist Transport" while the design's compact intro over the widget uses a
   different eyebrow/heading ("Private airport transfers / A calm start…").
   Content decision only.

## One deliberate-or-accidental UX divergence (product decision wanted)

The design's widget auto-resets the vehicle selection back to the party-size
recommendation whenever passengers change (`useEffect(setVehicle(recommended))`).
Ours keeps the explicit override until the visitor changes it themselves. Both
behaviours are defensible; ours arguably respects an explicit choice better,
but it is a difference from the template worth a conscious sign-off.

## Verification traps hit during this review (environment, not code)

- `next build` / `next start` on this Windows host is currently blocked by an
  Application Control policy on `@swc/core-win32-x64-msvc`.
  (`swc.win32-x64-msvc.node` fails `dlopen`.) Fresh-build verification therefore
  used the last successful prerendered output, confirmed to contain the widget
  markup (`passengersLabel` et al. in `.next/server/app/en/transfers.html`,
  built 04:16, commit landed 04:19 same day).
- Serving that output from a scratch directory needs `public/` junctioned and
  `.env.local` copied in, or service images 404 and `/en/book` 500s on the
  business-config check — **not** site bugs; both appear only in the sandbox
  and vanish once the real folders/environments are visible. Noted here so the
  next reviewer does not chase the same ghosts.

## Recommendation to fold into Sprint 10's polish pass

- Adopt F2 (paper card) and F3 (grid ratio) — one wrapper and one class.
- Widen F4's gap to 24px if the visual QA on real hardware still notices it.
- Decide F1 (two-column intro + widget) and F5 (paper vs dark result row)
  against the actual template on a desktop window; both are visible diffs, not
  correctness issues.
- F6 is a content decision; nothing blocks shipping Sprint 9 correctness-wise.
