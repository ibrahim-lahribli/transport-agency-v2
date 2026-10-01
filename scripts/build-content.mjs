import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const activities = JSON.parse(
  fs.readFileSync(path.join(rootDir, "data/source/activities.json"), "utf8"),
);
const excursions = JSON.parse(
  fs.readFileSync(path.join(rootDir, "data/source/excursions.json"), "utf8"),
);
const transfers = JSON.parse(
  fs.readFileSync(path.join(rootDir, "data/source/transfers.json"), "utf8"),
);

// Helper to remove any forbidden "Sahara" words
function cleanText(text) {
  if (!text) return text;
  if (Array.isArray(text)) {
    return text.map(cleanText).join(" ");
  }
  if (typeof text !== "string") return String(text);
  return text
    .replace(/not desert or Sahara dunes/gi, "not deep desert dunes")
    .replace(/pas le Sahara/gi, "pas le grand désert")
    .replace(/not the Sahara/gi, "not deep desert dunes")
    .replace(/Never describe them as the Sahara/gi, "Never describe them as deep desert")
    .replace(/Are these the Sahara dunes\?/gi, "Are these deep desert dunes?")
    .replace(/They are not the Sahara/gi, "They are small coastal dunes near the Atlantic")
    .replace(/Sahara/gi, "desert");
}

function cleanArray(arr) {
  if (!arr) return undefined;
  return arr.map((item) => (typeof item === "string" ? cleanText(item) : item));
}

function cleanFaq(faq) {
  if (!faq) return undefined;
  return faq.map((item) => ({
    q: cleanText(item.q),
    a: cleanText(item.a),
  }));
}

// Generate EN services
const enServices = {};
const frServices = {};

// 1. Boat Cruise
enServices["boat-cruise"] = {
  id: "boat-cruise",
  category: "activity",
  status: "draft",
  order: 1,
  slug: "agadir-boat-cruise-fishing-bbq-lunch",
  title: "Agadir Boat Cruise with Fishing & Fish BBQ Lunch",
  summary: cleanText(activities[0].summary.en),
  seo: {
    title: "Agadir Boat Trip: Fishing & Fish BBQ",
    description: activities[0].seo.en.description,
  },
  primaryKeyword: "agadir boat trip",
  durationHours: 6,
  activityHours: 4.25,
  departures: ["09:15"],
  days: "Daily, subject to weather and boat availability",
  capacity: { min: 2, sharedMax: 20, privateAvailable: true },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "estimate",
    confirmed: false,
    options: [
      { label: "Adult", amount: 35, unit: "person" },
      { label: "Child 4 to 11", amount: 18, unit: "person" },
      { label: "Child under 4", amount: 0, unit: "person" },
    ],
    privateOnRequest: "From 360 EUR per boat for up to 8 guests; larger boats quoted by group size",
  },
  cancellationPolicy: "adventure",
  languages: ["en", "fr", "ar"],
  host: "boat-crew",
  itinerary: cleanArray(activities[0].itinerary),
  includedExtra: [
    "Fishing equipment",
    "Fish barbecue lunch with traditional salad",
    "Marina transfers",
    "Life jackets on board",
  ],
  notIncluded: ["Drinks (water and one soft drink included; others extra)", "Tips"],
  bring: cleanArray(activities[0].bring),
  suitableFor: cleanArray(activities[0].suitableFor),
  restrictions: cleanArray(activities[0].restrictions),
  seasonalNotes: "Winter swells can cancel trips, mornings calmer; summer calmer seas, strong sun.",
  pickupWindow: "08:00 to 08:45",
  returnApprox: "14:00 to 14:45",
  highlights: cleanArray(activities[0].highlights.en),
  route: activities[0].route,
  faq: cleanFaq(activities[0].faq),
  confirmFlags: activities[0].confirmFlags,
};

frServices["boat-cruise"] = {
  id: "boat-cruise",
  category: "activity",
  status: "draft",
  order: 1,
  slug: "sortie-bateau-agadir-peche-barbecue",
  title: "Sortie en bateau à Agadir : pêche et barbecue de poisson",
  summary: cleanText(activities[0].summary.fr),
  seo: {
    title: "Sortie en bateau Agadir : pêche et BBQ",
    description: activities[0].seo.fr.description,
  },
  primaryKeyword: "sortie en bateau agadir",
  durationHours: 6,
  activityHours: 4.25,
  departures: ["09:15"],
  days: "Tous les jours, selon météo et disponibilité du bateau",
  capacity: { min: 2, sharedMax: 20, privateAvailable: true },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "estimate",
    confirmed: false,
    options: [
      { label: "Adulte", amount: 35, unit: "person" },
      { label: "Enfant 4 à 11 ans", amount: 18, unit: "person" },
      { label: "Enfant de moins de 4 ans", amount: 0, unit: "person" },
    ],
    privateOnRequest:
      "À partir de 360 EUR par bateau jusqu'à 8 personnes ; devis sur mesure pour les groupes plus importants",
  },
  cancellationPolicy: "adventure",
  languages: ["en", "fr", "ar"],
  host: "boat-crew",
  itinerary: cleanArray(activities[0].itinerary),
  includedExtra: [
    "Matériel de pêche",
    "Déjeuner barbecue de poisson avec salade traditionnelle",
    "Transferts marina inclus",
    "Gilets de sauvetage à bord",
  ],
  notIncluded: ["Boissons supplémentaires", "Pourboires"],
  bring: cleanArray(activities[0].bring),
  suitableFor: cleanArray(activities[0].suitableFor),
  restrictions: cleanArray(activities[0].restrictions),
  seasonalNotes:
    "La houle hivernale peut annuler les sorties, les matinées sont plus calmes ; été ensoleillé avec mer plus calme.",
  pickupWindow: "08h00 à 08h45",
  returnApprox: "14h00 à 14h45",
  highlights: cleanArray(activities[0].highlights.fr),
  route: activities[0].route,
  faq: cleanFaq(activities[0].faq),
  confirmFlags: activities[0].confirmFlags,
};

// 2. Timlalin Dunes
enServices["timlalin-dunes"] = {
  id: "timlalin-dunes",
  category: "activity",
  status: "draft",
  order: 2,
  slug: "timlalin-dunes-quad-camel-sandboarding",
  title: "Timlalin Dunes: Quad, Camel Ride & Sandboarding",
  summary: cleanText(activities[1].summary.en),
  seo: {
    title: "Timlalin Dunes Agadir: Camel, Quad & Sandboarding",
    description: cleanText(activities[1].seo.en.description),
  },
  primaryKeyword: "timlalin dunes agadir",
  durationHours: 5.5,
  departures: ["08:30", "13:30", "15:45"],
  days: "Daily; morning, afternoon or sunset",
  capacity: { min: 2, sharedMax: 16, privateAvailable: true },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "estimate",
    confirmed: false,
    options: [
      { label: "Camel ride (about 45 minutes)", amount: 15, unit: "person" },
      { label: "Sunset camel ride", amount: 20, unit: "person" },
      { label: "Quad, 1 hour, single rider", amount: 35, unit: "person" },
      { label: "Quad, 1 hour, two riders on one quad", amount: 50, unit: "quad" },
      { label: "Sandboarding add-on", amount: 10, unit: "person" },
      {
        label: "Dunes combo: quad 1 hour + camel ride + sandboarding",
        amount: 55,
        unit: "person",
      },
    ],
  },
  cancellationPolicy: "adventure",
  languages: ["en", "fr", "ar"],
  host: "operator-team",
  itinerary: cleanArray(activities[1].itinerary),
  includedExtra: [
    "Quad safety briefing and equipment",
    "Sandboard and helmet",
    "Hotel pickup in Zone 1 (and Zone 2 en route)",
  ],
  notIncluded: ["Activities not selected", "Tips"],
  bring: cleanArray(activities[1].bring),
  suitableFor: cleanArray(activities[1].suitableFor),
  restrictions: cleanArray(activities[1].restrictions),
  seasonalNotes: activities[1].seasonalNotes,
  pickupWindow: "08:30 to 09:30 (morning) / 13:30 to 14:30 (afternoon)",
  returnApprox: "13:45 to 14:45 (morning) / 18:30 to 19:30 (afternoon)",
  highlights: cleanArray(activities[1].highlights.en),
  route: activities[1].route,
  faq: cleanFaq(activities[1].faq),
  confirmFlags: activities[1].confirmFlags,
};

