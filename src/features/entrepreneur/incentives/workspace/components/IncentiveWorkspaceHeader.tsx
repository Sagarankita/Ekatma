import React from 'react';
import Link from 'next/link';
import { findBusinessProjectById } from '@/features/entrepreneur/businesses/catalog';
import { IncentiveStatus, ClaimStatus } from '../types';
import { useRegulatoryAssistant } from '@/features/regulatory-assistant/Provider';
import { inlineContext } from '@/features/regulatory-assistant/context';

export function IncentiveStatusBadge({ status }: { status: IncentiveStatus }) {
  const cfg = {
    'strong-match':   { label: 'Strong Match',        cls: 'bg-[#f0fdf4] text-[#166534] border-[#86efac]' },
    'conditional':    { label: 'Conditional Match',   cls: 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]' },
    'needs-info':     { label: 'Needs Information',   cls: 'bg-[#f0f9ff] text-[#1e3a5c] border-[#93c5fd]' },
    'not-applicable': { label: 'Not Applicable',      cls: 'bg-[#f8f9fb] text-[#6b7a8d] border-[#d1d9e0]' },
  }[status];
  return <span className={`text-[10px] font-bold px-2 py-0.5 border ${cfg.cls}`}>{cfg.label}</span>;
}

export function ClaimStatusBadge({ status }: { status: ClaimStatus }) {
  const cfg: Record<ClaimStatus, { label: string; cls: string }> = {
    preparing:     { label: 'Preparing',      cls: 'bg-[#f0f4f8] text-[#475569] border-[#d1d9e0]' },
    submitted:     { label: 'Submitted',      cls: 'bg-[#ede9fe] text-[#3730a3] border-[#a5b4fc]' },
    'under-review':{ label: 'Under Review',   cls: 'bg-[#ede9fe] text-[#3730a3] border-[#a5b4fc]' },
    'query-raised':{ label: 'Query Raised',   cls: 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]' },
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
      ? 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]'
      : 'bg-[#f0f4f8] text-[#475569] border-[#d1d9e0]';
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
  const business = findBusinessProjectById(businessId);
  const { openAssistant, pageContext } = useRegulatoryAssistant();
  const handleAssistant = onOpenRegAssistant ?? (() => openAssistant({
    origin: 'inline', mode: 'entity',
    context: inlineContext(pageContext, { pageTitle: title, label: title, entities: { businessId }, recordTitle: title }),
  }));

  return (
    <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
      <div className="max-w-[1320px] mx-auto">
        <nav className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5 flex-wrap">
          {breadcrumb.map((crumb, i) => (
            <React.Fragment key={crumb}>
              {i > 0 && <span className="text-[#d1d9e0]">›</span>}
              {i < breadcrumb.length - 1
                ? (breadcrumbHref ? <Link href={breadcrumbHref} className="hover:text-[#1a56db] hover:underline">{crumb}</Link> : <span className="text-[#1a3a5c] font-medium">{crumb}</span>)
                : <span className="text-[#1a3a5c] font-medium">{crumb}</span>
              }
            </React.Fragment>
          ))}
        </nav>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-xl font-bold text-[#1a3a5c]">{title}</h1>
            {subtitle && <p className="text-xs text-[#6b7a8d] mt-0.5 max-w-2xl">{subtitle}</p>}
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
        <div className="mt-3 flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-[11px] text-[#6b7a8d]">
            <span className="font-semibold text-[#1a3a5c]">{business?.name || businessId}</span>
            <span className="text-[#d1d9e0]">·</span>
            <span>{business?.industry || 'Manufacturing'}</span>
            <span className="text-[#d1d9e0]">·</span>
            <span>{business?.location || 'Location unavailable'}</span>
            <span className="text-[#d1d9e0]">·</span>
            <span>New Unit</span>
            <span className="text-[#d1d9e0]">·</span>
            <span className="font-medium text-[#6366f1]">{business?.subtitle || 'MSME'}</span>
            <span className="text-[#d1d9e0]">·</span>
            <span className="text-[10px] bg-[#f0f4f8] border border-[#d1d9e0] px-1.5 py-0.5 text-[#6b7a8d]">Business DNA v4</span>
          </div>
        </div>
      </div>
    </div>
  );
}


