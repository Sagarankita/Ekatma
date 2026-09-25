import { describe, expect, it } from 'vitest';
import {
  DEEP_SCREEN_BUSINESS_IDENTITY,
  ENTREPRENEUR_BUSINESSES,
  findBusinessById,
  findBusinessEntity,
  findEntityIdentity,
  findApplicationChild,
  resolveLegacyBusinessId,
} from './catalog';
import {
  parseBusinessRouteParam,
  parseEntityRouteParam,
  requireBusinessEntityRouteParam,
  requireBusinessRouteParam,
  requireApplicationChildRouteParam,
  requireDeepScreenBusinessRouteParam,
} from './route-params';

describe('Entrepreneur canonical business identity', () => {
  it('adds a distinct, explicitly internal demo business identity', () => {
    expect(ENTREPRENEUR_BUSINESSES.map(business => [business.id, business.name])).toEqual([
      ['BP-001', 'ABC Pharma Pvt Ltd'],
      ['BP-002', 'Konkan Feeds'],
      ['BP-003', 'Sahyadri Electronics Pvt Ltd'],
      ['BP-004', 'Sahyadri Bio-Pharma Pvt Ltd'],
    ]);
  });

  it('maps legacy aliases only where the source business evidence matches', () => {
    expect(resolveLegacyBusinessId('abc-pharma')).toBe('BP-001');
    expect(resolveLegacyBusinessId('konkan-feeds')).toBe('BP-002');
    expect(resolveLegacyBusinessId('pune-auto')).toBeUndefined();
    expect(resolveLegacyBusinessId('unknown')).toBeUndefined();
  });

  it('keeps Sahyadri Bio-Pharma separate with a user-authorized demo identity', () => {
    expect(DEEP_SCREEN_BUSINESS_IDENTITY.name).toBe('Sahyadri Bio-Pharma Pvt Ltd');
    expect(DEEP_SCREEN_BUSINESS_IDENTITY.businessId).toBe('BP-004');
    expect(DEEP_SCREEN_BUSINESS_IDENTITY.status).toBe('internal-demo');
    expect(findBusinessById('BP-004')?.provenance).toContain('User-authorized internal demo');
    expect(findBusinessById('BP-001')?.name).toBe('ABC Pharma Pvt Ltd');
  });
});

describe('Entrepreneur entity identity lookup', () => {
  it('looks up exact canonical IDs and never accepts internal UI keys as application IDs', () => {
    expect(findEntityIdentity('application', 'APP-2026-MPCB-00412')?.label).toBe('MPCB — Consent to Establish');
    expect(findEntityIdentity('application', 'app-mpcb-cte')).toBeUndefined();
    expect(findEntityIdentity('application', '—')).toBeUndefined();
  });

  it('resolves every incentive scheme exposed by the discovery list', () => {
    expect(['PSI-2019', 'MSME-CLSS', 'MAITRI-FAST', 'PLI-PHARMA'].map(id => findEntityIdentity('incentive', id)?.id)).toEqual([
      'PSI-2019',
      'MSME-CLSS',
      'MAITRI-FAST',
      'PLI-PHARMA',
    ]);
  });

  it('does not substitute a first record for an unknown identity', () => {
    expect(findBusinessById('BP-999')).toBeUndefined();
    expect(findEntityIdentity('document', 'DOC-999')).toBeUndefined();
    expect(findEntityIdentity('compliance', 'CPL-999')).toBeUndefined();
  });

  it('binds only Sahyadri deep records to its demo business', () => {
    expect(findEntityIdentity('requirement', 'EST-001')?.businessId).toBe('BP-004');
    expect(findEntityIdentity('document', 'DOC-001')?.businessId).toBe('BP-004');
    expect(findEntityIdentity('application', 'APP-2026-MPCB-00412')?.businessId).toBe('BP-004');
    expect(findBusinessEntity('compliance', 'BP-004', 'CPL-001')?.id).toBe('CPL-001');
    expect(findBusinessEntity('incentive', 'BP-004', 'PSI-2019')?.id).toBe('PSI-2019');
    expect(findBusinessEntity('claim', 'BP-004', 'CLM-2027-001')?.parentId).toBe('PSI-2019');
    expect(findBusinessEntity('requirement', 'BP-001', 'EST-001')).toBeUndefined();
    expect(findBusinessEntity('requirement', 'BP-002', 'EST-001')).toBeUndefined();
    expect(findBusinessEntity('document', 'BP-001', 'DOC-001')).toBeUndefined();
    expect(findBusinessEntity('document', 'BP-002', 'DOC-001')).toBeUndefined();
    expect(findBusinessEntity('application', 'BP-001', 'APP-2026-MPCB-00412')).toBeUndefined();
  });

  it('requires an application child to match its exact recorded parent', () => {
    expect(findApplicationChild('query', findBusinessById('BP-004')!.id, 'APP-2026-MPCB-00412', 'QRY-001')?.id).toBe('QRY-001');
    expect(findApplicationChild('query', findBusinessById('BP-004')!.id, 'APP-2026-MIDC-00187', 'QRY-001')).toBeUndefined();
    expect(findApplicationChild('decision', findBusinessById('BP-004')!.id, 'APP-2026-MPCB-00412', 'DEC-2026-MPCB-00412')?.id).toBe('DEC-2026-MPCB-00412');
  });

  it('resolves records whose source explicitly identifies BP-001', () => {
    expect(findBusinessEntity('application', 'BP-001', 'APP-MPCB-2026-4892')?.label).toBe('MPCB — Consent to Establish (CTE)');
  });

  it('keeps user-global notifications unbound while retaining explicit related applications', () => {
    expect(findEntityIdentity('notification', 'N-001')).toMatchObject({ businessId: null, parentId: 'APP-MPCB-2026-4892', sourceContext: 'user-global' });
    expect(findEntityIdentity('notification', 'N-005')).toMatchObject({ businessId: null, sourceContext: 'user-global' });
    expect(findBusinessEntity('notification', 'BP-001', 'N-001')).toBeUndefined();
  });
});

