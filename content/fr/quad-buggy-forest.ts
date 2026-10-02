import type { Service } from "@/schemas/service";

export const quadBuggyForest: Service = {
  id: "quad-buggy-forest",
  category: "activity",
  status: "published",
  order: 3,
  slug: "quad-buggy-agadir-foret-dunes",
  title: "Quad et buggy à Agadir : aventure entre forêt et dunes",
  summary:
    "Partez pour une sortie tout-terrain lors de cette activité quad buggy agadir. Après un court transfert depuis votre hôtel, vous rejoignez la base, où l'équipe donne un briefing de sécurité et vous équipe d'un casque. Vous suivez ensuite un conducteur sur un parcours alternant forêt d'eucalyptus et paysages de dunes, avec une pause pour un thé à la menthe traditionnel. Vous pouvez conduire un quad, un quatre-roues à commandes de moto, ou un buggy à deux places, une petite voiture tout-terrain plus facile à partager. La conduite dure environ 1h30 à 2h, et la sortie environ 3h au total. Départs à 09h00, 14h00 et 16h00.",
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
    "Prise en charge à l'hôtel en minibus ou en 4x4.",
    "Environ 20 à 30 minutes de transfert jusqu'à la base tout-terrain.",
    "Briefing de sécurité et préparation de l'équipement.",
    "Conduite d'un quad ou d'un buggy en forêt d'eucalyptus et sur les pistes de dunes.",
    "Pause thé à la menthe traditionnel.",
    "Transfert de retour vers votre hôtel.",
    "Départs à 09h00, 14h00 et 16h00.",
  ],
  includedExtra: [
    "Briefing de sécurité et essai",
    "Casque et lunettes de protection",
    "Pause thé à la menthe chez l'habitant",
    "Transferts hôtel inclus",
  ],
  notIncluded: ["Photos et vidéos", "Pourboires"],
  bring: [
    "Chaussures fermées",
    "Pantalon long si possible",
    "Lunettes de soleil",
    "Foulard ou buff contre la poussière",
  ],
  suitableFor: ["Amateurs d'aventure", "Couples", "Amis", "Groupes"],
  restrictions: [
    "Non recommandé en cas de grossesse ou de problèmes de dos ou cardiaques.",
    "Les âges minimums et les règles de conduite du quad et du buggy sont fixés par l'opérateur et confirmés lors de votre demande.",
    "Les casques et équipements de protection sont fournis ; les clients doivent respecter le briefing de sécurité.",
    "Le départ de 16h00 peut se terminer après la tombée de la nuit en hiver.",
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
        minutes: "20 à 30",
        notes:
          "Site exact à confirmer ; les opérateurs décrivent une base au sud de la ville, vers Tifnit.",
      },
      {
        from: "Base",
        to: "Forest and dune trails (on the machines)",
        km: 15,
        minutes: "45 à 60",
        notes: "Temps de conduite compris dans les 1h30 à 2h sur le parcours.",
      },
      {
        from: "Base",
        to: "Central Agadir (return)",
        km: 22,
        minutes: "20 à 30",
        notes: "Transfert de retour.",
      },
    ],
    roundTripKm: 45,
    drivingHoursTotal: "0 h 40 à 1 h",
  },
  faq: [
    {
      q: "Quelle différence entre le quad et le buggy ?",
      a: "Un quad est un quatre-roues à commandes de moto. Un buggy est une petite voiture tout-terrain à deux places, souvent plus confortable à partager.",
    },
    {
      q: "Combien de temps dure l'activité ?",
      a: "Environ 1h30 à 2h de conduite, plus les transferts et la pause thé à la menthe. Environ 3h au total.",
    },
    {
      q: "Y a-t-il un âge minimum ?",
      a: "Les âges pour conduire et pour monter en passager sont fixés par l'opérateur. Nous les confirmons pour votre groupe lors de votre demande.",
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
