'use client';

import React from 'react';
import Link from 'next/link';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import {
  X,
  Lock,
  Unlock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Clock,
  HelpCircle,
  CornerDownRight,
  Focus,
} from 'lucide-react';
import type { GraphNodeData } from '../hooks/useDependencyGraph';
import { STAGES } from '../data';

interface ApprovalSidebarProps {
  selectedNode: GraphNodeData | null;
  allNodes: GraphNodeData[];
  onClose: () => void;
  onSelectNode: (nodeId: string) => void;
  onCompleteSubFormStep?: (nodeId: string, formIdx: number) => void;
  projectId: string;
}

export function ApprovalSidebar({
  selectedNode,
  allNodes,
  onClose,
  onSelectNode,
  projectId,
}: ApprovalSidebarProps) {
  if (!selectedNode) return null;

  const { id, title, department, stage, status, enrichment, dependencies, unlocks } = selectedNode;

  const isCompleted = status === 'completed';
  const isInProgress = status === 'in-progress';
  const isReady = status === 'ready';
  const isBlocked = status === 'blocked';
  const isConditional = status === 'conditional';

  const stageInfo = STAGES.find(s => s.key === stage);

  // Find parent prerequisite nodes
  const parentNodes = dependencies
    .map(dep => {
      const parent = allNodes.find(n => n.id === dep.reqId);
      return parent ? { ...parent, depType: dep.type, depReason: dep.reason } : null;
    })
    .filter(Boolean) as (GraphNodeData & { depType: string; depReason?: string })[];

  // Find uncompleted parents (keeping this node locked)
  const uncompletedParents = parentNodes.filter(p => p.status !== 'completed');

  // Find downstream child nodes unlocked by this node
  const childNodes = unlocks
    .map(uid => allNodes.find(n => n.id === uid))
    .filter(Boolean) as GraphNodeData[];

  // Determine "Can proceed?" status & explanation
  const canProceedConfig = (() => {
    if (isCompleted) {
      return {
        answer: 'Completed',
        badge: 'Approved & Active',
        badgeCls: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        cardCls: 'bg-emerald-50/70 border-emerald-200 text-emerald-950',
        explanation: 'This clearance has been approved. Conditions are satisfied and active.',
        Icon: CheckCircle2,
      };
    }
    if (isReady) {
      return {
        answer: 'Yes — You can proceed now',
        badge: 'Ready to Apply',
        badgeCls: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        cardCls: 'bg-emerald-50/70 border-emerald-200 text-emerald-950',
        explanation: 'All prerequisite clearances are completed. You can start and submit this application.',
        Icon: Unlock,
      };
    }
    if (isInProgress) {
      return {
        answer: 'Yes — Application in progress',
        badge: 'Draft Open',
        badgeCls: 'bg-blue-100 text-blue-800 border-blue-300',
        cardCls: 'bg-blue-50/70 border-blue-200 text-blue-950',
        explanation: 'Your application is currently in draft. You can continue filling details and submit.',
        Icon: Clock,
      };
    }
    if (isBlocked) {
      return {
        answer: 'No — Blocked by prerequisite',
        badge: 'Waiting for Prerequisite',
        badgeCls: 'bg-amber-100 text-amber-900 border-amber-300',
        cardCls: 'bg-amber-50/70 border-amber-200 text-amber-950',
        explanation: uncompletedParents.length > 0
          ? `Must obtain approval for ${uncompletedParents[0].title} before this application can be started.`
          : 'Prerequisites must be resolved before proceeding.',
        Icon: Lock,
      };
    }
    return {
      answer: 'Conditional — Verification needed',
      badge: 'Conditional Rule',
      badgeCls: 'bg-purple-100 text-purple-800 border-purple-300',
      cardCls: 'bg-purple-50/70 border-purple-200 text-purple-950',
      explanation: 'Applies conditionally based on your verified project parameters.',
      Icon: HelpCircle,
    };
  })();

  // Primary action button configuration
  const primaryActionConfig = (() => {
    if (isReady) {
      return {
        label: 'Start Application →',
        href: ENTREPRENEUR_ROUTES.newApplication(projectId),
        cls: 'bg-[#6DAE7C] hover:bg-[#1542a8] text-white',
      };
    }
    if (isInProgress) {
      return {
        label: 'Continue Application →',
        href: ENTREPRENEUR_ROUTES.newApplication(projectId),
        cls: 'bg-[#6DAE7C] hover:bg-[#1542a8] text-white',
      };
    }
    if (isBlocked && uncompletedParents.length > 0) {
      return {
        label: `Complete Prerequisite (${uncompletedParents[0].department}) →`,
        href: ENTREPRENEUR_ROUTES.requirement(projectId, uncompletedParents[0].id),
        cls: 'bg-amber-700 hover:bg-amber-800 text-white',
      };
    }
    return {
      label: 'View Requirement Details →',
      href: ENTREPRENEUR_ROUTES.requirement(projectId, id),
      cls: 'bg-slate-800 hover:bg-slate-900 text-white',
    };
  })();

  return (
    <aside className="w-full lg:w-[420px] shrink-0 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden sticky top-4 flex flex-col max-h-[calc(100vh-2rem)] z-30 transition-all font-sans">
      {/* ── 1. REQUIREMENT HEADER ── */}
      <div className="bg-[#355E3B] text-white p-5 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#B8D5E5] bg-[#3d7a4d] px-2 py-0.5 rounded border border-[#3A75A4]">
              {department}
            </span>
            <span className="text-[10px] font-semibold text-slate-300">
              Stage {stageInfo?.num ?? '00'} · {stageInfo?.label ?? stage}
            </span>
          </div>
          <h2 className="text-base font-bold leading-snug text-white">
            {title}
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors shrink-0"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* ── SCROLLABLE BODY ── */}
      <div className="p-5 overflow-y-auto flex-1 space-y-5 text-xs text-slate-600">
        {/* ── 2. STATUS ── */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
            Status
          </span>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-md border flex items-center gap-1.5 ${canProceedConfig.badgeCls}`}>
              <canProceedConfig.Icon className="w-3.5 h-3.5" />
              <span>{canProceedConfig.badge}</span>
            </span>
          </div>
        </div>

        {/* ── 3. CAN PROCEED? ── */}
        <div className={`p-4 rounded-xl border ${canProceedConfig.cardCls}`}>
          <div className="flex items-start gap-2.5">
            <canProceedConfig.Icon className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-xs uppercase tracking-wide">
                Can proceed? {canProceedConfig.answer}
              </p>
              <p className="text-[11px] mt-1 leading-relaxed opacity-90">
                {canProceedConfig.explanation}
              </p>
            </div>
          </div>
        </div>

        {/* ── 4. BLOCKED BY (Prerequisites) ── */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Blocked By (Prerequisites)
            </h3>
            <span className="font-mono text-slate-500 font-semibold text-[11px]">
              {parentNodes.length}
            </span>
          </div>

          {parentNodes.length === 0 ? (
            <p className="text-slate-500 italic text-[11px]">
              None — This clearance has no prerequisites and can be initiated directly.
            </p>
          ) : (
            <div className="space-y-2 mt-2">
              {parentNodes.map(parent => {
                const isParentDone = parent.status === 'completed';
                return (
                  <div
                    key={parent.id}
                    className={`p-2.5 rounded-lg border flex items-center justify-between gap-2 text-xs transition-colors ${
                      isParentDone
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-semibold text-slate-900 truncate">
                          {parent.title}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          ({parent.department})
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        {parent.depType === 'conditional' ? 'Conditional trigger' : 'Sequential prerequisite'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          isParentDone
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                            : 'bg-amber-100 text-amber-900 border-amber-200'
                        }`}
                      >
                        {isParentDone ? '✓ Completed' : 'Pending'}
                      </span>
                      <button
                        type="button"
                        onClick={() => onSelectNode(parent.id)}
                        className="text-slate-400 hover:text-slate-700 p-1 rounded hover:bg-slate-100"
                        title="Focus in graph"
                      >
                        <Focus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── 5. BLOCKS (Downstream Requirements) ── */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Blocks (Downstream Requirements)
            </h3>
            <span className="font-mono text-slate-500 font-semibold text-[11px]">
              {childNodes.length}
            </span>
          </div>

          {childNodes.length === 0 ? (
            <p className="text-slate-500 italic text-[11px]">
              None — No downstream clearances are waiting on this requirement.
            </p>
          ) : (
            <div className="space-y-2 mt-2">
              {childNodes.map(child => (
                <div
                  key={child.id}
                  className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between gap-2 text-xs"
                >
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-slate-900 block truncate">
                      {child.title}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {child.department} · {isCompleted ? 'Unlocked' : 'Blocked until this approval'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded border bg-slate-100 text-slate-700 border-slate-200">
                      {child.status}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectNode(child.id)}
                      className="text-slate-400 hover:text-slate-700 p-1 rounded hover:bg-slate-100"
                      title="Focus in graph"
                    >
                      <Focus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── 6. WHY IT APPLIES ── */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
          <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2">
            Why It Applies
          </h3>
          <p className="text-slate-700 leading-relaxed text-xs">
            {enrichment?.applicabilitySummary}
          </p>
          {enrichment?.applicabilityBasis && enrichment.applicabilityBasis.length > 0 && (
            <ul className="mt-2.5 space-y-1 pl-2">
              {enrichment.applicabilityBasis.map(item => (
                <li key={item} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ── 7. PRIMARY ACTION FOOTER ── */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2">
        <Link
          href={primaryActionConfig.href}
          className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs ${primaryActionConfig.cls}`}
        >
          <span>{primaryActionConfig.label}</span>
        </Link>

        {primaryActionConfig.href !== ENTREPRENEUR_ROUTES.requirement(projectId, id) && (
          <div className="text-center pt-1">
            <Link
              href={ENTREPRENEUR_ROUTES.requirement(projectId, id)}
              className="text-[11px] text-[#6DAE7C] hover:underline font-semibold"
            >
              View Full Requirement Detail Page →
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
