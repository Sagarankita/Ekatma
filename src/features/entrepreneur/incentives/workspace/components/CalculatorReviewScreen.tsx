"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import { useIncentiveWorkspace } from '../state';
import { IncentiveWorkspaceHeader, SourceBadge } from './IncentiveWorkspaceHeader';
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog';

export function CalculatorReviewScreen() {
  const router = useRouter();
  const { businessId, calculatorDraft } = useIncentiveWorkspace();
  const business = findBusinessProjectById(businessId);
  
  const sections = [
    {
      title: 'Business',
      rows: [
        { label: 'Business Name', value: business?.name || businessId, source: 'Business DNA', verified: true },
        { label: 'Business Activity', value: 'Pharmaceutical Manufacturing', source: 'Business DNA — Verified', verified: true },
        { label: 'Enterprise Category', value: 'MSME — Small Enterprise', source: 'Business DNA — Verified', verified: true },
        { label: 'Project Type', value: 'New Unit', source: 'User Confirmed', verified: false },
      ],
    },
    {
      title: 'Location',
      rows: [
        { label: 'District', value: business?.location || businessId, source: 'Business DNA — Verified', verified: true },
        { label: 'PSI Category', value: 'Category B', source: 'System — Policy Engine', verified: true },
        { label: 'MIDC Estate', value: 'Registered industrial estate', source: 'Business DNA — Verified', verified: true },
      ],
    },
    {
      title: 'Investment',
      rows: [
        { label: 'Total Fixed Capital Investment', value: '₹10.0 Cr', source: 'User Confirmed', verified: false },
        { label: 'Plant & Machinery', value: '₹8.0 Cr', source: 'User Confirmed', verified: false },
        { label: 'Building & Civil Works', value: '₹1.5 Cr', source: 'User Confirmed', verified: false },
        { label: 'Term Loan Amount', value: '₹6.0 Cr', source: 'Self-declared', verified: false },
      ],
    },
    {
      title: 'Operations',
      rows: [
        { label: 'Expected Employment', value: '150 persons', source: 'Self-declared', verified: false },
        { label: 'Production Capacity', value: '5,000 MT/year', source: 'Business DNA', verified: true },
        { label: 'Expected Turnover (Yr 3)', value: '₹18.0 Cr', source: 'Self-declared', verified: false },
        { label: 'Electricity Consumption', value: calculatorDraft['elec-kwh'] ? `${calculatorDraft['elec-kwh']} kWh/year` : 'Not provided', source: 'User Input', verified: false },
      ],
    },
    {
      title: 'Additional Parameters',
      rows: [
        { label: 'Commercial Production Date', value: calculatorDraft['prod-date'] || 'Not provided', source: 'User Input', verified: false },
        { label: 'Green / Energy Efficiency Inv.', value: calculatorDraft['green-ee'] ? `₹${calculatorDraft['green-ee']} Lakh` : 'Not provided', source: 'User Input', verified: false },
        { label: 'R&D Expenditure', value: calculatorDraft['rd-exp'] ? `₹${calculatorDraft['rd-exp']} Lakh` : 'Not provided', source: 'User Input', verified: false },
      ],
    },
  ];

  const handleBack = () => router.push(ENTREPRENEUR_ROUTES.incentiveCalculatorQuestionnaire(businessId));
  const handleCalculate = () => router.push(ENTREPRENEUR_ROUTES.incentivePortfolio(businessId));

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <IncentiveWorkspaceHeader
        businessId={businessId}
        title="Review Before Calculation"
        subtitle="Verify the inputs below before the incentive assessment is run. You can edit any value."
        breadcrumb={['Home', businessId, 'Incentives', 'Calculate', 'Review']}
        breadcrumbHref={ENTREPRENEUR_ROUTES.business(businessId)}
      />

      <div className="max-w-[900px] mx-auto px-6 py-5 space-y-4">
        <div className="bg-[#f0f9ff] border border-[#93c5fd] px-4 py-3 text-xs text-[#1e3a5c]">
          <strong>Indicative estimate only.</strong> The calculation engine will apply current policy rules to these inputs. Final eligibility and admissible amounts are subject to departmental verification and policy conditions.
        </div>

        {sections.map(sec => (
          <div key={sec.title} className="bg-white border border-[#e2e8f0]">
            <div className="px-5 py-2.5 bg-[#f8f9fb] border-b border-[#e8edf2] flex items-center justify-between">
              <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">{sec.title}</p>
              <button onClick={handleBack} className="text-xs text-[#1a56db] hover:underline">Edit</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <tbody className="divide-y divide-[#f8f9fb]">
                  {sec.rows.map(r => (
                    <tr key={r.label} className="hover:bg-[#f8f9fb]">
                      <td className="px-5 py-2.5 text-[#6b7a8d] w-[240px]">{r.label}</td>
                      <td className="px-5 py-2.5 font-semibold text-[#1a2533]">{r.value}</td>
                      <td className="px-5 py-2.5"><SourceBadge source={r.source} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between pt-2">
          <button onClick={handleBack} className="text-xs border border-[#d1d9e0] text-[#475569] px-4 py-2 hover:bg-[#f1f5f9] transition-colors">Edit Information</button>
          <button onClick={handleCalculate} className="bg-[#1a3a5c] text-white text-sm font-bold px-8 py-3 hover:bg-[#0f2540] transition-colors">
            Calculate Incentive Opportunities →
          </button>
        </div>
      </div>
    </main>
  );
}

