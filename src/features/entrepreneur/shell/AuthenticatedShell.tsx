'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur'
import { ENTREPRENEUR_BUSINESSES, findBusinessById, findBusinessEntity, DEEP_SCREEN_BUSINESS_IDENTITY, type EntrepreneurBusinessIdentity } from '../identity/catalog'
import { businessFromEntrepreneurPathname, readRememberedBusiness, rememberBusiness } from '../identity/selected-business'
import { listGrievancesForBusiness } from '../grievances/data'
import { findTrackerAppForBusiness } from '../applications/data'
import { listInspectionsForBusiness } from '../applications/data'
import { listComplianceForBusiness } from '../compliance/data'
import { listIncentivesForBusiness } from '../incentives/data'
import { getIncentiveClaims, getIncentiveDetailSchemes } from '../incentives/workspace/data'
import { listJourneyNodesForBusiness } from '../journey/data'
import { listDocumentsForBusiness } from '../documents/data'
import { useDisplayPreferences } from '../appearance/useDisplayPreferences'
import { AccessibilityStrip, DemoNotice, Footer, Icon, PortalHeader } from '../public-auth/PublicChrome'
import { useRegulatoryAssistant } from '@/features/regulatory-assistant/Provider'
import { enrichAssistantContext, entrepreneurPageContext, globalAssistantContext } from '@/features/regulatory-assistant/context'
import { GlobalAssistantSurface } from '@/features/regulatory-assistant/GlobalAssistant'

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
  const targetBusinessId = business?.id || ENTREPRENEUR_BUSINESSES[0]?.id || 'BP-004';

  const onPortfolio = pathname === ENTREPRENEUR_ROUTES.businesses()
  const onOverview = pathname === ENTREPRENEUR_ROUTES.business(targetBusinessId)
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
          <div className="w-8 h-8 rounded-lg bg-[#17365D] flex items-center justify-center shrink-0 text-white shadow-xs">
            <Icon.Building />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold text-[#17365D] leading-snug truncate">{business?.name ?? 'All Businesses'}</p>
              <p className="text-[11px] text-[#5C6470] leading-tight truncate">
                {business ? `${business.industry} · ${business.location}` : 'Choose a business to view overview'}
              </p>
            </div>
          )}
        </div>
        {!collapsed && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setSwitcherOpen(open => !open)}
              aria-expanded={switcherOpen}
              className="w-full text-left flex items-center justify-between text-[11px] border border-slate-200 text-[#20242A] px-2.5 py-1.5 rounded-md hover:bg-[#F0F5FA] transition-colors shadow-2xs font-medium"
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
                    className={`w-full text-left px-3 py-2 text-[12px] hover:bg-[#F0F5FA] transition-colors ${
                      option.id === business?.id ? 'font-bold text-[#17365D] bg-[#EBF3FA]' : 'text-[#20242A]'
                    }`}
                  >
                    <p className="font-semibold">{option.name}</p>
                    <p className="text-[10px] text-[#5C6470]">{option.industry} · {option.location}</p>
                  </button>
                ))}
                <div className="border-t border-slate-100 bg-slate-50/50">
                  <Link
                    href={ENTREPRENEUR_ROUTES.businesses()}
                    onClick={() => { setSwitcherOpen(false); closeMobile() }}
                    className="block text-left px-3 py-2 text-[11px] text-[#245B8A] hover:bg-[#EBF3FA] font-medium"
                  >
                    View All Businesses →
                  </Link>
                  <Link
                    href={ENTREPRENEUR_ROUTES.newBusiness()}
                    onClick={() => { setSwitcherOpen(false); closeMobile() }}
                    className="block text-left px-3 py-2 text-[11px] text-[#17365D] hover:bg-[#EBF3FA] font-bold"
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
            <p className="px-3.5 pt-1 pb-1 text-[10px] font-bold text-[#5C6470] uppercase tracking-widest">Business</p>
          )}
          <Link
            href={ENTREPRENEUR_ROUTES.business(targetBusinessId)}
            onClick={closeMobile}
            aria-current={onOverview ? 'page' : undefined}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left border-l-[3px] text-[13px] transition-colors ${
              onOverview
                ? 'bg-[#EBF3FA] text-[#17365D] font-bold border-[#E68A2E]'
                : 'text-[#20242A] hover:bg-[#F0F5FA] hover:text-[#17365D] border-transparent font-medium'
            }`}
          >
            <span className={onOverview ? 'text-[#245B8A]' : 'text-[#5C6470]'}><Icon.Grid /></span>
            {!collapsed && 'Overview'}
          </Link>
          <Link
            href={ENTREPRENEUR_ROUTES.businesses()}
            onClick={closeMobile}
            aria-current={onPortfolio ? 'page' : undefined}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left border-l-[3px] text-[13px] transition-colors ${
              onPortfolio
                ? 'bg-[#EBF3FA] text-[#17365D] font-bold border-[#E68A2E]'
                : 'text-[#20242A] hover:bg-[#F0F5FA] hover:text-[#17365D] border-transparent font-medium'
            }`}
          >
            <span className={onPortfolio ? 'text-[#245B8A]' : 'text-[#5C6470]'}><Icon.Home /></span>
            {!collapsed && 'My Businesses'}
          </Link>
        </div>

        <div>
          {!collapsed && (
            <p className="px-3.5 pt-1 pb-1 text-[10px] font-bold text-[#5C6470] uppercase tracking-widest">Approval Journey</p>
          )}
          <Link
            href={ENTREPRENEUR_ROUTES.journey(targetBusinessId)}
            onClick={closeMobile}
            aria-current={onJourney ? 'page' : undefined}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left border-l-[3px] text-[13px] transition-colors ${
              onJourney
                ? 'bg-[#EBF3FA] text-[#17365D] font-bold border-[#E68A2E]'
                : 'text-[#20242A] hover:bg-[#F0F5FA] hover:text-[#17365D] border-transparent font-medium'
            }`}
          >
            <span className={onJourney ? 'text-[#245B8A]' : 'text-[#5C6470]'}><Icon.List /></span>
            {!collapsed && 'Regulatory Journey'}
          </Link>
          <Link
            href={ENTREPRENEUR_ROUTES.applications(targetBusinessId)}
            onClick={closeMobile}
            aria-current={onApplications ? 'page' : undefined}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left border-l-[3px] text-[13px] transition-colors ${
              onApplications
                ? 'bg-[#EBF3FA] text-[#17365D] font-bold border-[#E68A2E]'
                : 'text-[#20242A] hover:bg-[#F0F5FA] hover:text-[#17365D] border-transparent font-medium'
            }`}
          >
            <span className={onApplications ? 'text-[#245B8A]' : 'text-[#5C6470]'}><Icon.List /></span>
            {!collapsed && 'Applications'}
          </Link>
          <Link
            href={ENTREPRENEUR_ROUTES.documents(targetBusinessId)}
            onClick={closeMobile}
            aria-current={onDocuments ? 'page' : undefined}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left border-l-[3px] text-[13px] transition-colors ${
              onDocuments
                ? 'bg-[#EBF3FA] text-[#17365D] font-bold border-[#E68A2E]'
                : 'text-[#20242A] hover:bg-[#F0F5FA] hover:text-[#17365D] border-transparent font-medium'
            }`}
          >
            <span className={onDocuments ? 'text-[#245B8A]' : 'text-[#5C6470]'}><Icon.List /></span>
            {!collapsed && 'Documents'}
          </Link>
        </div>

        {navGroups.map(group => (
          <div key={group.title}>
            {!collapsed && (
              <p className="px-3.5 pt-1 pb-1 text-[10px] font-bold text-[#5C6470] uppercase tracking-widest">{group.title}</p>
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
                      ? 'bg-[#EBF3FA] text-[#17365D] font-bold border-[#E68A2E]'
                      : 'text-[#20242A] hover:bg-[#F0F5FA] hover:text-[#17365D] border-transparent font-medium'
                  }`}
                >
                  <span className={isActive ? 'text-[#245B8A]' : 'text-[#5C6470]'}><Icon.List /></span>
                  {!collapsed && item.label}
                </Link>
              )
            })}
          </div>
        ))}

        <div>
          {!collapsed && (
            <p className="px-3.5 pt-1 pb-1 text-[10px] font-bold text-[#5C6470] uppercase tracking-widest">Support</p>
          )}
          <Link
            href={ENTREPRENEUR_ROUTES.grievances(targetBusinessId)}
            onClick={closeMobile}
            aria-current={pathname === ENTREPRENEUR_ROUTES.grievances(targetBusinessId) ? 'page' : undefined}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left border-l-[3px] text-[13px] transition-colors ${
              pathname === ENTREPRENEUR_ROUTES.grievances(targetBusinessId)
                ? 'bg-[#EBF3FA] text-[#17365D] font-bold border-[#E68A2E]'
                : 'text-[#20242A] hover:bg-[#F0F5FA] hover:text-[#17365D] border-transparent font-medium'
            }`}
          >
            <span className={pathname === ENTREPRENEUR_ROUTES.grievances(targetBusinessId) ? 'text-[#245B8A]' : 'text-[#5C6470]'}><Icon.List /></span>
            {!collapsed && 'Grievances'}
          </Link>
          <Link
            href={ENTREPRENEUR_ROUTES.assistant()}
            onClick={closeMobile}
            aria-current={pathname === ENTREPRENEUR_ROUTES.assistant() ? 'page' : undefined}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left border-l-[3px] text-[13px] transition-colors ${
              pathname === ENTREPRENEUR_ROUTES.assistant()
                ? 'bg-[#EBF3FA] text-[#17365D] font-bold border-[#E68A2E]'
                : 'text-[#20242A] hover:bg-[#F0F5FA] hover:text-[#17365D] border-transparent font-medium'
            }`}
          >
            <span className={pathname === ENTREPRENEUR_ROUTES.assistant() ? 'text-[#245B8A]' : 'text-[#5C6470]'}><Icon.List /></span>
            {!collapsed && 'Regulatory Assistant'}
          </Link>
          <Link
            href={ENTREPRENEUR_ROUTES.notifications()}
            onClick={closeMobile}
            aria-current={pathname === ENTREPRENEUR_ROUTES.notifications() ? 'page' : undefined}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left border-l-[3px] text-[13px] transition-colors ${
              pathname === ENTREPRENEUR_ROUTES.notifications()
                ? 'bg-[#EBF3FA] text-[#17365D] font-bold border-[#E68A2E]'
                : 'text-[#20242A] hover:bg-[#F0F5FA] hover:text-[#17365D] border-transparent font-medium'
            }`}
          >
            <span className={pathname === ENTREPRENEUR_ROUTES.notifications() ? 'text-[#245B8A]' : 'text-[#5C6470]'}><Icon.List /></span>
            {!collapsed && 'Notifications'}
          </Link>
        </div>
      </nav>

      <div className="border-t border-slate-200 px-3 py-2 bg-slate-50/50">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-2 text-[12px] text-[#5C6470] hover:text-[#17365D] hover:bg-[#F0F5FA] px-2.5 py-1.5 rounded-md transition-colors font-medium"
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
  const currentBusiness = routeBusiness ?? rememberedBusiness
  const { openAssistant } = useRegulatoryAssistant()
  const assistantPageContext = React.useMemo(() => {
    const context = entrepreneurPageContext(pathname, currentBusiness?.name)
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
  }, [pathname, currentBusiness?.name])

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

  return <div className={`min-h-screen flex flex-col ${fontSizeClass} ${contrastClass}`} style={{ fontFamily: 'Noto Sans, Noto Sans Devanagari, system-ui, sans-serif' }}>
    <AccessibilityStrip {...display} />
    <PortalHeader isLoggedIn={true} setIsLoggedIn={value => { if (!value) logout() }} onGoToLogin={() => router.push(ENTREPRENEUR_ROUTES.login())} onGoToNotifications={() => router.push(ENTREPRENEUR_ROUTES.notifications())} onOpenRegAssistant={() => openAssistant({ origin: 'header', mode: 'global', context: globalAssistantContext(assistantPageContext) })} />
    <DemoNotice />
    <div className="lg:hidden flex items-center gap-3 px-4 py-2 bg-white border-b border-[#d1d9e0]">
      <button type="button" onClick={() => setMobileOpen(true)} className="flex items-center gap-2 text-xs text-[#1a3a5c] font-semibold hover:text-[#1a56db]" aria-label="Open navigation menu"><Icon.Menu />Menu</button>
    </div>
    <div className="flex flex-1 min-h-0 overflow-hidden">
      {mobileOpen && <button type="button" className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close navigation menu" />}
      <aside className={`fixed top-0 left-0 h-full z-50 bg-white border-r border-[#d1d9e0] w-64 transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 lg:h-auto lg:shrink-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} ${collapsed ? 'lg:w-12' : 'lg:w-60'}`} aria-label="Entrepreneur navigation">
        <Sidebar pathname={pathname} business={currentBusiness} onSelectBusiness={selectBusiness} closeMobile={() => setMobileOpen(false)} collapsed={collapsed} setCollapsed={setCollapsed} />
      </aside>
      <div className="flex-1 min-w-0 overflow-auto">{children}</div>
    </div>
    <Footer />
    <GlobalAssistantSurface pageContext={assistantPageContext} suppressed={mobileOpen || pathname.includes('/dependencies')} />
  </div>
}
