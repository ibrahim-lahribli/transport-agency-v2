import { expect, test } from "@playwright/test";

test("a variant service exposes its options and re-quotes on selection", async ({ page }) => {
  await page.goto("/en/book?service=quad-buggy-forest");

  // The base option (single rider, 35 €) times two adults.
  await expect(page.getByTestId("quote-total")).toHaveText("70 €");

  const optionSelect = page.locator("#optionLabel");
  await expect(optionSelect).toBeVisible();
  await optionSelect.selectOption("Buggy, 2 seats");

  // A buggy is priced per unit, not per person.
  await expect(page.getByTestId("quote-total")).toHaveText("80 €");
});

test("a transfer exposes its route and vehicle, and re-quotes on selection", async ({ page }) => {
  await page.goto("/en/book?service=airport-agadir");

  // Route 0 to the city centre, sedan for a party of 2 (automatic vehicle).
  await expect(page.getByTestId("quote-total")).toHaveText("20 €");

  await page.locator("#routeIndex").selectOption("1"); // AGA -> Anza
  await expect(page.getByTestId("quote-total")).toHaveText("25 €");

  await page.locator("#vehicle").selectOption("minibus");
  await expect(page.getByTestId("quote-total")).toHaveText("55 €");
});

test("tiered services collect a party, not a variant or route", async ({ page }) => {
  await page.goto("/en/book?service=boat-cruise");
  await expect(page.locator("#optionLabel")).toHaveCount(0);
  await expect(page.locator("#routeIndex")).toHaveCount(0);
  await expect(page.getByTestId("quote-total")).toHaveText("70 €");
});

test("invalid input surfaces a localized, per-field error", async ({ page }) => {
  await page.goto("/en/book");
  await page.locator("#name").fill("A"); // too short for the server rule
  await page.locator("#email").fill("ada@example.com");
  await page.locator("#phone").fill("0612345678");
  await page.getByRole("button", { name: /submit booking inquiry/i }).click();

  await expect(page.getByText("Please enter your full name.")).toBeVisible();
  await expect(page.locator("#name")).toHaveAttribute("aria-invalid", "true");
});

test("a validation error preserves the visitor's input and selection", async ({ page }) => {
  await page.goto("/en/book?service=quad-buggy-forest");
  await page.locator("#optionLabel").selectOption("Buggy, 2 seats");
  await page.locator("#name").fill("A"); // too short for the server rule
  await page.locator("#email").fill("ada@example.com");
  await page.locator("#phone").fill("0612345678");
  await page.getByRole("button", { name: /submit booking inquiry/i }).click();
  await expect(page.getByText("Please enter your full name.")).toBeVisible();

  // React resets a form after its action: the fix must re-apply the visitor's
  // values, so the visible fields still agree with the 80 € quote and a resubmit
  // would send the chosen option rather than the default.
  await expect(page.locator("#optionLabel")).toHaveValue("Buggy, 2 seats");
  await expect(page.locator("#email")).toHaveValue("ada@example.com");
  await expect(page.getByTestId("quote-total")).toHaveText("80 €");
});

test("the French form localizes the same field errors", async ({ page }) => {
  await page.goto("/fr/book");
  await page.locator("#name").fill("A");
  await page.locator("#email").fill("ada@example.com");
  await page.locator("#phone").fill("0612345678");
  await page.getByRole("button", { name: /envoyer ma demande/i }).click();

  await expect(page.getByText("Veuillez saisir votre nom complet.")).toBeVisible();
});

test("a valid inquiry submits and the selection is accepted", async ({ page }) => {
  await page.goto("/en/book?service=quad-buggy-forest");
  await page.locator("#name").fill("Ada Lovelace");
  await page.locator("#email").fill("ada@example.com");
  await page.locator("#phone").fill("0612345678");
  await page.getByRole("button", { name: /submit booking inquiry/i }).click();

  await expect(page.getByText("Request received")).toBeVisible();
});
