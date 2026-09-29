'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import { useRegulatoryAssistant } from '@/features/regulatory-assistant/Provider';
import { inlineContext } from '@/features/regulatory-assistant/context';
import {
  listJourneyNodesForBusiness,
  journeyStateCfg,
  getEnrichment,
  STAGES,
  type JourneyReq,
} from './data';

const REQUIREMENT_SUMMARIES: Record<string, string> = {
  'LAND-001': 'Formal allotment and physical possession confirmation of industrial plot within MIDC industrial estate.',
  'EST-001': 'Statutory environmental permission granted by MPCB before setting up any industrial plant or commencing physical construction.',
  'CON-001': 'Formal sanction of architectural and structural construction drawings by the local planning authority before starting construction.',
  'CON-002': 'Provisional clearance issued by Fire Services confirming that proposed building drawings comply with fire protection norms.',
  'UTIL-001': 'High-tension electricity supply sanction and connection agreement with MSEDCL / MIDC.',
  'UTIL-002': 'Industrial water supply sanction and pipeline connection permission from MIDC water supply department.',
  'UTIL-003': 'Permission for groundwater extraction and borewell drilling from the competent groundwater authority.',
  'UTIL-004': 'NOC from local municipal authority or MIDC for connecting domestic and industrial wastewater discharge.',
  'PREOP-001': 'Statutory operational consent required from MPCB before starting manufacturing operations or trial runs.',
  'PREOP-002': 'Official factory registration and occupier license issued by the Directorate of Industrial Safety & Health (DISH).',
  'PREOP-003': 'Registration and statutory inspection certificate for industrial boilers prior to operation.',
  'PREOP-004': 'Final inspection and Fire Safety NOC required prior to building occupancy and operations.',
  'COMPLY-001': 'Periodic environmental compliance monitoring reports and returns mandated under consent conditions.',
};

