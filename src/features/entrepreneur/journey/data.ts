import { findBusinessEntity } from '../identity/catalog';

export type JourneyDisplayState =
  | 'ready'
  | 'in-progress'
  | 'waiting'
  | 'action-required'
  | 'under-review'
  | 'inspection-scheduled'
  | 'approved'
  | 'rejected'
  | 'conditional'
  | 'needs-verification'
  | 'not-applicable';

export type DependencyType = 'hard' | 'conditional' | 'none';

export interface JourneyDep {
  reqId: string;
  type: DependencyType;
  reason?: string;
}

export interface JourneyReq {
  id: string;
  department: string;
  service: string;
  stage: string;
  displayState: JourneyDisplayState;
  applicability: 'applicable' | 'conditional' | 'not-applicable' | 'needs-verification';
  requiredAction?: string;
  slaRemaining?: string;
  slaElapsed?: string;
  documents?: string;
  inspectionState?: string;
  nextMilestone?: string;
  dependencies: JourneyDep[];
  unlocks?: string[];
  conditionReason?: string;
  verificationReason?: string;
  approvalRef?: string;
  approvedDate?: string;
  rejectionReason?: string;
}

export function buildJourneyNodes(cteApproved: boolean): JourneyReq[] {
  return [
    {
      id: 'LAND-001',
      department: 'MIDC',
      service: 'Land Possession / Allotment',
      stage: 'land',
      displayState: 'approved',
      applicability: 'applicable',
      approvalRef: 'MIDC/ALLOT/2026/TH-0482',
      approvedDate: '12 Jun 2026',
      nextMilestone: 'Establishment Stage',
      documents: '4 / 4 Ready',
      inspectionState: 'Not Required',
      dependencies: [],
      unlocks: ['EST-001'],
    },
    {
      id: 'EST-001',
      department: 'MPCB',
      service: 'Consent to Establish (CTE)',
      stage: 'establishment',
      displayState: cteApproved ? 'approved' : 'under-review',
      applicability: 'applicable',
      requiredAction: cteApproved ? undefined : 'No action currently required',
      slaRemaining: cteApproved ? undefined : '12 days remaining',
      slaElapsed: cteApproved ? undefined : '3 days elapsed',
      documents: cteApproved ? '8 / 8 Ready' : '7 / 8 Ready',
      inspectionState: cteApproved ? 'Completed' : 'Pending',
      nextMilestone: cteApproved ? 'Construction Stage Unlocked' : 'CTE Decision',
      dependencies: [{ reqId: 'LAND-001', type: 'hard' }],
      unlocks: ['CON-001', 'CON-002'],
      approvalRef: cteApproved ? 'MPCB/CTE/2026/7812' : undefined,
      approvedDate: cteApproved ? '21 Sep 2026' : undefined,
    },
    {
      id: 'CON-001',
      department: 'Planning Authority',
      service: 'Building Plan Approval',
      stage: 'construction',
      displayState: cteApproved ? 'ready' : 'waiting',
      applicability: 'applicable',
      requiredAction: cteApproved ? 'Start Requirement' : undefined,
      nextMilestone: cteApproved ? 'Submit Building Plans' : 'Waiting for CTE decision',
      documents: '0 / 6 Ready',
      inspectionState: 'Not Scheduled',
      dependencies: [{ reqId: 'EST-001', type: 'hard', reason: 'MPCB CTE must be resolved before Building Plan can proceed.' }],
      unlocks: ['UTIL-001', 'UTIL-002'],
    },
    {
      id: 'CON-002',
      department: 'Fire',
      service: 'Provisional Fire NOC',
      stage: 'construction',
      displayState: cteApproved ? 'ready' : 'waiting',
      applicability: 'applicable',
      requiredAction: cteApproved ? 'Start Requirement' : undefined,
      nextMilestone: cteApproved ? 'Submit Fire Plans' : 'Waiting for CTE decision',
      documents: '0 / 4 Ready',
      inspectionState: 'Not Scheduled',
      dependencies: [{ reqId: 'EST-001', type: 'hard', reason: 'CTE approval is required before Provisional Fire NOC.' }],
      unlocks: ['PREOP-001'],
    },
    {
      id: 'UTIL-001',
      department: 'MSEDCL / MIDC',
      service: 'Power Connection (HT)',
      stage: 'utilities',
      displayState: cteApproved ? 'ready' : 'waiting',
      applicability: 'applicable',
      requiredAction: cteApproved ? 'Start Requirement' : undefined,
      nextMilestone: cteApproved ? 'Apply for HT Connection' : 'Waiting for Construction Stage',
      documents: '0 / 3 Ready',
      inspectionState: 'Not Scheduled',
      dependencies: [{ reqId: 'CON-001', type: 'hard', reason: 'Building Plan Approval required before utility connections.' }],
    },
    {
      id: 'UTIL-002',
      department: 'MIDC',
      service: 'Water Connection',
      stage: 'utilities',
      displayState: cteApproved ? 'ready' : 'waiting',
      applicability: 'applicable',
      requiredAction: cteApproved ? 'Start Requirement' : undefined,
      nextMilestone: cteApproved ? 'Apply for Water Connection' : 'Waiting for Construction Stage',
      documents: '0 / 3 Ready',
      inspectionState: 'Not Scheduled',
      dependencies: [{ reqId: 'CON-001', type: 'hard' }],
    },
    {
      id: 'UTIL-003',
      department: 'Competent Authority',
      service: 'Groundwater Permission',
      stage: 'utilities',
      displayState: 'not-applicable',
      applicability: 'not-applicable',
      conditionReason: 'Water Source = MIDC Supply (not groundwater)',
      dependencies: [],
    },
    {
      id: 'UTIL-004',
      department: 'Local Authority / ULB',
      service: 'Drainage Connection NOC',
      stage: 'utilities',
      displayState: 'conditional',
      applicability: 'conditional',
      conditionReason: 'Applicable if project generates industrial/domestic wastewater and connects to municipal drainage.',
      nextMilestone: 'Awaiting wastewater assessment',
      dependencies: [{ reqId: 'CON-001', type: 'conditional', reason: 'Building Plan Approval required; conditional on drainage route.' }],
    },
    {
      id: 'PREOP-001',
      department: 'MPCB',
      service: 'Consent to Operate (CTO)',
      stage: 'pre-operation',
      displayState: 'waiting',
      applicability: 'applicable',
      nextMilestone: 'Waiting for Provisional Fire NOC',
      documents: '0 / 8 Ready',
      inspectionState: 'Not Scheduled',
      dependencies: [
        { reqId: 'CON-002', type: 'hard', reason: 'Provisional Fire NOC must be obtained before CTO.' },
        { reqId: 'CON-001', type: 'hard', reason: 'Building Plan Approval required.' },
      ],
    },
    {
      id: 'PREOP-002',
      department: 'DISH',
      service: 'Factory / Occupier Registration',
      stage: 'pre-operation',
      displayState: 'waiting',
      applicability: 'applicable',
      nextMilestone: 'Waiting for Building Plan Approval',
      documents: '0 / 5 Ready',
      inspectionState: 'Not Scheduled',
      dependencies: [{ reqId: 'CON-001', type: 'hard' }],
    },
    {
      id: 'PREOP-003',
      department: 'Directorate of Boilers',
      service: 'Boiler Registration',
      stage: 'pre-operation',
      displayState: 'conditional',
      applicability: 'conditional',
      conditionReason: 'Applicable if boiler is installed. Verify boiler specification.',
      documents: '0 / 4 Ready',
      inspectionState: 'Not Scheduled',
      dependencies: [{ reqId: 'PREOP-002', type: 'conditional' }],
    },
    {
      id: 'PREOP-004',
      department: 'Fire',
      service: 'Final Fire NOC',
      stage: 'pre-operation',
      displayState: 'waiting',
      applicability: 'applicable',
      nextMilestone: 'After construction completion',
      documents: '0 / 4 Ready',
      inspectionState: 'Not Scheduled',
      dependencies: [{ reqId: 'CON-002', type: 'hard' }],
    },
    {
      id: 'COMPLY-001',
      department: 'MPCB',
      service: 'Compliance Reporting',
      stage: 'compliance',
      displayState: 'waiting',
      applicability: 'applicable',
      conditionReason: 'Generated after CTO approval. Compliance obligations will appear here.',
      dependencies: [{ reqId: 'PREOP-001', type: 'hard' }],
    },
  ];
}

