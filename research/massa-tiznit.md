# massa-tiznit — research notes

- Product id: `massa-tiznit`
- Researched: 2026-09-30
- Start point: central Agadir, Boulevard du 20 Août area
- Verdict: the route works as a **southbound loop**. The Youssef Ben Tachfine Dam **is** genuinely on the Massa–Tiznit corridor, so its place in the catalogue is correct. Wording fixes are needed (never "desert"/"Sahara").

## 1. Verified route

The stops run roughly north to south; the return is straight up the N1 from Tiznit to Agadir.

| # | From → To | km | min (range) | Source | Confidence |
|---|---|---|---|---|---|
| 1 | Central Agadir → Tifnit / pottery stop (N1 south, then coast road) | 28 | 35–45 | agadir-visite.com (quad base "25 km south on the Tiznit road"); operator practice | likely |
| 2 | Tifnit → Souss-Massa National Park / Oued Massa | 22 | 25–35 | explore-agadirsoussmassa.com | likely |
| 3 | Oued Massa → Youssef Ben Tachfine Dam | 18 | 20–30 | mapcarta.com (29.845 N, 9.495 W, Tiznit Province) | likely |
| 4 | Dam → Tiznit medina | 28 | 30–40 | map estimate | likely |
| 5 | Tiznit → central Agadir (N1 north) | 95 | 90–105 | map estimate; rome2rio Tiznit–Agadir | likely |

- **Total round trip:** ~190 km (a loop, not out-and-back)
- **Total driving:** ~3 h 20 to 4 h 30
- **Stop order check:** the catalogue order (pottery → coast → Souss-Massa → Tiznit → lunch → dunes → dam → return) is **partly wrong**. Placing the dam last after the dunes does not fit the geography: the dam is **north** of Tiznit, on the Oued Massa, so it belongs **between Massa and Tiznit**, not after Tiznit. Recommended order: pottery → Atlantic coast / Tifnit → Souss-Massa and Oued Massa → Youssef Ben Tachfine Dam → Tiznit (medina, silver souks, lunch) → coastal dunes on the return → Agadir. This removes a backtrack.

## 2. Recommended timeline

| Time | Step |
|---|---|
| 08:00–09:00 | Pickup in Agadir pickup zones |
| 09:15–09:45 | Pottery workshop (artisans, wheel demonstration) |
| 10:00–10:45 | Atlantic coast: Tifnit / fishing village and wild beach |
| 11:00–11:45 | Souss-Massa National Park / Oued Massa: landscapes and, depending on the season, birds and wildlife |
| 12:00–12:30 | Youssef Ben Tachfine Dam: viewpoint over the reservoir |
| 13:00–15:00 | Tiznit: medina, silver souks, then traditional lunch |
| 15:30–16:00 | Small coastal dunes on the return |
| 16:00–17:00 | Return drive to Agadir, arriving around 17:00 |

- Comparable operators run this as a full day of about 8 to 9 hours with lunch (GetYourGuide "Mini Sahara, Pottery Craft and Berber Lunch Day Trip"; TripAdvisor Agadir–Tiznit day trips). HeadOut-style listings for the sibling Taroudant product run ~9.5 h.
- **Recommended:** `durationHours` 8.5, `pickupWindow` "08:00 to 09:00", `returnApprox` "17:00 to 17:45". Return is realistically **17:00–17:45**, not a flat 17:00.

## 3. Practicalities (checked 2026-09-30)

