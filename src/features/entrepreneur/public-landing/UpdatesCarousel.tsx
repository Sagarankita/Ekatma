'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

interface UpdateCard {
  id: string;
  category: 'Policies' | 'Schemes' | 'Notices' | 'Regulatory Changes';
  date: string;
  headline: string;
  summary: string;
  dept: string;
  refNo: string;
  fullContent: string[];
  pdfSize?: string;
}

const CAROUSEL_CARDS: UpdateCard[] = [
  {
    id: 'up-1',
    category: 'Policies',
    date: 'Sep 15, 2026',
    headline: 'Maharashtra Industrial Policy 2024-29 Issued',
    summary: 'Comprehensive policy framework offering capital subsidies, power concessions, and fast-track single-window approvals across MIDC industrial corridors.',
    dept: 'Industries Dept',
    refNo: 'MAH-IND/POL-2024-29/GR-0412',
    pdfSize: '2.4 MB',
    fullContent: [
      'Under the provisions of the Maharashtra Industrial Development Act, the Department of Industries hereby releases the 5-Year Fiscal & Infrastructure Support Framework for 2024-2029.',
      'Key Policy Directives: 100% Stamp Duty Exemption for D and D+ industrial zones, Power Tariff Subvention of ₹1.00/unit for 3 years, and fast-track single-window clearance SLA via EKATMA.',
      'All prospective and expanding manufacturing enterprises may view the eligibility criteria and claim procedure directly under the EKATMA Incentives & Approvals tab.'
    ]
  },
  {
    id: 'up-2',
    category: 'Schemes',
    date: 'Sep 10, 2026',
    headline: 'Package Scheme of Incentives (PSI) Subvention Window',
    summary: 'Online submission window for interest subvention and electricity duty exemptions for registered MSME and Mega industrial units.',
    dept: 'Directorate of Industries',
    refNo: 'DI/PSI-2026/CIRC-104',
    pdfSize: '1.8 MB',
    fullContent: [
      'Official Notification regarding online claim submissions under the Package Scheme of Incentives (PSI) for FY 2026-27.',
      'Eligible MSMEs and Mega Projects set up post-April 2024 can submit claims for electricity duty exemption, interest subvention, and technology upgradation grants.',
      'Claims must be accompanied by Chartered Accountant verified capital investment certificates uploaded through the EKATMA portal.'
    ]
  },
  {
    id: 'up-3',
    category: 'Notices',
    date: 'Sep 04, 2026',
    headline: 'MPCB Auto-Renewal Consent to Operate Guidelines',
    summary: 'Automated 5-year consent renewal for compliant Green Category manufacturing units based on self-certification and past audit history.',
    dept: 'MPCB',
    refNo: 'MPCB/RENEWAL/NOT-2026/88',
    pdfSize: '1.1 MB',
    fullContent: [
      'Maharashtra Pollution Control Board (MPCB) Order No. MPCB/RENEWAL/2026: Automatic Consent to Operate (CTO) renewal is hereby enabled for all compliant Green Category industrial units.',
      'Units maintaining zero-discharge compliance and 100% statutory return submissions over the past 3 years qualify for automatic 5-year extension upon self-declaration without physical re-inspection.',
      'This order comes into effect immediately across all Regional Offices of MPCB in Maharashtra.'
    ]
  },
  {
    id: 'up-4',
    category: 'Regulatory Changes',
    date: 'Aug 28, 2026',
    headline: 'Standardized Factory Building Plan Approval SLA',
    summary: 'Statutory turnaround time for factory building plan scrutiny reduced to 14 working days across all municipal and MIDC planning authorities.',
    dept: 'DISH & Town Planning',
    refNo: 'DISH/SLA-STAT/2026/12',
    pdfSize: '950 KB',
    fullContent: [
      'Directorate of Industrial Safety and Health (DISH) Statutory Circular: Mandating strict 14-day SLA limits for factory building plan scrutiny.',
      'In case of non-response or query delay by statutory planning authorities within 14 working days, deemed approval provisions shall apply per the Maharashtra Right to Public Services Act.',
      'Architects registered under Council of Architecture (CoA) can auto-certify low-risk structural drawings.'
    ]
  },
  {
    id: 'up-5',
    category: 'Schemes',
    date: 'Aug 20, 2026',
    headline: 'Plug-and-Play Infrastructure Scheme for Electronics',
    summary: 'Ready-to-occupy industrial sheds with pre-cleared power and water utilities available in Chakan and Butibori electronics clusters.',
    dept: 'MIDC',
    refNo: 'MIDC/INFRA/2026/PLUG-09',
    pdfSize: '3.1 MB',
    fullContent: [
      'MIDC Infrastructure Allotment Notice: Release of 45 plug-and-play factory sheds equipped with pre-sanctioned 500 kVA power supply and CETP effluent discharge allocation in Chakan Phase-IV and Butibori ESDM clusters.',
      'Allotment will be executed on a first-come, first-served basis through online application on the EKATMA Single Window Portal.',
      'Interested industrial applicants can inspect site layout maps and apply for immediate possession.'
    ]
  },
];

