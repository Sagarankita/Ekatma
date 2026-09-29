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
    'Needs Verification': 'border-[#fae69e] bg-[#fdf8e6] text-[#7a5807]',
    'Missing Condition-data': 'border-[#fdba74] bg-[#fff7ed] text-[#9a3412]',
    'Not Currently Applicable': 'border-[#c8d4c7] bg-[#F9FAF2] text-[#555C56]',
  }
  return <span className={`text-[10px] font-semibold px-1.5 py-0.5 border ${map[s]}`}>{s}</span>
}

function conditionStateMark(state: 'satisfied' | 'needs-verification' | 'missing') {
  if (state === 'satisfied') return <span className="text-[#166534] font-bold text-xs">Satisfied</span>
  if (state === 'needs-verification') return <span className="text-[#7a5807] font-bold text-xs">Needs Verification</span>
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
  const [lifecycleFilter, setLifecycleFilter] = useState<'All' | 'Potentially relevant' | 'Needs verification' | 'Application in progress' | 'Approved' | 'Claim / Disbursement'>('All')
  const [showGuide, setShowGuide] = useState(true)

  // Empty state handling to strictly satisfy contract tests
  if (schemes.length === 0) {
    return (
      <main id="main-content" className="flex-1 bg-[#F9FAF2]" tabIndex={-1}>
        <div className="bg-white border-b border-[#d6dfd5] px-6 py-4">
          <div className="max-w-[1280px] mx-auto">
            <h1 className="text-xl font-bold text-[#355E3B]">Incentives</h1>
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto px-6 py-8">
          <div className="bg-white border border-[#e3ebe1] px-4 py-8 text-center text-[#9ab098]">
            No schemes match the current filters.
          </div>
        </div>
      </main>
    )
  }

  const getLifecycleCategory = (s: IncentiveScheme): 'Potentially relevant' | 'Needs verification' | 'Application in progress' | 'Approved' | 'Claim / Disbursement' => {
    if (s.id === 'PSI-2019') return 'Approved'
    if (s.eligState === 'Needs Verification' || s.eligState === 'Missing Condition-data') return 'Needs verification'
    return 'Potentially relevant'
  }

  const allAuthorities = ['All', ...Array.from(new Set(schemes.map(s => s.authority)))]
  const allEligs: Array<'All' | IncentiveEligState> = ['All', 'Appears eligible from available data', 'Needs Verification', 'Missing Condition-data', 'Not Currently Applicable']
  const allCats = ['All', ...Array.from(new Set(schemes.map(s => s.category)))]

  const filtered = schemes.filter(s => {
    if (authFilter !== 'All' && s.authority !== authFilter) return false
    if (eligFilter !== 'All' && s.eligState !== eligFilter) return false
    if (catFilter !== 'All' && s.category !== catFilter) return false
    if (lifecycleFilter !== 'All' && getLifecycleCategory(s) !== lifecycleFilter) return false
    return true
  })

  const potentiallyRelevantCount = schemes.filter(s => getLifecycleCategory(s) === 'Potentially relevant').length
  const needsVerifCount = schemes.filter(s => getLifecycleCategory(s) === 'Needs verification').length
  const approvedCount = schemes.filter(s => getLifecycleCategory(s) === 'Approved').length

  const lifecycleTabs: Array<{ id: 'All' | 'Potentially relevant' | 'Needs verification' | 'Application in progress' | 'Approved' | 'Claim / Disbursement'; label: string; count: number }> = [
    { id: 'All', label: 'All Opportunities', count: schemes.length },
    { id: 'Potentially relevant', label: 'Potentially relevant', count: potentiallyRelevantCount },
    { id: 'Needs verification', label: 'Needs verification', count: needsVerifCount },
    { id: 'Application in progress', label: 'Application in progress', count: 0 },
    { id: 'Approved', label: 'Approved', count: approvedCount },
    { id: 'Claim / Disbursement', label: 'Claim / Disbursement', count: 3 },
  ]

  return (
    <main id="main-content" className="flex-1 bg-[#F9FAF2]" tabIndex={-1}>
      <div className="bg-white border-b border-[#d6dfd5] px-6 py-4">
        <div className="max-w-[1280px] mx-auto">
          <nav aria-label="Breadcrumb" className="text-xs text-[#555C56] mb-2 flex items-center gap-1.5">
            <button onClick={onBack} className="hover:text-[#355E3B] hover:underline">Dashboard</button>
            <span>›</span>
            <span className="text-[#355E3B] font-medium">Incentives</span>
          </nav>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-[#355E3B]">Incentives</h1>
              <p className="mt-0.5 text-xs text-[#555C56]">Find relevant schemes and verify eligibility.</p>
            </div>
            {onOpenRegAssistant && (
              <RegAssistantTrigger lang="en" size="sm" onClick={() => onOpenRegAssistant({ entryPoint: 'incentive', initialQuestion: 'Why is this scheme applicable to my business?' })} />
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-5 space-y-4">

        {/* ── 1. Executive Clarity Cockpit (Directly Answers the 5 Questions) ── */}
        <div className="bg-white border border-[#d6dfd5] shadow-sm">
          <div className="bg-[#355E3B] text-white px-5 py-3.5 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-base font-bold">Potential benefits</h2>
            </div>
            <span className="text-xs bg-[#244e7c] text-white px-3 py-1 font-mono">
              ₹1.33 Cr – ₹2.31 Cr Potential Support
            </span>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-5 gap-3 divide-y md:divide-y-0 md:divide-x divide-[#e3ebe1]">
            <div>
              <p className="mb-1 text-xs font-bold text-[#6DAE7C]">Potential matches</p>
              <p className="text-xs font-semibold text-[#1e293b]">{schemes.length} schemes</p>
              <p className="text-[11px] text-[#555C56] mt-1">Capital subsidy, electricity duty exemption, technology grants, and single window processing.</p>
            </div>
            <div className="pt-2 md:pt-0 md:pl-3">
              <p className="mb-1 text-xs font-bold text-[#166534]">Why this applies</p>
              <p className="text-xs font-semibold text-[#1e293b]">Business DNA Matched</p>
              <p className="text-[11px] text-[#555C56] mt-1">Sector: Pharma · Zone: Chakan Phase II · Class: MSME · Fixed Assets: ₹10 Cr.</p>
            </div>
            <div className="pt-2 md:pt-0 md:pl-3">
              <p className="mb-1 text-xs font-bold text-[#7a5807]">Needs verification</p>
              <p className="text-xs font-semibold text-[#7a5807]">2 Pending Inputs</p>
              <p className="text-[11px] text-[#634805] mt-1">Commercial production date and CA investment classification certificate.</p>
            </div>
            <div className="pt-2 md:pt-0 md:pl-3">
              <p className="mb-1 text-xs font-bold text-[#4338ca]">Before applying</p>
              <p className="text-xs font-semibold text-[#1e293b]">Eligibility Certificate</p>
              <p className="text-[11px] text-[#555C56] mt-1">File application before commencing production to lock in capital subsidy rate.</p>
            </div>
            <div className="pt-2 md:pt-0 md:pl-3">
              <p className="mb-1 text-xs font-bold text-[#555C56]">After application</p>
              <p className="text-xs font-semibold text-[#1e293b]">5-Stage Process</p>
              <p className="text-[11px] text-[#555C56] mt-1">Scrutiny → EC Issuance → Half-yearly Claims → Sanction → Disbursement.</p>
            </div>
          </div>
        </div>

        {/* ── 2. Educational Primer & Maximizer ── */}
        <div className="bg-[#edf5ef] border border-[#c5e2cb] p-4 text-xs text-[#539160]">
          <div className="flex items-center justify-between">
            <p className="font-bold text-[#539160]">How incentive schemes work</p>
            <button onClick={() => setShowGuide(g => !g)} className="text-xs font-semibold text-[#539160] underline">
              {showGuide ? 'Hide details' : 'Show guide'}
            </button>
          </div>
          {showGuide && (
            <div className="mt-2.5 grid grid-cols-1 gap-3 border-t border-[#c5e2cb] pt-2.5 text-xs text-[#1e3a8a] md:grid-cols-3">
              <div>
                <strong>1. Apply Early:</strong> Obtain your Eligibility Certificate before commercial production starts to prevent subsidy forfeiture.
              </div>
              <div>
                <strong>2. Stack Benefits:</strong> Claim Capital Subsidy, Electricity Duty Exemption, and Interest Subsidy concurrently under PSI 2019.
              </div>
              <div>
                <strong>3. Meet 60-Day Deadlines:</strong> Submit half-yearly returns strictly within 60 days of period close for fast disbursement.
              </div>
            </div>
          )}
        </div>

        {/* ── 3. Non-Finality Disclaimer ── */}
        <details className="border border-[#fae69e] bg-[#fdf8e6] px-4 py-2.5 text-xs text-[#7a5807]">
          <summary className="cursor-pointer font-semibold">Preliminary eligibility note</summary>
          <p className="mt-2">Matches use your Business Profile and are not a final determination. The administering authority confirms eligibility after verification.</p>
        </details>

        {/* ── 4. 5-Category Lifecycle Tabs ── */}
        <div className="bg-white border border-[#e3ebe1]">
          <div className="flex overflow-x-auto border-b border-[#e3ebe1]">
            {lifecycleTabs.map(t => (
              <button
                key={t.id}
                onClick={() => setLifecycleFilter(t.id)}
                className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 border-b-2 transition-colors ${
                  lifecycleFilter === t.id
                    ? 'border-[#6DAE7C] text-[#355E3B] bg-[#f8fbff]'
                    : 'border-transparent text-[#555C56] hover:text-[#355E3B]'
                }`}
              >
                {t.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  lifecycleFilter === t.id ? 'bg-[#6DAE7C] text-white' : 'bg-[#e3ebe1] text-[#555C56]'
                }`}>
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          {/* Secondary Filters */}
          <div className="px-4 py-3 bg-[#F9FAF2] border-b border-[#e3ebe1] flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-bold text-[#555C56] uppercase tracking-wider">Authority</label>
              <select value={authFilter} onChange={e => setAuthFilter(e.target.value)} className="text-xs border border-[#d6dfd5] px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-[#6DAE7C] max-w-[200px]">
                {allAuthorities.map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-bold text-[#555C56] uppercase tracking-wider">Eligibility State</label>
              <select value={eligFilter} onChange={e => setEligFilter(e.target.value)} className="text-xs border border-[#d6dfd5] px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-[#6DAE7C] max-w-[240px]">
                {allEligs.map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-bold text-[#555C56] uppercase tracking-wider">Category</label>
              <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="text-xs border border-[#d6dfd5] px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-[#6DAE7C]">
                {allCats.map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
            {(authFilter !== 'All' || eligFilter !== 'All' || catFilter !== 'All' || lifecycleFilter !== 'All') && (
              <button onClick={() => { setAuthFilter('All'); setEligFilter('All'); setCatFilter('All'); setLifecycleFilter('All') }} className="text-xs text-[#b91c1c] hover:underline ml-1">
                Clear Filters
              </button>
            )}
          </div>

          {/* Structured Benefit Rows / Cards (Showing the 7 Fields) */}
          <div className="divide-y divide-[#F9FAF2]">
            {filtered.length === 0 ? (
              <div className="px-4 py-8 text-center text-[#9ab098]">No schemes match the current filters.</div>
            ) : filtered.map(s => {
              const primaryBenefit = s.benefits[0]
              const verifiedConditions = primaryBenefit?.conditions.filter(c => c.state === 'satisfied') || []
              const unverifiedConditions = primaryBenefit?.conditions.filter(c => c.state !== 'satisfied') || []
              const lifecycle = getLifecycleCategory(s)

              return (
                <div key={s.id} className="p-4 hover:bg-[#F9FAF2] transition-colors space-y-3">

                  {/* 1. BENEFIT */}
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <button onClick={() => onGoToScheme(s.id)} className="font-bold text-sm text-[#355E3B] hover:underline text-left">
                          {s.name}
                        </button>
                        <span className="text-[10px] font-mono text-[#555C56] bg-[#F9FAF2] px-1.5 py-0.5 border border-[#e3ebe1]">{s.id}</span>
                        {incentiveEligBadge(s.eligState)}
                        {lifecycle === 'Approved' && (
                          <span className="text-[10px] font-bold px-2 py-0.5 border border-[#86efac] bg-[#dcfce7] text-[#166534]">
                            Approved (EC Granted: EC-PSI-2026-01248)
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#555C56]">
                        Administered by: <strong>{s.authority}</strong> · Category: {s.category}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-[#555C56] uppercase tracking-wider block">Potential Quantum</span>
                      <span className="text-xs font-bold text-[#166534] block">
                        {primaryBenefit?.estimatedBenefit ? primaryBenefit.estimatedBenefit.split('(')[0] : s.potentialBenefits}
                      </span>
                    </div>
                  </div>

                  <details className="rounded border border-[#e3ebe1] bg-[#F9FAF2] text-xs text-[#3A3E39]">
                    <summary className="cursor-pointer px-3 py-2 font-semibold text-[#6DAE7C]">Why this applies and required evidence</summary>
                    <div className="space-y-3 border-t border-[#e3ebe1] p-3">
                      <p>{s.matchBasis.join(' · ')}</p>
                  <div className="grid grid-cols-1 gap-3 text-xs md:grid-cols-2">
                    {/* 4. Verified conditions */}
                    <div className="bg-[#f0fdf4] border border-[#dcfce7] p-2.5">
                      <p className="text-[10px] font-bold text-[#166534] uppercase tracking-wider mb-1">
                        ✓ Verified Conditions ({verifiedConditions.length})
                      </p>
                      <ul className="text-[11px] text-[#166534] space-y-0.5">
                        {verifiedConditions.map((c, i) => (
                          <li key={i}>• {c.text}</li>
                        ))}
                      </ul>
                    </div>

                    {/* 5. Needs verification */}
                    <div className="bg-[#fdf8e6] border border-[#fae69e] p-2.5">
                      <p className="text-[10px] font-bold text-[#7a5807] uppercase tracking-wider mb-1">
                        ⚠ Needs Verification ({unverifiedConditions.length + (primaryBenefit?.verificationNeeds.length || 0)})
                      </p>
                      <ul className="text-[11px] text-[#7a5807] space-y-0.5">
                        {unverifiedConditions.map((c, i) => (
                          <li key={i}>• {c.text}</li>
                        ))}
                        {primaryBenefit?.verificationNeeds.map((v, i) => (
                          <li key={`v-${i}`}>• {v}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 border-t border-[#e3ebe1] pt-3 text-xs">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-[#555C56]">Evidence:</span>
                      {(primaryBenefit?.requiredEvidence || []).map((doc, idx) => (
                        <span key={idx} className="bg-white border border-[#d6dfd5] text-[#3A3E39] px-1.5 py-0.5 text-[10px]">
                          {doc}
                        </span>
                      ))}
                    </div>

                    </div>
                    </div>
                  </details>

                  <div className="flex justify-end border-t border-[#F9FAF2] pt-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onGoToScheme(s.id)}
                        className="text-xs bg-[#355E3B] text-white px-3.5 py-1.5 font-medium hover:bg-[#27472c] transition-colors"
                      >
                        {lifecycle === 'Approved' ? 'View Claims & EC →' : 'View Scheme Details →'}
                      </button>
                    </div>
                  </div>

                </div>
              )
            })}
          </div>
        </div>

        {/* Footer Notice */}
        <div className="bg-white border border-[#e3ebe1] px-4 py-3 text-xs text-[#555C56]">
          <details>
            <summary className="cursor-pointer font-semibold text-[#355E3B]">Eligibility note</summary>
            <p className="mt-2">Matches use available business data. The administering authority confirms final eligibility under the scheme rules.</p>
          </details>
          <p className="mt-2">
            Documents available for incentive eligibility:{' '}
            <button onClick={onGoToE11} disabled={!canOpenDocuments} title={!canOpenDocuments ? DOCUMENT_CENTRE_UNAVAILABLE : undefined} className="text-[#6DAE7C] hover:underline disabled:opacity-50 disabled:cursor-not-allowed">Document Centre</button>
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
    <main id="main-content" className="flex-1 bg-[#F9FAF2]" tabIndex={-1}>
      {/* Page header */}
      <div className="bg-white border-b border-[#d6dfd5] px-6 py-4">
        <div className="max-w-[1100px] mx-auto">
          <nav aria-label="Breadcrumb" className="text-xs text-[#555C56] mb-2 flex items-center gap-1.5">
            <button onClick={onBack} className="hover:text-[#355E3B] hover:underline">Dashboard</button>
            <span>›</span>
            <button onClick={onGoToE26} className="hover:text-[#355E3B] hover:underline">Incentives</button>
            <span>›</span>
            <span className="text-[#355E3B] font-medium">Scheme Detail</span>
          </nav>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-[#355E3B]">{scheme.name}</h1>
              <p className="mt-0.5 text-xs text-[#555C56]">Incentive Detail</p>
            </div>
            {onOpenRegAssistant && (
              <RegAssistantTrigger lang="en" size="sm" onClick={() => onOpenRegAssistant({ entryPoint: 'incentive', recordId: scheme.id, recordName: scheme.name, department: scheme.authority, initialQuestion: 'Why is this scheme applicable to my business?' })} />
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-5 space-y-4">
        {/* Scheme header card */}
        <div className="bg-white border border-[#e3ebe1] px-5 py-4 space-y-3">
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs">
            <div>
              <p className="text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-0.5">Administered by</p>
              <p className="text-[#2B2B2B] font-medium">{scheme.authority}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-0.5">Category</p>
              <p className="text-[#2B2B2B]">{scheme.category}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-0.5">Scheme Reference</p>
              <p className="text-[#2B2B2B] font-mono">{scheme.id}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-0.5">Overall Eligibility (Preliminary)</p>
              <div className="mt-0.5">{incentiveEligBadge(scheme.eligState)}</div>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-1">Matched using your Business Profile</p>
            <ul className="space-y-0.5">
              {scheme.matchBasis.map((m, i) => (
                <li key={i} className="text-xs text-[#3A3E39] flex items-start gap-1.5">
                  <span className="text-[#22c55e] mt-0.5 shrink-0">&#10003;</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-[#F9FAF2] pt-2 text-xs text-[#555C56]">
            Preliminary match only. Final eligibility is subject to scheme rules and verification by the administering authority.
          </div>
        </div>

        {/* Benefits structure */}
        <div className="bg-white border border-[#e3ebe1]">
          <div className="px-5 py-3 border-b border-[#e3ebe1] bg-[#F9FAF2]">
            <p className="text-xs font-bold text-[#355E3B] uppercase tracking-wider">Scheme Benefits</p>
            <p className="text-[10px] text-[#555C56] mt-0.5">One scheme may contain multiple benefits. Eligibility may differ by benefit.</p>
          </div>
          <div className="flex">
            {/* Benefit selector sidebar */}
            <div className="w-[220px] shrink-0 border-r border-[#e3ebe1] divide-y divide-[#F9FAF2]">
              {scheme.benefits.map(b => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBenefitId(b.id)}
                  className={`w-full text-left px-4 py-3 text-xs transition-colors ${selectedBenefitId === b.id ? 'bg-[#edf5ef] font-semibold text-[#355E3B]' : 'hover:bg-[#F9FAF2] text-[#4A4A4A]'}`}
                >
                  <p className="leading-snug">{b.name}</p>
                  <div className="mt-1">{incentiveEligBadge(b.eligState)}</div>
                </button>
              ))}
            </div>

            {/* Benefit detail */}
            {benefit && (() => {
              const verifiedConditions = benefit.conditions.filter(c => c.state === 'satisfied')
              const pendingConditions = benefit.conditions.filter(c => c.state !== 'satisfied')

              return (
                <div className="flex-1 min-w-0 px-5 py-4 space-y-5 text-xs">
                  {/* Field 1: Benefit (Name, Quantum, Type) */}
                  <div className="border-b border-[#e3ebe1] pb-3">
                    <p className="text-[10px] font-semibold text-[#6DAE7C] uppercase tracking-wider mb-1">Benefit Details</p>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h2 className="text-sm font-bold text-[#355E3B]">{benefit.name}</h2>
                        <div className="mt-1 flex items-center gap-2">
                          {incentiveEligBadge(benefit.eligState)}
                          <span className="text-[11px] text-[#555C56]">Under {scheme.name}</span>
                        </div>
                      </div>
                      <button
                        onClick={onGoToE28}
                        disabled={!canOpenClaims}
                        title={!canOpenClaims ? 'No claims for this scheme are bound to the current business.' : undefined}
                        className="text-xs bg-[#355E3B] text-white px-3 py-1.5 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#27472c] transition-colors shrink-0"
                      >
                        View Application / Claims
                      </button>
                    </div>

                    <div className="mt-3 bg-[#F9FAF2] border border-[#e3ebe1] p-3">
                      <p className="text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-0.5">Estimated Quantum</p>
                      {benefit.estimatedBenefit ? (
                        <p className="text-[#2B2B2B] font-semibold text-xs">{benefit.estimatedBenefit}</p>
                      ) : (
                        <p className="text-[#9ab098] italic">Benefit estimate not available — quantum determined by administering authority upon verification.</p>
                      )}
                      <p className="text-[10px] text-[#555C56] mt-1">
                        <strong>Benefit Maximizer:</strong> Timely compliance filing and keeping updated audited statements allows maximum eligible claim sanction.
                      </p>
                    </div>
                    {!canOpenClaims && <p className="text-xs text-[#555C56] mt-1">No claims for this scheme are bound to the current business.</p>}
                  </div>

                  {/* Field 2: Why it appears relevant */}
                  <div>
                    <p className="text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-1.5">Why It Appears Relevant</p>
                    <div className="bg-[#edf5ef] border border-[#c5e2cb] p-3">
                      <p className="text-[#539160] font-medium text-xs mb-1">Business Profile Alignment:</p>
                      <ul className="space-y-1">
                        {scheme.matchBasis.map((m, i) => (
                          <li key={i} className="text-xs text-[#1e3a8a] flex items-start gap-1.5">
                            <span className="text-[#6DAE7C] mt-0.5 shrink-0">&#10003;</span>
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Field 3: Conditions */}
                  <div>
                    <p className="text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-1.5">Conditions</p>
                    <div className="border border-[#e3ebe1] divide-y divide-[#F9FAF2]">
                      {benefit.conditions.map((c, i) => (
                        <div key={i} className="flex items-start justify-between gap-4 px-3 py-2">
                          <p className="text-[#3A3E39] leading-snug">{c.text}</p>
                          <div className="shrink-0">{conditionStateMark(c.state)}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Field 4: Verified conditions */}
                  <div>
                    <p className="text-[10px] font-semibold text-[#166534] uppercase tracking-wider mb-1.5">Verified Conditions</p>
                    {verifiedConditions.length > 0 ? (
                      <div className="border border-[#bbf7d0] bg-[#f0fdf4] divide-y divide-[#dcfce7]">
                        {verifiedConditions.map((c, i) => (
                          <div key={i} className="flex items-start justify-between gap-4 px-3 py-2 text-xs text-[#166534]">
                            <p className="leading-snug">{c.text}</p>
                            <span className="shrink-0 font-bold">&#10003; Verified</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-[#555C56] italic border border-dashed border-[#c8d4c7] p-2 bg-[#F9FAF2]">
                        No conditions automatically verified yet from Master Dossier.
                      </p>
                    )}
                  </div>

                  {/* Field 5: Needs verification */}
                  <div>
                    <p className="text-[10px] font-semibold text-[#7a5807] uppercase tracking-wider mb-1.5">Needs Verification</p>
                    {(pendingConditions.length > 0 || benefit.verificationNeeds.length > 0) ? (
                      <div className="border border-[#fae69e] bg-[#fefce8] divide-y divide-[#fae69e]">
                        {pendingConditions.map((c, i) => (
                          <div key={i} className="flex items-start justify-between gap-4 px-3 py-2 text-xs text-[#7a5807]">
                            <p className="leading-snug">{c.text}</p>
                            <span className="shrink-0 font-medium">Pending Review</span>
                          </div>
                        ))}
                        {benefit.verificationNeeds.map((v, i) => (
                          <div key={`need-${i}`} className="flex items-start justify-between gap-4 px-3 py-2 text-xs text-[#7a5807]">
                            <p className="leading-snug">{v}</p>
                            <span className="shrink-0 font-medium">Action Required</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-[#166534] border border-[#bbf7d0] bg-[#f0fdf4] p-2">
                        All preliminary conditions satisfied.
                      </p>
                    )}
                  </div>

                  {/* Field 6: Documents */}
                  <div>
                    <p className="text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-1.5">Documents (Required Evidence)</p>
                    <ul className="border border-[#e3ebe1] divide-y divide-[#F9FAF2]">
                      {benefit.requiredEvidence.map((e, i) => (
                        <li key={i} className="flex items-center justify-between gap-2 px-3 py-2 text-[#3A3E39]">
                          <div className="flex items-center gap-2">
                            <span className="text-[#555C56]">&#128196;</span>
                            <span>{e}</span>
                          </div>
                          <button disabled title="No exact evidence selection workflow is connected to this scheme." className="text-[10px] text-[#6DAE7C] opacity-50 cursor-not-allowed shrink-0 whitespace-nowrap">Use Existing Document</button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Field 7: Application / claim action */}
                  <div className="border-t border-[#e3ebe1] pt-3">
                    <p className="text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-1.5">Application / Claim Action</p>
                    <div className="border border-[#d6dfd5] bg-[#F9FAF2] p-3 space-y-2">
                      <div className="flex flex-wrap items-center gap-1 text-[10px]">
                        <span className="font-semibold text-[#355E3B] mr-1">Process:</span>
                        {benefit.applicationSteps.map((step, i) => (
                          <span key={i} className="flex items-center gap-1">
                            <span className="border border-[#d6dfd5] bg-white px-2 py-0.5 text-[#3A3E39] font-medium">{step}</span>
                            {i < benefit.applicationSteps.length - 1 && <span className="text-[#9ab098]">›</span>}
                          </span>
                        ))}
                      </div>
                      {benefit.claimCycle && (
                        <p className="text-[11px] text-[#4A4A4A]"><strong>Claim Cycle:</strong> {benefit.claimCycle}</p>
                      )}
                      <div className="pt-2 flex items-center justify-between gap-3">
                        <p className="text-[11px] text-[#555C56]">Ready to apply or submit periodic claims?</p>
                        <button
                          onClick={onGoToE28}
                          disabled={!canOpenClaims}
                          title={!canOpenClaims ? 'No claims for this scheme are bound to the current business.' : undefined}
                          className="text-xs bg-[#355E3B] text-white px-3 py-1.5 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#27472c] transition-colors shrink-0"
                        >
                          View Application / Claims
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>

        {/* What happens after application card */}
        <div className="bg-white border border-[#e3ebe1] px-5 py-4">
          <p className="text-xs font-bold text-[#355E3B] uppercase tracking-wider mb-1">What Happens After Application?</p>
          <p className="text-xs text-[#555C56] mb-3">Transparent lifecycle stages from initial filing through direct government disbursement.</p>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              { step: '1', title: 'Submitted', desc: 'Application lodged; reference ID generated & pre-validation recorded.' },
              { step: '2', title: 'Scrutiny & Verification', desc: 'Authority reviews books, investment statements, and statutory filings.' },
              { step: '3', title: 'Eligibility Certificate', desc: 'Formal sanction granted detailing eligible quantum and valid period.' },
              { step: '4', title: 'Claim Lodgement', desc: 'Periodic claims (half-yearly/milestone) submitted with production proof.' },
              { step: '5', title: 'Disbursement', desc: 'Direct electronic credit into enterprise bank account upon sign-off.' },
            ].map(s => (
              <div key={s.step} className="p-3 border border-[#e3ebe1] bg-[#F9FAF2]">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-5 h-5 rounded-full bg-[#355E3B] text-white text-[10px] font-bold flex items-center justify-center shrink-0">{s.step}</span>
                  <p className="text-xs font-bold text-[#355E3B]">{s.title}</p>
                </div>
                <p className="text-[11px] text-[#4A4A4A] leading-snug">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Regulatory Assistant */}
        <div className="bg-white border border-[#e3ebe1]">
          <button
            onClick={() => setRagOpen(v => !v)}
            className="w-full flex items-center justify-between px-5 py-3 text-xs font-semibold text-[#355E3B] hover:bg-[#F9FAF2] transition-colors"
          >
            <span>Regulatory Assistant — Incentive Queries</span>
            <span className="text-[#555C56] font-normal">{ragOpen ? '▲ Hide' : '▼ Show'}</span>
          </button>
          {ragOpen && (
            <div className="border-t border-[#e3ebe1] px-5 py-4 space-y-3">
              <p className="text-[10px] text-[#555C56]">Ask about this scheme or benefit. Responses are based on configured information and do not constitute a legal eligibility determination.</p>
              <div className="flex flex-wrap gap-2">
                {RAG_SUGGESTED.map(p => (
                  <button key={p} onClick={() => handleRagSend(p)} className="text-[10px] border border-[#c5e2cb] bg-[#edf5ef] text-[#539160] px-2 py-1 hover:bg-[#edf5ef] transition-colors">{p}</button>
                ))}
              </div>
              {ragMessages.length > 0 && (
                <div className="space-y-2 max-h-48 overflow-y-auto border border-[#e3ebe1] bg-[#F9FAF2] p-3">
                  {ragMessages.map((m, i) => (
                    <div key={i} className={`text-xs ${m.role === 'user' ? 'text-[#355E3B] font-semibold' : 'text-[#3A3E39]'}`}>
                      <span className="text-[10px] text-[#9ab098] mr-1">{m.role === 'user' ? 'You:' : 'Assistant:'}</span>
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
                  className="flex-1 text-xs border border-[#d6dfd5] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#6DAE7C]"
                />
                <button onClick={() => handleRagSend(ragInput)} className="text-xs bg-[#355E3B] text-white px-4 py-2 font-semibold hover:bg-[#27472c] transition-colors">Send</button>
              </div>
            </div>
          )}
        </div>

        {/* Footer disclaimer */}
        <div className="bg-white border border-[#e3ebe1] px-4 py-3 text-xs text-[#555C56]">
          <details>
            <summary className="cursor-pointer font-semibold text-[#355E3B]">Eligibility and source note</summary>
            <p className="mt-2">This preliminary match uses the Business Profile and configured scheme data. The administering authority makes the final eligibility determination.</p>
          </details>
          <div className="mt-3 flex flex-wrap gap-4">
            <button onClick={onGoToE11} disabled={!canOpenDocuments} title={!canOpenDocuments ? DOCUMENT_CENTRE_UNAVAILABLE : undefined} className="text-[#6DAE7C] hover:underline disabled:opacity-50 disabled:cursor-not-allowed">Document Centre</button>
            {!canOpenDocuments && <span>{DOCUMENT_CENTRE_UNAVAILABLE}</span>}
            <button onClick={onGoToE26} className="text-[#6DAE7C] hover:underline">Back to Incentives List</button>
          </div>
        </div>
      </div>
    </main>
  )
}


function e28StatusBadge(s: E28LifecycleStage) {
  const map: Record<E28LifecycleStage, string> = {
    'Eligibility Application': 'border-[#a1cba9] bg-[#edf5ef] text-[#539160]',
    'Department Scrutiny': 'border-[#a1cba9] bg-[#edf5ef] text-[#539160]',
    'Eligibility Certificate': 'border-[#86efac] bg-[#dcfce7] text-[#166534]',
    'Claim Period': 'border-[#d6dfd5] bg-[#F9FAF2] text-[#4A4A4A]',
    'Claim Submitted': 'border-[#a1cba9] bg-[#edf5ef] text-[#539160]',
    'Under Verification': 'border-[#fae69e] bg-[#fdf8e6] text-[#7a5807]',
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
    <main id="main-content" className="flex-1 bg-[#F9FAF2]" tabIndex={-1}>
      {/* Page header */}
      <div className="bg-white border-b border-[#d6dfd5] px-6 py-4">
        <div className="max-w-[1200px] mx-auto">
          <nav aria-label="Breadcrumb" className="text-xs text-[#555C56] mb-2 flex items-center gap-1.5 flex-wrap">
            <button onClick={onGoToE26 ?? onBack} className="hover:text-[#355E3B] hover:underline">Incentives</button>
            <span>›</span>
            <button onClick={onGoToE27 ?? onBack} className="hover:text-[#355E3B] hover:underline">{scheme.name}</button>
            <span>›</span>
            <span className="text-[#355E3B] font-medium">Application / Claims</span>
          </nav>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onGoToE27 ?? onGoToE26 ?? onBack}
                aria-label="Back to Incentive Scheme"
                className="inline-flex items-center justify-center rounded border border-[#d6dfd5] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#4A4A4A] hover:bg-[#F9FAF2] hover:text-[#355E3B] transition-colors"
              >
                ← Back
              </button>
              <div>
                <h1 className="text-xl font-bold text-[#355E3B]">Incentive Application / Claims</h1>
                <p className="mt-0.5 text-xs text-[#555C56]">Track eligibility, claims, and disbursement.</p>
              </div>
            </div>
            {onOpenRegAssistant && (
              <RegAssistantTrigger lang="en" size="sm" onClick={() => onOpenRegAssistant({ entryPoint: 'incentive', recordId: schemeId, recordName: scheme.name, department: scheme.authority, initialQuestion: 'What needs verification before I apply?' })} />
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-5 space-y-4">
        {/* Scheme + context */}
        <div className="bg-white border border-[#e3ebe1] px-5 py-4">
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs">
            <div>
              <p className="text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-0.5">Scheme</p>
              <button onClick={onGoToE27} className="text-[#355E3B] font-medium hover:underline text-left">{scheme.name}</button>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-0.5">Authority</p>
              <p className="text-[#2B2B2B]">{scheme.authority}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-0.5">Reference</p>
              <p className="text-[#2B2B2B] font-mono">{scheme.id}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-0.5">Current Stage</p>
              <div className="mt-0.5">{e28StatusBadge(currentLifecycleStage)}</div>
            </div>
          </div>
        </div>

        {/* Lifecycle tracker */}
        <div className="bg-white border border-[#e3ebe1] px-5 py-4">
          <p className="text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-3">Incentive Lifecycle</p>
          <div className="flex flex-wrap items-start gap-0">
            {E28_LIFECYCLE.map((stage, idx) => {
              const isPast = idx < currentStageIdx
              const isCurrent = idx === currentStageIdx
              const isFuture = idx > currentStageIdx
              return (
                <div key={stage} className="flex items-center">
                  <div className={`flex flex-col items-center`}>
                    <div className={`w-2.5 h-2.5 rounded-full border-2 shrink-0 ${isCurrent ? 'bg-[#355E3B] border-[#355E3B]' : isPast ? 'bg-[#22c55e] border-[#22c55e]' : 'bg-white border-[#d6dfd5]'}`} />
                    <p className={`text-[9px] mt-1 text-center max-w-[64px] leading-tight ${isCurrent ? 'font-bold text-[#355E3B]' : isPast ? 'text-[#166534]' : 'text-[#9ab098]'}`}>{stage}</p>
                  </div>
                  {idx < E28_LIFECYCLE.length - 1 && (
                    <div className={`h-px w-6 shrink-0 mb-4 mx-0.5 ${isPast ? 'bg-[#22c55e]' : 'bg-[#d6dfd5]'}`} />
                  )}
                </div>
              )
            })}
          </div>
          {/* Correction notice */}
          {claims.some(claim => claim.id === 'CLM-2027-002' && claim.status === 'Correction Required') && <div className="mt-3 border-l-4 border-l-[#b91c1c] bg-[#fef2f2] border border-[#fca5a5] px-3 py-2 text-xs text-[#b91c1c]">
            <p className="font-semibold">Correction Required — Claim CLM-2027-002</p>
            <p className="mt-0.5 text-[#7f1d1d]">Commencement of Production date discrepancy. Resubmit the corrected certificate. <button disabled title={CLAIM_WORKFLOW_UNAVAILABLE} className="underline font-medium opacity-50 cursor-not-allowed">Respond to Query</button> or <button disabled title={CLAIM_WORKFLOW_UNAVAILABLE} className="underline font-medium opacity-50 cursor-not-allowed">Submit Correction</button>.</p>
            <p className="mt-1 text-[#7f1d1d]">{CLAIM_WORKFLOW_UNAVAILABLE}</p>
          </div>}
        </div>

        {/* Tabs */}
        <div className="bg-white border border-[#e3ebe1]">
          <div className="flex border-b border-[#e3ebe1]">
            {([
              { key: 'application', label: 'Eligibility Application' },
              { key: 'certificate', label: 'Eligibility Certificate' },
              { key: 'claims', label: 'Periodic Claims' },
            ] as const).map(t => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`text-xs px-5 py-2.5 font-medium border-r border-[#e3ebe1] last:border-r-0 transition-colors ${activeTab === t.key ? 'bg-[#355E3B] text-white' : 'text-[#4A4A4A] hover:bg-[#F9FAF2]'}`}
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
                  <h2 className="text-sm font-bold text-[#355E3B]">Eligibility Application</h2>
                  <div className="mt-1">{e28StatusBadge('Eligibility Certificate')}</div>
                  <p className="text-[#555C56] mt-1">Application submitted and Eligibility Certificate issued. The eligibility stage is complete.</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button onClick={() => setActiveTab('certificate')} className="text-xs border border-[#d6dfd5] text-[#355E3B] px-3 py-1.5 hover:bg-[#F9FAF2] text-left">View Certificate</button>
                  <button onClick={onGoToE27} className="text-xs border border-[#d6dfd5] text-[#355E3B] px-3 py-1.5 hover:bg-[#F9FAF2] text-left">View Eligibility Conditions</button>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-2">Application Summary</p>
                <div className="border border-[#e3ebe1] divide-y divide-[#F9FAF2]">
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
                      <p className="w-48 shrink-0 text-[#555C56]">{r.label}</p>
                      <p className="text-[#2B2B2B] font-medium">{r.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-2">Application Documents</p>
                <div className="border border-[#e3ebe1] divide-y divide-[#F9FAF2]">
                  {[
                    { name: 'CA-certified Fixed Capital Investment Statement', status: 'Verified' },
                    { name: 'MIDC Allotment Letter — Chakan Phase II', status: 'Verified' },
                    { name: 'Entity PAN & CIN', status: 'Verified' },
                    { name: 'Udyam MSME Registration Certificate', status: 'Verified' },
                  ].map(d => (
                    <div key={d.name} className="flex items-center justify-between px-3 py-2 gap-4">
                      <p className="text-[#3A3E39]">{d.name}</p>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] font-semibold text-[#166534] border border-[#86efac] bg-[#dcfce7] px-1.5 py-0.5">{d.status}</span>
                        <button disabled title={CLAIM_DOCUMENT_UNAVAILABLE} className="text-[#6DAE7C] text-[10px] opacity-50 cursor-not-allowed">Document Centre</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-[#c5e2cb] border-l-4 border-l-[#539160] px-3 py-2 text-[#1e3a8a]">
                Preliminary eligibility information informed this application. The Eligibility Certificate is the authority's formal determination.
              </div>
            </div>
          )}

          {/* ── Eligibility Certificate ── */}
          {activeTab === 'certificate' && (
            <div className="px-5 py-5 space-y-5 text-xs">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-sm font-bold text-[#355E3B]">Eligibility Certificate</h2>
                  <div className="mt-1">{e28StatusBadge('Eligibility Certificate')}</div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button onClick={() => onGoToE12?.('DOC-INC-001')} disabled={!onGoToE12} title={!onGoToE12 ? DOCUMENT_CENTRE_UNAVAILABLE : undefined} className="text-xs bg-[#355E3B] text-white px-3 py-1.5 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">View Certificate</button>
                  <button onClick={onGoToE11} disabled={!canOpenDocuments} title={!canOpenDocuments ? DOCUMENT_CENTRE_UNAVAILABLE : undefined} className="text-xs border border-[#d6dfd5] text-[#355E3B] px-3 py-1.5 text-left disabled:opacity-50 disabled:cursor-not-allowed">Document Centre</button>
                  {!canOpenDocuments && <p className="text-xs text-[#555C56]">{DOCUMENT_CENTRE_UNAVAILABLE}</p>}
                </div>
              </div>

              <div className="border border-[#e3ebe1] divide-y divide-[#F9FAF2]">
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
                    <p className="w-48 shrink-0 text-[#555C56]">{r.label}</p>
                    <p className="text-[#2B2B2B] font-medium">{r.value}</p>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-2">Eligible Benefits</p>
                <div className="border border-[#e3ebe1]">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#F9FAF2] border-b border-[#e3ebe1]">
                        {['Benefit', 'Eligible Quantum', 'Period', 'Claim Frequency'].map(h => (
                          <th key={h} className="text-left px-3 py-2 text-[10px] font-semibold text-[#555C56] uppercase tracking-wider border-r border-[#e3ebe1] last:border-r-0">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#F9FAF2]">
                        <td className="px-3 py-2 border-r border-[#F9FAF2] font-medium text-[#2B2B2B]">Capital Subsidy</td>
                        <td className="px-3 py-2 border-r border-[#F9FAF2] text-[#4A4A4A]">25% of eligible fixed capital investment (as determined)</td>
                        <td className="px-3 py-2 border-r border-[#F9FAF2] text-[#4A4A4A]">One-time on investment milestones</td>
                        <td className="px-3 py-2 text-[#4A4A4A]">Milestone-based</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 border-r border-[#F9FAF2] font-medium text-[#2B2B2B]">Electricity Duty Exemption</td>
                        <td className="px-3 py-2 border-r border-[#F9FAF2] text-[#4A4A4A]">100% electricity duty — up to 7 years from commencement of production</td>
                        <td className="px-3 py-2 border-r border-[#F9FAF2] text-[#4A4A4A]">Aug 2026 – Jul 2033</td>
                        <td className="px-3 py-2 text-[#4A4A4A]">Half-yearly</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-2">Certificate Conditions</p>
                <ul className="border border-[#e3ebe1] divide-y divide-[#F9FAF2]">
                  {[
                    'Maintain minimum employment as declared in application throughout the benefit period.',
                    'Submit half-yearly claim returns within 60 days of close of each claim period.',
                    'Notify the authority of any change in business classification, ownership, or location within 30 days.',
                    'Retain and produce all evidence records for a minimum of 7 years.',
                  ].map((c, i) => (
                    <li key={i} className="px-3 py-2 text-[#3A3E39] flex items-start gap-2">
                      <span className="text-[#555C56] shrink-0">{i + 1}.</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-[#d6dfd5] bg-[#F9FAF2] px-3 py-2 text-[#555C56]">
                This certificate does not guarantee disbursement. Each periodic claim is subject to verification and sanction by the administering authority.
              </div>
            </div>
          )}

          {/* ── Periodic Claims ── */}
          {activeTab === 'claims' && (
            <div className="px-5 py-5 space-y-4 text-xs">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-bold text-[#355E3B]">Periodic Claims</h2>
                  <p className="text-[#555C56] mt-0.5">Half-yearly claims under Eligibility Certificate EC-PSI-2026-01248</p>
                </div>
                <button onClick={() => { setNewClaimSubmitted(false); setShowNewClaimModal(true) }} className="text-xs bg-[#355E3B] text-white px-3 py-1.5 font-semibold hover:bg-[#27472c]">Preview New Claim</button>
              </div>

              {/* Claims table */}
              <div className="border border-[#e3ebe1] overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#F9FAF2] border-b border-[#e3ebe1]">
                      {['Claim ID', 'Period', 'Benefit', 'Claimed Amount', 'Submission Date', 'Status', 'Sanctioned Amount', 'Disbursement', ''].map(h => (
                        <th key={h} className="text-left px-3 py-2.5 text-[10px] font-semibold text-[#555C56] uppercase tracking-wider border-r border-[#e3ebe1] last:border-r-0 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {claims.map(c => (
                      <tr
                        key={c.id}
                        onClick={() => setSelectedClaimId(c.id === selectedClaimId ? null : c.id)}
                        className={`border-b border-[#F9FAF2] cursor-pointer ${selectedClaimId === c.id ? 'bg-[#edf5ef]' : 'hover:bg-[#F9FAF2]'}`}
                      >
                        <td className="px-3 py-2.5 border-r border-[#F9FAF2] font-mono text-[#4A4A4A] whitespace-nowrap">{c.id}</td>
                        <td className="px-3 py-2.5 border-r border-[#F9FAF2] whitespace-nowrap text-[#3A3E39]">{c.period}</td>
                        <td className="px-3 py-2.5 border-r border-[#F9FAF2] text-[#3A3E39] whitespace-nowrap">{c.benefit}</td>
                        <td className="px-3 py-2.5 border-r border-[#F9FAF2] font-medium text-[#2B2B2B] whitespace-nowrap">{c.claimedAmount}</td>
                        <td className="px-3 py-2.5 border-r border-[#F9FAF2] whitespace-nowrap text-[#4A4A4A]">{c.submissionDate}</td>
                        <td className="px-3 py-2.5 border-r border-[#F9FAF2] whitespace-nowrap">{e28StatusBadge(c.status)}</td>
                        <td className="px-3 py-2.5 border-r border-[#F9FAF2] whitespace-nowrap font-medium text-[#2B2B2B]">{c.sanctionedAmount ?? '—'}</td>
                        <td className="px-3 py-2.5 border-r border-[#F9FAF2] text-[#4A4A4A]">{c.disbursement ?? '—'}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap">
                          <button onClick={e => { e.stopPropagation(); setSelectedClaimId(c.id === selectedClaimId ? null : c.id) }} className="text-[#6DAE7C] hover:underline text-[10px]">Detail</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Claim detail panel */}
              {selectedClaim && (
                <div className="border border-[#e3ebe1] bg-white">
                  <div className="px-4 py-2.5 border-b border-[#e3ebe1] bg-[#F9FAF2] flex items-center justify-between">
                    <p className="text-xs font-bold text-[#355E3B]">Claim Detail — {selectedClaim.id}</p>
                    <button onClick={() => setSelectedClaimId(null)} className="text-[10px] text-[#555C56] hover:text-[#355E3B]">Close</button>
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
                          <p className="text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-0.5">{r.label}</p>
                          {r.value !== null
                            ? <p className="text-[#2B2B2B] font-medium">{r.value}</p>
                            : e28StatusBadge(selectedClaim.status)}
                        </div>
                      ))}
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-1">Evidence Submitted</p>
                      <ul className="space-y-1">
                        {selectedClaim.evidence.map((ev, i) => {
                          return (
                          <li key={i} className="flex items-center justify-between text-xs text-[#3A3E39] border-b border-[#F9FAF2] pb-1 last:border-b-0 last:pb-0">
                            <span>{ev}</span>
                            <button disabled title={CLAIM_DOCUMENT_UNAVAILABLE} className="text-[10px] text-[#6DAE7C] opacity-50 cursor-not-allowed shrink-0 ml-3">Document Centre</button>
                          </li>
                          )
                        })}
                      </ul>
                    </div>

                    {selectedClaim.deptComments && (
                      <div>
                        <p className="text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-1">Department Comments</p>
                        <p className={`px-3 py-2 border text-xs ${selectedClaim.status === 'Correction Required' ? 'border-[#fca5a5] bg-[#fee2e2] text-[#7f1d1d]' : 'border-[#e3ebe1] bg-[#F9FAF2] text-[#3A3E39]'}`}>{selectedClaim.deptComments}</p>
                      </div>
                    )}

                    {selectedClaim.disbursement && (
                      <div>
                        <p className="text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-1">Disbursement</p>
                        <p className="text-[#166534] font-medium">{selectedClaim.disbursement}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 pt-1 border-t border-[#F9FAF2]">
                      {selectedClaim.status === 'Correction Required' && (
                        <>
                          <button disabled title={CLAIM_WORKFLOW_UNAVAILABLE} className="text-xs border border-[#d6dfd5] text-[#b91c1c] px-3 py-1.5 opacity-50 cursor-not-allowed">Respond to Query</button>
                          <button disabled title={CLAIM_WORKFLOW_UNAVAILABLE} className="text-xs border border-[#d6dfd5] text-[#355E3B] px-3 py-1.5 opacity-50 cursor-not-allowed">Submit Correction</button>
                        </>
                      )}
                      {selectedClaim.status === 'Disbursed' && (
                        <button disabled title={CLAIM_DOCUMENT_UNAVAILABLE} className="text-xs border border-[#d6dfd5] text-[#355E3B] px-3 py-1.5 opacity-50 cursor-not-allowed">View Disbursement Document</button>
                      )}
                      {selectedClaim.status === 'Under Verification' && (
                        <button disabled title={CLAIM_DOCUMENT_UNAVAILABLE} className="text-xs border border-[#d6dfd5] text-[#355E3B] px-3 py-1.5 opacity-50 cursor-not-allowed">View Claim</button>
                      )}
                      {selectedClaim.status === 'Sanctioned' && (
                        <button disabled title={CLAIM_DOCUMENT_UNAVAILABLE} className="text-xs border border-[#d6dfd5] text-[#355E3B] px-3 py-1.5 opacity-50 cursor-not-allowed">View Sanction</button>
                      )}
                      <button disabled title={EVIDENCE_UPLOAD_UNAVAILABLE} className="text-xs border border-[#d6dfd5] text-[#355E3B] px-3 py-1.5 opacity-50 cursor-not-allowed">Upload Evidence</button>
                      <p className="w-full text-xs text-[#555C56]">{EVIDENCE_UPLOAD_UNAVAILABLE}</p>
                      <p className="w-full text-xs text-[#555C56]">{CLAIM_DOCUMENT_UNAVAILABLE}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Regulatory Assistant */}
        <div className="bg-white border border-[#e3ebe1]">
          <button
            onClick={() => setRagOpen(v => !v)}
            className="w-full flex items-center justify-between px-5 py-3 text-xs font-semibold text-[#355E3B] hover:bg-[#F9FAF2] transition-colors"
          >
            <span>Regulatory Assistant — Incentive Application Queries</span>
            <span className="text-[#555C56] font-normal">{ragOpen ? '▲ Hide' : '▼ Show'}</span>
          </button>
          {ragOpen && (
            <div className="border-t border-[#e3ebe1] px-5 py-4 space-y-3">
              <p className="text-[10px] text-[#555C56]">Ask about your eligibility application, certificate, or claims. Responses are based on configured information only and do not constitute a legal determination.</p>
              <div className="flex flex-wrap gap-2">
                {RAG_SUGGESTED.map(p => (
                  <button key={p} onClick={() => handleRagSend(p)} className="text-[10px] border border-[#c5e2cb] bg-[#edf5ef] text-[#539160] px-2 py-1 hover:bg-[#edf5ef] transition-colors">{p}</button>
                ))}
              </div>
              {ragMessages.length > 0 && (
                <div className="space-y-2 max-h-48 overflow-y-auto border border-[#e3ebe1] bg-[#F9FAF2] p-3">
                  {ragMessages.map((m, i) => (
                    <div key={i} className={`text-xs ${m.role === 'user' ? 'text-[#355E3B] font-semibold' : 'text-[#3A3E39]'}`}>
                      <span className="text-[10px] text-[#9ab098] mr-1">{m.role === 'user' ? 'You:' : 'Assistant:'}</span>
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
                  className="flex-1 text-xs border border-[#d6dfd5] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#6DAE7C]"
                />
                <button onClick={() => handleRagSend(ragInput)} className="text-xs bg-[#355E3B] text-white px-4 py-2 font-semibold hover:bg-[#27472c] transition-colors">Send</button>
              </div>
            </div>
          )}
        </div>

        {/* Footer links */}
        <div className="bg-white border border-[#e3ebe1] px-4 py-3 text-xs text-[#555C56]">
          <div className="flex flex-wrap gap-4">
            <button onClick={onGoToE11} disabled={!canOpenDocuments} title={!canOpenDocuments ? DOCUMENT_CENTRE_UNAVAILABLE : undefined} className="text-[#6DAE7C] hover:underline disabled:opacity-50 disabled:cursor-not-allowed">Document Centre</button>
            {!canOpenDocuments && <span>{DOCUMENT_CENTRE_UNAVAILABLE}</span>}
            <button disabled title={CLAIM_WORKFLOW_UNAVAILABLE} className="text-[#6DAE7C] opacity-50 cursor-not-allowed">Query / Correction</button>
            <button disabled title={CLAIM_WORKFLOW_UNAVAILABLE} className="text-[#6DAE7C] opacity-50 cursor-not-allowed">Delta Resubmission</button>
            <button onClick={onGoToE27 ?? onGoToE26 ?? onBack} className="text-[#6DAE7C] hover:underline font-medium">← Back to Incentive Scheme</button>
          </div>
        </div>
      </div>

      {/* New Claim Modal */}
      {showNewClaimModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#d6dfd5] w-full max-w-lg shadow-lg">
            <div className="px-5 py-3.5 border-b border-[#e3ebe1] bg-[#F9FAF2] flex items-center justify-between">
              <p className="text-sm font-bold text-[#355E3B]">Preview New Claim</p>
              <button onClick={() => setShowNewClaimModal(false)} className="text-[#555C56] hover:text-[#355E3B] text-xs">Close</button>
            </div>
            {newClaimSubmitted ? (
              <div className="px-5 py-8 text-center space-y-3">
                <p className="text-sm font-bold text-[#166534]">Claim Preview</p>
                <p className="text-xs text-[#3A3E39]">Your demo claim for <strong>{newClaimBenefit}</strong> ({newClaimPeriod}) with claimed amount ₹{newClaimAmount || '—'} is prepared in this dialog only.</p>
                <p className="text-xs text-[#555C56]">No claim has been submitted to an authority or added to the claims table.</p>
                <div className="flex gap-2 justify-center mt-4">
                  <button onClick={() => setShowNewClaimModal(false)} className="text-xs bg-[#355E3B] text-white px-4 py-2 font-semibold hover:bg-[#27472c]">Done</button>
                  <button disabled title={EVIDENCE_UPLOAD_UNAVAILABLE} className="text-xs border border-[#d6dfd5] text-[#355E3B] px-4 py-2 opacity-50 cursor-not-allowed">Upload Evidence</button>
                </div>
                <p className="text-xs text-[#555C56]">{EVIDENCE_UPLOAD_UNAVAILABLE}</p>
              </div>
            ) : (
              <div className="px-5 py-5 space-y-4 text-xs">
                <div className="border border-[#c5e2cb] border-l-4 border-l-[#539160] px-3 py-2 text-[#1e3a8a]">
                  This preview is based on Eligibility Certificate <strong>EC-PSI-2026-01248</strong>. Only benefits listed on the certificate are claimable.
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-1">Benefit</label>
                    <select value={newClaimBenefit} onChange={e => setNewClaimBenefit(e.target.value)} className="w-full border border-[#d6dfd5] px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#6DAE7C] text-xs">
                      <option>Electricity Duty Exemption</option>
                      <option>Capital Subsidy</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-1">Claim Period</label>
                    <select value={newClaimPeriod} onChange={e => setNewClaimPeriod(e.target.value)} className="w-full border border-[#d6dfd5] px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#6DAE7C] text-xs">
                      <option>Apr 2027 – Sep 2027</option>
                      <option>Oct 2027 – Mar 2028</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-1">Claimed Amount (₹)</label>
                    <input
                      type="text"
                      value={newClaimAmount}
                      onChange={e => setNewClaimAmount(e.target.value)}
                      placeholder="e.g. 4,10,000"
                      className="w-full border border-[#d6dfd5] px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#6DAE7C] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-[#555C56] uppercase tracking-wider mb-1">Evidence Documents</label>
                    <div className="border border-[#e3ebe1] divide-y divide-[#F9FAF2]">
                      {(newClaimBenefit === 'Electricity Duty Exemption'
                        ? ['Electricity Bills (claim period)', 'Commencement of Production Certificate']
                        : ['CA-certified Fixed Capital Investment Statement', 'Commencement of Production Certificate', 'MIDC Allotment Letter']
                      ).map(d => (
                        <div key={d} className="flex items-center justify-between px-3 py-2 gap-3">
                          <span className="text-[#3A3E39]">{d}</span>
                          <button disabled title={EVIDENCE_UPLOAD_UNAVAILABLE} className="text-[10px] text-[#6DAE7C] opacity-50 cursor-not-allowed shrink-0">Add from Document Centre</button>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-[#555C56] mt-1">{EVIDENCE_UPLOAD_UNAVAILABLE}</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2 border-t border-[#F9FAF2]">
                  <button
                    onClick={() => setNewClaimSubmitted(true)}
                    className="text-xs bg-[#355E3B] text-white px-4 py-2 font-semibold hover:bg-[#27472c]"
                  >
                    Preview Claim
                  </button>
                  <button onClick={() => setShowNewClaimModal(false)} className="text-xs border border-[#d6dfd5] text-[#4A4A4A] px-4 py-2 hover:bg-[#F9FAF2]">Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
