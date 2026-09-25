'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur'
import type { BusinessProject } from '../businesses/catalog'
import { getDossierRows, type DossierRow } from './data'
import { Icon } from '../public-auth/PublicChrome'

export function DossierScreen({ project }: { project: BusinessProject }) {
  const router = useRouter()
  const [filter, setFilter] = useState<'all' | 'needs-verification' | 'verified' | 'self-declared'>('all')
  const [search, setSearch] = useState('')

  const rows = getDossierRows(project)

  const verificationBadge = (v: string) => {
    const map: Record<string, string> = {
      'Self-Declared': 'bg-[#f8f9fb] text-[#6b7a8d] border-[#d1d9e0]',
      'User Confirmed': 'bg-[#f0fdf4] text-[#166534] border-[#bbf7d0]',
      'Department Verified': 'bg-[#f0fdf4] text-[#166534] border-[#86efac]',
      'Needs Verification': 'bg-[#ebf3ff] text-[#1a3a5c] border-[#b8d0f5]',
      'System Verified': 'bg-[#f0fdf4] text-[#166534] border-[#bbf7d0]',
    }
    return <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${map[v] ?? 'bg-gray-100 text-gray-700'}`}>{v}</span>
  }

  const groups = [...new Set(rows.map(r => r.group))]
  const filtered = rows.filter(r => {
    if (search && !r.field.toLowerCase().includes(search.toLowerCase()) && !r.value.toLowerCase().includes(search.toLowerCase())) return false
    if (filter === 'needs-verification') return r.verification === 'Needs Verification'
    if (filter === 'verified') return r.verification === 'Department Verified' || r.verification === 'System Verified'
    if (filter === 'self-declared') return r.verification === 'Self-Declared' || r.verification === 'User Confirmed'
    return true
  })

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="max-w-[900px] mx-auto px-6 py-5">
        <div className="mb-4">
          <nav className="text-xs text-[#6b7a8d] flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href={ENTREPRENEUR_ROUTES.businesses()} className="hover:text-[#1a3a5c] hover:underline">My Businesses</Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#1a3a5c] hover:underline">{project.name}</Link>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">Master Project Dossier</span>
          </nav>
        </div>

        <div className="mb-4 pb-4 border-b border-[#d1d9e0]">
          <h1 className="text-2xl font-bold text-[#1a3a5c]">Master Project Dossier</h1>
          <p className="text-sm text-[#6b7a8d] mt-1">View and manage the reusable project information used across EKATMA services.</p>
        </div>

        {/* Project context */}
        <div className="mb-5 p-4 bg-white border border-[#d1d9e0] rounded shadow-sm grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Business / Project', value: project.name },
            { label: 'Business DNA Version', value: 'Version 1' },
            { label: 'Last Updated', value: '23 Sep 2026' },
            { label: 'Project Stage', value: project.stage },
            { label: 'Industry', value: project.industry },
            { label: 'Location', value: project.location },
          ].map(f => (
            <div key={f.label}>
              <p className="text-[10px] font-semibold text-[#9aa5b4] uppercase tracking-wider">{f.label}</p>
              <p className="text-sm font-semibold text-[#1a2533] mt-0.5 truncate">{f.value}</p>
            </div>
          ))}
        </div>

        {/* Search + filter */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex-1 min-w-[180px]">
            <div className="relative">
              <input
                className="w-full pl-8 pr-3 py-2 text-sm border border-[#d1d9e0] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
                placeholder="Search project data…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <span className="absolute left-2.5 top-2.5 text-[#9aa5b4] pointer-events-none">
                <Icon.Search />
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(['all', 'needs-verification', 'verified', 'self-declared'] as const).map(f => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`text-xs px-3 py-1.5 rounded border transition-colors ${filter === f ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'bg-white text-[#374151] border-[#d1d9e0] hover:border-[#a0b4cc]'}`}
              >
                {f === 'all' ? 'All' : f === 'needs-verification' ? 'Needs Verification' : f === 'verified' ? 'Verified' : 'Self-Declared'}
              </button>
            ))}
          </div>
        </div>

        {/* Data table */}
        {groups.map(group => {
          const groupRows = filtered.filter(r => r.group === group)
          if (groupRows.length === 0) return null

          return (
            <div key={group} className="mb-4 bg-white border border-[#d1d9e0] rounded shadow-sm overflow-hidden">
              <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#e8edf2]">
                <h2 className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">{group}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[#e8edf2]">
                      <th className="text-left px-4 py-2 text-[#9aa5b4] font-semibold uppercase tracking-wider w-40">Field</th>
                      <th className="text-left px-4 py-2 text-[#9aa5b4] font-semibold uppercase tracking-wider">Value</th>
                      <th className="text-left px-4 py-2 text-[#9aa5b4] font-semibold uppercase tracking-wider w-36">Source</th>
                      <th className="text-left px-4 py-2 text-[#9aa5b4] font-semibold uppercase tracking-wider w-36">Verification</th>
                      <th className="text-left px-4 py-2 text-[#9aa5b4] font-semibold uppercase tracking-wider w-20">Used By</th>
                      <th className="text-left px-4 py-2 text-[#9aa5b4] font-semibold uppercase tracking-wider w-28">Last Updated</th>
                      <th className="text-left px-4 py-2 w-24" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0f4f8]">
                    {groupRows.map(row => (
                      <tr key={row.field} className="hover:bg-[#f8f9fb]">
                        <td className="px-4 py-3 font-medium text-[#1a2533]">{row.field}</td>
                        <td className="px-4 py-3 text-[#374151]">{row.value}</td>
                        <td className="px-4 py-3 text-[#6b7a8d]">{row.source}</td>
                        <td className="px-4 py-3">{verificationBadge(row.verification)}</td>
                        <td className="px-4 py-3 text-[#1a56db] font-medium">{row.usedBy}</td>
                        <td className="px-4 py-3 text-[#9aa5b4]">{row.lastUpdated}</td>
                        <td className="px-4 py-3">
                          <Link
                            href={`${ENTREPRENEUR_ROUTES.provenance(project.id)}?field=${encodeURIComponent(row.field)}`}
                            className="text-[10px] text-[#1a56db] font-medium hover:underline whitespace-nowrap"
                          >
                            View Provenance
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        })}

        <div className="mt-4 flex items-center gap-3">
          <Link
            href={ENTREPRENEUR_ROUTES.business(project.id)}
            className="border border-[#d1d9e0] text-[#374151] text-sm font-medium px-5 py-2.5 rounded hover:bg-[#f0f4f8] transition-colors"
          >
            Back to Overview
          </Link>
          <Link
            href={ENTREPRENEUR_ROUTES.journey(project.id)}
            className="bg-[#1a3a5c] text-white text-sm font-semibold px-5 py-2.5 rounded hover:bg-[#0f2540] transition-colors"
          >
            View Regulatory Journey →
          </Link>
        </div>
      </div>
    </main>
  )
}
