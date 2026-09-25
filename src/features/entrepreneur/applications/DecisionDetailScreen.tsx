'use client';

import React from 'react';
import Link from 'next/link';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import {
  findDecisionByAppId,
  type DecisionState,
} from './data';

function decisionStateBanner(state: DecisionState) {
  if (state === 'approved') {
    return (
      <div className="bg-white border border-[#86efac] border-l-4 border-l-[#15803d] px-5 py-3">
        <p className="text-sm font-bold text-[#166534]">Decision: Approved</p>
        <p className="text-xs font-semibold text-[#166534] mt-0.5">Approved — Consent to Establish Granted</p>
        <p className="text-xs text-[#166534] mt-0.5">The department has approved this application. Approval certificate and conditions are shown below.</p>
      </div>
    );
  }
  if (state === 'rejected') {
    return (
      <div className="bg-white border border-[#fca5a5] border-l-4 border-l-[#b91c1c] px-5 py-3">
        <p className="text-sm font-bold text-[#b91c1c]">Decision: Rejected</p>
        <p className="text-xs text-[#b91c1c] mt-0.5">The department has rejected this application. Reason and downstream impact are shown below.</p>
      </div>
    );
  }
  return (
    <div className="bg-white border border-[#fcd34d] border-l-4 border-l-[#d97706] px-5 py-3">
      <p className="text-sm font-bold text-[#92400e]">Status: Correction Required</p>
      <p className="text-xs text-[#92400e] mt-0.5">The application remains in the active rework lifecycle. A final decision has not yet been issued.</p>
    </div>
  );
}

function decisionStateBadge(state: DecisionState) {
  if (state === 'approved') return <span className="text-[10px] font-semibold px-1.5 py-0.5 border border-[#86efac] bg-[#dcfce7] text-[#166534]">Approved</span>;
  if (state === 'rejected') return <span className="text-[10px] font-semibold px-1.5 py-0.5 border border-[#fca5a5] bg-[#fee2e2] text-[#b91c1c]">Rejected</span>;
  return <span className="text-[10px] font-semibold px-1.5 py-0.5 border border-[#fcd34d] bg-[#fef3c7] text-[#92400e]">Correction Required</span>;
}

