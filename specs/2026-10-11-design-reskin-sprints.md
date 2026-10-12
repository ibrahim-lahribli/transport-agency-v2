# Design re-skin (agency-design-v2) — Sprint Plan (refined)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan sprint-by-sprint. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Execute the design re-skin from
[2026-10-11-design-reskin.md](2026-10-11-design-reskin.md) as ten small,
independently shippable sprints that keep the parent plan's decisions intact
while removing the heavy, multi-theme sprints that made the original seven-sprint
breakdown complex to execute.

**Architecture:** Identical to the parent plan — re-point semantic Tailwind
tokens to the design palette so existing markup re-skins for free, then rebuild
surfaces and add the design's missing patterns on top. The parent plan's
**Global Constraints** and **Review Focus** apply to every sprint without
repetition; read them before starting.

**Tech Stack:** Next.js 16 (App Router, static), React 19, next-intl (en/fr),
Tailwind CSS v4, `next/font/google` (Playfair Display + DM Sans). No new npm
dependencies.

**Spec:** [2026-10-11-design-reskin.md](2026-10-11-design-reskin.md)
(implements); visual source of truth: `C:\projects\design\agency-design-v2`
(external Figma export — visuals only, its copy/prices/photos are placeholders).

## Sprint rules

- Every sprint ends with the tree green: `pnpm lint → pnpm typecheck →
  pnpm test → pnpm build`. Add `pnpm test:e2e` whenever routes, metadata or
  i18n keys change (most sprints do); add `pnpm validate:data` when content
  changes.
- Local production builds need the documented hatch:
  `SKIP_ENV_VALIDATION=true NEXT_PUBLIC_SITE_URL=http://localhost:3100 node_modules/.bin/next build`.
- Commits: Conventional Commits, one per task (commit steps below use the
  `feat(design): …` messages the parent plan names).
- Never copy numbers, copy or contact data out of the design file. Prices and
  durations come from the shared helpers; contact data from `getContact()`.
- CSS logical properties only; RTL grep gate on changed files each sprint.
- Sprint order is fixed: later sprints consume primitives, tokens, image
  helpers and assets produced by earlier ones.

## What changed compared to the first breakdown

1. **Assets split into Sprint 2** (parent Task 5's asset half): downloading
   the design's placeholder photos locally (source URLs live in the design
   `src/App.tsx`) is independent of UI, so home styling no longer depends on
   it in the same sprint.
2. **Booking halved** (parent Task 10): Sprint 6 re-skins the form fields
   (structure, steppers, radio cards); Sprint 7 adds estimate/success state and
   the sticky mobile bar. Each is testable on its own.
3. **Home parts consolidated into Sprint 5** (parent Tasks 5–7): hero, trust
   strip, merchandising, moods/team/FAQ and closing CTA in one pass — one
   home sprint instead of three, checked in a single side-by-side review.
4. **Per sprint** the original *Definition-of-done* / *Test-process* sections
   stay, tightened so each sprint's gate is explicit.

## Progress

| Sprint | Theme | Parent tasks | Status |
|---|---|---|---|
| 1 | Design foundation | 1–2 | ✅ done (commits `f4bd616`, `79989fb`) |
| 2 | Image assets | 5 (asset half) | ✅ done (commit `a62aa2c`) |
| 3 | Site chrome | 3–4 | ✅ done (commits `b141dd3`, `968bd5b`) |
| 4 | Catalogue browsing | 8–9 | ✅ done (commits `a945dce`, `1ea44df`) |
| 5 | Home page | 5–7 | ✅ done (commit `ad7b699`) |
| 6 | Booking: form fields | 10 (part) | ☐ |
| 7 | Booking: estimate/success/mobile bar | 10 (part) | ☐ |
| 8 | Secondary pages | 11 | ☐ |
| 9 | Transfer tool | 12 | ☐ |
| 10 | System page + hardening + docs | 13–15 | ☐ |

---

## Sprint 2 — Image assets

**Implements:** the asset half of parent plan Task 5.
**Goal:** every photo the design's layouts need exists under `public/images/`
before any UI consumes it; `getServiceImage` maps service ids to files with a
safe fallback.

### Approach

- Add `src/content/images.ts` exposing `getServiceImage(id: string,
  kind: "card" | "hero" | "gallery"): string` — category-based fallback
  (excursion → coast; activity → beach; transfer → road), pure and unit-
  testable. Function stays in `src/content/` per the parent plan's file map.
