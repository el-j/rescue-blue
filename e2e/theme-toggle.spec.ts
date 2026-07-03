import { expect, test } from '@playwright/test'

test.describe('Theme toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('default theme is dark (no light-theme class)', async ({ page }) => {
    const htmlClass = await page.evaluate(() => document.documentElement.className)
    expect(htmlClass).not.toContain('light-theme')
  })

  test('clicking theme button switches to light mode', async ({ page }) => {
    await page.getByRole('button', { name: /Hell/i }).click()
    const htmlClass = await page.evaluate(() => document.documentElement.className)
    expect(htmlClass).toContain('light-theme')
  })

  test('clicking theme button twice returns to dark mode', async ({ page }) => {
    await page.getByRole('button', { name: /Hell/i }).click()
    await page.getByRole('button', { name: /Dunkel/i }).click()
    const htmlClass = await page.evaluate(() => document.documentElement.className)
    expect(htmlClass).not.toContain('light-theme')
  })

  test('theme preference persists on reload', async ({ page }) => {
    await page.getByRole('button', { name: /Hell/i }).click()
    await page.reload()
    const htmlClass = await page.evaluate(() => document.documentElement.className)
    expect(htmlClass).toContain('light-theme')
  })

  test('light mode theme is stored in localStorage', async ({ page }) => {
    await page.getByRole('button', { name: /Hell/i }).click()
    const theme = await page.evaluate(() => localStorage.getItem('rescue-blue-theme'))
    expect(theme).toBe('light')
  })

  test('dark mode theme is stored in localStorage', async ({ page }) => {
    await page.getByRole('button', { name: /Hell/i }).click()
    await page.getByRole('button', { name: /Dunkel/i }).click()
    const theme = await page.evaluate(() => localStorage.getItem('rescue-blue-theme'))
    expect(theme).toBe('dark')
  })
})