export function DecisionDetailScreen({
  project,
  applicationId,
  decisionId,
}: {
  project: BusinessProject;
  applicationId: string;
  decisionId?: string;
}) {
  const dec = findDecisionByAppId(applicationId);

  if (!dec || (decisionId && dec.decisionId !== decisionId)) {
    return (
      <main id="main-content" className="flex-1 bg-[#f8f9fb] flex items-center justify-center min-h-[60vh]" tabIndex={-1}>
        <div className="max-w-[900px] mx-auto px-6 py-12 text-center">
          <p className="text-[#6b7a8d]">Decision record not found.</p>
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

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
        <div className="max-w-[1100px] mx-auto">
          <nav className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5">
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#1a3a5c] hover:underline">Dashboard</Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.applications(project.id)} className="hover:text-[#1a3a5c] hover:underline">Applications</Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.application(project.id, dec.appId)} className="hover:text-[#1a3a5c] hover:underline">Application Detail</Link>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">Approval / Decision</span>
          </nav>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-[#1a3a5c]">Decision Notice — {dec.decisionId}</h1>
              <p className="text-xs text-[#6b7a8d] mt-0.5">{dec.dept} — {dec.service}</p>
              <p className="text-xs text-[#6b7a8d]">{project.name} · {project.location}</p>
            </div>
            <div>{decisionStateBadge(dec.state)}</div>
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Decision banner */}
          {decisionStateBanner(dec.state)}

          {/* Decision / Application Information */}
          <div className="bg-white border border-[#e2e8f0]">
            <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
              <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Decision Information</p>
            </div>
            <div className="divide-y divide-[#f1f5f9]">
              {[
                { label: 'Decision ID', value: dec.decisionId },
                { label: 'Application ID', value: dec.appId },
                { label: 'Department', value: dec.dept },
                { label: 'Service', value: dec.service },
                { label: 'Decision Date', value: dec.decisionDate },
                { label: 'Decision', value: null, badge: decisionStateBadge(dec.state) },
                ...(dec.approvalId ? [{ label: 'Approval / Order ID', value: dec.approvalId, badge: null as null }] : []),
                ...(dec.certId ? [{ label: 'Certificate ID', value: dec.certId, badge: null as null }] : []),
                ...(dec.inspectionId ? [{ label: 'Related Inspection', value: dec.inspectionId, badge: null as null }] : []),
              ].map(r => (
                <div key={r.label} className="px-4 py-2.5 flex justify-between items-center text-sm gap-3">
                  <span className="text-[#6b7a8d] shrink-0">{r.label}</span>
                  {r.badge ?? <span className="text-[#334155] font-medium font-mono text-right">{r.value}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Approved: Approval details */}
          {dec.state === 'approved' && (
            <>
              <div className="bg-white border border-[#e2e8f0]">
                <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
                  <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Approval Certificate</p>
                </div>
                <div className="divide-y divide-[#f1f5f9]">
                  {[
                    { label: 'Certificate ID', value: dec.certId! },
                    { label: 'Issue Date', value: dec.issueDate! },
                    { label: 'Expiry Date', value: dec.expiryDate! },
                    { label: 'Validity Period', value: '5 years' },
                    { label: 'Renewal Required', value: 'Yes — before 09 Oct 2031' },
                    { label: 'Document in Centre', value: 'DOC-003 · E11 Document Centre' },
                  ].map(r => (
                    <div key={r.label} className="px-4 py-2.5 flex justify-between text-sm gap-3">
                      <span className="text-[#6b7a8d] shrink-0">{r.label}</span>
                      <span className="text-[#334155] font-medium text-right">{r.value}</span>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-[#e8edf2] flex gap-3">
                  <Link
                    href={ENTREPRENEUR_ROUTES.document(project.id, dec.certDocId || 'DOC-003')}
                    className="text-xs text-[#1a56db] hover:underline"
                  >
                    View Certificate →
                  </Link>
                  <Link
                    href={ENTREPRENEUR_ROUTES.documents(project.id)}
                    className="text-xs text-[#1a56db] hover:underline"
                  >
                    View in Document Centre (E11) →
                  </Link>
                </div>
              </div>

              {/* Conditions */}
              <div className="bg-white border border-[#e2e8f0]">
                <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
                  <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Conditions</p>
                </div>
                <div className="px-4 py-3">
                  <ul className="space-y-2">
                    {dec.conditions!.map((c, i) => (
                      <li key={i} className="text-xs text-[#334155] flex gap-2">
                        <span className="shrink-0 font-mono text-[#94a3b8]">{String(i + 1).padStart(2, '0')}.</span>
                        <span className="leading-relaxed">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Special Conditions */}
              {dec.specialConditions && dec.specialConditions.length > 0 && (
                <div className="bg-white border border-[#fcd34d]">
                  <div className="px-4 py-2.5 border-b border-[#fef3c7] bg-[#fffbeb]">
                    <p className="text-xs font-bold text-[#92400e] uppercase tracking-wider">Special Conditions</p>
                  </div>
                  <div className="px-4 py-3">
                    <ul className="space-y-2">
                      {dec.specialConditions.map((c, i) => (
                        <li key={i} className="text-xs text-[#334155] flex gap-2">
                          <span className="shrink-0 font-mono text-[#d97706]">SC{i + 1}.</span>
                          <span className="leading-relaxed">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Dependency Effect */}
              <div className="bg-white border border-[#e2e8f0]">
                <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
                  <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Dependency Effect</p>
                </div>
                <div className="px-4 py-3 space-y-1.5">
                  <p className="text-xs text-[#6b7a8d] mb-3">The following downstream requirements are now available as a result of this approval.</p>
                  <div className="text-xs font-semibold text-[#166534] mb-2">MPCB CTE — Approved</div>
                  {dec.downstreamUnlocked!.map((d, i) => (
                    <div key={i} className="flex items-start gap-3 pl-4">
                      <span className="shrink-0 text-[#94a3b8] mt-0.5">↓</span>
                      <div>
                        <p className="font-medium text-[#1a3a5c]">{d.label}</p>
                        <p className="text-[#15803d]">{d.status}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-3 pt-2">
                    <Link href={ENTREPRENEUR_ROUTES.journey(project.id)} className="text-xs text-[#1a56db] hover:underline">
                      View Regulatory Journey (E09) →
                    </Link>
                    <Link href={ENTREPRENEUR_ROUTES.dependencies(project.id)} className="text-xs text-[#1a56db] hover:underline">
                      View Dependency Graph (E13) →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Compliance Obligations */}
              {dec.complianceGenerated && (
                <div className="bg-white border border-[#e2e8f0]">
                  <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
                    <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Compliance Obligations</p>
                  </div>
                  <div className="px-4 py-3 text-xs text-[#475569] space-y-1.5">
                    <p>This approval generates the following ongoing compliance obligations:</p>
                    <ul className="space-y-1 mt-2">
                      {[
                        'Annual environmental audit report — submit by 31 March each year',
                        'Monthly stack monitoring — results to be uploaded quarterly',
                        'ETP commissioning report — within 30 days of trial production',
                        'Hazardous waste manifest records — maintain for 5 years',
                      ].map((ob, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="shrink-0 text-[#d1d9e0]">—</span>
                          <span>{ob}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-2 flex gap-3">
                      <Link href={ENTREPRENEUR_ROUTES.compliance(project.id)} className="text-xs text-[#1a56db] hover:underline">
                        View Compliance Dashboard (E24) →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Version History */}
          <div className="bg-white border border-[#e2e8f0]">
            <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
              <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Version History</p>
            </div>
            <div className="divide-y divide-[#f1f5f9]">
              {dec.versionHistory!.map((v, i) => (
                <div key={i} className="px-4 py-3 text-xs">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-[#1a3a5c]">{v.version}</p>
                    {i === 0 && <span className="text-[10px] font-semibold border border-[#93c5fd] bg-[#dbeafe] text-[#1e40af] px-1.5 py-0.5">Current</span>}
                  </div>
                  <p className="text-[#94a3b8] text-[10px] mb-1">{v.date}</p>
                  <p className="text-[#475569]">{v.note}</p>
                </div>
              ))}
              <div className="px-4 py-2.5 text-xs text-[#6b7a8d]">
                Application version: Resubmission #2 (APP-2026-MPCB-00412-R2) · Original: APP-2026-MPCB-00412
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Actions */}
          <div className="bg-white border border-[#e2e8f0]">
            <div className="px-3 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
              <p className="text-xs font-bold text-[#1a3a5c]">Actions</p>
            </div>
            <div className="px-3 py-3 flex flex-col gap-2 text-xs">
              <Link
                href={ENTREPRENEUR_ROUTES.document(project.id, dec.certDocId || 'DOC-003')}
                className="text-left border border-[#d1d9e0] text-[#1a3a5c] px-3 py-1.5 hover:bg-[#f1f5f9] rounded"
              >
                View Certificate
              </Link>
              <Link
                href={ENTREPRENEUR_ROUTES.documents(project.id)}
                className="text-left border border-[#d1d9e0] text-[#1a3a5c] px-3 py-1.5 hover:bg-[#f1f5f9] rounded"
              >
                View in Document Centre
              </Link>
              <Link
                href={ENTREPRENEUR_ROUTES.compliance(project.id)}
                className="text-left border border-[#d1d9e0] text-[#1a3a5c] px-3 py-1.5 hover:bg-[#f1f5f9] rounded"
              >
                View Compliance Obligations (E24)
              </Link>
              <Link
                href={ENTREPRENEUR_ROUTES.journey(project.id)}
                className="text-left border border-[#d1d9e0] text-[#1a3a5c] px-3 py-1.5 hover:bg-[#f1f5f9] rounded"
              >
                View Regulatory Journey
              </Link>
            </div>
          </div>

          {/* Certificate / Document card (approved only) */}
          {dec.state === 'approved' && (
            <div className="bg-white border border-[#86efac]">
              <div className="px-3 py-2.5 border-b border-[#bbf7d0] bg-[#f0fdf4]">
                <p className="text-xs font-bold text-[#166534]">Certificate Issued</p>
              </div>
              <div className="px-3 py-3 text-xs space-y-1.5">
                <div>
                  <p className="text-[10px] text-[#94a3b8] uppercase tracking-wider">Certificate ID</p>
                  <p className="font-mono font-medium text-[#334155]">{dec.certId}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#94a3b8] uppercase tracking-wider">Valid Until</p>
                  <p className="font-medium text-[#334155]">{dec.expiryDate}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#94a3b8] uppercase tracking-wider">Document Centre</p>
                  <Link href={ENTREPRENEUR_ROUTES.documents(project.id)} className="text-[#1a56db] hover:underline">
                    DOC-003 in E11 →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Related records */}
          <div className="bg-white border border-[#e2e8f0]">
            <div className="px-3 py-2.5 border-b border-[#e8edf2]">
              <p className="text-xs font-bold text-[#1a3a5c]">Related Records</p>
            </div>
            <div className="px-3 py-3 flex flex-col gap-1.5 text-xs">
              <Link href={ENTREPRENEUR_ROUTES.application(project.id, dec.appId)} className="text-left text-[#1a56db] hover:underline">
                Application Detail ({dec.appId})
              </Link>
              <Link href={ENTREPRENEUR_ROUTES.documents(project.id)} className="text-left text-[#1a56db] hover:underline">
                Document Centre (E11)
              </Link>
              <Link href={ENTREPRENEUR_ROUTES.requirement(project.id, 'EST-001')} className="text-left text-[#1a56db] hover:underline">
                Requirement Detail (EST-001)
              </Link>
              <Link href={ENTREPRENEUR_ROUTES.journey(project.id)} className="text-left text-[#1a56db] hover:underline">
                Regulatory Journey (E09)
              </Link>
              <Link href={ENTREPRENEUR_ROUTES.dependencies(project.id)} className="text-left text-[#1a56db] hover:underline">
                Dependency Graph (E13)
              </Link>
              <Link href={ENTREPRENEUR_ROUTES.compliance(project.id)} className="text-left text-[#1a56db] hover:underline">
                Compliance Dashboard (E24)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
