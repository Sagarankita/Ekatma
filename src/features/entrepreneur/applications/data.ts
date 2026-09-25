import { findBusinessEntity } from '../identity/catalog';
import { findDocumentForBusiness } from '../documents/data';

export type AppSection = 'common' | 'service' | 'forms' | 'documents' | 'declarations' | 'review';

export const APP_SECTIONS: { id: AppSection; label: string }[] = [
  { id: 'common', label: 'Common Information' },
  { id: 'service', label: 'Service-Specific Questions' },
  { id: 'forms', label: 'Forms & Annexures' },
  { id: 'documents', label: 'Documents' },
  { id: 'declarations', label: 'Declarations' },
  { id: 'review', label: 'Review' },
];

export interface SectionState {
  status: 'complete' | 'active' | 'attention' | 'pending' | 'locked';
}

export interface ValidationIssue {
  section: string;
  label: string;
  detail: string;
  severity: 'blocking' | 'warning' | 'passed';
  action: string;
}

export const E15_ISSUES: readonly ValidationIssue[] = [
  { section: 'Common Information', label: 'Legal entity confirmed', detail: 'Legal entity, PAN, and CIN are verified from the Master Project Dossier.', severity: 'passed', action: '' },
  { section: 'Common Information', label: 'Project location confirmed', detail: 'MIDC estate, plot number, district, and taluka are verified.', severity: 'passed', action: '' },
  { section: 'Service-Specific Questions', label: 'All mandatory service questions answered', detail: 'Industrial effluent, air emissions, hazardous waste, ZLD system, and process description are complete.', severity: 'passed', action: '' },
  { section: 'Forms & Annexures', label: 'Form I and Environmental Statement complete', detail: 'CTE Application Form (Form I) and Environmental Statement have been filled and marked complete.', severity: 'passed', action: '' },
  { section: 'Forms & Annexures', label: 'Hazardous Waste Annexure complete', detail: 'Conditional annexure has been completed in line with the project\'s hazardous materials profile.', severity: 'passed', action: '' },
  { section: 'Documents', label: 'Land Possession / MIDC Lease Agreement — Available', detail: 'Document is available and user-confirmed.', severity: 'passed', action: '' },
  { section: 'Documents', label: 'Project Environmental Report — Available', detail: 'Document has been uploaded and is available in the Document Centre.', severity: 'passed', action: '' },
  { section: 'Documents', label: 'ETP Design Details — Uploaded', detail: 'ETP design document has been uploaded and submitted with the application.', severity: 'passed', action: '' },
  { section: 'Documents', label: 'Building Layout — Available', detail: 'Architectural plan has been uploaded and linked from the Document Centre.', severity: 'passed', action: '' },
  { section: 'Declarations', label: 'All statutory declarations confirmed', detail: 'All three required declarations have been confirmed by the authorised signatory.', severity: 'passed', action: '' },
];

export interface ConsistencyApplication {
  name: string;
  value: string;
  status: 'consistent' | 'review' | 'conflict';
}

export interface ConsistencyRow {
  field: string;
  master: string;
  applications: ConsistencyApplication[];
}

