'use client';

import React, { useState, useMemo } from 'react';
import {
  PHASE_DOC_CONFIG,
  ScrutinyPhaseDocType,
} from './EmbeddedDocumentOcrViewer';

export interface ClauseDeficiencyRecord {
  status: 'approved' | 'rejected' | 'query';
  isFormOpen: boolean;
  observation: string;
  actionRequired: string;
  ruleCitation: string;
  severity: 'critical' | 'moderate' | 'observation';
  isAddedToReport: boolean;
}

export interface DocumentOcrInsightsPageProps {
  applicationId: string;
  documentId?: string;
  phase?: ScrutinyPhaseDocType;
  onBackToWorkflow: () => void;
  onForwardToQuery?: (deficiencies: string[]) => void;
}

// Maps arbitrary document IDs to canonical scrutiny phases
function resolvePhaseFromDocId(docId?: string, fallbackPhase: ScrutinyPhaseDocType = 'land'): ScrutinyPhaseDocType {
  if (!docId) return fallbackPhase;
  const lower = docId.toLowerCase();
  if (lower.includes('deed') || lower.includes('land') || lower.includes('plot')) return 'land';
  if (lower.includes('bldg') || lower.includes('cad') || lower.includes('drawing') || lower.includes('plan') || lower.includes('dwg')) return 'building';
  if (lower.includes('water') || lower.includes('feas') || lower.includes('utility')) return 'water';
  if (lower.includes('concord') || lower.includes('consist')) return 'consistency';
  if (lower.includes('noc') || lower.includes('dep') || lower.includes('clearance')) return 'dependency';
  if (lower.includes('query') || lower.includes('defic') || lower.includes('d1') || lower.includes('form-d1')) return 'query';
  if (lower.includes('delta') || lower.includes('diff') || lower.includes('redline')) return 'delta';
  if (lower.includes('insp') || lower.includes('survey') || lower.includes('site')) return 'inspection';
  return fallbackPhase;
}