export function listJourneyNodesForBusiness(businessId: string, cteApproved: boolean = false): JourneyReq[] {
  return buildJourneyNodes(cteApproved).filter(node => Boolean(findBusinessEntity('requirement', businessId, node.id)));
}

export function journeyStateCfg(state: JourneyDisplayState) {
  const map: Record<JourneyDisplayState, { label: string; icon: string; bg: string; border: string; textCls: string; badgeCls: string }> = {
    'ready':               { label: 'Ready',                  icon: '▶', bg: 'bg-white',         border: 'border-[#1a56db]',   textCls: 'text-[#1a3a5c]', badgeCls: 'bg-[#ebf3ff] text-[#1a3a5c] border-[#b8d0f5]' },
    'in-progress':         { label: 'In Progress',            icon: '◎', bg: 'bg-white',         border: 'border-[#6366f1]',   textCls: 'text-[#3730a3]', badgeCls: 'bg-[#ede9fe] text-[#3730a3] border-[#c4b5fd]' },
    'waiting':             { label: 'Waiting on Dependency',  icon: '⏸', bg: 'bg-[#f8f9fb]',    border: 'border-[#d1d9e0]',   textCls: 'text-[#6b7a8d]', badgeCls: 'bg-[#f8f9fb] text-[#6b7a8d] border-[#d1d9e0]' },
    'action-required':     { label: 'Action Required',        icon: '!', bg: 'bg-[#fffbeb]',     border: 'border-[#f59e0b]',   textCls: 'text-[#92400e]', badgeCls: 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]' },
    'under-review':        { label: 'Under Department Review',icon: '⧖', bg: 'bg-white',         border: 'border-[#6366f1]',   textCls: 'text-[#3730a3]', badgeCls: 'bg-[#ede9fe] text-[#3730a3] border-[#c4b5fd]' },
    'inspection-scheduled':{ label: 'Inspection Scheduled',   icon: '📋', bg: 'bg-[#fff7ed]',   border: 'border-[#f97316]',   textCls: 'text-[#7c2d12]', badgeCls: 'bg-[#fed7aa] text-[#7c2d12] border-[#fb923c]' },
    'approved':            { label: 'Approved',               icon: '✓', bg: 'bg-[#f0fdf4]',    border: 'border-[#86efac]',   textCls: 'text-[#166534]', badgeCls: 'bg-[#f0fdf4] text-[#166534] border-[#86efac]' },
    'rejected':            { label: 'Rejected',               icon: '✕', bg: 'bg-[#fff1f2]',    border: 'border-[#fca5a5]',   textCls: 'text-[#991b1b]', badgeCls: 'bg-[#ffe4e6] text-[#991b1b] border-[#fca5a5]' },
    'conditional':         { label: 'Conditional',            icon: '?', bg: 'bg-[#fffbeb]',     border: 'border-[#fde68a]',   textCls: 'text-[#78350f]', badgeCls: 'bg-[#fef3c7] text-[#78350f] border-[#fde68a]' },
    'needs-verification':  { label: 'Needs Verification',     icon: '◌', bg: 'bg-[#f0f4ff]',    border: 'border-[#a5b4fc]',   textCls: 'text-[#3730a3]', badgeCls: 'bg-[#e0e7ff] text-[#3730a3] border-[#a5b4fc]' },
    'not-applicable':      { label: 'Not Applicable',         icon: '—', bg: 'bg-[#f8f9fb]',    border: 'border-[#e8edf2]',   textCls: 'text-[#9aa5b4]', badgeCls: 'bg-[#f8f9fb] text-[#9aa5b4] border-[#e8edf2]' },
  };
  return map[state];
}

