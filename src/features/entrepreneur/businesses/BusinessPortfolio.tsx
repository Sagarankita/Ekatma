'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Icon } from '../public-auth/PublicChrome'
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur'
import { SAMPLE_PROJECTS, findBusinessProjectById, type BusinessProject, type JourneyState, type ProjectStage } from './catalog'
import { EntrepreneurCommandCentre } from '../overview/EntrepreneurCommandCentre'

function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return <nav aria-label="Breadcrumb"><ol className="flex items-center gap-1 text-sm text-[#6b7a8d]" role="list">{items.map((item, index) => <li key={item.label} className="flex items-center gap-1">{index > 0 && <Icon.ChevronRight />}{item.href ? <Link href={item.href} className="hover:text-[#1a56db] hover:underline transition-colors">{item.label}</Link> : <span className="text-[#1a2533] font-medium" aria-current="page">{item.label}</span>}</li>)}</ol></nav>
}

// ─── E02 Journey state badge ──────────────────────────────────────────────────
function JourneyBadge({ state }: { state: JourneyState }) {
  const cfg: Record<JourneyState, { bg: string; text: string; border: string; dot: string }> = {
    'Action Required':     { bg: 'bg-red-50',    text: 'text-red-800',    border: 'border-red-200',    dot: 'bg-red-500' },
    'In Progress':         { bg: 'bg-blue-50',   text: 'text-blue-800',   border: 'border-blue-200',   dot: 'bg-blue-500' },
    'Under Review':        { bg: 'bg-amber-50',  text: 'text-amber-800',  border: 'border-amber-200',  dot: 'bg-amber-500' },
    'On Track':            { bg: 'bg-green-50',  text: 'text-green-800',  border: 'border-green-200',  dot: 'bg-green-500' },
    'Compliance Due':      { bg: 'bg-amber-50',  text: 'text-amber-800',  border: 'border-amber-200',  dot: 'bg-amber-500' },
    'Inspection Upcoming': { bg: 'bg-blue-50',   text: 'text-blue-800',   border: 'border-blue-200',   dot: 'bg-blue-400' },
    'No Immediate Action': { bg: 'bg-[#f8f9fb]', text: 'text-[#4a5568]', border: 'border-[#d1d9e0]', dot: 'bg-[#9aa5b4]' },
  }
  const c = cfg[state]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${c.bg} ${c.text} ${c.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} aria-hidden="true" />
      {state}
    </span>
  )
}

// ─── E02 Stage badge ──────────────────────────────────────────────────────────
function StageBadge({ stage }: { stage: ProjectStage }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#f0f4f8] text-[#1a3a5c] border border-[#c8d6e4]">
      {stage}
    </span>
  )
}

