'use client';

import React, { useState } from 'react';
import { E28_LIFECYCLE, findIncentiveById, type IncentiveClaim, type IncentiveScheme, type E28LifecycleStage, type IncentiveEligState } from './data';
import { RegAssistantTrigger, type RegAssistantContext } from '../regulatory-assistant/Trigger';

const CLAIM_WORKFLOW_UNAVAILABLE = 'No exact claim query or correction relationship to a business application is documented.';
const CLAIM_DOCUMENT_UNAVAILABLE = 'No exact claim or sanction document is bound to this business and claim.';
const EVIDENCE_UPLOAD_UNAVAILABLE = 'Evidence upload for this claim is not available in the Document Centre workflow.';
const DOCUMENT_CENTRE_UNAVAILABLE = 'No incentive document is bound to this business.';

function incentiveEligBadge(s: IncentiveEligState) {
  const map: Record<IncentiveEligState, string> = {
    'Appears eligible from available data': 'border-[#86efac] bg-[#dcfce7] text-[#166534]',
    'Needs Verification': 'border-[#fcd34d] bg-[#fef3c7] text-[#92400e]',
    'Missing Condition-data': 'border-[#fdba74] bg-[#fff7ed] text-[#9a3412]',
    'Not Currently Applicable': 'border-[#cbd5e1] bg-[#f1f5f9] text-[#64748b]',
  }
  return <span className={`text-[10px] font-semibold px-1.5 py-0.5 border ${map[s]}`}>{s}</span>
}

function conditionStateMark(state: 'satisfied' | 'needs-verification' | 'missing') {
  if (state === 'satisfied') return <span className="text-[#166534] font-bold text-xs">Satisfied</span>
  if (state === 'needs-verification') return <span className="text-[#92400e] font-bold text-xs">Needs Verification</span>
  return <span className="text-[#9a3412] font-bold text-xs">Missing Condition-data</span>
}

