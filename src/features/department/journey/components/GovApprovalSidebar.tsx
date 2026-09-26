'use client';

import React, { useState } from 'react';
import {
  X,
  Lock,
  Unlock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Building2,
  Clock,
  CheckSquare,
  FileCheck2,
} from 'lucide-react';
import type { GovNodeData } from './GovApprovalNode';

interface GovApprovalSidebarProps {
  selectedNode: GovNodeData | null;
  allNodes: GovNodeData[];
  onClose: () => void;
  onApproveNode: (nodeId: string) => void;
  onBackToScrutiny: () => void;
}

export function GovApprovalSidebar({
  selectedNode,
  allNodes,
  onClose,
  onApproveNode,
  onBackToScrutiny,
}: GovApprovalSidebarProps) {
  // Accordion state
  const [openSection, setOpenSection] = useState<'scrutiny' | 'prereqs' | 'unlocks' | 'provenance' | null>('scrutiny');

  if (!selectedNode) return null;

  const { id, label, dept, type, status, ref, relationship, blocking, unlockCondition, children } = selectedNode;

  const isCompleted = status === 'completed';
  const isCurrent = status === 'current';
  const isReady = status === 'ready';
  const isBlocked = status === 'blocked';

  // Find prerequisite nodes
  const parentNodes = allNodes.filter(n => n.children?.includes(id));

  // Find child downstream nodes
  const childNodes = children
    ? (children.map(cid => allNodes.find(n => n.id === cid)).filter(Boolean) as GovNodeData[])
    : [];

  return (
    <aside className="w-full lg:w-[450px] shrink-0 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden sticky top-4 flex flex-col max-h-[calc(100vh-2rem)] z-30 transition-all font-sans">
      {/* Header Bar */}
      <div className="bg-slate-900 text-white p-5 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-300 bg-blue-950 px-2 py-0.5 rounded border border-blue-800 flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              {dept}
            </span>
            {ref && ref !== '-' && <span className="text-xs text-slate-400 font-mono">{ref}</span>}
          </div>
          <h2 className="text-base font-bold leading-snug text-white">{label}</h2>

          {/* Status Badge */}
          <div className="mt-2.5 flex items-center gap-2">
            {isCompleted && (
              <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Completed
              </span>
            )}
            {isCurrent && (
              <span className="text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" /> Current Officer Scrutiny
              </span>
            )}
            {isReady && (
              <span className="text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Unlock className="w-3.5 h-3.5 text-blue-400" /> Ready to Review
              </span>
            )}
            {isBlocked && (
              <span className="text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-red-400" /> Blocked
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Dependency Boundary Callout */}
      <div className="p-3.5 bg-amber-50 border-b border-amber-200 text-amber-900 flex items-start gap-2.5 text-xs">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-snug">
          <span className="font-bold text-amber-900 block text-[11px] uppercase tracking-wider">Dependency Boundary</span>
          <p className="text-[11px] text-amber-800 mt-0.5">
            External department records (MPCB, Fire, DISH) are tracked for compliance context. Sign-off applies to {dept} jurisdiction.
          </p>
        </div>
      </div>

      {/* Scrollable Body */}
      <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs">
        {/* Desk Governance Summary Card */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 grid grid-cols-2 gap-3">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Assigned Desk</span>
            <span className="font-bold text-slate-900 text-xs mt-0.5 block">Planning / Building Scrutiny</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Scrutiny Route</span>
            <span className="font-bold text-blue-700 text-xs mt-0.5 block">ENHANCED REVIEW</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Fee Status</span>
            <span className="font-bold text-emerald-700 text-xs mt-0.5 block">PAID (Challan Verified)</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">SLA Clock</span>
            <span className="font-bold text-amber-700 text-xs mt-0.5 block">14 Days Remaining</span>
          </div>
        </div>

        {/* Section 1: Parameter & Cross-Form Pre-Check */}
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
          <button
            type="button"
            onClick={() => setOpenSection(openSection === 'scrutiny' ? null : 'scrutiny')}
            className="w-full px-4 py-3 bg-slate-50 font-bold text-slate-900 flex items-center justify-between text-xs border-b border-slate-200 hover:bg-slate-100 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-blue-600" />
              Cross-Form Scrutiny Checks
            </span>
            {openSection === 'scrutiny' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </button>
          {openSection === 'scrutiny' && (
            <div className="p-4 space-y-2.5">
              {[
                { label: 'Plot Area (4,800 m²)', status: 'MIDC Allotment Verified', pass: true },
                { label: 'Building Built-Up Area (3,200 m²)', status: 'Architect Plan Verified', pass: true },
                { label: 'Water Balance (65 KL/day)', status: 'ETP Capacity Matched', pass: true },
                { label: 'Environmental Clearance', status: 'MPCB CTE Certificate Verified', pass: true },
              ].map(item => (
                <div key={item.label} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">{item.label}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.status}</p>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 2: Prerequisites Checklist */}
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
          <button
            type="button"
            onClick={() => setOpenSection(openSection === 'prereqs' ? null : 'prereqs')}
            className="w-full px-4 py-3 bg-slate-50 font-bold text-slate-900 flex items-center justify-between text-xs border-b border-slate-200 hover:bg-slate-100 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-blue-600" />
              Upstream Prerequisites ({parentNodes.length})
            </span>
            {openSection === 'prereqs' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </button>
          {openSection === 'prereqs' && (
            <div className="p-4 space-y-2">
              {parentNodes.length === 0 ? (
                <p className="text-slate-500 italic">No prerequisite nodes required.</p>
              ) : (
                parentNodes.map(parent => (
                  <div key={parent.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{parent.dept}</span>
                      <p className="font-bold text-slate-900">{parent.label}</p>
                    </div>
                    {parent.status === 'completed' ? (
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Pending
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Section 3: Downstream Unlocks Impact */}
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
          <button
            type="button"
            onClick={() => setOpenSection(openSection === 'unlocks' ? null : 'unlocks')}
            className="w-full px-4 py-3 bg-slate-50 font-bold text-slate-900 flex items-center justify-between text-xs border-b border-slate-200 hover:bg-slate-100 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Unlock className="w-4 h-4 text-blue-600" />
              Downstream Unlocks Impact ({childNodes.length})
            </span>
            {openSection === 'unlocks' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </button>
          {openSection === 'unlocks' && (
            <div className="p-4 space-y-2">
              {childNodes.length === 0 ? (
                <p className="text-slate-500 italic">No downstream nodes depend directly on this step.</p>
              ) : (
                childNodes.map(child => (
                  <div key={child.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{child.dept}</span>
                      <p className="font-bold text-slate-900">{child.label}</p>
                    </div>
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                      {child.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Officer Decision Footer Actions */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2">
        <button
          type="button"
          disabled={isCompleted}
          onClick={() => onApproveNode(id)}
          className={`w-full py-3 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm ${
            isCompleted
              ? 'bg-emerald-600 text-white cursor-default'
              : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-98'
          }`}
        >
          <span>{isCompleted ? '✓ Scrutiny Step Approved' : 'Approve Scrutiny & Unlock Downstream'}</span>
          {!isCompleted && <ArrowRight className="w-4 h-4" />}
        </button>

        <button
          type="button"
          onClick={onBackToScrutiny}
          className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs border border-slate-300 text-slate-700 hover:bg-white transition-colors flex items-center justify-center gap-1.5"
        >
          <span>Return to Scrutiny Workbench</span>
        </button>
      </div>
    </aside>
  );
}
