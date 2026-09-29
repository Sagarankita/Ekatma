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

export type ValidationState = 'verified' | 'attention' | 'info';

export interface ValidationIssue {
  id: string;
  section: string;
  label: string;
  detail: string;
  severity: 'blocking' | 'warning' | 'passed';
  state: ValidationState;
  action: string;
  actionHref?: string;
}

export const E15_ISSUES: readonly ValidationIssue[] = [
  {
    id: 'val-01',
    section: 'Common Information',
    label: 'Legal entity & registration confirmed',
    detail: 'Legal entity, PAN, and CIN are verified from the Master Project Dossier and Ministry of Corporate Affairs API.',
    severity: 'passed',
    state: 'verified',
    action: 'View Dossier →',
    actionHref: 'dossier',
  },
  {
    id: 'val-02',
    section: 'Common Information',
    label: 'Plot area differs from Master Project Dossier',
    detail: 'Plot area in this application draft differs from your Master Project Dossier (11,800 m² entered vs 12,500 m² recorded in MIDC Lease Agreement).',
    severity: 'warning',
    state: 'attention',
    action: 'Review difference →',
    actionHref: 'consistency',
  },
  {
    id: 'val-03',
    section: 'Common Information',
    label: 'Project location verified',
    detail: 'MIDC estate (Chakan Phase II), plot number (C-14/2), district (Pune), and taluka (Khed) are verified against land records.',
    severity: 'passed',
    state: 'verified',
    action: '',
  },
  {
    id: 'val-04',
    section: 'Service-Specific Questions',
    label: 'Mandatory effluent & emission questions complete',
    detail: 'Industrial effluent, air emissions, hazardous waste, and manufacturing process description have been fully answered.',
    severity: 'passed',
    state: 'verified',
    action: '',
  },
  {
    id: 'val-05',
    section: 'Forms & Annexures',
    label: 'Form I and Environmental Statement complete',
    detail: 'CTE Application Form (Form I) and Environmental Statement have been filled and confirmed.',
    severity: 'passed',
    state: 'verified',
    action: '',
  },
  {
    id: 'val-06',
    section: 'Documents',
    label: 'MIDC Lease Agreement — Verified',
    detail: 'Document DOC-002 is available, e-Pramaan timestamped, and user-confirmed from Document Centre.',
    severity: 'passed',
    state: 'verified',
    action: 'View Document →',
    actionHref: 'documents',
  },
  {
    id: 'val-07',
    section: 'Documents',
    label: 'ETP Design Details — Verification endorsement pending',
    detail: 'Uploaded technical drawing requires consultant digital signature verification prior to final department scrutiny.',
    severity: 'warning',
    state: 'attention',
    action: 'Verify Document →',
    actionHref: 'documents',
  },
  {
    id: 'val-08',
    section: 'Documents',
    label: 'MIDC Water Allocation Letter — Optional supporting proof',
    detail: 'For industrial units requiring over 50 KLD water, attaching the preliminary water allocation letter accelerates technical scrutiny.',
    severity: 'warning',
    state: 'info',
    action: 'Upload Document →',
    actionHref: 'documents',
  },
  {
    id: 'val-09',
    section: 'Declarations',
    label: 'All statutory declarations confirmed',
    detail: 'All three mandated declarations (data accuracy, condition compliance, authorised signatory) have been confirmed.',
    severity: 'passed',
    state: 'verified',
    action: '',
  },
];

export interface ConsistencyApplication {
  name: string;
  value: string;
  status: 'consistent' | 'review' | 'conflict';
}

export interface ConsistencyRow {
  id: string;
  field: string;
  master: string;
  masterSource: string;
  appValue: string;
  appSource: string;
  explanation: string;
  applications: ConsistencyApplication[];
}

