"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import { useIncentiveWorkspace } from '../state';
import { getIncentiveDetailSchemes } from '../data';
import { IncentiveWorkspaceHeader, IncentiveStatusBadge } from './IncentiveWorkspaceHeader';
import { IncentiveSchemeDetail } from '../types';

export function IncentivePortfolioScreen() {
  const router = useRouter();
  const { businessId } = useIncentiveWorkspace();
  const schemes = getIncentiveDetailSchemes(businessId);
  
  const strong     = schemes.filter(s => s.status === 'strong-match');
  const conditional= schemes.filter(s => s.status === 'conditional');
  const needsInfo  = schemes.filter(s => s.status === 'needs-info');

  const handleBack = () => router.push(ENTREPRENEUR_ROUTES.incentives(businessId));
  const handleGoToDetail = (id: string) => router.push(ENTREPRENEUR_ROUTES.incentivePortfolioDetail(businessId, id));
  const handleGoToReadiness = () => router.push(ENTREPRENEUR_ROUTES.incentiveClaimReadiness(businessId));
  const handleGoToCalculator = () => router.push(ENTREPRENEUR_ROUTES.incentiveCalculator(businessId));

  function SchemeCard({ scheme }: { scheme: IncentiveSchemeDetail }) {
    return (
      <div className="px-5 py-4 hover:bg-[#f8fbff] transition-colors">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 flex-wrap mb-1">
              <p className="text-sm font-bold text-[#1a2533]">{scheme.name}</p>
              <IncentiveStatusBadge status={scheme.status} />
            </div>
            <p className="text-[11px] text-[#6b7a8d] mb-2">{scheme.authority} · {scheme.benefitType.charAt(0).toUpperCase() + scheme.benefitType.slice(1)} · {scheme.period}</p>
            {scheme.status !== 'needs-info' && (
              <p className="text-sm font-bold text-[#1a3a5c] mb-2">
                ₹{scheme.estimatedMin}–₹{scheme.estimatedMax} {scheme.unit === 'lakh' ? 'Lakh' : 'Cr'}
              </p>
            )}
            <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1">
              {scheme.criteria.map(c => (
                <span key={c.label} className={`text-[10px] flex items-center gap-1 ${c.met ? 'text-[#166534]' : 'text-[#92400e]'}`}>
                  <span>{c.met ? '✓' : '⚠'}</span> {c.label}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <button onClick={() => handleGoToDetail(scheme.id)} className="text-xs bg-[#1a3a5c] text-white px-3 py-1.5 hover:bg-[#0f2540] transition-colors">View Details</button>
            {scheme.status === 'strong-match' && (
              <button onClick={handleGoToReadiness} className="text-xs border border-[#d1d9e0] text-[#475569] px-3 py-1.5 hover:bg-[#f1f5f9] transition-colors">Claim Readiness</button>
            )}
            {scheme.status === 'needs-info' && (
              <button onClick={handleGoToCalculator} className="text-xs border border-[#1a56db] text-[#1a56db] px-3 py-1.5 hover:bg-[#ebf3ff] transition-colors">Provide Info</button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <IncentiveWorkspaceHeader
        businessId={businessId}
        title="Incentive Portfolio"
        subtitle="Based on current Business DNA and supplied inputs. Estimates are indicative — not a sanction order."
        breadcrumb={['Home', businessId, 'Incentives', 'Incentive Portfolio']}
        breadcrumbHref={ENTREPRENEUR_ROUTES.business(businessId)}
      />

      <div className="max-w-[1100px] mx-auto px-6 py-5 space-y-5">
        {/* Results summary */}
        <div className="bg-[#1a3a5c] text-white px-6 py-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#93c5fd] mb-2">Your Incentive Portfolio</p>
          <p className="text-3xl font-bold mb-1">₹1.33 Cr – ₹2.31 Cr</p>
          <p className="text-xs text-[#94a3b8] mb-4">Estimated potential support · Indicative — current policy version · Subject to verification</p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Strong Matches', value: strong.length, color: '#86efac' },
              { label: 'Conditional', value: conditional.length, color: '#fde68a' },
              { label: 'Needs Information', value: needsInfo.length, color: '#93c5fd' },
            ].map(m => (
              <div key={m.label}>
                <p className="text-xl font-bold" style={{ color: m.color }}>{m.value}</p>
                <p className="text-[11px] text-[#cbd5e1]">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Strong Matches */}
        {strong.length > 0 && (
          <div className="bg-white border border-[#e2e8f0]">
            <div className="px-5 py-2.5 bg-[#f0fdf4] border-b border-[#86efac]">
              <p className="text-xs font-bold text-[#166534] uppercase tracking-wider">Strong Matches — {strong.length} opportunities</p>
              <p className="text-[10px] text-[#6b7a8d] mt-0.5">Known mandatory conditions currently satisfied based on available information.</p>
            </div>
            <div className="divide-y divide-[#f8f9fb]">{strong.map(s => <SchemeCard key={s.id} scheme={s} />)}</div>
          </div>
        )}

        {/* Conditional */}
        {conditional.length > 0 && (
          <div className="bg-white border border-[#e2e8f0]">
            <div className="px-5 py-2.5 bg-[#fef9e7] border-b border-[#fde68a]">
              <p className="text-xs font-bold text-[#92400e] uppercase tracking-wider">Conditional Matches — {conditional.length} opportunities</p>
              <p className="text-[10px] text-[#6b7a8d] mt-0.5">Applicable but verification or evidence is still pending.</p>
            </div>
            <div className="divide-y divide-[#f8f9fb]">{conditional.map(s => <SchemeCard key={s.id} scheme={s} />)}</div>
          </div>
        )}

        {/* Needs Info */}
        {needsInfo.length > 0 && (
          <div className="bg-white border border-[#e2e8f0]">
            <div className="px-5 py-2.5 bg-[#f0f9ff] border-b border-[#93c5fd]">
              <p className="text-xs font-bold text-[#1e40af] uppercase tracking-wider">Needs Information — {needsInfo.length} opportunities</p>
              <p className="text-[10px] text-[#6b7a8d] mt-0.5">Cannot determine eligibility until required data is provided.</p>
            </div>
            <div className="divide-y divide-[#f8f9fb]">{needsInfo.map(s => <SchemeCard key={s.id} scheme={s} />)}</div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <button onClick={handleBack} className="text-xs border border-[#d1d9e0] text-[#475569] px-4 py-2 hover:bg-[#f1f5f9] transition-colors">Back to Incentives</button>
        </div>
      </div>
    </main>
  );
}
