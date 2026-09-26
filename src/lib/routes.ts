// Builders accept raw IDs (including decoded App Router params). Encode each
// dynamic segment here, once; callers must not pre-encode IDs.
const segment = (id: string) => {
  if (!id || id === '.' || id === '..') throw new Error('A non-empty record ID is required');
  return encodeURIComponent(id);
};
const applicationPath = (applicationId: string) => `/department/applications/${segment(applicationId)}`;
const withQuery = (path: string, values: Record<string, string | undefined>) => {
  const query = new URLSearchParams();
  Object.entries(values).forEach(([key, value]) => { if (value) query.set(key, value); });
  const suffix = query.toString();
  return suffix ? `${path}?${suffix}` : path;
};
const inspectionPath = (applicationId: string, inspectionId: string) =>
  `${applicationPath(applicationId)}/inspections/${segment(inspectionId)}`;

export const ROUTES = {
  department: {
    login: '/department/login',
    home: '/department',
    queue: '/department/queue',
    search: '/department/search',
    services: '/department/services',
    scrutiny: '/department/scrutiny',
    inspections: '/department/inspections',
    inspectionQueue: '/department/inspection-queue',
    queries: '/department/queries',
    decisions: '/department/decisions',
    sla: '/department/sla',
    grievances: '/department/grievances',
    regAssistant: '/department/regasst',
    regChanges: '/department/regchng',
    regImpact: '/department/regchng/impact',
    analytics: '/department/analytics',
    bottleneck: '/department/bottleneck',
    workload: '/department/workload',
    audit: '/department/audit',
    searchQuery: (query: string) => query.trim()
      ? `/department/search?q=${encodeURIComponent(query.trim())}`
      : '/department/search',
    application: applicationPath,
    applicationTab: (applicationId: string, tab: string, from?: string) =>
      withQuery(applicationPath(applicationId), { tab, from }),
    queueFilter: (service?: string, status?: string) =>
      withQuery('/department/queue', { service, status, from: 'services' }),
    applicationDna: (applicationId: string) => `${applicationPath(applicationId)}/dna`,
    applicationTimeline: (applicationId: string) => `${applicationPath(applicationId)}/timeline`,
    applicationPrecheck: (applicationId: string) => `${applicationPath(applicationId)}/precheck`,
    applicationScrutinyWorkflow: (applicationId: string) => `${applicationPath(applicationId)}/scrutiny-workflow`,
    applicationScrutinyRoute: (applicationId: string) => `${applicationPath(applicationId)}/scrutiny-route`,
    applicationScrutinyWorkbench: (applicationId: string) => `${applicationPath(applicationId)}/scrutiny-workbench`,
    applicationParameter: (applicationId: string, parameterId: string) => `${applicationPath(applicationId)}/parameter/${segment(parameterId)}`,
    applicationDocument: (applicationId: string, documentId: string) => `${applicationPath(applicationId)}/document/${segment(documentId)}`,
    applicationBuildingScrutiny: (applicationId: string) => `${applicationPath(applicationId)}/building-scrutiny`,
    applicationWaterScrutiny: (applicationId: string) => `${applicationPath(applicationId)}/water-scrutiny`,
    applicationConsistency: (applicationId: string) => `${applicationPath(applicationId)}/consistency`,
    applicationDependencyView: (applicationId: string) => `${applicationPath(applicationId)}/dependency-view`,
    applicationQueryBuilder: (applicationId: string) => `${applicationPath(applicationId)}/query-builder`,
    applicationQueryHistory: (applicationId: string) => `${applicationPath(applicationId)}/query-history`,
    applicationDeltaRescrutiny: (applicationId: string) => `${applicationPath(applicationId)}/delta-rescrutiny`,
    applicationInspections: (applicationId: string) => `${applicationPath(applicationId)}/inspections`,
    inspectionPlan: (applicationId: string, inspectionId: string) => `${inspectionPath(applicationId, inspectionId)}/plan`,
    inspectionWorkspace: (applicationId: string, inspectionId: string) => `${inspectionPath(applicationId, inspectionId)}/workspace`,
    inspectionObservations: (applicationId: string, inspectionId: string) => `${inspectionPath(applicationId, inspectionId)}/observations`,
    applicationDecisionWorkspace: (applicationId: string) => `${applicationPath(applicationId)}/decision-workspace`,
    decisionRecord: (applicationId: string, decisionId: string) => `${applicationPath(applicationId)}/decisions/${segment(decisionId)}`,
    dependencyUpdate: (applicationId: string, dependencyNodeId: string) => `${applicationPath(applicationId)}/dependencies/${segment(dependencyNodeId)}/update`,
    compliance: (applicationId: string, complianceId: string) => `${applicationPath(applicationId)}/compliance/${segment(complianceId)}`,
    amendmentIntake: (applicationId: string) => `${applicationPath(applicationId)}/amendment-intake`,
  }
};

