"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import { useIncentiveWorkspace } from '../state';
import { IncentiveWorkspaceHeader, SourceBadge } from './IncentiveWorkspaceHeader';

export function CalculatorStartScreen() {
  const router = useRouter();
  const { businessId } = useIncentiveWorkspace();
  
  const [step] = useState(1);
  const steps = ['Business', 'Location', 'Investment', 'Operations', 'Review'];

  const dnaFields = [
    { label: 'Business Activity', value: 'Manufacturing — Pharmaceutical', status: 'Department Verified', ok: true },
    { label: 'Project Location', value: 'Ratnagiri, Maharashtra', status: 'Business DNA — Verified', ok: true },
    { label: 'Project Type', value: 'New Unit', status: 'User Confirmed', ok: true },
    { label: 'Enterprise Category', value: 'MSME — Small Enterprise', status: 'Business DNA — Verified', ok: true },
    { label: 'Total Fixed Capital Investment', value: '₹10.0 Cr', status: 'User Confirmed', ok: true },
    { label: 'Plant & Machinery', value: '₹8.0 Cr', status: 'User Confirmed', ok: true },
    { label: 'Building & Civil Works', value: '₹1.5 Cr', status: 'User Confirmed', ok: true },
    { label: 'MIDC Plot — Location', value: 'Ratnagiri MIDC Phase I', status: 'Business DNA — Verified', ok: true },
    { label: 'MIDC Allotment Status', value: 'Allotted — Active', status: 'System Verified', ok: true },
    { label: 'Expected Employment', value: '150 persons', status: 'Self-declared', ok: true },
    { label: 'Expected Annual Turnover (Yr 3)', value: '₹18 Cr', status: 'Self-declared', ok: true },
    { label: 'Production Capacity', value: '5,000 MT/year', status: 'Business DNA', ok: true },
    { label: 'GSTIN Registration', value: '27AABCM1234Q1Z5', status: 'System Verified', ok: true },
  ];

  const missing = [
    { label: 'Electricity Consumption (kWh/year)', hint: 'Required for Electricity Duty Exemption assessment' },
    { label: 'Connected Load (kVA)', hint: 'Required for Electricity Duty calculation' },
    { label: 'Green / Energy Efficiency Investment (₹)', hint: 'Required to evaluate sustainability incentives' },
    { label: 'Commercial Production Date (expected)', hint: 'Required for timeline-linked incentive eligibility' },
    { label: 'R&D Expenditure Budget (₹ Lakh)', hint: 'Required for Innovation / R&D support assessment' },
  ];

  const handleBack = () => router.push(ENTREPRENEUR_ROUTES.incentiveCentre(businessId));
  const handleNext = () => router.push(ENTREPRENEUR_ROUTES.incentiveCalculatorQuestionnaire(businessId));

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <IncentiveWorkspaceHeader
        businessId={businessId}
        title="Calculate Incentives"
        subtitle="We reuse verified Business DNA to minimise manual input."
        breadcrumb={['Home', businessId, 'Incentives', 'Calculate Incentives']}
        breadcrumbHref={ENTREPRENEUR_ROUTES.business(businessId)}
      />

      <div className="max-w-[900px] mx-auto px-6 py-5 space-y-5">
        {/* Step indicator */}
        <div className="flex items-center gap-0 overflow-x-auto">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold shrink-0 ${i === step - 1 ? 'bg-[#1a3a5c] text-white' : i < step - 1 ? 'bg-[#f0fdf4] text-[#166534] border border-[#86efac]' : 'bg-white border border-[#e2e8f0] text-[#9aa5b4]'}`}>
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${i === step - 1 ? 'bg-white text-[#1a3a5c]' : i < step - 1 ? 'bg-[#22c55e] text-white' : 'bg-[#e2e8f0] text-[#9aa5b4]'}`}>
                  {i < step - 1 ? '✓' : i + 1}
                </span>
                {s}
              </div>
              {i < steps.length - 1 && <div className="w-5 h-px bg-[#d1d9e0] shrink-0" />}
            </React.Fragment>
          ))}
        </div>

        {/* DNA Reuse panel */}
        <div className="bg-white border border-[#e2e8f0]">
          <div className="px-5 py-3 bg-[#f0fdf4] border-b border-[#86efac] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#16a34a] font-bold">✓</span>
              <p className="text-xs font-bold text-[#166534]">Most information has already been reused from your verified Business DNA</p>
            </div>
            <span className="text-[11px] font-semibold text-[#166534] bg-[#dcfce7] border border-[#86efac] px-2 py-0.5">{dnaFields.length} of {dnaFields.length + missing.length} parameters available</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#f0f4f8] bg-[#f8f9fb]">
                  {['Parameter', 'Value', 'Source / Verification'].map(h => (
                    <th key={h} className="text-left px-4 py-2 text-[10px] font-semibold text-[#9aa5b4] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f8f9fb]">
                {dnaFields.map(f => (
                  <tr key={f.label} className="hover:bg-[#f8f9fb]">
                    <td className="px-4 py-2.5 font-medium text-[#374151]">{f.label}</td>
                    <td className="px-4 py-2.5 text-[#1a2533] font-semibold">{f.value}</td>
                    <td className="px-4 py-2.5"><SourceBadge source={f.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Missing info */}
        <div className="bg-white border border-[#fde68a] border-l-4 border-l-[#d97706]">
          <div className="px-5 py-3 bg-[#fffbeb] border-b border-[#fde68a] flex items-center justify-between">
            <p className="text-xs font-bold text-[#92400e]">{missing.length} additional inputs required to evaluate all potential incentives</p>
            <span className="text-[11px] font-semibold text-[#92400e] bg-[#fef3c7] border border-[#fde68a] px-2 py-0.5">{missing.length} of {dnaFields.length + missing.length} remaining</span>
          </div>
          <div className="divide-y divide-[#fef9e7]">
            {missing.map(m => (
              <div key={m.label} className="px-5 py-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold text-[#1a2533]">{m.label}</p>
                  <p className="text-[10px] text-[#6b7a8d] mt-0.5">{m.hint}</p>
                </div>
                <span className="text-[10px] text-[#d97706] font-bold shrink-0">Required</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button onClick={handleBack} className="text-xs border border-[#d1d9e0] text-[#475569] px-4 py-2 hover:bg-[#f1f5f9] transition-colors">Back</button>
          <button onClick={handleNext} className="bg-[#1a3a5c] text-white text-sm font-semibold px-6 py-2.5 hover:bg-[#0f2540] transition-colors">
            Continue — Provide Missing Information →
          </button>
        </div>
      </div>
    </main>
  );
}
