import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import type { Service } from "@/schemas/service";

const VALID_POLICIES = new Set(["transfer", "excursion", "adventure"]);
const VALID_HOSTS = new Set(["driver-host", "operator-team", "boat-crew", "venue-team", "driver"]);
const VALID_PRIVATE_RATES = new Set([
  "agadir-halfday",
  "region-near",
  "essaouira",
  "marrakech",
  "privateDayRates",
]);

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validate services according to all content rules.
 */
export function validateServices(enServices: Service[], frServices: Service[]): ValidationResult {
  const errors: string[] = [];

  // 1. Duplicate slugs check (within EN, within FR, and cross-check)
  const enSlugs = new Map<string, string>();
  for (const s of enServices) {
    if (enSlugs.has(s.slug)) {
      errors.push(
        `Duplicate EN slug found: '${s.slug}' on services '${enSlugs.get(s.slug)}' and '${s.id}'`,
      );
    } else {
      enSlugs.set(s.slug, s.id);
    }
  }

  const frSlugs = new Map<string, string>();
  for (const s of frServices) {
    if (frSlugs.has(s.slug)) {
      errors.push(
        `Duplicate FR slug found: '${s.slug}' on services '${frSlugs.get(s.slug)}' and '${s.id}'`,
      );
    } else {
      frSlugs.set(s.slug, s.id);
    }
  }

  // 2. Missing FR fields check
  const frById = new Map<string, Service>(frServices.map((s) => [s.id, s]));
  for (const enService of enServices) {
    const frService = frById.get(enService.id);
    if (!frService) {
      errors.push(`Missing corresponding FR service for '${enService.id}'`);
      continue;
    }

    if (!frService.title || frService.title.trim() === "") {
      errors.push(`Missing FR field 'title' on service '${enService.id}'`);
    }
    if (!frService.slug || frService.slug.trim() === "") {
      errors.push(`Missing FR field 'slug' on service '${enService.id}'`);
    }
    if (!frService.summary || frService.summary.trim() === "") {
      errors.push(`Missing FR field 'summary' on service '${enService.id}'`);
    }
    if (!frService.seo?.title || frService.seo.title.trim() === "") {
      errors.push(`Missing FR field 'seo.title' on service '${enService.id}'`);
    }
    if (!frService.seo?.description || frService.seo.description.trim() === "") {
      errors.push(`Missing FR field 'seo.description' on service '${enService.id}'`);
    }
    if (!frService.primaryKeyword || frService.primaryKeyword.trim() === "") {
      errors.push(`Missing FR field 'primaryKeyword' on service '${enService.id}'`);
    }
    if (enService.category !== "transfer") {
      if (!frService.highlights || frService.highlights.length === 0) {
        errors.push(`Missing FR field 'highlights' on service '${enService.id}'`);
      }
    }
  }

  // Helper to validate a service list
  const checkServiceList = (services: Service[], lang: "en" | "fr") => {
    for (const s of services) {
      // 3. SEO title > 60 chars or description > 160 chars
      if (s.seo?.title && s.seo.title.length > 60) {
        errors.push(
          `SEO title exceeds 60 characters (${s.seo.title.length} chars) on service '${s.id}' [${lang}]: '${s.seo.title}'`,
        );
      }
      if (s.seo?.description && s.seo.description.length > 160) {
        errors.push(
          `SEO description exceeds 160 characters (${s.seo.description.length} chars) on service '${s.id}' [${lang}]`,
        );
      }

      // 4. Primary keyword missing from the SEO title
      if (s.primaryKeyword && s.seo?.title) {
        const titleLower = s.seo.title.toLowerCase();
        const kwLower = s.primaryKeyword.toLowerCase();
        if (!titleLower.includes(kwLower)) {
          errors.push(
            `Primary keyword '${s.primaryKeyword}' missing from SEO title '${s.seo.title}' on service '${s.id}' [${lang}]`,
          );
        }
      }

      // 5. Unknown policy/host/private-rate key
      if (s.cancellationPolicy && !VALID_POLICIES.has(s.cancellationPolicy)) {
        errors.push(
          `Unknown cancellation policy: '${s.cancellationPolicy}' on service '${s.id}' [${lang}]`,
        );
      }
      if (s.host && !VALID_HOSTS.has(s.host)) {
        errors.push(`Unknown host: '${s.host}' on service '${s.id}' [${lang}]`);
      }
      if (s.privateRate && !VALID_PRIVATE_RATES.has(s.privateRate)) {
        errors.push(`Unknown private-rate key: '${s.privateRate}' on service '${s.id}' [${lang}]`);
      }
      if (s.dayHire?.usesSiteRates && !VALID_PRIVATE_RATES.has(s.dayHire.usesSiteRates)) {
        errors.push(
          `Unknown private-rate key: '${s.dayHire.usesSiteRates}' in dayHire on service '${s.id}' [${lang}]`,
        );
      }

      // 6. Any price without a unit
      const topLevelUnit = s.price?.unit;
      if (!topLevelUnit) {
        if (!s.price?.options || s.price.options.length === 0) {
          errors.push(`Price has no unit on service '${s.id}' [${lang}]`);
        } else {
          for (const opt of s.price.options) {
            if (!opt.unit) {
              errors.push(`Price option '${opt.label}' has no unit on service '${s.id}' [${lang}]`);
            }
          }
        }
      }

      // Check extras
      if (s.extras) {
        for (const ext of s.extras) {
          if (ext.amount !== null && ext.amount > 0 && !ext.unit) {
            errors.push(
              `Transfer extra '${ext.label}' has amount ${ext.amount} but no unit on service '${s.id}' [${lang}]`,
            );
          }
        }
      }

      // 7. Word "Sahara" anywhere in copy
      const seasonalText = Array.isArray(s.seasonalNotes)
        ? s.seasonalNotes.join(" ")
        : s.seasonalNotes || "";

      const copyItems: Array<{ field: string; text: string }> = [
        { field: "title", text: s.title || "" },
        { field: "summary", text: s.summary || "" },
        { field: "seo.title", text: s.seo?.title || "" },
        { field: "seo.description", text: s.seo?.description || "" },
        { field: "seasonalNotes", text: seasonalText },
      ];

      (s.highlights || []).forEach((h, i) =>
        copyItems.push({ field: `highlights[${i}]`, text: h }),
      );
      (s.itinerary || []).forEach((it, i) =>
        copyItems.push({ field: `itinerary[${i}]`, text: it }),
      );
      (s.includedExtra || []).forEach((inc, i) =>
        copyItems.push({ field: `includedExtra[${i}]`, text: inc }),
      );
      (s.notIncluded || []).forEach((n, i) =>
        copyItems.push({ field: `notIncluded[${i}]`, text: n }),
      );
      (s.restrictions || []).forEach((r, i) =>
        copyItems.push({ field: `restrictions[${i}]`, text: r }),
      );
      (s.faq || []).forEach((f, i) => {
        copyItems.push({ field: `faq[${i}].q`, text: f.q });
        copyItems.push({ field: `faq[${i}].a`, text: f.a });
      });

      for (const item of copyItems) {
        if (/\bsahara\b/i.test(item.text)) {
          errors.push(
            `Forbidden word 'Sahara' found in ${item.field} on service '${s.id}' [${lang}]: "${item.text}"`,
          );
        }
      }
    }
  };

  checkServiceList(enServices, "en");
  checkServiceList(frServices, "fr");

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Load services dynamically from content directory and validate.
 */
export async function validateContent(options?: {
  contentDir?: string;
  enServices?: Service[];
  frServices?: Service[];
}): Promise<ValidationResult> {
  if (options?.enServices && options?.frServices) {
    return validateServices(options.enServices, options.frServices);
  }

  const baseDir =
    options?.contentDir ||
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../content");

  const enIndexPath = path.join(baseDir, "en", "index.ts");
  const frIndexPath = path.join(baseDir, "fr", "index.ts");

  if (!fs.existsSync(enIndexPath) || !fs.existsSync(frIndexPath)) {
    return {
      valid: false,
      errors: [`Cannot find content index files at ${enIndexPath} and ${frIndexPath}`],
    };
  }

  const enModule = await import(pathToFileURL(enIndexPath).href);
  const frModule = await import(pathToFileURL(frIndexPath).href);

  const enServices: Service[] = enModule.services;
  const frServices: Service[] = frModule.services;

  return validateServices(enServices, frServices);
}