export function E26IncentivesPage({ schemes, canOpenDocuments = false, onBack, onGoToScheme, onGoToE11, onOpenRegAssistant }: {
  schemes: IncentiveScheme[]
  canOpenDocuments?: boolean
  onBack: () => void
  onGoToScheme: (id: string) => void
  onGoToE11: () => void
  onOpenRegAssistant?: (ctx: RegAssistantContext) => void
}) {
  const [authFilter, setAuthFilter] = useState('All')
  const [eligFilter, setEligFilter] = useState('All')
  const [catFilter, setCatFilter] = useState('All')

  const allAuthorities = ['All', ...Array.from(new Set(schemes.map(s => s.authority)))]
  const allEligs: Array<'All' | IncentiveEligState> = ['All', 'Appears eligible from available data', 'Needs Verification', 'Missing Condition-data', 'Not Currently Applicable']
  const allCats = ['All', ...Array.from(new Set(schemes.map(s => s.category)))]

  const filtered = schemes.filter(s => {
    if (authFilter !== 'All' && s.authority !== authFilter) return false
    if (eligFilter !== 'All' && s.eligState !== eligFilter) return false
    if (catFilter !== 'All' && s.category !== catFilter) return false
    return true
  })

  const appearsElig = schemes.filter(s => s.eligState === 'Appears eligible from available data').length
  const needsVerif = schemes.filter(s => s.eligState === 'Needs Verification').length

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
        <div className="max-w-[1280px] mx-auto">
          <nav className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5">
            <button onClick={onBack} className="hover:text-[#1a3a5c] hover:underline">Dashboard</button>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">Incentives</span>
          </nav>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-[#1a3a5c]">Incentives</h1>
              <p className="text-xs text-[#6b7a8d] mt-0.5">Sahyadri Bio-Pharma Pvt Ltd — Chakan Industrial Area Phase II</p>
            </div>
            {onOpenRegAssistant && (
              <RegAssistantTrigger lang="en" size="sm" onClick={() => onOpenRegAssistant({ entryPoint: 'incentive', initialQuestion: 'Why is this scheme applicable to my business?' })} />
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-5 space-y-4">
        {/* Summary tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Schemes Identified', value: schemes.length, color: 'text-[#1a3a5c]' },
            { label: 'Appears Eligible', value: appearsElig, color: 'text-[#166534]' },
            { label: 'Needs Verification', value: needsVerif, color: 'text-[#92400e]' },
            { label: 'Not Currently Applicable', value: schemes.filter(s => s.eligState === 'Not Currently Applicable').length, color: 'text-[#64748b]' },
          ].map(t => (
            <div key={t.label} className="bg-white border border-[#e2e8f0] px-4 py-3">
              <p className={`text-2xl font-bold ${t.color}`}>{t.value}</p>
              <p className="text-xs text-[#6b7a8d] mt-0.5">{t.label}</p>
            </div>
          ))}
        </div>

        {/* Match basis notice */}
        <div className="bg-white border border-[#bfdbfe] border-l-4 border-l-[#1d4ed8] px-4 py-3 text-xs text-[#1e3a8a]">
          <p className="font-semibold mb-0.5">Matched using your Business Profile</p>
          <p>Schemes below were identified using your existing Business DNA — sector, location, classification, investment, employment, and incentive attributes. This is a preliminary match only. <strong>Final eligibility is subject to scheme rules and verification by the administering authority.</strong></p>
        </div>

        {/* Filters */}
        <div className="bg-white border border-[#e2e8f0] px-4 py-3 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Authority</label>
            <select value={authFilter} onChange={e => setAuthFilter(e.target.value)} className="text-xs border border-[#d1d9e0] px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#1a56db] max-w-[200px]">
              {allAuthorities.map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Eligibility State</label>
            <select value={eligFilter} onChange={e => setEligFilter(e.target.value)} className="text-xs border border-[#d1d9e0] px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#1a56db] max-w-[240px]">
              {allEligs.map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Category</label>
            <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="text-xs border border-[#d1d9e0] px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#1a56db]">
              {allCats.map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          {(authFilter !== 'All' || eligFilter !== 'All' || catFilter !== 'All') && (
            <button onClick={() => { setAuthFilter('All'); setEligFilter('All'); setCatFilter('All') }} className="text-xs text-[#b91c1c] hover:underline ml-1">Clear</button>
          )}
        </div>

        {/* Scheme table */}
        <div className="bg-white border border-[#e2e8f0] overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-[#f8f9fb] border-b border-[#e2e8f0]">
                {['Scheme', 'Administering Authority', 'Potential Benefits', 'Eligibility State', 'Key Milestone', ''].map(h => (
                  <th key={h} className="text-left px-3 py-2.5 text-[10px] font-semibold text-[#64748b] uppercase tracking-wider border-r border-[#e8edf2] last:border-r-0 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-[#94a3b8]">No schemes match the current filters.</td></tr>
              ) : filtered.map(s => (
                <tr key={s.id} className="border-b border-[#f1f5f9] hover:bg-[#f8f9fb]">
                  <td className="px-3 py-2.5 border-r border-[#f1f5f9] min-w-[200px]">
                    <div>
                      <button onClick={() => onGoToScheme(s.id)} className="font-medium text-[#1a3a5c] hover:underline text-left leading-snug">{s.name}</button>
                      <p className="text-[10px] font-mono text-[#94a3b8] mt-0.5">{s.id}</p>
                      <p className="text-[10px] text-[#64748b] mt-1">{s.category}</p>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-[#475569] border-r border-[#f1f5f9] min-w-[180px]">{s.authority}</td>
                  <td className="px-3 py-2.5 text-[#475569] border-r border-[#f1f5f9] min-w-[200px] leading-relaxed">{s.potentialBenefits}</td>
                  <td className="px-3 py-2.5 border-r border-[#f1f5f9] whitespace-nowrap">{incentiveEligBadge(s.eligState)}</td>
                  <td className="px-3 py-2.5 text-[#475569] border-r border-[#f1f5f9] min-w-[180px]">{s.keyMilestone}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <button onClick={() => onGoToScheme(s.id)} className="text-xs text-[#1a56db] hover:underline font-medium">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Disclaimer */}
        <div className="bg-white border border-[#e2e8f0] px-4 py-3 text-xs text-[#6b7a8d]">
          <p><strong className="text-[#1a3a5c]">Important:</strong> Preliminary match based on available business data. "Appears eligible from available data" does not constitute a legal eligibility determination. Final eligibility is subject to scheme rules, conditions, and verification by the administering authority. Contact the relevant authority or your relationship manager to proceed.</p>
          <p className="mt-1.5">
            Documents available for incentive eligibility:{' '}
            <button onClick={onGoToE11} disabled={!canOpenDocuments} title={!canOpenDocuments ? DOCUMENT_CENTRE_UNAVAILABLE : undefined} className="text-[#1a56db] hover:underline disabled:opacity-50 disabled:cursor-not-allowed">View Document Centre (E11)</button>
            {!canOpenDocuments && <span className="ml-2">{DOCUMENT_CENTRE_UNAVAILABLE}</span>}
          </p>
        </div>
      </div>
    </main>
  )
}

export function E27IncentiveDetailPage({ schemeId, canOpenDocuments = false, canOpenClaims = false, onBack, onGoToE26, onGoToE11, onGoToE28, onOpenRegAssistant }: {
  schemeId: string
  canOpenDocuments?: boolean
  canOpenClaims?: boolean
  onBack: () => void
  onGoToE26: () => void
  onGoToE11: () => void
  onGoToE28: () => void
  onOpenRegAssistant?: (ctx: RegAssistantContext) => void
}) {
  const scheme = findIncentiveById(schemeId) ?? (() => { throw new Error(`Unknown incentive scheme: ${schemeId}`) })()
  const [selectedBenefitId, setSelectedBenefitId] = useState(scheme.benefits[0]?.id ?? '')
  const [ragOpen, setRagOpen] = useState(false)
  const [ragInput, setRagInput] = useState('')
  const [ragMessages, setRagMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([])

  const benefit = scheme.benefits.find(b => b.id === selectedBenefitId) || scheme.benefits[0]

  const RAG_SUGGESTED = [
    'Why does this scheme appear relevant to my business?',
    'Which condition is missing?',
    'What evidence is required?',
    'What needs verification?',
    'How is the estimated benefit calculated?',
  ]

  function handleRagSend(text: string) {
    if (!text.trim()) return
    const responses: Record<string, string> = {
      'Why does this scheme appear relevant to my business?': `This scheme appears relevant because: ${scheme.matchBasis.join('; ')}.`,
      'Which condition is missing?': benefit.conditions.filter(c => c.state === 'missing').map(c => c.text).join('; ') || 'No missing conditions identified for this benefit at this stage.',
      'What evidence is required?': benefit.requiredEvidence.join('; '),
      'What needs verification?': benefit.verificationNeeds.join('; ') || 'No specific verification needs identified for this benefit.',
      'How is the estimated benefit calculated?': benefit.estimatedBenefit || 'An estimate is not available for this benefit. The administering authority determines the final quantum based on verified data.',
    }
    const reply = responses[text] || `For specific information about ${benefit.name} under ${scheme.name}, refer to the scheme notification or contact ${scheme.authority}.`
    setRagMessages(prev => [...prev, { role: 'user', text }, { role: 'assistant', text: reply }])
    setRagInput('')
  }

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      {/* Page header */}
      <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
        <div className="max-w-[1100px] mx-auto">
          <nav className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5">
            <button onClick={onBack} className="hover:text-[#1a3a5c] hover:underline">Dashboard</button>
            <span>›</span>
            <button onClick={onGoToE26} className="hover:text-[#1a3a5c] hover:underline">Incentives</button>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">Scheme Detail</span>
          </nav>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-[#1a3a5c]">{scheme.name}</h1>
              <p className="text-xs text-[#6b7a8d] mt-0.5">Sahyadri Bio-Pharma Pvt Ltd — Chakan Industrial Area Phase II</p>
            </div>
            {onOpenRegAssistant && (
              <RegAssistantTrigger lang="en" size="sm" onClick={() => onOpenRegAssistant({ entryPoint: 'incentive', recordId: scheme.id, recordName: scheme.name, department: scheme.authority, initialQuestion: 'Why is this scheme applicable to my business?' })} />
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-5 space-y-4">
        {/* Scheme header card */}
        <div className="bg-white border border-[#e2e8f0] px-5 py-4 space-y-3">
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs">
            <div>
              <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-0.5">Administered by</p>
              <p className="text-[#1a2533] font-medium">{scheme.authority}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-0.5">Category</p>
              <p className="text-[#1a2533]">{scheme.category}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-0.5">Scheme Reference</p>
              <p className="text-[#1a2533] font-mono">{scheme.id}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-0.5">Overall Eligibility (Preliminary)</p>
              <div className="mt-0.5">{incentiveEligBadge(scheme.eligState)}</div>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">Matched using your Business Profile</p>
            <ul className="space-y-0.5">
              {scheme.matchBasis.map((m, i) => (
                <li key={i} className="text-xs text-[#334155] flex items-start gap-1.5">
                  <span className="text-[#22c55e] mt-0.5 shrink-0">&#10003;</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-[#f1f5f9] pt-2 text-xs text-[#6b7a8d]">
            Preliminary match only. Final eligibility is subject to scheme rules and verification by the administering authority.
          </div>
        </div>

        {/* Benefits structure */}
        <div className="bg-white border border-[#e2e8f0]">
          <div className="px-5 py-3 border-b border-[#e8edf2] bg-[#f8f9fb]">
            <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Scheme Benefits</p>
            <p className="text-[10px] text-[#6b7a8d] mt-0.5">One scheme may contain multiple benefits. Eligibility may differ by benefit.</p>
          </div>
          <div className="flex">
            {/* Benefit selector sidebar */}
            <div className="w-[220px] shrink-0 border-r border-[#e8edf2] divide-y divide-[#f1f5f9]">
              {scheme.benefits.map(b => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBenefitId(b.id)}
                  className={`w-full text-left px-4 py-3 text-xs transition-colors ${selectedBenefitId === b.id ? 'bg-[#ebf3ff] font-semibold text-[#1a3a5c]' : 'hover:bg-[#f8f9fb] text-[#475569]'}`}
                >
                  <p className="leading-snug">{b.name}</p>
                  <div className="mt-1">{incentiveEligBadge(b.eligState)}</div>
                </button>
              ))}
            </div>

            {/* Benefit detail */}
            {benefit && (
              <div className="flex-1 min-w-0 px-5 py-4 space-y-4 text-xs">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-bold text-[#1a3a5c]">{benefit.name}</h2>
                    <div className="mt-1">{incentiveEligBadge(benefit.eligState)}</div>
                  </div>
                  <button onClick={onGoToE28} disabled={!canOpenClaims} title={!canOpenClaims ? 'No claims for this scheme are bound to the current business.' : undefined} className="text-xs bg-[#1a3a5c] text-white px-3 py-1.5 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0">View Application / Claims</button>
                  {!canOpenClaims && <p className="text-xs text-[#6b7a8d]">No claims for this scheme are bound to the current business.</p>}
                </div>

                {/* Estimated benefit */}
                <div>
                  <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">Estimated Benefit</p>
                  {benefit.estimatedBenefit
                    ? <p className="text-[#1a2533] border border-[#e2e8f0] bg-[#f8f9fb] px-3 py-2">{benefit.estimatedBenefit}</p>
                    : <p className="text-[#94a3b8] italic">Benefit estimate not available — quantum determined by administering authority upon verification.</p>}
                </div>

                {/* Eligibility conditions */}
                <div>
                  <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-2">Eligibility Conditions</p>
                  <div className="border border-[#e2e8f0] divide-y divide-[#f1f5f9]">
                    {benefit.conditions.map((c, i) => (
                      <div key={i} className="flex items-start justify-between gap-4 px-3 py-2">
                        <p className="text-[#334155] leading-snug">{c.text}</p>
                        <div className="shrink-0">{conditionStateMark(c.state)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verification needs */}
                {benefit.verificationNeeds.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">Verification Needs</p>
                    <ul className="border border-[#fcd34d] bg-[#fefce8] px-3 py-2 space-y-1">
                      {benefit.verificationNeeds.map((v, i) => (
                        <li key={i} className="text-[#92400e] flex items-start gap-1.5">
                          <span className="shrink-0 mt-0.5">&#9679;</span>
                          {v}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Required evidence */}
                <div>
                  <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">Required Evidence</p>
                  <ul className="space-y-1">
                    {benefit.requiredEvidence.map((e, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#334155]">
                        <span className="shrink-0 text-[#64748b] mt-0.5">&#8226;</span>
                        <span>{e}</span>
                        <button disabled title="No exact evidence selection workflow is connected to this scheme." className="ml-auto text-[10px] text-[#1a56db] opacity-50 cursor-not-allowed shrink-0 whitespace-nowrap">Use Existing Document</button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Application steps */}
                <div>
                  <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-2">Application Process</p>
                  <div className="flex flex-wrap items-center gap-1 text-[10px]">
                    {benefit.applicationSteps.map((step, i) => (
                      <span key={i} className="flex items-center gap-1">
                        <span className="border border-[#d1d9e0] bg-[#f8f9fb] px-2 py-1 text-[#334155] font-medium">{step}</span>
                        {i < benefit.applicationSteps.length - 1 && <span className="text-[#94a3b8]">›</span>}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Claim cycle */}
                {benefit.claimCycle && (
                  <div>
                    <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">Claim Cycle</p>
                    <p className="text-[#334155]">{benefit.claimCycle}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Regulatory Assistant */}
        <div className="bg-white border border-[#e2e8f0]">
          <button
            onClick={() => setRagOpen(v => !v)}
            className="w-full flex items-center justify-between px-5 py-3 text-xs font-semibold text-[#1a3a5c] hover:bg-[#f8f9fb] transition-colors"
          >
            <span>Regulatory Assistant — Incentive Queries</span>
            <span className="text-[#6b7a8d] font-normal">{ragOpen ? '▲ Hide' : '▼ Show'}</span>
          </button>
          {ragOpen && (
            <div className="border-t border-[#e8edf2] px-5 py-4 space-y-3">
              <p className="text-[10px] text-[#6b7a8d]">Ask about this scheme or benefit. Responses are based on configured information and do not constitute a legal eligibility determination.</p>
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
                  placeholder="Ask about this scheme or benefit..."
                  className="flex-1 text-xs border border-[#d1d9e0] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#1a56db]"
                />
                <button onClick={() => handleRagSend(ragInput)} className="text-xs bg-[#1a3a5c] text-white px-4 py-2 font-semibold hover:bg-[#0f2540] transition-colors">Send</button>
              </div>
            </div>
          )}
        </div>

        {/* Footer disclaimer */}
        <div className="bg-white border border-[#e2e8f0] px-4 py-3 text-xs text-[#6b7a8d]">
          <p><strong className="text-[#1a3a5c]">Disclaimer:</strong> Information shown is based on your existing Business Profile and configured scheme data. Preliminary match is not a final legal eligibility determination. Proceed with the administering authority for formal assessment.</p>
          <div className="mt-2 flex flex-wrap gap-4">
            <button onClick={onGoToE11} disabled={!canOpenDocuments} title={!canOpenDocuments ? DOCUMENT_CENTRE_UNAVAILABLE : undefined} className="text-[#1a56db] hover:underline disabled:opacity-50 disabled:cursor-not-allowed">Document Centre (E11)</button>
            {!canOpenDocuments && <span>{DOCUMENT_CENTRE_UNAVAILABLE}</span>}
            <button onClick={onGoToE26} className="text-[#1a56db] hover:underline">Back to Incentives List</button>
          </div>
        </div>
      </div>
    </main>
  )
}


function e28StatusBadge(s: E28LifecycleStage) {
  const map: Record<E28LifecycleStage, string> = {
    'Eligibility Application': 'border-[#93c5fd] bg-[#dbeafe] text-[#1e40af]',
    'Department Scrutiny': 'border-[#93c5fd] bg-[#dbeafe] text-[#1e40af]',
    'Eligibility Certificate': 'border-[#86efac] bg-[#dcfce7] text-[#166534]',
    'Claim Period': 'border-[#d1d9e0] bg-[#f1f5f9] text-[#475569]',
    'Claim Submitted': 'border-[#93c5fd] bg-[#dbeafe] text-[#1e40af]',
    'Under Verification': 'border-[#fcd34d] bg-[#fef3c7] text-[#92400e]',
    'Sanctioned': 'border-[#86efac] bg-[#dcfce7] text-[#166534]',
    'Disbursed': 'border-[#86efac] bg-[#dcfce7] text-[#166534]',
    'Correction Required': 'border-[#fca5a5] bg-[#fee2e2] text-[#b91c1c]',
  }
  return <span className={`text-[10px] font-semibold px-1.5 py-0.5 border ${map[s]}`}>{s}</span>
}

export function E28IncentiveClaimsPage({ schemeId, claims = [], canOpenDocuments = false, onBack, onGoToE26, onGoToE27, onGoToE11, onGoToE12, onOpenRegAssistant }: {
  schemeId: string
  claims?: IncentiveClaim[]
  canOpenDocuments?: boolean
  onBack: () => void
  onGoToE26: () => void
  onGoToE27: () => void
  onGoToE11: () => void
  onGoToE12?: (id: string) => void
  onOpenRegAssistant?: (ctx: RegAssistantContext) => void
}) {
  const scheme = findIncentiveById(schemeId) ?? (() => { throw new Error(`Unknown incentive scheme: ${schemeId}`) })()
  const [activeTab, setActiveTab] = useState<'application' | 'certificate' | 'claims'>('certificate')
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null)
  const [showNewClaimModal, setShowNewClaimModal] = useState(false)
  const [newClaimBenefit, setNewClaimBenefit] = useState('Electricity Duty Exemption')
  const [newClaimPeriod, setNewClaimPeriod] = useState('Apr 2027 – Sep 2027')
  const [newClaimAmount, setNewClaimAmount] = useState('')
  const [newClaimSubmitted, setNewClaimSubmitted] = useState(false)
  const [ragOpen, setRagOpen] = useState(false)
  const [ragInput, setRagInput] = useState('')
  const [ragMessages, setRagMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([])

  const currentLifecycleStage: E28LifecycleStage = 'Under Verification'
  const currentStageIdx = E28_LIFECYCLE.indexOf(currentLifecycleStage)

  const selectedClaim = selectedClaimId ? claims.find(c => c.id === selectedClaimId) : null

  const RAG_SUGGESTED = [
    'What benefit am I applying for?',
    'What evidence is required for the claim?',
    'Why was this claim marked for correction?',
    'What is the difference between claimed and sanctioned amount?',
    'What is the claim period?',
    'What does this eligibility condition mean?',
  ]

  function handleRagSend(text: string) {
    if (!text.trim()) return
    const responses: Record<string, string> = {
      'What benefit am I applying for?': `You are pursuing the eligibility process and periodic claims for benefits under ${scheme.name} administered by ${scheme.authority}. Current active benefits: Capital Subsidy and Electricity Duty Exemption.`,
      'What evidence is required for the claim?': 'For Capital Subsidy: CA-certified Fixed Capital Investment Statement, Commencement of Production Certificate, MIDC Allotment Letter. For Electricity Duty Exemption: Electricity bills for the claim period, Commencement of Production Certificate.',
      'Why was this claim marked for correction?': 'Claim CLM-2027-002 (Electricity Duty Exemption) has been marked Correction Required due to a discrepancy in the Commencement of Production date. A corrected certificate must be resubmitted.',
      'What is the difference between claimed and sanctioned amount?': 'The claimed amount is what you submitted in your claim. The sanctioned amount is what the department approves after verification — these may differ if the department adjusts the eligible quantum.',
      'What is the claim period?': 'A claim period is the time interval covered by a single claim submission. For this scheme, claims are submitted on a half-yearly basis (e.g. Apr–Sep, Oct–Mar).',
      'What does this eligibility condition mean?': 'Eligibility conditions are the criteria that must be satisfied before benefits can be claimed. Refer to your Eligibility Certificate (EC-PSI-2026-01248) for the specific conditions applicable to this scheme and your business.',
    }
    const reply = responses[text] || `For specific information about ${scheme.name}, refer to the Eligibility Certificate or contact ${scheme.authority}.`
    setRagMessages(prev => [...prev, { role: 'user', text }, { role: 'assistant', text: reply }])
    setRagInput('')
  }

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      {/* Page header */}
      <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
        <div className="max-w-[1200px] mx-auto">
          <nav className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5 flex-wrap">
            <button onClick={onBack} className="hover:text-[#1a3a5c] hover:underline">Dashboard</button>
            <span>›</span>
            <button onClick={onGoToE26} className="hover:text-[#1a3a5c] hover:underline">Incentives</button>
            <span>›</span>
            <button onClick={onGoToE27} className="hover:text-[#1a3a5c] hover:underline">{scheme.name}</button>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">Application / Claims</span>
          </nav>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-[#1a3a5c]">Incentive Application / Claims</h1>
              <p className="text-xs text-[#6b7a8d] mt-0.5">Sahyadri Bio-Pharma Pvt Ltd — Chakan Industrial Area Phase II</p>
            </div>
            {onOpenRegAssistant && (
              <RegAssistantTrigger lang="en" size="sm" onClick={() => onOpenRegAssistant({ entryPoint: 'incentive', recordId: schemeId, recordName: scheme.name, department: scheme.authority, initialQuestion: 'What needs verification before I apply?' })} />
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-5 space-y-4">
        {/* Scheme + context */}
        <div className="bg-white border border-[#e2e8f0] px-5 py-4">
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs">
            <div>
              <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-0.5">Scheme</p>
              <button onClick={onGoToE27} className="text-[#1a3a5c] font-medium hover:underline text-left">{scheme.name}</button>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-0.5">Authority</p>
              <p className="text-[#1a2533]">{scheme.authority}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-0.5">Reference</p>
              <p className="text-[#1a2533] font-mono">{scheme.id}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-0.5">Current Stage</p>
              <div className="mt-0.5">{e28StatusBadge(currentLifecycleStage)}</div>
            </div>
          </div>
        </div>

        {/* Lifecycle tracker */}
        <div className="bg-white border border-[#e2e8f0] px-5 py-4">
          <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-3">Incentive Lifecycle</p>
          <div className="flex flex-wrap items-start gap-0">
            {E28_LIFECYCLE.map((stage, idx) => {
              const isPast = idx < currentStageIdx
              const isCurrent = idx === currentStageIdx
              const isFuture = idx > currentStageIdx
              return (
                <div key={stage} className="flex items-center">
                  <div className={`flex flex-col items-center`}>
                    <div className={`w-2.5 h-2.5 rounded-full border-2 shrink-0 ${isCurrent ? 'bg-[#1a3a5c] border-[#1a3a5c]' : isPast ? 'bg-[#22c55e] border-[#22c55e]' : 'bg-white border-[#d1d9e0]'}`} />
                    <p className={`text-[9px] mt-1 text-center max-w-[64px] leading-tight ${isCurrent ? 'font-bold text-[#1a3a5c]' : isPast ? 'text-[#166534]' : 'text-[#94a3b8]'}`}>{stage}</p>
                  </div>
                  {idx < E28_LIFECYCLE.length - 1 && (
                    <div className={`h-px w-6 shrink-0 mb-4 mx-0.5 ${isPast ? 'bg-[#22c55e]' : 'bg-[#d1d9e0]'}`} />
                  )}
                </div>
              )
            })}
          </div>
          {/* Correction notice */}
          {claims.some(claim => claim.id === 'CLM-2027-002' && claim.status === 'Correction Required') && <div className="mt-3 border-l-4 border-l-[#b91c1c] bg-[#fef2f2] border border-[#fca5a5] px-3 py-2 text-xs text-[#b91c1c]">
            <p className="font-semibold">Correction Required — Claim CLM-2027-002</p>
            <p className="mt-0.5 text-[#7f1d1d]">Commencement of Production date discrepancy. Resubmit corrected certificate. <button disabled title={CLAIM_WORKFLOW_UNAVAILABLE} className="underline font-medium opacity-50 cursor-not-allowed">Respond to Query (E20)</button> or <button disabled title={CLAIM_WORKFLOW_UNAVAILABLE} className="underline font-medium opacity-50 cursor-not-allowed">Submit Correction (E21)</button>.</p>
            <p className="mt-1 text-[#7f1d1d]">{CLAIM_WORKFLOW_UNAVAILABLE}</p>
          </div>}
        </div>

        {/* Tabs */}
        <div className="bg-white border border-[#e2e8f0]">
          <div className="flex border-b border-[#e2e8f0]">
            {([
              { key: 'application', label: 'Eligibility Application' },
              { key: 'certificate', label: 'Eligibility Certificate' },
              { key: 'claims', label: 'Periodic Claims' },
            ] as const).map(t => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`text-xs px-5 py-2.5 font-medium border-r border-[#e2e8f0] last:border-r-0 transition-colors ${activeTab === t.key ? 'bg-[#1a3a5c] text-white' : 'text-[#475569] hover:bg-[#f8f9fb]'}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ── Eligibility Application ── */}
          {activeTab === 'application' && (
            <div className="px-5 py-5 space-y-5 text-xs">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-sm font-bold text-[#1a3a5c]">Eligibility Application</h2>
                  <div className="mt-1">{e28StatusBadge('Eligibility Certificate')}</div>
                  <p className="text-[#6b7a8d] mt-1">Application submitted and Eligibility Certificate issued. The eligibility stage is complete.</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button onClick={() => setActiveTab('certificate')} className="text-xs border border-[#d1d9e0] text-[#1a3a5c] px-3 py-1.5 hover:bg-[#f1f5f9] text-left">View Certificate</button>
                  <button onClick={onGoToE27} className="text-xs border border-[#d1d9e0] text-[#1a3a5c] px-3 py-1.5 hover:bg-[#f1f5f9] text-left">View Eligibility Conditions (E27)</button>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-2">Application Summary</p>
                <div className="border border-[#e2e8f0] divide-y divide-[#f1f5f9]">
                  {[
                    { label: 'Application Reference', value: 'INC-APP-2026-00341' },
                    { label: 'Submitted', value: '18 Jun 2026' },
                    { label: 'Scheme', value: scheme.name },
                    { label: 'Benefits Applied For', value: 'Capital Subsidy; Electricity Duty Exemption' },
                    { label: 'Authority', value: scheme.authority },
                    { label: 'Business / Project', value: 'Sahyadri Bio-Pharma Pvt Ltd — Chakan Industrial Area Phase II' },
                    { label: 'Processing Stage', value: 'Eligibility Certificate Issued' },
                  ].map(r => (
                    <div key={r.label} className="flex gap-4 px-3 py-2">
                      <p className="w-48 shrink-0 text-[#64748b]">{r.label}</p>
                      <p className="text-[#1a2533] font-medium">{r.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-2">Application Documents</p>
                <div className="border border-[#e2e8f0] divide-y divide-[#f1f5f9]">
                  {[
                    { name: 'CA-certified Fixed Capital Investment Statement', status: 'Verified' },
                    { name: 'MIDC Allotment Letter — Chakan Phase II', status: 'Verified' },
                    { name: 'Entity PAN & CIN', status: 'Verified' },
                    { name: 'Udyam MSME Registration Certificate', status: 'Verified' },
                  ].map(d => (
                    <div key={d.name} className="flex items-center justify-between px-3 py-2 gap-4">
                      <p className="text-[#334155]">{d.name}</p>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] font-semibold text-[#166534] border border-[#86efac] bg-[#dcfce7] px-1.5 py-0.5">{d.status}</span>
                        <button disabled title={CLAIM_DOCUMENT_UNAVAILABLE} className="text-[#1a56db] text-[10px] opacity-50 cursor-not-allowed">View in E11</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-[#bfdbfe] border-l-4 border-l-[#1d4ed8] px-3 py-2 text-[#1e3a8a]">
                Preliminary eligibility information from E27 informed this application. The Eligibility Certificate represents the formal eligibility determination by the administering authority.
              </div>
            </div>
          )}

          {/* ── Eligibility Certificate ── */}
          {activeTab === 'certificate' && (
            <div className="px-5 py-5 space-y-5 text-xs">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-sm font-bold text-[#1a3a5c]">Eligibility Certificate</h2>
                  <div className="mt-1">{e28StatusBadge('Eligibility Certificate')}</div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button onClick={() => onGoToE12?.('DOC-INC-001')} disabled={!onGoToE12} title={!onGoToE12 ? DOCUMENT_CENTRE_UNAVAILABLE : undefined} className="text-xs bg-[#1a3a5c] text-white px-3 py-1.5 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">View Certificate</button>
                  <button onClick={onGoToE11} disabled={!canOpenDocuments} title={!canOpenDocuments ? DOCUMENT_CENTRE_UNAVAILABLE : undefined} className="text-xs border border-[#d1d9e0] text-[#1a3a5c] px-3 py-1.5 text-left disabled:opacity-50 disabled:cursor-not-allowed">View in Document Centre (E11)</button>
                  {!canOpenDocuments && <p className="text-xs text-[#6b7a8d]">{DOCUMENT_CENTRE_UNAVAILABLE}</p>}
                </div>
              </div>

              <div className="border border-[#e2e8f0] divide-y divide-[#f1f5f9]">
                {[
                  { label: 'Certificate ID', value: 'EC-PSI-2026-01248' },
                  { label: 'Scheme', value: scheme.name },
                  { label: 'Issued by', value: scheme.authority },
                  { label: 'Issue Date', value: '04 Aug 2026' },
                  { label: 'Valid Until', value: '03 Aug 2031' },
                  { label: 'Business / Project', value: 'Sahyadri Bio-Pharma Pvt Ltd — Chakan Industrial Area Phase II' },
                  { label: 'Reference', value: scheme.id },
                ].map(r => (
                  <div key={r.label} className="flex gap-4 px-3 py-2">
                    <p className="w-48 shrink-0 text-[#64748b]">{r.label}</p>
                    <p className="text-[#1a2533] font-medium">{r.value}</p>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-2">Eligible Benefits</p>
                <div className="border border-[#e2e8f0]">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#f8f9fb] border-b border-[#e2e8f0]">
                        {['Benefit', 'Eligible Quantum', 'Period', 'Claim Frequency'].map(h => (
                          <th key={h} className="text-left px-3 py-2 text-[10px] font-semibold text-[#64748b] uppercase tracking-wider border-r border-[#e8edf2] last:border-r-0">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#f1f5f9]">
                        <td className="px-3 py-2 border-r border-[#f1f5f9] font-medium text-[#1a2533]">Capital Subsidy</td>
                        <td className="px-3 py-2 border-r border-[#f1f5f9] text-[#475569]">25% of eligible fixed capital investment (as determined)</td>
                        <td className="px-3 py-2 border-r border-[#f1f5f9] text-[#475569]">One-time on investment milestones</td>
                        <td className="px-3 py-2 text-[#475569]">Milestone-based</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-r border-[#f1f5f9] font-medium text-[#1a2533]">Electricity Duty Exemption</td>
                        <td className="px-3 py-2 border-r border-[#f1f5f9] text-[#475569]">100% electricity duty — up to 7 years from commencement of production</td>
                        <td className="px-3 py-2 border-r border-[#f1f5f9] text-[#475569]">Aug 2026 – Jul 2033</td>
                        <td className="px-3 py-2 text-[#475569]">Half-yearly</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-2">Certificate Conditions</p>
                <ul className="border border-[#e2e8f0] divide-y divide-[#f1f5f9]">
                  {[
                    'Maintain minimum employment as declared in application throughout the benefit period.',
                    'Submit half-yearly claim returns within 60 days of close of each claim period.',
                    'Notify the authority of any change in business classification, ownership, or location within 30 days.',
                    'Retain and produce all evidence records for a minimum of 7 years.',
                  ].map((c, i) => (
                    <li key={i} className="px-3 py-2 text-[#334155] flex items-start gap-2">
                      <span className="text-[#64748b] shrink-0">{i + 1}.</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-[#d1d9e0] bg-[#f8f9fb] px-3 py-2 text-[#6b7a8d]">
                This certificate does not guarantee disbursement. Each periodic claim is subject to verification and sanction by the administering authority.
              </div>
            </div>
          )}

          {/* ── Periodic Claims ── */}
          {activeTab === 'claims' && (
            <div className="px-5 py-5 space-y-4 text-xs">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-bold text-[#1a3a5c]">Periodic Claims</h2>
                  <p className="text-[#6b7a8d] mt-0.5">Half-yearly claims under Eligibility Certificate EC-PSI-2026-01248</p>
                </div>
                <button onClick={() => { setNewClaimSubmitted(false); setShowNewClaimModal(true) }} className="text-xs bg-[#1a3a5c] text-white px-3 py-1.5 font-semibold hover:bg-[#0f2540]">Preview New Claim</button>
              </div>

              {/* Claims table */}
              <div className="border border-[#e2e8f0] overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f8f9fb] border-b border-[#e2e8f0]">
                      {['Claim ID', 'Period', 'Benefit', 'Claimed Amount', 'Submission Date', 'Status', 'Sanctioned Amount', 'Disbursement', ''].map(h => (
                        <th key={h} className="text-left px-3 py-2.5 text-[10px] font-semibold text-[#64748b] uppercase tracking-wider border-r border-[#e8edf2] last:border-r-0 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {claims.map(c => (
                      <tr
                        key={c.id}
                        onClick={() => setSelectedClaimId(c.id === selectedClaimId ? null : c.id)}
                        className={`border-b border-[#f1f5f9] cursor-pointer ${selectedClaimId === c.id ? 'bg-[#ebf3ff]' : 'hover:bg-[#f8f9fb]'}`}
                      >
                        <td className="px-3 py-2.5 border-r border-[#f1f5f9] font-mono text-[#475569] whitespace-nowrap">{c.id}</td>
                        <td className="px-3 py-2.5 border-r border-[#f1f5f9] whitespace-nowrap text-[#334155]">{c.period}</td>
                        <td className="px-3 py-2.5 border-r border-[#f1f5f9] text-[#334155] whitespace-nowrap">{c.benefit}</td>
                        <td className="px-3 py-2.5 border-r border-[#f1f5f9] font-medium text-[#1a2533] whitespace-nowrap">{c.claimedAmount}</td>
                        <td className="px-3 py-2.5 border-r border-[#f1f5f9] whitespace-nowrap text-[#475569]">{c.submissionDate}</td>
                        <td className="px-3 py-2.5 border-r border-[#f1f5f9] whitespace-nowrap">{e28StatusBadge(c.status)}</td>
                        <td className="px-3 py-2.5 border-r border-[#f1f5f9] whitespace-nowrap font-medium text-[#1a2533]">{c.sanctionedAmount ?? '—'}</td>
                        <td className="px-3 py-2.5 border-r border-[#f1f5f9] text-[#475569]">{c.disbursement ?? '—'}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap">
                          <button onClick={e => { e.stopPropagation(); setSelectedClaimId(c.id === selectedClaimId ? null : c.id) }} className="text-[#1a56db] hover:underline text-[10px]">Detail</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Claim detail panel */}
              {selectedClaim && (
                <div className="border border-[#e2e8f0] bg-white">
                  <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb] flex items-center justify-between">
                    <p className="text-xs font-bold text-[#1a3a5c]">Claim Detail — {selectedClaim.id}</p>
                    <button onClick={() => setSelectedClaimId(null)} className="text-[10px] text-[#6b7a8d] hover:text-[#1a3a5c]">Close</button>
                  </div>
                  <div className="px-4 py-4 space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 text-xs">
                      {[
                        { label: 'Claim ID', value: selectedClaim.id },
                        { label: 'Claim Period', value: selectedClaim.period },
                        { label: 'Benefit', value: selectedClaim.benefit },
                        { label: 'Claimed Amount', value: selectedClaim.claimedAmount },
                        { label: 'Sanctioned Amount', value: selectedClaim.sanctionedAmount ?? '—' },
                        { label: 'Status', value: null },
                      ].map(r => (
                        <div key={r.label}>
                          <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-0.5">{r.label}</p>
                          {r.value !== null
                            ? <p className="text-[#1a2533] font-medium">{r.value}</p>
                            : e28StatusBadge(selectedClaim.status)}
                        </div>
                      ))}
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">Evidence Submitted</p>
                      <ul className="space-y-1">
                        {selectedClaim.evidence.map((ev, i) => {
                          return (
                          <li key={i} className="flex items-center justify-between text-xs text-[#334155] border-b border-[#f1f5f9] pb-1 last:border-b-0 last:pb-0">
                            <span>{ev}</span>
                            <button disabled title={CLAIM_DOCUMENT_UNAVAILABLE} className="text-[10px] text-[#1a56db] opacity-50 cursor-not-allowed shrink-0 ml-3">View in E11</button>
                          </li>
                          )
                        })}
                      </ul>
                    </div>

                    {selectedClaim.deptComments && (
                      <div>
                        <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">Department Comments</p>
                        <p className={`px-3 py-2 border text-xs ${selectedClaim.status === 'Correction Required' ? 'border-[#fca5a5] bg-[#fee2e2] text-[#7f1d1d]' : 'border-[#e2e8f0] bg-[#f8f9fb] text-[#334155]'}`}>{selectedClaim.deptComments}</p>
                      </div>
                    )}

                    {selectedClaim.disbursement && (
                      <div>
                        <p className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">Disbursement</p>
                        <p className="text-[#166534] font-medium">{selectedClaim.disbursement}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 pt-1 border-t border-[#f1f5f9]">
                      {selectedClaim.status === 'Correction Required' && (
                        <>
                          <button disabled title={CLAIM_WORKFLOW_UNAVAILABLE} className="text-xs border border-[#d1d9e0] text-[#b91c1c] px-3 py-1.5 opacity-50 cursor-not-allowed">Respond to Query (E20)</button>
                          <button disabled title={CLAIM_WORKFLOW_UNAVAILABLE} className="text-xs border border-[#d1d9e0] text-[#1a3a5c] px-3 py-1.5 opacity-50 cursor-not-allowed">Submit Correction (E21)</button>
                        </>
                      )}
                      {selectedClaim.status === 'Disbursed' && (
                        <button disabled title={CLAIM_DOCUMENT_UNAVAILABLE} className="text-xs border border-[#d1d9e0] text-[#1a3a5c] px-3 py-1.5 opacity-50 cursor-not-allowed">View Disbursement Document (E11)</button>
                      )}
                      {selectedClaim.status === 'Under Verification' && (
                        <button disabled title={CLAIM_DOCUMENT_UNAVAILABLE} className="text-xs border border-[#d1d9e0] text-[#1a3a5c] px-3 py-1.5 opacity-50 cursor-not-allowed">View Claim (E12)</button>
                      )}
                      {selectedClaim.status === 'Sanctioned' && (
                        <button disabled title={CLAIM_DOCUMENT_UNAVAILABLE} className="text-xs border border-[#d1d9e0] text-[#1a3a5c] px-3 py-1.5 opacity-50 cursor-not-allowed">View Sanction (E12)</button>
                      )}
                      <button disabled title={EVIDENCE_UPLOAD_UNAVAILABLE} className="text-xs border border-[#d1d9e0] text-[#1a3a5c] px-3 py-1.5 opacity-50 cursor-not-allowed">Upload Evidence (E11)</button>
                      <p className="w-full text-xs text-[#6b7a8d]">{EVIDENCE_UPLOAD_UNAVAILABLE}</p>
                      <p className="w-full text-xs text-[#6b7a8d]">{CLAIM_DOCUMENT_UNAVAILABLE}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Regulatory Assistant */}
        <div className="bg-white border border-[#e2e8f0]">
          <button
            onClick={() => setRagOpen(v => !v)}
            className="w-full flex items-center justify-between px-5 py-3 text-xs font-semibold text-[#1a3a5c] hover:bg-[#f8f9fb] transition-colors"
          >
            <span>Regulatory Assistant — Incentive Application Queries</span>
            <span className="text-[#6b7a8d] font-normal">{ragOpen ? '▲ Hide' : '▼ Show'}</span>
          </button>
          {ragOpen && (
            <div className="border-t border-[#e8edf2] px-5 py-4 space-y-3">
              <p className="text-[10px] text-[#6b7a8d]">Ask about your eligibility application, certificate, or claims. Responses are based on configured information only and do not constitute a legal determination.</p>
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
                  placeholder="Ask about this application or claim..."
                  className="flex-1 text-xs border border-[#d1d9e0] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#1a56db]"
                />
                <button onClick={() => handleRagSend(ragInput)} className="text-xs bg-[#1a3a5c] text-white px-4 py-2 font-semibold hover:bg-[#0f2540] transition-colors">Send</button>
              </div>
            </div>
          )}
        </div>

        {/* Footer links */}
        <div className="bg-white border border-[#e2e8f0] px-4 py-3 text-xs text-[#6b7a8d]">
          <div className="flex flex-wrap gap-4">
            <button onClick={onGoToE11} disabled={!canOpenDocuments} title={!canOpenDocuments ? DOCUMENT_CENTRE_UNAVAILABLE : undefined} className="text-[#1a56db] hover:underline disabled:opacity-50 disabled:cursor-not-allowed">Document Centre (E11)</button>
            {!canOpenDocuments && <span>{DOCUMENT_CENTRE_UNAVAILABLE}</span>}
            <button disabled title={CLAIM_WORKFLOW_UNAVAILABLE} className="text-[#1a56db] opacity-50 cursor-not-allowed">Query / Correction (E20)</button>
            <button disabled title={CLAIM_WORKFLOW_UNAVAILABLE} className="text-[#1a56db] opacity-50 cursor-not-allowed">Delta Resubmission (E21)</button>
            <button onClick={onGoToE26} className="text-[#1a56db] hover:underline">Back to Incentives (E26)</button>
          </div>
        </div>
      </div>

      {/* New Claim Modal */}
      {showNewClaimModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#d1d9e0] w-full max-w-lg shadow-lg">
            <div className="px-5 py-3.5 border-b border-[#e2e8f0] bg-[#f8f9fb] flex items-center justify-between">
              <p className="text-sm font-bold text-[#1a3a5c]">Preview New Claim</p>
              <button onClick={() => setShowNewClaimModal(false)} className="text-[#6b7a8d] hover:text-[#1a3a5c] text-xs">Close</button>
            </div>
            {newClaimSubmitted ? (
              <div className="px-5 py-8 text-center space-y-3">
                <p className="text-sm font-bold text-[#166534]">Claim Preview</p>
                <p className="text-xs text-[#334155]">Your demo claim for <strong>{newClaimBenefit}</strong> ({newClaimPeriod}) with claimed amount ₹{newClaimAmount || '—'} is prepared in this dialog only.</p>
                <p className="text-xs text-[#6b7a8d]">No claim has been submitted to an authority or added to the claims table.</p>
                <div className="flex gap-2 justify-center mt-4">
                  <button onClick={() => setShowNewClaimModal(false)} className="text-xs bg-[#1a3a5c] text-white px-4 py-2 font-semibold hover:bg-[#0f2540]">Done</button>
                  <button disabled title={EVIDENCE_UPLOAD_UNAVAILABLE} className="text-xs border border-[#d1d9e0] text-[#1a3a5c] px-4 py-2 opacity-50 cursor-not-allowed">Upload Evidence (E11)</button>
                </div>
                <p className="text-xs text-[#6b7a8d]">{EVIDENCE_UPLOAD_UNAVAILABLE}</p>
              </div>
            ) : (
              <div className="px-5 py-5 space-y-4 text-xs">
                <div className="border border-[#bfdbfe] border-l-4 border-l-[#1d4ed8] px-3 py-2 text-[#1e3a8a]">
                  This preview is based on Eligibility Certificate <strong>EC-PSI-2026-01248</strong>. Only benefits listed on the certificate are claimable.
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">Benefit</label>
                    <select value={newClaimBenefit} onChange={e => setNewClaimBenefit(e.target.value)} className="w-full border border-[#d1d9e0] px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#1a56db] text-xs">
                      <option>Electricity Duty Exemption</option>
                      <option>Capital Subsidy</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">Claim Period</label>
                    <select value={newClaimPeriod} onChange={e => setNewClaimPeriod(e.target.value)} className="w-full border border-[#d1d9e0] px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#1a56db] text-xs">
                      <option>Apr 2027 – Sep 2027</option>
                      <option>Oct 2027 – Mar 2028</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">Claimed Amount (₹)</label>
                    <input
                      type="text"
                      value={newClaimAmount}
                      onChange={e => setNewClaimAmount(e.target.value)}
                      placeholder="e.g. 4,10,000"
                      className="w-full border border-[#d1d9e0] px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#1a56db] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">Evidence Documents</label>
                    <div className="border border-[#e2e8f0] divide-y divide-[#f1f5f9]">
                      {(newClaimBenefit === 'Electricity Duty Exemption'
                        ? ['Electricity Bills (claim period)', 'Commencement of Production Certificate']
                        : ['CA-certified Fixed Capital Investment Statement', 'Commencement of Production Certificate', 'MIDC Allotment Letter']
                      ).map(d => (
                        <div key={d} className="flex items-center justify-between px-3 py-2 gap-3">
                          <span className="text-[#334155]">{d}</span>
                          <button disabled title={EVIDENCE_UPLOAD_UNAVAILABLE} className="text-[10px] text-[#1a56db] opacity-50 cursor-not-allowed shrink-0">Add from E11</button>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-[#6b7a8d] mt-1">{EVIDENCE_UPLOAD_UNAVAILABLE}</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2 border-t border-[#f1f5f9]">
                  <button
                    onClick={() => setNewClaimSubmitted(true)}
                    className="text-xs bg-[#1a3a5c] text-white px-4 py-2 font-semibold hover:bg-[#0f2540]"
                  >
                    Preview Claim
                  </button>
                  <button onClick={() => setShowNewClaimModal(false)} className="text-xs border border-[#d1d9e0] text-[#475569] px-4 py-2 hover:bg-[#f1f5f9]">Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
