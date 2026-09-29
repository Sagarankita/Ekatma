"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import { useIncentiveWorkspace } from '../state';
import { getIncentiveRoiInputs } from '../data';
import { IncentiveWorkspaceHeader } from './IncentiveWorkspaceHeader';

export function ROIPlannerScreen() {
  const router = useRouter();
  const { businessId, roiInputsDraft, setRoiInputsDraft } = useIncentiveWorkspace();
  const inputs = getIncentiveRoiInputs(businessId);

  const available = inputs.filter(i => i.source !== 'Needs Input').length;
  const needing = inputs.length - available;

  const handleBack = () => router.push(ENTREPRENEUR_ROUTES.incentives(businessId));
  const handleGoToResults = () => router.push(ENTREPRENEUR_ROUTES.incentives(businessId) + '/roi/results');

  // Instead of local state, we should ideally use calculatorDraft, but for these specific questions
  // the Figma just used local state. Let's persist them in session state so it's kept between I07 and I07A.
  const handleValChange = (id: string, val: string) => {
    setRoiInputsDraft(prev => ({
      ...prev,
      [id]: val
    }));
  };

  return (
    <main id="main-content" className="flex-1 bg-[#F9FAF2]" tabIndex={-1}>
      <IncentiveWorkspaceHeader
        businessId={businessId}
        title="ROI & Investment Scenario Planner"
        subtitle="Understand how project assumptions and potential government incentives may affect the financial outlook of your project."
        breadcrumb={['Home', businessId, 'Incentives', 'ROI & Scenario Planner']}
        breadcrumbHref={ENTREPRENEUR_ROUTES.business(businessId)}
      />

      <div className="max-w-[900px] mx-auto px-6 py-5 space-y-5">
        <div className="bg-[#fdf8e6] border border-[#fae69e] px-4 py-3 text-xs text-[#7a5807] font-semibold">
          PROJECTED ESTIMATES — NOT GUARANTEED RETURNS. Financial projections are illustrative and do not constitute investment advice.
        </div>

        {/* Driver identification */}
        <div className="bg-white border border-[#e3ebe1]">
          <div className="px-5 py-3 bg-[#F9FAF2] border-b border-[#e3ebe1]">
            <p className="text-xs font-bold text-[#355E3B] uppercase tracking-wider">Business-Specific Financial Drivers</p>
            <p className="text-[10px] text-[#555C56] mt-0.5">Based on your manufacturing business profile, the following key financial drivers have been identified.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#F9FAF2] bg-[#F9FAF2]">
                  {['Driver / Input', 'Value', 'Source'].map(h => (
                    <th key={h} className="text-left px-5 py-2 text-[10px] font-semibold text-[#8c9f8a] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F9FAF2]">
                {inputs.map(inp => (
                  <tr key={inp.label} className="hover:bg-[#F9FAF2]">
                    <td className="px-5 py-2.5 font-medium text-[#4A4A4A]">{inp.label}</td>
                    <td className="px-5 py-2.5 font-semibold text-[#2B2B2B]">{inp.value}</td>
                    <td className="px-5 py-2.5">
                      <span className={`text-[9px] font-bold px-2 py-0.5 border ${inp.verified ? 'bg-[#f0fdf4] text-[#166534] border-[#86efac]' : 'bg-[#F9FAF2] text-[#4A4A4A] border-[#d6dfd5]'}`}>
                        {inp.verified ? '✓ ' : ''}{inp.source}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 bg-[#F9FAF2] border-t border-[#F9FAF2] flex items-center gap-3 text-[11px]">
            <span className="font-semibold text-[#166534]">✓ {available} inputs available</span>
            {needing > 0 && (
              <>
                <span className="text-[#d6dfd5]">·</span>
                <span className="font-semibold text-[#7a5807]">{needing} additional assumptions required</span>
              </>
            )}
          </div>
        </div>

        {/* Remaining assumptions (simulated from Figma) */}
        <div className="bg-white border border-[#e3ebe1]">
          <div className="px-5 py-2.5 bg-[#F9FAF2] border-b border-[#e3ebe1]">
            <p className="text-xs font-bold text-[#355E3B] uppercase tracking-wider">Provide Remaining Assumptions</p>
          </div>
          {[
            { id: 'gm', label: 'Gross Margin (%)', hint: 'Estimated gross margin on sales' },
            { id: 'op-cost', label: 'Fixed Operating Cost (₹ Cr/year)', hint: 'Excluding labour and energy' },
          ].map(q => (
            <div key={q.id} className="px-5 py-3 border-b border-[#F9FAF2] last:border-0">
              <label className="text-[11px] font-semibold text-[#2B2B2B] block mb-1">{q.label}</label>
              <p className="text-[10px] text-[#555C56] mb-1.5">{q.hint}</p>
              <input
                type="text"
                placeholder="Enter value"
                value={roiInputsDraft[q.id] || ''}
                onChange={e => handleValChange(q.id, e.target.value)}
                className="w-full max-w-[280px] border border-[#d6dfd5] text-sm px-3 py-2 focus:outline-none focus:border-[#6DAE7C]"
              />
              <span className="text-[9px] font-bold px-2 py-0.5 border bg-[#F9FAF2] text-[#4A4A4A] border-[#d6dfd5] inline-block mt-2">
                User Assumption
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <button onClick={handleBack} className="text-xs border border-[#d6dfd5] text-[#4A4A4A] px-4 py-2 hover:bg-[#F9FAF2] transition-colors">Back</button>
          <button onClick={handleGoToResults} className="bg-[#355E3B] text-white text-sm font-semibold px-6 py-2.5 hover:bg-[#27472c] transition-colors">
            Generate ROI Projection →
          </button>
        </div>
      </div>
    </main>
  );
}
