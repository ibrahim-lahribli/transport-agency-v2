"use client";

import { useActionState, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { quote, usesTieredPricing } from "@/pricing/quote";
import type { VehicleClass } from "@/pricing/types";
import { selectBaseOption } from "@/seo/price";
import type { BookingServiceOption } from "@/booking/types";
import { HONEYPOT_FIELD, type InquiryState } from "@/booking/types";
import type { submitInquiry } from "@/booking/actions";
import { buttonClass, Eyebrow } from "@/components/ui";
import { MobileBar } from "@/components/mobile-bar";

const initialState: InquiryState = { status: "idle" };

/*
 * Field language from the design: paper-surface inputs with ≥2.75rem targets,
 * serif fieldset legends numbered 01/02, − value + steppers for party size and
 * radio cards for vehicles. All styling stays inside the design tokens.
 */
const inputClass =
  "min-h-11 w-full rounded-sm border border-accent/60 bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent";
const labelClass = "flex flex-col gap-2 text-sm font-semibold text-ink";
const selectShell = "relative";
const selectClass = `${inputClass} appearance-none pe-10`;
const chevronClass =
  "pointer-events-none absolute inset-y-0 end-4 flex items-center text-xs text-ink-muted";

const VEHICLE_LABEL_KEY: Record<VehicleClass, "vehicleSedan" | "vehicleVan" | "vehicleMinibus"> = {
  sedan: "vehicleSedan",
  van: "vehicleVan",
  minibus: "vehicleMinibus",
};

const EMPTY_TEXTS = {
  name: "",
  email: "",
  phone: "",
  date: "",
  hotel: "",
  notes: "",
};

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <p id={id} className="text-xs font-medium text-error">{message}</p>;
}

/** Serif legend with the design's terracotta step number. */
function StepLegend({ step, label }: { step: "01" | "02"; label: string }) {
  return (
    <legend className="flex items-center gap-3 text-xl text-ink">
      <span aria-hidden="true" className="font-sans text-sm font-semibold text-accent-strong">
        {step}
      </span>
      {label}
    </legend>
  );
}

