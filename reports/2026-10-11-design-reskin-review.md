# Design re-skin review (sprints 1–4) — findings

**Date:** 2026-10-11
**Scope:** the 13 local commits ahead of `origin/master` implementing sprints 1–4 of
[specs/2026-10-11-design-reskin-sprints.md](../specs/2026-10-11-design-reskin-sprints.md)
(design foundation `f4bd616`+`79989fb`, image assets `a62aa2c`+`66d531d`, site chrome
`b141dd3`+`968bd5b`, catalogue browsing `a945dce`+`1ea44df`, plus docs/spec commits).
**Method:** full diff vs `origin/master` read alongside surrounding code; project gate
run for real; production build served on :3100 and driven in a browser with console
captured. **No fixes applied** — findings only, per request.

## Checks run (all green)

| Command | Result |
|---|---|
| `node_modules/.bin/eslint .` | pass (exit 0) |
| `node_modules/.bin/tsc --noEmit` | pass (exit 0) |
| `node_modules/.bin/vitest run` | 85 tests / 11 files pass |
| `node scripts/validate-data.mjs` | "Content validation passed." |
| `SKIP_ENV_VALIDATION=true NEXT_PUBLIC_SITE_URL=http://localhost:3100 node_modules/.bin/next build` | pass (exit 0) |
| `PLAYWRIGHT_BASE_URL=http://localhost:3100 node_modules/.bin/playwright test` | 19/19 pass |
| Placeholder grep gate (`Rating placeholder\|Photo placeholder\|wa\.me/000000000\|\[… placeholder\]` over `src/ messages/ content/`) | 0 matches |
| RTL grep gate (physical direction utilities in `src/`) | 0 matches |

The tree is green and both sprint grep gates pass. The defects below are all invisible
to the current suite — green checks did not catch them.

---

## Defects (would fix in a follow-up)

### D1 — Hydration error (React #418) on every service page — HIGH

`Accordion` in [src/components/ui.tsx](../src/components/ui.tsx) wraps `item.body` in a
`<p>`, but every body passed by
[src/app/[locale]/[slug]/page.tsx](../src/app/[locale]/[slug]/page.tsx) is block
content: `ItineraryList` (`<ol>`), the route-legs list (`<ol>`), `IncludedLists`
(`<div>` grid of `<ul>`s), and the FAQ `<dl>`. `<p>` may not contain block elements, so
the browser's HTML parser auto-closes the `<p>` during SSR parse; client React expects
`p > ol` and finds siblings → **React error #418 (hydration mismatch) and a full client
re-render on every page with accordions**.

