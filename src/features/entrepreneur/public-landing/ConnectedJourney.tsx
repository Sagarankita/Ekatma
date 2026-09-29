'use client';

import React from 'react';

const STEPS = [
  {
    step: '01',
    title: 'Business Profile (Business DNA)',
    desc: 'Build your verified industrial profile once with entity, land, process & scale details.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Discover Requirements',
    desc: 'Automated dependency graph evaluates statutory approvals required for your exact sector.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Apply & Coordinate',
    desc: 'Submit single-window application with auto-filled forms and verified document reuse.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    step: '04',
    title: 'Department Processing',
    desc: 'Multi-departmental scrutiny workbench processes applications concurrently within strict SLA bounds.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    step: '05',
    title: 'Inspections & Decisions',
    desc: 'Joint scheduled site visits and digital decision issuance without duplicate officer visits.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    step: '06',
    title: 'Compliance & Incentives',
    desc: 'Track operational renewals, statutory compliance, and claim state growth subsidies.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

export function ConnectedJourney() {
  return (
    <section id="connected-journey" className="py-16 bg-white border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#D4A017] text-xs font-bold uppercase tracking-wider bg-[#D4A017]/10 px-3 py-1 rounded-full border border-[#D4A017]/20">
            PLATFORM ORCHESTRATION
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#355E3B] mt-3 mb-3">
            From Business Setup to Continuous Compliance
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            EKATMA connects every regulatory touchpoint into one continuous lifecycle, eliminating redundant applications and fragmented departmental follow-ups.
          </p>
        </div>

        {/* Visual Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {STEPS.map((item, idx) => (
            <div
              key={item.step}
              className="bg-[#F9FAF2] rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-[#355E3B]/30 transition-all hover:shadow-md relative group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-black text-[#355E3B] bg-[#355E3B]/10 px-2.5 py-1 rounded-md">
                    STEP {item.step}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-[#355E3B] text-white flex items-center justify-center shadow-xs">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#355E3B] mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>Phase {idx < 3 ? 'Setup' : 'Operations'}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
