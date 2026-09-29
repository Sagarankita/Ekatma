'use client';

import React, { useState } from 'react';
import { InspStatus, InspRow, InspOutcome, CheckStatus, CheckItem, ObsRecord, ObsState, M24Event } from '@/domain/types';

// ── Shared Icons ─────────────────────────────────────────────────────────────
function SvgSearch() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function SvgClose() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SvgCalendar() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function SvgUpload() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function SvgFile() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function SvgCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ── Status and Metadata Helpers ──────────────────────────────────────────────
export const INSP_STATUS_MAP: Record<InspStatus, { label: string; bg: string; text: string; border: string }> = {
  PENDING:                { label: 'Pending',                 bg: 'bg-[#fff7ed]', text: 'text-[#9a3412]',  border: 'border-[#fdba74]' },
  SCHEDULED:              { label: 'Scheduled',               bg: 'bg-[#edf5ef]', text: 'text-[#539160]',  border: 'border-[#a1cba9]' },
  IN_PROGRESS:            { label: 'In Progress',             bg: 'bg-[#fefce8]', text: 'text-[#854d0e]',  border: 'border-[#fde047]' },
  COMPLETED:              { label: 'Completed',               bg: 'bg-[#ecfdf5]', text: 'text-[#065f46]',  border: 'border-[#6ee7b7]' },
  CANCELLED:              { label: 'Cancelled',               bg: 'bg-[#f3f4f6]', text: 'text-[#4A4A4A]',  border: 'border-[#d1d5db]' },
  RE_INSPECTION_REQUIRED: { label: 'Re-inspection Required',  bg: 'bg-[#fef2f2]', text: 'text-[#991b1b]',  border: 'border-[#fca5a5]' },
  AWAITING_COORDINATION:  { label: 'Awaiting Coordination',   bg: 'bg-[#f5f3ff]', text: 'text-[#5b21b6]',  border: 'border-[#c4b5fd]' },
  NEEDS_VERIFICATION:     { label: 'Needs Verification',      bg: 'bg-[#edf5ef]', text: 'text-[#539160]',  border: 'border-[#a1cba9]' },
};

export const OUTCOME_META: Record<InspOutcome, { label: string; bg: string; text: string; border: string; desc: string }> = {
  PASS:                   { label: 'PASS',                   bg: 'bg-[#ecfdf5]', text: 'text-[#065f46]', border: 'border-[#6ee7b7]', desc: 'No further inspection action identified.' },
  OBSERVATION:            { label: 'OBSERVATION',            bg: 'bg-[#fdf8e6]', text: 'text-[#7a5807]', border: 'border-[#fae69e]', desc: 'Observation recorded; follow-up action required.' },
  NON_COMPLIANT:          { label: 'NON-COMPLIANT',          bg: 'bg-[#fef2f2]', text: 'text-[#991b1b]', border: 'border-[#fca5a5]', desc: 'Recorded findings indicate statutory non-compliance.' },
  CORRECTION_REQUIRED:    { label: 'CORRECTION REQUIRED',    bg: 'bg-[#fff7ed]', text: 'text-[#9a3412]', border: 'border-[#fdba74]', desc: 'Entrepreneur correction required before workflow continues.' },
  RE_INSPECTION_REQUIRED: { label: 'RE-INSPECTION REQUIRED', bg: 'bg-[#f5f3ff]', text: 'text-[#5b21b6]', border: 'border-[#c4b5fd]', desc: 'Follow-up on-site re-inspection required.' },
};

export const EVENT_TYPE_STYLE: Record<string, { bg: string; text: string; dot: string }> = {
  INSPECTION:            { bg: 'bg-[#edf5ef]', text: 'text-[#539160]', dot: 'bg-[#539160]' },
  OBSERVATION:           { bg: 'bg-[#fff7ed]', text: 'text-[#9a3412]', dot: 'bg-[#9a3412]' },
  CORRECTION_REQUESTED:  { bg: 'bg-[#fef2f2]', text: 'text-[#991b1b]', dot: 'bg-[#dc2626]' },
  ENTREPRENEUR_RESPONSE: { bg: 'bg-[#ecfdf5]', text: 'text-[#065f46]', dot: 'bg-[#059669]' },
  NEW_EVIDENCE:          { bg: 'bg-[#ecfdf5]', text: 'text-[#065f46]', dot: 'bg-[#059669]' },
  OFFICER_REVIEW:        { bg: 'bg-[#fdf8e6]', text: 'text-[#7a5807]', dot: 'bg-[#D4A017]' },
  RE_INSPECTION:         { bg: 'bg-[#f5f3ff]', text: 'text-[#5b21b6]', dot: 'bg-[#7c3aed]' },
  RESOLVED:              { bg: 'bg-[#ecfdf5]', text: 'text-[#065f46]', dot: 'bg-[#059669]' },
};

// ── Canonical Inspection Records Fixture ──────────────────────────────────────
export const INSPECTION_RECORDS_DATA: InspRow[] = [
  { inspId: 'INSP-2026-00418', appId: 'MIDC-APP-2026-00418', business: 'Aster Precision Components Pvt. Ltd.', service: 'Building / Planning', site: 'Example MIDC Estate / Plot A-18', inspType: 'Building / Planning Site Inspection', requiredBy: '25 Sep 2026', status: 'COMPLETED', assigned: 'Building / Planning Inspection Team', targetDate: '25 Sep 2026', slaImpact: 'Resolved', reInspection: true, source: 'Configured service workflow' },
  { inspId: 'INSP-2026-00391', appId: 'MIDC-APP-2026-00391', business: 'Kalyan Agro Industries Ltd.', service: 'Water / Utility', site: 'Chakan Phase II / Plot B-07', inspType: 'Utility Site Inspection', requiredBy: '26 Sep 2026', status: 'SCHEDULED', assigned: 'MIDC Utility Inspection Team', targetDate: '26 Sep 2026', slaImpact: 'Within SLA', reInspection: false, source: 'Configured service workflow' },
  { inspId: 'INSP-2026-00372', appId: 'MIDC-APP-2026-00372', business: 'Sunrise Pharmaceuticals Pvt. Ltd.', service: 'Building / Planning', site: 'Taloja MIDC / Plot C-12', inspType: 'Building / Planning - Re-inspection', requiredBy: '28 Sep 2026', status: 'RE_INSPECTION_REQUIRED', assigned: 'Building Inspection Team B', targetDate: '28 Sep 2026', slaImpact: 'SLA Risk', reInspection: true, source: 'Observation outcome' },
  { inspId: 'INSP-2026-00411', appId: 'MIDC-APP-2026-00411', business: 'Puretech Engineering Pvt. Ltd.', service: 'Building / Planning', site: 'Butibori MIDC / Plot D-03', inspType: 'Building / Planning Site Inspection', requiredBy: '30 Sep 2026', status: 'AWAITING_COORDINATION', assigned: 'Building Inspection Team A', targetDate: '30 Sep 2026', slaImpact: 'Due Soon', reInspection: false, source: 'Building scrutiny finding' },
  { inspId: 'INSP-2026-00398', appId: 'MIDC-APP-2026-00398', business: 'Vidarbha Food Processing Ltd.', service: 'Water / Utility', site: 'Nagpur MIDC / Plot E-22', inspType: 'Utility Site Inspection', requiredBy: '01 Oct 2026', status: 'NEEDS_VERIFICATION', assigned: 'Unassigned', targetDate: 'Not Scheduled', slaImpact: 'Within SLA', reInspection: false, source: 'Water scrutiny finding' },
];

