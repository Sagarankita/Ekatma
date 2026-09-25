import { test, expect } from '@playwright/test';

test('landing page routes to the existing department and new entrepreneur login', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Welcome to EKATMA' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Department Login' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Industrial Login' })).toBeVisible();

  for (const alt of ['National Emblem of India', 'Government of Maharashtra seal', 'Ekatma portal logo']) {
    const image = page.getByRole('img', { name: alt });
    await expect(image).toBeVisible();
    expect(await image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  }

  await page.getByRole('button', { name: 'Department Login' }).click();
  await expect(page).toHaveURL(/\/department\/login$/);
  await expect(page.getByRole('heading', { name: 'MIDC Department Login' })).toBeVisible();

  await page.goto('/');
  await page.getByRole('button', { name: 'Industrial Login' }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/login$/);
  await expect(page.getByRole('heading', { name: 'Industrial Login' })).toBeVisible();
});

test('entrepreneur demo login opens the business portfolio and supports browser history', async ({ page }) => {
  await page.goto('/entrepreneur/login');
  await page.getByPlaceholder('Enter your email ID').fill('demo@example.com');
  await page.getByPlaceholder('Enter your password').fill('demo');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses$/);
  await expect(page.getByRole('heading', { name: 'My Businesses' })).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/entrepreneur\/login$/);
  await expect(page.getByRole('heading', { name: 'Industrial Login' })).toBeVisible();
});

test('the demo registration flow keeps the source screens and returns to login', async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto('/entrepreneur/login');
  await page.getByRole('button', { name: 'Sign up first' }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/register$/);
  await page.getByPlaceholder('Enter your email ID').fill('registration@example.com');
  await page.getByRole('button', { name: 'Send OTP' }).click();
  await page.getByPlaceholder('Enter OTP').fill('123456');
  await page.getByRole('button', { name: 'Verify OTP' }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/register\/details$/);
  await expect(page.getByRole('heading', { name: 'Complete Registration' })).toBeVisible();
  await page.getByPlaceholder('Enter your mobile number').fill('9999999999');
  await page.getByPlaceholder('Enter your first name').fill('Demo');
  await page.getByPlaceholder('Enter your last name').fill('User');
  await page.getByPlaceholder('Enter your Aadhaar No. / Virtual ID').fill('111111111111');
  await page.locator('input[type="date"]').fill('1990-01-01');
  await page.getByPlaceholder('Enter your communication address').fill('Demo address');
  await page.locator('select').nth(0).selectOption('MH');
  await page.locator('select').nth(1).selectOption('Pune');
  await page.locator('select').nth(2).selectOption('Haveli');
  await page.locator('select').nth(3).selectOption('Aundh');
  await page.getByPlaceholder('Enter your password').fill('DemoPass1!');
  await page.getByPlaceholder('Enter your confirm password').fill('DemoPass1!');
  await page.locator('input[type="checkbox"]').check();
  await page.getByRole('button', { name: 'Register', exact: true }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/register\/success$/);
  await expect(page.getByRole('heading', { name: 'Registration Successful' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Registration Successful' })).toBeVisible();
  await page.getByRole('button', { name: 'Go to Login' }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/login$/);
  await expect(page.getByPlaceholder('Enter your email ID')).toHaveValue('registration@example.com');
});

test('landing and industrial login fit a narrow screen without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ['/', '/entrepreneur/login']) {
    await page.goto(route);
    const widths = await page.evaluate(() => ({ document: document.documentElement.scrollWidth, viewport: window.innerWidth }));
    expect(widths.document, `${route} overflowed by ${widths.document - widths.viewport}px`).toBeLessThanOrEqual(widths.viewport);
  }
});

test('entrepreneur tables retain the source light header styling', async ({ page }) => {
  await page.goto('/entrepreneur/login');
  await page.getByPlaceholder('Enter your email ID').fill('demo@example.com');
  await page.getByPlaceholder('Enter your password').fill('demo');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses$/);
  await page.goto('/entrepreneur/businesses/BP-001/applications');
  const header = page.locator('table thead tr').first();
  await expect(header).toBeVisible();
  expect(await header.evaluate(element => getComputedStyle(element).backgroundColor)).toBe('rgb(248, 249, 251)');
});

test('registration details require completing the preceding OTP screen', async ({ page }) => {
  await page.goto('/entrepreneur/register/details');
  await expect(page).toHaveURL(/\/entrepreneur\/register$/);
  await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
});

test('header login menu opens by click and links to both portals', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Login / Register' }).click();
  await expect(page.getByRole('menuitem', { name: 'Industrial Login' })).toBeVisible();
  await expect(page.getByRole('menuitem', { name: 'Government Login' })).toHaveAttribute('href', '/department/login');
});
