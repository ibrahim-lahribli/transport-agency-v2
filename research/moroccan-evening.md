# moroccan-evening — research notes

- Product id: `moroccan-evening`
- Researched: 2026-09-30
- Start point: central Agadir, Boulevard du 20 Août area
- Verdict: the shape of the evening is fine, but **the venue is not identified anywhere**, which blocks publication. Everything about the programme, menu and drinks depends on the venue.

## 1. Verified route

| # | From → To | km | min (range) | Source | Confidence |
|---|---|---|---|---|---|
| 1 | Central Agadir → evening venue | 10–20 | 20–30 | operator practice; venue-dependent | unverified |
| 2 | Venue → central Agadir (return) | 10–20 | 20–30 | as above | unverified |

- **Total round trip:** ~20 to 40 km
- **Total driving:** ~40 to 60 min
- **Stop order check:** not applicable; it is a transfer to a single venue plus the show.
- **Location caution:** no Agadir venue is named in the catalogue, the draft JSON or any source I could verify. The example widely seen online (Chez Ali) is a **Marrakech** venue, not Agadir, and must not be presented as the Agadir venue. Route confidence is **unverified** until the operator names the venue.

## 2. Recommended timeline

| Time | Step |
|---|---|
| 19:00–19:30 | Evening hotel pickup |
| 19:45–20:15 | Arrival at the venue and welcome |
| 20:15–21:15 | Traditional Moroccan dinner |
| 21:15–22:30 | Live music, folklore and dance performances |
| 22:30–22:45 | Fantasia horse performance (programme permitting) |
| 22:45–23:15 | Closing acts and departure |
| 23:15–23:45 | Return transfer to your hotel |

- Comparable evening products run roughly 4 to 4.5 hours including transfers, with pickup about 19:00 and return about 23:00 to midnight.
- **Recommended:** `durationHours` 4, `pickupWindow` "19:00 to 19:30", `returnApprox` "23:00 to 23:30". Unchanged from the draft, pending venue confirmation.

## 3. Practicalities (checked 2026-09-30)

- **Fixed hours:** venue-dependent and not confirmed. Typically one sitting per evening.
- **Entrance fees (research only):** the dinner and show are the product; no separate monument fees. Drinks beyond those served may be extra. Never published on the website.
- **Fantasia (tbourida) check:** the description in the draft FAQ is broadly right — a traditional Moroccan equestrian display in which riders in traditional dress charge in a line and fire muskets into the air. Tbourida was inscribed on UNESCO's intangible heritage list in 2021.
- **Seasonality:** evening programmes can change or stop during Ramadan. Outdoor shows depend on the weather. Summer evenings are warm; winter evenings are cool, so a light layer helps.
- **Effort:** low. Sitting for dinner and a show, with some walking on arrival.
- **Safety norms (typical industry practice, to be confirmed by our operator):** the fantasia is performed by trained riders in a controlled arena; guests stay behind the barriers. Live fire acts, where they feature, are performed by professionals. Not to be stated as our policy.
- **What to bring:** a light layer for the evening, cash for drinks and tips.
- **Etiquette:** dress is smart-casual; ask before photographing performers; tipping is customary but optional.

## 4. Discrepancies

| # | Draft/catalogue says | Finding | Recommended correction | Priority |
|---|---|---|---|---|
| 1 | The product lists no venue | No Agadir venue is confirmed in any source; the well-known Chez Ali is in Marrakech | **Name the venue before publishing**; keep copy venue-neutral until then | **blocks publication** |
| 2 | "Programme, menu and venue vary by provider and season and must be confirmed before publication" | Correct and important | Keep the hedge; do not publish until confirmed | **blocks publication** |
| 3 | FAQ describes fantasia with muskets fired in the air | Accurate description of tbourida | Keep | minor |
| 4 | Drinks policy "Water or a soft drink with dinner may be included" | Genuinely uncertain | Keep as an operator question; do not claim inclusion | should fix |
| 5 | Summer/winter return time fixed at 23:00–23:30 | Venue-dependent | Keep pending confirmation | minor |
| 6 | Ramadan note | Correct | Keep | minor |

## 5. Sources

| URL | Title | Accessed | Supports |
|---|---|---|---|
| https://ich.unesco.org/en/RL/tbourida-01404 | UNESCO: Tbourida (intangible heritage) | 2026-09-30 | what fantasia/tbourida is and its heritage status |
| https://www.viator.com/tours/Marrakech/Marrakech-Chez-Ali-Fantasia-Folklore-Show-and-Moroccan-Dinner/d5408-450108P1 | Chez Ali Fantasia Folklore Show and Moroccan Dinner | 2026-09-30 | typical evening format (Marrakech only; format comparison) |
| https://www.headout.com/cabarets/... | Chez Ali Fantasia night of folklore and feasting | 2026-09-30 | typical evening length and content (comparison only) |

## 6. Open questions for the operator

1. **Which venue in the Agadir area is used, and what is its address?**
2. What exactly does the programme include (music, folklore, dance, fantasia, fire acts), and on which nights?
3. What is included to drink, and is there a vegetarian or child option on the menu?
