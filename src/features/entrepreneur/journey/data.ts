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

export interface JourneySimulationStep {
  nextReq: JourneyReq | undefined;
  buttonLabel: string;
  description: string;
  isComplete: boolean;
  stepIndex: number;
  totalSteps: number;
}

export function buildJourneyNodes(simulationState: boolean | readonly string[] = false): JourneyReq[] {
  const simulatedIds = new Set<string>(
    typeof simulationState === 'boolean'
      ? (simulationState ? ['EST-001'] : [])
      : simulationState
  );

  const isApproved = (id: string) => id === 'LAND-001' || simulatedIds.has(id);
  const cteApproved = isApproved('EST-001');
  const con001Approved = isApproved('CON-001');
  const con002Approved = isApproved('CON-002');
  const preop001Approved = isApproved('PREOP-001');
  const preop002Approved = isApproved('PREOP-002');

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
      displayState: isApproved('CON-001') ? 'approved' : cteApproved ? 'ready' : 'waiting',
      applicability: 'applicable',
      requiredAction: isApproved('CON-001') ? undefined : cteApproved ? 'Start Requirement' : undefined,
      nextMilestone: isApproved('CON-001') ? 'Utilities Stage Unlocked' : cteApproved ? 'Submit Building Plans' : 'Waiting for CTE decision',
      documents: isApproved('CON-001') ? '6 / 6 Ready' : '0 / 6 Ready',
      inspectionState: isApproved('CON-001') ? 'Approved' : 'Not Scheduled',
      dependencies: [{ reqId: 'EST-001', type: 'hard', reason: 'MPCB CTE must be resolved before Building Plan can proceed.' }],
      unlocks: ['UTIL-001', 'UTIL-002'],
      approvalRef: isApproved('CON-001') ? 'SPA/MIDC/BP/2026/1102' : undefined,
      approvedDate: isApproved('CON-001') ? '02 Oct 2026' : undefined,
    },
    {
      id: 'CON-002',
      department: 'Fire',
      service: 'Provisional Fire NOC',
      stage: 'construction',
      displayState: isApproved('CON-002') ? 'approved' : cteApproved ? 'ready' : 'waiting',
      applicability: 'applicable',
      requiredAction: isApproved('CON-002') ? undefined : cteApproved ? 'Start Requirement' : undefined,
      nextMilestone: isApproved('CON-002') ? 'Pre-Operation Stage Unlocked' : cteApproved ? 'Submit Fire Plans' : 'Waiting for CTE decision',
      documents: isApproved('CON-002') ? '4 / 4 Ready' : '0 / 4 Ready',
      inspectionState: isApproved('CON-002') ? 'Approved' : 'Not Scheduled',
      dependencies: [{ reqId: 'EST-001', type: 'hard', reason: 'CTE approval is required before Provisional Fire NOC.' }],
      unlocks: ['PREOP-001'],
      approvalRef: isApproved('CON-002') ? 'MFS/NOC/2026/4910' : undefined,
      approvedDate: isApproved('CON-002') ? '05 Oct 2026' : undefined,
    },
    {
      id: 'UTIL-001',
      department: 'MSEDCL / MIDC',
      service: 'Power Connection (HT)',
      stage: 'utilities',
      displayState: isApproved('UTIL-001') ? 'approved' : con001Approved ? 'ready' : 'waiting',
      applicability: 'applicable',
      requiredAction: isApproved('UTIL-001') ? undefined : con001Approved ? 'Start Requirement' : undefined,
      nextMilestone: isApproved('UTIL-001') ? 'Power Energized' : con001Approved ? 'Apply for HT Connection' : 'Waiting for Construction Stage',
      documents: isApproved('UTIL-001') ? '3 / 3 Ready' : '0 / 3 Ready',
      inspectionState: isApproved('UTIL-001') ? 'Connected' : 'Not Scheduled',
      dependencies: [{ reqId: 'CON-001', type: 'hard', reason: 'Building Plan Approval required before utility connections.' }],
      approvalRef: isApproved('UTIL-001') ? 'MSEDCL/HT/2026/0882' : undefined,
      approvedDate: isApproved('UTIL-001') ? '10 Oct 2026' : undefined,
    },
    {
      id: 'UTIL-002',
      department: 'MIDC',
      service: 'Water Connection',
      stage: 'utilities',
      displayState: isApproved('UTIL-002') ? 'approved' : con001Approved ? 'ready' : 'waiting',
      applicability: 'applicable',
      requiredAction: isApproved('UTIL-002') ? undefined : con001Approved ? 'Start Requirement' : undefined,
      nextMilestone: isApproved('UTIL-002') ? 'Water Supply Active' : con001Approved ? 'Apply for Water Connection' : 'Waiting for Construction Stage',
      documents: isApproved('UTIL-002') ? '3 / 3 Ready' : '0 / 3 Ready',
      inspectionState: isApproved('UTIL-002') ? 'Connected' : 'Not Scheduled',
      dependencies: [{ reqId: 'CON-001', type: 'hard' }],
      approvalRef: isApproved('UTIL-002') ? 'MIDC/WATER/2026/3041' : undefined,
      approvedDate: isApproved('UTIL-002') ? '12 Oct 2026' : undefined,
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
      displayState: isApproved('UTIL-004') ? 'approved' : 'conditional',
      applicability: 'conditional',
      conditionReason: 'Applicable if project generates industrial/domestic wastewater and connects to municipal drainage.',
      nextMilestone: isApproved('UTIL-004') ? 'Drainage Connected' : 'Awaiting wastewater assessment',
      documents: isApproved('UTIL-004') ? '2 / 2 Ready' : undefined,
      dependencies: [{ reqId: 'CON-001', type: 'conditional', reason: 'Building Plan Approval required; conditional on drainage route.' }],
      approvalRef: isApproved('UTIL-004') ? 'ULB/DRAIN/2026/0291' : undefined,
      approvedDate: isApproved('UTIL-004') ? '14 Oct 2026' : undefined,
    },
    {
      id: 'PREOP-001',
      department: 'MPCB',
      service: 'Consent to Operate (CTO)',
      stage: 'pre-operation',
      displayState: preop001Approved ? 'approved' : (con001Approved && con002Approved) ? 'ready' : 'waiting',
      applicability: 'applicable',
      requiredAction: preop001Approved ? undefined : (con001Approved && con002Approved) ? 'Start Requirement' : undefined,
      nextMilestone: preop001Approved ? 'Operations Clearance Active' : 'Waiting for Provisional Fire NOC & Building Plan',
      documents: preop001Approved ? '8 / 8 Ready' : '0 / 8 Ready',
      inspectionState: preop001Approved ? 'Completed' : 'Not Scheduled',
      dependencies: [
        { reqId: 'CON-002', type: 'hard', reason: 'Provisional Fire NOC must be obtained before CTO.' },
        { reqId: 'CON-001', type: 'hard', reason: 'Building Plan Approval required.' },
      ],
      unlocks: ['COMPLY-001'],
      approvalRef: preop001Approved ? 'MPCB/CTO/2026/9931' : undefined,
      approvedDate: preop001Approved ? '18 Oct 2026' : undefined,
    },
    {
      id: 'PREOP-002',
      department: 'DISH',
      service: 'Factory / Occupier Registration',
      stage: 'pre-operation',
      displayState: preop002Approved ? 'approved' : con001Approved ? 'ready' : 'waiting',
      applicability: 'applicable',
      requiredAction: preop002Approved ? undefined : con001Approved ? 'Start Requirement' : undefined,
      nextMilestone: preop002Approved ? 'Factory Registered' : 'Waiting for Building Plan Approval',
      documents: preop002Approved ? '5 / 5 Ready' : '0 / 5 Ready',
      inspectionState: preop002Approved ? 'Verified' : 'Not Scheduled',
      dependencies: [{ reqId: 'CON-001', type: 'hard' }],
      unlocks: ['PREOP-003'],
      approvalRef: preop002Approved ? 'DISH/REG/2026/5520' : undefined,
      approvedDate: preop002Approved ? '20 Oct 2026' : undefined,
    },
    {
      id: 'PREOP-003',
      department: 'Directorate of Boilers',
      service: 'Boiler Registration',
      stage: 'pre-operation',
      displayState: isApproved('PREOP-003') ? 'approved' : 'conditional',
      applicability: 'conditional',
      conditionReason: 'Applicable if boiler is installed. Verify boiler specification.',
      documents: isApproved('PREOP-003') ? '4 / 4 Ready' : '0 / 4 Ready',
      inspectionState: isApproved('PREOP-003') ? 'Inspected' : 'Not Scheduled',
      dependencies: [{ reqId: 'PREOP-002', type: 'conditional' }],
      approvalRef: isApproved('PREOP-003') ? 'BOILER/REG/2026/1104' : undefined,
      approvedDate: isApproved('PREOP-003') ? '22 Oct 2026' : undefined,
    },
    {
      id: 'PREOP-004',
      department: 'Fire',
      service: 'Final Fire NOC',
      stage: 'pre-operation',
      displayState: isApproved('PREOP-004') ? 'approved' : con002Approved ? 'ready' : 'waiting',
      applicability: 'applicable',
      requiredAction: isApproved('PREOP-004') ? undefined : con002Approved ? 'Start Requirement' : undefined,
      nextMilestone: isApproved('PREOP-004') ? 'Fire Clearance Granted' : 'After construction completion',
      documents: isApproved('PREOP-004') ? '4 / 4 Ready' : '0 / 4 Ready',
      inspectionState: isApproved('PREOP-004') ? 'Passed' : 'Not Scheduled',
      dependencies: [{ reqId: 'CON-002', type: 'hard' }],
      approvalRef: isApproved('PREOP-004') ? 'MFS/FINAL/2026/6630' : undefined,
      approvedDate: isApproved('PREOP-004') ? '24 Oct 2026' : undefined,
    },
    {
      id: 'COMPLY-001',
      department: 'MPCB',
      service: 'Compliance Reporting',
      stage: 'compliance',
      displayState: isApproved('COMPLY-001') ? 'approved' : preop001Approved ? 'ready' : 'waiting',
      applicability: 'applicable',
      requiredAction: isApproved('COMPLY-001') ? undefined : preop001Approved ? 'Start Requirement' : undefined,
      conditionReason: isApproved('COMPLY-001') ? undefined : 'Generated after CTO approval. Compliance obligations will appear here.',
      documents: isApproved('COMPLY-001') ? '1 / 1 Ready' : undefined,
      dependencies: [{ reqId: 'PREOP-001', type: 'hard' }],
      approvalRef: isApproved('COMPLY-001') ? 'MPCB/COMP/2026/012' : undefined,
      approvedDate: isApproved('COMPLY-001') ? '28 Oct 2026' : undefined,
    },
  ];
}

