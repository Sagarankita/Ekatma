'use client';

import React, { useState } from 'react';
import { Icon } from '../public-auth/PublicChrome';
import { listGrievancesForBusiness, type Grievance, type GrievanceReason, type GrievanceStatus } from './data';
import { findTrackerAppForBusiness, listTrackerAppsForBusiness } from '../applications/data';
import { findBusinessProjectById } from '../businesses/catalog';

type RequestType = 'Application grievance' | 'Service request' | 'Escalation'

const inputDefault = 'w-full px-3 py-2 text-sm border rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#6DAE7C] focus:border-[#6DAE7C] transition-colors placeholder:text-[#8c9f8a] border-[#d6dfd5]';
function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return <nav aria-label="Breadcrumb"><ol className="flex items-center gap-1 text-sm text-[#555C56]">{items.map((item, i) => <li key={`${item.label}-${i}`} className="flex items-center gap-1">{i > 0 && <Icon.ChevronRight />}<span className="text-[#2B2B2B]">{item.label}</span></li>)}</ol></nav>;
}

const grievanceStatusConfig: Record<GrievanceStatus, { bg: string; text: string; border: string; dot: string }> = {
  'Raised':    { bg: 'bg-blue-50',   text: 'text-blue-800',   border: 'border-blue-200',   dot: 'bg-blue-500' },
  'Assigned':  { bg: 'bg-amber-50',  text: 'text-amber-800',  border: 'border-amber-200',  dot: 'bg-amber-500' },
  'Escalated': { bg: 'bg-red-50',    text: 'text-red-800',    border: 'border-red-200',    dot: 'bg-red-500' },
  'Response':  { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200', dot: 'bg-purple-500' },
  'Resolved':  { bg: 'bg-green-50',  text: 'text-green-800',  border: 'border-green-200',  dot: 'bg-green-500' },
  'Reopened':  { bg: 'bg-orange-50', text: 'text-orange-800', border: 'border-orange-200', dot: 'bg-orange-500' },
}

const GRIEVANCE_LIFECYCLE: GrievanceStatus[] = ['Raised', 'Assigned', 'Escalated', 'Response', 'Resolved']

function GrievanceLifecycleBar({ status }: { status: GrievanceStatus }) {
  const steps = GRIEVANCE_LIFECYCLE
  const currentIdx = steps.indexOf(status === 'Reopened' ? 'Resolved' : status)
  return (
    <nav aria-label="Grievance lifecycle" className="flex items-center gap-0">
      {steps.map((step, i) => {
        const done = i < currentIdx
        const active = i === currentIdx && status !== 'Reopened'
        return (
          <div key={step} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1 min-w-0">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 shrink-0
                ${done ? 'bg-[#355E3B] border-[#355E3B] text-white' : active ? 'bg-white border-[#355E3B] text-[#355E3B]' : 'bg-white border-[#d6dfd5] text-[#8c9f8a]'}`}>
                {done ? <Icon.Check /> : i + 1}
              </div>
              <span className={`text-[10px] font-medium text-center leading-tight whitespace-nowrap ${active ? 'text-[#355E3B]' : done ? 'text-[#4A4A4A]' : 'text-[#8c9f8a]'}`}>{step}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 mb-4 ${done ? 'bg-[#355E3B]' : 'bg-[#d6dfd5]'}`} aria-hidden="true" />
            )}
          </div>
        )
      })}
    </nav>
  )
}

function GrievanceStatusBadge({ status }: { status: GrievanceStatus }) {
  const cfg = grievanceStatusConfig[status]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} aria-hidden="true" />
      {status}
    </span>
  )
}

