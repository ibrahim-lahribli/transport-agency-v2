# Services Report: Souss-Massa / Agadir Tourism Agency (v1 draft)

Written from the point of view of an owner-operator with 20+ years in the Souss-Massa region, to fill every gap found in `activities.json`, `excursions.json` and `transfers.json`.

> **Read this first.** This report was drafted by an AI playing the owner. It is not the client's real cost data. Every value tagged **(P)** is a market-informed proposal and must be confirmed by the real client before it is published or used in booking logic. Nothing tagged **(T)** can be invented.

**Status legend**

| Tag | Meaning |
|---|---|
| (F) | Taken from the client's JSON files, kept as is |
| (P) | Proposed here to fill a gap or fix an inconsistency; client must validate |
| (T) | To provide: legal, contact or partner data that cannot be invented |
| (W) | Checked against public web sources on 1 Oct 2026; indicative only |

---

## 1. Catalogue summary

| # | ID | Type | From price (EUR) | Price unit | Door to door | Group |
|---|---|---|---|---|---|---|
| 1 | `boat-cruise` | Activity | 35 adult | person | about 6 h | 2 to 20 |
| 2 | `timlalin-dunes` | Activity | 15 (camel) | person or option | about 5.5 h | 2 to 16 |
| 3 | `quad-buggy-forest` | Activity | 35 quad, 80 buggy | person / quad / buggy | about 3.5 h | 1 to 12 |
| 4 | `horse-riding-souss` | Activity | 25 | person | about 2.5 h | 1 to 8 |
| 5 | `crocoparc` | Activity (transport) | 25 car, 35 van | vehicle | about 3.5 h | 1 vehicle (3 or 7 guests) |
| 6 | `moroccan-evening` | Activity | 40 adult | person | 4 h | 2 to 30 |
| 7 | `paradise-valley` | Excursion | 30 adult | person | 8 h | 2 to 16 |
| 8 | `agadir-city-tour` | Excursion | 20 adult | person | 4 h | 2 to 16 |
| 9 | `massa-tiznit` | Excursion | 38 adult | person | 8.5 h | 2 to 16 |
| 10 | `essaouira` | Excursion | 35 adult | person | 12 h | 2 to 16 |
| 11 | `taroudant-tiout` | Excursion | 38 adult | person | 9 h | 2 to 16 |
| 12 | `marrakech` | Excursion | 45 adult | person | 12 h | 4 to 16 |
| 13 | `airport-agadir` | Transfer | 20 sedan | vehicle | 30 min | 1 vehicle |
| 14 | `airport-taghazout` | Transfer | 30 sedan | vehicle | 45 to 50 min | 1 vehicle |
| 15 | `private-transfers-tourist-transport` | Transfer / day hire | 90 sedan (day), 95 (Essaouira) | vehicle | by route | 1 vehicle |

Base prices are the client's own figures (F). As the "owner", I checked them against each other for consistency and kept them. They still need real cost confirmation.

---

## 2. Business profile

| Item | Value |
|---|---|
| Trading name and brand | (T) |
| Legal name, ICE, RC, tax ID | (T) |
| Tourism agency licence (Ministry of Tourism) and number | (T) |
| Liability insurance (policy, insurer, cover) | (T) |
| Vehicle authorisations for tourist transport | (T) per vehicle |
| Office address | (T) |
| WhatsApp, phone, email | (T) |
| Founding year | (T) Do not publish "20+ years" unless it is true for this client |
| Office hours (P) | 08:00 to 22:00 daily; WhatsApp monitored for transfers 24/7 |
| Languages (F) | English, French, Arabic |

---

## 3. Global rules (apply to every service)

### 3.1 Currency, time, age bands
- Prices are in **EUR** (F). Show MAD as an indicative figure from a configurable rate, never hard-coded (P).
- Time zone: `Africa/Casablanca`. Morocco is on GMT+1 all year, except it moves to GMT during Ramadan (W general knowledge). All pickup times are local.
- Adult is 12 and over; child is 4 to 11; under 4 is free without a seat (F + P).

### 3.2 Vehicles
| Class | Passengers | Notes |
|---|---|---|
| Sedan | up to 3 | 2 large suitcases |
| Van | 4 to 7 | Surfboards, bikes, large luggage |
| Minibus | 8 to 15 | |

