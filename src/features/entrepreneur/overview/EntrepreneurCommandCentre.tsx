import Link from 'next/link'
import type { ReactNode } from 'react'
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur'
import { listInspectionsForBusiness, listTrackerAppsForBusiness, type TrackerApp } from '../applications/data'
import type { BusinessProject } from '../businesses/catalog'
import { listRegulatoryChangesForBusiness, type RegulatoryChangeImpact, type RegulatoryChangeVerification } from '../changes/ChangeScreens'
import { listComplianceForBusiness, type ComplianceStatus } from '../compliance/data'
import { listDocumentsForBusiness } from '../documents/data'
import { listGrievancesForBusiness } from '../grievances/data'
import { listIncentivesForBusiness } from '../incentives/data'
import { journeyStateCfg, listJourneyNodesForBusiness, stageDisplayState, STAGES } from '../journey/data'
import { MOCK_NOTIFICATIONS, type AppNotification } from '../notifications/data'
import { Icon } from '../public-auth/PublicChrome'

type DashboardAction = {
  id: string
  title: string
  detail: string
  cta: string
  href: string
  urgent: boolean
  icon: ReactNode
}

type ActivityItem = {
  id: string
  text: string
  meta: string
  href: string
  dot: string
}

const stageVisuals: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  Complete: { bg: 'bg-[#EBF7F0]', text: 'text-[#2F7D4F]', border: 'border-[#B8E3CA]', dot: 'bg-[#2F7D4F]' },
  'In Progress': { bg: 'bg-[#EBF3FA]', text: 'text-[#17365D]', border: 'border-[#B8D5E5]', dot: 'bg-[#245B8A]' },
  'Action Required': { bg: 'bg-[#FDF4EB]', text: 'text-[#C46A15]', border: 'border-[#F8D4B0]', dot: 'bg-[#E68A2E]' },
  Ready: { bg: 'bg-[#EBF3FA]', text: 'text-[#17365D]', border: 'border-[#B8D5E5]', dot: 'bg-[#17365D]' },
  Waiting: { bg: 'bg-[#F1F3F5]', text: 'text-[#5C6470]', border: 'border-[#D9DFE5]', dot: 'bg-[#5C6470]' },
  Upcoming: { bg: 'bg-[#F1F3F5]', text: 'text-[#5C6470]', border: 'border-[#E2E8F0]', dot: 'bg-[#94A3B8]' },
}

