'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';

export function SubmissionScreen({
  project,
}: {
  project: BusinessProject;
}) {
  const [paymentState, setPaymentState] = useState<'due' | 'pending' | 'paid'>('due');
  const [submitted, setSubmitted] = useState(false);
  const appId = 'APP-2026-MPCB-00412';
  const timestamp = '23 Sep 2026, 14:37 IST';

  if (submitted) {
    return (
      <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
        <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
          <div className="max-w-[900px] mx-auto">
            <nav className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5">
              <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#1a3a5c] hover:underline">Dashboard</Link>
              <span>›</span>
              <Link href={ENTREPRENEUR_ROUTES.applications(project.id)} className="hover:text-[#1a3a5c] hover:underline">Applications</Link>
              <span>›</span>
              <span className="text-[#1a3a5c] font-medium">Application Submitted</span>
            </nav>
            <h1 className="text-xl font-bold text-[#1a3a5c]">Application Submitted Successfully</h1>
          </div>
        </div>
        <div className="max-w-[900px] mx-auto px-6 py-5 space-y-4">
          <div className="bg-white border border-[#86efac] border-l-4 border-l-[#15803d] px-5 py-4">
            <p className="text-sm font-semibold text-[#166534]">Your application has been submitted to MPCB for processing.</p>
            <p className="text-xs text-[#166534] mt-1">You will receive a notification when the application status changes. Track progress using the Application Tracker.</p>
          </div>
          <div className="bg-white border border-[#e2e8f0]">
            <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
              <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Application Details</p>
            </div>
            <div className="divide-y divide-[#f1f5f9]">
              {[
                { label: 'Application Reference Number', value: appId },
                { label: 'Department', value: 'MPCB — Maharashtra Pollution Control Board' },
                { label: 'Service', value: 'Consent to Establish' },
                { label: 'Legal Entity', value: project.name || 'Sahyadri Bio-Pharma Pvt Ltd' },
                { label: 'Project', value: `${project.location}, Plot C-14/2` },
                { label: 'Submitted', value: timestamp },
                { label: 'SLA', value: 'Started — 21 working days' },
                { label: 'Next Step', value: 'Document Scrutiny' },
              ].map(r => (
                <div key={r.label} className="px-4 py-2.5 flex justify-between items-start gap-4 text-sm">
                  <span className="text-[#6b7a8d] shrink-0">{r.label}</span>
                  <span className="text-[#1a3a5c] font-medium text-right">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={ENTREPRENEUR_ROUTES.applications(project.id)}
              className="text-sm bg-[#1a3a5c] text-white px-4 py-2 hover:bg-[#0f2540] inline-block rounded"
            >
              View Application Tracker (E18)
            </Link>
            <Link
              href={ENTREPRENEUR_ROUTES.requirement(project.id, 'EST-001')}
              className="text-sm border border-[#d1d9e0] text-[#475569] px-4 py-2 hover:bg-[#f1f5f9] inline-block rounded"
            >
              View Requirement Detail (E10)
            </Link>
            <Link
              href={ENTREPRENEUR_ROUTES.journey(project.id)}
              className="text-sm border border-[#d1d9e0] text-[#475569] px-4 py-2 hover:bg-[#f1f5f9] inline-block rounded"
            >
              View Regulatory Journey (E09)
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
        <div className="max-w-[900px] mx-auto">
          <nav className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5">
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#1a3a5c] hover:underline">Dashboard</Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.applications(project.id)} className="hover:text-[#1a3a5c] hover:underline">Applications</Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.newApplication(project.id)} className="hover:text-[#1a3a5c] hover:underline">Application Workspace</Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.applicationPrevalidation(project.id)} className="hover:text-[#1a3a5c] hover:underline">Pre-validation</Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.applicationConsistency(project.id)} className="hover:text-[#1a3a5c] hover:underline">Consistency</Link>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">Payment / Submission</span>
          </nav>
          <div>
            <h1 className="text-xl font-bold text-[#1a3a5c]">Payment / Submission</h1>
            <p className="text-sm font-semibold text-[#334155] mt-0.5">MPCB — Consent to Establish</p>
            <p className="text-xs text-[#6b7a8d] mt-0.5">{project.name} · {project.location}</p>
          </div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 py-5 space-y-4">
        {/* Application summary */}
        <div className="bg-white border border-[#e2e8f0]">
          <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
            <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Application Summary</p>
          </div>
          <div className="divide-y divide-[#f1f5f9]">
            {[
              { label: 'Department', value: 'MPCB — Maharashtra Pollution Control Board' },
              { label: 'Service', value: 'Consent to Establish' },
              { label: 'Application Type', value: 'Fresh Application' },
              { label: 'Legal Entity', value: project.name || 'Sahyadri Bio-Pharma Pvt Ltd' },
              { label: 'Project Location', value: `${project.location}, Plot C-14/2` },
              { label: 'Forms & Annexures', value: 'Form I, Environmental Statement' },
              { label: 'Documents', value: '4 of 5 submitted — 1 pending verification' },
              { label: 'Declarations', value: '3 of 3 confirmed' },
            ].map(r => (
              <div key={r.label} className="px-4 py-2.5 flex justify-between items-start gap-4 text-sm">
                <span className="text-[#6b7a8d] shrink-0">{r.label}</span>
                <span className="text-[#334155] text-right">{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Validation & Consistency states */}
        <div className="bg-white border border-[#e2e8f0]">
          <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
            <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Checks</p>
          </div>
          <div className="divide-y divide-[#f1f5f9]">
            <div className="px-4 py-2.5 flex justify-between items-center text-sm">
              <span className="text-[#6b7a8d]">Pre-validation</span>
              <span className="text-[#92400e] font-semibold text-xs border border-[#fcd34d] bg-[#fef3c7] px-2 py-0.5">Action Taken — Warnings Noted</span>
            </div>
            <div className="px-4 py-2.5 flex justify-between items-center text-sm">
              <span className="text-[#6b7a8d]">Cross-form Consistency</span>
              <span className="text-[#92400e] font-semibold text-xs border border-[#fcd34d] bg-[#fef3c7] px-2 py-0.5">Reviewed — Exceptions Noted</span>
            </div>
          </div>
        </div>

        {/* Fee section */}
        <div className="bg-white border border-[#e2e8f0]">
          <div className="px-4 py-2.5 border-b border-[#e8edf2] bg-[#f8f9fb]">
            <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">Application Fee</p>
          </div>
          <div className="px-4 py-4 space-y-3">
            {paymentState === 'due' && (
              <>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#6b7a8d]">Fee</span>
                  <span className="text-[#b91c1c] font-semibold text-xs border border-[#fca5a5] bg-[#fee2e2] px-2 py-0.5">Fee Due</span>
                </div>
                <div className="text-xs text-[#475569] space-y-1">
                  <div className="flex justify-between"><span>Application processing fee</span><span className="font-medium text-[#334155]">As per capital investment slab</span></div>
                  <div className="flex justify-between"><span>Fee calculation basis</span><span className="font-medium text-[#334155]">Available during payment</span></div>
                </div>
                <button
                  type="button"
                  onClick={() => setPaymentState('pending')}
                  className="text-sm bg-[#1a56db] text-white px-4 py-2 rounded hover:bg-[#1e40af]"
                >
                  Proceed to e-Challan / Payment
                </button>
              </>
            )}
            {paymentState === 'pending' && (
              <>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#6b7a8d]">Fee</span>
                  <span className="text-[#d97706] font-semibold text-xs border border-[#fcd34d] bg-[#fef3c7] px-2 py-0.5">Payment Pending</span>
                </div>
                <p className="text-xs text-[#475569]">Your e-Challan has been generated. Complete payment at the bank or online portal and return to confirm.</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentState('paid')}
                    className="text-sm bg-[#1a3a5c] text-white px-4 py-2 rounded hover:bg-[#0f2540]"
                  >
                    Confirm Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentState('due')}
                    className="text-sm border border-[#d1d9e0] text-[#475569] px-3 py-2 rounded hover:bg-[#f1f5f9]"
                  >
                    Retry
                  </button>
                </div>
              </>
            )}
            {paymentState === 'paid' && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#6b7a8d]">Fee</span>
                <span className="text-[#15803d] font-semibold text-xs border border-[#86efac] bg-[#dcfce7] px-2 py-0.5">Paid / Confirmed</span>
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="bg-white border border-[#e2e8f0] px-5 py-4 space-y-3">
          {paymentState !== 'paid' && (
            <p className="text-xs text-[#6b7a8d]">Payment must be confirmed before submission.</p>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={ENTREPRENEUR_ROUTES.applicationConsistency(project.id)}
              className="text-sm text-[#475569] px-3 py-1.5 border border-[#d1d9e0] rounded hover:bg-[#f1f5f9]"
            >
              Back to Consistency
            </Link>
            <Link
              href={ENTREPRENEUR_ROUTES.documents(project.id)}
              className="text-sm text-[#475569] px-3 py-1.5 border border-[#d1d9e0] rounded hover:bg-[#f1f5f9]"
            >
              Document Centre (E11)
            </Link>
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="text-sm px-6 py-2 font-semibold rounded bg-[#1a3a5c] text-white hover:bg-[#0f2540]"
            >
              Sign &amp; Submit Application
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
