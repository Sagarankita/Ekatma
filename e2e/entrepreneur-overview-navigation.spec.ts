import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/entrepreneur/login');
  await page.evaluate(() => sessionStorage.setItem('entrepreneur_demo_auth', 'true'));
});

test('overview links exact bound application and nested navigation stays active', async ({ page }) => {
  await page.goto('/entrepreneur/businesses/BP-001');
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-001$/);
  await expect(page.getByTestId('e00-command-centre')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'ABC Pharma Pvt Ltd' })).toBeVisible();
  const applicationsSection = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Applications Across Departments' }) });
  await applicationsSection.getByRole('link', { name: /APP-MPCB-2026-4892/ }).click();
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
  await expect(page.getByTestId('e00-command-centre')).toBeVisible();

  // Displays BP-004 bound applications
  const applicationsSection = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Applications Across Departments' }) });
  await expect(applicationsSection).toBeVisible();
  await expect(applicationsSection.getByText('4 active', { exact: true })).toBeVisible();
  await expect(applicationsSection.getByRole('link', { name: /APP-2026-MPCB-00412/ })).toBeVisible();
  await expect(applicationsSection.getByRole('link', { name: /APP-2026-MIDC-00187/ })).toBeVisible();

  // Excludes BP-001 applications
  await expect(page.getByText('APP-MPCB-2026-4892')).not.toBeVisible();
  await expect(page.getByText('APP-MIDC-2026-1190')).not.toBeVisible();

  // Displays BP-004 compliance and inspections
  const complianceSection = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Compliance', exact: true }) });
  await expect(complianceSection.getByText('CPL-001', { exact: true })).toBeVisible();
  await expect(complianceSection.getByText('+1 more obligations →', { exact: true })).toBeVisible();
  await expect(page.getByText('MPCB Environmental Inspection is Resolved', { exact: true })).toBeVisible();

  // BP-004 has 0 grievances; sidebar link is available, main-content might still be a disabled button or active link
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Grievances' })).toBeVisible();
});

test('E00 command centre keeps its business ID across primary section navigation', async ({ page }) => {
  await page.goto('/entrepreneur/businesses/BP-004');
  const commandCentre = page.getByTestId('e00-command-centre');

  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004$/);
  await expect(commandCentre.getByRole('heading', { name: 'Sahyadri Bio-Pharma Pvt Ltd' })).toBeVisible();
  await expect(commandCentre.getByText('ABC Pharma Pvt Ltd', { exact: true })).not.toBeVisible();

  const expectedLinks = [
    ['Regulatory Journey', '/entrepreneur/businesses/BP-004/journey'],
    ['Applications', '/entrepreneur/businesses/BP-004/applications'],
    ['Compliance', '/entrepreneur/businesses/BP-004/compliance'],
    ['Inspections', '/entrepreneur/businesses/BP-004/inspections'],
    ['Open Incentives', '/entrepreneur/businesses/BP-004/incentives'],
  ] as const;

  for (const [name, href] of expectedLinks) {
    await expect(commandCentre.getByRole('link', { name, exact: true }).first()).toHaveAttribute('href', href);
  }
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

test('switching from BP-004 drops non-transferable child context and keeps sections', async ({ page }) => {
  // 1. From BP-004 specific application to BP-001 -> lands on BP-001 applications, no leaked ID
  await page.goto('/entrepreneur/businesses/BP-004/applications/APP-2026-MPCB-00412');
  await page.getByRole('button', { name: 'Switch Business' }).click();
  await page.getByRole('button', { name: /ABC Pharma Pvt Ltd/ }).click();
  await expect(page).toHaveURL(/\/businesses\/BP-001\/applications$/);
  await expect(page.getByText('APP-2026-MPCB-00412')).not.toBeVisible();

  // 2. From BP-004 compliance to BP-001 -> lands on BP-001 compliance
  await page.goto('/entrepreneur/businesses/BP-004/compliance');
  await page.getByRole('button', { name: 'Switch Business' }).click();
  await page.getByRole('button', { name: /ABC Pharma Pvt Ltd/ }).click();
  await expect(page).toHaveURL(/\/businesses\/BP-001\/compliance$/);

  // 3. From BP-004 changes to BP-001 -> lands on BP-001 changes
  await page.goto('/entrepreneur/businesses/BP-004/changes');
  await page.getByRole('button', { name: 'Switch Business' }).click();
  await page.getByRole('button', { name: /ABC Pharma Pvt Ltd/ }).click();
  await expect(page).toHaveURL(/\/businesses\/BP-001\/changes$/);
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