### 3.3 Pickup zones (P)
| Zone | Areas | Rule |
|---|---|---|
| 1 | Agadir city, beachfront, Founty, Sonaba, Talborjt, Marina, Anza | Pickup included on all tours |
| 2 | Taghazout, Taghazout Bay, Tamraght, Aourir | Included for Paradise Valley, Timlalin and Essaouira (north-bound, collected en route). On other tours add 5 EUR per person, on request. |
| 3 | Imsouane, Tiznit, Taroudant, other | Quoted on request |

Airport transfers use the route price table in section 4.

### 3.4 Request, confirmation and lead times (P)
- Flow: request on the site, then **confirmation by WhatsApp** within 2 hours between 08:00 and 22:00; later requests are answered by 09:00 the next day.
- A booking is only confirmed once the agency sends the confirmation message with time, pickup point and price.
- Lead times: transfers 12 h; shared tours 12 h (request before 18:00 for the next day); boat and evening show 24 h; Marrakech 48 h (timed entry tickets).

### 3.5 Payment (P)
- Phase 1: no online payment. Cash in EUR or MAD to the driver or host at pickup (the file already says this for horse riding).
- Deposit of 30% by bank transfer is proposed for private boat charters and groups over 8 guests.
- Entrance fees and meals marked "not included" are paid directly on site.

### 3.6 Cancellation policies (three keys in the file, texts proposed)

| Key | Used by | Proposed text |
|---|---|---|
| `transfer` | 13, 14, 15, 5 | Free until 12 h before pickup. Inside 12 h or no-show: full price. Flight delays cost nothing; we track the flight. |
| `excursion` | 7 to 12, 6 | Free until 24 h before departure. 24 to 12 h: 50%. Inside 12 h or no-show: full price. |
| `adventure` | 1 to 4 | Same as `excursion`. If the operator cancels for weather or safety, the guest gets a free new date or a full refund. |

Because payment is cash at pickup, late-cancellation fees are only enforceable on bookings that carry a deposit. That is the reason for the deposit rule in 3.5.

### 3.7 Minimum group rule (P)
If the minimum is not reached by 18:00 the day before, the guest chooses: another date, an upgrade to a private vehicle at the private rate, or a free cancellation.

### 3.8 Hosts (five keys in the file)
| Key | Meaning |
|---|---|
| `driver-host` | Professional driver who gives commentary in EN or FR from the vehicle. Not a licensed guide. |
| `operator-team` | Partner operator's instructors or staff (quad, riding, dunes) |
| `boat-crew` | Skipper and crew |
| `venue-team` | Staff of the dinner-show venue |
| `driver` | Driver only (Crocoparc) |

Guiding inside medinas and monuments is regulated in Morocco. Licensed guides are sold as an optional extra, and the rules must be checked with the tourism authority (T).

### 3.9 Included on all full-day excursions (P)
Bottled water (one per person) and rest stops. Fuel, tolls and parking are included on all tours and transfers (F).

### 3.10 Ramadan and Eid (F + P)
Some evening programmes pause during Ramadan. Book early around Eid and school holidays. Schedules are re-confirmed for each booking in these periods.

### 3.11 Sunset and daylight standard (P)
The files give three different winter sunset times (18:20, 18:30, 18:45). Use one rule everywhere: winter (Dec to Jan) about 18:20 to 18:45; summer (Jun to Jul) about 20:00 to 20:15.

---

## 4. Rate tables

### 4.1 Transfers (EUR per vehicle, one way, same price in reverse)

| Route | Sedan | Van | Minibus | Time | Source |
|---|---|---|---|---|---|
| Airport (AGA) to Agadir centre, beachfront, Founty, Sonaba, Talborjt, Marina | 20 | 30 | 50 | 30 min | (F) |
| Airport to Anza | 25 | 35 | 55 | 35 to 40 min | (F), time (P) |
| Hotel to hotel or marina in Agadir | 12 | 18 | 30 | 10 to 20 min | (F) |
| Airport to Tamraght and Aourir | 30 | 40 | 65 | 40 to 45 min | (F), time (P) |
| Airport to Taghazout and Taghazout Bay | 35 | 45 | 70 | 50 min | (F) |
| Airport to Imsouane | 70 | 90 | 130 | 90 min | (F) |
| Agadir (airport or hotel) to Essaouira | 95 | 125 | 180 | about 150 min | (F) |
| Agadir (airport or hotel) to Marrakech | 125 | 160 | 230 | about 210 min | (F) |
| *Suggested addition:* Marrakech airport (RAK) to Agadir | 130 | 165 | 235 | about 220 min | (P) |

