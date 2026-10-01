import type { Service } from "@/schemas/service";

export const timlalinDunes: Service = {
  id: "timlalin-dunes",
  category: "activity",
  status: "published",
  order: 2,
  slug: "dunes-timlalin-quad-dromadaire-sandboard",
  title: "Dunes de Timlalin : quad, dromadaire et sandboard",
  summary:
    "Parcourez les dunes côtières lors de cette activité dunes timlalin agadir. Les dunes se trouvent au nord d'Agadir, après Tamri sur la route de la côte : comptez environ une heure à une heure et quart par trajet. Sur place, vous pouvez faire une balade à dos de dromadaire sur le sable, conduire un quad pendant environ une heure après un briefing de sécurité, et essayer le sandboard sur les pentes face à l'Atlantique. Vous choisissez les activités, qui peuvent aussi être combinées. Une option coucher de soleil est proposée en saison, avec un départ en fin d'après-midi et un retour peu après le coucher du soleil. Prise en charge et retour à l'hôtel inclus. (Draft for native review.)",
  seo: {
    title: "Dunes Timlalin Agadir : dromadaire, quad, sandboard",
    description:
      "Dunes timlalin agadir : balade à dromadaire, environ une heure de quad et sandboard sur les dunes côtières au nord d'Agadir, option coucher de soleil.",
  },
  primaryKeyword: "dunes timlalin agadir",
  durationHours: 5.5,
  departures: ["08:30", "13:30", "15:45"],
  days: "Tous les jours ; matin, après-midi ou coucher du soleil",
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
        label: "Balade à dromadaire (environ 45 min)",
        amount: 15,
        unit: "person",
        isBase: true,
      },
      {
        label: "Balade à dromadaire au coucher du soleil",
        amount: 20,
        unit: "person",
      },
      {
        label: "Quad, 1 heure, conducteur seul",
        amount: 35,
        unit: "person",
      },
      {
        label: "Quad, 1 heure, deux sur un quad",
        amount: 50,
        unit: "quad",
      },
      {
        label: "Sandboard en option",
        amount: 10,
        unit: "person",
      },
      {
        label: "Formule combinée : quad 1h + dromadaire + sandboard",
        amount: 55,
        unit: "person",
      },
    ],
  },
  cancellationPolicy: "adventure",
  languages: ["en", "fr", "ar"],
  host: "operator-team",
  itinerary: [
    "Hotel pickup in Agadir and drive north toward Tamri (about 1 hour to 1 hour 15).",
    "Camel ride through the dunes, with views toward the Atlantic.",
    "Quad ride of about one hour over the sand, after a safety briefing.",
    "Sandboarding on the dune slopes.",
    "Photos and a short break in the dunes.",
    "Return drive to Agadir, arriving about 13:45 to 14:45.",
    "Sunset option: a late-afternoon start, returning shortly after sunset (seasonal).",
  ],
  includedExtra: [
    "Briefing de sécurité et équipement quad",
    "Planche de sandboard et casque",
    "Prise en charge à l'hôtel en Zone 1 (et Zone 2 en route)",
  ],
  notIncluded: ["Activités non sélectionnées", "Pourboires"],
  bring: [
    "Closed shoes",
    "Sunglasses",
    "Scarf or buff for the sand",
    "Sunscreen",
    "A light layer for the sunset option",
  ],
  suitableFor: ["Adventure lovers", "Couples", "Families", "Groups", "Photography"],
  restrictions: [
    "These are small coastal dunes, not deep desert dunes.",
    "The site is roughly 70 km north of Agadir, so about 1 hour to 1 hour 15 each way.",
    "Quad driving is typically limited to older guests; younger guests usually ride as passengers. Confirm ages when you request.",
    "Quad and camel riding are not recommended in pregnancy or with back or heart problems.",
  ],
  seasonalNotes: [
    "Sand is very hot at midday in summer; mornings and late afternoons are more comfortable.",
    "Sunset departures are seasonal; sunset is about 18:45 in winter and about 20:15 in summer.",
    "Sand is firmer after rain.",
  ],
  pickupWindow: "08h30 à 09h30 (matin) / 13h30 à 14h30 (après-midi)",
  returnApprox: "13h45 à 14h45 (matin) / 18h30 à 19h30 (après-midi)",
  highlights: [
    "Balade à dos de dromadaire dans les dunes côtières",
    "Sortie en quad d'environ une heure, avec briefing",
    "Sandboard sur les pentes des dunes",
    "Combinez les activités si vous le souhaitez",
    "Option coucher de soleil en saison",
    "Prise en charge et retour à l'hôtel inclus",
  ],
  route: {
    startPoint: "Central Agadir",
    legs: [
      {
        from: "Central Agadir",
        to: "Timlaline dunes near Tamri (N1 north)",
        km: 68,
        minutes: "60 to 80",
        notes: "Coast road north past Anza, Tamraght and Tamri.",
      },
      {
        from: "Dune area",
        to: "Camel, quad and sandboarding points",
        km: 5,
        minutes: "10 to 20",
        notes: "Short moves between the activity spots.",
      },
      {
        from: "Timlaline",
        to: "Central Agadir (return, N1 south)",
        km: 68,
        minutes: "60 to 80",
        notes: "Same road back.",
      },
    ],
    roundTripKm: 141,
    drivingHoursTotal: "2 h 10 to 2 h 45",
  },
  faq: [
    {
      q: "How far is Timlalin from Agadir?",
      a: "About 70 km north, past Tamri, which is roughly 1 hour to 1 hour 15 each way. It is a half-day trip door to door.",
    },
    {
      q: "Can I combine the camel ride, quad and sandboarding?",
      a: "Yes. You can choose one activity or combine them. We confirm the combination and timing when you request.",
    },
    {
      q: "Is there an age limit for the quad?",
      a: "Usually you must be old enough to drive safely; younger guests often ride as passengers. We confirm the exact ages when you request.",
    },
  ],
  confirmFlags: [
    "all option prices",
    "drive time from Agadir",
    "minimum ages",
    "sunset schedule",
    "operator licence and insurance",
    "board and helmet provision",
  ],
} satisfies Service;

export default timlalinDunes;