frServices["timlalin-dunes"] = {
  id: "timlalin-dunes",
  category: "activity",
  status: "draft",
  order: 2,
  slug: "dunes-timlalin-quad-dromadaire-sandboard",
  title: "Dunes de Timlalin : quad, dromadaire et sandboard",
  summary: cleanText(activities[1].summary.fr),
  seo: {
    title: "Dunes Timlalin Agadir : dromadaire, quad, sandboard",
    description: cleanText(activities[1].seo.fr.description),
  },
  primaryKeyword: "dunes timlalin agadir",
  durationHours: 5.5,
  departures: ["08:30", "13:30", "15:45"],
  days: "Tous les jours ; matin, après-midi ou coucher du soleil",
  capacity: { min: 2, sharedMax: 16, privateAvailable: true },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "estimate",
    confirmed: false,
    options: [
      { label: "Balade à dromadaire (environ 45 min)", amount: 15, unit: "person" },
      { label: "Balade à dromadaire au coucher du soleil", amount: 20, unit: "person" },
      { label: "Quad, 1 heure, conducteur seul", amount: 35, unit: "person" },
      { label: "Quad, 1 heure, deux sur un quad", amount: 50, unit: "quad" },
      { label: "Sandboard en option", amount: 10, unit: "person" },
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
  itinerary: cleanArray(activities[1].itinerary),
  includedExtra: [
    "Briefing de sécurité et équipement quad",
    "Planche de sandboard et casque",
    "Prise en charge à l'hôtel en Zone 1 (et Zone 2 en route)",
  ],
  notIncluded: ["Activités non sélectionnées", "Pourboires"],
  bring: cleanArray(activities[1].bring),
  suitableFor: cleanArray(activities[1].suitableFor),
  restrictions: cleanArray(activities[1].restrictions),
  seasonalNotes: activities[1].seasonalNotes,
  pickupWindow: "08h30 à 09h30 (matin) / 13h30 à 14h30 (après-midi)",
  returnApprox: "13h45 à 14h45 (matin) / 18h30 à 19h30 (après-midi)",
  highlights: cleanArray(activities[1].highlights.fr),
  route: activities[1].route,
  faq: cleanFaq(activities[1].faq),
  confirmFlags: activities[1].confirmFlags,
};

// 3. Quad Buggy Forest
enServices["quad-buggy-forest"] = {
  id: "quad-buggy-forest",
  category: "activity",
  status: "draft",
  order: 3,
  slug: "agadir-quad-buggy-adventure-forest",
  title: "Agadir Quad & Buggy Adventure through the Forest",
  summary: cleanText(activities[2].summary.en),
  seo: {
    title: "Quad Buggy Agadir: Forest and Dune Off-Road Ride",
    description: cleanText(activities[2].seo.en.description),
  },
  primaryKeyword: "quad buggy agadir",
  durationHours: 3.5,
  departures: ["09:00", "14:00", "16:00"],
  days: "Daily (last winter departure at 15:00 from November to February)",
  capacity: { min: 1, sharedMax: 12, privateAvailable: true },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "estimate",
    confirmed: false,
    options: [
      { label: "Quad, single rider", amount: 35, unit: "person" },
      { label: "Quad, two riders on one quad", amount: 50, unit: "quad" },
      { label: "Buggy, 2 seats", amount: 80, unit: "buggy" },
    ],
  },
  cancellationPolicy: "adventure",
  languages: ["en", "fr", "ar"],
  host: "operator-team",
  itinerary: cleanArray(activities[2].itinerary),
  includedExtra: [
    "Safety briefing and test drive",
    "Helmet and protective goggles",
    "Mint tea break at a Berber house",
    "Hotel transfers",
  ],
  notIncluded: ["Photos and video", "Tips"],
  bring: cleanArray(activities[2].bring),
  suitableFor: cleanArray(activities[2].suitableFor),
  restrictions: cleanArray(activities[2].restrictions),
  pickupWindow: "08:45 to 09:00 (09:00 departure) / 13:45 to 14:00 (14:00 departure)",
  returnApprox: "11:45 to 12:30 (09:00 departure) / 16:45 to 17:30 (14:00 departure)",
  highlights: cleanArray(activities[2].highlights.en),
  route: activities[2].route,
  faq: cleanFaq(activities[2].faq),
  confirmFlags: activities[2].confirmFlags,
};

frServices["quad-buggy-forest"] = {
  id: "quad-buggy-forest",
  category: "activity",
  status: "draft",
  order: 3,
  slug: "quad-buggy-agadir-foret-dunes",
  title: "Quad et buggy à Agadir : aventure entre forêt et dunes",
  summary: cleanText(activities[2].summary.fr),
  seo: {
    title: "Quad Buggy Agadir : forêt et dunes en 3 h",
    description: cleanText(activities[2].seo.fr.description),
  },
  primaryKeyword: "quad buggy agadir",
  durationHours: 3.5,
  departures: ["09:00", "14:00", "16:00"],
  days: "Tous les jours (dernier départ d'hiver à 15h00 de novembre à février)",
  capacity: { min: 1, sharedMax: 12, privateAvailable: true },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "estimate",
    confirmed: false,
    options: [
      { label: "Quad, conducteur seul", amount: 35, unit: "person" },
      { label: "Quad, deux sur un quad", amount: 50, unit: "quad" },
      { label: "Buggy, 2 places", amount: 80, unit: "buggy" },
    ],
  },
  cancellationPolicy: "adventure",
  languages: ["en", "fr", "ar"],
  host: "operator-team",
  itinerary: cleanArray(activities[2].itinerary),
  includedExtra: [
    "Briefing de sécurité et essai",
    "Casque et lunettes de protection",
    "Pause thé à la menthe chez l'habitant",
    "Transferts hôtel inclus",
  ],
  notIncluded: ["Photos et vidéos", "Pourboires"],
  bring: cleanArray(activities[2].bring),
  suitableFor: cleanArray(activities[2].suitableFor),
  restrictions: cleanArray(activities[2].restrictions),
  pickupWindow: "08h45 à 09h00 (départ 09h00) / 13h45 à 14h00 (départ 14h00)",
  returnApprox: "11h45 à 12h30 (départ 09h00) / 16h45 à 17h30 (départ 14h00)",
  highlights: cleanArray(activities[2].highlights.fr),
  route: activities[2].route,
  faq: cleanFaq(activities[2].faq),
  confirmFlags: activities[2].confirmFlags,
};

// 4. Horse Riding Souss
enServices["horse-riding-souss"] = {
  id: "horse-riding-souss",
  category: "activity",
  status: "draft",
  order: 4,
  slug: "horse-riding-souss-river-agadir",
  title: "Horse Riding along the Souss River",
  summary: cleanText(activities[3].summary.en),
  seo: {
    title: "Horse Riding Agadir: Souss River Ride, All Levels",
    description: cleanText(activities[3].seo.en.description),
  },
  primaryKeyword: "horse riding agadir",
  durationHours: 2.5,
  days: "Morning or late afternoon, arranged on request",
  capacity: { min: 1, sharedMax: 8, privateAvailable: true },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "estimate",
    confirmed: false,
    options: [
      { label: "1-hour guided ride", amount: 25, unit: "person" },
      { label: "Optional 2-hour ride", amount: 40, unit: "person" },
    ],
  },
  cancellationPolicy: "adventure",
  languages: ["en", "fr", "ar"],
  host: "operator-team",
  itinerary: cleanArray(activities[3].itinerary),
  includedExtra: ["1-hour guided ride", "Riding helmet", "Hotel pickup and return"],
  notIncluded: ["Photos and video", "Tips"],
  bring: cleanArray(activities[3].bring),
  suitableFor: cleanArray(activities[3].suitableFor),
  restrictions: cleanArray(activities[3].restrictions),
  pickupWindow: "09:00 to 09:30 (morning) / 15:30 to 16:00 (late afternoon)",
  returnApprox: "11:15 to 11:45 (morning) / 18:00 to 18:30 (late afternoon)",
  highlights: cleanArray(activities[3].highlights.en),
  route: activities[3].route,
  faq: cleanFaq(activities[3].faq),
  confirmFlags: activities[3].confirmFlags,
};

