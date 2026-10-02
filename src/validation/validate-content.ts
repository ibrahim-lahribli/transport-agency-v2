import { ServiceSchema, type Service } from "@/schemas/service";
import { guides } from "@/content/guides";
import { places } from "@/content/places";

import { services as enServices } from "../../content/en/index";
import { services as frServices } from "../../content/fr/index";

const MAX_TITLE = 60;
const MAX_DESCRIPTION = 160;

/**
 * Validate one locale's catalogue. Returns human-readable problems; an empty
 * array means the locale is valid.
 */
export function validateLocale(services: Service[], locale: string): string[] {
  const problems: string[] = [];
  const slugs = new Set<string>();
  const ids = new Set<string>();

  for (const service of services) {
    const parsed = ServiceSchema.safeParse(service);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        problems.push(`[${locale}] ${service.id}: ${issue.path.join(".") || "value"} — ${issue.message}`);
      }
    }

    if (slugs.has(service.slug)) {
      problems.push(`[${locale}] duplicate slug "${service.slug}"`);
    }
    slugs.add(service.slug);

    if (ids.has(service.id)) {
      problems.push(`[${locale}] duplicate id "${service.id}"`);
    }
    ids.add(service.id);

    if (service.seo.title.length > MAX_TITLE) {
      problems.push(`[${locale}] ${service.id}: seo.title is ${service.seo.title.length} chars (max ${MAX_TITLE})`);
    }
    if (service.seo.description.length > MAX_DESCRIPTION) {
      problems.push(
        `[${locale}] ${service.id}: seo.description is ${service.seo.description.length} chars (max ${MAX_DESCRIPTION})`,
      );
    }
    if (!service.seo.title.toLowerCase().includes(service.primaryKeyword.toLowerCase())) {
      problems.push(`[${locale}] ${service.id}: primaryKeyword not present in seo.title`);
    }

    const options = service.price.options ?? [];
    if (!service.price.unit && !options.every((o) => !!o.unit)) {
      problems.push(`[${locale}] ${service.id}: a price is missing a unit`);
    }
    for (const extra of service.extras ?? []) {
      if (extra.unit === undefined) {
        problems.push(`[${locale}] ${service.id}: transfer extra "${extra.label}" is missing a unit`);
      }
    }

    const text = JSON.stringify(service);
    if (/\bsahara\b/i.test(text)) {
      problems.push(`[${locale}] ${service.id}: the word "Sahara" appears in copy`);
    }
  }

  return problems;
}

/** EN↔FR parity: every service exists in both locales with required fields. */
export function validateParity(en: Service[], fr: Service[]): string[] {
  const problems: string[] = [];
  const frById = new Map(fr.map((s) => [s.id, s]));

  for (const service of en) {
    const counterpart = frById.get(service.id);
    if (!counterpart) {
      problems.push(`parity: "${service.id}" exists in EN but not FR`);
      continue;
    }
    if (counterpart.category !== service.category) {
      problems.push(`parity: "${service.id}" category differs between EN and FR`);
    }
    if (service.category !== "transfer" && (!counterpart.highlights || counterpart.highlights.length === 0)) {
      problems.push(`parity: "${service.id}" FR is missing highlights`);
    }
  }

  const enIds = new Set(en.map((s) => s.id));
  for (const service of fr) {
    if (!enIds.has(service.id)) {
      problems.push(`parity: "${service.id}" exists in FR but not EN`);
    }
  }

  return problems;
}

/**
 * Editorial markers that must never ship to a real visitor.
 */
const DRAFT_MARKER = /\(\s*draft for native review\.?\s*\)/i;

/** Long-form fields whose text must differ between locales. */
const TRANSLATABLE_SCALARS = [
  "title",
  "summary",
  "days",
  "availability",
  "direction",
  "pickupWindow",
  "returnApprox",
  "schedule",
  "seasonalNotes",
] as const;

const TRANSLATABLE_ARRAYS = [
  "itinerary",
  "includedExtra",
  "notIncluded",
  "bring",
  "suitableFor",
  "restrictions",
  "highlights",
] as const;

/** Shortest identical string treated as untranslated prose, to spare proper nouns. */
const MIN_PROSE_LENGTH = 12;