- Confirmed live on `http://localhost:3100/en/paradise-valley-day-trip-from-agadir`:
  console shows minified React error #418; DOM inspection shows
  `summary.nextElementSibling` is a `P` whose first child is an `OL` (only reachable
  after React's client recovery re-render).
- Fix direction: change the `<p>` wrapper in `Accordion` to a `<div>` (keep classes).

### D2 — "Minimum Group" fact tile shows the wrong data — HIGH

In [src/app/[locale]/[slug]/page.tsx](../src/app/[locale]/[slug]/page.tsx) the group
tile renders label `t("minGroup")` ("Minimum Group" / "Taille min. groupe") with value
`` `${t("defaultPickup")} · ≤ ${service.capacity.sharedMax} ${guests}` `` — e.g.
"Minimum Group: **Agadir hotels · ≤ 16 guests**" (confirmed live). The label claims a
minimum; the value shows a pickup area plus a **maximum**. Meanwhile
`capacity.min` (the actual minimum, rendered by the pre-skin page) is dropped, and the
tile only renders when `sharedMax` exists, so services with only `capacity.min` lose
the tile entirely. The `defaultPickup` fallback used to belong to the pickup tile
(pre-skin: `pickupWindow || availability || defaultPickup`); the new pickup tile omits
it and it ended up inside the group tile instead.

- Fix direction: group tile value from `capacity.min` (`${min} ${guest|guests}`), and
  restore `t("defaultPickup")` as the pickup tile's fallback.

### D3 — Transfer route price table silently dropped — HIGH (content regression)

The pre-skin page rendered `service.routes` for transfer services: every route with
`from → to`, estimated minutes, `distanceKm`, and the three vehicle prices
(`sedan`/`van`/`minibus`). The re-skinned page builds accordions from `service.itinerary`,
`service.route.legs`, included/not-included and FAQ — but **not** `service.routes`. The
three transfer pages now show only the "from" price (sedan of `routes[0]`, via
`getServiceDisplayPrice`); the van/minibus prices and additional routes exist in
`content/` (e.g. `content/en/airport-agadir.ts`) but render nowhere. Acceptance
criterion 3 ("5-service spot-check matches `content/`") fails for transfers as shipped.

- Fix direction: render `service.routes` again as a real content section / accordion
  item, prices straight from the catalogue object (vehicle labels exist as
  `booking.vehicleSedan` / `vehicleVan` / `vehicleMinibus`), plus a title key added to
  both locales.

### D4 — Duplicate JSON keys in `messages/en.json` — MEDIUM

In the `product` namespace, `readyTitle`, `readyBody` and `requestBooking` each appear
**twice** ([messages/en.json:139-146](../messages/en.json#L139-L146)). Values are
identical so behavior is unchanged (last one wins), but duplicate keys are invalid per
strict JSON, trip up tooling, and were clearly an editing accident of the sprint-4
message changes. `messages/fr.json` has no duplicates. Note `readyTitle`/`readyBody`
are currently unused (the "Ready to book" CTA band they fed was removed from the
service page) — decide whether to keep them for a future surface or delete both copies.

### D5 — Gallery shows the identical photo twice — MEDIUM (visual)

The gallery's supporting shots use `getServiceImage(`${service.id}-b`/`-c`, "gallery")`
— ids that don't exist in `SERVICE_IMAGE_IDS`, so **both** fall back to the same
category artwork. Confirmed live: the 2fr/1fr gallery shows `/images/services/<id>.jpg`
plus `/images/coast.jpg` twice (identical images side by side), which reads as a
rendering bug. Acceptable as placeholder only if made visually distinct.

- Fix direction: distinct fallback artwork per gallery slot (e.g. map `-b`/`-c` to two
  different artworks in `getServiceImage`), or drop to one support shot until real
  per-service photos exist.

### D6 — `md:row-gap-10` is a dead class — LOW

`md:row-gap-10` (hub card grid in
[src/components/hub-page.tsx](../src/components/hub-page.tsx) and the related grid in
[src/app/[locale]/[slug]/page.tsx](../src/app/[locale]/[slug]/page.tsx)) is not a
Tailwind v4 utility; it produces **zero output in the built CSS**, so the intended row
gap never applies. Fix direction: `md:gap-y-10` (or `md:[row-gap:2.5rem]`).

---

## Report-only findings (no edit proposed here)

- **R1 — Trust copy on every card may over-claim.** `ServiceCard` renders
  `common.factsPickup` ("Hotel pickup" / "Prise en charge à l'hôtel") and
  `common.factsCancellation` ("Free cancellation") on **every** service
  unconditionally. "Hotel pickup" is wrong for the airport transfers (pickup is at the
  terminal), and the row isn't derived from real content fields as Sprint 4's card
  spec says. The cancellation wording is at least hour-count-free (allowed by the
  constraints). Product/copy decision — flag to the agency before shipping.
- **R2 — Preload warnings from prefetched routes.** The console fills with
  "resource … was preloaded … but not used" for service images: React 19 hoists
  `<link rel=preload>` for images found in Link-prefetched RSC payloads (`/en`,
  `/en/excursions`), which don't render on a service page. Harmless noise today;
  revisit if it affects real-device performance budgets.
- **R3 — Testid attached by label comparison.** The quick-facts price tile attaches
  `data-testid="quick-facts-price"` by comparing `tile.label === t("fromPrice")` —
  works, but breaks silently if the label key's text is edited. A tile `kind` field
  would be robust.
- **R4 — Duplicate accordion titles are possible.** If a service ever has both
  `service.itinerary` and `service.route.legs`, two accordions share the "Itinerary"
  title. Not present in current content; note for the content schema.
- **R5 — e2e blind spots.** The suite is green despite D1–D3: no test asserts hydration
  cleanliness (console errors), the fact-tile label/value pairing, or the presence of
  the transfer route prices. Worth adding when the defects are fixed.
- **R6 — `new Date().getFullYear()` in the Footer** is evaluated at build time for
  these fully static pages; harmless (same year server/client), but the copyright year
  will age without a rebuild.

## False alarms chased (not defects)

- **Price rendering split** (booking card renders `displayPrice.amount` + "€" +
  `unitLabel`, fact tile renders `displayPrice.formatted`): both derive from the same
  `getServiceDisplayPrice` return, and `formatted` is assembled identically
  (`${amount} € / ${label}`) — no divergence, no literal amounts.
- **`getServiceImage` tests** anchor repo paths to `process.cwd()` per the AGENTS.md
  gotcha — correct as written.
- **Cancellation wording** keys off `service.cancellationPolicy` (`transfer` → 12 h
  wording, else 24 h) — type-correct per `data/source/services-report.md` §3.6; the
  pinned copy in `messages.test.ts` is untouched and green.
- **JSON-LD / metadata / sitemap** structure unchanged; `seo.spec.ts` invariants and
  the `lastmod`-only-on-guides test pass against the fresh build.
- **`register_preview` "no process with pid"**: tool-side PID visibility, not a server
  problem — the same server answered `curl` 200 and the full Playwright run.

## Bottom line

Sprints 1–4 deliver the design foundation, assets, chrome and catalogue re-skin with
green gates and clean grep gates, and the metadata/booking invariants survived intact.
But the suite's green is misleading: three real defects (D1 hydration errors on every
service page, D2 a fact tile that contradicts its own label, D3 lost transfer price
data) plus three smaller ones (D4–D6) should be fixed before Sprint 5 builds home on
the same primitives — especially D1, since `Accordion` is about to be reused by the
home FAQ preview.
