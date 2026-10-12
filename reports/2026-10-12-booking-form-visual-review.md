# Sprint 6 booking form — visual review vs agency-design-v2

Reviewed live at `http://localhost:3100/en/book` (production build) with browser
screenshots at 375×812 and 1440×900, plus the transfer service variant
(`/en/book?service=airport-agadir`) exercising route + vehicle radio cards.

## What matches the template

- Cream canvas, ink headings, terracotta accents; Playfair on the page H1 and
  the estimate total; DM Sans on labels/body.
- Numbered legend rows (01 terracotta numeral + serif legend + rule to the
  right) for "Choose the details" / "Contact details" — matches the design's
  `.form-section legend`.
- − value + steppers: min-h-11 buttons, paper-surface center value, hover
  `surface-muted`. Matches `.stepper`.
- Vehicle radio cards: rounded-md, accent outline, radio left, bold label.
  Matches `.radio-cards` (selection outline verified by clicking Minibus —
  quote re-computed to 50 € from 20 €).
- Estimate card: `shadow-card`, uppercase terracotta eyebrow, line-item rows
  with rules, serif "70 €" total, MAD footnote, full-width primary submit,
  payment note below. Matches `.estimate-card`.
- Two-column form/aside at desktop (`minmax(0,1fr) 24rem`), single column at
  375px; estimate card floats after fields on mobile, before the WhatsApp
  assistance band. Sticky aside on desktop confirmed.
- Inputs: paper surface, thin accent border, ≥44px targets, decorative
  chevron inside selects with `appearance-none`, logical properties only.

## Deviations / polish items (small, in priority order)

1. **Legend rule runs to the very edge.** The design's legend rule stops
   before the container edge; ours uses a full-width rule (border-t on the
   fieldset at both breakpoints). Minor, but visible at 1440px next to the
   template.
2. **Stepper is square-cornered (`rounded-sm`),** while the design's
   `.stepper` uses the same radius — fine — but our inner +/− hit area is
   `min-h-11` only, so the label sits slightly taller than the design's
   `--target` alignment. Cosmetic; interactive targets are compliant.
3. **Estimate-card total typography** is serif-clamped at `text-xl`; the
   design's `.price-result > strong` sits closer to `text-2xl`. Bump the
   total one step in a Sprint 10 polish pass.
4. **Field gap rhythm:** design space-5 (0.75/1rem ladder) between stacked
   fields reads slightly tighter than ours `gap-5` matches — no action.
5. **Success panel not yet re-skinned** (still pre-design: generic rounded
   card). That is Sprint 7's explicit scope, not a defect of Sprint 6 —
   listed so it isn't mistaken for drift.
6. **Sticky mobile submit bar** absent — again Sprint 7 scope by plan, noted
   here only for completeness.

## Verdict

Ship-quality for Sprint 6 scope. Items 1–3 are small cosmetic polish to fold
into Sprint 10's hardening pass; items 5–6 belong to Sprint 7 by plan.