function SectionCard({
  title,
  questionNumber,
  questionLabel,
  children,
  id,
  className = '',
}: {
  title: string;
  questionNumber?: string;
  questionLabel?: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden ${className}`}>
      <div className="px-5 py-3.5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between gap-3">
        <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          {questionNumber && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#17365D] text-white text-[10px] font-bold">
              {questionNumber}
            </span>
          )}
          <span>{title}</span>
        </h2>
        {questionLabel && (
          <span className="text-[10px] font-semibold text-[#17365D] bg-[#17365D]/8 px-2 py-0.5 rounded border border-[#17365D]/15">
            {questionLabel}
          </span>
        )}
      </div>
      <div className="px-5 py-4">{children}</div>
    </section>
  );
}

export function RequirementDetailScreen({
  project,
  requirementId,
}: {
  project: BusinessProject;
  requirementId: string;
}) {
  const [cteApproved, setCteApproved] = useState(false);
  const { openAssistant, pageContext } = useRegulatoryAssistant();

  const nodes = listJourneyNodesForBusiness(project.id, cteApproved);
  const req = nodes.find(n => n.id === requirementId);

  if (!req) {
    return (
      <main id="main-content" className="flex-1 bg-[#F8F9FA] flex items-center justify-center min-h-[60vh]" tabIndex={-1}>
        <div className="max-w-[900px] mx-auto px-6 py-12 text-center">
          <h1 className="text-xl font-bold text-slate-800">Requirement Not Found</h1>
          <p className="text-sm text-slate-500 mt-2">
            The requested requirement could not be located for this business project.
          </p>
          <Link
            href={ENTREPRENEUR_ROUTES.journey(project.id)}
            className="mt-5 inline-block text-sm font-semibold text-[#1a56db] hover:underline"
          >
            ← Return to Regulatory Journey
          </Link>
        </div>
      </main>
    );
  }

  const cfg = journeyStateCfg(req.displayState);
  const enrich = getEnrichment(req.id, project.name, project.location);
  const prereqs = req.dependencies.map(d => nodes.find(n => n.id === d.reqId)).filter(Boolean) as JourneyReq[];
  const pendingPrereqs = prereqs.filter(p => p.displayState !== 'approved');
  const downstream = nodes.filter(n => n.dependencies.some(d => d.reqId === req.id));
  const parallel = enrich.parallelServices.map(id => nodes.find(n => n.id === id)).filter(Boolean) as JourneyReq[];

  const isReady = req.displayState === 'ready';
  const isApproved = req.displayState === 'approved';
  const isWaiting = req.displayState === 'waiting' || (pendingPrereqs.length > 0 && !isApproved);
  const isUnderReview = req.displayState === 'under-review';
  const isInProgress = req.displayState === 'in-progress';
  const isActionRequired = req.displayState === 'action-required';

  const stageInfo = STAGES.find(s => s.key === req.stage);
  const requirementSummary =
    REQUIREMENT_SUMMARIES[req.id] ??
    `${req.service} is a required statutory clearance administered by ${req.department} under applicable Maharashtra state regulations.`;

  const openRequirementAssistant = () =>
    openAssistant({
      origin: 'inline',
      mode: 'entity',
      context: inlineContext(pageContext, {
        pageType: 'requirement-detail',
        pageTitle: 'Requirement Detail',
        label: req.service,
        entities: { businessId: project.id, requirementId: req.id },
        recordTitle: req.service,
      }),
    });

  // Determine Primary Action (Ensure single, obvious primary action, no duplicate destinations)
  type PrimaryAction = {
    canApplyText: string;
    canApplyBadge: string;
    description: string;
    buttonLabel?: string;
    buttonHref?: string;
    theme: 'emerald' | 'amber' | 'blue' | 'indigo' | 'slate';
  };

  const primaryAction: PrimaryAction = (() => {
    if (isApproved) {
      return {
        canApplyText: 'Approved & Completed',
        canApplyBadge: 'Approved',
        description: `This clearance is approved and active.${req.approvalRef ? ` Reference No: ${req.approvalRef}` : ''}${req.approvedDate ? ` (Granted on ${req.approvedDate})` : ''}.`,
        theme: 'emerald',
      };
    }

    if (isWaiting && pendingPrereqs.length > 0) {
      const blockingReq = pendingPrereqs[0];
      return {
        canApplyText: 'Not Yet — Complete Prerequisite First',
        canApplyBadge: 'Prerequisite Required',
        description: `You must obtain approval for ${blockingReq.service} (${blockingReq.department}) before applying for this requirement.`,
        buttonLabel: 'Complete Prerequisite →',
        buttonHref: ENTREPRENEUR_ROUTES.requirement(project.id, blockingReq.id),
        theme: 'amber',
      };
    }

    if (isUnderReview) {
      return {
        canApplyText: 'Submitted — Under Department Review',
        canApplyBadge: 'Under Review',
        description: `Your application has been submitted to ${req.department} and is currently undergoing scrutiny. No applicant action required.`,
        theme: 'blue',
      };
    }

    if (isInProgress) {
      return {
        canApplyText: 'Yes — Application Draft Open',
        canApplyBadge: 'Draft in Progress',
        description: 'You have an active application draft for this requirement. Resume and finish submission.',
        buttonLabel: 'Continue Application →',
        buttonHref: ENTREPRENEUR_ROUTES.newApplication(project.id),
        theme: 'indigo',
      };
    }

    if (isActionRequired) {
      return {
        canApplyText: 'Action Required Before Submission',
        canApplyBadge: 'Action Required',
        description: 'Required documents or missing clarifications must be provided before submission can proceed.',
        buttonLabel: 'Upload Document →',
        buttonHref: ENTREPRENEUR_ROUTES.documents(project.id),
        theme: 'amber',
      };
    }

    if (isReady) {
      return {
        canApplyText: 'Yes — You Can Apply Now',
        canApplyBadge: 'Ready to Apply',
        description: 'All prerequisites and initial profile validations are satisfied. You may start the statutory application.',
        buttonLabel: 'Start Application →',
        buttonHref: ENTREPRENEUR_ROUTES.newApplication(project.id),
        theme: 'emerald',
      };
    }

    if (req.applicability === 'not-applicable') {
      return {
        canApplyText: 'Not Applicable',
        canApplyBadge: 'Exempt',
        description: req.conditionReason ?? 'This requirement is excluded by your current Business DNA configuration.',
        theme: 'slate',
      };
    }

    return {
      canApplyText: 'Conditional Requirement',
      canApplyBadge: 'Conditional',
      description: req.conditionReason ?? 'Applicability depends on verified project parameters.',
      buttonLabel: 'Upload Document →',
      buttonHref: ENTREPRENEUR_ROUTES.documents(project.id),
      theme: 'amber',
    };
  })();

  const themeClasses = {
    emerald: {
      border: 'border-emerald-300',
      bg: 'bg-emerald-50/70',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      button: 'bg-emerald-700 hover:bg-emerald-800 text-white',
      title: 'text-emerald-950',
    },
    amber: {
      border: 'border-amber-300',
      bg: 'bg-amber-50/70',
      badge: 'bg-amber-100 text-amber-900 border-amber-300',
      button: 'bg-amber-700 hover:bg-amber-800 text-white',
      title: 'text-amber-950',
    },
    blue: {
      border: 'border-blue-300',
      bg: 'bg-blue-50/70',
      badge: 'bg-blue-100 text-blue-900 border-blue-300',
      button: 'bg-blue-700 hover:bg-blue-800 text-white',
      title: 'text-blue-950',
    },
    indigo: {
      border: 'border-indigo-300',
      bg: 'bg-indigo-50/70',
      badge: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      button: 'bg-indigo-700 hover:bg-indigo-800 text-white',
      title: 'text-indigo-950',
    },
    slate: {
      border: 'border-slate-300',
      bg: 'bg-slate-50',
      badge: 'bg-slate-200 text-slate-800 border-slate-300',
      button: 'bg-slate-700 hover:bg-slate-800 text-white',
      title: 'text-slate-900',
    },
  }[primaryAction.theme];

  return (
    <main id="main-content" className="flex-1 bg-[#F8F9FA] pb-16" tabIndex={-1}>
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-6">
        {/* ── Breadcrumb Navigation ── */}
        <nav className="mb-4 text-xs text-slate-500 flex items-center gap-1.5 flex-wrap" aria-label="Breadcrumb">
          <Link href={ENTREPRENEUR_ROUTES.businesses()} className="hover:text-[#17365D] hover:underline">
            My Businesses
          </Link>
          <span>›</span>
          <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#17365D] hover:underline">
            {project.name}
          </Link>
          <span>›</span>
          <Link href={ENTREPRENEUR_ROUTES.journey(project.id)} className="hover:text-[#17365D] hover:underline">
            Regulatory Journey
          </Link>
          <span>›</span>
          <span className="text-[#17365D] font-bold truncate max-w-[280px]">{req.service}</span>
        </nav>

        {/* ── Demo Toggle Banner (Prototype Verification) ── */}
        <div className="mb-5 p-3.5 bg-[#FDF4EB] border border-[#F8D4B0] rounded-xl flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#C46A15] uppercase tracking-wider">Prototype Demo</span>
            <span className="text-[#C46A15] hidden sm:inline">Simulate requirement approval to inspect unlocked states</span>
          </div>
          <button
            type="button"
            onClick={() => setCteApproved(v => !v)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
              cteApproved ? 'bg-[#2F7D4F] text-white' : 'bg-[#17365D] text-white'
            }`}
          >
            {cteApproved ? '✓ CTE Approved (Reset Simulation)' : 'Simulate CTE Approval →'}
          </button>
        </div>

        {/* ── 1. WHAT IS THIS? (Header & Requirement Name) ── */}
        <div className="mb-6 bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-200">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1 min-w-[280px]">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                    {enrich.serviceId}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#17365D] bg-[#17365D]/8 border border-[#17365D]/15 px-2 py-0.5 rounded">
                    Stage {stageInfo?.num ?? '00'} · {stageInfo?.label ?? req.stage}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500">
                    {req.department}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                  {req.service}
                </h1>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {requirementSummary}
                </p>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-2.5 shrink-0">
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${cfg.badgeCls}`}>
                  {cfg.icon} {cfg.label}
                </span>
                <button
                  type="button"
                  onClick={openRequirementAssistant}
                  className="text-xs bg-[#17365D] text-white px-3.5 py-1.5 rounded-lg hover:bg-[#245B8A] font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">?</span>
                  Ask Assistant
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="px-5 py-3 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50/70 border-t border-slate-100 text-xs">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Applicability</p>
              <p className="font-semibold text-slate-800 mt-0.5">
                {req.applicability === 'applicable'
                  ? 'Confirmed Applicable'
                  : req.applicability === 'conditional'
                    ? 'Conditional Rule'
                    : req.applicability === 'needs-verification'
                      ? 'Needs Verification'
                      : 'Not Applicable'}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Prerequisites</p>
              <p className="font-semibold text-slate-800 mt-0.5">
                {prereqs.length === 0
                  ? 'None (Can start directly)'
                  : pendingPrereqs.length === 0
                    ? 'All Prerequisites Met'
                    : `${pendingPrereqs.length} Pending`}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Configured SLA</p>
              <p className="font-semibold text-slate-800 mt-0.5">{enrich.slaConfigured}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Site Inspection</p>
              <p className="font-semibold text-slate-800 mt-0.5">{req.inspectionState ?? 'May be Required'}</p>
            </div>
          </div>
        </div>

        {/* ── 2. WHY THIS APPLIES (Concise Explanation + Trigger Factors) ── */}
        <div className="mb-6">
          <SectionCard
            title="Why This Applies"
            questionNumber="2"
            questionLabel="WHY DO I NEED IT?"
          >
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-800 leading-relaxed font-medium">
                  {enrich.applicabilitySummary}
                </p>
              </div>

              {/* Trigger Factors */}
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Matching Business DNA Triggers
                </p>
                <div className="flex flex-wrap gap-2">
                  {enrich.dnaBasis.map(f => (
                    <div
                      key={f.label}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs"
                    >
                      <span className="text-slate-500 font-medium">{f.label}:</span>
                      <span className="font-bold text-slate-800">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expandable Section: Detailed Rule */}
              <details className="group border border-slate-200 rounded-lg p-3.5 bg-slate-50/60 transition-colors">
                <summary className="cursor-pointer text-xs font-semibold text-slate-700 flex items-center justify-between list-none select-none">
                  <span className="flex items-center gap-2">
                    <span className="text-[#17365D]">ℹ</span>
                    <span>Detailed Rule & Evaluation Logic</span>
                  </span>
                  <span className="text-xs text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-600 space-y-2.5">
                  <p className="font-semibold text-slate-800">Regulatory Evaluation Criteria:</p>
                  <ul className="space-y-1.5 pl-2">
                    {enrich.applicabilityBasis.map(item => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-[#1a56db] font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {req.conditionReason && (
                    <p className="p-2.5 bg-amber-50 border border-amber-200 rounded text-amber-900 text-[11px] mt-2">
                      <span className="font-semibold">Condition Rule: </span>
                      {req.conditionReason}
                    </p>
                  )}
                  <p className="text-[11px] text-slate-500 italic pt-1">
                    Evaluated against confirmed parameters from your Business Profile.
                  </p>
                </div>
              </details>
            </div>
          </SectionCard>
        </div>

        {/* ── 3. STATUS & CAN I APPLY NOW? (Primary Action Hero Card) ── */}
        <div className="mb-6">
          <section className={`border ${themeClasses.border} ${themeClasses.bg} rounded-xl p-5 shadow-xs transition-all`}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex-1 min-w-[280px]">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Question 4 · Can I apply now?
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${themeClasses.badge}`}>
                    {primaryAction.canApplyBadge}
                  </span>
                </div>
                <h2 className={`text-lg font-bold leading-tight ${themeClasses.title}`}>
                  {primaryAction.canApplyText}
                </h2>
                <p className="text-xs text-slate-600 mt-1 max-w-[650px] leading-relaxed">
                  {primaryAction.description}
                </p>
              </div>

              {/* Single Obvious Primary Action (No duplicate buttons) */}
              {primaryAction.buttonLabel && primaryAction.buttonHref && (
                <div className="shrink-0">
                  <Link
                    href={primaryAction.buttonHref}
                    className={`inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-sm font-bold shadow-xs transition-colors ${themeClasses.button}`}
                  >
                    {primaryAction.buttonLabel}
                  </Link>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* ── 4. WHAT YOU NEED (Documents, Information, Prerequisites) ── */}
        <div className="mb-6">
          <SectionCard
            title="What You Need"
            questionNumber="3"
            questionLabel="WHAT DO I NEED TO PROVIDE?"
          >
            <div className="space-y-6">
              {/* 4A. Documents */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span>📄 Documents</span>
                    <span className="text-slate-400 font-normal">({enrich.docs.length})</span>
                  </h3>
                  <Link
                    href={ENTREPRENEUR_ROUTES.documents(project.id)}
                    className="text-xs text-[#1a56db] hover:underline font-semibold"
                  >
                    Open Document Centre →
                  </Link>
                </div>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden bg-white">
                  {enrich.docs.map(doc => {
                    const isAvailable =
                      doc.availability.toLowerCase().includes('available') ||
                      doc.availability.toLowerCase().includes('verified');
                    return (
                      <div key={doc.name} className="p-3 sm:px-4 flex items-center justify-between gap-3 text-xs hover:bg-slate-50/50">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-slate-800">{doc.name}</span>
                            {doc.required ? (
                              <span className="text-[9px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">
                                Required
                              </span>
                            ) : (
                              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
                                Conditional
                              </span>
                            )}
                            {doc.reusable && (
                              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                                Reusable
                              </span>
                            )}
                          </div>
                          <div className="flex gap-3 text-[11px] text-slate-500 mt-1">
                            <span>Status: {doc.availability}</span>
                            <span>·</span>
                            <span>Verification: {doc.verification}</span>
                          </div>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded border shrink-0 ${
                            isAvailable
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          {isAvailable ? '✓ Ready' : 'Upload Needed'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4B. Information & Forms */}
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                  📝 Information & Declarations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Statutory Application Forms */}
                  <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/40">
                    <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
                      Statutory Application Forms
                    </p>
                    <ul className="space-y-2 text-xs">
                      {enrich.forms.map(form => (
                        <li key={form.name} className="flex items-center justify-between gap-2 p-1.5 bg-white border border-slate-200 rounded">
                          <span className="font-medium text-slate-800 truncate">{form.name}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border bg-slate-100 text-slate-700 border-slate-200 shrink-0">
                            {form.requirement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mandatory Declarations */}
                  <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/40">
                    <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
                      Mandatory Undertakings
                    </p>
                    <ul className="space-y-2 text-xs">
                      {enrich.declarations.map((decl, idx) => (
                        <li key={idx} className="flex items-start gap-2 p-1.5 bg-white border border-slate-200 rounded">
                          <span className="text-emerald-600 font-bold mt-0.5 text-xs">✓</span>
                          <span className="text-slate-700 text-[11px] leading-tight">{decl.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-2 italic">
                  ⚡ EKATMA automatically pre-populates enterprise details and plot credentials from your verified Business DNA.
                </p>
              </div>

              {/* 4C. Prerequisites */}
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                  🔗 Prerequisites
                </h3>
                {prereqs.length === 0 ? (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
                    ✓ <span className="font-semibold text-slate-800">No prior clearances required.</span> This requirement can be initiated directly without predecessor approvals.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {prereqs.map(p => {
                      const pCfg = journeyStateCfg(p.displayState);
                      const dep = req.dependencies.find(d => d.reqId === p.id);
                      return (
                        <div
                          key={p.id}
                          className={`p-3 rounded-lg border text-xs flex items-center justify-between gap-3 ${
                            p.displayState === 'approved'
                              ? 'bg-emerald-50/50 border-emerald-200'
                              : 'bg-amber-50/50 border-amber-200'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-slate-900">{p.service}</span>
                              <span className="text-slate-500">({p.department})</span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${pCfg.badgeCls}`}>
                                {pCfg.label}
                              </span>
                            </div>
                            {dep?.reason && (
                              <p className="text-[11px] text-slate-600 mt-1">{dep.reason}</p>
                            )}
                          </div>
                          <Link
                            href={ENTREPRENEUR_ROUTES.requirement(project.id, p.id)}
                            className="text-xs text-[#1a56db] hover:underline font-semibold shrink-0"
                          >
                            View →
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </SectionCard>
        </div>

        {/* ── 5. APPLICATION STATUS & DETAILS ── */}
        <div className="mb-6">
          <SectionCard title="Application Status">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Processing State</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${cfg.badgeCls}`}>
                    {cfg.icon} {cfg.label}
                  </span>
                </div>
                {req.slaRemaining && (
                  <p className="text-[11px] text-[#1a56db] font-semibold mt-1.5">{req.slaRemaining}</p>
                )}
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Configured SLA</p>
                <p className="font-bold text-slate-900 mt-1">{enrich.slaConfigured}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Enforced under Maharashtra RTSA</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Department Fee</p>
                <p className="font-bold text-slate-900 mt-1">{enrich.fee}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Calculated by department during processing</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Site Inspection</p>
                <p className="font-bold text-slate-900 mt-1">{req.inspectionState ?? 'May be Required'}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{enrich.inspectionNote}</p>
              </div>
            </div>

            {/* Approval Record details if approved */}
            {isApproved && (
              <div className="mt-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between gap-4 text-xs">
                <div>
                  <span className="font-bold text-emerald-900">✓ Official Clearance Granted</span>
                  <div className="flex gap-4 text-[11px] text-emerald-800 mt-0.5">
                    {req.approvalRef && <span>Approval Ref: {req.approvalRef}</span>}
                    {req.approvedDate && <span>Date: {req.approvedDate}</span>}
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-white border border-emerald-200 px-2.5 py-1 rounded">
                  Active
                </span>
              </div>
            )}
          </SectionCard>
        </div>

        {/* ── 6. WHAT HAPPENS NEXT? (Immediate Milestone, Downstream, Parallel) ── */}
        <div className="mb-6">
          <SectionCard
            title="What Happens Next"
            questionNumber="5"
            questionLabel="WHAT HAPPENS AFTER THIS?"
          >
            <div className="space-y-4">
              {/* Next Immediate Milestone */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <p className="text-[10px] font-bold text-[#17365D] uppercase tracking-wider mb-1">
                  Immediate Next Milestone
                </p>
                <p className="font-semibold text-slate-900">
                  {req.nextMilestone ?? (isApproved ? 'All milestone steps completed' : 'Department scrutiny and officer assignment')}
                </p>
                <p className="text-[11px] text-slate-600 mt-1">
                  {isApproved
                    ? 'Clearance conditions remain active. Downstream clearances have been unlocked.'
                    : isUnderReview
                      ? 'The competent authority is verifying submitted annexures against statutory standards.'
                      : 'Upon submission, your dossier is registered on the departmental portal for automated scrutiny.'}
                </p>
              </div>

              {/* Downstream Unlocks */}
              {downstream.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
                    Clearances Unlocked Upon Approval ({downstream.length})
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {downstream.map(d => {
                      const dCfg = journeyStateCfg(d.displayState);
                      return (
                        <div
                          key={d.id}
                          className="p-3 border border-slate-200 rounded-lg bg-white text-xs flex items-center justify-between gap-2"
                        >
                          <div>
                            <p className="font-semibold text-slate-900">{d.service}</p>
                            <p className="text-[11px] text-slate-500">{d.department}</p>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border shrink-0 ${dCfg.badgeCls}`}>
                            {dCfg.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Parallel Processing Possibilities */}
              {parallel.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
                    Can Proceed in Parallel
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {parallel.map(p => (
                      <div
                        key={p.id}
                        className="p-3 border border-slate-200 rounded-lg bg-white text-xs flex items-center justify-between gap-2"
                      >
                        <div>
                          <p className="font-semibold text-slate-900">{p.service}</p>
                          <p className="text-[11px] text-slate-500">{p.department} · Simultaneous application allowed</p>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded border bg-indigo-50 text-indigo-700 border-indigo-200 shrink-0">
                          Parallel
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </SectionCard>
        </div>

        {/* ── 7. DEPENDENCIES (Relevant Only + Expandable Full Explanation) ── */}
        <div className="mb-6">
          <SectionCard title="Dependencies">
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                Displaying only direct dependencies directly linked to this requirement in the regulatory sequence.
              </p>

              {/* Relevant direct dependencies */}
              <div className="space-y-2">
                {prereqs.map(p => (
                  <div key={p.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-800">
                      ← Prerequisite: <span className="font-bold">{p.service}</span> ({p.department})
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded border bg-slate-100 text-slate-700 border-slate-300">
                      Must Be Approved First
                    </span>
                  </div>
                ))}
                {downstream.map(d => (
                  <div key={d.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-800">
                      → Downstream: <span className="font-bold">{d.service}</span> ({d.department})
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded border bg-slate-100 text-slate-700 border-slate-300">
                      Unlocks When This Is Approved
                    </span>
                  </div>
                ))}
                {prereqs.length === 0 && downstream.length === 0 && (
                  <p className="text-xs text-slate-500 italic">No direct dependencies configured for this service.</p>
                )}
              </div>

              {/* Expandable Section: Full Dependency Explanation */}
              <details className="group border border-slate-200 rounded-lg p-3.5 bg-slate-50/60 transition-colors">
                <summary className="cursor-pointer text-xs font-semibold text-slate-700 flex items-center justify-between list-none select-none">
                  <span className="flex items-center gap-2">
                    <span className="text-[#17365D]">🔍</span>
                    <span>Full Dependency Explanation & Statutory Sequencing</span>
                  </span>
                  <span className="text-xs text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-600 space-y-2 leading-relaxed">
                  <p>
                    Under Maharashtra single-window and departmental guidelines, industrial consents must adhere to statutory sequencing to guarantee site ownership and environmental compliance before construction sanctions are granted.
                  </p>
                  <p>
                    Prerequisites prevent premature capital expenditure before environmental zoning clearance is ratified by competent bodies.
                  </p>
                  <div className="pt-2">
                    <Link
                      href={ENTREPRENEUR_ROUTES.dependencies(project.id)}
                      className="text-xs text-[#1a56db] hover:underline font-semibold"
                    >
                      View full interactive Dependency Graph →
                    </Link>
                  </div>
                </div>
              </details>
            </div>
          </SectionCard>
        </div>

        {/* ── 8. SOURCE / LEGAL BASIS (Visually Secondary, Expandable Sections) ── */}
        <div className="mb-6">
          <section className="bg-slate-50/80 border border-slate-200 rounded-xl p-5 text-xs text-slate-600 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-200">
              <div>
                <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Source / Legal Basis
                </h2>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Statutory provisions governing applicability and processing
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-700 bg-white border border-slate-300 px-2 py-0.5 rounded">
                  {enrich.regSourceType}
                </span>
                {enrich.regVerified ? (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded">
                    ✓ Verified Source
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-200 border border-slate-300 px-2 py-0.5 rounded">
                    Unverified Source
                  </span>
                )}
              </div>
            </div>

            {/* High-level Summary (No long prose exposed by default) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 bg-white p-3 border border-slate-200 rounded-lg">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Statutory Reference</span>
                <p className="font-semibold text-slate-800 text-xs mt-0.5">{enrich.regReference}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Clause / Rule</span>
                <p className="font-semibold text-slate-800 text-xs mt-0.5">{enrich.regClause}</p>
              </div>
            </div>

            {/* Expandable Sections for Deep Legal Details */}
            <div className="space-y-2">
              {/* Expandable: Legal Basis */}
              <details className="group border border-slate-200 rounded-lg p-3 bg-white transition-colors">
                <summary className="cursor-pointer font-semibold text-xs text-slate-700 flex items-center justify-between list-none select-none">
                  <span>Legal Basis</span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2.5 pt-2.5 border-t border-slate-100 text-slate-600 leading-relaxed space-y-1.5">
                  <p>
                    Statutory powers are enacted under the Water (Prevention and Control of Pollution) Act 1974, Air (Prevention and Control of Pollution) Act 1981, and relevant Maharashtra Government Resolutions.
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Authority: {req.department} as mandated by the Government of Maharashtra.
                  </p>
                </div>
              </details>

              {/* Expandable: Detailed Rule */}
              <details className="group border border-slate-200 rounded-lg p-3 bg-white transition-colors">
                <summary className="cursor-pointer font-semibold text-xs text-slate-700 flex items-center justify-between list-none select-none">
                  <span>Detailed Rule</span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2.5 pt-2.5 border-t border-slate-100 text-slate-600 leading-relaxed space-y-1.5">
                  <p>
                    {enrich.regClause} mandates that all manufacturing and establishment activities must satisfy prescribed environmental parameters, effluent discharge thresholds, and emission ceilings prior to physical ground-breaking.
                  </p>
                </div>
              </details>

              {/* Expandable: Source Document */}
              <details className="group border border-slate-200 rounded-lg p-3 bg-white transition-colors">
                <summary className="cursor-pointer font-semibold text-xs text-slate-700 flex items-center justify-between list-none select-none">
                  <span>Source Document & Gazette</span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2.5 pt-2.5 border-t border-slate-100 text-slate-600 leading-relaxed space-y-1.5">
                  <p className="font-medium text-slate-800">{enrich.regDoc}</p>
                  <p className="text-[11px] text-slate-500">Official document publication maintained in Maharashtra State Gazette.</p>
                </div>
              </details>

              {/* Expandable: Effective Date */}
              <details className="group border border-slate-200 rounded-lg p-3 bg-white transition-colors">
                <summary className="cursor-pointer font-semibold text-xs text-slate-700 flex items-center justify-between list-none select-none">
                  <span>Effective Date & Enactment</span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2.5 pt-2.5 border-t border-slate-100 text-slate-600 leading-relaxed space-y-1.5">
                  <p>
                    Effective from: <span className="font-bold text-slate-800">{enrich.regEffective}</span>
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Enforced in accordance with notification timelines and applicable amendments.
                  </p>
                </div>
              </details>
            </div>
          </section>
        </div>

        {/* ── Return Link ── */}
        <div className="pt-2 flex items-center justify-between text-xs">
          <Link
            href={ENTREPRENEUR_ROUTES.journey(project.id)}
            className="text-slate-600 hover:text-slate-900 font-semibold"
          >
            ← Back to Regulatory Journey
          </Link>
          <span className="text-slate-400 text-[11px]">
            EKATMA Single-Window Regulatory Engine
          </span>
        </div>
      </div>
    </main>
  );
}
