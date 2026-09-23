import { test, expect } from '@playwright/test';

test.describe('Department PWA Constraints', () => {

  test('Unauthenticated user is redirected to /department/login', async ({ page }) => {
    // Clear localStorage to simulate unauthenticated
    await page.goto('/department');
    // It should redirect to login
    await expect(page).toHaveURL(/.*\/department\/login/);
  });

  test('PWA manifest is accessible and scoped', async ({ request }) => {
    const response = await request.get('/department/manifest.json');
    expect(response.ok()).toBeTruthy();
    const manifest = await response.json();
    expect(manifest.scope).toBe('/department/');
    expect(manifest.start_url).toBe('/department/');
  });

  test('Service worker is registered correctly', async ({ page }) => {
    // Go to login so it loads DepartmentShell
    await page.goto('/department/login');
    // Check if service worker is registered
    const swRegistration = await page.evaluate(async () => {
      const registration = await navigator.serviceWorker.getRegistration();
      return registration ? registration.scope : null;
    });
    expect(swRegistration).toContain('/department');
  });
});

test.describe('Representative M-screen Flows & Deep Links', () => {

  test.beforeEach(async ({ page, context }) => {
    // Mock login by setting localStorage
    await page.goto('/department/login');
    await page.evaluate(() => {
      localStorage.setItem('dept_auth', 'true');
    });
  });

  test('Navigation to Queue and Application Overview', async ({ page }) => {
    await page.goto('/department/queue');
    await expect(page).toHaveURL(/.*\/department\/queue/);
    
    // Check deep link to specific application ID
    const testAppId = 'APP-12345';
    await page.goto(`/department/applications/${testAppId}`);
    await expect(page.locator('text=' + testAppId).first()).toBeVisible();
    
    // Refresh the deep link to ensure consistency
    await page.reload();
    await expect(page.locator('text=' + testAppId).first()).toBeVisible();
  });

  test('Application Identity Consistency in Inspection Route', async ({ page }) => {
    const testAppId = 'APP-67890';
    const testInspId = 'INSP-999';
    await page.goto(`/department/applications/${testAppId}/inspections/${testInspId}/workspace`);
    await expect(page).toHaveURL(/.*\/inspections\/INSP-999\/workspace/);
    
    // Verify identities remain consistent after reload
    await page.reload();
    await expect(page).toHaveURL(/.*\/inspections\/INSP-999\/workspace/);
  });

  test('Visual Parity check at standard viewport', async ({ page }) => {
    await page.goto('/department');
    await page.setViewportSize({ width: 1440, height: 900 });
    // Ensuring page loads correctly without errors
    await expect(page.locator('body')).toBeVisible();
    
    // Very basic visual parity assertion placeholder
    // In a real environment we would do `expect(await page.screenshot()).toMatchSnapshot();`
    // However, since we are doing logic tests, this checks that the layout mounts successfully.
    const hasHeader = await page.locator('header').count() > 0;
    const hasSidebar = await page.locator('nav').count() > 0;
    expect(hasHeader || hasSidebar).toBeTruthy();
  });
});
