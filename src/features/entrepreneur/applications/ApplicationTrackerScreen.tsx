'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import {
  listTrackerAppsForBusiness,
  type TrackerApp,
  slaClass,
  statusBadgeTrackerClass,
} from './data';

export function ApplicationTrackerScreen({
  project,
}: {
  project: BusinessProject;
}) {
  const apps = listTrackerAppsForBusiness(project.id);
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [actionFilter, setActionFilter] = useState(false);

  const filtered = apps.filter(a => {
    if (deptFilter !== 'All' && a.dept !== deptFilter) return false;
    if (statusFilter !== 'All' && a.status !== statusFilter) return false;
    if (actionFilter && !a.actionRequired) return false;
    return true;
  });

  const actionCount = apps.filter(a => a.actionRequired).length;

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
        <div className="max-w-[1280px] mx-auto">
          <nav className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5">
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#1a3a5c] hover:underline">Dashboard</Link>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">Application Tracker</span>
          </nav>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-[#1a3a5c]">Application Tracker</h1>
              <p className="text-xs text-[#6b7a8d] mt-0.5">{project.name} — {project.location}</p>
            </div>
            <button type="button" disabled title="Application intake for this business is not available" className="text-xs bg-[#e2e8f0] text-[#64748b] px-3 py-1.5 rounded font-medium cursor-not-allowed">+ New Application</button>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-5 space-y-4">
        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Applications', value: apps.length, color: 'text-[#1a3a5c]' },
            { label: 'Action Required', value: actionCount, color: actionCount > 0 ? 'text-[#b91c1c]' : 'text-[#94a3b8]' },
            { label: 'Under Review', value: apps.filter(a => a.statusType === 'active').length, color: 'text-[#1d4ed8]' },
            { label: 'Waiting on Dependency', value: apps.filter(a => a.statusType === 'waiting').length, color: 'text-[#92400e]' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-[#e2e8f0] px-4 py-3">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-[#6b7a8d] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white border border-[#e2e8f0] px-4 py-3 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Department</label>
            <select
              value={deptFilter}
              onChange={e => setDeptFilter(e.target.value)}
              className="text-xs border border-[#d1d9e0] px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#1a56db]"
            >
              {['All', 'MPCB', 'MIDC', 'Fire', 'DISH', 'Boiler'].map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Status</label>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="text-xs border border-[#d1d9e0] px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#1a56db]"
            >
              {['All', 'Under Review', 'Action Required', 'Inspection Scheduled', 'Submitted', 'Waiting on Dependency'].map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <label className="flex items-center gap-1.5 text-xs text-[#475569] cursor-pointer">
            <input
              type="checkbox"
              checked={actionFilter}
              onChange={e => setActionFilter(e.target.checked)}
              className="accent-[#1a3a5c]"
            />
            Action Required only
          </label>
          {(deptFilter !== 'All' || statusFilter !== 'All' || actionFilter) && (
            <button
              onClick={() => { setDeptFilter('All'); setStatusFilter('All'); setActionFilter(false); }}
              className="text-xs text-[#b91c1c] hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Table */}
        <div className="bg-white border border-[#e2e8f0] overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-[#f8f9fb] border-b border-[#e2e8f0]">
                {['Service', 'Department', 'Application ID', 'Current Desk', 'Status', 'SLA', 'Days', 'Inspection', 'Action Required'].map(h => (
                  <th key={h} className="text-left px-3 py-2.5 text-[10px] font-semibold text-[#64748b] uppercase tracking-wider border-r border-[#e8edf2] last:border-r-0 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-[#94a3b8]">
                    No applications match the current filters.
                  </td>
                </tr>
              ) : filtered.map(app => {
                const isNavigable = app.appId && app.appId !== '—';
                return (
                  <tr
                    key={app.appId !== '—' ? app.appId : app.id}
                    className="border-b border-[#f1f5f9] hover:bg-[#f8f9fb]"
                  >
                    <td className="px-3 py-2.5 border-r border-[#f1f5f9]">
                      {isNavigable ? (
                        <Link
                          href={ENTREPRENEUR_ROUTES.application(project.id, app.appId)}
                          className="text-left text-[#1a3a5c] font-medium hover:underline block"
                        >
                          {app.service}
                        </Link>
                      ) : (
                        <span className="text-[#64748b] font-medium">{app.service}</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-[#475569] border-r border-[#f1f5f9]">{app.dept}</td>
                    <td className="px-3 py-2.5 font-mono text-[#475569] whitespace-nowrap border-r border-[#f1f5f9]">
                      {isNavigable ? (
                        <Link
                          href={ENTREPRENEUR_ROUTES.application(project.id, app.appId)}
                          className="text-[#1a56db] hover:underline"
                        >
                          {app.appId}
                        </Link>
                      ) : (
                        <span>{app.appId}</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-[#475569] whitespace-nowrap border-r border-[#f1f5f9]">{app.currentDesk}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap border-r border-[#f1f5f9]">
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 border ${statusBadgeTrackerClass(app.statusType)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className={`px-3 py-2.5 whitespace-nowrap border-r border-[#f1f5f9] text-xs ${slaClass(app.slaType)}`}>
                      {app.sla}
                    </td>
                    <td className="px-3 py-2.5 text-center text-[#475569] border-r border-[#f1f5f9]">
                      {app.daysElapsed > 0 ? app.daysElapsed : '—'}
                    </td>
                    <td className="px-3 py-2.5 text-[#475569] min-w-[140px] border-r border-[#f1f5f9]">
                      {app.inspection}
                    </td>
                    <td className="px-3 py-2.5 min-w-[180px]">
                      {app.actionRequired ? (
                        <span className="text-[#b91c1c] leading-snug">{app.actionRequired}</span>
                      ) : (
                        <span className="text-[#94a3b8]">No action required</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex gap-2">
          <button type="button" disabled title="Regulatory Journey is unavailable for this business" className="text-sm border border-[#d1d9e0] text-[#94a3b8] px-3 py-1.5 rounded cursor-not-allowed">View Regulatory Journey (E09)</button>
        </div>
      </div>
    </main>
  );
}
