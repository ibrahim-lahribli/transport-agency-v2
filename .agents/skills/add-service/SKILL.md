---
name: add-service
description: Add or change a bookable service end-to-end across English and French, including content, pricing, validation and SEO checks. Use when asked to add a tour, activity or transfer, or to edit an existing service.
metadata:
  version: "1.0"
  audience: coding-agents
---

# Add or change a service

A service exists in **both** locales and flows through the catalogue to pages,
the sitemap and structured data. Miss a step and it either won't build, won't
ship, or ships wrong.

## 1. Gather the facts

- Read [docs/content-model.md](../../../docs/content-model.md) and the closest
  existing analogue in `content/en`.
- Decide `id` (kebab-case, = filename), `category` (`activity` | `excursion` |
  `transfer`) and, for a transfer, its `routes` and vehicle prices.
- Never invent prices, durations or business details; use the source material in
  `data/source/` or ask.

## 2. Create the content

- Add `content/en/<id>.ts` and `content/fr/<id>.ts`, each a typed `Service` with
  a default export.
- `slug` is **localized** and must be unique within its locale.
- `order` is the next unused positive integer; `status` is `published` only when
  it should go live.
- `seo.title` ≤ 60 chars, `seo.description` ≤ 160; `primaryKeyword` must appear
  in `seo.title`; no "Sahara" anywhere.
- Every price needs a unit; mark the bookable base option with `isBase: true`
  when the automatic rule in [docs/pricing.md](../../../docs/pricing.md) can't
  infer it.
- Register the service in **both** `content/{en,fr}/index.ts` (`services`,
  `servicesById`, named export).

## 3. Use the shared building blocks

- Do not add bespoke pages. The product page, hub listings, breadcrumbs, related
  services and JSON-LD all derive from the catalogue automatically.
- Copy that is UI chrome goes to `messages/{en,fr}.json`; service copy stays in
  the content files.

## 4. Verify

```bash
node_modules/.bin/next build
node.cmd scripts/validate-data.mjs     # pnpm validate:data
```

Then confirm live, on a fresh server:

- the EN and FR product pages render, one `<h1>`, reciprocal `hreflang` to the
  **translated** slug;
- `Offer.price` matches the visible "From" price, and a transfer emits no
  `duration`;
- the service appears in its hub and in `sitemap.xml` (count grows by 2);
- `pnpm test:e2e` passes.

## 5. Finish

Update the sitemap expectation only if the E2E count changes for a real reason.
Report the service, its id, both slugs, its hub and the checks you ran.
