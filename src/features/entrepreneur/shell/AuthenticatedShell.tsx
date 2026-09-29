'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur'
import { ENTREPRENEUR_BUSINESSES, findBusinessById, findBusinessEntity, DEEP_SCREEN_BUSINESS_IDENTITY, SAHYADRI_DEMO_BUSINESS_ID, type EntrepreneurBusinessIdentity } from '../identity/catalog'
import { businessFromEntrepreneurPathname, readRememberedBusiness, rememberBusiness } from '../identity/selected-business'
import { listGrievancesForBusiness } from '../grievances/data'
import { findQueryByAppId, findTrackerAppForBusiness, listInspectionsForBusiness, listTrackerAppsForBusiness } from '../applications/data'
import { listComplianceForBusiness } from '../compliance/data'
import { listIncentivesForBusiness } from '../incentives/data'
import { getIncentiveClaims, getIncentiveDetailSchemes } from '../incentives/workspace/data'
import { listJourneyNodesForBusiness } from '../journey/data'
import { listDocumentsForBusiness } from '../documents/data'
import { findBusinessProjectById } from '../businesses/catalog'
import { useDisplayPreferences } from '../appearance/useDisplayPreferences'
import { AccessibilityStrip, DemoNotice, Footer, Icon, PortalHeader } from '../public-auth/PublicChrome'
import { useRegulatoryAssistant } from '@/features/regulatory-assistant/Provider'
import { enrichAssistantContext, entrepreneurPageContext, globalAssistantContext } from '@/features/regulatory-assistant/context'
import { GlobalAssistantSurface } from '@/features/regulatory-assistant/GlobalAssistant'

type ShellBreadcrumb = {
  label: string
  href?: string
}

type ShellNextAction = {
  label: string
  detail: string
  href?: string
}

