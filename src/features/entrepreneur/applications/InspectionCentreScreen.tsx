'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import {
  listInspectionsForBusiness,
  findInspectionDocumentForBusiness,
  findTrackerAppForBusiness,
  type InspectionRecord,
  type InspectionStatus,
  type InspectionObservation,
} from './data';

function insStatusBadge(status: InspectionStatus) {
  const map: Record<InspectionStatus, string> = {
    'Required': 'border-[#e2e8f0] bg-[#f8f9fb] text-[#475569]',
    'Awaiting Schedule': 'border-[#fcd34d] bg-[#fef3c7] text-[#92400e]',
    'Scheduled': 'border-[#93c5fd] bg-[#dbeafe] text-[#1e40af]',
    'Completed': 'border-[#a5b4fc] bg-[#ede9fe] text-[#4338ca]',
    'Observation Raised': 'border-[#fca5a5] bg-[#fee2e2] text-[#b91c1c]',
    'Correction Submitted': 'border-[#fcd34d] bg-[#fef3c7] text-[#92400e]',
    'Re-inspection Required': 'border-[#fca5a5] bg-[#fee2e2] text-[#b91c1c]',
    'Resolved': 'border-[#86efac] bg-[#dcfce7] text-[#166534]',
  };
  return <span className={`text-[10px] font-semibold px-1.5 py-0.5 border ${map[status]}`}>{status}</span>;
}

function obsResponseBadge(state: InspectionObservation['responseState']) {
  const map = {
    Pending: 'border-[#fca5a5] bg-[#fee2e2] text-[#b91c1c]',
    Submitted: 'border-[#fcd34d] bg-[#fef3c7] text-[#92400e]',
    Accepted: 'border-[#86efac] bg-[#dcfce7] text-[#166534]',
  };
  return <span className={`text-[10px] font-semibold px-1.5 py-0.5 border ${map[state]}`}>{state}</span>;
}

