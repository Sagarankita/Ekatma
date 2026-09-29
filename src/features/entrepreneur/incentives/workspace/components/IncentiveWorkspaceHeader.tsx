import React from 'react';
import Link from 'next/link';
import { IncentiveStatus, ClaimStatus } from '../types';
import { useRegulatoryAssistant } from '@/features/regulatory-assistant/Provider';
import { inlineContext } from '@/features/regulatory-assistant/context';

export function IncentiveStatusBadge({ status }: { status: IncentiveStatus }) {
  const cfg = {
    'strong-match':   { label: 'Strong Match',        cls: 'bg-[#f0fdf4] text-[#166534] border-[#86efac]' },
    'conditional':    { label: 'Conditional Match',   cls: 'bg-[#fdf8e6] text-[#7a5807] border-[#fae69e]' },
    'needs-info':     { label: 'Needs Information',   cls: 'bg-[#f0f9ff] text-[#1e3a5c] border-[#a1cba9]' },
    'not-applicable': { label: 'Not Applicable',      cls: 'bg-[#F9FAF2] text-[#555C56] border-[#d6dfd5]' },
  }[status];
  return <span className={`text-[10px] font-bold px-2 py-0.5 border ${cfg.cls}`}>{cfg.label}</span>;
}

export function ClaimStatusBadge({ status }: { status: ClaimStatus }) {
  const cfg: Record<ClaimStatus, { label: string; cls: string }> = {
    preparing:     { label: 'Preparing',      cls: 'bg-[#F9FAF2] text-[#4A4A4A] border-[#d6dfd5]' },
    submitted:     { label: 'Submitted',      cls: 'bg-[#ede9fe] text-[#3730a3] border-[#a5b4fc]' },
    'under-review':{ label: 'Under Review',   cls: 'bg-[#ede9fe] text-[#3730a3] border-[#a5b4fc]' },
    'query-raised':{ label: 'Query Raised',   cls: 'bg-[#fdf8e6] text-[#7a5807] border-[#fae69e]' },
    resubmitted:   { label: 'Resubmitted',    cls: 'bg-[#f0fdf4] text-[#166534] border-[#86efac]' },
    approved:      { label: 'Approved',       cls: 'bg-[#f0fdf4] text-[#166534] border-[#86efac]' },
    received:      { label: 'Benefit Received', cls: 'bg-[#f0fdf4] text-[#166534] border-[#86efac]' },
  };
  const c = cfg[status];
  return <span className={`text-[10px] font-bold px-2 py-0.5 border ${c.cls}`}>{c.label}</span>;
}

export function SourceBadge({ source }: { source: string }) {
  const verified = source.includes('Verified') || source.includes('Benchmark');
  const selfDecl = source.includes('Self-declared') || source.includes('Assumption');
  const cls = verified
    ? 'bg-[#f0fdf4] text-[#166534] border-[#86efac]'
    : selfDecl
      ? 'bg-[#fdf8e6] text-[#7a5807] border-[#fae69e]'
      : 'bg-[#F9FAF2] text-[#4A4A4A] border-[#d6dfd5]';
  return <span className={`text-[9px] font-semibold px-1.5 py-0.5 border ${cls}`}>{source}</span>;
}

export function IncentiveWorkspaceHeader({
  businessId,
  title, 
  subtitle, 
  breadcrumb,
  breadcrumbHref,
  onOpenRegAssistant,
}: {
  businessId: string;
  title: string; 
  subtitle?: string;
  breadcrumb: string[];
  breadcrumbHref?: string;
  onOpenRegAssistant?: () => void;
}) {
  const { openAssistant, pageContext } = useRegulatoryAssistant();
  const handleAssistant = onOpenRegAssistant ?? (() => openAssistant({
    origin: 'inline', mode: 'entity',
    context: inlineContext(pageContext, { pageTitle: title, label: title, entities: { businessId }, recordTitle: title }),
  }));

  return (
    <div className="bg-white border-b border-[#d6dfd5] px-6 py-4">
      <div className="max-w-[1320px] mx-auto">
        <nav aria-label="Breadcrumb" className="text-xs text-[#555C56] mb-2 flex items-center gap-1.5 flex-wrap">
          {breadcrumb.map((crumb, i) => (
            <React.Fragment key={crumb}>
              {i > 0 && <span className="text-[#d6dfd5]">›</span>}
              {i < breadcrumb.length - 1
                ? (breadcrumbHref ? <Link href={breadcrumbHref} className="hover:text-[#6DAE7C] hover:underline">{crumb}</Link> : <span className="text-[#355E3B] font-medium">{crumb}</span>)
                : <span className="text-[#355E3B] font-medium">{crumb}</span>
              }
            </React.Fragment>
          ))}
        </nav>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-xl font-bold text-[#355E3B]">{title}</h1>
            {subtitle && <p className="text-xs text-[#555C56] mt-0.5 max-w-2xl">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={handleAssistant}
                className="flex items-center gap-1.5 text-xs border border-[#6366f1] text-[#4338ca] px-3 py-1.5 hover:bg-[#eef2ff] transition-colors font-medium"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3"/><path d="M7 4.5A1 1 0 019 5.5c0 .8-1 1.2-1 2M7 10v.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                Ask Regulatory Assistant
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}
