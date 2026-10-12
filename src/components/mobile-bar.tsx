"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

/**
 * Sticky mobile submit bar (design's `.mobile-bar--booking`). Shows the live
 * estimated total and submits the visible form.
 *
 * Visibility is driven by watching the booking form's intro leave the
 * viewport (IntersectionObserver). The class is applied by direct DOM write
 * rather than setState so no effect ever triggers a render — ESLint forbids
 * setState-in-effect and a render actually remounts the form (React 19 resets
 * it after each action), so we deliberately keep this outside React state.
 */
export function MobileBar({
  introRef,
  formId,
  totalEur,
}: {
  introRef: React.RefObject<HTMLElement | null>;
  /** The form's id attribute so the button submits the visible form. */
  formId: string;
  totalEur: number | null;
}) {
  const t = useTranslations("book");
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intro = introRef.current;
    const bar = barRef.current;
    if (!intro || !bar) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        bar.classList.toggle("mobile-bar--visible", !entry.isIntersecting);
      },
      { threshold: 0.05 },
    );
    observer.observe(intro);
    return () => observer.disconnect();
  }, [introRef]);

  return (
    <div ref={barRef} className="mobile-bar mobile-bar--booking">
      <div>
        <small>{t("barEstimate")}</small>
        <strong data-testid="bar-estimate">{totalEur !== null ? `${totalEur} €` : "—"}</strong>
        <em>{t("barNote")}</em>
      </div>
      <button type="submit" form={formId}>
        {t("submit")}
      </button>
    </div>
  );
}
