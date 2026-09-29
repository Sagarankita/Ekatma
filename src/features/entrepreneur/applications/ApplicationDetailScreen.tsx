'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Building2,
  Copy,
  Check,
  Calendar,
  MapPin,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Award,
  Eye,
  Search,
  Hourglass,
  Layers,
  HelpCircle,
  RefreshCw,
} from 'lucide-react';
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import {
  findTrackerAppById,
  slaClass,
  statusBadgeTrackerClass,
  findQueryByAppId,
  findDecisionByAppId,
  listInspectionsForBusiness,
  getApplicationResponsibility,
  responsibilityBadgeClass,
  responsibilityLabel,
  getHumanAuthority,
  getApplicationLifecycle,
} from './data';
import { listComplianceForBusiness, type ComplianceStatus } from '../compliance/data';
import {
  listDocumentsForBusiness,
  findDocumentForBusiness,
  type DocRecord,
  verifBadge,
  validityBadge,
} from '../documents/data';
import { CertificatePreviewModal } from '../documents/CertificatePreviewModal';
import { listJourneyNodesForBusiness } from '../journey/data';

export function ApplicationDetailScreen({
  project,
  applicationId,
}: {
  project: BusinessProject;
  applicationId: string;
}) {
  const app = findTrackerAppById(applicationId);
  const [activeTab, setActiveTab] = useState<'timeline' | 'documents' | 'queries' | 'inspection' | 'decision'>('timeline');
  const [copiedId, setCopiedId] = useState(false);
  const [previewCertDoc, setPreviewCertDoc] = useState<DocRecord | null>(null);

  if (!app) {
    return (
      <main id="main-content" className="flex-1 bg-[#F9FAF2] flex items-center justify-center min-h-[60vh]" tabIndex={-1}>
        <div className="max-w-[900px] mx-auto px-6 py-12 text-center">
          <p className="text-[#555C56]">Application not found.</p>
          <Link
            href={ENTREPRENEUR_ROUTES.applications(project.id)}
            className="mt-4 inline-block text-sm text-[#6DAE7C] hover:underline"
          >
            ← Back to Applications
          </Link>
        </div>
      </main>
    );
  }

  // Related Child Records
  const query = findQueryByAppId(app.appId);
  const decision = findDecisionByAppId(app.appId);
  const inspections = listInspectionsForBusiness(project.id);
  const appInspection = inspections.find(i => i.relatedAppIds.includes(app.appId));
  const appObligations = decision?.state === 'approved'
    ? listComplianceForBusiness(project.id).filter(
        o => o.sourceApprovalId === decision.approvalId || o.dept === decision.dept
      )
    : [];

  // Attached Documents
  const allDocs = listDocumentsForBusiness(project.id);
  const appDocs = allDocs.filter(doc =>
    doc.usedBy.some(u =>
      u.dept.toLowerCase() === app.dept.toLowerCase() ||
      u.service.toLowerCase().includes(app.service.toLowerCase().slice(0, 8))
    ) ||
    (app.appId === 'APP-2026-MPCB-00412' && ['DOC-001', 'DOC-002', 'DOC-004', 'DOC-006', 'DOC-003'].includes(doc.id)) ||
    (app.appId === 'APP-2026-MIDC-00187' && ['DOC-002', 'DOC-004', 'DOC-003'].includes(doc.id)) ||
    (app.appId === 'APP-2026-FIRE-00093' && ['DOC-002', 'DOC-004'].includes(doc.id)) ||
    (app.appId === 'APP-2026-DISH-00241' && ['DOC-001', 'DOC-002', 'DOC-003', 'DOC-005'].includes(doc.id))
  );

  // Copy Application ID handler
  const handleCopyId = () => {
    navigator.clipboard.writeText(app.appId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  // Responsibility & Human Authority
  const resp = getApplicationResponsibility(app);
  const humanAuthority = getHumanAuthority(app.dept, app.currentDesk);

  // SLA Calculations
  const totalSlaDays = app.totalSlaDays ?? (app.slaType === 'na' ? 0 : 30);
  const daysElapsed = app.daysElapsed;
  const progressPercent = totalSlaDays > 0 ? Math.min(100, Math.round((daysElapsed / totalSlaDays) * 100)) : 0;

  // Simple, Dynamic Lifecycle Stages (Applicable Only)
  const lifecycleStages = getApplicationLifecycle(app, query, appInspection, decision);

  return (
    <main id="main-content" className="flex-1 bg-[#F9FAF2]" tabIndex={-1}>
      {/* ─── Breadcrumb & Top Bar ────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#d6dfd5] px-6 py-4">
        <div className="max-w-[1280px] mx-auto">
          <nav className="text-xs text-[#555C56] mb-2 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#355E3B] hover:underline">
              Dashboard
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.applications(project.id)} className="hover:text-[#355E3B] hover:underline">
              Applications Tracker
            </Link>
            <span>›</span>
            <span className="text-[#355E3B] font-medium font-mono">{app.appId}</span>
          </nav>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-bold px-2 py-0.5 rounded border border-[#c8d4c7] bg-[#F9FAF2] text-[#1e293b]">
                  {app.dept}
                </span>
                <h1 className="text-xl font-bold text-[#355E3B]">{app.service}</h1>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${statusBadgeTrackerClass(app.statusType)}`}>
                  {app.status}
                </span>
              </div>
              <p className="mt-1 text-xs text-[#555C56]">Application Detail</p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={ENTREPRENEUR_ROUTES.applications(project.id)}
                className="text-xs border border-[#c8d4c7] text-[#4A4A4A] hover:bg-[#F9FAF2] px-3 py-1.5 rounded transition-colors font-medium"
              >
                ← Back to Tracker
              </Link>
              {query && (
                <Link
                  href={ENTREPRENEUR_ROUTES.applicationQuery(project.id, app.appId, query.queryId)}
                  className="text-xs bg-[#b91c1c] text-white hover:bg-[#991b1b] px-3.5 py-1.5 rounded font-medium shadow-xs"
                >
                  Respond to Query ({query.queryId}) →
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-6 space-y-6">
        {/* ─── Clear Responsibility Banner (Entrepreneur vs Government vs Department Dependency vs Completed) ─── */}
        {resp === 'entrepreneur' && (
          <div className="bg-[#fff5f5] border border-[#fca5a5] border-l-4 border-l-[#b91c1c] rounded-lg p-4.5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#b91c1c] shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#b91c1c] uppercase tracking-wider bg-[#fee2e2] px-2 py-0.5 rounded">
                    Action Required
                  </span>
                  <span className="text-[10px] font-semibold bg-[#fee2e2] text-[#991b1b] px-2 py-0.5 rounded">
                    SLA Clock Paused
                  </span>
                </div>
                <p className="text-sm font-bold text-[#355E3B] mt-1">{app.actionRequired}</p>
                <p className="text-xs text-[#555C56] mt-1">
                  Response deadline:{' '}
                  <strong className="text-[#b91c1c]">{query?.responseDeadline ?? '09 Oct 2026'}</strong> ·{' '}
                  Submit clarification to resume statutory processing under the Maharashtra RTS Act.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {query ? (
                <Link
                  href={ENTREPRENEUR_ROUTES.applicationQuery(project.id, app.appId, query.queryId)}
                  className="text-xs bg-[#b91c1c] text-white hover:bg-[#991b1b] px-4 py-2 rounded-md font-semibold transition-colors shadow-xs flex items-center gap-1.5"
                >
                  Respond to Query ({query.queryId}) →
                </Link>
              ) : app.appId === 'APP-2026-MIDC-00187' ? (
                <button
                  type="button"
                  onClick={() => setActiveTab('documents')}
                  className="text-xs bg-[#b91c1c] text-white hover:bg-[#991b1b] px-4 py-2 rounded-md font-semibold transition-colors shadow-xs flex items-center gap-1.5"
                >
                  Upload Revised Plan →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveTab('inspection')}
                  className="text-xs bg-[#b91c1c] text-white hover:bg-[#991b1b] px-4 py-2 rounded-md font-semibold transition-colors shadow-xs flex items-center gap-1.5"
                >
                  Review Preparation Checklist →
                </button>
              )}
            </div>
          </div>
        )}

        {resp === 'government' && (
          <div className="bg-[#edf5ef] border border-[#c5e2cb] border-l-4 border-l-[#6DAE7C] rounded-lg p-4.5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#6DAE7C] shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#539160] uppercase tracking-wider bg-[#edf5ef] px-2 py-0.5 rounded">
                    In Process — Government Action
                  </span>
                  <span className="text-[10px] font-semibold bg-white text-[#539160] border border-[#c5e2cb] px-2 py-0.5 rounded">
                    SLA Clock Running ({app.daysElapsed}/{totalSlaDays} Days)
                  </span>
                </div>
                <p className="text-sm font-bold text-[#355E3B] mt-1">
                  Current Stage: {app.stage} · Being scrutinized by {humanAuthority}
                </p>
                <p className="text-xs text-[#555C56] mt-1">
                  Last updated: <strong className="text-[#3A3E39]">{app.lastUpdated}</strong>. No action required from applicant at this time. Department is conducting statutory verification.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('timeline')}
                className="text-xs bg-[#6DAE7C] text-white hover:bg-[#539160] px-4 py-2 rounded-md font-semibold transition-colors shadow-xs"
              >
                Track Lifecycle Stages ↓
              </button>
            </div>
          </div>
        )}

        {resp === 'department-dependency' && (
          <div className="bg-[#fdf8e6] border border-[#fae69e] border-l-4 border-l-[#D4A017] rounded-lg p-4.5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-[#D4A017] shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#7a5807] uppercase tracking-wider bg-[#fdf8e6] px-2 py-0.5 rounded">
                    Waiting for Another Department
                  </span>
                  <span className="text-[10px] font-semibold bg-white text-[#7a5807] border border-[#fae69e] px-2 py-0.5 rounded">
                    Prerequisite Dependency
                  </span>
                </div>
                <p className="text-sm font-bold text-[#355E3B] mt-1">
                  Awaiting Prior Environmental Clearance (MPCB CTE)
                </p>
                <p className="text-xs text-[#555C56] mt-1">
                  {app.actionRequired ?? 'Scrutiny will commence automatically once the prerequisite clearance from MPCB is finalized and published.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={ENTREPRENEUR_ROUTES.dependencies(project.id)}
                className="text-xs bg-[#D4A017] text-white hover:bg-[#7a5807] px-4 py-2 rounded-md font-semibold transition-colors shadow-xs flex items-center gap-1"
              >
                Inspect Dependency Graph →
              </Link>
            </div>
          </div>
        )}

        {resp === 'completed' && (
          <div className="bg-[#f0fdf4] border border-[#86efac] border-l-4 border-l-[#15803d] rounded-lg p-4.5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#15803d] shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#166534] uppercase tracking-wider bg-[#dcfce7] px-2 py-0.5 rounded">
                    Clearance Granted & Issued
                  </span>
                  <span className="text-[10px] font-semibold bg-white text-[#166534] border border-[#86efac] px-2 py-0.5 rounded">
                    DigiLocker Synced
                  </span>
                </div>
                <p className="text-sm font-bold text-[#355E3B] mt-1">
                  Official Statutory Approval Issued by {app.dept}
                </p>
                <p className="text-xs text-[#555C56] mt-1">
                  Approved on <strong className="text-[#3A3E39]">{decision?.issueDate ?? app.lastUpdated}</strong>. Certificate generated with cryptographic verification QR code.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('decision')}
                className="text-xs bg-[#15803d] text-white hover:bg-[#166534] px-4 py-2 rounded-md font-semibold transition-colors shadow-xs flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5" />
                View Decision & Approval →
              </button>
            </div>
          </div>
        )}

        {/* ─── Application Identity & Metadata Card ───────────────────────── */}
        <section aria-label="Application Identity" className="bg-white border border-[#e3ebe1] rounded-lg p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#F9FAF2]">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#6DAE7C]" />
              <h2 className="text-sm font-bold text-[#355E3B] uppercase tracking-wider">
                Application Identity & Single Window Registration
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyId}
                className="text-xs text-[#6DAE7C] hover:bg-[#edf5ef] px-2.5 py-1 rounded border border-[#c5e2cb] flex items-center gap-1 font-medium transition-colors"
                title="Copy Application ID"
              >
                {copiedId ? <Check className="w-3.5 h-3.5 text-[#15803d]" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedId ? 'Copied' : 'Copy ID'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-[#F9FAF2] p-3 rounded border border-[#F9FAF2]">
              <span className="text-[#555C56] block font-medium">Application ID (UID)</span>
              <span className="font-mono font-bold text-sm text-[#355E3B] mt-0.5 block">{app.appId}</span>
              <span className="text-[10px] text-[#9ab098] mt-0.5 block">State Single Window Portal Ref</span>
            </div>

            <div className="bg-[#F9FAF2] p-3 rounded border border-[#F9FAF2]">
              <span className="text-[#555C56] block font-medium">Competent Authority</span>
              <span className="font-semibold text-[#1e293b] text-sm mt-0.5 block">{app.dept}</span>
              <span className="text-[10px] text-[#9ab098] mt-0.5 block">Government of Maharashtra</span>
            </div>

            <div className="bg-[#F9FAF2] p-3 rounded border border-[#F9FAF2]">
              <span className="text-[#555C56] block font-medium">Legal Entity & Location</span>
              <span className="font-semibold text-[#1e293b] text-sm mt-0.5 block">{project.name}</span>
              <span className="text-[10px] text-[#555C56] mt-0.5 block truncate">{project.location}</span>
            </div>

            <div className="bg-[#F9FAF2] p-3 rounded border border-[#F9FAF2]">
              <span className="text-[#555C56] block font-medium">Submission Timestamp</span>
              <span className="font-semibold text-[#1e293b] text-sm mt-0.5 block">
                {app.submittedDate ?? '14 Sep 2026'}
              </span>
              <span className="text-[10px] text-[#15803d] mt-0.5 block font-medium">e-Pramaan Verified</span>
            </div>
          </div>
        </section>

        {/* ─── 4 Intelligence Metrics: Stage, Status, SLA, Processing Authority ───── */}
        <section aria-label="Key Operational Status" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Current Stage */}
          <div className="bg-white border border-[#e3ebe1] rounded-lg p-4 shadow-2xs">
            <span className="text-[10px] font-bold text-[#555C56] uppercase tracking-wider block">
              Current Stage
            </span>
            <p className="text-base font-bold text-[#355E3B] mt-1">{app.stage}</p>
            <p className="text-xs text-[#555C56] mt-1 leading-snug">
              Stage {lifecycleStages.findIndex(s => s.status === 'in-progress' || s.status === 'action-required') + 1 || lifecycleStages.length} of {lifecycleStages.length} · Dynamic Lifecycle
            </p>
          </div>

          {/* 2. Current Status */}
          <div className="bg-white border border-[#e3ebe1] rounded-lg p-4 shadow-2xs">
            <span className="text-[10px] font-bold text-[#555C56] uppercase tracking-wider block">
              Current Status
            </span>
            <div className="mt-1 flex items-center gap-1.5 flex-wrap">
              <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${responsibilityBadgeClass(resp)}`}>
                {responsibilityLabel(resp)}
              </span>
              <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded border ${statusBadgeTrackerClass(app.statusType)}`}>
                {app.status}
              </span>
            </div>
            <p className="text-xs text-[#555C56] mt-1.5 leading-snug">
              {resp === 'entrepreneur'
                ? 'Applicant response required to resume scrutiny'
                : resp === 'government'
                ? `Under scrutiny by ${humanAuthority}`
                : resp === 'department-dependency'
                ? 'Waiting on prerequisite department clearance'
                : 'Approved & officially issued'}
            </p>
          </div>

          {/* 3. Statutory SLA Clock */}
          <div className="bg-white border border-[#e3ebe1] rounded-lg p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#555C56] uppercase tracking-wider">
                Statutory SLA Clock
              </span>
              <Clock className="w-3.5 h-3.5 text-[#15803d]" />
            </div>
            <p className={`text-base font-bold mt-1 ${slaClass(app.slaType)}`}>
              {app.daysElapsed} of {totalSlaDays} Days Elapsed
            </p>
            {/* Progress Bar */}
            <div className="w-full bg-[#e3ebe1] h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className={`h-full rounded-full ${
                  app.slaType === 'over' ? 'bg-[#b91c1c]' : app.slaType === 'due-soon' ? 'bg-[#D4A017]' : 'bg-[#15803d]'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-[#555C56] mt-1 flex justify-between">
              <span>{app.sla}</span>
              <span>Due: {app.targetDate ?? 'Statutory'}</span>
            </p>
          </div>

          {/* 4. Processing Authority (Plain Language) */}
          <div className="bg-white border border-[#e3ebe1] rounded-lg p-4 shadow-2xs">
            <span className="text-[10px] font-bold text-[#555C56] uppercase tracking-wider block">
              Processing Authority
            </span>
            <p className="text-sm font-bold text-[#355E3B] mt-1 leading-snug truncate" title={humanAuthority}>
              {humanAuthority}
            </p>
            <p className="text-xs text-[#555C56] mt-1 leading-snug">
              {app.dept} Regional Authority · {app.daysElapsed} days on desk
            </p>
          </div>
        </section>

        {/* ─── Interactive Cockpit Tabs (Lifecycle, Documents, Queries, Inspection, Decision) ─── */}
        <div className="bg-white border border-[#e3ebe1] rounded-lg shadow-2xs overflow-hidden">
          {/* Navigation Tab Bar */}
          <div className="border-b border-[#e3ebe1] bg-[#F9FAF2] px-4 flex flex-wrap items-center gap-1 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('timeline')}
              className={`text-xs font-semibold py-3 px-3.5 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'timeline'
                  ? 'border-[#355E3B] text-[#355E3B] bg-white'
                  : 'border-transparent text-[#555C56] hover:text-[#355E3B]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Processing Lifecycle
              <span className="ml-1 text-[10px] bg-[#e3ebe1] text-[#3A3E39] px-1.5 py-0.2 rounded-full font-bold">
                {lifecycleStages.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('documents')}
              className={`text-xs font-semibold py-3 px-3.5 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'documents'
                  ? 'border-[#355E3B] text-[#355E3B] bg-white'
                  : 'border-transparent text-[#555C56] hover:text-[#355E3B]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Attached Documents
              <span className="ml-1 text-[10px] bg-[#e3ebe1] text-[#3A3E39] px-1.5 py-0.2 rounded-full font-bold">
                {appDocs.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('queries')}
              className={`text-xs font-semibold py-3 px-3.5 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'queries'
                  ? 'border-[#355E3B] text-[#355E3B] bg-white'
                  : 'border-transparent text-[#555C56] hover:text-[#355E3B]'
              }`}
            >
              <AlertTriangle className={`w-3.5 h-3.5 ${query ? 'text-[#b91c1c]' : ''}`} />
              Department Queries
              {query && (
                <span className="ml-1 text-[10px] bg-[#fee2e2] text-[#b91c1c] px-1.5 py-0.2 rounded-full font-bold">
                  {query.deficiencies.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('inspection')}
              className={`text-xs font-semibold py-3 px-3.5 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'inspection'
                  ? 'border-[#355E3B] text-[#355E3B] bg-white'
                  : 'border-transparent text-[#555C56] hover:text-[#355E3B]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Site Inspection
              {appInspection && (
                <span className="ml-1 text-[10px] bg-[#edf5ef] text-[#539160] px-1.5 py-0.2 rounded-full font-bold">
                  {appInspection.status}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('decision')}
              className={`text-xs font-semibold py-3 px-3.5 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'decision'
                  ? 'border-[#355E3B] text-[#355E3B] bg-white'
                  : 'border-transparent text-[#555C56] hover:text-[#355E3B]'
              }`}
            >
              <Award className={`w-3.5 h-3.5 ${decision ? 'text-[#15803d]' : ''}`} />
              Final Decision & Approval
              {decision && (
                <span className="ml-1 text-[10px] bg-[#dcfce7] text-[#166534] px-1.5 py-0.2 rounded-full font-bold">
                  Granted
                </span>
              )}
            </button>
          </div>

          {/* ─── Tab Content ──────────────────────────────────────────────── */}
          <div className="p-6">
            {/* TAB 1: PROCESSING LIFECYCLE */}
            {activeTab === 'timeline' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-[#355E3B]">Dynamic Processing Lifecycle</h3>
                    <p className="text-xs text-[#555C56] mt-0.5">
                      Statutory progression showing only stages applicable to this clearance. No internal jargon.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded border border-[#c8d4c7] bg-[#F9FAF2] text-[#4A4A4A]">
                      {lifecycleStages.filter(s => s.status === 'completed').length} of {lifecycleStages.length} Stages Completed
                    </span>
                    <span className="text-xs text-[#15803d] font-semibold bg-[#dcfce7] border border-[#86efac] px-2.5 py-0.5 rounded">
                      SLA: {app.sla}
                    </span>
                  </div>
                </div>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#e3ebe1]">
                  {lifecycleStages.map((stage, idx) => (
                    <div key={stage.id} className="relative group">
                      {/* Node Bullet */}
                      <div
                        className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          stage.status === 'completed'
                            ? 'bg-[#15803d] border-[#15803d] text-white'
                            : stage.status === 'action-required'
                            ? 'bg-[#b91c1c] border-[#b91c1c] text-white animate-pulse'
                            : stage.status === 'in-progress'
                            ? 'bg-[#6DAE7C] border-[#6DAE7C] text-white animate-pulse'
                            : 'bg-white border-[#c8d4c7] text-[#9ab098]'
                        }`}
                      >
                        {stage.status === 'completed' ? (
                          <Check className="w-3 h-3 stroke-[3]" />
                        ) : stage.status === 'action-required' ? (
                          <AlertTriangle className="w-3 h-3 stroke-[2.5]" />
                        ) : (
                          <span className="text-[10px] font-bold">{idx + 1}</span>
                        )}
                      </div>

                      <div className={`p-4 rounded-lg border transition-colors ${
                        stage.status === 'action-required'
                          ? 'bg-[#fff5f5]/80 border-[#fca5a5] shadow-xs'
                          : stage.status === 'in-progress'
                          ? 'bg-[#edf5ef]/70 border-[#c5e2cb] shadow-xs'
                          : stage.status === 'completed'
                          ? 'bg-white border-[#e3ebe1]'
                          : 'bg-[#fcfdfd] border-[#F9FAF2] opacity-75'
                      }`}>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-sm font-bold text-[#355E3B]">
                              {idx + 1}. {stage.name}
                            </h4>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                              stage.status === 'completed'
                                ? 'bg-[#dcfce7] text-[#166534] border-[#86efac]'
                                : stage.status === 'action-required'
                                ? 'bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]'
                                : stage.status === 'in-progress'
                                ? 'bg-[#edf5ef] text-[#539160] border-[#a1cba9]'
                                : 'bg-[#F9FAF2] text-[#555C56] border-[#e3ebe1]'
                            }`}>
                              {stage.statusLabel}
                            </span>
                            <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded ${
                              stage.status === 'action-required'
                                ? 'bg-[#b91c1c] text-white'
                                : stage.status === 'in-progress'
                                ? 'bg-[#6DAE7C] text-white'
                                : stage.status === 'completed'
                                ? 'bg-[#15803d] text-white'
                                : 'bg-[#e3ebe1] text-[#4A4A4A]'
                            }`}>
                              {stage.status === 'action-required'
                                ? 'Entrepreneur Action'
                                : stage.status === 'in-progress'
                                ? 'Government Action'
                                : stage.status === 'completed'
                                ? 'Done'
                                : 'Upcoming'}
                            </span>
                          </div>
                          <span className="text-xs text-[#555C56] font-medium">{stage.date}</span>
                        </div>

                        {/* Meta row: Owner & Time spent */}
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-[#4A4A4A]">
                          <div>
                            <span className="text-[#555C56]">Processing Authority: </span>
                            <strong className="text-[#1e293b] font-medium">{stage.owner}</strong>
                          </div>
                          {stage.timeSpent && (
                            <div>
                              <span className="text-[#555C56]">Time Spent: </span>
                              <strong className="text-[#1e293b] font-medium">{stage.timeSpent}</strong>
                            </div>
                          )}
                        </div>

                        {/* What is needed from entrepreneur */}
                        {stage.whatIsNeeded && (
                          <div className={`mt-3 p-3 rounded border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            stage.status === 'action-required'
                              ? 'bg-[#fee2e2]/60 border-[#fca5a5] text-[#991b1b]'
                              : 'bg-[#F9FAF2] border-[#e3ebe1] text-[#3A3E39]'
                          }`}>
                            <div>
                              <span className="font-bold block text-[11px] uppercase tracking-wider">
                                {stage.status === 'action-required' ? 'What You Need to Do:' : 'Applicant Requirement:'}
                              </span>
                              <span className="mt-0.5 block leading-relaxed">{stage.whatIsNeeded}</span>
                            </div>
                            {stage.actionLabel && (
                              stage.actionHref ? (
                                <Link
                                  href={stage.actionHref}
                                  className="shrink-0 text-xs bg-[#b91c1c] text-white hover:bg-[#991b1b] px-3 py-1.5 rounded font-semibold transition-colors shadow-2xs"
                                >
                                  {stage.actionLabel} →
                                </Link>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (stage.id === 'inspection') setActiveTab('inspection');
                                    else if (stage.id === 'doc-review') setActiveTab('documents');
                                    else if (stage.id === 'decision') setActiveTab('decision');
                                  }}
                                  className="shrink-0 text-xs bg-[#355E3B] text-white hover:bg-[#0f2338] px-3 py-1.5 rounded font-semibold transition-colors shadow-2xs"
                                >
                                  {stage.actionLabel} →
                                </button>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: DOCUMENTS */}
            {activeTab === 'documents' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-[#355E3B]">Documents Attached to this Application</h3>
                    <p className="text-xs text-[#555C56] mt-0.5">
                      Verified project files reused from the Document Centre and submitted for department review.
                    </p>
                  </div>
                  <Link
                    href={ENTREPRENEUR_ROUTES.documents(project.id)}
                    className="text-xs text-[#6DAE7C] hover:underline font-medium flex items-center gap-1"
                  >
                    Document Centre →
                  </Link>
                </div>

                <div className="border border-[#e3ebe1] rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#F9FAF2] border-b border-[#e3ebe1] text-[11px] font-semibold text-[#555C56] uppercase tracking-wider">
                        <th className="px-4 py-2.5 border-r border-[#e3ebe1]">Doc ID</th>
                        <th className="px-4 py-2.5 border-r border-[#e3ebe1]">Document Name</th>
                        <th className="px-4 py-2.5 border-r border-[#e3ebe1]">Category</th>
                        <th className="px-4 py-2.5 border-r border-[#e3ebe1]">Verification</th>
                        <th className="px-4 py-2.5 border-r border-[#e3ebe1]">Validity</th>
                        <th className="px-4 py-2.5">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F9FAF2]">
                      {appDocs.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-4 py-8 text-center text-[#9ab098]">
                            No documents currently attached.
                          </td>
                        </tr>
                      ) : (
                        appDocs.map(doc => (
                          <tr key={doc.id} className="hover:bg-[#F9FAF2]">
                            <td className="px-4 py-3 font-mono font-semibold text-[#6DAE7C] border-r border-[#F9FAF2] whitespace-nowrap">
                              {doc.id}
                            </td>
                            <td className="px-4 py-3 border-r border-[#F9FAF2]">
                              <span className="font-medium text-[#355E3B] block">{doc.name}</span>
                              <span className="text-[11px] text-[#555C56]">Source: {doc.source} · v{doc.version}</span>
                            </td>
                            <td className="px-4 py-3 border-r border-[#F9FAF2] whitespace-nowrap text-[#4A4A4A]">
                              {doc.category}
                            </td>
                            <td className="px-4 py-3 border-r border-[#F9FAF2] whitespace-nowrap">
                              {verifBadge(doc.verification)}
                            </td>
                            <td className="px-4 py-3 border-r border-[#F9FAF2] whitespace-nowrap">
                              {validityBadge(doc.validity)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <Link
                                  href={ENTREPRENEUR_ROUTES.document(project.id, doc.id)}
                                  className="text-xs text-[#6DAE7C] hover:underline font-medium"
                                >
                                  View Details →
                                </Link>
                                {doc.certificateData && (
                                  <button
                                    type="button"
                                    onClick={() => setPreviewCertDoc(doc)}
                                    className="text-[11px] bg-[#edf5ef] text-[#539160] border border-[#c5e2cb] hover:bg-[#edf5ef] px-2 py-0.5 rounded font-medium"
                                  >
                                    Preview Cert (QR)
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: QUERIES */}
            {activeTab === 'queries' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#355E3B]">Department Query Records</h3>
                    <p className="text-xs text-[#555C56] mt-0.5">
                      Statutory deficiencies raised by scrutiny officers requiring official clarification or resubmission.
                    </p>
                  </div>
                  {query && (
                    <span className="text-xs bg-[#fee2e2] text-[#b91c1c] border border-[#fca5a5] px-2.5 py-1 rounded font-semibold">
                      Deadline: {query.responseDeadline}
                    </span>
                  )}
                </div>

                {query ? (
                  <div className="border border-[#fca5a5] rounded-lg bg-white overflow-hidden shadow-2xs">
                    <div className="bg-[#fff5f5] px-4 py-3 border-b border-[#fca5a5] flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#b91c1c]">{query.queryId}</span>
                          <span className="text-xs font-semibold text-[#355E3B]">— Consolidated Deficiency Memo</span>
                        </div>
                        <p className="text-[11px] text-[#555C56] mt-0.5">
                          Issued on {query.issuedDate} by {query.dept} Technical Scrutiny Cell
                        </p>
                      </div>
                      <Link
                        href={ENTREPRENEUR_ROUTES.applicationQuery(project.id, app.appId, query.queryId)}
                        className="text-xs bg-[#b91c1c] text-white hover:bg-[#991b1b] px-3.5 py-1.5 rounded font-semibold shadow-xs"
                      >
                        Respond & Rectify →
                      </Link>
                    </div>

                    <div className="divide-y divide-[#F9FAF2] p-4 space-y-4">
                      {query.deficiencies.map((def, idx) => (
                        <div key={def.id} className="pt-3 first:pt-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-xs font-bold text-[#b91c1c]">
                              {idx + 1}. {def.id}: {def.summary}
                            </span>
                            <span className="text-[10px] bg-[#fee2e2] text-[#991b1b] px-2 py-0.5 rounded font-medium">
                              Correction Required
                            </span>
                          </div>
                          <p className="text-xs text-[#3A3E39] mt-1.5 leading-relaxed bg-[#F9FAF2] p-3 rounded border border-[#e3ebe1]">
                            <strong>Officer Note:</strong> {def.officerComment}
                          </p>
                          <div className="mt-2 text-xs text-[#4A4A4A] space-y-1">
                            <p><strong>Required Action:</strong> {def.requiredAction}</p>
                            {def.regulatoryRef && (
                              <p className="text-[11px] text-[#555C56]">
                                <strong>Legal Reference:</strong> {def.regulatoryRef}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#F9FAF2] px-4 py-3 border-t border-[#e3ebe1] flex items-center justify-between text-xs">
                      <span className="text-[#555C56]">
                        Need to review changes across multiple applications?
                      </span>
                      <Link
                        href={ENTREPRENEUR_ROUTES.applicationResubmission(project.id, app.appId, 'APP-2026-MPCB-00412-R2')}
                        className="text-[#6DAE7C] hover:underline font-semibold"
                      >
                        Inspect Delta Resubmission →
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="border border-[#e3ebe1] rounded-lg p-8 text-center bg-white">
                    <CheckCircle2 className="w-8 h-8 text-[#15803d] mx-auto mb-2" />
                    <h4 className="text-sm font-bold text-[#355E3B]">No Open Queries</h4>
                    <p className="text-xs text-[#555C56] mt-1 max-w-md mx-auto">
                      The department has not raised any deficiency memo for this application. Scrutiny is proceeding smoothly.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: INSPECTION */}
            {activeTab === 'inspection' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#355E3B]">Field Site Inspection Records</h3>
                    <p className="text-xs text-[#555C56] mt-0.5">
                      Mandatory joint or departmental site verification records under Maharashtra industrial norms.
                    </p>
                  </div>
                  {appInspection && (
                    <Link
                      href={ENTREPRENEUR_ROUTES.inspection(project.id, appInspection.id)}
                      className="text-xs text-[#6DAE7C] hover:underline font-medium"
                    >
                      View in Inspection Centre →
                    </Link>
                  )}
                </div>

                {appInspection ? (
                  <div className="border border-[#e3ebe1] rounded-lg bg-white overflow-hidden shadow-2xs">
                    <div className="bg-[#F9FAF2] px-4 py-3 border-b border-[#e3ebe1] flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#355E3B]">{appInspection.id}</span>
                          <span className="text-xs font-semibold text-[#1e293b]">— {appInspection.type}</span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded border border-[#86efac] bg-[#dcfce7] text-[#166534]">
                            {appInspection.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#555C56] mt-0.5">
                          Conducted on {appInspection.date} at {appInspection.time} · {appInspection.site}
                        </p>
                      </div>
                      <Link
                        href={ENTREPRENEUR_ROUTES.inspection(project.id, appInspection.id)}
                        className="text-xs border border-[#c8d4c7] text-[#355E3B] hover:bg-white px-3 py-1.5 rounded font-medium shadow-2xs"
                      >
                        Inspect Observations →
                      </Link>
                    </div>

                    <div className="p-4 space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-[#555C56] uppercase tracking-wider mb-2">
                          Field Observations ({appInspection.observations.length})
                        </h4>
                        {appInspection.observations.length > 0 ? (
                          <div className="space-y-2.5">
                            {appInspection.observations.map(obs => (
                              <div key={obs.id} className="p-3 bg-[#F9FAF2] rounded border border-[#e3ebe1] text-xs">
                                <div className="flex items-center justify-between gap-2">
                                  <strong className="text-[#355E3B]">{obs.id}: {obs.checklistItem}</strong>
                                  <span className="text-[10px] bg-[#dcfce7] text-[#166534] px-1.5 py-0.2 rounded font-medium">
                                    {obs.responseState}
                                  </span>
                                </div>
                                <p className="text-[#4A4A4A] mt-1">{obs.description}</p>
                                <p className="text-[11px] text-[#555C56] mt-1">
                                  <strong>Resolution:</strong> {obs.requiredCorrection}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-[#555C56]">No adverse observations recorded during site verification.</p>
                        )}
                      </div>

                      <div className="pt-2 border-t border-[#F9FAF2]">
                        <h4 className="text-xs font-bold text-[#555C56] uppercase tracking-wider mb-2">
                          Preparation Checklist Items
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#3A3E39]">
                          {appInspection.prepRequirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2 bg-[#F9FAF2] p-2 rounded border border-[#F9FAF2]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#15803d] shrink-0 mt-0.5" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border border-[#e3ebe1] rounded-lg p-8 text-center bg-white">
                    <ShieldCheck className="w-8 h-8 text-[#9ab098] mx-auto mb-2" />
                    <h4 className="text-sm font-bold text-[#355E3B]">Inspection Not Scheduled Yet</h4>
                    <p className="text-xs text-[#555C56] mt-1 max-w-md mx-auto">
                      Field inspection will be scheduled by the regional department officer once preliminary technical scrutiny is completed.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: DECISION & COMPLIANCE TRANSITION */}
            {activeTab === 'decision' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#355E3B]">Approval Grant & Compliance Transition</h3>
                    <p className="text-xs text-[#555C56] mt-0.5">
                      Statutory determination, clearance certificate, and automatically enrolled ongoing compliance obligations.
                    </p>
                  </div>
                  {decision && (
                    <Link
                      href={ENTREPRENEUR_ROUTES.applicationDecision(project.id, app.appId, decision.decisionId)}
                      className="text-xs text-[#6DAE7C] hover:underline font-medium"
                    >
                      Open Decision Notice →
                    </Link>
                  )}
                </div>

                {decision ? (
                  <div className="space-y-5">
                    {/* APPROVAL GRANTED HERO CARD */}
                    <div className="border border-[#86efac] border-l-4 border-l-[#15803d] rounded-lg bg-white overflow-hidden shadow-2xs">
                      <div className="bg-[#f0fdf4] px-5 py-4 border-b border-[#86efac] flex flex-wrap items-center justify-between gap-3">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-[#166534]" />
                            <h4 className="text-base font-bold text-[#166534]">
                              APPROVAL GRANTED — {decision.service.toUpperCase()}
                            </h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-[#86efac] bg-[#dcfce7] text-[#166534]">
                              {decision.decisionId}
                            </span>
                          </div>
                          <p className="text-xs text-[#166534]">
                            Order No: <strong>{decision.approvalId}</strong> · Issued on {decision.issueDate} · Valid until {decision.expiryDate}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          {decision.certDocId && (
                            <button
                              type="button"
                              onClick={() => {
                                const doc = allDocs.find(d => d.id === decision.certDocId);
                                if (doc) setPreviewCertDoc(doc);
                              }}
                              className="text-xs bg-[#166534] text-white hover:bg-[#14532d] px-3.5 py-1.5 rounded font-semibold shadow-xs flex items-center gap-1.5"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Preview Certificate (with QR)
                            </button>
                          )}
                          <Link
                            href={ENTREPRENEUR_ROUTES.applicationDecision(project.id, app.appId, decision.decisionId)}
                            className="text-xs border border-[#86efac] bg-white text-[#166534] hover:bg-[#dcfce7] px-3 py-1.5 rounded font-semibold transition-colors"
                          >
                            Full Transition Notice →
                          </Link>
                        </div>
                      </div>

                      {/* THE 6 CORE APPROVAL FACETS */}
                      <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                        {/* 1. What was approved */}
                        <div className="p-3.5 border border-[#e3ebe1] bg-[#F9FAF2] rounded space-y-1.5">
                          <span className="text-[10px] font-bold text-[#555C56] uppercase tracking-wider block">
                            1. What Was Approved
                          </span>
                          <p className="font-semibold text-xs text-[#355E3B]">
                            {decision.whatWasApproved?.service || decision.service}
                          </p>
                          <p className="text-[11px] text-[#4A4A4A] leading-relaxed">
                            {decision.whatWasApproved?.scope || 'Industrial establishment parameters and environmental pollution control system approved.'}
                          </p>
                          <p className="text-[10px] text-[#555C56] pt-1 border-t border-[#e3ebe1]">
                            Authority: <strong>{decision.whatWasApproved?.authority || decision.dept}</strong>
                          </p>
                        </div>

                        {/* 2. Validity */}
                        <div className="p-3.5 border border-[#e3ebe1] bg-[#F9FAF2] rounded space-y-1.5">
                          <span className="text-[10px] font-bold text-[#166534] uppercase tracking-wider block">
                            2. Validity
                          </span>
                          <p className="font-semibold text-xs text-[#166534]">
                            {decision.validityPeriod || '5 Years Validity'}
                          </p>
                          <div className="space-y-0.5 text-[11px] text-[#3A3E39]">
                            <p className="flex justify-between">
                              <span className="text-[#555C56]">Issued:</span>
                              <strong className="font-mono">{decision.issueDate}</strong>
                            </p>
                            <p className="flex justify-between">
                              <span className="text-[#555C56]">Expires:</span>
                              <strong className="font-mono text-[#b91c1c]">{decision.expiryDate}</strong>
                            </p>
                          </div>
                          <p className="text-[10px] text-[#166534] font-semibold pt-1 border-t border-[#e3ebe1]">
                            Status: Active & Valid
                          </p>
                        </div>

                        {/* 3. Documents */}
                        <div className="p-3.5 border border-[#e3ebe1] bg-[#F9FAF2] rounded space-y-1.5">
                          <span className="text-[10px] font-bold text-[#555C56] uppercase tracking-wider block">
                            3. Documents
                          </span>
                          <p className="font-semibold text-xs text-[#355E3B]">
                            Clearance Certificate ({decision.certId})
                          </p>
                          <p className="text-[11px] text-[#4A4A4A]">
                            Registered under <strong>{decision.certDocId || 'DOC-003'}</strong> with digital QR seal.
                          </p>
                          <div className="pt-1 border-t border-[#e3ebe1] flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                const doc = allDocs.find(d => d.id === decision.certDocId);
                                if (doc) setPreviewCertDoc(doc);
                              }}
                              className="text-[11px] text-[#6DAE7C] font-semibold hover:underline"
                            >
                              Preview QR →
                            </button>
                            <span className="text-[#c8d4c7]">|</span>
                            <Link
                              href={ENTREPRENEUR_ROUTES.document(project.id, decision.certDocId || 'DOC-003')}
                              className="text-[11px] text-[#555C56] hover:text-[#355E3B] hover:underline"
                            >
                              Document Centre
                            </Link>
                          </div>
                        </div>

                        {/* 4. Conditions */}
                        <div className="p-3.5 border border-[#e3ebe1] bg-[#F9FAF2] rounded space-y-1.5 lg:col-span-2">
                          <span className="text-[10px] font-bold text-[#555C56] uppercase tracking-wider block">
                            4. Conditions ({decision.conditions?.length ?? 0} General, {decision.specialConditions?.length ?? 0} Special)
                          </span>
                          <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
                            {decision.conditions?.slice(0, 2).map((cond, i) => (
                              <div key={i} className="text-[11px] text-[#3A3E39] flex items-start gap-1.5">
                                <span className="font-mono text-[#9ab098] font-bold shrink-0">{i + 1}.</span>
                                <span>{cond}</span>
                              </div>
                            ))}
                            {decision.specialConditions?.map((sCond, i) => (
                              <div key={i} className="text-[11px] text-[#7a5807] bg-[#fefce8] p-1.5 rounded border border-[#fae69e] flex items-start gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5 text-[#D4A017] shrink-0 mt-0.5" />
                                <span>{sCond}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 5. Renewal requirements */}
                        <div className="p-3.5 border border-[#e3ebe1] bg-[#F9FAF2] rounded space-y-1.5">
                          <span className="text-[10px] font-bold text-[#9333ea] uppercase tracking-wider block">
                            5. Renewal Requirements
                          </span>
                          <p className="font-semibold text-xs text-[#355E3B]">
                            {decision.renewalRequirements?.frequency || 'Every 5 Years'}
                          </p>
                          <p className="text-[11px] text-[#4A4A4A] leading-relaxed">
                            {decision.renewalRequirements?.renewalDeadline || 'Apply 120 days prior to expiry.'}
                          </p>
                          <p className="text-[10px] text-[#9333ea] font-semibold pt-1 border-t border-[#e3ebe1]">
                            Cutoff: {decision.renewalRequirements?.cutoffDate || '11 Jun 2031'}
                          </p>
                        </div>
                      </div>

                      {/* 6. Next compliance obligations transition */}
                      <div className="px-5 pb-4">
                        <div className="p-3 border border-[#c7d2fe] bg-[#f8f9fc] rounded text-xs space-y-1">
                          <div className="flex items-center gap-1.5 text-[#3730a3] font-bold uppercase tracking-wider text-[10px]">
                            <Clock className="w-3.5 h-3.5" />
                            <span>6. Next Compliance Obligations</span>
                          </div>
                          <p className="text-[#312e81] text-[11px] leading-relaxed">
                            {decision.nextComplianceSummary ||
                              'Operational conditions have been enrolled directly into your compliance ledger below. You do not need to discover or configure these obligations manually.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* NEW COMPLIANCE OBLIGATIONS TABLE */}
                    {appObligations.length > 0 && (
                      <div className="border border-[#e3ebe1] rounded-lg bg-white p-5 shadow-2xs space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e3ebe1] pb-3">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#539160] bg-[#edf5ef] px-2 py-0.5 rounded border border-[#c5e2cb]">
                              Automatic Enrollment
                            </span>
                            <h4 className="text-sm font-bold text-[#355E3B] mt-1">
                              NEW COMPLIANCE OBLIGATIONS ({appObligations.length})
                            </h4>
                            <p className="text-xs text-[#555C56] mt-0.5">
                              Enrolled directly from statutory approval order <strong>{decision.approvalId}</strong>.
                            </p>
                          </div>
                          <Link
                            href={ENTREPRENEUR_ROUTES.compliance(project.id)}
                            className="text-xs bg-[#355E3B] text-white hover:bg-[#27472c] px-3 py-1.5 rounded font-semibold transition-colors shadow-2xs inline-flex items-center gap-1.5"
                          >
                            <span>Compliance Dashboard</span>
                            <span>→</span>
                          </Link>
                        </div>

                        <div className="overflow-x-auto border border-[#e3ebe1] rounded">
                          <table className="w-full text-xs border-collapse">
                            <thead>
                              <tr className="bg-[#F9FAF2] border-b border-[#e3ebe1]">
                                <th className="text-left px-3.5 py-2.5 text-[10px] font-bold text-[#555C56] uppercase tracking-wider border-r border-[#e3ebe1]">
                                  Obligation
                                </th>
                                <th className="text-left px-3.5 py-2.5 text-[10px] font-bold text-[#555C56] uppercase tracking-wider border-r border-[#e3ebe1]">
                                  Due Date
                                </th>
                                <th className="text-left px-3.5 py-2.5 text-[10px] font-bold text-[#555C56] uppercase tracking-wider border-r border-[#e3ebe1]">
                                  Frequency
                                </th>
                                <th className="text-left px-3.5 py-2.5 text-[10px] font-bold text-[#555C56] uppercase tracking-wider border-r border-[#e3ebe1]">
                                  Source Approval
                                </th>
                                <th className="text-left px-3.5 py-2.5 text-[10px] font-bold text-[#555C56] uppercase tracking-wider border-r border-[#e3ebe1]">
                                  Required Action
                                </th>
                                <th className="text-left px-3.5 py-2.5 text-[10px] font-bold text-[#555C56] uppercase tracking-wider border-r border-[#e3ebe1]">
                                  Status
                                </th>
                                <th className="text-right px-3.5 py-2.5 text-[10px] font-bold text-[#555C56] uppercase tracking-wider">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F9FAF2]">
                              {appObligations.map(obl => (
                                <tr key={obl.id} className="hover:bg-[#F9FAF2] transition-colors">
                                  <td className="px-3.5 py-2.5 border-r border-[#F9FAF2]">
                                    <span className="font-mono text-[10px] font-bold text-[#555C56] block">{obl.id}</span>
                                    <p className="font-semibold text-xs text-[#355E3B]">{obl.name}</p>
                                    <span className="text-[10px] text-[#555C56]">{obl.category}</span>
                                  </td>
                                  <td className="px-3.5 py-2.5 whitespace-nowrap border-r border-[#F9FAF2]">
                                    <span className="font-bold text-[#355E3B] block">{obl.dueDate}</span>
                                    <span className="text-[10px] text-[#555C56]">Statutory Deadline</span>
                                  </td>
                                  <td className="px-3.5 py-2.5 text-[#4A4A4A] border-r border-[#F9FAF2]">
                                    {obl.frequency}
                                  </td>
                                  <td className="px-3.5 py-2.5 border-r border-[#F9FAF2]">
                                    <span className="font-mono text-[11px] font-semibold text-[#539160] block">
                                      {obl.sourceApprovalId}
                                    </span>
                                    <span className="text-[10px] text-[#555C56]">{obl.sourceCondition}</span>
                                  </td>
                                  <td className="px-3.5 py-2.5 text-[#3A3E39] border-r border-[#F9FAF2] max-w-[220px]">
                                    <p className="line-clamp-2 leading-relaxed">{obl.actionRequired || obl.description}</p>
                                  </td>
                                  <td className="px-3.5 py-2.5 whitespace-nowrap border-r border-[#F9FAF2]">
                                    <span className="text-[10px] font-bold px-2 py-0.5 border rounded-sm uppercase tracking-wide border-[#fca5a5] bg-[#fee2e2] text-[#b91c1c]">
                                      {obl.status}
                                    </span>
                                  </td>
                                  <td className="px-3.5 py-2.5 text-right whitespace-nowrap">
                                    <Link
                                      href={ENTREPRENEUR_ROUTES.complianceDetail(project.id, obl.id)}
                                      className="text-xs font-semibold text-[#6DAE7C] hover:underline"
                                    >
                                      Manage →
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Architectural separation banner */}
                        <div className="bg-[#F9FAF2] border border-[#d6dfd5] rounded p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                          <div>
                            <span className="font-bold text-[#355E3B]">The Approval page summarizes. The Compliance page manages.</span>
                            <p className="text-[#555C56] mt-0.5">
                              Filing returns, evidence submissions, and ongoing renewals take place in the Compliance Ledger.
                            </p>
                          </div>
                          <Link
                            href={ENTREPRENEUR_ROUTES.compliance(project.id)}
                            className="bg-[#355E3B] text-white hover:bg-[#27472c] px-3 py-1.5 rounded font-semibold text-xs whitespace-nowrap shadow-2xs"
                          >
                            Manage in Compliance Dashboard →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="border border-[#e3ebe1] rounded-lg p-8 text-center bg-white">
                    <Clock className="w-8 h-8 text-[#9ab098] mx-auto mb-2" />
                    <h4 className="text-sm font-bold text-[#355E3B]">Decision Pending</h4>
                    <p className="text-xs text-[#555C56] mt-1 max-w-md mx-auto">
                      This application is currently in technical assessment. Official clearance decision and certificate will appear here once the Consent Committee reviews the dossier.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ─── Contextual Sidebar & Legal Assistance ──────────────────────── */}
        <section aria-label="Contextual Resources" className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-[#e3ebe1] rounded-lg p-4 shadow-2xs space-y-2">
            <h3 className="text-xs font-bold text-[#355E3B] uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#6DAE7C]" />
              Downstream Dependencies
            </h3>
            <p className="text-xs text-[#555C56]">
              See which subsequent building permits and operational registrations depend on this approval.
            </p>
            <Link
              href={ENTREPRENEUR_ROUTES.dependencies(project.id)}
              className="text-xs text-[#6DAE7C] hover:underline font-semibold block pt-1"
            >
              Dependency Graph →
            </Link>
          </div>

          <div className="bg-white border border-[#e3ebe1] rounded-lg p-4 shadow-2xs space-y-2">
            <h3 className="text-xs font-bold text-[#355E3B] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#15803d]" />
              Maharashtra RTS Protection
            </h3>
            <p className="text-xs text-[#555C56]">
              This application is protected under the Right to Public Services Act (RTS Act, 2015).
            </p>
            <Link
              href={ENTREPRENEUR_ROUTES.grievances(project.id, { applicationId: app.appId })}
              className="text-xs text-[#6DAE7C] hover:underline font-semibold block pt-1"
            >
              File SLA Grievance →
            </Link>
          </div>

          <div className="bg-white border border-[#e3ebe1] rounded-lg p-4 shadow-2xs space-y-2">
            <h3 className="text-xs font-bold text-[#355E3B] uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#0891b2]" />
              Regulatory Assistant
            </h3>
            <p className="text-xs text-[#555C56]">
              Have questions regarding {app.dept} scrutiny standards or water balance norms?
            </p>
            <Link
              href={ENTREPRENEUR_ROUTES.assistant()}
              className="text-xs text-[#6DAE7C] hover:underline font-semibold block pt-1"
            >
              Ask Regulatory Assistant →
            </Link>
          </div>
        </section>
      </div>

      {/* ─── Certificate Preview Modal ────────────────────────────────────── */}
      {previewCertDoc && (
        <CertificatePreviewModal
          doc={previewCertDoc}
          businessName={project.name}
          businessLocation={project.location}
          projectId={project.id}
          onClose={() => setPreviewCertDoc(null)}
        />
      )}
    </main>
  );
}
