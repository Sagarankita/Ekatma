'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import { E16_ROWS, type ConsistencyRow } from './data';
import { ApplicationWorkflowStepper } from './ApplicationWorkflowStepper';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  ExternalLink,
  Edit3,
  Check,
  RotateCcw,
  ChevronRight,
  Database,
  Layers,
} from 'lucide-react';

export function ConsistencyScreen({
  project,
}: {
  project: BusinessProject;
}) {
  const router = useRouter();

  // Local state to track interactive resolution of discrepancies
  const [resolvedValues, setResolvedValues] = useState<Record<string, { value: string; method: 'master' | 'custom' | null }>>({});
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState<string>('');

  // Identify rows with review/conflict
  const discrepancyRows = E16_ROWS.filter(r =>
    r.applications.some(a => a.status === 'review' || a.status === 'conflict')
  );

  const consistentRows = E16_ROWS.filter(r =>
    r.applications.every(a => a.status === 'consistent')
  );

  // Check how many discrepancies are resolved
  const resolvedCount = Object.keys(resolvedValues).length;
  const allResolved = resolvedCount >= discrepancyRows.length;

  const handleUseMasterValue = (row: ConsistencyRow) => {
    setResolvedValues(prev => ({
      ...prev,
      [row.id]: { value: row.master, method: 'master' },
    }));
    if (editingFieldId === row.id) {
      setEditingFieldId(null);
    }
  };

  const handleStartCustomEdit = (row: ConsistencyRow) => {
    setEditingFieldId(row.id);
    setCustomInput(resolvedValues[row.id]?.value || row.appValue);
  };

  const handleApplyCustomEdit = (row: ConsistencyRow) => {
    if (!customInput.trim()) return;
    setResolvedValues(prev => ({
      ...prev,
      [row.id]: { value: customInput.trim(), method: 'custom' },
    }));
    setEditingFieldId(null);
  };

  const handleResetRow = (rowId: string) => {
    setResolvedValues(prev => {
      const next = { ...prev };
      delete next[rowId];
      return next;
    });
    setEditingFieldId(null);
  };

  return (
    <main id="main-content" className="flex-1 bg-[#F8F9FA] pb-20 font-sans" tabIndex={-1}>
      {/* ── 6-STAGE PIPELINE STEPPER ── */}
      <ApplicationWorkflowStepper businessId={project.id} currentStep={4} />

      {/* ── Header ── */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-5">
        <div className="max-w-[1280px] mx-auto">
          <nav className="text-xs text-slate-500 mb-2.5 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#17365D] hover:underline">
              {project.name}
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.applications(project.id)} className="hover:text-[#17365D] hover:underline">
              Applications
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.applicationPrevalidation(project.id)} className="hover:text-[#17365D] hover:underline">
              Pre-validation
            </Link>
            <span>›</span>
            <span className="text-[#17365D] font-bold">Resolve Issues (Cross-Form Consistency)</span>
          </nav>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-[#17365D]/8 text-[#17365D] border border-[#17365D]/15 px-2.5 py-0.5 rounded-md">
                  Stage 4 of 6 · Resolve Issues
                </span>
                <span className="text-xs text-slate-500">· Cross-Application Data Harmonization</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#17365D] tracking-tight">
                Cross-Form Consistency Resolver
              </h1>
              <p className="mt-1 text-sm text-slate-600">Resolve differences between applications and the Master Project Dossier.</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Single-Dossier Harmonizer</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8 space-y-7">
        {/* ── RESOLUTION STATUS SUMMARY BANNER ── */}
        <div
          className={`p-5 rounded-xl border shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
            allResolved
              ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
              : 'bg-amber-50/80 border-amber-300 text-amber-950'
          }`}
        >
          <div className="flex items-start sm:items-center gap-3.5">
            {allResolved ? (
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <AlertTriangle className="w-6 h-6" />
              </div>
            )}
            <div>
              <p className="font-extrabold text-base">
                {allResolved
                  ? 'All Discrepancies Successfully Resolved!'
                  : `${discrepancyRows.length - resolvedCount} of ${discrepancyRows.length} Differences Need Your Decision`}
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                {allResolved
                  ? 'Application values are now fully synchronized with your Master Project Dossier. Ready for Payment and Submission.'
                  : 'Review the side-by-side values below. You can adopt the Master Dossier value with one click, or enter a justified value.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {allResolved ? (
              <Link
                href={ENTREPRENEUR_ROUTES.applicationSubmission(project.id)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-2xs"
              >
                <span>Proceed to Pay &amp; Submit (Stage 5)</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => discrepancyRows.forEach(r => handleUseMasterValue(r))}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#17365D] hover:bg-[#122b49] text-white text-xs font-bold transition-all shadow-2xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Use Master Values for All</span>
              </button>
            )}
          </div>
        </div>

        {/* ── DISCREPANCIES SECTION (VALUE A vs VALUE B SIDE-BY-SIDE CARDS) ── */}
        <section aria-label="Discrepancy Resolution Cards" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Discrepancies Requiring Review ({discrepancyRows.length})
            </h2>
            <span className="text-xs text-slate-500">
              Resolved: <strong>{resolvedCount}</strong> / {discrepancyRows.length}
            </span>
          </div>

          {discrepancyRows.map(row => {
            const isResolved = Boolean(resolvedValues[row.id]);
            const resolution = resolvedValues[row.id];
            const isEditing = editingFieldId === row.id;

            return (
              <div
                key={row.id}
                className={`bg-white rounded-xl border transition-all shadow-2xs overflow-hidden ${
                  isResolved
                    ? 'border-emerald-300 ring-1 ring-emerald-200'
                    : 'border-amber-300 ring-1 ring-amber-200'
                }`}
              >
                {/* Field Card Header */}
                <div
                  className={`px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b ${
                    isResolved ? 'bg-emerald-50/50 border-emerald-100' : 'bg-amber-50/40 border-amber-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base font-extrabold text-slate-900">
                      {row.field}
                    </span>
                    {isResolved ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>
                          Resolved ({resolution.method === 'master' ? 'Master Value Applied' : 'Custom Override'})
                        </span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Discrepancy Flagged</span>
                      </span>
                    )}
                  </div>

                  {isResolved && (
                    <button
                      type="button"
                      onClick={() => handleResetRow(row.id)}
                      className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1 font-medium transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>

                {/* ── SIDE-BY-SIDE: VALUE A vs VALUE B ── */}
                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* VALUE A: Master Project Dossier */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                            VALUE A · Master Project Dossier
                          </span>
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Verified</span>
                          </span>
                        </div>
                        <p className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                          {row.master}
                        </p>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">Source:</span> {row.masterSource}
                      </div>
                    </div>

                    {/* VALUE B: Application Form Draft */}
                    <div
                      className={`p-4 rounded-xl border flex flex-col justify-between transition-colors ${
                        isResolved
                          ? 'bg-emerald-50/40 border-emerald-200'
                          : 'bg-amber-50/40 border-amber-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                            VALUE B · Application Form Draft
                          </span>
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                              isResolved
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {isResolved ? 'Updated Draft Value' : 'Current Draft Value'}
                          </span>
                        </div>
                        <p className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                          {isResolved ? resolution.value : row.appValue}
                        </p>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-200/80 text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">Draft Source:</span> {row.appSource}
                      </div>
                    </div>
                  </div>

                  {/* ── EXPLICIT EXPLANATION CALLOUT ── */}
                  <div
                    className={`p-3.5 rounded-lg border text-xs leading-relaxed flex items-start gap-2.5 ${
                      isResolved
                        ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                        : 'bg-amber-50/60 border-amber-200 text-amber-950'
                    }`}
                  >
                    {isResolved ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-bold">
                        {isResolved
                          ? 'Discrepancy Resolved'
                          : 'These values are different.'}
                      </p>
                      <p className="text-slate-600 mt-0.5">
                        {isResolved
                          ? `Application value has been updated to "${resolution.value}". This value will be used across all statutory submission forms.`
                          : row.explanation}
                      </p>
                    </div>
                  </div>

                  {/* ── INLINE CUSTOM EDIT DRAWER ── */}
                  {isEditing && (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                      <label className="text-xs font-bold text-slate-800 block">
                        Edit Application Value with Justified Explanation:
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={customInput}
                          onChange={e => setCustomInput(e.target.value)}
                          placeholder={`Enter custom value for ${row.field}…`}
                          className="flex-1 text-xs px-3.5 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#17365D]"
                        />
                        <button
                          type="button"
                          onClick={() => handleApplyCustomEdit(row)}
                          className="px-4 py-2 bg-[#17365D] hover:bg-[#122b49] text-white text-xs font-bold rounded-lg transition-colors shadow-2xs"
                        >
                          Apply Value
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingFieldId(null)}
                          className="px-3 py-2 border border-slate-300 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Note: If custom values differ from the Master Dossier, you may be asked by the scrutiny officer to provide justification during review.
                      </p>
                    </div>
                  )}

                  {/* ── 3 EXPLICIT RESOLUTION ACTIONS ── */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                    <div className="flex flex-wrap items-center gap-2.5">
                      {/* 1. Use Master Project Dossier value */}
                      <button
                        type="button"
                        onClick={() => handleUseMasterValue(row)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-2xs ${
                          isResolved && resolution.method === 'master'
                            ? 'bg-emerald-700 text-white'
                            : 'bg-[#17365D] hover:bg-[#122b49] text-white'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Use Master Project Dossier value ({row.master})</span>
                      </button>

                      {/* 2. Edit application value */}
                      <button
                        type="button"
                        onClick={() => handleStartCustomEdit(row)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                        <span>Edit application value</span>
                      </button>
                    </div>

                    {/* 3. Review source */}
                    <Link
                      href={ENTREPRENEUR_ROUTES.documents(project.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#17365D] hover:underline"
                    >
                      <Database className="w-3.5 h-3.5" />
                      <span>Review source document in Dossier</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* ── CONSISTENT FIELDS TABLE (Already Verified Across All Records) ── */}
        <section aria-label="Consistent Fields Summary" className="space-y-3">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Already Consistent with Master Dossier ({consistentRows.length})
          </h2>

          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-6">Field</th>
                  <th className="py-3 px-4">Master Dossier Value</th>
                  <th className="py-3 px-4">Application Value</th>
                  <th className="py-3 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {consistentRows.map(row => (
                  <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-6 font-semibold text-slate-800">
                      {row.field}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      {row.master}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      {row.appValue}
                    </td>
                    <td className="py-3 px-6 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>Consistent</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── FOOTER ACTIONS ── */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
          <Link
            href={ENTREPRENEUR_ROUTES.applicationPrevalidation(project.id)}
            className="text-xs font-semibold px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
          >
            ← Back to Pre-validation (Stage 3)
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="text-xs font-semibold px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Save Draft
            </button>

            <Link
              href={ENTREPRENEUR_ROUTES.applicationSubmission(project.id)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#17365D] hover:bg-[#122b49] text-white text-xs font-bold transition-all shadow-2xs"
            >
              <span>Proceed to Payment &amp; Submission (Stage 5)</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