export const E16_ROWS: readonly ConsistencyRow[] = [
  {
    field: 'Plot Area',
    master: '12,500 m²',
    applications: [
      { name: 'MPCB — CTE', value: '12,500 m²', status: 'consistent' },
      { name: 'DISH — Factory Reg.', value: '12,500 m²', status: 'consistent' },
      { name: 'Fire — NOC', value: '11,800 m²', status: 'review' },
    ],
  },
  {
    field: 'Total Investment',
    master: '₹45,00,00,000',
    applications: [
      { name: 'MPCB — CTE', value: '₹45,00,00,000', status: 'consistent' },
      { name: 'DISH — Factory Reg.', value: '₹45,00,00,000', status: 'consistent' },
    ],
  },
  {
    field: 'Workforce (Proposed)',
    master: '180',
    applications: [
      { name: 'MPCB — CTE', value: '180', status: 'consistent' },
      { name: 'DISH — Factory Reg.', value: '175', status: 'review' },
    ],
  },
  {
    field: 'Building Area',
    master: '8,500 m²',
    applications: [
      { name: 'MPCB — CTE', value: '8,500 m²', status: 'consistent' },
      { name: 'Fire — NOC', value: '8,500 m²', status: 'consistent' },
    ],
  },
  {
    field: 'Legal Entity',
    master: 'Sahyadri Bio-Pharma Pvt Ltd',
    applications: [
      { name: 'MPCB — CTE', value: 'Sahyadri Bio-Pharma Pvt Ltd', status: 'consistent' },
      { name: 'DISH — Factory Reg.', value: 'Sahyadri Bio-Pharma Pvt Ltd', status: 'consistent' },
      { name: 'Fire — NOC', value: 'Sahyadri Bio-Pharma Pvt Ltd', status: 'consistent' },
    ],
  },
  {
    field: 'Project Location',
    master: 'Chakan Industrial Area Phase II, Plot C-14/2',
    applications: [
      { name: 'MPCB — CTE', value: 'Chakan Industrial Area Phase II, Plot C-14/2', status: 'consistent' },
      { name: 'DISH — Factory Reg.', value: 'Chakan Industrial Area Phase II, Plot C-14/2', status: 'consistent' },
    ],
  },
];

export interface TrackerApp {
  id: string; // Internal slug if referenced
  service: string;
  dept: string;
  stage: string;
  appId: string; // Canonical real application ID
  currentDesk: string;
  status: string;
  statusType: 'active' | 'action' | 'approved' | 'waiting' | 'over-sla';
  sla: string;
  slaType: 'ok' | 'due-soon' | 'over' | 'na';
  daysElapsed: number;
  inspection: string;
  actionRequired: string | null;
}

export const TRACKER_APPS: readonly TrackerApp[] = [
  {
    id: 'app-mpcb-cte',
    service: 'Consent to Establish',
    dept: 'MPCB',
    stage: 'Technical Scrutiny',
    appId: 'APP-2026-MPCB-00412',
    currentDesk: 'Technical Scrutiny',
    status: 'Action Required',
    statusType: 'action',
    sla: 'Within SLA (12 of 21 days)',
    slaType: 'ok',
    daysElapsed: 12,
    inspection: 'Not Required at this stage',
    actionRequired: 'Respond to Query QRY-001 — Water balance and ETP mismatch',
  },
  {
    id: 'app-midc-bp',
    service: 'Building / Planning Approval',
    dept: 'MIDC',
    stage: 'Document Scrutiny',
    appId: 'APP-2026-MIDC-00187',
    currentDesk: 'Document Scrutiny',
    status: 'Action Required',
    statusType: 'action',
    sla: 'Within SLA (5 of 30 days)',
    slaType: 'ok',
    daysElapsed: 5,
    inspection: 'Not Required',
    actionRequired: 'Upload revised building plan — Query QRY-002 raised',
  },
  {
    id: 'app-fire-noc',
    service: 'Fire NOC',
    dept: 'Fire',
    stage: 'Inspection',
    appId: 'APP-2026-FIRE-00093',
    currentDesk: 'Inspection',
    status: 'Inspection Scheduled',
    statusType: 'active',
    sla: 'Due Soon (28 of 30 days)',
    slaType: 'due-soon',
    daysElapsed: 28,
    inspection: 'Scheduled — 26 Sep 2026',
    actionRequired: 'Prepare site for inspection on 26 Sep 2026',
  },
  {
    id: 'app-dish-factory',
    service: 'Factory Registration',
    dept: 'DISH',
    stage: 'Submitted',
    appId: 'APP-2026-DISH-00241',
    currentDesk: 'Fee / Challan',
    status: 'Submitted',
    statusType: 'active',
    sla: 'SLA Started',
    slaType: 'ok',
    daysElapsed: 1,
    inspection: 'Required — Awaiting Schedule',
    actionRequired: null,
  },
  {
    id: 'app-boiler-reg',
    service: 'Boiler Registration',
    dept: 'Boiler',
    stage: 'Waiting on Dependency',
    appId: '—',
    currentDesk: '—',
    status: 'Waiting on Dependency',
    statusType: 'waiting',
    sla: 'SLA Not Started',
    slaType: 'na',
    daysElapsed: 0,
    inspection: 'Not Required at this stage',
    actionRequired: 'Waiting for MPCB CTE approval before application can be submitted',
  },
  {
    id: 'app-bp001-mpcb',
    service: 'Consent to Establish (CTE)',
    dept: 'MPCB',
    stage: 'Technical Review',
    appId: 'APP-MPCB-2026-4892',
    currentDesk: 'Technical Review — Environment Officer',
    status: 'Under Review',
    statusType: 'over-sla',
    sla: '12 days overdue',
    slaType: 'over',
    daysElapsed: 42,
    inspection: 'Completed — Site Inspection',
    actionRequired: 'SLA breach — grievance escalation available',
  },
  {
    id: 'app-bp001-dish',
    service: 'Factory / Occupier Registration',
    dept: 'DISH',
    stage: 'Scrutiny',
    appId: 'APP-FAC-2026-3371',
    currentDesk: 'Safety Officer Review',
    status: 'Action Required',
    statusType: 'action',
    sla: 'Within SLA',
    slaType: 'ok',
    daysElapsed: 7,
    inspection: 'Scheduled',
    actionRequired: 'Respond to query regarding safety officer certificate',
  },
  {
    id: 'app-bp001-midc',
    service: 'Plot Lease Agreement',
    dept: 'MIDC',
    stage: 'Allotment Approved',
    appId: 'APP-MIDC-2026-1190',
    currentDesk: 'Regional Officer',
    status: 'Approved',
    statusType: 'approved',
    sla: 'Completed within SLA',
    slaType: 'ok',
    daysElapsed: 14,
    inspection: 'Conducted',
    actionRequired: null,
  },
];

