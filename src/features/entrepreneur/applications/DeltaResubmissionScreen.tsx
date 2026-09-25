'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import { E21_DELTA_CHANGES, E21_AFFECTED_CHECKS } from './data';

export function DeltaResubmissionScreen({
  project,
  applicationId,
  resubmissionId = 'APP-2026-MPCB-00412-R2',
}: {
  project: BusinessProject;
  applicationId: string;
  resubmissionId?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const timestamp = '23 Sep 2026, 17:14 IST';

  if (submitted) {
    return (
      <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
        <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
          <div className="max-w-[900px] mx-auto">
            <nav className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5">
              <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#1a3a5c] hover:underline">Dashboard</Link>
              <span>›</span>
              <Link href={ENTREPRENEUR_ROUTES.applications(project.id)} className="hover:text-[#1a3a5c] hover:underline">Applications</Link>
              <span>›</span>
              <span className="text-[#1a3a5c] font-medium">Resubmission Confirmed</span>
            </nav>
            <h1 className="text-xl font-bold text-[#1a3a5c]">Resubmission #2 Submitted</h1>
          </div>
        </div>
        <div className="max-w-[900px] mx-auto px-6 py-5 space-y-4">
          <div className="bg-white border border-[#86efac] border-l-4 border-l-[#15803d] px-5 py-4">
            <p className="text-sm font-semibold text-[#166534]">
              Your response to QRY-001 has been submitted. The application has been resubmitted as version R2.
            </p>
            <p className="text-xs text-[#166534] mt-1">
              Changed and dependency-affected information will be highlighted for MPCB re-review. Unaffected data will not require re-confirmation.
            </p>
          </div>
          <div className="bg-white border border-[#e2e8f0]">
            <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
              <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Resubmission Record</p>
            </div>
            <div className="divide-y divide-[#f1f5f9]">
              {[
                { label: 'Resubmission ID', value: resubmissionId },
                { label: 'Parent Application ID', value: applicationId },
                { label: 'Query Resolved', value: 'QRY-001' },
                { label: 'Deficiencies Resolved', value: 'DEF-001, DEF-002, DEF-003' },
                { label: 'New Document Versions', value: 'ETP Design Details v2 · Waste Management Plan v1' },
                { label: 'Dossier Fields Updated', value: 'Daily Water Consumption · ETP Design Capacity' },
                { label: 'Submitted', value: timestamp },
                { label: 'Returned to Desk', value: 'Technical Scrutiny' },
              ].map(r => (
                <div key={r.label} className="px-4 py-2.5 flex justify-between items-start gap-4 text-sm">
                  <span className="text-[#6b7a8d] shrink-0">{r.label}</span>
                  <span className="text-[#334155] font-medium text-right">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href={ENTREPRENEUR_ROUTES.applications(project.id)}
              className="text-sm bg-[#1a3a5c] text-white px-4 py-2 hover:bg-[#0f2540] inline-block rounded font-medium"
            >
              View Application Tracker (E18)
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
        <div className="max-w-[900px] mx-auto">
          <nav className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5">
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#1a3a5c] hover:underline">Dashboard</Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.applicationQuery(project.id, applicationId, 'QRY-001')} className="hover:text-[#1a3a5c] hover:underline">Query Response</Link>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">Delta Resubmission</span>
          </nav>
          <h1 className="text-xl font-bold text-[#1a3a5c]">Resubmission #2 — Delta Review</h1>
          <p className="text-xs text-[#6b7a8d] mt-0.5">MPCB · Consent to Establish · {applicationId} · Query QRY-001</p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 py-5 space-y-4">
        {/* Notice */}
        <div className="bg-white border border-[#bfdbfe] border-l-4 border-l-[#1d4ed8] px-5 py-3">
          <p className="text-xs font-semibold text-[#1e3a8a]">Changed and dependency-affected information will be highlighted for MPCB re-review.</p>
          <p className="text-xs text-[#1e40af] mt-0.5">Unaffected data does not require re-confirmation by the department.</p>
        </div>

        {/* Resubmission metadata */}
        <div className="bg-white border border-[#e2e8f0]">
          <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
            <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Resubmission Details</p>
          </div>
          <div className="divide-y divide-[#f1f5f9]">
            {[
              { label: 'Resubmission ID', value: resubmissionId },
              { label: 'Parent Application ID', value: applicationId },
              { label: 'Query Being Resolved', value: 'QRY-001' },
              { label: 'Deficiencies Resolved', value: 'DEF-001 · DEF-002 · DEF-003' },
            ].map(r => (
              <div key={r.label} className="px-4 py-2.5 flex justify-between text-sm">
                <span className="text-[#6b7a8d]">{r.label}</span>
                <span className="font-medium text-[#334155] font-mono text-right">{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Changes */}
        <div className="bg-white border border-[#e2e8f0]">
          <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb] flex items-center justify-between">
            <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Changed</p>
            <span className="text-[10px] font-semibold border border-[#fcd34d] bg-[#fef3c7] text-[#92400e] px-1.5 py-0.5">
              {E21_DELTA_CHANGES.length} items changed
            </span>
          </div>
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-[#f8f9fb] border-b border-[#e8edf2]">
                {['Field / Document', 'Section', 'Previous', 'Updated'].map(h => (
                  <th key={h} className="text-left px-4 py-2 text-[10px] font-semibold text-[#64748b] uppercase tracking-wider border-r border-[#e8edf2] last:border-r-0">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {E21_DELTA_CHANGES.map((c, i) => (
                <tr key={i} className="border-b border-[#f1f5f9]">
                  <td className="px-4 py-2.5 font-medium text-[#1a3a5c] border-r border-[#f1f5f9]">{c.field}</td>
                  <td className="px-4 py-2.5 text-[#475569] border-r border-[#f1f5f9]">{c.section}</td>
                  <td className="px-4 py-2.5 text-[#94a3b8] line-through border-r border-[#f1f5f9]">{c.oldValue}</td>
                  <td className="px-4 py-2.5 text-[#15803d] font-semibold">{c.newValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Unchanged */}
        <div className="bg-white border border-[#e2e8f0]">
          <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb] flex items-center justify-between">
            <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Unchanged</p>
            <span className="text-[10px] font-semibold border border-[#86efac] bg-[#dcfce7] text-[#166534] px-1.5 py-0.5">
              42 fields unchanged
            </span>
          </div>
          <div className="px-4 py-3 text-xs text-[#6b7a8d]">
            All other fields from the original submission are carried forward unchanged. No re-confirmation required for these fields.
          </div>
        </div>

        {/* Affected checks */}
        <div className="bg-white border border-[#e2e8f0]">
          <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
            <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Affected — Will Be Re-Reviewed</p>
          </div>
          <div className="divide-y divide-[#f1f5f9]">
            {E21_AFFECTED_CHECKS.map(c => (
              <div key={c.label} className="px-4 py-2.5 flex items-center justify-between text-sm">
                <span className="text-[#334155]">{c.label}</span>
                <span className="text-[10px] font-semibold border border-[#fcd34d] bg-[#fef3c7] text-[#92400e] px-1.5 py-0.5">
                  Re-check Required
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="bg-white border border-[#e2e8f0] px-5 py-4">
          <p className="text-xs text-[#475569] mb-3">
            By submitting Resubmission #2, you confirm that all deficiencies in QRY-001 have been addressed and the updated information is accurate.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="text-sm bg-[#1a3a5c] text-white px-5 py-2 font-semibold border border-[#1a3a5c] hover:bg-[#0f2540] rounded"
            >
              Create Resubmission #2
            </button>
            <Link
              href={ENTREPRENEUR_ROUTES.applicationQuery(project.id, applicationId, 'QRY-001')}
              className="text-sm border border-[#d1d9e0] text-[#475569] px-4 py-2 hover:bg-[#f1f5f9] rounded"
            >
              Back to Query Response
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