function safeDecode(value: string | undefined): string {
  if (!value) return ''
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function routeBreadcrumbs(pathname: string, business?: EntrepreneurBusinessIdentity): ShellBreadcrumb[] {
  const portfolio = { label: 'My Businesses', href: ENTREPRENEUR_ROUTES.businesses() }

  if (pathname === ENTREPRENEUR_ROUTES.businesses()) return [{ label: 'My Businesses' }]

  if (pathname.startsWith(ENTREPRENEUR_ROUTES.newBusiness())) {
    const steps: Array<[string, string]> = [
      ['/basic-requirements', 'Basic Requirements'],
      ['/discovery/environment-safety', 'Environment, Safety & Existing Context'],
      ['/discovery/scale', 'Scale & Operations'],
      ['/discovery', 'Adaptive Business Questionnaire'],
      ['/review', 'Business Profile Review'],
    ]
    const current = steps.find(([suffix]) => pathname.endsWith(suffix))?.[1] ?? 'Create Business / Project'
    const crumbs: ShellBreadcrumb[] = [portfolio]
    if (current !== 'Create Business / Project') {
      crumbs.push({ label: 'Create Business / Project', href: ENTREPRENEUR_ROUTES.newBusiness() })
    }
    crumbs.push({ label: current })
    return crumbs
  }

  if (pathname === ENTREPRENEUR_ROUTES.notifications()) return [portfolio, { label: 'Notifications' }]
  if (pathname === ENTREPRENEUR_ROUTES.assistant()) return [portfolio, { label: 'Regulatory Assistant' }]

  if (!business) return [portfolio]

  const businessHome = ENTREPRENEUR_ROUTES.business(business.id)
  const crumbs: ShellBreadcrumb[] = [portfolio]
  if (pathname === businessHome) {
    crumbs.push({ label: business.name })
    return crumbs
  }
  crumbs.push({ label: business.name, href: businessHome })

  const relative = pathname.slice(businessHome.length)
  const parts = relative.split('/').filter(Boolean).map(safeDecode)
  const [section, second, third] = parts

  if (section === 'dossier') {
    if (second === 'provenance') {
      crumbs.push({ label: 'Master Project Dossier', href: ENTREPRENEUR_ROUTES.dossier(business.id) })
      crumbs.push({ label: 'Data Provenance' })
    } else crumbs.push({ label: 'Master Project Dossier' })
    return crumbs
  }

  if (section === 'approvals' || section === 'know-your-approvals') {
    crumbs.push({ label: 'Know Your Approvals' })
    return crumbs
  }

  if (section === 'journey') {
    crumbs.push({ label: 'Regulatory Journey' })
    return crumbs
  }

  if (section === 'requirements') {
    crumbs.push({ label: 'Regulatory Journey', href: ENTREPRENEUR_ROUTES.journey(business.id) })
    crumbs.push({ label: 'Requirement Detail' })
    return crumbs
  }

  if (section === 'dependencies') {
    crumbs.push({ label: 'Regulatory Journey', href: ENTREPRENEUR_ROUTES.journey(business.id) })
    crumbs.push({ label: 'Dependency Graph' })
    return crumbs
  }

  if (section === 'documents') {
    if (second) {
      crumbs.push({ label: 'Documents', href: ENTREPRENEUR_ROUTES.documents(business.id) })
      crumbs.push({ label: 'Document Detail' })
    } else crumbs.push({ label: 'Documents' })
    return crumbs
  }

  if (section === 'applications') {
    const applications = { label: 'Applications', href: ENTREPRENEUR_ROUTES.applications(business.id) }
    if (!second) {
      crumbs.push({ label: 'Applications' })
      return crumbs
    }
    crumbs.push(applications)
    if (second === 'new') {
      const intakeSteps: Record<string, string> = {
        prevalidation: 'Pre-validation',
        consistency: 'Cross-form Consistency',
        submission: 'Payment / Submission',
      }
      if (third) {
        crumbs.push({ label: 'Application', href: ENTREPRENEUR_ROUTES.newApplication(business.id) })
        crumbs.push({ label: intakeSteps[third] ?? third })
      } else crumbs.push({ label: 'Application' })
      return crumbs
    }

    const applicationId = second
    const applicationHref = ENTREPRENEUR_ROUTES.application(business.id, applicationId)
    if (!third) {
      crumbs.push({ label: 'Application Detail' })
      return crumbs
    }
    crumbs.push({ label: 'Application Detail', href: applicationHref })
    if (third === 'queries') crumbs.push({ label: 'Query / Deficiency Response' })
    else if (third === 'resubmissions' || third === 'resubmission') crumbs.push({ label: 'Delta Resubmission' })
    else if (third === 'decisions' || third === 'decision') crumbs.push({ label: 'Approval / Decision Detail' })
    return crumbs
  }

  if (section === 'inspections') {
    if (second) {
      crumbs.push({ label: 'Inspections', href: ENTREPRENEUR_ROUTES.inspections(business.id) })
      crumbs.push({ label: 'Inspection Centre' })
    } else crumbs.push({ label: 'Inspections' })
    return crumbs
  }

  if (section === 'compliance') {
    if (second) {
      crumbs.push({ label: 'Compliance', href: ENTREPRENEUR_ROUTES.compliance(business.id) })
      crumbs.push({ label: 'Compliance Detail' })
    } else crumbs.push({ label: 'Compliance' })
    return crumbs
  }

  if (section === 'incentives' || section === 'incentive-claims') {
    const incentiveRoot = { label: 'Incentives', href: ENTREPRENEUR_ROUTES.incentives(business.id) }
    if (section === 'incentive-claims') {
      crumbs.push(incentiveRoot)
      crumbs.push({ label: 'Incentive Application / Claims' })
      return crumbs
    }
    if (!second || second === 'centre') {
      crumbs.push({ label: 'Incentives' })
      return crumbs
    }
    crumbs.push(incentiveRoot)
    const incentiveLabels: Record<string, string> = {
      calculator: 'Incentives Discovery',
      portfolio: 'Incentive Detail',
      'claim-readiness': 'Incentive Application / Claims',
      claims: 'Incentive Application / Claims',
      roi: 'Incentives Discovery',
      scenarios: 'Incentives Discovery',
      'policy-updates': 'Incentives Discovery',
    }
    const label = incentiveLabels[second] ?? 'Incentive Detail'
    if (third && second === 'calculator') {
      crumbs.push({ label: 'Incentives Discovery', href: ENTREPRENEUR_ROUTES.incentiveCalculator(business.id) })
      crumbs.push({ label: third === 'review' ? 'Review' : 'Questionnaire' })
    } else if (third && second === 'portfolio') {
      crumbs.push({ label: 'Incentive Detail' })
    } else if (third && second === 'claims') {
      crumbs.push({ label: 'Incentive Application / Claims' })
    } else if (third && second === 'roi') {
      crumbs.push({ label: 'Incentives Discovery', href: ENTREPRENEUR_ROUTES.incentiveRoi(business.id) })
      crumbs.push({ label: 'Results' })
    } else crumbs.push({ label })
    return crumbs
  }

  if (section === 'regulatory-changes') {
    crumbs.push({ label: 'Changes & Expansion', href: ENTREPRENEUR_ROUTES.changes(business.id) })
    crumbs.push({ label: 'Regulatory Change Impact' })
    return crumbs
  }

  if (section === 'changes') {
    if (second === 'amendments') {
      crumbs.push({ label: 'Changes & Expansion', href: ENTREPRENEUR_ROUTES.changes(business.id) })
      crumbs.push({ label: 'Amendments / New Requirements' })
    } else crumbs.push({ label: 'Changes & Expansion' })
    return crumbs
  }

  if (section === 'grievances') {
    crumbs.push({ label: 'Grievances' })
    return crumbs
  }

  crumbs.push({ label: section || 'Overview' })
  return crumbs
}

function businessAttention(business?: EntrepreneurBusinessIdentity): { count: number; summary: string; next: ShellNextAction } {
  if (!business) {
    return {
      count: 0,
      summary: 'Choose a business to see relevant work.',
      next: { label: 'Select a business', detail: 'Open My Businesses to choose your working context.', href: ENTREPRENEUR_ROUTES.businesses() },
    }
  }

  const applications = listTrackerAppsForBusiness(business.id)
  const applicationActions = applications.filter(application => Boolean(application.actionRequired))
  const complianceActions = listComplianceForBusiness(business.id).filter(obligation => obligation.status !== 'Compliant')
  const inspectionActions = listInspectionsForBusiness(business.id).filter(inspection => inspection.status === 'Scheduled' && Boolean(inspection.actionRequired))
  const missingDocuments = listDocumentsForBusiness(business.id).filter(document => document.availability === 'Missing')
  const readyRequirements = listJourneyNodesForBusiness(business.id, false).filter(node => node.displayState === 'ready')
  const count = applicationActions.length + complianceActions.length + inspectionActions.length + missingDocuments.slice(0, 2).length

  const application = applicationActions[0]
  if (application) {
    const query = findQueryByAppId(application.appId)
    return {
      count,
      summary: `${count} ${count === 1 ? 'item requires' : 'items require'} attention.`,
      next: {
        label: query ? 'Respond to query' : 'Review application',
        detail: `${application.dept} · ${application.service}`,
        href: query
          ? ENTREPRENEUR_ROUTES.applicationQuery(business.id, application.appId, query.queryId)
          : ENTREPRENEUR_ROUTES.application(business.id, application.appId),
      },
    }
  }

  const obligation = complianceActions[0]
  if (obligation) {
    return {
      count,
      summary: `${count} ${count === 1 ? 'item requires' : 'items require'} attention.`,
      next: {
        label: 'Review compliance obligation',
        detail: `${obligation.name} · Due ${obligation.dueDate}`,
        href: ENTREPRENEUR_ROUTES.complianceDetail(business.id, obligation.id),
      },
    }
  }

  const inspection = inspectionActions[0]
  if (inspection) {
    return {
      count,
      summary: `${count} ${count === 1 ? 'item requires' : 'items require'} attention.`,
      next: {
        label: 'Prepare for inspection',
        detail: `${inspection.type} · ${inspection.date}`,
        href: ENTREPRENEUR_ROUTES.inspection(business.id, inspection.id),
      },
    }
  }

  const document = missingDocuments[0]
  if (document) {
    return {
      count,
      summary: `${count} ${count === 1 ? 'item requires' : 'items require'} attention.`,
      next: {
        label: 'Provide missing document',
        detail: document.name,
        href: ENTREPRENEUR_ROUTES.document(business.id, document.id),
      },
    }
  }

  const requirement = readyRequirements[0]
  if (requirement) {
    return {
      count: 0,
      summary: 'No urgent items. A requirement is ready to continue.',
      next: {
        label: 'Continue Regulatory Journey',
        detail: `${requirement.department} · ${requirement.service}`,
        href: ENTREPRENEUR_ROUTES.requirement(business.id, requirement.id),
      },
    }
  }

  return {
    count: 0,
    summary: 'No immediate action is recorded for this business.',
    next: {
      label: 'Review Overview',
      detail: 'Check current applications, compliance and upcoming work.',
      href: ENTREPRENEUR_ROUTES.business(business.id),
    },
  }
}

function EntrepreneurContextBar({ pathname, business }: { pathname: string; business?: EntrepreneurBusinessIdentity }) {
  const isCreatingBusiness = pathname.startsWith(ENTREPRENEUR_ROUTES.newBusiness())
  const attention = businessAttention(isCreatingBusiness ? undefined : business)
  const breadcrumbs = routeBreadcrumbs(pathname, business)

  const contextName = isCreatingBusiness ? 'New Business / Project' : (business?.name ?? 'No business selected')
  const contextLine = isCreatingBusiness
    ? 'Business DNA setup'
    : business
      ? `${business.industry} · ${business.location}`
      : 'Choose a business to establish a working context.'
  const nextAction: ShellNextAction = isCreatingBusiness
    ? { label: 'Complete this Business DNA step', detail: 'Use the primary action in the page below.' }
    : attention.next

  return (
    <section className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur" aria-label="Current business and project context">
      <div className="mx-auto max-w-[1600px] px-4 py-2 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-1 flex flex-wrap items-center gap-1.5 text-[11px] text-[#555C56]">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={`${crumb.label}-${index}`}>
              {index > 0 ? <span aria-hidden="true" className="text-slate-300">›</span> : null}
              {crumb.href ? (
                <Link href={crumb.href} className="rounded px-1 py-0.5 font-medium text-[#3d7a4d] hover:bg-[#edf5ef] hover:text-[#355E3B] hover:underline">
                  {crumb.label}
                </Link>
              ) : (
                <span className="px-1 py-0.5 font-semibold text-[#2B2B2B]" aria-current="page">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h2 className="truncate text-sm font-bold text-[#355E3B]">{contextName}</h2>
            <p className="truncate text-xs text-[#555C56]">{contextLine}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:shrink-0">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {attention.count > 0 ? (
                <span className="inline-flex items-center gap-1.5 rounded-md bg-rose-50 px-2 py-0.5 font-semibold text-[#9B2C2C] border border-rose-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#9B2C2C]" />
                  {attention.count} items need attention
                </span>
              ) : isCreatingBusiness ? (
                <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-50 px-2 py-0.5 font-semibold text-amber-800 border border-amber-200">
                  Business DNA setup
                </span>
              ) : null}

              {nextAction.detail ? (
                <span className="text-[#555C56]">
                  <span className="text-slate-300 mr-1.5">·</span>
                  <span className="font-medium text-[#2B2B2B]">Next:</span> {nextAction.detail}
                </span>
              ) : null}
            </div>

            {nextAction.href ? (
              <Link
                href={nextAction.href}
                className="inline-flex items-center rounded-md bg-[#355E3B] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#2d5132] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017] focus-visible:ring-offset-2"
              >
                {nextAction.label}
              </Link>
            ) : nextAction.label ? (
              <span className="text-xs font-bold text-[#355E3B]">{nextAction.label}</span>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

function Sidebar({ pathname, business, onSelectBusiness, closeMobile, collapsed, setCollapsed }: {
  pathname: string
  business?: EntrepreneurBusinessIdentity
  onSelectBusiness: (businessId: string) => void
  closeMobile: () => void
  collapsed: boolean
  setCollapsed: (value: boolean) => void
}) {
  const router = useRouter()
  const [switcherOpen, setSwitcherOpen] = useState(false)
  const defaultBusiness = findBusinessById(SAHYADRI_DEMO_BUSINESS_ID) ?? ENTREPRENEUR_BUSINESSES[0]
  const targetBusinessId = business?.id || defaultBusiness?.id || 'BP-004'

  const onPortfolio = pathname === ENTREPRENEUR_ROUTES.businesses()
  const onOverview = pathname === ENTREPRENEUR_ROUTES.business(targetBusinessId)
  const onApprovals = pathname === ENTREPRENEUR_ROUTES.knowYourApprovals(targetBusinessId) ||
    pathname.startsWith(ENTREPRENEUR_ROUTES.knowYourApprovals(targetBusinessId) + '/')
  const onJourney = pathname === ENTREPRENEUR_ROUTES.journey(targetBusinessId) ||
    pathname.startsWith(ENTREPRENEUR_ROUTES.journey(targetBusinessId) + '/') ||
    pathname.includes('/requirements/') ||
    pathname.includes('/dependencies')
  const onDocuments = pathname === ENTREPRENEUR_ROUTES.documents(targetBusinessId) ||
    pathname.startsWith(ENTREPRENEUR_ROUTES.documents(targetBusinessId) + '/')
  const onApplications = pathname === ENTREPRENEUR_ROUTES.applications(targetBusinessId) ||
    pathname.startsWith(ENTREPRENEUR_ROUTES.applications(targetBusinessId) + '/')

  const navGroups = [
    { title: 'Operations & Compliance', items: [
      { label: 'Compliance', path: ENTREPRENEUR_ROUTES.compliance(targetBusinessId) },
      { label: 'Inspections', path: ENTREPRENEUR_ROUTES.inspections(targetBusinessId) },
      { label: 'Incentives', path: ENTREPRENEUR_ROUTES.incentives(targetBusinessId) },
    ] },
    { title: 'Business Changes', items: [
      { label: 'Changes & Expansion', path: ENTREPRENEUR_ROUTES.changes(targetBusinessId) },
    ] },
  ]

  const switchedDestination = (switchedTargetId: string): string => {
    if (!business) return ENTREPRENEUR_ROUTES.business(switchedTargetId)
    const currentApplications = ENTREPRENEUR_ROUTES.applications(business.id)
    if (pathname === currentApplications) return ENTREPRENEUR_ROUTES.applications(switchedTargetId)
    if (pathname.startsWith(`${currentApplications}/`)) {
      const applicationId = pathname.slice(currentApplications.length + 1).split('/')[0]
      if (findTrackerAppForBusiness(switchedTargetId, applicationId)) return ENTREPRENEUR_ROUTES.application(switchedTargetId, applicationId)
      return ENTREPRENEUR_ROUTES.applications(switchedTargetId)
    }

    const currentCompliance = ENTREPRENEUR_ROUTES.compliance(business.id)
    if (pathname === currentCompliance || pathname.startsWith(`${currentCompliance}/`)) {
      if (pathname.startsWith(`${currentCompliance}/`)) {
        const complianceId = pathname.slice(currentCompliance.length + 1).split('/')[0]
        if (findBusinessEntity('compliance', switchedTargetId, complianceId)) {
          return ENTREPRENEUR_ROUTES.complianceDetail(switchedTargetId, complianceId)
        }
      }
      return ENTREPRENEUR_ROUTES.compliance(switchedTargetId)
    }

    const currentIncentives = ENTREPRENEUR_ROUTES.incentives(business.id)
    const currentClaims = ENTREPRENEUR_ROUTES.incentiveClaims(business.id)
    if (pathname === currentIncentives || pathname.startsWith(`${currentIncentives}/`) || pathname === currentClaims) {
      if (pathname === currentClaims) {
        return ENTREPRENEUR_ROUTES.incentiveClaimList(switchedTargetId)
      }
      const suffix = pathname.slice(currentIncentives.length)
      if (!suffix || suffix === '/centre') return ENTREPRENEUR_ROUTES.incentives(switchedTargetId)
      if (suffix === '/calculator') return ENTREPRENEUR_ROUTES.incentiveCalculator(switchedTargetId)
      if (suffix === '/calculator/questionnaire') return ENTREPRENEUR_ROUTES.incentiveCalculatorQuestionnaire(switchedTargetId)
      if (suffix === '/calculator/review') return ENTREPRENEUR_ROUTES.incentiveCalculatorReview(switchedTargetId)
      if (suffix === '/portfolio') return ENTREPRENEUR_ROUTES.incentivePortfolio(switchedTargetId)
      if (suffix === '/claim-readiness') return ENTREPRENEUR_ROUTES.incentiveClaimReadiness(switchedTargetId)
      if (suffix === '/claims') return ENTREPRENEUR_ROUTES.incentiveClaimList(switchedTargetId)
      if (suffix === '/roi') return ENTREPRENEUR_ROUTES.incentiveRoi(switchedTargetId)
      if (suffix === '/roi/results') return ENTREPRENEUR_ROUTES.incentiveRoiResults(switchedTargetId)
      if (suffix === '/scenarios') return ENTREPRENEUR_ROUTES.incentiveScenarios(switchedTargetId)
      if (suffix === '/policy-updates') return ENTREPRENEUR_ROUTES.incentivePolicyUpdates(switchedTargetId)
      if (suffix.startsWith('/portfolio/')) {
        const incentiveId = suffix.slice('/portfolio/'.length).split('/')[0]
        if (getIncentiveDetailSchemes(switchedTargetId).some(scheme => scheme.id === incentiveId)) {
          return ENTREPRENEUR_ROUTES.incentivePortfolioDetail(switchedTargetId, incentiveId)
        }
        return ENTREPRENEUR_ROUTES.incentivePortfolio(switchedTargetId)
      }
      if (suffix.startsWith('/claims/')) {
        const claimId = suffix.slice('/claims/'.length).split('/')[0]
        if (getIncentiveClaims(switchedTargetId).some(claim => claim.id === claimId)) {
          return ENTREPRENEUR_ROUTES.incentiveClaim(switchedTargetId, claimId)
        }
        return ENTREPRENEUR_ROUTES.incentiveClaimList(switchedTargetId)
      }
      const legacyIncentiveId = suffix.slice(1).split('/')[0]
      if (findBusinessEntity('incentive', switchedTargetId, legacyIncentiveId)) {
        return ENTREPRENEUR_ROUTES.incentivePortfolioDetail(switchedTargetId, legacyIncentiveId)
      }
      return ENTREPRENEUR_ROUTES.incentives(switchedTargetId)
    }

    const currentDocuments = ENTREPRENEUR_ROUTES.documents(business.id)
    if (pathname === currentDocuments || pathname.startsWith(`${currentDocuments}/`)) {
      if (pathname.startsWith(`${currentDocuments}/`)) {
        const documentId = pathname.slice(currentDocuments.length + 1).split('/')[0]
        if (findBusinessEntity('document', switchedTargetId, documentId)) {
          return ENTREPRENEUR_ROUTES.document(switchedTargetId, documentId)
        }
      }
      return ENTREPRENEUR_ROUTES.documents(switchedTargetId)
    }

    const currentInspections = ENTREPRENEUR_ROUTES.inspections(business.id)
    if (pathname === currentInspections || pathname.startsWith(`${currentInspections}/`)) {
      if (pathname.startsWith(`${currentInspections}/`)) {
        const inspectionId = pathname.slice(currentInspections.length + 1).split('/')[0]
        if (findBusinessEntity('inspection', switchedTargetId, inspectionId)) {
          return ENTREPRENEUR_ROUTES.inspection(switchedTargetId, inspectionId)
        }
      }
      return ENTREPRENEUR_ROUTES.inspections(switchedTargetId)
    }

    const currentApprovals = ENTREPRENEUR_ROUTES.knowYourApprovals(business.id)
    if (pathname === currentApprovals || pathname.startsWith(`${currentApprovals}/`)) {
      return ENTREPRENEUR_ROUTES.knowYourApprovals(switchedTargetId)
    }

    const currentJourney = ENTREPRENEUR_ROUTES.journey(business.id)
    const currentDeps = ENTREPRENEUR_ROUTES.dependencies(business.id)
    const onJourneySection = pathname === currentJourney ||
      pathname.startsWith(`${currentJourney}/`) ||
      pathname === currentDeps ||
      pathname.includes('/requirements/')
    if (onJourneySection) {
      if (pathname.includes('/requirements/')) {
        const parts = pathname.split('/requirements/')
        const reqId = parts[1]?.split('/')[0]
        if (reqId && findBusinessEntity('requirement', switchedTargetId, reqId)) {
          return ENTREPRENEUR_ROUTES.requirement(switchedTargetId, reqId)
        }
      }
      if (pathname === currentDeps) {
        return ENTREPRENEUR_ROUTES.dependencies(switchedTargetId)
      }
      return ENTREPRENEUR_ROUTES.journey(switchedTargetId)
    }

    const currentDossier = ENTREPRENEUR_ROUTES.dossier(business.id)
    const currentProvenance = ENTREPRENEUR_ROUTES.provenance(business.id)
    if (pathname === currentDossier || pathname === currentProvenance) {
      if (DEEP_SCREEN_BUSINESS_IDENTITY.businessId === switchedTargetId) {
        if (pathname === currentProvenance) return ENTREPRENEUR_ROUTES.provenance(switchedTargetId)
        return ENTREPRENEUR_ROUTES.dossier(switchedTargetId)
      }
      return ENTREPRENEUR_ROUTES.business(switchedTargetId)
    }

    const currentChanges = ENTREPRENEUR_ROUTES.changes(business.id)
    const currentAmendments = ENTREPRENEUR_ROUTES.amendments(business.id)
    const currentRegChanges = ENTREPRENEUR_ROUTES.regulatoryChanges(business.id)
    if (pathname === currentChanges || pathname === currentAmendments || pathname === currentRegChanges) {
      if (pathname === currentAmendments) return ENTREPRENEUR_ROUTES.amendments(switchedTargetId)
      if (pathname === currentRegChanges) return ENTREPRENEUR_ROUTES.regulatoryChanges(switchedTargetId)
      return ENTREPRENEUR_ROUTES.changes(switchedTargetId)
    }

    if (pathname === ENTREPRENEUR_ROUTES.grievances(business.id)) return ENTREPRENEUR_ROUTES.grievances(switchedTargetId)
    if (pathname === ENTREPRENEUR_ROUTES.profile(business.id)) return ENTREPRENEUR_ROUTES.profile(switchedTargetId)
    return ENTREPRENEUR_ROUTES.business(switchedTargetId)
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-3.5 py-3 border-b border-slate-200">
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#355E3B] flex items-center justify-center shrink-0 text-white shadow-xs">
            <Icon.Building />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#555C56]">Business / Project</p>
              <p className="text-[13px] font-bold text-[#355E3B] leading-snug truncate">{business?.name ?? 'All Businesses'}</p>
              <p className="text-[11px] text-[#555C56] leading-tight truncate">{business?.subtitle ?? 'Choose a business to set context'}</p>
            </div>
          )}
        </div>
        {!collapsed && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setSwitcherOpen(open => !open)}
              aria-expanded={switcherOpen}
              className="w-full text-left flex items-center justify-between text-[11px] border border-slate-200 text-[#2B2B2B] px-2.5 py-1.5 rounded-md hover:bg-[#edf5ef] transition-colors shadow-2xs font-medium"
            >
              <span>Switch Business</span>
              <Icon.ChevronDown />
            </button>
            {switcherOpen && (
              <div className="absolute top-full left-0 right-0 z-50 bg-white border border-slate-200 shadow-xl rounded-md mt-1 overflow-hidden">
                {ENTREPRENEUR_BUSINESSES.map(option => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      onSelectBusiness(option.id)
                      setSwitcherOpen(false)
                      closeMobile()
                      router.push(switchedDestination(option.id))
                    }}
                    className={`w-full text-left px-3 py-2 text-[12px] hover:bg-[#edf5ef] transition-colors ${
                      option.id === business?.id ? 'font-bold text-[#355E3B] bg-[#edf5ef]' : 'text-[#2B2B2B]'
                    }`}
                  >
                    <p className="font-semibold">{option.name}</p>
                    <p className="text-[10px] text-[#555C56]">{option.industry} · {option.location}</p>
                  </button>
                ))}
                <div className="border-t border-slate-100 bg-slate-50/50">
                  <Link
                    href={ENTREPRENEUR_ROUTES.businesses()}
                    onClick={() => { setSwitcherOpen(false); closeMobile() }}
                    className="block text-left px-3 py-2 text-[11px] text-[#3d7a4d] hover:bg-[#edf5ef] font-medium"
                  >
                    View All Businesses →
                  </Link>
                  <Link
                    href={ENTREPRENEUR_ROUTES.newBusiness()}
                    onClick={() => { setSwitcherOpen(false); closeMobile() }}
                    className="block text-left px-3 py-2 text-[11px] text-[#355E3B] hover:bg-[#edf5ef] font-bold"
                  >
                    + Create New Business
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-2.5 space-y-3" aria-label="Main navigation">
        <div>
          {!collapsed && (
            <p className="px-3.5 pt-1 pb-1 text-[10px] font-bold text-[#555C56] uppercase tracking-widest">Business</p>
          )}
          <Link
            href={ENTREPRENEUR_ROUTES.business(targetBusinessId)}
            onClick={closeMobile}
            aria-current={onOverview ? 'page' : undefined}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left border-l-[3px] text-[13px] transition-colors ${
              onOverview
                ? 'bg-[#edf5ef] text-[#355E3B] font-bold border-[#D4A017]'
                : 'text-[#2B2B2B] hover:bg-[#edf5ef] hover:text-[#355E3B] border-transparent font-medium'
            }`}
          >
            <span className={onOverview ? 'text-[#3d7a4d]' : 'text-[#555C56]'}><Icon.Grid /></span>
            {!collapsed && 'Overview'}
          </Link>
          <Link
            href={ENTREPRENEUR_ROUTES.businesses()}
            onClick={closeMobile}
            aria-current={onPortfolio ? 'page' : undefined}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left border-l-[3px] text-[13px] transition-colors ${
              onPortfolio
                ? 'bg-[#edf5ef] text-[#355E3B] font-bold border-[#D4A017]'
                : 'text-[#2B2B2B] hover:bg-[#edf5ef] hover:text-[#355E3B] border-transparent font-medium'
            }`}
          >
            <span className={onPortfolio ? 'text-[#3d7a4d]' : 'text-[#555C56]'}><Icon.Home /></span>
            {!collapsed && 'My Businesses'}
          </Link>
        </div>

        <div>
          {!collapsed && (
            <p className="px-3.5 pt-1 pb-1 text-[10px] font-bold text-[#555C56] uppercase tracking-widest">Approval Journey</p>
          )}
          <Link
            href={ENTREPRENEUR_ROUTES.knowYourApprovals(targetBusinessId)}
            onClick={closeMobile}
            aria-current={onApprovals ? 'page' : undefined}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left border-l-[3px] text-[13px] transition-colors ${
              onApprovals
                ? 'bg-[#edf5ef] text-[#355E3B] font-bold border-[#D4A017]'
                : 'text-[#2B2B2B] hover:bg-[#edf5ef] hover:text-[#355E3B] border-transparent font-medium'
            }`}
          >
            <span className={onApprovals ? 'text-[#3d7a4d]' : 'text-[#555C56]'}><Icon.CheckCircle /></span>
            {!collapsed && 'Know Your Approvals'}
          </Link>
          <Link
            href={ENTREPRENEUR_ROUTES.journey(targetBusinessId)}
            onClick={closeMobile}
            aria-current={onJourney ? 'page' : undefined}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left border-l-[3px] text-[13px] transition-colors ${
              onJourney
                ? 'bg-[#edf5ef] text-[#355E3B] font-bold border-[#D4A017]'
                : 'text-[#2B2B2B] hover:bg-[#edf5ef] hover:text-[#355E3B] border-transparent font-medium'
            }`}
          >
            <span className={onJourney ? 'text-[#3d7a4d]' : 'text-[#555C56]'}><Icon.List /></span>
            {!collapsed && 'Regulatory Journey'}
          </Link>
          <Link
            href={ENTREPRENEUR_ROUTES.applications(targetBusinessId)}
            onClick={closeMobile}
            aria-current={onApplications ? 'page' : undefined}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left border-l-[3px] text-[13px] transition-colors ${
              onApplications
                ? 'bg-[#edf5ef] text-[#355E3B] font-bold border-[#D4A017]'
                : 'text-[#2B2B2B] hover:bg-[#edf5ef] hover:text-[#355E3B] border-transparent font-medium'
            }`}
          >
            <span className={onApplications ? 'text-[#3d7a4d]' : 'text-[#555C56]'}><Icon.List /></span>
            {!collapsed && 'Applications'}
          </Link>
          <Link
            href={ENTREPRENEUR_ROUTES.documents(targetBusinessId)}
            onClick={closeMobile}
            aria-current={onDocuments ? 'page' : undefined}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left border-l-[3px] text-[13px] transition-colors ${
              onDocuments
                ? 'bg-[#edf5ef] text-[#355E3B] font-bold border-[#D4A017]'
                : 'text-[#2B2B2B] hover:bg-[#edf5ef] hover:text-[#355E3B] border-transparent font-medium'
            }`}
          >
            <span className={onDocuments ? 'text-[#3d7a4d]' : 'text-[#555C56]'}><Icon.List /></span>
            {!collapsed && 'Documents'}
          </Link>
        </div>

        {navGroups.map(group => (
          <div key={group.title}>
            {!collapsed && (
              <p className="px-3.5 pt-1 pb-1 text-[10px] font-bold text-[#555C56] uppercase tracking-widest">{group.title}</p>
            )}
            {group.items.map(item => {
              const isChangesActive = item.label === 'Changes & Expansion' && (
                pathname === ENTREPRENEUR_ROUTES.regulatoryChanges(targetBusinessId) ||
                pathname.startsWith(`${ENTREPRENEUR_ROUTES.regulatoryChanges(targetBusinessId)}/`)
              )
              const isIncentivesActive = item.label === 'Incentives' && (
                pathname === ENTREPRENEUR_ROUTES.incentiveClaims(targetBusinessId) ||
                pathname.startsWith(`${ENTREPRENEUR_ROUTES.incentiveClaims(targetBusinessId)}/`)
              )
              const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`) || isChangesActive || isIncentivesActive
              return (
                <Link
                  key={item.label}
                  href={item.path}
                  onClick={closeMobile}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left border-l-[3px] text-[13px] transition-colors ${
                    isActive
                      ? 'bg-[#edf5ef] text-[#355E3B] font-bold border-[#D4A017]'
                      : 'text-[#2B2B2B] hover:bg-[#edf5ef] hover:text-[#355E3B] border-transparent font-medium'
                  }`}
                >
                  <span className={isActive ? 'text-[#3d7a4d]' : 'text-[#555C56]'}><Icon.List /></span>
                  {!collapsed && item.label}
                </Link>
              )
            })}
          </div>
        ))}

        <div>
          {!collapsed && (
            <p className="px-3.5 pt-1 pb-1 text-[10px] font-bold text-[#555C56] uppercase tracking-widest">Support</p>
          )}
          <Link
            href={ENTREPRENEUR_ROUTES.grievances(targetBusinessId)}
            onClick={closeMobile}
            aria-current={pathname === ENTREPRENEUR_ROUTES.grievances(targetBusinessId) ? 'page' : undefined}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left border-l-[3px] text-[13px] transition-colors ${
              pathname === ENTREPRENEUR_ROUTES.grievances(targetBusinessId)
                ? 'bg-[#edf5ef] text-[#355E3B] font-bold border-[#D4A017]'
                : 'text-[#2B2B2B] hover:bg-[#edf5ef] hover:text-[#355E3B] border-transparent font-medium'
            }`}
          >
            <span className={pathname === ENTREPRENEUR_ROUTES.grievances(targetBusinessId) ? 'text-[#3d7a4d]' : 'text-[#555C56]'}><Icon.List /></span>
            {!collapsed && 'Grievances'}
          </Link>
          <Link
            href={ENTREPRENEUR_ROUTES.notifications()}
            onClick={closeMobile}
            aria-current={pathname === ENTREPRENEUR_ROUTES.notifications() ? 'page' : undefined}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left border-l-[3px] text-[13px] transition-colors ${
              pathname === ENTREPRENEUR_ROUTES.notifications()
                ? 'bg-[#edf5ef] text-[#355E3B] font-bold border-[#D4A017]'
                : 'text-[#2B2B2B] hover:bg-[#edf5ef] hover:text-[#355E3B] border-transparent font-medium'
            }`}
          >
            <span className={pathname === ENTREPRENEUR_ROUTES.notifications() ? 'text-[#3d7a4d]' : 'text-[#555C56]'}><Icon.List /></span>
            {!collapsed && 'Notifications'}
          </Link>
        </div>
      </nav>

      <div className="border-t border-slate-200 px-3 py-2 bg-slate-50/50">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-2 text-[12px] text-[#555C56] hover:text-[#355E3B] hover:bg-[#edf5ef] px-2.5 py-1.5 rounded-md transition-colors font-medium"
        >
          <Icon.ChevronLeft />
          {!collapsed && 'Collapse'}
        </button>
      </div>
    </div>
  )
}

