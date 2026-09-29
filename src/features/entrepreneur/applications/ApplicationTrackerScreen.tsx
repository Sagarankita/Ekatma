'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  AlertTriangle,
  Clock,
  Building2,
  Hourglass,
  ArrowRight,
  Filter,
  UserCheck,
} from 'lucide-react';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import {
  listTrackerAppsForBusiness,
  getApplicationResponsibility,
  responsibilityBadgeClass,
  responsibilityLabel,
  getHumanAuthority,
} from './data';

export function ApplicationTrackerScreen({
  project,
}: {
  project: BusinessProject;
}) {
  const router = useRouter();
  const apps = listTrackerAppsForBusiness(project.id);

  // Filters: all, me (entrepreneur action), govt (government action), dept-wait (inter-department), completed
  const [filterMode, setFilterMode] = useState<'all' | 'me' | 'govt' | 'dept-wait' | 'completed'>('all');
  const [deptFilter, setDeptFilter] = useState('All');

  // ─── 6 Core Question Derivations ───────────────────────────────────────────
  // 1. WHAT HAVE I APPLIED FOR?
  const totalApplied = apps.length;
  const uniqueServices = Array.from(new Set(apps.map(a => a.service)));

  // 2. WHERE IS IT NOW? (Stage distribution)
  const scrutinyCount = apps.filter(a =>
    a.stage.toLowerCase().includes('scrutiny') || a.stage.toLowerCase().includes('review')
  ).length;
  const inspectionCount = apps.filter(a =>
    a.stage.toLowerCase().includes('inspection')
  ).length;
  const submittedCount = apps.filter(a =>
    a.stage.toLowerCase().includes('submitted') || a.stage.toLowerCase().includes('fee')
  ).length;
  const approvedCount = apps.filter(a => a.statusType === 'approved').length;

  // 3. WHO IS PROCESSING IT?
  const processingDepts = Array.from(new Set(apps.map(a => a.dept)));

  // 4. WHAT DO I NEED TO DO? (ENTREPRENEUR ACTION)
  const actionApps = apps.filter(a => getApplicationResponsibility(a) === 'entrepreneur');
  const actionCount = actionApps.length;

  // 5. WHAT IS WAITING ON GOVERNMENT? (GOVERNMENT ACTION)
  const govtWaitingApps = apps.filter(a => getApplicationResponsibility(a) === 'government');
  const govtWaitingCount = govtWaitingApps.length;

  // 6. WHAT IS WAITING ON ME? (ENTREPRENEUR ACTION)
  const meWaitingApps = apps.filter(a => getApplicationResponsibility(a) === 'entrepreneur');
  const meWaitingCount = meWaitingApps.length;

  // WAITING FOR ANOTHER DEPARTMENT
  const depWaitingApps = apps.filter(a => getApplicationResponsibility(a) === 'department-dependency');
  const depWaitingCount = depWaitingApps.length;

  // Filtered applications list
  const filteredApps = apps.filter(app => {
    if (deptFilter !== 'All' && app.dept !== deptFilter) return false;
    const resp = getApplicationResponsibility(app);
    if (filterMode === 'me' && resp !== 'entrepreneur') return false;
    if (filterMode === 'govt' && resp !== 'government') return false;
    if (filterMode === 'dept-wait' && resp !== 'department-dependency') return false;
    if (filterMode === 'completed' && resp !== 'completed') return false;
    return true;
  });

  const availableDepts = ['All', ...Array.from(new Set(apps.map(a => a.dept)))];

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      {/* Page Header */}
      <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
        <div className="max-w-[1280px] mx-auto">
          <nav className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#1a3a5c] hover:underline">Dashboard</Link>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">Applications Tracker</span>
          </nav>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-bold text-[#1a3a5c]">Applications Tracker</h1>
                <span className="text-xs bg-[#e2e8f0] text-[#334155] px-2 py-0.5 rounded-full font-semibold">
                  {totalApplied} Active
                </span>
              </div>
              <p className="mt-0.5 text-xs text-[#6b7a8d]">Track active applications and required actions.</p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={ENTREPRENEUR_ROUTES.journey(project.id)}
                className="text-xs border border-[#cbd5e1] text-[#334155] hover:bg-[#f1f5f9] px-3 py-1.5 rounded transition-colors font-medium"
              >
                Regulatory Journey
              </Link>
              <Link
                href={ENTREPRENEUR_ROUTES.newApplication(project.id)}
                className="text-xs bg-[#1a3a5c] text-white hover:bg-[#0f2540] transition-colors px-3 py-1.5 rounded font-medium shadow-xs"
              >
                + New Application
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-6 space-y-6">
        {/* ─── 6 Core Questions Answered Immediately ───────────────────────── */}
        <section aria-label="Regulatory Status Overview" className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#334155]">Application overview</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {/* 1. WHAT HAVE I APPLIED FOR? */}
            <div className="bg-white border border-[#e2e8f0] rounded-lg p-4 shadow-2xs hover:border-[#cbd5e1] transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[#64748b] text-xs font-semibold uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#1a56db]" />
                    WHAT HAVE I APPLIED FOR?
                  </span>
                  <span className="font-mono text-sm font-bold text-[#1a3a5c]">{totalApplied}</span>
                </div>
                <p className="text-lg font-bold text-[#1a3a5c] leading-tight">
                  {totalApplied} Statutory Clearances
                </p>
                <p className="text-xs text-[#64748b] mt-1 leading-snug">
                  Covering {uniqueServices.slice(0, 3).join(', ')}{uniqueServices.length > 3 ? ` +${uniqueServices.length - 3} more` : ''}.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#f1f5f9] flex items-center justify-between text-[11px] text-[#1a56db]">
                <span>{processingDepts.length} departments involved</span>
                <span className="font-medium">All active</span>
              </div>
            </div>

            {/* 2. WHERE IS IT NOW? */}
            <div className="bg-white border border-[#e2e8f0] rounded-lg p-4 shadow-2xs hover:border-[#cbd5e1] transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[#64748b] text-xs font-semibold uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1.5">
                    <Hourglass className="w-3.5 h-3.5 text-[#6366f1]" />
                    WHERE IS IT NOW?
                  </span>
                  <span className="font-mono text-sm font-bold text-[#1a3a5c]">Stages</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {scrutinyCount > 0 && (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-[#dbeafe] text-[#1e40af] px-2 py-0.5 rounded font-medium">
                      {scrutinyCount} Scrutiny
                    </span>
                  )}
                  {inspectionCount > 0 && (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-[#ede9fe] text-[#6d28d9] px-2 py-0.5 rounded font-medium">
                      {inspectionCount} Inspection
                    </span>
                  )}
                  {submittedCount > 0 && (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-[#fef3c7] text-[#92400e] px-2 py-0.5 rounded font-medium">
                      {submittedCount} Submitted
                    </span>
                  )}
                  {approvedCount > 0 && (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-[#dcfce7] text-[#166534] px-2 py-0.5 rounded font-medium">
                      {approvedCount} Approved
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#64748b] mt-2">
                  Most applications are actively in Technical Scrutiny or Joint Inspection.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#f1f5f9] text-[11px] text-[#475569] flex justify-between">
                <span>Pipeline velocity:</span>
                <span className="font-medium text-[#15803d]">On track</span>
              </div>
            </div>

            {/* 3. WHO IS PROCESSING IT? */}
            <div className="bg-white border border-[#e2e8f0] rounded-lg p-4 shadow-2xs hover:border-[#cbd5e1] transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[#64748b] text-xs font-semibold uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#0891b2]" />
                    WHO IS PROCESSING IT?
                  </span>
                  <span className="font-mono text-sm font-bold text-[#1a3a5c]">{processingDepts.length} Depts</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {processingDepts.map(d => (
                    <span key={d} className="text-xs font-semibold bg-[#f1f5f9] text-[#1e293b] border border-[#e2e8f0] px-2 py-0.5 rounded">
                      {d}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-[#64748b] mt-2">
                  Handled by MPCB Pune Regional Office, MIDC Town Planning, and Fire Directorate.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#f1f5f9] text-[11px] text-[#0891b2] flex justify-between font-medium">
                <span>Joint coordination enabled</span>
                <span>MAITRI SLA bound</span>
              </div>
            </div>

            {/* 4. WHAT DO I NEED TO DO? */}
            <div className={`border rounded-lg p-4 shadow-2xs flex flex-col justify-between ${actionCount > 0 ? 'bg-[#fff5f5] border-[#fca5a5]' : 'bg-white border-[#e2e8f0]'}`}>
              <div>
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider mb-2">
                  <span className={`flex items-center gap-1.5 ${actionCount > 0 ? 'text-[#b91c1c]' : 'text-[#64748b]'}`}>
                    <AlertTriangle className="w-3.5 h-3.5" />
                    WHAT DO I NEED TO DO?
                  </span>
                  <span className={`font-mono text-sm font-bold ${actionCount > 0 ? 'text-[#b91c1c]' : 'text-[#64748b]'}`}>
                    {actionCount}
                  </span>
                </div>
                <p className={`text-lg font-bold ${actionCount > 0 ? 'text-[#b91c1c]' : 'text-[#15803d]'}`}>
                  {actionCount > 0 ? `${actionCount} Actions Required` : 'No Action Required'}
                </p>
                <p className="text-xs text-[#475569] mt-1 leading-snug">
                  {actionCount > 0
                    ? 'Technical query responses and site inspection preparations pending your input.'
                    : 'All requested inputs provided. No bottlenecks waiting on you.'}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-black/10 flex items-center justify-between text-[11px]">
                <button
                  type="button"
                  onClick={() => setFilterMode('me')}
                  className="font-medium text-[#b91c1c] hover:underline flex items-center gap-1"
                >
                  View action items ({actionCount}) →
                </button>
              </div>
            </div>

            {/* 5. WHAT IS WAITING ON GOVERNMENT? */}
            <div className="bg-white border border-[#e2e8f0] rounded-lg p-4 shadow-2xs hover:border-[#cbd5e1] transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[#64748b] text-xs font-semibold uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#15803d]" />
                    WHAT IS WAITING ON GOVERNMENT?
                  </span>
                  <span className="font-mono text-sm font-bold text-[#15803d]">{govtWaitingCount}</span>
                </div>
                <p className="text-lg font-bold text-[#1a3a5c]">
                  {govtWaitingCount} Clearances In Progress
                </p>
                <p className="text-xs text-[#64748b] mt-1 leading-snug">
                  Applications advancing through internal desk scrutiny & inspection scheduling within statutory SLA.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#f1f5f9] flex items-center justify-between text-[11px]">
                <span className="text-[#15803d] font-medium">Statutory SLA Active</span>
                <button
                  type="button"
                  onClick={() => setFilterMode('govt')}
                  className="text-[#1a56db] hover:underline"
                >
                  Filter ({govtWaitingCount})
                </button>
              </div>
            </div>

            {/* 6. WHAT IS WAITING ON ME? */}
            <div className="bg-white border border-[#e2e8f0] rounded-lg p-4 shadow-2xs hover:border-[#cbd5e1] transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[#64748b] text-xs font-semibold uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-[#d97706]" />
                    WHAT IS WAITING ON ME?
                  </span>
                  <span className="font-mono text-sm font-bold text-[#d97706]">{meWaitingCount}</span>
                </div>
                <p className="text-lg font-bold text-[#1a3a5c]">
                  {meWaitingCount} Applications Paused
                </p>
                <p className="text-xs text-[#64748b] mt-1 leading-snug">
                  {meWaitingCount > 0
                    ? 'SLA clock is paused by the department pending your clarifications or document revisions.'
                    : 'Zero applications paused. Your queue is clear.'}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#f1f5f9] flex items-center justify-between text-[11px]">
                <span className="text-[#92400e] font-medium">
                  {meWaitingCount > 0 ? 'Respond before deadline' : 'Zero blockers'}
                </span>
                {meWaitingCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setFilterMode('me')}
                    className="text-[#b91c1c] font-semibold hover:underline"
                  >
                    Resolve now →
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Filter Bar ─────────────────────────────────────────────────── */}
        <div className="bg-white border border-[#e2e8f0] rounded-lg p-3 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
          {/* Quick Segment Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                filterMode === 'all'
                  ? 'bg-[#1a3a5c] text-white'
                  : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'
              }`}
            >
              All Applications ({totalApplied})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('me')}
              className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1 ${
                filterMode === 'me'
                  ? 'bg-[#b91c1c] text-white'
                  : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'
              }`}
            >
              Entrepreneur Action ({meWaitingCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('govt')}
              className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                filterMode === 'govt'
                  ? 'bg-[#15803d] text-white'
                  : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'
              }`}
            >
              Government Action ({govtWaitingCount})
            </button>
            {depWaitingCount > 0 && (
              <button
                type="button"
                onClick={() => setFilterMode('dept-wait')}
                className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                  filterMode === 'dept-wait'
                    ? 'bg-[#d97706] text-white'
                    : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'
                }`}
              >
                Waiting for Another Dept ({depWaitingCount})
              </button>
            )}
            {approvedCount > 0 && (
              <button
                type="button"
                onClick={() => setFilterMode('completed')}
                className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                  filterMode === 'completed'
                    ? 'bg-[#1a3a5c] text-white'
                    : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'
                }`}
              >
                Approved ({approvedCount})
              </button>
            )}
          </div>

          {/* Department Select & Reset */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#64748b] flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Department:
            </span>
            <select
              value={deptFilter}
              onChange={e => setDeptFilter(e.target.value)}
              className="text-xs border border-[#cbd5e1] rounded px-2.5 py-1.5 bg-white text-[#1e293b] focus:outline-none focus:ring-1 focus:ring-[#1a56db]"
            >
              {availableDepts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            {(filterMode !== 'all' || deptFilter !== 'All') && (
              <button
                type="button"
                onClick={() => { setFilterMode('all'); setDeptFilter('All'); }}
                className="text-xs text-[#b91c1c] hover:underline ml-1"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* ─── Applications Table (Strictly 6 Useful Columns) ─────────────── */}
        <div className="bg-white border border-[#e2e8f0] rounded-lg shadow-2xs overflow-hidden">
          <div className="px-5 py-3 border-b border-[#e2e8f0] bg-[#f8f9fb] flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#1a3a5c]">Applications List</h2>
              <p className="text-xs text-[#64748b] mt-0.5">
                Click any application row to open its detailed cockpit, review timeline, queries, and decisions.
              </p>
            </div>
            <span className="text-xs text-[#64748b] font-medium">
              Showing {filteredApps.length} of {totalApplied}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#f8f9fb] border-b border-[#e2e8f0] text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">
                  <th scope="col" className="px-4 py-3 border-r border-[#e8edf2]">Application</th>
                  <th scope="col" className="px-4 py-3 border-r border-[#e8edf2]">Service</th>
                  <th scope="col" className="px-4 py-3 border-r border-[#e8edf2]">Current Stage</th>
                  <th scope="col" className="px-4 py-3 border-r border-[#e8edf2]">Current Status</th>
                  <th scope="col" className="px-4 py-3 border-r border-[#e8edf2]">Action Required</th>
                  <th scope="col" className="px-4 py-3">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[#64748b]">
                      <FileText className="w-8 h-8 text-[#cbd5e1] mx-auto mb-2" />
                      <p className="text-sm font-medium text-[#334155]">No applications match the current criteria.</p>
                      <button
                        type="button"
                        onClick={() => { setFilterMode('all'); setDeptFilter('All'); }}
                        className="mt-2 text-xs text-[#1a56db] hover:underline"
                      >
                        Reset filters to view all
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredApps.map(app => {
                    const isNavigable = Boolean(app.appId && app.appId !== '—');
                    const targetHref = isNavigable ? ENTREPRENEUR_ROUTES.application(project.id, app.appId) : null;
                    const resp = getApplicationResponsibility(app);
                    const humanAuthority = getHumanAuthority(app.dept, app.currentDesk);

                    return (
                      <tr
                        key={app.appId !== '—' ? app.appId : app.id}
                        onClick={() => {
                          if (targetHref) router.push(targetHref);
                        }}
                        className={`transition-colors group ${
                          isNavigable ? 'cursor-pointer hover:bg-[#f1f5f9]/70' : 'bg-white opacity-70'
                        }`}
                      >
                        {/* 1. Application: ID + Dept */}
                        <td className="px-4 py-3.5 border-r border-[#f1f5f9] whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#cbd5e1] bg-[#f8f9fb] text-[#1e293b]">
                              {app.dept}
                            </span>
                            {isNavigable && targetHref ? (
                              <Link
                                href={targetHref}
                                onClick={e => e.stopPropagation()}
                                className="font-mono text-xs font-semibold text-[#1a56db] group-hover:underline"
                              >
                                {app.appId}
                              </Link>
                            ) : (
                              <span className="font-mono text-xs text-[#94a3b8]">{app.appId}</span>
                            )}
                          </div>
                        </td>

                        {/* 2. Service */}
                        <td className="px-4 py-3.5 border-r border-[#f1f5f9]">
                          <div>
                            <span className="font-medium text-[#1a3a5c] text-xs block">
                              {app.service}
                            </span>
                            <span className="text-[11px] text-[#64748b]">
                              {app.dept} Statutory Clearance
                            </span>
                          </div>
                        </td>

                        {/* 3. Current Stage */}
                        <td className="px-4 py-3.5 border-r border-[#f1f5f9] whitespace-nowrap">
                          <span className="inline-block text-xs text-[#334155] font-medium bg-[#f1f5f9] px-2.5 py-1 rounded-full border border-[#e2e8f0]">
                            {app.stage}
                          </span>
                        </td>

                        {/* 4. Current Status with Responsibility Distinction */}
                        <td className="px-4 py-3.5 border-r border-[#f1f5f9] whitespace-nowrap">
                          <div className="space-y-1">
                            <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border ${responsibilityBadgeClass(resp)}`}>
                              {responsibilityLabel(resp)}
                            </span>
                            <span className="text-xs font-semibold text-[#1e293b] block">
                              {resp === 'entrepreneur'
                                ? 'Action Required'
                                : resp === 'government'
                                ? 'In Process'
                                : resp === 'department-dependency'
                                ? 'Awaiting Prerequisite'
                                : 'Approved'}
                            </span>
                          </div>
                        </td>

                        {/* 5. Action Required */}
                        <td className="px-4 py-3.5 border-r border-[#f1f5f9] min-w-[210px] max-w-[340px]">
                          {resp === 'entrepreneur' ? (
                            <div className="flex items-start gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5 text-[#b91c1c] shrink-0 mt-0.5" />
                              <div>
                                <span className="text-xs text-[#b91c1c] font-semibold leading-snug block">
                                  {app.actionRequired}
                                </span>
                                <span className="text-[10px] text-[#991b1b] font-medium block mt-0.5">
                                  Deadline: {app.targetDate && app.targetDate !== '—' ? app.targetDate : 'Within statutory SLA'}
                                </span>
                              </div>
                            </div>
                          ) : resp === 'department-dependency' ? (
                            <div className="flex items-start gap-1.5 text-xs text-[#92400e]">
                              <Clock className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                              <span>Waiting for MPCB Consent to Establish approval</span>
                            </div>
                          ) : resp === 'government' ? (
                            <div className="text-xs text-[#475569]">
                              <span className="font-medium text-[#1e40af] block">In Department Review</span>
                              <span className="text-[11px] text-[#64748b]">Handled by {humanAuthority}</span>
                            </div>
                          ) : (
                            <span className="text-xs text-[#166534] font-medium">Clearance Granted — All conditions active</span>
                          )}
                        </td>

                        {/* 6. Last Updated */}
                        <td className="px-4 py-3.5 whitespace-nowrap text-[#64748b] text-xs">
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <span className="font-medium text-[#334155] block">{app.lastUpdated ?? `${app.daysElapsed} days ago`}</span>
                              <span className="text-[10px] text-[#94a3b8]">{app.sla}</span>
                            </div>
                            {isNavigable && (
                              <ArrowRight className="w-3.5 h-3.5 text-[#94a3b8] group-hover:text-[#1a56db] transition-colors" />
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ─── Bottom Contextual Links ─────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-[#64748b]">
          <div className="flex items-center gap-3">
            <Link
              href={ENTREPRENEUR_ROUTES.journey(project.id)}
              className="text-[#1a56db] hover:underline font-medium flex items-center gap-1"
            >
              Regulatory Journey →
            </Link>
            <span>·</span>
            <Link
              href={ENTREPRENEUR_ROUTES.dependencies(project.id)}
              className="text-[#1a56db] hover:underline font-medium flex items-center gap-1"
            >
              Dependency Graph →
            </Link>
            <span>·</span>
            <Link
              href={ENTREPRENEUR_ROUTES.documents(project.id)}
              className="text-[#1a56db] hover:underline font-medium flex items-center gap-1"
            >
              Document Centre →
            </Link>
          </div>
          <span className="text-[11px]">
            Protected under Maharashtra Right to Public Services Act (RTS Act, 2015)
          </span>
        </div>
      </div>
    </main>
  );
}
