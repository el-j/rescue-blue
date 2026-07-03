import { expect, test } from '@playwright/test'

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('page has exactly one h1 heading', async ({ page }) => {
    const h1s = page.getByRole('heading', { level: 1 })
    await expect(h1s).toHaveCount(1)
  })

  test('all interactive buttons are keyboard focusable', async ({ page }) => {
    // Tab to the first button and check focus is visible
    await page.keyboard.press('Tab')
    const focused = page.locator(':focus')
    await expect(focused).toBeVisible()
  })

  test('language picker button has aria-label', async ({ page }) => {
    const langBtn = page.getByRole('button', { name: 'Sprache' })
    await expect(langBtn).toBeVisible()
    const ariaLabel = await langBtn.getAttribute('aria-label')
    expect(ariaLabel).toBeTruthy()
  })

  test('theme toggle button has aria-label', async ({ page }) => {
    const themeBtn = page.getByRole('button', { name: /Hell|Dunkel/i })
    const ariaLabel = await themeBtn.getAttribute('aria-label')
    expect(ariaLabel).toBeTruthy()
  })

  test('the SANDBOX-MODUS toolbar buttons have title attributes', async ({ page }) => {
    await page.getByRole('heading', { name: /INTERAKTIVER FARBVERGLEICH/i }).scrollIntoViewIfNeeded()
    const cycleBtn = page.getByRole('button', { name: 'Visualisierungs-Option wechseln' }).first()
    await expect(cycleBtn).toBeVisible()
    const title = await cycleBtn.getAttribute('title')
    expect(title).toBeTruthy()
  })

  test('the comparison toolbar button has a title attribute', async ({ page }) => {
    await page.getByRole('heading', { name: /INTERAKTIVER FARBVERGLEICH/i }).scrollIntoViewIfNeeded()
    const compBtn = page.getByRole('button', { name: 'Mehrheit umschalten' }).first()
    await expect(compBtn).toBeVisible()
    const title = await compBtn.getAttribute('title')
    expect(title).toBeTruthy()
  })

  test('the Germany map dropdown has an accessible combobox role', async ({ page }) => {
    await page.getByRole('heading', { name: /INTERAKTIVER FARBVERGLEICH/i }).scrollIntoViewIfNeeded()
    await expect(page.getByRole('combobox')).toBeVisible()
  })

  test('FAQ section uses button elements (keyboard accessible)', async ({ page }) => {
    await page.getByRole('heading', { name: 'FAQ', exact: true }).scrollIntoViewIfNeeded()
    const firstFaq = page.getByRole('button', { name: /Warum sollte Blau überhaupt problematisch sein/i })
    await expect(firstFaq).toBeVisible()
    // Press Enter to activate
    await firstFaq.focus()
    await page.keyboard.press('Enter')
    await expect(page.getByText(/Blau ist die Selbstwahlfarbe der AfD/i)).toBeVisible()
  })

  test('page has a lang attribute on the html element', async ({ page }) => {
    const lang = await page.evaluate(() => document.documentElement.lang)
    expect(lang).toBeTruthy()
  })
})
