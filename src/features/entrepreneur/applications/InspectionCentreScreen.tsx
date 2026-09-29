'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import {
  listInspectionsForBusiness,
  findInspectionDocumentForBusiness,
  findTrackerAppForBusiness,
  type InspectionRecord,
  type InspectionStatus,
  type InspectionObservation,
} from './data';

function insStatusBadge(status: InspectionStatus) {
  const map: Record<InspectionStatus, string> = {
    'Required': 'border-[#e2e8f0] bg-[#f8f9fb] text-[#475569]',
    'Awaiting Schedule': 'border-[#fcd34d] bg-[#fef3c7] text-[#92400e]',
    'Scheduled': 'border-[#93c5fd] bg-[#dbeafe] text-[#1e40af]',
    'Completed': 'border-[#a5b4fc] bg-[#ede9fe] text-[#4338ca]',
    'Observation Raised': 'border-[#fca5a5] bg-[#fee2e2] text-[#b91c1c]',
    'Correction Submitted': 'border-[#fcd34d] bg-[#fef3c7] text-[#92400e]',
    'Re-inspection Required': 'border-[#fca5a5] bg-[#fee2e2] text-[#b91c1c]',
    'Resolved': 'border-[#86efac] bg-[#dcfce7] text-[#166534]',
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 border rounded-sm uppercase tracking-wide ${map[status] || map.Required}`}>
      {status}
    </span>
  );
}

function obsResponseBadge(state: InspectionObservation['responseState']) {
  const map = {
    Pending: 'border-[#fca5a5] bg-[#fee2e2] text-[#b91c1c]',
    Submitted: 'border-[#fcd34d] bg-[#fef3c7] text-[#92400e]',
    Accepted: 'border-[#86efac] bg-[#dcfce7] text-[#166534]',
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 border rounded-sm uppercase tracking-wide ${map[state]}`}>
      {state}
    </span>
  );
}

