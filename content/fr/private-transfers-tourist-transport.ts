import type { Service } from "@/schemas/service";

export const privateTransfersTouristTransport: Service = {
  id: "private-transfers-tourist-transport",
  category: "transfer",
  status: "published",
  order: 15,
  slug: "transferts-prives-transport-touristique-agadir",
  title: "Transferts privés et transport touristique depuis Agadir",
  summary:
    "Chauffeurs privés entre Agadir et Essaouira, Marrakech, Imsouane et d'autres villes, ainsi que mise à disposition d'un véhicule privé avec chauffeur à la journée pour vos excursions.",
  seo: {
    title: "Transfert privé Agadir : Essaouira, Marrakech",
    description:
      "Chauffeur privé d'Agadir vers Essaouira, Marrakech, Imsouane et au-delà, et véhicule avec chauffeur à la journée pour vos excursions.",
  },
  primaryKeyword: "transfert privé agadir",
  availability: "Sur réservation préalable",
  direction: "Aller simple ; trajets retour sur devis",
  price: {
    currency: "EUR",
    unit: "vehicle",
    confirmed: false,
    nightSurcharge: 0,
  },
  cancellationPolicy: "transfer",
  languages: ["en", "fr", "ar"],
  host: "driver",
  dayHire: {
    usesSiteRates: "privateDayRates",
    note: "Véhicule privé avec chauffeur pour votre propre itinéraire. Jusqu'à 10 heures, jusqu'à 250 km, carburant, péages et parking inclus.",
  },
  routes: [
    {
      from: "Aéroport Agadir Al Massira (AGA) ou hôtel à Agadir",
      to: "Essaouira",
      distanceKm: 175,
      minutes: "environ 150",
      prices: {
        sedan: 95,
        van: 125,
        minibus: 180,
      },
      basis: "market-benchmark",
    },
    {
      from: "Aéroport Agadir Al Massira (AGA) ou hôtel à Agadir",
      to: "Marrakech",
      distanceKm: 250,
      minutes: "environ 210",
      prices: {
        sedan: 125,
        van: 160,
        minibus: 230,
      },
      basis: "market-benchmark",
    },
  ],
  extras: [
    {
      label: "Arrêt supplémentaire",
      amount: 5,
      unit: "vehicle",
    },
    {
      label: "Heure supplémentaire au-delà de 10 heures, par heure",
      amount: 8,
      unit: "vehicle",
      note: "8 EUR/h berline, 10 EUR/h van, 15 EUR/h minibus",
    },
  ],
  vehicles: ["sedan", "van", "minibus"],
  includedExtra: [
    "Carburant, péages et stationnement",
    "Chauffeur professionnel",
    "Suivi de vol pour les accueils à l'aéroport",
  ],
  notIncluded: [
    "Droits d'entrée aux sites et monuments",
    "Repas",
    "Nuitées du chauffeur pour les longs trajets",
  ],
  faq: [
    {
      q: "Puis-je disposer d'un chauffeur privé pour mon propre circuit ?",
      a: "Oui. Choisissez la formule à la journée avec véhicule privé et chauffeur, et nous adaptons l'itinéraire selon vos envies.",
    },
    {
      q: "Comment obtenir un devis pour une autre ville ?",
      a: "Contactez-nous directement sur WhatsApp en indiquant le trajet, la date et le nombre de passagers.",
    },
  ],
  confirmFlags: [
    "all route and day-hire prices",
    "overtime price",
    "tourist transport authorisation for each vehicle",
    "who owns and drives the vehicles",
  ],
} satisfies Service;

export default privateTransfersTouristTransport;