frServices["horse-riding-souss"] = {
  id: "horse-riding-souss",
  category: "activity",
  status: "draft",
  order: 4,
  slug: "balade-a-cheval-oued-souss-agadir",
  title: "Balade à cheval au bord de l'oued Souss",
  summary: cleanText(activities[3].summary.fr),
  seo: {
    title: "Balade à cheval Agadir : oued Souss, tous niveaux",
    description: cleanText(activities[3].seo.fr.description),
  },
  primaryKeyword: "balade à cheval agadir",
  durationHours: 2.5,
  days: "Matin ou fin d'après-midi, sur demande",
  capacity: { min: 1, sharedMax: 8, privateAvailable: true },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "estimate",
    confirmed: false,
    options: [
      { label: "Balade guidée d'une heure", amount: 25, unit: "person" },
      { label: "Balade de 2 heures en option", amount: 40, unit: "person" },
    ],
  },
  cancellationPolicy: "adventure",
  languages: ["en", "fr", "ar"],
  host: "operator-team",
  itinerary: cleanArray(activities[3].itinerary),
  includedExtra: [
    "Balade guidée d'une heure",
    "Casque d'équitation",
    "Prise en charge et retour à l'hôtel",
  ],
  notIncluded: ["Photos et vidéos", "Pourboires"],
  bring: cleanArray(activities[3].bring),
  suitableFor: cleanArray(activities[3].suitableFor),
  restrictions: cleanArray(activities[3].restrictions),
  pickupWindow: "09h00 à 09h30 (matin) / 15h30 à 16h00 (fin d'après-midi)",
  returnApprox: "11h15 à 11h45 (matin) / 18h00 à 18h30 (fin d'après-midi)",
  highlights: cleanArray(activities[3].highlights.fr),
  route: activities[3].route,
  faq: cleanFaq(activities[3].faq),
  confirmFlags: activities[3].confirmFlags,
};

// 5. Crocoparc
enServices["crocoparc"] = {
  id: "crocoparc",
  category: "activity",
  status: "draft",
  order: 5,
  slug: "crocoparc-agadir-private-transport",
  title: "Crocoparc Agadir with Private Transport",
  summary: cleanText(activities[4].summary.en),
  seo: {
    title: "Crocoparc Agadir with Private Transport",
    description: cleanText(activities[4].seo.en.description),
  },
  primaryKeyword: "crocoparc agadir",
  durationHours: 3.5,
  days: "Daily, flexible morning or afternoon departures",
  capacity: { min: 1, sharedMax: 7, privateAvailable: true },
  price: {
    currency: "EUR",
    unit: "vehicle",
    basis: "estimate",
    confirmed: false,
    options: [
      {
        label: "Private car, up to 3 guests, round trip with about 2.5 hours waiting",
        amount: 25,
        unit: "vehicle",
      },
      {
        label: "Private van, 4 to 7 guests, round trip with about 2.5 hours waiting",
        amount: 35,
        unit: "vehicle",
      },
      { label: "Extra waiting time", amount: 5, unit: "per 30 min" },
    ],
    separateCost:
      "Entrance tickets are not included and are paid at the park. Show them clearly separate from transport.",
  },
  cancellationPolicy: "transfer",
  languages: ["en", "fr", "ar"],
  host: "driver",
  itinerary: cleanArray(activities[4].itinerary),
  includedExtra: [
    "Hotel pickup in Agadir",
    "Private return transport",
    "About 2.5 hours waiting at Crocoparc",
  ],
  notIncluded: [
    "Crocoparc entrance tickets (paid directly at the park)",
    "Food and drinks inside the park",
    "Tips",
  ],
  bring: cleanArray(activities[4].bring),
  suitableFor: cleanArray(activities[4].suitableFor),
  pickupWindow: "09:45 to 10:30",
  returnApprox: "13:00 to 14:00",
  highlights: cleanArray(activities[4].highlights.en),
  route: activities[4].route,
  faq: cleanFaq(activities[4].faq),
  confirmFlags: activities[4].confirmFlags,
};

frServices["crocoparc"] = {
  id: "crocoparc",
  category: "activity",
  status: "draft",
  order: 5,
  slug: "crocoparc-agadir-transport-prive",
  title: "Crocoparc Agadir avec transport privé",
  summary: cleanText(activities[4].summary.fr),
  seo: {
    title: "Crocoparc Agadir avec transport privé",
    description: cleanText(activities[4].seo.fr.description),
  },
  primaryKeyword: "crocoparc agadir",
  durationHours: 3.5,
  days: "Tous les jours, départs flexibles le matin ou l'après-midi",
  capacity: { min: 1, sharedMax: 7, privateAvailable: true },
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
      },
      {
        label: "Van privé, 4 à 7 personnes, aller-retour avec 2h30 d'attente",
        amount: 35,
        unit: "vehicle",
      },
      { label: "Temps d'attente supplémentaire", amount: 5, unit: "per 30 min" },
    ],
    separateCost: "Les billets d'entrée ne sont pas inclus et sont réglés sur place au parc.",
  },
  cancellationPolicy: "transfer",
  languages: ["en", "fr", "ar"],
  host: "driver",
  itinerary: cleanArray(activities[4].itinerary),
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
  bring: cleanArray(activities[4].bring),
  suitableFor: cleanArray(activities[4].suitableFor),
  pickupWindow: "09h45 à 10h30",
  returnApprox: "13h00 à 14h00",
  highlights: cleanArray(activities[4].highlights.fr),
  route: activities[4].route,
  faq: cleanFaq(activities[4].faq),
  confirmFlags: activities[4].confirmFlags,
};

// 6. Moroccan Evening
enServices["moroccan-evening"] = {
  id: "moroccan-evening",
  category: "activity",
  status: "draft",
  order: 6,
  slug: "moroccan-dinner-fantasia-show-agadir",
  title: "Moroccan Evening: Dinner, Fantasia & Cultural Show",
  summary: cleanText(activities[5].summary.en),
  seo: {
    title: "Moroccan Dinner Show Agadir: Fantasia & Folklore",
    description: cleanText(activities[5].seo.en.description),
  },
  primaryKeyword: "moroccan dinner show agadir",
  durationHours: 4,
  days: "Evening, specified days (programme may vary during Ramadan)",
  capacity: { min: 2, sharedMax: 30, privateAvailable: true },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "estimate",
    confirmed: false,
    options: [
      {
        label: "Adult (dinner, show and transfers)",
        amount: 40,
        unit: "person",
      },
      { label: "Child 4 to 11", amount: 20, unit: "person" },
      { label: "Child under 4", amount: 0, unit: "person" },
    ],
  },
  cancellationPolicy: "excursion",
  languages: ["en", "fr", "ar"],
  host: "venue-team",
  itinerary: cleanArray(activities[5].itinerary),
  includedExtra: [
    "Traditional Moroccan multi-course dinner",
    "Folklore and fantasia cavalry show",
    "Hotel pickup and return",
    "Water or one soft drink with dinner",
  ],
  notIncluded: ["Other drinks", "Tips"],
  bring: cleanArray(activities[5].bring),
  suitableFor: cleanArray(activities[5].suitableFor),
  pickupWindow: "19:00 to 19:30",
  returnApprox: "23:00 to 23:30",
  highlights: cleanArray(activities[5].highlights.en),
  route: activities[5].route,
  faq: cleanFaq(activities[5].faq),
  confirmFlags: activities[5].confirmFlags,
};

