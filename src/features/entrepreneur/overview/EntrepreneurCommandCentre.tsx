import Link from 'next/link'
import type { ReactNode } from 'react'
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur'
import { listInspectionsForBusiness, listTrackerAppsForBusiness, type TrackerApp } from '../applications/data'
import type { BusinessProject } from '../businesses/catalog'
import { listRegulatoryChangesForBusiness, type RegulatoryChangeImpact, type RegulatoryChangeVerification } from '../changes/ChangeScreens'
import { listComplianceForBusiness } from '../compliance/data'
import { listDocumentsForBusiness } from '../documents/data'
import { listGrievancesForBusiness } from '../grievances/data'
import { listJourneyNodesForBusiness } from '../journey/data'
import { Icon } from '../public-auth/PublicChrome'

type OverviewAction = {
  id: string
  title: string
  detail: string
  label: string
  href: string
  urgent: boolean
  icon: ReactNode
}

type OverviewItem = {
  id: string
  title: string
  detail: string
  meta?: string
  href: string
}

function SectionHeader({ title, count, href, linkLabel }: {
  title: string
  count?: number
  href?: string
  linkLabel?: string
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-3.5">
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#355E3B]">{title}</h2>
        {typeof count === 'number' ? (
          <span className="rounded-full bg-[#edf5ef] px-2 py-0.5 text-[11px] font-bold text-[#555C56]">{count}</span>
        ) : null}
      </div>
      {href && linkLabel ? (
        <Link href={href} className="text-xs font-semibold text-[#3d7a4d] hover:underline">{linkLabel}</Link>
      ) : null}
    </div>
  )
}

function EmptyState({ children }: { children: ReactNode }) {
  return <p className="px-5 py-7 text-sm text-[#555C56]">{children}</p>
}

function ApplicationStatus({ application }: { application: TrackerApp }) {
  const classes: Record<TrackerApp['statusType'], string> = {
    active: 'border-[#B8D5E5] bg-[#edf5ef] text-[#355E3B]',
    action: 'border-[#F8D4B0] bg-[#FDF4EB] text-[#C46A15]',
    approved: 'border-[#B8E3CA] bg-[#EBF7F0] text-[#2F7D4F]',
    waiting: 'border-[#D9DFE5] bg-[#F1F3F5] text-[#555C56]',
    'over-sla': 'border-[#F8C4C4] bg-[#FDF2F2] text-[#9B2C2C]',
  }
  return <span className={`rounded border px-2 py-0.5 text-[11px] font-semibold ${classes[application.statusType]}`}>{application.status}</span>
}

function RegulatoryBadge({ value }: { value: RegulatoryChangeVerification | RegulatoryChangeImpact }) {
  const classes: Record<RegulatoryChangeVerification | RegulatoryChangeImpact, string> = {
    Validated: 'border-[#B8E3CA] bg-[#EBF7F0] text-[#2F7D4F]',
    'Needs Verification': 'border-[#F8D4B0] bg-[#FDF4EB] text-[#C46A15]',
    'Under Review': 'border-[#B8D5E5] bg-[#edf5ef] text-[#355E3B]',
    'No action': 'border-[#D9DFE5] bg-[#F1F3F5] text-[#555C56]',
    'Review recommended': 'border-[#F8D4B0] bg-[#FDF4EB] text-[#C46A15]',
    'New document': 'border-[#F8D4B0] bg-[#FDF4EB] text-[#C46A15]',
    'Application affected': 'border-[#F8C4C4] bg-[#FDF2F2] text-[#9B2C2C]',
    'Renewal affected': 'border-[#F8D4B0] bg-[#FDF4EB] text-[#C46A15]',
    'Compliance affected': 'border-[#F8C4C4] bg-[#FDF2F2] text-[#9B2C2C]',
    'New requirement potentially triggered': 'border-[#B8D5E5] bg-[#edf5ef] text-[#355E3B]',
  }
  return <span className={`rounded border px-1.5 py-0.5 text-[10px] font-semibold ${classes[value]}`}>{value}</span>
}

