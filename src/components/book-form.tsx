"use client";

import { useActionState, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { quote } from "@/pricing/quote";
import type { BookingServiceOption } from "@/booking/types";
import { HONEYPOT_FIELD, type InquiryState } from "@/booking/types";
import type { submitInquiry } from "@/booking/actions";

const initialState: InquiryState = { status: "idle" };

const inputClass =
  "mt-1 w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-accent";
const labelClass = "block text-sm font-semibold text-ink";

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

  const [state, formAction, pending] = useActionState(action, initialState);

  const selected = services.find((s) => s.id === serviceId);
  const liveQuote = useMemo(() => {
    if (!selected) return null;
    return quote(selected, { adults, children });
  }, [selected, adults, children]);

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
            onChange={(event) => setServiceId(event.target.value)}
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
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="name">
              {t("nameLabel")}
            </label>
            <input id="name" name="name" required className={inputClass} placeholder={t("namePlaceholder")} />
          </div>
          <div>
            <label className={labelClass} htmlFor="email">
              {t("emailLabel")}
            </label>
            <input id="email" name="email" type="email" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="phone">
              {t("phoneLabel")}
            </label>
            <input id="phone" name="phone" required className={inputClass} />
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
              onChange={(event) => setAdults(Number(event.target.value))}
              className={inputClass}
            />
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
              onChange={(event) => setChildren(Number(event.target.value))}
              className={inputClass}
            />
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
                <span>{liveQuote.totalEur} €</span>
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
