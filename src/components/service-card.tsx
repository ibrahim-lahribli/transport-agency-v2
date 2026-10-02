import { getTranslations } from "next-intl/server";

import type { Service } from "@/schemas/service";
import { Link } from "@/i18n/routing";
import { getServiceDisplayPrice } from "@/seo/price";

export async function ServiceCard({
  service,
  locale,
}: {
  service: Service;
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: "common" });
  const price = getServiceDisplayPrice(service);

  return (
    <article className="flex flex-col justify-between rounded-lg border border-line bg-surface p-5 transition-colors hover:border-accent">
      <div>
        <span className="text-xs font-bold uppercase tracking-wide text-accent-strong">
          {service.durationHours
            ? `${service.durationHours} ${t("hoursLabel")}`
            : t("serviceItem")}
        </span>
        <h3 className="mt-1 text-base font-bold text-ink">
          <Link href={{ pathname: "/[slug]", params: { slug: service.slug } }} className="hover:text-accent-strong">
            {service.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-ink-muted">{service.summary}</p>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-sm">
        <span className="font-bold text-accent-strong">{price.formatted[locale as "en" | "fr"]}</span>
        <Link
          href={{ pathname: "/[slug]", params: { slug: service.slug } }}
          className="font-semibold text-accent-strong hover:underline"
        >
          {t("view")}
        </Link>
      </div>
    </article>
  );
}
