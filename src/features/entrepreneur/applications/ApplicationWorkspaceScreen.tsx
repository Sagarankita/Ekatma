'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import { useRegulatoryAssistant } from '@/features/regulatory-assistant/Provider';
import { inlineContext } from '@/features/regulatory-assistant/context';
import {
  type AppSection,
  type SectionState,
  APP_SECTIONS,
} from './data';
import { ApplicationWorkflowStepper } from './ApplicationWorkflowStepper';
import {
  UploadCloud,
  FileCheck,
  CheckCircle2,
  Sparkles,
  Check,
  ArrowRight,
  FileText,
  AlertCircle,
} from 'lucide-react';

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
  const { openAssistant, pageContext } = useRegulatoryAssistant();
  const openApplicationAssistant = () => openAssistant({
    origin: 'inline', mode: 'entity',
    context: inlineContext(pageContext, { pageType: 'application-workspace', pageTitle: 'Application Workspace', label: 'Application Workspace', entities: { businessId: project.id, requirementId: reqId }, recordTitle: reqId }),
  });

  // Minimal form state for demo fields
  const [commonDone, setCommonDone] = useState(false);
  const [serviceAnswers, setServiceAnswers] = useState<Record<string, string>>({});
  const [formAnnexDone, setFormAnnexDone] = useState(false);
  const [docsDone, setDocsDone] = useState(false);
  const [uploadedDocMap, setUploadedDocMap] = useState<Record<string, { fileName: string; date: string }>>({
    'DOC-001': { fileName: 'Project-DPR-Sahyadri-v3.pdf', date: '12 Sep 2026' },
    'DOC-002': { fileName: 'MIDC-Lease-Agreement-Plot-C14.pdf', date: '15 Jun 2026' },
    'DOC-003': { fileName: 'MPCB-CTE-Grant-Order.pdf', date: '10 Oct 2026' },
    'DOC-006': { fileName: 'ETP-Zero-Liquid-Discharge-Specs.pdf', date: '20 Sep 2026' },
  });
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);

  const [declarations, setDeclarations] = useState<Record<string, boolean>>({
    'dec-accuracy': false,
    'dec-comply': false,
    'dec-authorised': false,
  });
  const allDeclared = Object.values(declarations).every(Boolean);
  const allDocsReady = docsDone || Boolean(uploadedDocMap['DOC-004']);

  const sectionStates: Record<AppSection, SectionState> = {
    common: { status: commonDone ? 'complete' : activeSection === 'common' ? 'active' : 'pending' },
    service: { status: !commonDone ? 'locked' : activeSection === 'service' ? 'active' : Object.keys(serviceAnswers).length >= 3 ? 'complete' : 'pending' },
    forms: { status: !commonDone ? 'locked' : activeSection === 'forms' ? 'active' : formAnnexDone ? 'complete' : 'pending' },
    documents: { status: activeSection === 'documents' ? 'active' : allDocsReady ? 'complete' : 'attention' },
    declarations: { status: !commonDone ? 'locked' : activeSection === 'declarations' ? 'active' : allDeclared ? 'complete' : 'pending' },
    review: { status: activeSection === 'review' ? 'active' : 'pending' },
  };

  const handleSimulateUpload = (docId: string, docName: string) => {
    const fakeFileName = `${docId.toLowerCase()}-${docName.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30)}.pdf`;
    setUploadedDocMap(prev => ({
      ...prev,
      [docId]: { fileName: fakeFileName, date: 'Just now (Simulated)' },
    }));
    setDocsDone(true);
    setUploadFeedback(`Simulated upload successful! Attached "${fakeFileName}" to application.`);
    setTimeout(() => setUploadFeedback(null), 6000);
  };

  const handleSimulateUploadAll = () => {
    setUploadedDocMap({
      'DOC-001': { fileName: 'Project-DPR-Sahyadri-v3.pdf', date: '12 Sep 2026' },
      'DOC-002': { fileName: 'MIDC-Lease-Agreement-Plot-C14.pdf', date: '15 Jun 2026' },
      'DOC-003': { fileName: 'MPCB-CTE-Grant-Order.pdf', date: '10 Oct 2026' },
      'DOC-004': { fileName: 'DOC-004-building-layout-architectural-plan.pdf', date: 'Just now (Simulated)' },
      'DOC-006': { fileName: 'ETP-Zero-Liquid-Discharge-Specs.pdf', date: '20 Sep 2026' },
    });
    setDocsDone(true);
    setUploadFeedback('All 5 statutory documents simulated and attached successfully!');
    setTimeout(() => setUploadFeedback(null), 6000);
  };

  const handleAutoFillAndUnlock = () => {
    setCommonDone(true);
    setServiceAnswers({
      q1: 'Yes',
      q2: 'Yes',
      q3: 'Yes',
      q4: '₹45,00,00,000',
      q5: 'Synthesis of active pharmaceutical ingredients (API) using bulk chemical reactor vessels, distillation, crystallization, and solvent recovery.',
      q6: 'Yes',
    });
    setFormAnnexDone(true);
    setUploadedDocMap({
      'DOC-001': { fileName: 'Project-DPR-Sahyadri-v3.pdf', date: '12 Sep 2026' },
      'DOC-002': { fileName: 'MIDC-Lease-Agreement-Plot-C14.pdf', date: '15 Jun 2026' },
      'DOC-003': { fileName: 'MPCB-CTE-Grant-Order.pdf', date: '10 Oct 2026' },
      'DOC-004': { fileName: 'DOC-004-building-layout-architectural-plan.pdf', date: 'Just now (Simulated)' },
      'DOC-006': { fileName: 'ETP-Zero-Liquid-Discharge-Specs.pdf', date: '20 Sep 2026' },
    });
    setDocsDone(true);
    setDeclarations({
      'dec-accuracy': true,
      'dec-comply': true,
      'dec-authorised': true,
    });
    setActiveSection('review');
    setUploadFeedback('Application auto-completed & documents attached! You are ready to proceed to Stage 3.');
    setTimeout(() => setUploadFeedback(null), 6000);
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
      'What should this document contain?': 'Open Document Detail for the required content.',
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
      { id: 'DOC-001', name: 'Project Environmental Report / DPR', req: 'Required', defaultAvail: 'Available', verif: 'Needs Verification', reuse: 'Service-specific', dep: null },
      { id: 'DOC-002', name: 'Land Possession / MIDC Lease Agreement', req: 'Required', defaultAvail: 'Available', verif: 'User-confirmed', reuse: 'Reusable', dep: null },
      { id: 'DOC-003', name: 'MPCB Consent to Establish Certificate', req: 'Conditional', defaultAvail: 'Available', verif: 'Government-issued', reuse: 'Reusable', dep: 'Generated — CTE approved 10 Oct 2026' },
      { id: 'DOC-004', name: 'Building Layout / Architectural Plan', req: 'Required', defaultAvail: 'Missing', verif: 'Self-declared', reuse: 'Service-specific', dep: null },
      { id: 'DOC-006', name: 'ETP Design Details', req: 'Required', defaultAvail: 'Uploaded', verif: 'Needs Verification', reuse: 'Service-specific', dep: null },
    ];

    return (
      <div className="space-y-4">
        {/* Top Simulation Quick Banner */}
        <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-blue-50/90 border border-blue-200/90 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#17365D] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <UploadCloud className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span>Testing &amp; Demo Mode Active</span>
                <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-semibold">Instant Upload</span>
              </p>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Don&apos;t have real PDF drawings right now? Click to simulate attaching required architectural drawings and statutory documents.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSimulateUploadAll}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#17365D] hover:bg-[#122b49] text-white text-xs font-bold rounded-lg transition-all shadow-2xs shrink-0"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>⚡ Simulate Upload All Documents</span>
          </button>
        </div>

        {uploadFeedback && (
          <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-3 text-xs text-emerald-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{uploadFeedback}</span>
          </div>
        )}

        <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded p-3 text-xs text-[#0369a1]">
          <span className="font-semibold">Upload Once → Reuse Where Applicable.</span> Documents already in your Document Centre are shown below. Select an existing document rather than uploading a duplicate.
        </div>

        {docs.map(d => {
          const uploadedInfo = uploadedDocMap[d.id];
          const isUploaded = Boolean(uploadedInfo);
          const avail = isUploaded ? 'Uploaded' : d.defaultAvail;

          return (
            <div
              key={d.id}
              className={`border rounded-xl p-4 transition-all ${
                d.dep
                  ? 'border-[#c4b5fd] bg-[#f5f3ff]'
                  : avail === 'Missing'
                  ? 'border-amber-300 bg-amber-50/30'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
                      {d.id}
                    </span>
                    <p className="text-sm font-bold text-slate-900">{d.name}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${d.req === 'Required' ? 'bg-[#fee2e2] text-[#b91c1c] border-[#fca5a5]' : 'bg-[#fef3c7] text-[#92400e] border-[#fcd34d]'}`}>
                      {d.req}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${avail === 'Available' || avail === 'Uploaded' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                      {avail}
                    </span>
                    {d.verif !== '—' && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded border bg-purple-50 text-purple-700 border-purple-200">
                        {d.verif}
                      </span>
                    )}
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded border bg-slate-100 text-slate-600 border-slate-200">
                      {d.reuse}
                    </span>
                  </div>

                  {uploadedInfo && (
                    <p className="text-[11px] text-emerald-800 font-medium mt-2 flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Attached: <strong className="font-mono">{uploadedInfo.fileName}</strong> ({uploadedInfo.date})</span>
                    </p>
                  )}

                  {d.dep && <p className="text-xs text-[#6d28d9] mt-2 font-medium">{d.dep}</p>}
                </div>

                <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                  {avail === 'Missing' ? (
                    <button
                      type="button"
                      onClick={() => handleSimulateUpload(d.id, d.name)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#1a56db] hover:bg-[#1542a8] text-white px-3.5 py-2 rounded-lg shadow-2xs transition-all"
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>⚡ Simulate Upload</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSimulateUpload(d.id, d.name)}
                      className="text-xs border border-slate-300 text-slate-700 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Re-Simulate Upload
                    </button>
                  )}

                  <Link
                    href={ENTREPRENEUR_ROUTES.document(project.id, d.id)}
                    className="text-xs border border-slate-200 text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={ENTREPRENEUR_ROUTES.documents(project.id)}
            className="text-xs font-semibold border border-[#17365D] text-[#17365D] px-3.5 py-2 rounded-lg hover:bg-slate-50 transition-colors inline-flex items-center gap-1.5"
          >
            <span>Document Centre</span>
          </Link>

          <button
            type="button"
            onClick={() => {
              setDocsDone(true);
              handleNav('next');
            }}
            className="text-xs font-bold bg-[#17365D] text-white px-4 py-2 rounded-lg hover:bg-[#122b49] transition-colors shadow-2xs"
          >
            Confirm Documents &amp; Next →
          </button>
        </div>
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
            { label: 'Documents', value: allDocsReady ? '✓ 5 of 5 documents attached' : `${Object.keys(uploadedDocMap).length} of 5 attached — ${5 - Object.keys(uploadedDocMap).length} missing` },
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
            className="inline-flex items-center gap-1.5 text-xs font-bold px-5 py-2.5 bg-[#17365D] hover:bg-[#122b49] text-white rounded-lg shadow-2xs"
          >
            <span>Check for Issues (Pre-validation Stage 3) →</span>
          </Link>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled
              className="text-xs font-semibold px-4 py-2 bg-slate-100 text-slate-400 cursor-not-allowed rounded-lg"
            >
              {missing.length} item{missing.length > 1 ? 's' : ''} must be resolved
            </button>
            <button
              type="button"
              onClick={handleAutoFillAndUnlock}
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 bg-[#17365D] hover:bg-[#122b49] text-white rounded-lg shadow-2xs transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Simulate Uploads &amp; Auto-Fill (Demo)</span>
            </button>
          </div>
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
    <main id="main-content" className="flex-1 bg-[#F8F9FA] pb-20 font-sans" tabIndex={-1}>
      {/* ── 6-STAGE PIPELINE STEPPER ── */}
      <ApplicationWorkflowStepper
        businessId={project.id}
        currentStep={activeSection === 'review' ? 2 : activeSection === 'common' ? 1 : 2}
      />

      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-8 py-5">
        <div className="max-w-[1280px] mx-auto">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-500 mb-2.5 flex items-center gap-1.5">
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#17365D] hover:underline">
              {project.name}
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.applications(project.id)} className="hover:text-[#17365D] hover:underline">
              Applications
            </Link>
            <span>›</span>
            <span className="text-[#17365D] font-bold">Application Workspace</span>
          </nav>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-[#17365D]/8 text-[#17365D] border border-[#17365D]/15 px-2.5 py-0.5 rounded-md">
                  Stage 1 &amp; 2 of 6 · Review &amp; Complete Application
                </span>
                <span className="text-xs text-slate-500">· Statutory Form Filing</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#17365D] tracking-tight">
                Application Workspace
              </h1>
              <p className="text-sm font-semibold text-slate-700 mt-0.5">MPCB — Consent to Establish (CTE)</p>
              <p className="mt-0.5 text-xs text-slate-500">Fresh Application</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleAutoFillAndUnlock}
                className="text-xs font-bold border border-blue-300 bg-blue-50 text-blue-800 px-3.5 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1.5 shadow-2xs"
                title="Simulate all uploads and auto-complete required sections"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Simulate Upload &amp; Auto-Fill</span>
              </button>
              <Link
                href={ENTREPRENEUR_ROUTES.applicationPrevalidation(project.id)}
                className="text-xs font-bold bg-[#17365D] text-white px-4 py-2 rounded-lg hover:bg-[#122b49] transition-all shadow-2xs"
              >
                Check for Issues (Pre-validation) →
              </Link>
              <button
                type="button"
                className="text-xs font-semibold border border-slate-300 text-slate-700 px-3.5 py-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Save Draft
              </button>
              <Link
                href={ENTREPRENEUR_ROUTES.business(project.id)}
                className="text-xs font-semibold border border-slate-300 text-slate-700 px-3.5 py-2 rounded-lg hover:bg-slate-50 transition-colors"
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
                onClick={openApplicationAssistant}
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
                Requirement Detail
              </Link>
              <Link href={ENTREPRENEUR_ROUTES.journey(project.id)} className="text-left text-[#1a56db] hover:underline">
                Regulatory Journey
              </Link>
              <Link href={ENTREPRENEUR_ROUTES.dependencies(project.id)} className="text-left text-[#1a56db] hover:underline">
                Dependency Graph
              </Link>
              <Link href={ENTREPRENEUR_ROUTES.documents(project.id)} className="text-left text-[#1a56db] hover:underline">
                Document Centre
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