function GrievanceDetailPanel({ grievance, businessId, onBack, onReopen, lang }: {
  grievance: Grievance
  businessId: string
  onBack: () => void
  onReopen: () => void
  lang: 'en' | 'mr'
}) {
  const business = findBusinessProjectById(businessId)
  const linkedApplication = findTrackerAppForBusiness(businessId, grievance.applicationId)
  const t = {
    en: {
      back: '← Grievances',
      title: 'Grievance Detail',
      reason: 'Reason',
      status: 'Status',
      raisedOn: 'Raised on',
      assignedTo: 'Assigned to',
      appContext: 'Application & Service Context',
      appId: 'Application ID',
      dept: 'Department',
      service: 'Service',
      desk: 'Current Desk',
      submitted: 'Submission Date',
      sla: 'SLA',
      description: 'Grievance Description',
      responses: 'Department Responses',
      noResponse: 'No responses yet.',
      escalation: 'Escalation History',
      noEscalation: 'No escalations recorded.',
      resolution: 'Resolution',
      reopen: 'Reopen Grievance',
      lifecycle: 'Lifecycle',
    },
    mr: {
      back: '← तक्रारी',
      title: 'तक्रार तपशील',
      reason: 'कारण',
      status: 'स्थिती',
      raisedOn: 'दाखल दिनांक',
      assignedTo: 'नियुक्त',
      appContext: 'अर्ज आणि सेवा संदर्भ',
      appId: 'अर्ज क्रमांक',
      dept: 'विभाग',
      service: 'सेवा',
      desk: 'सध्याचे टेबल',
      submitted: 'सादर दिनांक',
      sla: 'SLA',
      description: 'तक्रार वर्णन',
      responses: 'विभागाचे प्रतिसाद',
      noResponse: 'अद्याप कोणताही प्रतिसाद नाही.',
      escalation: 'वाढ इतिहास',
      noEscalation: 'कोणतीही वाढ नोंदवली नाही.',
      resolution: 'निराकरण',
      reopen: 'तक्रार पुन्हा उघडा',
      lifecycle: 'जीवनचक्र',
    },
  }[lang]

  return (
    <main id="main-content" className="flex-1 bg-[#F9FAF2]" tabIndex={-1}>
      <div className="max-w-[960px] mx-auto px-6 py-5">
        <div className="mb-4">
          <Breadcrumb items={[
            { label: 'Home', href: '#' },
            { label: 'Grievances', href: '#' },
            { label: grievance.id },
          ]} />
        </div>

        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h1 className="text-xl font-bold text-[#2B2B2B]">{grievance.id}</h1>
            <p className="text-sm text-[#555C56] mt-0.5">{t.title}</p>
          </div>
          <div className="flex items-center gap-2">
            <GrievanceStatusBadge status={grievance.status} />
            {grievance.status === 'Resolved' && (
              <button onClick={onReopen} className="border border-amber-400 text-amber-700 bg-amber-50 text-xs font-medium px-3 py-1.5 rounded hover:bg-amber-100 transition-colors">
                {t.reopen}
              </button>
            )}
          </div>
        </div>

        {/* Lifecycle */}
        <div className="bg-white border border-[#d6dfd5] rounded p-4 mb-4">
          <h2 className="text-xs font-semibold text-[#555C56] uppercase tracking-wider mb-3">{t.lifecycle}</h2>
          <GrievanceLifecycleBar status={grievance.status} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {/* Left: Meta */}
          <div className="lg:col-span-1 space-y-4">
            {/* Summary */}
            <div className="bg-white border border-[#d6dfd5] rounded p-4">
              <h2 className="text-xs font-semibold text-[#555C56] uppercase tracking-wider mb-3">Summary</h2>
              <dl className="space-y-2.5 text-sm">
                {[
                  [t.reason, grievance.reason],
                  [t.raisedOn, grievance.raisedDate],
                  [t.assignedTo, grievance.assignedTo],
                ].map(([label, val]) => (
                  <div key={label as string}>
                    <dt className="text-xs text-[#555C56] font-medium">{label}</dt>
                    <dd className="text-[#2B2B2B] mt-0.5">{val}</dd>
                  </div>
                ))}
              </dl>
            </div>
            {/* Application Context — pre-filled read-only */}
            <div className="bg-white border border-[#d6dfd5] rounded overflow-hidden">
              <div className="bg-[#F9FAF2] border-b border-[#d6dfd5] px-4 py-2.5 flex items-center gap-2">
                <Icon.Info />
                <h2 className="text-xs font-semibold text-[#555C56] uppercase tracking-wider">{t.appContext}</h2>
              </div>
              <div className="p-4">
                <dl className="space-y-2.5 text-sm">
                  {[
                    ['Business', business?.name ?? businessId],
                    ['Project', business?.subtitle ?? 'Current project'],
                    [t.appId, grievance.applicationId],
                    [t.dept, grievance.department],
                    ['Current stage', linkedApplication?.stage ?? grievance.currentDesk],
                    ['Timeline', linkedApplication ? `Submitted ${linkedApplication.submittedDate ?? grievance.submissionDate} · ${linkedApplication.lastUpdated ?? linkedApplication.sla} · Target ${linkedApplication.targetDate ?? 'not available'}` : `Submitted ${grievance.submissionDate} · ${grievance.sla}`],
                  ].map(([label, val]) => (
                    <div key={label as string}>
                      <dt className="text-xs text-[#8c9f8a] font-medium">{label}</dt>
                      <dd className="text-[#4A4A4A] mt-0.5">{val}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          {/* Right: Description + Responses + Escalation + Resolution */}
          <div className="lg:col-span-2 space-y-4">
            {/* Description */}
            <div className="bg-white border border-[#d6dfd5] rounded p-4">
              <h2 className="text-xs font-semibold text-[#555C56] uppercase tracking-wider mb-2">{t.description}</h2>
              <p className="text-sm text-[#4A4A4A] leading-relaxed">{grievance.description}</p>
            </div>

            {/* Responses */}
            <div className="bg-white border border-[#d6dfd5] rounded overflow-hidden">
              <div className="bg-[#F9FAF2] border-b border-[#d6dfd5] px-4 py-2.5">
                <h2 className="text-xs font-semibold text-[#555C56] uppercase tracking-wider">{t.responses}</h2>
              </div>
              <div className="p-4 space-y-3">
                {grievance.responses.length === 0 ? (
                  <p className="text-sm text-[#8c9f8a]">{t.noResponse}</p>
                ) : grievance.responses.map((r, i) => (
                  <div key={i} className="border border-[#e3ebe1] rounded p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-6 h-6 rounded-full bg-[#355E3B] text-white flex items-center justify-center text-[10px] font-bold shrink-0">{r.author[0]}</div>
                      <div>
                        <span className="text-xs font-semibold text-[#2B2B2B]">{r.author}</span>
                        <span className="text-xs text-[#8c9f8a] ml-1.5">· {r.role} · {r.date}</span>
                      </div>
                    </div>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Escalation History */}
            <div className="bg-white border border-[#d6dfd5] rounded overflow-hidden">
              <div className="bg-[#F9FAF2] border-b border-[#d6dfd5] px-4 py-2.5">
                <h2 className="text-xs font-semibold text-[#555C56] uppercase tracking-wider">{t.escalation}</h2>
              </div>
              <div className="p-4">
                {grievance.escalationHistory.length === 0 ? (
                  <p className="text-sm text-[#8c9f8a]">{t.noEscalation}</p>
                ) : (
                  <div className="space-y-3">
                    {grievance.escalationHistory.map((e, i) => (
                      <div key={i} className="flex gap-3 text-sm">
                        <div className="shrink-0 w-px bg-[#d6dfd5] mx-2.5 relative">
                          <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full border-2 border-[#355E3B] bg-white" />
                        </div>
                        <div className="pb-3">
                          <p className="text-xs text-[#8c9f8a]">{e.date}</p>
                          <p className="text-[#2B2B2B] font-medium">{e.from} → {e.to}</p>
                          <p className="text-[#555C56] text-xs mt-0.5">{e.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Resolution */}
            {grievance.resolution && (
              <div role="alert" className="flex items-start gap-3 p-4 rounded border-l-4 bg-green-50 border-green-300">
                <span className="shrink-0 mt-0.5 text-green-600"><Icon.CheckCircle /></span>
                <div>
                  <p className="text-sm font-semibold text-green-900">{t.resolution}</p>
                  <p className="text-sm text-green-800 mt-0.5">{grievance.resolution}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <button onClick={onBack} className="border border-[#d6dfd5] text-[#4A4A4A] text-sm font-medium px-5 py-2 rounded hover:bg-[#F9FAF2] transition-colors">
          {t.back}
        </button>
      </div>
    </main>
  )
}

export function E32GrievancesPage({
  businessId,
  onBack,
  lang,
  initialGrievanceId,
  initialApplicationId,
  initialRaise,
}: {
  businessId: string;
  onBack: () => void;
  lang: 'en' | 'mr';
  initialGrievanceId?: string;
  initialApplicationId?: string;
  initialRaise?: boolean;
}) {
  const [grievances, setGrievances] = useState<Grievance[]>(() => listGrievancesForBusiness(businessId))
  const [filter, setFilter] = useState<GrievanceStatus | 'All'>('All')

  // Validate search parameters:
  const matchedGrievance = initialGrievanceId ? grievances.find(g => g.id === initialGrievanceId) : undefined
  const initialAppOptions = listTrackerAppsForBusiness(businessId)
  const matchedApp = initialApplicationId ? initialAppOptions.find(app => app.appId === initialApplicationId) : undefined

  const [view, setView] = useState<'list' | 'detail' | 'new'>(() => {
    if (matchedGrievance) return 'detail'
    if (initialRaise) return 'new'
    return 'list'
  })

  // Invalid grievanceId must NOT select the first record; it stays null in list view
  const [selectedId, setSelectedId] = useState<string | null>(() => (matchedGrievance ? matchedGrievance.id : null))

  // New grievance form state
  const [newReason, setNewReason] = useState<GrievanceReason | ''>('')
  const [newRequestType, setNewRequestType] = useState<RequestType | ''>('')
  const [newDesc, setNewDesc] = useState('')
  const [evidenceNames, setEvidenceNames] = useState<string[]>([])
  // Invalid applicationId must NOT select the first record; only exact matchedApp is used
  const [newAppId, setNewAppId] = useState<string>(() => {
    if (initialApplicationId) return matchedApp?.appId ?? ''
    return initialAppOptions.find(app => app.actionRequired)?.appId ?? initialAppOptions[0]?.appId ?? ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [lastCreatedId, setLastCreatedId] = useState<string>('')

  const t = {
    en: {
      title: 'Grievances',
      marathi: 'तक्रारी',
      subtitle: 'Raise and track grievances against your applications and services.',
      raise: 'Raise Grievance',
      filter: 'Filter by status',
      all: 'All',
      noGrievances: 'No grievances found.',
      newTitle: 'Raise a New Grievance',
      typeLabel: 'Type of Request',
      reasonLabel: 'Nature of Request',
      descLabel: 'Description',
      descHint: 'Describe the issue. System data will be automatically attached — you do not need to repeat information already in your application.',
      appIdLabel: 'Application / Reference',
      evidenceLabel: 'Supporting Evidence',
      submit: 'Submit Grievance',
      cancel: 'Cancel',
      autoAttached: 'Auto-attached system data',
      autoNote: 'The following information from your application record will be automatically included with this grievance.',
    },
    mr: {
      title: 'तक्रारी',
      marathi: 'Grievances',
      subtitle: 'तुमच्या अर्ज आणि सेवांसाठी तक्रारी दाखल करा आणि ट्रॅक करा.',
      raise: 'तक्रार दाखल करा',
      filter: 'स्थितीनुसार फिल्टर करा',
      all: 'सर्व',
      noGrievances: 'कोणत्याही तक्रारी आढळल्या नाहीत.',
      newTitle: 'नवीन तक्रार दाखल करा',
      typeLabel: 'विनंतीचा प्रकार',
      reasonLabel: 'तक्रारीचे कारण',
      descLabel: 'वर्णन',
      descHint: 'समस्या वर्णन करा. सिस्टम डेटा आपोआप जोडला जाईल.',
      appIdLabel: 'अर्ज / संदर्भ',
      evidenceLabel: 'समर्थन पुरावा',
      submit: 'तक्रार सादर करा',
      cancel: 'रद्द करा',
      autoAttached: 'आपोआप जोडलेला सिस्टम डेटा',
      autoNote: 'तुमच्या अर्जातील खालील माहिती या तक्रारीसह आपोआप समाविष्ट केली जाईल.',
    },
  }[lang]

  const REASONS: GrievanceReason[] = ['SLA breach', 'Unresolved query', 'Department delay', 'Incorrect status', 'Inspection delay', 'Other']
  const REQUEST_TYPES: RequestType[] = ['Application grievance', 'Service request', 'Escalation']

  const selectedApp = newAppId ? findTrackerAppForBusiness(businessId, newAppId) : undefined
  const business = findBusinessProjectById(businessId)

  const filtered = filter === 'All' ? grievances : grievances.filter(g => g.status === filter)
  const selected = grievances.find(g => g.id === selectedId)

  if (view === 'detail' && selected) {
    return (
      <GrievanceDetailPanel
        grievance={selected}
        businessId={businessId}
        lang={lang}
        onBack={() => setView('list')}
        onReopen={() => {
          setGrievances(prev => prev.map(g => g.id === selected.id ? { ...g, status: 'Reopened' as GrievanceStatus } : g))
          setView('list')
        }}
      />
    )
  }

  if (view === 'new') {
    if (submitted) {
      return (
        <main id="main-content" className="flex-1 bg-[#F9FAF2]" tabIndex={-1}>
          <div className="max-w-[720px] mx-auto px-6 py-5">
            <div className="bg-white border border-[#d6dfd5] rounded p-10 text-center">
              <div className="w-12 h-12 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-600 mx-auto mb-4">
                <Icon.CheckCircle />
              </div>
              <h2 className="text-base font-semibold text-[#2B2B2B] mb-2">Grievance Submitted</h2>
              <p className="text-sm text-[#555C56] mb-4">Your grievance has been recorded as <strong>{lastCreatedId || 'GRV-2026-0015'}</strong> and added to your trackable demo records for this tab session. You will receive updates as the case progresses.</p>
              <p className="text-xs text-[#9ab098] mb-6 italic">Note: This is a local demo record in this tab session and does not persist to a live backend database.</p>
              <button onClick={() => { setSubmitted(false); setView('list') }} className="bg-[#355E3B] text-white text-sm font-medium px-5 py-2 rounded hover:bg-[#27472c] transition-colors">
                Back to Grievances
              </button>
            </div>
          </div>
        </main>
      )
    }
    return (
      <main id="main-content" className="flex-1 bg-[#F9FAF2]" tabIndex={-1}>
        <div className="max-w-[720px] mx-auto px-6 py-5">
          <div className="mb-4">
            <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Grievances', href: '#' }, { label: 'New Grievance' }]} />
          </div>
          <h1 className="text-xl font-bold text-[#2B2B2B] mb-4">{t.newTitle}</h1>

          <div className="bg-white border border-[#d6dfd5] rounded p-5 mb-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-1">{t.typeLabel} <span className="text-red-600" aria-hidden="true">*</span></label>
                <select value={newRequestType} onChange={e => setNewRequestType(e.target.value as RequestType)} className={inputDefault}>
                  <option value="">Select request type…</option>
                  {REQUEST_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-1">{t.reasonLabel} <span className="text-red-600" aria-hidden="true">*</span></label>
                <select value={newReason} onChange={e => setNewReason(e.target.value as GrievanceReason)} className={inputDefault}>
                  <option value="">Select a reason…</option>
                  {REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-1">{t.descLabel} <span className="text-red-600" aria-hidden="true">*</span></label>
                <textarea rows={4} value={newDesc} onChange={e => setNewDesc(e.target.value)} className={`${inputDefault} resize-none`} placeholder={t.descHint} />
                <p className="mt-1 text-xs text-[#555C56]">{t.descHint}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-1" htmlFor="grievance-evidence">{t.evidenceLabel}</label>
                <input id="grievance-evidence" type="file" multiple onChange={event => setEvidenceNames(Array.from(event.target.files ?? []).map(file => file.name))} className="block w-full rounded border border-[#d6dfd5] bg-white px-3 py-2 text-xs text-[#4A4A4A] file:mr-3 file:rounded file:border-0 file:bg-[#eef4f8] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-[#355E3B]" />
                <p className="mt-1 text-xs text-[#555C56]">Optional. Attach correspondence, screenshots, receipts, or other evidence.</p>
              </div>
            </div>
          </div>

          {/* Auto-attached context */}
          <div className="bg-[#F9FAF2] border border-[#d6dfd5] rounded overflow-hidden mb-5">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#d6dfd5] bg-blue-50">
              <span className="text-blue-600"><Icon.Info /></span>
              <span className="text-xs font-semibold text-blue-800 uppercase tracking-wider">{t.autoAttached}</span>
            </div>
            <div className="p-4">
              <p className="text-xs text-[#555C56] mb-3">{t.autoNote} You do not need to enter it again.</p>
              <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-xs sm:grid-cols-2">
                {[
                  ['Business', business?.name ?? businessId],
                  ['Project', business?.subtitle ?? 'Current project'],
                  ['Application', selectedApp ? `${selectedApp.appId} — ${selectedApp.service}` : 'No application context available'],
                  ['Department', selectedApp?.dept ?? 'Select an application'],
                  ['Current stage', selectedApp?.stage ?? 'Not available'],
                  ['Timeline', selectedApp ? `Submitted ${selectedApp.submittedDate ?? 'date unavailable'} · ${selectedApp.lastUpdated ?? selectedApp.sla} · Target ${selectedApp.targetDate ?? 'not available'}` : 'Not available'],
                ].map(([label, val]) => (
                  <div key={label}>
                    <dt className="text-[#8c9f8a] font-medium">{label}</dt>
                    <dd className="text-[#4A4A4A] mt-0.5">{val}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                if (!selectedApp || !newRequestType || !newReason || !newDesc.trim()) return
                const newId = `GRV-2026-001${grievances.length + 1}`
                const created: Grievance = {
                  id: newId,
                  applicationId: selectedApp.appId,
                  service: selectedApp.service,
                  department: selectedApp.dept,
                  reason: newReason,
                  status: 'Raised',
                  description: newDesc.trim(),
                  currentDesk: selectedApp.currentDesk,
                  submissionDate: '25 Sep 2026',
                  sla: selectedApp.sla,
                  raisedDate: '25 Sep 2026',
                  assignedTo: 'Grievance Cell',
                  responses: [],
                  escalationHistory: [
                    {
                      date: '25 Sep 2026',
                      from: 'Entrepreneur',
                      to: 'Grievance Cell',
                      reason: `${newRequestType} submitted${evidenceNames.length ? ` with ${evidenceNames.length} supporting evidence file${evidenceNames.length === 1 ? '' : 's'}` : ''} (local tab demo record)`,
                    },
                  ],
                }
                setGrievances(prev => [created, ...prev])
                setLastCreatedId(newId)
                setSubmitted(true)
              }}
              className="bg-[#355E3B] text-white text-sm font-medium px-5 py-2 rounded hover:bg-[#27472c] transition-colors"
            >
              {t.submit}
            </button>
            <button onClick={() => setView('list')} className="border border-[#d6dfd5] text-[#4A4A4A] text-sm font-medium px-5 py-2 rounded hover:bg-[#F9FAF2] transition-colors">
              {t.cancel}
            </button>
          </div>
        </div>
      </main>
    )
  }

  // List view
  return (
    <main id="main-content" className="flex-1 bg-[#F9FAF2]" tabIndex={-1}>
      <div className="max-w-[960px] mx-auto px-6 py-5">
        <div className="mb-4">
          <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: t.title }]} />
        </div>
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h1 className="text-xl font-bold text-[#2B2B2B]">{t.title}</h1>
            <p className="text-sm text-[#555C56] mt-0.5" style={{ fontFamily: lang === 'mr' ? 'Noto Sans Devanagari, sans-serif' : undefined }}>
              {t.subtitle}
            </p>
          </div>
          <button onClick={() => { setNewRequestType(''); setNewReason(''); setNewDesc(''); setEvidenceNames([]); setView('new') }} className="flex items-center gap-2 bg-[#355E3B] text-white text-sm font-medium px-4 py-2 rounded hover:bg-[#27472c] transition-colors shrink-0">
            <Icon.Plus /> {t.raise}
          </button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {([
            ['Total', grievances.length.toString(), 'text-[#355E3B]'],
            ['Open', grievances.filter(g => !['Resolved'].includes(g.status)).length.toString(), 'text-amber-600'],
            ['Escalated', grievances.filter(g => g.status === 'Escalated').length.toString(), 'text-red-600'],
            ['Resolved', grievances.filter(g => g.status === 'Resolved').length.toString(), 'text-green-700'],
          ] as [string, string, string][]).map(([label, val, color]) => (
            <div key={label} className="bg-white border border-[#d6dfd5] rounded p-3">
              <p className="text-xs text-[#555C56] uppercase tracking-wider font-medium">{label}</p>
              <p className={`text-2xl font-bold mt-0.5 ${color}`}>{val}</p>
            </div>
          ))}
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {(['All', 'Raised', 'Assigned', 'Escalated', 'Response', 'Resolved', 'Reopened'] as (GrievanceStatus | 'All')[]).map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${filter === s ? 'bg-[#355E3B] border-[#355E3B] text-white' : 'bg-white border-[#d6dfd5] text-[#4A4A4A] hover:border-[#355E3B] hover:text-[#355E3B]'}`}
            >{s}</button>
          ))}
        </div>

        {/* Table */}
        <div className="border border-[#d6dfd5] rounded overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" role="grid">
              <thead>
                <tr className="bg-[#F9FAF2] border-b border-[#d6dfd5]">
                  {['Grievance ID', 'Reason', 'Application', 'Department', 'Raised', 'Status', ''].map(h => (
                    <th key={h} className="px-3 py-3 text-left text-xs font-semibold text-[#4A4A4A] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="px-3 py-8 text-center text-sm text-[#8c9f8a]">{t.noGrievances}</td></tr>
                ) : filtered.map((g, i) => (
                  <tr key={g.id} className={`border-b border-[#e3ebe1] transition-colors ${i % 2 === 0 ? 'bg-white hover:bg-[#F9FAF2]' : 'bg-[#fafbfc] hover:bg-[#F9FAF2]'}`}>
                    <td className="px-3 py-3 font-mono text-[#6DAE7C] text-xs">{g.id}</td>
                    <td className="px-3 py-3 text-[#4A4A4A]">{g.reason}</td>
                    <td className="px-3 py-3 font-mono text-xs text-[#555C56]">{g.applicationId}</td>
                    <td className="px-3 py-3 text-xs text-[#555C56] max-w-[180px] truncate">{g.department.split('—')[0].trim()}</td>
                    <td className="px-3 py-3 text-xs text-[#555C56]">{g.raisedDate}</td>
                    <td className="px-3 py-3"><GrievanceStatusBadge status={g.status} /></td>
                    <td className="px-3 py-3">
                      <button onClick={() => { setSelectedId(g.id); setView('detail') }} className="text-xs text-[#6DAE7C] hover:underline font-medium">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