export function InspectionCentreScreen({
  project,
  initialInspectionId,
}: {
  project: BusinessProject;
  initialInspectionId?: string;
}) {
  const inspections = listInspectionsForBusiness(project.id);
  const [selectedId, setSelectedId] = useState<string | null>(initialInspectionId ?? null);
  const [obsResponses, setObsResponses] = useState<Record<string, string>>({});
  const [obsSubmitted, setObsSubmitted] = useState<Record<string, boolean>>({});

  const selected = selectedId ? inspections.find(i => i.id === selectedId) : null;

  if (selected) {
    return (
      <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
        <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
          <div className="max-w-[1100px] mx-auto">
            <nav className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5">
              <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#1a3a5c] hover:underline">Dashboard</Link>
              <span>›</span>
              <Link
                href={ENTREPRENEUR_ROUTES.inspections(project.id)}
                onClick={() => setSelectedId(null)}
                className="hover:text-[#1a3a5c] hover:underline"
              >
                Inspection Centre
              </Link>
              <span>›</span>
              <span className="text-[#1a3a5c] font-medium">{selected.id}</span>
            </nav>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-[#1a3a5c]">{selected.id} — {selected.type}</h1>
                <p className="text-xs text-[#6b7a8d] mt-0.5">{selected.departments.join(' · ')} · {project.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="text-sm border border-[#d1d9e0] text-[#475569] px-3 py-1.5 hover:bg-[#f1f5f9] rounded"
              >
                Back to Inspection List
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[1100px] mx-auto px-6 py-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Inspection Information */}
            <div className="bg-white border border-[#e2e8f0]">
              <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
                <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Inspection Information</p>
              </div>
              <div className="divide-y divide-[#f1f5f9]">
                {[
                  { label: 'Inspection ID', value: selected.id },
                  { label: 'Department(s)', value: selected.departments.join(', ') },
                  { label: 'Inspection Type', value: selected.type },
                  { label: 'Status', value: null, badge: insStatusBadge(selected.status) },
                  { label: 'Related Application(s)', value: selected.relatedAppIds.join(' · ') },
                  { label: 'Coordinated Inspection', value: selected.coordinated ? 'Yes — multiple departments attending together' : 'No — single department' },
                ].map(r => (
                  <div key={r.label} className="px-4 py-2.5 flex justify-between items-center text-sm gap-3">
                    <span className="text-[#6b7a8d] shrink-0">{r.label}</span>
                    {r.badge ?? <span className="text-[#334155] font-medium text-right">{r.value}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Visit Information */}
            <div className="bg-white border border-[#e2e8f0]">
              <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
                <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Visit Information</p>
              </div>
              <div className="divide-y divide-[#f1f5f9]">
                {[
                  { label: 'Date', value: selected.date },
                  { label: 'Time', value: selected.time },
                  { label: 'Site', value: selected.site },
                  { label: 'Inspection Team', value: `${selected.departments.join(', ')} department representatives assigned` },
                ].map(r => (
                  <div key={r.label} className="px-4 py-2.5 flex justify-between text-sm gap-3">
                    <span className="text-[#6b7a8d] shrink-0">{r.label}</span>
                    <span className="text-[#334155] font-medium text-right">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preparation Requirements */}
            <div className="bg-white border border-[#e2e8f0]">
              <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
                <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Preparation Requirements</p>
              </div>
              <div className="px-4 py-3">
                <ul className="space-y-1.5">
                  {selected.prepRequirements.map((req, i) => (
                    <li key={i} className="text-xs text-[#334155] flex gap-2">
                      <span className="shrink-0 text-[#94a3b8] font-mono">{String(i + 1).padStart(2, '0')}.</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Department Checklist */}
            <div className="bg-white border border-[#e2e8f0]">
              <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
                <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Department Checklist Summary</p>
              </div>
              <div className="divide-y divide-[#f1f5f9]">
                {selected.checklist.map(cat => (
                  <div key={cat.category} className="px-4 py-3">
                    <p className="text-xs font-semibold text-[#1a3a5c] mb-2">{cat.category}</p>
                    <ul className="space-y-1">
                      {cat.items.map((item, i) => (
                        <li key={i} className="text-xs text-[#475569] flex gap-2">
                          <span className="shrink-0 text-[#d1d9e0]">—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Observations */}
            {selected.observations.length > 0 && (
              <div className="bg-white border border-[#fca5a5]">
                <div className="px-4 py-2.5 border-b border-[#fca5a5] bg-[#fff1f2]">
                  <p className="text-xs font-bold text-[#b91c1c] uppercase tracking-wider">Inspection Observations</p>
                </div>
                <div className="divide-y divide-[#fef2f2]">
                  {selected.observations.map(obs => (
                    <div key={obs.id} className="px-4 py-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono font-bold text-[#94a3b8]">{obs.id}</span>
                        <p className="text-sm font-semibold text-[#1a3a5c] flex-1">{obs.description.substring(0, 60)}…</p>
                        {obsResponseBadge(obsSubmitted[obs.id] ? 'Submitted' : obs.responseState)}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs">
                        <div>
                          <p className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-1">Full Observation</p>
                          <p className="text-[#334155] leading-relaxed">{obs.description}</p>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-1">Related Checklist Item</p>
                            <p className="text-[#334155]">{obs.checklistItem}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-1">Date Raised</p>
                            <p className="text-[#334155]">{obs.dateRaised}</p>
                          </div>
                        </div>
                      </div>
                      <div className="border border-[#e8edf2] bg-[#f8f9fb] px-3 py-3 text-xs">
                        <p className="text-[10px] font-bold text-[#b91c1c] uppercase tracking-wider mb-1">Correction Required</p>
                        <p className="text-[#334155] leading-relaxed">{obs.requiredCorrection}</p>
                      </div>
                      {obs.evidenceRequired && (
                        <div className="text-xs">
                          <p className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-1">Evidence Required</p>
                          <p className="text-[#334155]">{obs.evidenceRequired}</p>
                        </div>
                      )}
                      {!obsSubmitted[obs.id] && (
                        <div>
                          <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block mb-1.5">Your Response</label>
                          <textarea
                            rows={3}
                            value={obsResponses[obs.id] || ''}
                            onChange={e => setObsResponses(r => ({ ...r, [obs.id]: e.target.value }))}
                            placeholder="Describe the corrective action taken and evidence provided…"
                            className="w-full text-xs border border-[#d1d9e0] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#1a56db] resize-y bg-white"
                          />
                          <div className="mt-2 flex gap-2">
                            <button
                              type="button"
                              onClick={() => setObsSubmitted(s => ({ ...s, [obs.id]: true }))}
                              className="text-xs bg-[#1a3a5c] text-white px-3 py-1.5 hover:bg-[#0f2540] font-semibold border border-[#1a3a5c] rounded"
                            >
                              Submit Response to {obs.id}
                            </button>
                          </div>
                        </div>
                      )}
                      {obsSubmitted[obs.id] && (
                        <div className="border border-[#86efac] bg-[#f0fdf4] px-3 py-2 text-xs text-[#166534]">
                          Response submitted for {obs.id}. Awaiting department review.
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Outcome (for completed with no observations) */}
            {selected.observations.length === 0 && (
              <div className="bg-white border border-[#e2e8f0]">
                <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
                  <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Outcome</p>
                </div>
                <div className="px-4 py-3 text-sm text-[#94a3b8]">
                  {selected.status === 'Scheduled'
                    ? 'Inspection has not yet taken place. Outcome will be available after the scheduled date.'
                    : 'No observations raised. Inspection outcome is being processed.'}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Action */}
            {selected.actionRequired && (
              <div className={`bg-white border ${selected.status === 'Observation Raised' ? 'border-[#fca5a5]' : 'border-[#e2e8f0]'}`}>
                <div className={`px-3 py-2.5 border-b ${selected.status === 'Observation Raised' ? 'border-[#fca5a5] bg-[#fff1f2]' : 'border-[#e8edf2] bg-[#f8f9fb]'}`}>
                  <p className={`text-xs font-bold uppercase tracking-wider ${selected.status === 'Observation Raised' ? 'text-[#b91c1c]' : 'text-[#1a3a5c]'}`}>Action Required</p>
                </div>
                <div className="px-3 py-3 text-xs text-[#334155] space-y-2">
                  <p>{selected.actionRequired}</p>
                </div>
              </div>
            )}

            {/* Related Applications */}
            <div className="bg-white border border-[#e2e8f0]">
              <div className="px-3 py-2.5 border-b border-[#e8edf2]">
                <p className="text-xs font-bold text-[#1a3a5c]">Related Applications</p>
              </div>
              <div className="px-3 py-3 space-y-1.5 text-xs">
                {selected.relatedAppIds.map(id => (
                  findTrackerAppForBusiness(project.id, id) ? (
                    <Link
                      key={id}
                      href={ENTREPRENEUR_ROUTES.application(project.id, id)}
                      className="font-mono text-[#1a56db] hover:underline block"
                    >
                      {id}
                    </Link>
                  ) : (
                    <span
                      key={id}
                      className="font-mono text-[#94a3b8] block"
                      title="Application record is not bound to this business"
                    >
                      {id}
                    </span>
                  )
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white border border-[#e2e8f0]">
              <div className="px-3 py-2.5 border-b border-[#e8edf2]">
                <p className="text-xs font-bold text-[#1a3a5c]">Relevant Documents</p>
              </div>
              <div className="divide-y divide-[#f1f5f9]">
                {selected.documents.map(d => (
                  <div key={d.id} className="px-3 py-2.5 flex items-center justify-between text-xs gap-2">
                    <span className="text-[#334155]">{d.name}</span>
                    {findInspectionDocumentForBusiness(project.id, selected.id, d.id)
                      ? <Link href={ENTREPRENEUR_ROUTES.document(project.id, d.id)} className="shrink-0 text-[#1a56db] hover:underline">View</Link>
                      : <button disabled title="Inspection document reference conflicts with the canonical document record" className="shrink-0 text-[#94a3b8] cursor-not-allowed">Unavailable</button>}
                  </div>
                ))}
              </div>
              <div className="px-3 py-2.5 border-t border-[#e8edf2]">
                <Link href={ENTREPRENEUR_ROUTES.documents(project.id)} className="text-xs text-[#1a56db] hover:underline">
                  Document Centre (E11) →
                </Link>
              </div>
            </div>

            {/* Status lifecycle */}
            <div className="bg-white border border-[#e2e8f0]">
              <div className="px-3 py-2.5 border-b border-[#e8edf2]">
                <p className="text-xs font-bold text-[#1a3a5c]">Inspection Lifecycle</p>
              </div>
              <div className="px-3 py-3 space-y-1">
                {(['Required', 'Awaiting Schedule', 'Scheduled', 'Completed', 'Observation Raised', 'Correction Submitted', 'Re-inspection Required', 'Resolved'] as InspectionStatus[]).map(s => {
                  const isCurrent = s === selected.status;
                  const statuses: InspectionStatus[] = ['Required', 'Awaiting Schedule', 'Scheduled', 'Completed', 'Observation Raised', 'Correction Submitted', 'Re-inspection Required', 'Resolved'];
                  const currentIdx = statuses.indexOf(selected.status);
                  const thisIdx = statuses.indexOf(s);
                  const isPast = thisIdx < currentIdx;
                  return (
                    <div key={s} className={`text-[10px] flex items-center gap-1.5 ${isCurrent ? 'font-bold text-[#1a3a5c]' : isPast ? 'text-[#15803d]' : 'text-[#d1d9e0]'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isCurrent ? 'bg-[#1a56db]' : isPast ? 'bg-[#15803d]' : 'bg-[#e2e8f0]'}`} />
                      {s}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigate */}
            <div className="bg-white border border-[#e2e8f0]">
              <div className="px-3 py-2.5 border-b border-[#e8edf2]">
                <p className="text-xs font-bold text-[#1a3a5c]">Navigate</p>
              </div>
              <div className="px-3 py-3 flex flex-col gap-1.5 text-xs">
                <Link href={ENTREPRENEUR_ROUTES.applications(project.id)} className="text-left text-[#1a56db] hover:underline">
                  Application Tracker (E18)
                </Link>
                <Link href={ENTREPRENEUR_ROUTES.journey(project.id)} className="text-left text-[#1a56db] hover:underline">
                  Regulatory Journey (E09)
                </Link>
                <Link href={ENTREPRENEUR_ROUTES.dependencies(project.id)} className="text-left text-[#1a56db] hover:underline">
                  Dependency Graph (E13)
                </Link>
                <Link href={ENTREPRENEUR_ROUTES.documents(project.id)} className="text-left text-[#1a56db] hover:underline">
                  Document Centre (E11)
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // List view
  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
        <div className="max-w-[1280px] mx-auto">
          <nav className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5">
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#1a3a5c] hover:underline">Dashboard</Link>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">Inspection Centre</span>
          </nav>
          <h1 className="text-xl font-bold text-[#1a3a5c]">Inspection Centre</h1>
          <p className="text-xs text-[#6b7a8d] mt-0.5">{project.name} — {project.location}</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-5 space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Inspections', value: inspections.length, color: 'text-[#1a3a5c]' },
            { label: 'Scheduled', value: inspections.filter(i => i.status === 'Scheduled').length, color: 'text-[#1d4ed8]' },
            { label: 'Observation Raised', value: inspections.filter(i => i.status === 'Observation Raised').length, color: 'text-[#b91c1c]' },
            { label: 'Resolved', value: inspections.filter(i => i.status === 'Resolved').length, color: 'text-[#15803d]' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-[#e2e8f0] px-4 py-3">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-[#6b7a8d] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white border border-[#e2e8f0] overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-[#f8f9fb] border-b border-[#e2e8f0]">
                {['Inspection ID', 'Department(s)', 'Inspection Type', 'Related Application(s)', 'Date / Time', 'Site', 'Status', 'Action Required'].map(h => (
                  <th key={h} className="text-left px-3 py-2.5 text-[10px] font-semibold text-[#64748b] uppercase tracking-wider border-r border-[#e8edf2] last:border-r-0 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inspections.map(ins => (
                <tr
                  key={ins.id}
                  className="border-b border-[#f1f5f9] hover:bg-[#f8f9fb] cursor-pointer"
                  onClick={() => setSelectedId(ins.id)}
                >
                  <td className="px-3 py-2.5 border-r border-[#f1f5f9]">
                    <Link
                      href={ENTREPRENEUR_ROUTES.inspection(project.id, ins.id)}
                      className="font-mono font-semibold text-[#1a3a5c] hover:underline"
                    >
                      {ins.id}
                    </Link>
                  </td>
                  <td className="px-3 py-2.5 whitespace-nowrap text-[#475569] border-r border-[#f1f5f9]">{ins.departments.join(' + ')}</td>
                  <td className="px-3 py-2.5 text-[#475569] border-r border-[#f1f5f9]">{ins.type}</td>
                  <td className="px-3 py-2.5 border-r border-[#f1f5f9]">
                    <div className="flex flex-col gap-0.5">
                      {ins.relatedAppIds.map(id => <span key={id} className="font-mono text-[#475569] text-[10px]">{id}</span>)}
                    </div>
                  </td>
                  <td className="px-3 py-2.5 whitespace-nowrap text-[#475569] border-r border-[#f1f5f9]">{ins.date}<br /><span className="text-[#94a3b8]">{ins.time}</span></td>
                  <td className="px-3 py-2.5 text-[#475569] min-w-[160px] border-r border-[#f1f5f9]">{ins.site}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap border-r border-[#f1f5f9]">{insStatusBadge(ins.status)}</td>
                  <td className="px-3 py-2.5 min-w-[140px]">
                    {ins.actionRequired
                      ? <span className={ins.status === 'Observation Raised' ? 'text-[#b91c1c] font-semibold' : 'text-[#1a3a5c]'}>{ins.actionRequired}</span>
                      : <span className="text-[#94a3b8]">No action required</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex gap-2">
          <Link
            href={ENTREPRENEUR_ROUTES.journey(project.id)}
            className="text-sm border border-[#d1d9e0] text-[#475569] px-3 py-1.5 hover:bg-[#f1f5f9] rounded inline-block"
          >
            View Regulatory Journey (E09)
          </Link>
          <Link
            href={ENTREPRENEUR_ROUTES.dependencies(project.id)}
            className="text-sm border border-[#d1d9e0] text-[#475569] px-3 py-1.5 hover:bg-[#f1f5f9] rounded inline-block"
          >
            View Dependency Graph (E13)
          </Link>
        </div>
      </div>
    </main>
  );
}