describe('Entrepreneur route-param validation', () => {
  it('accepts canonical portfolio IDs and rejects aliases, malformed IDs, and unknown IDs', () => {
    expect(parseBusinessRouteParam('BP-002')).toBe('BP-002');
    expect(parseBusinessRouteParam('abc-pharma')).toBeUndefined();
    expect(parseBusinessRouteParam('BP-999')).toBeUndefined();
    expect(parseBusinessRouteParam('default')).toBeUndefined();
  });

  it('accepts only exact known entity IDs', () => {
    expect(parseEntityRouteParam('document', 'DOC-001')).toBe('DOC-001');
    expect(parseEntityRouteParam('document', 'doc-001')).toBeUndefined();
    expect(parseEntityRouteParam('application', 'app-mpcb-cte')).toBeUndefined();
    expect(parseEntityRouteParam('inspection', 'default')).toBeUndefined();
  });

  it('resolves valid App Router params and throws a 404 interrupt for missing or mismatched records', () => {
    expect(requireBusinessRouteParam('BP-001').name).toBe('ABC Pharma Pvt Ltd');
    expect(requireDeepScreenBusinessRouteParam('BP-004').name).toBe('Sahyadri Bio-Pharma Pvt Ltd');
    expect(requireBusinessEntityRouteParam('application', 'BP-001', 'APP-MPCB-2026-4892').id).toBe('APP-MPCB-2026-4892');
    expect(() => requireBusinessEntityRouteParam('document', 'BP-001', 'DOC-001')).toThrow('NEXT_HTTP_ERROR_FALLBACK;404');
    expect(() => requireBusinessEntityRouteParam('requirement', 'BP-001', 'EST-001')).toThrow('NEXT_HTTP_ERROR_FALLBACK;404');
    expect(() => requireBusinessRouteParam('BP-999')).toThrow('NEXT_HTTP_ERROR_FALLBACK;404');
    expect(() => requireBusinessEntityRouteParam('document', 'BP-002', 'DOC-001')).toThrow('NEXT_HTTP_ERROR_FALLBACK;404');
    expect(() => requireBusinessEntityRouteParam('document', 'BP-001', 'DOC-999')).toThrow('NEXT_HTTP_ERROR_FALLBACK;404');
    expect(() => requireApplicationChildRouteParam('query', 'BP-001', 'APP-MPCB-2026-4892', 'QRY-001')).toThrow('NEXT_HTTP_ERROR_FALLBACK;404');
    expect(() => requireDeepScreenBusinessRouteParam('BP-001')).toThrow('NEXT_HTTP_ERROR_FALLBACK;404');
  });
});
