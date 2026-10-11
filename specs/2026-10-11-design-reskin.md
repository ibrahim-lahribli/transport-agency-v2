# Design re-skin (agency-design-v2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-skin the Agadir Tourisme site to match the Figma design exported at
`C:\projects\design\agency-design-v2`, without touching the catalogue data model,
pricing rules, SEO invariants or booking logic.

**Architecture:** The design is a single-file Figma Make SPA (`src/App.tsx`,
`src/index.css`) whose *visual language* — tokens, type, layout patterns — we port
into the existing Next.js App Router build. We keep semantic token names
(`bg-canvas`, `text-ink`, …) and re-point their values to the design palette, so
most existing markup re-skins for free; component-level work then brings layout,
new patterns (hero, mobile bar, transfer tool) and the design-system page.

**Tech Stack:** Next.js 16 (App Router, static), React 19, next-intl (en/fr),
Tailwind CSS v4 (`@theme` in `src/app/globals.css`), `next/font/google`
(Playfair Display + DM Sans — built into Next, **no new dependency**).

**Spec:** `C:\projects\design\agency-design-v2` (external Figma export; source of
truth for visuals only — its copy, prices and photos are placeholders). Decisions
confirmed with the user: local placeholder photos in `public/` keyed by service
id (no schema change), light-only palette (dark mode dropped), new design patterns
included in scope.

## Analysis summary

**Current site:** typed bilingual catalogue (`content/{en,fr}`), static pages, SEO
engine, pricing helpers, server-action booking form. Visually: warm-neutral
tokens + terracotta accent, system-sans stack (no webfont actually loaded),
max-w-5xl text-first layouts, no photography, dark mode via `prefers-color-scheme`.

**Design:** cream/sand/paper surfaces, deep-green ink, terracotta accent, olive
for trust marks; Playfair Display headings + DM Sans body; wide 80rem shell;
photo-led (hero with gradient overlay, 3:2 card images, galleries); rich pattern
set — trust strip, mood grid, trip cards, dark numbered "how it works" band,
sticky booking cards, accordions, sticky mobile action bar, transfer tool,
success page, `/design-system` component sheet. Light-only. Layout is
mobile-first with a 48rem breakpoint.

**Key gaps:** design routes differ (`/plan` vs our `/book`, `/plan/success` vs an
in-form success state, `/excursions/paradise-valley` vs flat `/{slug}`); design
copy is English-only and full of placeholders ("35 €", "Rating placeholder",
"[Address placeholder]", `wa.me/000000000`); design CSS uses physical
left/right properties (we must stay RTL-safe); the design's blanket "Free
cancellation 24h" contradicts our fixed cancellation windows (transfer 12 h,
excursion/adventure 24 h).

## Global Constraints

- Derive every price and duration from the shared helpers (`getServiceDisplayPrice`,
  `src/pricing/quote.ts`); **never** copy numbers out of the design file.
- Keep pages static; every UI copy key goes to **both** `messages/en.json` and
  `messages/fr.json`. Design copy is a starting point, translated to FR by us.
- CSS **logical properties only** (`ms/me/ps/pe`, `start/end`, `text-start/end`) —
  the design CSS is LTR-only; never paste `left/right/ml/mr`.
- Mobile-first at a **375px** baseline; touch targets ≥ 2.75rem (design `--target`).
- "Book this" links are `/book?service=<id>` (id, not slug).
- Cancellation windows are fixed: transfer 12 h, excursion/adventure 24 h
  (`data/source/services-report.md` §3.6). Never render a blanket "24h".
- React 19 resets the form after a server action: keep booking fields controlled
  and key the form on `InquiryState.attempt`, never on typed values.
- `usesTieredPricing()` decides which selectors the booking form shows — reuse it.
- Do not touch `src/proxy.ts`'s icon matcher, `sitemap.ts`'s guide-only
  `lastModified`, or the `titleAbsolute` convention.
- No new npm dependencies. `next/font/google` is fine.
- This task explicitly authorizes re-theming (normally a "keep" in AGENTS.md);
  update the docs to describe the new identity instead of the old one.

## Review Focus

1. **Placeholder leakage** — "35 €", "Rating placeholder", "[Address placeholder]",
   `wa.me/000000000`, "Photo placeholder" strings from the design must never ship.
   Pinned to Task 9/14 (grep gate + e2e text assertions).
2. **FR parity** — every new key exists in both locales; French pages must show no
   English fallback. Pinned by `src/i18n/messages.test.ts` (extend it).
