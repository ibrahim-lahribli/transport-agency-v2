# 0006. Quote + inquiry booking, no online payment

- Status: accepted
- Date: 2026-10-02

## Context

The agency's operating model is a request followed by confirmation on WhatsApp,
with payment in cash (EUR or MAD) at pickup. There is no payment entity, no
booking back office, and availability is confirmed manually.

## Decision

Ship a **live price quote** (from the pure quote engine) plus an **inquiry
form**. Submitting sends a notification and offers a pre-filled WhatsApp handoff.
There is no online payment, cart, user account or availability engine.

## Consequences

- No PCI scope, no payment provider, no personal data beyond the inquiry.
- The quote is instant and transparent, which is the conversion advantage.
- Confirmation remains a manual, human step — appropriate to the model.
- A future real-booking flow can build on the quote engine without rework.

## Alternatives considered

- Online payment and deposits — deferred: needs legal/payment infrastructure the
  client does not yet have.
- Contact form only — rejected: a live quote is a stronger, more honest UX.
