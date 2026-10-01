# 0003 — Service slug routes with locale alternates

- **Status:** accepted
- **Date:** 2026-10-01
- **Deciders:** project maintainers

## Context

Products are served at `/[locale]/[slug]`, but the slug is **localized**: the
same service is `agadir-boat-cruise-fishing-bbq-lunch` (EN) and
`sortie-bateau-agadir-peche-barbecue` (FR). The category paths
(`/[locale]/excursions/[slug]`) are kept only as aliases that redirect.

Two consequences need a decision: `hreflang` must point at the translated URL
(not prefix-swap the English slug), and the language switcher must land the
visitor on the same page in the other locale.

## Decision

Keep the flat `/[locale]/[slug]` route. Resolve the counterpart slug from the
service `id` via `getReciprocalSlugs()` (used by metadata) and a bidirectional
map `getSlugAlternates()` (injected by the layout into the client locale
switcher). Category alias paths `308`-redirect to the flat route.

## Consequences

- `hreflang` and the switcher are correct per service; the switcher preserves the
  current page instead of dropping to the homepage.
- `[slug]` must be declared in next-intl `pathnames` for typed links.
- Adding a service requires a localized slug in both locales, kept unique per
  locale (enforced by `pnpm validate:data`).
- The slug-alternates map is serialized into every page's client payload (30
  entries today); acceptable, revisit if the catalogue grows large.
