'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import {
  type AppSection,
  type SectionState,
  APP_SECTIONS,
} from './data';

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export function ApplicationWorkspaceScreen({
  project,
  reqId = 'EST-001',
}: {
  project: BusinessProject;
  reqId?: string;
}) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<AppSection>('common');
  const [ragOpen, setRagOpen] = useState(false);
  const [ragInput, setRagInput] = useState('');
  const [ragMessages, setRagMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);

  // Minimal form state for demo fields
  const [commonDone, setCommonDone] = useState(false);
  const [serviceAnswers, setServiceAnswers] = useState<Record<string, string>>({});
  const [formAnnexDone, setFormAnnexDone] = useState(false);
  const [docsDone, setDocsDone] = useState(false);
  const [declarations, setDeclarations] = useState<Record<string, boolean>>({
    'dec-accuracy': false,
    'dec-comply': false,
    'dec-authorised': false,
  });
  const allDeclared = Object.values(declarations).every(Boolean);

  const sectionStates: Record<AppSection, SectionState> = {
    common: { status: commonDone ? 'complete' : activeSection === 'common' ? 'active' : 'pending' },
    service: { status: !commonDone ? 'locked' : activeSection === 'service' ? 'active' : Object.keys(serviceAnswers).length >= 3 ? 'complete' : 'pending' },
    forms: { status: !commonDone ? 'locked' : activeSection === 'forms' ? 'active' : formAnnexDone ? 'complete' : 'pending' },
    documents: { status: activeSection === 'documents' ? 'active' : docsDone ? 'complete' : 'attention' },
    declarations: { status: !commonDone ? 'locked' : activeSection === 'declarations' ? 'active' : allDeclared ? 'complete' : 'pending' },
    review: { status: activeSection === 'review' ? 'active' : 'pending' },
  };

  function sectionBadge(s: SectionState) {
    const map: Record<string, string> = {
      complete: 'bg-[#dcfce7] text-[#166534] border-[#86efac]',
      active: 'bg-[#dbeafe] text-[#1e40af] border-[#93c5fd]',
      attention: 'bg-[#fef3c7] text-[#92400e] border-[#fcd34d]',
      pending: 'bg-[#f1f5f9] text-[#94a3b8] border-[#e2e8f0]',
      locked: 'bg-[#f8f9fb] text-[#cbd5e1] border-[#e2e8f0]',
    };
    const label: Record<string, string> = {
      complete: '✓ Complete',
      active: 'Active',
      attention: '⚠ Attention',
      pending: 'Pending',
      locked: 'Locked',
    };
    return (
      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${map[s.status]}`}>
        {label[s.status]}
      </span>
    );
  }

  function handleNav(dir: 'prev' | 'next') {
    const idx = APP_SECTIONS.findIndex(s => s.id === activeSection);
    if (dir === 'next' && idx < APP_SECTIONS.length - 1) setActiveSection(APP_SECTIONS[idx + 1].id);
    if (dir === 'prev' && idx > 0) setActiveSection(APP_SECTIONS[idx - 1].id);
  }

  function handleRagSend(text: string) {
    if (!text.trim()) return;
    const answers: Record<string, string> = {
      'What does this field mean?': 'This field captures information from your Project Dossier that is required for this application. The value is pre-filled from your verified project record.',
      'Why is this information required?': 'The department uses this information to assess the regulatory requirements applicable to your specific project and location.',
      'Why is this document required?': 'This document provides the regulatory authority with the evidence required to assess your application in accordance with the applicable rules.',
      'What should this document contain?': 'Refer to the Document Detail page (E12) for specific content requirements. You can navigate there using the document help link.',
      'Which requirement does this section relate to?': 'This section relates to the MPCB Consent to Establish requirement under Rule 5 of the Maharashtra Prevention and Control of Pollution Rules.',
    };
    const reply = answers[text] ?? 'Please refer to the regulatory source or contact the relevant department for a precise answer on this specific query.';
    setRagMessages(prev => [...prev, { role: 'user', text }, { role: 'assistant', text: reply }]);
    setRagInput('');
  }

  function renderCommon() {
    const fields = [
      { label: 'Legal Entity', value: project.name || 'Sahyadri Bio-Pharma Pvt Ltd', verified: true },
      { label: 'PAN', value: 'AABCS1234F', verified: true },
      { label: 'CIN', value: 'U24230MH2024PTC123456', verified: true },
      { label: 'Project / Unit Name', value: `${project.name} — Unit I`, verified: false },
      { label: 'District', value: project.location.split(',')[0] || 'Pune', verified: true },
      { label: 'Taluka', value: 'Khed', verified: true },
      { label: 'MIDC Estate', value: 'Chakan Industrial Area Phase II', verified: true },
      { label: 'Plot Number', value: 'Plot No. C-14/2', verified: true },
      { label: 'Total Investment (₹)', value: '₹45,00,00,000', verified: false },
      { label: 'Workforce (Proposed)', value: '180', verified: false },
    ];
    return (
      <div className="space-y-4">
        <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded p-3 text-xs text-[#0369a1]">
          <span className="font-semibold">Pre-filled from your Project Dossier.</span> Verified values are carried from your master project record. Review and confirm before proceeding.
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {fields.map(f => (
            <div key={f.label} className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider flex items-center gap-1.5">
                {f.label}
                {f.verified && <span className="text-[#15803d] font-semibold normal-case tracking-normal">✓ Verified</span>}
              </label>
              <input
                defaultValue={f.value}
                readOnly={f.verified}
                className={`text-sm border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a56db] ${f.verified ? 'bg-[#f8f9fb] border-[#e2e8f0] text-[#475569]' : 'border-[#d1d9e0] bg-white text-[#1a3a5c]'}`}
              />
              {f.verified && <p className="text-[10px] text-[#94a3b8]">Source: Master Project Dossier · System-verified</p>}
            </div>
          ))}
        </div>
        <div className="pt-2 flex gap-2">
          <button
            onClick={() => setCommonDone(true)}
            className="bg-[#1a3a5c] text-white text-sm px-4 py-2 rounded hover:bg-[#0f2540]"
          >
            Confirm & Continue
          </button>
          <button
            type="button"
            className="text-sm border border-[#d1d9e0] text-[#475569] px-4 py-2 rounded hover:bg-[#f1f5f9]"
          >
            Save Draft
          </button>
        </div>
      </div>
    );
  }

  function renderService() {
    const questions = [
      { id: 'q1', label: 'Does the project generate industrial effluent / wastewater?', type: 'radio', options: ['Yes', 'No'] },
      { id: 'q2', label: 'Does the project generate air emissions?', type: 'radio', options: ['Yes', 'No'] },
      { id: 'q3', label: 'Does the project handle or store hazardous waste?', type: 'radio', options: ['Yes', 'No'] },
      { id: 'q4', label: 'Capital investment in plant & machinery (₹)', type: 'text', placeholder: 'Enter amount' },
      { id: 'q5', label: 'Describe the primary manufacturing process', type: 'textarea', placeholder: 'Brief description of key process steps…' },
      { id: 'q6', label: 'Does the project have a Zero Liquid Discharge (ZLD) system?', type: 'radio', options: ['Yes', 'No', 'Not Applicable'] },
    ];
    return (
      <div className="space-y-4">
        <div className="bg-[#fef9c3] border border-[#fde68a] rounded p-3 text-xs text-[#92400e]">
          <span className="font-semibold">MPCB — Consent to Establish</span> · Service-specific questions. Only applicable questions are shown based on your project DNA.
        </div>
        {questions.map(q => (
          <div key={q.id} className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#1a3a5c]">{q.label} <span className="text-[#b91c1c]">*</span></label>
            {q.type === 'radio' && (
              <div className="flex gap-4">
                {q.options!.map(o => (
                  <label key={o} className="flex items-center gap-1.5 text-sm text-[#334155] cursor-pointer">
                    <input
                      type="radio"
                      name={q.id}
                      value={o}
                      checked={serviceAnswers[q.id] === o}
                      onChange={() => setServiceAnswers(prev => ({ ...prev, [q.id]: o }))}
                      className="accent-[#1a3a5c]"
                    />
                    {o}
                  </label>
                ))}
              </div>
            )}
            {q.type === 'text' && (
              <input
                className="text-sm border border-[#d1d9e0] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
                placeholder={q.placeholder}
                value={serviceAnswers[q.id] || ''}
                onChange={e => setServiceAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
              />
            )}
            {q.type === 'textarea' && (
              <textarea
                rows={3}
                className="text-sm border border-[#d1d9e0] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a56db] resize-none"
                placeholder={q.placeholder}
                value={serviceAnswers[q.id] || ''}
                onChange={e => setServiceAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
              />
            )}
          </div>
        ))}
      </div>
    );
  }

  function renderForms() {
    const forms = [
      { name: 'CTE Application Form (Form I)', status: 'Required', dep: null, state: 'Pending' },
      { name: 'Environmental Statement', status: 'Required', dep: null, state: 'Pending' },
      { name: 'Hazardous Waste Annexure', status: 'Conditional', dep: 'Required if project handles hazardous waste', state: 'Pending' },
      { name: 'ZLD Declaration', status: 'Conditional', dep: 'Required when ZLD system is indicated', state: 'Pending' },
    ];
    return (
      <div className="space-y-3">
        <div className="bg-[#f1f5f9] border border-[#e2e8f0] rounded p-3 text-xs text-[#475569]">
          <span className="font-semibold">Form Dependency:</span> Main Form → Annexure → Declaration. You must complete Form I before the Annexure becomes available.
        </div>
        {forms.map((f, i) => (
          <div key={i} className={`border rounded p-3 flex items-start justify-between gap-3 ${f.status === 'Conditional' ? 'border-[#fde68a] bg-[#fef9c3]/50' : 'border-[#e2e8f0] bg-white'}`}>
            <div>
              <p className="text-sm font-medium text-[#1a3a5c]">{f.name}</p>
              {f.dep && <p className="text-xs text-[#d97706] mt-0.5">{f.dep}</p>}
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${f.status === 'Required' ? 'bg-[#fee2e2] text-[#b91c1c] border-[#fca5a5]' : 'bg-[#fef3c7] text-[#92400e] border-[#fcd34d]'}`}>
                {f.status}
              </span>
              <button
                type="button"
                onClick={() => setFormAnnexDone(true)}
                className="text-xs bg-[#1a3a5c] text-white px-2.5 py-1 rounded hover:bg-[#0f2540]"
              >
                Fill Form
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={() => setFormAnnexDone(true)}
          className="text-sm bg-[#1a3a5c] text-white px-4 py-2 rounded hover:bg-[#0f2540]"
        >
          Mark Forms Complete
        </button>
      </div>
    );
  }

  function renderDocuments() {
    const docs = [
      { id: 'DOC-001', name: 'Project Environmental Report / DPR', req: 'Required', avail: 'Available', verif: 'Needs Verification', reuse: 'Service-specific', dep: null },
      { id: 'DOC-002', name: 'Land Possession / MIDC Lease Agreement', req: 'Required', avail: 'Available', verif: 'User-confirmed', reuse: 'Reusable', dep: null },
      { id: 'DOC-003', name: 'MPCB Consent to Establish Certificate', req: 'Conditional', avail: 'Available', verif: 'Government-issued', reuse: 'Reusable', dep: 'Generated — CTE approved 10 Oct 2026' },
      { id: 'DOC-004', name: 'Building Layout / Architectural Plan', req: 'Required', avail: 'Missing', verif: '—', reuse: 'Service-specific', dep: null },
      { id: 'DOC-006', name: 'ETP Design Details', req: 'Required', avail: 'Uploaded', verif: 'Needs Verification', reuse: 'Service-specific', dep: null },
    ];
    return (
      <div className="space-y-3">
        <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded p-3 text-xs text-[#0369a1]">
          <span className="font-semibold">Upload Once → Reuse Where Applicable.</span> Documents already in your Document Centre are shown below. Select an existing document rather than uploading a duplicate.
        </div>
        {docs.map(d => (
          <div key={d.id} className={`border rounded p-3 ${d.dep ? 'border-[#c4b5fd] bg-[#f5f3ff]' : d.avail === 'Missing' ? 'border-[#fca5a5] bg-[#fff1f2]' : 'border-[#e2e8f0] bg-white'}`}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-[#1a3a5c]">{d.name}</p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${d.req === 'Required' ? 'bg-[#fee2e2] text-[#b91c1c] border-[#fca5a5]' : 'bg-[#fef3c7] text-[#92400e] border-[#fcd34d]'}`}>{d.req}</span>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${d.avail === 'Available' ? 'bg-[#dcfce7] text-[#15803d] border-[#86efac]' : d.avail === 'Uploaded' ? 'bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]' : 'bg-[#f1f5f9] text-[#94a3b8] border-[#cbd5e1]'}`}>{d.avail}</span>
                  {d.verif !== '—' && <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${d.verif === 'Needs Verification' ? 'bg-[#fef3c7] text-[#92400e] border-[#fcd34d]' : 'bg-[#ede9fe] text-[#6d28d9] border-[#c4b5fd]'}`}>{d.verif}</span>}
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${d.reuse === 'Reusable' ? 'bg-[#ede9fe] text-[#6d28d9] border-[#c4b5fd]' : 'bg-[#f1f5f9] text-[#475569] border-[#e2e8f0]'}`}>{d.reuse}</span>
                </div>
                {d.dep && <p className="text-xs text-[#6d28d9] mt-1.5 font-medium">{d.dep}</p>}
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                {d.avail !== 'Missing' ? (
                  <Link
                    href={ENTREPRENEUR_ROUTES.document(project.id, d.id)}
                    className="text-xs bg-[#1a3a5c] text-white px-2.5 py-1 rounded hover:bg-[#0f2540]"
                  >
                    Use from Centre
                  </Link>
                ) : d.dep ? (
                  <Link
                    href={ENTREPRENEUR_ROUTES.dependencies(project.id)}
                    className="text-xs border border-[#c4b5fd] text-[#6d28d9] px-2.5 py-1 rounded hover:bg-[#ede9fe]"
                  >
                    View Dependency
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => setDocsDone(true)}
                    className="text-xs bg-[#1a56db] text-white px-2.5 py-1 rounded hover:bg-[#1e40af]"
                  >
                    Upload
                  </button>
                )}
                <Link
                  href={ENTREPRENEUR_ROUTES.document(project.id, d.id)}
                  className="text-[10px] text-[#6d28d9] hover:underline"
                >
                  Help
                </Link>
              </div>
            </div>
          </div>
        ))}
        <Link
          href={ENTREPRENEUR_ROUTES.documents(project.id)}
          className="inline-block text-sm border border-[#1a56db] text-[#1a56db] px-3 py-1.5 rounded hover:bg-[#ebf3ff]"
        >
          Open Document Centre (E11)
        </Link>
      </div>
    );
  }

  function renderDeclarations() {
    const decls = [
      { id: 'dec-accuracy', text: 'I declare that all information provided in this application is true, correct, and complete to the best of my knowledge and belief.' },
      { id: 'dec-comply', text: 'I undertake to comply with the conditions of consent, if granted, and with all applicable statutory requirements.' },
      { id: 'dec-authorised', text: 'I confirm that I am the authorised signatory for the applicant entity and am authorised to submit this application.' },
    ];
    return (
      <div className="space-y-4">
        <div className="bg-[#f1f5f9] border border-[#e2e8f0] rounded p-3 text-xs text-[#475569]">
          Declarations are separate from document uploads. Please read each declaration carefully before confirming.
        </div>
        {decls.map(d => (
          <label key={d.id} className={`flex items-start gap-3 p-3 rounded border cursor-pointer transition-colors ${declarations[d.id] ? 'border-[#86efac] bg-[#f0fdf4]' : 'border-[#e2e8f0] bg-white hover:bg-[#f8f9fb]'}`}>
            <input
              type="checkbox"
              checked={declarations[d.id]}
              onChange={e => setDeclarations(prev => ({ ...prev, [d.id]: e.target.checked }))}
              className="mt-0.5 accent-[#1a3a5c]"
            />
            <span className="text-sm text-[#334155] leading-relaxed">{d.text}</span>
          </label>
        ))}
        {allDeclared && <div className="text-sm text-[#15803d] font-semibold bg-[#f0fdf4] border border-[#86efac] rounded p-3">All declarations confirmed.</div>}
      </div>
    );
  }

  function renderReview() {
    const missing: string[] = [];
    if (!commonDone) missing.push('Common Information not confirmed');
    if (!formAnnexDone) missing.push('Forms & Annexures not marked complete');
    if (!allDeclared) missing.push('One or more declarations pending');

    return (
      <div className="space-y-4">
        <div className={`rounded p-3 border text-sm ${missing.length === 0 ? 'bg-[#f0fdf4] border-[#86efac] text-[#15803d]' : 'bg-[#fef3c7] border-[#fcd34d] text-[#92400e]'}`}>
          {missing.length === 0 ? '✓ Application ready for pre-validation.' : `⚠ ${missing.length} item(s) require attention before submission.`}
        </div>
        {missing.length > 0 && (
          <ul className="space-y-1.5 text-sm text-[#b91c1c]">
            {missing.map((m, i) => (
              <li key={i} className="flex items-start gap-2">
                <span>•</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="space-y-3 text-sm">
          {[
            { label: 'Department / Service', value: 'MPCB — Consent to Establish' },
            { label: 'Legal Entity', value: project.name || 'Sahyadri Bio-Pharma Pvt Ltd' },
            { label: 'Project Location', value: `${project.location}, Plot C-14/2` },
            { label: 'Application Type', value: 'Fresh Application' },
            { label: 'Common Information', value: commonDone ? '✓ Complete' : '○ Pending' },
            { label: 'Service Questions', value: Object.keys(serviceAnswers).length >= 3 ? '✓ Complete' : '○ Pending' },
            { label: 'Forms & Annexures', value: formAnnexDone ? '✓ Complete' : '○ Pending' },
            { label: 'Documents', value: '3 of 5 available — 2 missing' },
            { label: 'Declarations', value: allDeclared ? '✓ All confirmed' : `${Object.values(declarations).filter(Boolean).length}/3 confirmed` },
          ].map(r => (
            <div key={r.label} className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
              <span className="text-[#6b7a8d]">{r.label}</span>
              <span className={`font-medium ${r.value.startsWith('✓') ? 'text-[#15803d]' : r.value.startsWith('○') ? 'text-[#94a3b8]' : 'text-[#1a3a5c]'}`}>
                {r.value}
              </span>
            </div>
          ))}
        </div>
        {missing.length === 0 ? (
          <Link
            href={ENTREPRENEUR_ROUTES.applicationPrevalidation(project.id)}
            className="inline-block text-sm font-medium px-4 py-1.5 bg-[#1a3a5c] text-white hover:bg-[#0f2540] rounded"
          >
            Continue to Pre-Validation (E15)
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="text-sm font-medium px-4 py-1.5 bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed rounded"
          >
            {missing.length} item{missing.length > 1 ? 's' : ''} must be resolved
          </button>
        )}
      </div>
    );
  }

  const sectionContent: Record<AppSection, React.ReactNode> = {
    common: renderCommon(),
    service: renderService(),
    forms: renderForms(),
    documents: renderDocuments(),
    declarations: renderDeclarations(),
    review: renderReview(),
  };

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      {/* Header */}
      <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
        <div className="max-w-[1280px] mx-auto">
          <nav className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5">
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#1a3a5c] hover:underline">Dashboard</Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.applications(project.id)} className="hover:text-[#1a3a5c] hover:underline">Applications</Link>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">Application Workspace</span>
          </nav>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-[#1a3a5c]">Application Workspace</h1>
              <p className="text-sm font-semibold text-[#334155] mt-0.5">MPCB — Consent to Establish (CTE)</p>
              <p className="text-xs text-[#6b7a8d] mt-0.5">{project.name} · {project.location} · Fresh Application</p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={ENTREPRENEUR_ROUTES.applicationPrevalidation(project.id)}
                className="text-sm bg-[#1a3a5c] text-white px-3 py-1.5 rounded hover:bg-[#0f2540] focus:ring-2 focus:ring-[#1a56db]"
              >
                Run Pre-validation (E15) →
              </Link>
              <button
                type="button"
                className="text-sm border border-[#d1d9e0] text-[#475569] px-3 py-1.5 rounded hover:bg-[#f1f5f9] focus:ring-2 focus:ring-[#1a56db]"
              >
                Save Draft
              </button>
              <Link
                href={ENTREPRENEUR_ROUTES.business(project.id)}
                className="text-sm border border-[#d1d9e0] text-[#475569] px-3 py-1.5 rounded hover:bg-[#f1f5f9] focus:ring-2 focus:ring-[#1a56db]"
              >
                Exit
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-5 flex gap-5">
        {/* LEFT — Section navigator */}
        <div className="w-44 shrink-0 hidden lg:block">
          <nav className="sticky top-4">
            <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider mb-2 px-1">Application Sections</p>
            <div className="border border-[#e2e8f0] bg-white divide-y divide-[#f1f5f9]">
              {APP_SECTIONS.map((s, idx) => {
                const st = sectionStates[s.id];
                const isActive = activeSection === s.id;
                const isLocked = st.status === 'locked';
                return (
                  <button
                    key={s.id}
                    onClick={() => !isLocked && setActiveSection(s.id)}
                    disabled={isLocked}
                    className={`w-full text-left px-3 py-2.5 flex items-start justify-between gap-2 transition-colors
                      ${isActive ? 'bg-[#f0f4f8] border-l-2 border-l-[#1a3a5c]' : isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#f8f9fb] cursor-pointer'}`}
                  >
                    <span className="text-xs text-[#1a3a5c] leading-tight">
                      <span className="text-[10px] text-[#94a3b8] mr-1">{idx + 1}.</span>
                      {s.label}
                    </span>
                    {sectionBadge(st)}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* CENTER — Form content */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Mobile section selector */}
          <select
            className="lg:hidden w-full text-sm border border-[#d1d9e0] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a56db] bg-white"
            value={activeSection}
            onChange={e => setActiveSection(e.target.value as AppSection)}
          >
            {APP_SECTIONS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>

          {/* Section content */}
          <div className="bg-white border border-[#e2e8f0]">
            <div className="px-5 py-3 border-b border-[#e8edf2] flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#1a3a5c]">
                {APP_SECTIONS.find(s => s.id === activeSection)?.label}
              </h2>
              {sectionBadge(sectionStates[activeSection])}
            </div>
            <div className="px-5 py-4">
              {sectionContent[activeSection]}
            </div>
          </div>

          {/* Navigation controls */}
          <div className="bg-white border border-[#e2e8f0] px-5 py-3 flex items-center justify-between">
            <button
              onClick={() => handleNav('prev')}
              disabled={activeSection === 'common'}
              className="text-sm text-[#475569] px-3 py-1.5 border border-[#d1d9e0] rounded hover:bg-[#f1f5f9] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="text-sm text-[#475569] px-3 py-1.5 border border-[#d1d9e0] rounded hover:bg-[#f1f5f9]"
              >
                Save Draft
              </button>
              <button
                onClick={() => setActiveSection('review')}
                className="text-sm text-[#1a56db] border border-[#1a56db] px-3 py-1.5 rounded hover:bg-[#ebf3ff]"
              >
                Review Application
              </button>
              <button
                onClick={() => handleNav('next')}
                disabled={activeSection === 'review'}
                className="text-sm bg-[#1a3a5c] text-white px-4 py-1.5 rounded hover:bg-[#0f2540] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT — Contextual panels */}
        <div className="w-56 shrink-0 hidden xl:flex flex-col gap-4">
          {/* Document requirements */}
          <div className="bg-white border border-[#e2e8f0]">
            <div className="px-3 py-2.5 border-b border-[#e8edf2]">
              <p className="text-xs font-bold text-[#1a3a5c]">Document Requirements</p>
            </div>
            <div className="px-3 py-2.5 space-y-1.5 text-xs">
              {[
                { name: 'Project DPR', status: 'Available', color: 'text-[#15803d]' },
                { name: 'MIDC Lease', status: 'Available', color: 'text-[#15803d]' },
                { name: 'Building Plan', status: 'Missing', color: 'text-[#b91c1c]' },
                { name: 'ETP Design', status: 'Uploaded', color: 'text-[#1d4ed8]' },
                { name: 'Declaration', status: 'Pending', color: 'text-[#94a3b8]' },
              ].map(d => (
                <div key={d.name} className="flex justify-between items-center py-0.5 border-b border-[#f8f9fb] last:border-0">
                  <span className="text-[#475569]">{d.name}</span>
                  <span className={`font-semibold ${d.color}`}>{d.status}</span>
                </div>
              ))}
              <Link
                href={ENTREPRENEUR_ROUTES.documents(project.id)}
                className="mt-1 text-[#1a56db] hover:underline text-left block w-full pt-1"
              >
                Open Document Centre →
              </Link>
            </div>
          </div>

          {/* Dependency context */}
          <div className="bg-white border border-[#e2e8f0]">
            <div className="px-3 py-2.5 border-b border-[#e8edf2]">
              <p className="text-xs font-bold text-[#1a3a5c]">Dependency Context</p>
            </div>
            <div className="px-3 py-2.5 text-xs text-[#475569] space-y-2">
              <p className="font-semibold text-[#334155]">MPCB — Consent to Establish</p>
              <p className="text-[#15803d]">No blocking dependencies. Application can proceed.</p>
              <Link
                href={ENTREPRENEUR_ROUTES.dependencies(project.id)}
                className="text-[#1a56db] hover:underline text-left block"
              >
                View dependency graph →
              </Link>
            </div>
          </div>

          {/* Regulatory Assistant */}
          <div className="bg-[#1a2533] border border-[#2d3f52] rounded overflow-hidden">
            <div className="px-3 py-2.5 border-b border-[#2d3f52] flex items-center gap-2">
              <span className="text-white/60"><ShieldIcon /></span>
              <p className="text-xs font-bold text-white">Regulatory Assistant</p>
            </div>
            <div className="px-3 py-2.5">
              <p className="text-[10px] text-[#9aa5b4] mb-2">Why is this field required? Which section is affected? Which GR applies?</p>
              <button
                type="button"
                onClick={() => setRagOpen(true)}
                className="w-full text-xs font-semibold bg-[#1a56db] text-white px-3 py-2 rounded hover:bg-[#1e40af] transition-colors"
              >
                Ask Regulatory Assistant →
              </button>
            </div>
          </div>

          {/* Related Pages */}
          <div className="bg-white border border-[#e2e8f0]">
            <div className="px-3 py-2.5 border-b border-[#e8edf2]">
              <p className="text-xs font-bold text-[#1a3a5c]">Related Pages</p>
            </div>
            <div className="px-3 py-2.5 flex flex-col gap-1.5 text-xs">
              <Link href={ENTREPRENEUR_ROUTES.requirement(project.id, reqId)} className="text-left text-[#1a56db] hover:underline">
                Requirement Detail (E10)
              </Link>
              <Link href={ENTREPRENEUR_ROUTES.journey(project.id)} className="text-left text-[#1a56db] hover:underline">
                Regulatory Journey (E09)
              </Link>
              <Link href={ENTREPRENEUR_ROUTES.dependencies(project.id)} className="text-left text-[#1a56db] hover:underline">
                Dependency Graph (E13)
              </Link>
              <Link href={ENTREPRENEUR_ROUTES.documents(project.id)} className="text-left text-[#1a56db] hover:underline">
                Document Centre (E11)
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* RAG Assistant Drawer Modal */}
      {ragOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white border border-[#d1d9e0] rounded-lg shadow-xl max-w-[500px] w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="text-[#1a3a5c]"><ShieldIcon /></span>
                <h3 className="font-bold text-[#1a3a5c] text-sm">Regulatory Assistant — Application Context</h3>
              </div>
              <button
                type="button"
                onClick={() => setRagOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <div className="max-h-[300px] overflow-y-auto space-y-2 text-xs">
              {ragMessages.length === 0 ? (
                <div className="text-gray-500 py-4 text-center">
                  Select a suggested question or type your regulatory question below.
                </div>
              ) : (
                ragMessages.map((m, idx) => (
                  <div key={idx} className={`p-2 rounded ${m.role === 'user' ? 'bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'bg-[#f8f9fb] text-[#334155]'}`}>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">{m.role === 'user' ? 'You' : 'Assistant'}</p>
                    <p className="mt-0.5">{m.text}</p>
                  </div>
                ))
              )}
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-[#64748b] uppercase">Suggested Questions</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'What does this field mean?',
                  'Why is this information required?',
                  'Why is this document required?',
                  'Which requirement does this section relate to?',
                ].map(q => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleRagSend(q)}
                    className="text-[10px] bg-[#f0f4f8] hover:bg-[#e2e8f0] text-[#1a3a5c] px-2 py-1 rounded"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask about this application..."
                value={ragInput}
                onChange={e => setRagInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRagSend(ragInput)}
                className="flex-1 text-xs border border-[#d1d9e0] rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#1a56db]"
              />
              <button
                type="button"
                onClick={() => handleRagSend(ragInput)}
                className="text-xs bg-[#1a3a5c] text-white px-3 py-1.5 rounded hover:bg-[#0f2540]"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
