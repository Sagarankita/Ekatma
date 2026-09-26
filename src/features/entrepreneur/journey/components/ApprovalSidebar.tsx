'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
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
} from 'lucide-react';
import type { GraphNodeData } from '../hooks/useDependencyGraph';

interface ApprovalSidebarProps {
  selectedNode: GraphNodeData | null;
  allNodes: GraphNodeData[];
  onClose: () => void;
  onCompleteSubFormStep: (nodeId: string, formIdx: number) => void;
  projectId: string;
}

export function ApprovalSidebar({
  selectedNode,
  allNodes,
  onClose,
  onCompleteSubFormStep,
  projectId,
}: ApprovalSidebarProps) {
  const router = useRouter();

  // Accordion state
  const [openSection, setOpenSection] = useState<'details' | 'prereqs' | 'unlocks' | null>('details');

  if (!selectedNode) return null;

  const { id, title, department, stage, status, subForms, completedSubFormIndices, enrichment, dependencies, unlocks } = selectedNode;

  const isCompleted = status === 'completed';
  const isInProgress = status === 'in-progress';
  const isReady = status === 'ready';
  const isBlocked = status === 'blocked';

  // Find parent prerequisite nodes
  const parentNodes = dependencies
    .map(dep => allNodes.find(n => n.id === dep.reqId))
    .filter(Boolean) as GraphNodeData[];

  // Missing prerequisite nodes that are keeping this node locked
  const uncompletedParents = parentNodes.filter(p => p.status !== 'completed');

  // Downstream child nodes unlocked by this node
  const childNodes = unlocks
    .map(uid => allNodes.find(n => n.id === uid))
    .filter(Boolean) as GraphNodeData[];

  return (
    <aside className="w-full lg:w-[450px] shrink-0 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden sticky top-4 flex flex-col max-h-[calc(100vh-2rem)] z-30 transition-all font-sans">
      {/* Header Bar */}
      <div className="bg-slate-900 text-white p-5 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-300 bg-blue-950 px-2 py-0.5 rounded border border-blue-800 flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              {department}
            </span>
            <span className="text-xs text-slate-400 font-mono">{id}</span>
          </div>
          <h2 className="text-base font-bold leading-snug text-white">{title}</h2>

          {/* Status Badge */}
          <div className="mt-2.5 flex items-center gap-2">
            {isCompleted && (
              <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Completed
              </span>
            )}
            {isInProgress && (
              <span className="text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" /> In Progress
              </span>
            )}
            {isReady && (
              <span className="text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Unlock className="w-3.5 h-3.5 text-amber-400" /> Ready / Unlocked
              </span>
            )}
            {isBlocked && (
              <span className="text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-red-400" /> Blocked / Locked
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

      {/* Lock Warning Callout (if node is blocked) */}
      {isBlocked && uncompletedParents.length > 0 && (
        <div className="p-4 bg-amber-50 border-b border-amber-200 text-amber-900 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <p className="font-bold text-amber-900">
              Blocked: Requires completion of {uncompletedParents.map(p => `"${p.title}"`).join(', ')}
            </p>
            <p className="text-amber-700 mt-1">
              Complete prerequisite approvals first to unlock this requirement.
            </p>
          </div>
        </div>
      )}

      {/* Scrollable Content Body */}
      <div className="p-5 overflow-y-auto flex-1 space-y-5 text-xs">
        {/* Form Dependency Checklist Stepper */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-600" />
              Form Dependency Checklist
            </h3>
            <span className="font-mono font-bold text-slate-600">
              {completedSubFormIndices.length} of {subForms.length} Done
            </span>
          </div>

          <div className="relative pl-4 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {subForms.map((formName, idx) => {
              const isStepDone = completedSubFormIndices.includes(idx);

              return (
                <div key={formName} className="relative flex items-start justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {/* Step Node Marker */}
                  <div
                    className={`absolute -left-4 top-3.5 -translate-x-1/2 w-4 h-4 rounded-full border-2 flex items-center justify-center text-[9px] font-black ${
                      isStepDone
                        ? 'bg-emerald-500 border-emerald-600 text-white'
                        : isBlocked
                        ? 'bg-slate-200 border-slate-300 text-slate-500'
                        : 'bg-white border-blue-600 text-blue-600'
                    }`}
                  >
                    {isStepDone ? '✓' : idx + 1}
                  </div>

                  <div className="pr-2">
                    <p className="font-bold text-slate-900 text-xs leading-snug">{formName}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {isStepDone ? 'Completed & Submitted' : isBlocked ? 'Prerequisite Pending' : 'Action Required'}
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={isStepDone || isBlocked}
                    onClick={() => onCompleteSubFormStep(id, idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                      isStepDone
                        ? 'bg-emerald-100 text-emerald-800 cursor-default'
                        : isBlocked
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-xs'
                    }`}
                  >
                    {isStepDone ? 'Completed' : isBlocked ? 'Locked' : 'Continue'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Collapsible Section: Requirement Details */}
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
          <button
            type="button"
            onClick={() => setOpenSection(openSection === 'details' ? null : 'details')}
            className="w-full px-4 py-3 bg-slate-50 font-bold text-slate-900 flex items-center justify-between text-xs border-b border-slate-200 hover:bg-slate-100 transition-colors"
          >
            <span>What is this & Why required?</span>
            {openSection === 'details' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </button>
          {openSection === 'details' && (
            <div className="p-4 space-y-3 text-slate-600">
              <p className="leading-relaxed">{enrichment?.applicabilitySummary}</p>
              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
                <div>
                  <span className="font-bold text-slate-900 block text-[10px] uppercase">Configured SLA</span>
                  <span className="text-slate-700 font-semibold">{enrichment?.slaConfigured}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-[10px] uppercase">Regulatory Basis</span>
                  <span className="text-slate-700 font-semibold">{enrichment?.regReference}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Collapsible Section: Prerequisites Checklist */}
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
          <button
            type="button"
            onClick={() => setOpenSection(openSection === 'prereqs' ? null : 'prereqs')}
            className="w-full px-4 py-3 bg-slate-50 font-bold text-slate-900 flex items-center justify-between text-xs border-b border-slate-200 hover:bg-slate-100 transition-colors"
          >
            <span>Prerequisite Checklist ({parentNodes.length})</span>
            {openSection === 'prereqs' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </button>
          {openSection === 'prereqs' && (
            <div className="p-4 space-y-2">
              {parentNodes.length === 0 ? (
                <p className="text-slate-500 italic">No prerequisite requirements. Can be started immediately.</p>
              ) : (
                parentNodes.map(parent => (
                  <div key={parent.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                    <span className="font-bold text-slate-900">{parent.title}</span>
                    {parent.status === 'completed' ? (
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Done
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

        {/* Collapsible Section: Downstream Unlocks */}
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
          <button
            type="button"
            onClick={() => setOpenSection(openSection === 'unlocks' ? null : 'unlocks')}
            className="w-full px-4 py-3 bg-slate-50 font-bold text-slate-900 flex items-center justify-between text-xs border-b border-slate-200 hover:bg-slate-100 transition-colors"
          >
            <span>Downstream Unlocks ({childNodes.length})</span>
            {openSection === 'unlocks' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </button>
          {openSection === 'unlocks' && (
            <div className="p-4 space-y-2">
              {childNodes.length === 0 ? (
                <p className="text-slate-500 italic">No downstream dependencies.</p>
              ) : (
                childNodes.map(child => (
                  <div key={child.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{child.department}</span>
                      <p className="font-bold text-slate-900">{child.title}</p>
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

      {/* Primary CTA Footer */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2">
        <button
          type="button"
          disabled={isBlocked}
          onClick={() => router.push(ENTREPRENEUR_ROUTES.requirement(projectId, id))}
          className={`w-full py-3 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm ${
            isBlocked
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-98'
          }`}
        >
          {isBlocked ? (
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4" /> Locked by Prerequisite
            </span>
          ) : (
            <>
              <span>Go to Application</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
