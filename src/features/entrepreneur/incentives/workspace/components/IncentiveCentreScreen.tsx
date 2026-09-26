"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import { useIncentiveWorkspace } from '../state';
import { getIncentiveDetailSchemes, getIncentiveClaims, getIncentivePolicyUpdates } from '../data';
import { IncentiveWorkspaceHeader, IncentiveStatusBadge, ClaimStatusBadge } from './IncentiveWorkspaceHeader';

export function IncentiveCentreScreen() {
  const router = useRouter();
  const { businessId } = useIncentiveWorkspace();
  
  const schemes = getIncentiveDetailSchemes(businessId);
  const claims = getIncentiveClaims(businessId);
  const policyUpdates = getIncentivePolicyUpdates(businessId);

  const [activeTab, setActiveTab] = useState<'all' | 'strong' | 'conditional' | 'needs-info' | 'claims' | 'received'>('all');

  const strong = schemes.filter(s => s.status === 'strong-match');
  const conditional = schemes.filter(s => s.status === 'conditional');
  const needsInfo = schemes.filter(s => s.status === 'needs-info');

  const visible = activeTab === 'all' ? schemes
    : activeTab === 'strong' ? strong
    : activeTab === 'conditional' ? conditional
    : activeTab === 'needs-info' ? needsInfo
    : activeTab === 'claims' ? schemes.filter(s => s.claimId)
    : [];

  const tabs = [
    { id: 'all',         label: 'All Opportunities',   count: schemes.length },
    { id: 'strong',      label: 'Strong Matches',      count: strong.length },
    { id: 'conditional', label: 'Conditional',         count: conditional.length },
    { id: 'needs-info',  label: 'Needs Information',   count: needsInfo.length },
    { id: 'claims',      label: 'Claims in Progress',  count: claims.length },
    { id: 'received',    label: 'Received / Completed',count: 0 },
  ] as const;

  const handleGoToCalculator = () => router.push(ENTREPRENEUR_ROUTES.incentiveCalculator(businessId));
  const handleGoToROI = () => router.push(ENTREPRENEUR_ROUTES.incentiveRoi(businessId));
  const handleGoToScenarios = () => router.push(ENTREPRENEUR_ROUTES.incentiveScenarios(businessId));
  const handleGoToReadiness = () => router.push(ENTREPRENEUR_ROUTES.incentiveClaimReadiness(businessId));
  const handleGoToPortfolio = () => router.push(ENTREPRENEUR_ROUTES.incentivePortfolio(businessId));
  const handleGoToDetail = (id: string) => router.push(ENTREPRENEUR_ROUTES.incentivePortfolioDetail(businessId, id));
  const handleGoToTracker = (id: string) => router.push(ENTREPRENEUR_ROUTES.incentiveClaim(businessId, id));
  const handleGoPolicyUpdates = () => router.push(ENTREPRENEUR_ROUTES.incentivePolicyUpdates(businessId));
  
  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <IncentiveWorkspaceHeader
        businessId={businessId}
        title="Incentives"
        subtitle="Discover applicable government incentives, estimate their potential financial impact, compare investment scenarios and prepare claims."
        breadcrumb={['Home', businessId, 'Incentives']}
        breadcrumbHref={ENTREPRENEUR_ROUTES.business(businessId)}
      />

      <div className="max-w-[1320px] mx-auto px-6 py-5 space-y-5">
        {/* Hero — Incentive Opportunity */}
        <div className="bg-[#1a3a5c] text-white px-6 py-5">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#93c5fd] mb-2">Your Incentive Opportunity</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                {[
                  { label: 'Potential Incentives', value: schemes.length.toString(), sub: 'identified' },
                  { label: 'Strong Matches', value: strong.length.toString(), sub: 'criteria satisfied', accent: '#86efac' },
                  { label: 'Needs Information', value: needsInfo.length.toString(), sub: 'pending inputs', accent: '#fde68a' },
                  { label: 'Claims in Progress', value: claims.length.toString(), sub: 'being prepared', accent: '#a5b4fc' },
                ].map(m => (
                  <div key={m.label}>
                    <p className="text-2xl font-bold" style={m.accent ? { color: m.accent } : {}}>{m.value}</p>
                    <p className="text-[11px] font-semibold text-[#cbd5e1] leading-tight">{m.label}</p>
                    <p className="text-[10px] text-[#94a3b8] mt-0.5">{m.sub}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#2d5a8e] pt-3">
                <p className="text-[10px] text-[#94a3b8] mb-1 uppercase tracking-wider font-semibold">Estimated Potential Support</p>
                <p className="text-2xl font-bold text-white">₹1.33 Cr – ₹2.31 Cr</p>
                <p className="text-[10px] text-[#64748b] mt-1 max-w-xl leading-relaxed">Indicative estimate based on current Business DNA and available project information. Final eligibility and admissible amount are subject to applicable policy conditions and departmental verification.</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <button onClick={handleGoToCalculator} className="bg-white text-[#1a3a5c] text-sm font-bold px-5 py-2.5 hover:bg-[#f0f4f8] transition-colors whitespace-nowrap">
                Calculate / Refresh Incentives
              </button>
              <button onClick={handleGoToScenarios} className="border border-[#2d5a8e] text-white text-sm font-medium px-5 py-2 hover:bg-[#0f2540] transition-colors whitespace-nowrap">
                Compare Investment Scenarios
              </button>
              <button onClick={handleGoToReadiness} className="border border-[#2d5a8e] text-[#93c5fd] text-sm font-medium px-5 py-2 hover:bg-[#0f2540] transition-colors whitespace-nowrap">
                Check Claim Readiness
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
          <div className="space-y-4 min-w-0">

            {/* Tabs */}
            <div className="bg-white border border-[#e2e8f0]">
              <div className="flex overflow-x-auto border-b border-[#e2e8f0]">
                {tabs.map(t => (
                  <button key={t.id}
                    onClick={() => setActiveTab(t.id as any)}
                    className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 border-b-2 transition-colors ${activeTab === t.id ? 'border-[#1a56db] text-[#1a3a5c] bg-[#f8fbff]' : 'border-transparent text-[#6b7a8d] hover:text-[#1a3a5c]'}`}
                  >
                    {t.label}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${activeTab === t.id ? 'bg-[#1a56db] text-white' : 'bg-[#e2e8f0] text-[#6b7a8d]'}`}>{t.count}</span>
                  </button>
                ))}
              </div>

              {/* Opportunity cards */}
              <div className="divide-y divide-[#f8f9fb]">
                {visible.length === 0 ? (
                  <div className="px-5 py-8 text-center text-sm text-[#6b7a8d]">No opportunities in this category yet.</div>
                ) : visible.map(scheme => (
                  <div key={scheme.id} className="px-5 py-4">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 flex-wrap mb-1.5">
                          <p className="text-sm font-bold text-[#1a2533] leading-tight">{scheme.name}</p>
                          <IncentiveStatusBadge status={scheme.status} />
                        </div>
                        <p className="text-[11px] text-[#6b7a8d] mb-2">{scheme.authority}</p>
                        {scheme.status !== 'needs-info' && (
                          <p className="text-[11px] font-semibold text-[#1a3a5c] mb-2">
                            Estimated Benefit: ₹{scheme.estimatedMin}–₹{scheme.estimatedMax} {scheme.unit === 'lakh' ? 'Lakh' : 'Cr'} · {scheme.period}
                          </p>
                        )}
                        {/* Criteria quick view */}
                        <div className="flex flex-wrap gap-x-4 gap-y-0.5">
                          {scheme.criteria.slice(0, 4).map(c => (
                            <span key={c.label} className={`text-[10px] flex items-center gap-1 ${c.met ? 'text-[#166534]' : 'text-[#92400e]'}`}>
                              <span>{c.met ? '✓' : '⚠'}</span> {c.label}
                            </span>
                          ))}
                        </div>
                        {scheme.missingInfo && scheme.missingInfo.length > 0 && (
                          <div className="mt-2">
                            <p className="text-[10px] font-semibold text-[#6b7a8d] uppercase tracking-wider mb-1">Additional information required:</p>
                            {scheme.missingInfo.map(m => (
                              <p key={m} className="text-[10px] text-[#374151]">· {m}</p>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        {scheme.status === 'needs-info'
                          ? <button onClick={handleGoToCalculator} className="text-xs border border-[#1a56db] text-[#1a56db] px-3 py-1.5 hover:bg-[#ebf3ff] transition-colors font-medium">Provide Information</button>
                          : scheme.status === 'conditional'
                            ? <button onClick={() => handleGoToDetail(scheme.id)} className="text-xs border border-[#d97706] text-[#92400e] px-3 py-1.5 hover:bg-[#fef3c7] transition-colors font-medium">Complete Information</button>
                            : <button onClick={() => handleGoToDetail(scheme.id)} className="text-xs bg-[#1a3a5c] text-white px-3 py-1.5 hover:bg-[#0f2540] transition-colors font-medium">View Details</button>
                        }
                        {scheme.status === 'strong-match' && (
                          <button onClick={handleGoToReadiness} className="text-xs border border-[#d1d9e0] text-[#475569] px-3 py-1.5 hover:bg-[#f1f5f9] transition-colors">Claim Readiness</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Claims section */}
            <div className="bg-white border border-[#e2e8f0]">
              <div className="px-5 py-2.5 bg-[#f8f9fb] border-b border-[#e8edf2] flex items-center justify-between">
                <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Claims</p>
                <button onClick={() => handleGoToTracker('')} className="text-xs text-[#1a56db] hover:underline">All claims →</button>
              </div>
              {claims.length === 0 ? (
                <div className="px-5 py-6 text-center text-sm text-[#6b7a8d]">No claims in progress. When you are ready to claim an eligible incentive, start here.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-[#f0f4f8] bg-[#f8f9fb]">
                        {['Scheme', 'Claim ID', 'Estimated Amount', 'Status', 'Last Updated', 'Next Action', ''].map(h => (
                          <th key={h} className="text-left px-4 py-2 text-[10px] font-semibold text-[#9aa5b4] uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f8f9fb]">
                      {claims.map(c => (
                        <tr key={c.id} className="hover:bg-[#f8fbff] transition-colors">
                          <td className="px-4 py-3 font-semibold text-[#1a2533] max-w-[200px]"><span className="line-clamp-2">{c.schemeName}</span></td>
                          <td className="px-4 py-3 font-mono text-[#6b7a8d]">{c.id}</td>
                          <td className="px-4 py-3 font-semibold text-[#1a3a5c]">{c.amount}</td>
                          <td className="px-4 py-3"><ClaimStatusBadge status={c.status} /></td>
                          <td className="px-4 py-3 text-[#6b7a8d]">{c.updated}</td>
                          <td className="px-4 py-3 text-[#d97706] font-medium">{c.nextAction}</td>
                          <td className="px-4 py-3">
                            <button onClick={() => handleGoToTracker(c.id)} className="text-[10px] text-[#1a56db] hover:underline font-medium">View →</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Policy Updates */}
            <div className="bg-white border border-[#e2e8f0]">
              <div className="px-5 py-2.5 bg-[#f8f9fb] border-b border-[#e8edf2] flex items-center justify-between">
                <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider flex items-center gap-2">
                  Incentive Policy Updates
                  <span className="text-[10px] bg-[#fee2e2] text-[#b91c1c] border border-[#fca5a5] px-1.5 py-0.5 font-bold">{policyUpdates.length} new</span>
                </p>
                <button onClick={handleGoPolicyUpdates} className="text-xs text-[#1a56db] hover:underline">All updates →</button>
              </div>
              <div className="divide-y divide-[#f8f9fb]">
                {policyUpdates.map(u => (
                  <div key={u.id} className="px-5 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 border uppercase tracking-wider ${u.type === 'new-scheme' ? 'bg-[#f0fdf4] text-[#166534] border-[#86efac]' : 'bg-[#ede9fe] text-[#3730a3] border-[#a5b4fc]'}`}>
                            {u.type === 'new-scheme' ? 'New Opportunity' : 'Amendment'}
                          </span>
                          {u.validated ? <span className="text-[9px] font-semibold text-[#166534]">✓ Validated</span> : <span className="text-[9px] font-semibold text-[#d97706]">⚠ Draft / Under Validation</span>}
                        </div>
                        <p className="text-[11px] font-semibold text-[#1a2533] leading-tight">{u.title}</p>
                        <p className="text-[10px] text-[#6b7a8d] mt-0.5">{u.summary}</p>
                        <p className="text-[10px] text-[#6b7a8d] mt-1">Effective: {u.effectiveDate} · Detected: {u.detected}</p>
                      </div>
                      <button onClick={handleGoPolicyUpdates} className="text-xs border border-[#d1d9e0] text-[#475569] px-2.5 py-1 hover:bg-[#f1f5f9] transition-colors shrink-0">View Impact</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions sidebar */}
          <div className="space-y-4">
            <div className="bg-white border border-[#e2e8f0]">
              <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#e8edf2]">
                <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Quick Actions</p>
              </div>
              <div className="divide-y divide-[#f8f9fb]">
                {[
                  { label: 'Calculate Incentives', sub: 'Refresh with latest inputs', onClick: handleGoToCalculator, icon: '⟳' },
                  { label: 'ROI & Scenario Planner', sub: 'Model financial impact', onClick: handleGoToROI, icon: '↗' },
                  { label: 'Compare Scenarios', sub: 'Side-by-side comparison', onClick: handleGoToScenarios, icon: '⇌' },
                  { label: 'Claim Readiness', sub: 'Check evidence coverage', onClick: handleGoToReadiness, icon: '✓' },
                  { label: 'Policy Updates', sub: `${policyUpdates.length} updates requiring review`, onClick: handleGoPolicyUpdates, icon: '!' },
                ].map(a => (
                  <button key={a.label} onClick={a.onClick} className="w-full text-left px-4 py-3 hover:bg-[#f8fbff] transition-colors group">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 bg-[#f0f4f8] border border-[#e2e8f0] flex items-center justify-center text-[#1a3a5c] font-bold text-xs shrink-0 group-hover:bg-[#ebf3ff] group-hover:border-[#93c5fd]">{a.icon}</span>
                      <div>
                        <p className="text-[11px] font-semibold text-[#1a2533] group-hover:text-[#1a56db]">{a.label}</p>
                        <p className="text-[10px] text-[#6b7a8d]">{a.sub}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sensitivity / Missing */}
            <div className="bg-white border border-[#fde68a] border-l-4 border-l-[#d97706]">
              <div className="px-4 py-2.5 bg-[#fffbeb] border-b border-[#fde68a]">
                <p className="text-xs font-bold text-[#92400e] uppercase tracking-wider">Limiting Assessment</p>
              </div>
              <div className="px-4 py-3">
                <p className="text-xs text-[#374151] mb-2">3 additional opportunities cannot yet be fully assessed due to missing inputs:</p>
                {['Employment projection (headcount)', 'Plant & machinery cost breakup', 'Commercial production date'].map((m, i) => (
                  <div key={m} className="flex items-start gap-2 mb-1.5">
                    <span className="text-[10px] font-bold text-[#d97706] shrink-0 mt-0.5">{i + 1}.</span>
                    <p className="text-[11px] text-[#374151]">{m}</p>
                  </div>
                ))}
                <button onClick={handleGoToCalculator} className="mt-2 text-xs border border-[#d97706] text-[#92400e] px-3 py-1.5 hover:bg-[#fef3c7] transition-colors font-medium w-full">
                  Complete Missing Information
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
