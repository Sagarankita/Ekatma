import { expect, test } from '@playwright/test';

async function login(page: import('@playwright/test').Page) {
  await page.goto('/entrepreneur/login');
  await page.getByPlaceholder('Enter your email ID').fill('demo@example.com');
  await page.getByPlaceholder('Enter your password').fill('demo');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses$/);
}

test('login opens canonical My Businesses with one shell and active Business navigation', async ({ page }) => {
  await login(page);
  await expect(page.getByRole('heading', { name: 'My Businesses' })).toBeVisible();
  await expect(page.locator('header[role="banner"]')).toHaveCount(1);
  await expect(page.locator('footer[role="contentinfo"]')).toHaveCount(1);
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'My Businesses' })).toHaveAttribute('aria-current', 'page');
  // Applications navigation link is now always available
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Applications' })).toBeVisible();
});

test('authenticated portfolio routes return guests to Entrepreneur login', async ({ page }) => {
  await page.goto('/entrepreneur/businesses');
  await expect(page).toHaveURL(/\/entrepreneur\/login$/);
  await page.goto('/entrepreneur/businesses/BP-002');
  await expect(page).toHaveURL(/\/entrepreneur\/login$/);
});

for (const [id, name] of [
  ['BP-001', 'ABC Pharma Pvt Ltd'],
  ['BP-002', 'Konkan Feeds'],
  ['BP-003', 'Sahyadri Electronics Pvt Ltd'],
  ['BP-004', 'Sahyadri Bio-Pharma Pvt Ltd'],
] as const) {
  test(`opening ${name} preserves its ${id} identity through refresh and history`, async ({ page }) => {
    await login(page);
    await page.getByRole('button', { name: `Open business: ${name}` }).click();
    await expect(page).toHaveURL(new RegExp(`/entrepreneur/businesses/${id}$`));
    await expect(page.getByRole('heading', { name })).toBeVisible();
    await expect(page.locator('header[role="banner"]')).toHaveCount(1);
    await page.reload();
    await expect(page.getByRole('heading', { name })).toBeVisible();
    await page.goBack();
    await expect(page).toHaveURL(/\/entrepreneur\/businesses$/);
    await page.goForward();
    await expect(page).toHaveURL(new RegExp(`/entrepreneur/businesses/${id}$`));
  });
}

test('business switcher uses the selected canonical BP identity', async ({ page }) => {
  await login(page);
  await page.getByRole('button', { name: 'Open business: ABC Pharma Pvt Ltd' }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-001$/);
  await page.getByRole('button', { name: 'Switch Business' }).click();
  await page.getByRole('button', { name: /Konkan Feeds/ }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-002$/);
  await expect(page.getByRole('heading', { name: 'Konkan Feeds' })).toBeVisible();
});

test('unknown and legacy aliases cannot masquerade as canonical businesses', async ({ page }) => {
  await login(page);
  for (const id of ['BP-999', 'abc-pharma', 'pune-auto']) {
    await page.goto(`/entrepreneur/businesses/${id}`);
    await expect(page.getByRole('heading', { name: 'Business not found' })).toBeVisible();
    await expect(page.getByText('ABC Pharma Pvt Ltd')).toHaveCount(0);
  }
});
