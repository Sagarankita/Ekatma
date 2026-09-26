import { expect, test } from '@playwright/test';

test('unbound compliance and incentive records do not appear under any BP business', async ({ page }) => {
  await page.goto('/entrepreneur/login');
  await page.evaluate(() => sessionStorage.setItem('entrepreneur_demo_auth', 'true'));
  for (const businessId of ['BP-001', 'BP-002', 'BP-003']) {
    await page.goto(`/entrepreneur/businesses/${businessId}`);
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    await expect(nav.getByRole('link', { name: 'Compliance' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Incentives' })).toBeVisible();

    for (const path of [
      'compliance/CPL-001',
      'compliance/CPL-006',
      'compliance/INVALID',
      'incentives/PSI-2019',
      'incentives/PLI-PHARMA',
      'incentives/INVALID',
      'incentive-claims?schemeId=PSI-2019',
    ]) {
      await page.goto(`/entrepreneur/businesses/${businessId}/${path}`);
      await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible();
      await expect(page.getByText('Sahyadri Bio-Pharma Pvt Ltd')).not.toBeVisible();
    }
  }
});

test('BP-004 compliance journeys cover two records with exact identity, deep links, refresh, history, active sidebar, and one shell', async ({ page }) => {
  await page.goto('/entrepreneur/login');
  await page.evaluate(() => sessionStorage.setItem('entrepreneur_demo_auth', 'true'));

  // 1. Overview to Compliance list via active sidebar navigation
  await page.goto('/entrepreneur/businesses/BP-004');
  await expect(page.getByRole('heading', { name: 'Sahyadri Bio-Pharma Pvt Ltd' })).toBeVisible();

  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  const complianceNavLink = nav.getByRole('link', { name: 'Compliance' });
  await expect(complianceNavLink).toBeVisible();
  await complianceNavLink.click();

  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004\/compliance$/);
  await expect(complianceNavLink).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('header[role="banner"]')).toHaveCount(1);
  await expect(page.locator('footer[role="contentinfo"]')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'Compliance Dashboard' })).toBeVisible();

  // 2. First record: CPL-001 (ETP Commissioning Report)
  await page.getByRole('button', { name: 'ETP Commissioning Report' }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004\/compliance\/CPL-001$/);
  await expect(page.getByRole('heading', { name: 'ETP Commissioning Report' })).toBeVisible();
  await expect(page.getByText('CPL-001', { exact: true })).toBeVisible();
  await expect(complianceNavLink).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('header[role="banner"]')).toHaveCount(1);
  await expect(page.locator('footer[role="contentinfo"]')).toHaveCount(1);

  // Refresh
  await page.reload();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004\/compliance\/CPL-001$/);
  await expect(page.getByRole('heading', { name: 'ETP Commissioning Report' })).toBeVisible();

  // History Back / Forward
  await page.goBack();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004\/compliance$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004\/compliance\/CPL-001$/);
  await expect(page.getByRole('heading', { name: 'ETP Commissioning Report' })).toBeVisible();

  // Source approval link is enabled for CPL-001 and resolves to exact decision
  const sourceApprovalBtn = page.getByRole('button', { name: 'CTE-2026-MPCB-41872' });
  await expect(sourceApprovalBtn).toBeEnabled();

  // 3. Second record: CPL-006 (Factory Registration Renewal)
  await page.goto('/entrepreneur/businesses/BP-004/compliance/CPL-006');
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004\/compliance\/CPL-006$/);
  await expect(page.getByRole('heading', { name: 'Factory Registration Renewal' })).toBeVisible();
  await expect(page.getByText('CPL-006', { exact: true })).toBeVisible();
  await expect(page.locator('header[role="banner"]')).toHaveCount(1);
  await expect(page.locator('footer[role="contentinfo"]')).toHaveCount(1);

  // Refresh & Back
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Factory Registration Renewal' })).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004\/compliance\/CPL-001$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004\/compliance\/CPL-006$/);

  // CPL-006 source approval is disabled because reference is an application ID, not an approval/decision chain
  const disabledApprovalBtn = page.getByRole('button', { name: 'APP-2026-DISH-00241' });
  await expect(disabledApprovalBtn).toBeDisabled();

  // 4. Copied deep link direct navigation
  await page.goto('/entrepreneur/businesses/BP-004/compliance/CPL-001');
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004\/compliance\/CPL-001$/);
  await expect(page.getByRole('heading', { name: 'ETP Commissioning Report' })).toBeVisible();

  // 5. Invalid record returns not found (no fallback)
  await page.goto('/entrepreneur/businesses/BP-004/compliance/CPL-INVALID');
  await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible();
});

