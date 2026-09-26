import { expect, test } from '@playwright/test';
import { ENTREPRENEUR_ROUTES } from '../src/lib/routes/entrepreneur';

test('canonical Entrepreneur route builders preserve source-backed business identities', () => {
  expect(ENTREPRENEUR_ROUTES.business('BP-002')).toBe('/entrepreneur/businesses/BP-002');
  expect(ENTREPRENEUR_ROUTES.application('BP-001', 'APP-MPCB-2026-4892')).toBe('/entrepreneur/businesses/BP-001/applications/APP-MPCB-2026-4892');
});

test('incentive workspace route builders generate correct static paths', () => {
  const b = 'BP-004';
  expect(ENTREPRENEUR_ROUTES.incentives(b)).toBe('/entrepreneur/businesses/BP-004/incentives');
  expect(ENTREPRENEUR_ROUTES.incentiveCentre(b)).toBe('/entrepreneur/businesses/BP-004/incentives/centre');
  expect(ENTREPRENEUR_ROUTES.incentiveCalculator(b)).toBe('/entrepreneur/businesses/BP-004/incentives/calculator');
  expect(ENTREPRENEUR_ROUTES.incentiveCalculatorQuestionnaire(b)).toBe('/entrepreneur/businesses/BP-004/incentives/calculator/questionnaire');
  expect(ENTREPRENEUR_ROUTES.incentivePortfolio(b)).toBe('/entrepreneur/businesses/BP-004/incentives/portfolio');
  expect(ENTREPRENEUR_ROUTES.incentivePortfolioDetail(b, 'PSI-2019')).toBe('/entrepreneur/businesses/BP-004/incentives/portfolio/PSI-2019');
  expect(ENTREPRENEUR_ROUTES.incentiveClaimList(b)).toBe('/entrepreneur/businesses/BP-004/incentives/claims');
});
