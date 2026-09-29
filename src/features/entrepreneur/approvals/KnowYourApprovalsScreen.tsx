'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur'
import { useRegulatoryAssistant } from '@/features/regulatory-assistant/Provider'
import { inlineContext } from '@/features/regulatory-assistant/context'
import type { BusinessProject } from '../businesses/catalog'
import {
  listJourneyNodesForBusiness,
  buildJourneyNodes,
  journeyStateCfg,
  STAGES,
  type JourneyReq,
} from '../journey/data'
import { Icon } from '../public-auth/PublicChrome'

type ApprovalFilterCategory = 'all' | 'applicable' | 'ready' | 'under-review' | 'waiting' | 'conditional' | 'approved'

export function getApprovalsForBusiness(businessId: string, cteApproved: boolean = false): JourneyReq[] {
  const specific = listJourneyNodesForBusiness(businessId, cteApproved)
  if (specific.length > 0) return specific
  return buildJourneyNodes(cteApproved)
}

function getStageName(stageKey: string): string {
  const stage = STAGES.find(s => s.key === stageKey)
  return stage ? `Stage ${stage.num} · ${stage.label}` : stageKey
}

function getFullDepartmentName(deptShort: string): string {
  const map: Record<string, string> = {
    MPCB: 'Maharashtra Pollution Control Board (MPCB)',
    MIDC: 'Maharashtra Industrial Development Corporation (MIDC)',
    Fire: 'Maharashtra Fire Services Directorate',
    DISH: 'Directorate of Industrial Safety & Health (DISH)',
    'Planning Authority': 'Special Planning Authority (SPA / MIDC)',
    'MSEDCL / MIDC': 'Maharashtra State Electricity Distribution Co. (MSEDCL)',
    'Competent Authority': 'Groundwater Surveys & Development Agency (GSDA)',
    'Local Authority / ULB': 'Local Municipal Authority / Gram Panchayat',
    'Directorate of Boilers': 'Directorate of Steam Boilers, Maharashtra',
  }
  return map[deptShort] ?? deptShort
}

