import { describe, expect, it } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { E26IncentivesPage, E28IncentiveClaimsPage } from './IncentiveScreens';
import { findIncentiveById, findIncentiveForBusiness, listClaimsForBusiness, listClaimsForScheme, listIncentivesForBusiness, SAMPLE_CLAIMS } from './data';

describe('incentive identity', () => {
  it('retains exact schemes and claims without attaching Sahyadri data to BP-001', () => {
    expect(findIncentiveById('PSI-2019')?.name).toBe('Package Scheme of Incentives 2019 (PSI)');
    expect(findIncentiveById('PLI-PHARMA')?.category).toBe('Production Incentive');
    expect(findIncentiveById('MISSING')).toBeUndefined();
    expect(findIncentiveForBusiness('BP-001', 'PSI-2019')).toBeUndefined();
    expect(listIncentivesForBusiness('BP-001')).toEqual([]);
    expect(listIncentivesForBusiness('BP-004').map(scheme => scheme.id)).toEqual(['PSI-2019', 'MSME-CLSS', 'MAITRI-FAST', 'PLI-PHARMA']);
    expect(SAMPLE_CLAIMS.map(claim => claim.id)).toEqual(['CLM-2027-001', 'CLM-2027-002', 'CLM-2026-001']);
  });
  it('limits the source claims to the PSI scheme', () => {
    expect(listClaimsForScheme('PSI-2019').map(claim => claim.id)).toEqual(SAMPLE_CLAIMS.map(claim => claim.id));
    expect(listClaimsForScheme('MSME-CLSS')).toEqual([]);
  });
  it('requires an exact business binding for claim rows', () => {
    expect(listClaimsForBusiness('BP-001', 'PSI-2019')).toEqual([]);
    expect(listClaimsForBusiness('BP-002', 'PSI-2019')).toEqual([]);
    expect(listClaimsForBusiness('BP-004', 'PSI-2019').map(claim => claim.id)).toEqual(['CLM-2027-001', 'CLM-2027-002', 'CLM-2026-001']);
    expect(listClaimsForBusiness('BP-004', 'MSME-CLSS')).toEqual([]);
  });
  it('shows only schemes supplied for the resolved business', () => {
    const html = renderToStaticMarkup(createElement(E26IncentivesPage, {
      schemes: [], onBack: () => {}, onGoToScheme: () => {}, onGoToE11: () => {},
    }));
    expect(html).not.toContain('Package Scheme of Incentives 2019 (PSI)');
    expect(html).toContain('No schemes match');
  });

  it('does not offer application query routes for an unrelated incentive claim', () => {
    const html = renderToStaticMarkup(createElement(E28IncentiveClaimsPage, {
      schemeId: 'PSI-2019', claims: SAMPLE_CLAIMS, onBack: () => {}, onGoToE26: () => {}, onGoToE27: () => {},
      onGoToE11: () => {}, onGoToE12: () => {},
    }));
    expect(html).toMatch(/disabled[^>]*>Respond to Query/);
    expect(html).toContain('claim query or correction relationship');
  });
});
