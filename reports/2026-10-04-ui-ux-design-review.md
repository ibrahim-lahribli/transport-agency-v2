# UI/UX design review — industry patterns and our site

**Date:** 2026-10-04
**Scope:** the Agadir Tourisme site (EN/FR), mobile-first, static SEO build.
**Method:** live inspection of GetYourGuide and Viator homepages (rendered in the
browser), plus research on tour-page and booking UX (AtlasPerk 2026 tour-page
playbook, Ralabs booking-UX findings, Lazarev travel UX mistakes), then a
file-by-file pass over our UI against the Vercel **Web Interface Guidelines**
(rules fetched fresh from `vercel-labs/web-interface-guidelines`).

Two parts: **§1 what the market leaders do** (patterns to borrow), then **§2 our
review** (guideline findings with `file:line`, UX gaps, and a prioritised plan).

---

## §1 — Patterns from leading travel-booking sites

### Observed live

**GetYourGuide** (rendered homepage):
- Hero H1 `Experiences worth traveling for`, with a search bar combining
  destination (`Search places or activities`), a flexible date (`Anytime`),
  participants (`1 participant`) and a `Search` CTA — a 4-field search above the fold.
- Content is merchandised by intent, not just by product: `Things to do wherever
  you're going`, `Attractions you can't miss`, `Go beyond the guidebook`,
  `Adventures to plan your trip around`.
- A dedicated trust section: **`Why book with GetYourGuide?`**, `Book with
  confidence`, `Plans change and that's ok`, `Support`.

**Viator** (rendered homepage):
- Hero H1 `Do more with Viator`, search placeholder `Search…`.
- Trust is stated as plain facts next to the funnel: **`Free cancellation`**,
  **`24/7 customer support`**, **`Millions of reviews`**, and `Stay flexible
  with free cancellation and the option to reserve now and pay later`.
- Merchandising sections: `Top Destinations`, `Top Attractions`, `Top Tours`,
  `Warm Destinations`.

Both lead with **search + trust + browsable merchandising**, above the fold.

### Research-backed rules (AtlasPerk 2026, Ralabs 2025)

- **Above-fold hierarchy (5 elements):** hero image, tour name, price, availability
  indicator, primary CTA. Visitors spend **57%** of viewing time above the fold and
  **74%** within the first two screens; on mobile the order is
  **image → title → price → date → book button**.
- **Photo strategy:** travel is experiential and non-returnable, so authentic
  photos (real guests + guides) are the single highest-leverage trust signal; stock
  photography *reduces* trust.
- **Total-price transparency:** **67%** of sites hide total cost; the US FTC
  total-price rule (May 2025) now requires upfront total pricing for online travel.
  Show price above the fold with included/excluded breakdown.
- **Multiple, repeated CTAs:** a sticky CTA alone measured **+4.17%** checkout
  conversion; place a CTA above the fold, after the itinerary, after reviews, and
  as a **sticky mobile bar** — all with identical copy to the same form.
- **Social proof on the page:** **95%** of people read reviews before booking;
  products with **≥5 reviews** are ~**270%** more likely to be purchased. Put
  **3–5 recent, tour-specific** reviews mid-page (after itinerary, before the final CTA).
- **Progressively disclosed detail:** accordions for long itineraries; a timeline
  for short experiences.
- **Availability clarity:** grey out unavailable dates, suggest the next available
  slot (reduces "rage clicks").
- **Smart defaults:** pre-select recommended/popular options and label them
  ("Best Value") to reduce cognitive load.
- **Mobile-first, thumb-friendly:** sticky booking bar, ≥44px targets, fast loads,
  inline validation, error recovery without losing input.
- **Accessibility as conversion:** alt text, keyboard support, contrast, inclusive
  filters.

### What this means for us (the short list to adopt)

1. A **photo-led hero** (real Agadir/Massa imagery), not a text-only intro.
2. **Reviews / ratings** on product pages and cards — we have none anywhere.
3. An **on-page booking panel** with a date + party selector (not only a separate
   `/book` page), **sticky on mobile**.
4. **Trust facts repeated next to every CTA** (free cancellation, no prepayment,
   WhatsApp support) — not only in the "Good to Know" block.
5. Keep the strong parts we already have: local operator credibility, transparent
   EUR prices, and a WhatsApp path (a real differentiator vs the big OTAs).

---

## §2 — Review of our website

### 2.1 Web Interface Guidelines findings

Grouped by file, `file:line`. Pass items are noted so they aren't "fixed" away.

**src/components/book-form.tsx**
- `:16` — `outline-none` on the shared input class removes the focus ring; the only
  replacement is `focus:border-accent` (a 1px colour change, and `:focus` not
  `:focus-visible`, so it also fires on mouse click). Give inputs a real
  `focus-visible:ring-2` / border-2 replacement.
- `:270` `name` input — missing `autoComplete="name"`.
- `:287` `email` input — missing `autoComplete="email"` and `spellCheck={false}`.
- `:304` `phone` input — `type="tel"` + `inputMode="tel"` + `autoComplete="tel"`
  (currently defaults to text/none).
- `:412` (`quote-total`) — the total updates as party size changes with no
  `aria-live="polite"`, so screen-reader users get no announcement.
