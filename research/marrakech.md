# marrakech — research notes

- Product id: `marrakech`
- Researched: 2026-09-30
- Start point: central Agadir, Boulevard du 20 Août area
- Verdict: doable as a long day. The real operational risk is **Majorelle Garden**: it uses timed, advance tickets, so a late-morning arrival can fail to get in.

## 1. Verified route

| # | From → To | km | min (range) | Source | Confidence |
|---|---|---|---|---|---|
| 1 | Central Agadir → Marrakech (A7 toll motorway) | 250 | 165–210 | authentictours; rome2rio; agadirdrive.com | verified |
| 2 | Driving between stops inside Marrakech and parking | 15 | 20–40 | map estimate | likely |
| 3 | Marrakech → central Agadir (return, A7) | 250 | 165–210 | as above | verified |

- **Total round trip:** ~515 km
- **Total driving:** ~5 h 30 to 7 h 20
- **Stop order check:** the catalogue order (Koutoubia → Majorelle → Jemaa el-Fnaa → medina and souks) is sensible: Koutoubia and Majorelle lie north/west of the medina, and Jemaa el-Fnaa is the natural hub before the medina/souk wander.
- **Distance conflict:** rome2rio gives 246 km / about 2 h 37; travelmath about 2 h 45; agadirdrive.com 250 km / about 2 h 50; some forum estimates 3.5 h with stops. Conservative value used: **250 km, 2 h 45 to 3 h 30**.

## 2. Recommended timeline

| Time | Step |
|---|---|
| 07:00–08:00 | Pickup in Agadir pickup zones (suggested departure about 07:30) |
| 08:30–08:45 | Short rest stop on the motorway |
| 10:45–11:15 | Arrival in Marrakech |
| 11:15–11:45 | Koutoubia Mosque, seen from the outside; history and architecture explained |
| 12:00–13:15 | Majorelle Garden (timed entry) |
| 13:30–15:00 | Free time for lunch |
| 15:00–16:00 | Jemaa el-Fnaa and the medina and souks |
| 16:00 | Departure from Marrakech |
| 16:00–19:00 | Return drive to Agadir, arriving about 19:00 to 19:30 |

- Comparable operators run this as a very long day of about 12 to 14 hours, and reviews frequently describe the time in Marrakech as short. That is the honest framing.
- **Recommended:** `durationHours` 12, `pickupWindow` "07:00 to 08:00", `returnApprox` "19:00 to 19:30".

## 3. Practicalities (checked 2026-09-30)

| Site | Days | Hours | Notes |
|---|---|---|---|
| Majorelle Garden | Every day | 08:00–18:30, last entry 18:00 | Timed tickets; official site advises buying in advance |
| Koutoubia Mosque | — | Viewed from outside only | Non-Muslims cannot enter mosques in Morocco |
| Jemaa el-Fnaa | Every day | Open square, busiest from late afternoon | UNESCO intangible cultural heritage |
| Medina and souks | Every day | Daytime into the evening | Free to walk |

- **Entrance fees (research only):** Majorelle Garden carries an entrance fee (reported around 150 MAD, higher with combined tickets; conflicting listings) and is **not included**. Never published on the website.
- **Seasonality:** Marrakech is inland and much hotter than Agadir in summer; the early start and midday shade matter. Winter days are mild but mornings on the motorway can be cold and foggy in the Chichaoua stretch.
- **Effort:** high. About 6 hours on the road, plus 2 to 3 hours of walking in heat. Long for young children. The draft's note that children under 6 may find it tiring is fair.
- **Safety norms (typical industry practice, to be confirmed by our operator):** none specific; standard road safety. The medina is busy and pickpocket-aware walking is sensible in Jemaa el-Fnaa.
- **What to bring:** comfortable walking shoes, light clothing covering shoulders and knees for the medina, hat, sunscreen, cash for lunch and entrance fees, a light jacket for the return drive.
- **Etiquette:** modest dress in the medina; ask before photographing people, performers and stallholders; Jemaa el-Fnaa performers may expect a small tip if photographed.

## 4. Discrepancies

| # | Draft/catalogue says | Finding | Recommended correction | Priority |
|---|---|---|---|---|
| 1 | Majorelle Garden in the itinerary, entrance "not included" | Requires **timed advance tickets**; a late-morning group may not get a slot | Flag for the operator; recommend pre-booking the slot or offering Majorelle as optional | **blocks publication** |
| 2 | Koutoubia "admired from the outside" | Correct; non-Muslims cannot enter | Keep | minor |
| 3 | FAQ: "Is Marrakech doable in a day from Agadir?" | Yes but long; reviews often note short city time | Keep honest framing about the long day | minor |
| 4 | `returnApprox` "19:00 to 19:30" | Plausible with a 16:00 departure | Keep | minor |
| 5 | "Minimum group of 4" | Operator-specific | Confirm | minor |
| 6 | Majorelle entrance fee figure | Listings conflict (~150 MAD and higher) | Keep out of website copy | minor |

## 5. Sources

| URL | Title | Accessed | Supports |
|---|---|---|---|
| https://www.jardinmajorelle.com/en/ | Site officiel Jardin Majorelle | 2026-09-30 | daily 08:00–18:30, last entry 18:00 |
| https://www.jardinmajorelle.com/en/thegarden/ | Jardin Majorelle: the garden | 2026-09-30 | opening hours and last entry |
| https://www.rome2rio.com/s/Agadir/Marrakesh | Agadir to Marrakesh | 2026-09-30 | 246 km, about 2 h 37 driving |
| https://www.travelmath.com/driving-time/from/Agadir,+Morocco/to/RAK | Driving time from Agadir to Marrakech | 2026-09-30 | about 2 h 45 driving time |
| https://agadirdrive.com/agadir-to-marrakech-road-trip/ | Agadir to Marrakech by Car | 2026-09-30 | 250 km on the motorway, about 2 h 50 |
| https://whc.unesco.org/en/list/331 | Medina of Marrakesh (UNESCO) | 2026-09-30 | medina status |

## 6. Open questions for the operator

1. How does he handle Majorelle Garden timed tickets on a day trip from Agadir?
2. Is the Koutoubia stop a short photo stop or a longer explanation?
3. Is the minimum group of 4 firm, and what happens below that number?
