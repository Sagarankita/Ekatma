'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import { ApplicationWorkflowStepper } from './ApplicationWorkflowStepper';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  FileCheck,
  Award,
  Layers,
  Check,
  Clock,
  ExternalLink,
  Printer,
  ChevronRight,
  Lock,
} from 'lucide-react';

export function SubmissionScreen({
  project,
}: {
  project: BusinessProject;
}) {
  const [paymentState, setPaymentState] = useState<'due' | 'pending' | 'paid'>('due');
  const [signatoryAgreed, setSignatoryAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const appId = 'APP-2026-MPCB-00412';
  const timestamp = '29 Sep 2026, 11:15 IST';

  // Determine items needing attention
  const itemsNeedAttention: { id: string; title: string; action: string; onAction: () => void }[] = [];

  if (paymentState !== 'paid') {
    itemsNeedAttention.push({
      id: 'fee-due',
      title: 'Statutory Application Processing Fee (₹47,200) is due for payment',
      action: 'Pay Fee via e-Challan →',
      onAction: () => setPaymentState('pending'),
    });
  }

  const isReadyToSubmit = itemsNeedAttention.length === 0;

  // ── SUBMISSION SUCCESS SCREEN ──
  if (submitted) {
    return (
      <main id="main-content" className="flex-1 bg-[#F8F9FA] pb-20 font-sans" tabIndex={-1}>
        <ApplicationWorkflowStepper businessId={project.id} currentStep={6} />

        <div className="bg-white border-b border-slate-200 px-4 sm:px-8 py-5">
          <div className="max-w-[1000px] mx-auto">
            <nav className="text-xs text-slate-500 mb-2.5 flex items-center gap-1.5" aria-label="Breadcrumb">
              <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#17365D] hover:underline">
                {project.name}
              </Link>
              <span>›</span>
              <Link href={ENTREPRENEUR_ROUTES.applications(project.id)} className="hover:text-[#17365D] hover:underline">
                Applications
              </Link>
              <span>›</span>
              <span className="text-[#17365D] font-bold">Application Submitted</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#17365D]">
              Application Submitted Successfully
            </h1>
          </div>
        </div>

        <div className="max-w-[1000px] mx-auto px-4 sm:px-8 py-8 space-y-6">
          {/* Success Banner */}
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-5 shadow-2xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-emerald-950">
                Application Successfully Digitally Signed &amp; Dispatched
              </h2>
              <p className="text-xs text-emerald-900 mt-1 leading-relaxed">
                Your application for <strong>Consent to Establish (CTE)</strong> has been electronically received by the Maharashtra Pollution Control Board (MPCB). Statutory processing SLA has commenced.
              </p>
            </div>
          </div>

          {/* Details Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="px-6 py-4 bg-slate-50/90 border-b border-slate-200 flex items-center justify-between">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Submission Acknowledgement Details
              </p>
              <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                GRN-MH-2026-981245
              </span>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {[
                { label: 'Application Reference Number', value: appId, highlight: true },
                { label: 'Department & Authority', value: 'MPCB — Maharashtra Pollution Control Board' },
                { label: 'Statutory Service', value: 'Consent to Establish (under Water & Air Acts)' },
                { label: 'Applicant Legal Entity', value: project.name || 'Sahyadri Bio-Pharma Private Limited' },
                { label: 'Project Location', value: `${project.location}, Plot C-14/2` },
                { label: 'Timestamp of Submission', value: timestamp },
                { label: 'Statutory SLA Clock', value: 'Started · 21 Working Days (Maharashtra RTS Act)' },
                { label: 'Current Assigned Desk', value: 'Sub-Regional Office, Pune II (Document Scrutiny)' },
                { label: 'Fee Paid & Verified', value: '₹47,200 (e-Challan Paid via MahaOnline)' },
              ].map(r => (
                <div key={r.label} className="px-6 py-3.5 flex justify-between items-center gap-4">
                  <span className="text-slate-500 font-medium">{r.label}</span>
                  <span className={`text-right font-semibold ${r.highlight ? 'font-mono text-sm text-[#17365D]' : 'text-slate-900'}`}>
                    {r.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={ENTREPRENEUR_ROUTES.applications(project.id)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#17365D] hover:bg-[#122b49] text-white text-xs font-bold transition-all shadow-2xs"
            >
              <span>View in Application Tracker</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <Link
              href={ENTREPRENEUR_ROUTES.journey(project.id)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors shadow-2xs"
            >
              <span>Back to Regulatory Journey</span>
            </Link>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print Acknowledgement Receipt</span>
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="flex-1 bg-[#F8F9FA] pb-20 font-sans" tabIndex={-1}>
      {/* ── 6-STAGE PIPELINE STEPPER ── */}
      <ApplicationWorkflowStepper
        businessId={project.id}
        currentStep={paymentState === 'paid' ? 6 : 5}
      />

      {/* ── Header ── */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-5">
        <div className="max-w-[1100px] mx-auto">
          <nav className="text-xs text-slate-500 mb-2.5 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#17365D] hover:underline">
              {project.name}
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.applications(project.id)} className="hover:text-[#17365D] hover:underline">
              Applications
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.applicationConsistency(project.id)} className="hover:text-[#17365D] hover:underline">
              Consistency Check
            </Link>
            <span>›</span>
            <span className="text-[#17365D] font-bold">Pay &amp; Submit</span>
          </nav>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-[#17365D]/8 text-[#17365D] border border-[#17365D]/15 px-2.5 py-0.5 rounded-md">
                  Stage 5 &amp; 6 of 6 · Pay &amp; Submit
                </span>
                <span className="text-xs text-slate-500">· Statutory Fee Payment &amp; Submission</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#17365D] tracking-tight">
                Payment &amp; Final Submission
              </h1>
              <p className="mt-1 text-sm text-slate-600">Pay, verify readiness, and sign the application.</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>e-Pramaan PKI Ready</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-8 space-y-7">
        {/* ── GATEKEEPER BANNER: READY TO SUBMIT vs X ITEMS NEED ATTENTION ── */}
        <section aria-label="Submission Readiness Status">
          {isReadyToSubmit ? (
            <div className="p-5 rounded-xl border-2 border-emerald-400 bg-emerald-50 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                      Status
                    </span>
                    <h2 className="text-lg font-black text-emerald-950 tracking-tight">
                      READY TO SUBMIT
                    </h2>
                  </div>
                  <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                    All 6 stages verified: Pre-validation checks passed, cross-form data is synchronized with your Master Project Dossier, and statutory application fees are paid and confirmed.
                  </p>
                </div>
              </div>

              <div className="shrink-0 self-start sm:self-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>0 Blockers</span>
                </span>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-xl border-2 border-amber-400 bg-amber-50 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <AlertTriangle className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                      Action Required
                    </span>
                    <h2 className="text-lg font-black text-amber-950 tracking-tight">
                      {itemsNeedAttention.length} ITEM{itemsNeedAttention.length > 1 ? 'S' : ''} NEED ATTENTION
                    </h2>
                  </div>
                  <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                    The final submission button is gated until all statutory requirements are satisfied. Please address the item below:
                  </p>
                </div>
              </div>

              <div className="shrink-0 self-start sm:self-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                  <span>{itemsNeedAttention.length} Pending Action</span>
                </span>
              </div>
            </div>
          )}
        </section>

        {/* ── ITEMS NEEDING ATTENTION LIST (if any) ── */}
        {!isReadyToSubmit && (
          <div className="bg-white rounded-xl border border-amber-200 shadow-2xs p-5 space-y-3">
            <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Pending Actions Before Submission:
            </h3>
            <div className="space-y-2">
              {itemsNeedAttention.map(item => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-lg bg-amber-50/60 border border-amber-200 flex flex-wrap items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2 text-slate-800 font-semibold">
                    <CreditCard className="w-4 h-4 text-amber-700" />
                    <span>{item.title}</span>
                  </div>
                  <button
                    type="button"
                    onClick={item.onAction}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs transition-colors shadow-2xs"
                  >
                    {item.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STAGE 5: STATUTORY FEE PAYMENT MODULE ── */}
        <section aria-label="Application Fee Payment" className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="px-6 py-4 bg-slate-50/90 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-blue-700" />
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Stage 5 · Statutory Application Fee (e-Challan)
              </h3>
            </div>
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${
                paymentState === 'paid'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : paymentState === 'pending'
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-red-50 text-red-700 border-red-200'
              }`}
            >
              {paymentState === 'paid' ? '✓ Paid & Confirmed' : paymentState === 'pending' ? 'Payment in Progress' : 'Payment Due'}
            </span>
          </div>

          <div className="p-6 space-y-4">
            {/* Fee Breakdown Table */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200/90 text-xs space-y-2.5">
              <div className="flex justify-between items-center text-slate-600">
                <span>Application Scrutiny &amp; CTE Processing Fee (₹45 Cr Capital Investment Slab)</span>
                <span className="font-mono font-semibold text-slate-900">₹40,000.00</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Statutory Environment Scrutiny Cess &amp; GST (18%)</span>
                <span className="font-mono font-semibold text-slate-900">₹7,200.00</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-bold text-slate-900">
                <span>Total Statutory Amount Payable:</span>
                <span className="font-mono text-base text-[#17365D]">₹47,200.00</span>
              </div>
            </div>

            {/* Payment Interaction */}
            {paymentState === 'due' && (
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-slate-500">
                  Payment is routed through Maharashtra Treasury e-Gras / e-Pramaan secure payment gateway.
                </p>
                <button
                  type="button"
                  onClick={() => setPaymentState('pending')}
                  className="px-5 py-2.5 rounded-lg bg-[#1a56db] hover:bg-[#1542a8] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Proceed to e-Challan Payment (₹47,200)</span>
                </button>
              </div>
            )}

            {paymentState === 'pending' && (
              <div className="pt-2 p-4 bg-blue-50/60 border border-blue-200 rounded-lg space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <p className="text-xs font-bold text-blue-950">
                      e-Challan Reference Number: <span className="font-mono">GRN-MH-2026-981245</span>
                    </p>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Challan generated for Sahyadri Bio-Pharma Private Limited. Payment gateway session active.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentState('paid')}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors shadow-2xs flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Confirm Successful Payment</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentState('due')}
                      className="px-3 py-2 border border-slate-300 text-slate-600 hover:bg-slate-100 text-xs font-semibold rounded-lg transition-colors"
                    >
                      Cancel / Retry
                    </button>
                  </div>
                </div>
              </div>
            )}

            {paymentState === 'paid' && (
              <div className="pt-1 flex items-center justify-between text-xs bg-emerald-50/70 border border-emerald-200 p-3 rounded-lg text-emerald-950">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    e-Challan <strong>GRN-MH-2026-981245</strong> paid successfully. Treasury transaction confirmed via MahaOnline API.
                  </span>
                </div>
                <span className="font-bold text-emerald-800">₹47,200 Received</span>
              </div>
            )}
          </div>
        </section>

        {/* ── APPLICATION SUMMARY FOR FINAL SIGN-OFF ── */}
        <section aria-label="Application Summary" className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="px-6 py-4 bg-slate-50/90 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Application Summary &amp; Verification Checks
            </h3>
            <span className="text-[11px] text-slate-500">MPCB Consent to Establish</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {[
              { label: 'Department & Service', value: 'Maharashtra Pollution Control Board (MPCB) · Consent to Establish (CTE)' },
              { label: 'Legal Entity', value: project.name || 'Sahyadri Bio-Pharma Private Limited' },
              { label: 'Project Location', value: `${project.location}, Plot C-14/2` },
              { label: 'Pre-Validation Status', value: '✓ Verified — All rule criteria satisfied', status: 'verified' },
              { label: 'Cross-Form Consistency', value: '✓ Harmonized — 100% matched with Master Project Dossier', status: 'verified' },
              { label: 'Statutory Fee Status', value: paymentState === 'paid' ? '✓ Paid (₹47,200)' : '⚠ Unpaid (₹47,200 due)', status: paymentState === 'paid' ? 'verified' : 'attention' },
            ].map(r => (
              <div key={r.label} className="px-6 py-3.5 flex justify-between items-center gap-4">
                <span className="text-slate-500 font-medium">{r.label}</span>
                <span
                  className={`font-semibold text-right ${
                    r.status === 'verified'
                      ? 'text-emerald-700'
                      : r.status === 'attention'
                      ? 'text-amber-700'
                      : 'text-slate-900'
                  }`}
                >
                  {r.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── STAGE 6: FINAL DIGITAL SIGNATURE & SUBMISSION ── */}
        <section
          aria-label="Final Sign and Submit"
          className={`rounded-xl border p-6 shadow-2xs transition-all ${
            isReadyToSubmit
              ? 'bg-white border-slate-300'
              : 'bg-slate-50 border-slate-200 opacity-80'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#17365D]" />
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Stage 6 · Authorised Signatory Digital Signature
              </h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              By submitting, you certify that all information contained herein is true and accurate according to the Maharashtra Right to Public Services Act. This application will be digitally signed using your stored e-Pramaan credentials.
            </p>

            <label className="flex items-start gap-3 p-3.5 rounded-lg border border-slate-200 bg-slate-50/70 cursor-pointer hover:bg-slate-50 transition-colors">
              <input
                type="checkbox"
                checked={signatoryAgreed}
                onChange={e => setSignatoryAgreed(e.target.checked)}
                disabled={!isReadyToSubmit}
                className="mt-0.5 accent-[#17365D] w-4 h-4 rounded"
              />
              <span className="text-xs text-slate-700 leading-relaxed font-medium">
                I, as the registered authorised signatory of <strong>{project.name}</strong>, confirm that I have reviewed all application fields, verified cross-form consistency against the Master Dossier, and authorise statutory submission.
              </span>
            </label>

            {/* Final Action Submission Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
              <Link
                href={ENTREPRENEUR_ROUTES.applicationConsistency(project.id)}
                className="text-xs font-semibold px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              >
                ← Back to Consistency (Stage 4)
              </Link>

              <div className="flex items-center gap-3">
                {isReadyToSubmit ? (
                  <button
                    type="button"
                    disabled={!signatoryAgreed}
                    onClick={() => setSubmitted(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold bg-[#17365D] hover:bg-[#122b49] text-white transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Sign &amp; Submit Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-bold bg-slate-200 text-slate-500 cursor-not-allowed"
                  >
                    <span>{itemsNeedAttention.length} Item(s) Need Attention to Submit</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
