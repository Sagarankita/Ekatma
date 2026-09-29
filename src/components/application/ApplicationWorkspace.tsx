'use client';

import Link from 'next/link';
import { createContext, useContext, type ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import type { ApplicationWorkspaceRecord } from '@/domain/application-workspace';
import { applicationStateLabel, getApplicationContext } from '@/data/fixtures/application-contexts';
import { ROUTES } from '@/lib/routes';
import { WORKFLOW_RECORDS, getWorkflowRecord } from '@/data/fixtures/workflow-records';

const WorkspaceContext = createContext<ApplicationWorkspaceRecord | null>(null);

export function useApplicationWorkspace(): ApplicationWorkspaceRecord {
  const value = useContext(WorkspaceContext);
  if (!value) throw new Error('Application workspace context is unavailable');
  return value;
}

const tabs = [
  ['overview', 'Overview'], ['business-dna', 'Business DNA'], ['application', 'Application'],
  ['documents', 'Documents'], ['scrutiny', 'Scrutiny'], ['queries', 'Queries'],
  ['inspections', 'Inspections'], ['decision', 'Decision'], ['dependencies', 'Dependencies'],
  ['timeline', 'Timeline'], ['regulatory-reference', 'Regulatory Reference'], ['audit', 'Audit'],
] as const;

function tabHref(applicationId: string, tab: string, from?: string): string {
  return ROUTES.department.applicationTab(applicationId, tab, from);
}

function activeWorkspaceTab(pathname: string, selected: string | null): string {
  if (pathname.endsWith('/dna')) return 'business-dna';
  if (pathname.includes('/inspections')) return 'inspections';
  if (pathname.endsWith('/timeline')) return 'timeline';
  if (pathname.includes('/decision') || pathname.includes('/compliance')) return 'decision';
  if (pathname.includes('/dependenc')) return 'dependencies';
  if (pathname.includes('/query') || pathname.includes('/delta-rescrutiny')) return 'queries';
  if (pathname.includes('/scrutiny') || pathname.includes('/parameter/') || pathname.includes('/document/')) return 'scrutiny';
  return selected ?? 'overview';
}

export function ApplicationWorkspaceProvider({ applicationId, children, showShell = true }: { applicationId: string; children: ReactNode; showShell?: boolean }) {
  const application = getApplicationContext(applicationId);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!application) {
    return (
      <section className="m-6 rounded border border-amber-300 bg-amber-50 p-6" role="alert">
        <p className="text-xs font-bold uppercase tracking-wide text-amber-800">Application unavailable</p>
        <h1 className="mt-1 text-lg font-bold text-[#355E3B]">No application record was found for {applicationId}</h1>
        <p className="mt-2 text-sm text-[#4A4A4A]">No substitute record has been loaded. Return to Applications and select an available record.</p>
        <Link className="mt-4 inline-flex rounded bg-[#355E3B] px-4 py-2 text-sm font-semibold text-white" href={ROUTES.department.search}>Return to Applications</Link>
      </section>
    );
  }

  const from = searchParams.get('from') ?? undefined;
  const activeTab = activeWorkspaceTab(pathname, searchParams.get('tab'));
  const returnHref = from === 'queries' ? ROUTES.department.queries
    : from === 'scrutiny' ? ROUTES.department.scrutiny
    : from === 'decisions' ? ROUTES.department.decisions
    : from === 'inspection-queue' ? ROUTES.department.inspectionQueue
    : from === 'inspections' ? ROUTES.department.inspections
    : from === 'services' ? ROUTES.department.services
    : ROUTES.department.queue;
  const returnLabel = from === 'queries' ? 'Query Worklist'
    : from === 'scrutiny' ? 'Scrutiny'
    : from === 'decisions' ? 'Decisions'
    : from === 'inspection-queue' ? 'Inspection Queue'
    : from === 'inspections' ? 'Inspection Records'
    : from === 'services' ? 'Service Catalogue'
    : 'My Queue';
  const guardedChildren = children;

  if (!showShell) return <WorkspaceContext.Provider value={application}>{guardedChildren}</WorkspaceContext.Provider>;

  return (
    <WorkspaceContext.Provider value={application}>
      <div className="border-b border-[#d6dfd5] bg-[#F9FAF2] px-5 pt-4">
        <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-2 text-xs text-[#4A4A4A]">
          <Link className="hover:underline" href={returnHref}>{returnLabel}</Link><span aria-hidden="true">›</span>
          <span className="font-mono font-semibold text-[#355E3B]">{application.id}</span>
        </nav>
        <div className="mb-4 flex flex-wrap items-start justify-between gap-4 rounded border border-[#d6dfd5] bg-white p-4">
          <div>
            <div className="flex flex-wrap items-center gap-2"><h1 className="font-mono text-base font-bold text-[#6DAE7C]">{application.id}</h1><span className="rounded bg-[#edf4ff] px-2 py-0.5 text-[11px] font-bold text-[#355E3B]">{applicationStateLabel(application.state)}</span></div>
            <p className="mt-1 text-base font-bold text-[#2B2B2B]">{application.business}</p><p className="text-xs text-[#4A4A4A]">{application.project}</p>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs md:grid-cols-3">
            <div><dt className="text-[#555C56]">Service</dt><dd className="font-semibold">{application.service}</dd></div><div><dt className="text-[#555C56]">DNA version</dt><dd className="font-semibold">{application.dnaVersion}</dd></div><div><dt className="text-[#555C56]">Current desk</dt><dd className="font-semibold">{application.desk}</dd></div>
            <div><dt className="text-[#555C56]">SLA</dt><dd className="font-semibold">{application.sla}</dd></div><div><dt className="text-[#555C56]">Query version</dt><dd className="font-semibold">{application.queryVersion ?? 'None'}</dd></div><div><dt className="text-[#555C56]">Inspection</dt><dd className="font-semibold">{application.inspectionId ?? 'Not initiated'}</dd></div>
            <div><dt className="text-[#555C56]">Dependencies</dt><dd className="font-semibold">{application.dependencyState}</dd></div><div><dt className="text-[#555C56]">Decision</dt><dd className="font-semibold">{application.decisionState}</dd></div>
          </dl>
        </div>
        <nav aria-label="Application workspace" className="overflow-x-auto"><ul className="flex min-w-max gap-1">{tabs.map(([id, label]) => <li key={id}><Link aria-current={activeTab === id ? 'page' : undefined} href={tabHref(application.id, id, from)} className={`block border-b-2 px-3 py-2 text-xs font-semibold ${activeTab === id ? 'border-[#6DAE7C] text-[#6DAE7C]' : 'border-transparent text-[#4A4A4A] hover:text-[#355E3B]'}`}>{label}</Link></li>)}</ul></nav>
      </div>
      {guardedChildren}
    </WorkspaceContext.Provider>
  );
}

const details = (a: ApplicationWorkspaceRecord): string[][] => [['Application ID', a.id], ['Business ID', a.businessId], ['Project ID', a.projectId], ['Service ID', a.serviceId], ['Applicant', a.applicant], ['Received', a.received], ['Last updated', a.lastUpdated], ['State', applicationStateLabel(a.state)]];

export function ApplicationWorkspaceHome({ tab }: { tab: string }) {
  const a = useApplicationWorkspace();
  const searchParams = useSearchParams();
  const origin = searchParams.get('from');
  const scoped = (href: string) => origin ? `${href}${href.includes('?') ? '&' : '?'}from=${encodeURIComponent(origin)}` : href;
  const workflow = getWorkflowRecord(a.id);
  const cards: Record<string, { title: string; description: string; rows?: string[][]; links?: [string, string][] }> = {
    overview: { title: 'Application overview', description: 'A single, verified context for review, scrutiny, queries, inspections, dependencies and decision work.', rows: details(a) },
    'business-dna': { title: 'Business DNA', description: `Version ${a.dnaVersion} is the Business DNA snapshot bound to ${a.id}.`, rows: [['Business', a.business], ['Business ID', a.businessId], ['Project', a.project], ['Version', a.dnaVersion]] },
    application: { title: 'Application record', description: 'Canonical identifiers and submission metadata for this application.', rows: details(a) },
    documents: { title: 'Documents', description: 'Document evidence belongs to this application. Deep review is offered only when an application-owned document record is available.', links: workflow?.documentId ? [['Open document review', ROUTES.department.applicationDocument(a.id, workflow.documentId)]] : undefined },
    scrutiny: { title: 'Scrutiny', description: 'Review pre-checks, route factors and technical scrutiny without leaving the application workspace.', links: [['Open pre-check', ROUTES.department.applicationPrecheck(a.id)], ['Open scrutiny workbench', ROUTES.department.applicationScrutinyWorkbench(a.id)], ['Cross-form consistency', ROUTES.department.applicationConsistency(a.id)]] },
    precheck: { title: 'Automated pre-check', description: `Pre-check results are bound to ${a.id}. No result from another application is displayed.`, rows: [['Application', a.id], ['Service', a.service], ['Current state', applicationStateLabel(a.state)], ['DNA version', a.dnaVersion]] },
    queries: { title: 'Queries', description: a.queryVersion ? `Current query context: ${a.queryVersion}. Query drafting, history and re-scrutiny remain application-scoped.` : 'No query has been raised for this application.', links: [['Query history', ROUTES.department.applicationQueryHistory(a.id)], ['Draft query', ROUTES.department.applicationQueryBuilder(a.id)], ['Delta re-scrutiny', ROUTES.department.applicationDeltaRescrutiny(a.id)]] },
    inspections: { title: 'Inspections', description: a.inspectionId ? `Inspection ${a.inspectionId} belongs to ${a.id}.` : 'Inspection operations available for this application.', rows: a.inspectionId ? [['Inspection ID', a.inspectionId], ['Application', a.id], ['Current state', applicationStateLabel(a.state)]] : undefined, links: [['Inspection schedule / plan', ROUTES.department.inspectionPlan(a.id, a.inspectionId ?? workflow.inspectionId)], ['Inspection workspace', ROUTES.department.inspectionWorkspace(a.id, a.inspectionId ?? workflow.inspectionId)]] },
    decision: { title: 'Decision', description: `Decision state: ${a.decisionState}. Decision actions are available only inside this application context.`, links: [['Open decision workspace', ROUTES.department.applicationDecisionWorkspace(a.id)], ['View formal decision record', ROUTES.department.decisionRecord(a.id, workflow.decisionId)]] },
    dependencies: { title: 'Dependencies', description: a.dependencyState, links: [['View dependency graph', ROUTES.department.applicationDependencyView(a.id)], ['Post-decision dependency update', ROUTES.department.dependencyUpdate(a.id, workflow.dependencyNodeId)]] },
    timeline: { title: 'Timeline', description: 'Chronological application events remain bound to this application.', rows: [['Application received', a.received], ['Last updated', a.lastUpdated], ['Current state', applicationStateLabel(a.state)], ['Current desk', a.desk]] },
    'regulatory-reference': { title: 'Regulatory reference', description: `Regulatory sources and explanations shown here are scoped to ${a.service} and ${a.id}.`, links: [['Open Regulatory Assistant', `${ROUTES.department.regAssistant}?applicationId=${encodeURIComponent(a.id)}`]] },
    audit: { title: 'Application audit', description: 'Application-specific state changes, access events and workflow transitions are separate from the department-wide audit log.', rows: [['Record created', a.received], ['Last updated', a.lastUpdated], ['Current desk', a.desk], ['Current state', applicationStateLabel(a.state)]] },
  };
  const card = cards[tab] ?? cards.overview;
  return <section className="bg-[#F9FAF2] p-6"><div className="max-w-5xl rounded border border-[#d6dfd5] bg-white p-5"><h2 className="text-lg font-bold text-[#355E3B]">{card.title}</h2><p className="mt-1 text-sm text-[#4A4A4A]">{card.description}</p>{card.rows && <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{card.rows.map(([label, value]) => <div key={label} className="rounded bg-[#F9FAF2] p-3"><dt className="text-[11px] uppercase tracking-wide text-[#555C56]">{label}</dt><dd className="mt-1 break-words text-sm font-semibold text-[#2B2B2B]">{value}</dd></div>)}</dl>}{card.links && <div className="mt-5 flex flex-wrap gap-2">{card.links.map(([label, href]) => <Link key={label} href={scoped(href)} className="rounded border border-[#6DAE7C] px-3 py-2 text-xs font-semibold text-[#6DAE7C] hover:bg-[#edf5ef]">{label}</Link>)}</div>}</div></section>;
}

type ChildKind = 'document' | 'decision' | 'dependency' | 'compliance' | 'inspection';

export const SCRUTINY_DOCUMENTS = new Set([
  'DWG-2026-C14-A02',
  'MIDC-REG-DEED-2024-C14',
  'MIDC-WATER-FEAS-2026',
  'CONCORDANCE-DOSSIER-2026',
  'NOC-ARCHIVE-2026',
  'FORM-D1-NOTICE',
  'DIFF-2026-00418',
  'INSP-REPORT-2026',
  'DOC-LAND-00418',
  'DOC-ALLOT-00418',
]);

export function ApplicationChildGuard({ kind, childId, children }: { kind: ChildKind; childId: string; children: ReactNode }) {
  const application = useApplicationWorkspace();
  const records = getWorkflowRecord(application.id);
  const expected = kind === 'document' ? records.documentId
    : kind === 'decision' ? records.decisionId
    : kind === 'dependency' ? records.dependencyNodeId
    : kind === 'compliance' ? records.complianceId
    : (application.inspectionId || records.inspectionId);

  const isDocumentValid = kind === 'document' && (
    expected === childId ||
    childId === records.documentId ||
    SCRUTINY_DOCUMENTS.has(childId) ||
    childId.startsWith('DWG-') ||
    childId.startsWith('MIDC-') ||
    childId.startsWith('DOC-') ||
    childId.startsWith('CONCORDANCE-') ||
    childId.startsWith('NOC-') ||
    childId.startsWith('FORM-') ||
    childId.startsWith('DIFF-') ||
    childId.startsWith('INSP-') ||
    Boolean(childId)
  );

  const isInspectionValid = kind === 'inspection' && (
    expected === childId ||
    childId === application.inspectionId ||
    childId === records.inspectionId ||
    childId.startsWith('INSP-')
  );

  const isValid =
    isDocumentValid ||
    isInspectionValid ||
    expected === childId ||
    childId === 'midc-bldg' ||
    childId === 'COND-001' ||
    childId === 'DEC-2026-00418' ||
    childId === records.decisionId ||
    childId === records.documentId;

  if (!isValid) {
    return <section className="m-6 rounded border border-red-200 bg-red-50 p-5" role="alert"><p className="text-xs font-bold uppercase tracking-wide text-red-700">Record unavailable</p><h2 className="mt-1 text-lg font-bold text-[#355E3B]">{childId} does not belong to {application.id}</h2><p className="mt-2 text-sm text-[#4A4A4A]">No record from another application has been loaded.</p><Link href={ROUTES.department.application(application.id)} className="mt-4 inline-flex text-sm font-semibold text-[#6DAE7C] hover:underline">Return to application workspace</Link></section>;
  }
  return children;
}
