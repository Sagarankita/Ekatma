'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur'
import { ENTREPRENEUR_BUSINESSES, findBusinessById, findBusinessEntity, DEEP_SCREEN_BUSINESS_IDENTITY } from '../identity/catalog'
import { listGrievancesForBusiness } from '../grievances/data'
import { findTrackerAppForBusiness } from '../applications/data'
import { listInspectionsForBusiness } from '../applications/data'
import { listComplianceForBusiness } from '../compliance/data'
import { listIncentivesForBusiness } from '../incentives/data'
import { listJourneyNodesForBusiness } from '../journey/data'
import { listDocumentsForBusiness } from '../documents/data'
import { useDisplayPreferences } from '../appearance/useDisplayPreferences'
import { AccessibilityStrip, DemoNotice, Footer, Icon, PortalHeader } from '../public-auth/PublicChrome'

function Sidebar({ pathname, closeMobile, collapsed, setCollapsed }: {
  pathname: string
  closeMobile: () => void
  collapsed: boolean
  setCollapsed: (value: boolean) => void
}) {
  const router = useRouter()
  const [switcherOpen, setSwitcherOpen] = useState(false)
  const pathParts = pathname.split('/')
  const business = pathParts.length >= 4 && pathParts[1] === 'entrepreneur' && pathParts[2] === 'businesses' && pathParts[3] !== 'new'
    ? findBusinessById(pathParts[3])
    : undefined
  const onPortfolio = pathname === ENTREPRENEUR_ROUTES.businesses()
  const onOverview = Boolean(business && pathname === ENTREPRENEUR_ROUTES.business(business.id))
  const onJourney = Boolean(business && (
    pathname === ENTREPRENEUR_ROUTES.journey(business.id) ||
    pathname.startsWith(ENTREPRENEUR_ROUTES.journey(business.id) + '/') ||
    pathname.includes('/requirements/') ||
    pathname.includes('/dependencies')
  ))
  const onDocuments = Boolean(business && (
    pathname === ENTREPRENEUR_ROUTES.documents(business.id) ||
    pathname.startsWith(ENTREPRENEUR_ROUTES.documents(business.id) + '/')
  ))
  const onApplications = Boolean(business && (
    pathname === ENTREPRENEUR_ROUTES.applications(business.id) ||
    pathname.startsWith(ENTREPRENEUR_ROUTES.applications(business.id) + '/')
  ))
  const hasJourney = Boolean(business && listJourneyNodesForBusiness(business.id, false).length)
  const hasDocuments = Boolean(business && listDocumentsForBusiness(business.id).length)
  const availableGroups = [
    { title: 'Operations & Compliance', items: [
      { label: 'Compliance', path: business ? ENTREPRENEUR_ROUTES.compliance(business.id) : '', available: Boolean(business && listComplianceForBusiness(business.id).length) },
      { label: 'Inspections', path: business ? ENTREPRENEUR_ROUTES.inspections(business.id) : '', available: Boolean(business && listInspectionsForBusiness(business.id).length) },
      { label: 'Incentives', path: business ? ENTREPRENEUR_ROUTES.incentives(business.id) : '', available: Boolean(business && listIncentivesForBusiness(business.id).length) },
    ] },
    { title: 'Business Changes', items: [
      { label: 'Changes & Expansion', path: business ? ENTREPRENEUR_ROUTES.changes(business.id) : '', available: Boolean(business && findBusinessEntity('regulatory-change', business.id, 'RC-2026-001')) },
    ] },
  ]
  const hasGrievances = Boolean(business && listGrievancesForBusiness(business.id).length)
  const switchedDestination = (targetBusinessId: string): string => {
    if (!business) return ENTREPRENEUR_ROUTES.business(targetBusinessId)
    const currentApplications = ENTREPRENEUR_ROUTES.applications(business.id)
    if (pathname === currentApplications) return ENTREPRENEUR_ROUTES.applications(targetBusinessId)
    if (pathname.startsWith(`${currentApplications}/`)) {
      const applicationId = pathname.slice(currentApplications.length + 1).split('/')[0]
      if (findTrackerAppForBusiness(targetBusinessId, applicationId)) return ENTREPRENEUR_ROUTES.application(targetBusinessId, applicationId)
      return ENTREPRENEUR_ROUTES.applications(targetBusinessId)
    }

    const currentCompliance = ENTREPRENEUR_ROUTES.compliance(business.id)
    if (pathname === currentCompliance || pathname.startsWith(`${currentCompliance}/`)) {
      if (listComplianceForBusiness(targetBusinessId).length) {
        if (pathname.startsWith(`${currentCompliance}/`)) {
          const complianceId = pathname.slice(currentCompliance.length + 1).split('/')[0]
          if (findBusinessEntity('compliance', targetBusinessId, complianceId)) {
            return ENTREPRENEUR_ROUTES.complianceDetail(targetBusinessId, complianceId)
          }
        }
        return ENTREPRENEUR_ROUTES.compliance(targetBusinessId)
      }
      return ENTREPRENEUR_ROUTES.business(targetBusinessId)
    }

    const currentIncentives = ENTREPRENEUR_ROUTES.incentives(business.id)
    const currentClaims = ENTREPRENEUR_ROUTES.incentiveClaims(business.id)
    if (pathname === currentIncentives || pathname.startsWith(`${currentIncentives}/`) || pathname === currentClaims) {
      if (listIncentivesForBusiness(targetBusinessId).length) {
        if (pathname.startsWith(`${currentIncentives}/`)) {
          const incentiveId = pathname.slice(currentIncentives.length + 1).split('/')[0]
          if (findBusinessEntity('incentive', targetBusinessId, incentiveId)) {
            return ENTREPRENEUR_ROUTES.incentive(targetBusinessId, incentiveId)
          }
        }
        if (pathname === currentClaims) {
          return ENTREPRENEUR_ROUTES.incentiveClaims(targetBusinessId)
        }
        return ENTREPRENEUR_ROUTES.incentives(targetBusinessId)
      }
      return ENTREPRENEUR_ROUTES.business(targetBusinessId)
    }

    const currentDocuments = ENTREPRENEUR_ROUTES.documents(business.id)
    if (pathname === currentDocuments || pathname.startsWith(`${currentDocuments}/`)) {
      if (listDocumentsForBusiness(targetBusinessId).length) {
        if (pathname.startsWith(`${currentDocuments}/`)) {
          const documentId = pathname.slice(currentDocuments.length + 1).split('/')[0]
          if (findBusinessEntity('document', targetBusinessId, documentId)) {
            return ENTREPRENEUR_ROUTES.document(targetBusinessId, documentId)
          }
        }
        return ENTREPRENEUR_ROUTES.documents(targetBusinessId)
      }
      return ENTREPRENEUR_ROUTES.business(targetBusinessId)
    }

    const currentInspections = ENTREPRENEUR_ROUTES.inspections(business.id)
    if (pathname === currentInspections || pathname.startsWith(`${currentInspections}/`)) {
      if (listInspectionsForBusiness(targetBusinessId).length) {
        if (pathname.startsWith(`${currentInspections}/`)) {
          const inspectionId = pathname.slice(currentInspections.length + 1).split('/')[0]
          if (findBusinessEntity('inspection', targetBusinessId, inspectionId)) {
            return ENTREPRENEUR_ROUTES.inspection(targetBusinessId, inspectionId)
          }
        }
        return ENTREPRENEUR_ROUTES.inspections(targetBusinessId)
      }
      return ENTREPRENEUR_ROUTES.business(targetBusinessId)
    }

    const currentJourney = ENTREPRENEUR_ROUTES.journey(business.id)
    const currentDeps = ENTREPRENEUR_ROUTES.dependencies(business.id)
    const onJourneySection = pathname === currentJourney ||
      pathname.startsWith(`${currentJourney}/`) ||
      pathname === currentDeps ||
      pathname.includes('/requirements/')
    if (onJourneySection) {
      if (listJourneyNodesForBusiness(targetBusinessId, false).length) {
        if (pathname.includes('/requirements/')) {
          const parts = pathname.split('/requirements/')
          const reqId = parts[1]?.split('/')[0]
          if (reqId && findBusinessEntity('requirement', targetBusinessId, reqId)) {
            return ENTREPRENEUR_ROUTES.requirement(targetBusinessId, reqId)
          }
        }
        if (pathname === currentDeps) {
          return ENTREPRENEUR_ROUTES.dependencies(targetBusinessId)
        }
        return ENTREPRENEUR_ROUTES.journey(targetBusinessId)
      }
      return ENTREPRENEUR_ROUTES.business(targetBusinessId)
    }

    const currentDossier = ENTREPRENEUR_ROUTES.dossier(business.id)
    const currentProvenance = ENTREPRENEUR_ROUTES.provenance(business.id)
    if (pathname === currentDossier || pathname === currentProvenance) {
      if (DEEP_SCREEN_BUSINESS_IDENTITY.businessId === targetBusinessId) {
        if (pathname === currentProvenance) return ENTREPRENEUR_ROUTES.provenance(targetBusinessId)
        return ENTREPRENEUR_ROUTES.dossier(targetBusinessId)
      }
      return ENTREPRENEUR_ROUTES.business(targetBusinessId)
    }

    const currentChanges = ENTREPRENEUR_ROUTES.changes(business.id)
    const currentAmendments = ENTREPRENEUR_ROUTES.amendments(business.id)
    const currentRegChanges = ENTREPRENEUR_ROUTES.regulatoryChanges(business.id)
    if (pathname === currentChanges || pathname === currentAmendments || pathname === currentRegChanges) {
      if (findBusinessEntity('regulatory-change', targetBusinessId, 'RC-2026-001')) {
        if (pathname === currentAmendments) return ENTREPRENEUR_ROUTES.amendments(targetBusinessId)
        if (pathname === currentRegChanges) return ENTREPRENEUR_ROUTES.regulatoryChanges(targetBusinessId)
        return ENTREPRENEUR_ROUTES.changes(targetBusinessId)
      }
      return ENTREPRENEUR_ROUTES.business(targetBusinessId)
    }

    if (pathname === ENTREPRENEUR_ROUTES.grievances(business.id) && listGrievancesForBusiness(targetBusinessId).length) return ENTREPRENEUR_ROUTES.grievances(targetBusinessId)
    if (pathname === ENTREPRENEUR_ROUTES.profile(business.id)) return ENTREPRENEUR_ROUTES.profile(targetBusinessId)
    return ENTREPRENEUR_ROUTES.business(targetBusinessId)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-3 border-b border-[#d1d9e0]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 bg-[#1a3a5c] flex items-center justify-center shrink-0 text-white"><Icon.Building /></div>
          {!collapsed && <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold text-[#1a3a5c] leading-tight truncate">{business?.name ?? 'All Businesses'}</p>
            <p className="text-[10px] text-[#6b7a8d] leading-tight truncate">{business ? `${business.industry} · ${business.location}` : 'Choose a business to view its overview'}</p>
          </div>}
        </div>
        {!collapsed && <div className="relative">
          <button
            type="button"
            onClick={() => setSwitcherOpen(open => !open)}
            aria-expanded={switcherOpen}
            className="w-full text-left flex items-center justify-between text-[10px] border border-[#d1d9e0] text-[#475569] px-2 py-1 hover:bg-[#f1f5f9] transition-colors"
          >
            <span className="font-medium">Switch Business</span><Icon.ChevronDown />
          </button>
          {switcherOpen && <div className="absolute top-full left-0 right-0 z-50 bg-white border border-[#d1d9e0] shadow-lg mt-0.5">
            {ENTREPRENEUR_BUSINESSES.map(option => <button
              key={option.id}
              type="button"
              onClick={() => { setSwitcherOpen(false); closeMobile(); router.push(switchedDestination(option.id)) }}
              className={`w-full text-left px-3 py-2 text-[11px] hover:bg-[#f1f5f9] transition-colors ${option.id === business?.id ? 'font-semibold text-[#1a3a5c] bg-[#f0f4f8]' : 'text-[#374151]'}`}
            >
              <p className="font-medium">{option.name}</p>
              <p className="text-[10px] text-[#6b7a8d]">{option.industry} · {option.location}</p>
            </button>)}
            <div className="border-t border-[#e8edf2]">
              <Link href={ENTREPRENEUR_ROUTES.businesses()} onClick={() => { setSwitcherOpen(false); closeMobile() }} className="block text-left px-3 py-2 text-[11px] text-[#6b7a8d] hover:bg-[#f1f5f9]">View All Businesses →</Link>
              <Link href={ENTREPRENEUR_ROUTES.newBusiness()} onClick={() => { setSwitcherOpen(false); closeMobile() }} className="block text-left px-3 py-2 text-[11px] text-[#1a56db] hover:bg-[#ebf3ff] font-medium">+ Create New Business</Link>
            </div>
          </div>}
        </div>}
      </div>

      <nav className="flex-1 overflow-y-auto py-2" aria-label="Main navigation">
        <div className="mb-1">
          {!collapsed && <p className="px-3 pt-2 pb-1 text-[9px] font-bold text-[#9aa5b4] uppercase tracking-widest">Business</p>}
          {business ? (
            <Link
              href={ENTREPRENEUR_ROUTES.business(business.id)}
              onClick={closeMobile}
              aria-current={onOverview ? 'page' : undefined}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-left border-l-2 text-xs ${onOverview ? 'bg-[#ebf3ff] text-[#1a3a5c] font-semibold border-[#1a56db]' : 'text-[#475569] hover:bg-[#f8f9fb] border-transparent'}`}
            >
              <Icon.Grid />{!collapsed && 'Overview'}
            </Link>
          ) : (
            <span className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-[#94a3b8] border-l-2 border-transparent text-xs" aria-disabled="true">
              <Icon.Grid />{!collapsed && 'Overview'}
            </span>
          )}
          <Link
            href={ENTREPRENEUR_ROUTES.businesses()}
            onClick={closeMobile}
            aria-current={onPortfolio ? 'page' : undefined}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-left border-l-2 text-xs ${onPortfolio ? 'bg-[#ebf3ff] text-[#1a3a5c] font-semibold border-[#1a56db]' : 'text-[#475569] hover:bg-[#f8f9fb] border-transparent'}`}
          >
            <Icon.Home />{!collapsed && 'My Businesses'}
          </Link>
        </div>

        <div className="mb-1">
          {!collapsed && <p className="px-3 pt-2 pb-1 text-[9px] font-bold text-[#9aa5b4] uppercase tracking-widest">Approval Journey</p>}
          {business && hasJourney ? (
            <Link
              href={ENTREPRENEUR_ROUTES.journey(business.id)}
              onClick={closeMobile}
              aria-current={onJourney ? 'page' : undefined}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-left border-l-2 text-xs ${onJourney ? 'bg-[#ebf3ff] text-[#1a3a5c] font-semibold border-[#1a56db]' : 'text-[#475569] hover:bg-[#f8f9fb] border-transparent'}`}
            >
              <Icon.List />{!collapsed && 'Regulatory Journey'}
            </Link>
          ) : (
            <button type="button" disabled aria-disabled="true" title="Regulatory Journey is unavailable for this business" className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-[#94a3b8] border-l-2 border-transparent text-xs cursor-not-allowed">
              <Icon.List />{!collapsed && 'Regulatory Journey'}
            </button>
          )}
          {business ? (
            <Link
              href={ENTREPRENEUR_ROUTES.applications(business.id)}
              onClick={closeMobile}
              aria-current={onApplications ? 'page' : undefined}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-left border-l-2 text-xs ${onApplications ? 'bg-[#ebf3ff] text-[#1a3a5c] font-semibold border-[#1a56db]' : 'text-[#475569] hover:bg-[#f8f9fb] border-transparent'}`}
            >
              <Icon.List />{!collapsed && 'Applications'}
            </Link>
          ) : (
            <button type="button" disabled aria-disabled="true" title="Choose a business to view Applications" className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-[#94a3b8] border-l-2 border-transparent text-xs cursor-not-allowed">
              <Icon.List />{!collapsed && 'Applications'}
            </button>
          )}
          {business && hasDocuments ? (
            <Link
              href={ENTREPRENEUR_ROUTES.documents(business.id)}
              onClick={closeMobile}
              aria-current={onDocuments ? 'page' : undefined}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-left border-l-2 text-xs ${onDocuments ? 'bg-[#ebf3ff] text-[#1a3a5c] font-semibold border-[#1a56db]' : 'text-[#475569] hover:bg-[#f8f9fb] border-transparent'}`}
            >
              <Icon.List />{!collapsed && 'Documents'}
            </Link>
          ) : (
            <button type="button" disabled aria-disabled="true" title="Documents are unavailable for this business" className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-[#94a3b8] border-l-2 border-transparent text-xs cursor-not-allowed">
              <Icon.List />{!collapsed && 'Documents'}
            </button>
          )}
        </div>

        {availableGroups.map(group => <div key={group.title} className="mb-1">
          {!collapsed && <p className="px-3 pt-2 pb-1 text-[9px] font-bold text-[#9aa5b4] uppercase tracking-widest">{group.title}</p>}
          {group.items.map(item => {
            const isChangesActive = item.label === 'Changes & Expansion' && Boolean(
              business && (
                pathname === ENTREPRENEUR_ROUTES.regulatoryChanges(business.id) ||
                pathname.startsWith(`${ENTREPRENEUR_ROUTES.regulatoryChanges(business.id)}/`)
              )
            );
            const isIncentivesActive = item.label === 'Incentives' && Boolean(
              business && (
                pathname === ENTREPRENEUR_ROUTES.incentiveClaims(business.id) ||
                pathname.startsWith(`${ENTREPRENEUR_ROUTES.incentiveClaims(business.id)}/`)
              )
            );
            const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`) || isChangesActive || isIncentivesActive;
            return item.available
              ? <Link key={item.label} href={item.path} onClick={closeMobile} aria-current={isActive ? 'page' : undefined} className={`w-full flex items-center gap-2.5 px-3 py-2 text-left border-l-2 text-xs ${isActive ? 'bg-[#ebf3ff] text-[#1a3a5c] font-semibold border-[#1a56db]' : 'text-[#475569] hover:bg-[#f8f9fb] border-transparent'}`}><Icon.List />{!collapsed && item.label}</Link>
              : <button key={item.label} type="button" disabled aria-disabled="true" title={`${item.label} has no verified records for this business`} className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-[#94a3b8] border-l-2 border-transparent text-xs cursor-not-allowed"><Icon.List />{!collapsed && item.label}</button>;
          })}
        </div>)}
        <div className="mb-1">
          {!collapsed && <p className="px-3 pt-2 pb-1 text-[9px] font-bold text-[#9aa5b4] uppercase tracking-widest">Support</p>}
          {business && hasGrievances ? <Link href={ENTREPRENEUR_ROUTES.grievances(business.id)} onClick={closeMobile} aria-current={pathname === ENTREPRENEUR_ROUTES.grievances(business.id) ? 'page' : undefined} className={`w-full flex items-center gap-2.5 px-3 py-2 text-left border-l-2 text-xs ${pathname === ENTREPRENEUR_ROUTES.grievances(business.id) ? 'bg-[#ebf3ff] text-[#1a3a5c] font-semibold border-[#1a56db]' : 'border-transparent text-[#475569] hover:bg-[#f8f9fb]'}`}><Icon.List />{!collapsed && 'Grievances'}</Link> : <button type="button" disabled aria-disabled="true" title="No grievances for this business" className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-[#94a3b8] border-l-2 border-transparent text-xs cursor-not-allowed"><Icon.List />{!collapsed && 'Grievances'}</button>}
          <Link href={ENTREPRENEUR_ROUTES.assistant()} onClick={closeMobile} aria-current={pathname === ENTREPRENEUR_ROUTES.assistant() ? 'page' : undefined} className="w-full flex items-center gap-2.5 px-3 py-2 text-left border-l-2 border-transparent text-xs text-[#475569] hover:bg-[#f8f9fb]"><Icon.List />{!collapsed && 'Regulatory Assistant'}</Link>
          <Link href={ENTREPRENEUR_ROUTES.notifications()} onClick={closeMobile} aria-current={pathname === ENTREPRENEUR_ROUTES.notifications() ? 'page' : undefined} className="w-full flex items-center gap-2.5 px-3 py-2 text-left border-l-2 border-transparent text-xs text-[#475569] hover:bg-[#f8f9fb]"><Icon.List />{!collapsed && 'Notifications'}</Link>
        </div>
      </nav>
      <div className="border-t border-[#e8edf2] px-2 py-2">
        <button type="button" onClick={() => setCollapsed(!collapsed)} className="w-full flex items-center gap-2 text-[11px] text-[#6b7a8d] hover:text-[#1a3a5c] hover:bg-[#f8f9fb] px-2 py-1.5 transition-colors"><Icon.ChevronLeft />{!collapsed && 'Collapse'}</button>
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
  const { fontSizeClass, contrastClass, ...display } = useDisplayPreferences()

  useEffect(() => {
    if (sessionStorage.getItem('entrepreneur_demo_auth') !== 'true') {
      router.replace(ENTREPRENEUR_ROUTES.login())
    } else {
      setAuthenticated(true)
    }
  }, [router])

  if (!authenticated) return null

  const logout = () => {
    sessionStorage.removeItem('entrepreneur_demo_auth')
    setAuthenticated(false)
    router.replace('/')
  }

  return <div className={`min-h-screen flex flex-col ${fontSizeClass} ${contrastClass}`} style={{ fontFamily: 'Noto Sans, Noto Sans Devanagari, system-ui, sans-serif' }}>
    <AccessibilityStrip {...display} />
    <PortalHeader isLoggedIn={true} setIsLoggedIn={value => { if (!value) logout() }} onGoToLogin={() => router.push(ENTREPRENEUR_ROUTES.login())} onGoToNotifications={() => router.push(ENTREPRENEUR_ROUTES.notifications())} onOpenRegAssistant={() => router.push(ENTREPRENEUR_ROUTES.assistant())} />
    <DemoNotice />
    <div className="lg:hidden flex items-center gap-3 px-4 py-2 bg-white border-b border-[#d1d9e0]">
      <button type="button" onClick={() => setMobileOpen(true)} className="flex items-center gap-2 text-xs text-[#1a3a5c] font-semibold hover:text-[#1a56db]" aria-label="Open navigation menu"><Icon.Menu />Menu</button>
    </div>
    <div className="flex flex-1 min-h-0 overflow-hidden">
      {mobileOpen && <button type="button" className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close navigation menu" />}
      <aside className={`fixed top-0 left-0 h-full z-50 bg-white border-r border-[#d1d9e0] w-64 transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 lg:h-auto lg:shrink-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} ${collapsed ? 'lg:w-12' : 'lg:w-60'}`} aria-label="Entrepreneur navigation">
        <Sidebar pathname={pathname} closeMobile={() => setMobileOpen(false)} collapsed={collapsed} setCollapsed={setCollapsed} />
      </aside>
      <div className="flex-1 min-w-0 overflow-auto">{children}</div>
    </div>
    <Footer />
  </div>
}
