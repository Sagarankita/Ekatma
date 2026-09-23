import { test, expect } from '@playwright/test';

test.describe('Prompt 1 Department routing', () => {
  test.describe.configure({ timeout: 120_000 });
  test.beforeEach(async ({ context }) => {
    await context.addInitScript(() => localStorage.setItem('dept_auth', 'true'));
  });

  test('preserves all sidebar destinations', async ({ page }) => {
    await page.goto('/department');
    const navigation = page.getByRole('navigation', { name: 'Department module navigation' });
    for (const [label, path] of [
      ['My Queue', '/queue'], ['Applications', '/search'], ['Service Catalogue', '/services'],
      ['Inspection Queue', '/inspection-queue'], ['Scrutiny', '/scrutiny'], ['Inspections', '/inspections'],
      ['Queries / Deficiencies', '/queries'], ['Decisions', '/decisions'], ['SLA & Escalations', '/sla'],
      ['Grievances', '/grievances'], ['Regulatory Assistant', '/regasst'], ['Analytics', '/analytics'],
      ['Regulatory Changes', '/regchng'], ['Workload', '/workload'], ['Audit / History', '/audit'],
      ['Department Home', ''],
    ]) {
      const item = navigation.getByRole('button', { name: label, exact: true });
      await item.click();
      await expect(page).toHaveURL(`/department${path}`);
      await expect(item).toHaveAttribute('aria-current', 'page');
    }
  });

  test('home actions and both queue controls preserve distinct row IDs', async ({ page }) => {
    for (const applicationId of ['APP-MIDC-2048', 'APP-MIDC-2019']) {
      await page.goto('/department');
      await page.getByRole('table', { name: 'My action items' }).getByRole('row').filter({ hasText: applicationId }).getByRole('button').click();
      await expect(page).toHaveURL(`/department/applications/${applicationId}`);
    }
    for (const control of ['id', 'open']) {
      for (const applicationId of ['APP-MIDC-2051', 'APP-MIDC-1987']) {
        await page.goto('/department/queue');
        const row = page.getByRole('table', { name: 'Application queue' }).getByRole('row').filter({ hasText: applicationId });
        await row.getByRole('button', { name: control === 'id' ? applicationId : 'Open', exact: true }).click();
        await expect(page).toHaveURL(`/department/applications/${applicationId}`);
        await expect(page.getByRole('navigation', { name: 'Department module navigation' }).getByRole('button', { name: 'Applications', exact: true })).toHaveAttribute('aria-current', 'page');
        await page.reload();
        await expect(page).toHaveURL(`/department/applications/${applicationId}`);
      }
    }
  });

  test('header search seeds results and search actions preserve identity', async ({ page }) => {
    await page.goto('/department');
    const headerSearch = page.getByRole('searchbox', { name: 'Search application ID, business or service' });
    await headerSearch.fill('APP-MIDC-2051');
    await headerSearch.press('Enter');
    await expect(page).toHaveURL('/department/search?q=APP-MIDC-2051');
    await expect(page.getByRole('searchbox', { name: 'Search applications', exact: true })).toHaveValue('APP-MIDC-2051');
    await page.getByRole('button', { name: 'Open Application →', exact: true }).click();
    await expect(page).toHaveURL('/department/applications/APP-MIDC-2051');
    for (const control of ['Open', 'APP-MIDC-2019']) {
      await page.goto('/department/search?q=Nova');
      await page.getByRole('table', { name: 'Search results' }).getByRole('row').filter({ hasText: 'APP-MIDC-2019' }).getByRole('button', { name: control, exact: true }).click();
      await expect(page).toHaveURL('/department/applications/APP-MIDC-2019');
    }
    await headerSearch.fill('');
    await headerSearch.press('Enter');
    await expect(page).toHaveURL('/department/search');
  });

  test('header assistant, notifications and logout navigate', async ({ page }) => {
    await page.goto('/department');
    await page.getByRole('button', { name: 'Regulatory Assistant — AI-assisted regulatory reference' }).click();
    await expect(page).toHaveURL('/department/regasst');
    await page.getByRole('button', { name: 'Notifications — 4 unread' }).click();
    await page.getByRole('button', { name: 'Open →', exact: true }).nth(3).click();
    await expect(page).toHaveURL('/department/applications/MIDC-APP-2026-00431/query-history');
    await page.getByRole('button', { name: 'Sign out', exact: true }).click();
    await expect(page).toHaveURL('/department/login');
    expect(await page.evaluate(() => localStorage.getItem('dept_auth'))).toBeNull();
  });

  test('scrutiny preserves the selected application', async ({ page }) => {
    await page.goto('/department/scrutiny');
    await page.getByRole('row').filter({ hasText: 'MIDC-APP-2026-00391' }).getByRole('button', { name: 'OPEN', exact: true }).click();
    await expect(page).toHaveURL('/department/applications/MIDC-APP-2026-00391');
  });

  test('both inspection entries preserve application and inspection IDs', async ({ page }) => {
    for (const path of ['/department/inspection-queue', '/department/inspections']) {
      await page.goto(path);
      await page.getByRole('row').filter({ hasText: 'INSP-2026-00391' }).getByRole('button', { name: 'View Plan →', exact: true }).click();
      await expect(page).toHaveURL('/department/applications/MIDC-APP-2026-00391/inspections/INSP-2026-00391/plan');
      await page.goto(path);
      await page.getByRole('row').filter({ hasText: 'INSP-2026-00372' }).click();
      await page.getByRole('button', { name: 'View Query History → M19', exact: true }).click();
      await expect(page).toHaveURL('/department/applications/MIDC-APP-2026-00372/query-history');
    }
  });

  test('decision cards use their displayed sample and fixture child IDs', async ({ page }) => {
    for (const [button, suffix] of [
      ['Open Decision Workspace →', 'decision-workspace'],
      ['M27 Dep. Update', 'dependencies/midc-bldg/update'],
      ['M28 Compliance →', 'compliance/COND-001'],
    ]) {
      await page.goto('/department/decisions');
      await page.getByRole('button', { name: button, exact: true }).click();
      await expect(page).toHaveURL(`/department/applications/MIDC-APP-2026-00418/${suffix}`);
    }
  });

  test('oversight Open actions use the selected row or record', async ({ page }) => {
    await page.goto('/department/sla');
    await page.getByRole('row').filter({ hasText: 'MIDC-APP-2026-00421' }).getByRole('button', { name: 'View', exact: true }).click();
    await page.getByRole('button', { name: 'Open Application → M06', exact: true }).click();
    await expect(page).toHaveURL('/department/applications/MIDC-APP-2026-00421');
    await page.goto('/department/grievances');
    await page.getByRole('button').filter({ hasText: 'GRV-2026-00009' }).click();
    await page.getByRole('button', { name: 'Open Application → M06', exact: true }).click();
    await expect(page).toHaveURL('/department/applications/MIDC-APP-2026-00431');
    await page.goto('/department/regchng/impact');
    await page.getByRole('row').filter({ hasText: 'MIDC-APP-2026-00415' }).getByRole('button', { name: 'Open App →', exact: true }).click();
    await expect(page).toHaveURL('/department/applications/MIDC-APP-2026-00415');
    await page.goto('/department/audit');
    await page.getByRole('button').filter({ hasText: 'Decision Recorded' }).click();
    await page.getByRole('button', { name: 'Open Application → M06', exact: true }).click();
    await expect(page).toHaveURL('/department/applications/MIDC-APP-2026-00418');
  });
});
