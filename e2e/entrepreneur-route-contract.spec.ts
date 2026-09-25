import { expect, test } from '@playwright/test';
import { ENTREPRENEUR_ROUTES } from '../src/lib/routes/entrepreneur';

test('canonical Entrepreneur route builders preserve source-backed business identities', () => {
  expect(ENTREPRENEUR_ROUTES.business('BP-002')).toBe('/entrepreneur/businesses/BP-002');
  expect(ENTREPRENEUR_ROUTES.application('BP-001', 'APP-MPCB-2026-4892')).toBe('/entrepreneur/businesses/BP-001/applications/APP-MPCB-2026-4892');
});
