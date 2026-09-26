'use client';

import React, { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import {
  CheckCircle2,
  Loader2,
  Unlock,
  Lock,
  FileText,
  AlertCircle,
} from 'lucide-react';

export interface ApprovalNodeData {
  id: string;
  title: string;
  department: string;
  stage: string;
  status: 'completed' | 'in-progress' | 'ready' | 'blocked' | 'conditional';
  formsCount: number;
  completedFormsCount: number;
  prerequisitesSummary?: string;
  unlocksSummary?: string;
}

function ApprovalNodeComponent({ data, selected }: NodeProps & { data: ApprovalNodeData }) {
  const { title, department, status, formsCount, completedFormsCount, prerequisitesSummary } = data;

  const isCompleted = status === 'completed';
  const isInProgress = status === 'in-progress';
  const isReady = status === 'ready';
  const isBlocked = status === 'blocked';
  const isConditional = status === 'conditional';

  // Card status styling
  let containerStyle = 'bg-white border-slate-200 shadow-xs hover:border-blue-400';
  let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';
  let StatusIcon = Lock;
  let statusText = 'Blocked';

  if (isCompleted) {
    containerStyle = 'bg-emerald-50/40 border-emerald-300 shadow-xs hover:border-emerald-400';
    badgeStyle = 'bg-emerald-100 text-emerald-800 border-emerald-200';
    StatusIcon = CheckCircle2;
    statusText = 'Completed';
  } else if (isInProgress) {
    containerStyle = 'bg-blue-50/40 border-blue-300 ring-2 ring-blue-400/20 shadow-xs';
    badgeStyle = 'bg-blue-100 text-blue-800 border-blue-200';
    StatusIcon = Loader2;
    statusText = 'In Progress';
  } else if (isReady) {
    containerStyle = 'bg-amber-50/30 border-amber-300 shadow-xs hover:border-amber-400';
    badgeStyle = 'bg-amber-100 text-amber-900 border-amber-200';
    StatusIcon = Unlock;
    statusText = 'Ready';
  } else if (isBlocked) {
    containerStyle = 'bg-slate-50/90 border-slate-300 opacity-80 hover:opacity-100';
    badgeStyle = 'bg-slate-200 text-slate-700 border-slate-300';
    StatusIcon = Lock;
    statusText = 'Blocked';
  } else if (isConditional) {
    containerStyle = 'bg-purple-50/30 border-purple-200 shadow-xs';
    badgeStyle = 'bg-purple-100 text-purple-800 border-purple-200';
    StatusIcon = AlertCircle;
    statusText = 'Conditional';
  }

  const progressPercent = formsCount > 0 ? Math.min(100, Math.round((completedFormsCount / formsCount) * 100)) : 0;

  return (
    <div
      className={`relative w-[260px] rounded-xl border-2 p-3.5 transition-all duration-200 bg-white font-sans ${containerStyle} ${
        selected ? 'ring-4 ring-blue-500/25 border-blue-600 shadow-lg scale-[1.02]' : ''
      }`}
    >
      {/* Target handle (top) */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white transition-colors"
      />

      {/* Top Tag Row */}
      <div className="flex items-center justify-between gap-1.5 mb-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/80">
          {department}
        </span>
        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded border flex items-center gap-1 ${badgeStyle}`}>
          <StatusIcon className={`w-3 h-3 ${isInProgress ? 'animate-spin' : ''}`} />
          <span>{statusText}</span>
        </span>
      </div>

      {/* Node Title */}
      <h3 className="text-xs font-bold text-slate-900 leading-snug mb-2.5 line-clamp-2 min-h-[32px]">
        {title}
      </h3>

      {/* Form Progress Meta Bar */}
      <div className="pt-2 border-t border-slate-100 space-y-1">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-500 flex items-center gap-1 font-medium">
            <FileText className="w-3 h-3 text-slate-400" />
            <span>Sub-Forms</span>
          </span>
          <span className="font-mono font-bold text-slate-700">
            {completedFormsCount}/{formsCount}
          </span>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              isCompleted ? 'bg-emerald-500' : isInProgress ? 'bg-blue-600' : isReady ? 'bg-amber-500' : 'bg-slate-300'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Prerequisite Callout */}
      {isBlocked && prerequisitesSummary && (
        <div className="mt-2 text-[10px] text-slate-500 bg-slate-100/80 p-1.5 rounded border border-slate-200 truncate flex items-center gap-1">
          <Lock className="w-3 h-3 text-slate-400 shrink-0" />
          <span>Needs: {prerequisitesSummary}</span>
        </div>
      )}

      {/* Source handle (bottom) */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white transition-colors"
      />
    </div>
  );
}

export const ApprovalNode = memo(ApprovalNodeComponent);
