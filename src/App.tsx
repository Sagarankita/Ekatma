import { useState, useEffect } from 'react'
import Link from "next/link"
import { LoginState, Service, AdaptiveState, DnaHistoryEntry, DnaConsistencyEntry, DnaField, DnaSection, EventCategory, EventSource, TimelineEvent, PreCheckResult, PreCheck, PreCheckGroup, ScrutinyFactor, OfficerReviewState, ScrutinyParam, ScrutinySection, ConsistencyStatus, ConsistencyRow, ConsistencyField, MismatchLifecycle, DepNodeStatus, DepNode, DefStatus, Deficiency, ScrutinyApp, ScrutinyModule, DeltaTab, ReviewStatus, ChangedItem, AffectedItem, UnchangedItem, InspStatus, InspRow, PlanStatus, CalendarView, InspOutcome, CheckStatus, CheckItem, ObsRecord, ObsState, M24Event, SyncEvent, ComplianceObligation, ChangeField, QueryRecord } from '@/domain/types';
import { QUEUE_APPS, Q_TABS, SERVICES, TIMING_BREAKDOWN, APP_SAMPLE, APP_FLAGS, APP_DEPS, APP_TIMELINE, DNA_SNAPSHOT, APP_TABS, M10_APP, M14_SECTIONS, M14_IDENTITY_PARAMS, M14_BUILDING_PARAMS, M14_PREREQ_DOCS, M14_TECH_DOCS, M14_CONDITIONAL_DOCS, M14_CONSISTENCY, M14_DEPS, M15_SECTIONS, M15_WATER_PARAMS, M15_DOCS, M15_DEPS, M15_CONSISTENCY, M16_CATEGORIES, M17_PREREQUISITES, M18_CATEGORIES, WORKFLOW_STAGES, M22_SLOTS, M22_CHECKLIST, BEFORE_NODES, AFTER_NODES, M30_SLA_ROWS, M31_GRIEVANCES, M31_TIMELINE, M39_NOTIFICATIONS, M32_SOURCES, M32_CONVERSATION, M32_CHIPS, M33_CHANGES, M34_APPS, M35_FUNNEL, M35_TREND_DATA, M36_BREAKDOWN, M38_EVENTS } from '@/data/fixtures/data';


import { createContext, useContext } from 'react';
export const MonolithContext = createContext<any>({});

export function useMonolithData() {
  const ctx = useContext(MonolithContext);
  return {
    APP_SAMPLE: ctx.APP_SAMPLE || APP_SAMPLE,
    M14_SECTIONS: ctx.M14_SECTIONS || M14_SECTIONS,
    M15_SECTIONS: ctx.M15_SECTIONS || M15_SECTIONS
  };
}

// ─── Icons ───────────────────────────────────────────────────────────────────
export const Icon = {
  Search: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
  ),
  Bell: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
  ),
  Help: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
  ),
  User: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  ),
  ChevronDown: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  ),
  Menu: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  AlertCircle: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
  ),
  Info: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
  ),
  Warning: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
  ),
  X: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
  Home: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  Grid: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
  ),
  Layers: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
  ),
  List: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
  ),
  BarChart: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
  ),
  Settings: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  LogOut: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
  ),
  Upload: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
  ),
  Loader: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
  ),
  ChevronLeft: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
  ),
  Shield: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  ),
}

// ─── Accessibility Strip ──────────────────────────────────────────────────────
export function AccessibilityStrip({ lang, setLang, fontSize, setFontSize, highContrast, setHighContrast }: {
  lang: 'en' | 'mr', setLang: (l: 'en' | 'mr') => void
  fontSize: 'sm' | 'md' | 'lg', setFontSize: (s: 'sm' | 'md' | 'lg') => void
  highContrast: boolean, setHighContrast: (v: boolean) => void
}) {
  return (
    <div className="bg-[#0f2540] text-white text-xs" role="navigation" aria-label="Accessibility and language options">
      <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between h-8">
        <div className="flex items-center gap-2">
          <span className="font-medium">Government of Maharashtra</span>
          <span className="text-white/40">|</span>
          <span style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>महाराष्ट्र शासन</span>
        </div>
        <div className="flex items-center gap-1 text-white/80">
          <a href="#main-content" className="skip-link">Skip to Main Content</a>
          <button className="px-2 py-0.5 hover:text-white hover:underline transition-colors">Skip to Main Content</button>
          <span className="text-white/30">|</span>
          <button className="px-2 py-0.5 hover:text-white hover:underline transition-colors">Screen Reader Access</button>
          <span className="text-white/30">|</span>
          <span className="flex items-center gap-0.5">
            <button onClick={() => setFontSize('sm')} className={`px-1.5 py-0.5 rounded transition-colors text-[10px] ${fontSize === 'sm' ? 'bg-white text-[#0f2540] font-bold' : 'hover:text-white'}`} aria-label="Decrease font size" aria-pressed={fontSize === 'sm'}>A−</button>
            <button onClick={() => setFontSize('md')} className={`px-1.5 py-0.5 rounded transition-colors text-xs ${fontSize === 'md' ? 'bg-white text-[#0f2540] font-bold' : 'hover:text-white'}`} aria-label="Default font size" aria-pressed={fontSize === 'md'}>A</button>
            <button onClick={() => setFontSize('lg')} className={`px-1.5 py-0.5 rounded transition-colors text-sm ${fontSize === 'lg' ? 'bg-white text-[#0f2540] font-bold' : 'hover:text-white'}`} aria-label="Increase font size" aria-pressed={fontSize === 'lg'}>A+</button>
          </span>
          <span className="text-white/30">|</span>
          <button onClick={() => setHighContrast(!highContrast)} className={`px-2 py-0.5 rounded transition-colors ${highContrast ? 'bg-yellow-400 text-black font-semibold' : 'hover:text-white'}`} aria-pressed={highContrast}>High Contrast</button>
          <span className="text-white/30">|</span>
          <button onClick={() => setLang('en')} className={`px-2 py-0.5 rounded transition-colors ${lang === 'en' ? 'bg-white text-[#0f2540] font-semibold' : 'hover:text-white'}`} aria-pressed={lang === 'en'}>English</button>
          <button onClick={() => setLang('mr')} className={`px-2 py-0.5 rounded transition-colors ${lang === 'mr' ? 'bg-white text-[#0f2540] font-semibold' : 'hover:text-white'}`} aria-pressed={lang === 'mr'}>मराठी</button>
          <span className="text-white/30">|</span>
          <button className="px-2 py-0.5 hover:text-white hover:underline transition-colors">Sitemap</button>
        </div>
      </div>
    </div>
  )
}

// ─── Portal Header ────────────────────────────────────────────────────────────
export function PortalHeader({ isLoggedIn, setIsLoggedIn }: { isLoggedIn: boolean, setIsLoggedIn: (v: boolean) => void }) {
  return (
    <header className="bg-white border-b border-[#d1d9e0] shadow-sm" role="banner">
      <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between py-3 gap-8">
        {/* Identity block */}
        <div className="flex items-center gap-6">
          {/* National Emblem placeholder */}
          <div className="flex flex-col items-center gap-0.5 shrink-0">
            <img src="/assets/india-emblem.png" alt="National Emblem of India" className="h-14 w-auto object-contain" />
            <span className="text-[9px] text-[#4a5568] font-medium tracking-wide leading-none" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>सत्यमेव जयते</span>
          </div>
          <div className="w-px h-12 bg-[#d1d9e0]" aria-hidden="true" />
          {/* Maharashtra Seal placeholder */}
          <div className="flex flex-col items-center gap-0.5 shrink-0">
            <img src="/assets/maha-seal.png" alt="Government of Maharashtra seal" className="h-12 w-auto object-contain" />
            <span className="text-[9px] text-[#4a5568] font-medium tracking-wide leading-none text-center">Govt. of Maharashtra</span>
          </div>
          <div className="w-px h-12 bg-[#d1d9e0]" aria-hidden="true" />
          {/* Portal identity */}
          <div className="flex items-center gap-3">
            <img src="/assets/ekatma-logo.png" alt="Ekatma portal logo" className="h-10 w-auto object-contain" />
            <div>
              <div className="text-[#1a3a5c] font-bold text-base leading-tight">EKATMA</div>
              <div className="text-[#4a5568] text-[11px] leading-tight">Government of Maharashtra Portal</div>
              <div className="text-[#4a5568] text-[10px] leading-tight" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>महाराष्ट्र शासन पोर्टल</div>
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <input type="search" placeholder="Search…" aria-label="Search" className="pl-9 pr-4 py-2 text-sm border border-[#d1d9e0] rounded bg-[#f8f9fb] focus:outline-none focus:ring-2 focus:ring-[#1a56db] w-56 placeholder:text-[#9aa5b4]" />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#374151]"><Icon.Search /></span>
          </div>
          <button aria-label="Help" className="p-2 rounded hover:bg-[#f0f4f8] text-[#4a5568] hover:text-[#1a3a5c] transition-colors"><Icon.Help /></button>
          {isLoggedIn && (
            <button aria-label="Notifications" className="p-2 rounded hover:bg-[#f0f4f8] text-[#4a5568] hover:text-[#1a3a5c] transition-colors relative">
              <Icon.Bell />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" aria-label="New notifications"></span>
            </button>
          )}
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 pl-2 border-l border-[#d1d9e0]">
                <div className="w-8 h-8 rounded-full bg-[#1a3a5c] text-white flex items-center justify-center text-sm font-semibold">U</div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-[#1a2533] leading-none">User Name</div>
                  <div className="text-[11px] text-[#1a2533] leading-none mt-0.5">User Role</div>
                </div>
              </div>
              <button onClick={() => setIsLoggedIn(false)} className="p-2 rounded hover:bg-[#f0f4f8] text-[#4a5568] hover:text-[#1a3a5c] transition-colors" aria-label="Log out"><Icon.LogOut /></button>
            </div>
          ) : (
            <button onClick={() => setIsLoggedIn(true)} className="flex items-center gap-2 bg-[#1a3a5c] text-white text-sm font-medium px-4 py-2 rounded hover:bg-[#0f2540] transition-colors focus:ring-2 focus:ring-[#1a56db] focus:ring-offset-2">
              <Icon.User />
              Login / Register
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

// ─── Primary Navigation ────────────────────────────────────────────────────────
const navItems = [
  { id: 'nav-home', label: 'Home', icon: Icon.Home },
  { id: 'nav-1', label: 'Navigation Item', icon: Icon.Grid },
  { id: 'nav-2', label: 'Navigation Item', icon: Icon.Layers },
  { id: 'nav-3', label: 'Navigation Item', icon: Icon.List },
  { id: 'nav-4', label: 'Navigation Item', icon: Icon.BarChart },
  { id: 'nav-5', label: 'Navigation Section', icon: Icon.Grid },
  { id: 'nav-6', label: 'Navigation Section', icon: Icon.Help },
  { id: 'nav-7', label: 'Navigation Section', icon: Icon.Settings },
  { id: 'nav-m01', label: 'M01 — Dept Login', icon: Icon.Shield },
]

function PrimaryNav({ activeNav, setActiveNav }: { activeNav: string, setActiveNav: (n: string) => void }) {
  return (
    <nav className="bg-[#1a3a5c] text-white" role="navigation" aria-label="Primary navigation">
      <div className="max-w-[1440px] mx-auto px-6">
        <ul className="flex items-center gap-0 overflow-x-auto" role="list">
          {navItems.map(item => (
            <li key={item.id} role="none">
              <button
                role="menuitem"
                onClick={() => setActiveNav(item.id)}
                className={`flex items-center gap-1.5 px-3 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset
                  ${activeNav === item.id
                    ? 'border-[#f5c842] text-white bg-white/10'
                    : 'border-transparent text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                aria-current={activeNav === item.id ? 'page' : undefined}
              >
                <span aria-hidden="true"><item.icon /></span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const sidebarItems = [
  { id: 'side-home', label: 'Overview', icon: Icon.Home },
  { id: 'side-section-a', label: 'Section A', icon: Icon.Grid,
    children: [
      { id: 'side-a-1', label: 'Sidebar Item' },
      { id: 'side-a-2', label: 'Sidebar Item' },
      { id: 'side-a-3', label: 'Sidebar Item' },
      { id: 'side-a-4', label: 'Sidebar Item' },
    ]
  },
  { id: 'side-section-b', label: 'Section B', icon: Icon.Layers },
  { id: 'side-section-c', label: 'Section C', icon: Icon.List },
  { id: 'side-section-d', label: 'Section D', icon: Icon.BarChart },
  { id: 'side-settings', label: 'Settings', icon: Icon.Settings },
]

function Sidebar({ collapsed, setCollapsed, activeSideItem, setActiveSideItem }: {
  collapsed: boolean, setCollapsed: (v: boolean) => void
  activeSideItem: string, setActiveSideItem: (v: string) => void
}) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['side-section-a']))

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <aside
      className={`bg-white border-r border-[#d1d9e0] flex flex-col transition-all duration-200 shrink-0 ${collapsed ? 'w-14' : 'w-56'}`}
      aria-label="Application sidebar"
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-10 border-b border-[#d1d9e0] text-[#1a2533] hover:text-[#1a3a5c] hover:bg-[#f8f9fb] transition-colors"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-expanded={!collapsed}
      >
        {collapsed ? <Icon.ChevronRight /> : <Icon.ChevronLeft />}
      </button>
      <nav className="flex-1 py-2 overflow-y-auto" aria-label="Sidebar navigation">
        <ul role="list">
          {sidebarItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => {
                  if (item.children) toggleExpand(item.id)
                  else setActiveSideItem(item.id)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1a56db]
                  ${activeSideItem === item.id ? 'bg-[#ebf3ff] text-[#1a56db] font-semibold border-r-2 border-[#1a56db]' : 'text-[#1a2533] hover:bg-[#f8f9fb] hover:text-[#1a3a5c]'}
                `}
                aria-current={activeSideItem === item.id ? 'page' : undefined}
              >
                <span aria-hidden="true" className="shrink-0"><item.icon /></span>
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left leading-tight">{item.label}</span>
                    {item.children && (
                      <span className={`transition-transform ${expandedItems.has(item.id) ? 'rotate-180' : ''}`}><Icon.ChevronDown /></span>
                    )}
                  </>
                )}
              </button>
              {!collapsed && item.children && expandedItems.has(item.id) && (
                <ul className="ml-9 border-l border-[#d1d9e0]" role="list">
                  {item.children.map(child => (
                    <li key={child.id}>
                      <button
                        onClick={() => setActiveSideItem(child.id)}
                        className={`w-full text-left px-3 py-2 text-sm transition-colors
                          ${activeSideItem === child.id ? 'text-[#1a56db] font-semibold' : 'text-[#4a5568] hover:text-[#1a3a5c]'}
                        `}
                        aria-current={activeSideItem === child.id ? 'page' : undefined}
                      >
                        {child.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
function Breadcrumb({ items }: { items: { label: string, href?: string, onClick?: () => void }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 text-sm text-[#1a2533]" role="list">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden="true" className="text-[#6b7280]"><Icon.ChevronRight /></span>}
            {i === items.length - 1 ? (
              <span className="text-[#1a2533] font-medium" aria-current="page">{item.label}</span>
            ) : item.onClick ? (
              <button onClick={item.onClick} className="hover:text-[#1a56db] hover:underline transition-colors">{item.label}</button>
            ) : (
              <Link href={item.href ?? '#'} className="hover:text-[#1a56db] hover:underline transition-colors">{item.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// ─── Metric Summary ───────────────────────────────────────────────────────────
function MetricSummary() {
  const metrics = [
    { label: 'Metric Label A', val: '142', sub: 'Supporting detail text', color: 'text-[#1a3a5c]' },
    { label: 'Metric Label B', val: '7', sub: 'Supporting detail text', color: 'text-amber-600' },
    { label: 'Metric Label C', val: '119', sub: 'Supporting detail text', color: 'text-green-700' },
    { label: 'Metric Label D', val: '28', sub: 'Supporting detail text', color: 'text-[#1a56db]' },
  ]
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map(m => (
        <div key={m.label} className="bg-white border border-[#d1d9e0] rounded p-4">
          <p className="text-xs text-[#1a2533] uppercase tracking-wider font-medium">{m.label}</p>
          <p className={`text-3xl font-bold mt-1 ${m.color}`}>{m.val}</p>
          <p className="text-xs text-[#374151] mt-1">{m.sub}</p>
        </div>
      ))}
    </div>
  )
}

// ─── Buttons ──────────────────────────────────────────────────────────────────
function ButtonShowcase() {
  const [loading, setLoading] = useState(false)
  return (
    <section aria-labelledby="btn-heading">
      <h2 id="btn-heading" className="text-base font-semibold text-[#1a2533] mb-4">Buttons</h2>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3 items-center">
          <button className="bg-[#1a3a5c] text-white px-4 py-2 text-sm font-medium rounded hover:bg-[#0f2540] focus:ring-2 focus:ring-[#1a56db] focus:ring-offset-2 transition-colors">Primary</button>
          <button className="border border-[#1a3a5c] text-[#1a3a5c] px-4 py-2 text-sm font-medium rounded hover:bg-[#f0f4f8] focus:ring-2 focus:ring-[#1a56db] focus:ring-offset-2 transition-colors">Secondary</button>
          <button className="text-[#1a56db] px-4 py-2 text-sm font-medium rounded hover:underline focus:ring-2 focus:ring-[#1a56db] focus:ring-offset-2 transition-colors">Tertiary / Text</button>
          <button className="bg-red-600 text-white px-4 py-2 text-sm font-medium rounded hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors">Destructive</button>
          <button className="p-2 border border-[#d1d9e0] rounded text-[#4a5568] hover:bg-[#f0f4f8] focus:ring-2 focus:ring-[#1a56db] focus:ring-offset-2 transition-colors" aria-label="Icon action"><Icon.Upload /></button>
          <button disabled className="bg-[#1a3a5c] text-white px-4 py-2 text-sm font-medium rounded opacity-40 cursor-not-allowed">Disabled</button>
          <button
            onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000) }}
            className="flex items-center gap-2 bg-[#1a3a5c] text-white px-4 py-2 text-sm font-medium rounded hover:bg-[#0f2540] focus:ring-2 focus:ring-[#1a56db] focus:ring-offset-2 transition-colors"
          >
            {loading ? <><Icon.Loader /> Processing…</> : 'Loading State (click)'}
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Form Elements ────────────────────────────────────────────────────────────
function FormShowcase() {
  const [checked, setChecked] = useState(false)
  const [radio, setRadio] = useState('opt1')
  const [tog, setTog] = useState(false)
  const inputBase = "w-full px-3 py-2 text-sm border rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:border-[#1a56db] transition-colors"
  return (
    <section aria-labelledby="form-heading">
      <h2 id="form-heading" className="text-base font-semibold text-[#1a2533] mb-4">Form Elements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Text field */}
        <div>
          <label className="block text-sm font-medium text-[#1a2533] mb-1">Text Field <span className="text-red-600" aria-hidden="true">*</span></label>
          <input type="text" placeholder="Placeholder text" className={`${inputBase} border-[#d1d9e0]`} aria-required="true" />
          <p className="mt-1 text-xs text-[#1a2533]">Helper / hint text below the field</p>
        </div>
        {/* Error state */}
        <div>
          <label className="block text-sm font-medium text-[#1a2533] mb-1">Error State <span className="text-red-600" aria-hidden="true">*</span></label>
          <input type="text" defaultValue="Invalid value" aria-invalid="true" aria-describedby="field-error" className={`${inputBase} border-red-500 focus:ring-red-500`} />
          <p id="field-error" className="mt-1 text-xs text-red-600 flex items-center gap-1"><Icon.AlertCircle /> Inline validation error message</p>
        </div>
        {/* Disabled / read-only */}
        <div>
          <label className="block text-sm font-medium text-[#1a2533] mb-1">Read-only Field</label>
          <input type="text" defaultValue="Read-only value" readOnly className={`${inputBase} border-[#d1d9e0] bg-[#f8f9fb] text-[#1a2533] cursor-not-allowed`} aria-readonly="true" />
        </div>
        {/* Textarea */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#1a2533] mb-1">Textarea</label>
          <textarea rows={3} placeholder="Multi-line text input…" className={`${inputBase} border-[#d1d9e0] resize-none`} />
        </div>
        {/* Dropdown */}
        <div>
          <label className="block text-sm font-medium text-[#1a2533] mb-1">Select / Dropdown</label>
          <select className={`${inputBase} border-[#d1d9e0]`}>
            <option value="">Select an option</option>
            <option>Option Alpha</option>
            <option>Option Beta</option>
            <option>Option Gamma</option>
            <option>Option Delta</option>
          </select>
        </div>
        {/* Date picker */}
        <div>
          <label className="block text-sm font-medium text-[#1a2533] mb-1">Date Picker</label>
          <input type="date" className={`${inputBase} border-[#d1d9e0]`} />
        </div>
        {/* File upload */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#1a2533] mb-1">File Upload</label>
          <div className="border-2 border-dashed border-[#d1d9e0] rounded p-4 text-center hover:border-[#1a56db] transition-colors cursor-pointer bg-[#f8f9fb]">
            <Icon.Upload />
            <p className="text-sm text-[#1a2533] mt-1">Drag & drop or <span className="text-[#1a56db] font-medium">browse</span></p>
            <p className="text-xs text-[#374151] mt-0.5">PDF, JPG, PNG up to 5 MB</p>
            <input type="file" className="sr-only" aria-label="Upload file" />
          </div>
        </div>
        {/* Checkbox, radio, toggle */}
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-[#1a2533]">
            <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)}
              className="w-4 h-4 accent-[#1a3a5c] rounded" />
            Checkbox label text
          </label>
          <fieldset>
            <legend className="text-sm font-medium text-[#1a2533] mb-1.5">Radio Group</legend>
            {[{ id: 'opt1', label: 'Option One' }, { id: 'opt2', label: 'Option Two' }, { id: 'opt3', label: 'Option Three' }].map(o => (
              <label key={o.id} className="flex items-center gap-2 text-sm text-[#1a2533] mb-1 cursor-pointer">
                <input type="radio" name="entity" value={o.id} checked={radio === o.id} onChange={() => setRadio(o.id)} className="accent-[#1a3a5c]" />
                {o.label}
              </label>
            ))}
          </fieldset>
          <label className="flex items-center gap-3 cursor-pointer">
            <span className="text-sm text-[#1a2533]">Toggle Switch</span>
            <button role="switch" aria-checked={tog} onClick={() => setTog(!tog)}
              className={`relative inline-flex h-5 w-9 rounded-full transition-colors focus:ring-2 focus:ring-[#1a56db] focus:ring-offset-2 ${tog ? 'bg-[#1a3a5c]' : 'bg-[#d1d9e0]'}`}>
              <span className={`inline-block w-4 h-4 bg-white rounded-full shadow transition-transform mt-0.5 ${tog ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </button>
          </label>
        </div>
      </div>
    </section>
  )
}

// ─── Status Indicators ────────────────────────────────────────────────────────
const statuses = [
  { type: 'success', label: 'Success', bg: 'bg-green-50', text: 'text-green-800', border: 'border-green-200', dot: 'bg-green-500' },
  { type: 'warning', label: 'Warning', bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200', dot: 'bg-amber-500' },
  { type: 'error', label: 'Error', bg: 'bg-red-50', text: 'text-red-800', border: 'border-red-200', dot: 'bg-red-500' },
  { type: 'info', label: 'Info', bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200', dot: 'bg-blue-500' },
  { type: 'neutral', label: 'Neutral', bg: 'bg-[#f8f9fb]', text: 'text-[#4a5568]', border: 'border-[#d1d9e0]', dot: 'bg-[#9aa5b4]' },
]

function StatusShowcase() {
  return (
    <section aria-labelledby="status-heading">
      <h2 id="status-heading" className="text-base font-semibold text-[#1a2533] mb-4">Status Chips</h2>
      <div className="flex flex-wrap gap-2">
        {statuses.map((s: any) => (
          <span key={s.type} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${s.bg} ${s.text} ${s.border}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} aria-hidden="true" />
            {s.label}
          </span>
        ))}
      </div>
    </section>
  )
}

// ─── Alerts ───────────────────────────────────────────────────────────────────
const alertTypes = [
  { type: 'info',    Icon: Icon.Info,        title: 'Info Alert',    desc: 'This is an informational message providing context or guidance to the user.', bg: 'bg-blue-50',   border: 'border-blue-300',  text: 'text-blue-900',  iconColor: 'text-blue-600' },
  { type: 'success', Icon: Icon.Check,       title: 'Success Alert', desc: 'The action was completed successfully. This confirms a positive outcome.',      bg: 'bg-green-50',  border: 'border-green-300', text: 'text-green-900', iconColor: 'text-green-600' },
  { type: 'warning', Icon: Icon.Warning,     title: 'Warning Alert', desc: 'Attention required. Please review the highlighted condition before proceeding.', bg: 'bg-amber-50',  border: 'border-amber-300', text: 'text-amber-900', iconColor: 'text-amber-600' },
  { type: 'error',   Icon: Icon.AlertCircle, title: 'Error Alert',   desc: 'Something went wrong. Review the details and correct the issue to continue.',   bg: 'bg-red-50',    border: 'border-red-300',   text: 'text-red-900',   iconColor: 'text-red-600' },
]

function AlertsShowcase() {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())
  return (
    <section aria-labelledby="alerts-heading">
      <h2 id="alerts-heading" className="text-base font-semibold text-[#1a2533] mb-4">Alerts</h2>
      <div className="space-y-3">
        {alertTypes.filter(a => !dismissed.has(a.type)).map(a => (
          <div key={a.type} role="alert" className={`flex items-start gap-3 p-4 rounded border-l-4 ${a.bg} ${a.border}`}>
            <span className={`shrink-0 mt-0.5 ${a.iconColor}`}><a.Icon /></span>
            <div className="flex-1">
              <p className={`text-sm font-semibold ${a.text}`}>{a.title}</p>
              <p className={`text-sm mt-0.5 ${a.text} opacity-80`}>{a.desc}</p>
            </div>
            <button onClick={() => setDismissed(prev => new Set([...prev, a.type]))} className={`shrink-0 ${a.iconColor} hover:opacity-70`} aria-label={`Dismiss ${a.title}`}><Icon.X /></button>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Cards ────────────────────────────────────────────────────────────────────
function CardsShowcase() {
  return (
    <section aria-labelledby="cards-heading">
      <h2 id="cards-heading" className="text-base font-semibold text-[#1a2533] mb-4">Cards</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Info card */}
        <div className="border border-[#d1d9e0] rounded p-4 bg-white">
          <h3 className="text-sm font-semibold text-[#1a2533] mb-1">Information Card</h3>
          <p className="text-sm text-[#1a2533]">Displays read-only contextual information for the user.</p>
        </div>
        {/* Metric card */}
        <div className="border border-[#d1d9e0] rounded p-4 bg-white">
          <p className="text-xs text-[#1a2533] uppercase tracking-wider font-medium">Metric Label</p>
          <p className="text-3xl font-bold text-[#1a3a5c] mt-1">142</p>
          <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><Icon.Check /> Supporting detail text</p>
        </div>
        {/* Content card with header */}
        <div className="border border-[#d1d9e0] rounded bg-white overflow-hidden">
          <div className="bg-[#f8f9fb] border-b border-[#d1d9e0] px-4 py-2.5">
            <h3 className="text-sm font-semibold text-[#1a2533]">Content Card</h3>
          </div>
          <div className="p-4 text-sm text-[#1a2533]">Content section with a distinct header. Used for structured data presentation.</div>
        </div>
        {/* Action card */}
        <div className="border border-[#d1d9e0] rounded p-4 bg-white">
          <h3 className="text-sm font-semibold text-[#1a2533] mb-1">Action Card</h3>
          <p className="text-sm text-[#1a2533] mb-3">Card body text describing the item or action available.</p>
          <button className="text-sm font-medium text-[#1a56db] hover:underline focus:outline-none focus-visible:underline">Primary Action →</button>
        </div>
      </div>
    </section>
  )
}

// ─── Table ────────────────────────────────────────────────────────────────────
const tableData = [
  { id: 'REC-0001', col1: 'Row Label Alpha',  col2: 'Category A', col3: '12 Aug 2024', status: 'success', statusLabel: 'Active' },
  { id: 'REC-0002', col1: 'Row Label Beta',   col2: 'Category B', col3: '18 Aug 2024', status: 'warning', statusLabel: 'Pending' },
  { id: 'REC-0003', col1: 'Row Label Gamma',  col2: 'Category A', col3: '22 Aug 2024', status: 'error',   statusLabel: 'Error' },
  { id: 'REC-0004', col1: 'Row Label Delta',  col2: 'Category C', col3: '28 Aug 2024', status: 'neutral', statusLabel: 'Draft' },
]

const statusBadge: Record<string, string> = {
  success: 'bg-green-50 text-green-800 border-green-200',
  warning: 'bg-amber-50 text-amber-800 border-amber-200',
  error:   'bg-red-50 text-red-800 border-red-200',
  neutral: 'bg-[#f8f9fb] text-[#4a5568] border-[#d1d9e0]',
}

function TableShowcase() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [sortCol, setSortCol] = useState<string>('col3')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const toggleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortCol(col); setSortDir('asc') }
  }
  const toggleRow = (id: string) => setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })

  return (
    <section aria-labelledby="table-heading">
      <h2 id="table-heading" className="text-base font-semibold text-[#1a2533] mb-4">Table</h2>
      <div className="border border-[#d1d9e0] rounded overflow-hidden">
        {/* Toolbar */}
        <div className="bg-white px-4 py-3 border-b border-[#d1d9e0] flex items-center justify-between gap-3">
          <div className="relative">
            <input type="search" placeholder="Filter rows…" className="pl-8 pr-3 py-1.5 text-sm border border-[#d1d9e0] rounded focus:outline-none focus:ring-2 focus:ring-[#1a56db] w-52" />
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#374151]"><Icon.Search /></span>
          </div>
          <div className="text-xs text-[#1a2533]">{selected.size > 0 ? `${selected.size} selected` : `${tableData.length} records`}</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" role="grid">
            <thead>
              <tr className="bg-[#f8f9fb] border-b border-[#d1d9e0]">
                <th className="w-10 px-3 py-3 text-left">
                  <input type="checkbox" className="accent-[#1a3a5c]" aria-label="Select all" onChange={e => setSelected(e.target.checked ? new Set(tableData.map(r => r.id)) : new Set())} />
                </th>
                {[
                  { key: 'id',     label: 'Record ID' },
                  { key: 'col1',   label: 'Column One' },
                  { key: 'col2',   label: 'Column Two' },
                  { key: 'col3',   label: 'Date', sortable: true },
                  { key: 'status', label: 'Status' },
                  { key: 'actions', label: 'Actions' },
                ].map(col => (
                  <th key={col.key} className="px-3 py-3 text-left font-semibold text-[#1a2533] whitespace-nowrap">
                    {col.sortable ? (
                      <button onClick={() => toggleSort(col.key)} className="flex items-center gap-1 hover:text-[#1a3a5c] focus:outline-none focus-visible:underline">
                        {col.label}
                        <span aria-hidden="true" className="text-[#374151]">{sortCol === col.key ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}</span>
                      </button>
                    ) : col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={row.id} className={`border-b border-[#e8edf2] transition-colors ${selected.has(row.id) ? 'bg-[#ebf3ff]' : i % 2 === 0 ? 'bg-white hover:bg-[#f8f9fb]' : 'bg-[#fafbfc] hover:bg-[#f8f9fb]'}`}>
                  <td className="px-3 py-3">
                    <input type="checkbox" checked={selected.has(row.id)} onChange={() => toggleRow(row.id)} className="accent-[#1a3a5c]" aria-label={`Select ${row.id}`} />
                  </td>
                  <td className="px-3 py-3 font-mono text-[#1a56db] text-xs">{row.id}</td>
                  <td className="px-3 py-3 text-[#1a2533]">{row.col1}</td>
                  <td className="px-3 py-3 text-[#1a2533]">{row.col2}</td>
                  <td className="px-3 py-3 text-[#1a2533]">{row.col3}</td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${statusBadge[row.status]}`}>{row.statusLabel}</span>
                  </td>
                  <td className="px-3 py-3">
                    <button className="text-xs text-[#1a56db] hover:underline font-medium">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="bg-white px-4 py-3 border-t border-[#d1d9e0] flex items-center justify-between">
          <p className="text-xs text-[#1a2533]">Showing 1–4 of 4 records</p>
          <div className="flex items-center gap-1">
            <button disabled className="px-2 py-1 text-xs border border-[#d1d9e0] rounded text-[#374151] cursor-not-allowed">Previous</button>
            <button className="px-2.5 py-1 text-xs border border-[#1a3a5c] bg-[#1a3a5c] text-white rounded">1</button>
            <button disabled className="px-2 py-1 text-xs border border-[#d1d9e0] rounded text-[#374151] cursor-not-allowed">Next</button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
function TabsShowcase() {
  const [activeTab, setActiveTab] = useState(0)
  const tabs = ['Tab One', 'Tab Two', 'Tab Three', 'Tab Four']
  return (
    <section aria-labelledby="tabs-heading">
      <h2 id="tabs-heading" className="text-base font-semibold text-[#1a2533] mb-4">Tabs</h2>
      <div role="tablist" aria-label="Example tab group" className="flex border-b border-[#d1d9e0]">
        {tabs.map((t, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={activeTab === i}
            aria-controls={`tab-panel-${i}`}
            id={`tab-${i}`}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db] focus-visible:ring-inset whitespace-nowrap
              ${activeTab === i ? 'border-[#1a3a5c] text-[#1a3a5c]' : 'border-transparent text-[#1a2533] hover:text-[#1a2533] hover:border-[#d1d9e0]'}`}
          >{t}</button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={i} role="tabpanel" id={`tab-panel-${i}`} aria-labelledby={`tab-${i}`} hidden={activeTab !== i} className="pt-4 text-sm text-[#1a2533]">
          Content area for {t}. Replace with the relevant panel content.
        </div>
      ))}
    </section>
  )
}

// ─── Accordion ────────────────────────────────────────────────────────────────
const accordionItems = [
  { q: 'Accordion Item — Heading One', a: 'This is the expanded body text for the first accordion item. It can contain paragraph text, lists, or any inline content relevant to the heading.' },
  { q: 'Accordion Item — Heading Two', a: 'Body text for the second accordion panel. Accordions are suitable for FAQ sections, collapsible detail rows, and progressive disclosure patterns.' },
  { q: 'Accordion Item — Heading Three', a: 'A third accordion item demonstrating the collapsed-by-default behaviour. Clicking the header toggles visibility of this panel.' },
]

function AccordionShowcase() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section aria-labelledby="accordion-heading">
      <h2 id="accordion-heading" className="text-base font-semibold text-[#1a2533] mb-4">Accordion</h2>
      <div className="border border-[#d1d9e0] rounded overflow-hidden divide-y divide-[#d1d9e0]">
        {accordionItems.map((item, i) => (
          <div key={i}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium text-[#1a2533] hover:bg-[#f8f9fb] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1a56db]"
              aria-expanded={open === i}
              aria-controls={`acc-panel-${i}`}
              id={`acc-btn-${i}`}
            >
              {item.q}
              <span className={`shrink-0 ml-3 text-[#1a2533] transition-transform ${open === i ? 'rotate-180' : ''}`}><Icon.ChevronDown /></span>
            </button>
            {open === i && (
              <div id={`acc-panel-${i}`} role="region" aria-labelledby={`acc-btn-${i}`} className="px-4 pb-4 text-sm text-[#1a2533]">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Modal & Drawer ───────────────────────────────────────────────────────────
function ModalShowcase() {
  const [showModal, setShowModal] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)
  return (
    <section aria-labelledby="modal-heading">
      <h2 id="modal-heading" className="text-base font-semibold text-[#1a2533] mb-4">Modal & Drawer</h2>
      <div className="flex gap-3">
        <button onClick={() => setShowModal(true)} className="bg-[#1a3a5c] text-white px-4 py-2 text-sm font-medium rounded hover:bg-[#0f2540] transition-colors">Open Modal</button>
        <button onClick={() => setShowDrawer(true)} className="border border-[#1a3a5c] text-[#1a3a5c] px-4 py-2 text-sm font-medium rounded hover:bg-[#f0f4f8] transition-colors">Open Side Drawer</button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} aria-hidden="true" />
          <div className="relative bg-white rounded border border-[#d1d9e0] shadow-xl max-w-md w-full mx-4 p-6">
            <h3 id="modal-title" className="text-base font-semibold text-[#1a2533] mb-2">Confirmation Modal</h3>
            <p className="text-sm text-[#1a2533] mb-6">Modal body text. Use this pattern for confirmations, alerts requiring explicit acknowledgement, or focused input flows that should block the background.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="border border-[#d1d9e0] text-[#1a2533] px-4 py-2 text-sm font-medium rounded hover:bg-[#f0f4f8] transition-colors">Cancel</button>
              <button onClick={() => setShowModal(false)} className="bg-red-600 text-white px-4 py-2 text-sm font-medium rounded hover:bg-red-700 transition-colors">Confirm Action</button>
            </div>
          </div>
        </div>
      )}

      {showDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowDrawer(false)} aria-hidden="true" />
          <div className="relative bg-white w-80 h-full shadow-xl flex flex-col border-l border-[#d1d9e0]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#d1d9e0]">
              <h3 id="drawer-title" className="text-sm font-semibold text-[#1a2533]">Side Drawer</h3>
              <button onClick={() => setShowDrawer(false)} className="p-1 text-[#1a2533] hover:text-[#1a2533]" aria-label="Close drawer"><Icon.X /></button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto text-sm text-[#1a2533]">
              <p>Side drawer content area. Used for contextual detail panels, filter controls, notification feeds, or secondary forms that overlay the main content without a full navigation change.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

// ─── Progress Indicator ───────────────────────────────────────────────────────
function ProgressShowcase() {
  const steps = ['Step One', 'Step Two', 'Step Three', 'Step Four']
  const current = 2
  return (
    <section aria-labelledby="progress-heading">
      <h2 id="progress-heading" className="text-base font-semibold text-[#1a2533] mb-4">Progress Indicator</h2>
      <nav aria-label="Multi-step form progress">
        <ol className="flex items-center" role="list">
          {steps.map((step, i) => (
            <li key={i} className={`flex items-center ${i < steps.length - 1 ? 'flex-1' : ''}`}>
              <div className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors
                  ${i < current ? 'bg-[#1a3a5c] border-[#1a3a5c] text-white' : ''}
                  ${i === current ? 'bg-white border-[#1a3a5c] text-[#1a3a5c]' : ''}
                  ${i > current ? 'bg-white border-[#d1d9e0] text-[#374151]' : ''}
                `}>
                  {i < current ? <Icon.Check /> : i + 1}
                </div>
                <span className={`text-xs font-medium whitespace-nowrap ${i === current ? 'text-[#1a3a5c]' : i < current ? 'text-[#1a2533]' : 'text-[#374151]'}`}>{step}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-4 ${i < current ? 'bg-[#1a3a5c]' : 'bg-[#d1d9e0]'}`} aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </nav>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer className="bg-[#0f2540] text-white mt-auto" role="contentinfo">
      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-3">About</h3>
            <ul className="space-y-2 text-sm text-white/65">
              {['About the Portal', 'Objectives', 'Nodal Agency', 'MoU Partners'].map(l => <li key={l}><a href="#" className="hover:text-white hover:underline transition-colors">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-3">Services</h3>
            <ul className="space-y-2 text-sm text-white/65">
              {['Online Applications', 'Track Status', 'Scheme Calculator', 'Document Checklist'].map(l => <li key={l}><a href="#" className="hover:text-white hover:underline transition-colors">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-3">Policies</h3>
            <ul className="space-y-2 text-sm text-white/65">
              {['Website Policies', 'Terms & Conditions', 'Privacy Policy', 'Accessibility Statement', 'Copyright Policy', 'Hyperlinking Policy'].map(l => <li key={l}><a href="#" className="hover:text-white hover:underline transition-colors">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-white/65">
              {['Help & Guidance', 'Contact Us', 'Feedback', 'Sitemap', 'Grievance Redressal'].map(l => <li key={l}><a href="#" className="hover:text-white hover:underline transition-colors">{l}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/15 pt-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-white/50">
          <div className="space-y-1">
            <p>Content owned by <span className="text-white/70">Government of Maharashtra, Industries, Energy and Labour Department</span></p>
            <p>Portal developed and maintained by <span className="text-white/70">Maharashtra Industrial Development Corporation (MIDC)</span></p>
          </div>
          <div className="text-right space-y-1">
            <p>Last Updated: <span className="text-white/70">22 September 2026</span></p>
            <p>© 2026 Government of Maharashtra. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// M01 — MIDC DEPARTMENT LOGIN + AUTHENTICATED OFFICER SHELL
// ─────────────────────────────────────────────────────────────────────────────

export const MIcon = {
  Eye: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  EyeOff: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
  ),
  Refresh: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
  ),
  Inbox: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
  ),
  Clipboard: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
  ),
  MapPin: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  MessageSquare: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  ),
  Gavel: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14 13-7.5 7.5c-.83.83-2.17.83-3 0a2.12 2.12 0 0 1 0-3L11 10"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/></svg>
  ),
  Headphones: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>
  ),
  Bot: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
  ),
  TrendingUp: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
  ),
  BookOpen: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
  ),
  Activity: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  ),
  History: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
  ),
  Shield: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  ),
  Spinner: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
  ),
}

function makeCaptchaCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

function CaptchaDisplay({ code }: { code: string }) {
  return (
    <div
      className="flex items-center justify-center bg-[#eef2f7] border border-[#d1d9e0] rounded h-12 select-none overflow-hidden"
      role="img"
      aria-label={`CAPTCHA: ${code.split('').join(' ')}`}
    >
      <svg width="180" height="44" aria-hidden="true">
        <rect width="180" height="44" fill="#eef2f7"/>
        <line x1="0" y1="18" x2="180" y2="30" stroke="#c0ccd8" strokeWidth="1.2"/>
        <line x1="10" y1="38" x2="170" y2="8" stroke="#c8d4de" strokeWidth="0.9"/>
        <line x1="0" y1="32" x2="180" y2="14" stroke="#d0dae3" strokeWidth="0.7"/>
        {code.split('').map((ch, i) => (
          <text
            key={i}
            x={16 + i * 26}
            y={28 + (i % 3 === 0 ? -4 : i % 3 === 1 ? 3 : 0)}
            fontFamily="'Courier New', monospace"
            fontSize={i % 2 === 0 ? 19 : 17}
            fontWeight="bold"
            fill={['#1a3a5c','#2d6a4f','#7c3aed','#b45309','#1a56db','#be185d'][i % 6]}
            transform={`rotate(${(i % 2 === 0 ? -1 : 1) * (4 + (i * 3) % 9)} ${16 + i * 26 + 9} 26)`}
          >{ch}</text>
        ))}
      </svg>
    </div>
  )
}

export function M01LoginPage({ onSuccess, lang, fontSize, highContrast }: {
  onSuccess: () => void
  lang: 'en' | 'mr'
  fontSize: 'sm' | 'md' | 'lg'
  highContrast: boolean
}) {
  const [loginState, setLoginState] = useState<LoginState>('default')
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [captchaInput, setCaptchaInput] = useState('')
  const [captchaCode, setCaptchaCode] = useState('X7K9P2')
  useEffect(() => {
    setCaptchaCode(makeCaptchaCode())
  }, [])
  const [showRefreshedMsg, setShowRefreshedMsg] = useState(false)

  const fontCls = fontSize === 'sm' ? 'text-[13px]' : fontSize === 'lg' ? 'text-[16px]' : 'text-[14px]'
  const contrastCls = highContrast ? 'contrast-125 saturate-150' : ''

  const refreshCaptcha = () => {
    setCaptchaCode(makeCaptchaCode())
    setCaptchaInput('')
    setShowRefreshedMsg(true)
    setLoginState('captcha-refreshed')
    setTimeout(() => setShowRefreshedMsg(false), 2500)
  }

  const handleLogin = () => {
    if (!userId || !password || !captchaInput) return
    if (captchaInput.toUpperCase() !== captchaCode) {
      setLoginState('incorrect-captcha')
      return
    }
    if (userId.toLowerCase() === 'error') {
      setLoginState('invalid-creds')
      return
    }
    setLoginState('authenticating')
    setTimeout(() => onSuccess(), 2200)
  }

  const busy = loginState === 'authenticating'
  const inp = `w-full px-3 py-2.5 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-[#1a56db] transition-colors placeholder:text-[#9aa5b4]`

  return (
    <div className={`min-h-screen flex flex-col ${fontCls} ${contrastCls}`} style={{ fontFamily: 'Noto Sans, Noto Sans Devanagari, system-ui, sans-serif' }}>
      <AccessibilityStrip
        lang={lang} setLang={() => {}}
        fontSize={fontSize} setFontSize={() => {}}
        highContrast={highContrast} setHighContrast={() => {}}
      />
      <header className="bg-white border-b border-[#d1d9e0] shadow-sm" role="banner">
        <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between py-3 gap-8">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-0.5 shrink-0">
              <img src="/assets/india-emblem.png" alt="National Emblem of India" className="h-14 w-auto object-contain" />
              <span className="text-[9px] text-[#4a5568] font-medium tracking-wide leading-none" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>सत्यमेव जयते</span>
            </div>
            <div className="w-px h-12 bg-[#d1d9e0]" aria-hidden="true" />
            <div className="flex flex-col items-center gap-0.5 shrink-0">
              <img src="/assets/maha-seal.png" alt="Government of Maharashtra seal" className="h-12 w-auto object-contain" />
              <span className="text-[9px] text-[#4a5568] font-medium tracking-wide leading-none text-center">Govt. of Maharashtra</span>
            </div>
            <div className="w-px h-12 bg-[#d1d9e0]" aria-hidden="true" />
            <div className="flex items-center gap-3">
              <img src="/assets/ekatma-logo.png" alt="Ekatma portal logo" className="h-10 w-auto object-contain" />
              <div>
                <div className="text-[#1a3a5c] font-bold text-base leading-tight">EKATMA</div>
                <div className="text-[#4a5568] text-[11px] leading-tight">Government of Maharashtra Portal</div>
                <div className="text-[#4a5568] text-[10px] leading-tight" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>महाराष्ट्र शासन पोर्टल</div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-[#1a3a5c]">MIDC Department Portal</p>
            <p className="text-[10px] text-[#1a2533]">Authorised officer access only</p>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1 bg-[#f8f9fb] flex flex-col items-center justify-center py-12 px-4" tabIndex={-1}>
        <div className="w-full max-w-[408px]">
          <div className="text-center mb-7">
            <h1 className="text-xl font-bold text-[#1a3a5c]">MIDC Department Login</h1>
            <p className="text-sm text-[#1a2533] mt-1.5">Sign in to access your assigned departmental workspace.</p>
          </div>

          <div className="bg-white border border-[#d1d9e0] rounded shadow-sm p-6 space-y-5">

            {loginState === 'invalid-creds' && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded p-3 text-sm text-red-700" role="alert" aria-live="assertive">
                <span className="shrink-0 mt-0.5"><Icon.AlertCircle /></span>
                <span>Invalid User ID or password. Please check your credentials and try again.</span>
              </div>
            )}

            <div>
              <label htmlFor="m01-uid" className="block text-sm font-medium text-[#1a2533] mb-1.5">
                Officer / Department User ID <span className="text-red-600" aria-hidden="true">*</span>
              </label>
              <input
                id="m01-uid"
                type="text"
                placeholder="Enter your User ID"
                value={userId}
                onChange={e => { setUserId(e.target.value); if (loginState === 'invalid-creds') setLoginState('default') }}
                disabled={busy}
                autoComplete="username"
                aria-required="true"
                className={`${inp} ${loginState === 'invalid-creds' ? 'border-red-400 bg-red-50 focus:ring-red-500' : 'border-[#d1d9e0] bg-white'} ${busy ? 'opacity-60 cursor-not-allowed' : ''}`}
              />
            </div>

            <div>
              <label htmlFor="m01-pw" className="block text-sm font-medium text-[#1a2533] mb-1.5">
                Password <span className="text-red-600" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <input
                  id="m01-pw"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Enter Password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); if (loginState === 'invalid-creds') setLoginState('default') }}
                  disabled={busy}
                  autoComplete="current-password"
                  aria-required="true"
                  className={`${inp} pr-10 ${loginState === 'invalid-creds' ? 'border-red-400 bg-red-50 focus:ring-red-500' : 'border-[#d1d9e0] bg-white'} ${busy ? 'opacity-60 cursor-not-allowed' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  disabled={busy}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1a2533] hover:text-[#1a3a5c] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db] rounded"
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <MIcon.EyeOff /> : <MIcon.Eye />}
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-[#1a2533]">CAPTCHA <span className="text-red-600" aria-hidden="true">*</span></span>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  disabled={busy}
                  className="flex items-center gap-1 text-xs text-[#1a56db] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db] rounded px-1"
                  aria-label="Refresh CAPTCHA — generate a new CAPTCHA image"
                >
                  <MIcon.Refresh /> Refresh CAPTCHA
                </button>
              </div>
              <CaptchaDisplay code={captchaCode} />
              {showRefreshedMsg && loginState === 'captcha-refreshed' && (
                <p className="flex items-center gap-1 text-xs text-green-700 mt-1" aria-live="polite" role="status">
                  <Icon.Check /> CAPTCHA refreshed
                </p>
              )}
              <div className="mt-2">
                <label htmlFor="m01-captcha" className="sr-only">Enter CAPTCHA code shown in the image</label>
                <input
                  id="m01-captcha"
                  type="text"
                  placeholder="Enter CAPTCHA"
                  value={captchaInput}
                  onChange={e => { setCaptchaInput(e.target.value); if (loginState === 'incorrect-captcha') setLoginState('default') }}
                  disabled={busy}
                  autoComplete="off"
                  aria-required="true"
                  aria-describedby={loginState === 'incorrect-captcha' ? 'm01-captcha-err' : undefined}
                  aria-invalid={loginState === 'incorrect-captcha'}
                  className={`${inp} tracking-[0.2em] uppercase ${loginState === 'incorrect-captcha' ? 'border-red-400 bg-red-50 focus:ring-red-500' : 'border-[#d1d9e0] bg-white'} ${busy ? 'opacity-60 cursor-not-allowed' : ''}`}
                />
                {loginState === 'incorrect-captcha' && (
                  <p id="m01-captcha-err" className="flex items-center gap-1 text-xs text-red-600 mt-1" role="alert">
                    <Icon.AlertCircle /> Incorrect CAPTCHA. Please try again.
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogin}
              disabled={busy || !userId || !password || !captchaInput}
              aria-busy={busy}
              className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:ring-offset-2
                ${busy || !userId || !password || !captchaInput
                  ? 'bg-[#1a3a5c]/60 text-white cursor-not-allowed'
                  : 'bg-[#1a3a5c] text-white hover:bg-[#0f2540]'}`}
            >
              {busy ? <><MIcon.Spinner /> Authenticating…</> : 'Login'}
            </button>

            <div className="flex items-center justify-between pt-0.5 border-t border-[#f0f4f8]">
              <a href="#" className="text-xs text-[#1a56db] hover:underline focus-visible:ring-2 focus-visible:ring-[#1a56db] rounded" onClick={e => e.preventDefault()}>
                Forgot Password
              </a>
              <a href="#" className="text-xs text-[#1a56db] hover:underline focus-visible:ring-2 focus-visible:ring-[#1a56db] rounded" onClick={e => e.preventDefault()}>
                Help / Contact Support
              </a>
            </div>
          </div>

          <p className="text-[11px] text-[#374151] text-center mt-4 leading-relaxed px-4">
            Your assigned department, office, desk and permissions are loaded automatically after sign-in.
          </p>

          {/* Prototype state preview */}
          <div className="mt-8 border border-dashed border-[#c8d4de] rounded p-3 bg-white/60">
            <p className="text-[10px] font-semibold text-[#1a2533] uppercase tracking-wider mb-2">Prototype — State preview</p>
            <div className="flex flex-wrap gap-1.5">
              {(['default', 'invalid-creds', 'incorrect-captcha', 'captcha-refreshed', 'authenticating'] as LoginState[]).map(s => (
                <button
                  key={s}
                  onClick={() => {
                    if (s === 'captcha-refreshed') { setCaptchaCode(makeCaptchaCode()); setCaptchaInput(''); setShowRefreshedMsg(true) }
                    if (s === 'authenticating') { setLoginState('authenticating'); setTimeout(() => onSuccess(), 2200); return }
                    setLoginState(s)
                  }}
                  className={`text-[10px] px-2 py-1 rounded border transition-colors ${loginState === s ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'border-[#d1d9e0] text-[#1a2533] hover:border-[#1a3a5c] hover:text-[#1a3a5c]'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

// ─── M01 Dept Sidebar ─────────────────────────────────────────────────────────

const deptSideItems = [
  { id: 'dept-home',           label: 'Department Home',     icon: Icon.Home },
  { id: 'dept-queue',          label: 'My Queue',            icon: MIcon.Inbox },
  { id: 'dept-apps',           label: 'Applications',        icon: MIcon.Clipboard },
  { id: 'dept-catalogue',      label: 'Service Catalogue',   icon: Icon.List },
  { id: 'dept-insp-queue',     label: 'Inspection Queue',    icon: Icon.Shield },
  { id: 'dept-scrutiny',   label: 'Scrutiny',               icon: MIcon.Activity },
  { id: 'dept-inspect',    label: 'Inspections',            icon: MIcon.MapPin },
  { id: 'dept-queries',    label: 'Queries / Deficiencies', icon: MIcon.MessageSquare },
  { id: 'dept-decisions',  label: 'Decisions',              icon: MIcon.Gavel },
  { id: 'dept-sla',        label: 'SLA & Escalations',      icon: Icon.Warning },
  { id: 'dept-grievances', label: 'Grievances',             icon: MIcon.Headphones },
  { id: 'dept-regasst',    label: 'Regulatory Assistant',   icon: MIcon.Bot },
  { id: 'dept-analytics',  label: 'Analytics',              icon: MIcon.TrendingUp },
  { id: 'dept-regchng',    label: 'Regulatory Changes',     icon: MIcon.BookOpen },
  { id: 'dept-workload',   label: 'Workload',               icon: MIcon.Activity },
  { id: 'dept-audit',      label: 'Audit / History',        icon: MIcon.History },
]

export function DeptSidebar({ active, setActive }: { active: string; setActive: (v: string) => void }) {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <aside
      className={`bg-white border-r border-[#d1d9e0] flex flex-col shrink-0 transition-all duration-200 ${collapsed ? 'w-14' : 'w-56'}`}
      aria-label="Department navigation"
    >
      <button
        onClick={() => setCollapsed(v => !v)}
        className="flex items-center justify-center h-9 border-b border-[#d1d9e0] text-[#1a2533] hover:text-[#1a3a5c] hover:bg-[#f8f9fb] transition-colors shrink-0"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-expanded={!collapsed}
      >
        {collapsed ? <Icon.ChevronRight /> : <Icon.ChevronLeft />}
      </button>
      <nav className="flex-1 py-1 overflow-y-auto" aria-label="Department module navigation">
        <ul role="list">
          {deptSideItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => setActive(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1a56db]
                  ${active === item.id
                    ? 'bg-[#eff6ff] text-[#1a3a5c] font-bold border-l-[3px] border-[#1a56db] pl-[calc(0.75rem-3px)]'
                    : 'text-[#1a2533] hover:bg-[#f4f8ff] hover:text-[#1a3a5c] border-l-[3px] border-transparent'
                  }`}
                aria-current={active === item.id ? 'page' : undefined}
                title={collapsed ? item.label : undefined}
              >
                <span aria-hidden="true" className="shrink-0"><item.icon /></span>
                {!collapsed && <span className="flex-1 text-left leading-tight">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

// ─── M01 Dept Context Bar ─────────────────────────────────────────────────────

export function DeptContextBar({ onLogout, onNotif, onRegAssistant, onSearch }: {
  onLogout: () => void; onNotif?: () => void; onRegAssistant?: () => void; onSearch?: (query: string) => void
}) {
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <div className="bg-[#1a3a5c] border-b border-[#0f2540]" role="navigation" aria-label="Department context and utilities">
      <div className="max-w-[1440px] mx-auto px-4 flex items-center gap-4 h-11">
        {/* Officer context — read-only */}
        <div className="flex items-center gap-4 text-xs text-white/70 shrink-0">
          <span className="flex items-center gap-1.5">
            <span className="text-white/40 font-medium">Dept</span>
            <span className="text-white font-semibold">MIDC</span>
          </span>
          <span className="text-white/25">|</span>
          <span className="flex items-center gap-1.5">
            <span className="text-white/40">Region / Office</span>
            <span className="text-white/90">Assigned MIDC Office</span>
          </span>
          <span className="text-white/25">|</span>
          <span className="flex items-center gap-1.5">
            <span className="text-white/40">Desk</span>
            <span className="text-white/90">Land / Plot Scrutiny</span>
          </span>
          <span className="text-white/25">|</span>
          <span className="flex items-center gap-1.5">
            <span className="text-white/40">Role</span>
            <span className="text-white/90">Scrutiny Officer</span>
          </span>
        </div>

        {/* Global search */}
        <form className="flex-1 max-w-sm mx-auto relative" onSubmit={event => { event.preventDefault(); onSearch?.(searchQuery) }}>
          <input
            type="search"
            value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
            placeholder="Search application ID, business or service"
            aria-label="Search application ID, business or service"
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded border border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/15 transition-colors"
          />
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/40" aria-hidden="true">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </span>
        </form>

        {/* Right utilities */}
        <div className="flex items-center gap-1 ml-auto shrink-0">
          {/* Notifications M39 */}
          <button
            aria-label="Notifications — 4 unread"
            onClick={onNotif}
            className="relative p-2 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <Icon.Bell />
            <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center" aria-hidden="true">4</span>
          </button>

          {/* Regulatory Assistant */}
          <button
            aria-label="Regulatory Assistant — AI-assisted regulatory reference"
            onClick={onRegAssistant}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors text-xs focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <MIcon.Bot />
            <span className="hidden lg:inline">Reg. Assistant</span>
          </button>

          <div className="w-px h-5 bg-white/20 mx-1" aria-hidden="true" />

          {/* User profile */}
          <button
            aria-label="Officer profile — A. Deshmukh, Scrutiny Officer"
            className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <div className="w-7 h-7 rounded-full bg-[#f5c842] text-[#0f2540] flex items-center justify-center text-xs font-bold shrink-0" aria-hidden="true">AD</div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-semibold text-white leading-none">A. Deshmukh</div>
              <div className="text-[10px] text-white/50 leading-none mt-0.5">Scrutiny Officer</div>
            </div>
          </button>

          <div className="w-px h-5 bg-white/20 mx-1" aria-hidden="true" />

          <button
            onClick={onLogout}
            aria-label="Sign out"
            className="p-2 rounded text-white/60 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <Icon.LogOut />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── M01 Department Home ──────────────────────────────────────────────────────

// ─── M02 — Operational Command Centre ────────────────────────────────────────

function SlaChip({ state }: { state: 'normal' | 'approaching' | 'breached' | 'escalated' }) {
  const map = {
    normal:     'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300',
    approaching:'bg-amber-100 text-amber-800 ring-1 ring-amber-300',
    breached:   'bg-red-100 text-red-700 ring-1 ring-red-300',
    escalated:  'bg-purple-100 text-purple-800 ring-1 ring-purple-300',
  }
  const label = { normal: 'Normal', approaching: 'Approaching', breached: 'Breached', escalated: 'Escalated' }
  return <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${map[state]}`}>{label[state]}</span>
}

function StateChip({ label, color }: { label: string; color: string }) {
  return <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${color}`}>{label}</span>
}

function PanelHeader({ title, link, linkLabel = 'View all →', icon, onLinkClick }: { title: string; link?: string; linkLabel?: string; icon?: React.ReactNode; onLinkClick?: () => void }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-[#d1d9e0] bg-gradient-to-r from-[#f0f7ff] to-white rounded-t">
      <h2 className="text-sm font-semibold text-[#1a3a5c] flex items-center gap-1.5">
        {icon && <span className="text-[#1a56db]">{icon}</span>}
        {title}
      </h2>
      {(link !== undefined || onLinkClick) && (
        <button onClick={onLinkClick} className="text-[11px] text-[#1a56db] hover:underline focus-visible:ring-2 focus-visible:ring-[#1a56db] rounded" aria-label={`${linkLabel} for ${title}`}>
          {linkLabel}
        </button>
      )}
    </div>
  )
}

export function DeptHome({ onNavigate, onOpenApp }: { onNavigate: (dest: string) => void; onOpenApp: (applicationId: string) => void }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const kpis = [
    { id: 'new',         label: 'New Applications',              value: 24, sub: '+6 since yesterday',         color: 'text-[#1a3a5c]',  bg: 'bg-white',      border: 'border-[#a0aec0]', accent: 'border-l-[4px] border-l-[#1a3a5c]',    dest: '→ M03 Queue / New',  nav: 'dept-queue' },
    { id: 'scrutiny',    label: 'Awaiting Scrutiny',             value: 17, sub: '5 approaching SLA',          color: 'text-[#1a56db]',  bg: 'bg-[#f0f7ff]',  border: 'border-[#93c5fd]', accent: 'border-l-[4px] border-l-[#1a56db]',    dest: '→ M03 Queue',        nav: 'dept-queue' },
    { id: 'entrepreneur',label: 'Awaiting Entrepreneur Response', value: 11, sub: 'Median 2.1 days',           color: 'text-[#1a3a5c]',  bg: 'bg-white',      border: 'border-[#a0aec0]', accent: 'border-l-[4px] border-l-[#1a3a5c]',    dest: '→ M03 Queue',        nav: 'dept-queue' },
    { id: 'resubmit',   label: 'Resubmissions Received',         value:  8, sub: '3 received today',          color: 'text-teal-700',   bg: 'bg-teal-50',    border: 'border-teal-400',  accent: 'border-l-[4px] border-l-teal-600',      dest: '→ M03 Queue',        nav: 'dept-queue' },
    { id: 'inspect',    label: 'Inspection Required',            value:  9, sub: '4 need scheduling',         color: 'text-[#1a56db]',  bg: 'bg-[#f0f7ff]',  border: 'border-[#93c5fd]', accent: 'border-l-[4px] border-l-[#1a56db]',    dest: '→ M21',              nav: 'dept-insp-queue' },
    { id: 'decision',   label: 'Decision Pending',               value:  6, sub: '2 approaching SLA',         color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-400', accent: 'border-l-[4px] border-l-emerald-600', dest: '→ Decisions',        nav: 'dept-decisions' },
    { id: 'slarisk',    label: 'SLA Risk',                       value:  7, sub: '3 due within 24h',          color: 'text-amber-700',  bg: 'bg-amber-50',   border: 'border-amber-400', accent: 'border-l-[4px] border-l-amber-600',    dest: '→ M30 SLA',          nav: 'dept-sla' },
    { id: 'slabreach',  label: 'SLA Breached',                   value:  2, sub: 'Requires escalation review', color: 'text-red-700',   bg: 'bg-red-50',     border: 'border-red-400',   accent: 'border-l-[4px] border-l-red-600',      dest: '→ M30 SLA',          nav: 'dept-sla' },
    { id: 'escalated',  label: 'Escalated',                      value:  3, sub: '1 new today',               color: 'text-purple-700', bg: 'bg-purple-50',  border: 'border-purple-400', accent: 'border-l-[4px] border-l-purple-600',   dest: '→ M31 Grievances',   nav: 'dept-grievances' },
  ]

  const myActions = [
    { type: 'Application Review', id: 'APP-MIDC-2048', business: 'Aarav Precision Components',    service: 'Land / Plot',         state: 'INITIAL_SCRUTINY',   stateLabel: 'Awaiting Scrutiny',       age: '2 days', sla: 'normal'     as const, action: 'Review' },
    { type: 'Query to Finalise',  id: 'APP-MIDC-2019', business: 'Nova Industrial Systems',       service: 'Planning / Building', state: 'QUERY_RAISED',        stateLabel: 'Draft Query',             age: '4 days', sla: 'approaching'as const, action: 'Finalise' },
    { type: 'Resubmission',       id: 'APP-MIDC-1987', business: 'Kinetic Engineering Works',     service: 'Water / Utility',     state: 'RESUBMITTED',         stateLabel: 'Resubmitted',             age: '1 day',  sla: 'normal'     as const, action: 'Review' },
    { type: 'Inspection to Schedule', id: 'APP-MIDC-2031', business: 'Vertex Manufacturing',      service: 'Planning / Building', state: 'INSPECTION_PENDING',  stateLabel: 'Inspection Required',     age: '3 days', sla: 'approaching'as const, action: 'Schedule' },
    { type: 'Decision Pending',   id: 'APP-MIDC-1964', business: 'Maharashtra Components Pvt Ltd',service: 'Land / Plot',         state: 'FINAL_DECISION',      stateLabel: 'Final Review Complete',   age: '1 day',  sla: 'approaching'as const, action: 'Open' },
  ]

  const slaRisk = [
    { id: 'APP-MIDC-2048', business: 'Aarav Precision Components',    service: 'Land / Plot',          desk: 'Land / Plot Scrutiny',    elapsed: '4d', sla: '5d', remaining: '1d remaining',  state: 'approaching' as const },
    { id: 'APP-MIDC-1987', business: 'Kinetic Engineering Works',     service: 'Building / Planning',  desk: 'Planning Desk',           elapsed: '6d', sla: '5d', remaining: '1d overdue',    state: 'breached'    as const },
    { id: 'APP-MIDC-2031', business: 'Vertex Manufacturing',          service: 'Water / Utility',      desk: 'Utility / Water Scrutiny',elapsed: '3d', sla: '5d', remaining: '2d remaining',  state: 'approaching' as const },
    { id: 'APP-MIDC-2011', business: 'Bharat Industrial Corp',        service: 'Land / Plot',          desk: 'Land / Plot Scrutiny',    elapsed: '8d', sla: '5d', remaining: '3d overdue',    state: 'escalated'   as const },
  ]

  const inspections = {
    upcoming: [
      { id: 'APP-MIDC-2031', business: 'Vertex Manufacturing',      service: 'Planning / Building', site: 'Taloja MIDC / Plot A-24', type: 'Site Inspection',       date: '24 Sep', assigned: true,  sla: 'normal' as const },
      { id: 'APP-MIDC-2039', business: 'Synergy Fabricators',       service: 'Building / Planning', site: 'Ambad MIDC / Plot B-11', type: 'Building Verification', date: '25 Sep', assigned: true,  sla: 'approaching' as const },
    ],
    overdue: [
      { id: 'APP-MIDC-1974', business: 'Nova Industrial Systems',   service: 'Land / Plot',         site: 'Plot B-17',               type: 'Verification Inspection', date: '18 Sep', assigned: false, sla: 'breached' as const },
    ],
    reinspection: [
      { id: 'APP-MIDC-1918', business: 'Aarav Components',          service: 'Building / Planning', site: 'Plot C-08',               type: 'Re-inspection',          date: '26 Sep', assigned: true,  sla: 'approaching' as const },
    ],
  }

  const bottlenecks = [
    { rank: 1, category: 'Land / Plot Document Issues',      count: 12, delta: '+3 vs prev period', service: 'Land / Plot',         impact: '4 approaching SLA' },
    { rank: 2, category: 'Planning Document Corrections',    count:  8, delta: '+1 vs prev period', service: 'Planning / Building', impact: '2 approaching SLA' },
    { rank: 3, category: 'Inspection Scheduling Delays',     count:  6, delta: 'Stable',            service: 'Mixed services',      impact: '3 inspection-pending' },
    { rank: 4, category: 'Repeated Missing Evidence',        count:  5, delta: '+2 vs prev period', service: 'Water / Utility',     impact: '2 repeated deficiency cycles' },
  ]

  const workloadByService = [
    { service: 'Land / Plot',         count: 28, slaRisk: 4 },
    { service: 'Building / Planning', count: 19, slaRisk: 2 },
    { service: 'Water / Utility',     count: 11, slaRisk: 1 },
    { service: 'Amendment / Mod.',    count:  7, slaRisk: 0 },
    { service: 'Other',               count:  5, slaRisk: 0 },
  ]
  const totalWork = workloadByService.reduce((s, r) => s + r.count, 0)

  const ageBuckets = [
    { label: '0–2 days', count: 18, pct: 25 },
    { label: '3–5 days', count: 28, pct: 39 },
    { label: '6–10 days',count: 16, pct: 22 },
    { label: '10+ days', count: 10, pct: 14 },
  ]

  const serviceMix = [
    { service: 'Land / Plot',         active: 28, new: 6, scrutiny: 9, query: 4, inspection: 3, decision: 2 },
    { service: 'Building / Planning', active: 19, new: 4, scrutiny: 7, query: 3, inspection: 2, decision: 3 },
    { service: 'Water / Utility',     active: 11, new: 2, scrutiny: 5, query: 2, inspection: 1, decision: 1 },
  ]

  const stateChipColor = (s: string) => {
    const m: Record<string, string> = {
      INITIAL_SCRUTINY:    'bg-blue-100 text-blue-800',
      QUERY_RAISED:        'bg-amber-100 text-amber-800',
      RESUBMITTED:         'bg-purple-100 text-purple-800',
      INSPECTION_PENDING:  'bg-orange-100 text-orange-800',
      FINAL_DECISION:      'bg-green-100 text-green-800',
    }
    return m[s] ?? 'bg-[#f0f4f8] text-[#1a2533]'
  }

  return (
    <div className="bg-[#f8f9fb]">
      <div className="max-w-[1280px] mx-auto px-6 py-5 space-y-5">

        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'MIDC Department', href: '/department' }, { label: 'Department Home' }]} />

        {/* Page header */}
        <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[#d1d9e0]">
          <div>
            <h1 className="text-xl font-bold text-[#1a3a5c]">MIDC Department Home</h1>
            <p className="text-sm text-[#1a2533] mt-0.5">Operational Command Centre</p>
            <p className="text-xs text-[#374151] mt-1.5 flex flex-wrap gap-x-4 gap-y-0.5">
              <span>Department: <strong className="text-[#1a2533]">MIDC</strong></span>
              <span>Office: <strong className="text-[#1a2533]">Thane Regional Office</strong></span>
              <span>Desk: <strong className="text-[#1a2533]">Land / Plot Scrutiny</strong></span>
              <span>Role: <strong className="text-[#1a2533]">Scrutiny Officer</strong></span>
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[10px] text-[#374151]">Last refreshed: 22 Sep 2026, 10:47 AM</span>
            <span className="text-[10px] bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded">Prototype operational data</span>
            {/* Filters */}
            <div className="flex items-center gap-1 bg-white border border-[#d1d9e0] rounded p-0.5">
              {['all', 'my-desk', 'sla-risk'].map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`text-[11px] px-2.5 py-1 rounded transition-colors ${activeFilter === f ? 'bg-[#1a3a5c] text-white' : 'text-[#1a2533] hover:text-[#1a3a5c]'}`}
                >
                  {f === 'all' ? 'All' : f === 'my-desk' ? 'My Desk' : 'SLA Risk'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
          {kpis.map(k => (
            <button
              key={k.id}
              onClick={() => onNavigate((k as any).nav)}
              className={`${k.bg} border-2 ${k.border} ${(k as any).accent || ''} rounded-none p-3 text-left hover:shadow-md transition-all focus-visible:ring-2 focus-visible:ring-[#1a56db] group cursor-pointer`}
              aria-label={`${k.label}: ${k.value}. ${k.sub}. ${k.dest}`}
              title={k.dest}
            >
              <p className="text-[10px] text-[#1a2533] font-medium leading-tight group-hover:text-[#1a56db] transition-colors">{k.label}</p>
              <p className={`text-2xl font-bold mt-1 leading-none ${k.color}`}>{k.value}</p>
              <p className="text-[10px] text-[#374151] mt-1 leading-tight">{k.sub}</p>
            </button>
          ))}
        </div>

        {/* Row 1: My Actions | SLA Risk */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

          {/* Panel A — My Actions */}
          <section className="bg-white border border-[#d1d9e0] rounded" aria-labelledby="panel-actions">
            <PanelHeader title="My Actions" linkLabel="View My Queue →" onLinkClick={() => onNavigate('dept-queue')} icon={<MIcon.Inbox />} />
            <div className="overflow-x-auto">
              <table className="w-full text-xs" role="table" aria-label="My action items">
                <thead>
                  <tr className="bg-[#f8f9fb] text-[#1a2533] text-left">
                    <th className="px-4 py-2 font-medium">Type / Application</th>
                    <th className="px-3 py-2 font-medium">Service</th>
                    <th className="px-3 py-2 font-medium">State</th>
                    <th className="px-3 py-2 font-medium">Age</th>
                    <th className="px-3 py-2 font-medium">SLA</th>
                    <th className="px-3 py-2 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#94a3b8]">
                  {myActions.map(a => (
                    <tr key={a.id} className="hover:bg-[#f8f9fb] transition-colors">
                      <td className="px-4 py-2.5">
                        <p className="text-[10px] text-[#374151] font-medium uppercase tracking-wide">{a.type}</p>
                        <p className="font-mono text-[#1a56db] font-medium">{a.id}</p>
                        <p className="text-[#1a2533] truncate max-w-[160px]">{a.business}</p>
                      </td>
                      <td className="px-3 py-2.5 text-[#1a2533] whitespace-nowrap">{a.service}</td>
                      <td className="px-3 py-2.5"><StateChip label={a.stateLabel} color={stateChipColor(a.state)} /></td>
                      <td className="px-3 py-2.5 text-[#1a2533] whitespace-nowrap">{a.age}</td>
                      <td className="px-3 py-2.5"><SlaChip state={a.sla} /></td>
                      <td className="px-3 py-2.5">
                        <button onClick={() => onOpenApp(a.id)} className="bg-[#1a3a5c] text-white text-[10px] font-semibold px-2.5 py-1 rounded hover:bg-[#0f2540] transition-colors whitespace-nowrap">
                          {a.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Panel B — SLA Risk */}
          <section className="bg-white border border-[#d1d9e0] rounded" aria-labelledby="panel-sla">
            <PanelHeader title="SLA Risk" linkLabel="View SLA Dashboard →" onLinkClick={() => onNavigate('dept-sla')} icon={<Icon.Warning />} />
            <div className="overflow-x-auto">
              <table className="w-full text-xs" aria-label="SLA risk applications">
                <thead>
                  <tr className="bg-[#f8f9fb] text-[#1a2533] text-left">
                    <th className="px-4 py-2 font-medium">Application / Business</th>
                    <th className="px-3 py-2 font-medium">Desk</th>
                    <th className="px-3 py-2 font-medium">Elapsed</th>
                    <th className="px-3 py-2 font-medium">Remaining</th>
                    <th className="px-3 py-2 font-medium">State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#94a3b8]">
                  {slaRisk.map(r => (
                    <tr key={r.id} className="hover:bg-[#f8f9fb] transition-colors">
                      <td className="px-4 py-2.5">
                        <p className="font-mono text-[#1a56db] font-medium">{r.id}</p>
                        <p className="text-[#1a2533] truncate max-w-[140px]">{r.business}</p>
                        <p className="text-[#374151]">{r.service}</p>
                      </td>
                      <td className="px-3 py-2.5 text-[#1a2533] whitespace-nowrap">{r.desk}</td>
                      <td className="px-3 py-2.5 text-[#1a2533] whitespace-nowrap">{r.elapsed} / {r.sla}</td>
                      <td className={`px-3 py-2.5 font-semibold whitespace-nowrap ${r.state === 'breached' || r.state === 'escalated' ? 'text-red-600' : 'text-amber-600'}`}>{r.remaining}</td>
                      <td className="px-3 py-2.5"><SlaChip state={r.state} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Row 2: Inspection Queue | Current Bottlenecks */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

          {/* Panel C — Inspection Queue */}
          <section className="bg-white border border-[#d1d9e0] rounded" aria-labelledby="panel-inspections">
            <PanelHeader title="Inspection Queue" linkLabel="View All Inspections →" onLinkClick={() => onNavigate('dept-insp-queue')} icon={<MIcon.MapPin />} />
            <div className="divide-y divide-[#94a3b8]">
              {(['upcoming', 'overdue', 'reinspection'] as const).map(cat => {
                const rows = inspections[cat]
                const catLabel = { upcoming: 'Upcoming', overdue: 'Overdue', reinspection: 'Re-inspection' }
                const catColor = { upcoming: 'text-[#1a2533]', overdue: 'text-red-700', reinspection: 'text-amber-700' }
                return rows.map((item, idx) => (
                  <div key={item.id} className="px-4 py-3 hover:bg-[#f8f9fb] transition-colors">
                    {idx === 0 && (
                      <p className={`text-[10px] font-semibold uppercase tracking-wider mb-2 ${catColor[cat]}`}>{catLabel[cat]}</p>
                    )}
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-mono text-xs text-[#1a56db] font-medium">{item.id}</p>
                        <p className="text-sm font-medium text-[#1a2533] truncate">{item.business}</p>
                        <p className="text-xs text-[#1a2533]">{item.service} · {item.site}</p>
                        <p className="text-xs text-[#374151]">{item.type} · Target: {item.date}</p>
                      </div>
                      <div className="shrink-0 text-right space-y-1">
                        <SlaChip state={item.sla} />
                        <p className={`text-[10px] font-medium ${item.assigned ? 'text-green-700' : 'text-red-600'}`}>
                          {item.assigned ? 'Assigned' : 'Unassigned'}
                        </p>
                        <button onClick={() => onOpenApp(item.id)} className="text-[11px] text-[#1a56db] hover:underline">{cat === 'overdue' ? 'Schedule' : 'Open'}</button>
                      </div>
                    </div>
                  </div>
                ))
              })}
            </div>
          </section>

          {/* Panel D — Current Bottlenecks */}
          <section className="bg-white border border-[#d1d9e0] rounded" aria-labelledby="panel-bottlenecks">
            <PanelHeader title="Current Process Insights" linkLabel="View Bottleneck Analytics →" onLinkClick={() => onNavigate('dept-bottleneck')} icon={<MIcon.Activity />} />
            <div className="px-4 py-2 bg-[#f8f9fb] border-b border-[#e8edf2]">
              <p className="text-[10px] text-[#374151]">Based on current operational data · Updated: 22 Sep 2026</p>
            </div>
            <div className="divide-y divide-[#94a3b8]">
              {bottlenecks.map(b => (
                <div key={b.rank} className="px-4 py-3 hover:bg-[#f8f9fb] transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f0f4f8] text-[#1a2533] text-xs font-bold flex items-center justify-center">{b.rank}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1a2533]">{b.category}</p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5">
                        <span className="text-xs font-bold text-[#1a3a5c]">{b.count} applications</span>
                        <span className="text-[11px] text-[#374151]">{b.delta}</span>
                      </div>
                      <p className="text-[11px] text-[#1a2533] mt-0.5">{b.service} · {b.impact}</p>
                    </div>
                    <button onClick={() => onNavigate('dept-bottleneck')} className="shrink-0 text-[11px] text-[#1a56db] hover:underline whitespace-nowrap">View →</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Row 3: Workload | Service Mix */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

          {/* Panel E — Workload */}
          <section className="bg-white border border-[#d1d9e0] rounded" aria-labelledby="panel-workload">
            <PanelHeader title="Workload" linkLabel="View Workload & Capacity →" onLinkClick={() => onNavigate('dept-workload')} icon={<MIcon.TrendingUp />} />
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-4 gap-3 text-center">
                {[
                  { label: 'Total Active', value: totalWork, color: 'text-[#1a3a5c]' },
                  { label: 'Avg Age', value: '4.2d', color: 'text-[#1a2533]' },
                  { label: 'SLA Risk', value: 7, color: 'text-amber-700' },
                  { label: 'SLA Breached', value: 2, color: 'text-red-700' },
                ].map(s => (
                  <div key={s.label} className="bg-[#f8f9fb] rounded p-2">
                    <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-[10px] text-[#1a2533] mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-xs font-semibold text-[#1a2533] mb-2">By Service</p>
                <div className="space-y-1.5">
                  {workloadByService.map(r => (
                    <div key={r.service} className="flex items-center gap-2">
                      <p className="text-xs text-[#1a2533] w-36 shrink-0 truncate">{r.service}</p>
                      <div className="flex-1 bg-[#f0f4f8] rounded-full h-2 overflow-hidden">
                        <div className="h-full bg-[#1a3a5c] rounded-full" style={{ width: `${(r.count / totalWork) * 100}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-[#1a3a5c] w-6 text-right">{r.count}</span>
                      {r.slaRisk > 0 && <span className="text-[10px] text-amber-700 font-medium w-12 shrink-0">{r.slaRisk} at risk</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-[#1a2533] mb-2">Application Age</p>
                <div className="flex gap-2">
                  {ageBuckets.map(b => (
                    <div key={b.label} className="flex-1 text-center bg-[#f8f9fb] rounded p-2">
                      <p className="text-sm font-bold text-[#1a3a5c]">{b.count}</p>
                      <p className="text-[10px] text-[#374151] leading-tight">{b.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Panel F — Service Mix */}
          <section className="bg-white border border-[#d1d9e0] rounded" aria-labelledby="panel-servicemix">
            <PanelHeader title="Service Mix" linkLabel="View Service Queues →" onLinkClick={() => onNavigate('dept-queue')} icon={<MIcon.Clipboard />} />
            <div className="px-4 py-2 bg-[#f8f9fb] border-b border-[#e8edf2]">
              <p className="text-[10px] text-[#374151]">Configurable service groups · not a fixed MIDC taxonomy</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs" aria-label="Service mix breakdown">
                <thead>
                  <tr className="bg-[#f8f9fb] text-[#1a2533] text-right">
                    <th className="px-4 py-2 font-medium text-left">Service</th>
                    <th className="px-3 py-2 font-medium">Active</th>
                    <th className="px-3 py-2 font-medium">New</th>
                    <th className="px-3 py-2 font-medium">Scrutiny</th>
                    <th className="px-3 py-2 font-medium">Query</th>
                    <th className="px-3 py-2 font-medium">Inspection</th>
                    <th className="px-3 py-2 font-medium">Decision</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#94a3b8]">
                  {serviceMix.map(s => (
                    <tr key={s.service} className="hover:bg-[#f8f9fb] transition-colors text-right">
                      <td className="px-4 py-2.5 text-left font-medium text-[#1a2533]">{s.service}</td>
                      <td className="px-3 py-2.5 font-bold text-[#1a3a5c]">{s.active}</td>
                      <td className="px-3 py-2.5 text-[#1a56db] font-semibold">{s.new}</td>
                      <td className="px-3 py-2.5 text-[#1a2533]">{s.scrutiny}</td>
                      <td className="px-3 py-2.5 text-amber-700">{s.query}</td>
                      <td className="px-3 py-2.5 text-[#1a2533]">{s.inspection}</td>
                      <td className="px-3 py-2.5 text-green-700 font-semibold">{s.decision}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2 border-t border-[#f0f4f8]">
              <p className="text-[10px] text-[#374151]">Showing configured workflow examples only. Actual service catalogue is system-configured.</p>
            </div>
          </section>
        </div>

      </div>
    </div>
  )
}

// ─── M03 / M04 Shared Data ───────────────────────────────────────────────────


// ─── M03 — MIDC Queue / Inbox ─────────────────────────────────────────────────


function AppIdCell({ id, onOpenApp }: { id: string; onOpenApp?: (applicationId: string) => void }) {
  return <button onClick={() => onOpenApp?.(id)} className="font-mono text-xs text-[#1a56db] font-semibold hover:underline focus-visible:ring-2 focus-visible:ring-[#1a56db] rounded" title="Open application">{id}</button>
}

function SLACell({ target, elapsed, remaining, state }: { target: string; elapsed: string; remaining: string; state: 'normal' | 'approaching' | 'breached' }) {
  const colors = { normal: 'text-green-700', approaching: 'text-amber-700', breached: 'text-red-700' }
  return (
    <div className="text-xs">
      <p className="text-[#1a2533]">{target} SLA</p>
      <p className="text-[#374151]">{elapsed} elapsed</p>
      <p className={`font-semibold ${colors[state]}`}>{remaining}</p>
    </div>
  )
}

function RouteCell({ route, factors }: { route: string; factors: string[] }) {
  const badge = route === 'Enhanced Review' ? 'bg-purple-100 text-purple-800' : route === 'Inspection-heavy Route' ? 'bg-orange-100 text-orange-800' : 'bg-[#f0f4f8] text-[#1a2533]'
  return (
    <div>
      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${badge}`}>{route}</span>
      {factors.length > 0 && <p className="text-[10px] text-[#374151] mt-0.5">{factors.length} factor{factors.length > 1 ? 's' : ''}</p>}
    </div>
  )
}

function DepCell({ dep }: { dep: string }) {
  if (dep === 'None') return <span className="text-[11px] text-[#374151]">—</span>
  const isBlocking = dep.includes('pending') || dep.includes('dependency')
  return <span className={`text-[11px] font-medium ${isBlocking ? 'text-amber-700' : 'text-[#1a2533]'}`}>{dep}</span>
}

function QueueTable({ apps, onOpenApp }: { apps: typeof QUEUE_APPS; onOpenApp?: (applicationId: string) => void }) {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const toggleRow = (id: string) => setSelected(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n
  })
  const allSelected = apps.length > 0 && apps.every(a => selected.has(a.id))
  const toggleAll = () => setSelected(allSelected ? new Set() : new Set(apps.map(a => a.id)))

  if (apps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-sm font-medium text-[#1a2533]">No applications match these filters.</p>
        <p className="text-xs text-[#374151] mt-1">Try adjusting filters or clearing the selection.</p>
        <button className="mt-4 text-sm text-[#1a56db] hover:underline">Clear Filters</button>
      </div>
    )
  }

  const colBorder = 'border-r border-[#94a3b8] last:border-r-0'
  const thClass = `px-4 py-3 font-semibold text-white/90 whitespace-nowrap ${colBorder}`
  const tdClass = `px-4 py-3 ${colBorder}`

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs min-w-[1200px] border-collapse" aria-label="Application queue">
        <colgroup>
          <col className="w-8" />
          <col className="w-36" />   {/* App ID */}
          <col className="w-44" />   {/* Business */}
          <col className="w-32" />   {/* Service */}
          <col className="w-28" />   {/* Stage */}
          <col className="w-36" />   {/* Desk */}
          <col className="w-28" />   {/* Received */}
          <col className="w-36" />   {/* SLA — generous width */}
          <col className="w-36" />   {/* Route */}
          <col className="w-28" />   {/* Dependency */}
          <col className="w-36" />   {/* Status */}
          <col className="w-36" />   {/* Action Required */}
          <col className="w-16" />   {/* Open */}
        </colgroup>
        <thead className="sticky top-0 z-10">
          <tr className="bg-[#1a3a5c] text-white text-left border-b-2 border-[#0f2540]">
            <th className={`px-3 py-3 w-8 ${colBorder}`}><input type="checkbox" checked={allSelected} onChange={toggleAll} className="rounded border-white/30" aria-label="Select all rows" /></th>
            <th className={thClass}>Application ID</th>
            <th className={thClass}>Business</th>
            <th className={thClass}>MIDC Service</th>
            <th className={thClass}>Project Stage</th>
            <th className={thClass}>Current Desk</th>
            <th className={thClass}>Received</th>
            <th className={thClass}>SLA Status</th>
            <th className={thClass}>Scrutiny Route</th>
            <th className={thClass}>Dependency</th>
            <th className={thClass}>Status</th>
            <th className={thClass}>Action Required</th>
            <th className={`px-4 py-3 ${colBorder}`}></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#94a3b8] bg-white">
          {apps.map(a => (
            <tr key={a.id} className={`hover:bg-[#eaf2ff] transition-colors ${selected.has(a.id) ? 'bg-[#dbeafe]' : ''}`}>
              <td className={`px-3 py-3 ${colBorder}`}>
                <input type="checkbox" checked={selected.has(a.id)} onChange={() => toggleRow(a.id)} className="rounded border-[#d1d9e0]" aria-label={`Select ${a.id}`} />
              </td>
              <td className={tdClass}><AppIdCell id={a.id} onOpenApp={onOpenApp} /></td>
              <td className={tdClass}>
                <p className="font-medium text-[#1a2533] truncate" title={a.business}>{a.business}</p>
                <p className="text-[#374151] mt-0.5">{a.applicant}</p>
              </td>
              <td className={tdClass}>
                <span className="inline-block text-[10px] font-semibold bg-[#ebf3ff] text-[#1a3a5c] px-1.5 py-0.5 rounded whitespace-nowrap">{a.service}</span>
              </td>
              <td className={`${tdClass} text-[#1a2533] whitespace-nowrap`}>{a.stage}</td>
              <td className={`${tdClass} text-[#1a2533]`} title={a.desk}>{a.desk}</td>
              <td className={tdClass}>
                <p className="text-[#1a2533] whitespace-nowrap">{a.received}</p>
                <p className="text-[#374151] mt-0.5">{a.age} ago</p>
              </td>
              <td className={tdClass}><SLACell target={a.slaTarget} elapsed={a.elapsed} remaining={a.remaining} state={a.slaState} /></td>
              <td className={tdClass}><RouteCell route={a.route} factors={a.routeFactors} /></td>
              <td className={tdClass}><DepCell dep={a.dependency} /></td>
              <td className={tdClass}>
                <p className="font-mono text-[10px] text-[#1a2533] font-medium">{a.state}</p>
                {a.overlay && (
                  <span className={`inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded mt-0.5 ${
                    a.overlay === 'SLA Breached' ? 'bg-red-100 text-red-700' :
                    a.overlay === 'Awaiting Entrepreneur' ? 'bg-amber-100 text-amber-800' :
                    a.overlay === 'Inspection Required' ? 'bg-orange-100 text-orange-800' :
                    a.overlay === 'Decision Pending' ? 'bg-green-100 text-green-800' :
                    a.overlay === 'Escalated' ? 'bg-purple-100 text-purple-800' :
                    a.overlay === 'New' ? 'bg-[#ebf3ff] text-[#1a56db]' :
                    'bg-[#f0f4f8] text-[#1a2533]'
                  }`}>{a.overlay}</span>
                )}
              </td>
              <td className={`${tdClass} text-[#1a2533]`}>{a.actionRequired}</td>
              <td className={tdClass}>
                <button onClick={() => onOpenApp?.(a.id)} className="bg-[#1a3a5c] text-white text-[10px] font-semibold px-3 py-1.5 rounded hover:bg-[#0f2540] transition-colors whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#1a56db]">
                  Open
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function M03QueuePage({ onOpenApp }: { onOpenApp?: (applicationId: string) => void }) {
  const [activeTab, setActiveTab] = useState('all')
  const [sortBy, setSortBy] = useState('sla-risk')
  const [activeFilters, setActiveFilters] = useState<{label: string; key: string}[]>([])

  const tabFilter = (tab: string, apps: typeof QUEUE_APPS) => {
    if (tab === 'all') return apps
    if (tab === 'my-actions') return apps.filter(a => ['approaching','breached'].includes(a.slaState) || a.overlay !== '')
    if (tab === 'new') return apps.filter(a => a.overlay === 'New' || a.state === 'SUBMITTED')
    if (tab === 'scrutiny') return apps.filter(a => ['INITIAL_SCRUTINY','TECHNICAL_SCRUTINY','DOCUMENT_SCRUTINY'].includes(a.state))
    if (tab === 'query') return apps.filter(a => a.state === 'QUERY_RAISED')
    if (tab === 'awaiting') return apps.filter(a => a.overlay === 'Awaiting Entrepreneur')
    if (tab === 'resubmission') return apps.filter(a => a.state === 'RESUBMITTED')
    if (tab === 'inspection') return apps.filter(a => a.state === 'INSPECTION_PENDING')
    if (tab === 'decision') return apps.filter(a => a.state === 'FINAL_DECISION')
    if (tab === 'sla-risk') return apps.filter(a => a.slaState === 'approaching')
    if (tab === 'sla-breached') return apps.filter(a => a.slaState === 'breached')
    return apps
  }

  const removeFilter = (key: string) => setActiveFilters(f => f.filter(x => x.key !== key))
  const filtered = tabFilter(activeTab, QUEUE_APPS)

  const summary = {
    total: QUEUE_APPS.length,
    new: QUEUE_APPS.filter(a => a.state === 'SUBMITTED').length,
    scrutiny: QUEUE_APPS.filter(a => ['INITIAL_SCRUTINY','TECHNICAL_SCRUTINY','DOCUMENT_SCRUTINY'].includes(a.state)).length,
    awaiting: QUEUE_APPS.filter(a => a.overlay === 'Awaiting Entrepreneur').length,
    inspection: QUEUE_APPS.filter(a => a.state === 'INSPECTION_PENDING').length,
    decision: QUEUE_APPS.filter(a => a.state === 'FINAL_DECISION').length,
    slaRisk: QUEUE_APPS.filter(a => a.slaState === 'approaching').length,
    slaBreached: QUEUE_APPS.filter(a => a.slaState === 'breached').length,
  }

  return (
    <div className="bg-[#f8f9fb] flex-1">
      <div className="max-w-full px-6 py-5 space-y-4">

        {/* Page header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <Breadcrumb items={[{ label: 'Department Home', href: '/department' }, { label: 'Queue / Inbox' }]} />
            <h1 className="text-xl font-bold text-[#1a3a5c] mt-2">MIDC Queue / Inbox</h1>
            <p className="text-sm text-[#1a2533] mt-0.5">Applications and actions within your permitted MIDC workflow scope.</p>
          </div>
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <span className="text-[10px] text-[#374151]">Last refreshed: 22 Sep 2026, 10:47 AM</span>
            <button className="flex items-center gap-1.5 border border-[#d1d9e0] bg-white text-xs text-[#1a2533] px-3 py-1.5 rounded hover:bg-[#f0f4f8] transition-colors">
              <MIcon.Refresh /> Refresh
            </button>
            <button className="flex items-center gap-1.5 bg-[#1a3a5c] text-white text-xs font-medium px-3 py-1.5 rounded hover:bg-[#0f2540] transition-colors">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              Search Applications
            </button>
          </div>
        </div>

        {/* Summary strip — dark themed */}
        <div className="flex flex-wrap gap-0 text-xs bg-[#0f2540] border border-[#0a1a2e] rounded overflow-hidden" style={{ color: 'white' }}>
          {[
            { l: 'Total Visible', v: summary.total, vc: '#ffffff', fw: 'bold', bg: 'bg-[#1a3a5c]' },
            { l: 'New', v: summary.new, vc: '#93c5fd', fw: 'semibold', bg: '' },
            { l: 'In Scrutiny', v: summary.scrutiny, vc: '#ffffff', fw: 'normal', bg: '' },
            { l: 'Awaiting Entrepreneur', v: summary.awaiting, vc: '#fcd34d', fw: 'normal', bg: '' },
            { l: 'Inspection', v: summary.inspection, vc: '#fdba74', fw: 'normal', bg: '' },
            { l: 'Decision Pending', v: summary.decision, vc: '#6ee7b7', fw: 'normal', bg: '' },
            { l: 'SLA Risk', v: summary.slaRisk, vc: '#fcd34d', fw: 'semibold', bg: summary.slaRisk > 0 ? 'bg-amber-900/40' : '' },
            { l: 'SLA Breached', v: summary.slaBreached, vc: '#f87171', fw: 'bold', bg: summary.slaBreached > 0 ? 'bg-red-900/40' : '' },
          ].map((s, i) => (
            <span key={i} className={`flex items-center gap-2 px-4 py-2.5 border-r border-white/10 last:border-r-0 ${s.bg}`}>
              <span className="whitespace-nowrap font-medium" style={{ color: 'rgba(255,255,255,0.72)' }}>{s.l}</span>
              <span className="text-base leading-none" style={{ color: s.vc, fontWeight: s.fw === 'bold' ? 700 : s.fw === 'semibold' ? 600 : 400 }}>{s.v}</span>
            </span>
          ))}
        </div>

        {/* Queue tabs */}
        <div className="flex overflow-x-auto border-b border-[#d1d9e0] bg-white rounded-t">
          {Q_TABS.map(tab => {
            const count = tabFilter(tab.id, QUEUE_APPS).length
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1a56db]
                  ${activeTab === tab.id ? 'border-[#1a56db] text-[#1a56db] bg-[#f8fbff]' : 'border-transparent text-[#1a2533] hover:text-[#1a3a5c] hover:bg-[#f8f9fb]'}`}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                {tab.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${activeTab === tab.id ? 'bg-[#ebf3ff] text-[#1a56db]' : 'bg-[#f0f4f8] text-[#374151]'}`}>{count}</span>
              </button>
            )
          })}
        </div>

        {/* Filter bar + active chips */}
        <div className="bg-white border border-[#d1d9e0] rounded p-3 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#1a2533] shrink-0">Filters:</span>
            {(['Land / Plot', 'Planning / Building', 'Water / Utility'] as const).map(s => (
              <button key={s} onClick={() => {
                const key = `service:${s}`
                setActiveFilters(f => f.find(x => x.key === key) ? f.filter(x => x.key !== key) : [...f, { label: `Service: ${s}`, key }])
              }} className={`text-[11px] px-2.5 py-1 border rounded transition-colors ${activeFilters.find(x => x.key === `service:${s}`) ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'border-[#d1d9e0] text-[#1a2533] hover:border-[#1a3a5c] hover:text-[#1a3a5c]'}`}>{s}</button>
            ))}
            <div className="w-px h-4 bg-[#d1d9e0]" aria-hidden="true" />
            <select className="text-xs border border-[#d1d9e0] rounded px-2 py-1 text-[#1a2533] bg-white focus:outline-none focus:ring-2 focus:ring-[#1a56db]" aria-label="Sort by">
              <option value="sla-risk">Sort: SLA Risk</option>
              <option value="oldest">Sort: Oldest</option>
              <option value="newest">Sort: Newest</option>
              <option value="received">Sort: Received Date</option>
            </select>
            <select className="text-xs border border-[#d1d9e0] rounded px-2 py-1 text-[#1a2533] bg-white focus:outline-none focus:ring-2 focus:ring-[#1a56db]" aria-label="Date range">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Today</option>
              <option>Custom range</option>
            </select>
            {activeFilters.length > 0 && (
              <button onClick={() => setActiveFilters([])} className="text-[11px] text-red-600 hover:underline ml-1">Clear All</button>
            )}
            <button className="ml-auto text-[11px] border border-[#d1d9e0] text-[#1a2533] px-2.5 py-1 rounded hover:bg-[#f0f4f8] transition-colors flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export
            </button>
          </div>
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1 border-t border-[#f0f4f8]">
              {activeFilters.map(f => (
                <span key={f.key} className="flex items-center gap-1 text-[11px] bg-[#ebf3ff] text-[#1a3a5c] border border-[#bdd4f5] px-2 py-0.5 rounded-full">
                  {f.label}
                  <button onClick={() => removeFilter(f.key)} className="text-[#1a56db] hover:text-red-600 transition-colors" aria-label={`Remove ${f.label} filter`}>
                    <Icon.X />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
          <QueueTable apps={filtered} onOpenApp={onOpenApp} />
          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#d1d9e0] text-xs text-[#1a2533]">
            <span>Showing 1–{filtered.length} of {filtered.length} applications (prototype data)</span>
            <div className="flex items-center gap-1">
              <button disabled className="px-2.5 py-1 border border-[#d1d9e0] rounded text-[#374151] cursor-not-allowed">Previous</button>
              <button className="px-2.5 py-1 border border-[#1a56db] bg-[#ebf3ff] text-[#1a56db] rounded font-semibold">1</button>
              <button disabled className="px-2.5 py-1 border border-[#d1d9e0] rounded text-[#374151] cursor-not-allowed">Next</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

// ─── M04 — Application Search ─────────────────────────────────────────────────

export function M04SearchPage({ onOpenApp, initialQuery = '' }: { onOpenApp?: (applicationId: string) => void; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<typeof QUEUE_APPS>(() => {
    const q = initialQuery.trim().toLowerCase()
    return q ? QUEUE_APPS.filter(a => [a.id, a.business, a.applicant, a.service].some(value => value.toLowerCase().includes(q))) : []
  })
  const [searchState, setSearchState] = useState<'idle' | 'results' | 'no-results' | 'exact'>(() =>
    !initialQuery.trim() ? 'idle' : results.length === 0 ? 'no-results' :
      results.length === 1 && results[0].id.toLowerCase() === initialQuery.trim().toLowerCase() ? 'exact' : 'results'
  )
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSearch = () => {
    if (!query.trim()) return
    const q = query.trim().toLowerCase()
    const found = QUEUE_APPS.filter(a =>
      a.id.toLowerCase().includes(q) ||
      a.business.toLowerCase().includes(q) ||
      a.applicant.toLowerCase().includes(q) ||
      a.service.toLowerCase().includes(q)
    )
    setResults(found)
    if (found.length === 0) setSearchState('no-results')
    else if (found.length === 1 && found[0].id.toLowerCase() === q) setSearchState('exact')
    else setSearchState('results')
  }

  return (
    <div className="bg-[#f8f9fb] flex-1">
      <div className="max-w-full px-6 py-5 space-y-5">

        <div>
          <Breadcrumb items={[{ label: 'Department Home', href: '/department' }, { label: 'Application Search' }]} />
          <h1 className="text-xl font-bold text-[#1a3a5c] mt-2">Application Search</h1>
          <p className="text-sm text-[#1a2533] mt-0.5">Find applications, projects and approval records within your permitted scope.</p>
        </div>

        {/* Search bar */}
        <div className="bg-white border border-[#d1d9e0] rounded p-4 space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="Search by Application ID, Business, Applicant, Plot Number or Approval / Order Number"
                aria-label="Search applications"
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-[#d1d9e0] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#1a56db] placeholder:text-[#9aa5b4]"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#374151]" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </span>
            </div>
            <button onClick={handleSearch} className="bg-[#1a3a5c] text-white text-sm font-semibold px-5 py-2.5 rounded hover:bg-[#0f2540] transition-colors focus-visible:ring-2 focus-visible:ring-[#1a56db] focus-visible:ring-offset-2">
              Search
            </button>
            <button onClick={() => setShowAdvanced(v => !v)} className={`flex items-center gap-1.5 text-sm border px-3 py-2.5 rounded transition-colors ${showAdvanced ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'border-[#d1d9e0] text-[#1a2533] hover:bg-[#f0f4f8]'}`} aria-expanded={showAdvanced}>
              Advanced Filters
              <span className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`}><Icon.ChevronDown /></span>
            </button>
          </div>

          {/* Search scope */}
          <p className="text-[11px] text-[#374151] flex items-center gap-1">
            <Icon.Info />
            Search scope: MIDC / Thane Regional Office — Land / Plot Scrutiny desk authorised scope
          </p>

          {/* Advanced filters */}
          {showAdvanced && (
            <div className="border-t border-[#f0f4f8] pt-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { group: 'Application', fields: ['Application ID', 'Service', 'Status', 'Project Stage', 'Received Date'] },
                { group: 'Business', fields: ['Business Name', 'Applicant', 'Entity Type'] },
                { group: 'Location', fields: ['District', 'MIDC Estate', 'Plot Number'] },
                { group: 'Workflow', fields: ['Current Desk', 'Scrutiny Route', 'SLA State', 'Dependency State'] },
                { group: 'Decision', fields: ['Approval / Order No.', 'Decision Status', 'Decision Date'] },
              ].map(g => (
                <div key={g.group}>
                  <p className="text-[10px] font-semibold text-[#374151] uppercase tracking-wider mb-2">{g.group}</p>
                  <div className="space-y-1.5">
                    {g.fields.map(f => (
                      <input key={f} type="text" placeholder={f} aria-label={f}
                        className="w-full px-2.5 py-1.5 text-xs border border-[#d1d9e0] rounded focus:outline-none focus:ring-2 focus:ring-[#1a56db] placeholder:text-[#b0bcc9]" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Results */}
        {searchState === 'idle' && (
          <div className="bg-white border border-[#d1d9e0] rounded flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-full bg-[#f0f4f8] flex items-center justify-center mb-3 text-[#6b7280]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </div>
            <p className="text-sm font-medium text-[#1a2533]">Search for an application, business, applicant or approval record.</p>
            <p className="text-xs text-[#374151] mt-1">Results are limited to your authorised scope.</p>
          </div>
        )}

        {searchState === 'exact' && results.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded p-4 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="text-green-600 mt-0.5"><Icon.Check /></span>
              <div>
                <p className="text-sm font-semibold text-green-800">Exact match found</p>
                <p className="font-mono text-sm text-green-700 mt-0.5">{results[0].id}</p>
                <p className="text-xs text-green-700">{results[0].business} · {results[0].service}</p>
              </div>
            </div>
            <button onClick={() => onOpenApp?.(results[0].id)} className="bg-[#1a3a5c] text-white text-xs font-semibold px-4 py-2 rounded hover:bg-[#0f2540] transition-colors whitespace-nowrap">
              Open Application →
            </button>
          </div>
        )}

        {searchState === 'no-results' && (
          <div className="bg-white border border-[#d1d9e0] rounded flex flex-col items-center justify-center py-12 text-center">
            <p className="text-sm font-medium text-[#1a2533]">No applications found within your permitted scope.</p>
            <p className="text-xs text-[#374151] mt-1">The record may exist outside your authorised access.</p>
            <div className="flex gap-3 mt-4">
              <button onClick={() => { setQuery(''); setSearchState('idle') }} className="text-xs border border-[#d1d9e0] text-[#1a2533] px-3 py-1.5 rounded hover:bg-[#f0f4f8] transition-colors">Clear Search</button>
              <button onClick={() => setShowAdvanced(true)} className="text-xs text-[#1a56db] hover:underline">Try Advanced Filters</button>
            </div>
          </div>
        )}

        {(searchState === 'results' || searchState === 'exact') && results.length > 0 && (
          <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#d1d9e0]">
              <p className="text-sm font-semibold text-[#1a2533]">{results.length} result{results.length !== 1 ? 's' : ''} found</p>
              <span className="text-[11px] text-[#374151]">Prototype data only</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[900px]" aria-label="Search results">
                <thead>
                  <tr className="bg-[#f0f4f8] text-[#1a2533] text-left border-b border-[#d1d9e0]">
                    <th className="px-3 py-2.5 font-semibold">Application ID</th>
                    <th className="px-3 py-2.5 font-semibold">Business</th>
                    <th className="px-3 py-2.5 font-semibold">Applicant</th>
                    <th className="px-3 py-2.5 font-semibold">Service</th>
                    <th className="px-3 py-2.5 font-semibold">Project Stage</th>
                    <th className="px-3 py-2.5 font-semibold">Current Desk</th>
                    <th className="px-3 py-2.5 font-semibold">Status</th>
                    <th className="px-3 py-2.5 font-semibold">Last Updated</th>
                    <th className="px-3 py-2.5 font-semibold"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#94a3b8]">
                  {results.map(a => {
                    const q = query.toLowerCase()
                    const highlight = (text: string) => {
                      const idx = text.toLowerCase().indexOf(q)
                      if (idx === -1 || !q) return <span>{text}</span>
                      return <span>{text.slice(0, idx)}<mark className="bg-yellow-200 rounded">{text.slice(idx, idx + q.length)}</mark>{text.slice(idx + q.length)}</span>
                    }
                    return (
                      <tr key={a.id} className="hover:bg-[#f8f9fb] transition-colors">
                        <td className="px-3 py-2.5"><AppIdCell id={a.id} onOpenApp={onOpenApp} /></td>
                        <td className="px-3 py-2.5 max-w-[180px] truncate font-medium text-[#1a2533]" title={a.business}>{highlight(a.business)}</td>
                        <td className="px-3 py-2.5 text-[#1a2533]">{a.applicant}</td>
                        <td className="px-3 py-2.5"><span className="text-[10px] font-semibold bg-[#ebf3ff] text-[#1a3a5c] px-1.5 py-0.5 rounded">{a.service}</span></td>
                        <td className="px-3 py-2.5 text-[#1a2533] whitespace-nowrap">{a.stage}</td>
                        <td className="px-3 py-2.5 text-[#1a2533] whitespace-nowrap">{a.desk}</td>
                        <td className="px-3 py-2.5 font-mono text-[10px] text-[#1a2533]">{a.state}</td>
                        <td className="px-3 py-2.5 text-[#374151] whitespace-nowrap">{a.received}</td>
                        <td className="px-3 py-2.5">
                          <button onClick={() => onOpenApp?.(a.id)} className="bg-[#1a3a5c] text-white text-[10px] font-semibold px-3 py-1.5 rounded hover:bg-[#0f2540] transition-colors">Open</button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-[#d1d9e0] text-xs text-[#1a2533]">
              <span>Showing 1–{results.length} of {results.length} results</span>
              <div className="flex items-center gap-1">
                <button disabled className="px-2.5 py-1 border border-[#d1d9e0] rounded text-[#374151] cursor-not-allowed">Previous</button>
                <button className="px-2.5 py-1 border border-[#1a56db] bg-[#ebf3ff] text-[#1a56db] rounded font-semibold">1</button>
                <button disabled className="px-2.5 py-1 border border-[#d1d9e0] rounded text-[#374151] cursor-not-allowed">Next</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── M05 — Service / Queue Segmentation ──────────────────────────────────────


function ServiceStatusCell({ count, type }: { count: number; type: 'new' | 'review' | 'query' | 'resubmit' | 'inspect' | 'decision' | 'slaRisk' | 'slaBreached' }) {
  if (count === 0) return <span className="text-[#6b7280] text-xs">—</span>
  const colors: Record<string, string> = {
    new: 'text-[#1a56db] font-semibold',
    review: 'text-[#1a2533]',
    query: 'text-amber-700 font-medium',
    resubmit: 'text-purple-700',
    inspect: 'text-orange-700',
    decision: 'text-green-700 font-medium',
    slaRisk: 'text-amber-700 font-semibold',
    slaBreached: 'text-red-700 font-bold',
  }
  return <button className={`text-xs hover:underline focus-visible:ring-2 focus-visible:ring-[#1a56db] rounded ${colors[type]}`} title="View filtered queue">{count}</button>
}

function RoutingChain() {
  const steps = ['Application Submitted', 'Service Identified', 'Office / Region Resolved', 'Desk Assigned', 'Role Matched', 'Service Queue']
  return (
    <div className="flex flex-col gap-0">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-[#ebf3ff] border border-[#bdd4f5] text-[#1a56db] text-[10px] font-bold flex items-center justify-center">{i + 1}</div>
            {i < steps.length - 1 && <div className="w-0.5 h-4 bg-[#d1d9e0]" />}
          </div>
          <span className={`text-xs ${i === steps.length - 1 ? 'font-semibold text-[#1a3a5c]' : 'text-[#1a2533]'}`}>{s}</span>
        </div>
      ))}
    </div>
  )
}

export function M05ServicePage() {
  const [selected, setSelected] = useState<Service | null>(null)
  const [showRouting, setShowRouting] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [highlightId, setHighlightId] = useState<string | null>(null)

  const totals = SERVICES.reduce((acc, s) => ({
    active:   acc.active   + s.active,
    new:      acc.new      + s.new,
    review:   acc.review   + s.review,
    query:    acc.query    + s.query,
    resubmit: acc.resubmit + s.resubmit,
    inspect:  acc.inspect  + s.inspect,
    decision: acc.decision + s.decision,
    slaRisk:  acc.slaRisk  + s.slaRisk,
  }), { active: 0, new: 0, review: 0, query: 0, resubmit: 0, inspect: 0, decision: 0, slaRisk: 0 })

  const displayed = activeFilters.length > 0
    ? SERVICES.filter(s => activeFilters.some(f => s.slaRisk > 0 && f === 'sla-risk' || f === s.id))
    : SERVICES

  return (
    <div className="bg-[#f8f9fb] flex-1 flex">
      {/* Main area */}
      <div className="flex-1 min-w-0 overflow-y-auto">
        <div className="px-6 py-5 space-y-4 max-w-full">

          {/* Breadcrumb + header */}
          <Breadcrumb items={[{ label: 'Department Home', href: '/department' }, { label: 'Service Catalogue', href: '/department/services' }, { label: 'Services & Queue Segmentation' }]} />
          <div className="flex items-start justify-between gap-4 flex-wrap pb-4 border-b border-[#d1d9e0]">
            <div>
              <h1 className="text-xl font-bold text-[#1a3a5c]">MIDC Services & Queue Segmentation</h1>
              <p className="text-sm text-[#1a2533] mt-0.5">Service-wise operational view and configurable routing context</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] text-[#374151]">Updated: 22 Sep 2026, 10:47 AM</span>
              <button className="flex items-center gap-1.5 border border-[#d1d9e0] bg-white text-xs text-[#1a2533] px-3 py-1.5 rounded hover:bg-[#f0f4f8] transition-colors"><MIcon.Refresh /> Refresh</button>
              <span className="text-[10px] bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded">Prototype data</span>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-[#d1d9e0] rounded px-4 py-2.5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#1a2533] shrink-0">Filter:</span>
            <button onClick={() => setActiveFilters(f => f.includes('sla-risk') ? f.filter(x => x !== 'sla-risk') : [...f, 'sla-risk'])}
              className={`text-[11px] px-2.5 py-1 border rounded transition-colors ${activeFilters.includes('sla-risk') ? 'bg-amber-600 text-white border-amber-600' : 'border-[#d1d9e0] text-[#1a2533] hover:border-amber-500 hover:text-amber-700'}`}>
              SLA Risk
            </button>
            {activeFilters.length > 0 && <button onClick={() => setActiveFilters([])} className="text-[11px] text-red-600 hover:underline">Clear All</button>}
            <button onClick={() => setShowRouting(v => !v)} className={`ml-auto flex items-center gap-1.5 text-xs border px-3 py-1.5 rounded transition-colors ${showRouting ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'border-[#d1d9e0] text-[#1a2533] hover:bg-[#f0f4f8]'}`}>
              Routing Context
              <span className={`transition-transform ${showRouting ? 'rotate-180' : ''}`}><Icon.ChevronDown /></span>
            </button>
          </div>

          {/* Summary strip */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {[
              { l: 'Active', v: totals.active,   c: 'text-[#1a3a5c] font-bold' },
              { l: 'New',    v: totals.new,       c: 'text-[#1a56db] font-semibold' },
              { l: 'Under Review', v: totals.review, c: 'text-[#1a2533]' },
              { l: 'Query',  v: totals.query,     c: 'text-amber-700' },
              { l: 'Resubmission', v: totals.resubmit, c: 'text-purple-700' },
              { l: 'Inspection', v: totals.inspect, c: 'text-orange-700' },
              { l: 'Decision Pending', v: totals.decision, c: 'text-green-700' },
              { l: 'SLA Risk', v: totals.slaRisk, c: 'text-amber-700 font-bold' },
            ].map(s => (
              <div key={s.l} className="bg-white border border-[#d1d9e0] rounded p-2.5 text-center">
                <p className={`text-xl font-bold ${s.c}`}>{s.v}</p>
                <p className="text-[10px] text-[#374151] mt-0.5 leading-tight">{s.l}</p>
              </div>
            ))}
          </div>

          {/* Service Catalogue Table */}
          <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[#d1d9e0] flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#1a2533]">Service Catalogue</h2>
              <p className="text-[10px] text-[#374151]">Configurable service groups · not an exhaustive statutory taxonomy</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[900px]" aria-label="MIDC service catalogue">
                <thead>
                  <tr className="bg-[#f0f4f8] text-[#1a2533] text-left border-b border-[#d1d9e0]">
                    <th className="px-4 py-2.5 font-semibold">Service</th>
                    <th className="px-3 py-2.5 font-semibold text-right">Active</th>
                    <th className="px-3 py-2.5 font-semibold text-right">New</th>
                    <th className="px-3 py-2.5 font-semibold text-right">Under Review</th>
                    <th className="px-3 py-2.5 font-semibold text-right">Query</th>
                    <th className="px-3 py-2.5 font-semibold text-right">Resubmission</th>
                    <th className="px-3 py-2.5 font-semibold text-right">Inspection</th>
                    <th className="px-3 py-2.5 font-semibold text-right">Decision</th>
                    <th className="px-3 py-2.5 font-semibold text-right">SLA Risk</th>
                    <th className="px-3 py-2.5 font-semibold">Dependencies</th>
                    <th className="px-3 py-2.5 font-semibold"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#94a3b8]">
                  {displayed.map(svc => (
                    <tr
                      key={svc.id}
                      className={`hover:bg-[#f8f9fb] transition-colors cursor-pointer ${selected?.id === svc.id ? 'bg-[#ebf3ff] border-l-2 border-[#1a56db]' : ''}`}
                      onClick={() => setSelected((s: any) => s?.id === svc.id ? null : svc)}
                    >
                      <td className="px-4 py-3">
                        <p className="font-semibold text-[#1a2533]">{svc.name}</p>
                        <p className="text-[10px] text-[#374151]">Configured service</p>
                      </td>
                      <td className="px-3 py-3 text-right font-bold text-[#1a3a5c]">{svc.active}</td>
                      <td className="px-3 py-3 text-right"><ServiceStatusCell count={svc.new} type="new" /></td>
                      <td className="px-3 py-3 text-right"><ServiceStatusCell count={svc.review} type="review" /></td>
                      <td className="px-3 py-3 text-right"><ServiceStatusCell count={svc.query} type="query" /></td>
                      <td className="px-3 py-3 text-right"><ServiceStatusCell count={svc.resubmit} type="resubmit" /></td>
                      <td className="px-3 py-3 text-right"><ServiceStatusCell count={svc.inspect} type="inspect" /></td>
                      <td className="px-3 py-3 text-right"><ServiceStatusCell count={svc.decision} type="decision" /></td>
                      <td className="px-3 py-3 text-right">
                        {svc.slaRisk > 0
                          ? <span className="inline-flex items-center gap-1 text-amber-700 font-semibold">{svc.slaRisk}{svc.slaBreached > 0 && <span className="text-red-700 text-[10px]">+{svc.slaBreached}B</span>}</span>
                          : <span className="text-[#6b7280]">—</span>}
                      </td>
                      <td className="px-3 py-3">
                        {svc.deps[0] !== 'None'
                          ? <span className="text-[11px] text-amber-700 font-medium">{svc.deps.length} dependency</span>
                          : <span className="text-[11px] text-[#6b7280]">None</span>}
                      </td>
                      <td className="px-3 py-3">
                        <button className="text-[11px] text-[#1a56db] hover:underline whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#1a56db] rounded" onClick={e => { e.stopPropagation(); setSelected(svc) }}>
                          View Queue →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Service Mix bar chart */}
          <div className="bg-white border border-[#d1d9e0] rounded p-4">
            <h3 className="text-sm font-semibold text-[#1a2533] mb-3">Service Mix</h3>
            <div className="space-y-2">
              {SERVICES.map(svc => (
                <div key={svc.id} className="flex items-center gap-3">
                  <button onClick={() => setSelected((s: any) => s?.id === svc.id ? null : svc)} className={`text-xs w-44 text-left truncate hover:text-[#1a56db] transition-colors ${selected?.id === svc.id ? 'text-[#1a56db] font-semibold' : 'text-[#1a2533]'}`}>{svc.name}</button>
                  <div className="flex-1 bg-[#f0f4f8] rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-[#1a3a5c] rounded-full" style={{ width: `${(svc.active / totals.active) * 100}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-[#1a3a5c] w-6 text-right">{svc.active}</span>
                  {svc.slaRisk > 0 && <span className="text-[10px] text-amber-700 w-14">{svc.slaRisk} at risk</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Routing Context — expandable */}
          {showRouting && (
            <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
              <div className="px-4 py-3 border-b border-[#d1d9e0] bg-[#f8f9fb]">
                <h3 className="text-sm font-semibold text-[#1a2533]">Routing Context</h3>
                <p className="text-[11px] text-[#374151] mt-0.5">How applications are routed into the appropriate MIDC service queue</p>
              </div>
              <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chain */}
                <div>
                  <p className="text-xs font-semibold text-[#1a2533] mb-3">Routing Chain</p>
                  <RoutingChain />
                </div>

                {/* Routing Rules */}
                <div>
                  <p className="text-xs font-semibold text-[#1a2533] mb-3">What determines routing?</p>
                  <div className="space-y-2">
                    {[
                      { n: 'Business Location', v: 'District / Taluka' },
                      { n: 'MIDC Estate / Plot', v: 'Estate identifier' },
                      { n: 'Service', v: 'Configured service type' },
                      { n: 'Project Stage', v: 'Business DNA stage' },
                      { n: 'Configured Jurisdiction', v: 'System-configured rule' },
                    ].map(r => (
                      <div key={r.n} className="flex items-center justify-between py-1 border-b border-[#f0f4f8] text-xs">
                        <span className="text-[#1a2533]">{r.n}</span>
                        <span className="text-[#374151]">{r.v}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-[#374151] mt-2">Routing is system-determined. Officers do not manually select routing destinations.</p>
                </div>

                {/* Example routing explanation */}
                <div className="bg-[#f8f9fb] border border-[#e8edf2] rounded p-3">
                  <p className="text-xs font-semibold text-[#1a2533] mb-2">Example: Why was APP-MIDC-2048 routed here?</p>
                  <div className="space-y-1.5 text-xs">
                    {[
                      ['Business Location', 'Thane'],
                      ['MIDC Estate', 'Taloja'],
                      ['Service', 'Building / Planning'],
                      ['Project Stage', 'Construction'],
                      ['Configured Jurisdiction', 'Configured rule'],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-2">
                        <span className="text-[#374151]">{k}</span>
                        <span className="font-medium text-[#1a2533]">{v}</span>
                      </div>
                    ))}
                    <div className="border-t border-[#d1d9e0] pt-2 flex justify-between gap-2">
                      <span className="text-[#1a2533] font-medium">Routing result</span>
                      <span className="font-semibold text-[#1a3a5c]">Planning / Building Scrutiny</span>
                    </div>
                    <p className="text-[10px] text-[#374151]">Source: Configured routing rule · Version: v2.1</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Service detail drawer */}
      {selected && (
        <div className="w-80 shrink-0 bg-white border-l border-[#d1d9e0] overflow-y-auto flex flex-col" role="complementary" aria-label={`${selected.name} service detail`}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#d1d9e0] sticky top-0 bg-white z-10">
            <h3 className="text-sm font-semibold text-[#1a2533]">{selected.name}</h3>
            <button onClick={() => setSelected(null)} className="text-[#1a2533] hover:text-[#1a3a5c] transition-colors" aria-label="Close detail panel"><Icon.X /></button>
          </div>
          <div className="flex-1 p-4 space-y-4 text-xs">

            {/* Counts */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { l: 'Active', v: selected.active, c: 'text-[#1a3a5c] font-bold' },
                { l: 'New', v: selected.new, c: 'text-[#1a56db] font-semibold' },
                { l: 'Under Review', v: selected.review, c: 'text-[#1a2533]' },
                { l: 'Query', v: selected.query, c: 'text-amber-700' },
                { l: 'Resubmission', v: selected.resubmit, c: 'text-purple-700' },
                { l: 'Inspection', v: selected.inspect, c: 'text-orange-700' },
                { l: 'Decision Pending', v: selected.decision, c: 'text-green-700' },
                { l: 'SLA Risk', v: selected.slaRisk, c: 'text-amber-700 font-semibold' },
              ].map(s => (
                <div key={s.l} className="bg-[#f8f9fb] rounded p-2 text-center">
                  <p className={`text-lg font-bold ${s.c}`}>{s.v}</p>
                  <p className="text-[10px] text-[#374151]">{s.l}</p>
                </div>
              ))}
            </div>

            {/* Scrutiny Route distribution */}
            <div>
              <p className="font-semibold text-[#1a2533] mb-2">Scrutiny Route Distribution</p>
              <div className="space-y-1.5">
                {[
                  { label: 'Standard Review', count: selected.routes.standard, color: 'bg-[#f0f4f8] text-[#1a2533]' },
                  { label: 'Enhanced Review', count: selected.routes.enhanced, color: 'bg-purple-100 text-purple-800' },
                  { label: 'Inspection-heavy', count: selected.routes.inspection, color: 'bg-orange-100 text-orange-800' },
                ].map(r => (
                  <div key={r.label} className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${r.color}`}>{r.label}</span>
                    <span className="font-semibold text-[#1a2533]">{r.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Stage distribution */}
            <div>
              <p className="font-semibold text-[#1a2533] mb-2">By Project Stage</p>
              <div className="space-y-1">
                {Object.entries(selected.stages).map(([stage, count]: [string, any]) => (
                  <div key={stage} className="flex items-center gap-2">
                    <span className="text-[#1a2533] w-28 truncate">{stage}</span>
                    <div className="flex-1 bg-[#f0f4f8] rounded-full h-1.5 overflow-hidden">
                      <div className="h-full bg-[#1a3a5c] rounded-full" style={{ width: `${(count / selected.active) * 100}%` }} />
                    </div>
                    <span className="text-[#1a2533] font-medium w-4 text-right">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dependencies */}
            <div>
              <p className="font-semibold text-[#1a2533] mb-2">External Dependencies</p>
              {selected.deps[0] === 'None'
                ? <p className="text-[#374151]">No active external dependencies.</p>
                : selected.deps.map((d: any) => (
                  <div key={d} className="flex items-start gap-2 py-1.5 border-b border-[#f0f4f8]">
                    <span className="text-amber-500 shrink-0"><Icon.Warning /></span>
                    <div>
                      <p className="font-medium text-[#1a2533]">{d}</p>
                      <p className="text-[10px] text-[#374151]">MIDC may view · cannot decide</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          {/* Actions */}
          <div className="px-4 py-3 border-t border-[#d1d9e0] space-y-2">
            <button className="w-full bg-[#1a3a5c] text-white text-xs font-semibold py-2 rounded hover:bg-[#0f2540] transition-colors">
              View Queue — {selected.name} →
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button className="border border-[#d1d9e0] text-[#1a2533] text-[11px] py-1.5 rounded hover:bg-[#f0f4f8] transition-colors">Routing Context</button>
              <button className="border border-[#d1d9e0] text-[#1a2533] text-[11px] py-1.5 rounded hover:bg-[#f0f4f8] transition-colors">Service Analytics</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── M07 — Business DNA / Adaptive Profile Context ───────────────────────────

type VerifyState   = 'SELF_DECLARED'|'USER_CONFIRMED'|'SYSTEM_VERIFIED'|'DEPARTMENT_VERIFIED'|'NEEDS_VERIFICATION'|'INVALID'|'EXPIRED'
type FieldClass    = 'APPLICATION'|'CONTEXT'|'MASTER_DATA'|'OTHER_DEPT'





const DNA_SECTIONS: DnaSection[] = [
  { id:'project', title:'PROJECT', desc:'Project type, classification and stage', fields:[
    { id:'proj-type',  name:'Project Type',     value:'Expansion',      cls:'APPLICATION', source:'Entrepreneur Adaptive Profile', adaptive:'CONFIRMED',     verify:'USER_CONFIRMED',      updated:'12 Aug 2026', usedBy:['MIDC service routing','Regulatory journey'], branchNote:'Determines which expansion-specific workflow is activated.' },
    { id:'proj-class', name:'Classification',   value:'Manufacturing — Pharmaceutical', cls:'CONTEXT', source:'Entrepreneur Adaptive Profile', adaptive:'CONFIRMED', verify:'USER_CONFIRMED', updated:'12 Aug 2026', usedBy:['Regulatory engine','Dependency evaluation'] },
    { id:'proj-stage', name:'Project Stage',    value:'Construction',   cls:'APPLICATION', source:'Entrepreneur Adaptive Profile', adaptive:'CONFIRMED',     verify:'USER_CONFIRMED',      updated:'5 Sep 2026',  usedBy:['MIDC Building / Planning','SLA calculation'], prev:'Pre-establishment', changeReason:'Entrepreneur updated after construction commencement.' },
  ]},
  { id:'identity', title:'IDENTITY', desc:'Entity and industry identity', fields:[
    { id:'entity',    name:'Entity Type',       value:'Private Limited Company',              cls:'CONTEXT',   source:'Entrepreneur Adaptive Profile', adaptive:'CONFIRMED',        verify:'USER_CONFIRMED',    updated:'12 Aug 2026', usedBy:['Regulatory journey'] },
    { id:'business',  name:'Business / Project',value:'Aster BioTech Manufacturing Pvt. Ltd.', cls:'APPLICATION', source:'Entrepreneur Adaptive Profile', adaptive:'CONFIRMED',   verify:'USER_CONFIRMED',    updated:'12 Aug 2026', usedBy:['Application identity'] },
    { id:'industry',  name:'Industry',          value:'Pharmaceutical Manufacturing',         cls:'CONTEXT',   source:'Entrepreneur Adaptive Profile', adaptive:'CONFIRMED',        verify:'USER_CONFIRMED',    updated:'12 Aug 2026', usedBy:['Regulatory routing','Dependency evaluation'] },
    { id:'activity',  name:'Activities',        value:'API synthesis, formulation, packaging',cls:'CONTEXT',   source:'Entrepreneur Adaptive Profile', adaptive:'ANSWERED',         verify:'SELF_DECLARED',     updated:'12 Aug 2026', usedBy:['Environment / Safety context'] },
    { id:'products',  name:'Products / Process',value:'Active Pharmaceutical Ingredients',   cls:'CONTEXT',   source:'Entrepreneur Adaptive Profile', adaptive:'ANSWERED',         verify:'SELF_DECLARED',     updated:'12 Aug 2026', usedBy:['Regulatory journey'] },
  ]},
  { id:'location', title:'LOCATION / MIDC', desc:'District, estate, plot and possession details', fields:[
    { id:'district',  name:'District',          value:'Pune (Prototype)',                     cls:'APPLICATION', source:'Entrepreneur Adaptive Profile', adaptive:'CONFIRMED',   verify:'USER_CONFIRMED',    updated:'12 Aug 2026', usedBy:['MIDC office routing'] },
    { id:'taluka',    name:'Taluka',            value:'Haveli (Prototype)',                   cls:'CONTEXT',   source:'Entrepreneur Adaptive Profile', adaptive:'CONFIRMED',        verify:'USER_CONFIRMED',    updated:'12 Aug 2026', usedBy:['MIDC routing'] },
    { id:'estate',    name:'MIDC Estate',       value:'Example MIDC Estate (Prototype)',      cls:'APPLICATION', source:'Entrepreneur Adaptive Profile', adaptive:'CONFIRMED',   verify:'NEEDS_VERIFICATION',updated:'12 Aug 2026', usedBy:['Land / Plot','Building / Planning'], branchNote:'MIDC = YES branch activated this field.' },
    { id:'plot',      name:'Plot Number',       value:'B-42',                                 cls:'APPLICATION', source:'MIDC allotment record',        adaptive:'CONFIRMED',   verify:'SYSTEM_VERIFIED',   updated:'18 Sep 2026', usedBy:['Land / Plot','Building / Planning'] },
    { id:'plotarea',  name:'Plot Area',         value:'4,800 m²',                             cls:'APPLICATION', source:'MIDC allotment document', sourceType:'verified-gov', adaptive:'CONFIRMED', verify:'SYSTEM_VERIFIED', updated:'18 Sep 2026, 14:32', updatedVia:'Verified MIDC allotment record', usedBy:['MIDC Land / Plot','Building / Planning','MPCB application context (dependency)','Fire application context (dependency)'], prev:'4,500 m²', prevDate:'10 Sep 2026', changeReason:'Updated after revised MIDC allotment record. Entrepreneur submitted revised plot document on resubmission v2.', issueDate:'2 Mar 2024',
      history:[
        { value:'4,800 m²', date:'18 Sep 2026', source:'Verified MIDC allotment record', verify:'SYSTEM_VERIFIED', label:'Current' },
        { value:'4,500 m²', date:'10 Sep 2026', source:'Previous Business DNA version', verify:'USER_CONFIRMED' },
        { value:'4,500 m²', date:'2 Aug 2026',  source:'Initial entrepreneur submission', verify:'SELF_DECLARED', label:'Initial recorded value' },
      ],
      consistency:[
        { source:'Master Profile',         value:'4,800 m²', match:true },
        { source:'MIDC Land / Plot',       value:'4,800 m²', match:true },
        { source:'Building / Planning form',value:'4,200 m²', match:false, dept:'MIDC' },
        { source:'MPCB application',       value:'4,800 m²', match:true,  dept:'MPCB' },
        { source:'Fire context',           value:'4,600 m²', match:false, dept:'Fire Authority' },
      ],
    },
    { id:'allotment', name:'Allotment Status',  value:'Confirmed',                            cls:'APPLICATION', source:'MIDC allotment record',        adaptive:'CONFIRMED',   verify:'SYSTEM_VERIFIED',   updated:'18 Sep 2026', usedBy:['Land / Plot'] },
    { id:'possession',name:'Possession',        value:'Possession Taken',                     cls:'APPLICATION', source:'Entrepreneur Adaptive Profile', adaptive:'CONFIRMED',   verify:'USER_CONFIRMED',    updated:'12 Aug 2026', usedBy:['Land / Plot'], branchNote:'Possession = YES — acquisition route branch not activated.' },
  ]},
  { id:'land', title:'LAND', desc:'Land type, ownership and land-use state', fields:[
    { id:'land-type', name:'Land Type',         value:'MIDC Industrial Plot',                 cls:'APPLICATION', source:'MIDC allotment record',        adaptive:'CONFIRMED',   verify:'SYSTEM_VERIFIED',   updated:'18 Sep 2026', usedBy:['Land / Plot'] },
    { id:'land-own',  name:'Ownership / Lease', value:'Lease from MIDC',                     cls:'APPLICATION', source:'MIDC allotment record',        adaptive:'CONFIRMED',   verify:'SYSTEM_VERIFIED',   updated:'18 Sep 2026', usedBy:['Land / Plot'] },
    { id:'land-use',  name:'Land-use State',    value:'Industrial — Configured',              cls:'CONTEXT',   source:'Entrepreneur Adaptive Profile', adaptive:'CONFIRMED',        verify:'USER_CONFIRMED',    updated:'12 Aug 2026', usedBy:['Regulatory journey'] },
    { id:'acq',       name:'Acquisition Route', value:'Not applicable',                       cls:'CONTEXT',   source:'Adaptive profile branch',      adaptive:'NOT_APPLICABLE',   verify:'USER_CONFIRMED',    updated:'12 Aug 2026', usedBy:[], branchNote:'Possession = YES — acquisition branch not activated. Not treated as missing.' },
  ]},
  { id:'scale', title:'SCALE', desc:'Investment, workforce and production capacity', fields:[
    { id:'invest',    name:'Investment',        value:'₹42 Cr',  unit:'Crore INR',             cls:'CONTEXT',   source:'Entrepreneur Adaptive Profile', adaptive:'ANSWERED',         verify:'SELF_DECLARED',     updated:'12 Aug 2026', usedBy:['Regulatory routing','Incentive context'] },
    { id:'workforce', name:'Workforce',         value:'180',     unit:'persons',               cls:'CONTEXT',   source:'Entrepreneur Adaptive Profile', adaptive:'ANSWERED',         verify:'SELF_DECLARED',     updated:'12 Aug 2026', usedBy:['Incentive attributes'] },
    { id:'capacity',  name:'Production Capacity',value:'12,000 units/month',                  cls:'CONTEXT',   source:'Entrepreneur Adaptive Profile', adaptive:'ANSWERED',         verify:'SELF_DECLARED',     updated:'12 Aug 2026', usedBy:['Regulatory context'] },
  ]},
  { id:'building', title:'BUILDING', desc:'Construction state, area and structural details', fields:[
    { id:'const-state',name:'Construction State',value:'Under Construction',                  cls:'APPLICATION', source:'Entrepreneur Adaptive Profile', adaptive:'CONFIRMED',   verify:'USER_CONFIRMED',    updated:'5 Sep 2026',  usedBy:['Building / Planning'] },
    { id:'built-area', name:'Built-up Area',     value:'2,700 m²',                            cls:'APPLICATION', source:'Entrepreneur Adaptive Profile', adaptive:'ANSWERED',    verify:'SELF_DECLARED',     updated:'5 Sep 2026',  usedBy:['Building / Planning'] },
    { id:'floors',     name:'Floors',            value:'3',                                   cls:'APPLICATION', source:'Entrepreneur Adaptive Profile', adaptive:'ANSWERED',    verify:'SELF_DECLARED',     updated:'5 Sep 2026',  usedBy:['Building / Planning'] },
    { id:'height',     name:'Height',            value:'14 m (approx)',                       cls:'APPLICATION', source:'Entrepreneur Adaptive Profile', adaptive:'ANSWERED',    verify:'NEEDS_VERIFICATION', updated:'5 Sep 2026', usedBy:['Building / Planning'] },
    { id:'occupancy',  name:'Occupancy Type',    value:'Industrial — Manufacturing',          cls:'CONTEXT',   source:'Entrepreneur Adaptive Profile', adaptive:'CONFIRMED',        verify:'USER_CONFIRMED',    updated:'5 Sep 2026',  usedBy:['Building / Planning','Fire context'] },
  ]},
  { id:'utilities', title:'UTILITIES', desc:'Power, water, wastewater and drainage', fields:[
    { id:'power',     name:'Power',             value:'1.2 MW',                               cls:'APPLICATION', source:'Entrepreneur Adaptive Profile', adaptive:'ANSWERED',    verify:'NEEDS_VERIFICATION', updated:'12 Aug 2026', usedBy:['Water / Utility','Drainage / Infrastructure'], branchNote:'Electricity load flagged for verification — see Automated Review.' },
    { id:'water',     name:'Water Requirement', value:'120 KLD',                              cls:'APPLICATION', source:'Entrepreneur Adaptive Profile', adaptive:'ANSWERED',    verify:'SELF_DECLARED',     updated:'12 Aug 2026', usedBy:['Water / Utility'] },
    { id:'water-src', name:'Water Source',      value:'MIDC supply',                          cls:'APPLICATION', source:'Entrepreneur Adaptive Profile', adaptive:'CONFIRMED',   verify:'USER_CONFIRMED',    updated:'12 Aug 2026', usedBy:['Water / Utility'] },
    { id:'waste-w',   name:'Wastewater',        value:'80 KLD — ETP planned',                cls:'APPLICATION', source:'Entrepreneur Adaptive Profile', adaptive:'ANSWERED',    verify:'SELF_DECLARED',     updated:'12 Aug 2026', usedBy:['Drainage / Infrastructure'] },
    { id:'drainage',  name:'Drainage',          value:'Connected to MIDC drainage',           cls:'CONTEXT',   source:'Entrepreneur Adaptive Profile', adaptive:'ANSWERED',         verify:'SELF_DECLARED',     updated:'12 Aug 2026', usedBy:['Drainage / Infrastructure'] },
  ]},
  { id:'env', title:'ENVIRONMENT / SAFETY CONTEXT', desc:'Environmental context, hazardous materials and safety flags', fields:[
    { id:'air-emit',  name:'Air Emissions',     value:'Yes — scrubbing system planned',       cls:'CONTEXT',   source:'Entrepreneur Adaptive Profile', adaptive:'ANSWERED',         verify:'SELF_DECLARED',     updated:'12 Aug 2026', usedBy:['MPCB dependency context'] },
    { id:'haz-mat',   name:'Hazardous Material',value:'Yes',                                  cls:'CONTEXT',   source:'Entrepreneur Adaptive Profile', adaptive:'ANSWERED',         verify:'USER_CONFIRMED',    updated:'12 Aug 2026', usedBy:['MPCB dependency','Safety context'] },
    { id:'haz-waste', name:'Hazardous Waste',   value:'Under characterisation',               cls:'CONTEXT',   source:'Entrepreneur Adaptive Profile', adaptive:'NEEDS_REVIEW',     verify:'NEEDS_VERIFICATION', updated:'12 Aug 2026', usedBy:['MPCB dependency'] },
    { id:'boiler',    name:'Boiler',            value:'Yes',                                  cls:'CONTEXT',   source:'Entrepreneur Adaptive Profile', adaptive:'ANSWERED',         verify:'SELF_DECLARED',     updated:'12 Aug 2026', usedBy:['DISH context'], branchNote:'Boiler = Yes — DISH dependency branch activated.' },
    { id:'pressure',  name:'Pressure Vessel',   value:'Not applicable',                       cls:'CONTEXT',   source:'Adaptive profile branch',      adaptive:'NOT_APPLICABLE',   verify:'USER_CONFIRMED',    updated:'12 Aug 2026', usedBy:[], branchNote:'Pressure vessel = No. Not treated as missing.' },
    { id:'fire',      name:'Fire-related Flags', value:'Fire NOC required',                   cls:'OTHER_DEPT',source:'Regulatory engine — Fire context', adaptive:'CONFIRMED',   verify:'DEPARTMENT_VERIFIED',updated:'12 Aug 2026', usedBy:['Fire NOC dependency'], branchNote:'Building > 500 m² — fire context branch activated.' },
    { id:'poll-cls',  name:'Pollution Classification', value:'To be determined by MPCB',     cls:'OTHER_DEPT',source:'Competent external department (MPCB)', adaptive:'VISIBLE', verify:'DEPARTMENT_VERIFIED',updated:'Not available', usedBy:['MPCB dependency'] },
  ]},
  { id:'storage', title:'STORAGE / LOGISTICS / TRADE', desc:'Warehouse, import/export and logistics context', fields:[
    { id:'warehouse', name:'Warehouse / Storage',value:'On-site cold storage planned',        cls:'CONTEXT',   source:'Entrepreneur Adaptive Profile', adaptive:'ANSWERED',         verify:'SELF_DECLARED',     updated:'12 Aug 2026', usedBy:['Regulatory context'] },
    { id:'import',    name:'Import / Export',   value:'Export-oriented',                      cls:'CONTEXT',   source:'Entrepreneur Adaptive Profile', adaptive:'ANSWERED',         verify:'USER_CONFIRMED',    updated:'12 Aug 2026', usedBy:['Incentive attributes','Regulatory routing'] },
    { id:'logistics', name:'Logistics',         value:'Third-party logistics — configured',   cls:'CONTEXT',   source:'Entrepreneur Adaptive Profile', adaptive:'ANSWERED',         verify:'SELF_DECLARED',     updated:'12 Aug 2026', usedBy:[] },
  ]},
  { id:'incentive', title:'INCENTIVE ATTRIBUTES', desc:'Scheme-defined attributes — context only unless MIDC is the administering authority', fields:[
    { id:'startup',   name:'Startup / MSME',    value:'Not applicable',                       cls:'CONTEXT',   source:'Adaptive profile branch',      adaptive:'NOT_APPLICABLE',   verify:'USER_CONFIRMED',    updated:'12 Aug 2026', usedBy:[] },
    { id:'export-or', name:'Export Orientation', value:'Yes',                                 cls:'CONTEXT',   source:'Entrepreneur Adaptive Profile', adaptive:'ANSWERED',         verify:'SELF_DECLARED',     updated:'12 Aug 2026', usedBy:['Incentive routing — context'] },
    { id:'employ',    name:'Employment Intensity',value:'Medium',                             cls:'CONTEXT',   source:'Entrepreneur Adaptive Profile', adaptive:'ANSWERED',         verify:'SELF_DECLARED',     updated:'12 Aug 2026', usedBy:['Incentive context'] },
  ]},
  { id:'regulatory', title:'EXISTING REGULATORY CONTEXT', desc:'Existing approvals, applications and verified documents', fields:[
    { id:'mpcb-cte',  name:'MPCB CTE',          value:'Applied — Pending decision',           cls:'OTHER_DEPT',source:'External department (MPCB)',    adaptive:'VISIBLE',          verify:'DEPARTMENT_VERIFIED',updated:'10 Sep 2026', usedBy:['MPCB prerequisite dependency'], issueDate:'10 Sep 2026' },
    { id:'fire-noc',  name:'Fire NOC',           value:'Expired — 31 Aug 2026',               cls:'OTHER_DEPT',source:'External department (Fire Authority)', adaptive:'VISIBLE',  verify:'EXPIRED',            updated:'31 Aug 2026', usedBy:['Fire NOC dependency'], expiryDate:'31 Aug 2026' },
    { id:'dish-reg',  name:'DISH Registration',  value:'Pending',                             cls:'OTHER_DEPT',source:'External department (DISH)',     adaptive:'VISIBLE',          verify:'SELF_DECLARED',     updated:'12 Aug 2026', usedBy:['DISH dependency context'] },
  ]},
]

const FILTER_LABELS: Record<string, string> = {
  midc:    'MIDC Review Fields',
  context: 'Context Only',
  other:   'Other Department',
  needs_v: 'Needs Verification',
  changed: 'Changed Since Submission',
}

function adaptiveBadge(s: AdaptiveState) {
  const map: Record<AdaptiveState, string> = {
    CONFIRMED:      'bg-green-100 text-green-800',
    ANSWERED:       'bg-blue-100 text-blue-800',
    VALIDATED:      'bg-teal-100 text-teal-800',
    NEEDS_REVIEW:   'bg-amber-100 text-amber-800',
    NOT_APPLICABLE: 'bg-[#f0f4f8] text-[#1a2533]',
    SKIPPED:        'bg-[#f0f4f8] text-[#1a2533]',
    REQUIRED:       'bg-orange-100 text-orange-800',
    VISIBLE:        'bg-[#ebf3ff] text-[#1a3a5c]',
    NOT_VISIBLE:    'bg-[#f0f4f8] text-[#374151]',
  }
  return map[s]
}

function verifyBadge(s: VerifyState) {
  const map: Record<VerifyState, string> = {
    SELF_DECLARED:      'bg-[#f0f4f8] text-[#1a2533]',
    USER_CONFIRMED:     'bg-blue-100 text-blue-800',
    SYSTEM_VERIFIED:    'bg-green-100 text-green-800',
    DEPARTMENT_VERIFIED:'bg-teal-100 text-teal-800',
    NEEDS_VERIFICATION: 'bg-amber-100 text-amber-800',
    INVALID:            'bg-red-100 text-red-800',
    EXPIRED:            'bg-red-100 text-red-800',
  }
  return map[s]
}

function clsBadge(c: FieldClass) {
  const map: Record<FieldClass, [string, string]> = {
    APPLICATION: ['bg-[#ebf3ff] text-[#1a3a5c] border border-[#bdd4f5]', 'APPLICATION FIELD'],
    CONTEXT:     ['bg-[#f0f4f8] text-[#1a2533] border border-[#d1d9e0]', 'CONTEXT FIELD'],
    MASTER_DATA: ['bg-teal-50 text-teal-800 border border-teal-200', 'MASTER DATA'],
    OTHER_DEPT:  ['bg-purple-50 text-purple-800 border border-purple-200', 'OTHER-DEPT FIELD'],
  }
  return map[c]
}

function fieldPassesFilter(f: DnaField, filters: Set<string>): boolean {
  if (filters.size === 0) return true
  let pass = false
  if (filters.has('midc') && f.cls === 'APPLICATION') pass = true
  if (filters.has('context') && f.cls === 'CONTEXT') pass = true
  if (filters.has('other') && f.cls === 'OTHER_DEPT') pass = true
  if (filters.has('needs_v') && f.verify === 'NEEDS_VERIFICATION') pass = true
  if (filters.has('changed') && f.prev !== undefined) pass = true
  return pass
}

function DnaFieldRow({ f, onSelect }: { f: DnaField; onSelect: (f: DnaField) => void }) {
  const [cls, clsLabel] = clsBadge(f.cls)
  return (
    <div className="flex flex-wrap items-start gap-x-4 gap-y-1 py-2.5 px-4 border-b border-[#f0f4f8] hover:bg-[#f8f9fb] transition-colors group">
      {/* Field name + value */}
      <div className="min-w-[160px] shrink-0">
        <p className="text-xs font-semibold text-[#1a2533]">{f.name}</p>
        <p className={`text-[11px] mt-0.5 font-medium ${f.adaptive === 'NOT_APPLICABLE' ? 'text-[#374151] italic' : f.verify === 'NEEDS_VERIFICATION' || f.verify === 'EXPIRED' ? 'text-amber-700' : 'text-[#1a2533]'}`}>
          {f.value}{f.unit ? ` ${f.unit}` : ''}
        </p>
        {f.prev && <p className="text-[10px] text-[#6b7280] line-through">{f.prev}</p>}
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-1.5 shrink-0">
        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${cls}`}>{clsLabel}</span>
        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${adaptiveBadge(f.adaptive)}`}>{f.adaptive}</span>
        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${verifyBadge(f.verify)}`}>{f.verify}</span>
      </div>

      {/* Provenance metadata */}
      <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[10px] text-[#374151] flex-1 min-w-[180px]">
        <span><span className="text-[#1a2533]">Source:</span> {f.source}</span>
        <span><span className="text-[#1a2533]">Updated:</span> {f.updated}</span>
        {f.usedBy.length > 0 && <span><span className="text-[#1a2533]">Used by:</span> {f.usedBy.join(', ')}</span>}
        {f.expiryDate && <span className="text-red-600 font-medium">Expires: {f.expiryDate}</span>}
      </div>

      <button
        onClick={() => onSelect(f)}
        className="ml-auto shrink-0 text-[10px] text-[#1a56db] opacity-0 group-hover:opacity-100 focus:opacity-100 hover:underline transition-opacity whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#1a56db] rounded"
        aria-label={`View provenance for ${f.name}`}
      >
        Provenance ↗
      </button>
    </div>
  )
}

const SOURCE_TYPE_LABELS: Record<string, string> = {
  'self-declared':   'ENTREPRENEUR SELF-DECLARATION',
  'verified-gov':    'VERIFIED GOVERNMENT DATA',
  'system-verified': 'SYSTEM-VERIFIED FACT',
  'dept-record':     'DEPARTMENT RECORD',
  'other-dept':      'OTHER-DEPARTMENT CONTEXT',
}
const SOURCE_TYPE_COLORS: Record<string, string> = {
  'self-declared':   'bg-[#f0f4f8] text-[#1a2533] border border-[#d1d9e0]',
  'verified-gov':    'bg-teal-50 text-teal-800 border border-teal-300',
  'system-verified': 'bg-green-50 text-green-800 border border-green-300',
  'dept-record':     'bg-blue-50 text-blue-800 border border-blue-300',
  'other-dept':      'bg-purple-50 text-purple-800 border border-purple-300',
}

function Divider() {
  return <div className="border-t border-[#f0f4f8]" />
}

function ProvenanceSectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[9px] font-bold text-[#374151] uppercase tracking-widest mb-2">{children}</p>
}

function ProvenanceDrawer({ field, onClose }: { field: DnaField; onClose: () => void }) {
  const [showCorrectionForm, setShowCorrectionForm] = useState(false)
  const [correctionValue, setCorrectionValue] = useState('')
  const [clsCss, clsLabel] = clsBadge(field.cls)

  const hasChange   = field.prev !== undefined
  const hasMismatch = field.consistency?.some(c => !c.match)

  return (
    <div
      className="w-96 shrink-0 bg-white border-l border-[#d1d9e0] overflow-y-auto flex flex-col"
      role="complementary"
      aria-label={`Field provenance: ${field.name}`}
    >
      {/* ── Header ── */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#d1d9e0]">
        <div className="flex items-start justify-between px-4 pt-3 pb-2">
          <div>
            <p className="text-[10px] font-bold text-[#374151] uppercase tracking-widest">Field Provenance</p>
            <p className="text-sm font-bold text-[#1a2533] mt-0.5">{field.name}</p>
            <p className="text-base font-bold text-[#1a56db]">{field.value}{field.unit ? ` ${field.unit}` : ''}</p>
          </div>
          <button onClick={onClose} className="mt-0.5 text-[#1a2533] hover:text-[#1a3a5c] transition-colors p-1 rounded focus-visible:ring-2 focus-visible:ring-[#1a56db]" aria-label="Close provenance drawer">
            <Icon.X />
          </button>
        </div>
        {/* App context micro-strip */}
        <div className="px-4 pb-2.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-[#374151]">
          <span className="font-mono text-[#1a2533]">{APP_SAMPLE.id}</span>
          <span className="truncate max-w-[120px]" title={APP_SAMPLE.business}>{APP_SAMPLE.business}</span>
          <span className="text-[#1a3a5c] font-medium">{APP_SAMPLE.service}</span>
        </div>
      </div>

      <div className="flex-1 divide-y divide-[#94a3b8] text-xs">

        {/* ── Field Classification ── */}
        <div className="px-4 py-3 space-y-1.5">
          <ProvenanceSectionLabel>Field Classification</ProvenanceSectionLabel>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[9px] font-bold px-2 py-1 rounded ${clsCss}`}>{clsLabel}</span>
            {field.sourceType && (
              <span className={`text-[9px] font-bold px-2 py-1 rounded ${SOURCE_TYPE_COLORS[field.sourceType]}`}>
                {SOURCE_TYPE_LABELS[field.sourceType]}
              </span>
            )}
          </div>
          <p className="text-[10px] text-[#374151]">Classification and source type are separate from verification state.</p>
        </div>

        {/* ── Source ── */}
        <div className="px-4 py-3 space-y-1.5">
          <ProvenanceSectionLabel>Source</ProvenanceSectionLabel>
          <p className="font-medium text-[#1a2533]">{field.source}</p>
          {field.updatedVia && <p className="text-[10px] text-[#374151]">Updated through: {field.updatedVia}</p>}
        </div>

        {/* ── Two State Systems ── */}
        <div className="px-4 py-3 space-y-2.5">
          <ProvenanceSectionLabel>Adaptive State · Verification State</ProvenanceSectionLabel>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#f8f9fb] border border-[#d1d9e0] rounded p-2">
              <p className="text-[9px] text-[#374151] mb-1.5">Adaptive Question / Branch State</p>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${adaptiveBadge(field.adaptive)}`}>{field.adaptive}</span>
            </div>
            <div className="bg-[#f8f9fb] border border-[#d1d9e0] rounded p-2">
              <p className="text-[9px] text-[#374151] mb-1.5">Data Verification State</p>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${verifyBadge(field.verify)}`}>{field.verify}</span>
            </div>
          </div>
          {field.verify === 'NEEDS_VERIFICATION' && (
            <div className="bg-amber-50 border border-amber-200 rounded p-2 text-[10px] text-amber-800">
              <span className="font-semibold">Needs officer verification.</span> This value is the entrepreneur's self-declared data. Not treated as invalid — verification required.
            </div>
          )}
          {field.adaptive === 'NOT_APPLICABLE' && (
            <p className="text-[10px] text-[#374151]">NOT_APPLICABLE means this branch was not activated — not that information is missing.</p>
          )}
        </div>

        {/* ── Validity ── */}
        <div className="px-4 py-3 space-y-1">
          <ProvenanceSectionLabel>Validity</ProvenanceSectionLabel>
          {[
            ['Last Updated', field.updated, field.verify === 'EXPIRED' ? 'text-red-700' : 'text-[#1a2533]'],
            ['Issue Date', field.issueDate ?? 'Not applicable', 'text-[#1a2533]'],
            ['Expiry Date', field.expiryDate ?? 'Not applicable', field.expiryDate ? 'text-red-700 font-semibold' : 'text-[#374151]'],
          ].map(([k, v, c]) => (
            <div key={k} className="flex justify-between py-1 border-b border-[#f8f9fb]">
              <span className="text-[#374151]">{k}</span>
              <span className={c as string}>{v as string}</span>
            </div>
          ))}
        </div>

        {/* ── Used By ── */}
        {field.usedBy.length > 0 && (
          <div className="px-4 py-3 space-y-1.5">
            <ProvenanceSectionLabel>Used By</ProvenanceSectionLabel>
            <ul className="space-y-1">
              {field.usedBy.map(u => (
                <li key={u} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1a3a5c] mt-1.5 shrink-0" />
                  <span className="text-[#1a2533]">{u}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Branch / Question Context ── */}
        {field.branchNote && (
          <div className="px-4 py-3 space-y-1.5">
            <ProvenanceSectionLabel>Why This Field Exists</ProvenanceSectionLabel>
            <p className="text-[#1a2533] leading-relaxed">{field.branchNote}</p>
            <p className="text-[10px] text-[#6b7280]">Source: Configured adaptive rule</p>
          </div>
        )}

        {/* ── Value History ── */}
        <div className="px-4 py-3 space-y-2">
          <ProvenanceSectionLabel>Value History</ProvenanceSectionLabel>
          {field.history && field.history.length > 0 ? (
            <div className="space-y-0">
              {field.history.map((h, i) => (
                <div key={i} className="flex gap-3 pb-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${i === 0 ? 'bg-[#1a3a5c]' : 'bg-[#d1d9e0]'}`} />
                    {i < field.history!.length - 1 && <div className="w-0.5 flex-1 bg-[#f0f4f8] mt-0.5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`font-semibold ${i === 0 ? 'text-[#1a2533]' : 'text-[#1a2533]'}`}>{h.value}</p>
                      {h.label && <span className="text-[9px] font-bold text-[#374151] uppercase">{h.label}</span>}
                    </div>
                    <p className="text-[10px] text-[#374151]">{h.date} · {h.source}</p>
                    <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${verifyBadge(h.verify)}`}>{h.verify}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : hasChange ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="text-center">
                  <p className="text-[10px] text-[#374151]">Previous · {field.prevDate ?? 'date not recorded'}</p>
                  <p className="text-[#1a2533] line-through">{field.prev}</p>
                </div>
                <span className="text-[#d1d9e0]">→</span>
                <div className="text-center">
                  <p className="text-[10px] text-[#374151]">Current · {field.updated}</p>
                  <p className="font-semibold text-[#1a2533]">{field.value}</p>
                </div>
              </div>
              {field.changeReason && <p className="text-[#1a2533] italic">{field.changeReason}</p>}
            </div>
          ) : (
            <p className="text-[10px] text-[#6b7280]">First recorded value — no previous version available.</p>
          )}
          {hasChange && <p className="text-[10px] text-[#374151]">Change reason: {field.changeReason ?? 'Not provided'}</p>}
        </div>

        {/* ── Cross-form Consistency ── */}
        {field.consistency && (
          <div className="px-4 py-3 space-y-2">
            <div className="flex items-center justify-between">
              <ProvenanceSectionLabel>Cross-form Consistency</ProvenanceSectionLabel>
              {hasMismatch && <span className="text-[9px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">Mismatch detected</span>}
            </div>
            <div className="space-y-1">
              {field.consistency.map((c, i) => (
                <div key={i} className={`flex items-center justify-between py-1 px-2 rounded ${!c.match ? 'bg-amber-50 border border-amber-200' : 'bg-[#f8f9fb]'}`}>
                  <div>
                    <p className="text-[11px] text-[#1a2533]">{c.source}</p>
                    {c.dept && c.dept !== 'MIDC' && <p className="text-[9px] text-[#374151]">Auth: {c.dept} — view only</p>}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`font-semibold ${!c.match ? 'text-amber-700' : 'text-[#1a2533]'}`}>{c.value}</span>
                    {!c.match ? <span className="text-[9px] text-amber-700">≠</span> : <span className="text-[9px] text-green-600">✓</span>}
                  </div>
                </div>
              ))}
            </div>
            {hasMismatch && (
              <div className="text-[10px] text-[#1a2533] bg-[#f8f9fb] border border-[#d1d9e0] rounded p-2">
                <p className="font-semibold text-[#1a2533] mb-0.5">System fact: Value differs across records.</p>
                <p>MIDC can identify this inconsistency. MIDC cannot modify another authority's record. Officer review required.</p>
              </div>
            )}
            <button className="text-[10px] text-[#1a56db] hover:underline">View consistency details → M16</button>
          </div>
        )}

        {/* ── Delta Impact ── */}
        {hasChange && (
          <div className="px-4 py-3 space-y-1.5">
            <ProvenanceSectionLabel>Delta / Re-scrutiny Impact</ProvenanceSectionLabel>
            <div className="bg-amber-50 border border-amber-200 rounded p-2 text-[10px]">
              <p className="font-semibold text-amber-800 mb-1">Potential application impact detected.</p>
              <p className="text-amber-700">Previous: <span className="line-through">{field.prev}</span> → Current: <span className="font-semibold">{field.value}</span></p>
              <p className="text-[#374151] mt-1">Affected: {field.usedBy.slice(0, 2).join(', ')}</p>
            </div>
            <p className="text-[9px] text-[#374151]">System fact only. The officer determines the statutory consequence.</p>
            <button className="text-[10px] text-[#1a56db] hover:underline">View delta impact → M20</button>
          </div>
        )}

        {/* ── Actions ── */}
        <div className="px-4 py-3 space-y-2">
          <ProvenanceSectionLabel>Actions</ProvenanceSectionLabel>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              ['View source',       '#'],
              ['View consistency → M16', '#'],
              ['View delta → M20',  '#'],
              ['View audit → M38',  '#'],
            ].map(([label]) => (
              <button key={label} className="text-[10px] text-[#1a2533] border border-[#d1d9e0] rounded px-2 py-1.5 hover:bg-[#f8f9fb] transition-colors text-left focus-visible:ring-2 focus-visible:ring-[#1a56db]">
                {label}
              </button>
            ))}
          </div>

          {/* Propose correction — controlled */}
          {!showCorrectionForm ? (
            <button
              onClick={() => setShowCorrectionForm(true)}
              className="w-full text-[10px] font-semibold text-[#1a3a5c] border border-[#1a3a5c] rounded px-2 py-2 hover:bg-[#f0f4f8] transition-colors focus-visible:ring-2 focus-visible:ring-[#1a56db]"
            >
              Propose correction
            </button>
          ) : (
            <div className="border border-amber-300 bg-amber-50 rounded p-3 space-y-2.5">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-amber-800">Propose Correction</p>
                <button onClick={() => setShowCorrectionForm(false)} className="text-[#374151] hover:text-[#1a2533]"><Icon.X /></button>
              </div>
              <p className="text-[10px] text-[#1a2533]">Master data is not directly modified. A correction record is created for review.</p>
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] text-[#374151] block mb-0.5">Current Value (read-only)</label>
                  <p className="font-semibold text-[#1a2533] text-[11px] bg-white border border-[#d1d9e0] rounded px-2 py-1">{field.value}</p>
                </div>
                <div>
                  <label className="text-[10px] text-[#374151] block mb-0.5">Proposed New Value</label>
                  <input
                    type="text"
                    value={correctionValue}
                    onChange={e => setCorrectionValue(e.target.value)}
                    placeholder="Enter proposed value"
                    className="w-full text-xs border border-[#d1d9e0] rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#374151] block mb-0.5">Verification Basis / Source</label>
                  <input type="text" placeholder="e.g. MIDC allotment document ref" className="w-full text-xs border border-[#d1d9e0] rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#1a56db]" />
                </div>
                <div>
                  <label className="text-[10px] text-[#374151] block mb-0.5">Correction Reason</label>
                  <textarea rows={2} placeholder="Reason for proposed correction" className="w-full text-xs border border-[#d1d9e0] rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#1a56db] resize-none" />
                </div>
              </div>
              <p className="text-[9px] text-amber-700 font-medium">Old value and new value remain traceable. Affected consumers identified. Confirmation workflow required.</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-[#1a3a5c] text-white text-[10px] font-semibold py-1.5 rounded hover:bg-[#0f2540] transition-colors">Submit for review</button>
                <button onClick={() => setShowCorrectionForm(false)} className="flex-1 border border-[#d1d9e0] text-[#1a2533] text-[10px] py-1.5 rounded hover:bg-white transition-colors">Cancel</button>
              </div>
            </div>
          )}

          <p className="text-[9px] text-[#6b7280] leading-relaxed">Correction authority subject to configured officer permissions. All changes traceable with timestamp, actor, and reason. Historical values preserved.</p>
        </div>

      </div>
    </div>
  )
}

export function M07DnaPage({ onBackToOverview }: { onBackToOverview: () => void }) {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set())
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['project','identity','location']))
  const [selectedField, setSelectedField] = useState<DnaField | null>(null)

  const toggleFilter = (k: string) => setActiveFilters(prev => {
    const n = new Set(prev); n.has(k) ? n.delete(k) : n.add(k); return n
  })
  const toggleSection = (id: string) => setExpanded(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n
  })

  const needsVerifyCount = DNA_SECTIONS.flatMap(s => s.fields).filter(f => f.verify === 'NEEDS_VERIFICATION').length
  const changedCount     = DNA_SECTIONS.flatMap(s => s.fields).filter(f => f.prev !== undefined).length
  const confirmedCount   = DNA_SECTIONS.flatMap(s => s.fields).filter(f => f.adaptive === 'CONFIRMED').length
  const needsReviewCount = DNA_SECTIONS.flatMap(s => s.fields).filter(f => f.adaptive === 'NEEDS_REVIEW').length

  return (
    <div className="bg-[#f8f9fb] flex-1 flex">
      <div className="flex-1 min-w-0 overflow-y-auto">
        <div className="px-6 py-5 space-y-4">

          {/* Breadcrumb */}
          <Breadcrumb items={[
            { label: 'Department Home', href: '/department' },
            { label: 'Applications', href: '#', onClick: onBackToOverview },
            { label: 'Application Overview', href: '#', onClick: onBackToOverview },
            { label: 'Business DNA' },
          ]} />

          {/* Header */}
          <div className="flex items-start justify-between gap-4 flex-wrap pb-4 border-b border-[#d1d9e0]">
            <div>
              <h1 className="text-xl font-bold text-[#1a3a5c]">Business DNA / Adaptive Profile Context</h1>
              <p className="text-sm text-[#1a2533] mt-0.5">Business context received from the entrepreneur's Adaptive Business Profile.</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={onBackToOverview} className="text-xs border border-[#d1d9e0] bg-white text-[#1a2533] px-3 py-1.5 rounded hover:bg-[#f0f4f8] transition-colors">← Application Overview</button>
              <span className="text-[10px] bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded">Prototype data</span>
            </div>
          </div>

          {/* App context strip */}
          <div className="bg-white border border-[#d1d9e0] rounded px-4 py-2.5 flex flex-wrap gap-x-6 gap-y-1 text-[11px]">
            {[
              ['Application', APP_SAMPLE.id],
              ['Business', APP_SAMPLE.business],
              ['Service', APP_SAMPLE.service],
              ['State', APP_SAMPLE.state],
              ['Project Stage', APP_SAMPLE.stage],
            ].map(([k, v]) => (
              <span key={k}><span className="text-[#374151]">{k}:</span> <span className="font-semibold text-[#1a2533]">{v}</span></span>
            ))}
          </div>

          {/* Architecture notice */}
          <div className="bg-[#ebf3ff] border border-[#bdd4f5] rounded px-4 py-2.5 text-[11px] text-[#1a3a5c]">
            <span className="font-semibold">Business DNA</span> is sourced from the entrepreneur's Adaptive Business Profile. MIDC receives relevant fields as application and regulatory context. Field-level verification status and source are shown separately.
            <span className="ml-2 text-[#1a2533]">Flow: Entrepreneur Adaptive Profile → Business DNA → Regulatory Engine → MIDC Service / Application</span>
          </div>

          {/* Profile summary strip */}
          <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
            {[
              { l: 'Business DNA',           v: 'Active',              c: 'text-green-700 font-bold' },
              { l: 'Profile Version',        v: 'v3',                  c: 'text-[#1a3a5c] font-bold' },
              { l: 'Last Updated',           v: '18 Sep 2026',         c: 'text-[#1a2533]' },
              { l: 'Confirmed',              v: String(confirmedCount), c: 'text-green-700 font-semibold' },
              { l: 'Needs Review',           v: String(needsReviewCount), c: 'text-amber-700 font-semibold' },
              { l: 'Needs Verification',     v: String(needsVerifyCount), c: 'text-amber-700 font-bold' },
              { l: 'Changed Since Submission', v: String(changedCount), c: 'text-[#1a56db] font-semibold' },
            ].map(s => (
              <div key={s.l} className="bg-white border border-[#d1d9e0] rounded p-2.5 text-center">
                <p className={`text-lg font-bold ${s.c}`}>{s.v}</p>
                <p className="text-[10px] text-[#374151] mt-0.5 leading-tight">{s.l}</p>
              </div>
            ))}
          </div>

          {/* Filter bar */}
          <div className="bg-white border border-[#d1d9e0] rounded px-4 py-2.5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#1a2533] shrink-0">Filter:</span>
            {Object.entries(FILTER_LABELS).map(([k, label]) => (
              <button
                key={k}
                onClick={() => toggleFilter(k)}
                className={`text-[11px] px-2.5 py-1 border rounded transition-colors focus-visible:ring-2 focus-visible:ring-[#1a56db] ${
                  activeFilters.has(k)
                    ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]'
                    : 'border-[#d1d9e0] text-[#1a2533] hover:border-[#1a3a5c] hover:text-[#1a3a5c]'
                }`}
              >
                {label}
                {k === 'needs_v' && needsVerifyCount > 0 && <span className="ml-1 text-[9px]">({needsVerifyCount})</span>}
                {k === 'changed' && changedCount > 0 && <span className="ml-1 text-[9px]">({changedCount})</span>}
              </button>
            ))}
            {activeFilters.size > 0 && (
              <button onClick={() => setActiveFilters(new Set())} className="text-[11px] text-red-600 hover:underline ml-1">Clear</button>
            )}
            <div className="ml-auto flex items-center gap-2">
              <button onClick={() => setExpanded(new Set(DNA_SECTIONS.map(s => s.id)))} className="text-[11px] text-[#1a2533] hover:text-[#1a3a5c]">Expand all</button>
              <span className="text-[#d1d9e0]">|</span>
              <button onClick={() => setExpanded(new Set())} className="text-[11px] text-[#1a2533] hover:text-[#1a3a5c]">Collapse all</button>
            </div>
          </div>

          {/* DNA Sections */}
          <div className="space-y-2">
            {DNA_SECTIONS.map(section => {
              const visibleFields = section.fields.filter(f => fieldPassesFilter(f, activeFilters))
              if (activeFilters.size > 0 && visibleFields.length === 0) return null
              const attnFields = visibleFields.filter(f => f.verify === 'NEEDS_VERIFICATION' || f.verify === 'EXPIRED' || f.adaptive === 'NEEDS_REVIEW' || f.prev !== undefined)
              const isOpen = expanded.has(section.id)

              return (
                <div key={section.id} className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between px-4 py-2.5 bg-[#f8f9fb] hover:bg-[#f0f4f8] transition-colors focus-visible:ring-2 focus-visible:ring-[#1a56db]"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3 text-left">
                      <span className="text-xs font-bold text-[#1a2533] tracking-wide">{section.title}</span>
                      <span className="text-[10px] text-[#374151]">{section.desc}</span>
                      <span className="text-[10px] text-[#1a2533]">{visibleFields.length} field{visibleFields.length !== 1 ? 's' : ''}</span>
                      {attnFields.length > 0 && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">{attnFields.length} need attention</span>
                      )}
                    </div>
                    <span className={`text-[#1a2533] transition-transform ${isOpen ? 'rotate-180' : ''}`}><Icon.ChevronDown /></span>
                  </button>

                  {isOpen && (
                    <div>
                      {/* Column headers */}
                      <div className="flex items-center gap-4 px-4 py-1.5 bg-white border-b border-[#f0f4f8] text-[10px] text-[#374151] font-semibold uppercase tracking-wide">
                        <span className="w-40 shrink-0">Field / Value</span>
                        <span>Classification · Adaptive State · Verification State</span>
                        <span className="ml-auto">Provenance</span>
                      </div>
                      {visibleFields.map(f => (
                        <DnaFieldRow key={f.id} f={f} onSelect={setSelectedField} />
                      ))}
                      {visibleFields.length === 0 && (
                        <p className="text-xs text-[#374151] px-4 py-3">No fields match the active filter.</p>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

        </div>
      </div>

      {/* Provenance drawer */}
      {selectedField && (
        <ProvenanceDrawer field={selectedField} onClose={() => setSelectedField(null)} />
      )}
    </div>
  )
}

// ─── M08 — Application Timeline ──────────────────────────────────────────────


const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id:'e1', date:'12 Aug 2026', time:'09:15', title:'Application Submitted', category:'application', source:'entrepreneur',
    state:'SUBMITTED', desk:'Application Intake', role:'System / Intake',
    action:'Application submitted by entrepreneur', comment:'Version v1 submitted. Fee challan generated automatically.',
    timeSpent:'0h', slaEffect:'MIDC processing',
  },
  {
    id:'e2', date:'12 Aug 2026', time:'09:17', title:'Fee Challan Generated', category:'fee', source:'system',
    state:'SUBMITTED', desk:'Application Intake', role:'System',
    action:'Fee challan generated', comment:'CHN-2026-00482 generated by system.',
    timeSpent:'<1h', slaEffect:'System',
  },
  {
    id:'e3', date:'14 Aug 2026', time:'11:42', title:'Fee Confirmed', category:'fee', source:'officer',
    state:'FEE_CONFIRMED', desk:'Fee Verification', role:'Fee Verification Officer',
    action:'Fee payment verified and confirmed', comment:'CHN-2026-00482 — payment confirmed.',
    timeSpent:'2d 2h', slaEffect:'MIDC processing',
  },
  {
    id:'e4', date:'14 Aug 2026', time:'14:10', title:'Application Routed to Document Scrutiny', category:'routing', source:'system',
    state:'FEE_CONFIRMED', desk:'Fee Verification',
    action:'Application routed using configured workflow rule',
    routing:{ from:'Fee Verification', to:'Document Scrutiny', reason:'Fee confirmed — configured routing rule applied.' },
    timeSpent:'<1h', slaEffect:'System',
  },
  {
    id:'e5', date:'15 Aug 2026', time:'09:30', title:'Document Scrutiny Started', category:'documents', source:'officer',
    state:'DOCUMENT_SCRUTINY', desk:'Document Scrutiny', role:'Document Scrutiny Officer',
    action:'Document review commenced',
    timeSpent:'<1h', slaEffect:'MIDC processing',
  },
  {
    id:'e6', date:'16 Aug 2026', time:'15:00', title:'Document Scrutiny Completed', category:'documents', source:'officer',
    state:'DOCUMENT_SCRUTINY', desk:'Document Scrutiny', role:'Document Scrutiny Officer',
    action:'Document review completed — routed to initial scrutiny',
    comment:'12 documents reviewed. 1 document flagged for validity check.',
    timeSpent:'1d 6h', slaEffect:'MIDC processing',
  },
  {
    id:'e7', date:'16 Aug 2026', time:'15:05', title:'Application Routed to Initial Scrutiny', category:'routing', source:'system',
    state:'INITIAL_SCRUTINY', desk:'Document Scrutiny',
    action:'Routing rule applied',
    routing:{ from:'Document Scrutiny', to:'Initial Scrutiny Desk', reason:'Documents complete — configured routing rule applied.' },
    timeSpent:'<1h', slaEffect:'System',
  },
  {
    id:'e8', date:'18 Aug 2026', time:'10:00', title:'Initial Scrutiny Completed', category:'scrutiny', source:'officer',
    state:'INITIAL_SCRUTINY', desk:'Initial Scrutiny Desk', role:'Scrutiny Officer',
    action:'Initial scrutiny completed — application forwarded to technical scrutiny',
    comment:'Application data reviewed. Routing to Building / Planning Scrutiny.',
    timeSpent:'1d 19h', slaEffect:'MIDC processing',
  },
  {
    id:'e9', date:'18 Aug 2026', time:'10:30', title:'Application Routed to Technical Scrutiny', category:'routing', source:'system',
    state:'TECHNICAL_SCRUTINY', desk:'Initial Scrutiny Desk',
    action:'Routing rule applied',
    routing:{ from:'Initial Scrutiny Desk', to:'Planning / Building Scrutiny', reason:'Service: Building / Planning · Stage: Construction · Configured jurisdiction. Enhanced Review route assigned.' },
    timeSpent:'<1h', slaEffect:'System',
  },
  {
    id:'e10', date:'25 Aug 2026', time:'15:20', title:'Query Raised', category:'queries', source:'officer',
    state:'QUERY_RAISED', desk:'Planning / Building Scrutiny', role:'Technical Officer',
    action:'Query raised — plot area inconsistency',
    comment:'Plot area in application form differs from submitted layout plan. Entrepreneur requested to provide revised building plan and plot record.',
    timeSpent:'7d 5h', slaEffect:'MIDC processing',
  },
  {
    id:'e11', date:'25 Aug 2026', time:'15:22', title:'Awaiting Entrepreneur Response', category:'entrepreneur', source:'system',
    state:'QUERY_RAISED', desk:'Planning / Building Scrutiny',
    action:'Application paused — awaiting entrepreneur response',
    comment:'MIDC processing timer paused per configured SLA rule during entrepreneur response period.',
    timeSpent:'—', slaEffect:'Entrepreneur response time',
  },
  {
    id:'e12', date:'2 Sep 2026', time:'11:05', title:'Entrepreneur Response Received', category:'entrepreneur', source:'entrepreneur',
    state:'RESUBMITTED', desk:'Planning / Building Scrutiny',
    action:'Entrepreneur submitted response',
    entrepreneurResponse:{ date:'2 Sep 2026', time:'11:05', text:'Revised building plan uploaded. Plot record revised per MIDC allotment record update.', attachment:'Building_Plan_Rev2.pdf' },
    timeSpent:'7d 19h', slaEffect:'Entrepreneur response time (excluded from MIDC processing)',
  },
  {
    id:'e13', date:'5 Sep 2026', time:'09:20', title:'Resubmission Received', category:'application', source:'entrepreneur',
    state:'RESUBMITTED', desk:'Planning / Building Scrutiny', role:'System',
    action:'Application resubmitted — version v2',
    resubmission:{ version:'v2', prevVersion:'v1', changes:2, docs:1 },
    comment:'Plot area updated. Revised layout plan submitted.',
    timeSpent:'2d 22h', slaEffect:'Entrepreneur response time',
  },
  {
    id:'e14', date:'8 Sep 2026', time:'09:30', title:'Technical Scrutiny Resumed', category:'scrutiny', source:'officer',
    state:'TECHNICAL_SCRUTINY', desk:'Planning / Building Scrutiny', role:'Technical Officer',
    action:'Technical scrutiny resumed after resubmission review',
    comment:'Resubmission reviewed. Plot area change noted. Cross-form consistency check flagged Fire record mismatch.',
    timeSpent:'3d 0h', slaEffect:'MIDC processing',
  },
  {
    id:'e15', date:'10 Sep 2026', time:'11:00', title:'MPCB Prerequisite — Status Update', category:'dependencies', source:'external',
    state:'TECHNICAL_SCRUTINY', desk:'Planning / Building Scrutiny',
    action:'External dependency status received',
    dependency:{ name:'MPCB CTE', before:'Applied', after:'Pending — additional information requested by MPCB' },
    timeSpent:'—', slaEffect:'External dependency wait',
  },
  {
    id:'e16', date:'16 Sep 2026', time:'09:30', title:'Technical Scrutiny — Active', category:'scrutiny', source:'officer',
    state:'TECHNICAL_SCRUTINY', desk:'Planning / Building Scrutiny', role:'Technical Officer',
    action:'Technical scrutiny in progress', comment:'Building plan under review. Cross-form consistency findings under officer review.',
    current:true, timeSpent:'2d 6h (continuing)', timeSpentLabel:'and counting', slaEffect:'MIDC processing',
  },
]


const EVENT_FILTER_LABELS: Record<string, string> = {
  all:'All', application:'Application', fee:'Fee / Challan', documents:'Documents',
  scrutiny:'Scrutiny', queries:'Queries', entrepreneur:'Entrepreneur', dependencies:'Dependencies',
  inspection:'Inspection', decision:'Decision', routing:'Routing',
}

const SOURCE_BADGE: Record<EventSource,[string,string]> = {
  officer:      ['bg-[#ebf3ff] text-[#1a3a5c]','Officer'],
  system:       ['bg-[#f0f4f8] text-[#1a2533]','System'],
  entrepreneur: ['bg-green-50 text-green-800','Entrepreneur'],
  external:     ['bg-purple-50 text-purple-800','External'],
  inspection:   ['bg-orange-50 text-orange-800','Inspection'],
}

const CAT_DOT: Record<EventCategory,string> = {
  application:'bg-[#1a3a5c]', fee:'bg-green-500', documents:'bg-blue-500',
  scrutiny:'bg-[#1a56db]', queries:'bg-amber-500', entrepreneur:'bg-green-600',
  dependencies:'bg-purple-500', inspection:'bg-orange-500', decision:'bg-teal-600', routing:'bg-[#6b7a8d]',
}

function TimelineEventCard({ ev, onSelect, isSelected }: { ev: TimelineEvent; onSelect: (e: TimelineEvent) => void; isSelected: boolean }) {
  const [srcCls, srcLabel] = SOURCE_BADGE[ev.source]
  const dot = CAT_DOT[ev.category]

  return (
    <div className={`flex gap-4`}>
      {/* Spine */}
      <div className="flex flex-col items-center w-6 shrink-0">
        <div className={`w-3 h-3 rounded-full mt-1 shrink-0 border-2 ${ev.current ? 'border-[#1a56db] bg-[#1a56db] ring-2 ring-[#ebf3ff]' : `border-white ${dot}`}`} />
        <div className="w-0.5 flex-1 bg-[#e8edf2] mt-1" />
      </div>

      {/* Card */}
      <div
        className={`flex-1 mb-4 border rounded overflow-hidden cursor-pointer transition-colors ${isSelected ? 'border-[#1a56db] bg-[#ebf3ff]' : ev.current ? 'border-[#1a56db] bg-white' : 'border-[#d1d9e0] bg-white hover:border-[#bdd4f5]'}`}
        onClick={() => onSelect(ev)}
      >
        {/* Card header */}
        <div className={`px-3 py-2 flex items-start justify-between gap-3 border-b ${ev.current ? 'bg-[#1a3a5c] text-white' : 'bg-[#f8f9fb] border-[#f0f4f8]'}`}>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              {ev.current && <span className="text-[9px] font-bold bg-white text-[#1a3a5c] px-1.5 py-0.5 rounded">CURRENT</span>}
              <p className={`text-xs font-bold ${ev.current ? 'text-white' : 'text-[#1a2533]'}`}>{ev.title}</p>
              <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${ev.current ? 'bg-white/20 text-white' : srcCls}`}>{srcLabel}</span>
              {ev.state && <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded ${ev.current ? 'bg-white/20 text-white' : 'bg-[#f0f4f8] text-[#1a2533]'}`}>{ev.state}</span>}
            </div>
            <p className={`text-[10px] mt-0.5 ${ev.current ? 'text-white/80' : 'text-[#374151]'}`}>{ev.date} · {ev.time}{ev.desk ? ` · ${ev.desk}` : ''}</p>
          </div>
          {ev.timeSpent && (
            <div className={`text-right shrink-0 text-[10px] ${ev.current ? 'text-white/80' : 'text-[#1a2533]'}`}>
              <p className="font-semibold">{ev.timeSpent}</p>
              <p>{ev.timeSpentLabel ?? ev.slaEffect}</p>
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="px-3 py-2 space-y-1.5 text-xs">
          <p className="text-[#1a2533]">{ev.action}</p>
          {ev.comment && <p className="text-[#1a2533] italic">"{ev.comment}"</p>}

          {/* Routing */}
          {ev.routing && (
            <div className="flex items-center gap-2 text-[11px] text-[#1a2533] flex-wrap">
              <span className="bg-[#f0f4f8] px-1.5 py-0.5 rounded">{ev.routing.from}</span>
              <span className="text-[#374151]">→</span>
              <span className="bg-[#ebf3ff] text-[#1a3a5c] px-1.5 py-0.5 rounded font-semibold">{ev.routing.to}</span>
              <span className="text-[10px] text-[#374151]">{ev.routing.reason}</span>
            </div>
          )}

          {/* Dependency */}
          {ev.dependency && (
            <div className="flex items-center gap-2 text-[11px] flex-wrap">
              <span className="font-semibold text-[#1a2533]">{ev.dependency.name}:</span>
              <span className="text-[#1a2533] line-through">{ev.dependency.before}</span>
              <span className="text-[#374151]">→</span>
              <span className="text-amber-700 font-medium">{ev.dependency.after}</span>
            </div>
          )}

          {/* Resubmission */}
          {ev.resubmission && (
            <div className="flex items-center gap-4 text-[11px] flex-wrap">
              <span className="bg-[#ebf3ff] text-[#1a56db] font-semibold px-1.5 py-0.5 rounded">{ev.resubmission.version}</span>
              <span className="text-[#374151]">prev: {ev.resubmission.prevVersion}</span>
              <span className="text-[#1a2533]">{ev.resubmission.changes} changes · {ev.resubmission.docs} new doc</span>
              <button className="text-[#1a56db] hover:underline" onClick={e => e.stopPropagation()}>View delta → M20</button>
            </div>
          )}

          {/* Entrepreneur response */}
          {ev.entrepreneurResponse && (
            <div className="border-l-2 border-green-400 pl-2 mt-1.5 bg-green-50 rounded-r py-1">
              <p className="text-[10px] font-bold text-green-800">ENTREPRENEUR RESPONSE</p>
              <p className="text-[11px] text-green-900 mt-0.5">{ev.entrepreneurResponse.text}</p>
              {ev.entrepreneurResponse.attachment && (
                <p className="text-[10px] text-green-700 mt-0.5">📎 {ev.entrepreneurResponse.attachment}</p>
              )}
              <p className="text-[10px] text-[#374151]">{ev.entrepreneurResponse.date} · {ev.entrepreneurResponse.time}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function EventDetailDrawer({ ev, onClose }: { ev: TimelineEvent; onClose: () => void }) {
  const [srcCls, srcLabel] = SOURCE_BADGE[ev.source]
  return (
    <div className="w-80 shrink-0 bg-white border-l border-[#d1d9e0] overflow-y-auto flex flex-col" role="complementary" aria-label={`Event detail: ${ev.title}`}>
      <div className="flex items-start justify-between px-4 py-3 border-b border-[#d1d9e0] sticky top-0 bg-white z-10">
        <div>
          <p className="text-[10px] font-bold text-[#374151] uppercase tracking-widest">Event Detail</p>
          <p className="text-xs font-bold text-[#1a2533] mt-0.5">{ev.title}</p>
        </div>
        <button onClick={onClose} className="text-[#1a2533] hover:text-[#1a3a5c] transition-colors" aria-label="Close event detail"><Icon.X /></button>
      </div>
      <div className="flex-1 divide-y divide-[#94a3b8] text-xs">
        <div className="px-4 py-3 space-y-1">
          <div className="flex gap-2 flex-wrap">
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${srcCls}`}>{srcLabel}</span>
            {ev.state && <span className="font-mono text-[9px] bg-[#f0f4f8] text-[#1a2533] px-1.5 py-0.5 rounded">{ev.state}</span>}
          </div>
          {[
            ['Date / Time', `${ev.date} · ${ev.time}`],
            ['Desk', ev.desk ?? '—'],
            ['Role', ev.role ?? '—'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between py-1 border-b border-[#f8f9fb]">
              <span className="text-[#374151]">{k}</span>
              <span className="text-[#1a2533] font-medium text-right">{v}</span>
            </div>
          ))}
        </div>
        <div className="px-4 py-3 space-y-1.5">
          <p className="text-[10px] font-bold text-[#374151] uppercase tracking-widest">Action</p>
          <p className="text-[#1a2533]">{ev.action}</p>
          {ev.comment && <p className="text-[#1a2533] italic">"{ev.comment}"</p>}
        </div>
        {(ev.timeSpent || ev.slaEffect) && (
          <div className="px-4 py-3 space-y-1.5">
            <p className="text-[10px] font-bold text-[#374151] uppercase tracking-widest">Timing & SLA Effect</p>
            {ev.timeSpent && <div className="flex justify-between"><span className="text-[#374151]">Time spent</span><span className="font-semibold text-[#1a2533]">{ev.timeSpent}{ev.timeSpentLabel ? ` ${ev.timeSpentLabel}` : ''}</span></div>}
            {ev.slaEffect && <div className="flex justify-between"><span className="text-[#374151]">SLA effect</span><span className="text-[#1a2533]">{ev.slaEffect}</span></div>}
          </div>
        )}
        {ev.routing && (
          <div className="px-4 py-3 space-y-1.5">
            <p className="text-[10px] font-bold text-[#374151] uppercase tracking-widest">Routing</p>
            <div className="flex items-center gap-2"><span className="bg-[#f0f4f8] px-1.5 py-0.5 rounded text-[11px]">{ev.routing.from}</span><span className="text-[#374151]">→</span><span className="bg-[#ebf3ff] text-[#1a3a5c] px-1.5 py-0.5 rounded text-[11px] font-semibold">{ev.routing.to}</span></div>
            <p className="text-[10px] text-[#1a2533]">{ev.routing.reason}</p>
          </div>
        )}
        {ev.dependency && (
          <div className="px-4 py-3 space-y-1.5">
            <p className="text-[10px] font-bold text-[#374151] uppercase tracking-widest">Dependency Event</p>
            <div className="flex justify-between"><span className="text-[#374151]">Dependency</span><span className="font-semibold text-[#1a2533]">{ev.dependency.name}</span></div>
            <div className="flex justify-between"><span className="text-[#374151]">Before</span><span className="text-[#1a2533]">{ev.dependency.before}</span></div>
            <div className="flex justify-between"><span className="text-[#374151]">After</span><span className="text-amber-700 font-medium">{ev.dependency.after}</span></div>
            <p className="text-[10px] text-[#374151]">MIDC can record this status — cannot modify MPCB's decision.</p>
          </div>
        )}
        {ev.entrepreneurResponse && (
          <div className="px-4 py-3 space-y-1.5">
            <p className="text-[10px] font-bold text-green-700 uppercase tracking-widest">Entrepreneur Response</p>
            <p className="text-[#1a2533]">{ev.entrepreneurResponse.text}</p>
            {ev.entrepreneurResponse.attachment && <p className="text-green-700 text-[11px]">📎 {ev.entrepreneurResponse.attachment}</p>}
            <p className="text-[10px] text-[#374151]">{ev.entrepreneurResponse.date} · {ev.entrepreneurResponse.time}</p>
          </div>
        )}
        <div className="px-4 py-3 space-y-2">
          <p className="text-[10px] font-bold text-[#374151] uppercase tracking-widest">Related Workspaces</p>
          {[
            ev.category === 'scrutiny' && 'Scrutiny workspace',
            ev.category === 'queries' && 'Queries → M18/M19',
            ev.resubmission && 'Delta re-scrutiny → M20',
            ev.dependency && 'Dependency map → M17',
            'View audit details → M38',
          ].filter(Boolean).map(label => (
            <button key={String(label)} className="w-full text-left text-[11px] text-[#1a56db] hover:underline border border-[#d1d9e0] rounded px-2 py-1.5 hover:bg-[#f8f9fb]">{String(label)}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function M08TimelinePage({ onBackToOverview, onOpenAudit }: { onBackToOverview: () => void; onOpenAudit?: () => void }) {
  const [filter, setFilter] = useState<string>('all')
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)

  const displayed = filter === 'all' ? TIMELINE_EVENTS : TIMELINE_EVENTS.filter(e => e.category === filter)

  return (
    <div className="bg-[#f8f9fb] flex-1 flex">
      <div className="flex-1 min-w-0 overflow-y-auto">
        <div className="px-6 py-5 space-y-4">

          {/* Breadcrumb */}
          <Breadcrumb items={[
            { label: 'Department Home', href: '/department' },
            { label:'Applications', href:'#', onClick: onBackToOverview },
            { label:'Application Overview', href:'#', onClick: onBackToOverview },
            { label:'Timeline' },
          ]} />

          {/* Header */}
          <div className="flex items-start justify-between gap-4 flex-wrap pb-4 border-b border-[#d1d9e0]">
            <div>
              <h1 className="text-xl font-bold text-[#1a3a5c]">Application Timeline</h1>
              <p className="text-sm text-[#1a2533] mt-0.5">Complete lifecycle and timing history for this MIDC application.</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={onBackToOverview} className="text-xs border border-[#d1d9e0] bg-white text-[#1a2533] px-3 py-1.5 rounded hover:bg-[#f0f4f8]">← Application Overview</button>
              <span className="text-[10px] bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded">Prototype data</span>
            </div>
          </div>

          {/* App context strip */}
          <div className="bg-white border border-[#d1d9e0] rounded px-4 py-2.5 flex flex-wrap gap-x-6 gap-y-1 text-[11px]">
            {[
              ['Application', APP_SAMPLE.id],
              ['Business', APP_SAMPLE.business],
              ['Service', APP_SAMPLE.service],
              ['State', APP_SAMPLE.state],
              ['Desk', APP_SAMPLE.desk],
              ['Office', APP_SAMPLE.office],
            ].map(([k, v]) => (
              <span key={k}><span className="text-[#374151]">{k}:</span> <span className="font-semibold text-[#1a2533]">{v}</span></span>
            ))}
          </div>

          {/* Current position + SLA + Timing summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

            {/* Current position */}
            <div className="bg-white border border-[#1a3a5c] rounded p-3 space-y-2">
              <p className="text-[10px] font-bold text-[#374151] uppercase tracking-widest">Current Position</p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between"><span className="text-[#374151]">State</span><span className="font-mono font-semibold text-[#1a3a5c]">{APP_SAMPLE.state}</span></div>
                <div className="flex justify-between"><span className="text-[#374151]">Desk</span><span className="font-semibold text-[#1a2533]">{APP_SAMPLE.desk}</span></div>
                <div className="flex justify-between"><span className="text-[#374151]">Desk started</span><span className="text-[#1a2533]">16 Sep 2026</span></div>
                <div className="flex justify-between"><span className="text-[#374151]">Desk time</span><span className="text-amber-700 font-semibold">2d 6h</span></div>
                <div className="flex justify-between"><span className="text-[#374151]">Next configured step</span><span className="text-[#1a2533]">Decision / Inspection</span></div>
              </div>
            </div>

            {/* SLA */}
            <div className="bg-white border border-[#d1d9e0] rounded p-3 space-y-2">
              <p className="text-[10px] font-bold text-[#374151] uppercase tracking-widest">SLA</p>
              <div className="flex items-end gap-3">
                <div>
                  <p className="text-2xl font-bold text-amber-700">Day 21</p>
                  <p className="text-xs text-[#374151]">of 30 configured days</p>
                </div>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded">APPROACHING</span>
              </div>
              <div className="w-full bg-[#f0f4f8] rounded-full h-2">
                <div className="h-full bg-amber-500 rounded-full" style={{ width:'70%' }} />
              </div>
              <p className="text-[10px] text-[#374151]">9 days remaining · Due: {APP_SAMPLE.slaDue} · SLA basis: Configured service SLA</p>
            </div>

            {/* Timing breakdown summary */}
            <div className="bg-white border border-[#d1d9e0] rounded p-3 space-y-2">
              <p className="text-[10px] font-bold text-[#374151] uppercase tracking-widest">Time Breakdown</p>
              <div className="space-y-1">
                {TIMING_BREAKDOWN.filter(t => !t.total).map(t => (
                  <div key={t.label} className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-sm shrink-0 ${t.color}`} />
                    <span className="text-[10px] text-[#1a2533] flex-1">{t.label}</span>
                    <span className="text-[10px] font-semibold text-[#1a2533]">{t.value}</span>
                  </div>
                ))}
                <div className="border-t border-[#f0f4f8] pt-1 flex justify-between text-[10px]">
                  <span className="font-bold text-[#1a2533]">Total Elapsed</span>
                  <span className="font-bold text-[#1a3a5c]">21d 11h</span>
                </div>
              </div>
              <p className="text-[10px] text-[#374151]">Entrepreneur response time not counted as MIDC processing delay.</p>
            </div>
          </div>

          {/* Stacked time attribution bar */}
          <div className="bg-white border border-[#d1d9e0] rounded p-4">
            <p className="text-xs font-semibold text-[#1a2533] mb-2">Time Attribution</p>
            <div className="flex h-5 rounded overflow-hidden">
              {TIMING_BREAKDOWN.filter(t => !t.total && t.pct > 0).map(t => (
                <div key={t.label} className={`${t.color} h-full`} style={{ width:`${t.pct}%` }} title={`${t.label}: ${t.value}`} />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
              {TIMING_BREAKDOWN.filter(t => !t.total).map(t => (
                <div key={t.label} className="flex items-center gap-1.5 text-[10px] text-[#1a2533]">
                  <div className={`w-2 h-2 rounded-sm ${t.color}`} />{t.label}: {t.value}
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-[#d1d9e0] rounded px-4 py-2.5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#1a2533] shrink-0">Filter:</span>
            {Object.entries(EVENT_FILTER_LABELS).map(([k, label]) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={`text-[11px] px-2.5 py-1 border rounded transition-colors focus-visible:ring-2 focus-visible:ring-[#1a56db] ${filter === k ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'border-[#d1d9e0] text-[#1a2533] hover:border-[#1a3a5c] hover:text-[#1a3a5c]'}`}
              >
                {label}
                {k !== 'all' && <span className="ml-1 text-[9px] opacity-70">({TIMELINE_EVENTS.filter(e => e.category === k).length})</span>}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="pt-2">
            {displayed.map(ev => (
              <TimelineEventCard key={ev.id} ev={ev} onSelect={setSelectedEvent} isSelected={selectedEvent?.id === ev.id} />
            ))}
            {/* End marker */}
            <div className="flex gap-4 items-center">
              <div className="w-6 flex justify-center"><div className="w-2 h-2 rounded-full bg-[#d1d9e0] border-2 border-white" /></div>
              <p className="text-xs text-[#374151] italic">Application ongoing — timeline continues as events occur.</p>
            </div>
          </div>

          <div className="pb-4">
            <button onClick={onOpenAudit} className="text-xs text-[#1a56db] hover:underline">View detailed audit history → M38</button>
          </div>
        </div>
      </div>

      {/* Event detail drawer */}
      {selectedEvent && (
        <EventDetailDrawer ev={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  )
}

// ─── M06 — Application Overview ──────────────────────────────────────────────







export function M06AppOverviewPage({ onBack, onOpenDna, onOpenTimeline, onOpenPrecheck, onOpenDeltaRescrutiny, onOpenInspectionQueue, onOpenDecision, onOpenCompliance, onOpenConsistency, onOpenDocuments, onOpenDependencyView, onOpenQueries, onOpenRegAssistant, onOpenAudit }: { onBack: () => void; onOpenDna?: () => void; onOpenTimeline?: () => void; onOpenPrecheck?: () => void; onOpenDeltaRescrutiny?: () => void; onOpenInspectionQueue?: () => void; onOpenDecision?: () => void; onOpenCompliance?: () => void; onOpenConsistency?: () => void; onOpenDocuments?: () => void; onOpenDependencyView?: () => void; onOpenQueries?: () => void; onOpenRegAssistant?: () => void; onOpenAudit?: () => void }) {
  const [activeTab, setActiveTab] = useState('Overview')
  const [showDnaDetails, setShowDnaDetails] = useState(false)

  const slaColors = { normal: 'text-green-700 bg-green-50 border-green-200', approaching: 'text-amber-700 bg-amber-50 border-amber-200', breached: 'text-red-700 bg-red-50 border-red-200' }
  const flagColor = { mismatch: 'border-l-amber-500 bg-amber-50', 'doc-expired': 'border-l-red-500 bg-red-50', 'needs-verify': 'border-l-blue-500 bg-blue-50' }

  return (
    <div className="bg-[#f8f9fb] flex-1 overflow-y-auto">
      <div className="px-6 py-5 space-y-4 max-w-full">

        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'Department Home', href: '/department' },
          { label: 'Applications', href: '#', onClick: onBack },
          { label: 'Application Overview' }
        ]} />

        {/* Page title */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-xl font-bold text-[#1a3a5c]">MIDC Application Overview</h1>
            <p className="text-sm text-[#1a2533] mt-0.5">Single application context for review, scrutiny, dependencies, queries, inspection and decision workflow.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="flex items-center gap-1.5 text-xs border border-[#d1d9e0] bg-white text-[#1a2533] px-3 py-1.5 rounded hover:bg-[#f0f4f8] transition-colors">
              ← Back to Applications
            </button>
            <span className="text-[10px] bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded">Prototype data</span>
          </div>
        </div>

        {/* Application header card */}
        <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
          {/* Primary row */}
          <div className="px-5 py-4 flex flex-wrap items-start gap-x-8 gap-y-3 border-b border-[#f0f4f8]">
            {/* Left: ID + Business */}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-[#1a56db]">{APP_SAMPLE.id}</span>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${slaColors[APP_SAMPLE.slaState]}`}>SLA Risk</span>
              </div>
              <p className="text-base font-bold text-[#1a2533] mt-0.5 leading-tight">{APP_SAMPLE.business}</p>
              <p className="text-sm text-[#1a2533]">{APP_SAMPLE.project}</p>
            </div>

            {/* Center: Service + Office */}
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[#374151] w-20">Service</span>
                <span className="font-semibold text-[#1a3a5c] bg-[#ebf3ff] px-1.5 py-0.5 rounded">{APP_SAMPLE.service}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#374151] w-20">Office</span>
                <span className="text-[#1a2533]">{APP_SAMPLE.office}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#374151] w-20">Route</span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">{APP_SAMPLE.scrutinyRoute}</span>
              </div>
            </div>

            {/* Right: Status + Desk + SLA */}
            <div className="ml-auto space-y-1.5 text-xs text-right">
              <div>
                <span className="font-mono text-[11px] font-bold text-[#1a3a5c] bg-[#f0f4f8] px-2 py-0.5 rounded">{APP_SAMPLE.state}</span>
              </div>
              <p className="text-[#1a2533]">Desk: <span className="font-semibold text-[#1a2533]">{APP_SAMPLE.desk}</span></p>
              <p className="text-amber-700 font-semibold">SLA: {APP_SAMPLE.slaElapsed} / {APP_SAMPLE.slaTarget} · {APP_SAMPLE.slaRemaining} remaining</p>
            </div>
          </div>

          {/* Secondary metadata row */}
          <div className="px-5 py-2.5 flex flex-wrap items-center gap-x-6 gap-y-1 text-[11px] text-[#1a2533] bg-[#f8f9fb]">
            {[
              ['Project Stage', APP_SAMPLE.stage],
              ['Version', APP_SAMPLE.version],
              ['Submitted', APP_SAMPLE.submitted],
              ['Last Updated', APP_SAMPLE.lastUpdated],
              ['Applicant', APP_SAMPLE.applicant],
              ['Entity', APP_SAMPLE.entity],
            ].map(([k, v]) => (
              <span key={k}><span className="text-[#374151]">{k}:</span> <span className="font-medium text-[#1a2533]">{v}</span></span>
            ))}
          </div>
        </div>

        {/* Summary metadata grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Business */}
          <div className="bg-white border border-[#d1d9e0] rounded p-3 space-y-1.5 text-xs">
            <p className="font-semibold text-[#1a2533] text-[11px] uppercase tracking-wide border-b border-[#f0f4f8] pb-1.5">Business</p>
            <div className="space-y-1">
              <div className="flex justify-between gap-2"><span className="text-[#374151]">Industry</span><span className="text-right text-[#1a2533] text-[10px]">{APP_SAMPLE.industry}</span></div>
              <div className="flex justify-between gap-2"><span className="text-[#374151]">Applicant</span><span className="text-[#1a2533]">{APP_SAMPLE.applicant}</span></div>
            </div>
          </div>

          {/* Location + MIDC Estate */}
          <div className="bg-white border border-[#d1d9e0] rounded p-3 space-y-1.5 text-xs">
            <p className="font-semibold text-[#1a2533] text-[11px] uppercase tracking-wide border-b border-[#f0f4f8] pb-1.5">Location & MIDC Estate</p>
            <div className="space-y-1">
              <div className="flex justify-between gap-2"><span className="text-[#374151]">District</span><span className="text-[#1a2533]">{APP_SAMPLE.district}</span></div>
              <div className="flex justify-between gap-2"><span className="text-[#374151]">Estate</span><span className="text-[#1a2533] text-[10px] text-right">{APP_SAMPLE.estate}</span></div>
              <div className="flex justify-between gap-2"><span className="text-[#374151]">Plot</span><span className="text-[#1a2533] font-medium">{APP_SAMPLE.plot}</span></div>
              <div className="flex justify-between gap-2"><span className="text-[#374151]">Area</span><span className="text-[#1a2533]">{APP_SAMPLE.plotArea}</span></div>
              <div className="flex justify-between gap-2"><span className="text-[#374151]">Possession</span><span className="text-green-700 font-medium">{APP_SAMPLE.possession}</span></div>
            </div>
          </div>

          {/* Fee + SLA */}
          <div className="bg-white border border-[#d1d9e0] rounded p-3 space-y-1.5 text-xs">
            <p className="font-semibold text-[#1a2533] text-[11px] uppercase tracking-wide border-b border-[#f0f4f8] pb-1.5">Fee & SLA</p>
            <div className="space-y-1">
              <div className="flex justify-between gap-2"><span className="text-[#374151]">Fee status</span><span className="text-green-700 font-medium">{APP_SAMPLE.feeStatus}</span></div>
              <div className="flex justify-between gap-2"><span className="text-[#374151]">Challan</span><span className="text-[#1a2533] font-mono">{APP_SAMPLE.challan}</span></div>
              <div className="flex justify-between gap-2"><span className="text-[#374151]">SLA target</span><span className="text-[#1a2533]">{APP_SAMPLE.slaTarget}</span></div>
              <div className="flex justify-between gap-2"><span className="text-[#374151]">Elapsed</span><span className="text-amber-700 font-medium">{APP_SAMPLE.slaElapsed}</span></div>
              <div className="flex justify-between gap-2"><span className="text-[#374151]">Due</span><span className="text-amber-700">{APP_SAMPLE.slaDue}</span></div>
            </div>
          </div>

          {/* Inspection + Dependencies */}
          <div className="bg-white border border-[#d1d9e0] rounded p-3 space-y-1.5 text-xs">
            <p className="font-semibold text-[#1a2533] text-[11px] uppercase tracking-wide border-b border-[#f0f4f8] pb-1.5">Inspection & Dependencies</p>
            <div className="space-y-1">
              <div className="flex justify-between gap-2"><span className="text-[#374151]">Inspection</span><span className="text-[#1a2533]">Not scheduled</span></div>
              <div className="flex justify-between gap-2"><span className="text-[#374151]">Prerequisite</span><span className="text-[#1a2533]">1 pending (MPCB)</span></div>
              <div className="flex justify-between gap-2"><span className="text-[#374151]">External</span><span className="text-amber-700 font-medium">2 active</span></div>
              <div className="flex justify-between gap-2"><span className="text-[#374151]">Downstream</span><span className="text-[#1a2533]">1 (Utilities)</span></div>
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
          <div className="overflow-x-auto">
            <div className="flex border-b border-[#d1d9e0] min-w-max" role="tablist">
              {APP_TABS.map(tab => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => {
                    const destinations: Record<string, (() => void) | undefined> = { 'Business DNA': onOpenDna, Timeline: onOpenTimeline, Application: onOpenPrecheck, Documents: onOpenDocuments, Consistency: onOpenConsistency, Dependencies: onOpenDependencyView, Queries: onOpenQueries, Inspection: onOpenInspectionQueue, 'Regulatory Reference': onOpenRegAssistant, Audit: onOpenAudit }
                    if (destinations[tab]) destinations[tab]?.(); else setActiveTab(tab)
                  }}
                  className={`px-4 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors focus-visible:ring-2 focus-visible:ring-[#1a56db] ${
                    activeTab === tab
                      ? 'border-[#1a56db] text-[#1a56db] bg-[#ebf3ff]'
                      : 'border-transparent text-[#1a2533] hover:text-[#1a2533] hover:bg-[#f8f9fb]'
                  }`}
                >
                  {tab}
                  {tab === 'Overview' && <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 text-[9px] rounded-full bg-amber-100 text-amber-700 font-bold">{APP_FLAGS.length}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="p-5 space-y-5" role="tabpanel">
            {activeTab !== 'Overview' && (
              <div className="flex flex-col items-center py-10 text-center text-[#374151]">
                <p className="text-sm font-medium text-[#1a2533]">{activeTab}</p>
                <p className="text-xs mt-1">This tab connects to a dedicated workspace ({activeTab === 'Business DNA' ? 'M07' : activeTab === 'Timeline' ? 'M08' : activeTab === 'Consistency' ? 'M16' : activeTab === 'Dependencies' ? 'M17' : activeTab === 'Queries' ? 'M18/M19' : activeTab === 'Inspection' ? 'M21–M24' : activeTab === 'Audit' ? 'M38' : 'future phase'}) — to be implemented in a future sprint.</p>
              </div>
            )}

            {activeTab === 'Overview' && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

                {/* Left column — Automated Review + DNA + Documents + Deps */}
                <div className="xl:col-span-2 space-y-4">

                  {/* Automated Review Summary */}
                  <div className="border border-[#d1d9e0] rounded overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#f8f9fb] border-b border-[#d1d9e0]">
                      <h2 className="text-sm font-semibold text-[#1a2533]">Automated Review Summary</h2>
                      <span className="text-[10px] text-[#374151] bg-white border border-[#d1d9e0] px-2 py-0.5 rounded">Automated findings · Officer review required</span>
                    </div>

                    {/* Completeness row */}
                    <div className="px-4 py-3 border-b border-[#f0f4f8] flex flex-wrap gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800">⚠ Needs Attention</span>
                        <span className="text-[#1a2533]">Completeness: partially complete · 3 automated findings require review</span>
                      </div>
                    </div>

                    {/* Flags */}
                    <div className="divide-y divide-[#94a3b8]">
                      {APP_FLAGS.map((flag, i) => (
                        <div key={i} className={`px-4 py-3 border-l-4 ${flagColor[flag.type as keyof typeof flagColor]}`}>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-[#1a2533]">{flag.title}</p>
                              <p className="text-[11px] text-[#1a2533] mt-0.5">{flag.detail}</p>
                              <div className="flex flex-wrap gap-3 mt-1.5 text-[10px] text-[#374151]">
                                <span>Automated finding</span>
                                <span>Source: {flag.source}</span>
                                <span>Rule: {flag.rule}</span>
                                <span>{flag.ts}</span>
                              </div>
                            </div>
                            <button onClick={() => { if (flag.drill === 'M16') onOpenConsistency?.(); else if (flag.drill === 'M07') onOpenDna?.(); else onOpenDocuments?.() }} className="shrink-0 text-[11px] text-[#1a56db] hover:underline whitespace-nowrap">Review → {flag.drill}</button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Version change */}
                    <div className="px-4 py-3 border-t border-[#f0f4f8] bg-[#f8f9fb]">
                      <p className="text-xs font-semibold text-[#1a2533] mb-1.5">Change since previous version</p>
                      <div className="text-[11px] space-y-1">
                        <div className="flex gap-4">
                          <span className="text-[#374151] w-24">Changed field</span>
                          <span className="text-[#1a2533]">Plot area</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="text-[#374151] w-24">Previous</span>
                          <span className="text-[#1a2533]">3,950 sq m</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="text-[#374151] w-24">Current</span>
                          <span className="text-[#1a2533] font-medium">4,200 sq m</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="text-[#374151] w-24">Impact</span>
                          <span className="text-amber-700 font-medium">Potential MIDC impact detected — officer review required</span>
                        </div>
                      </div>
                      <button onClick={onOpenDeltaRescrutiny} className="text-[11px] text-[#1a56db] hover:underline mt-1.5">Review delta → M20</button>
                    </div>

                    {/* Prerequisite state */}
                    <div className="px-4 py-3 border-t border-[#f0f4f8]">
                      <p className="text-xs font-semibold text-[#1a2533] mb-2">Prerequisite / Dependency State</p>
                      <div className="grid grid-cols-3 gap-3 text-xs">
                        {APP_DEPS.map(d => (
                          <div key={d.name} className="bg-[#f8f9fb] border border-[#d1d9e0] rounded p-2">
                            <p className="font-semibold text-[#1a2533]">{d.name}</p>
                            <p className={`text-[11px] mt-0.5 font-medium ${d.state.includes('expired') ? 'text-red-700' : d.state === 'Pending' ? 'text-amber-700' : 'text-green-700'}`}>{d.state}</p>
                            <p className="text-[10px] text-[#374151] mt-0.5">{d.type}</p>
                            <p className="text-[10px] text-[#6b7280]">{d.note}</p>
                          </div>
                        ))}
                      </div>
                      <button onClick={onOpenDependencyView} className="text-[11px] text-[#1a56db] hover:underline mt-2">View full dependency map → M17</button>
                    </div>

                    {/* Inspection trigger */}
                    <div className="px-4 py-3 border-t border-[#f0f4f8] text-xs text-[#1a2533]">
                      <span className="font-semibold text-[#1a2533]">Inspection: </span>Not triggered — Enhanced Review route does not require mandatory inspection for current configuration. Officer may initiate if warranted.
                      <button onClick={onOpenInspectionQueue} className="ml-2 text-[11px] text-[#1a56db] hover:underline">Inspection workspace → M21</button>
                    </div>
                  </div>

                  {/* Business DNA Snapshot */}
                  <div className="border border-[#d1d9e0] rounded overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#f8f9fb] border-b border-[#d1d9e0]">
                      <h2 className="text-sm font-semibold text-[#1a2533]">Business DNA Snapshot</h2>
                      <button onClick={() => setShowDnaDetails(v => !v)} className="text-[11px] text-[#1a56db] hover:underline">
                        {showDnaDetails ? 'Collapse' : <span onClick={e => { e.stopPropagation(); onOpenDna?.() }} className="cursor-pointer">View full Business DNA → M07</span>}
                      </button>
                    </div>
                    <div className={`grid grid-cols-2 gap-0 divide-x divide-[#94a3b8] ${showDnaDetails ? '' : ''}`}>
                      {DNA_SNAPSHOT.map(group => (
                        <div key={group.group} className="px-4 py-3 border-b border-[#f0f4f8]">
                          <p className="text-[10px] font-semibold text-[#374151] uppercase tracking-wide mb-1.5">{group.group}</p>
                          <div className="space-y-1">
                            {group.items.map(([k, v]) => (
                              <div key={k} className="flex items-start justify-between gap-2 text-[11px]">
                                <span className="text-[#374151] shrink-0">{k}</span>
                                <span className={`text-right font-medium ${v.includes('Needs Verification') ? 'text-amber-700' : v.includes('Pending') || v.includes('expired') ? 'text-amber-700' : v === 'Not applicable' ? 'text-[#6b7280]' : 'text-[#1a2533]'}`}>{v}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Document status */}
                  <div className="border border-[#d1d9e0] rounded overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#f8f9fb] border-b border-[#d1d9e0]">
                      <h2 className="text-sm font-semibold text-[#1a2533]">Document Status</h2>
                      <button onClick={onOpenDocuments} className="text-[11px] text-[#1a56db] hover:underline">View Documents</button>
                    </div>
                    <div className="px-4 py-3 flex flex-wrap gap-4 text-xs">
                      {[['12', 'Submitted', 'text-[#1a2533]'], ['10', 'Valid', 'text-green-700'], ['1', 'Expired', 'text-red-700 font-semibold'], ['1', 'Needs Verification', 'text-amber-700']].map(([n, l, c]) => (
                        <div key={l} className="text-center">
                          <p className={`text-xl font-bold ${c}`}>{n}</p>
                          <p className="text-[10px] text-[#374151]">{l}</p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 pb-3 text-[11px] text-[#1a2533] border-t border-[#f0f4f8] pt-2">
                      <span className="font-medium text-red-700">Fire NOC</span> — Validity expired 31 Aug 2026 · Requires officer review. Document validity issue is a scrutiny flag; it does not automatically determine the outcome.
                    </div>
                  </div>
                </div>

                {/* Right column — Timeline + Current Action + Workflow Context */}
                <div className="space-y-4">

                  {/* Current Action */}
                  <div className="border border-[#1a3a5c] rounded overflow-hidden bg-[#f0f4f8]">
                    <div className="px-4 py-2.5 bg-[#1a3a5c]">
                      <h2 className="text-sm font-semibold text-white">Current Action</h2>
                    </div>
                    <div className="p-4 space-y-2 text-xs">
                      <p className="text-[#1a2533]">Application is in <span className="font-semibold text-[#1a3a5c]">TECHNICAL_SCRUTINY</span> at <span className="font-semibold">{APP_SAMPLE.desk}</span>.</p>
                      <p className="text-[#1a2533]">SLA risk: <span className="text-amber-700 font-semibold">{APP_SAMPLE.slaRemaining} remaining</span></p>
                      <div className="space-y-2 pt-2">
                        {[
                          ['Review automated pre-check', 'primary'],
                          ['Review consistency findings', 'secondary'],
                          ['Review documents', 'secondary'],
                        ].map(([label, variant]) => (
                          <button key={label} onClick={() => { if (label === 'Review automated pre-check') onOpenPrecheck?.(); else if (label === 'Review consistency findings') onOpenConsistency?.(); else onOpenDocuments?.() }} className={`w-full text-left px-3 py-2 rounded text-xs font-semibold transition-colors ${
                            variant === 'primary'
                              ? 'bg-[#1a3a5c] text-white hover:bg-[#0f2540]'
                              : 'bg-white text-[#1a2533] border border-[#d1d9e0] hover:bg-[#f8f9fb]'
                          }`}>{label}</button>
                        ))}
                        <button onClick={() => onOpenDeltaRescrutiny?.()} className="w-full text-left px-3 py-2 rounded text-xs font-semibold transition-colors bg-[#fffbeb] text-[#92400e] border border-[#fcd34d] hover:bg-[#fef3c7]">⬆ Delta Re-scrutiny — Resubmission v2 (M20)</button>
                        <button onClick={() => onOpenInspectionQueue?.()} className="w-full text-left px-3 py-2 rounded text-xs font-semibold transition-colors bg-[#eff6ff] text-[#1e40af] border border-[#93c5fd] hover:bg-[#dbeafe]">🔍 Inspection Queue / Planning → M21</button>
                        <button onClick={() => onOpenCompliance?.()} className="w-full text-left px-3 py-2 rounded text-xs font-semibold transition-colors bg-[#f5f3ff] text-[#5b21b6] border border-[#c4b5fd] hover:bg-[#ede9fe]">📋 Conditions / Compliance → M28</button>
                        <button onClick={() => onOpenDecision?.()} className="w-full text-left px-3 py-2 rounded text-xs font-semibold bg-[#fef2f2] text-[#991b1b] border border-[#fca5a5] hover:bg-[#fee2e2]">⚖ Final Decision Workspace → M25</button>
                      </div>
                      <p className="text-[10px] text-[#374151] pt-1">Decision actions (M25/M26) become available when all scrutiny workflow steps are resolved and configured permissions allow.</p>
                    </div>
                  </div>

                  {/* Workflow context */}
                  <div className="border border-[#d1d9e0] rounded overflow-hidden">
                    <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#d1d9e0]">
                      <h2 className="text-sm font-semibold text-[#1a2533]">Workflow Context</h2>
                    </div>
                    <div className="px-4 py-3 text-xs space-y-2">
                      {[
                        ['Route', APP_SAMPLE.scrutinyRoute],
                        ['Current state', APP_SAMPLE.state],
                        ['Current desk', APP_SAMPLE.desk],
                        ['Dept processing', APP_SAMPLE.deptTime],
                        ['Entrepreneur time', APP_SAMPLE.entrepreneurTime],
                        ['Total elapsed', APP_SAMPLE.slaElapsed],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-2 py-1 border-b border-[#f8f9fb]">
                          <span className="text-[#374151]">{k}</span>
                          <span className="font-medium text-[#1a2533] text-right">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Timeline */}
                  <div className="border border-[#d1d9e0] rounded overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#f8f9fb] border-b border-[#d1d9e0]">
                      <h2 className="text-sm font-semibold text-[#1a2533]">Recent Timeline</h2>
                      <button onClick={() => onOpenTimeline?.()} className="text-[11px] text-[#1a56db] hover:underline">Full timeline → M08</button>
                    </div>
                    <div className="px-4 py-3 space-y-0">
                      {APP_TIMELINE.slice(-4).reverse().map((ev, i) => (
                        <div key={i} className="flex gap-3 pb-3">
                          <div className="flex flex-col items-center">
                            <div className="w-2 h-2 rounded-full bg-[#1a3a5c] mt-1 shrink-0" />
                            {i < 3 && <div className="w-0.5 flex-1 bg-[#d1d9e0] mt-1" />}
                          </div>
                          <div className="pb-0.5 min-w-0">
                            <p className="text-[10px] text-[#374151]">{ev.date}</p>
                            <p className="text-xs font-medium text-[#1a2533]">{ev.event}</p>
                            <p className="text-[10px] text-[#374151] truncate">{ev.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── M09 Automated Pre-check ─────────────────────────────────────────────────



const M09_GROUPS: PreCheckGroup[] = [
  {
    id: 'form', title: 'Form', desc: 'Validates that all configured mandatory fields, dependent forms, declarations and format requirements are met.',
    checks: [
      { id:'f1', name:'Mandatory fields present', result:'verified', explanation:'All configured mandatory fields for Building / Planning are present.', source:'Application submission data', checkedAt:'18 Sep 2026, 14:32', rule:'FORM-MAND-01' },
      { id:'f2', name:'Dependent form complete', result:'verified', explanation:'All dependent sections required for this service stage are complete.', source:'Application submission data', checkedAt:'18 Sep 2026, 14:32', rule:'FORM-DEP-01' },
      { id:'f3', name:'Declaration complete', result:'verified', explanation:'Applicant declaration and undertaking are recorded.', source:'Application submission data', checkedAt:'18 Sep 2026, 14:32', rule:'FORM-DECL-01' },
      { id:'f4', name:'Basic format validation', result:'verified', explanation:'Field formats (CIN, PAN, contact, pincode) pass configured validation rules.', source:'Configured format rules', checkedAt:'18 Sep 2026, 14:32', rule:'FORM-FMT-01' },
    ],
  },
  {
    id: 'payment', title: 'Payment / Challan', desc: 'Checks fee payment state and challan reference for this service.',
    checks: [
      { id:'p1', name:'Fee payment state', result:'verified', explanation:'Fee confirmed as Paid. Payment reference received from submission/payment flow.', source:'Submission / payment flow', checkedAt:'18 Sep 2026, 14:32', rule:'PAY-STATE-01',
        detail:{ values:[{ label:'Status', value:'PAID' }, { label:'Challan', value:'CH-2026-00482' }, { label:'Payment ref', value:'PAY-MIDC-00482' }] } },
    ],
  },
  {
    id: 'documents', title: 'Documents', desc: 'Checks presence, validity, expiry and verification status of configured required documents.',
    checks: [
      { id:'d1', name:'MIDC Allotment Letter', result:'verified', explanation:'Document present. Verification: DEPARTMENT_VERIFIED. No expiry applicable.', source:'Document workspace', checkedAt:'18 Sep 2026, 14:32', rule:'DOC-ALLOT-01',
        detail:{ values:[{ label:'Present', value:'Yes' }, { label:'Verification', value:'DEPARTMENT_VERIFIED' }, { label:'Expiry', value:'Not applicable' }] } },
      { id:'d2', name:'CTE Certificate (MPCB)', result:'verified', explanation:'Document present. Verification: DEPARTMENT_VERIFIED. Valid through 31 Dec 2027.', source:'Document workspace', checkedAt:'18 Sep 2026, 14:32', rule:'DOC-CTE-01',
        detail:{ values:[{ label:'Present', value:'Yes' }, { label:'Verification', value:'DEPARTMENT_VERIFIED' }, { label:'Expiry', value:'31 Dec 2027' }] } },
      { id:'d3', name:'Fire NOC (Provisional)', result:'warning', explanation:'Document present but expiry date has passed (10 Sep 2026). Officer review required.', source:'Document workspace', checkedAt:'18 Sep 2026, 14:32', rule:'DOC-FIRE-01',
        detail:{ values:[{ label:'Present', value:'Yes' }, { label:'Verification', value:'SELF_DECLARED' }, { label:'Expiry', value:'10 Sep 2026 (Expired)', match:false }], impact:'Expired document — review required', nextReview:'Document workspace' } },
      { id:'d4', name:'Environmental Clearance', result:'verified', explanation:'Document present. Verification: USER_CONFIRMED. Valid.', source:'Document workspace', checkedAt:'18 Sep 2026, 14:32', rule:'DOC-EC-01',
        detail:{ values:[{ label:'Present', value:'Yes' }, { label:'Verification', value:'USER_CONFIRMED' }, { label:'Expiry', value:'18 Mar 2028' }] } },
    ],
  },
  {
    id: 'dna', title: 'Business DNA', desc: 'Checks that required Business DNA fields are available, NOT_APPLICABLE branches are correctly handled, and NEEDS_REVIEW items are surfaced.',
    checks: [
      { id:'b1', name:'Required profile fields available', result:'verified', explanation:'All configured mandatory Business DNA fields for this service are present and answered.', source:'Business DNA — Adaptive Profile', checkedAt:'18 Sep 2026, 14:32', rule:'DNA-REQ-01' },
      { id:'b2', name:'Boiler branch — NOT_APPLICABLE', result:'verified', explanation:'Boiler-related branch is not applicable based on current Business DNA. No missing-data warning raised.', source:'Business DNA — Adaptive Profile', checkedAt:'18 Sep 2026, 14:32', rule:'DNA-NA-01' },
      { id:'b3', name:'Effluent branch — NOT_APPLICABLE', result:'verified', explanation:'Effluent treatment branch is not applicable for this process type. No missing-data warning raised.', source:'Business DNA — Adaptive Profile', checkedAt:'18 Sep 2026, 14:32', rule:'DNA-NA-02' },
      { id:'b4', name:'Hazardous Waste — NEEDS_VERIFICATION', result:'judgment', explanation:'Hazardous Waste field is CONFIRMED (Yes) but verification state is NEEDS_VERIFICATION. Source information requires officer verification.', source:'Business DNA — Adaptive Profile', checkedAt:'18 Sep 2026, 14:32', rule:'DNA-VERIFY-01',
        detail:{ values:[{ label:'Field', value:'Hazardous Waste' }, { label:'Value', value:'Yes' }, { label:'Adaptive state', value:'CONFIRMED' }, { label:'Verification', value:'NEEDS_VERIFICATION', match:false }], impact:'Verification required — field used by MPCB context', nextReview:'M07 — Business DNA' } },
    ],
  },
  {
    id: 'land', title: 'MIDC / Land Context', desc: 'Checks MIDC estate, plot, possession and land data consistency for configured service requirements.',
    checks: [
      { id:'l1', name:'MIDC Estate', result:'verified', explanation:'MIDC Estate confirmed as applicable. Verified via MIDC allotment record.', source:'MIDC allotment record', checkedAt:'18 Sep 2026, 14:32', rule:'LAND-ESTATE-01' },
      { id:'l2', name:'Plot', result:'verified', explanation:'Plot number confirmed. Plot record available and SYSTEM_VERIFIED.', source:'MIDC allotment record', checkedAt:'18 Sep 2026, 14:32', rule:'LAND-PLOT-01' },
      { id:'l3', name:'Possession', result:'verified', explanation:'Possession information available and consistent with MIDC record.', source:'MIDC allotment record', checkedAt:'18 Sep 2026, 14:32', rule:'LAND-POSS-01' },
      { id:'l4', name:'Land information consistency', result:'warning', explanation:'Plot area in the submitted Building / Planning form (4,200 m²) differs from the verified MIDC allotment record (4,800 m²). Review required.', source:'Cross-reference: allotment vs form', checkedAt:'18 Sep 2026, 14:32', rule:'LAND-CONS-01',
        detail:{ values:[{ label:'Allotment record', value:'4,800 m²', match:true }, { label:'Building/Planning form', value:'4,200 m²', match:false }], impact:'Potential cross-form inconsistency', nextReview:'M16 — Cross-form Consistency' } },
    ],
  },
  {
    id: 'crossform', title: 'Cross-form', desc: 'Compares shared data fields across the application, Business DNA and connected records to identify configured mismatches.',
    checks: [
      { id:'x1', name:'Plot area consistency', result:'warning', explanation:'Plot area differs across records. Business DNA and MIDC application match, but Fire context shows a different value.', source:'Configured connected records', checkedAt:'18 Sep 2026, 14:32', rule:'XFORM-PLOT-01',
        detail:{ values:[{ label:'Master Business Profile', value:'4,800 m²', match:true }, { label:'MIDC Application', value:'4,800 m²', match:true }, { label:'Fire context', value:'4,600 m²', match:false }], impact:'Cross-form inconsistency — source of truth not yet established', nextReview:'M16 — Cross-form Consistency' } },
      { id:'x2', name:'Building area', result:'verified', explanation:'Building area is consistent across all connected records.', source:'Configured connected records', checkedAt:'18 Sep 2026, 14:32', rule:'XFORM-BLDG-01' },
      { id:'x3', name:'Investment', result:'warning', explanation:'Investment value changed since previous version. Current: ₹42 Cr, Previous: ₹40 Cr. Review required.', source:'Business DNA vs previous version', checkedAt:'18 Sep 2026, 14:32', rule:'XFORM-INV-01',
        detail:{ prevValue:'₹40 Cr', currValue:'₹42 Cr', changedAt:'18 Sep 2026', impact:'Material change — may affect scrutiny scope', nextReview:'M20 — Delta Re-scrutiny' } },
      { id:'x4', name:'Project location', result:'verified', explanation:'Project location is consistent across all configured sources.', source:'Configured connected records', checkedAt:'18 Sep 2026, 14:32', rule:'XFORM-LOC-01' },
      { id:'x5', name:'Company identity', result:'verified', explanation:'Business identity matches between Business DNA and submitted application.', source:'Business DNA vs application form', checkedAt:'18 Sep 2026, 14:32', rule:'XFORM-ID-01',
        detail:{ values:[{ label:'Business DNA', value:'Aster BioTech Manufacturing Pvt. Ltd.', match:true }, { label:'MIDC Application', value:'Aster BioTech Manufacturing Pvt. Ltd.', match:true }] } },
    ],
  },
  {
    id: 'dependencies', title: 'Dependencies', desc: 'Reports the current state of configured prerequisite and external department dependencies.',
    checks: [
      { id:'dep1', name:'MPCB — Consent to Establish', result:'warning', explanation:'External prerequisite (MPCB CTE) is pending. Application can proceed to scrutiny; dependency must be resolved before final decision.', source:'Connected regulatory record', checkedAt:'18 Sep 2026, 14:32', rule:'DEP-MPCB-01',
        detail:{ values:[{ label:'Dependency', value:'MPCB — Consent to Establish' }, { label:'Authority', value:'MPCB' }, { label:'Current state', value:'Pending', match:false }, { label:'Last updated', value:'18 Sep 2026' }], impact:'Prerequisite pending — detailed status in M17', nextReview:'M17 — Dependencies' } },
      { id:'dep2', name:'Fire Authority — NOC', result:'warning', explanation:'Fire Authority NOC dependency is pending. Associated document has also expired — review required.', source:'Connected regulatory record', checkedAt:'18 Sep 2026, 14:32', rule:'DEP-FIRE-01',
        detail:{ values:[{ label:'Dependency', value:'Fire Authority — NOC' }, { label:'Authority', value:'Fire Authority' }, { label:'Current state', value:'Pending', match:false }, { label:'Last updated', value:'15 Sep 2026' }], impact:'Prerequisite pending — expired document flagged separately', nextReview:'M17 — Dependencies' } },
      { id:'dep3', name:'MIDC Utilities — Connection', result:'verified', explanation:'MIDC Utilities context is available. No blocking condition identified.', source:'Connected regulatory record', checkedAt:'18 Sep 2026, 14:32', rule:'DEP-UTIL-01' },
    ],
  },
  {
    id: 'change', title: 'Change', desc: 'Compares current application version against previous version to identify changed shared project data.',
    checks: [
      { id:'c1', name:'Plot area', result:'verified', explanation:'Plot area is unchanged since previous version. Current: 4,800 m².', source:'Business DNA version comparison', checkedAt:'18 Sep 2026, 14:32', rule:'CHANGE-PLOT-01' },
      { id:'c2', name:'Investment', result:'warning', explanation:'Investment changed after submission. Previous: ₹40 Cr → Current: ₹42 Cr.', source:'Business DNA version comparison', checkedAt:'18 Sep 2026, 14:32', rule:'CHANGE-INV-01',
        detail:{ prevValue:'₹40 Cr', currValue:'₹42 Cr', changedAt:'18 Sep 2026', impact:'Material change since previous version', nextReview:'M20 — Delta Re-scrutiny' } },
      { id:'c3', name:'Capacity', result:'warning', explanation:'Production capacity figure changed after submission. Previous: 500 MT/yr → Current: 550 MT/yr.', source:'Business DNA version comparison', checkedAt:'18 Sep 2026, 14:32', rule:'CHANGE-CAP-01',
        detail:{ prevValue:'500 MT/yr', currValue:'550 MT/yr', changedAt:'18 Sep 2026', impact:'Capacity change may affect regulatory thresholds', nextReview:'M20 — Delta Re-scrutiny' } },
      { id:'c4', name:'Project location', result:'verified', explanation:'Project location is unchanged since previous version.', source:'Business DNA version comparison', checkedAt:'18 Sep 2026, 14:32', rule:'CHANGE-LOC-01' },
      { id:'c5', name:'Building area', result:'verified', explanation:'Building area is unchanged since previous version.', source:'Business DNA version comparison', checkedAt:'18 Sep 2026, 14:32', rule:'CHANGE-BLDG-01' },
    ],
  },
]

const M09_RESULT_META: Record<PreCheckResult, { label: string; icon: string; dotCls: string; textCls: string; bgCls: string; borderCls: string }> = {
  verified: { label:'Machine-verified', icon:'✓', dotCls:'bg-emerald-500', textCls:'text-emerald-700', bgCls:'bg-emerald-50', borderCls:'border-emerald-200' },
  warning:  { label:'Warning',          icon:'⚠', dotCls:'bg-amber-400',   textCls:'text-amber-700',   bgCls:'bg-amber-50',   borderCls:'border-amber-200'   },
  judgment: { label:'Needs officer judgment', icon:'○', dotCls:'bg-[#9aa5b4]', textCls:'text-[#4a5568]', bgCls:'bg-[#f8f9fb]', borderCls:'border-[#d1d9e0]' },
}

function PreCheckResultBadge({ result }: { result: PreCheckResult }) {
  const m = M09_RESULT_META[result]
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${m.bgCls} ${m.textCls} border ${m.borderCls}`}>
      <span aria-hidden="true">{m.icon}</span>{m.label}
    </span>
  )
}

function PreCheckDrawer({ check, onClose }: { check: PreCheck; onClose: () => void }) {
  const m = M09_RESULT_META[check.result]
  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label={`Check detail: ${check.name}`}>
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md h-full overflow-y-auto shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#d1d9e0] bg-[#f8f9fb] shrink-0">
          <div>
            <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold">Automated Check Detail</p>
            <h3 className="text-sm font-bold text-[#1a2533]">{check.name}</h3>
          </div>
          <button onClick={onClose} className="text-[#1a2533] hover:text-[#1a2533] p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]" aria-label="Close drawer">✕</button>
        </div>
        <div className="p-5 space-y-5 flex-1">
          <div>
            <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Result</p>
            <PreCheckResultBadge result={check.result} />
          </div>
          <div>
            <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-1">What was checked</p>
            <p className="text-xs text-[#1a2533]">{check.explanation}</p>
          </div>
          {check.detail?.values && (
            <div>
              <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Values</p>
              <div className="border border-[#d1d9e0] rounded divide-y divide-[#d1d9e0]">
                {check.detail.values.map(v => (
                  <div key={v.label} className="flex items-start justify-between px-3 py-2 gap-4">
                    <span className="text-[10px] text-[#374151] shrink-0">{v.label}</span>
                    <span className={`text-[11px] font-medium text-right ${v.match === false ? 'text-amber-700' : v.match === true ? 'text-emerald-700' : 'text-[#1a2533]'}`}>{v.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {(check.detail?.prevValue || check.detail?.currValue) && (
            <div>
              <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Change</p>
              <div className="border border-[#d1d9e0] rounded divide-y divide-[#d1d9e0]">
                <div className="flex items-center justify-between px-3 py-2"><span className="text-[10px] text-[#374151]">Previous</span><span className="text-[11px] font-medium text-[#1a2533]">{check.detail.prevValue}</span></div>
                <div className="flex items-center justify-between px-3 py-2"><span className="text-[10px] text-[#374151]">Current</span><span className="text-[11px] font-medium text-amber-700">{check.detail.currValue}</span></div>
                {check.detail.changedAt && <div className="flex items-center justify-between px-3 py-2"><span className="text-[10px] text-[#374151]">Changed</span><span className="text-[11px] text-[#1a2533]">{check.detail.changedAt}</span></div>}
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Source</p>
              <p className="text-[11px] text-[#1a2533]">{check.source}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Checked at</p>
              <p className="text-[11px] text-[#1a2533]">{check.checkedAt}</p>
            </div>
          </div>
          {check.rule && (
            <div>
              <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Check basis</p>
              <p className="text-[11px] text-[#1a2533] font-mono">{check.rule}</p>
            </div>
          )}
          {check.detail?.impact && (
            <div>
              <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Impact</p>
              <p className="text-[11px] text-[#1a2533]">{check.detail.impact}</p>
            </div>
          )}
          {check.detail?.nextReview && (
            <div>
              <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Next review</p>
              <p className="text-[11px] text-[#1a56db] font-medium">{check.detail.nextReview}</p>
            </div>
          )}
          <div className="pt-2 border-t border-[#d1d9e0]">
            <p className="text-[10px] text-[#374151] italic">System finding — officer scrutiny determines the regulatory conclusion.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function PreCheckGroupCard({ group, defaultExpanded }: { group: PreCheckGroup; defaultExpanded?: boolean }) {
  const [expanded, setExpanded] = useState(defaultExpanded ?? false)
  const [activeCheck, setActiveCheck] = useState<PreCheck | null>(null)
  const counts = {
    verified: group.checks.filter(c => c.result === 'verified').length,
    warning:  group.checks.filter(c => c.result === 'warning').length,
    judgment: group.checks.filter(c => c.result === 'judgment').length,
  }
  return (
    <div className="border border-[#d1d9e0] rounded overflow-hidden">
      {activeCheck && <PreCheckDrawer check={activeCheck} onClose={() => setActiveCheck(null)} />}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center justify-between px-4 py-3 bg-[#f8f9fb] hover:bg-[#f0f4f8] transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1a56db]"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div>
            <p className="text-xs font-bold text-[#1a2533]">{group.title}</p>
            <p className="text-[10px] text-[#374151] mt-0.5 max-w-xs truncate">{group.desc}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 ml-4">
          {counts.verified > 0 && <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />{counts.verified}</span>}
          {counts.warning > 0  && <span className="flex items-center gap-1 text-[10px] text-amber-700 font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />{counts.warning}</span>}
          {counts.judgment > 0 && <span className="flex items-center gap-1 text-[10px] text-[#1a2533] font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-[#9aa5b4] inline-block" />{counts.judgment}</span>}
          <span className="text-[#374151] text-xs ml-1">{expanded ? '▲' : '▼'}</span>
        </div>
      </button>
      {expanded && (
        <div className="divide-y divide-[#94a3b8]">
          {group.checks.map(check => {
            const m = M09_RESULT_META[check.result]
            return (
              <button
                key={check.id}
                onClick={() => setActiveCheck(check)}
                className="w-full text-left px-4 py-3 hover:bg-[#f8f9fb] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1a56db] group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-[#1a2533] group-hover:text-[#1a56db]">{check.name}</p>
                    <p className="text-[10px] text-[#374151] mt-0.5 leading-relaxed">{check.explanation}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[9px] text-[#6b7280]">Checked {check.checkedAt}</span>
                      {check.rule && <span className="text-[9px] font-mono text-[#6b7280]">{check.rule}</span>}
                    </div>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-1">
                    <PreCheckResultBadge result={check.result} />
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function M09PreCheckPage({ onBackToOverview, onOpenDna, onOpenTimeline, onOpenScrutinyRoute }: { onBackToOverview: () => void; onOpenDna?: () => void; onOpenTimeline?: () => void; onOpenScrutinyRoute?: () => void }) {
  const totalVerified = M09_GROUPS.flatMap(g => g.checks).filter(c => c.result === 'verified').length
  const totalWarning  = M09_GROUPS.flatMap(g => g.checks).filter(c => c.result === 'warning').length
  const totalJudgment = M09_GROUPS.flatMap(g => g.checks).filter(c => c.result === 'judgment').length
  const totalChecks = totalVerified + totalWarning + totalJudgment

  return (
    <div className="flex-1 bg-[#f8f9fb] overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-6 space-y-5">

        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'Department Home', onClick: onBackToOverview },
          { label: 'Applications', onClick: onBackToOverview },
          { label: 'Application Overview', onClick: onBackToOverview },
          { label: 'Automated Pre-check' },
        ]} />

        {/* Page header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-[#1a2533]">Automated Pre-check</h1>
            <p className="text-sm text-[#1a2533] mt-0.5">Objective system checks completed before manual MIDC scrutiny.</p>
          </div>
          <button onClick={onBackToOverview} className="text-xs text-[#1a56db] hover:underline shrink-0">← Application Overview</button>
        </div>

        {/* Application context strip */}
        <div className="bg-white border border-[#d1d9e0] rounded p-4">
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3">
            {[
              ['Application ID', APP_SAMPLE.id],
              ['Business / Project', APP_SAMPLE.business],
              ['MIDC Service', APP_SAMPLE.service],
              ['Current state', APP_SAMPLE.state],
              ['Current desk', APP_SAMPLE.desk],
              ['Office / Region', APP_SAMPLE.office],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold">{k}</p>
                <p className="text-xs font-semibold text-[#1a2533] mt-0.5">{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pre-check status summary */}
        <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#f8f9fb] border-b border-[#d1d9e0]">
            <div>
              <p className="text-xs font-bold text-[#1a2533]">Pre-check Status</p>
              <p className="text-[10px] text-[#374151]">Pre-check complete · Last run: 18 Sep 2026, 14:32 · Version checked: v3</p>
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">Complete</span>
          </div>
          <div className="grid grid-cols-3 divide-x divide-[#d1d9e0]">
            <div className="px-5 py-4 text-center">
              <p className="text-2xl font-bold text-emerald-700">{totalVerified}</p>
              <p className="text-[10px] text-[#374151] mt-0.5 font-medium">✓ Machine-verified</p>
            </div>
            <div className="px-5 py-4 text-center">
              <p className="text-2xl font-bold text-amber-600">{totalWarning}</p>
              <p className="text-[10px] text-[#374151] mt-0.5 font-medium">⚠ Warning</p>
            </div>
            <div className="px-5 py-4 text-center">
              <p className="text-2xl font-bold text-[#1a2533]">{totalJudgment}</p>
              <p className="text-[10px] text-[#374151] mt-0.5 font-medium">○ Needs officer judgment</p>
            </div>
          </div>
          <div className="px-4 py-2 border-t border-[#d1d9e0] flex items-center gap-4 bg-[#f8f9fb]">
            <span className="text-[10px] text-[#374151]">Total checks: <strong className="text-[#1a2533]">{totalChecks}</strong></span>
            <span className="text-[10px] text-[#374151]">Version: <strong className="text-[#1a2533]">v3</strong></span>
            <span className="text-[10px] text-[#374151]">Previous checked: <strong className="text-[#1a2533]">v2</strong></span>
          </div>
        </div>

        {/* System notice */}
        <div className="bg-[#ebf3ff] border border-[#bdd4f5] rounded px-4 py-3 flex gap-3">
          <span className="text-[#1a56db] text-sm shrink-0 mt-0.5" aria-hidden="true">ℹ</span>
          <p className="text-xs text-[#1a3a5c]">Automated pre-checks identify objective data, document, payment, consistency and dependency conditions. They do not replace statutory scrutiny or officer judgment.</p>
        </div>

        {/* System check vs officer review legend */}
        <div className="flex items-center gap-6 text-[10px] text-[#374151]">
          <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-sm bg-[#ebf3ff] border border-[#bdd4f5]" />System check — objective automated finding</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-sm bg-[#f8f9fb] border border-[#d1d9e0]" />Officer review — statutory judgment required</span>
        </div>

        {/* Sample data notice */}
        <p className="text-[10px] text-[#374151] italic">All values are fictional prototype data and do not represent actual MIDC records, legal thresholds, or official processing requirements.</p>

        {/* Check groups */}
        <div className="space-y-2">
          {M09_GROUPS.map((group, i) => (
            <PreCheckGroupCard key={group.id} group={group} defaultExpanded={i === 0} />
          ))}
        </div>

        {/* Secondary actions */}
        <div className="bg-white border border-[#d1d9e0] rounded p-4">
          <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-3">Related Workspaces</p>
          <div className="flex flex-wrap gap-2">
            <button onClick={onOpenDna} className="px-3 py-1.5 text-xs border border-[#d1d9e0] rounded text-[#1a2533] hover:bg-[#f8f9fb] transition-colors">View Business DNA → M07</button>
            <button onClick={onOpenTimeline} className="px-3 py-1.5 text-xs border border-[#d1d9e0] rounded text-[#1a2533] hover:bg-[#f8f9fb] transition-colors">View Timeline → M08</button>
            <button className="px-3 py-1.5 text-xs border border-[#d1d9e0] rounded text-[#374151] cursor-default">View Consistency → M16</button>
            <button className="px-3 py-1.5 text-xs border border-[#d1d9e0] rounded text-[#374151] cursor-default">View Dependencies → M17</button>
            <button className="px-3 py-1.5 text-xs border border-[#d1d9e0] rounded text-[#374151] cursor-default">View Delta Re-scrutiny → M20</button>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="bg-white border border-[#d1d9e0] rounded p-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#1a2533]">Automated pre-check complete.</p>
            <p className="text-[11px] text-[#374151] mt-0.5">{totalWarning} warning{totalWarning !== 1 ? 's' : ''} and {totalJudgment} officer-review item{totalJudgment !== 1 ? 's' : ''} identified. Application can proceed to manual scrutiny.</p>
          </div>
          <button onClick={onOpenScrutinyRoute} className="px-4 py-2 bg-[#1a3a5c] text-white text-xs font-bold rounded hover:bg-[#0f2540] transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]">
            Proceed to Scrutiny → M10
          </button>
        </div>

      </div>
    </div>
  )
}

// ─── M10 Scrutiny Route / Explainability ─────────────────────────────────────


const SCRUTINY_FACTORS: ScrutinyFactor[] = [
  { id:'sf1', name:'Service type', result:'verified', condition:'Service type is Land / Plot — configured as a factor for this scrutiny path.', source:'Configured service requirements', rule:'ROUTE-SVC-01', evaluatedAt:'23 Sep 2026, 10:42',
    detail:{ values:[{ label:'Service', value:'Land / Plot' }, { label:'Factor effect', value:'Standard routing consideration' }] } },
  { id:'sf2', name:'New construction', result:'warning', condition:'Proposed new construction indicated in the submitted application and Business DNA.', source:'Application form + Business DNA', rule:'ROUTE-CONST-01', evaluatedAt:'23 Sep 2026, 10:42',
    detail:{ values:[{ label:'Project stage', value:'New Construction' }, { label:'Factor effect', value:'Triggers enhanced review depth', match:false }], impact:'Construction stage is a configured scrutiny-depth condition', nextReview:'M11 — Scrutiny Workbench' } },
  { id:'sf3', name:'Land / plot inconsistency', result:'warning', condition:'Plot area in the submitted application differs from the Master Project Dossier record.', source:'Master Project Dossier + Current MIDC Application', rule:'Configured consistency rule: Plot Area', evaluatedAt:'23 Sep 2026, 10:42',
    detail:{ values:[{ label:'Master Project Dossier', value:'4,800 m²', match:true }, { label:'MIDC Application form', value:'4,200 m²', match:false }], impact:'Cross-form mismatch — configured scrutiny factor', nextReview:'M16 — Cross-form Consistency' } },
  { id:'sf4', name:'Unresolved prerequisite', result:'warning', condition:'MPCB Consent to Establish is pending. External dependency included as a configured scrutiny factor.', source:'Connected regulatory record (MPCB)', rule:'ROUTE-DEP-01', evaluatedAt:'23 Sep 2026, 10:42',
    detail:{ values:[{ label:'Dependency', value:'MPCB — Consent to Establish' }, { label:'Status', value:'Pending', match:false }, { label:'Authority', value:'MPCB' }], impact:'Prerequisite pending — included as routing factor', nextReview:'M17 — Dependencies' } },
  { id:'sf5', name:'Inspection requirement', result:'judgment', condition:'Inspection condition configured for this service and project context. Whether inspection proceeds depends on officer assessment.', source:'Configured service workflow', rule:'ROUTE-INSP-01', evaluatedAt:'23 Sep 2026, 10:42',
    detail:{ values:[{ label:'Requirement', value:'Conditional' }, { label:'Configured for', value:'Land / Plot service' }], impact:'Inspection may be required — officer review required', nextReview:'M21 / M22 — Inspection Planning' } },
]


function ScrutinyFactorRow({ factor }: { factor: ScrutinyFactor }) {
  const [open, setOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const resultMeta = {
    verified: { label:'Configured — matched', icon:'✓', textCls:'text-emerald-700', bgCls:'bg-emerald-50', borderCls:'border-emerald-200' },
    warning:  { label:'Factor triggered', icon:'⚠', textCls:'text-amber-700', bgCls:'bg-amber-50', borderCls:'border-amber-200' },
    judgment: { label:'Needs officer judgment', icon:'○', textCls:'text-[#4a5568]', bgCls:'bg-[#f8f9fb]', borderCls:'border-[#d1d9e0]' },
  }[factor.result]
  return (
    <>
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label={`Factor detail: ${factor.name}`}>
          <div className="absolute inset-0 bg-black/30" onClick={() => setDrawerOpen(false)} />
          <div className="relative bg-white w-full max-w-md h-full overflow-y-auto shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#d1d9e0] bg-[#f8f9fb] shrink-0">
              <div>
                <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold">Configured Scrutiny Factor</p>
                <h3 className="text-sm font-bold text-[#1a2533]">{factor.name}</h3>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="text-[#1a2533] hover:text-[#1a2533] p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]" aria-label="Close drawer">✕</button>
            </div>
            <div className="p-5 space-y-4 flex-1 text-xs">
              <div>
                <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Result</p>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${resultMeta.bgCls} ${resultMeta.textCls} border ${resultMeta.borderCls}`}><span aria-hidden="true">{resultMeta.icon}</span>{resultMeta.label}</span>
              </div>
              <div>
                <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Observed condition</p>
                <p className="text-[#1a2533]">{factor.condition}</p>
              </div>
              {factor.detail?.values && (
                <div>
                  <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Values</p>
                  <div className="border border-[#d1d9e0] rounded divide-y divide-[#d1d9e0]">
                    {factor.detail.values.map(v => (
                      <div key={v.label} className="flex items-start justify-between px-3 py-2 gap-4">
                        <span className="text-[10px] text-[#374151] shrink-0">{v.label}</span>
                        <span className={`text-[11px] font-medium text-right ${v.match === false ? 'text-amber-700' : v.match === true ? 'text-emerald-700' : 'text-[#1a2533]'}`}>{v.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div><p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Source</p><p className="text-[#1a2533]">{factor.source}</p></div>
                <div><p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Evaluated at</p><p className="text-[#1a2533]">{factor.evaluatedAt}</p></div>
                <div><p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Rule / config</p><p className="font-mono text-[#1a2533]">{factor.rule}</p></div>
              </div>
              {factor.detail?.impact && <div><p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Impact on routing</p><p className="text-[#1a2533]">{factor.detail.impact}</p></div>}
              {factor.detail?.nextReview && <div><p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Next review</p><p className="text-[#1a56db] font-medium">{factor.detail.nextReview}</p></div>}
              <div className="pt-2 border-t border-[#d1d9e0]"><p className="text-[10px] text-[#374151] italic">Configuration-driven condition — not a statutory legal finding. Officer scrutiny determines the regulatory outcome.</p></div>
            </div>
          </div>
        </div>
      )}
      <div className="border border-[#d1d9e0] rounded overflow-hidden">
        <button
          onClick={() => setOpen(e => !e)}
          className="w-full flex items-start justify-between gap-3 px-4 py-3 bg-white hover:bg-[#f8f9fb] transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1a56db]"
          aria-expanded={open}
        >
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-[#1a2533]">{factor.name}</p>
            <p className="text-[10px] text-[#374151] mt-0.5 leading-relaxed">{factor.condition}</p>
            <p className="text-[9px] text-[#6b7280] mt-1">Evaluated {factor.evaluatedAt} · {factor.rule}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${resultMeta.bgCls} ${resultMeta.textCls} border ${resultMeta.borderCls}`}><span aria-hidden="true">{resultMeta.icon}</span>{resultMeta.label}</span>
            <span className="text-[#374151] text-xs">{open ? '▲' : '▼'}</span>
          </div>
        </button>
        {open && (
          <div className="px-4 py-3 border-t border-[#f0f4f8] bg-[#f8f9fb] flex items-center justify-between gap-3">
            <p className="text-[10px] text-[#1a2533]">Source: {factor.source}</p>
            <button onClick={() => setDrawerOpen(true)} className="text-[10px] text-[#1a56db] hover:underline font-semibold">View details</button>
          </div>
        )}
      </div>
    </>
  )
}

export function M10ScrutinyRoutePage({ onBackToOverview, onBackToPrecheck, onOpenDna, onOpenTimeline, onOpenScrutinyWorkbench, onOpenDepView }: { onBackToOverview: () => void; onBackToPrecheck?: () => void; onOpenDna?: () => void; onOpenTimeline?: () => void; onOpenScrutinyWorkbench?: () => void; onOpenDepView?: () => void }) {
  const [routingDrawer, setRoutingDrawer] = useState(false)
  const [officerNote, setOfficerNote] = useState('')

  return (
    <div className="flex-1 bg-[#f8f9fb] overflow-y-auto">
      {/* Routing Logic Drawer */}
      {routingDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Routing logic detail">
          <div className="absolute inset-0 bg-black/30" onClick={() => setRoutingDrawer(false)} />
          <div className="relative bg-white w-full max-w-md h-full overflow-y-auto shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#d1d9e0] bg-[#f8f9fb] shrink-0">
              <div>
                <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold">Routing Logic</p>
                <h3 className="text-sm font-bold text-[#1a2533]">Configured Scrutiny Route Rule</h3>
              </div>
              <button onClick={() => setRoutingDrawer(false)} className="text-[#1a2533] hover:text-[#1a2533] p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]" aria-label="Close drawer">✕</button>
            </div>
            <div className="p-5 space-y-4 text-xs flex-1">
              <div><p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Route produced</p><span className="inline-flex items-center px-2.5 py-1 rounded bg-[#1a3a5c] text-white text-[11px] font-bold">ENHANCED REVIEW</span></div>
              <div>
                <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Conditions evaluated</p>
                <ul className="space-y-1 text-[#1a2533]">
                  {['Service type','Project stage','New construction','Land consistency','Dependency state','Cross-form consistency','Inspection requirement'].map(c => <li key={c} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#9aa5b4] shrink-0" />{c}</li>)}
                </ul>
              </div>
              <div>
                <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Triggered conditions</p>
                <ul className="space-y-1 text-[#1a2533]">
                  {['New construction', 'Land / plot inconsistency', 'Unresolved prerequisite (MPCB)', 'Inspection requirement (conditional)'].map(c => <li key={c} className="flex items-center gap-2"><span className="text-amber-600">⚠</span>{c}</li>)}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Source</p><p className="text-[#1a2533]">Configured workflow rule</p></div>
                <div><p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Rule version</p><p className="text-[#1a2533]">MIDC Scrutiny Config v1.2</p></div>
                <div><p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Evaluated at</p><p className="text-[#1a2533]">23 Sep 2026, 10:42</p></div>
                <div><p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Result</p><p className="font-semibold text-[#1a3a5c]">Enhanced Review</p></div>
              </div>
              <div className="pt-2 border-t border-[#d1d9e0]"><p className="text-[10px] text-[#374151] italic">System-applied configured routing rule. This is not an AI decision or a statutory legal finding. Route determines scrutiny depth only.</p></div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-5">

        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'Department Home', onClick: onBackToOverview },
          { label: 'Applications', onClick: onBackToOverview },
          { label: 'Application Overview', onClick: onBackToOverview },
          { label: 'Automated Pre-check', onClick: onBackToPrecheck },
          { label: 'Scrutiny Route' },
        ]} />

        {/* Page header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-[#1a2533]">Scrutiny Route / Explainability</h1>
            <p className="text-sm text-[#1a2533] mt-0.5">How this application was routed for scrutiny and why.</p>
          </div>
          <button onClick={onBackToPrecheck} className="text-xs text-[#1a56db] hover:underline shrink-0">← Automated Pre-check</button>
        </div>

        {/* Application context */}
        <div className="bg-white border border-[#d1d9e0] rounded p-4">
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-4">
            {[
              ['Application ID', M10_APP.id],
              ['Business / Project', M10_APP.business],
              ['MIDC Service', M10_APP.service],
              ['Current state', M10_APP.state],
              ['Current desk', M10_APP.desk],
              ['Office / Region', M10_APP.office],
              ['SLA state', M10_APP.sla],
              ['Scrutiny route', M10_APP.route],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold">{k}</p>
                <p className={`text-xs font-semibold mt-0.5 ${k === 'Scrutiny route' ? 'text-[#1a3a5c]' : k === 'SLA state' ? 'text-amber-700' : 'text-[#1a2533]'}`}>{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Route summary */}
        <div className="bg-[#1a3a5c] rounded overflow-hidden">
          <div className="px-5 py-4">
            <p className="text-[10px] text-[#8fafd0] uppercase tracking-wider font-semibold mb-1">Scrutiny Route</p>
            <h2 className="text-2xl font-bold text-white tracking-wide">ENHANCED REVIEW</h2>
            <p className="text-sm text-[#8fafd0] mt-1">Configured scrutiny factors detected from the application record and configured routing rules.</p>
          </div>
          <div className="grid grid-cols-3 divide-x divide-[#2d5080] bg-[#0f2540]">
            {[
              ['Review depth', 'Enhanced'],
              ['Inspection', 'Conditional'],
              ['Routing basis', 'Configured Scrutiny Factors'],
            ].map(([k, v]) => (
              <div key={k} className="px-5 py-3">
                <p className="text-[9px] text-[#8fafd0] uppercase tracking-wider font-semibold">{k}</p>
                <p className="text-sm font-semibold text-white mt-0.5">{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Info panel */}
        <div className="bg-[#ebf3ff] border border-[#bdd4f5] rounded px-4 py-3 flex gap-3">
          <span className="text-[#1a56db] text-sm shrink-0 mt-0.5" aria-hidden="true">ℹ</span>
          <p className="text-xs text-[#1a3a5c]">Scrutiny route determines how deeply the application is reviewed. It does not automatically approve or reject the application. The assigned route reflects configured workflow conditions — not a legal or statutory decision.</p>
        </div>

        {/* Configured Scrutiny Factors */}
        <div>
          <div className="mb-3">
            <h2 className="text-sm font-bold text-[#1a2533] uppercase tracking-wider">Configured Scrutiny Factors</h2>
            <p className="text-[11px] text-[#374151] mt-0.5">These factors are configuration-driven conditions used to determine the scrutiny route. They are not independent legal findings.</p>
          </div>
          <div className="space-y-2">
            {SCRUTINY_FACTORS.map(factor => <ScrutinyFactorRow key={factor.id} factor={factor} />)}
          </div>
        </div>

        {/* Why this route */}
        <div className="bg-white border border-[#d1d9e0] rounded p-4">
          <h2 className="text-xs font-bold text-[#1a2533] uppercase tracking-wider mb-2">Why This Route?</h2>
          <p className="text-xs text-[#1a2533] leading-relaxed">Enhanced Review was selected because the application matches configured scrutiny conditions involving new construction, a land/plot consistency issue and a pending prerequisite (MPCB). An inspection requirement is also configured for this service. This is a system-applied configured routing rule, not an AI decision.</p>
          <div className="mt-3 pt-3 border-t border-[#f0f4f8] flex items-center justify-between">
            <p className="text-[10px] text-[#374151]">Rule: MIDC Scrutiny Config v1.2 · Evaluated: 23 Sep 2026, 10:42</p>
            <button onClick={() => setRoutingDrawer(true)} className="text-xs text-[#1a56db] hover:underline font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]">View routing logic</button>
          </div>
        </div>

        {/* Route definitions */}
        <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
          <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#d1d9e0]">
            <h2 className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Configurable Route Types</h2>
          </div>
          <div className="divide-y divide-[#94a3b8]">
            {[
              { route:'Standard Review', depth:'Standard', inspection:'According to configured service requirements', active:false },
              { route:'Enhanced Review', depth:'Enhanced', inspection:'Conditional / according to configured requirements', active:true },
              { route:'Inspection-heavy Route', depth:'Inspection-heavy', inspection:'Required / according to configured requirement', active:false },
            ].map(r => (
              <div key={r.route} className={`flex items-start gap-4 px-4 py-3 ${r.active ? 'bg-[#ebf3ff]' : ''}`}>
                <div className="flex-1">
                  <p className={`text-xs font-semibold ${r.active ? 'text-[#1a3a5c]' : 'text-[#1a2533]'}`}>{r.route}{r.active && <span className="ml-2 text-[9px] font-bold text-white bg-[#1a3a5c] px-1.5 py-0.5 rounded">CURRENT</span>}</p>
                  <div className="flex gap-6 mt-1">
                    <span className="text-[10px] text-[#374151]">Review depth: <strong className="text-[#1a2533]">{r.depth}</strong></span>
                    <span className="text-[10px] text-[#374151]">Inspection: <strong className="text-[#1a2533]">{r.inspection}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inspection requirement */}
        <div className="bg-white border border-[#d1d9e0] rounded p-4">
          <h2 className="text-xs font-bold text-[#1a2533] uppercase tracking-wider mb-3">Inspection Requirement</h2>
          <div className="flex items-start gap-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">○ Conditional</span>
            <div>
              <p className="text-xs text-[#1a2533]">Inspection may be required according to the configured service workflow.</p>
              <p className="text-[10px] text-[#374151] mt-1">Reason: Inspection condition configured for this service and project context. Whether inspection proceeds depends on officer assessment during scrutiny.</p>
            </div>
          </div>
        </div>

        {/* Related context */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* M09 upstream */}
          <div className="bg-white border border-[#d1d9e0] rounded p-4">
            <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Previous System Check</p>
            <p className="text-xs font-semibold text-[#1a2533] mb-2">Automated Pre-check · M09</p>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between"><span className="text-[#374151]">✓ Machine-verified</span><strong className="text-emerald-700">18</strong></div>
              <div className="flex justify-between"><span className="text-[#374151]">⚠ Warnings</span><strong className="text-amber-700">5</strong></div>
              <div className="flex justify-between"><span className="text-[#374151]">○ Needs officer judgment</span><strong className="text-[#1a2533]">1</strong></div>
            </div>
            <button onClick={onBackToPrecheck} className="mt-3 text-[10px] text-[#1a56db] hover:underline font-semibold">View Automated Pre-check</button>
          </div>

          {/* Business DNA context */}
          <div className="bg-white border border-[#d1d9e0] rounded p-4">
            <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Business DNA Context</p>
            <div className="space-y-1.5">
              {[['Project type','Manufacturing'],['Project stage','New Construction'],['MIDC involvement','YES'],['MIDC estate','Sample Industrial Estate'],['Plot','P-104']].map(([k,v]) => (
                <div key={k} className="flex justify-between gap-2 text-[11px]">
                  <span className="text-[#374151]">{k}</span>
                  <span className="font-medium text-[#1a2533] text-right">{v}</span>
                </div>
              ))}
            </div>
            <button onClick={onOpenDna} className="mt-3 text-[10px] text-[#1a56db] hover:underline font-semibold">View Business DNA → M07</button>
          </div>

          {/* Cross-form consistency */}
          <div className="bg-white border border-[#d1d9e0] rounded p-4">
            <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Cross-form Consistency</p>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">⚠ Warning</span>
              <span className="text-xs text-[#1a2533]">Mismatch detected</span>
            </div>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between"><span className="text-[#374151]">Master Project Dossier</span><span className="font-medium text-emerald-700">4,800 m²</span></div>
              <div className="flex justify-between"><span className="text-[#374151]">MIDC Application</span><span className="font-medium text-amber-700">4,200 m²</span></div>
            </div>
            <p className="text-[10px] text-[#374151] mt-2 italic">Officer investigates in M16. M10 identifies the routing condition only.</p>
            <button className="mt-2 text-[10px] text-[#374151] cursor-default">Investigate → M16 (coming)</button>
          </div>

          {/* Dependencies */}
          <div className="bg-white border border-[#d1d9e0] rounded p-4">
            <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Dependency Context</p>
            <div className="space-y-2">
              {[{ dep:'MPCB — Consent to Establish', status:'Pending', authority:'MPCB' }, { dep:'Fire Authority — NOC', status:'Pending', authority:'Fire Authority' }].map(d => (
                <div key={d.dep} className="flex items-start justify-between gap-2 text-[11px]">
                  <div>
                    <p className="font-medium text-[#1a2533]">{d.dep}</p>
                    <p className="text-[#374151]">{d.authority}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 shrink-0">⚠ {d.status}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-[#374151] mt-2 italic">MIDC cannot approve or modify another department's decision.</p>
            <button onClick={onOpenDepView} className="mt-2 text-[10px] text-[#1a56db] hover:underline font-semibold">View Dependency Graph → M17</button>
          </div>
        </div>

        {/* Change detected */}
        <div className="bg-white border border-[#d1d9e0] rounded p-4">
          <div className="flex items-center gap-2 mb-3">
            <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold">Change Detected</p>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">⚠ Warning</span>
          </div>
          <div className="space-y-2 text-[11px]">
            {[['Investment','₹40 Cr','₹42 Cr'],['Capacity','500 MT/yr','550 MT/yr']].map(([field, prev, curr]) => (
              <div key={field} className="flex items-center justify-between gap-4 py-1 border-b border-[#f0f4f8]">
                <span className="text-[#1a2533] font-medium">{field}</span>
                <span className="text-[#374151]">{prev} → <strong className="text-amber-700">{curr}</strong></span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-2 pt-2">
            <p className="text-[10px] text-[#374151]">Changed: 18 Sep 2026 · Routing effect: Configured scrutiny factor triggered</p>
            <button className="text-[10px] text-[#374151] cursor-default">View Delta Re-scrutiny → M20 (coming)</button>
          </div>
        </div>

        {/* Officer review note */}
        <div className="bg-white border border-[#d1d9e0] rounded p-4">
          <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Officer Review Note</p>
          <p className="text-[10px] text-[#6b7280] mb-2 italic">Officer-entered observation — not a system finding</p>
          <textarea
            value={officerNote}
            onChange={e => setOfficerNote(e.target.value)}
            rows={3}
            placeholder="Record any observation about the assigned scrutiny route or factors."
            className="w-full text-xs text-[#1a2533] border border-[#d1d9e0] rounded px-3 py-2 bg-[#f8f9fb] placeholder-[#b0bcc9] resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db] focus:border-[#1a56db]"
          />
        </div>

        {/* Audit notice */}
        <div className="text-[10px] text-[#374151] flex items-center gap-2">
          <span aria-hidden="true">📋</span>
          Route evaluation recorded in audit history. Route version: MIDC Scrutiny Config v1.2 · Evaluated: 23 Sep 2026, 10:42 · Previous route: Standard Review (updated after resubmission).
        </div>

        {/* Secondary actions + primary CTA */}
        <div className="bg-white border border-[#d1d9e0] rounded p-4 space-y-4">
          <div>
            <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Related Workspaces</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={onBackToPrecheck} className="px-3 py-1.5 text-xs border border-[#d1d9e0] rounded text-[#1a2533] hover:bg-[#f8f9fb] transition-colors">View Automated Pre-check → M09</button>
              <button onClick={onOpenDna} className="px-3 py-1.5 text-xs border border-[#d1d9e0] rounded text-[#1a2533] hover:bg-[#f8f9fb] transition-colors">View Business DNA → M07</button>
              <button onClick={onOpenTimeline} className="px-3 py-1.5 text-xs border border-[#d1d9e0] rounded text-[#1a2533] hover:bg-[#f8f9fb] transition-colors">View Timeline → M08</button>
              <button className="px-3 py-1.5 text-xs border border-[#d1d9e0] rounded text-[#374151] cursor-default">View Consistency → M16</button>
              <button className="px-3 py-1.5 text-xs border border-[#d1d9e0] rounded text-[#374151] cursor-default">View Dependencies → M17</button>
              <button className="px-3 py-1.5 text-xs border border-[#d1d9e0] rounded text-[#374151] cursor-default">View Delta Changes → M20</button>
            </div>
          </div>
          <div className="pt-3 border-t border-[#f0f4f8] flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[#1a2533]">Ready to proceed to scrutiny.</p>
              <p className="text-[11px] text-[#374151] mt-0.5">Route: Enhanced Review · No approval or rejection at this stage.</p>
            </div>
            <button onClick={onOpenScrutinyWorkbench} className="px-4 py-2 bg-[#1a3a5c] text-white text-xs font-bold rounded hover:bg-[#0f2540] transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]">
              Proceed to Scrutiny → M11
            </button>
          </div>
        </div>

        <p className="text-[10px] text-[#374151] italic">All values are fictional prototype data and do not represent actual MIDC records, legal thresholds, or official processing requirements.</p>

      </div>
    </div>
  )
}

// ─── M11 Scrutiny Workbench ───────────────────────────────────────────────────



const OFFICER_REVIEW_META: Record<OfficerReviewState, { label: string; textCls: string; bgCls: string; borderCls: string }> = {
  'not-reviewed':       { label: 'Not reviewed',       textCls: 'text-[#374151]',  bgCls: 'bg-[#f8f9fb]', borderCls: 'border-[#d1d9e0]' },
  'valid':              { label: 'Valid',               textCls: 'text-emerald-700', bgCls: 'bg-emerald-50', borderCls: 'border-emerald-200' },
  'query':              { label: 'Query',               textCls: 'text-amber-700',   bgCls: 'bg-amber-50',   borderCls: 'border-amber-200' },
  'invalid':            { label: 'Invalid',             textCls: 'text-red-700',     bgCls: 'bg-red-50',     borderCls: 'border-red-200' },
  'needs-verification': { label: 'Needs Verification',  textCls: 'text-[#4a5568]',   bgCls: 'bg-[#f8f9fb]', borderCls: 'border-[#d1d9e0]' },
}

const SECTION_STATUS_META: Record<ScrutinySection['status'], { dot: string; label: string }> = {
  'not-reviewed':       { dot: 'bg-[#d1d9e0]',  label: 'Not reviewed' },
  'in-review':          { dot: 'bg-[#1a56db]',  label: 'In review' },
  'reviewed':           { dot: 'bg-emerald-500', label: 'Reviewed' },
  'query':              { dot: 'bg-amber-400',   label: 'Query' },
  'needs-verification': { dot: 'bg-[#9aa5b4]',  label: 'Needs Verification' },
}

const M11_SECTIONS: ScrutinySection[] = [
  {
    id: 'overview', label: 'Application Overview', status: 'reviewed', params: [],
  },
  {
    id: 'biz', label: 'Business / Project Context', status: 'reviewed', params: [],
  },
  {
    id: 'land', label: 'Land / Plot', status: 'in-review',
    params: [
      {
        id: 'estate', group: 'MIDC Estate', name: 'MIDC Estate', value: 'Sample Industrial Estate',
        source: 'Master Project Dossier', verifyState: 'SYSTEM_VERIFIED',
        appValue: 'Sample Industrial Estate', prevValue: 'Sample Industrial Estate', prevChanged: false,
        crossForm: [{ label: 'MIDC Application', value: 'Sample Industrial Estate', match: true }],
        document: { name: 'MIDC Estate Notification', status: 'DEPARTMENT_VERIFIED', version: 'v1', source: 'Verified Document Repository' },
        dependency: 'No direct dependency impact identified.',
        reviewState: 'valid',
      },
      {
        id: 'plotno', group: 'Plot Identification', name: 'Plot Number', value: 'P-104',
        source: 'Master Project Dossier', verifyState: 'SYSTEM_VERIFIED',
        appValue: 'P-104', prevValue: 'P-104', prevChanged: false,
        crossForm: [{ label: 'MIDC Application', value: 'P-104', match: true }],
        document: { name: 'Land / Plot Allotment Record', status: 'DEPARTMENT_VERIFIED', version: 'v2', source: 'Verified Document Repository' },
        dependency: 'No direct dependency impact identified.',
        reviewState: 'valid',
      },
      {
        id: 'plotarea', group: 'Plot Identification', name: 'Plot Area', value: '4,800 m²',
        source: 'Master Project Dossier', verifyState: 'SYSTEM_VERIFIED',
        appValue: '4,800 m²', prevValue: '4,800 m²', prevChanged: false,
        crossForm: [
          { label: 'MIDC Application', value: '4,800 m²', match: true },
          { label: 'Building application', value: '4,800 m²', match: true },
          { label: 'MPCB application', value: '4,800 m²', match: true },
        ],
        document: { name: 'Land / Plot Allotment Record', status: 'DEPARTMENT_VERIFIED', version: 'v2', source: 'Verified Document Repository' },
        dependency: 'No direct dependency impact identified.',
        reviewState: 'needs-verification',
        reviewNote: 'Officer must confirm that the submitted plot evidence corresponds to the current project record.',
      },
    ],
  },
  {
    id: 'allotment', label: 'Allotment / Possession', status: 'not-reviewed',
    params: [
      {
        id: 'allot', group: 'Allotment / Possession', name: 'Allotment Status', value: 'Confirmed in system record',
        source: 'MIDC allotment record', verifyState: 'DEPARTMENT_VERIFIED',
        appValue: 'Confirmed', prevValue: 'Confirmed', prevChanged: false,
        document: { name: 'MIDC Allotment Letter', status: 'DEPARTMENT_VERIFIED', version: 'v1', source: 'Verified Document Repository' },
        dependency: 'No direct dependency impact identified.',
        reviewState: 'not-reviewed',
      },
      {
        id: 'poss', group: 'Allotment / Possession', name: 'Possession Status', value: 'Recorded',
        source: 'MIDC allotment record', verifyState: 'USER_CONFIRMED',
        appValue: 'Recorded', prevValue: 'Recorded', prevChanged: false,
        dependency: 'No direct dependency impact identified.',
        reviewState: 'not-reviewed',
      },
    ],
  },
  {
    id: 'project', label: 'Project Stage', status: 'not-reviewed',
    params: [
      {
        id: 'projtype', group: 'Project Context', name: 'Project Type', value: 'New Industrial Project',
        source: 'Business DNA', verifyState: 'USER_CONFIRMED',
        appValue: 'New Industrial Project', prevValue: 'New Industrial Project', prevChanged: false,
        reviewState: 'not-reviewed',
      },
      {
        id: 'projstage', group: 'Project Context', name: 'Project Stage', value: 'New Construction',
        source: 'Business DNA', verifyState: 'USER_CONFIRMED',
        appValue: 'New Construction', prevValue: 'New Construction', prevChanged: false,
        reviewState: 'not-reviewed',
      },
      {
        id: 'activity', group: 'Project Context', name: 'Proposed Industry / Activity', value: 'Precision Components Manufacturing',
        source: 'Business DNA', verifyState: 'USER_CONFIRMED',
        appValue: 'Precision Components Manufacturing', prevValue: 'Precision Components Manufacturing', prevChanged: false,
        reviewState: 'not-reviewed',
      },
    ],
  },
  { id: 'industry', label: 'Industry / Activity', status: 'not-reviewed', params: [] },
  { id: 'docs', label: 'Documents', status: 'not-reviewed', params: [] },
  { id: 'approvals', label: 'Existing Approvals', status: 'not-reviewed', params: [] },
  { id: 'consistency', label: 'Cross-form Consistency', status: 'not-reviewed', params: [] },
  { id: 'deps', label: 'Dependencies', status: 'not-reviewed', params: [] },
  { id: 'prev', label: 'Previous Submission', status: 'not-reviewed', params: [] },
  { id: 'findings', label: 'Officer Findings', status: 'not-reviewed', params: [] },
]

export function M11ScrutinyWorkbenchPage({ onBack, onBackToOverview, onOpenDna, onOpenTimeline, onOpenParamDetail, onOpenDocReview, onOpenBldgScrutiny, onOpenWaterScrutiny, onOpenDepView, onOpenQueryBuilder }: {
  onBack: () => void; onBackToOverview: () => void; onOpenDna?: () => void; onOpenTimeline?: () => void; onOpenParamDetail?: () => void; onOpenDocReview?: () => void; onOpenBldgScrutiny?: () => void; onOpenWaterScrutiny?: () => void; onOpenDepView?: () => void; onOpenQueryBuilder?: () => void
}) {
  const [activeSectionId, setActiveSectionId] = useState('land')
  const [activeParamId, setActiveParamId] = useState('plotarea')
  const [reviewStates, setReviewStates] = useState<Record<string, OfficerReviewState>>(() => {
    const m: Record<string, OfficerReviewState> = {}
    M11_SECTIONS.forEach(s => s.params.forEach(p => { m[p.id] = p.reviewState }))
    return m
  })
  const [officerNote, setOfficerNote] = useState<Record<string, string>>({ plotarea: 'Officer must confirm that the submitted plot evidence corresponds to the current project record.' })
  const [queryModal, setQueryModal] = useState(false)
  const [querySaved, setQuerySaved] = useState(false)
  const [invalidReason, setInvalidReason] = useState<Record<string, string>>({})

  const activeSection = M11_SECTIONS.find(s => s.id === activeSectionId)!
  const allParams = M11_SECTIONS.flatMap(s => s.params)
  const activeParam = allParams.find(p => p.id === activeParamId) ?? M11_SECTIONS.find(s => s.id === 'land')!.params[2]

  const reviewed    = Object.values(reviewStates).filter(v => v === 'valid').length
  const queryCount  = Object.values(reviewStates).filter(v => v === 'query').length
  const needsVerif  = Object.values(reviewStates).filter(v => v === 'needs-verification').length
  const invalidCount = Object.values(reviewStates).filter(v => v === 'invalid').length
  const totalParams = allParams.length

  const setReview = (id: string, state: OfficerReviewState) =>
    setReviewStates(prev => ({ ...prev, [id]: state }))

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#f8f9fb]">
      {/* Query modal */}
      {queryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Raise Query">
          <div className="absolute inset-0 bg-black/40" onClick={() => setQueryModal(false)} />
          <div className="relative bg-white rounded shadow-xl w-full max-w-lg p-6 space-y-4 z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#1a2533]">Raise Query</h3>
              <button onClick={() => setQueryModal(false)} className="text-[#374151] hover:text-[#1a2533] text-lg leading-none" aria-label="Close">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div><p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Parameter</p><p className="font-semibold text-[#1a2533]">{activeParam.name}</p></div>
              <div><p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Current value</p><p className="font-semibold text-[#1a2533]">{activeParam.value}</p></div>
              <div><p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Evidence</p><p className="text-[#1a2533]">{activeParam.document?.name ?? 'Current MIDC application'}</p></div>
              <div><p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Application</p><p className="text-[#1a2533]">MIDC-APP-2026-00418</p></div>
            </div>
            <div>
              <label className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold block mb-1">Issue</label>
              <input defaultValue={`${activeParam.name} requires clarification`} className="w-full text-xs border border-[#d1d9e0] rounded px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]" />
            </div>
            <div>
              <label className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold block mb-1">Required response</label>
              <input defaultValue={`Clarify ${activeParam.name.toLowerCase()} and provide supporting evidence`} className="w-full text-xs border border-[#d1d9e0] rounded px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]" />
            </div>
            <div>
              <label className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold block mb-1">Officer comment</label>
              <textarea rows={3} placeholder="Add observation..." className="w-full text-xs border border-[#d1d9e0] rounded px-3 py-2 resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]" />
            </div>
            <div className="flex gap-2 pt-1">
              <button onClick={() => { setReview(activeParam.id, 'query'); setQueryModal(false); setQuerySaved(true); setTimeout(() => setQuerySaved(false), 3000) }}
                className="px-4 py-2 bg-[#1a3a5c] text-white text-xs font-bold rounded hover:bg-[#0f2540] transition-colors">Add to Consolidated Query → M18</button>
              <button onClick={() => setQueryModal(false)} className="px-3 py-2 text-xs border border-[#d1d9e0] rounded text-[#1a2533] hover:bg-[#f8f9fb]">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Page header strip */}
      <div className="bg-white border-b border-[#d1d9e0] px-5 py-3 shrink-0">
        <Breadcrumb items={[
          { label: 'Department Home', onClick: onBackToOverview },
          { label: 'Applications', onClick: onBackToOverview },
          { label: 'Application Overview', onClick: onBackToOverview },
          { label: 'Scrutiny', onClick: onBack },
          { label: 'Land / Plot' },
        ]} />
        <div className="flex items-start justify-between gap-4 mt-2">
          <div>
            <h1 className="text-base font-bold text-[#1a2533]">Land / Plot — Scrutiny Workbench</h1>
            <p className="text-[11px] text-[#374151] mt-0.5">Service-specific scrutiny for MIDC-APP-2026-00418 · Enhanced Review</p>
          </div>
          <button onClick={onBack} className="text-xs text-[#1a56db] hover:underline shrink-0">← Scrutiny Route</button>
        </div>
        {/* App context row */}
        <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-[10px]">
          {[['Application', 'MIDC-APP-2026-00418'], ['Business', 'Aster Precision Components Pvt. Ltd.'], ['Service', 'Land / Plot'], ['State', 'INITIAL_SCRUTINY'], ['Route', 'ENHANCED REVIEW'], ['SLA', 'Approaching']].map(([k, v]) => (
            <span key={k} className="text-[#374151]">{k}: <strong className={`${k === 'Route' ? 'text-[#1a3a5c]' : k === 'SLA' ? 'text-amber-700' : 'text-[#1a2533]'}`}>{v}</strong></span>
          ))}
        </div>
      </div>

      {/* Scrutiny summary bar */}
      <div className="bg-[#0f2540] px-5 py-2 flex items-center gap-6 shrink-0 text-[10px]">
        <span className="text-[#8fafd0] font-semibold uppercase tracking-wider">Scrutiny Summary</span>
        {[['Params reviewed', totalParams], ['✓ Valid', reviewed], ['⚠ Query', queryCount], ['○ Needs Verification', needsVerif], ['✗ Invalid', invalidCount]].map(([k, v]) => (
          <span key={String(k)} className="text-white"><span className="text-[#8fafd0]">{k}: </span><strong>{v}</strong></span>
        ))}
        {querySaved && <span className="ml-auto text-emerald-400 font-semibold">Query saved to M18 ✓</span>}
        <div className="ml-auto flex gap-4 shrink-0">
          <button onClick={onOpenBldgScrutiny} className="text-[10px] text-[#8fafd0] hover:text-white underline">Also reviewing: Building / Planning → M14</button>
          <button onClick={onOpenWaterScrutiny} className="text-[10px] text-[#8fafd0] hover:text-white underline">Also reviewing: Water / Utility → M15</button>
          <button onClick={onOpenQueryBuilder} className="text-[10px] text-[#8fafd0] hover:text-white underline">Query Builder → M18</button>
        </div>
      </div>

      {/* Three-column layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT — section navigation */}
        <nav className="w-52 shrink-0 bg-white border-r border-[#d1d9e0] overflow-y-auto flex flex-col" aria-label="Application scrutiny sections">
          <div className="px-3 py-2.5 border-b border-[#d1d9e0]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-bold">Application Scrutiny</p>
          </div>
          <div className="flex-1 py-1">
            {M11_SECTIONS.map((sec, i) => {
              const sm = SECTION_STATUS_META[sec.status as keyof typeof SECTION_STATUS_META]
              const active = activeSectionId === sec.id
              return (
                <button key={sec.id}
                  onClick={() => { setActiveSectionId(sec.id); if (sec.params.length > 0) setActiveParamId(sec.params[0].id) }}
                  className={`w-full text-left flex items-center gap-2 px-3 py-2 text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1a56db] ${active ? 'bg-[#ebf3ff] text-[#1a3a5c] font-semibold' : 'text-[#1a2533] hover:bg-[#f8f9fb]'}`}
                  aria-current={active ? 'page' : undefined}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${sm.dot}`} aria-hidden="true" title={sm.label} />
                  <span className="text-[10px] text-[#6b7280] shrink-0 w-4 text-right">{i + 1}.</span>
                  <span className="truncate">{sec.label}</span>
                </button>
              )
            })}
          </div>
          {/* Legend */}
          <div className="px-3 py-3 border-t border-[#d1d9e0] space-y-1">
            {Object.entries(SECTION_STATUS_META).map(([k, v]) => (
              <div key={k} className="flex items-center gap-1.5 text-[9px] text-[#374151]">
                <span className={`w-1.5 h-1.5 rounded-full ${v.dot}`} />
                {v.label}
              </div>
            ))}
          </div>
        </nav>

        {/* CENTER — parameter review panel */}
        <main id="main-content" className="flex-1 overflow-y-auto bg-[#f8f9fb]" tabIndex={-1}>
          {activeSection.params.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-20 text-center">
              <p className="text-sm font-semibold text-[#1a2533]">{activeSection.label}</p>
              <p className="text-xs text-[#374151] mt-1">This section's parameters will be configured in a future phase.</p>
            </div>
          ) : (
            <div className="p-5 space-y-4">
              {/* Section header + param picker */}
              <div>
                <p className="text-[10px] text-[#374151] uppercase tracking-wider font-bold mb-1">Land / Plot</p>
                <div className="flex flex-wrap gap-2">
                  {activeSection.params.map(p => {
                    const rs = reviewStates[p.id] ?? 'not-reviewed'
                    const rm = OFFICER_REVIEW_META[rs]
                    return (
                      <button key={p.id}
                        onClick={() => setActiveParamId(p.id)}
                        className={`px-3 py-1.5 rounded text-xs font-semibold border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db] ${activeParamId === p.id ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : `${rm.bgCls} ${rm.textCls} ${rm.borderCls} hover:opacity-80`}`}
                      >{p.name}</button>
                    )
                  })}
                </div>
              </div>

              {/* Parameter review card */}
              {(() => {
                const param = activeSection.params.find(p => p.id === activeParamId) ?? activeSection.params[0]
                const rs = reviewStates[param.id] ?? 'not-reviewed'
                const rm = OFFICER_REVIEW_META[rs]
                const note = officerNote[param.id] ?? ''
                const invReason = invalidReason[param.id] ?? ''
                return (
                  <div className="space-y-3">
                    {/* Value hero */}
                    <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
                      <div className="px-5 py-4 border-b border-[#f0f4f8]">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold">{param.group}</p>
                            <h2 className="text-lg font-bold text-[#1a2533] mt-0.5">{param.name}</h2>
                            <p className="text-3xl font-bold text-[#1a3a5c] mt-1">{param.value}</p>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold border ${rm.bgCls} ${rm.textCls} ${rm.borderCls}`}>{rm.label}</span>
                        </div>
                      </div>
                      {/* Source + verification row */}
                      <div className="grid grid-cols-2 divide-x divide-[#94a3b8] border-b border-[#f0f4f8]">
                        <div className="px-4 py-3">
                          <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-0.5">Source</p>
                          <p className="text-xs font-semibold text-[#1a2533]">{param.source}</p>
                        </div>
                        <div className="px-4 py-3">
                          <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-0.5">Verification</p>
                          <p className="text-xs font-semibold text-[#1a2533]">{param.verifyState.replace(/_/g, ' ')}</p>
                        </div>
                      </div>
                      {/* App value + prev value */}
                      <div className="grid grid-cols-2 divide-x divide-[#94a3b8]">
                        <div className="px-4 py-3">
                          <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-0.5">Current application</p>
                          <p className="text-xs text-[#1a2533] font-medium">{param.appValue ?? '—'}</p>
                        </div>
                        <div className="px-4 py-3">
                          <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-0.5">Previous submission</p>
                          <p className={`text-xs font-medium ${param.prevChanged ? 'text-amber-700' : 'text-[#1a2533]'}`}>{param.prevValue ?? 'No previous value'}{param.prevChanged && ' ⚠ Changed'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Cross-form values */}
                    {param.crossForm && param.crossForm.length > 0 && (
                      <div className="bg-white border border-[#d1d9e0] rounded p-4">
                        <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Cross-form Values</p>
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-[#374151]">Master Project Dossier</span>
                            <span className="font-semibold text-emerald-700">{param.value}</span>
                          </div>
                          {param.crossForm.map(cf => (
                            <div key={cf.label} className="flex items-center justify-between text-[11px]">
                              <span className="text-[#374151]">{cf.label}</span>
                              <span className={`font-semibold ${cf.match ? 'text-emerald-700' : 'text-amber-700'}`}>{cf.value}{!cf.match && ' ⚠'}</span>
                            </div>
                          ))}
                        </div>
                        {param.crossForm.some(c => !c.match) ? (
                          <button className="mt-2 text-[10px] text-[#1a56db] hover:underline font-semibold">Investigate in Cross-form Consistency → M16</button>
                        ) : (
                          <p className="mt-2 text-[10px] text-emerald-700 font-semibold">✓ Consistent across all sources</p>
                        )}
                      </div>
                    )}

                    {/* Supporting document */}
                    {param.document && (
                      <div className="bg-white border border-[#d1d9e0] rounded p-4">
                        <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Supporting Document</p>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-semibold text-[#1a2533]">{param.document.name}</p>
                            <p className="text-[10px] text-[#374151] mt-0.5">{param.document.status.replace(/_/g, ' ')} · {param.document.version} · {param.document.source}</p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button className="text-[10px] text-[#1a56db] hover:underline font-semibold">Preview</button>
                            <button onClick={onOpenDocReview} className="text-[10px] text-[#1a56db] hover:underline font-semibold">Open Document Review → M13</button>
                          </div>
                        </div>
                        <p className="text-[10px] text-[#374151] mt-2 italic">Previously verified — reused from Business Document Repository. Do not overwrite master document.</p>
                      </div>
                    )}

                    {/* Dependency impact */}
                    <div className="bg-white border border-[#d1d9e0] rounded p-4">
                      <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Dependency Impact</p>
                      <p className="text-xs text-[#1a2533]">{param.dependency ?? 'No configured dependency associated with this parameter.'}</p>
                    </div>

                    {/* Officer review state selector */}
                    <div className="bg-white border border-[#d1d9e0] rounded p-4 space-y-3">
                      <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold">Officer Review State</p>
                      <p className="text-[10px] text-[#6b7280] italic">Officer scrutiny state — separate from source verification state.</p>
                      <div className="flex flex-wrap gap-2">
                        {(['valid', 'needs-verification', 'query', 'invalid'] as OfficerReviewState[]).map(state => {
                          const m = OFFICER_REVIEW_META[state]
                          const active = rs === state
                          return (
                            <button key={state}
                              onClick={() => { if (state === 'query') { setQueryModal(true) } else { setReview(param.id, state) } }}
                              className={`px-3 py-1.5 rounded text-[11px] font-semibold border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db] ${active ? `${m.bgCls} ${m.textCls} ${m.borderCls} ring-1 ring-current` : 'bg-white text-[#1a2533] border-[#d1d9e0] hover:bg-[#f8f9fb]'}`}
                            >{m.label}</button>
                          )
                        })}
                      </div>

                      {/* Invalid reason */}
                      {rs === 'invalid' && (
                        <div>
                          <label className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold block mb-1">Reason (required)</label>
                          <input value={invReason} onChange={e => setInvalidReason(prev => ({ ...prev, [param.id]: e.target.value }))}
                            placeholder="State why this parameter is invalid..."
                            className="w-full text-xs border border-red-200 rounded px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400" />
                          <p className="text-[9px] text-[#374151] mt-1 italic">Invalid state does not automatically determine application outcome. Final decision belongs to M25/M26.</p>
                        </div>
                      )}

                      {/* Officer note */}
                      <div>
                        <label className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold block mb-1">Officer Observation</label>
                        <textarea rows={2} value={note}
                          onChange={e => setOfficerNote(prev => ({ ...prev, [param.id]: e.target.value }))}
                          placeholder="Record an observation about this parameter or evidence."
                          className="w-full text-xs border border-[#d1d9e0] rounded px-3 py-2 resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db] bg-[#f8f9fb] placeholder-[#b0bcc9]" />
                        <p className="text-[9px] text-[#6b7280] mt-0.5 italic">Officer-entered observation · 23 Sep 2026</p>
                      </div>

                      {/* Action bar */}
                      <div className="flex flex-wrap gap-2 pt-1 border-t border-[#f0f4f8]">
                        <button onClick={onOpenParamDetail} className="px-3 py-1.5 text-xs border border-[#1a56db] text-[#1a56db] rounded hover:bg-[#ebf3ff] transition-colors font-semibold">View Parameter Details → M12</button>
                        <button onClick={() => setReview(param.id, rs)}
                          className="px-3 py-1.5 bg-[#1a3a5c] text-white text-xs font-bold rounded hover:bg-[#0f2540] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]">Save Review</button>
                        <button className="px-3 py-1.5 text-xs border border-[#d1d9e0] rounded text-[#1a2533] hover:bg-[#f8f9fb]">Flag</button>
                        <button onClick={() => setQueryModal(true)} className="px-3 py-1.5 text-xs border border-amber-200 rounded text-amber-700 bg-amber-50 hover:bg-amber-100 font-semibold">Raise Query</button>
                        <button onClick={() => setReview(param.id, 'valid')} className="px-3 py-1.5 text-xs border border-emerald-200 rounded text-emerald-700 bg-emerald-50 hover:bg-emerald-100 font-semibold">Mark Valid</button>
                        <button className="px-3 py-1.5 text-xs border border-[#d1d9e0] rounded text-[#1a2533] hover:bg-[#f8f9fb]">Request Evidence</button>
                        <button className="px-3 py-1.5 text-xs border border-[#d1d9e0] rounded text-[#1a56db] hover:bg-[#ebf3ff]">Open Regulatory Reference</button>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>
          )}
        </main>

        {/* RIGHT — regulatory / source / notes */}
        <aside className="w-64 shrink-0 bg-white border-l border-[#d1d9e0] overflow-y-auto flex flex-col" aria-label="Regulatory and source context">
          <div className="px-4 py-2.5 border-b border-[#d1d9e0] bg-[#f8f9fb]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-bold">Regulatory / Source Context</p>
          </div>

          {/* Business DNA context */}
          <div className="px-4 py-3 border-b border-[#f0f4f8] space-y-1.5">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Business DNA Context</p>
            {[['Project', 'New Industrial Project'], ['Stage', 'New Construction'], ['MIDC', 'YES'], ['Estate', 'Sample Industrial Estate'], ['Plot', 'P-104']].map(([k, v]) => (
              <div key={k} className="flex justify-between text-[10px]">
                <span className="text-[#374151]">{k}</span>
                <span className="font-medium text-[#1a2533]">{v}</span>
              </div>
            ))}
            <button onClick={onOpenDna} className="mt-1 text-[10px] text-[#1a56db] hover:underline font-semibold">View Business DNA → M07</button>
          </div>

          {/* Source */}
          <div className="px-4 py-3 border-b border-[#f0f4f8] space-y-1">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Source</p>
            <p className="text-[11px] font-semibold text-[#1a2533]">Master Project Dossier</p>
            <p className="text-[10px] text-[#374151]">Verified MIDC allotment record</p>
            <p className="text-[10px] text-[#374151]">Last updated: 18 Sep 2026</p>
          </div>

          {/* Rule / requirement */}
          <div className="px-4 py-3 border-b border-[#f0f4f8]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Rule / Requirement</p>
            <p className="text-[11px] text-[#1a2533]">Configured Land / Plot service requirement — Plot area must be consistent with MIDC allotment record and submitted application.</p>
            <p className="text-[10px] text-[#374151] mt-1 italic">Source reference: Configured workflow rule. No official GR cited in current configuration.</p>
          </div>

          {/* Dependency context */}
          <div className="px-4 py-3 border-b border-[#f0f4f8]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Dependency Impact</p>
            {[{ dep: 'MPCB — CTE', status: 'Pending', dept: 'MPCB' }, { dep: 'Fire Authority — NOC', status: 'Pending', dept: 'Fire Authority' }].map(d => (
              <div key={d.dep} className="mb-2">
                <p className="text-[11px] font-medium text-[#1a2533]">{d.dep}</p>
                <p className="text-[10px] text-[#374151]">{d.dept} · <span className="text-amber-700 font-semibold">{d.status}</span></p>
              </div>
            ))}
            <button onClick={onOpenDepView} className="text-[10px] text-[#1a56db] hover:underline font-semibold">View Dependency Graph → M17</button>
          </div>

          {/* Officer notes log */}
          <div className="px-4 py-3 border-b border-[#f0f4f8]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Officer Notes</p>
            <p className="text-[10px] text-[#1a2533] italic">"{officerNote['plotarea'] || 'No observation recorded yet.'}"</p>
            <p className="text-[9px] text-[#6b7280] mt-1">Officer observation · Land / Plot Scrutiny Desk · 23 Sep 2026</p>
          </div>

          {/* RAG */}
          <div className="px-4 py-3">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Regulatory Assistant</p>
            <p className="text-[10px] text-[#1a2533]">2 relevant references available for Plot Area.</p>
            <button className="mt-1 text-[10px] text-[#1a56db] hover:underline font-semibold">View references</button>
            <p className="text-[9px] text-[#6b7280] mt-2 italic">Retrieved regulatory context — not a legal finding or AI decision.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}

// ─── M12 Parameter Detail ────────────────────────────────────────────────────

export function M12ParameterDetailPage({ onBack, onBackToOverview, onOpenDna, onOpenDocReview, onOpenDepView }: {
  onBack: () => void; onBackToOverview: () => void; onOpenDna?: () => void; onOpenDocReview?: () => void; onOpenDepView?: () => void
}) {
  const [officerFinding, setOfficerFinding] = useState<OfficerReviewState>('needs-verification')
  const [officerNote, setOfficerNote] = useState('Supporting evidence requires officer confirmation against the current project record.')
  const [queryModal, setQueryModal] = useState(false)
  const [saved, setSaved] = useState(false)

  const findingMeta = OFFICER_REVIEW_META[officerFinding]

  return (
    <div className="flex-1 bg-[#f8f9fb] overflow-y-auto">
      {queryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setQueryModal(false)} />
          <div className="relative bg-white rounded shadow-xl w-full max-w-lg p-6 space-y-4 z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#1a2533]">Raise Query — Plot Area</h3>
              <button onClick={() => setQueryModal(false)} className="text-[#374151] hover:text-[#1a2533] text-lg" aria-label="Close">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div><p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Parameter</p><p className="font-semibold">Plot Area</p></div>
              <div><p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Current value</p><p className="font-semibold">4,800 m²</p></div>
            </div>
            <div><label className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold block mb-1">Issue</label><input defaultValue="Plot area requires officer clarification" className="w-full text-xs border border-[#d1d9e0] rounded px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]" /></div>
            <div><label className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold block mb-1">Required response</label><input defaultValue="Confirm plot area with supporting allotment evidence" className="w-full text-xs border border-[#d1d9e0] rounded px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]" /></div>
            <div><label className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold block mb-1">Officer comment</label><textarea rows={2} className="w-full text-xs border border-[#d1d9e0] rounded px-3 py-2 resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]" /></div>
            <div className="flex gap-2">
              <button onClick={() => { setOfficerFinding('query'); setQueryModal(false); setSaved(true); setTimeout(() => setSaved(false), 3000) }} className="px-4 py-2 bg-[#1a3a5c] text-white text-xs font-bold rounded hover:bg-[#0f2540]">Add to Consolidated Query → M18</button>
              <button onClick={() => setQueryModal(false)} className="px-3 py-2 text-xs border border-[#d1d9e0] rounded text-[#1a2533] hover:bg-[#f8f9fb]">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 py-6 space-y-5">
        <Breadcrumb items={[
          { label: 'Department Home', onClick: onBackToOverview },
          { label: 'Applications', onClick: onBackToOverview },
          { label: 'Application Overview', onClick: onBackToOverview },
          { label: 'Scrutiny', onClick: onBack },
          { label: 'Land / Plot', onClick: onBack },
          { label: 'Parameter Detail' },
        ]} />

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold">Land / Plot Parameter</p>
            <h1 className="text-xl font-bold text-[#1a2533]">Plot Area</h1>
            <p className="text-3xl font-bold text-[#1a3a5c] mt-1">4,800 m²</p>
          </div>
          <div className="text-right">
            <button onClick={onBack} className="text-xs text-[#1a56db] hover:underline">← Scrutiny Workbench</button>
            {saved && <p className="text-[10px] text-emerald-600 mt-1 font-semibold">Saved ✓</p>}
          </div>
        </div>

        {/* App context */}
        <div className="bg-white border border-[#d1d9e0] rounded px-4 py-3 flex flex-wrap gap-x-6 gap-y-1 text-[10px]">
          {[['Application','MIDC-APP-2026-00418'],['Business','Aster Precision Components Pvt. Ltd.'],['Service','Land / Plot'],['State','INITIAL_SCRUTINY'],['Route','ENHANCED REVIEW'],['SLA','Approaching']].map(([k,v]) => (
            <span key={k} className="text-[#374151]">{k}: <strong className={k==='Route'?'text-[#1a3a5c]':k==='SLA'?'text-amber-700':'text-[#1a2533]'}>{v}</strong></span>
          ))}
        </div>

        <p className="text-[10px] text-[#374151] italic">All values are fictional prototype data.</p>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* LEFT / MAIN */}
          <div className="lg:col-span-2 space-y-4">

            {/* Parameter summary */}
            <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
              <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#d1d9e0]"><p className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Parameter Summary</p></div>
              <div className="divide-y divide-[#94a3b8]">
                {[
                  ['Parameter', 'Plot Area'],
                  ['Master Project Dossier', '4,800 m²'],
                  ['Current MIDC Application', '4,800 m²'],
                  ['Previous Submission', '4,800 m²'],
                  ['Verification', 'System Verified'],
                  ['Last Updated', '23 Sep 2026'],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between px-4 py-2.5 gap-4">
                    <span className="text-[11px] text-[#374151]">{k}</span>
                    <span className="text-[11px] font-semibold text-[#1a2533] text-right">{v}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between px-4 py-2.5 gap-4">
                  <span className="text-[11px] text-[#374151]">Officer Finding</span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${findingMeta.bgCls} ${findingMeta.textCls} ${findingMeta.borderCls}`}>{findingMeta.label}</span>
                </div>
              </div>
            </div>

            {/* MPD value detail */}
            <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
              <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#d1d9e0] flex justify-between">
                <p className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Master Project Dossier</p>
                <button onClick={onOpenDna} className="text-[10px] text-[#1a56db] hover:underline font-semibold">View in Business DNA → M07</button>
              </div>
              <div className="px-4 py-4 space-y-3">
                <p className="text-2xl font-bold text-[#1a3a5c]">4,800 m²</p>
                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  {[['Source','MIDC / project record (configured)'],['Verification','System Verified'],['DNA Version','v3'],['Last Updated','23 Sep 2026']].map(([k,v]) => (
                    <div key={k}><p className="text-[#374151]">{k}</p><p className="font-semibold text-[#1a2533]">{v}</p></div>
                  ))}
                </div>
                <div>
                  <p className="text-[10px] text-[#374151] font-semibold mb-1">Used by</p>
                  <div className="flex flex-wrap gap-1">
                    {['MIDC Land / Plot','MIDC Building / Planning','MPCB application','Fire-related planning'].map(s => (
                      <span key={s} className="text-[9px] px-1.5 py-0.5 bg-[#f0f4f8] text-[#1a2533] rounded border border-[#d1d9e0]">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Current vs previous */}
            <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
              <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#d1d9e0]"><p className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Current Application vs Previous Submission</p></div>
              <div className="grid grid-cols-2 divide-x divide-[#94a3b8]">
                <div className="px-4 py-4">
                  <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Current MIDC Application</p>
                  <p className="text-xl font-bold text-emerald-700">4,800 m²</p>
                  <p className="text-[10px] text-[#374151] mt-1">MIDC-APP-2026-00418 · Submission #1</p>
                  <p className="text-[10px] text-[#374151]">Source: Current MIDC Application · User Confirmed</p>
                  <p className="text-[10px] text-emerald-700 font-semibold mt-1">✓ Matches Master Project Dossier</p>
                </div>
                <div className="px-4 py-4">
                  <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Previous Submission</p>
                  <p className="text-xl font-bold text-[#1a2533]">4,800 m²</p>
                  <p className="text-[10px] text-[#374151] mt-1">No change detected</p>
                  <p className="text-[10px] text-[#374151] mt-2 italic">If changed: View Delta Re-scrutiny → M20</p>
                </div>
              </div>
            </div>

            {/* Cross-form values */}
            <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
              <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#d1d9e0]"><p className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Cross-form Values</p></div>
              <div className="divide-y divide-[#94a3b8]">
                {[
                  { src: 'Master Project Dossier', val: '4,800 m²', match: true },
                  { src: 'MIDC Land / Plot application', val: '4,800 m²', match: true },
                  { src: 'MIDC Building / Planning', val: '4,800 m²', match: true },
                  { src: 'MPCB application', val: '4,800 m²', match: true },
                ].map(r => (
                  <div key={r.src} className="flex items-center justify-between px-4 py-2.5 gap-4">
                    <span className="text-[11px] text-[#374151]">{r.src}</span>
                    <span className={`text-[11px] font-semibold ${r.match ? 'text-emerald-700' : 'text-amber-700'}`}>{r.val} {r.match ? '✓' : '⚠'}</span>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-[#f0f4f8] bg-[#f8f9fb]">
                <p className="text-[10px] text-emerald-700 font-semibold">✓ Consistent across all configured sources</p>
                <p className="text-[10px] text-[#374151] mt-0.5 italic">If mismatch: Investigate Cross-form Consistency → M16 (MIDC cannot edit another department's record)</p>
              </div>
            </div>

            {/* Related services */}
            <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
              <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#d1d9e0]"><p className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Related Services</p></div>
              <div className="divide-y divide-[#94a3b8]">
                {[
                  { svc:'MIDC Land / Plot', val:'4,800 m²', state:'INITIAL_SCRUTINY' },
                  { svc:'MIDC Building / Planning', val:'4,800 m²', state:'SUBMITTED' },
                  { svc:'MPCB CTE', val:'4,800 m²', state:'Pending (dependency)' },
                ].map(r => (
                  <div key={r.svc} className="flex items-center justify-between px-4 py-2.5 gap-4">
                    <span className="text-[11px] text-[#1a2533]">{r.svc}</span>
                    <div className="flex gap-4 items-center">
                      <span className="text-[11px] font-medium text-[#1a2533]">{r.val}</span>
                      <span className="text-[9px] text-[#374151]">{r.state}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit history */}
            <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
              <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#d1d9e0] flex justify-between">
                <p className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Audit History</p>
                <button className="text-[10px] text-[#374151] cursor-default">View Full Audit → M38 (coming)</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px]">
                  <thead><tr className="bg-[#f8f9fb] border-b border-[#d1d9e0]">
                    {['Date','Actor','Action','Old Value','New Value','Source'].map(h => <th key={h} className="text-left px-3 py-2 text-[9px] text-[#374151] uppercase tracking-wider font-semibold">{h}</th>)}
                  </tr></thead>
                  <tbody className="divide-y divide-[#94a3b8]">
                    {[
                      { date:'23 Sep 2026', actor:'System', action:'MPD updated', old:'4,800 m²', new_:'4,800 m²', src:'MIDC allotment record' },
                      { date:'23 Sep 2026', actor:'Officer', action:'Review state changed', old:'Not reviewed', new_:'Needs Verification', src:'Officer scrutiny' },
                    ].map((r, i) => (
                      <tr key={i} className="hover:bg-[#f8f9fb]">
                        {[r.date, r.actor, r.action, r.old, r.new_, r.src].map((v, j) => <td key={j} className="px-3 py-2 text-[#1a2533]">{v}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT / CONTEXT */}
          <div className="space-y-4">

            {/* Source & provenance */}
            <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
              <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#d1d9e0]"><p className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Source & Provenance</p></div>
              <div className="p-4 space-y-2 text-[11px]">
                {[['Value','4,800 m²'],['Source','Master Project Dossier'],['Source type','Verified project record'],['Verification','System Verified'],['DNA version','v3'],['Recorded','23 Sep 2026'],['Used by','Multiple configured services']].map(([k,v]) => (
                  <div key={k} className="flex justify-between gap-2">
                    <span className="text-[#374151] shrink-0">{k}</span>
                    <span className="font-medium text-[#1a2533] text-right">{v}</span>
                  </div>
                ))}
                <p className="text-[10px] text-[#374151] italic mt-1">Verification indicates how the value was established — separate from officer scrutiny finding.</p>
              </div>
            </div>

            {/* Related document */}
            <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
              <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#d1d9e0]"><p className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Related Documents</p></div>
              <div className="p-4">
                <p className="text-xs font-semibold text-[#1a2533]">Land / Plot Allotment Record</p>
                <p className="text-[10px] text-[#374151] mt-0.5">DOC-LAND-00418 · v2 · Department Verified</p>
                <p className="text-[10px] text-[#374151]">Used by: MIDC Land / Plot</p>
                <div className="flex gap-3 mt-2">
                  <button className="text-[10px] text-[#1a56db] hover:underline font-semibold">Preview</button>
                  <button onClick={onOpenDocReview} className="text-[10px] text-[#1a56db] hover:underline font-semibold">Open Document Review → M13</button>
                </div>
              </div>
            </div>

            {/* Related dependency */}
            <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
              <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#d1d9e0]"><p className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Related Dependency</p></div>
              <div className="p-4 text-[11px] space-y-2">
                <p className="text-[#1a2533]">Plot Area is potentially related to: Building / Planning, Inspection, Configured downstream services.</p>
                <p className="text-[#374151]">No direct dependency change detected for the current value.</p>
                <p className="text-[10px] italic text-[#374151]">Change may affect configured downstream requirements. View Dependency Graph → M17 (coming)</p>
              </div>
            </div>

            {/* Regulatory reference */}
            <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
              <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#d1d9e0]"><p className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Regulatory Reference</p></div>
              <div className="p-4 text-[11px] space-y-2">
                <p className="text-[#1a2533]">Configured Land / Plot service requirement — Plot area must correspond to the MIDC allotment record.</p>
                <p className="text-[#374151] italic">Regulatory reference: Configured workflow rule. No official GR cited in current configuration.</p>
                <button className="text-[10px] text-[#1a56db] hover:underline font-semibold">Open Regulatory Reference</button>
                <p className="text-[9px] text-[#6b7280] italic">Retrieved regulatory context — not a legal finding or AI decision.</p>
              </div>
            </div>

            {/* Officer scrutiny finding */}
            <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
              <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#d1d9e0]"><p className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Officer Scrutiny</p></div>
              <div className="p-4 space-y-3">
                <p className="text-[10px] text-[#374151] italic">Officer scrutiny state — separate from source verification state.</p>
                <div className="flex flex-wrap gap-2">
                  {(['valid','needs-verification','query','invalid'] as OfficerReviewState[]).map(s => {
                    const m = OFFICER_REVIEW_META[s]
                    return (
                      <button key={s} onClick={() => { if (s === 'query') setQueryModal(true); else setOfficerFinding(s) }}
                        className={`px-2.5 py-1 rounded text-[10px] font-semibold border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db] ${officerFinding === s ? `${m.bgCls} ${m.textCls} ${m.borderCls} ring-1 ring-current` : 'bg-white text-[#1a2533] border-[#d1d9e0] hover:bg-[#f8f9fb]'}`}
                      >{m.label}</button>
                    )
                  })}
                </div>
                <div>
                  <label className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold block mb-1">Officer Observation</label>
                  <textarea rows={3} value={officerNote} onChange={e => setOfficerNote(e.target.value)}
                    className="w-full text-xs border border-[#d1d9e0] rounded px-3 py-2 resize-none bg-[#f8f9fb] placeholder-[#b0bcc9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]" />
                  <p className="text-[9px] text-[#6b7280] mt-0.5 italic">Officer observation · Land / Plot Scrutiny Desk · 23 Sep 2026, 10:48</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action bar */}
        <div className="bg-white border border-[#d1d9e0] rounded p-4 flex flex-wrap items-center gap-2">
          <button onClick={onBack} className="px-3 py-2 text-xs border border-[#d1d9e0] rounded text-[#1a2533] hover:bg-[#f8f9fb]">← Back to M11</button>
          <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 3000) }} className="px-4 py-2 bg-[#1a3a5c] text-white text-xs font-bold rounded hover:bg-[#0f2540] transition-colors">Save Review</button>
          <button className="px-3 py-2 text-xs border border-[#d1d9e0] rounded text-[#1a2533] hover:bg-[#f8f9fb]">Flag</button>
          <button onClick={() => setQueryModal(true)} className="px-3 py-2 text-xs border border-amber-200 rounded text-amber-700 bg-amber-50 hover:bg-amber-100 font-semibold">Raise Query</button>
          <button className="px-3 py-2 text-xs border border-[#d1d9e0] rounded text-[#1a2533] hover:bg-[#f8f9fb]">Request Additional Evidence</button>
          <button className="px-3 py-2 text-xs border border-[#d1d9e0] rounded text-[#1a56db] hover:bg-[#ebf3ff]">Open Regulatory Reference</button>
          <p className="ml-auto text-[10px] text-[#374151] italic">Approval / rejection belong to M25/M26.</p>
        </div>
      </div>
    </div>
  )
}

// ─── M13 Document Review ──────────────────────────────────────────────────────

export function M13DocumentReviewPage({ onBack, onOpenParamDetail }: {
  onBack: () => void; onOpenParamDetail?: () => void
}) {
  const [docAction, setDocAction] = useState<'none'|'accept'|'correction'|'invalid'|'evidence'|'verify'>('none')
  const [officerNote, setOfficerNote] = useState('')
  const [actionNote, setActionNote] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [zoom, setZoom] = useState(100)
  const [page, setPage] = useState(1)
  const totalPages = 3

  return (
    <div className="flex-1 bg-[#f8f9fb] overflow-y-auto">
      <div className="max-w-6xl mx-auto px-6 py-6 space-y-4">
        <Breadcrumb items={[
          { label: 'Department Home', onClick: onBack },
          { label: 'Applications', onClick: onBack },
          { label: 'Scrutiny', onClick: onBack },
          { label: 'Land / Plot', onClick: onBack },
          { label: 'Document Review' },
        ]} />

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold">Document Review · Land / Plot</p>
            <h1 className="text-lg font-bold text-[#1a2533]">Land / Plot Allotment Record</h1>
            <div className="flex flex-wrap gap-x-4 mt-1 text-[11px] text-[#374151]">
              <span>DOC-LAND-00418</span><span>·</span><span>MIDC-APP-2026-00418</span><span>·</span>
              <span className="text-emerald-700 font-semibold">Previously Verified — Reused</span>
            </div>
          </div>
          <button onClick={onBack} className="text-xs text-[#1a56db] hover:underline shrink-0">← Scrutiny Workbench</button>
        </div>

        <p className="text-[10px] text-[#374151] italic">Fictional prototype data — not an actual MIDC record.</p>

        {/* Action confirmation panel */}
        {confirmed && (
          <div className="bg-emerald-50 border border-emerald-200 rounded p-3 flex items-center gap-2 text-xs text-emerald-700 font-semibold">
            <span>✓</span> Action recorded in audit history. Document-level finding does not automatically determine application outcome.
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* CENTER — document preview */}
          <div className="lg:col-span-2 space-y-3">
            {/* Preview area */}
            <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-[#d1d9e0] bg-[#f8f9fb]">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold text-[#1a2533]">Land / Plot Allotment Record · v2</p>
                  <span className="text-[9px] text-[#374151]">Page {page} of {totalPages}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setZoom(z => Math.max(50, z - 25))} className="px-2 py-0.5 text-xs border border-[#d1d9e0] rounded hover:bg-[#f0f4f8]">−</button>
                  <span className="text-xs text-[#374151] w-10 text-center">{zoom}%</span>
                  <button onClick={() => setZoom(z => Math.min(200, z + 25))} className="px-2 py-0.5 text-xs border border-[#d1d9e0] rounded hover:bg-[#f0f4f8]">+</button>
                  <button className="text-[10px] text-[#1a56db] hover:underline ml-2">Open full document</button>
                </div>
              </div>
              {/* Mock document page */}
              <div className="bg-[#f0f4f8] flex items-center justify-center" style={{ minHeight: 380 }}>
                <div className="bg-white shadow-md border border-[#d1d9e0] rounded p-8 text-center space-y-4" style={{ width: `${Math.min(zoom, 100)}%`, maxWidth: 520 }}>
                  <div className="border-b-2 border-[#1a3a5c] pb-4">
                    <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold">Maharashtra Industrial Development Corporation</p>
                    <p className="text-sm font-bold text-[#1a2533] mt-1">Plot Allotment Record</p>
                  </div>
                  <div className="text-left space-y-2 text-xs text-[#1a2533]">
                    <div className="flex justify-between"><span className="text-[#374151]">Plot No.</span><span className="font-semibold">P-104</span></div>
                    <div className="flex justify-between"><span className="text-[#374151]">Estate</span><span className="font-semibold">Sample Industrial Estate</span></div>
                    <div className="flex justify-between"><span className="text-[#374151]">Area</span><span className="font-semibold">4,800 m²</span></div>
                    <div className="flex justify-between"><span className="text-[#374151]">Allottee</span><span className="font-semibold">Aster Precision Components Pvt. Ltd.</span></div>
                    <div className="flex justify-between"><span className="text-[#374151]">Date</span><span className="font-semibold">2 Mar 2024</span></div>
                  </div>
                  <p className="text-[9px] text-[#6b7280] italic">— Prototype sample document — Page {page} of {totalPages} —</p>
                </div>
              </div>
              {/* Page nav */}
              <div className="flex items-center justify-center gap-3 px-4 py-2 border-t border-[#d1d9e0] bg-[#f8f9fb]">
                <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} className="px-3 py-1 text-xs border border-[#d1d9e0] rounded hover:bg-[#f0f4f8] disabled:opacity-40">← Prev</button>
                <span className="text-xs text-[#374151]">{page} / {totalPages}</span>
                <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages} className="px-3 py-1 text-xs border border-[#d1d9e0] rounded hover:bg-[#f0f4f8] disabled:opacity-40">Next →</button>
              </div>
            </div>

            {/* Reuse history */}
            <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
              <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#d1d9e0]"><p className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Reuse History — Upload Once, Reuse Where Applicable</p></div>
              <div className="px-4 py-3 space-y-1 text-[11px]">
                <p className="text-emerald-700 font-semibold">Previously verified — reused from Business Document Repository.</p>
                <p className="text-[#374151]">Original verification: Department Verified · Source: Verified Document Repository</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px]">
                  <thead><tr className="bg-[#f8f9fb] border-b border-[#d1d9e0]">
                    {['Application / Service','Doc Version','Date Used','Verification at Use'].map(h => <th key={h} className="text-left px-3 py-2 text-[9px] text-[#374151] uppercase tracking-wider font-semibold">{h}</th>)}
                  </tr></thead>
                  <tbody className="divide-y divide-[#94a3b8]">
                    {[
                      ['MIDC Land / Plot · MIDC-APP-2026-00418','v2','23 Sep 2026','Department Verified'],
                      ['MIDC Building / Planning · MIDC-APP-2026-00419','v2','20 Sep 2026','Department Verified'],
                    ].map((r, i) => (
                      <tr key={i} className="hover:bg-[#f8f9fb]">
                        {r.map((v, j) => <td key={j} className="px-3 py-2 text-[#1a2533]">{v}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Version history */}
            <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
              <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#d1d9e0]"><p className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Version History</p></div>
              <div className="divide-y divide-[#94a3b8]">
                {[
                  { ver:'v2', date:'15 Sep 2026', action:'Replaced / updated', src:'Verified Document Repository', status:'Current Version', current:true },
                  { ver:'v1', date:'2 Mar 2024', action:'Uploaded', src:'Entrepreneur upload', status:'Previous Version', current:false },
                ].map(r => (
                  <div key={r.ver} className={`flex items-center justify-between px-4 py-3 gap-4 ${r.current ? 'bg-[#ebf3ff]' : ''}`}>
                    <div>
                      <p className="text-xs font-semibold text-[#1a2533]">{r.ver} <span className={`ml-1 text-[9px] px-1.5 py-0.5 rounded font-bold ${r.current ? 'bg-[#1a3a5c] text-white' : 'bg-[#f0f4f8] text-[#374151]'}`}>{r.status}</span></p>
                      <p className="text-[10px] text-[#374151] mt-0.5">{r.action} · {r.date} · {r.src}</p>
                    </div>
                    <button className={`text-[10px] ${r.current ? 'text-[#1a56db]' : 'text-[#374151]'} hover:underline`}>{r.current ? 'Viewing' : 'View'}</button>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-[#f0f4f8] bg-[#f8f9fb]"><p className="text-[10px] text-[#374151] italic">Historical versions are preserved. Previous records are never deleted.</p></div>
            </div>

            {/* Action panel */}
            {docAction !== 'none' && (
              <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
                <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#d1d9e0]">
                  <p className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">
                    {docAction === 'accept' ? 'Accept Document' : docAction === 'correction' ? 'Request Correction' : docAction === 'invalid' ? 'Mark Invalid' : docAction === 'evidence' ? 'Request Additional Evidence' : 'Verify Document'}
                  </p>
                </div>
                <div className="p-4 space-y-3">
                  {docAction === 'invalid' && (
                    <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded">
                      <span className="text-amber-600">⚠</span>
                      <p className="text-xs text-amber-700">Marking this document invalid records a document-level finding. It does not automatically reject the application. Application outcome belongs to M25/M26.</p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                    <div><p className="text-[#374151]">Document</p><p className="font-semibold text-[#1a2533]">Land / Plot Allotment Record</p></div>
                    <div><p className="text-[#374151]">Version</p><p className="font-semibold text-[#1a2533]">v2</p></div>
                  </div>
                  <div>
                    <label className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold block mb-1">
                      {docAction === 'accept' ? 'Comment (optional)' : docAction === 'invalid' ? 'Reason (required)' : docAction === 'correction' ? 'Issue / Required correction' : docAction === 'evidence' ? 'Evidence requested and why' : 'Verification comment (optional)'}
                    </label>
                    <textarea rows={3} value={actionNote} onChange={e => setActionNote(e.target.value)}
                      placeholder={docAction === 'correction' ? 'e.g. Document copy is unclear in the possession section.' : docAction === 'evidence' ? 'Describe the evidence needed and the related parameter.' : 'Add comment...'}
                      className="w-full text-xs border border-[#d1d9e0] rounded px-3 py-2 resize-none bg-[#f8f9fb] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]" />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setConfirmed(true); setDocAction('none'); setActionNote(''); setTimeout(() => setConfirmed(false), 4000) }}
                      className="px-4 py-2 bg-[#1a3a5c] text-white text-xs font-bold rounded hover:bg-[#0f2540] transition-colors">
                      {docAction === 'correction' || docAction === 'evidence' ? 'Add to Consolidated Query → M18' : 'Confirm & Save'}
                    </button>
                    <button onClick={() => { setDocAction('none'); setActionNote('') }} className="px-3 py-2 text-xs border border-[#d1d9e0] rounded text-[#1a2533] hover:bg-[#f8f9fb]">Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {/* Action bar */}
            <div className="bg-white border border-[#d1d9e0] rounded p-4 flex flex-wrap gap-2 items-center">
              <button onClick={onBack} className="px-3 py-2 text-xs border border-[#d1d9e0] rounded text-[#1a2533] hover:bg-[#f8f9fb]">← Back</button>
              <button onClick={() => setDocAction('accept')} className="px-3 py-2 text-xs border border-emerald-200 rounded text-emerald-700 bg-emerald-50 hover:bg-emerald-100 font-semibold">Accept</button>
              <button onClick={() => setDocAction('correction')} className="px-3 py-2 text-xs border border-amber-200 rounded text-amber-700 bg-amber-50 hover:bg-amber-100 font-semibold">Request Correction</button>
              <button onClick={() => setDocAction('invalid')} className="px-3 py-2 text-xs border border-red-200 rounded text-red-700 bg-red-50 hover:bg-red-100 font-semibold">Mark Invalid</button>
              <button onClick={() => setDocAction('evidence')} className="px-3 py-2 text-xs border border-[#d1d9e0] rounded text-[#1a2533] hover:bg-[#f8f9fb]">Request Additional Evidence</button>
              <button onClick={() => setDocAction('verify')} className="px-3 py-2 text-xs border border-[#1a56db] rounded text-[#1a56db] hover:bg-[#ebf3ff] font-semibold">Verify</button>
            </div>
          </div>

          {/* RIGHT — context panel */}
          <div className="space-y-4">
            {/* Document details */}
            <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
              <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#d1d9e0]"><p className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Document Details</p></div>
              <div className="p-4 space-y-2 text-[11px]">
                {[['Type','Land / Plot Allotment Record'],['Category','Land'],['Issue date','2 Mar 2024'],['Expiry date','Not applicable'],['Source','Verified Document Repository'],['Document ID','DOC-LAND-00418'],['Version','v2'],['Uploaded','2 Mar 2024']].map(([k,v]) => (
                  <div key={k} className="flex justify-between gap-2">
                    <span className="text-[#374151] shrink-0">{k}</span>
                    <span className="font-medium text-[#1a2533] text-right">{v}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-[#f0f4f8]">
                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">Requirement: Required (configured)</span>
                </div>
              </div>
            </div>

            {/* Verification */}
            <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
              <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#d1d9e0]"><p className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Verification & Validity</p></div>
              <div className="p-4 space-y-2 text-[11px]">
                {[['Verification','Department Verified'],['Verified by','Configured officer / source'],['Verified at','15 Sep 2026, 14:10'],['Validity','Valid'],['Expiry','Not applicable']].map(([k,v]) => (
                  <div key={k} className="flex justify-between gap-2">
                    <span className="text-[#374151]">{k}</span>
                    <span className={`font-medium text-right ${k==='Verification'?'text-emerald-700':k==='Validity'?'text-emerald-700':'text-[#1a2533]'}`}>{v}</span>
                  </div>
                ))}
                <p className="text-[10px] text-[#374151] italic pt-1">Verification ≠ Validity. A verified document may still expire.</p>
              </div>
            </div>

            {/* Related parameters */}
            <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
              <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#d1d9e0]"><p className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Related Parameters</p></div>
              <div className="p-4 space-y-1.5 text-[11px]">
                <p className="text-[10px] text-[#374151] mb-2">This document supports:</p>
                {['Plot Area','Allotment Status','Possession Status'].map(p => (
                  <button key={p} onClick={() => p === 'Plot Area' ? onOpenParamDetail?.() : undefined}
                    className={`block w-full text-left text-[11px] font-semibold py-1 px-2 rounded hover:bg-[#f0f4f8] transition-colors ${p === 'Plot Area' ? 'text-[#1a56db]' : 'text-[#1a2533]'}`}>
                    {p} {p === 'Plot Area' && '→ M12'}
                  </button>
                ))}
              </div>
            </div>

            {/* Related services */}
            <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
              <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#d1d9e0]"><p className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Related Services</p></div>
              <div className="p-4 space-y-1.5 text-[11px]">
                {['Land / Plot','Building / Planning'].map(s => (
                  <div key={s} className="flex items-center justify-between"><span className="text-[#1a2533]">{s}</span><span className="text-[9px] text-[#374151]">configured</span></div>
                ))}
              </div>
            </div>

            {/* Regulatory reference */}
            <div className="bg-white border border-[#d1d9e0] rounded p-4 space-y-1.5 text-[11px]">
              <p className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold">Regulatory Reference</p>
              <p className="text-[#1a2533]">Configured Land / Plot service: allotment record is a required supporting document.</p>
              <p className="text-[#374151] italic text-[10px]">Regulatory reference unavailable in current configuration — no official GR cited.</p>
              <button className="text-[10px] text-[#1a56db] hover:underline font-semibold">Open Regulatory Reference</button>
            </div>

            {/* Officer notes */}
            <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
              <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#d1d9e0]"><p className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Officer Notes</p></div>
              <div className="p-4 space-y-2">
                <textarea rows={3} value={officerNote} onChange={e => setOfficerNote(e.target.value)}
                  placeholder="Record an observation about this document."
                  className="w-full text-xs border border-[#d1d9e0] rounded px-3 py-2 resize-none bg-[#f8f9fb] placeholder-[#b0bcc9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]" />
                <p className="text-[9px] text-[#6b7280] italic">Officer observation · Land / Plot Scrutiny Desk · 23 Sep 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── M14 Building / Planning Scrutiny ────────────────────────────────────────









export function M14BuildingScrutinyPage({ onBack, onBackToOverview, onOpenParamDetail, onOpenDocReview, onOpenConsistency, onOpenDepView }: {
  onBack: () => void; onBackToOverview: () => void; onOpenParamDetail?: () => void; onOpenDocReview?: () => void; onOpenConsistency?: () => void; onOpenDepView?: () => void
}) {
  const [activeSection, setActiveSection] = useState('identity')
  const [reviewStates, setReviewStates] = useState<Record<string, OfficerReviewState>>(() => {
    const m: Record<string, OfficerReviewState> = {}
    M14_IDENTITY_PARAMS.forEach(p => { m['id_' + p.name] = p.finding })
    M14_BUILDING_PARAMS.forEach(p => { m['bp_' + p.name] = p.finding })
    M14_TECH_DOCS.forEach(d => { m['doc_' + d.id] = d.finding })
    return m
  })
  const [queryModal, setQueryModal] = useState<string | null>(null)
  const [officerNote, setOfficerNote] = useState('')

  const setReview = (key: string, s: OfficerReviewState) => setReviewStates(prev => ({ ...prev, [key]: s }))

  const ReviewBadge = ({ state }: { state: OfficerReviewState }) => {
    const m = OFFICER_REVIEW_META[state]
    return <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold border ${m.bgCls} ${m.textCls} ${m.borderCls}`}>{m.label}</span>
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#f8f9fb]">
      {/* Query modal */}
      {queryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setQueryModal(null)} />
          <div className="relative bg-white rounded shadow-xl w-full max-w-lg p-6 space-y-4 z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#1a2533]">Raise Query — {queryModal}</h3>
              <button onClick={() => setQueryModal(null)} className="text-[#374151] hover:text-[#1a2533] text-lg" aria-label="Close">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div><p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Parameter / Document</p><p className="font-semibold">{queryModal}</p></div>
              <div><p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Application</p><p className="font-semibold">MIDC-APP-2026-00418</p></div>
            </div>
            <div><label className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold block mb-1">Issue</label><input defaultValue={`${queryModal} requires clarification`} className="w-full text-xs border border-[#d1d9e0] rounded px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]" /></div>
            <div><label className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold block mb-1">Required response</label><input defaultValue="Provide supporting evidence and clarification" className="w-full text-xs border border-[#d1d9e0] rounded px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]" /></div>
            <div><label className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold block mb-1">Officer comment</label><textarea rows={2} className="w-full text-xs border border-[#d1d9e0] rounded px-3 py-2 resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]" /></div>
            <div className="flex gap-2">
              <button onClick={() => setQueryModal(null)} className="px-4 py-2 bg-[#1a3a5c] text-white text-xs font-bold rounded hover:bg-[#0f2540]">Add to Consolidated Query → M18</button>
              <button onClick={() => setQueryModal(null)} className="px-3 py-2 text-xs border border-[#d1d9e0] rounded text-[#1a2533] hover:bg-[#f8f9fb]">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-[#d1d9e0] px-5 py-3 shrink-0">
        <Breadcrumb items={[
          { label: 'Department Home', onClick: onBackToOverview },
          { label: 'Applications', onClick: onBackToOverview },
          { label: 'Application Overview', onClick: onBackToOverview },
          { label: 'Scrutiny', onClick: onBack },
          { label: 'Building / Planning' },
        ]} />
        <div className="flex items-start justify-between gap-4 mt-2">
          <div>
            <h1 className="text-base font-bold text-[#1a2533]">Building / Planning — Scrutiny Workbench <span className="text-[11px] text-[#374151] font-normal ml-2">M14</span></h1>
            <p className="text-[11px] text-[#374151] mt-0.5">Service-specific scrutiny · MIDC-APP-2026-00418 · Enhanced Review</p>
          </div>
          <button onClick={onBack} className="text-xs text-[#1a56db] hover:underline shrink-0">← Land / Plot (M11)</button>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-[10px]">
          {[['Application','MIDC-APP-2026-00418'],['Business','Aster Precision Components Pvt. Ltd.'],['Service','Building / Planning'],['State','TECHNICAL_SCRUTINY'],['Route','ENHANCED REVIEW'],['Desk','Planning / Building Scrutiny'],['SLA','Approaching']].map(([k,v]) => (
            <span key={k} className="text-[#374151]">{k}: <strong className={k==='Route'?'text-[#1a3a5c]':k==='SLA'?'text-amber-700':'text-[#1a2533]'}>{v}</strong></span>
          ))}
        </div>
      </div>

      {/* DNA context strip */}
      <div className="bg-[#ebf3ff] border-b border-[#bdd4f5] px-5 py-2 shrink-0">
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-[10px]">
          <span className="text-[#1a3a5c] font-bold uppercase tracking-wider">Business DNA Context</span>
          {[['Plot','P-104 · Sample Industrial Estate'],['Plot Area','4,800 m²'],['Built-up Area','2,300 m²'],['Floors','G+2'],['Construction','New Construction'],['Occupancy','Industrial / Manufacturing'],['Stage','Pre-construction'],['Industrial Machinery','Yes'],['Warehouse','Yes'],['MPCB CTE','Completed']].map(([k,v]) => (
            <span key={k} className="text-[#1a3a5c]">{k}: <strong>{v}</strong></span>
          ))}
          <span className="text-[10px] text-[#374151] italic">Read-only — inherited from Master Project Dossier</span>
        </div>
      </div>

      {/* Dark summary bar */}
      <div className="bg-[#0f2540] px-5 py-2 flex items-center gap-6 shrink-0 text-[10px]">
        <span className="text-[#8fafd0] font-semibold uppercase tracking-wider">Building / Planning Scrutiny</span>
        {[['Groups','8'],['✓ Reviewed','1'],['⚠ Query','1'],['○ Needs Verification','2'],['Not yet reviewed','4']].map(([k,v]) => (
          <span key={String(k)} className="text-white"><span className="text-[#8fafd0]">{k}: </span><strong>{v}</strong></span>
        ))}
        <p className="ml-auto text-[#8fafd0] italic">Sample prototype data</p>
      </div>

      {/* Three-column layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT */}
        <nav className="w-56 shrink-0 bg-white border-r border-[#d1d9e0] overflow-y-auto" aria-label="Building/Planning scrutiny sections">
          <div className="px-3 py-2.5 border-b border-[#d1d9e0]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-bold">Building / Planning Review</p>
          </div>
          <div className="py-1">
            {M14_SECTIONS.map(sec => {
              const sm = SECTION_STATUS_META[sec.status as keyof typeof SECTION_STATUS_META]
              const active = activeSection === sec.id
              return (
                <button key={sec.id} onClick={() => setActiveSection(sec.id)}
                  className={`w-full text-left flex items-center gap-2 px-3 py-2 text-[11px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1a56db] ${active ? 'bg-[#ebf3ff] text-[#1a3a5c] font-semibold' : 'text-[#1a2533] hover:bg-[#f8f9fb]'}`}
                  aria-current={active ? 'page' : undefined}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${sm.dot}`} title={sm.label} />
                  <span className="leading-tight">{sec.label}</span>
                </button>
              )
            })}
          </div>
        </nav>

        {/* CENTER */}
        <main className="flex-1 overflow-y-auto bg-[#f8f9fb] p-5 space-y-4" tabIndex={-1}>

          {/* PROJECT / PLOT IDENTITY */}
          {activeSection === 'identity' && (
            <>
              <h2 className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Project / Plot Identity</h2>
              <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
                <div className="px-4 py-2 bg-[#f8f9fb] border-b border-[#d1d9e0] grid grid-cols-6 gap-2">
                  {['Parameter','Value','Source','Verification','Officer Finding','Evidence'].map(h => <p key={h} className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold">{h}</p>)}
                </div>
                <div className="divide-y divide-[#94a3b8]">
                  {M14_IDENTITY_PARAMS.map(p => {
                    const key = 'id_' + p.name
                    const rs = reviewStates[key] ?? p.finding
                    const rm = OFFICER_REVIEW_META[rs]
                    return (
                      <div key={p.name} className="grid grid-cols-6 gap-2 px-4 py-2.5 items-center hover:bg-[#f8f9fb] group">
                        <button onClick={onOpenParamDetail} className="text-[11px] font-semibold text-[#1a56db] hover:underline text-left group-hover:text-[#0f2540]">{p.name}</button>
                        <p className="text-[11px] text-[#1a2533] font-medium">{p.value}</p>
                        <p className="text-[10px] text-[#374151]">{p.source}</p>
                        <p className="text-[10px] text-[#1a2533]">{p.verify.replace(/_/g,' ')}</p>
                        <div className="flex items-center gap-1">
                          <ReviewBadge state={rs} />
                        </div>
                        <div className="flex items-center gap-2">
                          {p.evidence && <button onClick={onOpenDocReview} className="text-[9px] text-[#1a56db] hover:underline truncate">{p.evidence}</button>}
                          <button onClick={() => setQueryModal(p.name)} className="text-[9px] text-amber-600 hover:underline shrink-0">Query</button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <button onClick={() => {}} className="px-3 py-1.5 bg-[#1a3a5c] text-white text-xs font-bold rounded hover:bg-[#0f2540]">Save Review</button>
                <button className="px-3 py-1.5 text-xs border border-[#d1d9e0] rounded text-[#1a2533] hover:bg-[#f8f9fb]">Flag for Attention</button>
                <button onClick={onOpenParamDetail} className="px-3 py-1.5 text-xs border border-[#1a56db] text-[#1a56db] rounded hover:bg-[#ebf3ff] font-semibold">Open Parameter Detail → M12</button>
                <button onClick={onOpenConsistency} className="px-3 py-1.5 text-xs border border-[#1a56db] text-[#1a56db] rounded hover:bg-[#ebf3ff] font-semibold">Open Cross-form Consistency → M16</button>
              </div>
            </>
          )}

          {/* BUILDING PARAMETERS */}
          {activeSection === 'building' && (
            <>
              <h2 className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Building Parameters</h2>
              <div className="bg-amber-50 border border-amber-200 rounded px-4 py-2 flex items-center gap-2 text-xs text-amber-700">
                <span>⚠</span> Changes detected since previous submission: Built-up Area 2,000 m² → 2,300 m²
                <button className="ml-auto text-[10px] text-[#1a56db] hover:underline font-semibold shrink-0">Open Delta Re-scrutiny → M20 (coming)</button>
              </div>
              <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
                <div className="px-4 py-2 bg-[#f8f9fb] border-b border-[#d1d9e0] grid grid-cols-5 gap-2">
                  {['Parameter','Value','Source','Verification','Officer Finding'].map(h => <p key={h} className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold">{h}</p>)}
                </div>
                <div className="divide-y divide-[#94a3b8]">
                  {M14_BUILDING_PARAMS.map(p => {
                    const key = 'bp_' + p.name
                    const rs = reviewStates[key] ?? p.finding
                    return (
                      <div key={p.name} className="grid grid-cols-5 gap-2 px-4 py-2.5 items-center hover:bg-[#f8f9fb]">
                        <button onClick={onOpenParamDetail} className="text-[11px] font-semibold text-[#1a56db] hover:underline text-left">{p.name}</button>
                        <p className="text-[11px] text-[#1a2533] font-medium">{p.value}</p>
                        <p className="text-[10px] text-[#374151]">{p.source}</p>
                        <p className={`text-[10px] ${p.verify === 'NEEDS_VERIFICATION' ? 'text-amber-700 font-semibold' : 'text-[#1a2533]'}`}>{p.verify.replace(/_/g,' ')}</p>
                        <div className="flex items-center gap-2">
                          <ReviewBadge state={rs} />
                          <button onClick={() => setQueryModal(p.name)} className="text-[9px] text-amber-600 hover:underline">Query</button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <button className="px-3 py-1.5 bg-[#1a3a5c] text-white text-xs font-bold rounded hover:bg-[#0f2540]">Save Review</button>
                <button onClick={onOpenParamDetail} className="px-3 py-1.5 text-xs border border-[#1a56db] text-[#1a56db] rounded hover:bg-[#ebf3ff] font-semibold">Open Parameter Detail → M12</button>
                <button onClick={() => setQueryModal('Building Parameters')} className="px-3 py-1.5 text-xs border border-amber-200 rounded text-amber-700 bg-amber-50 hover:bg-amber-100 font-semibold">Raise Query</button>
              </div>
            </>
          )}

          {/* PREREQUISITE DOCUMENTS */}
          {activeSection === 'prereq' && (
            <>
              <h2 className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Prerequisite Documents</h2>
              <div className="bg-[#ebf3ff] border border-[#bdd4f5] rounded px-4 py-2.5 flex gap-2 text-xs text-[#1a3a5c]">
                <span>ℹ</span>
                <span>MIDC may view external prerequisite references. MIDC does not approve, reject, or modify another department's decision.</span>
              </div>
              {M14_PREREQ_DOCS.map(d => (
                <div key={d.name} className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[#f0f4f8]">
                    <div>
                      <p className="text-xs font-bold text-[#1a2533]">{d.name}</p>
                      <p className="text-[10px] text-[#374151] mt-0.5">Source dept: {d.dept} · Ref: {d.ref}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border bg-emerald-50 text-emerald-700 border-emerald-200">✓ {d.status}</span>
                  </div>
                  <div className="px-4 py-3 grid grid-cols-3 gap-4 text-[11px]">
                    <div><p className="text-[#374151]">Verification</p><p className="font-semibold text-[#1a2533]">{d.verify.replace(/_/g,' ')}</p></div>
                    <div><p className="text-[#374151]">Dependency type</p><p className="font-semibold text-[#1a2533]">External / Upstream</p></div>
                    <div><p className="text-[#374151]">MIDC action</p><button onClick={onOpenDocReview} className="text-[10px] text-[#1a56db] hover:underline font-semibold">View evidence → M13</button></div>
                  </div>
                  <div className="px-4 py-2 border-t border-[#f0f4f8] bg-[#f8f9fb]">
                    <p className="text-[10px] text-[#374151] italic">{d.note}</p>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* TECHNICAL DOCUMENTS */}
          {activeSection === 'technical' && (
            <>
              <h2 className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Technical Documents</h2>
              <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
                <div className="px-4 py-2 bg-[#f8f9fb] border-b border-[#d1d9e0] grid grid-cols-6 gap-2">
                  {['Document','ID','Version','Verification','Validity','Officer Review'].map(h => <p key={h} className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold">{h}</p>)}
                </div>
                <div className="divide-y divide-[#94a3b8]">
                  {M14_TECH_DOCS.map(d => {
                    const key = 'doc_' + d.id
                    const rs = reviewStates[key] ?? d.finding
                    return (
                      <div key={d.id} className="grid grid-cols-6 gap-2 px-4 py-2.5 items-center hover:bg-[#f8f9fb]">
                        <button onClick={onOpenDocReview} className="text-[11px] font-semibold text-[#1a56db] hover:underline text-left">{d.name}</button>
                        <p className="text-[10px] font-mono text-[#374151]">{d.id}</p>
                        <p className="text-[10px] text-[#1a2533]">{d.ver}</p>
                        <p className={`text-[10px] ${d.verify==='SELF_DECLARED'?'text-amber-700':'text-[#1a2533]'}`}>{d.verify.replace(/_/g,' ')}</p>
                        <p className="text-[10px] text-emerald-700">{d.validity}</p>
                        <div className="flex items-center gap-1.5">
                          <ReviewBadge state={rs} />
                          <button onClick={() => setQueryModal(d.name)} className="text-[9px] text-amber-600 hover:underline">Query</button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <button className="px-3 py-1.5 bg-[#1a3a5c] text-white text-xs font-bold rounded hover:bg-[#0f2540]">Save Review</button>
                <button onClick={onOpenDocReview} className="px-3 py-1.5 text-xs border border-[#1a56db] text-[#1a56db] rounded hover:bg-[#ebf3ff] font-semibold">Open Document Review → M13</button>
                <button className="px-3 py-1.5 text-xs border border-[#d1d9e0] rounded text-[#1a2533] hover:bg-[#f8f9fb]">Request Additional Evidence</button>
              </div>
            </>
          )}

          {/* CONDITIONAL DOCUMENTS */}
          {activeSection === 'conditional' && (
            <>
              <h2 className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Conditional Documents</h2>
              <div className="bg-[#ebf3ff] border border-[#bdd4f5] rounded px-4 py-2 text-xs text-[#1a3a5c]">
                <span>ℹ </span>Conditional documents appear only when their configured Business DNA or regulatory condition is satisfied. NOT_APPLICABLE conditions do not generate missing-document warnings.
              </div>
              <div className="space-y-3">
                {M14_CONDITIONAL_DOCS.map(d => (
                  <div key={d.name} className={`bg-white border rounded p-4 ${d.state === 'needs-verification' ? 'border-amber-200' : 'border-[#d1d9e0]'}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold text-[#1a2533]">{d.name}</p>
                        <p className="text-[10px] text-[#374151] mt-0.5">Condition: {d.condition}</p>
                        <p className="text-[10px] text-[#374151] italic mt-1">{d.note}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold border shrink-0 ${d.state === 'needs-verification' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-[#f0f4f8] text-[#1a2533] border-[#d1d9e0]'}`}>
                        {d.state === 'needs-verification' ? '○ Needs Verification' : 'Required'}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button onClick={onOpenDocReview} className="text-[10px] text-[#1a56db] hover:underline font-semibold">Open Document Review → M13</button>
                      <button onClick={() => setQueryModal(d.name)} className="text-[10px] text-amber-600 hover:underline font-semibold">Request Evidence</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* CONSISTENCY CHECKS */}
          {activeSection === 'consistency' && (
            <>
              <h2 className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Consistency Checks</h2>
              <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
                <div className="px-4 py-2 bg-[#f8f9fb] border-b border-[#d1d9e0] grid grid-cols-6 gap-2">
                  {['Field','MPD','MIDC Land','MIDC Bldg','MPCB','Fire'].map(h => <p key={h} className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold">{h}</p>)}
                </div>
                <div className="divide-y divide-[#94a3b8]">
                  {M14_CONSISTENCY.map(row => (
                    <div key={row.field} className={`grid grid-cols-6 gap-2 px-4 py-3 items-center ${row.mismatch ? 'bg-amber-50' : ''}`}>
                      <p className="text-[11px] font-semibold text-[#1a2533]">{row.field}</p>
                      <p className="text-[11px] text-emerald-700 font-medium">{row.mpd}</p>
                      <p className="text-[11px] text-[#1a2533]">{row.land}</p>
                      <p className="text-[11px] text-[#1a2533]">{row.bldg}</p>
                      <p className="text-[11px] text-[#1a2533]">{row.mpcb}</p>
                      <p className={`text-[11px] font-medium ${row.mismatch && row.fire !== row.mpd ? 'text-amber-700' : 'text-[#1a2533]'}`}>{row.fire} {row.mismatch && row.fire !== row.mpd && '⚠'}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <button onClick={onOpenConsistency} className="px-3 py-1.5 text-xs border border-[#1a56db] text-[#1a56db] rounded hover:bg-[#ebf3ff] font-semibold">Investigate Cross-form Consistency → M16</button>
                <button onClick={() => setQueryModal('Plot Area — cross-form mismatch')} className="px-3 py-1.5 text-xs border border-amber-200 rounded text-amber-700 bg-amber-50 hover:bg-amber-100 font-semibold">Raise Query</button>
              </div>
              <p className="text-[10px] text-[#374151] italic">M14 identifies mismatches for officer review. MIDC may not edit another department's application. Resolution through M16.</p>
            </>
          )}

          {/* DEPENDENCIES */}
          {activeSection === 'deps' && (
            <>
              <h2 className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Dependencies</h2>
              <div className="space-y-3">
                {M14_DEPS.map((d, i) => (
                  <div key={d.name} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full border-2 mt-1 shrink-0 ${d.current ? 'bg-[#1a3a5c] border-[#1a3a5c]' : d.status === 'Completed' ? 'bg-emerald-500 border-emerald-500' : 'bg-[#d1d9e0] border-[#d1d9e0]'}`} />
                      {i < M14_DEPS.length - 1 && <div className="w-0.5 flex-1 bg-[#d1d9e0] my-1" />}
                    </div>
                    <div className={`flex-1 border rounded p-3 mb-2 ${d.current ? 'border-[#1a3a5c] bg-[#ebf3ff]' : 'border-[#d1d9e0] bg-white'}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold text-[#1a2533]">{d.name}</p>
                          <p className="text-[10px] text-[#374151] mt-0.5">{d.type} · Dept: {d.dept}</p>
                          {d.ref && d.ref !== '—' && <p className="text-[10px] text-[#374151]">Ref: {d.ref}</p>}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold border ${d.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : d.current ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                            {d.status}
                          </span>
                          {d.current && <span className="text-[9px] font-bold text-[#1a56db]">CURRENT</span>}
                        </div>
                      </div>
                      {!d.current && d.dept !== 'MIDC' && (
                        <p className="text-[9px] text-[#374151] mt-2 italic">External department — MIDC may view status only. No MIDC controls to approve/modify {d.dept} decisions.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={onOpenDepView} className="text-[10px] text-[#1a56db] hover:underline font-semibold">View full Dependency Graph → M17</button>
            </>
          )}

          {/* DEFAULT for unimplemented sections */}
          {!['identity','building','prereq','technical','conditional','consistency','deps'].includes(activeSection) && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-sm font-semibold text-[#1a2533]">{M14_SECTIONS.find(s => s.id === activeSection)?.label}</p>
              <p className="text-xs text-[#374151] mt-1">This section's parameters will be configured in a future phase.</p>
            </div>
          )}
        </main>

        {/* RIGHT — regulatory / dependency / notes */}
        <aside className="w-64 shrink-0 bg-white border-l border-[#d1d9e0] overflow-y-auto" aria-label="Regulatory and source context">
          <div className="px-4 py-2.5 border-b border-[#d1d9e0] bg-[#f8f9fb]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-bold">Regulatory / Source Context</p>
          </div>

          {/* Application context */}
          <div className="px-4 py-3 border-b border-[#f0f4f8] space-y-1.5 text-[11px]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Application Context</p>
            {[['State','TECHNICAL_SCRUTINY'],['Route','ENHANCED REVIEW'],['Desk','Planning / Building Scrutiny']].map(([k,v]) => (
              <div key={k} className="flex justify-between gap-2"><span className="text-[#374151]">{k}</span><span className={`font-medium text-right ${k==='Route'?'text-[#1a3a5c]':'text-[#1a2533]'}`}>{v}</span></div>
            ))}
          </div>

          {/* Regulatory source */}
          <div className="px-4 py-3 border-b border-[#f0f4f8]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Rule / Requirement</p>
            <p className="text-[11px] text-[#1a2533]">Configured Building / Planning service requirement. Review items must be consistent with Master Project Dossier and submitted application.</p>
            <p className="text-[10px] text-[#374151] mt-1 italic">Source: Configured workflow rule — no official GR cited.</p>
            <button className="mt-2 text-[10px] text-[#1a56db] hover:underline font-semibold">Open Regulatory Reference</button>
            <p className="text-[9px] text-[#6b7280] mt-1 italic">Retrieved regulatory context — not a legal finding.</p>
          </div>

          {/* Dependency summary */}
          <div className="px-4 py-3 border-b border-[#f0f4f8]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Regulatory Dependencies</p>
            <p className="text-[9px] text-[#6b7280] mb-2 italic">Configured dependencies relevant to this Building / Planning service</p>
            {M14_DEPS.map(d => (
              <div key={d.name} className="mb-2">
                <p className="text-[10px] font-semibold text-[#1a2533]">{d.name}</p>
                <p className="text-[9px] text-[#374151]">{d.dept} · <span className={d.status === 'Completed' ? 'text-emerald-700' : d.current ? 'text-[#1a3a5c]' : 'text-amber-700'}>{d.status}</span></p>
              </div>
            ))}
            <button onClick={onOpenDepView} className="text-[10px] text-[#1a56db] hover:underline font-semibold">View Dependency Graph → M17</button>
          </div>

          {/* Officer notes */}
          <div className="px-4 py-3">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Officer Notes</p>
            <textarea rows={4} value={officerNote} onChange={e => setOfficerNote(e.target.value)}
              placeholder="Record an observation about this Building / Planning review."
              className="w-full text-xs border border-[#d1d9e0] rounded px-3 py-2 resize-none bg-[#f8f9fb] placeholder-[#b0bcc9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]" />
            <p className="text-[9px] text-[#6b7280] mt-1 italic">Officer observation · Planning / Building Scrutiny Desk · 23 Sep 2026</p>
          </div>
        </aside>
      </div>
    </div>
  )
}

// ─── M15 Water / Utility / Drainage Scrutiny ─────────────────────────────────






export function M15WaterScrutinyPage({ onBack, onBackToOverview, onOpenParamDetail, onOpenDocReview, onOpenConsistency, onOpenDepView }: {
  onBack: () => void; onBackToOverview: () => void; onOpenParamDetail?: () => void; onOpenDocReview?: () => void; onOpenConsistency?: () => void; onOpenDepView?: () => void
}) {
  const [activeSection, setActiveSection] = useState('applicability')
  const [reviewStates, setReviewStates] = useState<Record<string, OfficerReviewState>>(() => {
    const m: Record<string, OfficerReviewState> = {}
    M15_WATER_PARAMS.forEach(p => { m['wp_' + p.name] = p.finding })
    M15_DOCS.forEach(d => { m['doc_' + d.id] = d.finding })
    return m
  })
  const [queryModal, setQueryModal] = useState<string | null>(null)
  const [officerNote, setOfficerNote] = useState('')

  const ReviewBadge = ({ state }: { state: OfficerReviewState }) => {
    const m = OFFICER_REVIEW_META[state]
    return <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold border ${m.bgCls} ${m.textCls} ${m.borderCls}`}>{m.label}</span>
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#f8f9fb]">
      {/* Query modal */}
      {queryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setQueryModal(null)} />
          <div className="relative bg-white rounded shadow-xl w-full max-w-lg p-6 space-y-4 z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#1a2533]">Raise Query — {queryModal}</h3>
              <button onClick={() => setQueryModal(null)} className="text-[#374151] hover:text-[#1a2533] text-lg" aria-label="Close">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div><p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Parameter / Document</p><p className="font-semibold">{queryModal}</p></div>
              <div><p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Application</p><p className="font-semibold">MIDC-APP-2026-00418</p></div>
            </div>
            <div><label className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold block mb-1">Issue</label><input defaultValue={`${queryModal} requires clarification`} className="w-full text-xs border border-[#d1d9e0] rounded px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]" /></div>
            <div><label className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold block mb-1">Required response</label><input defaultValue="Provide supporting evidence and clarification" className="w-full text-xs border border-[#d1d9e0] rounded px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]" /></div>
            <div><label className="text-[10px] text-[#374151] uppercase tracking-wider font-semibold block mb-1">Officer comment</label><textarea rows={2} className="w-full text-xs border border-[#d1d9e0] rounded px-3 py-2 resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]" /></div>
            <div className="flex gap-2">
              <button onClick={() => setQueryModal(null)} className="px-4 py-2 bg-[#1a3a5c] text-white text-xs font-bold rounded hover:bg-[#0f2540]">Add to Consolidated Query → M18</button>
              <button onClick={() => setQueryModal(null)} className="px-3 py-2 text-xs border border-[#d1d9e0] rounded text-[#1a2533] hover:bg-[#f8f9fb]">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-[#d1d9e0] px-5 py-3 shrink-0">
        <Breadcrumb items={[
          { label:'Department Home', onClick: onBackToOverview },
          { label:'Applications',    onClick: onBackToOverview },
          { label:'Application Overview', onClick: onBackToOverview },
          { label:'Scrutiny',        onClick: onBack },
          { label:'Water / Utility / Drainage' },
        ]} />
        <div className="flex items-start justify-between gap-4 mt-2">
          <div>
            <h1 className="text-base font-bold text-[#1a2533]">Water / Utility / Drainage — Scrutiny Workbench <span className="text-[11px] text-[#374151] font-normal ml-2">M15</span></h1>
            <p className="text-[11px] text-[#374151] mt-0.5">Service-specific scrutiny · MIDC-APP-2026-00418 · Enhanced Review</p>
          </div>
          <button onClick={onBack} className="text-xs text-[#1a56db] hover:underline shrink-0">← Scrutiny (M11)</button>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-[10px]">
          {[['Application','MIDC-APP-2026-00418'],['Business','Aster Precision Components Pvt. Ltd.'],['Service','Water / Utility / Drainage'],['State','TECHNICAL_SCRUTINY'],['Route','ENHANCED REVIEW'],['Desk','Utility / Water Scrutiny'],['SLA','Approaching']].map(([k,v]) => (
            <span key={k} className="text-[#374151]">{k}: <strong className={k==='Route'?'text-[#1a3a5c]':k==='SLA'?'text-amber-700':'text-[#1a2533]'}>{v}</strong></span>
          ))}
        </div>
      </div>

      {/* Business DNA utility context strip */}
      <div className="bg-[#ebf3ff] border-b border-[#bdd4f5] px-5 py-2 shrink-0">
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-[10px]">
          <span className="text-[#1a3a5c] font-bold uppercase tracking-wider">Business DNA — Utility Context</span>
          {[['Water Required','Yes'],['Water Quantity','Prototype value'],['Water Source','MIDC'],['MIDC Water Route','Active'],['Plot','A-18 · Sample Industrial Estate'],['Plot Area','4,800 m²'],['Stage','Construction'],['Wastewater','Generated'],['Drainage','Required'],['Context','Construction + proposed operation']].map(([k,v]) => (
            <span key={k} className="text-[#1a3a5c]">{k}: <strong>{v}</strong></span>
          ))}
          <span className="text-[10px] text-[#374151] italic">Read-only — inherited from Master Project Dossier</span>
        </div>
      </div>

      {/* Summary bar */}
      <div className="bg-[#0f2540] px-5 py-2 flex items-center gap-6 shrink-0 text-[10px]">
        <span className="text-[#8fafd0] font-semibold uppercase tracking-wider">Water / Utility Scrutiny</span>
        {[['Sections','9'],['✓ Reviewed','2'],['⚠ Query','1'],['○ Needs Verification','1'],['Not reviewed','5']].map(([k,v]) => (
          <span key={String(k)} className="text-white"><span className="text-[#8fafd0]">{k}: </span><strong>{v}</strong></span>
        ))}
        <span className="ml-auto text-[#8fafd0] italic">Sample prototype data</span>
      </div>

      {/* Three-column */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT */}
        <nav className="w-56 shrink-0 bg-white border-r border-[#d1d9e0] overflow-y-auto" aria-label="Water/utility scrutiny sections">
          <div className="px-3 py-2.5 border-b border-[#d1d9e0]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-bold">Water / Utility Review</p>
          </div>
          <div className="py-1">
            {M15_SECTIONS.map(sec => {
              const sm = SECTION_STATUS_META[sec.status as keyof typeof SECTION_STATUS_META]
              const active = activeSection === sec.id
              return (
                <button key={sec.id} onClick={() => setActiveSection(sec.id)}
                  className={`w-full text-left flex items-center gap-2 px-3 py-2 text-[11px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1a56db] ${active ? 'bg-[#ebf3ff] text-[#1a3a5c] font-semibold' : 'text-[#1a2533] hover:bg-[#f8f9fb]'}`}
                  aria-current={active ? 'page' : undefined}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${sm.dot}`} title={sm.label} />
                  <span className="leading-tight">{sec.label}</span>
                </button>
              )
            })}
          </div>
        </nav>

        {/* CENTER */}
        <main className="flex-1 overflow-y-auto bg-[#f8f9fb] p-5 space-y-4" tabIndex={-1}>

          {/* APPLICABILITY */}
          {activeSection === 'applicability' && (
            <>
              <h2 className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Applicability / Service Context</h2>
              <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
                <div className="px-4 py-3 border-b border-[#f0f4f8] bg-[#f8f9fb]">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-bold text-[#1a2533]">Service Activation Status</p>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold border bg-emerald-50 text-emerald-700 border-emerald-200">✓ Service Activated</span>
                  </div>
                  <p className="text-[10px] text-[#1a2533] mt-1.5">This service was activated because the current Business DNA and configured regulatory journey indicate a relevant MIDC utility requirement. This is a system finding — officer judgment is required to confirm applicability.</p>
                </div>
                <div className="grid grid-cols-2 gap-0 divide-y divide-[#94a3b8]">
                  {[
                    ['Water Required','Yes','Business DNA','USER_CONFIRMED','verified'],
                    ['Water Source','MIDC','Business DNA','SYSTEM_VERIFIED','verified'],
                    ['MIDC Water Route','Active','Regulatory Journey','SYSTEM_VERIFIED','verified'],
                    ['Drainage','Required','Business DNA','USER_CONFIRMED','verified'],
                    ['Activation Source','Configured Regulatory Journey','System','SYSTEM_VERIFIED','verified'],
                  ].map(([k,v,src,ver,_]) => (
                    <div key={k} className="col-span-1 flex flex-col gap-0.5 px-4 py-2.5">
                      <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold">{k}</p>
                      <p className="text-[12px] font-bold text-[#1a3a5c]">{v}</p>
                      <p className="text-[10px] text-[#374151]">{src} · {ver.replace(/_/g,' ')}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded px-4 py-2 text-xs text-amber-700">
                <span className="font-semibold">Officer verification required:</span> Confirm that the Business DNA water/utility context is accurate before proceeding with parameter review. If the applicability is uncertain, mark as Needs Verification and raise a query.
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-[#1a3a5c] text-white text-xs font-bold rounded hover:bg-[#0f2540]">Confirm Applicability</button>
                <button onClick={() => setQueryModal('Water / Utility Service Applicability')} className="px-3 py-1.5 text-xs border border-amber-200 rounded text-amber-700 bg-amber-50 hover:bg-amber-100 font-semibold">Raise Query</button>
                <button className="px-3 py-1.5 text-xs border border-[#d1d9e0] rounded text-[#1a2533] hover:bg-[#f8f9fb]">Mark Needs Verification</button>
              </div>
            </>
          )}

          {/* APPLICANT DATA */}
          {activeSection === 'applicant' && (
            <>
              <h2 className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Applicant Data</h2>
              <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
                <div className="px-4 py-2 bg-[#f8f9fb] border-b border-[#d1d9e0] grid grid-cols-6 gap-2">
                  {['Parameter','Application Value','Business DNA Value','Source','Verification','Officer Finding'].map(h => <p key={h} className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold">{h}</p>)}
                </div>
                <div className="divide-y divide-[#94a3b8]">
                  {M15_WATER_PARAMS.map(p => {
                    const key = 'wp_' + p.name
                    const rs = reviewStates[key] ?? p.finding
                    const mismatch = p.appVal !== p.dnaVal && p.dnaVal !== '—'
                    return (
                      <div key={p.name} className={`grid grid-cols-6 gap-2 px-4 py-2.5 items-center hover:bg-[#f8f9fb] ${mismatch ? 'bg-amber-50' : ''}`}>
                        <button onClick={onOpenParamDetail} className="text-[11px] font-semibold text-[#1a56db] hover:underline text-left">{p.name}</button>
                        <p className="text-[11px] text-[#1a2533] font-medium">{p.appVal}</p>
                        <div className="flex items-center gap-1">
                          <p className="text-[11px] text-[#1a2533]">{p.dnaVal}</p>
                          {mismatch && <span className="text-[9px] font-bold text-amber-600 bg-amber-50 border border-amber-200 rounded px-1">MISMATCH</span>}
                        </div>
                        <p className="text-[10px] text-[#374151]">{p.source}</p>
                        <p className={`text-[10px] ${p.verify === 'SELF_DECLARED' ? 'text-amber-700' : p.verify === 'NEEDS_VERIFICATION' ? 'text-amber-700 font-semibold' : 'text-[#1a2533]'}`}>{p.verify.replace(/_/g,' ')}</p>
                        <div className="flex items-center gap-1">
                          <ReviewBadge state={rs} />
                          <button onClick={() => setQueryModal(p.name)} className="text-[9px] text-amber-600 hover:underline shrink-0">Query</button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-[#1a3a5c] text-white text-xs font-bold rounded hover:bg-[#0f2540]">Save Review</button>
                <button onClick={onOpenParamDetail} className="px-3 py-1.5 text-xs border border-[#1a56db] text-[#1a56db] rounded hover:bg-[#ebf3ff] font-semibold">Open Parameter Detail → M12</button>
                <button onClick={onOpenConsistency} className="px-3 py-1.5 text-xs border border-[#1a56db] text-[#1a56db] rounded hover:bg-[#ebf3ff] font-semibold">Open Cross-form Consistency → M16</button>
              </div>
            </>
          )}

          {/* WATER PARAMETERS */}
          {activeSection === 'water' && (
            <>
              <h2 className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Water Parameters</h2>
              <div className="bg-[#ebf3ff] border border-[#bdd4f5] rounded px-4 py-2 text-xs text-[#1a3a5c]">
                <span>ℹ </span>Values shown are prototype-safe sample data. No technical thresholds, engineering limits, or mandatory quantities are implied. Configured regulatory rules determine review requirements.
              </div>
              <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
                <div className="px-4 py-2 bg-[#f8f9fb] border-b border-[#d1d9e0] grid grid-cols-5 gap-2">
                  {['Parameter','Value','Source','Verification','Officer Finding'].map(h => <p key={h} className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold">{h}</p>)}
                </div>
                <div className="divide-y divide-[#94a3b8]">
                  {M15_WATER_PARAMS.map(p => {
                    const key = 'wp_' + p.name
                    const rs = reviewStates[key] ?? p.finding
                    return (
                      <div key={p.name} className="grid grid-cols-5 gap-2 px-4 py-2.5 items-center hover:bg-[#f8f9fb]">
                        <button onClick={onOpenParamDetail} className="text-[11px] font-semibold text-[#1a56db] hover:underline text-left">{p.name}</button>
                        <p className="text-[11px] text-[#1a2533] font-medium">{p.value}</p>
                        <p className="text-[10px] text-[#374151]">{p.source}</p>
                        <p className={`text-[10px] ${p.verify === 'SELF_DECLARED' ? 'text-amber-700' : 'text-[#1a2533]'}`}>{p.verify.replace(/_/g,' ')}</p>
                        <div className="flex items-center gap-2">
                          <ReviewBadge state={rs} />
                          <button onClick={() => setQueryModal(p.name)} className="text-[9px] text-amber-600 hover:underline">Query</button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-[#1a3a5c] text-white text-xs font-bold rounded hover:bg-[#0f2540]">Save Review</button>
                <button onClick={onOpenParamDetail} className="px-3 py-1.5 text-xs border border-[#1a56db] text-[#1a56db] rounded hover:bg-[#ebf3ff] font-semibold">Open Parameter Detail → M12</button>
                <button onClick={() => setQueryModal('Water Parameters')} className="px-3 py-1.5 text-xs border border-amber-200 rounded text-amber-700 bg-amber-50 hover:bg-amber-100 font-semibold">Raise Query</button>
              </div>
            </>
          )}

          {/* WASTEWATER / DRAINAGE */}
          {activeSection === 'wastewater' && (
            <>
              <h2 className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Wastewater / Drainage</h2>
              <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
                <div className="px-4 py-2 bg-[#f8f9fb] border-b border-[#d1d9e0] grid grid-cols-4 gap-2">
                  {['Field','Status / Value','Source','Officer Finding'].map(h => <p key={h} className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold">{h}</p>)}
                </div>
                <div className="divide-y divide-[#94a3b8]">
                  {[
                    { name:'Wastewater Generated',   val:'Yes — Generated',   src:'Business DNA',   verify:'USER_CONFIRMED',   finding:'not-reviewed' as OfficerReviewState },
                    { name:'Wastewater Context',     val:'Industrial — prototype context', src:'Business DNA', verify:'USER_CONFIRMED', finding:'not-reviewed' as OfficerReviewState },
                    { name:'Drainage Required',      val:'Required',          src:'Business DNA',   verify:'USER_CONFIRMED',   finding:'not-reviewed' as OfficerReviewState },
                    { name:'Drainage Status',        val:'Configured review required', src:'Regulatory Journey', verify:'SYSTEM_VERIFIED', finding:'not-reviewed' as OfficerReviewState },
                    { name:'Construction Context',   val:'Construction + proposed operation', src:'Business DNA', verify:'USER_CONFIRMED', finding:'not-reviewed' as OfficerReviewState },
                  ].map(row => {
                    const key = 'ww_' + row.name
                    const rs = reviewStates[key] ?? row.finding
                    return (
                      <div key={row.name} className="grid grid-cols-4 gap-2 px-4 py-2.5 items-center hover:bg-[#f8f9fb]">
                        <button onClick={onOpenParamDetail} className="text-[11px] font-semibold text-[#1a56db] hover:underline text-left">{row.name}</button>
                        <p className="text-[11px] text-[#1a2533]">{row.val}</p>
                        <p className="text-[10px] text-[#374151]">{row.src} · {row.verify.replace(/_/g,' ')}</p>
                        <div className="flex items-center gap-1"><ReviewBadge state={rs} /><button onClick={() => setQueryModal(row.name)} className="text-[9px] text-amber-600 hover:underline ml-1">Query</button></div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="bg-[#f8f9fb] border border-[#d1d9e0] rounded px-4 py-3 text-[11px]">
                <p className="font-semibold text-[#1a2533] mb-1">NOT_APPLICABLE context</p>
                <p className="text-[#374151]">If Drainage = NOT_APPLICABLE (e.g. water-only project with no drainage configured), no missing-drainage query is raised. NOT_APPLICABLE is not the same as Missing. Conditional drainage fields appear only when the configured regulatory logic activates them.</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-[#1a3a5c] text-white text-xs font-bold rounded hover:bg-[#0f2540]">Save Review</button>
                <button onClick={() => setQueryModal('Wastewater / Drainage')} className="px-3 py-1.5 text-xs border border-amber-200 rounded text-amber-700 bg-amber-50 hover:bg-amber-100 font-semibold">Raise Query</button>
              </div>
            </>
          )}

          {/* UTILITY DOCUMENTS */}
          {activeSection === 'docs' && (
            <>
              <h2 className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Utility Documents</h2>
              <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
                <div className="px-4 py-2 bg-[#f8f9fb] border-b border-[#d1d9e0] grid grid-cols-7 gap-2">
                  {['Document','ID','Category','Ver','Source','Verification','Officer Review'].map(h => <p key={h} className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold">{h}</p>)}
                </div>
                <div className="divide-y divide-[#94a3b8]">
                  {M15_DOCS.map(d => {
                    const key = 'doc_' + d.id
                    const rs = reviewStates[key] ?? d.finding
                    return (
                      <div key={d.id} className="grid grid-cols-7 gap-2 px-4 py-2.5 items-center hover:bg-[#f8f9fb]">
                        <button onClick={onOpenDocReview} className="text-[11px] font-semibold text-[#1a56db] hover:underline text-left">{d.name}</button>
                        <p className="text-[10px] font-mono text-[#374151]">{d.id}</p>
                        <p className="text-[10px] text-[#1a2533]">{d.cat}</p>
                        <p className="text-[10px] text-[#1a2533]">{d.ver}</p>
                        <p className="text-[10px] text-[#374151] truncate">{d.src}</p>
                        <p className={`text-[10px] ${d.verify === 'SELF_DECLARED' ? 'text-amber-700' : 'text-[#1a2533]'}`}>{d.verify.replace(/_/g,' ')}</p>
                        <div className="flex items-center gap-1">
                          <ReviewBadge state={rs} />
                          <button onClick={() => setQueryModal(d.name)} className="text-[9px] text-amber-600 hover:underline shrink-0">Query</button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-[#1a3a5c] text-white text-xs font-bold rounded hover:bg-[#0f2540]">Save Review</button>
                <button onClick={onOpenDocReview} className="px-3 py-1.5 text-xs border border-[#1a56db] text-[#1a56db] rounded hover:bg-[#ebf3ff] font-semibold">Open Document Review → M13</button>
                <button className="px-3 py-1.5 text-xs border border-[#d1d9e0] rounded text-[#1a2533] hover:bg-[#f8f9fb]">Request Additional Evidence</button>
              </div>
            </>
          )}

          {/* DEPENDENCY */}
          {activeSection === 'deps' && (
            <>
              <h2 className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Dependency</h2>
              <p className="text-[10px] text-[#374151] italic">Configured dependencies for this Water / Utility service. The sequence is configurable — utilities may proceed in parallel with conditional NOCs when the configured dependency graph allows it.</p>
              <div className="space-y-3">
                {M15_DEPS.map((d, i) => (
                  <div key={d.name} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full border-2 mt-1 shrink-0 ${d.current ? 'bg-[#1a3a5c] border-[#1a3a5c]' : d.status === 'Completed' ? 'bg-emerald-500 border-emerald-500' : d.status.includes('Parallel') ? 'bg-amber-400 border-amber-400' : 'bg-[#d1d9e0] border-[#d1d9e0]'}`} />
                      {i < M15_DEPS.length - 1 && <div className={`w-0.5 flex-1 my-1 ${d.type.includes('Parallel') ? 'border-l-2 border-dashed border-[#d1d9e0] w-0' : 'bg-[#d1d9e0]'}`} />}
                    </div>
                    <div className={`flex-1 border rounded p-3 mb-2 ${d.current ? 'border-[#1a3a5c] bg-[#ebf3ff]' : 'border-[#d1d9e0] bg-white'}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold text-[#1a2533]">{d.name}</p>
                          <p className="text-[10px] text-[#374151] mt-0.5">{d.type} · Dept: {d.dept}</p>
                          {d.ref && d.ref !== '—' && <p className="text-[10px] text-[#374151]">Ref: {d.ref}</p>}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold border ${d.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : d.current ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : d.status.includes('Parallel') ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-[#f8f9fb] text-[#374151] border-[#d1d9e0]'}`}>{d.status}</span>
                          {d.current && <span className="text-[9px] font-bold text-[#1a56db]">CURRENT</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={onOpenDepView} className="text-[10px] text-[#1a56db] hover:underline font-semibold">View full Dependency Graph → M17</button>
            </>
          )}

          {/* CONSISTENCY CHECKS */}
          {activeSection === 'consistency' && (
            <>
              <h2 className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Consistency Checks</h2>
              <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
                <div className="px-4 py-2 bg-[#f8f9fb] border-b border-[#d1d9e0] grid grid-cols-4 gap-2">
                  {['Field','Application Value','Business DNA Value','Status'].map(h => <p key={h} className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold">{h}</p>)}
                </div>
                <div className="divide-y divide-[#94a3b8]">
                  {M15_CONSISTENCY.map(row => (
                    <div key={row.field} className={`grid grid-cols-4 gap-2 px-4 py-3 items-center ${row.mismatch ? 'bg-amber-50' : ''}`}>
                      <p className="text-[11px] font-semibold text-[#1a2533]">{row.field}</p>
                      <p className="text-[11px] text-[#1a2533]">{row.appVal}</p>
                      <p className="text-[11px] text-emerald-700 font-medium">{row.dnaVal}</p>
                      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold border ${row.mismatch ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>{row.mismatch ? '⚠ MISMATCH' : '✓ MATCH'}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={onOpenConsistency} className="px-3 py-1.5 text-xs border border-[#1a56db] text-[#1a56db] rounded hover:bg-[#ebf3ff] font-semibold">Open Cross-form Consistency → M16</button>
                <button onClick={() => setQueryModal('Consistency check discrepancy')} className="px-3 py-1.5 text-xs border border-amber-200 rounded text-amber-700 bg-amber-50 hover:bg-amber-100 font-semibold">Raise Query</button>
              </div>
            </>
          )}

          {/* PLOT / PROJECT CONTEXT */}
          {activeSection === 'plot' && (
            <>
              <h2 className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Plot / Project Context</h2>
              <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
                <div className="px-4 py-2 bg-[#f8f9fb] border-b border-[#d1d9e0] grid grid-cols-4 gap-2">
                  {['Parameter','Value','Source','Verification'].map(h => <p key={h} className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold">{h}</p>)}
                </div>
                <div className="divide-y divide-[#94a3b8]">
                  {[
                    ['Plot Number',  'A-18',                         'Business DNA',         'USER_CONFIRMED'],
                    ['MIDC Estate',  'Sample Industrial Estate',     'Business DNA',         'SYSTEM_VERIFIED'],
                    ['Plot Area',    '4,800 m²',                     'Master Project Dossier','SYSTEM_VERIFIED'],
                    ['Project Type', 'New Industrial Project',       'Business DNA',         'USER_CONFIRMED'],
                    ['Project Stage','Construction',                  'Business DNA',         'USER_CONFIRMED'],
                    ['Occupancy',    'Industrial / Manufacturing',    'Business DNA',         'USER_CONFIRMED'],
                  ].map(([k,v,src,ver]) => (
                    <div key={k} className="grid grid-cols-4 gap-2 px-4 py-2.5 items-center hover:bg-[#f8f9fb]">
                      <p className="text-[11px] font-semibold text-[#1a2533]">{k}</p>
                      <p className="text-[11px] font-medium text-[#1a2533]">{v}</p>
                      <p className="text-[10px] text-[#374151]">{src}</p>
                      <p className="text-[10px] text-[#1a2533]">{ver.replace(/_/g,' ')}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-[#374151] italic">Context fields — read-only for this service. These are not MIDC Water/Utility decision fields.</p>
            </>
          )}

          {/* PREVIOUS APPROVED DATA */}
          {activeSection === 'previous' && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-sm font-semibold text-[#1a2533]">08 — Previous Approved Data</p>
              <p className="text-xs text-[#374151] mt-1">This is the applicant's first submission for this service. No previous approved data to compare.</p>
              <p className="text-[10px] text-[#6b7280] mt-2 italic">For resubmissions, delta values appear here — open M20 for Delta Re-scrutiny.</p>
            </div>
          )}

          {/* DEFAULT for plan section (not built out) */}
          {activeSection === 'plan' && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-sm font-semibold text-[#1a2533]">{M15_SECTIONS.find(s => s.id === activeSection)?.label}</p>
              <p className="text-xs text-[#374151] mt-1">This section's parameters will be configured in a future phase.</p>
            </div>
          )}
        </main>

        {/* RIGHT */}
        <aside className="w-64 shrink-0 bg-white border-l border-[#d1d9e0] overflow-y-auto" aria-label="Regulatory and source context">
          <div className="px-4 py-2.5 border-b border-[#d1d9e0] bg-[#f8f9fb]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-bold">Regulatory / Source Context</p>
          </div>
          <div className="px-4 py-3 border-b border-[#f0f4f8] space-y-1.5 text-[11px]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Application Context</p>
            {[['State','TECHNICAL_SCRUTINY'],['Route','ENHANCED REVIEW'],['Desk','Utility / Water Scrutiny']].map(([k,v]) => (
              <div key={k} className="flex justify-between gap-2"><span className="text-[#374151]">{k}</span><span className={`font-medium text-right ${k==='Route'?'text-[#1a3a5c]':'text-[#1a2533]'}`}>{v}</span></div>
            ))}
          </div>
          <div className="px-4 py-3 border-b border-[#f0f4f8]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Rule / Requirement</p>
            <p className="text-[11px] text-[#1a2533]">Configured Water / Utility service requirement. Review items must be consistent with Business DNA and submitted application.</p>
            <p className="text-[10px] text-[#374151] mt-1 italic">Source: Configured workflow rule — no official GR cited.</p>
            <button className="mt-2 text-[10px] text-[#1a56db] hover:underline font-semibold">Open Regulatory Reference</button>
            <p className="text-[9px] text-[#6b7280] mt-1 italic">Retrieved regulatory context — not a legal finding.</p>
          </div>
          <div className="px-4 py-3 border-b border-[#f0f4f8]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Regulatory Dependencies</p>
            <p className="text-[9px] text-[#6b7280] mb-2 italic">Configured dependencies for this Water / Utility service</p>
            {M15_DEPS.map(d => (
              <div key={d.name} className="mb-2">
                <p className="text-[10px] font-semibold text-[#1a2533]">{d.name}</p>
                <p className="text-[9px] text-[#374151]">{d.dept} · <span className={d.status === 'Completed' ? 'text-emerald-700' : d.current ? 'text-[#1a3a5c]' : 'text-amber-700'}>{d.status}</span></p>
              </div>
            ))}
            <button onClick={onOpenDepView} className="text-[10px] text-[#1a56db] hover:underline font-semibold">View Dependency Graph → M17</button>
          </div>
          <div className="px-4 py-3">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Officer Notes</p>
            <textarea rows={4} value={officerNote} onChange={e => setOfficerNote(e.target.value)}
              placeholder="Record an observation about this Water / Utility review."
              className="w-full text-xs border border-[#d1d9e0] rounded px-3 py-2 resize-none bg-[#f8f9fb] placeholder-[#b0bcc9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]" />
            <p className="text-[9px] text-[#6b7280] mt-1 italic">Officer observation · Utility / Water Scrutiny Desk · 23 Sep 2026</p>
          </div>
        </aside>
      </div>
    </div>
  )
}

// ─── M16 Cross-form Consistency ──────────────────────────────────────────────



const M16_CONSISTENCY_STATUS: Record<ConsistencyStatus, { icon: string; label: string; textCls: string; bgCls: string; borderCls: string }> = {
  'reference':          { icon:'◆', label:'Reference',        textCls:'text-[#1a3a5c]',  bgCls:'bg-[#ebf3ff]',   borderCls:'border-[#bdd4f5]' },
  'match':              { icon:'✓', label:'Match',            textCls:'text-emerald-700', bgCls:'bg-emerald-50',  borderCls:'border-emerald-200' },
  'mismatch':           { icon:'⚠', label:'Mismatch',        textCls:'text-amber-700',   bgCls:'bg-amber-50',    borderCls:'border-amber-200' },
  'needs-verification': { icon:'○', label:'Needs Verification', textCls:'text-purple-700', bgCls:'bg-purple-50', borderCls:'border-purple-200' },
  'not-applicable':     { icon:'—', label:'Not Applicable',  textCls:'text-[#374151]',  bgCls:'bg-[#f8f9fb]',   borderCls:'border-[#d1d9e0]' },
  'no-data':            { icon:'∅', label:'No Data',         textCls:'text-[#374151]',  bgCls:'bg-[#f8f9fb]',   borderCls:'border-[#d1d9e0]' },
}

const M16_FIELDS: ConsistencyField[] = [
  {
    id:'plot-area', category:'Project / Location', label:'Plot Area', masterValue:'4,800 m²',
    status:'mismatch', difference:'200 m²', affectedRecords:['Fire application','MIDC Building context'],
    records:[
      { source:'Master Project Dossier', dept:'Platform / Master', recordId:'MPD-2026-00418',      value:'4,800 m²', sourceType:'Master Project Dossier',        verify:'SYSTEM_VERIFIED',    version:'MPD v3',   updatedAt:'12 Jan 2026', status:'reference' },
      { source:'MIDC Land',              dept:'MIDC',              recordId:'MIDC-APP-2026-00418',   value:'4,800 m²', sourceType:'MIDC Application',               verify:'DEPARTMENT_VERIFIED',version:'App v2',   updatedAt:'14 Jan 2026', status:'match' },
      { source:'MIDC Building',          dept:'MIDC',              recordId:'MIDC-BLD-2026-00418',   value:'4,800 m²', sourceType:'MIDC Application',               verify:'SYSTEM_VERIFIED',    version:'App v1',   updatedAt:'20 Jan 2026', status:'match' },
      { source:'MPCB',                   dept:'MPCB',              recordId:'MPCB-APP-XXXX',         value:'4,800 m²', sourceType:'External Dept Application',      verify:'DEPARTMENT_VERIFIED',version:'v1',       updatedAt:'18 Jan 2026', status:'match' },
      { source:'Fire',                   dept:'Fire Authority',    recordId:'FIRE-APP-XXXX',         value:'4,600 m²', sourceType:'External Dept Application',      verify:'USER_CONFIRMED',     version:'v1',       updatedAt:'22 Jan 2026', status:'mismatch' },
    ]
  },
  { id:'project-location', category:'Project / Location', label:'Project Location', masterValue:'Sample Industrial Estate', status:'match', records:[
    { source:'Master Project Dossier', dept:'Platform / Master', recordId:'MPD-2026-00418', value:'Sample Industrial Estate', sourceType:'Master Project Dossier', verify:'SYSTEM_VERIFIED',    version:'MPD v3', updatedAt:'12 Jan 2026', status:'reference' },
    { source:'MIDC Land',              dept:'MIDC',              recordId:'MIDC-APP-2026-00418', value:'Sample Industrial Estate', sourceType:'MIDC Application', verify:'DEPARTMENT_VERIFIED', version:'App v2', updatedAt:'14 Jan 2026', status:'match' },
    { source:'MIDC Building',          dept:'MIDC',              recordId:'MIDC-BLD-2026-00418', value:'Sample Industrial Estate', sourceType:'MIDC Application', verify:'SYSTEM_VERIFIED',     version:'App v1', updatedAt:'20 Jan 2026', status:'match' },
  ]},
  { id:'building-area', category:'Building', label:'Building Area', masterValue:'2,300 m²', status:'match', records:[
    { source:'Master Project Dossier', dept:'Platform / Master', recordId:'MPD-2026-00418',   value:'2,300 m²', sourceType:'Master Project Dossier', verify:'USER_CONFIRMED',    version:'MPD v3', updatedAt:'12 Jan 2026', status:'reference' },
    { source:'MIDC Building',          dept:'MIDC',              recordId:'MIDC-BLD-2026-00418', value:'2,300 m²', sourceType:'MIDC Application',  verify:'USER_CONFIRMED',    version:'App v1', updatedAt:'20 Jan 2026', status:'match' },
    { source:'MPCB',                   dept:'MPCB',              recordId:'MPCB-APP-XXXX',     value:'2,300 m²', sourceType:'External Dept Application', verify:'DEPARTMENT_VERIFIED', version:'v1', updatedAt:'18 Jan 2026', status:'match' },
  ]},
  { id:'investment',    category:'Scale', label:'Investment',         masterValue:'Prototype value', status:'needs-verification', records:[
    { source:'Master Project Dossier', dept:'Platform / Master', recordId:'MPD-2026-00418', value:'Prototype value', sourceType:'Master Project Dossier', verify:'SELF_DECLARED', version:'MPD v3', updatedAt:'12 Jan 2026', status:'reference' },
    { source:'MIDC Application',       dept:'MIDC',              recordId:'MIDC-APP-2026-00418', value:'Prototype value', sourceType:'MIDC Application', verify:'SELF_DECLARED', version:'App v2', updatedAt:'14 Jan 2026', status:'needs-verification' },
  ]},
  { id:'employees',     category:'Scale', label:'Employees',          masterValue:'Prototype value', status:'match', records:[
    { source:'Master Project Dossier', dept:'Platform / Master', recordId:'MPD-2026-00418', value:'Prototype value', sourceType:'Master Project Dossier', verify:'USER_CONFIRMED', version:'MPD v3', updatedAt:'12 Jan 2026', status:'reference' },
    { source:'MIDC Application',       dept:'MIDC',              recordId:'MIDC-APP-2026-00418', value:'Prototype value', sourceType:'MIDC Application',  verify:'USER_CONFIRMED', version:'App v2', updatedAt:'14 Jan 2026', status:'match' },
  ]},
  { id:'water-req',     category:'Utilities', label:'Water Requirement',  masterValue:'Yes — MIDC Source', status:'match', records:[
    { source:'Master Project Dossier', dept:'Platform / Master', recordId:'MPD-2026-00418', value:'Yes — MIDC Source', sourceType:'Master Project Dossier', verify:'USER_CONFIRMED',    version:'MPD v3', updatedAt:'12 Jan 2026', status:'reference' },
    { source:'MIDC Water/Utility',     dept:'MIDC',              recordId:'MIDC-APP-2026-00418', value:'Yes — MIDC Source', sourceType:'MIDC Application', verify:'SYSTEM_VERIFIED', version:'App v1', updatedAt:'21 Jan 2026', status:'match' },
    { source:'MPCB',                   dept:'MPCB',              recordId:'MPCB-APP-XXXX',  value:'—', sourceType:'External Dept Application', verify:'DEPARTMENT_VERIFIED', version:'v1', updatedAt:'18 Jan 2026', status:'not-applicable' },
  ]},
  { id:'company',       category:'Business / Identity', label:'Company Identity', masterValue:'Aster Precision Components Pvt. Ltd.', status:'match', records:[
    { source:'Master Business Profile', dept:'Platform / Master', recordId:'MBP-2026-00418', value:'Aster Precision Components Pvt. Ltd.', sourceType:'Master Business Profile', verify:'DEPARTMENT_VERIFIED', version:'MBP v1', updatedAt:'10 Jan 2026', status:'reference' },
    { source:'MIDC Application',       dept:'MIDC',              recordId:'MIDC-APP-2026-00418', value:'Aster Precision Components Pvt. Ltd.', sourceType:'MIDC Application', verify:'SYSTEM_VERIFIED', version:'App v2', updatedAt:'14 Jan 2026', status:'match' },
  ]},
  { id:'project-stage', category:'Project Status', label:'Project Stage', masterValue:'Pre-construction', status:'match', records:[
    { source:'Master Project Dossier', dept:'Platform / Master', recordId:'MPD-2026-00418', value:'Pre-construction', sourceType:'Master Project Dossier', verify:'USER_CONFIRMED', version:'MPD v3', updatedAt:'12 Jan 2026', status:'reference' },
    { source:'MIDC Building',          dept:'MIDC',              recordId:'MIDC-BLD-2026-00418', value:'Pre-construction', sourceType:'MIDC Application', verify:'USER_CONFIRMED', version:'App v1', updatedAt:'20 Jan 2026', status:'match' },
    { source:'MIDC Water/Utility',     dept:'MIDC',              recordId:'MIDC-APP-2026-00418', value:'Construction', sourceType:'MIDC Application',  verify:'USER_CONFIRMED', version:'App v1', updatedAt:'21 Jan 2026', status:'match' },
  ]},
]


export function M16ConsistencyPage({ onBack, onBackToOverview, onOpenParamDetail, onOpenDocReview }: {
  onBack: () => void; onBackToOverview: () => void; onOpenParamDetail?: () => void; onOpenDocReview?: () => void
}) {
  const [selectedField, setSelectedField] = useState<ConsistencyField>(M16_FIELDS[0])
  const [filter, setFilter] = useState<'all'|'mismatch'|'match'|'needs-verification'|'not-applicable'|'resolved'>('all')
  const [activeAction, setActiveAction] = useState<string|null>(null)
  const [lifecycleState, setLifecycleState] = useState<Record<string, MismatchLifecycle>>({})
  const [exceptionNote, setExceptionNote] = useState('')
  const [officerNote, setOfficerNote] = useState('')
  const [queryText, setQueryText] = useState('')

  const totalFields = M16_FIELDS.length
  const countConsistent = M16_FIELDS.filter(f => f.status === 'match').length
  const countMismatch = M16_FIELDS.filter(f => f.status === 'mismatch').length
  const countNeedsVerification = M16_FIELDS.filter(f => f.status === 'needs-verification').length

  const filteredFields = M16_FIELDS.filter(f => {
    if (filter === 'all') return true
    if (filter === 'resolved') return lifecycleState[f.id] === 'resolved' || lifecycleState[f.id] === 'exception-recorded'
    return f.status === filter
  })

  const fieldLCS = selectedField ? lifecycleState[selectedField.id] ?? 'detected' : 'detected'

  const StatusBadge = ({ status }: { status: ConsistencyStatus }) => {
    const m = M16_CONSISTENCY_STATUS[status]
    return <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold border ${m.bgCls} ${m.textCls} ${m.borderCls}`}>{m.icon} {m.label}</span>
  }

  const handleAction = (action: string) => {
    setActiveAction(prev => prev === action ? null : action)
  }

  const commitAction = (action: string) => {
    const next: MismatchLifecycle = action === 'accept' ? 'resolved' : action === 'exception' ? 'exception-recorded' : action === 'query' ? 'query-raised' : 'under-review'
    setLifecycleState(prev => ({ ...prev, [selectedField.id]: next }))
    setActiveAction(null)
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#f8f9fb]">
      {/* Header */}
      <div className="bg-white border-b border-[#d1d9e0] px-5 py-3 shrink-0">
        <Breadcrumb items={[
          { label:'Department Home', onClick: onBackToOverview },
          { label:'Applications',    onClick: onBackToOverview },
          { label:'Application Overview', onClick: onBackToOverview },
          { label:'Scrutiny',        onClick: onBack },
          { label:'Cross-form Consistency' },
        ]} />
        <div className="flex items-start justify-between gap-4 mt-2">
          <div>
            <h1 className="text-base font-bold text-[#1a2533]">Cross-form Consistency <span className="text-[11px] text-[#374151] font-normal ml-2">M16</span></h1>
            <p className="text-[11px] text-[#374151] mt-0.5">Shared-field comparison across applications and records · MIDC-APP-2026-00418</p>
          </div>
          <button onClick={onBack} className="text-xs text-[#1a56db] hover:underline shrink-0">← Scrutiny</button>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-[10px]">
          {[['Application','MIDC-APP-2026-00418'],['Business','Aster Precision Components Pvt. Ltd.'],['Service','Building / Planning'],['State','TECHNICAL_SCRUTINY'],['Desk','Planning / Building Scrutiny'],['SLA','Approaching']].map(([k,v]) => (
            <span key={k} className="text-[#374151]">{k}: <strong className={k==='SLA'?'text-amber-700':'text-[#1a2533]'}>{v}</strong></span>
          ))}
        </div>
      </div>

      {/* Purpose explanation */}
      <div className="bg-[#ebf3ff] border-b border-[#bdd4f5] px-5 py-2 shrink-0">
        <p className="text-[11px] text-[#1a3a5c]"><span className="font-bold">Cross-form consistency</span> compares shared project data across the Master Business Profile, Master Project Dossier and relevant department applications. Values are compared using their source, version and verification state. A mismatch is surfaced for officer review; the system does not silently overwrite or synchronise records.</p>
      </div>

      {/* Summary strip */}
      <div className="bg-[#0f2540] px-5 py-2 flex items-center gap-6 shrink-0 text-[10px]">
        <span className="text-[#8fafd0] font-semibold uppercase tracking-wider">Consistency Summary</span>
        {([['Fields Compared', String(totalFields), 'all'], ['✓ Consistent', String(countConsistent), 'match'], ['⚠ Mismatches', String(countMismatch), 'mismatch'], ['○ Needs Verification', String(countNeedsVerification), 'needs-verification']] as [string,string,string][]).map(([k,v,f]) => (
          <button key={k} onClick={() => setFilter(f as typeof filter)} className={`text-white hover:text-[#8fafd0] transition-colors ${filter === f ? 'underline' : ''}`}>
            <span className="text-[#8fafd0]">{k}: </span><strong>{v}</strong>
          </button>
        ))}
        <button onClick={() => setFilter('all')} className={`ml-2 text-[#8fafd0] hover:text-white text-[9px] ${filter==='all'?'font-bold':''}`}>Show all</button>
        <span className="ml-auto text-[#8fafd0] italic">Sample prototype data — not actual records</span>
      </div>

      {/* Three-column */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT — field navigation */}
        <nav className="w-56 shrink-0 bg-white border-r border-[#d1d9e0] overflow-y-auto" aria-label="Shared fields">
          <div className="px-3 py-2.5 border-b border-[#d1d9e0]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-bold">Shared Fields</p>
            <p className="text-[9px] text-[#6b7280] mt-0.5 italic">Configurable — showing fields relevant to this application</p>
          </div>
          {M16_CATEGORIES.map(cat => {
            const catFields = filteredFields.filter(f => f.category === cat)
            if (!catFields.length) return null
            return (
              <div key={cat}>
                <p className="px-3 pt-2 pb-1 text-[9px] text-[#374151] uppercase tracking-wider font-bold">{cat}</p>
                {catFields.map(f => {
                  const sm = M16_CONSISTENCY_STATUS[f.status]
                  const lcs = lifecycleState[f.id]
                  const active = selectedField?.id === f.id
                  return (
                    <button key={f.id} onClick={() => { setSelectedField(f); setActiveAction(null) }}
                      className={`w-full text-left flex items-center gap-2 px-3 py-2 text-[11px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1a56db] ${active ? 'bg-[#ebf3ff] text-[#1a3a5c] font-semibold' : 'text-[#1a2533] hover:bg-[#f8f9fb]'}`}
                      aria-current={active ? 'page' : undefined}
                    >
                      <span className={`text-[10px] shrink-0 ${sm.textCls}`}>{sm.icon}</span>
                      <span className="leading-tight flex-1">{f.label}</span>
                      {lcs && lcs !== 'detected' && <span className="text-[8px] text-[#374151] shrink-0">{lcs === 'resolved' ? '✓' : lcs === 'exception-recorded' ? 'exc' : lcs === 'query-raised' ? 'Q' : ''}</span>}
                    </button>
                  )
                })}
              </div>
            )
          })}
          <div className="px-3 py-3 border-t border-[#f0f4f8] mt-2">
            <p className="text-[9px] text-[#6b7280] italic">Other configured shared fields may appear based on regulatory journey configuration.</p>
          </div>
        </nav>

        {/* CENTER — comparison table */}
        <main className="flex-1 overflow-y-auto bg-[#f8f9fb] p-5 space-y-4" tabIndex={-1}>
          {selectedField && (
            <>
              {/* Field header */}
              <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
                <div className={`px-4 py-3 flex items-start justify-between gap-4 ${selectedField.status === 'mismatch' ? 'bg-amber-50 border-b border-amber-100' : 'bg-[#f8f9fb] border-b border-[#f0f4f8]'}`}>
                  <div>
                    <p className="text-[9px] text-[#374151] uppercase tracking-wider font-bold mb-0.5">Selected Field — {selectedField.category}</p>
                    <p className="text-base font-bold text-[#1a2533] uppercase tracking-widest">{selectedField.label}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-[11px]">
                      <span className="text-[#374151]">Master value: <strong className="text-[#1a2533]">{selectedField.masterValue}</strong></span>
                      <span className="text-[#374151]">Records: <strong className="text-[#1a2533]">{selectedField.records.length}</strong></span>
                      {selectedField.difference && <span className="text-amber-700">Difference: <strong>{selectedField.difference}</strong></span>}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <StatusBadge status={selectedField.status} />
                    {fieldLCS && fieldLCS !== 'detected' && (
                      <span className="text-[9px] text-[#374151] italic capitalize">{fieldLCS.replace(/-/g,' ')}</span>
                    )}
                    <button onClick={onOpenParamDetail} className="text-[10px] text-[#1a56db] hover:underline font-semibold">View Parameter Detail → M12</button>
                  </div>
                </div>
                {selectedField.status === 'mismatch' && (
                  <div className="px-4 py-2 bg-amber-50 border-b border-amber-100 flex items-center justify-between gap-3">
                    <p className="text-[11px] text-amber-700 font-semibold">⚠ {countMismatch} mismatch requires officer review — {selectedField.affectedRecords?.join(', ')}</p>
                    <p className="text-[10px] text-[#374151] italic">Mismatch detected — officer review required. System does not determine which value is legally correct.</p>
                  </div>
                )}
              </div>

              {/* Comparison table */}
              <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
                <div className="px-4 py-2 bg-[#f8f9fb] border-b border-[#d1d9e0] grid grid-cols-8 gap-2">
                  {['Source / Record','Department','Application / Record ID','Value','Source Type','Verification','Version','Consistency'].map(h =>
                    <p key={h} className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold">{h}</p>
                  )}
                </div>
                <div className="divide-y divide-[#94a3b8]">
                  {selectedField.records.map((row, i) => {
                    const sm = M16_CONSISTENCY_STATUS[row.status]
                    return (
                      <div key={i} className={`grid grid-cols-8 gap-2 px-4 py-3 items-center ${row.status === 'mismatch' ? 'bg-amber-50' : ''}`}>
                        <p className="text-[11px] font-semibold text-[#1a2533]">{row.source}</p>
                        <p className="text-[10px] text-[#374151]">{row.dept}</p>
                        <p className="text-[10px] font-mono text-[#1a2533] truncate">{row.recordId}</p>
                        <p className={`text-[12px] font-bold ${row.status === 'mismatch' ? 'text-amber-700' : row.status === 'reference' ? 'text-[#1a3a5c]' : 'text-[#1a2533]'}`}>{row.value}</p>
                        <p className="text-[10px] text-[#374151]">{row.sourceType}</p>
                        <p className={`text-[10px] ${row.verify === 'SELF_DECLARED' ? 'text-amber-700' : row.verify === 'DEPARTMENT_VERIFIED' ? 'text-emerald-700' : 'text-[#1a2533]'}`}>{row.verify.replace(/_/g,' ')}</p>
                        <p className="text-[10px] text-[#374151]">{row.version}</p>
                        <div className="flex items-center gap-1">
                          <StatusBadge status={row.status} />
                          {row.status === 'mismatch' && <button onClick={onOpenDocReview} className="text-[9px] text-[#1a56db] hover:underline ml-1">Doc</button>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Action bar */}
              <div className="bg-white border border-[#d1d9e0] rounded p-4">
                <p className="text-[9px] text-[#374151] uppercase tracking-wider font-bold mb-3">Officer Actions — {selectedField.label}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <button onClick={() => handleAction('accept')} className={`px-3 py-1.5 text-xs font-bold rounded border transition-colors ${activeAction==='accept' ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'bg-white text-[#1a3a5c] border-[#1a3a5c] hover:bg-[#ebf3ff]'}`}>
                    1. Accept Verified Source
                  </button>
                  <button onClick={() => handleAction('query')} className={`px-3 py-1.5 text-xs font-bold rounded border transition-colors ${activeAction==='query' ? 'bg-amber-600 text-white border-amber-600' : 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'}`}>
                    2. Raise Query → M18
                  </button>
                  <button onClick={() => handleAction('exception')} className={`px-3 py-1.5 text-xs font-bold rounded border transition-colors ${activeAction==='exception' ? 'bg-purple-700 text-white border-purple-700' : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'}`}>
                    3. Record Justified Exception
                  </button>
                  <button onClick={() => handleAction('clarify')} className={`px-3 py-1.5 text-xs font-bold rounded border transition-colors ${activeAction==='clarify' ? 'bg-[#1a56db] text-white border-[#1a56db]' : 'border-[#d1d9e0] text-[#1a2533] hover:bg-[#f8f9fb]'}`}>
                    4. Request Entrepreneur Clarification
                  </button>
                </div>

                {/* Action forms */}
                {activeAction === 'accept' && (
                  <div className="border border-[#1a3a5c] rounded p-3 bg-[#ebf3ff] space-y-2">
                    <p className="text-[11px] font-bold text-[#1a3a5c]">Accept Verified Source — {selectedField.label}</p>
                    <p className="text-[10px] text-[#1a2533]">Accept this source as the relevant verified reference for the current MIDC scrutiny context. This does NOT overwrite another department's record or change Business DNA.</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div><label className="text-[9px] text-[#374151] uppercase font-semibold block mb-1">Selected reference source</label><input defaultValue={selectedField.records.find(r=>r.status==='reference')?.source ?? ''} className="w-full text-xs border border-[#d1d9e0] rounded px-2 py-1 bg-white" /></div>
                      <div><label className="text-[9px] text-[#374151] uppercase font-semibold block mb-1">Reason</label><input placeholder="Officer note" className="w-full text-xs border border-[#d1d9e0] rounded px-2 py-1 bg-white" /></div>
                    </div>
                    <div className="text-[9px] text-[#374151] italic">Audit entry: CNS-2026-3841 · 23/09/2026 · Planning / Building Scrutiny Desk</div>
                    <div className="flex gap-2">
                      <button onClick={() => commitAction('accept')} className="px-3 py-1.5 bg-[#1a3a5c] text-white text-xs font-bold rounded hover:bg-[#0f2540]">Confirm &amp; Create Audit Record</button>
                      <button onClick={() => setActiveAction(null)} className="px-3 py-1.5 text-xs border border-[#d1d9e0] rounded text-[#1a2533]">Cancel</button>
                    </div>
                  </div>
                )}

                {activeAction === 'query' && (
                  <div className="border border-amber-300 rounded p-3 bg-amber-50 space-y-2">
                    <p className="text-[11px] font-bold text-amber-700">Raise Query → M18 Consolidated Query Builder</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div><label className="text-[9px] text-[#374151] uppercase font-semibold block mb-1">Issue</label><input defaultValue={`${selectedField.label} differs between records`} className="w-full text-xs border border-amber-200 rounded px-2 py-1 bg-white" onChange={e => setQueryText(e.target.value)} /></div>
                      <div><label className="text-[9px] text-[#374151] uppercase font-semibold block mb-1">Required clarification</label><input defaultValue="Confirm applicable value and provide supporting evidence" className="w-full text-xs border border-amber-200 rounded px-2 py-1 bg-white" /></div>
                    </div>
                    <div><label className="text-[9px] text-[#374151] uppercase font-semibold block mb-1">Officer comment</label><textarea rows={2} className="w-full text-xs border border-amber-200 rounded px-2 py-1 bg-white resize-none" /></div>
                    <p className="text-[9px] text-[#374151] italic">Deficiency ID DEF-2026-3842 will be created in M18. Type: Data inconsistency · Does not automatically accuse the entrepreneur of an error.</p>
                    <div className="flex gap-2">
                      <button onClick={() => commitAction('query')} className="px-3 py-1.5 bg-amber-600 text-white text-xs font-bold rounded hover:bg-amber-700">Add to M18 Consolidated Query</button>
                      <button onClick={() => setActiveAction(null)} className="px-3 py-1.5 text-xs border border-[#d1d9e0] rounded text-[#1a2533]">Cancel</button>
                    </div>
                  </div>
                )}

                {activeAction === 'exception' && (
                  <div className="border border-purple-200 rounded p-3 bg-purple-50 space-y-2">
                    <p className="text-[11px] font-bold text-purple-700">Record Justified Exception — {selectedField.label}</p>
                    <p className="text-[10px] text-purple-700">Record a documented exception when the discrepancy has a legitimate explanation. The exception remains visible in audit history.</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div><label className="text-[9px] text-[#374151] uppercase font-semibold block mb-1">Exception reason</label><select className="w-full text-xs border border-purple-200 rounded px-2 py-1 bg-white"><option>Different measurement context</option><option>Different application version</option><option>Updated Business DNA</option><option>Pending correction by external dept</option><option>Other configured reason</option></select></div>
                      <div><label className="text-[9px] text-[#374151] uppercase font-semibold block mb-1">Supporting evidence</label><input placeholder="Reference / document ID" className="w-full text-xs border border-purple-200 rounded px-2 py-1 bg-white" /></div>
                    </div>
                    <div><label className="text-[9px] text-[#374151] uppercase font-semibold block mb-1">Officer note</label><textarea rows={2} value={exceptionNote} onChange={e => setExceptionNote(e.target.value)} className="w-full text-xs border border-purple-200 rounded px-2 py-1 bg-white resize-none" placeholder="Explain the justified exception" /></div>
                    <p className="text-[9px] text-[#374151] italic">Exception ID EXC-2026-3843 · Audit record will be created · Previous values preserved.</p>
                    <div className="flex gap-2">
                      <button onClick={() => commitAction('exception')} className="px-3 py-1.5 bg-purple-700 text-white text-xs font-bold rounded hover:bg-purple-800">Record Exception &amp; Create Audit Entry</button>
                      <button onClick={() => setActiveAction(null)} className="px-3 py-1.5 text-xs border border-[#d1d9e0] rounded text-[#1a2533]">Cancel</button>
                    </div>
                  </div>
                )}

                {activeAction === 'clarify' && (
                  <div className="border border-[#d1d9e0] rounded p-3 bg-white space-y-2">
                    <p className="text-[11px] font-bold text-[#1a2533]">Request Entrepreneur Clarification — {selectedField.label}</p>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div><p className="text-[#374151]">Field</p><p className="font-semibold">{selectedField.label}</p></div>
                      <div><p className="text-[#374151]">Conflicting values</p>{selectedField.records.filter(r=>r.status==='mismatch').map(r=><p key={r.source} className="font-semibold text-amber-700">{r.source}: {r.value}</p>)}</div>
                    </div>
                    <div><label className="text-[9px] text-[#374151] uppercase font-semibold block mb-1">Question to entrepreneur</label><input defaultValue={`Please clarify the applicable ${selectedField.label} and provide supporting evidence for each record.`} className="w-full text-xs border border-[#d1d9e0] rounded px-2 py-1" /></div>
                    <div><label className="text-[9px] text-[#374151] uppercase font-semibold block mb-1">Supporting evidence requested</label><input defaultValue="Updated allotment record or certified measurement" className="w-full text-xs border border-[#d1d9e0] rounded px-2 py-1" /></div>
                    <p className="text-[9px] text-[#374151] italic">Flows into existing query/response lifecycle → M18 → M19.</p>
                    <div className="flex gap-2">
                      <button onClick={() => commitAction('clarify')} className="px-3 py-1.5 bg-[#1a56db] text-white text-xs font-bold rounded hover:bg-[#1a3a5c]">Send to M18 Query Builder</button>
                      <button onClick={() => setActiveAction(null)} className="px-3 py-1.5 text-xs border border-[#d1d9e0] rounded text-[#1a2533]">Cancel</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Version context */}
              <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
                <div className="px-4 py-2 bg-[#f8f9fb] border-b border-[#d1d9e0]">
                  <p className="text-[9px] text-[#374151] uppercase tracking-wider font-bold">Version / Submission Context</p>
                </div>
                <div className="divide-y divide-[#94a3b8]">
                  {selectedField.records.map((row, i) => (
                    <div key={i} className="grid grid-cols-5 gap-2 px-4 py-2 items-center text-[11px]">
                      <p className="font-semibold text-[#1a2533]">{row.source}</p>
                      <p className="text-[#1a2533]">{row.value}</p>
                      <p className="text-[#374151]">{row.version}</p>
                      <p className="text-[#374151]">{row.updatedAt}</p>
                      <p className={row.verify === 'SELF_DECLARED' ? 'text-amber-700' : row.verify === 'DEPARTMENT_VERIFIED' ? 'text-emerald-700' : 'text-[#1a2533]'}>{row.verify.replace(/_/g,' ')}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-[10px] text-[#6b7280] italic">Delta resubmission changes → Open M20 Delta Re-scrutiny · Dependency impact → M17</p>
            </>
          )}
        </main>

        {/* RIGHT — mismatch detail / provenance / officer context */}
        <aside className="w-64 shrink-0 bg-white border-l border-[#d1d9e0] overflow-y-auto" aria-label="Mismatch detail and provenance">
          <div className="px-4 py-2.5 border-b border-[#d1d9e0] bg-[#f8f9fb]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-bold">Mismatch Detail &amp; Provenance</p>
          </div>

          {selectedField && (
            <>
              {/* Field summary */}
              <div className="px-4 py-3 border-b border-[#f0f4f8] space-y-1.5">
                <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-2">{selectedField.label}</p>
                <div className="flex justify-between items-center"><span className="text-[11px] text-[#374151]">Status</span><StatusBadge status={selectedField.status} /></div>
                <div className="flex justify-between"><span className="text-[11px] text-[#374151]">Master value</span><span className="text-[11px] font-bold text-[#1a3a5c]">{selectedField.masterValue}</span></div>
                <div className="flex justify-between"><span className="text-[11px] text-[#374151]">Records compared</span><span className="text-[11px] text-[#1a2533]">{selectedField.records.length}</span></div>
                {selectedField.difference && <div className="flex justify-between"><span className="text-[11px] text-[#374151]">Difference</span><span className="text-[11px] font-bold text-amber-700">{selectedField.difference}</span></div>}
              </div>

              {/* Mismatch detail */}
              {selectedField.status === 'mismatch' && (
                <div className="px-4 py-3 border-b border-[#f0f4f8]">
                  <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Conflicting Values</p>
                  {selectedField.records.filter(r => r.status === 'mismatch').map(r => (
                    <div key={r.source} className="bg-amber-50 border border-amber-200 rounded p-2 mb-2">
                      <p className="text-[11px] font-bold text-amber-700">{r.source}</p>
                      <p className="text-[12px] font-bold text-amber-800">{r.value}</p>
                      <p className="text-[10px] text-[#374151]">{r.dept} · {r.verify.replace(/_/g,' ')}</p>
                    </div>
                  ))}
                  <p className="text-[9px] text-[#6b7280] italic">Mismatch detected — officer review required. System does not automatically determine which value is legally correct.</p>
                  <p className="text-[10px] text-[#1a2533] mt-2">Why: <span className="text-[#374151]">Reason not established — officer review required.</span></p>
                  {selectedField.affectedRecords && (
                    <div className="mt-2">
                      <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Potentially affected</p>
                      {selectedField.affectedRecords.map(r => <p key={r} className="text-[10px] text-[#1a2533]">· {r}</p>)}
                      <p className="text-[10px] text-[#374151] mt-1 italic">Dependency impact not automatically determined — officer review required.</p>
                    </div>
                  )}
                </div>
              )}

              {/* External dept boundary notice */}
              {selectedField.records.some(r => r.dept !== 'MIDC' && r.dept !== 'Platform / Master' && r.status === 'mismatch') && (
                <div className="px-4 py-3 border-b border-[#f0f4f8]">
                  <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-1">External Department Boundary</p>
                  <p className="text-[10px] text-[#1a2533]">MIDC may view, identify and raise a query. MIDC may NOT edit the external department's application, change their value, or force synchronisation.</p>
                </div>
              )}

              {/* Lifecycle state */}
              <div className="px-4 py-3 border-b border-[#f0f4f8]">
                <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Lifecycle State</p>
                {(['detected','under-review','query-raised','exception-recorded','resolved'] as MismatchLifecycle[]).map((s, i) => (
                  <div key={s} className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${fieldLCS === s ? 'bg-[#1a3a5c]' : s === 'resolved' || s === 'exception-recorded' ? (fieldLCS === s ? 'bg-emerald-500' : 'bg-[#d1d9e0]') : 'bg-[#d1d9e0]'}`} />
                    <p className={`text-[10px] ${fieldLCS === s ? 'font-bold text-[#1a3a5c]' : 'text-[#374151]'} capitalize`}>{s.replace(/-/g,' ')}</p>
                  </div>
                ))}
              </div>

              {/* Officer notes */}
              <div className="px-4 py-3">
                <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Officer Notes</p>
                <textarea rows={3} value={officerNote} onChange={e => setOfficerNote(e.target.value)}
                  placeholder="Record an observation about this consistency issue."
                  className="w-full text-xs border border-[#d1d9e0] rounded px-3 py-2 resize-none bg-[#f8f9fb] placeholder-[#b0bcc9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]" />
                <p className="text-[9px] text-[#6b7280] mt-1 italic">Officer observation · 23 Sep 2026</p>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  )
}

// ─── M17 Regulatory Dependency View ──────────────────────────────────────────

type DepNodeType   = 'midc' | 'external' | 'milestone'


const M17_NODE_STATUS: Record<DepNodeStatus, { dot: string; textCls: string; bgCls: string; borderCls: string; label: string }> = {
  completed:   { dot:'bg-emerald-500',  textCls:'text-emerald-700', bgCls:'bg-emerald-50',  borderCls:'border-emerald-200', label:'Completed'  },
  current:     { dot:'bg-[#1a3a5c]',    textCls:'text-white',       bgCls:'bg-[#1a3a5c]',   borderCls:'border-[#1a3a5c]',   label:'Current'    },
  ready:       { dot:'bg-[#1a56db]',    textCls:'text-[#1a56db]',   bgCls:'bg-[#ebf3ff]',   borderCls:'border-[#bdd4f5]',   label:'Ready'      },
  pending:     { dot:'bg-amber-400',    textCls:'text-amber-700',   bgCls:'bg-amber-50',    borderCls:'border-amber-200',   label:'Pending'    },
  blocked:     { dot:'bg-red-400',      textCls:'text-red-700',     bgCls:'bg-red-50',      borderCls:'border-red-200',     label:'Blocked'    },
  conditional: { dot:'bg-purple-400',   textCls:'text-purple-700',  bgCls:'bg-purple-50',   borderCls:'border-purple-200',  label:'Conditional'},
  parallel:    { dot:'bg-[#6b7a8d]',    textCls:'text-[#1a2533]',   bgCls:'bg-[#f8f9fb]',   borderCls:'border-[#d1d9e0]',   label:'Parallel'   },
}

const M17_NODES: DepNode[] = [
  { id:'land',    label:'MIDC Land / Plot Context',      dept:'MIDC',              type:'midc',     status:'completed',   ref:'MIDC-APP-2026-00418-LAND', relationship:'Upstream / MIDC Controlled', blocking:false   },
  { id:'mpcb',    label:'MPCB Consent to Establish',     dept:'MPCB',              type:'external', status:'completed',   ref:'MPCB-CTE-2026-XXXX',       relationship:'External / Upstream',         blocking:false   },
  { id:'bldg',    label:'MIDC Building / Planning',      dept:'MIDC',              type:'midc',     status:'current',     ref:'MIDC-APP-2026-00418',       relationship:'MIDC Controlled / Current',   blocking:false, children:['fire','water','construction'] },
  { id:'fire',    label:'Provisional Fire NOC',          dept:'Fire Authority',    type:'external', status:'conditional', ref:'—',                         relationship:'Conditional / Downstream',    blocking:false, unlockCondition:'Building / Planning reaches configured required state' },
  { id:'water',   label:'MIDC Water / Utility',         dept:'MIDC',              type:'midc',     status:'ready',       ref:'—',                         relationship:'Parallel / Downstream',       blocking:false, unlockCondition:'Building / Planning approved; may proceed in parallel per config' },
  { id:'cond-noc',label:'Conditional NOC(s)',            dept:'Configured Authority',type:'external',status:'blocked',   ref:'—',                         relationship:'Conditional',                 blocking:true,  unlockCondition:'Upstream configured dependencies satisfied' },
  { id:'construction',label:'Construction',             dept:'Entrepreneur',       type:'milestone',status:'blocked',    ref:'—',                         relationship:'Downstream Milestone',        blocking:true,  unlockCondition:'Building / Planning, Fire NOC and configured utilities complete' },
  { id:'preop',   label:'Pre-operation Approvals',      dept:'Multiple',           type:'milestone',status:'blocked',    ref:'—',                         relationship:'Downstream Milestone',        blocking:true,  unlockCondition:'Construction milestone reached + configured upstream requirements' },
]

const M17_CURRENT        = M17_NODES.find(n => n.id === 'bldg')!
const M17_PARALLEL       = M17_NODES.filter(n => n.id === 'water')
const M17_CONDITIONAL    = M17_NODES.filter(n => n.id === 'fire' || n.id === 'cond-noc')
const M17_DOWNSTREAM     = M17_NODES.filter(n => n.id === 'construction' || n.id === 'preop')
const M17_BLOCKED        = M17_NODES.filter(n => n.status === 'blocked')
const M17_UNLOCKS        = M17_NODES.filter(n => n.id === 'water' || n.id === 'construction' || n.id === 'fire')

export function M17DependencyViewPage({ onBack, onBackToOverview }: { onBack: () => void; onBackToOverview: () => void }) {
  const [selectedNode, setSelectedNode] = useState<DepNode | null>(null)
  const [activeTab, setActiveTab]       = useState<'prerequisites'|'parallel'|'downstream'|'blocked'|'unlocks'>('prerequisites')

  const NodeCard = ({ node, compact = false }: { node: DepNode; compact?: boolean }) => {
    const sm  = M17_NODE_STATUS[node.status as DepNodeStatus]
    const sel = selectedNode?.id === node.id
    return (
      <button onClick={() => setSelectedNode(sel ? null : node)}
        className={`w-full text-left border rounded p-3 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db] ${sel ? 'ring-2 ring-[#1a56db]' : ''} ${node.status === 'current' ? 'bg-[#0f2540] border-[#1a3a5c]' : `${sm.bgCls} ${sm.borderCls}`}`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2">
            <div className={`w-2.5 h-2.5 rounded-full shrink-0 mt-0.5 ${sm.dot}`} />
            <div>
              <p className={`text-[11px] font-bold leading-tight ${node.status === 'current' ? 'text-white' : 'text-[#1a2533]'}`}>{node.label}</p>
              {!compact && <p className={`text-[10px] mt-0.5 ${node.status === 'current' ? 'text-[#8fafd0]' : 'text-[#374151]'}`}>{node.dept} · {node.relationship}</p>}
            </div>
          </div>
          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-bold border shrink-0 ${node.status === 'current' ? 'bg-white text-[#1a3a5c] border-white' : `${sm.bgCls} ${sm.textCls} ${sm.borderCls}`}`}>{sm.label}</span>
        </div>
        {!compact && node.ref && node.ref !== '—' && <p className={`text-[9px] mt-1.5 font-mono ${node.status === 'current' ? 'text-[#8fafd0]' : 'text-[#374151]'}`}>Ref: {node.ref}</p>}
        {!compact && node.blocking && <p className="text-[9px] text-red-600 mt-1">● Configured dependency blocking downstream</p>}
      </button>
    )
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#f8f9fb]">
      {/* Header */}
      <div className="bg-white border-b border-[#d1d9e0] px-5 py-3 shrink-0">
        <Breadcrumb items={[
          { label:'Department Home', onClick: onBackToOverview },
          { label:'Applications',    onClick: onBackToOverview },
          { label:'Application Overview', onClick: onBackToOverview },
          { label:'Scrutiny',        onClick: onBack },
          { label:'Regulatory Dependency View' },
        ]} />
        <div className="flex items-start justify-between gap-4 mt-2">
          <div>
            <h1 className="text-base font-bold text-[#1a2533]">Regulatory Dependency View <span className="text-[11px] text-[#374151] font-normal ml-2">M17</span></h1>
            <p className="text-[11px] text-[#374151] mt-0.5">Configured regulatory journey · MIDC-APP-2026-00418 · Building / Planning (current node)</p>
          </div>
          <button onClick={onBack} className="text-xs text-[#1a56db] hover:underline shrink-0">← Scrutiny</button>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-[10px]">
          {[['Application','MIDC-APP-2026-00418'],['Business','Aster Precision Components Pvt. Ltd.'],['Service','Building / Planning'],['State','TECHNICAL_SCRUTINY'],['Payment','PAID'],['Desk','Planning / Building Scrutiny'],['SLA','Approaching']].map(([k,v]) => (
            <span key={k} className="text-[#374151]">{k}: <strong className={k==='SLA'?'text-amber-700':k==='Payment'?'text-emerald-700':'text-[#1a2533]'}>{v}</strong></span>
          ))}
        </div>
      </div>

      {/* Purpose panel */}
      <div className="bg-[#ebf3ff] border-b border-[#bdd4f5] px-5 py-2 shrink-0">
        <p className="text-[11px] text-[#1a3a5c]">
          <span className="font-bold">Regulatory Dependency View</span> — Shows how the current MIDC service relates to other configured regulatory requirements in the project journey. Dependencies are configuration-driven. External department records are visible as context; MIDC cannot approve, reject or modify another department's decision.
          <span className="ml-2 italic text-[#1a2533]">Payment / challan timing is controlled separately by service workflow configuration and is not a regulatory dependency node.</span>
        </p>
      </div>

      {/* Summary bar */}
      <div className="bg-[#0f2540] px-5 py-2 flex items-center gap-6 shrink-0 text-[10px]">
        <span className="text-[#8fafd0] font-semibold uppercase tracking-wider">Dependency Summary</span>
        {[['Prerequisites','2'],['Current Node','1'],['Parallel','1'],['Conditional','2'],['Blocked','2']].map(([k,v]) => (
          <span key={k} className="text-white"><span className="text-[#8fafd0]">{k}: </span><strong>{v}</strong></span>
        ))}
        <span className="ml-auto text-[#8fafd0] italic">Configurable dependency graph — baseline prototype journey</span>
      </div>

      {/* Main layout: graph + detail */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT — vertical dependency graph */}
        <div className="w-72 shrink-0 bg-white border-r border-[#d1d9e0] overflow-y-auto" aria-label="Dependency graph">
          <div className="px-3 py-2.5 border-b border-[#d1d9e0]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-bold">A – Z Regulatory Journey</p>
            <p className="text-[9px] text-[#6b7280] italic mt-0.5">Baseline prototype. Actual graph from configured dependencies.</p>
          </div>
          <div className="p-3 space-y-1">
            {/* LAND */}
            <NodeCard node={M17_NODES[0]} />
            <div className="flex justify-center"><div className="w-0.5 h-4 bg-[#d1d9e0]" /></div>
            {/* MPCB */}
            <NodeCard node={M17_NODES[1]} />
            <div className="flex justify-center"><div className="w-0.5 h-4 bg-[#d1d9e0]" /></div>
            {/* CURRENT — Building/Planning */}
            <NodeCard node={M17_NODES[2]} />
            {/* Fork visual */}
            <div className="relative flex justify-center pt-1">
              <div className="w-0.5 h-3 bg-[#d1d9e0]" />
            </div>
            <div className="flex items-start gap-2 pl-2">
              <div className="flex flex-col items-end pt-1 w-1/2">
                <div className="w-full h-0.5 bg-[#d1d9e0]" />
                <div className="w-0.5 h-3 bg-[#d1d9e0] ml-auto" />
                <NodeCard node={M17_NODES[3]} compact />
              </div>
              <div className="w-0.5 h-16 bg-[#d1d9e0] shrink-0 mt-1" />
              <div className="flex flex-col pt-1 w-1/2">
                <div className="w-full h-0.5 bg-[#d1d9e0]" />
                <div className="w-0.5 h-3 bg-[#d1d9e0]" />
                <NodeCard node={M17_NODES[4]} compact />
              </div>
            </div>
            <div className="flex justify-center mt-1"><div className="w-0.5 h-4 bg-[#d1d9e0]" /></div>
            <NodeCard node={M17_NODES[5]} compact />
            <div className="flex justify-center"><div className="w-0.5 h-4 bg-[#d1d9e0]" /></div>
            <NodeCard node={M17_NODES[6]} compact />
            <div className="flex justify-center"><div className="w-0.5 h-4 bg-[#d1d9e0]" /></div>
            <NodeCard node={M17_NODES[7]} compact />

            <div className="pt-3 border-t border-[#f0f4f8] mt-3">
              <p className="text-[9px] text-[#6b7280] italic">Legend</p>
              <div className="mt-1 space-y-1">
                {Object.entries(M17_NODE_STATUS).map(([k, v]) => (
                  <div key={k} className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${v.dot}`} />
                    <p className="text-[9px] text-[#374151]">{v.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CENTER — tabbed dependency sections */}
        <main className="flex-1 overflow-y-auto bg-[#f8f9fb] p-5 space-y-4" tabIndex={-1}>
          {/* Tab bar */}
          <div className="flex gap-0 border border-[#d1d9e0] rounded overflow-hidden bg-white shrink-0">
            {([['prerequisites','Prerequisites'],['parallel','Parallel / Conditional'],['downstream','Downstream'],['blocked','Blocked'],['unlocks','Unlocks']] as [typeof activeTab, string][]).map(([tab, label]) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex-1 text-[10px] font-semibold py-2 px-2 transition-colors border-r last:border-r-0 border-[#d1d9e0] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1a56db] ${activeTab === tab ? 'bg-[#1a3a5c] text-white' : 'text-[#1a2533] hover:bg-[#f8f9fb]'}`}
              >{label}</button>
            ))}
          </div>

          {/* PREREQUISITES */}
          {activeTab === 'prerequisites' && (
            <>
              <h2 className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Prerequisites</h2>
              <div className="bg-[#ebf3ff] border border-[#bdd4f5] rounded px-4 py-2 text-xs text-[#1a3a5c]">ℹ MIDC may view prerequisite references and use their status as context. MIDC may NOT approve, reject, or modify another department's decision.</div>
              <div className="space-y-3">
                {M17_PREREQUISITES.map(node => {
                  const sm = M17_NODE_STATUS[node.status as DepNodeStatus]
                  return (
                    <div key={node.id} className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
                      <div className="px-4 py-3 border-b border-[#f0f4f8] flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full ${sm.dot}`} />
                          <p className="text-xs font-bold text-[#1a2533]">{node.label}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold border ${sm.bgCls} ${sm.textCls} ${sm.borderCls}`}>{sm.label}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 px-4 py-3 text-[11px]">
                        <div><p className="text-[#374151]">Department</p><p className="font-semibold text-[#1a2533]">{node.dept}</p></div>
                        <div><p className="text-[#374151]">Relationship</p><p className="font-semibold text-[#1a2533]">{node.relationship}</p></div>
                        <div><p className="text-[#374151]">Blocking State</p><p className="font-semibold text-emerald-700">Satisfied</p></div>
                        {node.ref && node.ref !== '—' && <div><p className="text-[#374151]">Reference</p><p className="font-mono text-[10px] text-[#1a2533]">{node.ref}</p></div>}
                      </div>
                      {node.type === 'external' && (
                        <div className="px-4 py-2 border-t border-[#f0f4f8] bg-[#f8f9fb]">
                          <p className="text-[10px] text-[#374151] italic">External department — MIDC may view reference only. No MIDC controls to approve / modify {node.dept} decisions.</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {/* PARALLEL / CONDITIONAL */}
          {activeTab === 'parallel' && (
            <>
              <h2 className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Parallel / Conditional Services</h2>
              <p className="text-[10px] text-[#374151] italic">Not every regulatory process is strictly serial. Parallel and conditional relationships come from configured dependency rules.</p>
              <div className="space-y-3">
                {[...M17_PARALLEL, ...M17_CONDITIONAL].map(node => {
                  const sm = M17_NODE_STATUS[node.status]
                  return (
                    <div key={node.id} className={`bg-white border rounded overflow-hidden ${sm.borderCls}`}>
                      <div className="px-4 py-3 border-b border-[#f0f4f8] flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full ${sm.dot}`} />
                          <p className="text-xs font-bold text-[#1a2533]">{node.label}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold border ${sm.bgCls} ${sm.textCls} ${sm.borderCls}`}>{sm.label}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 px-4 py-3 text-[11px]">
                        <div><p className="text-[#374151]">Department</p><p className="font-semibold text-[#1a2533]">{node.dept}</p></div>
                        <div><p className="text-[#374151]">Relationship</p><p className="font-semibold text-[#1a2533]">{node.relationship}</p></div>
                        <div><p className="text-[#374151]">Blocking</p><p className={`font-semibold ${node.blocking ? 'text-red-700' : 'text-emerald-700'}`}>{node.blocking ? 'Yes — see Blocked tab' : 'No'}</p></div>
                      </div>
                      {node.unlockCondition && (
                        <div className="px-4 py-2 border-t border-[#f0f4f8] bg-[#f8f9fb]">
                          <p className="text-[10px] text-[#1a2533]"><span className="font-semibold">Unlock / activation condition:</span> {node.unlockCondition}</p>
                          <p className="text-[9px] text-[#6b7280] italic mt-0.5">Configured dependency rule — not a universal legal requirement.</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {/* DOWNSTREAM */}
          {activeTab === 'downstream' && (
            <>
              <h2 className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Downstream Requirements</h2>
              <p className="text-[10px] text-[#374151] italic">Services and milestones that depend on the current MIDC node. Configured dependency rules determine blocking relationships.</p>
              <div className="space-y-3">
                {M17_DOWNSTREAM.map(node => {
                  const sm = M17_NODE_STATUS[node.status]
                  return (
                    <div key={node.id} className={`bg-white border rounded overflow-hidden ${sm.borderCls}`}>
                      <div className="px-4 py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full ${sm.dot}`} />
                          <p className="text-xs font-bold text-[#1a2533]">{node.label}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold border ${sm.bgCls} ${sm.textCls} ${sm.borderCls}`}>{sm.label}</span>
                      </div>
                      {node.unlockCondition && (
                        <div className="px-4 py-2 border-t border-[#f0f4f8] bg-[#f8f9fb]">
                          <p className="text-[10px] text-[#1a2533]"><span className="font-semibold text-[#1a2533]">Reason / Configured dependency:</span> {node.unlockCondition}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {/* BLOCKED */}
          {activeTab === 'blocked' && (
            <>
              <h2 className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Currently Blocked</h2>
              <div className="space-y-3">
                {M17_BLOCKED.map(node => {
                  const sm = M17_NODE_STATUS[node.status]
                  return (
                    <div key={node.id} className="bg-white border border-red-100 rounded overflow-hidden">
                      <div className="px-4 py-3 border-b border-[#f0f4f8] flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full ${sm.dot}`} />
                          <p className="text-xs font-bold text-[#1a2533]">{node.label}</p>
                        </div>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold border bg-red-50 text-red-700 border-red-200">Blocked</span>
                      </div>
                      <div className="px-4 py-3 grid grid-cols-2 gap-4 text-[11px]">
                        <div><p className="text-[#374151]">Department</p><p className="font-semibold text-[#1a2533]">{node.dept}</p></div>
                        <div><p className="text-[#374151]">Upstream dependency</p><p className="font-semibold text-[#1a2533]">MIDC Building / Planning (Current)</p></div>
                      </div>
                      {node.unlockCondition && (
                        <div className="px-4 py-2 border-t border-[#f0f4f8] bg-red-50">
                          <p className="text-[10px] text-red-700"><span className="font-semibold">Configured unlock condition:</span> {node.unlockCondition}</p>
                          <p className="text-[9px] text-[#6b7280] italic mt-0.5">Configured dependency rule. Does not automatically invalidate any existing approvals.</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
              <div className="bg-[#f8f9fb] border border-[#d1d9e0] rounded px-4 py-3 text-[11px]">
                <p className="font-semibold text-[#1a2533] mb-1">Entrepreneur Actions Required</p>
                <ul className="space-y-1 text-[#1a2533]">
                  <li>· Complete Building / Planning scrutiny response (if query raised)</li>
                  <li>· Await MIDC Building / Planning decision before downstream services activate</li>
                  <li>· Ensure MPCB CTE reference remains valid (external — entrepreneur to monitor)</li>
                </ul>
                <p className="text-[9px] text-[#6b7280] italic mt-2">Only actions blocking the current journey are shown here.</p>
              </div>
            </>
          )}

          {/* UNLOCKS */}
          {activeTab === 'unlocks' && (
            <>
              <h2 className="text-xs font-bold text-[#1a2533] uppercase tracking-wider">Unlocks — Potential Downstream Availability</h2>
              <div className="bg-amber-50 border border-amber-200 rounded px-4 py-2 text-xs text-amber-700">
                <span className="font-semibold">Important:</span> Approval of the current MIDC application does NOT automatically guarantee another department's approval. Services shown below may become available or eligible according to configured dependency rules.
              </div>
              <div className="space-y-3">
                {M17_UNLOCKS.map(node => {
                  const sm = M17_NODE_STATUS[node.status]
                  return (
                    <div key={node.id} className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
                      <div className="px-4 py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full ${sm.dot}`} />
                          <p className="text-xs font-bold text-[#1a2533]">{node.label}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold border ${sm.bgCls} ${sm.textCls} ${sm.borderCls}`}>Currently: {sm.label}</span>
                      </div>
                      {node.unlockCondition && (
                        <div className="px-4 py-2 border-t border-[#f0f4f8] bg-[#f8f9fb]">
                          <p className="text-[10px] text-[#1a2533]"><span className="font-semibold">Unlock condition:</span> {node.unlockCondition}</p>
                          <p className="text-[9px] text-[#6b7280] italic mt-0.5">May become available / eligible according to configured dependency rules.</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </main>

        {/* RIGHT — selected node detail + context */}
        <aside className="w-64 shrink-0 bg-white border-l border-[#d1d9e0] overflow-y-auto" aria-label="Node detail and regulatory context">
          <div className="px-4 py-2.5 border-b border-[#d1d9e0] bg-[#f8f9fb]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-bold">{selectedNode ? 'Selected Node' : 'Current Node'}</p>
          </div>

          {/* Current node always shown */}
          {!selectedNode && (
            <div className="px-4 py-3 bg-[#0f2540] border-b border-[#1a3a5c]">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2.5 h-2.5 rounded-full bg-white" />
                <p className="text-[11px] font-bold text-white">{M17_CURRENT.label}</p>
              </div>
              <p className="text-[10px] text-[#8fafd0]">MIDC Controlled · Current</p>
              {[['State','TECHNICAL_SCRUTINY'],['Route','ENHANCED REVIEW'],['Desk','Planning / Building Scrutiny'],['Payment','PAID'],['Ref',M17_CURRENT.ref ?? '']].map(([k,v]) => (
                <div key={k} className="flex justify-between mt-1"><span className="text-[10px] text-[#8fafd0]">{k}</span><span className={`text-[10px] font-bold ${k==='Payment'?'text-emerald-400':'text-white'}`}>{v}</span></div>
              ))}
              <p className="text-[9px] text-[#8fafd0] italic mt-2">Click any node in the graph to see its detail.</p>
            </div>
          )}

          {selectedNode && (() => {
            const sm = M17_NODE_STATUS[selectedNode.status]
            return (
              <div className={`border-b border-[#f0f4f8] ${selectedNode.status === 'current' ? 'bg-[#0f2540]' : ''}`}>
                <div className="px-4 py-3 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-[11px] font-bold ${selectedNode.status === 'current' ? 'text-white' : 'text-[#1a2533]'}`}>{selectedNode.label}</p>
                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-bold border ${selectedNode.status === 'current' ? 'bg-white text-[#1a3a5c] border-white' : `${sm.bgCls} ${sm.textCls} ${sm.borderCls}`}`}>{sm.label}</span>
                  </div>
                  {[['Department', selectedNode.dept], ['Relationship', selectedNode.relationship], ['Reference', selectedNode.ref ?? '—']].map(([k,v]) => (
                    <div key={k} className="flex justify-between gap-2">
                      <span className={`text-[10px] ${selectedNode.status === 'current' ? 'text-[#8fafd0]' : 'text-[#374151]'}`}>{k}</span>
                      <span className={`text-[10px] font-semibold text-right ${selectedNode.status === 'current' ? 'text-white' : 'text-[#1a2533]'}`}>{v}</span>
                    </div>
                  ))}
                  {selectedNode.unlockCondition && (
                    <div className="pt-1 border-t border-[#1a3a5c]/20">
                      <p className={`text-[9px] ${selectedNode.status === 'current' ? 'text-[#8fafd0]' : 'text-[#374151]'} uppercase tracking-wider font-semibold mb-1`}>Unlock Condition</p>
                      <p className={`text-[10px] ${selectedNode.status === 'current' ? 'text-[#8fafd0]' : 'text-[#1a2533]'}`}>{selectedNode.unlockCondition}</p>
                    </div>
                  )}
                  {selectedNode.type === 'external' && (
                    <div className="pt-1 border-t border-[#d1d9e0]">
                      <p className="text-[9px] text-[#374151] italic">External dept · MIDC view only · No MIDC decision controls</p>
                    </div>
                  )}
                  <button onClick={() => setSelectedNode(null)} className="text-[9px] text-[#1a56db] hover:underline mt-1">Clear selection</button>
                </div>
              </div>
            )
          })()}

          {/* Payment context — separate from regulatory deps */}
          <div className="px-4 py-3 border-b border-[#f0f4f8]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Payment / Challan State</p>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#1a2533]">Payment</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold border bg-emerald-50 text-emerald-700 border-emerald-200">PAID</span>
            </div>
            <p className="text-[9px] text-[#6b7280] italic mt-1.5">Payment state is managed separately from regulatory dependencies. It is not a fixed node in the regulatory dependency graph unless configured as an operational gate.</p>
          </div>

          {/* Node type legend */}
          <div className="px-4 py-3">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-2">Node Types</p>
            {[['MIDC Controlled','Managed within MIDC workflow'],['External Dept','View only — no MIDC controls'],['Milestone','Journey stage marker']].map(([t,d]) => (
              <div key={t} className="mb-2"><p className="text-[10px] font-semibold text-[#1a2533]">{t}</p><p className="text-[9px] text-[#374151]">{d}</p></div>
            ))}
            <p className="text-[9px] text-[#6b7280] italic mt-2">This is a configurable dependency model. The baseline prototype shows a representative journey — not a universal legal sequence.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}

// ─── M18 Consolidated Query Builder ──────────────────────────────────────────


const M18_DEF_STATUS: Record<DefStatus, { label: string; textCls: string; bgCls: string; borderCls: string }> = {
  'unresolved':         { label:'Unresolved',          textCls:'text-amber-700',   bgCls:'bg-amber-50',    borderCls:'border-amber-200' },
  'in-query':           { label:'In Query',            textCls:'text-[#1a56db]',   bgCls:'bg-[#ebf3ff]',   borderCls:'border-[#bdd4f5]' },
  'resolved':           { label:'Resolved',            textCls:'text-emerald-700', bgCls:'bg-emerald-50',  borderCls:'border-emerald-200' },
  'partially-resolved': { label:'Partially Resolved',  textCls:'text-purple-700',  bgCls:'bg-purple-50',   borderCls:'border-purple-200' },
  'reopened':           { label:'Reopened',            textCls:'text-red-700',     bgCls:'bg-red-50',      borderCls:'border-red-200' },
}

const M18_CANDIDATES: Deficiency[] = [
  { id:'DEF-2026-0091', category:'Data Inconsistency', source:'M16 — Cross-form Consistency', issue:'Plot area differs between Fire record and current MIDC project data.', evidence:'Master Project Dossier: 4,800 m² · Fire record: 4,600 m²', relatedField:'Plot Area', requiredCorrection:'Confirm the applicable plot area and provide supporting evidence from the relevant authority.', docRequested:'Updated allotment record or certified measurement', entrepreneurComment:'Please confirm the applicable plot area and provide supporting evidence for each record where the value differs.', internalNote:'Potential mismatch originated from external Fire application — MIDC cannot edit Fire record directly.', status:'unresolved', createdAt:'23 Sep 2026' },
  { id:'DEF-2026-0092', category:'Document', source:'M13 — Document Review', issue:'Building plan version requires correction — uploaded file does not match current project parameters.', evidence:'Building Plan v1 · Built-up Area: 2,000 m² (submitted) vs 2,300 m² (current project data)', relatedField:'Building Plan', requiredCorrection:'Replace the building plan with the corrected version reflecting current project parameters. New document must be uploaded as a new version.', docRequested:'Corrected Building Plan (new version)', entrepreneurComment:'Please upload a corrected Building Plan that reflects the current project parameters, including the updated built-up area.', internalNote:'Delta detected during Building Parameters review — see M14.', status:'unresolved', createdAt:'23 Sep 2026' },
  { id:'DEF-2026-0093', category:'Building / Plan', source:'M14 — Building / Planning Scrutiny', issue:'Submitted built-up area (2,300 m²) differs from previously declared value in earlier submission (2,000 m²). Change not accompanied by a delta explanation.', evidence:'Previous submission: 2,000 m² · Current submission: 2,300 m²', relatedField:'Built-up Area', requiredCorrection:'Provide a written explanation for the change in built-up area and confirm the applicable value with supporting evidence.', docRequested:'No additional document required — written explanation sufficient', entrepreneurComment:'The built-up area has changed between submissions. Please confirm the correct value and explain the reason for this change.', internalNote:'Delta re-scrutiny triggered — open M20 if required.', status:'unresolved', createdAt:'23 Sep 2026' },
  { id:'DEF-2026-0094', category:'Utility / Water', source:'M15 — Water / Utility / Drainage', issue:'Water quantity value requires verification — submitted as a prototype value without supporting evidence.', evidence:'Water Quantity: Prototype value · Verification: USER_CONFIRMED · Supporting evidence: Not provided', relatedField:'Water Quantity', requiredCorrection:'Confirm the applicable water quantity requirement and provide supporting technical evidence or project document.', docRequested:'Water requirement evidence / project document', entrepreneurComment:'Please confirm the water quantity requirement for your project and provide supporting technical documentation.', internalNote:'Marked Needs Verification during M15 review.', status:'unresolved', createdAt:'23 Sep 2026' },
]

const M18_PREVIOUS: Deficiency[] = [
  { id:'DEF-2026-0081', category:'Land / Plot', source:'M11 — Land / Plot Scrutiny', issue:'Plot allotment record required re-verification.', evidence:'Previous allotment record expired — entrepreneur confirmed renewal pending.', relatedField:'Plot / Allotment', requiredCorrection:'Upload renewed allotment record.', docRequested:'Renewed allotment record', entrepreneurComment:'Please upload the renewed allotment record.', internalNote:'', status:'resolved', queryId:'QRY-2026-0036', createdAt:'12 Sep 2026', updatedAt:'15 Sep 2026', response:'Entrepreneur uploaded renewed allotment record v2.' },
  { id:'DEF-2026-0082', category:'Document',   source:'M13 — Document Review', issue:'Site layout plan required updated version.', evidence:'Site Layout Plan v1 — outdated.', relatedField:'Site Layout Plan', requiredCorrection:'Upload updated site layout plan.', docRequested:'Updated site layout plan', entrepreneurComment:'Please upload an updated site layout plan.', internalNote:'', status:'resolved', queryId:'QRY-2026-0036', createdAt:'12 Sep 2026', updatedAt:'15 Sep 2026', response:'Entrepreneur uploaded Site Layout Plan v2 — verified.' },
  { id:'DEF-2026-0083', category:'Data Inconsistency', source:'M16 — Cross-form Consistency', issue:'Company name inconsistency between business profile and MIDC application.', evidence:'Business Profile: Aster Precision Components Pvt. Ltd. · Application: Aster Precision Pvt. Ltd.', relatedField:'Company Identity', requiredCorrection:'Confirm and correct the registered company name.', docRequested:'No document required', entrepreneurComment:'Please confirm the correct registered company name.', internalNote:'', status:'partially-resolved', queryId:'QRY-2026-0039', createdAt:'18 Sep 2026', response:'Entrepreneur confirmed Aster Precision Components Pvt. Ltd. — MIDC application update pending.' },
]


export function M18QueryBuilderPage({ onBack, onBackToOverview, onOpenQueryHistory }: {
  onBack: () => void; onBackToOverview: () => void; onOpenQueryHistory?: () => void
}) {
  const [selectedDef, setSelectedDef] = useState<Deficiency | null>(M18_CANDIDATES[0])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [filterCat, setFilterCat]     = useState('All')
  const [showPreview, setShowPreview] = useState(false)
  const [sent, setSent]               = useState(false)
  const [queryId]                     = useState('QRY-2026-0042')

  const toggleSelect = (id: string) => setSelectedIds(prev => {
    const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n
  })

  const filteredCandidates = filterCat === 'All' ? M18_CANDIDATES : M18_CANDIDATES.filter(d => d.category === filterCat)
  const selectedDefs = M18_CANDIDATES.filter(d => selectedIds.has(d.id))
  const docsRequested = selectedDefs.filter(d => d.docRequested && d.docRequested !== 'No additional document required — written explanation sufficient' && d.docRequested !== 'No document required').length

  const StatusBadge = ({ status }: { status: DefStatus }) => {
    const m = M18_DEF_STATUS[status]
    return <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold border ${m.bgCls} ${m.textCls} ${m.borderCls}`}>{m.label}</span>
  }

  if (sent) return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#f8f9fb] p-10 text-center">
      <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4 text-emerald-600 text-2xl">✓</div>
      <h2 className="text-lg font-bold text-[#1a2533] mb-2">Consolidated Query Sent</h2>
      <p className="text-sm text-[#1a2533] mb-1">Query ID: <strong className="text-[#1a3a5c]">{queryId}</strong></p>
      <p className="text-xs text-[#374151] mb-1">{selectedIds.size} deficiencies · Application state: <strong>QUERY_RAISED</strong></p>
      <p className="text-[10px] text-[#374151] italic mb-6">Entrepreneur notified. Awaiting response. Application state updated to QUERY_RAISED (operational overlay: Awaiting Entrepreneur Response).</p>
      <div className="flex gap-3">
        <button onClick={() => { setSent(false); setSelectedIds(new Set()); setShowPreview(false) }} className="px-4 py-2 bg-[#1a3a5c] text-white text-xs font-bold rounded hover:bg-[#0f2540]">Back to Query Builder</button>
        <button onClick={onOpenQueryHistory} className="px-4 py-2 border border-[#1a56db] text-[#1a56db] text-xs font-bold rounded hover:bg-[#ebf3ff]">View Query History → M19</button>
      </div>
    </div>
  )

  if (showPreview) return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#f8f9fb]">
      <div className="bg-white border-b border-[#d1d9e0] px-5 py-3 shrink-0">
        <Breadcrumb items={[{ label:'Department Home', onClick: onBackToOverview },{ label:'Applications', onClick: onBackToOverview },{ label:'Application Overview', onClick: onBackToOverview },{ label:'Query Builder', onClick: () => setShowPreview(false) },{ label:'Review Before Sending' }]} />
        <h1 className="text-base font-bold text-[#1a2533] mt-2">Review Before Sending — {queryId} <span className="text-[11px] text-[#374151] font-normal">M18</span></h1>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <div className="bg-[#ebf3ff] border border-[#bdd4f5] rounded px-4 py-3 text-[11px] text-[#1a3a5c]">
          <p className="font-bold mb-1">Summary — what the entrepreneur will receive</p>
          <div className="flex gap-6">
            <span>{selectedIds.size} deficiencies</span>
            <span>{docsRequested} documents requested</span>
            <span>{selectedDefs.filter(d=>d.requiredCorrection.includes('explanation')).length} clarification(s)</span>
            <span className="text-emerald-700">0 duplicate unresolved issues</span>
          </div>
        </div>
        <div className="space-y-3">
          {selectedDefs.map(d => (
            <div key={d.id} className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
              <div className="px-4 py-2 bg-[#f8f9fb] border-b border-[#f0f4f8] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3"><span className="text-[10px] font-mono text-[#374151]">{d.id}</span><span className="text-[10px] font-semibold text-[#1a2533]">{d.category}</span><span className="text-[9px] text-[#374151]">{d.source}</span></div>
                <StatusBadge status={d.status} />
              </div>
              <div className="grid grid-cols-2 gap-4 px-4 py-3 text-[11px]">
                <div><p className="text-[#374151] mb-0.5">Issue</p><p className="text-[#1a2533]">{d.issue}</p></div>
                <div><p className="text-[#374151] mb-0.5">Evidence</p><p className="text-[#1a2533]">{d.evidence}</p></div>
                <div><p className="text-[#374151] mb-0.5">Required Correction</p><p className="font-semibold text-[#1a2533]">{d.requiredCorrection}</p></div>
                <div><p className="text-[#374151] mb-0.5">Document Requested</p><p className={d.docRequested.startsWith('No') ? 'text-[#374151]' : 'font-semibold text-[#1a2533]'}>{d.docRequested}</p></div>
              </div>
              <div className="px-4 py-2 border-t border-[#f0f4f8] bg-[#f8f9fb]">
                <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Entrepreneur-facing comment</p>
                <p className="text-[11px] text-[#1a2533] italic">"{d.entrepreneurComment}"</p>
              </div>
              <div className="px-4 py-2 border-t border-[#f0f4f8]">
                <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Internal officer note (not visible to entrepreneur)</p>
                <p className="text-[11px] text-[#374151] italic">{d.internalNote || 'No internal note.'}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={() => setSent(true)} className="px-5 py-2 bg-[#1a3a5c] text-white text-xs font-bold rounded hover:bg-[#0f2540]">Send Consolidated Deficiency</button>
          <button className="px-4 py-2 border border-[#d1d9e0] text-xs rounded text-[#1a2533] hover:bg-[#f8f9fb]">Save Draft</button>
          <button onClick={() => setShowPreview(false)} className="px-4 py-2 text-xs text-[#374151] hover:underline">Cancel</button>
        </div>
        <p className="text-[10px] text-[#6b7280] italic">Sending will update application state to QUERY_RAISED. Operational overlay: Awaiting Entrepreneur Response. Sample prototype data — not actual records.</p>
      </div>
    </div>
  )

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#f8f9fb]">
      {/* Header */}
      <div className="bg-white border-b border-[#d1d9e0] px-5 py-3 shrink-0">
        <Breadcrumb items={[{ label:'Department Home', onClick: onBackToOverview },{ label:'Applications', onClick: onBackToOverview },{ label:'Application Overview', onClick: onBackToOverview },{ label:'Scrutiny', onClick: onBack },{ label:'Query Builder' }]} />
        <div className="flex items-start justify-between gap-4 mt-2">
          <div>
            <h1 className="text-base font-bold text-[#1a2533]">M18 — Consolidated Query Builder <span className="text-[11px] text-[#374151] font-normal ml-2">Consolidate all unresolved issues into one outgoing query</span></h1>
            <p className="text-[11px] text-[#374151] mt-0.5">MIDC-APP-2026-00418 · Aster Precision Components Pvt. Ltd. · Building / Planning</p>
          </div>
          <button onClick={onOpenQueryHistory} className="text-xs text-[#1a56db] hover:underline shrink-0">Query History → M19</button>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-[10px]">
          {[['Application','MIDC-APP-2026-00418'],['State','QUERY_RAISED'],['Payment','PAID'],['Desk','Planning / Building Scrutiny'],['SLA','Approaching']].map(([k,v]) => (
            <span key={k} className="text-[#374151]">{k}: <strong className={k==='SLA'?'text-amber-700':k==='Payment'?'text-emerald-700':k==='State'?'text-[#1a3a5c]':'text-[#1a2533]'}>{v}</strong></span>
          ))}
        </div>
      </div>

      {/* Purpose */}
      <div className="bg-[#ebf3ff] border-b border-[#bdd4f5] px-5 py-2 shrink-0">
        <p className="text-[11px] text-[#1a3a5c]"><span className="font-bold">Consolidated Query Builder</span> — Select unresolved issues from scrutiny screens and consolidate them into one outgoing query. Individual scrutiny screens do not independently contact the entrepreneur — all issues flow through M18. This prevents repeated one-by-one query loops.</p>
      </div>

      {/* Dark summary bar */}
      <div className="bg-[#0f2540] px-5 py-2 flex items-center gap-6 shrink-0 text-[10px]">
        <span className="text-[#8fafd0] font-semibold uppercase tracking-wider">Query: {queryId}</span>
        <span className="text-white"><span className="text-[#8fafd0]">Candidates available: </span><strong>{M18_CANDIDATES.length}</strong></span>
        <span className="text-white"><span className="text-[#8fafd0]">Selected for query: </span><strong>{selectedIds.size}</strong></span>
        <span className="text-white"><span className="text-[#8fafd0]">Docs requested: </span><strong>{docsRequested}</strong></span>
        {selectedIds.size > 0 && <button onClick={() => setShowPreview(true)} className="ml-auto px-4 py-1.5 bg-white text-[#1a3a5c] text-[10px] font-bold rounded hover:bg-[#ebf3ff]">Review &amp; Send →</button>}
        {selectedIds.size === 0 && <span className="ml-auto text-[#8fafd0] italic">Select deficiencies to build query</span>}
      </div>

      {/* Three-column */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT — category nav + candidate list */}
        <div className="w-64 shrink-0 bg-white border-r border-[#d1d9e0] overflow-y-auto">
          <div className="px-3 py-2.5 border-b border-[#d1d9e0]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-bold">Unresolved Issues — Available</p>
          </div>
          {/* Category filter */}
          <div className="px-3 py-2 border-b border-[#f0f4f8]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-bold mb-1.5">Filter by category</p>
            <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="w-full text-[10px] border border-[#d1d9e0] rounded px-2 py-1 bg-[#f8f9fb] focus:outline-none">
              {M18_CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          {/* Candidate list */}
          <div className="py-1">
            {filteredCandidates.map(d => {
              const selected = selectedIds.has(d.id)
              const active   = selectedDef?.id === d.id
              return (
                <div key={d.id}
                  className={`px-3 py-2.5 border-b border-[#f0f4f8] cursor-pointer transition-colors ${active ? 'bg-[#ebf3ff]' : 'hover:bg-[#f8f9fb]'}`}
                  onClick={() => setSelectedDef(d)}
                >
                  <div className="flex items-start gap-2">
                    <input type="checkbox" checked={selected} onChange={() => toggleSelect(d.id)}
                      onClick={e => e.stopPropagation()}
                      className="mt-0.5 shrink-0 accent-[#1a3a5c]" aria-label={`Select ${d.id}`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[9px] font-mono text-[#374151]">{d.id}</span>
                        <StatusBadge status={d.status} />
                      </div>
                      <p className="text-[10px] font-semibold text-[#1a2533] mt-0.5 leading-tight">{d.category}</p>
                      <p className="text-[9px] text-[#374151] truncate">{d.issue}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Previously raised section */}
          <div className="px-3 py-2.5 border-t border-[#d1d9e0] bg-[#f8f9fb]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-bold mb-2">Previously Raised Issues</p>
            {M18_PREVIOUS.map(d => {
              const m = M18_DEF_STATUS[d.status]
              return (
                <div key={d.id} onClick={() => setSelectedDef(d)} className={`py-2 border-b border-[#f0f4f8] cursor-pointer ${selectedDef?.id === d.id ? 'opacity-100' : 'opacity-75 hover:opacity-100'}`}>
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[9px] font-mono text-[#374151]">{d.id}</span>
                    <span className={`text-[8px] font-bold px-1 py-0.5 rounded border ${m.bgCls} ${m.textCls} ${m.borderCls}`}>{m.label}</span>
                  </div>
                  <p className="text-[9px] text-[#1a2533] mt-0.5 leading-tight">{d.category}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* CENTER — deficiency detail */}
        <main className="flex-1 overflow-y-auto bg-[#f8f9fb] p-5 space-y-4" tabIndex={-1}>
          {selectedDef ? (
            <>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[9px] text-[#374151] uppercase tracking-wider font-bold">Deficiency Detail</p>
                  <h2 className="text-sm font-bold text-[#1a2533] mt-0.5">{selectedDef.id} — {selectedDef.category}</h2>
                  <p className="text-[10px] text-[#374151]">Source: {selectedDef.source} · Created: {selectedDef.createdAt}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <StatusBadge status={selectedDef.status} />
                  {selectedDef.status === 'unresolved' && (
                    <button onClick={() => toggleSelect(selectedDef.id)}
                      className={`px-3 py-1.5 text-xs font-bold rounded border transition-colors ${selectedIds.has(selectedDef.id) ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'border-[#1a3a5c] text-[#1a3a5c] bg-white hover:bg-[#ebf3ff]'}`}
                    >
                      {selectedIds.has(selectedDef.id) ? '✓ Added to Query' : 'Add to Query'}
                    </button>
                  )}
                </div>
              </div>

              {/* Duplicate check */}
              {selectedDef.status === 'unresolved' && M18_PREVIOUS.some(p => p.category === selectedDef.category && p.status !== 'resolved') && (
                <div className="bg-amber-50 border border-amber-200 rounded px-4 py-2.5">
                  <p className="text-[10px] font-semibold text-amber-700 mb-1">⚠ Potential duplicate detected</p>
                  <p className="text-[10px] text-amber-700">A previously raised issue in the same category ({selectedDef.category}) is partially unresolved: {M18_PREVIOUS.find(p => p.category === selectedDef.category)?.id}. Officer must decide whether to use the existing deficiency or create a new one.</p>
                  <div className="flex gap-2 mt-2">
                    <button className="px-2 py-1 text-[9px] font-bold bg-amber-100 border border-amber-300 rounded text-amber-800 hover:bg-amber-200">View Existing</button>
                    <button className="px-2 py-1 text-[9px] font-bold border border-amber-300 rounded text-amber-700 hover:bg-amber-50">Use Existing Deficiency</button>
                    <button onClick={() => toggleSelect(selectedDef.id)} className="px-2 py-1 text-[9px] font-bold border border-[#d1d9e0] rounded text-[#1a2533] hover:bg-white">Create New Anyway</button>
                  </div>
                </div>
              )}

              {/* Core fields */}
              <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden divide-y divide-[#94a3b8]">
                {[
                  ['Issue', selectedDef.issue],
                  ['Evidence', selectedDef.evidence],
                  ['Related Field', selectedDef.relatedField],
                  ['Required Correction', selectedDef.requiredCorrection],
                  ['Document Requested', selectedDef.docRequested],
                  ['Regulatory Source', 'Configured MIDC Building / Planning requirement — no official GR cited in prototype.'],
                ].map(([k,v]) => (
                  <div key={k} className="grid grid-cols-3 gap-2 px-4 py-3 text-[11px]">
                    <p className="text-[#374151] font-semibold">{k}</p>
                    <p className="col-span-2 text-[#1a2533]">{v}</p>
                  </div>
                ))}
              </div>

              {/* Entrepreneur-facing vs internal */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-[#1a56db]/30 rounded p-3">
                  <p className="text-[9px] text-[#1a56db] uppercase tracking-wider font-bold mb-1.5">Entrepreneur-facing Comment</p>
                  <p className="text-[11px] text-[#1a2533] italic">"{selectedDef.entrepreneurComment}"</p>
                  <p className="text-[9px] text-[#374151] mt-2">This exact text will be visible to the entrepreneur.</p>
                </div>
                <div className="bg-[#f8f9fb] border border-[#d1d9e0] rounded p-3">
                  <p className="text-[9px] text-[#374151] uppercase tracking-wider font-bold mb-1.5">Internal Officer Note (not shown to entrepreneur)</p>
                  <p className="text-[11px] text-[#374151] italic">{selectedDef.internalNote || 'No internal note.'}</p>
                </div>
              </div>

              {/* Response (for previous) */}
              {selectedDef.response && (
                <div className="bg-emerald-50 border border-emerald-200 rounded p-3">
                  <p className="text-[9px] text-emerald-700 uppercase tracking-wider font-bold mb-1">Entrepreneur Response</p>
                  <p className="text-[11px] text-emerald-800">{selectedDef.response}</p>
                  {selectedDef.queryId && <p className="text-[9px] text-emerald-600 mt-1">Query: {selectedDef.queryId} · {selectedDef.updatedAt}</p>}
                </div>
              )}

              {/* Evidence links */}
              <div className="flex gap-2 flex-wrap">
                <button className="px-3 py-1.5 text-xs border border-[#d1d9e0] rounded text-[#1a56db] hover:bg-[#ebf3ff]">View Comparison → M16</button>
                <button className="px-3 py-1.5 text-xs border border-[#d1d9e0] rounded text-[#1a56db] hover:bg-[#ebf3ff]">View Parameter → M12</button>
                <button className="px-3 py-1.5 text-xs border border-[#d1d9e0] rounded text-[#1a56db] hover:bg-[#ebf3ff]">View Document → M13</button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-sm font-semibold text-[#1a2533]">Select a deficiency to review its details</p>
            </div>
          )}
        </main>

        {/* RIGHT — consolidated query panel */}
        <aside className="w-64 shrink-0 bg-white border-l border-[#d1d9e0] overflow-y-auto" aria-label="Current consolidated query">
          <div className="px-4 py-2.5 border-b border-[#d1d9e0] bg-[#f8f9fb]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-bold">Current Consolidated Query</p>
            <p className="text-[10px] text-[#1a3a5c] font-bold mt-0.5">{queryId}</p>
          </div>

          {selectedIds.size === 0 ? (
            <div className="px-4 py-6 text-center">
              <p className="text-[11px] text-[#374151]">No deficiencies selected yet.</p>
              <p className="text-[10px] text-[#6b7280] italic mt-1">Use checkboxes or the "Add to Query" button to select issues.</p>
            </div>
          ) : (
            <>
              <div className="divide-y divide-[#94a3b8]">
                {selectedDefs.map(d => (
                  <div key={d.id} className="px-4 py-2.5">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <p className="text-[9px] font-mono text-[#374151]">{d.id}</p>
                        <p className="text-[10px] font-semibold text-[#1a2533] mt-0.5 leading-tight">{d.category}</p>
                        <p className="text-[9px] text-[#374151] mt-0.5 leading-tight line-clamp-2">{d.issue}</p>
                      </div>
                      <button onClick={() => toggleSelect(d.id)} className="text-[#374151] hover:text-red-600 shrink-0 text-sm" aria-label={`Remove ${d.id}`}>✕</button>
                    </div>
                    {d.docRequested && !d.docRequested.startsWith('No') && (
                      <p className="text-[9px] text-[#1a56db] mt-1">📎 {d.docRequested}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-[#d1d9e0] space-y-1 text-[10px]">
                <div className="flex justify-between"><span className="text-[#374151]">Total deficiencies</span><strong>{selectedIds.size}</strong></div>
                <div className="flex justify-between"><span className="text-[#374151]">Documents requested</span><strong>{docsRequested}</strong></div>
              </div>
              <div className="px-4 py-3 border-t border-[#d1d9e0]">
                <button onClick={() => setShowPreview(true)} className="w-full px-4 py-2 bg-[#1a3a5c] text-white text-xs font-bold rounded hover:bg-[#0f2540]">Review Before Sending →</button>
                <button className="w-full mt-2 px-4 py-2 border border-[#d1d9e0] text-xs rounded text-[#1a2533] hover:bg-[#f8f9fb]">Save Draft</button>
              </div>
            </>
          )}

          <div className="px-4 py-3 border-t border-[#f0f4f8]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-1">After sending</p>
            <p className="text-[10px] text-[#1a2533]">Application state → QUERY_RAISED. Entrepreneur receives one consolidated query. Responses tracked in M19.</p>
            <button onClick={onOpenQueryHistory} className="mt-2 text-[10px] text-[#1a56db] hover:underline font-semibold">View Query / Response History → M19</button>
          </div>
          <div className="px-4 py-3 border-t border-[#f0f4f8]">
            <p className="text-[9px] text-[#6b7280] italic">Sample prototype data — not actual records</p>
          </div>
        </aside>
      </div>
    </div>
  )
}

// ─── Scrutiny Command Centre ──────────────────────────────────────────────────


const SCRUTINY_APPS: ScrutinyApp[] = [
  {
    appId: 'MIDC-APP-2026-00418', business: 'Aster Precision Components Pvt. Ltd.',
    service: 'Building / Planning', projectStage: 'Construction',
    scrutinyStage: 'Building / Planning', actionRequired: 'Review Building Parameters',
    lastUpdated: '18 Sep 2026', sla: 'Due Soon', status: 'TECHNICAL_SCRUTINY',
    resubmitted: true, deltaRequired: true, inspectionPending: true,
    modules: [
      { id:'precheck',     name:'Automated Pre-check',        mNum:'M09', status:'Completed' },
      { id:'route',        name:'Scrutiny Route',             mNum:'M10', status:'Completed' },
      { id:'land',         name:'Land / Plot',                mNum:'M11', status:'Completed' },
      { id:'building',     name:'Building / Planning',        mNum:'M14', status:'In Review',      issues:2, lastUpdated:'18 Sep 2026' },
      { id:'water',        name:'Water / Utility',            mNum:'M15', status:'Not Applicable' },
      { id:'consistency',  name:'Cross-form Consistency',     mNum:'M16', status:'Issues Found',   issues:1, lastUpdated:'18 Sep 2026' },
      { id:'dependency',   name:'Regulatory Dependencies',    mNum:'M17', status:'Pending',        issues:1 },
      { id:'query',        name:'Consolidated Query',         mNum:'M18', status:'Not Started' },
      { id:'queryhistory', name:'Query / Response History',   mNum:'M19', status:'Review Required',issues:2 },
      { id:'delta',        name:'Delta Re-scrutiny',          mNum:'M20', status:'Resubmission Received', issues:4, lastUpdated:'18 Sep 2026' },
      { id:'inspection',   name:'Inspection Queue',           mNum:'M21', status:'Pending' },
    ]
  },
  {
    appId: 'MIDC-APP-2026-00405', business: 'Example Manufacturing Pvt. Ltd.',
    service: 'Land / Plot', projectStage: 'Pre-construction',
    scrutinyStage: 'Query', actionRequired: 'Review Entrepreneur Response',
    lastUpdated: '17 Sep 2026', sla: 'Within SLA', status: 'QUERY_RAISED',
    resubmitted: false, deltaRequired: false, inspectionPending: false,
    modules: [
      { id:'precheck',     name:'Automated Pre-check',        mNum:'M09', status:'Completed' },
      { id:'route',        name:'Scrutiny Route',             mNum:'M10', status:'Completed' },
      { id:'land',         name:'Land / Plot',                mNum:'M11', status:'Issues Found', issues:1 },
      { id:'building',     name:'Building / Planning',        mNum:'M14', status:'Not Started' },
      { id:'water',        name:'Water / Utility',            mNum:'M15', status:'Not Applicable' },
      { id:'consistency',  name:'Cross-form Consistency',     mNum:'M16', status:'Not Started' },
      { id:'dependency',   name:'Regulatory Dependencies',    mNum:'M17', status:'Completed' },
      { id:'query',        name:'Consolidated Query',         mNum:'M18', status:'Query Required' },
      { id:'queryhistory', name:'Query / Response History',   mNum:'M19', status:'Review Required', issues:1 },
      { id:'delta',        name:'Delta Re-scrutiny',          mNum:'M20', status:'Not Applicable' },
      { id:'inspection',   name:'Inspection Queue',           mNum:'M21', status:'Not Applicable' },
    ]
  },
  {
    appId: 'MIDC-APP-2026-00391', business: 'Example Utilities Pvt. Ltd.',
    service: 'Water / Utility', projectStage: 'Construction',
    scrutinyStage: 'Delta Re-scrutiny', actionRequired: 'Perform Delta Re-scrutiny',
    lastUpdated: '18 Sep 2026', sla: 'SLA Risk', status: 'RESUBMITTED',
    resubmitted: true, deltaRequired: true, inspectionPending: false,
    modules: [
      { id:'precheck',     name:'Automated Pre-check',        mNum:'M09', status:'Completed' },
      { id:'route',        name:'Scrutiny Route',             mNum:'M10', status:'Completed' },
      { id:'land',         name:'Land / Plot',                mNum:'M11', status:'Completed' },
      { id:'building',     name:'Building / Planning',        mNum:'M14', status:'Not Applicable' },
      { id:'water',        name:'Water / Utility',            mNum:'M15', status:'In Review' },
      { id:'consistency',  name:'Cross-form Consistency',     mNum:'M16', status:'Needs Verification' },
      { id:'dependency',   name:'Regulatory Dependencies',    mNum:'M17', status:'Pending', issues:1 },
      { id:'query',        name:'Consolidated Query',         mNum:'M18', status:'Completed' },
      { id:'queryhistory', name:'Query / Response History',   mNum:'M19', status:'Completed' },
      { id:'delta',        name:'Delta Re-scrutiny',          mNum:'M20', status:'Resubmission Received', issues:3 },
      { id:'inspection',   name:'Inspection Queue',           mNum:'M21', status:'Not Applicable' },
    ]
  },
  {
    appId: 'MIDC-APP-2026-00372', business: 'Example Industrial Pvt. Ltd.',
    service: 'Building / Planning', projectStage: 'Pre-construction',
    scrutinyStage: 'Inspection', actionRequired: 'Plan Site Inspection',
    lastUpdated: '16 Sep 2026', sla: 'SLA Risk', status: 'INSPECTION_PENDING',
    resubmitted: false, deltaRequired: false, inspectionPending: true,
    modules: [
      { id:'precheck',     name:'Automated Pre-check',        mNum:'M09', status:'Completed' },
      { id:'route',        name:'Scrutiny Route',             mNum:'M10', status:'Completed' },
      { id:'land',         name:'Land / Plot',                mNum:'M11', status:'Completed' },
      { id:'building',     name:'Building / Planning',        mNum:'M14', status:'Completed' },
      { id:'water',        name:'Water / Utility',            mNum:'M15', status:'Not Applicable' },
      { id:'consistency',  name:'Cross-form Consistency',     mNum:'M16', status:'Completed' },
      { id:'dependency',   name:'Regulatory Dependencies',    mNum:'M17', status:'Completed' },
      { id:'query',        name:'Consolidated Query',         mNum:'M18', status:'Completed' },
      { id:'queryhistory', name:'Query / Response History',   mNum:'M19', status:'Completed' },
      { id:'delta',        name:'Delta Re-scrutiny',          mNum:'M20', status:'Not Applicable' },
      { id:'inspection',   name:'Inspection Queue',           mNum:'M21', status:'Pending' },
    ]
  },
]

const MODULE_STATUS_STYLE: Record<ScrutinyModule['status'], { bg: string; text: string; border: string }> = {
  'Not Started':           { bg:'bg-[#f3f4f6]', text:'text-[#1a2533]', border:'border-[#d1d5db]' },
  'In Review':             { bg:'bg-[#fffbeb]', text:'text-[#92400e]', border:'border-[#fcd34d]' },
  'Completed':             { bg:'bg-[#ecfdf5]', text:'text-[#065f46]', border:'border-[#6ee7b7]' },
  'Needs Verification':    { bg:'bg-[#eff6ff]', text:'text-[#1e40af]', border:'border-[#93c5fd]' },
  'Issues Found':          { bg:'bg-[#fef2f2]', text:'text-[#991b1b]', border:'border-[#fca5a5]' },
  'Not Applicable':        { bg:'bg-[#f9fafb]', text:'text-[#374151]', border:'border-[#e5eaf0]' },
  'Query Required':        { bg:'bg-[#fff7ed]', text:'text-[#9a3412]', border:'border-[#fdba74]' },
  'Resubmission Received': { bg:'bg-[#fdf4ff]', text:'text-[#6b21a8]', border:'border-[#d8b4fe]' },
  'Review Required':       { bg:'bg-[#eff6ff]', text:'text-[#1e40af]', border:'border-[#93c5fd]' },
  'Pending':               { bg:'bg-[#fefce8]', text:'text-[#854d0e]', border:'border-[#fde047]' },
}


export function ScrutinyCommandCentre({ onOpenScrutinyApp }: { onOpenScrutinyApp: (appId: string, dest: string) => void }) {
  const [selectedApp, setSelectedApp] = useState<ScrutinyApp>(SCRUTINY_APPS[0])
  const [search, setSearch] = useState('')
  const [stageFilter, setStageFilter] = useState('All')
  const [slaFilter, setSlaFilter] = useState('All')
  const [showAppDetail, setShowAppDetail] = useState(true)

  const COUNTS = [
    { label:'New',           count:1,  color:'text-[#1a56db]' },
    { label:'In Scrutiny',   count:14, color:'text-[#1a2533]' },
    { label:'Query Required',count:5,  color:'text-[#9a3412]' },
    { label:'Resubmitted',   count:3,  color:'text-[#6b21a8]' },
    { label:'Delta Review',  count:2,  color:'text-[#6b21a8]' },
    { label:'Inspection',    count:4,  color:'text-[#854d0e]' },
    { label:'SLA Risk',      count:1,  color:'text-[#dc2626]' },
  ]

  const ATTENTION_ITEMS = [
    { text:'2 unresolved Building / Planning issues', sub:'MIDC-APP-2026-00418', dest:'bldg-scrutiny', appId:'MIDC-APP-2026-00418' },
    { text:'1 cross-form inconsistency — Plot Area mismatch', sub:'MIDC-APP-2026-00418', dest:'consistency', appId:'MIDC-APP-2026-00418' },
    { text:'1 upstream dependency pending', sub:'MIDC-APP-2026-00418', dest:'dependency-view', appId:'MIDC-APP-2026-00418' },
    { text:'Entrepreneur resubmitted — Delta Re-scrutiny required', sub:'MIDC-APP-2026-00418', dest:'delta-rescrutiny', appId:'MIDC-APP-2026-00418' },
    { text:'Entrepreneur response received — Building Plan v3', sub:'MIDC-APP-2026-00405', dest:'query-history', appId:'MIDC-APP-2026-00405' },
    { text:'Delta Re-scrutiny required', sub:'MIDC-APP-2026-00391', dest:'delta-rescrutiny', appId:'MIDC-APP-2026-00391' },
  ]

  const RECENT_ACTIVITY = [
    { date:'18 Sep', appId:'MIDC-APP-2026-00418', event:'Entrepreneur resubmitted application v2', action:'Delta Re-scrutiny required', dest:'delta-rescrutiny' },
    { date:'18 Sep', appId:'MIDC-APP-2026-00418', event:'Business DNA changed after submission — v3 → v4', action:'View Business DNA change', dest:'dna' },
    { date:'17 Sep', appId:'MIDC-APP-2026-00405', event:'Building Plan v3 uploaded', action:'Document review required', dest:'doc-review' },
    { date:'16 Sep', appId:'MIDC-APP-2026-00372', event:'Inspection requirement identified during M14 scrutiny', action:'Plan inspection', dest:'inspection-queue' },
    { date:'15 Sep', appId:'MIDC-APP-2026-00391', event:'Cross-form inconsistency detected — Water / Utility vs Master Project', action:'Review consistency', dest:'consistency' },
  ]

  const filtered = SCRUTINY_APPS.filter(a => {
    const q = search.toLowerCase()
    const matchSearch = !q || a.appId.toLowerCase().includes(q) || a.business.toLowerCase().includes(q) || a.service.toLowerCase().includes(q)
    const matchStage = stageFilter === 'All' || a.scrutinyStage === stageFilter
    const matchSla = slaFilter === 'All' || a.sla === slaFilter
    return matchSearch && matchStage && matchSla
  })

  function getStageIcon(status: ScrutinyModule['status']) {
    if (status === 'Completed') return '✓'
    if (status === 'Issues Found' || status === 'Query Required') return '!'
    if (status === 'In Review' || status === 'Pending' || status === 'Resubmission Received') return '●'
    if (status === 'Not Applicable') return '—'
    return '○'
  }

  function ModuleStatusBadge({ status }: { status: ScrutinyModule['status'] }) {
    const s = MODULE_STATUS_STYLE[status]
    return <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold border ${s.bg} ${s.text} ${s.border}`}>{status}</span>
  }

  function moduleDestination(moduleId: string): string {
    const map: Record<string, string> = {
      precheck:'precheck', route:'scrutiny-route', land:'scrutiny-workbench',
      building:'bldg-scrutiny', water:'water-scrutiny', consistency:'consistency',
      dependency:'dependency-view', query:'query-builder', queryhistory:'query-history',
      delta:'delta-rescrutiny', inspection:'inspection-queue',
    }
    return map[moduleId] ?? 'overview'
  }

  return (
    <div className="flex-1 flex flex-col bg-[#f8f9fb] min-h-0 overflow-y-auto">
      {/* Page header */}
      <div className="bg-white border-b border-[#e5eaf0] px-6 py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-base font-bold text-[#1a2533]">Scrutiny <span className="text-[11px] font-normal text-[#374151] ml-2">Central Scrutiny Workbench</span></h1>
            <p className="text-xs text-[#1a2533] mt-0.5">Review submitted applications, identify unresolved scrutiny items, and continue application-specific review.</p>
          </div>
          <div className="flex gap-5 shrink-0 flex-wrap">
            {COUNTS.map(c => (
              <button key={c.label} className="text-center hover:opacity-80 transition-opacity">
                <div className={`text-lg font-black ${c.color}`}>{c.count}</div>
                <div className="text-[9px] text-[#374151] uppercase tracking-wider font-bold">{c.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 py-4 space-y-5">

        {/* Resubmission + Query response alerts */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#fdf4ff] border border-[#d8b4fe] rounded-lg px-4 py-3 flex items-start gap-3">
            <Icon.AlertCircle />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-[#6b21a8]">Resubmission Received</div>
              <div className="text-[11px] text-[#6b21a8] mt-0.5">MIDC-APP-2026-00418 — v1 → v2 · 4 changed fields · 3 affected areas</div>
            </div>
            <button onClick={() => { setSelectedApp(SCRUTINY_APPS[0]); setShowAppDetail(true); onOpenScrutinyApp('MIDC-APP-2026-00418', 'delta-rescrutiny') }}
              className="shrink-0 text-[11px] font-bold text-[#6b21a8] underline hover:text-[#7e22ce]">Open Delta → M20</button>
          </div>
          <div className="bg-[#eff6ff] border border-[#93c5fd] rounded-lg px-4 py-3 flex items-start gap-3">
            <Icon.Info />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-[#1e40af]">Entrepreneur Response Received</div>
              <div className="text-[11px] text-[#1e40af] mt-0.5">QRY-2026-0042 · DEF-2026-0092 · Building Plan v3 uploaded</div>
            </div>
            <button onClick={() => onOpenScrutinyApp('MIDC-APP-2026-00405', 'query-history')}
              className="shrink-0 text-[11px] font-bold text-[#1e40af] underline hover:text-[#1d4ed8]">Review Response → M19</button>
          </div>
        </div>

        {/* My Scrutiny Work table */}
        <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-[#e5eaf0] flex items-center gap-3 flex-wrap">
            <div className="text-xs font-bold text-[#1a2533]">My Scrutiny Work</div>
            <div className="relative ml-auto">
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search Application ID, Business, Service…"
                className="pl-7 pr-3 py-1.5 text-xs border border-[#d1d9e0] rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#1a56db] w-64"
              />
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[#374151] pointer-events-none"><Icon.Search /></span>
            </div>
            <select value={stageFilter} onChange={e => setStageFilter(e.target.value)} className="text-xs border border-[#d1d9e0] rounded px-2 py-1.5 bg-white focus:outline-none">
              {['All','Pre-check','Scrutiny Route','Land / Plot','Building / Planning','Water / Utility','Cross-form','Dependency Review','Query','Delta Re-scrutiny','Inspection'].map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={slaFilter} onChange={e => setSlaFilter(e.target.value)} className="text-xs border border-[#d1d9e0] rounded px-2 py-1.5 bg-white focus:outline-none">
              {['All','Within SLA','Due Soon','SLA Risk','SLA Breached'].map(s => <option key={s}>{s}</option>)}
            </select>
            <button className="text-[10px] text-[#1a56db] hover:underline ml-1">Advanced Search → M04</button>
          </div>
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-[#f8f9fb] border-b border-[#e5eaf0]">
                {['Application / Business','Service','Scrutiny Stage','Action Required','Last Updated','SLA','Status','Open'].map(h => (
                  <th key={h} className="px-3 py-2.5 text-left text-[10px] font-bold text-[#374151] uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(app => (
                <tr
                  key={app.appId}
                  onClick={() => { setSelectedApp(app); setShowAppDetail(true) }}
                  className={`border-b border-[#f0f4f8] cursor-pointer transition-colors ${selectedApp.appId === app.appId && showAppDetail ? 'bg-[#ebf3ff]' : 'hover:bg-[#f8f9fb]'}`}
                >
                  <td className="px-3 py-2.5">
                    <div className="font-mono text-[11px] font-bold text-[#1a3a5c]">{app.appId}</div>
                    <div className="text-[11px] text-[#1a2533] truncate max-w-[180px]">{app.business}</div>
                    {app.resubmitted && <span className="text-[8px] bg-[#fdf4ff] text-[#6b21a8] px-1 py-0.5 rounded font-bold border border-[#d8b4fe] mr-1">Resubmitted</span>}
                    {app.deltaRequired && <span className="text-[8px] bg-[#fdf4ff] text-[#6b21a8] px-1 py-0.5 rounded font-bold border border-[#d8b4fe]">Delta</span>}
                  </td>
                  <td className="px-3 py-2.5 text-[#1a2533] whitespace-nowrap">{app.service}</td>
                  <td className="px-3 py-2.5">
                    <span className="text-[10px] bg-[#f8f9fb] border border-[#d1d9e0] px-1.5 py-0.5 rounded text-[#1a2533] font-semibold">{app.scrutinyStage}</span>
                  </td>
                  <td className="px-3 py-2.5 font-semibold text-[#1a2533]">{app.actionRequired}</td>
                  <td className="px-3 py-2.5 text-[#1a2533] whitespace-nowrap">{app.lastUpdated}</td>
                  <td className="px-3 py-2.5">
                    <span className={`text-[10px] font-semibold ${app.sla === 'SLA Risk' || app.sla === 'SLA Breached' ? 'text-[#dc2626]' : app.sla === 'Due Soon' ? 'text-[#92400e]' : 'text-[#065f46]'}`}>{app.sla}</span>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className="text-[10px] font-mono bg-[#f3f4f6] text-[#374151] px-1.5 py-0.5 rounded">{app.status}</span>
                  </td>
                  <td className="px-3 py-2.5">
                    <button
                      onClick={e => { e.stopPropagation(); setSelectedApp(app); setShowAppDetail(true); onOpenScrutinyApp(app.appId, 'overview') }}
                      className="px-2.5 py-1 text-[10px] font-bold bg-[#1a3a5c] text-white rounded hover:bg-[#0f2540] transition-colors"
                    >OPEN</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected application scrutiny workbench */}
        {showAppDetail && (
          <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-[#e5eaf0] bg-[#f8f9fb] flex items-center gap-3">
              <div>
                <span className="text-[10px] font-bold text-[#374151] uppercase tracking-wider">Selected Application</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-xs font-bold text-[#1a3a5c]">{selectedApp.appId}</span>
                  <span className="text-xs text-[#1a2533]">{selectedApp.business}</span>
                  <span className="text-[10px] font-mono bg-[#f3f4f6] text-[#374151] px-1.5 py-0.5 rounded">{selectedApp.status}</span>
                  <span className={`text-[10px] font-semibold ${selectedApp.sla === 'SLA Risk' || selectedApp.sla === 'SLA Breached' ? 'text-[#dc2626]' : selectedApp.sla === 'Due Soon' ? 'text-[#92400e]' : 'text-[#065f46]'}`}>{selectedApp.sla}</span>
                </div>
              </div>
              <div className="ml-auto flex gap-2">
                <button onClick={() => onOpenScrutinyApp(selectedApp.appId, 'overview')} className="text-[10px] text-[#1a56db] hover:underline">View Application → M06</button>
                <button onClick={() => onOpenScrutinyApp(selectedApp.appId, 'dna')} className="text-[10px] text-[#1a56db] hover:underline">Business DNA → M07</button>
                <button onClick={() => onOpenScrutinyApp(selectedApp.appId, 'timeline')} className="text-[10px] text-[#1a56db] hover:underline">Timeline → M08</button>
              </div>
            </div>

            {/* Workflow strip */}
            <div className="px-4 py-3 border-b border-[#e5eaf0] overflow-x-auto">
              <div className="flex items-center gap-1 min-w-max">
                {WORKFLOW_STAGES.map((stage, i) => {
                  const mod = selectedApp.modules.find(m => m.id === stage.key)
                  const icon = mod ? getStageIcon(mod.status) : '○'
                  const iconColor = mod?.status === 'Completed' ? 'text-[#059669]' : mod?.status === 'Issues Found' || mod?.status === 'Query Required' ? 'text-[#dc2626]' : mod?.status === 'In Review' || mod?.status === 'Pending' || mod?.status === 'Resubmission Received' ? 'text-[#92400e]' : mod?.status === 'Not Applicable' ? 'text-[#d1d5db]' : 'text-[#374151]'
                  return (
                    <div key={stage.key} className="flex items-center">
                      <button
                        onClick={() => mod && mod.status !== 'Not Applicable' && onOpenScrutinyApp(selectedApp.appId, moduleDestination(stage.key))}
                        className={`flex flex-col items-center px-2 py-1 rounded hover:bg-[#f0f4f8] transition-colors ${mod?.status === 'Not Applicable' ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <span className={`text-sm font-black ${iconColor}`}>{icon}</span>
                        <span className="text-[8px] font-bold text-[#1a2533] uppercase mt-0.5">{stage.short}</span>
                      </button>
                      {i < WORKFLOW_STAGES.length - 1 && <span className="text-[#d1d5db] text-xs mx-0.5">→</span>}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Module cards */}
            <div className="p-4">
              <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-3">Scrutiny Modules — {selectedApp.appId}</div>
              <div className="grid grid-cols-4 gap-3">
                {selectedApp.modules.map(mod => {
                  const s = MODULE_STATUS_STYLE[mod.status]
                  return (
                    <div key={mod.id} className={`border rounded-lg p-3 flex flex-col gap-2 ${mod.status === 'Not Applicable' ? 'opacity-50' : ''}`}>
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <div className="text-[9px] font-bold text-[#374151] uppercase">{mod.mNum}</div>
                          <div className="text-xs font-bold text-[#1a2533] leading-tight">{mod.name}</div>
                        </div>
                        {(mod.issues ?? 0) > 0 && (
                          <span className="shrink-0 w-5 h-5 rounded-full bg-[#fef2f2] border border-[#fca5a5] text-[#991b1b] text-[9px] font-black flex items-center justify-center">{mod.issues}</span>
                        )}
                      </div>
                      <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-bold border self-start ${s.bg} ${s.text} ${s.border}`}>{mod.status}</span>
                      {mod.lastUpdated && <div className="text-[9px] text-[#374151]">{mod.lastUpdated}</div>}
                      {mod.status !== 'Not Applicable' && (
                        <button
                          onClick={() => onOpenScrutinyApp(selectedApp.appId, moduleDestination(mod.id))}
                          className="mt-auto text-[10px] font-bold text-[#1a56db] hover:underline text-left"
                        >Open {mod.mNum} →</button>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Next actions panel */}
              <div className="mt-4 bg-[#f8f9fb] border border-[#e5eaf0] rounded-lg p-3">
                <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-2">Next Actions — {selectedApp.appId}</div>
                <div className="space-y-1.5">
                  {selectedApp.modules.filter(m => ['In Review','Issues Found','Query Required','Resubmission Received','Review Required','Pending','Needs Verification'].includes(m.status)).map((m, i) => (
                    <div key={m.id} className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#374151] w-4">{i + 1}.</span>
                      <span className="text-xs text-[#1a2533] flex-1">
                        {m.status === 'Issues Found' ? `Resolve ${m.issues ?? ''} issue${(m.issues ?? 0) > 1 ? 's' : ''} — ${m.name}` :
                         m.status === 'Resubmission Received' ? `Perform Delta Re-scrutiny — ${m.issues ?? 0} changes` :
                         m.status === 'Review Required' ? `Review responses — ${m.name}` :
                         m.status === 'Pending' ? `${m.name} — action required` :
                         `Continue — ${m.name}`}
                      </span>
                      <button onClick={() => onOpenScrutinyApp(selectedApp.appId, moduleDestination(m.id))} className="shrink-0 text-[10px] font-bold text-white bg-[#1a3a5c] px-2 py-0.5 rounded hover:bg-[#0f2540]">Open {m.mNum}</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Requires Attention + Recent Activity row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
            <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-3">Requires Attention</div>
            <div className="space-y-2">
              {ATTENTION_ITEMS.map((item, i) => (
                <div key={i} className="flex items-start gap-2 pb-2 border-b border-[#f0f4f8] last:border-0 last:pb-0">
                  <Icon.AlertCircle />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-[#1a2533]">{item.text}</div>
                    <div className="text-[10px] text-[#374151] font-mono">{item.sub}</div>
                  </div>
                  <button
                    onClick={() => { const a = SCRUTINY_APPS.find(x => x.appId === item.appId); if(a) setSelectedApp(a); onOpenScrutinyApp(item.appId, item.dest) }}
                    className="shrink-0 text-[10px] text-[#1a56db] hover:underline font-semibold whitespace-nowrap"
                  >Open →</button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
            <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-3">Recent Scrutiny Activity</div>
            <div className="space-y-2">
              {RECENT_ACTIVITY.map((item, i) => (
                <div key={i} className="flex items-start gap-2 pb-2 border-b border-[#f0f4f8] last:border-0 last:pb-0">
                  <div className="text-[10px] font-bold text-[#374151] shrink-0 w-10">{item.date}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-[9px] text-[#374151]">{item.appId}</div>
                    <div className="text-xs text-[#1a2533]">{item.event}</div>
                    <div className="text-[10px] text-[#1a2533] italic">→ {item.action}</div>
                  </div>
                  <button onClick={() => onOpenScrutinyApp(item.appId, item.dest)} className="shrink-0 text-[10px] text-[#1a56db] hover:underline font-semibold">Open</button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

// ─── M20 Delta Re-scrutiny ────────────────────────────────────────────────────


const M20_CHANGED: ChangedItem[] = [
  { id:'c1', field:'Plot Area', prev:'4,800 m²', current:'5,200 m²', change:'+400 m²', changeType:'value', source:'Business DNA v4', verification:'User Confirmed', affectedAreas:['Building / Planning','Water / Utility','Fire dependency','Inspection'], reviewStatus:'not-reviewed' },
  { id:'c2', field:'Building Area', prev:'2,000 m²', current:'2,300 m²', change:'+300 m²', changeType:'value', source:'MIDC Application v2', verification:'User Confirmed', affectedAreas:['Building / Planning','Inspection'], reviewStatus:'not-reviewed' },
  { id:'c3', field:'Building Plan', prev:'v1', current:'v2', change:'Replaced', changeType:'document', source:'Document Repository', verification:'Needs Verification', affectedAreas:['Building Review'], reviewStatus:'not-reviewed' },
  { id:'c4', field:'Water Requirement', prev:'No', current:'Yes', change:'Applicability changed', changeType:'applicability', source:'Business DNA v4', verification:'User Confirmed', affectedAreas:['MIDC Water / Utility','Fire dependency'], reviewStatus:'not-reviewed' },
]
const M20_AFFECTED: AffectedItem[] = [
  { id:'a1', service:'MIDC Building / Planning', parameter:'Plot/building consistency', reason:'Plot size changed from 4,800 to 5,200 m². The configured consistency rule compares building area against the updated plot context.', causedBy:'Plot Area', reviewStatus:'needs-verification' },
  { id:'a2', service:'MIDC Water / Utility', parameter:'Service applicability', reason:'Water requirement changed from No → Yes. The configured regulatory journey activates the water service when water is required and the source is MIDC.', causedBy:'Water Requirement', prevValue:'Not Active', currentValue:'Active', reviewStatus:'needs-verification' },
  { id:'a3', service:'Provisional Fire', parameter:'Configured dependency impact', reason:'Building and plot context changed; fire dependency may be affected by updated project scope.', causedBy:'Plot Area / Building Area', reviewStatus:'not-reviewed' },
  { id:'a4', service:'Construction', parameter:'Configured downstream impact', reason:'Building scope change may affect construction staging or configured downstream approvals.', causedBy:'Building Area', reviewStatus:'not-reviewed' },
  { id:'a5', service:'Inspection', parameter:'Potential inspection impact', reason:'Building area increased from 2,000 to 2,300 m². Configured inspection requirement may be affected.', causedBy:'Building Area', reviewStatus:'needs-verification' },
  { id:'a6', service:'M16 Cross-form Consistency', parameter:'Potential new mismatch', reason:'Plot area in MIDC Building form (4,800) may now mismatch updated project value (5,200). Cross-form check required.', causedBy:'Plot Area', reviewStatus:'not-reviewed' },
]
const M20_UNCHANGED: UnchangedItem[] = [
  { id:'u1', field:'Company Identity', value:'Aster Precision Components Pvt. Ltd.', verification:'Department Verified', reviewStatus:'no-review-required' },
  { id:'u2', field:'Project Location', value:'MIDC Chakan Phase II, Pune', verification:'System Verified', reviewStatus:'no-review-required' },
  { id:'u3', field:'Plot Number', value:'C-124, MIDC Chakan', verification:'System Verified', reviewStatus:'no-review-required' },
  { id:'u4', field:'Water Source', value:'MIDC', verification:'System Verified', reviewStatus:'no-review-required' },
  { id:'u5', field:'Existing Land Document', value:'7/12 Extract — v2', verification:'Department Verified', reviewStatus:'no-review-required' },
  { id:'u6', field:'Company PAN', value:'AAACA1234Z', verification:'System Verified', reviewStatus:'no-review-required' },
  { id:'u7', field:'Director — Primary', value:'Vikram Nair', verification:'Department Verified', reviewStatus:'no-review-required' },
  { id:'u8', field:'Industry Type', value:'Precision Engineering', verification:'System Verified', reviewStatus:'no-review-required' },
  { id:'u9', field:'MIDC Zone', value:'Chakan Phase II', verification:'System Verified', reviewStatus:'no-review-required' },
  { id:'u10', field:'Connectivity — Road', value:'State Highway SH-50', verification:'System Verified', reviewStatus:'no-review-required' },
  { id:'u11', field:'Power Source', value:'MSEDCL', verification:'System Verified', reviewStatus:'no-review-required' },
  { id:'u12', field:'Environmental Category', value:'Orange', verification:'Department Verified', reviewStatus:'no-review-required' },
]

const REVIEW_STATUS_MAP: Record<ReviewStatus, { label: string; bg: string; text: string; border: string }> = {
  'not-reviewed':       { label:'Not Reviewed',       bg:'bg-[#f3f4f6]', text:'text-[#374151]', border:'border-[#d1d5db]' },
  'under-review':       { label:'Under Review',       bg:'bg-[#fffbeb]', text:'text-[#92400e]', border:'border-[#fcd34d]' },
  'valid':              { label:'Valid',               bg:'bg-[#ecfdf5]', text:'text-[#065f46]', border:'border-[#6ee7b7]' },
  'query':              { label:'Query',               bg:'bg-[#fff7ed]', text:'text-[#9a3412]', border:'border-[#fdba74]' },
  'invalid':            { label:'Invalid',             bg:'bg-[#fef2f2]', text:'text-[#991b1b]', border:'border-[#fca5a5]' },
  'needs-verification': { label:'Needs Verification',  bg:'bg-[#eff6ff]', text:'text-[#1e40af]', border:'border-[#93c5fd]' },
  'reviewed-no-change': { label:'Reviewed — No Change',bg:'bg-[#ecfdf5]', text:'text-[#065f46]', border:'border-[#a7f3d0]' },
}
const CHANGE_TYPE_LABEL: Record<ChangedItem['changeType'], string> = {
  value:'Value Changed', document:'Document Version Changed', status:'Status Changed',
  dna:'Business DNA Changed', dependency:'Dependency State Changed', applicability:'Applicability Changed',
}

export function M20DeltaRescrutinyPage({ onBackToOverview, onOpenDna, onOpenDocReview, onOpenConsistency, onOpenDepView, onOpenQueryBuilder, onOpenQueryHistory, onOpenTimeline }: {
  onBackToOverview: () => void; onOpenDna: () => void; onOpenDocReview: () => void
  onOpenConsistency: () => void; onOpenDepView: () => void; onOpenQueryBuilder: () => void
  onOpenQueryHistory: () => void; onOpenTimeline: () => void
}) {
  const [tab, setTab] = useState<DeltaTab>('changed')
  const [changedItems, setChangedItems] = useState<ChangedItem[]>(M20_CHANGED)
  const [affectedItems] = useState<AffectedItem[]>(M20_AFFECTED)
  const [unchangedItems, setUnchangedItems] = useState<UnchangedItem[]>(M20_UNCHANGED)
  const [selectedChangedId, setSelectedChangedId] = useState<string | null>('c1')
  const [selectedAffectedId, setSelectedAffectedId] = useState<string | null>(null)
  const [selectedUnchangedId, setSelectedUnchangedId] = useState<string | null>(null)
  const [selectedUnchangedRows, setSelectedUnchangedRows] = useState<Set<string>>(new Set())

  const selectedChanged = changedItems.find(c => c.id === selectedChangedId) ?? null
  const selectedAffected = affectedItems.find(a => a.id === selectedAffectedId) ?? null
  const selectedUnchanged = unchangedItems.find(u => u.id === selectedUnchangedId) ?? null

  function markChangedReviewed(id: string) {
    setChangedItems(prev => prev.map(c => c.id === id ? { ...c, reviewStatus: 'reviewed-no-change' } : c))
  }
  function markBulkUnchanged() {
    setUnchangedItems(prev => prev.map(u => selectedUnchangedRows.has(u.id) ? { ...u, reviewStatus: 'reviewed' } : u))
    setSelectedUnchangedRows(new Set())
  }
  function toggleUnchangedRow(id: string) {
    setSelectedUnchangedRows(prev => {
      const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next
    })
  }

  const ReviewBadge = ({ status }: { status: ReviewStatus }) => {
    const m = REVIEW_STATUS_MAP[status]
    return <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold border ${m.bg} ${m.text} ${m.border}`}>{m.label}</span>
  }

  return (
    <div className="flex-1 flex flex-col bg-[#f8f9fb] min-h-0">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#e5eaf0] px-6 py-2 flex items-center gap-1.5 text-xs text-[#1a2533]">
        <button onClick={onBackToOverview} className="hover:text-[#1a3a5c] hover:underline">Application</button>
        <Icon.ChevronRight />
        <span className="text-[#1a2533] font-semibold">M20 — Delta Re-scrutiny</span>
      </div>

      {/* App context header */}
      <div className="bg-white border-b border-[#e5eaf0] px-6 py-3">
        <div className="flex flex-wrap items-start gap-x-8 gap-y-2">
          <div>
            <div className="text-[10px] text-[#374151] uppercase tracking-wider font-bold">Application ID</div>
            <div className="text-sm font-bold text-[#1a2533] font-mono">MIDC-APP-2026-00418</div>
          </div>
          <div>
            <div className="text-[10px] text-[#374151] uppercase tracking-wider font-bold">Business</div>
            <div className="text-sm font-semibold text-[#1a2533]">Aster Precision Components Pvt. Ltd.</div>
          </div>
          <div>
            <div className="text-[10px] text-[#374151] uppercase tracking-wider font-bold">Current Service</div>
            <div className="text-sm text-[#1a2533]">Building / Planning</div>
          </div>
          <div>
            <div className="text-[10px] text-[#374151] uppercase tracking-wider font-bold">Application State</div>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-[#fff7ed] text-[#9a3412] border border-[#fdba74]">RESUBMITTED</span>
          </div>
          <div className="border-l border-[#e5eaf0] pl-6 flex gap-6">
            <div>
              <div className="text-[10px] text-[#374151] uppercase tracking-wider font-bold">Previous Submission</div>
              <div className="text-xs font-semibold text-[#1a2533]">Version 1 — 12 Sep 2026</div>
            </div>
            <div>
              <div className="text-[10px] text-[#374151] uppercase tracking-wider font-bold">Current Submission</div>
              <div className="text-xs font-semibold text-[#1a3a5c]">Version 2 — 18 Sep 2026</div>
            </div>
          </div>
          <div className="ml-auto flex gap-2 items-center">
            <button onClick={onOpenTimeline} className="text-xs text-[#1a56db] hover:underline">Application Timeline →</button>
            <button onClick={onOpenQueryHistory} className="text-xs text-[#1a56db] hover:underline">Query History →</button>
          </div>
        </div>
      </div>

      {/* Business DNA change banner */}
      <div className="mx-6 mt-4 bg-[#fffbeb] border border-[#fcd34d] rounded-lg px-4 py-3 flex items-start gap-3">
        <Icon.Warning />
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold text-[#92400e]">Business DNA changed after original submission.</div>
          <div className="text-[11px] text-[#78350f] mt-0.5">Business DNA v3 → v4 — 3 fields updated by Adaptive Business Profile on 18 Sep 2026. Changes confirmed by entrepreneur.</div>
          <div className="flex gap-3 mt-1.5 flex-wrap">
            <span className="text-[10px] text-[#92400e] font-semibold">Plot Area: 4,800 → 5,200 m²</span>
            <span className="text-[10px] text-[#92400e] font-semibold">Water Requirement: No → Yes</span>
            <span className="text-[10px] text-[#92400e] font-semibold">Project Stage: Pre-construction → Construction</span>
          </div>
        </div>
        <button onClick={onOpenDna} className="shrink-0 text-[11px] font-bold text-[#92400e] underline hover:text-[#78350f]">View Business DNA Change → M07</button>
      </div>

      {/* Delta summary header */}
      <div className="mx-6 mt-3 bg-white border border-[#e5eaf0] rounded-lg px-5 py-4">
        <div className="flex items-start gap-6 flex-wrap">
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold text-[#1a2533]">Delta Re-scrutiny</h1>
            <p className="text-[11px] text-[#1a2533] mt-0.5">Compare the previous submission with the current resubmission and identify the MIDC review areas affected by the changes.</p>
            <p className="text-[10px] text-[#374151] mt-1">Only changed and configured affected information requires focused re-scrutiny. Unchanged information remains available for reference.</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            {([
              { label:'Changed', count:changedItems.length, bg:'bg-[#fef2f2]', text:'text-[#991b1b]', border:'border-[#fca5a5]' },
              { label:'Affected', count:affectedItems.length, bg:'bg-[#eff6ff]', text:'text-[#1e40af]', border:'border-[#93c5fd]' },
              { label:'Unchanged', count:unchangedItems.length, bg:'bg-[#ecfdf5]', text:'text-[#065f46]', border:'border-[#6ee7b7]' },
              { label:'Requires Review', count:changedItems.filter(c=>c.reviewStatus==='not-reviewed'||c.reviewStatus==='needs-verification').length + affectedItems.filter(a=>a.reviewStatus==='needs-verification'||a.reviewStatus==='not-reviewed').length, bg:'bg-[#fff7ed]', text:'text-[#9a3412]', border:'border-[#fdba74]' },
            ] as const).map(s => (
              <div key={s.label} className={`text-center px-3 py-2 rounded-lg border ${s.bg} ${s.border}`}>
                <div className={`text-xl font-black ${s.text}`}>{s.count}</div>
                <div className={`text-[9px] font-bold uppercase tracking-wider ${s.text}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Version comparison */}
        <div className="mt-4 grid grid-cols-2 gap-4 max-w-lg">
          <div className="bg-[#f8f9fb] border border-[#d1d9e0] rounded p-3">
            <div className="text-[9px] text-[#374151] uppercase tracking-wider font-bold mb-1">Version 1 — Previous</div>
            <div className="text-[11px] text-[#1a2533]">Submitted: <span className="font-semibold">12 Sep 2026</span></div>
            <div className="text-[11px] text-[#1a2533]">Business DNA: <span className="font-semibold">v3</span></div>
            <div className="text-[11px] text-[#1a2533]">Application: <span className="font-semibold">v1</span></div>
            <div className="text-[11px] text-[#1a2533]">Officer review: <span className="font-semibold">Query Raised</span></div>
          </div>
          <div className="bg-[#ebf3ff] border border-[#bdd4f5] rounded p-3">
            <div className="text-[9px] text-[#1a3a5c] uppercase tracking-wider font-bold mb-1">Version 2 — Current</div>
            <div className="text-[11px] text-[#1a3a5c]">Resubmitted: <span className="font-semibold">18 Sep 2026</span></div>
            <div className="text-[11px] text-[#1a3a5c]">Business DNA: <span className="font-semibold">v4</span></div>
            <div className="text-[11px] text-[#1a3a5c]">Application: <span className="font-semibold">v2</span></div>
            <div className="text-[11px] text-[#1a3a5c]">Officer review: <span className="font-semibold text-[#9a3412]">Pending</span></div>
          </div>
        </div>

        {/* Delta Audit ID */}
        <div className="mt-3 text-[10px] text-[#374151]">Delta ID: <span className="font-mono font-semibold text-[#1a2533]">DELTA-2026-0018</span> · Detected: 18 Sep 2026 · Desk: Planning / Building Scrutiny</div>
      </div>

      {/* Three-tab main workspace */}
      <div className="mx-6 mt-4 flex-1 flex flex-col bg-white border border-[#e5eaf0] rounded-lg overflow-hidden mb-6">
        {/* Tabs */}
        <div className="flex border-b border-[#e5eaf0]">
          {([
            { id:'changed' as DeltaTab, label:'Changed', count:changedItems.length, accent:'border-[#dc2626] text-[#dc2626]' },
            { id:'affected' as DeltaTab, label:'Affected', count:affectedItems.length, accent:'border-[#1a56db] text-[#1a56db]' },
            { id:'unchanged' as DeltaTab, label:'Unchanged', count:unchangedItems.length, accent:'border-[#059669] text-[#059669]' },
          ]).map(t => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setSelectedChangedId(null); setSelectedAffectedId(null); setSelectedUnchangedId(null) }}
              className={`px-5 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${tab === t.id ? t.accent + ' bg-white' : 'border-transparent text-[#1a2533] hover:text-[#1a2533] bg-[#f8f9fb]'}`}
            >
              {t.label}
              <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black ${tab === t.id ? 'bg-current/10' : 'bg-[#e5eaf0] text-[#1a2533]'}`}>{t.count}</span>
            </button>
          ))}
        </div>

        {/* Tab content: two-column layout (table + drawer) */}
        <div className="flex flex-1 overflow-hidden min-h-0" style={{ minHeight: 480 }}>

          {/* ── CHANGED TAB ── */}
          {tab === 'changed' && (
            <>
              <div className="flex-1 overflow-y-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f8f9fb] border-b border-[#e5eaf0]">
                      {['Field / Item','Previous','Current','Change','Change Type','Source','Affected Areas','Review Status'].map(h => (
                        <th key={h} className="px-3 py-2.5 text-left text-[10px] font-bold text-[#374151] uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {changedItems.map(item => (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedChangedId(item.id)}
                        className={`border-b border-[#f0f4f8] cursor-pointer transition-colors ${selectedChangedId === item.id ? 'bg-[#ebf3ff]' : 'hover:bg-[#f8f9fb]'}`}
                      >
                        <td className="px-3 py-2.5 font-semibold text-[#1a2533]">{item.field}</td>
                        <td className="px-3 py-2.5 text-[#1a2533] line-through decoration-[#9aa5b4]">{item.prev}</td>
                        <td className="px-3 py-2.5">
                          <span className="font-semibold text-[#1a2533]">{item.current}</span>
                        </td>
                        <td className="px-3 py-2.5">
                          <span className={`font-bold ${item.change.startsWith('+') ? 'text-[#059669]' : item.change === 'Replaced' ? 'text-[#9a3412]' : 'text-[#1a56db]'}`}>
                            {item.change}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-[#1a2533] text-[10px]">{CHANGE_TYPE_LABEL[item.changeType]}</td>
                        <td className="px-3 py-2.5 text-[#1a2533]">{item.source}</td>
                        <td className="px-3 py-2.5 text-[#1a2533]">
                          <div className="flex flex-wrap gap-1">
                            {item.affectedAreas.map(a => <span key={a} className="text-[9px] bg-[#eff6ff] text-[#1e40af] px-1.5 py-0.5 rounded">{a}</span>)}
                          </div>
                        </td>
                        <td className="px-3 py-2.5">
                          <ReviewBadge status={item.reviewStatus} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Changed detail drawer */}
              {selectedChanged && (
                <div className="w-72 border-l border-[#e5eaf0] bg-white overflow-y-auto p-4 flex flex-col gap-4 shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider">Change Detail</div>
                    <button onClick={() => setSelectedChangedId(null)} className="text-[#374151] hover:text-[#1a2533]"><Icon.X /></button>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-[#1a2533] mb-2">{selectedChanged.field}</div>
                    <div className="bg-[#f8f9fb] rounded-lg p-3 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="text-[9px] text-[#374151] uppercase font-bold mb-0.5">Previous</div>
                        <div className="text-[#1a2533] line-through decoration-[#9aa5b4] font-medium">{selectedChanged.prev}</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-[#374151] uppercase font-bold mb-0.5">Current</div>
                        <div className="text-[#1a2533] font-bold">{selectedChanged.current}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-[9px] text-[#374151] uppercase font-bold mb-0.5">Net Change</div>
                        <div className={`font-black text-sm ${selectedChanged.change.startsWith('+') ? 'text-[#059669]' : 'text-[#9a3412]'}`}>{selectedChanged.change}</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs space-y-1.5">
                    <Row label="Change Type" value={CHANGE_TYPE_LABEL[selectedChanged.changeType]} />
                    <Row label="Source" value={selectedChanged.source} />
                    <Row label="Verification" value={selectedChanged.verification} />
                    <Row label="Origin" value="Adaptive Business Profile" />
                    <Row label="Changed" value="18 Sep 2026" />
                  </div>

                  <div>
                    <div className="text-[9px] font-bold text-[#374151] uppercase tracking-wider mb-1.5">Affected Areas</div>
                    <div className="flex flex-col gap-1">
                      {selectedChanged.affectedAreas.map(a => (
                        <div key={a} className="text-[11px] text-[#1e40af] bg-[#eff6ff] px-2 py-1 rounded flex items-center gap-1.5">
                          <Icon.Info />
                          <span>{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] font-bold text-[#374151] uppercase tracking-wider mb-1.5">Review Status</div>
                    <ReviewBadge status={selectedChanged.reviewStatus} />
                  </div>

                  <div className="flex flex-col gap-2 pt-2 border-t border-[#e5eaf0]">
                    <div className="text-[9px] font-bold text-[#374151] uppercase tracking-wider">Actions</div>
                    <button onClick={onOpenConsistency} className="text-left text-xs text-[#1a56db] hover:underline px-2 py-1 bg-[#eff6ff] rounded">Open Cross-form Consistency → M16</button>
                    <button onClick={onOpenDepView}    className="text-left text-xs text-[#1a56db] hover:underline px-2 py-1 bg-[#eff6ff] rounded">Open Regulatory Dependency → M17</button>
                    {selectedChanged.changeType === 'document' && (
                      <button onClick={onOpenDocReview} className="text-left text-xs text-[#1a56db] hover:underline px-2 py-1 bg-[#eff6ff] rounded">Open Document Review → M13</button>
                    )}
                    <button onClick={onOpenQueryBuilder} className="text-left text-xs text-[#9a3412] hover:underline px-2 py-1 bg-[#fff7ed] rounded">Raise Query → M18</button>
                    <button onClick={() => markChangedReviewed(selectedChanged.id)} className="text-left text-xs text-[#065f46] hover:underline px-2 py-1 bg-[#ecfdf5] rounded font-semibold">✓ Mark Reviewed</button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── AFFECTED TAB ── */}
          {tab === 'affected' && (
            <>
              <div className="flex-1 overflow-y-auto">
                <div className="px-4 py-3 bg-[#eff6ff] border-b border-[#bdd4f5] text-xs text-[#1e40af]">
                  <Icon.Info /> <span className="ml-1">Items below were <strong>not directly changed</strong>. They appear because a related change may affect their configured applicability or scrutiny. Do not treat as automatically invalid.</span>
                </div>
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f8f9fb] border-b border-[#e5eaf0]">
                      {['Service / Area','Parameter','Caused By','Reason (Why Affected)','Review Status'].map(h => (
                        <th key={h} className="px-3 py-2.5 text-left text-[10px] font-bold text-[#374151] uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {affectedItems.map(item => (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedAffectedId(item.id)}
                        className={`border-b border-[#f0f4f8] cursor-pointer transition-colors ${selectedAffectedId === item.id ? 'bg-[#ebf3ff]' : 'hover:bg-[#f8f9fb]'}`}
                      >
                        <td className="px-3 py-2.5 font-semibold text-[#1a2533]">{item.service}</td>
                        <td className="px-3 py-2.5 text-[#1a2533]">{item.parameter}</td>
                        <td className="px-3 py-2.5">
                          <span className="text-[10px] bg-[#fef2f2] text-[#991b1b] px-1.5 py-0.5 rounded font-semibold">{item.causedBy}</span>
                        </td>
                        <td className="px-3 py-2.5 text-[#1a2533] max-w-xs">{item.reason}</td>
                        <td className="px-3 py-2.5"><ReviewBadge status={item.reviewStatus} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Affected detail drawer */}
              {selectedAffected && (
                <div className="w-72 border-l border-[#e5eaf0] bg-white overflow-y-auto p-4 flex flex-col gap-4 shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider">Affected Detail</div>
                    <button onClick={() => setSelectedAffectedId(null)} className="text-[#374151] hover:text-[#1a2533]"><Icon.X /></button>
                  </div>
                  <div className="bg-[#eff6ff] border border-[#bdd4f5] rounded p-3 text-[11px] text-[#1e40af]">
                    This item was not directly changed. It is shown because a related change may affect its configured applicability or scrutiny.
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1a2533]">{selectedAffected.service}</div>
                    <div className="text-[11px] text-[#1a2533]">{selectedAffected.parameter}</div>
                  </div>
                  <div className="text-xs space-y-1.5">
                    <Row label="Caused By" value={selectedAffected.causedBy} />
                    {selectedAffected.prevValue && <Row label="Previous State" value={selectedAffected.prevValue} />}
                    {selectedAffected.currentValue && <Row label="Current State" value={selectedAffected.currentValue} />}
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-[#374151] uppercase tracking-wider mb-1">Why Affected</div>
                    <div className="text-[11px] text-[#1a2533] bg-[#f8f9fb] rounded p-2">{selectedAffected.reason}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-[#374151] uppercase tracking-wider mb-1.5">Review Status</div>
                    <ReviewBadge status={selectedAffected.reviewStatus} />
                  </div>
                  <div className="flex flex-col gap-2 pt-2 border-t border-[#e5eaf0]">
                    <div className="text-[9px] font-bold text-[#374151] uppercase tracking-wider">Actions</div>
                    <button onClick={onOpenConsistency} className="text-left text-xs text-[#1a56db] hover:underline px-2 py-1 bg-[#eff6ff] rounded">Open Cross-form Consistency → M16</button>
                    <button onClick={onOpenDepView}    className="text-left text-xs text-[#1a56db] hover:underline px-2 py-1 bg-[#eff6ff] rounded">Open Regulatory Dependency → M17</button>
                    <button onClick={onOpenDna}        className="text-left text-xs text-[#1a56db] hover:underline px-2 py-1 bg-[#eff6ff] rounded">Open Business DNA → M07</button>
                    <button onClick={onOpenQueryBuilder} className="text-left text-xs text-[#9a3412] hover:underline px-2 py-1 bg-[#fff7ed] rounded">Raise Query → M18</button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── UNCHANGED TAB ── */}
          {tab === 'unchanged' && (
            <>
              <div className="flex-1 overflow-y-auto">
                <div className="px-4 py-3 bg-[#ecfdf5] border-b border-[#a7f3d0] text-xs text-[#065f46]">
                  <Icon.Check /> <span className="ml-1">Items below have not changed. No review required by default unless configured process specifies otherwise.</span>
                </div>
                <div className="px-4 py-2 flex items-center gap-3 border-b border-[#e5eaf0]">
                  <button
                    onClick={markBulkUnchanged}
                    disabled={selectedUnchangedRows.size === 0}
                    className="text-xs px-3 py-1.5 bg-[#1a3a5c] text-white rounded font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#243c5c] transition-colors"
                  >
                    Mark Selected — Reviewed, No Change ({selectedUnchangedRows.size})
                  </button>
                  <span className="text-[10px] text-[#374151]">Select rows to mark in bulk. Cannot bulk-confirm items requiring individual scrutiny.</span>
                </div>
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f8f9fb] border-b border-[#e5eaf0]">
                      <th className="px-3 py-2.5 w-8"></th>
                      {['Field','Previous & Current Value','Verification','Review'].map(h => (
                        <th key={h} className="px-3 py-2.5 text-left text-[10px] font-bold text-[#374151] uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {unchangedItems.map(item => (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedUnchangedId(item.id)}
                        className={`border-b border-[#f0f4f8] cursor-pointer transition-colors ${selectedUnchangedId === item.id ? 'bg-[#ecfdf5]' : 'hover:bg-[#f8f9fb]'}`}
                      >
                        <td className="px-3 py-2.5" onClick={e => { e.stopPropagation(); toggleUnchangedRow(item.id) }}>
                          <input type="checkbox" checked={selectedUnchangedRows.has(item.id)} onChange={() => toggleUnchangedRow(item.id)} className="w-3.5 h-3.5" />
                        </td>
                        <td className="px-3 py-2.5 font-semibold text-[#1a2533]">{item.field}</td>
                        <td className="px-3 py-2.5 text-[#1a2533]">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-[#374151] font-mono">{item.value}</span>
                            <span className="text-[9px] bg-[#ecfdf5] text-[#065f46] px-1 py-0.5 rounded font-semibold border border-[#a7f3d0]">No change</span>
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-[#1a2533]">{item.verification}</td>
                        <td className="px-3 py-2.5">
                          {item.reviewStatus === 'reviewed'
                            ? <span className="text-[10px] font-semibold text-[#065f46] bg-[#ecfdf5] px-1.5 py-0.5 rounded border border-[#a7f3d0]">Reviewed — No Change</span>
                            : <span className="text-[10px] text-[#374151]">No review required</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Unchanged detail drawer */}
              {selectedUnchanged && (
                <div className="w-64 border-l border-[#e5eaf0] bg-white overflow-y-auto p-4 flex flex-col gap-4 shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider">Unchanged Field</div>
                    <button onClick={() => setSelectedUnchangedId(null)} className="text-[#374151] hover:text-[#1a2533]"><Icon.X /></button>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1a2533]">{selectedUnchanged.field}</div>
                  </div>
                  <div className="text-xs space-y-1.5">
                    <Row label="Previous" value={selectedUnchanged.value} />
                    <Row label="Current" value={selectedUnchanged.value} />
                    <Row label="Change" value="None" />
                    <Row label="Verification" value={selectedUnchanged.verification} />
                    <Row label="Impact" value="None detected" />
                    <Row label="Review" value="No review required" />
                  </div>
                  <div className="pt-2 border-t border-[#e5eaf0]">
                    <button className="text-xs text-[#1a56db] hover:underline px-2 py-1 bg-[#eff6ff] rounded w-full text-left">Open Record (reference only)</button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Document Impact + Inspection Impact + Dependency footer strip */}
      <div className="mx-6 mb-6 grid grid-cols-3 gap-4">
        <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
          <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-2">Document Impact</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <span className="text-[10px] bg-[#fef2f2] text-[#991b1b] px-1.5 py-0.5 rounded font-bold border border-[#fca5a5] shrink-0">Replaced</span>
              <div>
                <div className="text-xs font-semibold text-[#1a2533]">Building Plan v1 → v2</div>
                <div className="text-[10px] text-[#374151]">Needs Verification · Affects Building Review</div>
                <button onClick={onOpenDocReview} className="text-[10px] text-[#1a56db] hover:underline">Open M13</button>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[10px] bg-[#ecfdf5] text-[#065f46] px-1.5 py-0.5 rounded font-bold border border-[#a7f3d0] shrink-0">No change</span>
              <div>
                <div className="text-xs font-semibold text-[#1a2533]">Land Record — v2</div>
                <div className="text-[10px] text-[#374151]">Department Verified · No impact</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
          <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-2">Inspection Impact</div>
          <div className="flex flex-col gap-2">
            <div className="bg-[#fffbeb] border border-[#fcd34d] rounded p-2">
              <div className="text-[11px] font-bold text-[#92400e]">Inspection requirement may be affected.</div>
              <div className="text-[10px] text-[#78350f]">Building Area: 2,000 → 2,300 m²</div>
              <div className="text-[10px] text-[#78350f]">Status: <span className="font-semibold">Needs Verification</span></div>
            </div>
            <div className="text-[10px] text-[#374151]">Configured inspection impact detected. Do not automatically schedule.</div>
            <button className="text-[10px] text-[#1a56db] hover:underline text-left">Open Inspection Queue → M21</button>
          </div>
        </div>

        <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
          <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-2">Affected Dependency Nodes</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-[11px] font-semibold text-[#1a2533]">MIDC Water / Utility</div>
                <div className="text-[10px] text-[#374151]">Not Active → <span className="text-[#1e40af] font-bold">Active</span></div>
                <div className="text-[10px] text-[#1a2533]">Water Required: No → Yes</div>
              </div>
              <span className="text-[9px] bg-[#eff6ff] text-[#1e40af] px-1.5 py-0.5 rounded border border-[#93c5fd] font-bold shrink-0">Needs Verification</span>
            </div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-[11px] font-semibold text-[#1a2533]">Provisional Fire</div>
                <div className="text-[10px] text-[#374151]">Potentially affected by project scope change</div>
              </div>
              <span className="text-[9px] bg-[#f3f4f6] text-[#374151] px-1.5 py-0.5 rounded border border-[#d1d5db] font-bold shrink-0">Not Reviewed</span>
            </div>
            <button onClick={onOpenDepView} className="text-[10px] text-[#1a56db] hover:underline text-left">View Regulatory Dependency → M17</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-[#374151] text-[10px] uppercase font-bold shrink-0">{label}</span>
      <span className="text-[#1a2533] font-medium text-right">{value}</span>
    </div>
  )
}

// ─── M21 Inspection Queue + M22 Inspection Planning ──────────────────────────


const INSP_STATUS_MAP: Record<InspStatus, { label: string; bg: string; text: string; border: string }> = {
  PENDING:                { label:'Pending',                 bg:'bg-[#fff7ed]', text:'text-[#9a3412]',  border:'border-[#fdba74]' },
  SCHEDULED:              { label:'Scheduled',               bg:'bg-[#eff6ff]', text:'text-[#1e40af]',  border:'border-[#93c5fd]' },
  IN_PROGRESS:            { label:'In Progress',             bg:'bg-[#fefce8]', text:'text-[#854d0e]',  border:'border-[#fde047]' },
  COMPLETED:              { label:'Completed',               bg:'bg-[#ecfdf5]', text:'text-[#065f46]',  border:'border-[#6ee7b7]' },
  CANCELLED:              { label:'Cancelled',               bg:'bg-[#f3f4f6]', text:'text-[#374151]',  border:'border-[#d1d5db]' },
  RE_INSPECTION_REQUIRED: { label:'Re-inspection Required',  bg:'bg-[#fef2f2]', text:'text-[#991b1b]',  border:'border-[#fca5a5]' },
  AWAITING_COORDINATION:  { label:'Awaiting Coordination',   bg:'bg-[#f5f3ff]', text:'text-[#5b21b6]',  border:'border-[#c4b5fd]' },
  NEEDS_VERIFICATION:     { label:'Needs Verification',      bg:'bg-[#eff6ff]', text:'text-[#1e40af]',  border:'border-[#93c5fd]' },
}

const M21_ROWS: InspRow[] = [
  { inspId:'INSP-2026-00418', appId:'MIDC-APP-2026-00418', business:'Aster Precision Components Pvt. Ltd.', service:'Building / Planning', site:'Example MIDC Estate / Plot A-18', inspType:'Building / Planning Site Inspection', requiredBy:'25 Sep 2026', status:'PENDING', assigned:'Unassigned', targetDate:'Not Scheduled', slaImpact:'Inspection Pending', reInspection:false, source:'Configured service workflow' },
  { inspId:'INSP-2026-00391', appId:'MIDC-APP-2026-00391', business:'Kalyan Agro Industries Ltd.', service:'Water / Utility', site:'Chakan Phase II / Plot B-07', inspType:'Utility Site Inspection', requiredBy:'26 Sep 2026', status:'SCHEDULED', assigned:'MIDC Utility Inspection Team', targetDate:'26 Sep 2026', slaImpact:'Within SLA', reInspection:false, source:'Configured service workflow' },
  { inspId:'INSP-2026-00372', appId:'MIDC-APP-2026-00372', business:'Sunrise Pharmaceuticals Pvt. Ltd.', service:'Building / Planning', site:'Taloja MIDC / Plot C-12', inspType:'Building / Planning — Re-inspection', requiredBy:'28 Sep 2026', status:'RE_INSPECTION_REQUIRED', assigned:'Building Inspection Team B', targetDate:'28 Sep 2026', slaImpact:'SLA Risk', reInspection:true, source:'M24 — Observation outcome' },
  { inspId:'INSP-2026-00411', appId:'MIDC-APP-2026-00411', business:'Puretech Engineering Pvt. Ltd.', service:'Building / Planning', site:'Butibori MIDC / Plot D-03', inspType:'Building / Planning Site Inspection', requiredBy:'30 Sep 2026', status:'AWAITING_COORDINATION', assigned:'Building Inspection Team A', targetDate:'30 Sep 2026', slaImpact:'Due Soon', reInspection:false, source:'M14 — Building scrutiny finding' },
  { inspId:'INSP-2026-00398', appId:'MIDC-APP-2026-00398', business:'Vidarbha Food Processing Ltd.', service:'Water / Utility', site:'Nagpur MIDC / Plot E-22', inspType:'Utility Site Inspection', requiredBy:'01 Oct 2026', status:'NEEDS_VERIFICATION', assigned:'Unassigned', targetDate:'Not Scheduled', slaImpact:'Within SLA', reInspection:false, source:'M15 — Water scrutiny finding' },
]

const INSP_FILTERS: Record<string, string[]> = {
  'Status': ['All','Pending','Scheduled','Awaiting Coordination','Re-inspection Required','Completed','Cancelled'],
  'Service': ['All','Building / Planning','Water / Utility'],
  'SLA Risk': ['All','Within SLA','Due Soon','SLA Risk','SLA Breached'],
}

function InspStatusBadge({ status }: { status: InspStatus }) {
  const m = INSP_STATUS_MAP[status]
  return <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold border ${m.bg} ${m.text} ${m.border}`}>{m.label}</span>
}

export function M21InspectionQueuePage({ applicationId, onBack, onPlanInspection, onOpenDepView, onOpenQueryHistory, onOpenDelta }: {
  applicationId?: string
  onBack: () => void; onPlanInspection: (appId: string, inspId: string) => void
  onOpenDepView: (applicationId: string) => void; onOpenQueryHistory: (applicationId: string) => void; onOpenDelta: (applicationId: string) => void
}) {
  const rows = applicationId ? M21_ROWS.filter(row => row.appId === applicationId) : M21_ROWS
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [serviceFilter, setServiceFilter] = useState('All')
  const [slaFilter, setSlaFilter] = useState('All')
  const [selectedId, setSelectedId] = useState<string | null>(() => rows[0]?.inspId ?? null)
  const [sortBy, setSortBy] = useState<'requiredBy' | 'slaImpact' | 'reInspection'>('requiredBy')

  const filtered = rows.filter(r => {
    const q = search.toLowerCase()
    const matchSearch = !q || r.appId.toLowerCase().includes(q) || r.business.toLowerCase().includes(q) || r.site.toLowerCase().includes(q) || r.inspId.toLowerCase().includes(q)
    const matchStatus = statusFilter === 'All' || INSP_STATUS_MAP[r.status].label === statusFilter
    const matchService = serviceFilter === 'All' || r.service === serviceFilter
    const matchSla = slaFilter === 'All' || r.slaImpact === slaFilter
    return matchSearch && matchStatus && matchService && matchSla
  }).sort((a, b) => {
    if (sortBy === 'reInspection') return Number(b.reInspection) - Number(a.reInspection)
    return a.requiredBy.localeCompare(b.requiredBy)
  })

  const selected = rows.find(r => r.inspId === selectedId) ?? null

  const COUNTS = [
    { label:'Pending', count:rows.filter(r=>r.status==='PENDING').length, color:'text-[#9a3412]' },
    { label:'Scheduled', count:rows.filter(r=>r.status==='SCHEDULED').length, color:'text-[#1e40af]' },
    { label:'Completed', count:rows.filter(r=>r.status==='COMPLETED').length, color:'text-[#065f46]' },
    { label:'Re-inspection', count:rows.filter(r=>r.reInspection).length, color:'text-[#991b1b]' },
    { label:'Coord. Required', count:rows.filter(r=>r.status==='AWAITING_COORDINATION').length, color:'text-[#5b21b6]' },
    { label:'SLA Risk', count:rows.filter(r=>r.slaImpact==='SLA Risk').length, color:'text-[#dc2626]' },
  ]

  return (
    <div className="flex-1 flex flex-col bg-[#f8f9fb] min-h-0">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#e5eaf0] px-6 py-2 flex items-center gap-1.5 text-xs text-[#1a2533]">
        <button onClick={onBack} className="hover:text-[#1a3a5c] hover:underline">Department</button>
        <Icon.ChevronRight />
        <span className="text-[#1a2533] font-semibold">M21 — Inspection Queue</span>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-[#e5eaf0] px-6 py-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-base font-bold text-[#1a2533]">Inspection Queue <span className="text-[11px] font-normal text-[#374151] ml-2">M21</span></h1>
          <p className="text-xs text-[#1a2533] mt-0.5">View and manage MIDC inspections requiring scheduling, completion, follow-up or re-inspection.</p>
        </div>
        <div className="flex gap-4 shrink-0 flex-wrap">
          {COUNTS.map(c => (
            <div key={c.label} className="text-center">
              <div className={`text-lg font-black ${c.color}`}>{c.count}</div>
              <div className="text-[9px] text-[#374151] uppercase tracking-wider font-bold">{c.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters + search */}
      <div className="bg-white border-b border-[#e5eaf0] px-6 py-2.5 flex items-center gap-3 flex-wrap">
        <div className="relative">
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search Application, Business, Site, Inspection ID…"
            className="pl-7 pr-3 py-1.5 text-xs border border-[#d1d9e0] rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#1a56db] w-72"
          />
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[#374151] pointer-events-none">
            <Icon.Search />
          </span>
        </div>
        {Object.entries(INSP_FILTERS).map(([label, opts]) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="text-[10px] text-[#374151] font-bold uppercase">{label}</span>
            <select
              value={label==='Status' ? statusFilter : label==='Service' ? serviceFilter : slaFilter}
              onChange={e => label==='Status' ? setStatusFilter(e.target.value) : label==='Service' ? setServiceFilter(e.target.value) : setSlaFilter(e.target.value)}
              className="text-xs border border-[#d1d9e0] rounded px-2 py-1 bg-white focus:outline-none"
            >
              {opts.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        ))}
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-[10px] text-[#374151] font-bold uppercase">Sort</span>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)} className="text-xs border border-[#d1d9e0] rounded px-2 py-1 bg-white focus:outline-none">
            <option value="requiredBy">Required By</option>
            <option value="slaImpact">SLA Risk</option>
            <option value="reInspection">Re-inspection</option>
          </select>
        </div>
      </div>

      {/* Two-column: table + drawer */}
      <div className="flex flex-1 overflow-hidden min-h-0" style={{ minHeight: 400 }}>
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-[#f8f9fb] border-b border-[#e5eaf0]">
                {['Application','Business','Service','Site / Plot','Inspection Type','Required By','Status','Assigned','Target Date','SLA','Re-insp.','Actions'].map(h => (
                  <th key={h} className="px-3 py-2.5 text-left text-[10px] font-bold text-[#374151] uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => (
                <tr
                  key={row.inspId}
                  onClick={() => setSelectedId(row.inspId)}
                  className={`border-b border-[#f0f4f8] cursor-pointer transition-colors ${selectedId === row.inspId ? 'bg-[#ebf3ff]' : 'hover:bg-[#f8f9fb]'}`}
                >
                  <td className="px-3 py-2.5">
                    <div className="font-mono text-[11px] font-semibold text-[#1a3a5c]">{row.appId}</div>
                    <div className="text-[9px] text-[#374151]">{row.inspId}</div>
                  </td>
                  <td className="px-3 py-2.5 font-medium text-[#1a2533] max-w-[140px]">
                    <div className="truncate">{row.business}</div>
                  </td>
                  <td className="px-3 py-2.5 text-[#1a2533] whitespace-nowrap">{row.service}</td>
                  <td className="px-3 py-2.5 text-[#1a2533] max-w-[120px]">
                    <div className="truncate">{row.site}</div>
                  </td>
                  <td className="px-3 py-2.5 text-[#1a2533] max-w-[140px]">
                    <div className="truncate">{row.inspType}</div>
                  </td>
                  <td className="px-3 py-2.5 text-[#1a2533] whitespace-nowrap">{row.requiredBy}</td>
                  <td className="px-3 py-2.5"><InspStatusBadge status={row.status} /></td>
                  <td className="px-3 py-2.5 text-[#1a2533] max-w-[120px]">
                    <div className="truncate">{row.assigned}</div>
                  </td>
                  <td className="px-3 py-2.5 text-[#1a2533] whitespace-nowrap">{row.targetDate}</td>
                  <td className="px-3 py-2.5">
                    <span className={`text-[10px] font-semibold ${row.slaImpact === 'SLA Risk' ? 'text-[#dc2626]' : row.slaImpact === 'Due Soon' ? 'text-[#92400e]' : 'text-[#1a2533]'}`}>{row.slaImpact}</span>
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    {row.reInspection
                      ? <span className="text-[9px] bg-[#fef2f2] text-[#991b1b] px-1.5 py-0.5 rounded font-bold border border-[#fca5a5]">Re-insp.</span>
                      : <span className="text-[10px] text-[#374151]">No</span>
                    }
                  </td>
                  <td className="px-3 py-2.5">
                    <button
                      onClick={e => { e.stopPropagation(); onPlanInspection(row.appId, row.inspId) }}
                      className="text-[10px] text-[#1a56db] hover:underline font-semibold whitespace-nowrap"
                    >
                      {row.status === 'PENDING' || row.status === 'AWAITING_COORDINATION' ? 'Plan →' : row.status === 'SCHEDULED' ? 'View Plan →' : 'View →'}
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={12} className="px-6 py-12 text-center text-xs text-[#374151]">No inspections match the current filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Detail drawer */}
        {selected && (
          <div className="w-72 border-l border-[#e5eaf0] bg-white overflow-y-auto p-4 flex flex-col gap-4 shrink-0">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider">Inspection Detail</div>
              <button onClick={() => setSelectedId(null)} className="text-[#374151] hover:text-[#1a2533]"><Icon.X /></button>
            </div>

            <div className="bg-[#f8f9fb] border border-[#e5eaf0] rounded-lg p-3 space-y-1.5 text-xs">
              <div><span className="text-[9px] text-[#374151] uppercase font-bold">Inspection ID</span><div className="font-mono font-bold text-[#1a3a5c]">{selected.inspId}</div></div>
              <div><span className="text-[9px] text-[#374151] uppercase font-bold">Application</span><div className="font-mono text-[#1a2533]">{selected.appId}</div></div>
              <div><span className="text-[9px] text-[#374151] uppercase font-bold">Business</span><div className="text-[#1a2533] font-semibold">{selected.business}</div></div>
            </div>

            <div className="space-y-1.5 text-xs">
              <Row label="Service" value={selected.service} />
              <Row label="Site" value={selected.site} />
              <Row label="Inspection Type" value={selected.inspType} />
              <Row label="Requirement Source" value={selected.source} />
              <Row label="Required By" value={selected.requiredBy} />
              <Row label="Target Date" value={selected.targetDate} />
              <Row label="Assigned" value={selected.assigned} />
              <Row label="SLA Impact" value={selected.slaImpact} />
              <Row label="Re-inspection" value={selected.reInspection ? 'Yes' : 'No'} />
            </div>

            <div>
              <div className="text-[9px] font-bold text-[#374151] uppercase tracking-wider mb-1">Status</div>
              <InspStatusBadge status={selected.status} />
            </div>

            <div>
              <div className="text-[9px] font-bold text-[#374151] uppercase tracking-wider mb-1.5">Application State</div>
              <span className="text-[10px] font-bold bg-[#fff7ed] text-[#9a3412] border border-[#fdba74] px-1.5 py-0.5 rounded">INSPECTION_PENDING</span>
            </div>

            <div>
              <div className="text-[9px] font-bold text-[#374151] uppercase tracking-wider mb-1.5">Dependency Context</div>
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between"><span className="text-[#1a2533]">MPCB CTE</span><span className="font-semibold text-[#065f46]">Complete</span></div>
                <div className="flex justify-between"><span className="text-[#1a2533]">{selected.service}</span><span className="font-semibold text-[#9a3412]">Inspection Required</span></div>
                <div className="flex justify-between"><span className="text-[#1a2533]">Fire</span><span className="font-semibold text-[#1a2533]">Conditional</span></div>
              </div>
              <button onClick={() => onOpenDepView(selected.appId)} className="mt-1.5 text-[10px] text-[#1a56db] hover:underline">View Regulatory Dependencies → M17</button>
            </div>

            {selected.reInspection && (
              <div className="bg-[#fef2f2] border border-[#fca5a5] rounded p-2 text-[11px] text-[#991b1b]">
                <div className="font-bold mb-0.5">Re-inspection</div>
                <div>Original: {selected.inspId.replace('2','1')}</div>
                <div>Related Obs: OBS-2026-XXXX</div>
              </div>
            )}

            <div className="flex flex-col gap-2 pt-2 border-t border-[#e5eaf0]">
              <div className="text-[9px] font-bold text-[#374151] uppercase tracking-wider">Actions</div>
              <button onClick={() => onPlanInspection(selected.appId, selected.inspId)} className="text-left text-xs text-white font-bold px-3 py-1.5 bg-[#1a3a5c] rounded hover:bg-[#0f2540]">Plan Inspection → M22</button>
              <button onClick={() => onOpenDepView(selected.appId)}      className="text-left text-xs text-[#1a56db] hover:underline px-2 py-1 bg-[#eff6ff] rounded">View Dependency → M17</button>
              <button onClick={() => onOpenQueryHistory(selected.appId)} className="text-left text-xs text-[#1a56db] hover:underline px-2 py-1 bg-[#eff6ff] rounded">View Query History → M19</button>
              <button onClick={() => onOpenDelta(selected.appId)}        className="text-left text-xs text-[#1a56db] hover:underline px-2 py-1 bg-[#eff6ff] rounded">View Delta → M20</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── M22 Inspection Planning ─────────────────────────────────────────────────



export function M22InspectionPlanningPage({ onBack, onBackToQueue, onOpenDna, onOpenDocReview, onOpenDepView, onOpenDelta, onOpenQueryHistory, onOpenWorkspace }: {
  onBack: () => void; onBackToQueue: () => void; onOpenDna: () => void; onOpenDocReview: () => void
  onOpenDepView: () => void; onOpenDelta: () => void; onOpenQueryHistory: () => void; onOpenWorkspace?: () => void
}) {
  const [view, setView] = useState<CalendarView>('calendar')
  const [selectedSlot, setSelectedSlot] = useState<typeof M22_SLOTS[0] | null>(M22_SLOTS[0])
  const [planStatus, setPlanStatus] = useState<PlanStatus>('Draft')
  const [checklist, setChecklist] = useState(M22_CHECKLIST)
  const [confirmed, setConfirmed] = useState(true)

  function toggleCheck(idx: number) {
    setChecklist(prev => prev.map((c, i) => i === idx ? { ...c, done: !c.done } : c))
  }

  function confirmPlan() {
    if (!selectedSlot) return
    setPlanStatus('Scheduled')
    setConfirmed(true)
  }

  const PLAN_STATUS_COLOR: Record<PlanStatus, string> = {
    'Draft': 'text-[#1a2533] bg-[#f3f4f6] border-[#d1d5db]',
    'Coordination Required': 'text-[#5b21b6] bg-[#f5f3ff] border-[#c4b5fd]',
    'Ready to Schedule': 'text-[#065f46] bg-[#ecfdf5] border-[#6ee7b7]',
    'Scheduled': 'text-[#1e40af] bg-[#eff6ff] border-[#93c5fd]',
    'Cancelled': 'text-[#991b1b] bg-[#fef2f2] border-[#fca5a5]',
  }

  const CAL_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const CAL_DATES = [22, 23, 24, 25, 26, 27]

  return (
    <div className="flex-1 flex flex-col bg-[#f8f9fb] min-h-0">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#e5eaf0] px-6 py-2 flex items-center gap-1.5 text-xs text-[#1a2533]">
        <button onClick={onBackToQueue} className="hover:text-[#1a3a5c] hover:underline">Inspection Queue</button>
        <Icon.ChevronRight />
        <span className="text-[#1a2533] font-semibold">M22 — Inspection Planning</span>
      </div>

      {/* Inspection context header */}
      <div className="bg-white border-b border-[#e5eaf0] px-6 py-3">
        <div className="flex items-start gap-6 flex-wrap">
          <div>
            <div className="text-[10px] text-[#374151] uppercase tracking-wider font-bold">Inspection ID</div>
            <div className="font-mono text-sm font-bold text-[#1a3a5c]">INSP-2026-00418</div>
          </div>
          <div>
            <div className="text-[10px] text-[#374151] uppercase tracking-wider font-bold">Application</div>
            <div className="font-mono text-sm font-semibold text-[#1a2533]">MIDC-APP-2026-00418</div>
          </div>
          <div>
            <div className="text-[10px] text-[#374151] uppercase tracking-wider font-bold">Business</div>
            <div className="text-sm text-[#1a2533] font-semibold">Aster Precision Components Pvt. Ltd.</div>
          </div>
          <div>
            <div className="text-[10px] text-[#374151] uppercase tracking-wider font-bold">Service</div>
            <div className="text-sm text-[#1a2533]">Building / Planning</div>
          </div>
          <div>
            <div className="text-[10px] text-[#374151] uppercase tracking-wider font-bold">Status</div>
            <span className={`inline-flex text-[10px] font-bold px-1.5 py-0.5 rounded border ${PLAN_STATUS_COLOR[planStatus]}`}>{planStatus.toUpperCase()}</span>
          </div>
          <div>
            <div className="text-[10px] text-[#374151] uppercase tracking-wider font-bold">Application State</div>
            <span className="text-[10px] font-bold bg-[#fff7ed] text-[#9a3412] border border-[#fdba74] px-1.5 py-0.5 rounded">INSPECTION_PENDING</span>
          </div>
        </div>

        {/* Planning summary strip */}
        <div className="mt-3 grid grid-cols-5 gap-3 text-xs">
          {[
            { label:'Site', value:'Example MIDC Estate — Plot A-18' },
            { label:'MIDC Team', value:'Building / Planning Inspection Team' },
            { label:'Fire', value:'Coordination Requested' },
            { label:'DISH', value:'Not Required' },
            { label:'Common Inspection', value:'Needs Coordination' },
          ].map(c => (
            <div key={c.label} className="bg-[#f8f9fb] border border-[#e5eaf0] rounded p-2">
              <div className="text-[9px] text-[#374151] uppercase font-bold mb-0.5">{c.label}</div>
              <div className="text-[11px] font-semibold text-[#1a2533]">{c.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Delta context banner if applicable */}
      <div className="mx-6 mt-3 bg-[#fffbeb] border border-[#fcd34d] rounded px-4 py-2 flex items-center gap-3">
        <Icon.Warning />
        <div className="flex-1 text-[11px] text-[#92400e]">
          <span className="font-bold">Inspection impact from Delta Re-scrutiny:</span> Building Area changed from 2,000 → 2,300 m². Configured inspection requirement may be affected.
        </div>
        <button onClick={onOpenDelta} className="text-[11px] font-bold text-[#92400e] underline hover:text-[#78350f] shrink-0">View Delta → M20</button>
      </div>

      {/* Three-column main layout */}
      <div className="flex flex-1 overflow-hidden min-h-0 mx-6 mt-4 mb-6 gap-4">

        {/* LEFT — Requirements + Site + Participants */}
        <div className="w-64 shrink-0 flex flex-col gap-4 overflow-y-auto">

          {/* Inspection requirements */}
          <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
            <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-2">Inspection Requirements</div>
            <div className="space-y-1.5 text-xs">
              <Row label="Type" value="Building / Planning Site Inspection" />
              <Row label="Required By" value="25 Sep 2026" />
              <Row label="Source" value="Configured service workflow" />
              <Row label="Checklist" value="MIDC Building / Planning Checklist" />
              <Row label="Re-inspection" value="No" />
            </div>
          </div>

          {/* Site info */}
          <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
            <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-2">Site Information</div>
            <div className="space-y-1.5 text-xs">
              <Row label="Estate" value="Example MIDC Estate" />
              <Row label="Plot" value="A-18" />
              <Row label="Stage" value="Pre-construction" />
              <Row label="Site Contact" value="Needs Verification" />
              <Row label="Access" value="Configured requirement" />
            </div>
            <button onClick={onOpenDna} className="mt-2 text-[10px] text-[#1a56db] hover:underline">View Business DNA → M07</button>
          </div>

          {/* Participating departments */}
          <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
            <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-2">Participating Departments</div>
            {[
              { dept:'MIDC', scope:'Building / Planning Inspection', status:'Confirmed', isExternal:false },
              { dept:'Fire', scope:'Fire-related inspection (if applicable)', status:'Coordination Requested', isExternal:true },
              { dept:'DISH', scope:'Machinery / safety-related inspection', status:'Not Required', isExternal:true },
            ].map(p => (
              <div key={p.dept} className={`mb-2 pb-2 border-b border-[#f0f4f8] last:border-0 last:pb-0 last:mb-0`}>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-xs font-bold text-[#1a2533]">{p.dept}</span>
                  {p.isExternal && <span className="text-[8px] bg-[#f5f3ff] text-[#5b21b6] px-1 py-0.5 rounded font-bold">External</span>}
                </div>
                <div className="text-[10px] text-[#1a2533]">{p.scope}</div>
                <div className={`text-[10px] font-semibold mt-0.5 ${p.status === 'Confirmed' ? 'text-[#065f46]' : p.status === 'Not Required' ? 'text-[#374151]' : 'text-[#5b21b6]'}`}>{p.status}</div>
              </div>
            ))}
            <div className="mt-2 text-[9px] text-[#374151] italic">MIDC cannot assign or approve external department inspection teams.</div>
          </div>

          {/* Common inspection possibility */}
          <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
            <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-1.5">Common Inspection Possibility</div>
            <div className="text-[10px] text-[#1a2533] mb-2">Common inspection is shown only when configured inspection requirements, participating authorities and available windows are compatible.</div>
            <div className="bg-[#f5f3ff] border border-[#c4b5fd] rounded p-2 text-[11px] text-[#5b21b6] font-bold">Needs Coordination</div>
            <div className="text-[10px] text-[#1a2533] mt-1">Fire department availability not yet confirmed. Separate inspection may be required if coordination is not confirmed before target date.</div>
          </div>
        </div>

        {/* CENTER — Calendar */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          <div className="bg-white border border-[#e5eaf0] rounded-lg p-4 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider">Compatible Inspection Windows</div>
              <div className="flex gap-1 bg-[#f8f9fb] border border-[#e5eaf0] rounded p-0.5">
                {(['calendar','list'] as CalendarView[]).map(v => (
                  <button key={v} onClick={() => setView(v)} className={`px-2.5 py-1 rounded text-[10px] font-bold capitalize transition-colors ${view === v ? 'bg-white text-[#1a3a5c] shadow-sm' : 'text-[#374151] hover:text-[#1a2533]'}`}>{v}</button>
                ))}
              </div>
            </div>

            {view === 'calendar' ? (
              <div>
                <div className="text-xs font-bold text-[#1a2533] mb-2">September 2026</div>
                <div className="grid grid-cols-6 gap-1 mb-3">
                  {CAL_DAYS.map(d => <div key={d} className="text-center text-[9px] font-bold text-[#374151] uppercase py-1">{d}</div>)}
                  {CAL_DATES.map(d => {
                    const slot = M22_SLOTS.find(s => s.date.startsWith(`${d} Sep`))
                    const isSelected = selectedSlot?.date.startsWith(`${d} Sep`)
                    return (
                      <button
                        key={d}
                        onClick={() => slot && setSelectedSlot(slot)}
                        className={`rounded p-2 text-center transition-colors border ${
                          slot
                            ? slot.compatible === 'Compatible'
                              ? isSelected ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'bg-[#ecfdf5] border-[#6ee7b7] text-[#065f46] hover:bg-[#d1fae5] cursor-pointer'
                              : slot.compatible === 'Needs Coordination'
                              ? 'bg-[#f5f3ff] border-[#c4b5fd] text-[#5b21b6] cursor-pointer hover:bg-[#ede9fe]'
                              : 'bg-[#fef2f2] border-[#fca5a5] text-[#374151] cursor-not-allowed'
                            : 'bg-white border-[#e5eaf0] text-[#1a2533] hover:bg-[#f8f9fb] cursor-pointer'
                        }`}
                      >
                        <div className="text-sm font-bold">{d}</div>
                        {slot && <div className="text-[8px] font-semibold mt-0.5">{slot.time}</div>}
                        {slot && <div className="text-[8px] mt-0.5">{slot.compatible === 'Compatible' ? '✓' : slot.compatible === 'Not Compatible' ? '✕' : '⟳'}</div>}
                      </button>
                    )
                  })}
                </div>
                <div className="flex gap-4 text-[10px] text-[#1a2533]">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#ecfdf5] border border-[#6ee7b7] inline-block"/>Compatible</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#f5f3ff] border border-[#c4b5fd] inline-block"/>Needs Coordination</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#fef2f2] border border-[#fca5a5] inline-block"/>Not Compatible</span>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f8f9fb] border-b border-[#e5eaf0]">
                      {['Date','Time','MIDC','Fire','DISH','Compatibility','Select'].map(h => (
                        <th key={h} className="px-2 py-2 text-left text-[10px] font-bold text-[#374151] uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {M22_SLOTS.map(s => (
                      <tr key={s.date} className={`border-b border-[#f0f4f8] ${selectedSlot?.date === s.date ? 'bg-[#ebf3ff]' : 'hover:bg-[#f8f9fb]'}`}>
                        <td className="px-2 py-2 font-semibold">{s.date}</td>
                        <td className="px-2 py-2">{s.time}</td>
                        <td className="px-2 py-2 text-[#065f46]">{s.midc}</td>
                        <td className={`px-2 py-2 ${s.fire === 'Available' ? 'text-[#065f46]' : s.fire === 'Unavailable' ? 'text-[#991b1b]' : 'text-[#5b21b6]'}`}>{s.fire}</td>
                        <td className="px-2 py-2 text-[#374151]">{s.dish}</td>
                        <td className="px-2 py-2">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${s.compatible === 'Compatible' ? 'bg-[#ecfdf5] text-[#065f46]' : s.compatible === 'Not Compatible' ? 'bg-[#fef2f2] text-[#991b1b]' : 'bg-[#f5f3ff] text-[#5b21b6]'}`}>{s.compatible}</span>
                        </td>
                        <td className="px-2 py-2">
                          <button onClick={() => setSelectedSlot(s)} disabled={s.compatible === 'Not Compatible'} className="text-[10px] text-[#1a56db] hover:underline disabled:text-[#374151] disabled:cursor-not-allowed">Select</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Plan actions (always visible at top) + selected slot */}
        <div className="w-64 shrink-0 flex flex-col gap-4 overflow-y-auto">

          {/* Plan actions / confirmed state — FIRST so it's always visible */}
          {confirmed ? (
            <div className="bg-[#ecfdf5] border-2 border-[#059669] rounded-lg p-4">
              <div className="text-xs font-bold text-[#065f46] mb-2">✓ Inspection Plan Scheduled</div>
              <div className="text-[11px] text-[#1a2533] space-y-1">
                <div>Date: <span className="font-semibold">{selectedSlot?.date}</span></div>
                <div>Time: <span className="font-semibold">{selectedSlot?.time}</span></div>
                <div>Status: <span className="font-bold text-[#1e40af]">SCHEDULED</span></div>
              </div>
              <div className="mt-2 text-[10px] text-[#065f46]">Application state → INSPECTION_SCHEDULED where configured workflow requires it.</div>
              <button
                onClick={() => onOpenWorkspace?.()}
                className="mt-3 w-full px-3 py-2.5 text-xs font-bold bg-[#1a3a5c] text-white rounded hover:bg-[#0f2540] cursor-pointer"
              >Open Inspection Workspace → M23</button>
            </div>
          ) : (
            <div className="bg-white border border-[#e5eaf0] rounded-lg p-4 flex flex-col gap-2">
              <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-1">Plan Actions</div>
              <button
                onClick={confirmPlan}
                disabled={!selectedSlot}
                className="w-full px-3 py-2 text-xs font-bold bg-[#1a3a5c] text-white rounded hover:bg-[#0f2540] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >Confirm Inspection Plan</button>
              <button
                onClick={() => setPlanStatus('Draft')}
                className="w-full px-3 py-2 text-xs font-semibold border border-[#d1d9e0] text-[#1a2533] rounded hover:bg-[#f8f9fb] transition-colors"
              >Save Draft</button>
              <button
                onClick={() => setPlanStatus('Cancelled')}
                className="w-full px-3 py-2 text-xs font-semibold text-[#991b1b] hover:underline transition-colors"
              >Cancel Plan</button>
              <div className="text-[9px] text-[#374151] mt-1">Confirming the plan schedules the inspection. Date selection alone does not schedule it automatically.</div>
            </div>
          )}

          {/* Selected slot card */}
          {selectedSlot ? (
            <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
              <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-2">Selected Window</div>
              <div className="text-sm font-bold text-[#1a2533]">{selectedSlot.date}</div>
              <div className="text-sm text-[#1a2533]">{selectedSlot.time}</div>
              <div className="mt-2 space-y-1 text-xs">
                <Row label="MIDC" value={selectedSlot.midc} />
                <Row label="Fire" value={selectedSlot.fire} />
                <Row label="DISH" value={selectedSlot.dish} />
              </div>
              <div className="mt-2">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${selectedSlot.compatible === 'Compatible' ? 'bg-[#ecfdf5] text-[#065f46]' : selectedSlot.compatible === 'Not Compatible' ? 'bg-[#fef2f2] text-[#991b1b]' : 'bg-[#f5f3ff] text-[#5b21b6]'}`}>{selectedSlot.compatible}</span>
              </div>
              {selectedSlot.compatible !== 'Compatible' && (
                <div className="mt-2 text-[10px] text-[#9a3412] bg-[#fff7ed] border border-[#fdba74] rounded p-2">
                  Coordination required before confirming.
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-[#e5eaf0] rounded-lg p-4 text-center text-[11px] text-[#374151]">
              Select a date from the calendar to set the inspection window.
            </div>
          )}

          {/* Shared documents */}
          <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
            <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-2">Shared Documents</div>
            {['Building Plan v2','Land / Plot Record','MIDC Application Documents'].map(d => (
              <div key={d} className="flex items-center justify-between py-1 border-b border-[#f0f4f8] last:border-0">
                <span className="text-[11px] text-[#1a2533]">{d}</span>
                <button onClick={onOpenDocReview} className="text-[10px] text-[#1a56db] hover:underline">View</button>
              </div>
            ))}
          </div>

          {/* MIDC checklist */}
          <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
            <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-2">MIDC Inspection Checklist</div>
            {checklist.map((c, i) => (
              <label key={i} className="flex items-start gap-2 py-1 cursor-pointer">
                <input type="checkbox" checked={c.done} onChange={() => toggleCheck(i)} className="mt-0.5 w-3.5 h-3.5 shrink-0" />
                <span className={`text-[11px] ${c.done ? 'line-through text-[#374151]' : 'text-[#1a2533]'}`}>{c.item}</span>
              </label>
            ))}
            <div className="mt-1.5 text-[9px] text-[#374151] italic">Checklist is configurable by service and inspection type.</div>
          </div>

          {/* Entrepreneur prep */}
          <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
            <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-2">Entrepreneur Preparation</div>
            {['Make site accessible','Provide relevant documents on-site','Ensure authorised representative is present','Prepare configured equipment / records'].map((p, i) => (
              <div key={i} className="text-[11px] text-[#1a2533] py-1 border-b border-[#f0f4f8] last:border-0 flex items-center gap-1.5">
                <span className="text-[#374151]">•</span>{p}
              </div>
            ))}
            <div className="mt-1.5 text-[9px] text-[#374151] italic">Source: Configured inspection requirement. Entrepreneur receives inspection details upon confirmation.</div>
          </div>

          {/* Quick links */}
          <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
            <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-2">Quick Links</div>
            <div className="flex flex-col gap-1.5">
              <button onClick={onOpenDepView}      className="text-left text-[10px] text-[#1a56db] hover:underline">View Regulatory Dependencies → M17</button>
              <button onClick={onOpenQueryHistory} className="text-left text-[10px] text-[#1a56db] hover:underline">View Query History → M19</button>
              <button onClick={onOpenDelta}        className="text-left text-[10px] text-[#1a56db] hover:underline">View Delta → M20</button>
              <button onClick={onOpenDna}          className="text-left text-[10px] text-[#1a56db] hover:underline">View Business DNA → M07</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── M23 Inspection Workspace ────────────────────────────────────────────────


const M23_CHECKLIST: CheckItem[] = [
  { id:'c1', category:'Site Identity',       item:'Site identity matches application record',    dnaValue:'MIDC Estate — Plot A-18', appValue:'Example MIDC Estate / A-18', status:'Checked',      comment:'' },
  { id:'c2', category:'Plot / Land Context', item:'Plot area matches current project parameters', dnaValue:'5,200 m²',               appValue:'5,200 m²',                status:'Checked',      comment:'' },
  { id:'c3', category:'Building / Planning', item:'Building plan reflects current project scope', dnaValue:'2,300 m²',               appValue:'2,300 m²',                status:'Observation',  comment:'Submitted plan v2 does not reflect updated parameters.' },
  { id:'c4', category:'Building / Planning', item:'Building height and floors conform to MIDC norms', dnaValue:'G+2', appValue:'G+2',                     status:'Checked',      comment:'' },
  { id:'c5', category:'Application Data',    item:'Application data matches on-site conditions', dnaValue:'—',                     appValue:'—',                       status:'Checked',      comment:'' },
  { id:'c6', category:'Documents',           item:'Building Plan v2 available on-site',          dnaValue:'—',                     appValue:'v2',                      status:'Observation',  comment:'v2 plan available but does not match updated scope.' },
  { id:'c7', category:'Documents',           item:'Land / Plot Record available on-site',        dnaValue:'—',                     appValue:'v3',                      status:'Checked',      comment:'' },
  { id:'c8', category:'Site Conditions',     item:'Site accessible and ready for inspection',    dnaValue:'—',                     appValue:'—',                       status:'Checked',      comment:'' },
]

const M23_OBSERVATIONS: ObsRecord[] = [
  { id:'OBS-2026-00418-01', category:'Building / Planning', finding:'Submitted building plan v2 does not reflect the current project parameters (building area 2,300 m²). Plan shows 2,000 m².', evidence:'Building Plan v2', comment:'Provide corrected building plan reflecting the current project configuration.', correctionRequired:true, reInspectionRequired:true },
  { id:'OBS-2026-00418-02', category:'Documents',           finding:'Land survey map is an older version and may not reflect recent plot boundary confirmation.',                                   evidence:'Land Record v3',    comment:'Verification of current plot boundaries recommended.',                       correctionRequired:false, reInspectionRequired:false },
]

const OUTCOME_META: Record<InspOutcome, { label: string; bg: string; text: string; border: string; desc: string }> = {
  PASS:                  { label:'PASS',                  bg:'bg-[#ecfdf5]', text:'text-[#065f46]', border:'border-[#6ee7b7]', desc:'No further inspection action identified.' },
  OBSERVATION:           { label:'OBSERVATION',           bg:'bg-[#fffbeb]', text:'text-[#92400e]', border:'border-[#fcd34d]', desc:'Observation recorded; further action depends on configured workflow.' },
  NON_COMPLIANT:         { label:'NON-COMPLIANT',         bg:'bg-[#fef2f2]', text:'text-[#991b1b]', border:'border-[#fca5a5]', desc:'Configured inspection finding indicates non-compliance.' },
  CORRECTION_REQUIRED:   { label:'CORRECTION REQUIRED',   bg:'bg-[#fff7ed]', text:'text-[#9a3412]', border:'border-[#fdba74]', desc:'Entrepreneur action is required before the workflow can continue.' },
  RE_INSPECTION_REQUIRED:{ label:'RE-INSPECTION REQUIRED',bg:'bg-[#f5f3ff]', text:'text-[#5b21b6]', border:'border-[#c4b5fd]', desc:'Follow-up inspection is required according to the recorded outcome/configuration.' },
}
const CHECK_STATUS_STYLE: Record<CheckStatus, { bg: string; text: string }> = {
  'Not Checked':       { bg:'bg-[#f3f4f6]', text:'text-[#1a2533]' },
  'Checked':           { bg:'bg-[#ecfdf5]', text:'text-[#065f46]' },
  'Observation':       { bg:'bg-[#fff7ed]', text:'text-[#9a3412]' },
  'Not Applicable':    { bg:'bg-[#f9fafb]', text:'text-[#374151]' },
  'Needs Verification':{ bg:'bg-[#eff6ff]', text:'text-[#1e40af]' },
}

export function M23InspectionWorkspacePage({ onBack, onBackToQueue, onOpenM24, onOpenDocReview, onOpenDna, onOpenDepView, onOpenQueryHistory, onOpenDelta, onOpenConsistency }: {
  onBack: () => void; onBackToQueue: () => void; onOpenM24: () => void
  onOpenDocReview: () => void; onOpenDna: () => void; onOpenDepView: () => void
  onOpenQueryHistory: () => void; onOpenDelta: () => void; onOpenConsistency: () => void
}) {
  const [checklist, setChecklist] = useState<CheckItem[]>(M23_CHECKLIST)
  const [observations] = useState<ObsRecord[]>(M23_OBSERVATIONS)
  const [outcome, setOutcome] = useState<InspOutcome | null>('CORRECTION_REQUIRED')
  const [inspStatus, setInspStatus] = useState<'Scheduled' | 'In Progress' | 'Completed' | 'Correction Required' | 'Re-inspection Required'>('Completed')
  const [recommendation, setRecommendation] = useState('Corrected building plan required. Schedule re-inspection after correction is reviewed.')
  const [completed, setCompleted] = useState(true)

  function setCheckStatus(id: string, status: CheckStatus) {
    setChecklist(prev => prev.map(c => c.id === id ? { ...c, status } : c))
  }
  function setCheckComment(id: string, comment: string) {
    setChecklist(prev => prev.map(c => c.id === id ? { ...c, comment } : c))
  }

  const outcomeMeta = outcome ? OUTCOME_META[outcome] : null
  const categories = [...new Set(checklist.map(c => c.category))]

  return (
    <div className="flex-1 flex flex-col bg-[#f8f9fb] min-h-0">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#e5eaf0] px-6 py-2 flex items-center gap-1.5 text-xs text-[#1a2533]">
        <button onClick={onBackToQueue} className="hover:text-[#1a3a5c] hover:underline">Inspection Queue</button>
        <Icon.ChevronRight />
        <button onClick={onBack} className="hover:text-[#1a3a5c] hover:underline">Inspection Planning</button>
        <Icon.ChevronRight />
        <span className="text-[#1a2533] font-semibold">M23 — Inspection Workspace</span>
      </div>

      {/* App + Inspection context */}
      <div className="bg-white border-b border-[#e5eaf0] px-6 py-3">
        <div className="flex flex-wrap gap-x-8 gap-y-2 items-start">
          <div><div className="text-[10px] text-[#374151] uppercase font-bold">Application</div><div className="font-mono text-sm font-bold text-[#1a3a5c]">MIDC-APP-2026-00418</div></div>
          <div><div className="text-[10px] text-[#374151] uppercase font-bold">Inspection ID</div><div className="font-mono text-sm font-bold text-[#1a2533]">INSP-2026-00418</div></div>
          <div><div className="text-[10px] text-[#374151] uppercase font-bold">Business</div><div className="text-sm font-semibold text-[#1a2533]">Aster Precision Components Pvt. Ltd.</div></div>
          <div><div className="text-[10px] text-[#374151] uppercase font-bold">Service</div><div className="text-sm text-[#1a2533]">Building / Planning</div></div>
          <div><div className="text-[10px] text-[#374151] uppercase font-bold">App State</div><span className="text-[10px] font-bold bg-[#eff6ff] text-[#1e40af] border border-[#93c5fd] px-1.5 py-0.5 rounded">INSPECTION_SCHEDULED</span></div>
          <div><div className="text-[10px] text-[#374151] uppercase font-bold">Inspection Status</div><span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${inspStatus === 'Completed' ? 'bg-[#ecfdf5] text-[#065f46] border-[#6ee7b7]' : inspStatus === 'Correction Required' ? 'bg-[#fff7ed] text-[#9a3412] border-[#fdba74]' : 'bg-[#fffbeb] text-[#92400e] border-[#fcd34d]'}`}>{inspStatus}</span></div>
          <div className="border-l border-[#e5eaf0] pl-6 flex gap-4">
            <div><div className="text-[10px] text-[#374151] uppercase font-bold">Date</div><div className="text-xs font-semibold text-[#1a2533]">25 Sep 2026</div></div>
            <div><div className="text-[10px] text-[#374151] uppercase font-bold">Time</div><div className="text-xs font-semibold text-[#1a2533]">10:30 AM</div></div>
            <div><div className="text-[10px] text-[#374151] uppercase font-bold">Inspector</div><div className="text-xs text-[#1a2533]">Building / Planning Inspection Team</div></div>
          </div>
          <div className="ml-auto flex gap-2 flex-wrap text-[10px]">
            <button onClick={onOpenDna}          className="text-[#1a56db] hover:underline">Business DNA → M07</button>
            <button onClick={onOpenQueryHistory} className="text-[#1a56db] hover:underline">Query History → M19</button>
            <button onClick={onOpenDelta}        className="text-[#1a56db] hover:underline">Delta → M20</button>
            <button onClick={onOpenDepView}      className="text-[#1a56db] hover:underline">Dependencies → M17</button>
          </div>
        </div>
      </div>

      {/* Main three-column layout */}
      <div className="flex flex-1 gap-4 p-4 overflow-hidden min-h-0" style={{ minHeight: 600 }}>

        {/* LEFT — Site context + documents + dependency */}
        <div className="w-56 shrink-0 flex flex-col gap-3 overflow-y-auto">
          {/* Site card */}
          <div className="bg-white border border-[#e5eaf0] rounded-lg p-3">
            <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-2">Inspection Context</div>
            <div className="space-y-1 text-xs">
              {[
                ['Business DNA', 'v4'],['Business Type', 'Precision Engineering'],
                ['Project Stage', 'Construction'],['MIDC Estate', 'Example MIDC Estate'],
                ['Plot', 'A-18'],['Plot Area', '5,200 m²'],['Building Area', '2,300 m²'],
                ['Floors', 'G+2'],['Occupancy', 'Industrial'],
              ].map(([l,v]) => (
                <div key={l} className="flex justify-between gap-2">
                  <span className="text-[#374151] text-[10px] shrink-0">{l}</span>
                  <span className="text-[#1a2533] font-medium text-right text-[11px]">{v}</span>
                </div>
              ))}
            </div>
            <button onClick={onOpenDna} className="mt-2 text-[10px] text-[#1a56db] hover:underline">View Business DNA → M07</button>
          </div>

          {/* Inspection documents */}
          <div className="bg-white border border-[#e5eaf0] rounded-lg p-3">
            <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-2">Inspection Documents</div>
            {[
              { name:'Building Plan', ver:'v2', status:'Needs Verification', note:'Updated since plan' },
              { name:'Land / Plot Record', ver:'v3', status:'Department Verified', note:'' },
              { name:'MIDC Application', ver:'v2', status:'Department Verified', note:'' },
            ].map(d => (
              <div key={d.name} className="py-1.5 border-b border-[#f0f4f8] last:border-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] font-semibold text-[#1a2533]">{d.name}</span>
                  <span className="text-[9px] text-[#374151]">{d.ver}</span>
                </div>
                {d.note && <div className="text-[9px] text-[#92400e] italic">{d.note}</div>}
                <div className="flex items-center justify-between mt-0.5">
                  <span className={`text-[9px] font-semibold ${d.status === 'Needs Verification' ? 'text-[#1e40af]' : 'text-[#065f46]'}`}>{d.status}</span>
                  <button onClick={onOpenDocReview} className="text-[9px] text-[#1a56db] hover:underline">View</button>
                </div>
              </div>
            ))}
          </div>

          {/* Dependency context */}
          <div className="bg-white border border-[#e5eaf0] rounded-lg p-3">
            <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-2">Dependency Context</div>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between"><span className="text-[#1a2533]">MPCB CTE</span><span className="font-semibold text-[#065f46]">Complete</span></div>
              <div className="flex justify-between"><span className="text-[#1a2533]">MIDC Bldg / Planning</span><span className="font-semibold text-[#9a3412]">In Progress</span></div>
              <div className="flex justify-between"><span className="text-[#1a2533]">Fire</span><span className="font-semibold text-[#1a2533]">Conditional</span></div>
              <div className="flex justify-between"><span className="text-[#1a2533]">Construction</span><span className="font-semibold text-[#374151]">Downstream</span></div>
            </div>
            <button onClick={onOpenDepView} className="mt-2 text-[10px] text-[#1a56db] hover:underline">View Dependencies → M17</button>
          </div>

          {/* Evidence capture placeholder */}
          <div className="bg-[#f8f9fb] border border-dashed border-[#d1d9e0] rounded-lg p-3">
            <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-1">Inspection Evidence Capture</div>
            <div className="text-[10px] text-[#374151] italic mb-2">Capture / upload capability — configured prototype placeholder</div>
            <div className="flex flex-col gap-1.5">
              {['Photo','Document','Site Evidence'].map(t => (
                <div key={t} className="flex items-center gap-2 text-[10px] text-[#1a2533] border border-[#e5eaf0] rounded px-2 py-1 bg-white">
                  <span className="w-3 h-3 rounded bg-[#d1d9e0]"/>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER — MIDC Inspection Checklist */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-3 min-w-0">
          <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-[#e5eaf0] flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[#1a2533]">MIDC Inspection Checklist</div>
                <div className="text-[10px] text-[#374151]">Building / Planning Inspection Checklist — Version 2026.09</div>
              </div>
              <div className="text-[10px] text-[#374151]">
                {checklist.filter(c=>c.status==='Checked').length}/{checklist.length} checked
              </div>
            </div>
            <div className="divide-y divide-[#94a3b8]">
              {categories.map(cat => (
                <div key={cat}>
                  <div className="px-4 py-1.5 bg-[#f8f9fb] text-[9px] font-bold text-[#374151] uppercase tracking-wider">{cat}</div>
                  {checklist.filter(c => c.category === cat).map(item => (
                    <div key={item.id} className="px-4 py-2.5 flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-[#1a2533] font-medium">{item.item}</div>
                        {(item.dnaValue || item.appValue) && (
                          <div className="flex gap-3 mt-1 text-[10px]">
                            {item.dnaValue && item.dnaValue !== '—' && <span className="text-[#374151]">DNA: <span className="text-[#1a2533] font-medium">{item.dnaValue}</span></span>}
                            {item.appValue && item.appValue !== '—' && <span className="text-[#374151]">App: <span className="text-[#1a2533] font-medium">{item.appValue}</span></span>}
                          </div>
                        )}
                        {item.status === 'Observation' && (
                          <input
                            value={item.comment}
                            onChange={e => setCheckComment(item.id, e.target.value)}
                            placeholder="Officer comment…"
                            className="mt-1.5 w-full text-[11px] border border-[#d1d9e0] rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#1a56db]"
                          />
                        )}
                      </div>
                      <select
                        value={item.status}
                        onChange={e => setCheckStatus(item.id, e.target.value as CheckStatus)}
                        className={`shrink-0 text-[10px] font-bold px-2 py-1 rounded border focus:outline-none ${CHECK_STATUS_STYLE[item.status].bg} ${CHECK_STATUS_STYLE[item.status].text}`}
                      >
                        {(['Not Checked','Checked','Observation','Not Applicable','Needs Verification'] as CheckStatus[]).map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Observations */}
          <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-[#e5eaf0]">
              <div className="text-xs font-bold text-[#1a2533]">Inspection Observations ({observations.length})</div>
            </div>
            {observations.map(obs => (
              <div key={obs.id} className="px-4 py-3 border-b border-[#f0f4f8] last:border-0">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] font-bold text-[#1a3a5c]">{obs.id}</span>
                      <span className="text-[9px] bg-[#f3f4f6] text-[#1a2533] px-1.5 py-0.5 rounded">{obs.category}</span>
                      {obs.correctionRequired && <span className="text-[9px] bg-[#fff7ed] text-[#9a3412] border border-[#fdba74] px-1.5 py-0.5 rounded font-bold">Correction Required</span>}
                      {obs.reInspectionRequired && <span className="text-[9px] bg-[#f5f3ff] text-[#5b21b6] border border-[#c4b5fd] px-1.5 py-0.5 rounded font-bold">Re-inspection Required</span>}
                    </div>
                    <div className="text-xs text-[#1a2533]">{obs.finding}</div>
                    <div className="text-[10px] text-[#374151] mt-0.5">Evidence: <span className="font-semibold text-[#1a2533]">{obs.evidence}</span></div>
                    <div className="text-[10px] text-[#1a2533] mt-0.5 italic">"{obs.comment}"</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Outcome + Recommendation + Actions */}
        <div className="w-56 shrink-0 flex flex-col gap-3 overflow-y-auto">
          {/* Inspection outcome */}
          <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
            <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-2">Inspection Outcome</div>
            <div className="flex flex-col gap-1.5">
              {(Object.keys(OUTCOME_META) as InspOutcome[]).map(k => {
                const m = OUTCOME_META[k]
                return (
                  <button
                    key={k}
                    onClick={() => setOutcome(k)}
                    className={`text-left px-2.5 py-2 rounded border text-[10px] font-bold transition-colors ${outcome === k ? `${m.bg} ${m.text} ${m.border} ring-2 ring-offset-1 ring-current` : 'bg-white text-[#1a2533] border-[#d1d9e0] hover:bg-[#f8f9fb]'}`}
                  >
                    {m.label}
                  </button>
                )
              })}
            </div>
            {outcomeMeta && (
              <div className={`mt-3 rounded p-2 text-[10px] ${outcomeMeta.bg} ${outcomeMeta.text} border ${outcomeMeta.border}`}>
                {outcomeMeta.desc}
              </div>
            )}
            <div className="mt-2 text-[9px] text-[#374151] italic">This outcome is an inspector finding. It is NOT a final statutory application decision. Final decision: M25.</div>
          </div>

          {/* Inspector recommendation */}
          <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
            <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-2">Inspector Recommendation</div>
            <textarea
              value={recommendation}
              onChange={e => setRecommendation(e.target.value)}
              rows={4}
              className="w-full text-[11px] border border-[#d1d9e0] rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#1a56db] resize-none"
              placeholder="Recommended next action…"
            />
            <div className="text-[9px] text-[#374151] mt-1 italic">Label: "Inspector Recommendation" — not a final decision.</div>
          </div>

          {/* Audit */}
          <div className="bg-white border border-[#e5eaf0] rounded-lg p-3">
            <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-2">Inspection Record</div>
            <div className="space-y-1 text-[10px]">
              <Row label="Delta ID" value="DELTA-2026-0018" />
              <Row label="Query ID" value="QRY-2026-0042" />
              <Row label="Business DNA" value="v4" />
              <Row label="Checklist Ver." value="2026.09" />
              <Row label="Application Ver." value="v2" />
            </div>
          </div>

          {/* Primary actions */}
          <div className="bg-white border border-[#e5eaf0] rounded-lg p-4 flex flex-col gap-2">
            <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-1">Actions</div>
            {!completed ? (
              <>
                <button onClick={() => { setInspStatus('Correction Required'); setCompleted(true) }} className="w-full px-3 py-2 text-xs font-bold bg-[#1a3a5c] text-white rounded hover:bg-[#0f2540]">Complete Inspection</button>
                <button className="w-full px-3 py-1.5 text-xs font-semibold border border-[#d1d9e0] text-[#1a2533] rounded hover:bg-[#f8f9fb]">Save Progress</button>
              </>
            ) : (
              <>
                <div className="text-[10px] text-[#065f46] font-bold bg-[#ecfdf5] border border-[#6ee7b7] rounded px-2 py-1.5">Inspection Completed — 25 Sep 2026</div>
                <button onClick={onOpenM24} className="w-full px-3 py-2 text-xs font-bold bg-[#9a3412] text-white rounded hover:bg-[#7c2d12]">Open Observation / Re-inspection → M24</button>
                <button onClick={onOpenConsistency} className="text-left text-[10px] text-[#1a56db] hover:underline px-2 py-1 bg-[#eff6ff] rounded">View Cross-form Consistency → M16</button>
                <button onClick={onOpenDelta}        className="text-left text-[10px] text-[#1a56db] hover:underline px-2 py-1 bg-[#eff6ff] rounded">View Delta → M20</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── M24 Observation / Re-inspection ─────────────────────────────────────────


const OBS_STATE_META: Record<ObsState, { label: string; bg: string; text: string; border: string }> = {
  OPEN:                    { label:'Open',                    bg:'bg-[#f3f4f6]', text:'text-[#374151]', border:'border-[#d1d5db]' },
  AWAITING_ENTREPRENEUR:   { label:'Awaiting Entrepreneur',   bg:'bg-[#fff7ed]', text:'text-[#9a3412]', border:'border-[#fdba74]' },
  RESPONSE_RECEIVED:       { label:'Response Received',       bg:'bg-[#eff6ff]', text:'text-[#1e40af]', border:'border-[#93c5fd]' },
  UNDER_OFFICER_REVIEW:    { label:'Under Officer Review',    bg:'bg-[#fffbeb]', text:'text-[#92400e]', border:'border-[#fcd34d]' },
  RE_INSPECTION_REQUIRED:  { label:'Re-inspection Required',  bg:'bg-[#f5f3ff]', text:'text-[#5b21b6]', border:'border-[#c4b5fd]' },
  RE_INSPECTION_SCHEDULED: { label:'Re-inspection Scheduled', bg:'bg-[#eff6ff]', text:'text-[#1e40af]', border:'border-[#93c5fd]' },
  RESOLVED:                { label:'Resolved',                bg:'bg-[#ecfdf5]', text:'text-[#065f46]', border:'border-[#6ee7b7]' },
  REOPENED:                { label:'Reopened',                bg:'bg-[#fef2f2]', text:'text-[#991b1b]', border:'border-[#fca5a5]' },
}

const M24_TIMELINE: M24Event[] = [
  { date:'25 Sep 2026', type:'INSPECTION',           id:'INSP-2026-00418',    title:'Inspection Conducted',         detail:'Building / Planning Site Inspection completed.', actor:'Building / Planning Inspection Team', status:'Correction Required' },
  { date:'25 Sep 2026', type:'OBSERVATION',          id:'OBS-2026-00418-01',  title:'Observation Recorded',         detail:'Submitted building plan v2 does not reflect the current project parameters (building area 2,300 m²).', actor:'Inspection Officer', evidence:'Building Plan v2' },
  { date:'26 Sep 2026', type:'CORRECTION_REQUESTED', id:'DEF-2026-0092',      title:'Correction Requested',         detail:'Provide corrected building plan reflecting the current project configuration.', actor:'MIDC Officer', status:'Linked to QRY-2026-0042' },
  { date:'28 Sep 2026', type:'ENTREPRENEUR_RESPONSE',id:'QRY-2026-0042',      title:'Entrepreneur Response Received',detail:'Corrected plan uploaded.', actor:'Entrepreneur', evidence:'Building Plan v3' },
  { date:'28 Sep 2026', type:'NEW_EVIDENCE',         id:'BUILD-PLAN-00418-v3',title:'New Evidence Submitted',        detail:'Corrected Building Plan v3 submitted by entrepreneur.', actor:'Entrepreneur', evidence:'Building Plan v3' },
  { date:'29 Sep 2026', type:'OFFICER_REVIEW',       id:'REVIEW-001',         title:'Officer Review',               detail:'Evidence reviewed. Plan v3 submitted but re-inspection required to verify on-site compliance.', actor:'MIDC Officer', status:'Re-inspection Required' },
  { date:'01 Oct 2026', type:'RE_INSPECTION',        id:'INSP-2026-00418-R1', title:'Re-inspection Scheduled',      detail:'Re-inspection planned — Building / Planning Inspection Team.', actor:'MIDC Officer', status:'Scheduled' },
  { date:'01 Oct 2026', type:'RESOLVED',             id:'OBS-2026-00418-01',  title:'Observation Resolved',         detail:'Re-inspection outcome: site confirms corrected plan. Observation resolved.', actor:'Inspection Officer', status:'Resolved' },
]

const EVENT_TYPE_STYLE: Record<string, { bg: string; text: string; dot: string }> = {
  INSPECTION:           { bg:'bg-[#eff6ff]', text:'text-[#1e40af]', dot:'bg-[#1e40af]' },
  OBSERVATION:          { bg:'bg-[#fff7ed]', text:'text-[#9a3412]',  dot:'bg-[#9a3412]' },
  CORRECTION_REQUESTED: { bg:'bg-[#fef2f2]', text:'text-[#991b1b]',  dot:'bg-[#dc2626]' },
  ENTREPRENEUR_RESPONSE:{ bg:'bg-[#ecfdf5]', text:'text-[#065f46]',  dot:'bg-[#059669]' },
  NEW_EVIDENCE:         { bg:'bg-[#ecfdf5]', text:'text-[#065f46]',  dot:'bg-[#059669]' },
  OFFICER_REVIEW:       { bg:'bg-[#fffbeb]', text:'text-[#92400e]',  dot:'bg-[#d97706]' },
  RE_INSPECTION:        { bg:'bg-[#f5f3ff]', text:'text-[#5b21b6]',  dot:'bg-[#7c3aed]' },
  RESOLVED:             { bg:'bg-[#ecfdf5]', text:'text-[#065f46]',  dot:'bg-[#059669]' },
}

export function M24ObservationReinspectionPage({ onBack, onBackToM23, onOpenM22, onOpenDocReview, onOpenQueryHistory, onOpenDelta, onOpenDepView }: {
  onBack: () => void; onBackToM23: () => void; onOpenM22: () => void
  onOpenDocReview: () => void; onOpenQueryHistory: () => void; onOpenDelta: () => void; onOpenDepView: () => void
}) {
  const [obsFilter, setObsFilter] = useState<'All' | ObsState>('All')
  const [selectedEvent, setSelectedEvent] = useState<M24Event | null>(M24_TIMELINE[1])
  const [obsState] = useState<ObsState>('RESOLVED')

  const obsStateMeta = OBS_STATE_META[obsState]
  const visibleEvents = obsFilter === 'All' ? M24_TIMELINE : M24_TIMELINE.filter(e => e.type === obsFilter || e.status === OBS_STATE_META[obsFilter]?.label)

  return (
    <div className="flex-1 flex flex-col bg-[#f8f9fb] min-h-0">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#e5eaf0] px-6 py-2 flex items-center gap-1.5 text-xs text-[#1a2533]">
        <button onClick={onBack} className="hover:text-[#1a3a5c] hover:underline">Inspection Queue</button>
        <Icon.ChevronRight />
        <button onClick={onBackToM23} className="hover:text-[#1a3a5c] hover:underline">Inspection Workspace</button>
        <Icon.ChevronRight />
        <span className="text-[#1a2533] font-semibold">M24 — Observation / Re-inspection</span>
      </div>

      {/* Context header */}
      <div className="bg-white border-b border-[#e5eaf0] px-6 py-3">
        <div className="flex flex-wrap gap-x-8 gap-y-2 items-start">
          <div><div className="text-[10px] text-[#374151] uppercase font-bold">Inspection</div><div className="font-mono text-sm font-bold text-[#1a2533]">INSP-2026-00418</div></div>
          <div><div className="text-[10px] text-[#374151] uppercase font-bold">Application</div><div className="font-mono text-sm font-bold text-[#1a3a5c]">MIDC-APP-2026-00418</div></div>
          <div><div className="text-[10px] text-[#374151] uppercase font-bold">Business</div><div className="text-sm font-semibold text-[#1a2533]">Aster Precision Components Pvt. Ltd.</div></div>
          <div><div className="text-[10px] text-[#374151] uppercase font-bold">Original Inspection</div><div className="text-xs text-[#1a2533]">25 Sep 2026</div></div>
          <div><div className="text-[10px] text-[#374151] uppercase font-bold">Original Outcome</div><span className="text-[10px] font-bold bg-[#fff7ed] text-[#9a3412] border border-[#fdba74] px-1.5 py-0.5 rounded">CORRECTION REQUIRED</span></div>
          <div><div className="text-[10px] text-[#374151] uppercase font-bold">Open Observations</div><span className="text-sm font-black text-[#dc2626]">1</span></div>
          <div><div className="text-[10px] text-[#374151] uppercase font-bold">Resolution State</div><span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${obsStateMeta.bg} ${obsStateMeta.text} ${obsStateMeta.border}`}>{obsStateMeta.label}</span></div>
        </div>
      </div>

      {/* Observation summary strip */}
      <div className="mx-6 mt-4 bg-white border border-[#e5eaf0] rounded-lg p-4">
        <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-2">Active Observation</div>
        <div className="flex items-start gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[11px] font-bold text-[#1a3a5c]">OBS-2026-00418-01</span>
              <span className="text-[9px] bg-[#f3f4f6] text-[#1a2533] px-1.5 py-0.5 rounded">Building / Planning</span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${obsStateMeta.bg} ${obsStateMeta.text} ${obsStateMeta.border}`}>{obsStateMeta.label}</span>
            </div>
            <div className="text-xs text-[#1a2533]">Submitted building plan v2 does not reflect the current project parameters (building area 2,300 m²). Corrected plan v3 reviewed; re-inspection completed 01 Oct 2026.</div>
          </div>
          <div className="flex flex-col gap-1.5 shrink-0 text-[10px]">
            <div><span className="text-[#374151]">Related Query: </span><span className="font-semibold">QRY-2026-0042</span></div>
            <div><span className="text-[#374151]">Deficiency: </span><span className="font-semibold">DEF-2026-0092</span></div>
            <div><span className="text-[#374151]">Re-inspection: </span><span className="font-semibold text-[#065f46]">INSP-2026-00418-R1</span></div>
          </div>
        </div>
      </div>

      {/* Main content: Timeline + Detail drawer */}
      <div className="flex flex-1 overflow-hidden min-h-0 mx-6 mt-4 mb-6 gap-4">

        {/* Timeline */}
        <div className="flex-1 bg-white border border-[#e5eaf0] rounded-lg overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-[#e5eaf0] flex items-center gap-3">
            <div className="text-xs font-bold text-[#1a2533]">Correction / Re-inspection Timeline</div>
            <select
              value={obsFilter}
              onChange={e => setObsFilter(e.target.value as typeof obsFilter)}
              className="ml-auto text-xs border border-[#d1d9e0] rounded px-2 py-1 bg-white focus:outline-none"
            >
              <option value="All">All Events</option>
              <option value="AWAITING_ENTREPRENEUR">Awaiting Entrepreneur</option>
              <option value="RESPONSE_RECEIVED">Response Received</option>
              <option value="RE_INSPECTION_REQUIRED">Re-inspection Required</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>
          <div className="overflow-y-auto flex-1 px-4 py-4">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#e5eaf0]" />
              <div className="space-y-4 pl-10">
                {visibleEvents.map((ev, i) => {
                  const s = EVENT_TYPE_STYLE[ev.type] ?? { bg:'bg-[#f3f4f6]', text:'text-[#374151]', dot:'bg-[#9aa5b4]' }
                  const isSelected = selectedEvent?.id === ev.id && selectedEvent?.type === ev.type
                  return (
                    <div key={i} className="relative">
                      {/* Dot */}
                      <div className={`absolute -left-10 top-1.5 w-3 h-3 rounded-full border-2 border-white ${s.dot}`} />
                      <button
                        onClick={() => setSelectedEvent(ev)}
                        className={`w-full text-left rounded-lg border p-3 transition-colors ${isSelected ? 'border-[#1a56db] bg-[#ebf3ff]' : `${s.bg} border-transparent hover:border-[#d1d9e0]`}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className={`text-[9px] font-bold uppercase ${s.text}`}>{ev.type.replace(/_/g,' ')}</span>
                              <span className="font-mono text-[9px] text-[#374151]">{ev.id}</span>
                            </div>
                            <div className="text-xs font-semibold text-[#1a2533]">{ev.title}</div>
                            <div className="text-[11px] text-[#1a2533] mt-0.5">{ev.detail}</div>
                            {ev.evidence && <div className="text-[10px] text-[#1a2533] mt-0.5">Evidence: <span className="font-semibold">{ev.evidence}</span></div>}
                            {ev.status && <div className={`text-[9px] font-bold mt-1 ${s.text}`}>{ev.status}</div>}
                          </div>
                          <div className="shrink-0 text-right">
                            <div className="text-[10px] text-[#374151]">{ev.date}</div>
                            <div className="text-[9px] text-[#374151] mt-0.5">{ev.actor}</div>
                          </div>
                        </div>
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right — Event detail drawer */}
        {selectedEvent ? (
          <div className="w-72 shrink-0 bg-white border border-[#e5eaf0] rounded-lg overflow-y-auto p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider">Event Detail</div>
              <button onClick={() => setSelectedEvent(null)} className="text-[#374151] hover:text-[#1a2533]"><Icon.X /></button>
            </div>

            {(() => {
              const s = EVENT_TYPE_STYLE[selectedEvent.type] ?? { bg:'bg-[#f3f4f6]', text:'text-[#374151]', dot:'bg-[#9aa5b4]' }
              return (
                <>
                  <div className={`rounded-lg p-3 ${s.bg}`}>
                    <div className={`text-[9px] font-bold uppercase ${s.text}`}>{selectedEvent.type.replace(/_/g,' ')}</div>
                    <div className="text-xs font-bold text-[#1a2533] mt-0.5">{selectedEvent.title}</div>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <Row label="ID" value={selectedEvent.id} />
                    <Row label="Date" value={selectedEvent.date} />
                    <Row label="Actor" value={selectedEvent.actor} />
                    {selectedEvent.evidence && <Row label="Evidence" value={selectedEvent.evidence} />}
                    {selectedEvent.status && <Row label="Status" value={selectedEvent.status} />}
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-[#374151] uppercase tracking-wider mb-1">Detail</div>
                    <div className="text-[11px] text-[#1a2533] bg-[#f8f9fb] rounded p-2">{selectedEvent.detail}</div>
                  </div>
                </>
              )
            })()}

            {/* Original observation card (immutable) */}
            {selectedEvent.type === 'OBSERVATION' && (
              <div className="bg-[#fffbeb] border border-[#fcd34d] rounded p-3">
                <div className="text-[9px] font-bold text-[#92400e] uppercase mb-1">Original Observation — Immutable</div>
                <div className="text-[10px] text-[#78350f]">This record cannot be overwritten. Subsequent responses and re-inspections are appended as new events.</div>
              </div>
            )}

            {/* Re-inspection identity */}
            {selectedEvent.type === 'RE_INSPECTION' && (
              <div className="bg-[#f5f3ff] border border-[#c4b5fd] rounded p-3 text-[11px]">
                <div className="text-[9px] font-bold text-[#5b21b6] uppercase mb-1">Re-inspection Identity</div>
                <div className="space-y-0.5 text-[#1a2533]">
                  <div>Original: <span className="font-mono font-semibold">INSP-2026-00418</span></div>
                  <div>Re-inspection: <span className="font-mono font-semibold">INSP-2026-00418-R1</span></div>
                </div>
              </div>
            )}

            {/* Cross-system links */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-[#e5eaf0]">
              <div className="text-[9px] font-bold text-[#374151] uppercase tracking-wider mb-1">Navigate</div>
              <button onClick={onOpenDocReview}    className="text-left text-[10px] text-[#1a56db] hover:underline px-2 py-1 bg-[#eff6ff] rounded">View Document → M13</button>
              <button onClick={onOpenQueryHistory} className="text-left text-[10px] text-[#1a56db] hover:underline px-2 py-1 bg-[#eff6ff] rounded">View Query History → M19</button>
              <button onClick={onOpenDelta}        className="text-left text-[10px] text-[#1a56db] hover:underline px-2 py-1 bg-[#eff6ff] rounded">View Delta → M20</button>
              <button onClick={onOpenDepView}      className="text-left text-[10px] text-[#1a56db] hover:underline px-2 py-1 bg-[#eff6ff] rounded">View Dependencies → M17</button>
              <button onClick={onOpenM22}          className="text-left text-[10px] text-[#1a56db] hover:underline px-2 py-1 bg-[#eff6ff] rounded">Plan Re-inspection → M22</button>
            </div>

            {/* Resolution state + M24 boundary notice */}
            <div className="bg-[#ecfdf5] border border-[#a7f3d0] rounded p-3 text-[10px] text-[#065f46]">
              <div className="font-bold mb-1">Observation: Resolved</div>
              <div>Resolution of this observation does NOT automatically set Application = Approved. The configured workflow continues to M25.</div>
            </div>
          </div>
        ) : (
          <div className="w-64 shrink-0 bg-white border border-[#e5eaf0] rounded-lg p-4 flex items-center justify-center text-xs text-[#374151] text-center">
            Select a timeline event to view detail.
          </div>
        )}
      </div>
    </div>
  )
}

// ─── DecisionsDashboard ────────────────────────────────────────────────────────

export function DecisionsDashboard({ onOpenApp, onOpenCompliance, onOpenDependencyUpdate }: {
  onOpenApp: (applicationId: string) => void
  onOpenCompliance: (applicationId: string, complianceId: string) => void
  onOpenDependencyUpdate: (applicationId: string, dependencyNodeId: string) => void
}) {
  // All existing cards explicitly represent this sample application. Child IDs
  // come from its M28 obligations and M27 dependency graph fixtures.
  const applicationId = 'MIDC-APP-2026-00418'
  return (
    <div className="bg-[#f8f9fb] flex-1 overflow-y-auto">
      <div className="px-6 py-5 space-y-5 max-w-4xl">
        <div>
          <h1 className="text-xl font-bold text-[#1a3a5c]">Decisions</h1>
          <p className="text-sm text-[#1a2533] mt-0.5">Decision workspace, post-decision compliance, and dependency update.</p>
        </div>

        {/* Quick access */}
        <div className="grid grid-cols-3 gap-3">
          <button onClick={() => onOpenApp(applicationId)} className="bg-[#1a3a5c] text-white rounded-lg p-4 text-left hover:bg-[#0f2540] transition-colors">
            <div className="text-[10px] font-bold text-[#93c5fd] uppercase tracking-wider mb-1">M25 / M26</div>
            <div className="text-sm font-bold">Decision Workspace</div>
            <div className="text-[10px] text-[#bfdbfe] mt-0.5">Final statutory decision for MIDC-APP-2026-00418</div>
          </button>
          <button onClick={() => onOpenDependencyUpdate(applicationId, 'midc-bldg')} className="bg-white border border-[#e5eaf0] rounded-lg p-4 text-left hover:border-[#1a3a5c] transition-colors">
            <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-1">M27</div>
            <div className="text-sm font-bold text-[#1a2533]">Dependency Update</div>
            <div className="text-[10px] text-[#1a2533] mt-0.5">Post-decision propagation — MIDC-APP-2026-00418</div>
          </button>
          <button onClick={() => onOpenCompliance(applicationId, M28_OBLIGATIONS[0].id)} className="bg-white border border-[#c4b5fd] rounded-lg p-4 text-left hover:border-[#5b21b6] transition-colors">
            <div className="text-[10px] font-bold text-[#5b21b6] uppercase tracking-wider mb-1">M28</div>
            <div className="text-sm font-bold text-[#1a2533]">Conditions / Compliance</div>
            <div className="text-[10px] text-[#1a2533] mt-0.5">Post-decision obligations — MIDC-APP-2026-00418</div>
          </button>
        </div>

        {/* Decision Pending table */}
        <div>
          <div className="text-xs font-bold text-[#374151] uppercase tracking-wider mb-2">Decision Pending</div>
          <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
            <div className="px-4 py-3 flex items-center gap-3">
              <div className="flex-1">
                <p className="text-xs font-semibold text-[#1a3a5c]">MIDC-APP-2026-00418</p>
                <p className="text-[11px] text-[#1a2533]">Aster Precision Components Pvt. Ltd. — MIDC Building / Planning</p>
              </div>
              <span className="text-[10px] font-semibold bg-[#fffbeb] text-[#92400e] border border-[#fcd34d] px-2 py-0.5 rounded">FINAL_DECISION</span>
              <span className="text-[10px] text-red-700 font-semibold">Due in 2 days</span>
              <button onClick={() => onOpenApp(applicationId)} className="text-[11px] bg-[#1a3a5c] text-white px-3 py-1.5 rounded hover:bg-[#0f2540]">Open Decision Workspace →</button>
            </div>
          </div>
        </div>

        {/* Completed */}
        <div>
          <div className="text-xs font-bold text-[#374151] uppercase tracking-wider mb-2">Completed Decisions</div>
          <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
            <div className="px-4 py-3 flex items-center gap-3">
              <div className="flex-1">
                <p className="text-xs font-semibold text-[#1a3a5c]">MIDC-APP-2026-00418</p>
                <p className="text-[11px] text-[#1a2533]">Aster Precision Components Pvt. Ltd. — Decision: APPROVED — 01 Oct 2026</p>
              </div>
              <span className="text-[10px] font-semibold bg-[#ecfdf5] text-[#065f46] border border-[#6ee7b7] px-2 py-0.5 rounded">APPROVED</span>
              <div className="flex gap-2">
                <button onClick={() => onOpenDependencyUpdate(applicationId, 'midc-bldg')} className="text-[11px] border border-[#d1d9e0] text-[#1a2533] px-2 py-1 rounded hover:bg-[#f8f9fb]">M27 Dep. Update</button>
                <button onClick={() => onOpenCompliance(applicationId, M28_OBLIGATIONS[0].id)}       className="text-[11px] bg-[#f5f3ff] text-[#5b21b6] border border-[#c4b5fd] px-2 py-1 rounded hover:bg-[#ede9fe]">M28 Compliance →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── M25 Decision Workspace ────────────────────────────────────────────────────

export function M25DecisionWorkspacePage({ onBack, onOpenDocReview, onOpenConsistency, onOpenDna, onOpenDepView, onOpenQueryHistory, onOpenDelta, onOpenInspection, onOpenM24, onOpenScrutiny, onRecordDecision }: {
  onBack: () => void; onOpenDocReview: () => void; onOpenConsistency: () => void; onOpenDna: () => void; onOpenDepView: () => void; onOpenQueryHistory: () => void; onOpenDelta: () => void; onOpenInspection: () => void; onOpenM24: () => void; onOpenScrutiny: () => void; onRecordDecision: () => void
}) {
  const [selectedOutcome, setSelectedOutcome] = useState<'APPROVE' | 'CORRECTION_REQUIRED' | 'REJECT' | null>(null)
  const [decisionStep, setDecisionStep] = useState<'evidence' | 'form' | 'confirm'>('evidence')
  const [openSection, setOpenSection] = useState<string | null>(null)
  // APPROVE form
  const [approvalRemarks, setApprovalRemarks] = useState('')
  const [approvalConditions, setApprovalConditions] = useState('1. Construction must comply with approved plan.\n2. Occupancy certificate required on completion.')
  const [approvalBasis, setApprovalBasis] = useState('MRTP Act 1966; MIDC Estate Guidelines 2019')
  // CORRECTION form
  const [deficiencies, setDeficiencies] = useState([
    { id: 'DEF-001', issue: 'Building Plan version mismatch', field: 'Building Plan', doc: 'Building Plan v1', action: 'Upload latest approved plan version', basis: 'MIDC Guidelines Rule 4.2' },
    { id: 'DEF-002', issue: 'Supporting plan area mismatch', field: 'Plot Area', doc: 'Building Plan v2', action: 'Reconcile plot area across documents', basis: 'MRTP Act s.45' },
  ])
  // REJECT form
  const [rejectReason, setRejectReason] = useState('')
  const [rejectRemarks, setRejectRemarks] = useState('')
  const [rejectBasis, setRejectBasis] = useState('')

  const DEPT_CHECKS = [
    { label: 'Scrutiny modules reviewed', status: 'ok', action: onOpenScrutiny },
    { label: 'Required documents reviewed', status: 'ok', action: onOpenDocReview },
    { label: 'Cross-form consistency reviewed', status: 'ok', action: onOpenConsistency },
    { label: 'Queries resolved (QRY-2026-0042)', status: 'ok', action: onOpenQueryHistory },
    { label: 'Latest resubmission reviewed (v2)', status: 'ok', action: onOpenDelta },
    { label: 'Inspection completed (INSP-2026-00418 — Re-inspection Resolved)', status: 'ok', action: onOpenInspection },
    { label: 'Required dependencies checked', status: 'ok', action: onOpenDepView },
    { label: 'One item marked Needs Verification (Building Plan v2)', status: 'warn', action: onOpenDocReview },
  ]

  const EVIDENCE_SECTIONS = [
    { id: 'scrutiny', title: 'SCRUTINY', action: onOpenScrutiny, content: (
      <div className="text-xs text-[#1a2533] space-y-1">
        <p><span className="font-semibold">Route:</span> Enhanced Review</p>
        <p><span className="font-semibold">Modules:</span> Building / Planning, Water reviewed</p>
        <p><span className="font-semibold">Findings:</span> Plot area flag resolved, building area query raised and resolved</p>
      </div>
    )},
    { id: 'documents', title: 'DOCUMENTS', action: onOpenDocReview, content: (
      <div className="text-xs space-y-1">
        <div className="flex items-center gap-2"><span className="text-amber-600 font-semibold">⚠</span><span>Building Plan v2 — Needs Verification</span></div>
        <div className="flex items-center gap-2"><span className="text-green-700">✓</span><span>Land Record v3 — Verified</span></div>
        <div className="flex items-center gap-2"><span className="text-green-700">✓</span><span>MIDC Application v2 — Verified</span></div>
      </div>
    )},
    { id: 'consistency', title: 'CROSS-FORM CONSISTENCY', action: onOpenConsistency, content: (
      <div className="text-xs space-y-1">
        <div className="flex items-center gap-2"><span className="text-green-700">✓</span><span>Plot Area — Consistent across forms</span></div>
        <div className="flex items-center gap-2"><span className="text-green-700">✓</span><span>Building Area — Query Resolved (QRY-2026-0042)</span></div>
      </div>
    )},
    { id: 'queries', title: 'QUERIES / RESPONSES', action: onOpenQueryHistory, content: (
      <div className="text-xs space-y-1">
        <p><span className="font-semibold">Query:</span> QRY-2026-0042</p>
        <p><span className="font-semibold">Deficiencies:</span> 3 raised, all resolved</p>
        <p><span className="font-semibold">Status:</span> Resolved — Resubmission v2 accepted</p>
      </div>
    )},
    { id: 'delta', title: 'DELTA RE-SCRUTINY', action: onOpenDelta, content: (
      <div className="text-xs space-y-1">
        <p>Plot area: 4800 m² → 5200 m²</p>
        <p>Building area: 2000 m² → 2300 m²</p>
        <p>Plan version: v1 → v2</p>
      </div>
    )},
    { id: 'inspection', title: 'INSPECTION', action: onOpenM24, content: (
      <div className="text-xs space-y-1">
        <p><span className="font-semibold">ID:</span> INSP-2026-00418 — 25 Sep 2026</p>
        <p><span className="font-semibold">Module:</span> Building / Planning</p>
        <p><span className="font-semibold">Initial outcome:</span> Correction Required</p>
        <p>Re-inspection: 01 Oct 2026 → Resolved</p>
      </div>
    )},
    { id: 'dependencies', title: 'DEPENDENCIES', action: onOpenDepView, content: (
      <div className="text-xs space-y-1">
        <div className="flex items-center gap-2"><span className="text-green-700">✓</span><span>MPCB CTE — Complete</span></div>
        <div className="flex items-center gap-2"><span className="text-amber-600">↻</span><span>Building / Planning — In Progress (this service)</span></div>
        <div className="flex items-center gap-2"><span className="text-amber-600">⚠</span><span>Fire NOC — Conditional</span></div>
        <div className="flex items-center gap-2"><span className="text-[#374151]">⬇</span><span>Construction — Downstream (locked)</span></div>
      </div>
    )},
  ]

  const TIMELINE_STEPS = [
    { label: 'Submission', date: '01 Aug' }, { label: 'Doc Scrutiny', date: '05 Aug' }, { label: 'Technical Scrutiny', date: '10 Aug' },
    { label: 'Query', date: '15 Aug' }, { label: 'Response', date: '20 Aug' }, { label: 'Resubmission', date: '22 Aug' },
    { label: 'Delta Review', date: '25 Aug' }, { label: 'Inspection', date: '25 Sep' }, { label: 'Final Decision', date: '01 Oct', current: true },
  ]

  return (
    <div className="bg-[#f8f9fb] flex-1 overflow-y-auto">
      <div className="px-6 py-5 space-y-5 max-w-4xl">
        {/* Header */}
        <Breadcrumb items={[
          { label: 'Department Home', href: '/department' },
          { label: 'Decisions', href: '#', onClick: onBack },
          { label: 'Decision Workspace' }
        ]} />
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-xl font-bold text-[#1a3a5c]">Decision Workspace — M25</h1>
            <p className="text-sm text-[#1a2533] mt-0.5">Final statutory decision for MIDC-APP-2026-00418</p>
          </div>
          <button onClick={onBack} className="text-xs border border-[#d1d9e0] bg-white text-[#1a2533] px-3 py-1.5 rounded hover:bg-[#f0f4f8]">← Back</button>
        </div>
        {/* Context row */}
        <div className="bg-white border border-[#e5eaf0] rounded-lg px-4 py-3 grid grid-cols-2 gap-2 text-xs md:grid-cols-4">
          <div><span className="text-[#374151]">Application</span><p className="font-semibold text-[#1a3a5c]">MIDC-APP-2026-00418</p></div>
          <div><span className="text-[#374151]">Business</span><p className="font-semibold">Aster Precision Components Pvt. Ltd.</p></div>
          <div><span className="text-[#374151]">Service</span><p className="font-semibold">MIDC Building / Planning</p></div>
          <div><span className="text-[#374151]">State</span><p className="font-semibold text-amber-700">FINAL_DECISION</p></div>
          <div><span className="text-[#374151]">Scrutiny Route</span><p className="font-semibold">Enhanced Review</p></div>
          <div><span className="text-[#374151]">SLA</span><p className="font-semibold text-red-700">Due in 2 days</p></div>
          <div><span className="text-[#374151]">Desk</span><p className="font-semibold">Decision Desk</p></div>
          <div><span className="text-[#374151]">Officer</span><p className="font-semibold">Authorised Officer — MIDC Building</p></div>
        </div>

        {/* Quick nav strip */}
        <div className="flex items-center gap-2 bg-[#eff6ff] border border-[#93c5fd] rounded-lg px-4 py-2.5 text-xs flex-wrap">
          <span className="text-[#1e40af] font-semibold">Jump to:</span>
          <button onClick={() => setDecisionStep('evidence')} className="text-[#1a56db] hover:underline">Evidence Review</button>
          <span className="text-[#93c5fd]">·</span>
          <button onClick={() => { setSelectedOutcome('APPROVE'); setDecisionStep('form') }} className="text-[#065f46] font-semibold hover:underline">Approve Flow →</button>
          <span className="text-[#93c5fd]">·</span>
          <button onClick={() => { setSelectedOutcome('CORRECTION_REQUIRED'); setDecisionStep('form') }} className="text-[#92400e] font-semibold hover:underline">Correction Flow →</button>
          <span className="text-[#93c5fd]">·</span>
          <button onClick={() => { setSelectedOutcome('REJECT'); setDecisionStep('form') }} className="text-[#991b1b] font-semibold hover:underline">Reject Flow →</button>
          <span className="text-[#93c5fd]">·</span>
          <button onClick={onRecordDecision} className="ml-auto bg-[#1a3a5c] text-white font-bold px-3 py-1 rounded hover:bg-[#0f2540]">Skip to M26 Decision Record →</button>
        </div>

        {/* Decision Readiness */}
        <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
          <div className="px-4 py-2.5 bg-[#1a3a5c] flex items-center gap-2">
            <span className="text-sm font-bold text-white">FINAL REVIEW CHECK</span>
            <span className="ml-auto text-[10px] text-[#93c5fd]">7/8 clear · 1 warning</span>
          </div>
          <div className="divide-y divide-[#94a3b8]">
            {DEPT_CHECKS.map((c, i) => (
              <button key={i} onClick={c.action} className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-[#f8f9fb] transition-colors">
                <span className={`text-base ${c.status === 'ok' ? 'text-green-600' : 'text-amber-500'}`}>{c.status === 'ok' ? '✓' : '⚠'}</span>
                <span className="text-xs text-[#1a2533] flex-1">{c.label}</span>
                <span className="text-[10px] text-[#1a56db]">View →</span>
              </button>
            ))}
          </div>
        </div>

        {/* Evidence Summary */}
        <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
          <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#e5eaf0]">
            <h2 className="text-sm font-semibold text-[#1a2533]">Evidence Summary</h2>
          </div>
          <div className="divide-y divide-[#94a3b8]">
            {EVIDENCE_SECTIONS.map(s => (
              <div key={s.id}>
                <button onClick={() => setOpenSection(openSection === s.id ? null : s.id)} className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-[#f8f9fb]">
                  <span className="text-xs font-semibold text-[#1a2533]">{s.title}</span>
                  <div className="flex items-center gap-3">
                    <button onClick={e => { e.stopPropagation(); s.action() }} className="text-[10px] text-[#1a56db]">View →</button>
                    <span className="text-[#374151] text-xs">{openSection === s.id ? '▲' : '▼'}</span>
                  </div>
                </button>
                {openSection === s.id && <div className="px-4 pb-3">{s.content}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Regulatory Basis */}
        <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
          <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#e5eaf0]">
            <h2 className="text-sm font-semibold text-[#1a2533]">Regulatory Basis</h2>
          </div>
          <div className="divide-y divide-[#94a3b8]">
            {[
              { ref: 'Maharashtra Regional and Town Planning Act 1966', type: 'GR', note: 'Primary statutory basis' },
              { ref: 'MIDC Estate Guidelines 2019', type: 'Rule', note: 'Operational rules' },
              { ref: 'Building & Structural Guidelines', type: 'Configured', note: 'Configured service rule' },
            ].map((r, i) => (
              <div key={i} className="px-4 py-2 flex items-center gap-3 text-xs">
                <span className="text-[10px] font-semibold bg-[#eff6ff] text-[#1e40af] border border-[#bfdbfe] px-1.5 py-0.5 rounded">{r.type}</span>
                <span className="flex-1 text-[#1a2533]">{r.ref}</span>
                <span className="text-[#374151]">{r.note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SLA / Process History */}
        <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
          <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#e5eaf0] flex items-center gap-4">
            <h2 className="text-sm font-semibold text-[#1a2533]">SLA / Process History</h2>
            <div className="ml-auto flex items-center gap-4 text-[11px]">
              <span className="text-[#1a2533]">Dept: <strong>45 days</strong></span>
              <span className="text-[#1a2533]">Entrepreneur: <strong>10 days</strong></span>
              <span className="text-[#1a2533]">SLA: <strong>60 days</strong></span>
              <span className="text-red-700 font-semibold">Due in 2 days</span>
            </div>
          </div>
          <div className="px-4 py-3 flex items-center gap-1 overflow-x-auto">
            {TIMELINE_STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-1 shrink-0">
                <div className={`text-center ${s.current ? 'font-bold' : ''}`}>
                  <div className={`w-2 h-2 rounded-full mx-auto mb-0.5 ${s.current ? 'bg-red-500' : 'bg-[#1a56db]'}`} />
                  <p className={`text-[9px] ${s.current ? 'text-red-700' : 'text-[#1a2533]'}`}>{s.label}</p>
                  <p className="text-[9px] text-[#374151]">{s.date}</p>
                </div>
                {i < TIMELINE_STEPS.length - 1 && <div className="w-4 h-px bg-[#d1d9e0] shrink-0" />}
              </div>
            ))}
          </div>
        </div>

        {/* Downstream Impact */}
        <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
          <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#e5eaf0]">
            <h2 className="text-sm font-semibold text-[#1a2533]">Downstream Impact Scenarios</h2>
          </div>
          <div className="grid grid-cols-3 divide-x divide-[#e5eaf0]">
            {[
              { outcome: 'APPROVED', color: 'text-green-700 bg-[#ecfdf5]', bullets: ['Building/Planning node APPROVED', 'Construction permit unlocked', 'Entrepreneur notified', 'Approval order generated (APPR-2026-00418)'] },
              { outcome: 'CORRECTION REQUIRED', color: 'text-amber-700 bg-[#fffbeb]', bullets: ['Application returned to entrepreneur', 'Deficiencies communicated', 'SLA clock paused (entrepreneur time)', 'Resubmission required'] },
              { outcome: 'REJECTED', color: 'text-red-700 bg-[#fef2f2]', bullets: ['Application closed — Rejected', 'Statutory rejection order issued', 'No downstream services unlocked', 'Appeal period begins'] },
            ].map((s, i) => (
              <div key={i} className="p-3">
                <p className={`text-[10px] font-bold px-2 py-0.5 rounded mb-2 inline-block ${s.color}`}>{s.outcome}</p>
                <ul className="space-y-1">
                  {s.bullets.map((b, j) => <li key={j} className="text-[11px] text-[#1a2533] flex gap-1"><span>•</span><span>{b}</span></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Decision Action Area */}
        {decisionStep === 'evidence' && (
          <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 bg-[#1a3a5c] border-b border-[#e5eaf0]">
              <h2 className="text-sm font-bold text-white">Record Decision</h2>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-xs text-[#1a2533]">Select the outcome to proceed to the decision form.</p>
              <div className="grid grid-cols-3 gap-3">
                <button onClick={() => { setSelectedOutcome('APPROVE'); setDecisionStep('form') }} className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-lg border-2 border-green-200 bg-[#ecfdf5] text-green-800 hover:bg-green-100 text-xs font-bold transition-colors">
                  <span className="text-xl">✓</span>APPROVE
                </button>
                <button onClick={() => { setSelectedOutcome('CORRECTION_REQUIRED'); setDecisionStep('form') }} className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-lg border-2 border-amber-200 bg-[#fffbeb] text-amber-800 hover:bg-amber-100 text-xs font-bold transition-colors">
                  <span className="text-xl">↵</span>CORRECTION REQUIRED
                </button>
                <button onClick={() => { setSelectedOutcome('REJECT'); setDecisionStep('form') }} className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-lg border-2 border-red-200 bg-[#fef2f2] text-red-800 hover:bg-red-100 text-xs font-bold transition-colors">
                  <span className="text-xl">✗</span>REJECT
                </button>
              </div>
            </div>
          </div>
        )}

        {decisionStep === 'form' && selectedOutcome && (
          <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
            <div className={`px-4 py-2.5 border-b border-[#e5eaf0] flex items-center gap-3 ${selectedOutcome === 'APPROVE' ? 'bg-[#ecfdf5]' : selectedOutcome === 'REJECT' ? 'bg-[#fef2f2]' : 'bg-[#fffbeb]'}`}>
              <h2 className="text-sm font-bold text-[#1a2533]">Decision Form — {selectedOutcome.replace('_', ' ')}</h2>
              <button onClick={() => { setSelectedOutcome(null); setDecisionStep('evidence') }} className="ml-auto text-xs text-[#1a2533] hover:text-[#1a2533]">← Change outcome</button>
            </div>
            <div className="p-4 space-y-4">
              {/* Auto-populated context */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-[#f8f9fb] rounded p-3">
                <Row label="Decision ID" value="DEC-2026-00418" />
                <Row label="Application ID" value="MIDC-APP-2026-00418" />
                <Row label="Decision Date" value="01 Oct 2026" />
                <Row label="Officer" value="Authorised Officer — MIDC Building" />
              </div>

              {selectedOutcome === 'APPROVE' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-[#1a2533] block mb-1">Approval / Order Number</label>
                    <input type="text" defaultValue="APPR-2026-00418" className="w-full border border-[#d1d9e0] rounded px-3 py-1.5 text-xs" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#1a2533] block mb-1">Issue Date</label>
                    <input type="text" defaultValue="01 Oct 2026" className="w-full border border-[#d1d9e0] rounded px-3 py-1.5 text-xs" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#1a2533] block mb-1">Conditions of Approval</label>
                    <textarea value={approvalConditions} onChange={e => setApprovalConditions(e.target.value)} rows={3} className="w-full border border-[#d1d9e0] rounded px-3 py-1.5 text-xs" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#1a2533] block mb-1">Supporting Basis</label>
                    <input type="text" value={approvalBasis} onChange={e => setApprovalBasis(e.target.value)} className="w-full border border-[#d1d9e0] rounded px-3 py-1.5 text-xs" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#1a2533] block mb-1">Officer Remarks</label>
                    <textarea value={approvalRemarks} onChange={e => setApprovalRemarks(e.target.value)} rows={2} placeholder="Optional remarks..." className="w-full border border-[#d1d9e0] rounded px-3 py-1.5 text-xs" />
                  </div>
                </div>
              )}

              {selectedOutcome === 'CORRECTION_REQUIRED' && (
                <div className="space-y-3">
                  <p className="text-xs text-[#1a2533]">List deficiencies to be communicated to the entrepreneur.</p>
                  {deficiencies.map((d, i) => (
                    <div key={d.id} className="border border-amber-200 bg-[#fffbeb] rounded p-3 space-y-2 text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-amber-800">{d.id}</span>
                        <button onClick={() => setDeficiencies(prev => prev.filter((_, j) => j !== i))} className="text-red-500 text-[10px] hover:text-red-700">Remove</button>
                      </div>
                      <Row label="Issue" value={d.issue} />
                      <Row label="Field" value={d.field} />
                      <Row label="Document" value={d.doc} />
                      <Row label="Required Action" value={d.action} />
                      <Row label="Basis" value={d.basis} />
                    </div>
                  ))}
                  <button onClick={() => setDeficiencies(prev => [...prev, { id: `DEF-${String(prev.length + 1).padStart(3,'0')}`, issue: '', field: '', doc: '', action: '', basis: '' }])} className="text-xs border border-[#d1d9e0] bg-white text-[#1a2533] px-3 py-1.5 rounded hover:bg-[#f0f4f8]">+ Add Deficiency</button>
                </div>
              )}

              {selectedOutcome === 'REJECT' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-[#1a2533] block mb-1">Detailed Reason for Rejection</label>
                    <textarea value={rejectReason} onChange={e => setRejectReason(e.target.value)} rows={4} placeholder="Provide detailed statutory grounds for rejection..." className="w-full border border-[#d1d9e0] rounded px-3 py-1.5 text-xs" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#1a2533] block mb-1">Supporting Basis</label>
                    <input type="text" value={rejectBasis} onChange={e => setRejectBasis(e.target.value)} placeholder="e.g., MRTP Act s.47" className="w-full border border-[#d1d9e0] rounded px-3 py-1.5 text-xs" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#1a2533] block mb-1">Officer Remarks</label>
                    <textarea value={rejectRemarks} onChange={e => setRejectRemarks(e.target.value)} rows={2} placeholder="Optional remarks..." className="w-full border border-[#d1d9e0] rounded px-3 py-1.5 text-xs" />
                  </div>
                </div>
              )}

              <button onClick={() => setDecisionStep('confirm')} className="w-full bg-[#1a3a5c] text-white text-xs font-semibold py-2.5 rounded hover:bg-[#0f2540]">Review & Confirm →</button>
            </div>
          </div>
        )}

        {decisionStep === 'confirm' && selectedOutcome && (
          <div className="bg-white border-2 border-[#1a3a5c] rounded-lg overflow-hidden">
            <div className="px-4 py-3 bg-[#1a3a5c]">
              <h2 className="text-sm font-bold text-white">Confirm Decision</h2>
              <p className="text-[11px] text-[#93c5fd] mt-0.5">Review the decision details before final recording. This action is statutory and cannot be undone.</p>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <Row label="Outcome" value={selectedOutcome.replace('_', ' ')} />
                <Row label="Decision ID" value="DEC-2026-00418" />
                <Row label="Application" value="MIDC-APP-2026-00418" />
                <Row label="Officer" value="Authorised Officer — MIDC Building" />
                <Row label="Decision Date" value="01 Oct 2026" />
                <Row label="Supporting Basis" value={approvalBasis || rejectBasis || 'MRTP Act 1966 / MIDC Estate Guidelines 2019'} />
              </div>
              <div className="text-xs bg-[#f8f9fb] border border-[#e5eaf0] rounded p-3">
                <p className="font-semibold text-[#1a2533] mb-1">Downstream Effect</p>
                {selectedOutcome === 'APPROVE' && <p className="text-green-700">Building/Planning node will be set to APPROVED. Construction service will be unlocked. Approval order APPR-2026-00418 will be generated.</p>}
                {selectedOutcome === 'CORRECTION_REQUIRED' && <p className="text-amber-700">Application will be returned to entrepreneur with {deficiencies.length} deficiencies. SLA entrepreneur clock resumes.</p>}
                {selectedOutcome === 'REJECT' && <p className="text-red-700">Application will be closed — Rejected. Statutory rejection order will be issued. No downstream services will be unlocked.</p>}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setDecisionStep('evidence')} className="flex-1 border border-[#d1d9e0] bg-white text-[#1a2533] text-xs font-semibold py-2.5 rounded hover:bg-[#f0f4f8]">Cancel — Return to Review</button>
                <button onClick={onRecordDecision} className="flex-1 bg-[#1a56db] text-white text-xs font-semibold py-2.5 rounded hover:bg-[#1246b5]">Confirm & Record Decision (Mock Persistence)</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── M26 Decision Record ───────────────────────────────────────────────────────

export function M26DecisionRecordPage({ onBack, onBackToOverview, onOpenDepView, onOpenDna }: {
  onBack: () => void; onBackToOverview: () => void; onOpenDepView: () => void; onOpenDna: () => void
}) {
  const [activeTab, setActiveTab] = useState<'record' | 'dependencies' | 'audit' | 'version-history'>('record')

  return (
    <div className="bg-[#f8f9fb] flex-1 overflow-y-auto">
      <div className="px-6 py-5 space-y-5 max-w-4xl">
        <Breadcrumb items={[
          { label: 'Department Home', href: '/department' },
          { label: 'Decisions', href: '#', onClick: onBackToOverview },
          { label: 'Decision Workspace', onClick: onBack },
          { label: 'Decision Record' }
        ]} />

        {/* Official header strip */}
        <div className="bg-[#1a3a5c] rounded-lg px-5 py-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { label: 'Decision ID', value: 'DEC-2026-00418' },
            { label: 'Application', value: 'MIDC-APP-2026-00418' },
            { label: 'Business', value: 'Aster Precision Components Pvt. Ltd.' },
            { label: 'Decision', value: 'APPROVED' },
            { label: 'Decision Date', value: '01 Oct 2026' },
            { label: 'Officer', value: 'Authorised Officer — MIDC Building / Planning' },
            { label: 'Region', value: 'Pune Region' },
            { label: 'Service', value: 'MIDC Building / Planning Service' },
          ].map(r => (
            <div key={r.label}>
              <p className="text-[10px] text-[#93c5fd]">{r.label}</p>
              <p className={`text-xs font-semibold ${r.label === 'Decision' ? 'text-green-300' : 'text-white'}`}>{r.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-[#e5eaf0]">
          {(['record','dependencies','audit','version-history'] as const).map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 text-xs font-semibold capitalize border-b-2 transition-colors ${activeTab === t ? 'border-[#1a56db] text-[#1a56db]' : 'border-transparent text-[#1a2533] hover:text-[#1a2533]'}`}>
              {t === 'version-history' ? 'Version History' : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'record' && (
          <div className="space-y-4">
            <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
              <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#e5eaf0]">
                <h2 className="text-sm font-semibold text-[#1a2533]">Approval Record</h2>
              </div>
              <div className="p-4 grid grid-cols-2 gap-3 text-xs">
                <Row label="Approval / Order ID" value="APPR-2026-00418" />
                <Row label="Issue Date" value="01 Oct 2026" />
                <Row label="Expiry" value="Not applicable (configured service)" />
                <Row label="Decision Officer" value="Authorised Officer — MIDC Building / Planning" />
                <Row label="Supporting Basis" value="MRTP Act 1966 / MIDC Estate Guidelines 2019" />
              </div>
              <div className="px-4 pb-4">
                <p className="text-xs font-semibold text-[#1a2533] mb-2">Conditions of Approval</p>
                <ol className="list-decimal list-inside text-xs text-[#1a2533] space-y-1">
                  <li>Construction must comply with approved building plan.</li>
                  <li>Occupancy certificate required on completion of construction.</li>
                </ol>
              </div>
            </div>
            <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
              <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#e5eaf0]">
                <h2 className="text-sm font-semibold text-[#1a2533]">Related Records</h2>
              </div>
              <div className="divide-y divide-[#94a3b8]">
                {[
                  { label: 'Application', value: 'MIDC-APP-2026-00418', action: onBackToOverview },
                  { label: 'Business DNA', value: 'v4', action: onOpenDna },
                  { label: 'Building Plan', value: 'v3' },
                  { label: 'Inspection Record', value: 'INSP-2026-00418' },
                  { label: 'Query Record', value: 'QRY-2026-0042' },
                  { label: 'Resubmission', value: 'v2' },
                ].map((r, i) => (
                  <div key={i} className="px-4 py-2 flex items-center justify-between text-xs">
                    <span className="text-[#1a2533]">{r.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#1a2533]">{r.value}</span>
                      {r.action && <button onClick={r.action} className="text-[10px] text-[#1a56db] hover:underline">View →</button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dependencies' && (
          <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#e5eaf0] flex items-center gap-3">
              <h2 className="text-sm font-semibold text-[#1a2533]">Dependency Impact (M27 Update)</h2>
              <button onClick={onOpenDepView} className="ml-auto text-xs text-[#1a56db]">Open Dependency View →</button>
            </div>
            <div className="p-4 space-y-3 text-xs">
              <div className="flex items-center gap-3 p-3 bg-[#ecfdf5] border border-green-200 rounded">
                <span className="text-green-700 font-bold text-base">✓</span>
                <div>
                  <p className="font-semibold text-green-800">Building / Planning node → APPROVED</p>
                  <p className="text-green-700">Decision recorded — node status updated in dependency graph</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#eff6ff] border border-blue-200 rounded">
                <span className="text-blue-700 font-bold text-base">↓</span>
                <div>
                  <p className="font-semibold text-blue-800">Construction permit — Unlocked</p>
                  <p className="text-blue-700">Blocking dependency resolved; entrepreneur may now apply</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#fffbeb] border border-amber-200 rounded">
                <span className="text-amber-600 font-bold">⚠</span>
                <div>
                  <p className="font-semibold text-amber-800">Fire NOC — Conditional (unchanged)</p>
                  <p className="text-amber-700">Fire NOC remains conditional; entrepreneur must satisfy conditions separately</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#e5eaf0]">
              <h2 className="text-sm font-semibold text-[#1a2533]">Audit Trail</h2>
            </div>
            <div className="divide-y divide-[#94a3b8]">
              {[
                { ts: '01 Oct 2026 10:42', event: 'Decision recorded', detail: 'Outcome: APPROVED — DEC-2026-00418', actor: 'Authorised Officer — MIDC Building' },
                { ts: '01 Oct 2026 10:42', event: 'Version created', detail: 'Decision record v1 created in system', actor: 'System' },
                { ts: '01 Oct 2026 10:43', event: 'Entrepreneur notification sent', detail: 'Approval notification dispatched via portal', actor: 'System' },
              ].map((a, i) => (
                <div key={i} className="px-4 py-3 flex gap-3 text-xs">
                  <div className="w-32 shrink-0 text-[#374151]">{a.ts}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#1a2533]">{a.event}</p>
                    <p className="text-[#1a2533]">{a.detail}</p>
                    <p className="text-[10px] text-[#374151]">{a.actor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'version-history' && (
          <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#e5eaf0]">
              <h2 className="text-sm font-semibold text-[#1a2533]">Version History</h2>
            </div>
            <div className="px-4 py-3 flex gap-3 text-xs">
              <div className="w-8 h-8 rounded-full bg-[#1a3a5c] text-white flex items-center justify-center shrink-0 font-bold">v1</div>
              <div>
                <p className="font-semibold text-[#1a2533]">Decision recorded — APPROVE</p>
                <p className="text-[#374151]">01 Oct 2026 · Authorised Officer — MIDC Building / Planning</p>
                <p className="text-[#1a2533] mt-0.5">Initial recording of final decision. DEC-2026-00418 created. Approval order APPR-2026-00418 generated.</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex gap-3 flex-wrap pb-4">
          <button onClick={onBackToOverview} className="text-xs border border-[#d1d9e0] bg-white text-[#1a2533] px-4 py-2 rounded hover:bg-[#f0f4f8]">View Application</button>
          <button onClick={onBack} className="text-xs border border-[#d1d9e0] bg-white text-[#1a2533] px-4 py-2 rounded hover:bg-[#f0f4f8]">View Evidence</button>
          <button onClick={onOpenDepView} className="text-xs border border-[#d1d9e0] bg-white text-[#1a2533] px-4 py-2 rounded hover:bg-[#f0f4f8]">View Dependency Impact</button>
          <button onClick={() => setActiveTab('audit')} className="text-xs border border-[#d1d9e0] bg-white text-[#1a2533] px-4 py-2 rounded hover:bg-[#f0f4f8]">View Audit History</button>
        </div>
      </div>
    </div>
  )
}

// ─── M27 Dependency Update + Entrepreneur Synchronization ────────────────────


const M27_SYNC_EVENTS: SyncEvent[] = [
  { id:'SYNC-00418-01', time:'14:32', from:'M25 Decision Workspace', to:'Decision Engine',   action:'Decision DEC-2026-00418 recorded — APPROVED',              result:'Completed' },
  { id:'SYNC-00418-02', time:'14:32', from:'Decision Engine',         to:'Dependency Engine', action:'MIDC Building/Planning node set to COMPLETE',              result:'Completed' },
  { id:'SYNC-00418-03', time:'14:33', from:'Dependency Engine',       to:'Journey Engine',   action:'Downstream nodes Provisional Fire + Construction updated', result:'Completed' },
  { id:'SYNC-00418-04', time:'14:33', from:'Journey Engine',          to:'Entrepreneur View', action:'Application status updated to APPROVED',                   result:'Completed' },
  { id:'SYNC-00418-05', time:'14:33', from:'Document Engine',         to:'Document Centre',  action:'Approval Order DOC-MIDC-2026-00418 stored',               result:'Completed' },
  { id:'SYNC-00418-06', time:'14:33', from:'Notification Engine',     to:'Entrepreneur',     action:'Portal notification NTF-00418-07 generated',              result:'Completed' },
  { id:'SYNC-00418-07', time:'14:34', from:'Compliance Engine',       to:'M28',              action:'2 configured conditions forwarded to compliance engine',   result:'Pending' },
]


const NODE_STATUS_STYLE: Record<string, { bg: string; text: string; border: string }> = {
  'Complete':         { bg:'bg-[#ecfdf5]', text:'text-[#065f46]', border:'border-[#6ee7b7]' },
  'Decision Pending': { bg:'bg-[#fffbeb]', text:'text-[#92400e]', border:'border-[#fcd34d]' },
  'Blocked':          { bg:'bg-[#fef2f2]', text:'text-[#991b1b]', border:'border-[#fca5a5]' },
  'Ready / Unlocked': { bg:'bg-[#eff6ff]', text:'text-[#1e40af]', border:'border-[#93c5fd]' },
  'Newly Available':  { bg:'bg-[#eff6ff]', text:'text-[#1e40af]', border:'border-[#93c5fd]' },
  'Available':        { bg:'bg-[#f0fdf4]', text:'text-[#166534]', border:'border-[#86efac]' },
}
const SYNC_RESULT_STYLE: Record<string, string> = {
  'Completed':   'bg-[#ecfdf5] text-[#065f46]',
  'Pending':     'bg-[#fffbeb] text-[#92400e]',
  'Failed':      'bg-[#fef2f2] text-[#991b1b]',
  'Not Required':'bg-[#f3f4f6] text-[#1a2533]',
}

export function M27DependencyUpdatePage({ onBack, onOpenM26, onOpenM25, onOpenDepView, onOpenQueryHistory, onOpenDelta, onOpenM28 }: {
  onBack: () => void; onOpenM26: () => void; onOpenM25: () => void
  onOpenDepView: () => void; onOpenQueryHistory: () => void; onOpenDelta: () => void; onOpenM28: () => void
}) {
  const [activeTab, setActiveTab] = useState<'overview'|'sync'|'notifications'|'versions'>('overview')

  const tabs = [
    { id:'overview',      label:'Propagation Overview' },
    { id:'sync',          label:'Sync Audit Trail' },
    { id:'notifications', label:'Notifications' },
    { id:'versions',      label:'Versions' },
  ] as const

  return (
    <div className="flex-1 flex flex-col bg-[#f8f9fb] min-h-0 overflow-y-auto">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#e5eaf0] px-6 py-2 flex items-center gap-1.5 text-xs text-[#1a2533]">
        <button onClick={onBack} className="hover:text-[#1a3a5c] hover:underline">Department Home</button>
        <span>/</span>
        <button onClick={onBack} className="hover:text-[#1a3a5c] hover:underline">Decisions</button>
        <span>/</span>
        <button onClick={onOpenM26} className="hover:text-[#1a3a5c] hover:underline">Decision Record</button>
        <span>/</span>
        <span className="text-[#1a2533] font-semibold">M27 — Dependency Update</span>
      </div>

      {/* Decision context header */}
      <div className="bg-[#1a3a5c] text-white px-6 py-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-[10px] text-[#93c5fd] uppercase font-bold tracking-wider mb-0.5">Post-Decision Propagation Workspace</div>
            <h1 className="text-lg font-bold">M27 — Dependency Update + Entrepreneur Synchronization</h1>
            <p className="text-[11px] text-[#bfdbfe] mt-0.5">MIDC-APP-2026-00418 · Aster Precision Components Pvt. Ltd. · MIDC Building / Planning Service</p>
          </div>
          <div className="flex gap-2 flex-wrap text-xs">
            <button onClick={onOpenM25} className="border border-[#4b7ab5] text-[#bfdbfe] px-3 py-1.5 rounded hover:bg-[#0f2540]">← Decision Workspace</button>
            <button onClick={onOpenM26} className="border border-[#4b7ab5] text-[#bfdbfe] px-3 py-1.5 rounded hover:bg-[#0f2540]">View Decision Record</button>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-1 text-xs md:grid-cols-4">
          {[['Decision ID','DEC-2026-00418'],['Outcome','APPROVED'],['Date','01 Oct 2026, 14:32'],['Officer','Authorised Officer — MIDC Building'],
            ['Application','MIDC-APP-2026-00418'],['App State','APPROVED'],['App Version','v3'],['DNA Version','v4']
          ].map(([l,v]) => (
            <div key={l}><span className="text-[#93c5fd] text-[10px]">{l}</span><p className={`font-semibold text-[11px] ${l==='Outcome' ? 'text-[#6ee7b7]' : 'text-white'}`}>{v}</p></div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-[#e5eaf0] px-6 flex gap-0">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${activeTab === t.id ? 'border-[#1a56db] text-[#1a56db]' : 'border-transparent text-[#1a2533] hover:text-[#1a2533]'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="px-6 py-5 space-y-5 max-w-5xl">

        {activeTab === 'overview' && <>

          {/* Decision Event Summary */}
          <div className="bg-white border border-[#e5eaf0] rounded-lg p-4 flex items-start gap-6 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-2">MIDC Decision Event</div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-black text-[#065f46]">APPROVED</span>
                <span className="text-[10px] font-bold bg-[#ecfdf5] text-[#065f46] border border-[#6ee7b7] px-1.5 py-0.5 rounded">Recorded</span>
              </div>
              <div className="space-y-0.5 text-xs">
                <Row label="Decision ID" value="DEC-2026-00418" />
                <Row label="Recorded" value="01 Oct 2026, 14:32" />
                <Row label="Officer" value="Authorised Officer — MIDC Building" />
                <Row label="Source" value="M26 Decision Record" />
              </div>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <button onClick={onOpenM26} className="text-xs font-semibold bg-[#1a3a5c] text-white px-3 py-1.5 rounded hover:bg-[#0f2540]">View Decision Record → M26</button>
              <div className="text-[9px] text-[#374151] italic">Decision cannot be edited from M27.</div>
            </div>
          </div>

          {/* Before / After MIDC node transition */}
          <div className="bg-white border-2 border-[#1a3a5c] rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 bg-[#1a3a5c]">
              <span className="text-sm font-bold text-white">Decision Effect — MIDC Building / Planning Node</span>
            </div>
            <div className="p-4 flex items-center gap-4 flex-wrap justify-center text-center">
              <div className="bg-[#fffbeb] border border-[#fcd34d] rounded-lg px-6 py-4 min-w-[140px]">
                <div className="text-[10px] text-[#92400e] font-bold uppercase mb-1">BEFORE</div>
                <div className="text-sm font-bold text-[#92400e]">Decision Pending</div>
                <div className="text-[10px] text-[#374151] mt-1">MIDC-controlled</div>
              </div>
              <div className="text-2xl text-[#1a3a5c] font-black">→</div>
              <div className="bg-[#1a3a5c] rounded-lg px-6 py-4 min-w-[140px]">
                <div className="text-[10px] text-[#93c5fd] font-bold uppercase mb-1">MIDC DECISION</div>
                <div className="text-sm font-bold text-white">APPROVED</div>
                <div className="text-[10px] text-[#93c5fd] mt-1">DEC-2026-00418</div>
              </div>
              <div className="text-2xl text-[#1a3a5c] font-black">→</div>
              <div className="bg-[#ecfdf5] border border-[#6ee7b7] rounded-lg px-6 py-4 min-w-[140px]">
                <div className="text-[10px] text-[#065f46] font-bold uppercase mb-1">AFTER</div>
                <div className="text-sm font-bold text-[#065f46]">MIDC Node Complete</div>
                <div className="text-[10px] text-[#374151] mt-1">01 Oct 2026</div>
              </div>
            </div>
          </div>

          {/* Before / After dependency state side by side */}
          <div className="grid grid-cols-2 gap-4">
            {/* Before */}
            <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
              <div className="px-4 py-2 bg-[#f8f9fb] border-b border-[#e5eaf0]">
                <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider">Dependency State — Before Decision</div>
              </div>
              <div className="p-3 space-y-1.5">
                {BEFORE_NODES.map((n, i) => {
                  const s = NODE_STATUS_STYLE[n.status] ?? { bg:'bg-[#f3f4f6]', text:'text-[#1a2533]', border:'border-[#d1d5db]' }
                  return (
                    <div key={n.id}>
                      {i > 0 && <div className="flex justify-center text-[#d1d9e0] text-xs py-0.5">↓</div>}
                      <div className={`rounded border px-3 py-2 ${n.id === 'midc-bldg' ? 'border-[#1a3a5c] bg-[#f0f4f8]' : `${s.bg} ${s.border}`}`}>
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <div className="text-[11px] font-semibold text-[#1a2533]">{n.label}</div>
                            <div className="text-[9px] text-[#374151]">{n.dept} · {n.control}</div>
                          </div>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${s.bg} ${s.text} ${s.border}`}>{n.status}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* After */}
            <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
              <div className="px-4 py-2 bg-[#f8f9fb] border-b border-[#e5eaf0]">
                <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider">Dependency State — After Decision</div>
              </div>
              <div className="p-3 space-y-1.5">
                {AFTER_NODES.map((n, i) => {
                  const s = NODE_STATUS_STYLE[n.status] ?? { bg:'bg-[#f3f4f6]', text:'text-[#1a2533]', border:'border-[#d1d5db]' }
                  return (
                    <div key={n.id}>
                      {i > 0 && <div className="flex justify-center text-[#d1d9e0] text-xs py-0.5">↓</div>}
                      <div className={`rounded border px-3 py-2 ${n.change === 'Changed' ? `${s.bg} ${s.border}` : 'bg-[#f8f9fb] border-[#e5eaf0]'}`}>
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <div className="text-[11px] font-semibold text-[#1a2533]">{n.label}</div>
                            <div className="text-[9px] text-[#374151]">{n.dept}</div>
                          </div>
                          <div className="flex flex-col items-end gap-0.5">
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${s.bg} ${s.text} ${s.border}`}>{n.status}</span>
                            {n.change === 'Changed' && <span className="text-[8px] text-[#1e40af] font-bold">↑ Changed</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="px-3 pb-3">
                <button onClick={onOpenDepView} className="mt-2 text-[10px] text-[#1a56db] hover:underline font-semibold">View Full Dependency Journey → M17</button>
              </div>
            </div>
          </div>

          {/* What Changed panel */}
          <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[#e5eaf0] flex items-center justify-between">
              <div className="text-xs font-bold text-[#1a2533]">What Changed?</div>
              <button onClick={onOpenDepView} className="text-[10px] text-[#1a56db] hover:underline">View Full Dependency Journey → M17</button>
            </div>
            <div className="grid grid-cols-2 divide-x divide-[#e5eaf0]">
              <div className="p-4">
                <div className="text-[10px] font-bold text-[#065f46] uppercase tracking-wider mb-2">Changed</div>
                {[
                  ['MIDC Building / Planning', 'Decision Pending → Complete'],
                  ['Provisional Fire',          'Blocked → Ready / Unlocked'],
                  ['Utilities / NOCs',          'Blocked → Newly Available'],
                  ['Construction',              'Blocked → Available'],
                ].map(([node, change]) => (
                  <div key={node} className="py-1.5 border-b border-[#f0f4f8] last:border-0">
                    <div className="text-[11px] font-semibold text-[#1a2533]">{node}</div>
                    <div className="text-[10px] text-[#065f46]">{change}</div>
                  </div>
                ))}
              </div>
              <div className="p-4">
                <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-2">Unchanged</div>
                {[
                  ['Land / Plot',  'Complete → Complete'],
                  ['MPCB CTE',    'Complete → Complete'],
                ].map(([node, change]) => (
                  <div key={node} className="py-1.5 border-b border-[#f0f4f8] last:border-0">
                    <div className="text-[11px] font-semibold text-[#1a2533]">{node}</div>
                    <div className="text-[10px] text-[#374151]">{change}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Approval Propagation */}
          <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 bg-[#f0fdf4] border-b border-[#a7f3d0]">
              <div className="text-xs font-bold text-[#065f46]">Approval Propagation</div>
              <div className="text-[10px] text-[#1a2533]">Configured downstream services affected by this MIDC decision.</div>
            </div>
            <div className="p-4 grid grid-cols-2 gap-2">
              {[
                '✓ MIDC Building/Planning node marked Complete',
                '✓ Configured dependent nodes updated per dependency graph',
                '✓ Approval Order DOC-MIDC-2026-00418 stored in Document Centre',
                '✓ Entrepreneur journey updated to APPROVED state',
                '✓ Reusable verified data (Plot Verification, Land Record v3) made available',
                '✓ 2 configured conditions forwarded to compliance engine',
                '✓ Provisional Fire node: dependency availability updated',
                '⏳ M28 Conditions / Compliance handoff: Pending',
              ].map(item => (
                <div key={item} className={`text-xs flex items-start gap-1.5 ${item.startsWith('⏳') ? 'text-[#92400e]' : 'text-[#1a2533]'}`}>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* External Department Impact */}
          <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[#e5eaf0]">
              <div className="text-xs font-bold text-[#1a2533]">External Department Impact</div>
              <div className="text-[10px] text-[#374151]">MIDC updates dependency availability only — does not edit or impersonate another department's decision.</div>
            </div>
            <table className="w-full text-xs">
              <thead className="bg-[#f8f9fb] border-b border-[#e5eaf0]">
                <tr>{['Department','Service / Node','Before','After','Effect','Control'].map(h => (
                  <th key={h} className="px-3 py-2 text-left text-[10px] font-bold text-[#374151] uppercase">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-[#94a3b8]">
                {[
                  { dept:'MPCB',  node:'CTE',               before:'Complete', after:'Complete',        effect:'No change', ctrl:'MPCB' },
                  { dept:'Fire',  node:'Provisional Fire',   before:'Blocked',  after:'Ready / Unlocked', effect:'Dependency availability updated — MIDC prerequisite satisfied', ctrl:'Fire' },
                  { dept:'DISH',  node:'DISH NOC',           before:'Pending',  after:'Newly Available',  effect:'Dependency availability updated', ctrl:'DISH' },
                  { dept:'MIDC',  node:'Construction',       before:'Blocked',  after:'Available',        effect:'Unlocked by MIDC approval', ctrl:'MIDC-controlled' },
                ].map(r => (
                  <tr key={r.node} className="hover:bg-[#f8f9fb]">
                    <td className="px-3 py-2 font-semibold text-[#1a2533]">{r.dept}</td>
                    <td className="px-3 py-2 text-[#1a2533]">{r.node}</td>
                    <td className="px-3 py-2 text-[#374151]">{r.before}</td>
                    <td className="px-3 py-2 font-semibold text-[#065f46]">{r.after}</td>
                    <td className="px-3 py-2 text-[#1a2533] text-[10px]">{r.effect}</td>
                    <td className="px-3 py-2"><span className="text-[9px] bg-[#f3f4f6] text-[#1a2533] px-1.5 py-0.5 rounded">{r.ctrl}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Entrepreneur Sync */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
              <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-2">Entrepreneur Journey Update</div>
              <div className="space-y-1.5 text-xs">
                <Row label="Application" value="MIDC-APP-2026-00418" />
                <Row label="New Status" value="Approved" />
                <Row label="Decision" value="MIDC Building / Planning — Approved" />
                <Row label="Newly Available" value="Provisional Fire application" />
                <Row label="Newly Available" value="Configured utility workflow" />
                <Row label="Documents" value="Approval Order added to Document Centre" />
                <Row label="Conditions" value="2 configured conditions recorded" />
                <Row label="Next Action" value="Continue to newly unlocked regulatory service" />
              </div>
            </div>

            <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
              <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-2">Document Update</div>
              <div className="space-y-2 text-xs">
                {[
                  { id:'DOC-MIDC-2026-00418', type:'MIDC Approval Order', ver:'v1', date:'01 Oct 2026', expiry:'Not Applicable', status:'Stored — Document Centre' },
                ].map(d => (
                  <div key={d.id} className="bg-[#f8f9fb] rounded border border-[#e5eaf0] p-2.5">
                    <div className="font-mono text-[10px] font-bold text-[#1a3a5c]">{d.id}</div>
                    <div className="font-semibold text-[#1a2533] mt-0.5">{d.type}</div>
                    <div className="space-y-0.5 mt-1">
                      <Row label="Version" value={d.ver} />
                      <Row label="Issued" value={d.date} />
                      <Row label="Expiry" value={d.expiry} />
                      <Row label="Status" value={d.status} />
                    </div>
                  </div>
                ))}
                <div className="bg-[#f8f9fb] rounded border border-[#e5eaf0] p-2.5">
                  <div className="text-[10px] text-[#374151] font-bold">Certificate</div>
                  <div className="text-[11px] text-[#1a2533] italic mt-0.5">Not Applicable — configured service does not require a separate certificate.</div>
                </div>
              </div>

              <div className="mt-3">
                <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-1.5">Reusable Records</div>
                {[
                  ['MIDC Plot Verification', 'Department Verified — Reusable'],
                  ['Land Record v3',         'Verified / Reusable'],
                ].map(([name, status]) => (
                  <div key={name} className="flex justify-between text-[10px] py-1 border-b border-[#f0f4f8] last:border-0">
                    <span className="font-semibold text-[#1a2533]">{name}</span>
                    <span className="text-[#065f46]">{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Approval Conditions → Compliance */}
          <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[#e5eaf0] flex items-center justify-between">
              <div className="text-xs font-bold text-[#1a2533]">Approval Conditions → Compliance Engine</div>
              <button onClick={onOpenM28} className="text-[10px] text-[#1a56db] hover:underline">View Compliance Context → M28</button>
            </div>
            <div className="p-4 space-y-3">
              {[
                { id:'COND-001', cond:'Construction to commence within 24 months of approval order.', source:'MIDC Estate Guidelines 2019 / Configured service rule', status:'Forwarded to compliance engine' },
                { id:'COND-002', cond:'Monthly site progress reports to be submitted to MIDC Estate Office.', source:'MIDC Reporting Requirement / Configured service rule', status:'Forwarded to compliance engine' },
              ].map(c => (
                <div key={c.id} className="bg-[#f8f9fb] border border-[#e5eaf0] rounded p-3 text-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] font-bold text-[#1a3a5c]">{c.id}</span>
                    <span className="text-[9px] bg-[#fffbeb] text-[#92400e] border border-[#fcd34d] px-1.5 py-0.5 rounded font-bold">{c.status}</span>
                  </div>
                  <div className="text-[#1a2533]">{c.cond}</div>
                  <div className="text-[10px] text-[#374151] mt-0.5">Source: {c.source}</div>
                </div>
              ))}
              <div className="flex items-center gap-2 text-[10px] text-[#374151] italic bg-[#f8f9fb] rounded border border-[#e5eaf0] px-3 py-2">
                <span>Condition recorded → Configured compliance rule detected → Compliance obligation generated in M28</span>
              </div>
            </div>
          </div>

          {/* Synchronization Status */}
          <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[#e5eaf0]">
              <div className="text-xs font-bold text-[#1a2533]">Synchronization Status</div>
            </div>
            <div className="p-4">
              <div className="flex flex-col gap-2 max-w-sm">
                {[
                  { label:'MIDC Decision Event',          result:'Completed' },
                  { label:'Journey Engine',               result:'Completed' },
                  { label:'Entrepreneur View',            result:'Completed' },
                  { label:'Eligible Downstream Queues',   result:'Completed' },
                  { label:'M28 Conditions / Compliance',  result:'Pending' },
                ].map((s, i) => (
                  <div key={s.label}>
                    {i > 0 && <div className="flex justify-center text-[#d1d9e0] text-xs py-0.5">↓</div>}
                    <div className="flex items-center justify-between gap-3 bg-[#f8f9fb] border border-[#e5eaf0] rounded px-3 py-2">
                      <span className="text-xs font-semibold text-[#1a2533]">{s.label}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${SYNC_RESULT_STYLE[s.result]}`}>{s.result}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Journey Summary */}
          <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
            <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-3">Regulatory Journey Summary</div>
            <div className="flex flex-col gap-1 max-w-xs">
              {[
                { label:'Land / Plot',              status:'Complete',        icon:'✓' },
                { label:'MPCB CTE',                 status:'Complete',        icon:'✓' },
                { label:'MIDC Building / Planning', status:'APPROVED',        icon:'✓' },
                { label:'Provisional Fire',          status:'Available',       icon:'→' },
                { label:'Utilities',                status:'Configured Next', icon:'→' },
                { label:'Construction',             status:'Future Stage',    icon:'→' },
              ].map((n, i) => (
                <div key={n.label}>
                  {i > 0 && <div className="text-[#d1d9e0] text-xs pl-4 py-0.5">↓</div>}
                  <div className={`flex items-center justify-between rounded px-3 py-2 text-xs ${n.status === 'APPROVED' ? 'bg-[#1a3a5c] text-white' : n.icon === '✓' ? 'bg-[#ecfdf5] text-[#065f46]' : 'bg-[#f8f9fb] text-[#1a2533]'}`}>
                    <span className="font-semibold">{n.label}</span>
                    <span className="font-bold">{n.icon} {n.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions footer */}
          <div className="flex gap-3 flex-wrap pb-6">
            <button onClick={onOpenM26}      className="px-4 py-2 text-xs font-bold bg-[#1a3a5c] text-white rounded hover:bg-[#0f2540]">View Decision Record → M26</button>
            <button onClick={onOpenDepView}  className="px-4 py-2 text-xs font-semibold border border-[#d1d9e0] text-[#1a2533] rounded hover:bg-[#f8f9fb]">View Dependency Journey → M17</button>
            <button onClick={onOpenM28}      className="px-4 py-2 text-xs font-semibold border border-[#d1d9e0] text-[#1a2533] rounded hover:bg-[#f8f9fb]">View Compliance Context → M28</button>
          </div>
        </>}

        {activeTab === 'sync' && (
          <div className="space-y-3">
            <div className="text-[10px] text-[#374151] italic">Synchronization audit trail for DEC-2026-00418 · 01 Oct 2026</div>
            {M27_SYNC_EVENTS.map((ev, i) => (
              <div key={ev.id}>
                {i > 0 && <div className="text-[#d1d9e0] text-xs pl-6 py-0.5">↓</div>}
                <div className="bg-white border border-[#e5eaf0] rounded-lg px-4 py-3 flex items-start gap-4">
                  <div className="shrink-0 text-center">
                    <div className="font-mono text-[10px] text-[#374151]">{ev.time}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono text-[10px] font-bold text-[#1a3a5c]">{ev.id}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${SYNC_RESULT_STYLE[ev.result]}`}>{ev.result}</span>
                    </div>
                    <div className="text-xs font-semibold text-[#1a2533]">{ev.action}</div>
                    <div className="text-[10px] text-[#374151] mt-0.5">{ev.from} → {ev.to}</div>
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-2 pb-6">
              <button className="text-[10px] text-[#1a56db] hover:underline">View Full Audit History → M38</button>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4 pb-6">
            <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
              <div className="px-4 py-2.5 border-b border-[#e5eaf0]">
                <div className="text-xs font-bold text-[#1a2533]">Entrepreneur Notification</div>
              </div>
              <div className="p-4 space-y-2 text-xs">
                <Row label="Notification ID" value="NTF-00418-07" />
                <Row label="Recipient" value="Applicant — Aster Precision Components Pvt. Ltd." />
                <Row label="Type" value="MIDC Decision — APPROVED" />
                <Row label="Generated" value="01 Oct 2026, 14:33" />
                <Row label="Channel" value="Portal" />
                <Row label="Status" value="Generated" />
              </div>
              <div className="px-4 pb-4">
                <div className="bg-[#f8f9fb] border border-[#e5eaf0] rounded p-3 text-xs space-y-1.5">
                  <div className="font-bold text-[#1a2533] mb-1">Notification Content Summary</div>
                  <Row label="Decision" value="MIDC Building / Planning — APPROVED" />
                  <Row label="Application ID" value="MIDC-APP-2026-00418" />
                  <Row label="Decision Reference" value="DEC-2026-00418" />
                  <Row label="Document Available" value="Approval Order — Document Centre" />
                  <Row label="Next Action" value="Provisional Fire application now available" />
                  <div className="text-[9px] text-[#374151] italic mt-1">Internal officer notes are not exposed to the entrepreneur.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'versions' && (
          <div className="space-y-4 pb-6">
            <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
              <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-3">Versions at Time of Propagation</div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  ['Application Version','v3'],['Business DNA Version','v4'],
                  ['Decision Version','v1'],['Dependency Config Version','v4'],
                  ['Regulatory Rule Version','v2'],['Document Version (App)','v3'],
                  ['Scrutiny Checklist','2026.09'],['Inspection Checklist','2026.09'],
                ].map(([l,v]) => (
                  <div key={l} className="flex justify-between border-b border-[#f0f4f8] pb-1.5">
                    <span className="text-[#374151]">{l}</span>
                    <span className="font-semibold text-[#1a2533]">{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-[10px] text-[#374151] italic bg-[#f8f9fb] rounded border border-[#e5eaf0] px-3 py-2">
                Historical decision propagation is auditable at these version snapshots. Newer rule versions do not recompute this decision.
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

// ─── M28 Conditions / Compliance / Renewal Context ───────────────────────────


const M28_OBLIGATIONS: ComplianceObligation[] = [
  { id:'COND-001', title:'Comply with approval-specific site conditions', source:'MIDC Approval Order — MIDC-ORD-2026-00872', type:'Condition', due:'Configured by approval', entStatus:'Pending', evidence:'0 documents', verification:'Needs Verification', state:'Open' },
  { id:'COND-002', title:'Construction to commence within configured period of approval order', source:'Configured MIDC Service Rule', type:'Condition', due:'Configured date', entStatus:'Not Started', evidence:'0 documents', verification:'Not Applicable', state:'Upcoming' },
  { id:'RPT-001',  title:'Monthly site progress reports to MIDC Estate Office', source:'Configured MIDC Reporting Requirement', type:'Reporting', due:'Monthly — configured start', entStatus:'Not Started', evidence:'0 documents', verification:'Not Applicable', state:'Upcoming' },
  { id:'INSP-001', title:'Post-approval site verification inspection if configured', source:'Configured Inspection Rule', type:'Inspection', due:'Configured window', entStatus:'Not Started', evidence:'—', verification:'Not Applicable', state:'Upcoming' },
]

const OBL_STATE_STYLE: Record<string, string> = {
  'Open':     'bg-[#fff7ed] text-[#9a3412] border-[#fdba74]',
  'Upcoming': 'bg-[#eff6ff] text-[#1e40af] border-[#93c5fd]',
  'Completed':'bg-[#ecfdf5] text-[#065f46] border-[#6ee7b7]',
  'Overdue':  'bg-[#fef2f2] text-[#991b1b] border-[#fca5a5]',
}
const ENT_STATUS_STYLE: Record<string, string> = {
  'Pending':     'text-[#92400e]',
  'Not Started': 'text-[#374151]',
  'Submitted':   'text-[#1e40af]',
  'Completed':   'text-[#065f46]',
  'Overdue':     'text-[#991b1b]',
}

export function M28CompliancePage({ onBack, onOpenM26, onOpenM27, onOpenM29, onOpenInspection, onOpenDepView, onOpenDocReview }: {
  onBack: () => void; onOpenM26: () => void; onOpenM27: () => void; onOpenM29: () => void
  onOpenInspection: () => void; onOpenDepView: () => void; onOpenDocReview: () => void
}) {
  const [selectedObl, setSelectedObl] = useState<ComplianceObligation | null>(null)
  const [activeTab, setActiveTab] = useState<'conditions'|'renewal'|'inspection'|'amendments'|'timeline'>('conditions')

  const tabs = [
    { id:'conditions',  label:'Conditions & Obligations' },
    { id:'renewal',     label:'Renewal Context' },
    { id:'inspection',  label:'Inspection Context' },
    { id:'amendments',  label:'Related Changes' },
    { id:'timeline',    label:'Compliance Timeline' },
  ] as const

  return (
    <div className="flex-1 flex flex-col bg-[#f8f9fb] min-h-0 overflow-y-auto">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#e5eaf0] px-6 py-2 flex items-center gap-1.5 text-xs text-[#1a2533]">
        <button onClick={onBack} className="hover:text-[#1a3a5c] hover:underline">Department Home</button>
        <span>/</span>
        <button onClick={onBack} className="hover:text-[#1a3a5c] hover:underline">Applications</button>
        <span>/</span>
        <button onClick={onOpenM26} className="hover:text-[#1a3a5c] hover:underline">Decision</button>
        <span>/</span>
        <span className="text-[#1a2533] font-semibold">M28 — Conditions / Compliance</span>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-[#e5eaf0] px-6 py-4">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
          <div>
            <h1 className="text-lg font-bold text-[#1a3a5c]">M28 — MIDC Conditions / Compliance / Renewal Context</h1>
            <p className="text-xs text-[#1a2533] mt-0.5">Post-decision obligations and follow-up generated from the recorded MIDC decision.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={onOpenM27} className="text-xs border border-[#d1d9e0] text-[#1a2533] px-3 py-1.5 rounded hover:bg-[#f8f9fb]">← M27 Dependency Update</button>
            <button onClick={onOpenM26} className="text-xs bg-[#1a3a5c] text-white px-3 py-1.5 rounded hover:bg-[#0f2540]">View Formal Decision → M26</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs md:grid-cols-4">
          {[['Application','MIDC-APP-2026-00418'],['Business','Aster Precision Components Pvt. Ltd.'],
            ['Service','MIDC Building / Planning'],['State','APPROVED'],
            ['Decision ID','DEC-2026-00418'],['Approval / Order','MIDC-ORD-2026-00418'],
            ['Decision Date','01 Oct 2026'],['Desk','Compliance Desk'],
          ].map(([l,v]) => (
            <div key={l}><span className="text-[#374151] text-[10px]">{l}</span><p className={`font-semibold text-[11px] ${l==='State' ? 'text-[#065f46]' : 'text-[#1a2533]'}`}>{v}</p></div>
          ))}
        </div>
      </div>

      {/* Decision Source card + Obligation summary */}
      <div className="px-6 pt-4 flex gap-4 flex-wrap">
        <div className="bg-white border border-[#e5eaf0] rounded-lg p-4 w-72 shrink-0">
          <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-2">Decision Source</div>
          <div className="space-y-1 text-xs">
            <Row label="Decision ID" value="DEC-2026-00418" />
            <Row label="Outcome" value="APPROVED" />
            <Row label="Date" value="01 Oct 2026" />
            <Row label="Officer" value="Authorised Officer — MIDC Building" />
            <Row label="App Version" value="v3" />
            <Row label="DNA Version" value="v4" />
            <Row label="Approval Version" value="v1" />
          </div>
          <button onClick={onOpenM26} className="mt-3 text-[10px] text-[#1a56db] hover:underline font-semibold">View Formal Decision → M26</button>
          <div className="mt-1 text-[9px] text-[#374151] italic">Decision cannot be edited from M28.</div>
        </div>

        {/* Obligation summary cards */}
        <div className="flex gap-3 flex-wrap flex-1">
          {[
            { label:'Active Conditions', count:2, color:'text-[#9a3412] bg-[#fff7ed] border-[#fdba74]' },
            { label:'Upcoming Actions',  count:2, color:'text-[#1e40af] bg-[#eff6ff] border-[#93c5fd]' },
            { label:'Renewals',          count:0, special:'No renewal requirement configured for this service.' },
            { label:'Periodic Reporting',count:0, special:'No periodic reporting obligation configured.' },
          ].map(card => (
            <div key={card.label} className="bg-white border border-[#e5eaf0] rounded-lg p-4 min-w-[160px] flex-1">
              <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider">{card.label}</div>
              {card.special ? (
                <div className="text-[10px] text-[#374151] italic mt-1">{card.special}</div>
              ) : (
                <div className={`text-2xl font-black mt-1 ${card.count > 0 ? card.color?.split(' ')[0] : 'text-[#1a2533]'}`}>{card.count}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-[#e5eaf0] px-6 mt-4 flex gap-0">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${activeTab === t.id ? 'border-[#1a56db] text-[#1a56db]' : 'border-transparent text-[#1a2533] hover:text-[#1a2533]'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden min-h-0">
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">

          {activeTab === 'conditions' && (
            <>
              <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
                <div className="px-4 py-2.5 border-b border-[#e5eaf0]">
                  <div className="text-xs font-bold text-[#1a2533]">Configured Conditions & Obligations</div>
                  <div className="text-[10px] text-[#374151]">Only obligations generated by configured MIDC service rules or recorded approval conditions are shown.</div>
                </div>
                <table className="w-full text-xs">
                  <thead className="bg-[#f8f9fb] border-b border-[#e5eaf0]">
                    <tr>{['Obligation / Condition','Source','Type','Due / Frequency','Entrepreneur Status','Verification','State','Action'].map(h => (
                      <th key={h} className="px-3 py-2 text-left text-[10px] font-bold text-[#374151] uppercase whitespace-nowrap">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody className="divide-y divide-[#94a3b8]">
                    {M28_OBLIGATIONS.map(obl => (
                      <tr key={obl.id} className="hover:bg-[#f8f9fb] cursor-pointer" onClick={() => setSelectedObl(obl)}>
                        <td className="px-3 py-2.5">
                          <div className="font-mono text-[9px] text-[#374151]">{obl.id}</div>
                          <div className="font-semibold text-[#1a2533] text-[11px] max-w-[220px]">{obl.title}</div>
                          <div className="text-[9px] text-[#374151] mt-0.5">Generated from: {obl.source.split('—')[0].trim()}</div>
                        </td>
                        <td className="px-3 py-2.5 text-[10px] text-[#1a2533] max-w-[140px]">{obl.source}</td>
                        <td className="px-3 py-2.5"><span className="text-[9px] font-bold bg-[#f3f4f6] text-[#1a2533] px-1.5 py-0.5 rounded">{obl.type}</span></td>
                        <td className="px-3 py-2.5 text-[10px] text-[#1a2533]">{obl.due}</td>
                        <td className={`px-3 py-2.5 text-[10px] font-semibold ${ENT_STATUS_STYLE[obl.entStatus] ?? 'text-[#1a2533]'}`}>{obl.entStatus}</td>
                        <td className="px-3 py-2.5 text-[10px] text-[#1a2533]">{obl.verification}</td>
                        <td className="px-3 py-2.5"><span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${OBL_STATE_STYLE[obl.state] ?? 'bg-[#f3f4f6] text-[#1a2533] border-[#d1d5db]'}`}>{obl.state}</span></td>
                        <td className="px-3 py-2.5"><button className="text-[10px] text-[#1a56db] hover:underline" onClick={e => { e.stopPropagation(); setSelectedObl(obl) }}>View Detail</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'renewal' && (
            <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
              <div className="text-xs font-bold text-[#1a2533] mb-2">Renewal Context</div>
              <div className="bg-[#f8f9fb] border border-[#e5eaf0] rounded p-4 text-xs space-y-2">
                <Row label="Current Approval" value="MIDC-ORD-2026-00418" />
                <Row label="Renewal" value="Not Required" />
                <Row label="Status" value="Not Applicable" />
              </div>
              <div className="mt-3 text-[11px] text-[#374151] italic bg-[#f8f9fb] border border-[#e5eaf0] rounded px-3 py-2">
                Renewal is not configured for this MIDC service / approval. No renewal requirement is shown as this is a prototype-safe state — the configured service rule does not include a renewal lifecycle.
              </div>
            </div>
          )}

          {activeTab === 'inspection' && (
            <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
              <div className="px-4 py-2.5 border-b border-[#e5eaf0]">
                <div className="text-xs font-bold text-[#1a2533]">Inspection Context</div>
                <div className="text-[10px] text-[#374151]">Only shown when a post-approval inspection/follow-up rule exists.</div>
              </div>
              <div className="p-4 space-y-3 text-xs">
                <div className="bg-[#f8f9fb] border border-[#e5eaf0] rounded p-3 space-y-1.5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] font-bold text-[#1a3a5c]">INSP-2026-00418</span>
                    <span className="text-[9px] bg-[#ecfdf5] text-[#065f46] border border-[#6ee7b7] px-1.5 py-0.5 rounded font-bold">Resolved</span>
                  </div>
                  <Row label="Type" value="Building / Planning Site Inspection" />
                  <Row label="Date" value="25 Sep 2026 (Re-inspection: 01 Oct 2026)" />
                  <Row label="Outcome" value="Correction Required → Re-inspection Resolved" />
                  <Row label="Related Condition" value="COND-001" />
                  <Row label="Observation Status" value="OBS-2026-00418-01 — Resolved" />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button onClick={onOpenInspection} className="text-[10px] text-[#1a56db] hover:underline px-2 py-1 bg-[#eff6ff] rounded">Inspection Workspace → M23</button>
                  <button onClick={onOpenInspection} className="text-[10px] text-[#1a56db] hover:underline px-2 py-1 bg-[#eff6ff] rounded">Observation / Re-inspection → M24</button>
                </div>
                <div className="text-[9px] text-[#374151] italic">Inspection completion is an input to compliance context only. It does not automatically determine application outcome.</div>
              </div>
            </div>
          )}

          {activeTab === 'amendments' && (
            <div className="space-y-3">
              <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
                <div className="text-xs font-bold text-[#1a2533] mb-2">Related Changes / Amendments</div>
                <div className="bg-[#fffbeb] border border-[#fcd34d] rounded p-3 text-xs mb-3">
                  No amendment or change has been initiated for this approval. M29 — Expansion / Amendment Intake is available if the entrepreneur submits a Business DNA change.
                </div>
                <div className="text-[10px] text-[#374151] mb-2">Original Approval History</div>
                <div className="space-y-1.5 text-xs">
                  <Row label="Original Application" value="MIDC-APP-2026-00418" />
                  <Row label="Original Approval" value="MIDC-ORD-2026-00418" />
                  <Row label="Decision Date" value="01 Oct 2026" />
                  <Row label="Approved DNA Version" value="v4" />
                </div>
                <div className="mt-3 bg-[#eff6ff] border border-[#93c5fd] rounded px-3 py-2 text-[10px] text-[#1e40af]">
                  Original approval history is preserved. Proposed changes create a new change/amendment version and do not overwrite the historical decision.
                </div>
              </div>
              <button onClick={onOpenM29} className="w-full text-left bg-white border border-[#e5eaf0] rounded-lg px-4 py-3 hover:border-[#1a56db] hover:bg-[#f8fbff] transition-colors">
                <div className="text-xs font-bold text-[#1a3a5c]">Open Expansion / Amendment Intake → M29</div>
                <div className="text-[10px] text-[#374151] mt-0.5">Review proposed Business DNA changes and their regulatory impact.</div>
              </button>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
              <div className="text-xs font-bold text-[#1a2533] mb-3">Compliance Timeline</div>
              <div className="relative pl-8">
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-[#e5eaf0]" />
                {[
                  { date:'01 Oct 2026', event:'MIDC Decision Recorded', detail:'DEC-2026-00418 — APPROVED', link:null },
                  { date:'01 Oct 2026', event:'Approval / Order Generated', detail:'MIDC-ORD-2026-00418', link:null },
                  { date:'01 Oct 2026', event:'Configured Conditions Created', detail:'COND-001, COND-002 created from approval conditions', link:null },
                  { date:'01 Oct 2026', event:'M27 Dependency Propagation', detail:'Dependency nodes updated', link:'→ M27' },
                  { date:'Configured date', event:'Entrepreneur Action Due', detail:'Site conditions compliance — entrepreneur action pending', link:null },
                  { date:'Configured date', event:'Reporting / Follow-up', detail:'Monthly site progress reports (if configured)', link:null },
                ].map((ev, i) => (
                  <div key={i} className="relative mb-4">
                    <div className="absolute -left-5 top-1.5 w-3 h-3 rounded-full bg-[#1a3a5c] border-2 border-white" />
                    <div className="bg-[#f8f9fb] border border-[#e5eaf0] rounded-lg px-3 py-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-[10px] text-[#374151]">{ev.date}</div>
                          <div className="text-xs font-semibold text-[#1a2533]">{ev.event}</div>
                          <div className="text-[10px] text-[#1a2533] mt-0.5">{ev.detail}</div>
                        </div>
                        {ev.link && <span className="text-[9px] text-[#1a56db] shrink-0">{ev.link}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right drawer */}
        {selectedObl && (
          <div className="w-80 shrink-0 bg-white border-l border-[#e5eaf0] overflow-y-auto p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-[#1a2533]">Condition Detail</div>
              <button onClick={() => setSelectedObl(null)} className="text-[#374151] hover:text-[#1a2533]"><Icon.X /></button>
            </div>
            <div className="bg-[#f8f9fb] border border-[#e5eaf0] rounded p-3 space-y-1.5 text-xs">
              <Row label="Condition ID" value={selectedObl.id} />
              <Row label="Type" value={selectedObl.type} />
              <Row label="State" value={selectedObl.state} />
              <Row label="Entrepreneur Status" value={selectedObl.entStatus} />
              <Row label="Evidence" value={selectedObl.evidence} />
              <Row label="Verification" value={selectedObl.verification} />
              <Row label="Due / Frequency" value={selectedObl.due} />
            </div>
            <div>
              <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-1">Condition Text</div>
              <div className="text-xs text-[#1a2533] bg-[#f8f9fb] rounded border border-[#e5eaf0] p-2.5">{selectedObl.title}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-1">Source / Provenance</div>
              <div className="text-[10px] text-[#1a2533] bg-[#fffbeb] border border-[#fcd34d] rounded px-2.5 py-2">
                <div className="font-bold text-[#92400e] mb-0.5">Generated from:</div>
                {selectedObl.source}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <button onClick={onOpenM26}      className="text-left text-[10px] text-[#1a56db] hover:underline px-2 py-1 bg-[#eff6ff] rounded">View Approval → M26</button>
              <button onClick={onOpenDocReview} className="text-left text-[10px] text-[#1a56db] hover:underline px-2 py-1 bg-[#eff6ff] rounded">View Evidence → M13</button>
              <button onClick={onOpenDepView}   className="text-left text-[10px] text-[#1a56db] hover:underline px-2 py-1 bg-[#eff6ff] rounded">View Dependency → M17</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── M29 Expansion / Amendment Intake ────────────────────────────────────────


const M29_CHANGES: ChangeField[] = [
  { field:'Production Capacity', current:'10,000 units/year', proposed:'15,000 units/year', delta:'+5,000 units/year', source:'Entrepreneur Business DNA', verification:'USER_CONFIRMED', changed:true },
  { field:'Building Area',       current:'2,000 sq. m.',      proposed:'2,600 sq. m.',       delta:'+600 sq. m.',       source:'Entrepreneur Business DNA', verification:'USER_CONFIRMED', changed:true },
  { field:'Water Requirement',   current:'40 KLD',             proposed:'65 KLD',             delta:'+25 KLD',           source:'Entrepreneur Business DNA', verification:'USER_CONFIRMED', changed:true },
  { field:'Project Type',        current:'New',                proposed:'Expansion',          delta:'Changed',           source:'Entrepreneur Business DNA', verification:'USER_CONFIRMED', changed:true },
  { field:'Plot Area',           current:'4,800 sq. m.',      proposed:'4,800 sq. m.',       delta:'No change',         source:'Entrepreneur Business DNA', verification:'DEPARTMENT_VERIFIED', changed:false },
]

export function M29AmendmentIntakePage({ onBack, onOpenM28, onOpenM26, onOpenDocReview, onOpenConsistency, onOpenDepView, onOpenDelta, onOpenInspection, onOpenDna }: {
  onBack: () => void; onOpenM28: () => void; onOpenM26: () => void
  onOpenDocReview: () => void; onOpenConsistency: () => void; onOpenDepView: () => void
  onOpenDelta: () => void; onOpenInspection: () => void; onOpenDna: () => void
}) {
  const [activeTab, setActiveTab] = useState<'comparison'|'impact'|'documents'|'history'>('comparison')
  const [changeStatus] = useState<string>('Impact Review')

  const tabs = [
    { id:'comparison', label:'Business Change Comparison' },
    { id:'impact',     label:'Regulatory Impact Analysis' },
    { id:'documents',  label:'Document Impact' },
    { id:'history',    label:'Version History' },
  ] as const

  return (
    <div className="flex-1 flex flex-col bg-[#f8f9fb] min-h-0 overflow-y-auto">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#e5eaf0] px-6 py-2 flex items-center gap-1.5 text-xs text-[#1a2533]">
        <button onClick={onBack} className="hover:text-[#1a3a5c] hover:underline">Department Home</button>
        <span>/</span>
        <button onClick={onOpenM28} className="hover:text-[#1a3a5c] hover:underline">Conditions / Compliance</button>
        <span>/</span>
        <span className="text-[#1a2533] font-semibold">M29 — Expansion / Amendment Intake</span>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-[#e5eaf0] px-6 py-4">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
          <div>
            <h1 className="text-lg font-bold text-[#1a3a5c]">M29 — Expansion / Amendment Intake</h1>
            <p className="text-xs text-[#1a2533] mt-0.5">Review proposed Business DNA changes and their impact on the existing MIDC approval and regulatory journey.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={onOpenM28} className="text-xs border border-[#d1d9e0] text-[#1a2533] px-3 py-1.5 rounded hover:bg-[#f8f9fb]">← Conditions / Compliance</button>
            <span className={`text-xs font-bold px-3 py-1.5 rounded border bg-[#fffbeb] text-[#92400e] border-[#fcd34d]`}>Change / Amendment: {changeStatus}</span>
          </div>
        </div>

        {/* Change source banner */}
        <div className="bg-[#eff6ff] border border-[#93c5fd] rounded-lg px-4 py-3 flex items-start gap-4 flex-wrap">
          <div className="flex-1">
            <div className="text-[10px] font-bold text-[#1e40af] uppercase">Business Change Source</div>
            <div className="text-xs font-semibold text-[#1a2533] mt-0.5">Change initiated from Entrepreneur Business Change Simulator</div>
          </div>
          <div className="grid grid-cols-3 gap-x-6 gap-y-0.5 text-[10px]">
            <div><span className="text-[#374151]">Change Request: </span><span className="font-semibold">CHG-2026-00019</span></div>
            <div><span className="text-[#374151]">Submitted: </span><span className="font-semibold">18 Oct 2026</span></div>
            <div><span className="text-[#374151]">Previous DNA: </span><span className="font-semibold">v3</span></div>
            <div><span className="text-[#374151]">Proposed DNA: </span><span className="font-semibold">v4</span></div>
            <div><span className="text-[#374151]">Change Type: </span><span className="font-semibold">Capacity Increase + Building Expansion</span></div>
            <div><span className="text-[#374151]">Status: </span><span className="font-semibold text-[#92400e]">Impact Review</span></div>
          </div>
          <button onClick={onOpenDna} className="text-[10px] text-[#1a56db] hover:underline shrink-0">View Business DNA Versions</button>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-1 text-xs md:grid-cols-4">
          {[['Business','Aster Precision Components Pvt. Ltd.'],['Project','Building / Planning'],
            ['Original Application','MIDC-APP-2026-00418'],['Original Approval','MIDC-ORD-2026-00418'],
            ['Current DNA Version','v3'],['Proposed DNA Version','v4'],
            ['Change Request','CHG-2026-00019'],['Approval State','APPROVED → Under Review'],
          ].map(([l,v]) => (
            <div key={l}><span className="text-[#374151] text-[10px]">{l}</span><p className="font-semibold text-[11px] text-[#1a2533]">{v}</p></div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-[#e5eaf0] px-6 flex gap-0">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${activeTab === t.id ? 'border-[#1a56db] text-[#1a56db]' : 'border-transparent text-[#1a2533] hover:text-[#1a2533]'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="px-6 py-4 space-y-4">

        {activeTab === 'comparison' && (
          <>
            <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
              <div className="px-4 py-2.5 border-b border-[#e5eaf0]">
                <div className="text-xs font-bold text-[#1a2533]">Business Change Comparison — Current vs Proposed</div>
                <div className="text-[10px] text-[#374151]">Source: Entrepreneur Business DNA v3 → v4. Original Business DNA is preserved — changes create a new versioned record.</div>
              </div>
              <table className="w-full text-xs">
                <thead className="bg-[#f8f9fb] border-b border-[#e5eaf0]">
                  <tr>{['Field','Current (v3)','Proposed (v4)','Delta','Source','Verification','Status'].map(h => (
                    <th key={h} className="px-3 py-2 text-left text-[10px] font-bold text-[#374151] uppercase whitespace-nowrap">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y divide-[#94a3b8]">
                  {M29_CHANGES.map(c => (
                    <tr key={c.field} className={c.changed ? 'bg-[#fffbeb]' : 'hover:bg-[#f8f9fb]'}>
                      <td className="px-3 py-2.5 font-semibold text-[#1a2533]">{c.field}</td>
                      <td className="px-3 py-2.5 text-[#1a2533]">{c.current}</td>
                      <td className="px-3 py-2.5 font-semibold text-[#1a2533]">{c.proposed}</td>
                      <td className={`px-3 py-2.5 font-bold ${c.changed ? 'text-[#92400e]' : 'text-[#374151]'}`}>{c.delta}</td>
                      <td className="px-3 py-2.5 text-[#374151] text-[10px]">{c.source}</td>
                      <td className="px-3 py-2.5 text-[10px]"><span className="bg-[#f3f4f6] text-[#1a2533] px-1.5 py-0.5 rounded text-[9px] font-bold">{c.verification}</span></td>
                      <td className="px-3 py-2.5"><span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${c.changed ? 'bg-[#fff7ed] text-[#9a3412] border-[#fdba74]' : 'bg-[#ecfdf5] text-[#065f46] border-[#6ee7b7]'}`}>{c.changed ? 'Changed' : 'No Change'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Change Impact Summary */}
            <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
              <div className="text-xs font-bold text-[#1a2533] mb-3">Change Impact Summary</div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 text-xs">
                {[
                  { label:'Business DNA', result:'Changed (v3 → v4)', source:'Business DNA comparison', color:'text-[#9a3412]' },
                  { label:'MIDC Services', result:'Needs Review — Building/Planning affected', source:'Configured MIDC rule', color:'text-[#92400e]' },
                  { label:'Amendment', result:'Configured rule indicates amendment required', source:'Configured MIDC rule', color:'text-[#9a3412]' },
                  { label:'Inspection', result:'Inspection scope may change', source:'Configured inspection rule', color:'text-[#92400e]' },
                  { label:'Documents', result:'2 documents require update', source:'Business DNA comparison', color:'text-[#92400e]' },
                  { label:'External Dependencies', result:'Water utility: dependency may be affected', source:'Configured dependency rule', color:'text-[#92400e]' },
                  { label:'Existing Conditions', result:'COND-001 scope may change', source:'Approval condition', color:'text-[#9a3412]' },
                ].map(item => (
                  <div key={item.label} className="bg-[#f8f9fb] rounded border border-[#e5eaf0] px-3 py-2.5">
                    <div className="text-[10px] text-[#374151] font-bold uppercase">{item.label}</div>
                    <div className={`text-[11px] font-semibold mt-0.5 ${item.color}`}>{item.result}</div>
                    <div className="text-[9px] text-[#374151] mt-0.5">Source: {item.source}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Original approval protection */}
            <div className="bg-[#eff6ff] border border-[#93c5fd] rounded-lg px-4 py-3 flex items-start gap-3">
              <div className="text-[#1e40af] font-black text-lg shrink-0">ℹ</div>
              <div>
                <div className="text-xs font-bold text-[#1e40af]">Original Approval History is Preserved</div>
                <div className="text-[10px] text-[#1a2533] mt-0.5">Proposed changes create a new change/amendment version (CHG-2026-00019) and do not overwrite the historical decision DEC-2026-00418 or approval MIDC-ORD-2026-00418.</div>
                <div className="flex gap-3 mt-2">
                  <button onClick={onOpenM26}  className="text-[10px] text-[#1a56db] hover:underline">View Original Approval → M26</button>
                  <button className="text-[10px] text-[#1a56db] hover:underline">View Audit History → M38</button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'impact' && (
          <div className="space-y-4">
            {/* Amendment Requirement */}
            <div className="bg-white border-2 border-[#fcd34d] rounded-lg overflow-hidden">
              <div className="px-4 py-2.5 bg-[#fffbeb] border-b border-[#fcd34d]">
                <div className="text-xs font-bold text-[#92400e]">Amendment Requirement</div>
              </div>
              <div className="p-4 text-xs space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#9a3412] text-sm">Amendment Required</span>
                  <span className="text-[9px] bg-[#fff7ed] text-[#9a3412] border border-[#fdba74] px-1.5 py-0.5 rounded font-bold">Configured rule indicates</span>
                </div>
                <Row label="Reason" value="Building area increase (+600 sq. m.) exceeds configured threshold for existing approval scope" />
                <Row label="Configured Rule" value="MIDC Building / Planning — Expansion Amendment Rule" />
                <Row label="Source" value="Configured MIDC Service Rule" />
                <Row label="Affected Fields" value="Building Area, Production Capacity" />
                <div className="mt-2 text-[9px] text-[#374151] italic">This is not final statutory approval. The above result is machine-derived from configured rules. Officer determination may be required before proceeding.</div>
              </div>
            </div>

            {/* Impact categories */}
            {[
              { title:'Affected MIDC Services', content: [
                { label:'Existing', value:'MIDC Building / Planning' },
                { label:'Potentially Affected', value:'Building / Planning — Expansion Amendment Service' },
                { label:'Reason', value:'Built-up area changed +600 sq. m.' },
                { label:'Source', value:'Business DNA Version 4' },
                { label:'Status', value:'Needs Review' },
              ], links:[{ label:'View Scrutiny → M14', fn: onOpenDocReview }] },
              { title:'Inspection Impact', content: [
                { label:'Existing Inspection', value:'INSP-2026-00418 — Resolved' },
                { label:'Proposed', value:'New inspection scope may be required for expanded building area' },
                { label:'Status', value:'Inspection scope may change — officer determination required' },
                { label:'Affected Checklist', value:'MIDC Building / Planning Checklist v2026.09' },
              ], links:[{ label:'Inspection Queue → M21', fn: onOpenInspection }] },
              { title:'External Dependency Impact', content: [
                { label:'Business Change', value:'Water Requirement increased 40 → 65 KLD' },
                { label:'Department', value:'Water Utility / MIDC Water Services' },
                { label:'Dependency', value:'Configured utility dependency' },
                { label:'Previous State', value:'Pending' },
                { label:'Potential New State', value:'Dependency availability may be affected' },
                { label:'Status', value:'Officer determination required' },
              ], links:[{ label:'Dependency View → M17', fn: onOpenDepView }] },
            ].map(section => (
              <div key={section.title} className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
                <div className="px-4 py-2.5 border-b border-[#e5eaf0]">
                  <div className="text-xs font-bold text-[#1a2533]">{section.title}</div>
                </div>
                <div className="p-4 space-y-1.5 text-xs">
                  {section.content.map(item => <Row key={item.label} label={item.label} value={item.value} />)}
                  <div className="flex gap-2 pt-1.5">
                    {section.links.map(link => (
                      <button key={link.label} onClick={link.fn} className="text-[10px] text-[#1a56db] hover:underline px-2 py-1 bg-[#eff6ff] rounded">{link.label}</button>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* New MIDC Service */}
            <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
              <div className="px-4 py-2.5 border-b border-[#e5eaf0]">
                <div className="text-xs font-bold text-[#1a2533]">New MIDC Service Impact</div>
              </div>
              <div className="p-4 text-xs space-y-1.5">
                <Row label="Current Services" value="MIDC Building / Planning" />
                <Row label="Potential New Service" value="Configured expansion-related MIDC service" />
                <Row label="Reason" value="Building area exceeds previous approved project configuration by configured threshold" />
                <Row label="Status" value="Needs Verification — officer determination required" />
                <div className="text-[9px] text-[#374151] italic mt-1">Configured rules indicate an additional MIDC service may be required. This requires officer determination before proceeding.</div>
              </div>
            </div>

            {/* Officer Actions */}
            <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
              <div className="text-xs font-bold text-[#1a2533] mb-2">Officer Actions</div>
              <div className="flex gap-2 flex-wrap">
                {[
                  { label:'Mark Impact Reviewed', fn:() => {} },
                  { label:'Request Clarification', fn:() => {} },
                  { label:'Open Consistency → M16', fn:onOpenConsistency },
                  { label:'View Delta → M20', fn:onOpenDelta },
                  { label:'Open Dependency → M17', fn:onOpenDepView },
                  { label:'View Decision → M25/M26', fn:onOpenM26 },
                ].map(action => (
                  <button key={action.label} onClick={action.fn} className="text-xs border border-[#d1d9e0] text-[#1a2533] px-3 py-1.5 rounded hover:bg-[#f8f9fb]">{action.label}</button>
                ))}
              </div>
              <div className="mt-2 text-[9px] text-[#374151] italic">Actions are contextual workflow actions only. This screen does not approve or reject the amendment.</div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[#e5eaf0]">
              <div className="text-xs font-bold text-[#1a2533]">Document Impact</div>
              <div className="text-[10px] text-[#374151]">Uses existing Document Centre — no separate amendment document repository is created.</div>
            </div>
            <table className="w-full text-xs">
              <thead className="bg-[#f8f9fb] border-b border-[#e5eaf0]">
                <tr>{['Document','Current Version','Required Version','Reason','Verification','Action'].map(h => (
                  <th key={h} className="px-3 py-2 text-left text-[10px] font-bold text-[#374151] uppercase">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-[#94a3b8]">
                {[
                  { doc:'Building Plan', cur:'v2', req:'v3 (expanded scope)', reason:'Building area change requires updated plan', ver:'Needs Re-verification', action:'Request Updated Document', changed:true },
                  { doc:'Water Utility NOC', cur:'v1', req:'v2 (updated capacity)', reason:'Water requirement increased', ver:'Needs Re-verification', action:'Request Updated Document', changed:true },
                  { doc:'Land / Plot Record', cur:'v3', req:'v3 (unchanged)', reason:'No plot area change', ver:'Department Verified', action:'—', changed:false },
                ].map(row => (
                  <tr key={row.doc} className={row.changed ? 'bg-[#fffbeb]' : 'hover:bg-[#f8f9fb]'}>
                    <td className="px-3 py-2.5 font-semibold text-[#1a2533]">{row.doc}</td>
                    <td className="px-3 py-2.5 text-[#1a2533]">{row.cur}</td>
                    <td className="px-3 py-2.5 font-semibold text-[#9a3412]">{row.req}</td>
                    <td className="px-3 py-2.5 text-[10px] text-[#1a2533]">{row.reason}</td>
                    <td className="px-3 py-2.5"><span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${row.changed ? 'bg-[#fff7ed] text-[#9a3412] border-[#fdba74]' : 'bg-[#ecfdf5] text-[#065f46] border-[#6ee7b7]'}`}>{row.ver}</span></td>
                    <td className="px-3 py-2.5"><button onClick={onOpenDocReview} className="text-[10px] text-[#1a56db] hover:underline">{row.action}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-3">
            <div className="text-[10px] text-[#374151] italic">Version timeline for this business and project. Previous versions are preserved and immutable.</div>
            <div className="relative pl-10">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#e5eaf0]" />
              {[
                { ver:'Business DNA v1', date:'01 Aug 2026', label:'Original project', type:'dna' },
                { ver:'Application v1',  date:'05 Aug 2026', label:'MIDC submission — MIDC-APP-2026-00418', type:'app' },
                { ver:'Decision v1',     date:'01 Oct 2026', label:'Approved — DEC-2026-00418', type:'decision' },
                { ver:'Business DNA v3', date:'10 Oct 2026', label:'Updated business information', type:'dna' },
                { ver:'Change Request v1', date:'18 Oct 2026', label:'Capacity increase + building expansion proposed — CHG-2026-00019', type:'change', current:true },
              ].map((ev, i) => (
                <div key={i} className="relative mb-3">
                  <div className={`absolute -left-6 top-2 w-3 h-3 rounded-full border-2 border-white ${ev.current ? 'bg-[#9a3412]' : ev.type === 'decision' ? 'bg-[#065f46]' : 'bg-[#1a3a5c]'}`} />
                  <div className={`rounded-lg border px-3 py-2.5 text-xs ${ev.current ? 'border-[#fdba74] bg-[#fffbeb]' : 'border-[#e5eaf0] bg-white'}`}>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-[#1a2533]">{ev.ver}</span>
                      {ev.current && <span className="text-[9px] font-bold text-[#9a3412]">← Current Change</span>}
                    </div>
                    <div className="text-[10px] text-[#374151]">{ev.date}</div>
                    <div className="text-[10px] text-[#1a2533] mt-0.5">{ev.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Business Change Simulator handoff flow */}
        <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
          <div className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-3">Business Change Simulator → MIDC Amendment Flow</div>
          <div className="flex items-center gap-1 flex-wrap text-[10px] text-[#1a2533]">
            {['Entrepreneur Business Change Simulator','Proposed DNA v4','Change Request CHG-2026-00019','MIDC M29 Intake','Impact Analysis','Affected MIDC Services','Document / Inspection Impact','Amendment Workflow','Focused Re-scrutiny','Decision if Required → M25/M26','M27 Dependency Update','Updated Entrepreneur Journey'].map((step, i, arr) => (
              <span key={step} className="flex items-center gap-1">
                <span className={`px-2 py-1 rounded text-[9px] font-semibold ${i === 3 ? 'bg-[#1a3a5c] text-white' : 'bg-[#f3f4f6] text-[#1a2533]'}`}>{step}</span>
                {i < arr.length - 1 && <span className="text-[#d1d9e0]">→</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── M19 Query / Response History ─────────────────────────────────────────────


const M19_QUERY_LIST: QueryRecord[] = [
  { queryId:'QRY-2026-0036', sentAt:'12 Sep 2026', defCount:2, docsRequested:2, appState:'QUERY_RAISED', status:'closed', defs:['DEF-2026-0081','DEF-2026-0082'], response:'Entrepreneur uploaded all requested documents. Deficiencies DEF-2026-0081 and DEF-2026-0082 resolved.', respondedAt:'15 Sep 2026' },
  { queryId:'QRY-2026-0039', sentAt:'18 Sep 2026', defCount:1, docsRequested:0, appState:'QUERY_RAISED', status:'response-received', defs:['DEF-2026-0083'], response:'Entrepreneur confirmed company name — Aster Precision Components Pvt. Ltd. Application update pending.', respondedAt:'20 Sep 2026' },
  { queryId:'QRY-2026-0042', sentAt:'—',           defCount:4, docsRequested:0, appState:'QUERY_RAISED', status:'draft', defs:['DEF-2026-0091','DEF-2026-0092','DEF-2026-0093','DEF-2026-0094'] },
]

const M19_STATUS: Record<QueryRecord['status'], { label: string; textCls: string; bgCls: string; borderCls: string }> = {
  'awaiting-response': { label:'Awaiting Response', textCls:'text-amber-700',   bgCls:'bg-amber-50',    borderCls:'border-amber-200' },
  'response-received': { label:'Response Received', textCls:'text-[#1a56db]',   bgCls:'bg-[#ebf3ff]',   borderCls:'border-[#bdd4f5]' },
  'closed':            { label:'Closed',            textCls:'text-emerald-700', bgCls:'bg-emerald-50',  borderCls:'border-emerald-200' },
  'draft':             { label:'Draft',             textCls:'text-[#374151]',   bgCls:'bg-[#f8f9fb]',   borderCls:'border-[#d1d9e0]' },
}

export function M19QueryHistoryPage({ onBack, onBackToOverview, onOpenQueryBuilder }: {
  onBack: () => void; onBackToOverview: () => void; onOpenQueryBuilder?: () => void
}) {
  const [selectedQuery, setSelectedQuery] = useState(M19_QUERY_LIST[0])
  const [selectedDef, setSelectedDef]     = useState<Deficiency | null>(null)

  const allDefs = [...M18_CANDIDATES, ...M18_PREVIOUS]

  const StatusBadge = ({ status }: { status: QueryRecord['status'] }) => {
    const m = M19_STATUS[status]
    return <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold border ${m.bgCls} ${m.textCls} ${m.borderCls}`}>{m.label}</span>
  }

  const DefStatusBadge = ({ status }: { status: DefStatus }) => {
    const m = M18_DEF_STATUS[status]
    return <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold border ${m.bgCls} ${m.textCls} ${m.borderCls}`}>{m.label}</span>
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#f8f9fb]">
      {/* Header */}
      <div className="bg-white border-b border-[#d1d9e0] px-5 py-3 shrink-0">
        <Breadcrumb items={[{ label:'Department Home', onClick: onBackToOverview },{ label:'Applications', onClick: onBackToOverview },{ label:'Application Overview', onClick: onBackToOverview },{ label:'Query Builder', onClick: onBack },{ label:'Query / Response History' }]} />
        <div className="flex items-start justify-between gap-4 mt-2">
          <div>
            <h1 className="text-base font-bold text-[#1a2533]">M19 — Query / Response History <span className="text-[11px] text-[#374151] font-normal ml-2">Full audit trail of sent queries and entrepreneur responses</span></h1>
            <p className="text-[11px] text-[#374151] mt-0.5">MIDC-APP-2026-00418 · Aster Precision Components Pvt. Ltd.</p>
          </div>
          <button onClick={onOpenQueryBuilder} className="text-xs text-[#1a56db] hover:underline shrink-0">← Query Builder (M18)</button>
        </div>
      </div>

      {/* Purpose */}
      <div className="bg-[#ebf3ff] border-b border-[#bdd4f5] px-5 py-2 shrink-0">
        <p className="text-[11px] text-[#1a3a5c]"><span className="font-bold">Query / Response History</span> — Complete audit trail of all queries sent to the entrepreneur, responses received, and current deficiency resolution state. Historical records are preserved; original deficiency IDs are never overwritten on resubmission.</p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT — query list */}
        <div className="w-60 shrink-0 bg-white border-r border-[#d1d9e0] overflow-y-auto">
          <div className="px-3 py-2.5 border-b border-[#d1d9e0]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-bold">All Queries ({M19_QUERY_LIST.length})</p>
          </div>
          <div className="py-1">
            {M19_QUERY_LIST.map(q => {
              const active = selectedQuery.queryId === q.queryId
              return (
                <button key={q.queryId} onClick={() => { setSelectedQuery(q); setSelectedDef(null) }}
                  className={`w-full text-left px-3 py-3 border-b border-[#f0f4f8] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1a56db] ${active ? 'bg-[#ebf3ff]' : 'hover:bg-[#f8f9fb]'}`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-bold text-[#1a2533]">{q.queryId}</span>
                    <StatusBadge status={q.status} />
                  </div>
                  <p className="text-[9px] text-[#374151]">{q.sentAt === '—' ? 'Not yet sent' : `Sent: ${q.sentAt}`}</p>
                  <p className="text-[9px] text-[#374151]">{q.defCount} deficiencie{q.defCount !== 1 ? 's' : ''}</p>
                </button>
              )
            })}
          </div>
          <div className="px-3 py-3 border-t border-[#d1d9e0]">
            <button onClick={onOpenQueryBuilder} className="w-full px-3 py-1.5 text-xs font-bold border border-[#1a3a5c] text-[#1a3a5c] rounded hover:bg-[#ebf3ff]">New Query → M18</button>
          </div>
        </div>

        {/* CENTER — query detail + deficiency list */}
        <main className="flex-1 overflow-y-auto bg-[#f8f9fb] p-5 space-y-4" tabIndex={-1}>
          <div className="bg-white border border-[#d1d9e0] rounded overflow-hidden">
            <div className="px-4 py-3 border-b border-[#f0f4f8] flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-[#1a2533]">{selectedQuery.queryId}</p>
                <p className="text-[10px] text-[#374151] mt-0.5">Application: MIDC-APP-2026-00418 · {selectedQuery.sentAt === '—' ? 'Draft — not yet sent' : `Sent: ${selectedQuery.sentAt}`}{selectedQuery.respondedAt ? ` · Response: ${selectedQuery.respondedAt}` : ''}</p>
              </div>
              <StatusBadge status={selectedQuery.status} />
            </div>
            <div className="grid grid-cols-4 gap-4 px-4 py-3 text-[11px]">
              <div><p className="text-[#374151]">Deficiencies</p><p className="font-bold text-[#1a2533]">{selectedQuery.defCount}</p></div>
              <div><p className="text-[#374151]">Docs requested</p><p className="font-bold text-[#1a2533]">{selectedQuery.docsRequested}</p></div>
              <div><p className="text-[#374151]">App state</p><p className="font-bold text-[#1a3a5c]">{selectedQuery.appState}</p></div>
              <div><p className="text-[#374151]">Status</p><StatusBadge status={selectedQuery.status} /></div>
            </div>
            {selectedQuery.response && (
              <div className="px-4 py-3 border-t border-[#f0f4f8] bg-emerald-50">
                <p className="text-[9px] text-emerald-700 uppercase tracking-wider font-semibold mb-1">Entrepreneur Response</p>
                <p className="text-[11px] text-emerald-800">{selectedQuery.response}</p>
              </div>
            )}
          </div>

          {/* Deficiency rows for this query */}
          <h3 className="text-[10px] font-bold text-[#374151] uppercase tracking-wider">Deficiencies in this query</h3>
          <div className="space-y-2">
            {selectedQuery.defs.map(defId => {
              const def = allDefs.find(d => d.id === defId)
              if (!def) return <div key={defId} className="bg-white border border-[#d1d9e0] rounded px-4 py-2 text-[10px] text-[#374151]">{defId} — details pending</div>
              const isActive = selectedDef?.id === def.id
              return (
                <div key={defId} className={`bg-white border rounded overflow-hidden cursor-pointer transition-all ${isActive ? 'border-[#1a56db] ring-1 ring-[#1a56db]' : 'border-[#d1d9e0] hover:border-[#bdd4f5]'}`}
                  onClick={() => setSelectedDef(isActive ? null : def)}
                >
                  <div className="flex items-center justify-between gap-4 px-4 py-2.5">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-[#374151]">{def.id}</span>
                      <span className="text-[10px] font-semibold text-[#1a2533]">{def.category}</span>
                      <span className="text-[9px] text-[#374151]">{def.source}</span>
                    </div>
                    <DefStatusBadge status={def.status} />
                  </div>
                  {isActive && (
                    <div className="divide-y divide-[#94a3b8] border-t border-[#f0f4f8]">
                      {[['Issue', def.issue],['Required Correction', def.requiredCorrection],['Evidence', def.evidence],['Related Field', def.relatedField],['Document Requested', def.docRequested]].map(([k,v]) => (
                        <div key={k} className="grid grid-cols-3 gap-2 px-4 py-2.5 text-[11px]">
                          <p className="text-[#374151]">{k}</p>
                          <p className="col-span-2 text-[#1a2533]">{v}</p>
                        </div>
                      ))}
                      {def.response && (
                        <div className="px-4 py-2.5 bg-emerald-50">
                          <p className="text-[9px] text-emerald-700 uppercase font-semibold mb-1">Entrepreneur response</p>
                          <p className="text-[11px] text-emerald-800">{def.response}</p>
                        </div>
                      )}
                      <div className="px-4 py-2 flex gap-2">
                        <button className="text-[10px] text-[#1a56db] hover:underline">View Parameter → M12</button>
                        <button className="text-[10px] text-[#1a56db] hover:underline">View Document → M13</button>
                        {def.status === 'partially-resolved' && <button className="text-[10px] text-amber-600 hover:underline">Reopen</button>}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <p className="text-[10px] text-[#6b7280] italic">Original deficiency IDs are preserved across submissions. Responses and corrections tracked here → Delta re-scrutiny via M20.</p>
        </main>

        {/* RIGHT — audit trail */}
        <aside className="w-60 shrink-0 bg-white border-l border-[#d1d9e0] overflow-y-auto" aria-label="Audit trail">
          <div className="px-4 py-2.5 border-b border-[#d1d9e0] bg-[#f8f9fb]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-bold">Audit Trail</p>
          </div>
          <div className="px-4 py-3 space-y-3 text-[10px]">
            {[
              { date:'23 Sep 2026', action:'Draft query QRY-2026-0042 created', by:'Planning / Building Scrutiny Desk', color:'text-[#1a2533]' },
              { date:'20 Sep 2026', action:'DEF-2026-0083 response reviewed — partially resolved', by:'Planning / Building Scrutiny Desk', color:'text-[#1a2533]' },
              { date:'20 Sep 2026', action:'QRY-2026-0039 response received from entrepreneur', by:'Entrepreneur', color:'text-[#1a56db]' },
              { date:'18 Sep 2026', action:'QRY-2026-0039 sent — 1 deficiency', by:'Planning / Building Scrutiny Desk', color:'text-[#1a2533]' },
              { date:'15 Sep 2026', action:'QRY-2026-0036 DEF-0081 & 0082 resolved — documents verified', by:'Planning / Building Scrutiny Desk', color:'text-emerald-700' },
              { date:'15 Sep 2026', action:'QRY-2026-0036 response received from entrepreneur', by:'Entrepreneur', color:'text-[#1a56db]' },
              { date:'12 Sep 2026', action:'QRY-2026-0036 sent — 2 deficiencies', by:'Planning / Building Scrutiny Desk', color:'text-[#1a2533]' },
            ].map((e, i) => (
              <div key={i} className="flex gap-2">
                <div className="flex flex-col items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d1d9e0] shrink-0 mt-0.5" />
                  {i < 6 && <div className="w-0.5 flex-1 bg-[#f0f4f8] my-0.5" />}
                </div>
                <div className="pb-2">
                  <p className={`text-[10px] ${e.color}`}>{e.action}</p>
                  <p className="text-[9px] text-[#6b7280]">{e.date} · {e.by}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-[#f0f4f8]">
            <p className="text-[9px] text-[#374151] uppercase tracking-wider font-semibold mb-1">Query Lifecycle</p>
            {(['Query Raised','Entrepreneur Notified','Response Received','Officer Review','Resolved / Reopened','Delta Re-scrutiny → M20'] as const).map((s, i) => (
              <div key={s} className="flex items-center gap-1.5 mb-1">
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${i < 3 ? 'bg-emerald-500' : i === 3 ? 'bg-[#1a3a5c]' : 'bg-[#d1d9e0]'}`} />
                <p className={`text-[9px] ${i < 3 ? 'text-emerald-700' : i === 3 ? 'text-[#1a3a5c] font-semibold' : 'text-[#374151]'}`}>{s}</p>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-[#f0f4f8]">
            <p className="text-[9px] text-[#6b7280] italic">Sample prototype data — not actual records</p>
          </div>
        </aside>
      </div>
    </div>
  )
}

// ─── M01 Authenticated Shell ──────────────────────────────────────────────────

function M01Shell({ onLogout, lang, fontSize, highContrast }: {
  onLogout: () => void
  lang: 'en' | 'mr'
  fontSize: 'sm' | 'md' | 'lg'
  highContrast: boolean
}) {
  const [activeDeptItem, setActiveDeptItem] = useState('dept-home')
  const [appView, setAppView] = useState(false)
  const [appSubPage, setAppSubPage] = useState<'overview'|'dna'|'timeline'|'precheck'|'scrutiny-route'|'scrutiny-workbench'|'param-detail'|'doc-review'|'bldg-scrutiny'|'water-scrutiny'|'consistency'|'dependency-view'|'query-builder'|'query-history'|'delta-rescrutiny'|'inspection-queue'|'inspection-planning'|'inspection-workspace'|'observation-reinspection'|'decision-workspace'|'decision-record'|'dependency-update'|'compliance-context'|'amendment-intake'>('overview')
  const [_inspPlanId, setInspPlanId] = useState<string>('INSP-2026-00418')
  const [notifOpen, setNotifOpen] = useState(false)
  const fontCls = fontSize === 'sm' ? 'text-[13px]' : fontSize === 'lg' ? 'text-[16px]' : 'text-[14px]'
  const contrastCls = highContrast ? 'contrast-125 saturate-150' : ''

  return (
    <div className={`min-h-screen flex flex-col ${fontCls} ${contrastCls}`} style={{ fontFamily: 'Noto Sans, Noto Sans Devanagari, system-ui, sans-serif' }}>
      <AccessibilityStrip
        lang={lang} setLang={() => {}}
        fontSize={fontSize} setFontSize={() => {}}
        highContrast={highContrast} setHighContrast={() => {}}
      />
      {/* Government identity header */}
      <header className="bg-white border-b border-[#d1d9e0] shadow-sm" role="banner">
        <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between py-3 gap-8">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-0.5 shrink-0">
              <img src="/assets/india-emblem.png" alt="National Emblem of India" className="h-14 w-auto object-contain" />
              <span className="text-[9px] text-[#4a5568] font-medium tracking-wide leading-none" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>सत्यमेव जयते</span>
            </div>
            <div className="w-px h-12 bg-[#d1d9e0]" aria-hidden="true" />
            <div className="flex flex-col items-center gap-0.5 shrink-0">
              <img src="/assets/maha-seal.png" alt="Government of Maharashtra seal" className="h-12 w-auto object-contain" />
              <span className="text-[9px] text-[#4a5568] font-medium tracking-wide leading-none text-center">Govt. of Maharashtra</span>
            </div>
            <div className="w-px h-12 bg-[#d1d9e0]" aria-hidden="true" />
            <div className="flex items-center gap-3">
              <img src="/assets/ekatma-logo.png" alt="Ekatma portal logo" className="h-10 w-auto object-contain" />
              <div>
                <div className="text-[#1a3a5c] font-bold text-base leading-tight">EKATMA</div>
                <div className="text-[#4a5568] text-[11px] leading-tight">Government of Maharashtra Portal</div>
                <div className="text-[#4a5568] text-[10px] leading-tight" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>महाराष्ट्र शासन पोर्टल</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#1a2533]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#ebf3ff] border border-[#bdd4f5] rounded text-[#1a3a5c] font-medium">
              <MIcon.Shield /> MIDC Department Portal
            </span>
          </div>
        </div>
      </header>

      {/* Department context bar */}
      <DeptContextBar onLogout={onLogout} onNotif={() => setNotifOpen(o => !o)} />

      {/* Shell body */}
      <div className="flex flex-1 overflow-hidden">
        <DeptSidebar active={activeDeptItem} setActive={id => { setActiveDeptItem(id); setAppView(false); setAppSubPage('overview') }} />
        <main id="main-content" className="flex-1 overflow-y-auto flex flex-col" tabIndex={-1}>
          {activeDeptItem === 'dept-home'    && <DeptHome onNavigate={id => { setActiveDeptItem(id); setAppView(false) }} onOpenApp={() => { setActiveDeptItem('dept-queue'); setAppView(true); setAppSubPage('overview') }} />}
          {activeDeptItem === 'dept-queue'   && !appView && <M03QueuePage onOpenApp={() => { setAppView(true); setAppSubPage('overview') }} />}
          {activeDeptItem === 'dept-apps'    && !appView && <M04SearchPage onOpenApp={() => { setAppView(true); setAppSubPage('overview') }} />}
          {activeDeptItem === 'dept-catalogue' && <M05ServicePage />}
          {activeDeptItem === 'dept-scrutiny' && !appView && <ScrutinyCommandCentre onOpenScrutinyApp={(_appId, dest) => { setAppView(true); const d = dest as typeof appSubPage; setAppSubPage(d) }} />}
          {activeDeptItem === 'dept-insp-queue' && <M21InspectionQueuePage onBack={() => setActiveDeptItem('dept-home')} onPlanInspection={id => { setInspPlanId(id); setActiveDeptItem('dept-insp-planning' as string) }} onOpenDepView={() => {}} onOpenQueryHistory={() => {}} onOpenDelta={() => {}} />}
          {activeDeptItem === 'dept-insp-planning' && <M22InspectionPlanningPage onBack={() => setActiveDeptItem('dept-insp-queue')} onBackToQueue={() => setActiveDeptItem('dept-insp-queue')} onOpenDna={() => {}} onOpenDocReview={() => {}} onOpenDepView={() => {}} onOpenDelta={() => {}} onOpenQueryHistory={() => {}} onOpenWorkspace={() => { setAppView(true); setAppSubPage('inspection-workspace') }} />}
          {appView && appSubPage === 'overview'  && (activeDeptItem === 'dept-queue' || activeDeptItem === 'dept-apps' || activeDeptItem === 'dept-scrutiny' || activeDeptItem === 'dept-decisions') && <M06AppOverviewPage onBack={() => setAppView(false)} onOpenDna={() => setAppSubPage('dna')} onOpenTimeline={() => setAppSubPage('timeline')} onOpenPrecheck={() => setAppSubPage('precheck')} onOpenDeltaRescrutiny={() => setAppSubPage('delta-rescrutiny')} onOpenInspectionQueue={() => setAppSubPage('inspection-queue')} onOpenDecision={() => setAppSubPage('decision-workspace')} onOpenCompliance={() => setAppSubPage('compliance-context')} />}
          {appView && appSubPage === 'dna'       && (activeDeptItem === 'dept-queue' || activeDeptItem === 'dept-apps' || activeDeptItem === 'dept-scrutiny') && <M07DnaPage onBackToOverview={() => setAppSubPage('overview')} />}
          {appView && appSubPage === 'timeline'  && (activeDeptItem === 'dept-queue' || activeDeptItem === 'dept-apps' || activeDeptItem === 'dept-scrutiny') && <M08TimelinePage onBackToOverview={() => setAppSubPage('overview')} />}
          {appView && appSubPage === 'precheck'       && (activeDeptItem === 'dept-queue' || activeDeptItem === 'dept-apps' || activeDeptItem === 'dept-scrutiny') && <M09PreCheckPage onBackToOverview={() => setAppSubPage('overview')} onOpenDna={() => setAppSubPage('dna')} onOpenTimeline={() => setAppSubPage('timeline')} onOpenScrutinyRoute={() => setAppSubPage('scrutiny-route')} />}
          {appView && appSubPage === 'scrutiny-route'     && (activeDeptItem === 'dept-queue' || activeDeptItem === 'dept-apps' || activeDeptItem === 'dept-scrutiny') && <M10ScrutinyRoutePage onBackToOverview={() => setAppSubPage('overview')} onBackToPrecheck={() => setAppSubPage('precheck')} onOpenDna={() => setAppSubPage('dna')} onOpenTimeline={() => setAppSubPage('timeline')} onOpenScrutinyWorkbench={() => setAppSubPage('scrutiny-workbench')} onOpenDepView={() => setAppSubPage('dependency-view')} />}
          {appView && appSubPage === 'scrutiny-workbench' && (activeDeptItem === 'dept-queue' || activeDeptItem === 'dept-apps' || activeDeptItem === 'dept-scrutiny') && <M11ScrutinyWorkbenchPage onBack={() => setAppSubPage('scrutiny-route')} onBackToOverview={() => setAppSubPage('overview')} onOpenDna={() => setAppSubPage('dna')} onOpenTimeline={() => setAppSubPage('timeline')} onOpenParamDetail={() => setAppSubPage('param-detail')} onOpenDocReview={() => setAppSubPage('doc-review')} onOpenBldgScrutiny={() => setAppSubPage('bldg-scrutiny')} onOpenWaterScrutiny={() => setAppSubPage('water-scrutiny')} onOpenDepView={() => setAppSubPage('dependency-view')} onOpenQueryBuilder={() => setAppSubPage('query-builder')} />}
          {appView && appSubPage === 'param-detail'       && (activeDeptItem === 'dept-queue' || activeDeptItem === 'dept-apps' || activeDeptItem === 'dept-scrutiny') && <M12ParameterDetailPage onBack={() => setAppSubPage('scrutiny-workbench')} onBackToOverview={() => setAppSubPage('overview')} onOpenDna={() => setAppSubPage('dna')} onOpenDocReview={() => setAppSubPage('doc-review')} onOpenDepView={() => setAppSubPage('dependency-view')} />}
          {appView && appSubPage === 'doc-review'         && (activeDeptItem === 'dept-queue' || activeDeptItem === 'dept-apps' || activeDeptItem === 'dept-scrutiny') && <M13DocumentReviewPage onBack={() => setAppSubPage('scrutiny-workbench')} onOpenParamDetail={() => setAppSubPage('param-detail')} />}
          {appView && appSubPage === 'bldg-scrutiny'     && (activeDeptItem === 'dept-queue' || activeDeptItem === 'dept-apps' || activeDeptItem === 'dept-scrutiny') && <M14BuildingScrutinyPage onBack={() => setAppSubPage('scrutiny-workbench')} onBackToOverview={() => setAppSubPage('overview')} onOpenParamDetail={() => setAppSubPage('param-detail')} onOpenDocReview={() => setAppSubPage('doc-review')} onOpenConsistency={() => setAppSubPage('consistency')} onOpenDepView={() => setAppSubPage('dependency-view')} />}
          {appView && appSubPage === 'water-scrutiny'    && (activeDeptItem === 'dept-queue' || activeDeptItem === 'dept-apps' || activeDeptItem === 'dept-scrutiny') && <M15WaterScrutinyPage onBack={() => setAppSubPage('scrutiny-workbench')} onBackToOverview={() => setAppSubPage('overview')} onOpenParamDetail={() => setAppSubPage('param-detail')} onOpenDocReview={() => setAppSubPage('doc-review')} onOpenConsistency={() => setAppSubPage('consistency')} onOpenDepView={() => setAppSubPage('dependency-view')} />}
          {appView && appSubPage === 'consistency'       && (activeDeptItem === 'dept-queue' || activeDeptItem === 'dept-apps' || activeDeptItem === 'dept-scrutiny') && <M16ConsistencyPage onBack={() => setAppSubPage('scrutiny-workbench')} onBackToOverview={() => setAppSubPage('overview')} onOpenParamDetail={() => setAppSubPage('param-detail')} onOpenDocReview={() => setAppSubPage('doc-review')} />}
          {appView && appSubPage === 'dependency-view'   && (activeDeptItem === 'dept-queue' || activeDeptItem === 'dept-apps' || activeDeptItem === 'dept-scrutiny') && <M17DependencyViewPage onBack={() => setAppSubPage('scrutiny-workbench')} onBackToOverview={() => setAppSubPage('overview')} />}
          {appView && appSubPage === 'query-builder'    && (activeDeptItem === 'dept-queue' || activeDeptItem === 'dept-apps' || activeDeptItem === 'dept-scrutiny') && <M18QueryBuilderPage onBack={() => setAppSubPage('scrutiny-workbench')} onBackToOverview={() => setAppSubPage('overview')} onOpenQueryHistory={() => setAppSubPage('query-history')} />}
          {appView && appSubPage === 'query-history'    && (activeDeptItem === 'dept-queue' || activeDeptItem === 'dept-apps' || activeDeptItem === 'dept-scrutiny') && <M19QueryHistoryPage onBack={() => setAppSubPage('query-builder')} onBackToOverview={() => setAppSubPage('overview')} onOpenQueryBuilder={() => setAppSubPage('query-builder')} />}
          {appView && appSubPage === 'delta-rescrutiny' && (activeDeptItem === 'dept-queue' || activeDeptItem === 'dept-apps' || activeDeptItem === 'dept-scrutiny') && <M20DeltaRescrutinyPage onBackToOverview={() => setAppSubPage('overview')} onOpenDna={() => setAppSubPage('dna')} onOpenDocReview={() => setAppSubPage('doc-review')} onOpenConsistency={() => setAppSubPage('consistency')} onOpenDepView={() => setAppSubPage('dependency-view')} onOpenQueryBuilder={() => setAppSubPage('query-builder')} onOpenQueryHistory={() => setAppSubPage('query-history')} onOpenTimeline={() => setAppSubPage('timeline')} />}
          {appView && appSubPage === 'inspection-queue' && (activeDeptItem === 'dept-queue' || activeDeptItem === 'dept-apps' || activeDeptItem === 'dept-scrutiny') && <M21InspectionQueuePage onBack={() => setAppSubPage('overview')} onPlanInspection={id => { setInspPlanId(id); setAppSubPage('inspection-planning') }} onOpenDepView={() => setAppSubPage('dependency-view')} onOpenQueryHistory={() => setAppSubPage('query-history')} onOpenDelta={() => setAppSubPage('delta-rescrutiny')} />}
          {appView && appSubPage === 'inspection-planning' && (activeDeptItem === 'dept-queue' || activeDeptItem === 'dept-apps' || activeDeptItem === 'dept-scrutiny') && <M22InspectionPlanningPage onBack={() => setAppSubPage('inspection-queue')} onBackToQueue={() => setAppSubPage('inspection-queue')} onOpenDna={() => setAppSubPage('dna')} onOpenDocReview={() => setAppSubPage('doc-review')} onOpenDepView={() => setAppSubPage('dependency-view')} onOpenDelta={() => setAppSubPage('delta-rescrutiny')} onOpenQueryHistory={() => setAppSubPage('query-history')} onOpenWorkspace={() => setAppSubPage('inspection-workspace')} />}
          {appView && appSubPage === 'inspection-workspace' && (activeDeptItem === 'dept-queue' || activeDeptItem === 'dept-apps' || activeDeptItem === 'dept-insp-queue' || activeDeptItem === 'dept-scrutiny') && <M23InspectionWorkspacePage onBack={() => setAppSubPage('inspection-planning')} onBackToQueue={() => setAppSubPage('inspection-queue')} onOpenM24={() => setAppSubPage('observation-reinspection')} onOpenDocReview={() => setAppSubPage('doc-review')} onOpenDna={() => setAppSubPage('dna')} onOpenDepView={() => setAppSubPage('dependency-view')} onOpenQueryHistory={() => setAppSubPage('query-history')} onOpenDelta={() => setAppSubPage('delta-rescrutiny')} onOpenConsistency={() => setAppSubPage('consistency')} />}
          {appView && appSubPage === 'observation-reinspection' && (activeDeptItem === 'dept-queue' || activeDeptItem === 'dept-apps' || activeDeptItem === 'dept-insp-queue' || activeDeptItem === 'dept-scrutiny') && <M24ObservationReinspectionPage onBack={() => setAppSubPage('inspection-queue')} onBackToM23={() => setAppSubPage('inspection-workspace')} onOpenM22={() => setAppSubPage('inspection-planning')} onOpenDocReview={() => setAppSubPage('doc-review')} onOpenQueryHistory={() => setAppSubPage('query-history')} onOpenDelta={() => setAppSubPage('delta-rescrutiny')} onOpenDepView={() => setAppSubPage('dependency-view')} />}
          {activeDeptItem === 'dept-decisions' && !appView && <DecisionsDashboard onOpenApp={() => { setAppView(true); setAppSubPage('decision-workspace') }} onOpenCompliance={() => { setAppView(true); setAppSubPage('compliance-context') }} onOpenDependencyUpdate={() => { setAppView(true); setAppSubPage('dependency-update') }} />}
          {appView && appSubPage === 'decision-workspace' && (activeDeptItem === 'dept-queue' || activeDeptItem === 'dept-apps' || activeDeptItem === 'dept-scrutiny' || activeDeptItem === 'dept-decisions') && <M25DecisionWorkspacePage onBack={() => setAppSubPage('overview')} onOpenDocReview={() => setAppSubPage('doc-review')} onOpenConsistency={() => setAppSubPage('consistency')} onOpenDna={() => setAppSubPage('dna')} onOpenDepView={() => setAppSubPage('dependency-view')} onOpenQueryHistory={() => setAppSubPage('query-history')} onOpenDelta={() => setAppSubPage('delta-rescrutiny')} onOpenInspection={() => setAppSubPage('inspection-workspace')} onOpenM24={() => setAppSubPage('observation-reinspection')} onOpenScrutiny={() => setAppSubPage('scrutiny-workbench')} onRecordDecision={() => setAppSubPage('decision-record')} />}
          {appView && appSubPage === 'decision-record' && (activeDeptItem === 'dept-queue' || activeDeptItem === 'dept-apps' || activeDeptItem === 'dept-scrutiny' || activeDeptItem === 'dept-decisions') && <M26DecisionRecordPage onBack={() => setAppSubPage('decision-workspace')} onBackToOverview={() => setAppSubPage('overview')} onOpenDepView={() => setAppSubPage('dependency-update')} onOpenDna={() => setAppSubPage('dna')} />}
          {appView && appSubPage === 'dependency-update' && (activeDeptItem === 'dept-queue' || activeDeptItem === 'dept-apps' || activeDeptItem === 'dept-scrutiny' || activeDeptItem === 'dept-decisions') && <M27DependencyUpdatePage onBack={() => setAppSubPage('overview')} onOpenM26={() => setAppSubPage('decision-record')} onOpenM25={() => setAppSubPage('decision-workspace')} onOpenDepView={() => setAppSubPage('dependency-view')} onOpenQueryHistory={() => setAppSubPage('query-history')} onOpenDelta={() => setAppSubPage('delta-rescrutiny')} onOpenM28={() => setAppSubPage('compliance-context')} />}
          {appView && appSubPage === 'compliance-context' && (activeDeptItem === 'dept-queue' || activeDeptItem === 'dept-apps' || activeDeptItem === 'dept-scrutiny' || activeDeptItem === 'dept-decisions') && <M28CompliancePage onBack={() => setAppSubPage('overview')} onOpenM26={() => setAppSubPage('decision-record')} onOpenM27={() => setAppSubPage('dependency-update')} onOpenM29={() => setAppSubPage('amendment-intake')} onOpenInspection={() => setAppSubPage('inspection-workspace')} onOpenDepView={() => setAppSubPage('dependency-view')} onOpenDocReview={() => setAppSubPage('doc-review')} />}
          {appView && appSubPage === 'amendment-intake' && (activeDeptItem === 'dept-queue' || activeDeptItem === 'dept-apps' || activeDeptItem === 'dept-scrutiny' || activeDeptItem === 'dept-decisions') && <M29AmendmentIntakePage onBack={() => setAppSubPage('overview')} onOpenM28={() => setAppSubPage('compliance-context')} onOpenM26={() => setAppSubPage('decision-record')} onOpenDocReview={() => setAppSubPage('doc-review')} onOpenConsistency={() => setAppSubPage('consistency')} onOpenDepView={() => setAppSubPage('dependency-view')} onOpenDelta={() => setAppSubPage('delta-rescrutiny')} onOpenInspection={() => setAppSubPage('inspection-workspace')} onOpenDna={() => setAppSubPage('dna')} />}
          {activeDeptItem === 'dept-sla' && !appView && <M30SLADashboard onOpenApp={() => { setAppView(true); setAppSubPage('overview') }} onOpenGrievance={() => setActiveDeptItem('dept-grievances')} />}
          {activeDeptItem === 'dept-grievances' && !appView && <M31GrievancePage onBack={() => setActiveDeptItem('dept-home')} onOpenApp={() => { setAppView(true); setAppSubPage('overview') }} onOpenSLA={() => setActiveDeptItem('dept-sla')} onOpenQuery={() => { setAppView(true); setAppSubPage('query-history') }} onOpenInspection={() => setActiveDeptItem('dept-insp-queue')} />}
          {activeDeptItem === 'dept-regasst' && !appView && <M32RegRAGPage onBack={() => setActiveDeptItem('dept-home')} onOpenRegChange={() => setActiveDeptItem('dept-regchng')} />}
          {activeDeptItem === 'dept-regchng' && !appView && <M33RegChangePage onBack={() => setActiveDeptItem('dept-home')} onOpenRAG={() => setActiveDeptItem('dept-regasst')} onOpenImpact={() => setActiveDeptItem('dept-regimpact' as string)} />}
          {activeDeptItem === 'dept-regimpact' && !appView && <M34ImpactPage onBack={() => setActiveDeptItem('dept-regchng')} onOpenApp={() => { setAppView(true); setAppSubPage('overview') }} onOpenRegChange={() => setActiveDeptItem('dept-regchng')} />}
          {activeDeptItem === 'dept-analytics' && !appView && <M35AnalyticsPage onBack={() => setActiveDeptItem('dept-home')} onOpenSLA={() => setActiveDeptItem('dept-sla')} onOpenInspection={() => setActiveDeptItem('dept-insp-queue')} onOpenBottleneck={() => setActiveDeptItem('dept-bottleneck' as string)} />}
          {activeDeptItem === 'dept-bottleneck' && !appView && <M36BottleneckPage onBack={() => setActiveDeptItem('dept-home')} onOpenSLA={() => setActiveDeptItem('dept-sla')} onOpenInspection={() => setActiveDeptItem('dept-insp-queue')} onOpenAnalytics={() => setActiveDeptItem('dept-analytics')} />}
          {activeDeptItem === 'dept-workload' && !appView && <M37WorkloadPage onBack={() => setActiveDeptItem('dept-home')} onOpenSLA={() => setActiveDeptItem('dept-sla')} onOpenInspection={() => setActiveDeptItem('dept-insp-queue')} onOpenAnalytics={() => setActiveDeptItem('dept-analytics')} />}
          {activeDeptItem === 'dept-audit' && !appView && <M38AuditPage onBack={() => setActiveDeptItem('dept-home')} onOpenApp={() => { setAppView(true); setAppSubPage('overview') }} />}
          {!appView && !['dept-home','dept-queue','dept-apps','dept-catalogue','dept-scrutiny','dept-insp-queue','dept-insp-planning','dept-decisions','dept-sla','dept-grievances','dept-regasst','dept-regchng','dept-regimpact','dept-analytics','dept-bottleneck','dept-workload','dept-audit'].includes(activeDeptItem) && (
            <div className="flex-1 bg-[#f8f9fb] flex flex-col items-center justify-center py-20 text-center px-6">
              <div className="w-12 h-12 rounded-full bg-[#f0f4f8] flex items-center justify-center mb-3 text-[#6b7280]">
                <MIcon.Clipboard />
              </div>
              <p className="text-sm font-semibold text-[#1a2533]">{deptSideItems.find(i => i.id === activeDeptItem)?.label}</p>
              <p className="text-xs text-[#374151] mt-1">This module will be designed in a future phase.</p>
            </div>
          )}
        </main>
      </div>

      <M39NotificationDrawer open={notifOpen} onClose={() => setNotifOpen(false)} onNavigate={link => {
        setNotifOpen(false)
        if (link === 'sla') { setAppView(false); setActiveDeptItem('dept-sla') }
        else if (link === 'grievance') { setAppView(false); setActiveDeptItem('dept-grievances') }
        else if (link === 'inspection-queue') { setAppView(false); setActiveDeptItem('dept-insp-queue') }
        else { setAppView(true); setAppSubPage(link as any) }
      }} />

      <Footer />
    </div>
  )
}

// ─── M30 SLA Dashboard ────────────────────────────────────────────────────────


export function M30SLADashboard({ onOpenApp, onOpenGrievance }: { onOpenApp: (applicationId: string) => void; onOpenGrievance: () => void }) {
  const [slaFilter, setSlaFilter] = useState<'all'|'normal'|'approaching'|'breached'>('all')
  const [view, setView] = useState<'applications'|'service'|'desk'>('applications')
  const [selectedApp, setSelectedApp] = useState<typeof M30_SLA_ROWS[0] | null>(null)

  const kpis = {
    total: M30_SLA_ROWS.length,
    normal: M30_SLA_ROWS.filter(r => r.slaStatus === 'normal').length,
    approaching: M30_SLA_ROWS.filter(r => r.slaStatus === 'approaching').length,
    breached: M30_SLA_ROWS.filter(r => r.slaStatus === 'breached').length,
    awaitEnt: M30_SLA_ROWS.filter(r => r.state === 'QUERY_RAISED' || r.state === 'CORRECTION_REQUIRED').length,
    awaitInsp: M30_SLA_ROWS.filter(r => r.state === 'INSPECTION_SCHEDULED' || r.state === 'INSPECTION_PENDING').length,
  }
  const filtered = slaFilter === 'all' ? M30_SLA_ROWS : M30_SLA_ROWS.filter(r => r.slaStatus === slaFilter)

  const slaChip = (s: 'normal'|'approaching'|'breached') =>
    s === 'breached' ? 'bg-red-50 text-red-700 border-red-200' :
    s === 'approaching' ? 'bg-amber-50 text-amber-700 border-amber-200' :
    'bg-emerald-50 text-emerald-700 border-emerald-200'

  const slaLabel = (s: 'normal'|'approaching'|'breached') =>
    s === 'breached' ? 'SLA Exceeded' : s === 'approaching' ? 'Approaching Deadline' : 'Normal'

  return (
    <div className="bg-[#f8f9fb] flex-1 overflow-y-auto">
      <div className="px-6 py-5 space-y-5 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="text-[11px] text-[#374151] flex items-center gap-1">
          <span className="hover:text-[#1a3a5c] cursor-pointer">Department Home</span>
          <span>›</span><span className="hover:text-[#1a3a5c] cursor-pointer">SLA &amp; Escalations</span>
          <span>›</span><span className="text-[#1a3a5c] font-semibold">SLA Dashboard</span>
        </nav>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1a3a5c]">SLA Dashboard — M30</h1>
            <p className="text-sm text-[#1a2533] mt-0.5">Monitor configured service timelines, elapsed processing time, and applications approaching or exceeding SLA.</p>
          </div>
          <div className="flex gap-2">
            <select className="text-xs border border-[#d1d9e0] rounded px-2 py-1.5 bg-white text-[#1a2533]"><option>All Services</option><option>Building / Planning</option><option>Land / Plot</option><option>Water / Utilities</option></select>
            <select className="text-xs border border-[#d1d9e0] rounded px-2 py-1.5 bg-white text-[#1a2533]"><option>All Offices</option><option>Pune</option><option>Nashik</option><option>Nagpur</option></select>
          </div>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-6 gap-3">
          {[
            { label: 'Active Applications', val: kpis.total, color: 'text-[#1a3a5c]', filter: 'all' as const, bg: 'bg-white' },
            { label: 'Normal', val: kpis.normal, color: 'text-emerald-700', filter: 'normal' as const, bg: 'bg-emerald-50' },
            { label: 'Approaching Deadline', val: kpis.approaching, color: 'text-amber-700', filter: 'approaching' as const, bg: 'bg-amber-50' },
            { label: 'SLA Exceeded', val: kpis.breached, color: 'text-red-700', filter: 'breached' as const, bg: 'bg-red-50' },
            { label: 'Awaiting Entrepreneur', val: kpis.awaitEnt, color: 'text-[#1a2533]', filter: 'all' as const, bg: 'bg-white' },
            { label: 'Awaiting Inspection', val: kpis.awaitInsp, color: 'text-[#1a2533]', filter: 'all' as const, bg: 'bg-white' },
          ].map(k => (
            <button key={k.label} onClick={() => setSlaFilter(k.filter)} className={`${k.bg} ${slaFilter === k.filter ? 'ring-2 ring-[#1a56db]' : ''} border border-[#e5eaf0] rounded-lg p-3 text-left hover:border-[#1a56db] transition-colors`}>
              <div className={`text-xl font-bold ${k.color}`}>{k.val}</div>
              <div className="text-[10px] text-[#1a2533] mt-0.5 leading-tight">{k.label}</div>
            </button>
          ))}
        </div>

        {/* Time breakdown */}
        <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
          <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider mb-3">Where Is the Time Being Spent? — MIDC-APP-2026-00418</p>
          <div className="grid grid-cols-6 gap-3">
            {[
              { label: 'MIDC Processing', val: '9d 2h', note: 'Attributed' },
              { label: 'Entrepreneur Response', val: '2d 1h', note: 'Waiting' },
              { label: 'Current Desk', val: '18h', note: 'Active' },
              { label: 'Inspection Wait', val: '12h', note: 'Waiting' },
              { label: 'External Dependency', val: '0h', note: 'N/A' },
              { label: 'Total Elapsed', val: '13d', note: 'Cumulative' },
            ].map(t => (
              <div key={t.label} className="text-center p-2 bg-[#f8f9fb] rounded">
                <div className="text-sm font-bold text-[#1a3a5c]">{t.val}</div>
                <div className="text-[10px] text-[#1a2533] mt-0.5">{t.label}</div>
                <div className="text-[9px] text-[#374151]">{t.note}</div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#374151] mt-2">Note: Clocks may overlap depending on the configured workflow model. Elapsed time is total; attributed times reflect configured clock assignment.</p>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1">
          {(['applications','service','desk'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} className={`text-xs px-3 py-1.5 rounded font-semibold border transition-colors ${view === v ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'bg-white border-[#d1d9e0] text-[#1a2533] hover:border-[#1a3a5c]'}`}>
              {v === 'applications' ? 'Applications' : v === 'service' ? 'Service View' : 'Desk View'}
            </button>
          ))}
        </div>

        {view === 'applications' && (
          <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-[#f8f9fb] border-b border-[#e5eaf0]">
                <tr>
                  {['Application', 'State / Desk', 'Office', 'Elapsed / Configured SLA', 'MIDC', 'Ent.', 'Insp.', 'SLA Status', 'Due', 'Action'].map(h => (
                    <th key={h} className="px-3 py-2.5 text-left font-semibold text-[#1a2533]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={r.id} className={`border-b border-[#f0f4f8] hover:bg-[#f8f9fb] ${i % 2 === 0 ? '' : 'bg-[#fafbfc]'}`}>
                    <td className="px-3 py-2.5">
                      <p className="font-semibold text-[#1a3a5c]">{r.id}</p>
                      <p className="text-[10px] text-[#1a2533] truncate max-w-[160px]">{r.business}</p>
                    </td>
                    <td className="px-3 py-2.5">
                      <p className="font-semibold text-[#1a2533]">{r.state}</p>
                      <p className="text-[10px] text-[#374151]">{r.desk}</p>
                    </td>
                    <td className="px-3 py-2.5 text-[#1a2533]">{r.office}</td>
                    <td className="px-3 py-2.5">
                      <p className="font-semibold">{r.elapsed}</p>
                      <p className="text-[10px] text-[#374151]">Configured SLA: {r.slaTarget}</p>
                    </td>
                    <td className="px-3 py-2.5 text-[#1a2533]">{r.midc}</td>
                    <td className="px-3 py-2.5 text-[#1a2533]">{r.ent}</td>
                    <td className="px-3 py-2.5 text-[#1a2533]">{r.insp}</td>
                    <td className="px-3 py-2.5"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${slaChip(r.slaStatus)}`}>{slaLabel(r.slaStatus)}</span></td>
                    <td className={`px-3 py-2.5 text-[10px] font-semibold ${r.slaStatus === 'breached' ? 'text-red-700' : r.slaStatus === 'approaching' ? 'text-amber-700' : 'text-[#1a2533]'}`}>{r.due}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex gap-1">
                        <button onClick={() => setSelectedApp(r)} className="text-[10px] text-[#1a56db] hover:underline">View</button>
                        {r.slaStatus === 'breached' && <button onClick={onOpenGrievance} className="text-[10px] text-red-700 hover:underline">Escalate</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === 'service' && (
          <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-[#f8f9fb] border-b border-[#e5eaf0]">
                <tr>{['MIDC Service', 'Applications', 'Normal', 'Approaching', 'Exceeded', 'Avg Elapsed', 'Avg MIDC', 'Avg Ent. Response'].map(h => <th key={h} className="px-3 py-2.5 text-left font-semibold text-[#1a2533]">{h}</th>)}</tr>
              </thead>
              <tbody>
                {[
                  { svc: 'Building / Planning', apps: 4, normal: 1, approaching: 2, exc: 1, avgElap: '12d 4h', avgMidc: '7d', avgEnt: '2d 8h' },
                  { svc: 'Land / Plot', apps: 2, normal: 0, approaching: 0, exc: 2, avgElap: '19d', avgMidc: '8d 6h', avgEnt: '7d 2h' },
                  { svc: 'Water / Utilities', apps: 1, normal: 0, approaching: 1, exc: 0, avgElap: '8d', avgMidc: '3d', avgEnt: '4d 12h' },
                ].map(r => (
                  <tr key={r.svc} className="border-b border-[#f0f4f8]">
                    <td className="px-3 py-2.5 font-semibold text-[#1a3a5c]">{r.svc}</td>
                    <td className="px-3 py-2.5 text-[#1a2533]">{r.apps}</td>
                    <td className="px-3 py-2.5 text-emerald-700 font-semibold">{r.normal}</td>
                    <td className="px-3 py-2.5 text-amber-700 font-semibold">{r.approaching}</td>
                    <td className="px-3 py-2.5 text-red-700 font-semibold">{r.exc}</td>
                    <td className="px-3 py-2.5">{r.avgElap}</td>
                    <td className="px-3 py-2.5">{r.avgMidc}</td>
                    <td className="px-3 py-2.5">{r.avgEnt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === 'desk' && (
          <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-[#f8f9fb] border-b border-[#e5eaf0]">
                <tr>{['Desk', 'Queue', 'Normal', 'Approaching', 'Exceeded', 'Avg Desk Time', 'Oldest'].map(h => <th key={h} className="px-3 py-2.5 text-left font-semibold text-[#1a2533]">{h}</th>)}</tr>
              </thead>
              <tbody>
                {[
                  { desk: 'Decision Desk', q: 2, normal: 0, appr: 1, exc: 0, avg: '4d 2h', oldest: '13d' },
                  { desk: 'Planning Desk', q: 2, normal: 1, appr: 1, exc: 0, avg: '3d', oldest: '11d' },
                  { desk: 'Land Desk', q: 2, normal: 0, appr: 0, exc: 2, avg: '8d', oldest: '26d' },
                  { desk: 'Utilities Desk', q: 1, normal: 0, appr: 1, exc: 0, avg: '3d', oldest: '8d' },
                  { desk: 'Inspection Desk', q: 1, normal: 1, appr: 0, exc: 0, avg: '8d', oldest: '15d' },
                ].map(r => (
                  <tr key={r.desk} className="border-b border-[#f0f4f8]">
                    <td className="px-3 py-2.5 font-semibold text-[#1a2533]">{r.desk}</td>
                    <td className="px-3 py-2.5">{r.q}</td>
                    <td className="px-3 py-2.5 text-emerald-700 font-semibold">{r.normal}</td>
                    <td className="px-3 py-2.5 text-amber-700 font-semibold">{r.appr}</td>
                    <td className="px-3 py-2.5 text-red-700 font-semibold">{r.exc}</td>
                    <td className="px-3 py-2.5">{r.avg}</td>
                    <td className="px-3 py-2.5">{r.oldest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Application SLA detail panel */}
        {selectedApp && (
          <div className="bg-white border border-[#e5eaf0] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">SLA Detail — {selectedApp.id}</p>
              <button onClick={() => setSelectedApp(null)} className="text-[10px] text-[#374151] hover:text-[#1a2533]">Close ×</button>
            </div>
            <div className="grid grid-cols-4 gap-3 text-xs">
              <div><span className="text-[#374151]">Business</span><p className="font-semibold text-[#1a2533] truncate">{selectedApp.business}</p></div>
              <div><span className="text-[#374151]">State</span><p className="font-semibold">{selectedApp.state}</p></div>
              <div><span className="text-[#374151]">Received</span><p className="font-semibold">{selectedApp.received}</p></div>
              <div><span className="text-[#374151]">SLA Due</span><p className={`font-semibold ${selectedApp.slaStatus === 'breached' ? 'text-red-700' : 'text-amber-700'}`}>{selectedApp.due}</p></div>
            </div>
            <div className="flex gap-2 pt-1">
              <button onClick={() => onOpenApp(selectedApp.id)} className="text-[11px] bg-[#1a3a5c] text-white px-3 py-1.5 rounded hover:bg-[#0f2540]">Open Application → M06</button>
              {selectedApp.slaStatus === 'breached' && <button onClick={onOpenGrievance} className="text-[11px] bg-red-50 text-red-700 border border-red-200 px-3 py-1.5 rounded hover:bg-red-100">Raise Grievance → M31</button>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── M31 Escalation / Grievance ───────────────────────────────────────────────



export function M31GrievancePage({ onBack, onOpenApp, onOpenSLA, onOpenQuery, onOpenInspection }: {
  onBack: () => void; onOpenApp: (applicationId: string) => void; onOpenSLA: () => void
  onOpenQuery: (applicationId: string) => void; onOpenInspection: (applicationId: string, inspectionId: string) => void
}) {
  const [selectedGrv, setSelectedGrv] = useState<typeof M31_GRIEVANCES[0]>(M31_GRIEVANCES[0])
  const [resolutionText, setResolutionText] = useState('')
  const [resolved, setResolved] = useState(false)

  const statusChip = (s: string) =>
    s === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
    s === 'Escalated' ? 'bg-purple-50 text-purple-700 border-purple-200' :
    'bg-amber-50 text-amber-700 border-amber-200'

  return (
    <div className="bg-[#f8f9fb] flex-1 overflow-y-auto">
      <div className="px-6 py-5 space-y-5 max-w-7xl">
        <nav className="text-[11px] text-[#374151] flex items-center gap-1">
          <span className="hover:text-[#1a3a5c] cursor-pointer" onClick={onBack}>Department Home</span>
          <span>›</span><span className="hover:text-[#1a3a5c] cursor-pointer">SLA &amp; Escalations</span>
          <span>›</span><span className="text-[#1a3a5c] font-semibold">Escalation / Grievance</span>
        </nav>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1a3a5c]">Escalation / Grievance — M31</h1>
            <p className="text-sm text-[#1a2533] mt-0.5">Review escalated issues, evidence, routing, and resolution workflow.</p>
          </div>
          <button onClick={onBack} className="text-xs border border-[#d1d9e0] px-3 py-1.5 rounded text-[#1a2533] hover:bg-white">← Back</button>
        </div>

        <div className="grid grid-cols-12 gap-5">
          {/* Left: grievance list */}
          <div className="col-span-4 space-y-2">
            <p className="text-[10px] font-bold text-[#374151] uppercase tracking-wider mb-2">Active Grievances</p>
            {M31_GRIEVANCES.map(g => (
              <button key={g.id} onClick={() => setSelectedGrv(g)} className={`w-full text-left p-3 rounded-lg border transition-colors ${selectedGrv.id === g.id ? 'bg-white border-[#1a56db] ring-1 ring-[#1a56db]' : 'bg-white border-[#e5eaf0] hover:border-[#1a56db]'}`}>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[11px] font-bold text-[#1a3a5c]">{g.id}</p>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${statusChip(g.status)}`}>{g.status}</span>
                </div>
                <p className="text-[10px] text-[#1a2533] mt-1 truncate">{g.business}</p>
                <p className="text-[10px] text-[#374151]">{g.appId} · {g.reason}</p>
                <p className="text-[9px] text-[#374151] mt-0.5">Raised: {g.raised}</p>
              </button>
            ))}
          </div>

          {/* Right: detail */}
          <div className="col-span-8 space-y-4">
            {/* Header card */}
            <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-[#1a3a5c]">{selectedGrv.id}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${statusChip(selectedGrv.status)}`}>{selectedGrv.status}</span>
                  </div>
                  <p className="text-sm font-semibold text-[#1a2533] mt-1">{selectedGrv.business}</p>
                  <p className="text-xs text-[#1a2533]">{selectedGrv.appId} · MIDC {selectedGrv.service}</p>
                </div>
                <div className="text-right text-xs text-[#374151]">
                  <p>Raised by: {selectedGrv.raisedBy}</p>
                  <p>{selectedGrv.raised}</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3 text-xs pt-3 border-t border-[#f0f4f8]">
                <div><span className="text-[#374151]">Reason</span><p className="font-semibold">{selectedGrv.reason}</p></div>
                <div><span className="text-[#374151]">Assigned Desk</span><p className="font-semibold">{selectedGrv.assignedDesk}</p></div>
                <div><span className="text-[#374151]">Assigned Role</span><p className="font-semibold">{selectedGrv.assignedRole}</p></div>
              </div>
            </div>

            {/* SLA breach context (when relevant) */}
            {selectedGrv.reason === 'SLA Breach' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-xs font-bold text-red-700 uppercase tracking-wider mb-2">SLA Breach Context</p>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div><span className="text-red-600">Configured SLA</span><p className="font-bold text-red-800">{selectedGrv.configuredSla}</p></div>
                  <div><span className="text-red-600">Actual Elapsed</span><p className="font-bold text-red-800">{selectedGrv.actualElapsed}</p></div>
                  <div><span className="text-red-600">SLA Exceeded By</span><p className="font-bold text-red-800">{selectedGrv.slaExceededBy}</p></div>
                </div>
                <button onClick={onOpenSLA} className="mt-2 text-[11px] text-red-700 underline">View SLA Breakdown → M30</button>
              </div>
            )}

            {/* Inspection delay context */}
            {selectedGrv.reason === 'Inspection Delay' && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">Inspection Delay Context</p>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div><span className="text-amber-700">Inspection ID</span><p className="font-bold">INSP-2026-00388</p></div>
                  <div><span className="text-amber-700">Required</span><p className="font-bold">15 Sep 2026</p></div>
                  <div><span className="text-amber-700">Status</span><p className="font-bold text-amber-800">Pending — 8 days</p></div>
                </div>
                <button onClick={() => onOpenInspection(selectedGrv.appId, 'INSP-2026-00388')} className="mt-2 text-[11px] text-amber-700 underline">View Inspection → M21/M22</button>
              </div>
            )}

            {/* Evidence timeline */}
            <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
              <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider mb-3">Application Evidence Timeline</p>
              <div className="space-y-2">
                {M31_TIMELINE.map((ev, i) => {
                  const dot = ev.type === 'breach' ? 'bg-red-500' : ev.type === 'grievance' ? 'bg-purple-500' : ev.type === 'sla' ? 'bg-amber-500' : ev.type === 'query' ? 'bg-blue-400' : 'bg-[#d1d9e0]'
                  return (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="flex flex-col items-center">
                        <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-0.5 ${dot}`} />
                        {i < M31_TIMELINE.length - 1 && <div className="w-px h-5 bg-[#e5eaf0] mt-0.5" />}
                      </div>
                      <div className="text-xs pb-1">
                        <span className="text-[#374151]">{ev.date}</span>
                        <span className="mx-2 text-[#1a2533]">{ev.event}</span>
                        {ev.link && <span className="text-[10px] text-[#1a56db]">→ {ev.link}</span>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Escalation path */}
            <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
              <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider mb-3">Escalation Routing</p>
              <div className="flex items-center gap-3 flex-wrap text-[11px]">
                {[
                  { label: 'Problem Raised', sub: selectedGrv.raisedBy, color: 'bg-[#f8f9fb]' },
                  { label: selectedGrv.assignedDesk, sub: selectedGrv.assignedRole, color: 'bg-amber-50' },
                  { label: selectedGrv.status === 'Escalated' ? 'Nodal Officer' : 'Under Review', sub: selectedGrv.status === 'Escalated' ? 'Configured Level' : 'Assigned Desk', color: selectedGrv.status === 'Escalated' ? 'bg-purple-50' : 'bg-[#f8f9fb]' },
                  { label: selectedGrv.status === 'Resolved' ? 'Resolved' : 'Resolution Pending', sub: '', color: selectedGrv.status === 'Resolved' ? 'bg-emerald-50' : 'bg-[#f8f9fb]' },
                ].map((step, i, arr) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`${step.color} border border-[#e5eaf0] rounded px-3 py-2 text-center min-w-[110px]`}>
                      <p className="font-semibold text-[#1a2533]">{step.label}</p>
                      {step.sub && <p className="text-[9px] text-[#374151]">{step.sub}</p>}
                    </div>
                    {i < arr.length - 1 && <span className="text-[#374151]">→</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Resolution workspace */}
            {selectedGrv.status !== 'Resolved' && (
              <div className="bg-white border border-[#e5eaf0] rounded-lg p-4 space-y-3">
                <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Resolution Workspace</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[#374151] block mb-1">Resolution Type</label>
                    <select className="w-full border border-[#d1d9e0] rounded px-2 py-1.5 text-xs bg-white"><option>Select type</option><option>SLA Context Acknowledged</option><option>Application Action Taken</option><option>Query Resolved</option><option>Inspection Rescheduled</option></select>
                  </div>
                  <div>
                    <label className="text-[#374151] block mb-1">Related Application Action</label>
                    <select className="w-full border border-[#d1d9e0] rounded px-2 py-1.5 text-xs bg-white"><option>No change to application</option><option>Query Resolved</option><option>SLA context updated</option><option>Inspection status updated</option></select>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-[#374151] block mb-1">Resolution Explanation</label>
                  <textarea value={resolutionText} onChange={e => setResolutionText(e.target.value)} rows={3} placeholder="Enter resolution explanation and action taken..." className="w-full border border-[#d1d9e0] rounded px-2 py-1.5 text-xs resize-none focus:outline-none focus:ring-1 focus:ring-[#1a56db]" />
                </div>
                <div className="flex gap-2 pt-1">
                  <button onClick={() => setResolved(true)} disabled={!resolutionText} className="text-xs bg-emerald-700 text-white px-4 py-2 rounded font-semibold hover:bg-emerald-800 disabled:opacity-40">Record Resolution</button>
                  <button className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-4 py-2 rounded font-semibold hover:bg-purple-100">Escalate Further</button>
                  <button onClick={() => onOpenApp(selectedGrv.appId)} className="text-xs border border-[#d1d9e0] px-3 py-2 rounded text-[#1a2533] hover:bg-[#f8f9fb]">Open Application → M06</button>
                </div>
                {resolved && <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-3 py-2 font-semibold">Resolution recorded. Grievance marked as Resolved. Application journey is unchanged unless a configured action was selected.</div>}
              </div>
            )}

            {selectedGrv.status === 'Resolved' && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Resolved</p>
                <p className="text-xs text-emerald-800">This grievance has been resolved. The complete resolution timeline is preserved in the audit record.</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => onOpenApp(selectedGrv.appId)} className="text-[11px] text-[#1a56db] underline">Open Application → M06</button>
                  <button onClick={() => onOpenQuery(selectedGrv.appId)} className="text-[11px] text-[#1a56db] underline">View Query History → M19</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── M39 Notification Drawer ──────────────────────────────────────────────────


export function M39NotificationDrawer({ open, onClose, onNavigate }: {
  open: boolean
  onClose: () => void
  onNavigate: (link: typeof M39_NOTIFICATIONS[0]['link'], applicationId: string) => void
}) {
  const [filter, setFilter] = useState<'all'|'unread'|'sla'|'grievances'|'applications'|'inspections'>('all')
  const [notifications, setNotifications] = useState(M39_NOTIFICATIONS)

  const unreadCount = notifications.filter(n => !n.read).length
  const filtered = notifications.filter(n => {
    if (filter === 'unread') return !n.read
    if (filter === 'sla') return n.cat === 'SLA Risk'
    if (filter === 'grievances') return n.cat === 'Grievance'
    if (filter === 'applications') return ['Resubmission', 'Query Response', 'Business DNA Change', 'Decision Pending'].includes(n.cat)
    if (filter === 'inspections') return n.cat === 'Inspection Due'
    return true
  })

  const markRead = (id: string) => setNotifications(ns => ns.map(n => n.id === id ? { ...n, read: true } : n))
  const markAllRead = () => setNotifications(ns => ns.map(n => ({ ...n, read: true })))

  const catColor = (cat: string) => {
    if (cat === 'SLA Risk' || cat === 'Grievance') return 'bg-red-50 text-red-700'
    if (cat === 'Decision Pending') return 'bg-amber-50 text-amber-700'
    if (cat === 'Resubmission') return 'bg-blue-50 text-blue-700'
    if (cat === 'Inspection Due') return 'bg-purple-50 text-purple-700'
    if (cat === 'Query Response') return 'bg-[#f0f4f8] text-[#1a2533]'
    return 'bg-[#f0f4f8] text-[#1a2533]'
  }

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed top-14 right-4 z-50 w-[420px] max-h-[80vh] bg-white border border-[#d1d9e0] rounded-xl shadow-xl flex flex-col" style={{boxShadow:'0 8px 32px rgba(26,58,92,0.15)'}}>
        {/* Header */}
        <div className="px-4 py-3 border-b border-[#e5eaf0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-[#1a3a5c]">Notifications</p>
            {unreadCount > 0 && <span className="text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full">{unreadCount}</span>}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={markAllRead} className="text-[10px] text-[#1a2533] hover:text-[#1a3a5c]">Mark all read</button>
            <button onClick={onClose} className="text-[#374151] hover:text-[#1a2533] text-lg leading-none">×</button>
          </div>
        </div>
        {/* Filter tabs */}
        <div className="px-4 py-2 border-b border-[#f0f4f8] flex gap-1 flex-wrap">
          {(['all','unread','applications','sla','grievances','inspections'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`text-[10px] px-2 py-1 rounded font-semibold transition-colors ${filter === f ? 'bg-[#1a3a5c] text-white' : 'bg-[#f0f4f8] text-[#1a2533] hover:bg-[#e5eaf0]'}`}>
              {f === 'all' ? 'All' : f === 'unread' ? `Unread (${unreadCount})` : f === 'applications' ? 'Applications' : f === 'sla' ? 'SLA' : f === 'grievances' ? 'Grievances' : 'Inspections'}
            </button>
          ))}
        </div>
        {/* List */}
        <div className="overflow-y-auto flex-1 divide-y divide-[#94a3b8]">
          {filtered.length === 0 && <div className="px-4 py-8 text-center text-xs text-[#374151]">No notifications in this category.</div>}
          {filtered.map(n => (
            <div key={n.id} className={`px-4 py-3 ${!n.read ? 'bg-[#f8fbff]' : ''} hover:bg-[#f8f9fb] transition-colors`}>
              <div className="flex items-start gap-2">
                {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-[#1a56db] mt-1.5 flex-shrink-0" />}
                {n.read && <div className="w-1.5 h-1.5 flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${catColor(n.cat)}`}>{n.cat}</span>
                    <span className="text-[10px] text-[#374151]">{n.when}</span>
                    {n.urgent && <span className="text-[9px] font-bold text-red-600">URGENT</span>}
                  </div>
                  <p className="text-xs font-semibold text-[#1a2533]">{n.what}</p>
                  <p className="text-[10px] text-[#1a2533] mt-0.5">{n.why}</p>
                  <p className="text-[10px] text-[#1a2533] mt-0.5 italic">{n.action}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] text-[#1a3a5c] font-semibold">{n.appId}</span>
                    <button onClick={() => { markRead(n.id); onNavigate(n.link, n.appId) }} className="text-[10px] bg-[#1a3a5c] text-white px-2 py-0.5 rounded hover:bg-[#0f2540]">Open →</button>
                    {!n.read && <button onClick={() => markRead(n.id)} className="text-[10px] text-[#374151] hover:text-[#1a2533]">Mark read</button>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-2 border-t border-[#f0f4f8] text-center">
          <p className="text-[9px] text-[#374151]">Notifications are entry points to existing workflows. The underlying application record remains authoritative.</p>
        </div>
      </div>
    </>
  )
}

// ─── M32 Officer Regulatory RAG ──────────────────────────────────────────────




export function M32RegRAGPage({ onBack, onOpenRegChange }: { onBack: () => void; onOpenRegChange?: () => void }) {
  const [conversation, setConversation] = useState(M32_CONVERSATION)
  const [input, setInput] = useState('')
  const [lang, setLang] = useState<'en'|'mr'>('en')
  const [selectedSrc, setSelectedSrc] = useState<typeof M32_SOURCES[0]>(M32_SOURCES[0])

  const addMessage = (text: string) => {
    setInput('')
    const ragReply = { role: 'rag' as const, text: `Source-backed response for: "${text}". The configured MIDC regulatory repository has been searched. Where a specific clause is not configured in the prototype, the relevant source type and version reference is shown below.`, source: 'SRC-001', clause: 'Clause 4.3 — MIDC Building Regulations 2019', version: 'MIDC-RULE-2026-V3', retrieval: 'Source Found' as const }
    setConversation(c => [...c, { role: 'officer', text, chip: false }, ragReply])
  }

  const retrievalColor = (r: string) =>
    r === 'Source Found' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' :
    r === 'Multiple Sources Found' ? 'text-blue-700 bg-blue-50 border-blue-200' :
    r === 'Needs Regulatory Review' ? 'text-amber-700 bg-amber-50 border-amber-200' :
    'text-[#374151] bg-[#f8f9fb] border-[#e5eaf0]'

  return (
    <div className="bg-[#f8f9fb] flex-1 overflow-hidden flex flex-col">
      {/* Breadcrumb + header */}
      <div className="px-6 py-4 border-b border-[#e5eaf0] bg-white">
        <nav className="text-[11px] text-[#374151] flex items-center gap-1 mb-2">
          <span className="hover:text-[#1a3a5c] cursor-pointer" onClick={onBack}>Department Home</span>
          <span>›</span><span className="text-[#1a3a5c] font-semibold">Regulatory Assistant — M32</span>
        </nav>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-[#1a3a5c]">Officer Regulatory Assistant</h1>
            <p className="text-xs text-[#1a2533]">Retrieve and explain source-backed regulatory requirements for the current MIDC review.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-[#f0f4f8] rounded p-0.5">
              {(['en','mr'] as const).map(l => <button key={l} onClick={() => setLang(l)} className={`text-xs px-2.5 py-1 rounded font-semibold transition-colors ${lang === l ? 'bg-white text-[#1a3a5c] shadow-sm' : 'text-[#1a2533]'}`}>{l === 'en' ? 'English' : 'मराठी'}</button>)}
            </div>
            <button onClick={onBack} className="text-xs border border-[#d1d9e0] px-3 py-1.5 rounded text-[#1a2533] hover:bg-white">← Back</button>
          </div>
        </div>
        {/* Application context */}
        <div className="mt-3 flex items-center gap-3 text-[11px] bg-[#eff6ff] border border-[#bfdbfe] rounded px-3 py-2">
          <span className="text-[#1a56db] font-semibold">Using application context</span>
          <span className="text-[#1a2533]">MIDC-APP-2026-00418</span>
          <span className="text-[#374151]">·</span>
          <span className="text-[#1a2533]">Aster Precision Components</span>
          <span className="text-[#374151]">·</span>
          <span className="text-[#1a2533]">Building / Planning</span>
          <span className="text-[#374151]">·</span>
          <span className="text-[#1a2533]">Built-up Area</span>
          <span className="text-[#374151]">·</span>
          <span className="text-[#1a2533]">Business DNA v7</span>
        </div>
      </div>

      {/* Two-column body */}
      <div className="flex-1 overflow-hidden flex">
        {/* LEFT: conversation */}
        <div className="flex-1 flex flex-col overflow-hidden border-r border-[#e5eaf0]">
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {M32_CHIPS.map(c => (
                <button key={c} onClick={() => addMessage(c)} className="text-[11px] border border-[#d1d9e0] bg-white px-2.5 py-1 rounded-full text-[#1a2533] hover:border-[#1a56db] hover:text-[#1a56db] transition-colors">{c}</button>
              ))}
            </div>
            {/* Messages */}
            {conversation.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'officer' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-lg px-3 py-2 text-xs ${msg.role === 'officer' ? 'bg-[#1a3a5c] text-white' : 'bg-white border border-[#e5eaf0] text-[#1a2533]'}`}>
                  {msg.role === 'rag' && <div className="flex items-center gap-2 mb-1.5"><span className="text-[9px] font-bold text-[#374151] uppercase tracking-wider">Regulatory Assistant</span>{'retrieval' in msg && <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${retrievalColor((msg as any).retrieval)}`}>{(msg as any).retrieval}</span>}</div>}
                  <p className="leading-relaxed">{lang === 'mr' && msg.role === 'rag' ? `[मराठी] ${msg.text.substring(0, 60)}...` : msg.text}</p>
                  {msg.role === 'rag' && 'source' in msg && (
                    <div className="mt-2 pt-2 border-t border-[#f0f4f8] space-y-0.5">
                      <p className="text-[10px] text-[#374151]"><span className="font-semibold">Source:</span> {(msg as any).source && M32_SOURCES.find(s => s.id === (msg as any).source)?.title}</p>
                      <p className="text-[10px] text-[#374151]"><span className="font-semibold">Clause:</span> {(msg as any).clause}</p>
                      <p className="text-[10px] text-[#374151]"><span className="font-semibold">Rule Version:</span> {(msg as any).version}</p>
                      <button onClick={() => { const s = M32_SOURCES.find(src => src.id === (msg as any).source); if (s) setSelectedSrc(s) }} className="text-[10px] text-[#1a56db] hover:underline mt-0.5">View Source →</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Input */}
          <div className="px-4 py-3 border-t border-[#e5eaf0] bg-white flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && input.trim() && addMessage(input.trim())} placeholder="Ask a regulatory question about this application or parameter..." className="flex-1 text-xs border border-[#d1d9e0] rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#1a56db]" />
            <button onClick={() => input.trim() && addMessage(input.trim())} disabled={!input.trim()} className="text-xs bg-[#1a3a5c] text-white px-4 py-2 rounded hover:bg-[#0f2540] disabled:opacity-40">Ask</button>
          </div>
        </div>

        {/* RIGHT: source panel */}
        <div className="w-80 flex-shrink-0 overflow-y-auto bg-white px-4 py-4 space-y-4">
          <p className="text-[10px] font-bold text-[#374151] uppercase tracking-wider">Regulatory Sources</p>
          <div className="space-y-2">
            {M32_SOURCES.map(s => (
              <button key={s.id} onClick={() => setSelectedSrc(s)} className={`w-full text-left p-3 rounded-lg border text-xs transition-colors ${selectedSrc.id === s.id ? 'border-[#1a56db] bg-[#eff6ff]' : 'border-[#e5eaf0] hover:border-[#1a56db]'}`}>
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-[#1a2533] leading-tight">{s.title}</p>
                  <span className="text-[9px] font-bold bg-[#f0f4f8] text-[#1a2533] px-1.5 py-0.5 rounded flex-shrink-0">{s.type}</span>
                </div>
                <p className="text-[10px] text-[#374151] mt-1">{s.version} · {s.status}</p>
              </button>
            ))}
          </div>
          {selectedSrc && (
            <div className="border border-[#e5eaf0] rounded-lg p-3 space-y-2 text-xs">
              <p className="font-bold text-[#1a3a5c]">{selectedSrc.title}</p>
              {[
                ['Type', selectedSrc.type], ['Authority', selectedSrc.authority],
                ['Effective', selectedSrc.effective], ['Section', selectedSrc.section],
                ['Clause', selectedSrc.clause], ['Version', selectedSrc.version], ['Status', selectedSrc.status],
              ].map(([k, v]) => <div key={k} className="flex justify-between"><span className="text-[#374151]">{k}</span><span className="font-semibold text-right max-w-[160px]">{v}</span></div>)}
              <div className="pt-2 space-y-1">
                <button onClick={onOpenRegChange} className="w-full text-[10px] text-[#1a56db] underline text-left">View in Regulatory Change Centre → M33</button>
              </div>
            </div>
          )}
          <div className="text-[9px] text-[#374151] border-t border-[#f0f4f8] pt-3">The Regulatory Assistant retrieves and explains source-backed material. It does not make statutory decisions. The authorised officer is responsible for all regulatory determinations.</div>
        </div>
      </div>
    </div>
  )
}

// ─── M33 Regulatory Change Centre ────────────────────────────────────────────


export function M33RegChangePage({ onBack, onOpenRAG, onOpenImpact }: { onBack: () => void; onOpenRAG?: () => void; onOpenImpact?: () => void }) {
  const [selected, setSelected] = useState<typeof M33_CHANGES[0]>(M33_CHANGES[0])
  const [view, setView] = useState<'queue'|'detail'|'compare'>('queue')

  const statusChip = (s: string) =>
    s === 'Published' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
    s === 'Under Review' ? 'bg-amber-50 text-amber-700 border-amber-200' :
    s === 'Impact Analysis' ? 'bg-blue-50 text-blue-700 border-blue-200' :
    s === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' :
    'bg-[#f8f9fb] text-[#1a2533] border-[#e5eaf0]'

  return (
    <div className="bg-[#f8f9fb] flex-1 overflow-y-auto">
      <div className="px-6 py-5 space-y-5 max-w-6xl">
        <nav className="text-[11px] text-[#374151] flex items-center gap-1">
          <span className="cursor-pointer hover:text-[#1a3a5c]" onClick={onBack}>Department Home</span>
          <span>›</span><span className="text-[#1a3a5c] font-semibold">Regulatory Change Centre — M33</span>
        </nav>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1a3a5c]">Regulatory Change Centre</h1>
            <p className="text-sm text-[#1a2533] mt-0.5">Review, validate and publish versioned regulatory changes within authorised permissions.</p>
          </div>
          <div className="flex gap-2">
            <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded font-semibold">Regulatory Admin required to Confirm / Publish</span>
          </div>
        </div>

        {/* View tabs */}
        <div className="flex gap-1">
          {(['queue','detail','compare'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} className={`text-xs px-3 py-1.5 rounded font-semibold border transition-colors ${view === v ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'bg-white border-[#d1d9e0] text-[#1a2533] hover:border-[#1a3a5c]'}`}>
              {v === 'queue' ? 'Change Queue' : v === 'detail' ? 'Change Detail' : 'Version Compare'}
            </button>
          ))}
        </div>

        {view === 'queue' && (
          <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-[#f8f9fb] border-b border-[#e5eaf0]">
                <tr>{['Change ID', 'Source / Type', 'Detected', 'Requirement / Service', 'Validation Status', 'Version', 'Action'].map(h => <th key={h} className="px-3 py-2.5 text-left font-semibold text-[#1a2533]">{h}</th>)}</tr>
              </thead>
              <tbody>
                {M33_CHANGES.map(c => (
                  <tr key={c.id} className={`border-b border-[#f0f4f8] hover:bg-[#f8f9fb] ${selected.id === c.id ? 'bg-[#f0f7ff]' : ''}`}>
                    <td className="px-3 py-2.5 font-semibold text-[#1a3a5c]">{c.id}</td>
                    <td className="px-3 py-2.5"><p>{c.source}</p><span className="text-[9px] bg-[#f0f4f8] text-[#1a2533] px-1 py-0.5 rounded">{c.type}</span></td>
                    <td className="px-3 py-2.5 text-[#1a2533]">{c.detected}</td>
                    <td className="px-3 py-2.5"><p className="font-semibold">{c.requirement}</p><p className="text-[10px] text-[#374151]">{c.service}</p></td>
                    <td className="px-3 py-2.5"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${statusChip(c.validation)}`}>{c.validation}</span></td>
                    <td className="px-3 py-2.5 text-[#1a2533]">{c.currentVer} → {c.proposedVer}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex gap-1">
                        <button onClick={() => { setSelected(c); setView('detail') }} className="text-[10px] text-[#1a56db] hover:underline">Detail</button>
                        <button onClick={() => { setSelected(c); setView('compare') }} className="text-[10px] text-[#1a2533] hover:underline">Compare</button>
                        {c.validation === 'Impact Analysis' && <button onClick={onOpenImpact} className="text-[10px] text-blue-700 hover:underline">Impact → M34</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === 'detail' && (
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-4">
              <div className="bg-white border border-[#e5eaf0] rounded-lg p-4 space-y-3 text-xs">
                <div className="flex items-center gap-2"><p className="font-bold text-[#1a3a5c]">{selected.id}</p><span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${statusChip(selected.validation)}`}>{selected.validation}</span></div>
                {[['Source', selected.source], ['Document Type', selected.type], ['Detected', selected.detected], ['Requirement', selected.requirement], ['Service', selected.service], ['Potential Impact', selected.impact], ['Current Version', selected.currentVer], ['Proposed Version', selected.proposedVer], ['Assigned', selected.admin]].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-[#f0f4f8] pb-2"><span className="text-[#374151]">{k}</span><span className="font-semibold">{v}</span></div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs">
                <p className="text-xs font-bold text-amber-700 mb-2">Permission Gate</p>
                <p className="text-amber-800">Confirm, Edit, Reject and Publish actions require Regulatory Admin permission. Officers may view and search published regulatory references.</p>
                <div className="flex gap-2 mt-3">
                  <button className="text-[11px] border border-[#d1d9e0] bg-white text-[#374151] px-3 py-1.5 rounded cursor-not-allowed">Confirm (Requires Admin)</button>
                  <button className="text-[11px] border border-[#d1d9e0] bg-white text-[#374151] px-3 py-1.5 rounded cursor-not-allowed">Publish (Requires Admin)</button>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white border border-[#e5eaf0] rounded-lg p-4 text-xs">
                <p className="font-bold text-[#1a3a5c] mb-3">Version History</p>
                {['MIDC-RULE-2024-V1', 'MIDC-RULE-2025-V2', selected.currentVer].map((v, i) => (
                  <div key={v} className="flex gap-3 items-start mb-3">
                    <div className="flex flex-col items-center"><div className={`w-2.5 h-2.5 rounded-full ${i === 2 ? 'bg-[#1a3a5c]' : 'bg-[#d1d9e0]'}`} />{i < 2 && <div className="w-px h-6 bg-[#e5eaf0]" />}</div>
                    <div><p className={`font-semibold ${i === 2 ? 'text-[#1a3a5c]' : 'text-[#1a2533]'}`}>{v}</p><p className="text-[10px] text-[#374151]">{i === 0 ? 'Original — 01 Apr 2024' : i === 1 ? 'Updated — 01 Apr 2025' : 'Current — 01 Apr 2026'}</p></div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={onOpenRAG} className="text-xs border border-[#d1d9e0] bg-white px-3 py-1.5 rounded text-[#1a2533] hover:bg-[#f8f9fb]">Ask RAG → M32</button>
                <button onClick={onOpenImpact} className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded hover:bg-blue-100">Impact Analysis → M34</button>
              </div>
            </div>
          </div>
        )}

        {view === 'compare' && (
          <div className="grid grid-cols-2 gap-4">
            {[{ label: 'Previous Version', ver: selected.currentVer, bg: 'bg-red-50' }, { label: 'Proposed Version', ver: selected.proposedVer, bg: 'bg-emerald-50' }].map(({ label, ver, bg }) => (
              <div key={ver} className={`${bg} border border-[#e5eaf0] rounded-lg p-4 text-xs space-y-2`}>
                <p className="font-bold text-[#1a3a5c]">{label} — {ver}</p>
                <div className="bg-white rounded p-3 space-y-2 border border-[#e5eaf0]">
                  <div><span className="text-[#374151]">Requirement:</span> <span className="font-semibold">{selected.requirement}</span></div>
                  <div><span className="text-[#374151]">Calculation method:</span> <span>{label === 'Previous Version' ? 'Gross area as per submitted plan' : 'Net usable area — updated methodology'}</span>{label === 'Proposed Version' && <span className="ml-1 text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1 rounded">CHANGED</span>}</div>
                  <div><span className="text-[#374151]">Evidence required:</span> <span>{label === 'Previous Version' ? 'Building Plan (v1)' : 'Building Plan (v1) + Architect Certificate'}</span>{label === 'Proposed Version' && <span className="ml-1 text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1 rounded">ADDED</span>}</div>
                  <div><span className="text-[#374151]">Effective:</span> <span>{label === 'Previous Version' ? '01 Apr 2026' : '01 Oct 2026 (Proposed)'}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── M34 Regulatory Impact Analysis ──────────────────────────────────────────


export function M34ImpactPage({ onBack, onOpenApp, onOpenRegChange }: { onBack: () => void; onOpenApp?: (applicationId: string) => void; onOpenRegChange?: () => void }) {
  const [activeTab, setActiveTab] = useState<'Applications'|'Documents'|'Compliance'|'Journeys'>('Applications')

  const impactChip = (s: string) =>
    s === 'Review Required' ? 'bg-amber-50 text-amber-700 border-amber-200' :
    s === 'Requirement Changed' ? 'bg-red-50 text-red-700 border-red-200' :
    s === 'Transition Required' ? 'bg-purple-50 text-purple-700 border-purple-200' :
    'bg-emerald-50 text-emerald-700 border-emerald-200'

  return (
    <div className="bg-[#f8f9fb] flex-1 overflow-y-auto">
      <div className="px-6 py-5 space-y-5 max-w-6xl">
        <nav className="text-[11px] text-[#374151] flex items-center gap-1">
          <span className="cursor-pointer hover:text-[#1a3a5c]" onClick={onBack}>Department Home</span>
          <span>›</span><span className="cursor-pointer hover:text-[#1a3a5c]" onClick={onOpenRegChange}>Regulatory Changes</span>
          <span>›</span><span className="text-[#1a3a5c] font-semibold">Impact Analysis — M34</span>
        </nav>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1a3a5c]">Regulatory Impact Analysis</h1>
            <p className="text-sm text-[#1a2533] mt-0.5">Identify applications, requirements, workflows and journeys affected by a confirmed regulatory change.</p>
          </div>
          <button onClick={onBack} className="text-xs border border-[#d1d9e0] px-3 py-1.5 rounded text-[#1a2533] hover:bg-white">← Back</button>
        </div>
        {/* Change context */}
        <div className="bg-white border border-[#e5eaf0] rounded-lg p-3 flex gap-6 text-xs">
          {[['Change ID', 'CHG-2026-0008'], ['Rule Version', 'MIDC-RULE-2026-V4 (Proposed)'], ['Source', 'GR No. TPB-2026/CR-41'], ['Effective Date', '01 Oct 2026 (Proposed)'], ['Status', 'Under Review']].map(([k, v]) => <div key={k}><span className="text-[#374151]">{k}</span><p className="font-semibold">{v}</p></div>)}
        </div>
        {/* KPIs */}
        <div className="grid grid-cols-5 gap-3">
          {[['Active Applications', 3, 'text-amber-700', 'bg-amber-50'], ['Approvals Affected', 1, 'text-red-700', 'bg-red-50'], ['Document Requirements', 2, 'text-blue-700', 'bg-blue-50'], ['Compliance Obligations', 1, 'text-purple-700', 'bg-purple-50'], ['Entrepreneur Journeys', 3, 'text-[#1a2533]', 'bg-white']].map(([l, v, c, bg]) => (
            <div key={String(l)} className={`${bg} border border-[#e5eaf0] rounded-lg p-3 text-center`}>
              <div className={`text-xl font-bold ${c}`}>{String(v)}</div>
              <div className="text-[10px] text-[#1a2533] mt-0.5 leading-tight">{String(l)}</div>
            </div>
          ))}
        </div>
        {/* Tabs */}
        <div className="flex gap-1">
          {(['Applications','Documents','Compliance','Journeys'] as const).map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`text-xs px-3 py-1.5 rounded font-semibold border transition-colors ${activeTab === t ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'bg-white border-[#d1d9e0] text-[#1a2533] hover:border-[#1a3a5c]'}`}>{t}</button>
          ))}
        </div>
        {activeTab === 'Applications' && (
          <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-[#f8f9fb] border-b border-[#e5eaf0]">
                <tr>{['Application', 'Service / State', 'Current Rule', 'New Rule', 'Requirement', 'Impact Status', 'Action'].map(h => <th key={h} className="px-3 py-2.5 text-left font-semibold text-[#1a2533]">{h}</th>)}</tr>
              </thead>
              <tbody>
                {M34_APPS.map(r => (
                  <tr key={r.id} className="border-b border-[#f0f4f8] hover:bg-[#f8f9fb]">
                    <td className="px-3 py-2.5"><p className="font-semibold text-[#1a3a5c]">{r.id}</p><p className="text-[10px] text-[#1a2533] truncate max-w-[150px]">{r.business}</p></td>
                    <td className="px-3 py-2.5"><p>{r.service}</p><p className="text-[10px] text-[#374151]">{r.state}</p></td>
                    <td className="px-3 py-2.5 text-[#1a2533]">{r.curVer}</td>
                    <td className="px-3 py-2.5 text-[#1a2533]">{r.newVer}</td>
                    <td className="px-3 py-2.5 text-[#1a2533]">{r.requirement}</td>
                    <td className="px-3 py-2.5"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${impactChip(r.impactStatus)}`}>{r.impactStatus}</span></td>
                    <td className="px-3 py-2.5"><button onClick={() => onOpenApp?.(r.id)} className="text-[10px] text-[#1a56db] hover:underline">Open App →</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab !== 'Applications' && (
          <div className="bg-white border border-[#e5eaf0] rounded-lg p-8 text-center">
            <p className="text-sm font-semibold text-[#1a2533]">{activeTab} Impact</p>
            <p className="text-xs text-[#374151] mt-1">{activeTab === 'Documents' ? '2 document requirements updated — Architect Certificate added as new evidence' : activeTab === 'Compliance' ? '1 compliance obligation under review — COND-001 may require condition update' : '3 entrepreneur journeys may be notified pending Regulatory Admin confirmation'}</p>
            <p className="text-[10px] text-[#6b7280] mt-4 italic">Impact data sourced from configured regulatory records. Do not assume retrospective application without transition-rule confirmation.</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── M35 Department Analytics ──────────────────────────────────────────────────



export function M35AnalyticsPage({ onBack, onOpenSLA, onOpenInspection, onOpenBottleneck }: { onBack: () => void; onOpenSLA?: () => void; onOpenInspection?: () => void; onOpenBottleneck?: () => void }) {
  const [tab, setTab] = useState<'Trend'|'Funnel'|'Queue Ageing'|'Drill-down'>('Funnel')
  const [scope, setScope] = useState<'My Desk'|'My Office'|'Department'>('My Office')

  return (
    <div className="bg-[#f8f9fb] flex-1 overflow-y-auto">
      <div className="px-6 py-5 space-y-5 max-w-6xl">
        <nav className="text-[11px] text-[#374151] flex items-center gap-1">
          <span className="cursor-pointer hover:text-[#1a3a5c]" onClick={onBack}>Department Home</span>
          <span>›</span><span className="text-[#1a3a5c] font-semibold">Department Analytics — M35</span>
        </nav>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1a3a5c]">Department Analytics</h1>
            <p className="text-sm text-[#1a2533] mt-0.5">Operational trends, processing patterns and workflow metrics within your authorised scope.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-[#f0f4f8] rounded p-0.5">
              {(['My Desk','My Office','Department'] as const).map(s => <button key={s} onClick={() => setScope(s)} className={`text-xs px-2.5 py-1 rounded font-semibold transition-colors ${scope === s ? 'bg-white text-[#1a3a5c] shadow-sm' : 'text-[#1a2533]'}`}>{s}</button>)}
            </div>
            <select className="text-xs border border-[#d1d9e0] rounded px-2 py-1.5 bg-white"><option>Sep 2026</option><option>Aug 2026</option><option>Last 3 months</option></select>
          </div>
        </div>
        {/* KPI row */}
        <div className="grid grid-cols-6 gap-3">
          {[['Pending', 23, 'text-[#1a3a5c]'], ['Avg Processing', '9.4d', 'text-[#1a2533]'], ['SLA Breached', 2, 'text-red-700'], ['Queries', 18, 'text-amber-700'], ['Inspections', 9, 'text-[#1a2533]'], ['Grievances', 3, 'text-purple-700']].map(([l, v, c]) => (
            <div key={String(l)} className="bg-white border border-[#e5eaf0] rounded-lg p-3 text-center"><div className={`text-xl font-bold ${c}`}>{String(v)}</div><div className="text-[10px] text-[#1a2533] mt-0.5">{String(l)}</div></div>
          ))}
        </div>
        {/* Tabs + bottleneck link */}
        <div className="flex items-center gap-1 flex-wrap">
          {(['Trend','Funnel','Queue Ageing','Drill-down'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`text-xs px-3 py-1.5 rounded font-semibold border transition-colors ${tab === t ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'bg-white border-[#d1d9e0] text-[#1a2533] hover:border-[#1a3a5c]'}`}>{t}</button>
          ))}
          <div className="ml-auto"><button onClick={onOpenBottleneck} className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1.5 rounded font-semibold hover:bg-amber-100">Bottleneck Analytics → M36</button></div>
        </div>

        {tab === 'Funnel' && (
          <div className="bg-white border border-[#e5eaf0] rounded-lg p-5">
            <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider mb-4">Application Stage Funnel — Sep 2026</p>
            <div className="space-y-2">
              {M35_FUNNEL.map(f => (
                <div key={f.stage} className="flex items-center gap-3 text-xs">
                  <div className="w-36 text-right text-[#1a2533] font-medium">{f.stage}</div>
                  <div className="flex-1 bg-[#f0f4f8] rounded-full h-5 overflow-hidden">
                    <div className="h-full bg-[#1a3a5c] rounded-full flex items-center pl-2 transition-all" style={{ width: `${f.pct}%` }}>
                      {f.pct > 20 && <span className="text-[10px] text-white font-semibold">{f.count}</span>}
                    </div>
                  </div>
                  <div className="w-12 text-right text-[#374151]">{f.count}</div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-[#374151] mt-3 italic">Not every application follows every stage. Funnel reflects actual state transitions in the configured period.</p>
          </div>
        )}

        {tab === 'Trend' && (
          <div className="bg-white border border-[#e5eaf0] rounded-lg p-5">
            <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider mb-4">Monthly Trend — Applications & SLA</p>
            <div className="flex items-end gap-6 h-40">
              {M35_TREND_DATA.map(d => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end gap-1 h-28 justify-center">
                    <div className="w-5 bg-[#1a3a5c] rounded-t" style={{ height: `${(d.received / 20) * 100}%` }} title={`Received: ${d.received}`} />
                    <div className="w-5 bg-[#1a56db] rounded-t opacity-70" style={{ height: `${(d.processed / 20) * 100}%` }} title={`Processed: ${d.processed}`} />
                    <div className="w-3 bg-red-400 rounded-t" style={{ height: `${(d.breaches / 5) * 100}%` }} title={`Breaches: ${d.breaches}`} />
                  </div>
                  <span className="text-[10px] text-[#374151] font-semibold">{d.month}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-3 text-[10px] text-[#1a2533]">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#1a3a5c] rounded inline-block" /> Received</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#1a56db] opacity-70 rounded inline-block" /> Processed</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-400 rounded inline-block" /> SLA Breached</span>
            </div>
          </div>
        )}

        {tab === 'Queue Ageing' && (
          <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-[#f8f9fb] border-b border-[#e5eaf0]">
                <tr>{['Application', 'State', 'Desk', 'Age', 'SLA Status', 'Action'].map(h => <th key={h} className="px-3 py-2.5 text-left font-semibold text-[#1a2533]">{h}</th>)}</tr>
              </thead>
              <tbody>
                {[
                  { id: 'MIDC-APP-2026-00388', state: 'DOCUMENT_SCRUTINY', desk: 'Land Desk', age: '26d', sla: 'SLA Exceeded' },
                  { id: 'MIDC-APP-2026-00418', state: 'FINAL_DECISION', desk: 'Decision Desk', age: '13d', sla: 'Approaching Deadline' },
                  { id: 'MIDC-APP-2026-00421', state: 'TECHNICAL_SCRUTINY', desk: 'Planning Desk', age: '11d', sla: 'Approaching Deadline' },
                  { id: 'MIDC-APP-2026-00415', state: 'INSPECTION_SCHEDULED', desk: 'Inspection Desk', age: '15d', sla: 'Normal' },
                ].map(r => (
                  <tr key={r.id} className="border-b border-[#f0f4f8] hover:bg-[#f8f9fb]">
                    <td className="px-3 py-2.5 font-semibold text-[#1a3a5c]">{r.id}</td>
                    <td className="px-3 py-2.5">{r.state}</td>
                    <td className="px-3 py-2.5 text-[#1a2533]">{r.desk}</td>
                    <td className="px-3 py-2.5 font-semibold">{r.age}</td>
                    <td className="px-3 py-2.5"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${r.sla === 'SLA Exceeded' ? 'bg-red-50 text-red-700 border-red-200' : r.sla === 'Approaching Deadline' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>{r.sla}</span></td>
                    <td className="px-3 py-2.5"><button onClick={onOpenSLA} className="text-[10px] text-[#1a56db] hover:underline">View SLA → M30</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'Drill-down' && (
          <div className="bg-white border border-[#e5eaf0] rounded-lg p-5 space-y-4">
            <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Service Breakdown — {scope}</p>
            <div className="space-y-3">
              {[['Building / Planning', 18, 3, '10.2d'], ['Land / Plot', 12, 2, '8.4d'], ['Water / Utilities', 8, 1, '7.1d'], ['Environmental', 5, 0, '6.2d']].map(([svc, pending, breaches, avg]) => (
                <div key={String(svc)} className="flex items-center gap-4 text-xs py-2 border-b border-[#f0f4f8]">
                  <div className="w-40 font-semibold text-[#1a2533]">{String(svc)}</div>
                  <div className="flex-1 flex gap-6">
                    <span><span className="text-[#374151]">Pending </span><span className="font-bold">{String(pending)}</span></span>
                    <span><span className="text-[#374151]">Breached </span><span className={`font-bold ${Number(breaches) > 0 ? 'text-red-700' : 'text-emerald-700'}`}>{String(breaches)}</span></span>
                    <span><span className="text-[#374151]">Avg Time </span><span className="font-bold">{String(avg)}</span></span>
                  </div>
                  <button onClick={onOpenInspection} className="text-[10px] text-[#1a56db] hover:underline">Inspect Queue →</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── M36 Bottleneck Analytics ──────────────────────────────────────────────────


export function M36BottleneckPage({ onBack, onOpenSLA, onOpenInspection, onOpenAnalytics }: { onBack: () => void; onOpenSLA?: () => void; onOpenInspection?: () => void; onOpenAnalytics?: () => void }) {
  const [selected, setSelected] = useState(M36_BREAKDOWN[1])

  return (
    <div className="bg-[#f8f9fb] flex-1 overflow-y-auto">
      <div className="px-6 py-5 space-y-5 max-w-6xl">
        <nav className="text-[11px] text-[#374151] flex items-center gap-1">
          <span className="cursor-pointer hover:text-[#1a3a5c]" onClick={onBack}>Department Home</span>
          <span>›</span><span className="cursor-pointer hover:text-[#1a3a5c]" onClick={onOpenAnalytics}>Analytics</span>
          <span>›</span><span className="text-[#1a3a5c] font-semibold">Bottleneck Analytics — M36</span>
        </nav>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1a3a5c]">Bottleneck Analytics</h1>
            <p className="text-sm text-[#1a2533] mt-0.5">Identify observed contributors to processing delay and workflow rework.</p>
          </div>
          <div className="flex gap-2">
            <select className="text-xs border border-[#d1d9e0] rounded px-2 py-1.5 bg-white"><option>Building / Planning</option><option>Land / Plot</option><option>All Services</option></select>
            <select className="text-xs border border-[#d1d9e0] rounded px-2 py-1.5 bg-white"><option>Sep 2026</option><option>Last 3 months</option></select>
          </div>
        </div>

        {/* Journey time summary */}
        <div className="grid grid-cols-4 gap-3">
          {[['Observed Journey Time', '9.4d avg', 'text-[#1a3a5c]'], ['Largest Contributor', 'Inspection Waiting', 'text-amber-700'], ['Rework Loops', '10 applications', 'text-red-700'], ['Dep. Delays', '3 active', 'text-purple-700']].map(([l, v, c]) => (
            <div key={String(l)} className="bg-white border border-[#e5eaf0] rounded-lg p-3"><div className={`text-sm font-bold ${c}`}>{String(v)}</div><div className="text-[10px] text-[#1a2533] mt-0.5">{String(l)}</div></div>
          ))}
        </div>

        {/* Bottleneck table */}
        <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-[#e5eaf0]">
            <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Process Stage Breakdown — Building / Planning, Sep 2026</p>
          </div>
          <table className="w-full text-xs">
            <thead className="bg-[#f8f9fb] border-b border-[#e5eaf0]">
              <tr>{['Process Stage', 'Avg Time', 'Median', 'Apps Affected', 'SLA Impact', 'Rework', 'Observed %', 'Action'].map(h => <th key={h} className="px-3 py-2.5 text-left font-semibold text-[#1a2533]">{h}</th>)}</tr>
            </thead>
            <tbody>
              {M36_BREAKDOWN.map(r => (
                <tr key={r.stage} onClick={() => setSelected(r)} className={`border-b border-[#f0f4f8] cursor-pointer hover:bg-[#f8f9fb] ${selected.stage === r.stage ? 'bg-[#f0f7ff]' : ''}`}>
                  <td className="px-3 py-2.5 font-semibold text-[#1a2533]">{r.stage}{r === M36_BREAKDOWN[1] && <span className="ml-1 text-[9px] font-bold text-amber-700 bg-amber-100 px-1 rounded">LARGEST</span>}</td>
                  <td className="px-3 py-2.5">{r.avg}</td>
                  <td className="px-3 py-2.5">{r.median}</td>
                  <td className="px-3 py-2.5">{r.apps}</td>
                  <td className="px-3 py-2.5"><span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${r.slaImpact === 'High' ? 'bg-red-50 text-red-700' : r.slaImpact === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>{r.slaImpact}</span></td>
                  <td className="px-3 py-2.5">{r.rework}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-[#f0f4f8] rounded-full h-2"><div className="h-2 bg-[#1a3a5c] rounded-full" style={{ width: `${r.contribution}%` }} /></div>
                      <span className="font-semibold">{r.contribution}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    {r.stage === 'Inspection Waiting' && <button onClick={onOpenInspection} className="text-[10px] text-[#1a56db] hover:underline">Inspection Queue →</button>}
                    {r.stage !== 'Inspection Waiting' && <button onClick={onOpenSLA} className="text-[10px] text-[#1a56db] hover:underline">View SLA →</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected stage detail */}
        <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
          <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider mb-3">Observed Contributor Detail — {selected.stage}</p>
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div className="space-y-2">
              <div><span className="text-[#374151]">Observed contribution to elapsed time</span><p className="text-xl font-bold text-amber-700">{selected.contribution}%</p><p className="text-[10px] text-[#374151]">Largest observed contributor</p></div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between border-b border-[#f0f4f8] pb-1"><span className="text-[#374151]">Average</span><span className="font-semibold">{selected.avg}</span></div>
              <div className="flex justify-between border-b border-[#f0f4f8] pb-1"><span className="text-[#374151]">Median</span><span className="font-semibold">{selected.median}</span></div>
              <div className="flex justify-between border-b border-[#f0f4f8] pb-1"><span className="text-[#374151]">Applications</span><span className="font-semibold">{selected.apps}</span></div>
              <div className="flex justify-between"><span className="text-[#374151]">Rework loops</span><span className="font-semibold">{selected.rework}</span></div>
            </div>
            <div className="text-[10px] text-[#374151] italic">
              <p className="font-semibold text-[#1a2533] mb-1">Interpretation Note</p>
              <p>"{selected.stage}" is the largest observed contributor to measured elapsed time in the selected period. This reflects factual workflow timing data. It does not imply sole responsibility or officer fault without a separately verified administrative finding.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── M37 Workload / Capacity ──────────────────────────────────────────────────

export function M37WorkloadPage({ onBack, onOpenSLA, onOpenInspection, onOpenAnalytics }: { onBack: () => void; onOpenSLA?: () => void; onOpenInspection?: () => void; onOpenAnalytics?: () => void }) {
  const [view, setView] = useState<'office'|'service'|'desk'|'age'>('service')

  return (
    <div className="bg-[#f8f9fb] flex-1 overflow-y-auto">
      <div className="px-6 py-5 space-y-5 max-w-6xl">
        <nav className="text-[11px] text-[#374151] flex items-center gap-1">
          <span className="cursor-pointer hover:text-[#1a3a5c]" onClick={onBack}>Department Home</span>
          <span>›</span><span className="text-[#1a3a5c] font-semibold">Workload / Capacity — M37</span>
        </nav>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1a3a5c]">Workload / Capacity</h1>
            <p className="text-sm text-[#1a2533] mt-0.5">View operational queues, application age and configured workload indicators for planning and allocation.</p>
          </div>
          <div className="flex gap-2">
            <select className="text-xs border border-[#d1d9e0] rounded px-2 py-1.5 bg-white"><option>All Offices</option><option>Pune</option><option>Nashik</option><option>Nagpur</option></select>
            <select className="text-xs border border-[#d1d9e0] rounded px-2 py-1.5 bg-white"><option>All Services</option><option>Building / Planning</option><option>Land / Plot</option></select>
          </div>
        </div>
        {/* Summary cards */}
        <div className="grid grid-cols-7 gap-3">
          {[['Current Queue', 47, 'text-[#1a3a5c]'], ['New Today', 3, 'text-emerald-700'], ['Due Soon (3d)', 8, 'text-amber-700'], ['SLA Risk', 7, 'text-amber-700'], ['SLA Breached', 2, 'text-red-700'], ['Inspection Queue', 9, 'text-[#1a2533]'], ['Decision Queue', 6, 'text-[#1a2533]']].map(([l, v, c]) => (
            <div key={String(l)} className="bg-white border border-[#e5eaf0] rounded-lg p-3 text-center"><div className={`text-xl font-bold ${c}`}>{String(v)}</div><div className="text-[10px] text-[#1a2533] mt-0.5 leading-tight">{String(l)}</div></div>
          ))}
        </div>
        {/* View toggle */}
        <div className="flex gap-1">
          {(['service','office','desk','age'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} className={`text-xs px-3 py-1.5 rounded font-semibold border transition-colors ${view === v ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'bg-white border-[#d1d9e0] text-[#1a2533] hover:border-[#1a3a5c]'}`}>
              {v === 'service' ? 'Service View' : v === 'office' ? 'Office View' : v === 'desk' ? 'Desk View' : 'Application Age'}
            </button>
          ))}
        </div>

        {view === 'service' && (
          <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-[#f8f9fb] border-b border-[#e5eaf0]">
                <tr>{['Service', 'Queue', 'New', 'Due Soon', 'SLA Risk', 'Breached', 'Inspection', 'Decision', 'Action'].map(h => <th key={h} className="px-3 py-2.5 text-left font-semibold text-[#1a2533]">{h}</th>)}</tr>
              </thead>
              <tbody>
                {[
                  { svc: 'Building / Planning', q: 18, new_: 2, due: 4, risk: 3, breach: 1, insp: 5, dec: 2 },
                  { svc: 'Land / Plot', q: 12, new_: 1, due: 2, risk: 2, breach: 1, insp: 1, dec: 2 },
                  { svc: 'Water / Utilities', q: 8, new_: 0, due: 1, risk: 1, breach: 0, insp: 2, dec: 1 },
                  { svc: 'Environmental', q: 5, new_: 0, due: 1, risk: 1, breach: 0, insp: 1, dec: 1 },
                  { svc: 'Fire / Safety', q: 4, new_: 0, due: 0, risk: 0, breach: 0, insp: 0, dec: 0 },
                ].map(r => (
                  <tr key={r.svc} className="border-b border-[#f0f4f8] hover:bg-[#f8f9fb]">
                    <td className="px-3 py-2.5 font-semibold text-[#1a2533]">{r.svc}</td>
                    <td className="px-3 py-2.5">{r.q}</td>
                    <td className="px-3 py-2.5 text-emerald-700 font-semibold">{r.new_}</td>
                    <td className="px-3 py-2.5 text-amber-700 font-semibold">{r.due}</td>
                    <td className="px-3 py-2.5 text-amber-700 font-semibold">{r.risk}</td>
                    <td className="px-3 py-2.5 text-red-700 font-semibold">{r.breach}</td>
                    <td className="px-3 py-2.5">{r.insp}</td>
                    <td className="px-3 py-2.5">{r.dec}</td>
                    <td className="px-3 py-2.5"><button onClick={onOpenSLA} className="text-[10px] text-[#1a56db] hover:underline">View SLA →</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === 'office' && (
          <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-[#f8f9fb] border-b border-[#e5eaf0]"><tr>{['Office / Region', 'Queue', 'New', 'Due Soon', 'SLA Risk', 'Breached', 'Insp.', 'Decision'].map(h => <th key={h} className="px-3 py-2.5 text-left font-semibold text-[#1a2533]">{h}</th>)}</tr></thead>
              <tbody>
                {[['Pune', 28, 2, 5, 4, 1, 4, 3], ['Nashik', 10, 1, 2, 2, 1, 3, 1], ['Nagpur', 6, 0, 1, 1, 0, 1, 1], ['Aurangabad', 3, 0, 0, 0, 0, 1, 1]].map(([o, ...vals]) => (
                  <tr key={String(o)} className="border-b border-[#f0f4f8] hover:bg-[#f8f9fb]">
                    <td className="px-3 py-2.5 font-semibold text-[#1a2533]">{String(o)}</td>
                    {vals.map((v, i) => <td key={i} className={`px-3 py-2.5 ${i >= 2 && i <= 3 ? 'text-amber-700 font-semibold' : i === 4 ? 'text-red-700 font-semibold' : ''}`}>{String(v)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === 'desk' && (
          <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-[#f8f9fb] border-b border-[#e5eaf0]"><tr>{['Desk', 'Queue', 'New', 'Due Soon', 'SLA Risk', 'Breached', 'Oldest App'].map(h => <th key={h} className="px-3 py-2.5 text-left font-semibold text-[#1a2533]">{h}</th>)}</tr></thead>
              <tbody>
                {[['Planning Desk', 12, 1, 3, 2, 0, '11d'], ['Land Desk', 10, 1, 2, 2, 2, '26d'], ['Inspection Desk', 9, 0, 2, 2, 0, '15d'], ['Decision Desk', 6, 0, 2, 1, 0, '13d'], ['Utilities Desk', 5, 1, 1, 0, 0, '8d']].map(([d, ...vals]) => (
                  <tr key={String(d)} className="border-b border-[#f0f4f8] hover:bg-[#f8f9fb]">
                    <td className="px-3 py-2.5 font-semibold text-[#1a2533]">{String(d)}</td>
                    {vals.map((v, i) => <td key={i} className={`px-3 py-2.5 ${i === 3 ? 'text-red-700 font-semibold' : ''}`}>{String(v)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 bg-[#f8f9fb] border-t border-[#e5eaf0] text-[10px] text-[#374151]">Desk view shows queue distribution for operational planning. Officer identity is kept separate from queue metrics. Analytics do not create a productivity ranking.</div>
          </div>
        )}

        {view === 'age' && (
          <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-[#f8f9fb] border-b border-[#e5eaf0]"><tr>{['Application', 'Age', 'State', 'Desk', 'SLA', 'Waiting Reason'].map(h => <th key={h} className="px-3 py-2.5 text-left font-semibold text-[#1a2533]">{h}</th>)}</tr></thead>
              <tbody>
                {[
                  { id: 'MIDC-APP-2026-00388', age: '26d', state: 'DOCUMENT_SCRUTINY', desk: 'Land Desk', sla: 'Exceeded', reason: 'External dependency — MPCB' },
                  { id: 'MIDC-APP-2026-00418', age: '13d', state: 'FINAL_DECISION', desk: 'Decision Desk', sla: 'Approaching', reason: 'Decision pending' },
                  { id: 'MIDC-APP-2026-00421', age: '11d', state: 'TECHNICAL_SCRUTINY', desk: 'Planning Desk', sla: 'Approaching', reason: 'Scrutiny in progress' },
                  { id: 'MIDC-APP-2026-00415', age: '15d', state: 'INSPECTION_SCHEDULED', desk: 'Inspection Desk', sla: 'Normal', reason: 'Inspection waiting' },
                ].map(r => (
                  <tr key={r.id} className="border-b border-[#f0f4f8] hover:bg-[#f8f9fb]">
                    <td className="px-3 py-2.5 font-semibold text-[#1a3a5c]">{r.id}</td>
                    <td className="px-3 py-2.5 font-semibold">{r.age}</td>
                    <td className="px-3 py-2.5">{r.state}</td>
                    <td className="px-3 py-2.5 text-[#1a2533]">{r.desk}</td>
                    <td className="px-3 py-2.5"><span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${r.sla === 'Exceeded' ? 'bg-red-50 text-red-700 border-red-200' : r.sla === 'Approaching' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>{r.sla}</span></td>
                    <td className="px-3 py-2.5 text-[#1a2533]">{r.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Capacity panel */}
        <div className="bg-white border border-[#e5eaf0] rounded-lg p-4">
          <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider mb-3">Capacity Context</p>
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div className="space-y-2"><div className="flex justify-between"><span className="text-[#374151]">Queue Volume</span><span className="font-bold">47</span></div><div className="flex justify-between"><span className="text-[#374151]">Due within 3 days</span><span className="font-bold text-amber-700">8</span></div><div className="flex justify-between"><span className="text-[#374151]">SLA Risk</span><span className="font-bold text-amber-700">7</span></div></div>
            <div className="space-y-2"><div className="flex justify-between"><span className="text-[#374151]">Inspection demand</span><span className="font-bold">9 pending</span></div><div className="flex justify-between"><span className="text-[#374151]">Decision demand</span><span className="font-bold">6 pending</span></div></div>
            <div className="text-[10px] text-[#374151] border border-[#e5eaf0] rounded p-2 italic">Capacity data not configured. Staff allocation and configured capacity data are not available in the prototype. This panel will show queue pressure vs. available capacity when that data is configured.</div>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={onOpenSLA} className="text-xs border border-[#d1d9e0] bg-white px-3 py-1.5 rounded text-[#1a2533] hover:bg-[#f8f9fb]">SLA Dashboard → M30</button>
            <button onClick={onOpenInspection} className="text-xs border border-[#d1d9e0] bg-white px-3 py-1.5 rounded text-[#1a2533] hover:bg-[#f8f9fb]">Inspection Queue → M21</button>
            <button onClick={onOpenAnalytics} className="text-xs border border-[#d1d9e0] bg-white px-3 py-1.5 rounded text-[#1a2533] hover:bg-[#f8f9fb]">Dept Analytics → M35</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── M38 Audit / History ──────────────────────────────────────────────────────


export function M38AuditPage({ onBack, onOpenApp }: { onBack: () => void; onOpenApp?: (applicationId: string) => void }) {
  const [search, setSearch] = useState('MIDC-APP-2026-00418')
  const [filterType, setFilterType] = useState<'all'|'CHANGE'|'VIEW'>('all')
  const [selectedEvent, setSelectedEvent] = useState<typeof M38_EVENTS[0] | null>(null)

  const filtered = M38_EVENTS.filter(e => {
    const matchSearch = !search || e.record.toLowerCase().includes(search.toLowerCase()) || e.actor.toLowerCase().includes(search.toLowerCase())
    const matchType = filterType === 'all' || e.type === filterType
    return matchSearch && matchType
  })

  return (
    <div className="bg-[#f8f9fb] flex-1 overflow-y-auto">
      <div className="px-6 py-5 space-y-5 max-w-6xl">
        <nav className="text-[11px] text-[#374151] flex items-center gap-1">
          <span className="cursor-pointer hover:text-[#1a3a5c]" onClick={onBack}>Department Home</span>
          <span>›</span><span className="text-[#1a3a5c] font-semibold">Audit / History — M38</span>
        </nav>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1a3a5c]">Audit / History</h1>
            <p className="text-sm text-[#1a2533] mt-0.5">Trace views, changes, decisions, workflow events and version history across the MIDC system.</p>
          </div>
          <div className="text-[10px] bg-[#f8f9fb] border border-[#e5eaf0] text-[#374151] px-3 py-1.5 rounded italic">Historical audit records are immutable.</div>
        </div>
        {/* Search + filter */}
        <div className="flex gap-2">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by Application ID, actor, query, inspection, decision..." className="flex-1 text-xs border border-[#d1d9e0] rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#1a56db] bg-white" />
          <div className="flex gap-1">
            {(['all','CHANGE','VIEW'] as const).map(f => (
              <button key={f} onClick={() => setFilterType(f)} className={`text-xs px-3 py-2 rounded font-semibold border transition-colors ${filterType === f ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'bg-white border-[#d1d9e0] text-[#1a2533] hover:border-[#1a3a5c]'}`}>{f === 'all' ? 'All Events' : f === 'CHANGE' ? 'Changes' : 'Views'}</button>
            ))}
          </div>
          <select className="text-xs border border-[#d1d9e0] rounded px-2 py-2 bg-white"><option>All Records</option><option>Decisions</option><option>Inspections</option><option>Queries</option><option>Regulatory</option></select>
        </div>
        {/* Timeline */}
        <div className="grid grid-cols-12 gap-5">
          <div className={`${selectedEvent ? 'col-span-7' : 'col-span-12'} space-y-1`}>
            <div className="bg-white border border-[#e5eaf0] rounded-lg overflow-hidden">
              <div className="px-4 py-2.5 border-b border-[#e5eaf0] flex items-center gap-4 text-[10px] font-semibold text-[#1a2533] bg-[#f8f9fb]">
                <span className="w-36">Timestamp</span><span className="w-32">Actor / Role</span><span className="flex-1">Action / Record</span><span className="w-24">Change</span><span className="w-16">Type</span>
              </div>
              <div className="divide-y divide-[#94a3b8]">
                {filtered.map((ev, i) => (
                  <button key={i} onClick={() => setSelectedEvent(ev)} className={`w-full text-left px-4 py-3 flex items-start gap-4 text-xs hover:bg-[#f8f9fb] transition-colors ${selectedEvent === ev ? 'bg-[#f0f7ff]' : ''}`}>
                    <span className="w-36 text-[#374151] flex-shrink-0">{ev.ts}</span>
                    <div className="w-32 flex-shrink-0"><p className="font-semibold text-[#1a2533]">{ev.actor}</p><p className="text-[10px] text-[#374151]">{ev.role}</p></div>
                    <div className="flex-1 min-w-0"><p className="font-semibold text-[#1a2533]">{ev.action}</p><p className="text-[10px] text-[#374151] truncate">{ev.record} · {ev.field}</p></div>
                    <div className="w-24 flex-shrink-0">
                      {ev.type === 'CHANGE' && ev.old !== '—' && <p className="text-[10px]"><span className="text-red-600 line-through">{ev.old}</span> → <span className="text-emerald-700 font-semibold">{ev.new_}</span></p>}
                      {ev.type === 'VIEW' && <span className="text-[10px] text-[#374151]">View only</span>}
                    </div>
                    <span className={`w-16 text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${ev.type === 'CHANGE' ? 'bg-amber-50 text-amber-700' : 'bg-[#f0f4f8] text-[#1a2533]'}`}>{ev.type}</span>
                  </button>
                ))}
              </div>
              {filtered.length === 0 && <div className="px-4 py-8 text-center text-xs text-[#374151]">No audit events match the current search / filter.</div>}
            </div>
          </div>

          {selectedEvent && (
            <div className="col-span-5 space-y-3">
              <div className="bg-white border border-[#e5eaf0] rounded-lg p-4 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-[#1a3a5c]">Event Detail</p>
                  <button onClick={() => setSelectedEvent(null)} className="text-[#374151] hover:text-[#1a2533]">×</button>
                </div>
                {[
                  ['Timestamp', selectedEvent.ts], ['Actor', selectedEvent.actor], ['Role', selectedEvent.role],
                  ['Action', selectedEvent.action], ['Record', selectedEvent.record], ['Field', selectedEvent.field],
                  ['Old Value', selectedEvent.old], ['New Value', selectedEvent.new_], ['Source', selectedEvent.source],
                  ['Reason', selectedEvent.reason], ['Version', selectedEvent.ver], ['Event Type', selectedEvent.type],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-[#f0f4f8] pb-1 gap-2">
                    <span className="text-[#374151] flex-shrink-0">{k}</span>
                    <span className={`font-semibold text-right ${k === 'New Value' ? 'text-emerald-700' : k === 'Old Value' ? 'text-red-600' : ''}`}>{v}</span>
                  </div>
                ))}
                <div className="pt-2 flex gap-2">
                  <button onClick={() => onOpenApp?.(selectedEvent.record)} className="text-[11px] text-[#1a56db] hover:underline">Open Application → M06</button>
                </div>
              </div>
              <div className="text-[9px] text-[#374151] italic px-2">Historical audit records are immutable. If a correction is necessary, a new corrective event is created — the original record is preserved.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState<'en' | 'mr'>('en')
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [highContrast, setHighContrast] = useState(false)
  const [authed, setAuthed] = useState(false)

  if (authed) {
    return (
      <M01Shell
        onLogout={() => setAuthed(false)}
        lang={lang}
        fontSize={fontSize}
        highContrast={highContrast}
      />
    )
  }

  return (
    <M01LoginPage
      onSuccess={() => setAuthed(true)}
      lang={lang}
      fontSize={fontSize}
      highContrast={highContrast}
    />
  )
}
