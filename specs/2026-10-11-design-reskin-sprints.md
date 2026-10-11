# Design re-skin (agency-design-v2) — Sprint Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan sprint-by-sprint. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Execute the design re-skin from
[2026-10-11-design-reskin.md](2026-10-11-design-reskin.md) as seven
independently shippable sprints, each with task details, a definition of done
and a test process.

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
  `feat(design): …` messages from the parent plan).
- Never copy numbers, copy or contact data out of the Figma file. Prices and
  durations come from the shared helpers; contact data from `getContact()`.
- Sprint order is fixed: later sprints consume primitives, tokens and image
  helpers produced by earlier ones.

## Sprint overview

| Sprint | Theme | Parent tasks | Ships |
|---|---|---|---|
| 1 | Design foundation | 1–2 | Tokens, fonts, UI primitives |
| 2 | Site chrome | 3–4 | Header, footer |
| 3 | Home page | 5–7 | Hero, merchandising, moods/team/FAQ, image assets |
| 4 | Catalogue browsing | 8–9 | Hub pages, service detail page |
| 5 | Booking | 10 | Booking form, estimate card, sticky mobile bar |
| 6 | Secondary pages + transfer tool | 11–12 | Places/guides/about/faq/contact, transfer tool |
| 7 | System page + hardening | 13–15 | `/design-system`, full gate, docs |

---

## Sprint 1 — Design foundation

**Implements:** parent plan Phase 1 (Tasks 1–2).
**Goal:** the new identity is live at the token level: palette, typography and
shared primitives, with the docs describing the new design.

### Task details

**Task 1 — Tokens, fonts, base styles**
- Modify `src/app/globals.css`:
  - Re-point tokens: `--canvas:#f7f2e8`, `--surface:#fffdf8`,
    `--surface-muted:#ece2d1`, `--ink:#1d2823`, `--ink-muted:#5e655f`,
    `--line:#bbb4a7`, `--accent:#ad482f`, `--accent-strong:#873520`,
    `--on-accent:#ffffff`.
  - Add: `--color-olive:#4f5d45`, `--color-error:#a83232`,
    `--shadow-card:0 1rem 3rem rgb(39 35 27 / 10%)`.
  - **Delete the `prefers-color-scheme: dark` block** (light-only decision).
  - Type: h1–h3 → `font-serif`, weight 500, `line-height:1.05`,
    `letter-spacing:-0.025em`; body → DM Sans, 1rem/1.6. Clamps:
    `--text-display: clamp(2.65rem, 6.8vw, 6.8rem)`,
    `--text-2xl: clamp(2rem, 5vw, 4.5rem)`,
    `--text-xl: clamp(1.5rem, 2.5vw, 2rem)`.
- Modify `src/app/[locale]/layout.tsx`: wire `next/font/google`
  `Playfair_Display` (500, 600, italic 500) → `--font-serif`,
  `DM_Sans` (400, 500, 600) → `--font-sans`; `viewport.themeColor` → `#f7f2e8`
  single value.
- Modify `docs/conventions.md` (CSS section) and the AGENTS.md Design bullet:
  the new identity replaces the old "warm neutral + terracotta, no
  shadows/gradients" description.

**Task 2 — Shared UI primitives**
- Create `src/components/ui.tsx` (server-compatible; `Accordion` uses native
  `<details>/<summary>`, no client JS):
  - `ButtonLink({ href, variant: "primary"|"secondary"|"light"|"ghost-light", children })`
    — min-height 2.75rem, radius 0.25rem.
  - `Eyebrow({ children })` — uppercase, 0.14em tracking, accent-strong.
  - `SectionHeading({ eyebrow, title, body? })`.
  - `Tag({ children })` — pill, sand background.
  - `PageIntro({ eyebrow, title, body, compact? })`.
  - `Accordion({ items: { title, body }[], openFirst? })` — with the design's
    ± icon. CSS logical properties only.

### Definition of done

- [ ] Rendered palette equals the design hexes above on `canvas/surface/ink/accent`.
- [ ] Playfair Display renders on h1–h3; DM Sans on body; no fallback-font flash artifacts.
- [ ] No `prefers-color-scheme` block remains; `themeColor` is single-valued.
- [ ] All six primitives compile, are exportable from `@/components/ui`, and
      follow the design's eyebrow/button/accordion styling.
