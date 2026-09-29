'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur'
import { useRegulatoryAssistant } from '@/features/regulatory-assistant/Provider'
import { inlineContext } from '@/features/regulatory-assistant/context'
import type { BusinessProject } from '../businesses/catalog'
import {
  listJourneyNodesForBusiness,
  journeyStateCfg,
  stageDisplayState,
  getJourneySimulationStep,
  STAGES,
  type JourneyReq,
} from './data'

type RequirementGroup = {
  key: string
  title: string
  description: string
  states: JourneyReq['displayState'][]
}

const REQUIREMENT_GROUPS: RequirementGroup[] = [
  {
    key: 'active',
    title: 'Ready / In Progress',
    description: 'Requirements you can act on now or that are currently being processed.',
    states: ['ready', 'in-progress', 'action-required', 'under-review', 'inspection-scheduled', 'needs-verification', 'rejected'],
  },
  {
    key: 'conditional',
    title: 'Conditional',
    description: 'Requirements that apply only when the configured project conditions are met.',
    states: ['conditional'],
  },
  {
    key: 'waiting',
    title: 'Waiting for prerequisite',
    description: 'Requirements that will become available when their configured prerequisites are resolved.',
    states: ['waiting'],
  },
  {
    key: 'completed',
    title: 'Completed',
    description: 'Requirements already approved or completed for this project.',
    states: ['approved'],
  },
  {
    key: 'not-applicable',
    title: 'Not Applicable',
    description: 'Requirements excluded by the current project information.',
    states: ['not-applicable'],
  },
]

const STATE_SYMBOLS: Partial<Record<JourneyReq['displayState'], string>> = {
  approved: '✓',
  ready: '●',
  waiting: '◷',
  'action-required': '!',
}

function stageFor(req: JourneyReq) {
  return STAGES.find(stage => stage.key === req.stage)
}

function requirementAction(projectId: string, req: JourneyReq) {
  if (req.displayState === 'ready') {
    return { label: 'Start application', href: ENTREPRENEUR_ROUTES.newApplication(projectId) }
  }
  if (req.displayState === 'in-progress') {
    return { label: 'Continue application', href: ENTREPRENEUR_ROUTES.requirement(projectId, req.id) }
  }
  if (req.displayState === 'action-required' || req.displayState === 'needs-verification' || req.displayState === 'rejected') {
    return { label: 'Provide information', href: ENTREPRENEUR_ROUTES.requirement(projectId, req.id) }
  }
  return { label: 'View requirement', href: ENTREPRENEUR_ROUTES.requirement(projectId, req.id) }
}

function relationshipSummary(req: JourneyReq, allNodes: JourneyReq[]) {
  const prerequisiteNames = req.dependencies
    .filter(dependency => dependency.type !== 'none')
    .map(dependency => allNodes.find(node => node.id === dependency.reqId)?.service ?? dependency.reqId)

  const unlockedNames = (req.unlocks ?? [])
    .map(requirementId => allNodes.find(node => node.id === requirementId)?.service ?? requirementId)

  return { prerequisiteNames, unlockedNames }
}

