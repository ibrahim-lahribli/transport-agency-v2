# Glossary

**Service** — one bookable product (a tour, activity or transfer). Typed in
`src/schemas/service.ts`, stored per locale in `content/{en,fr}`.

**Hub** — one of the three category landing pages: **excursions**, **activities**
or **transfers** (`/[locale]/<hub>`). Mapping between hub and category lives in
`src/seo/content.ts` (`categoryToHub` / `hubToCategory`).

**Catalogue** — the published set of services. `getServices(locale)` returns it,
filtered to `status: "published"` and sorted by `order`.

**Publish gate** — the filter in `src/seo/content.ts` that keeps non-published
services out of pages, metadata, the sitemap and links.

**Slug** — the localized URL segment for a service (`agadir-boat-cruise-…` in EN,
`sortie-bateau-agadir-…` in FR). The EN↔FR mapping is the
`getSlugAlternates()` / `getReciprocalSlugs()` pair.

**Reciprocal slug** — the same service's slug in the other locale, used for
`hreflang` and the locale switcher.

**Hub key** — `"excursions" | "activities" | "transfers"`.

**Quote** — a computed price for a specific booking: `quote(serviceId, party,
options, date)` in `src/pricing/quote.ts`.

**Display price / "From" price** — the headline price on cards and product
pages, from `getServiceDisplayPrice`; the same value feeds `Offer.price`.

**Base option** — the price option that represents the bookable product, marked
`isBase: true` when the automatic rules can't infer it.

**Add-on** — a supplement (extra waiting, sandboarding add-on) that must never be
shown as the "From" price.

**Pathname** — a next-intl route key (`"/[slug]"`), used by the typed `Link`.

**Static params** — `generateStaticParams()`; the routes pre-rendered at build.

**JSON-LD** — schema.org structured data emitted by `src/components/json-ld.tsx`.

**RTL** — right-to-left layout (Arabic); kept possible by using logical CSS
properties everywhere.