- Download each image from the design `src/App.tsx` placeholder URL list
  (hero, coast, beach, boats, city, cliffs, road — 7 files) and store them
  locally under `public/images/<name>.jpg`. Add
  `public/images/services/<id>.jpg` slots for the 15 catalogue services.
- No UI consumes them yet; nothing else in the source tree changes.

### Definition of done

- [ ] The 7 design photos + 15 service slots exist under `public/images/`.
- [ ] `getServiceImage` unit-tested including the fallback path.
- [ ] No remote image URL ships in any rendered page.

### Test process

1. Write the `getServiceImage` Vitest test first (mapping + fallback); run
   `pnpm test` — red before implementation, green after.
2. Grep gate: `rg -n "images\.unsplash" src/` → zero matches.
3. `pnpm lint && pnpm typecheck && pnpm test && pnpm build` — green.
4. Commit: `feat(design): add local placeholder photos and image helper`.

---

## Sprint 3 — Site chrome

**Implements:** parent plan Phase 2 (Tasks 3–4).
**Goal:** header and footer match the design and carry only real business data.

### Approach

**Task 3 — Header**
- Modify `src/components/navigation.tsx` (Header) and
  `src/components/locale-switcher.tsx`. Signature unchanged:
  `Header({ locale, slugAlternates })`.
- Design: "AT" circular logo mark + wordmark; nav links with active underline;
  restyled locale button + menu; `ButtonLink` CTA to `/book`; client mobile
  menu (toggle) linking excursions/activities/transfers/places/guides/about/faq/
  contact. Labels reuse existing `nav.*` keys; new keys go to **both** locale
  files.

**Task 4 — Footer**
- Modify the Footer in `src/components/navigation.tsx`: ink (`#1d2823`)
  background, 4-column grid (brand + tagline, Explore links, Know-us links,
  Contact block), cream WhatsApp button. Contact values from `getContact()` —
  the design placeholders (`hello@example.com`, `wa.me/000000000`,
  `[Address placeholder]`) must not appear.

### Definition of done

- [ ] Header renders the logo mark, nav, locale menu, CTA and working mobile
      menu (open/close, focus visible, ≥44px targets).
- [ ] Footer shows real contact data only; cream-on-ink body text ≥ 7:1.
- [ ] Both locales render fully translated chrome.
- [ ] Tree green; e2e passes (chrome appears on every route).

### Test process

1. `pnpm lint && pnpm typecheck && pnpm test` — pass
   (`messages.test.ts` catches missing FR keys).
2. Build (hatch) then `pnpm test:e2e` — pass.
3. Manual: keyboard-only pass over header and footer; mobile menu at 375px;
   locale switch round-trip en ↔ fr keeps the current page.
4. Grep gate: `rg -n "wa\.me/000000000|hello@example\.com|Address placeholder" src/ messages/` → zero.
5. Commits: `feat(design): re-skin header and locale switcher`, then
   `feat(design): re-skin footer`.

---

## Sprint 4 — Catalogue browsing

**Implements:** parent plan Phase 4 (Tasks 8–9).
**Goal:** hubs and service pages wear the design without inventing a single
data field.

### Approach

**Task 8 — Hub pages**
- Modify `src/components/hub-page.tsx`: `PageIntro` (eyebrow + display H1 +
  lede) + the card grid across `/excursions`, `/activities`, `/transfers`.
  Design filter chips render **only** as real links or are omitted — no fake
  affordances.

**Task 9 — Service detail page**
- Modify `src/app/[locale]/[slug]/page.tsx` + messages: breadcrumbs with
  `aria-current`; gallery (2fr/1fr) via `getServiceImage(id, "gallery")`; fact
  tiles fed only by fields that exist on `Service` (duration via helpers,
  pickup, group size — omit tiles rather than invent); accordions from real
  content sections via `Accordion`; sticky booking card (price from
  `getServiceDisplayPrice`, link `/book?service=<id>` — **id, not slug**,
  trust lines with type-correct cancellation wording); "You might also like"
  grid from the same category.

### Definition of done

- [ ] All three hubs and every service page render the new layout at 375px and
      desktop, in both locales.
- [ ] Fact tiles show only real fields; missing data ⇒ tile absent, never
      placeholder text.
- [ ] "Book this"/booking-card links are `/book?service=<id>` with the service
      **id**.
