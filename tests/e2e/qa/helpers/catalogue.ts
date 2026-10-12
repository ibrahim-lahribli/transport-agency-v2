/**
 * QA Task 1 helpers: the data-integrity suite's single source of expectations.
 *
 * Everything here is DERIVED, never re-typed: the service list comes from
 * `content/{en,fr}/index.ts` — statically imported so Playwright's bundler
 * follows the same relative path the runtime catalogue uses — and the display
 * price mirrors the `src/seo/price.ts` contract (`getServiceDisplayPrice` /
 * `selectBaseOption` / `UNIT_LABELS`), so the fixture of record matches what
 * the site renders. `CatalogueService` mirrors the zod types locally (no
 * schema import in e2e) so a valid catalogue always satisfies the assertions.
 *
 * Later QA tasks consume `BUILD_SERVICES` from here.
 */

import { fileURLToPath } from "node:url";

import { services as enServices } from "../../../../content/en/index";
import { services as frServices } from "../../../../content/fr/index";
import type { CatalogueService, Locale } from "./types";

export type { CatalogueService, Locale } from "./types";

/**
 * Resolve the absolute repo root even when vitest (not Playwright) imports
 * this module from a different cwd — mirrors the `process.cwd()` anchoring
 * the project's other repo-reading tests use.
 */
export const REPO_ROOT = fileURLToPath(new URL("../../../../", import.meta.url));

/** `content/{en,fr}` directory names, and their site path prefixes. */
export const LOCALE_DIRS = ["en", "fr"] as const;
export type LocaleDir = (typeof LOCALE_DIRS)[number];

/** All locales the site ships. */
export const LOCALES: readonly Locale[] = ["en", "fr"];

const ALL_BY_LOCALE: Record<LocaleDir, CatalogueService[]> = {
  // Local mirror over the raw content modules; conversations about these
  // records' shape live in `src/schemas/service.ts` (types only, never an
  // import away from the e2e bundle).
  en: enServices.map(catalogueServiceFrom),
  fr: frServices.map(catalogueServiceFrom),
};

const PUBLISHED_BY_LOCALE: Record<LocaleDir, CatalogueService[]> = {
  en: ALL_BY_LOCALE.en.filter(isPublished).sort(byOrder),
  fr: ALL_BY_LOCALE.fr.filter(isPublished).sort(byOrder),
};

/** The publish-gate rule from `src/catalogue/index.ts`, mirrored here. */
function isPublished(service: CatalogueService): boolean {
  return service.status === "published";
}

/** Sort key identical to the pages' ordering (`order`, ascending; schema-required). */
function byOrder(a: CatalogueService, b: CatalogueService): number {
  return (a.order ?? 0) - (b.order ?? 0);
}

function catalogueServiceFrom(raw: unknown): CatalogueService {
  // Structural (not zod) narrowing on purpose: the e2e bundle must not need
  // the schema. A wrongly-shaped catalogue record surfaces as a test failure
  // here rather than as a type error, and validation (validate:data) owns
  // shape enforcement.
  const s = raw as CatalogueService & { images?: unknown };
  return {
    id: s.id,
    slug: s.slug,
    title: s.title,
    category: s.category,
    status: s.status,
    order: s.order,
    price: s.price,
    routes: s.routes,
    durationHours: s.durationHours,
    images: Array.isArray(s.images) ? (s.images as string[]) : undefined,
  };
}

/**
 * Every published service for a locale, in the pages' order. This is the
 * function the whole QA plan (tasks 2–4) consumes.
 */
export function BUILD_SERVICES(localeDir: LocaleDir): CatalogueService[] {
  return PUBLISHED_BY_LOCALE[localeDir];
}

/** The service's site path under the locale segment (sitemap + page). */
export function servicePath(localeDir: LocaleDir, service: CatalogueService): string {
  return `/${localeDir}/${service.slug}`;
}

/**
 * The service-card / gallery primary image href, mirroring
 * `getServiceImage(id, kind)`'s two-shape contract from `src/content/images.ts`:
 * configured ids map to `public/images/services/<id>.jpg`; anything else
 * falls back to artwork (`artwork:` id or hub-context default).
 */
export function serviceImageHref(
  id: string,
  config: "primary" | "support" = "primary",
): string {
  if (config === "support") {
    // `page.tsx` calls `getServiceImage(\`${id}-b|-c\`, "gallery")` with NO
    // hub argument. `fallbackArtwork(undefined, false, slot)` therefore
    // returns beach (b) / boats (c) for every category, not category artwork —
    // assert exactly on those files so a routing change that adds a hub
    // argument breaks the test rather than silently changing content.
    return id.endsWith("-b") ? "/images/beach.jpg" : "/images/boats.jpg";
  }
  const known = id in SERVICE_IMAGE_IDS;
  return known ? `/images/services/${id}.jpg` : "/images/coast.jpg";
}