export const E16_ROWS: readonly ConsistencyRow[] = [
  {
    id: 'c-plot-area',
    field: 'Plot Area',
    master: '12,500 m²',
    masterSource: 'MIDC Lease Agreement (DOC-002)',
    appValue: '11,800 m²',
    appSource: 'Application Form Draft (CTE & Fire NOC)',
    explanation: 'These values are different. Your Master Project Dossier specifies 12,500 m² based on the verified MIDC Lease Deed, while the application form states 11,800 m².',
    applications: [
      { name: 'MPCB — CTE', value: '11,800 m²', status: 'review' },
      { name: 'DISH — Factory Reg.', value: '12,500 m²', status: 'consistent' },
      { name: 'Fire — NOC', value: '11,800 m²', status: 'review' },
    ],
  },
  {
    id: 'c-workforce',
    field: 'Workforce (Proposed)',
    master: '180',
    masterSource: 'Project Environmental Report (DOC-001)',
    appValue: '175',
    appSource: 'DISH Factory Registration Draft',
    explanation: 'These values are different. The Master Dossier project DPR projects 180 total workers, whereas the preliminary form entered 175 workers.',
    applications: [
      { name: 'MPCB — CTE', value: '180', status: 'consistent' },
      { name: 'DISH — Factory Reg.', value: '175', status: 'review' },
    ],
  },
  {
    id: 'c-investment',
    field: 'Total Capital Investment',
    master: '₹45,00,00,000',
    masterSource: 'Master Project Dossier & CA Certificate',
    appValue: '₹45,00,00,000',
    appSource: 'MPCB & DISH Application Forms',
    explanation: 'Values match across all records.',
    applications: [
      { name: 'MPCB — CTE', value: '₹45,00,00,000', status: 'consistent' },
      { name: 'DISH — Factory Reg.', value: '₹45,00,00,000', status: 'consistent' },
    ],
  },
  {
    id: 'c-building-area',
    field: 'Building / Built-up Area',
    master: '8,500 m²',
    masterSource: 'Architectural Layout Plan (DOC-004)',
    appValue: '8,500 m²',
    appSource: 'MPCB CTE & Fire Application Forms',
    explanation: 'Values match across all records.',
    applications: [
      { name: 'MPCB — CTE', value: '8,500 m²', status: 'consistent' },
      { name: 'Fire — NOC', value: '8,500 m²', status: 'consistent' },
    ],
  },
  {
    id: 'c-entity',
    field: 'Legal Entity Name',
    master: 'Sahyadri Bio-Pharma Pvt Ltd',
    masterSource: 'MCA Incorporation Certificate',
    appValue: 'Sahyadri Bio-Pharma Pvt Ltd',
    appSource: 'All Applications',
    explanation: 'Values match across all records.',
    applications: [
      { name: 'MPCB — CTE', value: 'Sahyadri Bio-Pharma Pvt Ltd', status: 'consistent' },
      { name: 'DISH — Factory Reg.', value: 'Sahyadri Bio-Pharma Pvt Ltd', status: 'consistent' },
      { name: 'Fire — NOC', value: 'Sahyadri Bio-Pharma Pvt Ltd', status: 'consistent' },
    ],
  },
  {
    id: 'c-location',
    field: 'Project Location',
    master: 'Chakan Industrial Area Phase II, Plot C-14/2',
    masterSource: 'MIDC Land Possession Order',
    appValue: 'Chakan Industrial Area Phase II, Plot C-14/2',
    appSource: 'All Applications',
    explanation: 'Values match across all records.',
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
  lastUpdated?: string;
  submittedDate?: string;
  targetDate?: string;
  totalSlaDays?: number;
}

export const TRACKER_APPS: readonly TrackerApp[] = [
  {
    id: 'app-mpcb-cte',
    service: 'Consent to Establish',
    dept: 'MPCB',
    stage: 'Technical Scrutiny',
    appId: 'APP-2026-MPCB-00412',
    currentDesk: 'Technical Scrutiny Desk (Bio-Pharma Cell)',
    status: 'Action Required',
    statusType: 'action',
    sla: 'Within SLA (12 of 21 days)',
    slaType: 'ok',
    daysElapsed: 12,
    inspection: 'Conducted (INS-002)',
    actionRequired: 'Respond to Query QRY-001 — Water balance and ETP mismatch',
    lastUpdated: '2 days ago · 25 Sep 2026',
    submittedDate: '14 Sep 2026',
    targetDate: '05 Oct 2026',
    totalSlaDays: 21,
  },
  {
    id: 'app-midc-bp',
    service: 'Building / Planning Approval',
    dept: 'MIDC',
    stage: 'Document Scrutiny',
    appId: 'APP-2026-MIDC-00187',
    currentDesk: 'Town Planning Section (Chakan)',
    status: 'Action Required',
    statusType: 'action',
    sla: 'Within SLA (5 of 30 days)',
    slaType: 'ok',
    daysElapsed: 5,
    inspection: 'Scheduled (INS-001)',
    actionRequired: 'Upload revised building plan — Query QRY-002 raised',
    lastUpdated: '1 day ago · 26 Sep 2026',
    submittedDate: '21 Sep 2026',
    targetDate: '21 Oct 2026',
    totalSlaDays: 30,
  },
  {
    id: 'app-fire-noc',
    service: 'Fire NOC',
    dept: 'Fire',
    stage: 'Inspection Scheduled',
    appId: 'APP-2026-FIRE-00093',
    currentDesk: 'Divisional Fire Officer (Pune Rural)',
    status: 'Inspection Scheduled',
    statusType: 'active',
    sla: 'Due Soon (28 of 30 days)',
    slaType: 'due-soon',
    daysElapsed: 28,
    inspection: 'Scheduled — 26 Sep 2026 (INS-001)',
    actionRequired: 'Prepare site for joint inspection on 26 Sep 2026',
    lastUpdated: '3 days ago · 24 Sep 2026',
    submittedDate: '29 Aug 2026',
    targetDate: '29 Sep 2026',
    totalSlaDays: 30,
  },
  {
    id: 'app-dish-factory',
    service: 'Factory Registration',
    dept: 'DISH',
    stage: 'Submitted',
    appId: 'APP-2026-DISH-00241',
    currentDesk: 'Fee / Challan Verification Desk',
    status: 'Submitted',
    statusType: 'active',
    sla: 'SLA Started (1 of 30 days)',
    slaType: 'ok',
    daysElapsed: 1,
    inspection: 'Required — Awaiting Schedule',
    actionRequired: null,
    lastUpdated: 'Today · 28 Sep 2026',
    submittedDate: '27 Sep 2026',
    targetDate: '27 Oct 2026',
    totalSlaDays: 30,
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
    lastUpdated: '5 days ago · 22 Sep 2026',
    submittedDate: '—',
    targetDate: '—',
    totalSlaDays: 15,
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
    lastUpdated: '12 days ago · 15 Sep 2026',
    submittedDate: '15 Aug 2026',
    targetDate: '05 Sep 2026',
    totalSlaDays: 21,
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
    lastUpdated: '3 days ago · 24 Sep 2026',
    submittedDate: '20 Sep 2026',
    targetDate: '20 Oct 2026',
    totalSlaDays: 30,
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
    lastUpdated: '14 days ago · 13 Sep 2026',
    submittedDate: '30 Aug 2026',
    targetDate: '13 Sep 2026',
    totalSlaDays: 14,
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
      return 'text-[#D4A017] font-semibold';
    case 'over':
      return 'text-[#b91c1c] font-semibold';
    case 'na':
    default:
      return 'text-[#9ab098]';
  }
}

export function statusBadgeTrackerClass(statusType: TrackerApp['statusType']): string {
  switch (statusType) {
    case 'active':
      return 'bg-[#edf5ef] text-[#539160] border-[#a1cba9]';
    case 'action':
      return 'bg-[#fee2e2] text-[#b91c1c] border-[#fca5a5]';
    case 'approved':
      return 'bg-[#dcfce7] text-[#166534] border-[#86efac]';
    case 'waiting':
      return 'bg-[#fdf8e6] text-[#7a5807] border-[#fae69e]';
    case 'over-sla':
      return 'bg-[#fee2e2] text-[#b91c1c] border-[#fca5a5]';
    default:
      return 'bg-[#F9FAF2] text-[#4A4A4A] border-[#e3ebe1]';
  }
}

// ─── Human-Centric Lifecycle & Responsibility Models ──────────────────────────

export type ProcessingResponsibility = 'entrepreneur' | 'government' | 'department-dependency' | 'completed';

export interface AppLifecycleStage {
  id: 'submitted' | 'fee' | 'doc-review' | 'scrutiny' | 'query' | 'inspection' | 'decision';
  name: string;
  status: 'completed' | 'in-progress' | 'action-required' | 'waiting-dependency' | 'upcoming';
  statusLabel: string;
  date: string;
  owner: string;
  timeSpent?: string;
  whatIsNeeded?: string | null;
  actionHref?: string;
  actionLabel?: string;
}

export function getApplicationResponsibility(app: TrackerApp): ProcessingResponsibility {
  if (app.statusType === 'approved') return 'completed';
  const action = app.actionRequired?.toLowerCase();
  if (
    app.statusType === 'waiting' ||
    app.appId === '—' ||
    Boolean(action?.includes('prerequisite')) ||
    Boolean(action?.includes('waiting for mpcb'))
  ) {
    return 'department-dependency';
  }
  if (
    app.statusType === 'action' ||
    Boolean(
      action &&
        (action.includes('respond') ||
         action.includes('upload') ||
         action.includes('rectif') ||
         action.includes('deficienc') ||
         action.includes('query') ||
         action.includes('revised'))
    )
  ) {
    return 'entrepreneur';
  }
  return 'government';
}

export function responsibilityBadgeClass(resp: ProcessingResponsibility): string {
  switch (resp) {
    case 'entrepreneur':
      return 'bg-[#fee2e2] text-[#b91c1c] border-[#fca5a5]';
    case 'government':
      return 'bg-[#edf5ef] text-[#539160] border-[#a1cba9]';
    case 'department-dependency':
      return 'bg-[#fdf8e6] text-[#7a5807] border-[#fae69e]';
    case 'completed':
      return 'bg-[#dcfce7] text-[#166534] border-[#86efac]';
  }
}

export function responsibilityLabel(resp: ProcessingResponsibility): string {
  switch (resp) {
    case 'entrepreneur':
      return 'ENTREPRENEUR ACTION';
    case 'government':
      return 'GOVERNMENT ACTION';
    case 'department-dependency':
      return 'WAITING FOR ANOTHER DEPARTMENT';
    case 'completed':
      return 'COMPLETED';
  }
}

export function getHumanAuthority(dept: string, desk?: string): string {
  const normalized = (desk ?? '').toLowerCase();
  if (normalized.includes('safety')) return 'Directorate of Industrial Safety & Health (DISH)';
  if (normalized.includes('cfo') || normalized.includes('fire')) return 'Fire Services Officer';
  if (normalized.includes('town planning') || normalized.includes('planning')) return 'MIDC Planning Department';
  if (normalized.includes('regional officer')) return `${dept} Regional Officer`;
  if (normalized.includes('treasury') || normalized.includes('challan') || normalized.includes('fee')) return 'Government Treasury & Finance Portal';
  if (normalized.includes('environment') || normalized.includes('scrutiny')) return 'MPCB Environmental Officer';
  if (dept === 'MPCB') return 'MPCB Environmental Officer';
  if (dept === 'MIDC') return 'MIDC Planning Department';
  if (dept === 'Fire') return 'Fire Services Officer';
  if (dept === 'DISH') return 'Directorate of Industrial Safety & Health (DISH)';
  if (dept === 'Boiler') return 'Directorate of Steam Boilers';
  return `${dept} Clearance Officer`;
}

export function getApplicationLifecycle(
  app: TrackerApp,
  query?: QueryRecord,
  inspection?: InspectionRecord,
  decision?: DecisionRecord
): AppLifecycleStage[] {
  const stages: AppLifecycleStage[] = [];
  const authority = getHumanAuthority(app.dept, app.currentDesk);

  // 1. Submitted (always applicable)
  stages.push({
    id: 'submitted',
    name: 'Submitted',
    status: 'completed',
    statusLabel: 'Completed',
    date: app.submittedDate && app.submittedDate !== '—' ? app.submittedDate : '14 Sep 2026',
    owner: 'Entrepreneur (Self-Service Portal)',
    timeSpent: 'Instant',
    whatIsNeeded: 'None — Form submitted and digitally signed.',
  });

  // 2. Fee / Challan (applicable)
  const isFeePending = app.stage === 'Submitted' && app.currentDesk.toLowerCase().includes('fee');
  stages.push({
    id: 'fee',
    name: 'Fee / Challan',
    status: isFeePending ? 'in-progress' : 'completed',
    statusLabel: isFeePending ? 'In Process' : 'Verified',
    date: app.submittedDate && app.submittedDate !== '—' ? app.submittedDate : '14 Sep 2026',
    owner: 'Government Treasury (GRAS Gateway)',
    timeSpent: isFeePending ? '1 day' : 'Same day',
    whatIsNeeded: isFeePending ? 'Awaiting treasury bank reconciliation.' : 'None — Statutory challan paid and verified.',
  });

  // 3. Document Review (applicable)
  const docReviewDone = app.daysElapsed > 4 || app.stage.toLowerCase().includes('scrutiny') || app.stage.toLowerCase().includes('review') || Boolean(decision);
  const isDocReviewActive = app.stage === 'Document Scrutiny';
  stages.push({
    id: 'doc-review',
    name: 'Document Review',
    status: docReviewDone ? 'completed' : isDocReviewActive ? 'in-progress' : 'upcoming',
    statusLabel: docReviewDone ? 'Completed' : isDocReviewActive ? 'In Process' : 'Upcoming',
    date: docReviewDone ? '16 Sep 2026' : 'Active',
    owner: `${app.dept} Administrative Cell`,
    timeSpent: docReviewDone ? '2 days' : `${app.daysElapsed} days`,
    whatIsNeeded: docReviewDone ? 'None — All mandatory documents checked.' : 'Administrative officer reviewing submitted attachments.',
  });

  // 4. Scrutiny (applicable)
  const isScrutinyActive = app.stage.toLowerCase().includes('scrutiny') || app.stage.toLowerCase().includes('review');
  const scrutinyDone = Boolean(decision) || (Boolean(inspection) && (inspection?.status === 'Resolved' || inspection?.status === 'Completed'));
  const hasQuery = Boolean(query) || (Boolean(app.actionRequired) && app.actionRequired!.toLowerCase().includes('query'));

  stages.push({
    id: 'scrutiny',
    name: 'Technical Scrutiny',
    status: hasQuery ? 'action-required' : isScrutinyActive ? 'in-progress' : scrutinyDone ? 'completed' : 'upcoming',
    statusLabel: hasQuery ? 'Action Required' : isScrutinyActive ? 'In Process' : scrutinyDone ? 'Completed' : 'Upcoming',
    date: isScrutinyActive || scrutinyDone ? '17 Sep 2026' : 'Upcoming',
    owner: authority,
    timeSpent: isScrutinyActive ? `${Math.min(app.daysElapsed, 7)} days` : scrutinyDone ? '5 days' : undefined,
    whatIsNeeded: hasQuery ? 'Awaiting your response to technical queries.' : isScrutinyActive ? 'None — Technical evaluation in progress.' : undefined,
  });

  // 5. Query / Correction (ONLY if required / raised!)
  if (hasQuery) {
    stages.push({
      id: 'query',
      name: 'Query / Correction',
      status: 'action-required',
      statusLabel: 'Action Required',
      date: query ? query.issuedDate : '25 Sep 2026',
      owner: authority,
      timeSpent: 'Waiting on Entrepreneur',
      whatIsNeeded: query
        ? `Respond to ${query.deficiencies.length} items before deadline (${query.responseDeadline}).`
        : (app.actionRequired ?? 'Clarification requested by officer.'),
      actionLabel: 'Respond to Query',
    });
  }

  // 6. Inspection (ONLY if required / scheduled / conducted!)
  const inspectionApplicable = Boolean(inspection) || app.inspection.toLowerCase().includes('scheduled') || app.inspection.toLowerCase().includes('conducted') || app.inspection.toLowerCase().includes('required');
  if (inspectionApplicable) {
    const isInspectionScheduled = app.inspection.toLowerCase().includes('scheduled') || inspection?.status === 'Scheduled';
    const isInspectionDone = inspection?.status === 'Resolved' || inspection?.status === 'Completed' || app.inspection.toLowerCase().includes('conducted');
    stages.push({
      id: 'inspection',
      name: 'Site Inspection',
      status: isInspectionDone ? 'completed' : isInspectionScheduled ? 'in-progress' : 'upcoming',
      statusLabel: isInspectionDone ? 'Completed' : isInspectionScheduled ? 'Inspection Scheduled' : 'Awaiting Schedule',
      date: inspection ? inspection.date : (app.inspection.includes('26 Sep') ? '26 Sep 2026' : 'Awaiting Schedule'),
      owner: `${app.dept} Field Verification Inspector`,
      timeSpent: isInspectionDone ? '1 day' : undefined,
      whatIsNeeded: isInspectionScheduled
        ? 'Keep site accessible and technical drawings on hand for visiting officer.'
        : isInspectionDone
        ? 'None — Field observations accepted.'
        : 'Department is assigning field inspection inspector.',
    });
  }

  // 7. Decision (always applicable)
  const isDecisionMade = Boolean(decision) || app.statusType === 'approved';
  stages.push({
    id: 'decision',
    name: 'Decision',
    status: isDecisionMade ? 'completed' : 'upcoming',
    statusLabel: isDecisionMade ? 'Granted' : 'In Process',
    date: decision ? decision.decisionDate : (app.targetDate ?? 'Statutory deadline'),
    owner: `${app.dept} Competent Authority`,
    timeSpent: isDecisionMade ? 'Completed' : undefined,
    whatIsNeeded: isDecisionMade
      ? 'None — Clearance certificate granted.'
      : 'Awaiting final determination following completion of scrutiny.',
  });

  return stages;
}

// ─── Query & Deficiency Models ────────────────────────────────────────────────

export interface Deficiency {
  id: string;
  type: 'correction' | 'rejected';
  summary: string;
  issue: string; // WHAT NEEDS TO BE FIXED?
  explanation: string; // WHY?
  evidenceNeeded: string; // WHAT EVIDENCE IS NEEDED?
  requiredAction: string; // WHAT DO I NEED TO SUBMIT?
  officerComment: string;
  relatedField: string;
  relatedDocument: string | null;
  regulatoryRef: string | null;
  section: string;
  deadline?: string; // WHEN?
  evidenceDocName?: string;
  defaultResponse?: string;
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
      issue: 'Water consumption figure in Form-I contradicts DPR calculation',
      explanation: 'Application declares daily consumption of 50 KL/day, but the Detailed Project Report (DPR) water balance diagram shows 65 KL/day across production processes. The lower figure under-reports prospective effluent discharge.',
      evidenceNeeded: 'Corrected Water Balance Diagram signed by Chartered Environmental Engineer',
      requiredAction: 'Update Form-I water consumption to 65 KL/day and upload the revised Water Balance Diagram.',
      officerComment: 'Water consumption stated in the application (50 KL/day) does not match the water balance chart submitted in the DPR (65 KL/day). The discrepancy must be resolved with a corrected water balance statement.',
      relatedField: 'Daily Water Consumption (KL/day)',
      relatedDocument: 'Project Environmental Report / DPR',
      regulatoryRef: 'MPCB CTE Form-I, Annexure A — Water Balance Norms',
      section: 'e05-env',
      deadline: '09 Oct 2026',
      evidenceDocName: 'revised_water_balance_chart_v2.pdf',
      defaultResponse: 'The daily water consumption has been updated to 65 KL/day in Form-I to reflect peak batch operations as outlined in the DPR. The revised Water Balance Chart signed by our environmental consultant has been attached.',
    },
    {
      id: 'DEF-002',
      type: 'correction',
      summary: 'ETP capacity mismatch',
      issue: 'Effluent Treatment Plant (ETP) capacity is undersized for corrected water volume',
      explanation: 'Declared ETP capacity is 55 KL/day, but the 65 KL/day water balance implies 70 KL/day of peak industrial and domestic wastewater generation. The plant must be sized for peak generation with hydraulic buffer.',
      evidenceNeeded: 'Revised ETP Engineering Sizing & Hydraulic Flow Diagram (70 KL/day buffer)',
      requiredAction: 'Update ETP capacity parameter to 70 KL/day and upload revised engineering drawings with clarifier specs.',
      officerComment: 'ETP design capacity declared as 55 KL/day but the corrected water balance implies 70 KL/day of wastewater generation. The ETP must be designed to handle the actual wastewater load.',
      relatedField: 'ETP Design Capacity (KL/day)',
      relatedDocument: 'ETP Design Details',
      regulatoryRef: 'MPCB Environmental Standards — Schedule VI, ETP Sizing Norms',
      section: 'e05-env',
      deadline: '09 Oct 2026',
      evidenceDocName: 'etp_design_specs_v2_70kld.pdf',
      defaultResponse: 'ETP design capacity has been upgraded from 55 KL/day to 70 KL/day. Revised engineering drawings with upgraded secondary clarifier and aeration tank sizing have been uploaded.',
    },
    {
      id: 'DEF-003',
      type: 'correction',
      summary: 'Solid/hazardous waste management plan missing',
      issue: 'Hazardous Waste Management Plan not attached to application dossier',
      explanation: 'For Red Category Bio-Pharma manufacturing, a comprehensive waste management plan is legally mandatory prior to Consent to Establish. Storage categories and disposal pathways must be documented.',
      evidenceNeeded: 'Solid & Hazardous Waste Management Protocol covering categories, storage yard, and disposal pathway',
      requiredAction: 'Upload a certified Solid & Hazardous Waste Management Plan covering waste categorization, storage drums, and authorized recycling tie-ups.',
      officerComment: 'No Solid/Hazardous Waste Management Plan has been submitted. A detailed waste management plan is mandatory for Red Category industries under the Bio-Pharma sector.',
      relatedField: 'Hazardous Waste Management Plan',
      relatedDocument: null,
      regulatoryRef: 'Hazardous and Other Wastes (Management and Transboundary Movement) Rules, 2016 — Rule 4',
      section: 'e14-application',
      deadline: '09 Oct 2026',
      evidenceDocName: 'hazardous_waste_management_plan_v1.pdf',
      defaultResponse: 'A comprehensive Hazardous Waste Management Plan detailing spent solvent handling, dedicated hazardous storage yard, and authorized MEPL disposal tie-up has been prepared and attached.',
    },
  ],
};

