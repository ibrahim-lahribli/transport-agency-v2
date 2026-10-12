# Sprint 7 booking journey — visual review vs agency-design-v2

Reviewed live at `http://localhost:3100/en/book?service=quad-buggy-forest`
(production build, commit `2fd7f51`) with browser screenshots at 375×812 and
1440×900 across the full journey: form top → scrolled form + mobile bar →
valid submit → success panel. Extends
[2026-10-12-booking-form-visual-review.md](2026-10-12-booking-form-visual-review.md).

## What matches the template

- **Mobile bar** (`.mobile-bar--booking`): fixed bottom, paper surface with the
  upward shadow, serif live total ("70 €"), small "Estimated total" label, the
  em-dash legal note line, terracotta full-height submit. Appears only after
  the 01 intro leaves the viewport (verified: hidden at top, visible when
  scrolled; overlays the footer at page bottom exactly as the design intends).
- **Bar ↔ estimate consistency:** the bar's total equaled the estimate card's
  at every step observed (70 € quad ×2; 20 €/50 € transfer checks from the
  earlier review).
- **Success panel**: olive `✓` disc, centered serif "Request received", muted
  lede, then the sand "What happens next" card with numbered circle steps (1/2/3)
  separated by rules — matches the design's `.success-card` / `.next-steps`
  (the "Request received" moves to an `<h2>` since the panel replaces the
  form's H1 contextually on this route; the design uses an H1 on its own page).
- **Bar hidden ≥48rem** (computed `display: none` confirmed at 1440px); no
  mobile-only residue on desktop.
- Desktop two-column booking layout and sticky estimate card unchanged from
  Sprint 6's review — still correct after Sprint 7's wrapper changes.

## Deviations / polish items (Sprint 10 hardening candidates)

1. **Success card width.** The design centers the success card at
   `max-width: 46rem` inside a `.success-page` wrapper; ours renders the card
   at whatever width the form container leaves (max-w-5xl page). At 1440px the
   card fills the full column rather than the design's centered 46rem column.
   Small, page-level polish: constrain the success panel to ~46rem centered.
2. **"Need immediate assistance?" duplication on success.** The success state
   is centered, yet the earlier in-form "Need immediate assistance?" WhatsApp
   card renders below it left-aligned (visible at 1440px), and its primary
   button duplicates the success panel's own WhatsApp CTA nearby. Consider
   hiding that band when `state.status === "success"` or restyling it to the
   design's centered `.button-row`.
3. **Success H2→H1 hierarchy.** The design's success page uses an `<h1>`;
   ours renders `<h2>` "Request received" after the form's H1 is unmounted.
   Works, but a one-line level bump (or reusing the page H1 slot) would match
   the design and keep a single H1 per state.
4. **Bar safe-area inset.** The template root uses `env(safe-area-inset-*)`
   padding; our bar sets none, so on notched devices the legal-note line can
   sit tight to the home indicator. One-line `env()` addition.
5. **Legal note em size.** Our 0.625rem note is faithful to the design, but at
   375px with a long FR string ("Aucun paiement maintenant · Annulation
   gratuite") the `white-space: nowrap` risks clipping. Consider
   `text-wrap: balance` or drop `nowrap` on overflow.

## Verdict

Sprint 7 scope is fully delivered and behaviorally verified. Items 1–3 are
one-afternoon cosmetic alignment; 4–5 are small hardening items for Sprint 10.
No functional gaps found in the journey.
