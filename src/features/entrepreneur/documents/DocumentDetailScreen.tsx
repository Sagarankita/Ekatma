'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import { useRegulatoryAssistant } from '@/features/regulatory-assistant/Provider';
import { inlineContext } from '@/features/regulatory-assistant/context';
import {
  findDocumentForBusiness,
  reqBadge,
  availBadge,
  verifBadge,
  validityBadge,
  reuseBadge,
  depBadge,
  type DocReqState,
  type DocVerifState,
} from './data';
import { CertificatePreviewModal } from './CertificatePreviewModal';
import { Award, FileCheck, Check, AlertTriangle, ShieldCheck } from 'lucide-react';

export function DocumentDetailScreen({
  project,
  documentId,
}: {
  project: BusinessProject;
  documentId: string;
}) {
  const router = useRouter();
  const doc = findDocumentForBusiness(project.id, documentId);
  const [ragOpen, setRagOpen] = useState(false);
  const [ragInput, setRagInput] = useState('');
  const [ragMessages, setRagMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);
  const [showCertModal, setShowCertModal] = useState(false);
  const { openAssistant, pageContext } = useRegulatoryAssistant();

  const SUGGESTED_PROMPTS = [
    'Why is this document required?',
    'What should it contain?',
    'Which GR / rule requires it?',
    'Where do I obtain it?',
    'Which services use it?',
    'Can I reuse it?',
  ];

  function handleRagSend(text: string) {
    if (!text.trim() || !doc) return;
    const responses: Record<string, string> = {
      'Why is this document required?': doc.whyRequired,
      'What should it contain?': doc.whatItContains,
      'Which GR / rule requires it?': doc.grRule
        ? `${doc.grRule} — ${doc.grClause}. Effective: ${doc.grEffective}.`
        : 'The specific regulatory reference for this document needs verification. Do not rely on an unverified source.',
      'Where do I obtain it?': doc.whereObtained,
      'Which services use it?': doc.usedBy.length
        ? doc.usedBy.map(u => `${u.dept} — ${u.service} (${u.requirement})`).join('\n')
        : 'This document is not yet linked to any active service in the system.',
      'Can I reuse it?':
        doc.reuse === 'Reusable'
          ? 'Yes — this document is reusable across applicable services while it remains valid and meets the service-specific requirements.'
          : 'This document is service-specific and cannot be automatically reused across departments.',
    };
    const reply =
      responses[text] ||
      `This question relates to ${doc.name}. Please consult the regulatory source or contact the relevant department for a precise answer.`;
    setRagMessages(prev => [...prev, { role: 'user', text }, { role: 'assistant', text: reply }]);
    setRagInput('');
  }

  if (!doc) {
    return (
      <main className="flex-1 bg-[#F9FAF2] flex items-center justify-center min-h-[60vh]">
        <div className="text-center py-16">
          <p className="text-[#555C56] text-sm">Document not found.</p>
          <Link
            href={ENTREPRENEUR_ROUTES.documents(project.id)}
            className="mt-3 inline-block text-sm text-[#6DAE7C] hover:underline"
          >
            ← Back to Document Centre
          </Link>
        </div>
      </main>
    );
  }

  const isCertificate =
    Boolean(doc.certificateData) ||
    doc.verification === 'Government-issued' ||
    doc.category === 'Previous Approvals' ||
    doc.name.toLowerCase().includes('certificate');

  const openDocumentAssistant = () =>
    openAssistant({
      origin: 'inline',
      mode: 'entity',
      context: inlineContext(pageContext, {
        pageType: 'document-detail',
        pageTitle: 'Document Detail',
        label: doc.name,
        entities: { businessId: project.id, documentId: doc.id },
        recordTitle: doc.name,
      }),
    });

  return (
    <main id="main-content" className="flex-1 bg-[#F9FAF2] pb-16 font-sans" tabIndex={-1}>
      {/* ── Page Header ── */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-xs">
        <div className="max-w-[1100px] mx-auto">
          <nav className="text-xs text-[#555C56] mb-2 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href={ENTREPRENEUR_ROUTES.businesses()} className="hover:text-[#355E3B] hover:underline">
              My Businesses
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#355E3B] hover:underline">
              {project.name}
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.documents(project.id)} className="hover:text-[#355E3B] hover:underline">
              Document Centre
            </Link>
            <span>›</span>
            <span className="text-[#355E3B] font-medium">{doc.id}</span>
          </nav>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-[#555C56] bg-[#F9FAF2] border border-[#e3ebe1] px-2 py-0.5 rounded">
                  {doc.id}
                </span>
                <span className="text-xs text-[#555C56]">{doc.category}</span>
                {doc.version > 0 && <span className="text-xs text-[#9ab098]">v{doc.version}</span>}
              </div>
              <h1 className="text-xl font-bold text-[#355E3B]">{doc.name}</h1>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href={ENTREPRENEUR_ROUTES.documents(project.id)}
                className="text-sm border border-[#d6dfd5] rounded-lg px-3 py-1.5 text-[#4A4A4A] hover:bg-[#F9FAF2] transition-colors"
              >
                ← Back to Documents
              </Link>

              {/* View Certificate Action if applicable */}
              {isCertificate && (
                <button
                  type="button"
                  onClick={() => setShowCertModal(true)}
                  className="text-sm bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg px-3.5 py-1.5 font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Award className="w-4 h-4" />
                  <span>View Certificate</span>
                </button>
              )}

              {doc.availability === 'Available' || doc.availability === 'Uploaded' ? (
                <button
                  type="button"
                  onClick={() => (isCertificate ? setShowCertModal(true) : null)}
                  className="text-sm bg-[#355E3B] text-white rounded-lg px-3.5 py-1.5 hover:bg-[#3d7a4d] font-semibold transition-colors"
                >
                  {isCertificate ? 'Preview Document' : 'View File'}
                </button>
              ) : (
                <button
                  type="button"
                  className="text-sm bg-[#6DAE7C] text-white rounded-lg px-3.5 py-1.5 hover:bg-[#539160] font-semibold transition-colors"
                >
                  Upload Document
                </button>
              )}
            </div>
          </div>

          {/* Badge strip */}
          <div className="flex flex-wrap gap-2 mt-3">
            {reqBadge(doc.requirement)}
            {availBadge(doc.availability)}
            {verifBadge(doc.verification)}
            {validityBadge(doc.validity)}
            {reuseBadge(doc.reuse)}
            {depBadge(doc.dependency)}
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left / Main column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Official Statutory Clearance Banner (If Certificate exists) */}
          {isCertificate && (
            <section className="bg-gradient-to-r from-emerald-50/80 to-teal-50/80 border border-emerald-300 rounded-xl p-5 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                    Official Statutory Clearance
                  </span>
                  <h3 className="text-base font-bold text-emerald-950 mt-1">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    {doc.certificateData?.certNumber ? (
                      <>
                        Certificate Ref: <strong className="font-mono">{doc.certificateData.certNumber}</strong> · Granted by {doc.certificateData.authority}
                      </>
                    ) : (
                      <>Statutory government certificate issued by {doc.source}</>
                    )}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCertModal(true)}
                  className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>View Certificate (with e-Pramaan QR)</span>
                </button>
              </div>
            </section>
          )}

          {/* ── Extracted Document Information (Without OCR Jargon) ── */}
          {doc.extractedData && (
            <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3 flex-wrap gap-2">
                <div>
                  <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-blue-600" />
                    <span>Extracted Document Information</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Information automatically read from document and cross-checked against your confirmed Business Profile
                  </p>
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded border ${
                    doc.extractedData.reviewRequired
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  }`}
                >
                  {doc.extractedData.verificationState}
                </span>
              </div>

              {doc.extractedData.summary && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 mb-4 leading-relaxed">
                  {doc.extractedData.summary}
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-wider text-left bg-slate-50/50">
                      <th className="py-2 px-3">Field Name</th>
                      <th className="py-2 px-3">Extracted Value</th>
                      <th className="py-2 px-3 text-right">Profile Cross-Reference</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {doc.extractedData.fields.map(f => (
                      <tr key={f.label} className="hover:bg-slate-50/50">
                        <td className="py-2.5 px-3 font-medium text-slate-600">{f.label}</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">{f.value}</td>
                        <td className="py-2.5 px-3 text-right">
                          {f.match ? (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded inline-flex items-center gap-1">
                              <Check className="w-3 h-3" /> Confirmed Match
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded inline-flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 text-amber-600" /> Review Recommended
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Document Information */}
          <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <h2 className="text-sm font-bold text-[#355E3B] mb-3 border-b border-slate-200 pb-2">
              Document Purpose & Content
            </h2>
            <div className="space-y-3.5 text-xs text-slate-700 leading-relaxed">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">What is it?</p>
                <p>{doc.description}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Why is it required?</p>
                <p>{doc.whyRequired}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">What should it contain?</p>
                <p>{doc.whatItContains}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Where is it obtained?</p>
                <p>{doc.whereObtained}</p>
              </div>
            </div>
          </section>

          {/* Regulatory source */}
          <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <h2 className="text-sm font-bold text-[#355E3B] mb-3 border-b border-slate-200 pb-2">
              Regulatory Source
            </h2>
            {doc.grRule ? (
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Rule / Act</p>
                  <p className="text-slate-800 font-semibold">{doc.grRule}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Clause / Section</p>
                  <p className="text-slate-800">{doc.grClause}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Effective Date</p>
                  <p className="text-slate-800">{doc.grEffective}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Verified</p>
                  <p className="text-emerald-700 font-semibold">✓ Verified</p>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900">
                <span className="font-semibold">Needs Verification</span> — The specific regulatory reference for this
                document has not been independently confirmed. Do not rely on an unverified source for legal compliance
                purposes.
              </div>
            )}
          </section>

          {/* Service usage table */}
          <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
              <h2 className="text-sm font-bold text-[#355E3B]">
                Applications Using This Document ({doc.usedBy.length})
              </h2>
              <span className="text-[10px] font-bold text-purple-800 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
                Shared Across Departments
              </span>
            </div>
            {doc.usedBy.length === 0 ? (
              <p className="text-xs text-slate-400">This document is not currently linked to any active service.</p>
            ) : (
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                    <th className="text-left px-3 py-2">Department</th>
                    <th className="text-left px-3 py-2">Service</th>
                    <th className="text-left px-3 py-2">Requirement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {doc.usedBy.map((u, i) => {
                    const reqId = u.dept === 'MPCB' && u.service.includes('Consent to Establish') ? 'EST-001' : null;
                    return (
                      <tr key={i} className="hover:bg-slate-50/50">
                        <td className="px-3 py-2.5 font-bold text-[#355E3B]">{u.dept}</td>
                        <td className="px-3 py-2.5 text-slate-800">
                          {reqId ? (
                            <Link
                              href={ENTREPRENEUR_ROUTES.requirement(project.id, reqId)}
                              className="hover:underline text-[#6DAE7C] font-semibold"
                            >
                              {u.service}
                            </Link>
                          ) : (
                            <span>{u.service}</span>
                          )}
                        </td>
                        <td className="px-3 py-2.5">{reqBadge(u.requirement as DocReqState)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </section>

          {/* Version history */}
          <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <h2 className="text-sm font-bold text-[#355E3B] mb-3 border-b border-slate-200 pb-2">Version History</h2>
            {doc.versionHistory.length === 0 ? (
              <p className="text-xs text-slate-400">No versions uploaded yet.</p>
            ) : (
              <div className="space-y-2">
                {doc.versionHistory.map((v, i) => (
                  <div
                    key={v.version}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-xs ${
                      i === 0 ? 'bg-sky-50/50 border-sky-200' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-slate-900">Version {v.version}</span>
                      {i === 0 && (
                        <span className="ml-2 text-[10px] bg-blue-100 text-blue-800 border border-blue-200 px-1.5 py-0.5 rounded font-bold">
                          Current Active
                        </span>
                      )}
                      <span className="ml-3 text-[11px] text-slate-500">Uploaded: {v.uploaded}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {verifBadge(v.verification as DocVerifState)}
                      <button type="button" className="text-xs text-[#6DAE7C] hover:underline font-semibold">
                        View version
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Validity card */}
          <section className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <h2 className="text-sm font-bold text-[#355E3B] mb-3 border-b border-slate-200 pb-2">Validity & Term</h2>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Status</span>
                {validityBadge(doc.validity)}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Issue Date</span>
                <span className="text-slate-800 font-semibold">{doc.issueDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Expiry Date</span>
                <span className="text-slate-800 font-semibold">{doc.expiryDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Issuing Source</span>
                <span className="text-slate-800 font-semibold">{doc.source}</span>
              </div>
            </div>
          </section>

          {/* Assistant callout */}
          <div className="bg-[#355E3B] text-white rounded-xl p-4 shadow-xs">
            <p className="text-xs font-bold mb-1">Need help with this document?</p>
            <p className="text-[11px] text-slate-300 mb-3 leading-relaxed">
              Ask about required formats, issuing departments, or regulatory conditions.
            </p>
            <button
              type="button"
              onClick={openDocumentAssistant}
              className="w-full text-xs font-bold bg-[#3d7a4d] hover:bg-[#2d5132] text-white py-2 rounded-lg border border-[#3A75A4] transition-colors"
            >
              Ask Regulatory Assistant →
            </button>
          </div>
        </div>
      </div>

      {/* ── Certificate Preview Modal ── */}
      {showCertModal && (
        <CertificatePreviewModal
          doc={doc}
          businessName={project.name}
          businessLocation={project.location}
          projectId={project.id}
          onClose={() => setShowCertModal(false)}
        />
      )}
    </main>
  );
}