/** A select field with the design's decorative chevron (label wraps the field). */
function SelectField({
  id,
  name,
  value,
  label,
  invalid,
  errorId,
  error,
  onChange,
  children,
}: {
  id: string;
  name: string;
  value: string | number;
  label: string;
  invalid: boolean;
  errorId: string;
  error?: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className={labelClass} htmlFor={id}>
      {label}
      <div className={selectShell}>
        <select
          id={id}
          name={name}
          value={value}
          aria-invalid={invalid}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange(event.target.value)}
          className={selectClass}
        >
          {children}
        </select>
        <span aria-hidden="true" className={chevronClass}>
          ▾
        </span>
      </div>
      <FieldError id={errorId} message={error} />
    </label>
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
  const [texts, setTexts] = useState(EMPTY_TEXTS);

  const [state, formAction, pending] = useActionState(action, initialState);

  // React resets a form after its action runs, wiping uncontrolled fields and
  // knocking a controlled <select> back to its first option while the quote
  // still reflects the old choice. Remounting on the action's `attempt` id
  // re-applies every controlled value, so the visitor keeps their input and the
  // visible fields cannot disagree with what would be submitted.
  const formKey = state.status === "error" ? state.attempt : 0;

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
  const effectiveVehicle = vehicle && vehicleChoices.includes(vehicle) ? vehicle : undefined;

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

  function onTextChange(key: keyof typeof EMPTY_TEXTS, value: string) {
    setTexts((prev) => ({ ...prev, [key]: value }));
  }

  // The sticky mobile bar watches the first legend leaving the viewport.
  const introRef = useRef<HTMLDivElement>(null);

  if (state.status === "success") {
    return (
      <div className="rounded-md bg-surface p-8 text-center shadow-card">
        {/* The design's success mark: olive disc with the check. */}
        <div
          aria-hidden="true"
          className="mx-auto mb-6 grid size-16 place-items-center rounded-full bg-olive text-xl text-on-accent"
        >
          ✓
        </div>
        <h2 className="text-xl text-ink">{t("successTitle")}</h2>
        <p className="mx-auto mt-2 max-w-[36rem] text-lg text-ink-muted">{state.message}</p>
        <div className="mx-auto mt-6 max-w-[36rem] rounded-md bg-surface-muted p-6 text-start">
          <h3 className="text-lg text-ink">{t("nextStepsTitle")}</h3>
          <ol>
            {[
              { title: t("nextStep1Title"), body: t("nextStep1Body") },
              { title: t("nextStep2Title"), body: t("nextStep2Body") },
              { title: t("nextStep3Title"), body: t("nextStep3Body") },
            ].map((step, index) => (
              <li
                key={step.title}
                className="flex gap-4 border-t border-line py-4 first:border-t-0 [&>span]:grid [&>span]:size-11 [&>span]:flex-none [&>span]:place-items-center [&>span]:rounded-full [&>span]:border [&>span]:border-line"
              >
                <span aria-hidden="true">{index + 1}</span>
                <div>
                  <strong className="text-ink">{step.title}</strong>
                  <p className="mt-1 text-sm text-ink-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("primary")}
          >
            {t("whatsappTitle")}
          </a>
        </div>
      </div>
    );
  }

  // Party size steppers: one definition, the design's − value + look.
  const steppers = [
    { id: "adults" as const, label: t("adultsLabel"), value: adults, set: setAdults, min: 1, error: fieldErrors.adults },
    { id: "children" as const, label: t("childrenLabel"), value: children, set: setChildren, min: 0, error: fieldErrors.children },
  ];

  return (
    <>
      <form
        id="booking-form"
        key={formKey}
        action={formAction}
        className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-10"
      >
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot: hidden from humans, tempting for bots. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor={HONEYPOT_FIELD}>Company</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-10">
        {state.status === "error" && (
          <p role="alert" className="rounded-sm border border-error bg-surface p-4 text-sm font-medium text-ink">
            {state.message}
          </p>
        )}

        {/* 01 — Choose the details. */}
        <fieldset className="border-t border-line pt-8">
          {/* The bar watches this legend: when it leaves the viewport, the sticky
              estimate bar slides up. */}
          <div ref={introRef}>
            <StepLegend step="01" label={t("sectionDetails")} />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5">
            <SelectField
              id="serviceId"
              name="serviceId"
              value={serviceId}
              label={t("serviceLabel")}
              invalid={Boolean(fieldErrors.serviceId)}
              errorId="serviceId-error"
              error={fieldErrors.serviceId}
              onChange={onServiceChange}
            >
              <option value="" disabled>
                {t("servicePlaceholder")}
              </option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </SelectField>

            {variantOptions.length > 0 && (
              <SelectField
                id="optionLabel"
                name="optionLabel"
                value={effectiveOptionLabel ?? ""}
                label={t("variantLabel")}
                invalid={Boolean(fieldErrors.optionLabel)}
                errorId="optionLabel-error"
                error={fieldErrors.optionLabel}
                onChange={setOptionLabel}
              >
                {variantOptions.map((option) => (
                  <option key={option.label} value={option.label}>
                    {option.label} — {option.amount} €
                  </option>
                ))}
              </SelectField>
            )}

            {routes.length > 0 && (
              <>
                {routes.length > 1 ? (
                  <SelectField
                    id="routeIndex"
                    name="routeIndex"
                    value={effectiveRouteIndex}
                    label={t("routeLabel")}
                    invalid={Boolean(fieldErrors.routeIndex)}
                    errorId="routeIndex-error"
                    error={fieldErrors.routeIndex}
                    onChange={(value) => setRouteIndex(Number(value))}
                  >
                    {routes.map((route, index) => (
                      <option key={`${route.from}-${route.to}`} value={index}>
                        {route.from} → {route.to}
                      </option>
                    ))}
                  </SelectField>
                ) : (
                  <input type="hidden" name="routeIndex" value={0} />
                )}

                {/* Vehicle: radio cards, terracotta outline when selected. */}
                <fieldset>
                  <legend className="text-sm font-semibold text-ink">{t("vehicleLabel")}</legend>
                  {fieldErrors.vehicle ? (
                    <FieldError id="vehicle-error" message={fieldErrors.vehicle} />
                  ) : null}
                  <div
                    role="radiogroup"
                    aria-label={t("vehicleLabel")}
                    aria-describedby={fieldErrors.vehicle ? "vehicle-error" : undefined}
                    className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3"
                  >
                    {vehicleChoices.map((choice) => {
                      const active = effectiveVehicle === choice;
                      return (
                        <label
                          key={choice}
                          className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-md border bg-surface p-4 text-sm text-ink transition-colors ${
                            active
                              ? "border-accent border-2 p-[calc(1rem-0.0625rem)]"
                              : "border-accent/60 hover:bg-surface-muted"
                          }`}
                        >
                          <input
                            id={`vehicle-${choice}`}
                            type="radio"
                            name="vehicle"
                            value={choice}
                            checked={active}
                            onChange={(event) =>
                              setVehicle(
                                event.target.checked ? (event.target.value as VehicleClass) : "",
                              )
                            }
                            className="size-4 accent-accent"
                          />
                          <span className="font-semibold">{t(VEHICLE_LABEL_KEY[choice])}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              </>
            )}

            {/* Party size: the design's − value + steppers. */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {steppers.map((row) => (
                <div key={row.id} className={labelClass}>
                  <span>{row.label}</span>
                  <div
                    data-testid={`${row.id}-stepper`}
                    className="grid min-h-11 grid-cols-[2.75rem_1fr_2.75rem] items-center overflow-hidden rounded-sm border border-accent/60 bg-surface text-center"
                  >
                    <button
                      type="button"
                      onClick={() => row.set(Math.max(row.min, row.value - 1))}
                      aria-label={`− ${row.label}`}
                      className="flex min-h-11 items-center justify-center text-lg text-ink transition-colors hover:bg-surface-muted"
                    >
                      −
                    </button>
                    <input
                      name={row.id}
                      type="number"
                      min={row.min}
                      value={row.value}
                      aria-invalid={Boolean(row.error)}
                      aria-describedby={row.error ? `${row.id}-error` : undefined}
                      onChange={(event) => row.set(Number(event.target.value) || row.min)}
                      className="h-full w-full border-0 bg-transparent text-center text-sm text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      type="button"
                      onClick={() => row.set(row.value + 1)}
                      aria-label={`+ ${row.label}`}
                      className="flex min-h-11 items-center justify-center text-lg text-ink transition-colors hover:bg-surface-muted"
                    >
                      +
                    </button>
                  </div>
                  <FieldError
                    id={`${row.id}-error`}
                    message={row.error as string | undefined}
                  />
                </div>
              ))}
            </div>
          </div>
        </fieldset>

        {/* 02 — Contact details. */}
        <fieldset className="border-t border-line pt-8">
          <StepLegend step="02" label={t("sectionContact")} />

          <div className="mt-6 grid grid-cols-1 gap-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className={labelClass}>
                {t("nameLabel")}
                <input
                  id="name"
                  name="name"
                  required
                  value={texts.name}
                  onChange={(event) => onTextChange("name", event.target.value)}
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? "name-error" : undefined}
                  className={inputClass}
                  placeholder={t("namePlaceholder")}
                />
                <FieldError id="name-error" message={fieldErrors.name} />
              </label>
              <label className={labelClass}>
                {t("emailLabel")}
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={texts.email}
                  onChange={(event) => onTextChange("email", event.target.value)}
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? "email-error" : undefined}
                  className={inputClass}
                />
                <FieldError id="email-error" message={fieldErrors.email} />
              </label>
              <label className={labelClass}>
                {t("phoneLabel")}
                <input
                  id="phone"
                  name="phone"
                  required
                  value={texts.phone}
                  onChange={(event) => onTextChange("phone", event.target.value)}
                  aria-invalid={Boolean(fieldErrors.phone)}
                  aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                  className={inputClass}
                />
                <FieldError id="phone-error" message={fieldErrors.phone} />
              </label>
              <label className={labelClass}>
                {t("dateLabel")}
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={texts.date}
                  onChange={(event) => onTextChange("date", event.target.value)}
                  className={inputClass}
                />
              </label>
            </div>

            <label className={labelClass}>
              {t("hotelLabel")}
              <input
                id="hotel"
                name="hotel"
                value={texts.hotel}
                onChange={(event) => onTextChange("hotel", event.target.value)}
                className={inputClass}
                placeholder={t("hotelPlaceholder")}
              />
            </label>

            <label className={labelClass}>
              {t("notesLabel")}
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={texts.notes}
                onChange={(event) => onTextChange("notes", event.target.value)}
                className={inputClass}
                placeholder={t("notesPlaceholder")}
              />
            </label>
          </div>
        </fieldset>
      </div>

      <aside className="h-fit rounded-md bg-surface p-6 shadow-card lg:sticky lg:top-6">
        <Eyebrow>{t("quoteTitle")}</Eyebrow>
        {liveQuote && liveQuote.valid ? (
          <>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              {liveQuote.breakdown.map((line, index) => (
                <li
                  key={index}
                  className="flex items-baseline justify-between gap-3 border-b border-line pb-2"
                >
                  <span>
                    {line.label}
                    {line.quantity > 1 ? ` × ${line.quantity}` : ""}
                  </span>
                  <span className="font-semibold text-ink">{line.total} €</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-line pt-4">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-semibold text-ink">{t("quoteTotal")}</span>
                <span data-testid="quote-total" className="font-serif text-xl text-ink">
                  {liveQuote.totalEur} €
                </span>
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
          className={`${buttonClass("primary")} mt-6 w-full disabled:opacity-60`}
        >
          {pending ? t("sending") : t("submit")}
        </button>
        <p className="mt-4 text-xs text-ink-muted">{t("paymentNote")}</p>
      </aside>
      </form>
      <MobileBar introRef={introRef} formId="booking-form" totalEur={liveQuote?.valid ? liveQuote.totalEur : null} />
    </>
  );
}
