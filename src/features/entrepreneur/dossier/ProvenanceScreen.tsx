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
      ? 'border-[#B8D0F5] bg-[#edf5ef] text-[#355E3B]'
      : notApplicable
        ? 'border-[#d6dfd5] bg-[#F9FAF2] text-[#555C56]'
        : 'border-[#BBF7D0] bg-[#F0FDF4] text-[#166534]'
  return <span className={`inline-flex rounded border px-2.5 py-1 text-xs font-semibold ${classes}`}>{state}</span>
}

function DetailDisclosure({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border-t border-slate-100 first:border-t-0">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-semibold text-[#355E3B] hover:bg-[#F9FAF2]">
        {title}
        <span className="transition-transform group-open:rotate-180"><Icon.ChevronDown /></span>
      </summary>
      <div className="border-t border-slate-100 bg-[#F9FAF2] px-5 py-4">{children}</div>
    </details>
  )
}

export function ProvenanceScreen({ project, fieldName }: { project: BusinessProject; fieldName: string }) {
  const details = getProvenanceDetails(fieldName, project)

  return (
    <main id="main-content" className="flex-1 bg-[#F9FAF2]" tabIndex={-1}>
      <div className="mx-auto max-w-[760px] px-4 py-6 sm:px-6">
        <div className="mb-5 border-b border-[#d6dfd5] pb-5">
          <h1 className="text-xl font-bold text-[#355E3B]">Data Provenance</h1>
          <p className="mt-1 text-sm text-[#555C56]">See where this Business DNA value came from and how it was verified.</p>
        </div>

        <section className="mb-5 overflow-hidden rounded-xl border border-[#d6dfd5] bg-white shadow-xs" aria-labelledby="provenance-field-name">
          <div className="grid gap-4 px-5 py-5 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#555C56]">Field</p>
              <h2 id="provenance-field-name" className="mt-1 text-base font-bold text-[#2B2B2B]">{details.fieldName}</h2>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#555C56]">Current value</p>
              <p className="mt-1 text-lg font-bold text-[#2B2B2B]">{details.currentValue}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#555C56]">Source</p>
              <p className="mt-1 text-sm font-semibold text-[#4A4A4A]">Source: {details.currentSource}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#555C56]">Verification state</p>
              <div className="mt-1"><VerificationBadge state={details.currentVerification} /></div>
            </div>
          </div>

          <DetailDisclosure title="Source and verification details">
            <dl className="grid gap-4 text-sm sm:grid-cols-2">
              <div><dt className="text-xs font-semibold text-[#555C56]">Business DNA version</dt><dd className="mt-1 text-[#4A4A4A]">Version 1</dd></div>
              <div><dt className="text-xs font-semibold text-[#555C56]">Last updated</dt><dd className="mt-1 text-[#4A4A4A]">22 Sep 2026</dd></div>
              {details.isPlotArea ? <>
                <div><dt className="text-xs font-semibold text-[#555C56]">Document</dt><dd className="mt-1 text-[#4A4A4A]">MIDC Allotment Letter</dd></div>
                <div><dt className="text-xs font-semibold text-[#555C56]">Issuer</dt><dd className="mt-1 text-[#4A4A4A]">MIDC</dd></div>
                <div><dt className="text-xs font-semibold text-[#555C56]">Verified by</dt><dd className="mt-1 text-[#4A4A4A]">MIDC</dd></div>
                <div><dt className="text-xs font-semibold text-[#555C56]">Verified on</dt><dd className="mt-1 text-[#4A4A4A]">22 Sep 2026</dd></div>
              </> : null}
            </dl>
          </DetailDisclosure>

          <DetailDisclosure title="Where this value is used">
            <div className="space-y-2">
              {details.usedBy.map(item => (
                <div key={`${item.dept}-${item.service}`} className="flex items-start gap-3 rounded border border-[#E1E7ED] bg-white px-3 py-2.5">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#3d7a4d]" />
                  <div><p className="text-xs font-bold text-[#2B2B2B]">{item.dept}</p><p className="mt-0.5 text-xs text-[#555C56]">{item.service}</p></div>
                </div>
              ))}
            </div>
          </DetailDisclosure>

          <DetailDisclosure title="Version history">
            <div className="space-y-3">
              {details.history.map((history, index) => (
                <div key={history.version} className="rounded border border-[#d6dfd5] bg-white p-3">
                  <div className="flex items-center justify-between gap-3"><p className="text-xs font-bold text-[#355E3B]">{history.version}{index === details.history.length - 1 ? ' · Current' : ''}</p><p className="text-[11px] text-[#555C56]">{history.date}</p></div>
                  <p className="mt-2 text-sm font-semibold text-[#2B2B2B]">{history.value}</p>
                  <p className="mt-1 text-xs text-[#555C56]">Source: {history.source} · {history.verification}</p>
                </div>
              ))}
            </div>
          </DetailDisclosure>
        </section>

        <div className="mb-5 flex items-start gap-2 rounded border border-[#F8D4B0] bg-[#FDF4EB] px-4 py-3 text-sm text-[#7a5807]">
          <span className="mt-0.5 shrink-0"><Icon.Warning /></span>
          <p className="font-medium">Changing this information may change the approvals identified for your project.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href={ENTREPRENEUR_ROUTES.dossier(project.id)} className="rounded border border-[#d6dfd5] bg-white px-5 py-2.5 text-sm font-semibold text-[#4A4A4A] hover:bg-[#F9FAF2]">Back to Master Project Dossier</Link>
          <Link href={ENTREPRENEUR_ROUTES.changes(project.id)} className="rounded bg-[#355E3B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#27472c]">Edit this information</Link>
        </div>
      </div>
    </main>
  )
}
