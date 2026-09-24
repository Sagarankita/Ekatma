import { test, expect } from '@playwright/test';
import { ENTREPRENEUR_PAGES } from '../src/lib/entrepreneur-routes';

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
  await expect(page).toHaveURL(/\/entrepreneur\/my-businesses$/);
  await expect(page.getByRole('heading', { name: 'My Businesses' })).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/entrepreneur\/login$/);
  await expect(page.getByRole('heading', { name: 'Industrial Login' })).toBeVisible();
});

test('the full entrepreneur screen inventory renders from direct Next.js routes', async ({ page }) => {
  test.setTimeout(120_000);
  const pageErrors: string[] = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto('/entrepreneur/login');
  await page.getByPlaceholder('Enter your email ID').fill('demo@example.com');
  await page.getByPlaceholder('Enter your password').fill('demo');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/my-businesses$/);

  const guestPages = new Set(['portal', 'login', 'signup-email', 'signup-register', 'signup-success']);
  for (const screen of ENTREPRENEUR_PAGES.filter(screen => !guestPages.has(screen))) {
    await page.goto(`/entrepreneur/${screen}`);
    await expect(page).toHaveURL(new RegExp(`/entrepreneur/${screen}$`));
    await expect(page.getByText('Demo preview:', { exact: false })).toBeVisible();
    expect((await page.locator('body').innerText()).length, `${screen} rendered blank`).toBeGreaterThan(100);
  }
  expect(pageErrors).toEqual([]);
});

test('the demo registration flow keeps the source screens and returns to login', async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto('/entrepreneur/login');
  await page.getByRole('button', { name: 'Sign up first' }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/signup-email$/);
  await page.getByPlaceholder('Enter your email ID').fill('registration@example.com');
  await page.getByRole('button', { name: 'Send OTP' }).click();
  await page.getByPlaceholder('Enter OTP').fill('123456');
  await page.getByRole('button', { name: 'Verify OTP' }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/signup-register$/);
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
  await expect(page).toHaveURL(/\/entrepreneur\/signup-success$/);
  await expect(page.getByText('Registration Successful', { exact: false })).toBeVisible();
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
  await expect(page).toHaveURL(/\/entrepreneur\/my-businesses$/);
  await page.goto('/entrepreneur/e11-doc-centre');
  const header = page.locator('table thead tr').first();
  await expect(header).toBeVisible();
  expect(await header.evaluate(element => getComputedStyle(element).backgroundColor)).toBe('rgb(248, 249, 251)');
});

test('registration details require completing the preceding OTP screen', async ({ page }) => {
  await page.goto('/entrepreneur/signup-register');
  await expect(page).toHaveURL(/\/entrepreneur\/signup-email$/);
  await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
});

test('header login menu opens by click and links to both portals', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Login / Register' }).click();
  await expect(page.getByRole('menuitem', { name: 'Industrial Login' })).toBeVisible();
  await expect(page.getByRole('menuitem', { name: 'Government Login' })).toHaveAttribute('href', '/department/login');
});