export function AuthenticatedShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [authenticated, setAuthenticated] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [rememberedBusinessId, setRememberedBusinessId] = useState<string | null>(null)
  const { fontSizeClass, contrastClass, ...display } = useDisplayPreferences()
  const routeBusiness = businessFromEntrepreneurPathname(pathname)
  const rememberedBusiness = rememberedBusinessId ? findBusinessById(rememberedBusinessId) : undefined
  const currentBusiness = routeBusiness ?? rememberedBusiness ?? findBusinessById(SAHYADRI_DEMO_BUSINESS_ID)
  const currentProject = currentBusiness ? findBusinessProjectById(currentBusiness.id) : undefined
  const { openAssistant } = useRegulatoryAssistant()
  const assistantPageContext = React.useMemo(() => {
    const routeContext = entrepreneurPageContext(pathname, currentBusiness?.name)
    const context = currentBusiness
      ? {
          ...routeContext,
          entities: { ...routeContext.entities, businessId: routeContext.entities.businessId ?? currentBusiness.id },
          safeMetadata: { ...routeContext.safeMetadata, businessName: currentBusiness.name, projectName: currentProject?.subtitle },
        }
      : routeContext
    const businessId = context.entities.businessId
    if (!businessId) return context
    const entity = context.entities.requirementId ? findBusinessEntity('requirement', businessId, context.entities.requirementId)
      : context.entities.documentId ? findBusinessEntity('document', businessId, context.entities.documentId)
      : context.entities.applicationId ? findBusinessEntity('application', businessId, context.entities.applicationId)
      : context.entities.complianceId ? findBusinessEntity('compliance', businessId, context.entities.complianceId)
      : context.entities.incentiveId ? findBusinessEntity('incentive', businessId, context.entities.incentiveId)
      : context.entities.claimId ? findBusinessEntity('claim', businessId, context.entities.claimId)
      : context.entities.inspectionId ? findBusinessEntity('inspection', businessId, context.entities.inspectionId)
      : undefined
    return entity ? enrichAssistantContext(context, { recordTitle: entity.label }, entity.label) : context
  }, [pathname, currentBusiness, currentProject?.subtitle])

  useEffect(() => {
    if (sessionStorage.getItem('entrepreneur_demo_auth') !== 'true') {
      router.replace(ENTREPRENEUR_ROUTES.login())
    } else {
      setAuthenticated(true)
    }
  }, [router])

  useEffect(() => {
    if (routeBusiness) {
      rememberBusiness(sessionStorage, routeBusiness.id)
      setRememberedBusinessId(routeBusiness.id)
      return
    }

    const storedBusiness = readRememberedBusiness(sessionStorage)
    setRememberedBusinessId(storedBusiness?.id ?? null)
  }, [pathname, routeBusiness])

  if (!authenticated) return null

  const logout = () => {
    sessionStorage.removeItem('entrepreneur_demo_auth')
    setAuthenticated(false)
    router.replace('/')
  }

  const selectBusiness = (businessId: string) => {
    const selected = rememberBusiness(sessionStorage, businessId)
    if (selected) setRememberedBusinessId(selected.id)
  }

  return <div className={`entrepreneur-portal min-h-screen flex flex-col ${fontSizeClass} ${contrastClass}`} style={{ fontFamily: 'Noto Sans, Noto Sans Devanagari, system-ui, sans-serif' }}>
    <AccessibilityStrip {...display} />
    <PortalHeader isLoggedIn={true} setIsLoggedIn={value => { if (!value) logout() }} onGoToLogin={() => router.push(ENTREPRENEUR_ROUTES.login())} onGoToNotifications={() => router.push(ENTREPRENEUR_ROUTES.notifications())} onOpenRegAssistant={() => openAssistant({ origin: 'header', mode: 'global', context: globalAssistantContext(assistantPageContext) })} />
    <DemoNotice />
    <div className="lg:hidden flex items-center gap-3 px-4 py-2 bg-white border-b border-[#d6dfd5]">
      <button type="button" onClick={() => setMobileOpen(true)} className="flex items-center gap-2 text-xs text-[#355E3B] font-semibold hover:text-[#6DAE7C]" aria-label="Open navigation menu"><Icon.Menu />Menu</button>
    </div>
    <div className="flex flex-1 min-h-0 overflow-hidden">
      {mobileOpen && <button type="button" className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close navigation menu" />}
      <aside className={`fixed top-0 left-0 h-full z-50 bg-white border-r border-[#d6dfd5] w-64 transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 lg:h-auto lg:shrink-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} ${collapsed ? 'lg:w-12' : 'lg:w-60'}`} aria-label="Entrepreneur navigation">
        <Sidebar pathname={pathname} business={currentBusiness} onSelectBusiness={selectBusiness} closeMobile={() => setMobileOpen(false)} collapsed={collapsed} setCollapsed={setCollapsed} />
      </aside>
      <div className="flex-1 min-w-0 overflow-auto">
        <EntrepreneurContextBar pathname={pathname} business={currentBusiness} />
        {children}
      </div>
    </div>
    <Footer />
    <GlobalAssistantSurface pageContext={assistantPageContext} suppressed={mobileOpen || pathname.includes('/dependencies')} />
  </div>
}
