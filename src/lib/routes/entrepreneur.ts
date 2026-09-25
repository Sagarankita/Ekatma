const RESERVED_ROUTE_IDS = new Set(['default', 'sample', 'temp', 'current']);

function segment(id: string, label: string): string {
  const normalized = id.trim();
  if (id !== normalized || !normalized || normalized === '.' || normalized === '..' || RESERVED_ROUTE_IDS.has(normalized.toLowerCase())) {
    throw new Error(`A real ${label} is required`);
  }
  return encodeURIComponent(id);
}

const businessPath = (businessId: string) =>
  `/entrepreneur/businesses/${segment(businessId, 'business ID')}`;

const applicationPath = (businessId: string, applicationId: string) =>
  `${businessPath(businessId)}/applications/${segment(applicationId, 'application ID')}`;

export const ENTREPRENEUR_ROUTES = {
  login: () => '/entrepreneur/login',
  register: () => '/entrepreneur/register',
  registerDetails: () => '/entrepreneur/register/details',
  registerSuccess: () => '/entrepreneur/register/success',
  businesses: () => '/entrepreneur/businesses',
  newBusiness: () => '/entrepreneur/businesses/new',
  newBusinessBasicRequirements: () => '/entrepreneur/businesses/new/basic-requirements',
  newBusinessDiscovery: () => '/entrepreneur/businesses/new/discovery',
  newBusinessScale: () => '/entrepreneur/businesses/new/discovery/scale',
  newBusinessEnvironmentSafety: () => '/entrepreneur/businesses/new/discovery/environment-safety',
  newBusinessReview: () => '/entrepreneur/businesses/new/review',

  business: businessPath,
  profile: (businessId: string) => `${businessPath(businessId)}/profile`,
  dossier: (businessId: string) => `${businessPath(businessId)}/dossier`,
  provenance: (businessId: string) => `${businessPath(businessId)}/dossier/provenance`,
  journey: (businessId: string) => `${businessPath(businessId)}/journey`,
  requirement: (businessId: string, requirementId: string) =>
    `${businessPath(businessId)}/requirements/${segment(requirementId, 'requirement ID')}`,
  documents: (businessId: string) => `${businessPath(businessId)}/documents`,
  document: (businessId: string, documentId: string) =>
    `${businessPath(businessId)}/documents/${segment(documentId, 'document ID')}`,
  dependencies: (businessId: string) => `${businessPath(businessId)}/dependencies`,

  applications: (businessId: string) => `${businessPath(businessId)}/applications`,
  newApplication: (businessId: string) => `${businessPath(businessId)}/applications/new`,
  applicationPrevalidation: (businessId: string) => `${businessPath(businessId)}/applications/new/prevalidation`,
  applicationConsistency: (businessId: string) => `${businessPath(businessId)}/applications/new/consistency`,
  applicationSubmission: (businessId: string) => `${businessPath(businessId)}/applications/new/submission`,
  application: applicationPath,
  applicationQuery: (businessId: string, applicationId: string, queryId: string) =>
    `${applicationPath(businessId, applicationId)}/queries/${segment(queryId, 'query ID')}`,
  applicationResubmission: (businessId: string, applicationId: string, resubmissionId: string) =>
    `${applicationPath(businessId, applicationId)}/resubmissions/${segment(resubmissionId, 'resubmission ID')}`,
  applicationDecision: (businessId: string, applicationId: string, decisionId: string) =>
    `${applicationPath(businessId, applicationId)}/decisions/${segment(decisionId, 'decision ID')}`,

  inspections: (businessId: string) => `${businessPath(businessId)}/inspections`,
  inspection: (businessId: string, inspectionId: string) =>
    `${businessPath(businessId)}/inspections/${segment(inspectionId, 'inspection ID')}`,
  compliance: (businessId: string) => `${businessPath(businessId)}/compliance`,
  complianceDetail: (businessId: string, complianceId: string) =>
    `${businessPath(businessId)}/compliance/${segment(complianceId, 'compliance ID')}`,
  incentives: (businessId: string) => `${businessPath(businessId)}/incentives`,
  incentive: (businessId: string, incentiveId: string) =>
    `${businessPath(businessId)}/incentives/${segment(incentiveId, 'incentive ID')}`,
  incentiveClaims: (businessId: string) => `${businessPath(businessId)}/incentive-claims`,
  regulatoryChanges: (businessId: string) => `${businessPath(businessId)}/regulatory-changes`,
  changes: (businessId: string) => `${businessPath(businessId)}/changes`,
  amendments: (businessId: string) => `${businessPath(businessId)}/changes/amendments`,
  grievances: (businessId: string, options?: { grievanceId?: string; applicationId?: string; raise?: boolean }) => {
    const base = `${businessPath(businessId)}/grievances`;
    if (!options) return base;
    const params = new URLSearchParams();
    if (options.grievanceId) params.set('grievanceId', options.grievanceId);
    if (options.applicationId) params.set('applicationId', options.applicationId);
    if (options.raise) params.set('raise', '1');
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  },

  notifications: () => '/entrepreneur/notifications',
  assistant: () => '/entrepreneur/assistant',
} as const;
