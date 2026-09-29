'use client';

import React, { useState, useMemo } from 'react';
import {
  ReviewPlanFlowGraph,
  ReviewFlowNodeData,
  ReviewFlowEdgeData,
} from '@/components/department/ReviewPlanFlowGraph';
import { ScrutinyFactor } from '@/domain/types';
import { SAHYADRI_DEMO, isSahyadriDemoApplication } from '@/data/fixtures/sahyadri-department-demo';

export const SCRUTINY_FACTORS: ScrutinyFactor[] = [
  {
    id: 'sf1',
    name: 'Service type',
    result: 'verified',
    condition: 'Service type is Land / Plot - configured as a factor for this scrutiny path.',
    source: 'Configured service requirements',
    rule: 'ROUTE-SVC-01',
    evaluatedAt: '23 Sep 2026, 10:42',
    detail: {
      values: [
        { label: 'Service', value: 'Land / Plot' },
        { label: 'Factor effect', value: 'Standard routing consideration' },
      ],
    },
  },
  {
    id: 'sf2',
    name: 'New construction',
    result: 'warning',
    condition: 'Proposed new construction indicated in the submitted application and Business DNA.',
    source: 'Application form + Business DNA',
    rule: 'ROUTE-CONST-01',
    evaluatedAt: '23 Sep 2026, 10:42',
    detail: {
      values: [
        { label: 'Project stage', value: 'New Construction' },
        { label: 'Factor effect', value: 'Triggers enhanced review depth', match: false },
      ],
      impact: 'Construction stage is a configured scrutiny-depth condition',
      nextReview: 'Scrutiny Workbench',
    },
  },
  {
    id: 'sf3',
    name: 'Land / plot inconsistency',
    result: 'warning',
    condition: 'Plot area in the submitted application differs from the Master Project Dossier record.',
    source: 'Master Project Dossier + Current MIDC Application',
    rule: 'Configured consistency rule: Plot Area',
    evaluatedAt: '23 Sep 2026, 10:42',
    detail: {
      values: [
        { label: 'Master Project Dossier', value: '4,800 m²', match: true },
        { label: 'MIDC Application form', value: '4,200 m²', match: false },
      ],
      impact: 'Cross-form mismatch - configured scrutiny factor',
      nextReview: 'Cross-form Consistency',
    },
  },
  {
    id: 'sf4',
    name: 'Unresolved prerequisite',
    result: 'warning',
    condition: 'MPCB Consent to Establish is pending. External dependency included as a configured scrutiny factor.',
    source: 'Connected regulatory record (MPCB)',
    rule: 'ROUTE-DEP-01',
    evaluatedAt: '23 Sep 2026, 10:42',
    detail: {
      values: [
        { label: 'Dependency', value: 'MPCB - Consent to Establish' },
        { label: 'Status', value: 'Pending', match: false },
        { label: 'Authority', value: 'MPCB' },
      ],
      impact: 'Prerequisite pending - included as routing factor',
      nextReview: 'Dependencies',
    },
  },
  {
    id: 'sf5',
    name: 'Inspection requirement',
    result: 'judgment',
    condition: 'Inspection condition configured for this service and project context. Whether inspection proceeds depends on officer assessment.',
    source: 'Configured service workflow',
    rule: 'ROUTE-INSP-01',
    evaluatedAt: '23 Sep 2026, 10:42',
    detail: {
      values: [
        { label: 'Requirement', value: 'Conditional' },
        { label: 'Configured for', value: 'Land / Plot service' },
      ],
      impact: 'Inspection may be required - officer review required',
      nextReview: 'Inspection Planning',
    },
  },
];

export interface M10ReviewPlanPageProps {
  applicationId?: string;
  onBackToOverview: () => void;
  onBackToPrecheck?: () => void;
  onOpenDna?: () => void;
  onOpenTimeline?: () => void;
  onOpenScrutinyWorkflow?: () => void;
  onOpenScrutinyWorkbench?: () => void; // Land / Plot
  onOpenBuildingScrutiny?: () => void; // Building / Planning
  onOpenWaterScrutiny?: () => void; // Water / Utility
  onOpenConsistency?: () => void;
  onOpenDepView?: () => void;
  onOpenQueryBuilder?: () => void;
  onOpenDelta?: () => void;
  onOpenInspections?: () => void;
  onOpenDetailedRoute?: () => void;
}

