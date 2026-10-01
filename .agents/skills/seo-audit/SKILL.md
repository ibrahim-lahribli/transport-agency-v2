---
name: seo-audit
description: Audit every page's SEO invariants (h1, canonical, reciprocal hreflang, JSON-LD, price/duration) and the sitemap/robots. Use when asked to check SEO, validate metadata, verify structured data, or before shipping a release. Produces an evidence table.
metadata:
  version: "1.0"
  audience: coding-agents
---

# SEO audit

Assert the invariants in [docs/seo.md](../../../docs/seo.md) against the built
site, not the source. The source can look right while the rendered DOM differs.

## 1. Build and serve

```bash
node_modules/.bin/next build
nohup node_modules/.bin/next start -p 3100 > /tmp/seo-audit.log 2>&1 &
sleep 5
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3100/en
```

Confirm the port is served by the process you just started (check
`netstat -ano | grep :3100`), so a stale server on another port doesn't answer.

## 2. Enumerate the sitemap

```bash
curl -s http://localhost:3100/sitemap.xml | grep -oE '<loc>[^<]*</loc>' | sed 's/<[^>]*>//g' > /tmp/urls.txt
wc -l /tmp/urls.txt
```

Expected shape: home (2) + hubs (6) + published services × 2. No `/book` URL.

## 3. Check each page

For every URL (strip the origin before curling), assert:

1. exactly one `<h1>`;
2. exactly one `<link rel="canonical">`, equal to the page's own URL;
3. `hreflang` `en`, `fr` and `x-default`, reciprocal, with `x-default` = the
   English URL;
4. at least one valid `application/ld+json` block; `TravelAgency` and
   `BreadcrumbList` present; product pages add `TouristTrip` + `Offer`;
5. product pages: `Offer.price` equals the visible
   `[data-testid="quick-facts-price"]` as a **whole token**;
6. `duration` is valid ISO 8601 and **absent** on transfers.

The fastest check is the Playwright suite, which already encodes all of the
above:

```bash
PLAYWRIGHT_BASE_URL=http://localhost:3100 node_modules/.bin/playwright test tests/e2e/seo.spec.ts
```

## 4. Also check

- `/robots.txt` allows crawling, disallows `/book` and `/*/book`, references the
  sitemap.
- `/en/book` and `/fr/book` carry `noindex` and one `<h1>`.
- The locale switcher keeps the page and translates the product slug.
- Open the page in the preview and confirm no console errors.

## 5. Report

Give a table: URL → h1 / canonical / hreflang / JSON-LD / price / duration, plus
a clear pass/fail summary and any URL that deviated. Stop the server you started.
