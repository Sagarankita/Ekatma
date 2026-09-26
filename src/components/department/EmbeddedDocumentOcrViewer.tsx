'use client';

import React, { useState } from 'react';

export type ScrutinyPhaseDocType =
  | 'land'
  | 'building'
  | 'water'
  | 'consistency'
  | 'dependency'
  | 'query'
  | 'delta'
  | 'inspection';

export interface OcrToken {
  id: string;
  label: string;
  field: string;
  ocrValue: string;
  declaredValue?: string;
  standardNorm?: string;
  confidence: number;
  status: 'matched' | 'discrepancy' | 'verified' | 'warning';
  box: { top: number; left: number; width: number; height: number };
}

export interface EmbeddedDocumentOcrViewerProps {
  phase: ScrutinyPhaseDocType;
  title?: string;
  subtitle?: string;
  onSelectToken?: (token: OcrToken) => void;
  selectedTokenId?: string;
  className?: string;
  applicationId?: string;
  onOpenOcrInsights?: () => void;
}

export const PHASE_DOC_CONFIG: Record<
  ScrutinyPhaseDocType,
  {
    docTitle: string;
    docNumber: string;
    docCategory: string;
    issuer: string;
    date: string;
    overallConfidence: number;
    tokens: OcrToken[];
  }
