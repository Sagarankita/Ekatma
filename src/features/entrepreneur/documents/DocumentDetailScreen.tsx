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
      <main className="flex-1 bg-[#f8f9fb] flex items-center justify-center min-h-[60vh]">
        <div className="text-center py-16">
          <p className="text-[#6b7a8d] text-sm">Document not found.</p>
          <Link
            href={ENTREPRENEUR_ROUTES.documents(project.id)}
            className="mt-3 inline-block text-sm text-[#1a56db] hover:underline"
          >
            ← Back to Document Centre
          </Link>
        </div>
      </main>
    );
  }
  const openDocumentAssistant = () => openAssistant({
    origin: 'inline', mode: 'entity',
    context: inlineContext(pageContext, { pageType: 'document-detail', pageTitle: 'Document Detail', label: doc.name, entities: { businessId: project.id, documentId: doc.id }, recordTitle: doc.name }),
  });

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      {/* Header */}
      <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
        <div className="max-w-[1100px] mx-auto">
          <nav className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href={ENTREPRENEUR_ROUTES.businesses()} className="hover:text-[#1a3a5c] hover:underline">
              My Businesses
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#1a3a5c] hover:underline">
              {project.name}
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.documents(project.id)} className="hover:text-[#1a3a5c] hover:underline">
              Document Centre
            </Link>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">{doc.id}</span>
          </nav>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-[#6b7a8d] bg-[#f1f5f9] border border-[#e2e8f0] px-2 py-0.5 rounded">
                  {doc.id}
                </span>
                <span className="text-xs text-[#6b7a8d]">{doc.category}</span>
                {doc.version > 0 && <span className="text-xs text-[#94a3b8]">v{doc.version}</span>}
              </div>
              <h1 className="text-xl font-bold text-[#1a3a5c]">{doc.name}</h1>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href={ENTREPRENEUR_ROUTES.documents(project.id)}
                className="text-sm border border-[#d1d9e0] rounded px-3 py-1.5 text-[#475569] hover:bg-[#f1f5f9]"
              >
                ← Back to Documents
              </Link>
              {doc.availability === 'Available' || doc.availability === 'Uploaded' ? (
                <button
                  type="button"
                  className="text-sm bg-[#1a3a5c] text-white rounded px-3 py-1.5 hover:bg-[#0f2540]"
                >
                  View Document
                </button>
              ) : (
                <button
                  type="button"
                  className="text-sm bg-[#1a56db] text-white rounded px-3 py-1.5 hover:bg-[#1e40af]"
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

      <div className="max-w-[1100px] mx-auto px-6 py-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left / Main column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Document Information */}
          <section className="bg-white border border-[#e2e8f0] rounded p-4 shadow-sm">
            <h2 className="text-sm font-bold text-[#1a3a5c] mb-3 border-b border-[#e8edf2] pb-2">Document Information</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider mb-1">What is it?</p>
                <p className="text-[#334155] leading-relaxed">{doc.description}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider mb-1">Why is it required?</p>
                <p className="text-[#334155] leading-relaxed">{doc.whyRequired}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider mb-1">What should it contain?</p>
                <p className="text-[#334155] leading-relaxed">{doc.whatItContains}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider mb-1">Where is it obtained?</p>
                <p className="text-[#334155] leading-relaxed">{doc.whereObtained}</p>
              </div>
            </div>
          </section>

          {/* Regulatory source */}
          <section className="bg-white border border-[#e2e8f0] rounded p-4 shadow-sm">
            <h2 className="text-sm font-bold text-[#1a3a5c] mb-3 border-b border-[#e8edf2] pb-2">Regulatory Source</h2>
            {doc.grRule ? (
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider mb-1">Rule / Act</p>
                  <p className="text-[#334155]">{doc.grRule}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider mb-1">Clause / Section</p>
                  <p className="text-[#334155]">{doc.grClause}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider mb-1">Effective Date</p>
                  <p className="text-[#334155]">{doc.grEffective}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider mb-1">Verified</p>
                  <p className="text-[#15803d] font-semibold">Verified</p>
                </div>
              </div>
            ) : (
              <div className="bg-[#fef9c3] border border-[#fde68a] rounded p-3 text-sm text-[#92400e]">
                <span className="font-semibold">Needs Verification</span> — The specific regulatory reference for this
                document has not been independently confirmed. Do not rely on an unverified source for legal compliance
                purposes.
              </div>
            )}
          </section>

          {/* Conditional requirement */}
          {doc.requirement === 'Conditional' && doc.triggeringCondition && (
            <section className="bg-[#fef9c3] border border-[#fde68a] rounded p-4 text-sm shadow-sm">
              <p className="font-semibold text-[#92400e] mb-1">Conditional Requirement</p>
              <p className="text-[#78350f]">This document is required only when the following condition applies:</p>
              <p className="mt-1.5 text-[#78350f] font-medium">{doc.triggeringCondition}</p>
            </section>
          )}

          {/* Dependency / Generated */}
          {doc.dependency === 'Generated by prerequisite approval' && (
            <section className="bg-[#ede9fe] border border-[#c4b5fd] rounded p-4 text-sm shadow-sm">
              <p className="font-semibold text-[#6d28d9] mb-1">Generated by Prerequisite Approval</p>
              <p className="text-[#5b21b6]">
                This document will be automatically added to this repository once the prerequisite approval or decision is
                received from the relevant department.
              </p>
              <div className="flex gap-2 mt-3">
                <Link
                  href={ENTREPRENEUR_ROUTES.journey(project.id)}
                  className="text-xs bg-[#6d28d9] text-white px-3 py-1.5 rounded hover:bg-[#5b21b6]"
                >
                  View Regulatory Journey
                </Link>
                <Link
                  href={ENTREPRENEUR_ROUTES.dependencies(project.id)}
                  className="text-xs border border-[#c4b5fd] text-[#6d28d9] px-3 py-1.5 rounded hover:bg-white"
                >
                  View Dependency Graph
                </Link>
              </div>
            </section>
          )}

          {doc.dependency === 'Inspection-stage only' && (
            <section className="bg-[#f3e8ff] border border-[#d8b4fe] rounded p-4 text-sm shadow-sm">
              <p className="font-semibold text-[#7e22ce] mb-1">Inspection-stage Only</p>
              <p className="text-[#6b21a8]">
                This document is applicable only at the inspection stage. It is not required to be uploaded during the
                initial application phase.
              </p>
            </section>
          )}

          {/* Service usage table */}
          <section className="bg-white border border-[#e2e8f0] rounded p-4 shadow-sm">
            <h2 className="text-sm font-bold text-[#1a3a5c] mb-3 border-b border-[#e8edf2] pb-2">Used By</h2>
            {doc.usedBy.length === 0 ? (
              <p className="text-sm text-[#94a3b8]">This document is not currently linked to any active service.</p>
            ) : (
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-[#f8f9fb] border-b border-[#e2e8f0]">
                    {['Department', 'Service', 'Requirement'].map(h => (
                      <th
                        key={h}
                        className="text-left px-3 py-2 font-semibold text-[#64748b] uppercase tracking-wider text-[10px]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {doc.usedBy.map((u, i) => {
                    const reqId = u.dept === 'MPCB' && u.service.includes('Consent to Establish') ? 'EST-001' : null;
                    return (
                      <tr key={i} className="border-b border-[#f1f5f9]">
                        <td className="px-3 py-2 font-medium text-[#1a3a5c]">{u.dept}</td>
                        <td className="px-3 py-2 text-[#334155]">
                          {reqId ? (
                            <Link
                              href={ENTREPRENEUR_ROUTES.requirement(project.id, reqId)}
                              className="hover:underline text-[#1a56db]"
                            >
                              {u.service}
                            </Link>
                          ) : (
                            <span>{u.service}</span>
                          )}
                        </td>
                        <td className="px-3 py-2">{reqBadge(u.requirement as DocReqState)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </section>

          {/* Version history */}
          <section className="bg-white border border-[#e2e8f0] rounded p-4 shadow-sm">
            <h2 className="text-sm font-bold text-[#1a3a5c] mb-3 border-b border-[#e8edf2] pb-2">Version History</h2>
            {doc.versionHistory.length === 0 ? (
              <p className="text-sm text-[#94a3b8]">No versions uploaded yet.</p>
            ) : (
              <div className="space-y-2">
                {doc.versionHistory.map((v, i) => (
                  <div
                    key={v.version}
                    className={`flex items-center justify-between p-2.5 rounded border ${i === 0 ? 'bg-[#f0f9ff] border-[#bae6fd]' : 'bg-[#f8f9fb] border-[#e2e8f0]'}`}
                  >
                    <div className="text-sm">
                      <span className="font-semibold text-[#1a3a5c]">Version {v.version}</span>
                      {i === 0 && (
                        <span className="ml-2 text-[10px] bg-[#dbeafe] text-[#1d4ed8] border border-[#93c5fd] px-1.5 py-0.5 rounded font-semibold">
                          Current
                        </span>
                      )}
                      <span className="ml-3 text-xs text-[#6b7a8d]">Uploaded: {v.uploaded}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {verifBadge(v.verification as DocVerifState)}
                      <button type="button" className="text-xs text-[#1a56db] hover:underline">
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
          <section className="bg-white border border-[#e2e8f0] rounded p-4 shadow-sm">
            <h2 className="text-sm font-bold text-[#1a3a5c] mb-3 border-b border-[#e8edf2] pb-2">Validity</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-[#6b7a8d]">Status</span>
                {validityBadge(doc.validity)}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6b7a8d]">Issue Date</span>
                <span className="text-[#334155] font-medium">{doc.issueDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6b7a8d]">Expiry</span>
                <span className="text-[#334155] font-medium">{doc.expiryDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6b7a8d]">Verification</span>
                {verifBadge(doc.verification)}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6b7a8d]">Reuse</span>
                {reuseBadge(doc.reuse)}
              </div>
            </div>
            {doc.reuse === 'Reusable' && (
              <p className="mt-3 text-xs text-[#475569] bg-[#f1f5f9] rounded p-2 leading-relaxed">
                This document can be reused for applicable services while it remains valid and meets the service-specific
                requirements.
              </p>
            )}
          </section>

          {/* Regulatory Assistant */}
          <section className="bg-white border border-[#e2e8f0] rounded p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-full bg-[#1a3a5c] text-white flex items-center justify-center text-xs font-bold">
                ?
              </div>
              <h2 className="text-sm font-bold text-[#1a3a5c]">Regulatory Assistant</h2>
            </div>
            <p className="text-xs text-[#6b7a8d] mb-3">Why is this required? What should it contain? Which GR applies?</p>
            <button
              type="button"
              onClick={openDocumentAssistant}
              className="w-full text-sm bg-[#1a3a5c] text-white rounded px-3 py-2 hover:bg-[#0f2540] text-center transition-colors"
            >
              Ask Regulatory Assistant
            </button>
          </section>

          {/* Navigate */}
          <section className="bg-white border border-[#e2e8f0] rounded p-4 shadow-sm">
            <h2 className="text-sm font-bold text-[#1a3a5c] mb-3 border-b border-[#e8edf2] pb-2">Navigate</h2>
            <div className="flex flex-col gap-2">
              <Link
                href={ENTREPRENEUR_ROUTES.journey(project.id)}
                className="text-sm text-left border border-[#e2e8f0] rounded px-3 py-2 text-[#334155] hover:bg-[#f1f5f9] hover:border-[#1a56db]"
              >
                → Regulatory Journey (E09)
              </Link>
              <Link
                href={ENTREPRENEUR_ROUTES.dependencies(project.id)}
                className="text-sm text-left border border-[#e2e8f0] rounded px-3 py-2 text-[#334155] hover:bg-[#f1f5f9] hover:border-[#1a56db]"
              >
                → Dependency Graph (E13)
              </Link>
              <Link
                href={ENTREPRENEUR_ROUTES.requirement(project.id, 'EST-001')}
                className="text-sm text-left border border-[#e2e8f0] rounded px-3 py-2 text-[#334155] hover:bg-[#f1f5f9] hover:border-[#1a56db]"
              >
                → Requirement Detail (E10)
              </Link>
            </div>
          </section>
        </div>
      </div>

      {/* ── Regulatory Help Drawer ── */}
      {ragOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Regulatory Help">
          <div className="absolute inset-0 bg-black/30" onClick={() => setRagOpen(false)} />
          <div className="relative bg-white w-96 max-w-full h-full shadow-2xl flex flex-col border-l border-[#d1d9e0]">
            {/* Drawer header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#e8edf2] bg-[#1a2533]">
              <div className="w-7 h-7 rounded-full bg-[#1a56db] flex items-center justify-center text-white text-xs font-bold">
                ?
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white">Regulatory Help</p>
                <p className="text-[10px] text-[#9aa5b4] truncate">About {doc.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setRagOpen(false)}
                className="text-[#9aa5b4] hover:text-white text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {/* Boundary notice */}
            <div className="px-4 py-2.5 bg-[#fffbeb] border-b border-[#fde68a]">
              <p className="text-[10px] text-[#92400e] font-medium">
                This assistant retrieves and explains regulatory information. It does not grant approval or make statutory
                decisions.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {ragMessages.length === 0 ? (
                <>
                  <p className="text-xs font-semibold text-[#9aa5b4] uppercase tracking-wider">Suggested questions</p>
                  <div className="space-y-2">
                    {SUGGESTED_PROMPTS.map(q => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => handleRagSend(q)}
                        className="w-full text-left text-xs px-3 py-2.5 border border-[#d1d9e0] rounded hover:bg-[#f0f4f8] text-[#374151] transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  {ragMessages.map((m, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded text-xs ${
                        m.role === 'user'
                          ? 'bg-[#f8f9fb] border border-[#e8edf2] text-[#1a3a5c]'
                          : 'bg-white border border-[#d1d9e0] text-[#374151]'
                      }`}
                    >
                      <p className="text-[10px] font-bold text-[#9aa5b4] uppercase tracking-wider mb-1">
                        {m.role === 'user' ? 'Your Question' : 'Assistant Response'}
                      </p>
                      <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setRagMessages([])}
                    className="text-xs text-[#1a56db] hover:underline"
                  >
                    ← Clear conversation
                  </button>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-[#e8edf2]">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleRagSend(ragInput);
                }}
                className="flex gap-2"
              >
                <input
                  className="flex-1 text-sm border border-[#d1d9e0] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
                  placeholder="Ask about this document…"
                  value={ragInput}
                  onChange={e => setRagInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#1a3a5c] text-white text-sm rounded hover:bg-[#0f2540]"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
