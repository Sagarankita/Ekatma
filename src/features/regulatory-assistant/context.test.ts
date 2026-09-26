import { describe, expect, it } from 'vitest';
import { departmentPageContext, entrepreneurPageContext, globalAssistantContext, inlineContext } from './context';

describe('central assistant context resolver', () => {
  it.each([
    ['/entrepreneur/businesses/BP-004', 'dashboard', { businessId: 'BP-004' }],
    ['/entrepreneur/businesses/BP-004/requirements/REQ-17', 'requirement-detail', { businessId: 'BP-004', requirementId: 'REQ-17' }],
    ['/entrepreneur/businesses/BP-004/documents/DOC-2', 'document-detail', { businessId: 'BP-004', documentId: 'DOC-2' }],
    ['/entrepreneur/businesses/BP-004/applications/new', 'application-workspace', { businessId: 'BP-004' }],
    ['/entrepreneur/businesses/BP-004/applications/APP-9', 'application-detail', { businessId: 'BP-004', applicationId: 'APP-9' }],
    ['/entrepreneur/businesses/BP-004/compliance/CPL-3', 'compliance-detail', { businessId: 'BP-004', complianceId: 'CPL-3' }],
    ['/entrepreneur/businesses/BP-004/incentives', 'incentive-centre', { businessId: 'BP-004' }],
    ['/entrepreneur/businesses/BP-004/incentives/portfolio', 'incentive-portfolio', { businessId: 'BP-004' }],
    ['/entrepreneur/businesses/BP-004/incentives/portfolio/PSI-2019', 'incentive-detail', { businessId: 'BP-004', incentiveId: 'PSI-2019' }],
    ['/entrepreneur/businesses/BP-004/incentives/claim-readiness', 'claim-readiness', { businessId: 'BP-004' }],
    ['/entrepreneur/businesses/BP-004/incentives/claims/CLM-2026-001', 'claim-tracker', { businessId: 'BP-004', claimId: 'CLM-2026-001' }],
    ['/entrepreneur/businesses/BP-004/incentives/policy-updates', 'policy-updates', { businessId: 'BP-004' }],
  ])('maps %s', (route, pageType, entities) => {
    const context = entrepreneurPageContext(route);
    expect(context.pageType).toBe(pageType);
    expect(context.entities).toEqual(entities);
  });

  it.each([
    ['/department/applications/APP-1', 'application-detail', { applicationId: 'APP-1' }],
    ['/department/applications/APP-1/scrutiny-workbench', 'scrutiny', { applicationId: 'APP-1' }],
    ['/department/applications/APP-1/document/DOC-8', 'document-detail', { applicationId: 'APP-1', documentId: 'DOC-8' }],
    ['/department/regchng', 'regulatory-changes', {}],
  ])('maps %s', (route, pageType, entities) => {
    const context = departmentPageContext(route);
    expect(context.pageType).toBe(pageType);
    expect(context.entities).toEqual(entities);
  });

  it('never invents IDs for collection and create routes', () => {
    expect(entrepreneurPageContext('/entrepreneur/businesses/BP-004/applications').entities).toEqual({ businessId: 'BP-004' });
    expect(entrepreneurPageContext('/entrepreneur/businesses/new').entities).toEqual({});
    expect(entrepreneurPageContext('/entrepreneur/businesses/BP-004/incentives/claims').entities).toEqual({ businessId: 'BP-004' });
  });

  it('clears stale child entities when a parent changes', () => {
    const oldClaim = entrepreneurPageContext('/entrepreneur/businesses/BP-004/incentives/claims/CLM-1');
    const switched = inlineContext(oldClaim, { entities: { businessId: 'BP-005' }, label: 'New business' });
    expect(switched.entities).toEqual({ businessId: 'BP-005' });

    const oldDocument = departmentPageContext('/department/applications/APP-1/document/DOC-1');
    const newApplication = inlineContext(oldDocument, { entities: { applicationId: 'APP-2' }, label: 'New application' });
    expect(newApplication.entities).toEqual({ applicationId: 'APP-2' });
  });

  it('global mode retains only safe parent selection', () => {
    const page = entrepreneurPageContext('/entrepreneur/businesses/BP-004/incentives/claims/CLM-1');
    expect(globalAssistantContext(page)).toMatchObject({ mode: 'global', pageType: 'global', entities: { businessId: 'BP-004' } });
  });
});
