import { expect, test } from '@playwright/test';

test('public choices and login use canonical routes with browser history', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Industrial Login' }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/login$/);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Industrial Login' })).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/entrepreneur\/login$/);
  await page.goto('/');
  await page.getByRole('button', { name: 'Department Login' }).click();
  await expect(page).toHaveURL(/\/department\/login$/);
});

test('registration uses canonical steps and keeps verified email on details refresh', async ({ page }) => {
  await page.goto('/entrepreneur/login');
  await page.getByRole('button', { name: 'Sign up first' }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/register$/);
  await page.getByPlaceholder('Enter your email ID').fill('registration@example.com');
  await page.getByRole('button', { name: 'Send OTP' }).click();
  await page.getByPlaceholder('Enter OTP').fill('123456');
  await page.getByRole('button', { name: 'Verify OTP' }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/register\/details$/);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Complete Registration' })).toBeVisible();
  await expect(page.locator('input[value="registration@example.com"]')).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/entrepreneur\/register$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/entrepreneur\/register\/details$/);
});

test('registration details redirect to OTP when no email was verified in this tab', async ({ page }) => {
  await page.goto('/entrepreneur/register/details');
  await expect(page).toHaveURL(/\/entrepreneur\/register$/);
  await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
});

test('entrepreneur login uses its own demo session key', async ({ page }) => {
  await page.goto('/entrepreneur/login');
  await page.getByPlaceholder('Enter your email ID').fill('demo@example.com');
  await page.getByPlaceholder('Enter your password').fill('demo');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/businesses$/);
  expect(await page.evaluate(() => sessionStorage.getItem('entrepreneur_demo_auth'))).toBe('true');
  expect(await page.evaluate(() => localStorage.getItem('dept_auth'))).toBeNull();
});

test('public footer does not offer dead placeholder links', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('footer a[href="#"]')).toHaveCount(0);
});

test('public accessibility choices survive navigation between extracted routes', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'High Contrast' }).click();
  await page.getByRole('button', { name: 'Increase font size' }).click();
  await page.getByRole('button', { name: 'Industrial Login', exact: true }).click();
  await expect(page).toHaveURL(/\/entrepreneur\/login$/);
  await expect(page.getByRole('button', { name: 'High Contrast' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: 'Increase font size' })).toHaveAttribute('aria-pressed', 'true');
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('button', { name: 'High Contrast' })).toHaveAttribute('aria-pressed', 'true');
});