> = {
  land: {
    docTitle: 'Registered MIDC Lease Deed & Cadastral 7/12 Extract',
    docNumber: 'MIDC-REG-DEED-2024/C14',
    docCategory: 'Tenure & Boundary Title',
    issuer: 'Office of Sub-Registrar / MIDC Land Cell Pune',
    date: '14 Jan 2024',
    overallConfidence: 99.2,
    tokens: [
      {
        id: 'tok-land-area',
        label: 'Plot Area (Lease Deed Clause 2.1)',
        field: 'Total Demised Area',
        ocrValue: '4,200.00 sq.m',
        declaredValue: '4,800.00 sq.m in Application Form',
        standardNorm: 'Must match registered lease deed area',
        confidence: 99.4,
        status: 'discrepancy',
        box: { top: 38, left: 16, width: 68, height: 11 },
      },
      {
        id: 'tok-land-plotno',
        label: 'Plot Demarcation & Survey No.',
        field: 'Plot Identification',
        ocrValue: 'Plot No. C-14, Phase II, Chakan',
        declaredValue: 'Plot No. C-14, Phase II, Chakan',
        standardNorm: 'Cadastral GIS Layer Match',
        confidence: 99.8,
        status: 'matched',
        box: { top: 22, left: 16, width: 68, height: 9 },
      },
      {
        id: 'tok-land-zone',
        label: 'Permissible User Classification',
        field: 'Zoning Permissibility',
        ocrValue: 'Industrial Zone I-1 (Manufacturing)',
        declaredValue: 'Industrial Zone I-1',
        standardNorm: 'Chakan Master Plan 2024',
        confidence: 98.7,
        status: 'verified',
        box: { top: 56, left: 16, width: 68, height: 9 },
      },
      {
        id: 'tok-land-seal',
        label: 'Official Registration Seal',
        field: 'Government Endorsement',
        ocrValue: 'Govt. of Maharashtra / Sub-Registrar Khed Seal Verified',
        confidence: 98.9,
        status: 'verified',
        box: { top: 72, left: 24, width: 52, height: 16 },
      },
    ],
  },
  building: {
    docTitle: 'Architectural Site Plan & Setback Blueprint (Sheet A02 - Rev 2)',
    docNumber: 'DWG-2026-C14-A02',
    docCategory: 'Architectural CAD Submission',
    issuer: 'Apex Design Associates (Council of Architecture Reg. CA/2012/5512)',
    date: '10 Aug 2026',
    overallConfidence: 98.4,
    tokens: [
      {
        id: 'tok-bldg-setback-e',
        label: 'East Side Margin (Setback 1)',
        field: 'DIM_SETBACK_EAST',
        ocrValue: '4.20 m (Proposed in CAD)',
        declaredValue: '4.20 m',
        standardNorm: 'Min 4.50 m (MIDC DCR 2023 Rule 14.2)',
        confidence: 98.8,
        status: 'discrepancy',
        box: { top: 32, left: 74, width: 22, height: 14 },
      },
      {
        id: 'tok-bldg-bua',
        label: 'Total Built-up Area Schedule',
        field: 'Total Built-up Area',
        ocrValue: '2,000.00 sq.m',
        declaredValue: '2,300.00 sq.m in Application Form',
        standardNorm: 'Exact concordance between Form & Drawing Schedule',
        confidence: 97.9,
        status: 'discrepancy',
        box: { top: 68, left: 12, width: 44, height: 18 },
      },
      {
        id: 'tok-bldg-fsi',
        label: 'FSI / FAR Consumption',
        field: 'FSI Ratio',
        ocrValue: '0.44 FSI Proposed (2,121 sq.m)',
        declaredValue: '0.44 FSI',
        standardNorm: 'Max 1.00 Permissible in Zone I-1',
        confidence: 99.1,
        status: 'verified',
        box: { top: 18, left: 12, width: 38, height: 11 },
      },
      {
        id: 'tok-bldg-height',
        label: 'Maximum Building Height',
        field: 'Clear Structure Height',
        ocrValue: '12.40 m',
        declaredValue: '12.40 m',
        standardNorm: 'Max 15.00 m permissible without high-rise clearance',
        confidence: 99.3,
        status: 'matched',
        box: { top: 48, left: 12, width: 38, height: 10 },
      },
    ],
  },
  water: {
    docTitle: 'MIDC Water Works Supply Feasibility & Connection Sanction',
    docNumber: 'MIDC/EE/WTR/2026/1104',
    docCategory: 'Bulk Utility Allocation',
    issuer: 'Executive Engineer, MIDC Water Works Division Pune',
    date: '19 Aug 2026',
    overallConfidence: 99.1,
    tokens: [
      {
        id: 'tok-wtr-alloc',
        label: 'Bulk Supply Sanction',
        field: 'Sanctioned Industrial Water',
        ocrValue: '45.00 KLD (Kilolitres / Day)',
        declaredValue: '45 KLD Total (10 KLD Domestic + 35 KLD Industrial)',
        standardNorm: 'Within Substation 600 KLD Quota',
        confidence: 99.6,
        status: 'verified',
        box: { top: 32, left: 16, width: 68, height: 12 },
      },
      {
        id: 'tok-wtr-feeder',
        label: 'Off-take Feeder Network',
        field: 'Supply Connection Line',
        ocrValue: '150mm dia. Cast Iron Main (Chakan Phase II Substation)',
        declaredValue: '150mm Main Line Connection',
        standardNorm: 'Connection pressure 1.8 kg/cm² verified',
        confidence: 98.9,
        status: 'matched',
        box: { top: 49, left: 16, width: 68, height: 11 },
      },
      {
        id: 'tok-wtr-etp',
        label: 'Effluent Treatment & ZLD Condition',
        field: 'Effluent Compliance',
        ocrValue: '28 KLD Zero Liquid Discharge (ZLD) Mandatory Condition',
        declaredValue: '28 KLD ZLD Plant Proposed',
        standardNorm: 'MPCB Consent Schedule Compliance',
        confidence: 98.4,
        status: 'verified',
        box: { top: 66, left: 16, width: 68, height: 14 },
      },
    ],
  },
  consistency: {
    docTitle: 'Cross-form Multi-Document Concordance Dossier',
    docNumber: 'EKATMA-CONSISTENCY-MATRIX-00418',
    docCategory: '5-Source Reconciliation Engine',
    issuer: 'EKATMA Single Window Automated Consistency Engine',
    date: '24 Sep 2026',
    overallConfidence: 99.4,
    tokens: [
      {
        id: 'tok-cons-plot',
        label: 'Plot Area Concordance (5 Sources)',
        field: 'Area Reconciliation',
        ocrValue: 'Lease Deed: 4,200 m² | Form: 4,800 m² | CAD: 4,200 m²',
        declaredValue: '4,800 m² in Form vs 4,200 m² in Registered Deed',
        standardNorm: 'Registered Lease Deed (4,200 m²) is Authoritative Base',
        confidence: 99.7,
        status: 'discrepancy',
        box: { top: 28, left: 14, width: 72, height: 18 },
      },
      {
        id: 'tok-cons-bua',
        label: 'Built-up Area Concordance',
        field: 'BUA Schedule Reconciliation',
        ocrValue: 'CAD Drawing: 2,000 m² | Application Form: 2,300 m²',
        declaredValue: '2,300 m² in Form',
        standardNorm: 'Requires harmonized architect certificate',
        confidence: 98.6,
        status: 'discrepancy',
        box: { top: 52, left: 14, width: 72, height: 16 },
      },
      {
        id: 'tok-cons-zone',
        label: 'Zoning Concordance across GIS & Land Allotment',
        field: 'Zone Category',
        ocrValue: 'GIS Layer: Industrial I-1 | Deed: Industrial I-1 (100% Match)',
        declaredValue: 'Industrial I-1',
        standardNorm: 'Aligned with Chakan Master Plan',
        confidence: 99.8,
        status: 'matched',
        box: { top: 73, left: 14, width: 72, height: 14 },
      },
    ],
  },
  dependency: {
    docTitle: 'Statutory Clearances & Prerequisite NOC Archive',
    docNumber: 'DEP-CLEARANCES-ARCHIVE-PUNE',
    docCategory: 'Inter-Agency Clearances',
    issuer: 'Maharashtra Pollution Control Board & Maharashtra Fire Services',
    date: '22 Sep 2026',
    overallConfidence: 98.9,
    tokens: [
      {
        id: 'tok-dep-mpcb',
        label: 'MPCB Consent to Establish (CTE) Status',
        field: 'MPCB-CTE-2026-8819',
        ocrValue: 'Application Received 04-Sep-2026. Under Technical Review.',
        declaredValue: 'CTE In Process at Pune Regional Office',
        standardNorm: 'Prerequisite for Building Occupancy and Final Sanction',
        confidence: 99.2,
        status: 'warning',
        box: { top: 26, left: 14, width: 72, height: 18 },
      },
      {
        id: 'tok-dep-fire',
        label: 'Provisional Fire NOC Validity',
        field: 'MFS-NOC-2025-1044',
        ocrValue: 'EXPIRED: 31-AUG-2026. Renewal Receipt on Record.',
        declaredValue: 'Renewal Under Submission',
        standardNorm: 'Mandatory endorsement required for side setback waiver',
        confidence: 98.7,
        status: 'discrepancy',
        box: { top: 50, left: 14, width: 72, height: 18 },
      },
      {
        id: 'tok-dep-msedcl',
        label: 'MSEDCL Power Feasibility Sanction',
        field: 'MSEDCL-2026-4401',
        ocrValue: 'APPROVED: 150 kVA Industrial Load cleared from Substation 3',
        declaredValue: '150 kVA',
        standardNorm: 'Clear',
        confidence: 99.6,
        status: 'verified',
        box: { top: 74, left: 14, width: 72, height: 14 },
      },
    ],
  },
  query: {
    docTitle: 'Consolidated Statutory Deficiency Notice (Draft Form D-1)',
    docNumber: 'MIDC/DEF/2026/00418-QRY',
    docCategory: 'Official Officer Communication',
    issuer: 'Office of Executive Engineer, MIDC Chakan Special Planning Authority',
    date: '26 Sep 2026',
    overallConfidence: 99.5,
    tokens: [
      {
        id: 'tok-qry-item1',
        label: 'Item 1: Plot Area Mismatch Citation',
        field: 'Deficiency 1',
        ocrValue: 'Reconcile 4,800 sq.m form declaration with 4,200 sq.m registered lease deed.',
        declaredValue: '4,800 sq.m',
        standardNorm: 'MIDC Land Disposal Regulations Sec. 12',
        confidence: 99.8,
        status: 'discrepancy',
        box: { top: 36, left: 14, width: 72, height: 14 },
      },
      {
        id: 'tok-qry-item2',
        label: 'Item 2: East Setback Shortfall Citation',
        field: 'Deficiency 2',
        ocrValue: 'Revised CAD layout required demonstrating 4.50m minimum East setback (MIDC DCR Rule 14.2).',
        declaredValue: '4.20m proposed',
        standardNorm: 'Min 4.50m mandatory',
        confidence: 99.4,
        status: 'discrepancy',
        box: { top: 54, left: 14, width: 72, height: 14 },
      },
      {
        id: 'tok-qry-item3',
        label: 'Item 3: Built-up Area Harmonization',
        field: 'Deficiency 3',
        ocrValue: 'Provide joint certificate reconciling 2,300 sq.m in form vs 2,000 sq.m in drawing schedule.',
        declaredValue: '2,300 sq.m',
        standardNorm: 'Architect Endorsed Calculation Sheet',
        confidence: 99.1,
        status: 'warning',
        box: { top: 72, left: 14, width: 72, height: 14 },
      },
    ],
  },
  delta: {
    docTitle: 'Delta Re-scrutiny Redline Comparison (v1 Initial vs v2 Resubmission)',
    docNumber: 'DIFF-2026-00418-v1-to-v2',
    docCategory: 'Resubmission Difference Engine',
    issuer: 'EKATMA Automated Delta Comparator Engine',
    date: '18 Sep 2026',
    overallConfidence: 99.3,
    tokens: [
      {
        id: 'tok-delta-setback',
        label: 'East Setback Revision in CAD Sheet A02',
        field: 'Revised East Setback',
        ocrValue: 'v1: 4.20m -> v2: 4.50m [RESOLVED COMPLIANT]',
        declaredValue: '4.50m (Corrected in Rev 2 Drawing)',
        standardNorm: 'Min 4.50m (MIDC DCR Rule 14.2)',
        confidence: 99.6,
        status: 'verified',
        box: { top: 32, left: 14, width: 72, height: 16 },
      },
      {
        id: 'tok-delta-fee',
        label: 'GRAS Challan Differential Payment',
        field: 'Scrutiny Fee Challan',
        ocrValue: 'Challan Ref: MH-GRAS-2026-9921 for ₹7,000 (Verified Active)',
        declaredValue: '₹7,000 differential paid',
        standardNorm: 'Maharashtra Cyber Treasury Cleared',
        confidence: 99.7,
        status: 'verified',
        box: { top: 54, left: 14, width: 72, height: 14 },
      },
      {
        id: 'tok-delta-unchanged',
        label: '12 Unchanged Parameters Isolated',
        field: 'Unchanged Parameters',
        ocrValue: 'Zoning, building height, FSI, water quota: Bit-for-bit identical to v1',
        confidence: 99.9,
        status: 'matched',
        box: { top: 74, left: 14, width: 72, height: 14 },
      },
    ],
  },
  inspection: {
    docTitle: 'Site Inspection Field Dossier & Geo-Tagged Survey Record',
    docNumber: 'INSP-2026-CHAKAN-00418',
    docCategory: 'Physical Ground Verification',
    issuer: 'Junior Engineer (Site Cell), MIDC Industrial Area Chakan',
    date: '25 Sep 2026',
    overallConfidence: 98.8,
    tokens: [
      {
        id: 'tok-insp-pegs',
        label: 'GPS Plot Peg Coordinates & Demarcation',
        field: 'Ground Survey Verification',
        ocrValue: 'Boundary Pegs P1-P4 verified at [18.7612° N, 73.8219° E]. No encroachment.',
        declaredValue: 'Pegged per Cadastral Shapefile',
        standardNorm: 'Clear demarcation',
        confidence: 99.1,
        status: 'verified',
        box: { top: 28, left: 14, width: 72, height: 16 },
      },
      {
        id: 'tok-insp-margin',
        label: 'Physical East Setback Clearance',
        field: 'Site Laser Measurement',
        ocrValue: 'Distance from proposed foundation to East fence: 4.52m measured on ground.',
        declaredValue: '4.50m min',
        standardNorm: 'Min 4.50m (Compliant with Rev 2 plan)',
        confidence: 98.6,
        status: 'verified',
        box: { top: 48, left: 14, width: 72, height: 16 },
      },
      {
        id: 'tok-insp-hydrant',
        label: 'External MIDC Fire Hydrant Proximity',
        field: 'Infrastructure Distance',
        ocrValue: 'Arterial Hydrant H-14 located 46m from main factory gate.',
        declaredValue: 'Connected to MIDC water network',
        standardNorm: 'Max 50m distance standard',
        confidence: 98.9,
        status: 'verified',
        box: { top: 70, left: 14, width: 72, height: 16 },
      },
    ],
  },
};

