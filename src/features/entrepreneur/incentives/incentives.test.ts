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

  it('renders concise decision prompts and lifecycle categories on E26', () => {
    const schemes = listIncentivesForBusiness('BP-004');
    const html = renderToStaticMarkup(createElement(E26IncentivesPage, {
      schemes, onBack: () => {}, onGoToScheme: () => {}, onGoToE11: () => {},
    }));

    expect(html).toContain('Potential matches');
    expect(html).toContain('Why this applies');
    expect(html).toContain('Needs verification');
    expect(html).toContain('Before applying');
    expect(html).toContain('After application');

    // 5 Lifecycle Categories
    expect(html).toContain('Potentially relevant');
    expect(html).toContain('Needs verification');
    expect(html).toContain('Application in progress');
    expect(html).toContain('Approved');
    expect(html).toContain('Claim / Disbursement');

    expect(html).toContain('How incentive schemes work');

    // Non-finality disclaimer
    expect(html).toContain('Preliminary eligibility note');
  });

  it('renders all 7 structured benefit fields and post-application lifecycle on E27', async () => {
    const { E27IncentiveDetailPage } = await import('./IncentiveScreens');
    const html = renderToStaticMarkup(createElement(E27IncentiveDetailPage, {
      schemeId: 'PSI-2019',
      canOpenClaims: true,
      canOpenDocuments: true,
      onBack: () => {},
      onGoToE26: () => {},
      onGoToE11: () => {},
      onGoToE28: () => {},
    }));

    // 7 Benefit Fields
    expect(html).toContain('Benefit Details');
    expect(html).toContain('Estimated Quantum');
    expect(html).toContain('Why It Appears Relevant');
    expect(html).toContain('Conditions');
    expect(html).toContain('Verified Conditions');
    expect(html).toContain('Needs Verification');
    expect(html).toContain('Documents (Required Evidence)');
    expect(html).toContain('Application / Claim Action');

    // Post-application lifecycle
    expect(html).toContain('What Happens After Application?');
    expect(html).toContain('Scrutiny &amp; Verification');
    expect(html).toContain('Eligibility Certificate');
    expect(html).toContain('Claim Lodgement');
    expect(html).toContain('Disbursement');

    // Non-finality notice
    expect(html).toContain('Preliminary match only. Final eligibility is subject to scheme rules');
  });
});
