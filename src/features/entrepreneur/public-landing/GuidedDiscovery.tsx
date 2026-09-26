'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';

const INTENTS = [
  'Set up a new industrial unit',
  'Expand existing manufacturing facility',
  'Modernize & transition to green tech',
  'Renew existing compliance & consents',
];

const SECTORS = [
  'Electronics & Semiconductor',
  'Pharmaceuticals & Biotech',
  'Food Processing & Agrotech',
  'Chemical & Petrochemical',
  'Textile & Garment Manufacturing',
  'IT, Data Centers & ESDM',
  'Automotive & EV Manufacturing',
];

const LOCATIONS = [
  'MIDC Chakan (Pune Zone)',
  'MIDC Butibori (Nagpur Zone)',
  'MIDC Waluj (Chhatrapati Sambhajinagar)',
  'MIDC Tarapur (Palghar Zone)',
  'MIDC Taloja (Navi Mumbai Zone)',
  'Private Industrial Park / Non-MIDC Area',
];

interface DiscoveryResult {
  approvalsNeeded: { title: string; dept: string; stage: string }[];
  incentivesEligible: string[];
}

export function GuidedDiscovery() {
  const router = useRouter();
  const [selectedIntent, setSelectedIntent] = useState(INTENTS[0]);
  const [selectedSector, setSelectedSector] = useState(SECTORS[0]);
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [result, setResult] = useState<DiscoveryResult | null>(null);

  const handleDiscover = (e: React.FormEvent) => {
    e.preventDefault();
    // Public sample determination
    setResult({
      approvalsNeeded: [
        { title: 'MIDC Land Allocation / Plot Allotment', dept: 'MIDC', stage: 'Planning' },
        { title: 'Consent to Establish (CTE)', dept: 'MPCB', stage: 'Pre-Operation' },
        { title: 'Factory Building Plan Approval', dept: 'Town Planning & DISH', stage: 'Construction' },
        { title: 'High Tension Power Infrastructure Connection', dept: 'MSEDCL', stage: 'Construction' },
        { title: 'Factory Registration & Safety Clearance', dept: 'DISH Maharashtra', stage: 'Pre-Operation' },
      ],
      incentivesEligible: [
        'Capital Subsidy up to 25% under Maharashtra Industrial Policy',
        'Electricity Duty Exemption for 7 Years',
        'Interest Subvention on Working Capital Loans',
        'Stamp Duty Exemption on Land Acquisition',
      ],
    });
  };

  return (
    <section id="guided-discovery" className="py-16 bg-[#F8F9FA] border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#E68A2E] text-xs font-bold uppercase tracking-wider bg-[#E68A2E]/10 px-3 py-1 rounded-full border border-[#E68A2E]/20">
            PUBLIC GUIDED DISCOVERY
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17365D] mt-3 mb-3">
            What do you need help with?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Select your business intent, sector, and location to discover applicable statutory approvals, departmental clearances, and potential state incentive programs.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 sm:p-8 max-w-4xl mx-auto">
          <form onSubmit={handleDiscover} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Intent */}
              <div>
                <label htmlFor="discovery-intent" className="block text-xs font-bold text-[#17365D] uppercase tracking-wider mb-2">
                  I am planning to
                </label>
                <select
                  id="discovery-intent"
                  value={selectedIntent}
                  onChange={(e) => setSelectedIntent(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-[#20242A] focus:ring-2 focus:ring-[#245B8A] focus:border-[#245B8A] outline-none"
                >
                  {INTENTS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sector */}
              <div>
                <label htmlFor="discovery-sector" className="block text-xs font-bold text-[#17365D] uppercase tracking-wider mb-2">
                  My sector is
                </label>
                <select
                  id="discovery-sector"
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-[#20242A] focus:ring-2 focus:ring-[#245B8A] focus:border-[#245B8A] outline-none"
                >
                  {SECTORS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="discovery-location" className="block text-xs font-bold text-[#17365D] uppercase tracking-wider mb-2">
                  My location is
                </label>
                <select
                  id="discovery-location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-[#20242A] focus:ring-2 focus:ring-[#245B8A] focus:border-[#245B8A] outline-none"
                >
                  {LOCATIONS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
              <p className="text-xs text-slate-500 italic">
                * Public general overview only. Does not replace formal statutory evaluation.
              </p>
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#17365D] text-white font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-[#0f2540] focus:ring-2 focus:ring-[#245B8A] focus:ring-offset-2 transition-colors shadow-sm"
              >
                Discover My Journey
              </button>
            </div>
          </form>

          {/* Results Panel */}
          {result && (
            <div className="mt-8 pt-6 border-t border-slate-200 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#17365D] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2F7D4F]" />
                  Estimated Regulatory Requirements ({selectedSector})
                </h3>
                <span className="text-xs font-semibold text-[#245B8A] bg-[#245B8A]/10 px-2.5 py-1 rounded">
                  {selectedLocation}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Approvals List */}
                <div className="bg-[#F8F9FA] p-4 rounded-lg border border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Applicable Clearances ({result.approvalsNeeded.length})
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {result.approvalsNeeded.map((app, i) => (
                      <li key={i} className="flex items-start justify-between gap-2 bg-white p-2.5 rounded border border-slate-100 shadow-2xs">
                        <span className="font-medium text-[#20242A]">{app.title}</span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[10px] font-semibold text-[#17365D] bg-[#17365D]/10 px-1.5 py-0.5 rounded">
                            {app.dept}
                          </span>
                          <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                            {app.stage}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Incentives List */}
                <div className="bg-[#2F7D4F]/5 p-4 rounded-lg border border-[#2F7D4F]/20">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#2F7D4F] mb-3 flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Potential State Incentives
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {result.incentivesEligible.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2 bg-white p-2.5 rounded border border-[#2F7D4F]/10 shadow-2xs text-slate-700">
                        <span className="text-[#2F7D4F] font-bold">✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Callout note */}
              <div className="bg-[#17365D]/5 border border-[#17365D]/15 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#17365D]">
                  <span className="font-bold">Want precise, statutory determination?</span> Logged-in entrepreneurs can generate a personalized regulatory journey using their verified Business DNA.
                </div>
                <button
                  onClick={() => router.push(ENTREPRENEUR_ROUTES.login())}
                  className="bg-[#245B8A] text-white font-medium text-xs px-4 py-2 rounded hover:bg-[#1c486e] shrink-0 transition-colors"
                >
                  Log In & Use Business DNA
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
