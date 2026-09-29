'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import {
  listDocumentsForBusiness,
  E11_DOC_CATEGORIES,
  type DocRecord,
} from './data';
import { CertificatePreviewModal } from './CertificatePreviewModal';
import {
  Search,
  ShieldCheck,
  Award,
  Layers,
  UploadCloud,
  FileCheck,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Clock,
  RefreshCw,
  Eye,
} from 'lucide-react';

type GroupFilter = 'ALL' | 'ACTION_REQUIRED' | 'READY_VALID' | 'EXPIRED_UPDATE' | 'REUSABLE';

export function DocumentCentreScreen({ project }: { project: BusinessProject }) {
  const router = useRouter();
  const [activeGroup, setActiveGroup] = useState<GroupFilter>('ALL');
  const [catFilter, setCatFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [selectedCertDoc, setSelectedCertDoc] = useState<DocRecord | null>(null);
  const [expandedDocIds, setExpandedDocIds] = useState<Set<string>>(new Set());

  const documents = listDocumentsForBusiness(project.id);

  // Grouping partitions
  const actionRequiredDocs = useMemo(
    () =>
      documents.filter(
        d =>
          d.availability === 'Missing' ||
          d.verification === 'Needs Verification' ||
          d.verification === 'Invalid' ||
          d.extractedData?.reviewRequired
      ),
    [documents]
  );

  const readyValidDocs = useMemo(
    () =>
      documents.filter(
        d =>
          (d.availability === 'Available' || d.availability === 'Uploaded') &&
          d.validity === 'Valid' &&
          d.verification !== 'Needs Verification' &&
          d.verification !== 'Invalid'
      ),
    [documents]
  );

  const expiredDocs = useMemo(
    () =>
      documents.filter(
        d => d.validity === 'Expired' || (d.availability === 'Missing' && d.requirement === 'Required')
      ),
    [documents]
  );

  const reusableDocs = useMemo(
    () => documents.filter(d => d.reuse === 'Reusable'),
    [documents]
  );

  // Filtered documents for display
  const displayedDocs = useMemo(() => {
    let list: DocRecord[];

    switch (activeGroup) {
      case 'ACTION_REQUIRED':
        list = actionRequiredDocs;
        break;
      case 'READY_VALID':
        list = readyValidDocs;
        break;
      case 'EXPIRED_UPDATE':
        list = expiredDocs;
        break;
      case 'REUSABLE':
        list = reusableDocs;
        break;
      default:
        list = documents;
        break;
    }

    return list.filter(d => {
      if (catFilter !== 'All' && d.category !== catFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          d.name.toLowerCase().includes(q) ||
          d.id.toLowerCase().includes(q) ||
          d.source.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeGroup, actionRequiredDocs, readyValidDocs, expiredDocs, reusableDocs, documents, catFilter, search]);

  const handleViewDoc = (docId: string) => {
    router.push(ENTREPRENEUR_ROUTES.document(project.id, docId));
  };

  const toggleExpand = (docId: string) => {
    setExpandedDocIds(prev => {
      const next = new Set(prev);
      if (next.has(docId)) {
        next.delete(docId);
      } else {
        next.add(docId);
      }
      return next;
    });
  };

  const isCertificateDoc = (d: DocRecord) => {
    return (
      Boolean(d.certificateData) ||
      d.verification === 'Government-issued' ||
      d.category === 'Previous Approvals' ||
      d.name.toLowerCase().includes('certificate') ||
      d.name.toLowerCase().includes('agreement')
    );
  };

  return (
    <main id="main-content" className="flex-1 bg-[#F8F9FA] pb-20 font-sans" tabIndex={-1}>
      {/* ── Breadcrumb & Page Header ── */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-5">
        <div className="max-w-[1440px] mx-auto">
          <nav className="text-xs text-slate-500 mb-2.5 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href={ENTREPRENEUR_ROUTES.businesses()} className="hover:text-[#17365D] hover:underline">
              My Businesses
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#17365D] hover:underline">
              {project.name}
            </Link>
            <span>›</span>
            <span className="text-[#17365D] font-bold">Document Centre</span>
          </nav>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#17365D] tracking-tight">
                Document Centre
              </h1>
              <p className="mt-1 text-sm text-slate-600">Upload once. Reuse across applications.</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>e-Pramaan Verified Storage</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 space-y-7">
        {/* ── THE 6 QUESTIONS EXECUTIVE ANSWER STRIP (Uniform Distribution & Generous Spacing) ── */}
        <section aria-label="Executive Document Metrics">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-700">Dossier status</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* 1. What documents do I have? */}
            <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between h-[112px]">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  1. In Dossier
                </span>
                <p className="text-xs font-medium text-slate-600 mt-0.5">Documents uploaded</p>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-slate-900 tracking-tight">
                  {documents.filter(d => d.availability === 'Available' || d.availability === 'Uploaded').length}
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  of {documents.length} Total
                </span>
              </div>
            </div>

            {/* 2. What documents are required? */}
            <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between h-[112px]">
              <div>
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                  2. Required by Law
                </span>
                <p className="text-xs font-medium text-slate-600 mt-0.5">Mandatory statutory</p>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-blue-700 tracking-tight">
                  {documents.filter(d => d.requirement === 'Required').length}
                </span>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                  Mandatory
                </span>
              </div>
            </div>

            {/* 3. What can be reused? */}
            <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between h-[112px]">
              <div>
                <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">
                  3. Reusable
                </span>
                <p className="text-xs font-medium text-slate-600 mt-0.5">Cross-department</p>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-purple-700 tracking-tight">
                  {reusableDocs.length}
                </span>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                  Multi-use
                </span>
              </div>
            </div>

            {/* 4. What is missing? */}
            <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between h-[112px]">
              <div>
                <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block">
                  4. Action Required
                </span>
                <p className="text-xs font-medium text-slate-600 mt-0.5">Missing uploads</p>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-red-700 tracking-tight">
                  {documents.filter(d => d.availability === 'Missing').length}
                </span>
                <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-md">
                  Upload needed
                </span>
              </div>
            </div>

            {/* 5. What is expired? */}
            <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between h-[112px]">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  5. Expired / Lapsed
                </span>
                <p className="text-xs font-medium text-slate-600 mt-0.5">Upcoming renewals</p>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-slate-800 tracking-tight">
                  {documents.filter(d => d.validity === 'Expired').length}
                </span>
                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                  All Active
                </span>
              </div>
            </div>

            {/* 6. What needs verification? */}
            <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between h-[112px]">
              <div>
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
                  6. Needs Review
                </span>
                <p className="text-xs font-medium text-slate-600 mt-0.5">Pending verification</p>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-amber-700 tracking-tight">
                  {documents.filter(d => d.verification === 'Needs Verification').length}
                </span>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                  To Verify
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── SINGLE-DOSSIER REASSURANCE BANNER ── */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-50/60 via-slate-50 to-indigo-50/60 border border-slate-200/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-[#17365D] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Layers className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">
                Single-Dossier Shared Architecture Active
              </p>
              <p className="text-slate-600 text-xs mt-0.5">
                Core documents (MIDC Lease Agreement, MPCB CTE Certificate, Promoter KYC) are stored once and automatically shared with MPCB, MIDC, Fire Services, and DISH.
              </p>
            </div>
          </div>
        </div>

        {/* ── FILTER TABS & SEARCH BAR ── */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Functional Group Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveGroup('ALL')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  activeGroup === 'ALL'
                    ? 'bg-[#17365D] text-white shadow-2xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                All Documents ({documents.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveGroup('ACTION_REQUIRED')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeGroup === 'ACTION_REQUIRED'
                    ? 'bg-red-700 text-white shadow-2xs'
                    : 'bg-white text-red-700 border border-red-200 hover:bg-red-50'
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Action Required ({actionRequiredDocs.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveGroup('READY_VALID')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeGroup === 'READY_VALID'
                    ? 'bg-emerald-700 text-white shadow-2xs'
                    : 'bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-50'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Ready / Valid ({readyValidDocs.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveGroup('EXPIRED_UPDATE')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeGroup === 'EXPIRED_UPDATE'
                    ? 'bg-slate-800 text-white shadow-2xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Expired ({expiredDocs.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveGroup('REUSABLE')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeGroup === 'REUSABLE'
                    ? 'bg-purple-800 text-white shadow-2xs'
                    : 'bg-white text-purple-800 border border-purple-200 hover:bg-purple-50'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reusable ({reusableDocs.length})</span>
              </button>
            </div>

            {/* Search and Category Filter */}
            <div className="flex items-center gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Filter documents…"
                  className="w-full pl-9 pr-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17365D] focus:border-transparent transition-all shadow-2xs"
                />
              </div>

              <select
                value={catFilter}
                onChange={e => setCatFilter(e.target.value)}
                className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17365D] shadow-2xs text-slate-700 font-medium"
              >
                {E11_DOC_CATEGORIES.map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ── TABULAR FORM: THE DOCUMENT TABLE (Clean, Spacious, Uniform Distribution) ── */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th scope="col" className="py-4 px-6 w-[34%]">
                      Document
                    </th>
                    <th scope="col" className="py-4 px-4 w-[11%]">
                      Status
                    </th>
                    <th scope="col" className="py-4 px-4 w-[11%]">
                      Validity
                    </th>
                    <th scope="col" className="py-4 px-4 w-[16%]">
                      Verification
                    </th>
                    <th scope="col" className="py-4 px-4 w-[16%]">
                      Used By
                    </th>
                    <th scope="col" className="py-4 px-6 w-[12%] text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {displayedDocs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 px-6 text-center text-slate-500">
                        No documents match the current grouping and filter selection.
                      </td>
                    </tr>
                  ) : (
                    displayedDocs.map(doc => {
                      const hasCertificate = isCertificateDoc(doc);
                      const isMissing = doc.availability === 'Missing';
                      const isExpanded = expandedDocIds.has(doc.id);
                      const reuseCount = doc.usedBy.length;

                      // Status pill styling
                      const statusStyles =
                        doc.availability === 'Available'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : doc.availability === 'Uploaded'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-red-50 text-red-700 border-red-200';

                      // Validity pill styling
                      const validityStyles =
                        doc.validity === 'Valid'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : doc.validity === 'Expired'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200';

                      // Verification pill styling
                      const verificationStyles =
                        doc.verification === 'Government-issued' || doc.verification === 'Department-verified'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : doc.verification === 'System-verified'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : doc.verification === 'Needs Verification'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200';

                      return (
                        <React.Fragment key={doc.id}>
                          <tr className="hover:bg-slate-50/70 transition-colors group">
                            {/* Column 1: Document Name & Metadata */}
                            <td className="py-4 px-6">
                              <div className="space-y-1">
                                <button
                                  type="button"
                                  onClick={() => handleViewDoc(doc.id)}
                                  className="text-left font-bold text-slate-900 hover:text-[#17365D] transition-colors text-[13px] leading-snug group-hover:underline block"
                                >
                                  {doc.name}
                                </button>

                                <div className="flex items-center gap-2 flex-wrap text-[11px] text-slate-500">
                                  <span className="font-mono text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
                                    {doc.id}
                                  </span>
                                  <span className="text-slate-600 font-medium">
                                    {doc.category}
                                  </span>

                                  {hasCertificate && (
                                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded flex items-center gap-1">
                                      <Award className="w-3 h-3 text-emerald-600" />
                                      <span>Official Certificate</span>
                                    </span>
                                  )}

                                  {doc.extractedData && (
                                    <button
                                      type="button"
                                      onClick={() => toggleExpand(doc.id)}
                                      className="text-[10px] font-semibold text-blue-700 hover:text-blue-900 bg-blue-50/80 hover:bg-blue-100 border border-blue-200/80 px-2 py-0.5 rounded flex items-center gap-1 transition-colors"
                                    >
                                      <FileCheck className="w-3 h-3 text-blue-600" />
                                      <span>{isExpanded ? 'Hide Extracted Data' : 'View Extracted Data'}</span>
                                      {isExpanded ? (
                                        <ChevronUp className="w-3 h-3" />
                                      ) : (
                                        <ChevronDown className="w-3 h-3" />
                                      )}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* Column 2: Status */}
                            <td className="py-4 px-4 align-middle">
                              <span
                                className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold border ${statusStyles}`}
                              >
                                {doc.availability}
                              </span>
                            </td>

                            {/* Column 3: Validity */}
                            <td className="py-4 px-4 align-middle">
                              <span
                                className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold border ${validityStyles}`}
                              >
                                {doc.validity}
                              </span>
                            </td>

                            {/* Column 4: Verification */}
                            <td className="py-4 px-4 align-middle">
                              <span
                                className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold border ${verificationStyles}`}
                              >
                                {doc.verification}
                              </span>
                            </td>

                            {/* Column 5: Used By */}
                            <td className="py-4 px-4 align-middle">
                              {doc.reuse === 'Reusable' ? (
                                <div className="space-y-0.5">
                                  <span className="inline-block text-[11px] font-bold text-purple-800 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md">
                                    Used for {reuseCount} applications
                                  </span>
                                  <p className="text-[11px] text-slate-500 truncate max-w-[180px]">
                                    {doc.usedBy.map(u => u.dept).join(', ')}
                                  </p>
                                </div>
                              ) : (
                                <div className="space-y-0.5">
                                  <span className="text-[11px] font-medium text-slate-600">
                                    Service-specific
                                  </span>
                                  <p className="text-[11px] text-slate-400 truncate max-w-[180px]">
                                    {doc.usedBy.length > 0 ? doc.usedBy[0].dept : '—'}
                                  </p>
                                </div>
                              )}
                            </td>

                            {/* Column 6: Actions */}
                            <td className="py-4 px-6 text-right align-middle">
                              <div className="flex items-center justify-end gap-2">
                                {/* Dedicated Certificate Preview Modal Trigger */}
                                {hasCertificate && (
                                  <button
                                    type="button"
                                    onClick={() => setSelectedCertDoc(doc)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 transition-colors shadow-2xs"
                                    title="View Official Certificate with QR Code"
                                  >
                                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Certificate</span>
                                  </button>
                                )}

                                {/* Primary Action: Upload if missing, otherwise View */}
                                {isMissing ? (
                                  <button
                                    type="button"
                                    onClick={() => handleViewDoc(doc.id)}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1a56db] text-white hover:bg-[#1542a8] transition-colors shadow-2xs"
                                  >
                                    <UploadCloud className="w-3.5 h-3.5" />
                                    <span>Upload</span>
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => handleViewDoc(doc.id)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs"
                                  >
                                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                                    <span>View</span>
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>

                          {/* ── EXPANDED ROW: EXTRACTED DATA (Clean, non-cluttering sub-panel) ── */}
                          {isExpanded && doc.extractedData && (
                            <tr className="bg-slate-50/80 border-b border-slate-200">
                              <td colSpan={6} className="py-4 px-8">
                                <div className="bg-white rounded-lg p-4 border border-slate-200/90 shadow-2xs space-y-3">
                                  <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100">
                                    <div className="flex items-center gap-2">
                                      <FileCheck className="w-4 h-4 text-blue-600" />
                                      <span className="text-xs font-bold text-slate-900">
                                        Extracted Document Information
                                      </span>
                                      <span className="text-[11px] text-slate-500">
                                        (Automated Data Verification)
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span
                                        className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                          doc.extractedData.reviewRequired
                                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                                            : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                        }`}
                                      >
                                        {doc.extractedData.verificationState}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => handleViewDoc(doc.id)}
                                        className="text-[11px] font-semibold text-[#17365D] hover:underline flex items-center gap-1"
                                      >
                                        <span>Full Details</span>
                                        <ExternalLink className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>

                                  {/* Parsed Fields Grid */}
                                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                    {doc.extractedData.fields.map(field => (
                                      <div
                                        key={field.label}
                                        className="bg-slate-50 p-2.5 rounded-lg border border-slate-100"
                                      >
                                        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block">
                                          {field.label}
                                        </span>
                                        <p className="text-xs font-bold text-slate-900 mt-0.5">
                                          {field.value}
                                        </p>
                                      </div>
                                    ))}
                                  </div>

                                  {doc.extractedData.summary && (
                                    <p className="text-[11px] text-slate-600 bg-amber-50/60 border border-amber-200/60 p-2 rounded text-amber-950">
                                      <strong>Note:</strong> {doc.extractedData.summary}
                                    </p>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer: Uniform summary count & security reassurance */}
            <div className="px-6 py-3.5 bg-slate-50/90 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
              <span>
                Showing <strong>{displayedDocs.length}</strong> of <strong>{documents.length}</strong> documents in dossier
              </span>
              <span className="text-[11px] flex items-center gap-1.5 text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>e-Pramaan Encrypted & Timestamped Storage · Government of Maharashtra</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── OFFICIAL CERTIFICATE PREVIEW MODAL ── */}
      {selectedCertDoc && (
        <CertificatePreviewModal
          doc={selectedCertDoc}
          businessName={project.name}
          businessLocation={project.location}
          projectId={project.id}
          onClose={() => setSelectedCertDoc(null)}
        />
      )}
    </main>
  );
}
