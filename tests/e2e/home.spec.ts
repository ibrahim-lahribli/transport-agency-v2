import { expect, test } from "@playwright/test";

test("home page renders with a single h1 and the main navigation", async ({ page }) => {
  await page.goto("/en");

  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByRole("navigation", { name: /main navigation/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /excursions/i }).first()).toBeVisible();
});

test("the French home renders localized copy", async ({ page }) => {
  await page.goto("/fr");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
});
