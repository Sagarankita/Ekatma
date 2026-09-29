"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import { useIncentiveWorkspace } from '../state';
import { IncentiveWorkspaceHeader } from './IncentiveWorkspaceHeader';
import { getCurrentFilingWindow } from '../data';

export function ClaimReadinessScreen() {
  const router = useRouter();
  const { businessId } = useIncentiveWorkspace();
  const filingWindow = getCurrentFilingWindow(businessId);

  const handleBack = () => router.push(ENTREPRENEUR_ROUTES.incentives(businessId));
  const handleGoToTracker = () => router.push(ENTREPRENEUR_ROUTES.incentiveClaimList(businessId));
  const handleGoToDocCentre = () => router.push(ENTREPRENEUR_ROUTES.documents(businessId));

  const evidence = [
    { label: 'Business Registration (Certificate of Incorporation / MSME)', status: 'available', source: 'Document Repository' },
    { label: 'PAN / Tax Registration', status: 'verified', source: 'System Verified' },
    { label: 'Land Document / Lease Agreement (MIDC)', status: 'verified', source: 'Document Repository — Verified' },
    { label: 'MIDC Allotment Letter', status: 'available', source: 'Document Repository' },
    { label: 'Project Report / Investment Details', status: 'available', source: 'Document Repository' },
    { label: 'Bank Sanction Letter (Term Loan)', status: 'missing', source: 'Not uploaded' },
    { label: 'Machinery Purchase Invoices', status: 'missing', source: 'Not uploaded' },
    { label: 'Commercial Production Certificate', status: 'pending', source: 'Not yet available — unit not yet operational' },
    { label: 'Electricity Connection Certificate', status: 'pending', source: 'Pending MSEDCL connection' },
  ];

  const available = evidence.filter(e => e.status === 'available' || e.status === 'verified').length;
  const total = evidence.length;

  return (
    <main id="main-content" className="flex-1 bg-[#F9FAF2]" tabIndex={-1}>
      <IncentiveWorkspaceHeader
        businessId={businessId}
        title="Claim Readiness"
        subtitle="Review the evidence required to prepare your incentive claim."
        breadcrumb={['Home', businessId, 'Incentives', 'Claim Readiness']}
        breadcrumbHref={ENTREPRENEUR_ROUTES.business(businessId)}
      />

      <div className="max-w-[800px] mx-auto px-6 py-5 space-y-4">
        {/* Summary */}
        <div className="bg-white border border-[#e3ebe1] px-5 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-[10px] text-[#555C56] uppercase tracking-wider mb-1">Claim Readiness — PSI 2019 Capital Subsidy</p>
              <p className="text-2xl font-bold text-[#355E3B]">{available} of {total} evidence categories available</p>
              <p className="text-xs text-[#555C56] mt-1">{total - available} categories missing or pending</p>
            </div>
            <div className="flex gap-2">
              <button onClick={handleGoToDocCentre} className="text-xs border border-[#6DAE7C] text-[#6DAE7C] px-3 py-2 hover:bg-[#edf5ef] transition-colors font-medium">Upload Missing Evidence</button>
              <button onClick={handleGoToTracker} className="bg-[#355E3B] text-white text-xs font-semibold px-4 py-2 hover:bg-[#27472c] transition-colors">Prepare Claim</button>
            </div>
          </div>
        </div>

        {filingWindow && <div className="bg-white border border-[#e3ebe1] px-5 py-4">
          <p className="text-[10px] font-bold text-[#555C56] uppercase tracking-wider mb-1">Current Filing Window</p>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm font-bold text-[#355E3B]">{filingWindow.period}</p>
              <p className="text-xs text-[#555C56] mt-1">{filingWindow.filingWindow}</p>
              {filingWindow.deadline && <p className="text-xs text-[#555C56]">Deadline: {filingWindow.deadline}</p>}
            </div>
            <p className="text-xs font-semibold text-[#D4A017]">{filingWindow.readiness}</p>
          </div>
        </div>}

        {/* Evidence list */}
        <div className="bg-white border border-[#e3ebe1]">
          <div className="px-5 py-2.5 bg-[#F9FAF2] border-b border-[#e3ebe1]">
            <p className="text-xs font-bold text-[#355E3B] uppercase tracking-wider">Required Evidence</p>
          </div>
          <div className="divide-y divide-[#F9FAF2]">
            {evidence.map(e => {
              const cfg = e.status === 'verified'
                ? { icon: '✓', cls: 'text-[#16a34a]', badge: 'bg-[#f0fdf4] text-[#166534] border-[#86efac]', badgeLabel: 'Verified' }
                : e.status === 'available'
                  ? { icon: '✓', cls: 'text-[#16a34a]', badge: 'bg-[#F9FAF2] text-[#4A4A4A] border-[#d6dfd5]', badgeLabel: 'Available' }
                  : e.status === 'pending'
                    ? { icon: '○', cls: 'text-[#D4A017]', badge: 'bg-[#fdf8e6] text-[#7a5807] border-[#fae69e]', badgeLabel: 'Pending' }
                    : { icon: '○', cls: 'text-[#8c9f8a]', badge: 'bg-[#fee2e2] text-[#b91c1c] border-[#fca5a5]', badgeLabel: 'Missing' };
              return (
                <div key={e.label} className="px-5 py-3 flex items-start gap-3">
                  <span className={`font-bold shrink-0 mt-0.5 ${cfg.cls}`}>{cfg.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-[#2B2B2B] leading-tight">{e.label}</p>
                    <p className="text-[10px] text-[#555C56] mt-0.5">{e.source}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 border shrink-0 ${cfg.badge}`}>{cfg.badgeLabel}</span>
                </div>
              );
            })}
          </div>
        </div>

        <button onClick={handleBack} className="text-xs border border-[#d6dfd5] text-[#4A4A4A] px-4 py-2 hover:bg-[#F9FAF2] transition-colors">Back</button>
      </div>
    </main>
  );
}