**Extras (filled)**

| Extra | Value |
|---|---|
| Additional stop | 5 EUR (F) |
| Waiting beyond 60 min after landing | 5 EUR per 30 min (F) |
| Child seat | Free, request 24 h before (P) |
| Surfboards and bikes | Van or minibus required; up to 4 boards free, then 5 EUR per extra board (P) |
| Night surcharge | 0 (F); a business decision the client should confirm |
| Overtime on day hire | 8 EUR/h sedan, 10 EUR/h van, 15 EUR/h minibus (P) |

### 4.2 Private rate keys (the five undefined keys in the files)

| Key | Used by | Includes | Sedan | Van | Minibus |
|---|---|---|---|---|---|
| `agadir-halfday` | City tour | Up to 5 h within Agadir | 45 | 60 | 90 |
| `region-near` | Paradise Valley, Massa-Tiznit, Taroudant-Tiout | Up to 10 h, up to 230 km round trip | 90 | 120 | 170 |
| `essaouira` | Essaouira | Up to 12 h, about 350 km | 150 | 190 | 270 |
| `marrakech` | Marrakech | Up to 14 h, about 515 km, motorway tolls included | 200 | 250 | 350 |
| `privateDayRates` | Day hire (transfers page) | Up to 10 h, up to 250 km, your own itinerary | 90 | 120 | 170 |

All are (P). They are consistent with the transfer table: a day trip costs less than twice the one-way fare. Private rates exclude entrance fees, meals and licensed guides.

### 4.3 Third-party costs (paid on site, never collected by the agency)

| Item | Indicative cost | Status |
|---|---|---|
| Crocoparc adult entry | about 100 to 130 MAD (sources differ; online resellers show 11 to 13 USD) | (W), confirm child rate at the park |
| Crocoparc hours | about 10:00 to 18:00 or 19:00 daily (sources differ) | (W) |
| Majorelle Garden adult entry | about 150 to 170 MAD, timed tickets; Berber Museum extra (about 60 MAD) | (W), check the official site |
| Souss-Massa National Park entry | Unknown | (T) |
| Donkey ride at Tiout | Unknown | (T) |
| Licensed guide, Agadir (about 2 h) | from 25 EUR per group | (P) |
| Licensed guide, Marrakech medina (about 3 h) | from 35 EUR per group | (P) |

---

## 5. Services

### 5.1 Agadir Boat Cruise with Fishing & Fish BBQ Lunch (`boat-cruise`)

