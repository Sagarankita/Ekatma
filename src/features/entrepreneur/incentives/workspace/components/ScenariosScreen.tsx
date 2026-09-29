"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import { useIncentiveWorkspace } from '../state';
import { IncentiveWorkspaceHeader } from './IncentiveWorkspaceHeader';

export function ScenariosScreen() {
  const router = useRouter();
  const { businessId } = useIncentiveWorkspace();

  const handleBack = () => router.push(ENTREPRENEUR_ROUTES.incentives(businessId));

  const scenarios = [
    {
      label: 'Current Plan',
      investment: '₹10.0 Cr', employment: 100, capacity: '60%', green: 'No',
      incentives: '₹1.33–₹2.31 Cr', roi: '38–52%', payback: '4.2 yrs', irr: '18%',
      accent: '#355E3B',
    },
    {
      label: 'Expansion Plan',
      investment: '₹14.0 Cr', employment: 175, capacity: '80%', green: 'Yes (₹50 Lakh)',
      incentives: '₹2.10–₹3.50 Cr', roi: '44–60%', payback: '3.6 yrs', irr: '22%',
      accent: '#166534',
    },
  ];

  const changes = [
    'Higher investment shifted PSI 2019 capital subsidy to a higher eligible ceiling',
    'Increased employment unlocked the Employment-Linked Incentive scheme',
    'Green investment of ₹50 Lakh activated the Green Industry Incentive Scheme',
    'Higher capacity utilisation improved projected revenue and gross margin',
    'Net effective investment increased — but incentive support grew proportionally more',
  ];

  return (
    <main id="main-content" className="flex-1 bg-[#F9FAF2]" tabIndex={-1}>
      <IncentiveWorkspaceHeader
        businessId={businessId}
        title="Compare Investment Scenarios"
        subtitle="Side-by-side comparison of how different project configurations affect potential incentives and projected financial outcomes. This is a planning tool only."
        breadcrumb={['Home', businessId, 'Incentives', 'Scenario Simulator']}
        breadcrumbHref={ENTREPRENEUR_ROUTES.business(businessId)}
      />

      <div className="max-w-[1000px] mx-auto px-6 py-5 space-y-5">
        <div className="bg-[#fdf8e6] border border-[#fae69e] px-4 py-2 text-xs text-[#7a5807] font-semibold">
          Scenario comparison is for planning purposes only. EKATMA does not recommend which investment decision to make.
        </div>

        {/* Scenario inputs */}
        <div className="bg-white border border-[#e3ebe1]">
          <div className="px-5 py-2.5 bg-[#F9FAF2] border-b border-[#e3ebe1]">
            <p className="text-xs font-bold text-[#355E3B] uppercase tracking-wider">Scenario Inputs</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#F9FAF2] bg-[#F9FAF2]">
                  <th className="text-left px-5 py-2 text-[10px] font-semibold text-[#8c9f8a] uppercase tracking-wider">Parameter</th>
                  {scenarios.map(s => (
                    <th key={s.label} className="text-left px-5 py-2 text-[10px] font-semibold uppercase tracking-wider" style={{ color: s.accent }}>{s.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F9FAF2]">
                {[
                  { label: 'Investment', key: 'investment' },
                  { label: 'Employment', key: 'employment' },
                  { label: 'Capacity Utilisation', key: 'capacity' },
                  { label: 'Green / Sustainability Inv.', key: 'green' },
                ].map(r => (
                  <tr key={r.label} className="hover:bg-[#F9FAF2]">
                    <td className="px-5 py-2.5 text-[#555C56]">{r.label}</td>
                    {scenarios.map(s => (
                      <td key={s.label} className="px-5 py-2.5 font-semibold text-[#2B2B2B]">{String((s as any)[r.key])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results comparison */}
        <div className="bg-white border border-[#e3ebe1]">
          <div className="px-5 py-2.5 bg-[#F9FAF2] border-b border-[#e3ebe1]">
            <p className="text-xs font-bold text-[#355E3B] uppercase tracking-wider">Indicative Outcome Comparison</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#F9FAF2] bg-[#F9FAF2]">
                  <th className="text-left px-5 py-2 text-[10px] font-semibold text-[#8c9f8a] uppercase tracking-wider">Outcome</th>
                  {scenarios.map(s => (
                    <th key={s.label} className="text-left px-5 py-2 text-[10px] font-semibold uppercase tracking-wider" style={{ color: s.accent }}>{s.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F9FAF2]">
                {[
                  { label: 'Potential Incentives', key: 'incentives' },
                  { label: 'Projected ROI (5-year)', key: 'roi' },
                  { label: 'Payback Period', key: 'payback' },
                  { label: 'IRR', key: 'irr' },
                ].map(r => (
                  <tr key={r.label} className="hover:bg-[#F9FAF2]">
                    <td className="px-5 py-2.5 text-[#555C56]">{r.label}</td>
                    {scenarios.map(s => (
                      <td key={s.label} className="px-5 py-2.5 font-bold text-[#2B2B2B]">{String((s as any)[r.key])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* What Changed */}
        <div className="bg-white border border-[#e3ebe1]">
          <div className="px-5 py-2.5 bg-[#F9FAF2] border-b border-[#e3ebe1]">
            <p className="text-xs font-bold text-[#355E3B] uppercase tracking-wider">What Changed Between Scenarios?</p>
          </div>
          <div className="px-5 py-4 space-y-2">
            {changes.map((c, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="text-[#6DAE7C] font-bold text-xs shrink-0 mt-0.5">›</span>
                <p className="text-[11px] text-[#4A4A4A] leading-snug">{c}</p>
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleBack} className="text-xs border border-[#d6dfd5] text-[#4A4A4A] px-4 py-2 hover:bg-[#F9FAF2] transition-colors">Back</button>
      </div>
    </main>
  );
}
