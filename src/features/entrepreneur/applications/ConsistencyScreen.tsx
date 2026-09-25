'use client';

import React from 'react';
import Link from 'next/link';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import { E16_ROWS } from './data';

export function ConsistencyScreen({
  project,
}: {
  project: BusinessProject;
}) {
  const hasReview = E16_ROWS.some(r => r.applications.some(a => a.status === 'review' || a.status === 'conflict'));

  function statusLabel(s: 'consistent' | 'review' | 'conflict') {
    const map = {
      consistent: 'text-[#15803d] font-semibold',
      review: 'text-[#92400e] font-semibold',
      conflict: 'text-[#b91c1c] font-semibold',
    };
    const text = { consistent: 'Consistent', review: 'Review', conflict: 'Conflict' };
    return <span className={`text-xs ${map[s]}`}>{text[s]}</span>;
  }

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
        <div className="max-w-[1100px] mx-auto">
          <nav className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5">
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#1a3a5c] hover:underline">Dashboard</Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.applications(project.id)} className="hover:text-[#1a3a5c] hover:underline">Applications</Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.newApplication(project.id)} className="hover:text-[#1a3a5c] hover:underline">Application Workspace</Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.applicationPrevalidation(project.id)} className="hover:text-[#1a3a5c] hover:underline">Pre-validation</Link>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">Cross-form Consistency</span>
          </nav>
          <div>
            <h1 className="text-xl font-bold text-[#1a3a5c]">Cross-form Consistency</h1>
            <p className="text-sm font-semibold text-[#334155] mt-0.5">MPCB — Consent to Establish</p>
            <p className="text-xs text-[#6b7a8d] mt-0.5">{project.name} · {project.location}</p>
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-5 space-y-5">
        <div className="bg-white border border-[#e2e8f0] px-4 py-3 text-xs text-[#475569]">
          This check compares common project facts across your applications against the verified Master Project Dossier. Differences require your review. This is a data-consistency check — it does not determine legal eligibility or predict a department decision.
        </div>

        {hasReview && (
          <div className="border border-[#fcd34d] bg-[#fef9c3] px-4 py-3 text-sm text-[#92400e]">
            Some values differ between applications. Review the highlighted rows and correct the source record or confirm a justified exception.
          </div>
        )}

        {/* Comparison table */}
        <div className="bg-white border border-[#e2e8f0] overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-[#f8f9fb] border-b border-[#e2e8f0]">
                <th className="text-left px-4 py-2.5 font-semibold text-[#64748b] uppercase tracking-wider text-[10px] border-r border-[#e8edf2]">Field</th>
                <th className="text-left px-4 py-2.5 font-semibold text-[#64748b] uppercase tracking-wider text-[10px] border-r border-[#e8edf2]">Master Project Dossier</th>
                <th className="text-left px-4 py-2.5 font-semibold text-[#64748b] uppercase tracking-wider text-[10px] border-r border-[#e8edf2]">Application</th>
                <th className="text-left px-4 py-2.5 font-semibold text-[#64748b] uppercase tracking-wider text-[10px] border-r border-[#e8edf2]">Value</th>
                <th className="text-left px-4 py-2.5 font-semibold text-[#64748b] uppercase tracking-wider text-[10px]">Status</th>
              </tr>
            </thead>
            <tbody>
              {E16_ROWS.map(row => (
                row.applications.map((app, ai) => (
                  <tr key={`${row.field}-${ai}`} className={`border-b border-[#f1f5f9] ${app.status === 'review' ? 'bg-[#fefce8]' : app.status === 'conflict' ? 'bg-[#fff1f2]' : ''}`}>
                    {ai === 0 && (
                      <td rowSpan={row.applications.length} className="px-4 py-2.5 font-medium text-[#1a3a5c] border-r border-[#e8edf2] align-top">
                        {row.field}
                      </td>
                    )}
                    {ai === 0 && (
                      <td rowSpan={row.applications.length} className="px-4 py-2.5 text-[#334155] border-r border-[#e8edf2] align-top">
                        <span className="font-medium">{row.master}</span>
                        <span className="block text-[10px] text-[#15803d] mt-0.5">Verified</span>
                      </td>
                    )}
                    <td className="px-4 py-2.5 text-[#475569] border-r border-[#e8edf2]">{app.name}</td>
                    <td className="px-4 py-2.5 text-[#334155] border-r border-[#e8edf2]">{app.value}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center justify-between gap-2">
                        {statusLabel(app.status)}
                        {app.status !== 'consistent' && (
                          <Link
                            href={ENTREPRENEUR_ROUTES.newApplication(project.id)}
                            className="text-[10px] text-[#1a56db] border border-[#d1d9e0] px-1.5 py-1 hover:bg-[#f1f5f9] whitespace-nowrap"
                          >
                            Review source
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>

        {/* Review items detail */}
        {E16_ROWS.filter(r => r.applications.some(a => a.status !== 'consistent')).map(row => (
          <div key={row.field} className="bg-white border border-[#fcd34d]">
            <div className="px-4 py-2.5 border-b border-[#fde68a] bg-[#fef9c3]">
              <p className="text-xs font-bold text-[#92400e]">{row.field} — Review Required</p>
            </div>
            <div className="px-4 py-3 space-y-1.5 text-xs text-[#475569]">
              <p><span className="font-medium text-[#1a3a5c]">Master Project Dossier:</span> {row.master} (Verified)</p>
              {row.applications.filter(a => a.status !== 'consistent').map((a, i) => (
                <p key={i}><span className="font-medium text-[#1a3a5c]">{a.name}:</span> {a.value} — differs from Master Dossier value</p>
              ))}
              <p className="text-[#92400e] pt-1">Review the source record in the relevant application section or confirm this as a justified exception before proceeding.</p>
              <div className="flex gap-2 pt-1">
                <Link
                  href={ENTREPRENEUR_ROUTES.newApplication(project.id)}
                  className="text-xs text-[#1a3a5c] border border-[#d1d9e0] px-2.5 py-1.5 hover:bg-[#f1f5f9]"
                >
                  Correct in Application
                </Link>
                <button
                  type="button"
                  className="text-xs text-[#475569] border border-[#d1d9e0] px-2.5 py-1.5 hover:bg-[#f1f5f9]"
                >
                  Keep as Justified Exception
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Action footer */}
        <div className="bg-white border border-[#e2e8f0] px-5 py-3 flex items-center justify-between">
          <Link
            href={ENTREPRENEUR_ROUTES.applicationPrevalidation(project.id)}
            className="text-sm text-[#475569] px-3 py-1.5 border border-[#d1d9e0] hover:bg-[#f1f5f9]"
          >
            Back to Pre-validation
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="text-sm text-[#475569] px-3 py-1.5 border border-[#d1d9e0] hover:bg-[#f1f5f9]"
            >
              Save Draft
            </button>
            <Link
              href={ENTREPRENEUR_ROUTES.applicationSubmission(project.id)}
              className="text-sm bg-[#1a3a5c] text-white px-4 py-1.5 hover:bg-[#0f2540] inline-block font-medium"
            >
              Proceed to Submission (E17) →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
