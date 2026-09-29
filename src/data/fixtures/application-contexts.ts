import type { ApplicationWorkspaceRecord } from '@/domain/application-workspace';
import type { ApplicationState } from '@/domain/states';
import { SAHYADRI_DEMO } from './sahyadri-department-demo';

type Seed = Pick<ApplicationWorkspaceRecord, 'id' | 'business' | 'service' | 'state' | 'desk'> &
  Partial<ApplicationWorkspaceRecord>;

const seeds: Seed[] = [
  {
    id: SAHYADRI_DEMO.application.id,
    businessId: SAHYADRI_DEMO.business.id,
    business: SAHYADRI_DEMO.business.name,
    projectId: SAHYADRI_DEMO.business.projectId,
    project: SAHYADRI_DEMO.business.project,
    serviceId: SAHYADRI_DEMO.application.serviceId,
    service: SAHYADRI_DEMO.application.service,
    dnaVersion: SAHYADRI_DEMO.application.dnaVersion,
    state: SAHYADRI_DEMO.application.state,
    desk: SAHYADRI_DEMO.application.desk,
    sla: SAHYADRI_DEMO.application.sla,
    inspectionId: SAHYADRI_DEMO.inspection.id,
    dependencyState: 'Contextual external prerequisites visible',
    decisionState: 'PENDING',
    applicant: SAHYADRI_DEMO.application.applicant,
    received: SAHYADRI_DEMO.application.received,
    lastUpdated: SAHYADRI_DEMO.application.lastUpdated,
  },
  { id: 'APP-MIDC-2048', business: 'Aarav Precision Components Pvt Ltd', service: 'Land / Plot', state: 'INITIAL_SCRUTINY', desk: 'Land / Plot Scrutiny', applicant: 'R. Mehta', received: '16 Sep 2026', sla: '1 day remaining' },
  { id: 'APP-MIDC-2051', business: 'Nova Industrial Systems Ltd', service: 'Planning / Building', state: 'TECHNICAL_SCRUTINY', desk: 'Planning / Building Scrutiny', applicant: 'S. Pawar', received: '14 Sep 2026', sla: 'Breached by 1 day' },
  { id: 'APP-MIDC-2019', business: 'Nova Industrial Systems Ltd', service: 'Planning / Building', state: 'QUERY_RAISED', desk: 'Planning / Building Scrutiny', applicant: 'S. Pawar', received: '11 Sep 2026', sla: 'Breached by 4 days', queryVersion: 'QRY-2019-v1' },
  { id: 'APP-MIDC-1987', business: 'Kinetic Engineering Works', service: 'Water / Utility', state: 'RESUBMITTED', desk: 'Utility / Water Scrutiny', applicant: 'M. Joshi', received: '21 Sep 2026', sla: '4 days remaining', queryVersion: 'QRY-1987-v2' },
  { id: 'APP-MIDC-2031', business: 'Vertex Manufacturing Ltd', service: 'Planning / Building', state: 'INSPECTION_PENDING', desk: 'Inspection', applicant: 'P. Kulkarni', received: '19 Sep 2026', sla: '2 days remaining', inspectionId: 'INSP-2026-02031' },
  { id: 'APP-MIDC-1964', business: 'Maharashtra Components Pvt Ltd', service: 'Land / Plot', state: 'FINAL_DECISION', desk: 'Decision', applicant: 'A. Desai', received: '10 Sep 2026', sla: '1 day remaining', decisionState: 'PENDING' },
  { id: 'APP-MIDC-2039', business: 'Synergy Fabricators Pvt Ltd', service: 'Planning / Building', state: 'SUBMITTED', desk: 'Land / Plot Scrutiny', applicant: 'R. Sharma', received: '22 Sep 2026', sla: '5 days remaining' },
  { id: 'APP-MIDC-2011', business: 'Bharat Industrial Corp', service: 'Land / Plot', state: 'DOCUMENT_SCRUTINY', desk: 'Land / Plot Scrutiny', applicant: 'V. Nair', received: '5 Sep 2026', sla: 'Breached by 7 days', dependencyState: 'BLOCKED' },
  { id: 'APP-MIDC-1974', business: 'Nova Industrial Systems', service: 'Land / Plot', state: 'INSPECTION_PENDING', desk: 'Inspection Desk', inspectionId: 'INSP-2026-01974' },
  { id: 'APP-MIDC-1918', business: 'Legacy application on record', service: 'Land / Plot', state: 'APPROVED', desk: 'Records' },
  { id: 'MIDC-APP-2026-00482', business: 'Aster BioTech Manufacturing Pvt. Ltd.', service: 'Building / Planning', state: 'TECHNICAL_SCRUTINY', desk: 'Planning / Building Scrutiny', project: 'API Manufacturing Unit', applicant: 'Rajesh V. Kulkarni', received: '12 Aug 2026', sla: '9 days remaining', queryVersion: 'QRY-0118-v2', dependencyState: '1 prerequisite pending' },
  { id: 'MIDC-APP-2026-00418', business: 'Aster Precision Components Pvt. Ltd.', service: 'Building / Planning', state: 'FINAL_DECISION', desk: 'Decision Desk', received: '10 Sep 2026', sla: '2 days remaining', queryVersion: 'QRY-00418-v2', inspectionId: 'INSP-2026-00418', dependencyState: '1 external prerequisite pending', decisionState: 'PENDING' },
  { id: 'MIDC-APP-2026-00421', business: 'Nova BioManufacturing Pvt. Ltd.', service: 'Building / Planning', state: 'TECHNICAL_SCRUTINY', desk: 'Planning Desk', received: '12 Sep 2026', sla: '4 days remaining' },
  { id: 'MIDC-APP-2026-00409', business: 'SteelFab Industries Ltd.', service: 'Land / Plot', state: 'TECHNICAL_SCRUTINY', desk: 'Land Desk', received: '04 Sep 2026', sla: 'Breached by 2 days' },
  { id: 'MIDC-APP-2026-00415', business: 'Eco Polymers Pvt. Ltd.', service: 'Building / Planning', state: 'INSPECTION_SCHEDULED', desk: 'Inspection Desk', received: '08 Sep 2026', sla: '5 days remaining', inspectionId: 'INSP-2026-00415' },
  { id: 'MIDC-APP-2026-00431', business: 'Precision Alloys Ltd.', service: 'Water / Utilities', state: 'QUERY_RAISED', desk: 'Utilities Desk', received: '15 Sep 2026', sla: '2 days remaining', queryVersion: 'QRY-2026-00431-04' },
  { id: 'MIDC-APP-2026-00405', business: 'Pioneer Process Systems', service: 'Building / Planning', state: 'RESUBMITTED', desk: 'Planning Desk', queryVersion: 'QRY-2026-00405-02' },
  { id: 'MIDC-APP-2026-00419', business: 'Aster Industrial Expansion', service: 'Land / Plot', state: 'INITIAL_SCRUTINY', desk: 'Land Desk' },
  { id: 'MIDC-APP-2026-00388', business: 'Eastern Cement Works Ltd.', service: 'Land / Plot', state: 'DOCUMENT_SCRUTINY', desk: 'Land Desk', received: '28 Aug 2026', sla: 'Breached by 11 days', inspectionId: 'INSP-2026-00388' },
  { id: 'MIDC-APP-2026-00391', business: 'Sahyadri Engineering Ltd.', service: 'Land / Plot', state: 'INSPECTION_PENDING', desk: 'Inspection Desk', inspectionId: 'INSP-2026-00391' },
  { id: 'MIDC-APP-2026-00372', business: 'Pragati Industrial Systems', service: 'Building / Planning', state: 'INSPECTION_SCHEDULED', desk: 'Inspection Desk', inspectionId: 'INSP-2026-00372' },
  { id: 'MIDC-APP-2026-00411', business: 'Western Components Pvt. Ltd.', service: 'Land / Plot', state: 'INSPECTION_PENDING', desk: 'Inspection Desk', inspectionId: 'INSP-2026-00411' },
  { id: 'MIDC-APP-2026-00398', business: 'Deccan Process Equipment', service: 'Water / Utilities', state: 'INSPECTION_PENDING', desk: 'Inspection Desk', inspectionId: 'INSP-2026-00398' },
];

