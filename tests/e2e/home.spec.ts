import { expect, test } from "@playwright/test";

test("home page renders with a single h1 and a working mobile navigation", async ({
  page,
}) => {
  await page.goto("/en");

  await expect(page.locator("h1")).toHaveCount(1);

  // The v2 design hides the desktop nav at 375px behind the menu toggle, so
  // open it and prove the navigation (and its links) become reachable.
  const menuButton = page.getByRole("button", { name: /menu/i });
  await expect(menuButton).toBeVisible();
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("navigation", { name: /main navigation/i })).toBeVisible();
  await expect(page.getByRole("link", { name: "Excursions", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Transfers", exact: true })).toBeVisible();
});

test("the French home renders localized copy", async ({ page }) => {
  await page.goto("/fr");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
});
