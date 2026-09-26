import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/entrepreneur/login');
  await page.evaluate(() => sessionStorage.setItem('entrepreneur_demo_auth', 'true'));
});

test('canonical incentives landing and legacy aliases resolve to I01', async ({ page }) => {
  await page.goto('/entrepreneur/businesses/BP-004');
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Incentives' }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004\/incentives$/);
  await expect(page.getByRole('heading', { name: 'Incentives', exact: true })).toBeVisible();

  await page.goto('/entrepreneur/businesses/BP-004/incentives/centre');
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004\/incentives$/);

  await page.goto('/entrepreneur/businesses/BP-004/incentives/PSI-2019');
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004\/incentives\/portfolio\/PSI-2019$/);
});

test('I05A, I06 and I06A retain only the selected canonical legacy capabilities', async ({ page }) => {
  await page.goto('/entrepreneur/businesses/BP-004/incentives/portfolio/PSI-2019');
  await expect(page.getByText('Claim Cycle', { exact: true })).toBeVisible();
  await expect(page.getByText('Eligibility Conditions', { exact: true })).toBeVisible();

  await page.goto('/entrepreneur/businesses/BP-004/incentives/claim-readiness');
  await expect(page.getByText('Current Filing Window', { exact: true })).toBeVisible();

  await page.goto('/entrepreneur/businesses/BP-004/incentives/claims/CLM-2027-002');
  await expect(page.getByText('Correction Required', { exact: true }).last()).toBeVisible();
  await expect(page.getByText('Previous Claim Periods', { exact: true })).toBeVisible();
  await expect(page.getByText('Apr 2026 – Sep 2026')).toBeVisible();
});

test('invalid workspace IDs do not fall back and business switching preserves safe static routes', async ({ page }) => {
  await page.goto('/entrepreneur/businesses/BP-004/incentives/portfolio/INVALID');
  await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible();

  await page.goto('/entrepreneur/businesses/BP-004/incentives/claims/INVALID');
  await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible();

  await page.goto('/entrepreneur/businesses/BP-004/incentives/portfolio');
  await page.getByRole('button', { name: 'Switch Business' }).click();
  await page.getByRole('button', { name: /Konkan Feeds/ }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-002\/incentives\/portfolio$/);
  await expect(page.getByText('Sahyadri Bio-Pharma Pvt Ltd')).not.toBeVisible();
});
