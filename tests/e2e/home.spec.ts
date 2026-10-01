import { expect, test } from "@playwright/test";

test("home page renders its primary heading", async ({ page }) => {
  await page.goto("/en");

  await expect(
    page.getByRole("heading", { level: 1, name: /agadir tours, excursions and transfers/i }),
  ).toBeVisible();
});
