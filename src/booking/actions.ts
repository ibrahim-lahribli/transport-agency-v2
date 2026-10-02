"use server";

import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";

import { getServiceById } from "@/catalogue";
import { isAppLocale } from "@/i18n/locales";

import { notifyInquiry } from "./notify";
import { HONEYPOT_FIELD, InquirySchema, type InquiryState } from "./types";

/** Best-effort in-memory rate limit (per instance; not a security boundary). */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const localeRaw = String(formData.get("locale") ?? "en");
  const locale = isAppLocale(localeRaw) ? localeRaw : "en";
  const t = await getTranslations({ locale, namespace: "book" });

  // Honeypot: a filled hidden field means a bot. Pretend success, do nothing.
  if (String(formData.get(HONEYPOT_FIELD) ?? "").length > 0) {
    return { status: "success", message: t("success") };
  }

  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return { status: "error", message: t("error") };
  }

  const parsed = InquirySchema.safeParse({
    serviceId: formData.get("serviceId"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    date: formData.get("date") ?? undefined,
    adults: formData.get("adults"),
    children: formData.get("children") ?? "0",
    hotel: formData.get("hotel") ?? undefined,
    notes: formData.get("notes") ?? undefined,
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: t("invalid"), fieldErrors };
  }

  const service = getServiceById(parsed.data.serviceId, locale);
  if (!service) {
    return { status: "error", message: t("invalid"), fieldErrors: { serviceId: "Unknown service" } };
  }

  await notifyInquiry(parsed.data, service.title);

  return { status: "success", message: t("success") };
}
