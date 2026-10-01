import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("Home page", () => {
  it("renders a single level-one heading", () => {
    render(<Home />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { level: 1, name: /agadir tours, excursions and transfers/i }),
    ).toBeInTheDocument();
  });

  it("exposes exactly one main landmark", () => {
    render(<Home />);

    expect(screen.getAllByRole("main")).toHaveLength(1);
  });
});
