"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import { useIncentiveWorkspace } from '../state';
import { getIncentivePolicyUpdates } from '../data';
import { IncentiveWorkspaceHeader } from './IncentiveWorkspaceHeader';

export function PolicyUpdatesScreen() {
  const router = useRouter();
  const { businessId } = useIncentiveWorkspace();
  const updates = getIncentivePolicyUpdates(businessId);

  const handleBack = () => router.push(ENTREPRENEUR_ROUTES.incentives(businessId));
  const handleGoToDetail = (id: string) => router.push(ENTREPRENEUR_ROUTES.incentives(businessId) + '/portfolio/' + id);
  const handleOpenRegAssistant = () => alert("Regulatory Assistant would open here.");

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <IncentiveWorkspaceHeader
        businessId={businessId}
        title="Incentive Policy Updates"
        subtitle="Policy amendments and new schemes that may affect your incentive opportunities."
        breadcrumb={['Home', businessId, 'Incentives', 'Policy Updates']}
        breadcrumbHref={ENTREPRENEUR_ROUTES.business(businessId)}
      />

      <div className="max-w-[900px] mx-auto px-6 py-5 space-y-4">
        {updates.map(u => (
          <div key={u.id} className="bg-white border border-[#e2e8f0]">
            <div className={`px-5 py-3 border-b ${u.type === 'new-scheme' ? 'bg-[#f0fdf4] border-[#86efac]' : 'bg-[#ede9fe] border-[#a5b4fc]'}`}>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[9px] font-bold px-2 py-0.5 border uppercase tracking-wider ${u.type === 'new-scheme' ? 'bg-[#dcfce7] text-[#166534] border-[#86efac]' : 'bg-[#ede9fe] text-[#3730a3] border-[#a5b4fc]'}`}>
                  {u.type === 'new-scheme' ? 'New Opportunity' : 'Amendment'}
                </span>
                {u.validated
                  ? <span className="text-[10px] font-semibold text-[#166534]">✓ Validated</span>
                  : <span className="text-[10px] font-semibold text-[#d97706]">⚠ Under Validation — Draft Stage</span>
                }
                <span className="text-[10px] text-[#6b7a8d] ml-auto">Detected {u.detected}</span>
              </div>
            </div>
            <div className="px-5 py-4">
              <p className="text-sm font-bold text-[#1a2533] mb-1.5">{u.title}</p>
              <p className="text-[11px] text-[#374151] leading-relaxed mb-3">{u.summary}</p>
              <div className="flex items-center gap-4 flex-wrap text-[10px] text-[#6b7a8d]">
                <span>Effective: <strong>{u.effectiveDate}</strong></span>
                {u.affectedSchemes.length > 0 && (
                  <span>Affects: <strong>{u.affectedSchemes.join(', ')}</strong></span>
                )}
                <span>Impact: <strong className={u.impact === 'positive' ? 'text-[#166534]' : 'text-[#6366f1]'}>{u.impact === 'positive' ? 'Potentially increases your benefit' : 'Potential new opportunity'}</strong></span>
              </div>
              <div className="flex gap-3 mt-3">
                <button onClick={() => handleGoToDetail(u.affectedSchemes[0] || 'PSI-2019')} className="text-xs bg-[#1a3a5c] text-white px-3 py-1.5 hover:bg-[#0f2540] transition-colors">View Impact</button>
                <button onClick={handleOpenRegAssistant} className="text-xs border border-[#6366f1] text-[#4338ca] px-3 py-1.5 hover:bg-[#eef2ff] transition-colors">Ask Regulatory Assistant</button>
              </div>
            </div>
          </div>
        ))}

        <button onClick={handleBack} className="text-xs border border-[#d1d9e0] text-[#475569] px-4 py-2 hover:bg-[#f1f5f9] transition-colors">Back</button>
      </div>
    </main>
  );
}
