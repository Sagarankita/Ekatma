'use client'

import React from 'react'
import Link from 'next/link'
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur'
import type { BusinessProject } from '../businesses/catalog'
import { getProvenanceDetails } from './data'

export function ProvenanceScreen({
  project,
  fieldName,
}: {
  project: BusinessProject
  fieldName: string
}) {
  const details = getProvenanceDetails(fieldName, project)

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="max-w-[700px] mx-auto px-6 py-5">
        <div className="mb-4">
          <nav className="text-xs text-[#6b7a8d] flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href={ENTREPRENEUR_ROUTES.businesses()} className="hover:text-[#1a3a5c] hover:underline">My Businesses</Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#1a3a5c] hover:underline">{project.name}</Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.dossier(project.id)} className="hover:text-[#1a3a5c] hover:underline">Master Project Dossier</Link>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">Data Provenance</span>
          </nav>
        </div>

        <div className="mb-4 pb-4 border-b border-[#d1d9e0]">
          <p className="text-xs font-bold text-[#9aa5b4] uppercase tracking-wider mb-1">E08 — Data Provenance</p>
          <h1 className="text-xl font-bold text-[#1a3a5c]">{details.fieldName}</h1>
          <p className="text-xs text-[#6b7a8d] mt-1">{project.name} · {project.location}</p>
        </div>

        <div className="bg-white border border-[#d1d9e0] rounded shadow-sm p-6 space-y-6">
          {/* Current effective value */}
          <div>
            <p className="text-[10px] font-bold text-[#1a56db] uppercase tracking-wider mb-2">Current Effective Value</p>
            <p className="text-2xl font-bold text-[#1a2533]">{details.currentValue}</p>
            <p className="text-xs text-[#6b7a8d] mt-1">Business DNA Version 1 · Last updated 22 Sep 2026</p>
          </div>

          {/* Source */}
          <div>
            <p className="text-[10px] font-bold text-[#9aa5b4] uppercase tracking-wider mb-2">Source</p>
            <p className="text-sm font-semibold text-[#1a2533]">{details.currentSource}</p>
            {details.isPlotArea && (
              <div className="mt-2 p-3 bg-[#f8f9fb] border border-[#d1d9e0] rounded space-y-1">
                <p className="text-xs text-[#6b7a8d]"><span className="font-semibold">Document:</span> MIDC Allotment Letter</p>
                <p className="text-xs text-[#6b7a8d]"><span className="font-semibold">Issuer:</span> MIDC</p>
                <p className="text-xs text-[#6b7a8d]"><span className="font-semibold">Issue Date:</span> 12 Jun 2026</p>
              </div>
            )}
          </div>

          {/* Verification */}
          <div>
            <p className="text-[10px] font-bold text-[#9aa5b4] uppercase tracking-wider mb-2">Verification</p>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded border ${details.currentVerification === 'Department Verified' ? 'bg-[#f0fdf4] text-[#166534] border-[#86efac]' : 'bg-[#f8f9fb] text-[#6b7a8d] border-[#d1d9e0]'}`}>
                {details.currentVerification}
              </span>
            </div>
            {details.isPlotArea && (
              <div className="mt-2 text-xs text-[#6b7a8d] space-y-0.5">
                <p><span className="font-semibold">Verified By:</span> MIDC</p>
                <p><span className="font-semibold">Verified On:</span> 22 Sep 2026</p>
              </div>
            )}
          </div>

          {/* Issue / Expiry */}
          {details.isPlotArea && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold text-[#9aa5b4] uppercase tracking-wider mb-1">Issue Date</p>
                <p className="text-sm text-[#374151]">12 Jun 2026</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#9aa5b4] uppercase tracking-wider mb-1">Expiry Date</p>
                <p className="text-sm text-[#9aa5b4] italic">Not Applicable</p>
              </div>
            </div>
          )}

          {/* Used By */}
          <div>
            <p className="text-[10px] font-bold text-[#9aa5b4] uppercase tracking-wider mb-2">Used By</p>
            <div className="space-y-1.5">
              {details.usedBy.map(u => (
                <div key={u.dept} className="flex items-center gap-3 px-3 py-2 bg-[#f8f9fb] border border-[#e8edf2] rounded">
                  <span className="w-2 h-2 rounded-full bg-[#1a56db] shrink-0" />
                  <span className="text-xs font-semibold text-[#1a2533] w-16 shrink-0">{u.dept}</span>
                  <span className="text-xs text-[#6b7a8d]">{u.service}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-[#9aa5b4] mt-2 italic">&ldquo;Used By&rdquo; indicates data reuse, not verification ownership.</p>
          </div>

          {/* Potential Impact */}
          <div className="p-3 bg-[#fff7ed] border border-[#fed7aa] rounded">
            <p className="text-xs font-semibold text-[#92400e] mb-1">Potential Impact</p>
            <p className="text-xs text-[#92400e]">This value is currently used by active regulatory records. Changing it may affect existing applications and requirements.</p>
          </div>

          {/* Version History */}
          <div>
            <p className="text-[10px] font-bold text-[#9aa5b4] uppercase tracking-wider mb-2">Version History</p>
            <div className="space-y-3">
              {details.history.map((h, i) => (
                <div key={h.version} className={`p-3 border rounded ${i === details.history.length - 1 ? 'border-[#b8d0f5] bg-[#ebf3ff]' : 'border-[#e8edf2] bg-[#f8f9fb]'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-[#1a3a5c]">{h.version}</span>
                    {i === details.history.length - 1 && <span className="text-[10px] bg-[#1a3a5c] text-white px-1.5 py-0.5 rounded">Current</span>}
                    <span className="ml-auto text-[10px] text-[#9aa5b4]">{h.date}</span>
                  </div>
                  <p className="text-sm font-semibold text-[#1a2533]">{h.value}</p>
                  <p className="text-xs text-[#6b7a8d]">Source: {h.source}</p>
                  <p className="text-xs text-[#6b7a8d]">Verification: {h.verification}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Link
            href={ENTREPRENEUR_ROUTES.dossier(project.id)}
            className="inline-block border border-[#d1d9e0] text-[#374151] text-sm font-medium px-5 py-2.5 rounded hover:bg-[#f0f4f8] transition-colors"
          >
            ← Back to Master Project Dossier
          </Link>
        </div>
      </div>
    </main>
  )
}