/** `SERVICE_IMAGE_IDS[...]` membership witness, as a lookup set. */
const SERVICE_IMAGE_IDS = new Set<string>([
  "agadir-city-tour",
  "airport-agadir",
  "airport-taghazout",
  "boat-cruise",
  "crocoparc",
  "essaouira",
  "horse-riding-souss",
  "marrakech",
  "massa-tiznit",
  "moroccan-evening",
  "paradise-valley",
  "private-transfers-tourist-transport",
  "quad-buggy-forest",
  "taroudant-tiout",
  "timlalin-dunes",
]);

/**
 * Display-price derivation mirroring `src/seo/price.ts`. The visible quick
 * facts, the service-card footer and the JSON-LD `Offer.price` all come from
 * that one contract; these mirrors are pinned against actual amounts in the
 * data-integrity spec so drift between catalogue and mirror fails loudly.
 */

const ADD_ON_HINTS = ["add-on", "addon", "extra", "supplement", "waiting", "overtime", "surcharge"];
const BASE_UNITS = new Set(["person", "vehicle", "quad", "buggy"]);
const UNIT_LABELS: Record<string, { en: string; fr: string }> = {
  person: { en: "person", fr: "personne" },
  vehicle: { en: "vehicle", fr: "véhicule" },
  quad: { en: "quad", fr: "quad" },
  buggy: { en: "buggy", fr: "buggy" },
  "per 30 min": { en: "per 30 min", fr: "par 30 min" },
  "30 minutes": { en: "30 minutes", fr: "30 minutes" },
};

interface MirrorPriceOption {
  label?: string;
  amount?: number;
  unit?: string;
  isBase?: boolean;
}

interface MirrorPrice {
  unit?: string;
  options?: MirrorPriceOption[];
  nightSurcharge?: number;
}

interface MirrorRoute {
  prices?: { sedan?: number; van?: number; minibus?: number };
}

export interface MirrorService {
  id: string;
  category?: string;
  price?: MirrorPrice;
  routes?: MirrorRoute[];
}

function isAddOnOption(option: MirrorPriceOption): boolean {
  const label = option.label?.toLowerCase() ?? "";
  return ADD_ON_HINTS.some((hint) => label.includes(hint));
}

function cheapest(options: MirrorPriceOption[]): MirrorPriceOption {
  return options.reduce(
    (min, cur) => ((cur.amount ?? 0) < (min.amount ?? 0) ? cur : min),
    options[0],
  );
}

/** Priority ladder from `selectBaseOption` in `src/seo/price.ts`. */
export function selectBaseOption(options: MirrorPriceOption[]): MirrorPriceOption | undefined {
  if (options.length === 0) return undefined;

  const flagged = options.filter((o) => o.isBase === true && (o.amount ?? 0) > 0);
  if (flagged.length > 0) return cheapest(flagged);

  const adult = options.find(
    (o) =>
      (o.label?.toLowerCase().includes("adult") || o.label?.toLowerCase().includes("adulte")) &&
      (o.amount ?? 0) > 0,
  );
  if (adult) return adult;

  const baseOptions = options.filter(
    (o) =>
      (o.amount ?? 0) > 0 && !isAddOnOption(o) && o.unit !== undefined && BASE_UNITS.has(o.unit),
  );
  if (baseOptions.length > 0) return cheapest(baseOptions);

  const positive = options.filter((o) => (o.amount ?? 0) > 0);
  if (positive.length > 0) return cheapest(positive);

  return options[0];
}

/** Matches `getServiceDisplayPrice` exactly: transfers with routes price the sedan of route[0]. */
export function getDisplayPrice(
  service: MirrorService,
): { amount: number; currency: "EUR"; unit: string; unitLabel: { en: string; fr: string } } {
  const price = service.price ?? {};
  let amount = 0;
  let unit = price.unit ?? "person";

  if (service.category === "transfer" && service.routes && service.routes.length > 0) {
    unit = "vehicle";
    amount = service.routes[0].prices?.sedan ?? 0;
  } else if (price.options && price.options.length > 0) {
    const base = selectBaseOption(price.options);
    if (base) {
      amount = base.amount ?? 0;
      if (base.unit) unit = base.unit;
    }
  }
  return {
    amount,
    currency: "EUR",
    unit,
    unitLabel: UNIT_LABELS[unit] ?? { en: unit, fr: unit },
  };
}
