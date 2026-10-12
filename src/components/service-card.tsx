import { getTranslations } from "next-intl/server";

import type { Service } from "@/schemas/service";
import { Link } from "@/i18n/routing";
import { getServiceImage } from "@/content/images";
import { getServiceDisplayPrice } from "@/seo/price";

/**
 * The design's trip card: 3:2 photo, tag pill, clamped serif title, summary,
 * a facts row from real catalogue fields only, and a price footer rendered by
 * `getServiceDisplayPrice`. Same signature and data flow as before — the
 * markup just wears the v2 design now.
 */
export async function ServiceCard({
  service,
  locale,
}: {
  service: Service;
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: "common" });
  const tProduct = await getTranslations({ locale, namespace: "product" });
  const price = getServiceDisplayPrice(service);
  const unitLabel = price.unitLabel[locale as "en" | "fr"];
  const image = getServiceImage(service.id, "card");

  // Facts row from real catalogue fields only: the service's own pickup window
  // (or availability) when it exists, plus hour-count-free cancellation
  // wording (type-correct per-service wording lives on the service page).
  const pickupText = service.pickupWindow ?? service.availability;
  const facts = [pickupText ? `${tProduct("pickup")} ${pickupText}` : null, t("factsCancellation")].filter(
    (fact): fact is string => Boolean(fact),
  );

  const tagText = service.durationHours
    ? `${service.durationHours} ${t("hoursLabel")}`
    : t("serviceItem");

  return (
    <article className="group h-full overflow-hidden rounded-md bg-surface shadow-card transition-transform duration-200 hover:-translate-y-1">
      <Link
        href={{ pathname: "/[slug]", params: { slug: service.slug } }}
        className="flex h-full flex-col"
        aria-label={service.title}
      >
        <div className="relative aspect-[3/2] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element -- static placeholder photos, no optimizer needed */}
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-3">
            <Tag>{tagText}</Tag>
          </div>
          <h3 className="mt-4 mb-2 line-clamp-2 min-h-[3.4rem] font-serif text-xl leading-tight text-ink">
            {service.title}
          </h3>
          <p className="line-clamp-3 min-h-[3.6rem] text-sm text-ink-muted">{service.summary}</p>
          <div className="mt-auto border-t border-line pt-3 text-sm text-ink-muted">
            {facts.map((fact, index) => (
              <span key={fact}>
                {index > 0 ? (
                  <span aria-hidden="true" className="mx-1">
                    ·
                  </span>
                ) : null}
                {fact}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <strong className="text-base text-ink">
              {price.amount} €{" "}
              <small className="font-normal text-ink-muted">/ {unitLabel}</small>
            </strong>
            <span className="text-sm font-semibold text-accent-strong">
              {t("viewTrip")}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold uppercase text-ink">
      {children}
    </span>
  );
}