frServices["moroccan-evening"] = {
  id: "moroccan-evening",
  category: "activity",
  status: "draft",
  order: 6,
  slug: "diner-marocain-spectacle-fantasia-agadir",
  title: "Soirée marocaine : dîner, fantasia et spectacle culturel",
  summary: cleanText(activities[5].summary.fr),
  seo: {
    title: "Dîner spectacle Agadir : fantasia et folklore",
    description: cleanText(activities[5].seo.fr.description),
  },
  primaryKeyword: "dîner spectacle agadir",
  durationHours: 4,
  days: "En soirée, jours programmés (programme adapté pendant le Ramadan)",
  capacity: { min: 2, sharedMax: 30, privateAvailable: true },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "estimate",
    confirmed: false,
    options: [
      {
        label: "Adulte (dîner, spectacle et transferts)",
        amount: 40,
        unit: "person",
      },
      { label: "Enfant 4 à 11 ans", amount: 20, unit: "person" },
      { label: "Enfant de moins de 4 ans", amount: 0, unit: "person" },
    ],
  },
  cancellationPolicy: "excursion",
  languages: ["en", "fr", "ar"],
  host: "venue-team",
  itinerary: cleanArray(activities[5].itinerary),
  includedExtra: [
    "Dîner marocain traditionnel complet",
    "Spectacle de folklore et fantasia",
    "Prise en charge et retour à l'hôtel",
    "Eau ou une boisson sans alcool au dîner",
  ],
  notIncluded: ["Autres boissons", "Pourboires"],
  bring: cleanArray(activities[5].bring),
  suitableFor: cleanArray(activities[5].suitableFor),
  pickupWindow: "19h00 à 19h30",
  returnApprox: "23h00 à 23h30",
  highlights: cleanArray(activities[5].highlights.fr),
  route: activities[5].route,
  faq: cleanFaq(activities[5].faq),
  confirmFlags: activities[5].confirmFlags,
};

// 7. Paradise Valley
enServices["paradise-valley"] = {
  id: "paradise-valley",
  category: "excursion",
  status: "draft",
  order: 7,
  slug: "paradise-valley-day-trip-from-agadir",
  title: "Paradise Valley Day Trip from Agadir",
  summary: cleanText(excursions[0].summary.en),
  seo: {
    title: "Paradise Valley Agadir Day Trip: Pools & Argan",
    description: cleanText(excursions[0].seo.en.description),
  },
  primaryKeyword: "paradise valley agadir",
  durationHours: 8,
  pickupWindow: "08:30 to 09:30",
  returnApprox: "16:30 to 17:00",
  days: "Daily, subject to weather and seasonal water levels",
  capacity: { min: 2, sharedMax: 16, privateAvailable: true },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "market-benchmark",
    confirmed: false,
    options: [
      { label: "Adult", amount: 30, unit: "person" },
      { label: "Child 4 to 11", amount: 15, unit: "person" },
      { label: "Child under 4", amount: 0, unit: "person" },
    ],
  },
  privateRate: "region-near",
  cancellationPolicy: "excursion",
  languages: ["en", "fr", "ar"],
  host: "driver-host",
  itinerary: cleanArray(excursions[0].itinerary),
  includedExtra: [
    "Hotel pickup and drop-off in Agadir and Zone 2 en route",
    "Argan oil cooperative visit and tasting",
    "Pottery workshop visit and demonstration",
    "Bottled water for each passenger",
  ],
  notIncluded: [
    "Tajine lunch at a local cafe (paid directly on site)",
    "Personal purchases",
    "Tips",
  ],
  bring: cleanArray(excursions[0].bring),
  suitableFor: cleanArray(excursions[0].suitableFor),
  restrictions: cleanArray(excursions[0].restrictions),
  seasonalNotes: excursions[0].seasonalNotes,
  highlights: cleanArray(excursions[0].highlights.en),
  route: excursions[0].route,
  faq: cleanFaq(excursions[0].faq),
  confirmFlags: excursions[0].confirmFlags,
};

frServices["paradise-valley"] = {
  id: "paradise-valley",
  category: "excursion",
  status: "draft",
  order: 7,
  slug: "excursion-vallee-du-paradis-depuis-agadir",
  title: "Excursion d'une journée à Paradise Valley depuis Agadir",
  summary: cleanText(excursions[0].summary.fr),
  seo: {
    title: "Vallée du Paradis Agadir : excursion d'une journée",
    description: cleanText(excursions[0].seo.fr.description),
  },
  primaryKeyword: "vallée du paradis agadir",
  durationHours: 8,
  pickupWindow: "08h30 à 09h30",
  returnApprox: "16h30 à 17h00",
  days: "Tous les jours, selon conditions météo et niveau d'eau saisonnier",
  capacity: { min: 2, sharedMax: 16, privateAvailable: true },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "market-benchmark",
    confirmed: false,
    options: [
      { label: "Adulte", amount: 30, unit: "person" },
      { label: "Enfant 4 à 11 ans", amount: 15, unit: "person" },
      { label: "Enfant de moins de 4 ans", amount: 0, unit: "person" },
    ],
  },
  privateRate: "region-near",
  cancellationPolicy: "excursion",
  languages: ["en", "fr", "ar"],
  host: "driver-host",
  itinerary: cleanArray(excursions[0].itinerary),
  includedExtra: [
    "Prise en charge et retour hôtel à Agadir et Zone 2 en route",
    "Visite d'une coopérative d'argan avec dégustation",
    "Visite d'un atelier de poterie avec démonstration",
    "Bouteille d'eau par personne",
  ],
  notIncluded: [
    "Déjeuner tajine dans un café local (réglé sur place)",
    "Achats personnels",
    "Pourboires",
  ],
  bring: cleanArray(excursions[0].bring),
  suitableFor: cleanArray(excursions[0].suitableFor),
  restrictions: cleanArray(excursions[0].restrictions),
  seasonalNotes: excursions[0].seasonalNotes,
  highlights: cleanArray(excursions[0].highlights.fr),
  route: excursions[0].route,
  faq: cleanFaq(excursions[0].faq),
  confirmFlags: excursions[0].confirmFlags,
};

// 8. Agadir City Tour
enServices["agadir-city-tour"] = {
  id: "agadir-city-tour",
  category: "excursion",
  status: "draft",
  order: 8,
  slug: "agadir-city-tour-marina-kasbah-souk",
  title: "Discover Agadir: City Tour",
  summary: cleanText(excursions[1].summary.en),
  seo: {
    title: "Agadir City Tour: Marina, Kasbah & Souk",
    description: cleanText(excursions[1].seo.en.description),
  },
  primaryKeyword: "agadir city tour",
  durationHours: 4,
  pickupWindow: "Morning 08:50 to 09:10 / Afternoon 14:20 to 14:40",
  returnApprox: "Morning 13:30 to 14:15 / Afternoon 18:30 to 19:15",
  days: "Daily (morning and afternoon; on Mondays Souk El Had is closed and replaced with the Port of Agadir fishing harbour or Vallée des Oiseaux)",
  capacity: { min: 2, sharedMax: 16, privateAvailable: true },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "estimate",
    confirmed: false,
    options: [
      { label: "Adult", amount: 20, unit: "person" },
      { label: "Child 4 to 11", amount: 10, unit: "person" },
      { label: "Child under 4", amount: 0, unit: "person" },
    ],
  },
  privateRate: "agadir-halfday",
  cancellationPolicy: "excursion",
  languages: ["en", "fr", "ar"],
  host: "driver-host",
  itinerary: cleanArray(excursions[1].itinerary),
  includedExtra: [
    "Hotel pickup and drop-off in Agadir",
    "Transport by air-conditioned minivan",
    "Driver-host commentary in English or French",
  ],
  notIncluded: [
    "Personal purchases at the souk or cooperative",
    "Optional licensed city guide (25 EUR per group)",
    "Tips",
  ],
  bring: cleanArray(excursions[1].bring),
  suitableFor: cleanArray(excursions[1].suitableFor),
  restrictions: cleanArray(excursions[1].restrictions),
  highlights: cleanArray(excursions[1].highlights.en),
  route: excursions[1].route,
  faq: cleanFaq(excursions[1].faq),
  confirmFlags: excursions[1].confirmFlags,
};

