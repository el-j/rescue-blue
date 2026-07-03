import { expect, test } from '@playwright/test'

test.describe('Comparison mode toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByRole('heading', { name: /INTERAKTIVER FARBVERGLEICH/i }).scrollIntoViewIfNeeded()
  })

  test('toggling comparison mode shows AfD vs. Alle Anderen chart', async ({ page }) => {
    await page.getByRole('button', { name: 'Mehrheit umschalten' }).first().click()
    await expect(page.getByText(/so viele Menschen wählen NICHT die AfD/i)).toBeVisible()
  })

  test('comparison mode shows a ratio number', async ({ page }) => {
    await page.getByRole('button', { name: 'Mehrheit umschalten' }).first().click()
    // Ratio should show something like "2.4× so viele..."
    await expect(page.getByText(/×\s*so viele Menschen/i)).toBeVisible()
  })

  test('toggling comparison mode off hides the ratio card', async ({ page }) => {
    const btn = page.getByRole('button', { name: 'Mehrheit umschalten' }).first()
    await btn.click()
    await btn.click()
    await expect(page.getByText(/so viele Menschen wählen NICHT die AfD/i)).not.toBeVisible()
  })

  test('comparison mode works in brown (Warnung) state too', async ({ page }) => {
    // Activate brown state
    await page.getByRole('button', { name: 'Visualisierungs-Option wechseln' }).first().click()
    // Then enable comparison
    await page.getByRole('button', { name: 'Mehrheit umschalten' }).first().click()
    await expect(page.getByText(/so viele Menschen wählen NICHT die AfD/i)).toBeVisible()
  })
})
