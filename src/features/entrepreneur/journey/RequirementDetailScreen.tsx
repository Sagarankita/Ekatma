'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import {
  listJourneyNodesForBusiness,
  journeyStateCfg,
  getEnrichment,
  STAGES,
  type JourneyReq,
} from './data';

function SectionCard({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) {
  return (
    <div id={id} className="bg-white border border-[#d1d9e0] rounded shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-[#f8f9fb] border-b border-[#e8edf2]">
        <h2 className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">{title}</h2>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

export function RequirementDetailScreen({
  project,
  requirementId,
}: {
  project: BusinessProject;
  requirementId: string;
}) {
  const [cteApproved, setCteApproved] = useState(false);
  const [ragOpen, setRagOpen] = useState(false);
  const [ragQuestion, setRagQuestion] = useState('');
  const [ragAnswer, setRagAnswer] = useState<string | null>(null);

  const nodes = listJourneyNodesForBusiness(project.id, cteApproved);
  const req = nodes.find(n => n.id === requirementId);

  if (!req) {
    return (
      <main id="main-content" className="flex-1 bg-[#f8f9fb] flex items-center justify-center min-h-[60vh]" tabIndex={-1}>
        <div className="max-w-[900px] mx-auto px-6 py-12 text-center">
          <p className="text-[#6b7a8d]">Requirement not found.</p>
          <Link
            href={ENTREPRENEUR_ROUTES.journey(project.id)}
            className="mt-4 inline-block text-sm text-[#1a56db] hover:underline"
          >
            ← Back to Journey
          </Link>
        </div>
      </main>
    );
  }

  const cfg = journeyStateCfg(req.displayState);
  const enrich = getEnrichment(req.id, project.name, project.location);
  const prereqs = req.dependencies.map(d => nodes.find(n => n.id === d.reqId)).filter(Boolean) as JourneyReq[];
  const downstream = nodes.filter(n => n.dependencies.some(d => d.reqId === req.id));
  const parallel = enrich.parallelServices.map(id => nodes.find(n => n.id === id)).filter(Boolean) as JourneyReq[];
  const isReady = req.displayState === 'ready';
  const isApproved = req.displayState === 'approved';
  const isWaiting = req.displayState === 'waiting';

  const ragSuggestions = [
    'Why is this requirement applicable to my business?',
    'Explain the relevant regulatory clause',
    'Which Government Resolution applies here?',
    'Explain in Marathi',
    'What documents do I need and where do I get them?',
    'What happens after I submit?',
  ];

  function handleRagQuestion(q: string) {
    setRagQuestion(q);
    setRagAnswer(
      `This is a simulated regulatory assistant response to: "${q}"\n\nSource: ${enrich.regSourceType} — ${enrich.regReference}, ${enrich.regClause}\n\nThe EKATMA Regulatory Assistant retrieves and explains applicable rules. It does not grant approval or make statutory decisions. The final decision rests with the appropriate department/authority.`,
    );
  }

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="max-w-[960px] mx-auto px-6 py-5">
        {/* Breadcrumb */}
        <div className="mb-4">
          <nav className="text-xs text-[#6b7a8d] flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href={ENTREPRENEUR_ROUTES.businesses()} className="hover:text-[#1a3a5c] hover:underline">
              My Businesses
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#1a3a5c] hover:underline">
              {project.name}
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.journey(project.id)} className="hover:text-[#1a3a5c] hover:underline">
              Regulatory Journey
            </Link>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">{req.service}</span>
          </nav>
        </div>

        {/* Demo toggle banner */}
        <div className="mb-4 p-3 bg-[#fffbeb] border border-[#fde68a] rounded flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#78350f] uppercase tracking-wider">Prototype Demo</span>
            <span className="text-[#78350f]">Simulate requirement approval to inspect unlocked states</span>
          </div>
          <button
            type="button"
            onClick={() => setCteApproved(v => !v)}
            className={`px-3 py-1 rounded font-medium transition-colors ${cteApproved ? 'bg-[#22c55e] text-white' : 'bg-[#e0e7ff] text-[#3730a3]'}`}
          >
            {cteApproved ? '✓ CTE Approved (reset)' : 'Simulate CTE Approval →'}
          </button>
        </div>

        {/* ── Page Header ── */}
        <div className="mb-5 bg-white border border-[#d1d9e0] rounded shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-[#e8edf2]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold text-[#9aa5b4] uppercase tracking-wider mb-1">
                  {enrich.serviceId} · {STAGES.find(s => s.key === req.stage)?.label ?? req.stage} Stage
                </p>
                <h1 className="text-xl font-bold text-[#1a3a5c] leading-tight">{req.service}</h1>
                <p className="text-sm text-[#6b7a8d] mt-0.5">{req.department}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-3 py-1.5 rounded border ${cfg.badgeCls}`}>
                  {cfg.icon} {cfg.label}
                </span>
                <button
                  type="button"
                  onClick={() => setRagOpen(true)}
                  className="text-xs bg-[#1a56db] text-white px-3 py-1.5 rounded hover:bg-[#1a3a5c] font-medium flex items-center gap-1.5"
                >
                  Ask Assistant
                </button>
              </div>
            </div>
          </div>

          {/* At-a-glance strip */}
          <div className="px-5 py-3 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#fafbfc]">
            {[
              {
                label: 'Applicability',
                value:
                  req.applicability === 'applicable'
                    ? 'Confirmed Applicable'
                    : req.applicability === 'conditional'
                      ? 'Conditional'
                      : req.applicability === 'needs-verification'
                        ? 'Needs Verification'
                        : 'Not Applicable',
              },
              {
                label: 'Dependency',
                value:
                  prereqs.length > 0
                    ? prereqs.every(p => p.displayState === 'approved')
                      ? 'Prerequisites Complete'
                      : 'Prerequisites Pending'
                    : 'No Prerequisites',
              },
              { label: 'Inspection', value: req.inspectionState ?? 'May be Required' },
              { label: 'Configured SLA', value: enrich.slaConfigured },
            ].map(f => (
              <div key={f.label}>
                <p className="text-[10px] font-semibold text-[#9aa5b4] uppercase tracking-wider">{f.label}</p>
                <p className="text-xs font-semibold text-[#374151] mt-0.5">{f.value}</p>
              </div>
            ))}
          </div>

          {/* Primary actions */}
          <div className="px-5 py-4 border-t border-[#e8edf2] flex flex-wrap items-center gap-3">
            {isReady && (
              <Link
                href={ENTREPRENEUR_ROUTES.newApplication(project.id)}
                className="bg-[#1a56db] text-white text-sm font-bold px-6 py-2.5 rounded hover:bg-[#1a3a5c] transition-colors"
              >
                Start Application →
              </Link>
            )}
            {isWaiting && (
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#f8f9fb] border border-[#d1d9e0] rounded flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#6b7a8d]">⏸ Waiting on Dependency</span>
                </div>
                <Link
                  href={ENTREPRENEUR_ROUTES.dependencies(project.id)}
                  className="text-sm border border-[#1a56db] text-[#1a56db] px-4 py-2 rounded hover:bg-[#ebf3ff] font-semibold transition-colors"
                >
                  View Dependency
                </Link>
              </div>
            )}
            {isApproved && (
              <div className="flex items-center gap-2 text-sm font-bold text-[#166534]">
                <span>✓ Approved</span>
                {req.approvalRef && <span className="text-xs font-normal text-[#6b7a8d]">· Ref: {req.approvalRef}</span>}
              </div>
            )}
            {!isReady && !isWaiting && !isApproved && (
              <button
                type="button"
                className="bg-[#9aa5b4] text-white text-sm font-bold px-6 py-2.5 rounded cursor-not-allowed"
                disabled
              >
                Start Application
              </button>
            )}
            <Link
              href={ENTREPRENEUR_ROUTES.documents(project.id)}
              className="text-sm border border-[#d1d9e0] text-[#374151] px-4 py-2.5 rounded hover:bg-[#f0f4f8] font-medium transition-colors"
            >
              View Documents
            </Link>
            <Link
              href={ENTREPRENEUR_ROUTES.journey(project.id)}
              className="text-sm border border-[#d1d9e0] text-[#374151] px-4 py-2.5 rounded hover:bg-[#f0f4f8] font-medium transition-colors"
            >
              View in Journey
            </Link>
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Why do I need this? */}
            <SectionCard title="Why do I need this?">
              <p className="text-xs font-semibold text-[#9aa5b4] uppercase tracking-wider mb-2">Your business factors</p>
              <div className="space-y-1.5 mb-4">
                {enrich.dnaBasis.map(f => (
                  <div key={f.label} className="flex gap-2 text-sm">
                    <span className="text-[#9aa5b4] font-medium w-36 shrink-0">{f.label}</span>
                    <span className="font-semibold text-[#1a2533]">{f.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-bold text-[#9aa5b4] uppercase tracking-wider mb-1.5">Applicability Summary</p>
              <p className="text-sm text-[#374151] leading-relaxed">{enrich.applicabilitySummary}</p>
              <p className="text-[10px] text-[#9aa5b4] mt-3 italic">
                These are Business DNA factors used by the regulatory applicability engine. They are carried from your
                confirmed Business Profile.
              </p>
            </SectionCard>

            {/* Applicability */}
            <SectionCard title="Applicability">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded border ${
                    req.applicability === 'applicable'
                      ? 'bg-[#f0fdf4] text-[#166534] border-[#86efac]'
                      : req.applicability === 'conditional'
                        ? 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]'
                        : 'bg-[#e0e7ff] text-[#3730a3] border-[#a5b4fc]'
                  }`}
                >
                  {req.applicability === 'applicable'
                    ? 'Confirmed Applicable'
                    : req.applicability === 'conditional'
                      ? 'Conditional'
                      : 'Needs Verification'}
                </span>
                {enrich.regVerified ? (
                  <span className="text-[10px] text-[#166534] font-semibold border border-[#bbf7d0] bg-[#f0fdf4] px-2 py-0.5 rounded">
                    Verified Source
                  </span>
                ) : (
                  <span className="text-[10px] text-[#3730a3] font-semibold border border-[#a5b4fc] bg-[#e0e7ff] px-2 py-0.5 rounded">
                    Needs Verification
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-[#9aa5b4] uppercase tracking-wider mb-2">Based on</p>
              <ul className="space-y-1">
                {enrich.applicabilityBasis.map(b => (
                  <li key={b} className="flex items-center gap-2 text-sm text-[#374151]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1a56db] shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              {req.conditionReason && (
                <p className="mt-3 text-xs text-[#78350f] italic border-t border-[#e8edf2] pt-3">
                  {req.conditionReason}
                </p>
              )}
            </SectionCard>

            {/* Dependencies */}
            <SectionCard title="Dependencies">
              {prereqs.length > 0 && (
                <div className="mb-4">
                  <p className="text-[10px] font-bold text-[#9aa5b4] uppercase tracking-wider mb-2">
                    Required before starting
                  </p>
                  <div className="space-y-2">
                    {prereqs.map(p => {
                      const pCfg = journeyStateCfg(p.displayState);
                      const dep = req.dependencies.find(d => d.reqId === p.id);
                      return (
                        <Link
                          key={p.id}
                          href={ENTREPRENEUR_ROUTES.requirement(project.id, p.id)}
                          className={`block p-3 rounded border hover:shadow-sm transition-shadow ${
                            p.displayState === 'approved'
                              ? 'border-[#bbf7d0] bg-[#f0fdf4]'
                              : 'border-[#e8edf2] bg-[#f8f9fb]'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border shrink-0 ${pCfg.badgeCls}`}>
                              {pCfg.label}
                            </span>
                            <div>
                              <p className="text-xs font-semibold text-[#1a2533]">
                                {p.department} — {p.service}
                              </p>
                              {dep?.type === 'conditional' && (
                                <p className="text-[10px] text-[#78350f]">Conditional dependency</p>
                              )}
                              {dep?.reason && <p className="text-xs text-[#6b7a8d] mt-0.5">{dep.reason}</p>}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* This requirement */}
              <div className="mb-4">
                <p className="text-[10px] font-bold text-[#9aa5b4] uppercase tracking-wider mb-2">This requirement</p>
                <div
                  className={`flex items-center gap-3 p-3 rounded border-l-4 ${cfg.border} border border-[#e8edf2] ${cfg.bg}`}
                >
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${cfg.badgeCls}`}>
                    {cfg.label}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-[#1a2533]">
                      {req.department} — {req.service}
                    </p>
                  </div>
                </div>
              </div>

              {/* Downstream */}
              {downstream.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold text-[#9aa5b4] uppercase tracking-wider mb-2">
                    Downstream (unlocks when approved)
                  </p>
                  <div className="space-y-2">
                    {downstream.map(d => {
                      const dCfg = journeyStateCfg(d.displayState);
                      return (
                        <Link
                          key={d.id}
                          href={ENTREPRENEUR_ROUTES.requirement(project.id, d.id)}
                          className="block p-3 border border-[#e8edf2] bg-[#f8f9fb] rounded hover:shadow-sm transition-shadow"
                        >
                          <div className="flex items-center gap-3">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${dCfg.badgeCls}`}>
                              {dCfg.label}
                            </span>
                            <div>
                              <p className="text-xs font-semibold text-[#1a2533]">
                                {d.department} — {d.service}
                              </p>
                              <p className="text-[10px] text-[#6b7a8d]">Blocked until this requirement is resolved</p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
              <Link
                href={ENTREPRENEUR_ROUTES.dependencies(project.id)}
                className="inline-block mt-3 text-xs text-[#1a56db] hover:underline font-medium"
              >
                View in Dependency Graph →
              </Link>
            </SectionCard>

            {/* Forms */}
            <SectionCard title="Forms">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[#e8edf2]">
                      <th className="text-left py-2 text-[#9aa5b4] font-semibold uppercase tracking-wider">Form</th>
                      <th className="text-left py-2 text-[#9aa5b4] font-semibold uppercase tracking-wider w-28">
                        Requirement
                      </th>
                      <th className="text-left py-2 text-[#9aa5b4] font-semibold uppercase tracking-wider w-28">State</th>
                      <th className="text-left py-2 w-16" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0f4f8]">
                    {enrich.forms.map(f => (
                      <tr key={f.name}>
                        <td className="py-2.5 font-medium text-[#1a2533]">{f.name}</td>
                        <td className="py-2.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                              f.requirement === 'Required'
                                ? 'bg-[#ebf3ff] text-[#1a3a5c] border-[#b8d0f5]'
                                : f.requirement === 'Conditional'
                                  ? 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]'
                                  : 'bg-[#f8f9fb] text-[#9aa5b4] border-[#d1d9e0]'
                            }`}
                          >
                            {f.requirement}
                          </span>
                        </td>
                        <td className="py-2.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                              f.state === 'Ready' || f.state === 'Completed'
                                ? 'bg-[#f0fdf4] text-[#166534] border-[#86efac]'
                                : f.state === 'Not Applicable'
                                  ? 'bg-[#f8f9fb] text-[#9aa5b4] border-[#d1d9e0]'
                                  : 'bg-[#f8f9fb] text-[#6b7a8d] border-[#d1d9e0]'
                            }`}
                          >
                            {f.state}
                          </span>
                        </td>
                        <td className="py-2.5">
                          <button type="button" className="text-[#1a56db] hover:underline text-[10px] font-medium">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>

            {/* Required Documents */}
            <SectionCard title="Required Documents">
              <div className="space-y-2">
                {enrich.docs.map(d => (
                  <div
                    key={d.name}
                    className="flex items-start gap-3 p-3 border border-[#e8edf2] rounded hover:bg-[#f8f9fb]"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-xs font-semibold text-[#1a2533]">{d.name}</p>
                        {d.required && (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-[#1a3a5c] bg-[#ebf3ff] border border-[#b8d0f5] px-1.5 py-0.5 rounded">
                            Required
                          </span>
                        )}
                        {d.reusable && (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-[#166534] bg-[#f0fdf4] border border-[#bbf7d0] px-1.5 py-0.5 rounded">
                            Reusable
                          </span>
                        )}
                      </div>
                      <div className="flex gap-3 mt-1">
                        <span className="text-[10px] text-[#6b7a8d]">Availability: {d.availability}</span>
                        <span className="text-[10px] text-[#6b7a8d]">Verification: {d.verification}</span>
                      </div>
                    </div>
                    <Link
                      href={ENTREPRENEUR_ROUTES.documents(project.id)}
                      className="text-[10px] text-[#1a56db] hover:underline font-medium shrink-0"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
              <Link
                href={ENTREPRENEUR_ROUTES.documents(project.id)}
                className="inline-block mt-3 text-xs text-[#1a56db] hover:underline font-medium"
              >
                View in Document Centre →
              </Link>
            </SectionCard>

            {/* Declarations */}
            <SectionCard title="Declarations">
              <div className="space-y-3">
                {enrich.declarations.map((d, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 border border-[#e8edf2] rounded">
                    <div
                      className={`shrink-0 mt-0.5 w-4 h-4 rounded border ${
                        d.state === 'Accepted' ? 'bg-[#22c55e] border-[#22c55e]' : 'border-[#9aa5b4]'
                      } flex items-center justify-center`}
                    >
                      {d.state === 'Accepted' && <span className="text-white text-[9px] font-bold">✓</span>}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[#374151]">{d.text}</p>
                      <p className="text-[10px] text-[#9aa5b4] mt-1">
                        {d.state === 'Required'
                          ? 'Required before submission'
                          : d.state === 'Accepted'
                            ? 'Accepted'
                            : d.state === 'Pending'
                              ? 'Pending acceptance'
                              : 'Not Applicable'}
                      </p>
                    </div>
                  </div>
                ))}
                <p className="text-[10px] text-[#9aa5b4] italic">
                  Accepting a declaration does not constitute government approval. The statutory decision rests with the
                  appropriate department.
                </p>
              </div>
            </SectionCard>

            {/* Parallel possibilities */}
            {parallel.length > 0 && (
              <SectionCard title="What can happen in parallel?">
                <p className="text-xs text-[#6b7a8d] mb-3">
                  While this requirement is in progress, these services may proceed in parallel where their dependencies
                  permit:
                </p>
                <div className="space-y-2">
                  {parallel.map(p => {
                    const pCfg = journeyStateCfg(p.displayState);
                    return (
                      <Link
                        key={p.id}
                        href={ENTREPRENEUR_ROUTES.requirement(project.id, p.id)}
                        className="block p-3 border border-[#e8edf2] rounded hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${pCfg.badgeCls}`}>
                            {pCfg.label}
                          </span>
                          <div>
                            <p className="text-xs font-semibold text-[#1a2533]">
                              {p.department} — {p.service}
                            </p>
                            <p className="text-[10px] text-[#6b7a8d]">Can proceed in parallel where applicable</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <Link
                  href={ENTREPRENEUR_ROUTES.journey(project.id)}
                  className="inline-block mt-3 text-xs text-[#1a56db] hover:underline font-medium"
                >
                  View Journey →
                </Link>
              </SectionCard>
            )}

            {/* Downstream services */}
            {downstream.length > 0 && (
              <SectionCard title="What does this unlock?">
                <p className="text-xs text-[#6b7a8d] mb-3">
                  Approval of this requirement unlocks the following downstream services:
                </p>
                <div className="space-y-2">
                  {downstream.map(d => {
                    const dCfg = journeyStateCfg(d.displayState);
                    return (
                      <Link
                        key={d.id}
                        href={ENTREPRENEUR_ROUTES.requirement(project.id, d.id)}
                        className="block p-3 border border-[#e8edf2] rounded hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${dCfg.badgeCls}`}>
                            {dCfg.label}
                          </span>
                          <div>
                            <p className="text-xs font-semibold text-[#1a2533]">
                              {d.department} — {d.service}
                            </p>
                            <p className="text-[10px] text-[#6b7a8d]">Blocked until this requirement is resolved</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </SectionCard>
            )}
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* Inspection */}
            <SectionCard title="Inspection">
              <p className="text-xs font-semibold text-[#1a2533] mb-1">{req.inspectionState ?? 'May be Required'}</p>
              <p className="text-xs text-[#6b7a8d]">{enrich.inspectionNote}</p>
              <div className="mt-3 space-y-1">
                {[
                  { label: 'Inspection Stage', value: 'During processing' },
                  { label: 'Current State', value: req.inspectionState ?? 'Not Scheduled' },
                ].map(f => (
                  <div key={f.label} className="flex justify-between text-xs">
                    <span className="text-[#9aa5b4]">{f.label}</span>
                    <span className="text-[#374151] font-medium">{f.value}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* SLA */}
            <SectionCard title="Service Level / SLA">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#9aa5b4]">Configured SLA</span>
                  <span className="font-semibold text-[#1a2533]">{enrich.slaConfigured}</span>
                </div>
                {req.slaRemaining && (
                  <>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#9aa5b4]">Remaining</span>
                      <span className="font-semibold text-[#1a56db]">{req.slaRemaining}</span>
                    </div>
                    {req.slaElapsed && (
                      <div className="flex justify-between text-xs">
                        <span className="text-[#9aa5b4]">Elapsed</span>
                        <span className="font-medium text-[#374151]">{req.slaElapsed}</span>
                      </div>
                    )}
                  </>
                )}
                {!req.slaRemaining && (
                  <p className="text-xs text-[#9aa5b4] italic">SLA tracking begins after submission.</p>
                )}
              </div>
            </SectionCard>

            {/* Fee */}
            <SectionCard title="Fee">
              <p className="text-xs text-[#6b7a8d]">{enrich.fee}</p>
              <p className="text-[10px] text-[#9aa5b4] mt-2 italic">
                Exact fee is determined by the department based on project parameters.
              </p>
            </SectionCard>

            {/* Regulatory Source */}
            <SectionCard title="Regulatory Source">
              <div className="space-y-2">
                {[
                  { label: 'Source Type', value: enrich.regSourceType },
                  { label: 'Reference', value: enrich.regReference },
                  { label: 'Clause / Section', value: enrich.regClause },
                  { label: 'Effective Date', value: enrich.regEffective },
                  { label: 'Source Document', value: enrich.regDoc },
                ].map(f => (
                  <div key={f.label}>
                    <p className="text-[10px] font-semibold text-[#9aa5b4] uppercase tracking-wider">{f.label}</p>
                    <p className="text-xs text-[#374151] mt-0.5">{f.value}</p>
                  </div>
                ))}
                <div className="pt-2 border-t border-[#e8edf2]">
                  {enrich.regVerified ? (
                    <span className="text-[10px] font-bold text-[#166534] bg-[#f0fdf4] border border-[#bbf7d0] px-2 py-0.5 rounded">
                      ✓ Verified Source
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-[#3730a3] bg-[#e0e7ff] border border-[#a5b4fc] px-2 py-0.5 rounded">
                      ◌ Needs Verification
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-[#9aa5b4] italic">
                  Regulatory rules determine applicability. This source is provided for transparency. The final decision
                  rests with the appropriate department/authority.
                </p>
              </div>
            </SectionCard>

            {/* Approval ref if approved */}
            {isApproved && req.approvalRef && (
              <div className="bg-[#f0fdf4] border border-[#86efac] rounded p-4 shadow-sm">
                <p className="text-xs font-bold text-[#166534] mb-2">✓ Approval Record</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#166534]">Reference</span>
                    <span className="font-semibold text-[#1a2533]">{req.approvalRef}</span>
                  </div>
                  {req.approvedDate && (
                    <div className="flex justify-between text-xs">
                      <span className="text-[#166534]">Date</span>
                      <span className="font-medium text-[#374151]">{req.approvedDate}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Regulatory Assistant entry */}
            <div className="bg-[#1a2533] border border-[#2d3f52] rounded p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-5 rounded-full bg-[#1a56db] text-white flex items-center justify-center text-xs font-bold">
                  ?
                </div>
                <p className="text-xs font-bold text-white">Regulatory Assistant</p>
              </div>
              <p className="text-[10px] text-[#9aa5b4] mb-3">
                Why is this required? Which GR applies? Explain in Marathi.
              </p>
              <button
                type="button"
                onClick={() => setRagOpen(true)}
                className="w-full text-xs font-semibold bg-[#1a56db] text-white px-3 py-2 rounded hover:bg-[#1e40af] transition-colors"
              >
                Ask Regulatory Assistant →
              </button>
            </div>
          </div>
        </div>

        {/* Back bar */}
        <div className="mt-5 pt-4 border-t border-[#d1d9e0] flex gap-3">
          <Link
            href={ENTREPRENEUR_ROUTES.journey(project.id)}
            className="border border-[#d1d9e0] text-[#374151] text-sm font-medium px-5 py-2.5 rounded hover:bg-[#f0f4f8] transition-colors"
          >
            ← Back to Journey
          </Link>
          <Link
            href={ENTREPRENEUR_ROUTES.dependencies(project.id)}
            className="text-xs text-[#1a56db] hover:underline font-medium self-center"
          >
            View Dependency Graph
          </Link>
        </div>
      </div>

      {/* ── Regulatory Help Drawer ── */}
      {ragOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Regulatory Help">
          <div className="absolute inset-0 bg-black/30" onClick={() => { setRagOpen(false); setRagAnswer(null); }} />
          <div className="relative bg-white w-96 max-w-full h-full shadow-2xl flex flex-col border-l border-[#d1d9e0]">
            {/* Drawer header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#e8edf2] bg-[#1a2533]">
              <div className="w-7 h-7 rounded-full bg-[#1a56db] flex items-center justify-center text-white text-xs font-bold">
                ?
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white">Regulatory Help</p>
                <p className="text-[10px] text-[#9aa5b4] truncate">About {req.service}</p>
              </div>
              <button
                type="button"
                onClick={() => { setRagOpen(false); setRagAnswer(null); }}
                className="text-[#9aa5b4] hover:text-white text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {/* Boundary notice */}
            <div className="px-4 py-2.5 bg-[#fffbeb] border-b border-[#fde68a]">
              <p className="text-[10px] text-[#92400e] font-medium">
                This assistant retrieves and explains regulatory information. It does not grant approval or make statutory
                decisions.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {/* Suggested questions */}
              {!ragAnswer && (
                <>
                  <p className="text-xs font-semibold text-[#9aa5b4] uppercase tracking-wider">Suggested questions</p>
                  <div className="space-y-2">
                    {ragSuggestions.map(q => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => handleRagQuestion(q)}
                        className="w-full text-left text-xs px-3 py-2.5 border border-[#d1d9e0] rounded hover:bg-[#f0f4f8] text-[#374151] transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Answer */}
              {ragAnswer && (
                <div>
                  <div className="mb-3 p-3 bg-[#f8f9fb] border border-[#e8edf2] rounded">
                    <p className="text-[10px] font-bold text-[#9aa5b4] uppercase tracking-wider mb-1">Your question</p>
                    <p className="text-xs text-[#374151]">{ragQuestion}</p>
                  </div>
                  <div className="p-3 bg-white border border-[#d1d9e0] rounded">
                    <p className="text-[10px] font-bold text-[#1a3a5c] uppercase tracking-wider mb-2">Response</p>
                    <p className="text-xs text-[#374151] whitespace-pre-line leading-relaxed">{ragAnswer}</p>
                    <div className="mt-3 pt-2 border-t border-[#e8edf2]">
                      <p className="text-[10px] font-semibold text-[#9aa5b4] uppercase tracking-wider mb-1">Source</p>
                      <p className="text-[10px] text-[#374151]">
                        {enrich.regSourceType}: {enrich.regReference}
                      </p>
                      <p className="text-[10px] text-[#6b7a8d]">
                        {enrich.regClause} · Effective {enrich.regEffective}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRagAnswer(null)}
                    className="mt-2 text-xs text-[#1a56db] hover:underline"
                  >
                    ← Back to questions
                  </button>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-[#e8edf2]">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  const input = (e.currentTarget.elements.namedItem('q') as HTMLInputElement)?.value;
                  if (input?.trim()) {
                    handleRagQuestion(input.trim());
                    e.currentTarget.reset();
                  }
                }}
                className="flex gap-2"
              >
                <input
                  name="q"
                  className="flex-1 text-sm border border-[#d1d9e0] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
                  placeholder="Ask about this requirement…"
                />
                <button type="submit" className="px-3 py-2 bg-[#1a3a5c] text-white text-sm rounded hover:bg-[#0f2540]">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