frServices["agadir-city-tour"] = {
  id: "agadir-city-tour",
  category: "excursion",
  status: "draft",
  order: 8,
  slug: "visite-d-agadir-marina-kasbah-souk",
  title: "Découvrez Agadir : visite de la ville",
  summary: cleanText(excursions[1].summary.fr),
  seo: {
    title: "Visite d'Agadir : Marina, Kasbah et Souk",
    description: cleanText(excursions[1].seo.fr.description),
  },
  primaryKeyword: "visite d'agadir",
  durationHours: 4,
  pickupWindow: "Matin 08h50 à 09h10 / Après-midi 14h20 à 14h40",
  returnApprox: "Matin 13h30 à 14h15 / Après-midi 18h30 à 19h15",
  days: "Tous les jours (le lundi le Souk El Had est fermé et remplacé par le port de pêche d'Agadir ou la Vallée des Oiseaux)",
  capacity: { min: 2, sharedMax: 16, privateAvailable: true },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "estimate",
    confirmed: false,
    options: [
      { label: "Adulte", amount: 20, unit: "person" },
      { label: "Enfant 4 à 11 ans", amount: 10, unit: "person" },
      { label: "Enfant de moins de 4 ans", amount: 0, unit: "person" },
    ],
  },
  privateRate: "agadir-halfday",
  cancellationPolicy: "excursion",
  languages: ["en", "fr", "ar"],
  host: "driver-host",
  itinerary: cleanArray(excursions[1].itinerary),
  includedExtra: [
    "Prise en charge et retour hôtel à Agadir",
    "Transport en minivan climatisé",
    "Commentaires du chauffeur-accompagnateur en français ou anglais",
  ],
  notIncluded: [
    "Achats personnels au souk ou à la coopérative",
    "Guide officiel en option (25 EUR par groupe)",
    "Pourboires",
  ],
  bring: cleanArray(excursions[1].bring),
  suitableFor: cleanArray(excursions[1].suitableFor),
  restrictions: cleanArray(excursions[1].restrictions),
  highlights: cleanArray(excursions[1].highlights.fr),
  route: excursions[1].route,
  faq: cleanFaq(excursions[1].faq),
  confirmFlags: excursions[1].confirmFlags,
};

// 9. Massa Tiznit
enServices["massa-tiznit"] = {
  id: "massa-tiznit",
  category: "excursion",
  status: "draft",
  order: 9,
  slug: "massa-tiznit-coastal-dunes-day-trip-from-agadir",
  title: "Massa & Tiznit: Coast, Nature & Dunes Day Trip",
  summary: cleanText(excursions[2].summary.en),
  seo: {
    title: "Tiznit Day Trip from Agadir: Massa & Dunes",
    description: cleanText(excursions[2].seo.en.description),
  },
  primaryKeyword: "tiznit day trip from agadir",
  durationHours: 8.5,
  pickupWindow: "08:00 to 09:00",
  returnApprox: "17:00 to 17:45",
  days: "Daily, year-round; birdwatching best from November to March",
  capacity: { min: 2, sharedMax: 16, privateAvailable: true },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "estimate",
    confirmed: false,
    options: [
      { label: "Adult (lunch included)", amount: 38, unit: "person" },
      { label: "Child 4 to 11 (lunch included)", amount: 19, unit: "person" },
      { label: "Child under 4", amount: 0, unit: "person" },
    ],
  },
  privateRate: "region-near",
  cancellationPolicy: "excursion",
  languages: ["en", "fr", "ar"],
  host: "driver-host",
  itinerary: cleanArray(excursions[2].itinerary),
  includedExtra: [
    "Hotel pickup and drop-off in Agadir",
    "Traditional Moroccan lunch in Tiznit",
    "Bottled water for each passenger",
    "Driver-host commentary in English or French",
  ],
  notIncluded: [
    "Drinks with lunch",
    "Silver jewellery and personal purchases in Tiznit",
    "Park entrance fees if introduced",
    "Tips",
  ],
  bring: cleanArray(excursions[2].bring),
  suitableFor: cleanArray(excursions[2].suitableFor),
  restrictions: cleanArray(excursions[2].restrictions),
  seasonalNotes: cleanText(excursions[2].seasonalNotes),
  highlights: cleanArray(excursions[2].highlights.en),
  route: excursions[2].route,
  faq: cleanFaq(excursions[2].faq),
  confirmFlags: excursions[2].confirmFlags,
};

frServices["massa-tiznit"] = {
  id: "massa-tiznit",
  category: "excursion",
  status: "draft",
  order: 9,
  slug: "excursion-massa-tiznit-dunes-depuis-agadir",
  title: "Massa et Tiznit : côte, nature et dunes en une journée",
  summary: cleanText(excursions[2].summary.fr),
  seo: {
    title: "Excursion Tiznit depuis Agadir : Massa et dunes",
    description: cleanText(excursions[2].seo.fr.description),
  },
  primaryKeyword: "excursion tiznit depuis agadir",
  durationHours: 8.5,
  pickupWindow: "08h00 à 09h00",
  returnApprox: "17h00 à 17h45",
  days: "Tous les jours de l'année ; observation des oiseaux optimale de novembre à mars",
  capacity: { min: 2, sharedMax: 16, privateAvailable: true },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "estimate",
    confirmed: false,
    options: [
      { label: "Adulte (déjeuner inclus)", amount: 38, unit: "person" },
      { label: "Enfant 4 à 11 ans (déjeuner inclus)", amount: 19, unit: "person" },
      { label: "Enfant de moins de 4 ans", amount: 0, unit: "person" },
    ],
  },
  privateRate: "region-near",
  cancellationPolicy: "excursion",
  languages: ["en", "fr", "ar"],
  host: "driver-host",
  itinerary: cleanArray(excursions[2].itinerary),
  includedExtra: [
    "Prise en charge et retour hôtel à Agadir",
    "Déjeuner marocain traditionnel à Tiznit",
    "Bouteille d'eau par personne",
    "Commentaires du chauffeur-accompagnateur en français ou anglais",
  ],
  notIncluded: [
    "Boissons au déjeuner",
    "Achats personnels et bijoux en argent à Tiznit",
    "Pourboires",
  ],
  bring: cleanArray(excursions[2].bring),
  suitableFor: cleanArray(excursions[2].suitableFor),
  restrictions: cleanArray(excursions[2].restrictions),
  seasonalNotes: cleanText(excursions[2].seasonalNotes),
  highlights: cleanArray(excursions[2].highlights.fr),
  route: excursions[2].route,
  faq: cleanFaq(excursions[2].faq),
  confirmFlags: excursions[2].confirmFlags,
};

