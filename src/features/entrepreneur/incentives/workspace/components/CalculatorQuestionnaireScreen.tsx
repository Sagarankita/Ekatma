"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import { useIncentiveWorkspace } from '../state';
import { IncentiveWorkspaceHeader } from './IncentiveWorkspaceHeader';

export function CalculatorQuestionnaireScreen() {
  const router = useRouter();
  const { businessId, calculatorDraft, setCalculatorDraft } = useIncentiveWorkspace();
  
  const [openHint, setOpenHint] = useState<string | null>(null);

  const questions = [
    { id: 'elec-kwh', label: 'Expected Annual Electricity Consumption', unit: 'kWh/year', hint: 'Certain incentive schemes depend on electricity usage. This is used only to estimate the Electricity Duty Exemption benefit under PSI 2019.', group: 'Core' },
    { id: 'elec-kva', label: 'Sanctioned Connected Load', unit: 'kVA', hint: 'Required to verify eligibility for industrial electricity tariff-linked exemptions.', group: 'Core' },
    { id: 'prod-date', label: 'Expected Commercial Production Date', unit: 'MM/YYYY', hint: 'Timeline-linked incentives (such as capital subsidy) require a commercial production date to determine eligibility window.', group: 'Core' },
    { id: 'green-ee', label: 'Proposed Energy Efficiency Investment', unit: '₹ Lakh', hint: 'Required to assess eligibility for the Green Industry Incentive Scheme. Only relevant if you are investing in energy-efficient equipment.', group: 'Sustainability' },
    { id: 'green-re', label: 'Proposed Renewable Energy Investment', unit: '₹ Lakh', hint: 'Investments in solar, wind or biomass energy may unlock additional green incentives.', group: 'Sustainability' },
    { id: 'rd-exp', label: 'Planned R&D Expenditure', unit: '₹ Lakh', hint: 'R&D investment may qualify for MSME Innovation support or DST grant schemes. Leave blank if not applicable.', group: 'R&D / Innovation' },
  ];

  const groups = [...new Set(questions.map(q => q.group))];

  const handleBack = () => router.push(ENTREPRENEUR_ROUTES.incentiveCalculator(businessId));
  const handleNext = () => router.push(ENTREPRENEUR_ROUTES.incentiveCalculatorReview(businessId));

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <IncentiveWorkspaceHeader
        businessId={businessId}
        title="Provide Missing Information"
        subtitle="These are the only additional inputs needed. All other parameters have been sourced from your Business DNA."
        breadcrumb={['Home', businessId, 'Incentives', 'Calculate', 'Questionnaire']}
        breadcrumbHref={ENTREPRENEUR_ROUTES.business(businessId)}
      />

      <div className="max-w-[720px] mx-auto px-6 py-5 space-y-5">
        <div className="bg-[#f0fdf4] border border-[#86efac] px-4 py-3 text-xs text-[#166534] font-medium">
          ✓ 13 of 18 required parameters already available from Business DNA. Only 5 additional inputs are shown below.
        </div>

        {groups.map(group => (
          <div key={group} className="bg-white border border-[#e2e8f0]">
            <div className="px-5 py-2.5 bg-[#f8f9fb] border-b border-[#e8edf2]">
              <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">{group} Information</p>
            </div>
            <div className="divide-y divide-[#f8f9fb]">
              {questions.filter(q => q.group === group).map(q => (
                <div key={q.id} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <label className="text-sm font-semibold text-[#1a2533]">{q.label}</label>
                    <button
                      onClick={() => setOpenHint(openHint === q.id ? null : q.id)}
                      className="text-[#6366f1] text-[11px] font-medium hover:underline shrink-0 flex items-center gap-1"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/><path d="M6 4A.75.75 0 017.5 4.75c0 .6-.75.9-.75 1.75M6 8.5v.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                      Why do we need this?
                    </button>
                  </div>
                  {openHint === q.id && (
                    <div className="mb-3 bg-[#f0f9ff] border border-[#93c5fd] px-3 py-2.5 text-[11px] text-[#1e3a5c] leading-relaxed">
                      <p className="font-semibold text-[#1a56db] mb-1 flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/><path d="M6 4A.75.75 0 017.5 4.75c0 .6-.75.9-.75 1.75M6 8.5v.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                        Why is this required?
                      </p>
                      {q.hint}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder={`Enter ${q.unit}`}
                      value={calculatorDraft[q.id] || ''}
                      onChange={e => setCalculatorDraft(prev => ({ ...prev, [q.id]: e.target.value }))}
                      className="flex-1 border border-[#d1d9e0] text-sm px-3 py-2 focus:outline-none focus:border-[#1a56db] focus:ring-1 focus:ring-[#1a56db] text-[#1a2533] placeholder:text-[#9aa5b4]"
                    />
                    <span className="text-xs text-[#6b7a8d] shrink-0">{q.unit}</span>
                  </div>
                  <p className="text-[10px] text-[#9aa5b4] mt-1">Optional — skip if not applicable to your project</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between pt-2">
          <button onClick={handleBack} className="text-xs border border-[#d1d9e0] text-[#475569] px-4 py-2 hover:bg-[#f1f5f9] transition-colors">Back</button>
          <button onClick={handleNext} className="bg-[#1a3a5c] text-white text-sm font-semibold px-6 py-2.5 hover:bg-[#0f2540] transition-colors">
            Review Before Calculation →
          </button>
        </div>
      </div>
    </main>
  );
}