interface EvidenceDetail {
  id: string;
  title: string;
  category: string;
  summary: string;
  points: { label: string; value: string; flag?: boolean }[];
  docRef?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function M10ReviewPlanPage({
  applicationId,
  onBackToOverview,
  onBackToPrecheck,
  onOpenDna,
  onOpenTimeline,
  onOpenScrutinyWorkflow,
  onOpenScrutinyWorkbench,
  onOpenBuildingScrutiny,
  onOpenWaterScrutiny,
  onOpenConsistency,
  onOpenDepView,
  onOpenQueryBuilder,
  onOpenDelta,
  onOpenInspections,
  onOpenDetailedRoute,
}: M10ReviewPlanPageProps) {
  const isSahyadri = isSahyadriDemoApplication(applicationId);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceDetail | null>(null);
  const [showRoutingLogicDrawer, setShowRoutingLogicDrawer] = useState(false);
  const [showReviewDepthDrawer, setShowReviewDepthDrawer] = useState(false);
  const [officerObservation, setOfficerObservation] = useState('');
  const [showObservationInput, setShowObservationInput] = useState(false);
  const [savedObservation, setSavedObservation] = useState<string | null>(null);

  // Navigation handlers
  const handleOpenLand = () => {
    if (onOpenScrutinyWorkbench) onOpenScrutinyWorkbench();
    else if (onOpenScrutinyWorkflow) onOpenScrutinyWorkflow();
    else onBackToOverview();
  };

  const handleOpenBuilding = () => {
    if (onOpenBuildingScrutiny) onOpenBuildingScrutiny();
    else if (onOpenScrutinyWorkflow) onOpenScrutinyWorkflow();
    else onBackToOverview();
  };

  const handleOpenWater = () => {
    if (onOpenWaterScrutiny) onOpenWaterScrutiny();
    else if (onOpenScrutinyWorkflow) onOpenScrutinyWorkflow();
    else onBackToOverview();
  };

  const handleOpenConsistency = () => {
    if (onOpenConsistency) onOpenConsistency();
    else if (onOpenScrutinyWorkflow) onOpenScrutinyWorkflow();
    else onBackToOverview();
  };

  const handleOpenDependencies = () => {
    if (onOpenDepView) onOpenDepView();
    else if (onOpenScrutinyWorkflow) onOpenScrutinyWorkflow();
    else onBackToOverview();
  };

  const handleProceedToScrutinyPhase = () => {
    if (onOpenScrutinyWorkflow) {
      onOpenScrutinyWorkflow();
    } else if (onOpenBuildingScrutiny) {
      onOpenBuildingScrutiny();
    } else if (onOpenScrutinyWorkbench) {
      onOpenScrutinyWorkbench();
    } else {
      onBackToOverview();
    }
  };

  // Pre-configured evidence records
  const EVIDENCE_STORE: Record<string, EvidenceDetail> = {
    'new-construction': {
      id: 'new-construction',
      title: 'New Construction Project Profile',
      category: 'Business DNA & Scope',
      summary: 'Application proposes full structural erection on previously vacant industrial plot P-104 in MIDC Chakan Phase II.',
      points: [
        { label: 'Project Stage', value: 'New Construction (Greenfield expansion)' },
        { label: 'Plot Number', value: 'Plot P-104, Chakan Industrial Area' },
        { label: 'Proposed Built-up Area', value: '2,300 sq.m across 2 shop floors' },
        { label: 'Activity Classification', value: 'Precision CNC Machining & Fabrication' },
      ],
      docRef: 'DOC-SITE-PLAN-00418 · Site Master Plan',
      actionLabel: 'Open Building Scrutiny ↗',
      onAction: handleOpenBuilding,
    },
    'plot-threshold': {
      id: 'plot-threshold',
      title: 'Plot Area Review Threshold',
      category: 'Statutory Configuration',
      summary: 'Plot area of 4,800 sq.m exceeds the standard 2,000 sq.m expedited track threshold, automatically activating full technical scrutiny.',
      points: [
        { label: 'Allotted Plot Area', value: '4,800 sq.m (0.48 Hectares)' },
        { label: 'Expedited Review Ceiling', value: '2,000 sq.m max threshold', flag: true },
        { label: 'Configured Routing Rule', value: 'ROUTE-THRESHOLD-04 (Scale Factor)' },
        { label: 'Review Depth Triggered', value: 'Enhanced Technical Review' },
      ],
      docRef: 'DOC-ALLOT-00418 · MIDC Allotment Letter',
      actionLabel: 'Open Land / Plot Review ↗',
      onAction: handleOpenLand,
    },
    'hazardous-activity': {
      id: 'hazardous-activity',
      title: 'Hazardous Chemical Operations Declared',
      category: 'Environment & Safety',
      summary: 'Use of Trichloroethylene industrial degreaser declared under manufacturing operations, activating Red Category environmental scrutiny.',
      points: [
        { label: 'Chemical Declared', value: 'Trichloroethylene (TCE Solvent)' },
        { label: 'Monthly Consumption', value: '450 Litres / month', flag: true },
        { label: 'MPCB Pollution Category', value: 'Red Category (High Environmental Impact)' },
        { label: 'Effluent Generation', value: '28 KLD trade effluent to ETP' },
      ],
      docRef: 'DOC-DNA-ENV-001 · Environmental Profile Declaration',
      actionLabel: 'View Dependencies ↗',
      onAction: handleOpenDependencies,
    },
    'crossform-mismatch': {
      id: 'crossform-mismatch',
      title: 'Cross-form Record Discrepancy',
      category: 'Record Integrity',
      summary: 'Plot area inconsistency detected between Master Project Dossier (4,800 sq.m) and MIDC Application Form (4,200 sq.m).',
      points: [
        { label: 'Master Project Dossier', value: '4,800 sq.m' },
        { label: 'Registered Lease Deed', value: '4,800 sq.m' },
        { label: 'MIDC Application Form', value: '4,200 sq.m', flag: true },
        { label: 'Variance', value: '600 sq.m deficit (-12.5%)' },
      ],
      docRef: 'DOC-LEASE-DEED-00418 · Registered MIDC Lease Deed',
      actionLabel: 'Review Consistency ↗',
      onAction: handleOpenConsistency,
    },
    'external-prereq': {
      id: 'external-prereq',
      title: 'External Department Prerequisites',
      category: 'Regulatory Dependencies',
      summary: 'Prerequisite clearances from MPCB and Fire Authority are pending or require revalidation before building sanction.',
      points: [
        { label: 'MPCB Consent to Establish', value: 'Application submitted · Awaiting MPCB issuance', flag: true },
        { label: 'Fire Provisional NOC', value: 'Expired on 10 Sep 2026 · Renewal required', flag: true },
        { label: 'MSEDCL Power Feasibility', value: 'Feasibility approved for 1.2 MVA' },
        { label: 'MIDC Water Allotment', value: 'Connection verified for 45 KLD' },
      ],
      docRef: 'DEP-MPCB-CTE-2026 · Connected External Portal Record',
      actionLabel: 'View Dependencies Graph ↗',
      onAction: handleOpenDependencies,
    },
    'precheck-evidence': {
      id: 'precheck-evidence',
      title: 'Automated Pre-check Findings Record',
      category: 'Machine Verification',
      summary: '30 automated checks completed: 21 verified without issue, 8 warnings requiring review, 1 item needing statutory officer judgment.',
      points: [
        { label: 'Total Checks Evaluated', value: '30 automated rules' },
        { label: 'Machine Verified', value: '21 rules passed' },
        { label: 'Review Required', value: '8 warnings flagged', flag: true },
        { label: 'Officer Judgment', value: '1 condition (Plot zoning suitability)' },
      ],
      docRef: 'PRECHECK-RUN-20260923-1042',
      actionLabel: 'Open Automated Pre-check ↗',
      onAction: onBackToPrecheck,
    },
    'changes-evidence': {
      id: 'changes-evidence',
      title: 'Resubmission Field Changes',
      category: 'Delta Tracking',
      summary: 'Applicant modified investment and production capacity values following initial query notice.',
      points: [
        { label: 'Proposed Investment', value: 'Updated from ₹40 Cr to ₹42 Cr (+₹2 Cr)', flag: true },
        { label: 'Manufacturing Capacity', value: 'Updated from 500 MT/yr to 550 MT/yr (+10%)', flag: true },
        { label: 'Resubmission Date', value: '18 Sep 2026' },
        { label: 'Impact on Routing', value: 'Maintains Enhanced Review depth' },
      ],
      docRef: 'RESUBMISSION-V2 · 18 Sep 2026',
      actionLabel: 'Open Building Scrutiny ↗',
      onAction: handleOpenBuilding,
    },
  };



  // Dynamic Cytoscape Graph Topology
  const graphElements = useMemo(() => {
    const parallelTracks: ReviewFlowNodeData[] = [
      {
        id: 'rev-land',
        label: '3A. Land / Plot Review',
        subLabel: 'Plot Boundary & Zoning',
        status: 'completed',
        desk: 'Land / Plot Desk',
        whyActive: 'Plot information statutory verification',
        findings: 'Verified against Cadastral GIS · Ready',
        actionText: 'Open Land / Plot Review →',
        onAction: handleOpenLand,
        isParallel: true,
      },
      {
        id: 'rev-bldg',
        label: '3B. Building / Planning',
        subLabel: isSahyadri ? 'Building Plan v2 & built-up area' : 'BUA & Side Setback Deficit',
        status: 'current',
        desk: 'Planning / Building Scrutiny',
        whyActive: 'New construction + architectural plan',
        findings: isSahyadri ? '3,200 sq.m application vs 3,050 sq.m plan' : 'East setback deficit (4.20m vs 4.50m required)',
        actionText: 'Open Building Review →',
        onAction: handleOpenBuilding,
        isParallel: true,
      },
      {
        id: 'rev-water',
        label: '3C. Water / Utility Scrutiny',
        subLabel: '45 KLD Substation & ETP Feed',
        status: isSahyadri ? 'completed' : 'upcoming',
        desk: 'Utility / Water Scrutiny',
        whyActive: 'Activated from Business DNA demand',
        findings: isSahyadri ? 'Not required for this MIDC review plan' : 'ETP Zero Liquid Discharge verified',
        actionText: 'Open Water Review →',
        onAction: handleOpenWater,
        isParallel: true,
      },
    ];

    const allNodes: ReviewFlowNodeData[] = [
      {
        id: 'precheck',
        label: '1. Automated Pre-check',
        subLabel: '30 Statutory Rules Evaluated',
        status: 'completed',
        desk: 'Automated Machine Rules',
        whyActive: 'Initial extraction and validation gate',
        findings: '21 Verified · 8 Warnings · 1 Judgment',
        actionText: 'View Pre-check →',
        onAction: onBackToPrecheck,
      },
      {
        id: 'review-plan',
        label: '2. Review Plan (M10)',
        subLabel: 'Routing & Multi-Track Map',
        status: 'current',
        desk: 'Scrutiny Command Cell',
        whyActive: 'Directs workstreams and parallel reviews',
        findings: 'Enhanced Review depth configured',
        actionText: 'Current Step',
      },
      ...parallelTracks,
      {
        id: 'consistency',
        label: '4A. Cross-form Consistency',
        subLabel: 'Multi-record Reconciliation',
        status: 'attention',
        desk: 'Planning / Legal Desk',
        whyActive: 'Cross-document field comparison',
        findings: isSahyadri ? 'Plot area consistent across 3 trusted sources' : 'Plot area mismatch (4,800 vs 4,200 sq.m)',
        actionText: 'Review Consistency →',
        onAction: handleOpenConsistency,
      },
      {
        id: 'dependencies',
        label: '4B. Regulatory Dependencies',
        subLabel: 'MPCB Consent & Fire NOC',
        status: 'pending',
        desk: 'Inter-department Desk',
        whyActive: 'External prerequisite tracking',
        findings: 'MPCB Consent & Fire NOC Pending',
        actionText: 'View Dependencies →',
        onAction: handleOpenDependencies,
      },
      {
        id: 'query',
        label: '5A. Queries / Deficiencies',
        subLabel: 'Applicant Clarifications',
        status: 'upcoming',
        desk: 'Assigned Scrutiny Desk',
        whyActive: 'Drafting clarifications if needed',
        findings: '3 potential query candidates identified',
        actionText: 'Open Query Builder →',
        onAction: onOpenQueryBuilder,
      },
      {
        id: 'inspection',
        label: '5B. Site Inspection',
        subLabel: 'Field Verification Visit',
        status: 'upcoming',
        desk: 'Junior Engineer Site Cell',
        whyActive: 'Conditional upon officer findings',
        findings: 'Not scheduled · Pending technical review',
        actionText: 'View Inspection Planning →',
        onAction: onOpenInspections,
      },
      {
        id: 'delta',
        label: '5C. Delta Re-scrutiny',
        subLabel: 'Resubmission Analysis',
        status: 'upcoming',
        desk: 'Technical Scrutiny Desk',
        whyActive: 'Triggered when applicant resubmits',
        findings: 'Isolates changed vs unchanged fields',
        actionText: 'View Delta Workflow →',
        onAction: onOpenDelta,
      },
      {
        id: 'decision',
        label: '6. Statutory Decision',
        subLabel: 'Sanction Orders & Endorsement',
        status: 'upcoming',
        desk: 'Executive Engineer / Authority',
        whyActive: 'Final determination and approval orders',
        findings: 'Awaiting completion of all workstreams',
        actionText: 'Decision Desk',
      },
    ];

    const allEdges: ReviewFlowEdgeData[] = [
      { id: 'e-pre-plan', source: 'precheck', target: 'review-plan' },
      { id: 'e-plan-land', source: 'review-plan', target: 'rev-land', label: 'Parallel Track', isParallel: true },
      { id: 'e-plan-bldg', source: 'review-plan', target: 'rev-bldg', label: 'Parallel Track', isParallel: true },
      { id: 'e-plan-water', source: 'review-plan', target: 'rev-water', label: 'Parallel Track', isParallel: true },
      { id: 'e-land-cons', source: 'rev-land', target: 'consistency' },
      { id: 'e-bldg-cons', source: 'rev-bldg', target: 'consistency' },
      { id: 'e-bldg-dep', source: 'rev-bldg', target: 'dependencies' },
      { id: 'e-water-dep', source: 'rev-water', target: 'dependencies' },
      { id: 'e-cons-query', source: 'consistency', target: 'query' },
      { id: 'e-dep-query', source: 'dependencies', target: 'query' },
      { id: 'e-dep-insp', source: 'dependencies', target: 'inspection' },
      { id: 'e-query-delta', source: 'query', target: 'delta' },
      { id: 'e-insp-dec', source: 'inspection', target: 'decision' },
      { id: 'e-delta-dec', source: 'delta', target: 'decision' },
      { id: 'e-query-dec', source: 'query', target: 'decision' },
    ];

    return { nodes: allNodes, edges: allEdges };
  }, [
    handleOpenLand,
    handleOpenBuilding,
    handleOpenWater,
    handleOpenConsistency,
    handleOpenDependencies,
    onBackToPrecheck,
    onOpenQueryBuilder,
    onOpenDelta,
    onOpenInspections,
  ]);

  return (
    <div className="flex-1 bg-[#F9FAF2] overflow-y-auto">
      {/* ── Evidence Detail Drawer ────────────────────────────────────────── */}
      {selectedEvidence && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label={`Evidence: ${selectedEvidence.title}`}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" onClick={() => setSelectedEvidence(null)} />
          <div className="relative bg-white w-full max-w-lg h-full overflow-y-auto shadow-2xl flex flex-col border-l border-[#d6dfd5]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#d6dfd5] bg-[#F9FAF2] shrink-0">
              <div>
                <span className="text-[10px] font-bold text-[#6DAE7C] uppercase tracking-wider">
                  {selectedEvidence.category}
                </span>
                <h3 className="text-sm font-bold text-[#2B2B2B] mt-0.5">{selectedEvidence.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvidence(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded font-bold text-base"
                aria-label="Close drawer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs flex-1">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Finding Summary:
                </span>
                <p className="text-slate-800 leading-relaxed bg-[#F9FAF2] p-3 rounded-lg border border-[#e3ebe1]">
                  {selectedEvidence.summary}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Evaluated Data Points:
                </span>
                <div className="border border-[#e3ebe1] rounded-lg divide-y divide-[#e3ebe1] overflow-hidden">
                  {selectedEvidence.points.map((pt, idx) => (
                    <div key={idx} className="flex items-center justify-between px-3.5 py-2.5 bg-white">
                      <span className="text-slate-600 font-medium">{pt.label}</span>
                      <span
                        className={`font-semibold font-mono ${
                          pt.flag
                            ? 'text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200'
                            : 'text-slate-900'
                        }`}
                      >
                        {pt.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedEvidence.docRef && (
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Supporting Document Reference:
                  </span>
                  <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-blue-950 font-medium flex items-center gap-2">
                    <span>{selectedEvidence.docRef}</span>
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-[#e3ebe1] text-[11px] text-slate-500 italic">
                System-extracted evidence provided to assist officer review. Statutory compliance is determined exclusively by the authorized officer.
              </div>
            </div>

            <div className="p-4 border-t border-[#d6dfd5] bg-[#F9FAF2] flex items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedEvidence(null)}
                className="px-4 py-2 border border-[#c8d4c7] text-slate-700 text-xs font-semibold rounded hover:bg-slate-100 transition-colors"
              >
                Close Drawer
              </button>
              {selectedEvidence.onAction && (
                <button
                  type="button"
                  onClick={() => {
                    const action = selectedEvidence.onAction;
                    setSelectedEvidence(null);
                    action?.();
                  }}
                  className="px-4 py-2 bg-[#355E3B] text-white text-xs font-bold rounded hover:bg-[#27472c] transition-colors shadow-xs"
                >
                  {selectedEvidence.actionLabel || 'Inspect in Detail →'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Why Review Depth Drawer ───────────────────────────────────────── */}
      {showReviewDepthDrawer && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Review depth explanation"
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" onClick={() => setShowReviewDepthDrawer(false)} />
          <div className="relative bg-white w-full max-w-lg h-full overflow-y-auto shadow-2xl flex flex-col border-l border-[#d6dfd5]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#d6dfd5] bg-[#F9FAF2] shrink-0">
              <div>
                <span className="text-[10px] font-bold text-[#6DAE7C] uppercase tracking-wider">
                  Scrutiny Depth Basis
                </span>
                <h3 className="text-sm font-bold text-[#2B2B2B] mt-0.5">Why Enhanced Review?</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowReviewDepthDrawer(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded font-bold text-base"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs flex-1">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider block mb-1">
                  Assigned Route:
                </span>
                <span className="text-sm font-bold text-blue-950">ENHANCED REVIEW</span>
                <p className="text-blue-900 text-[11px] mt-1">
                  Triggered by configured regulatory policy factors. Scrutiny depth establishes the intensity of officer checks, not an approval outcome.
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Triggered Policy Factors:
                </span>
                <div className="space-y-2">
                  {SCRUTINY_FACTORS.map((factor) => (
                    <div key={factor.id} className="p-3 bg-[#F9FAF2] border border-[#e3ebe1] rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900">{factor.name}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            factor.result === 'warning'
                              ? 'bg-amber-100 text-amber-800'
                              : factor.result === 'verified'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {factor.result === 'warning'
                            ? 'Factor Triggered'
                            : factor.result === 'verified'
                            ? 'Standard Match'
                            : 'Judgment Required'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1">{factor.condition}</p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-1 border-t border-slate-200">
                        <span>Rule: {factor.rule}</span>
                        <span>Source: {factor.source}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px]">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Rule Version:</span>
                  <span className="font-mono text-slate-800 font-semibold">MIDC Scrutiny Config v1.2</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Evaluated At:</span>
                  <span className="text-slate-800 font-semibold">23 Sep 2026, 10:42</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 italic">
                Rule engine evaluation strictly governs procedural depth. It does not predict approval or reject applications.
              </div>
            </div>

            <div className="p-4 border-t border-[#d6dfd5] bg-[#F9FAF2] flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => setShowReviewDepthDrawer(false)}
                className="px-4 py-2 bg-[#355E3B] text-white text-xs font-bold rounded hover:bg-[#27472c] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Advanced Routing Logic / Audit Drawer (Preserved from legacy) ──── */}
      {showRoutingLogicDrawer && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Routing logic detail"
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" onClick={() => setShowRoutingLogicDrawer(false)} />
          <div className="relative bg-white w-full max-w-md h-full overflow-y-auto shadow-xl flex flex-col border-l border-[#d6dfd5]">
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#d6dfd5] bg-[#F9FAF2] shrink-0">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                  Administrative Audit & Logic
                </p>
                <h3 className="text-sm font-bold text-[#2B2B2B]">Configured Scrutiny Route Rule</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowRoutingLogicDrawer(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded font-bold text-base"
              >
                ✕
              </button>
            </div>
            <div className="p-5 space-y-4 text-xs flex-1">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">Route Produced</p>
                <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#355E3B] text-white text-[11px] font-bold">
                  ENHANCED REVIEW
                </span>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Conditions Evaluated</p>
                <ul className="space-y-1 text-slate-800">
                  {[
                    'Service type',
                    'Project stage',
                    'New construction',
                    'Land consistency',
                    'Dependency state',
                    'Cross-form consistency',
                    'Inspection requirement',
                  ].map((c) => (
                    <li key={c} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Triggered Conditions</p>
                <ul className="space-y-1 text-slate-800">
                  {[
                    'New construction',
                    'Land / plot inconsistency',
                    'Unresolved prerequisite (MPCB)',
                    'Inspection requirement (conditional)',
                  ].map((c) => (
                    <li key={c} className="flex items-center gap-2">
                      <span className="text-amber-600">⚠</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">Source</p>
                  <p className="text-slate-800">Configured workflow rule</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">Rule Version</p>
                  <p className="text-slate-800">MIDC Scrutiny Config v1.2</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">Evaluated At</p>
                  <p className="text-slate-800">23 Sep 2026, 10:42</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">Result</p>
                  <p className="font-semibold text-[#355E3B]">Enhanced Review</p>
                </div>
              </div>
              <div className="pt-2 border-t border-[#d6dfd5]">
                <p className="text-[10px] text-slate-500 italic">
                  System-applied configured routing rule. This is not an AI decision or statutory legal finding. Route determines scrutiny depth only.
                </p>
              </div>
            </div>
            <div className="p-4 border-t border-[#d6dfd5] bg-[#F9FAF2] flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => setShowRoutingLogicDrawer(false)}
                className="px-4 py-2 bg-slate-700 text-white text-xs font-semibold rounded hover:bg-slate-800"
              >
                Close Audit View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Main Scrollable Page Content ─────────────────────────────────── */}
      <div className="w-full max-w-[1380px] mx-auto px-6 py-6 space-y-6">
        {/* 1. Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <button type="button" onClick={onBackToOverview} className="hover:text-slate-800">
            Department Home
          </button>
          <span>/</span>
          <button type="button" onClick={onBackToOverview} className="hover:text-slate-800">
            Scrutiny
          </button>
          <span>/</span>
          <button type="button" onClick={onBackToOverview} className="hover:text-slate-800">
            Application
          </button>
          <span>/</span>
          <span className="font-bold text-slate-900">Review Plan</span>
        </div>

        {/* 2. Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl font-bold text-[#355E3B]">Review Plan</h1>
              <span className="text-[11px] font-semibold text-[#355E3B] bg-[#edf5ef] border border-[#a1cba9] px-2 py-0.5 rounded">
                Generated from automated pre-check + Business DNA + configured regulatory rules
              </span>
            </div>
            <p className="text-xs text-[#555C56] mt-1">
              See why this application was routed for review and what needs to be checked.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {onBackToPrecheck && (
              <button
                type="button"
                onClick={onBackToPrecheck}
                className="px-3 py-1.5 border border-[#c8d4c7] text-xs font-semibold text-[#355E3B] bg-white hover:bg-slate-50 rounded transition-colors"
              >
                ← Automated Pre-check
              </button>
            )}
            {onOpenDetailedRoute && (
              <button
                type="button"
                onClick={onOpenDetailedRoute}
                className="px-3 py-1.5 border border-[#355E3B] text-xs font-bold text-[#355E3B] bg-white hover:bg-slate-50 rounded transition-colors flex items-center gap-1"
              >
                <span>Detailed Route Plan</span>
                <span aria-hidden="true">↗</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleProceedToScrutinyPhase}
              className="px-4 py-1.5 bg-[#065f46] hover:bg-[#044e3a] text-white text-xs font-bold rounded shadow-xs transition-colors flex items-center gap-1.5"
            >
              Continue to Scrutiny Workflow →
            </button>
          </div>
        </div>

        {/* 3. Compact Application Context Strip */}
        <div className="bg-white border border-[#d6dfd5] rounded-xl p-4 shadow-xs">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Application ID:</span>
              <span className="font-mono font-bold text-[#355E3B]">MIDC-APP-2026-00418</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Business:</span>
              <span className="font-semibold text-slate-900 truncate block">{isSahyadri ? SAHYADRI_DEMO.business.name : 'Aster Precision Components'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Service:</span>
              <span className="font-semibold text-slate-900">{isSahyadri ? SAHYADRI_DEMO.application.service : 'Building / Planning'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Current State:</span>
              <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                TECHNICAL_SCRUTINY
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">SLA Status:</span>
              <span className="font-semibold text-amber-700">{isSahyadri ? SAHYADRI_DEMO.application.sla : 'Approaching deadline'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Current Desk:</span>
              <span className="font-semibold text-slate-800 truncate block">Planning / Building Scrutiny</span>
            </div>
          </div>
        </div>

        {/* 4. Interactive Review Flow Graph (Hero Element / Main Attraction) */}
        <div className="space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-[#2B2B2B] uppercase tracking-wider">
                  Review Flow Architecture
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                  Interactive Plan
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Visual map of upstream gates, parallel service review desks, cross-form reconciliations, and statutory decision paths.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 hidden md:inline">
                Concurrent Execution:
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-semibold text-blue-900">
                <span>Parallel Review Streams Active</span>
              </span>
            </div>
          </div>

          <ReviewPlanFlowGraph
            nodes={graphElements.nodes}
            edges={graphElements.edges}
            height={700}
          />
        </div>

        {/* 5. Your Review Tasks (Action-focused Section) */}
        <div className="bg-white border-2 border-[#355E3B] rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-bold text-[#2B2B2B] uppercase tracking-wider">Your Review Tasks</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                High-priority scrutiny items requiring officer action for this application.
              </p>
            </div>
            <span className="px-2.5 py-1 bg-amber-100 text-amber-800 border border-amber-300 rounded text-xs font-bold">
              3 review areas active
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="p-3.5 bg-[#F9FAF2] border border-blue-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span className="text-xs font-bold text-slate-900">1. Building / Planning Scrutiny</span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                    Current Desk
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  1 finding requires review · East setback margin is 4.20m against 4.50m minimum standard; built-up area schedule discrepancy.
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenBuilding}
                className="px-4 py-2 bg-[#355E3B] hover:bg-[#27472c] text-white text-xs font-bold rounded transition-colors shrink-0 shadow-xs"
              >
                Open Building Review →
              </button>
            </div>

            <div className="p-3.5 bg-[#F9FAF2] border border-amber-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-xs font-bold text-slate-900">2. Cross-form Consistency Check</span>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                    Attention Required
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  1 mismatch detected · Plot area recorded as 4,800 sq.m in Master Dossier vs 4,200 sq.m in MIDC Application Form.
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenConsistency}
                className="px-4 py-2 bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold rounded transition-colors shrink-0"
              >
                Review Mismatch →
              </button>
            </div>

            <div className="p-3.5 bg-[#F9FAF2] border border-purple-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-600" />
                  <span className="text-xs font-bold text-slate-900">3. Regulatory Dependencies Verification</span>
                  <span className="text-[10px] font-bold text-purple-800 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                    Prerequisites Pending
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  2 prerequisites pending · MPCB Consent to Establish clearance in progress; Fire Provisional NOC expired.
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenDependencies}
                className="px-4 py-2 bg-white hover:bg-purple-50 text-purple-900 border border-purple-300 text-xs font-bold rounded transition-colors shrink-0"
              >
                View Dependencies →
              </button>
            </div>
          </div>
        </div>

        {/* 10. Review Depth & Inspection Status (Sections 12 & 13) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-[#d6dfd5] rounded-xl p-4 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Review Depth</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#355E3B]">Enhanced Review</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-200">
                  Active Depth
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Selected based on greenfield construction, plot size (4,800 sq.m), and cross-form variances.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Rule: MIDC Scrutiny Config v1.2</span>
              <button
                type="button"
                onClick={() => setShowReviewDepthDrawer(true)}
                className="text-xs font-bold text-[#6DAE7C] hover:underline"
              >
                Why this review depth? →
              </button>
            </div>
          </div>

          <div className="bg-white border border-[#d6dfd5] rounded-xl p-4 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Inspection Requirement
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-800">Conditional</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  ○ Conditional
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                May be required based on service workflow and officer findings during technical scrutiny.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-emerald-700 font-medium">No inspection currently required</span>
              {onOpenInspections && (
                <button
                  type="button"
                  onClick={onOpenInspections}
                  className="text-xs font-bold text-[#6DAE7C] hover:underline"
                >
                  View Inspection Plan →
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 11. Evidence Behind the Review Plan (Section 14) */}
        <div className="bg-white border border-[#d6dfd5] rounded-xl p-5 shadow-xs">
          <div className="mb-3">
            <h2 className="text-sm font-bold text-[#2B2B2B] uppercase tracking-wider">
              Evidence Behind the Review Plan
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Primary application and machine verification sources informing this routing plan:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            <div className="p-3 bg-[#F9FAF2] border border-[#e3ebe1] rounded-lg flex flex-col justify-between">
              <div>
                <span className="font-bold text-slate-900 block mb-1">Pre-check Findings</span>
                <p className="text-slate-500 text-[11px]">30 automated checks (21 verified, 8 warnings).</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvidence(EVIDENCE_STORE['precheck-evidence'])}
                className="text-[11px] text-[#6DAE7C] hover:underline font-bold mt-3 text-left"
              >
                View evidence →
              </button>
            </div>

            <div className="p-3 bg-[#F9FAF2] border border-[#e3ebe1] rounded-lg flex flex-col justify-between">
              <div>
                <span className="font-bold text-slate-900 block mb-1">Business DNA</span>
                <p className="text-slate-500 text-[11px]">Manufacturing, Plot P-104, Red Category.</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvidence(EVIDENCE_STORE['new-construction'])}
                className="text-[11px] text-[#6DAE7C] hover:underline font-bold mt-3 text-left"
              >
                View evidence →
              </button>
            </div>

            <div className="p-3 bg-[#F9FAF2] border border-[#e3ebe1] rounded-lg flex flex-col justify-between">
              <div>
                <span className="font-bold text-slate-900 block mb-1">Consistency</span>
                <p className="text-slate-500 text-[11px]">Plot area mismatch (4,800 vs 4,200 sq.m).</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvidence(EVIDENCE_STORE['crossform-mismatch'])}
                className="text-[11px] text-[#6DAE7C] hover:underline font-bold mt-3 text-left"
              >
                View evidence →
              </button>
            </div>

            <div className="p-3 bg-[#F9FAF2] border border-[#e3ebe1] rounded-lg flex flex-col justify-between">
              <div>
                <span className="font-bold text-slate-900 block mb-1">Dependencies</span>
                <p className="text-slate-500 text-[11px]">MPCB Consent & Fire NOC clearances.</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvidence(EVIDENCE_STORE['external-prereq'])}
                className="text-[11px] text-[#6DAE7C] hover:underline font-bold mt-3 text-left"
              >
                View evidence →
              </button>
            </div>

            <div className="p-3 bg-[#F9FAF2] border border-[#e3ebe1] rounded-lg flex flex-col justify-between">
              <div>
                <span className="font-bold text-slate-900 block mb-1">Changes</span>
                <p className="text-slate-500 text-[11px]">Investment & capacity resubmission deltas.</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvidence(EVIDENCE_STORE['changes-evidence'])}
                className="text-[11px] text-[#6DAE7C] hover:underline font-bold mt-3 text-left"
              >
                View evidence →
              </button>
            </div>
          </div>
        </div>

        {/* 12. Collapsed Audit & Route Observation (Section 16 & 22) */}
        <div className="bg-white border border-[#d6dfd5] rounded-xl p-4 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <span>
                Route evaluation recorded in audit history. Route version: MIDC Scrutiny Config v1.2 · Evaluated: 23 Sep 2026, 10:42.
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setShowObservationInput((v) => !v)}
                className="text-xs text-[#6DAE7C] hover:underline font-semibold"
              >
                {showObservationInput ? 'Hide observation' : '+ Add route observation'}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onOpenDetailedRoute) onOpenDetailedRoute();
                  else setShowRoutingLogicDrawer(true);
                }}
                className="text-xs text-[#355E3B] hover:underline font-bold"
              >
                View routing details →
              </button>
            </div>
          </div>

          {showObservationInput && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2 animate-in fade-in duration-150">
              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                Internal Officer Route Observation Note:
              </label>
              <textarea
                value={officerObservation}
                onChange={(e) => setOfficerObservation(e.target.value)}
                rows={2}
                placeholder="Record observation notes on configured route or factor justifications for subsequent desks..."
                className="w-full text-xs p-2.5 border border-[#c8d4c7] rounded bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#6DAE7C]"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (officerObservation.trim()) {
                      setSavedObservation(officerObservation);
                      setShowObservationInput(false);
                    }
                  }}
                  className="px-3 py-1 bg-[#355E3B] text-white text-xs font-semibold rounded hover:bg-[#27472c]"
                >
                  Save Note
                </button>
              </div>
            </div>
          )}

          {savedObservation && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-900 flex items-center justify-between">
              <span>Saved observation note: "{savedObservation}"</span>
              <span className="text-[10px] text-emerald-700 font-semibold">Recorded for audit</span>
            </div>
          )}
        </div>

        {/* 13. Next Action CTA Footer Bar (Section 17 & Final CTA) */}
        <div className="bg-white border-2 border-[#355E3B] rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#355E3B] uppercase tracking-wider">
                Next Review Workstream
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                Ready for Scrutiny
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Review Plan verified. Ready to proceed to statutory officer scrutiny.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={handleOpenBuilding}
              className="px-4 py-2 border border-[#c8d4c7] text-[#355E3B] hover:bg-slate-50 text-xs font-bold rounded transition-colors"
            >
              Open Building / Planning Review →
            </button>

            <button
              type="button"
              onClick={handleProceedToScrutinyPhase}
              className="px-5 py-2 bg-[#065f46] hover:bg-[#044e3a] text-white text-xs font-bold rounded transition-colors shadow-xs flex items-center gap-1.5"
            >
              Continue to Scrutiny Workflow →
            </button>
          </div>
        </div>

        <p className="text-[10px] text-slate-400 italic text-center pb-4">
          All values are fictional prototype data and do not represent actual MIDC records, legal thresholds, or official processing requirements.
        </p>
      </div>
    </div>
  );
}