export function EntrepreneurCommandCentre({ project }: { project: BusinessProject }) {
  const applications = listTrackerAppsForBusiness(project.id)
  const compliance = listComplianceForBusiness(project.id)
  const inspections = listInspectionsForBusiness(project.id)
  const grievances = listGrievancesForBusiness(project.id)
  const documents = listDocumentsForBusiness(project.id)
  const journeyNodes = listJourneyNodesForBusiness(project.id, false)
  const relevantChanges = listRegulatoryChangesForBusiness(project.id).filter(change => change.impactCategory !== 'No action')
  const missingDocuments = documents.filter(document => document.availability === 'Missing')
  const scheduledInspections = inspections.filter(inspection => inspection.status === 'Scheduled')

  const actions: OverviewAction[] = [
    ...applications.flatMap(application => application.actionRequired ? [{
      id: `application-${application.appId}`,
      title: application.actionRequired,
      detail: `${application.dept} · ${application.service} · ${application.appId}`,
      label: application.statusType === 'action' ? 'Respond now' : 'Review action',
      href: ENTREPRENEUR_ROUTES.application(project.id, application.appId),
      urgent: application.statusType === 'action' || application.statusType === 'over-sla',
      icon: <Icon.AlertCircle />,
    }] : []),
    ...compliance.flatMap(obligation => obligation.actionRequired ? [{
      id: `compliance-${obligation.id}`,
      title: obligation.actionRequired,
      detail: `${obligation.dept} · Due ${obligation.dueDate}`,
      label: 'Complete action',
      href: ENTREPRENEUR_ROUTES.complianceDetail(project.id, obligation.id),
      urgent: obligation.status === 'Action Required' || obligation.status === 'Overdue',
      icon: <Icon.Warning />,
    }] : []),
    ...scheduledInspections.flatMap(inspection => inspection.actionRequired ? [{
      id: `inspection-${inspection.id}`,
      title: inspection.actionRequired,
      detail: `${inspection.type} · ${inspection.date}, ${inspection.time}`,
      label: 'Prepare now',
      href: ENTREPRENEUR_ROUTES.inspection(project.id, inspection.id),
      urgent: false,
      icon: <Icon.ClipboardList />,
    }] : []),
    ...missingDocuments.slice(0, 2).map(document => ({
      id: `document-${document.id}`,
      title: `${document.name} is missing`,
      detail: `${document.category} · ${document.requirement}`,
      label: 'Provide document',
      href: ENTREPRENEUR_ROUTES.document(project.id, document.id),
      urgent: document.requirement === 'Required',
      icon: <Icon.Upload />,
    })),
  ]

  const inProgress = applications.filter(application => application.statusType !== 'approved' && !application.actionRequired)

  const upcoming: OverviewItem[] = [
    ...scheduledInspections.filter(inspection => !inspection.actionRequired).map(inspection => ({
      id: `inspection-${inspection.id}`,
      title: inspection.type,
      detail: `${inspection.date} · ${inspection.time}`,
      meta: 'Inspection',
      href: ENTREPRENEUR_ROUTES.inspection(project.id, inspection.id),
    })),
    ...compliance.filter(obligation => ['Due Soon', 'Under Verification'].includes(obligation.status)).map(obligation => ({
      id: `compliance-${obligation.id}`,
      title: obligation.name,
      detail: `Due ${obligation.dueDate}`,
      meta: obligation.category === 'Renewals' ? 'Renewal' : 'Compliance',
      href: ENTREPRENEUR_ROUTES.complianceDetail(project.id, obligation.id),
    })),
    ...journeyNodes.filter(node => node.displayState === 'ready').slice(0, 3).map(node => ({
      id: `requirement-${node.id}`,
      title: node.service,
      detail: `${node.department} · Ready to start`,
      meta: 'Application',
      href: ENTREPRENEUR_ROUTES.requirement(project.id, node.id),
    })),
  ].slice(0, 6)

  const recentActivity: OverviewItem[] = [
    ...applications.filter(application => application.statusType === 'approved').map(application => ({
      id: `application-${application.appId}`,
      title: `${application.service} — ${application.status}`,
      detail: `${application.dept} · ${application.sla}`,
      href: ENTREPRENEUR_ROUTES.application(project.id, application.appId),
    })),
    ...inspections.filter(inspection => inspection.status === 'Resolved').map(inspection => ({
      id: `inspection-${inspection.id}`,
      title: `${inspection.type} — ${inspection.status}`,
      detail: `${inspection.date} · ${inspection.departments.join(', ')}`,
      href: ENTREPRENEUR_ROUTES.inspection(project.id, inspection.id),
    })),
    ...grievances.filter(grievance => grievance.status === 'Resolved').map(grievance => ({
      id: `grievance-${grievance.id}`,
      title: `${grievance.id} — ${grievance.status}`,
      detail: `Raised ${grievance.raisedDate} · ${grievance.service}`,
      href: ENTREPRENEUR_ROUTES.grievances(project.id, { grievanceId: grievance.id }),
    })),
  ].slice(0, 5)

  return (
    <main id="main-content" data-testid="e00-command-centre" className="min-h-full flex-1 bg-[#F9FAF2]" tabIndex={-1}>
      <header className="border-b border-slate-200 bg-white" aria-label="Business and project overview header">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6">
          <div>
            <h1 className="text-xl font-bold text-[#355E3B]">Overview</h1>
            <p className="mt-1 text-sm text-[#555C56]">See what needs attention, what is being processed and what comes next.</p>
          </div>
          <div className="flex items-center gap-2" aria-label="Current business status">
            <span className="rounded-md border border-slate-200 bg-[#F9FAF2] px-2.5 py-1 text-xs font-semibold text-[#2B2B2B]">{project.stage}</span>
            <span className="rounded-md border border-slate-200 bg-[#F9FAF2] px-2.5 py-1 text-xs font-semibold text-[#2B2B2B]">{project.journeyState}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1180px] space-y-5 px-4 py-6 sm:px-6">
        <section id="action-required" className="overflow-hidden rounded-xl border border-[#F8D4B0] bg-white shadow-xs" aria-labelledby="overview-actions-heading">
          <div className="flex items-center gap-2 border-b border-[#F8D4B0] bg-[#FDF4EB] px-5 py-3.5">
            <span className="h-2 w-2 rounded-full bg-[#D4A017]" aria-hidden="true" />
            <h2 id="overview-actions-heading" className="text-sm font-bold uppercase tracking-wider text-[#9A4F0C]">Action Required</h2>
            <span className="rounded-full bg-[#D4A017] px-2 py-0.5 text-[11px] font-bold text-white">{actions.length}</span>
          </div>
          {actions.length ? (
            <div className="divide-y divide-slate-100">
              {actions.slice(0, 5).map((action, index) => (
                <div key={action.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className={`mt-0.5 shrink-0 ${action.urgent ? 'text-[#C46A15]' : 'text-[#555C56]'}`}>{action.icon}</span>
                    <div>
                      <p className="text-sm font-bold leading-snug text-[#2B2B2B]">{action.title}</p>
                      <p className="mt-1 text-xs text-[#555C56]">{action.detail}</p>
                    </div>
                  </div>
                  <Link href={action.href} className={`shrink-0 rounded px-4 py-2 text-center text-sm font-semibold transition-colors ${index === 0 ? 'bg-[#355E3B] text-white hover:bg-[#27472c]' : 'border border-[#B8C6D4] bg-white text-[#355E3B] hover:bg-[#edf5ef]'}`}>
                    {action.label}
                  </Link>
                </div>
              ))}
              {actions.length > 5 ? <p className="px-5 py-3 text-xs text-[#555C56]">{actions.length - 5} more items require attention in their relevant sections.</p> : null}
            </div>
          ) : <EmptyState>No action is required from you right now.</EmptyState>}
        </section>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs" aria-label="In Progress">
            <SectionHeader title="In Progress" count={inProgress.length} href={ENTREPRENEUR_ROUTES.applications(project.id)} linkLabel="Applications" />
            {inProgress.length ? (
              <div className="divide-y divide-slate-100">
                {inProgress.map(application => (
                  <Link key={application.appId} href={ENTREPRENEUR_ROUTES.application(project.id, application.appId)} className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-[#F5F8FB]">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#2B2B2B]">{application.service}</p>
                      <p className="mt-1 text-xs text-[#555C56]">{application.dept} · {application.currentDesk} · {application.appId}</p>
                    </div>
                    <ApplicationStatus application={application} />
                  </Link>
                ))}
              </div>
            ) : <EmptyState>No applications or approvals are currently being processed without an action from you.</EmptyState>}
          </section>

          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs" aria-label="Upcoming">
            <SectionHeader title="Upcoming" count={upcoming.length} href={ENTREPRENEUR_ROUTES.inspections(project.id)} linkLabel="Inspections" />
            {upcoming.length ? (
              <div className="divide-y divide-slate-100">
                {upcoming.map(item => (
                  <Link key={item.id} href={item.href} className="block px-5 py-4 transition-colors hover:bg-[#F5F8FB]">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-bold leading-snug text-[#2B2B2B]">{item.title}</p>
                      {item.meta ? <span className="shrink-0 rounded border border-slate-200 bg-[#F9FAF2] px-1.5 py-0.5 text-[10px] font-bold text-[#555C56]">{item.meta}</span> : null}
                    </div>
                    <p className="mt-1 text-xs text-[#555C56]">{item.detail}</p>
                  </Link>
                ))}
              </div>
            ) : <EmptyState>No inspections, renewals or applications are currently scheduled.</EmptyState>}
          </section>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs" aria-label="Recent Activity">
            <SectionHeader title="Recent Activity" count={recentActivity.length} />
            {recentActivity.length ? (
              <div className="divide-y divide-slate-100">
                {recentActivity.map(item => (
                  <Link key={item.id} href={item.href} className="block px-5 py-4 transition-colors hover:bg-[#F5F8FB]">
                    <p className="text-sm font-semibold text-[#2B2B2B]">{item.title}</p>
                    <p className="mt-1 text-xs text-[#555C56]">{item.detail}</p>
                  </Link>
                ))}
              </div>
            ) : <EmptyState>No recent government or application events are recorded.</EmptyState>}
          </section>

          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs" aria-label="Regulatory Changes">
            <SectionHeader title="Regulatory Changes" count={relevantChanges.length} href={ENTREPRENEUR_ROUTES.regulatoryChanges(project.id)} linkLabel="Changes & Expansion" />
            {relevantChanges.length ? (
              <div className="divide-y divide-slate-100">
                {relevantChanges.slice(0, 4).map(change => (
                  <Link key={change.id} href={ENTREPRENEUR_ROUTES.regulatoryChanges(project.id)} className="block px-5 py-4 transition-colors hover:bg-[#F5F8FB]">
                    <p className="text-sm font-bold leading-snug text-[#2B2B2B]">{change.title}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <RegulatoryBadge value={change.verification} />
                      <RegulatoryBadge value={change.impactCategory} />
                    </div>
                    <p className="mt-2 text-xs text-[#555C56]">Effective {change.effectiveDate} · {change.department}</p>
                  </Link>
                ))}
              </div>
            ) : <EmptyState>No regulatory changes currently affect this business.</EmptyState>}
          </section>
        </div>
      </div>
    </main>
  )
}
