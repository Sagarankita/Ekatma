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
  getApplicationResponsibility,
  getHumanAuthority,
  getApplicationLifecycle,
  SAMPLE_QUERY,
  SAMPLE_DECISION,
  E21_CATEGORIZED_DELTAS,
  E21_UNCHANGED_PRESERVED_FIELDS,
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
    expect(findQueryByAppId('APP-2026-MIDC-00187')?.queryId).toBe('QRY-2026-MIDC-00187');

    expect(findDecisionByAppId('APP-2026-MPCB-00412')?.decisionId).toBe('DEC-2026-MPCB-00412');
    expect(findDecisionByAppId('APP-2026-MIDC-00187')?.decisionId).toBe('DEC-2026-MIDC-00187');
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

  it('categorizes applications into clear responsibility buckets without bureaucratic confusion', () => {
    const mpcb = findTrackerAppById('APP-2026-MPCB-00412')!;
    const midc = findTrackerAppById('APP-2026-MIDC-00187')!;
    const fire = findTrackerAppById('APP-2026-FIRE-00093')!;
    const dish = findTrackerAppById('APP-2026-DISH-00241')!;
    const approved = TRACKER_APPS.find(a => a.status === 'Approved')!;
    const dependent = TRACKER_APPS.find(a => a.actionRequired?.includes('prerequisite') || a.actionRequired?.includes('CTE'))!;

    expect(getApplicationResponsibility(mpcb)).toBe('entrepreneur');
    expect(getApplicationResponsibility(midc)).toBe('entrepreneur');
    expect(getApplicationResponsibility(fire)).toBe('government');
    expect(getApplicationResponsibility(dish)).toBe('government');
    expect(getApplicationResponsibility(approved)).toBe('completed');
    expect(getApplicationResponsibility(dependent)).toBe('department-dependency');
  });

  it('translates internal desk jargon into human-readable authority titles', () => {
    expect(getHumanAuthority('MPCB', 'Desk 4 Bio-Pharma Cell')).toBe('MPCB Environmental Officer');
    expect(getHumanAuthority('MIDC', 'Town Planning Chakan')).toBe('MIDC Planning Department');
    expect(getHumanAuthority('Fire', 'CFO Regional Office')).toBe('Fire Services Officer');
    expect(getHumanAuthority('DISH', 'Factory Inspection Directorate')).toBe('Directorate of Industrial Safety & Health (DISH)');
    expect(getHumanAuthority('Custom Dept', 'Room 102 Desk 3')).toBe('Custom Dept Clearance Officer');
  });

  it('generates dynamic lifecycle stages showing ONLY applicable stages and avoiding generic pending', () => {
    const mpcb = findTrackerAppById('APP-2026-MPCB-00412')!;
    const query = findQueryByAppId(mpcb.appId);
    const inspection = { id: 'INS-002', status: 'Conducted', date: '22 Sep 2026', time: '11:00 AM', site: 'Plot A-42', officer: 'S. Patil', relatedAppIds: [mpcb.appId], type: 'Environmental Audit', checklistCount: 5, observations: [], prepRequirements: [] };
    const decision = findDecisionByAppId(mpcb.appId);

    const mpcbLifecycle = getApplicationLifecycle(mpcb, query, inspection as any, decision);
    expect(mpcbLifecycle.length).toBe(7); // submitted, fee, doc-review, scrutiny, query, inspection, decision
    expect(mpcbLifecycle.some(s => s.id === 'query')).toBe(true);
    expect(mpcbLifecycle.some(s => s.id === 'inspection')).toBe(true);
    expect(mpcbLifecycle.some(s => s.id === 'decision')).toBe(true);

    // Verify stage with query has actionable entrepreneur instructions
    const queryStage = mpcbLifecycle.find(s => s.id === 'query')!;
    expect(queryStage.status).toBe('action-required');
    expect(queryStage.statusLabel).toContain('Action Required');
    expect(queryStage.whatIsNeeded).toContain('Respond to');
    expect(queryStage.actionLabel).toContain('Respond to Query');

    // For Fire NOC (no query raised, inspection scheduled)
    const fire = findTrackerAppById('APP-2026-FIRE-00093')!;
    const fireInspection = { id: 'INS-001', status: 'Scheduled', date: '26 Sep 2026', time: '10:00 AM', site: 'Plot A-42', officer: 'M. Deshmukh', relatedAppIds: [fire.appId], type: 'Fire Safety Inspection', checklistCount: 4, observations: [], prepRequirements: [] };
    const fireLifecycle = getApplicationLifecycle(fire, undefined, fireInspection as any, undefined);

    // Must NOT have query stage!
    expect(fireLifecycle.some(s => s.id === 'query')).toBe(false);
    // Must have inspection stage
    expect(fireLifecycle.some(s => s.id === 'inspection')).toBe(true);
    const fireInspStage = fireLifecycle.find(s => s.id === 'inspection')!;
    expect(fireInspStage.status).toBe('in-progress');
    expect(fireInspStage.statusLabel).toContain('Scheduled');

    // Every stage must have a plain-language owner and no generic "Pending" status label
    for (const stage of fireLifecycle) {
      expect(stage.owner.length).toBeGreaterThan(0);
      expect(stage.statusLabel.toLowerCase()).not.toBe('pending');
    }
  });

  it('enforces 5-question answers across all consolidated query deficiencies without bureaucratic jargon', () => {
    expect(SAMPLE_QUERY.deficiencies.length).toBeGreaterThan(0);

    for (const def of SAMPLE_QUERY.deficiencies) {
      // 1. WHAT NEEDS TO BE FIXED?
      expect(def.issue).toBeDefined();
      expect(def.issue.length).toBeGreaterThan(10);

      // 2. WHY?
      expect(def.explanation).toBeDefined();
      expect(def.explanation.length).toBeGreaterThan(20);

      // 3. WHAT EVIDENCE IS NEEDED?
      expect(def.evidenceNeeded).toBeDefined();
      expect(def.evidenceNeeded.length).toBeGreaterThan(10);

      // 4. WHAT DO I NEED TO SUBMIT?
      expect(def.requiredAction).toBeDefined();
      expect(def.requiredAction.length).toBeGreaterThan(15);

      // 5. WHEN?
      expect(def.deadline).toBe('09 Oct 2026');

      // Evidence file suggestion & prefill response
      expect(def.evidenceDocName).toBeDefined();
      expect(def.defaultResponse).toBeDefined();
    }
  });

  it('organizes resubmission deltas into CHANGED, UNCHANGED, NEW DOCUMENT, and REMOVED/REPLACED without manual version comparison', () => {
    // 1. Changed Form Fields
    const changed = E21_CATEGORIZED_DELTAS.filter(d => d.kind === 'changed');
    expect(changed.length).toBe(2);
    expect(changed.some(c => c.title.includes('Daily Water Consumption'))).toBe(true);
    expect(changed.some(c => c.title.includes('Effluent Treatment Plant'))).toBe(true);

    // 2. New Document
    const newDoc = E21_CATEGORIZED_DELTAS.filter(d => d.kind === 'new_document');
    expect(newDoc.length).toBe(1);
    expect(newDoc[0].title).toContain('Hazardous Waste');
    expect(newDoc[0].oldValue).toContain('Not previously submitted');

    // 3. Replaced Document
    const replaced = E21_CATEGORIZED_DELTAS.filter(d => d.kind === 'replaced');
    expect(replaced.length).toBe(1);
    expect(replaced[0].title).toContain('ETP Design');
    expect(replaced[0].newValue).toContain('v2');

    // Verify all deltas provide explicit before, after, and rationale
    for (const delta of E21_CATEGORIZED_DELTAS) {
      expect(delta.oldValue.length).toBeGreaterThan(0);
      expect(delta.newValue.length).toBeGreaterThan(0);
      expect(delta.rationale.length).toBeGreaterThan(15);
    }

    // 4. Unchanged Preserved Fields
    expect(E21_UNCHANGED_PRESERVED_FIELDS.length).toBeGreaterThanOrEqual(8);
    expect(E21_UNCHANGED_PRESERVED_FIELDS.every(f => f.status.includes('Preserved'))).toBe(true);
  });

  it('enforces 6-question answers and statutory approval disclaimers across inspections', () => {
    const inspections = [
      findInspectionById('INS-001')!,
      findInspectionById('INS-002')!,
      findInspectionById('INS-003')!,
    ];

    expect(inspections.every(Boolean)).toBe(true);

    for (const ins of inspections) {
      // 1. WHEN IS MY INSPECTION?
      expect(ins.date).toBeDefined();
      expect(ins.time).toBeDefined();

      // 2. WHAT IS IT FOR?
      expect(ins.purpose).toBeDefined();
      expect(ins.purpose!.length).toBeGreaterThan(15);
      expect(ins.departments.length).toBeGreaterThan(0);

      // 3. WHAT DO I NEED TO PREPARE?
      expect(ins.prepRequirements.length).toBeGreaterThan(0);

      // 4. WHAT DOCUMENTS ARE REQUIRED?
      expect(ins.documents.length).toBeGreaterThan(0);

      // 5. WHAT HAPPENED?
      expect(ins.status).toBeDefined();

      // 6. DO I NEED TO TAKE ACTION?
      expect(ins.actionRequired !== undefined).toBe(true);

      // Statutory approval boundary disclaimer
      expect(ins.statutoryApprovalDisclaimer).toBeDefined();
      expect(ins.statutoryApprovalDisclaimer?.toLowerCase()).toContain('final statutory approval');
    }
  });

  it('structures observation corrections and re-inspection notices without ambiguity', () => {
    const ins3 = findInspectionById('INS-003')!;
    expect(ins3.status).toBe('Re-inspection Required');

    // RE-INSPECTION REQUIRED checks
    expect(ins3.reInspectionReason).toBeDefined();
    expect(ins3.reInspectionReason!.length).toBeGreaterThan(20);
    expect(ins3.reInspectionItems).toBeDefined();
    expect(ins3.reInspectionItems!.length).toBeGreaterThan(1);
    expect(ins3.reInspectionDate).toBe('05 Oct 2026, 11:00 AM');

    // OBSERVATION correction checks
    expect(ins3.observations.length).toBeGreaterThan(0);
    const obs = ins3.observations[0];
    expect(obs.whatWasFound).toBeDefined();
    expect(obs.whatWasFound!.length).toBeGreaterThan(15);
    expect(obs.whatNeedsToBeCorrected).toBeDefined();
    expect(obs.whatNeedsToBeCorrected!.length).toBeGreaterThan(15);
    expect(obs.evidenceRequired).toBeDefined();
    expect(obs.responseState).toBe('Pending');
  });

  it('structures statutory approval grant with all 6 core facets and transition metadata', () => {
    const decision = findDecisionByAppId('APP-2026-MPCB-00412');
    expect(decision).toBeDefined();
    expect(decision?.state).toBe('approved');
    expect(decision?.approvalId).toBe('CTE-2026-MPCB-41872');

    // 1. What was approved
    expect(decision?.whatWasApproved).toBeDefined();
    expect(decision?.whatWasApproved?.service).toContain('Consent to Establish');
    expect(decision?.whatWasApproved?.scope).toContain('manufacturing unit');
    expect(decision?.whatWasApproved?.authority).toContain('MPCB');

    // 2. Validity
    expect(decision?.validityPeriod).toContain('5 Years');
    expect(decision?.issueDate).toBe('10 Oct 2026');
    expect(decision?.expiryDate).toBe('09 Oct 2031');

    // 3. Conditions
    expect(decision?.conditions?.length).toBeGreaterThanOrEqual(3);
    expect(decision?.specialConditions?.length).toBeGreaterThanOrEqual(2);

    // 4. Documents
    expect(decision?.certDocId).toBe('DOC-003');
    expect(decision?.certId).toContain('CTE');

    // 5. Renewal requirements
    expect(decision?.renewalRequirements).toBeDefined();
    expect(decision?.renewalRequirements?.frequency).toContain('5 Years');
    expect(decision?.renewalRequirements?.cutoffDate).toBe('11 Jun 2031');
    expect(decision?.renewalRequirements?.renewalDeadline).toContain('120 days');
    expect(decision?.renewalRequirements?.prerequisites.length).toBeGreaterThan(0);

    // 6. Next compliance obligations transition
    expect(decision?.nextComplianceSummary).toBeDefined();
    expect(decision?.nextComplianceSummary).toContain('Compliance Ledger');
  });
});
