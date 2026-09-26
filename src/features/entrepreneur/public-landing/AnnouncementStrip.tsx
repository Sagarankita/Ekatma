'use client';

import React, { useState } from 'react';

const ANNOUNCEMENTS = [
  { id: 1, type: 'Policy', text: 'Maharashtra Industrial Policy 2024-29: Streamlined Incentive Eligibility & Fast-Track Approvals Launched', link: '#policies-schemes' },
  { id: 2, type: 'Notice', text: 'MPCB Auto-Renewal of Consent to Operate enabled for Green & Orange category industries', link: '#policies-schemes' },
  { id: 3, type: 'Scheme', text: 'MIDC Plug-and-Play Industrial Park Allotments open for Electronics & Biotech units', link: '#policies-schemes' },
  { id: 4, type: 'Regulatory Update', text: 'Single Window Integrated Scrutiny System SLA capped at 7 working days across 14 departments', link: '#policies-schemes' },
];

export function AnnouncementStrip() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="bg-[#17365D]/5 border-y border-[#17365D]/10 py-2.5 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Badge */}
        <div className="flex items-center gap-2 shrink-0 bg-[#17365D] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
          <span className="w-2 h-2 rounded-full bg-[#E68A2E] animate-pulse" />
          <span>Latest Updates</span>
        </div>

        {/* Marquee / Ticker */}
        <div
          className="flex-1 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`flex items-center gap-8 whitespace-nowrap text-xs text-[#20242A] transition-all ${
              isPaused ? '' : 'animate-marquee'
            }`}
          >
            {ANNOUNCEMENTS.map((item) => (
              <a
                key={item.id}
                href={item.link}
                className="inline-flex items-center gap-2 hover:text-[#245B8A] transition-colors group"
              >
                <span className="font-semibold text-[#245B8A] bg-[#245B8A]/10 px-1.5 py-0.5 rounded text-[10px]">
                  [{item.type}]
                </span>
                <span className="group-hover:underline">{item.text}</span>
                <span className="text-slate-400">|</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
