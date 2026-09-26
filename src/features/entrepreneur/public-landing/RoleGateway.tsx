'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import { ROUTES } from '@/lib/routes';

export function RoleGateway() {
  const router = useRouter();

  return (
    <section id="role-gateway" className="py-16 bg-white border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#245B8A] text-xs font-bold uppercase tracking-wider bg-[#245B8A]/10 px-3 py-1 rounded-full border border-[#245B8A]/20">
            PORTAL ACCESS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17365D] mt-3 mb-3">
            Continue with EKATMA
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Select your role to access specialized features, manage industrial applications, or browse public resources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Entrepreneur */}
          <div className="bg-[#F8F9FA] rounded-xl border border-slate-200 hover:border-[#17365D]/40 p-6 sm:p-8 flex flex-col justify-between transition-all hover:shadow-md group">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#17365D]/10 text-[#17365D] flex items-center justify-center mb-5 group-hover:bg-[#17365D] group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0v-4m0 4h4m-4-4l4 4" />
                </svg>
              </div>
              <span className="text-[11px] font-bold text-[#E68A2E] uppercase tracking-wider">
                Industrial Unit / Investor
              </span>
              <h3 className="text-xl font-bold text-[#17365D] mt-1 mb-3">
                Entrepreneur Portal
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Start or manage your industrial regulatory journey, discover statutory requirements, track application progress, submit queries, and claim state incentives.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => router.push(ENTREPRENEUR_ROUTES.login())}
                className="w-full bg-[#17365D] text-white font-semibold text-sm py-2.5 rounded-lg hover:bg-[#0f2540] focus:ring-2 focus:ring-[#245B8A] focus:ring-offset-2 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>Enter Entrepreneur Portal</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => router.push(ENTREPRENEUR_ROUTES.register())}
                className="w-full bg-white text-[#245B8A] font-medium text-xs py-2 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors text-center block"
              >
                New user? Register Now
              </button>
            </div>
          </div>

          {/* Card 2: Government Officer */}
          <div className="bg-[#F8F9FA] rounded-xl border border-slate-200 hover:border-[#17365D]/40 p-6 sm:p-8 flex flex-col justify-between transition-all hover:shadow-md group">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#245B8A]/10 text-[#245B8A] flex items-center justify-center mb-5 group-hover:bg-[#245B8A] group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-[11px] font-bold text-[#245B8A] uppercase tracking-wider">
                Government Authority
              </span>
              <h3 className="text-xl font-bold text-[#17365D] mt-1 mb-3">
                Department Portal
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Access assigned applications, conduct multi-departmental scrutiny, schedule joint inspections, issue consolidated queries, and monitor SLA compliance.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => router.push(ROUTES.department.login)}
                className="w-full bg-[#245B8A] text-white font-semibold text-sm py-2.5 rounded-lg hover:bg-[#1c486e] focus:ring-2 focus:ring-[#245B8A] focus:ring-offset-2 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>Officer Login</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
                </svg>
              </button>
              <a
                href="#service-explorer"
                className="w-full bg-white text-slate-600 font-medium text-xs py-2 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors text-center block"
              >
                View Department Workflows
              </a>
            </div>
          </div>

          {/* Card 3: Public Visitor */}
          <div className="bg-[#F8F9FA] rounded-xl border border-slate-200 hover:border-[#17365D]/40 p-6 sm:p-8 flex flex-col justify-between transition-all hover:shadow-md group">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#2F7D4F]/10 text-[#2F7D4F] flex items-center justify-center mb-5 group-hover:bg-[#2F7D4F] group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <span className="text-[11px] font-bold text-[#2F7D4F] uppercase tracking-wider">
                Public & Visitors
              </span>
              <h3 className="text-xl font-bold text-[#17365D] mt-1 mb-3">
                Public Resources
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Browse available services, statutory fee schedules, government policies, industrial incentive schemes, FAQs, and regulatory notifications without logging in.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-200">
              <a
                href="#policies-schemes"
                className="w-full bg-[#2F7D4F] text-white font-semibold text-sm py-2.5 rounded-lg hover:bg-[#24623e] focus:ring-2 focus:ring-[#2F7D4F] focus:ring-offset-2 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>Explore Resources</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#help-resources"
                className="w-full bg-white text-slate-600 font-medium text-xs py-2 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors text-center block"
              >
                Help & Support Center
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
