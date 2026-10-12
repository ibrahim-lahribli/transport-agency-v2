/**
 * The one-time reconciliation fixture between the two legacy `.txt` source
 * catalogues (`data/source/*.txt`) and the shipped `content/{en,fr}` slugs.
 *
 * Task 3 hand-extracts these entries once, per the plan: the txt files are a
 * legacy artefact the runtime never reads, so the fixture documents the mapping
 * instead of parsing markdown at test time. Every entry answers three
 * questions: where the old URL now resolves (redirect or served slug), whether
 * the source-catalogue price survived (most entries are deliberate
 * re-benchmarks — see the `note` field), and the title mapping.
 *
 * `fromSlug` values are the plausible old-URL spellings the two catalogues'
 * section titles suggest. They may NOT all be real historical URLs — the
 * regression test only requires each to either redirect to a live product page
 * or 404 as an intentional rename, never a bare 200 on a moved service.
 */

export interface SourceServiceEntry {
  /** Legacy section id, e.g. "1.1". */
  section: string;
  /** EN source-catalogue section title. */
  enTitle: string;
  /** FR source-catalogue section title. */
  frTitle: string;
  /** Shipped service id in content/{en,fr}. */
  id: string;
  /** Price the source catalogue states for the EN copy (EUR, base unit). */
  sourcePriceEur: number | null;
  /** Where the price changed on purpose; null = source had no price. */
  priceNote?: string;
  /** Title-change note; absent = title is a localization of the source one. */
  note?: string;
}

export const SOURCE_SERVICES: SourceServiceEntry[] = [
  {
    section: "1.1",
    enTitle: "Paradise Valley – Nature & Authentic Moroccan Experience",
    frTitle: "Paradise Valley – Nature & Expérience Marocaine Authentique",
    id: "paradise-valley",
    sourcePriceEur: null,
    note: "Source catalogue quotes no price; the site benchmarks 30 €/person (confirmed pending).",
  },
  {
    section: "1.2",
    enTitle: "Discover Agadir – City Tour",
    frTitle: "Discover Agadir – Visite de la Ville",
    id: "agadir-city-tour",
    sourcePriceEur: null,
  },
  {
    section: "1.3",
    enTitle: "Massa & Tiznit – Coastal, Nature & Desert Experience",
    frTitle: "Massa & Tiznit – Expérience Côtière, Nature & Désert",
    id: "massa-tiznit",
    sourcePriceEur: null,
  },
  {
    section: "1.4",
    enTitle: "Essaouira – Mogador Coastal Day Trip",
    frTitle: "Essaouira – Mogador, Journée Côtière",
    id: "essaouira",
    sourcePriceEur: null,
  },
  {
    section: "1.5",
    enTitle: "Taroudant & Tiout – History, Culture & Oasis",
    frTitle: "Taroudant & Tiout – Histoire, Culture & Oasis",
    id: "taroudant-tiout",
    sourcePriceEur: null,
  },
  {
    section: "1.6",
    enTitle: "Marrakech Day Trip from Agadir",
    frTitle: "Marrakech – Journée au Départ d'Agadir",
    id: "marrakech",
    sourcePriceEur: null,
  },
  {
    section: "2.1",
    enTitle: "Agadir Boat Cruise",
    frTitle: "Croisière en Bateau – Agadir",
    id: "boat-cruise",
    sourcePriceEur: null,
  },
  {
    section: "2.2",
    enTitle: "Timlalin / Timlaline Desert Experience",
    frTitle: "Timlalin / Timlaline – Expérience Désert",
    id: "timlalin-dunes",
    sourcePriceEur: null,
  },
  {
    section: "2.3",
    enTitle: "Crocoparc Agadir",
    frTitle: "Crocoparc Agadir",
    id: "crocoparc",
    sourcePriceEur: null,
  },
  {
    section: "2.4",
    enTitle: "Moroccan Evening – Dinner, Fantasia & Cultural Show",
    frTitle: "Soirée Marocaine – Dîner, Fantasia & Spectacle",
    id: "moroccan-evening",
    sourcePriceEur: null,
  },
  {
    section: "2.5",
    enTitle: "Agadir Quad & Buggy Adventure",
    frTitle: "Aventure Quad & Buggy à Agadir",
    id: "quad-buggy-forest",
    sourcePriceEur: null,
  },
  {
    section: "2.6",
    enTitle: "Horse Riding Along the Souss River",
    frTitle: "Balade à Cheval le Long du Souss",
    id: "horse-riding-souss",
    sourcePriceEur: null,
  },
  {
    section: "3.1",
    enTitle: "Airport Transfer – Agadir",
    frTitle: "Transfert Aéroport – Agadir",
    id: "airport-agadir",
    sourcePriceEur: 20,
    priceNote:
      "Source states €20 for the city-centre route; the site ships €20 sedan for AGA→city-centre, and adds the AGA→Anza (€25) route the source does not list.",
  },
  {
    section: "3.2",
    enTitle: "Tourist Transport",
    frTitle: "Transport Touristique",
    id: "private-transfers-tourist-transport",
    sourcePriceEur: null,
    note: "Source lists 'Tourist Transport' with no prices; the site prices routes (Essaouira 95 €, Marrakech 125 € sedan) as market benchmarks.",
  },
];

/** Services in the shipped catalogue with no equivalent source section. */
export const ADDED_AFTER_SOURCE: { id: string; note: string }[] = [
  {
    id: "airport-taghazout",
    note: "Split from 3.1's Taghazout price line (€35) into its own service page.",
  },
];

/**
 * Plausible legacy-URL slugs for each source service, derived from the
 * catalogue's section titles (kebab-cased, the site's own slug convention).
 * The regression test hits these; each must either redirect to the shipped
 * product page or be an intentional rename represented here.
 */
export const LEGACY_SLUG_HINTS: { id: string; slug: string; expect: "redirect-or-404" }[] = [
  { id: "paradise-valley", slug: "paradise-valley", expect: "redirect-or-404" },
  { id: "agadir-city-tour", slug: "discover-agadir-city-tour", expect: "redirect-or-404" },
  { id: "massa-tiznit", slug: "massa-tiznit-coastal-nature-desert", expect: "redirect-or-404" },
  { id: "essaouira", slug: "essaouira-mogador-coastal-day-trip", expect: "redirect-or-404" },
  { id: "taroudant-tiout", slug: "taroudant-tiout-history-culture-oasis", expect: "redirect-or-404" },
  { id: "marrakech", slug: "marrakech-day-trip-from-agadir", expect: "redirect-or-404" },
  { id: "boat-cruise", slug: "agadir-boat-cruise", expect: "redirect-or-404" },
  { id: "timlalin-dunes", slug: "timlalin-desert-experience", expect: "redirect-or-404" },
  { id: "crocoparc", slug: "crocoparc-agadir", expect: "redirect-or-404" },
  { id: "moroccan-evening", slug: "moroccan-evening-dinner-fantasia", expect: "redirect-or-404" },
  { id: "quad-buggy-forest", slug: "agadir-quad-buggy-adventure", expect: "redirect-or-404" },
  { id: "horse-riding-souss", slug: "horse-riding-souss-river", expect: "redirect-or-404" },
  { id: "airport-agadir", slug: "airport-transfer-agadir", expect: "redirect-or-404" },
  {
    id: "private-transfers-tourist-transport",
    slug: "tourist-transport",
    expect: "redirect-or-404",
  },
];
