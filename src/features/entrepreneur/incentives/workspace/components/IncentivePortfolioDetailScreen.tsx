"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import { useIncentiveWorkspace } from '../state';
import { getIncentiveDetailSchemes } from '../data';
import { IncentiveWorkspaceHeader, IncentiveStatusBadge, SourceBadge } from './IncentiveWorkspaceHeader';

export function IncentivePortfolioDetailScreen({ schemeId }: { schemeId: string }) {
  const router = useRouter();
  const { businessId } = useIncentiveWorkspace();
  
  const schemes = getIncentiveDetailSchemes(businessId);
  const scheme = schemes.find(s => s.id === schemeId);
  
  const [showCalc, setShowCalc] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  if (!scheme) {
    return <div>Scheme not found</div>;
  }

  const isApproved = scheme.lifecycleStage === 'Approved' || scheme.id === 'PSI-2019';
  const verifiedCriteria = scheme.criteria.filter(c => c.met);
  const unverifiedCriteria = scheme.criteria.filter(c => !c.met);

  const handleBack = () => router.push(ENTREPRENEUR_ROUTES.incentives(businessId));
  const handleGoToROI = () => router.push(ENTREPRENEUR_ROUTES.incentiveRoi(businessId));
  const handleGoToReadiness = () => router.push(ENTREPRENEUR_ROUTES.incentiveClaimReadiness(businessId));
  const handleGoToClaims = () => router.push(ENTREPRENEUR_ROUTES.incentiveClaimList(businessId));

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <IncentiveWorkspaceHeader
        businessId={businessId}
        title={scheme.name}
        breadcrumb={['Home', businessId, 'Incentives', 'Portfolio', scheme.name]}
        breadcrumbHref={ENTREPRENEUR_ROUTES.business(businessId)}
      />

      <div className="max-w-[960px] mx-auto px-6 py-5 space-y-4">

        {/* 1. BENEFIT IDENTITY & STATUS HEADER */}
        <div className="bg-white border border-[#e2e8f0] p-5 space-y-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-xs font-mono text-[#64748b] bg-[#f1f5f9] px-2 py-0.5 border border-[#e2e8f0]">{scheme.id}</span>
                <IncentiveStatusBadge status={scheme.status} />
                {isApproved ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 border border-[#86efac] bg-[#dcfce7] text-[#166534]">
                    Approved — Eligibility Certificate EC-PSI-2026-01248
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 border border-[#bfdbfe] bg-[#eff6ff] text-[#1e40af]">
                    Preliminary Match — Not Final
                  </span>
                )}
              </div>
              <h1 className="text-lg font-bold text-[#1a3a5c]">{scheme.name}</h1>
              <p className="text-xs text-[#6b7a8d] mt-0.5">Administered by: <strong>{scheme.authority}</strong></p>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-[#64748b] uppercase tracking-wider block">Estimated Benefit</span>
              <span className="text-xl font-bold text-[#166534]">
                ₹{scheme.estimatedMin}–₹{scheme.estimatedMax} {scheme.unit === 'lakh' ? 'Lakh' : 'Cr'}
              </span>
              <span className="text-[10px] text-[#64748b] block capitalize">{scheme.benefitType} · {scheme.period}</span>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#f1f5f9] text-xs">
            <div>
              <p className="text-[10px] text-[#6b7a8d] uppercase tracking-wider mb-0.5">Claim Cycle</p>
              <p className="font-semibold text-[#1a2533]">{scheme.claimCycle || 'Milestone-based Claim'}</p>
              {scheme.nextFilingWindow && <p className="text-[10px] text-[#6b7a8d] mt-0.5">Next: {scheme.nextFilingWindow}</p>}
            </div>
            <div>
              <p className="text-[10px] text-[#6b7a8d] uppercase tracking-wider mb-0.5">Eligible Base</p>
              <p className="font-semibold text-[#1a2533]">{scheme.eligibleBase}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#6b7a8d] uppercase tracking-wider mb-0.5">Applicable Rate</p>
              <p className="font-semibold text-[#1a2533]">{scheme.applicableRate}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#6b7a8d] uppercase tracking-wider mb-0.5">Policy Ceiling</p>
              <p className="font-semibold text-[#1a2533]">{scheme.policyCeiling}</p>
            </div>
          </div>

          {/* Non-Finality Alert */}
          <details className="border border-[#fde68a] bg-[#fffbeb] px-3.5 py-2 text-xs text-[#92400e]">
            <summary className="cursor-pointer font-semibold">Eligibility note</summary>
            <p className="mt-2">The match uses current Business DNA. {scheme.authority} confirms final eligibility and the sanctioned amount after scrutiny.</p>
          </details>
        </div>

        {/* 2. WHY THIS INCENTIVE APPEARS RELEVANT */}
        <div className="bg-white border border-[#e2e8f0]">
          <div className="px-5 py-3 bg-[#f8f9fb] border-b border-[#e8edf2]">
            <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Why This Incentive Appears Relevant</p>
            <p className="text-[10px] text-[#6b7a8d]">Matched against your confirmed Business Profile parameters</p>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {scheme.criteria.map((c, i) => (
              <div key={i} className="flex items-start gap-2.5 p-2.5 bg-[#f8f9fb] border border-[#e2e8f0]">
                <span className={`text-sm font-bold shrink-0 mt-0.5 ${c.met ? 'text-[#16a34a]' : 'text-[#d97706]'}`}>
                  {c.met ? '✓' : '⚠'}
                </span>
                <div>
                  <p className={`font-semibold ${c.met ? 'text-[#166534]' : 'text-[#92400e]'}`}>{c.label}</p>
                  {c.note && <p className="text-[11px] text-[#64748b] mt-0.5">{c.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 & 4. ELIGIBILITY CONDITIONS: VERIFIED VS NEEDS VERIFICATION */}
        <div className="bg-white border border-[#e2e8f0]">
          <div className="px-5 py-3 bg-[#f8f9fb] border-b border-[#e8edf2]">
            <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Eligibility Conditions</p>
            <p className="text-[10px] text-[#6b7a8d]">Prerequisites required to maintain and claim benefits under this scheme</p>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Verified Conditions */}
            <div className="border border-[#86efac] bg-[#f0fdf4] p-3.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#166534] mb-2 flex items-center gap-1.5">
                <span>✓</span> Verified Conditions ({verifiedCriteria.length})
              </p>
              <ul className="space-y-1.5 text-[11px] text-[#166534]">
                {verifiedCriteria.map((c, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="font-bold">•</span>
                    <span>{c.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Needs Verification */}
            <div className="border border-[#fde68a] bg-[#fffbeb] p-3.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#92400e] mb-2 flex items-center gap-1.5">
                <span>⚠</span> Needs Verification ({unverifiedCriteria.length})
              </p>
              {unverifiedCriteria.length === 0 ? (
                <p className="text-[11px] text-[#166534]">All baseline conditions currently confirmed.</p>
              ) : (
                <ul className="space-y-1.5 text-[11px] text-[#92400e]">
                  {unverifiedCriteria.map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="font-bold">•</span>
                      <span>{c.label}{c.note ? ` (${c.note})` : ''}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* 5. DOCUMENTS REQUIRED */}
        <div className="bg-white border border-[#e2e8f0]">
          <div className="px-5 py-3 bg-[#f8f9fb] border-b border-[#e8edf2]">
            <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Required Evidence & Documents</p>
            <p className="text-[10px] text-[#6b7a8d]">Documents required for formal eligibility application and claim sanction</p>
          </div>
          <div className="p-4 divide-y divide-[#f1f5f9] text-xs">
            {(scheme.requiredEvidence && scheme.requiredEvidence.length > 0
              ? scheme.requiredEvidence
              : ['CA-certified Fixed Capital Investment Statement', 'Commencement of Production Certificate', 'MIDC Allotment Letter — Chakan Phase II', 'Udyam MSME Registration Certificate']
            ).map((doc, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-2">
                  <span className="text-[#64748b]">📄</span>
                  <span className="text-[#1a2533] font-medium">{doc}</span>
                </div>
                <span className="text-[10px] border border-[#d1d9e0] bg-[#f8f9fb] text-[#475569] px-2 py-0.5 font-medium">
                  Available in Document Centre
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. POST-APPLICATION LIFECYCLE */}
        <div className="bg-white border border-[#e2e8f0] p-5 text-xs space-y-3">
          <p className="text-[10px] font-bold text-[#1a3a5c] uppercase tracking-wider">What Happens After Application?</p>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center">
            {[
              { step: '1', title: 'Submit Dossier', sub: 'CA statement & proof' },
              { step: '2', title: 'Dept Scrutiny', sub: 'Site inspection & audit' },
              { step: '3', title: 'EC Granted', sub: 'Eligibility Certificate' },
              { step: '4', title: 'Periodic Claims', sub: 'Half-yearly returns' },
              { step: '5', title: 'Disbursement', sub: 'Bank transfer / waiver' },
            ].map(s => (
              <div key={s.step} className="bg-[#f8f9fb] border border-[#e2e8f0] p-2.5">
                <span className="w-5 h-5 rounded-full bg-[#1a3a5c] text-white text-[10px] font-bold inline-flex items-center justify-center mb-1">
                  {s.step}
                </span>
                <p className="font-bold text-[#1a2533] text-[11px]">{s.title}</p>
                <p className="text-[9px] text-[#64748b] mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 7. PROGRESSIVE DISCLOSURE: POLICY BASIS & CALCULATION */}
        <div className="bg-white border border-[#e2e8f0] divide-y divide-[#f1f5f9]">

          {/* Policy Toggle */}
          <div>
            <button
              onClick={() => setShowPolicy(!showPolicy)}
              className="w-full px-5 py-3 flex items-center justify-between text-left hover:bg-[#f8f9fb] transition-colors"
            >
              <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Policy Basis & Reference</p>
              <span className="text-xs text-[#64748b]">{showPolicy ? '▲ Collapse' : '▼ Expand'}</span>
            </button>
            {showPolicy && (
              <div className="px-5 pb-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                {[
                  { label: 'Policy Name', value: scheme.policyName },
                  { label: 'Policy Version', value: scheme.policyVersion },
                  { label: 'Effective From', value: scheme.effectiveFrom },
                ].map(r => (
                  <div key={r.label}>
                    <p className="text-[10px] text-[#64748b] uppercase tracking-wider mb-0.5">{r.label}</p>
                    <p className="font-semibold text-[#1a2533]">{r.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Calculation Toggle */}
          <div>
            <button
              onClick={() => setShowCalc(!showCalc)}
              className="w-full px-5 py-3 flex items-center justify-between text-left hover:bg-[#f8f9fb] transition-colors"
            >
              <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">How Was This Estimated?</p>
              <span className="text-xs text-[#64748b]">{showCalc ? '▲ Collapse' : '▼ Expand'}</span>
            </button>
            {showCalc && (
              <div className="px-5 pb-4 space-y-3">
                <div className="space-y-1.5 border border-[#e2e8f0] bg-[#f8f9fb] p-3 text-xs">
                  {[
                    { label: 'Eligible Investment Base', value: scheme.eligibleBase },
                    { label: 'Applicable Rate', value: scheme.applicableRate },
                    { label: 'Policy Ceiling', value: scheme.policyCeiling },
                    { label: 'Estimated Benefit', value: `₹${scheme.estimatedMin}–₹${scheme.estimatedMax} ${scheme.unit === 'lakh' ? 'Lakh' : 'Cr'}` },
                  ].map(r => (
                    <div key={r.label} className="flex items-center justify-between py-1 border-b border-[#f1f5f9] last:border-0">
                      <p className="text-xs text-[#6b7a8d]">{r.label}</p>
                      <p className="text-xs font-bold text-[#1a2533]">{r.value}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-[10px] text-[#64748b] uppercase tracking-wider mb-2 font-semibold">Inputs Used</p>
                  <div className="space-y-1.5">
                    {scheme.calcInputs.map(inp => (
                      <div key={inp.label} className="flex items-center justify-between gap-4 text-xs">
                        <p className="text-[#374151]">{inp.label}: <span className="font-semibold">{inp.value}</span></p>
                        <SourceBadge source={inp.source} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* 8. APPLICATION & ACTION CONTROLS */}
        <div className="flex items-center justify-between pt-2 flex-wrap gap-3">
          <button onClick={handleBack} className="text-xs border border-[#d1d9e0] text-[#475569] px-4 py-2 hover:bg-[#f1f5f9] transition-colors">
            ← Back to Incentives
          </button>
          <div className="flex gap-3">
            <button onClick={handleGoToROI} className="text-xs border border-[#1a56db] text-[#1a56db] px-4 py-2 hover:bg-[#ebf3ff] transition-colors font-medium">
              View ROI Impact
            </button>
            {isApproved ? (
              <button onClick={handleGoToClaims} className="bg-[#1a3a5c] text-white text-xs font-semibold px-5 py-2 hover:bg-[#0f2540] transition-colors">
                View Periodic Claims →
              </button>
            ) : (
              <button onClick={handleGoToReadiness} className="bg-[#1a3a5c] text-white text-xs font-semibold px-5 py-2 hover:bg-[#0f2540] transition-colors">
                Check Claim Readiness →
              </button>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
