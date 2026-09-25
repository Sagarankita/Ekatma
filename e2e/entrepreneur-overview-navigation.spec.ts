import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/entrepreneur/login');
  await page.evaluate(() => sessionStorage.setItem('entrepreneur_demo_auth', 'true'));
});

test('overview links exact bound application and nested navigation stays active', async ({ page }) => {
  await page.goto('/entrepreneur/businesses/BP-001');
  await page.getByRole('link', { name: /Consent to Establish \(CTE\) · APP-MPCB-2026-4892/ }).click();
  await expect(page).toHaveURL(/\/BP-001\/applications\/APP-MPCB-2026-4892$/);
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Applications' })).toHaveAttribute('aria-current', 'page');
  await page.reload();
  await expect(page).toHaveURL(/\/BP-001\/applications\/APP-MPCB-2026-4892$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/BP-001$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/APP-MPCB-2026-4892$/);
});

test('BP-004 overview displays exact business-filtered counts and excludes cross-business data', async ({ page }) => {
  await page.goto('/entrepreneur/businesses/BP-004');
  await expect(page.getByRole('heading', { name: 'Sahyadri Bio-Pharma Pvt Ltd' })).toBeVisible();

  // Displays BP-004 bound applications
  await expect(page.getByRole('heading', { name: 'Applications: 4' })).toBeVisible();
  await expect(page.getByRole('link', { name: /APP-2026-MPCB-00412/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /APP-2026-MIDC-00187/ })).toBeVisible();

  // Excludes BP-001 applications
  await expect(page.getByText('APP-MPCB-2026-4892')).not.toBeVisible();
  await expect(page.getByText('APP-MIDC-2026-1190')).not.toBeVisible();

  // Displays BP-004 compliance and inspections
  await expect(page.getByRole('link', { name: /Compliance Obligations \(6\)/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Inspections \(2\)/ })).toBeVisible();

  // BP-004 has 0 grievances; both main-content quick button and sidebar button are disabled with truthful title
  await expect(page.locator('#main-content').getByRole('button', { name: 'Grievances' })).toBeDisabled();
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('button', { name: 'Grievances' })).toBeDisabled();
});

test('switching business keeps valid list context and drops unavailable child identity', async ({ page }) => {
  await page.goto('/entrepreneur/businesses/BP-001/applications/APP-MPCB-2026-4892');
  await page.getByRole('button', { name: 'Switch Business' }).click();
  await page.getByRole('button', { name: /Konkan Feeds/ }).click();
  await expect(page).toHaveURL(/\/businesses\/BP-002\/applications$/);
  await expect(page.getByText('APP-MPCB-2026-4892')).not.toBeVisible();
  await page.getByRole('button', { name: 'Switch Business' }).click();
  await page.getByRole('button', { name: /ABC Pharma Pvt Ltd/ }).click();
  await expect(page).toHaveURL(/\/businesses\/BP-001\/applications$/);
});

test('switching from BP-004 drops non-transferable child context and drops unavailable sections', async ({ page }) => {
  // 1. From BP-004 specific application to BP-001 -> lands on BP-001 applications, no leaked ID
  await page.goto('/entrepreneur/businesses/BP-004/applications/APP-2026-MPCB-00412');
  await page.getByRole('button', { name: 'Switch Business' }).click();
  await page.getByRole('button', { name: /ABC Pharma Pvt Ltd/ }).click();
  await expect(page).toHaveURL(/\/businesses\/BP-001\/applications$/);
  await expect(page.getByText('APP-2026-MPCB-00412')).not.toBeVisible();

  // 2. From BP-004 compliance to BP-001 (which has no compliance) -> falls back to BP-001 overview
  await page.goto('/entrepreneur/businesses/BP-004/compliance');
  await page.getByRole('button', { name: 'Switch Business' }).click();
  await page.getByRole('button', { name: /ABC Pharma Pvt Ltd/ }).click();
  await expect(page).toHaveURL(/\/businesses\/BP-001$/);

  // 3. From BP-004 changes to BP-001 (which has no changes) -> falls back to BP-001 overview
  await page.goto('/entrepreneur/businesses/BP-004/changes');
  await page.getByRole('button', { name: 'Switch Business' }).click();
  await page.getByRole('button', { name: /ABC Pharma Pvt Ltd/ }).click();
  await expect(page).toHaveURL(/\/businesses\/BP-001$/);
});

test('sidebar correctly reflects parent aria-current across nested and sister routes', async ({ page }) => {
  const nav = page.getByRole('navigation', { name: 'Main navigation' });

  // Regulatory changes screen activates Changes & Expansion
  await page.goto('/entrepreneur/businesses/BP-004/regulatory-changes');
  await expect(nav.getByRole('link', { name: 'Changes & Expansion' })).toHaveAttribute('aria-current', 'page');

  // Incentive claims screen activates Incentives
  await page.goto('/entrepreneur/businesses/BP-004/incentive-claims');
  await expect(nav.getByRole('link', { name: 'Incentives' })).toHaveAttribute('aria-current', 'page');

  // Amendments screen activates Changes & Expansion
  await page.goto('/entrepreneur/businesses/BP-004/changes/amendments');
  await expect(nav.getByRole('link', { name: 'Changes & Expansion' })).toHaveAttribute('aria-current', 'page');
});