export function findTrackerAppById(id: string): TrackerApp | undefined {
  if (!id || id === '—' || id === 'default' || id === 'sample' || id === 'temp' || id === 'current') {
    return undefined;
  }
  return TRACKER_APPS.find(a => a.appId === id);
}

export function listTrackerAppsForBusiness(businessId: string): TrackerApp[] {
  return TRACKER_APPS.filter(app => app.appId !== '—' && Boolean(findBusinessEntity('application', businessId, app.appId)));
}

export function findTrackerAppForBusiness(businessId: string, applicationId: string): TrackerApp | undefined {
  if (!findBusinessEntity('application', businessId, applicationId)) return undefined;
  return findTrackerAppById(applicationId);
}

export function slaClass(t: TrackerApp['slaType']): string {
  switch (t) {
    case 'ok':
      return 'text-[#15803d]';
    case 'due-soon':
      return 'text-[#d97706] font-semibold';
    case 'over':
      return 'text-[#b91c1c] font-semibold';
    case 'na':
    default:
      return 'text-[#94a3b8]';
  }
}

export function statusBadgeTrackerClass(statusType: TrackerApp['statusType']): string {
  switch (statusType) {
    case 'active':
      return 'bg-[#dbeafe] text-[#1e40af] border-[#93c5fd]';
    case 'action':
      return 'bg-[#fee2e2] text-[#b91c1c] border-[#fca5a5]';
    case 'approved':
      return 'bg-[#dcfce7] text-[#166534] border-[#86efac]';
    case 'waiting':
      return 'bg-[#fef3c7] text-[#92400e] border-[#fcd34d]';
    case 'over-sla':
      return 'bg-[#fee2e2] text-[#b91c1c] border-[#fca5a5]';
    default:
      return 'bg-[#f1f5f9] text-[#475569] border-[#e2e8f0]';
  }
}

// ─── Query & Deficiency Models ────────────────────────────────────────────────

export interface Deficiency {
  id: string;
  type: 'correction' | 'rejected';
  summary: string;
  officerComment: string;
  relatedField: string;
  relatedDocument: string | null;
  regulatoryRef: string | null;
  requiredAction: string;
  section: string;
}

export interface QueryRecord {
  queryId: string;
  appId: string;
  dept: string;
  service: string;
  issuedDate: string;
  responseDeadline: string;
  deficiencies: Deficiency[];
}