3. **Cancellation copy** — any "24h" trust line must be correct per service type;
   `product.*Cancellation` and the FAQ answer stay byte-identical (pinned test).
4. **RTL safety** — re-skinned markup keeps logical properties; a future `ar`
   locale must not need a rewrite. Checked per task by review, and Task 14 runs
   a grep for physical direction utilities.
5. **Booking form state** — after submit + reset, the quote/estimate must match
   visible fields (React 19 reset gotcha). Covered by existing booking tests;
   manual retry-flow check in Task 10.

## File structure

- Modify: `src/app/globals.css` — tokens, type scale, base element styles.
- Modify: `src/app/[locale]/layout.tsx` — fonts, themeColor, body classes.
- Modify: `src/components/navigation.tsx`, `locale-switcher.tsx`, `service-card.tsx`,
  `hub-page.tsx`, `book-form.tsx`; `src/app/[locale]/page.tsx`, `[slug]/page.tsx`,
  and the places/guides/about/faq/contact pages.
- Create: `src/components/ui.tsx` (ButtonLink, Eyebrow, SectionHeading, Tag,
  PageIntro, Accordion), `src/components/mobile-bar.tsx` (client),
  `src/components/transfer-tool.tsx` (client), `src/content/images.ts`,
  `src/app/[locale]/design-system/page.tsx`, placeholder photos under `public/images/`.
- Modify: `messages/en.json`, `messages/fr.json`, `docs/conventions.md`,
  `docs/architecture.md`, `AGENTS.md` (design paragraph), e2e specs as needed.

---

## Phase 1 — Foundation

### Task 1: Design tokens, fonts, base styles

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/[locale]/layout.tsx` (font wiring, `themeColor`)
- Modify: `docs/conventions.md` (CSS section), `AGENTS.md` (Design bullet)

**Interfaces:**
- Produces: token utilities `bg-canvas|surface|surface-muted`, `text-ink|ink-muted`,
  `border-line`, `bg-accent|accent-strong`, `text-on-accent`, new `text-olive`,
  `text-error`, `bg-ink`, `font-serif`, plus scale utilities `text-display`,
  `text-2xl`, `text-xl` (clamp-based), `shadow-card`.

- [ ] **Step 1:** Re-point tokens in `globals.css`: `--canvas:#f7f2e8`,
  `--surface:#fffdf8`, `--surface-muted:#ece2d1`, `--ink:#1d2823`,
  `--ink-muted:#5e655f`, `--line:#bbb4a7`, `--accent:#ad482f`,
  `--accent-strong:#873520`, `--on-accent:#ffffff`; add `--color-olive:#4f5d45`,
  `--color-error:#a83232`, `--shadow-card:0 1rem 3rem rgb(39 35 27 / 10%)`.
  **Delete the `prefers-color-scheme: dark` block** (light-only decision).
- [ ] **Step 2:** Wire fonts in `layout.tsx` with `next/font/google`:
  `Playfair_Display` (weights 500, 600, italic 500) → `--font-serif`,
  `DM_Sans` (400, 500, 600) → `--font-sans`. In `globals.css` set h1–h3 to
  `font-serif`, weight 500, `line-height:1.05`, `letter-spacing:-0.025em`;
  body to DM Sans, 1rem/1.6. Add clamp scales from the design:
  `--text-display: clamp(2.65rem, 6.8vw, 6.8rem)`, `--text-2xl: clamp(2rem, 5vw, 4.5rem)`,
  `--text-xl: clamp(1.5rem, 2.5vw, 2rem)`.
- [ ] **Step 3:** Update `viewport.themeColor` to `#f7f2e8` only; rewrite the CSS
  section of `docs/conventions.md` and the AGENTS.md Design bullet to describe
  the new identity (shadows and hero gradients are now allowed).
- [ ] **Step 4:** Run `pnpm typecheck && pnpm lint && pnpm build`; visually check
  the home page at 375px and desktop — palette and fonts applied, no dark-mode
  residue. Commit `feat(design): adopt agency-design-v2 tokens and typography`.

### Task 2: Shared UI primitives

**Files:**
- Create: `src/components/ui.tsx`

**Interfaces:**
- Produces: `ButtonLink({ href, variant: "primary"|"secondary"|"light"|"ghost-light", children })`,
  `Eyebrow({ children })`, `SectionHeading({ eyebrow, title, body? })`,
  `Tag({ children })`, `PageIntro({ eyebrow, title, body, compact? })`,
  `Accordion({ items: { title, body }[], openFirst? })` — all server-compatible
  (Accordion may use native `<details>`; no client JS).