export function getJourneySimulationStep(nodes: JourneyReq[], simulatedIds: readonly string[]): JourneySimulationStep {
  const simulatedSet = new Set(simulatedIds);
  const totalSimulatableSteps = 9; // EST-001, CON-001, CON-002, UTIL-001, UTIL-002, PREOP-001, PREOP-002, PREOP-004, COMPLY-001

  // 1. Initial State: CTE has not been approved yet
  if (!simulatedSet.has('EST-001')) {
    const cteNode = nodes.find(n => n.id === 'EST-001');
    return {
      nextReq: cteNode,
      buttonLabel: 'Simulate CTE Approval →',
      description: 'Simulate the configured CTE decision to preview how dependent requirements change state.',
      isComplete: false,
      stepIndex: 0,
      totalSteps: totalSimulatableSteps,
    };
  }

  // 2. Find next ready requirement that is not yet simulated
  const nextReady = nodes.find(n => n.displayState === 'ready' && !simulatedSet.has(n.id));
  if (nextReady) {
    return {
      nextReq: nextReady,
      buttonLabel: `Approve Next: ${nextReady.service} →`,
      description: `Simulate approval of ${nextReady.service} (${nextReady.department}) to unlock downstream requirements.`,
      isComplete: false,
      stepIndex: simulatedIds.length,
      totalSteps: totalSimulatableSteps,
    };
  }

  // 3. If any conditional requirement can be simulated
  const nextConditional = nodes.find(n => n.displayState === 'conditional' && !simulatedSet.has(n.id));
  if (nextConditional && (simulatedSet.has('PREOP-002') || simulatedSet.has('CON-001'))) {
    return {
      nextReq: nextConditional,
      buttonLabel: `Approve Conditional: ${nextConditional.service} →`,
      description: `Simulate condition fulfillment and approval for ${nextConditional.service} (${nextConditional.department}).`,
      isComplete: false,
      stepIndex: simulatedIds.length,
      totalSteps: totalSimulatableSteps,
    };
  }

  // 4. All steps completed
  return {
    nextReq: undefined,
    buttonLabel: '✓ Approval Journey Completed',
    description: 'All statutory approvals in the demo journey have been successfully simulated and granted.',
    isComplete: true,
    stepIndex: totalSimulatableSteps,
    totalSteps: totalSimulatableSteps,
  };
}