export const SAMPLE_QUERY: QueryRecord = {
  queryId: 'QRY-001',
  appId: 'APP-2026-MPCB-00412',
  dept: 'MPCB',
  service: 'Consent to Establish',
  issuedDate: '25 Sep 2026',
  responseDeadline: '09 Oct 2026',
  deficiencies: [
    {
      id: 'DEF-001',
      type: 'correction',
      summary: 'Water balance mismatch',
      officerComment: 'Water consumption stated in the application (50 KL/day) does not match the water balance chart submitted in the DPR (65 KL/day). The discrepancy must be resolved with a corrected water balance statement.',
      relatedField: 'Daily Water Consumption (KL/day)',
      relatedDocument: 'Project Environmental Report / DPR',
      regulatoryRef: 'MPCB CTE Form-I, Annexure A — Water Balance',
      requiredAction: 'Update the daily water consumption figure to 65 KL/day in the application form and upload a corrected water balance chart.',
      section: 'e05-env',
    },
    {
      id: 'DEF-002',
      type: 'correction',
      summary: 'ETP capacity mismatch',
      officerComment: 'ETP design capacity declared as 55 KL/day but the corrected water balance implies 70 KL/day of wastewater generation. The ETP must be designed to handle the actual wastewater load.',
      relatedField: 'ETP Design Capacity (KL/day)',
      relatedDocument: 'ETP Design Details',
      regulatoryRef: 'MPCB Environmental Standards — Schedule VI, ETP Sizing Norms',
      requiredAction: 'Update ETP capacity to 70 KL/day and upload revised ETP design documents reflecting the corrected capacity.',
      section: 'e05-env',
    },
    {
      id: 'DEF-003',
      type: 'correction',
      summary: 'Solid/hazardous waste management plan missing',
      officerComment: 'No Solid/Hazardous Waste Management Plan has been submitted. A detailed waste management plan is mandatory for Red Category industries under the Bio-Pharma sector.',
      relatedField: 'Hazardous Waste Management Plan',
      relatedDocument: null,
      regulatoryRef: 'Hazardous and Other Wastes (Management and Transboundary Movement) Rules, 2016 — Rule 4',
      requiredAction: 'Prepare and upload a Solid/Hazardous Waste Management Plan covering waste categories, quantities, storage, disposal, and manifest system.',
      section: 'e14-application',
    },
  ],
};

export function findQueryByAppId(appId: string): QueryRecord | undefined {
  if (appId === SAMPLE_QUERY.appId) return SAMPLE_QUERY;
  return undefined;
}

// ─── Delta Resubmission Models ────────────────────────────────────────────────

export interface DeltaChange {
  field: string;
  section: string;
  oldValue: string;
  newValue: string;
  docVersion?: string;
}

export const E21_DELTA_CHANGES: readonly DeltaChange[] = [
  { field: 'Daily Water Consumption', section: 'Environmental Details', oldValue: '50 KL/day', newValue: '65 KL/day' },
  { field: 'ETP Design Capacity', section: 'Environmental Details', oldValue: '55 KL/day', newValue: '70 KL/day' },
  { field: 'ETP Design Details (Document)', section: 'Documents', oldValue: 'v1 — ETP_Design_v1.pdf', newValue: 'v2 — ETP_Design_v2.pdf', docVersion: 'v2' },
  { field: 'Hazardous Waste Management Plan (Document)', section: 'Documents', oldValue: '— (not submitted)', newValue: 'v1 — Waste_Mgmt_Plan_v1.pdf', docVersion: 'v1 (new)' },
];

export const E21_AFFECTED_CHECKS = [
  { label: 'Water Balance Consistency', status: 're-check' },
  { label: 'ETP Capacity vs Wastewater Load', status: 're-check' },
  { label: 'Effluent Generation vs ETP Sizing', status: 're-check' },
  { label: 'MPCB Boiler Registration Dependency', status: 're-check' },
  { label: 'Cross-form Consistency (E16)', status: 're-check' },
];

// ─── Inspection Models ────────────────────────────────────────────────────────

export type InspectionStatus =
  | 'Required'
  | 'Awaiting Schedule'
  | 'Scheduled'
  | 'Completed'
  | 'Observation Raised'
  | 'Correction Submitted'
  | 'Re-inspection Required'
  | 'Resolved';

