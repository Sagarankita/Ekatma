'use client';

import React from 'react';
import Link from 'next/link';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import {
  findTrackerAppById,
  slaClass,
  statusBadgeTrackerClass,
} from './data';
import { listJourneyNodesForBusiness } from '../journey/data';
import { listDocumentsForBusiness } from '../documents/data';

export function ApplicationDetailScreen({
  project,
  applicationId,
}: {
  project: BusinessProject;
  applicationId: string;
}) {
  const app = findTrackerAppById(applicationId);

  if (!app) {
    return (
      <main id="main-content" className="flex-1 bg-[#f8f9fb] flex items-center justify-center min-h-[60vh]" tabIndex={-1}>
        <div className="max-w-[900px] mx-auto px-6 py-12 text-center">
          <p className="text-[#6b7a8d]">Application not found.</p>
          <Link
            href={ENTREPRENEUR_ROUTES.applications(project.id)}
            className="mt-4 inline-block text-sm text-[#1a56db] hover:underline"
          >
            ← Back to Applications
          </Link>
        </div>
      </main>
    );
  }

  const timeline = [{ stage: app.stage, status: 'current', date: app.status, deskTime: `${app.daysElapsed} days elapsed`, note: `Current desk: ${app.currentDesk}.` }];

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
        <div className="max-w-[1100px] mx-auto">
          <nav className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5">
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#1a3a5c] hover:underline">Dashboard</Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.applications(project.id)} className="hover:text-[#1a3a5c] hover:underline">Application Tracker</Link>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">Application Detail</span>
          </nav>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-[#1a3a5c]">{app.dept} — {app.service}</h1>
              <p className="text-xs text-[#6b7a8d] mt-0.5">Application ID: <span className="font-mono font-medium text-[#334155]">{app.appId}</span></p>
              <p className="text-xs text-[#6b7a8d]">{project.name} · {project.location}</p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={ENTREPRENEUR_ROUTES.applications(project.id)}
                className="text-sm border border-[#d1d9e0] text-[#475569] px-3 py-1.5 hover:bg-[#f1f5f9] rounded"
              >
                Back to Tracker
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Action Required Banner if applicable */}
          {app.actionRequired && (
            <div className="bg-white border border-[#fca5a5] border-l-4 border-l-[#b91c1c] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-[#b91c1c] uppercase tracking-wider">Action Required</p>
                <p className="text-sm font-medium text-[#1a3a5c] mt-0.5">{app.actionRequired}</p>
              </div>
              {app.appId === 'APP-2026-MPCB-00412' && (
                <Link
                  href={ENTREPRENEUR_ROUTES.applicationQuery(project.id, app.appId, 'QRY-001')}
                  className="shrink-0 text-xs bg-[#b91c1c] text-white px-3 py-1.5 rounded hover:bg-[#991b1b] font-medium"
                >
                  Respond to Query (E20) →
                </Link>
              )}
            </div>
          )}

          {/* Current state */}
          <div className="bg-white border border-[#e2e8f0]">
            <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
              <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Current Application State</p>
            </div>
            <div className="divide-y divide-[#f1f5f9]">
              {[
                { label: 'Status', value: app.status, special: 'status' },
                { label: 'Current Desk', value: app.currentDesk, special: null },
                { label: 'Days Elapsed', value: `${app.daysElapsed} days`, special: null },
                { label: 'SLA', value: app.sla, special: 'sla' },
                { label: 'Inspection', value: app.inspection, special: null },
              ].map(r => (
                <div key={r.label} className="px-4 py-2.5 flex justify-between items-center text-sm gap-3">
                  <span className="text-[#6b7a8d] shrink-0">{r.label}</span>
                  {r.special === 'status' ? (
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 border ${statusBadgeTrackerClass(app.statusType)}`}>
                      {app.status}
                    </span>
                  ) : (
                    <span className={`text-right font-medium ${r.special === 'sla' ? slaClass(app.slaType) : 'text-[#334155]'}`}>
                      {r.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Processing timeline */}
          <div className="bg-white border border-[#e2e8f0]">
            <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
              <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Processing Timeline</p>
            </div>
            <div className="divide-y divide-[#f1f5f9]">
              {timeline.map((t, i) => (
                <div key={i} className={`px-4 py-3 flex gap-4 ${t.status === 'current' ? 'bg-[#f0f4f8]' : ''}`}>
                  <div className="shrink-0 w-3 flex flex-col items-center pt-0.5">
                    <div className={`w-2.5 h-2.5 rounded-full border-2 ${t.status === 'complete' ? 'bg-[#15803d] border-[#15803d]' : t.status === 'current' ? 'bg-[#1a56db] border-[#1a56db]' : 'bg-white border-[#d1d9e0]'}`} />
                    {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-[#e2e8f0] my-1" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className={`text-sm font-semibold ${t.status === 'current' ? 'text-[#1a56db]' : 'text-[#1a3a5c]'}`}>{t.stage}</p>
                      <span className="text-xs text-[#6b7a8d]">{t.date}</span>
                    </div>
                    <p className="text-xs text-[#475569] mt-0.5 leading-relaxed">{t.note}</p>
                    {t.deskTime !== '—' && <p className="text-[10px] text-[#94a3b8] mt-1 font-mono">Desk time: {t.deskTime}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar contextual panel */}
        <div className="space-y-4">
          {/* Related Actions */}
          <div className="bg-white border border-[#e2e8f0]">
            <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
              <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Related Actions</p>
            </div>
            <div className="p-3 flex flex-col gap-2 text-xs">
              {app.appId === 'APP-2026-MPCB-00412' && (
                <>
                  <Link
                    href={ENTREPRENEUR_ROUTES.applicationQuery(project.id, app.appId, 'QRY-001')}
                    className="p-2 border border-[#d1d9e0] hover:bg-[#f1f5f9] rounded text-[#1a56db] font-medium"
                  >
                    View Query QRY-001 (E20) →
                  </Link>
                  <Link
                    href={ENTREPRENEUR_ROUTES.applicationDecision(project.id, app.appId, 'DEC-2026-MPCB-00412')}
                    className="p-2 border border-[#d1d9e0] hover:bg-[#f1f5f9] rounded text-[#1a56db] font-medium"
                  >
                    View Decision (E23) →
                  </Link>
                </>
              )}
              {listJourneyNodesForBusiness(project.id, false).length > 0 ? (
                <Link
                  href={ENTREPRENEUR_ROUTES.dependencies(project.id)}
                  className="p-2 border border-[#d1d9e0] hover:bg-[#f1f5f9] rounded text-[#1a56db] font-medium text-left"
                >
                  Inspect Dependencies (E13) →
                </Link>
              ) : (
                <button type="button" disabled title="Inspect Dependencies (E13) is unavailable for this business" className="p-2 border border-[#d1d9e0] rounded text-[#94a3b8] text-left cursor-not-allowed">Inspect Dependencies (E13)</button>
              )}
              {listDocumentsForBusiness(project.id).length > 0 ? (
                <Link
                  href={ENTREPRENEUR_ROUTES.documents(project.id)}
                  className="p-2 border border-[#d1d9e0] hover:bg-[#f1f5f9] rounded text-[#1a56db] font-medium text-left"
                >
                  Document Centre (E11) →
                </Link>
              ) : (
                <button type="button" disabled title="Document Centre (E11) is unavailable for this business" className="p-2 border border-[#d1d9e0] rounded text-[#94a3b8] text-left cursor-not-allowed">Document Centre (E11)</button>
              )}
              {listJourneyNodesForBusiness(project.id, false).length > 0 ? (
                <Link
                  href={ENTREPRENEUR_ROUTES.journey(project.id)}
                  className="p-2 border border-[#d1d9e0] hover:bg-[#f1f5f9] rounded text-[#1a56db] font-medium text-left"
                >
                  Regulatory Journey (E09) →
                </Link>
              ) : (
                <button type="button" disabled title="Regulatory Journey (E09) is unavailable for this business" className="p-2 border border-[#d1d9e0] rounded text-[#94a3b8] text-left cursor-not-allowed">Regulatory Journey (E09)</button>
              )}
            </div>
          </div>

          {/* Quick info */}
          <div className="bg-white border border-[#e2e8f0] p-4 text-xs text-[#6b7a8d] space-y-2">
            <p className="font-bold text-[#1a3a5c]">Single Window Service</p>
            <p>Processing is governed by Maharashtra Industry Regulation and single-window SLA timeframes.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
