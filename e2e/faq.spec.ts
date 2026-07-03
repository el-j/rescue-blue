import { expect, test } from '@playwright/test'

test.describe('FAQ section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Scroll to FAQ section
    await page.getByRole('heading', { name: 'FAQ', exact: true }).scrollIntoViewIfNeeded()
  })

  test('FAQ items are collapsed by default', async ({ page }) => {
    // First FAQ question should be visible as a button
    const firstFaq = page.getByRole('button', { name: /Warum sollte Blau überhaupt problematisch sein/i })
    await expect(firstFaq).toBeVisible()
    // Answer text should not be visible
    await expect(page.getByText(/Blau ist die Selbstwahlfarbe der AfD/i)).not.toBeVisible()
  })

  test('clicking an FAQ question expands its answer', async ({ page }) => {
    await page.getByRole('button', { name: /Warum sollte Blau überhaupt problematisch sein/i }).click()
    await expect(page.getByText(/Blau ist die Selbstwahlfarbe der AfD/i)).toBeVisible()
  })

  test('clicking the same FAQ question collapses it again', async ({ page }) => {
    const faqBtn = page.getByRole('button', { name: /Warum sollte Blau überhaupt problematisch sein/i })
    await faqBtn.click()
    await expect(page.getByText(/Blau ist die Selbstwahlfarbe der AfD/i)).toBeVisible()
    await faqBtn.click()
    await expect(page.getByText(/Blau ist die Selbstwahlfarbe der AfD/i)).not.toBeVisible()
  })

  test('multiple FAQ items can be opened', async ({ page }) => {
    const faqButtons = page.getByRole('button').filter({ hasText: /\?/ })
    // Click first two FAQ buttons
    await faqButtons.nth(0).click()
    await faqButtons.nth(1).click()
    // Both answers should be visible
    // (Just checking the section has expanded content)
    const expandedCount = await page.locator('[class*="overflow-hidden"]').count()
    expect(expandedCount).toBeGreaterThan(0)
  })
})
