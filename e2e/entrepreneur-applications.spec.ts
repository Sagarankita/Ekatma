import { expect, test } from '@playwright/test';

async function login(page: import('@playwright/test').Page) {
  await page.goto('/entrepreneur/login');
  await page.getByPlaceholder('Enter your email ID').fill('demo@example.com');
  await page.getByPlaceholder('Enter your password').fill('demo');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses$/);
}

test.describe('Application business identity', () => {
  test.beforeEach(async ({ page }) => login(page));

  test('BP-001 tracker links only its own application IDs, with refresh and history', async ({ page }) => {
    await page.goto('/entrepreneur/businesses/BP-001');
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    await nav.getByRole('link', { name: 'Applications' }).click();
    await expect(page).toHaveURL('/entrepreneur/businesses/BP-001/applications');
    await expect(nav.getByRole('link', { name: 'Applications' })).toHaveAttribute('aria-current', 'page');
    await expect(page.getByRole('link', { name: 'APP-MPCB-2026-4892' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'APP-FAC-2026-3371' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'APP-MIDC-2026-1190' })).toBeVisible();
    await expect(page.getByText('APP-2026-MPCB-00412')).not.toBeVisible();
    await expect(page.getByRole('button', { name: '+ New Application' })).toBeDisabled();

    await page.getByRole('link', { name: 'APP-MPCB-2026-4892' }).click();
    await expect(page).toHaveURL('/entrepreneur/businesses/BP-001/applications/APP-MPCB-2026-4892');
    await expect(page.getByText('Application ID: APP-MPCB-2026-4892')).toBeVisible();
    await page.reload();
    await expect(page.getByText('Application ID: APP-MPCB-2026-4892')).toBeVisible();
    await page.goBack();
    await expect(page).toHaveURL('/entrepreneur/businesses/BP-001/applications');
    await page.goForward();
    await expect(page).toHaveURL('/entrepreneur/businesses/BP-001/applications/APP-MPCB-2026-4892');
    await expect(page.locator('header[role="banner"]')).toHaveCount(1);
  });

  test('BP-002 shows no application from BP-001 or the unbound fixture', async ({ page }) => {
    await page.goto('/entrepreneur/businesses/BP-002/applications');
    await expect(page.locator('h1')).toContainText('Application Tracker');
    await expect(page.getByText('APP-MPCB-2026-4892')).not.toBeVisible();
    await expect(page.getByText('APP-2026-MPCB-00412')).not.toBeVisible();
    await expect(page.getByText('No applications match the current filters.')).toBeVisible();
  });

  test('Unbound application and child IDs cannot be requested beneath BP-001', async ({ page }) => {
    for (const path of [
      'applications/APP-2026-MPCB-00412',
      'applications/APP-2026-MPCB-00412/queries/QRY-001',
      'applications/APP-2026-MPCB-00412/resubmissions/APP-2026-MPCB-00412-R2',
      'applications/APP-2026-MPCB-00412/decisions/DEC-2026-MPCB-00412',
      'applications/APP-MPCB-2026-4892/queries/QRY-001',
      'applications/app-mpcb-cte',
      'applications/APP-NONEXISTENT-999',
    ]) {
      await page.goto(`/entrepreneur/businesses/BP-001/${path}`);
      await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible();
    }
  });

  test('Sahyadri intake and inspections stay unavailable until bound to a real business', async ({ page }) => {
    for (const path of [
      'applications/new',
      'applications/new/prevalidation',
      'applications/new/consistency',
      'applications/new/submission',
      'inspections/INS-001',
      'inspections/INS-002',
    ]) {
      await page.goto(`/entrepreneur/businesses/BP-001/${path}`);
      await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible();
    }
    await page.goto('/entrepreneur/businesses/BP-001/inspections');
    await expect(page.locator('h1')).toContainText('Inspection Centre');
    await expect(page.getByText('INS-001')).not.toBeVisible();
  });
});