// ─── E02 Business Project Card ────────────────────────────────────────────────
function BusinessProjectCard({ project, onOpen }: { project: BusinessProject; onOpen: (id: string) => void }) {
  return (
    <article
      className="bg-white border border-[#d1d9e0] rounded overflow-hidden hover:border-[#a0b4cc] hover:shadow-sm transition-all"
      aria-labelledby={`card-name-${project.id}`}
    >
      {/* Card header */}
      <div className="px-5 py-4 border-b border-[#e8edf2] flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 id={`card-name-${project.id}`} className="text-sm font-bold text-[#1a2533] leading-snug">{project.name}</h3>
          {project.provenance && <p className="mt-1 text-[10px] font-semibold text-[#92400e]">Internal demo · {project.id}</p>}
          <p className="text-xs text-[#6b7a8d] mt-0.5">{project.subtitle}</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
            <span className="flex items-center gap-1 text-xs text-[#6b7a8d]">
              <span className="text-[#9aa5b4]"><Icon.MapPin /></span>
              {project.location}
            </span>
            <span className="flex items-center gap-1 text-xs text-[#6b7a8d]">
              <span className="text-[#9aa5b4]"><Icon.Factory /></span>
              {project.industry}
            </span>
          </div>
        </div>
        <div className="shrink-0 flex flex-col items-end gap-1.5">
          <JourneyBadge state={project.journeyState} />
          <StageBadge stage={project.stage} />
        </div>
      </div>

      {/* Card body */}
      <div className="px-5 py-3 space-y-3">
        {/* Actions required — prominent if > 0 */}
        {project.actionsRequired > 0 && (
          <div className="flex items-start gap-2 p-2.5 bg-red-50 border border-red-100 rounded">
            <span className="text-red-500 shrink-0 mt-0.5"><Icon.AlertCircle /></span>
            <div>
              <p className="text-xs font-semibold text-red-800">{project.actionsRequired} Action{project.actionsRequired > 1 ? 's' : ''} Required</p>
              {project.actionDetails.map((d, i) => (
                <p key={i} className="text-xs text-red-700 mt-0.5">· {d}</p>
              ))}
            </div>
          </div>
        )}

        {/* Active applications */}
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[#9aa5b4]"><Icon.ClipboardList /></span>
            <p className="text-xs font-medium text-[#374151]">Active Applications: <span className="text-[#1a3a5c] font-semibold">{project.activeApplications}</span></p>
          </div>
          {project.applicationPreviews.length > 0 && (
            <ul className="space-y-0.5 ml-5">
              {project.applicationPreviews.map((a, i) => (
                <li key={i} className="text-xs text-[#6b7a8d]">· {a}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Compliance / Inspection / Incentive row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1 border-t border-[#f0f4f8]">
          <div className="flex items-center gap-1 text-xs text-[#6b7a8d]">
            <span className="text-[#9aa5b4]"><Icon.Calendar /></span>
            {project.nextCompliance
              ? <span><span className="font-medium text-[#374151]">Compliance:</span> {project.nextCompliance}</span>
              : <span>No current compliance obligation</span>
            }
          </div>
          <div className="flex items-center gap-1 text-xs text-[#6b7a8d]">
            <span className="text-[#9aa5b4]"><Icon.Clock /></span>
            {project.inspection
              ? <span><span className="font-medium text-[#374151]">Inspection:</span> {project.inspection}</span>
              : <span>No upcoming inspection</span>
            }
          </div>
          {project.incentiveAction && (
            <div className="flex items-center gap-1 text-xs text-[#6b7a8d]">
              <span className="text-[#9aa5b4]"><Icon.Award /></span>
              <span>{project.incentiveAction}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card footer */}
      <div className="px-5 py-3 bg-[#fafbfc] border-t border-[#e8edf2] flex items-center justify-between gap-3">
        {project.alert && project.actionsRequired === 0 && (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" aria-hidden="true" />
            {project.alert}
          </span>
        )}
        {(!project.alert || project.actionsRequired > 0) && <span />}
        <button
          onClick={() => onOpen(project.id)}
          className="flex items-center gap-1.5 bg-[#1a3a5c] text-white text-xs font-semibold px-4 py-2 rounded hover:bg-[#0f2540] focus:ring-2 focus:ring-[#1a56db] focus:ring-offset-2 transition-colors"
          aria-label={`Open business: ${project.name}`}
        >
          Open Business
          <Icon.ChevronRight />
        </button>
      </div>
    </article>
  )
}

// ─── E02 Portfolio Summary ────────────────────────────────────────────────────
function PortfolioSummary({ projects }: { projects: readonly BusinessProject[] }) {
  const totalActions = projects.reduce((s, p) => s + p.actionsRequired, 0)
  const totalApps = projects.reduce((s, p) => s + p.activeApplications, 0)
  const complianceDue = projects.filter(p => p.nextCompliance).length

  const tiles = [
    { label: 'Businesses / Projects', value: projects.length, color: 'text-[#1a3a5c]' },
    { label: 'Active Applications',   value: totalApps,        color: 'text-[#1a56db]' },
    { label: 'Actions Required',      value: totalActions,     color: totalActions > 0 ? 'text-red-700' : 'text-green-700' },
    { label: 'Upcoming Compliance',   value: complianceDue,    color: complianceDue > 0 ? 'text-amber-700' : 'text-[#6b7a8d]' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
      {tiles.map(t => (
        <div key={t.label} className="bg-white border border-[#d1d9e0] rounded p-4">
          <p className="text-xs text-[#6b7a8d] uppercase tracking-wide font-medium leading-snug">{t.label}</p>
          <p className={`text-3xl font-bold mt-1 ${t.color}`}>{t.value}</p>
        </div>
      ))}
    </div>
  )
}

// ─── E02 Search + Filter Toolbar ─────────────────────────────────────────────
function SearchFilterToolbar({ search, setSearch, stageFilter, setStageFilter, statusFilter, setStatusFilter }: {
  search: string, setSearch: (v: string) => void
  stageFilter: string, setStageFilter: (v: string) => void
  statusFilter: string, setStatusFilter: (v: string) => void
}) {
  const stages = ['All Stages', 'Planning', 'Land Acquisition', 'Pre-Establishment', 'Construction', 'Installation', 'Trial Production', 'Ready to Operate', 'Operational']
  const statuses = ['All', 'Action Required', 'In Progress', 'Under Review', 'Inspection Upcoming', 'Compliance Due', 'No Immediate Action']

  return (
    <div className="bg-white border border-[#d1d9e0] rounded p-3 mb-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[#9aa5b4]"><Icon.Filter /></span>
        <select
          value={stageFilter}
          onChange={e => setStageFilter(e.target.value)}
          aria-label="Filter by project stage"
          className="text-sm border border-[#d1d9e0] rounded px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a56db] text-[#374151] transition-colors"
        >
          {stages.map(s => <option key={s}>{s}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          aria-label="Filter by journey / action state"
          className="text-sm border border-[#d1d9e0] rounded px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a56db] text-[#374151] transition-colors"
        >
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
    </div>
  )
}

// ─── E02 Empty State ──────────────────────────────────────────────────────────
function MyBusinessesEmpty({ onCreateNew }: { onCreateNew: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-14 h-14 rounded-full bg-[#f0f4f8] border border-[#d1d9e0] flex items-center justify-center text-[#9aa5b4] mb-4">
        <Icon.Briefcase />
      </div>
      <h2 className="text-base font-semibold text-[#1a2533] mb-2">You have not created a business or project yet.</h2>
      <p className="text-sm text-[#6b7a8d] max-w-md mb-6">
        Create your first business or project to build your Business Profile and personalised regulatory journey.
      </p>
      <button
        onClick={onCreateNew}
        className="flex items-center gap-2 bg-[#1a3a5c] text-white text-sm font-medium px-5 py-2.5 rounded hover:bg-[#0f2540] focus:ring-2 focus:ring-[#1a56db] focus:ring-offset-2 transition-colors"
      >
        <Icon.Plus />
        Create Your First Business / Project
      </button>
    </div>
  )
}

// ─── E02 My Businesses Page ───────────────────────────────────────────────────
export function MyBusinessesPage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [stageFilter, setStageFilter] = useState('All Stages')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showEmpty, setShowEmpty] = useState(false)

  const projects = showEmpty ? [] : SAMPLE_PROJECTS

  const filtered = projects.filter(p => {
    const q = search.toLowerCase()
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.industry.toLowerCase().includes(q) || p.location.toLowerCase().includes(q)
    const matchStage = stageFilter === 'All Stages' || p.stage === stageFilter
    const matchStatus = statusFilter === 'All' || p.journeyState === statusFilter
    return matchSearch && matchStage && matchStatus
  })

  const handleOpen = (id: string) => {
    const project = findBusinessProjectById(id)
    if (project) router.push(ENTREPRENEUR_ROUTES.business(project.id))
  }

  const handleCreateNew = () => router.push(ENTREPRENEUR_ROUTES.newBusiness())

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>

      <div className="max-w-[1200px] mx-auto px-6 py-5">
        {/* Breadcrumb */}
        <div className="mb-4">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'My Businesses' }]} />
        </div>

        {/* Page header row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5 pb-4 border-b border-[#d1d9e0]">
          <div>
            <h1 className="text-2xl font-bold text-[#1a3a5c]">My Businesses</h1>
            <p className="text-sm text-[#6b7a8d] mt-1">Manage the businesses and prototype projects available in this portal.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:shrink-0">
            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 bg-[#1a3a5c] text-white text-sm font-medium px-4 py-2 rounded hover:bg-[#0f2540] focus:ring-2 focus:ring-[#1a56db] focus:ring-offset-2 transition-colors"
            >
              <Icon.Plus />
              Create New Business / Project
            </button>
          </div>
        </div>

        {/* Dev toggle for demo — empty vs populated */}
        <div className="mb-4 flex items-center gap-2 text-xs text-[#9aa5b4]">
          <button
            onClick={() => setShowEmpty(s => !s)}
            role="switch"
            aria-checked={showEmpty}
            className={`relative inline-flex h-4 w-8 rounded-full transition-colors focus:ring-2 focus:ring-[#1a56db] focus:ring-offset-1 ${showEmpty ? 'bg-[#1a3a5c]' : 'bg-[#d1d9e0]'}`}
          >
            <span className={`inline-block w-3 h-3 bg-white rounded-full shadow transition-transform mt-0.5 ${showEmpty ? 'translate-x-4' : 'translate-x-0.5'}`} />
          </button>
          <span>Preview empty state</span>
        </div>

        {/* Empty state */}
        {projects.length === 0 && <MyBusinessesEmpty onCreateNew={handleCreateNew} />}

        {/* Populated state */}
        {projects.length > 0 && (
          <>
            <PortfolioSummary projects={projects} />
            <SearchFilterToolbar
              search={search} setSearch={setSearch}
              stageFilter={stageFilter} setStageFilter={setStageFilter}
              statusFilter={statusFilter} setStatusFilter={setStatusFilter}
            />

            {filtered.length === 0 ? (
              <div className="bg-white border border-[#d1d9e0] rounded p-8 text-center">
                <p className="text-sm text-[#6b7a8d]">No businesses or projects match the current filters.</p>
                <button
                  onClick={() => { setSearch(''); setStageFilter('All Stages'); setStatusFilter('All') }}
                  className="mt-3 text-sm text-[#1a56db] hover:underline font-medium"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map(p => (
                  <BusinessProjectCard key={p.id} project={p} onOpen={handleOpen} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}

export function BusinessOverviewPage({ project }: { project: BusinessProject }) {
  return <EntrepreneurCommandCentre project={project} />
}