- On submit with a server error, focus is not moved to the first invalid field.
- `namePlaceholder` / `hotelPlaceholder` don't end with `…` (they do show a clear
  example pattern, so this is cosmetic).

**src/seo/price.ts**
- `:108`–`:109` — prices are hardcoded strings (`"35 € / person"`) rather than
  `Intl.NumberFormat`; thousands won't group (`1144 €`), and the currency symbol is
  fixed to €. Same pattern in `book-form.tsx` (`€`, `≈ … MAD`).

**src/app/[locale]/[slug]/page.tsx**
- `:252` and `:268` — the decorative `✓` / `✕` glyphs are plain `<span>` inside list
  items; add `aria-hidden="true"` so a screen reader doesn't read "check mark"/"✕".

**src/app/globals.css**
- `:44` region — no `color-scheme` declared on `:root`/`html`. With a dark theme,
  native `<select>` dropdowns and the `type="date"` picker can render light-on-dark.
  Add `color-scheme: light dark`.
- No `touch-action: manipulation` and no intentional `-webkit-tap-highlight-color`.
- Prices/quote totals have no `font-variant-numeric: tabular-nums`, so digits shift
  width as the live quote updates.

**What already passes (keep):**
- Skip link (`layout.tsx`), global `:focus-visible` outline, `prefers-reduced-motion`
  handling, `scroll-behavior` guarded.
- Semantic HTML throughout: `<header>/<nav>/<main>/<footer>`, `<button>` vs `<a>`,
  no `<div onClick>` anywhere (`onClick` only on real `<select>`/`<input>`).
- Every form control has a `<label htmlFor>`; errors are inline with
  `aria-invalid` + `aria-describedby`; the honeypot is `aria-hidden`.
- Touch targets use `min-h-[44px]` for primary actions and `min-h-[40px]` for nav.
- `transition-colors` (never `transition: all`), `line-clamp-3` on summaries,
  `text-balance` on the home `<h1>`, `…` already used in "Sending…".
- Safe-area insets on `body`; no images, so no missing-`alt`/CLS issues (see §2.2).

### 2.2 UX gaps vs the market leaders

Ranked by expected impact for a small local operator:

1. **No imagery at all.** Product pages are text-only. Per the photo research this
   is the biggest trust/desire gap; it is also why cards read as "efficient" rather
   than *tempting*. Needs real photography (client-supplied; the build guard already
   blocks placeholder brand data, and stock would hurt us).
2. **No social proof.** No ratings or reviews on cards or product pages, while
   competitors show "Millions of reviews" / star ratings. Even a handful of genuine
   tour-specific quotes placed after the itinerary would help.
3. **Booking lives off-page.** The product CTA links to `/book?service=<id>`; there
   is no date/party picker or sticky mobile CTA on the product page. The quote engine
   already supports party/option/route/vehicle, so an embedded or sticky panel is a
   natural next step.
4. **Trust facts are buried.** "Free cancellation" and "pay on the day" sit in the
   *Good to Know* block and the form footnote, far from the primary CTAs. Surface
   them as a compact strip beside every CTA (this is exactly Viator's `Free
   cancellation · 24/7 support · reviews` pattern, and we can honestly claim the first
   two plus WhatsApp).
5. **No search / intent merchandising on home.** Home steps through the three
   categories by name. A lightweight "Popular in Agadir / Day trips / Transfers"
   framing would match GYG/Viator without needing a search backend.
6. **Weak per-locale number formatting** (see 2.1) — polish, not a blocker.

### 2.3 Prioritised recommendations

**P1 — cheap, high-signal (no new infra):**
- Fix the input focus ring; add `autoComplete`/`inputMode`/`spellCheck`; `aria-live`
  on the quote; `aria-hidden` on ✓/✕; `color-scheme` + `tabular-nums`; move
  `Intl.NumberFormat` into `src/seo/price.ts` and reuse it in the form.
- Add a **sticky mobile CTA bar** on product pages ("Check availability · from X €")
  pointing at the same booking form.
- Repeat a **trust strip** (free cancellation · no prepayment · WhatsApp 7/7) beside
  the primary CTA at the top and bottom of product pages.

**P2 — product work:**
- **Reviews:** add a `reviews` field to the content model and a tour-specific
  reviews section after the itinerary; render `AggregateRating` only for genuine
  reviews (JSON-LD already gates on this).
- **Embedded availability:** a date + party selector on the product page that
  deep-links into `/book`, so the estimate is visible without leaving the page.
- **Intent-led home merchandising** (popular excursions / activities / transfers).

**P3 — brand & content:**
- Real photography and a subject-specific gallery once assets exist;
  `opengraph-image` and cards should eventually use a representative photo.
- A native French copy pass on high-traffic pages (English-in-French and the draft
  marker are already gated by `validate-data`).

**Leave alone:** the current palette/type identity is the client's deliberate keep;
nothing here requires a re-theme.

---

## Sources

- GetYourGuide homepage (live, rendered 2026-10-04).
- Viator homepage (live, rendered 2026-10-04).
- AtlasPerk, *Tour Page Design for Travel: Layout, UX & Conversion Guide* (2026).
- Ralabs, *Booking UX best practices that drive conversions* (2025).
- Lazarev.agency, *Travel & event UX/UI design mistakes to avoid*.
- Vercel **Web Interface Guidelines** (`vercel-labs/web-interface-guidelines`).
