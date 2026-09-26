import type { AssistantContext, AssistantEntities, AssistantMode, AssistantOrigin, AssistantPortal } from './types';

const decode = (value?: string) => {
  if (!value) return undefined;
  try { return decodeURIComponent(value); } catch { return undefined; }
};

const compact = <T extends object>(value: T): T =>
  Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined)) as T;

function baseContext(portal: AssistantPortal, route: string): AssistantContext {
  return {
    portal, userRole: portal === 'department' ? 'Scrutiny Officer' : 'Entrepreneur', route,
    pageType: 'other', pageTitle: portal === 'department' ? 'Department workspace' : 'Entrepreneur workspace',
    label: portal === 'department' ? 'Department workspace' : 'Entrepreneur workspace',
    origin: 'circular', mode: 'page', entities: {},
  };
}

export function contextKey(context: AssistantContext): string {
  return JSON.stringify({ portal: context.portal, pageType: context.pageType, label: context.label, entities: context.entities });
}

export function globalAssistantContext(context: AssistantContext): AssistantContext {
  const entities = compact({ businessId: context.entities.businessId, applicationId: context.entities.applicationId });
  const label = context.portal === 'department' ? 'Department portal' : 'Entrepreneur portal';
  return { ...context, pageType: 'global', pageTitle: label, label, origin: 'header', mode: 'global', entities };
}

export function withTrigger(context: AssistantContext, origin: AssistantOrigin, mode: AssistantMode, presetId?: string): AssistantContext {
  if (mode === 'global') return { ...globalAssistantContext(context), origin, presetId };
  return { ...context, origin, mode, presetId };
}

function incentiveContext(segment: string | undefined, child: string | undefined, entities: AssistantEntities) {
  switch (segment) {
    case undefined:
    case 'centre': return ['incentive-centre', 'Incentive Centre'] as const;
    case 'calculator':
      if (child === 'questionnaire') return ['incentive-questionnaire', 'Incentive Questionnaire'] as const;
      if (child === 'review') return ['incentive-review', 'Review Incentive Information'] as const;
      return ['incentive-calculator', 'Incentive Calculator'] as const;
    case 'portfolio':
      if (child) { entities.incentiveId = decode(child); return ['incentive-detail', child] as const; }
      return ['incentive-portfolio', 'Incentive Portfolio'] as const;
    case 'claim-readiness': return ['claim-readiness', 'Claim Readiness'] as const;
    case 'claims':
      if (child) { entities.claimId = decode(child); return ['claim-tracker', `Claim ${child}`] as const; }
      return ['incentive-claims', 'Incentive Claims'] as const;
    case 'roi': return child === 'results' ? ['roi-results', 'Investment Outlook'] as const : ['roi-planner', 'ROI Planner'] as const;
    case 'scenarios': return ['incentive-scenarios', 'Incentive Scenarios'] as const;
    case 'policy-updates': return ['policy-updates', 'Incentive Policy Updates'] as const;
    default: entities.incentiveId = decode(segment); return ['incentive-detail', segment] as const;
  }
}

export function entrepreneurPageContext(pathname: string, businessName?: string): AssistantContext {
  const context = baseContext('entrepreneur', pathname);
  const parts = pathname.split('/').filter(Boolean);
  const businessIndex = parts.indexOf('businesses');
  const candidateBusinessId = businessIndex >= 0 ? decode(parts[businessIndex + 1]) : undefined;
  const businessId = candidateBusinessId && candidateBusinessId !== 'new' ? candidateBusinessId : undefined;
  const entities: AssistantEntities = compact({ businessId });
  const suffix = businessIndex >= 0 ? parts.slice(businessIndex + 2) : [];
  let pageType = businessId ? 'dashboard' : 'businesses';
  let pageTitle = businessId ? 'Business Dashboard' : 'My Businesses';

  if (pathname === '/entrepreneur/assistant') { pageType = 'assistant-research'; pageTitle = 'Regulatory Assistant'; }
  else if (suffix[0] === 'journey') { pageType = 'regulatory-journey'; pageTitle = 'Regulatory Journey'; }
  else if (suffix[0] === 'requirements') { pageType = 'requirement-detail'; entities.requirementId = decode(suffix[1]); pageTitle = suffix[1] ? `Requirement ${decode(suffix[1])}` : 'Requirement Detail'; }
  else if (suffix[0] === 'documents' && suffix[1]) { pageType = 'document-detail'; entities.documentId = decode(suffix[1]); pageTitle = `Document ${decode(suffix[1])}`; }
  else if (suffix[0] === 'documents') { pageType = 'documents'; pageTitle = 'Document Centre'; }
  else if (suffix[0] === 'applications') {
    const applicationId = suffix[1] && suffix[1] !== 'new' ? decode(suffix[1]) : undefined;
    if (applicationId) { entities.applicationId = applicationId; pageType = 'application-detail'; pageTitle = `Application ${applicationId}`; }
    else if (suffix[1] === 'new') { pageType = 'application-workspace'; pageTitle = 'Application Workspace'; }
    else { pageType = 'applications'; pageTitle = 'Applications'; }
  }
  else if (suffix[0] === 'compliance') { entities.complianceId = decode(suffix[1]); pageType = suffix[1] ? 'compliance-detail' : 'compliance'; pageTitle = suffix[1] ? `Compliance ${decode(suffix[1])}` : 'Compliance'; }
  else if (suffix[0] === 'regulatory-changes') { pageType = 'regulatory-changes'; pageTitle = 'Regulatory Changes'; }
  else if (suffix[0] === 'incentives') [pageType, pageTitle] = incentiveContext(suffix[1], suffix[2], entities);
  else if (suffix[0] === 'incentive-claims') { pageType = 'incentive-claims'; pageTitle = 'Incentive Claims'; }
  else if (suffix[0] === 'inspections') { entities.inspectionId = decode(suffix[1]); pageType = 'inspection'; pageTitle = suffix[1] ? `Inspection ${decode(suffix[1])}` : 'Inspections'; }

  return { ...context, pageType, pageTitle, label: pageTitle, entities: compact(entities), safeMetadata: businessName ? { businessName } : undefined };
}

