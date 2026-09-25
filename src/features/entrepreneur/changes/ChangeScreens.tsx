'use client';

import React, { useState } from 'react';
import { RegAssistantTrigger, type RegAssistantContext } from '../regulatory-assistant/Trigger';
import { findBusinessEntity } from '../identity/catalog';

// ─── E29 — Regulatory Change Impact ──────────────────────────────────────────

export type RegulatoryChangeImpact =
  | 'No action'
  | 'Review recommended'
  | 'New document'
  | 'Application affected'
  | 'Renewal affected'
  | 'Compliance affected'
  | 'New requirement potentially triggered'

export type RegulatoryChangeVerification = 'Validated' | 'Needs Verification' | 'Under Review'

export interface RegulatoryChange {
  id: string
  title: string
  effectiveDate: string
  source: string
  department: string
  affectedRequirement: string
  businessImpact: string
  requiredAction: string
  verification: RegulatoryChangeVerification
  impactCategory: RegulatoryChangeImpact
  affectedRecords: Array<{ type: 'application' | 'approval' | 'renewal' | 'compliance'; id: string; label: string }>
  detail: string
}

export const REGULATORY_CHANGES: RegulatoryChange[] = [
  {
    id: 'RC-2026-001',
    title: 'MPCB Revised Effluent Standards — Pharmaceutical Sector',
    effectiveDate: '15 Oct 2026',
    source: 'MPCB Circular No. MPCB/TECH/2026/148',
    department: 'MPCB',
    affectedRequirement: 'Consent to Establish / Consent to Operate — Effluent discharge conditions',
    businessImpact: 'Revised effluent discharge limits for pharmaceutical units apply to new CTE applications. Your existing CTE application references the prior standards. Updated ETP design documentation may be required to demonstrate compliance with the revised limits before CTO stage.',
    requiredAction: 'Review existing CTE application effluent conditions against the revised standards. Consult with ETP designer. Upload updated ETP design documentation if applicable.',
    verification: 'Validated',
    impactCategory: 'Application affected',
    affectedRecords: [
      { type: 'application', id: 'app-boiler-reg', label: 'CTE Application (MPCB)' },
      { type: 'compliance', id: 'CPL-001', label: 'Effluent Monitoring Return (MPCB)' },
    ],
    detail: 'MPCB has revised effluent discharge concentration limits for pharmaceutical manufacturing units under Circular MPCB/TECH/2026/148. The revised limits pertain to BOD, COD, Total Dissolved Solids, and specific heavy metal parameters. Units with pending CTE applications are required to demonstrate compliance with the revised limits in their ETP design. Units with existing CTO may be required to demonstrate compliance at the next renewal stage.',
  },
  {
    id: 'RC-2026-002',
    title: 'DISH — Amended Hazardous Chemicals Storage Rules',
    effectiveDate: '01 Dec 2026',
    source: 'Maharashtra Government Gazette — November 2026 Amendment',
    department: 'DISH',
    affectedRequirement: 'Hazardous Chemicals Storage — Licence conditions',
    businessImpact: 'Amended thresholds for on-site storage of hazardous chemicals. Your declared storage quantities may cross the amended notifiable threshold. A fresh licence assessment or amendment may be required.',
    requiredAction: 'Review declared hazardous material quantities against the amended thresholds. Engage DISH relationship manager if the amendment triggers a new licence requirement.',
    verification: 'Needs Verification',
    impactCategory: 'New requirement potentially triggered',
    affectedRecords: [
      { type: 'compliance', id: 'CPL-001', label: 'DISH Hazardous Chemicals Compliance' },
    ],
    detail: 'The Maharashtra government has amended thresholds under the Manufacture, Storage, and Import of Hazardous Chemical Rules. Units storing chemicals above the revised threshold quantities must apply for or amend their existing licence. Applicability to this business depends on the specific chemicals and maximum on-site storage quantities declared in the Business DNA and requires verification against the amended schedule.',
  },
  {
    id: 'RC-2026-003',
    title: 'PSI 2019 — Claim Submission Deadline Clarification',
    effectiveDate: '05 Nov 2026',
    source: 'Industries, Energy & Labour Dept. Circular — Oct 2026',
    department: 'Industries Dept., GoM',
    affectedRequirement: 'PSI 2019 Eligibility Certificate — Claim submission schedule',
    businessImpact: 'Clarification issued on the 60-day claim submission window. Claim CLM-2027-002 (Electricity Duty Exemption) submission timing should be reviewed against the clarified deadline.',
    requiredAction: 'Confirm that Claim CLM-2027-002 was submitted within the 60-day window from the close of the claim period. No corrective action if timing is confirmed.',
    verification: 'Validated',
    impactCategory: 'Review recommended',
    affectedRecords: [
      { type: 'approval', id: 'CPL-001', label: 'PSI 2019 Eligibility Certificate EC-PSI-2026-01248' },
    ],
    detail: 'The Industries, Energy & Labour Department has issued a clarification circular confirming that half-yearly incentive claims under PSI 2019 must be submitted within 60 days of the close of each claim period. Late submissions will not be accepted. This is a clarification of an existing obligation and does not introduce a new requirement, but businesses with recent submissions should confirm compliance with the timeline.',
  },
  {
    id: 'RC-2026-004',
    title: 'Factory Act Amendment — Welfare Officer Threshold',
    effectiveDate: '01 Jan 2027',
    source: 'Maharashtra Factory Rules Amendment 2026',
    department: 'DISH',
    affectedRequirement: 'Factory Registration — Welfare Officer appointment condition',
    businessImpact: 'Amended workforce threshold for mandatory welfare officer appointment. If your declared total workforce is above the revised threshold, a welfare officer appointment obligation is triggered. Current declared workforce is below the threshold — no action expected at current scale.',
    requiredAction: 'No action currently required. Review if total permanent workforce exceeds 250 in future phases.',
    verification: 'Validated',
    impactCategory: 'No action',
    affectedRecords: [],
    detail: 'The Maharashtra Factory Rules have been amended to revise the mandatory welfare officer appointment threshold. The revised threshold is 250 workers (reduced from 500). Current declared workforce for this unit is below the threshold. No immediate action is required. The change should be tracked at the next workforce review.',
  },
]

export function listRegulatoryChangesForBusiness(businessId: string): RegulatoryChange[] {
  return REGULATORY_CHANGES.filter(change => Boolean(findBusinessEntity('regulatory-change', businessId, change.id)))
}

function regChangeBadge(v: RegulatoryChangeVerification) {
  const map: Record<RegulatoryChangeVerification, string> = {
    'Validated': 'border-[#86efac] bg-[#dcfce7] text-[#166534]',
    'Needs Verification': 'border-[#fcd34d] bg-[#fef3c7] text-[#92400e]',
    'Under Review': 'border-[#93c5fd] bg-[#dbeafe] text-[#1e40af]',
  }
  return <span className={`text-[10px] font-semibold px-1.5 py-0.5 border ${map[v]}`}>{v}</span>
}

function regImpactBadge(c: RegulatoryChangeImpact) {
  const map: Record<RegulatoryChangeImpact, string> = {
    'No action': 'border-[#cbd5e1] bg-[#f1f5f9] text-[#64748b]',
    'Review recommended': 'border-[#fcd34d] bg-[#fef3c7] text-[#92400e]',
    'New document': 'border-[#fdba74] bg-[#fff7ed] text-[#9a3412]',
    'Application affected': 'border-[#fca5a5] bg-[#fee2e2] text-[#b91c1c]',
    'Renewal affected': 'border-[#fdba74] bg-[#fff7ed] text-[#9a3412]',
    'Compliance affected': 'border-[#fca5a5] bg-[#fee2e2] text-[#b91c1c]',
    'New requirement potentially triggered': 'border-[#c4b5fd] bg-[#ede9fe] text-[#5b21b6]',
  }
  return <span className={`text-[10px] font-semibold px-1.5 py-0.5 border ${map[c]}`}>{c}</span>
}