// ── Authoritative Chronological Timeline Fixture ─────────────────────────────
export const AUTHORITATIVE_INSPECTION_TIMELINE: M24Event[] = [
  { date: '25 Sep 2026', type: 'INSPECTION',           id: 'INSP-2026-00418',    title: 'Inspection Conducted',         detail: 'Building / Planning Site Inspection conducted by MIDC inspection team.', actor: 'Building / Planning Inspection Team', status: 'Correction Required' },
  { date: '25 Sep 2026', type: 'OBSERVATION',          id: 'OBS-2026-00418-01',  title: 'Observation Recorded',         detail: 'Submitted building plan v2 does not reflect current project parameters (building area 2,300 m²).', actor: 'Inspection Officer', evidence: 'Building Plan v2' },
  { date: '26 Sep 2026', type: 'CORRECTION_REQUESTED', id: 'DEF-2026-0092',      title: 'Correction Requested',         detail: 'Provide corrected building plan reflecting current project configuration.', actor: 'MIDC Officer', status: 'Linked to QRY-2026-0042' },
  { date: '28 Sep 2026', type: 'ENTREPRENEUR_RESPONSE',id: 'QRY-2026-0042',      title: 'Entrepreneur Response',        detail: 'Entrepreneur uploaded corrected building plan v3 with amended architectural schedule.', actor: 'Entrepreneur', evidence: 'Building Plan v3' },
  { date: '28 Sep 2026', type: 'NEW_EVIDENCE',         id: 'BUILD-PLAN-00418-v3',title: 'New Evidence Submitted',        detail: 'Corrected Building Plan v3 uploaded by entrepreneur for on-site verification.', actor: 'Entrepreneur', evidence: 'Building Plan v3' },
  { date: '29 Sep 2026', type: 'OFFICER_REVIEW',       id: 'REVIEW-001',         title: 'Officer Review',               detail: 'Evidence reviewed by planning desk. Plan v3 conforms on paper; on-site re-inspection required.', actor: 'MIDC Officer', status: 'Re-inspection Required' },
  { date: '01 Oct 2026', type: 'RE_INSPECTION',        id: 'INSP-2026-00418-R1', title: 'Re-inspection Scheduled',      detail: 'Re-inspection scheduled with joint Fire and MIDC planning team.', actor: 'MIDC Officer', status: 'Scheduled' },
  { date: '01 Oct 2026', type: 'INSPECTION',           id: 'INSP-2026-00418-R1', title: 'Re-inspection Conducted',      detail: 'Re-inspection conducted on-site. Verified plot boundaries and revised building setbacks conform to plan v3.', actor: 'Building / Planning Inspection Team', status: 'Pass' },
  { date: '01 Oct 2026', type: 'RESOLVED',             id: 'OBS-2026-00418-01',  title: 'Observation Resolved',         detail: 'On-site verification confirms compliance with plan v3. Observation OBS-2026-00418-01 resolved.', actor: 'Inspection Officer', status: 'Resolved' },
];

// ── Common 6-Section Checklist Types and Fixture ─────────────────────────────
export type ChecklistSectionKey = 'SITE IDENTITY' | 'PLOT / LAND' | 'BUILDING / PLANNING' | 'APPLICATION DATA' | 'DOCUMENTS' | 'SITE CONDITIONS';

export interface OperationalChecklistItem {
  id: string;
  section: ChecklistSectionKey;
  item: string;
  status: 'Checked' | 'Observation' | 'Not Compliant' | 'Not Applicable';
  observationReason: string;
}

export const INITIAL_OPERATIONAL_CHECKLIST: OperationalChecklistItem[] = [
  // 1. SITE IDENTITY
  { id: 'c1', section: 'SITE IDENTITY', item: 'Site identity matches application', status: 'Checked', observationReason: '' },

  // 2. PLOT / LAND
  { id: 'c2', section: 'PLOT / LAND', item: 'Plot boundaries confirmed', status: 'Checked', observationReason: '' },
  { id: 'c3', section: 'PLOT / LAND', item: 'Plot area matches application', status: 'Checked', observationReason: '' },

  // 3. BUILDING / PLANNING
  { id: 'c4', section: 'BUILDING / PLANNING', item: 'Building plan reflects current project', status: 'Observation', observationReason: 'Submitted building plan v2 does not reflect current project parameters (building area 2,300 m²).' },
  { id: 'c5', section: 'BUILDING / PLANNING', item: 'Building height/floors conform', status: 'Checked', observationReason: '' },

  // 4. APPLICATION DATA
  { id: 'c6', section: 'APPLICATION DATA', item: 'Application data matches site conditions', status: 'Checked', observationReason: '' },

  // 5. DOCUMENTS
  { id: 'c7', section: 'DOCUMENTS', item: 'Required documents available', status: 'Checked', observationReason: '' },
  { id: 'c8', section: 'DOCUMENTS', item: 'Current versions verified', status: 'Observation', observationReason: 'Land survey map is an older version and requires current plot boundary confirmation.' },

  // 6. SITE CONDITIONS
  { id: 'c9', section: 'SITE CONDITIONS', item: 'Site accessible', status: 'Checked', observationReason: '' },
  { id: 'c10', section: 'SITE CONDITIONS', item: 'Required conditions verified', status: 'Checked', observationReason: '' },
];

export interface UploadedEvidenceItem {
  id: string;
  filename: string;
  type: 'Photo' | 'Document' | 'Site record' | 'Other configured evidence';
  uploadedBy: string;
  date: string;
  relatedChecklistItem: string;
}

export const INITIAL_EVIDENCE_ITEMS: UploadedEvidenceItem[] = [
  {
    id: 'ev-1',
    filename: 'Building_Plan_v3.pdf',
    type: 'Document',
    uploadedBy: 'Entrepreneur',
    date: '28 Sep 2026',
    relatedChecklistItem: 'Building plan reflects current project',
  },
  {
    id: 'ev-2',
    filename: 'Site_Boundary_Survey.jpg',
    type: 'Photo',
    uploadedBy: 'Inspection Officer',
    date: '25 Sep 2026',
    relatedChecklistItem: 'Plot boundaries confirmed',
  },
];

export const REINSPECTION_CALENDAR_SLOTS = [
  { date: '25 Sep 2026', time: '10:30 AM', midc: 'Available', fire: 'Available', dish: 'Not Required', state: 'Available' },
  { date: '26 Sep 2026', time: '09:00 AM', midc: 'Available', fire: 'Unavailable', dish: 'Not Required', state: 'Unavailable' },
  { date: '27 Sep 2026', time: '11:00 AM', midc: 'Available', fire: 'Coordination Pending', dish: 'Not Required', state: 'Needs coordination' },
  { date: '28 Sep 2026', time: '02:30 PM', midc: 'Available', fire: 'Available', dish: 'Not Required', state: 'Available' },
  { date: '29 Sep 2026', time: '11:30 AM', midc: 'Available', fire: 'Coordination Pending', dish: 'Not Required', state: 'Needs coordination' },
  { date: '30 Sep 2026', time: '10:00 AM', midc: 'Available', fire: 'Available', dish: 'Not Required', state: 'Available' },
];

