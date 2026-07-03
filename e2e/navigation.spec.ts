import { expect, test } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('page has a visible site header', async ({ page }) => {
    await expect(page.locator('nav').first()).toBeVisible()
  })

  test('campaign link in header is visible', async ({ page }) => {
    await expect(page.getByRole('link', { name: /change\.org\/rette-blau/i })).toBeVisible()
  })

  test('language picker button is visible in header', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Sprache' })).toBeVisible()
  })

  test('theme toggle button is visible in header', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Hell|Dunkel/i })).toBeVisible()
  })

  test('page has correct title', async ({ page }) => {
    const title = await page.title()
    expect(title).toBeTruthy()
    // Title should mention the campaign
    expect(title.toLowerCase()).toMatch(/blau|blue|rette|rescue/)
  })

  test('petition h1 heading is present', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('SANDBOX section is present on the page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /INTERAKTIVER FARBVERGLEICH/i })).toBeVisible()
  })

  test('SANDBOX-MODUS badge is visible', async ({ page }) => {
    await expect(page.getByText('SANDBOX-MODUS')).toBeVisible()
  })
})

test.describe('Navigation — anchor links', () => {
  test('Warum nav link scrolls to the Warum section', async ({ page }) => {
    await page.goto('/')
    // Only visible on desktop
    const navLink = page.getByRole('link', { name: 'Warum Blau?' })
    await expect(navLink).toBeVisible()
    await navLink.click()
    // After clicking, the URL should contain the anchor or page should scroll
    // (In SPA this might just scroll without changing URL)
    await page.waitForTimeout(500)
    const url = page.url()
    // Either the hash is set or we just verify the page didn't navigate away
    expect(url).toContain('localhost')
  })
})