export function KnowYourApprovalsScreen({ project }: { project: BusinessProject }) {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<ApprovalFilterCategory>('all')
  const [stageFilter, setStageFilter] = useState('all')
  const { openAssistant, pageContext } = useRegulatoryAssistant()

  const approvals = getApprovalsForBusiness(project.id, false)

  const counts = {
    total: approvals.length,
    applicable: approvals.filter(a => a.applicability === 'applicable').length,
    ready: approvals.filter(a => a.displayState === 'ready').length,
    underReview: approvals.filter(a => a.displayState === 'under-review' || a.displayState === 'in-progress').length,
    waiting: approvals.filter(a => a.displayState === 'waiting').length,
    conditional: approvals.filter(a => a.displayState === 'conditional' || a.applicability === 'conditional').length,
    approved: approvals.filter(a => a.displayState === 'approved').length,
  }

  const filteredApprovals = approvals.filter(req => {
    // Stage filter
    if (stageFilter !== 'all' && req.stage !== stageFilter) return false

    // Category filter
    if (categoryFilter === 'applicable' && req.applicability !== 'applicable') return false
    if (categoryFilter === 'ready' && req.displayState !== 'ready') return false
    if (categoryFilter === 'under-review' && !['under-review', 'in-progress', 'action-required', 'needs-verification'].includes(req.displayState)) return false
    if (categoryFilter === 'waiting' && req.displayState !== 'waiting') return false
    if (categoryFilter === 'conditional' && req.displayState !== 'conditional' && req.applicability !== 'conditional') return false
    if (categoryFilter === 'approved' && req.displayState !== 'approved') return false

    // Search query
    if (search.trim()) {
      const query = search.trim().toLowerCase()
      const deptFull = getFullDepartmentName(req.department).toLowerCase()
      const matchesSearch =
        req.service.toLowerCase().includes(query) ||
        req.department.toLowerCase().includes(query) ||
        deptFull.includes(query) ||
        req.id.toLowerCase().includes(query) ||
        req.stage.toLowerCase().includes(query)
      if (!matchesSearch) return false
    }

    return true
  })

  const stagesWithApprovals = STAGES.filter(stage => approvals.some(node => node.stage === stage.key))

  return (
    <main id="main-content" className="flex-1 bg-[#F9FAF2]" tabIndex={-1}>
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
        {/* Top Header & Action Buttons */}
        <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded bg-[#edf5ef] px-2.5 py-0.5 text-xs font-bold text-[#355E3B]">
                Statutory Approvals Directory
              </span>
              <span className="text-xs text-[#555C56]">· Reference Register</span>
            </div>
            <h1 className="text-xl font-bold text-[#355E3B]">Know Your Approvals</h1>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Link
              href={ENTREPRENEUR_ROUTES.journey(project.id)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#355E3B] bg-white px-3.5 py-2 text-xs font-bold text-[#355E3B] shadow-xs transition-colors hover:bg-[#edf5ef]"
            >
              <span>Switch to Regulatory Journey</span>
              <span aria-hidden="true">→</span>
            </Link>
            <button
              type="button"
              onClick={() => openAssistant({
                origin: 'inline',
                mode: 'entity',
                context: inlineContext(pageContext, {
                  pageType: 'know-your-approvals',
                  pageTitle: 'Know Your Approvals',
                  label: `${project.name} know your approvals`,
                  entities: { businessId: project.id },
                  recordTitle: project.name,
                }),
              })}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#355E3B] px-3.5 py-2 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#27472c]"
            >
              <Icon.Help />
              <span>Ask Regulatory Assistant</span>
            </button>
          </div>
        </div>

        {/* Selected Business Context Reference Card */}
        <section aria-labelledby="selected-business-heading" className="mb-6 overflow-hidden rounded-xl border border-[#d6dfd5] bg-white shadow-xs">
          <div className="border-b border-[#d6dfd5] bg-[#F9FAF2] px-5 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#355E3B]">Selected Business Context</span>
              <span className="rounded-full bg-[#355E3B] px-2 py-0.5 text-[10px] font-bold text-white">Active</span>
            </div>
            <Link href={ENTREPRENEUR_ROUTES.businesses()} className="text-xs font-semibold text-[#3d7a4d] hover:underline">
              Switch Business →
            </Link>
          </div>
          <div className="p-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#555C56]">Business Name</p>
              <h2 id="selected-business-heading" className="mt-0.5 text-base font-bold text-[#355E3B]">{project.name}</h2>
              <p className="text-xs text-[#555C56] truncate">{project.subtitle}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#555C56]">Industry / Sector</p>
              <p className="mt-0.5 text-sm font-semibold text-[#2B2B2B]">{project.industry}</p>
              <p className="text-xs text-[#555C56]">Red Category (High Pollution Index)</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#555C56]">Location</p>
              <p className="mt-0.5 text-sm font-semibold text-[#2B2B2B]">{project.location}</p>
              <p className="text-xs text-[#555C56]">MIDC Industrial Area Phase II</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#555C56]">Current Stage</p>
              <span className="mt-0.5 inline-flex rounded border border-[#d6dfd5] bg-[#F9FAF2] px-2.5 py-1 text-xs font-bold text-[#355E3B]">
                {project.stage}
              </span>
            </div>
          </div>
        </section>

        {/* Quick Filter Counters Bar */}
        <section aria-label="Approvals Directory Summary" className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <button
            type="button"
            onClick={() => setCategoryFilter('all')}
            className={`rounded-xl border p-3.5 text-left transition-all ${categoryFilter === 'all' ? 'border-[#355E3B] bg-[#edf5ef] ring-2 ring-[#355E3B]' : 'border-slate-200 bg-white hover:border-slate-300'}`}
          >
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#555C56]">All Approvals</p>
            <p className="mt-1 text-2xl font-bold text-[#355E3B]">{counts.total}</p>
          </button>

          <button
            type="button"
            onClick={() => setCategoryFilter('ready')}
            className={`rounded-xl border p-3.5 text-left transition-all ${categoryFilter === 'ready' ? 'border-[#6DAE7C] bg-[#edf5ef] ring-2 ring-[#6DAE7C]' : 'border-slate-200 bg-white hover:border-slate-300'}`}
          >
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#6DAE7C]">Ready to Apply</p>
            <p className="mt-1 text-2xl font-bold text-[#6DAE7C]">{counts.ready}</p>
          </button>

          <button
            type="button"
            onClick={() => setCategoryFilter('under-review')}
            className={`rounded-xl border p-3.5 text-left transition-all ${categoryFilter === 'under-review' ? 'border-[#6366F1] bg-[#EDE9FE] ring-2 ring-[#6366F1]' : 'border-slate-200 bg-white hover:border-slate-300'}`}
          >
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#3730A3]">Under Review</p>
            <p className="mt-1 text-2xl font-bold text-[#3730A3]">{counts.underReview}</p>
          </button>

          <button
            type="button"
            onClick={() => setCategoryFilter('waiting')}
            className={`rounded-xl border p-3.5 text-left transition-all ${categoryFilter === 'waiting' ? 'border-[#555C56] bg-[#F1F3F5] ring-2 ring-[#555C56]' : 'border-slate-200 bg-white hover:border-slate-300'}`}
          >
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#555C56]">Waiting on Prereq</p>
            <p className="mt-1 text-2xl font-bold text-[#555C56]">{counts.waiting}</p>
          </button>

          <button
            type="button"
            onClick={() => setCategoryFilter('conditional')}
            className={`rounded-xl border p-3.5 text-left transition-all ${categoryFilter === 'conditional' ? 'border-[#D4A017] bg-[#fdf8e6] ring-2 ring-[#D4A017]' : 'border-slate-200 bg-white hover:border-slate-300'}`}
          >
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#7a5807]">Conditional</p>
            <p className="mt-1 text-2xl font-bold text-[#7a5807]">{counts.conditional}</p>
          </button>

          <button
            type="button"
            onClick={() => setCategoryFilter('approved')}
            className={`rounded-xl border p-3.5 text-left transition-all ${categoryFilter === 'approved' ? 'border-[#166534] bg-[#F0FDF4] ring-2 ring-[#166534]' : 'border-slate-200 bg-white hover:border-slate-300'}`}
          >
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#166534]">Approved / Granted</p>
            <p className="mt-1 text-2xl font-bold text-[#166534]">{counts.approved}</p>
          </button>
        </section>

        {/* Search & Filter Toolbar */}
        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search approvals by name, code or authority</span>
            <span className="pointer-events-none absolute left-3 top-2.5 text-[#555C56]"><Icon.Search /></span>
            <input
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="Search approval name, authority (MPCB, MIDC, Fire, DISH), ID..."
              className="w-full rounded-lg border border-[#d6dfd5] bg-white py-2 pl-9 pr-3 text-sm text-[#2B2B2B] outline-none focus:ring-2 focus:ring-[#6DAE7C]"
            />
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={stageFilter}
              onChange={event => setStageFilter(event.target.value)}
              aria-label="Filter by project stage"
              className="rounded-lg border border-[#d6dfd5] bg-white px-3 py-2 text-sm text-[#4A4A4A] outline-none focus:ring-2 focus:ring-[#6DAE7C]"
            >
              <option value="all">All Stages</option>
              {stagesWithApprovals.map(stage => (
                <option key={stage.key} value={stage.key}>
                  Stage {stage.num} — {stage.label}
                </option>
              ))}
            </select>
            {(search || categoryFilter !== 'all' || stageFilter !== 'all') && (
              <button
                type="button"
                onClick={() => { setSearch(''); setCategoryFilter('all'); setStageFilter('all'); }}
                className="text-xs font-semibold text-[#3d7a4d] hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Structured Table Reference */}
        <div className="overflow-hidden rounded-xl border border-[#d6dfd5] bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs" aria-label="Approvals and Permissions Reference Table">
              <thead>
                <tr className="border-b border-[#d6dfd5] bg-[#F9FAF2] text-[#355E3B]">
                  <th scope="col" className="w-16 px-4 py-3.5 font-bold uppercase tracking-wider text-center">
                    Sr. No.
                  </th>
                  <th scope="col" className="min-w-[220px] px-4 py-3.5 font-bold uppercase tracking-wider">
                    Approval / Clearance
                  </th>
                  <th scope="col" className="min-w-[220px] px-4 py-3.5 font-bold uppercase tracking-wider">
                    Approving Department / Authority
                  </th>
                  <th scope="col" className="min-w-[150px] px-4 py-3.5 font-bold uppercase tracking-wider">
                    Stage
                  </th>
                  <th scope="col" className="min-w-[150px] px-4 py-3.5 font-bold uppercase tracking-wider">
                    Status / Applicability
                  </th>
                  <th scope="col" className="min-w-[200px] px-4 py-3.5 font-bold uppercase tracking-wider">
                    Prerequisites / Condition
                  </th>
                  <th scope="col" className="min-w-[170px] px-4 py-3.5 font-bold uppercase tracking-wider text-center">
                    Procedure / Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApprovals.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-sm text-[#555C56]">
                      <p className="font-semibold text-[#2B2B2B]">No approvals match the current filters.</p>
                      <button
                        type="button"
                        onClick={() => { setSearch(''); setCategoryFilter('all'); setStageFilter('all'); }}
                        className="mt-3 text-xs font-semibold text-[#3d7a4d] hover:underline"
                      >
                        Clear filters to see all statutory approvals
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredApprovals.map((req, index) => {
                    const cfg = journeyStateCfg(req.displayState)
                    const stageLabel = getStageName(req.stage)
                    const fullDept = getFullDepartmentName(req.department)

                    const prerequisites = req.dependencies
                      .filter(dep => dep.type !== 'none')
                      .map(dep => approvals.find(node => node.id === dep.reqId)?.service ?? dep.reqId)

                    return (
                      <tr key={req.id} className="hover:bg-[#F9FAF2] transition-colors">
                        {/* Sr. No. */}
                        <td className="px-4 py-4 text-center font-bold text-[#555C56] align-top">
                          {index + 1}
                        </td>

                        {/* Approval / Clearance */}
                        <td className="px-4 py-4 align-top">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-[#2B2B2B] text-[13px] leading-snug">
                              {req.service}
                            </span>
                            <span className="font-mono text-[11px] text-[#7A8696]">
                              ID: {req.id}
                            </span>
                            {req.approvalRef && (
                              <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-[#166534]">
                                <span>Ref:</span> {req.approvalRef}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Approving Department / Authority */}
                        <td className="px-4 py-4 align-top">
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold text-[#2B2B2B] leading-snug">
                              {fullDept}
                            </span>
                            <span className="inline-flex w-fit rounded bg-[#edf5ef] px-2 py-0.5 text-[10px] font-bold text-[#355E3B]">
                              {req.department}
                            </span>
                          </div>
                        </td>

                        {/* Stage */}
                        <td className="px-4 py-4 align-top">
                          <span className="inline-flex rounded border border-[#d6dfd5] bg-[#F9FAF2] px-2.5 py-1 text-[11px] font-semibold text-[#355E3B]">
                            {stageLabel}
                          </span>
                        </td>

                        {/* Status / Applicability */}
                        <td className="px-4 py-4 align-top">
                          <div className="flex flex-col gap-1">
                            <span className={`inline-flex w-fit items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${cfg.badgeCls}`}>
                              <span aria-hidden="true">{cfg.icon}</span>
                              <span>{cfg.label}</span>
                            </span>
                            {req.documents && (
                              <span className="text-[11px] text-[#555C56]">
                                Docs: {req.documents}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Prerequisites / Conditions */}
                        <td className="px-4 py-4 align-top text-xs text-[#555C56]">
                          {req.displayState === 'waiting' && prerequisites.length > 0 ? (
                            <div className="rounded bg-slate-50 p-2 text-slate-700">
                              <span className="font-bold text-[#2B2B2B]">Requires: </span>
                              <span>{prerequisites.join(', ')}</span>
                            </div>
                          ) : req.conditionReason ? (
                            <div className="rounded bg-[#fdf8e6] p-2 text-[#634805]">
                              <span className="font-bold">Rule: </span>
                              <span>{req.conditionReason}</span>
                            </div>
                          ) : req.displayState === 'approved' ? (
                            <span className="font-semibold text-[#166534]">
                              ✓ Requirement Fulfilled
                            </span>
                          ) : (
                            <span className="text-slate-400 italic">
                              Direct / No prerequisite
                            </span>
                          )}
                        </td>

                        {/* Procedure / Action */}
                        <td className="px-4 py-4 align-top text-center">
                          <div className="flex flex-col gap-1.5 items-center justify-center">
                            {req.displayState === 'ready' ? (
                              <Link
                                href={ENTREPRENEUR_ROUTES.newApplication(project.id)}
                                className="inline-flex w-full max-w-[130px] items-center justify-center rounded bg-[#355E3B] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#27472c] focus:ring-2 focus:ring-[#6DAE7C] shadow-2xs"
                              >
                                <span>Apply Now →</span>
                              </Link>
                            ) : null}
                            <Link
                              href={ENTREPRENEUR_ROUTES.requirement(project.id, req.id)}
                              className="inline-flex w-full max-w-[130px] items-center justify-center rounded border border-[#d6dfd5] bg-white px-3 py-1.5 text-xs font-semibold text-[#355E3B] hover:bg-[#edf5ef] transition-colors"
                            >
                              <span>View Details</span>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Summary */}
          <div className="border-t border-[#d6dfd5] bg-[#F9FAF2] px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-[#555C56]">
            <p>
              Showing <strong className="font-bold text-[#2B2B2B]">{filteredApprovals.length}</strong> of <strong className="font-bold text-[#2B2B2B]">{approvals.length}</strong> statutory approvals for {project.name}.
            </p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#166534]" />
                <span>Approved</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#6DAE7C]" />
                <span>Ready to Apply</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#D4A017]" />
                <span>Prerequisite / Conditional</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
