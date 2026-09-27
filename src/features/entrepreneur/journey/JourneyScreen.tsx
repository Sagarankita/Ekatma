'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur'
import { useRegulatoryAssistant } from '@/features/regulatory-assistant/Provider'
import { inlineContext } from '@/features/regulatory-assistant/context'
import type { BusinessProject } from '../businesses/catalog'
import {
  listJourneyNodesForBusiness,
  journeyStateCfg,
  stageDisplayState,
  STAGES,
  type JourneyReq,
} from './data'

function ReqNode({
  req,
  allNodes,
  onSelect,
  compact = false,
}: {
  req: JourneyReq
  allNodes: JourneyReq[]
  onSelect: (id: string) => void
  compact?: boolean
}) {
  const cfg = journeyStateCfg(req.displayState)
  const prereqs = req.dependencies
    .map(d => allNodes.find(n => n.id === d.reqId))
    .filter(Boolean) as JourneyReq[]

  return (
    <button
      type="button"
      onClick={() => onSelect(req.id)}
      className={`w-full text-left rounded-xl border-l-4 ${cfg.border} border border-slate-200 ${cfg.bg} p-4 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#17365D]`}
      aria-label={`${req.service} — ${cfg.label}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-[#5C6470] uppercase tracking-wider truncate">{req.department}</p>
          <p className={`text-[13px] font-bold ${cfg.textCls} leading-snug`}>{req.service}</p>
        </div>
        <span className={`shrink-0 text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${cfg.badgeCls}`}>
          {cfg.icon} {cfg.label}
        </span>
      </div>

      {req.displayState === 'waiting' && prereqs.length > 0 && (
        <div className="mt-1 mb-2 text-xs text-[#5C6470]">
          <span className="font-semibold">Waiting for: </span>
          {prereqs.map(p => `${p.department} — ${p.service}`).join(', ')}
        </div>
      )}

      {(req.displayState === 'conditional' || req.displayState === 'not-applicable') && req.conditionReason && (
        <p className="text-xs text-[#5C6470] mb-2 italic">{req.conditionReason}</p>
      )}

      {req.displayState === 'approved' && req.approvalRef && (
        <p className="text-xs text-[#2F7D4F] mb-2 font-medium">Ref: {req.approvalRef} · {req.approvedDate}</p>
      )}

      {req.requiredAction && req.displayState !== 'approved' && req.displayState !== 'not-applicable' && (
        <p className="text-xs font-semibold text-[#20242A] mb-1">→ {req.requiredAction}</p>
      )}

      {!compact && (
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {req.slaRemaining && <span className="text-[11px] text-[#5C6470]">SLA: {req.slaRemaining}</span>}
          {req.documents && <span className="text-[11px] text-[#5C6470]">Docs: {req.documents}</span>}
          {req.nextMilestone && <span className="text-[11px] text-[#5C6470]">Next: {req.nextMilestone}</span>}
        </div>
      )}

      {req.displayState === 'approved' && req.unlocks && req.unlocks.length > 0 && !compact && (
        <div className="mt-2 text-[11px] text-[#2F7D4F]">
          <span className="font-semibold">Unlocks: </span>
          {req.unlocks.map(uid => {
            const un = allNodes.find(n => n.id === uid)
            return un ? un.service : uid
          }).join(', ')}
        </div>
      )}
    </button>
  )
}

export function JourneyScreen({ project }: { project: BusinessProject }) {
  const router = useRouter()
  const [filter, setFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [showNA, setShowNA] = useState(false)
  const [cteApproved, setCteApproved] = useState(false)
  const { openAssistant, pageContext } = useRegulatoryAssistant()
  // Kept false until the legacy markup is removed; all live triggers use the shared drawer.
  const assistantOpen = false
  const setAssistantOpen = (_open: boolean) => undefined

  const nodes = listJourneyNodesForBusiness(project.id, cteApproved)

  const applicable = nodes.filter(n => n.applicability !== 'not-applicable')
  const totalCount = applicable.length
  const readyCount = applicable.filter(n => n.displayState === 'ready').length
  const inProgressCount = applicable.filter(n => n.displayState === 'in-progress' || n.displayState === 'under-review').length
  const blockedCount = applicable.filter(n => n.displayState === 'waiting').length
  const actionCount = applicable.filter(n => n.displayState === 'action-required').length
  const approvedCount = applicable.filter(n => n.displayState === 'approved').length

  const summaryMetrics = [
    { label: 'Total Identified', val: totalCount, cls: 'text-[#20242A]' },
    { label: 'Ready Now', val: readyCount, cls: 'text-[#17365D]' },
    { label: 'In Progress', val: inProgressCount, cls: 'text-[#245B8A]' },
    { label: 'Blocked', val: blockedCount, cls: 'text-[#5C6470]' },
    { label: 'Action Required', val: actionCount, cls: 'text-[#C46A15]' },
    { label: 'Approved', val: approvedCount, cls: 'text-[#2F7D4F]' },
  ]

  const filterFn = (n: JourneyReq) => {
    if (!showNA && n.displayState === 'not-applicable') return false
    if (search) {
      const q = search.toLowerCase()
      if (!n.service.toLowerCase().includes(q) && !n.department.toLowerCase().includes(q)) return false
    }
    if (filter === 'ready') return n.displayState === 'ready'
    if (filter === 'action-required') return n.displayState === 'action-required'
    if (filter === 'in-progress') return n.displayState === 'in-progress' || n.displayState === 'under-review'
    if (filter === 'blocked') return n.displayState === 'waiting'
    if (filter === 'approved') return n.displayState === 'approved'
    if (filter === 'needs-verification') return n.displayState === 'needs-verification'
    return true
  }

  const handleSelectReq = (reqId: string) => {
    router.push(ENTREPRENEUR_ROUTES.requirement(project.id, reqId))
  }

  return (
    <main id="main-content" className="flex-1 bg-[#F8F9FA]" tabIndex={-1}>
      <div className="max-w-[900px] mx-auto px-6 py-6">
        {/* Breadcrumb */}
        <div className="mb-4">
          <nav className="text-xs text-[#5C6470] flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href={ENTREPRENEUR_ROUTES.businesses()} className="hover:text-[#17365D] hover:underline">My Businesses</Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#17365D] hover:underline">{project.name}</Link>
            <span>›</span>
            <span className="text-[#17365D] font-bold">Regulatory Journey</span>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-5 pb-4 border-b border-slate-200 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#17365D]">Regulatory Journey</h1>
            <p className="text-xs text-[#5C6470] mt-1">
              Your personalised regulatory journey based on the confirmed Business Profile and applicable regulatory rules.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Link
              href={ENTREPRENEUR_ROUTES.dependencies(project.id)}
              className="text-xs border border-[#245B8A] bg-white text-[#245B8A] px-3.5 py-2 rounded-lg hover:bg-[#F0F5FA] hover:text-[#17365D] font-semibold transition-colors shadow-xs"
            >
              Dependency View
            </Link>
            <button
              type="button"
              onClick={() => openAssistant({ origin: 'inline', mode: 'entity', context: inlineContext(pageContext, { pageType: 'regulatory-journey', pageTitle: 'Regulatory Journey', label: `${project.name} regulatory journey`, entities: { businessId: project.id }, recordTitle: project.name }) })}
              className="text-xs border border-slate-200 bg-white text-[#20242A] px-3.5 py-2 rounded-lg hover:bg-[#F0F5FA] font-semibold transition-colors shadow-xs"
            >
              Ask Assistant
            </button>
          </div>
        </div>

        {/* Demo toggle */}
        <div className="mb-5 p-3.5 bg-[#FDF4EB] border border-[#F8D4B0] rounded-xl flex items-center gap-3">
          <span className="text-[10px] font-bold text-[#C46A15] uppercase tracking-wider">Prototype Demo</span>
          <button
            type="button"
            onClick={() => setCteApproved(v => !v)}
            className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${cteApproved ? 'bg-[#2F7D4F] text-white' : 'bg-[#17365D] text-white'}`}
          >
            {cteApproved ? '✓ CTE Approved (click to reset)' : 'Simulate CTE Approval →'}
          </button>
          <span className="text-[11px] text-[#C46A15]">Simulates E09 ↔ E13 state transition</span>
        </div>

        {/* Project context strip */}
        <div className="mb-6 p-5 bg-white border border-slate-200 rounded-xl shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Project', value: project.name },
            { label: 'Industry', value: project.industry },
            { label: 'Stage', value: project.stage },
            { label: 'Business DNA', value: 'Version 1' },
          ].map(f => (
            <div key={f.label}>
              <p className="text-[10px] font-bold text-[#5C6470] uppercase tracking-wider">{f.label}</p>
              <p className="text-xs font-bold text-[#20242A] mt-0.5 truncate">{f.value}</p>
            </div>
          ))}
          <div className="col-span-2 sm:col-span-4 flex gap-4 pt-3 border-t border-slate-100">
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="text-xs text-[#245B8A] hover:underline font-semibold">
              View Business Profile
            </Link>
            <Link href={ENTREPRENEUR_ROUTES.dossier(project.id)} className="text-xs text-[#245B8A] hover:underline font-semibold">
              View Master Project Dossier
            </Link>
            <Link href={ENTREPRENEUR_ROUTES.dependencies(project.id)} className="text-xs text-[#245B8A] hover:underline font-semibold">
              View Dependencies
            </Link>
          </div>
        </div>

        {/* Journey summary metrics */}
        <div className="mb-6 grid grid-cols-3 sm:grid-cols-6 gap-3">
          {summaryMetrics.map(m => (
            <div key={m.label} className="bg-white border border-slate-200 rounded-xl p-3.5 text-center shadow-xs">
              <p className={`text-2xl font-bold ${m.cls}`}>{m.val}</p>
              <p className="text-[11px] text-[#5C6470] font-semibold mt-0.5 leading-tight">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Filter + search bar */}
        <div className="flex flex-wrap gap-2.5 mb-5 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <input
              className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#17365D]"
              placeholder="Search by service or department"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <span className="absolute left-2.5 top-2.5 text-[#5C6470] text-xs">⌕</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              { k: 'all', l: 'All' },
              { k: 'ready', l: 'Ready Now' },
              { k: 'action-required', l: 'Action Required' },
              { k: 'in-progress', l: 'In Progress' },
              { k: 'blocked', l: 'Blocked' },
              { k: 'approved', l: 'Approved' },
            ].map(f => (
              <button
                key={f.k}
                type="button"
                onClick={() => setFilter(f.k)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-colors ${filter === f.k ? 'bg-[#17365D] text-white border-[#17365D]' : 'bg-white text-[#20242A] border-slate-200 hover:bg-[#F0F5FA]'}`}
              >
                {f.l}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setShowNA(!showNA)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-colors ${showNA ? 'bg-[#F1F3F5] text-[#5C6470] border-slate-200' : 'text-[#5C6470] border-slate-200 bg-white hover:bg-[#F0F5FA]'}`}
            >
              {showNA ? 'Hide N/A' : 'Show N/A'}
            </button>
          </div>
        </div>

        {/* Journey stages */}
        <div className="space-y-5">
          {STAGES.map(stage => {
            const stageNodes = nodes.filter(n => n.stage === stage.key && filterFn(n))
            const allStageNodes = nodes.filter(n => n.stage === stage.key)
            const stageSt = stageDisplayState(nodes, stage.key)
            const stCls: Record<string, string> = {
              'Complete': 'text-[#2F7D4F]',
              'In Progress': 'text-[#17365D]',
              'Action Required': 'text-[#C46A15]',
              'Ready': 'text-[#17365D]',
              'Waiting': 'text-[#5C6470]',
              'Upcoming': 'text-[#5C6470]',
            }
            if (stageNodes.length === 0 && allStageNodes.filter(filterFn).length === 0) return null
            const isEmpty = allStageNodes.length === 0

            return (
              <div key={stage.key} className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 bg-[#F8F9FA] border-b border-slate-200">
                  <span className="text-xs font-bold text-[#5C6470] w-6">{stage.num}</span>
                  <h2 className="text-[13px] font-bold text-[#17365D] uppercase tracking-wider flex-1">{stage.label}</h2>
                  <span className={`text-xs font-semibold ${stCls[stageSt] ?? 'text-[#5C6470]'}`}>{stageSt}</span>
                </div>
                <div className="p-4">
                  {isEmpty ? (
                    <p className="text-xs text-[#5C6470] italic">
                      {stage.key === 'compliance' ? 'Compliance obligations will appear here after approvals are granted.' : 'No requirements identified for this stage.'}
                    </p>
                  ) : stageNodes.length === 0 ? (
                    <p className="text-xs text-[#5C6470] italic">No requirements match the current filter.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {stageNodes.map(req => (
                        <ReqNode key={req.id} req={req} allNodes={nodes} onSelect={handleSelectReq} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Back */}
        <div className="mt-6 pt-4 border-t border-slate-200">
          <Link
            href={ENTREPRENEUR_ROUTES.business(project.id)}
            className="inline-block border border-slate-200 bg-white text-[#20242A] text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-[#F0F5FA] transition-colors shadow-xs"
          >
            ← Back to Overview
          </Link>
        </div>
      </div>

      {/* Ask Assistant */}
      {assistantOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/30" onClick={() => setAssistantOpen(false)} />
          <div className="relative bg-white w-80 h-full shadow-2xl flex flex-col border-l border-[#d1d9e0]">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#e8edf2] bg-[#f8f9fb]">
              <div className="w-7 h-7 rounded-full bg-[#1a3a5c] flex items-center justify-center text-white text-xs">?</div>
              <div className="flex-1">
                <p className="text-xs font-bold text-[#1a2533]">EKATMA Regulatory Assistant</p>
                <p className="text-[10px] text-[#6b7a8d]">Regulatory Journey context</p>
              </div>
              <button type="button" onClick={() => setAssistantOpen(false)} className="text-[#9aa5b4] text-lg leading-none">✕</button>
            </div>
            <div className="flex-1 p-4 space-y-2">
              {['Why is Building Plan locked?', 'What does CTE mean?', 'What must happen before this unlocks?', 'Why is this approval shown?'].map(q => (
                <button key={q} type="button" className="w-full text-left text-xs px-3 py-2.5 border border-[#d1d9e0] rounded hover:bg-[#f0f4f8] text-[#374151]">{q}</button>
              ))}
            </div>
            <div className="p-4 border-t border-[#e8edf2]">
              <div className="flex gap-2">
                <input className="flex-1 text-sm border border-[#d1d9e0] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a56db]" placeholder="Ask a question…" />
                <button type="button" className="px-3 py-2 bg-[#1a3a5c] text-white text-sm rounded">Send</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
