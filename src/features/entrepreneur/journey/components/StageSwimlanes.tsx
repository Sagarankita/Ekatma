'use client';

import React from 'react';

export interface StageBand {
  id: string;
  number: string;
  title: string;
  stageKeys: string[];
  bgColor: string;
  borderColor: string;
  headerBg: string;
  headerText: string;
}

export const STAGE_SWIMLANES: StageBand[] = [
  {
    id: 'stage-1',
    number: '01',
    title: 'Land & Establishment',
    stageKeys: ['land', 'establishment'],
    bgColor: 'bg-slate-50/70',
    borderColor: 'border-slate-200',
    headerBg: 'bg-slate-200/80',
    headerText: 'text-slate-800',
  },
  {
    id: 'stage-2',
    number: '02',
    title: 'Construction & Building',
    stageKeys: ['construction'],
    bgColor: 'bg-blue-50/40',
    borderColor: 'border-blue-200/80',
    headerBg: 'bg-blue-100',
    headerText: 'text-blue-900',
  },
  {
    id: 'stage-3',
    number: '03',
    title: 'Utilities & Infrastructure',
    stageKeys: ['utilities'],
    bgColor: 'bg-amber-50/40',
    borderColor: 'border-amber-200/80',
    headerBg: 'bg-amber-100',
    headerText: 'text-amber-900',
  },
  {
    id: 'stage-4',
    number: '04',
    title: 'Pre-Operation',
    stageKeys: ['pre-operation'],
    bgColor: 'bg-purple-50/40',
    borderColor: 'border-purple-200/80',
    headerBg: 'bg-purple-100',
    headerText: 'text-purple-900',
  },
  {
    id: 'stage-5',
    number: '05',
    title: 'Operations & Compliance',
    stageKeys: ['compliance', 'operations', 'growth'],
    bgColor: 'bg-emerald-50/40',
    borderColor: 'border-emerald-200/80',
    headerBg: 'bg-emerald-100',
    headerText: 'text-emerald-900',
  },
];

export function StageSwimlanes() {
  return (
    <div className="w-full space-y-3 pointer-events-none select-none my-2">
      <div className="flex items-center gap-3 px-3 py-2 bg-slate-100 rounded-lg border border-slate-200 text-xs font-bold text-slate-700">
        <span className="uppercase tracking-wider">Industrial Lifecycle Stages (DAG Horizontal Progression)</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {STAGE_SWIMLANES.map(stage => (
          <div
            key={stage.id}
            className={`p-2.5 rounded-xl border ${stage.borderColor} ${stage.bgColor} flex flex-col justify-between`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${stage.headerBg} ${stage.headerText}`}>
                {stage.number}
              </span>
              <span className="text-xs font-bold text-slate-800 truncate">{stage.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