function readField(service: Service, key: string): unknown {
  return (service as unknown as Record<string, unknown>)[key];
}

/**
 * A non-English locale must not ship the English source verbatim, and no locale
 * may ship an editorial draft marker. Only prose is compared: slugs, ids and
 * place names (route `from`/`to`) are legitimately shared between locales, and
 * the whole array is compared so a single shared word like "Couples" is fine.
 */
export function validateTranslation(
  source: Service[],
  translated: Service[],
  locale: string,
): string[] {
  const problems: string[] = [];
  const byId = new Map(source.map((service) => [service.id, service]));

  for (const service of translated) {
    const original = byId.get(service.id);
    if (!original) continue;

    if (DRAFT_MARKER.test(JSON.stringify(service))) {
      problems.push(`[${locale}] ${service.id}: an editorial draft marker is present in shipped copy`);
    }

    for (const key of [...TRANSLATABLE_SCALARS, ...TRANSLATABLE_ARRAYS]) {
      const value = readField(service, key);
      const english = readField(original, key);
      if (value == null || english == null) continue;

      if (
        typeof value === "string" &&
        typeof english === "string" &&
        value.length >= MIN_PROSE_LENGTH &&
        value === english
      ) {
        problems.push(`[${locale}] ${service.id}: "${key}" is still the English text`);
      } else if (
        Array.isArray(value) &&
        Array.isArray(english) &&
        value.length > 0 &&
        JSON.stringify(value) === JSON.stringify(english)
      ) {
        problems.push(`[${locale}] ${service.id}: "${key}" is still the English text`);
      }
    }

    for (const key of ["title", "description"] as const) {
      const value = service.seo[key];
      if (value.length >= MIN_PROSE_LENGTH && value === original.seo[key]) {
        problems.push(`[${locale}] ${service.id}: "seo.${key}" is still the English text`);
      }
    }

    if (service.extras?.length && original.extras?.length) {
      const labels = service.extras.map((extra) => extra.label);
      const englishLabels = original.extras.map((extra) => extra.label);
      if (JSON.stringify(labels) === JSON.stringify(englishLabels)) {
        problems.push(`[${locale}] ${service.id}: "extras[].label" is still the English text`);
      }
    }

    if (service.route && "legs" in service.route && original.route && "legs" in original.route) {
      const notes = service.route.legs.map((leg) => leg.notes ?? "");
      const englishNotes = original.route.legs.map((leg) => leg.notes ?? "");
      if (notes.some(Boolean) && JSON.stringify(notes) === JSON.stringify(englishNotes)) {
        problems.push(`[${locale}] ${service.id}: "route.legs[].notes" is still the English text`);
      }
    }

    if (service.faq?.length && JSON.stringify(service.faq) === JSON.stringify(original.faq)) {
      problems.push(`[${locale}] ${service.id}: "faq" is still the English text`);
    }

    if (
      service.price.options?.length &&
      JSON.stringify(service.price.options.map((o) => o.label)) ===
        JSON.stringify(original.price.options?.map((o) => o.label))
    ) {
      problems.push(`[${locale}] ${service.id}: price option labels are still the English text`);
    }
  }

  return problems;
}

/** Place hubs and guides must only reference services that exist. */
export function validateLinks(): string[] {
  const problems: string[] = [];
  const ids = new Set([...enServices, ...frServices].map((s) => s.id));

  const collections = [...places, ...guides];
  const slugs = new Set<string>();

  for (const entry of collections) {
    if (slugs.has(entry.slug.en)) {
      problems.push(`content: duplicate slug "${entry.slug.en}"`);
    }
    slugs.add(entry.slug.en);

    for (const serviceId of entry.serviceIds) {
      if (!ids.has(serviceId)) {
        problems.push(`content: "${entry.id}" references unknown service "${serviceId}"`);
      }
    }
  }

  return problems;
}

/** Run every rule across both locales and the place hubs. */
export function runValidation(): string[] {
  return [
    ...validateLocale(enServices, "en"),
    ...validateLocale(frServices, "fr"),
    ...validateParity(enServices, frServices),
    ...validateTranslation(enServices, frServices, "fr"),
    ...validateLinks(),
  ];
}

/** Exposed for tests and tooling. */
export const catalogue = { en: enServices, fr: frServices, places, guides };
