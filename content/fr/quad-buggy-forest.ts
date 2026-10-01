import type { Service } from "@/schemas/service";

export const quadBuggyForest: Service = {
  id: "quad-buggy-forest",
  category: "activity",
  status: "draft",
  order: 3,
  slug: "quad-buggy-agadir-foret-dunes",
  title: "Quad et buggy à Agadir : aventure entre forêt et dunes",
  summary:
    "Partez pour une sortie tout-terrain lors de cette activité quad buggy agadir. Après un court transfert depuis votre hôtel, vous rejoignez la base, où l'équipe donne un briefing de sécurité et vous équipe d'un casque. Vous suivez ensuite un conducteur sur un parcours alternant forêt d'eucalyptus et paysages de dunes, avec une pause pour un thé à la menthe traditionnel. Vous pouvez conduire un quad, un quatre-roues à commandes de moto, ou un buggy à deux places, une petite voiture tout-terrain plus facile à partager. La conduite dure environ 1h30 à 2h, et la sortie environ 3h au total. Départs à 09h00, 14h00 et 16h00. (Draft for native review.)",
  seo: {
    title: "Quad Buggy Agadir : forêt et dunes en 3 h",
    description:
      "Quad buggy agadir : sortie tout-terrain en forêt d'eucalyptus et dans les dunes près d'Agadir, avec briefing de sécurité et pause thé à la menthe.",
  },
  primaryKeyword: "quad buggy agadir",
  durationHours: 3.5,
  departures: ["09:00", "14:00", "16:00"],
  days: "Tous les jours (dernier départ d'hiver à 15h00 de novembre à février)",
  capacity: {
    min: 1,
    sharedMax: 12,
    privateAvailable: true,
  },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "estimate",
    confirmed: false,
    options: [
      {
        label: "Quad, conducteur seul",
        amount: 35,
        unit: "person",
      },
      {
        label: "Quad, deux sur un quad",
        amount: 50,
        unit: "quad",
      },
      {
        label: "Buggy, 2 places",
        amount: 80,
        unit: "buggy",
      },
    ],
  },
  cancellationPolicy: "adventure",
  languages: ["en", "fr", "ar"],
  host: "operator-team",
  itinerary: [
    "Hotel pickup by minibus or 4x4.",
    "About 20 to 30 minutes transfer to the off-road base.",
    "Safety briefing and equipment preparation.",
    "Ride a quad or a buggy through eucalyptus forest and dune trails.",
    "Traditional Moroccan mint tea break.",
    "Return transfer to your hotel.",
    "Departures at 09:00, 14:00 and 16:00.",
  ],
  includedExtra: [
    "Briefing de sécurité et essai",
    "Casque et lunettes de protection",
    "Pause thé à la menthe chez l'habitant",
    "Transferts hôtel inclus",
  ],
  notIncluded: ["Photos et vidéos", "Pourboires"],
  bring: ["Closed shoes", "Long trousers if possible", "Sunglasses", "Scarf or buff for dust"],
  suitableFor: ["Adventure lovers", "Couples", "Friends", "Groups"],
  restrictions: [
    "Not recommended in pregnancy or with back or heart problems.",
    "Minimum ages and driving rules for quad and buggy are set by the operator and confirmed when you request.",
    "Helmets and protective equipment are provided; guests must follow the safety briefing.",
    "The 16:00 departure may finish after dark in winter.",
  ],
  pickupWindow: "08h45 à 09h00 (départ 09h00) / 13h45 à 14h00 (départ 14h00)",
  returnApprox: "11h45 à 12h30 (départ 09h00) / 16h45 à 17h30 (départ 14h00)",
  highlights: [
    "Sortie tout-terrain en forêt d'eucalyptus et dans les dunes",
    "Au choix : quad ou buggy à deux places",
    "Briefing de sécurité avant le départ",
    "Environ 1h30 à 2h de conduite",
    "Pause thé à la menthe traditionnel",
    "Départs à 09h00, 14h00 et 16h00",
  ],
  route: {
    startPoint: "Central Agadir",
    legs: [
      {
        from: "Central Agadir",
        to: "Off-road base near Agadir",
        km: 22,
        minutes: "20 to 30",
        notes:
          "Exact site to be confirmed; operators describe a base south of the city, around Tifnit.",
      },
      {
        from: "Base",
        to: "Forest and dune trails (on the machines)",
        km: 15,
        minutes: "45 to 60",
        notes: "Riding time within the 1.5 to 2 hours on the route.",
      },
      {
        from: "Base",
        to: "Central Agadir (return)",
        km: 22,
        minutes: "20 to 30",
        notes: "Return transfer.",
      },
    ],
    roundTripKm: 45,
    drivingHoursTotal: "0 h 40 to 1 h",
  },
  faq: [
    {
      q: "What is the difference between the quad and the buggy?",
      a: "A quad is a four-wheeler with motorbike-style controls. A buggy is a small two-seat off-road car, often more comfortable to share.",
    },
    {
      q: "How long does the activity last?",
      a: "About 1.5 to 2 hours of riding, plus transfers and the mint tea break. Around 3 hours door to door.",
    },
    {
      q: "Is there a minimum age?",
      a: "Ages for driving and for riding as a passenger are set by the operator. We confirm them for your group when you request.",
    },
  ],
  confirmFlags: [
    "all prices",
    "departure times by season",
    "minimum ages and licence rules",
    "operator licence and insurance",
    "group size limit",
  ],
} satisfies Service;

export default quadBuggyForest;
