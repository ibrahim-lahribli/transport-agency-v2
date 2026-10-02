# 0001. Build plan — Agadir (Souss-Massa) SEO-first travel agency site

- Status: done
- Owner: engineering + agency owner
- Updated: 2026-10-02

## 1. Vision & objectives

A mobile-first, SEO-first website for a licensed travel and tourist-transport
agency based in Agadir (Souss-Massa, Morocco). It presents a catalogue of 15
services across **excursions**, **activities** and **transfers**, in English and
French, and lets visitors get an instant, transparent price and send a booking
inquiry.

**Product principles**

1. A **local authority site**, not a marketplace. The differentiator is
   first-hand operational truth: exact pickup windows, the Monday-closed souk,
   Ramadan hours, real route distances and honest seasonal caveats ("coastal
   dunes, never Sahara").
2. **SEO is derived, never duplicated.** One function produces the "From" price
   for both the visible chip and `Offer.price`.
3. **One owner per concern.** Nothing reads `content/*` except `src/catalogue`.
4. **Static-first.** No runtime CMS, no database.
5. **Mobile-first at 375px**, CSS logical properties only, ready for RTL.

**Success looks like:** every published service is indexable with valid
structured data; Core Web Vitals within budget on mobile; qualified inquiries
arrive with a quote attached; no fabricated prices or durations anywhere.

## 2. Users & journeys

- **Visitor (EN/FR market)** — searches e.g. "agadir airport to taghazout
  private transfer" → lands on a product or place page → reads itinerary,
  inclusions, FAQ → adjusts party size to see a live quote → submits an inquiry
  or opens the pre-filled WhatsApp message.
- **Owner/dispatcher** — receives the inquiry with service, date and party →
  confirms availability on WhatsApp → the guest pays cash at pickup.

## 3. Scope

- **In scope:** typed catalogue; three hubs; product pages with localized slugs;
  live quote + inquiry; SEO engine (metadata, hreflang, JSON-LD, sitemap,
  robots, llms.txt, manifest, OG images); EN + FR; docs + AI context; CI gates.
- **Out of scope:** online payment, user accounts, availability/booking back
  office, CMS admin, Arabic copy (wired only), real reviews (until genuine),
  third-party trackers.

## 4. Tech stack

| Concern    | Choice | Why |
| --- | --- | --- |
| Framework  | Next.js 16 App Router, React 19 | Static rendering, Metadata API, built-in fonts/images |
| Language   | TypeScript strict | Prevent invalid content at build time |
| Styling    | Tailwind CSS v4 | Utility CSS, small output, design tokens |
| i18n       | next-intl | Locale routing, messages, static rendering |
| Validation | zod | Content schema + env validation |
| Tests      | Vitest, Playwright, LHCI | Unit, E2E SEO, performance budgets |
| Hosting    | Vercel | App Router fit, image optimization, previews |

Dependencies stay deliberately tiny: no UI kit, no animation or tracking library.

## 5. Commands

```bash
corepack pnpm dev            # dev server
corepack pnpm build          # production build
corepack pnpm start          # serve the build
corepack pnpm lint           # eslint .
corepack pnpm typecheck      # tsc --noEmit
corepack pnpm test           # vitest run
corepack pnpm test:e2e       # playwright (build first)
corepack pnpm validate:data  # content rules
corepack pnpm check:docs     # skill frontmatter + markdown links
corepack pnpm lighthouse     # lhci budgets
```

Fallback when pnpm is unavailable: `node_modules/.bin/<tool>`.

## 6. Project structure

```
content/{en,fr}/     typed service catalogue (one file per service + index)
messages/{en,fr}.json UI copy
config/              business.ts (env-validated), site.ts
src/schemas/         zod schemas + Service type
src/catalogue/       the only reader of content/*
src/pricing/         pure quote engine
src/seo/             metadata, price, duration, JSON-LD
src/i18n/            locales, routing, request config
src/components/      presentational building blocks
src/app/[locale]/    routes
scripts/             validate-data.mjs, check-docs.mjs
tests/e2e/           Playwright
docs/                knowledge base (+ adr/)
specs/               specs and roadmap
.agents/skills/      reusable workflows
```

## 7. Code style

Follow [docs/conventions.md](../docs/conventions.md). The shape that matters:

```ts
// Pure, typed, no `any`; read the catalogue, never content/* directly.
import { getServiceBySlug } from "@/catalogue";
import { getServiceDisplayPrice } from "@/seo/price";

const service = getServiceBySlug(slug, locale);
if (!service) notFound();
const price = getServiceDisplayPrice(service); // single source for UI + JSON-LD
```

## 8. Git workflow

- Conventional Commits: `feat|fix|chore|docs|refactor|test|ci(scope): summary`.
- One coherent change per commit. **Do not commit, push or open a PR unless
  asked.**

## 9. Boundaries

- ✅ Always: derive prices/durations from the shared helpers; keep pages static;
  add every message key to both locales; leave lint/typecheck/test/build green.
- ⚠️ Ask first: adding a dependency, changing the content schema, changing CI.
- 🚫 Never: commit secrets, invent a price or duration, bypass the publish gate,
  edit generated directories, commit/push unless asked.

## 10. Data model & SEO invariants

See [docs/content-model.md](../docs/content-model.md) and
[docs/seo.md](../docs/seo.md). The non-negotiables: publish gate on every read;
`seo.title` ≤ 60 and `seo.description` ≤ 160; `primaryKeyword` in `seo.title`; a
unit on every price; word "Sahara" nowhere; one `<h1>`, one canonical, reciprocal
`en`/`fr`/`x-default` hreflang; `Offer.price` equals the visible price;
`duration` omitted when absent; `/book` `noindex` and excluded from the sitemap.

## 11. Task breakdown

### M0 — Foundations
- M0.1 `config/business.ts` (zod-validated env) + `config/site.ts`; fail prod
  builds on placeholders. Unit tests.
- M0.2 `src/schemas/service.ts` (policies, hosts, units, price options with
  `isBase`, routes, transfer rates, FAQ, SEO refinements).
- M0.3 `src/catalogue/*` — publish gate, ordering, lookup, slug↔slug, hubs,
  related. Unit tests.
- M0.4 `src/pricing/quote.ts` + `src/seo/price.ts` + `src/seo/duration.ts`. Tests.
- M0.5 `src/validation/*` + `scripts/validate-data.mjs`. Tests against fixtures.
- M0.6 `src/i18n/*` (locales, routing, request) + `src/middleware.ts`.
- M0.7 App shell: `globals.css` tokens, self-hosted font, `[locale]/layout.tsx`,
  home page. Build green.

### M1 — Catalogue & hubs
- M1.1 `src/components/hub-page.tsx`; hubs for excursions/activities/transfers.
- M1.2 Product page `[locale]/[slug]` with `generateStaticParams` + metadata.
- M1.3 Related services, breadcrumbs, locale switcher preserving the page.
- M1.4 Category alias redirects `/{locale}/{hub}/{slug}` → `/{locale}/{slug}`.

### M2 — SEO engine
- M2.1 `src/seo/metadata.ts` (`buildPageMetadata`) used by every page.
- M2.2 `src/components/json-ld.tsx`: `TravelAgency`, `BreadcrumbList`,
  `TouristTrip`+`Offer`, `FAQPage`.
- M2.3 `src/app/sitemap.ts` (publish-gated, alternates) + `robots.ts` +
  `public/llms.txt` + web manifest + favicon/OG images.
- M2.4 Internal-linking pass (related, breadcrumbs, contextual links).

### M3 — Booking
- M3.1 Live quote UI driven by `quote()` on product and `/book`.
- M3.2 `/book` server action: zod validation, notification adapter, WhatsApp
  handoff, spam protection; page `noindex`, one `<h1>`.

### M4 — Long-tail & guides
- M4.1 Place/zone landing pages generated from the catalogue.
- M4.2 `Article`-marked editorial guides with internal links.

### M5 — Trust & conversion
- M5.1 About/owner story page (E-E-A-T), contact page.
- M5.2 Reviews section — only when genuine reviews exist.
- M5.3 Legal, privacy and cancellation pages; NAP consistency.

### M6 — Hardening & launch
- M6.1 Playwright E2E SEO suite over every sitemap URL; home smoke test.
- M6.2 CWV/a11y pass against LHCI budgets; add an INP budget.
- M6.3 Data hygiene: consolidate duplicate root JSON and `.txt` catalogues into
  `data/source/`.
- M6.4 Analytics + Search Console notes; 404/410 handling; redirect map.

## 12. Acceptance criteria

- Global: `lint`, `typecheck`, `test`, `build`, `validate:data`, `check:docs` all
  pass; LHCI budgets met on mobile.
- SEO: for every sitemap URL — one `<h1>`, one canonical, reciprocal hreflang,
  valid JSON-LD; product pages have `TouristTrip`+`Offer`; `Offer.price` equals
  an independently computed expected value; transfers omit `duration`; `/book`
  is `noindex` and absent from the sitemap.
- Booking: the quote updates live and matches the engine; submitting a valid
  inquiry succeeds; invalid input is rejected with accessible errors.
- i18n: switching locale keeps the page and translates the product slug.

## 13. Open items (client-supplied)

1. Real legal/contact data (ICE, RC, licence, insurance, WhatsApp, email,
   address) — `.env.example` currently holds placeholders.
2. Real photos/video; existing reviews; founding year; final domain.
3. Confirmation of all proposed prices and the night-surcharge decision.
4. Partner names, operator licences/insurance, vehicle authorisations, park and
   donkey entry fees.
5. Native French review of copy marked "(Draft for native review.)"; decision on
   Arabic timing.
6. Email/notification provider choice for the inquiry form.
