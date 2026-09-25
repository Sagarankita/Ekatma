import { expect, test, type Page } from '@playwright/test'

const selectedBusinessKey = 'entrepreneur_selected_business_id'

test.beforeEach(async ({ page }) => {
  await page.goto('/entrepreneur/login')
  await page.evaluate(key => {
    sessionStorage.setItem('entrepreneur_demo_auth', 'true')
    sessionStorage.removeItem(key)
  }, selectedBusinessKey)
})

async function expectCurrentBusiness(page: Page, id: string, name: string) {
  const shell = page.locator('aside[aria-label="Entrepreneur navigation"]')
  await expect(shell.getByText(name, { exact: true })).toBeVisible()
  await expect.poll(() => page.evaluate(key => sessionStorage.getItem(key), selectedBusinessKey)).toBe(id)
}

test('Regulatory Assistant preserves BP-002 and subsequent business navigation uses it', async ({ page }) => {
  await page.goto('/entrepreneur/businesses/BP-002')
  await expectCurrentBusiness(page, 'BP-002', 'Konkan Feeds')

  const nav = page.getByRole('navigation', { name: 'Main navigation' })
  await nav.getByRole('link', { name: 'Regulatory Assistant' }).click()
  await expect(page).toHaveURL(/\/entrepreneur\/assistant$/)
  await expectCurrentBusiness(page, 'BP-002', 'Konkan Feeds')

  await page.getByRole('button', { name: 'Close Regulatory Assistant' }).click()
  await nav.getByRole('link', { name: 'Compliance' }).click()
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-002\/compliance$/)
})

test('the header Notifications action preserves BP-002', async ({ page }) => {
  await page.goto('/entrepreneur/businesses/BP-002')
  await expectCurrentBusiness(page, 'BP-002', 'Konkan Feeds')

  await page.getByRole('button', { name: /Notifications/ }).click()
  await expect(page).toHaveURL(/\/entrepreneur\/notifications$/)
  await expectCurrentBusiness(page, 'BP-002', 'Konkan Feeds')
})

test('explicit switching to BP-004 updates global-page context', async ({ page }) => {
  await page.goto('/entrepreneur/businesses/BP-002')
  await expectCurrentBusiness(page, 'BP-002', 'Konkan Feeds')

  await page.getByRole('button', { name: 'Switch Business' }).click()
  await page.getByRole('button', { name: /Sahyadri Bio-Pharma Pvt Ltd/ }).click()
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004$/)
  await expectCurrentBusiness(page, 'BP-004', 'Sahyadri Bio-Pharma Pvt Ltd')

  await page.getByRole('button', { name: 'Help' }).click()
  await expect(page).toHaveURL(/\/entrepreneur\/assistant$/)
  await expectCurrentBusiness(page, 'BP-004', 'Sahyadri Bio-Pharma Pvt Ltd')
})

test('visiting My Businesses does not erase BP-002 before global navigation', async ({ page }) => {
  await page.goto('/entrepreneur/businesses/BP-002')
  const nav = page.getByRole('navigation', { name: 'Main navigation' })

  await nav.getByRole('link', { name: 'My Businesses' }).click()
  await expect(page).toHaveURL(/\/entrepreneur\/businesses$/)
  await expectCurrentBusiness(page, 'BP-002', 'Konkan Feeds')

  await nav.getByRole('link', { name: 'Notifications' }).click()
  await expect(page).toHaveURL(/\/entrepreneur\/notifications$/)
  await expectCurrentBusiness(page, 'BP-002', 'Konkan Feeds')
})

test('refreshing Regulatory Assistant restores BP-002 from session storage', async ({ page }) => {
  await page.goto('/entrepreneur/businesses/BP-002')
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Regulatory Assistant' }).click()
  await expect(page).toHaveURL(/\/entrepreneur\/assistant$/)
  await expectCurrentBusiness(page, 'BP-002', 'Konkan Feeds')

  await page.reload()
  await expect(page.getByRole('heading', { name: 'Regulatory Assistant', level: 1 })).toBeVisible()
  await expectCurrentBusiness(page, 'BP-002', 'Konkan Feeds')
})

test('an invalid remembered ID is discarded and safe fallback navigation remains available', async ({ page }) => {
  await page.evaluate(key => sessionStorage.setItem(key, 'BP-999'), selectedBusinessKey)
  await page.goto('/entrepreneur/assistant')

  await expect(page.getByRole('heading', { name: 'Regulatory Assistant', level: 1 })).toBeVisible()
  await expect(page.locator('aside[aria-label="Entrepreneur navigation"]').getByText('All Businesses', { exact: true })).toBeVisible()
  await expect.poll(() => page.evaluate(key => sessionStorage.getItem(key), selectedBusinessKey)).toBeNull()
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Overview' })).toHaveAttribute('href', '/entrepreneur/businesses/BP-001')
})

test('a valid URL business overrides and replaces the remembered business', async ({ page }) => {
  await page.evaluate(key => sessionStorage.setItem(key, 'BP-002'), selectedBusinessKey)
  await page.goto('/entrepreneur/businesses/BP-004')

  await expectCurrentBusiness(page, 'BP-004', 'Sahyadri Bio-Pharma Pvt Ltd')
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Regulatory Assistant' }).click()
  await expectCurrentBusiness(page, 'BP-004', 'Sahyadri Bio-Pharma Pvt Ltd')
})
