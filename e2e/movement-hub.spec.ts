import { expect, test } from "@playwright/test";

test.describe("Rette Blau 2.0 Movement Hub Modules", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders Hero multi-CTA links to Street-Team, Toolkit, and Radar", async ({
    page,
  }) => {
    await expect(
      page.getByRole("link", { name: /Patches & Sticker holen/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Dialog- & Fakten-Toolkit/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Gemeinschaft vor Ort finden/i }),
    ).toBeVisible();
  });

  test("opens Street-Team OrderModal and validates input", async ({ page }) => {
    const streetSection = page.locator("#street-team");
    await streetSection.scrollIntoViewIfNeeded();
    await expect(streetSection).toBeVisible();

    await streetSection
      .getByRole("button", { name: /Paket auswählen & bestellen/i })
      .first()
      .click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await dialog.getByRole("button", { name: /Bestellung absenden/i }).click();
    await expect(dialog.getByRole("alert")).toBeVisible();

    await dialog.getByRole("button", { name: /Abbrechen/i }).click();
    await expect(dialog).not.toBeVisible();
  });

  test("filters Fact-Cards in Dialogue Toolkit and filters Solidarity Radar by state", async ({
    page,
  }) => {
    const toolkit = page.locator("#toolkit");
    await toolkit.scrollIntoViewIfNeeded();
    await expect(toolkit).toBeVisible();

    await toolkit.getByRole("button", { name: /Klima & Energie/i }).click();
    await expect(toolkit.getByText(/Fraunhofer-Institut/i)).toBeVisible();

    const radar = page.locator("#radar");
    await radar.scrollIntoViewIfNeeded();
    await expect(radar).toBeVisible();

    await radar.getByRole("button", { name: /TH · Thüringen/i }).click();
    await expect(radar.getByText(/ezra & MOBIT/i)).toBeVisible();
  });

  test("mobile view: opens and closes the mobile navigation drawer and has no horizontal overflow", async ({
    page,
    isMobile,
  }) => {
    if (!isMobile) {
      await page.setViewportSize({ width: 390, height: 844 });
    }

    const menuButton = page.getByRole("button", { name: /Menü öffnen/i });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    const drawer = page.locator("#mobile-navigation-drawer");
    await expect(drawer).toBeVisible();

    const toolkitLink = drawer.getByRole("link", { name: /Dialog-Toolkit/i });
    await expect(toolkitLink).toBeVisible();
    await toolkitLink.click();

    // Drawer closes after selecting a module link
    await expect(drawer).not.toBeVisible();

    // Check no horizontal page overflow on mobile viewport
    const hasOverflow = await page.evaluate(() => {
      return (
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth
      );
    });
    expect(hasOverflow).toBe(false);
  });
});