export interface InspectionObservation {
  id: string;
  description: string;
  checklistItem: string;
  evidenceRequired: string | null;
  requiredCorrection: string;
  responseState: 'Pending' | 'Submitted' | 'Accepted';
  dateRaised: string;
}

export interface InspectionChecklistItem {
  category: string;
  items: string[];
}

export interface InspectionRecord {
  id: string;
  departments: string[];
  type: string;
  relatedAppIds: string[];
  date: string;
  time: string;
  site: string;
  status: InspectionStatus;
  actionRequired: string | null;
  coordinated: boolean;
  prepRequirements: string[];
  documents: { id: string; name: string }[];
  checklist: InspectionChecklistItem[];
  observations: InspectionObservation[];
  reInspectionReason: string | null;
}

export const INSPECTIONS: readonly InspectionRecord[] = [
  {
    id: 'INS-001',
    departments: ['MIDC', 'Fire', 'DISH'],
    type: 'Coordinated Site Inspection',
    relatedAppIds: ['APP-2026-MIDC-00187', 'APP-2026-FIRE-00093', 'APP-2026-DISH-00241'],
    date: '26 Sep 2026',
    time: '10:00 AM',
    site: 'Chakan Industrial Area Phase II — Plot C-14/2',
    status: 'Scheduled',
    actionRequired: 'View Preparation Checklist',
    coordinated: true,
    prepRequirements: [
      'Site access must be available for all three department teams from 09:30 AM',
      'Building layout and approved architectural plan to be kept available on site',
      'Factory layout / site plan to be printed and available',
      'Boiler technical specifications and safety certificates to be on hand',
      'Fire safety equipment register and last servicing records',
      'Electrical safety certificate / wiring diagram',
      'Workforce register and DISH registration documents',
    ],
    documents: [
      { id: 'DOC-002', name: 'Land Possession / MIDC Lease Agreement' },
      { id: 'DOC-003', name: 'Factory Layout / Site Plan' },
      { id: 'DOC-004', name: 'Building Layout / Architectural Plan' },
      { id: 'DOC-007', name: 'Boiler Technical Specifications' },
    ],
    checklist: [
      {
        category: 'MIDC — Building & Planning',
        items: [
          'Setbacks and marginal spaces check against sanctioned plan',
          'Building height and FAR verification',
          'Internal road width and parking provision',
          'Drainage and stormwater connection feasibility',
        ],
      },
      {
        category: 'Fire — Fire Safety & Access',
        items: [
          'Fire tender access road width minimum 6.0 m all round',
          'Underground static water tank minimum 100,000 litres capacity',
          'Fire pump house location and pump capacity',
          'Emergency exits and travel distance verification',
        ],
      },
      {
        category: 'DISH — Workplace Safety & Welfare',
        items: [
          'Ventilation and natural lighting in production hall',
          'Occupational health and first aid centre location',
          'Canteen and rest room provisions per Factory Act',
          'Chemical storage area bunding and secondary containment',
        ],
      },
    ],
    observations: [],
    reInspectionReason: null,
  },
  {
    id: 'INS-002',
    departments: ['MPCB'],
    type: 'MPCB Environmental Inspection',
    relatedAppIds: ['APP-2026-MPCB-00412'],
    date: '18 Sep 2026',
    time: '02:30 PM',
    site: 'Chakan Industrial Area Phase II — Plot C-14/2',
    status: 'Resolved',
    actionRequired: null,
    coordinated: false,
    prepRequirements: [
      'ETP civil work site plan',
      'Hazardous waste storage area plan',
    ],
    documents: [
      { id: 'DOC-001', name: 'Project Environmental Report / DPR' },
      { id: 'DOC-006', name: 'ETP Design Details' },
    ],
    checklist: [
      {
        category: 'Environmental Safeguards',
        items: [
          'ETP civil footprint verification',
          'Effluent collection network layout',
          'Solid waste segregation facility provision',
        ],
      },
    ],
    observations: [
      {
        id: 'OBS-001',
        description: 'ETP footprint adequate for 70 KL/day as verified on site.',
        checklistItem: 'ETP civil footprint verification',
        evidenceRequired: null,
        requiredCorrection: 'None — verified on site.',
        responseState: 'Accepted',
        dateRaised: '18 Sep 2026',
      },
      {
        id: 'OBS-002',
        description: 'Hazardous waste storage shed roof ventilation needs louvre installation.',
        checklistItem: 'Solid waste segregation facility provision',
        evidenceRequired: 'Photograph of installed louvres',
        requiredCorrection: 'Install weather-proof louvres in storage shed wall.',
        responseState: 'Accepted',
        dateRaised: '18 Sep 2026',
      },
    ],
    reInspectionReason: null,
  },
];