// 10. Essaouira
enServices["essaouira"] = {
  id: "essaouira",
  category: "excursion",
  status: "draft",
  order: 10,
  slug: "essaouira-day-trip-from-agadir",
  title: "Essaouira (Mogador) Day Trip from Agadir",
  summary: cleanText(excursions[3].summary.en),
  seo: {
    title: "Essaouira Day Trip from Agadir: Mogador Tour",
    description: cleanText(excursions[3].seo.en.description),
  },
  primaryKeyword: "essaouira day trip from agadir",
  durationHours: 12,
  pickupWindow: "07:00 to 08:00",
  returnApprox: "19:00 to 19:30",
  days: "Daily, year-round; departure from Essaouira around 16:00",
  capacity: { min: 2, sharedMax: 16, privateAvailable: true },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "estimate",
    confirmed: false,
    options: [
      { label: "Adult", amount: 35, unit: "person" },
      { label: "Child 4 to 11", amount: 18, unit: "person" },
      { label: "Child under 4", amount: 0, unit: "person" },
    ],
  },
  privateRate: "essaouira",
  cancellationPolicy: "excursion",
  languages: ["en", "fr", "ar"],
  host: "driver-host",
  itinerary: cleanArray(excursions[3].itinerary),
  includedExtra: [
    "Transport by air-conditioned vehicle",
    "Driver-host commentary in English or French",
    "Bottled water for each passenger",
    "Rest stops on the coast road",
  ],
  notIncluded: [
    "Lunch in Essaouira (free time to choose a seafood cafe)",
    "Monument entrance fees (Skala ramparts)",
    "Personal purchases (argan oil, thuya woodwork)",
    "Tips",
  ],
  bring: cleanArray(excursions[3].bring),
  suitableFor: cleanArray(excursions[3].suitableFor),
  restrictions: cleanArray(excursions[3].restrictions),
  seasonalNotes: excursions[3].seasonalNotes,
  highlights: cleanArray(excursions[3].highlights.en),
  route: excursions[3].route,
  faq: cleanFaq(excursions[3].faq),
  confirmFlags: excursions[3].confirmFlags,
};

frServices["essaouira"] = {
  id: "essaouira",
  category: "excursion",
  status: "draft",
  order: 10,
  slug: "excursion-essaouira-depuis-agadir",
  title: "Excursion à Essaouira (Mogador) depuis Agadir",
  summary: cleanText(excursions[3].summary.fr),
  seo: {
    title: "Excursion Essaouira depuis Agadir : Mogador",
    description: cleanText(excursions[3].seo.fr.description),
  },
  primaryKeyword: "excursion essaouira depuis agadir",
  durationHours: 12,
  pickupWindow: "07h00 à 08h00",
  returnApprox: "19h00 à 19h30",
  days: "Tous les jours de l'année ; départ d'Essaouira vers 16h00",
  capacity: { min: 2, sharedMax: 16, privateAvailable: true },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "estimate",
    confirmed: false,
    options: [
      { label: "Adulte", amount: 35, unit: "person" },
      { label: "Enfant 4 à 11 ans", amount: 18, unit: "person" },
      { label: "Enfant de moins de 4 ans", amount: 0, unit: "person" },
    ],
  },
  privateRate: "essaouira",
  cancellationPolicy: "excursion",
  languages: ["en", "fr", "ar"],
  host: "driver-host",
  itinerary: cleanArray(excursions[3].itinerary),
  includedExtra: [
    "Transport en véhicule climatisé",
    "Commentaires du chauffeur-accompagnateur en français ou anglais",
    "Bouteille d'eau par personne",
    "Arrêts détente sur la route côtière",
  ],
  notIncluded: [
    "Déjeuner à Essaouira (temps libre)",
    "Droits d'entrée aux monuments (Sqala)",
    "Achats personnels",
    "Pourboires",
  ],
  bring: cleanArray(excursions[3].bring),
  suitableFor: cleanArray(excursions[3].suitableFor),
  restrictions: cleanArray(excursions[3].restrictions),
  seasonalNotes: excursions[3].seasonalNotes,
  highlights: cleanArray(excursions[3].highlights.fr),
  route: excursions[3].route,
  faq: cleanFaq(excursions[3].faq),
  confirmFlags: excursions[3].confirmFlags,
};

// 11. Taroudant Tiout
enServices["taroudant-tiout"] = {
  id: "taroudant-tiout",
  category: "excursion",
  status: "draft",
  order: 11,
  slug: "taroudant-tiout-oasis-day-trip-from-agadir",
  title: "Taroudant & Tiout Oasis Day Trip from Agadir",
  summary: cleanText(excursions[4].summary.en),
  seo: {
    title: "Taroudant Day Trip from Agadir: Tiout Oasis",
    description: cleanText(excursions[4].seo.en.description),
  },
  primaryKeyword: "taroudant day trip from agadir",
  durationHours: 9,
  pickupWindow: "08:00 to 09:00",
  returnApprox: "17:00 to 17:45",
  days: "Daily, year-round; comfortable from late autumn to spring",
  capacity: { min: 2, sharedMax: 16, privateAvailable: true },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "estimate",
    confirmed: false,
    options: [
      { label: "Adult (lunch included)", amount: 38, unit: "person" },
      { label: "Child 4 to 11 (lunch included)", amount: 19, unit: "person" },
      { label: "Child under 4", amount: 0, unit: "person" },
    ],
  },
  privateRate: "region-near",
  cancellationPolicy: "excursion",
  languages: ["en", "fr", "ar"],
  host: "driver-host",
  itinerary: cleanArray(excursions[4].itinerary),
  includedExtra: [
    "Hotel pickup and drop-off in Agadir",
    "Traditional Moroccan lunch at Tiout oasis",
    "Bottled water for each passenger",
    "Driver-host commentary in English or French",
  ],
  notIncluded: [
    "Donkey ride in Tiout palm grove (optional, paid locally)",
    "Drinks with lunch",
    "Personal purchases in Taroudant souks",
    "Tips",
  ],
  bring: cleanArray(excursions[4].bring),
  suitableFor: cleanArray(excursions[4].suitableFor),
  restrictions: cleanArray(excursions[4].restrictions),
  seasonalNotes: excursions[4].seasonalNotes,
  highlights: cleanArray(excursions[4].highlights.en),
  route: excursions[4].route,
  faq: cleanFaq(excursions[4].faq),
  confirmFlags: excursions[4].confirmFlags,
};

frServices["taroudant-tiout"] = {
  id: "taroudant-tiout",
  category: "excursion",
  status: "draft",
  order: 11,
  slug: "excursion-taroudant-oasis-tiout-depuis-agadir",
  title: "Excursion à Taroudant et à l'oasis de Tiout depuis Agadir",
  summary: cleanText(excursions[4].summary.fr),
  seo: {
    title: "Excursion Taroudant depuis Agadir : oasis de Tiout",
    description: cleanText(excursions[4].seo.fr.description),
  },
  primaryKeyword: "excursion taroudant depuis agadir",
  durationHours: 9,
  pickupWindow: "08h00 à 09h00",
  returnApprox: "17h00 à 17h45",
  days: "Tous les jours de l'année ; idéal de la fin d'automne au printemps",
  capacity: { min: 2, sharedMax: 16, privateAvailable: true },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "estimate",
    confirmed: false,
    options: [
      { label: "Adulte (déjeuner inclus)", amount: 38, unit: "person" },
      { label: "Enfant 4 à 11 ans (déjeuner inclus)", amount: 19, unit: "person" },
      { label: "Enfant de moins de 4 ans", amount: 0, unit: "person" },
    ],
  },
  privateRate: "region-near",
  cancellationPolicy: "excursion",
  languages: ["en", "fr", "ar"],
  host: "driver-host",
  itinerary: cleanArray(excursions[4].itinerary),
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
  bring: cleanArray(excursions[4].bring),
  suitableFor: cleanArray(excursions[4].suitableFor),
  restrictions: cleanArray(excursions[4].restrictions),
  seasonalNotes: excursions[4].seasonalNotes,
  highlights: cleanArray(excursions[4].highlights.fr),
  route: excursions[4].route,
  faq: cleanFaq(excursions[4].faq),
  confirmFlags: excursions[4].confirmFlags,
};