export function departmentPageContext(pathname: string): AssistantContext {
  const context = baseContext('department', pathname);
  const parts = pathname.split('/').filter(Boolean);
  const appIndex = parts.indexOf('applications');
  const applicationId = appIndex >= 0 ? decode(parts[appIndex + 1]) : undefined;
  const entities: AssistantEntities = compact({ applicationId });
  let pageType = pathname === '/department' ? 'dashboard' : 'other';
  let pageTitle = pathname === '/department' ? 'Department Dashboard' : 'Department workspace';

  if (pathname === '/department/regasst') { pageType = 'assistant-research'; pageTitle = 'Officer Regulatory Assistant'; }
  else if (pathname === '/department/regchng' || pathname.startsWith('/department/regchng/')) { pageType = 'regulatory-changes'; pageTitle = 'Regulatory Changes'; }
  else if (pathname === '/department/scrutiny') { pageType = 'scrutiny'; pageTitle = 'Scrutiny Queue'; }
  else if (pathname === '/department/inspections' || pathname === '/department/inspection-queue') { pageType = 'inspection'; pageTitle = 'Inspection Queue'; }
  else if (pathname === '/department/decisions') { pageType = 'decision'; pageTitle = 'Decisions'; }
  else if (applicationId) {
    pageType = 'application-detail'; pageTitle = `Application ${applicationId}`;
    const suffix = parts.slice(appIndex + 2);
    if (suffix[0] === 'scrutiny-workbench' || suffix[0] === 'scrutiny-workflow') { pageType = 'scrutiny'; pageTitle = 'Scrutiny Workbench'; }
    else if (suffix[0] === 'parameter') { pageType = 'parameter-detail'; pageTitle = 'Parameter Detail'; entities.parameterId = decode(suffix[1]); }
    else if (suffix[0] === 'document') { pageType = 'document-detail'; pageTitle = 'Document Review'; entities.documentId = decode(suffix[1]); }
    else if (suffix[0] === 'building-scrutiny') { pageType = 'technical-scrutiny'; pageTitle = 'Building Scrutiny'; }
    else if (suffix[0] === 'water-scrutiny') { pageType = 'technical-scrutiny'; pageTitle = 'Water Scrutiny'; }
    else if (suffix[0] === 'inspections') { pageType = 'inspection'; pageTitle = 'Inspection'; entities.inspectionId = decode(suffix[1]); }
    else if (suffix[0] === 'decision-workspace') { pageType = 'decision'; pageTitle = 'Decision Workspace'; }
    else if (suffix[0] === 'decisions') { pageType = 'decision'; pageTitle = 'Decision'; entities.decisionId = decode(suffix[1]); }
    else if (suffix[0] === 'dependencies') { pageType = 'dependency-detail'; pageTitle = 'Dependency Detail'; entities.dependencyNodeId = decode(suffix[1]); }
  }
  return { ...context, pageType, pageTitle, label: pageTitle, entities: compact(entities) };
}

function mergeEntityContext(base: AssistantEntities, additions: AssistantEntities): AssistantEntities {
  if (additions.businessId && base.businessId && additions.businessId !== base.businessId) return compact({ ...additions });
  if (additions.applicationId && base.applicationId && additions.applicationId !== base.applicationId) return compact({ businessId: additions.businessId ?? base.businessId, ...additions });
  return compact({ ...base, ...additions });
}

export function inlineContext(base: AssistantContext, options: {
  pageType?: string; pageTitle?: string; label?: string; entities?: AssistantEntities;
  recordTitle?: string; authority?: string; status?: string; presetId?: string;
}): AssistantContext {
  return {
    ...base, origin: 'inline', mode: 'entity', presetId: options.presetId,
    pageType: options.pageType ?? base.pageType,
    pageTitle: options.pageTitle ?? base.pageTitle,
    label: options.label ?? options.pageTitle ?? base.label,
    entities: mergeEntityContext(base.entities, options.entities ?? {}),
    safeMetadata: compact({ ...base.safeMetadata, recordTitle: options.recordTitle, authority: options.authority, status: options.status }),
  };
}

export function enrichAssistantContext(context: AssistantContext, metadata: AssistantContext['safeMetadata'], label?: string): AssistantContext {
  return {
    ...context,
    label: label ?? context.label,
    safeMetadata: compact({ ...context.safeMetadata, ...metadata }),
  };
}