- [ ] **Step 1:** Implement the primitives as pure presentational components using
  the Task 1 tokens (design `.eyebrow` = uppercase, 0.14em tracking, accent-strong;
  buttons = 2.75rem min-height, radius 0.25rem; Accordion = `<details>/<summary>`
  with the design's ± icon). No new deps; CSS logical properties only.
- [ ] **Step 2:** Run `pnpm lint && pnpm typecheck`. Commit
  `feat(design): add shared design primitives`.

## Phase 2 — Chrome

### Task 3: Header

**Files:**
- Modify: `src/components/navigation.tsx` (Header), `src/components/locale-switcher.tsx`

**Interfaces:**
- Consumes: `ButtonLink` (Task 2). Produces: unchanged `Header({ locale, slugAlternates })` signature.

- [ ] **Step 1:** Restyle Header to the design: "AT" circular logo mark + wordmark,
  nav links with the active-underline treatment, restyled `LocaleSwitcher`
  (language button + menu), `ButtonLink` CTA to `/book`, and a mobile menu
  (client toggle, 2.75rem targets, links to excursions/activities/transfers/
  places/guides/about/faq/contact). Keep existing translations for labels.
- [ ] **Step 2:** Run `pnpm lint && pnpm typecheck && pnpm test`; check header at
  375px (menu opens/closes, focus visible) and desktop. Commit
  `feat(design): re-skin header and locale switcher`.

### Task 4: Footer

**Files:**
- Modify: `src/components/navigation.tsx` (Footer)

- [ ] **Step 1:** Restyle Footer to the design's ink-background 4-column grid:
  brand + tagline, Explore links, Know-us links, Contact block (real values from
  `getContact()` — never the design's placeholders). WhatsApp becomes the
  design's cream button. Keep `t("footer.*")` keys; add any new ones to both locales.
- [ ] **Step 2:** Run `pnpm lint && pnpm typecheck && pnpm test`; verify contrast
  (cream on ink ≥ 7:1 target) and the 2-column mobile stacking. Commit
  `feat(design): re-skin footer`.

## Phase 3 — Home

### Task 5: Hero, trust strip, closing CTA + image assets

**Files:**
- Create: `src/content/images.ts`, placeholder photos `public/images/*.jpg`
  (hero, coast, beach, boats, city, cliffs, road) and `public/images/services/<id>.jpg`
- Modify: `src/app/[locale]/page.tsx`, `messages/en.json`, `messages/fr.json`

**Interfaces:**
- Produces: `getServiceImage(id: string, kind: "card"|"hero"|"gallery")` with a
  category-based fallback in `src/content/images.ts` (pure, unit-testable).

- [ ] **Step 1:** Add placeholder photos (sourced from the design's own references,
  stored locally — no hotlinking) and `getServiceImage` with fallback; write a
  Vitest unit test for the mapping and fallback behavior.
- [ ] **Step 2:** Build the hero (full-bleed image + directional overlay +
  `text-display` H1 + button row), trust strip (4 facts — cancellation wording
  must be "free cancellation" without a blanket hour count, or per-type correct),
  and the terracotta closing CTA band. New copy keys in **both** locale files.
- [ ] **Step 3:** Run `pnpm lint && pnpm typecheck && pnpm test && pnpm build`;
  visual check at 375px/desktop, both locales. Commit
  `feat(design): hero, trust strip and closing CTA on home`.

### Task 6: Home merchandising sections

**Files:**
- Modify: `src/components/service-card.tsx`, `src/app/[locale]/page.tsx`,
  `messages/{en,fr}.json`

**Interfaces:**
- Consumes: `getServiceImage`, `Tag`, `SectionHeading`. Produces: restyled
  `ServiceCard({ service, locale })` (same signature) matching the design trip
  card: 3:2 image, tag, title, summary, facts row, price footer via
  `getServiceDisplayPrice`.

- [ ] **Step 1:** Restyle ServiceCard to the design trip card (photo, tag pill,
  min-height title clamp, "facts" row from real content fields only, price +
  "View trip" footer). Unit-free visual change: `pnpm test` must stay green.
- [ ] **Step 2:** Rebuild home sections around it: the three category sections
  keep their data flow; add the transfer feature band using **real** transfer
  services from the catalogue (prices via `getServiceDisplayPrice`); the dark
  "Plan now. Pay later." band with the 01/02/03 steps (a genuine sequence, so
  numbered markers are correct).
- [ ] **Step 3:** Run `pnpm lint && pnpm typecheck && pnpm test && pnpm build`;
  visual check both locales. Commit `feat(design): re-skin home merchandising`.

### Task 7: Mood grid, team feature, FAQ preview

**Files:**
- Modify: `src/app/[locale]/page.tsx`, `messages/{en,fr}.json`

- [ ] **Step 1:** Add the "Choose a mood" photo grid (mobile: scroll-snap carousel)
  linking to real hub pages, the team feature band (portrait placeholder +
  ArrowLink), and the FAQ preview using **existing** FAQ keys (answers untouched —
  cancellation wording is pinned by `messages.test.ts`).
- [ ] **Step 2:** Run `pnpm lint && pnpm typecheck && pnpm test && pnpm build`;
  check the mobile carousel snaps and dots render. Commit
  `feat(design): moods, team and FAQ sections on home`.

## Phase 4 — Hubs and service detail

### Task 8: Hub/listing pages

**Files:**
- Modify: `src/components/hub-page.tsx`, `messages/{en,fr}.json`

- [ ] **Step 1:** Restyle HubPage with `PageIntro` (design's eyebrow + display H1
  + lede) and the new ServiceCard grid. Render the design's filter chips **only**
  as real links (e.g. to hubs/places) or omit them — no fake affordances.
- [ ] **Step 2:** Run `pnpm lint && pnpm typecheck && pnpm test && pnpm build`;
  check all three hubs at 375px. Commit `feat(design): re-skin hub pages`.

### Task 9: Service detail page

**Files:**
- Modify: `src/app/[locale]/[slug]/page.tsx`, `messages/{en,fr}.json`

- [ ] **Step 1:** Port the design's service layout: breadcrumbs (`aria-current`),
  gallery (2fr/1fr grid using `getServiceImage(id, "gallery")`), fact tiles fed
  **only** by fields that exist on `Service` (duration via helpers, pickup, group
  size — omit tiles rather than invent data), accordions from real content
  sections via the `Accordion` primitive.
- [ ] **Step 2:** Restyle the sticky booking card: price via
  `getServiceDisplayPrice`, link `/book?service=<id>`, trust lines with correct
  cancellation wording. Add "You might also like" grid from the same category.
- [ ] **Step 3:** Run `pnpm lint && pnpm typecheck && pnpm test && pnpm validate:data
  && pnpm build && pnpm test:e2e` (routes/metadata touched). Grep the built HTML
  for placeholder strings ("Rating placeholder", "[Address", "wa.me/000000000")
  — zero matches. Commit `feat(design): re-skin service detail page`.

## Phase 5 — Booking

### Task 10: Booking form re-skin

**Files:**
- Modify: `src/components/book-form.tsx`, `messages/{en,fr}.json`

**Interfaces:**
- Consumes: `usesTieredPricing()` (`src/pricing/quote.ts`), `src/booking/selection.ts`
  pure logic (unchanged). Produces: same `BookForm` props; adds a `MobileBar`
  client component (`src/components/mobile-bar.tsx`) keyed on
  `InquiryState.attempt`-safe state only.

- [ ] **Step 1:** Restyle form sections as the design's numbered fieldsets
  (01 "Choose the details", 02 "Contact details"), steppers, and radio cards —
  selectors still driven by `usesTieredPricing()`. **Keep all fields controlled
  and the `<form>` keyed on `InquiryState.attempt`.**
- [ ] **Step 2:** Restyle the estimate card (live totals from the quote engine —
  no hardcoded "35 €") and the success state (design's success mark + "what
  happens next" steps). Add the sticky mobile submit bar showing the estimated
  total, appearing after the intro scrolls away (IntersectionObserver in the
  client component — no setState-in-effect bumps).
- [ ] **Step 3:** Run `pnpm lint && pnpm typecheck && pnpm test && pnpm build`;
  manually verify the retry flow: submit invalid → errors show; submit valid →
  success state; reload → form and quote consistent. Commit
  `feat(design): re-skin booking flow with sticky mobile bar`.

## Phase 6 — Secondary pages and new patterns

### Task 11: Places, guides, about, FAQ, contact

**Files:**
- Modify: `src/app/[locale]/places/page.tsx`, `places/[place]/page.tsx`,
  `guides/page.tsx`, `guides/[guide]/page.tsx`, `about/page.tsx`, `faq/page.tsx`,
  `contact/page.tsx`, `messages/{en,fr}.json`

- [ ] **Step 1:** Apply `PageIntro`, the design's places grid, guide featured +
  row list, about story/team/credentials layouts, FAQ page grid (aside + accordion),
  and contact grid (details + form) — real content only; team names/licence
  numbers stay out until the agency supplies them (omit, don't invent).
- [ ] **Step 2:** Run `pnpm lint && pnpm typecheck && pnpm test && pnpm validate:data
  && pnpm build`; check both locales at 375px. Commit
  `feat(design): re-skin places, guides, about, faq, contact`.

### Task 12: Transfer tool widget

**Files:**
- Create: `src/components/transfer-tool.tsx` (client)
- Modify: `src/app/[locale]/transfers/page.tsx`
- Test: `src/pricing/quote.test.ts` (extend)

**Interfaces:**
- Consumes: pure quote functions from `src/pricing/quote.ts`. Produces:
  `TransferTool({ routes })` where `routes` is server-derived from the catalogue.

- [ ] **Step 1:** Write failing Vitest cases for the pure indicative-total
  calculation used by the widget (route + passengers → vehicle recommendation +
  price), using catalogue data as input. Run and confirm they fail.
- [ ] **Step 2:** Implement `TransferTool` with the design's widget (from/to/
  passengers selects, indicative total, "Request transfer" → `/book?service=<id>`),
  vehicle cards and the "At the airport" steps band. All prices flow from the
  tested pure functions — zero literals.
- [ ] **Step 3:** Run `pnpm lint && pnpm typecheck && pnpm test && pnpm build`;
  verify selecting routes updates the total without hydration errors. Commit
  `feat(design): transfer tool with data-driven indicative pricing`.

### Task 13: Design-system page

**Files:**
- Create: `src/app/[locale]/design-system/page.tsx`

- [ ] **Step 1:** Build the component sheet (swatches with contrast ratios,
  type samples, spacing scale, buttons/fields/card/accordion states) as a
  living reference. `noindex: true`, excluded from `sitemap.ts`.
- [ ] **Step 2:** Run `pnpm lint && pnpm typecheck && pnpm build && pnpm test`;
  confirm the page is absent from the sitemap and marked noindex. Commit
  `feat(design): add design-system reference page`.

## Phase 7 — Hardening and docs

### Task 14: Full gate and polish pass

- [ ] **Step 1:** Run the full gate: `pnpm lint && pnpm typecheck && pnpm test &&
  pnpm validate:data && pnpm build && pnpm test:e2e` (plus `pnpm docs` check).
  Fix e2e assertions that pinned the old look; never weaken assertions that
  cover SEO, i18n or booking behavior.
- [ ] **Step 2:** RTL grep gate: no physical direction utilities (`ml-`, `mr-`,
  `pl-`, `pr-`, `left-`, `right-`, `text-left`, `text-right`) in changed files.
  Placeholder grep gate: no design placeholder strings in `src/`, `messages/`,
  `content/`. Both greps return zero matches.
- [ ] **Step 3:** Visual pass: home → hub → service → book → success journey at
  375px and desktop in **en and fr**; keyboard-only pass (focus visible,
  skip link works); `prefers-reduced-motion` respected. Commit
  `chore(design): gate fixes and polish`.

### Task 15: Docs alignment

- [ ] **Step 1:** Update `docs/architecture.md` (new components), `docs/i18n.md`
  (any new namespaces), `specs/roadmap.md` (mark this done / note follow-ups:
  real photos, dark mode revisit, Arabic RTL).
- [ ] **Step 2:** Run `pnpm docs` (or `node scripts/check-docs.mjs`) — links
  resolve. Commit `docs: align knowledge base with the v2 design`.

## Acceptance criteria

1. Every page matches the design's visual language: palette, Playfair/DM Sans
   type, spacing/radius scale, photo-led layouts — verified by side-by-side
   visual check of home, hub, service, book, success.
2. Zero placeholder strings from the design file in shipped output (grep gate).
3. All prices/durations render from catalogue helpers; a spot-check of 5
   services matches `content/`.
4. Both locales render fully translated; `messages.test.ts` green; no pinned
   copy changed.
5. Full gate green: lint, typecheck, test, validate:data, build, test:e2e.
6. 375px + desktop layouts hold; touch targets ≥ 44px; focus visible; light-only.
