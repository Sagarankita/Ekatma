// Opaque/Branded ID types
declare const __brand: unique symbol;
export type Brand<T, B> = T & { readonly [__brand]: B };

export type BusinessId = Brand<string, 'BusinessId'>;
export type ProjectId = Brand<string, 'ProjectId'>;
export type ApplicationId = Brand<string, 'ApplicationId'>;
export type DepartmentId = Brand<string, 'DepartmentId'>;
export type ServiceId = Brand<string, 'ServiceId'>;
export type BusinessDnaVersion = Brand<string, 'BusinessDnaVersion'>;
export type DocumentId = Brand<string, 'DocumentId'>;
export type DocumentVersionId = Brand<string, 'DocumentVersionId'>;
export type QueryId = Brand<string, 'QueryId'>;
export type DeficiencyId = Brand<string, 'DeficiencyId'>;
export type ResubmissionVersionId = Brand<string, 'ResubmissionVersionId'>;
export type InspectionId = Brand<string, 'InspectionId'>;
export type DecisionId = Brand<string, 'DecisionId'>;
export type ApprovalId = Brand<string, 'ApprovalId'>;
export type DependencyNodeId = Brand<string, 'DependencyNodeId'>;
export type ComplianceId = Brand<string, 'ComplianceId'>;
export type GrievanceId = Brand<string, 'GrievanceId'>;
export type RegulatoryRuleVersionId = Brand<string, 'RegulatoryRuleVersionId'>;

// Factory functions to safely cast IDs
export const createBusinessId = (id: string) => id as BusinessId;
export const createProjectId = (id: string) => id as ProjectId;
export const createApplicationId = (id: string) => id as ApplicationId;
export const createDepartmentId = (id: string) => id as DepartmentId;
export const createServiceId = (id: string) => id as ServiceId;
export const createBusinessDnaVersion = (id: string) => id as BusinessDnaVersion;
export const createDocumentId = (id: string) => id as DocumentId;
export const createDocumentVersionId = (id: string) => id as DocumentVersionId;
export const createQueryId = (id: string) => id as QueryId;
export const createDeficiencyId = (id: string) => id as DeficiencyId;
export const createResubmissionVersionId = (id: string) => id as ResubmissionVersionId;
export const createInspectionId = (id: string) => id as InspectionId;
export const createDecisionId = (id: string) => id as DecisionId;
export const createApprovalId = (id: string) => id as ApprovalId;
export const createDependencyNodeId = (id: string) => id as DependencyNodeId;
export const createComplianceId = (id: string) => id as ComplianceId;
export const createGrievanceId = (id: string) => id as GrievanceId;
export const createRegulatoryRuleVersionId = (id: string) => id as RegulatoryRuleVersionId;