export const STAGES = [
  { key: 'land',          label: 'Land',          num: '01' },
  { key: 'establishment', label: 'Establishment', num: '02' },
  { key: 'construction',  label: 'Construction',  num: '03' },
  { key: 'utilities',     label: 'Utilities',     num: '04' },
  { key: 'pre-operation', label: 'Pre-Operation', num: '05' },
  { key: 'operations',    label: 'Operations',    num: '06' },
  { key: 'compliance',    label: 'Compliance',    num: '07' },
  { key: 'growth',        label: 'Growth',        num: '08' },
];

export function stageDisplayState(nodes: JourneyReq[], stageKey: string): string {
  const sn = nodes.filter(n => n.stage === stageKey && n.applicability !== 'not-applicable');
  if (sn.length === 0) return 'Upcoming';
  if (sn.every(n => n.displayState === 'approved')) return 'Complete';
  if (sn.some(n => n.displayState === 'action-required')) return 'Action Required';
  if (sn.some(n => n.displayState === 'under-review' || n.displayState === 'in-progress')) return 'In Progress';
  if (sn.some(n => n.displayState === 'ready')) return 'Ready';
  if (sn.every(n => n.displayState === 'waiting' || n.displayState === 'not-applicable')) return 'Waiting';
  return 'Upcoming';
}

