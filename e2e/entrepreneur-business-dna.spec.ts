import { expect, test } from '@playwright/test';

async function login(page: import('@playwright/test').Page) {
  await page.goto('/entrepreneur/login');
  await page.getByPlaceholder('Enter your email ID').fill('demo@example.com');
  await page.getByPlaceholder('Enter your password').fill('demo');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses$/);
}

test('portfolio starts canonical onboarding with source validation and one shell', async ({ page }) => {
  await login(page);
  await page.getByRole('button', { name: 'Create New Business / Project' }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/new$/);
  await expect(page.getByRole('heading', { name: 'Create Business / Project' })).toBeVisible();
  await expect(page.locator('header[role="banner"]')).toHaveCount(1);
  await expect(page.locator('footer[role="contentinfo"]')).toHaveCount(1);
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page.getByText('Business / Project Name is required.')).toBeVisible();
  await page.getByPlaceholder('e.g. ABC Pharma Manufacturing Unit').fill('Test Chakan Project');
  await page.locator('input[name="projectType"][value="new"]').check();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/new\/basic-requirements$/);
  await expect(page.getByText('Test Chakan Project')).toBeVisible();
});

test('one tab draft survives refresh, Back/Forward, and Save & Exit', async ({ page }) => {
  await login(page);
  await page.goto('/entrepreneur/businesses/new');
  await page.getByPlaceholder('e.g. ABC Pharma Manufacturing Unit').fill('Persistent Project');
  await page.locator('input[name="projectType"][value="new"]').check();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page).toHaveURL(/\/basic-requirements$/);
  await page.locator('input[name="midc"][value="no"]').check();
  await page.reload();
  await expect(page.getByText('Persistent Project')).toBeVisible();
  await expect(page.locator('input[name="midc"][value="no"]')).toBeChecked();
  await page.goBack();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/new$/);
  await expect(page.getByPlaceholder('e.g. ABC Pharma Manufacturing Unit')).toHaveValue('Persistent Project');
  await page.goForward();
  await expect(page.locator('input[name="midc"][value="no"]')).toBeChecked();
  await page.getByRole('button', { name: 'Save & Exit' }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses$/);
  await page.getByRole('button', { name: 'Create New Business / Project' }).click();
  await expect(page.getByPlaceholder('e.g. ABC Pharma Manufacturing Unit')).toHaveValue('Persistent Project');
});

test('Scale Save & Exit returns to the portfolio with its draft answers', async ({ page }) => {
  await login(page);
  await page.goto('/entrepreneur/businesses/new/discovery/scale');
  await page.getByPlaceholder('e.g. 400000000').fill('1000000');
  await page.getByRole('button', { name: 'Save & Exit' }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses$/);
  await page.goto('/entrepreneur/businesses/new/discovery/scale');
  await expect(page.getByPlaceholder('e.g. 400000000')).toHaveValue('1000000');
});

test('Business DNA click flow reaches review through all canonical stages', async ({ page }) => {
  test.setTimeout(120_000);
  await login(page);
  await page.getByRole('button', { name: 'Create New Business / Project' }).click();
  await page.getByPlaceholder('e.g. ABC Pharma Manufacturing Unit').fill('Flow Project');
  await page.locator('input[name="projectType"][value="new"]').check();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.locator('input[name="businessNature"][value="services"]').check();
  await page.getByRole('button', { name: 'Continue to Adaptive Discovery' }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/new\/discovery$/);
  await page.locator('input[name="classification"][value="msme"]').check();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.locator('input[name="legalEntityType"][value="proprietorship"]').check();
  await page.getByPlaceholder('Enter registered entity name').fill('Flow Project Entity');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByText('Search industry…').click();
  await page.getByRole('button', { name: 'IT / ITES' }).click();
  await expect(page.getByText('Answered earlier in Basic Requirements')).toBeVisible();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  for (let section = 4; section < 8; section++) await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: 'Continue to Next Section' }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/new\/discovery\/scale$/);
  for (let sub = 1; sub < 8; sub++) await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: 'Continue to Next Section' }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/new\/discovery\/environment-safety$/);
  for (let sub = 1; sub < 10; sub++) await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: 'Review Business Profile' }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/new\/review$/);
  await expect(page.getByRole('heading', { name: 'Review Business Profile' })).toBeVisible();
  await expect(page.getByText('Flow Project Entity')).toBeVisible();
  await expect(page.locator('header[role="banner"]')).toHaveCount(1);
  await expect(page.locator('footer[role="contentinfo"]')).toHaveCount(1);
  await expect(page).not.toHaveURL(/BP-/);
});

