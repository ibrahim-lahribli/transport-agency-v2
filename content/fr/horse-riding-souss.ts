import type { Service } from "@/schemas/service";

export const horseRidingSouss: Service = {
  id: "horse-riding-souss",
  category: "activity",
  status: "published",
  order: 4,
  slug: "balade-a-cheval-oued-souss-agadir",
  title: "Balade à cheval au bord de l'oued Souss",
  summary:
    "Profitez d'une balade tranquille lors de cette balade à cheval agadir, dans la verdure le long de l'oued Souss. Un court transfert vous emmène de votre hôtel au centre, où vous rencontrez votre cheval et votre hôte et suivez un bref briefing de sécurité. La balade longe la zone de l'oued et la ceinture d'eucalyptus, sur un terrain plat, ce qui convient aussi bien aux débutants qu'aux cavaliers plus à l'aise. Un casque est généralement fourni. Des balades le matin ou en fin d'après-midi, plus fraîches, sont possibles. Indiquez votre niveau lors de votre demande pour que l'hôte choisisse un cheval adapté.",
  seo: {
    title: "Balade à cheval Agadir : oued Souss, tous niveaux",
    description:
      "Balade à cheval agadir : une sortie calme le long de l'oued Souss et des pistes d'eucalyptus, pour débutants et cavaliers, avec transfert hôtel.",
  },
  primaryKeyword: "balade à cheval agadir",
  durationHours: 2.5,
  days: "Matin ou fin d'après-midi, sur demande",
  capacity: {
    min: 1,
    sharedMax: 8,
    privateAvailable: true,
  },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "estimate",
    confirmed: false,
    options: [
      {
        label: "Balade guidée d'une heure",
        amount: 25,
        unit: "person",
      },
      {
        label: "Balade de 2 heures en option",
        amount: 40,
        unit: "person",
      },
    ],
  },
  cancellationPolicy: "adventure",
  languages: ["en", "fr", "ar"],
  host: "operator-team",
  itinerary: [
    "Prise en charge à l'hôtel à Agadir.",
    "Transfert vers le centre équestre près de l'oued Souss, au sud de la ville.",
    "Rencontre avec votre cheval et votre hôte ; bref briefing de sécurité et mise en selle.",
    "Balade le long de la zone de l'oued Souss et des pistes d'eucalyptus.",
    "Retour au centre puis transfert vers votre hôtel.",
    "Une balade en fin d'après-midi est également possible ; l'horaire est arrangé lors de votre demande.",
  ],
  includedExtra: [
    "Balade guidée d'une heure",
    "Casque d'équitation",
    "Prise en charge et retour à l'hôtel",
  ],
  notIncluded: ["Photos et vidéos", "Pourboires"],
  bring: ["Pantalon long", "Chaussures fermées", "Crème solaire et chapeau", "Eau"],
  suitableFor: ["Débutants", "Cavaliers confirmés", "Couples", "Amis"],
  restrictions: [
    "La balade n'est pas recommandée en cas de grossesse ou de problèmes de dos.",
    "L'âge minimum et les limites de poids sont fixés par l'opérateur et confirmés lors de votre demande.",
    "Un casque est normalement fourni ; prévenez-nous à l'avance si vous avez besoin d'une taille particulière.",
  ],
  pickupWindow: "09h00 à 09h30 (matin) / 15h30 à 16h00 (fin d'après-midi)",
  returnApprox: "11h15 à 11h45 (matin) / 18h00 à 18h30 (fin d'après-midi)",
  highlights: [
    "Balade le long de l'oued Souss près d'Agadir",
    "Terrain plat, adapté aux débutants",
    "Cheval et rythme selon votre niveau",
    "Balades le matin ou en fin d'après-midi",
    "Prise en charge et retour à l'hôtel inclus",
    "Un hôte vous accompagne pendant la balade",
  ],
  route: {
    startPoint: "Central Agadir",
    legs: [
      {
        from: "Central Agadir",
        to: "Riding centre near the mouth of the Oued Souss",
        km: 9,
        minutes: "20 à 25",
        notes: "Court transfert au sud de la ville.",
      },
      {
        from: "Riding centre",
        to: "Souss river and eucalyptus trails (on horseback)",
        km: 6,
        minutes: "60 à 120",
        notes: "Terrain plat le long de l'oued et à travers les arbres.",
      },
      {
        from: "Riding centre",
        to: "Central Agadir (return)",
        km: 9,
        minutes: "20 à 25",
        notes: "Transfert de retour.",
      },
    ],
    roundTripKm: 24,
    drivingHoursTotal: "0 h 40 à 0 h 50",
  },
  faq: [
    {
      q: "Est-ce adapté aux débutants ?",
      a: "Oui. Le parcours se fait sur terrain plat et convient aux débutants comme aux cavaliers plus à l'aise, selon les exigences de sécurité de l'opérateur.",
    },
    {
      q: "Que vous faut-il pour l'organiser ?",
      a: "Le nom de votre hôtel, les noms complets de tous les cavaliers, la date et l'heure souhaitées, et votre expérience équestre.",
    },
    {
      q: "Un casque est-il fourni ?",
      a: "Un casque est normalement proposé. Indiquez-nous votre taille de tête à l'avance et nous la confirmerons avec l'opérateur.",
    },
  ],
  confirmFlags: [
    "price",
    "weight and age limits",
    "helmet provision",
    "cash payment at pickup",
    "operator licence and insurance",
  ],
} satisfies Service;

export default horseRidingSouss;
