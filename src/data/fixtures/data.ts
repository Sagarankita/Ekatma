import { Icon, MIcon } from '@/App';
// @ts-nocheck


export const M17_NODES: any[] = [
  { id: '1', dept: 'midc', type: 'Approval', ref: 'MIDC-APP-01', label: 'Land Allotment', status: 'completed', relationship: 'prerequisite' },
  { id: '2', dept: 'external', type: 'NOC', ref: 'FIRE-NOC-01', label: 'Provisional Fire NOC', status: 'ready', relationship: 'prerequisite' },
  { id: '3', dept: 'midc', type: 'Approval', ref: 'MIDC-BPA-01', label: 'Building Plan Approval', status: 'conditional', relationship: 'target' },
  { id: '4', dept: 'midc', type: 'Approval', ref: 'MIDC-WAT-01', label: 'Water Connection', status: 'pending', relationship: 'postrequisite' },
  { id: '5', dept: 'external', type: 'NOC', ref: 'MPCB-CTE-01', label: 'Consent to Establish', status: 'pending', relationship: 'parallel' }
];
import { LoginState, Service, AdaptiveState, VerifyState, FieldClass, DnaHistoryEntry, DnaConsistencyEntry, DnaField, DnaSection, EventCategory, EventSource, TimelineEvent, PreCheckResult, PreCheck, PreCheckGroup, ScrutinyFactor, OfficerReviewState, ScrutinyParam, ScrutinySection, ConsistencyStatus, ConsistencyRow, ConsistencyField, MismatchLifecycle, DepNodeStatus, DepNodeType, DepNode, DefStatus, Deficiency, ScrutinyApp, ScrutinyModule, DeltaTab, ReviewStatus, ChangedItem, AffectedItem, UnchangedItem, InspStatus, InspRow, PlanStatus, CalendarView, InspOutcome, CheckStatus, CheckItem, ObsRecord, ObsState, M24Event, SyncEvent, ComplianceObligation, ChangeField, QueryRecord } from '@/domain/types';

