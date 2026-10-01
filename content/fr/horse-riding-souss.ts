import type { Service } from "@/schemas/service";

export const horseRidingSouss: Service = {
  id: "horse-riding-souss",
  category: "activity",
  status: "draft",
  order: 4,
  slug: "balade-a-cheval-oued-souss-agadir",
  title: "Balade à cheval au bord de l'oued Souss",
  summary:
    "Profitez d'une balade tranquille lors de cette balade à cheval agadir, dans la verdure le long de l'oued Souss. Un court transfert vous emmène de votre hôtel au centre, où vous rencontrez votre cheval et votre hôte et suivez un bref briefing de sécurité. La balade longe la zone de l'oued et la ceinture d'eucalyptus, sur un terrain plat, ce qui convient aussi bien aux débutants qu'aux cavaliers plus à l'aise. Un casque est généralement fourni. Des balades le matin ou en fin d'après-midi, plus fraîches, sont possibles. Indiquez votre niveau lors de votre demande pour que l'hôte choisisse un cheval adapté. (Draft for native review.)",
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
    "Hotel pickup in Agadir.",
    "Transfer to the riding centre near the Oued Souss, south of the city.",
    "Meet your horse and your host; short safety briefing and mounting.",
    "Ride along the Souss river area and the eucalyptus trails.",
    "Return to the centre and transfer back to your hotel.",
    "A late-afternoon ride is also possible; the timing is arranged when you request.",
  ],
  includedExtra: [
    "Balade guidée d'une heure",
    "Casque d'équitation",
    "Prise en charge et retour à l'hôtel",
  ],
  notIncluded: ["Photos et vidéos", "Pourboires"],
  bring: ["Long trousers", "Closed shoes", "Sunscreen and hat", "Water"],
  suitableFor: ["Beginners", "Experienced riders", "Couples", "Friends"],
  restrictions: [
    "Riding is not recommended in pregnancy or with back problems.",
    "Minimum age and weight limits are set by the operator and confirmed when you request.",
    "A helmet is normally provided; tell us in advance if you need a particular size.",
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
        minutes: "20 to 25",
        notes: "Short transfer south of the city.",
      },
      {
        from: "Riding centre",
        to: "Souss river and eucalyptus trails (on horseback)",
        km: 6,
        minutes: "60 to 120",
        notes: "Flat ground along the river and through the trees.",
      },
      {
        from: "Riding centre",
        to: "Central Agadir (return)",
        km: 9,
        minutes: "20 to 25",
        notes: "Return transfer.",
      },
    ],
    roundTripKm: 24,
    drivingHoursTotal: "0 h 40 to 0 h 50",
  },
  faq: [
    {
      q: "Is it suitable for beginners?",
      a: "Yes. The route is on flat ground and suits beginners, as well as more confident riders, subject to the operator's safety requirements.",
    },
    {
      q: "What do you need from us to arrange it?",
      a: "Your hotel name, the full names of everyone riding, your preferred date and time, and your riding experience.",
    },
    {
      q: "Is a helmet provided?",
      a: "A helmet is normally offered. Tell us your head size in advance and we will confirm it with the operator.",
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
