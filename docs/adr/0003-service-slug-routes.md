# 0003. Localized service slugs at the locale root

- Status: accepted
- Date: 2026-10-02

## Context

Services fall into three categories (excursions, activities, transfers) shown on
hubs. Product pages could live under `/{locale}/{hub}/{slug}` or `/{locale}/{slug}`.
Localized keyword-rich slugs are important for SEO in two languages.

## Decision

Serve product pages at **`/{locale}/{slug}`** with a **localized** slug per
locale (e.g. `en/agadir-boat-cruise-fishing-bbq-lunch` ↔
`fr/sortie-bateau-agadir-peche-barbecue`). Keep hub URLs as
`/{locale}/{excursions|activities|transfers}` and add alias redirects from
`/{locale}/{hub}/{slug}` to the canonical product URL.

## Consequences

- Short, clean, keyword-rich URLs that can change per language.
- Category is metadata, not URL structure, so a service can move categories
  without changing its URL.
- The locale switcher and metadata must map reciprocal slugs via the catalogue.

## Alternatives considered

- `/{locale}/{hub}/{slug}` — rejected: longer URLs, and category changes would
  break links.
- Identical slugs across locales — rejected: loses localized keyword relevance.
