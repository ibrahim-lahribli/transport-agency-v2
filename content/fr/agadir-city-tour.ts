import type { Service } from "@/schemas/service";

export const agadirCityTour: Service = {
  id: "agadir-city-tour",
  category: "excursion",
  status: "draft",
  order: 8,
  slug: "visite-d-agadir-marina-kasbah-souk",
  title: "Découvrez Agadir : visite de la ville",
  summary:
    "Découvrez la ville lors de cette visite d'Agadir d'une demi-journée. Vous commencez par la marina et une promenade au bord de l'eau, puis vous montez à la Kasbah d'Oufella pour une large vue sur Agadir, l'Atlantique et la plaine environnante. Dans le quartier de Talborjt, vous découvrez comment la ville a été détruite lors du séisme de 1960 puis reconstruite. Une halte dans une coopérative d'huile d'argan explique la fabrication de l'huile. Dernière étape : le Souk El Had, l'un des plus grands marchés de la région, avec du temps libre pour les épices, l'artisanat et les souvenirs. Le souk est fermé le lundi. Prise en charge et retour à l'hôtel inclus. (Draft for native review.)",
  seo: {
    title: "Visite d'Agadir : Marina, Kasbah et Souk",
    description:
      "Visite d'Agadir en demi-journée : marina, Kasbah d'Oufella, Talborjt, coopérative d'argan et Souk El Had (fermé le lundi). Transfert inclus.",
  },
  primaryKeyword: "visite d'agadir",
  durationHours: 4,
  pickupWindow: "Matin 08h50 à 09h10 / Après-midi 14h20 à 14h40",
  returnApprox: "Matin 13h30 à 14h15 / Après-midi 18h30 à 19h15",
  days: "Tous les jours (le lundi le Souk El Had est fermé et remplacé par le port de pêche d'Agadir ou la Vallée des Oiseaux)",
  capacity: {
    min: 2,
    sharedMax: 16,
    privateAvailable: true,
  },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "estimate",
    confirmed: false,
    options: [
      {
        label: "Adulte",
        amount: 20,
        unit: "person",
      },
      {
        label: "Enfant 4 à 11 ans",
        amount: 10,
        unit: "person",
      },
      {
        label: "Enfant de moins de 4 ans",
        amount: 0,
        unit: "person",
      },
    ],
  },
  privateRate: "agadir-halfday",
  cancellationPolicy: "excursion",
  languages: ["en", "fr", "ar"],
  host: "driver-host",
  itinerary: [
    "Hotel pickup in Agadir (morning 09:00 or afternoon 14:30 departure).",
    "Agadir Marina: waterfront walk and photo stop.",
    "Agadir Oufella Kasbah: panoramic views over the city, the Atlantic and the region.",
    "Talborjt: a district destroyed in the 1960 earthquake and rebuilt as part of the modern city.",
    "Argan oil cooperative: how argan products are made.",
    "Souk El Had: free time for spices, crafts, clothing and souvenirs.",
    "Drop-off at your hotel.",
  ],
  includedExtra: [
    "Prise en charge et retour hôtel à Agadir",
    "Transport en minivan climatisé",
    "Commentaires du chauffeur-accompagnateur en français ou anglais",
  ],
  notIncluded: [
    "Achats personnels au souk ou à la coopérative",
    "Guide officiel en option (25 EUR par groupe)",
    "Pourboires",
  ],
  bring: [
    "Comfortable shoes",
    "Hat and sunscreen",
    "Cash for shopping at the souk and cooperative",
  ],
  suitableFor: ["Couples", "Families", "Friends", "Small groups"],
  restrictions: [
    "Souk El Had is closed on Mondays; on that day an alternative stop is offered.",
    "The Oufella Kasbah site opens at 10:00, so it is visited from mid-morning.",
    "In winter the afternoon departure finishes after sunset.",
  ],
  highlights: [
    "Visite d'une demi-journée avec prise en charge à l'hôtel",
    "Promenade au bord de l'eau à la marina d'Agadir",
    "Vues panoramiques depuis la Kasbah d'Oufella",
    "L'histoire de Talborjt et du séisme de 1960",
    "Visite d'une coopérative d'huile d'argan",
    "Temps libre au Souk El Had (fermé le lundi)",
  ],
  route: {
    startPoint: "Central Agadir",
    legs: [
      {
        from: "Central Agadir (Boulevard du 20 Août)",
        to: "Agadir Marina",
        km: 2,
        minutes: "5 to 10",
        notes: "Short hop to the waterfront.",
      },
      {
        from: "Agadir Marina",
        to: "Agadir Oufella (Kasbah)",
        km: 6,
        minutes: "12 to 18",
        notes: "Uphill on the Kasbah road; the managed site opens at 10:00.",
      },
      {
        from: "Agadir Oufella",
        to: "Talborjt district",
        km: 3,
        minutes: "8 to 12",
        notes: "Down into the city centre.",
      },
      {
        from: "Talborjt",
        to: "Argan oil cooperative",
        km: 4,
        minutes: "10 to 15",
        notes: "Location to be confirmed with the operator.",
      },
      {
        from: "Argan cooperative",
        to: "Souk El Had, Rue 2 Mars",
        km: 5,
        minutes: "12 to 20",
        notes: "Closed on Mondays.",
      },
      {
        from: "Souk El Had",
        to: "Hotels in Agadir",
        km: 3,
        minutes: "8 to 15",
        notes: "Drop-off by zone.",
      },
    ],
    roundTripKm: 28,
    drivingHoursTotal: "0 h 55 to 1 h 30",
  },
  faq: [
    {
      q: "Is Souk El Had open every day?",
      a: "No. The market is closed on Mondays for cleaning. On Mondays we replace that stop with another city stop.",
    },
    {
      q: "Is a separate host included?",
      a: "You travel with a driver who comments on the route. A separate host for the medina and souk can be requested in advance.",
    },
    {
      q: "How much free time do we get at the souk?",
      a: "About one hour, enough to look around and shop without rushing.",
    },
  ],
  confirmFlags: [
    "price",
    "two departure times",
    "guide wording",
    "which cooperative is visited",
    "Oufella access on the day",
  ],
} satisfies Service;

export default agadirCityTour;