export function EmbeddedDocumentOcrViewer({
  phase,
  title,
  subtitle,
  onSelectToken,
  selectedTokenId,
  className = '',
  applicationId,
  onOpenOcrInsights,
}: EmbeddedDocumentOcrViewerProps) {
  const config = PHASE_DOC_CONFIG[phase] || PHASE_DOC_CONFIG.building;
  const [showOcrBoxes, setShowOcrBoxes] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [activeToken, setActiveToken] = useState<OcrToken | null>(() => {
    if (selectedTokenId) {
      return config.tokens.find((t) => t.id === selectedTokenId) || config.tokens[0];
    }
    return config.tokens[0] || null;
  });

  const handleTokenClick = (tok: OcrToken) => {
    setActiveToken(tok);
    onSelectToken?.(tok);
  };

  const handleZoomIn = () => setZoomLevel((z) => Math.min(1.6, z + 0.15));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(0.75, z - 0.15));
  const handleRotate = () => setRotation((r) => (r + 90) % 360);
  const handleReset = () => {
    setZoomLevel(1);
    setRotation(0);
  };

  return (
    <div
      className={`bg-white border border-[#cbd5e1] rounded-xl overflow-hidden shadow-xs flex flex-col ${className}`}
    >
      {/* Top Header & OCR Controls */}
      <div className="px-4 py-3 bg-[#f8fafc] border-b border-[#e2e8f0] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
            📄
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#1a2533]">
                {title || config.docTitle}
              </span>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                OCR Verified ({config.overallConfidence}%)
              </span>
            </div>
            <p className="text-[11px] text-[#64748b]">
              {subtitle || `Doc Ref: ${config.docNumber} · Issuer: ${config.issuer}`}
            </p>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {onOpenOcrInsights && (
            <button
              type="button"
              onClick={onOpenOcrInsights}
              className="px-3 py-1 bg-[#1a56db] hover:bg-blue-700 text-white rounded text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5"
            >
              <span>🔍 Open OCR Insights & Approvals →</span>
            </button>
          )}

          <div className="inline-flex rounded-md border border-[#cbd5e1] bg-white p-0.5 text-xs">
            <button
              type="button"
              onClick={handleZoomIn}
              className="px-2 py-0.5 font-bold text-slate-700 hover:bg-slate-100 rounded"
              title="Zoom In"
            >
              +
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className="px-2 py-0.5 font-bold text-slate-700 hover:bg-slate-100 rounded"
              title="Zoom Out"
            >
              -
            </button>
            <button
              type="button"
              onClick={handleRotate}
              className="px-2 py-0.5 text-slate-700 hover:bg-slate-100 rounded"
              title="Rotate"
            >
              ↻
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-2 py-0.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-100 rounded"
              title="Reset Zoom"
            >
              Fit
            </button>
          </div>
        </div>
      </div>

      {/* Main Document Viewport */}
      <div className="relative bg-[#0f172a]/5 p-4 overflow-hidden min-h-[380px] max-h-[500px] flex items-center justify-center">
        {/* Document Canvas Mockup */}
        <div
          style={{
            transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
            transformOrigin: 'center center',
            transition: 'transform 0.15s ease-out',
          }}
          className="relative w-full max-w-[540px] aspect-[1/1.28] bg-white rounded shadow-md border border-[#cbd5e1] p-6 text-slate-800 font-sans select-none overflow-hidden"
        >
          {/* Official Document Letterhead Header */}
          <div className="border-b-2 border-slate-900 pb-3 mb-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-base">🏛</span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-900">
                Maharashtra Industrial Development Corporation
              </span>
            </div>
            <p className="text-[10px] text-slate-600 font-semibold">{config.issuer}</p>
            <div className="flex items-center justify-between text-[9px] text-slate-500 mt-2 px-1 font-mono">
              <span>DOC REF: {config.docNumber}</span>
              <span>DATE: {config.date}</span>
            </div>
          </div>

          {/* Document Content Mockup based on Phase */}
          <div className="space-y-4 text-[10px] leading-relaxed text-slate-700">
            {phase === 'land' && (
              <>
                <p className="font-semibold text-slate-900">
                  SCHEDULE OF DEMISED INDUSTRIAL PREMISES (REGISTRATION EXTRACT)
                </p>
                <p>
                  This indenture certifies that the industrial plot situated in Chakan Phase II Industrial Area, Taluka Khed, District Pune has been allotted under standard statutory terms.
                </p>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded font-mono text-[10px] space-y-1">
                  <p>Allotment Ref: MIDC/RO-PUNE/LAND/C-14</p>
                  <p>Survey No.: 144/2 pt, 145/1 pt, Mouje Mahalunge Ingale</p>
                  <p>Registered Total Area: <strong>4,200.00 SQ. METRES</strong></p>
                  <p>Boundary: North: 24m Road | South: Plot C-15 | East: Plot C-13</p>
                </div>
              </>
            )}

            {phase === 'building' && (
              <>
                <div className="flex items-center justify-between font-bold text-slate-900 border-b border-slate-200 pb-1">
                  <span>GROUND FLOOR ARCHITECTURAL CAD PLAN & SETBACK SCHEDULE</span>
                  <span className="font-mono text-[9px]">SCALE 1:100</span>
                </div>
                {/* Visual CAD Drawing Sketch */}
                <div className="relative border-2 border-dashed border-slate-400 bg-slate-900/5 rounded p-3 h-40 flex items-center justify-center">
                  {/* Outer Plot Boundary */}
                  <div className="absolute inset-3 border border-slate-400 flex flex-col justify-between p-1 text-[8px] font-mono text-slate-500">
                    <div className="flex justify-between">
                      <span>NORTH ROAD MARGIN (9.2m)</span>
                      <span>24m MIDC ROAD</span>
                    </div>
                    {/* Building Footprint */}
                    <div className="border-2 border-blue-900 bg-blue-50/70 p-2 text-center rounded font-sans mx-6 my-2 shadow-xs">
                      <span className="font-bold text-blue-950 block text-[10px]">
                        PROPOSED INDUSTRIAL WORKSHOP (G+2)
                      </span>
                      <span className="text-[9px] text-blue-800">
                        Footprint: 2,000 sq.m · Height: 12.4m
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[9px]">
                      <span>WEST MARGIN: 5.10m</span>
                      <span className="text-amber-700 font-bold">EAST MARGIN: 4.20m</span>
                      <span>REAR SETBACK: 6.10m</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {phase === 'water' && (
              <>
                <p className="font-semibold text-slate-900">
                  TECHNICAL CLEARANCE FOR WATER ALLOCATION & EFFLUENT DISPOSAL
                </p>
                <div className="space-y-1.5 p-2.5 bg-slate-50 border border-slate-200 rounded font-mono text-[10px]">
                  <p>Allocated Supply: <strong>45,000 LITRES / DAY (45 KLD)</strong></p>
                  <p>Point of Connection: 150mm Main Pipe at Substation Junction 4</p>
                  <p>Domestic Requirement: 10 KLD (Calculated for 65 Factory Staff)</p>
                  <p>Industrial Process Demand: 35 KLD (Machining & Tool Cooling)</p>
                  <p>Mandatory Condition: 28 KLD Zero Liquid Discharge (ZLD) ETP</p>
                </div>
              </>
            )}

            {phase === 'consistency' && (
              <>
                <p className="font-semibold text-slate-900">
                  MULTI-RECORD CROSS-RECONCILIATION SUMMARY DOSSIER
                </p>
                <div className="border border-slate-200 rounded divide-y divide-slate-200 font-mono text-[9px]">
                  <div className="p-1.5 flex justify-between bg-slate-50">
                    <span>1. Master Application Form (Form 3.1):</span>
                    <strong className="text-red-700">4,800 sq.m</strong>
                  </div>
                  <div className="p-1.5 flex justify-between">
                    <span>2. Registered Lease Deed Document:</span>
                    <strong className="text-emerald-700">4,200 sq.m (Baseline)</strong>
                  </div>
                  <div className="p-1.5 flex justify-between bg-slate-50">
                    <span>3. Architect CAD Drawing Sheet A02:</span>
                    <strong className="text-emerald-700">4,200 sq.m</strong>
                  </div>
                  <div className="p-1.5 flex justify-between">
                    <span>4. Cadastral Survey Shapefile GIS:</span>
                    <strong className="text-emerald-700">4,200 sq.m</strong>
                  </div>
                </div>
              </>
            )}

            {phase === 'dependency' && (
              <>
                <p className="font-semibold text-slate-900">
                  STATUTORY CLEARANCES CONCORDANCE & EXTERNAL NOCS
                </p>
                <div className="space-y-2 text-[10px]">
                  <div className="p-2 border border-amber-300 bg-amber-50/70 rounded">
                    <span className="font-bold text-amber-900 block">
                      MPCB Consent to Establish (Ref: MPCB-CTE-2026-8819)
                    </span>
                    <span className="text-[9px] text-amber-800">
                      Active review at Regional Office Pune. Letter expected within 14 days.
                    </span>
                  </div>
                  <div className="p-2 border border-red-300 bg-red-50/70 rounded">
                    <span className="font-bold text-red-900 block">
                      Maharashtra Fire Services Provisional NOC (Ref: MFS-NOC-2025-1044)
                    </span>
                    <span className="text-[9px] text-red-800">
                      EXPIRED on 31-Aug-2026. Renewal application receipt submitted.
                    </span>
                  </div>
                </div>
              </>
            )}

            {phase === 'query' && (
              <>
                <p className="font-semibold text-slate-900">
                  FORM D-1: FORMAL DEFICIENCY & CLARIFICATION NOTICE
                </p>
                <p className="text-[9px] text-slate-600">
                  To: Aster Precision Components Pvt. Ltd., Plot No. C-14, Phase II, Chakan.
                </p>
                <div className="p-2 border border-amber-300 bg-amber-50/50 rounded space-y-1 text-[9px] font-mono">
                  <p>1. Plot Area: Clarify 4,800 sq.m declared vs 4,200 sq.m in Lease Deed.</p>
                  <p>2. East Setback: Provide revised drawing with 4.50m minimum margin (Rule 14.2).</p>
                  <p>3. Built-up Area: Reconcile 2,300 sq.m in form vs 2,000 sq.m in drawing schedule.</p>
                </div>
                <p className="text-[9px] text-slate-500 italic">
                  Notice under Section 14 of MIDC Act 1961. Response period: 15 statutory days.
                </p>
              </>
            )}

            {phase === 'delta' && (
              <>
                <p className="font-semibold text-slate-900">
                  DELTA RE-SCRUTINY REDLINE OVERLAY (V1 INITIAL VS V2 RESUBMITTED)
                </p>
                <div className="p-2 border border-purple-200 bg-purple-50/60 rounded font-mono text-[9px] space-y-1">
                  <p className="text-emerald-700 font-bold">
                    ✓ East Margin: Revised from 4.20m to 4.50m (Rule 14.2 Compliant)
                  </p>
                  <p className="text-emerald-700 font-bold">
                    ✓ Fee Challan: GRAS Receipt ₹7,000 differential payment confirmed
                  </p>
                  <p className="text-slate-600">
                    ○ Unchanged: Plot boundary pegs, zoning, FSI, water quota (Preserved)
                  </p>
                </div>
              </>
            )}

            {phase === 'inspection' && (
              <>
                <p className="font-semibold text-slate-900">
                  SITE INSPECTION REPORT & GEO-TAGGED FIELD SURVEY
                </p>
                <div className="p-2 bg-slate-50 border border-slate-200 rounded font-mono text-[9px] space-y-1">
                  <p>Survey Date: 25 Sep 2026 · Inspector: Junior Engineer (Site Cell)</p>
                  <p>GPS Coordinates: 18.7612° N, 73.8219° E (Plot Center)</p>
                  <p>East Side Physical Clearance: 4.52m measured to boundary line (Compliant)</p>
                  <p>Arterial Fire Hydrant: Located 46m from main entrance (Within 50m norm)</p>
                </div>
              </>
            )}
          </div>

          {/* Official Bottom Stamp & Signature Mockup */}
          <div className="absolute bottom-3 left-6 right-6 border-t border-slate-200 pt-2 flex items-center justify-between text-[9px] text-slate-400 font-mono">
            <span>OFFICIAL DIGITALLY SIGNED STATUTORY RECORD</span>
            <span className="text-emerald-700 font-bold">✓ VERIFIED BY OCR</span>
          </div>

          {/* Clean document: overlays removed for clutter-free reading */}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="p-3 bg-[#f8fafc] border-t border-[#e2e8f0] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <span>⚡</span>
          <span><strong>{config.tokens.length} statutory clauses</strong> extracted by OCR ({config.overallConfidence}% accuracy)</span>
        </div>
        {onOpenOcrInsights && (
          <button
            type="button"
            onClick={onOpenOcrInsights}
            className="px-3.5 py-1.5 bg-[#1a56db] hover:bg-blue-700 text-white rounded-md font-bold transition-colors shadow-xs flex items-center gap-1.5"
          >
            <span>Open Document OCR Insights & Approvals Page →</span>
          </button>
        )}
      </div>
    </div>
  );
}
