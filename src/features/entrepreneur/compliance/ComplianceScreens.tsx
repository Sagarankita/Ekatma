'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  Calendar,
  FileText,
  Upload,
  RefreshCw,
  Send,
  Eye,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Building2,
  ExternalLink,
  Search,
  Check,
  X,
  FileCheck,
  AlertCircle,
  Layers,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { findComplianceById, type ComplianceObligation, type ComplianceStatus } from './data';
import { RegAssistantTrigger, type RegAssistantContext } from '../regulatory-assistant/Trigger';

const SOURCE_APPROVAL_UNAVAILABLE = 'Source approval unavailable until an exact business, application, and decision relationship is documented.';
const DOCUMENT_UNAVAILABLE = 'No document for this obligation is bound to the current business.';

function complianceStatusBadge(s: ComplianceStatus) {
  const map: Record<ComplianceStatus, string> = {
    'Compliant': 'border-[#86efac] bg-[#dcfce7] text-[#166534]',
    'Due Soon': 'border-[#fcd34d] bg-[#fef3c7] text-[#92400e]',
    'Overdue': 'border-[#fca5a5] bg-[#fee2e2] text-[#b91c1c]',
    'Action Required': 'border-[#fca5a5] bg-[#fee2e2] text-[#b91c1c]',
    'Under Verification': 'border-[#93c5fd] bg-[#dbeafe] text-[#1e40af]',
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 border rounded-sm uppercase tracking-wide ${map[s] || 'border-slate-200 bg-slate-50 text-slate-700'}`}>
      {s}
    </span>
  );
}

function getComplianceSection(o: ComplianceObligation): 'action' | 'dueSoon' | 'upcoming' | 'compliant' {
  if (o.status === 'Compliant') return 'compliant';
  if (o.status === 'Action Required' || o.status === 'Overdue') return 'action';
  if (o.status === 'Due Soon') {
    if (o.dueDateMs && o.dueDateMs < new Date('2027-01-01').getTime()) {
      return 'dueSoon';
    }
    return 'upcoming';
  }
  return 'upcoming';
}

function getRowPrimaryActionLabel(o: ComplianceObligation): string {
  if (o.status === 'Compliant') return 'View Requirement';
  if (o.category === 'Renewals') return 'Renew';
  if (o.category === 'Periodic Returns' || o.name.toLowerCase().includes('return') || o.name.toLowerCase().includes('audit')) {
    return 'Submit Return';
  }
  if (o.requiredDocs.length > 0 || o.name.toLowerCase().includes('report') || o.name.toLowerCase().includes('manifest')) {
    return 'Upload Evidence';
  }
  return 'Respond';
}

// ── E24 ──────────────────────────────────────────────────────────────────────

export function E24CompliancePage({
  obligations,
  canOpenDocuments = false,
  onBack,
  onGoToObligation,
  onGoToE23,
  onGoToE11,
  onOpenRegAssistant,
}: {
  obligations: ComplianceObligation[];
  canOpenDocuments?: boolean;
  onBack: () => void;
  onGoToObligation: (id: string) => void;
  onGoToE23?: () => void;
  onGoToE11: () => void;
  onOpenRegAssistant?: (ctx: RegAssistantContext) => void;
}) {
  const [activeTab, setActiveTab] = useState<'all' | 'action' | 'dueSoon' | 'upcoming' | 'compliant'>('all');
  const [deptFilter, setDeptFilter] = useState('All');
  const [catFilter, setCatFilter] = useState('All');
  const [showTimelineDrawer, setShowTimelineDrawer] = useState(false);

  // Filtered obligations by dropdowns
  const filtered = obligations.filter(o => {
    if (deptFilter !== 'All' && o.dept !== deptFilter) return false;
    if (catFilter !== 'All' && o.category !== catFilter) return false;
    return true;
  });

  // Calculate 4 core executive question metrics across all supplied obligations
  const actionList = obligations.filter(o => getComplianceSection(o) === 'action');
  const dueSoonList = obligations.filter(o => getComplianceSection(o) === 'dueSoon');
  const overdueList = obligations.filter(o => o.status === 'Overdue');
  const upcomingList = obligations.filter(o => getComplianceSection(o) === 'upcoming');
  const compliantList = obligations.filter(o => getComplianceSection(o) === 'compliant');

  // Filtered lists for rendering sections
  const filteredAction = filtered.filter(o => getComplianceSection(o) === 'action');
  const filteredDueSoon = filtered.filter(o => getComplianceSection(o) === 'dueSoon');
  const filteredUpcoming = filtered.filter(o => getComplianceSection(o) === 'upcoming');
  const filteredCompliant = filtered.filter(o => getComplianceSection(o) === 'compliant');

  // Timeline / Month helper for the compact collapsible calendar drawer
  const calMonths = [
    { label: 'October 2026', year: 2026, month: 9 },
    { label: 'November 2026', year: 2026, month: 10 },
    { label: 'December 2026', year: 2026, month: 11 },
    { label: 'March 2027', year: 2027, month: 2 },
    { label: 'September 2027', year: 2027, month: 8 },
    { label: 'December 2027', year: 2027, month: 11 },
  ];

  function obligationsForMonth(year: number, month: number) {
    return obligations.filter(o => {
      if (o.dueDate === 'Ongoing') return false;
      const d = new Date(o.dueDateMs);
      return d.getFullYear() === year && d.getMonth() === month;
    });
  }

  // Render a uniform tabular section
  const renderObligationTable = (items: ComplianceObligation[], accentColor: string) => {
    return (
      <div className="overflow-x-auto border border-[#e2e8f0] rounded bg-white">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-[#f8f9fb] border-b border-[#e2e8f0]">
              <th className="text-left px-3.5 py-2.5 text-[10px] font-bold text-[#64748b] uppercase tracking-wider border-r border-[#e8edf2]">
                Obligation
              </th>
              <th className="text-left px-3.5 py-2.5 text-[10px] font-bold text-[#64748b] uppercase tracking-wider border-r border-[#e8edf2]">
                Department
              </th>
              <th className="text-left px-3.5 py-2.5 text-[10px] font-bold text-[#64748b] uppercase tracking-wider border-r border-[#e8edf2]">
                Due Date
              </th>
              <th className="text-left px-3.5 py-2.5 text-[10px] font-bold text-[#64748b] uppercase tracking-wider border-r border-[#e8edf2]">
                Frequency
              </th>
              <th className="text-left px-3.5 py-2.5 text-[10px] font-bold text-[#64748b] uppercase tracking-wider border-r border-[#e8edf2]">
                Status
              </th>
              <th className="text-left px-3.5 py-2.5 text-[10px] font-bold text-[#64748b] uppercase tracking-wider border-r border-[#e8edf2]">
                Required Action
              </th>
              <th className="text-right px-3.5 py-2.5 text-[10px] font-bold text-[#64748b] uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1f5f9]">
            {items.map(o => {
              const actionLabel = getRowPrimaryActionLabel(o);
              return (
                <tr
                  key={o.id}
                  onClick={() => onGoToObligation(o.id)}
                  className="hover:bg-[#f8f9fb] transition-colors cursor-pointer"
                >
                  <td className="px-3.5 py-3 border-r border-[#f1f5f9] max-w-[240px]">
                    <span className="font-mono text-[10px] font-bold text-[#64748b] bg-[#f1f5f9] px-1.5 py-0.2 border border-[#e2e8f0] rounded inline-block mb-1">
                      {o.id}
                    </span>
                    <p className="font-semibold text-[#1a3a5c] text-xs leading-snug hover:text-[#1a56db]">
                      {o.name}
                    </p>
                    <span className="text-[10px] text-[#64748b]">{o.category}</span>
                  </td>

                  <td className="px-3.5 py-3 whitespace-nowrap text-[#475569] font-medium border-r border-[#f1f5f9]">
                    <span className="bg-[#f1f5f9] px-2 py-0.5 rounded text-[11px] font-bold text-[#334155] border border-[#e2e8f0]">
                      {o.dept}
                    </span>
                  </td>

                  <td className="px-3.5 py-3 whitespace-nowrap border-r border-[#f1f5f9]">
                    <span className={`font-bold block ${o.status === 'Overdue' ? 'text-[#b91c1c]' : o.status === 'Due Soon' ? 'text-[#d97706]' : 'text-[#1a3a5c]'}`}>
                      {o.dueDate}
                    </span>
                    <span className="text-[10px] text-[#64748b]">Statutory Deadline</span>
                  </td>

                  <td className="px-3.5 py-3 text-[#475569] border-r border-[#f1f5f9] max-w-[140px]">
                    {o.frequency}
                  </td>

                  <td className="px-3.5 py-3 whitespace-nowrap border-r border-[#f1f5f9]">
                    {complianceStatusBadge(o.status)}
                  </td>

                  <td className="px-3.5 py-3 text-[#334155] border-r border-[#f1f5f9] max-w-[260px]">
                    {o.actionRequired ? (
                      <p className="text-xs leading-relaxed line-clamp-2 text-[#334155]">
                        {o.actionRequired}
                      </p>
                    ) : (
                      <span className="text-[11px] text-[#166534] font-medium flex items-center gap-1">
                        <Check className="w-3 h-3 text-[#166534]" /> Compliant for current period
                      </span>
                    )}
                  </td>

                  <td className="px-3.5 py-3 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onGoToObligation(o.id);
                      }}
                      className={`text-xs font-semibold px-2.5 py-1 rounded transition-colors inline-flex items-center gap-1 ${
                        actionLabel === 'Upload Evidence' || actionLabel === 'Submit Return' || actionLabel === 'Renew'
                          ? 'bg-[#1a3a5c] text-white hover:bg-[#0f2540] shadow-2xs'
                          : 'border border-[#d1d9e0] text-[#1a56db] hover:bg-[#f1f5f9]'
                      }`}
                    >
                      <span>{actionLabel}</span>
                      <span>→</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      {/* Top Breadcrumb & Header Bar */}
      <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
        <div className="max-w-[1280px] mx-auto">
          <nav aria-label="Breadcrumb" className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5">
            <button onClick={onBack} className="hover:text-[#1a3a5c] hover:underline">
              Dashboard
            </button>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">Compliance Dashboard</span>
          </nav>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-[#1a3a5c]">Compliance Dashboard</h1>
              <p className="mt-0.5 text-xs text-[#6b7a8d]">Track obligations, deadlines, and filings.</p>
            </div>
            {onOpenRegAssistant && (
              <RegAssistantTrigger
                lang="en"
                size="sm"
                onClick={() =>
                  onOpenRegAssistant({
                    entryPoint: 'compliance',
                    initialQuestion: 'What is this compliance obligation?',
                  })
                }
              />
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-6 space-y-6">
        {/* ========================================================================= */}
        {/* THE 4 QUESTIONS: EXECUTIVE CLARITY COCKPIT                                */}
        {/* ========================================================================= */}
        <section aria-label="Compliance Status Overview" className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#334155]">Compliance overview</span>
            <span className="text-xs text-[#64748b]">
              Total Active Obligations: <strong>{obligations.length}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. WHAT NEEDS ACTION? */}
            <div className="bg-white border border-[#fca5a5] border-l-4 border-l-[#b91c1c] p-4 rounded-lg shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#b91c1c] flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> WHAT NEEDS ACTION?
              </span>
              <p className="text-2xl font-bold text-[#b91c1c]">
                {actionList.length} Action{actionList.length === 1 ? '' : 's'} Required
              </p>
              <p className="text-[11px] text-[#475569] leading-snug">
                {actionList.length > 0
                  ? 'Immediate evidence uploads or registers requiring your input.'
                  : 'No immediate action required on pending items.'}
              </p>
            </div>

            {/* 2. WHAT IS DUE? */}
            <div className="bg-white border border-[#fcd34d] border-l-4 border-l-[#d97706] p-4 rounded-lg shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#92400e] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> WHAT IS DUE?
              </span>
              <p className="text-2xl font-bold text-[#d97706]">
                {dueSoonList.length} Due Soon
              </p>
              <p className="text-[11px] text-[#475569] leading-snug">
                Deadlines approaching within current 90-day operational cycle.
              </p>
            </div>

            {/* 3. WHAT IS OVERDUE? */}
            <div className={`bg-white border p-4 rounded-lg shadow-2xs space-y-1 ${
              overdueList.length > 0
                ? 'border-[#fca5a5] border-l-4 border-l-[#b91c1c]'
                : 'border-[#86efac] border-l-4 border-l-[#15803d]'
            }`}>
              <span className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                overdueList.length > 0 ? 'text-[#b91c1c]' : 'text-[#166534]'
              }`}>
                <ShieldCheck className="w-3.5 h-3.5" /> WHAT IS OVERDUE?
              </span>
              <p className={`text-2xl font-bold ${
                overdueList.length > 0 ? 'text-[#b91c1c]' : 'text-[#166534]'
              }`}>
                {overdueList.length} Overdue
              </p>
              <p className="text-[11px] text-[#475569] leading-snug">
                {overdueList.length > 0
                  ? 'Urgent: Overdue statutory items subject to penalties.'
                  : 'All statutory filings currently compliant & in window.'}
              </p>
            </div>

            {/* 4. WHAT IS UPCOMING? */}
            <div className="bg-white border border-[#bfdbfe] border-l-4 border-l-[#1d4ed8] p-4 rounded-lg shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1e40af] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> WHAT IS UPCOMING?
              </span>
              <p className="text-2xl font-bold text-[#1e40af]">
                {upcomingList.length} Upcoming
              </p>
              <p className="text-[11px] text-[#475569] leading-snug">
                Subsequent cycles & future fiscal year obligations scheduled.
              </p>
            </div>
          </div>
        </section>

        {/* Source Notice & Regulatory Provenance Banner */}
        <div className="bg-white border border-[#bfdbfe] border-l-4 border-l-[#1d4ed8] p-4 text-xs text-[#1e3a8a] rounded-lg shadow-2xs flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <p>
              Compliance obligations below were generated from the conditions attached to your MPCB Consent to Establish approval ({' '}
              <button
                type="button"
                onClick={onGoToE23}
                disabled={!onGoToE23}
                title={!onGoToE23 ? SOURCE_APPROVAL_UNAVAILABLE : undefined}
                className="underline font-bold hover:text-[#1e40af] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                CTE-2026-MPCB-41872
              </button>
              {' '}) and other active department approvals.
            </p>
            {!canOpenDocuments && <p className="text-[#475569]">{DOCUMENT_UNAVAILABLE}</p>}
            {!onGoToE23 && <p className="text-[#475569]">{SOURCE_APPROVAL_UNAVAILABLE}</p>}
          </div>
          <button
            type="button"
            onClick={onGoToE11}
            disabled={!canOpenDocuments}
            title={!canOpenDocuments ? DOCUMENT_UNAVAILABLE : undefined}
            className="text-xs bg-[#1e40af] text-white hover:bg-[#1e3a8a] px-3 py-1.5 rounded font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            Document Centre →
          </button>
        </div>

        {/* ========================================================================= */}
        {/* SECTION TABS & COMPACT CONTROLS BAR                                       */}
        {/* ========================================================================= */}
        <div className="bg-white border border-[#e2e8f0] p-4 rounded-lg shadow-2xs flex flex-wrap gap-4 items-center justify-between">
          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`text-xs px-3 py-1.5 font-semibold rounded transition-colors ${
                activeTab === 'all'
                  ? 'bg-[#1a3a5c] text-white shadow-2xs'
                  : 'text-[#475569] hover:bg-[#f1f5f9] border border-[#d1d9e0]'
              }`}
            >
              All Sections ({filtered.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('action')}
              className={`text-xs px-3 py-1.5 font-semibold rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'action'
                  ? 'bg-[#b91c1c] text-white shadow-2xs'
                  : 'text-[#b91c1c] bg-[#fef2f2] hover:bg-[#fee2e2] border border-[#fca5a5]'
              }`}
            >
              <span>Action Required</span>
              <span className="text-[10px] bg-white text-[#b91c1c] px-1.5 py-0.2 rounded-full font-bold">
                {filteredAction.length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('dueSoon')}
              className={`text-xs px-3 py-1.5 font-semibold rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'dueSoon'
                  ? 'bg-[#d97706] text-white shadow-2xs'
                  : 'text-[#92400e] bg-[#fffbeb] hover:bg-[#fef3c7] border border-[#fcd34d]'
              }`}
            >
              <span>Due Soon</span>
              <span className="text-[10px] bg-white text-[#92400e] px-1.5 py-0.2 rounded-full font-bold">
                {filteredDueSoon.length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('upcoming')}
              className={`text-xs px-3 py-1.5 font-semibold rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'upcoming'
                  ? 'bg-[#1e40af] text-white shadow-2xs'
                  : 'text-[#1e40af] bg-[#eff6ff] hover:bg-[#dbeafe] border border-[#bfdbfe]'
              }`}
            >
              <span>Upcoming</span>
              <span className="text-[10px] bg-white text-[#1e40af] px-1.5 py-0.2 rounded-full font-bold">
                {filteredUpcoming.length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('compliant')}
              className={`text-xs px-3 py-1.5 font-semibold rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'compliant'
                  ? 'bg-[#15803d] text-white shadow-2xs'
                  : 'text-[#166534] bg-[#f0fdf4] hover:bg-[#dcfce7] border border-[#86efac]'
              }`}
            >
              <span>Completed / Compliant</span>
              <span className="text-[10px] bg-white text-[#166534] px-1.5 py-0.2 rounded-full font-bold">
                {filteredCompliant.length}
              </span>
            </button>
          </div>

          {/* Filters & Compact Drawer Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Department</label>
              <select
                value={deptFilter}
                onChange={e => setDeptFilter(e.target.value)}
                className="text-xs border border-[#d1d9e0] rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-[#1a56db]"
              >
                {['All', 'MPCB', 'Fire', 'DISH'].map(v => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Category</label>
              <select
                value={catFilter}
                onChange={e => setCatFilter(e.target.value)}
                className="text-xs border border-[#d1d9e0] rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-[#1a56db]"
              >
                {['All', 'Environmental', 'Approval Conditions', 'Renewals', 'Periodic Returns'].map(v => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>

            {(deptFilter !== 'All' || catFilter !== 'All') && (
              <button
                type="button"
                onClick={() => {
                  setDeptFilter('All');
                  setCatFilter('All');
                }}
                className="text-xs text-[#b91c1c] hover:underline font-semibold"
              >
                Clear
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowTimelineDrawer(!showTimelineDrawer)}
              className="text-xs border border-[#d1d9e0] px-2.5 py-1 rounded text-[#475569] hover:bg-[#f1f5f9] flex items-center gap-1 font-medium"
            >
              <Calendar className="w-3.5 h-3.5 text-[#64748b]" />
              <span>{showTimelineDrawer ? 'Hide Timeline Drawer' : 'Timeline Drawer'}</span>
            </button>
          </div>
        </div>

        {/* Optional Compact Calendar / Timeline Drawer */}
        {showTimelineDrawer && (
          <div className="bg-white border border-[#e2e8f0] rounded-lg p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-2">
              <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#1a56db]" />
                Upcoming Compliance Deadlines Timeline
              </p>
              <button
                type="button"
                onClick={() => setShowTimelineDrawer(false)}
                className="text-xs text-[#64748b] hover:text-[#1a3a5c]"
              >
                ✕ Close Drawer
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {calMonths.map(m => {
                const obs = obligationsForMonth(m.year, m.month);
                if (obs.length === 0) return null;
                return (
                  <div key={m.label} className="border border-[#e2e8f0] rounded p-3 bg-[#f8f9fb] space-y-2">
                    <p className="text-xs font-bold text-[#1a3a5c] border-b border-[#e2e8f0] pb-1">
                      {m.label}
                    </p>
                    <div className="space-y-1.5">
                      {obs.map(o => (
                        <div
                          key={o.id}
                          onClick={() => onGoToObligation(o.id)}
                          className="flex items-center justify-between gap-2 p-1.5 bg-white rounded border border-[#e2e8f0] hover:border-[#1a56db] cursor-pointer"
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-[#1a3a5c] truncate">{o.name}</p>
                            <span className="text-[10px] text-[#64748b]">{o.dueDate}</span>
                          </div>
                          <span className="shrink-0">{complianceStatusBadge(o.status)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* THE 4 CLEAR OPERATIONAL SECTIONS                                          */}
        {/* ========================================================================= */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-[#e2e8f0] rounded-lg p-12 text-center text-[#94a3b8] space-y-2">
            <ShieldCheck className="w-10 h-10 text-[#cbd5e1] mx-auto" />
            <p className="text-sm font-semibold text-[#64748b]">No obligations match the current filters.</p>
            <p className="text-xs text-[#94a3b8]">Reset filters above to view all statutory compliance items.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* ── SECTION 1: ACTION REQUIRED ─────────────────────────────────── */}
            {(activeTab === 'all' || activeTab === 'action') && filteredAction.length > 0 && (
              <section aria-labelledby="section-action-required" className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#fca5a5] pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#fee2e2] flex items-center justify-center">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#b91c1c]" />
                    </div>
                    <div>
                      <h2 id="section-action-required" className="text-sm font-bold text-[#b91c1c] uppercase tracking-wide">
                        Action Required ({filteredAction.length})
                      </h2>
                      <p className="text-xs text-[#64748b]">
                        Statutory evidence submissions and ongoing registers requiring immediate action
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#fee2e2] text-[#b91c1c] border border-[#fca5a5]">
                    Requires Response
                  </span>
                </div>

                {renderObligationTable(filteredAction, 'red')}
              </section>
            )}

            {/* ── SECTION 2: DUE SOON ─────────────────────────────────────────── */}
            {(activeTab === 'all' || activeTab === 'dueSoon') && filteredDueSoon.length > 0 && (
              <section aria-labelledby="section-due-soon" className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#fcd34d] pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#fef3c7] flex items-center justify-center">
                      <Clock className="w-3.5 h-3.5 text-[#d97706]" />
                    </div>
                    <div>
                      <h2 id="section-due-soon" className="text-sm font-bold text-[#92400e] uppercase tracking-wide">
                        Due Soon ({filteredDueSoon.length})
                      </h2>
                      <p className="text-xs text-[#64748b]">
                        Deadlines approaching within the current operational cycle (within 90 days)
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#fef3c7] text-[#92400e] border border-[#fcd34d]">
                    Approaching Deadline
                  </span>
                </div>

                {renderObligationTable(filteredDueSoon, 'amber')}
              </section>
            )}

            {/* ── SECTION 3: UPCOMING ─────────────────────────────────────────── */}
            {(activeTab === 'all' || activeTab === 'upcoming') && filteredUpcoming.length > 0 && (
              <section aria-labelledby="section-upcoming" className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#bfdbfe] pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#eff6ff] flex items-center justify-center">
                      <Calendar className="w-3.5 h-3.5 text-[#1e40af]" />
                    </div>
                    <div>
                      <h2 id="section-upcoming" className="text-sm font-bold text-[#1e40af] uppercase tracking-wide">
                        Upcoming ({filteredUpcoming.length})
                      </h2>
                      <p className="text-xs text-[#64748b]">
                        Scheduled statutory reporting for subsequent periods and future fiscal cycles
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#eff6ff] text-[#1e40af] border border-[#bfdbfe]">
                    Scheduled Cycle
                  </span>
                </div>

                {renderObligationTable(filteredUpcoming, 'blue')}
              </section>
            )}

            {/* ── SECTION 4: COMPLETED / COMPLIANT ────────────────────────────── */}
            {(activeTab === 'all' || activeTab === 'compliant') && filteredCompliant.length > 0 && (
              <section aria-labelledby="section-compliant" className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#86efac] pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#dcfce7] flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#166534]" />
                    </div>
                    <div>
                      <h2 id="section-compliant" className="text-sm font-bold text-[#166534] uppercase tracking-wide">
                        Completed / Compliant ({filteredCompliant.length})
                      </h2>
                      <p className="text-xs text-[#64748b]">
                        Actively verified and compliant statutory obligations with valid licenses
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#dcfce7] text-[#166534] border border-[#86efac]">
                    Verified in Order
                  </span>
                </div>

                {renderObligationTable(filteredCompliant, 'green')}
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

// ── E25 ──────────────────────────────────────────────────────────────────────

export function E25ComplianceDetailPage({
  obligationId,
  canOpenDocuments = false,
  canOpenDocument,
  onBack,
  onGoToE24,
  onGoToE23,
  onGoToE11,
  onGoToDocDetail,
  onOpenRegAssistant,
}: {
  obligationId: string;
  canOpenDocuments?: boolean;
  canOpenDocument?: (id: string) => boolean;
  onBack: () => void;
  onGoToE24: () => void;
  onGoToE23?: () => void;
  onGoToE11: () => void;
  onGoToDocDetail: (id: string) => void;
  onOpenRegAssistant?: (ctx: RegAssistantContext) => void;
}) {
  const obl = findComplianceById(obligationId) ?? (() => {
    throw new Error(`Unknown compliance obligation: ${obligationId}`);
  })();

  // Interactive submission state
  const [submittedState, setSubmittedState] = useState<{ date: string; ref: string; state: string } | null>(null);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [simulatedDocName, setSimulatedDocName] = useState('');
  const [actionRemarks, setActionRemarks] = useState('');
  const [showLegalBasis, setShowLegalBasis] = useState(false);

  // Regulatory Assistant State
  const [ragOpen, setRagOpen] = useState(false);
  const [ragInput, setRagInput] = useState('');
  const [ragMessages, setRagMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);

  // Determine obvious primary action
  const primaryActionLabel = ((): 'Submit Return' | 'Renew' | 'Upload Evidence' | 'Respond' | 'View Requirement' => {
    if (submittedState || obl.status === 'Compliant') return 'View Requirement';
    if (obl.category === 'Renewals') return 'Renew';
    if (obl.category === 'Periodic Returns' || obl.name.toLowerCase().includes('return') || obl.name.toLowerCase().includes('audit')) {
      return 'Submit Return';
    }
    if (obl.requiredDocs.length > 0 || obl.name.toLowerCase().includes('report') || obl.name.toLowerCase().includes('manifest')) {
      return 'Upload Evidence';
    }
    return 'Respond';
  })();

  const currentStatus: ComplianceStatus = submittedState ? 'Under Verification' : obl.status;
  const currentVerification = submittedState ? 'Under Verification' : obl.verification;
  const currentPreviousSubmission = submittedState || obl.previousSubmission;

  // Handle simulation of action submission
  const handleCompleteSubmission = () => {
    const mockRef = `SUB-2026-${obl.dept}-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmittedState({
      date: '29 Sep 2026',
      ref: mockRef,
      state: 'Under Verification',
    });
    setIsActionModalOpen(false);
  };

  const SUGGESTED_PROMPTS = [
    'Why is this compliance obligation required?',
    'Which approval created it?',
    'What condition does it relate to?',
    'What documents are required?',
    'When is it due?',
    'What should I submit?',
  ];

  function handleRagSend(text: string) {
    if (!text.trim()) return;
    const responses: Record<string, string> = {
      'Why is this compliance obligation required?': obl.whyRequired,
      'Which approval created it?': `This obligation originates from approval ${obl.sourceApprovalId}. The relevant condition is: "${obl.relevantCondition}"`,
      'What condition does it relate to?': `${obl.sourceCondition}: ${obl.relevantCondition}`,
      'What documents are required?': obl.requiredDocs.length
        ? obl.requiredDocs.map(d => d.name).join(', ')
        : 'No specific document upload is required for this obligation — maintain internal records per the condition.',
      'When is it due?': `Due: ${obl.dueDate}. Frequency: ${obl.frequency}.${obl.nextDueDate ? ` Next due: ${obl.nextDueDate}.` : ''}`,
      'What should I submit?': obl.actionRequired || 'No submission is currently required. This obligation is compliant.',
    };
    const reply =
      responses[text] ||
      `For specific guidance on ${obl.name}, refer to the source approval and relevant regulatory rule, or contact the ${obl.dept} department directly.`;
    setRagMessages(prev => [...prev, { role: 'user', text }, { role: 'assistant', text: reply }]);
    setRagInput('');
  }

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      {/* Top Header & Breadcrumb Bar */}
      <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
        <div className="max-w-[1100px] mx-auto">
          <nav aria-label="Breadcrumb" className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5">
            <button onClick={onBack} className="hover:text-[#1a3a5c] hover:underline">
              Dashboard
            </button>
            <span>›</span>
            <button onClick={onGoToE24} className="hover:text-[#1a3a5c] hover:underline">
              Compliance Dashboard
            </button>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">{obl.id}</span>
          </nav>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-[#64748b] bg-[#f1f5f9] px-2 py-0.5 border border-[#e2e8f0] rounded">
                  {obl.id}
                </span>
                <h1 className="text-xl font-bold text-[#1a3a5c]">{obl.name}</h1>
                {complianceStatusBadge(currentStatus)}
              </div>
              <p className="text-xs text-[#6b7a8d] mt-1">
                {obl.dept} · {obl.category} · Due Date: <strong>{obl.dueDate}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2">
              {onOpenRegAssistant && (
                <RegAssistantTrigger
                  lang="en"
                  size="sm"
                  onClick={() =>
                    onOpenRegAssistant({
                      entryPoint: 'compliance',
                      recordId: obl.id,
                      recordName: obl.name,
                      department: obl.dept,
                      initialQuestion: 'What is this compliance obligation?',
                    })
                  }
                />
              )}
              <button
                type="button"
                onClick={onGoToE24}
                className="text-xs border border-[#d1d9e0] text-[#475569] px-3 py-1.5 hover:bg-[#f1f5f9] rounded font-medium"
              >
                ← Back to Compliance
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Action Hero Notification Banner */}
          {submittedState ? (
            <div className="bg-[#f0fdf4] border border-[#86efac] border-l-4 border-l-[#15803d] p-4 rounded-lg shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-[#166534] font-bold text-xs uppercase tracking-wide">
                <CheckCircle2 className="w-4 h-4 text-[#166534]" />
                <span>Submission Recorded & Under Department Verification</span>
              </div>
              <p className="text-xs text-[#334155]">
                Your compliance filing was received on <strong>{submittedState.date}</strong> under acknowledgment reference{' '}
                <strong className="font-mono text-[#1a3a5c]">{submittedState.ref}</strong>.
              </p>
            </div>
          ) : obl.actionRequired ? (
            <div
              className={`p-4 rounded-lg shadow-2xs border-l-4 space-y-2 ${
                obl.status === 'Overdue'
                  ? 'bg-[#fef2f2] border border-[#fca5a5] border-l-[#b91c1c]'
                  : 'bg-[#fffbeb] border border-[#fcd34d] border-l-[#d97706]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                    obl.status === 'Overdue' ? 'text-[#b91c1c]' : 'text-[#92400e]'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>ACTION REQUIRED</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-[#fcd34d] text-[#92400e]">
                  Due: {obl.dueDate}
                </span>
              </div>
              <p
                className={`text-xs font-medium leading-relaxed ${
                  obl.status === 'Overdue' ? 'text-[#b91c1c]' : 'text-[#92400e]'
                }`}
              >
                {obl.actionRequired}
              </p>
            </div>
          ) : null}

          {/* ===================================================================== */}
          {/* THE 9 CORE SPECIFICATION FIELDS                                       */}
          {/* ===================================================================== */}
          <section aria-labelledby="section-obligation-spec" className="bg-white border border-[#e2e8f0] rounded-lg overflow-hidden shadow-2xs">
            <div className="px-5 py-3 border-b border-[#e2e8f0] bg-[#f8f9fb] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">
                  Statutory Specification
                </span>
                <h2 id="section-obligation-spec" className="text-sm font-bold text-[#1a3a5c]">
                  Obligation Parameters (9 Core Criteria)
                </h2>
              </div>
              <span className="text-xs text-[#64748b]">ID: <strong>{obl.id}</strong></span>
            </div>

            <div className="divide-y divide-[#f1f5f9] text-xs">
              {/* 1. Obligation */}
              <div className="px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-[#64748b] font-medium shrink-0 w-36">1. Obligation</span>
                <div className="text-right sm:text-right">
                  <p className="font-bold text-[#1a3a5c] text-xs">{obl.name}</p>
                  <span className="text-[11px] text-[#64748b]">{obl.category} · {obl.dept}</span>
                </div>
              </div>

              {/* 2. Source approval */}
              <div className="px-5 py-3 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <span className="text-[#64748b] font-medium shrink-0 w-36 pt-0.5">2. Source Approval</span>
                <div className="text-left sm:text-right space-y-1">
                  <div className="flex sm:justify-end items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#1e40af] bg-[#eff6ff] px-2 py-0.5 rounded border border-[#bfdbfe]">
                      {obl.sourceApprovalId}
                    </span>
                    <button
                      type="button"
                      onClick={onGoToE23}
                      disabled={!onGoToE23}
                      title={!onGoToE23 ? SOURCE_APPROVAL_UNAVAILABLE : undefined}
                      className="text-xs font-semibold text-[#1a56db] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      View Source Approval
                    </button>
                  </div>
                  <p className="text-[11px] text-[#64748b]">
                    Derived from {obl.sourceCondition}
                  </p>
                  {!onGoToE23 && (
                    <p className="text-[11px] text-[#b91c1c] max-w-sm ml-auto">
                      {SOURCE_APPROVAL_UNAVAILABLE}
                    </p>
                  )}
                </div>
              </div>

              {/* 3. Due date */}
              <div className="px-5 py-3 flex items-center justify-between gap-2">
                <span className="text-[#64748b] font-medium shrink-0 w-36">3. Due Date</span>
                <div className="text-right">
                  <span className={`font-bold ${obl.status === 'Overdue' ? 'text-[#b91c1c]' : obl.status === 'Due Soon' ? 'text-[#d97706]' : 'text-[#1a3a5c]'}`}>
                    {obl.dueDate}
                  </span>
                  <span className="text-[10px] text-[#64748b] block">Statutory Cutoff</span>
                </div>
              </div>

              {/* 4. Frequency */}
              <div className="px-5 py-3 flex items-center justify-between gap-2">
                <span className="text-[#64748b] font-medium shrink-0 w-36">4. Frequency</span>
                <span className="font-medium text-[#334155]">{obl.frequency}</span>
              </div>

              {/* 5. Required documents */}
              <div className="px-5 py-3 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <span className="text-[#64748b] font-medium shrink-0 w-36 pt-0.5">5. Required Documents</span>
                <div className="text-left sm:text-right space-y-1.5">
                  {obl.requiredDocs.length > 0 ? (
                    obl.requiredDocs.map(d => (
                      <div key={d.id} className="flex sm:justify-end items-center gap-2">
                        <span className="font-medium text-[#334155]">{d.name}</span>
                        <button
                          type="button"
                          onClick={() => onGoToDocDetail(d.id)}
                          disabled={!canOpenDocument?.(d.id)}
                          title={!canOpenDocument?.(d.id) ? DOCUMENT_UNAVAILABLE : undefined}
                          className="text-[11px] text-[#1a56db] hover:underline font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Document Detail →
                        </button>
                      </div>
                    ))
                  ) : (
                    <span className="text-[#64748b] text-[11px]">
                      No document upload mandated — maintain internal registers per condition.
                    </span>
                  )}
                </div>
              </div>

              {/* 6. Previous submission */}
              <div className="px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-[#64748b] font-medium shrink-0 w-36">6. Previous Submission</span>
                <div className="text-left sm:text-right">
                  {currentPreviousSubmission ? (
                    <div>
                      <p className="font-semibold text-[#1a3a5c]">
                        {currentPreviousSubmission.date} · Ref: <span className="font-mono">{currentPreviousSubmission.ref}</span>
                      </p>
                      <span className="text-[10px] text-[#166534] font-medium">State: {currentPreviousSubmission.state}</span>
                    </div>
                  ) : (
                    <span className="text-[#94a3b8]">No previous submission recorded.</span>
                  )}
                </div>
              </div>

              {/* 7. Current status */}
              <div className="px-5 py-3 flex items-center justify-between gap-2">
                <span className="text-[#64748b] font-medium shrink-0 w-36">7. Current Status</span>
                <div>{complianceStatusBadge(currentStatus)}</div>
              </div>

              {/* 8. Verification */}
              <div className="px-5 py-3 flex items-center justify-between gap-2">
                <span className="text-[#64748b] font-medium shrink-0 w-36">8. Verification</span>
                <span className="font-bold text-[#1a3a5c] bg-[#f1f5f9] px-2 py-0.5 rounded border border-[#e2e8f0]">
                  {currentVerification}
                </span>
              </div>

              {/* 9. Next due date */}
              <div className="px-5 py-3 flex items-center justify-between gap-2">
                <span className="text-[#64748b] font-medium shrink-0 w-36">9. Next Due Date</span>
                <span className="font-medium text-[#334155]">
                  {obl.nextDueDate || 'None scheduled for subsequent cycle'}
                </span>
              </div>
            </div>
          </section>

          {/* Short Requirement Summary (No Long Prose) */}
          <div className="bg-white border border-[#e2e8f0] rounded-lg p-5 shadow-2xs space-y-1.5">
            <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">
              Operational Scope
            </span>
            <h3 className="text-xs font-bold text-[#1a3a5c]">What This Obligation Entails</h3>
            <p className="text-xs text-[#334155] leading-relaxed">
              {obl.description}
            </p>
          </div>

          {/* ===================================================================== */}
          {/* PROGRESSIVE DISCLOSURE: LEGAL BASIS & REGULATORY SOURCE               */}
          {/* ===================================================================== */}
          <div className="bg-white border border-[#e2e8f0] rounded-lg overflow-hidden shadow-2xs">
            <button
              type="button"
              onClick={() => setShowLegalBasis(!showLegalBasis)}
              className="w-full px-5 py-3.5 bg-[#f8f9fb] hover:bg-[#f1f5f9] border-b border-[#e2e8f0] flex items-center justify-between text-left transition-colors"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1a56db]" />
                <div>
                  <h3 className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">
                    Legal Basis & Regulatory Source
                  </h3>
                  <p className="text-[11px] text-[#64748b]">
                    Statutory condition quote, authority mandate, and legal provenance
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#1a56db] font-semibold">
                <span>{showLegalBasis ? 'Hide Details' : 'View Source'}</span>
                {showLegalBasis ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {showLegalBasis && (
              <div className="p-5 space-y-4 text-xs bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-[#f8f9fb] border border-[#e2e8f0] rounded space-y-1">
                    <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">
                      Originating Statutory Approval
                    </span>
                    <p className="font-bold text-xs text-[#1a3a5c]">{obl.sourceApprovalId}</p>
                    <p className="text-[11px] text-[#64748b]">Issuing Authority: <strong>{obl.dept}</strong></p>
                  </div>

                  <div className="p-3 bg-[#f8f9fb] border border-[#e2e8f0] rounded space-y-1">
                    <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">
                      Condition Reference
                    </span>
                    <p className="font-bold text-xs text-[#1a3a5c]">{obl.sourceCondition}</p>
                    <p className="text-[11px] text-[#64748b]">Statutory clearance stipulation</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">
                    Statutory Condition Text Quote
                  </span>
                  <div className="p-3 bg-[#f8fafc] border-l-4 border-l-[#1a56db] border border-[#e2e8f0] rounded text-[#334155] italic leading-relaxed font-serif">
                    "{obl.relevantCondition}"
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">
                    Why Required (Regulatory Purpose)
                  </span>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    {obl.whyRequired}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#f1f5f9] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={onGoToE23}
                    disabled={!onGoToE23}
                    title={!onGoToE23 ? SOURCE_APPROVAL_UNAVAILABLE : undefined}
                    className="text-xs text-[#1a56db] hover:underline font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    View Source Approval →
                  </button>
                  <span className="text-[11px] text-[#64748b]">Legally Enforceable Statutory Mandate</span>
                </div>
              </div>
            )}
          </div>

          {/* Regulatory Assistant Interactive Context */}
          <div className="bg-white border border-[#e2e8f0] rounded-lg p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-2">
              <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-[#1a56db]" />
                Regulatory Assistant Guidance
              </p>
              <button
                type="button"
                onClick={() =>
                  onOpenRegAssistant?.({
                    entryPoint: 'compliance',
                    recordId: obl.id,
                    recordName: obl.name,
                    department: obl.dept,
                  })
                }
                className="text-xs text-[#1a56db] hover:underline font-semibold"
              >
                Ask a Question →
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-[#64748b]">Suggested questions for this statutory obligation:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_PROMPTS.map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() =>
                      onOpenRegAssistant?.({
                        entryPoint: 'compliance',
                        recordId: obl.id,
                        recordName: obl.name,
                        department: obl.dept,
                        initialQuestion: p,
                      })
                    }
                    className="text-xs border border-[#d1d9e0] text-[#475569] px-2.5 py-1 rounded bg-[#f8f9fb] hover:bg-white hover:border-[#1a3a5c] hover:text-[#1a3a5c] transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-5">
          {/* Obvious Primary Action Box */}
          <div className="bg-white border border-[#e2e8f0] rounded-lg p-5 shadow-2xs space-y-3">
            <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">
              Primary Compliance Action
            </span>

            <button
              type="button"
              onClick={() => {
                if (primaryActionLabel === 'View Requirement') {
                  setShowLegalBasis(true);
                } else {
                  setIsActionModalOpen(true);
                }
              }}
              className={`w-full py-2.5 px-4 rounded text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 ${
                primaryActionLabel === 'View Requirement'
                  ? 'bg-[#f1f5f9] text-[#1a3a5c] hover:bg-[#e2e8f0] border border-[#cbd5e1]'
                  : 'bg-[#1a3a5c] text-white hover:bg-[#0f2540]'
              }`}
            >
              {primaryActionLabel === 'Submit Return' && <Send className="w-3.5 h-3.5" />}
              {primaryActionLabel === 'Renew' && <RefreshCw className="w-3.5 h-3.5" />}
              {primaryActionLabel === 'Upload Evidence' && <Upload className="w-3.5 h-3.5" />}
              {primaryActionLabel === 'Respond' && <CheckCircle2 className="w-3.5 h-3.5" />}
              {primaryActionLabel === 'View Requirement' && <Eye className="w-3.5 h-3.5" />}
              <span>{primaryActionLabel}</span>
            </button>

            <p className="text-[11px] text-[#64748b] text-center leading-relaxed">
              {primaryActionLabel === 'Submit Return' && 'File your periodic return directly with the department portal.'}
              {primaryActionLabel === 'Renew' && 'Initiate statutory renewal before expiry deadline.'}
              {primaryActionLabel === 'Upload Evidence' && 'Upload required test certificates and verification proof.'}
              {primaryActionLabel === 'Respond' && 'Submit formal clarification or deficiency response.'}
              {primaryActionLabel === 'View Requirement' && 'This obligation is compliant. Review underlying legal conditions.'}
            </p>

            <div className="pt-2 border-t border-[#f1f5f9] space-y-2">
              <button
                type="button"
                onClick={onGoToE23}
                disabled={!onGoToE23}
                title={!onGoToE23 ? SOURCE_APPROVAL_UNAVAILABLE : undefined}
                className="w-full text-xs border border-[#d1d9e0] text-[#1a3a5c] py-2 px-3 hover:bg-[#f1f5f9] rounded text-left font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                View Source Approval
              </button>

              {obl.requiredDocs.length > 0 && (
                <button
                  type="button"
                  onClick={onGoToE11}
                  disabled={!canOpenDocuments}
                  title={!canOpenDocuments ? DOCUMENT_UNAVAILABLE : undefined}
                  className="w-full text-xs border border-[#d1d9e0] text-[#1a3a5c] py-2 px-3 hover:bg-[#f1f5f9] rounded text-left font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Document Centre
                </button>
              )}
            </div>
          </div>

          {/* Current State Summary */}
          <div className="bg-white border border-[#e2e8f0] rounded-lg p-5 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider border-b border-[#e2e8f0] pb-2">
              Current Ledger State
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#64748b]">Status</span>
                {complianceStatusBadge(currentStatus)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64748b]">Verification</span>
                <span className="font-semibold text-[#1a3a5c]">{currentVerification}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64748b]">Due Date</span>
                <span className="font-bold text-[#1a3a5c]">{obl.dueDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64748b]">Frequency</span>
                <span className="text-[#475569]">{obl.frequency}</span>
              </div>
            </div>
          </div>

          {/* Navigate */}
          <div className="bg-white border border-[#e2e8f0] rounded-lg p-5 shadow-2xs space-y-2 text-xs">
            <h3 className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider border-b border-[#e2e8f0] pb-2">
              Connected Hubs
            </h3>
            <div className="flex flex-col gap-1.5 pt-1">
              <button
                type="button"
                onClick={onGoToE24}
                className="text-left text-[#1a56db] hover:underline font-medium"
              >
                ← All Compliance Obligations
              </button>
              <button
                type="button"
                onClick={onGoToE23}
                disabled={!onGoToE23}
                title={!onGoToE23 ? SOURCE_APPROVAL_UNAVAILABLE : undefined}
                className="text-left text-[#1a56db] hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Source Statutory Approval →
              </button>
              <button
                type="button"
                onClick={onGoToE11}
                disabled={!canOpenDocuments}
                title={!canOpenDocuments ? DOCUMENT_UNAVAILABLE : undefined}
                className="text-left text-[#1a56db] hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Document Centre →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE ACTION WORKFLOW MODAL                                         */}
      {/* ========================================================================= */}
      {isActionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#d1d9e0] rounded-lg shadow-xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#1a3a5c] px-5 py-4 text-white flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                  Compliance Action Workflow
                </span>
                <h3 className="text-base font-bold">
                  {primaryActionLabel} — {obl.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsActionModalOpen(false)}
                className="text-slate-300 hover:text-white text-lg p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-[#f8f9fb] border border-[#e2e8f0] rounded space-y-1">
                <p className="font-semibold text-[#1a3a5c]">Target Authority: {obl.dept}</p>
                <p className="text-[#64748b]">Statutory Condition: {obl.sourceCondition}</p>
                <p className="text-[#64748b]">Deadline: <strong>{obl.dueDate}</strong></p>
              </div>

              {/* Document upload zone */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">
                  Evidence / Dossier Document
                </label>
                <div className="border-2 border-dashed border-[#cbd5e1] rounded-lg p-5 text-center bg-[#f8fafc] hover:bg-[#f1f5f9] transition-colors space-y-2">
                  <Upload className="w-8 h-8 text-[#94a3b8] mx-auto" />
                  <div>
                    <p className="text-xs font-semibold text-[#334155]">
                      {simulatedDocName || 'Upload PDF evidence or scan'}
                    </p>
                    <p className="text-[10px] text-[#64748b]">Max file size 25MB · Signed by Authorized Signatory</p>
                  </div>

                  {/* Simulate Upload Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setSimulatedDocName(`${obl.name.replace(/[^a-zA-Z0-9]/g, '_')}_Signed_Evidence_2026.pdf`);
                      setActionRemarks(`Submitted compliance documentation per ${obl.sourceCondition} requirements.`);
                    }}
                    className="mt-2 text-xs bg-[#eff6ff] text-[#1e40af] hover:bg-[#dbeafe] border border-[#bfdbfe] px-3 py-1.5 rounded font-semibold transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>⚡ Simulate Upload</span>
                  </button>
                </div>
              </div>

              {/* Action Remarks */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">
                  Remarks / Compliance Declaration
                </label>
                <textarea
                  rows={2}
                  value={actionRemarks}
                  onChange={e => setActionRemarks(e.target.value)}
                  placeholder="Enter any reference notes or test results..."
                  className="w-full text-xs border border-[#d1d9e0] rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-[#1a56db]"
                />
              </div>

              <div className="pt-3 border-t border-[#e2e8f0] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsActionModalOpen(false)}
                  className="text-xs border border-[#d1d9e0] text-[#475569] hover:bg-[#f1f5f9] px-3.5 py-2 rounded font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCompleteSubmission}
                  className="text-xs bg-[#166534] hover:bg-[#14532d] text-white px-4 py-2 rounded font-semibold transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Confirm & Submit to {obl.dept}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