function SectionHeader({ title, badge, href, actionLabel, actionAriaLabel }: {
  title: string
  badge?: ReactNode
  href?: string
  actionLabel?: string
  actionAriaLabel?: string
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-[#F8F9FA] px-4 py-3 rounded-t-xl">
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#17365D]">{title}</h2>
        {badge}
      </div>
      {href && actionLabel ? (
        <Link href={href} aria-label={actionAriaLabel} className="shrink-0 rounded border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-[#245B8A] transition-colors hover:bg-[#F0F5FA] hover:text-[#17365D]">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  )
}

function CountBadge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'danger' | 'success' }) {
  const toneClass = tone === 'danger'
    ? 'border-[#F8C4C4] bg-[#FDF2F2] text-[#9B2C2C]'
    : tone === 'success'
      ? 'border-[#B8E3CA] bg-[#EBF7F0] text-[#2F7D4F]'
      : 'border-[#D9DFE5] bg-[#F1F3F5] text-[#5C6470]'
  return <span className={`rounded border px-2 py-0.5 text-[11px] font-semibold ${toneClass}`}>{children}</span>
}

function EmptyState({ children }: { children: ReactNode }) {
  return <p className="px-4 py-6 text-center text-xs text-[#5C6470]">{children}</p>
}

function ApplicationStatus({ application }: { application: TrackerApp }) {
  const classes: Record<TrackerApp['statusType'], string> = {
    active: 'border-[#B8D5E5] bg-[#EBF3FA] text-[#17365D]',
    action: 'border-[#F8D4B0] bg-[#FDF4EB] text-[#C46A15]',
    approved: 'border-[#B8E3CA] bg-[#EBF7F0] text-[#2F7D4F]',
    waiting: 'border-[#D9DFE5] bg-[#F1F3F5] text-[#5C6470]',
    'over-sla': 'border-[#F8C4C4] bg-[#FDF2F2] text-[#9B2C2C]',
  }
  return <span className={`rounded border px-2 py-0.5 text-[11px] font-semibold ${classes[application.statusType]}`}>{application.status}</span>
}

function ComplianceStatusBadge({ status }: { status: ComplianceStatus }) {
  const classes: Record<ComplianceStatus, string> = {
    Compliant: 'border-[#B8E3CA] bg-[#EBF7F0] text-[#2F7D4F]',
    'Due Soon': 'border-[#F8D4B0] bg-[#FDF4EB] text-[#C46A15]',
    Overdue: 'border-[#F8C4C4] bg-[#FDF2F2] text-[#9B2C2C]',
    'Action Required': 'border-[#F8C4C4] bg-[#FDF2F2] text-[#9B2C2C]',
    'Under Verification': 'border-[#B8D5E5] bg-[#EBF3FA] text-[#17365D]',
  }
  return <span className={`rounded border px-2 py-0.5 text-[11px] font-semibold ${classes[status]}`}>{status}</span>
}

function RegulatoryBadge({ value }: { value: RegulatoryChangeVerification | RegulatoryChangeImpact }) {
  const classes: Record<RegulatoryChangeVerification | RegulatoryChangeImpact, string> = {
    Validated: 'border-[#B8E3CA] bg-[#EBF7F0] text-[#2F7D4F]',
    'Needs Verification': 'border-[#F8D4B0] bg-[#FDF4EB] text-[#C46A15]',
    'Under Review': 'border-[#B8D5E5] bg-[#EBF3FA] text-[#17365D]',
    'No action': 'border-[#D9DFE5] bg-[#F1F3F5] text-[#5C6470]',
    'Review recommended': 'border-[#F8D4B0] bg-[#FDF4EB] text-[#C46A15]',
    'New document': 'border-[#F8D4B0] bg-[#FDF4EB] text-[#C46A15]',
    'Application affected': 'border-[#F8C4C4] bg-[#FDF2F2] text-[#9B2C2C]',
    'Renewal affected': 'border-[#F8D4B0] bg-[#FDF4EB] text-[#C46A15]',
    'Compliance affected': 'border-[#F8C4C4] bg-[#FDF2F2] text-[#9B2C2C]',
    'New requirement potentially triggered': 'border-[#B8D5E5] bg-[#EBF3FA] text-[#17365D]',
  }
  return <span className={`rounded border px-1.5 py-0.5 text-[10px] font-semibold ${classes[value]}`}>{value}</span>
}

function businessNotifications(applicationIds: Set<string>, grievanceIds: Set<string>): AppNotification[] {
  return MOCK_NOTIFICATIONS.filter(notification => (
    (notification.applicationId && applicationIds.has(notification.applicationId)) ||
    (notification.grievanceId && grievanceIds.has(notification.grievanceId))
  ))
}

function notificationHref(notification: AppNotification, businessId: string): string {
  if (notification.grievanceId) {
    return ENTREPRENEUR_ROUTES.grievances(businessId, { grievanceId: notification.grievanceId })
  }
  if (notification.type === 'sla' && notification.applicationId) {
    return ENTREPRENEUR_ROUTES.grievances(businessId, { applicationId: notification.applicationId, raise: true })
  }
  if (notification.type === 'inspection') return ENTREPRENEUR_ROUTES.inspections(businessId)
  if (notification.applicationId) return ENTREPRENEUR_ROUTES.application(businessId, notification.applicationId)
  return ENTREPRENEUR_ROUTES.notifications()
}

export function EntrepreneurCommandCentre({ project }: { project: BusinessProject }) {
  const applications = listTrackerAppsForBusiness(project.id)
  const grievances = listGrievancesForBusiness(project.id)
  const compliance = listComplianceForBusiness(project.id)
  const inspections = listInspectionsForBusiness(project.id)
  const incentives = listIncentivesForBusiness(project.id)
  const documents = listDocumentsForBusiness(project.id)
  const nodes = listJourneyNodesForBusiness(project.id, false)
  const regulatoryChanges = listRegulatoryChangesForBusiness(project.id)
  const notifications = businessNotifications(
    new Set(applications.map(application => application.appId)),
    new Set(grievances.map(grievance => grievance.id)),
  )

  const applicableNodes = nodes.filter(node => node.applicability !== 'not-applicable')
  const approvedRequirements = applicableNodes.filter(node => node.displayState === 'approved').length
  const inProgressRequirements = applicableNodes.filter(node => ['in-progress', 'under-review', 'inspection-scheduled'].includes(node.displayState)).length
  const stageStates = STAGES.map(stage => ({ ...stage, state: stageDisplayState(nodes, stage.key) }))
  const currentStageIndex = stageStates.findIndex(stage => ['In Progress', 'Action Required', 'Ready'].includes(stage.state))
  const currentStage = currentStageIndex >= 0 ? stageStates[currentStageIndex] : null
  const activeStageNodes = currentStage
    ? nodes.filter(node => node.stage === currentStage.key && node.applicability !== 'not-applicable')
    : []

  const missingDocuments = documents.filter(document => document.availability === 'Missing')
  const complianceDue = compliance.filter(obligation => obligation.status !== 'Compliant')
  const scheduledInspections = inspections.filter(inspection => inspection.status === 'Scheduled')
  const eligibleIncentives = incentives.filter(scheme => scheme.eligState === 'Appears eligible from available data')
  const incentivesToVerify = incentives.filter(scheme => scheme.eligState === 'Needs Verification')

  const actions: DashboardAction[] = [
    ...applications.flatMap(application => application.actionRequired ? [{
      id: `application-${application.appId}`,
      title: application.actionRequired,
      detail: `${application.dept} · ${application.service} · ${application.appId}`,
      cta: 'View Application',
      href: ENTREPRENEUR_ROUTES.application(project.id, application.appId),
      urgent: application.statusType === 'action' || application.statusType === 'over-sla',
      icon: <Icon.AlertCircle />,
    }] : []),
    ...compliance.flatMap(obligation => obligation.actionRequired ? [{
      id: `compliance-${obligation.id}`,
      title: obligation.actionRequired,
      detail: `${obligation.id} · ${obligation.dept} · Due ${obligation.dueDate}`,
      cta: 'View Compliance',
      href: ENTREPRENEUR_ROUTES.complianceDetail(project.id, obligation.id),
      urgent: obligation.status === 'Action Required' || obligation.status === 'Overdue',
      icon: <Icon.Warning />,
    }] : []),
    ...scheduledInspections.flatMap(inspection => inspection.actionRequired ? [{
      id: `inspection-${inspection.id}`,
      title: inspection.actionRequired,
      detail: `${inspection.type} · ${inspection.date}, ${inspection.time}`,
      cta: 'View Inspection',
      href: ENTREPRENEUR_ROUTES.inspection(project.id, inspection.id),
      urgent: false,
      icon: <Icon.ClipboardList />,
    }] : []),
    ...missingDocuments.slice(0, 2).map(document => ({
      id: `document-${document.id}`,
      title: `${document.name} is missing`,
      detail: `${document.category} · ${document.requirement}`,
      cta: 'View Document',
      href: ENTREPRENEUR_ROUTES.document(project.id, document.id),
      urgent: document.requirement === 'Required',
      icon: <Icon.Upload />,
    })),
  ]

  const upcoming = [
    ...scheduledInspections.map(inspection => ({
      id: `inspection-${inspection.id}`,
      title: inspection.type,
      date: `${inspection.date} · ${inspection.time}`,
      type: 'Inspection',
      href: ENTREPRENEUR_ROUTES.inspection(project.id, inspection.id),
      dot: 'bg-[#f97316]',
      text: 'text-[#c2410c]',
    })),
    ...complianceDue.map(obligation => ({
      id: `compliance-${obligation.id}`,
      title: obligation.name,
      date: obligation.dueDate,
      type: obligation.category === 'Renewals' ? 'Renewal' : 'Compliance',
      href: ENTREPRENEUR_ROUTES.complianceDetail(project.id, obligation.id),
      dot: obligation.status === 'Overdue' ? 'bg-[#ef4444]' : 'bg-[#d97706]',
      text: obligation.status === 'Overdue' ? 'text-[#b91c1c]' : 'text-[#92400e]',
    })),
  ].slice(0, 6)

  const activity: ActivityItem[] = [
    ...applications.map(application => ({
      id: `application-${application.appId}`,
      text: `${application.dept} · ${application.service} is ${application.status}`,
      meta: `${application.appId} · ${application.sla}`,
      href: ENTREPRENEUR_ROUTES.application(project.id, application.appId),
      dot: application.statusType === 'approved' ? 'bg-[#16a34a]' : application.statusType === 'action' || application.statusType === 'over-sla' ? 'bg-[#d97706]' : 'bg-[#6366f1]',
    })),
    ...inspections.map(inspection => ({
      id: `inspection-${inspection.id}`,
      text: `${inspection.type} is ${inspection.status}`,
      meta: `${inspection.date} · ${inspection.departments.join(', ')}`,
      href: ENTREPRENEUR_ROUTES.inspection(project.id, inspection.id),
      dot: inspection.status === 'Resolved' ? 'bg-[#16a34a]' : 'bg-[#f97316]',
    })),
    ...grievances.map(grievance => ({
      id: `grievance-${grievance.id}`,
      text: `${grievance.id} is ${grievance.status}`,
      meta: `Raised ${grievance.raisedDate} · ${grievance.service}`,
      href: ENTREPRENEUR_ROUTES.grievances(project.id, { grievanceId: grievance.id }),
      dot: grievance.status === 'Resolved' ? 'bg-[#16a34a]' : 'bg-[#ef4444]',
    })),
  ].slice(0, 7)

  const actionNotificationCount = notifications.filter(notification => notification.group === 'Action Required').length
  const firstActionHref = actions[0]?.href
  const firstInspection = scheduledInspections[0]
  const nextRenewal = compliance.find(obligation => obligation.category === 'Renewals' && obligation.status !== 'Compliant')

  const metrics = [
    {
      label: 'Requirements Identified',
      value: applicableNodes.length,
      sub: `${approvedRequirements} approved · ${inProgressRequirements} in progress`,
      color: 'text-[#1a3a5c]',
      href: ENTREPRENEUR_ROUTES.journey(project.id),
      ariaLabel: 'Regulatory Journey',
    },
    {
      label: 'Active Applications',
      value: applications.length,
      sub: applications.length ? `${new Set(applications.map(application => application.dept)).size} departments` : 'No bound records',
      color: 'text-[#3730a3]',
      href: ENTREPRENEUR_ROUTES.applications(project.id),
      ariaLabel: 'Applications',
    },
    {
      label: 'Actions Required',
      value: actions.length,
      sub: `${actions.filter(action => action.urgent).length} urgent`,
      color: actions.length ? 'text-[#b91c1c]' : 'text-[#94a3b8]',
      href: firstActionHref,
      ariaLabel: 'Actions Required',
    },
    {
      label: 'Upcoming Inspections',
      value: scheduledInspections.length,
      sub: firstInspection ? `${firstInspection.departments.join(', ')} · ${firstInspection.date}` : 'None scheduled',
      color: scheduledInspections.length ? 'text-[#c2410c]' : 'text-[#94a3b8]',
      href: ENTREPRENEUR_ROUTES.inspections(project.id),
      ariaLabel: 'Inspections',
    },
    {
      label: 'Upcoming Renewals',
      value: compliance.filter(obligation => obligation.category === 'Renewals' && obligation.status !== 'Compliant').length,
      sub: nextRenewal ? `${nextRenewal.dept} · ${nextRenewal.dueDate}` : 'None recorded',
      color: nextRenewal ? 'text-[#6366f1]' : 'text-[#94a3b8]',
      href: ENTREPRENEUR_ROUTES.compliance(project.id),
      ariaLabel: 'Renewals',
    },
    {
      label: 'Compliance Due',
      value: complianceDue.length,
      sub: `${compliance.filter(obligation => obligation.status === 'Action Required').length} action · ${compliance.filter(obligation => obligation.status === 'Due Soon').length} due soon`,
      color: complianceDue.length ? 'text-[#d97706]' : 'text-[#94a3b8]',
      href: ENTREPRENEUR_ROUTES.compliance(project.id),
      ariaLabel: 'Compliance',
    },
  ]

  return (
    <main id="main-content" data-testid="e00-command-centre" className="min-h-full flex-1 bg-[#F8F9FA]" tabIndex={-1}>
      <div className="border-b border-[#0F233D] bg-[#17365D]">
        <div className="mx-auto max-w-[1320px] px-4 py-5 sm:px-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#3A75A4] bg-[#245B8A] text-white shadow-xs">
                <Icon.Building />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-lg font-bold leading-tight text-white">{project.name}</h1>
                  <span className="rounded bg-[#245B8A] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white border border-[#3A75A4]">{project.stage}</span>
                  {actions.length > 0 ? <span className="rounded bg-[#9B2C2C] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">{actions.length} Actions Required</span> : null}
                </div>
                <p className="mt-0.5 text-xs text-[#B8D5E5]">{project.subtitle} · {project.location}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="text-[11px] text-[#D0E3F0]">Business ID: {project.id}</span>
                  <span className="text-[11px] text-[#D0E3F0]">Industry: {project.industry}</span>
                  <span className="text-[11px] text-[#D0E3F0]">Journey: {project.journeyState}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link href={ENTREPRENEUR_ROUTES.assistant()} className="flex items-center gap-1.5 rounded border border-[#3A75A4] bg-[#245B8A] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#1E4870]">
                <Icon.Help /> Regulatory Assistant
              </Link>
              <Link href={ENTREPRENEUR_ROUTES.notifications()} className="flex items-center gap-1.5 rounded border border-[#3A75A4] bg-[#245B8A] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#1E4870]">
                <Icon.Bell /> Notifications
                {actionNotificationCount > 0 ? <span className="rounded-full bg-[#9B2C2C] px-1.5 py-0.5 text-[10px] font-bold text-white">{actionNotificationCount}</span> : null}
              </Link>
              <Link href={ENTREPRENEUR_ROUTES.grievances(project.id)} className="flex items-center gap-1.5 rounded border border-[#3A75A4] bg-[#245B8A] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#1E4870]">
                Grievances
                {grievances.length > 0 ? <span className="rounded-full bg-[#E68A2E] px-1.5 py-0.5 text-[10px] font-bold text-white">{grievances.length}</span> : null}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1320px] space-y-6 px-4 py-6 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6" aria-label="Business overview metrics">
          {metrics.map(metric => metric.href ? (
            <Link key={metric.label} href={metric.href} aria-label={metric.ariaLabel} className="group rounded-xl border border-slate-200 bg-white p-4 text-left shadow-xs transition-all hover:border-[#245B8A] hover:shadow-md">
              <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
              <p className="mt-1 text-[12px] font-bold leading-tight text-[#20242A] group-hover:text-[#17365D]">{metric.label}</p>
              <p className="mt-1 text-[11px] leading-tight text-[#5C6470]">{metric.sub}</p>
            </Link>
          ) : (
            <div key={metric.label} className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow-xs">
              <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
              <p className="mt-1 text-[12px] font-bold leading-tight text-[#20242A]">{metric.label}</p>
              <p className="mt-1 text-[11px] leading-tight text-[#5C6470]">{metric.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-5">
            <section className="rounded-xl border border-slate-200 bg-white shadow-xs" aria-labelledby="e00-journey-heading">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-[#F8F9FA] px-4 py-3 rounded-t-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 id="e00-journey-heading" className="text-[13px] font-bold uppercase tracking-wider text-[#17365D]">Regulatory Journey</h2>
                  <CountBadge>{applicableNodes.length} requirements · {approvedRequirements} approved</CountBadge>
                </div>
                <div className="flex items-center gap-3">
                  <Link href={ENTREPRENEUR_ROUTES.dependencies(project.id)} className="text-xs font-semibold text-[#245B8A] hover:underline">Dependency graph →</Link>
                  <Link href={ENTREPRENEUR_ROUTES.journey(project.id)} className="rounded border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-[#245B8A] hover:bg-[#F0F5FA] hover:text-[#17365D]">Full Journey</Link>
                </div>
              </div>
              <div className="px-4 pb-4 pt-4">
                <div className="overflow-x-auto pb-1">
                  <div className="flex min-w-max items-stretch">
                    {stageStates.map((stage, index) => {
                      const visual = stageVisuals[stage.state] ?? stageVisuals.Upcoming
                      const stageNodes = nodes.filter(node => node.stage === stage.key && node.applicability !== 'not-applicable')
                      const stageApproved = stageNodes.filter(node => node.displayState === 'approved').length
                      return (
                        <div key={stage.key} className="flex items-center">
                          <Link href={ENTREPRENEUR_ROUTES.journey(project.id)} className={`flex min-w-[110px] flex-col items-center rounded-lg border px-4 py-3 text-center transition-all ${visual.border} ${visual.bg} ${index === currentStageIndex ? 'ring-2 ring-[#17365D]' : ''}`}>
                            <span className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${visual.text}`}><span className={`h-1.5 w-1.5 rounded-full ${visual.dot}`} />Stage {stage.num}</span>
                            <span className={`mt-1 text-[12px] font-bold ${visual.text}`}>{stage.label}</span>
                            <span className={`mt-1 text-[10px] font-medium opacity-90 ${visual.text}`}>{stage.state}</span>
                            {stageNodes.length > 0 ? <span className="mt-1 text-[10px] font-semibold text-[#5C6470]">{stageApproved}/{stageNodes.length}</span> : null}
                          </Link>
                          {index < stageStates.length - 1 ? <div className="flex shrink-0 items-center px-1"><div className="h-px w-3 bg-slate-300" /><span className="text-[10px] text-slate-400">›</span></div> : null}
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="mt-3 border-t border-slate-100 pt-3">
                  <p className="mb-2.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#5C6470]">
                    Active stage requirements
                    {currentStage ? <span className="font-mono normal-case text-[#20242A]">— {currentStage.label}</span> : null}
                  </p>
                  {activeStageNodes.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {activeStageNodes.slice(0, 4).map(node => {
                        const visual = journeyStateCfg(node.displayState)
                        return (
                          <Link key={node.id} href={ENTREPRENEUR_ROUTES.requirement(project.id, node.id)} className={`rounded-lg border p-3 text-left transition-opacity hover:opacity-90 ${visual.border} ${visual.bg}`}>
                            <p className={`truncate text-[10px] font-bold uppercase ${visual.textCls}`}>{node.department}</p>
                            <p className="mt-1 text-[12px] font-bold leading-snug text-[#20242A]">{node.service}</p>
                            {node.slaRemaining ? <p className="mt-1 text-[10px] text-[#5C6470]">{node.slaRemaining}</p> : null}
                            <span className={`mt-2 inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] font-semibold ${visual.badgeCls}`}>{visual.icon} {visual.label}</span>
                          </Link>
                        )
                      })}
                    </div>
                  ) : <p className="text-xs text-[#5C6470]">No business-scoped requirements are available for the active stage.</p>}
                </div>
              </div>
            </section>

            <section id="action-required" className="rounded-xl border border-l-4 border-slate-200 border-l-[#E68A2E] bg-white shadow-xs" aria-labelledby="e00-actions-heading">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-[#FDF4EB] px-4 py-3 rounded-t-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#E68A2E]" />
                  <h2 id="e00-actions-heading" className="text-[13px] font-bold uppercase tracking-wider text-[#C46A15]">Action Required</h2>
                  <span className="rounded-full bg-[#E68A2E] px-2 py-0.5 text-[10px] font-bold text-white">{actions.length}</span>
                  <span className="text-[11px] font-semibold text-[#C46A15]">· {actions.filter(action => action.urgent).length} urgent</span>
                </div>
                <Link href={ENTREPRENEUR_ROUTES.notifications()} className="text-xs font-semibold text-[#C46A15] hover:underline">All notifications →</Link>
              </div>
              {actions.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {actions.slice(0, 5).map(action => (
                    <div key={action.id} className={`flex items-center justify-between gap-4 px-4 py-3 ${action.urgent ? 'bg-[#FDF4EB]/40' : 'bg-white'}`}>
                      <div className="flex min-w-0 flex-1 items-start gap-3">
                        <span className={`mt-0.5 shrink-0 ${action.urgent ? 'text-[#E68A2E]' : 'text-[#5C6470]'}`}>{action.icon}</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] font-bold leading-snug text-[#20242A]">{action.title}</p>
                          <p className="mt-0.5 text-xs text-[#5C6470]">{action.detail}</p>
                        </div>
                      </div>
                      <Link href={action.href} className={`shrink-0 rounded border px-3 py-1.5 text-xs font-semibold transition-colors ${action.urgent ? 'border-[#E68A2E] bg-[#FDF4EB] text-[#C46A15] hover:bg-[#F8D4B0]' : 'border-[#245B8A] bg-white text-[#245B8A] hover:bg-[#F0F5FA]'}`}>{action.cta}</Link>
                    </div>
                  ))}
                  {actions.length > 5 ? <p className="px-4 py-2 text-[11px] text-[#5C6470]">+{actions.length - 5} more actions are available in their linked sections.</p> : null}
                </div>
              ) : <EmptyState>No action-required records are bound to this business.</EmptyState>}
            </section>

            <section className="rounded-xl border border-slate-200 bg-white shadow-xs" aria-label="Applications Across Departments">
              <SectionHeader title="Applications Across Departments" badge={<CountBadge>{applications.length} active</CountBadge>} href={ENTREPRENEUR_ROUTES.applications(project.id)} actionLabel="Application Tracker" actionAriaLabel="Open Applications" />
              {applications.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-[13px]">
                    <thead><tr className="border-b border-slate-200 bg-[#F8F9FA]">
                      {['Department', 'Service / Application', 'Current Desk', 'Status', 'SLA', 'Action'].map(heading => <th key={heading} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#17365D]">{heading}</th>)}
                    </tr></thead>
                    <tbody className="divide-y divide-slate-100">
                      {applications.map(application => (
                        <tr key={application.appId} className="transition-colors hover:bg-[#F0F5FA]">
                          <td className="whitespace-nowrap px-4 py-3.5 font-bold text-[#17365D]">{application.dept}</td>
                          <td className="px-4 py-3.5">
                            <Link href={ENTREPRENEUR_ROUTES.application(project.id, application.appId)} className="font-semibold text-[#20242A] hover:text-[#17365D] hover:underline">
                              {application.service}<span className="mt-0.5 block font-mono text-[11px] font-normal text-[#5C6470]">{application.appId}</span>
                            </Link>
                          </td>
                          <td className="max-w-[180px] px-4 py-3.5 text-[#5C6470]"><span className="line-clamp-2">{application.currentDesk}</span></td>
                          <td className="whitespace-nowrap px-4 py-3.5"><ApplicationStatus application={application} /></td>
                          <td className={`whitespace-nowrap px-4 py-3.5 font-semibold ${application.slaType === 'over' ? 'text-[#9B2C2C]' : 'text-[#5C6470]'}`}>{application.sla}</td>
                          <td className="whitespace-nowrap px-4 py-3.5"><Link href={ENTREPRENEUR_ROUTES.application(project.id, application.appId)} className="rounded border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-[#245B8A] hover:bg-[#F0F5FA]">{application.statusType === 'action' ? 'Respond' : application.statusType === 'approved' ? 'View' : 'Track'}</Link></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : <EmptyState>No application records are bound to this business.</EmptyState>}
            </section>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <section className="rounded-xl border border-slate-200 bg-white shadow-xs" aria-label="Regulatory Changes">
                <SectionHeader title="Regulatory Changes" badge={<CountBadge>{regulatoryChanges.filter(change => change.impactCategory !== 'No action').length} relevant</CountBadge>} href={ENTREPRENEUR_ROUTES.regulatoryChanges(project.id)} actionLabel="Full view →" actionAriaLabel="Open Regulatory Changes" />
                {regulatoryChanges.length > 0 ? <div className="divide-y divide-slate-100">{regulatoryChanges.map(change => (
                  <div key={change.id} className={`px-4 py-3 ${change.impactCategory === 'No action' ? 'opacity-60' : ''}`}>
                    <p className="mb-1.5 text-xs font-bold leading-snug text-[#20242A]">{change.title}</p>
                    <div className="mb-1.5 flex flex-wrap gap-1.5"><RegulatoryBadge value={change.verification} /><RegulatoryBadge value={change.impactCategory} /></div>
                    <p className="text-[11px] text-[#5C6470]">Effective {change.effectiveDate} · {change.department}</p>
                    {change.impactCategory !== 'No action' ? <Link href={ENTREPRENEUR_ROUTES.regulatoryChanges(project.id)} className="mt-1.5 inline-block text-[11px] font-semibold text-[#245B8A] hover:underline">Review impact →</Link> : null}
                  </div>
                ))}</div> : <EmptyState>No business-scoped regulatory change records are available.</EmptyState>}
              </section>

              <section className="rounded-xl border border-slate-200 bg-white shadow-xs" aria-label="Incentives">
                <SectionHeader title="Incentives" badge={<CountBadge tone="success">{eligibleIncentives.length} eligible</CountBadge>} href={ENTREPRENEUR_ROUTES.incentives(project.id)} actionLabel="Full view →" actionAriaLabel="Open Incentives" />
                <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
                  {[['Identified', incentives.length, 'text-[#17365D]'], ['Eligible', eligibleIncentives.length, 'text-[#2F7D4F]'], ['Verify', incentivesToVerify.length, 'text-[#C46A15]']].map(([label, value, color]) => (
                    <div key={String(label)} className="px-3 py-2.5 text-center"><p className={`text-lg font-bold ${color}`}>{value}</p><p className="text-[11px] font-medium text-[#5C6470]">{label}</p></div>
                  ))}
                </div>
                {incentives.length > 0 ? <div className="divide-y divide-slate-100">{incentives.map(scheme => (
                  <Link key={scheme.id} href={ENTREPRENEUR_ROUTES.incentive(project.id, scheme.id)} className="group block px-4 py-3 text-left transition-colors hover:bg-[#F0F5FA]">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1"><p className="text-xs font-bold leading-snug text-[#20242A] transition-colors group-hover:text-[#17365D]">{scheme.name}</p><p className="mt-0.5 text-[11px] text-[#5C6470]">{scheme.authority}</p></div>
                      <span className={`mt-0.5 shrink-0 rounded border px-2 py-0.5 text-[10px] font-bold ${scheme.eligState === 'Appears eligible from available data' ? 'border-[#B8E3CA] bg-[#EBF7F0] text-[#2F7D4F]' : scheme.eligState === 'Needs Verification' ? 'border-[#F8D4B0] bg-[#FDF4EB] text-[#C46A15]' : 'border-[#D9DFE5] bg-[#F1F3F5] text-[#5C6470]'}`}>{scheme.eligState === 'Appears eligible from available data' ? 'Eligible' : scheme.eligState === 'Needs Verification' ? 'Verify' : 'N/A'}</span>
                    </div>
                  </Link>
                ))}</div> : <EmptyState>No incentive records are bound to this business.</EmptyState>}
              </section>
            </div>

            <section className="rounded-xl border border-slate-200 bg-white shadow-xs" aria-label="Compliance">
              <SectionHeader title="Compliance" badge={compliance.filter(obligation => obligation.status === 'Action Required').length ? <CountBadge tone="danger">{compliance.filter(obligation => obligation.status === 'Action Required').length} action required</CountBadge> : undefined} href={ENTREPRENEUR_ROUTES.compliance(project.id)} actionLabel="Compliance Dashboard" actionAriaLabel="Open Compliance" />
              <div className="grid grid-cols-5 divide-x divide-slate-100 border-b border-slate-100">
                {[
                  ['Action Required', compliance.filter(obligation => obligation.status === 'Action Required').length, 'text-[#9B2C2C]'],
                  ['Due Soon', compliance.filter(obligation => obligation.status === 'Due Soon').length, 'text-[#C46A15]'],
                  ['Overdue', compliance.filter(obligation => obligation.status === 'Overdue').length, 'text-[#9B2C2C]'],
                  ['Under Verification', compliance.filter(obligation => obligation.status === 'Under Verification').length, 'text-[#17365D]'],
                  ['Total', compliance.length, 'text-[#20242A]'],
                ].map(([label, value, color]) => <div key={String(label)} className="px-2 py-2.5 text-center sm:px-3"><p className={`text-xl font-bold ${color}`}>{value}</p><p className="text-[10px] leading-tight text-[#5C6470] font-medium sm:text-[11px]">{label}</p></div>)}
              </div>
              {compliance.length > 0 ? <div className="overflow-x-auto">
                <table className="w-full text-[13px]"><thead><tr className="border-b border-slate-200 bg-[#F8F9FA]">{['Obligation', 'Department', 'Category', 'Due Date', 'Status', ''].map(heading => <th key={heading} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#17365D]">{heading}</th>)}</tr></thead>
                  <tbody className="divide-y divide-slate-100">{compliance.slice(0, 5).map(obligation => <tr key={obligation.id} className="transition-colors hover:bg-[#F0F5FA]">
                    <td className="px-4 py-3"><p className="max-w-[220px] truncate font-bold text-[#20242A]">{obligation.name}</p><p className="mt-0.5 font-mono text-[10px] text-[#5C6470]">{obligation.id}</p></td>
                    <td className="whitespace-nowrap px-4 py-3 text-[#5C6470]">{obligation.dept}</td><td className="whitespace-nowrap px-4 py-3 text-[#5C6470]">{obligation.category}</td>
                    <td className={`whitespace-nowrap px-4 py-3 font-semibold ${obligation.status === 'Action Required' || obligation.status === 'Overdue' ? 'text-[#9B2C2C]' : 'text-[#20242A]'}`}>{obligation.dueDate}</td>
                    <td className="whitespace-nowrap px-4 py-3"><ComplianceStatusBadge status={obligation.status} /></td>
                    <td className="whitespace-nowrap px-4 py-3"><Link href={ENTREPRENEUR_ROUTES.complianceDetail(project.id, obligation.id)} className="text-xs font-semibold text-[#245B8A] hover:underline">Detail →</Link></td>
                  </tr>)}</tbody>
                </table>
                {compliance.length > 5 ? <div className="border-t border-slate-100 px-4 py-2.5"><Link href={ENTREPRENEUR_ROUTES.compliance(project.id)} className="text-xs font-semibold text-[#245B8A] hover:underline">+{compliance.length - 5} more obligations →</Link></div> : null}
              </div> : <EmptyState>No compliance obligations are bound to this business.</EmptyState>}
            </section>
          </div>

          <aside className="min-w-0 space-y-5" aria-label="Command centre updates">
            <section className="rounded-xl border border-slate-200 bg-white shadow-xs" aria-label="Upcoming">
              <SectionHeader title="Upcoming" href={ENTREPRENEUR_ROUTES.inspections(project.id)} actionLabel="All →" actionAriaLabel="Open Inspections" />
              {upcoming.length > 0 ? <div className="divide-y divide-slate-100">{upcoming.map(item => (
                <Link key={item.id} href={item.href} className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-[#F0F5FA]">
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${item.dot}`} />
                  <div className="min-w-0 flex-1"><p className="text-xs font-bold leading-snug text-[#20242A]">{item.title}</p><div className="mt-1 flex flex-wrap items-center gap-2"><span className={`text-[11px] font-semibold ${item.text}`}>{item.date}</span><span className="rounded border border-slate-200 bg-[#F8F9FA] px-1.5 py-0.5 text-[10px] font-bold text-[#5C6470]">{item.type}</span></div></div>
                </Link>
              ))}</div> : <EmptyState>No upcoming inspections, renewals, or compliance dates are recorded.</EmptyState>}
            </section>

            <section className="rounded-xl border border-slate-200 bg-white shadow-xs" aria-label="Notifications">
              <SectionHeader title="Notifications" badge={actionNotificationCount ? <span className="rounded-full bg-[#9B2C2C] px-2 py-0.5 text-[10px] font-bold text-white">{actionNotificationCount}</span> : undefined} href={ENTREPRENEUR_ROUTES.notifications()} actionLabel="All →" />
              {notifications.length > 0 ? <div className="divide-y divide-slate-100">{notifications.slice(0, 5).map(notification => {
                const actionRequired = notification.group === 'Action Required'
                return <div key={notification.id} className={`px-4 py-3 ${actionRequired ? 'bg-[#FDF4EB]/50' : ''}`}><div className="flex items-start gap-2.5"><span className={`mt-0.5 shrink-0 ${actionRequired ? 'text-[#E68A2E]' : notification.group === 'Upcoming' ? 'text-[#245B8A]' : 'text-[#5C6470]'}`}>{actionRequired ? <Icon.AlertCircle /> : <Icon.Info />}</span><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-1"><p className="flex-1 text-xs font-bold leading-snug text-[#20242A]">{notification.title}</p>{!notification.isRead ? <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#245B8A]" /> : null}</div><p className="mt-0.5 text-[11px] text-[#5C6470]">{notification.due}</p><Link href={notificationHref(notification, project.id)} className="mt-1.5 inline-block text-xs font-semibold text-[#245B8A] hover:underline">{notification.ctaLabel} →</Link></div></div></div>
              })}</div> : <EmptyState>No business-scoped notifications are available.</EmptyState>}
              <div className="border-t border-slate-100 px-4 py-3"><Link href={ENTREPRENEUR_ROUTES.notifications()} className="text-xs font-semibold text-[#245B8A] hover:underline">View Notification Centre →</Link></div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white shadow-xs" aria-label="Recent Activity">
              <SectionHeader title="Recent Activity" />
              {activity.length > 0 ? <div className="divide-y divide-slate-100">{activity.map(item => (
                <Link key={item.id} href={item.href} className="flex items-start gap-2.5 px-4 py-3 transition-colors hover:bg-[#F0F5FA]"><span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${item.dot}`} /><div className="min-w-0 flex-1"><p className="text-xs leading-snug text-[#20242A]">{item.text}</p><p className="mt-0.5 text-[11px] text-[#5C6470]">{item.meta}</p></div></Link>
              ))}</div> : <EmptyState>No recent business-scoped activity is available.</EmptyState>}
            </section>
          </aside>
        </div>
      </div>
    </main>
  )
}
