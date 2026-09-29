'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur'
import type { BusinessProject } from '../businesses/catalog'
import { getDossierRows, type DossierRow, type VerificationState } from './data'
import { Icon } from '../public-auth/PublicChrome'

type DossierFilter = 'all' | 'provided' | 'verified' | 'existing-record' | 'needs-verification' | 'not-applicable'

const entrepreneurSources = new Set(['Create Business / Project', 'Business Discovery', 'Basic Requirements'])

function matchesFilter(row: DossierRow, filter: DossierFilter): boolean {
  if (filter === 'all') return true
  if (filter === 'provided') return entrepreneurSources.has(row.source) && ['Self-Declared', 'User Confirmed'].includes(row.verification)
  if (filter === 'verified') return ['Department Verified', 'System Verified'].includes(row.verification)
  if (filter === 'existing-record') return !entrepreneurSources.has(row.source) && row.verification !== 'Not Applicable'
  if (filter === 'needs-verification') return row.verification === 'Needs Verification'
  return row.verification === 'Not Applicable'
}

function VerificationBadge({ state }: { state: VerificationState }) {
  const styles: Record<VerificationState, string> = {
    'Self-Declared': 'border-[#BBF7D0] bg-[#F0FDF4] text-[#166534]',
    'User Confirmed': 'border-[#BBF7D0] bg-[#F0FDF4] text-[#166534]',
    'Department Verified': 'border-[#86EFAC] bg-[#F0FDF4] text-[#166534]',
    'System Verified': 'border-[#86EFAC] bg-[#F0FDF4] text-[#166534]',
    'Needs Verification': 'border-[#B8D0F5] bg-[#EBF3FF] text-[#17365D]',
    'Not Applicable': 'border-[#D1D9E0] bg-[#F8F9FB] text-[#6B7A8D]',
  }
  return <span className={`inline-flex rounded border px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${styles[state]}`}>{state}</span>
}

function DossierField({ row, project }: { row: DossierRow; project: BusinessProject }) {
  return (
    <details className="group border-b border-slate-100 last:border-b-0">
      <summary className="grid cursor-pointer list-none gap-3 px-4 py-4 hover:bg-[#F8FAFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1A56DB] sm:px-5 md:grid-cols-[1fr_1.25fr_1fr_0.9fr_auto] md:items-center">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8B97A6] md:hidden">Field</p>
          <p className="text-sm font-bold text-[#20242A]">{row.field}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8B97A6] md:hidden">Current value</p>
          <p className={`text-sm ${row.verification === 'Not Applicable' ? 'italic text-[#8B97A6]' : 'font-medium text-[#20242A]'}`}>{row.value}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8B97A6] md:hidden">Source</p>
          <p className="text-xs text-[#5C6470]">Source: {row.source}</p>
        </div>
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#8B97A6] md:hidden">Verification state</p>
          <VerificationBadge state={row.verification} />
        </div>
        <span className="flex items-center gap-1 text-xs font-semibold text-[#245B8A]">
          Provenance
          <span className="transition-transform group-open:rotate-180"><Icon.ChevronDown /></span>
        </span>
      </summary>
      <div className="border-t border-slate-100 bg-[#F8FAFC] px-4 py-4 sm:px-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <div><p className="text-[10px] font-bold uppercase tracking-wider text-[#8B97A6]">Last updated</p><p className="mt-1 text-sm text-[#374151]">{row.lastUpdated}</p></div>
          <div><p className="text-[10px] font-bold uppercase tracking-wider text-[#8B97A6]">Used by</p><p className="mt-1 text-sm text-[#374151]">{row.usedBy ? `${row.usedBy} regulatory records` : 'No active records'}</p></div>
          <div><p className="text-[10px] font-bold uppercase tracking-wider text-[#8B97A6]">Business DNA version</p><p className="mt-1 text-sm text-[#374151]">Version {row.version}</p></div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href={`${ENTREPRENEUR_ROUTES.provenance(project.id)}?field=${encodeURIComponent(row.field)}`} className="rounded border border-[#B8C6D4] bg-white px-3 py-2 text-xs font-semibold text-[#17365D] hover:bg-[#F0F5FA]">View full Data Provenance</Link>
          <Link href={ENTREPRENEUR_ROUTES.changes(project.id)} className="inline-flex items-center rounded border border-[#B8C6D4] bg-white px-3 py-2 text-xs font-semibold text-[#17365D] hover:bg-[#F0F5FA]">Edit this information</Link>
        </div>
      </div>
    </details>
  )
}

