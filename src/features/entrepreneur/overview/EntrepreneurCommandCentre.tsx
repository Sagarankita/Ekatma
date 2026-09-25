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
  Complete: { bg: 'bg-[#f0fdf4]', text: 'text-[#166534]', border: 'border-[#86efac]', dot: 'bg-[#16a34a]' },
  'In Progress': { bg: 'bg-[#ede9fe]', text: 'text-[#3730a3]', border: 'border-[#a5b4fc]', dot: 'bg-[#6366f1]' },
  'Action Required': { bg: 'bg-[#fef3c7]', text: 'text-[#92400e]', border: 'border-[#fde68a]', dot: 'bg-[#d97706]' },
  Ready: { bg: 'bg-[#ebf3ff]', text: 'text-[#1a3a5c]', border: 'border-[#93c5fd]', dot: 'bg-[#1a56db]' },
  Waiting: { bg: 'bg-[#f8f9fb]', text: 'text-[#6b7a8d]', border: 'border-[#d1d9e0]', dot: 'bg-[#9aa5b4]' },
  Upcoming: { bg: 'bg-[#f8f9fb]', text: 'text-[#9aa5b4]', border: 'border-[#e2e8f0]', dot: 'bg-[#d1d9e0]' },
}

function SectionHeader({ title, badge, href, actionLabel, actionAriaLabel }: {
  title: string
  badge?: ReactNode
  href?: string
  actionLabel?: string
  actionAriaLabel?: string
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#e8edf2] bg-[#f8f9fb] px-4 py-2.5">
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#1a3a5c]">{title}</h2>
        {badge}
      </div>
      {href && actionLabel ? (
        <Link href={href} aria-label={actionAriaLabel} className="shrink-0 border border-[#d1d9e0] px-2.5 py-1 text-xs text-[#475569] transition-colors hover:bg-[#f1f5f9]">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  )
}

function CountBadge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'danger' | 'success' }) {
  const toneClass = tone === 'danger'
    ? 'border-[#fca5a5] bg-[#fee2e2] text-[#b91c1c]'
    : tone === 'success'
      ? 'border-[#86efac] bg-[#f0fdf4] text-[#166534]'
      : 'border-[#d1d9e0] bg-[#f0f4f8] text-[#6b7a8d]'
  return <span className={`border px-1.5 py-0.5 text-[10px] font-semibold ${toneClass}`}>{children}</span>
}

function EmptyState({ children }: { children: ReactNode }) {
  return <p className="px-4 py-6 text-center text-xs text-[#6b7a8d]">{children}</p>
}

function ApplicationStatus({ application }: { application: TrackerApp }) {
  const classes: Record<TrackerApp['statusType'], string> = {
    active: 'border-[#a5b4fc] bg-[#ede9fe] text-[#3730a3]',
    action: 'border-[#fde68a] bg-[#fef3c7] text-[#92400e]',
    approved: 'border-[#86efac] bg-[#f0fdf4] text-[#166534]',
    waiting: 'border-[#d1d9e0] bg-[#f8f9fb] text-[#6b7a8d]',
    'over-sla': 'border-[#fca5a5] bg-[#fee2e2] text-[#b91c1c]',
  }
  return <span className={`border px-1.5 py-0.5 text-[10px] font-semibold ${classes[application.statusType]}`}>{application.status}</span>
}

function ComplianceStatusBadge({ status }: { status: ComplianceStatus }) {
  const classes: Record<ComplianceStatus, string> = {
    Compliant: 'border-[#86efac] bg-[#f0fdf4] text-[#166534]',
    'Due Soon': 'border-[#fde68a] bg-[#fef3c7] text-[#92400e]',
    Overdue: 'border-[#fca5a5] bg-[#fee2e2] text-[#b91c1c]',
    'Action Required': 'border-[#fca5a5] bg-[#fee2e2] text-[#b91c1c]',
    'Under Verification': 'border-[#93c5fd] bg-[#dbeafe] text-[#1e40af]',
  }
  return <span className={`border px-1.5 py-0.5 text-[10px] font-semibold ${classes[status]}`}>{status}</span>
}

