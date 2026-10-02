# Pricing

There are two related but distinct concerns: the **quote engine** (what a
specific booking costs) and the **display price** (the "From" headline shown on
cards and product pages).

## Quote engine — `src/pricing/quote.ts`

A pure function, independent of React:

```ts
quote(service, party, options?, locale?): QuoteResult
```

- Validates the party (at least one person; children need an adult), and applies
  the correct pricing model for the service family: private rate tables,
  transfers (route or day-hire), Crocoparc transport, quad/buggy, Timlalin
  options, horse riding, or standard per-person tours.
- Code output: `totalEur`, `indicativeMad`, `exchangeRate`, a `breakdown[]`, and
  optional `notes`/`warnings`/`error`. `valid: false` carries an `error` string.
- The EUR→MAD rate is read from config/env (`EUR_TO_MAD_RATE`, default 10.8) and
  never hardcoded in the calculation.

## Display price — `src/seo/price.ts`

`getServiceDisplayPrice(service)` returns the "From" amount, unit and formatted
strings, and is the **single source** for both the visible price and
`Offer.price`.

Selection order:

1. Transfers with `routes` → cheapest vehicle is the sedan (`routes[0].prices.sedan`).
2. Otherwise, for option-based services:
   1. an option flagged **`isBase: true`** (authoritative);
   2. an **adult** option if present;
   3. the cheapest option with a **base unit** (`person`/`vehicle`/`quad`/`buggy`)
      that is **not** an add-on;
   4. the cheapest positive option;
   5. the first option.

Add-ons — labels containing "add-on", "extra", "supplement", "waiting",
"overtime" or "surcharge", or units like `per 30 min` — are never chosen as the
base. This prevents a supplement (e.g. Crocoparc's "Extra waiting time",
Timlalin's "Sandboarding add-on") from becoming the headline price.

> When adding a service whose options are all non-adult and not obviously base,
> mark the intended base with `isBase: true`.

## Unit labels

Units render as localized labels (`person`/`personne`, `vehicle`/`véhicule`,
`quad`, `buggy`, `per 30 min`/`par 30 min`, `30 minutes`).

## Currency

Prices are authored in **EUR**. MAD is only ever shown as an indicative
conversion using the configured rate; it is not the stored price.
