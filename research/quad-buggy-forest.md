# quad-buggy-forest.md — research notes

- Product id: `quad-buggy-forest`
- Researched: 2026-09-30
- Start point: central Agadir, Boulevard du 20 Août area
- Verdict: the draft's "about 20 minutes transfer" and "1.5 to 2 hours riding" are plausible. **The exact off-road base is not confirmed** and must be treated as unverified.

## 1. Verified route

| # | From → To | km | min (range) | Source | Confidence |
|---|---|---|---|---|---|
| 1 | Central Agadir → off-road base (south/Souss direction, Tifnit-side) | 22 | 20–30 | agadir-visite.com ("25 km south, on the Tiznit road"); operators describing a 20-minute transfer | unverified |
| 2 | Base → forest and dune trails (on the machines) | 15 | 45–60 | operator practice | unverified |
| 3 | Base → central Agadir (return) | 22 | 20–30 | as above | unverified |

- **Total round trip (road):** ~45 km
- **Total road driving:** ~40 min to 1 h
- **Stop order check:** the catalogue order (pickup → transfer → briefing → ride → mint tea → return) is logical and does not need changing.
- **Location caution:** operators describe the base variously as "an eucalyptus forest just outside Agadir", "25 km south on the Tiznit road" and "Tifnit". One source names a base about 25 km south. Because the exact site is not agreed across sources, the route confidence is marked **unverified** and the copy keeps the location generic ("near Agadir", "forest and dunes").

## 2. Recommended timeline

| Time | Step |
|---|---|
| 08:45–09:00 | Hotel pickup (for the 09:00 departure) |
| 09:00–09:20 | Transfer to the off-road base |
| 09:20–09:40 | Safety briefing and equipment preparation |
| 09:40–11:30 | Ride through eucalyptus forest and dune landscapes (about 1.5 to 2 hours) |
| 11:30–11:50 | Traditional mint tea break |
| 11:50–12:15 | Return transfer to your hotel |

- The 14:00 and 16:00 departures follow the same shape.
- Comparable operators publish about 1.5 to 2 hours of riding plus transfers, and about 2 to 3 hours door to door (quadbikeagadir.com; getyourguide buggy listings).
- **Recommended:** `durationHours` 3, `pickupWindow` "08:45 to 09:00" (morning slot), `returnApprox` "11:45 to 12:30".

## 3. Practicalities (checked 2026-09-30)

- **Fixed hours:** none; three departures a day (09:00, 14:00, 16:00), subject to weather and availability.
- **Entrance fees (research only):** none. Not applicable. Some operators sell photos or video separately.
- **Seasonality:** dust is worst in dry conditions; sand can be hot at midday in summer. The **16:00 slot runs into sunset in winter** (Agadir sunset about 18:30 in December–January) — see the discrepancy table. Cooler, less dusty mornings are often best.
- **Effort:** moderate to high. Off-road driving with bumps; guests with back or heart problems or who are pregnant should not take part.
- **Safety norms (typical industry practice, to be confirmed by our operator):** a safety briefing before riding; helmets and goggles supplied by the operator (gloves sometimes too); quad riders typically must be old enough to drive, with children riding as passengers, and buggies typically seat two to four; machines should be followed at a safe distance. Not to be stated as our policy.
- **What to bring:** closed shoes, long trousers if possible, sunglasses, scarf or buff for dust.
- **Etiquette:** none specific; follow the lead driver's signals and stay on the marked route.

## 4. Discrepancies

| # | Draft/catalogue says | Finding | Recommended correction | Priority |
|---|---|---|---|---|
| 1 | "About 20 minutes transfer to the activity location" | Plausible, but the base location is not agreed across sources | Keep 20–30 min as a range; mark location unverified and keep copy generic | should fix |
| 2 | `durationHours`: "1.5 to 2 riding; about 3 door to door" | Consistent with comparable operators | Set `durationHours` 3; keep the riding range in the copy | minor |
| 3 | `seasonalNotes`: "Check that the 16:00 slot still ends before dark in winter" | 16:00 + 3 h ends about 19:00, after the ~18:30 winter sunset | Keep the warning; recommend confirming a seasonal 16:00 slot | should fix |
| 4 | "Guided quad or buggy ride" (catalogue) | Uses "guide" | Use "with a driver who leads the ride" | should fix |
| 5 | `days`: "Daily, subject to availability and weather" | Reasonable | Keep | minor |
| 6 | Buggy described as a two-seat off-road car | Correct; some buggies seat up to four | Keep the two-seat description, note capacity may vary | minor |

## 5. Sources

| URL | Title | Accessed | Supports |
|---|---|---|---|
| https://quadbikeagadir.com/en/trip/agadir-dune-buggy-adventure/ | Agadir Dune Buggy Adventure | 2026-09-30 | about 2 h of riding plus transfer; departures 09:00 and 14:00 |
| https://agadir-visite.com/en/reservation/tour-en-quad-a-agadir/ | Quad biking in Agadir | 2026-09-30 | base about 25 km south of Agadir on the Tiznit road |
| https://quads-agadir.com/en/blog/agadir-quad-safety-beginners | Quad Biking in Agadir: Safe for Beginners? | 2026-09-30 | helmets and gloves provided; children often as passengers |
| https://www.timeanddate.com/sun/morocco/agadir | Sunrise and sunset times in Agadir | 2026-09-30 | winter sunset about 18:30, relevant to the 16:00 slot |

## 6. Open questions for the operator

1. Where exactly is the off-road base, and is it the forest or the dune site?
2. What are the minimum ages and licence rules for quad and buggy, and is a helmet always provided?
3. Is the 16:00 departure run in winter, and if so, does it end before dark?
