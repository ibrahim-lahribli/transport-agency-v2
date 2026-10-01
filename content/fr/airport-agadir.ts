import type { Service } from "@/schemas/service";

export const airportAgadir: Service = {
  id: "airport-agadir",
  category: "transfer",
  status: "draft",
  order: 13,
  slug: "transfert-aeroport-agadir-hotels",
  title: "Transfert aéroport Agadir vers les hôtels d'Agadir",
  summary:
    "Transfert privé entre l'aéroport d'Agadir Al Massira (AGA) et votre hôtel à Agadir. Suivi de vol, accueil avec pancarte nominative et 60 minutes d'attente gratuite incluses.",
  seo: {
    title: "Transfert aéroport Agadir vers les hôtels",
    description:
      "Transfert privé de l'aéroport d'Agadir vers votre hôtel. Prix fixe par véhicule, suivi de vol et 60 minutes d'attente gratuite incluses.",
  },
  primaryKeyword: "transfert aéroport agadir",
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
      to: "Centre-ville d'Agadir, front de mer, Founty, Sonaba, Talborjt, Marina",
      distanceKm: 25,
      minutes: 30,
      prices: {
        sedan: 20,
        van: 30,
        minibus: 50,
      },
      basis: "catalogue",
    },
    {
      from: "Aéroport Agadir Al Massira (AGA)",
      to: "Anza",
      distanceKm: 32,
      minutes: "35 à 40",
      prices: {
        sedan: 25,
        van: 35,
        minibus: 55,
      },
      basis: "estimate",
    },
    {
      from: "Hôtel à Agadir",
      to: "Un autre hôtel à Agadir ou la marina",
      minutes: "10 à 20",
      prices: {
        sedan: 12,
        van: 18,
        minibus: 30,
      },
      basis: "estimate",
    },
  ],
  extras: [
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
    "Chauffeur présent dans le hall des arrivées avec pancarte à votre nom",
    "60 minutes d'attente gratuite après atterrissage",
    "Assistance pour vos bagages",
    "Carburant, péages et frais de stationnement inclus",
  ],
  notIncluded: ["Arrêts supplémentaires", "Attente au-delà des 60 minutes gratuites"],
  faq: [
    {
      q: "Où vais-je retrouver mon chauffeur ?",
      a: "Dans le hall des arrivées, tenant une pancarte avec votre nom. Vous recevrez également son nom et son numéro sur WhatsApp avant l'atterrissage.",
    },
    {
      q: "Que se passe-t-il si mon vol a du retard ?",
      a: "Nous suivons votre vol en temps réel et nous ajustons l'heure de prise en charge sans frais supplémentaires.",
    },
    {
      q: "Le prix est-il par personne ?",
      a: "Non, le tarif est par véhicule privé : berline jusqu'à 3 passagers, van pour 4 à 7, minibus pour 8 à 15.",
    },
  ],
  confirmFlags: [
    "all route prices and the vehicle price ladder",
    "no night surcharge",
    "child seat availability and price",
    "waiting policy",
    "driver and vehicle authorisation",
    "airport meeting rules",
  ],
} satisfies Service;

export default airportAgadir;
