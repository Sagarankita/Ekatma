const fs = require('fs');
const path = require('path');
const componentsDir = path.join('src', 'features', 'entrepreneur', 'incentives', 'workspace', 'components');

const code = `"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import { useIncentiveWorkspace } from '../state';
import { getIncentiveRoiInputs } from '../data';
import { IncentiveWorkspaceHeader } from './IncentiveWorkspaceHeader';

export function ROIPlannerScreen() {
  const router = useRouter();
  const { businessId, calculatorDraft, updateCalculatorDraft } = useIncentiveWorkspace();
  const inputs = getIncentiveRoiInputs(businessId);

  const available = inputs.filter(i => i.source !== 'Needs Input').length;
  const needing = inputs.length - available;

  const handleBack = () => router.push(ENTREPRENEUR_ROUTES.incentives(businessId));
  const handleGoToResults = () => router.push(ENTREPRENEUR_ROUTES.incentives(businessId) + '/roi/results');

  // Instead of local state, we should ideally use calculatorDraft, but for these specific questions
  // the Figma just used local state. Let's persist them in session state so it's kept between I07 and I07A.
  const handleValChange = (id: string, val: string) => {
    updateCalculatorDraft({
      roiAssumptions: {
        ...(calculatorDraft.roiAssumptions || {}),
        [id]: val
      }
    });
  };

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <IncentiveWorkspaceHeader
        businessId={businessId}
        title="ROI & Investment Scenario Planner"
        subtitle="Understand how project assumptions and potential government incentives may affect the financial outlook of your project."
        breadcrumb={['Home', businessId, 'Incentives', 'ROI & Scenario Planner']}
        breadcrumbHref={ENTREPRENEUR_ROUTES.business(businessId)}
      />

      <div className="max-w-[900px] mx-auto px-6 py-5 space-y-5">
        <div className="bg-[#fef3c7] border border-[#fde68a] px-4 py-3 text-xs text-[#92400e] font-semibold">
          PROJECTED ESTIMATES — NOT GUARANTEED RETURNS. Financial projections are illustrative and do not constitute investment advice.
        </div>

        {/* Driver identification */}
        <div className="bg-white border border-[#e2e8f0]">
          <div className="px-5 py-3 bg-[#f8f9fb] border-b border-[#e8edf2]">
            <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Business-Specific Financial Drivers</p>
            <p className="text-[10px] text-[#6b7a8d] mt-0.5">Based on your manufacturing business profile, the following key financial drivers have been identified.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#f0f4f8] bg-[#f8f9fb]">
                  {['Driver / Input', 'Value', 'Source'].map(h => (
                    <th key={h} className="text-left px-5 py-2 text-[10px] font-semibold text-[#9aa5b4] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f8f9fb]">
                {inputs.map(inp => (
                  <tr key={inp.label} className="hover:bg-[#f8f9fb]">
                    <td className="px-5 py-2.5 font-medium text-[#374151]">{inp.label}</td>
                    <td className="px-5 py-2.5 font-semibold text-[#1a2533]">{inp.value}</td>
                    <td className="px-5 py-2.5">
                      <span className={\`text-[9px] font-bold px-2 py-0.5 border \${inp.verified ? 'bg-[#f0fdf4] text-[#166534] border-[#86efac]' : 'bg-[#f8f9fb] text-[#475569] border-[#d1d9e0]'}\`}>
                        {inp.verified ? '✓ ' : ''}{inp.source}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 bg-[#f8f9fb] border-t border-[#f0f4f8] flex items-center gap-3 text-[11px]">
            <span className="font-semibold text-[#166534]">✓ {available} inputs available</span>
            {needing > 0 && (
              <>
                <span className="text-[#d1d9e0]">·</span>
                <span className="font-semibold text-[#92400e]">{needing} additional assumptions required</span>
              </>
            )}
          </div>
        </div>

        {/* Remaining assumptions (simulated from Figma) */}
        <div className="bg-white border border-[#e2e8f0]">
          <div className="px-5 py-2.5 bg-[#f8f9fb] border-b border-[#e8edf2]">
            <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Provide Remaining Assumptions</p>
          </div>
          {[
            { id: 'gm', label: 'Gross Margin (%)', hint: 'Estimated gross margin on sales' },
            { id: 'op-cost', label: 'Fixed Operating Cost (₹ Cr/year)', hint: 'Excluding labour and energy' },
          ].map(q => (
            <div key={q.id} className="px-5 py-3 border-b border-[#f8f9fb] last:border-0">
              <label className="text-[11px] font-semibold text-[#1a2533] block mb-1">{q.label}</label>
              <p className="text-[10px] text-[#6b7a8d] mb-1.5">{q.hint}</p>
              <input
                type="text"
                placeholder="Enter value"
                value={calculatorDraft?.roiAssumptions?.[q.id] || ''}
                onChange={e => handleValChange(q.id, e.target.value)}
                className="w-full max-w-[280px] border border-[#d1d9e0] text-sm px-3 py-2 focus:outline-none focus:border-[#1a56db]"
              />
              <span className="text-[9px] font-bold px-2 py-0.5 border bg-[#f8f9fb] text-[#475569] border-[#d1d9e0] inline-block mt-2">
                User Assumption
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <button onClick={handleBack} className="text-xs border border-[#d1d9e0] text-[#475569] px-4 py-2 hover:bg-[#f1f5f9] transition-colors">Back</button>
          <button onClick={handleGoToResults} className="bg-[#1a3a5c] text-white text-sm font-semibold px-6 py-2.5 hover:bg-[#0f2540] transition-colors">
            Generate ROI Projection →
          </button>
        </div>
      </div>
    </main>
  );
}
`;
fs.writeFileSync(path.join(componentsDir, 'ROIPlannerScreen.tsx'), code);
console.log('done');