- [ ] `docs/conventions.md` and AGENTS.md describe the new identity.
- [ ] Tree green (lint, typecheck, test, build).

### Test process

1. `pnpm lint && pnpm typecheck && pnpm test` — all pass.
2. `SKIP_ENV_VALIDATION=true NEXT_PUBLIC_SITE_URL=http://localhost:3100 node_modules/.bin/next build` — succeeds.
3. `node scripts/check-docs.mjs` — passes after the docs edits.
4. Grep gate: `rg -n "prefers-color-scheme" src/` → zero matches.
5. Manual (dev server): home page at 375px and desktop — palette applied,
   serif headings, no dark-mode residue at any system color-scheme setting.
6. Commit: `feat(design): adopt agency-design-v2 tokens and typography`, then
   `feat(design): add shared design primitives`.

---

## Sprint 2 — Site chrome

**Implements:** parent plan Phase 2 (Tasks 3–4).
**Goal:** header and footer match the design and carry only real business data.

### Task details

**Task 3 — Header**
- Modify `src/components/navigation.tsx` (Header) and
  `src/components/locale-switcher.tsx`. Signature unchanged:
  `Header({ locale, slugAlternates })`.
- Design: "AT" circular logo mark + wordmark; nav links with active underline
  treatment; restyled locale button + menu; `ButtonLink` CTA to `/book`;
  client mobile menu (toggle) linking excursions/activities/transfers/places/
  guides/about/faq/contact. Labels reuse existing `nav.*` keys; new keys (if
  any) go to **both** `messages/en.json` and `messages/fr.json`.

**Task 4 — Footer**
- Modify the Footer in `src/components/navigation.tsx`: ink (`#1d2823`)
  background, 4-column grid (brand + tagline, Explore links, Know-us links,
  Contact block), cream WhatsApp button. Contact values from `getContact()` —
  the Figma file's placeholders (`hello@example.com`, `wa.me/000000000`,
  `[Address placeholder]`) must not appear.

### Definition of done

- [ ] Header renders the logo mark, nav, locale menu, CTA and working mobile
      menu (open/close, focus visible, ≥44px targets).
- [ ] Footer shows real contact data only; contrast of cream-on-ink text is
      comfortably above 4.5:1 (target 7:1 for body text).
- [ ] Both locales render fully translated chrome.
- [ ] Tree green; i18n change ⇒ e2e run (see below).

### Test process

1. `pnpm lint && pnpm typecheck && pnpm test` — all pass
   (`messages.test.ts` catches missing FR keys).
2. Build (hatch above) then `pnpm test:e2e` — passes (chrome appears on every
   route; nav labels in metadata-covered pages unchanged).
3. Manual: keyboard-only pass over header and footer (tab order, focus ring,
   skip link still first); mobile menu at 375px; locale switch round-trip
   en ↔ fr keeps the current page.
4. Grep gate: `rg -n "wa\.me/000000000|hello@example\.com|Address placeholder" src/ messages/` → zero.
5. Commits: `feat(design): re-skin header and locale switcher`, then
   `feat(design): re-skin footer`.

---

## Sprint 3 — Home page

**Implements:** parent plan Phase 3 (Tasks 5–7).
**Goal:** the home page is a photo-led showcase matching the design, fed by
real catalogue data and reusable image helpers.

### Task details

**Task 5 — Hero, trust strip, closing CTA + image assets**
- Create `src/content/images.ts`: `getServiceImage(id, kind: "card"|"hero"|"gallery")`
  with category-based fallback — pure and unit-testable.
- Add placeholder photos under `public/images/` (hero, coast, beach, boats,
  city, cliffs, road) and `public/images/services/<id>.jpg` slots — stored
  locally, no hotlinking.
- Modify `src/app/[locale]/page.tsx` + `messages/{en,fr}.json`: full-bleed hero
  (image + directional overlay + `text-display` H1 + button row), trust strip
  (4 facts; cancellation wording must be type-correct or hour-count-free —
  never a blanket "24h"), terracotta closing CTA band.

**Task 6 — Home merchandising**
- Modify `src/components/service-card.tsx` → the design trip card: 3:2 image,
  `Tag`, clamped title, facts row from real content fields, price footer via
  `getServiceDisplayPrice` + "View trip" link. Signature unchanged:
  `ServiceCard({ service, locale })`.