export const QUEUE_APPS = [
  { id: 'APP-MIDC-2048', business: 'Aarav Precision Components Pvt Ltd', applicant: 'R. Mehta',         service: 'Land / Plot',         stage: 'Pre-establishment', desk: 'Land / Plot Scrutiny',      received: '16 Sep 2026', age: '6d', slaTarget: '5d', elapsed: '4d', remaining: '1d', slaState: 'approaching' as const, route: 'Standard Review',  routeFactors: [],                            dependency: 'None',             actionRequired: 'Review application',   state: 'INITIAL_SCRUTINY',   stateLabel: 'Initial Scrutiny',     overlay: '' },
  { id: 'APP-MIDC-2051', business: 'Nova Industrial Systems Ltd',         applicant: 'S. Pawar',         service: 'Planning / Building', stage: 'Construction',      desk: 'Planning / Building Scrutiny', received: '14 Sep 2026', age: '8d', slaTarget: '5d', elapsed: '6d', remaining: '−1d',slaState: 'breached'    as const, route: 'Enhanced Review', routeFactors: ['New construction','Land inconsistency'], dependency: 'MPCB CTE pending', actionRequired: 'Review documents',     state: 'TECHNICAL_SCRUTINY', stateLabel: 'Technical Scrutiny',   overlay: 'SLA Breached' },
  { id: 'APP-MIDC-2019', business: 'Nova Industrial Systems Ltd',         applicant: 'S. Pawar',         service: 'Planning / Building', stage: 'Construction',      desk: 'Planning / Building Scrutiny', received: '11 Sep 2026', age: '11d',slaTarget: '7d', elapsed: '8d', remaining: '−4d',slaState: 'breached'    as const, route: 'Enhanced Review', routeFactors: ['New construction'],           dependency: 'None',             actionRequired: 'Finalise query',       state: 'QUERY_RAISED',       stateLabel: 'Query Raised',         overlay: 'Awaiting Entrepreneur' },
  { id: 'APP-MIDC-1987', business: 'Kinetic Engineering Works',           applicant: 'M. Joshi',         service: 'Water / Utility',     stage: 'Pre-establishment', desk: 'Utility / Water Scrutiny',     received: '21 Sep 2026', age: '1d', slaTarget: '5d', elapsed: '1d', remaining: '4d', slaState: 'normal'      as const, route: 'Standard Review',  routeFactors: [],                            dependency: 'None',             actionRequired: 'Review resubmission',  state: 'RESUBMITTED',        stateLabel: 'Resubmitted',          overlay: '' },
  { id: 'APP-MIDC-2031', business: 'Vertex Manufacturing Ltd',            applicant: 'P. Kulkarni',      service: 'Planning / Building', stage: 'Construction',      desk: 'Inspection',                   received: '19 Sep 2026', age: '3d', slaTarget: '5d', elapsed: '3d', remaining: '2d', slaState: 'approaching' as const, route: 'Inspection-heavy Route',routeFactors: ['Site complexity'],           dependency: 'None',             actionRequired: 'Schedule inspection',  state: 'INSPECTION_PENDING', stateLabel: 'Inspection Pending',   overlay: 'Inspection Required' },
  { id: 'APP-MIDC-1964', business: 'Maharashtra Components Pvt Ltd',      applicant: 'A. Desai',         service: 'Land / Plot',         stage: 'Operational',       desk: 'Decision',                     received: '10 Sep 2026', age: '12d',slaTarget: '10d',elapsed: '9d', remaining: '1d', slaState: 'approaching' as const, route: 'Standard Review',  routeFactors: [],                            dependency: 'None',             actionRequired: 'Complete decision review', state: 'FINAL_DECISION',  stateLabel: 'Final Decision',       overlay: 'Decision Pending' },
  { id: 'APP-MIDC-2039', business: 'Synergy Fabricators Pvt Ltd',         applicant: 'R. Sharma',        service: 'Planning / Building', stage: 'Construction',      desk: 'Land / Plot Scrutiny',         received: '22 Sep 2026', age: '<1d',slaTarget: '5d', elapsed: '0d', remaining: '5d', slaState: 'normal'      as const, route: 'Standard Review',  routeFactors: [],                            dependency: 'None',             actionRequired: 'Review application',   state: 'SUBMITTED',          stateLabel: 'Submitted',            overlay: 'New' },
  { id: 'APP-MIDC-2011', business: 'Bharat Industrial Corp',              applicant: 'V. Nair',          service: 'Land / Plot',         stage: 'Land acquisition',  desk: 'Land / Plot Scrutiny',         received: '5 Sep 2026',  age: '17d',slaTarget: '5d', elapsed: '12d',remaining: '−7d',slaState: 'breached'    as const, route: 'Enhanced Review', routeFactors: ['Pending verification'],      dependency: 'Utility dependency',actionRequired: 'Verify dependency',   state: 'DOCUMENT_SCRUTINY',  stateLabel: 'Document Scrutiny',    overlay: 'Escalated' },
]
export const Q_TABS = [
  { id: 'all',          label: 'All' },
  { id: 'my-actions',   label: 'My Actions' },
  { id: 'new',          label: 'New' },
  { id: 'scrutiny',     label: 'In Scrutiny' },
  { id: 'query',        label: 'Query Required' },
  { id: 'awaiting',     label: 'Awaiting Entrepreneur' },
  { id: 'resubmission', label: 'Resubmission' },
  { id: 'inspection',   label: 'Inspection' },
  { id: 'decision',     label: 'Decision Pending' },
  { id: 'sla-risk',     label: 'SLA Risk' },
  { id: 'sla-breached', label: 'SLA Breached' },
]
export const SERVICES = [
  { id: 'land-plot',     name: 'Land / Plot',               active: 28, new: 6,  review: 9, query: 4, resubmit: 3, inspect: 3, decision: 2, slaRisk: 4, slaBreached: 1,
    deps: ['None'],                routes: { standard: 18, enhanced: 7, inspection: 3 },
    stages: { Planning: 4, 'Pre-establishment': 7, Construction: 10, Installation: 4, Operational: 3 } },
  { id: 'building',      name: 'Building / Planning',        active: 19, new: 4,  review: 7, query: 3, resubmit: 2, inspect: 2, decision: 3, slaRisk: 3, slaBreached: 0,
    deps: ['MPCB CTE — Pending', 'Fire NOC — Configured prerequisite'], routes: { standard: 11, enhanced: 5, inspection: 3 },
    stages: { Planning: 2, 'Pre-establishment': 3, Construction: 8, Installation: 4, Operational: 2 } },
  { id: 'water',         name: 'Water / Utility',            active: 11, new: 2,  review: 5, query: 2, resubmit: 1, inspect: 1, decision: 1, slaRisk: 2, slaBreached: 1,
    deps: ['Utility dependency — Active'],routes: { standard: 8, enhanced: 2, inspection: 1 },
    stages: { Planning: 1, 'Pre-establishment': 2, Construction: 5, Installation: 2, Operational: 1 } },
  { id: 'drainage',      name: 'Drainage / Infrastructure',  active: 7,  new: 2,  review: 3, query: 1, resubmit: 0, inspect: 1, decision: 0, slaRisk: 1, slaBreached: 0,
    deps: ['None'],                routes: { standard: 5, enhanced: 2, inspection: 0 },
    stages: { Planning: 1, 'Pre-establishment': 2, Construction: 3, Installation: 1, Operational: 0 } },
  { id: 'construction',  name: 'Construction / Follow-up',   active: 9,  new: 1,  review: 4, query: 2, resubmit: 1, inspect: 1, decision: 0, slaRisk: 1, slaBreached: 0,
    deps: ['None'],                routes: { standard: 6, enhanced: 2, inspection: 1 },
    stages: { Planning: 0, 'Pre-establishment': 1, Construction: 5, Installation: 2, Operational: 1 } },
  { id: 'amendment',     name: 'Amendment / Modification',   active: 6,  new: 2,  review: 2, query: 1, resubmit: 0, inspect: 0, decision: 1, slaRisk: 0, slaBreached: 0,
    deps: ['None'],                routes: { standard: 5, enhanced: 1, inspection: 0 },
    stages: { Planning: 0, 'Pre-establishment': 1, Construction: 2, Installation: 2, Operational: 1 } },
  { id: 'other',         name: 'Other Configured Services',  active: 4,  new: 1,  review: 1, query: 0, resubmit: 0, inspect: 0, decision: 0, slaRisk: 0, slaBreached: 0,
    deps: ['None'],                routes: { standard: 4, enhanced: 0, inspection: 0 },
    stages: { Planning: 1, 'Pre-establishment': 1, Construction: 1, Installation: 0, Operational: 1 } },
]
export const TIMING_BREAKDOWN = [
  { label:'MIDC Processing', value:'12d 4h', color:'bg-[#1a3a5c]', pct:57 },
  { label:'Entrepreneur Response', value:'3d 8h', color:'bg-amber-500', pct:16 },
  { label:'Current Desk', value:'2d 6h', color:'bg-[#1a56db]', pct:11 },
  { label:'Inspection Waiting', value:'—', color:'bg-orange-400', pct:0 },
  { label:'External Dependency', value:'2d 0h', color:'bg-purple-500', pct:9 },
  { label:'Total Elapsed', value:'21d 11h', color:'bg-[#374151]', pct:100, total:true },
]
export const APP_SAMPLE = {
  id: 'MIDC-APP-2026-00482',
  business: 'Aster BioTech Manufacturing Pvt. Ltd.',
  project: 'API Manufacturing Unit',
  applicant: 'Rajesh V. Kulkarni',
  entity: 'Private Limited Company',
  industry: 'Pharmaceutical — API Manufacturing',
  service: 'Building / Planning',
  serviceFamily: 'Building / Planning',
  stage: 'Construction',
  state: 'TECHNICAL_SCRUTINY',
  overlay: 'SLA Risk',
  desk: 'Planning / Building Scrutiny',
  office: 'Configured MIDC Office — Prototype',
  scrutinyRoute: 'Enhanced Review',
  estate: 'Example MIDC Estate (Prototype)',
  plot: 'B-42',
  plotArea: '4,200 sq m',
  allotment: 'Confirmed',
  possession: 'Possession Taken',
  district: 'Pune (Prototype)',
  taluka: 'Haveli (Prototype)',
  village: 'Configured Location',
  pin: '411041',
  submitted: '12 Aug 2026',
  lastUpdated: '19 Sep 2026',
  version: 'v2 (Resubmitted)',
  feeStatus: 'Confirmed',
  challan: 'CHN-2026-00482',
  slaTarget: '30 days',
  slaElapsed: '21 days',
  slaRemaining: '9 days',
  slaState: 'approaching' as const,
  slaDue: '30 Sep 2026',
  deptTime: '14 days',
  entrepreneurTime: '7 days (awaiting response counted)',
}
export const APP_FLAGS = [
  { type: 'mismatch', title: 'Plot area mismatch', detail: 'Application form: 4,200 sq m · Supporting document (layout plan): 3,950 sq m', source: 'Cross-form consistency check', rule: 'CC-PLOT-AREA-01', ts: '19 Sep 2026', drill: 'M16' },
  { type: 'doc-expired', title: 'Fire NOC — Validity expired', detail: 'Validity: 31 Aug 2026 · Current date: 22 Sep 2026 · 22 days expired', source: 'Document validity check', rule: 'DOC-VALIDITY-01', ts: '22 Sep 2026', drill: 'Documents' },
  { type: 'needs-verify', title: 'Electricity load — Needs Verification', detail: 'Declared: 480 kVA · Source: Entrepreneur self-declaration · Verification state: NEEDS_VERIFICATION', source: 'Business DNA adaptive profile', rule: 'DNA-UTIL-ELEC-01', ts: '12 Aug 2026', drill: 'M07' },
]
export const APP_DEPS = [
  { name: 'MPCB CTE', type: 'External prerequisite', state: 'Pending', note: 'MIDC view-only context' },
  { name: 'Fire NOC', type: 'External parallel', state: 'NOC expired — re-verify', note: 'MIDC view-only context' },
  { name: 'MIDC Utilities', type: 'MIDC-controlled', state: 'Active', note: 'Downstream dependency' },
]
export const APP_TIMELINE = [
  { date: '12 Aug 2026', event: 'Application submitted', detail: 'Version v1 · Fee challan generated' },
  { date: '15 Aug 2026', event: 'Fee confirmed', detail: 'CHN-2026-00482 · Payment verified' },
  { date: '18 Aug 2026', event: 'Initial scrutiny completed', detail: 'Routed to Technical Scrutiny' },
  { date: '25 Aug 2026', event: 'Query raised — plot area', detail: 'Officer: S.P. Deshpande · Query ref: QRY-0118' },
  { date: '2 Sep 2026', event: 'Entrepreneur response received', detail: 'Documents resubmitted' },
  { date: '5 Sep 2026', event: 'Resubmission received', detail: 'Version v2 · Changed: plot area, layout plan uploaded' },
  { date: '8 Sep 2026', event: 'Technical scrutiny resumed', detail: 'Routed to Planning / Building Scrutiny desk' },
]
export const DNA_SNAPSHOT = [
  { group: 'Project', items: [['Type', 'Manufacturing'], ['Classification', 'Large Industry (Prototype)'], ['Stage', 'Construction']] },
  { group: 'Scale', items: [['Investment', '₹ 42 Cr (Prototype)'], ['Employment', '85 persons (Prototype)'], ['Capacity', 'As per application']] },
  { group: 'Utilities', items: [['Power', '480 kVA (Needs Verification)'], ['Water', '200 KLD (Configured)'], ['Wastewater', 'ETP planned']] },
  { group: 'Regulatory', items: [['MPCB CTE', 'Pending'], ['Fire NOC', 'Expired — re-verify'], ['Boiler', 'Not applicable']] },
]
export const APP_TABS = ['Overview', 'Business DNA', 'Timeline']
export const M10_APP = {
  id: 'MIDC-APP-2026-00418',
  business: 'Aster Precision Components Pvt. Ltd.',
  service: 'Land / Plot',
  state: 'INITIAL_SCRUTINY',
  desk: 'Land / Plot Scrutiny',
  office: 'Configured MIDC Office — Prototype',
  sla: 'Approaching',
  route: 'ENHANCED REVIEW',
  stage: 'New Construction',
  estate: 'Sample Industrial Estate',
  plot: 'P-104',
}