export function E29RegChangeImpactPage({ onBack, onGoToApplication, onGoToCompliance, canOpenAffectedRecord, onGoToE24, onOpenRegAssistant }: {
  onBack: () => void
  onGoToApplication: (id: string) => void
  onGoToCompliance: (id: string) => void
  canOpenAffectedRecord: (record: { type: 'application' | 'approval' | 'renewal' | 'compliance'; id: string; label: string }) => boolean
  onGoToE24: () => void
  onOpenRegAssistant?: (ctx: RegAssistantContext) => void
}) {
  const [impactFilter, setImpactFilter] = useState<'All' | RegulatoryChangeImpact>('All')
  const [verifFilter, setVerifFilter] = useState<'All' | RegulatoryChangeVerification>('All')
  const [deptFilter, setDeptFilter] = useState('All')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [ragOpen, setRagOpen] = useState(false)
  const [ragInput, setRagInput] = useState('')
  const [ragMessages, setRagMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([])

  const allDepts = ['All', ...Array.from(new Set(REGULATORY_CHANGES.map(r => r.department)))]
  const allImpacts: Array<'All' | RegulatoryChangeImpact> = ['All', 'Application affected', 'Compliance affected', 'New requirement potentially triggered', 'Review recommended', 'Renewal affected', 'New document', 'No action']
  const allVerifs: Array<'All' | RegulatoryChangeVerification> = ['All', 'Validated', 'Needs Verification', 'Under Review']

  const filtered = REGULATORY_CHANGES.filter(r => {
    if (deptFilter !== 'All' && r.department !== deptFilter) return false
    if (impactFilter !== 'All' && r.impactCategory !== impactFilter) return false
    if (verifFilter !== 'All' && r.verification !== verifFilter) return false
    return true
  })

  const selected = selectedId ? REGULATORY_CHANGES.find(r => r.id === selectedId) : null

  const summaryTiles = [
    { label: 'Active Changes', value: REGULATORY_CHANGES.length, color: 'text-[#1a3a5c]' },
    { label: 'Needs Verification', value: REGULATORY_CHANGES.filter(r => r.verification === 'Needs Verification').length, color: 'text-[#92400e]' },
    { label: 'Applications Potentially Affected', value: 2, color: 'text-[#b91c1c]' },
    { label: 'Compliance Obligations Affected', value: 2, color: 'text-[#b91c1c]' },
  ]

  const RAG_SUGGESTED = [
    'Which change requires my immediate attention?',
    'What does the MPCB effluent standard change mean for my application?',
    'Does the DISH amendment apply to my business?',
    'What is the difference between Validated and Needs Verification?',
    'How should I respond to the MPCB effluent standard update?',
  ]

  function handleRagSend(text: string) {
    if (!text.trim()) return
    const responses: Record<string, string> = {
      'Which change requires my immediate attention?': 'RC-2026-001 (MPCB Revised Effluent Standards) has a Validated status with Application affected — it requires review of your CTE application documentation before the CTO stage. RC-2026-002 (DISH Amended Hazardous Chemicals Storage) is marked Needs Verification and should be verified against your declared hazardous material quantities.',
      'What does the MPCB effluent standard change mean for my application?': 'MPCB has revised effluent discharge limits for pharmaceutical units. Your CTE application references the prior standards. You may need to provide updated ETP design documentation demonstrating compliance with the revised limits before the CTO stage is reached.',
      'Does the DISH amendment apply to my business?': 'The applicability of the DISH hazardous chemicals amendment (RC-2026-002) to your business requires verification against your declared maximum on-site storage quantities. The current status is Needs Verification — do not treat this as a confirmed obligation until verified.',
      'What is the difference between Validated and Needs Verification?': '"Validated" means the regulatory change has been confirmed as applicable to your business profile by a verified source. "Needs Verification" means a potential change has been identified but applicability to your specific business has not yet been confirmed — do not treat it as a binding obligation until validated.',
      'How should I respond to the MPCB effluent standard update?': 'Review the revised effluent discharge limits against your existing ETP design. If the design meets the revised limits, retain documentary evidence. If it does not, engage your ETP designer and upload updated ETP design details via the Document Centre (E11). The affected CTE application should then be reviewed.',
    }
    const reply = responses[text] || 'For specific guidance on this regulatory change, refer to the source circular or contact the relevant department. This assistant explains configured information only and does not provide legal advice.'
    setRagMessages(prev => [...prev, { role: 'user', text }, { role: 'assistant', text: reply }])
    setRagInput('')
  }

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
        <div className="max-w-[1280px] mx-auto">
          <nav className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5">
            <button onClick={onBack} className="hover:text-[#1a3a5c] hover:underline">Dashboard</button>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">Regulatory Change Impact</span>
          </nav>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-[#1a3a5c]">Regulatory Change Impact</h1>
              <p className="text-xs text-[#6b7a8d] mt-0.5">Sahyadri Bio-Pharma Pvt Ltd — Chakan Industrial Area Phase II</p>
              <p className="text-xs text-[#6b7a8d] mt-1 max-w-2xl">Shows validated regulatory updates that may affect this business's active applications, approvals, renewals, or compliance obligations. Changes marked "Needs Verification" have been identified as potentially relevant but applicability has not yet been confirmed.</p>
            </div>
            {onOpenRegAssistant && (
              <RegAssistantTrigger lang="en" size="sm" onClick={() => onOpenRegAssistant({ entryPoint: 'reg-change', initialQuestion: 'What exactly changed?' })} />
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-5 space-y-4">

        {/* AI safety notice */}
        <div className="bg-white border border-[#bfdbfe] border-l-4 border-l-[#1d4ed8] px-4 py-3 text-xs text-[#1e3a8a]">
          <p className="font-semibold mb-0.5">Important — Verification Required</p>
          <p>Regulatory changes marked <strong>Needs Verification</strong> have been identified as potentially relevant to this business but have not been confirmed as applicable. Do not treat unvalidated changes as binding obligations. Validated changes have been confirmed by a verified source.</p>
        </div>

        {/* Summary tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {summaryTiles.map(t => (
            <div key={t.label} className="bg-white border border-[#e2e8f0] px-4 py-3">
              <p className={`text-2xl font-bold ${t.color}`}>{t.value}</p>
              <p className="text-xs text-[#6b7a8d] mt-0.5">{t.label}</p>
            </div>
          ))}
        </div>

        {/* Potentially affected summary */}
        <div className="bg-white border border-[#e2e8f0] px-5 py-4">
          <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-3">Potentially Affected Records</p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs">
            {[
              { label: 'Active applications', value: '2', onClick: undefined },
              { label: 'Approvals', value: '1', onClick: undefined },
              { label: 'Renewals', value: '3', onClick: undefined },
              { label: 'Compliance obligations', value: '4', onClick: () => onGoToE24() },
            ].map(r => (
              <div key={r.label}>
                <p className="text-[10px] text-[#64748b] mb-0.5">{r.label}</p>
                {r.onClick
                  ? <button onClick={r.onClick} className="text-lg font-bold text-[#1a3a5c] hover:underline">{r.value}</button>
                  : <p className="text-lg font-bold text-[#1a3a5c]">{r.value}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-[#e2e8f0] px-4 py-3 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Department</label>
            <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="text-xs border border-[#d1d9e0] px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#1a56db]">
              {allDepts.map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Impact</label>
            <select value={impactFilter} onChange={e => setImpactFilter(e.target.value as typeof impactFilter)} className="text-xs border border-[#d1d9e0] px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#1a56db] max-w-[220px]">
              {allImpacts.map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Verification</label>
            <select value={verifFilter} onChange={e => setVerifFilter(e.target.value as typeof verifFilter)} className="text-xs border border-[#d1d9e0] px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#1a56db]">
              {allVerifs.map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          {(deptFilter !== 'All' || impactFilter !== 'All' || verifFilter !== 'All') && (
            <button onClick={() => { setDeptFilter('All'); setImpactFilter('All'); setVerifFilter('All') }} className="text-xs text-[#b91c1c] hover:underline ml-1">Clear</button>
          )}
        </div>

        {/* Change list */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-[#e2e8f0] px-6 py-10 text-center">
            <p className="text-sm font-semibold text-[#1a3a5c] mb-1">No validated regulatory changes currently affect this business.</p>
            <p className="text-xs text-[#6b7a8d]">Adjust filters or check back after the next regulatory update cycle.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(rc => (
              <div key={rc.id} className={`bg-white border ${selectedId === rc.id ? 'border-[#1a56db]' : 'border-[#e2e8f0]'}`}>
                {/* Row header */}
                <button
                  onClick={() => setSelectedId(rc.id === selectedId ? null : rc.id)}
                  className="w-full text-left px-5 py-4 hover:bg-[#f8f9fb] transition-colors"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p className="text-xs font-bold text-[#1a3a5c]">{rc.title}</p>
                        <span className="text-[10px] font-mono text-[#94a3b8]">{rc.id}</span>
                      </div>
                      <div className="flex flex-wrap gap-x-5 gap-y-1 text-[10px] text-[#6b7a8d]">
                        <span><strong className="text-[#475569]">Effective:</strong> {rc.effectiveDate}</span>
                        <span><strong className="text-[#475569]">Dept:</strong> {rc.department}</span>
                        <span><strong className="text-[#475569]">Source:</strong> {rc.source}</span>
                      </div>
                      <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">{rc.businessImpact}</p>
                    </div>
                    <div className="flex flex-col gap-1.5 items-end shrink-0">
                      {regImpactBadge(rc.impactCategory)}
                      {regChangeBadge(rc.verification)}
                    </div>
                  </div>
                </button>

                {/* Expanded detail */}
                {selectedId === rc.id && (
                  <div className="border-t border-[#e8edf2] px-5 py-4 space-y-4 text-xs bg-[#f8f9fb]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                      <div>
                        <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">Affected Requirement</p>
                        <p className="text-[#334155]">{rc.affectedRequirement}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">Required Action</p>
                        <p className="text-[#334155]">{rc.requiredAction}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">Detail</p>
                        <p className="text-[#334155] leading-relaxed">{rc.detail}</p>
                      </div>
                    </div>

                    {rc.verification === 'Needs Verification' && (
                      <div className="border border-[#fcd34d] bg-[#fefce8] px-3 py-2 text-[#92400e]">
                        <p className="font-semibold text-[10px] uppercase tracking-wider mb-0.5">Needs Verification</p>
                        <p>Potential regulatory impact identified, but applicability to this business requires verification. Do not treat this as a confirmed obligation until validated.</p>
                      </div>
                    )}

                    {rc.affectedRecords.length > 0 && (
                      <div>
                        <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-2">Affected Records</p>
                        <div className="flex flex-wrap gap-2">
                          {rc.affectedRecords.map(r => (
                            <button
                              key={`${r.type}-${r.id}-${r.label}`}
                              disabled={!canOpenAffectedRecord(r)}
                              title={!canOpenAffectedRecord(r) ? 'Source reference does not match an exact record for this business' : undefined}
                              onClick={() => r.type === 'compliance' ? onGoToCompliance(r.id) : onGoToApplication(r.id)}
                              className="text-xs border border-[#d1d9e0] bg-white text-[#1a3a5c] px-3 py-1.5 enabled:hover:bg-[#f1f5f9] disabled:opacity-50 disabled:cursor-not-allowed text-left"
                            >
                              {r.type === 'compliance' ? 'View Compliance — ' : r.type === 'application' ? 'View Application — ' : 'View Record — '}
                              {r.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 pt-1 border-t border-[#e2e8f0]">
                      <button
                        onClick={() => setRagOpen(true)}
                        className="text-xs border border-[#d1d9e0] text-[#1a3a5c] px-3 py-1.5 hover:bg-[#f1f5f9]"
                      >
                        Ask Assistant
                      </button>
                      <button disabled title="The source circular is cited in the prototype but no source document is bound" className="text-xs border border-[#d1d9e0] text-[#94a3b8] px-3 py-1.5 cursor-not-allowed">View Source</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Regulatory Assistant */}
        <div className="bg-white border border-[#e2e8f0]">
          <button
            onClick={() => setRagOpen(v => !v)}
            className="w-full flex items-center justify-between px-5 py-3 text-xs font-semibold text-[#1a3a5c] hover:bg-[#f8f9fb] transition-colors"
          >
            <span>Regulatory Assistant — Change Impact Queries</span>
            <span className="text-[#6b7a8d] font-normal">{ragOpen ? '▲ Hide' : '▼ Show'}</span>
          </button>
          {ragOpen && (
            <div className="border-t border-[#e8edf2] px-5 py-4 space-y-3">
              <p className="text-[10px] text-[#6b7a8d]">Ask about regulatory changes and their potential impact on your business. Responses are based on configured information only and do not constitute legal advice. Changes marked Needs Verification have not been confirmed as applicable.</p>
              <div className="flex flex-wrap gap-2">
                {RAG_SUGGESTED.map(p => (
                  <button key={p} onClick={() => handleRagSend(p)} className="text-[10px] border border-[#bfdbfe] bg-[#eff6ff] text-[#1e40af] px-2 py-1 hover:bg-[#dbeafe] transition-colors">{p}</button>
                ))}
              </div>
              {ragMessages.length > 0 && (
                <div className="space-y-2 max-h-48 overflow-y-auto border border-[#e2e8f0] bg-[#f8f9fb] p-3">
                  {ragMessages.map((m, i) => (
                    <div key={i} className={`text-xs ${m.role === 'user' ? 'text-[#1a3a5c] font-semibold' : 'text-[#334155]'}`}>
                      <span className="text-[10px] text-[#94a3b8] mr-1">{m.role === 'user' ? 'You:' : 'Assistant:'}</span>
                      {m.text}
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={ragInput}
                  onChange={e => setRagInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleRagSend(ragInput) }}
                  placeholder="Ask about a regulatory change..."
                  className="flex-1 text-xs border border-[#d1d9e0] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#1a56db]"
                />
                <button onClick={() => handleRagSend(ragInput)} className="text-xs bg-[#1a3a5c] text-white px-4 py-2 font-semibold hover:bg-[#0f2540] transition-colors">Send</button>
              </div>
            </div>
          )}
        </div>

        {/* Footer disclaimer */}
        <div className="bg-white border border-[#e2e8f0] px-4 py-3 text-xs text-[#6b7a8d]">
          <p><strong className="text-[#1a3a5c]">Disclaimer:</strong> Regulatory changes shown are based on validated notifications and business profile matching. Changes marked Needs Verification require confirmation before being treated as obligations. This system does not automatically alter your applications, compliance obligations, or approvals in response to regulatory changes.</p>
        </div>
      </div>
    </main>
  )
}

// ─── E30 / E31 — Business Change Simulator & Amendments ──────────────────────

export type ChangeType =
  | 'Increase production'
  | 'Add machinery'
  | 'Add boiler'
  | 'Add chemical process'
  | 'Expand building'
  | 'Acquire land'
  | 'Change product'
  | 'Increase workforce'
  | 'Change activity'
  | 'Other'

type SimImpactCategory =
  | 'REMAIN VALID'
  | 'MAY REQUIRE AMENDMENT'
  | 'POTENTIALLY NEW'
  | 'INSPECTION IMPACT'
  | 'COMPLIANCE IMPACT'
  | 'INCENTIVE IMPACT'

interface SimResult {
  id: string
  category: SimImpactCategory
  affectedRecord: string
  currentState: string
  potentialImpact: string
  suggestedNextStep: string
  verification: 'Validated' | 'Needs Verification'
}

interface DeltaItem {
  id: string
  whatChanged: string
  existingRecord: string
  newOrAmended: string
  reason: string
  status: 'New' | 'Amendment Required' | 'No Change' | 'Triggered' | 'Review Required'
  verification: 'Validated' | 'Needs Verification'
  requiredAction: string
}

const CHANGE_TYPE_CONFIG: Record<ChangeType, { currentLabel: string; currentValue: string; proposedPlaceholder: string; proposedOptions?: string[] }> = {
  'Increase production': { currentLabel: 'Current production capacity', currentValue: '100 T/day', proposedPlaceholder: 'e.g. 150 T/day', proposedOptions: ['120 T/day', '150 T/day', '200 T/day', '250 T/day'] },
  'Add machinery': { currentLabel: 'Current plant & machinery investment', currentValue: '₹ 4.2 Cr (declared)', proposedPlaceholder: 'Describe machinery to be added', proposedOptions: undefined },
  'Add boiler': { currentLabel: 'Existing boilers', currentValue: '0 boilers declared', proposedPlaceholder: 'e.g. 1 boiler, 500 kg/hr capacity', proposedOptions: undefined },
  'Add chemical process': { currentLabel: 'Current chemical processes', currentValue: 'Pharmaceutical synthesis (declared)', proposedPlaceholder: 'Describe additional process', proposedOptions: undefined },
  'Expand building': { currentLabel: 'Current built-up area', currentValue: '4,200 sq m (declared)', proposedPlaceholder: 'e.g. 5,500 sq m', proposedOptions: ['5,000 sq m', '5,500 sq m', '6,000 sq m', '7,000 sq m'] },
  'Acquire land': { currentLabel: 'Current land area (MIDC plot)', currentValue: '5,000 sq m (allotted)', proposedPlaceholder: 'e.g. 7,500 sq m', proposedOptions: undefined },
  'Change product': { currentLabel: 'Current declared products', currentValue: 'API — Amoxicillin Trihydrate; Pharmaceutical Intermediates', proposedPlaceholder: 'Describe product to be added/changed', proposedOptions: undefined },
  'Increase workforce': { currentLabel: 'Current declared total workforce', currentValue: '85 (permanent + contract)', proposedPlaceholder: 'e.g. 150', proposedOptions: ['100', '150', '200', '250', '300'] },
  'Change activity': { currentLabel: 'Current declared activities', currentValue: 'Pharmaceutical manufacturing; API synthesis', proposedPlaceholder: 'Describe new/changed activity', proposedOptions: undefined },
  'Other': { currentLabel: 'Describe the change', currentValue: '—', proposedPlaceholder: 'Describe the proposed change', proposedOptions: undefined },
}

function getSimResults(changeType: ChangeType): SimResult[] {
  const base: Record<ChangeType, SimResult[]> = {
    'Increase production': [
      { id: 's1', category: 'MAY REQUIRE AMENDMENT', affectedRecord: 'MPCB Consent to Establish (CTE)', currentState: 'Under processing — declared capacity 100 T/day', potentialImpact: 'Increased production capacity may exceed the consented capacity declared in the CTE application. An amendment or revised application may be required.', suggestedNextStep: 'Confirm declared capacity in CTE application. If proposed capacity exceeds consented limit, file a capacity amendment before commencing increased production.', verification: 'Needs Verification' },
      { id: 's2', category: 'COMPLIANCE IMPACT', affectedRecord: 'MPCB Effluent Monitoring Return', currentState: 'Periodic return obligation — quarterly', potentialImpact: 'Higher production may increase effluent generation. Revised ETP capacity and revised monitoring parameters may be required.', suggestedNextStep: 'Verify ETP design capacity against proposed production. Amend ETP design documentation if capacity is insufficient.', verification: 'Needs Verification' },
      { id: 's3', category: 'INCENTIVE IMPACT', affectedRecord: 'PSI 2019 — Capital Subsidy', currentState: 'Eligibility Certificate issued — EC-PSI-2026-01248', potentialImpact: 'Increased capital investment linked to production expansion may affect eligible capital subsidy quantum. Notify administering authority if investment increases beyond declared baseline.', suggestedNextStep: 'Review declared investment schedule in PSI 2019 Eligibility Certificate. Contact Industries Dept. if additional investment is planned.', verification: 'Needs Verification' },
      { id: 's4', category: 'REMAIN VALID', affectedRecord: 'MIDC Allotment — Chakan Phase II Plot', currentState: 'Active allotment', potentialImpact: 'Production capacity increase within existing plot does not affect MIDC allotment status.', suggestedNextStep: 'No action required for MIDC allotment.', verification: 'Validated' },
    ],
    'Add boiler': [
      { id: 's1', category: 'POTENTIALLY NEW', affectedRecord: 'DISH Boiler Registration', currentState: 'No boiler declared — not applicable', potentialImpact: 'Any boiler with a steam capacity above 22.75 litres requires registration under the Boilers Act. A new registration application to DISH is required before the boiler is installed/commissioned.', suggestedNextStep: 'Initiate Boiler Registration application via DISH. Obtain technical specifications and IBR certificate before installation.', verification: 'Validated' },
      { id: 's2', category: 'INSPECTION IMPACT', affectedRecord: 'DISH Pre-commissioning Inspection', currentState: 'Not applicable — no boiler', potentialImpact: 'A new boiler triggers a DISH pre-commissioning inspection before commissioning.', suggestedNextStep: 'Include DISH boiler inspection in project commissioning schedule.', verification: 'Validated' },
      { id: 's3', category: 'MAY REQUIRE AMENDMENT', affectedRecord: 'MPCB Consent to Establish', currentState: 'Under processing', potentialImpact: 'Addition of a boiler may require disclosure of stack emissions to MPCB. CTE conditions may need to be updated.', suggestedNextStep: 'Disclose boiler capacity and fuel to MPCB. Amend CTE application to include boiler emission details.', verification: 'Needs Verification' },
      { id: 's4', category: 'COMPLIANCE IMPACT', affectedRecord: 'DISH Boiler Annual Inspection', currentState: 'Not applicable', potentialImpact: 'Registered boilers require annual inspection. A new periodic compliance obligation will be created on the compliance calendar.', suggestedNextStep: 'Plan for annual DISH boiler inspection after registration and commissioning.', verification: 'Validated' },
    ],
    'Expand building': [
      { id: 's1', category: 'MAY REQUIRE AMENDMENT', affectedRecord: 'Building / Construction Plan Approval', currentState: 'Declared built-up area 4,200 sq m', potentialImpact: 'Expanding built-up area requires a revised building plan and fresh construction/occupancy approval from MIDC/local authority.', suggestedNextStep: 'Engage architect for revised building plan. Submit revised plan for approval before commencing construction.', verification: 'Validated' },
      { id: 's2', category: 'COMPLIANCE IMPACT', affectedRecord: 'Fire NOC', currentState: 'Not yet applied', potentialImpact: 'Expanded built-up area may cross a threshold requiring a fresh or revised Fire NOC from the local Fire Department.', suggestedNextStep: 'Review Fire NOC threshold against proposed area. Apply for revised NOC if required.', verification: 'Needs Verification' },
      { id: 's3', category: 'REMAIN VALID', affectedRecord: 'MIDC Allotment', currentState: 'Active allotment — 5,000 sq m plot', potentialImpact: 'Expansion within allotted plot does not affect allotment. Ground coverage and FAR conditions under MIDC regulations must be observed.', suggestedNextStep: 'Confirm proposed construction is within permissible FAR and ground coverage limits for the allotted plot.', verification: 'Needs Verification' },
      { id: 's4', category: 'INCENTIVE IMPACT', affectedRecord: 'PSI 2019 — Capital Subsidy', currentState: 'Eligibility Certificate issued', potentialImpact: 'Additional building investment may be eligible for capital subsidy under PSI 2019. Updated CA certificate to be filed with claim.', suggestedNextStep: 'Retain all building investment records. Include in next capital subsidy claim evidence.', verification: 'Needs Verification' },
    ],
    'Add machinery': [
      { id: 's1', category: 'MAY REQUIRE AMENDMENT', affectedRecord: 'MPCB Consent to Establish', currentState: 'Under processing', potentialImpact: 'New machinery may affect production process description and air emission inventory declared in the CTE application.', suggestedNextStep: 'Update process description and emission inventory in CTE application if new machinery introduces new emission sources.', verification: 'Needs Verification' },
      { id: 's2', category: 'INCENTIVE IMPACT', affectedRecord: 'PSI 2019 — Capital Subsidy', currentState: 'Eligibility Certificate issued', potentialImpact: 'Additional plant & machinery investment is eligible for capital subsidy. Include in revised CA certificate at next claim.', suggestedNextStep: 'Maintain machinery purchase records. Include in next capital subsidy claim submission.', verification: 'Validated' },
      { id: 's3', category: 'REMAIN VALID', affectedRecord: 'Factory Registration', currentState: 'Not yet applied', potentialImpact: 'Addition of machinery within existing activity scope does not trigger a new factory registration. Declared workforce and plant category to be reviewed if machinery changes factory category.', suggestedNextStep: 'No immediate action. Review factory category classification if machinery changes total workforce or installed capacity.', verification: 'Needs Verification' },
    ],
    'Add chemical process': [
      { id: 's1', category: 'MAY REQUIRE AMENDMENT', affectedRecord: 'MPCB Consent to Establish', currentState: 'Under processing', potentialImpact: 'New chemical process may introduce new hazardous materials, effluents, or emissions not covered in the existing CTE application. Amendment or supplementary disclosure required.', suggestedNextStep: 'Prepare process description and hazardous material disclosure for new process. File CTE amendment.', verification: 'Validated' },
      { id: 's2', category: 'POTENTIALLY NEW', affectedRecord: 'DISH Hazardous Chemicals Licence', currentState: 'Not applicable (existing process below threshold)', potentialImpact: 'New chemical process may introduce chemicals above the notifiable storage threshold. A DISH licence application may be triggered.', suggestedNextStep: 'Evaluate maximum on-site storage of new chemicals against DISH threshold schedule. Apply for licence if threshold exceeded.', verification: 'Needs Verification' },
      { id: 's3', category: 'COMPLIANCE IMPACT', affectedRecord: 'Hazardous Waste Returns', currentState: 'Periodic return obligation', potentialImpact: 'New process may generate additional categories of hazardous waste. Waste manifest and return categories to be updated.', suggestedNextStep: 'Update hazardous waste register with new process waste. Revise periodic returns accordingly.', verification: 'Needs Verification' },
    ],
    'Increase workforce': [
      { id: 's1', category: 'COMPLIANCE IMPACT', affectedRecord: 'Factory Registration — Workforce declaration', currentState: 'Declared: 85 total workers', potentialImpact: 'Increasing workforce above 250 triggers a Welfare Officer appointment obligation under the amended Factory Rules. Crossing the 250 threshold also affects factory licence category.', suggestedNextStep: 'Track cumulative workforce against the 250-threshold. Plan Welfare Officer appointment if workforce is projected to cross the threshold.', verification: 'Validated' },
      { id: 's2', category: 'REMAIN VALID', affectedRecord: 'MPCB Consent to Establish', currentState: 'Under processing', potentialImpact: 'Workforce increase alone does not affect MPCB CTE conditions unless it reflects a change in production activity or process.', suggestedNextStep: 'No action required unless production activity also changes.', verification: 'Validated' },
      { id: 's3', category: 'INCENTIVE IMPACT', affectedRecord: 'PSI 2019 — Employment condition', currentState: 'Employment threshold met (declared)', potentialImpact: 'Maintaining declared employment levels is a condition of the PSI 2019 Eligibility Certificate. Increased workforce further satisfies employment conditions. No adverse impact expected.', suggestedNextStep: 'Retain workforce records for periodic claim submissions.', verification: 'Validated' },
    ],
    'Acquire land': [
      { id: 's1', category: 'POTENTIALLY NEW', affectedRecord: 'Land Acquisition / MIDC Additional Allotment', currentState: 'Existing MIDC allotment — 5,000 sq m', potentialImpact: 'Acquiring additional land requires a separate MIDC application or private land conversion approval depending on the land type.', suggestedNextStep: 'Identify land type (MIDC industrial / private NA / agricultural). Initiate appropriate land acquisition or conversion process.', verification: 'Needs Verification' },
      { id: 's2', category: 'MAY REQUIRE AMENDMENT', affectedRecord: 'MPCB Consent to Establish', currentState: 'Under processing', potentialImpact: 'Change in project area/footprint may require disclosure update in CTE application.', suggestedNextStep: 'Disclose updated project site area in CTE application if additional land is integrated into the project.', verification: 'Needs Verification' },
    ],
    'Change product': [
      { id: 's1', category: 'MAY REQUIRE AMENDMENT', affectedRecord: 'MPCB Consent to Establish', currentState: 'Under processing — declared product list', potentialImpact: 'Adding or changing declared products affects the process description, effluent characteristics, and emission inventory in the CTE application. An amendment or supplementary application may be required.', suggestedNextStep: 'Prepare updated product list and process description. File CTE amendment for new/changed products.', verification: 'Validated' },
      { id: 's2', category: 'POTENTIALLY NEW', affectedRecord: 'Drug Manufacturing Licence (FDCA)', currentState: 'Not yet applied', potentialImpact: 'New pharmaceutical product(s) may require an amendment to the drug manufacturing licence or a fresh endorsement from the FDA/FDCA.', suggestedNextStep: 'Check whether new product category is covered under the existing planned manufacturing licence scope. Apply for endorsement if required.', verification: 'Needs Verification' },
    ],
    'Change activity': [
      { id: 's1', category: 'MAY REQUIRE AMENDMENT', affectedRecord: 'MPCB Consent to Establish', currentState: 'Under processing', potentialImpact: 'Change in industrial activity may affect the CTE application category, process description, and applicable emission/effluent standards.', suggestedNextStep: 'File CTE amendment for changed activity description.', verification: 'Validated' },
      { id: 's2', category: 'COMPLIANCE IMPACT', affectedRecord: 'Industrial classification', currentState: 'MSME — Pharmaceutical manufacturing', potentialImpact: 'Activity change may affect industrial classification, potentially altering applicable regulations, PSI eligibility, and inspection requirements.', suggestedNextStep: 'Verify classification impact with the relevant classification authority before proceeding.', verification: 'Needs Verification' },
    ],
    'Other': [
      { id: 's1', category: 'MAY REQUIRE AMENDMENT', affectedRecord: 'Applicable approvals — subject to change description', currentState: 'Existing approvals', potentialImpact: 'Impact depends on the nature of the change. A specific regulatory analysis is required.', suggestedNextStep: 'Describe the change in detail and consult the Regulatory Assistant or your relationship manager for a targeted impact assessment.', verification: 'Needs Verification' },
    ],
  }
  return base[changeType] || []
}

function getE31Delta(changeType: ChangeType): DeltaItem[] {
  const base: Record<ChangeType, DeltaItem[]> = {
    'Add boiler': [
      { id: 'd1', whatChanged: 'New boiler added (500 kg/hr capacity, solid fuel)', existingRecord: 'No boiler declared in Business DNA', newOrAmended: 'DISH Boiler Registration — new application required', reason: 'Any boiler above 22.75 litres steam capacity requires registration under the Boilers Act 1923.', status: 'New', verification: 'Validated', requiredAction: 'Initiate DISH Boiler Registration application. Engage IBR-certified boiler manufacturer.' },
      { id: 'd2', whatChanged: 'New boiler — stack emission disclosure', existingRecord: 'MPCB CTE application — no boiler declared', newOrAmended: 'CTE Amendment required — boiler stack emission disclosure', reason: 'New boiler introduces air emission source not covered in existing CTE application.', status: 'Amendment Required', verification: 'Validated', requiredAction: 'File CTE amendment with MPCB including boiler capacity, fuel type, and stack emission parameters.' },
      { id: 'd3', whatChanged: 'New boiler — periodic inspection obligation', existingRecord: 'No boiler compliance obligation on compliance calendar', newOrAmended: 'DISH Annual Boiler Inspection — new compliance obligation', reason: 'Registered boilers require annual inspection under the Boilers Act.', status: 'New', verification: 'Validated', requiredAction: 'Add annual DISH boiler inspection to compliance calendar after commissioning.' },
      { id: 'd4', whatChanged: 'Boiler fuel — stack emission permit', existingRecord: 'No stack emission permit required (no boiler)', newOrAmended: 'MPCB Stack Emission Consent Condition — new condition at CTE/CTO stage', reason: 'Boiler introduces particulate and gaseous emissions subject to MPCB consent conditions.', status: 'Triggered', verification: 'Needs Verification', requiredAction: 'Include stack emission monitoring plan in CTE amendment. Confirm monitoring requirements with MPCB.' },
      { id: 'd5', whatChanged: 'Existing approvals — MIDC, existing compliance calendar', existingRecord: 'MIDC Allotment, existing compliance obligations', newOrAmended: 'No change to existing MIDC allotment or existing obligations', reason: 'Boiler addition within existing plot does not affect MIDC allotment or unrelated compliance obligations.', status: 'No Change', verification: 'Validated', requiredAction: 'No action required for existing unchanged records.' },
    ],
    'Increase production': [
      { id: 'd1', whatChanged: 'Production capacity: 100 T/day → 150 T/day', existingRecord: 'MPCB CTE — declared capacity 100 T/day', newOrAmended: 'CTE Amendment — revised capacity declaration required', reason: 'Production increase beyond consented capacity requires disclosure to MPCB.', status: 'Amendment Required', verification: 'Needs Verification', requiredAction: 'File CTE capacity amendment with MPCB before commencing production at revised capacity.' },
      { id: 'd2', whatChanged: 'Increased effluent generation from higher production', existingRecord: 'ETP Design — capacity 50 KLD', newOrAmended: 'ETP capacity review required — potential upgrade', reason: 'Higher production may increase effluent load beyond existing ETP design capacity.', status: 'Review Required', verification: 'Needs Verification', requiredAction: 'Engage ETP designer for capacity assessment. Upload revised ETP design if upgrade is needed.' },
      { id: 'd3', whatChanged: 'PSI 2019 capital investment increase', existingRecord: 'Eligibility Certificate — declared investment baseline', newOrAmended: 'Revised CA certificate to be filed at next claim', reason: 'Additional investment for capacity expansion may affect eligible subsidy quantum.', status: 'Review Required', verification: 'Needs Verification', requiredAction: 'Retain all investment records for capacity expansion. Include in CA certificate at next claim.' },
      { id: 'd4', whatChanged: 'Unchanged approvals and obligations', existingRecord: 'MIDC allotment, Factory Registration (not yet applied), Fire NOC (not yet applied)', newOrAmended: 'No change', reason: 'Production increase within existing facility does not affect these records unless activity scope changes.', status: 'No Change', verification: 'Validated', requiredAction: 'No action required.' },
    ],
    'Expand building': [
      { id: 'd1', whatChanged: 'Built-up area: 4,200 sq m → 5,500 sq m', existingRecord: 'Declared building plan — 4,200 sq m', newOrAmended: 'Revised building plan approval required from MIDC / local authority', reason: 'Expanded construction requires fresh building plan approval.', status: 'New', verification: 'Validated', requiredAction: 'Engage architect. Submit revised plan to MIDC / local authority before construction commences.' },
      { id: 'd2', whatChanged: 'Expanded built-up area — Fire NOC threshold', existingRecord: 'Fire NOC — not yet applied', newOrAmended: 'Fire NOC application — may be triggered at expanded area', reason: 'Expanded built-up area may cross the Fire NOC threshold.', status: 'Triggered', verification: 'Needs Verification', requiredAction: 'Verify Fire NOC threshold against proposed area. Apply if required.' },
      { id: 'd3', whatChanged: 'Additional building investment', existingRecord: 'PSI 2019 — capital subsidy baseline', newOrAmended: 'Additional investment eligible for capital subsidy — update claim evidence', reason: 'Building investment is an eligible capital cost under PSI 2019.', status: 'Review Required', verification: 'Needs Verification', requiredAction: 'Retain building contractor records and invoices. Include in CA certificate at next claim.' },
    ],
    'Add machinery': [
      { id: 'd1', whatChanged: 'New plant and machinery', existingRecord: 'PSI 2019 — declared investment', newOrAmended: 'Additional capital subsidy eligible investment — updated CA certificate', reason: 'Plant & machinery is an eligible capital cost.', status: 'Review Required', verification: 'Needs Verification', requiredAction: 'Retain machinery purchase and installation records.' },
      { id: 'd2', whatChanged: 'Machinery emission impact', existingRecord: 'MPCB CTE — declared process and emission inventory', newOrAmended: 'CTE amendment if machinery introduces new emission source', reason: 'New machinery may introduce process emissions not declared in CTE.', status: 'Review Required', verification: 'Needs Verification', requiredAction: 'Assess emission impact. File CTE amendment if new emission source identified.' },
    ],
    'Add chemical process': [
      { id: 'd1', whatChanged: 'New chemical synthesis process', existingRecord: 'MPCB CTE — declared process', newOrAmended: 'CTE Amendment — new process and chemical disclosure', reason: 'New process introduces undeclared chemicals and emissions.', status: 'Amendment Required', verification: 'Validated', requiredAction: 'File CTE amendment with updated process description and chemical inventory.' },
      { id: 'd2', whatChanged: 'New hazardous chemicals storage', existingRecord: 'No DISH licence (below threshold)', newOrAmended: 'DISH Hazardous Chemicals Licence — potentially triggered', reason: 'New process chemicals may cross the DISH notifiable storage threshold.', status: 'Triggered', verification: 'Needs Verification', requiredAction: 'Assess new chemical quantities against DISH threshold. Apply for licence if required.' },
    ],
    'Increase workforce': [
      { id: 'd1', whatChanged: 'Total workforce increase', existingRecord: 'Declared: 85 workers', newOrAmended: 'Welfare Officer appointment — triggered if workforce reaches 250', reason: 'Amended Factory Rules require welfare officer at 250+ workforce.', status: 'Triggered', verification: 'Validated', requiredAction: 'Plan Welfare Officer appointment if workforce is projected to reach 250.' },
      { id: 'd2', whatChanged: 'Unchanged records', existingRecord: 'All existing approvals, obligations', newOrAmended: 'No change', reason: 'Workforce increase below 250 does not trigger other changes.', status: 'No Change', verification: 'Validated', requiredAction: 'No action required.' },
    ],
    'Acquire land': [
      { id: 'd1', whatChanged: 'New land parcel to be acquired', existingRecord: 'Existing MIDC allotment 5,000 sq m', newOrAmended: 'MIDC additional allotment application or private land conversion', reason: 'Additional land requires a separate regulatory process depending on land type.', status: 'New', verification: 'Needs Verification', requiredAction: 'Identify land type and initiate appropriate land process.' },
    ],
    'Change product': [
      { id: 'd1', whatChanged: 'New pharmaceutical product added', existingRecord: 'MPCB CTE — declared product list', newOrAmended: 'CTE Amendment — updated product and process description', reason: 'New product changes process scope.', status: 'Amendment Required', verification: 'Validated', requiredAction: 'File CTE amendment with updated product list and process description.' },
      { id: 'd2', whatChanged: 'New product — drug manufacturing licence', existingRecord: 'Drug Manufacturing Licence (not yet applied)', newOrAmended: 'New product endorsement required from FDCA', reason: 'Each pharmaceutical product requires separate endorsement on the drug manufacturing licence.', status: 'Triggered', verification: 'Needs Verification', requiredAction: 'Apply for FDCA endorsement for new product before commencing manufacture.' },
    ],
    'Change activity': [
      { id: 'd1', whatChanged: 'Change in industrial activity', existingRecord: 'MPCB CTE — declared activity', newOrAmended: 'CTE Amendment — revised activity description', reason: 'Activity change requires updated CTE disclosure.', status: 'Amendment Required', verification: 'Validated', requiredAction: 'File CTE amendment.' },
    ],
    'Other': [
      { id: 'd1', whatChanged: 'Undescribed change', existingRecord: 'All applicable records', newOrAmended: 'To be determined — regulatory analysis required', reason: 'Nature of change determines regulatory delta.', status: 'Review Required', verification: 'Needs Verification', requiredAction: 'Describe the change in detail. Consult Regulatory Assistant or relationship manager.' },
    ],
  }
  return base[changeType] || []
}

function simCategoryBadge(c: SimImpactCategory) {
  const map: Record<SimImpactCategory, string> = {
    'REMAIN VALID': 'border-[#86efac] bg-[#dcfce7] text-[#166534]',
    'MAY REQUIRE AMENDMENT': 'border-[#fcd34d] bg-[#fef3c7] text-[#92400e]',
    'POTENTIALLY NEW': 'border-[#c4b5fd] bg-[#ede9fe] text-[#5b21b6]',
    'INSPECTION IMPACT': 'border-[#93c5fd] bg-[#dbeafe] text-[#1e40af]',
    'COMPLIANCE IMPACT': 'border-[#fdba74] bg-[#fff7ed] text-[#9a3412]',
    'INCENTIVE IMPACT': 'border-[#fca5a5] bg-[#fee2e2] text-[#b91c1c]',
  }
  return <span className={`text-[10px] font-bold px-1.5 py-0.5 border uppercase tracking-wide ${map[c]}`}>{c}</span>
}

function deltaStatusBadge(s: DeltaItem['status']) {
  const map: Record<DeltaItem['status'], string> = {
    'New': 'border-[#c4b5fd] bg-[#ede9fe] text-[#5b21b6]',
    'Amendment Required': 'border-[#fcd34d] bg-[#fef3c7] text-[#92400e]',
    'No Change': 'border-[#d1d9e0] bg-[#f1f5f9] text-[#64748b]',
    'Triggered': 'border-[#fdba74] bg-[#fff7ed] text-[#9a3412]',
    'Review Required': 'border-[#93c5fd] bg-[#dbeafe] text-[#1e40af]',
  }
  return <span className={`text-[10px] font-semibold px-1.5 py-0.5 border ${map[s]}`}>{s}</span>
}

export function E30BusinessChangeSimulator({ onBack, onGoToE31 }: {
  onBack: () => void
  onGoToE31: (changeType: ChangeType, proposedValue: string) => void
}) {
  const CHANGE_TYPES: ChangeType[] = [
    'Increase production', 'Add machinery', 'Add boiler', 'Add chemical process',
    'Expand building', 'Acquire land', 'Change product', 'Increase workforce',
    'Change activity', 'Other',
  ]
  const [selectedChange, setSelectedChange] = useState<ChangeType | null>(null)
  const [proposedValue, setProposedValue] = useState('')
  const [analysed, setAnalysed] = useState(false)
  const [results, setResults] = useState<SimResult[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const cfg = selectedChange ? CHANGE_TYPE_CONFIG[selectedChange] : null

  function handleAnalyse() {
    if (!selectedChange) return
    setResults(getSimResults(selectedChange))
    setAnalysed(true)
  }

  function handleReset() {
    setSelectedChange(null)
    setProposedValue('')
    setAnalysed(false)
    setResults([])
    setExpandedId(null)
  }

  const needsVerifCount = results.filter(r => r.verification === 'Needs Verification').length
  const actionCount = results.filter(r => r.category !== 'REMAIN VALID').length

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
        <div className="max-w-[1100px] mx-auto">
          <nav className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5">
            <button onClick={onBack} className="hover:text-[#1a3a5c] hover:underline">Dashboard</button>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">Business Change Simulator</span>
          </nav>
          <h1 className="text-xl font-bold text-[#1a3a5c]">Business Change Simulator</h1>
          <p className="text-xs text-[#6b7a8d] mt-0.5">Sahyadri Bio-Pharma Pvt Ltd — Chakan Industrial Area Phase II</p>
          <p className="text-xs text-[#6b7a8d] mt-1">What happens if I change my business? Simulate a proposed change and understand its potential regulatory impact before proceeding.</p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-5 space-y-4">
        {/* Simulation notice */}
        <div className="bg-white border border-[#bfdbfe] border-l-4 border-l-[#1d4ed8] px-4 py-3 text-xs text-[#1e3a8a]">
          <p className="font-semibold mb-0.5">Impact Simulation — not statutory approval</p>
          <p>Results below are a simulation based on your existing Business Profile. They do not constitute regulatory decisions, approvals, or obligations. Changes marked "Needs Verification" require confirmation before being treated as requirements. This simulation does not alter your Business Profile, applications, or compliance obligations.</p>
        </div>

        {/* Step 1 — Select change */}
        <div className="bg-white border border-[#e2e8f0]">
          <div className="px-5 py-3 border-b border-[#e8edf2] bg-[#f8f9fb]">
            <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Step 1 — Select the proposed change</p>
          </div>
          <div className="px-5 py-4">
            <div className="flex flex-wrap gap-2">
              {CHANGE_TYPES.map(ct => (
                <button
                  key={ct}
                  onClick={() => { setSelectedChange(ct); setProposedValue(''); setAnalysed(false); setResults([]) }}
                  className={`text-xs px-3 py-1.5 border font-medium transition-colors ${selectedChange === ct ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]' : 'border-[#d1d9e0] text-[#475569] hover:bg-[#f1f5f9] hover:text-[#1a3a5c]'}`}
                >
                  {ct}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2 — Proposed value */}
        {selectedChange && cfg && (
          <div className="bg-white border border-[#e2e8f0]">
            <div className="px-5 py-3 border-b border-[#e8edf2] bg-[#f8f9fb]">
              <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Step 2 — Describe the proposed change</p>
            </div>
            <div className="px-5 py-5 space-y-4 text-xs">
              <div className="border border-[#e2e8f0] divide-y divide-[#f1f5f9]">
                <div className="flex gap-4 px-3 py-2.5 items-center">
                  <p className="w-48 shrink-0 text-[#64748b] font-medium">Current</p>
                  <p className="text-[#1a2533] font-semibold">{cfg.currentValue}</p>
                </div>
                <div className="flex gap-4 px-3 py-2.5 items-center">
                  <p className="w-48 shrink-0 text-[#64748b] font-medium">Proposed</p>
                  {cfg.proposedOptions ? (
                    <select
                      value={proposedValue}
                      onChange={e => setProposedValue(e.target.value)}
                      className="border border-[#d1d9e0] px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#1a56db] min-w-[180px]"
                    >
                      <option value="">Select proposed value…</option>
                      {cfg.proposedOptions.map(o => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={proposedValue}
                      onChange={e => setProposedValue(e.target.value)}
                      placeholder={cfg.proposedPlaceholder}
                      className="border border-[#d1d9e0] px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#1a56db] min-w-[260px]"
                    />
                  )}
                </div>
              </div>
              <button
                onClick={handleAnalyse}
                className="bg-[#1a3a5c] text-white text-xs font-semibold px-5 py-2 hover:bg-[#0f2540] transition-colors"
              >
                Analyse Regulatory Impact
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Results */}
        {analysed && results.length > 0 && selectedChange && (
          <>
            <div className="bg-white border border-[#e2e8f0]">
              <div className="px-5 py-3 border-b border-[#e8edf2] bg-[#f8f9fb] flex items-center justify-between">
                <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Impact Simulation — {selectedChange}{proposedValue ? ` (${proposedValue})` : ''}</p>
                <span className="text-[10px] font-semibold text-[#92400e] border border-[#fcd34d] bg-[#fef3c7] px-1.5 py-0.5">SIMULATION ONLY — NOT STATUTORY APPROVAL</span>
              </div>

              {/* Summary tiles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-5 py-4 border-b border-[#f1f5f9]">
                {[
                  { label: 'Items analysed', value: results.length, color: 'text-[#1a3a5c]' },
                  { label: 'Require attention', value: actionCount, color: actionCount > 0 ? 'text-[#b91c1c]' : 'text-[#94a3b8]' },
                  { label: 'Needs Verification', value: needsVerifCount, color: needsVerifCount > 0 ? 'text-[#92400e]' : 'text-[#94a3b8]' },
                  { label: 'Remain valid', value: results.filter(r => r.category === 'REMAIN VALID').length, color: 'text-[#166534]' },
                ].map(t => (
                  <div key={t.label} className="bg-[#f8f9fb] border border-[#e8edf2] px-3 py-2.5">
                    <p className={`text-xl font-bold ${t.color}`}>{t.value}</p>
                    <p className="text-[10px] text-[#6b7a8d] mt-0.5">{t.label}</p>
                  </div>
                ))}
              </div>

              {/* Results list */}
              <div className="divide-y divide-[#f1f5f9]">
                {results.map(r => (
                  <div key={r.id}>
                    <button
                      onClick={() => setExpandedId(r.id === expandedId ? null : r.id)}
                      className="w-full text-left px-5 py-3.5 hover:bg-[#f8f9fb] transition-colors"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-[#1a2533] mb-0.5">{r.affectedRecord}</p>
                          <p className="text-[10px] text-[#6b7a8d]">{r.currentState}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {simCategoryBadge(r.category)}
                          {r.verification === 'Needs Verification' && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 border border-[#fcd34d] bg-[#fef3c7] text-[#92400e]">Needs Verification</span>
                          )}
                          <span className="text-[10px] text-[#94a3b8]">{expandedId === r.id ? '▲' : '▼'}</span>
                        </div>
                      </div>
                    </button>
                    {expandedId === r.id && (
                      <div className="bg-[#f8f9fb] border-t border-[#e8edf2] px-5 py-4 space-y-3 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                          <div>
                            <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">Potential Impact</p>
                            <p className="text-[#334155] leading-relaxed">{r.potentialImpact}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">Suggested Next Step</p>
                            <p className="text-[#334155] leading-relaxed">{r.suggestedNextStep}</p>
                          </div>
                        </div>
                        {r.verification === 'Needs Verification' && (
                          <div className="border border-[#fcd34d] bg-[#fefce8] px-3 py-2 text-[#92400e]">
                            Potential impact identified. Applicability to this business requires verification before treating as a confirmed obligation.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA to E31 */}
            <div className="bg-white border border-[#e2e8f0] px-5 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs">
                <p className="font-semibold text-[#1a3a5c]">Accept and convert to regulatory delta?</p>
                <p className="text-[#6b7a8d] mt-0.5">Proceed to Amendments / New Requirements (E31) to generate an actionable regulatory delta for this change.</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => onGoToE31(selectedChange, proposedValue)}
                  className="text-xs bg-[#1a3a5c] text-white px-4 py-2 font-semibold hover:bg-[#0f2540] transition-colors"
                >
                  Proceed to Amendments / New Requirements
                </button>
                <button onClick={handleReset} className="text-xs border border-[#d1d9e0] text-[#475569] px-4 py-2 hover:bg-[#f1f5f9]">Reset Simulation</button>
              </div>
            </div>
          </>
        )}

        {/* Empty — no change selected yet */}
        {!selectedChange && (
          <div className="bg-white border border-[#e2e8f0] px-6 py-10 text-center">
            <p className="text-sm font-semibold text-[#1a3a5c] mb-1">Select a proposed change above to begin the simulation.</p>
            <p className="text-xs text-[#6b7a8d]">The simulator will show the potential regulatory impact based on your existing Business Profile without modifying any records.</p>
          </div>
        )}
      </div>
    </main>
  )
}

export function E31AmendmentsPage({ changeType, proposedValue, onBack, onGoToE30, onGoToE09, onGoToE11, onGoToE14 }: {
  changeType: ChangeType
  proposedValue: string
  onBack: () => void
  onGoToE30: () => void
  onGoToE09: () => void
  onGoToE11: () => void
  onGoToE14: () => void
}) {
  const delta = getE31Delta(changeType)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const cfg = CHANGE_TYPE_CONFIG[changeType]

  const newCount = delta.filter(d => d.status === 'New').length
  const amendCount = delta.filter(d => d.status === 'Amendment Required').length
  const triggeredCount = delta.filter(d => d.status === 'Triggered').length
  const reviewCount = delta.filter(d => d.status === 'Review Required').length
  const needsVerifCount = delta.filter(d => d.verification === 'Needs Verification').length

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
        <div className="max-w-[1200px] mx-auto">
          <nav className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5">
            <button onClick={onBack} className="hover:text-[#1a3a5c] hover:underline">Dashboard</button>
            <span>›</span>
            <button onClick={onGoToE30} className="hover:text-[#1a3a5c] hover:underline">Business Change Simulator</button>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">Amendments / New Requirements</span>
          </nav>
          <h1 className="text-xl font-bold text-[#1a3a5c]">Amendments / New Requirements</h1>
          <p className="text-xs text-[#6b7a8d] mt-0.5">Sahyadri Bio-Pharma Pvt Ltd — Chakan Industrial Area Phase II</p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-5 space-y-4">
        {/* Safety notice */}
        <div className="bg-white border border-[#bfdbfe] border-l-4 border-l-[#1d4ed8] px-4 py-3 text-xs text-[#1e3a8a]">
          <p className="font-semibold mb-0.5">This view does not alter your existing Business Profile, approvals, or compliance obligations.</p>
          <p>The regulatory delta below identifies what changes if the proposed business change is accepted. Items marked "Needs Verification" require confirmation. Historical records are preserved. Existing approvals and obligations are not modified by this view.</p>
        </div>

        {/* Change context */}
        <div className="bg-white border border-[#e2e8f0] px-5 py-4">
          <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-3">Proposed Change</p>
          <div className="flex flex-wrap gap-x-10 gap-y-2 text-xs">
            <div>
              <p className="text-[10px] text-[#64748b] mb-0.5">Change Type</p>
              <p className="font-semibold text-[#1a2533]">{changeType}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#64748b] mb-0.5">Current Value</p>
              <p className="text-[#1a2533]">{cfg.currentValue}</p>
            </div>
            {proposedValue && (
              <div>
                <p className="text-[10px] text-[#64748b] mb-0.5">Proposed Value</p>
                <p className="text-[#1a2533] font-semibold">{proposedValue}</p>
              </div>
            )}
            <div>
              <p className="text-[10px] text-[#64748b] mb-0.5">Status</p>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 border border-[#93c5fd] bg-[#dbeafe] text-[#1e40af]">Proposed — Not Yet Accepted</span>
            </div>
          </div>
        </div>

        {/* Delta summary tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: 'New requirements', value: newCount, color: newCount > 0 ? 'text-[#5b21b6]' : 'text-[#94a3b8]' },
            { label: 'Amendments', value: amendCount, color: amendCount > 0 ? 'text-[#92400e]' : 'text-[#94a3b8]' },
            { label: 'Triggered', value: triggeredCount, color: triggeredCount > 0 ? 'text-[#9a3412]' : 'text-[#94a3b8]' },
            { label: 'Review required', value: reviewCount, color: reviewCount > 0 ? 'text-[#1e40af]' : 'text-[#94a3b8]' },
            { label: 'Needs Verification', value: needsVerifCount, color: needsVerifCount > 0 ? 'text-[#92400e]' : 'text-[#94a3b8]' },
          ].map(t => (
            <div key={t.label} className="bg-white border border-[#e2e8f0] px-4 py-3">
              <p className={`text-2xl font-bold ${t.color}`}>{t.value}</p>
              <p className="text-xs text-[#6b7a8d] mt-0.5">{t.label}</p>
            </div>
          ))}
        </div>

        {/* Journey delta visual */}
        <div className="bg-white border border-[#e2e8f0] px-5 py-4">
          <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-3">Regulatory Delta — Existing Journey vs. Change</p>
          <div className="flex flex-wrap items-start gap-4 text-xs">
            <div className="flex-1 min-w-[200px]">
              <p className="text-[10px] font-semibold text-[#166534] uppercase tracking-wider mb-2">Existing Journey (unchanged)</p>
              <ul className="space-y-1 text-[#334155] border border-[#e2e8f0] divide-y divide-[#f1f5f9]">
                {['MPCB CTE Application — under processing', 'MIDC Allotment — active', 'PSI 2019 Eligibility Certificate — issued', 'Compliance Calendar — active obligations'].map(r => (
                  <li key={r} className="px-3 py-1.5 flex items-start gap-1.5">
                    <span className="text-[#22c55e] mt-0.5 shrink-0">&#10003;</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-[#94a3b8] self-center text-lg font-bold shrink-0">›</div>
            <div className="flex-1 min-w-[200px]">
              <p className="text-[10px] font-semibold text-[#92400e] uppercase tracking-wider mb-2">Delta — Change Impact</p>
              <ul className="space-y-1 border border-[#e2e8f0] divide-y divide-[#f1f5f9]">
                {delta.filter(d => d.status !== 'No Change').map(d => (
                  <li key={d.id} className="px-3 py-1.5 flex items-start gap-1.5">
                    <span className="shrink-0 mt-0.5">{deltaStatusBadge(d.status)}</span>
                    <span className="text-[#334155]">{d.newOrAmended}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Delta items table */}
        <div className="bg-white border border-[#e2e8f0]">
          <div className="px-5 py-3 border-b border-[#e8edf2] bg-[#f8f9fb]">
            <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Regulatory Delta — All Items</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-[#f8f9fb] border-b border-[#e2e8f0]">
                  {['What Changed', 'Existing Record', 'New / Amended Requirement', 'Status', 'Verification', ''].map(h => (
                    <th key={h} className="text-left px-3 py-2.5 text-[10px] font-semibold text-[#64748b] uppercase tracking-wider border-r border-[#e8edf2] last:border-r-0 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {delta.map(d => (
                  <React.Fragment key={d.id}>
                    <tr
                      onClick={() => setExpandedId(d.id === expandedId ? null : d.id)}
                      className={`border-b border-[#f1f5f9] cursor-pointer ${expandedId === d.id ? 'bg-[#ebf3ff]' : 'hover:bg-[#f8f9fb]'} ${d.status === 'No Change' ? 'opacity-60' : ''}`}
                    >
                      <td className="px-3 py-2.5 border-r border-[#f1f5f9] font-medium text-[#1a2533] min-w-[160px]">{d.whatChanged}</td>
                      <td className="px-3 py-2.5 border-r border-[#f1f5f9] text-[#475569] min-w-[180px]">{d.existingRecord}</td>
                      <td className="px-3 py-2.5 border-r border-[#f1f5f9] text-[#334155] min-w-[200px]">{d.newOrAmended}</td>
                      <td className="px-3 py-2.5 border-r border-[#f1f5f9] whitespace-nowrap">{deltaStatusBadge(d.status)}</td>
                      <td className="px-3 py-2.5 border-r border-[#f1f5f9] whitespace-nowrap">
                        {d.verification === 'Needs Verification'
                          ? <span className="text-[10px] font-semibold px-1.5 py-0.5 border border-[#fcd34d] bg-[#fef3c7] text-[#92400e]">Needs Verification</span>
                          : <span className="text-[10px] font-semibold px-1.5 py-0.5 border border-[#86efac] bg-[#dcfce7] text-[#166534]">Validated</span>}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <button className="text-[#1a56db] hover:underline text-[10px]">Detail</button>
                      </td>
                    </tr>
                    {expandedId === d.id && (
                      <tr className="bg-[#f8f9fb]">
                        <td colSpan={6} className="px-5 py-4 border-b border-[#e8edf2]">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-xs">
                            <div>
                              <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">Reason</p>
                              <p className="text-[#334155] leading-relaxed">{d.reason}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">Required Action</p>
                              <p className="text-[#334155] leading-relaxed">{d.requiredAction}</p>
                            </div>
                          </div>
                          {d.verification === 'Needs Verification' && (
                            <div className="mt-3 border border-[#fcd34d] bg-[#fefce8] px-3 py-2 text-xs text-[#92400e]">
                              Applicability requires verification. Do not treat this as a confirmed obligation until validated.
                            </div>
                          )}
                          <div className="mt-3 flex gap-2">
                            {d.status !== 'No Change' && (
                              <button onClick={onGoToE14} className="text-xs border border-[#d1d9e0] text-[#1a3a5c] px-3 py-1.5 hover:bg-[#f1f5f9]">Start Application (E14)</button>
                            )}
                            <button onClick={onGoToE11} className="text-xs border border-[#d1d9e0] text-[#1a3a5c] px-3 py-1.5 hover:bg-[#f1f5f9]">Document Centre (E11)</button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Start Change Workflow CTA */}
        <div className="bg-white border border-[#e2e8f0] px-5 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs">
            <p className="font-semibold text-[#1a3a5c]">Ready to proceed?</p>
            <p className="text-[#6b7a8d] mt-0.5">Start Change Workflow to enter the existing EKATMA application journey for the required amendments and new approvals.</p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <button onClick={onGoToE09} className="text-xs bg-[#1a3a5c] text-white px-4 py-2 font-semibold hover:bg-[#0f2540] transition-colors">Start Change Workflow (E09 Journey)</button>
            <button onClick={onGoToE30} className="text-xs border border-[#d1d9e0] text-[#475569] px-4 py-2 hover:bg-[#f1f5f9]">Back to Simulator</button>
          </div>
        </div>
      </div>
    </main>
  )
}
