'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import { findQueryByAppId, type Deficiency } from './data';

function defTypeBadge(type: Deficiency['type']) {
  return type === 'correction' ? (
    <span className="text-[10px] font-semibold px-1.5 py-0.5 border border-[#fcd34d] bg-[#fef3c7] text-[#92400e]">
      Correction Required
    </span>
  ) : (
    <span className="text-[10px] font-semibold px-1.5 py-0.5 border border-[#fca5a5] bg-[#fee2e2] text-[#b91c1c]">
      Rejected
    </span>
  );
}

export function QueryResponseScreen({
  project,
  applicationId,
  queryId,
}: {
  project: BusinessProject;
  applicationId: string;
  queryId: string;
}) {
  const query = findQueryByAppId(applicationId);

  if (!query || query.queryId !== queryId) {
    return (
      <main id="main-content" className="flex-1 bg-[#f8f9fb] flex items-center justify-center min-h-[60vh]" tabIndex={-1}>
        <div className="max-w-[900px] mx-auto px-6 py-12 text-center">
          <p className="text-[#6b7a8d]">Query not found.</p>
          <Link
            href={ENTREPRENEUR_ROUTES.application(project.id, applicationId)}
            className="mt-4 inline-block text-sm text-[#1a56db] hover:underline"
          >
            ← Back to Application Detail
          </Link>
        </div>
      </main>
    );
  }

  const [responses, setResponses] = useState<Record<string, string>>(() =>
    Object.fromEntries(query.deficiencies.map(d => [d.id, '']))
  );
  const [resolved, setResolved] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(query.deficiencies.map(d => [d.id, false]))
  );

  const allResolved = query.deficiencies.every(d => resolved[d.id]);

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
        <div className="max-w-[1000px] mx-auto">
          <nav className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5">
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#1a3a5c] hover:underline">Dashboard</Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.applications(project.id)} className="hover:text-[#1a3a5c] hover:underline">Applications</Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.application(project.id, query.appId)} className="hover:text-[#1a3a5c] hover:underline">Application Detail</Link>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">Query Response</span>
          </nav>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-[#1a3a5c]">Deficiency Memo — {query.queryId}</h1>
              <p className="text-xs text-[#6b7a8d] mt-0.5">{query.dept} · {query.service} · {query.appId}</p>
            </div>
            <Link
              href={ENTREPRENEUR_ROUTES.application(project.id, query.appId)}
              className="text-xs border border-[#d1d9e0] text-[#475569] px-3 py-1.5 hover:bg-[#f1f5f9] rounded"
            >
              Back to Application Detail
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 py-5 space-y-4">
        {/* Memo header */}
        <div className="bg-white border border-[#fcd34d] border-l-4 border-l-[#d97706]">
          <div className="px-5 py-3 border-b border-[#fef3c7] bg-[#fffbeb]">
            <p className="text-xs font-bold text-[#92400e] uppercase tracking-wider">Consolidated Deficiency Memo</p>
          </div>
          <div className="px-5 py-3 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2 text-xs">
            {[
              { label: 'Query ID', value: query.queryId },
              { label: 'Application ID', value: query.appId },
              { label: 'Issued', value: query.issuedDate },
              { label: 'Response Deadline', value: query.responseDeadline },
              { label: 'Department', value: query.dept },
              { label: 'Service', value: query.service },
              { label: 'Deficiencies', value: `${query.deficiencies.length} items` },
              { label: 'Status', value: allResolved ? 'Ready to Submit' : 'Pending Response' },
            ].map(r => (
              <div key={r.label}>
                <p className="text-[10px] text-[#94a3b8] uppercase tracking-wider">{r.label}</p>
                <p className="font-medium text-[#334155] mt-0.5">{r.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="bg-white border border-[#e2e8f0] px-4 py-3 flex flex-wrap items-center gap-4">
          <p className="text-xs font-semibold text-[#1a3a5c]">Resolution Progress</p>
          <div className="flex gap-2 flex-wrap">
            {query.deficiencies.map(d => (
              <div
                key={d.id}
                className={`flex items-center gap-1.5 text-xs px-2 py-1 border ${resolved[d.id] ? 'border-[#86efac] bg-[#f0fdf4] text-[#166534]' : 'border-[#e2e8f0] bg-[#f8f9fb] text-[#6b7a8d]'}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${resolved[d.id] ? 'bg-[#15803d]' : 'bg-[#d1d9e0]'}`} />
                {d.id}
              </div>
            ))}
          </div>
          <p className="text-xs text-[#94a3b8] ml-auto">
            {query.deficiencies.filter(d => resolved[d.id]).length} of {query.deficiencies.length} resolved
          </p>
        </div>

        {/* Deficiency cards */}
        {query.deficiencies.map(def => (
          <div key={def.id} className={`bg-white border ${resolved[def.id] ? 'border-[#86efac]' : 'border-[#e2e8f0]'}`}>
            {/* Card header */}
            <div className={`px-4 py-2.5 border-b ${resolved[def.id] ? 'border-[#bbf7d0] bg-[#f0fdf4]' : 'border-[#e8edf2] bg-[#f8f9fb]'} flex items-center justify-between gap-3`}>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono font-bold text-[#94a3b8]">{def.id}</span>
                <p className="text-sm font-semibold text-[#1a3a5c]">{def.summary}</p>
                {defTypeBadge(def.type)}
              </div>
              {resolved[def.id] && (
                <span className="text-[10px] font-semibold border border-[#86efac] bg-[#dcfce7] text-[#166534] px-1.5 py-0.5">
                  Resolved
                </span>
              )}
            </div>

            <div className="px-4 py-4 space-y-4">
              {/* Department details grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-xs">
                <div>
                  <p className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-1">Officer Comment</p>
                  <p className="text-[#334155] leading-relaxed">{def.officerComment}</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-1">Related Field</p>
                    <p className="text-[#334155] font-medium">{def.relatedField}</p>
                  </div>
                  {def.relatedDocument && (
                    <div>
                      <p className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-1">Related Document</p>
                      <p className="text-[#334155]">{def.relatedDocument}</p>
                    </div>
                  )}
                  {def.regulatoryRef && (
                    <div>
                      <p className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-1">Regulatory Reference</p>
                      <p className="text-[#334155] leading-relaxed">{def.regulatoryRef}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Required action */}
              <div className="border border-[#e8edf2] bg-[#f8f9fb] px-3 py-3 text-xs">
                <p className="text-[10px] font-bold text-[#1a3a5c] uppercase tracking-wider mb-1.5">Required Action</p>
                <p className="text-[#334155] leading-relaxed">{def.requiredAction}</p>
              </div>

              {/* Entrepreneur response */}
              <div>
                <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block mb-1.5">
                  Your Response <span className="text-[#b91c1c]">*</span>
                </label>
                <textarea
                  rows={3}
                  value={responses[def.id]}
                  onChange={e => setResponses(r => ({ ...r, [def.id]: e.target.value }))}
                  placeholder="Describe the corrections made, document versions updated, or clarification provided…"
                  className="w-full text-xs border border-[#d1d9e0] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#1a56db] resize-y bg-white"
                />
              </div>

              {/* Actions row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#f1f5f9]">
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={ENTREPRENEUR_ROUTES.newApplication(project.id)}
                    className="text-xs border border-[#d1d9e0] text-[#1a3a5c] px-3 py-1.5 hover:bg-[#f1f5f9]"
                  >
                    Edit Affected Section →
                  </Link>
                  {def.relatedDocument && (
                    <Link
                      href={ENTREPRENEUR_ROUTES.documents(project.id)}
                      className="text-xs border border-[#d1d9e0] text-[#1a3a5c] px-3 py-1.5 hover:bg-[#f1f5f9]"
                    >
                      Replace Document →
                    </Link>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setResolved(r => ({ ...r, [def.id]: !r[def.id] }))}
                  className={`text-xs px-3 py-1.5 border font-semibold transition-colors ${resolved[def.id] ? 'border-[#86efac] bg-[#dcfce7] text-[#166534] hover:bg-[#f0fdf4]' : 'border-[#1a3a5c] bg-[#1a3a5c] text-white hover:bg-[#0f2540]'}`}
                >
                  {resolved[def.id] ? 'Mark as Unresolved' : `Mark ${def.id} as Resolved`}
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Submit CTA */}
        <div className={`bg-white border ${allResolved ? 'border-[#86efac]' : 'border-[#e2e8f0]'} px-5 py-4`}>
          {!allResolved && (
            <p className="text-xs text-[#92400e] mb-3">
              Resolve all {query.deficiencies.filter(d => !resolved[d.id]).length} remaining deficiency items before submitting the response.
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3">
            {allResolved ? (
              <Link
                href={ENTREPRENEUR_ROUTES.applicationResubmission(project.id, query.appId, 'APP-2026-MPCB-00412-R2')}
                className="text-sm px-5 py-2 font-semibold border border-[#1a3a5c] bg-[#1a3a5c] text-white hover:bg-[#0f2540] inline-block"
              >
                Resolve &amp; Resubmit →
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="text-sm px-5 py-2 font-semibold border border-[#e2e8f0] bg-[#f1f5f9] text-[#94a3b8] cursor-not-allowed"
              >
                Resolve &amp; Resubmit →
              </button>
            )}
            <Link
              href={ENTREPRENEUR_ROUTES.application(project.id, query.appId)}
              className="text-sm border border-[#d1d9e0] text-[#475569] px-4 py-2 hover:bg-[#f1f5f9]"
            >
              Back to Application Detail
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
