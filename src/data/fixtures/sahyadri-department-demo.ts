/**
 * Frontend-only department demo record for the canonical BP-004 business.
 *
 * This fixture intentionally mirrors the existing entrepreneur-side Sahyadri
 * Business DNA values without importing or changing entrepreneur code.
 */
export const SAHYADRI_DEMO = {
  business: {
    id: 'BP-004',
    name: 'Sahyadri Bio-Pharma Pvt Ltd',
    industry: 'Pharmaceutical Manufacturing',
    legalEntity: 'Private Limited Company',
    location: 'Chakan, Pune, Maharashtra',
    midc: 'Yes',
    projectId: 'PRJ-BP-004-CHAKAN',
    project: 'Chakan Industrial Area Phase II',
    projectStage: 'Trial Production',
    plot: 'C-14/2',
    plotArea: '4,800 sq.m',
    investment: '₹25 crore',
    workforce: '85',
    builtUpArea: '3,200 sq.m',
    connectedLoad: '750 KVA',
    waterRequirement: '250 KL/day',
    waterSource: 'MIDC Water Supply',
    wastewater: '120 KL/day industrial',
    airEmissions: 'Boiler Stack & DG',
    hazardousMaterials: 'Solvents / API intermediates',
    boiler: '4 Ton, briquette/natural gas',
  },
  application: {
    id: 'APP-2026-MIDC-00187',
    serviceId: 'MIDC-BUILDING-PLANNING',
    service: 'Building / Planning Approval',
    department: 'MIDC',
    desk: 'Planning / Building Scrutiny',
    state: 'TECHNICAL_SCRUTINY',
    sla: 'Approaching deadline',
    applicant: 'Vikramaditya Shinde',
    received: '21 Sep 2026',
    lastUpdated: '29 Sep 2026',
    dnaVersion: 'DNA-v1',
  },
  precheck: {
    machineVerified: [
      'Application identity complete',
      'Mandatory fields complete',
      'Payment reconciled',
      'MIDC plot record available',
      'Plot area matches verified MIDC record',
      'Business DNA available',
      'Required application documents present',
      'Basic document metadata valid',
      'Application location consistent',
      'Legal entity information available',
    ],
    reviewRequired: [
      'Building plan requires officer review',
      'Fire document requires officer verification',
      'Cross-form consistency requires review',
      'Dependency status requires officer awareness',
    ],
    notice: 'Machine-assisted finding. Officer determination required.',
  },
  reviewPlan: [
    { name: 'Land / Plot', status: 'COMPLETED' },
    { name: 'Building / Planning', status: 'CURRENT' },
    { name: 'Water / Utility', status: 'NOT REQUIRED' },
    { name: 'Cross-form Consistency', status: 'ATTENTION' },
    { name: 'Dependencies', status: 'PENDING' },
  ],
  buildingScrutiny: {
    document: 'Building Plan v2',
    applicationBuiltUpArea: '3,200 sq.m',
    submittedPlanBuiltUpArea: '3,050 sq.m',
    finding: 'Built-up area discrepancy',
    resolution: 'Resolved after officer evidence review',
  },
  consistency: {
    field: 'Plot Area',
    businessDna: '4,800 sq.m',
    midcApplication: '4,800 sq.m',
    landRecord: '4,800 sq.m',
    result: 'CONSISTENT',
  },
  dependencies: [
    { name: 'MIDC Building / Planning', authority: 'MIDC', state: 'IN PROGRESS' },
    { name: 'MPCB CTE', authority: 'MPCB', state: 'EXTERNAL PREREQUISITE' },
    { name: 'Fire NOC', authority: 'Fire Authority', state: 'CONDITIONAL' },
    { name: 'DISH', authority: 'DISH', state: 'CONTEXTUAL' },
    { name: 'Utilities', authority: 'MIDC Utilities', state: 'CONTEXTUAL' },
  ],
  inspection: {
    id: 'INS-2026-MIDC-00187',
    type: 'MIDC Building / Planning Inspection',
    site: 'Chakan Industrial Area, Plot C-14/2',
    date: '25 Sep 2026',
    time: '10:30 AM',
    status: 'SCHEDULED',
    team: 'Building / Planning Inspection Team',
  },
  decision: {
    id: 'DEC-2026-MIDC-00187',
    state: 'FINAL_DECISION',
    approvalNumber: 'MIDC/BP/2026/00187',
    certificate: 'CERT-MIDC-2026-00187',
    certificateTitle: 'MIDC Building / Planning Approval',
    issueDate: '29 Sep 2026',
    validity: 'Configured prototype validity',
    conditions: [
      'Construction must follow the reviewed Building Plan and recorded MIDC plot boundaries.',
      'Any material project change must be submitted through the applicable amendment workflow.',
      'External approvals and compliance obligations remain the responsibility of their issuing authorities.',
    ],
  },
} as const;

export const SAHYADRI_DEMO_INITIAL_STATE = {
  applicationStatus: 'SUBMITTED',
  departmentStatus: 'UNDER_REVIEW',
  scrutinyStatus: 'IN_PROGRESS',
  inspectionStatus: 'SCHEDULED',
  decisionStatus: 'PENDING',
  approvalStatus: 'PENDING',
  certificate: null,
  lastUpdated: '29 Sep 2026',
} as const;

export const SAHYADRI_DEMO_APPROVED_STATE = {
  applicationStatus: 'APPROVED',
  departmentStatus: 'DECISION_RECORDED',
  scrutinyStatus: 'COMPLETED',
  inspectionStatus: 'COMPLETED',
  decisionStatus: 'APPROVED',
  approvalStatus: 'APPROVED',
  certificate: SAHYADRI_DEMO.decision.certificate,
  lastUpdated: '29 Sep 2026',
} as const;

export const SAHYADRI_DEMO_STORAGE_KEY = 'ekatma:sahyadri-biopharma:demo-workflow:v1';

export function isSahyadriDemoApplication(applicationId?: string | null): boolean {
  return applicationId === SAHYADRI_DEMO.application.id;
}
