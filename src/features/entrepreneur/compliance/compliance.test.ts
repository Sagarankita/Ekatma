import { describe, expect, it } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { E24CompliancePage, E25ComplianceDetailPage } from './ComplianceScreens';
import { findComplianceById, findComplianceForBusiness, findSourceDecisionForBusiness, listComplianceForBusiness } from './data';

describe('compliance identity', () => {
  it('retains exact Sahyadri obligations without assigning them to BP-001', () => {
    expect(findComplianceById('CPL-001')?.name).toBe('ETP Commissioning Report');
    expect(findComplianceById('CPL-006')?.name).toBe('Factory Registration Renewal');
    expect(findComplianceById('CPL-999')).toBeUndefined();
    expect(findComplianceForBusiness('BP-001', 'CPL-001')).toBeUndefined();
    expect(listComplianceForBusiness('BP-001')).toEqual([]);
    expect(listComplianceForBusiness('BP-004').map(obligation => obligation.id)).toEqual(['CPL-001', 'CPL-002', 'CPL-003', 'CPL-004', 'CPL-005', 'CPL-006']);
  });

  it('requires an exact business, approval, decision, and application chain for source navigation', () => {
    expect(findSourceDecisionForBusiness('BP-001', 'CPL-001')).toBeUndefined();
    expect(findSourceDecisionForBusiness('BP-002', 'CPL-005')).toBeUndefined();
    expect(findSourceDecisionForBusiness('BP-003', 'CPL-999')).toBeUndefined();
    expect(findSourceDecisionForBusiness('BP-004', 'CPL-001')).toEqual({ applicationId: 'APP-2026-MPCB-00412', decisionId: 'DEC-2026-MPCB-00412' });
    expect(findSourceDecisionForBusiness('BP-004', 'CPL-005')).toBeUndefined();
  });

  it('renders an unresolved source approval as a disabled control with an explanation', () => {
    const html = renderToStaticMarkup(createElement(E25ComplianceDetailPage, {
      obligationId: 'CPL-001', onBack: () => {}, onGoToE24: () => {},
      onGoToE11: () => {}, onGoToDocDetail: () => {},
    }));
    expect(html).toMatch(/disabled[^>]*>View Source Approval/);
    expect(html).toContain('exact business, application, and decision relationship');
  });
  it('shows only obligations supplied for the resolved business', () => {
    const html = renderToStaticMarkup(createElement(E24CompliancePage, {
      obligations: [], onBack: () => {}, onGoToObligation: () => {}, onGoToE11: () => {},
    }));
    expect(html).not.toContain('ETP Commissioning Report');
    expect(html).toContain('No obligations match');
  });
});
