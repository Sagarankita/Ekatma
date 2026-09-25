import { expect, test } from '@playwright/test';

async function login(page: import('@playwright/test').Page) {
  await page.goto('/entrepreneur/login');
  await page.evaluate(() => sessionStorage.setItem('entrepreneur_demo_auth', 'true'));
}

test.describe('Unbound requirement and document identity', () => {
  test.beforeEach(async ({ page }) => login(page));

  test('Sahyadri requirements and documents cannot appear under any BP business', async ({ page }) => {
    for (const businessId of ['BP-001', 'BP-002', 'BP-003']) {
      for (const path of ['requirements/EST-001', 'documents/DOC-001']) {
        await page.goto(`/entrepreneur/businesses/${businessId}/${path}`);
        await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible();
        await expect(page.getByText('Project Environmental Report / DPR')).not.toBeVisible();
      }
    }
  });

  test('Document and dependency links are available', async ({ page }) => {
    await page.goto('/entrepreneur/businesses/BP-001');
    await expect(page.getByRole('link', { name: 'Document Centre' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Dependencies' })).toBeVisible();
  });

  test('Unknown IDs and business IDs return not found', async ({ page }) => {
    for (const path of [
      '/entrepreneur/businesses/BP-001/requirements/NONEXISTENT-999',
      '/entrepreneur/businesses/BP-001/documents/DOC-FAKE-999',
      '/entrepreneur/businesses/FAKE-BP/documents',
    ]) {
      await page.goto(path);
      await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible();
    }
  });
});
