"use server";

import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";

import { getServiceById } from "@/catalogue";
import { isAppLocale } from "@/i18n/locales";

import { notifyInquiry } from "./notify";
import { resolveSelection } from "./selection";
import { HONEYPOT_FIELD, InquirySchema, type InquiryState } from "./types";

/** Locale-aware messages for the fields the form renders; falls back to `invalid`. */
const FIELD_ERROR_KEY: Record<string, string> = {
  serviceId: "errService",
  name: "errName",
  email: "errEmail",
  phone: "errPhone",
  adults: "errAdults",
  children: "errChildren",
  optionLabel: "errOption",
  vehicle: "errVehicle",
  routeIndex: "errRoute",
};

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

/** Build an error state, bumping `attempt` so the form knows to re-apply values. */
function errorState(
  prev: InquiryState,
  message: string,
  fieldErrors?: Record<string, string>,
): InquiryState {
  const attempt = (prev.status === "error" ? prev.attempt : 0) + 1;
  return { status: "error", message, fieldErrors, attempt };
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
    return errorState(_prev, t("error"));
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
    optionLabel: formData.get("optionLabel") || undefined,
    vehicle: formData.get("vehicle") || undefined,
    routeIndex: formData.get("routeIndex") || undefined,
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (fieldErrors[key]) continue;
      const messageKey = FIELD_ERROR_KEY[key];
      fieldErrors[key] = messageKey ? t(messageKey) : t("invalid");
    }
    return errorState(_prev, t("invalid"), fieldErrors);
  }

  const service = getServiceById(parsed.data.serviceId, locale);
  if (!service) {
    return errorState(_prev, t("invalid"), { serviceId: t("errService") });
  }

  // Validate the selection against the chosen service; never trust the client.
  const resolved = resolveSelection(service, {
    optionLabel: parsed.data.optionLabel,
    vehicle: parsed.data.vehicle,
    routeIndex: parsed.data.routeIndex,
  });
  if (!resolved.ok) {
    return errorState(_prev, t("invalid"), { [resolved.field]: t(FIELD_ERROR_KEY[resolved.field]) });
  }

  await notifyInquiry(parsed.data, service.title, resolved.selection);

  return { status: "success", message: t("success") };
}
