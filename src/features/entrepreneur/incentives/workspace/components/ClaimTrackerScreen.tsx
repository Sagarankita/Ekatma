"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import { useIncentiveWorkspace } from '../state';
import { getIncentiveClaims } from '../data';
import { IncentiveWorkspaceHeader, ClaimStatusBadge } from './IncentiveWorkspaceHeader';

export function ClaimTrackerScreen({ claimId }: { claimId: string }) {
  const router = useRouter();
  const { businessId } = useIncentiveWorkspace();
  
  const claims = getIncentiveClaims(businessId);
  const claim = claims.find(c => c.id === claimId);

  // If we couldn't find the claim in our data store, we could notFound() it.
  // We will assume the page.tsx wrapper has already done `notFound()` check.
  if (!claim) return null;

  const [activeTab, setActiveTab] = useState<'details' | 'docs' | 'timeline'>('details');

  const handleBack = () => router.push(ENTREPRENEUR_ROUTES.incentiveClaims(businessId));
  const handleGoToDocCentre = () => router.push(ENTREPRENEUR_ROUTES.documents(businessId));

  const timeline = [
    { stage: 'Discovered', done: true, date: '10 Aug 2026' },
    { stage: 'Eligibility Confirmed', done: true, date: '22 Sep 2026' },
    { stage: 'Preparing Claim', done: false, active: true, date: 'In Progress' },
    { stage: 'Submitted', done: false },
    { stage: 'Under Review', done: false },
    { stage: 'Query Raised', done: false },
    { stage: 'Approved', done: false },
    { stage: 'Benefit Received', done: false },
  ];

  return (
    <main id="main-content" className="flex-1 bg-[#F9FAF2]" tabIndex={-1}>
      <IncentiveWorkspaceHeader
        businessId={businessId}
        title="Claim Tracker"
        breadcrumb={['Home', businessId, 'Incentives', 'Claims', claim.id]}
        breadcrumbHref={ENTREPRENEUR_ROUTES.business(businessId)}
      />

      <div className="max-w-[900px] mx-auto px-6 py-5 space-y-4">
        {/* Claim header */}
        <div className="bg-white border border-[#e3ebe1] px-5 py-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm font-bold text-[#2B2B2B]">{claim.schemeName}</p>
              <p className="text-[11px] text-[#555C56] mt-0.5 font-mono">{claim.id}</p>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <ClaimStatusBadge status={claim.status} />
                <span className="text-xs text-[#555C56]">Last updated {claim.updated}</span>
                <span className="text-[11px] font-semibold text-[#D4A017]">Next: {claim.nextAction}</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-[#555C56] uppercase tracking-wider mb-0.5">Estimated Amount</p>
              <p className="text-xl font-bold text-[#355E3B]">{claim.amount}</p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#F9FAF2] grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-[10px] text-[#555C56] uppercase tracking-wider mb-0.5">Scheme</p>
              <p className="text-xs font-semibold text-[#2B2B2B]">{claim.schemeName}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#555C56] uppercase tracking-wider mb-0.5">Claim Period</p>
              <p className="text-xs font-semibold text-[#2B2B2B]">{claim.period ?? 'Not recorded'}</p>
            </div>
            {claim.applicationReference && <div>
              <p className="text-[10px] text-[#555C56] uppercase tracking-wider mb-0.5">{claim.applicationReference.label}</p>
              <p className="text-xs font-semibold text-[#2B2B2B]">{claim.applicationReference.identifier}</p>
              {claim.applicationReference.status && <p className="text-[10px] text-[#555C56]">{claim.applicationReference.status}</p>}
            </div>}
          </div>
        </div>

        {claim.correctionReason && <div className="bg-[#fff7ed] border border-[#fdba74] px-5 py-4">
          <p className="text-xs font-bold text-[#9a3412] uppercase tracking-wider">Correction Required</p>
          <p className="text-xs text-[#7c2d12] mt-2">{claim.correctionReason}</p>
          <p className="text-xs font-semibold text-[#9a3412] mt-2">Next action: {claim.nextAction}</p>
          {claim.correctionDueDate && <p className="text-[11px] text-[#9a3412] mt-1">Due: {claim.correctionDueDate}</p>}
        </div>}

        {/* Timeline */}
        <div className="bg-white border border-[#e3ebe1] px-5 py-4">
          <p className="text-xs font-bold text-[#355E3B] uppercase tracking-wider mb-4">Claim Timeline</p>
          <div className="flex items-start gap-0 overflow-x-auto pb-2">
            {timeline.map((t, i) => (
              <div key={t.stage} className="flex items-start shrink-0">
                <div className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${t.done ? 'bg-[#16a34a] border-[#16a34a] text-white' : (t as any).active ? 'bg-[#6DAE7C] border-[#6DAE7C] text-white' : 'bg-white border-[#d6dfd5] text-[#8c9f8a]'}`}>
                    {t.done ? '✓' : i + 1}
                  </div>
                  <p className={`text-[9px] font-semibold mt-1.5 text-center leading-tight max-w-[70px] ${t.done ? 'text-[#166534]' : (t as any).active ? 'text-[#6DAE7C]' : 'text-[#8c9f8a]'}`}>{t.stage}</p>
                  {t.date && <p className="text-[9px] text-[#8c9f8a] mt-0.5">{t.date}</p>}
                </div>
                {i < timeline.length - 1 && (
                  <div className={`h-0.5 w-8 mt-3 shrink-0 ${t.done ? 'bg-[#16a34a]' : 'bg-[#e3ebe1]'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {claim.previousPeriods?.length ? <div className="bg-white border border-[#e3ebe1]">
          <div className="px-5 py-2.5 bg-[#F9FAF2] border-b border-[#e3ebe1]">
            <p className="text-xs font-bold text-[#355E3B] uppercase tracking-wider">Previous Claim Periods</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead><tr className="border-b border-[#F9FAF2]">
                {['Claim Period', 'Status', 'Submitted', 'Amount'].map(label => <th key={label} className="text-left px-4 py-2 text-[10px] font-semibold text-[#8c9f8a] uppercase tracking-wider">{label}</th>)}
              </tr></thead>
              <tbody className="divide-y divide-[#F9FAF2]">
                {claim.previousPeriods.slice(0, 3).map(period => <tr key={`${period.period}-${period.submittedDate}`}>
                  <td className="px-4 py-3 font-semibold text-[#2B2B2B]">{period.period}</td>
                  <td className="px-4 py-3 text-[#4A4A4A]">{period.status}</td>
                  <td className="px-4 py-3 text-[#555C56]">{period.submittedDate}</td>
                  <td className="px-4 py-3 font-semibold text-[#355E3B]">{period.amount ?? '—'}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </div> : null}

        {/* Tabs */}
        <div className="bg-white border border-[#e3ebe1]">
          <div className="flex border-b border-[#e3ebe1]">
            {(['details', 'docs', 'timeline'] as const).map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`px-4 py-2.5 text-xs font-semibold capitalize border-b-2 transition-colors ${activeTab === t ? 'border-[#6DAE7C] text-[#355E3B]' : 'border-transparent text-[#555C56] hover:text-[#355E3B]'}`}
              >
                {t === 'docs' ? 'Documents' : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <div className="px-5 py-4 text-sm text-[#555C56]">
            {activeTab === 'details' && (
              <div className="space-y-3">
                <div><p className="text-[10px] font-semibold text-[#8c9f8a] uppercase tracking-wider mb-1">Authority</p><p className="text-xs text-[#2B2B2B]">Government of Maharashtra — Directorate of Industries</p></div>
                <div><p className="text-[10px] font-semibold text-[#8c9f8a] uppercase tracking-wider mb-1">Policy</p><p className="text-xs text-[#2B2B2B]">Package Scheme of Incentives 2019 (PSI 2019) — v3.1</p></div>
                <div><p className="text-[10px] font-semibold text-[#8c9f8a] uppercase tracking-wider mb-1">Next Action</p><p className="text-xs text-[#D4A017] font-semibold">{claim.nextAction}</p></div>
              </div>
            )}
            {activeTab === 'docs' && (
              <div className="space-y-2">
                {['MIDC Allotment Letter — Uploaded', 'Project Report — Uploaded', 'PAN Certificate — Verified', 'Machinery Invoice — Missing'].map(d => (
                  <div key={d} className="flex items-center gap-2">
                    <span className={d.includes('Missing') ? 'text-[#ef4444]' : 'text-[#16a34a]'}>{d.includes('Missing') ? '○' : '✓'}</span>
                    <p className="text-xs text-[#4A4A4A]">{d}</p>
                  </div>
                ))}
                <button onClick={handleGoToDocCentre} className="mt-2 text-xs text-[#6DAE7C] hover:underline font-medium">Go to Document Centre →</button>
              </div>
            )}
            {activeTab === 'timeline' && (
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[5px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#e3ebe1] before:to-transparent">
                {[
                  { d: '22 Sep 2026', title: 'Eligibility Confirmed', desc: 'System automatically verified eligibility based on business DNA.' },
                  { d: '10 Aug 2026', title: 'Discovered', desc: 'Scheme identified during portfolio scan.' },
                ].map(item => (
                  <div key={item.title} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-3 h-3 rounded-full border-2 border-white bg-[#355E3B] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow" />
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded bg-[#F9FAF2] border border-[#e3ebe1] shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-bold text-xs text-[#355E3B]">{item.title}</p>
                        <time className="text-[10px] font-medium text-[#6DAE7C]">{item.d}</time>
                      </div>
                      <p className="text-[11px] text-[#555C56] leading-tight">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between pt-2">
          <button onClick={handleBack} className="text-xs border border-[#d6dfd5] text-[#4A4A4A] px-4 py-2 hover:bg-[#F9FAF2] transition-colors">Back</button>
        </div>
      </div>
    </main>
  );
}