export const SAHYADRI_MIDC_QUERY: QueryRecord = {
  queryId: 'QRY-2026-MIDC-00187',
  appId: 'APP-2026-MIDC-00187',
  dept: 'MIDC',
  service: 'Building / Planning Approval',
  issuedDate: '23 Sep 2026',
  responseDeadline: '30 Sep 2026',
  deficiencies: [{
    id: 'DEF-2026-MIDC-00187-01',
    type: 'correction',
    summary: 'Building Plan v2 does not match the current project parameters',
    issue: 'The submitted plan records 3,050 sq.m built-up area while the Business DNA and MIDC application record 3,200 sq.m.',
    explanation: 'MIDC Building / Planning scrutiny compares the submitted plan with the verified project record before final determination.',
    evidenceNeeded: 'Corrected Building Plan v3 showing 3,200 sq.m built-up area.',
    requiredAction: 'Upload the corrected Building Plan v3 and submit the consolidated response.',
    officerComment: 'Please reconcile the built-up area schedule and submit the corrected plan.',
    relatedField: 'Built-up Area',
    relatedDocument: 'Building Plan v2',
    regulatoryRef: 'MIDC Building / Planning scrutiny record',
    section: 'building-plan',
    deadline: '30 Sep 2026',
    evidenceDocName: 'Sahyadri_Building_Plan_v3.pdf',
    defaultResponse: 'Building Plan v3 has been corrected to reflect the current project built-up area of 3,200 sq.m. The revised signed plan is attached.',
  }],
};