export function UpdatesCarousel() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedCard, setSelectedCard] = useState<UpdateCard | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDownloadNotice = (card: UpdateCard) => {
    const cleanRef = card.refNo.replace(/[/\\?%*:|"<>]/g, '_');
    const fileName = `${cleanRef}.pdf`;
    
    // Create official formatted document text blob
    const content = `================================================================
GOVERNMENT OF MAHARASHTRA • OFFICIAL GAZETTE NOTIFICATION
================================================================

Category    : ${card.category}
Date        : ${card.date}
Department  : ${card.dept}
Reference No: ${card.refNo}

SUBJECT:
${card.headline}

SUMMARY:
${card.summary}

OFFICIAL NOTIFICATION DETAILS:
${card.fullContent ? card.fullContent.join('\n\n') : card.summary}

================================================================
Issued by Department of Industries, Government of Maharashtra.
EKATMA Single Window Clearance Portal - Official Gazette Record.
================================================================`;

    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const filtered = CAROUSEL_CARDS.filter(
    (card) => activeFilter === 'All' || card.category === activeFilter
  );

  return (
    <section id="policies-schemes" className="py-16 bg-[#F8F9FA] border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-[#245B8A] text-xs font-bold uppercase tracking-wider bg-[#245B8A]/10 px-3 py-1 rounded-full border border-[#245B8A]/20">
              NOTIFICATIONS & RESOURCES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17365D] mt-3 mb-2">
              Policies, Schemes & Regulatory Updates
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl">
              Stay updated with official Government of Maharashtra policy releases, industrial schemes, statutory notices, and regulatory changes.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
            {['All', 'Policies', 'Schemes', 'Notices', 'Regulatory Changes'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeFilter === cat
                    ? 'bg-[#17365D] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-[#17365D]/30 p-6 flex flex-col justify-between transition-all hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#245B8A] bg-[#245B8A]/10 px-2 py-0.5 rounded">
                    {card.category}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    {card.date}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#17365D] mb-2 leading-snug">
                  {card.headline}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  {card.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-slate-500">
                  {card.dept}
                </span>
                <button
                  onClick={() => setSelectedCard(card)}
                  className="text-xs font-semibold text-[#17365D] hover:text-[#245B8A] flex items-center gap-1 group"
                >
                  <span>Read Notice</span>
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Official Document Notice Modal (Portal to body to guarantee viewport centering) */}
        {mounted && selectedCard && createPortal(
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 border border-slate-200">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Official Gazette / Notice Header */}
              <div className="border-b border-slate-200 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#17365D] bg-[#17365D]/10 px-2.5 py-1 rounded">
                      GOVERNMENT OF MAHARASHTRA
                    </span>
                    <span className="text-xs font-bold text-[#245B8A] bg-[#245B8A]/10 px-2 py-0.5 rounded">
                      {selectedCard.category}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">Issued: {selectedCard.date}</span>
                </div>
                
                <h3 className="text-xl font-extrabold text-[#17365D] mt-2 leading-snug">
                  {selectedCard.headline}
                </h3>
                
                <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                  <span>Department: <strong className="text-slate-800">{selectedCard.dept}</strong></span>
                  <span>•</span>
                  <span>Ref No: <code className="bg-slate-100 text-[#17365D] px-1.5 py-0.5 rounded font-mono font-semibold">{selectedCard.refNo}</code></span>
                </div>
              </div>

              {/* Document Text Body */}
              <div className="bg-[#F8F9FA] rounded-xl p-5 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  <span>OFFICIAL GAZETTE NOTIFICATION TEXT</span>
                  <span>PUBLIC RELEASE</span>
                </div>

                {selectedCard.fullContent && selectedCard.fullContent.map((paragraph, idx) => (
                  <p key={idx} className="text-xs text-slate-700 leading-relaxed font-normal">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* PDF & Action Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V7l-5-5H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <span className="font-semibold text-slate-800 block sm:inline">{selectedCard.refNo}.pdf</span>
                    <span className="text-slate-400 text-[11px] sm:ml-2">({selectedCard.pdfSize || '1.5 MB'})</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => handleDownloadNotice(selectedCard)}
                    className="flex-1 sm:flex-none bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Download PDF</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCard(null);
                      router.push('/entrepreneur/login');
                    }}
                    className="flex-1 sm:flex-none bg-[#17365D] hover:bg-[#0f2540] text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>Log In to Access Portal</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>

            </div>
          </div>,
          document.body
        )}

      </div>
    </section>
  );
}
