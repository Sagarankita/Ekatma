import type { ApplicationState } from './states';

export interface ApplicationWorkspaceRecord {
  id: string;
  businessId: string;
  business: string;
  projectId: string;
  project: string;
  serviceId: string;
  service: string;
  dnaVersion: string;
  state: ApplicationState;
  desk: string;
  sla: string;
  queryVersion: string | null;
  inspectionId: string | null;
  dependencyState: string;
  decisionState: string;
  applicant: string;
  received: string;
  lastUpdated: string;
}