export function findQueryByAppId(appId: string): QueryRecord | undefined {
  if (appId === SAMPLE_QUERY.appId) return SAMPLE_QUERY;
  if (appId === SAHYADRI_MIDC_QUERY.appId) return SAHYADRI_MIDC_QUERY;
  return undefined;
}

// ─── Delta Resubmission Models ────────────────────────────────────────────────

export type DeltaChangeKind = 'changed' | 'unchanged' | 'new_document' | 'replaced';

export interface CategorizedDeltaItem {
  id: string;
  kind: DeltaChangeKind;
  category: 'Form Field' | 'Attached Document' | 'Technical Parameter';
  title: string;
  section: string;
  oldValue: string;
  newValue: string;
  rationale: string;
  docDetails?: {
    prevFileName?: string;
    newFileName?: string;
    version: string;
    size?: string;
  };
}

export const E21_CATEGORIZED_DELTAS: readonly CategorizedDeltaItem[] = [
  {
    id: 'DELTA-001',
    kind: 'changed',
    category: 'Technical Parameter',
    title: 'Daily Water Consumption (Form-I)',
    section: 'Environmental Details',
    oldValue: '50 KL/day',
    newValue: '65 KL/day',
    rationale: 'Resolved DEF-001: Aligned water consumption with DPR water balance calculation.',
  },
  {
    id: 'DELTA-002',
    kind: 'changed',
    category: 'Technical Parameter',
    title: 'Effluent Treatment Plant (ETP) Capacity',
    section: 'Environmental Details',
    oldValue: '55 KL/day',
    newValue: '70 KL/day',
    rationale: 'Resolved DEF-002: Upgraded ETP sizing to handle full 70 KL/day peak wastewater load.',
  },
  {
    id: 'DELTA-003',
    kind: 'replaced',
    category: 'Attached Document',
    title: 'ETP Design & Hydraulic Flow Diagram',
    section: 'Documents & Engineering Drawings',
    oldValue: 'v1 — ETP_Design_v1.pdf (55 KL/day sizing)',
    newValue: 'v2 — ETP_Design_v2.pdf (70 KL/day sizing with clarifier upgrade)',
    rationale: 'Resolved DEF-002: Replaced superseding hydraulic sizing drawings signed by Chartered Engineer.',
    docDetails: {
      prevFileName: 'ETP_Design_v1.pdf',
      newFileName: 'ETP_Design_v2.pdf',
      version: 'v2 (Supersedes v1)',
      size: '3.8 MB',
    },
  },
  {
    id: 'DELTA-004',
    kind: 'new_document',
    category: 'Attached Document',
    title: 'Hazardous Waste Management Plan',
    section: 'Documents & Environmental Plans',
    oldValue: '— Not previously submitted',
    newValue: 'v1 — Waste_Mgmt_Plan_v1.pdf',
    rationale: 'Resolved DEF-003: Attached complete hazardous waste manifest, categorization & storage protocol.',
    docDetails: {
      newFileName: 'Waste_Mgmt_Plan_v1.pdf',
      version: 'v1 (Newly Attached)',
      size: '2.1 MB',
    },
  },
];

