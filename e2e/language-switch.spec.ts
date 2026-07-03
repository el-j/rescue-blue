import { expect, test } from '@playwright/test'

test.describe('Language switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('page loads in German by default', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Blau retten/i, level: 1 })).toBeVisible()
  })

  test('can switch to English via language picker', async ({ page }) => {
    await page.getByRole('button', { name: 'Sprache' }).click()
    await page.getByRole('button', { name: /en\s*English/i }).click()
    await expect(page.getByRole('heading', { name: 'Rescue Blue.', level: 1 })).toBeVisible()
  })

  test('English: toolbar buttons have English labels', async ({ page }) => {
    await page.getByRole('button', { name: 'Sprache' }).click()
    await page.getByRole('button', { name: /en\s*English/i }).click()
    await expect(page.getByRole('button', { name: 'Switch visualization mode' }).first()).toBeVisible()
    await expect(page.getByRole('button', { name: 'Toggle majority chart' }).first()).toBeVisible()
  })

  test('can switch to French', async ({ page }) => {
    await page.getByRole('button', { name: 'Sprache' }).click()
    await page.getByRole('button', { name: /fr\s*Français/i }).click()
    // French heading should appear
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    const heading = await page.getByRole('heading', { level: 1 }).textContent()
    expect(heading).not.toContain('Blau retten')
    expect(heading).not.toContain('Rescue Blue')
  })

  test('language selection persists on reload', async ({ page }) => {
    await page.getByRole('button', { name: 'Sprache' }).click()
    await page.getByRole('button', { name: /en\s*English/i }).click()
    await page.reload()
    await expect(page.getByRole('heading', { name: 'Rescue Blue.', level: 1 })).toBeVisible()
  })

  test('language picker dropdown closes after selection', async ({ page }) => {
    await page.getByRole('button', { name: 'Sprache' }).click()
    await page.getByRole('button', { name: /en\s*English/i }).click()
    // After clicking, the dropdown should be dismissed
    // The language dropdown button should not show all language options anymore
    await expect(page.getByRole('button', { name: /de\s*Deutsch/i })).not.toBeVisible()
  })
})
