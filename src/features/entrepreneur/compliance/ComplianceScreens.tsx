'use client';

import React, { useState } from 'react';
import { findComplianceById, type ComplianceObligation, type ComplianceStatus } from './data';
import { RegAssistantTrigger, type RegAssistantContext } from '../regulatory-assistant/Trigger';

const SOURCE_APPROVAL_UNAVAILABLE = 'Source approval unavailable until an exact business, application, and decision relationship is documented.';
const DOCUMENT_UNAVAILABLE = 'No document for this obligation is bound to the current business.';

function complianceStatusBadge(s: ComplianceStatus) {
  const map: Record<ComplianceStatus, string> = {
    'Compliant': 'border-[#86efac] bg-[#dcfce7] text-[#166534]',
    'Due Soon': 'border-[#fcd34d] bg-[#fef3c7] text-[#92400e]',
    'Overdue': 'border-[#fca5a5] bg-[#fee2e2] text-[#b91c1c]',
    'Action Required': 'border-[#fca5a5] bg-[#fee2e2] text-[#b91c1c]',
    'Under Verification': 'border-[#93c5fd] bg-[#dbeafe] text-[#1e40af]',
  }
  return <span className={`text-[10px] font-semibold px-1.5 py-0.5 border ${map[s]}`}>{s}</span>
}

// ── E24 ──────────────────────────────────────────────────────────────────────

