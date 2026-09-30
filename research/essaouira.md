# essaouira — research notes

- Product id: `essaouira`
- Researched: 2026-09-30
- Start point: central Agadir, Boulevard du 20 Août area
- Verdict: the long-day framing is correct. The draft's "2.5 hours each way" is optimistic; use **about 3 hours each way**. The goats and the argan cooperative are real but seasonal and never guaranteed.

## 1. Verified route

| # | From → To | km | min (range) | Source | Confidence |
|---|---|---|---|---|---|
| 1 | Central Agadir → Tamri viewpoint (N1 north) | 70 | 60–75 | timlalin listings; slowsightsoul | verified |
| 2 | Tamri → argan cooperative area, around Ida Ou Gourd / Tamri | 20 | 20–30 | operator practice | likely |
| 3 | Cooperative → Essaouira (N1 north) | 85 | 75–95 | rome2rio; travelmath | likely |
| 4 | Essaouira → central Agadir (return, N1 south) | 175 | 150–180 | rome2rio; travelmath | verified |

- **Total round trip:** ~350 km
- **Total driving:** ~5 h to 6 h
- **Stop order check:** the catalogue order (Tamri → goats → cooperative → Essaouira) is correct: all the stops sit on the single N1 corridor before the city.
- **Distance conflict:** rome2rio gives 175 km / ~2 h 34; travelmath gives ~174 km / ~3 h 03. Conservative value used: **175 km, 2 h 45 to 3 h**. The draft FAQ's "about two and a half hours each way" should become "about three hours each way".

## 2. Recommended timeline

| Time | Step |
|---|---|
| 07:00–08:00 | Pickup in Agadir pickup zones (suggested departure about 07:30) |
| 08:30–08:50 | Tamri panoramic stop over the Atlantic coastline |
| 08:50–09:20 | Goats in argan trees, if the season and local conditions allow (spontaneous, not guaranteed) |
| 09:20–09:50 | Argan oil cooperative |
| 10:15–10:45 | Arrival in Essaouira |
| 10:45–13:00 | Fortified medina, ramparts, skala, harbour, cannons and souks |
| 13:00–15:30 | Free time for lunch, galleries and shops |
| 15:30–16:00 | Departure from Essaouira (about 16:00) |
| 16:00–19:00 | Return to Agadir, arriving about 19:00 to 19:30 depending on traffic |

- Comparable operators publish the same pattern: depart about 07:30, about 3 hours in the city of free time, return about 19:00, total about 11 to 12 hours (tazwittours; GetYourGuide Essaouira-from-Agadir listings, duration comparison only).
- Real-world reports note the day is long and that the free time in Essaouira feels short; a few travellers ask to skip the cooperative to gain time.
- **Recommended:** `durationHours` 11.5, `pickupWindow` "07:00 to 08:00", `returnApprox` "19:00 to 19:30".

## 3. Practicalities (checked 2026-09-30)

| Site | Days | Hours | Notes |
|---|---|---|---|
| Skala de la Ville (ramparts) | Every day | about 09:00–18:45 | Free to walk once on the ramparts |
| Skala du Port / harbour bastion | Every day | Daytime | Small entry reported (sources say ~10 MAD; others ~60 MAD — conflicting) |
| Essaouira medina and souks | Every day | Daytime into the evening | UNESCO-listed medina |
| Fishing harbour | Every day | Daytime (busiest mornings) | Working port |

- **Entrance fees (research only):** conflicting reports for the Skala du Port (about 10 MAD vs about 60 MAD). Treat as unverified. **Never publish.**
- **Seasonality:** Essaouira is famously windy (the "windy city"), strongest in summer; a light jacket helps year-round. Sea can be rough in winter. Agadir/Essaouira winter sunsets around 18:30, so the return is partly after dark in winter.
- **Argan goats:** seen along the Agadir–Essaouira corridor, most reliably in the drier months and generally late morning to mid-afternoon, when traffic is heaviest (National Geographic). It is a spontaneous herding sight, **never guaranteed**.
- **Effort:** long day, about 5 to 6 hours on the road, plus 2 to 3 hours of walking on medina streets and ramparts.
- **Safety norms (typical industry practice, to be confirmed by our operator):** none specific; standard road safety. Keep clear of the harbour edge and the sea wall in high wind.
- **What to bring:** light jacket (wind), comfortable shoes, hat, sunscreen, cash for lunch and shopping.
- **Etiquette:** Essaouira is presented as a **historic Atlantic port city (Mogador)**, not an imperial city. Modest dress is more comfortable. Ask before photographing people and the fish market.

## 4. Discrepancies

| # | Draft/catalogue says | Finding | Recommended correction | Priority |
|---|---|---|---|---|
| 1 | FAQ: "About two and a half hours each way with stops" | Realistic is about 3 hours each way | Change to "about three hours each way" | should fix |
| 2 | `durationHours` 11.5, return 19:00 | Return is realistically 19:00–19:30 | "19:00 to 19:30" | minor |
| 3 | Goat stop in the itinerary | Genuine but spontaneous, best in drier months, late morning to mid-afternoon | Keep as an optional sight, never guaranteed | minor |
| 4 | "Tamri: panoramic stop over the Atlantic coastline" | Accurate; Tamri also has a river mouth and bird life | Keep | minor |
| 5 | Entrance fees to monuments "if applicable" | Skala fee reports conflict | Keep out of website copy | minor |
| 6 | `contentNote`: present as Mogador, not imperial | Correct and required | Keep | minor |

## 5. Sources

| URL | Title | Accessed | Supports |
|---|---|---|---|
| https://www.rome2rio.com/s/Agadir/Essaouira | Agadir to Essaouira | 2026-09-30 | 175 km, about 2 h 34 driving |
| https://www.travelmath.com/driving-time/from/Agadir,+Morocco/to/Essaouira,+Morocco | Driving time from Agadir to Essaouira | 2026-09-30 | about 3 h 03 driving time |
| https://www.nationalgeographic.com/animals/article/moroccos-tree-climbing-goats | The real story behind Morocco's tree-climbing goats | 2026-09-30 | goats stand late morning to mid-afternoon where traffic is heaviest |
| https://www.trip.com/moments/detail/essaouira-21788-120027886/ | La Skala, Essaouira | 2026-09-30 | Skala de la Ville open about 09:00–18:45 |
| https://marocmama.com/everything-need-know-essaouira/ | Visiting Essaouira | 2026-09-30 | Skala entry fee reports (conflicting) |
| https://www.tazwittours.com/essaouira-day-trip-from-agadir/ | Essaouira Day Trip from Agadir | 2026-09-30 | about 175 km, about 3 hours by car (timing comparison only) |

## 6. Open questions for the operator

1. Which argan cooperative is the standard stop on the Essaouira road, and is it the same one used on the Paradise Valley route?
2. Is the Tamri stop a viewpoint or a longer riverside stop?
3. Given the 16:00 departure from Essaouira, is the 19:00 return realistic in high-season traffic?