- [ ] Breadcrumbs expose `aria-current`; one `<h1>` per page preserved.
- [ ] Metadata/JSON-LD output unchanged in structure (e2e + sitemap green).

### Test process

1. `pnpm lint && pnpm typecheck && pnpm test && pnpm validate:data` — pass.
2. Build (hatch) then `pnpm test:e2e` — pass (routes/metadata touched).
3. Grep the built output:
   `rg -n "Rating placeholder|\[Address|wa\.me/000000000|Photo placeholder" .next/server` → zero
   (sample: home + one hub + one service page HTML).
4. Manual: keyboard pass on breadcrumbs + accordions; sticky booking card
   scroll behavior at desktop; spot-check 5 service pages' prices against
   `content/`.
5. Commits: `feat(design): re-skin hub pages`, then
   `feat(design): re-skin service detail page`.

---

## Sprint 5 — Home page

**Implements:** parent plan Phase 3 (Tasks 5–7).
**Goal:** the home page becomes a photo-led showcase matching the design,
fed by real catalogue data and riding on Sprint 2's assets and helper.

### Approach

- Modify `src/app/[locale]/page.tsx` + `messages/{en,fr}.json`:
  - Full-bleed hero (image + directional overlay + `text-display` H1 +
    button row).
  - Trust strip (4 facts; cancellation wording must be type-correct or
    hour-count-free — never a blanket "24h").
  - **Task 6 — Home merchandising.** Modify
    `src/components/service-card.tsx` → the design trip card: 3:2 image,
    `Tag`, clamped title, facts row from real content fields, price footer
    via `getServiceDisplayPrice` + "View trip" link. Signature unchanged:
    `ServiceCard({ service, locale })`. Home sections: the three category
    sections keep their data flow; transfer feature band uses real transfer
    services (prices from helpers); dark "Plan now. Pay later." band with
    01/02/03 steps.
  - **Task 7 — Moods, team, FAQ preview.** "Choose a mood" photo grid
    (mobile: scroll-snap carousel with dots) linking to real hubs; team
    feature band (portrait placeholder + ArrowLink to `/about`); FAQ preview
    via the `Accordion` primitive using **existing** FAQ keys (answers
    untouched — pinned by `messages.test.ts`).
  - Terracotta closing CTA band.

### Definition of done

- [ ] Home matches the design section-by-section at 375px and desktop.
- [ ] Every price shown renders from `getServiceDisplayPrice`; no literal amounts.
- [ ] `getServiceImage` wired through every home container.
- [ ] No placeholder strings anywhere (grep gate below).
- [ ] Cancellation wording is type-correct; `messages.test.ts` byte-identical
      on pinned copy.
- [ ] FR home fully translated; mobile carousel snaps; tree green.

### Test process

1. `pnpm lint && pnpm typecheck && pnpm test && pnpm validate:data` — pass.
2. Build (hatch) then `pnpm test:e2e` — pass (home metadata/i18n touched).
3. Grep gate on source:
   `rg -n "Rating placeholder|Photo placeholder|wa\.me/000000000|\[[A-Z][a-z]+ placeholder\]" src/ messages/ content/` → zero.
4. Manual: home in en and fr at 375px + desktop; hero contrast (text over
   overlay ≥ 4.5:1); carousel swipe + dots; FAQ accordion keyboard operable.
5. Commits: `feat(design): re-skin home page around the design hero`, then
   `feat(design): re-skin home merchandising`, then
   `feat(design): moods, team and FAQ sections on home`.

---

## Sprint 6 — Booking: the form fields

**Implements:** parent plan Phase 5 Task 10, structure part.
**Goal:** the booking form wears the design's field language while the server
action, quote engine and form-state safeguards stay byte-safe.

### Approach

- Modify `src/components/book-form.tsx` + messages:
  - Numbered fieldsets (01 "Choose the details", 02 "Contact details"),
    design steppers and radio cards. Which selectors appear stays driven by
    `usesTieredPricing()` (`src/pricing/quote.ts`).
  - **Keep every field controlled and the `<form>` keyed on
    `InquiryState.attempt`** (React 19 resets a form after its server action —
    never key on typed values).
- `src/booking/actions.ts` and `src/booking/selection.ts` stay untouched.

### Definition of done

- [ ] Form matches the design's sections/steppers/radio cards at 375px and
      desktop, both locales.
