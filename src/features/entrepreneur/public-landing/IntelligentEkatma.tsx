'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';

export function IntelligentEkatma() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'assistant' | 'incentive' | 'regchange'>('assistant');

  return (
    <section id="intelligent-ekatma" className="py-16 bg-[#F9FAF2] border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#3d7a4d] text-xs font-bold uppercase tracking-wider bg-[#3d7a4d]/10 px-3 py-1 rounded-full border border-[#3d7a4d]/20">
            INTELLIGENT EKATMA
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#355E3B] mt-3 mb-3">
            Intelligence Where It Actually Helps
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Smart guidance, automated incentive discovery, and real-time regulatory impact analysis designed to simplify government compliance.
          </p>
        </div>

        {/* Feature Selector Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap justify-center gap-1">
            <button
              onClick={() => setActiveTab('assistant')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'assistant'
                  ? 'bg-[#355E3B] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#355E3B] hover:bg-slate-50'
              }`}
            >
              <svg className="w-4 h-4 text-[#D4A017]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Regulatory Assistant
            </button>

            <button
              onClick={() => setActiveTab('incentive')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'incentive'
                  ? 'bg-[#355E3B] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#355E3B] hover:bg-slate-50'
              }`}
            >
              <svg className="w-4 h-4 text-[#2F7D4F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Incentive Intelligence
            </button>

            <button
              onClick={() => setActiveTab('regchange')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'regchange'
                  ? 'bg-[#355E3B] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#355E3B] hover:bg-slate-50'
              }`}
            >
              <svg className="w-4 h-4 text-[#3d7a4d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Regulatory Change Intelligence
            </button>
          </div>
        </div>

        {/* Feature Display Box */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm max-w-4xl mx-auto">
          {activeTab === 'assistant' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#355E3B]/10 text-[#355E3B] flex items-center justify-center font-bold">
                  AI
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#355E3B]">Regulatory Assistant</h3>
                  <p className="text-xs text-slate-500">Ask questions about statutory requirements, documentation & policies in English or Marathi.</p>
                </div>
              </div>

              {/* Sample Queries */}
              <div className="bg-[#F9FAF2] rounded-xl p-4 border border-slate-200 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Sample Regulatory Queries</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-3 rounded border border-slate-200 font-medium text-[#2B2B2B]">
                    "Which approval do I need first for a 5-acre chemical plant in Chakan?"
                  </div>
                  <div className="bg-white p-3 rounded border border-slate-200 font-medium text-[#2B2B2B]">
                    "What documents are required for MPCB Consent to Operate renewal?"
                  </div>
                  <div className="bg-white p-3 rounded border border-slate-200 font-medium text-[#2B2B2B]">
                    "मराठीत सांगा: एमआयडीसी भूखंड वाटपासाठी आवश्यक कागदपत्रे"
                  </div>
                  <div className="bg-white p-3 rounded border border-slate-200 font-medium text-[#2B2B2B]">
                    "What is the maximum SLA for Factory Plan Approval under DISH?"
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">Supports English & Marathi natural language queries</span>
                <button
                  onClick={() => router.push(ENTREPRENEUR_ROUTES.login())}
                  className="bg-[#355E3B] text-white font-medium text-xs px-5 py-2.5 rounded-lg hover:bg-[#27472c] transition-colors"
                >
                  Try Regulatory Assistant
                </button>
              </div>
            </div>
          )}

          {activeTab === 'incentive' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#2F7D4F]/10 text-[#2F7D4F] flex items-center justify-center font-bold">
                  ₹
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#355E3B]">Incentive Intelligence</h3>
                  <p className="text-xs text-slate-500">Discover state subsidies, tax rebates, and ROI projections tailored to your Business DNA.</p>
                </div>
              </div>

              {/* Incentive Visual Flow */}
              <div className="bg-[#2F7D4F]/5 rounded-xl p-5 border border-[#2F7D4F]/20 grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-white p-3 rounded-lg border border-[#2F7D4F]/20">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Input</div>
                  <div className="text-xs font-bold text-[#355E3B] mt-1">Business DNA</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-[#2F7D4F]/20">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Matched</div>
                  <div className="text-xs font-bold text-[#2F7D4F] mt-1">PSI Schemes</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-[#2F7D4F]/20">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Analysis</div>
                  <div className="text-xs font-bold text-[#355E3B] mt-1">Eligibility Criteria</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-[#2F7D4F]/20">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Output</div>
                  <div className="text-xs font-bold text-[#D4A017] mt-1">Estimated Benefit</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">Automatically evaluates Package Scheme of Incentives (PSI) 2024</span>
                <button
                  onClick={() => router.push(ENTREPRENEUR_ROUTES.login())}
                  className="bg-[#2F7D4F] text-white font-medium text-xs px-5 py-2.5 rounded-lg hover:bg-[#24623e] transition-colors"
                >
                  Calculate My Incentives
                </button>
              </div>
            </div>
          )}

          {activeTab === 'regchange' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#3d7a4d]/10 text-[#3d7a4d] flex items-center justify-center font-bold">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#355E3B]">Regulatory Change Intelligence</h3>
                  <p className="text-xs text-slate-500">Understand how validated regulatory notifications affect your active applications and compliance.</p>
                </div>
              </div>

              <div className="bg-[#3d7a4d]/5 rounded-xl p-5 border border-[#3d7a4d]/20 space-y-3">
                <div className="text-xs font-bold text-[#355E3B] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
                  Active Notification Impact Analysis
                </div>
                <div className="bg-white p-3.5 rounded-lg border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between font-bold text-[#355E3B]">
                    <span>MPCB Circular No. 44/2026: Fast-Track Green Category Consent</span>
                    <span className="text-[10px] font-semibold bg-[#2F7D4F]/10 text-[#2F7D4F] px-2 py-0.5 rounded">HIGH IMPACT</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Impact: Reduces CTE processing time from 30 days to 7 days for green-coded electronics assembly units with zero hazardous discharge.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">Automated notification monitoring across 14 government departments</span>
                <button
                  onClick={() => router.push(ENTREPRENEUR_ROUTES.login())}
                  className="bg-[#3d7a4d] text-white font-medium text-xs px-5 py-2.5 rounded-lg hover:bg-[#1c486e] transition-colors"
                >
                  View Change Impact
                </button>
              </div>
            </div>
          )}

          {/* Official Trust Statement */}
          <div className="mt-8 pt-4 border-t border-slate-100 text-[11px] text-slate-500 bg-slate-50 p-3.5 rounded-lg border border-slate-200/80 leading-relaxed">
            <span className="font-bold text-[#355E3B]">Government Policy Statement:</span> AI supports discovery, explanation and analysis. Statutory applicability, scrutiny and government decisions remain governed by applicable rules and authorized departmental processes.
          </div>
        </div>

      </div>
    </section>
  );
}
