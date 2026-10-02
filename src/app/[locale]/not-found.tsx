import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/routing";

export default async function LocaleNotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <p className="text-sm font-bold uppercase tracking-wide text-accent-strong">{t("code")}</p>
      <h1 className="mt-3 text-3xl font-extrabold text-ink">{t("title")}</h1>
      <p className="mt-4 text-ink-muted">{t("body")}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent hover:bg-accent-strong"
        >
          {t("backHome")}
        </Link>
        <Link
          href="/excursions"
          className="inline-flex min-h-[44px] items-center rounded-md border border-line px-5 py-2.5 text-sm font-semibold text-ink hover:border-accent hover:text-accent-strong"
        >
          {t("viewExcursions")}
        </Link>
      </div>
    </div>
  );
}