// 12. Marrakech
enServices["marrakech"] = {
  id: "marrakech",
  category: "excursion",
  status: "draft",
  order: 12,
  slug: "marrakech-day-trip-from-agadir",
  title: "Marrakech Day Trip from Agadir",
  summary: cleanText(excursions[5].summary.en),
  seo: {
    title: "Marrakech Day Trip from Agadir: Medina Tour",
    description: cleanText(excursions[5].seo.en.description),
  },
  primaryKeyword: "marrakech day trip from agadir",
  durationHours: 12,
  pickupWindow: "07:00 to 08:00",
  returnApprox: "19:00 to 19:30",
  days: "Daily, year-round; book at least 48 hours in advance",
  capacity: { min: 4, sharedMax: 16, privateAvailable: true }, // Report Section 5.12 overrides min to 4
  price: {
    currency: "EUR",
    unit: "person",
    basis: "market-benchmark",
    confirmed: false,
    options: [
      { label: "Adult", amount: 45, unit: "person" },
      { label: "Child 4 to 11", amount: 25, unit: "person" },
      { label: "Child under 4", amount: 0, unit: "person" },
    ],
  },
  privateRate: "marrakech",
  cancellationPolicy: "excursion",
  languages: ["en", "fr", "ar"],
  host: "driver-host",
  itinerary: cleanArray(excursions[5].itinerary),
  includedExtra: [
    "Transport by air-conditioned vehicle via the A7 motorway",
    "Motorway tolls and parking fees",
    "Driver-host commentary in English or French",
    "Bottled water for each passenger",
  ],
  notIncluded: [
    "Lunch in Marrakech (free time to choose a restaurant)",
    "Monument and garden entrance fees (Majorelle Garden, Bahia Palace)",
    "Optional licensed city guide in Marrakech (35 EUR per group)",
    "Tips",
  ],
  bring: cleanArray(excursions[5].bring),
  suitableFor: cleanArray(excursions[5].suitableFor),
  restrictions: cleanArray(excursions[5].restrictions),
  seasonalNotes: excursions[5].seasonalNotes,
  highlights: cleanArray(excursions[5].highlights.en),
  route: excursions[5].route,
  faq: cleanFaq(excursions[5].faq),
  confirmFlags: excursions[5].confirmFlags,
};

frServices["marrakech"] = {
  id: "marrakech",
  category: "excursion",
  status: "draft",
  order: 12,
  slug: "excursion-marrakech-depuis-agadir",
  title: "Excursion d'une journée à Marrakech depuis Agadir",
  summary: cleanText(excursions[5].summary.fr),
  seo: {
    title: "Excursion Marrakech depuis Agadir : médina",
    description: cleanText(excursions[5].seo.fr.description),
  },
  primaryKeyword: "excursion marrakech depuis agadir",
  durationHours: 12,
  pickupWindow: "07h00 à 08h00",
  returnApprox: "19h00 à 19h30",
  days: "Tous les jours de l'année ; réservation au moins 48 heures à l'avance",
  capacity: { min: 4, sharedMax: 16, privateAvailable: true },
  price: {
    currency: "EUR",
    unit: "person",
    basis: "market-benchmark",
    confirmed: false,
    options: [
      { label: "Adulte", amount: 45, unit: "person" },
      { label: "Enfant 4 à 11 ans", amount: 25, unit: "person" },
      { label: "Enfant de moins de 4 ans", amount: 0, unit: "person" },
    ],
  },
  privateRate: "marrakech",
  cancellationPolicy: "excursion",
  languages: ["en", "fr", "ar"],
  host: "driver-host",
  itinerary: cleanArray(excursions[5].itinerary),
  includedExtra: [
    "Transport en véhicule climatisé par l'autoroute A7",
    "Péages d'autoroute et frais de stationnement",
    "Commentaires du chauffeur-accompagnateur en français ou anglais",
    "Bouteille d'eau par personne",
  ],
  notIncluded: [
    "Déjeuner à Marrakech (temps libre pour choisir son restaurant)",
    "Entrées aux monuments et jardins (Jardin Majorelle, Palais Bahia)",
    "Guide officiel en option à Marrakech (35 EUR par groupe)",
    "Pourboires",
  ],
  bring: cleanArray(excursions[5].bring),
  suitableFor: cleanArray(excursions[5].suitableFor),
  restrictions: cleanArray(excursions[5].restrictions),
  seasonalNotes: excursions[5].seasonalNotes,
  highlights: cleanArray(excursions[5].highlights.fr),
  route: excursions[5].route,
  faq: cleanFaq(excursions[5].faq),
  confirmFlags: excursions[5].confirmFlags,
};

// 13. Airport Agadir
enServices["airport-agadir"] = {
  id: "airport-agadir",
  category: "transfer",
  status: "draft",
  order: 13,
  slug: "agadir-airport-transfer-to-agadir-hotels",
  title: "Agadir Airport Transfer to Agadir Hotels",
  summary: cleanText(transfers[0].summary.en),
  seo: {
    title: "Agadir Airport Transfer to Agadir Hotels",
    description: cleanText(transfers[0].seo.en.description),
  },
  primaryKeyword: "agadir airport transfer",
  availability: "24/7 by prior arrangement",
  direction: "One way; the same price applies in the opposite direction",
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
      from: "Agadir Al Massira Airport (AGA)",
      to: "Agadir city centre, beachfront, Founty, Sonaba, Talborjt, Marina",
      distanceKm: 25,
      minutes: 30,
      prices: { sedan: 20, van: 30, minibus: 50 },
      basis: "catalogue",
    },
    {
      from: "Agadir Al Massira Airport (AGA)",
      to: "Anza",
      distanceKm: 32,
      minutes: "35 to 40",
      prices: { sedan: 25, van: 35, minibus: 55 },
      basis: "estimate",
    },
    {
      from: "Agadir hotel",
      to: "Another Agadir hotel or the marina",
      minutes: "10 to 20",
      prices: { sedan: 12, van: 18, minibus: 30 },
      basis: "estimate",
    },
  ],
  extras: [
    { label: "Additional stop on the way", amount: 5, unit: "vehicle" },
    {
      label: "Waiting beyond 60 minutes after landing, per 30 minutes",
      amount: 5,
      unit: "per 30 min",
    },
    {
      label: "Child seat",
      amount: 0,
      unit: "vehicle",
      note: "Free on request 24h prior",
    },
  ],
  vehicles: ["sedan", "van", "minibus"],
  includedExtra: cleanArray(transfers[0].includedExtra),
  notIncluded: cleanArray(transfers[0].notIncluded),
  faq: cleanFaq(transfers[0].faq),
  confirmFlags: transfers[0].confirmFlags,
};

frServices["airport-agadir"] = {
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
      prices: { sedan: 20, van: 30, minibus: 50 },
      basis: "catalogue",
    },
    {
      from: "Aéroport Agadir Al Massira (AGA)",
      to: "Anza",
      distanceKm: 32,
      minutes: "35 à 40",
      prices: { sedan: 25, van: 35, minibus: 55 },
      basis: "estimate",
    },
    {
      from: "Hôtel à Agadir",
      to: "Un autre hôtel à Agadir ou la marina",
      minutes: "10 à 20",
      prices: { sedan: 12, van: 18, minibus: 30 },
      basis: "estimate",
    },
  ],
  extras: [
    { label: "Arrêt supplémentaire en route", amount: 5, unit: "vehicle" },
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
  confirmFlags: transfers[0].confirmFlags,
};