- **Fixed hours:** no fixed opening hours at the pottery workshop, the dunes or the dam viewpoint. Tiznit medina souks are daytime, generally every day, with a busy weekly souk day; the dam is active water infrastructure and viewpoint access can vary.
- **Entrance fees (research only):** the Souss-Massa National Park may charge a small entry in some areas; check on the day. Not published on the website.
- **Seasonality:** birdwatching is best in the cooler months, roughly November to March, plus spring and autumn migration, and early morning (birdingplaces.eu; frommers.com). The dam reservoir level has been low in recent drought years (researchgate.net). The dunes are small **coastal** dunes — never described as the Sahara.
- **Effort:** long day in the vehicle (~3.5 to 4.5 h driving) plus walking in Tiznit and on the dunes. Paved medina streets and flat sand.
- **Safety norms (typical industry practice, to be confirmed by our operator):** none specific beyond standard road safety. The dam viewpoint should be visited only from safe, permitted areas.
- **What to bring:** comfortable shoes, hat, sunglasses, sunscreen, cash for silver and pottery purchases.
- **Etiquette:** in Tiznit, ask before photographing people and shops; bargaining is normal in the souks; modest dress is more comfortable.

## 4. Discrepancies

| # | Draft/catalogue says | Finding | Recommended correction | Priority |
|---|---|---|---|---|
| 1 | Itinerary: "Small coastal dunes ... Youssef Ben Tachfine Dam ... Return" (dam after dunes) | The dam is **north of Tiznit**, on the Oued Massa, between Massa and Tiznit | Move the dam stop between Oued Massa and Tiznit | should fix |
| 2 | `returnApprox` "17:00" | Realistic return is 17:00–17:45 depending on traffic and lunch length | "17:00 to 17:45" | minor |
| 3 | Catalogue EN title "Massa & Tiznit – Coastal, Nature & Desert Experience"; FR "Paysages Désertiques" | "Desert" wording risks the Sahara impression; also inconsistent with the USA/UK rule | Already corrected in the draft title ("Coast, Nature & Dunes"); keep it that way in all copy | should fix |
| 4 | "Souss-Massa landscapes; wildlife and birdwatching depend on season" | Correct | Keep the seasonal wording; birds are best Nov–Mar | minor |
| 5 | Youssef Ben Tachfine Dam "panoramic views over the reservoir" | Plausible, but reservoir levels are low after drought and viewpoint access is uncertain | Keep the claim soft; confirm with the operator | should fix |
| 6 | Does this fit one day from Agadir? | Yes, as a loop of ~190 km; it is a full day | Keep as a full-day product | minor |
| 7 | "Traditional Moroccan or Berber lunch" included | Plausible; typical for these tours | Keep; confirm the venue and whether drinks are extra | minor |

## 5. Sources

| URL | Title | Accessed | Supports |
|---|---|---|---|
| https://mapcarta.com/W385158725 | Barrage Youssef ben Tachfine | 2026-09-30 | dam location 29.845 N, 9.495 W, Tiznit Province |
| https://fr.wikipedia.org/wiki/Barrage_Youssef_Ibn_Tachfin | Barrage Youssef Ibn Tachfin | 2026-09-30 | dam on the Oued Massa, Tiznit Province |
| https://explore-agadirsoussmassa.com/en/inland-fishing-in-the-souss-massa/ | Inland Fishing in the Souss Massa | 2026-09-30 | dam about 1 h / 60 km from Agadir |
| https://www.birdingplaces.eu/en/birdingplaces/morocco/mouth-of-the-oued-massa | Mouth of the Oued Massa | 2026-09-30 | year-round birding; spring and autumn migration |
| https://www.frommers.com/destinations/morocco/active-pursuits/bird-watching/ | Bird Watching in Morocco | 2026-09-30 | flamingos and best window September to April |
| https://www.researchgate.net/publication/343395543_Impact_of_drought_on_water_quality_in_the_Youssef_Ben_Tachafine_dam_Souss-Massa_region_Morocco | Impact of drought on water quality in the dam | 2026-09-30 | reservoir low levels after drought |
| https://agadir-visite.com/en/reservation/tour-en-quad-a-agadir/ | Quad biking in Agadir | 2026-09-30 | quad base about 25 km south on the Tiznit road (timing comparison only) |

## 6. Open questions for the operator

1. Which pottery workshop is used, and is it the one on the Agadir–Tiznit road?
2. Which dune stop is used on the return, and is it safe and accessible for all vehicles?
3. Is the Youssef Ben Tachfine Dam viewpoint currently open, given the low reservoir level?
