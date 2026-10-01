import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/[locale]/page";

describe("Localized Home page", () => {
  it("renders a single level-one heading in English", async () => {
    const ui = await HomePage({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { level: 1, name: /agadir tours, excursions and transfers/i }),
    ).toBeInTheDocument();
  });

  it("renders a single level-one heading in French", async () => {
    const ui = await HomePage({ params: Promise.resolve({ locale: "fr" }) });
    render(ui);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { level: 1, name: /tours, excursions et transferts à agadir/i }),
    ).toBeInTheDocument();
  });
});
