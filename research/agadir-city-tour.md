# agadir-city-tour — research notes

- Product id: `agadir-city-tour`
- Researched: 2026-09-30
- Start point: central Agadir, Boulevard du 20 Août area
- Verdict: route is short and geographically sensible. **Two fixes needed**: Souk El Had is closed on Mondays, and the Oufella managed site opens at 10:00.

## 1. Verified route

All stops are inside or immediately around the city, so distances are short.

| # | From → To | km | min (range) | Source | Confidence |
|---|---|---|---|---|---|
| 1 | Central Agadir → Agadir Marina | 2 | 5–10 | map estimate | likely |
| 2 | Marina → Agadir Oufella (Kasbah), uphill road | 6 | 12–18 | agadir-oufella.ma | likely |
| 3 | Oufella → Talborjt district | 3 | 8–12 | map estimate | likely |
| 4 | Talborjt → argan cooperative (city/outskirts) | 4 | 10–15 | operator practice | unverified |
| 5 | Cooperative → Souk El Had (Rue 2 Mars) | 5 | 12–20 | soukelhadagadir.com | likely |
| 6 | Souk El Had → hotels | 3 | 8–15 | map estimate | likely |

- **Total round trip:** ~25–30 km
- **Total driving:** ~55 min to 1 h 30, spread across the half day
- **Stop order check:** the catalogue order (Marina → Oufella → Talborjt → cooperative → Souk El Had) is geographically sensible. A natural loop: Marina (north/waterfront) → Oufella (hill) → Talborjt and city centre → cooperative → Souk El Had → hotels.
- The cable car (Téléphérique, ~1.7 km line) is a separate option that also reaches Oufella; this product uses the road with a vehicle.

## 2. Recommended timeline

| Time | Reference | Step |
|---|---|---|
| 09:00 | 14:30 alt. | Pickup in Agadir pickup zones |
| 09:15–09:45 | 14:45–15:15 | Marina: waterfront walk and photos |
| 10:00–10:45 | 15:30–16:15 | Oufella Kasbah: panoramic views over the city, the Atlantic and the region |
| 11:00–11:30 | 16:30–17:00 | Talborjt: the district and the city's story after the 1960 earthquake |
| 11:45–12:15 | 17:15–17:45 | Argan cooperative |
| 12:30–13:30 | 18:00–19:00 | Souk El Had: free time for spices, crafts, clothing, souvenirs |
| 13:45–14:00 | 19:15–19:30 | Drop-off at hotels |

- Comparable operators run this as a half day of about 4 hours with a similar stop list (GetYourGuide and Viator city-tour listings, duration comparison only).
- **Recommended:** `durationHours` 4; departures 09:00 and 14:30, with the **afternoon start moved to 15:00** so Oufella is reached after 10:00 opening in the morning case only — the morning 09:00 start still reaches Oufella at about 10:00, which is fine.
- Note: in winter the afternoon departure ends around 19:00–19:30; sunset in Agadir is about 18:20–18:45 in December–January, so the final souk stop happens after dark. This is workable but should be described honestly.

## 3. Practicalities (checked 2026-09-30)

| Site | Days | Hours | Notes |
|---|---|---|---|
| Souk El Had | **Tuesday to Sunday** | about 09:00–20:00 (some listings 06:00–20:30) | **Closed Mondays** for cleaning |
| Agadir Oufella (Kasbah) managed site | Every day | 10:00–19:00; summer to 20:00; Ramadan to 16:30 | Official site |
| Agadir Marina | Every day | Public waterfront, no fixed hours | — |
| Argan cooperative | Variable | Daytime | Informal visit |

