import { expect, test } from '@playwright/test';

async function login(page: import('@playwright/test').Page) {
  await page.goto('/entrepreneur/login');
  await page.getByPlaceholder('Enter your email ID').fill('demo@example.com');
  await page.getByPlaceholder('Enter your password').fill('demo');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses$/);
}

test('Unbound Sahyadri dossier and journey are not shown as BP-001 data', async ({ page }) => {
  await login(page);
  await page.goto('/entrepreneur/businesses/BP-001');
  await expect(page.getByRole('heading', { name: 'ABC Pharma Pvt Ltd' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Project Dossier' })).toBeDisabled();
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('button', { name: 'Regulatory Journey' })).toBeDisabled();
  await expect(page.locator('header[role="banner"]')).toHaveCount(1);
  await expect(page.locator('footer[role="contentinfo"]')).toHaveCount(1);

  for (const path of ['dossier', 'dossier/provenance?field=Plot%20Area', 'journey']) {
    await page.goto(`/entrepreneur/businesses/BP-001/${path}`);
    await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible();
    await expect(page.getByText('Sahyadri Bio-Pharma Pvt Ltd')).not.toBeVisible();
  }
});

test('Unknown business still returns not found', async ({ page }) => {
  await login(page);
  await page.goto('/entrepreneur/businesses/BP-999/journey');
  await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible();
});