const makeRecord = (seed: Seed): ApplicationWorkspaceRecord => {
  const token = seed.id.replace(/[^A-Z0-9]/gi, '');
  return {
    businessId: seed.businessId ?? `BUS-${token}`,
    projectId: seed.projectId ?? `PRJ-${token}`,
    project: seed.project ?? `${seed.business} Project`,
    serviceId: seed.serviceId ?? `SVC-${seed.service.toUpperCase().replace(/[^A-Z0-9]+/g, '-')}`,
    dnaVersion: seed.dnaVersion ?? 'DNA-v2',
    queryVersion: null,
    inspectionId: null,
    dependencyState: 'No blocking dependency',
    decisionState: 'NOT_STARTED',
    applicant: 'Applicant on record',
    received: 'Not recorded',
    lastUpdated: '22 Sep 2026',
    sla: 'Within configured SLA',
    ...seed,
  };
};

export const APPLICATION_CONTEXTS: Readonly<Record<string, ApplicationWorkspaceRecord>> =
  Object.fromEntries(seeds.map(seed => [seed.id, makeRecord(seed)]));

export function getApplicationContext(applicationId: string): ApplicationWorkspaceRecord | undefined {
  return APPLICATION_CONTEXTS[applicationId];
}

export function applicationStateLabel(state: ApplicationState): string {
  return state.toLowerCase().split('_').map(part => part[0].toUpperCase() + part.slice(1)).join(' ');
}