- Home sections: the three category sections keep their data flow; transfer
  feature band uses real transfer services (prices from helpers); dark
  "Plan now. Pay later." band with 01/02/03 steps.

**Task 7 — Moods, team, FAQ preview**
- "Choose a mood" photo grid (mobile: scroll-snap carousel with dots) linking
  to real hubs; team feature band (portrait placeholder + ArrowLink to
  `/about`); FAQ preview via the `Accordion` primitive using **existing** FAQ
  keys (answers untouched — pinned by `messages.test.ts`).

### Definition of done

- [ ] Home matches the design section-by-section at 375px and desktop.
- [ ] Every price shown renders from `getServiceDisplayPrice`; no literal amounts.
- [ ] `getServiceImage` unit-tested incl. fallback; images resolve locally.
- [ ] No placeholder strings anywhere (grep gate below).
- [ ] Cancellation wording is type-correct; `messages.test.ts` byte-identical
      on pinned copy.
- [ ] FR home fully translated; mobile carousel snaps; tree green.

### Test process

1. Write the `getServiceImage` Vitest test first (mapping + fallback); run
   `pnpm test` — red before implementation, green after.
2. `pnpm lint && pnpm typecheck && pnpm test && pnpm validate:data` — pass.
3. Build (hatch) then `pnpm test:e2e` — pass (home metadata/i18n touched).
4. Grep gate on source: `rg -n "Rating placeholder|Photo placeholder|wa\.me/000000000|\[[A-Z][a-z]+ placeholder\]" src/ messages/ content/` → zero.
5. Manual: home in en and fr at 375px + desktop; hero contrast (text over
   overlay ≥ 4.5:1); carousel swipe + dots; FAQ accordion keyboard operable.
6. Commits: `feat(design): hero, trust strip and closing CTA on home`, then
   `feat(design): re-skin home merchandising`, then
   `feat(design): moods, team and FAQ sections on home`.

---

## Sprint 4 — Catalogue browsing

**Implements:** parent plan Phase 4 (Tasks 8–9).
**Goal:** hubs and service pages carry the design's browsing experience without
inventing a single data field.

### Task details

**Task 8 — Hub pages**
- Modify `src/components/hub-page.tsx`: `PageIntro` (eyebrow + display H1 +
  lede) + the Sprint 3 ServiceCard grid across `/excursions`, `/activities`,
  `/transfers`. Design filter chips render **only** as real links or are
  omitted — no fake affordances.

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
   `rg -n "Rating placeholder|\[Address|wa\.me/000000000|Photo placeholder" .next/server` → zero (sample: home + one hub + one service page HTML).
4. Manual: keyboard pass on breadcrumbs + accordions; sticky booking card
   scroll behavior at desktop; spot-check 5 service pages' prices against
   `content/`.
5. Commits: `feat(design): re-skin hub pages`, then
   `feat(design): re-skin service detail page`.

---

## Sprint 5 — Booking

**Implements:** parent plan Phase 5 (Task 10).
**Goal:** the booking flow wears the design's form language while the server
action, quote engine and form-state safeguards stay byte-safe.

### Task details

**Task 10 — Booking form re-skin**
- Modify `src/components/book-form.tsx` + messages:
  - Numbered fieldsets (01 "Choose the details", 02 "Contact details"),
    design steppers and radio cards. Which selectors appear stays driven by
    `usesTieredPricing()` (`src/pricing/quote.ts`).
  - **Keep every field controlled and the `<form>` keyed on
    `InquiryState.attempt`** (React 19 resets a form after its server action —
    never key on typed values).
  - Estimate card with live totals from the quote engine (zero literals).
  - Success state: design's success mark + "what happens next" steps.
  - Create `src/components/mobile-bar.tsx` (client): sticky mobile submit bar
    showing the estimated total, appearing after the intro scrolls away
    (IntersectionObserver; no set-state-in-effect bumps — derive from action
    state during render).
- `src/booking/actions.ts` and `src/booking/selection.ts` stay untouched.

### Definition of done

- [ ] Form matches the design's sections/steppers/radio cards at 375px and
      desktop, both locales.
- [ ] Selector visibility still matches `usesTieredPricing()` for tiered,
      route-based and party-size-only services (spot-check one of each).
- [ ] Estimate totals equal the quote engine for several option combinations.
- [ ] Retry flow correct: invalid submit → inline errors + first invalid field
      focused; valid submit → success state; re-attempt → form and quote agree
      with visible fields.