| Field | Value |
|---|---|
| Slug EN / FR | `agadir-boat-cruise-fishing-bbq-lunch` / `sortie-bateau-agadir-peche-barbecue` (F) |
| Keyword EN / FR | agadir boat trip / sortie en bateau agadir (F) |
| Schedule | Daily, 09:15 from the marina; weather and boat dependent (F) |
| Pickup / return | 08:00 to 08:45 / 14:00 to 14:45 (F) |
| Duration | About 6 h door to door; about 4.25 h on board (P, the file's 4.75 h mixed the two) |
| Group | Min 2, shared max 20, private available (F) |
| Price | Adult 35, child 4 to 11: 18, under 4: free (F) |
| Private | From 360 EUR per boat for up to 8 guests; larger boats quoted (P) |
| Included | Fishing equipment, fish BBQ lunch with salad, marina transfers (F). Life jackets on board (P). |
| Not included | Tips (F). Drinks: water and one soft drink per person included (P). |
| Limits | Swim stop only when the sea allows. Non-swimmers stay on board or use a float. Children wear life jackets (P). |
| Go/no-go | Decided by 18:00 the day before and rechecked at 07:00 (P); weather cancellation is a free new date or full refund |
| Season | Winter swells can cancel trips, mornings calmer; summer calmer seas, strong sun (F) |
| Needed from guest | Hotel, names, ages, swimmers or not, motion-sickness note (P) |
| Cancellation | `adventure` |
| Still to confirm | Boat capacity, safety equipment, operator licence and insurance (T) |

Itinerary (F): hotel pickup, board and coastal cruise, fishing stop, swim stop if conditions allow, fish BBQ with salad, return to marina and hotel.

### 5.2 Timlalin Dunes: Quad, Camel Ride & Sandboarding (`timlalin-dunes`)

| Field | Value |
|---|---|
| Slug EN / FR | `timlalin-dunes-quad-camel-sandboarding` / `dunes-timlalin-quad-dromadaire-sandboard` (F) |
| Keyword EN / FR | timlalin dunes agadir / dunes timlalin agadir (F). Add "timlaline" as a secondary spelling. |
| Schedule | Daily; morning, afternoon or sunset (F) |
| Morning | Pickup 08:30 to 09:30, return 13:45 to 14:45 (F) |
| Afternoon | Pickup 13:30 to 14:30, return about 18:30 to 19:30 (P) |
| Sunset | Winter pickup 15:45 to 16:15, return 20:00 to 20:30; summer pickup 17:30 to 18:00, return 21:30 to 22:00 (P) |
| Duration | About 5.5 h door to door; the dunes are about 68 to 70 km north, 60 to 80 min each way (F) |
| Group | Min 2, shared max 16, private available (F) |
| Prices | Camel about 45 min: 15. Sunset camel: 20. Quad 1 h single rider: 35. Quad 1 h, two on one quad: 50 per quad. Sandboarding add-on: 10. Dunes combo (quad + camel + sandboarding): 55 per person (F). |
| Sunset rule | Camel, quad and sandboarding available at the usual prices, subject to daylight; the combo is not sold at sunset (P) |
| Private | Same prices, own departure time, groups of 4 or more (P) |
| Included | Quad safety briefing and equipment, hotel pickup in Zone 1 (F). Board and helmet (P). |
| Not included | Activities not selected, tips (F) |
| Limits (P) | Quad driver 16 and over (under 18 needs guardian consent); passengers from 6; camel from 4 with an adult; sandboarding from 6. Not recommended in pregnancy or with back or heart problems (F). |
| Truth rule | Small coastal dunes, never "Sahara" (F) |
| Needed from guest | Hotel, names, ages, chosen activities, single or double quad (P) |
| Cancellation | `adventure` |
| Still to confirm | Minimum ages, operator licence and insurance, exact site and operator (T) |

### 5.3 Agadir Quad & Buggy Adventure through the Forest (`quad-buggy-forest`)

| Field | Value |
|---|---|
| Slug EN / FR | `agadir-quad-buggy-adventure-forest` / `quad-buggy-agadir-foret-dunes` (F) |
| Keyword | quad buggy agadir (F) |
| Departures | 09:00, 14:00, 16:00 are hotel pickup times (F) |
| Pickup / return | 09:00: 08:45 to 09:00 / 11:45 to 12:30 (F). 14:00: 13:45 to 14:00 / 16:45 to 17:30 (P). 16:00: 15:45 to 16:00 / 18:45 to 19:30 (P). |
| Winter rule | The last departure is 15:00 from November to February, because 16:00 ends after dark (P) |
| Duration | About 3.5 h door to door; riding 1.5 to 2 h (F) |
| Group | Min 1, shared max 12, private available (F) |
| Prices | Quad single rider: 35 per person. Two on one quad: 50 per quad. Buggy, 2 seats: 80 per buggy (F). |
| Private | Same prices, own time, groups of 4 or more (P) |
| Included | Safety briefing, helmet and protective equipment, mint tea break (F) |
| Not included | Photos and video, tips (F) |
| Limits (P) | Quad driver 16 and over; buggy driver 18 and over; passengers from 6. Not recommended in pregnancy or with back or heart problems (F). |
| Needed from guest | Hotel, names, ages, quad or buggy, single or double (P) |
| Cancellation | `adventure` |
| Distance note | The 45 km round trip is vehicle distance only; the 15 km on the machines is not counted (this corrects my earlier audit, which flagged it as an error) |
| Still to confirm | Base location (file says around Tifnit), ages, licence rules, operator licence and insurance (T) |

Positioning: this page owns "forest and buggy"; the Timlalin page owns "dunes and camel".

### 5.4 Horse Riding along the Souss River (`horse-riding-souss`)

| Field | Value |
|---|---|
| Slug EN / FR | `horse-riding-souss-river-agadir` / `balade-a-cheval-oued-souss-agadir` (F) |
| Keyword | horse riding agadir / balade à cheval agadir (F) |
| Schedule | Morning or late afternoon, arranged on request (F) |
| Pickup / return | 09:00 to 09:30 / 11:15 to 11:45 (F). Late afternoon: pickup 15:30 to 16:00, return 18:00 to 18:30 (P). |
| Duration | About 2.5 h door to door; ride 1 h (F) |
| Group | Min 1, shared max 8, private available (F) |
| Price | 1-hour guided ride: 25 per person (F). Optional 2-hour ride: 40 per person (P). |
| Payment | No deposit; cash at pickup (F) |
| Included | 1-hour ride, helmet (F) |
| Not included | Photos, tips (F) |
| Limits (P) | Minimum age 6; maximum rider weight 95 kg. Not recommended in pregnancy or with back problems (F). |
| Needed from guest | Hotel, full names, date and time, riding experience, ages, weight, helmet size (F + P) |
| Cancellation | `adventure` |
| Still to confirm | Weight and age limits, helmet provision, operator licence and insurance (T) |

### 5.5 Crocoparc Agadir with Private Transport (`crocoparc`)

| Field | Value |
|---|---|
| Slug EN / FR | `crocoparc-agadir-private-transport` / `crocoparc-agadir-transport-prive` (F) |
| Keyword | crocoparc agadir (F) |
| Product nature | A private round-trip transport product, priced per vehicle. Group size is the vehicle capacity, not `sharedMax` 7 (P) |
| Pickup / return | 09:45 to 10:30 / 13:00 to 14:00 (F) |
| Duration | About 3.5 h door to door; 2.5 h waiting included (F) |
| Price | Private car, up to 3 guests: 25. Private van, 4 to 7: 35. Extra waiting: 5 per 30 min (F). |
| Separate cost | Park entrance, paid at the park and shown apart from transport (F). See 4.3. |
| Included | Pickup, transport, waiting, return (F) |
| Not included | Entrance tickets, food and drinks in the park (F) |
| Needed from guest | Hotel, number of adults and children with ages, preferred time (P) |
| Cancellation | `transfer` |
| Still to confirm | Current ticket prices and opening hours, whether the park sells a package (F) |

### 5.6 Moroccan Evening: Dinner, Fantasia & Cultural Show (`moroccan-evening`)

| Field | Value |
|---|---|
| Slug EN / FR | `moroccan-dinner-fantasia-show-agadir` / `diner-marocain-spectacle-fantasia-agadir` (F) |
| Keyword | moroccan dinner show agadir / dîner spectacle agadir (F) |
| Pickup / return | 19:00 to 19:30 / 23:00 to 23:30 (F) |
| Duration | 4 h (F) |
| Group | Min 2, shared max 30, private available (F). Private for groups of 8 or more is quoted (P). |
| Price | Adult 40 (dinner, show, transfers), child 4 to 11: 20, under 4: free (F) |
| Included | Traditional dinner, show, hotel transfers; water or one soft drink with dinner (F + P) |
| Not included | Other drinks, tips (F) |
| Venue | Partner venue in the Agadir area, about 15 km; name confirmed at booking (T) |
| Ramadan | Programme may change or pause (F); re-confirm for every booking in that period |
| Needed from guest | Hotel, names, ages, dietary needs (halal is the default; vegetarian on request) (P) |
| Cancellation | `excursion` |
| Still to confirm | Venue, menu, programme, drinks policy, Ramadan availability (T) |

### 5.7 Paradise Valley Day Trip from Agadir (`paradise-valley`)

| Field | Value |
|---|---|
| Slug EN / FR | `paradise-valley-day-trip-from-agadir` / `excursion-vallee-du-paradis-depuis-agadir` (F) |
| Keyword | paradise valley agadir / vallée du paradis agadir (F) |
| Pickup / return | 08:30 to 09:30 / 16:30 to 17:00 (F) |
| Duration | 8 h; about 74 km round trip (F) |
| Group | Min 2, shared max 16, private available (`region-near`) (F) |
| Price | Adult 30, child 4 to 11: 15, under 4: free (F). The file calls this a market benchmark; I accept it as the working price. |
| Included | Argan cooperative and pottery visits, bottled water (F + P) |
| Not included | Optional tajine lunch, paid locally; purchases (F) |
| Pickup | Zone 2 guests collected en route, no extra charge (F) |
| Limits | The path to the pools is rocky and uneven, not suitable for reduced mobility (F) |
| Season | Pools low or dry in the dry season; hot in July and August; slippery after rain (F) |
| Needed from guest | Hotel, names, ages, mobility note (P) |
| Cancellation | `excursion` |
| Still to confirm | Walk duration, minimum group, which cooperative and workshop (T) |

### 5.8 Discover Agadir: City Tour (`agadir-city-tour`)

| Field | Value |
|---|---|
| Slug EN / FR | `agadir-city-tour-marina-kasbah-souk` / `visite-d-agadir-marina-kasbah-souk` (F) |
| Keyword | agadir city tour / visite d'agadir (F) |
| Schedule | Morning 09:00 and afternoon 14:30 (F) |
| Pickup / return | Morning: 08:50 to 09:10 / 13:30 to 14:15. Afternoon: 14:20 to 14:40 / 18:30 to 19:15 (F) |
| Duration | 4 h door to door; about 23 km of tour legs plus about 5 km hotel pickup and drop-off, which explains the file's 28 km (P) |
| Group | Min 2, shared max 16, private available (`agadir-halfday`) (F) |
| Price | Adult 20, child 4 to 11: 10, under 4: free (F) |
| Monday rule | Souk El Had is closed on Mondays; replace it with the Port of Agadir fishing harbour or Vallée des Oiseaux (P) |
| Included | Driver-host commentary in EN or FR (F) |
| Not included | Purchases; optional licensed guide, 25 EUR per group (F + P) |
| Limits | The Oufella Kasbah opens at 10:00, so it is visited mid-morning; the afternoon tour ends after sunset in winter (F) |
| Needed from guest | Hotel, names, ages, preferred departure (P) |
| Cancellation | `excursion` |
| Still to confirm | Which cooperative is visited, guide wording, Oufella access on the day (T) |

### 5.9 Massa & Tiznit: Coast, Nature & Dunes Day Trip (`massa-tiznit`)

| Field | Value |
|---|---|
| Slug EN / FR | `massa-tiznit-coastal-dunes-day-trip-from-agadir` / `excursion-massa-tiznit-dunes-depuis-agadir` (F) |
| Keyword | tiznit day trip from agadir / excursion tiznit depuis agadir (F) |
| Pickup / return | 08:00 to 09:00 / 17:00 to 17:45 (F) |
| Duration | 8.5 h; about 190 km, 3.5 to 4.5 h in the vehicle (F) |
| Group | Min 2, shared max 16, private available (`region-near`) (F) |
| Price | Adult 38, child 4 to 11: 19 (lunch included), under 4: free (F) |
| Included | Traditional lunch, bottled water (F + P) |
| Not included | Drinks with lunch, purchases, any park entrance fee (F) |
| Truth rule | Small coastal dunes, never "Sahara" (F) |
| Season | Birdwatching best November to March; dam level varies with rainfall (F) |
| Needed from guest | Hotel, names, ages, dietary needs (P) |
| Cancellation | `excursion` |
| Still to confirm | Park entrance fee (T), which pottery workshop and dune stop, lunch venue |

### 5.10 Essaouira (Mogador) Day Trip from Agadir (`essaouira`)

| Field | Value |
|---|---|
| Slug EN / FR | `essaouira-day-trip-from-agadir` / `excursion-essaouira-depuis-agadir` (F) |
| Keyword | essaouira day trip from agadir / excursion essaouira depuis agadir (F) |
| Pickup / return | 07:00 to 08:00 / 19:00 to 19:30 (F); departure from Essaouira about 16:00 (F) |
| Duration | 12 h; about 350 km, 5 to 6 h on the road (F) |
| Group | Min 2, shared max 16, private available (`essaouira`) (F) |
| Price | Adult 35, child 4 to 11: 18, under 4: free (F) |
| Included | Transport, driver-host commentary, bottled water, rest stops (P; the file's included list was empty) |
| Not included | Lunch (free time), purchases, any monument entrance (F) |
| Pickup | Zone 2 guests collected en route (P) |
| Positioning | A historic Atlantic port city (Mogador), not an imperial city (F) |
| Goats in argan trees | Seasonal and never guaranteed (F) |
| Needed from guest | Hotel, names, ages (P) |
| Cancellation | `excursion` |
| Still to confirm | Departure time from Essaouira, monument entrance fees, argan cooperative (T) |

### 5.11 Taroudant & Tiout Oasis Day Trip from Agadir (`taroudant-tiout`)

| Field | Value |
|---|---|
| Slug EN / FR | `taroudant-tiout-oasis-day-trip-from-agadir` / `excursion-taroudant-oasis-tiout-depuis-agadir` (F) |
| Keyword | taroudant day trip from agadir / excursion taroudant depuis agadir (F) |
| Pickup / return | 08:00 to 09:00 / 17:00 to 17:45 (F) |
| Duration | 9 h; about 220 km, 3.5 to 4.5 h in the vehicle (F) |
| Group | Min 2, shared max 16, private available (`region-near`) (F) |
| Price | Adult 38, child 4 to 11: 19 (lunch included), under 4: free (F) |
| Included | Traditional lunch, bottled water (F + P) |
| Not included | Donkey ride (paid locally), drinks with lunch, purchases (F) |
| Season | Late autumn to spring most comfortable; hot in summer (F) |
| Needed from guest | Hotel, names, ages, dietary needs (P) |
| Cancellation | `excursion` |
| Still to confirm | Donkey ride price (T), lunch venue |

### 5.12 Marrakech Day Trip from Agadir (`marrakech`)

| Field | Value |
|---|---|
| Slug EN / FR | `marrakech-day-trip-from-agadir` / `excursion-marrakech-depuis-agadir` (F) |
| Keyword | marrakech day trip from agadir / excursion marrakech depuis agadir (F) |
| Pickup / return | 07:00 to 08:00 / 19:00 to 19:30 (F); departure from Marrakech about 16:00 (F) |
| Duration | 12 h; about 515 km, 5.5 to 7 h in the vehicle (F) |
| Group | **Min 4**, shared max 16, private available (`marrakech`) (F) |
| Price | Adult 45, child 4 to 11: 25, under 4: free (F). The file calls this a market benchmark; I accept it as the working price. |
| Included | Transport by motorway, bottled water, rest stops (F + P) |
| Not included | Lunch, entrance fees including Majorelle Garden, optional licensed guide 35 EUR per group (F + P) |
| Majorelle | Timed advance tickets; check availability when booking; indicative adult price in 4.3 (W) |
| Limits | Very long day; not recommended for children under 6; mosque seen from outside only (F) |
| Lead time | 48 h (P) |
| Needed from guest | Hotel, names, ages, whether a licensed guide is wanted (P) |
| Cancellation | `excursion` |
| Still to confirm | Minimum group wording, exact return time, guide availability and price (T) |

### 5.13 Agadir Airport Transfer to Agadir Hotels (`airport-agadir`)

| Field | Value |
|---|---|
| Slug EN / FR | `agadir-airport-transfer-to-agadir-hotels` / `transfert-aeroport-agadir-hotels` (F) |
| Keyword | agadir airport transfer / transfert aéroport agadir (F) |
| Availability | 24/7 by prior arrangement (F) |
| Prices | See 4.1 (all three routes) |
| Included | Flight tracking, driver in the arrivals hall with a name sign, 60 min free waiting, luggage assistance, fuel, tolls, parking (F) |
| Not included | Additional stops, waiting beyond 60 min (F) |
| Extras | See 4.1 |
| Needed from guest | Flight number, arrival time, number of passengers, luggage count, hotel address, child seats (P) |
| Cancellation | `transfer` |
| Still to confirm | Airport meeting rules, driver and vehicle authorisation (T) |

French gap: the file has no French summary, highlights or FAQ for any of the three transfers.

### 5.14 Agadir Airport to Taghazout Private Transfer (`airport-taghazout`)

| Field | Value |
|---|---|
| Slug EN / FR | `agadir-airport-to-taghazout-private-transfer` / `transfert-prive-aeroport-agadir-taghazout` (F) |
| Keyword | agadir airport to taghazout transfer / transfert aéroport agadir taghazout (F) |
| Prices | See 4.1 (Tamraght and Aourir, Taghazout and Bay, Imsouane) |
| Surfboards | Van or minibus; up to 4 boards free, then 5 EUR each; tell us the number and size in advance (P) |
| Included | Flight tracking, driver with name sign, 60 min free waiting, fuel, tolls, parking (F) |
| Needed from guest | Same as 5.13, plus number and size of boards (P) |
| Cancellation | `transfer` |
| Still to confirm | Travel times, driver authorisation (T) |

### 5.15 Private Transfers & Tourist Transport from Agadir (`private-transfers-tourist-transport`)

| Field | Value |
|---|---|
| Slug EN / FR | `private-transfers-tourist-transport-from-agadir` / `transferts-prives-transport-touristique-agadir` (F) |
| Keyword | private transfer agadir / transfert privé agadir (F) |
| Routes | Essaouira 95/125/180; Marrakech 125/160/230 (F); suggested RAK to Agadir 130/165/235 (P) |
| Day hire | `privateDayRates` 90/120/170, up to 10 h, up to 250 km; overtime 8/10/15 per hour (P) |
| Included | Fuel, tolls, parking, professional driver, flight tracking on airport pickups (F) |
| Not included | Entrance fees, meals, driver overnight stays on long trips (F) |
| Needed from guest | Route, date, passengers, luggage, pickup address; for day hire the wanted itinerary (P) |
| Cancellation | `transfer` |
| Still to confirm | Who owns and drives the vehicles, tourist transport authorisation per vehicle (T) |

---

## 6. SEO copy fixes (titles of 60 characters or fewer, all checked)

Nine primary keywords were missing from the page title or SEO title. Proposed replacements (P):

| Service | SEO title EN | SEO title FR |
|---|---|---|
| `timlalin-dunes` | Timlalin Dunes Agadir: Camel, Quad & Sandboarding | Dunes Timlalin Agadir : dromadaire, quad, sandboard |
| `quad-buggy-forest` | Quad & Buggy Agadir: Forest and Dune Off-Road Ride | Quad et buggy Agadir : forêt et dunes en 3 h |
| `horse-riding-souss` | Horse Riding Agadir: Souss River Ride, All Levels | Balade à cheval Agadir : oued Souss, tous niveaux |
| `moroccan-evening` | Moroccan Dinner Show Agadir: Fantasia & Folklore | Dîner spectacle Agadir : fantasia et folklore |
| `paradise-valley` | Paradise Valley Agadir Day Trip: Pools & Argan | Vallée du Paradis Agadir : excursion d'une journée |
| `taroudant-tiout` | Taroudant Day Trip from Agadir: Tiout Oasis | Excursion Taroudant depuis Agadir : oasis de Tiout |
| `airport-taghazout` | Agadir Airport to Taghazout Transfer: Private Car | Transfert aéroport Agadir Taghazout : voiture privée |
| `private-transfers-tourist-transport` | Private Transfer Agadir: Essaouira, Marrakech, Day Hire | Transfert privé Agadir : Essaouira, Marrakech |

The other pages already carry their keyword in the SEO title. The French copy marked "(Draft for native review.)" in 12 summaries still needs a native French pass, and Arabic is not yet written.

---

## 7. Corrections applied to the source data

| Issue | Resolution |
|---|---|
| Boat duration 4.75 h vs about 6 h door to door | Standard field is door to door; add an `activityHours` field (about 4.25 h for the boat) |
| Quad/buggy 45 km vs 59 km of legs | 45 km is correct (vehicle only). My earlier audit flagged this wrongly. |
| City tour 28 km vs 23 km of legs | 23 km tour legs plus about 5 km hotel pickup and drop-off |
| Three different winter sunset times | One rule in 3.11 |
| Quad/buggy extra departures had no pickup or return times | Added in 5.3 |
| Crocoparc `sharedMax` 7 on a per-vehicle product | Replaced by vehicle capacities |
| Essaouira had an empty included list | Filled in 5.10 |
| "Timlalin" vs "Timlaline" | "Timlalin" in copy; "timlaline" as a secondary keyword |
| Undefined private rate keys, policies and host keys | Defined in sections 3 and 4 |
| Zero or null placeholders (child seat, overtime, surfboards) | Replaced by values or rules in 4.1 |

---

## 8. Still to provide (cannot be invented)

1. Legal identity: trading name, ICE, RC, tax ID, tourism agency licence, insurance (section 2).
2. Contact: WhatsApp, phone, email, office address.
3. Partner names: argan cooperative, pottery workshop, riding centre, quad base, boat operator, dinner-show venue, lunch venues.
4. Operator licences and insurance for every activity partner, and vehicle authorisations.
5. Real cost confirmation for every (P) price, and the final decision on the night surcharge.
6. Park entrance fee (Souss-Massa) and donkey ride price.
7. Photos and video, existing reviews, founding year, domain name.
8. Payment entity and bank, before any online deposit is built.
9. Native French review, and a decision on Arabic.