- [ ] Selector visibility still matches `usesTieredPricing()` for tiered,
      route-based and party-size-only services (spot-check one of each).
- [ ] Retry flow correct: invalid submit → inline errors + first invalid field
      focused; valid submit not yet blocked by anything in this sprint.
- [ ] Existing booking unit tests (`types.test.ts`, `selection` tests) green.

### Test process

1. `pnpm lint && pnpm typecheck && pnpm test` — pass (includes booking logic
   tests; nothing in `src/booking/` changes).
2. Build (hatch) then `pnpm test:e2e` — pass.
3. Manual retry-flow drill (the parent plan's Review Focus item): submit empty
   → errors; fix → submit → success (success state still the old look —
   Sprint 7's job). Repeat once with a tiered service and once with a
   transfer (route+vehicle).
4. Manual: radio cards and steppers keyboard-operable; error focus ring
   visible at 375px.
5. Commit: `feat(design): re-skin booking form fields`.

---

## Sprint 7 — Booking: estimate, success state, sticky mobile bar

**Implements:** parent plan Phase 5 Task 10, orchestration part.
**Goal:** the estimate card, success state and sticky mobile action bar land
without shipping price literals or state bugs.

### Approach

- Modify `src/components/book-form.tsx` + messages:
  - Estimate card with live totals from the quote engine (zero literals).
  - Success state: design's success mark + "what happens next" steps.
- Create `src/components/mobile-bar.tsx` (client): sticky mobile submit bar
  showing the estimated total, appearing after the intro scrolls away
  (IntersectionObserver; no set-state-in-effect bumps — derive from action
  state during render).

### Definition of done

- [ ] Estimate totals equal the quote engine for several option combinations.
- [ ] Success state renders for a valid submission in both locales.
- [ ] Mobile bar shows the right total and only submits the visible form.
- [ ] No `setState` in effects (ESLint enforces it).

### Test process

1. `pnpm lint && pnpm typecheck && pnpm test` — pass.
2. Build (hatch) then `pnpm test:e2e` — pass.
3. Manual: submit valid → success state; browser-back/reload → state
   consistent. Mobile bar appears only after the intro leaves the viewport;
   estimated total updates as adults/children/options change.
4. Commit: `feat(design): booking estimate, success state and sticky mobile bar`.

---

## Sprint 8 — Secondary pages

**Implements:** parent plan Phase 6 Task 11.
**Goal:** places, guides, about, FAQ and contact wear the design; no invented
factual content anywhere.

### Approach

- Modify `src/app/[locale]/places/page.tsx`, `places/[place]/page.tsx`,
  `guides/page.tsx`, `guides/[guide]/page.tsx`, `about/page.tsx`,
  `faq/page.tsx`, `contact/page.tsx` + messages:
  `PageIntro` everywhere; design's places grid; guide featured + row list;
  about story/team/credentials; FAQ page grid (aside + accordion); contact
  details + form. Team names, licence numbers etc. are **omitted** until the
  agency supplies them — never invented. Guide articles keep their date-based
  `lastModified` semantics (sitemap untouched).

### Definition of done

- [ ] Five secondary page areas match the design in both locales at 375px +
      desktop.
- [ ] No invented factual content (team, licences, response times) anywhere.
- [ ] Tree green including `validate:data`.

### Test process

1. `pnpm lint && pnpm typecheck && pnpm test && pnpm validate:data` — pass.
2. Build (hatch) then `pnpm test:e2e` — pass (new UI on existing routes;
   metadata unchanged).
3. Manual: contact form validation states at 375px; keyboard pass over the
   FAQ grid and places cards, both locales.
4. Spot-check guide pages keep `lastModified` semantics (sitemap untouched).
5. Commit: `feat(design): re-skin places, guides, about, faq, contact`.

---

## Sprint 9 — Transfer tool widget

**Implements:** parent plan Phase 6 Task 12.
**Goal:** the transfers hub gains the data-driven indicative-pricing widget,
backed by tested pure functions.

### Approach

- Test first: extend `src/pricing/quote.test.ts` with failing cases for the
  widget's pure indicative-total calculation (route + passengers → vehicle
  recommendation + price), driven by catalogue data.
- Create `src/components/transfer-tool.tsx` (client): `TransferTool({ routes })`
  where `routes` is server-derived from the catalogue; design widget
  (from/to/passengers selects, indicative total, "Request transfer" →
  `/book?service=<id>`), vehicle cards with selection marks, "At the airport"
  01/02/03 band. All prices flow through the tested pure functions.
- Modify `src/app/[locale]/transfers/page.tsx` to mount the widget.

### Definition of done

- [ ] Vehicle recommendation + indicative total covered by passing unit tests;
      the component contains no price literals.
- [ ] Selecting routes/passengers updates the total with no hydration errors.
- [ ] "Request transfer" links to `/book?service=<id>`.

### Test process

1. TDD: add the quote cases → `pnpm test` shows them failing → implement →
   green. (Do not weaken the assertions to pass.)
2. `pnpm lint && pnpm typecheck && pnpm test && pnpm validate:data` — pass.
3. Build (hatch) then `pnpm test:e2e` — pass.
4. Manual: widget round-trip (each route × passenger band) totals match a
   quote-engine calculation; keyboard operability of selects and vehicle
   cards at 375px.
5. Commit: `feat(design): transfer tool with data-driven indicative pricing`.

---

## Sprint 10 — System page, hardening, docs

**Implements:** parent plan Phase 6 Task 13 + Phase 7 (Tasks 14–15).
**Goal:** a living design-system reference ships, the full gate is green, and
the knowledge base matches reality.

### Approach

**Task 13 — Design-system page**
- Create `src/app/[locale]/design-system/page.tsx`: swatches with contrast
  ratios, type samples, spacing scale, buttons/fields/card/accordion states,
  sticky-bar demos. `noindex: true`; excluded from `src/app/sitemap.ts`
  (which must keep guide-only `lastModified`).

**Task 14 — Full gate and polish**
- Run the entire gate; fix e2e assertions pinned to the old look — never
  weaken assertions covering SEO, i18n or booking behavior.
- RTL grep gate (changed files): no `ml-`, `mr-`, `pl-`, `pr-`, `left-`,
  `right-`, `text-left`, `text-right`.
- Placeholder grep gate across `src/`, `messages/`, `content/` → zero.
- Visual pass: home → hub → service → book → success at 375px + desktop in en
  and fr; keyboard-only; `prefers-reduced-motion` respected.

**Task 15 — Docs alignment**
- Update `docs/architecture.md` (new components), `docs/i18n.md` (new
  namespaces/keys), `specs/roadmap.md` (mark done; note follow-ups: real
  photos, dark-mode revisit, Arabic RTL).

### Definition of done

- [ ] `/design-system` renders all tokens + component states, is `noindex`,
      and absent from `sitemap.xml`.
- [ ] `pnpm gate` passes end-to-end (lint, typecheck, test, validate, docs,
      build, e2e).
- [ ] RTL and placeholder grep gates return zero matches.
- [ ] Full visual journey matches the design in both locales; keyboard-only
      completion possible for the booking journey.
- [ ] Docs describe the shipped system (no stale palette/CSS guidance).

### Test process

1. `pnpm lint && pnpm typecheck && pnpm test && pnpm validate:data && node scripts/check-docs.mjs`
   — pass; then the build (hatch) and `pnpm test:e2e` — pass. (`pnpm gate`
   wraps all of this; individual commands preserve exit status if run
   piecemeal.)
2. Sitemap assertion: fetch/inspect `sitemap.xml` — no `/design-system` URL;
   guide URLs still carry date-based `lastModified`, others none.
3. Grep gates (RTL + placeholders) — zero matches.
4. Manual: `prefers-reduced-motion: reduce` emulation — no scroll animation,
   accordions still operable; 200% zoom without horizontal scroll at 375px.
5. Commits: `feat(design): add design-system reference page`, then
   `chore(design): gate fixes and polish`, then
   `docs: align knowledge base with the v2 design`.

---

## Acceptance criteria (whole effort)

Carried verbatim from the parent plan — the re-skin is done when:

1. Every page matches the design's visual language, verified side-by-side
   (home, hub, service, book, success).
2. Zero design-placeholder strings in shipped output (grep gate).
3. All prices/durations render from catalogue helpers; 5-service spot-check
   matches `content/`.
4. Both locales fully translated; `messages.test.ts` green; pinned copy
   unchanged.
5. Full gate green: lint, typecheck, test, validate:data, build, test:e2e.
6. 375px + desktop layouts hold; touch targets ≥ 44px; focus visible;
   light-only.
