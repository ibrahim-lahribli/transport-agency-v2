# 0004. Publish gate on catalogue reads

- Status: accepted
- Date: 2026-10-02

## Context

Services carry real operational uncertainty while prices and partner details are
confirmed. Draft content must be authorable without leaking into the sitemap,
metadata or internal links.

## Decision

Every catalogue read goes through `src/catalogue`, which filters to
`status === "published"`. Only `published` services reach pages,
`generateStaticParams`, metadata, the sitemap, related links and the locale
switcher.

## Consequences

- A `draft` can exist in the repo without shipping — no near-miss indexing.
- Publishing requires setting `status: "published"` in **both** locales.
- Bypassing the catalogue module would defeat the gate, so nothing imports
  `content/*` directly.

## Alternatives considered

- Filter at each call site — rejected: easy to miss one, which is exactly the
  bug the gate prevents.
- A build-time allowlist — rejected: more indirection for the same result.
