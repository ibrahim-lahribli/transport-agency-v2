import type { Service } from "@/schemas/service";

export const taroudantTiout: Service = {
  id: "taroudant-tiout",
  category: "excursion",
  status: "published",
  order: 11,
  slug: "excursion-taroudant-oasis-tiout-depuis-agadir",
  title: "Excursion à Taroudant et à l'oasis de Tiout depuis Agadir",
  summary:
    "Associez une ville fortifiée historique et les paysages d'une oasis lors de cette excursion à Taroudant depuis Agadir. Vous roulez vers l'est à travers la plaine du Souss jusqu'à Taroudant, surnommée la petite Marrakech, et parcourez ses longs remparts et ses portes, l'ancienne médina et les souks traditionnels. Selon les conditions locales, vous pourrez peut-être voir des chèvres dans les arganiers, mais cela n'est jamais garanti sur cette route. Vous poursuivez vers l'oasis de Tiout, ses palmeraies, ses ruelles de village et sa kasbah, avec un déjeuner traditionnel offrant une vue sur les palmiers. Une promenade dans l'oasis est possible, ainsi qu'une balade à dos d'âne organisée localement, en option. Prise en charge, retour et déjeuner inclus.",
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
    "Prise en charge à l'hôtel à Agadir.",
    "Taroudant : remparts et portes historiques, vieille médina, souks, tapis et artisanat.",
    "Arrêt photo facultatif pour les chèvres dans les arganiers, si les conditions locales le permettent.",
    "Route vers le sud-est jusqu'à l'oasis de Tiout.",
    "Tiout : palmeraies, paysages de village et zone historique de la kasbah.",
    "Déjeuner marocain traditionnel avec vue sur l'oasis.",
    "Promenade facultative dans l'oasis et balade à dos d'âne en option, selon la disponibilité locale.",
    "Retour à Agadir, arrivée vers 17h00 à 17h45 selon la circulation.",
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
    "Chaussures confortables",
    "Chapeau, lunettes de soleil et crème solaire",
    "Eau",
    "Espèces pour les achats et la balade à dos d'âne en option",
  ],
  suitableFor: ["Couples", "Familles", "Amis", "Petits groupes"],
  restrictions: [
    "Journée complète : environ 3h30 à 4h30 de véhicule au total.",
    "Les chèvres dans les arganiers sont rares sur cette route et jamais garanties.",
    "La balade à dos d'âne est facultative, organisée localement et soumise à disponibilité.",
  ],
  seasonalNotes: [
    "La plaine du Souss est très chaude en été ; le départ matinal et un déjeuner à l'ombre aident.",
    "De la fin de l'automne au printemps, c'est la période la plus agréable pour cet itinéraire.",
    "Les palmiers sont les plus verts après les pluies d'hiver et de printemps.",
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
        minutes: "75 à 95",
        notes: "N10 vers l'est à travers la plaine du Souss via Aït Melloul et Oulad Teima.",
      },
      {
        from: "Taroudant",
        to: "Tiout oasis",
        km: 30,
        minutes: "30 à 45",
        notes: "Vers le sud-est par la route de Tata.",
      },
      {
        from: "Tiout oasis",
        to: "Central Agadir",
        km: 110,
        minutes: "105 à 130",
        notes: "Retour via Taroudant et la N10.",
      },
    ],
    roundTripKm: 220,
    drivingHoursTotal: "3 h 30 à 4 h 30",
  },
  faq: [
    {
      q: "Verrons-nous les chèvres dans les arganiers ?",
      a: "C'est possible, mais rare sur cette route intérieure et jamais garanti. La route côtière d'Agadir à Essaouira est l'endroit le plus fiable.",
    },
    {
      q: "La balade à dos d'âne est-elle incluse ?",
      a: "Non. Elle est facultative, organisée localement, soumise à disponibilité et réglée sur place.",
    },
    {
      q: "Pourquoi Taroudant est-elle appelée la petite Marrakech ?",
      a: "C'est une ville fortifiée avec une grande médina et des souks, mais plus calme et bien moins fréquentée que Marrakech.",
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