export function findInspectionById(id: string): InspectionRecord | undefined {
  return INSPECTIONS.find(i => i.id === id);
}

export function listInspectionsForBusiness(businessId: string): InspectionRecord[] {
  return INSPECTIONS.filter(inspection => Boolean(findBusinessEntity('inspection', businessId, inspection.id)));
}

export function findInspectionDocumentForBusiness(businessId: string, inspectionId: string, documentId: string) {
  const inspection = listInspectionsForBusiness(businessId).find(record => record.id === inspectionId);
  const reference = inspection?.documents.find(document => document.id === documentId);
  const document = findDocumentForBusiness(businessId, documentId);
  return reference && document && reference.name === document.name ? document : undefined;
}

// ─── Decision & Approval Models ───────────────────────────────────────────────

export type DecisionState = 'approved' | 'rejected' | 'correction';

export interface DecisionRecord {
  decisionId: string;
  appId: string;
  dept: string;
  service: string;
  state: DecisionState;
  decisionDate: string;
  approvalId?: string;
  certId?: string;
  certDocId?: string;
  issueDate?: string;
  expiryDate?: string;
  conditions?: string[];
  specialConditions?: string[];
  complianceGenerated?: boolean;
  downstreamUnlocked?: { label: string; status: string }[];
  rejectionReason?: string;
  officerRemarks?: string;
  downstreamBlocked?: string[];
  queryId?: string;
  correctionNote?: string;
  inspectionId?: string;
  versionHistory?: { version: string; date: string; note: string }[];
}

export const SAMPLE_DECISION: DecisionRecord = {
  decisionId: 'DEC-2026-MPCB-00412',
  appId: 'APP-2026-MPCB-00412',
  dept: 'MPCB',
  service: 'Consent to Establish',
  state: 'approved',
  decisionDate: '10 Oct 2026',
  approvalId: 'CTE-2026-MPCB-41872',
  certId: 'CERT-CTE-2026-41872',
  certDocId: 'DOC-003',
  issueDate: '10 Oct 2026',
  expiryDate: '09 Oct 2031',
  conditions: [
    'ETP must be maintained at minimum 70 KL/day design capacity at all times.',
    'Effluent quality must comply with MPCB Schedule VI parameters before discharge to CETP.',
    'Stack emissions must not exceed prescribed limits. Monthly stack monitoring required.',
    'Hazardous waste disposal exclusively through MPCB-authorised transporters and disposal sites.',
    'Annual environmental audit report to be submitted to MPCB by 31 March each year.',
    'Any process change, capacity increase, or product addition must be intimated to MPCB in advance.',
  ],
  specialConditions: [
    'ETP commissioning report must be submitted to MPCB within 30 days of trial production.',
    'All wastewater manifest records must be maintained for a minimum of 5 years and produced on demand.',
  ],
  complianceGenerated: true,
  downstreamUnlocked: [
    { label: 'MIDC Building / Planning Approval', status: 'Proceeding — Document Scrutiny' },
    { label: 'Provisional Fire NOC', status: 'Proceeding — Inspection Scheduled' },
    { label: 'DISH Factory Registration', status: 'Proceeding — Submitted' },
    { label: 'Boiler Registration', status: 'Now Eligible — Awaiting Submission' },
  ],
  inspectionId: 'INS-002',
  versionHistory: [
    { version: 'Decision v1 — Current', date: '10 Oct 2026', note: 'Original decision issued on Resubmission #2 (APP-2026-MPCB-00412-R2).' },
  ],
};

export function findDecisionByAppId(appId: string): DecisionRecord | undefined {
  if (appId === SAMPLE_DECISION.appId) return SAMPLE_DECISION;
  return undefined;
}
