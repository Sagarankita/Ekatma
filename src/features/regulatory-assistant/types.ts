export type AssistantPortal = 'entrepreneur' | 'department';
export type AssistantOrigin = 'header' | 'circular' | 'inline' | 'full-page';
export type AssistantMode = 'global' | 'page' | 'entity' | 'research';
export type AssistantRole = 'user' | 'assistant' | 'context';

export interface AssistantEntities {
  businessId?: string;
  incentiveId?: string;
  claimId?: string;
  applicationId?: string;
  requirementId?: string;
  documentId?: string;
  inspectionId?: string;
  decisionId?: string;
  complianceId?: string;
  regulatoryChangeId?: string;
  parameterId?: string;
  dependencyNodeId?: string;
}

export interface AssistantContext {
  portal: AssistantPortal;
  userRole: string;
  route: string;
  pageType: string;
  pageTitle: string;
  label: string;
  mode: AssistantMode;
  origin: AssistantOrigin;
  presetId?: string;
  entities: AssistantEntities;
  safeMetadata?: {
    businessName?: string;
    applicationService?: string;
    authority?: string;
    recordTitle?: string;
    status?: string;
    schemeName?: string;
    claimStatus?: string;
    applicationStatus?: string;
  };
}

export interface AssistantCitation {
  source: string;
  clause?: string;
  version?: string;
  effectiveDate?: string;
}

export interface AssistantMessage {
  id: string;
  role: AssistantRole;
  content: string;
  createdAt: number;
  contextSnapshot: AssistantContext;
  citations?: AssistantCitation[];
  needsVerification?: boolean;
  uncertainty?: string;
}

export interface AssistantRequest {
  message: string;
  /** @deprecated Temporary compatibility alias; future adapters should use message. */
  content: string;
  context: AssistantContext;
  threadId: string;
  messages: readonly AssistantMessage[];
}

export interface AssistantResponse {
  content: string;
  citations?: AssistantCitation[];
  needsVerification?: boolean;
  uncertainty?: string;
}

export interface AssistantService {
  sendMessage(input: AssistantRequest, signal?: AbortSignal): Promise<AssistantResponse>;
}
