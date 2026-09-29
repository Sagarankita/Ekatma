'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import { E15_ISSUES, type ValidationIssue, type ValidationState } from './data';
import { ApplicationWorkflowStepper } from './ApplicationWorkflowStepper';
import {
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  FileText,
  Layers,
  ChevronRight,
} from 'lucide-react';

export function PrevalidationScreen({
  project,
}: {
  project: BusinessProject;
}) {
  const router = useRouter();

  const verified = E15_ISSUES.filter(i => i.state === 'verified');
  const attention = E15_ISSUES.filter(i => i.state === 'attention');
  const info = E15_ISSUES.filter(i => i.state === 'info');

  const sections = Array.from(new Set(E15_ISSUES.map(i => i.section)));

  function renderStatusBadge(state: ValidationState) {
    switch (state) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>✓ Verified</span>
          </span>
        );
      case 'attention':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-300 px-2.5 py-0.5 rounded-md">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>⚠ Needs attention</span>
          </span>
        );
      case 'info':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>○ Needs information</span>
          </span>
        );
    }
  }

  function resolveActionHref(issue: ValidationIssue): string {
    if (issue.actionHref === 'consistency') {
      return ENTREPRENEUR_ROUTES.applicationConsistency(project.id);
    }
    if (issue.actionHref === 'documents') {
      return ENTREPRENEUR_ROUTES.documents(project.id);
    }
    if (issue.actionHref === 'dossier') {
      return ENTREPRENEUR_ROUTES.dossier(project.id);
    }
    return ENTREPRENEUR_ROUTES.newApplication(project.id);
  }

  return (
    <main id="main-content" className="flex-1 bg-[#F9FAF2] pb-20 font-sans" tabIndex={-1}>
      {/* ── 6-STAGE PIPELINE STEPPER ── */}
      <ApplicationWorkflowStepper businessId={project.id} currentStep={3} />

      {/* ── Header ── */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-5">
        <div className="max-w-[1280px] mx-auto">
          <nav className="text-xs text-slate-500 mb-2.5 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#355E3B] hover:underline">
              {project.name}
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.applications(project.id)} className="hover:text-[#355E3B] hover:underline">
              Applications
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.newApplication(project.id)} className="hover:text-[#355E3B] hover:underline">
              Application Workspace
            </Link>
            <span>›</span>
            <span className="text-[#355E3B] font-bold">Check for Issues (Pre-validation)</span>
          </nav>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-[#355E3B]/8 text-[#355E3B] border border-[#355E3B]/15 px-2.5 py-0.5 rounded-md">
                  Stage 3 of 6 · Check for Issues
                </span>
                <span className="text-xs text-slate-500">· Automated Statutory Pre-Validation</span>
              </div>
              <h1 className="text-xl font-bold text-[#355E3B]">
                Pre-Validation &amp; Integrity Check
              </h1>
              <p className="mt-1 text-sm text-slate-600">Check requirements and dossier information before submission.</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Statutory Rule Engine Active</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8 space-y-7">
        {/* ── TRI-STATE DISTINCTION METRIC STRIP ── */}
        <section aria-label="Pre-validation Tri-State Summary">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 1. Verified */}
            <div className="bg-white p-5 rounded-xl border border-emerald-200/90 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                  ✓ Verified
                </span>
                <p className="text-xs text-slate-500 mt-0.5">Rules &amp; data checks passed</p>
                <p className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1">
                  {verified.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
            </div>

            {/* 2. Needs Attention */}
            <div className="bg-white p-5 rounded-xl border border-amber-200/90 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                  ⚠ Needs Attention
                </span>
                <p className="text-xs text-slate-500 mt-0.5">Differences to review</p>
                <p className="text-2xl sm:text-3xl font-black text-amber-700 mt-1">
                  {attention.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
            </div>

            {/* 3. Needs Information */}
            <div className="bg-white p-5 rounded-xl border border-blue-200/90 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block">
                  ○ Needs Information
                </span>
                <p className="text-xs text-slate-500 mt-0.5">Recommended additions</p>
                <p className="text-2xl sm:text-3xl font-black text-blue-700 mt-1">
                  {info.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </section>

        {/* ── STATUS CALLOUT ── */}
        <div
          className={`p-4 sm:p-5 rounded-xl border shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            attention.length > 0
              ? 'bg-amber-50/70 border-amber-200 text-amber-950'
              : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
          }`}
        >
          <div className="flex items-start sm:items-center gap-3.5">
            {attention.length > 0 ? (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
            )}
            <div>
              <p className="font-bold text-sm">
                {attention.length > 0
                  ? `${attention.length} item${attention.length > 1 ? 's' : ''} require attention before submission.`
                  : 'All automated pre-validation checks passed successfully.'}
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                {attention.length > 0
                  ? 'Each item below has a direct action to resolve discrepancies. Do not worry — you will be able to review side-by-side differences in Stage 4.'
                  : 'You can proceed directly to the Cross-Form Consistency verification step.'}
              </p>
            </div>
          </div>

          {attention.length > 0 && (
            <Link
              href={ENTREPRENEUR_ROUTES.applicationConsistency(project.id)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#355E3B] text-white hover:bg-[#122b49] text-xs font-bold transition-all shadow-2xs shrink-0 self-start sm:self-center"
            >
              <span>Review Differences (Stage 4)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {/* ── VALIDATION ISSUES LIST (Grouped by Section, Actionable Destinations) ── */}
        <div className="space-y-5">
          {sections.map(section => {
            const sectionIssues = E15_ISSUES.filter(i => i.section === section);

            return (
              <div
                key={section}
                className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden"
              >
                {/* Section Header */}
                <div className="px-6 py-3.5 bg-slate-50/90 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {section}
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {sectionIssues.filter(i => i.state === 'verified').length} / {sectionIssues.length} checks passed
                  </span>
                </div>

                {/* Section Checks */}
                <div className="divide-y divide-slate-100">
                  {sectionIssues.map(issue => {
                    const actionHref = resolveActionHref(issue);

                    return (
                      <div
                        key={issue.id}
                        className={`p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                          issue.state === 'attention'
                            ? 'bg-amber-50/25 hover:bg-amber-50/40'
                            : issue.state === 'info'
                            ? 'bg-blue-50/20 hover:bg-blue-50/30'
                            : 'hover:bg-slate-50/60'
                        }`}
                      >
                        {/* Left: Status & Detail */}
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            {renderStatusBadge(issue.state)}
                            <h4 className="text-sm font-bold text-slate-900 leading-snug">
                              {issue.label}
                            </h4>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                            {issue.detail}
                          </p>
                        </div>

                        {/* Right: Actionable Destination Button */}
                        {issue.action ? (
                          <div className="shrink-0 md:self-center">
                            <Link
                              href={actionHref}
                              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs ${
                                issue.state === 'attention'
                                  ? 'bg-amber-700 hover:bg-amber-800 text-white'
                                  : issue.state === 'info'
                                  ? 'bg-[#6DAE7C] hover:bg-[#1542a8] text-white'
                                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                              }`}
                            >
                              <span>{issue.action}</span>
                            </Link>
                          </div>
                        ) : (
                          <div className="shrink-0 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Satisfied</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── FOOTER ACTIONS ── */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
          <Link
            href={ENTREPRENEUR_ROUTES.newApplication(project.id)}
            className="text-xs font-semibold px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
          >
            ← Back to Application Workspace
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="text-xs font-semibold px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Save Draft
            </button>

            <Link
              href={ENTREPRENEUR_ROUTES.applicationConsistency(project.id)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#355E3B] hover:bg-[#122b49] text-white text-xs font-bold transition-all shadow-2xs"
            >
              <span>Resolve Issues in Cross-Form Consistency (Stage 4)</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
