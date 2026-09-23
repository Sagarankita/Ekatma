import * as Ids from './ids';
import * as States from './states';

export interface BusinessDnaRecord {
  versionId: Ids.BusinessDnaVersion;
  businessId: Ids.BusinessId;
  snapshotData: Record<string, unknown>;
  createdAt: string;
}

export interface ApplicationRecord {
  id: Ids.ApplicationId;
  projectId: Ids.ProjectId;
  serviceId: Ids.ServiceId;
  businessDnaVersion: Ids.BusinessDnaVersion;
  state: States.ApplicationState;
  submittedAt?: string;
  updatedAt: string;
}

export interface DocumentRecord {
  id: Ids.DocumentId;
  applicationId: Ids.ApplicationId;
  latestVersionId: Ids.DocumentVersionId;
  documentType: string;
}

export interface DocumentVersionRecord {
  id: Ids.DocumentVersionId;
  documentId: Ids.DocumentId;
  fileUrl: string;
  verificationState: States.VerificationState;
  uploadedAt: string;
}

export interface QueryRecord {
  id: Ids.QueryId;
  applicationId: Ids.ApplicationId;
  state: States.QueryState;
  issueText: string;
  createdAt: string;
}

export interface DeficiencyRecord {
  id: Ids.DeficiencyId;
  applicationId: Ids.ApplicationId;
  state: States.DeficiencyState;
  description: string;
  identifiedAt: string;
}

export interface ResubmissionRecord {
  id: Ids.ResubmissionVersionId;
  applicationId: Ids.ApplicationId;
  queryId?: Ids.QueryId;
  deficiencyId?: Ids.DeficiencyId;
  submittedAt: string;
}

export interface InspectionRecord {
  id: Ids.InspectionId;
  applicationId: Ids.ApplicationId;
  state: States.InspectionState;
  scheduledDate?: string;
}

export interface DecisionRecord {
  id: Ids.DecisionId;
  applicationId: Ids.ApplicationId;
  state: States.DecisionState;
  remarks?: string;
  decidedAt?: string;
}

export interface DependencyRecord {
  id: Ids.DependencyNodeId;
  sourceApplicationId: Ids.ApplicationId;
  targetApplicationId: Ids.ApplicationId;
  state: States.DependencyState;
}

export interface ComplianceRecord {
  id: Ids.ComplianceId;
  applicationId: Ids.ApplicationId;
  state: States.ComplianceState;
  dueDate: string;
}

export interface GrievanceRecord {
  id: Ids.GrievanceId;
  applicationId: Ids.ApplicationId;
  state: States.GrievanceState;
  description: string;
  lodgedAt: string;
}

export interface RegulatoryRuleRecord {
  versionId: Ids.RegulatoryRuleVersionId;
  ruleCode: string;
  description: string;
  effectiveFrom: string;
}
