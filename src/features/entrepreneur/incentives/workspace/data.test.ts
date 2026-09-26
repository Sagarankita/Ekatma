import { describe, expect, it } from 'vitest';
import { getCurrentFilingWindow, getIncentiveClaims, getIncentiveDetailSchemes } from './data';

describe('incentive workspace canonical adapters', () => {
  it('enriches the matching portfolio scheme with canonical E27 details', () => {
    const scheme = getIncentiveDetailSchemes('BP-004').find(item => item.id === 'PSI-2019');
    expect(scheme?.claimCycle).toContain('Milestone-based Claim');
    expect(scheme?.eligibilityConditions).toHaveLength(4);
  });

  it('maps business-scoped E28 claims without leaking them to another business', () => {
    const claims = getIncentiveClaims('BP-004');
    expect(claims.find(item => item.id === 'CLM-2027-002')).toMatchObject({
      status: 'query-raised',
      correctionReason: expect.stringContaining('date discrepancy'),
    });
    expect(getIncentiveClaims('BP-002')).toEqual([]);
  });

  it('derives the current filing window from the canonical active claim', () => {
    expect(getCurrentFilingWindow('BP-004')).toMatchObject({
      period: 'Oct 2026 – Mar 2027',
      filingWindow: 'Open for correction',
      readiness: '1 item remaining',
    });
  });
});