import { getScrutinyConfig } from '../../departments';

const midcBuildingConfig = getScrutinyConfig('midc', 'building')!;
const midcWaterConfig = getScrutinyConfig('midc', 'water')!;

export const M14_SECTIONS = midcBuildingConfig.sections;
export const M14_IDENTITY_PARAMS = midcBuildingConfig.params.filter((p: any) => p.category === 'Identity');
export const M14_BUILDING_PARAMS = midcBuildingConfig.params.filter((p: any) => p.category !== 'Identity');
export const M14_PREREQ_DOCS = midcBuildingConfig.docs.filter((d: any) => d.type === 'Prerequisite');
export const M14_TECH_DOCS = midcBuildingConfig.docs.filter((d: any) => d.type === 'Technical');
export const M14_CONDITIONAL_DOCS = midcBuildingConfig.docs.filter((d: any) => d.type === 'Conditional');
export const M14_CONSISTENCY = midcBuildingConfig.consistencyCheck;
export const M14_DEPS = midcBuildingConfig.dependencies;

export const M15_SECTIONS = midcWaterConfig.sections;
export const M15_WATER_PARAMS = midcWaterConfig.params;
export const M15_DOCS = midcWaterConfig.docs;
export const M15_CONSISTENCY = midcWaterConfig.consistencyCheck;
export const M15_DEPS = midcWaterConfig.dependencies;

