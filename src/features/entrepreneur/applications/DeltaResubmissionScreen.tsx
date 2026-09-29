'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  FileText,
  FileCheck,
  ShieldCheck,
  Building2,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import {
  E21_CATEGORIZED_DELTAS,
  E21_UNCHANGED_PRESERVED_FIELDS,
  E21_AFFECTED_CHECKS,
  type CategorizedDeltaItem,
  type DeltaChangeKind,
} from './data';

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
  const [activeFilter, setActiveFilter] = useState<'all' | 'changed' | 'new_document' | 'replaced' | 'unchanged'>('all');
  const [expandedUnchanged, setExpandedUnchanged] = useState(false);
  const timestamp = '29 Sep 2026, 12:00 IST';

  const changedItems = E21_CATEGORIZED_DELTAS.filter(d => d.kind === 'changed');
  const newDocItems = E21_CATEGORIZED_DELTAS.filter(d => d.kind === 'new_document');
  const replacedItems = E21_CATEGORIZED_DELTAS.filter(d => d.kind === 'replaced');

  const filteredDeltas =
    activeFilter === 'all'
      ? E21_CATEGORIZED_DELTAS
      : activeFilter === 'unchanged'
      ? []
      : E21_CATEGORIZED_DELTAS.filter(d => d.kind === activeFilter);

  // ─── POST-SUBMISSION CONFIRMATION STATE ───────────────────────────────────
  if (submitted) {
    return (
      <main id="main-content" className="flex-1 bg-[#F9FAF2]" tabIndex={-1}>
        <div className="bg-white border-b border-[#d6dfd5] px-6 py-4">
          <div className="max-w-[1000px] mx-auto">
            <nav className="text-xs text-[#555C56] mb-2 flex items-center gap-1.5" aria-label="Breadcrumb">
              <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#355E3B] hover:underline">
                Dashboard
              </Link>
              <span>›</span>
              <Link href={ENTREPRENEUR_ROUTES.applications(project.id)} className="hover:text-[#355E3B] hover:underline">
                Applications
              </Link>
              <span>›</span>
              <Link href={ENTREPRENEUR_ROUTES.application(project.id, applicationId)} className="hover:text-[#355E3B] hover:underline">
                {applicationId}
              </Link>
              <span>›</span>
              <span className="text-[#355E3B] font-medium font-mono">Resubmission Confirmed</span>
            </nav>
            <h1 className="text-xl font-bold text-[#355E3B]">Resubmission Package #2 Formally Submitted</h1>
          </div>
        </div>

        <div className="max-w-[1000px] mx-auto px-6 py-8 space-y-6">
          {/* Success Banner */}
          <div className="bg-[#f0fdf4] border border-[#86efac] border-l-4 border-l-[#15803d] rounded-lg p-5 shadow-2xs">
            <div className="flex items-start gap-3.5">
              <CheckCircle2 className="w-6 h-6 text-[#15803d] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-[#166534] uppercase tracking-wider bg-[#dcfce7] px-2 py-0.5 rounded">
                  Response Submitted &amp; Dossier Version R2 Published
                </span>
                <h2 className="text-base font-bold text-[#166534] mt-1.5">
                  Delta Package Transmitted to MPCB Environmental Scrutiny Desk
                </h2>
                <p className="text-xs text-[#166534] mt-1 leading-relaxed">
                  Your updated Form-I data and superseding engineering drawings have been locked into the single-window registry. Scrutiny is now limited exclusively to modified items.
                </p>
              </div>
            </div>
          </div>

          {/* Submission Details Card */}
          <section aria-label="Resubmission Confirmation" className="bg-white border border-[#e3ebe1] rounded-lg p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-[#355E3B] uppercase tracking-wider border-b border-[#F9FAF2] pb-3">
              Resubmission Record Audit Log
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="bg-[#F9FAF2] p-3 rounded border border-[#F9FAF2]">
                <span className="text-[#555C56] block font-medium">Resubmission UID</span>
                <span className="font-mono font-bold text-[#355E3B] text-sm mt-0.5 block">{resubmissionId}</span>
                <span className="text-[10px] text-[#9ab098] mt-0.5 block">Version 2 (R2)</span>
              </div>

              <div className="bg-[#F9FAF2] p-3 rounded border border-[#F9FAF2]">
                <span className="text-[#555C56] block font-medium">Affected Application</span>
                <span className="font-mono font-bold text-[#355E3B] text-sm mt-0.5 block">{applicationId}</span>
                <span className="text-[10px] text-[#555C56] mt-0.5 block">Consent to Establish (MPCB)</span>
              </div>

              <div className="bg-[#F9FAF2] p-3 rounded border border-[#F9FAF2]">
                <span className="text-[#555C56] block font-medium">Submission Timestamp</span>
                <span className="font-semibold text-[#1e293b] text-sm mt-0.5 block">{timestamp}</span>
                <span className="text-[10px] text-[#15803d] mt-0.5 block font-medium">e-Pramaan Certified</span>
              </div>

              <div className="bg-[#F9FAF2] p-3 rounded border border-[#F9FAF2]">
                <span className="text-[#555C56] block font-medium">Scrutiny Desk Route</span>
                <span className="font-semibold text-[#355E3B] text-sm mt-0.5 block">MPCB Environmental Officer</span>
                <span className="text-[10px] text-[#9ab098] mt-0.5 block">Delta Scrutiny Queue</span>
              </div>
            </div>
          </section>

          {/* WHAT HAPPENS NEXT */}
          <section aria-label="What Happens Next" className="bg-white border border-[#e3ebe1] rounded-lg p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-[#F9FAF2] pb-3">
              <Clock className="w-4 h-4 text-[#6DAE7C]" />
              <h3 className="text-sm font-bold text-[#355E3B] uppercase tracking-wider">
                What Happens Next?
              </h3>
            </div>

            <ol className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#e3ebe1] text-xs">
              <li className="relative">
                <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-[#15803d] text-white flex items-center justify-center text-[10px] font-bold">
                  ✓
                </div>
                <h4 className="font-bold text-[#355E3B]">1. Statutory SLA Clock Resumed</h4>
                <p className="text-[#4A4A4A] mt-0.5 leading-relaxed">
                  The RTS clock resumed on {timestamp}. Remaining SLA time for Consent to Establish is 16 working days.
                </p>
              </li>

              <li className="relative">
                <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-[#6DAE7C] text-white flex items-center justify-center text-[10px] font-bold">
                  2
                </div>
                <h4 className="font-bold text-[#355E3B]">2. Isolated Delta Re-Scrutiny (No Re-Testing Unchanged Data)</h4>
                <p className="text-[#4A4A4A] mt-0.5 leading-relaxed">
                  The department re-verifies only the 2 changed parameters (Water Consumption &amp; ETP Capacity) and 2 documents. The 42 other project fields are pre-approved and locked.
                </p>
              </li>

              <li className="relative">
                <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-[#c8d4c7] text-[#4A4A4A] flex items-center justify-center text-[10px] font-bold">
                  3
                </div>
                <h4 className="font-bold text-[#355E3B]">3. Consent Committee Final Order</h4>
                <p className="text-[#4A4A4A] mt-0.5 leading-relaxed">
                  The scrutiny memo will be submitted directly to the Consent Committee for final order issuance and cryptographic certificate generation.
                </p>
              </li>
            </ol>
          </section>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <Link
              href={ENTREPRENEUR_ROUTES.application(project.id, applicationId)}
              className="text-xs bg-[#355E3B] text-white hover:bg-[#0f2338] px-5 py-2.5 rounded-md font-semibold transition-colors shadow-xs"
            >
              View Application Detail Cockpit →
            </Link>

            <Link
              href={ENTREPRENEUR_ROUTES.applications(project.id)}
              className="text-xs border border-[#c8d4c7] text-[#4A4A4A] hover:bg-[#F9FAF2] px-4 py-2.5 rounded-md font-semibold transition-colors"
            >
              Back to Tracker Table
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ─── DELTA REVIEW VIEW ──────────────────────────────────────────────────────
  return (
    <main id="main-content" className="flex-1 bg-[#F9FAF2]" tabIndex={-1}>
      {/* ─── Breadcrumb & Top Bar ────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#d6dfd5] px-6 py-4">
        <div className="max-w-[1000px] mx-auto">
          <nav className="text-xs text-[#555C56] mb-2 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#355E3B] hover:underline">
              Dashboard
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.applications(project.id)} className="hover:text-[#355E3B] hover:underline">
              Applications Tracker
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.application(project.id, applicationId)} className="hover:text-[#355E3B] hover:underline">
              {applicationId}
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.applicationQuery(project.id, applicationId, 'QRY-001')} className="hover:text-[#355E3B] hover:underline">
              Query QRY-001
            </Link>
            <span>›</span>
            <span className="text-[#355E3B] font-medium font-mono">Delta Review</span>
          </nav>

          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded border border-[#c8d4c7] bg-[#F9FAF2] text-[#1e293b]">
                  Resubmission #{resubmissionId.split('-').pop()}
                </span>
                <h1 className="text-xl font-bold text-[#355E3B]">Delta Resubmission Review — {resubmissionId}</h1>
              </div>
              <p className="text-xs text-[#555C56] mt-1">
                Parent Application: <strong className="font-mono text-[#1e293b]">{applicationId}</strong> · Consent to Establish · MPCB
              </p>
            </div>

            <Link
              href={ENTREPRENEUR_ROUTES.applicationQuery(project.id, applicationId, 'QRY-001')}
              className="text-xs border border-[#c8d4c7] text-[#4A4A4A] hover:bg-[#F9FAF2] px-3.5 py-1.5 rounded transition-colors font-medium"
            >
              ← Edit Query Responses
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 py-6 space-y-6">
        {/* ─── Delta Review Notice ─────────────────────────────────────────── */}
        <div className="bg-[#edf5ef] border border-[#c5e2cb] border-l-4 border-l-[#6DAE7C] rounded-lg p-4.5 shadow-2xs">
          <div className="flex items-start gap-3">
            <Layers className="w-5 h-5 text-[#6DAE7C] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-[#539160] uppercase tracking-wider">
                Automated Delta Isolation &amp; Zero Manual Comparison
              </p>
              <p className="text-xs text-[#539160] mt-1 leading-relaxed">
                The platform automatically contrasts your revised submission against version 1. Only modified parameters and newly attached evidence are queued for MPCB re-scrutiny. <strong>42 unchanged fields are preserved and pre-verified.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* ─── 4 Category Filter Pills: CHANGED, UNCHANGED, NEW DOCUMENT, REMOVED / REPLACED ─── */}
        <div className="bg-white border border-[#e3ebe1] rounded-lg p-3 shadow-2xs flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-[#555C56] uppercase tracking-wider px-2">
            Categories:
          </span>

          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`text-xs px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
              activeFilter === 'all'
                ? 'bg-[#355E3B] text-white shadow-2xs'
                : 'bg-[#F9FAF2] text-[#4A4A4A] hover:bg-[#e3ebe1]'
            }`}
          >
            All Updates
            <span className="text-[10px] bg-black/10 px-1.5 py-0.2 rounded-full font-bold">
              {E21_CATEGORIZED_DELTAS.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('changed')}
            className={`text-xs px-3 py-1.5 rounded-md font-bold transition-colors flex items-center gap-1.5 ${
              activeFilter === 'changed'
                ? 'bg-[#D4A017] text-white shadow-2xs'
                : 'bg-[#fdf8e6] text-[#7a5807] border border-[#fae69e] hover:bg-[#fae69e]'
            }`}
          >
            CHANGED
            <span className="text-[10px] bg-black/10 px-1.5 py-0.2 rounded-full font-bold">
              {changedItems.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('new_document')}
            className={`text-xs px-3 py-1.5 rounded-md font-bold transition-colors flex items-center gap-1.5 ${
              activeFilter === 'new_document'
                ? 'bg-[#15803d] text-white shadow-2xs'
                : 'bg-[#dcfce7] text-[#166534] border border-[#86efac] hover:bg-[#bbf7d0]'
            }`}
          >
            NEW DOCUMENT
            <span className="text-[10px] bg-black/10 px-1.5 py-0.2 rounded-full font-bold">
              {newDocItems.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('replaced')}
            className={`text-xs px-3 py-1.5 rounded-md font-bold transition-colors flex items-center gap-1.5 ${
              activeFilter === 'replaced'
                ? 'bg-[#6DAE7C] text-white shadow-2xs'
                : 'bg-[#edf5ef] text-[#539160] border border-[#a1cba9] hover:bg-[#c5e2cb]'
            }`}
          >
            REMOVED / REPLACED
            <span className="text-[10px] bg-black/10 px-1.5 py-0.2 rounded-full font-bold">
              {replacedItems.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('unchanged')}
            className={`text-xs px-3 py-1.5 rounded-md font-bold transition-colors flex items-center gap-1.5 ${
              activeFilter === 'unchanged'
                ? 'bg-[#4A4A4A] text-white shadow-2xs'
                : 'bg-[#F9FAF2] text-[#4A4A4A] border border-[#c8d4c7] hover:bg-[#e3ebe1]'
            }`}
          >
            UNCHANGED
            <span className="text-[10px] bg-black/10 px-1.5 py-0.2 rounded-full font-bold">
              42
            </span>
          </button>
        </div>

        {/* ─── Categorized Delta Cards List (No Manual Comparison!) ───────── */}
        {activeFilter !== 'unchanged' && (
          <div className="space-y-4">
            {filteredDeltas.map(item => {
              const isChanged = item.kind === 'changed';
              const isNewDoc = item.kind === 'new_document';
              const isReplaced = item.kind === 'replaced';

              return (
                <div
                  key={item.id}
                  className={`bg-white border rounded-lg overflow-hidden shadow-2xs transition-all ${
                    isChanged
                      ? 'border-[#fae69e]'
                      : isNewDoc
                      ? 'border-[#86efac]'
                      : 'border-[#a1cba9]'
                  }`}
                >
                  {/* Card Header with Exact Badge */}
                  <div
                    className={`px-5 py-2.5 border-b flex flex-wrap items-center justify-between gap-3 ${
                      isChanged
                        ? 'bg-[#fdf8e6] border-[#fae69e]'
                        : isNewDoc
                        ? 'bg-[#f0fdf4] border-[#bbf7d0]'
                        : 'bg-[#edf5ef] border-[#c5e2cb]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                          isChanged
                            ? 'bg-[#fdf8e6] text-[#7a5807] border-[#fae69e]'
                            : isNewDoc
                            ? 'bg-[#dcfce7] text-[#166534] border-[#86efac]'
                            : 'bg-[#edf5ef] text-[#539160] border-[#a1cba9]'
                        }`}
                      >
                        {isChanged
                          ? 'CHANGED'
                          : isNewDoc
                          ? 'NEW DOCUMENT'
                          : 'REMOVED / REPLACED'}
                      </span>
                      <h3 className="text-sm font-bold text-[#355E3B]">{item.title}</h3>
                    </div>

                    <span className="text-xs text-[#555C56] font-medium">{item.section}</span>
                  </div>

                  {/* Card Body: Direct Before vs After Comparison */}
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {/* Previous Version */}
                      <div className="bg-[#F9FAF2] p-3.5 rounded border border-[#e3ebe1] space-y-1">
                        <span className="text-[10px] font-bold text-[#555C56] uppercase tracking-wider block">
                          Previous Submission (v1)
                        </span>
                        <p className="text-sm text-[#9ab098] line-through font-mono mt-1">
                          {item.oldValue}
                        </p>
                      </div>

                      {/* Updated Version */}
                      <div
                        className={`p-3.5 rounded border space-y-1 ${
                          isNewDoc
                            ? 'bg-[#f0fdf4] border-[#86efac]'
                            : isChanged
                            ? 'bg-[#fdf8e6] border-[#fae69e]'
                            : 'bg-[#edf5ef] border-[#c5e2cb]'
                        }`}
                      >
                        <span className="text-[10px] font-bold text-[#15803d] uppercase tracking-wider block flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Updated Resubmission (v2)
                        </span>
                        <p className="text-sm text-[#15803d] font-bold font-mono mt-1">
                          {item.newValue}
                        </p>
                      </div>
                    </div>

                    {/* Rationale (Why this changed — eliminates manual guessing) */}
                    <div className="bg-[#fcfdfd] p-3 rounded border border-[#F9FAF2] text-xs flex items-start gap-2 text-[#4A4A4A]">
                      <span className="font-bold text-[#355E3B] shrink-0">Rationale:</span>
                      <span className="leading-relaxed">{item.rationale}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ─── UNCHANGED SECTION (Preserved Without Manual Check) ─────────── */}
        <section aria-label="Unchanged Data" className="bg-white border border-[#e3ebe1] rounded-lg overflow-hidden shadow-2xs">
          <div
            className="px-5 py-3 border-b border-[#e3ebe1] bg-[#F9FAF2] flex items-center justify-between cursor-pointer"
            onClick={() => setExpandedUnchanged(!expandedUnchanged)}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-[#c8d4c7] bg-white text-[#4A4A4A]">
                UNCHANGED
              </span>
              <h3 className="text-sm font-bold text-[#355E3B]">
                42 Master Fields Carried Forward Unchanged
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#15803d] font-semibold bg-[#dcfce7] border border-[#86efac] px-2 py-0.5 rounded">
                Pre-verified &amp; Locked
              </span>
              <button
                type="button"
                className="text-xs text-[#6DAE7C] font-semibold flex items-center gap-0.5"
              >
                {expandedUnchanged ? 'Hide Details' : 'Inspect Sample'}
                {expandedUnchanged ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="p-5 text-xs space-y-3">
            <p className="text-[#555C56] leading-relaxed">
              All other fields from your original submission are carried forward automatically without requiring re-verification. The department will not re-open these fields.
            </p>

            {expandedUnchanged && (
              <div className="border border-[#e3ebe1] rounded-lg overflow-hidden mt-3">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#F9FAF2] border-b border-[#e3ebe1] text-[10px] font-semibold text-[#555C56] uppercase tracking-wider">
                      <th className="px-4 py-2.5 border-r border-[#F9FAF2]">Project Field</th>
                      <th className="px-4 py-2.5 border-r border-[#F9FAF2]">Section</th>
                      <th className="px-4 py-2.5 border-r border-[#F9FAF2]">Carried Forward Value</th>
                      <th className="px-4 py-2.5">Audit State</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F9FAF2]">
                    {E21_UNCHANGED_PRESERVED_FIELDS.map((row, i) => (
                      <tr key={i} className="hover:bg-[#F9FAF2]">
                        <td className="px-4 py-2.5 font-medium text-[#355E3B] border-r border-[#F9FAF2]">{row.field}</td>
                        <td className="px-4 py-2.5 text-[#555C56] border-r border-[#F9FAF2]">{row.section}</td>
                        <td className="px-4 py-2.5 font-mono text-[#3A3E39] border-r border-[#F9FAF2]">{row.value}</td>
                        <td className="px-4 py-2.5">
                          <span className="text-[10px] font-semibold text-[#166534] bg-[#dcfce7] border border-[#86efac] px-2 py-0.5 rounded">
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* ─── Affected Downstream Checks (Preserved Functionality) ────────── */}
        <section aria-label="Affected Dependency Checks" className="bg-white border border-[#e3ebe1] rounded-lg overflow-hidden shadow-2xs">
          <div className="px-5 py-3 border-b border-[#e3ebe1] bg-[#F9FAF2] flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#355E3B] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#6DAE7C]" />
              Downstream Dependent Checks (Re-Evaluated Automatically)
            </h3>
            <span className="text-[10px] font-semibold text-[#7a5807] bg-[#fdf8e6] border border-[#fae69e] px-2 py-0.5 rounded">
              {E21_AFFECTED_CHECKS.length} Automated Checks Triggered
            </span>
          </div>

          <div className="divide-y divide-[#F9FAF2] text-xs">
            {E21_AFFECTED_CHECKS.map((check, i) => (
              <div key={i} className="px-5 py-3 flex items-center justify-between gap-4">
                <span className="font-medium text-[#3A3E39]">{check.label}</span>
                <span className="text-[10px] font-semibold bg-[#fdf8e6] text-[#7a5807] border border-[#fae69e] px-2 py-0.5 rounded">
                  Re-evaluated on Submission
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Submit Resubmission CTA Bar ─────────────────────────────────── */}
        <div className="bg-white border border-[#86efac] rounded-lg p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xs font-bold text-[#355E3B] uppercase tracking-wider">
              Authorize &amp; Transmit Resubmission Package #2
            </h3>
            <p className="text-xs text-[#555C56] mt-0.5">
              By confirming, all deficiencies in QRY-001 will be marked resolved and the delta package will be queued for MPCB technical approval.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="text-xs bg-[#355E3B] text-white hover:bg-[#0f2338] px-5 py-2.5 rounded-md font-bold transition-colors shadow-xs flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Submit Resubmission #2 (R2) →
            </button>

            <Link
              href={ENTREPRENEUR_ROUTES.applicationQuery(project.id, applicationId, 'QRY-001')}
              className="text-xs border border-[#c8d4c7] text-[#4A4A4A] hover:bg-[#F9FAF2] px-4 py-2.5 rounded-md font-semibold transition-colors"
            >
              Back to Query Memo
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

