"use client";

import { useId, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { transferToolQuote, vehicleForParty } from "@/pricing/quote";
import type { TransferRouteItem } from "@/schemas/service";
import type { VehicleClass } from "@/pricing/types";
import { Link } from "@/i18n/routing";
import { buttonClass } from "@/components/ui";

/*
 * The design's indicative-pricing widget for the transfers hub. `routes` are
 * deduced on the server from the catalogue's transfer services (the component
 * never invents one); every total flows through the tested `transferToolQuote`
 * pure function — zero price literals in this file. Vehicle-card styling
 * mirrors the booking form's radio cards so the two surfaces agree.
 */

const inputClass =
  "min-h-11 w-full rounded-sm border border-accent/60 bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent";
const labelClass = "flex flex-col gap-2 text-sm font-semibold text-ink";
const selectClass = `${inputClass} appearance-none pe-10`;
const chevronClass =
  "pointer-events-none absolute inset-y-0 end-4 flex items-center text-xs text-ink-muted";

const VEHICLE_LABEL_KEY: Record<VehicleClass, "vehicleSedan" | "vehicleVan" | "vehicleMinibus"> = {
  sedan: "vehicleSedan",
  van: "vehicleVan",
  minibus: "vehicleMinibus",
};

const PASSENGER_BANDS = [1, 2, 3, 4, 5, 6, 7, 8, 12, 15];

const VEHICLE_CLASSES = ["sedan", "van", "minibus"] as const satisfies readonly VehicleClass[];

export function TransferTool({
  routes,
  bookServiceId,
}: {
  routes: TransferRouteItem[];
  /** The catalogue service id to book (the form selects by id, not slug). */
  bookServiceId: string;
}) {
  const t = useTranslations("tool");
  const tBook = useTranslations("book");
  const formId = useId();

  const [routeIndex, setRouteIndex] = useState(0);
  const [passengers, setPassengers] = useState(2);
  // `null` = follow the party-size recommendation; a class = explicit choice.
  const [vehicleOverride, setVehicleOverride] = useState<VehicleClass | null>(null);

  const result = useMemo(
    () =>
      transferToolQuote({
        routes,
        adults: passengers,
        children: 0,
        routeIndex,
        vehicle: vehicleOverride ?? undefined,
      }),
    [routes, passengers, routeIndex, vehicleOverride],
  );

  const recommended = vehicleForParty(passengers);
  const route = routes[result.valid ? result.routeIndex : 0] ?? routes[0];
  const selected = vehicleOverride ?? recommended;

  const updateRoute = (value: string) => {
    const index = Number(value);
    if (Number.isInteger(index) && index >= 0 && index < routes.length) {
      setRouteIndex(index);
    }
  };

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-[1fr_1.4fr_0.8fr]">
        {/* From is fixed by the data the hub passes in (airport/hotel legs). */}
        <label className={labelClass}>
          <span>{tBook("routeLabel")}</span>
          <span aria-live="polite" className={`${inputClass} font-normal`}>
            {route.from}
          </span>
        </label>
        <label className={labelClass}>
          <span>{t("toLabel")}</span>
          <span className="relative block">
            <select
              className={selectClass}
              value={result.valid ? result.routeIndex : 0}
              onChange={(event) => updateRoute(event.target.value)}
            >
              {routes.map((option, index) => (
                <option key={`${option.from}-${option.to}`} value={index}>
                  {option.to}
                </option>
              ))}
            </select>
            <span aria-hidden="true" className={chevronClass}>
              ▾
            </span>
          </span>
        </label>
        <label className={labelClass}>
          <span>{t("passengersLabel")}</span>
          <span className="relative block">
            <select
              className={selectClass}
              value={passengers}
              onChange={(event) => setPassengers(Number(event.target.value))}
            >
              {PASSENGER_BANDS.map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
            <span aria-hidden="true" className={chevronClass}>
              ▾
            </span>
          </span>
        </label>
      </div>

      {/* Indicative total, straight from the tested pure function. */}
      <div className="mt-6 flex flex-col justify-between gap-5 rounded-sm bg-ink p-5 text-canvas sm:flex-row sm:items-center">
        {result.valid ? (
          <div className="leading-tight">
            <small className="block text-xs uppercase tracking-[0.14em] text-canvas/80">
              {t("indicativeTotal")}
            </small>
            <strong className="font-serif text-xl" data-testid="tool-total">
              {result.totalEur} € <span className="text-sm font-normal text-canvas/80">/ {t("perVehicle")}</span>
            </strong>
            <small className="block text-xs text-canvas/70">
              {t("basisNote", { basis: result.basis === "catalogue" ? t("basisCatalogue") : t("basisEstimate") })}
            </small>
          </div>
        ) : (
          <p className="text-sm">{result.error}</p>
        )}
        <Link
          href={{ pathname: "/book" as const, query: { service: bookServiceId } }}
          className={buttonClass("light")}
        >
          {t("request")}
        </Link>
      </div>

      {/* Vehicle cards: seat ladder the engine quotes with; selecting one
          overrides the recommendation. Recommended card derives from the
          party size, never from stale state. */}
      <fieldset className="mt-8">
        <legend className="mb-4 text-sm font-semibold text-ink">{t("vehicleLegend")}</legend>
        <div
          role="radiogroup"
          aria-label={t("vehicleLegend")}
          className="grid gap-4 sm:grid-cols-3"
        >
          {VEHICLE_CLASSES.map((vehicleClass) => {
            const isSelected = selected === vehicleClass;
            const isRecommended = recommended === vehicleClass && vehicleOverride === null;
            const price = route ? route.prices[vehicleClass] : null;
            return (
              <label
                key={vehicleClass}
                className={`relative flex min-h-11 cursor-pointer items-start gap-3 rounded-md border bg-surface p-4 transition-colors ${
                  isSelected ? "border-accent shadow-card" : "border-line hover:border-ink/40"
                }`}
              >
                <input
                  type="radio"
                  name={`${formId}-vehicle`}
                  className="peer sr-only"
                  checked={isSelected}
                  onChange={() => setVehicleOverride(vehicleClass)}
                />
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border text-[0.65rem] ${
                    isSelected ? "border-accent bg-accent text-on-accent" : "border-ink/40 text-transparent"
                  }`}
                >
                  ✓
                </span>
                <span className="flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <strong className="font-serif text-lg leading-snug text-ink">
                      {tBook(VEHICLE_LABEL_KEY[vehicleClass])}
                    </strong>
                    {price !== null ? (
                      <span className="text-sm font-semibold text-ink">
                        {price} € <span className="font-normal text-ink-muted">/ {t("perVehicle")}</span>
                      </span>
                    ) : null}
                  </span>
                  {isRecommended ? (
                    <span className="mt-1 inline-block text-xs font-semibold uppercase tracking-wide text-olive">
                      {tBook("vehicleAuto")}
                    </span>
                  ) : null}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <p className="mt-4 max-w-[46rem] text-sm text-ink-muted">{t("caveat")}</p>
    </div>
  );
}