test.skip('legacy E26-E28 incentive journey (retired in favor of the I0x workspace)', async ({ page }) => {
  await page.goto('/entrepreneur/login');
  await page.evaluate(() => sessionStorage.setItem('entrepreneur_demo_auth', 'true'));

  // 1. Overview to Incentives list
  await page.goto('/entrepreneur/businesses/BP-004');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  const incentivesNavLink = nav.getByRole('link', { name: 'Incentives' });
  await expect(incentivesNavLink).toBeVisible();
  await incentivesNavLink.click();

  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004\/incentives$/);
  await expect(incentivesNavLink).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('header[role="banner"]')).toHaveCount(1);
  await expect(page.locator('footer[role="contentinfo"]')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'Incentives', exact: true })).toBeVisible();

  // 2. First scheme: PSI-2019 (Package Scheme of Incentives 2019)
  await page.getByRole('button', { name: 'Package Scheme of Incentives 2019' }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004\/incentives\/PSI-2019$/);
  await expect(page.getByRole('heading', { name: 'Package Scheme of Incentives 2019' })).toBeVisible();
  await expect(page.getByText('PSI-2019', { exact: true })).toBeVisible();
  await expect(page.locator('header[role="banner"]')).toHaveCount(1);
  await expect(page.locator('footer[role="contentinfo"]')).toHaveCount(1);

  // Refresh
  await page.reload();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004\/incentives\/PSI-2019$/);
  await expect(page.getByRole('heading', { name: 'Package Scheme of Incentives 2019' })).toBeVisible();

  // History Back / Forward
  await page.goBack();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004\/incentives$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004\/incentives\/PSI-2019$/);
  await expect(page.getByRole('heading', { name: 'Package Scheme of Incentives 2019' })).toBeVisible();

  // Open Claims for PSI-2019
  await page.getByRole('button', { name: 'View Application / Claims' }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004\/incentive-claims\?schemeId=PSI-2019$/);
  await expect(incentivesNavLink).toHaveAttribute('aria-current', 'page');
  await expect(page.getByText('Correction Required — Claim CLM-2027-002')).toBeVisible();

  // Switch to Periodic Claims tab to see claim rows
  await page.getByRole('button', { name: 'Periodic Claims' }).click();
  await expect(page.getByText('CLM-2027-001')).toBeVisible();
  await expect(page.getByText('CLM-2027-002', { exact: true })).toBeVisible();
  await expect(page.getByText('CLM-2026-001')).toBeVisible();

  // Direct navigation to incentive-claims without search param defaults to PSI-2019
  await page.goto('/entrepreneur/businesses/BP-004/incentive-claims');
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004\/incentive-claims$/);
  await expect(page.getByRole('heading', { name: 'Incentive Application / Claims' })).toBeVisible();
  await expect(incentivesNavLink).toHaveAttribute('aria-current', 'page');

  // Invalid scheme on incentive-claims returns not found
  await page.goto('/entrepreneur/businesses/BP-004/incentive-claims?schemeId=INVALID-SCHEME');
  await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible();

  // 3. Second scheme: PLI-PHARMA (Production Linked Incentive Scheme — Pharmaceuticals)
  await page.goto('/entrepreneur/businesses/BP-004/incentives/PLI-PHARMA');
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004\/incentives\/PLI-PHARMA$/);
  await expect(page.getByRole('heading', { name: 'Production Linked Incentive Scheme — Pharmaceuticals' })).toBeVisible();
  await expect(page.getByText('PLI-PHARMA', { exact: true })).toBeVisible();
  await expect(incentivesNavLink).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('header[role="banner"]')).toHaveCount(1);
  await expect(page.locator('footer[role="contentinfo"]')).toHaveCount(1);

  // Refresh & Back
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Production Linked Incentive Scheme — Pharmaceuticals' })).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004\/incentive-claims\?schemeId=INVALID-SCHEME$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004\/incentives\/PLI-PHARMA$/);

  // 4. Copied deep links direct navigation
  await page.goto('/entrepreneur/businesses/BP-004/incentives/PSI-2019');
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-004\/incentives\/PSI-2019$/);
  await expect(page.getByRole('heading', { name: 'Package Scheme of Incentives 2019' })).toBeVisible();

  // 5. Invalid scheme returns not found
  await page.goto('/entrepreneur/businesses/BP-004/incentives/INVALID-SCHEME');
  await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible();
});

test('switching business from BP-004 compliance or incentives preserves destination context', async ({ page }) => {
  await page.goto('/entrepreneur/login');
  await page.evaluate(() => sessionStorage.setItem('entrepreneur_demo_auth', 'true'));

  // From compliance
  await page.goto('/entrepreneur/businesses/BP-004/compliance');
  await page.getByRole('button', { name: 'Switch Business' }).click();
  await page.getByRole('button', { name: /ABC Pharma Pvt Ltd/ }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-001\/compliance$/);

  // From incentives
  await page.goto('/entrepreneur/businesses/BP-004/incentives');
  await page.getByRole('button', { name: 'Switch Business' }).click();
  await page.getByRole('button', { name: /Konkan Feeds/ }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-002\/incentives$/);
});
