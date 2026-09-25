'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import {
  listJourneyNodesForBusiness,
  journeyStateCfg,
  stageDisplayState,
  STAGES,
  type JourneyReq,
  type DependencyType,
} from './data';

function EdgeTooltip({
  fromId,
  toId,
  allNodes,
  onDismiss,
}: {
  fromId: string;
  toId: string;
  allNodes: JourneyReq[];
  onDismiss: () => void;
}) {
  const from = allNodes.find(n => n.id === fromId);
  const to = allNodes.find(n => n.id === toId);
  const dep = to?.dependencies.find(d => d.reqId === fromId);
  return (
    <div
      className="absolute z-20 bg-white border border-[#d1d9e0] rounded shadow-lg p-3 w-56 text-xs text-[#374151]"
      style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
    >
      <p className="font-bold text-[#1a2533] mb-1">Dependency</p>
      <p>
        <span className="text-[#9aa5b4]">Prerequisite:</span> {from?.service}
      </p>
      <p>
        <span className="text-[#9aa5b4]">Dependent:</span> {to?.service}
      </p>
      {dep?.type === 'conditional' && <p className="mt-1 italic text-[#78350f]">Conditional dependency</p>}
      {dep?.reason && <p className="mt-1 text-[#6b7a8d]">{dep.reason}</p>}
      <button
        type="button"
        onClick={onDismiss}
        className="mt-2 text-[#1a56db] hover:underline"
      >
        Dismiss
      </button>
    </div>
  );
}

function GraphNode({
  req,
  allNodes,
  onSelectReq,
}: {
  req: JourneyReq;
  allNodes: JourneyReq[];
  onSelectReq: (id: string) => void;
}) {
  const cfg = journeyStateCfg(req.displayState);
  const prereqs = req.dependencies.map(d => allNodes.find(n => n.id === d.reqId)).filter(Boolean) as JourneyReq[];
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => onSelectReq(req.id)}
        className={`w-full text-left p-3 rounded border-l-4 ${cfg.border} border border-[#e8edf2] ${cfg.bg} hover:shadow transition-shadow focus:outline-none focus:ring-2 focus:ring-[#1a56db]`}
        aria-label={`${req.service} — ${cfg.label}`}
      >
        <p className="text-[9px] font-bold text-[#9aa5b4] uppercase tracking-wider">{req.department}</p>
        <p className={`text-xs font-bold ${cfg.textCls} leading-snug`}>{req.service}</p>
        <span className={`mt-1 inline-block text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${cfg.badgeCls}`}>
          {cfg.icon} {cfg.label}
        </span>
        {req.displayState === 'waiting' && prereqs.length > 0 && (
          <p className="text-[9px] text-[#9aa5b4] mt-1 leading-tight">
            Waiting: {prereqs.map(p => p.service).join(', ')}
          </p>
        )}
        {req.displayState === 'approved' && req.unlocks && req.unlocks.length > 0 && (
          <p className="text-[9px] text-[#166534] mt-1">
            Unlocks: {req.unlocks.map(uid => allNodes.find(n => n.id === uid)?.service ?? uid).join(', ')}
          </p>
        )}
      </button>
    </div>
  );
}