export function E24CompliancePage({ obligations, canOpenDocuments = false, onBack, onGoToObligation, onGoToE23, onGoToE11, onOpenRegAssistant }: {
  obligations: ComplianceObligation[]
  canOpenDocuments?: boolean
  onBack: () => void
  onGoToObligation: (id: string) => void
  onGoToE23?: () => void
  onGoToE11: () => void
  onOpenRegAssistant?: (ctx: RegAssistantContext) => void
}) {
  const [view, setView] = useState<'list' | 'calendar'>('list')
  const [deptFilter, setDeptFilter] = useState('All')
  const [catFilter, setCatFilter] = useState('All')
  const [actionOnly, setActionOnly] = useState(false)

  const filtered = obligations.filter(o => {
    if (deptFilter !== 'All' && o.dept !== deptFilter) return false
    if (catFilter !== 'All' && o.category !== catFilter) return false
    if (actionOnly && !o.actionRequired) return false
    return true
  })

  const actionCount = obligations.filter(o => o.actionRequired).length
  const dueSoon = obligations.filter(o => o.status === 'Due Soon').length
  const overdue = obligations.filter(o => o.status === 'Overdue').length
  const renewals = obligations.filter(o => o.category === 'Renewals').length

  // Calendar: show Oct–Dec 2026 months with obligations plotted
  const calMonths = [
    { label: 'October 2026', year: 2026, month: 9 },
    { label: 'November 2026', year: 2026, month: 10 },
    { label: 'December 2026', year: 2026, month: 11 },
    { label: 'March 2027', year: 2027, month: 2 },
    { label: 'September 2027', year: 2027, month: 8 },
    { label: 'December 2027', year: 2027, month: 11 },
  ]

  function obligationsForMonth(year: number, month: number) {
    return obligations.filter(o => {
      if (o.dueDate === 'Ongoing') return false
      const d = new Date(o.dueDateMs)
      return d.getFullYear() === year && d.getMonth() === month
    })
  }

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
        <div className="max-w-[1280px] mx-auto">
          <nav className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5">
            <button onClick={onBack} className="hover:text-[#1a3a5c] hover:underline">Dashboard</button>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">Compliance Dashboard</span>
          </nav>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-[#1a3a5c]">Compliance Dashboard</h1>
              <p className="text-xs text-[#6b7a8d] mt-0.5">Sahyadri Bio-Pharma Pvt Ltd — Chakan Industrial Area Phase II</p>
            </div>
            {onOpenRegAssistant && (
              <RegAssistantTrigger lang="en" size="sm" onClick={() => onOpenRegAssistant({ entryPoint: 'compliance', initialQuestion: 'What is this compliance obligation?' })} />
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-5 space-y-4">
        {/* Summary tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: 'Action Required', value: actionCount, color: actionCount > 0 ? 'text-[#b91c1c]' : 'text-[#94a3b8]' },
            { label: 'Due Soon', value: dueSoon, color: dueSoon > 0 ? 'text-[#d97706]' : 'text-[#94a3b8]' },
            { label: 'Overdue', value: overdue, color: overdue > 0 ? 'text-[#b91c1c]' : 'text-[#94a3b8]' },
            { label: 'Renewals', value: renewals, color: 'text-[#1a3a5c]' },
            { label: 'Total Obligations', value: obligations.length, color: 'text-[#1a3a5c]' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-[#e2e8f0] px-4 py-3">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-[#6b7a8d] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Source notice */}
        <div className="bg-white border border-[#bfdbfe] border-l-4 border-l-[#1d4ed8] px-4 py-3 text-xs text-[#1e3a8a]">
          Compliance obligations below were generated from the conditions attached to your MPCB Consent to Establish approval ({' '}
          <button onClick={onGoToE23} disabled={!onGoToE23} title={!onGoToE23 ? SOURCE_APPROVAL_UNAVAILABLE : undefined} className="underline hover:text-[#1e40af] disabled:opacity-50 disabled:cursor-not-allowed">CTE-2026-MPCB-41872</button>
          {' '}) and other active approvals. {' '}
          <button onClick={onGoToE11} disabled={!canOpenDocuments} title={!canOpenDocuments ? DOCUMENT_UNAVAILABLE : undefined} className="underline hover:text-[#1e40af] disabled:opacity-50 disabled:cursor-not-allowed">View Document Centre</button>
          {!canOpenDocuments && <p className="mt-1 text-[#475569]">{DOCUMENT_UNAVAILABLE}</p>}
          {!onGoToE23 && <p className="mt-1 text-[#475569]">{SOURCE_APPROVAL_UNAVAILABLE}</p>}
        </div>

        {/* View toggle + Filters */}
        <div className="bg-white border border-[#e2e8f0] px-4 py-3 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex items-center gap-1 border border-[#d1d9e0]">
            <button onClick={() => setView('list')} className={`text-xs px-3 py-1.5 font-medium border-r border-[#d1d9e0] ${view === 'list' ? 'bg-[#1a3a5c] text-white' : 'text-[#475569] hover:bg-[#f1f5f9]'}`}>List</button>
            <button onClick={() => setView('calendar')} className={`text-xs px-3 py-1.5 font-medium ${view === 'calendar' ? 'bg-[#1a3a5c] text-white' : 'text-[#475569] hover:bg-[#f1f5f9]'}`}>Calendar</button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Department</label>
              <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="text-xs border border-[#d1d9e0] px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#1a56db]">
                {['All', 'MPCB', 'Fire', 'DISH'].map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Category</label>
              <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="text-xs border border-[#d1d9e0] px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#1a56db]">
                {['All', 'Environmental', 'Approval Conditions', 'Renewals', 'Periodic Returns'].map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
            <label className="flex items-center gap-1.5 text-xs text-[#475569] cursor-pointer">
              <input type="checkbox" checked={actionOnly} onChange={e => setActionOnly(e.target.checked)} className="accent-[#1a3a5c]" />
              Action Required only
            </label>
            {(deptFilter !== 'All' || catFilter !== 'All' || actionOnly) && (
              <button onClick={() => { setDeptFilter('All'); setCatFilter('All'); setActionOnly(false) }} className="text-xs text-[#b91c1c] hover:underline">Clear</button>
            )}
          </div>
        </div>

        {view === 'list' ? (
          <div className="bg-white border border-[#e2e8f0] overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-[#f8f9fb] border-b border-[#e2e8f0]">
                  {['Obligation', 'Department', 'Category', 'Due Date', 'Frequency', 'Status', 'Action Required'].map(h => (
                    <th key={h} className="text-left px-3 py-2.5 text-[10px] font-semibold text-[#64748b] uppercase tracking-wider border-r border-[#e8edf2] last:border-r-0 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="px-4 py-8 text-center text-[#94a3b8]">No obligations match the current filters.</td></tr>
                ) : filtered.map(o => (
                  <tr key={o.id} onClick={() => onGoToObligation(o.id)} className="border-b border-[#f1f5f9] hover:bg-[#f8f9fb] cursor-pointer">
                    <td className="px-3 py-2.5 border-r border-[#f1f5f9]">
                      <div>
                        <button className="font-medium text-[#1a3a5c] hover:underline text-left leading-snug">{o.name}</button>
                        <p className="text-[10px] font-mono text-[#94a3b8] mt-0.5">{o.id}</p>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-[#475569] border-r border-[#f1f5f9]">{o.dept}</td>
                    <td className="px-3 py-2.5 text-[#475569] border-r border-[#f1f5f9]">{o.category}</td>
                    <td className={`px-3 py-2.5 whitespace-nowrap font-medium border-r border-[#f1f5f9] ${o.status === 'Overdue' ? 'text-[#b91c1c]' : o.status === 'Due Soon' ? 'text-[#d97706]' : 'text-[#334155]'}`}>{o.dueDate}</td>
                    <td className="px-3 py-2.5 text-[#475569] border-r border-[#f1f5f9] whitespace-nowrap">{o.frequency}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap border-r border-[#f1f5f9]">{complianceStatusBadge(o.status)}</td>
                    <td className="px-3 py-2.5 min-w-[180px]">
                      {o.actionRequired
                        ? <span className="text-[#b91c1c] leading-snug">{o.actionRequired.split('.')[0]}.</span>
                        : <span className="text-[#94a3b8]">No action required</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // Calendar view
          <div className="bg-white border border-[#e2e8f0]">
            <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
              <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Upcoming Compliance Deadlines</p>
            </div>
            <div className="divide-y divide-[#f1f5f9]">
              {calMonths.map(m => {
                const obs = obligationsForMonth(m.year, m.month)
                if (obs.length === 0) return null
                return (
                  <div key={m.label} className="px-4 py-3">
                    <p className="text-xs font-semibold text-[#1a3a5c] mb-2">{m.label}</p>
                    <div className="space-y-1.5">
                      {obs.map(o => (
                        <div key={o.id} onClick={() => onGoToObligation(o.id)} className="flex items-center gap-3 cursor-pointer hover:bg-[#f8f9fb] px-2 py-1.5 -mx-2">
                          <div className="w-8 text-center shrink-0">
                            <p className="text-lg font-bold text-[#1a3a5c] leading-none">{new Date(o.dueDateMs).getDate()}</p>
                            <p className="text-[8px] text-[#94a3b8] uppercase">{new Date(o.dueDateMs).toLocaleString('en', { month: 'short' })}</p>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-[#1a3a5c] truncate">{o.name}</p>
                            <p className="text-[10px] text-[#94a3b8]">{o.dept} · {o.category}</p>
                          </div>
                          <div className="shrink-0">{complianceStatusBadge(o.status)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
              {/* Ongoing obligations */}
              <div className="px-4 py-3">
                <p className="text-xs font-semibold text-[#1a3a5c] mb-2">Ongoing</p>
                {obligations.filter(o => o.dueDate === 'Ongoing').map(o => (
                  <div key={o.id} onClick={() => onGoToObligation(o.id)} className="flex items-center gap-3 cursor-pointer hover:bg-[#f8f9fb] px-2 py-1.5 -mx-2">
                    <div className="w-8 text-center shrink-0">
                      <p className="text-[10px] text-[#94a3b8] font-semibold">—</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[#1a3a5c] truncate">{o.name}</p>
                      <p className="text-[10px] text-[#94a3b8]">{o.dept} · {o.frequency}</p>
                    </div>
                    <div className="shrink-0">{complianceStatusBadge(o.status)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

// ── E25 ──────────────────────────────────────────────────────────────────────

export function E25ComplianceDetailPage({ obligationId, canOpenDocuments = false, canOpenDocument, onBack, onGoToE24, onGoToE23, onGoToE11, onGoToDocDetail, onOpenRegAssistant }: {
  obligationId: string
  canOpenDocuments?: boolean
  canOpenDocument?: (id: string) => boolean
  onBack: () => void
  onGoToE24: () => void
  onGoToE23?: () => void
  onGoToE11: () => void
  onGoToDocDetail: (id: string) => void
  onOpenRegAssistant?: (ctx: RegAssistantContext) => void
}) {
  const obl = findComplianceById(obligationId) ?? (() => { throw new Error(`Unknown compliance obligation: ${obligationId}`) })()
  const [ragOpen, setRagOpen] = useState(false)
  const [ragInput, setRagInput] = useState('')
  const [ragMessages, setRagMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([])

  const SUGGESTED_PROMPTS = [
    'Why is this compliance obligation required?',
    'Which approval created it?',
    'What condition does it relate to?',
    'What documents are required?',
    'When is it due?',
    'What should I submit?',
  ]

  function handleRagSend(text: string) {
    if (!text.trim()) return
    const responses: Record<string, string> = {
      'Why is this compliance obligation required?': obl.whyRequired,
      'Which approval created it?': `This obligation originates from approval ${obl.sourceApprovalId}. The relevant condition is: "${obl.relevantCondition}"`,
      'What condition does it relate to?': `${obl.sourceCondition}: ${obl.relevantCondition}`,
      'What documents are required?': obl.requiredDocs.length ? obl.requiredDocs.map(d => d.name).join(', ') : 'No specific document upload is required for this obligation — maintain internal records per the condition.',
      'When is it due?': `Due: ${obl.dueDate}. Frequency: ${obl.frequency}.${obl.nextDueDate ? ` Next due: ${obl.nextDueDate}.` : ''}`,
      'What should I submit?': obl.actionRequired || 'No submission is currently required. This obligation is compliant.',
    }
    const reply = responses[text] || `For specific guidance on ${obl.name}, refer to the source approval and relevant regulatory rule, or contact the ${obl.dept} department directly.`
    setRagMessages(prev => [...prev, { role: 'user', text }, { role: 'assistant', text: reply }])
    setRagInput('')
  }

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
        <div className="max-w-[1100px] mx-auto">
          <nav className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5">
            <button onClick={onBack} className="hover:text-[#1a3a5c] hover:underline">Dashboard</button>
            <span>›</span>
            <button onClick={onGoToE24} className="hover:text-[#1a3a5c] hover:underline">Compliance Dashboard</button>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">Compliance Detail</span>
          </nav>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-[#1a3a5c]">{obl.name}</h1>
              <p className="text-xs text-[#6b7a8d] mt-0.5">{obl.dept} · {obl.category} · {obl.id}</p>
            </div>
            <div className="flex items-center gap-2">
              {complianceStatusBadge(obl.status)}
              {onOpenRegAssistant && (
                <RegAssistantTrigger lang="en" size="sm" onClick={() => onOpenRegAssistant({ entryPoint: 'compliance', recordId: obl.id, recordName: obl.name, department: obl.dept, initialQuestion: 'What is this compliance obligation?' })} />
              )}
              <button onClick={onGoToE24} className="text-sm border border-[#d1d9e0] text-[#475569] px-3 py-1.5 hover:bg-[#f1f5f9]">Back to Compliance</button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Action banner */}
          {obl.actionRequired && (
            <div className={`bg-white border-l-4 px-5 py-3 ${obl.status === 'Overdue' ? 'border border-[#fca5a5] border-l-[#b91c1c]' : 'border border-[#fcd34d] border-l-[#d97706]'}`}>
              <p className={`text-sm font-semibold ${obl.status === 'Overdue' ? 'text-[#b91c1c]' : 'text-[#92400e]'}`}>{obl.status}</p>
              <p className={`text-xs mt-0.5 ${obl.status === 'Overdue' ? 'text-[#b91c1c]' : 'text-[#92400e]'}`}>{obl.actionRequired}</p>
            </div>
          )}

          {/* Obligation information */}
          <div className="bg-white border border-[#e2e8f0]">
            <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
              <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Obligation Information</p>
            </div>
            <div className="divide-y divide-[#f1f5f9]">
              {[
                { label: 'Obligation ID', value: obl.id },
                { label: 'Obligation', value: obl.name },
                { label: 'Department', value: obl.dept },
                { label: 'Category', value: obl.category },
                { label: 'Due Date', value: obl.dueDate },
                { label: 'Frequency', value: obl.frequency },
                ...(obl.nextDueDate ? [{ label: 'Next Due Date', value: obl.nextDueDate }] : []),
                { label: 'Status', value: null as null, badge: complianceStatusBadge(obl.status) },
                { label: 'Verification', value: obl.verification, badge: null as null },
              ].map(r => (
                <div key={r.label} className="px-4 py-2.5 flex justify-between items-center text-sm gap-3">
                  <span className="text-[#6b7a8d] shrink-0">{r.label}</span>
                  {r.badge ?? <span className="text-[#334155] font-medium text-right">{r.value}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border border-[#e2e8f0]">
            <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
              <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">What This Obligation Requires</p>
            </div>
            <div className="px-4 py-3 text-xs text-[#334155] leading-relaxed">{obl.description}</div>
          </div>

          {/* Approval → Condition → Obligation traceability */}
          <div className="bg-white border border-[#e2e8f0]">
            <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
              <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Source Reference / Condition</p>
            </div>
            <div className="px-4 py-4 space-y-2 text-xs">
              <div className="flex items-start gap-3">
                <div className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider shrink-0 w-24 pt-0.5">Source</div>
                <div>
                  <button onClick={onGoToE23} disabled={!onGoToE23} title={!onGoToE23 ? SOURCE_APPROVAL_UNAVAILABLE : undefined} className="font-medium text-[#1a56db] hover:underline disabled:opacity-50 disabled:cursor-not-allowed">{obl.sourceApprovalId}</button>
                  <p className="text-[#6b7a8d] mt-0.5">{obl.dept} source reference</p>
                </div>
              </div>
              <div className="ml-6 border-l-2 border-[#e2e8f0] pl-4 space-y-2">
                <div className="flex items-start gap-3">
                  <div className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider shrink-0 w-20 pt-0.5">Condition</div>
                  <div>
                    <p className="font-medium text-[#334155]">{obl.sourceCondition}</p>
                    <p className="text-[#475569] leading-relaxed mt-0.5">"{obl.relevantCondition}"</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider shrink-0 w-20 pt-0.5">Obligation</div>
                  <p className="text-[#334155] font-medium">{obl.name}</p>
                </div>
              </div>
              <div className="pt-1">
                <p className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-1">Why Required</p>
                <p className="text-[#475569] leading-relaxed">{obl.whyRequired}</p>
              </div>
              <button onClick={onGoToE23} disabled={!onGoToE23} title={!onGoToE23 ? SOURCE_APPROVAL_UNAVAILABLE : undefined} className="text-xs text-[#1a56db] hover:underline block pt-1 disabled:opacity-50 disabled:cursor-not-allowed">View Source Approval (E23) →</button>
              {!onGoToE23 && <p className="text-xs text-[#6b7a8d]">{SOURCE_APPROVAL_UNAVAILABLE}</p>}
            </div>
          </div>

          {/* Required documents */}
          {obl.requiredDocs.length > 0 && (
            <div className="bg-white border border-[#e2e8f0]">
              <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
                <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Required Documents</p>
              </div>
              <div className="divide-y divide-[#f1f5f9]">
                {obl.requiredDocs.map(d => (
                  <div key={d.id} className="px-4 py-2.5 flex items-center justify-between text-sm">
                    <p className="text-[#334155] font-medium">{d.name}</p>
                    <button onClick={() => onGoToDocDetail(d.id)} disabled={!canOpenDocument?.(d.id)} title={!canOpenDocument?.(d.id) ? DOCUMENT_UNAVAILABLE : undefined} className="text-xs text-[#1a56db] hover:underline shrink-0 ml-3 disabled:opacity-50 disabled:cursor-not-allowed">View in E12</button>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-[#e8edf2]">
                <button onClick={onGoToE11} disabled={!canOpenDocuments} title={!canOpenDocuments ? DOCUMENT_UNAVAILABLE : undefined} className="text-xs text-[#1a56db] hover:underline disabled:opacity-50 disabled:cursor-not-allowed">Document Centre (E11) →</button>
                {!canOpenDocuments && <p className="text-xs text-[#6b7a8d]">{DOCUMENT_UNAVAILABLE}</p>}
              </div>
            </div>
          )}

          {/* Previous submission */}
          <div className="bg-white border border-[#e2e8f0]">
            <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
              <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Previous Submission</p>
            </div>
            {obl.previousSubmission ? (
              <div className="divide-y divide-[#f1f5f9]">
                {[
                  { label: 'Submission Date', value: obl.previousSubmission.date },
                  { label: 'Reference', value: obl.previousSubmission.ref },
                  { label: 'State', value: obl.previousSubmission.state },
                ].map(r => (
                  <div key={r.label} className="px-4 py-2.5 flex justify-between text-sm">
                    <span className="text-[#6b7a8d]">{r.label}</span>
                    <span className="font-medium text-[#334155]">{r.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-4 py-3 text-sm text-[#94a3b8]">No previous submission recorded.</div>
            )}
          </div>

          {/* Regulatory Assistant */}
          <div className="bg-white border border-[#e2e8f0]">
            <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb] flex items-center justify-between">
              <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Regulatory Assistant</p>
              <button onClick={() => setRagOpen(o => !o)} className="text-xs text-[#1a56db] hover:underline">{ragOpen ? 'Close' : 'Ask a question'}</button>
            </div>
            {!ragOpen && (
              <div className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_PROMPTS.map(p => (
                    <button key={p} onClick={() => { setRagOpen(true); handleRagSend(p) }} className="text-xs border border-[#d1d9e0] text-[#475569] px-2.5 py-1 hover:bg-[#f1f5f9] hover:text-[#1a3a5c] hover:border-[#1a3a5c] transition-colors">{p}</button>
                  ))}
                </div>
              </div>
            )}
            {ragOpen && (
              <div className="px-4 py-3 space-y-3">
                {ragMessages.length > 0 && (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {ragMessages.map((m, i) => (
                      <div key={i} className={`text-xs px-3 py-2 border ${m.role === 'user' ? 'bg-[#f8f9fb] border-[#e2e8f0] text-[#334155]' : 'bg-white border-[#d1d9e0] text-[#1a3a5c] leading-relaxed'}`}>
                        {m.role === 'assistant' && <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mb-1">Regulatory Assistant</p>}
                        {m.role === 'user' && <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mb-1">Your Question</p>}
                        <p>{m.text}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-1.5 border-t border-[#f1f5f9] pt-2">
                  {SUGGESTED_PROMPTS.map(p => (
                    <button key={p} onClick={() => handleRagSend(p)} className="text-xs border border-[#d1d9e0] text-[#475569] px-2 py-1 hover:bg-[#f1f5f9]">{p}</button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={ragInput} onChange={e => setRagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleRagSend(ragInput)} placeholder="Ask about this compliance obligation…" className="flex-1 text-xs border border-[#d1d9e0] px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#1a56db]" />
                  <button onClick={() => handleRagSend(ragInput)} className="text-xs bg-[#1a3a5c] text-white px-3 py-1.5 hover:bg-[#0f2540]">Ask</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Actions */}
          <div className="bg-white border border-[#e2e8f0]">
            <div className="px-3 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
              <p className="text-xs font-bold text-[#1a3a5c]">Actions</p>
            </div>
            <div className="px-3 py-3 flex flex-col gap-2">
              {obl.actionRequired && (
                <>
                  <button disabled title="No submission or renewal workflow is connected to this obligation." className="text-sm bg-[#1a3a5c] text-white border border-[#1a3a5c] px-3 py-1.5 text-left font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                    {obl.category === 'Renewals' ? 'Start Renewal Application' : 'Submit Return / Evidence'}
                  </button>
                  <p className="text-xs text-[#6b7a8d]">No submission or renewal workflow is connected to this obligation.</p>
                </>
              )}
              <button onClick={onGoToE23} disabled={!onGoToE23} title={!onGoToE23 ? SOURCE_APPROVAL_UNAVAILABLE : undefined} className="text-sm border border-[#d1d9e0] text-[#1a3a5c] px-3 py-1.5 hover:bg-[#f1f5f9] text-left disabled:opacity-50 disabled:cursor-not-allowed">View Source Approval (E23)</button>
              {obl.requiredDocs.length > 0 && <button onClick={onGoToE11} disabled={!canOpenDocuments} title={!canOpenDocuments ? DOCUMENT_UNAVAILABLE : undefined} className="text-sm border border-[#d1d9e0] text-[#1a3a5c] px-3 py-1.5 hover:bg-[#f1f5f9] text-left disabled:opacity-50 disabled:cursor-not-allowed">View Document Centre (E11)</button>}
              <button onClick={() => setRagOpen(true)} className="text-sm border border-[#d1d9e0] text-[#1a3a5c] px-3 py-1.5 hover:bg-[#f1f5f9] text-left">Ask Regulatory Assistant</button>
            </div>
          </div>

          {/* Status summary */}
          <div className="bg-white border border-[#e2e8f0]">
            <div className="px-3 py-2.5 border-b border-[#e8edf2]">
              <p className="text-xs font-bold text-[#1a3a5c]">Current State</p>
            </div>
            <div className="px-3 py-3 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#6b7a8d]">Compliance Status</span>
                {complianceStatusBadge(obl.status)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6b7a8d]">Verification</span>
                <span className="font-medium text-[#334155]">{obl.verification}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6b7a8d]">Due</span>
                <span className={`font-medium ${obl.status === 'Overdue' ? 'text-[#b91c1c]' : obl.status === 'Due Soon' ? 'text-[#d97706]' : 'text-[#334155]'}`}>{obl.dueDate}</span>
              </div>
            </div>
          </div>

          {/* Navigate */}
          <div className="bg-white border border-[#e2e8f0]">
            <div className="px-3 py-2.5 border-b border-[#e8edf2]">
              <p className="text-xs font-bold text-[#1a3a5c]">Navigate</p>
            </div>
            <div className="px-3 py-3 flex flex-col gap-1.5 text-xs">
              <button onClick={onGoToE24} className="text-left text-[#1a56db] hover:underline">Compliance Dashboard (E24)</button>
              <button onClick={onGoToE23} disabled={!onGoToE23} title={!onGoToE23 ? SOURCE_APPROVAL_UNAVAILABLE : undefined} className="text-left text-[#1a56db] hover:underline disabled:opacity-50 disabled:cursor-not-allowed">Source Approval (E23)</button>
              <button onClick={onGoToE11} disabled={!canOpenDocuments} title={!canOpenDocuments ? DOCUMENT_UNAVAILABLE : undefined} className="text-left text-[#1a56db] hover:underline disabled:opacity-50 disabled:cursor-not-allowed">Document Centre (E11)</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
