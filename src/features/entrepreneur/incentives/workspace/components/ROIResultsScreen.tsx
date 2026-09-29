"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import { useIncentiveWorkspace } from '../state';
import { IncentiveWorkspaceHeader } from './IncentiveWorkspaceHeader';
import { useRegulatoryAssistant } from '@/features/regulatory-assistant/Provider';
import { inlineContext } from '@/features/regulatory-assistant/context';

export function ROIResultsScreen() {
  const router = useRouter();
  const { businessId } = useIncentiveWorkspace();
  const [showExplain, setShowExplain] = useState(false);
  const { openAssistant, pageContext } = useRegulatoryAssistant();

  const cashflows = [40, -20, 60, 100, 130, 160]; // net ₹ Lakh relative

  const handleBack = () => router.push(ENTREPRENEUR_ROUTES.incentives(businessId) + '/roi');
  const handleGoToScenarios = () => router.push(ENTREPRENEUR_ROUTES.incentives(businessId) + '/scenarios');
  const handleOpenRegAssistant = () => openAssistant({ origin: 'inline', mode: 'entity', context: inlineContext(pageContext, { pageType: 'roi-results', pageTitle: 'Investment Outlook', label: 'Investment Outlook', entities: { businessId } }) });

  return (
    <main id="main-content" className="flex-1 bg-[#F9FAF2]" tabIndex={-1}>
      <IncentiveWorkspaceHeader
        businessId={businessId}
        title="Investment Outlook"
        subtitle="Projected estimates based on supplied assumptions. Not a guarantee of returns."
        breadcrumb={['Home', businessId, 'Incentives', 'ROI Planner', 'Results']}
        breadcrumbHref={ENTREPRENEUR_ROUTES.business(businessId)}
      />

      <div className="max-w-[1000px] mx-auto px-6 py-5 space-y-5">
        <div className="bg-[#fdf8e6] border border-[#fae69e] px-4 py-2 text-xs text-[#7a5807] font-semibold text-center uppercase tracking-wider">
          Projected — Not Guaranteed
        </div>

        {/* Summary tiles */}
        <div className="bg-white border border-[#e3ebe1] px-5 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { label: 'Initial Investment', value: '₹10.0 Cr', sub: 'Fixed capital' },
              { label: '5-Year ROI', value: '38–52%', sub: 'Expected scenario' },
              { label: 'IRR', value: '18%', sub: 'Internal rate of return' },
              { label: 'NPV', value: '₹3.4 Cr', sub: 'At 12% discount rate' },
              { label: 'Payback Period', value: '4.2 years', sub: 'Without incentives' },
            ].map(m => (
              <div key={m.label} className="text-center">
                <p className="text-xl font-bold text-[#355E3B]">{m.value}</p>
                <p className="text-[11px] font-semibold text-[#4A4A4A] mt-0.5">{m.label}</p>
                <p className="text-[10px] text-[#8c9f8a]">{m.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cash flow visualization */}
        <div className="bg-white border border-[#e3ebe1] px-5 py-4">
          <p className="text-xs font-bold text-[#355E3B] uppercase tracking-wider mb-4">Projected Annual Cash Flow (₹ Lakh)</p>
          <div className="flex items-end gap-3 h-28">
            {cashflows.map((v, i) => {
              const max = Math.max(...cashflows.map(Math.abs));
              const pct = (Math.abs(v) / max) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col justify-end" style={{ height: 96 }}>
                    <div
                      className={`w-full ${v >= 0 ? 'bg-[#22c55e]' : 'bg-[#ef4444]'}`}
                      style={{ height: `${pct}%`, minHeight: 4 }}
                    />
                  </div>
                  <p className="text-[9px] font-semibold text-[#555C56]">Yr {i}</p>
                  <p className="text-[9px] text-[#4A4A4A]">{v >= 0 ? '+' : ''}{v}</p>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-[#8c9f8a] mt-2">Illustrative projection · values are indicative</p>
        </div>

        {/* With/Without Incentives comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-white border border-[#e3ebe1]">
            <div className="px-5 py-2.5 bg-[#F9FAF2] border-b border-[#e3ebe1]">
              <p className="text-xs font-bold text-[#555C56] uppercase tracking-wider">Without Estimated Incentives</p>
            </div>
            <div className="px-5 py-4 space-y-3">
              {[
                { label: 'Effective Investment', value: '₹10.0 Cr' },
                { label: 'Projected ROI (5-year)', value: '38–52%' },
                { label: 'Payback Period', value: '4.2 years' },
                { label: 'IRR', value: '18%' },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between border-b border-[#F9FAF2] pb-2 last:border-0">
                  <p className="text-xs text-[#555C56]">{r.label}</p>
                  <p className="text-xs font-bold text-[#4A4A4A]">{r.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#86efac]">
            <div className="px-5 py-2.5 bg-[#f0fdf4] border-b border-[#86efac]">
              <p className="text-xs font-bold text-[#166534] uppercase tracking-wider">With Identified Incentives (Indicative)</p>
            </div>
            <div className="px-5 py-4 space-y-3">
              {[
                { label: 'Potential Support', value: '₹1.33–₹2.31 Cr', hi: true },
                { label: 'Net Effective Investment', value: '₹7.7–₹8.7 Cr', hi: true },
                { label: 'Projected ROI (5-year)', value: '46–64%', hi: true },
                { label: 'Payback Period', value: '3.4 years', hi: true },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between border-b border-[#f0fdf4] pb-2 last:border-0">
                  <p className="text-xs text-[#555C56]">{r.label}</p>
                  <p className={`text-xs font-bold ${r.hi ? 'text-[#166534]' : 'text-[#4A4A4A]'}`}>{r.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Estimated Impact */}
        <div className="bg-[#f0fdf4] border border-[#86efac] px-5 py-4 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-bold text-[#166534] uppercase tracking-wider mb-1">Estimated Impact of Incentives</p>
            <p className="text-[11px] text-[#166534]">Potential Payback Improvement: <strong>~0.8 years</strong></p>
            <p className="text-[10px] text-[#555C56] mt-0.5">Subject to actual incentive amounts and verification outcome.</p>
          </div>
          <button onClick={handleGoToScenarios} className="text-xs border border-[#16a34a] text-[#166534] px-4 py-2 hover:bg-[#dcfce7] transition-colors font-medium">Compare Scenarios →</button>
        </div>

        {/* Explain */}
        <div className="bg-white border border-[#e3ebe1]">
          <button onClick={() => setShowExplain(!showExplain)} className="w-full px-5 py-3 flex items-center justify-between hover:bg-[#F9FAF2] transition-colors">
            <p className="text-xs font-bold text-[#355E3B]">Explain This Projection</p>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={`transition-transform ${showExplain ? 'rotate-180' : ''}`}><path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
          {showExplain && (
            <div className="border-t border-[#F9FAF2] px-5 py-4 space-y-3">
              <div className="bg-[#f0f9ff] border border-[#a1cba9] px-4 py-3 text-[11px] text-[#1e3a5c] leading-relaxed">
                <p className="font-semibold mb-1">AI Explanation</p>
                "Your projected result is primarily influenced by capacity utilisation (assumed 60% in Year 1, 80% from Year 3), gross margin on pharmaceutical products, and operating cost assumptions. The identified government incentives — principally the PSI 2019 capital subsidy and electricity duty exemption — reduce the effective capital outlay, which improves the projected payback period by an estimated 0.8 years."
                <p className="mt-2 text-[10px] text-[#555C56]">AI provides explanation only. The financial calculation is performed by the deterministic projection engine, not by AI.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['What is driving my ROI?', 'Which assumption affects the result most?', 'Explain this in Marathi'].map(q => (
                  <button key={q} onClick={handleOpenRegAssistant} className="text-[11px] border border-[#d6dfd5] text-[#4A4A4A] px-2.5 py-1 hover:bg-[#F9FAF2] transition-colors">{q}</button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <button onClick={handleBack} className="text-xs border border-[#d6dfd5] text-[#4A4A4A] px-4 py-2 hover:bg-[#F9FAF2] transition-colors">Back</button>
          <button onClick={handleGoToScenarios} className="bg-[#355E3B] text-white text-sm font-semibold px-6 py-2.5 hover:bg-[#27472c] transition-colors">Compare Scenarios →</button>
        </div>
      </div>
    </main>
  );
}
