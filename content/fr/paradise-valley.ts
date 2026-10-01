import type { Service } from "@/schemas/service";

export const paradiseValley: Service = {
  id: "paradise-valley",
  category: "excursion",
  status: "draft",
  order: 7,
  slug: "excursion-vallee-du-paradis-depuis-agadir",
  title: "Excursion d'une journée à Paradise Valley depuis Agadir",
  summary:
    "Passez une journée complète dans les collines au nord d'Agadir. Vous longez la côte jusqu'à Aourir, puis vous montez la route de montagne vers Imouzzer. En chemin, arrêt dans une coopérative d'huile d'argan, démonstration d'un potier au tour, et pause à un belvédère sur les vallées et les arganiers. À la Vallée du Paradis, vous marchez environ 20 à 35 minutes sur un sentier rocheux jusqu'aux bassins naturels, avec du temps libre pour vous détendre. La baignade dépend de la saison et des pluies récentes. Un tajine local est proposé en option, payé sur place. Prise en charge et retour à votre hôtel inclus. (Draft for native review.)",
  seo: {
    title: "Vallée du Paradis Agadir : excursion d'une journée",
    description:
      "Journée à la Vallée du Paradis depuis Agadir : coopérative d'argan, atelier de poterie, belvédère et marche jusqu'aux bassins naturels.",
  },
  primaryKeyword: "vallée du paradis agadir",
  durationHours: 8,
  pickupWindow: "08h30 à 09h30",
  returnApprox: "16h30 à 17h00",
  days: "Tous les jours, selon conditions météo et niveau d'eau saisonnier",
  capacity: {
    min: 2,
    sharedMax: 16,
    privateAvailable: true,
  },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "market-benchmark",
    confirmed: false,
    options: [
      {
        label: "Adulte",
        amount: 30,
        unit: "person",
      },
      {
        label: "Enfant 4 à 11 ans",
        amount: 15,
        unit: "person",
      },
      {
        label: "Enfant de moins de 4 ans",
        amount: 0,
        unit: "person",
      },
    ],
  },
  privateRate: "region-near",
  cancellationPolicy: "excursion",
  languages: ["en", "fr", "ar"],
  host: "driver-host",
  itinerary: [
    "Hotel pickup in Agadir; Taghazout and Tamraght guests are collected en route.",
    "Argan oil cooperative: production explanation and tasting of argan oil and amlou.",
    "Pottery workshop: wheel demonstration and a photo stop.",
    "Panoramic stop over the valleys and argan trees.",
    "Drive up to the Paradise Valley entrance, then walk 20 to 35 minutes to the pools.",
    "Free time at the pools; optional tajine lunch nearby, paid on site.",
    "Return drive to Agadir, arriving around 16:30 to 17:00.",
  ],
  includedExtra: [
    "Prise en charge et retour hôtel à Agadir et Zone 2 en route",
    "Visite d'une coopérative d'argan avec dégustation",
    "Visite d'un atelier de poterie avec démonstration",
    "Bouteille d'eau par personne",
  ],
  notIncluded: [
    "Déjeuner tajine dans un café local (réglé sur place)",
    "Achats personnels",
    "Pourboires",
  ],
  bring: [
    "Shoes or sandals with grip",
    "Swimsuit and towel",
    "Hat and sunscreen",
    "Water",
    "Cash for an optional lunch and for purchases",
  ],
  suitableFor: ["Couples", "Families", "Friends"],
  restrictions: [
    "The path to the pools is uneven and rocky and is not suitable for guests with reduced mobility.",
    "Swimming depends on the season and recent rainfall; the pools can be low or dry in the dry season.",
    "A moderate amount of time is spent in the vehicle on mountain roads.",
  ],
  seasonalNotes: [
    "Water levels in the pools follow recent rainfall and vary through the year.",
    "The route is inland and can be very hot in July and August; mornings are cooler.",
    "The valley walk is sometimes slippery after rain.",
  ],
  highlights: [
    "Journée complète au nord d'Agadir, prise en charge à l'hôtel",
    "Visite d'une coopérative d'huile d'argan avec dégustation",
    "Atelier de poterie et démonstration au tour",
    "Belvédère sur les vallées et les arganiers",
    "Marche d'environ 20 à 35 minutes jusqu'aux bassins",
    "Temps libre aux bassins ; baignade selon la saison",
  ],
  route: {
    startPoint: "Central Agadir",
    legs: [
      {
        from: "Central Agadir (Boulevard du 20 Août)",
        to: "Aourir, via Anza, Tamraght, N1 north",
        km: 25,
        minutes: "30 to 40",
        notes: "Coast road north toward Taghazout and Essaouira.",
      },
      {
        from: "Aourir",
        to: "Paradise Valley entrance and car park",
        km: 12,
        minutes: "25 to 35",
        notes: "Left at Aourir onto the mountain road toward Imouzzer.",
      },
      {
        from: "Car park",
        to: "First natural pools (on foot)",
        km: 1.5,
        minutes: "20 to 35",
        notes: "Uneven, rocky path; no vehicle beyond the car park.",
      },
      {
        from: "Paradise Valley",
        to: "Central Agadir (return, same road)",
        km: 37,
        minutes: "55 to 75",
        notes: "Stops on the way back as agreed.",
      },
    ],
    roundTripKm: 74,
    drivingHoursTotal: "1 h 55 to 2 h 30",
  },
  faq: [
    {
      q: "Can we swim in the pools?",
      a: "Sometimes, depending on the season and the water level. Bring a swimsuit, and we will tell you the current conditions when you request.",
    },
    {
      q: "How long is the walk to the pools?",
      a: "About 20 to 35 minutes to the first pools, on an uneven and sometimes slippery rock path. Further pools take longer.",
    },
    {
      q: "Is lunch included?",
      a: "No. A traditional tajine is usually available near the valley at your own cost, paid on the spot.",
    },
  ],
  confirmFlags: [
    "price and child price",
    "bottled water included",
    "walk duration",
    "capacity and minimum group",
    "pickup and return times",
  ],
} satisfies Service;

export default paradiseValley;