function RegulatoryBadge({ value }: { value: RegulatoryChangeVerification | RegulatoryChangeImpact }) {
  const classes: Record<RegulatoryChangeVerification | RegulatoryChangeImpact, string> = {
    Validated: 'border-[#86efac] bg-[#dcfce7] text-[#166534]',
    'Needs Verification': 'border-[#fcd34d] bg-[#fef3c7] text-[#92400e]',
    'Under Review': 'border-[#93c5fd] bg-[#dbeafe] text-[#1e40af]',
    'No action': 'border-[#cbd5e1] bg-[#f1f5f9] text-[#64748b]',
    'Review recommended': 'border-[#fcd34d] bg-[#fef3c7] text-[#92400e]',
    'New document': 'border-[#fdba74] bg-[#fff7ed] text-[#9a3412]',
    'Application affected': 'border-[#fca5a5] bg-[#fee2e2] text-[#b91c1c]',
    'Renewal affected': 'border-[#fdba74] bg-[#fff7ed] text-[#9a3412]',
    'Compliance affected': 'border-[#fca5a5] bg-[#fee2e2] text-[#b91c1c]',
    'New requirement potentially triggered': 'border-[#c4b5fd] bg-[#ede9fe] text-[#5b21b6]',
  }
  return <span className={`border px-1.5 py-0.5 text-[9px] font-semibold ${classes[value]}`}>{value}</span>
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
    <main id="main-content" data-testid="e00-command-centre" className="min-h-full flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="border-b border-[#0f2540] bg-[#1a3a5c]">
        <div className="mx-auto max-w-[1320px] px-4 py-4 sm:px-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#2d5a8e] bg-[#0f2540] text-white">
                <Icon.Building />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-base font-bold leading-tight text-white">{project.name}</h1>
                  <span className="bg-[#6366f1] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">{project.stage}</span>
                  {actions.length > 0 ? <span className="bg-[#ef4444] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">{actions.length} Actions Required</span> : null}
                </div>
                <p className="mt-0.5 text-xs text-[#93c5fd]">{project.subtitle} · {project.location}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="text-[10px] text-[#7dd3fc]">Business ID: {project.id}</span>
                  <span className="text-[10px] text-[#7dd3fc]">Industry: {project.industry}</span>
                  <span className="text-[10px] text-[#7dd3fc]">Journey: {project.journeyState}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link href={ENTREPRENEUR_ROUTES.assistant()} className="flex items-center gap-1.5 border border-[#2d5a8e] bg-[#0f2540] px-3 py-1.5 text-xs text-[#93c5fd] transition-colors hover:bg-[#1e3a5c]">
                <Icon.Help /> Regulatory Assistant
              </Link>
              <Link href={ENTREPRENEUR_ROUTES.notifications()} className="flex items-center gap-1.5 border border-[#2d5a8e] bg-[#0f2540] px-3 py-1.5 text-xs text-[#93c5fd] transition-colors hover:bg-[#1e3a5c]">
                <Icon.Bell /> Notifications
                {actionNotificationCount > 0 ? <span className="rounded-full bg-[#ef4444] px-1.5 py-0.5 text-[10px] font-bold text-white">{actionNotificationCount}</span> : null}
              </Link>
              <Link href={ENTREPRENEUR_ROUTES.grievances(project.id)} className="flex items-center gap-1.5 border border-[#2d5a8e] bg-[#0f2540] px-3 py-1.5 text-xs text-[#93c5fd] transition-colors hover:bg-[#1e3a5c]">
                Grievances
                {grievances.length > 0 ? <span className="rounded-full bg-[#f59e0b] px-1.5 py-0.5 text-[10px] font-bold text-[#1a2533]">{grievances.length}</span> : null}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1320px] space-y-5 px-4 py-5 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6" aria-label="Business overview metrics">
          {metrics.map(metric => metric.href ? (
            <Link key={metric.label} href={metric.href} aria-label={metric.ariaLabel} className="group border border-[#e2e8f0] bg-white px-4 py-3 text-left transition-all hover:border-[#1a56db] hover:shadow-sm">
              <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
              <p className="mt-0.5 text-[11px] font-semibold leading-tight text-[#374151] group-hover:text-[#1a3a5c]">{metric.label}</p>
              <p className="mt-0.5 text-[10px] leading-tight text-[#9aa5b4]">{metric.sub}</p>
            </Link>
          ) : (
            <div key={metric.label} className="border border-[#e2e8f0] bg-white px-4 py-3 text-left">
              <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
              <p className="mt-0.5 text-[11px] font-semibold leading-tight text-[#374151]">{metric.label}</p>
              <p className="mt-0.5 text-[10px] leading-tight text-[#9aa5b4]">{metric.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-5">
            <section className="border border-[#e2e8f0] bg-white" aria-labelledby="e00-journey-heading">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e8edf2] bg-[#f8f9fb] px-4 py-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 id="e00-journey-heading" className="text-xs font-bold uppercase tracking-wider text-[#1a3a5c]">Regulatory Journey</h2>
                  <CountBadge>{applicableNodes.length} requirements · {approvedRequirements} approved</CountBadge>
                </div>
                <div className="flex items-center gap-3">
                  <Link href={ENTREPRENEUR_ROUTES.dependencies(project.id)} className="text-xs text-[#1a56db] hover:underline">Dependency graph →</Link>
                  <Link href={ENTREPRENEUR_ROUTES.journey(project.id)} className="border border-[#d1d9e0] px-2.5 py-1 text-xs text-[#475569] hover:bg-[#f1f5f9]">Full Journey</Link>
                </div>
              </div>
              <div className="px-4 pb-3 pt-4">
                <div className="overflow-x-auto pb-1">
                  <div className="flex min-w-max items-stretch">
                    {stageStates.map((stage, index) => {
                      const visual = stageVisuals[stage.state] ?? stageVisuals.Upcoming
                      const stageNodes = nodes.filter(node => node.stage === stage.key && node.applicability !== 'not-applicable')
                      const stageApproved = stageNodes.filter(node => node.displayState === 'approved').length
                      return (
                        <div key={stage.key} className="flex items-center">
                          <Link href={ENTREPRENEUR_ROUTES.journey(project.id)} className={`flex min-w-[100px] flex-col items-center border-y border-l px-4 py-3 text-center last:border-r ${visual.border} ${visual.bg} ${index === currentStageIndex ? 'shadow-[inset_0_-3px_0_#1a56db]' : ''}`}>
                            <span className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${visual.text}`}><span className={`h-1.5 w-1.5 rounded-full ${visual.dot}`} />Stage {stage.num}</span>
                            <span className={`mt-1 text-[12px] font-semibold ${visual.text}`}>{stage.label}</span>
                            <span className={`mt-1 text-[9px] font-medium opacity-80 ${visual.text}`}>{stage.state}</span>
                            {stageNodes.length > 0 ? <span className="mt-0.5 text-[9px] text-[#9aa5b4]">{stageApproved}/{stageNodes.length}</span> : null}
                          </Link>
                          {index < stageStates.length - 1 ? <div className="flex shrink-0 items-center px-0.5"><div className="h-px w-4 bg-[#d1d9e0]" /><span className="text-[8px] text-[#b0bcc9]">›</span></div> : null}
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="mt-3 border-t border-[#f0f4f8] pt-3">
                  <p className="mb-2.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-[#6b7a8d]">
                    Active stage requirements
                    {currentStage ? <span className="font-mono normal-case text-[#9aa5b4]">— {currentStage.label}</span> : null}
                  </p>
                  {activeStageNodes.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {activeStageNodes.slice(0, 4).map(node => {
                        const visual = journeyStateCfg(node.displayState)
                        return (
                          <Link key={node.id} href={ENTREPRENEUR_ROUTES.requirement(project.id, node.id)} className={`border px-2.5 py-2.5 text-left transition-opacity hover:opacity-80 ${visual.border} ${visual.bg}`}>
                            <p className={`truncate text-[10px] font-semibold ${visual.textCls}`}>{node.department}</p>
                            <p className="mt-0.5 text-[11px] font-medium leading-tight text-[#374151]">{node.service}</p>
                            {node.slaRemaining ? <p className="mt-0.5 text-[9px] text-[#6b7a8d]">{node.slaRemaining}</p> : null}
                            <span className={`mt-1 inline-flex items-center gap-1 border px-1.5 py-0.5 text-[9px] font-semibold ${visual.badgeCls}`}>{visual.icon} {visual.label}</span>
                          </Link>
                        )
                      })}
                    </div>
                  ) : <p className="text-xs text-[#6b7a8d]">No business-scoped requirements are available for the active stage.</p>}
                </div>
              </div>
            </section>

            <section id="action-required" className="border border-l-4 border-[#fde68a] border-l-[#d97706] bg-white" aria-labelledby="e00-actions-heading">
              <div className="flex items-center justify-between gap-3 border-b border-[#fde68a] bg-[#fffbeb] px-4 py-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#d97706]" />
                  <h2 id="e00-actions-heading" className="text-xs font-bold uppercase tracking-wider text-[#92400e]">Action Required</h2>
                  <span className="rounded-full bg-[#d97706] px-2 py-0.5 text-[10px] font-bold text-white">{actions.length}</span>
                  <span className="text-[10px] text-[#b45309]">· {actions.filter(action => action.urgent).length} urgent</span>
                </div>
                <Link href={ENTREPRENEUR_ROUTES.notifications()} className="text-[11px] text-[#92400e] hover:underline">All notifications →</Link>
              </div>
              {actions.length > 0 ? (
                <div className="divide-y divide-[#fef9e7]">
                  {actions.slice(0, 5).map(action => (
                    <div key={action.id} className={`flex items-center justify-between gap-4 px-4 py-3 ${action.urgent ? 'bg-[#fffbf0]' : 'bg-white'}`}>
                      <div className="flex min-w-0 flex-1 items-start gap-3">
                        <span className={`mt-0.5 shrink-0 ${action.urgent ? 'text-[#d97706]' : 'text-[#6b7a8d]'}`}>{action.icon}</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold leading-tight text-[#1a2533]">{action.title}</p>
                          <p className="mt-0.5 text-[11px] text-[#6b7a8d]">{action.detail}</p>
                        </div>
                      </div>
                      <Link href={action.href} className={`shrink-0 border px-3 py-1.5 text-xs font-medium transition-colors ${action.urgent ? 'border-[#d97706] text-[#92400e] hover:bg-[#fef3c7]' : 'border-[#1a56db] text-[#1a56db] hover:bg-[#ebf3ff]'}`}>{action.cta}</Link>
                    </div>
                  ))}
                  {actions.length > 5 ? <p className="px-4 py-2 text-[10px] text-[#6b7a8d]">+{actions.length - 5} more actions are available in their linked sections.</p> : null}
                </div>
              ) : <EmptyState>No action-required records are bound to this business.</EmptyState>}
            </section>

            <section className="border border-[#e2e8f0] bg-white" aria-label="Applications Across Departments">
              <SectionHeader title="Applications Across Departments" badge={<CountBadge>{applications.length} active</CountBadge>} href={ENTREPRENEUR_ROUTES.applications(project.id)} actionLabel="Application Tracker" actionAriaLabel="Open Applications" />
              {applications.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead><tr className="border-b border-[#e8edf2] bg-[#f8f9fb]">
                      {['Department', 'Service / Application', 'Current Desk', 'Status', 'SLA', 'Action'].map(heading => <th key={heading} className="px-3.5 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-[#9aa5b4]">{heading}</th>)}
                    </tr></thead>
                    <tbody className="divide-y divide-[#f1f5f9]">
                      {applications.map(application => (
                        <tr key={application.appId} className="transition-colors hover:bg-[#f8f9fb]">
                          <td className="whitespace-nowrap px-3.5 py-3 font-bold text-[#1a3a5c]">{application.dept}</td>
                          <td className="px-3.5 py-3">
                            <Link href={ENTREPRENEUR_ROUTES.application(project.id, application.appId)} className="font-semibold text-[#1a2533] hover:text-[#1a56db] hover:underline">
                              {application.service}<span className="mt-0.5 block font-mono text-[10px] font-normal text-[#9aa5b4]">{application.appId}</span>
                            </Link>
                          </td>
                          <td className="max-w-[180px] px-3.5 py-3 text-[#6b7a8d]"><span className="line-clamp-2">{application.currentDesk}</span></td>
                          <td className="whitespace-nowrap px-3.5 py-3"><ApplicationStatus application={application} /></td>
                          <td className={`whitespace-nowrap px-3.5 py-3 font-semibold ${application.slaType === 'over' ? 'text-[#b91c1c]' : 'text-[#6b7a8d]'}`}>{application.sla}</td>
                          <td className="whitespace-nowrap px-3.5 py-3"><Link href={ENTREPRENEUR_ROUTES.application(project.id, application.appId)} className="border border-[#d1d9e0] px-2.5 py-1 font-medium text-[#475569] hover:bg-[#f1f5f9]">{application.statusType === 'action' ? 'Respond' : application.statusType === 'approved' ? 'View' : 'Track'}</Link></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : <EmptyState>No application records are bound to this business.</EmptyState>}
            </section>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <section className="border border-[#e2e8f0] bg-white" aria-label="Regulatory Changes">
                <SectionHeader title="Regulatory Changes" badge={<CountBadge>{regulatoryChanges.filter(change => change.impactCategory !== 'No action').length} relevant</CountBadge>} href={ENTREPRENEUR_ROUTES.regulatoryChanges(project.id)} actionLabel="Full view →" actionAriaLabel="Open Regulatory Changes" />
                {regulatoryChanges.length > 0 ? <div className="divide-y divide-[#f8f9fb]">{regulatoryChanges.map(change => (
                  <div key={change.id} className={`px-4 py-3 ${change.impactCategory === 'No action' ? 'opacity-60' : ''}`}>
                    <p className="mb-1.5 text-[11px] font-semibold leading-tight text-[#1a2533]">{change.title}</p>
                    <div className="mb-1.5 flex flex-wrap gap-1"><RegulatoryBadge value={change.verification} /><RegulatoryBadge value={change.impactCategory} /></div>
                    <p className="text-[10px] text-[#6b7a8d]">Effective {change.effectiveDate} · {change.department}</p>
                    {change.impactCategory !== 'No action' ? <Link href={ENTREPRENEUR_ROUTES.regulatoryChanges(project.id)} className="mt-1.5 inline-block text-[10px] font-medium text-[#1a56db] hover:underline">Review impact →</Link> : null}
                  </div>
                ))}</div> : <EmptyState>No business-scoped regulatory change records are available.</EmptyState>}
              </section>

              <section className="border border-[#e2e8f0] bg-white" aria-label="Incentives">
                <SectionHeader title="Incentives" badge={<CountBadge tone="success">{eligibleIncentives.length} eligible</CountBadge>} href={ENTREPRENEUR_ROUTES.incentives(project.id)} actionLabel="Full view →" actionAriaLabel="Open Incentives" />
                <div className="grid grid-cols-3 divide-x divide-[#f0f4f8] border-b border-[#f0f4f8]">
                  {[['Identified', incentives.length, 'text-[#1a3a5c]'], ['Eligible', eligibleIncentives.length, 'text-[#166534]'], ['Verify', incentivesToVerify.length, 'text-[#92400e]']].map(([label, value, color]) => (
                    <div key={String(label)} className="px-3 py-2 text-center"><p className={`text-base font-bold ${color}`}>{value}</p><p className="text-[10px] text-[#6b7a8d]">{label}</p></div>
                  ))}
                </div>
                {incentives.length > 0 ? <div className="divide-y divide-[#f8f9fb]">{incentives.map(scheme => (
                  <Link key={scheme.id} href={ENTREPRENEUR_ROUTES.incentive(project.id, scheme.id)} className="group block px-4 py-2.5 text-left transition-colors hover:bg-[#f8fbff]">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1"><p className="text-[11px] font-semibold leading-tight text-[#1a2533] transition-colors group-hover:text-[#1a56db]">{scheme.name}</p><p className="mt-0.5 text-[10px] text-[#6b7a8d]">{scheme.authority}</p></div>
                      <span className={`mt-0.5 shrink-0 border px-1.5 py-0.5 text-[9px] font-bold ${scheme.eligState === 'Appears eligible from available data' ? 'border-[#86efac] bg-[#f0fdf4] text-[#166534]' : scheme.eligState === 'Needs Verification' ? 'border-[#fde68a] bg-[#fef3c7] text-[#92400e]' : 'border-[#d1d9e0] bg-[#f8f9fb] text-[#6b7a8d]'}`}>{scheme.eligState === 'Appears eligible from available data' ? 'Eligible' : scheme.eligState === 'Needs Verification' ? 'Verify' : 'N/A'}</span>
                    </div>
                  </Link>
                ))}</div> : <EmptyState>No incentive records are bound to this business.</EmptyState>}
              </section>
            </div>

            <section className="border border-[#e2e8f0] bg-white" aria-label="Compliance">
              <SectionHeader title="Compliance" badge={compliance.filter(obligation => obligation.status === 'Action Required').length ? <CountBadge tone="danger">{compliance.filter(obligation => obligation.status === 'Action Required').length} action required</CountBadge> : undefined} href={ENTREPRENEUR_ROUTES.compliance(project.id)} actionLabel="Compliance Dashboard" actionAriaLabel="Open Compliance" />
              <div className="grid grid-cols-5 divide-x divide-[#f0f4f8] border-b border-[#f0f4f8]">
                {[
                  ['Action Required', compliance.filter(obligation => obligation.status === 'Action Required').length, 'text-[#b91c1c]'],
                  ['Due Soon', compliance.filter(obligation => obligation.status === 'Due Soon').length, 'text-[#d97706]'],
                  ['Overdue', compliance.filter(obligation => obligation.status === 'Overdue').length, 'text-[#b91c1c]'],
                  ['Under Verification', compliance.filter(obligation => obligation.status === 'Under Verification').length, 'text-[#1a56db]'],
                  ['Total', compliance.length, 'text-[#1a3a5c]'],
                ].map(([label, value, color]) => <div key={String(label)} className="px-2 py-2.5 text-center sm:px-3"><p className={`text-xl font-bold ${color}`}>{value}</p><p className="text-[9px] leading-tight text-[#6b7a8d] sm:text-[10px]">{label}</p></div>)}
              </div>
              {compliance.length > 0 ? <div className="overflow-x-auto">
                <table className="w-full text-xs"><thead><tr className="border-b border-[#f0f4f8] bg-[#f8f9fb]">{['Obligation', 'Department', 'Category', 'Due Date', 'Status', ''].map(heading => <th key={heading} className="px-3.5 py-1.5 text-left text-[10px] font-semibold uppercase tracking-wider text-[#9aa5b4]">{heading}</th>)}</tr></thead>
                  <tbody className="divide-y divide-[#f8f9fb]">{compliance.slice(0, 5).map(obligation => <tr key={obligation.id} className="transition-colors hover:bg-[#f8f9fb]">
                    <td className="px-3.5 py-2.5"><p className="max-w-[220px] truncate font-semibold text-[#1a2533]">{obligation.name}</p><p className="mt-0.5 font-mono text-[10px] text-[#9aa5b4]">{obligation.id}</p></td>
                    <td className="whitespace-nowrap px-3.5 py-2.5 text-[#6b7a8d]">{obligation.dept}</td><td className="whitespace-nowrap px-3.5 py-2.5 text-[#6b7a8d]">{obligation.category}</td>
                    <td className={`whitespace-nowrap px-3.5 py-2.5 font-medium ${obligation.status === 'Action Required' || obligation.status === 'Overdue' ? 'text-[#b91c1c]' : 'text-[#374151]'}`}>{obligation.dueDate}</td>
                    <td className="whitespace-nowrap px-3.5 py-2.5"><ComplianceStatusBadge status={obligation.status} /></td>
                    <td className="whitespace-nowrap px-3.5 py-2.5"><Link href={ENTREPRENEUR_ROUTES.complianceDetail(project.id, obligation.id)} className="text-[10px] font-medium text-[#1a56db] hover:underline">Detail →</Link></td>
                  </tr>)}</tbody>
                </table>
                {compliance.length > 5 ? <div className="border-t border-[#f0f4f8] px-4 py-2"><Link href={ENTREPRENEUR_ROUTES.compliance(project.id)} className="text-xs text-[#1a56db] hover:underline">+{compliance.length - 5} more obligations →</Link></div> : null}
              </div> : <EmptyState>No compliance obligations are bound to this business.</EmptyState>}
            </section>
          </div>

          <aside className="min-w-0 space-y-5" aria-label="Command centre updates">
            <section className="border border-[#e2e8f0] bg-white" aria-label="Upcoming">
              <SectionHeader title="Upcoming" href={ENTREPRENEUR_ROUTES.inspections(project.id)} actionLabel="All →" actionAriaLabel="Open Inspections" />
              {upcoming.length > 0 ? <div className="divide-y divide-[#f8f9fb]">{upcoming.map(item => (
                <Link key={item.id} href={item.href} className="flex w-full items-start gap-3 px-4 py-2.5 text-left transition-colors hover:bg-[#f8fbff]">
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${item.dot}`} />
                  <div className="min-w-0 flex-1"><p className="text-[11px] font-semibold leading-tight text-[#1a2533]">{item.title}</p><div className="mt-0.5 flex flex-wrap items-center gap-2"><span className={`text-[10px] font-medium ${item.text}`}>{item.date}</span><span className="border border-[#e2e8f0] bg-[#f8f9fb] px-1 py-0.5 text-[9px] font-semibold text-[#6b7a8d]">{item.type}</span></div></div>
                </Link>
              ))}</div> : <EmptyState>No upcoming inspections, renewals, or compliance dates are recorded.</EmptyState>}
            </section>

            <section className="border border-[#e2e8f0] bg-white" aria-label="Notifications">
              <SectionHeader title="Notifications" badge={actionNotificationCount ? <span className="rounded-full bg-[#b91c1c] px-1.5 py-0.5 text-[10px] font-bold text-white">{actionNotificationCount}</span> : undefined} href={ENTREPRENEUR_ROUTES.notifications()} actionLabel="All →" />
              {notifications.length > 0 ? <div className="divide-y divide-[#f8f9fb]">{notifications.slice(0, 5).map(notification => {
                const actionRequired = notification.group === 'Action Required'
                return <div key={notification.id} className={`px-4 py-3 ${actionRequired ? 'bg-[#fffbf0]' : ''}`}><div className="flex items-start gap-2.5"><span className={`mt-0.5 shrink-0 ${actionRequired ? 'text-[#d97706]' : notification.group === 'Upcoming' ? 'text-[#6366f1]' : 'text-[#6b7a8d]'}`}>{actionRequired ? <Icon.AlertCircle /> : <Icon.Info />}</span><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-1"><p className="flex-1 text-[11px] font-semibold leading-tight text-[#1a2533]">{notification.title}</p>{!notification.isRead ? <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a56db]" /> : null}</div><p className="mt-0.5 text-[10px] text-[#6b7a8d]">{notification.due}</p><Link href={notificationHref(notification, project.id)} className="mt-1.5 inline-block text-[10px] font-medium text-[#1a56db] hover:underline">{notification.ctaLabel} →</Link></div></div></div>
              })}</div> : <EmptyState>No business-scoped notifications are available.</EmptyState>}
              <div className="border-t border-[#f0f4f8] px-4 py-2.5"><Link href={ENTREPRENEUR_ROUTES.notifications()} className="text-xs font-medium text-[#1a56db] hover:underline">View Notification Centre →</Link></div>
            </section>

            <section className="border border-[#e2e8f0] bg-white" aria-label="Recent Activity">
              <SectionHeader title="Recent Activity" />
              {activity.length > 0 ? <div className="divide-y divide-[#f8f9fb]">{activity.map(item => (
                <Link key={item.id} href={item.href} className="flex items-start gap-2.5 px-4 py-2.5 transition-colors hover:bg-[#f8fbff]"><span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${item.dot}`} /><div className="min-w-0 flex-1"><p className="text-[11px] leading-snug text-[#374151]">{item.text}</p><p className="mt-0.5 text-[10px] text-[#9aa5b4]">{item.meta}</p></div></Link>
              ))}</div> : <EmptyState>No recent business-scoped activity is available.</EmptyState>}
            </section>
          </aside>
        </div>
      </div>
    </main>
  )
}
