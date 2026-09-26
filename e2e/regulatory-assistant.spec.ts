import { expect, test } from '@playwright/test';

async function loginEntrepreneur(page: import('@playwright/test').Page) {
  await page.goto('/entrepreneur/login');
  await page.getByPlaceholder('Enter your email ID').fill('demo@example.com');
  await page.getByPlaceholder('Enter your password').fill('demo');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses$/);
}

test.describe('shared regulatory assistant', () => {
  test('entrepreneur routes resolve page prompts and exact entity IDs', async ({ page }) => {
    await loginEntrepreneur(page);
    const dialog = page.getByRole('dialog', { name: 'Regulatory Assistant' });

    await page.goto('/entrepreneur/businesses/BP-004');
    await page.getByRole('button', { name: 'Open Regulatory Assistant' }).click();
    await expect(dialog.getByTestId('assistant-prompts').getByRole('button', { name: 'What needs my attention?' })).toBeVisible();
    await dialog.getByRole('button', { name: 'Close Regulatory Assistant' }).last().click();

    await page.goto('/entrepreneur/businesses/BP-004/requirements/LAND-001');
    await page.getByRole('button', { name: 'Ask Assistant' }).first().click();
    await expect(dialog.getByText(/requirementId: LAND-001/)).toBeVisible();
    await expect(dialog.getByTestId('assistant-prompts').getByRole('button', { name: 'What documents are required?' })).toBeVisible();
    await dialog.getByRole('button', { name: 'Close Regulatory Assistant' }).last().click();

    await page.goto('/entrepreneur/businesses/BP-004/incentives/portfolio');
    await page.getByRole('button', { name: 'Open Regulatory Assistant' }).click();
    await expect(dialog.getByTestId('assistant-prompts').getByRole('button', { name: 'How do these incentive options differ?' })).toBeVisible();
    await dialog.getByRole('button', { name: 'Close Regulatory Assistant' }).last().click();

    await page.goto('/entrepreneur/businesses/BP-004/incentives/portfolio/PSI-2019');
    await page.getByRole('button', { name: 'Open Regulatory Assistant' }).click();
    await expect(dialog.getByText(/incentiveId: PSI-2019/)).toBeVisible();
    await dialog.getByRole('button', { name: 'Close Regulatory Assistant' }).last().click();

    await page.goto('/entrepreneur/businesses/BP-004/incentives/claims/CLM-2026-001');
    await page.getByRole('button', { name: 'Open Regulatory Assistant' }).click();
    await expect(dialog.getByText(/claimId: CLM-2026-001/)).toBeVisible();
  });

  test('header prompts remain global and preset clicks only fill the draft', async ({ page }) => {
    await loginEntrepreneur(page);
    await page.goto('/entrepreneur/businesses/BP-004/requirements/LAND-001');
    await page.locator('header[role="banner"]').getByRole('button', { name: 'Regulatory Assistant' }).click();
    const dialog = page.getByRole('dialog', { name: 'Regulatory Assistant' });
    await expect(dialog.getByRole('button', { name: 'What should I complete next?' })).toBeVisible();
    await expect(dialog.getByRole('button', { name: 'Why is this requirement applicable?' })).toHaveCount(0);
    await dialog.getByRole('button', { name: 'What should I complete next?' }).click();
    await expect(dialog.getByLabel('Ask a regulatory question')).toHaveValue('What should I complete next?');
    await expect(dialog.getByText('What should I complete next?', { exact: true })).toHaveCount(1);
  });

  test('business switching clears stale child IDs and records the context change', async ({ page }) => {
    await loginEntrepreneur(page);
    await page.goto('/entrepreneur/businesses/BP-004/incentives/claims/CLM-2026-001');
    await page.getByRole('button', { name: 'Open Regulatory Assistant' }).click();
    const dialog = page.getByRole('dialog', { name: 'Regulatory Assistant' });
    await dialog.getByLabel('Ask a regulatory question').fill('Keep this conversation');
    await dialog.getByRole('button', { name: 'Send' }).click();
    await dialog.getByRole('button', { name: 'Close Regulatory Assistant' }).last().click();
    await page.getByRole('button', { name: 'Switch Business' }).click();
    await page.getByRole('button', { name: /Konkan Feeds/ }).click();
    await expect(page).toHaveURL(/\/entrepreneur\/businesses\/BP-002\/incentives\/claims$/);
    await page.getByRole('button', { name: 'Open Regulatory Assistant' }).click();
    await expect(dialog.getByText('Context changed from BP-004 to BP-002')).toBeVisible();
    await expect(dialog.getByText(/businessId: BP-002/)).toBeVisible();
    await expect(dialog.getByText(/claimId:/)).toHaveCount(0);
    await expect(dialog.getByText('Keep this conversation')).toBeVisible();
  });

  test('header, FAB, inline journey and navigation reuse one entrepreneur thread', async ({ page }) => {
    await loginEntrepreneur(page);
    await page.locator('header[role="banner"]').getByRole('button', { name: 'Regulatory Assistant' }).click();
    const dialog = page.getByRole('dialog', { name: 'Regulatory Assistant' });
    await dialog.getByLabel('Ask a regulatory question').fill('What applies to this business?');
    await dialog.getByRole('button', { name: 'Send' }).click();
    await expect(dialog.getByText('What applies to this business?')).toBeVisible();
    await dialog.getByRole('button', { name: 'Close Regulatory Assistant' }).last().click();
    await page.getByRole('button', { name: 'Open Regulatory Assistant' }).click();
    await expect(dialog.getByText('What applies to this business?')).toBeVisible();
    await dialog.getByRole('button', { name: 'Close Regulatory Assistant' }).last().click();
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Regulatory Journey' }).click();
    await page.getByRole('button', { name: 'Ask Assistant' }).click();
    await expect(dialog.getByText('What applies to this business?')).toBeVisible();
    await expect(dialog.getByText('Context changed to ABC Pharma Pvt Ltd regulatory journey')).toBeVisible();
  });

  test('department full research reuses drawer messages and preserves sources', async ({ page, context }) => {
    await context.addInitScript(() => localStorage.setItem('dept_auth', 'true'));
    await page.goto('/department');
    await page.getByRole('button', { name: 'Open Regulatory Assistant' }).click();
    const dialog = page.getByRole('dialog', { name: 'Regulatory Assistant' });
    await dialog.getByLabel('Ask a regulatory question').fill('Which clause applies?');
    await dialog.getByRole('button', { name: 'Send' }).click();
    await expect(dialog.getByText('Which clause applies?')).toBeVisible();
    await dialog.getByRole('link', { name: 'Full research' }).click();
    await expect(page).toHaveURL('/department/regasst');
    await expect(page.getByText('Which clause applies?')).toBeVisible();
    await expect(page.getByText('Regulatory Sources')).toBeVisible();
  });

  test('department application, scrutiny and document contexts retain canonical IDs', async ({ page, context }) => {
    await context.addInitScript(() => localStorage.setItem('dept_auth', 'true'));
    const dialog = page.getByRole('dialog', { name: 'Regulatory Assistant' });
    await page.goto('/department/applications/APP-MIDC-2048');
    await page.getByRole('button', { name: 'Open Regulatory Assistant' }).click();
    await expect(dialog.getByText(/applicationId: APP-MIDC-2048/)).toBeVisible();
    await dialog.getByRole('button', { name: 'Close Regulatory Assistant' }).last().click();

    await page.goto('/department/applications/APP-MIDC-2048/scrutiny-workbench');
    await page.getByRole('button', { name: 'Open Regulatory Assistant' }).click();
    await expect(dialog.getByRole('button', { name: 'Which rule supports this check?' })).toBeVisible();
    await dialog.getByRole('button', { name: 'Close Regulatory Assistant' }).last().click();

    await page.goto('/department/applications/APP-MIDC-2048/document/DOC-001');
    await page.getByRole('button', { name: 'Open Regulatory Assistant' }).click();
    await expect(dialog.getByText(/applicationId: APP-MIDC-2048 · documentId: DOC-001/)).toBeVisible();
    await expect(dialog.getByRole('button', { name: 'Is validity or expiry relevant?' })).toBeVisible();
  });

  test('discards an in-flight answer after the context changes', async ({ page }) => {
    await loginEntrepreneur(page);
    await page.getByRole('button', { name: 'Open Regulatory Assistant' }).click();
    const dialog = page.getByRole('dialog', { name: 'Regulatory Assistant' });
    await dialog.getByLabel('Ask a regulatory question').fill('Question for the old context');
    await dialog.getByRole('button', { name: 'Send' }).click();
    await dialog.getByRole('button', { name: 'Close Regulatory Assistant' }).last().click();
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Regulatory Journey' }).click();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Open Regulatory Assistant' }).click();
    await expect(dialog.getByText('Question for the old context')).toBeVisible();
    await expect(dialog.getByText(/Prototype regulatory guidance for/)).toHaveCount(0);
  });
});
