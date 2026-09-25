'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import {
  listDocumentsForBusiness,
  E11_DOC_CATEGORIES,
  reqBadge,
  availBadge,
  verifBadge,
  validityBadge,
  reuseBadge,
  depBadge,
  type DocReqState,
  type DocAvailState,
  type DocVerifState,
} from './data';

export function DocumentCentreScreen({ project }: { project: BusinessProject }) {
  const router = useRouter();
  const [catFilter, setCatFilter] = useState<string>('All');
  const [reqFilter, setReqFilter] = useState<DocReqState | 'All'>('All');
  const [availFilter, setAvailFilter] = useState<DocAvailState | 'All'>('All');
  const [verifFilter, setVerifFilter] = useState<DocVerifState | 'All'>('All');
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const documents = listDocumentsForBusiness(project.id);

  const filtered = documents.filter(d => {
    if (catFilter !== 'All' && d.category !== catFilter) return false;
    if (reqFilter !== 'All' && d.requirement !== reqFilter) return false;
    if (availFilter !== 'All' && d.availability !== availFilter) return false;
    if (verifFilter !== 'All' && d.verification !== verifFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!d.name.toLowerCase().includes(q) && !d.id.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const handleViewDoc = (docId: string) => {
    router.push(ENTREPRENEUR_ROUTES.document(project.id, docId));
  };

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      {/* Page header */}
      <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
        <div className="max-w-[1280px] mx-auto">
          <nav className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href={ENTREPRENEUR_ROUTES.businesses()} className="hover:text-[#1a3a5c] hover:underline">
              My Businesses
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#1a3a5c] hover:underline">
              {project.name}
            </Link>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">Document Centre</span>
          </nav>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-[#1a3a5c]">Universal Business Document Centre</h1>
              <p className="text-sm text-[#6b7a8d] mt-0.5">
                {project.name} — {project.location}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-[#ede9fe] text-[#6d28d9] border border-[#c4b5fd] px-2.5 py-1 rounded font-semibold">
                Upload Once → Reuse Where Applicable
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-5">
        {/* Summary stat row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {[
            { label: 'Total Documents', value: documents.length.toString(), color: 'text-[#1a3a5c]' },
            {
              label: 'Available',
              value: documents.filter(d => d.availability === 'Available').length.toString(),
              color: 'text-[#15803d]',
            },
            {
              label: 'Missing',
              value: documents.filter(d => d.availability === 'Missing').length.toString(),
              color: 'text-[#b91c1c]',
            },
            {
              label: 'Needs Verification',
              value: documents.filter(d => d.verification === 'Needs Verification').length.toString(),
              color: 'text-[#d97706]',
            },
          ].map(s => (
            <div key={s.label} className="bg-white border border-[#e2e8f0] rounded p-3">
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-[#6b7a8d] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search and filter bar */}
        <div className="bg-white border border-[#e2e8f0] rounded p-3 mb-4">
          <div className="flex flex-wrap gap-2 items-center">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search documents by name or ID…"
              className="flex-1 min-w-[180px] text-sm border border-[#d1d9e0] rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
            />
            <button
              type="button"
              onClick={() => setShowFilters(v => !v)}
              className="text-xs border border-[#d1d9e0] rounded px-3 py-1.5 text-[#475569] hover:bg-[#f1f5f9] flex items-center gap-1.5"
            >
              ⚙ Filters {showFilters ? '▲' : '▼'}
            </button>
            {(catFilter !== 'All' || reqFilter !== 'All' || availFilter !== 'All' || verifFilter !== 'All' || search) && (
              <button
                type="button"
                onClick={() => {
                  setCatFilter('All');
                  setReqFilter('All');
                  setAvailFilter('All');
                  setVerifFilter('All');
                  setSearch('');
                }}
                className="text-xs text-[#b91c1c] hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-[#e2e8f0]">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Category</label>
                <select
                  value={catFilter}
                  onChange={e => setCatFilter(e.target.value)}
                  className="text-xs border border-[#d1d9e0] rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#1a56db]"
                >
                  {E11_DOC_CATEGORIES.map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Requirement</label>
                <select
                  value={reqFilter}
                  onChange={e => setReqFilter(e.target.value as DocReqState | 'All')}
                  className="text-xs border border-[#d1d9e0] rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#1a56db]"
                >
                  {['All', 'Required', 'Conditional', 'Not Required'].map(v => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Availability</label>
                <select
                  value={availFilter}
                  onChange={e => setAvailFilter(e.target.value as DocAvailState | 'All')}
                  className="text-xs border border-[#d1d9e0] rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#1a56db]"
                >
                  {['All', 'Available', 'Uploaded', 'Processing', 'Missing'].map(v => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Verification</label>
                <select
                  value={verifFilter}
                  onChange={e => setVerifFilter(e.target.value as DocVerifState | 'All')}
                  className="text-xs border border-[#d1d9e0] rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#1a56db]"
                >
                  {[
                    'All',
                    'Self-declared',
                    'User-confirmed',
                    'System-verified',
                    'Department-verified',
                    'Needs Verification',
                    'Invalid',
                  ].map(v => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Document table */}
        <div className="bg-white border border-[#e2e8f0] rounded overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-[#f8f9fb] border-b border-[#e2e8f0]">
                  {[
                    'ID',
                    'Document Name',
                    'Category',
                    'Issue Date',
                    'Expiry',
                    'Source',
                    'Requirement',
                    'Availability',
                    'Verification',
                    'Validity',
                    'Reuse',
                    'Dependency',
                    'Used By',
                    'Ver',
                    'Actions',
                  ].map(h => (
                    <th
                      key={h}
                      className="text-left px-3 py-2.5 font-semibold text-[#64748b] text-[10px] uppercase tracking-wider whitespace-nowrap border-r border-[#e8edf2] last:border-r-0"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={15} className="px-4 py-8 text-center text-[#94a3b8] text-sm">
                      No documents match the current filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((doc, i) => (
                    <tr
                      key={doc.id}
                      className={`border-b border-[#f1f5f9] hover:bg-[#f8f9fb] ${i % 2 === 1 ? 'bg-[#fafbfc]' : ''}`}
                    >
                      <td className="px-3 py-2.5 font-mono text-[#1a3a5c] font-semibold whitespace-nowrap border-r border-[#f1f5f9]">
                        {doc.id}
                      </td>
                      <td className="px-3 py-2.5 min-w-[180px] border-r border-[#f1f5f9]">
                        <button
                          type="button"
                          onClick={() => handleViewDoc(doc.id)}
                          className="text-left text-[#1a3a5c] font-medium hover:underline leading-tight"
                        >
                          {doc.name}
                        </button>
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap text-[#475569] border-r border-[#f1f5f9]">
                        {doc.category}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap text-[#475569] border-r border-[#f1f5f9]">
                        {doc.issueDate}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap text-[#475569] border-r border-[#f1f5f9]">
                        {doc.expiryDate}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap text-[#475569] border-r border-[#f1f5f9]">
                        {doc.source}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap border-r border-[#f1f5f9]">
                        {reqBadge(doc.requirement)}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap border-r border-[#f1f5f9]">
                        {availBadge(doc.availability)}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap border-r border-[#f1f5f9]">
                        {verifBadge(doc.verification)}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap border-r border-[#f1f5f9]">
                        {validityBadge(doc.validity)}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap border-r border-[#f1f5f9]">
                        {reuseBadge(doc.reuse)}
                      </td>
                      <td className="px-3 py-2.5 min-w-[130px] border-r border-[#f1f5f9]">
                        {depBadge(doc.dependency)}
                      </td>
                      <td className="px-3 py-2.5 min-w-[120px] border-r border-[#f1f5f9]">
                        {doc.usedBy.length === 0 ? (
                          <span className="text-[#94a3b8]">—</span>
                        ) : (
                          <div className="flex flex-col gap-0.5">
                            {doc.usedBy.map(u => (
                              <span key={u.dept + u.service} className="text-[#475569]">
                                {u.dept} — {u.service}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap text-center text-[#475569] border-r border-[#f1f5f9]">
                        {doc.version > 0 ? `v${doc.version}` : '—'}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleViewDoc(doc.id)}
                            className="text-[#1a56db] hover:underline font-medium"
                            title="View document detail"
                          >
                            View
                          </button>
                          <span className="text-[#cbd5e1]">·</span>
                          <button
                            type="button"
                            onClick={() => handleViewDoc(doc.id)}
                            className="text-[#475569] hover:text-[#1a3a5c] hover:underline"
                            title="Replace document"
                          >
                            Replace
                          </button>
                          <span className="text-[#cbd5e1]">·</span>
                          <button
                            type="button"
                            onClick={() => handleViewDoc(doc.id)}
                            className="text-[#6d28d9] hover:underline"
                            title="Open help / regulatory context"
                          >
                            Help
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2.5 border-t border-[#e2e8f0] bg-[#f8f9fb] flex items-center justify-between text-[10px] text-[#94a3b8]">
            <span>
              Showing {filtered.length} of {documents.length} documents
            </span>
            <span>{project.name} — Universal Document Repository</span>
          </div>
        </div>
      </div>
    </main>
  );
}
