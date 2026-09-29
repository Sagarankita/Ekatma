'use client';

import React, { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import {
  CheckCircle2,
  Clock,
  Unlock,
  Lock,
  HelpCircle,
} from 'lucide-react';

export interface ApprovalNodeData {
  id: string;
  title: string;
  department: string;
  stage: string;
  status: 'completed' | 'in-progress' | 'ready' | 'blocked' | 'conditional';
  statusLabel?: string;
  isSelected?: boolean;
  isPrerequisite?: boolean;
  isDownstream?: boolean;
  isDeemphasized?: boolean;
}

function ApprovalNodeComponent({ data, selected }: NodeProps & { data: ApprovalNodeData }) {
  const {
    title,
    department,
    status,
    statusLabel,
    isSelected = selected,
    isPrerequisite,
    isDownstream,
    isDeemphasized,
  } = data;

  const isCompleted = status === 'completed';
  const isInProgress = status === 'in-progress';
  const isReady = status === 'ready';
  const isBlocked = status === 'blocked';
  const isConditional = status === 'conditional';

  // Format Requirement Name (e.g. "MPCB Consent to Operate")
  const displayName = title.toLowerCase().startsWith(department.toLowerCase())
    ? title
    : `${department} ${title}`;

  // Clean status label
  const displayStatus =
    statusLabel ??
    (isCompleted
      ? 'Completed'
      : isInProgress
      ? 'In progress'
      : isReady
      ? 'Ready to apply'
      : isBlocked
      ? 'Pending prerequisite'
      : 'Conditional');

  // Base theme by status
  let containerStyle = 'bg-white border-slate-300';
  let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';
  let StatusIcon = Lock;

  if (isCompleted) {
    containerStyle = 'bg-emerald-50/70 border-emerald-300';
    badgeStyle = 'bg-emerald-100 text-emerald-800 border-emerald-200';
    StatusIcon = CheckCircle2;
  } else if (isInProgress) {
    containerStyle = 'bg-blue-50/70 border-blue-300';
    badgeStyle = 'bg-blue-100 text-blue-800 border-blue-200';
    StatusIcon = Clock;
  } else if (isReady) {
    containerStyle = 'bg-amber-50/90 border-amber-400 ring-1 ring-amber-400/60 shadow-xs';
    badgeStyle = 'bg-amber-500 text-white border-amber-600 font-bold';
    StatusIcon = Unlock;
  } else if (isBlocked) {
    containerStyle = 'bg-white border-slate-300';
    badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';
    StatusIcon = Lock;
  } else if (isConditional) {
    containerStyle = 'bg-purple-50/70 border-purple-300';
    badgeStyle = 'bg-purple-100 text-purple-800 border-purple-200';
    StatusIcon = HelpCircle;
  }

  // Highlight and focus rings
  let relationshipBadge = null;
  if (isSelected) {
    containerStyle += ' ring-3 ring-[#355E3B] border-[#355E3B] shadow-lg scale-[1.03] z-30';
  } else if (isPrerequisite) {
    containerStyle += ' ring-2 ring-emerald-500 border-emerald-500 shadow-md z-20';
    relationshipBadge = (
      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-1.5 py-0.5 rounded inline-flex items-center gap-1">
        <span>Prerequisite</span>
      </span>
    );
  } else if (isDownstream) {
    containerStyle += ' ring-2 ring-amber-500 border-amber-500 shadow-md z-20 bg-amber-50/80';
    relationshipBadge = (
      <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-600 text-white px-2 py-0.5 rounded inline-flex items-center gap-1 shadow-xs">
        <Unlock className="w-3 h-3" />
        <span>Next Unlocking Node</span>
      </span>
    );
  }

  // De-emphasize unrelated nodes when a node is selected
  const deemphasizedStyle = isDeemphasized
    ? 'opacity-25 grayscale-[60%] border-slate-200 bg-slate-50'
    : 'opacity-100';

  return (
    <div
      className={`relative w-[230px] rounded-xl border-2 p-3.5 transition-all duration-200 shadow-xs font-sans select-none cursor-pointer ${containerStyle} ${deemphasizedStyle}`}
    >
      {/* Target handle (left: receives incoming prerequisite dependencies) */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white transition-colors"
      />

      {/* Relationship Tag if highlighted as direct dependency */}
      {relationshipBadge && <div className="mb-1.5">{relationshipBadge}</div>}

      {/* Requirement Name (Clean, readable, no tiny text) */}
      <div className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 min-h-[40px] flex items-center">
        {displayName}
      </div>

      {/* Status (Contains only Requirement name & Status) */}
      <div className="mt-2.5 pt-2 border-t border-slate-200/70 flex items-center justify-between">
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded border inline-flex items-center gap-1 ${badgeStyle}`}
        >
          <StatusIcon className="w-3.5 h-3.5 shrink-0" />
          <span>{displayStatus}</span>
        </span>
      </div>

      {/* Source handle (right: outputs downstream unlocks) */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white transition-colors"
      />
    </div>
  );
}

export const ApprovalNode = memo(ApprovalNodeComponent);