export function InspectionCentreScreen({
  project,
  initialInspectionId,
}: {
  project: BusinessProject;
  initialInspectionId?: string;
}) {
  const inspections = listInspectionsForBusiness(project.id);
  const [selectedId, setSelectedId] = useState<string | null>(initialInspectionId ?? null);
  
  // Filter state for list view
  const [listFilter, setListFilter] = useState<'all' | 'upcoming' | 'action' | 'completed'>('all');

  // Interactive state for inspection detail view
  const [activeTab, setActiveTab] = useState<'upcoming' | 'preparation' | 'record' | 'outcome' | 'action'>('upcoming');
  const [checkedPrep, setCheckedPrep] = useState<Record<string, boolean>>({});
  const [obsResponses, setObsResponses] = useState<Record<string, string>>({});
  const [obsEvidenceFiles, setObsEvidenceFiles] = useState<Record<string, string>>({});
  const [obsSubmitted, setObsSubmitted] = useState<Record<string, { date: string; response: string; file?: string }>>({});

  const selected = selectedId ? inspections.find(i => i.id === selectedId) : null;

  // Sync active tab when selected inspection changes
  React.useEffect(() => {
    if (selected) {
      if (selected.status === 'Observation Raised' || selected.status === 'Re-inspection Required') {
        setActiveTab('action');
      } else if (selected.status === 'Scheduled') {
        setActiveTab('upcoming');
      } else {
        setActiveTab('record');
      }
    }
  }, [selectedId, selected?.status]);

  // Handle simulated upload for observation correction
  const handleSimulateUpload = (obsId: string) => {
    const filename = `evidence_${obsId.toLowerCase()}_compliance_cert.pdf`;
    setObsEvidenceFiles(prev => ({ ...prev, [obsId]: filename }));
  };

  // Handle submit correction
  const handleSubmitCorrection = (obs: InspectionObservation) => {
    const responseText = obsResponses[obs.id] || obs.submittedResponse || 'Corrective rectification completed as instructed on site.';
    const file = obsEvidenceFiles[obs.id] || obs.submittedEvidenceDoc || 'photo_rectification_geotagged.pdf';
    setObsSubmitted(prev => ({
      ...prev,
      [obs.id]: {
        date: '29 Sep 2026, 12:00 IST',
        response: responseText,
        file: file,
      },
    }));
  };

  // Toggle preparation checklist item
  const togglePrepItem = (key: string) => {
    setCheckedPrep(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // DETAIL VIEW
  // ─────────────────────────────────────────────────────────────────────────────
  if (selected) {
    const hasActiveObservation = selected.observations.some(o => o.responseState === 'Pending' && !obsSubmitted[o.id]);
    const isReinspection = selected.status === 'Re-inspection Required' || Boolean(selected.reInspectionReason);
    const hasActionRequired = Boolean(selected.actionRequired) || hasActiveObservation || isReinspection;

    return (
      <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
        {/* Header Bar */}
        <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
          <div className="max-w-[1200px] mx-auto">
            <nav aria-label="Breadcrumb" className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5">
              <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#1a3a5c] hover:underline">
                Dashboard
              </Link>
              <span>›</span>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="hover:text-[#1a3a5c] hover:underline"
              >
                Inspection Centre
              </button>
              <span>›</span>
              <span className="text-[#1a3a5c] font-medium">{selected.id}</span>
            </nav>

            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-[#64748b] bg-[#f1f5f9] px-2 py-0.5 border border-[#e2e8f0]">
                    {selected.id}
                  </span>
                  <h1 className="text-xl font-bold text-[#1a3a5c]">{selected.type}</h1>
                  {insStatusBadge(selected.status)}
                  {selected.coordinated && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 border border-[#c7d2fe] bg-[#e0e7ff] text-[#3730a3] rounded">
                      Coordinated Joint Visit
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#6b7a8d] mt-1">
                  Departments: <strong className="text-[#334155]">{selected.departments.join(' + ')}</strong> · Site: {selected.site}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="text-xs border border-[#d1d9e0] text-[#475569] px-3 py-1.5 hover:bg-[#f1f5f9] rounded font-medium"
                >
                  ← Back to Inspection List
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 py-6 space-y-6">
          {/* ========================================================================= */}
          {/* 6 IMMEDIATE QUESTIONS COCKPIT GRID                                       */}
          {/* ========================================================================= */}
          <section className="bg-white border border-[#e2e8f0] rounded p-5 shadow-xs">
            <div className="border-b border-[#e2e8f0] pb-3 mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Immediate Clarity Cockpit</span>
                <h2 className="text-sm font-bold text-[#1a3a5c]">Inspection Overview & Operational Status</h2>
              </div>
              <span className="text-xs text-[#64748b]">
                Answering all 6 core inspection questions
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* 1. WHEN IS MY INSPECTION? */}
              <div className="p-3.5 border border-[#e2e8f0] bg-[#f8f9fb] rounded-sm flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b] block mb-1">
                    1. When is my inspection?
                  </span>
                  <p className="text-base font-bold text-[#1a3a5c]">{selected.date}</p>
                  <p className="text-xs font-semibold text-[#1e40af] mt-0.5">{selected.time} IST</p>
                </div>
                <p className="text-[11px] text-[#64748b] mt-2 pt-2 border-t border-[#e2e8f0]">
                  {selected.estimatedDuration ? `Duration: ${selected.estimatedDuration}` : 'Visit Window: Approx 2 hours'}
                </p>
              </div>

              {/* 2. WHAT IS IT FOR? */}
              <div className="p-3.5 border border-[#e2e8f0] bg-[#f8f9fb] rounded-sm flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b] block mb-1">
                    2. What is it for?
                  </span>
                  <p className="text-xs font-medium text-[#334155] leading-relaxed">
                    {selected.purpose || `${selected.type} to physically evaluate on-site compliance before statutory clearance.`}
                  </p>
                </div>
                <p className="text-[11px] text-[#64748b] mt-2 pt-2 border-t border-[#e2e8f0]">
                  Authority: <strong className="text-[#334155]">{selected.departments.join(', ')}</strong>
                </p>
              </div>

              {/* 3. WHAT DO I NEED TO PREPARE? */}
              <div className="p-3.5 border border-[#e2e8f0] bg-[#f8f9fb] rounded-sm flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b] block mb-1">
                    3. What do I need to prepare?
                  </span>
                  <p className="text-xs font-semibold text-[#1a3a5c]">
                    {selected.prepRequirements.length} On-Site Readiness Items
                  </p>
                  <p className="text-xs text-[#475569] mt-0.5">
                    Physical site access, authorized technical representatives & machinery readiness.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('preparation')}
                  className="text-[11px] font-semibold text-[#1a56db] hover:underline text-left mt-2 pt-2 border-t border-[#e2e8f0]"
                >
                  View Preparation Checklist ({selected.prepRequirements.length}) →
                </button>
              </div>

              {/* 4. WHAT DOCUMENTS ARE REQUIRED? */}
              <div className="p-3.5 border border-[#e2e8f0] bg-[#f8f9fb] rounded-sm flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b] block mb-1">
                    4. What documents are required?
                  </span>
                  <p className="text-xs font-semibold text-[#1a3a5c]">
                    {selected.documents.length} Physical Dossiers on Site
                  </p>
                  <p className="text-xs text-[#475569] mt-0.5">
                    Approved layouts, technical specs, lease deed & safety registers ready for officer verification.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('preparation')}
                  className="text-[11px] font-semibold text-[#1a56db] hover:underline text-left mt-2 pt-2 border-t border-[#e2e8f0]"
                >
                  Inspect Required Documents →
                </button>
              </div>

              {/* 5. WHAT HAPPENED? */}
              <div className="p-3.5 border border-[#e2e8f0] bg-[#f8f9fb] rounded-sm flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b] block mb-1">
                    5. What happened?
                  </span>
                  <p className="text-xs font-medium text-[#334155] leading-relaxed">
                    {selected.outcomeSummary ||
                      (selected.status === 'Scheduled'
                        ? 'Inspection scheduled. Awaiting physical visit by department officers.'
                        : 'Inspection visit conducted. Detailed findings recorded in inspection report.')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('record')}
                  className="text-[11px] font-semibold text-[#1a56db] hover:underline text-left mt-2 pt-2 border-t border-[#e2e8f0]"
                >
                  View Visit Record & Checklist →
                </button>
              </div>

              {/* 6. DO I NEED TO TAKE ACTION? */}
              <div className={`p-3.5 border rounded-sm flex flex-col justify-between ${
                hasActionRequired ? 'border-[#fca5a5] bg-[#fff1f2]' : 'border-[#86efac] bg-[#f0fdf4]'
              }`}>
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                    hasActionRequired ? 'text-[#b91c1c]' : 'text-[#166534]'
                  }`}>
                    6. Do I need to take action?
                  </span>
                  <p className={`text-xs font-bold ${hasActionRequired ? 'text-[#991b1b]' : 'text-[#166534]'}`}>
                    {hasActionRequired ? 'ACTION REQUIRED' : 'NO ACTION REQUIRED'}
                  </p>
                  <p className="text-xs text-[#334155] mt-1">
                    {selected.actionRequired ||
                      (hasActionRequired
                        ? 'Submit corrective response and evidence before re-inspection.'
                        : 'No pending requirements. Department scrutiny continues.')}
                  </p>
                </div>
                {hasActionRequired && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('action')}
                    className="text-[11px] font-bold text-[#b91c1c] hover:underline text-left mt-2 pt-2 border-t border-[#fecaca]"
                  >
                    Resolve Action Items →
                  </button>
                )}
                {!hasActionRequired && (
                  <p className="text-[11px] text-[#166534] mt-2 pt-2 border-t border-[#bbf7d0]">
                    In process · No applicant action pending
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* STATUTORY APPROVAL BOUNDARY DISCLAIMER                                    */}
          {/* ========================================================================= */}
          <details className="rounded-r border-l-4 border-[#0284c7] bg-[#f0f9ff] p-4 text-xs text-[#0369a1] shadow-2xs">
            <summary className="cursor-pointer font-bold text-[#075985]">Inspection outcome is not final approval</summary>
            <p className="mt-2 leading-relaxed text-[#0c4a6e]">
              {selected.statutoryApprovalDisclaimer ||
                'An inspection is an intermediate technical verification stage. Final approval remains subject to department scrutiny and a digitally signed decision.'}
            </p>
          </details>

          {/* ========================================================================= */}
          {/* TAB NAVIGATION                                                            */}
          {/* ========================================================================= */}
          <div className="border-b border-[#d1d9e0] flex items-center gap-1 overflow-x-auto">
            {[
              { id: 'upcoming', label: 'Upcoming Inspection', badge: selected.status === 'Scheduled' ? 'Scheduled' : null },
              { id: 'preparation', label: 'Preparation', badge: `${selected.prepRequirements.length} items` },
              { id: 'record', label: 'Inspection Record', badge: selected.observations.length > 0 ? `${selected.observations.length} obs` : null },
              { id: 'outcome', label: 'Outcome', badge: selected.outcomeCompliance || null },
              {
                id: 'action',
                label: 'Action Required',
                badge: hasActionRequired ? (isReinspection ? 'Re-inspection' : 'Action') : null,
                highlight: hasActionRequired,
              },
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 flex items-center gap-2 transition-colors ${
                    isActive
                      ? 'border-[#1a3a5c] text-[#1a3a5c] bg-white'
                      : 'border-transparent text-[#64748b] hover:text-[#1a3a5c] hover:bg-[#f1f5f9]'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      tab.highlight
                        ? 'bg-[#fee2e2] text-[#b91c1c] border border-[#fca5a5]'
                        : 'bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* TAB CONTENTS + SIDEBAR GRID                                               */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">

              {/* ───────────────────────────────────────────────────────────────── */}
              {/* TAB 1: UPCOMING INSPECTION                                        */}
              {/* ───────────────────────────────────────────────────────────────── */}
              {activeTab === 'upcoming' && (
                <div className="space-y-5">
                  <div className="bg-white border border-[#e2e8f0] rounded p-5">
                    <h3 className="text-sm font-bold text-[#1a3a5c] uppercase tracking-wider mb-4 border-b border-[#f1f5f9] pb-2">
                      Upcoming Inspection Logistics
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <span className="text-[#64748b] font-medium">Scheduled Date & Time</span>
                        <p className="text-sm font-bold text-[#1a3a5c]">{selected.date} at {selected.time} IST</p>
                        <p className="text-[11px] text-[#64748b]">{selected.estimatedDuration || 'Estimated visit: 2.0 hours'}</p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[#64748b] font-medium">Site Address / Location</span>
                        <p className="font-semibold text-[#1a3a5c]">{selected.site}</p>
                        <p className="text-[11px] text-[#64748b]">MIDC Chakan Industrial Belt · Pune Zone</p>
                      </div>

                      <div className="space-y-1 sm:col-span-2 pt-2 border-t border-[#f1f5f9]">
                        <span className="text-[#64748b] font-medium">Inspection Purpose & Scope</span>
                        <p className="text-xs text-[#334155] leading-relaxed font-normal">
                          {selected.purpose || `${selected.type} conducted pursuant to Maharashtra State Single Window Regulations.`}
                        </p>
                      </div>

                      <div className="space-y-1 sm:col-span-2 pt-2 border-t border-[#f1f5f9]">
                        <span className="text-[#64748b] font-medium">Assigned Inspecting Team</span>
                        <p className="text-xs font-semibold text-[#334155]">
                          {selected.inspectingTeamNotes || `${selected.departments.join(', ')} designated field inspection officers.`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Coordinated Single Window Concept Card */}
                  {selected.coordinated && (
                    <div className="bg-[#f8f9fc] border border-[#c7d2fe] rounded p-4 text-xs text-[#3730a3]">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-base leading-none">🤝</span>
                        <h4 className="font-bold text-sm text-[#1e1b4b]">Coordinated Joint Inspection Policy</h4>
                      </div>
                      <p className="leading-relaxed text-[#312e81]">
                        Under the Maharashtra Ease of Doing Business framework, departments (<strong>{selected.departments.join(', ')}</strong>) 
                        conduct a single synchronized visit rather than separate uncoordinated inspections. This saves applicant time, 
                        eliminates duplicate queries, and ensures joint consensus before statutory permissions are processed.
                      </p>
                    </div>
                  )}

                  {/* Next Step Guidance */}
                  <div className="bg-white border border-[#e2e8f0] rounded p-4 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-[#1a3a5c]">Ready for the inspection?</p>
                      <p className="text-[#64748b]">Review the on-site preparation checklist and assemble your physical dossiers.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('preparation')}
                      className="bg-[#1a3a5c] text-white px-3 py-1.5 rounded font-semibold hover:bg-[#0f2540] shrink-0"
                    >
                      Open Preparation Checklist →
                    </button>
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────────────────────── */}
              {/* TAB 2: PREPARATION                                                */}
              {/* ───────────────────────────────────────────────────────────────── */}
              {activeTab === 'preparation' && (
                <div className="space-y-6">
                  {/* On-Site Preparation Checklist */}
                  <div className="bg-white border border-[#e2e8f0] rounded">
                    <div className="px-5 py-3 border-b border-[#e2e8f0] bg-[#f8f9fb] flex items-center justify-between">
                      <div>
                        <h3 className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">
                          What Do I Need to Prepare?
                        </h3>
                        <p className="text-[11px] text-[#64748b]">On-site physical arrangements required prior to officer arrival</p>
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 bg-white border border-[#d1d9e0] text-[#334155] rounded">
                        {Object.values(checkedPrep).filter(Boolean).length} of {selected.prepRequirements.length} Ready
                      </span>
                    </div>

                    <div className="p-5 space-y-3">
                      {selected.prepRequirements.map((req, i) => {
                        const key = `${selected.id}-prep-${i}`;
                        const isDone = Boolean(checkedPrep[key]);
                        return (
                          <label
                            key={i}
                            className={`flex items-start gap-3 p-3 border rounded transition-colors cursor-pointer ${
                              isDone ? 'bg-[#f0fdf4] border-[#86efac]' : 'bg-white border-[#e2e8f0] hover:bg-[#f8f9fb]'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isDone}
                              onChange={() => togglePrepItem(key)}
                              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1a3a5c] focus:ring-[#1a3a5c]"
                            />
                            <div className="flex-1 text-xs">
                              <span className={`font-mono text-[10px] font-bold mr-1.5 ${isDone ? 'text-[#166534]' : 'text-[#64748b]'}`}>
                                PREP-{String(i + 1).padStart(2, '0')}
                              </span>
                              <span className={`leading-relaxed ${isDone ? 'line-through text-[#64748b]' : 'text-[#334155] font-medium'}`}>
                                {req}
                              </span>
                            </div>
                            {isDone && (
                              <span className="text-[10px] font-bold text-[#166534] bg-[#dcfce7] px-1.5 py-0.5 rounded">
                                Ready
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* What Documents are Required */}
                  <div className="bg-white border border-[#e2e8f0] rounded">
                    <div className="px-5 py-3 border-b border-[#e2e8f0] bg-[#f8f9fb] flex items-center justify-between">
                      <div>
                        <h3 className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">
                          What Documents Are Required on Site?
                        </h3>
                        <p className="text-[11px] text-[#64748b]">Physical hard copies and blueprints to be kept ready for inspecting officers</p>
                      </div>
                      <Link
                        href={ENTREPRENEUR_ROUTES.documents(project.id)}
                        className="text-xs font-semibold text-[#1a56db] hover:underline"
                      >
                        Document Centre →
                      </Link>
                    </div>

                    <div className="divide-y divide-[#f1f5f9]">
                      {selected.documents.map(d => {
                        const canonicalDoc = findInspectionDocumentForBusiness(project.id, selected.id, d.id);
                        return (
                          <div key={d.id} className="p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[10px] font-bold text-[#64748b] bg-[#f1f5f9] px-1.5 py-0.5 border border-[#e2e8f0]">
                                  {d.id}
                                </span>
                                <span className="font-semibold text-[#1a3a5c]">{d.name}</span>
                              </div>
                              <p className="text-[11px] text-[#64748b]">
                                Requirement: Hardcopy blueprint or certified document kept at site project office.
                              </p>
                            </div>

                            <div>
                              {canonicalDoc ? (
                                <Link
                                  href={ENTREPRENEUR_ROUTES.document(project.id, d.id)}
                                  className="text-xs font-semibold px-3 py-1.5 bg-[#f8f9fb] hover:bg-[#e2e8f0] text-[#1a56db] border border-[#d1d9e0] rounded inline-flex items-center gap-1.5"
                                >
                                  <span>View in Document Centre</span>
                                  <span>→</span>
                                </Link>
                              ) : (
                                <span
                                  className="text-[11px] text-[#94a3b8] italic"
                                  title="Document reference is maintained locally for inspection readiness"
                                >
                                  Physical Printout Required
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────────────────────── */}
              {/* TAB 3: INSPECTION RECORD                                          */}
              {/* ───────────────────────────────────────────────────────────────── */}
              {activeTab === 'record' && (
                <div className="space-y-6">
                  {/* Visit Audit Record */}
                  <div className="bg-white border border-[#e2e8f0] rounded p-5 space-y-4">
                    <div className="border-b border-[#f1f5f9] pb-3 flex items-center justify-between">
                      <div>
                        <h3 className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">
                          Inspection Visit Record
                        </h3>
                        <p className="text-[11px] text-[#64748b]">Official audit trail of site visit and department scrutiny</p>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#475569]">{selected.id}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-[#64748b] block mb-0.5">Date Conducted</span>
                        <p className="font-semibold text-[#1a3a5c]">{selected.date}</p>
                      </div>
                      <div>
                        <span className="text-[#64748b] block mb-0.5">Time Slot</span>
                        <p className="font-semibold text-[#1a3a5c]">{selected.time} IST</p>
                      </div>
                      <div>
                        <span className="text-[#64748b] block mb-0.5">Visit Status</span>
                        <p className="font-semibold text-[#1a3a5c]">{selected.status}</p>
                      </div>
                    </div>
                  </div>

                  {/* Department Checklist Verification */}
                  <div className="bg-white border border-[#e2e8f0] rounded">
                    <div className="px-5 py-3 border-b border-[#e2e8f0] bg-[#f8f9fb]">
                      <h3 className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">
                        Department Checklist & Verification Points
                      </h3>
                      <p className="text-[11px] text-[#64748b]">Specific regulatory parameters evaluated by inspecting officers</p>
                    </div>

                    <div className="divide-y divide-[#f1f5f9]">
                      {selected.checklist.map(cat => (
                        <div key={cat.category} className="p-4 space-y-2">
                          <p className="text-xs font-bold text-[#1a3a5c] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1a56db]" />
                            {cat.category}
                          </p>
                          <ul className="space-y-1.5 pl-3">
                            {cat.items.map((item, idx) => (
                              <li key={idx} className="text-xs text-[#475569] flex items-start gap-2">
                                <span className="text-[#94a3b8] font-mono shrink-0">✓</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────────────────────── */}
              {/* TAB 4: OUTCOME                                                    */}
              {/* ───────────────────────────────────────────────────────────────── */}
              {activeTab === 'outcome' && (
                <div className="space-y-6">
                  <div className="bg-white border border-[#e2e8f0] rounded p-5 space-y-4">
                    <div className="border-b border-[#f1f5f9] pb-3 flex items-center justify-between">
                      <div>
                        <h3 className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider">
                          Inspection Outcome Summary
                        </h3>
                        <p className="text-[11px] text-[#64748b]">Official findings following physical inspection walk-through</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                        selected.outcomeCompliance === 'Satisfactory'
                          ? 'bg-[#dcfce7] text-[#166534] border-[#86efac]'
                          : selected.outcomeCompliance === 'Re-inspection Ordered'
                          ? 'bg-[#fee2e2] text-[#b91c1c] border-[#fca5a5]'
                          : 'bg-[#f1f5f9] text-[#475569] border-[#e2e8f0]'
                      }`}>
                        {selected.outcomeCompliance || selected.status}
                      </span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <span className="text-[#64748b] font-medium block mb-1">Detailed Outcome</span>
                        <p className="text-sm font-semibold text-[#1a3a5c] leading-relaxed">
                          {selected.outcomeSummary || 'Inspection completed. Recommendations submitted to Competent Authority.'}
                        </p>
                      </div>

                      {/* Explicit statutory disclaimer */}
                      <div className="p-3.5 border border-[#fed7aa] bg-[#fffbeb] rounded text-xs text-[#9a3412] space-y-1">
                        <p className="font-bold text-[11px] uppercase tracking-wider">
                          ⚠️ Regulatory Clarification: Inspection ≠ Final Statutory Clearance
                        </p>
                        <p className="leading-relaxed">
                          Please note that an inspection report is a physical verification input. A satisfactory finding 
                          recommends clearance to the competent committee but does <strong>NOT constitute final license or NOC grant</strong>. 
                          The formal digitally signed clearance order will be issued after final desk scrutiny.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Downstream Related Applications */}
                  <div className="bg-white border border-[#e2e8f0] rounded p-5">
                    <h3 className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider mb-3">
                      Connected Statutory Applications
                    </h3>
                    <div className="divide-y divide-[#f1f5f9]">
                      {selected.relatedAppIds.map(appId => {
                        const app = findTrackerAppForBusiness(project.id, appId);
                        return (
                          <div key={appId} className="py-2.5 flex items-center justify-between text-xs">
                            <div>
                              <span className="font-mono font-semibold text-[#1a3a5c] block">{appId}</span>
                              <span className="text-[#64748b]">{app?.service || 'Associated Clearance Application'}</span>
                            </div>
                            {app ? (
                              <Link
                                href={ENTREPRENEUR_ROUTES.application(project.id, appId)}
                                className="text-xs text-[#1a56db] font-semibold hover:underline"
                              >
                                View Application Detail →
                              </Link>
                            ) : (
                              <span className="text-xs text-[#94a3b8]">External Record</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────────────────────── */}
              {/* TAB 5: ACTION REQUIRED                                            */}
              {/* ───────────────────────────────────────────────────────────────── */}
              {activeTab === 'action' && (
                <div className="space-y-6">
                  {/* Re-Inspection Required Card if applicable */}
                  {isReinspection && (
                    <div className="bg-[#fff1f2] border-2 border-[#fca5a5] rounded p-5 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg leading-none">⚠️</span>
                        <div>
                          <h3 className="text-sm font-bold text-[#b91c1c] uppercase tracking-wider">
                            RE-INSPECTION REQUIRED
                          </h3>
                          <p className="text-xs text-[#7f1d1d]">
                            Physical re-visit mandated by inspecting officers before clearance recommendation.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3 text-xs bg-white p-4 border border-[#fecaca] rounded">
                        <div>
                          <span className="text-[10px] font-bold text-[#991b1b] uppercase tracking-wider block mb-1">
                            Reason
                          </span>
                          <p className="text-[#334155] leading-relaxed font-medium">
                            {selected.reInspectionReason || 'Initial inspection identified critical non-compliances requiring on-site rectification and re-verification.'}
                          </p>
                        </div>

                        {selected.reInspectionItems && selected.reInspectionItems.length > 0 && (
                          <div className="pt-2 border-t border-[#f1f5f9]">
                            <span className="text-[10px] font-bold text-[#991b1b] uppercase tracking-wider block mb-1.5">
                              What must be corrected
                            </span>
                            <ul className="space-y-1.5 pl-3">
                              {selected.reInspectionItems.map((item, idx) => (
                                <li key={idx} className="text-xs text-[#334155] flex items-start gap-2">
                                  <span className="text-[#b91c1c] font-bold">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="pt-2 border-t border-[#f1f5f9] flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block mb-0.5">
                              Scheduled date when available
                            </span>
                            <p className="text-sm font-bold text-[#1a3a5c]">
                              {selected.reInspectionDate || 'Pending schedule by department officer'}
                            </p>
                          </div>
                          <span className="text-[11px] font-semibold text-[#b91c1c] bg-[#fee2e2] px-2.5 py-1 rounded border border-[#fca5a5]">
                            Mandatory Re-audit
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Observations Section with Submit Correction */}
                  {selected.observations.length > 0 && (
                    <div className="space-y-4">
                      <div className="border-b border-[#e2e8f0] pb-2 flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-bold text-[#1a3a5c]">Inspection Observations & Rectification</h3>
                          <p className="text-xs text-[#64748b]">Specific non-compliances flagged during on-site walk-through</p>
                        </div>
                        <span className="text-xs font-semibold text-[#b91c1c]">
                          {selected.observations.length} Observations Recorded
                        </span>
                      </div>

                      {selected.observations.map(obs => {
                        const isSubmitted = Boolean(obsSubmitted[obs.id]) || obs.responseState === 'Submitted' || obs.responseState === 'Accepted';
                        const currentResponse = obsSubmitted[obs.id]?.response || obsResponses[obs.id] || obs.submittedResponse || '';
                        const currentFile = obsSubmitted[obs.id]?.file || obsEvidenceFiles[obs.id] || obs.submittedEvidenceDoc || null;
                        const submissionDate = obsSubmitted[obs.id]?.date || obs.submittedAt || null;

                        return (
                          <div
                            key={obs.id}
                            className={`bg-white border rounded p-5 space-y-4 ${
                              isSubmitted ? 'border-[#86efac]' : 'border-[#fca5a5] shadow-2xs'
                            }`}
                          >
                            {/* Observation Header */}
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f1f5f9] pb-3">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-[#b91c1c] bg-[#fff1f2] px-2 py-0.5 border border-[#fecaca] rounded-sm">
                                  OBSERVATION
                                </span>
                                <span className="font-mono text-xs font-bold text-[#64748b]">{obs.id}</span>
                                <span className="text-xs font-semibold text-[#1a3a5c]">— {obs.checklistItem}</span>
                              </div>
                              {obsResponseBadge(isSubmitted ? 'Submitted' : obs.responseState)}
                            </div>

                            {/* What Was Found */}
                            <div className="space-y-1 text-xs">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">
                                What was found
                              </span>
                              <p className="text-[#334155] leading-relaxed bg-[#f8f9fb] p-3 border border-[#e2e8f0] rounded">
                                {obs.whatWasFound || obs.description}
                              </p>
                            </div>

                            {/* What Needs to Be Corrected */}
                            <div className="space-y-1 text-xs">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#b91c1c]">
                                What needs to be corrected
                              </span>
                              <p className="text-[#334155] leading-relaxed bg-[#fff1f2] p-3 border border-[#fecaca] rounded font-medium">
                                {obs.whatNeedsToBeCorrected || obs.requiredCorrection}
                              </p>
                            </div>

                            {/* Evidence Required */}
                            {(obs.evidenceRequired || obs.evidenceTypeNeeded) && (
                              <div className="space-y-1 text-xs">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">
                                  Evidence required
                                </span>
                                <p className="text-[#334155] leading-relaxed bg-white p-2.5 border border-[#e2e8f0] rounded">
                                  {obs.evidenceRequired || obs.evidenceTypeNeeded}
                                </p>
                              </div>
                            )}

                            {/* Post-submission State */}
                            {isSubmitted && (
                              <div className="bg-[#f0fdf4] border border-[#86efac] p-4 rounded text-xs space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-[#166534] flex items-center gap-1.5">
                                    <span>✓</span> Correction Submitted
                                  </span>
                                  {submissionDate && <span className="text-[#15803d] font-mono text-[11px]">{submissionDate}</span>}
                                </div>
                                <p className="text-[#166534] leading-relaxed">
                                  <strong>Applicant Explanation:</strong> {currentResponse}
                                </p>
                                {currentFile && (
                                  <div className="flex items-center gap-2 pt-1 font-mono text-[11px] text-[#15803d]">
                                    <span>📎 Attached Evidence:</span>
                                    <span className="underline">{currentFile}</span>
                                  </div>
                                )}
                                <p className="text-[11px] text-[#15803d] italic pt-1">
                                  Status: Correction logged. Inspecting officer will review during technical scrutiny or scheduled re-inspection.
                                </p>
                              </div>
                            )}

                            {/* Interactive Submit Correction Form */}
                            {!isSubmitted && (
                              <div className="pt-2 border-t border-[#f1f5f9] space-y-3">
                                <div>
                                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a3a5c] block mb-1.5">
                                    Submit correction
                                  </label>
                                  <textarea
                                    rows={3}
                                    value={obsResponses[obs.id] || ''}
                                    onChange={e => setObsResponses(prev => ({ ...prev, [obs.id]: e.target.value }))}
                                    placeholder="Describe specific rectification completed on site (e.g. pressure relief valve recalibrated to 7.0 kg/cm², emergency exit doorway cleared of stored materials)..."
                                    className="w-full text-xs border border-[#d1d9e0] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#1a56db] rounded resize-y bg-white"
                                  />
                                </div>

                                {/* Evidence Upload & Simulator */}
                                <div className="space-y-2">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b] block">
                                    Attach Rectification Evidence (PDF / Geotagged Photo)
                                  </span>
                                  <div className="flex flex-wrap items-center gap-3">
                                    <input
                                      type="file"
                                      id={`upload-${obs.id}`}
                                      className="text-xs text-[#64748b] file:mr-3 file:py-1.5 file:px-3 file:rounded file:border file:border-[#d1d9e0] file:text-xs file:font-semibold file:bg-[#f8f9fb] file:text-[#334155] hover:file:bg-[#e2e8f0]"
                                      onChange={e => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          setObsEvidenceFiles(prev => ({ ...prev, [obs.id]: file.name }));
                                        }
                                      }}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleSimulateUpload(obs.id)}
                                      className="text-xs bg-[#eef2ff] hover:bg-[#e0e7ff] text-[#3730a3] border border-[#c7d2fe] px-2.5 py-1.5 rounded font-semibold transition-colors inline-flex items-center gap-1"
                                    >
                                      <span>⚡ Simulate Upload</span>
                                    </button>
                                  </div>

                                  {obsEvidenceFiles[obs.id] && (
                                    <div className="flex items-center justify-between p-2 bg-[#f8f9fb] border border-[#d1d9e0] rounded text-xs">
                                      <span className="font-mono text-[#334155]">{obsEvidenceFiles[obs.id]}</span>
                                      <button
                                        type="button"
                                        onClick={() => setObsEvidenceFiles(prev => {
                                          const copy = { ...prev };
                                          delete copy[obs.id];
                                          return copy;
                                        })}
                                        className="text-[#b91c1c] hover:underline text-[11px]"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  )}
                                </div>

                                <div className="pt-2 flex items-center justify-between">
                                  <button
                                    type="button"
                                    onClick={() => handleSubmitCorrection(obs)}
                                    className="bg-[#1a3a5c] text-white px-4 py-2 rounded text-xs font-bold hover:bg-[#0f2540] transition-colors border border-[#1a3a5c]"
                                  >
                                    Submit Correction for {obs.id} →
                                  </button>
                                  <span className="text-[11px] text-[#64748b]">
                                    Submission updates inspection ledger immediately
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Scheduled state action info */}
                  {selected.observations.length === 0 && !isReinspection && (
                    <div className="bg-white border border-[#e2e8f0] rounded p-5 text-center text-xs space-y-2">
                      <p className="font-bold text-[#1a3a5c] text-sm">No Pending Corrective Actions</p>
                      <p className="text-[#64748b] max-w-[450px] mx-auto">
                        This inspection has no pending deficiency observations or re-inspection requirements. 
                        Ensure on-site preparation is complete if scheduled, or await final committee scrutiny.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Primary Action Widget */}
              <div className={`bg-white border rounded p-4 space-y-3 ${
                hasActionRequired ? 'border-[#fca5a5]' : 'border-[#e2e8f0]'
              }`}>
                <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1a3a5c]">Operational Status</h4>
                  {insStatusBadge(selected.status)}
                </div>
                <div className="text-xs text-[#334155] space-y-2">
                  <p className="font-medium">
                    {selected.actionRequired || (hasActionRequired ? 'Corrective action pending' : 'No action required')}
                  </p>
                  <p className="text-[11px] text-[#64748b]">
                    Next Event: {selected.date} ({selected.time})
                  </p>
                </div>
              </div>

              {/* Related Applications */}
              <div className="bg-white border border-[#e2e8f0] rounded p-4 space-y-3">
                <h4 className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider border-b border-[#f1f5f9] pb-2">
                  Related Applications
                </h4>
                <div className="space-y-2 text-xs">
                  {selected.relatedAppIds.map(id => (
                    findTrackerAppForBusiness(project.id, id) ? (
                      <Link
                        key={id}
                        href={ENTREPRENEUR_ROUTES.application(project.id, id)}
                        className="font-mono text-[#1a56db] hover:underline block font-medium"
                      >
                        {id} →
                      </Link>
                    ) : (
                      <span
                        key={id}
                        className="font-mono text-[#94a3b8] block"
                        title="Application record is not bound to this business"
                      >
                        {id}
                      </span>
                    )
                  ))}
                </div>
              </div>

              {/* Inspection Lifecycle Steps */}
              <div className="bg-white border border-[#e2e8f0] rounded p-4 space-y-3">
                <h4 className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider border-b border-[#f1f5f9] pb-2">
                  Inspection Lifecycle
                </h4>
                <div className="space-y-1.5">
                  {([
                    'Required',
                    'Awaiting Schedule',
                    'Scheduled',
                    'Completed',
                    'Observation Raised',
                    'Correction Submitted',
                    'Re-inspection Required',
                    'Resolved',
                  ] as InspectionStatus[]).map(s => {
                    const isCurrent = s === selected.status;
                    const statuses: InspectionStatus[] = [
                      'Required',
                      'Awaiting Schedule',
                      'Scheduled',
                      'Completed',
                      'Observation Raised',
                      'Correction Submitted',
                      'Re-inspection Required',
                      'Resolved',
                    ];
                    const currentIdx = statuses.indexOf(selected.status);
                    const thisIdx = statuses.indexOf(s);
                    const isPast = thisIdx < currentIdx;

                    return (
                      <div
                        key={s}
                        className={`text-[11px] flex items-center justify-between ${
                          isCurrent
                            ? 'font-bold text-[#1a3a5c] bg-[#f1f5f9] px-2 py-1 rounded'
                            : isPast
                            ? 'text-[#15803d]'
                            : 'text-[#94a3b8]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              isCurrent ? 'bg-[#1a56db]' : isPast ? 'bg-[#15803d]' : 'bg-[#e2e8f0]'
                            }`}
                          />
                          <span>{s}</span>
                        </div>
                        {isCurrent && <span className="text-[9px] uppercase tracking-wider text-[#1a56db] font-bold">Current</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Links */}
              <div className="bg-white border border-[#e2e8f0] rounded p-4 space-y-2 text-xs">
                <h4 className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider border-b border-[#f1f5f9] pb-2 mb-2">
                  Navigation
                </h4>
                <Link href={ENTREPRENEUR_ROUTES.applications(project.id)} className="text-[#1a56db] hover:underline block">
                  Application Tracker →
                </Link>
                <Link href={ENTREPRENEUR_ROUTES.journey(project.id)} className="text-[#1a56db] hover:underline block">
                  Regulatory Journey →
                </Link>
                <Link href={ENTREPRENEUR_ROUTES.dependencies(project.id)} className="text-[#1a56db] hover:underline block">
                  Dependency Graph →
                </Link>
                <Link href={ENTREPRENEUR_ROUTES.documents(project.id)} className="text-[#1a56db] hover:underline block">
                  Document Centre →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // LIST VIEW (Inspection Centre Hub)
  // ─────────────────────────────────────────────────────────────────────────────
  const upcomingCount = inspections.filter(i => i.status === 'Scheduled' || i.status === 'Awaiting Schedule').length;
  const actionCount = inspections.filter(i => i.status === 'Observation Raised' || i.status === 'Re-inspection Required' || Boolean(i.actionRequired)).length;
  const resolvedCount = inspections.filter(i => i.status === 'Resolved' || i.status === 'Completed').length;

  const filteredInspections = inspections.filter(i => {
    if (listFilter === 'upcoming') return i.status === 'Scheduled' || i.status === 'Awaiting Schedule';
    if (listFilter === 'action') return i.status === 'Observation Raised' || i.status === 'Re-inspection Required' || Boolean(i.actionRequired);
    if (listFilter === 'completed') return i.status === 'Resolved' || i.status === 'Completed';
    return true;
  });

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      {/* Header Bar */}
      <div className="bg-white border-b border-[#d1d9e0] px-6 py-4">
        <div className="max-w-[1280px] mx-auto">
          <nav aria-label="Breadcrumb" className="text-xs text-[#6b7a8d] mb-2 flex items-center gap-1.5">
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#1a3a5c] hover:underline">
              Dashboard
            </Link>
            <span>›</span>
            <span className="text-[#1a3a5c] font-medium">Inspection Centre</span>
          </nav>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-[#1a3a5c]">Inspection Centre</h1>
              <p className="text-xs text-[#6b7a8d] mt-0.5">
                {project.name} · {project.location} · Ease of Doing Business Joint Inspections
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={ENTREPRENEUR_ROUTES.journey(project.id)}
                className="text-xs border border-[#d1d9e0] text-[#475569] px-3 py-1.5 hover:bg-[#f1f5f9] rounded font-medium"
              >
                Regulatory Journey
              </Link>
              <Link
                href={ENTREPRENEUR_ROUTES.dependencies(project.id)}
                className="text-xs border border-[#d1d9e0] text-[#475569] px-3 py-1.5 hover:bg-[#f1f5f9] rounded font-medium"
              >
                Dependency Graph
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-6 space-y-6">
        {/* Metric Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white border border-[#e2e8f0] p-4 rounded">
            <p className="text-2xl font-bold text-[#1a3a5c]">{inspections.length}</p>
            <p className="text-xs text-[#64748b] mt-0.5">Total Inspections</p>
            <span className="text-[10px] text-[#94a3b8] mt-1 block">All registered site visits</span>
          </div>

          <div className="bg-white border border-[#e2e8f0] p-4 rounded">
            <p className="text-2xl font-bold text-[#1d4ed8]">{upcomingCount}</p>
            <p className="text-xs text-[#64748b] mt-0.5">Upcoming Inspection</p>
            <span className="text-[10px] text-[#1d4ed8] font-medium mt-1 block">Scheduled visits pending</span>
          </div>

          <div className="bg-white border border-[#e2e8f0] p-4 rounded">
            <p className="text-2xl font-bold text-[#b91c1c]">{actionCount}</p>
            <p className="text-xs text-[#64748b] mt-0.5">Action Required</p>
            <span className="text-[10px] text-[#b91c1c] font-medium mt-1 block">Observations / Re-inspections</span>
          </div>

          <div className="bg-white border border-[#e2e8f0] p-4 rounded">
            <p className="text-2xl font-bold text-[#15803d]">{resolvedCount}</p>
            <p className="text-xs text-[#64748b] mt-0.5">Inspection Record</p>
            <span className="text-[10px] text-[#15803d] font-medium mt-1 block">Resolved / Satisfactory</span>
          </div>
        </div>

        {/* Coordinated Inspection Banner */}
        <div className="bg-[#f0f9ff] border border-[#bae6fd] p-4 rounded flex items-center justify-between text-xs text-[#0369a1]">
          <div className="flex items-center gap-3">
            <span className="text-xl">🤝</span>
            <div>
              <p className="font-bold text-sm text-[#075985]">Single Window Coordinated Site Inspections</p>
              <p className="text-[#0c4a6e] mt-0.5">
                Multiple departments (MIDC, Fire, DISH, MPCB) conduct joint site inspections on a single synchronized day 
                to eliminate repeated visits and minimize downtime.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-[#0369a1] bg-white border border-[#bae6fd] px-2.5 py-1 rounded shrink-0">
            Maharashtra EoDB Standard
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="border-b border-[#d1d9e0] flex items-center gap-2">
          {[
            { id: 'all', label: 'All Inspections', count: inspections.length },
            { id: 'upcoming', label: 'Upcoming Inspection', count: upcomingCount },
            { id: 'action', label: 'Action Required', count: actionCount },
            { id: 'completed', label: 'Completed / History', count: resolvedCount },
          ].map(f => (
            <button
              key={f.id}
              type="button"
              onClick={() => setListFilter(f.id as any)}
              className={`px-4 py-2.5 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
                listFilter === f.id
                  ? 'border-[#1a3a5c] text-[#1a3a5c] bg-white'
                  : 'border-transparent text-[#64748b] hover:text-[#1a3a5c]'
              }`}
            >
              <span>{f.label}</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 bg-[#f1f5f9] text-[#475569] rounded">
                {f.count}
              </span>
            </button>
          ))}
        </div>

        {/* Inspections Table */}
        <div className="bg-white border border-[#e2e8f0] rounded overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-[#f8f9fb] border-b border-[#e2e8f0]">
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-[#64748b] uppercase tracking-wider border-r border-[#e8edf2]">
                    Inspection ID & Type
                  </th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-[#64748b] uppercase tracking-wider border-r border-[#e8edf2]">
                    Department(s)
                  </th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-[#64748b] uppercase tracking-wider border-r border-[#e8edf2]">
                    When (Date / Time)
                  </th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-[#64748b] uppercase tracking-wider border-r border-[#e8edf2]">
                    Site
                  </th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-[#64748b] uppercase tracking-wider border-r border-[#e8edf2]">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-[#64748b] uppercase tracking-wider border-r border-[#e8edf2]">
                    Action Required
                  </th>
                  <th className="text-right px-4 py-3 text-[10px] font-bold text-[#64748b] uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {filteredInspections.map(ins => {
                  const isAction = ins.status === 'Observation Raised' || ins.status === 'Re-inspection Required' || Boolean(ins.actionRequired);
                  return (
                    <tr
                      key={ins.id}
                      className="hover:bg-[#f8f9fb] transition-colors cursor-pointer"
                      onClick={() => setSelectedId(ins.id)}
                    >
                      <td className="px-4 py-3.5 border-r border-[#f1f5f9]">
                        <div className="space-y-0.5">
                          <span className="font-mono font-bold text-[#1a3a5c] block hover:underline">
                            {ins.id}
                          </span>
                          <span className="text-[#334155] font-semibold block">{ins.type}</span>
                          {ins.coordinated && (
                            <span className="text-[9px] font-semibold text-[#3730a3] bg-[#e0e7ff] px-1.5 py-0.2 rounded inline-block">
                              Joint Coordinated
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap text-[#475569] font-medium border-r border-[#f1f5f9]">
                        {ins.departments.join(' + ')}
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap border-r border-[#f1f5f9]">
                        <span className="font-semibold text-[#1a3a5c] block">{ins.date}</span>
                        <span className="text-[11px] text-[#64748b]">{ins.time} IST</span>
                      </td>

                      <td className="px-4 py-3.5 text-[#475569] max-w-[200px] border-r border-[#f1f5f9] truncate">
                        {ins.site}
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap border-r border-[#f1f5f9]">
                        {insStatusBadge(ins.status)}
                      </td>

                      <td className="px-4 py-3.5 min-w-[200px] border-r border-[#f1f5f9]">
                        {ins.actionRequired ? (
                          <span className={`font-semibold block ${isAction ? 'text-[#b91c1c]' : 'text-[#1a3a5c]'}`}>
                            {ins.actionRequired}
                          </span>
                        ) : (
                          <span className="text-[#94a3b8]">No action required</span>
                        )}
                      </td>

                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            setSelectedId(ins.id);
                          }}
                          className="text-xs font-semibold text-[#1a56db] hover:underline"
                        >
                          View Details →
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filteredInspections.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-xs text-[#94a3b8]">
                      No inspections found matching the selected filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Guidance */}
        <div className="p-4 bg-white border border-[#e2e8f0] rounded flex flex-wrap items-center justify-between text-xs text-[#64748b] gap-3">
          <p>
            Need to upload compliance certificates or verify required drawings? Visit the{' '}
            <Link href={ENTREPRENEUR_ROUTES.documents(project.id)} className="text-[#1a56db] font-semibold hover:underline">
              Document Centre
            </Link>
            .
          </p>
          <div className="flex items-center gap-3">
            <Link href={ENTREPRENEUR_ROUTES.applications(project.id)} className="text-[#1a56db] hover:underline">
              Application Tracker
            </Link>
            <span>·</span>
            <Link href={ENTREPRENEUR_ROUTES.journey(project.id)} className="text-[#1a56db] hover:underline">
              Regulatory Journey
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