// Existing shell/home destination IDs, retained independently of display labels.
export const DEPARTMENT_DESTINATIONS: Readonly<Record<string, string>> = {
  'dept-home': ROUTES.department.home,
  'dept-queue': ROUTES.department.queue,
  'dept-apps': ROUTES.department.search,
  'dept-catalogue': ROUTES.department.services,
  'dept-scrutiny': ROUTES.department.scrutiny,
  'dept-inspect': ROUTES.department.inspections,
  'dept-insp-queue': ROUTES.department.inspectionQueue,
  'dept-queries': ROUTES.department.queries,
  'dept-decisions': ROUTES.department.decisions,
  'dept-sla': ROUTES.department.sla,
  'dept-grievances': ROUTES.department.grievances,
  'dept-regasst': ROUTES.department.regAssistant,
  'dept-regchng': ROUTES.department.regChanges,
  'dept-regimpact': ROUTES.department.regImpact,
  'dept-analytics': ROUTES.department.analytics,
  'dept-bottleneck': ROUTES.department.bottleneck,
  'dept-workload': ROUTES.department.workload,
  'dept-audit': ROUTES.department.audit,
};

export function departmentActiveItem(pathname: string): string {
  const path = pathname.split(/[?#]/)[0].replace(/\/$/, '');
  
  if (path.includes('/query-builder') || path.includes('/query-history') || path.includes('/queries')) {
    return 'dept-queries';
  }

  if (
    path.includes('/decision-workspace') || 
    path.includes('/decisions') || 
    path.includes('/dependencies/') || 
    path.includes('/compliance/') || 
    path.includes('/amendment-intake')
  ) {
    return 'dept-decisions';
  }

  if (path.includes('/inspection-queue')) {
    return 'dept-insp-queue';
  }

  if (path.includes('/inspections')) {
    return 'dept-inspect';
  }
  
  if (
    path.includes('/scrutiny') || 
    path.includes('/consistency') || 
    path.includes('/dependency-view') || 
    path.includes('/delta-rescrutiny') || 
    path.includes('/parameter') || 
    path.includes('/document') ||
    path.includes('/building-scrutiny') ||
    path.includes('/water-scrutiny')
  ) {
    return 'dept-scrutiny';
  }
  
  if (path.startsWith(`${ROUTES.department.home}/applications/`)) return 'dept-apps';
  
  // These child destinations have no separate sidebar item.
  if (path === ROUTES.department.regImpact) return 'dept-regchng';
  if (path === ROUTES.department.bottleneck) return 'dept-analytics';
  
  return Object.entries(DEPARTMENT_DESTINATIONS).find(([, route]) => route === path)?.[0] ?? '';
}

const notificationDestinations = {
  'decision-workspace': ROUTES.department.applicationDecisionWorkspace,
  'sla': () => ROUTES.department.sla,
  'delta-rescrutiny': ROUTES.department.applicationDeltaRescrutiny,
  'query-history': ROUTES.department.applicationQueryHistory,
  'grievance': () => ROUTES.department.grievances,
  'inspection-queue': ROUTES.department.applicationInspections,
  'dna': ROUTES.department.applicationDna,
};

export function departmentNotificationRoute(link: keyof typeof notificationDestinations, applicationId: string): string {
  return notificationDestinations[link](applicationId);
}

const scrutinyDestinations: Readonly<Record<string, (applicationId: string) => string>> = {
  overview: ROUTES.department.application,
  dna: ROUTES.department.applicationDna,
  timeline: ROUTES.department.applicationTimeline,
  precheck: ROUTES.department.applicationPrecheck,
  'scrutiny-workflow': ROUTES.department.applicationScrutinyWorkflow,
  'scrutiny-route': ROUTES.department.applicationScrutinyRoute,
  'scrutiny-workbench': ROUTES.department.applicationScrutinyWorkbench,
  'bldg-scrutiny': ROUTES.department.applicationBuildingScrutiny,
  'water-scrutiny': ROUTES.department.applicationWaterScrutiny,
  consistency: ROUTES.department.applicationConsistency,
  'dependency-view': ROUTES.department.applicationDependencyView,
  'query-builder': ROUTES.department.applicationQueryBuilder,
  'query-history': ROUTES.department.applicationQueryHistory,
  'delta-rescrutiny': ROUTES.department.applicationDeltaRescrutiny,
  'inspection-queue': ROUTES.department.applicationInspections,
};

export function departmentScrutinyRoute(applicationId: string, destination: string): string {
  return (scrutinyDestinations[destination] ?? ROUTES.department.application)(applicationId);
}