test('expansion selects an existing BP record without assigning that ID to the draft', async ({ page }) => {
  await login(page);
  await page.goto('/entrepreneur/businesses/new');
  await page.getByPlaceholder('e.g. ABC Pharma Manufacturing Unit').fill('Konkan expansion');
  await page.locator('input[name="projectType"][value="expansion"]').check();
  await page.locator('select').selectOption('BP-002');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page.getByText('Konkan Feeds')).toBeVisible();
  await page.getByRole('button', { name: 'Continue to Adaptive Discovery' }).click();
  await expect(page.getByRole('heading', { name: 'Business Discovery' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue to Business Discovery' }).click();
  await expect(page.getByText('Please select at least one area you are changing.')).toBeVisible();
  await page.getByLabel('Production / Output Capacity').check();
  await page.getByRole('button', { name: 'Continue to Business Discovery' }).click();
  await expect(page.getByRole('heading', { name: 'Project Classification' })).toBeVisible();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses\/new\/discovery$/);
  const draft = await page.evaluate(() => JSON.parse(sessionStorage.getItem('entrepreneur_business_dna_draft_v1') || '{}'));
  expect(draft.e03.existingBusinessId).toBe('BP-002');
  expect(draft.e03.name).toBe('Konkan expansion');
  expect(draft.expansionChangeAreas).toEqual(['production']);
});

test('local profile confirmation leaves unresolved Dossier and Journey actions unavailable', async ({ page }) => {
  await login(page);
  await page.goto('/entrepreneur/businesses/new');
  await expect.poll(() => page.evaluate(() => sessionStorage.getItem('entrepreneur_business_dna_draft_v1'))).toBeTruthy();
  await page.evaluate(() => {
    const key = 'entrepreneur_business_dna_draft_v1';
    const draft = JSON.parse(sessionStorage.getItem(key) || '{}');
    draft.e03 = { name: 'Unbound New Project', projectType: 'new', existingBusinessId: '', description: '' };
    draft.e04 = { ...draft.e04, midc: 'no', construction: 'existing', power: 'no', water: 'no', businessNature: 'services', existingApprovals: 'no' };
    draft.e05 = { ...draft.e05, classification: 'msme', legalEntityType: 'proprietorship', industry: 'IT / ITES', activities: ['Provide Services'], district: 'Pune', totalInvestment: '100000', workforceTotal: '4', generatesWastewater: 'no', envTrigger: 'no', airEmissions: 'no', hazMatYN: 'no', hazWasteYN: 'no', boilerYN: 'no', pressureVesselYN: 'no', incentiveAttributes: ['MSME'] };
    sessionStorage.setItem(key, JSON.stringify(draft));
  });
  await page.goto('/entrepreneur/businesses/new/review');
  await page.getByRole('button', { name: 'Confirm Profile →' }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Confirm Profile' }).click();
  await expect(page.getByText('Business Profile Confirmed')).toBeVisible();
  await expect(page.getByRole('button', { name: /View Master Project Dossier/ })).toBeDisabled();
  await expect(page.getByRole('button', { name: /View Regulatory Journey/ })).toBeDisabled();
  await page.reload();
  await expect(page.getByText('Business Profile Confirmed')).toBeVisible();
  await expect(page).not.toHaveURL(/BP-/);
});
