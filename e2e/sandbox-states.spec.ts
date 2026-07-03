import { expect, test } from '@playwright/test'

test.describe('Sandbox state machine', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Scroll to the sandbox section
    await page.getByRole('heading', { name: /INTERAKTIVER FARBVERGLEICH/i }).scrollIntoViewIfNeeded()
  })

  test('page loads with default state — German language', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Blau retten/i, level: 1 })).toBeVisible()
    // Default AfD bar label
    await expect(page.getByRole('button', { name: 'Jetzt umfärben auf Braun' })).toBeVisible()
  })

  test('clicking cycle-mode button advances to brown (Warnung) state', async ({ page }) => {
    // Use the desktop toolbar button (first)
    await page.getByRole('button', { name: 'Visualisierungs-Option wechseln' }).first().click()
    await expect(page.getByRole('button', { name: 'Beste Zukunft visualisieren' })).toBeVisible()
  })

  test('clicking cycle-mode button twice advances to dream (Traum) state', async ({ page }) => {
    const btn = page.getByRole('button', { name: 'Visualisierungs-Option wechseln' }).first()
    await btn.click()
    await btn.click()
    await expect(page.getByRole('button', { name: 'Traum beenden' })).toBeVisible()
  })

  test('dream state shows the Zukunftsvision banner', async ({ page }) => {
    const btn = page.getByRole('button', { name: 'Visualisierungs-Option wechseln' }).first()
    await btn.click()
    await btn.click()
    await expect(page.getByText(/ZUKUNFTSVISION/i)).toBeVisible()
  })

  test('dream state banner disappears when returning to default', async ({ page }) => {
    const btn = page.getByRole('button', { name: 'Visualisierungs-Option wechseln' }).first()
    await btn.click()
    await btn.click()
    await btn.click()
    await expect(page.getByText(/ZUKUNFTSVISION/i)).not.toBeVisible()
  })

  test('clicking cycle-mode button three times returns to default state', async ({ page }) => {
    const btn = page.getByRole('button', { name: 'Visualisierungs-Option wechseln' }).first()
    await btn.click()
    await btn.click()
    await btn.click()
    await expect(page.getByRole('button', { name: 'Jetzt umfärben auf Braun' })).toBeVisible()
  })

  test('toolbar mode status label updates as state changes', async ({ page }) => {
    // Initial state: Standard
    await expect(page.getByText('Standard').first()).toBeVisible()
    const btn = page.getByRole('button', { name: 'Visualisierungs-Option wechseln' }).first()
    await btn.click()
    await expect(page.getByText('Warnung').first()).toBeVisible()
    await btn.click()
    await expect(page.getByText('Traum').first()).toBeVisible()
  })
})