export const M16_CATEGORIES = ['Project / Location', 'Business / Identity', 'Scale', 'Building', 'Utilities', 'Project Status']
export const M17_PREREQUISITES = M17_NODES.filter(n => n.id === 'land' || n.id === 'mpcb')
export const M18_CATEGORIES = ['All','Land / Plot','Building / Plan','Utility / Water','Document','Data Inconsistency','Dependency','Technical Issue','Other']
export const WORKFLOW_STAGES = [
  { key:'precheck',    short:'PRE-CHECK',   mNum:'M09' },
  { key:'route',       short:'ROUTE',       mNum:'M10' },
  { key:'land',        short:'LAND',        mNum:'M11' },
  { key:'building',    short:'BUILDING',    mNum:'M14' },
  { key:'water',       short:'WATER',       mNum:'M15' },
  { key:'consistency', short:'CONSISTENCY', mNum:'M16' },
  { key:'dependency',  short:'DEPENDENCY',  mNum:'M17' },
  { key:'query',       short:'QUERY',       mNum:'M18' },
  { key:'delta',       short:'DELTA',       mNum:'M20' },
  { key:'inspection',  short:'INSPECTION',  mNum:'M21' },
]
export const M22_SLOTS = [
  { date:'25 Sep 2026', time:'10:30 AM', midc:'Available', fire:'Available', dish:'Not Required', compatible:'Compatible' },
  { date:'26 Sep 2026', time:'09:00 AM', midc:'Available', fire:'Unavailable', dish:'Not Required', compatible:'Not Compatible' },
  { date:'27 Sep 2026', time:'11:00 AM', midc:'Available', fire:'Coordination Pending', dish:'Not Required', compatible:'Needs Coordination' },
  { date:'30 Sep 2026', time:'10:00 AM', midc:'Available', fire:'Available', dish:'Not Required', compatible:'Compatible' },
]
export const M22_CHECKLIST = [
  { item:'Site identity verification', done:false },
  { item:'Plot boundaries confirmed', done:false },
  { item:'Building plan (v2) reviewed', done:false },
  { item:'Relevant documents available on-site', done:false },
  { item:'MIDC construction norms compliance check', done:false },
]