export function DossierScreen({ project }: { project: BusinessProject }) {
  const [filter, setFilter] = useState<DossierFilter>('all')
  const [search, setSearch] = useState('')
  const rows = getDossierRows(project)
  const filtered = rows.filter(row => {
    const query = search.trim().toLowerCase()
    return matchesFilter(row, filter) && (!query || [row.field, row.value, row.source].some(value => value.toLowerCase().includes(query)))
  })
  const groups = [...new Set(filtered.map(row => row.group))]

  const filters: Array<{ id: DossierFilter; label: string }> = [
    { id: 'all', label: 'All' },
    { id: 'provided', label: 'What I Told EKATMA' },
    { id: 'verified', label: 'What EKATMA Verified' },
    { id: 'existing-record', label: 'What Came From an Existing Record' },
    { id: 'needs-verification', label: 'What Still Needs Verification' },
    { id: 'not-applicable', label: 'What Does Not Apply' },
  ]

  return (
    <main id="main-content" className="flex-1 bg-[#F8F9FA]" tabIndex={-1}>
      <div className="mx-auto max-w-[1080px] px-4 py-6 sm:px-6">
        <div className="mb-5 flex flex-col gap-4 border-b border-[#D1D9E0] pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#17365D]">Master Project Dossier</h1>
            <p className="mt-1 text-sm text-[#5C6470]">Review the Business DNA information EKATMA uses for this project.</p>
          </div>
          <Link href={ENTREPRENEUR_ROUTES.changes(project.id)} className="inline-flex items-center justify-center rounded bg-[#17365D] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0F2540]">Edit business information</Link>
        </div>

        <div className="mb-5 flex items-start gap-2 rounded border border-[#F8D4B0] bg-[#FDF4EB] px-4 py-3 text-sm text-[#92400E]">
          <span className="mt-0.5 shrink-0"><Icon.Warning /></span>
          <p className="font-medium">Changing this information may change the approvals identified for your project.</p>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2 lg:grid-cols-5" aria-label="Business DNA information states">
          {filters.slice(1).map(item => (
            <button key={item.id} type="button" onClick={() => setFilter(item.id)} className={`rounded border px-3 py-2 text-left text-[11px] font-bold uppercase tracking-wide transition-colors ${filter === item.id ? 'border-[#17365D] bg-[#17365D] text-white' : 'border-[#D1D9E0] bg-white text-[#374151] hover:border-[#9FB0C2]'}`}>{item.label}</button>
          ))}
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search Business DNA fields</span>
            <span className="pointer-events-none absolute left-3 top-2.5 text-[#8B97A6]"><Icon.Search /></span>
            <input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search field, value or source" className="w-full rounded border border-[#D1D9E0] bg-white py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-[#1A56DB]" />
          </label>
          {filter !== 'all' ? <button type="button" onClick={() => setFilter('all')} className="rounded border border-[#D1D9E0] bg-white px-3 py-2 text-sm font-semibold text-[#374151] hover:bg-[#F0F4F8]">Show all fields</button> : null}
        </div>

        {groups.length ? groups.map(group => (
          <section key={group} className="mb-4 overflow-hidden rounded-xl border border-[#D1D9E0] bg-white shadow-xs" aria-labelledby={`dossier-${group.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`}>
            <div className="border-b border-[#D1D9E0] bg-[#F4F6F8] px-5 py-3">
              <h2 id={`dossier-${group.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`} className="text-xs font-bold uppercase tracking-wider text-[#17365D]">{group}</h2>
            </div>
            <div className="hidden grid-cols-[1fr_1.25fr_1fr_0.9fr_auto] gap-3 border-b border-slate-100 px-5 py-2.5 md:grid">
              {['Field', 'Current value', 'Source', 'Verification state', ''].map((label, index) => <p key={`${label}-${index}`} className="text-[10px] font-bold uppercase tracking-wider text-[#8B97A6]">{label}</p>)}
            </div>
            {filtered.filter(row => row.group === group).map(row => <DossierField key={row.field} row={row} project={project} />)}
          </section>
        )) : (
          <div className="rounded-xl border border-[#D1D9E0] bg-white px-5 py-10 text-center text-sm text-[#5C6470]">No Business DNA fields match this view.</div>
        )}

        <div className="mt-5 flex flex-wrap gap-3 border-t border-[#D1D9E0] pt-5">
          <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="rounded border border-[#D1D9E0] bg-white px-5 py-2.5 text-sm font-semibold text-[#374151] hover:bg-[#F0F4F8]">Back to Overview</Link>
          <Link href={ENTREPRENEUR_ROUTES.journey(project.id)} className="rounded bg-[#17365D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0F2540]">View Regulatory Journey</Link>
        </div>
      </div>
    </main>
  )
}
