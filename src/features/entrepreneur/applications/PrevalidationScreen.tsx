'use client';

import React from 'react';
import Link from 'next/link';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import { E15_ISSUES, type ValidationIssue } from './data';

export function PrevalidationScreen({
  project,
}: {
  project: BusinessProject;
}) {
  const blocking = E15_ISSUES.filter(i => i.severity === 'blocking');
  const warnings = E15_ISSUES.filter(i => i.severity === 'warning');
  const passed = E15_ISSUES.filter(i => i.severity === 'passed');

  const sections = Array.from(new Set(E15_ISSUES.map(i => i.section)));

  function severityBadge(s: ValidationIssue['severity']) {
    const map = {
      blocking: 'bg-[#fee2e2] text-[#b91c1c] border-[#fca5a5]',
      warning: 'bg-[#fef3c7] text-[#92400e] border-[#fcd34d]',
      passed: 'bg-[#dcfce7] text-[#166534] border-[#86efac]',
    };
    const label = { blocking: 'Blocking', warning: 'Attention', passed: 'Passed' };
    return <span className={`text-[10px] font-semibold px-1.5 py-0.5 border ${map[s]}`}>{label[s]}</span>;
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
            <span className="text-[#1a3a5c] font-medium">Pre-validation</span>
          </nav>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-[#1a3a5c]">Application Pre-validation</h1>
              <p className="text-sm font-semibold text-[#334155] mt-0.5">MPCB — Consent to Establish</p>
              <p className="text-xs text-[#6b7a8d] mt-0.5">{project.name} · {project.location}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-5 space-y-5">
        {/* Summary bar */}
        <div className={`border px-4 py-3 text-sm ${blocking.length > 0 ? 'border-[#fca5a5] bg-[#fff1f2] text-[#b91c1c]' : 'border-[#86efac] bg-[#f0fdf4] text-[#15803d]'}`}>
          {blocking.length > 0
            ? `${blocking.length} blocking issue${blocking.length > 1 ? 's' : ''} must be resolved before submission. ${warnings.length > 0 ? `${warnings.length} item${warnings.length > 1 ? 's' : ''} require attention.` : ''}`
            : `All blocking checks passed. ${warnings.length > 0 ? `${warnings.length} item${warnings.length > 1 ? 's' : ''} require attention — review before proceeding.` : 'Application is ready to proceed.'}`
          }
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Blocking', count: blocking.length, color: blocking.length > 0 ? 'text-[#b91c1c]' : 'text-[#94a3b8]' },
            { label: 'Attention', count: warnings.length, color: warnings.length > 0 ? 'text-[#92400e]' : 'text-[#94a3b8]' },
            { label: 'Passed', count: passed.length, color: 'text-[#15803d]' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-[#e2e8f0] px-4 py-3">
              <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
              <p className="text-xs text-[#6b7a8d] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Issues grouped by section */}
        {sections.map(sec => {
          const items = E15_ISSUES.filter(i => i.section === sec);
          return (
            <div key={sec} className="bg-white border border-[#e2e8f0]">
              <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
                <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">{sec}</p>
              </div>
              <div className="divide-y divide-[#f1f5f9]">
                {items.map((issue, i) => (
                  <div key={i} className="px-4 py-3 flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {severityBadge(issue.severity)}
                        <p className="text-sm font-medium text-[#1a3a5c]">{issue.label}</p>
                      </div>
                      <p className="text-xs text-[#6b7a8d] leading-relaxed">{issue.detail}</p>
                    </div>
                    {issue.action && (
                      <Link
                        href={ENTREPRENEUR_ROUTES.newApplication(project.id)}
                        className="shrink-0 text-xs text-[#1a56db] border border-[#d1d9e0] px-2.5 py-1.5 hover:bg-[#f1f5f9] whitespace-nowrap"
                      >
                        {issue.action}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Action footer */}
        <div className="bg-white border border-[#e2e8f0] px-5 py-3 flex items-center justify-between">
          <Link
            href={ENTREPRENEUR_ROUTES.newApplication(project.id)}
            className="text-sm text-[#475569] px-3 py-1.5 border border-[#d1d9e0] hover:bg-[#f1f5f9]"
          >
            Back to Application
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="text-sm text-[#475569] px-3 py-1.5 border border-[#d1d9e0] hover:bg-[#f1f5f9]"
            >
              Save Draft
            </button>
            {blocking.length > 0 ? (
              <button
                type="button"
                disabled
                className="text-sm px-4 py-1.5 font-medium bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed"
              >
                {blocking.length} blocking issue{blocking.length > 1 ? 's' : ''} must be resolved
              </button>
            ) : (
              <Link
                href={ENTREPRENEUR_ROUTES.applicationConsistency(project.id)}
                className="text-sm px-4 py-1.5 font-medium bg-[#1a3a5c] text-white hover:bg-[#0f2540] inline-block"
              >
                Cross-Form Consistency Check (E16) →
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