// =============================================================================
// PAGE 1: INSPECTION RECORDS ("What happened?")
// =============================================================================
export function InspectionRecordsPage({
  applicationId,
  onOpenWorkspace,
  onOpenDecision,
  onBack,
}: {
  applicationId?: string;
  onOpenWorkspace?: (appId: string, inspId: string) => void;
  onOpenDecision?: (appId: string) => void;
  onBack?: () => void;
}) {
  const allRows = applicationId ? INSPECTION_RECORDS_DATA.filter(r => r.appId === applicationId) : INSPECTION_RECORDS_DATA;
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [selectedRecord, setSelectedRecord] = useState<InspRow | null>(() => (applicationId ? allRows[0] ?? null : null));
  const [selectedEvent, setSelectedEvent] = useState<M24Event | null>(AUTHORITATIVE_INSPECTION_TIMELINE[1]);

  const filteredRows = allRows.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.appId.toLowerCase().includes(q) || r.inspId.toLowerCase().includes(q) || r.business.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All' || INSP_STATUS_MAP[r.status]?.label === statusFilter;
    const matchService = serviceFilter === 'All' || r.service === serviceFilter;
    return matchSearch && matchStatus && matchService;
  });

  // If a record is selected, show the Inspection Record Detail with Authoritative Timeline
  if (selectedRecord) {
    const isCompletedOrResolved = selectedRecord.status === 'COMPLETED' || selectedRecord.slaImpact === 'Resolved';
    const isObservationResolved = true; // Timeline demonstrates observation resolution

    return (
      <div className="flex-1 flex flex-col bg-[#F9FAF2] min-h-0">
        {/* Top Breadcrumb & Back */}
        <div className="bg-white border-b border-[#e3ebe1] px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#4A4A4A]">
            <button onClick={() => { setSelectedRecord(null); onBack?.(); }} className="hover:text-[#355E3B] font-semibold text-[#6DAE7C]">
              Inspection Records
            </button>
            <span>/</span>
            <span className="font-mono text-[#2B2B2B] font-bold">{selectedRecord.inspId}</span>
            <span>/</span>
            <span>Record Detail & Timeline</span>
          </div>
          <button
            onClick={() => setSelectedRecord(null)}
            className="text-xs font-semibold text-[#355E3B] hover:underline flex items-center gap-1"
          >
            ← Back to All Inspection Records
          </button>
        </div>

        {/* Inspection Record Detail Header */}
        <div className="bg-white border-b border-[#e3ebe1] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-x-8 gap-y-2 items-start">
            <div>
              <div className="text-[10px] text-[#4A4A4A] uppercase font-bold">Inspection ID</div>
              <div className="font-mono text-sm font-bold text-[#355E3B]">{selectedRecord.inspId}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#4A4A4A] uppercase font-bold">Application ID</div>
              <div className="font-mono text-sm font-semibold text-[#2B2B2B]">{selectedRecord.appId}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#4A4A4A] uppercase font-bold">Business</div>
              <div className="text-sm font-semibold text-[#2B2B2B]">{selectedRecord.business}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#4A4A4A] uppercase font-bold">Original Inspection Date</div>
              <div className="text-xs font-semibold text-[#2B2B2B]">{selectedRecord.targetDate || '25 Sep 2026'}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#4A4A4A] uppercase font-bold">Original Outcome</div>
              <span className="text-[10px] font-bold bg-[#fff7ed] text-[#9a3412] border border-[#fdba74] px-2 py-0.5 rounded">
                CORRECTION REQUIRED
              </span>
            </div>
            <div>
              <div className="text-[10px] text-[#4A4A4A] uppercase font-bold">Resolution State</div>
              <span className="text-[10px] font-bold bg-[#ecfdf5] text-[#065f46] border border-[#6ee7b7] px-2 py-0.5 rounded">
                RESOLVED
              </span>
            </div>
          </div>

          {/* Primary Actions from Record */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenWorkspace?.(selectedRecord.appId, selectedRecord.inspId)}
              className="px-4 py-2 text-xs font-bold text-white bg-[#355E3B] hover:bg-[#27472c] rounded shadow-sm transition-colors cursor-pointer"
            >
              {isCompletedOrResolved ? 'View Inspection Workspace' : 'Open Inspection Workspace'}
            </button>
            {isObservationResolved && onOpenDecision && (
              <button
                onClick={() => onOpenDecision(selectedRecord.appId)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#065f46] hover:bg-[#044e39] rounded shadow-sm transition-colors cursor-pointer"
              >
                Proceed to Decision →
              </button>
            )}
          </div>
        </div>

        {/* Timeline & Detail Area */}
        <div className="flex flex-1 overflow-hidden min-h-0 p-6 gap-6">
          {/* Left: Authoritative Chronological Timeline */}
          <div className="flex-1 bg-white border border-[#e3ebe1] rounded-lg flex flex-col overflow-hidden">
            <div className="px-5 py-3 border-b border-[#e3ebe1] flex items-center justify-between bg-[#F9FAF2]">
              <div className="text-xs font-bold text-[#2B2B2B]">Authoritative Inspection Timeline</div>
              <span className="text-[10px] text-[#4A4A4A] font-medium">9 Chronological Events · Immutable Audit Trail</span>
            </div>

            <div className="overflow-y-auto flex-1 p-6">
              <div className="relative">
                {/* Vertical timeline line */}
                <div className="absolute left-4 top-2 bottom-4 w-0.5 bg-[#e3ebe1]" />
                <div className="space-y-4 pl-10">
                  {AUTHORITATIVE_INSPECTION_TIMELINE.map((ev, i) => {
                    const s = EVENT_TYPE_STYLE[ev.type] ?? { bg: 'bg-[#f3f4f6]', text: 'text-[#4A4A4A]', dot: 'bg-[#8c9f8a]' };
                    const isSelected = selectedEvent?.id === ev.id && selectedEvent?.title === ev.title;
                    return (
                      <div key={i} className="relative">
                        {/* Dot */}
                        <div className={`absolute -left-10 top-2 w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs ${s.dot}`} />
                        <button
                          onClick={() => setSelectedEvent(ev)}
                          className={`w-full text-left rounded-lg border p-3.5 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#6DAE7C] bg-[#edf5ef] shadow-xs'
                              : 'border-[#e3ebe1] bg-white hover:border-[#a1cba9] hover:bg-[#fbfcfe]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded ${s.bg} ${s.text}`}>
                                  {ev.type.replace(/_/g, ' ')}
                                </span>
                                <span className="font-mono text-[10px] text-[#4A4A4A] font-semibold">{ev.id}</span>
                              </div>
                              <div className="text-xs font-bold text-[#2B2B2B]">{ev.title}</div>
                              <div className="text-xs text-[#4A4A4A] mt-0.5">{ev.detail}</div>
                              {ev.evidence && (
                                <div className="text-[10px] text-[#2B2B2B] mt-1 font-medium">
                                  Evidence: <span className="font-semibold text-[#6DAE7C]">{ev.evidence}</span>
                                </div>
                              )}
                              {ev.status && (
                                <span className={`inline-block text-[9px] font-bold mt-1.5 px-1.5 py-0.5 rounded border ${
                                  ev.status === 'Pass' || ev.status === 'Resolved'
                                    ? 'bg-[#ecfdf5] text-[#065f46] border-[#6ee7b7]'
                                    : 'bg-[#fff7ed] text-[#9a3412] border-[#fdba74]'
                                }`}>
                                  {ev.status}
                                </span>
                              )}
                            </div>
                            <div className="shrink-0 text-right">
                              <div className="text-[11px] font-semibold text-[#2B2B2B]">{ev.date}</div>
                              <div className="text-[10px] text-[#4A4A4A] mt-0.5">{ev.actor}</div>
                            </div>
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Event Detail Drawer */}
          <div className="w-80 shrink-0 bg-white border border-[#e3ebe1] rounded-lg p-5 flex flex-col gap-4 overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-[#e3ebe1]">
              <div className="text-[10px] font-bold text-[#4A4A4A] uppercase tracking-wider">Event Detail</div>
              <span className="text-[10px] font-mono text-[#6DAE7C] bg-[#edf5ef] px-2 py-0.5 rounded">Audit Record</span>
            </div>

            {selectedEvent ? (
              <>
                <div className="rounded-lg p-3 bg-[#F9FAF2] border border-[#e3ebe1]">
                  <div className="text-[9px] font-bold uppercase text-[#4A4A4A]">{selectedEvent.type.replace(/_/g, ' ')}</div>
                  <div className="text-xs font-bold text-[#2B2B2B] mt-0.5">{selectedEvent.title}</div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#4A4A4A] text-[10px] uppercase font-bold">Identifier</span>
                    <span className="font-mono font-semibold text-[#2B2B2B]">{selectedEvent.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4A4A4A] text-[10px] uppercase font-bold">Date</span>
                    <span className="font-medium text-[#2B2B2B]">{selectedEvent.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4A4A4A] text-[10px] uppercase font-bold">Actor</span>
                    <span className="font-medium text-[#2B2B2B]">{selectedEvent.actor}</span>
                  </div>
                  {selectedEvent.evidence && (
                    <div className="flex justify-between">
                      <span className="text-[#4A4A4A] text-[10px] uppercase font-bold">Evidence</span>
                      <span className="font-semibold text-[#6DAE7C]">{selectedEvent.evidence}</span>
                    </div>
                  )}
                  {selectedEvent.status && (
                    <div className="flex justify-between">
                      <span className="text-[#4A4A4A] text-[10px] uppercase font-bold">Status</span>
                      <span className="font-semibold text-[#2B2B2B]">{selectedEvent.status}</span>
                    </div>
                  )}
                </div>

                <div>
                  <div className="text-[10px] font-bold text-[#4A4A4A] uppercase tracking-wider mb-1">Description</div>
                  <div className="text-xs text-[#2B2B2B] bg-[#F9FAF2] border border-[#e3ebe1] rounded p-2.5 leading-relaxed">
                    {selectedEvent.detail}
                  </div>
                </div>

                {/* Immutable Audit Trail Notice */}
                <div className="bg-[#fdf8e6] border border-[#fae69e] rounded p-3 text-[11px] text-[#7a5807]">
                  <div className="font-bold mb-0.5">Immutable Audit Trail</div>
                  <div>This record is cryptographically logged and permanent. Re-inspections create linked chronological entries rather than overwriting past findings.</div>
                </div>

                {/* Workflow Boundary Rule */}
                <div className="bg-[#ecfdf5] border border-[#a7f3d0] rounded p-3 text-[11px] text-[#065f46]">
                  <div className="font-bold mb-0.5">Observation Resolved != Application Approved</div>
                  <div>The inspection finding has been resolved. Statutory final approval remains governed by the Decision Workspace.</div>
                </div>
              </>
            ) : (
              <div className="text-xs text-[#4A4A4A] text-center py-10">Select an event from the timeline to view details.</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, show the simple History / Records Table
  return (
    <div className="flex-1 flex flex-col bg-[#F9FAF2] min-h-0">
      {/* Header */}
      <div className="bg-white border-b border-[#e3ebe1] px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-[#2B2B2B]">Inspection Records</h1>
          <p className="text-xs text-[#4A4A4A] mt-0.5">Authoritative history and resolution tracking across MIDC industrial units.</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border-b border-[#e3ebe1] px-6 py-2.5 flex items-center gap-3 flex-wrap">
        <div className="relative">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search Application, Inspection ID, Business..."
            className="pl-7 pr-3 py-1.5 text-xs border border-[#d6dfd5] rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#6DAE7C] w-80"
          />
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[#4A4A4A] pointer-events-none">
            <SvgSearch />
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-[#4A4A4A] font-bold uppercase">Status</span>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="text-xs border border-[#d6dfd5] rounded px-2.5 py-1 bg-white focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Re-inspection Required">Re-inspection Required</option>
            <option value="Awaiting Coordination">Awaiting Coordination</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-[#4A4A4A] font-bold uppercase">Service</span>
          <select
            value={serviceFilter}
            onChange={e => setServiceFilter(e.target.value)}
            className="text-xs border border-[#d6dfd5] rounded px-2.5 py-1 bg-white focus:outline-none"
          >
            <option value="All">All Services</option>
            <option value="Building / Planning">Building / Planning</option>
            <option value="Water / Utility">Water / Utility</option>
          </select>
        </div>
      </div>

      {/* Primary Records Table */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-white border border-[#e3ebe1] rounded-lg overflow-x-auto shadow-xs">
          <table className="w-full text-xs text-left border-collapse min-w-[900px]">
            <thead className="bg-[#F9FAF2] border-b border-[#e3ebe1] text-[#4A4A4A]">
              <tr>
                {['Application ID', 'Inspection ID', 'Business', 'Service', 'Inspection Type', 'Inspection Date', 'Inspector / Team', 'Outcome', 'Current Resolution State', 'SLA', 'Action'].map(h => (
                  <th key={h} className="px-3.5 py-3 font-bold uppercase text-[10px] tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F9FAF2]">
              {filteredRows.map(row => {
                const sMeta = INSP_STATUS_MAP[row.status];
                return (
                  <tr key={row.inspId} className="hover:bg-[#fbfcfe] transition-colors">
                    <td className="px-3.5 py-3 font-mono font-bold text-[#6DAE7C]">{row.appId}</td>
                    <td className="px-3.5 py-3 font-mono text-[#4A4A4A]">{row.inspId}</td>
                    <td className="px-3.5 py-3 font-semibold text-[#2B2B2B]">{row.business}</td>
                    <td className="px-3.5 py-3 text-[#2B2B2B]">{row.service}</td>
                    <td className="px-3.5 py-3 text-[#4A4A4A]">{row.inspType}</td>
                    <td className="px-3.5 py-3 text-[#2B2B2B] whitespace-nowrap">{row.targetDate}</td>
                    <td className="px-3.5 py-3 text-[#4A4A4A]">{row.assigned}</td>
                    <td className="px-3.5 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${sMeta?.bg} ${sMeta?.text} ${sMeta?.border}`}>
                        {sMeta?.label}
                      </span>
                    </td>
                    <td className="px-3.5 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                        row.slaImpact === 'Resolved' ? 'bg-[#ecfdf5] text-[#065f46]' : 'bg-[#fff7ed] text-[#9a3412]'
                      }`}>
                        {row.slaImpact}
                      </span>
                    </td>
                    <td className="px-3.5 py-3 text-[#4A4A4A] whitespace-nowrap">{row.requiredBy}</td>
                    <td className="px-3.5 py-3">
                      <button
                        onClick={() => setSelectedRecord(row)}
                        className="px-3 py-1.5 text-xs font-bold text-white bg-[#355E3B] hover:bg-[#27472c] rounded transition-colors cursor-pointer"
                      >
                        OPEN
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredRows.length === 0 && (
                <tr>
                  <td colSpan={11} className="px-6 py-12 text-center text-xs text-[#4A4A4A]">
                    No inspection records found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// SUBPAGE: SCHEDULE RE-INSPECTION (Focused action launched from Workspace)
// =============================================================================
export function ScheduleReinspectionSubpage({
  applicationId = 'MIDC-APP-2026-00418',
  inspectionId = 'INSP-2026-00418',
  business = 'Aster Precision Components Pvt. Ltd.',
  onBackToWorkspace,
}: {
  applicationId?: string;
  inspectionId?: string;
  business?: string;
  onBackToWorkspace: () => void;
}) {
  const [selectedSlot, setSelectedSlot] = useState<typeof REINSPECTION_CALENDAR_SLOTS[0] | null>(REINSPECTION_CALENDAR_SLOTS[0]);
  const [team, setTeam] = useState('Building / Planning Inspection Team');
  const [jointDepts, setJointDepts] = useState<{ midc: boolean; fire: boolean; dish: boolean }>({
    midc: true,
    fire: true,
    dish: false,
  });
  const [noticeSent, setNoticeSent] = useState(false);
  const [noticeTimestamp, setNoticeTimestamp] = useState('');

  function handleSendNotice() {
    setNoticeSent(true);
    const now = new Date();
    setNoticeTimestamp(`${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
  }

  return (
    <div className="flex-1 flex flex-col bg-[#F9FAF2] min-h-0">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#e3ebe1] px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-[#4A4A4A]">
          <span className="text-[#6DAE7C] font-semibold cursor-pointer" onClick={onBackToWorkspace}>Inspection Records</span>
          <span>/</span>
          <span className="text-[#6DAE7C] font-semibold cursor-pointer" onClick={onBackToWorkspace}>Inspection Workspace</span>
          <span>/</span>
          <span className="font-bold text-[#2B2B2B]">Schedule Re-inspection</span>
        </div>
        <button
          onClick={onBackToWorkspace}
          className="text-xs font-semibold text-[#355E3B] hover:underline"
        >
          ← Back to Inspection Workspace
        </button>
      </div>

      {/* Top Application Header */}
      <div className="bg-white border-b border-[#e3ebe1] px-6 py-3.5 flex flex-wrap gap-x-8 gap-y-2 items-start">
        <div>
          <div className="text-[10px] text-[#4A4A4A] uppercase font-bold">Action</div>
          <div className="text-sm font-bold text-[#355E3B]">Schedule Re-inspection</div>
        </div>
        <div>
          <div className="text-[10px] text-[#4A4A4A] uppercase font-bold">Application ID</div>
          <div className="font-mono text-sm font-semibold text-[#2B2B2B]">{applicationId}</div>
        </div>
        <div>
          <div className="text-[10px] text-[#4A4A4A] uppercase font-bold">Inspection ID</div>
          <div className="font-mono text-sm font-semibold text-[#2B2B2B]">{inspectionId}</div>
        </div>
        <div>
          <div className="text-[10px] text-[#4A4A4A] uppercase font-bold">Business</div>
          <div className="text-sm font-semibold text-[#2B2B2B]">{business}</div>
        </div>
        <div>
          <div className="text-[10px] text-[#4A4A4A] uppercase font-bold">Original Inspection Date</div>
          <div className="text-xs font-semibold text-[#2B2B2B]">25 Sep 2026</div>
        </div>
        <div>
          <div className="text-[10px] text-[#4A4A4A] uppercase font-bold">Original Outcome</div>
          <span className="text-[10px] font-bold bg-[#fff7ed] text-[#9a3412] border border-[#fdba74] px-2 py-0.5 rounded">
            CORRECTION REQUIRED
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden min-h-0 p-6 gap-6">
        {/* Left: Reason for Re-inspection + Interactive Calendar */}
        <div className="flex-1 flex flex-col gap-5 overflow-y-auto">
          {/* Reason for Re-inspection (Auto-populated Unresolved Observation) */}
          <div className="bg-[#fff7ed] border border-[#fdba74] rounded-lg p-4">
            <div className="text-[10px] font-bold text-[#9a3412] uppercase tracking-wider mb-1">
              Reason for Re-inspection (Unresolved Observation)
            </div>
            <div className="flex items-start gap-3 mt-1">
              <span className="text-xs font-bold text-[#9a3412] bg-[#ffedd5] px-2 py-0.5 rounded shrink-0">
                Building Plan · Correction required
              </span>
              <p className="text-xs text-[#7c2d12] leading-relaxed">
                Submitted building plan v2 does not reflect current project parameters. Building area confirmed at 2,300 m² on site versus 2,000 m² on approved drawing. Revised plan v3 submitted by entrepreneur requires on-site setback and height re-verification.
              </p>
            </div>
          </div>

          {/* Interactive Scheduling Calendar */}
          <div className="bg-white border border-[#e3ebe1] rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xs font-bold text-[#2B2B2B]">Inspection Calendar Slots</h3>
                <p className="text-[11px] text-[#4A4A4A]">Select date and time window for follow-up on-site inspection.</p>
              </div>
              <div className="flex items-center gap-3 text-[10px]">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#059669]" />Available</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#7c3aed]" />Needs coordination</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]" />Unavailable</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {REINSPECTION_CALENDAR_SLOTS.map((slot, i) => {
                const isSelected = selectedSlot?.date === slot.date && selectedSlot?.time === slot.time;
                const isAvail = slot.state === 'Available';
                const isCoord = slot.state === 'Needs coordination';

                return (
                  <button
                    key={i}
                    onClick={() => setSelectedSlot(slot)}
                    className={`text-left p-3.5 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#355E3B] bg-[#edf5ef] ring-2 ring-[#355E3B]'
                        : isAvail
                        ? 'border-[#6ee7b7] bg-[#ecfdf5] hover:bg-[#d1fae5]'
                        : isCoord
                        ? 'border-[#c4b5fd] bg-[#f5f3ff] hover:bg-[#ede9fe]'
                        : 'border-[#fca5a5] bg-[#fef2f2] opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#2B2B2B]">{slot.date}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        isAvail ? 'bg-[#d1fae5] text-[#065f46]' : isCoord ? 'bg-[#ede9fe] text-[#5b21b6]' : 'bg-[#fee2e2] text-[#991b1b]'
                      }`}>
                        {slot.state}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-[#355E3B]">{slot.time}</div>
                    <div className="text-[10px] text-[#4A4A4A] mt-1 space-y-0.5">
                      <div>MIDC: <span className="font-medium">{slot.midc}</span></div>
                      <div>Fire: <span className="font-medium">{slot.fire}</span></div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Inspector and Participating Departments */}
            <div className="mt-5 pt-4 border-t border-[#e3ebe1] grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-[#4A4A4A] uppercase block mb-1">Inspection Team / Inspector</label>
                <select
                  value={team}
                  onChange={e => setTeam(e.target.value)}
                  className="w-full text-xs border border-[#d6dfd5] rounded px-3 py-2 bg-white"
                >
                  <option value="Building / Planning Inspection Team">Building / Planning Inspection Team (Lead)</option>
                  <option value="Senior Executive Engineer Team">Senior Executive Engineer Team</option>
                  <option value="Special Compliance Taskforce">Special Compliance Taskforce</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#4A4A4A] uppercase block mb-1">Joint Inspection Authorities</label>
                <div className="space-y-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={jointDepts.midc} disabled className="rounded text-[#355E3B]" />
                    <span className="text-[#2B2B2B] font-medium">MIDC Building Planning (Mandatory Lead)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={jointDepts.fire}
                      onChange={e => setJointDepts(prev => ({ ...prev, fire: e.target.checked }))}
                      className="rounded text-[#355E3B]"
                    />
                    <span className="text-[#2B2B2B]">Fire Safety Department (Joint on-site check)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Notice Preview & Dispatch */}
        <div className="w-88 shrink-0 bg-white border border-[#e3ebe1] rounded-lg p-5 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div className="pb-2 border-b border-[#e3ebe1] flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#4A4A4A] uppercase tracking-wider">Re-inspection Notice Preview</span>
              <span className="text-[10px] font-bold text-[#065f46] bg-[#ecfdf5] px-2 py-0.5 rounded">Form INSP-N1</span>
            </div>

            <div className="bg-[#F9FAF2] border border-[#e3ebe1] rounded-lg p-4 space-y-2 text-xs">
              <div>
                <span className="text-[10px] font-bold text-[#4A4A4A] uppercase block">Scheduled Date & Time</span>
                <span className="font-bold text-[#355E3B] text-sm">{selectedSlot?.date} at {selectedSlot?.time}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#4A4A4A] uppercase block">Location</span>
                <span className="font-medium text-[#2B2B2B]">Example MIDC Estate, Plot A-18</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#4A4A4A] uppercase block">Inspection Purpose</span>
                <span className="text-[#2B2B2B]">Verify on-site compliance of revised Building Plan v3 parameters.</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#4A4A4A] uppercase block">Required Documents on Site</span>
                <span className="text-[#2B2B2B]">Corrected Building Plan v3, Plot lease deed copy, architectural certificate.</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#4A4A4A] uppercase block">Required Representative</span>
                <span className="text-[#2B2B2B]">Authorised Architect / Technical Representative</span>
              </div>
            </div>

            {noticeSent && (
              <div className="bg-[#ecfdf5] border-2 border-[#059669] rounded-lg p-4 space-y-1.5 animate-fadeIn">
                <div className="flex items-center gap-2 text-xs font-bold text-[#065f46]">
                  <SvgCheck />
                  Re-inspection Scheduled
                </div>
                <div className="text-xs text-[#065f46]">
                  Notice Status: <span className="font-bold">SENT</span>
                </div>
                <div className="text-[10px] text-[#065f46]">
                  Dispatched at: {noticeTimestamp}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#e3ebe1] space-y-2">
            {!noticeSent ? (
              <button
                onClick={handleSendNotice}
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#355E3B] hover:bg-[#27472c] rounded shadow-sm transition-colors cursor-pointer"
              >
                Send Re-inspection Notice
              </button>
            ) : (
              <button
                onClick={onBackToWorkspace}
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#065f46] hover:bg-[#044e39] rounded shadow-sm transition-colors cursor-pointer"
              >
                Back to Inspection Workspace
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// PAGE 2: INSPECTION WORKSPACE ("What am I doing now?")
// =============================================================================
export function InspectionWorkspacePage({
  applicationId = 'MIDC-APP-2026-00418',
  inspectionId = 'INSP-2026-00418',
  business = 'Aster Precision Components Pvt. Ltd.',
  service = 'Building / Planning',
  inspectionDate = '25 Sep 2026',
  inspector = 'Building / Planning Inspection Team',
  onBack,
  onOpenRecords,
  onOpenDocReview,
  onOpenDecision,
}: {
  applicationId?: string;
  inspectionId?: string;
  business?: string;
  service?: string;
  inspectionDate?: string;
  inspector?: string;
  onBack?: () => void;
  onOpenRecords?: () => void;
  onOpenDocReview?: (id: string) => void;
  onOpenDecision?: () => void;
}) {
  const [showReinspectionSubpage, setShowReinspectionSubpage] = useState(false);
  const [checklist, setChecklist] = useState<OperationalChecklistItem[]>(INITIAL_OPERATIONAL_CHECKLIST);
  const [evidenceList, setEvidenceList] = useState<UploadedEvidenceItem[]>(INITIAL_EVIDENCE_ITEMS);
  const [outcome, setOutcome] = useState<InspOutcome>('CORRECTION_REQUIRED');
  const [correctionReason, setCorrectionReason] = useState('Submitted building plan v2 does not reflect the current project parameters (building area 2,300 m²).');
  const [requiredCorrection, setRequiredCorrection] = useState('Provide corrected building plan reflecting the current project configuration.');
  const [observationText, setObservationText] = useState('Submitted building plan v2 does not reflect current project parameters. Building area confirmed at 2,300 m² on site versus 2,000 m² on drawing.');
  const [recommendationText, setRecommendationText] = useState('Corrected building plan required. Schedule re-inspection after correction is reviewed.');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Upload modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadType, setUploadType] = useState<UploadedEvidenceItem['type']>('Document');
  const [uploadRelatedItem, setUploadRelatedItem] = useState(INITIAL_OPERATIONAL_CHECKLIST[3].item);

  // Preview evidence modal state
  const [previewEvidence, setPreviewEvidence] = useState<UploadedEvidenceItem | null>(null);

  // Toggle item status
  function handleCheckStatus(id: string, status: OperationalChecklistItem['status']) {
    setChecklist(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  }

  // Update inline observation reason
  function handleObservationReason(id: string, reason: string) {
    setChecklist(prev => prev.map(c => c.id === id ? { ...c, observationReason: reason } : c));
  }

  // Confirm new evidence upload
  function handleConfirmUpload() {
    if (!uploadFileName.trim()) return;
    const newItem: UploadedEvidenceItem = {
      id: `ev-${Date.now()}`,
      filename: uploadFileName.trim(),
      type: uploadType,
      uploadedBy: 'Inspection Officer',
      date: '27 Sep 2026',
      relatedChecklistItem: uploadRelatedItem,
    };
    setEvidenceList(prev => [newItem, ...prev]);
    setUploadFileName('');
    setShowUploadModal(false);
  }

  // Remove evidence
  function handleRemoveEvidence(id: string) {
    setEvidenceList(prev => prev.filter(e => e.id !== id));
  }

  // Save findings
  function handleSaveFindings() {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  }

  // If officer launched Schedule Re-inspection from the workspace
  if (showReinspectionSubpage) {
    return (
      <ScheduleReinspectionSubpage
        applicationId={applicationId}
        inspectionId={inspectionId}
        business={business}
        onBackToWorkspace={() => setShowReinspectionSubpage(false)}
      />
    );
  }

  const sections: ChecklistSectionKey[] = [
    'SITE IDENTITY',
    'PLOT / LAND',
    'BUILDING / PLANNING',
    'APPLICATION DATA',
    'DOCUMENTS',
    'SITE CONDITIONS',
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#F9FAF2] min-h-0">
      {/* Top Breadcrumb & Return Action */}
      <div className="bg-white border-b border-[#e3ebe1] px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-[#4A4A4A]">
          <button onClick={onOpenRecords || onBack} className="hover:text-[#355E3B] font-semibold text-[#6DAE7C]">
            Inspection Records
          </button>
          <span>/</span>
          <span className="font-bold text-[#2B2B2B]">Inspection Workspace</span>
          <span>/</span>
          <span className="font-mono text-[#4A4A4A]">{inspectionId}</span>
        </div>
        <button
          onClick={onOpenRecords || onBack}
          className="text-xs font-semibold text-[#355E3B] hover:underline"
        >
          ← Back to Inspection Records
        </button>
      </div>

      {/* A. Top Application Context Header (Essential fields only) */}
      <div className="bg-white border-b border-[#e3ebe1] px-6 py-3 flex flex-wrap gap-x-8 gap-y-2 items-start">
        <div>
          <div className="text-[10px] text-[#4A4A4A] uppercase font-bold">Application ID</div>
          <div className="font-mono text-sm font-bold text-[#355E3B]">{applicationId}</div>
        </div>
        <div>
          <div className="text-[10px] text-[#4A4A4A] uppercase font-bold">Inspection ID</div>
          <div className="font-mono text-sm font-bold text-[#2B2B2B]">{inspectionId}</div>
        </div>
        <div>
          <div className="text-[10px] text-[#4A4A4A] uppercase font-bold">Business</div>
          <div className="text-sm font-semibold text-[#2B2B2B]">{business}</div>
        </div>
        <div>
          <div className="text-[10px] text-[#4A4A4A] uppercase font-bold">Service</div>
          <div className="text-xs font-medium text-[#2B2B2B]">{service}</div>
        </div>
        <div>
          <div className="text-[10px] text-[#4A4A4A] uppercase font-bold">Inspection Date</div>
          <div className="text-xs font-semibold text-[#2B2B2B]">{inspectionDate}</div>
        </div>
        <div>
          <div className="text-[10px] text-[#4A4A4A] uppercase font-bold">Inspector / Team</div>
          <div className="text-xs text-[#2B2B2B]">{inspector}</div>
        </div>
        <div>
          <div className="text-[10px] text-[#4A4A4A] uppercase font-bold">Application State</div>
          <span className="text-[10px] font-bold bg-[#edf5ef] text-[#539160] border border-[#a1cba9] px-2 py-0.5 rounded">
            INSPECTION_SCHEDULED
          </span>
        </div>
        <div>
          <div className="text-[10px] text-[#4A4A4A] uppercase font-bold">Inspection Status</div>
          <span className="text-[10px] font-bold bg-[#fff7ed] text-[#9a3412] border border-[#fdba74] px-2 py-0.5 rounded">
            Correction Required
          </span>
        </div>
      </div>

      {/* Main Three-Column Officer Workspace */}
      <div className="flex flex-1 overflow-hidden min-h-0 p-5 gap-5">
        {/* B. LEFT: Inspection Context (Factual context & Documents with [View]) */}
        <div className="w-64 shrink-0 flex flex-col gap-4 overflow-y-auto">
          {/* Factual Context */}
          <div className="bg-white border border-[#e3ebe1] rounded-lg p-4">
            <div className="text-[10px] font-bold text-[#4A4A4A] uppercase tracking-wider mb-2.5 pb-1 border-b border-[#F9FAF2]">
              Inspection Context
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#4A4A4A] text-[10px] uppercase font-bold">Business DNA</span>
                <span className="font-mono font-semibold text-[#2B2B2B]">v4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4A4A4A] text-[10px] uppercase font-bold">MIDC Estate</span>
                <span className="font-medium text-[#2B2B2B]">Example Estate</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4A4A4A] text-[10px] uppercase font-bold">Plot</span>
                <span className="font-semibold text-[#355E3B]">Plot A-18</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4A4A4A] text-[10px] uppercase font-bold">Plot Area</span>
                <span className="font-medium text-[#2B2B2B]">5,200 m²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4A4A4A] text-[10px] uppercase font-bold">Building Area</span>
                <span className="font-semibold text-[#9a3412]">2,300 m²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4A4A4A] text-[10px] uppercase font-bold">Project Stage</span>
                <span className="font-medium text-[#2B2B2B]">Construction</span>
              </div>
              <div className="pt-2 border-t border-[#F9FAF2]">
                <span className="text-[10px] font-bold text-[#4A4A4A] uppercase block mb-1">Dependencies</span>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[#4A4A4A]">MPCB CTE</span>
                    <span className="font-semibold text-[#065f46]">Complete</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4A4A4A]">Fire NOC</span>
                    <span className="font-semibold text-[#9a3412]">Conditional</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statutory Documents with [View] action */}
          <div className="bg-white border border-[#e3ebe1] rounded-lg p-4">
            <div className="text-[10px] font-bold text-[#4A4A4A] uppercase tracking-wider mb-2.5 pb-1 border-b border-[#F9FAF2]">
              Statutory Documents
            </div>
            <div className="space-y-2">
              {[
                { name: 'Building Plan v2', id: 'DWG-2026-C14-A02' },
                { name: 'Land / Plot Record', id: 'MIDC-REG-DEED-2024-C14' },
                { name: 'MIDC Application', id: 'MIDC-APP-FORM-2026' },
                { name: 'Site Photographs', id: 'PHOTO-SET-SITE-01' },
              ].map(doc => (
                <div key={doc.name} className="flex items-center justify-between py-1 border-b border-[#F9FAF2] last:border-0">
                  <span className="text-xs font-medium text-[#2B2B2B]">{doc.name}</span>
                  <button
                    onClick={() => onOpenDocReview ? onOpenDocReview(doc.id) : alert(`Opening ${doc.name}`)}
                    className="text-[11px] font-bold text-[#6DAE7C] hover:underline px-2 py-0.5 rounded hover:bg-[#edf5ef] transition-colors cursor-pointer"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* C. CENTER: Common Inspection Checklist + Supporting Evidence */}
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
          {/* Checklist Sections */}
          <div className="bg-white border border-[#e3ebe1] rounded-lg p-5">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#e3ebe1]">
              <div>
                <h2 className="text-xs font-bold text-[#2B2B2B]">Common Inspection Checklist</h2>
                <p className="text-[11px] text-[#4A4A4A]">Primary officer working surface organized across 6 verification sections.</p>
              </div>
              <span className="text-[10px] font-mono text-[#4A4A4A] bg-[#F9FAF2] px-2 py-1 rounded border border-[#e3ebe1]">
                {checklist.filter(c => c.status === 'Checked').length} / {checklist.length} Compliant
              </span>
            </div>

            <div className="space-y-5">
              {sections.map(section => {
                const items = checklist.filter(c => c.section === section);
                return (
                  <div key={section} className="space-y-2.5">
                    <div className="text-[10px] font-bold text-[#355E3B] uppercase tracking-wider bg-[#F9FAF2] px-2.5 py-1 rounded">
                      {section}
                    </div>

                    <div className="space-y-2 pl-1">
                      {items.map(item => {
                        const isObs = item.status === 'Observation';
                        const isNonComp = item.status === 'Not Compliant';
                        const requiresObservationInput = isObs || isNonComp;

                        return (
                          <div key={item.id} className="p-2.5 border border-[#e3ebe1] rounded-md bg-white">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-xs font-semibold text-[#2B2B2B]">{item.item}</span>

                              {/* Status Selector Buttons */}
                              <div className="flex items-center gap-1 shrink-0">
                                {(['Checked', 'Observation', 'Not Compliant', 'Not Applicable'] as const).map(s => {
                                  const isSelected = item.status === s;
                                  return (
                                    <button
                                      key={s}
                                      onClick={() => handleCheckStatus(item.id, s)}
                                      className={`px-2 py-1 text-[10px] font-bold rounded transition-colors cursor-pointer border ${
                                        isSelected
                                          ? s === 'Checked'
                                            ? 'bg-[#ecfdf5] text-[#065f46] border-[#6ee7b7]'
                                            : s === 'Observation'
                                            ? 'bg-[#fff7ed] text-[#9a3412] border-[#fdba74]'
                                            : s === 'Not Compliant'
                                            ? 'bg-[#fef2f2] text-[#991b1b] border-[#fca5a5]'
                                            : 'bg-[#f3f4f6] text-[#4A4A4A] border-[#d1d5db]'
                                          : 'bg-white text-[#4A4A4A] border-[#e3ebe1] hover:bg-[#F9FAF2]'
                                      }`}
                                    >
                                      {s}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Inline Observation Input if Observation or Not Compliant */}
                            {requiresObservationInput && (
                              <div className="mt-2.5 pt-2 border-t border-[#F9FAF2] space-y-1.5 animate-fadeIn">
                                <div className="flex items-center justify-between text-[10px] font-bold text-[#9a3412]">
                                  <span>Observation / reason</span>
                                  <button
                                    onClick={() => {
                                      setUploadRelatedItem(item.item);
                                      setShowUploadModal(true);
                                    }}
                                    className="text-[#6DAE7C] hover:underline cursor-pointer flex items-center gap-1"
                                  >
                                    <SvgUpload /> Add Evidence
                                  </button>
                                </div>
                                <input
                                  type="text"
                                  value={item.observationReason}
                                  onChange={e => handleObservationReason(item.id, e.target.value)}
                                  placeholder="Enter specific finding or reason for non-compliance..."
                                  className="w-full text-xs border border-[#fdba74] bg-[#fffaf0] rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#9a3412]"
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* D. Supporting Evidence Section */}
          <div className="bg-white border border-[#e3ebe1] rounded-lg p-5">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#e3ebe1]">
              <div>
                <h3 className="text-xs font-bold text-[#2B2B2B]">Supporting Evidence</h3>
                <p className="text-[11px] text-[#4A4A4A]">Statutory site photographs, drawings, and verified compliance records.</p>
              </div>
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-3 py-1.5 text-xs font-bold text-white bg-[#355E3B] hover:bg-[#27472c] rounded flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <SvgUpload /> + Upload Evidence
              </button>
            </div>

            {/* Evidence Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-[#F9FAF2] border-b border-[#e3ebe1] text-[#4A4A4A]">
                  <tr>
                    {['Filename', 'Type', 'Uploaded by', 'Date', 'Related checklist item', 'Actions'].map(h => (
                      <th key={h} className="px-3 py-2 text-[10px] font-bold uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F9FAF2]">
                  {evidenceList.map(ev => (
                    <tr key={ev.id} className="hover:bg-[#fbfcfe]">
                      <td className="px-3 py-2.5 font-semibold text-[#2B2B2B] flex items-center gap-1.5">
                        <SvgFile />
                        {ev.filename}
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#f3f4f6] text-[#4A4A4A]">
                          {ev.type}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-[#4A4A4A]">{ev.uploadedBy}</td>
                      <td className="px-3 py-2.5 text-[#4A4A4A] whitespace-nowrap">{ev.date}</td>
                      <td className="px-3 py-2.5 text-[#2B2B2B] max-w-[180px] truncate">{ev.relatedChecklistItem}</td>
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setPreviewEvidence(ev)}
                            className="text-[#6DAE7C] hover:underline font-semibold text-[11px] cursor-pointer"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleRemoveEvidence(ev.id)}
                            className="text-[#991b1b] hover:underline text-[11px] cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {evidenceList.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-xs text-[#4A4A4A]">
                        No evidence uploaded yet. Click + Upload Evidence to add site records.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT: Outcome + Actions + Simplified Officer Observation */}
        <div className="w-80 shrink-0 flex flex-col gap-4 overflow-y-auto">
          {/* E. Inspection Outcome Control */}
          <div className="bg-white border border-[#e3ebe1] rounded-lg p-5">
            <div className="text-[10px] font-bold text-[#4A4A4A] uppercase tracking-wider mb-2 pb-1 border-b border-[#F9FAF2]">
              Inspection Outcome
            </div>

            <div className="space-y-2 mt-2">
              {(['PASS', 'OBSERVATION', 'NON_COMPLIANT', 'CORRECTION_REQUIRED', 'RE_INSPECTION_REQUIRED'] as InspOutcome[]).map(opt => {
                const isSelected = outcome === opt;
                const meta = OUTCOME_META[opt];

                return (
                  <label
                    key={opt}
                    className={`flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? `${meta.bg} ${meta.border} shadow-xs`
                        : 'border-[#e3ebe1] bg-white hover:bg-[#F9FAF2]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="inspOutcome"
                      value={opt}
                      checked={isSelected}
                      onChange={() => setOutcome(opt)}
                      className="mt-0.5 text-[#355E3B]"
                    />
                    <div>
                      <div className={`text-xs font-bold ${isSelected ? meta.text : 'text-[#2B2B2B]'}`}>
                        {meta.label}
                      </div>
                      <div className="text-[10px] text-[#4A4A4A] leading-tight mt-0.5">{meta.desc}</div>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* If Correction Required: Reason + Required Correction + Upload Evidence */}
            {outcome === 'CORRECTION_REQUIRED' && (
              <div className="mt-4 pt-3 border-t border-[#e3ebe1] space-y-3 animate-fadeIn">
                <div>
                  <label className="text-[10px] font-bold text-[#9a3412] uppercase block mb-1">Reason</label>
                  <textarea
                    rows={2}
                    value={correctionReason}
                    onChange={e => setCorrectionReason(e.target.value)}
                    className="w-full text-xs border border-[#fdba74] bg-[#fffaf0] rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#9a3412]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#9a3412] uppercase block mb-1">Required Correction</label>
                  <textarea
                    rows={2}
                    value={requiredCorrection}
                    onChange={e => setRequiredCorrection(e.target.value)}
                    className="w-full text-xs border border-[#fdba74] bg-[#fffaf0] rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#9a3412]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#4A4A4A] uppercase block mb-1">Supporting Evidence</label>
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="w-full py-1.5 px-3 text-xs font-semibold border border-[#d6dfd5] rounded bg-[#F9FAF2] hover:bg-[#F9FAF2] text-[#2B2B2B] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <SvgUpload /> Upload Evidence
                  </button>
                </div>
              </div>
            )}

            {/* If Re-inspection Required: Primary Action [Schedule Re-inspection ->] */}
            {outcome === 'RE_INSPECTION_REQUIRED' && (
              <div className="mt-4 pt-3 border-t border-[#e3ebe1] space-y-2 animate-fadeIn">
                <div className="text-xs text-[#5b21b6] font-medium bg-[#f5f3ff] border border-[#c4b5fd] p-2.5 rounded">
                  Re-inspection required to confirm site conformity after corrective plan resubmission.
                </div>
                <button
                  onClick={() => setShowReinspectionSubpage(true)}
                  className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#5b21b6] hover:bg-[#4c1d95] rounded shadow-sm transition-colors cursor-pointer"
                >
                  Schedule Re-inspection →
                </button>
              </div>
            )}
          </div>

          {/* F. Officer Observation Section */}
          <div className="bg-white border border-[#e3ebe1] rounded-lg p-5 space-y-3">
            <div className="text-[10px] font-bold text-[#4A4A4A] uppercase tracking-wider pb-1 border-b border-[#F9FAF2]">
              Officer Observation
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#4A4A4A] uppercase block mb-1">Observation</label>
              <textarea
                rows={3}
                value={observationText}
                onChange={e => setObservationText(e.target.value)}
                placeholder="What did you find on site?"
                className="w-full text-xs border border-[#d6dfd5] rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#6DAE7C]"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#4A4A4A] uppercase block mb-1">Evidence</label>
              <button
                onClick={() => setShowUploadModal(true)}
                className="w-full py-1.5 px-3 text-xs font-semibold border border-[#d6dfd5] rounded bg-[#F9FAF2] hover:bg-[#F9FAF2] text-[#2B2B2B] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <SvgUpload /> Upload Evidence
              </button>
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#4A4A4A] uppercase block mb-1">Recommendation (Optional)</label>
              <textarea
                rows={2}
                value={recommendationText}
                onChange={e => setRecommendationText(e.target.value)}
                placeholder="Recommendation..."
                className="w-full text-xs border border-[#d6dfd5] rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#6DAE7C]"
              />
            </div>

            <div className="pt-2">
              <button
                onClick={handleSaveFindings}
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#355E3B] hover:bg-[#27472c] rounded shadow-sm transition-colors cursor-pointer"
              >
                Save Inspection Findings
              </button>

              {savedSuccess && (
                <div className="mt-2 text-center text-xs font-bold text-[#065f46] bg-[#ecfdf5] border border-[#6ee7b7] py-1.5 rounded animate-fadeIn">
                  Findings Saved Successfully
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Upload Evidence Modal Dialog */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg border border-[#e3ebe1] shadow-xl w-full max-w-md p-6 space-y-4 animate-scaleIn">
            <div className="flex items-center justify-between pb-2 border-b border-[#e3ebe1]">
              <h3 className="text-sm font-bold text-[#2B2B2B] flex items-center gap-2">
                <SvgUpload /> Upload Supporting Evidence
              </h3>
              <button onClick={() => setShowUploadModal(false)} className="text-[#4A4A4A] hover:text-[#2B2B2B]">
                <SvgClose />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] font-bold text-[#4A4A4A] uppercase block mb-1">Evidence File Name / Title</label>
                <input
                  type="text"
                  value={uploadFileName}
                  onChange={e => setUploadFileName(e.target.value)}
                  placeholder="e.g. Revised_Building_Plan_v3.pdf"
                  className="w-full text-xs border border-[#d6dfd5] rounded px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-[#6DAE7C]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#4A4A4A] uppercase block mb-1">Evidence Type</label>
                <select
                  value={uploadType}
                  onChange={e => setUploadType(e.target.value as UploadedEvidenceItem['type'])}
                  className="w-full text-xs border border-[#d6dfd5] rounded px-3 py-2 bg-white focus:outline-none"
                >
                  <option value="Photo">Photo</option>
                  <option value="Document">Document</option>
                  <option value="Site record">Site record</option>
                  <option value="Other configured evidence">Other configured evidence</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#4A4A4A] uppercase block mb-1">Related Checklist Item</label>
                <select
                  value={uploadRelatedItem}
                  onChange={e => setUploadRelatedItem(e.target.value)}
                  className="w-full text-xs border border-[#d6dfd5] rounded px-3 py-2 bg-white focus:outline-none"
                >
                  {checklist.map(c => (
                    <option key={c.id} value={c.item}>{c.section}: {c.item}</option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-[#F9FAF2] border border-[#e3ebe1] rounded text-[11px] text-[#4A4A4A]">
                Uploaded items are immutably timestamped and linked to Application {applicationId} and Inspection {inspectionId}.
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#e3ebe1]">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-xs font-semibold text-[#4A4A4A] hover:bg-[#f3f4f6] rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmUpload}
                disabled={!uploadFileName.trim()}
                className="px-4 py-2 text-xs font-bold text-white bg-[#355E3B] hover:bg-[#27472c] rounded disabled:opacity-50"
              >
                Upload File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Evidence Modal */}
      {previewEvidence && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg border border-[#e3ebe1] shadow-xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#e3ebe1]">
              <div className="text-sm font-bold text-[#2B2B2B]">{previewEvidence.filename}</div>
              <button onClick={() => setPreviewEvidence(null)} className="text-[#4A4A4A] hover:text-[#2B2B2B]">
                <SvgClose />
              </button>
            </div>

            <div className="bg-[#F9FAF2] border border-[#e3ebe1] rounded p-6 text-center space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#edf5ef] text-[#6DAE7C] flex items-center justify-center">
                <SvgFile />
              </div>
              <div className="text-xs font-semibold text-[#2B2B2B]">{previewEvidence.filename}</div>
              <div className="text-[11px] text-[#4A4A4A]">
                Type: {previewEvidence.type} · Uploaded by {previewEvidence.uploadedBy} on {previewEvidence.date}
              </div>
              <div className="text-[10px] text-[#6DAE7C] font-medium">
                Related to: {previewEvidence.relatedChecklistItem}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setPreviewEvidence(null)}
                className="px-4 py-2 text-xs font-semibold text-[#355E3B] bg-[#edf5ef] rounded hover:bg-[#edf5ef]"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Backward-compatible Aliases ──────────────────────────────────────────────
export function M21InspectionQueuePage({
  applicationId,
  onBack,
  onPlanInspection,
}: {
  applicationId?: string;
  onBack?: () => void;
  onPlanInspection?: (appId: string, inspId: string) => void;
  onOpenDepView?: (appId: string) => void;
  onOpenQueryHistory?: (appId: string) => void;
  onOpenDelta?: (appId: string) => void;
}) {
  return (
    <InspectionRecordsPage
      applicationId={applicationId}
      onOpenWorkspace={onPlanInspection}
      onBack={onBack}
    />
  );
}

export function M22InspectionPlanningPage({
  onBack,
  onBackToQueue,
  onOpenWorkspace,
}: {
  onBack?: () => void;
  onBackToQueue?: () => void;
  onOpenDna?: () => void;
  onOpenDocReview?: (id: string) => void;
  onOpenDepView?: () => void;
  onOpenDelta?: () => void;
  onOpenQueryHistory?: () => void;
  onOpenWorkspace?: () => void;
}) {
  return (
    <ScheduleReinspectionSubpage
      onBackToWorkspace={onOpenWorkspace || onBack || onBackToQueue || (() => {})}
    />
  );
}

export function M23InspectionWorkspacePage({
  onBack,
  onBackToQueue,
  onOpenM24,
  onOpenDocReview,
}: {
  onBack?: () => void;
  onBackToQueue?: () => void;
  onOpenM24?: () => void;
  onOpenDocReview?: (id: string) => void;
  onOpenDna?: () => void;
  onOpenDepView?: () => void;
  onOpenQueryHistory?: () => void;
  onOpenDelta?: () => void;
  onOpenConsistency?: () => void;
}) {
  return (
    <InspectionWorkspacePage
      onBack={onBack}
      onOpenRecords={onBackToQueue || onOpenM24}
      onOpenDocReview={onOpenDocReview}
    />
  );
}

export function M24ObservationReinspectionPage({
  onBack,
  onBackToM23,
}: {
  onBack?: () => void;
  onBackToM23?: () => void;
  onOpenM22?: () => void;
  onOpenDocReview?: (id: string) => void;
  onOpenQueryHistory?: () => void;
  onOpenDelta?: () => void;
  onOpenDepView?: () => void;
}) {
  return (
    <InspectionRecordsPage
      onOpenWorkspace={onBackToM23}
      onBack={onBack}
    />
  );
}
