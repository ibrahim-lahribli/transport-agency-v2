import type { Service } from "@/schemas/service";

export const crocoparc: Service = {
  id: "crocoparc",
  category: "activity",
  status: "published",
  order: 5,
  slug: "crocoparc-agadir-transport-prive",
  title: "Crocoparc Agadir avec transport privé",
  summary:
    "Visitez Crocoparc Agadir en transport privé, sans horaire imposé. Votre chauffeur vient vous chercher à votre hôtel et vous emmène à quelques kilomètres à l'est, à Drarga, où se trouve le parc sur la route d'Agadir à Marrakech. Sur place, vous avancez à votre rythme devant les crocodiles du Nil et les tortues géantes, le long des jardins botaniques et des espaces extérieurs adaptés aux familles avec enfants. Votre chauffeur vous attend pendant la visite, puis vous ramène à votre hôtel. Les billets d'entrée ne sont pas inclus et se paient directement au parc, séparément du transport. (Draft for native review.)",
  seo: {
    title: "Crocoparc Agadir avec transport privé",
    description:
      "Visite du crocoparc agadir avec transport privé depuis l'hôtel : crocodiles, tortues et jardins botaniques, temps d'attente et retour inclus.",
  },
  primaryKeyword: "crocoparc agadir",
  durationHours: 3.5,
  days: "Tous les jours, départs flexibles le matin ou l'après-midi",
  capacity: {
    min: 1,
    sharedMax: 7,
    privateAvailable: true,
  },
  price: {
    currency: "EUR",
    unit: "vehicle",
    basis: "estimate",
    confirmed: false,
    options: [
      {
        label: "Voiture privée, jusqu'à 3 personnes, aller-retour avec 2h30 d'attente",
        amount: 25,
        unit: "vehicle",
        isBase: true,
      },
      {
        label: "Van privé, 4 à 7 personnes, aller-retour avec 2h30 d'attente",
        amount: 35,
        unit: "vehicle",
      },
      {
        label: "Temps d'attente supplémentaire",
        amount: 5,
        unit: "per 30 min",
      },
    ],
    separateCost: "Les billets d'entrée ne sont pas inclus et sont réglés sur place au parc.",
  },
  cancellationPolicy: "transfer",
  languages: ["en", "fr", "ar"],
  host: "driver",
  itinerary: [
    "Hotel pickup in Agadir.",
    "Private transport to Crocoparc in Drarga, east of the city.",
    "Visit at your own pace: Nile crocodiles, giant tortoises and other reptiles.",
    "Walk the botanical gardens and family-friendly outdoor spaces.",
    "Your driver waits for you during the visit.",
    "Return transfer to your hotel.",
  ],
  includedExtra: [
    "Prise en charge à votre hôtel à Agadir",
    "Transport privé aller-retour",
    "Environ 2h30 d'attente à Crocoparc",
  ],
  notIncluded: [
    "Billets d'entrée à Crocoparc (réglés sur place au parc)",
    "Restauration et boissons dans le parc",
    "Pourboires",
  ],
  bring: ["Hat and sunscreen", "Comfortable shoes", "Cash or card for entrance tickets", "Water"],
  suitableFor: ["Families", "Children", "Nature lovers"],
  pickupWindow: "09h45 à 10h30",
  returnApprox: "13h00 à 14h00",
  highlights: [
    "Transport privé jusqu'à Crocoparc, à l'est d'Agadir",
    "Crocodiles du Nil et tortues géantes",
    "Autres reptiles et jardins botaniques",
    "Espaces extérieurs adaptés aux familles",
    "Votre chauffeur vous attend pendant la visite",
    "Entrée non incluse ; à payer au parc",
  ],
  route: {
    startPoint: "Central Agadir",
    legs: [
      {
        from: "Central Agadir",
        to: "Crocoparc, Drarga (RN8)",
        km: 14,
        minutes: "15 to 20",
        notes: "East of the city on the Agadir to Marrakech road.",
      },
      {
        from: "Crocoparc",
        to: "Central Agadir (return)",
        km: 14,
        minutes: "15 to 25",
        notes: "Return transfer after your visit.",
      },
    ],
    roundTripKm: 28,
    drivingHoursTotal: "0 h 30 to 0 h 45",
  },
  faq: [
    {
      q: "Are entrance tickets included?",
      a: "No. Transport and tickets are separate. You pay the park directly for entry, and your driver waits while you visit.",
    },
    {
      q: "How long can we stay?",
      a: "The included waiting time is about 2.5 hours. Longer visits may be possible on request, sometimes with a small supplement.",
    },
    {
      q: "Is it suitable for young children?",
      a: "Yes. The paths are easy, and the park is designed for families. A pushchair is manageable on most of the route.",
    },
  ],
  confirmFlags: [
    "transport prices",
    "waiting time included",
    "current park ticket prices and opening hours",
    "whether entrance is sold as a package",
  ],
} satisfies Service;

export default crocoparc;
