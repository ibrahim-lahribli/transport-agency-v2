# Testing

## Suites

| Suite          | Tool                             | Location                                     | Covers                                                                   |
| -------------- | -------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------ |
| Unit/component | Vitest + Testing Library (jsdom) | `src/**/*.test.ts(x)`, `config/**/*.test.ts` | pricing engine, content validation (incl. translation completeness), business config |
| End-to-end     | Playwright (375px mobile)        | `tests/e2e`                                  | home render, locale switching, and the SEO suite                         |
| Content rules  | Node script                      | `scripts/validate-data.mjs`                  | catalogue validation (see [content-model.md](content-model.md))          |
| Docs guard     | Node script                      | `scripts/check-docs.mjs`                     | skill frontmatter and Markdown links resolve                             |
| Lighthouse     | `@lhci/cli`                      | `lighthouserc.json`                          | mobile performance/SEO/a11y/LCP/CLS budgets                              |

## Commands

```bash
corepack pnpm test            # unit (fast, no network)
corepack pnpm test:e2e        # needs a production build first
corepack pnpm validate:data   # content rules
corepack pnpm lighthouse      # budgets (needs a running server)
```

## What the E2E SEO suite asserts

For every URL in `sitemap.xml`: exactly one `<h1>`, exactly one canonical, the
three reciprocal `hreflang` tags, and valid JSON-LD. Product pages additionally
assert a `TouristTrip` with an `Offer`, an ISO 8601 `duration` **only when one
exists** (transfers must omit it), and that the visible
`[data-testid="quick-facts-price"]` contains the JSON-LD price **as a whole
number token** (not a substring, so `5` cannot match `250`).

The suite also guards the share-card surface: `/icon` and
`/[locale]/opengraph-image` must return `200` with an image content type
**without** a locale redirect, every page must expose an absolute `og:image` and
a `twitter:image` that resolves, and the `[data-testid="restrictions-text"]`
block must render without doubled periods in both locales. A French product page
must additionally ship body copy that differs from its English source, so an
untranslated field fails the build ([content-model.md](content-model.md), rule 8).

## Writing tests

- Prefer accessible queries (`getByRole`) over implementation details.
- For prices/durations/structured data, assert against an **independently
  declared expected value** — comparing the visible price to the JSON-LD price
  alone is not enough, because both come from the same function.
- Keep unit tests deterministic and offline. Mock `next-intl/server` and the
  routing module where a component needs them.
- Never weaken or delete an assertion to make a change pass.

## CI

`.github/workflows/ci.yml` runs, in order: **lint → typecheck → test → build →
lhci autorun**. A change is not done until all of these pass locally.
`playwright.config.ts` accepts `PLAYWRIGHT_BASE_URL` so a suite can target a
fresh server on another port.