- **Entrance fees (research only):** Kasbah/ramparts access and cable car are reported **inconsistently** — the official Oufella site describes admission from 10:00 with cable car tickets sold separately; third-party sources variously claim free site admission, about 90 MAD to enter, or about 130 MAD for the cable car. Because sources conflict, treat as unverified. **Never publish these on the website.**
- **Seasonality:** the afternoon departure is more comfortable in cooler months; the morning departure is better in summer. Agadir winter sunsets fall around 18:20–18:45 (timeanddate.com).
- **Effort:** low. Mostly short vehicle hops plus walking at the Marina and the souk. Souk El Had is large (thousands of stalls) and can be tiring; the ground is mostly paved.
- **Safety norms (typical industry practice, to be confirmed by our operator):** none specific. Standard road safety in the city.
- **What to bring:** comfortable shoes, hat and sunscreen, cash for shopping.
- **Etiquette:** at the souk, bargaining is normal and photographs of people should be asked for. Modest dress is more comfortable. The Kasbah area is an archaeological/historic site; stay on the marked areas.

## 4. Discrepancies

| # | Draft/catalogue says | Finding | Recommended correction | Priority |
|---|---|---|---|---|
| 1 | `days`: "Daily"; itinerary includes Souk El Had | Souk El Had is **closed on Mondays** | Mark the product "Tuesday to Sunday", or offer an alternative stop on Mondays | **blocks publication** |
| 2 | Itinerary places Oufella after a 09:00 start | Managed Oufella site opens at **10:00** | Keep 09:00 start; reach Oufella at/after 10:00 (as timetabled above) | should fix |
| 3 | FAQ: "professional driver who gives commentary. A dedicated guide can be arranged" | Contains the word "guide" | Use "driver and host"; say a separate host can be requested | should fix |
| 4 | `notIncluded`: "Optional licensed guide (on request)" | Same wording issue | "Optional host for the medina and souk (on request)" | should fix |
| 5 | Catalogue: "Tour guide when included in the selected package" | Contradicts the driver-only rule | Remove until credentials are confirmed | should fix |
| 6 | "Talborjt ... rebuilding after the 1960 earthquake" | Broadly accurate: the city was destroyed on 29 Feb 1960 and rebuilt with new seismic standards; Talborjt was a pre-1960 district hit hard | Rephrase to "a district destroyed in the 1960 earthquake and rebuilt as part of the modern city" | minor |
| 7 | Entrance-fee figures circulating (90 / 130 MAD, or free) | Sources conflict | Keep out of website copy; verify with the operator | minor |

## 5. Sources

| URL | Title | Accessed | Supports |
|---|---|---|---|
| https://www.soukelhadagadir.com/en/ | Souk El Had Agadir | 2026-09-30 | hours Tuesday to Sunday 09:00–20:00, closed Mondays |
| https://coupdefoudre.ma/souk-el-had-agadir-guide.html | Souk El Had Agadir: Complete Visitor Guide 2026 | 2026-09-30 | closed Mondays for cleaning |
| https://www.agadir-oufella.ma/en/useful-information/ | Visit the Kasbah Agadir Oufella: useful information | 2026-09-30 | daily opening 10:00–19:00, summer to 20:00, Ramadan to 16:30 |
| https://en.wikipedia.org/wiki/1960_Agadir_earthquake | 1960 Agadir earthquake | 2026-09-30 | earthquake date 29 Feb 1960 and destruction of the city |
| https://en.wikipedia.org/wiki/Agadir | Agadir | 2026-09-30 | city completely rebuilt after 1960 with seismic standards |
| https://www.timeanddate.com/sun/morocco/agadir | Sunrise and sunset times in Agadir | 2026-09-30 | winter sunset around 18:20–18:45 |
| https://danialand.com/en/cable-car/ | Cable Car (Agadir) | 2026-09-30 | cable car links the city to Oufella (alternative access) |

## 6. Open questions for the operator

1. Which argan cooperative is used on the city tour, and does it charge or expect purchases?
2. Is a host (not a driver) available for the medina/souk, and at what credential?
3. What is the Monday alternative, when Souk El Had is closed?
