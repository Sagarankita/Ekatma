"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import { useIncentiveWorkspace } from '../state';
import { getIncentiveDetailSchemes, getIncentiveClaims, getIncentivePolicyUpdates } from '../data';
import { IncentiveWorkspaceHeader, ClaimStatusBadge } from './IncentiveWorkspaceHeader';
import type { IncentiveLifecycleCategory } from '../types';

export function IncentiveCentreScreen() {
  const router = useRouter();
  const { businessId } = useIncentiveWorkspace();
  
  const schemes = getIncentiveDetailSchemes(businessId);
  const claims = getIncentiveClaims(businessId);
  const policyUpdates = getIncentivePolicyUpdates(businessId);

  const [activeTab, setActiveTab] = useState<'all' | IncentiveLifecycleCategory>('all');
  const [showGuide, setShowGuide] = useState(false);

  // Groupings based on explicit 5 requested lifecycle categories
  const potentiallyRelevant = schemes.filter(s => s.lifecycleStage === 'Potentially relevant');
  const needsVerification = schemes.filter(s => s.lifecycleStage === 'Needs verification');
  const applicationInProgress = schemes.filter(s => s.lifecycleStage === 'Application in progress');
  const approved = schemes.filter(s => s.lifecycleStage === 'Approved');
  const claimDisbursement = schemes.filter(s => s.lifecycleStage === 'Claim / Disbursement');

  const visibleSchemes = activeTab === 'all'
    ? schemes
    : schemes.filter(s => s.lifecycleStage === activeTab);

  const tabs: Array<{ id: 'all' | IncentiveLifecycleCategory; label: string; count: number; sub: string }> = [
    { id: 'all', label: 'All Opportunities', count: schemes.length, sub: 'All identified schemes' },
    { id: 'Potentially relevant', label: 'Potentially Relevant', count: potentiallyRelevant.length, sub: 'Sector & zone match' },
    { id: 'Needs verification', label: 'Needs Verification', count: needsVerification.length, sub: 'Pending proof or data' },
    { id: 'Application in progress', label: 'Application in Progress', count: applicationInProgress.length, sub: 'Under dept scrutiny' },
    { id: 'Approved', label: 'Approved (EC Issued)', count: approved.length, sub: 'Eligibility Certificate active' },
    { id: 'Claim / Disbursement', label: 'Claim / Disbursement', count: claims.length, sub: 'Active & settled claims' },
  ];

  const handleGoToCalculator = () => router.push(ENTREPRENEUR_ROUTES.incentiveCalculator(businessId));
  const handleGoToROI = () => router.push(ENTREPRENEUR_ROUTES.incentiveRoi(businessId));
  const handleGoToScenarios = () => router.push(ENTREPRENEUR_ROUTES.incentiveScenarios(businessId));
  const handleGoToReadiness = () => router.push(ENTREPRENEUR_ROUTES.incentiveClaimReadiness(businessId));
  const handleGoToDetail = (id: string) => router.push(ENTREPRENEUR_ROUTES.incentivePortfolioDetail(businessId, id));
  const handleGoToTracker = (id: string) => router.push(ENTREPRENEUR_ROUTES.incentiveClaim(businessId, id));
  const handleGoPolicyUpdates = () => router.push(ENTREPRENEUR_ROUTES.incentivePolicyUpdates(businessId));

  return (
    <main id="main-content" className="flex-1 bg-[#F9FAF2]" tabIndex={-1}>
      <IncentiveWorkspaceHeader
        businessId={businessId}
        title="Incentives"
        subtitle="Discover relevant incentives and verify eligibility."
        breadcrumb={['Home', businessId, 'Incentives']}
        breadcrumbHref={ENTREPRENEUR_ROUTES.business(businessId)}
      />

      <div className="max-w-[1320px] mx-auto px-6 py-5 space-y-5">

        {/* ── 1. Executive Clarity Cockpit (Directly Answers the 5 Questions) ── */}
        <div className="bg-white border border-[#d6dfd5] shadow-sm">
          <div className="bg-[#355E3B] text-white px-6 py-4 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-lg font-bold">Potential benefits</h2>
              <p className="mt-0.5 text-xs text-[#c8d4c7]">Indicative range: <strong className="font-mono text-sm text-white">₹1.33 Cr – ₹2.31 Cr</strong> across 4 schemes</p>
            </div>
            <div className="flex gap-2">
              <button onClick={handleGoToCalculator} className="bg-white text-[#355E3B] text-xs font-bold px-3.5 py-2 hover:bg-[#F9FAF2] transition-colors">
                Calculate / Refresh
              </button>
              <button onClick={handleGoToReadiness} className="border border-[#a1cba9] text-[#a1cba9] text-xs font-medium px-3.5 py-2 hover:bg-[#234b75] transition-colors">
                Check Readiness
              </button>
            </div>
          </div>

          <div className="p-5 grid grid-cols-1 md:grid-cols-5 gap-4 divide-y md:divide-y-0 md:divide-x divide-[#e3ebe1]">

            {/* Q1 */}
            <div className="pt-2 md:pt-0">
              <p className="mb-1 text-xs font-bold text-[#6DAE7C]">Potential matches</p>
              <p className="text-xs font-bold text-[#1e293b]">7 Targeted Benefits</p>
              <ul className="text-[11px] text-[#4A4A4A] mt-1.5 space-y-1">
                <li>• Capital Subsidy (25–30%)</li>
                <li>• Electricity Duty Waiver (7 yrs)</li>
                <li>• Stamp Duty 100% Exemption</li>
                <li>• Technology Grant (15%)</li>
              </ul>
            </div>

            {/* Q2 */}
            <div className="pt-3 md:pt-0 md:pl-4">
              <p className="mb-1 text-xs font-bold text-[#166534]">Why this applies</p>
              <p className="text-xs font-bold text-[#1e293b]">Business DNA Alignment</p>
              <ul className="text-[11px] text-[#4A4A4A] mt-1.5 space-y-1">
                <li>• Sector: Pharmaceuticals</li>
                <li>• Location: Chakan Phase II (Zone B/D)</li>
                <li>• Status: Registered MSME</li>
                <li>• Capex: ₹10.0 Cr Fixed Assets</li>
              </ul>
            </div>

            {/* Q3 */}
            <div className="pt-3 md:pt-0 md:pl-4">
              <p className="mb-1 text-xs font-bold text-[#7a5807]">Needs verification</p>
              <p className="text-xs font-bold text-[#7a5807]">2 Pending Validations</p>
              <ul className="text-[11px] text-[#634805] mt-1.5 space-y-1">
                <li>• Commercial Production Date</li>
                <li>• CA Machinery Statement</li>
                <li>• Connected Load (kVA)</li>
              </ul>
            </div>

            {/* Q4 */}
            <div className="pt-3 md:pt-0 md:pl-4">
              <p className="mb-1 text-xs font-bold text-[#4338ca]">Before applying</p>
              <p className="text-xs font-bold text-[#1e293b]">Eligibility Certificate</p>
              <p className="text-[11px] text-[#4A4A4A] mt-1.5 leading-snug">
                Apply for an <strong>Eligibility Certificate (EC)</strong> before commercial production commences using your CA statement & MIDC allotment.
              </p>
            </div>

            {/* Q5 */}
            <div className="pt-3 md:pt-0 md:pl-4">
              <p className="mb-1 text-xs font-bold text-[#555C56]">After application</p>
              <p className="text-xs font-bold text-[#1e293b]">5-Step Progression</p>
              <div className="text-[10px] text-[#4A4A4A] mt-1.5 space-y-0.5">
                <span className="block font-medium">1. Scrutiny by Dept</span>
                <span className="block font-medium">2. EC Certificate Issued</span>
                <span className="block font-medium">3. Half-Yearly Claims</span>
                <span className="block font-medium">4. Sanction & Disburse</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── 2. Educational Primer & Maximizer (HCI: Friendly, Clean, Actionable) ── */}
        <div className="bg-[#edf5ef] border border-[#c5e2cb] p-4 text-xs text-[#539160] flex flex-col md:flex-row items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold text-[#539160]">How incentive schemes work</span>
              <button onClick={() => setShowGuide(g => !g)} className="text-[10px] text-[#539160] underline ml-2">
                {showGuide ? 'Hide details' : 'Show guide'}
              </button>
            </div>
            {showGuide && (
              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-[#c5e2cb] pt-2.5 text-[11px]">
                <div>
                  <p className="font-bold text-[#539160]">1. Apply Before Production</p>
                  <p className="text-[#1e3a8a] mt-0.5">Eligibility Certificates must be applied for prior to commercial production. Post-production applications forfeit capital subsidy benefits.</p>
                </div>
                <div>
                  <p className="font-bold text-[#539160]">2. Stack Concurrent Benefits</p>
                  <p className="text-[#1e3a8a] mt-0.5">A single scheme like PSI 2019 allows you to claim Capital Subsidy, Electricity Duty Exemption, and Interest Subsidy simultaneously.</p>
                </div>
                <div>
                  <p className="font-bold text-[#539160]">3. Strict 60-Day Windows</p>
                  <p className="text-[#1e3a8a] mt-0.5">Submit half-yearly claim returns within 60 days of period close to prevent claims from expiring or incurring audit queries.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── 3. Non-Finality Disclaimer ── */}
        <details className="border border-[#fae69e] bg-[#fdf8e6] px-4 py-2.5 text-xs text-[#7a5807]">
          <summary className="cursor-pointer font-semibold">Eligibility note</summary>
          <p className="mt-2">Matches use current Business DNA. The administering department confirms final eligibility and sanctioned disbursement after scrutiny.</p>
        </details>

        {/* ── 4. Main Body: 5 Lifecycle Separations + Sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
          <div className="space-y-4 min-w-0">

            {/* Lifecycle Tabs */}
            <div className="bg-white border border-[#e3ebe1]">
              <div className="flex overflow-x-auto border-b border-[#e3ebe1]">
                {tabs.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`px-4 py-3 text-xs font-semibold whitespace-nowrap flex flex-col items-start border-b-2 transition-colors ${
                      activeTab === t.id
                        ? 'border-[#6DAE7C] text-[#355E3B] bg-[#f8fbff]'
                        : 'border-transparent text-[#555C56] hover:text-[#355E3B] hover:bg-[#F9FAF2]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{t.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeTab === t.id ? 'bg-[#6DAE7C] text-white' : 'bg-[#e3ebe1] text-[#555C56]'}`}>
                        {t.count}
                      </span>
                    </div>
                    <span className="text-[9px] font-normal text-[#9ab098] mt-0.5">{t.sub}</span>
                  </button>
                ))}
              </div>

              {/* Benefit Cards (Showing the 7 Required Fields) */}
              <div className="divide-y divide-[#e3ebe1] p-4 space-y-4">
                {visibleSchemes.length === 0 ? (
                  <div className="px-5 py-8 text-center text-sm text-[#555C56]">
                    No schemes match this category for the active business profile.
                  </div>
                ) : (
                  visibleSchemes.map(scheme => {
                    const isApproved = scheme.lifecycleStage === 'Approved';
                    const isNeedsVerif = scheme.lifecycleStage === 'Needs verification';
                    const verifiedCriteria = scheme.criteria.filter(c => c.met);
                    const unverifiedCriteria = scheme.criteria.filter(c => !c.met);

                    return (
                      <div key={scheme.id} className="bg-white border border-[#e3ebe1] hover:border-[#c8d4c7] p-5 space-y-3 transition-shadow shadow-sm">

                        {/* 1. BENEFIT (Name, Quantum, Type, Lifecycle Badge) */}
                        <div className="flex items-start justify-between gap-4 flex-wrap pb-2 border-b border-[#F9FAF2]">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h3 className="text-base font-bold text-[#355E3B]">{scheme.name}</h3>
                              {isApproved ? (
                                <span className="text-[10px] font-bold px-2 py-0.5 border border-[#86efac] bg-[#dcfce7] text-[#166534]">
                                  Approved (EC Granted: EC-PSI-2026-01248)
                                </span>
                              ) : isNeedsVerif ? (
                                <span className="text-[10px] font-bold px-2 py-0.5 border border-[#fae69e] bg-[#fdf8e6] text-[#7a5807]">
                                  Needs Verification
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold px-2 py-0.5 border border-[#c5e2cb] bg-[#edf5ef] text-[#539160]">
                                  Preliminary Match — Authority Verification Required
                                </span>
                              )}
                              <span className="text-[10px] font-semibold px-2 py-0.5 bg-[#F9FAF2] text-[#4A4A4A] uppercase border border-[#e3ebe1]">
                                {scheme.benefitType}
                              </span>
                            </div>
                            <p className="text-xs text-[#555C56]">
                              Administered by: <strong>{scheme.authority}</strong> · Policy: {scheme.policyName}
                            </p>
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] font-semibold text-[#555C56] uppercase tracking-wider block">Estimated Quantum</span>
                            <span className="text-base font-bold text-[#166534]">
                              ₹{scheme.estimatedMin}–₹{scheme.estimatedMax} {scheme.unit === 'lakh' ? 'Lakh' : 'Cr'}
                            </span>
                            <span className="text-[10px] text-[#555C56] block">{scheme.period}</span>
                          </div>
                        </div>

                        <details className="border border-[#e3ebe1] bg-[#F9FAF2] text-xs">
                          <summary className="cursor-pointer px-3.5 py-2 font-semibold text-[#6DAE7C]">Why this applies and required evidence</summary>
                          <div className="space-y-3 border-t border-[#e3ebe1] p-3">
                            <p className="text-[#3A3E39]">Matched on Pharmaceuticals manufacturing in Chakan Phase II, MSME category, and eligible fixed capital investment.</p>
                        <div className="grid grid-cols-1 gap-3 text-xs md:grid-cols-2">

                          {/* 4. Verified conditions */}
                          <div className="border border-[#dcfce7] bg-[#f0fdf4] p-3">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#166534] mb-1.5 flex items-center gap-1">
                              <span>✓</span> Verified Conditions ({verifiedCriteria.length})
                            </p>
                            <ul className="space-y-1 text-[11px] text-[#166534]">
                              {verifiedCriteria.map(c => (
                                <li key={c.label} className="flex items-start gap-1.5">
                                  <span className="font-bold">•</span>
                                  <span>{c.label}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* 5. Needs verification */}
                          <div className="border border-[#fdf8e6] bg-[#fdf8e6] p-3">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#7a5807] mb-1.5 flex items-center gap-1">
                              <span>⚠</span> Needs Verification ({unverifiedCriteria.length})
                            </p>
                            {unverifiedCriteria.length === 0 ? (
                              <p className="text-[11px] text-[#166534]">All baseline conditions currently confirmed.</p>
                            ) : (
                              <ul className="space-y-1 text-[11px] text-[#7a5807]">
                                {unverifiedCriteria.map(c => (
                                  <li key={c.label} className="flex items-start gap-1.5">
                                    <span className="font-bold">•</span>
                                    <span>{c.label}{c.note ? ` — ${c.note}` : ''}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>

                        </div>

                        {/* 6. DOCUMENTS REQUIRED */}
                        <div className="flex flex-wrap items-center gap-2 border-t border-[#e3ebe1] pt-3 text-xs">
                          <span className="text-xs font-semibold text-[#555C56]">Required evidence:</span>
                          {(scheme.requiredEvidence && scheme.requiredEvidence.length > 0
                            ? scheme.requiredEvidence
                            : ['CA-certified Fixed Capital Investment Statement', 'Commencement of Production Certificate', 'MIDC Allotment Letter']
                          ).map((doc, idx) => (
                            <span key={idx} className="bg-white border border-[#d6dfd5] text-[#3A3E39] px-2 py-0.5 text-[10px]">
                              {doc}
                            </span>
                          ))}
                        </div>
                          </div>
                        </details>

                        {/* 7. APPLICATION / CLAIM ACTION */}
                        <div className="pt-2 flex items-center justify-between flex-wrap gap-2 border-t border-[#F9FAF2]">
                          <div className="text-[11px] text-[#555C56]">
                            {isApproved ? (
                              <span>Eligibility confirmed. Submit periodic returns or claim disbursements as per schedule.</span>
                            ) : isNeedsVerif ? (
                              <span>Provide missing parameters to establish formal subsidy eligibility baseline.</span>
                            ) : (
                              <span>Proceed with formal application to receive Eligibility Certificate (EC).</span>
                            )}
                          </div>

                          <div className="flex gap-2">
                            {isApproved ? (
                              <button
                                onClick={() => router.push(ENTREPRENEUR_ROUTES.incentiveClaimList(businessId))}
                                className="bg-[#355E3B] text-white text-xs font-semibold px-4 py-2 hover:bg-[#27472c] transition-colors"
                              >
                                View Claims & Returns →
                              </button>
                            ) : isNeedsVerif ? (
                              <button
                                onClick={handleGoToCalculator}
                                className="border border-[#6DAE7C] text-[#6DAE7C] text-xs font-semibold px-4 py-2 hover:bg-[#edf5ef] transition-colors"
                              >
                                Provide Missing Inputs →
                              </button>
                            ) : (
                              <button
                                onClick={() => handleGoToDetail(scheme.id)}
                                className="bg-[#355E3B] text-white text-xs font-semibold px-4 py-2 hover:bg-[#27472c] transition-colors"
                              >
                                View Scheme Details →
                              </button>
                            )}
                            {(isApproved || isNeedsVerif) && (
                              <button
                                onClick={() => handleGoToDetail(scheme.id)}
                                className="border border-[#d6dfd5] text-[#4A4A4A] text-xs font-medium px-3 py-2 hover:bg-[#F9FAF2] transition-colors"
                              >
                                Scheme Details
                              </button>
                            )}
                          </div>
                        </div>

                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Claims Section */}
            <div className="bg-white border border-[#e3ebe1]">
              <div className="px-5 py-3 bg-[#F9FAF2] border-b border-[#e3ebe1] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#355E3B] uppercase tracking-wider">Claims & Disbursements</p>
                  <p className="text-[10px] text-[#555C56]">Track half-yearly subsidy disbursements and exemption adjustments</p>
                </div>
                <button onClick={() => router.push(ENTREPRENEUR_ROUTES.incentiveClaimList(businessId))} className="text-xs text-[#6DAE7C] hover:underline font-medium">
                  All claims ({claims.length}) →
                </button>
              </div>

              {claims.length === 0 ? (
                <div className="px-5 py-6 text-center text-sm text-[#555C56]">No claims in progress.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-[#F9FAF2] bg-[#F9FAF2]">
                        {['Scheme', 'Claim ID', 'Amount', 'Status', 'Last Updated', 'Next Action', ''].map(h => (
                          <th key={h} className="text-left px-4 py-2 text-[10px] font-semibold text-[#8c9f8a] uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F9FAF2]">
                      {claims.map(c => (
                        <tr key={c.id} className="hover:bg-[#f8fbff] transition-colors">
                          <td className="px-4 py-3 font-semibold text-[#2B2B2B] max-w-[200px]"><span className="line-clamp-2">{c.schemeName}</span></td>
                          <td className="px-4 py-3 font-mono text-[#555C56]">{c.id}</td>
                          <td className="px-4 py-3 font-semibold text-[#355E3B]">{c.amount}</td>
                          <td className="px-4 py-3"><ClaimStatusBadge status={c.status} /></td>
                          <td className="px-4 py-3 text-[#555C56]">{c.updated}</td>
                          <td className="px-4 py-3 text-[#D4A017] font-medium">{c.nextAction}</td>
                          <td className="px-4 py-3">
                            <button onClick={() => handleGoToTracker(c.id)} className="text-[10px] text-[#6DAE7C] hover:underline font-medium">View Claim →</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Policy Updates */}
            <div className="bg-white border border-[#e3ebe1]">
              <div className="px-5 py-2.5 bg-[#F9FAF2] border-b border-[#e3ebe1] flex items-center justify-between">
                <p className="text-xs font-bold text-[#355E3B] uppercase tracking-wider flex items-center gap-2">
                  Incentive Policy Updates
                  <span className="text-[10px] bg-[#fee2e2] text-[#b91c1c] border border-[#fca5a5] px-1.5 py-0.5 font-bold">{policyUpdates.length} new</span>
                </p>
                <button onClick={handleGoPolicyUpdates} className="text-xs text-[#6DAE7C] hover:underline">All updates →</button>
              </div>
              <div className="divide-y divide-[#F9FAF2]">
                {policyUpdates.map(u => (
                  <div key={u.id} className="px-5 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 border uppercase tracking-wider ${u.type === 'new-scheme' ? 'bg-[#f0fdf4] text-[#166534] border-[#86efac]' : 'bg-[#ede9fe] text-[#3730a3] border-[#a5b4fc]'}`}>
                            {u.type === 'new-scheme' ? 'New Opportunity' : 'Amendment'}
                          </span>
                          {u.validated ? <span className="text-[9px] font-semibold text-[#166534]">✓ Validated</span> : <span className="text-[9px] font-semibold text-[#D4A017]">⚠ Draft / Under Validation</span>}
                        </div>
                        <p className="text-[11px] font-semibold text-[#2B2B2B] leading-tight">{u.title}</p>
                        <p className="text-[10px] text-[#555C56] mt-0.5">{u.summary}</p>
                        <p className="text-[10px] text-[#555C56] mt-1">Effective: {u.effectiveDate} · Detected: {u.detected}</p>
                      </div>
                      <button onClick={handleGoPolicyUpdates} className="text-xs border border-[#d6dfd5] text-[#4A4A4A] px-2.5 py-1 hover:bg-[#F9FAF2] transition-colors shrink-0">View Impact</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Quick Actions sidebar */}
          <div className="space-y-4">
            <div className="bg-white border border-[#e3ebe1]">
              <div className="px-4 py-2.5 bg-[#F9FAF2] border-b border-[#e3ebe1]">
                <p className="text-xs font-bold text-[#355E3B] uppercase tracking-wider">Incentive Actions</p>
              </div>
              <div className="divide-y divide-[#F9FAF2]">
                {[
                  { label: 'Calculate Incentives', sub: 'Refresh with latest inputs', onClick: handleGoToCalculator, icon: '⟳' },
                  { label: 'ROI & Scenario Planner', sub: 'Model financial impact', onClick: handleGoToROI, icon: '↗' },
                  { label: 'Compare Scenarios', sub: 'Side-by-side comparison', onClick: handleGoToScenarios, icon: '⇌' },
                  { label: 'Claim Readiness', sub: 'Check evidence coverage', onClick: handleGoToReadiness, icon: '✓' },
                  { label: 'Policy Updates', sub: `${policyUpdates.length} updates requiring review`, onClick: handleGoPolicyUpdates, icon: '!' },
                ].map(a => (
                  <button key={a.label} onClick={a.onClick} className="w-full text-left px-4 py-3 hover:bg-[#f8fbff] transition-colors group">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 bg-[#F9FAF2] border border-[#e3ebe1] flex items-center justify-center text-[#355E3B] font-bold text-xs shrink-0 group-hover:bg-[#edf5ef] group-hover:border-[#a1cba9]">{a.icon}</span>
                      <div>
                        <p className="text-[11px] font-semibold text-[#2B2B2B] group-hover:text-[#6DAE7C]">{a.label}</p>
                        <p className="text-[10px] text-[#555C56]">{a.sub}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Missing Verification Parameters */}
            <div className="bg-white border border-[#fae69e] border-l-4 border-l-[#D4A017]">
              <div className="px-4 py-2.5 bg-[#fdf8e6] border-b border-[#fae69e]">
                <p className="text-xs font-bold text-[#7a5807] uppercase tracking-wider">Unverified Items</p>
              </div>
              <div className="px-4 py-3">
                <p className="text-xs text-[#4A4A4A] mb-2">Complete these items to unlock full capital subsidy determination:</p>
                {['Commercial production date certification', 'CA-certified plant & machinery schedule', 'Connected electricity load benchmark (kVA)'].map((m, i) => (
                  <div key={m} className="flex items-start gap-2 mb-1.5">
                    <span className="text-[10px] font-bold text-[#D4A017] shrink-0 mt-0.5">{i + 1}.</span>
                    <p className="text-[11px] text-[#4A4A4A]">{m}</p>
                  </div>
                ))}
                <button onClick={handleGoToCalculator} className="mt-2 text-xs border border-[#D4A017] text-[#7a5807] px-3 py-1.5 hover:bg-[#fdf8e6] transition-colors font-medium w-full">
                  Complete Missing Information
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
