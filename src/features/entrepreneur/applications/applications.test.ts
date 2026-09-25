import { describe, expect, it } from 'vitest';
import {
  findTrackerAppById,
  findTrackerAppForBusiness,
  listTrackerAppsForBusiness,
  listInspectionsForBusiness,
  findQueryByAppId,
  findInspectionById,
  findInspectionDocumentForBusiness,
  findDecisionByAppId,
  TRACKER_APPS,
  E15_ISSUES,
  E16_ROWS,
} from './data';

describe('Applications data models and lookup contracts', () => {
  it('looks up tracker applications by exact canonical appId', () => {
    const cte = findTrackerAppById('APP-2026-MPCB-00412');
    expect(cte).toBeDefined();
    expect(cte?.dept).toBe('MPCB');
    expect(cte?.service).toBe('Consent to Establish');

    const midc = findTrackerAppById('APP-2026-MIDC-00187');
    expect(midc).toBeDefined();
    expect(midc?.dept).toBe('MIDC');

    const fire = findTrackerAppById('APP-2026-FIRE-00093');
    expect(fire).toBeDefined();
    expect(fire?.dept).toBe('Fire');
  });

  it('shows only applications genuinely bound to the requested business', () => {
    expect(listTrackerAppsForBusiness('BP-001').map(app => app.appId)).toEqual([
      'APP-MPCB-2026-4892',
      'APP-FAC-2026-3371',
      'APP-MIDC-2026-1190',
    ]);
    expect(listTrackerAppsForBusiness('BP-002')).toEqual([]);
    expect(findTrackerAppForBusiness('BP-001', 'APP-2026-MPCB-00412')).toBeUndefined();
    expect(findTrackerAppForBusiness('BP-002', 'APP-MPCB-2026-4892')).toBeUndefined();
    expect(findTrackerAppForBusiness('BP-001', 'APP-MPCB-2026-4892')?.appId).toBe('APP-MPCB-2026-4892');
    expect(listInspectionsForBusiness('BP-001')).toEqual([]);
  });

  it('rejects internal slugs, reserved names, and unsubmitted dashes', () => {
    expect(findTrackerAppById('app-mpcb-cte')).toBeUndefined();
    expect(findTrackerAppById('—')).toBeUndefined();
    expect(findTrackerAppById('default')).toBeUndefined();
    expect(findTrackerAppById('sample')).toBeUndefined();
    expect(findTrackerAppById('temp')).toBeUndefined();
    expect(findTrackerAppById('current')).toBeUndefined();
    expect(findTrackerAppById('APP-999-NONEXISTENT')).toBeUndefined();
  });

  it('provides static validation issues and consistency rows', () => {
    expect(E15_ISSUES.length).toBeGreaterThan(0);
    expect(E15_ISSUES.every(i => Boolean(i.section && i.label && i.severity))).toBe(true);

    expect(E16_ROWS.length).toBeGreaterThan(0);
    expect(E16_ROWS.some(r => r.applications.some(a => a.status === 'review'))).toBe(true);
  });

  it('resolves exact child records without first-record fallbacks', () => {
    expect(findQueryByAppId('APP-2026-MPCB-00412')?.queryId).toBe('QRY-001');
    expect(findQueryByAppId('APP-2026-MIDC-00187')).toBeUndefined();

    expect(findDecisionByAppId('APP-2026-MPCB-00412')?.decisionId).toBe('DEC-2026-MPCB-00412');
    expect(findDecisionByAppId('APP-2026-FIRE-00093')).toBeUndefined();

    expect(findInspectionById('INS-001')?.departments).toContain('MIDC');
    expect(findInspectionById('INS-002')?.departments).toContain('MPCB');
    expect(findInspectionById('INS-999')).toBeUndefined();
  });

  it('only opens inspection documents with an exact source label and business binding', () => {
    expect(findInspectionDocumentForBusiness('BP-004', 'INS-001', 'DOC-002')?.id).toBe('DOC-002');
    expect(findInspectionDocumentForBusiness('BP-004', 'INS-001', 'DOC-003')).toBeUndefined();
    expect(findInspectionDocumentForBusiness('BP-004', 'INS-001', 'DOC-007')).toBeUndefined();
    expect(findInspectionDocumentForBusiness('BP-001', 'INS-001', 'DOC-002')).toBeUndefined();
  });
});
