'use client';

import React, { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import {
  CheckCircle2,
  Clock,
  Unlock,
  Lock,
  AlertTriangle,
  Building2,
  ShieldCheck,
} from 'lucide-react';

export interface GovNodeData extends Record<string, unknown> {
  id: string;
  label: string;
  dept: string;
  type: 'midc' | 'external' | 'milestone';
  status: 'completed' | 'current' | 'ready' | 'pending' | 'blocked' | 'conditional';
  ref?: string;
  relationship: string;
  blocking: boolean;
  unlockCondition?: string;
  children?: string[];
  prerequisitesSummary?: string;
}

function GovApprovalNodeComponent({ data, selected }: NodeProps & { data: GovNodeData }) {
  const { label, dept, type, status, ref, relationship, blocking, prerequisitesSummary } = data;

  const isCompleted = status === 'completed';
  const isCurrent = status === 'current';
  const isReady = status === 'ready';
  const isPending = status === 'pending';
  const isBlocked = status === 'blocked';
  const isConditional = status === 'conditional';

  // Card status styling for Government UI
  let containerStyle = 'bg-white border-slate-200 shadow-xs hover:border-blue-400';
  let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';
  let StatusIcon = Lock;
  let statusText = 'Blocked';

  if (isCompleted) {
    containerStyle = 'bg-emerald-50/50 border-emerald-300 shadow-xs hover:border-emerald-400';
    badgeStyle = 'bg-emerald-100 text-emerald-800 border-emerald-200';
    StatusIcon = CheckCircle2;
    statusText = 'Completed';
  } else if (isCurrent) {
    containerStyle = 'bg-slate-900 border-blue-500 ring-2 ring-blue-500/30 shadow-md text-white';
    badgeStyle = 'bg-blue-600 text-white border-blue-500';
    StatusIcon = Clock;
    statusText = 'Current Scrutiny';
  } else if (isReady) {
    containerStyle = 'bg-blue-50/40 border-blue-300 shadow-xs hover:border-blue-400';
    badgeStyle = 'bg-blue-100 text-blue-800 border-blue-200';
    StatusIcon = Unlock;
    statusText = 'Ready to Review';
  } else if (isPending) {
    containerStyle = 'bg-amber-50/40 border-amber-300 shadow-xs';
    badgeStyle = 'bg-amber-100 text-amber-900 border-amber-200';
    StatusIcon = Clock;
    statusText = 'Pending Scrutiny';
  } else if (isBlocked) {
    containerStyle = 'bg-slate-50 border-slate-300 opacity-80 hover:opacity-100';
    badgeStyle = 'bg-slate-200 text-slate-700 border-slate-300';
    StatusIcon = Lock;
    statusText = 'Blocked';
  } else if (isConditional) {
    containerStyle = 'bg-purple-50/40 border-purple-300 shadow-xs';
    badgeStyle = 'bg-purple-100 text-purple-800 border-purple-200';
    StatusIcon = AlertTriangle;
    statusText = 'Conditional';
  }

  return (
    <div
      className={`relative w-[270px] rounded-xl border-2 p-3.5 transition-all duration-200 font-sans ${containerStyle} ${
        selected ? 'ring-4 ring-blue-500/30 border-blue-600 shadow-lg scale-[1.02]' : ''
      }`}
    >
      {/* Target handle (left) */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white transition-colors"
      />

      {/* Top Tag Row */}
      <div className="flex items-center justify-between gap-1.5 mb-2">
        <span
          className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded border flex items-center gap-1 ${
            isCurrent ? 'bg-slate-800 text-blue-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          <Building2 className="w-3 h-3" />
          {dept}
        </span>
        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded border flex items-center gap-1 ${badgeStyle}`}>
          <StatusIcon className="w-3 h-3" />
          <span>{statusText}</span>
        </span>
      </div>

      {/* Node Title */}
      <h3 className={`text-xs font-bold leading-snug mb-2 line-clamp-2 min-h-[32px] ${isCurrent ? 'text-white' : 'text-slate-900'}`}>
        {label}
      </h3>

      {/* Department Type & Reference Meta */}
      <div className={`pt-2 border-t text-[11px] space-y-1 ${isCurrent ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-600'}`}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider opacity-75">Authority:</span>
          <span className="font-semibold text-[11px]">
            {type === 'midc' ? 'MIDC Controlled' : type === 'external' ? 'External Dept' : 'Milestone'}
          </span>
        </div>
        {ref && ref !== '-' && ref !== '—' && (
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider opacity-75">Ref:</span>
            <span className="font-mono text-[10px] font-bold truncate max-w-[150px]">{ref}</span>
          </div>
        )}
      </div>

      {/* Prerequisite Lock Note */}
      {isBlocked && prerequisitesSummary && (
        <div className="mt-2 text-[10px] text-slate-500 bg-slate-100 p-1.5 rounded border border-slate-200 truncate flex items-center gap-1">
          <Lock className="w-3 h-3 text-slate-400 shrink-0" />
          <span>Needs: {prerequisitesSummary}</span>
        </div>
      )}

      {/* Source handle (right) */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white transition-colors"
      />
    </div>
  );
}

export const GovApprovalNode = memo(GovApprovalNodeComponent);