export function DependencyScreen({ project }: { project: BusinessProject }) {
  const router = useRouter();
  const [activeEdge, setActiveEdge] = useState<string | null>(null);
  const [cteApproved, setCteApproved] = useState(false);
  const nodes = listJourneyNodesForBusiness(project.id, cteApproved);

  const handleSelectReq = (reqId: string) => {
    router.push(ENTREPRENEUR_ROUTES.requirement(project.id, reqId));
  };

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="max-w-[960px] mx-auto px-6 py-5">
        {/* Breadcrumb */}
        <div className="mb-4">
          <nav className="text-xs text-[#6b7a8d] flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href={ENTREPRENEUR_ROUTES.businesses()} className="hover:text-[#1a3a5c] hover:underline">
              My Businesses
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#1a3a5c] hover:underline">
              {project.name}
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.journey(project.id)} className="hover:text-[#1a3a5c] hover:underline">
              Regulatory Journey
            </Link>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">Dependencies</span>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-4 pb-4 border-b border-[#d1d9e0] flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold text-[#9aa5b4] uppercase tracking-wider mb-1">E13 — Dependency Graph</p>
            <h1 className="text-2xl font-bold text-[#1a3a5c]">Dependency Graph</h1>
            <p className="text-sm text-[#6b7a8d] mt-1">
              See which regulatory requirements depend on others and what will unlock next.
            </p>
          </div>
          <Link
            href={ENTREPRENEUR_ROUTES.journey(project.id)}
            className="text-xs border border-[#1a56db] text-[#1a56db] px-3 py-2 rounded hover:bg-[#ebf3ff] font-medium transition-colors shrink-0"
          >
            Journey View
          </Link>
        </div>

        {/* Demo toggle */}
        <div className="mb-4 p-3 bg-[#fffbeb] border border-[#fde68a] rounded flex items-center gap-3">
          <span className="text-[10px] font-bold text-[#78350f] uppercase tracking-wider">Prototype Demo</span>
          <button
            type="button"
            onClick={() => setCteApproved(v => !v)}
            className={`text-xs px-3 py-1 rounded font-medium transition-colors ${
              cteApproved ? 'bg-[#22c55e] text-white' : 'bg-[#e0e7ff] text-[#3730a3]'
            }`}
          >
            {cteApproved ? '✓ CTE Approved (click to reset)' : 'Simulate CTE Approval →'}
          </button>
          <span className="text-[10px] text-[#78350f]">Same state as E09</span>
        </div>

        {/* Context strip */}
        <div className="mb-4 p-3 bg-white border border-[#d1d9e0] rounded shadow-sm flex flex-wrap gap-4">
          {[
            { label: 'Project', value: project.name },
            { label: 'Business DNA', value: 'Version 1' },
            { label: 'Journey', value: 'Version 1' },
          ].map(f => (
            <div key={f.label}>
              <p className="text-[10px] font-semibold text-[#9aa5b4] uppercase tracking-wider">{f.label}</p>
              <p className="text-sm font-semibold text-[#1a2533]">{f.value}</p>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mb-4 flex flex-wrap gap-4 items-center p-3 bg-white border border-[#d1d9e0] rounded text-xs text-[#6b7a8d]">
          <span className="font-bold text-[#1a2533]">Legend:</span>
          <span className="flex items-center gap-1.5">
            <span className="w-6 border-t-2 border-[#374151]" />
            <span>Required dependency</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-6 border-t-2 border-dashed border-[#f59e0b]" />
            <span>Conditional dependency</span>
          </span>
          {[
            { l: 'Ready', c: 'bg-[#ebf3ff] text-[#1a3a5c] border-[#b8d0f5]' },
            { l: 'In Progress / Under Review', c: 'bg-[#ede9fe] text-[#3730a3] border-[#c4b5fd]' },
            { l: 'Blocked', c: 'bg-[#f8f9fb] text-[#6b7a8d] border-[#d1d9e0]' },
            { l: 'Approved', c: 'bg-[#f0fdf4] text-[#166534] border-[#86efac]' },
          ].map(s => (
            <span
              key={s.l}
              className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${s.c}`}
            >
              {s.l}
            </span>
          ))}
        </div>

        {/* Stage lanes / DAG */}
        <div className="space-y-0">
          {STAGES.map((stage, si) => {
            const stageNodes = nodes.filter(n => n.stage === stage.key);
            const stageSt = stageDisplayState(nodes, stage.key);
            const stCls: Record<string, string> = {
              Complete: 'text-[#166534]',
              'In Progress': 'text-[#3730a3]',
              Waiting: 'text-[#6b7a8d]',
              Ready: 'text-[#1a56db]',
              Upcoming: 'text-[#9aa5b4]',
              'Action Required': 'text-[#92400e]',
            };

            return (
              <div key={stage.key}>
                <div className="border border-[#d1d9e0] rounded-lg overflow-hidden bg-white shadow-sm">
                  <div className="flex items-center gap-3 px-4 py-3 bg-[#f8f9fb] border-b border-[#e8edf2]">
                    <span className="text-xs font-bold text-[#9aa5b4] w-6 shrink-0">{stage.num}</span>
                    <h2 className="text-sm font-bold text-[#1a3a5c] uppercase tracking-wider flex-1">{stage.label}</h2>
                    <span className={`text-xs font-semibold ${stCls[stageSt] ?? 'text-[#9aa5b4]'}`}>{stageSt}</span>
                  </div>
                  <div className="p-4">
                    {stageNodes.length === 0 ? (
                      <p className="text-xs text-[#9aa5b4] italic">
                        {stage.key === 'compliance'
                          ? 'Compliance obligations will appear after approvals.'
                          : 'No requirements identified.'}
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                        {stageNodes.map(req => {
                          const incomingEdges = req.dependencies;
                          return (
                            <div key={req.id} className="relative">
                              {incomingEdges.map(dep => (
                                <button
                                  key={dep.reqId + '->' + req.id}
                                  type="button"
                                  onClick={() =>
                                    setActiveEdge(
                                      activeEdge === dep.reqId + '->' + req.id ? null : dep.reqId + '->' + req.id,
                                    )
                                  }
                                  className={`mb-1.5 w-full flex items-center gap-1 text-[9px] px-2 py-0.5 rounded ${
                                    dep.type === 'conditional'
                                      ? 'border border-dashed border-[#f59e0b] text-[#78350f]'
                                      : 'border border-[#e8edf2] text-[#9aa5b4]'
                                  } hover:opacity-75`}
                                  title="Click to see dependency detail"
                                >
                                  <span>{dep.type === 'conditional' ? '- -' : '↑'}</span>
                                  <span className="truncate">
                                    from: {nodes.find(n => n.id === dep.reqId)?.service ?? dep.reqId}
                                  </span>
                                </button>
                              ))}
                              {activeEdge && activeEdge.endsWith('->' + req.id) && (() => {
                                const [fromId] = activeEdge.split('->');
                                return (
                                  <EdgeTooltip
                                    fromId={fromId}
                                    toId={req.id}
                                    allNodes={nodes}
                                    onDismiss={() => setActiveEdge(null)}
                                  />
                                );
                              })()}
                              <GraphNode req={req} allNodes={nodes} onSelectReq={handleSelectReq} />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                {/* Connector arrow between stages */}
                {si < STAGES.length - 1 && (
                  <div className="flex justify-center py-1.5">
                    <span className="text-[#d1d9e0] text-xl leading-none">↓</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary count note */}
        <div className="mt-4 p-3 bg-white border border-[#d1d9e0] rounded shadow-sm">
          <p className="text-xs font-bold text-[#1a2533] mb-2">Journey Summary</p>
          <div className="flex flex-wrap gap-4">
            {[
              { l: 'Approved', v: nodes.filter(n => n.displayState === 'approved').length, c: 'text-[#166534]' },
              { l: 'Ready', v: nodes.filter(n => n.displayState === 'ready').length, c: 'text-[#1a56db]' },
              { l: 'Blocked', v: nodes.filter(n => n.displayState === 'waiting').length, c: 'text-[#6b7a8d]' },
              { l: 'Conditional', v: nodes.filter(n => n.displayState === 'conditional').length, c: 'text-[#78350f]' },
              {
                l: 'Not Applicable',
                v: nodes.filter(n => n.displayState === 'not-applicable').length,
                c: 'text-[#9aa5b4]',
              },
            ].map(m => (
              <span key={m.l} className={`text-xs font-semibold ${m.c}`}>
                {m.v} {m.l}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <Link
            href={ENTREPRENEUR_ROUTES.journey(project.id)}
            className="inline-block border border-[#d1d9e0] text-[#374151] text-sm font-medium px-5 py-2.5 rounded hover:bg-[#f0f4f8] transition-colors"
          >
            ← Back to Journey
          </Link>
        </div>
      </div>
    </main>
  );
}