export interface ReqEnrichment {
  serviceId: string;
  slaConfigured: string;
  fee: string;
  regSourceType: string;
  regReference: string;
  regClause: string;
  regEffective: string;
  regDoc: string;
  regVerified: boolean;
  inspectionNote: string;
  forms: {
    name: string;
    requirement: 'Required' | 'Conditional' | 'Not Required';
    state: 'Ready' | 'Pending' | 'Not Applicable' | 'Completed';
  }[];
  docs: {
    name: string;
    required: boolean;
    availability: string;
    verification: string;
    reusable: boolean;
  }[];
  declarations: {
    text: string;
    state: 'Required' | 'Accepted' | 'Pending' | 'Not Applicable';
  }[];
  dnaBasis: { label: string; value: string }[];
  applicabilityBasis: string[];
  applicabilitySummary: string;
  parallelServices: string[];
}

export const REQ_ENRICHMENT: Record<string, ReqEnrichment> = {
  'EST-001': {
    serviceId: 'MPCB-CTE',
    slaConfigured: '21 working days',
    fee: 'Based on capital investment — available during application',
    regSourceType: 'Rule / Act',
    regReference: 'Maharashtra Prevention and Control of Pollution Rules',
    regClause: 'Rule 5 — Consent to Establish',
    regEffective: '01 Jan 2000',
    regDoc: 'Maharashtra PCB (Consent to Establish) Procedure',
    regVerified: true,
    inspectionNote: 'Site inspection may be required before decision.',
    forms: [
      { name: 'CTE Application Form (Form I)', requirement: 'Required', state: 'Pending' },
      { name: 'Environmental Statement', requirement: 'Required', state: 'Pending' },
      { name: 'Hazardous Waste Annexure', requirement: 'Conditional', state: 'Pending' },
    ],
    docs: [
      { name: 'Project Report / DPR', required: true, availability: 'Available in Dossier', verification: 'Self-Declared', reusable: true },
      { name: 'Land / Plot Documentation', required: true, availability: 'Available — MIDC Verified', verification: 'Department Verified', reusable: true },
      { name: 'Layout / Process Flow', required: true, availability: 'Not yet uploaded', verification: 'Pending', reusable: false },
      { name: 'Effluent / Wastewater Details', required: true, availability: 'Partially available', verification: 'Self-Declared', reusable: false },
      { name: 'Air Emission Inventory', required: true, availability: 'Not yet uploaded', verification: 'Pending', reusable: false },
      { name: 'Hazardous Material Inventory', required: true, availability: 'Available in Dossier', verification: 'Self-Declared', reusable: true },
      { name: 'Applicant Declaration', required: true, availability: 'Pending acceptance', verification: 'Pending', reusable: false },
      { name: 'CA Certificate (if applicable)', required: false, availability: 'Conditional', verification: 'Pending', reusable: false },
    ],
    declarations: [
      { text: 'I declare that the information provided is true and correct to the best of my knowledge.', state: 'Pending' },
      { text: 'I undertake to comply with the conditions of consent, if granted.', state: 'Pending' },
    ],
    dnaBasis: [
      { label: 'Activity', value: 'Manufacturing' },
      { label: 'Industry', value: 'Pharmaceutical Manufacturing' },
      { label: 'Location', value: 'Thane, Maharashtra' },
      { label: 'Project Stage', value: 'Pre-Establishment' },
      { label: 'Industrial Wastewater', value: 'Yes' },
      { label: 'Air Emissions', value: 'Yes' },
      { label: 'Hazardous Material', value: 'Yes' },
    ],
    applicabilityBasis: [
      'Manufacturing activity',
      'Project location (Maharashtra)',
      'Industrial wastewater generation',
      'Air emissions identified',
      'Hazardous material present',
    ],
    applicabilitySummary:
      'Your project involves manufacturing activity and environmental attributes (wastewater, air emissions, hazardous material) that trigger evaluation for this establishment-stage consent requirement under the Water and Air Acts.',
    parallelServices: [],
  },
  'CON-001': {
    serviceId: 'PLAN-BP',
    slaConfigured: '30 working days',
    fee: 'Based on built-up area — available during application',
    regSourceType: 'Act / MIDC Regulation',
    regReference: 'MIDC Estate Regulations / Maharashtra Regional and Town Planning Act',
    regClause: 'Regulation 7 — Building Plan Approval',
    regEffective: '01 Apr 2010',
    regDoc: 'MIDC Building Regulation Manual',
    regVerified: true,
    inspectionNote: 'Building inspection required after construction.',
    forms: [
      { name: 'Building Plan Application', requirement: 'Required', state: 'Pending' },
      { name: 'Structural Stability Certificate', requirement: 'Required', state: 'Pending' },
    ],
    docs: [
      { name: 'Architectural Plans', required: true, availability: 'Not yet uploaded', verification: 'Pending', reusable: false },
      { name: 'Plot Ownership / Allotment', required: true, availability: 'Available — MIDC Verified', verification: 'Department Verified', reusable: true },
      { name: 'Structural Drawing', required: true, availability: 'Not yet uploaded', verification: 'Pending', reusable: false },
      { name: 'Fire Safety Layout', required: true, availability: 'Not yet uploaded', verification: 'Pending', reusable: false },
    ],
    declarations: [
      { text: 'I confirm that the submitted building plans comply with applicable regulations.', state: 'Pending' },
    ],
    dnaBasis: [
      { label: 'Activity', value: 'Manufacturing' },
      { label: 'Built-Up Area', value: 'Construction planned' },
      { label: 'MIDC Status', value: 'MIDC Estate' },
      { label: 'Location', value: 'Thane, Maharashtra' },
    ],
    applicabilityBasis: ['New construction planned', 'MIDC Estate location', 'Industrial building use'],
    applicabilitySummary:
      'Construction of a new building within an MIDC estate requires Building Plan Approval from the relevant Planning Authority before construction begins.',
    parallelServices: ['CON-002'],
  },
};

