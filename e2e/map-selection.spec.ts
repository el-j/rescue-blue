import { expect, test } from '@playwright/test'

test.describe('Germany Map state selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByRole('heading', { name: /INTERAKTIVER FARBVERGLEICH/i }).scrollIntoViewIfNeeded()
    // Wait for dynamic options to load
    await page.getByRole('combobox').locator('option').filter({ hasText: /Thüringen/i }).waitFor({ state: 'attached' })
  })

  test('map dropdown shows Bund (Deutschland) by default', async ({ page }) => {
    const select = page.getByRole('combobox')
    await expect(select).toBeVisible()
    await expect(select).toHaveValue('0')
  })

  test('map dropdown contains state options', async ({ page }) => {
    const select = page.getByRole('combobox')
    const options = await select.locator('option').count()
    // Should have at least 17 options (1 federal + 16 states)
    expect(options).toBeGreaterThanOrEqual(17)
  })

  test('selecting a state updates the dropdown value', async ({ page }) => {
    const select = page.getByRole('combobox')
    const thuringenValue = await select.locator('option').filter({ hasText: /Thüringen/i }).getAttribute('value')
    await select.selectOption({ value: thuringenValue! })
    const value = await select.inputValue()
    expect(value).toBe(thuringenValue)
  })

  test('selecting the same state again deselects it (returns to Bund)', async ({ page }) => {
    const select = page.getByRole('combobox')
    const thuringenValue = await select.locator('option').filter({ hasText: /Thüringen/i }).getAttribute('value')
    // Select Thüringen
    await select.selectOption({ value: thuringenValue! })
    // Select again to deselect
    await select.selectOption({ value: thuringenValue! })
    await expect(select).toHaveValue('0')
  })

  test('federal dropdown shows a percentage in the label', async ({ page }) => {
    const select = page.getByRole('combobox')
    const firstOption = select.locator('option').first()
    const text = await firstOption.textContent()
    expect(text).toMatch(/%/)
  })

  test('map SVG is rendered', async ({ page }) => {
    const svg = page.locator('svg').first()
    await expect(svg).toBeVisible()
  })
})
