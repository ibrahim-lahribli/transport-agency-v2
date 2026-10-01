# 0002 — Publish gate on catalogue reads

- **Status:** accepted
- **Date:** 2026-10-01
- **Deciders:** project maintainers

## Context

Every service carried `status: "draft"`, yet all of them were rendered and listed
in the sitemap: nothing filtered on status. That made `status` meaningless and
meant an unfinished service could ship to search engines unnoticed.

Options considered:

1. **Filter at each consumer** (pages, sitemap, metadata). Easy to forget one,
   so drafts leak.
2. **Filter once in the access layer** (`src/seo/content.ts`) and route every
   read through it.

## Decision

Make `src/seo/content.ts` the single entry point for catalogue reads and filter
to `status === "published"` there, sorting by `order`. Mark the 15 validated
services `published` in both locales so the live site is unchanged.

## Consequences

- A draft can no longer reach pages, `generateStaticParams`, metadata, the
  sitemap or internal links; removing a live service is a one-field change.
- `order` is now load-bearing for catalogue ordering (unique positive integers).
- New consumers must import from `src/seo/content.ts`, not `content/*` directly.
  `src/pricing/quote.ts` still imports content directly — a known gap to close.
