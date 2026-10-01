import type { Service } from "@/schemas/service";

export const taroudantTiout: Service = {
  id: "taroudant-tiout",
  category: "excursion",
  status: "draft",
  order: 11,
  slug: "excursion-taroudant-oasis-tiout-depuis-agadir",
  title: "Excursion à Taroudant et à l'oasis de Tiout depuis Agadir",
  summary:
    "Associez une ville fortifiée historique et les paysages d'une oasis lors de cette excursion à Taroudant depuis Agadir. Vous roulez vers l'est à travers la plaine du Souss jusqu'à Taroudant, surnommée la petite Marrakech, et parcourez ses longs remparts et ses portes, l'ancienne médina et les souks traditionnels. Selon les conditions locales, vous pourrez peut-être voir des chèvres dans les arganiers, mais cela n'est jamais garanti sur cette route. Vous poursuivez vers l'oasis de Tiout, ses palmeraies, ses ruelles de village et sa kasbah, avec un déjeuner traditionnel offrant une vue sur les palmiers. Une promenade dans l'oasis est possible, ainsi qu'une balade à dos d'âne organisée localement, en option. Prise en charge, retour et déjeuner inclus. (Draft for native review.)",
  seo: {
    title: "Excursion Taroudant depuis Agadir : oasis de Tiout",
    description:
      "Excursion à Taroudant depuis Agadir : remparts, médina, souks, oasis de Tiout, palmeraies et déjeuner traditionnel avec vue sur l'oasis.",
  },
  primaryKeyword: "excursion taroudant depuis agadir",
  durationHours: 9,
  pickupWindow: "08h00 à 09h00",
  returnApprox: "17h00 à 17h45",
  days: "Tous les jours de l'année ; idéal de la fin d'automne au printemps",
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
        label: "Adulte (déjeuner inclus)",
        amount: 38,
        unit: "person",
      },
      {
        label: "Enfant 4 à 11 ans (déjeuner inclus)",
        amount: 19,
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
    "Hotel pickup in Agadir.",
    "Taroudant: historic walls and gates, old medina, souks, carpets and handicrafts.",
    "Optional photo stop for goats in argan trees, if local conditions allow.",
    "Drive south-east to the Tiout oasis.",
    "Tiout: palm groves, village landscapes and the historic kasbah area.",
    "Traditional Moroccan lunch with views over the oasis.",
    "Optional walk through the oasis and optional donkey ride, subject to local availability.",
    "Return to Agadir, arriving about 17:00 to 17:45 depending on traffic.",
  ],
  includedExtra: [
    "Prise en charge et retour hôtel à Agadir",
    "Déjeuner marocain traditionnel à l'oasis de Tiout",
    "Bouteille d'eau par personne",
    "Commentaires du chauffeur-accompagnateur en français ou anglais",
  ],
  notIncluded: [
    "Balade à dos d'âne dans la palmeraie (en option, réglée sur place)",
    "Boissons au déjeuner",
    "Achats personnels aux souks de Taroudant",
    "Pourboires",
  ],
  bring: [
    "Comfortable shoes",
    "Hat, sunglasses and sunscreen",
    "Water",
    "Cash for purchases and the optional donkey ride",
  ],
  suitableFor: ["Couples", "Families", "Friends", "Small groups"],
  restrictions: [
    "Full day: about 3.5 to 4.5 hours in the vehicle in total.",
    "Goats in argan trees are rare on this road and never guaranteed.",
    "The donkey ride is optional, arranged locally, and subject to availability.",
  ],
  seasonalNotes: [
    "The Souss plain is very hot in summer; the morning start and a shaded lunch help.",
    "Late autumn to spring is the most comfortable time for this route.",
    "Palms are greenest after the winter and spring rains.",
  ],
  highlights: [
    "Journée complète depuis Agadir, prise en charge à l'hôtel",
    "Remparts, portes, médina et souks de Taroudant",
    "Chèvres dans les arganiers, selon la saison",
    "Oasis de Tiout : palmeraies, village et kasbah",
    "Déjeuner traditionnel avec vue sur l'oasis",
    "Promenade dans l'oasis et balade à dos d'âne, en option",
  ],
  route: {
    startPoint: "Central Agadir",
    legs: [
      {
        from: "Central Agadir",
        to: "Taroudant",
        km: 80,
        minutes: "75 to 95",
        notes: "N10 east through the Souss plain via Aït Melloul and Oulad Teima.",
      },
      {
        from: "Taroudant",
        to: "Tiout oasis",
        km: 30,
        minutes: "30 to 45",
        notes: "South-east on the Tata road.",
      },
      {
        from: "Tiout oasis",
        to: "Central Agadir",
        km: 110,
        minutes: "105 to 130",
        notes: "Return via Taroudant and the N10.",
      },
    ],
    roundTripKm: 220,
    drivingHoursTotal: "3 h 30 to 4 h 30",
  },
  faq: [
    {
      q: "Will we see the goats in the argan trees?",
      a: "Possibly, but it is rare on this inland road and never guaranteed. The coastal Agadir to Essaouira road is the more reliable place.",
    },
    {
      q: "Is the donkey ride included?",
      a: "No. It is optional, arranged locally, subject to availability, and paid on the spot.",
    },
    {
      q: "Why is Taroudant called the Little Marrakech?",
      a: "It is a walled city with a large medina and souks, but calmer and much less crowded than Marrakech.",
    },
  ],
  confirmFlags: [
    "price and lunch inclusion",
    "donkey ride price",
    "pickup and return times",
    "capacity",
  ],
} satisfies Service;

export default taroudantTiout;
