'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';

interface ServiceItem {
  id: string;
  title: string;
  dept: string;
  stage: 'Planning' | 'Establishment' | 'Construction' | 'Pre-Operation' | 'Operations' | 'Expansion';
  category: 'Land & Infrastructure' | 'Environmental & Safety' | 'Power & Utilities' | 'Statutory & Tax';
  description: string;
  slaDays: number;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'midc-land',
    title: 'Plot Allotment & Land Acquisition',
    dept: 'MIDC',
    stage: 'Planning',
    category: 'Land & Infrastructure',
    description: 'Application for industrial land allotment across MIDC estates in Maharashtra.',
    slaDays: 15,
  },
  {
    id: 'mpcb-cte',
    title: 'Consent to Establish (CTE)',
    dept: 'MPCB',
    stage: 'Establishment',
    category: 'Environmental & Safety',
    description: 'Environmental approval prior to establishing industrial manufacturing units.',
    slaDays: 30,
  },
  {
    id: 'bldg-plan',
    title: 'Building & Master Plan Clearance',
    dept: 'Town Planning Authority',
    stage: 'Construction',
    category: 'Land & Infrastructure',
    description: 'Structural and architectural master plan approval for factory buildings.',
    slaDays: 21,
  },
  {
    id: 'fire-noc',
    title: 'Provisional Fire Safety NOC',
    dept: 'Maharashtra Fire Services',
    stage: 'Construction',
    category: 'Environmental & Safety',
    description: 'Fire hazard assessment and provisional No Objection Certificate for industrial premises.',
    slaDays: 14,
  },
  {
    id: 'msedcl-power',
    title: 'High-Tension (HT) Power Connection',
    dept: 'MSEDCL',
    stage: 'Construction',
    category: 'Power & Utilities',
    description: 'Electrical infrastructure setup and power load sanction for factory operations.',
    slaDays: 21,
  },
  {
    id: 'midc-water',
    title: 'Industrial Water Connection',
    dept: 'MIDC Water Works',
    stage: 'Pre-Operation',
    category: 'Power & Utilities',
    description: 'Bulk industrial water connection pipeline allotment and metering.',
    slaDays: 10,
  },
  {
    id: 'mpcb-cto',
    title: 'Consent to Operate (CTO)',
    dept: 'MPCB',
    stage: 'Pre-Operation',
    category: 'Environmental & Safety',
    description: 'Final environmental operational consent following CTE compliance inspection.',
    slaDays: 30,
  },
  {
    id: 'dish-factory',
    title: 'Factory Registration & License',
    dept: 'DISH Maharashtra',
    stage: 'Pre-Operation',
    category: 'Statutory & Tax',
    description: 'Statutory factory registration under Factories Act, 1948 for worker safety.',
    slaDays: 15,
  },
  {
    id: 'boiler-reg',
    title: 'Boiler Registration & Inspection',
    dept: 'Steam Boilers Directorate',
    stage: 'Pre-Operation',
    category: 'Environmental & Safety',
    description: 'High-pressure steam boiler testing and statutory registration certificate.',
    slaDays: 12,
  },
  {
    id: 'subsidy-claim',
    title: 'Package Scheme of Incentives (PSI) Claim',
    dept: 'Industries Directorate',
    stage: 'Operations',
    category: 'Statutory & Tax',
    description: 'Disbursement claim for capital subsidy, GST reimbursement, and power tariff subvention.',
    slaDays: 45,
  },
  {
    id: 'exp-expansion',
    title: 'Capacity Expansion Clearance',
    dept: 'MIDC & MPCB',
    stage: 'Expansion',
    category: 'Land & Infrastructure',
    description: 'Fast-track amendment and additional FAR allocation for existing units.',
    slaDays: 20,
  },
];

const STAGES = ['All', 'Planning', 'Establishment', 'Construction', 'Pre-Operation', 'Operations', 'Expansion'] as const;

export function ServiceExplorer() {
  const router = useRouter();
  const [activeStage, setActiveStage] = useState<string>('All');
  const [selectedDept, setSelectedDept] = useState<string>('All');

  const filteredServices = SERVICES.filter((service) => {
    const stageMatch = activeStage === 'All' || service.stage === activeStage;
    const deptMatch = selectedDept === 'All' || service.dept === selectedDept;
    return stageMatch && deptMatch;
  });

  return (
    <section id="service-explorer" className="py-16 bg-[#F9FAF2] border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-[#355E3B] text-xs font-bold uppercase tracking-wider bg-[#355E3B]/10 px-3 py-1 rounded-full border border-[#355E3B]/20">
              SERVICE CATALOGUE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#355E3B] mt-3 mb-2">
              Explore EKATMA Services
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl">
              Discover statutory clearances, infrastructure connections, and operational approvals coordinated across Maharashtra departments.
            </p>
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-2">
            <label htmlFor="dept-filter" className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Department:
            </label>
            <select
              id="dept-filter"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-white border border-slate-300 rounded-md px-3 py-1.5 text-xs text-[#2B2B2B] focus:ring-2 focus:ring-[#3d7a4d] outline-none"
            >
              <option value="All">All Departments</option>
              <option value="MIDC">MIDC</option>
              <option value="MPCB">MPCB</option>
              <option value="DISH Maharashtra">DISH</option>
              <option value="MSEDCL">MSEDCL</option>
              <option value="Industries Directorate">Industries Directorate</option>
            </select>
          </div>
        </div>

        {/* Stage Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-200 no-scrollbar">
          {STAGES.map((stage) => {
            const isActive = activeStage === stage;
            return (
              <button
                key={stage}
                onClick={() => setActiveStage(stage)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#355E3B] text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {stage === 'All' ? 'All Lifecycle Stages' : stage}
              </button>
            );
          })}
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-[#3d7a4d]/40 p-6 flex flex-col justify-between transition-all hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#355E3B] bg-[#355E3B]/10 px-2 py-0.5 rounded">
                    {service.dept}
                  </span>
                  <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    SLA: {service.slaDays} Days
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#355E3B] mb-2 leading-snug">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  {service.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-[#D4A017]">
                  Stage: {service.stage}
                </span>
                <button
                  onClick={() => router.push(ENTREPRENEUR_ROUTES.login())}
                  className="text-xs font-semibold text-[#3d7a4d] hover:text-[#355E3B] flex items-center gap-1 group"
                >
                  <span>Apply</span>
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
