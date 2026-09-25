import { ENTREPRENEUR_BUSINESSES } from '../identity/catalog';
import type { BusinessId } from '../../../domain/ids';
import { listInspectionsForBusiness, listTrackerAppsForBusiness } from '../applications/data';
import { listComplianceForBusiness } from '../compliance/data';
import { listIncentivesForBusiness } from '../incentives/data';

export type JourneyState = 'Action Required' | 'In Progress' | 'Under Review' | 'On Track' | 'Compliance Due' | 'Inspection Upcoming' | 'No Immediate Action';
export type ProjectStage = 'Planning' | 'Land Acquisition' | 'Pre-Establishment' | 'Construction' | 'Installation' | 'Trial Production' | 'Ready to Operate' | 'Operational';

export interface BusinessProject {
  id: BusinessId;
  name: string;
  subtitle: string;
  industry: string;
  location: string;
  stage: ProjectStage;
  journeyState: JourneyState;
  activeApplications: number;
  applicationPreviews: string[];
  actionsRequired: number;
  actionDetails: string[];
  nextCompliance: string | null;
  inspection: string | null;
  incentiveAction: string | null;
  alert: string | null;
  provenance?: string;
}

const projectDetails: Record<string, Omit<BusinessProject, 'id' | 'name' | 'subtitle' | 'industry' | 'location'>> = {
  'BP-001': {
    stage: 'Pre-Establishment',
    journeyState: 'Action Required',
    activeApplications: 3,
    applicationPreviews: ['MPCB — Consent to Establish', 'MIDC — Building / Planning', 'Fire — Provisional NOC'],
    actionsRequired: 2,
    actionDetails: ['Respond to department query', 'Upload required document'],
    nextCompliance: null,
    inspection: null,
    incentiveAction: 'Possible incentive benefit — review eligibility',
    alert: 'Query Raised',
  },
  'BP-002': {
    stage: 'Construction',
    journeyState: 'Inspection Upcoming',
    activeApplications: 2,
    applicationPreviews: ['Planning Authority — Building Plan', 'DISH — Factory Registration'],
    actionsRequired: 1,
    actionDetails: ['Confirm inspection availability'],
    nextCompliance: null,
    inspection: '12 Oct 2026',
    incentiveAction: null,
    alert: 'Inspection Upcoming',
  },
  'BP-003': {
    stage: 'Operational',
    journeyState: 'Compliance Due',
    activeApplications: 1,
    applicationPreviews: ['Legal Metrology — Annual Verification'],
    actionsRequired: 0,
    actionDetails: [],
    nextCompliance: 'Environmental return · 18 Oct 2026',
    inspection: null,
    incentiveAction: null,
    alert: 'Compliance Due',
  },
  'BP-004': {
    stage: 'Trial Production',
    journeyState: 'Action Required',
    activeApplications: 0,
    applicationPreviews: [],
    actionsRequired: 0,
    actionDetails: [],
    nextCompliance: null,
    inspection: null,
    incentiveAction: null,
    alert: null,
  },
};

export const SAMPLE_PROJECTS: readonly BusinessProject[] = ENTREPRENEUR_BUSINESSES.map(business => {
  const applications = listTrackerAppsForBusiness(business.id);
  const obligations = listComplianceForBusiness(business.id);
  const inspections = listInspectionsForBusiness(business.id);
  const schemes = listIncentivesForBusiness(business.id);
  const actions = applications.flatMap(application => application.actionRequired ? [application.actionRequired] : []);
  return {
    ...business,
    ...projectDetails[business.id],
    journeyState: actions.length ? 'Action Required' : applications.length ? 'In Progress' : 'No Immediate Action',
    activeApplications: applications.length,
    applicationPreviews: applications.map(application => `${application.dept} — ${application.service}`),
    actionsRequired: actions.length,
    actionDetails: actions,
    nextCompliance: obligations.find(obligation => obligation.status !== 'Compliant')?.dueDate ?? null,
    inspection: inspections[0]?.date ?? null,
    incentiveAction: schemes.length ? `${schemes.length} prototype scheme matches` : null,
    alert: null,
  };
});

export function findBusinessProjectById(id: string): BusinessProject | undefined {
  return SAMPLE_PROJECTS.find(project => project.id === id);
}
