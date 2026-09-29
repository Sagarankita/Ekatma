'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';

const DNA_ATTRIBUTES = [
  { label: 'Company Identity', detail: 'CIN, PAN, Udyam Registration & Promoters' },
  { label: 'Sector & NIC Code', detail: 'Industrial classification & pollution category' },
  { label: 'Land & Location', detail: 'MIDC plot details, FAR, zoning & coordinates' },
  { label: 'Scale & Investment', detail: 'Capital outlay, plant & machinery investment' },
  { label: 'Utilities Requirement', detail: 'Power demand (HT/LT), water (KLD) & fuel' },
  { label: 'Process & Effluents', detail: 'Effluent generation, hazardous waste & emissions' },
];

export function BusinessDnaSection() {
  const router = useRouter();

  return (
    <section id="business-dna" className="py-16 bg-white border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Explanatory Content */}
          <div>
            <span className="text-[#D4A017] text-xs font-bold uppercase tracking-wider bg-[#D4A017]/10 px-3 py-1 rounded-full border border-[#D4A017]/20">
              VERIFIED DATA REUSE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#355E3B] mt-3 mb-4 leading-tight">
              Tell EKATMA Once. Reuse It Across Your Journey.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              Build a reusable single-truth business profile so verified entity data, plot allocations, environmental metrics, and plant capacities support multiple regulatory workflows without repeatedly entering the same information.
            </p>

            {/* Key Value Highlights */}
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#2F7D4F]/10 text-[#2F7D4F] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#355E3B]">Zero Redundant Document Uploads</h3>
                  <p className="text-xs text-slate-500">Verified land deeds, GST, and pollution certificates auto-attach to subsequent departmental forms.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#2F7D4F]/10 text-[#2F7D4F] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#355E3B]">Automated Statutory Form Pre-Population</h3>
                  <p className="text-xs text-slate-500">MIDC, MPCB, MSEDCL, and DISH application forms draw directly from your Business DNA.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#2F7D4F]/10 text-[#2F7D4F] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#355E3B]">Single Audit Trail</h3>
                  <p className="text-xs text-slate-500">Complete provenance history tracking when information was updated, verified, or approved by officers.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => router.push(ENTREPRENEUR_ROUTES.login())}
              className="bg-[#355E3B] text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#27472c] transition-colors shadow-sm"
            >
              Build Your Business DNA
            </button>
          </div>

          {/* Right Column: Visual Business DNA Hub */}
          <div className="bg-[#F9FAF2] rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm relative">
            <div className="text-center mb-6">
              <span className="text-[11px] font-bold text-[#355E3B] bg-[#355E3B]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                BUSINESS DNA ORCHESTRATION
              </span>
              <h3 className="text-lg font-bold text-[#355E3B] mt-2">Centralized Entity Profile</h3>
            </div>

            {/* Attributes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {DNA_ATTRIBUTES.map((item, idx) => (
                <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200">
                  <div className="text-[10px] font-bold text-[#3d7a4d] uppercase">{item.label}</div>
                  <div className="text-xs font-medium text-slate-700 mt-0.5">{item.detail}</div>
                </div>
              ))}
            </div>

            {/* Downward Flow Indicator */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2 bg-[#355E3B] text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-xs">
                <span>Feeds Reusable Data Into</span>
                <svg className="w-4 h-4 text-[#D4A017] animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>

            {/* Reused Modules Grid */}
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
              <div className="bg-white p-2.5 rounded border border-[#355E3B]/20 text-[#355E3B]">
                Approvals
              </div>
              <div className="bg-white p-2.5 rounded border border-[#355E3B]/20 text-[#355E3B]">
                Documents
              </div>
              <div className="bg-white p-2.5 rounded border border-[#355E3B]/20 text-[#355E3B]">
                Compliance
              </div>
              <div className="bg-white p-2.5 rounded border border-[#355E3B]/20 text-[#355E3B]">
                Incentives
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
