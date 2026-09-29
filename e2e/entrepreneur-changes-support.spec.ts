import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/entrepreneur/login');
  await page.evaluate(() => sessionStorage.setItem('entrepreneur_demo_auth', 'true'));
});

test('BP-001 grievances and global support routes navigate through one shell', async ({ page }) => {
  await page.goto('/entrepreneur/businesses/BP-001');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await nav.getByRole('link', { name: 'Grievances' }).click();
  await expect(page).toHaveURL(/\/businesses\/BP-001\/grievances/);
  await expect(page.getByText('GRV-2026-0014').first()).toBeVisible();
  await nav.getByRole('link', { name: 'Notifications' }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/notifications$/);
  await expect(page.getByRole('heading', { name: 'Notification Centre' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Notification Centre' })).toBeVisible();
  await nav.getByRole('link', { name: 'Regulatory Assistant' }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/assistant$/);
  await expect(page.getByRole('heading', { name: 'Regulatory Assistant', level: 1 })).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/entrepreneur\/notifications$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/entrepreneur\/assistant$/);
  await expect(page.locator('aside[aria-label="Entrepreneur navigation"]')).toHaveCount(1);
});

test('notifications navigate only to bound record context with search params', async ({ page }) => {
  await page.goto('/entrepreneur/notifications');

  // N-006 -> exact application
  await page.getByRole('article', { name: /Approval received: MIDC/ }).getByRole('button', { name: /View Application/ }).click();
  await expect(page).toHaveURL(/\/businesses\/BP-001\/applications\/APP-MIDC-2026-1190$/);
  await page.goBack();

  // N-008 -> exact grievance detail
  await page.getByRole('article', { name: /Grievance resolved: MIDC/ }).getByRole('button', { name: /View Grievance/ }).click();
  await expect(page).toHaveURL(/\/businesses\/BP-001\/grievances\?grievanceId=GRV-2026-0003$/);
  await expect(page.getByRole('heading', { name: 'GRV-2026-0003' })).toBeVisible();
  await page.goBack();

  // N-001 -> raise grievance with APP-MPCB-2026-4892 pre-selected
  await page.getByRole('article', { name: /SLA breach: MPCB CTE/ }).getByRole('button', { name: /Raise Grievance/ }).click();
  await expect(page).toHaveURL(/\/businesses\/BP-001\/grievances\?applicationId=APP-MPCB-2026-4892&raise=1$/);
  await expect(page.getByRole('heading', { name: /Raise a New Grievance|नवीन तक्रार दाखल करा/ })).toBeVisible();
  await expect(page.getByText(/APP-MPCB-2026-4892/)).toBeVisible();

  // Every notification opens the most relevant existing page
  await page.goto('/entrepreneur/notifications');
  await page.getByRole('article', { name: /New query from Inspector of Factories/ }).getByRole('button', { name: /Respond to Query/ }).click();
  await expect(page).toHaveURL(/\/businesses\/BP-001\/applications\/APP-FAC-2026-3371$/);
  await page.goto('/entrepreneur/notifications');
  await page.getByRole('article', { name: /Regulatory change: MPCB effluent/ }).getByRole('button', { name: /View Regulatory Change/ }).click();
  await expect(page).toHaveURL(/\/businesses\/BP-004\/regulatory-changes$/);
});

test('grievance search params validate strictly and submission creates a local demo record', async ({ page }) => {
  // Invalid grievanceId does NOT select the first record
  await page.goto('/entrepreneur/businesses/BP-001/grievances?grievanceId=INVALID-GRV');
  await expect(page.getByRole('heading', { name: 'Grievances', exact: true })).toBeVisible();
  await expect(page.getByText('GRV-2026-0014').first()).toBeVisible();

  // Invalid applicationId on raise does not attach another application
  await page.goto('/entrepreneur/businesses/BP-001/grievances?applicationId=INVALID-APP&raise=1');
  await expect(page.getByRole('heading', { name: /Raise a New Grievance/ })).toBeVisible();
  await expect(page.getByText('No application context available')).toBeVisible();

  // Valid raise grievance submission creates trackable demo record
  await page.goto('/entrepreneur/businesses/BP-001/grievances?applicationId=APP-MPCB-2026-4892&raise=1');
  await expect(page.getByText(/APP-MPCB-2026-4892/)).toBeVisible();
  await page.locator('select').first().selectOption('Application grievance');
  await page.locator('select').nth(1).selectOption('Department delay');
  await page.locator('textarea').fill('Escalating prolonged department delay for MPCB CTE clearance.');
  await page.getByRole('button', { name: 'Submit Grievance' }).click();

  // Verification screen
  await expect(page.getByRole('heading', { name: 'Grievance Submitted' })).toBeVisible();
  await expect(page.getByText(/GRV-2026-001/)).toBeVisible();
  await expect(page.getByText(/Note: This is a local demo record in this tab session/)).toBeVisible();

  // Return to list and verify new grievance is present
  await page.getByRole('button', { name: 'Back to Grievances' }).click();
  await expect(page.getByText('GRV-2026-0014').first()).toBeVisible();
  await expect(page.getByText(/Department delay/).first()).toBeVisible();
});

test('BP-004 regulatory changes, change simulation, and amendments function with scoped state', async ({ page }) => {
  // 1. Regulatory Changes (E29) under BP-004
  await page.goto('/entrepreneur/businesses/BP-004/regulatory-changes');
  await expect(page.getByRole('heading', { name: 'Regulatory Change Impact' })).toBeVisible();
  await expect(page.getByText('Sahyadri Bio-Pharma Pvt Ltd — Chakan Industrial Area Phase II')).toBeVisible();

  // Expand RC-2026-001
  await page.getByText('RC-2026-001').first().click();
  await expect(page.getByText(/MPCB has revised effluent discharge concentration limits/)).toBeVisible();

  // Conflicting CPL-001 reference under RC-2026-003 is disabled
  await page.getByText('RC-2026-003').first().click();
  const cplRefBtn = page.getByRole('button', { name: /PSI 2019 Eligibility Certificate/ });
  await expect(cplRefBtn).toBeDisabled();

  // 2. Business Change Simulator (E30)
  await page.goto('/entrepreneur/businesses/BP-004/changes');
  await expect(page.getByRole('heading', { name: 'Business Change Simulator' })).toBeVisible();

  // Select Increase production and select proposed value
  await page.getByRole('button', { name: 'Increase production' }).click();
  await page.getByRole('combobox').selectOption('150 T/day');
  await page.getByRole('button', { name: 'Analyse Regulatory Impact' }).click();
  await expect(page.getByText('Impact Simulation — Increase production (150 T/day)')).toBeVisible();

  // Proceed to Amendments (E31) - proposed value is held in session, not in URL
  await page.getByRole('button', { name: 'Proceed to Amendments / New Requirements' }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004\/changes\/amendments$/);
  await expect(page.getByRole('heading', { name: 'Amendments / New Requirements' })).toBeVisible();
  await expect(page.getByText('150 T/day', { exact: true })).toBeVisible();

  // Refresh preserves tab draft
  await page.reload();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004\/changes\/amendments$/);
  await expect(page.getByText('150 T/day', { exact: true })).toBeVisible();

  // Return to simulator
  await page.getByRole('button', { name: 'Back to Simulator' }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004\/changes$/);
});

test('unbound regulatory changes remain unavailable under BP-001', async ({ page }) => {
  await page.goto('/entrepreneur/businesses/BP-001');
  // Changes & Expansion link is now always available
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Changes & Expansion' })).toBeVisible();
});