function RequirementCard({ projectId, req, allNodes }: { projectId: string; req: JourneyReq; allNodes: JourneyReq[] }) {
  const cfg = journeyStateCfg(req.displayState)
  const stage = stageFor(req)
  const action = requirementAction(projectId, req)
  const { prerequisiteNames, unlockedNames } = relationshipSummary(req, allNodes)
  const stateSymbol = STATE_SYMBOLS[req.displayState] ?? cfg.icon

  return (
    <article className={`flex h-full flex-col rounded-xl border border-slate-200 border-l-4 ${cfg.border} ${cfg.bg} p-4`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#555C56]">
            {stage ? `Stage ${stage.num} · ${stage.label}` : req.stage}
          </p>
          <h3 className="mt-1 text-sm font-bold leading-snug text-[#2B2B2B]">{req.service}</h3>
          <p className="mt-1 text-xs text-[#555C56]">{req.department}</p>
        </div>
        <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-bold ${cfg.badgeCls}`}>
          <span aria-hidden="true">{stateSymbol}</span> {cfg.label}
        </span>
      </div>

      <div className="mt-4 flex-1 space-y-2 text-xs text-[#555C56]">
        {req.displayState === 'waiting' && prerequisiteNames.length > 0 && (
          <p><span className="font-bold text-[#2B2B2B]">Waiting for: </span>{prerequisiteNames.join(', ')}</p>
        )}
        {req.displayState === 'conditional' && req.conditionReason && (
          <p><span className="font-bold text-[#2B2B2B]">Applies when: </span>{req.conditionReason}</p>
        )}
        {req.displayState === 'not-applicable' && req.conditionReason && (
          <p><span className="font-bold text-[#2B2B2B]">Why it does not apply: </span>{req.conditionReason}</p>
        )}
        {req.displayState === 'approved' && req.approvalRef && (
          <p className="font-semibold text-[#2F7D4F]">{req.approvalRef}{req.approvedDate ? ` · ${req.approvedDate}` : ''}</p>
        )}
        {req.requiredAction && !['approved', 'not-applicable'].includes(req.displayState) && (
          <p><span className="font-bold text-[#2B2B2B]">What happens now: </span>{req.requiredAction}</p>
        )}
        {req.nextMilestone && (
          <p><span className="font-bold text-[#2B2B2B]">Next: </span>{req.nextMilestone}</p>
        )}
        {unlockedNames.length > 0 && (
          <p><span className="font-bold text-[#2B2B2B]">Unlocks: </span>{unlockedNames.join(', ')}</p>
        )}
      </div>

      <Link
        href={action.href}
        className={`mt-4 inline-flex min-h-10 items-center justify-center rounded-lg px-4 py-2 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-[#355E3B] focus:ring-offset-2 ${
          ['ready', 'action-required', 'needs-verification', 'rejected'].includes(req.displayState)
            ? 'bg-[#355E3B] text-white hover:bg-[#27472c]'
            : 'border border-slate-300 bg-white text-[#355E3B] hover:bg-[#edf5ef]'
        }`}
      >
        {action.label}
      </Link>
    </article>
  )
}

export function JourneyScreen({ project }: { project: BusinessProject }) {
  const [search, setSearch] = useState('')
  const [stageFilter, setStageFilter] = useState('all')
  const [simulatedApprovedIds, setSimulatedApprovedIds] = useState<string[]>([])
  const { openAssistant, pageContext } = useRegulatoryAssistant()

  const nodes = listJourneyNodesForBusiness(project.id, simulatedApprovedIds)
  const simStep = getJourneySimulationStep(nodes, simulatedApprovedIds)

  const handleSimulateNext = () => {
    if (simStep.nextReq) {
      setSimulatedApprovedIds(prev => [...prev, simStep.nextReq!.id])
    }
  }

  const handleResetSimulation = () => {
    setSimulatedApprovedIds([])
  }

  const searchableNodes = nodes.filter(node => {
    if (stageFilter !== 'all' && node.stage !== stageFilter) return false
    if (!search.trim()) return true
    const query = search.trim().toLowerCase()
    return node.service.toLowerCase().includes(query) || node.department.toLowerCase().includes(query)
  })

  const activeStage = STAGES.find(stage => {
    const state = stageDisplayState(nodes, stage.key)
    return state === 'Action Required' || state === 'In Progress' || state === 'Ready'
  }) ?? STAGES.find(stage => nodes.some(node => node.stage === stage.key && node.displayState === 'waiting'))

  const currentStageNodes = activeStage ? nodes.filter(node => node.stage === activeStage.key) : []
  const currentStageCounts = {
    complete: currentStageNodes.filter(node => node.displayState === 'approved').length,
    active: currentStageNodes.filter(node => ['ready', 'in-progress', 'action-required', 'under-review', 'inspection-scheduled', 'needs-verification', 'rejected'].includes(node.displayState)).length,
    waiting: currentStageNodes.filter(node => node.displayState === 'waiting').length,
    conditional: currentStageNodes.filter(node => node.displayState === 'conditional').length,
  }

  const stagesWithRequirements = STAGES.filter(stage => nodes.some(node => node.stage === stage.key))

  return (
    <main id="main-content" className="flex-1 bg-[#F9FAF2]" tabIndex={-1}>
      <div className="mx-auto max-w-[1120px] px-6 py-6">
        <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#355E3B]">Regulatory Journey</h1>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Link
              href={ENTREPRENEUR_ROUTES.dependencies(project.id)}
              className="rounded-lg bg-[#355E3B] px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#27472c]"
            >
              View Dependency Graph
            </Link>
            <button
              type="button"
              onClick={() => openAssistant({ origin: 'inline', mode: 'entity', context: inlineContext(pageContext, { pageType: 'regulatory-journey', pageTitle: 'Regulatory Journey', label: `${project.name} regulatory journey`, entities: { businessId: project.id }, recordTitle: project.name }) })}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-[#2B2B2B] shadow-xs transition-colors hover:bg-[#edf5ef]"
            >
              Ask Assistant
            </button>
          </div>
        </div>

        <section aria-labelledby="current-stage-heading" className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
          <div className="border-b border-slate-200 bg-[#edf5ef] px-5 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#555C56]">Current Project Stage</p>
            <h2 id="current-stage-heading" className="mt-0.5 text-base font-bold text-[#355E3B]">{project.stage}</h2>
          </div>
          <div className="grid gap-5 p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#555C56]">Stage Summary</p>
              <p className="mt-1 text-lg font-bold text-[#2B2B2B]">
                {activeStage ? `Stage ${activeStage.num} — ${activeStage.label} Steps` : 'No configured stage milestone'}
              </p>
              <p className="mt-1 text-xs text-[#555C56]">
                Requirements are grouped by what you can do, not forced into a single chronological checklist.
              </p>
            </div>
            {currentStageNodes.length > 0 && (
              <dl className="flex flex-wrap gap-x-5 gap-y-2 text-xs md:justify-end">
                <div><dt className="text-[#555C56]">Complete</dt><dd className="font-bold text-[#2F7D4F]">{currentStageCounts.complete}</dd></div>
                <div><dt className="text-[#555C56]">Active</dt><dd className="font-bold text-[#355E3B]">{currentStageCounts.active}</dd></div>
                <div><dt className="text-[#555C56]">Waiting</dt><dd className="font-bold text-[#555C56]">{currentStageCounts.waiting}</dd></div>
                <div><dt className="text-[#555C56]">Conditional</dt><dd className="font-bold text-[#8A5A13]">{currentStageCounts.conditional}</dd></div>
              </dl>
            )}
          </div>
        </section>

        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-end">
          <label className="flex-1 text-[11px] font-bold uppercase tracking-wider text-[#555C56]">
            Find a requirement
            <input
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-normal normal-case tracking-normal text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#355E3B]"
              placeholder="Search by requirement or department"
              value={search}
              onChange={event => setSearch(event.target.value)}
            />
          </label>
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#555C56] sm:w-64">
            Stage
            <select
              value={stageFilter}
              onChange={event => setStageFilter(event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-normal normal-case tracking-normal text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#355E3B]"
            >
              <option value="all">All configured stages</option>
              {stagesWithRequirements.map(stage => <option key={stage.key} value={stage.key}>Stage {stage.num} — {stage.label}</option>)}
            </select>
          </label>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-xs text-[#555C56]" aria-label="Requirement state guide">
          <span><strong className="text-[#2F7D4F]">✓</strong> Completed</span>
          <span><strong className="text-[#355E3B]">●</strong> Can proceed</span>
          <span><strong>◷</strong> Waiting</span>
          <span><strong className="text-[#C46A15]">!</strong> Action required</span>
          <span className="rounded-full bg-[#fdf8e6] px-2 py-0.5 font-semibold text-[#634805]">Conditional</span>
          <span className="rounded-full bg-[#F1F3F5] px-2 py-0.5 font-semibold">Not Applicable</span>
        </div>

        {nodes.length === 0 ? (
          <section className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-xs">
            <h2 className="text-base font-bold text-[#355E3B]">No configured requirements yet</h2>
            <p className="mt-2 text-sm text-[#555C56]">Requirements will appear here when the configured Dependency Graph identifies them for this project.</p>
          </section>
        ) : (
          <div className="space-y-7">
            {REQUIREMENT_GROUPS.map(group => {
              const groupNodes = searchableNodes.filter(node => group.states.includes(node.displayState))
              return (
                <section key={group.key} aria-labelledby={`${group.key}-heading`}>
                  <div className="mb-3 flex items-end justify-between gap-4">
                    <div>
                      <h2 id={`${group.key}-heading`} title={group.description} className="text-base font-bold text-[#355E3B]">{group.title}</h2>
                    </div>
                    <span className="shrink-0 text-xs font-bold text-[#555C56]">{groupNodes.length}</span>
                  </div>
                  {groupNodes.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                      {groupNodes.map(req => <RequirementCard key={req.id} projectId={project.id} req={req} allNodes={nodes} />)}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 text-xs text-[#555C56]">
                      {search || stageFilter !== 'all' ? 'No requirements in this group match the current search and stage filter.' : 'No requirements in this group.'}
                    </div>
                  )}
                </section>
              )
            })}
          </div>
        )}

        <div className="mt-7 rounded-xl border border-[#F8D4B0] bg-[#FDF4EB] p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#C46A15]">Prototype Demo</p>
                {simulatedApprovedIds.length > 0 && (
                  <span className="rounded-full bg-[#D4A017] px-2 py-0.5 text-[10px] font-bold text-white">
                    Step {simulatedApprovedIds.length} of {simStep.totalSteps}
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-[#8A4A12]">{simStep.description}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleSimulateNext}
                disabled={simStep.isComplete}
                className={`rounded-lg px-4 py-2 text-xs font-bold text-white transition-colors shadow-2xs ${
                  simStep.isComplete
                    ? 'bg-[#2F7D4F] opacity-90 cursor-default'
                    : simulatedApprovedIds.length > 0
                      ? 'bg-[#D4A017] hover:bg-[#C46A15]'
                      : 'bg-[#355E3B] hover:bg-[#27472c]'
                }`}
              >
                {simStep.buttonLabel}
              </button>
              {simulatedApprovedIds.length > 0 && (
                <button
                  type="button"
                  onClick={handleResetSimulation}
                  className="rounded-lg border border-[#C46A15] bg-white px-3 py-2 text-xs font-semibold text-[#8A4A12] hover:bg-[#FDF2E6] transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
