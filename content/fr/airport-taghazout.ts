import type { Service } from "@/schemas/service";

export const airportTaghazout: Service = {
  id: "airport-taghazout",
  category: "transfer",
  status: "published",
  order: 14,
  slug: "transfert-prive-aeroport-agadir-taghazout",
  title: "Transfert privé aéroport Agadir vers Taghazout",
  summary:
    "Transfert privé entre l'aéroport d'Agadir Al Massira et Taghazout, Taghazout Bay, Tamraght ou Aourir. Prix fixe, suivi de vol et espace pour planches de surf sur demande.",
  seo: {
    title: "Transfert aéroport Agadir Taghazout : voiture privée",
    description:
      "Transfert privé de l'aéroport d'Agadir vers Taghazout, Tamraght et Aourir. Suivi de vol, prix fixe, planches de surf sur demande.",
  },
  primaryKeyword: "transfert aéroport agadir taghazout",
  availability: "24h/24 et 7j/7 sur réservation préalable",
  direction: "Aller simple ; le même tarif s'applique dans le sens inverse",
  price: {
    currency: "EUR",
    unit: "vehicle",
    confirmed: false,
    nightSurcharge: 0,
  },
  cancellationPolicy: "transfer",
  languages: ["en", "fr", "ar"],
  host: "driver",
  routes: [
    {
      from: "Aéroport Agadir Al Massira (AGA)",
      to: "Tamraght et Aourir",
      minutes: "40 à 45",
      prices: {
        sedan: 30,
        van: 40,
        minibus: 65,
      },
      basis: "estimate",
    },
    {
      from: "Aéroport Agadir Al Massira (AGA)",
      to: "Village de Taghazout et Taghazout Bay",
      distanceKm: 45,
      minutes: 50,
      prices: {
        sedan: 35,
        van: 45,
        minibus: 70,
      },
      basis: "catalogue",
    },
    {
      from: "Aéroport Agadir Al Massira (AGA)",
      to: "Imsouane",
      distanceKm: 100,
      minutes: 90,
      prices: {
        sedan: 70,
        van: 90,
        minibus: 130,
      },
      basis: "market-benchmark",
    },
  ],
  extras: [
    {
      label: "Planches de surf et vélos",
      amount: 0,
      unit: "vehicle",
      note: "Van ou minibus requis. Jusqu'à 4 planches gratuites, puis 5 EUR par planche supplémentaire.",
    },
    {
      label: "Arrêt supplémentaire en route",
      amount: 5,
      unit: "vehicle",
    },
    {
      label: "Attente au-delà de 60 minutes après atterrissage, par 30 minutes",
      amount: 5,
      unit: "per 30 min",
    },
    {
      label: "Siège enfant",
      amount: 0,
      unit: "vehicle",
      note: "Gratuit sur demande 24h à l'avance",
    },
  ],
  vehicles: ["sedan", "van", "minibus"],
  includedExtra: [
    "Suivi de votre vol en temps réel",
    "Chauffeur dans le hall des arrivées avec pancarte nominative",
    "60 minutes d'attente gratuite après atterrissage",
    "Carburant, péages et stationnement",
  ],
  notIncluded: ["Arrêts supplémentaires", "Attente au-delà des 60 minutes gratuites"],
  faq: [
    {
      q: "Pouvez-vous transporter des planches de surf ?",
      a: "Oui, sur demande préalable. Précisez le nombre et la taille des planches pour que nous mettions à disposition un van adapté.",
    },
    {
      q: "Quelles destinations côtières sont couvertes ?",
      a: "Taghazout, Taghazout Bay, Tamraght et Aourir. Imsouane est également disponible.",
    },
  ],
  confirmFlags: [
    "all route prices",
    "surfboard rules and supplement",
    "night surcharge",
    "driver authorisation",
    "actual travel times",
  ],
} satisfies Service;

export default airportTaghazout;