- [ ] Mobile bar shows the right total and only submits the visible form.
- [ ] Existing booking unit tests (`types.test.ts`, `selection` tests) green.

### Test process

1. `pnpm lint && pnpm typecheck && pnpm test` — pass (includes booking logic
   tests; nothing in `src/booking/` changes).
2. Build (hatch) then `pnpm test:e2e` — pass.
3. Manual retry-flow drill (the parent plan's Review Focus item): submit empty
   → errors; fix → submit → success; browser-back/reload → state consistent.
   Repeat once with a tiered service and once with a transfer (route+vehicle).
4. Manual: mobile bar appears only after the intro leaves the viewport;
   estimated total updates as adults/children/options change.
5. Commit: `feat(design): re-skin booking flow with sticky mobile bar`.

---

## Sprint 6 — Secondary pages + transfer tool

**Implements:** parent plan Phase 6 (Tasks 11–12).
**Goal:** every remaining page wears the design, and the transfers hub gains the
data-driven indicative-pricing widget.

### Task details

**Task 11 — Places, guides, about, FAQ, contact**
- Modify `src/app/[locale]/places/page.tsx`, `places/[place]/page.tsx`,
  `guides/page.tsx`, `guides/[guide]/page.tsx`, `about/page.tsx`,
  `faq/page.tsx`, `contact/page.tsx` + messages:
  `PageIntro` everywhere; design's places grid; guide featured + row list;
  about story/team/credentials; FAQ page grid (aside + accordion); contact
  details + form. Team names, licence numbers etc. are **omitted** until the
  agency supplies them — never invented. Guide articles keep their date-based
  `lastModified` semantics (sitemap untouched).

**Task 12 — Transfer tool widget**
- Test first: extend `src/pricing/quote.test.ts` with failing cases for the
  widget's pure indicative-total calculation (route + passengers → vehicle
  recommendation + price), driven by catalogue data.
- Create `src/components/transfer-tool.tsx` (client): `TransferTool({ routes })`
  where `routes` is server-derived from the catalogue; design widget (from/to/
  passengers selects, indicative total, "Request transfer" →
  `/book?service=<id>`), vehicle cards with selection marks, "At the airport"
  01/02/03 band. All prices flow through the tested pure functions.

### Definition of done

- [ ] Five secondary pages match the design in both locales at 375px + desktop.
- [ ] No invented factual content (team, licences, response times) anywhere.
- [ ] Transfer tool's price/vehicle logic covered by passing unit tests; the
      component itself contains no price literals.
- [ ] Selecting routes/passengers updates the total with no hydration errors.
- [ ] Tree green including `validate:data`.

### Test process

1. TDD: add the quote cases → `pnpm test` shows them failing → implement →
   green. (Do not weaken the assertions to pass.)
2. `pnpm lint && pnpm typecheck && pnpm test && pnpm validate:data` — pass.
3. Build (hatch) then `pnpm test:e2e` — pass (new UI on existing routes;
   metadata unchanged).
4. Manual: transfer tool round-trip (each route × passenger band) totals match
   a quote-engine calculation; keyboard operability of selects and vehicle
   cards; contact form validation states at 375px.
5. Commits: `feat(design): re-skin places, guides, about, faq, contact`, then
   `feat(design): transfer tool with data-driven indicative pricing`.

---

## Sprint 7 — System page + hardening + docs

**Implements:** parent plan Phase 6 Task 13 + Phase 7 (Tasks 14–15).
**Goal:** a living design-system reference ships, the full gate is green, and
the knowledge base matches reality.

### Task details

**Task 13 — Design-system page**
- Create `src/app/[locale]/design-system/page.tsx`: swatches with contrast
  ratios, type samples, spacing scale, buttons/fields/card/accordion states,
  sticky-bar demos. `noindex: true`; excluded from `src/app/sitemap.ts` (which
  must keep guide-only `lastModified`).

**Task 14 — Full gate and polish**
- Run the entire gate; fix e2e assertions pinned to the old look — never
  weaken assertions covering SEO, i18n or booking behavior.
- RTL grep gate (changed files): no `ml-`, `mr-`, `pl-`, `pr-`, `left-`,
  `right-`, `text-left`, `text-right`.
- Placeholder grep gate across `src/`, `messages/`, `content/` (same pattern as
  Sprint 3) → zero.
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