export const E21_UNCHANGED_PRESERVED_FIELDS = [
  { field: 'Plot Identification & Land Boundary', section: 'Industrial Location', value: 'Plot A-42, Chakan Phase II Industrial Area (12,500 m²)', status: 'Preserved & Pre-verified' },
  { field: 'Total Capital Investment', section: 'Project Cost & Financials', value: '₹145.00 Crores (Plant & Machinery: ₹92 Cr)', status: 'Preserved & Pre-verified' },
  { field: 'Connected Electrical Power Load', section: 'Utilities & Power', value: '3,500 kVA (MSEDCL 33kV Substation Supply)', status: 'Preserved & Pre-verified' },
  { field: 'Industrial Water Sourcing Allotment', section: 'Water Supply', value: 'MIDC Pipeline Allotment 100 KL/day', status: 'Preserved & Pre-verified' },
  { field: 'Manufacturing Product Capacity', section: 'Production Details', value: 'Active Pharmaceutical Ingredients (12,000 MT/year)', status: 'Preserved & Pre-verified' },
  { field: 'DG Set & Stack Chimney Heights', section: 'Air Pollution Control', value: '2 x 1000 kVA (Stack height 30m above roof level)', status: 'Preserved & Pre-verified' },
  { field: 'Factory Building Plan Approval', section: 'Statutory Clearances', value: 'MIDC Sanction Order BP-2026-CH-0941', status: 'Preserved & Pre-verified' },
  { field: 'Green Belt / Landscaping Area', section: 'Site Layout', value: '4,150 m² (33.2% of total plot area)', status: 'Preserved & Pre-verified' },
];

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
  whatWasFound?: string;
  whatNeedsToBeCorrected?: string;
  evidenceTypeNeeded?: string;
  submittedResponse?: string;
  submittedEvidenceDoc?: string;
  submittedAt?: string;
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
  purpose?: string;
  estimatedDuration?: string;
  inspectingTeamNotes?: string;
  outcomeSummary?: string | null;
  outcomeCompliance?: 'Satisfactory' | 'Deficiencies Noted' | 'Re-inspection Ordered' | 'Scheduled';
  reInspectionDate?: string | null;
  reInspectionItems?: string[];
  statutoryApprovalDisclaimer?: string;
}