export function DocumentOcrInsightsPage({
  applicationId,
  documentId,
  phase: explicitPhase,
  onBackToWorkflow,
  onForwardToQuery,
}: DocumentOcrInsightsPageProps) {
  const activePhase = explicitPhase || resolvePhaseFromDocId(documentId, 'land');
  const config = PHASE_DOC_CONFIG[activePhase] || PHASE_DOC_CONFIG.land;

  // Zoom and view controls for clean document viewer
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);

  // Clause state management: tracks determinations, small form fields, and deficiency report additions
  const [clauseReviews, setClauseReviews] = useState<Record<string, ClauseDeficiencyRecord>>(() => {
    const initial: Record<string, ClauseDeficiencyRecord> = {};
    config.tokens.forEach((tok) => {
      if (tok.status === 'discrepancy') {
        initial[tok.id] = {
          status: 'rejected',
          isFormOpen: true,
          observation: `${tok.label} shortfall: Extracted value ${tok.ocrValue} vs statutory norm ${tok.standardNorm || 'prescribed standard'}.`,
          actionRequired: `Provide revised plan or statutory variance clearance matching ${tok.standardNorm || 'standard'}.`,
          ruleCitation: 'MIDC DCR 2026 Rule 14.2(b)',
          severity: 'critical',
          isAddedToReport: true,
        };
      } else if (tok.status === 'warning') {
        initial[tok.id] = {
          status: 'query',
          isFormOpen: true,
          observation: `Prerequisite condition / formal clarification needed on ${tok.label}: ${tok.declaredValue || tok.ocrValue}.`,
          actionRequired: 'Furnish current renewal endorsement or clarification memo within 15 days.',
          ruleCitation: 'MIDC Regulations Section 8.1',
          severity: 'moderate',
          isAddedToReport: true,
        };
      } else {
        initial[tok.id] = {
          status: 'approved',
          isFormOpen: false,
          observation: `Compliant with standard. Verified by high-confidence statutory OCR (${tok.confidence}%).`,
          actionRequired: 'None (Compliant)',
          ruleCitation: 'Standard Verified',
          severity: 'observation',
          isAddedToReport: false,
        };
      }
    });
    return initial;
  });

  const [notification, setNotification] = useState<string | null>(null);

  function showNotice(msg: string) {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  }

  // Handle clicking Approve, Reject, or Query for a clause
  const handleSelectStatus = (tokenId: string, status: 'approved' | 'rejected' | 'query') => {
    const tok = config.tokens.find((t) => t.id === tokenId);
    setClauseReviews((prev) => {
      const current = prev[tokenId] || {
        status: 'approved',
        isFormOpen: false,
        observation: '',
        actionRequired: '',
        ruleCitation: '',
        severity: 'moderate',
        isAddedToReport: false,
      };

      if (status === 'approved') {
        return {
          ...prev,
          [tokenId]: {
            ...current,
            status: 'approved',
            isFormOpen: false,
            isAddedToReport: false,
            observation: `Compliant with standard. Verified by statutory OCR (${tok?.confidence || 98}%).`,
            actionRequired: 'None (Compliant)',
            ruleCitation: 'Verified Compliant',
          },
        };
      }

      if (status === 'rejected') {
        const observation = current.observation && !current.observation.includes('Compliant')
          ? current.observation
          : `${tok?.label || 'Clause'} shortfall: Extracted value ${tok?.ocrValue || ''} deviates from statutory norm ${tok?.standardNorm || 'prescribed standard'}.`;
        const actionRequired = current.actionRequired && current.actionRequired !== 'None (Compliant)'
          ? current.actionRequired
          : `Submit revised documentation or variance clearance complying with ${tok?.standardNorm || 'statutory norms'}.`;
        const ruleCitation = current.ruleCitation && current.ruleCitation !== 'Verified Compliant'
          ? current.ruleCitation
          : 'MIDC DCR 2026 Rule 14.2';

        return {
          ...prev,
          [tokenId]: {
            ...current,
            status: 'rejected',
            isFormOpen: true,
            isAddedToReport: true,
            observation,
            actionRequired,
            ruleCitation,
            severity: 'critical',
          },
        };
      }

      // Status === 'query'
      const observation = current.observation && !current.observation.includes('Compliant')
        ? current.observation
        : `Clarification required regarding ${tok?.label || 'parameter'}: ${tok?.declaredValue || tok?.ocrValue || ''}.`;
      const actionRequired = current.actionRequired && current.actionRequired !== 'None (Compliant)'
        ? current.actionRequired
        : 'Furnish documentary clarification or joint survey verification within 15 days.';
      const ruleCitation = current.ruleCitation && current.ruleCitation !== 'Verified Compliant'
        ? current.ruleCitation
        : 'MIDC Regulations Section 6.1';

      return {
        ...prev,
        [tokenId]: {
          ...current,
          status: 'query',
          isFormOpen: true,
          isAddedToReport: true,
          observation,
          actionRequired,
          ruleCitation,
          severity: 'moderate',
        },
      };
    });

    if (status === 'approved') {
      showNotice(`${tok?.label || 'Clause'} marked as Approved & Compliant.`);
    } else if (status === 'rejected') {
      showNotice(`${tok?.label || 'Clause'} marked as Rejected. Added to Deficiencies Report.`);
    } else {
      showNotice(`${tok?.label || 'Clause'} marked for Query. Added to Deficiencies Report.`);
    }
  };

  const updateObservation = (tokenId: string, value: string) => {
    setClauseReviews((prev) => ({
      ...prev,
      [tokenId]: {
        ...prev[tokenId],
        observation: value,
      },
    }));
  };

  const updateActionRequired = (tokenId: string, value: string) => {
    setClauseReviews((prev) => ({
      ...prev,
      [tokenId]: {
        ...prev[tokenId],
        actionRequired: value,
      },
    }));
  };

  const updateRuleCitation = (tokenId: string, value: string) => {
    setClauseReviews((prev) => ({
      ...prev,
      [tokenId]: {
        ...prev[tokenId],
        ruleCitation: value,
      },
    }));
  };

  const updateSeverity = (tokenId: string, value: 'critical' | 'moderate' | 'observation') => {
    setClauseReviews((prev) => ({
      ...prev,
      [tokenId]: {
        ...prev[tokenId],
        severity: value,
      },
    }));
  };

  const handleToggleAddToReport = (tokenId: string) => {
    setClauseReviews((prev) => {
      const current = prev[tokenId];
      const nextAdded = !current.isAddedToReport;
      return {
        ...prev,
        [tokenId]: {
          ...current,
          isAddedToReport: nextAdded,
        },
      };
    });
    const tok = config.tokens.find((t) => t.id === tokenId);
    showNotice(
      clauseReviews[tokenId]?.isAddedToReport
        ? `${tok?.label || 'Clause'} removed from Deficiencies Report.`
        : `${tok?.label || 'Clause'} recorded in Deficiencies Report.`
    );
  };

  // Compile deficiencies list from all clauses added to report with status rejected or query
  const deficienciesList = useMemo(() => {
    return config.tokens
      .filter((tok) => {
        const review = clauseReviews[tok.id];
        return review && review.isAddedToReport && (review.status === 'rejected' || review.status === 'query');
      })
      .map((tok) => {
        const review = clauseReviews[tok.id];
        return {
          tokenId: tok.id,
          label: tok.label,
          field: tok.field,
          ocrValue: tok.ocrValue,
          declaredValue: tok.declaredValue || 'N/A',
          standardNorm: tok.standardNorm || 'Statutory Norm',
          status: review.status,
          observation: review.observation,
          actionRequired: review.actionRequired,
          ruleCitation: review.ruleCitation,
          severity: review.severity,
          confidence: tok.confidence,
        };
      });
  }, [config.tokens, clauseReviews]);

  const approvedCount = useMemo(() => {
    return Object.values(clauseReviews).filter((r) => r.status === 'approved').length;
  }, [clauseReviews]);

  const rejectedCount = useMemo(() => {
    return Object.values(clauseReviews).filter((r) => r.status === 'rejected').length;
  }, [clauseReviews]);

  const queryCount = useMemo(() => {
    return Object.values(clauseReviews).filter((r) => r.status === 'query').length;
  }, [clauseReviews]);

  const handleExportReport = () => {
    showNotice('Official Deficiencies Report (Form D-1 / Statutory Memo) generated and exported.');
  };

  const handleForwardToQueryWorkflow = () => {
    const queryItems = deficienciesList.map(
      (d) => `${d.label} [${d.ruleCitation}]: ${d.observation} (Action: ${d.actionRequired})`
    );
    if (onForwardToQuery) {
      onForwardToQuery(queryItems);
    } else {
      showNotice(`${deficienciesList.length} deficiency items forwarded to Consolidated Query Builder.`);
    }
  };

  const handleSaveAll = () => {
    showNotice('All officer determinations, remarks, and deficiency forms saved to statutory application record.');
  };

  return (
    <div className="min-h-screen bg-[#F9FAF2] text-[#2B2B2B] pb-16">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-[#1e293b] text-white text-xs px-4 py-3 rounded-lg shadow-lg border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span>✓</span>
          <span>{notification}</span>
        </div>
      )}

      {/* Top Sticky Navigation Bar */}
      <div className="bg-white border-b border-[#c8d4c7] sticky top-0 z-20 shadow-xs">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToWorkflow}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#c8d4c7] rounded-md bg-white hover:bg-slate-50 text-xs font-bold text-[#2B2B2B] transition-colors shadow-xs"
            >
              ← Back to Scrutiny Workflow
            </button>
            <div className="h-4 w-px bg-slate-300 hidden sm:block" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {applicationId}
                </span>
                <span className="text-xs text-slate-500">/</span>
                <h1 className="text-sm font-bold text-slate-900">
                  Document OCR Insights & Approvals
                </h1>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Review extracted OCR findings, record determinations, and compile statutory deficiency reports.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#deficiencies-report"
              className="px-3 py-1.5 bg-amber-50 text-amber-900 border border-amber-300 rounded-md text-xs font-bold hover:bg-amber-100 transition-colors shadow-xs flex items-center gap-1.5"
            >
              <span> Deficiencies Report ({deficienciesList.length})</span>
            </a>
            <button
              type="button"
              onClick={handleSaveAll}
              className="px-3.5 py-1.5 bg-[#6DAE7C] text-white rounded-md text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs"
            >
              Save Determinations ✓
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Document Header Card */}
        <div className="bg-white border border-[#c8d4c7] rounded-xl p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-300 font-mono">
                {config.docNumber}
              </span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                {config.docCategory}
              </span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                 OCR Processed ({config.overallConfidence}% Accuracy)
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">{config.docTitle}</h2>
            <p className="text-xs text-slate-600">
              Issuer: <strong>{config.issuer}</strong> · Date of Issue / Registration: <strong>{config.date}</strong>
            </p>
          </div>

          <div className="flex items-center gap-4 border-l border-slate-200 pl-4">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Clauses</span>
              <span className="text-lg font-bold text-slate-900">{config.tokens.length}</span>
            </div>
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-700 block">Approved</span>
              <span className="text-lg font-bold text-emerald-700">{approvedCount}</span>
            </div>
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-red-700 block">Rejected</span>
              <span className="text-lg font-bold text-red-700">{rejectedCount}</span>
            </div>
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-amber-700 block">Queries</span>
              <span className="text-lg font-bold text-amber-700">{queryCount}</span>
            </div>
            <div className="text-center bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
              <span className="text-[10px] uppercase font-bold text-amber-800 block">Deficiency Report</span>
              <span className="text-lg font-bold text-amber-900">{deficienciesList.length}</span>
            </div>
          </div>
        </div>

        {/* ── 1. TOP SECTION: Document Viewer ─────────────────────────────────── */}
        <div className="bg-white border border-[#c8d4c7] rounded-xl overflow-hidden shadow-xs">
          <div className="px-5 py-3.5 bg-[#F9FAF2] border-b border-[#e3ebe1] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Document Preview
              </h3>
              <span className="text-[10px] text-slate-500">
                (Unobstructed view of submitted statutory record. Extracted OCR insights and determination forms are listed below.)
              </span>
            </div>

            {/* Viewer Controls */}
            <div className="inline-flex items-center rounded-md border border-[#c8d4c7] bg-white p-0.5 text-xs shadow-xs">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(1.6, z + 0.15))}
                className="px-2.5 py-1 font-bold text-slate-700 hover:bg-slate-100 rounded"
                title="Zoom In"
              >
                Zoom In (+)
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.15))}
                className="px-2.5 py-1 font-bold text-slate-700 hover:bg-slate-100 rounded"
                title="Zoom Out"
              >
                Zoom Out (-)
              </button>
              <button
                type="button"
                onClick={() => setRotation((r) => (r + 90) % 360)}
                className="px-2.5 py-1 text-slate-700 hover:bg-slate-100 rounded"
                title="Rotate 90 deg"
              >
                Rotate ↻
              </button>
              <button
                type="button"
                onClick={() => {
                  setZoomLevel(1);
                  setRotation(0);
                }}
                className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 rounded font-semibold"
                title="Reset View"
              >
                Fit ⛶
              </button>
            </div>
          </div>

          {/* Document Viewport */}
          <div className="bg-[#2B2B2B]/5 p-6 overflow-auto max-h-[500px] flex items-center justify-center">
            <div
              style={{
                transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                transformOrigin: 'center center',
                transition: 'transform 0.15s ease-out',
              }}
              className="w-full max-w-[620px] aspect-[1/1.3] bg-white rounded-lg shadow-md border border-[#c8d4c7] p-8 text-slate-800 font-sans select-none overflow-hidden"
            >
              {/* Official Letterhead */}
              <div className="border-b-2 border-slate-900 pb-3 mb-5 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Maharashtra Industrial Development Corporation
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 font-semibold">{config.issuer}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 px-1 font-mono">
                  <span>DOC REF: {config.docNumber}</span>
                  <span>DATE: {config.date}</span>
                </div>
              </div>

              {/* Clean Document Body text tailored to phase */}
              <div className="space-y-4 text-xs leading-relaxed text-slate-700">
                {activePhase === 'land' && (
                  <>
                    <p className="font-bold text-slate-900 uppercase tracking-wide text-[11px] border-b pb-1">
                      Registered Lease Deed Schedule & Cadastral Extract
                    </p>
                    <p>
                      THIS LEASE DEED is executed on <strong>{config.date}</strong> by and between the Regional Officer, MIDC Pune Division, and the Lessee enterprise.
                    </p>
                    <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1.5 text-[11px]">
                      <p><strong>Clause 1.1:</strong> Demised Plot Demarcation: <strong>Plot No. C-14, Phase II, Industrial Area Chakan</strong>.</p>
                      <p><strong>Clause 2.1:</strong> Total Plot Area demised under leasehold: <strong className="text-slate-900">4,200.00 sq.meters</strong>.</p>
                      <p><strong>Clause 3.2:</strong> Permissible User Classification: <strong>Industrial Zone I-1 (General Manufacturing)</strong>.</p>
                      <p><strong>Clause 4.1:</strong> Tenure: 95 Years renewable leasehold tenure commencing from statutory possession date.</p>
                    </div>
                    <p className="text-[11px] text-slate-600 italic">
                      Registered at Office of Sub-Registrar Khed under Document No. BHR-2024-8841. Stamp duty paid in full.
                    </p>
                  </>
                )}

                {activePhase === 'building' && (
                  <>
                    <p className="font-bold text-slate-900 uppercase tracking-wide text-[11px] border-b pb-1">
                      Architectural Site Layout & Setback Schedule (Sheet A02 - Rev 2)
                    </p>
                    <div className="border border-dashed border-slate-300 p-4 rounded bg-slate-50 text-center font-mono text-[11px]">
                      <p className="font-bold text-slate-900 mb-2">CAD BLUEPRINT: GROUND FLOOR PLAN & MARGINAL DISTANCES</p>
                      <div className="grid grid-cols-2 gap-2 text-left bg-white p-3 rounded border border-slate-200">
                        <div>Front Setback: <strong>9.20 m</strong> (Min 9.00 m)</div>
                        <div>Rear Setback: <strong>6.50 m</strong> (Min 6.00 m)</div>
                        <div className="text-amber-800 font-bold bg-amber-50 p-1 rounded">East Setback: 4.20 m (Min 4.50 m)</div>
                        <div>West Setback: <strong>5.10 m</strong> (Min 4.50 m)</div>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-left bg-white p-3 rounded border border-slate-200">
                        <div className="text-red-800 font-bold bg-red-50 p-1 rounded">Built-up Area: 2,000 sq.m</div>
                        <div>Permissible FSI: <strong>0.44</strong> (Max 1.00)</div>
                      </div>
                    </div>
                  </>
                )}

                {activePhase !== 'land' && activePhase !== 'building' && (
                  <div className="p-4 bg-slate-50 rounded border border-slate-200 space-y-2">
                    <p className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">
                      Official Clearance & Feasibility Record
                    </p>
                    <p className="text-[11px] text-slate-600">
                      Document Reference: <strong>{config.docNumber}</strong> · Issuer: <strong>{config.issuer}</strong>
                    </p>
                    <div className="p-3 bg-white rounded border border-slate-200 text-[11px] space-y-1">
                      {config.tokens.map((tok) => (
                        <div key={tok.id} className="flex justify-between py-1 border-b border-slate-100 last:border-0">
                          <span className="font-semibold text-slate-700">{tok.label}:</span>
                          <span className="text-slate-900 font-mono">{tok.ocrValue}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Official Sign and Stamp */}
              <div className="mt-8 border-t border-slate-200 pt-3 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>OFFICIAL DIGITALLY SIGNED STATUTORY RECORD</span>
                <span className="text-emerald-700 font-bold">✓ HIGH-CONFIDENCE OCR EXTRACT</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. MIDDLE SECTION: OCR Insights with Flagged Items & Inspector Review Form ── */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                OCR Insights & Clause-by-Clause Determinations
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Review each flagged parameter. Click <strong>Approve</strong>, <strong>Reject</strong>, or <strong>Query</strong>. Selecting Reject or Query opens the determination form to add items directly to the Deficiency Report.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-600 bg-white border border-slate-300 px-3 py-1 rounded-full shadow-xs">
              {config.tokens.length} Extracted Clauses
            </span>
          </div>

          <div className="space-y-4">
            {config.tokens.map((tok, idx) => {
              const review = clauseReviews[tok.id] || {
                status: 'approved',
                isFormOpen: false,
                observation: '',
                actionRequired: '',
                ruleCitation: '',
                severity: 'moderate',
                isAddedToReport: false,
              };

              const isApproved = review.status === 'approved';
              const isRejected = review.status === 'rejected';
              const isQuery = review.status === 'query';

              return (
                <div
                  key={tok.id}
                  className={`bg-white border rounded-xl overflow-hidden shadow-xs transition-all ${
                    isRejected
                      ? 'border-red-300 ring-2 ring-red-100'
                      : isQuery
                      ? 'border-amber-300 ring-2 ring-amber-100'
                      : isApproved
                      ? 'border-emerald-300'
                      : 'border-[#c8d4c7]'
                  }`}
                >
                  {/* Clause Header & OCR Comparison Row */}
                  <div className="p-4 sm:p-5 bg-white border-b border-slate-100">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="space-y-1 max-w-xl">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-mono">
                            Clause {idx + 1}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900">{tok.label}</h4>
                          <span className="text-[10px] text-slate-500 font-mono">({tok.field})</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Standard / Regulatory Norm: <strong className="text-slate-800">{tok.standardNorm || 'Statutory standard'}</strong>
                        </p>
                      </div>

                      {/* OCR Confidence and Status Badges */}
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                          OCR {tok.confidence}%
                        </span>
                        {tok.status === 'discrepancy' && (
                          <span className="text-[10px] font-bold text-red-800 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded">
                            ⚠ Discrepancy Found
                          </span>
                        )}
                        {tok.status === 'warning' && (
                          <span className="text-[10px] font-bold text-purple-800 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded">
                             Prerequisite Condition
                          </span>
                        )}
                        {tok.status === 'matched' && (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded">
                            ✓ Matches Declaration
                          </span>
                        )}
                        {tok.status === 'verified' && (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded">
                            ✓ Verified Compliant
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Extracted OCR Value vs Applicant Declared Value Box */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs bg-[#F9FAF2] border border-slate-200 rounded-lg p-3">
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase font-bold text-slate-500">
                          Extracted from Document (OCR)
                        </span>
                        <p className="text-sm font-bold text-slate-900 font-mono">{tok.ocrValue}</p>
                      </div>
                      <div className="space-y-0.5 border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-3">
                        <span className="text-[10px] uppercase font-bold text-slate-500">
                          Applicant Stated in Application Form
                        </span>
                        <p className="text-sm font-bold text-slate-700 font-mono">
                          {tok.declaredValue || 'Declared as per submitted deed'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Inspector Action Buttons: Approve, Reject, Query */}
                  <div className="p-4 sm:p-5 bg-[#fafbfc] space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                        Officer Determination:
                      </span>

                      {/* 3 Interactive Decision Buttons */}
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSelectStatus(tok.id, 'approved')}
                          className={`px-3 py-1.5 text-xs font-bold rounded-md border transition-all flex items-center gap-1 shadow-xs ${
                            isApproved
                              ? 'bg-emerald-700 text-white border-emerald-800 ring-2 ring-emerald-300'
                              : 'bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-50'
                          }`}
                        >
                          <span>✓ Approve</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSelectStatus(tok.id, 'rejected')}
                          className={`px-3 py-1.5 text-xs font-bold rounded-md border transition-all flex items-center gap-1 shadow-xs ${
                            isRejected
                              ? 'bg-red-700 text-white border-red-800 ring-2 ring-red-300'
                              : 'bg-white text-red-800 border-red-300 hover:bg-red-50'
                          }`}
                        >
                          <span>✕ Reject</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSelectStatus(tok.id, 'query')}
                          className={`px-3 py-1.5 text-xs font-bold rounded-md border transition-all flex items-center gap-1 shadow-xs ${
                            isQuery
                              ? 'bg-amber-600 text-white border-amber-700 ring-2 ring-amber-300'
                              : 'bg-white text-amber-800 border-amber-300 hover:bg-amber-50'
                          }`}
                        >
                          <span>? Query</span>
                        </button>
                      </div>
                    </div>

                    {/* Approved Confirmation Badge */}
                    {isApproved && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <span className="font-bold text-emerald-700">✓ Compliant & Approved:</span>
                          <span>{review.observation}</span>
                        </span>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                          No Deficiency
                        </span>
                      </div>
                    )}

                    {/* ── EXPANDABLE SMALL FORM (Opens just below when Reject or Query is selected) ── */}
                    {review.isFormOpen && (isRejected || isQuery) && (
                      <div
                        className={`p-4 rounded-xl border text-xs space-y-3 mt-3 animate-in fade-in slide-in-from-top-1 duration-150 ${
                          isRejected
                            ? 'bg-red-50/70 border-red-200 shadow-xs'
                            : 'bg-amber-50/70 border-amber-200 shadow-xs'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2 border-slate-200">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{isRejected ? '✕' : '?'}</span>
                            <h5 className="font-bold text-slate-900">
                              {isRejected ? 'Deficiency / Objection Form' : 'Query & Clarification Form'}
                            </h5>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                isRejected
                                  ? 'bg-red-200 text-red-900 border border-red-300'
                                  : 'bg-amber-200 text-amber-900 border border-amber-300'
                              }`}
                            >
                              {isRejected ? 'STATUTORY OBJECTION' : 'FORMAL QUERY'}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {review.isAddedToReport ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-300">
                                <span>✓</span> Added to Deficiency Report
                              </span>
                            ) : (
                              <span className="text-[11px] text-slate-500 italic">Not in report</span>
                            )}
                          </div>
                        </div>

                        {/* Field 1: Observation / Regulatory Shortfall */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-700 block">
                            Specific Observation / Finding Justification:
                          </label>
                          <textarea
                            rows={2}
                            value={review.observation}
                            onChange={(e) => updateObservation(tok.id, e.target.value)}
                            placeholder="Enter specific discrepancy finding..."
                            className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans shadow-xs"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Field 2: Required Applicant Action */}
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-700 block">
                              Required Applicant Action:
                            </label>
                            <input
                              type="text"
                              value={review.actionRequired}
                              onChange={(e) => updateActionRequired(tok.id, e.target.value)}
                              placeholder="e.g. Submit revised architectural plan maintaining 4.50m margin"
                              className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans shadow-xs"
                            />
                          </div>

                          {/* Field 3: Statutory Rule / Citation */}
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-700 block">
                              Statutory Rule / Section Citation:
                            </label>
                            <input
                              type="text"
                              value={review.ruleCitation}
                              onChange={(e) => updateRuleCitation(tok.id, e.target.value)}
                              placeholder="e.g. MIDC DCR 2026 Rule 14.2(b)"
                              className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans shadow-xs"
                            />
                          </div>
                        </div>

                        {/* Small Form Footer with Add to Report button */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-slate-600 font-semibold">Severity:</span>
                            <select
                              value={review.severity}
                              onChange={(e) => updateSeverity(tok.id, e.target.value as any)}
                              className="text-[11px] bg-white border border-slate-300 rounded px-2.5 py-1 font-semibold text-slate-800"
                            >
                              <option value="critical">Critical (Withholds Sanction)</option>
                              <option value="moderate">Moderate (Standard Query)</option>
                              <option value="observation">Informational / Note</option>
                            </select>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleToggleAddToReport(tok.id)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${
                                review.isAddedToReport
                                  ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                              }`}
                            >
                              <span>{review.isAddedToReport ? '✓ Update in Deficiency Report' : '+ Add to Deficiency Report'}</span>
                            </button>
                            {review.isAddedToReport && (
                              <button
                                type="button"
                                onClick={() => handleToggleAddToReport(tok.id)}
                                className="px-2.5 py-1 text-slate-600 hover:text-red-700 text-[11px] font-semibold transition-colors"
                              >
                                Remove ✕
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 3. BOTTOM SECTION: Consolidated Deficiencies Report at the End ──── */}
        <section
          id="deficiencies-report"
          className="bg-white border-2 border-slate-300 rounded-xl overflow-hidden shadow-sm scroll-mt-24"
        >
          <div className="px-6 py-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Official Deficiencies & Objections Report
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Auto-compiled summary of all filled rejection and query forms for {applicationId}.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleExportReport}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded text-xs font-bold transition-colors border border-slate-600 flex items-center gap-1.5"
              >
                <span> Export Report (PDF)</span>
              </button>
              {deficienciesList.length > 0 && (
                <button
                  type="button"
                  onClick={handleForwardToQueryWorkflow}
                  className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded text-xs font-bold transition-colors shadow-xs flex items-center gap-1"
                >
                  <span>Forward to Query Builder →</span>
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            {deficienciesList.length === 0 ? (
              <div className="py-10 text-center space-y-2 bg-emerald-50/50 rounded-xl border border-emerald-200 p-6">
                <h4 className="text-base font-bold text-emerald-900">No Deficiencies or Objections Recorded</h4>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  All {config.tokens.length} document clauses have been marked as approved and compliant by the reviewing officer. No statutory deficiency notice is required for this document.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 flex items-center justify-between">
                  <span>
                    ⚠️ <strong>{deficienciesList.length} Objections / Deficiencies Recorded:</strong> Compiled from small forms filled by the reviewing officer.
                  </span>
                  <span className="font-bold font-mono text-[11px] bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                    Form D-1 Schedule
                  </span>
                </div>

                <div className="border border-[#c8d4c7] rounded-lg overflow-hidden bg-white">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-[#F9FAF2] text-[#2B2B2B] border-b border-[#c8d4c7] text-left font-bold">
                        <th className="p-3">S.No.</th>
                        <th className="p-3">Clause / Subject</th>
                        <th className="p-3">OCR Extracted vs Standard</th>
                        <th className="p-3">Determination</th>
                        <th className="p-3">Officer Observation & Required Action</th>
                        <th className="p-3">Statutory Rule</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#c8d4c7]">
                      {deficienciesList.map((item, idx) => (
                        <tr key={item.tokenId} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-slate-500 font-mono">#{idx + 1}</td>
                          <td className="p-3">
                            <strong className="text-slate-900 block">{item.label}</strong>
                            <span className="text-[10px] text-slate-500 font-mono">Ref: {item.field}</span>
                          </td>
                          <td className="p-3">
                            <p className="font-semibold text-slate-800">OCR: {item.ocrValue}</p>
                            <p className="text-[10px] text-slate-500">Norm: {item.standardNorm}</p>
                          </td>
                          <td className="p-3">
                            {item.status === 'rejected' ? (
                              <span className="px-2.5 py-1 text-[10px] font-bold rounded bg-red-100 text-red-900 border border-red-300">
                                ✕ REJECTED
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 text-[10px] font-bold rounded bg-amber-100 text-amber-900 border border-amber-300">
                                ? QUERY
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-slate-700 max-w-sm space-y-1">
                            <p className="italic font-serif text-[11px] text-slate-800">"{item.observation}"</p>
                            <p className="text-[10px] text-blue-800">
                              <strong>Action:</strong> {item.actionRequired}
                            </p>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-300">
                              {item.ruleCitation}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              type="button"
                              onClick={() => handleToggleAddToReport(item.tokenId)}
                              className="text-[11px] font-bold text-red-600 hover:text-red-800 hover:underline"
                            >
                              Remove ✕
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Statutory Sign-off Box */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Reviewing Officer Desk</span>
                    <strong className="text-slate-900">MIDC Technical Scrutiny Cell, Chakan Special Planning Area</strong>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleSaveAll}
                      className="px-4 py-2 bg-[#6DAE7C] text-white rounded font-bold hover:bg-blue-700 transition-colors shadow-xs"
                    >
                      Save & Confirm Determinations ✓
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
