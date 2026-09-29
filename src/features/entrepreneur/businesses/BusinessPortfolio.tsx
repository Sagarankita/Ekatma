'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Icon } from '../public-auth/PublicChrome'
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur'
import { SAMPLE_PROJECTS, findBusinessProjectById, type BusinessProject, type JourneyState } from './catalog'
import { EntrepreneurCommandCentre } from '../overview/EntrepreneurCommandCentre'
import { listInspectionsForBusiness, listTrackerAppsForBusiness } from '../applications/data'
import { listComplianceForBusiness } from '../compliance/data'
import { listDocumentsForBusiness } from '../documents/data'

function attentionCount(project: BusinessProject): number {
  const applications = listTrackerAppsForBusiness(project.id).filter(application => Boolean(application.actionRequired)).length
  const compliance = listComplianceForBusiness(project.id).filter(obligation => obligation.status !== 'Compliant').length
  const inspections = listInspectionsForBusiness(project.id).filter(inspection => inspection.status === 'Scheduled' && Boolean(inspection.actionRequired)).length
  const documents = listDocumentsForBusiness(project.id).filter(document => document.availability === 'Missing').slice(0, 2).length
  return applications + compliance + inspections + documents
}

function AttentionBadge({ project }: { project: BusinessProject }) {
  const count = attentionCount(project)
  if (count > 0) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-800">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden="true" />
        {count} {count === 1 ? 'item' : 'items'}
      </span>
    )
  }

  if (project.journeyState === 'Compliance Due' || project.journeyState === 'Inspection Upcoming') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
        {project.journeyState}
      </span>
    )
  }

  return <span className="text-xs font-medium text-[#5C6470]">None</span>
}

function PortfolioRow({ project, onOpen }: { project: BusinessProject; onOpen: (id: string) => void }) {
  return (
    <article className="grid gap-3 border-b border-slate-100 px-4 py-4 last:border-b-0 hover:bg-[#F8FAFC] sm:px-5 md:grid-cols-3 md:items-start md:gap-4 lg:grid-cols-[1.25fr_1.25fr_1fr_0.9fr_0.9fr_auto] lg:items-center" aria-labelledby={`business-${project.id}`}>
      <div className="min-w-0">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#7A8696] lg:hidden">Business</p>
        <h2 id={`business-${project.id}`} className="text-sm font-bold text-[#20242A]">{project.name}</h2>
        {project.provenance ? <p title={`Internal demo record ${project.id}`} className="mt-1 text-xs font-semibold text-[#92400e]">Demo record</p> : null}
      </div>
      <div className="min-w-0">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#7A8696] lg:hidden">Project</p>
        <p className="text-sm text-[#374151]">{project.subtitle}</p>
      </div>
      <div className="min-w-0">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#7A8696] lg:hidden">Location</p>
        <p className="flex items-start gap-1.5 text-sm text-[#5C6470]"><span className="mt-0.5 shrink-0 text-[#8B97A6]"><Icon.MapPin /></span>{project.location}</p>
      </div>
      <div>
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#7A8696] lg:hidden">Current Stage</p>
        <span className="inline-flex rounded border border-[#C8D6E4] bg-[#F0F4F8] px-2 py-1 text-xs font-semibold text-[#17365D]">{project.stage}</span>
      </div>
      <div>
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#7A8696] lg:hidden">Attention Required</p>
        <AttentionBadge project={project} />
      </div>
      <div>
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#7A8696] lg:hidden">Primary Action</p>
        <button
          onClick={() => onOpen(project.id)}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded bg-[#17365D] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0F2540] focus:ring-2 focus:ring-[#1A56DB] focus:ring-offset-2 lg:w-auto"
          aria-label={`Open business: ${project.name}`}
        >
          Enter Business
          <Icon.ChevronRight />
        </button>
      </div>
    </article>
  )
}

function SearchFilterToolbar({ search, setSearch, stageFilter, setStageFilter, statusFilter, setStatusFilter }: {
  search: string
  setSearch: (value: string) => void
  stageFilter: string
  setStageFilter: (value: string) => void
  statusFilter: string
  setStatusFilter: (value: string) => void
}) {
  const stages = ['All Stages', 'Planning', 'Land Acquisition', 'Pre-Establishment', 'Construction', 'Installation', 'Trial Production', 'Ready to Operate', 'Operational']
  const statuses: Array<'All' | JourneyState> = ['All', 'Action Required', 'In Progress', 'Under Review', 'Inspection Upcoming', 'Compliance Due', 'No Immediate Action']

  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
      <label className="relative min-w-0 flex-1">
        <span className="sr-only">Search businesses or projects</span>
        <span className="pointer-events-none absolute left-3 top-2.5 text-[#8B97A6]"><Icon.Search /></span>
        <input
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder="Search business, project or location"
          className="w-full rounded border border-[#D1D9E0] bg-white py-2 pl-9 pr-3 text-sm text-[#20242A] outline-none focus:ring-2 focus:ring-[#1A56DB]"
        />
      </label>
      <select value={stageFilter} onChange={event => setStageFilter(event.target.value)} aria-label="Filter by current stage" className="rounded border border-[#D1D9E0] bg-white px-3 py-2 text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#1A56DB]">
        {stages.map(stage => <option key={stage}>{stage}</option>)}
      </select>
      <select value={statusFilter} onChange={event => setStatusFilter(event.target.value)} aria-label="Filter by attention state" className="rounded border border-[#D1D9E0] bg-white px-3 py-2 text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#1A56DB]">
        {statuses.map(status => <option key={status}>{status}</option>)}
      </select>
    </div>
  )
}

