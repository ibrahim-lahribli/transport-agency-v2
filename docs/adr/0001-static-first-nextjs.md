# 0001. Static-first Next.js App Router, no runtime CMS

- Status: accepted
- Date: 2026-10-02

## Context

The site is a marketing and booking-inquiry front for a 15-service catalogue
that changes rarely. SEO and Core Web Vitals are primary objectives, and the
content is authored by one small team with direct access to the repository.

## Decision

Build on the Next.js App Router and render pages **statically** at build time.
The catalogue is typed TypeScript source under `content/{en,fr}`; there is no
database and no runtime CMS.

## Consequences

- Excellent performance and crawlability: fully rendered HTML, minimal client
  JS, no data-fetch latency on the critical path.
- Changes ship through code review and CI, so validation (SEO length rules, the
  publish gate) is enforced before deploy.
- Non-developers cannot edit copy directly; content changes need a commit.

## Alternatives considered

- Headless CMS — rejected: adds runtime, cost and a third-party dependency for a
  catalogue that changes monthly.
- Database-backed pages — rejected: no need to trade static performance for
  dynamism the product does not have.
