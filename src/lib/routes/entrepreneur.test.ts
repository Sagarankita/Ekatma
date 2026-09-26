import { describe, expect, it } from 'vitest';
import { ENTREPRENEUR_ROUTES } from './entrepreneur';

describe('Entrepreneur route contract', () => {
  it('builds the approved public, onboarding, and global routes', () => {
    expect(ENTREPRENEUR_ROUTES.login()).toBe('/entrepreneur/login');
    expect(ENTREPRENEUR_ROUTES.register()).toBe('/entrepreneur/register');
    expect(ENTREPRENEUR_ROUTES.registerDetails()).toBe('/entrepreneur/register/details');
    expect(ENTREPRENEUR_ROUTES.registerSuccess()).toBe('/entrepreneur/register/success');
    expect(ENTREPRENEUR_ROUTES.businesses()).toBe('/entrepreneur/businesses');
    expect(ENTREPRENEUR_ROUTES.newBusiness()).toBe('/entrepreneur/businesses/new');
    expect(ENTREPRENEUR_ROUTES.newBusinessBasicRequirements()).toBe('/entrepreneur/businesses/new/basic-requirements');
    expect(ENTREPRENEUR_ROUTES.newBusinessDiscovery()).toBe('/entrepreneur/businesses/new/discovery');
    expect(ENTREPRENEUR_ROUTES.newBusinessScale()).toBe('/entrepreneur/businesses/new/discovery/scale');
    expect(ENTREPRENEUR_ROUTES.newBusinessEnvironmentSafety()).toBe('/entrepreneur/businesses/new/discovery/environment-safety');
    expect(ENTREPRENEUR_ROUTES.newBusinessReview()).toBe('/entrepreneur/businesses/new/review');
    expect(ENTREPRENEUR_ROUTES.notifications()).toBe('/entrepreneur/notifications');
    expect(ENTREPRENEUR_ROUTES.assistant()).toBe('/entrepreneur/assistant');
  });

  it('builds the approved business route families with real child IDs', () => {
    expect(ENTREPRENEUR_ROUTES.business('BP-001')).toBe('/entrepreneur/businesses/BP-001');
    expect(ENTREPRENEUR_ROUTES.profile('BP-001')).toBe('/entrepreneur/businesses/BP-001/profile');
    expect(ENTREPRENEUR_ROUTES.dossier('BP-001')).toBe('/entrepreneur/businesses/BP-001/dossier');
    expect(ENTREPRENEUR_ROUTES.provenance('BP-001')).toBe('/entrepreneur/businesses/BP-001/dossier/provenance');
    expect(ENTREPRENEUR_ROUTES.journey('BP-001')).toBe('/entrepreneur/businesses/BP-001/journey');
    expect(ENTREPRENEUR_ROUTES.documents('BP-001')).toBe('/entrepreneur/businesses/BP-001/documents');
    expect(ENTREPRENEUR_ROUTES.dependencies('BP-001')).toBe('/entrepreneur/businesses/BP-001/dependencies');
    expect(ENTREPRENEUR_ROUTES.applications('BP-001')).toBe('/entrepreneur/businesses/BP-001/applications');
    expect(ENTREPRENEUR_ROUTES.newApplication('BP-001')).toBe('/entrepreneur/businesses/BP-001/applications/new');
    expect(ENTREPRENEUR_ROUTES.applicationPrevalidation('BP-001')).toBe('/entrepreneur/businesses/BP-001/applications/new/prevalidation');
    expect(ENTREPRENEUR_ROUTES.applicationConsistency('BP-001')).toBe('/entrepreneur/businesses/BP-001/applications/new/consistency');
    expect(ENTREPRENEUR_ROUTES.applicationSubmission('BP-001')).toBe('/entrepreneur/businesses/BP-001/applications/new/submission');
    expect(ENTREPRENEUR_ROUTES.application('BP-001', 'APP-MPCB-2026-4892')).toBe('/entrepreneur/businesses/BP-001/applications/APP-MPCB-2026-4892');
    expect(ENTREPRENEUR_ROUTES.inspections('BP-001')).toBe('/entrepreneur/businesses/BP-001/inspections');
    expect(ENTREPRENEUR_ROUTES.compliance('BP-001')).toBe('/entrepreneur/businesses/BP-001/compliance');
    expect(ENTREPRENEUR_ROUTES.incentives('BP-001')).toBe('/entrepreneur/businesses/BP-001/incentives');
    expect(ENTREPRENEUR_ROUTES.incentiveClaims('BP-001')).toBe('/entrepreneur/businesses/BP-001/incentive-claims');
    expect(ENTREPRENEUR_ROUTES.incentiveClaimList('BP-001')).toBe('/entrepreneur/businesses/BP-001/incentives/claims');
    expect(ENTREPRENEUR_ROUTES.regulatoryChanges('BP-001')).toBe('/entrepreneur/businesses/BP-001/regulatory-changes');
    expect(ENTREPRENEUR_ROUTES.changes('BP-001')).toBe('/entrepreneur/businesses/BP-001/changes');
    expect(ENTREPRENEUR_ROUTES.amendments('BP-001')).toBe('/entrepreneur/businesses/BP-001/changes/amendments');
    expect(ENTREPRENEUR_ROUTES.grievances('BP-001')).toBe('/entrepreneur/businesses/BP-001/grievances');
    expect(ENTREPRENEUR_ROUTES.grievances('BP-001', { grievanceId: 'GRV-2026-0003' })).toBe('/entrepreneur/businesses/BP-001/grievances?grievanceId=GRV-2026-0003');
    expect(ENTREPRENEUR_ROUTES.grievances('BP-001', { applicationId: 'APP-MPCB-2026-4892', raise: true })).toBe('/entrepreneur/businesses/BP-001/grievances?applicationId=APP-MPCB-2026-4892&raise=1');
  });

  it('encodes each raw route ID exactly once', () => {
    const rawBusinessId = 'BP /?#% मराठी';
    const rawChildId = 'DOC /?#% मराठी';
    const path = ENTREPRENEUR_ROUTES.document(rawBusinessId, rawChildId);
    const segments = path.split('/');

    expect(segments[3]).toBe(encodeURIComponent(rawBusinessId));
    expect(segments[5]).toBe(encodeURIComponent(rawChildId));
    expect(decodeURIComponent(segments[3])).toBe(rawBusinessId);
    expect(decodeURIComponent(segments[5])).toBe(rawChildId);
    expect(path).not.toMatch(/[?#]/);
    expect(decodeURIComponent(ENTREPRENEUR_ROUTES.business('BP%2F001').split('/')[3])).toBe('BP%2F001');
  });

  it.each(['', '.', '..', 'default', 'sample', 'temp', 'current', ' BP-001', 'BP-001 '])('rejects unusable route identity %j', id => {
    expect(() => ENTREPRENEUR_ROUTES.business(id)).toThrow();
    expect(() => ENTREPRENEUR_ROUTES.document('BP-001', id)).toThrow();
  });
});
