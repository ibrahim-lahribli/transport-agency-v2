# 0005. SEO derived, not duplicated

- Status: accepted
- Date: 2026-10-02

## Context

A previous iteration shipped a visible "From" price that disagreed with the
JSON-LD `Offer.price`, and emitted fabricated `duration` values (`PT1H`) for
transfers. Both passed the tests because the two sides were generated
independently.

## Decision

The visible price and `Offer.price` come from **one** function
(`getServiceDisplayPrice`). Durations come from **one** function
(`formatIsoDuration`), which returns `null` when there is no real duration so
callers must omit the property. Metadata comes from **one** builder
(`buildPageMetadata`).

## Consequences

- The two representations of a value cannot drift.
- Tests must still assert against an independently declared expected value,
  because comparing two outputs of the same function proves nothing.
- Adding a UI surface means reading the shared helper, not recomputing.

## Alternatives considered

- Recompute per surface — rejected: this is the bug being fixed.
- Emit a default duration for transfers — rejected: structured data must not
  invent values.
