'use client'

import React from 'react'
import Link from 'next/link'
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur'
import type { BusinessProject } from '../businesses/catalog'
import { getProvenanceDetails, type VerificationState } from './data'
import { Icon } from '../public-auth/PublicChrome'

function VerificationBadge({ state }: { state: VerificationState }) {
  const verified = state === 'Department Verified' || state === 'System Verified'
  const needsVerification = state === 'Needs Verification'
  const notApplicable = state === 'Not Applicable'
  const classes = verified
    ? 'border-[#86EFAC] bg-[#F0FDF4] text-[#166534]'
    : needsVerification
      ? 'border-[#B8D0F5] bg-[#EBF3FF] text-[#17365D]'
      : notApplicable
        ? 'border-[#D1D9E0] bg-[#F8F9FB] text-[#6B7A8D]'
        : 'border-[#BBF7D0] bg-[#F0FDF4] text-[#166534]'
  return <span className={`inline-flex rounded border px-2.5 py-1 text-xs font-semibold ${classes}`}>{state}</span>
}

function DetailDisclosure({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border-t border-slate-100 first:border-t-0">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-semibold text-[#17365D] hover:bg-[#F8FAFC]">
        {title}
        <span className="transition-transform group-open:rotate-180"><Icon.ChevronDown /></span>
      </summary>
      <div className="border-t border-slate-100 bg-[#F8FAFC] px-5 py-4">{children}</div>
    </details>
  )
}

export function ProvenanceScreen({ project, fieldName }: { project: BusinessProject; fieldName: string }) {
  const details = getProvenanceDetails(fieldName, project)

  return (
    <main id="main-content" className="flex-1 bg-[#F8F9FA]" tabIndex={-1}>
      <div className="mx-auto max-w-[760px] px-4 py-6 sm:px-6">
        <div className="mb-5 border-b border-[#D1D9E0] pb-5">
          <h1 className="text-2xl font-bold text-[#17365D]">Data Provenance</h1>
          <p className="mt-1 text-sm text-[#5C6470]">See where this Business DNA value came from and how it was verified.</p>
        </div>

        <section className="mb-5 overflow-hidden rounded-xl border border-[#D1D9E0] bg-white shadow-xs" aria-labelledby="provenance-field-name">
          <div className="grid gap-4 px-5 py-5 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8B97A6]">Field</p>
              <h2 id="provenance-field-name" className="mt-1 text-base font-bold text-[#20242A]">{details.fieldName}</h2>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8B97A6]">Current value</p>
              <p className="mt-1 text-lg font-bold text-[#20242A]">{details.currentValue}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8B97A6]">Source</p>
              <p className="mt-1 text-sm font-semibold text-[#374151]">Source: {details.currentSource}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8B97A6]">Verification state</p>
              <div className="mt-1"><VerificationBadge state={details.currentVerification} /></div>
            </div>
          </div>

          <DetailDisclosure title="Source and verification details">
            <dl className="grid gap-4 text-sm sm:grid-cols-2">
              <div><dt className="text-xs font-semibold text-[#8B97A6]">Business DNA version</dt><dd className="mt-1 text-[#374151]">Version 1</dd></div>
              <div><dt className="text-xs font-semibold text-[#8B97A6]">Last updated</dt><dd className="mt-1 text-[#374151]">22 Sep 2026</dd></div>
              {details.isPlotArea ? <>
                <div><dt className="text-xs font-semibold text-[#8B97A6]">Document</dt><dd className="mt-1 text-[#374151]">MIDC Allotment Letter</dd></div>
                <div><dt className="text-xs font-semibold text-[#8B97A6]">Issuer</dt><dd className="mt-1 text-[#374151]">MIDC</dd></div>
                <div><dt className="text-xs font-semibold text-[#8B97A6]">Verified by</dt><dd className="mt-1 text-[#374151]">MIDC</dd></div>
                <div><dt className="text-xs font-semibold text-[#8B97A6]">Verified on</dt><dd className="mt-1 text-[#374151]">22 Sep 2026</dd></div>
              </> : null}
            </dl>
          </DetailDisclosure>

          <DetailDisclosure title="Where this value is used">
            <div className="space-y-2">
              {details.usedBy.map(item => (
                <div key={`${item.dept}-${item.service}`} className="flex items-start gap-3 rounded border border-[#E1E7ED] bg-white px-3 py-2.5">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#245B8A]" />
                  <div><p className="text-xs font-bold text-[#20242A]">{item.dept}</p><p className="mt-0.5 text-xs text-[#5C6470]">{item.service}</p></div>
                </div>
              ))}
            </div>
          </DetailDisclosure>

          <DetailDisclosure title="Version history">
            <div className="space-y-3">
              {details.history.map((history, index) => (
                <div key={history.version} className="rounded border border-[#D1D9E0] bg-white p-3">
                  <div className="flex items-center justify-between gap-3"><p className="text-xs font-bold text-[#17365D]">{history.version}{index === details.history.length - 1 ? ' · Current' : ''}</p><p className="text-[11px] text-[#8B97A6]">{history.date}</p></div>
                  <p className="mt-2 text-sm font-semibold text-[#20242A]">{history.value}</p>
                  <p className="mt-1 text-xs text-[#5C6470]">Source: {history.source} · {history.verification}</p>
                </div>
              ))}
            </div>
          </DetailDisclosure>
        </section>

        <div className="mb-5 flex items-start gap-2 rounded border border-[#F8D4B0] bg-[#FDF4EB] px-4 py-3 text-sm text-[#92400E]">
          <span className="mt-0.5 shrink-0"><Icon.Warning /></span>
          <p className="font-medium">Changing this information may change the approvals identified for your project.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href={ENTREPRENEUR_ROUTES.dossier(project.id)} className="rounded border border-[#D1D9E0] bg-white px-5 py-2.5 text-sm font-semibold text-[#374151] hover:bg-[#F0F4F8]">Back to Master Project Dossier</Link>
          <Link href={ENTREPRENEUR_ROUTES.changes(project.id)} className="rounded bg-[#17365D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0F2540]">Edit this information</Link>
        </div>
      </div>
    </main>
  )
}
