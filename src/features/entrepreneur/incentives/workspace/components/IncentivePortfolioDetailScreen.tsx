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

  // Requirement: Validate IDs via notFound() if invalid.
  // Actually, we can throw an error or handle it in the Page wrapper, but doing it here is also fine.
  // If not found, throw error or return null.
  if (!scheme) {
    // throw new Error('Scheme not found'); // Best to use notFound() in Next.js, handled in page wrapper.
    return <div>Scheme not found</div>;
  }

  const handleBack = () => router.push(ENTREPRENEUR_ROUTES.incentivePortfolio(businessId));
  const handleGoToROI = () => router.push(ENTREPRENEUR_ROUTES.incentiveRoi(businessId));
  const handleGoToReadiness = () => router.push(ENTREPRENEUR_ROUTES.incentiveClaimReadiness(businessId));

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <IncentiveWorkspaceHeader
        businessId={businessId}
        title={scheme.name}
        breadcrumb={['Home', businessId, 'Incentives', 'Portfolio', scheme.name]}
        breadcrumbHref={ENTREPRENEUR_ROUTES.business(businessId)}
      />

      <div className="max-w-[900px] mx-auto px-6 py-5 space-y-4">
        {/* Status + Benefit */}
        <div className="bg-white border border-[#e2e8f0] px-5 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-[10px] text-[#6b7a8d] uppercase tracking-wider mb-1">Status</p>
              <IncentiveStatusBadge status={scheme.status} />
            </div>
            <div>
              <p className="text-[10px] text-[#6b7a8d] uppercase tracking-wider mb-1">Estimated Benefit</p>
              <p className="text-sm font-bold text-[#1a3a5c]">₹{scheme.estimatedMin}–₹{scheme.estimatedMax} {scheme.unit === 'lakh' ? 'Lakh' : 'Cr'}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#6b7a8d] uppercase tracking-wider mb-1">Benefit Type</p>
              <p className="text-xs font-semibold text-[#374151] capitalize">{scheme.benefitType}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#6b7a8d] uppercase tracking-wider mb-1">Potential Period</p>
              <p className="text-xs font-semibold text-[#374151]">{scheme.period}</p>
            </div>
          </div>
          <div className="bg-[#fff9f0] border border-[#fde68a] px-3 py-2 text-[11px] text-[#92400e]">
            <strong>Indicative estimate.</strong> This is not a sanction order. Final eligibility and admissible amount are subject to policy conditions and departmental verification.
          </div>
        </div>

        {/* Why this incentive appears */}
        <div className="bg-white border border-[#e2e8f0]">
          <div className="px-5 py-2.5 bg-[#f8f9fb] border-b border-[#e8edf2]">
            <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Why This Incentive Appears</p>
          </div>
          <div className="divide-y divide-[#f8f9fb]">
            {scheme.criteria.map(c => (
              <div key={c.label} className="px-5 py-3 flex items-start gap-3">
                <span className={`text-sm font-bold shrink-0 mt-0.5 ${c.met ? 'text-[#16a34a]' : 'text-[#d97706]'}`}>{c.met ? '✓' : '⚠'}</span>
                <div>
                  <p className={`text-[11px] font-semibold ${c.met ? 'text-[#166534]' : 'text-[#92400e]'}`}>{c.label}</p>
                  {c.note && <p className="text-[10px] text-[#6b7a8d] mt-0.5">{c.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Policy Basis */}
        <div className="bg-white border border-[#e2e8f0]">
          <div className="px-5 py-2.5 bg-[#f8f9fb] border-b border-[#e8edf2]">
            <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Policy Basis</p>
          </div>
          <div className="px-5 py-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            {[
              { label: 'Policy Name', value: scheme.policyName },
              { label: 'Policy Version', value: scheme.policyVersion },
              { label: 'Effective From', value: scheme.effectiveFrom },
            ].map(r => (
              <div key={r.label}>
                <p className="text-[10px] text-[#6b7a8d] uppercase tracking-wider mb-0.5">{r.label}</p>
                <p className="font-semibold text-[#1a2533]">{r.value}</p>
              </div>
            ))}
          </div>
          <div className="px-5 py-2 border-t border-[#f0f4f8] flex gap-3">
            <button className="text-xs text-[#1a56db] hover:underline font-medium">View Policy Source →</button>
          </div>
        </div>

        {/* Calculation */}
        <div className="bg-white border border-[#e2e8f0]">
          <button
            onClick={() => setShowCalc(!showCalc)}
            className="w-full px-5 py-3 flex items-center justify-between text-left hover:bg-[#f8f9fb] transition-colors"
          >
            <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">How Was This Estimated?</p>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={`transition-transform ${showCalc ? 'rotate-180' : ''}`}><path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
          {showCalc && (
            <div className="border-t border-[#f0f4f8]">
              <div className="px-5 py-3 space-y-2">
                {[
                  { label: 'Eligible Investment Base', value: scheme.eligibleBase },
                  { label: 'Applicable Rate', value: scheme.applicableRate },
                  { label: 'Policy Ceiling', value: scheme.policyCeiling },
                  { label: 'Estimated Benefit', value: `₹${scheme.estimatedMin}–₹${scheme.estimatedMax} ${scheme.unit === 'lakh' ? 'Lakh' : 'Cr'}` },
                ].map(r => (
                  <div key={r.label} className="flex items-center justify-between py-1.5 border-b border-[#f8f9fb] last:border-0">
                    <p className="text-xs text-[#6b7a8d]">{r.label}</p>
                    <p className="text-xs font-bold text-[#1a2533]">{r.value}</p>
                  </div>
                ))}
              </div>
              <div className="px-5 pb-3">
                <p className="text-[10px] text-[#6b7a8d] uppercase tracking-wider mb-2 font-semibold">Inputs Used</p>
                <div className="space-y-1.5">
                  {scheme.calcInputs.map(inp => (
                    <div key={inp.label} className="flex items-center justify-between gap-4">
                      <p className="text-[11px] text-[#374151]">{inp.label}: <span className="font-semibold">{inp.value}</span></p>
                      <SourceBadge source={inp.source} />
                    </div>
                  ))}
                </div>
                <div className="mt-3 bg-[#f8f9fb] border border-[#e2e8f0] px-3 py-2 text-[10px] text-[#6b7a8d]">
                  This is an indicative calculation and not a sanction order. Final admissible amount is determined by the competent authority.
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 flex-wrap gap-3">
          <button onClick={handleBack} className="text-xs border border-[#d1d9e0] text-[#475569] px-4 py-2 hover:bg-[#f1f5f9] transition-colors">Back</button>
          <div className="flex gap-3">
            <button onClick={handleGoToROI} className="text-xs border border-[#1a56db] text-[#1a56db] px-4 py-2 hover:bg-[#ebf3ff] transition-colors font-medium">View ROI Impact</button>
            <button onClick={handleGoToReadiness} className="bg-[#1a3a5c] text-white text-sm font-semibold px-5 py-2 hover:bg-[#0f2540] transition-colors">Check Claim Readiness</button>
          </div>
        </div>
      </div>
    </main>
  );
}