export const BEFORE_NODES = [
  { id:'land',      label:'Land / Plot',             dept:'MIDC',  status:'Complete',       control:'MIDC-controlled' },
  { id:'mpcb',      label:'MPCB CTE',                dept:'MPCB',  status:'Complete',       control:'External / Read-only' },
  { id:'midc-bldg', label:'MIDC Building / Planning', dept:'MIDC',  status:'Decision Pending', control:'MIDC-controlled' },
  { id:'fire',      label:'Provisional Fire',         dept:'Fire',  status:'Blocked',        control:'External / Read-only' },
  { id:'utilities', label:'Utilities / NOCs',         dept:'Ext.',  status:'Blocked',        control:'External / Read-only' },
  { id:'const',     label:'Construction',             dept:'MIDC',  status:'Blocked',        control:'MIDC-controlled' },
]
export const AFTER_NODES = [
  { id:'land',      label:'Land / Plot',             dept:'MIDC',  status:'Complete',        change:'Unchanged' },
  { id:'mpcb',      label:'MPCB CTE',                dept:'MPCB',  status:'Complete',        change:'Unchanged' },
  { id:'midc-bldg', label:'MIDC Building / Planning', dept:'MIDC',  status:'Complete',        change:'Changed' },
  { id:'fire',      label:'Provisional Fire',         dept:'Fire',  status:'Ready / Unlocked', change:'Changed' },
  { id:'utilities', label:'Utilities / NOCs',         dept:'Ext.',  status:'Newly Available', change:'Changed' },
  { id:'const',     label:'Construction',             dept:'MIDC',  status:'Available',       change:'Changed' },
]
export const M30_SLA_ROWS = [
  { id: 'MIDC-APP-2026-00418', business: 'Aster Precision Components Pvt. Ltd.', service: 'Building / Planning', state: 'FINAL_DECISION', desk: 'Decision Desk', office: 'Pune', received: '10 Sep 2026', slaTarget: '15d', elapsed: '13d', midc: '9d 2h', ent: '2d 1h', insp: '12h', ext: '0h', slaStatus: 'approaching' as const, due: '23 Sep 2026' },
  { id: 'MIDC-APP-2026-00421', business: 'Nova BioManufacturing Pvt. Ltd.', service: 'Building / Planning', state: 'TECHNICAL_SCRUTINY', desk: 'Planning Desk', office: 'Pune', received: '12 Sep 2026', slaTarget: '15d', elapsed: '11d', midc: '7d 4h', ent: '2d 6h', insp: '0h', ext: '0h', slaStatus: 'approaching' as const, due: '27 Sep 2026' },
  { id: 'MIDC-APP-2026-00409', business: 'SteelFab Industries Ltd.', service: 'Land / Plot', state: 'TECHNICAL_SCRUTINY', desk: 'Land Desk', office: 'Nashik', received: '04 Sep 2026', slaTarget: '10d', elapsed: '12d 3h', midc: '5d', ent: '4d 5h', insp: '0h', ext: '3h', slaStatus: 'breached' as const, due: '14 Sep 2026' },
  { id: 'MIDC-APP-2026-00415', business: 'Eco Polymers Pvt. Ltd.', service: 'Building / Planning', state: 'INSPECTION_SCHEDULED', desk: 'Inspection Desk', office: 'Aurangabad', received: '08 Sep 2026', slaTarget: '20d', elapsed: '15d', midc: '6d', ent: '1d', insp: '8d', ext: '0h', slaStatus: 'normal' as const, due: '28 Sep 2026' },
  { id: 'MIDC-APP-2026-00431', business: 'Precision Alloys Ltd.', service: 'Water / Utilities', state: 'QUERY_RAISED', desk: 'Utilities Desk', office: 'Nagpur', received: '15 Sep 2026', slaTarget: '10d', elapsed: '8d', midc: '3d', ent: '4d 12h', insp: '0h', ext: '12h', slaStatus: 'approaching' as const, due: '25 Sep 2026' },
  { id: 'MIDC-APP-2026-00388', business: 'Eastern Cement Works Ltd.', service: 'Land / Plot', state: 'DOCUMENT_SCRUTINY', desk: 'Land Desk', office: 'Pune', received: '28 Aug 2026', slaTarget: '15d', elapsed: '26d', midc: '12d', ent: '10d', insp: '0h', ext: '4d', slaStatus: 'breached' as const, due: '12 Sep 2026' },
]
export const M31_GRIEVANCES = [
  { id: 'GRV-2026-00012', appId: 'MIDC-APP-2026-00409', business: 'SteelFab Industries Ltd.', service: 'Land / Plot', reason: 'SLA Breach', raised: '20 Sep 2026', raisedBy: 'Entrepreneur', status: 'Open' as const, assignedDesk: 'Land Desk', assignedRole: 'Senior Officer', slaExceededBy: '2d 3h', configuredSla: '10d', actualElapsed: '12d 3h' },
  { id: 'GRV-2026-00011', appId: 'MIDC-APP-2026-00388', business: 'Eastern Cement Works Ltd.', service: 'Land / Plot', reason: 'Inspection Delay', raised: '17 Sep 2026', raisedBy: 'Entrepreneur', status: 'Escalated' as const, assignedDesk: 'Land Desk', assignedRole: 'Nodal Officer', slaExceededBy: '11d', configuredSla: '15d', actualElapsed: '26d' },
  { id: 'GRV-2026-00009', appId: 'MIDC-APP-2026-00431', business: 'Precision Alloys Ltd.', service: 'Water / Utilities', reason: 'Unresolved Query', raised: '19 Sep 2026', raisedBy: 'Entrepreneur', status: 'Resolved' as const, assignedDesk: 'Utilities Desk', assignedRole: 'Officer', slaExceededBy: '—', configuredSla: '10d', actualElapsed: '8d' },
]
export const M31_TIMELINE = [
  { date: '10 Sep 2026', event: 'Application Submitted', type: 'submit', link: '' },
  { date: '11 Sep 2026', event: 'Document Scrutiny Started', type: 'scrutiny', link: 'M10' },
  { date: '13 Sep 2026', event: 'Initial Scrutiny Completed', type: 'scrutiny', link: 'M11' },
  { date: '15 Sep 2026', event: 'Technical Scrutiny — Query Raised', type: 'query', link: 'M18' },
  { date: '17 Sep 2026', event: 'Entrepreneur Response Pending', type: 'wait', link: '' },
  { date: '19 Sep 2026', event: 'Configured SLA Threshold Approaching', type: 'sla', link: 'M30' },
  { date: '20 Sep 2026', event: 'SLA Exceeded — Configured threshold passed', type: 'breach', link: 'M30' },
  { date: '20 Sep 2026', event: 'Grievance Submitted by Entrepreneur', type: 'grievance', link: '' },
]
export const M39_NOTIFICATIONS = [
  { id: 'NTF-00418-12', cat: 'Decision Pending', what: 'Application awaiting final decision.', why: 'Configured scrutiny and decision prerequisites have reached the decision workflow.', action: 'Open Decision Workspace to record the statutory outcome.', when: 'Today, 2:15 PM', appId: 'MIDC-APP-2026-00418', business: 'Aster Precision Components', read: false, urgent: true, link: 'decision-workspace' as const },
  { id: 'NTF-00421-08', cat: 'SLA Risk', what: 'Application is approaching configured SLA.', why: 'The configured SLA threshold has been reached for MIDC-APP-2026-00421.', action: 'Review the time breakdown and current responsible desk.', when: 'Today, 11:40 AM', appId: 'MIDC-APP-2026-00421', business: 'Nova BioManufacturing Pvt. Ltd.', read: false, urgent: true, link: 'sla' as const },
  { id: 'NTF-00418-11', cat: 'Resubmission', what: 'Application resubmitted.', why: 'Entrepreneur corrected the deficiencies raised in the previous review.', action: 'Review changed fields and affected requirements in Delta Re-scrutiny.', when: 'Today, 10:06 AM', appId: 'MIDC-APP-2026-00418', business: 'Aster Precision Components', read: false, urgent: false, link: 'delta-rescrutiny' as const },
  { id: 'NTF-00431-05', cat: 'Query Response', what: 'Entrepreneur responded to a query.', why: 'Response received for Query QRY-2026-00431-04 with updated documents.', action: 'Review response and supporting evidence.', when: 'Today, 9:52 AM', appId: 'MIDC-APP-2026-00431', business: 'Precision Alloys Ltd.', read: true, urgent: false, link: 'query-history' as const },
  { id: 'NTF-00409-07', cat: 'Grievance', what: 'A grievance requires your attention.', why: 'Grievance GRV-2026-00012 has been assigned to your configured role.', action: 'Review grievance and application evidence timeline.', when: 'Yesterday, 4:30 PM', appId: 'MIDC-APP-2026-00409', business: 'SteelFab Industries Ltd.', read: false, urgent: true, link: 'grievance' as const },
  { id: 'NTF-00415-06', cat: 'Inspection Due', what: 'Inspection requires scheduling/action.', why: 'A configured inspection requirement is pending for MIDC-APP-2026-00415.', action: 'Open inspection queue and review planning requirements.', when: 'Yesterday, 2:00 PM', appId: 'MIDC-APP-2026-00415', business: 'Eco Polymers Pvt. Ltd.', read: true, urgent: false, link: 'inspection-queue' as const },
  { id: 'NTF-00418-09', cat: 'Business DNA Change', what: 'Entrepreneur Business DNA changed.', why: 'A new Business DNA version may affect the existing MIDC Building / Planning service.', action: 'Review the proposed/current comparison and impact analysis.', when: '22 Sep 2026', appId: 'MIDC-APP-2026-00418', business: 'Aster Precision Components', read: true, urgent: false, link: 'dna' as const },
]
export const M32_SOURCES = [
  { id: 'SRC-001', title: 'MIDC Building Regulations 2019', type: 'Rule', authority: 'MIDC', date: '01 Jan 2019', effective: '01 Apr 2019', version: 'MIDC-RULE-2026-V3', status: 'Published', section: 'Section 4.3', clause: 'Clause 4.3.2 — Built-up Area Calculation' },
  { id: 'SRC-002', title: 'Maharashtra Regional Town Planning Act (MRTP)', type: 'Act', authority: 'Government of Maharashtra', date: '01 Jan 1966', effective: '01 Jan 1966', version: 'MRTP-V12', status: 'Active', section: 'Section 18', clause: 'Development Control Regulations' },
  { id: 'SRC-003', title: 'GR No. TPB-4321/CR-88/UD-11', type: 'GR', authority: 'Urban Development Dept', date: '15 Mar 2023', effective: '01 Apr 2023', version: 'GR-2023-03', status: 'Published', section: 'Para 3', clause: 'Built-up Area — Definition' },
]
export const M32_CONVERSATION = [
  { role: 'officer' as const, text: 'Why is Built-up Area checked for Building / Planning?', chip: true },
  { role: 'rag' as const, text: 'Built-up Area is a configured parameter for the MIDC Building / Planning service. It is verified against the submitted Building Plan and the Business DNA declaration to ensure the proposed construction does not exceed the permissible FAR (Floor Area Ratio) as defined in the applicable MIDC Building Regulations.', source: 'SRC-001', clause: 'Clause 4.3.2', version: 'MIDC-RULE-2026-V3', retrieval: 'Source Found' as const },
  { role: 'officer' as const, text: 'Has this requirement changed recently?', chip: false },
  { role: 'rag' as const, text: 'No confirmed change found in the configured regulatory source. The current applicable version is MIDC-RULE-2026-V3, effective 01 April 2026. The previous version MIDC-RULE-2025-V2 (effective 01 April 2025) had the same Built-up Area calculation methodology.', source: 'SRC-001', clause: 'Clause 4.3.2', version: 'MIDC-RULE-2026-V3', retrieval: 'Source Found' as const },
]
export const M32_CHIPS = ['Why is this parameter checked?', 'Which GR / rule applies?', 'What evidence is expected?', 'Has this requirement changed?', 'What is the latest circular?', 'Explain in Marathi']
export const M33_CHANGES = [
  { id: 'CHG-2026-0008', source: 'GR No. TPB-2026/CR-41', type: 'GR', detected: '20 Sep 2026', published: '—', requirement: 'Built-up Area Calculation', service: 'Building / Planning', impact: 'Methodology update', validation: 'Under Review' as const, currentVer: 'MIDC-RULE-2026-V3', proposedVer: 'MIDC-RULE-2026-V4', admin: 'Regulatory Admin' },
  { id: 'CHG-2026-0007', source: 'Circular No. MIDC/ENV/2026/14', type: 'Circular', detected: '15 Sep 2026', published: '18 Sep 2026', requirement: 'Environmental Clearance', service: 'Land / Plot', impact: 'Document requirement added', validation: 'Published' as const, currentVer: 'MIDC-RULE-2026-V2', proposedVer: 'MIDC-RULE-2026-V3', admin: 'Regulatory Admin' },
  { id: 'CHG-2026-0006', source: 'Fire Safety GR 2026', type: 'GR', detected: '10 Sep 2026', published: '—', requirement: 'Fire NOC', service: 'Building / Planning', impact: 'New prerequisite', validation: 'Impact Analysis' as const, currentVer: 'MIDC-RULE-2025-V2', proposedVer: 'MIDC-RULE-2026-V3', admin: 'Regulatory Admin' },
  { id: 'CHG-2026-0005', source: 'Act Amendment 2026', type: 'Act', detected: '02 Sep 2026', published: '—', requirement: 'Plot Area Verification', service: 'Land / Plot', impact: 'Needs Verification', validation: 'Rejected' as const, currentVer: 'MRTP-V11', proposedVer: 'MRTP-V12', admin: 'Regulatory Admin' },
]
export const M34_APPS = [
  { id: 'MIDC-APP-2026-00418', business: 'Aster Precision Components Pvt. Ltd.', service: 'Building / Planning', state: 'FINAL_DECISION', curVer: 'MIDC-RULE-2026-V3', newVer: 'MIDC-RULE-2026-V4', requirement: 'Built-up Area Calculation', action: 'Review Required', impactStatus: 'Review Required' as const },
  { id: 'MIDC-APP-2026-00421', business: 'Nova BioManufacturing Pvt. Ltd.', service: 'Building / Planning', state: 'TECHNICAL_SCRUTINY', curVer: 'MIDC-RULE-2026-V3', newVer: 'MIDC-RULE-2026-V4', requirement: 'Built-up Area Calculation', action: 'Requirement Changed', impactStatus: 'Requirement Changed' as const },
  { id: 'MIDC-APP-2026-00415', business: 'Eco Polymers Pvt. Ltd.', service: 'Building / Planning', state: 'INSPECTION_SCHEDULED', curVer: 'MIDC-RULE-2025-V2', newVer: 'MIDC-RULE-2026-V4', requirement: 'Built-up Area Calculation', action: 'Transition Required', impactStatus: 'Transition Required' as const },
  { id: 'MIDC-APP-2026-00409', business: 'SteelFab Industries Ltd.', service: 'Land / Plot', state: 'TECHNICAL_SCRUTINY', curVer: 'MIDC-RULE-2026-V3', newVer: 'MIDC-RULE-2026-V4', requirement: 'Plot Area Verification', action: 'No Action Required', impactStatus: 'No Action Required' as const },
]
export const M35_FUNNEL = [
  { stage: 'Submitted', count: 47, pct: 100 },
  { stage: 'Document Scrutiny', count: 41, pct: 87 },
  { stage: 'Technical Scrutiny', count: 34, pct: 72 },
  { stage: 'Query Raised', count: 18, pct: 38 },
  { stage: 'Resubmission', count: 14, pct: 30 },
  { stage: 'Inspection', count: 9, pct: 19 },
  { stage: 'Final Decision', count: 6, pct: 13 },
  { stage: 'Approved / Rejected', count: 4, pct: 9 },
]
export const M35_TREND_DATA = [
  { month: 'Jun', received: 12, processed: 10, breaches: 1 },
  { month: 'Jul', received: 15, processed: 12, breaches: 2 },
  { month: 'Aug', received: 18, processed: 14, breaches: 2 },
  { month: 'Sep', received: 14, processed: 11, breaches: 3 },
]
export const M36_BREAKDOWN = [
  { stage: 'Entrepreneur Response', avg: '2d 6h', median: '2d', apps: 18, slaImpact: 'Medium', rework: 3, contribution: 22 },
  { stage: 'Inspection Waiting', avg: '4d 8h', median: '3d 12h', apps: 9, slaImpact: 'High', rework: 1, contribution: 38 },
  { stage: 'Technical Scrutiny', avg: '3d 2h', median: '2d 18h', apps: 34, slaImpact: 'Medium', rework: 4, contribution: 28 },
  { stage: 'Document Scrutiny', avg: '1d 4h', median: '1d', apps: 41, slaImpact: 'Low', rework: 2, contribution: 8 },
  { stage: 'Final Decision', avg: '1d 18h', median: '1d 6h', apps: 6, slaImpact: 'Medium', rework: 0, contribution: 12 },
]
export const M38_EVENTS = [
  { ts: '23 Sep 2026, 14:32', actor: 'Decision Officer', role: 'Planning Desk', action: 'Decision Recorded', record: 'MIDC-APP-2026-00418', field: 'Application State', old: 'FINAL_DECISION', new_: 'APPROVED', source: 'M25 Decision Workspace', reason: 'Officer statutory decision — record confirmed', ver: 'v3', type: 'CHANGE' as const },
  { ts: '23 Sep 2026, 14:33', actor: 'System (Journey Engine)', role: 'Automated', action: 'Dependency State Updated', record: 'MIDC-APP-2026-00418', field: 'Fire / Provisional', old: 'BLOCKED', new_: 'READY', source: 'M27 Dependency Update', reason: 'Configured dependency availability updated after MIDC decision', ver: 'v3', type: 'CHANGE' as const },
  { ts: '22 Sep 2026, 11:20', actor: 'Scrutiny Officer', role: 'Planning Desk', action: 'Scrutiny Finding Updated', record: 'MIDC-APP-2026-00418', field: 'Built-up Area', old: 'Needs Verification', new_: 'Valid', source: 'M14 Building Scrutiny', reason: 'Verified against submitted building plan v2', ver: 'v3', type: 'CHANGE' as const },
  { ts: '21 Sep 2026, 16:45', actor: 'Scrutiny Officer', role: 'Planning Desk', action: 'Document Viewed', record: 'MIDC-APP-2026-00418', field: 'Building Plan v2', old: '—', new_: '—', source: 'M13 Document Review', reason: 'Review as part of delta re-scrutiny', ver: 'v3', type: 'VIEW' as const },
  { ts: '20 Sep 2026, 10:15', actor: 'Inspection Officer', role: 'Inspection Desk', action: 'Inspection Observation Recorded', record: 'MIDC-APP-2026-00418', field: 'OBS-2026-00418-01', old: 'Open', new_: 'Correction Required', source: 'M23 Inspection Workspace', reason: 'On-site measurement inconsistency noted', ver: 'v3', type: 'CHANGE' as const },
  { ts: '18 Sep 2026, 14:00', actor: 'System (Resubmission)', role: 'Automated', action: 'Resubmission Recorded', record: 'MIDC-APP-2026-00418', field: 'Application Version', old: 'v2', new_: 'v3', source: 'Entrepreneur Portal', reason: 'Entrepreneur corrected deficiencies from QRY-004', ver: 'v3', type: 'CHANGE' as const },
  { ts: '16 Sep 2026, 09:00', actor: 'Scrutiny Officer', role: 'Planning Desk', action: 'Query Raised', record: 'MIDC-APP-2026-00418', field: 'QRY-004', old: 'Active', new_: 'Query Raised', source: 'M18 Query Builder', reason: '3 deficiencies raised in resubmission review', ver: 'v2', type: 'CHANGE' as const },
  { ts: '12 Sep 2026, 08:30', actor: 'System (Submission)', role: 'Automated', action: 'Application Submitted', record: 'MIDC-APP-2026-00418', field: 'Application State', old: 'DRAFT', new_: 'SUBMITTED', source: 'Entrepreneur Portal', reason: 'Entrepreneur submitted application', ver: 'v1', type: 'CHANGE' as const },
]

