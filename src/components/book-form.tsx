"use client";

import { useActionState, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { quote, usesTieredPricing } from "@/pricing/quote";
import type { VehicleClass } from "@/pricing/types";
import { selectBaseOption } from "@/seo/price";
import type { BookingServiceOption } from "@/booking/types";
import { HONEYPOT_FIELD, type InquiryState } from "@/booking/types";
import type { submitInquiry } from "@/booking/actions";

const initialState: InquiryState = { status: "idle" };

const inputClass =
  "mt-1 w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-accent";
const labelClass = "block text-sm font-semibold text-ink";

const VEHICLE_LABEL_KEY: Record<VehicleClass, "vehicleSedan" | "vehicleVan" | "vehicleMinibus"> = {
  sedan: "vehicleSedan",
  van: "vehicleVan",
  minibus: "vehicleMinibus",
};

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-xs font-medium text-accent-strong">
      {message}
    </p>
  );
}

export function BookForm({
  locale,
  services,
  initialServiceId,
  whatsappUrl,
  action,
}: {
  locale: string;
  services: BookingServiceOption[];
  initialServiceId?: string;
  whatsappUrl: string;
  action: typeof submitInquiry;
}) {
  const t = useTranslations("book");
  const [serviceId, setServiceId] = useState(initialServiceId ?? services[0]?.id ?? "");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [optionLabel, setOptionLabel] = useState("");
  const [routeIndex, setRouteIndex] = useState(0);
  const [vehicle, setVehicle] = useState<VehicleClass | "">("");

  const [state, formAction, pending] = useActionState(action, initialState);

  const selected = services.find((s) => s.id === serviceId);
  const fieldErrors = state.status === "error" ? state.fieldErrors ?? {} : {};

  const routes = selected?.routes ?? [];

  // Variant services expose a product selector; tiered services are priced from
  // the party size instead. Transfers use routes and a vehicle, never options.
  const variantOptions = useMemo(() => {
    if (!selected || routes.length > 0) return [];
    if (usesTieredPricing(selected)) return [];
    return selected.price.options ?? [];
  }, [selected, routes.length]);

  // Fall back to the base option so the selector always shows a valid choice,
  // even after switching services or from a stale selection.
  const effectiveOptionLabel =
    variantOptions.length > 0
      ? variantOptions.some((o) => o.label === optionLabel)
        ? optionLabel
        : (selectBaseOption(variantOptions)?.label ?? variantOptions[0].label)
      : undefined;

  const effectiveRouteIndex =
    routes.length > 0 ? Math.min(Math.max(routeIndex, 0), routes.length - 1) : 0;

  const vehicleChoices = selected?.vehicles ?? (["sedan", "van", "minibus"] as VehicleClass[]);
  const effectiveVehicle =
    vehicle && vehicleChoices.includes(vehicle) ? vehicle : undefined;

  const liveQuote = useMemo(() => {
    if (!selected) return null;
    return quote(
      selected,
      { adults, children },
      { optionLabel: effectiveOptionLabel, routeIndex: effectiveRouteIndex, vehicle: effectiveVehicle },
    );
  }, [selected, adults, children, effectiveOptionLabel, effectiveRouteIndex, effectiveVehicle]);

  // Switching service resets the selection so a stale option/route from the
  // previous service cannot leak into the quote; the new service's base option
  // and first route are then derived below.
  function onServiceChange(nextId: string) {
    setServiceId(nextId);
    setOptionLabel("");
    setRouteIndex(0);
    setVehicle("");
  }

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-line bg-surface p-6 text-center">
        <h2 className="text-xl font-bold text-ink">{t("successTitle")}</h2>
        <p className="mt-2 text-sm text-ink-muted">{state.message}</p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-[44px] items-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent hover:bg-accent-strong"
        >
          {t("whatsappTitle")}
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot: hidden from humans, tempting for bots. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor={HONEYPOT_FIELD}>Company</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-4">
        {state.status === "error" && (
          <p role="alert" className="rounded-md border border-accent bg-surface-muted p-3 text-sm text-ink">
            {state.message}
          </p>
        )}

        <div>
          <label className={labelClass} htmlFor="serviceId">
            {t("serviceLabel")}
          </label>
          <select
            id="serviceId"
            name="serviceId"
            value={serviceId}
            aria-invalid={Boolean(fieldErrors.serviceId)}
            aria-describedby={fieldErrors.serviceId ? "serviceId-error" : undefined}
            onChange={(event) => onServiceChange(event.target.value)}
            className={inputClass}
          >
            <option value="" disabled>
              {t("servicePlaceholder")}
            </option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>
          <FieldError id="serviceId-error" message={fieldErrors.serviceId} />
        </div>

        {variantOptions.length > 0 && (
          <div>
            <label className={labelClass} htmlFor="optionLabel">
              {t("variantLabel")}
            </label>
            <select
              id="optionLabel"
              name="optionLabel"
              value={effectiveOptionLabel}
              aria-invalid={Boolean(fieldErrors.optionLabel)}
              aria-describedby={fieldErrors.optionLabel ? "optionLabel-error" : undefined}
              onChange={(event) => setOptionLabel(event.target.value)}
              className={inputClass}
            >
              {variantOptions.map((option) => (
                <option key={option.label} value={option.label}>
                  {option.label} — {option.amount} €
                </option>
              ))}
            </select>
            <FieldError id="optionLabel-error" message={fieldErrors.optionLabel} />
          </div>
        )}

        {routes.length > 0 && (
          <>
            {routes.length > 1 ? (
              <div>
                <label className={labelClass} htmlFor="routeIndex">
                  {t("routeLabel")}
                </label>
                <select
                  id="routeIndex"
                  name="routeIndex"
                  value={effectiveRouteIndex}
                  aria-invalid={Boolean(fieldErrors.routeIndex)}
                  aria-describedby={fieldErrors.routeIndex ? "routeIndex-error" : undefined}
                  onChange={(event) => setRouteIndex(Number(event.target.value))}
                  className={inputClass}
                >
                  {routes.map((route, index) => (
                    <option key={`${route.from}-${route.to}`} value={index}>
                      {route.from} → {route.to}
                    </option>
                  ))}
                </select>
                <FieldError id="routeIndex-error" message={fieldErrors.routeIndex} />
              </div>
            ) : (
              <input type="hidden" name="routeIndex" value={0} />
            )}

            <div>
              <label className={labelClass} htmlFor="vehicle">
                {t("vehicleLabel")}
              </label>
              <select
                id="vehicle"
                name="vehicle"
                value={effectiveVehicle ?? ""}
                aria-invalid={Boolean(fieldErrors.vehicle)}
                aria-describedby={fieldErrors.vehicle ? "vehicle-error" : undefined}
                onChange={(event) => setVehicle(event.target.value as VehicleClass | "")}
                className={inputClass}
              >
                <option value="">{t("vehicleAuto")}</option>
                {vehicleChoices.map((choice) => (
                  <option key={choice} value={choice}>
                    {t(VEHICLE_LABEL_KEY[choice])}
                  </option>
                ))}
              </select>
              <FieldError id="vehicle-error" message={fieldErrors.vehicle} />
            </div>
          </>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="name">
              {t("nameLabel")}
            </label>
            <input
              id="name"
              name="name"
              required
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
              className={inputClass}
              placeholder={t("namePlaceholder")}
            />
            <FieldError id="name-error" message={fieldErrors.name} />
          </div>
          <div>
            <label className={labelClass} htmlFor="email">
              {t("emailLabel")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              className={inputClass}
            />
            <FieldError id="email-error" message={fieldErrors.email} />
          </div>
          <div>
            <label className={labelClass} htmlFor="phone">
              {t("phoneLabel")}
            </label>
            <input
              id="phone"
              name="phone"
              required
              aria-invalid={Boolean(fieldErrors.phone)}
              aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
              className={inputClass}
            />
            <FieldError id="phone-error" message={fieldErrors.phone} />
          </div>
          <div>
            <label className={labelClass} htmlFor="date">
              {t("dateLabel")}
            </label>
            <input id="date" name="date" type="date" className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="adults">
              {t("adultsLabel")}
            </label>
            <input
              id="adults"
              name="adults"
              type="number"
              min={1}
              value={adults}
              aria-invalid={Boolean(fieldErrors.adults)}
              aria-describedby={fieldErrors.adults ? "adults-error" : undefined}
              onChange={(event) => setAdults(Number(event.target.value))}
              className={inputClass}
            />
            <FieldError id="adults-error" message={fieldErrors.adults} />
          </div>
          <div>
            <label className={labelClass} htmlFor="children">
              {t("childrenLabel")}
            </label>
            <input
              id="children"
              name="children"
              type="number"
              min={0}
              value={children}
              aria-invalid={Boolean(fieldErrors.children)}
              aria-describedby={fieldErrors.children ? "children-error" : undefined}
              onChange={(event) => setChildren(Number(event.target.value))}
              className={inputClass}
            />
            <FieldError id="children-error" message={fieldErrors.children} />
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="hotel">
            {t("hotelLabel")}
          </label>
          <input id="hotel" name="hotel" className={inputClass} placeholder={t("hotelPlaceholder")} />
        </div>

        <div>
          <label className={labelClass} htmlFor="notes">
            {t("notesLabel")}
          </label>
          <textarea id="notes" name="notes" rows={3} className={inputClass} placeholder={t("notesPlaceholder")} />
        </div>
      </div>

      <aside className="h-fit rounded-xl border border-line bg-surface p-6 lg:sticky lg:top-6">
        <h2 className="text-base font-bold text-ink">{t("quoteTitle")}</h2>
        {liveQuote && liveQuote.valid ? (
          <>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              {liveQuote.breakdown.map((line, index) => (
                <li key={index} className="flex justify-between gap-3">
                  <span>
                    {line.label}
                    {line.quantity > 1 ? ` × ${line.quantity}` : ""}
                  </span>
                  <span className="font-semibold text-ink">{line.total} €</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-line pt-4">
              <div className="flex justify-between text-sm font-bold text-ink">
                <span>{t("quoteTotal")}</span>
                <span data-testid="quote-total">{liveQuote.totalEur} €</span>
              </div>
              <div className="mt-1 flex justify-between text-xs text-ink-muted">
                <span>{t("indicativeMad")}</span>
                <span>≈ {liveQuote.indicativeMad} MAD</span>
              </div>
            </div>
            {liveQuote.notes.length > 0 && (
              <ul className="mt-3 space-y-1 text-xs text-ink-muted">
                {liveQuote.notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="mt-3 text-sm text-ink-muted">{t("quoteEmpty")}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent hover:bg-accent-strong disabled:opacity-60"
        >
          {pending ? t("sending") : t("submit")}
        </button>
        <p className="mt-4 text-xs text-ink-muted">{t("paymentNote")}</p>
      </aside>
    </form>
  );
}