export const INSPECTIONS: readonly InspectionRecord[] = [
  {
    id: 'INS-2026-MIDC-00187',
    departments: ['MIDC'],
    type: 'MIDC Building / Planning Inspection',
    relatedAppIds: ['APP-2026-MIDC-00187'],
    date: '25 Sep 2026',
    time: '10:30 AM',
    site: 'Chakan Industrial Area — Plot C-14/2',
    status: 'Scheduled',
    actionRequired: 'Prepare for Inspection',
    coordinated: false,
    purpose: 'Verify that the site and corrected Building Plan v3 reflect the current Sahyadri Bio-Pharma project scope.',
    estimatedDuration: '90 minutes',
    inspectingTeamNotes: 'Building / Planning Inspection Team',
    outcomeSummary: null,
    outcomeCompliance: 'Scheduled',
    statutoryApprovalDisclaimer: 'Inspection completion does not constitute final statutory approval. The application returns to the Decision Workspace.',
    prepRequirements: ['Keep the site accessible at 10:30 AM', 'Keep Building Plan v3 and the MIDC plot record available', 'Ensure the authorised site representative is present'],
    documents: [{ id: 'DOC-002', name: 'Land Possession / MIDC Lease Agreement' }, { id: 'DOC-004', name: 'Building Layout / Architectural Plan' }],
    checklist: [{ category: 'MIDC — Building & Planning', items: ['Site identity matches application', 'Plot area matches project parameters', 'Building plan reflects current project scope', 'Application data matches site conditions', 'Relevant documents available on site', 'MIDC construction norms'] }],
    observations: [],
    reInspectionReason: null,
  },
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
    purpose: 'Joint on-site physical verification of building setbacks, FAR coverage, internal fire tender access road, fire static water reservoir, and workplace occupational welfare facilities before grant of building permission, provisional Fire NOC, and factory license.',
    estimatedDuration: '2.5 hours (10:00 AM – 12:30 PM)',
    inspectingTeamNotes: 'Joint inspecting team comprising MIDC Executive Engineer (Town Planning), Divisional Fire Officer, and DISH Inspector of Factories.',
    outcomeSummary: null,
    outcomeCompliance: 'Scheduled',
    statutoryApprovalDisclaimer: 'A satisfactory on-site inspection outcome recommends technical approval to the Competent Authority. It does NOT constitute final statutory approval or license issuance until the formal digitally signed order is issued.',
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
    purpose: 'Verification of industrial wastewater treatment footprint (ETP civil works), effluent collection sump network, and segregated hazardous waste storage shed compliance for Consent to Establish (CTE).',
    estimatedDuration: '1.5 hours (02:30 PM – 04:00 PM)',
    inspectingTeamNotes: 'MPCB Field Officer & Sub-Regional Environmental Engineer.',
    outcomeSummary: 'Site physical inspection completed satisfactorily. ETP sizing verified for 70 KL/day design load. Storage shed ventilation louvre rectification accepted with photographic evidence.',
    outcomeCompliance: 'Satisfactory',
    statutoryApprovalDisclaimer: 'Inspection clearance confirms physical site readiness for environmental pollution control. It does NOT constitute final statutory approval or the statutory Consent to Establish (CTE) order itself, which remains under processing for formal committee grant.',
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
        whatWasFound: 'ETP civil tank construction footprint measured at 18.5m x 12.0m, adequate for 70 KL/day primary and secondary treatment as per DPR.',
        whatNeedsToBeCorrected: 'None — verified fully compliant on site.',
      },
      {
        id: 'OBS-002',
        description: 'Hazardous waste storage shed roof ventilation needs louvre installation.',
        checklistItem: 'Solid waste segregation facility provision',
        evidenceRequired: 'Photograph of installed louvres',
        requiredCorrection: 'Install weather-proof louvres in storage shed wall.',
        responseState: 'Accepted',
        dateRaised: '18 Sep 2026',
        whatWasFound: 'Hazardous waste storage shed lacked adequate mechanical or passive cross-ventilation louvres on the northern exterior wall.',
        whatNeedsToBeCorrected: 'Install weather-proof stainless steel or aluminum louvres on northern shed wall to prevent solvent vapor buildup.',
        evidenceTypeNeeded: 'Photograph of installed louvres with date and GPS coordinates stamp.',
        submittedResponse: 'Four 600mm x 600mm weather-proof aluminium louvres installed with wire mesh insect screens on northern wall.',
        submittedEvidenceDoc: 'louvre_installation_photo_geotagged.pdf',
        submittedAt: '20 Sep 2026, 04:15 PM',
      },
    ],
    reInspectionReason: null,
  },
  {
    id: 'INS-003',
    departments: ['Fire', 'DISH'],
    type: 'Fire Safety & Industrial Safety Inspection',
    relatedAppIds: ['APP-2026-FIRE-00093', 'APP-2026-DISH-00241'],
    date: '22 Sep 2026',
    time: '11:30 AM',
    site: 'Chakan Industrial Area Phase II — Plot C-14/2',
    status: 'Re-inspection Required',
    actionRequired: 'Submit correction for OBS-003 and prepare for re-inspection on 05 Oct 2026',
    coordinated: true,
    purpose: 'On-site hydro-testing of dedicated fire hydrant ring main, verification of emergency evacuation corridors, and machinery safety interlocks.',
    estimatedDuration: '2.0 hours (11:30 AM – 01:30 PM)',
    inspectingTeamNotes: 'Joint team of Assistant Divisional Fire Officer and DISH Senior Factory Inspector.',
    outcomeSummary: 'Initial site inspection deemed non-compliant due to inadequate hydrant pressure (4.2 kg/cm²) and obstructed secondary emergency exit. Re-inspection ordered for 05 Oct 2026 after rectifications are completed.',
    outcomeCompliance: 'Re-inspection Ordered',
    statutoryApprovalDisclaimer: 'Re-inspection is mandatory to verify life safety measures. Neither this inspection record nor subsequent re-inspection clearance constitutes final statutory approval until the formal Fire NOC and Factory License orders are granted by the Competent Authority.',
    prepRequirements: [
      'Fire booster pump technician on site to operate test manifold',
      'Emergency exit corridors completely cleared of raw materials and machinery',
      'Hydrostatic pressure test gauge calibrated with valid certificate',
    ],
    documents: [
      { id: 'DOC-004', name: 'Building Layout / Architectural Plan' },
    ],
    checklist: [
      {
        category: 'Fire Hydrant & Water Supply',
        items: [
          'Static water storage capacity (minimum 100,000 L)',
          'Fire hydrant ring main pressure at farthest landing valve (minimum 7.0 kg/cm²)',
          'Fire hose reel condition and nozzle operation',
        ],
      },
      {
        category: 'Emergency Egress & Safe Evacuation',
        items: [
          'Unobstructed exit width minimum 1.5m along all escape routes',
          'Photo-luminescent exit signage along path of travel',
          'Emergency illumination fixtures backup power check',
        ],
      },
    ],
    observations: [
      {
        id: 'OBS-003',
        description: 'Fire hydrant ring main pressure recorded at 4.2 kg/cm² at farthest landing valve (statutory requirement: 7.0 kg/cm²). Secondary emergency exit in fabrication hall blocked by raw material inventory.',
        checklistItem: 'Fire hydrant ring main pressure at farthest landing valve',
        evidenceRequired: 'Hydrostatic pressure test report signed by chartered engineer and geotagged photographs showing cleared emergency exit doorway with minimum 1.5m clear passage.',
        requiredCorrection: 'Upgrade fire booster pump impeller or adjust pressure switch to achieve 7.0 kg/cm² continuous static pressure; clear all palletized goods obstructing the south emergency exit corridor.',
        responseState: 'Pending',
        dateRaised: '22 Sep 2026',
        whatWasFound: 'Hydrant ring main pressure measured at only 4.2 kg/cm² under flow test (minimum required: 7.0 kg/cm²). Fabrication shed south exit door obstructed with packed components.',
        whatNeedsToBeCorrected: 'Re-calibrate pressure relief valve, service booster pump to sustain 7.0 kg/cm², and remove all storage from designated 1.5m exit egress.',
        evidenceTypeNeeded: 'Pressure gauge test certificate from chartered inspection agency & geotagged photos of clear exit door.',
      },
    ],
    reInspectionReason: 'Fire hydrant ring main pressure fell below statutory 7.0 kg/cm² safety threshold during physical flow test, and secondary emergency exit was obstructed.',
    reInspectionItems: [
      'Service fire booster pump and achieve 7.0 kg/cm² pressure at farthest landing valve',
      'Remove all stored raw materials and pallet stacks from south emergency exit corridor',
      'Install luminous emergency exit directional signs along egress corridor',
    ],
    reInspectionDate: '05 Oct 2026, 11:00 AM',
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
  validityPeriod?: string;
  whatWasApproved?: {
    service: string;
    authority: string;
    scope: string;
    location: string;
    orderNo: string;
  };
  renewalRequirements?: {
    frequency: string;
    renewalDeadline: string;
    cutoffDate: string;
    prerequisites: string[];
    instructions: string;
  };
  nextComplianceSummary?: string;
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
  validityPeriod: '5 Years (Active through 09 Oct 2031)',
  whatWasApproved: {
    service: 'Consent to Establish (CTE) under Section 25 of Water Act 1974 & Section 21 of Air Act 1981',
    authority: 'Maharashtra Pollution Control Board (MPCB) · Environment Department',
    scope: 'Active Pharmaceutical Ingredients & Bio-Formulation manufacturing unit with max discharge of 70 KL/day treated trade effluent and 15 KL/day domestic effluent.',
    location: 'Chakan Industrial Area Phase II, Plot C-14/2, Taluka Khed, Pune',
    orderNo: 'CTE-2026-MPCB-41872 / Form-II Sanction Order',
  },
  renewalRequirements: {
    frequency: 'Every 5 Years (Or transition to Consent to Operate / CTO prior to commercial commissioning)',
    renewalDeadline: 'At least 120 days prior to expiry on 09 Oct 2031',
    cutoffDate: '11 Jun 2031',
    prerequisites: [
      'Valid Annual Environmental Audit Reports (CPL-003) for all operating financial years',
      'Continuous quarterly stack emission monitoring uploads (CPL-004)',
      'Certified hazardous waste disposal manifests (CPL-002)',
      'Consent to Operate (CTO) application filed prior to commercial trials',
    ],
    instructions: 'Submit Form-I renewal through the EKATMA Single Window portal along with certified balance sheet and capital investment declaration.',
  },
  nextComplianceSummary: 'This approval automatically enrolls 4 ongoing compliance obligations into your Compliance Ledger. You do not need to create or search for these obligations manually.',
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

export const SAHYADRI_MIDC_DECISION: DecisionRecord = {
  decisionId: 'DEC-2026-MIDC-00187',
  appId: 'APP-2026-MIDC-00187',
  dept: 'MIDC',
  service: 'Building / Planning Approval',
  state: 'approved',
  decisionDate: '29 Sep 2026',
  approvalId: 'MIDC/BP/2026/00187',
  certId: 'CERT-MIDC-2026-00187',
  issueDate: '29 Sep 2026',
  validityPeriod: 'Configured prototype validity',
  whatWasApproved: {
    service: 'MIDC Building / Planning Approval',
    authority: 'Maharashtra Industrial Development Corporation (MIDC)',
    scope: 'Building / Planning approval for the configured Sahyadri Bio-Pharma project record.',
    location: 'Chakan Industrial Area Phase II, Plot C-14/2, Pune, Maharashtra',
    orderNo: 'MIDC/BP/2026/00187',
  },
  conditions: ['Construction must follow the reviewed Building Plan and recorded MIDC plot boundaries.', 'Material project changes must use the applicable amendment workflow.', 'External approvals remain governed by their respective issuing authorities.'],
  specialConditions: ['DEMO / PROTOTYPE RECORD — conditions are illustrative and are not represented as actual statutory MIDC conditions.'],
  downstreamUnlocked: [{ label: 'Fire NOC', status: 'Next configured requirement' }, { label: 'Factory / Occupier Registration', status: 'Next configured requirement' }, { label: 'Boiler Registration', status: 'Next configured requirement' }],
  inspectionId: 'INS-2026-MIDC-00187',
  versionHistory: [{ version: 'Decision v1 — Current', date: '29 Sep 2026', note: 'Prototype approval record issued for the Sahyadri end-to-end demonstration.' }],
};

export function findDecisionByAppId(appId: string): DecisionRecord | undefined {
  if (appId === SAMPLE_DECISION.appId) return SAMPLE_DECISION;
  if (appId === SAHYADRI_MIDC_DECISION.appId) return SAHYADRI_MIDC_DECISION;
  return undefined;
}