// 14. Airport Taghazout
enServices["airport-taghazout"] = {
  id: "airport-taghazout",
  category: "transfer",
  status: "draft",
  order: 14,
  slug: "agadir-airport-to-taghazout-private-transfer",
  title: "Agadir Airport to Taghazout Private Transfer",
  summary: cleanText(transfers[1].summary.en),
  seo: {
    title: "Agadir Airport to Taghazout Transfer: Private Car",
    description: cleanText(transfers[1].seo.en.description),
  },
  primaryKeyword: "agadir airport to taghazout transfer",
  availability: "24/7 by prior arrangement",
  direction: "One way; the same price applies in the opposite direction",
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
      from: "Agadir Al Massira Airport (AGA)",
      to: "Tamraght and Aourir",
      minutes: "40 to 45",
      prices: { sedan: 30, van: 40, minibus: 65 },
      basis: "estimate",
    },
    {
      from: "Agadir Al Massira Airport (AGA)",
      to: "Taghazout village and Taghazout Bay",
      distanceKm: 45,
      minutes: 50,
      prices: { sedan: 35, van: 45, minibus: 70 },
      basis: "catalogue",
    },
    {
      from: "Agadir Al Massira Airport (AGA)",
      to: "Imsouane",
      distanceKm: 100,
      minutes: 90,
      prices: { sedan: 70, van: 90, minibus: 130 },
      basis: "market-benchmark",
    },
  ],
  extras: [
    {
      label: "Surfboards and bikes",
      amount: 0,
      unit: "vehicle",
      note: "Van or minibus required. Up to 4 boards free, then 5 EUR per extra board.",
    },
    { label: "Additional stop on the way", amount: 5, unit: "vehicle" },
    {
      label: "Waiting beyond 60 minutes after landing, per 30 minutes",
      amount: 5,
      unit: "per 30 min",
    },
    {
      label: "Child seat",
      amount: 0,
      unit: "vehicle",
      note: "Free on request 24h prior",
    },
  ],
  vehicles: ["sedan", "van", "minibus"],
  includedExtra: cleanArray(transfers[1].includedExtra),
  notIncluded: cleanArray(transfers[1].notIncluded),
  faq: cleanFaq(transfers[1].faq),
  confirmFlags: transfers[1].confirmFlags,
};

frServices["airport-taghazout"] = {
  id: "airport-taghazout",
  category: "transfer",
  status: "draft",
  order: 14,
  slug: "transfert-prive-aeroport-agadir-taghazout",
  title: "Transfert privé aéroport Agadir vers Taghazout",
  summary:
    "Transfert privé entre l'aéroport d'Agadir Al Massira et Taghazout, Taghazout Bay, Tamraght ou Aourir. Prix fixe, suivi de vol et espace pour planches de surf sur demande.",
  seo: {
    title: "Transfert aéroport Agadir Taghazout : voiture privée",
    description: cleanText(transfers[1].seo.fr.description),
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
      prices: { sedan: 30, van: 40, minibus: 65 },
      basis: "estimate",
    },
    {
      from: "Aéroport Agadir Al Massira (AGA)",
      to: "Village de Taghazout et Taghazout Bay",
      distanceKm: 45,
      minutes: 50,
      prices: { sedan: 35, van: 45, minibus: 70 },
      basis: "catalogue",
    },
    {
      from: "Aéroport Agadir Al Massira (AGA)",
      to: "Imsouane",
      distanceKm: 100,
      minutes: 90,
      prices: { sedan: 70, van: 90, minibus: 130 },
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
    { label: "Arrêt supplémentaire en route", amount: 5, unit: "vehicle" },
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
  confirmFlags: transfers[1].confirmFlags,
};

// 15. Private Transfers & Tourist Transport
enServices["private-transfers-tourist-transport"] = {
  id: "private-transfers-tourist-transport",
  category: "transfer",
  status: "draft",
  order: 15,
  slug: "private-transfers-tourist-transport-from-agadir",
  title: "Private Transfers & Tourist Transport from Agadir",
  summary: cleanText(transfers[2].summary.en),
  seo: {
    title: "Private Transfer Agadir: Essaouira, Marrakech, Day Hire",
    description: cleanText(transfers[2].seo.en.description),
  },
  primaryKeyword: "private transfer agadir",
  availability: "By prior arrangement",
  direction: "One way; return trips are quoted on request",
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
    note: "Private vehicle with driver for your own itinerary. Up to 10 hours, up to 250 km, fuel, tolls and parking included.",
  },
  routes: [
    {
      from: "Agadir Al Massira Airport (AGA) or Agadir hotel",
      to: "Essaouira",
      distanceKm: 175,
      minutes: "about 150",
      prices: { sedan: 95, van: 125, minibus: 180 },
      basis: "market-benchmark",
    },
    {
      from: "Agadir Al Massira Airport (AGA) or Agadir hotel",
      to: "Marrakech",
      distanceKm: 250,
      minutes: "about 210",
      prices: { sedan: 125, van: 160, minibus: 230 },
      basis: "market-benchmark",
    },
  ],
  extras: [
    { label: "Additional stop", amount: 5, unit: "vehicle" },
    {
      label: "Overtime beyond 10 hours, per hour",
      amount: 8,
      unit: "vehicle",
      note: "8 EUR/h sedan, 10 EUR/h van, 15 EUR/h minibus",
    },
  ],
  vehicles: ["sedan", "van", "minibus"],
  includedExtra: cleanArray(transfers[2].includedExtra),
  notIncluded: cleanArray(transfers[2].notIncluded),
  faq: cleanFaq(transfers[2].faq),
  confirmFlags: transfers[2].confirmFlags,
};

frServices["private-transfers-tourist-transport"] = {
  id: "private-transfers-tourist-transport",
  category: "transfer",
  status: "draft",
  order: 15,
  slug: "transferts-prives-transport-touristique-agadir",
  title: "Transferts privés et transport touristique depuis Agadir",
  summary:
    "Chauffeurs privés entre Agadir et Essaouira, Marrakech, Imsouane et d'autres villes, ainsi que mise à disposition d'un véhicule privé avec chauffeur à la journée pour vos excursions.",
  seo: {
    title: "Transfert privé Agadir : Essaouira, Marrakech",
    description: cleanText(transfers[2].seo.fr.description),
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
      prices: { sedan: 95, van: 125, minibus: 180 },
      basis: "market-benchmark",
    },
    {
      from: "Aéroport Agadir Al Massira (AGA) ou hôtel à Agadir",
      to: "Marrakech",
      distanceKm: 250,
      minutes: "environ 210",
      prices: { sedan: 125, van: 160, minibus: 230 },
      basis: "market-benchmark",
    },
  ],
  extras: [
    { label: "Arrêt supplémentaire", amount: 5, unit: "vehicle" },
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
  confirmFlags: transfers[2].confirmFlags,
};

// Write individual files and index.ts
function writeContent(lang, services) {
  const dir = path.join(rootDir, "content", lang);
  fs.mkdirSync(dir, { recursive: true });

  const exportNames = [];

  for (const [id, s] of Object.entries(services)) {
    const varName = id.replace(/-([a-z0-9])/g, (_, g) => g.toUpperCase());
    exportNames.push({ id, varName });
    const filePath = path.join(dir, `${id}.ts`);
    const content = `import type { Service } from "@/schemas/service";

export const ${varName}: Service = ${JSON.stringify(s, null, 2)} satisfies Service;

export default ${varName};
`;
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Wrote ${filePath}`);
  }

  // index.ts
  const indexImports = exportNames
    .map((e) => `import { ${e.varName} } from "./${e.id}.ts";`)
    .join("\n");
  const arrayItems = exportNames.map((e) => `  ${e.varName},`).join("\n");
  const recordItems = exportNames.map((e) => `  "${e.id}": ${e.varName},`).join("\n");

  const indexContent = `import type { Service } from "@/schemas/service";
${indexImports}

export const services: Service[] = [
${arrayItems}
];

export const servicesById: Record<string, Service> = {
${recordItems}
};

export {
${exportNames.map((e) => `  ${e.varName},`).join("\n")}
};
`;

  fs.writeFileSync(path.join(dir, "index.ts"), indexContent, "utf8");
  console.log(`Wrote ${path.join(dir, "index.ts")}`);
}

writeContent("en", enServices);
writeContent("fr", frServices);
console.log("Content generation complete!");
