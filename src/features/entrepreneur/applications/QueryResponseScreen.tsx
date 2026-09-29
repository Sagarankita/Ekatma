'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import { findQueryByAppId, type Deficiency } from './data';

import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  FileText,
  Upload,
  Save,
  Send,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  Layers,
  Sparkles,
  Info,
  Check,
} from 'lucide-react';

interface UploadedFileRecord {
  name: string;
  size: string;
  timestamp: string;
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

  // Initial State: Prefill with default response if available for quick verification/testing
  const [responses, setResponses] = useState<Record<string, string>>(() => {
    if (!query) return {};
    return Object.fromEntries(
      query.deficiencies.map(d => [d.id, d.defaultResponse ?? ''])
    );
  });

  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFileRecord | null>>(() => {
    const initial: Record<string, UploadedFileRecord | null> = {
      'DEF-001': {
        name: 'revised_water_balance_chart_v2.pdf',
        size: '2.4 MB',
        timestamp: '29 Sep 2026, 11:20 IST',
      },
      'DEF-002': null,
      'DEF-003': null,
    };
    return initial;
  });

  const [savedTime, setSavedTime] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submittedTimestamp, setSubmittedTimestamp] = useState<string>('29 Sep 2026, 11:55 IST');
  const [expandedLegal, setExpandedLegal] = useState<Record<string, boolean>>({});

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

  // Calculate resolution progress
  const hasResponse = (id: string) => (responses[id] ?? '').trim().length > 15;
  const hasUpload = (id: string) => Boolean(uploadedFiles[id]);
  const isItemComplete = (d: Deficiency) => hasResponse(d.id) && hasUpload(d.id);

  const completedCount = query.deficiencies.filter(isItemComplete).length;
  const isReadyToSubmit = completedCount === query.deficiencies.length;

  const handleSaveDraft = () => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    setSavedTime(`Responses & attachments saved at ${timeStr}`);
    setTimeout(() => setSavedTime(null), 4000);
  };

  const handleSimulateUpload = (def: Deficiency) => {
    const simulatedFileName = def.evidenceDocName ?? `${def.id.toLowerCase()}_supporting_evidence.pdf`;
    setUploadedFiles(prev => ({
      ...prev,
      [def.id]: {
        name: simulatedFileName,
        size: '2.8 MB',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    }));
  };

  const handleSimulateUploadAll = () => {
    const updated: Record<string, UploadedFileRecord> = {};
    query.deficiencies.forEach(d => {
      updated[d.id] = {
        name: d.evidenceDocName ?? `${d.id.toLowerCase()}_supporting_evidence.pdf`,
        size: '2.5 MB',
        timestamp: 'Just now',
      };
      if (!(responses[d.id] ?? '').trim() && d.defaultResponse) {
        setResponses(prev => ({ ...prev, [d.id]: d.defaultResponse! }));
      }
    });
    setUploadedFiles(prev => ({ ...prev, ...updated }));
  };

  const handleRemoveUpload = (defId: string) => {
    setUploadedFiles(prev => ({ ...prev, [defId]: null }));
  };

  const handleSubmitResponse = () => {
    setSubmittedTimestamp(
      new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
        ', ' +
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
        ' IST'
    );
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ─── POST-SUBMISSION STATE ──────────────────────────────────────────────────
  if (submitted) {
    return (
      <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
        {/* Top Header */}
        <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
          <div className="max-w-[1000px] mx-auto">
            <nav className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5" aria-label="Breadcrumb">
              <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#1a3a5c] hover:underline">
                Dashboard
              </Link>
              <span>›</span>
              <Link href={ENTREPRENEUR_ROUTES.applications(project.id)} className="hover:text-[#1a3a5c] hover:underline">
                Applications
              </Link>
              <span>›</span>
              <Link href={ENTREPRENEUR_ROUTES.application(project.id, query.appId)} className="hover:text-[#1a3a5c] hover:underline">
                {query.appId}
              </Link>
              <span>›</span>
              <span className="text-[#1a3a5c] font-medium font-mono">Response Submitted</span>
            </nav>
            <h1 className="text-xl font-bold text-[#1a3a5c]">Consolidated Query Response Submitted</h1>
          </div>
        </div>

        <div className="max-w-[1000px] mx-auto px-6 py-8 space-y-6">
          {/* Success Banner */}
          <div className="bg-[#f0fdf4] border border-[#86efac] border-l-4 border-l-[#15803d] rounded-lg p-5 shadow-2xs">
            <div className="flex items-start gap-3.5">
              <CheckCircle2 className="w-6 h-6 text-[#15803d] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-[#166534] uppercase tracking-wider bg-[#dcfce7] px-2 py-0.5 rounded">
                  Response Submitted Successfully
                </span>
                <h2 className="text-base font-bold text-[#166534] mt-1.5">
                  Official Clarifications &amp; Updated Dossier Transmitted to {query.dept}
                </h2>
                <p className="text-xs text-[#166534] mt-1 leading-relaxed">
                  Your responses and evidence files for <strong>{query.queryId}</strong> have been accepted into the Maharashtra Single Window processing queue. The statutory SLA clock has resumed.
                </p>
              </div>
            </div>
          </div>

          {/* Submission Details Card */}
          <section aria-label="Submission Confirmation" className="bg-white border border-[#e2e8f0] rounded-lg p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider border-b border-[#f1f5f9] pb-3">
              Submission Confirmation Record
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="bg-[#f8f9fb] p-3 rounded border border-[#f1f5f9]">
                <span className="text-[#64748b] block font-medium">Notice Reference</span>
                <span className="font-mono font-bold text-[#1a3a5c] text-sm mt-0.5 block">{query.queryId}</span>
                <span className="text-[10px] text-[#94a3b8] mt-0.5 block">Deficiency Memo</span>
              </div>

              <div className="bg-[#f8f9fb] p-3 rounded border border-[#f1f5f9]">
                <span className="text-[#64748b] block font-medium">Affected Application</span>
                <span className="font-mono font-bold text-[#1a3a5c] text-sm mt-0.5 block">{query.appId}</span>
                <span className="text-[10px] text-[#64748b] mt-0.5 block">{query.service} ({query.dept})</span>
              </div>

              <div className="bg-[#f8f9fb] p-3 rounded border border-[#f1f5f9]">
                <span className="text-[#64748b] block font-medium">Submission Timestamp</span>
                <span className="font-semibold text-[#1e293b] text-sm mt-0.5 block">{submittedTimestamp}</span>
                <span className="text-[10px] text-[#15803d] mt-0.5 block font-medium">e-Signed &amp; Verified</span>
              </div>

              <div className="bg-[#f8f9fb] p-3 rounded border border-[#f1f5f9]">
                <span className="text-[#64748b] block font-medium">Resolved Deficiencies</span>
                <span className="font-bold text-[#15803d] text-sm mt-0.5 block">{query.deficiencies.length} of {query.deficiencies.length} Resolved</span>
                <span className="text-[10px] text-[#94a3b8] mt-0.5 block">Ready for Delta Review</span>
              </div>
            </div>
          </section>

          {/* WHAT HAPPENS NEXT */}
          <section aria-label="What Happens Next" className="bg-white border border-[#e2e8f0] rounded-lg p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-[#f1f5f9] pb-3">
              <Clock className="w-4 h-4 text-[#1a56db]" />
              <h3 className="text-sm font-bold text-[#1a3a5c] uppercase tracking-wider">
                What Happens Next?
              </h3>
            </div>

            <ol className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#e2e8f0] text-xs">
              <li className="relative">
                <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-[#15803d] text-white flex items-center justify-center text-[10px] font-bold">
                  ✓
                </div>
                <h4 className="font-bold text-[#1a3a5c]">1. Statutory SLA Clock Resumed</h4>
                <p className="text-[#475569] mt-0.5 leading-relaxed">
                  The statutory 30-day clock paused under the Maharashtra RTS Act is un-paused immediately upon receipt of your response.
                </p>
              </li>

              <li className="relative">
                <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-[#1a56db] text-white flex items-center justify-center text-[10px] font-bold">
                  2
                </div>
                <h4 className="font-bold text-[#1a3a5c]">2. Delta Review by {query.dept} Technical Officer</h4>
                <p className="text-[#475569] mt-0.5 leading-relaxed">
                  The officer will re-scrutinize strictly the <strong>3 modified items</strong> and supporting drawings. Your 42 other pre-verified parameters remain locked and approved.
                </p>
              </li>

              <li className="relative">
                <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-[#cbd5e1] text-[#475569] flex items-center justify-center text-[10px] font-bold">
                  3
                </div>
                <h4 className="font-bold text-[#1a3a5c]">3. Consent Committee Determination</h4>
                <p className="text-[#475569] mt-0.5 leading-relaxed">
                  Once technical scrutiny verifies the revised water balance and hazardous waste protocol, the file will be placed before the Regional Committee for formal Consent grant.
                </p>
              </li>
            </ol>
          </section>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <Link
              href={ENTREPRENEUR_ROUTES.application(project.id, query.appId)}
              className="text-xs border border-[#cbd5e1] text-[#475569] hover:bg-[#f1f5f9] px-4 py-2.5 rounded-md font-semibold transition-colors"
            >
              ← Back to Application Cockpit
            </Link>

            <Link
              href={ENTREPRENEUR_ROUTES.applicationResubmission(project.id, query.appId, 'APP-2026-MPCB-00412-R2')}
              className="text-xs bg-[#1a3a5c] text-white hover:bg-[#0f2338] px-5 py-2.5 rounded-md font-semibold transition-colors shadow-xs flex items-center gap-1.5"
            >
              Review Delta Resubmission →
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ─── QUERY RESPONSE FORM VIEW ───────────────────────────────────────────────
  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      {/* ─── Breadcrumb & Top Bar ────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
        <div className="max-w-[1000px] mx-auto">
          <nav className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#1a3a5c] hover:underline">
              Dashboard
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.applications(project.id)} className="hover:text-[#1a3a5c] hover:underline">
              Applications Tracker
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.application(project.id, query.appId)} className="hover:text-[#1a3a5c] hover:underline">
              {query.appId}
            </Link>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium font-mono">Query Response</span>
          </nav>

          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded border border-[#cbd5e1] bg-[#f8f9fb] text-[#1e293b]">
                  {query.dept}
                </span>
                <h1 className="text-xl font-bold text-[#1a3a5c]">Consolidated Deficiency Memo — {query.queryId}</h1>
                <span className="text-xs bg-[#fee2e2] text-[#b91c1c] border border-[#fca5a5] font-semibold px-2 py-0.5 rounded">
                  Action Required
                </span>
              </div>
              <p className="text-xs text-[#6b7a8d] mt-1">
                Affected Application: <strong className="font-mono text-[#1e293b]">{query.appId}</strong> · {query.service} · Government of Maharashtra
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSimulateUploadAll}
                className="text-xs border border-[#1a56db] text-[#1a56db] bg-[#eff6ff] hover:bg-[#dbeafe] px-3 py-1.5 rounded font-medium flex items-center gap-1 transition-colors"
                title="Fill all answers and attach all required drawings in 1 click for testing"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#1a56db]" />
                ⚡ Auto-Fill &amp; Attach All
              </button>

              <Link
                href={ENTREPRENEUR_ROUTES.application(project.id, query.appId)}
                className="text-xs border border-[#cbd5e1] text-[#475569] hover:bg-[#f1f5f9] px-3 py-1.5 rounded transition-colors font-medium"
              >
                ← Back to Application
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 py-6 space-y-6">
        {/* ─── 5 Core Questions Answered Immediately ───────────────────────── */}
        <section aria-label="Key Notice Information" className="bg-white border border-[#fca5a5] border-l-4 border-l-[#b91c1c] rounded-lg p-5 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#fef2f2] pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#b91c1c]" />
              <h2 className="text-sm font-bold text-[#1a3a5c] uppercase tracking-wider">
                Notice Summary &amp; Statutory Resolution Requirements
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold bg-[#fee2e2] text-[#991b1b] px-2 py-0.5 rounded">
                SLA Clock Paused
              </span>
              <span className="text-xs font-bold text-[#b91c1c] bg-[#fee2e2] border border-[#fca5a5] px-2.5 py-0.5 rounded">
                Deadline: {query.responseDeadline} (10 days remaining)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            {/* 1. What needs to be fixed */}
            <div className="bg-[#fff5f5] p-3 rounded border border-[#fecaca]">
              <span className="text-[10px] font-bold text-[#b91c1c] uppercase tracking-wider block">
                1. What Needs To Be Fixed?
              </span>
              <p className="font-bold text-[#1a3a5c] mt-1">3 Technical Discrepancies</p>
              <p className="text-[11px] text-[#64748b] mt-0.5 leading-snug">
                Water balance, ETP sizing, and missing hazardous waste plan.
              </p>
            </div>

            {/* 2. Why */}
            <div className="bg-[#f8f9fb] p-3 rounded border border-[#f1f5f9]">
              <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">
                2. Why?
              </span>
              <p className="font-bold text-[#1a3a5c] mt-1">Calculation Conflicts</p>
              <p className="text-[11px] text-[#64748b] mt-0.5 leading-snug">
                Form-I declared 50 KL/day while the DPR water balance proved 65 KL/day.
              </p>
            </div>

            {/* 3. What evidence is needed */}
            <div className="bg-[#f8f9fb] p-3 rounded border border-[#f1f5f9]">
              <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">
                3. Evidence Needed?
              </span>
              <p className="font-bold text-[#1a3a5c] mt-1">3 Certified Documents</p>
              <p className="text-[11px] text-[#64748b] mt-0.5 leading-snug">
                Revised chart, ETP drawings, and waste management protocol.
              </p>
            </div>

            {/* 4. What do I need to submit */}
            <div className="bg-[#f8f9fb] p-3 rounded border border-[#f1f5f9]">
              <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">
                4. What To Submit?
              </span>
              <p className="font-bold text-[#1a3a5c] mt-1">Response &amp; Files</p>
              <p className="text-[11px] text-[#64748b] mt-0.5 leading-snug">
                Enter explanations below and attach updated drawings.
              </p>
            </div>

            {/* 5. When */}
            <div className="bg-[#fffbeb] p-3 rounded border border-[#fde68a]">
              <span className="text-[10px] font-bold text-[#92400e] uppercase tracking-wider block">
                5. When?
              </span>
              <p className="font-bold text-[#92400e] mt-1">{query.responseDeadline}</p>
              <p className="text-[11px] text-[#92400e] mt-0.5 leading-snug">
                Strict deadline to avoid deemed rejection under RTS Act.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Resolution Progress Bar & Save Actions ──────────────────────── */}
        <div className="bg-white border border-[#e2e8f0] rounded-lg p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">
                Deficiency Resolution Status: {completedCount} of {query.deficiencies.length} Complete
              </h3>
              {isReadyToSubmit ? (
                <span className="text-[10px] font-bold bg-[#dcfce7] text-[#166534] border border-[#86efac] px-2 py-0.2 rounded">
                  ✓ Ready to Submit
                </span>
              ) : (
                <span className="text-[10px] font-bold bg-[#fee2e2] text-[#991b1b] border border-[#fca5a5] px-2 py-0.2 rounded">
                  {query.deficiencies.length - completedCount} Items Incomplete
                </span>
              )}
            </div>
            {/* Progress Bar */}
            <div className="w-64 bg-[#e2e8f0] h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#15803d] transition-all duration-300"
                style={{ width: `${(completedCount / query.deficiencies.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {savedTime && (
              <span className="text-xs text-[#15803d] font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                {savedTime}
              </span>
            )}

            <button
              type="button"
              onClick={handleSaveDraft}
              className="text-xs border border-[#cbd5e1] text-[#1a3a5c] hover:bg-[#f1f5f9] px-3.5 py-1.5 rounded font-semibold transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-[#64748b]" />
              Save Response Draft
            </button>
          </div>
        </div>

        {/* ─── Actionable Deficiency Cards ─────────────────────────────────── */}
        <div className="space-y-5">
          {query.deficiencies.map((def, idx) => {
            const isResolved = isItemComplete(def);
            const currentUpload = uploadedFiles[def.id];
            const isLegalOpen = expandedLegal[def.id] ?? false;

            return (
              <article
                key={def.id}
                className={`bg-white border rounded-lg overflow-hidden shadow-2xs transition-all ${
                  isResolved ? 'border-[#86efac]' : 'border-[#e2e8f0]'
                }`}
              >
                {/* Card Header */}
                <div
                  className={`px-5 py-3 border-b flex flex-wrap items-center justify-between gap-3 ${
                    isResolved ? 'bg-[#f0fdf4] border-[#bbf7d0]' : 'bg-[#f8f9fb] border-[#e2e8f0]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-[#b91c1c] bg-[#fee2e2] px-2 py-0.5 rounded">
                      {def.id}
                    </span>
                    <h3 className="text-sm font-bold text-[#1a3a5c]">
                      {idx + 1}. {def.issue}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {isResolved ? (
                      <span className="text-[10px] font-bold bg-[#dcfce7] text-[#166534] border border-[#86efac] px-2 py-0.5 rounded flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[3]" />
                        Ready to Submit
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold bg-[#fffbeb] text-[#92400e] border border-[#fde68a] px-2 py-0.5 rounded">
                        Action Required
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4 text-xs">
                  {/* Explanation (Why this matters) */}
                  <div className="bg-[#f8f9fb] p-3.5 rounded border border-[#e2e8f0] space-y-1">
                    <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">
                      Why This Needs Correction:
                    </span>
                    <p className="text-[#334155] text-xs leading-relaxed font-medium">
                      {def.explanation}
                    </p>
                  </div>

                  {/* Required Action & Evidence Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Required Action */}
                    <div className="border border-[#e2e8f0] rounded p-3 bg-white space-y-1">
                      <span className="text-[10px] font-bold text-[#1a3a5c] uppercase tracking-wider block">
                        What You Need to Do:
                      </span>
                      <p className="text-[#475569] leading-relaxed">
                        {def.requiredAction}
                      </p>
                    </div>

                    {/* Evidence Needed */}
                    <div className="border border-[#e2e8f0] rounded p-3 bg-white space-y-1">
                      <span className="text-[10px] font-bold text-[#1a3a5c] uppercase tracking-wider block">
                        Evidence / Document Needed:
                      </span>
                      <p className="text-[#1a56db] font-semibold flex items-start gap-1.5">
                        <FileText className="w-4 h-4 text-[#1a56db] shrink-0 mt-0.5" />
                        <span>{def.evidenceNeeded}</span>
                      </p>
                    </div>
                  </div>

                  {/* Entrepreneur Response Field */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor={`response-${def.id}`} className="text-[11px] font-bold text-[#1a3a5c] uppercase tracking-wider">
                        Your Clarification / Corrective Action Explanation <span className="text-[#b91c1c]">*</span>
                      </label>
                      <span className="text-[10px] text-[#94a3b8]">
                        {(responses[def.id] ?? '').length} characters
                      </span>
                    </div>

                    <textarea
                      id={`response-${def.id}`}
                      rows={3}
                      value={responses[def.id] ?? ''}
                      onChange={e => setResponses(prev => ({ ...prev, [def.id]: e.target.value }))}
                      placeholder="State the specific changes made, updated figures, and reference the attached document..."
                      className="w-full text-xs border border-[#cbd5e1] rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#1a56db] bg-white leading-relaxed resize-y"
                    />
                  </div>

                  {/* Upload Control */}
                  <div className="border border-[#e2e8f0] rounded-lg p-3.5 bg-[#f8f9fb] space-y-2">
                    <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">
                      Upload Required Evidence File <span className="text-[#b91c1c]">*</span>
                    </span>

                    {currentUpload ? (
                      <div className="bg-white border border-[#86efac] rounded p-3 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#15803d]" />
                          <div>
                            <span className="font-semibold text-[#1a3a5c] text-xs block">{currentUpload.name}</span>
                            <span className="text-[11px] text-[#64748b]">
                              Size: {currentUpload.size} · Uploaded: {currentUpload.timestamp}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleSimulateUpload(def)}
                            className="text-xs text-[#1a56db] hover:underline font-medium"
                          >
                            Replace
                          </button>
                          <span className="text-[#cbd5e1]">|</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveUpload(def.id)}
                            className="text-xs text-[#b91c1c] hover:underline font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white border border-dashed border-[#cbd5e1] rounded p-4 text-center space-y-2">
                        <Upload className="w-6 h-6 text-[#94a3b8] mx-auto" />
                        <div>
                          <p className="text-xs text-[#475569] font-medium">
                            Attach PDF, DWG, or ZIP file (Max 25 MB)
                          </p>
                          <p className="text-[11px] text-[#94a3b8]">
                            Suggested file name: <code className="font-mono text-[#1a3a5c]">{def.evidenceDocName ?? `${def.id.toLowerCase()}_evidence.pdf`}</code>
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => handleSimulateUpload(def)}
                            className="text-xs bg-[#1a56db] text-white hover:bg-[#1e40af] px-3.5 py-1.5 rounded font-medium shadow-2xs flex items-center gap-1.5"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            ⚡ Simulate Upload
                          </button>

                          <Link
                            href={ENTREPRENEUR_ROUTES.documents(project.id)}
                            className="text-xs border border-[#cbd5e1] text-[#475569] hover:bg-[#f1f5f9] px-3 py-1.5 rounded font-medium"
                          >
                            Select from Document Centre →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Secondary Collapsible Legal Basis */}
                  {def.regulatoryRef && (
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedLegal(prev => ({ ...prev, [def.id]: !isLegalOpen }))
                        }
                        className="text-[11px] text-[#64748b] hover:text-[#1a3a5c] flex items-center gap-1 font-medium transition-colors"
                      >
                        {isLegalOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        <span>{isLegalOpen ? 'Hide Statutory Reference' : 'View Statutory &amp; Regulatory Basis'}</span>
                      </button>

                      {isLegalOpen && (
                        <div className="mt-2 p-2.5 bg-[#f1f5f9] rounded border border-[#e2e8f0] text-[11px] text-[#475569]">
                          <strong>Legal Rule Reference:</strong> {def.regulatoryRef}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* ─── Bottom Actions Bar ──────────────────────────────────────────── */}
        <div className={`bg-white border rounded-lg p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          isReadyToSubmit ? 'border-[#86efac]' : 'border-[#e2e8f0]'
        }`}>
          <div>
            <h3 className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">
              {isReadyToSubmit ? 'All Deficiencies Resolved &amp; Ready for Submission' : 'Complete All Items to Submit'}
            </h3>
            <p className="text-xs text-[#64748b] mt-0.5">
              {isReadyToSubmit
                ? 'Your responses and supporting evidence files will be transmitted to the scrutiny officer.'
                : `${query.deficiencies.length - completedCount} items still require response clarification or file attachment.`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="text-xs border border-[#cbd5e1] text-[#1a3a5c] hover:bg-[#f1f5f9] px-4 py-2 rounded-md font-semibold transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-[#64748b]" />
              Save Response Draft
            </button>

            {isReadyToSubmit ? (
              <button
                type="button"
                onClick={handleSubmitResponse}
                className="text-xs bg-[#b91c1c] text-white hover:bg-[#991b1b] px-5 py-2.5 rounded-md font-bold transition-colors shadow-xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Consolidated Response →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSimulateUploadAll}
                className="text-xs bg-[#1a56db] text-white hover:bg-[#1e40af] px-4 py-2.5 rounded-md font-semibold transition-colors shadow-xs flex items-center gap-1.5"
                title="Fill all responses and files instantly"
              >
                <Sparkles className="w-3.5 h-3.5" />
                ⚡ Auto-Resolve All to Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
