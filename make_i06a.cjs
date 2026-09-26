const fs = require('fs');
const path = require('path');
const componentsDir = path.join('src', 'features', 'entrepreneur', 'incentives', 'workspace', 'components');

const code = `"use client";
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
  // We will assume the page.tsx wrapper has already done \`notFound()\` check.
  if (!claim) return null;

  const [activeTab, setActiveTab] = useState<'details' | 'docs' | 'timeline'>('details');

  const handleBack = () => router.push(ENTREPRENEUR_ROUTES.incentiveClaims(businessId));
  const handleGoToDocCentre = () => router.push(ENTREPRENEUR_ROUTES.documentRepository(businessId));

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
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <IncentiveWorkspaceHeader
        businessId={businessId}
        title="Claim Tracker"
        breadcrumb={['Home', businessId, 'Incentives', 'Claims', claim.id]}
        breadcrumbHref={ENTREPRENEUR_ROUTES.business(businessId)}
      />

      <div className="max-w-[900px] mx-auto px-6 py-5 space-y-4">
        {/* Claim header */}
        <div className="bg-white border border-[#e2e8f0] px-5 py-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm font-bold text-[#1a2533]">{claim.schemeName}</p>
              <p className="text-[11px] text-[#6b7a8d] mt-0.5 font-mono">{claim.id}</p>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <ClaimStatusBadge status={claim.status} />
                <span className="text-xs text-[#6b7a8d]">Last updated {claim.updated}</span>
                <span className="text-[11px] font-semibold text-[#d97706]">Next: {claim.nextAction}</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-[#6b7a8d] uppercase tracking-wider mb-0.5">Estimated Amount</p>
              <p className="text-xl font-bold text-[#1a3a5c]">{claim.amount}</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white border border-[#e2e8f0] px-5 py-4">
          <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider mb-4">Claim Timeline</p>
          <div className="flex items-start gap-0 overflow-x-auto pb-2">
            {timeline.map((t, i) => (
              <div key={t.stage} className="flex items-start shrink-0">
                <div className="flex flex-col items-center">
                  <div className={\`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold \${t.done ? 'bg-[#16a34a] border-[#16a34a] text-white' : (t as any).active ? 'bg-[#1a56db] border-[#1a56db] text-white' : 'bg-white border-[#d1d9e0] text-[#9aa5b4]'}\`}>
                    {t.done ? '✓' : i + 1}
                  </div>
                  <p className={\`text-[9px] font-semibold mt-1.5 text-center leading-tight max-w-[70px] \${t.done ? 'text-[#166534]' : (t as any).active ? 'text-[#1a56db]' : 'text-[#9aa5b4]'}\`}>{t.stage}</p>
                  {t.date && <p className="text-[9px] text-[#9aa5b4] mt-0.5">{t.date}</p>}
                </div>
                {i < timeline.length - 1 && (
                  <div className={\`h-0.5 w-8 mt-3 shrink-0 \${t.done ? 'bg-[#16a34a]' : 'bg-[#e2e8f0]'}\`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-[#e2e8f0]">
          <div className="flex border-b border-[#e2e8f0]">
            {(['details', 'docs', 'timeline'] as const).map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={\`px-4 py-2.5 text-xs font-semibold capitalize border-b-2 transition-colors \${activeTab === t ? 'border-[#1a56db] text-[#1a3a5c]' : 'border-transparent text-[#6b7a8d] hover:text-[#1a3a5c]'}\`}
              >
                {t === 'docs' ? 'Documents' : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <div className="px-5 py-4 text-sm text-[#6b7a8d]">
            {activeTab === 'details' && (
              <div className="space-y-3">
                <div><p className="text-[10px] font-semibold text-[#9aa5b4] uppercase tracking-wider mb-1">Authority</p><p className="text-xs text-[#1a2533]">Government of Maharashtra — Directorate of Industries</p></div>
                <div><p className="text-[10px] font-semibold text-[#9aa5b4] uppercase tracking-wider mb-1">Policy</p><p className="text-xs text-[#1a2533]">Package Scheme of Incentives 2019 (PSI 2019) — v3.1</p></div>
                <div><p className="text-[10px] font-semibold text-[#9aa5b4] uppercase tracking-wider mb-1">Next Action</p><p className="text-xs text-[#d97706] font-semibold">{claim.nextAction}</p></div>
              </div>
            )}
            {activeTab === 'docs' && (
              <div className="space-y-2">
                {['MIDC Allotment Letter — Uploaded', 'Project Report — Uploaded', 'PAN Certificate — Verified', 'Machinery Invoice — Missing'].map(d => (
                  <div key={d} className="flex items-center gap-2">
                    <span className={d.includes('Missing') ? 'text-[#ef4444]' : 'text-[#16a34a]'}>{d.includes('Missing') ? '○' : '✓'}</span>
                    <p className="text-xs text-[#374151]">{d}</p>
                  </div>
                ))}
                <button onClick={handleGoToDocCentre} className="mt-2 text-xs text-[#1a56db] hover:underline font-medium">Go to Document Centre →</button>
              </div>
            )}
            {activeTab === 'timeline' && (
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[5px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#e2e8f0] before:to-transparent">
                {[
                  { d: '22 Sep 2026', title: 'Eligibility Confirmed', desc: 'System automatically verified eligibility based on business DNA.' },
                  { d: '10 Aug 2026', title: 'Discovered', desc: 'Scheme identified during portfolio scan.' },
                ].map(item => (
                  <div key={item.title} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-3 h-3 rounded-full border-2 border-white bg-[#1a3a5c] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow" />
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded bg-[#f8f9fb] border border-[#e2e8f0] shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-bold text-xs text-[#1a3a5c]">{item.title}</p>
                        <time className="text-[10px] font-medium text-[#1a56db]">{item.d}</time>
                      </div>
                      <p className="text-[11px] text-[#6b7a8d] leading-tight">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between pt-2">
          <button onClick={handleBack} className="text-xs border border-[#d1d9e0] text-[#475569] px-4 py-2 hover:bg-[#f1f5f9] transition-colors">Back</button>
        </div>
      </div>
    </main>
  );
}
`;
fs.writeFileSync(path.join(componentsDir, 'ClaimTrackerScreen.tsx'), code);
console.log('done');
