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

  it('automatically enrolls ongoing obligations from source approval CTE-2026-MPCB-41872 without manual discovery', () => {
    const obligations = listComplianceForBusiness('BP-004');
    const mpcbObligations = obligations.filter(o => o.sourceApprovalId === 'CTE-2026-MPCB-41872');

    expect(mpcbObligations.map(o => o.id)).toEqual(['CPL-001', 'CPL-002', 'CPL-003', 'CPL-004']);

    for (const obl of mpcbObligations) {
      // 1. Obligation name
      expect(obl.name).toBeDefined();
      expect(obl.name.length).toBeGreaterThan(5);

      // 2. Due date
      expect(obl.dueDate).toBeDefined();

      // 3. Frequency
      expect(obl.frequency).toBeDefined();
      expect(obl.frequency.length).toBeGreaterThan(3);

      // 4. Source approval
      expect(obl.sourceApprovalId).toBe('CTE-2026-MPCB-41872');

      // 5. Required action
      expect(obl.actionRequired).toBeDefined();
      expect(obl.actionRequired!.length).toBeGreaterThan(10);

      // 6. Status
      expect(['Compliant', 'Due Soon', 'Overdue', 'Action Required', 'Under Verification']).toContain(obl.status);
    }
  });

  it('renders Compliance Dashboard answering WHAT IS DUE, OVERDUE, ACTION, UPCOMING with 4 distinct sections', () => {
    const obligations = listComplianceForBusiness('BP-004');
    const html = renderToStaticMarkup(createElement(E24CompliancePage, {
      obligations,
      onBack: () => {},
      onGoToObligation: () => {},
      onGoToE11: () => {},
    }));

    // The 4 Core Questions
    expect(html).toContain('WHAT NEEDS ACTION?');
    expect(html).toContain('WHAT IS DUE?');
    expect(html).toContain('WHAT IS OVERDUE?');
    expect(html).toContain('WHAT IS UPCOMING?');

    // The 4 Clear Sections
    expect(html).toContain('Action Required');
    expect(html).toContain('Due Soon');
    expect(html).toContain('Upcoming');
    expect(html).toContain('Completed / Compliant');

    // Obligation Items mapped correctly
    expect(html).toContain('ETP Commissioning Report');
    expect(html).toContain('Factory Registration Renewal');
    expect(html).toContain('Annual Environmental Audit Report');
    expect(html).toContain('Fire NOC Renewal');
  });

  it('renders Compliance Detail with all 9 core criteria and obvious primary action', () => {
    // 1. Evidence upload obligation: CPL-001
    const htmlCpl1 = renderToStaticMarkup(createElement(E25ComplianceDetailPage, {
      obligationId: 'CPL-001',
      onBack: () => {},
      onGoToE24: () => {},
      onGoToE11: () => {},
      onGoToDocDetail: () => {},
    }));

    // 9 Core Fields
    expect(htmlCpl1).toContain('1. Obligation');
    expect(htmlCpl1).toContain('2. Source Approval');
    expect(htmlCpl1).toContain('3. Due Date');
    expect(htmlCpl1).toContain('4. Frequency');
    expect(htmlCpl1).toContain('5. Required Documents');
    expect(htmlCpl1).toContain('6. Previous Submission');
    expect(htmlCpl1).toContain('7. Current Status');
    expect(htmlCpl1).toContain('8. Verification');
    expect(htmlCpl1).toContain('9. Next Due Date');

    // Obvious primary action for CPL-001: Upload Evidence
    expect(htmlCpl1).toContain('Upload Evidence');

    // Progressive disclosure
    expect(htmlCpl1).toContain('Legal Basis &amp; Regulatory Source');

    // 2. Renewal obligation: CPL-006
    const htmlCpl6 = renderToStaticMarkup(createElement(E25ComplianceDetailPage, {
      obligationId: 'CPL-006',
      onBack: () => {},
      onGoToE24: () => {},
      onGoToE11: () => {},
      onGoToDocDetail: () => {},
    }));
    expect(htmlCpl6).toContain('Renew');

    // 3. Return obligation: CPL-003
    const htmlCpl3 = renderToStaticMarkup(createElement(E25ComplianceDetailPage, {
      obligationId: 'CPL-003',
      onBack: () => {},
      onGoToE24: () => {},
      onGoToE11: () => {},
      onGoToDocDetail: () => {},
    }));
    expect(htmlCpl3).toContain('Submit Return');

    // 4. Compliant obligation: CPL-005
    const htmlCpl5 = renderToStaticMarkup(createElement(E25ComplianceDetailPage, {
      obligationId: 'CPL-005',
      onBack: () => {},
      onGoToE24: () => {},
      onGoToE11: () => {},
      onGoToDocDetail: () => {},
    }));
    expect(htmlCpl5).toContain('View Requirement');
  });
});