function MyBusinessesEmpty({ onCreateNew }: { onCreateNew: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-[#D1D9E0] bg-white px-4 py-16 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F0F4F8] text-[#7A8696]"><Icon.Briefcase /></div>
      <h2 className="text-base font-semibold text-[#20242A]">You have not created a business or project yet.</h2>
      <p className="mt-2 max-w-md text-sm text-[#5C6470]">Create your first business or project to get started.</p>
      <button onClick={onCreateNew} className="mt-5 inline-flex items-center gap-2 rounded bg-[#17365D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0F2540] focus:ring-2 focus:ring-[#1A56DB] focus:ring-offset-2">
        <Icon.Plus />
        Create Your First Business / Project
      </button>
    </div>
  )
}

export function MyBusinessesPage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [stageFilter, setStageFilter] = useState('All Stages')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showEmpty, setShowEmpty] = useState(false)

  const projects = showEmpty ? [] : SAMPLE_PROJECTS
  const filtered = projects.filter(project => {
    const query = search.trim().toLowerCase()
    const matchesSearch = !query || [project.name, project.subtitle, project.location].some(value => value.toLowerCase().includes(query))
    const matchesStage = stageFilter === 'All Stages' || project.stage === stageFilter
    const matchesStatus = statusFilter === 'All' || project.journeyState === statusFilter
    return matchesSearch && matchesStage && matchesStatus
  })

  const handleOpen = (id: string) => {
    const project = findBusinessProjectById(id)
    if (project) router.push(ENTREPRENEUR_ROUTES.business(project.id))
  }

  const handleCreateNew = () => router.push(ENTREPRENEUR_ROUTES.newBusiness())

  return (
    <main id="main-content" className="flex-1 bg-[#F8F9FA]" tabIndex={-1}>
      <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6">
        <div className="mb-5 flex flex-col gap-4 border-b border-[#D1D9E0] pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#17365D]">My Businesses</h1>
            <p className="mt-1 text-sm text-[#5C6470]">Choose the business and project you want to work on.</p>
          </div>
          <button onClick={handleCreateNew} className="inline-flex items-center justify-center gap-2 rounded bg-[#17365D] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0F2540] focus:ring-2 focus:ring-[#1A56DB] focus:ring-offset-2">
            <Icon.Plus />
            Create New Business / Project
          </button>
        </div>

        {SAMPLE_PROJECTS.length > 0 ? (
          <SearchFilterToolbar search={search} setSearch={setSearch} stageFilter={stageFilter} setStageFilter={setStageFilter} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
        ) : null}

        <div className="mb-4 flex items-center gap-2 text-xs text-[#8B97A6]">
          <button onClick={() => setShowEmpty(value => !value)} role="switch" aria-checked={showEmpty} className={`relative inline-flex h-4 w-8 rounded-full transition-colors focus:ring-2 focus:ring-[#1A56DB] focus:ring-offset-1 ${showEmpty ? 'bg-[#17365D]' : 'bg-[#D1D9E0]'}`}>
            <span className={`mt-0.5 inline-block h-3 w-3 rounded-full bg-white shadow transition-transform ${showEmpty ? 'translate-x-4' : 'translate-x-0.5'}`} />
          </button>
          <span>Preview empty state</span>
        </div>

        {projects.length === 0 ? <MyBusinessesEmpty onCreateNew={handleCreateNew} /> : (
          <div className="overflow-hidden rounded-xl border border-[#D1D9E0] bg-white shadow-xs">
            <div className="hidden grid-cols-[1.25fr_1.25fr_1fr_0.9fr_0.9fr_auto] gap-4 border-b border-[#D1D9E0] bg-[#F4F6F8] px-5 py-3 lg:grid">
              {['Business', 'Project', 'Location', 'Current Stage', 'Attention Required', 'Primary Action'].map(label => <p key={label} className="text-[11px] font-bold uppercase tracking-wider text-[#5C6470]">{label}</p>)}
            </div>
            {filtered.length ? filtered.map(project => <PortfolioRow key={project.id} project={project} onOpen={handleOpen} />) : (
              <div className="px-5 py-10 text-center">
                <p className="text-sm text-[#5C6470]">No businesses or projects match the current filters.</p>
                <button onClick={() => { setSearch(''); setStageFilter('All Stages'); setStatusFilter('All') }} className="mt-3 text-sm font-semibold text-[#245B8A] hover:underline">Clear filters</button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

export function BusinessOverviewPage({ project }: { project: BusinessProject }) {
  return <EntrepreneurCommandCentre project={project} />
}
