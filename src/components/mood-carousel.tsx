"use client";

import { useRef, useState } from "react";

import { Link } from "@/i18n/routing";

export type MoodItem = {
  title: string;
  href: "/excursions" | "/activities" | "/places";
  image: string;
};

/**
 * "Choose a mood" photo carousel (Sprint 5, Task 7): scroll-snap on mobile with
 * position dots that track and control the scroll position; a plain 5-up grid
 * from `lg` up where there is nothing to scroll. Dots are real buttons — no
 * fake affordances — and smooth scrolling is skipped when the visitor prefers
 * reduced motion.
 */
export function MoodCarousel({
  items,
  exploreLabel,
  dotsLabel,
}: {
  items: MoodItem[];
  exploreLabel: string;
  dotsLabel: string;
}) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = (index: number) => {
    const el = scrollerRef.current;
    const target = el?.children[index];
    if (!(el && target instanceof HTMLElement)) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", inline: "start", block: "nearest" });
  };

  const trackActive = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const frame = el.getBoundingClientRect().left;
    let nearest = 0;
    let nearestDistance = Infinity;
    Array.from(el.children).forEach((child, index) => {
      if (!(child instanceof HTMLElement)) return;
      const distance = Math.abs(child.getBoundingClientRect().left - frame);
      if (distance < nearestDistance) {
        nearest = index;
        nearestDistance = distance;
      }
    });
    setActive((current) => (current === nearest ? current : nearest));
  };

  return (
    <div>
      <ul
        ref={scrollerRef}
        onScroll={trackActive}
        className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0"
      >
        {items.map((item) => (
          <li
            key={item.title}
            className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-auto"
          >
            <Link
              href={item.href}
              className="group relative block aspect-[3/4] overflow-hidden rounded-md"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- local artwork slots, no optimizer needed */}
              <img
                src={item.image}
                alt=""
                className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-[1.03]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
                <h3 className="text-xl text-canvas">{item.title}</h3>
                <span className="shrink-0 text-sm font-semibold text-canvas">
                  {exploreLabel}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-center gap-1 lg:hidden" role="group" aria-label={dotsLabel}>
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            aria-label={item.title}
            aria-current={active === index ? "true" : undefined}
            onClick={() => scrollToIndex(index)}
            className="grid min-h-11 w-8 place-items-center"
          >
            <span
              className={`block size-2.5 rounded-full transition-colors ${
                active === index ? "bg-accent" : "bg-line"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