export function listJourneyNodesForBusiness(
  businessId: string,
  cteApprovedOrSimulatedIds: boolean | readonly string[] = false,
): JourneyReq[] {
  return buildJourneyNodes(cteApprovedOrSimulatedIds).filter(node =>
    Boolean(findBusinessEntity('requirement', businessId, node.id)),
  );
}

export function journeyStateCfg(state: JourneyDisplayState) {
  const map: Record<JourneyDisplayState, { label: string; icon: string; bg: string; border: string; textCls: string; badgeCls: string }> = {
    'ready':               { label: 'Ready',                  icon: '▶', bg: 'bg-white',         border: 'border-[#6DAE7C]',   textCls: 'text-[#355E3B]', badgeCls: 'bg-[#edf5ef] text-[#355E3B] border-[#b8d0f5]' },
    'in-progress':         { label: 'In Progress',            icon: '◎', bg: 'bg-white',         border: 'border-[#6366f1]',   textCls: 'text-[#3730a3]', badgeCls: 'bg-[#ede9fe] text-[#3730a3] border-[#c4b5fd]' },
    'waiting':             { label: 'Waiting on Dependency',  icon: '⏸', bg: 'bg-[#F9FAF2]',    border: 'border-[#d6dfd5]',   textCls: 'text-[#555C56]', badgeCls: 'bg-[#F9FAF2] text-[#555C56] border-[#d6dfd5]' },
    'action-required':     { label: 'Action Required',        icon: '!', bg: 'bg-[#fdf8e6]',     border: 'border-[#D4A017]',   textCls: 'text-[#7a5807]', badgeCls: 'bg-[#fdf8e6] text-[#7a5807] border-[#fae69e]' },
    'under-review':        { label: 'Under Department Review',icon: '⧖', bg: 'bg-white',         border: 'border-[#6366f1]',   textCls: 'text-[#3730a3]', badgeCls: 'bg-[#ede9fe] text-[#3730a3] border-[#c4b5fd]' },
    'inspection-scheduled':{ label: 'Inspection Scheduled',   icon: '•', bg: 'bg-[#fff7ed]',   border: 'border-[#D4A017]',   textCls: 'text-[#7c2d12]', badgeCls: 'bg-[#fed7aa] text-[#7c2d12] border-[#fb923c]' },
    'approved':            { label: 'Approved',               icon: '✓', bg: 'bg-[#f0fdf4]',    border: 'border-[#86efac]',   textCls: 'text-[#166534]', badgeCls: 'bg-[#f0fdf4] text-[#166534] border-[#86efac]' },
    'rejected':            { label: 'Rejected',               icon: '✕', bg: 'bg-[#fff1f2]',    border: 'border-[#fca5a5]',   textCls: 'text-[#991b1b]', badgeCls: 'bg-[#ffe4e6] text-[#991b1b] border-[#fca5a5]' },
    'conditional':         { label: 'Conditional',            icon: '?', bg: 'bg-[#fdf8e6]',     border: 'border-[#fae69e]',   textCls: 'text-[#634805]', badgeCls: 'bg-[#fdf8e6] text-[#634805] border-[#fae69e]' },
    'needs-verification':  { label: 'Needs Verification',     icon: '◌', bg: 'bg-[#f0f4ff]',    border: 'border-[#a5b4fc]',   textCls: 'text-[#3730a3]', badgeCls: 'bg-[#e0e7ff] text-[#3730a3] border-[#a5b4fc]' },
    'not-applicable':      { label: 'Not Applicable',         icon: '—', bg: 'bg-[#F9FAF2]',    border: 'border-[#e3ebe1]',   textCls: 'text-[#8c9f8a]', badgeCls: 'bg-[#F9FAF2] text-[#8c9f8a] border-[#e3ebe1]' },
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