export function getEnrichment(reqId: string, businessName?: string, location?: string): ReqEnrichment {
  const enrich = REQ_ENRICHMENT[reqId];
  if (enrich) return location
    ? { ...enrich, dnaBasis: enrich.dnaBasis.map(item => item.label === 'Location' ? { ...item, value: location } : item) }
    : enrich;

  return {
    serviceId: reqId,
    slaConfigured: 'Available during application',
    fee: 'Available during application',
    regSourceType: 'Rule / Act',
    regReference: 'Applicable Maharashtra Regulation',
    regClause: 'Relevant clause',
    regEffective: 'As notified',
    regDoc: 'Service-specific regulatory document',
    regVerified: false,
    inspectionNote: 'Inspection requirement will be confirmed during processing.',
    forms: [{ name: 'Service-specific application form', requirement: 'Required', state: 'Pending' }],
    docs: [
      { name: 'Project Documentation', required: true, availability: 'Review required', verification: 'Pending', reusable: false },
      { name: 'Identity / Authorisation', required: true, availability: 'Available in Dossier', verification: 'Self-Declared', reusable: true },
    ],
    declarations: [{ text: 'I declare that all information provided is accurate.', state: 'Pending' }],
    dnaBasis: [
      { label: 'Activity', value: 'Manufacturing' },
      { label: 'Location', value: location || 'Thane, Maharashtra' },
    ],
    applicabilityBasis: ['Business activity', 'Project location', 'Project stage'],
    applicabilitySummary: 'This requirement was identified based on your Business DNA by the regulatory applicability engine.',
    parallelServices: [],
  };
}
