# timlalin-dunes — research notes

- Product id: `timlalin-dunes`
- Researched: 2026-09-30
- Start point: central Agadir, Boulevard du 20 Août area
- Verdict: **the draft timings are wrong and block publication.** The real Timlalin (Timlaline) dunes sit about 67–70 km north of Agadir, near Tamri, which is roughly **1 h to 1 h 15 each way** — not the "30 to 45 minutes" written in the draft. Total door-to-door is about 5.5 hours, not "2.5 to 3".
- Per the client decision this session, the page is corrected to the **real Timlalin** timings and flagged to the operator.

## 1. Verified route

| # | From → To | km | min (range) | Source | Confidence |
|---|---|---|---|---|---|
| 1 | Central Agadir → Tamri / Timlaline dunes (N1 north) | 68 | 60–80 | slowsightsoul-slowtravelblog.com; instagram reel (67 km from Agadir, 44 km from Tamri); agadirdunesadventures.com | verified |
| 2 | Dunes area itself (short vehicle moves between camel, quad, sandboard spots) | 5 | 10–20 | operator practice | likely |
| 3 | Timlaline → central Agadir (return, N1 south) | 68 | 60–80 | as above | verified |

- **Total round trip:** ~140 km
- **Total driving:** ~2 h 10 to 2 h 45
- **Stop order check:** the catalogue order (camel → quad → sandboarding → sunset) is fine; the site itself determines the order.
- **Location conflict:** one operator page describes the drive as "south of Agadir"; that is wrong. The dunes are **north**, past Tamri on the N1 toward Essaouira, near Taboga. Several sources place Timlaline near Tamri / Imsouane.
- **Naming:** Timlalin / Timlaline is marketed by many operators as a "mini Sahara" or "Sahara dune adventure". This wording must **never** be used; these are Atlantic coastal dunes.

## 2. Recommended timeline

Daytime option:

| Time | Step |
|---|---|
| 08:30–09:30 | Hotel pickup in Agadir pickup zones |
| 09:30–10:45 | Drive north on the N1 to the dunes |
| 10:45–11:30 | Camel ride through the dunes, with Atlantic views |
| 11:30–12:30 | Quad ride of about one hour over the dunes |
| 12:30–13:00 | Sandboarding on the dune slopes |
| 13:00–13:15 | Break and photos |
| 13:15–14:45 | Return drive to Agadir, arriving about 13:45 to 14:45 |

Sunset option: pickup about 15:30–16:30, activities through the late afternoon, and return shortly after sunset (roughly 18:45 in winter, 20:15 in summer).

- Comparable operators treat Timlaline as roughly a half day because of the drive; several OTA pages run it as a longer shuttle with free time at the dunes.
- **Recommended:** `durationHours` 5.5, `pickupWindow` "08:30 to 09:30", `returnApprox` "13:45 to 14:45" (daytime); sunset option with its own window.

## 3. Practicalities (checked 2026-09-30)

- **Fixed hours:** none; the dunes are open land. Sunset departures are seasonal.
- **Entrance fees (research only):** none for the dunes. Not applicable.
- **Seasonality and sun:** sand can be very hot underfoot at midday in summer; mornings and late afternoons are better. Agadir-area sunset runs from about 18:45 in December–January to about 20:15 in June–July, so the sunset option returns late in summer. Sand is firmer after rain.
- **Effort:** mostly sitting (camel, quad) plus some walking on sand; the long drive is the main factor.
- **Safety norms (typical industry practice, to be confirmed by our operator):** quad riders are typically required to be old enough to drive safely (often 16+, with younger guests riding as passengers); helmets and a safety briefing are standard; quad and camel riding are not recommended in pregnancy or with back or heart problems. Camel riding can be uncomfortable for long periods. Not to be stated as our policy.
- **What to bring:** closed shoes, sunglasses, scarf or buff for sand, sunscreen, a light layer for sunset.
- **Etiquette:** agree any camel or quad price and duration before starting; tipping the handler is customary but optional.

## 4. Discrepancies

| # | Draft/catalogue says | Finding | Recommended correction | Priority |
|---|---|---|---|---|
| 1 | "transfer time to be confirmed, about 30 to 45 minutes" | Real drive is 60–80 min each way | Correct to "about 1 hour to 1 hour 15 each way" | **blocks publication** |
| 2 | `durationHours`: "2.5 to 3 including transfer" | With ~2.5 h driving plus ~2 h of activities, door-to-door is about 5.5 h | Set `durationHours` 5.5 | **blocks publication** |
| 3 | Summary: "Golden Atlantic dunes near Agadir" | Dunes are ~70 km north, near Tamri | Say "north of Agadir, near Tamri" | should fix |
| 4 | Catalogue: "Timlalin / Timlaline Desert Experience" | Not a desert; small coastal dunes | Never use "desert" or "Sahara" | should fix |
| 5 | Sunset option | Seasonal, returns late in summer | Keep "seasonal"; state the winter/summer sunset range | minor |
| 6 | Content note says this page bundles camel and quad to avoid competing with the forest page | Sound; keep the two pages distinct | Keep | minor |

## 5. Sources

| URL | Title | Accessed | Supports |
|---|---|---|---|
| https://www.slowsightsoul-slowtravelblog.com/timlalin-dunes-guide-in-morocco/ | Timlalin Dunes in Morocco: Complete Guide and Tips | 2026-09-30 | 70 km from Agadir on the N1 |
| https://ranchtamri.com/timlaline-dunes | Timlaline Dunes (Timlalin): Mini Sahara Near Agadir | 2026-09-30 | about an hour north along the coast road, past Tamri |
| https://www.agadirdunesadventures.com/ | Things to Do in Agadir: Sandboarding, Quad Biking and Camel | 2026-09-30 | about 45 km to Tamri, dunes just before it |
| https://activities.marriott.com/africa/morocco/agadir/activities/timlalin_dunes_sandboarding_from_agadir-XG1FCU | Timlalin Dunes and Sandboarding From Agadir | 2026-09-30 | dunes near Taboga Beach (location) |
| https://www.tripadvisor.com/Attraction_Review-g7698321-d26517779-Reviews-Timlalin_Dunes-Imsouane_Souss_Massa.html | Timlalin Dunes (traveller reviews) | 2026-09-30 | location between sea and mountains near Tamri |
| https://www.timeanddate.com/sun/morocco/agadir | Sunrise and sunset times in Agadir | 2026-09-30 | sunset range for the sunset option |

## 6. Open questions for the operator

1. Is the ~70 km drive to the real Timlalin acceptable to him, or does he use a closer dune site under the same name?
2. What is the minimum age for quad driving and for camel riding, and what protective gear is provided?
3. What are the exact sunset-option pickup and return times in winter and in summer?
