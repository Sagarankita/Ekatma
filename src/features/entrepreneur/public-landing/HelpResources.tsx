'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';

const FAQS = [
  {
    q: 'What is EKATMA single window portal?',
    a: 'EKATMA is the Government of Maharashtra unified portal orchestrating industrial clearances, departmental scrutinies, site inspections, and subsidy claims across MIDC, MPCB, DISH, MSEDCL, and other state agencies.',
  },
  {
    q: 'How does Business DNA work for new applications?',
    a: 'Business DNA stores your verified company identity, land footprint, sector classification, and utility requirements so subsequent applications auto-fill and reuse verified document proofs without re-entry.',
  },
  {
    q: 'Can I track application SLA status online?',
    a: 'Yes, both entrepreneurs and department officers can view real-time SLA timers, active scrutiny stage, pending queries, and joint inspection schedules.',
  },
  {
    q: 'How do I claim incentives under Package Scheme of Incentives (PSI)?',
    a: 'Log into the Entrepreneur Portal, navigate to Incentive Workspace, evaluate eligible claims using the calculator, and submit verified claims directly.',
  },
];

export function HelpResources() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="help-resources" className="py-16 bg-white scroll-mt-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#17365D] text-xs font-bold uppercase tracking-wider bg-[#17365D]/10 px-3 py-1 rounded-full border border-[#17365D]/20">
            PUBLIC ASSISTANCE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17365D] mt-3 mb-3">
            Need Help & Public Resources?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Find answers to common statutory queries, access user guidelines, or reach out to government support.
          </p>
        </div>

        {/* 3 Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
          
          <a
            href="#intelligent-ekatma"
            className="bg-[#F8F9FA] rounded-xl border border-slate-200 p-6 flex flex-col items-center justify-between text-center hover:border-[#17365D]/30 transition-all hover:shadow-md group"
          >
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-lg bg-[#17365D]/10 text-[#17365D] flex items-center justify-center mb-4 group-hover:bg-[#17365D] group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-[#17365D] mb-1">Ask Regulatory Assistant</h3>
              <p className="text-xs text-slate-500">Instant AI answers in English and Marathi</p>
            </div>
            <span className="text-xs font-semibold text-[#245B8A] mt-4 flex items-center justify-center gap-1 group-hover:underline">
              Launch Assistant →
            </span>
          </a>

          <button
            onClick={() => router.push(ENTREPRENEUR_ROUTES.login())}
            className="bg-[#F8F9FA] rounded-xl border border-slate-200 p-6 flex flex-col items-center justify-between text-center hover:border-[#17365D]/30 transition-all hover:shadow-md group"
          >
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-lg bg-[#E68A2E]/10 text-[#E68A2E] flex items-center justify-center mb-4 group-hover:bg-[#E68A2E] group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-[#17365D] mb-1">Raise a Grievance</h3>
              <p className="text-xs text-slate-500">Lodge SLA delay or procedural grievances</p>
            </div>
            <span className="text-xs font-semibold text-[#245B8A] mt-4 flex items-center justify-center gap-1 group-hover:underline">
              Submit Grievance →
            </span>
          </button>

          <a
            href="#policies-schemes"
            className="bg-[#F8F9FA] rounded-xl border border-slate-200 p-6 flex flex-col items-center justify-between text-center hover:border-[#17365D]/30 transition-all hover:shadow-md group"
          >
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-lg bg-[#2F7D4F]/10 text-[#2F7D4F] flex items-center justify-center mb-4 group-hover:bg-[#2F7D4F] group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-[#17365D] mb-1">Guides & Downloads</h3>
              <p className="text-xs text-slate-500">Statutory checklists & policy PDFs</p>
            </div>
            <span className="text-xs font-semibold text-[#245B8A] mt-4 flex items-center justify-center gap-1 group-hover:underline">
              Download Guidelines →
            </span>
          </a>

        </div>

        {/* FAQs Accordion */}
        <div id="faq-accordion" className="max-w-3xl mx-auto bg-[#F8F9FA] rounded-2xl border border-slate-200 p-6 sm:p-8">
          <h3 className="text-lg font-bold text-[#17365D] mb-6 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E68A2E]" />
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left font-bold text-xs sm:text-sm text-[#17365D] flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className={`text-base font-bold text-[#245B8A] transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                      ↓
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
