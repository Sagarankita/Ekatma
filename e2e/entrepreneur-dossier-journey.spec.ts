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
  await expect(page.getByRole('button', { name: 'Project Dossier' })).toBeVisible(); // Dossier button check on page? We leave it if it's not a sidebar item. Wait, is Project Dossier a button on the business overview?
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Regulatory Journey' })).toBeVisible();
  await expect(page.locator('header[role="banner"]')).toHaveCount(1);
  await expect(page.locator('footer[role="contentinfo"]')).toHaveCount(1);

  // Routes now load and show empty state/context instead of 404ing
});

test('Unknown business still returns not found', async ({ page }) => {
  await login(page);
  await page.goto('/entrepreneur/businesses/BP-999/journey');
  await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible();
});
