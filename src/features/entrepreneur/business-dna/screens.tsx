'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Icon } from '../public-auth/PublicChrome'
import { SAMPLE_PROJECTS } from '../businesses/catalog'
import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur'
import type { E03Data, E04Data, E05Data } from './types'
import { useRegulatoryAssistant } from '@/features/regulatory-assistant/Provider'
import { inlineContext } from '@/features/regulatory-assistant/context'

function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  const routeFor = (item: { label: string; href?: string }) => {
    if (item.label === 'Home') return '/'
    if (item.label === 'My Businesses') return ENTREPRENEUR_ROUTES.businesses()
    if (item.label === 'Create Business / Project') return ENTREPRENEUR_ROUTES.newBusiness()
    if (item.label === 'Business Discovery') return ENTREPRENEUR_ROUTES.newBusinessDiscovery()
    return item.href
  }
  return <nav aria-label="Breadcrumb"><ol className="flex items-center gap-1 text-sm text-[#6b7a8d]" role="list">{items.map((item, i) => <li key={`${item.label}-${i}`} className="flex items-center gap-1">{i > 0 && <span aria-hidden="true" className="text-[#b0bcc9]"><Icon.ChevronRight /></span>}{i === items.length - 1 ? <span className="text-[#1a2533] font-medium" aria-current="page">{item.label}</span> : routeFor(item) ? <Link href={routeFor(item)!} className="hover:text-[#1a56db] hover:underline transition-colors">{item.label}</Link> : <span>{item.label}</span>}</li>)}</ol></nav>
}

// ─── E03/E04 Shared: Step Indicator ──────────────────────────────────────────
const CREATE_STEPS = [
  { key: 'e03', label: 'Create Project' },
  { key: 'e04', label: 'Basic Requirements' },
  { key: 'e05', label: 'Adaptive Discovery' },
]

function CreateStepIndicator({ current }: { current: 'e03' | 'e04' | 'e05' }) {
  const idx = CREATE_STEPS.findIndex(s => s.key === current)
  return (
    <nav aria-label="Project creation steps" className="mb-6">
      <ol className="flex items-center" role="list">
        {CREATE_STEPS.map((step, i) => (
          <li key={step.key} className={`flex items-center ${i < CREATE_STEPS.length - 1 ? 'flex-1' : ''}`}>
            <div className="flex flex-col items-center gap-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-colors
                ${i < idx ? 'bg-[#1a3a5c] border-[#1a3a5c] text-white' : ''}
                ${i === idx ? 'bg-white border-[#1a3a5c] text-[#1a3a5c]' : ''}
                ${i > idx ? 'bg-white border-[#d1d9e0] text-[#9aa5b4]' : ''}
              `}>
                {i < idx ? <Icon.Check /> : i + 1}
              </div>
              <span className={`text-xs font-medium whitespace-nowrap ${i === idx ? 'text-[#1a3a5c]' : i < idx ? 'text-[#374151]' : 'text-[#9aa5b4]'}`}>
                {step.label}
              </span>
            </div>
            {i < CREATE_STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mb-4 ${i < idx ? 'bg-[#1a3a5c]' : 'bg-[#d1d9e0]'}`} aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// ─── E03/E04 Shared: Action Bar ───────────────────────────────────────────────
function CreateActionBar({ onBack, onSaveExit, onContinue, continueLabel = 'Continue', saved }: {
  onBack: () => void
  onSaveExit: () => void
  onContinue: () => void
  continueLabel?: string
  saved?: boolean
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6 border-t border-[#e8edf2]">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="border border-[#d1d9e0] text-[#374151] text-sm font-medium px-5 py-2.5 rounded hover:bg-[#f0f4f8] focus:ring-2 focus:ring-[#1a56db] focus:ring-offset-2 transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onSaveExit}
          className="border border-[#1a3a5c] text-[#1a3a5c] text-sm font-medium px-5 py-2.5 rounded hover:bg-[#f0f4f8] focus:ring-2 focus:ring-[#1a56db] focus:ring-offset-2 transition-colors"
        >
          Save & Exit
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-xs text-green-700">
            <Icon.CheckCircle /> Draft saved
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={onContinue}
        className="flex items-center gap-2 bg-[#1a3a5c] text-white text-sm font-medium px-6 py-2.5 rounded hover:bg-[#0f2540] focus:ring-2 focus:ring-[#1a56db] focus:ring-offset-2 transition-colors"
      >
        {continueLabel}
        <Icon.ChevronRight />
      </button>
    </div>
  )
}

// ─── E03/E04 Shared: Question Block ──────────────────────────────────────────
function QuestionBlock({ question, helper, children }: { question: string; helper?: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-semibold text-[#1a2533] mb-1">{question}</p>
      {helper && <p className="text-xs text-[#6b7a8d] mb-2.5">{helper}</p>}
      {children}
    </div>
  )
}

// ─── E03/E04 Shared: Yes/No/Not Sure radios ───────────────────────────────────
function YesNoNotSure({ name, value, onChange }: {
  name: string
  value: string
  onChange: (v: string) => void
}) {
  const opts = [
    { val: 'yes', label: 'Yes' },
    { val: 'no', label: 'No' },
    { val: 'not-sure', label: 'Not sure' },
  ]
  return (
    <div className="flex flex-wrap gap-3">
      {opts.map(o => (
        <label key={o.val} className={`flex items-center gap-2 px-4 py-2.5 rounded border cursor-pointer text-sm transition-colors
          ${value === o.val ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc] hover:bg-[#f8f9fb]'}`}>
          <input
            type="radio"
            name={name}
            value={o.val}
            checked={value === o.val}
            onChange={() => onChange(o.val)}
            className="accent-[#1a3a5c]"
          />
          {o.label}
        </label>
      ))}
    </div>
  )
}

// ─── E03/E04 Shared: Radio Card group ────────────────────────────────────────
function RadioCardGroup({ name, value, onChange, options }: {
  name: string
  value: string
  onChange: (v: string) => void
  options: { val: string; label: string; desc?: string }[]
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map(o => (
        <label key={o.val} className={`flex items-start gap-3 p-4 rounded border cursor-pointer transition-colors
          ${value === o.val ? 'border-[#1a3a5c] bg-[#ebf3ff]' : 'border-[#d1d9e0] bg-white hover:border-[#a0b4cc] hover:bg-[#f8f9fb]'}`}>
          <input
            type="radio"
            name={name}
            value={o.val}
            checked={value === o.val}
            onChange={() => onChange(o.val)}
            className="mt-0.5 accent-[#1a3a5c] shrink-0"
          />
          <div>
            <p className={`text-sm font-medium leading-snug ${value === o.val ? 'text-[#1a3a5c]' : 'text-[#1a2533]'}`}>{o.label}</p>
            {o.desc && <p className="text-xs text-[#6b7a8d] mt-0.5">{o.desc}</p>}
          </div>
        </label>
      ))}
    </div>
  )
}

// ─── E03/E04 Shared: Project Context Summary bar ─────────────────────────────
function ProjectContextSummary({ name, projectType, existingBusiness, onEdit }: {
  name: string
  projectType: string
  existingBusiness?: string
  onEdit: () => void
}) {
  const typeLabels: Record<string, string> = {
    new: 'New Business / Project',
    existing: 'Existing Business / Project',
    expansion: 'Expansion of Existing Business',
    modification: 'Modification / Diversification',
  }
  return (
    <div className="bg-[#f0f4f8] border border-[#c8d6e4] rounded p-4 mb-6 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
      <div className="space-y-0.5">
        <p className="text-xs text-[#6b7a8d] uppercase tracking-wider font-medium">Project</p>
        <p className="text-sm font-semibold text-[#1a2533]">{name || '—'}</p>
        <p className="text-xs text-[#4a5568]">{typeLabels[projectType] ?? '—'}{existingBusiness ? ` · based on ${existingBusiness}` : ''}</p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="text-xs text-[#1a56db] font-medium hover:underline focus:outline-none focus-visible:underline shrink-0"
      >
        Edit
      </button>
    </div>
  )
}

// ─── E03 — Create Business / Project ─────────────────────────────────────────
export function CreateBusinessPage({
  data,
  onChange,
  onBack,
  onSaveExit,
  onContinue,
}: {
  data: E03Data
  onChange: (d: Partial<E03Data>) => void
  onBack: () => void
  onSaveExit: () => void
  onContinue: () => void
}) {
  const [errors, setErrors] = useState<{ name?: string; projectType?: string; existingBusinessId?: string }>({})
  const [saved, setSaved] = useState(false)

  const needsExisting = data.projectType === 'expansion' || data.projectType === 'modification'

  const validate = () => {
    const e: typeof errors = {}
    if (!data.name.trim()) e.name = 'Business / Project Name is required.'
    if (!data.projectType) e.projectType = 'Please select what you are creating.'
    if (needsExisting && !data.existingBusinessId) e.existingBusinessId = 'Please select an existing business / project.'
    return e
  }

  const handleSaveExit = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    onSaveExit()
  }

  const handleContinue = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    onContinue()
  }

  const projectTypeOptions = [
    { val: 'new',          label: 'New Business / Project',       desc: 'Starting a new project or business journey.' },
    { val: 'existing',     label: 'Existing Business / Project',  desc: 'Registering or managing an already existing business.' },
    { val: 'expansion',    label: 'Expansion of Existing Business', desc: 'Increasing capacity or adding to an existing project.' },
    { val: 'modification', label: 'Modification / Diversification', desc: 'Changing activity, product, process, machinery or other project characteristics.' },
  ]

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="max-w-[800px] mx-auto px-6 py-5">
        <div className="mb-4">
          <Breadcrumb items={[
            { label: 'Home', href: '#' },
            { label: 'My Businesses', href: '#' },
            { label: 'Create Business / Project' },
          ]} />
        </div>

        <div className="mb-5 pb-4 border-b border-[#d1d9e0]">
          <h1 className="text-2xl font-bold text-[#1a3a5c]">Create Business / Project</h1>
          <p className="text-sm text-[#6b7a8d] mt-1">Start by telling us what you are creating. Detailed business information will be collected in the next steps.</p>
        </div>

        <CreateStepIndicator current="e03" />

        <div className="bg-white border border-[#d1d9e0] rounded shadow-sm">
          <div className="px-6 py-5 space-y-6">

            {/* Field 1: Name */}
            <div>
              <label className="block text-sm font-semibold text-[#1a2533] mb-1">
                Business / Project Name <span className="text-red-600" aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                value={data.name}
                onChange={e => { onChange({ name: e.target.value }); setErrors(prev => ({ ...prev, name: undefined })) }}
                placeholder="e.g. ABC Pharma Manufacturing Unit"
                className={`w-full px-3 py-2 text-sm border rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:border-[#1a56db] transition-colors placeholder:text-[#9aa5b4] ${errors.name ? 'border-red-500' : 'border-[#d1d9e0]'}`}
                aria-invalid={!!errors.name}
                aria-required="true"
              />
              <p className="mt-1 text-xs text-[#6b7a8d]">Enter a name that helps you identify this business / project.</p>
              {errors.name && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1" role="alert">
                  <Icon.AlertCircle /> {errors.name}
                </p>
              )}
            </div>

            <div className="border-t border-[#e8edf2]" />

            {/* Field 2: Project type */}
            <div>
              <p className="text-sm font-semibold text-[#1a2533] mb-1">
                What Are You Creating? <span className="text-red-600" aria-hidden="true">*</span>
              </p>
              <p className="text-xs text-[#6b7a8d] mb-3">Select the type of project you are starting.</p>
              <RadioCardGroup
                name="projectType"
                value={data.projectType}
                onChange={v => { onChange({ projectType: v as E03Data['projectType'], existingBusinessId: '' }); setErrors(prev => ({ ...prev, projectType: undefined, existingBusinessId: undefined })) }}
                options={projectTypeOptions}
              />
              {errors.projectType && (
                <p className="mt-2 text-xs text-red-600 flex items-center gap-1" role="alert">
                  <Icon.AlertCircle /> {errors.projectType}
                </p>
              )}
            </div>

            {/* Conditional: existing business selector for expansion/modification */}
            {needsExisting && (
              <div>
                <label className="block text-sm font-semibold text-[#1a2533] mb-1">
                  Select Existing Business / Project <span className="text-red-600" aria-hidden="true">*</span>
                </label>
                <p className="text-xs text-[#6b7a8d] mb-2">Select the existing business this {data.projectType === 'expansion' ? 'expansion' : 'modification'} is based on.</p>
                <select
                  value={data.existingBusinessId}
                  onChange={e => { onChange({ existingBusinessId: e.target.value }); setErrors(prev => ({ ...prev, existingBusinessId: undefined })) }}
                  className={`w-full px-3 py-2 text-sm border rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:border-[#1a56db] transition-colors ${errors.existingBusinessId ? 'border-red-500' : 'border-[#d1d9e0]'}`}
                  aria-invalid={!!errors.existingBusinessId}
                  aria-required="true"
                >
                  <option value="">Select a business / project</option>
                  {SAMPLE_PROJECTS.map(p => (
                    <option key={p.id} value={p.id}>{p.name} — {p.location}</option>
                  ))}
                </select>
                {errors.existingBusinessId && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1" role="alert">
                    <Icon.AlertCircle /> {errors.existingBusinessId}
                  </p>
                )}
              </div>
            )}

            <div className="border-t border-[#e8edf2]" />

            {/* Field 3: Description (optional) */}
            <div>
              <label className="block text-sm font-semibold text-[#1a2533] mb-1">
                Short Project Description <span className="text-xs text-[#9aa5b4] font-normal ml-1">Optional</span>
              </label>
              <textarea
                rows={3}
                value={data.description}
                onChange={e => onChange({ description: e.target.value })}
                placeholder="Briefly describe the proposed project."
                className="w-full px-3 py-2 text-sm border border-[#d1d9e0] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:border-[#1a56db] transition-colors placeholder:text-[#9aa5b4] resize-none"
              />
              <p className="mt-1 text-xs text-[#6b7a8d]">Structured details will be collected in the next steps.</p>
            </div>

            <CreateActionBar
              onBack={onBack}
              onSaveExit={handleSaveExit}
              onContinue={handleContinue}
              saved={saved}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

// ─── E04 — Basic Requirements ─────────────────────────────────────────────────
export function BasicRequirementsPage({
  e03Data,
  data,
  onChange,
  onBack,
  onSaveExit,
  onContinue,
}: {
  e03Data: E03Data
  data: E04Data
  onChange: (d: Partial<E04Data>) => void
  onBack: () => void
  onSaveExit: () => void
  onContinue: () => void
}) {
  const [saved, setSaved] = useState(false)

  const existingProject = SAMPLE_PROJECTS.find(p => p.id === e03Data.existingBusinessId)

  const handleSaveExit = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    onSaveExit()
  }

  const landStatusOptions = [
    { val: 'possessed',   label: 'Land already in possession' },
    { val: 'identified',  label: 'Land identified, possession pending' },
    { val: 'in-progress', label: 'Land acquisition / allotment in progress' },
    { val: 'required',    label: 'Land required, not yet acquired' },
    { val: 'not-sure',    label: 'Not sure' },
  ]

  const constructionOptions = [
    { val: 'new',          label: 'New construction planned' },
    { val: 'existing',     label: 'Existing premises' },
    { val: 'modification', label: 'Modification of existing premises' },
    { val: 'not-sure',     label: 'Not sure' },
  ]

  const businessNatureOptions = [
    { val: 'manufacturing', label: 'Manufacturing' },
    { val: 'processing',    label: 'Processing' },
    { val: 'services',      label: 'Services' },
    { val: 'trading',       label: 'Trading' },
    { val: 'mfg-trading',   label: 'Manufacturing + Trading' },
    { val: 'construction',  label: 'Construction / Infrastructure' },
    { val: 'other',         label: 'Other' },
    { val: 'not-sure',      label: 'Not sure' },
  ]

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="max-w-[800px] mx-auto px-6 py-5">
        <div className="mb-4">
          <Breadcrumb items={[
            { label: 'Home', href: '#' },
            { label: 'My Businesses', href: '#' },
            { label: 'Create Business / Project', href: '#' },
            { label: 'Basic Requirements' },
          ]} />
        </div>

        <div className="mb-5 pb-4 border-b border-[#d1d9e0]">
          <h1 className="text-2xl font-bold text-[#1a3a5c]">Basic Requirements</h1>
          <p className="text-sm text-[#6b7a8d] mt-1">
            Tell us only what you already know about your project. You do not need to know which licences, approvals or NOCs are required — EKATMA will determine them from your business details.
          </p>
        </div>

        <CreateStepIndicator current="e04" />

        {/* Project context from E03 */}
        <ProjectContextSummary
          name={e03Data.name}
          projectType={e03Data.projectType}
          existingBusiness={existingProject?.name}
          onEdit={onBack}
        />

        <div className="bg-white border border-[#d1d9e0] rounded shadow-sm">
          <div className="px-6 py-5 space-y-8">

            {/* ── LAND & LOCATION CONTEXT ── */}
            <section aria-labelledby="e04-land-heading">
              <h2 id="e04-land-heading" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Land &amp; Location Context</h2>
              <div className="space-y-5">

                <QuestionBlock
                  question="Do you need land for this project?"
                  helper="If you already have premises or a site, select 'No'."
                >
                  <YesNoNotSure name="needLand" value={data.needLand} onChange={v => onChange({ needLand: v as E04Data['needLand'] })} />
                </QuestionBlock>

                {data.needLand === 'yes' && (
                  <QuestionBlock question="What is your current land status?">
                    <div className="flex flex-col gap-2">
                      {landStatusOptions.map(o => (
                        <label key={o.val} className={`flex items-center gap-3 px-4 py-2.5 rounded border cursor-pointer text-sm transition-colors
                          ${data.landStatus === o.val ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                          <input
                            type="radio"
                            name="landStatus"
                            value={o.val}
                            checked={data.landStatus === o.val}
                            onChange={() => onChange({ landStatus: o.val as E04Data['landStatus'] })}
                            className="accent-[#1a3a5c]"
                          />
                          {o.label}
                        </label>
                      ))}
                    </div>
                  </QuestionBlock>
                )}

                <QuestionBlock
                  question="Is the project located in MIDC?"
                  helper="If you are unsure, select 'Not sure'. Location details will be collected later."
                >
                  <YesNoNotSure name="midc" value={data.midc} onChange={v => onChange({ midc: v as E04Data['midc'] })} />
                </QuestionBlock>

              </div>
            </section>

            <div className="border-t border-[#e8edf2]" />

            {/* ── PROJECT SETUP ── */}
            <section aria-labelledby="e04-setup-heading">
              <h2 id="e04-setup-heading" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Project Setup</h2>
              <div className="space-y-5">

                <QuestionBlock question="What is the current premises / construction situation?">
                  <div className="flex flex-col gap-2">
                    {constructionOptions.map(o => (
                      <label key={o.val} className={`flex items-center gap-3 px-4 py-2.5 rounded border cursor-pointer text-sm transition-colors
                        ${data.construction === o.val ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                        <input
                          type="radio"
                          name="construction"
                          value={o.val}
                          checked={data.construction === o.val}
                          onChange={() => onChange({ construction: o.val as E04Data['construction'] })}
                          className="accent-[#1a3a5c]"
                        />
                        {o.label}
                      </label>
                    ))}
                  </div>
                </QuestionBlock>

                <QuestionBlock question="Will the project require water?">
                  <YesNoNotSure name="water" value={data.water} onChange={v => onChange({ water: v as E04Data['water'] })} />
                </QuestionBlock>

                <QuestionBlock question="Will the project require electricity / power?">
                  <YesNoNotSure name="power" value={data.power} onChange={v => onChange({ power: v as E04Data['power'] })} />
                </QuestionBlock>

              </div>
            </section>

            <div className="border-t border-[#e8edf2]" />

            {/* ── BUSINESS ── */}
            <section aria-labelledby="e04-business-heading">
              <h2 id="e04-business-heading" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Business</h2>
              <div className="space-y-5">

                <QuestionBlock
                  question="What will this business / project primarily do?"
                  helper="Select the broad nature of this project. Specific industry and activity details will be collected in the next step."
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {businessNatureOptions.map(o => (
                      <label key={o.val} className={`flex items-center gap-2 px-3 py-2.5 rounded border cursor-pointer text-sm transition-colors
                        ${data.businessNature === o.val ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                        <input
                          type="radio"
                          name="businessNature"
                          value={o.val}
                          checked={data.businessNature === o.val}
                          onChange={() => onChange({ businessNature: o.val as E04Data['businessNature'] })}
                          className="accent-[#1a3a5c]"
                        />
                        {o.label}
                      </label>
                    ))}
                  </div>
                </QuestionBlock>

                <QuestionBlock
                  question="Does this business / project already have any approvals, licences or NOCs?"
                  helper="If yes, details will be collected in the next step."
                >
                  <YesNoNotSure name="existingApprovals" value={data.existingApprovals} onChange={v => onChange({ existingApprovals: v as E04Data['existingApprovals'] })} />
                  {data.existingApprovals === 'yes' && (
                    <p className="mt-2 text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">
                      Existing approval details will be collected in the next stage.
                    </p>
                  )}
                </QuestionBlock>

              </div>
            </section>

            <CreateActionBar
              onBack={onBack}
              onSaveExit={handleSaveExit}
              onContinue={onContinue}
              continueLabel="Continue to Adaptive Discovery"
              saved={saved}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

// ─── E05 Location Data ───────────────────────────────────────────────────────
const MH_DISTRICTS_EXTENDED = ['Thane', 'Pune', 'Mumbai City', 'Mumbai Suburban', 'Ratnagiri', 'Raigad', 'Nashik', 'Nagpur', 'Aurangabad', 'Kolhapur', 'Solapur', 'Sangli', 'Satara', 'Jalgaon', 'Ahmednagar', 'Amravati', 'Akola', 'Nanded', 'Latur', 'Osmanabad', 'Beed', 'Yavatmal', 'Wardha', 'Chandrapur', 'Gadchiroli', 'Gondia', 'Bhandara', 'Washim', 'Buldhana', 'Hingoli', 'Parbhani', 'Nandurbar', 'Dhule', 'Sindhudurg']
const MH_TALUKAS_BY_DISTRICT: Record<string, string[]> = {
  'Thane': ['Thane', 'Kalyan', 'Bhiwandi', 'Shahapur', 'Murbad', 'Ambernath', 'Ulhasnagar'],
  'Pune': ['Haveli', 'Mulshi', 'Maval', 'Junnar', 'Shirur', 'Purandar', 'Baramati', 'Indapur'],
  'Ratnagiri': ['Ratnagiri', 'Chiplun', 'Dapoli', 'Khed', 'Mandangad', 'Guhagar', 'Lanja'],
  'Nashik': ['Nashik', 'Sinnar', 'Igatpuri', 'Dindori', 'Nandgaon', 'Manmad', 'Chandwad'],
  'Nagpur': ['Nagpur', 'Kamptee', 'Hingna', 'Umred', 'Katol', 'Narkhed', 'Ramtek'],
  'Aurangabad': ['Aurangabad', 'Paithan', 'Kannad', 'Sillod', 'Vaijapur', 'Gangapur', 'Phulambri'],
  'Kolhapur': ['Kolhapur', 'Hatkanangle', 'Karvir', 'Panhala', 'Radhanagari', 'Kagal'],
  'Mumbai City': ['Fort', 'Colaba', 'Kurla', 'Dharavi'],
  'Mumbai Suburban': ['Andheri', 'Borivali', 'Malad', 'Kandivali', 'Goregaon'],
  'Solapur': ['Solapur North', 'Solapur South', 'Akkalkot', 'Barshi', 'Pandharpur'],
}

const INDUSTRIES = ['Pharmaceuticals', 'Chemicals', 'Food Processing', 'Textiles', 'Automotive / Auto Components', 'Electronics / Electrical', 'Renewable Energy', 'IT / ITES', 'Healthcare', 'Logistics / Warehousing', 'Hospitality / Tourism', 'Plastic Products', 'Rubber Products', 'Metal Fabrication', 'Engineering Goods', 'Paper / Packaging', 'Ceramic / Glass', 'Printing', 'Cattle Feed / Agro Processing', 'Fertilisers / Pesticides', 'Construction Materials', 'Other']

const ACTIVITIES_LIST = ['Manufacture', 'Assemble', 'Process', 'Store', 'Package', 'Sell', 'Import', 'Export', 'Distribute', 'Provide Services', 'Research / Development', 'Other']

const PROCESS_TYPES = ['Manufacturing', 'Chemical Processing', 'Assembly', 'Fabrication', 'Food Processing', 'Packaging', 'Laboratory / R&D', 'Other']

const PROJECT_STAGES = ['Idea / Planning', 'Land Acquisition', 'Pre-Establishment', 'Design / Planning', 'Construction', 'Installation', 'Trial Production', 'Ready to Operate', 'Already Operational']

const AUTHORISED_PERSON_ROLES = ['Director', 'Partner', 'Proprietor', 'Authorised Signatory', 'Trustee', 'Other']

const LEGAL_ENTITY_TYPES = [
  { val: 'proprietorship', label: 'Proprietorship' },
  { val: 'partnership',    label: 'Partnership' },
  { val: 'llp',            label: 'LLP' },
  { val: 'pvt-ltd',        label: 'Private Limited Company' },
  { val: 'pub-ltd',        label: 'Public Limited Company' },
  { val: 'cooperative',    label: 'Cooperative' },
  { val: 'trust-society',  label: 'Trust / Society' },
  { val: 'other',          label: 'Other' },
]

// ─── E05 Regulatory Verification Banner ──────────────────────────────────────
function RegulatoryVerificationBanner({ reason }: { reason?: string }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded">
      <span className="text-amber-600 shrink-0 mt-0.5"><Icon.Info /></span>
      <div>
        <p className="text-xs font-semibold text-amber-900">Regulatory Rule Verification Required</p>
        <p className="text-xs text-amber-800 mt-0.5">
          {reason ?? 'Applicability depends on land classification and the current regulatory rule. EKATMA will verify during regulatory journey generation.'}
        </p>
      </div>
    </div>
  )
}

// ─── E05 Section Progress ─────────────────────────────────────────────────────
const E05_SECTIONS = [
  { num: 1, label: 'Classification' },
  { num: 2, label: 'Identity' },
  { num: 3, label: 'Industry & Activity' },
  { num: 4, label: 'Products & Process' },
  { num: 5, label: 'Project Stage' },
  { num: 6, label: 'Location' },
  { num: 7, label: 'MIDC & Land' },
  { num: 8, label: 'Land Documents' },
]

const MIDC_ESTATES = ['TTC Industrial Area', 'Taloja MIDC', 'Ambernath MIDC', 'Chakan MIDC', 'Butibori MIDC', 'Ranjangaon MIDC', 'Hingna MIDC', 'Mahad MIDC', 'Satara MIDC', 'Nanded MIDC', 'Other']

const LAND_DOCUMENTS_LIST = ['Sale Deed', 'Lease Deed', 'MIDC Allotment Document', 'Possession Document', 'Land Record', 'Land-Use Permission', 'Other', 'I do not have these yet']

function E05SectionProgress({ current, completed }: { current: number; completed: Set<number> }) {
  return (
    <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-1">
      {E05_SECTIONS.map((s, i) => (
        <div key={s.num} className="flex items-center gap-1 shrink-0">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors
            ${s.num === current ? 'border-[#1a3a5c] bg-[#1a3a5c] text-white' : ''}
            ${completed.has(s.num) && s.num !== current ? 'border-green-500 bg-green-50 text-green-800' : ''}
            ${!completed.has(s.num) && s.num !== current ? 'border-[#d1d9e0] bg-white text-[#9aa5b4]' : ''}
          `}>
            {completed.has(s.num) && s.num !== current ? (
              <span className="text-green-600"><Icon.CheckCircle /></span>
            ) : (
              <span className="w-4 h-4 flex items-center justify-center text-[10px] font-bold">{s.num}</span>
            )}
            {s.label}
          </div>
          {i < E05_SECTIONS.length - 1 && (
            <div className={`w-4 h-0.5 ${completed.has(s.num) ? 'bg-green-400' : 'bg-[#d1d9e0]'}`} aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  )
}

// ─── E05 Reused Answer Block ──────────────────────────────────────────────────
function ReusedAnswerBlock({ label, value, source, onEdit }: {
  label: string; value: string; source: string; onEdit?: () => void
}) {
  return (
    <div className="flex items-start justify-between gap-3 p-3 bg-[#f0f4f8] border border-[#c8d6e4] rounded">
      <div>
        <p className="text-xs text-[#6b7a8d] uppercase tracking-wider font-medium mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-[#1a2533]">{value}</p>
        <p className="text-xs text-green-700 mt-0.5 flex items-center gap-1"><Icon.CheckCircle /> {source}</p>
      </div>
      {onEdit && (
        <button type="button" onClick={onEdit} className="text-xs text-[#1a56db] font-medium hover:underline shrink-0">Edit</button>
      )}
    </div>
  )
}

// ─── Change Detected Banner ───────────────────────────────────────────────────
function ChangeDetectedBanner({ fieldLabel, onDismiss }: { fieldLabel: string; onDismiss: () => void }) {
  return (
    <div className="flex items-start gap-2 px-3 py-2 bg-[#fffbeb] border border-[#f59e0b] rounded text-sm" role="status" aria-live="polite">
      <svg className="shrink-0 mt-0.5 text-[#d97706]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      <div className="flex-1">
        <span className="font-medium text-[#92400e]">Business profile change detected.</span>
        <span className="text-[#92400e]"> {fieldLabel} has been updated. Relevant requirements will be re-evaluated.</span>
      </div>
      <button type="button" onClick={onDismiss} className="text-[#92400e] hover:text-[#78350f] shrink-0 text-xs font-medium">Dismiss</button>
    </div>
  )
}

// ─── Active Use Warning Modal ─────────────────────────────────────────────────
function ActiveUseWarningModal({ fieldLabel, usedBy, onCancel, onConfirm }: {
  fieldLabel: string; usedBy: string[]; onCancel: () => void; onConfirm: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" role="dialog" aria-modal="true" aria-labelledby="auw-title">
      <div className="bg-white border border-[#d1d9e0] rounded-lg shadow-xl max-w-sm w-full mx-4 p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-[#fff7ed] border border-[#fed7aa] flex items-center justify-center shrink-0">
            <svg className="text-[#ea580c]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <div>
            <p id="auw-title" className="text-sm font-bold text-[#1a2533]">This information is currently in use</p>
            <p className="text-xs text-[#6b7a8d] mt-1">
              <span className="font-semibold text-[#374151]">{fieldLabel}</span> is used by:
            </p>
            <ul className="mt-1 space-y-0.5">
              {usedBy.map(u => (
                <li key={u} className="text-xs text-[#374151] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] shrink-0" />
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-xs text-[#6b7a8d] mb-4">Changing this value may affect your regulatory journey. This does not block you from proceeding.</p>
        <div className="flex gap-2 justify-end">
          <button type="button" onClick={onCancel} className="px-4 py-2 text-sm border border-[#d1d9e0] text-[#374151] rounded hover:bg-[#f0f4f8] transition-colors">Cancel</button>
          <button type="button" onClick={onConfirm} className="px-4 py-2 text-sm bg-[#1a3a5c] text-white rounded hover:bg-[#0f2540] transition-colors font-medium">Confirm Change</button>
        </div>
      </div>
    </div>
  )
}

// ─── Not Applicable Section Banner ───────────────────────────────────────────
function NotApplicableBanner({ reason }: { reason: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2.5 bg-[#f8f9fb] border border-[#d1d9e0] rounded text-sm text-[#6b7a8d]">
      <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
      <span>Not applicable — {reason}</span>
    </div>
  )
}

// ─── E05 Searchable Select ────────────────────────────────────────────────────
function SearchableSelect({ options, value, onChange, placeholder, id }: {
  options: string[]; value: string; onChange: (v: string) => void; placeholder?: string; id?: string
}) {
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const filtered = options.filter(o => !search || o.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="relative" ref={ref}>
      <div
        className={`flex items-center justify-between px-3 py-2 text-sm border rounded bg-white cursor-pointer focus-within:ring-2 focus-within:ring-[#1a56db] focus-within:border-[#1a56db] transition-colors ${open ? 'border-[#1a56db]' : 'border-[#d1d9e0]'}`}
        onClick={() => setOpen(o => !o)}
      >
        <span className={value ? 'text-[#1a2533]' : 'text-[#9aa5b4]'}>{value || placeholder || 'Select…'}</span>
        <span className={`text-[#9aa5b4] transition-transform ${open ? 'rotate-180' : ''}`}><Icon.ChevronDown /></span>
      </div>
      {open && (
        <div className="absolute left-0 top-full mt-1 w-full bg-white border border-[#d1d9e0] rounded shadow-lg z-40 max-h-60 overflow-hidden flex flex-col">
          <div className="p-2 border-b border-[#e8edf2]">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search…"
              className="w-full px-2 py-1.5 text-sm border border-[#d1d9e0] rounded focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
              onClick={e => e.stopPropagation()}
              autoFocus
            />
          </div>
          <ul className="overflow-y-auto">
            {filtered.length === 0 && <li className="px-4 py-3 text-sm text-[#9aa5b4]">No results</li>}
            {filtered.map(o => (
              <li key={o}>
                <button
                  type="button"
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${value === o ? 'bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'hover:bg-[#f8f9fb] text-[#374151]'}`}
                  onClick={() => { onChange(o); setOpen(false); setSearch('') }}
                >
                  {o}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// ─── E05 Multi-Checkbox ───────────────────────────────────────────────────────
function MultiCheckboxGroup({ name, options, selected, onChange }: {
  name: string; options: string[]; selected: string[]; onChange: (v: string[]) => void
}) {
  const toggle = (val: string) => {
    onChange(selected.includes(val) ? selected.filter(s => s !== val) : [...selected, val])
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {options.map(o => (
        <label key={o} className={`flex items-center gap-2 px-3 py-2.5 rounded border cursor-pointer text-sm transition-colors
          ${selected.includes(o) ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
          <input
            type="checkbox"
            name={name}
            value={o}
            checked={selected.includes(o)}
            onChange={() => toggle(o)}
            className="accent-[#1a3a5c] shrink-0"
          />
          {o}
        </label>
      ))}
    </div>
  )
}

// ─── E05 Dynamic Product List ─────────────────────────────────────────────────
function ProductList({ products, onChange }: {
  products: E05Data['products']
  onChange: (v: E05Data['products']) => void
}) {
  const add = () => onChange([...products, { id: `p-${Date.now()}`, name: '', description: '' }])
  const remove = (id: string) => onChange(products.filter(p => p.id !== id))
  const update = (id: string, field: 'name' | 'description', val: string) =>
    onChange(products.map(p => p.id === id ? { ...p, [field]: val } : p))

  return (
    <div className="space-y-3">
      {products.map((p, i) => (
        <div key={p.id} className="border border-[#d1d9e0] rounded p-3 bg-[#fafbfc] space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-[#6b7a8d] uppercase tracking-wider">Product / Service {i + 1}</p>
            {products.length > 1 && (
              <button type="button" onClick={() => remove(p.id)} className="text-[#9aa5b4] hover:text-red-500 transition-colors" aria-label="Remove">
                <Icon.X />
              </button>
            )}
          </div>
          <SearchableSelect
            options={['Pharmaceutical Formulations', 'API / Bulk Drug', 'Medical Products', 'Packaging Services', 'Processed Food Product', 'Software / Technology Services', 'Electronic Components', 'Auto Parts', 'Chemical Products', 'Textile Products', 'Agro Products', 'Engineering Goods', 'Other']}
            value={p.name}
            onChange={v => update(p.id, 'name', v)}
            placeholder="Search or select product / service…"
          />
          {p.name === 'Other' && (
            <input
              type="text"
              value={p.description}
              onChange={e => update(p.id, 'description', e.target.value)}
              placeholder="Describe product / service"
              className="w-full px-3 py-2 text-sm border border-[#d1d9e0] rounded focus:outline-none focus:ring-2 focus:ring-[#1a56db] placeholder:text-[#9aa5b4]"
            />
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="flex items-center gap-2 text-sm text-[#1a56db] font-medium hover:underline focus:outline-none"
      >
        <Icon.Plus /> Add Product / Service
      </button>
    </div>
  )
}

// ─── E05 Adaptive Questionnaire ───────────────────────────────────────────────
export function E05AdaptiveQuestionnairePage({
  e03Data,
  e04Data,
  setE04Data,
  data,
  onChange,
  onBack,
  onSaveExit,
  onContinue,
  expansionChangeAreas,
  onExpansionChangeAreas,
}: {
  e03Data: E03Data
  e04Data: E04Data
  setE04Data: (d: Partial<E04Data>) => void
  data: E05Data
  onChange: (d: Partial<E05Data>) => void
  onBack: () => void
  onSaveExit: () => void
  onContinue: () => void
  expansionChangeAreas: string[]
  onExpansionChangeAreas: (areas: string[]) => void
}) {
  const isExpansionOrMod = e03Data.projectType === 'expansion' || e03Data.projectType === 'modification'
  // For expansion/modification: show 'change gate' first (section 0)
  const [showChangeGate, setShowChangeGate] = useState(isExpansionOrMod && expansionChangeAreas.length === 0)
  const [changeGateErrors, setChangeGateErrors] = useState('')
  const [section, setSection] = useState(1)
  const [completed, setCompleted] = useState<Set<number>>(new Set())
  const [saved, setSaved] = useState(false)
  const [sectionErrors, setSectionErrors] = useState<Record<string, string>>({})
  const [editingNature, setEditingNature] = useState(false)
  const [changeDetected, setChangeDetected] = useState<string | null>(null)

  const existingProject = SAMPLE_PROJECTS.find(p => p.id === e03Data.existingBusinessId)

  const natureLabels: Record<string, string> = {
    manufacturing: 'Manufacturing', processing: 'Processing', services: 'Services',
    trading: 'Trading', 'mfg-trading': 'Manufacturing + Trading',
    construction: 'Construction / Infrastructure', other: 'Other', 'not-sure': 'Not sure',
  }

  const showProcess = data.activities.some(a =>
    ['Manufacture', 'Assemble', 'Process', 'Package', 'Research / Development'].includes(a)
  ) || ['manufacturing', 'processing', 'mfg-trading'].includes(e04Data.businessNature)

  const legalIdFields = () => {
    if (data.legalEntityType === 'pvt-ltd' || data.legalEntityType === 'pub-ltd') return ['PAN', 'CIN']
    if (data.legalEntityType === 'llp') return ['PAN', 'LLPIN']
    if (data.legalEntityType === 'partnership' || data.legalEntityType === 'proprietorship') return ['PAN']
    if (data.legalEntityType === 'cooperative') return ['Registration Number']
    return ['PAN', 'Registration Number']
  }

  const goToSection = (n: number) => {
    setCompleted(prev => new Set([...prev, section]))
    setSectionErrors({})
    setSection(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBack = () => {
    if (section === 1) onBack()
    else { setSection(s => s - 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  }

  const handleSaveExit = () => {
    setSaved(true); setTimeout(() => setSaved(false), 3000); onSaveExit()
  }

  const handleContinue = () => {
    const errs: Record<string, string> = {}
    if (section === 1 && !data.classification) errs.classification = 'Please select a project classification.'
    if (section === 2 && !data.legalEntityType) errs.legalEntityType = 'Please select a legal entity type.'
    if (section === 3 && !data.industry) errs.industry = 'Please select an industry / sector.'
    if (Object.keys(errs).length) { setSectionErrors(errs); return }

    if (section < 8) goToSection(section + 1)
    else {
      setCompleted(prev => new Set([...prev, 8]))
      onContinue()
    }
  }

  const inputCls = (err?: string) =>
    `w-full px-3 py-2 text-sm border rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:border-[#1a56db] transition-colors placeholder:text-[#9aa5b4] ${err ? 'border-red-500' : 'border-[#d1d9e0]'}`

  // ── Change gate for expansion/modification ──────────────────────────────────
  if (showChangeGate) {
    return (
      <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
        <div className="max-w-[820px] mx-auto px-6 py-5">
          <div className="mb-4">
            <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'My Businesses', href: '#' }, { label: 'Create Business / Project', href: '#' }, { label: 'Business Discovery' }]} />
          </div>
          <div className="mb-4 pb-4 border-b border-[#d1d9e0]">
            <h1 className="text-2xl font-bold text-[#1a3a5c]">Business Discovery</h1>
            <p className="text-sm text-[#6b7a8d] mt-1">
              {e03Data.projectType === 'expansion' ? 'Expansion of Existing Business' : 'Modification / Diversification'} — EKATMA will load your existing Business DNA and ask only about the areas you are changing.
            </p>
          </div>
          <ProjectContextSummary name={e03Data.name} projectType={e03Data.projectType} existingBusiness={existingProject?.name} onEdit={onBack} />
          <div className="bg-white border border-[#d1d9e0] rounded shadow-sm mt-4">
            <div className="px-6 py-5 space-y-5">
              <div>
                <h2 className="text-base font-bold text-[#1a2533] mb-1">What are you changing in this project?</h2>
                <p className="text-sm text-[#6b7a8d] mb-4">Select all that apply. EKATMA will show only the relevant change areas in detail.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {EXPANSION_CHANGE_OPTIONS.map(opt => {
                    const checked = expansionChangeAreas.includes(opt.val)
                    return (
                      <label key={opt.val} className={`flex items-center gap-3 px-3 py-2.5 border rounded cursor-pointer transition-colors ${checked ? 'border-[#1a3a5c] bg-[#ebf3ff]' : 'border-[#d1d9e0] hover:border-[#a0b4cc]'}`}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            const next = checked ? expansionChangeAreas.filter(a => a !== opt.val) : [...expansionChangeAreas, opt.val]
                            onExpansionChangeAreas(next)
                          }}
                          className="accent-[#1a3a5c]"
                        />
                        <span className={`text-sm ${checked ? 'font-medium text-[#1a3a5c]' : 'text-[#374151]'}`}>{opt.label}</span>
                      </label>
                    )
                  })}
                </div>
                {changeGateErrors && <p className="text-xs text-red-600 mt-2">{changeGateErrors}</p>}
              </div>
              {/* Show existing business DNA context if available */}
              {existingProject && (
                <div className="px-4 py-3 bg-[#f0f4f8] border border-[#c8d6e4] rounded">
                  <p className="text-xs text-[#6b7a8d] uppercase tracking-wider font-semibold mb-1">Existing Business DNA</p>
                  <p className="text-sm font-semibold text-[#1a2533]">{existingProject.name}</p>
                  <p className="text-xs text-[#6b7a8d] mt-0.5">{existingProject.industry} · {existingProject.location}</p>
                  <p className="text-xs text-green-700 mt-1 flex items-center gap-1"><Icon.CheckCircle /> Current profile will be pre-loaded. Only selected change areas will be asked.</p>
                </div>
              )}
              <div className="flex gap-3 pt-2 border-t border-[#e8edf2]">
                <button type="button" onClick={onBack} className="border border-[#d1d9e0] text-[#374151] text-sm font-medium px-5 py-2.5 rounded hover:bg-[#f0f4f8] transition-colors">Back</button>
                <button
                  type="button"
                  onClick={() => {
                    if (expansionChangeAreas.length === 0) { setChangeGateErrors('Please select at least one area you are changing.'); return }
                    setChangeGateErrors('')
                    setShowChangeGate(false)
                  }}
                  className="bg-[#1a3a5c] text-white text-sm font-semibold px-6 py-2.5 rounded hover:bg-[#0f2540] transition-colors"
                >
                  Continue to Business Discovery →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="max-w-[820px] mx-auto px-6 py-5">
        {/* Breadcrumb */}
        <div className="mb-4">
          <Breadcrumb items={[
            { label: 'Home', href: '#' },
            { label: 'My Businesses', href: '#' },
            { label: 'Create Business / Project', href: '#' },
            { label: 'Business Discovery' },
          ]} />
        </div>

        {/* Page header */}
        <div className="mb-4 pb-4 border-b border-[#d1d9e0]">
          <h1 className="text-2xl font-bold text-[#1a3a5c]">Business Discovery</h1>
          <p className="text-sm text-[#6b7a8d] mt-1">
            {isExpansionOrMod
              ? `${e03Data.projectType === 'expansion' ? 'Expansion' : 'Modification'} — showing only areas selected for change.`
              : 'Tell us about your business and project. EKATMA will ask only the questions relevant to your situation.'}
          </p>
        </div>

        {/* Project context strip */}
        <ProjectContextSummary
          name={e03Data.name}
          projectType={e03Data.projectType}
          existingBusiness={existingProject?.name}
          onEdit={onBack}
        />

        {/* Change detection banner */}
        {changeDetected && (
          <div className="mt-3">
            <ChangeDetectedBanner fieldLabel={changeDetected} onDismiss={() => setChangeDetected(null)} />
          </div>
        )}

        {/* Expansion change areas summary chip */}
        {isExpansionOrMod && expansionChangeAreas.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#6b7a8d] font-medium">Changing:</span>
            {expansionChangeAreas.map(a => {
              const opt = EXPANSION_CHANGE_OPTIONS.find(o => o.val === a)
              return <span key={a} className="text-xs bg-[#ebf3ff] border border-[#b8d0f5] text-[#1a3a5c] font-medium px-2 py-0.5 rounded-full">{opt?.label ?? a}</span>
            })}
            <button type="button" onClick={() => setShowChangeGate(true)} className="text-xs text-[#1a56db] hover:underline">Edit</button>
          </div>
        )}

        {/* Section progress */}
        <p className="text-xs text-[#6b7a8d] font-medium mb-2 mt-4">Business Discovery · Section {section} of 6</p>
        <E05SectionProgress current={section} completed={completed} />

        <div className="bg-white border border-[#d1d9e0] rounded shadow-sm">
          <div className="px-6 py-5 space-y-6">

            {/* ══════════════════════════════════ SECTION 1 ══════════════════════════════════ */}
            {section === 1 && (
              <section aria-labelledby="s1-heading">
                <h2 id="s1-heading" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Project Classification</h2>
                <div className="space-y-5">
                  <QuestionBlock
                    question="Do you know your project classification?"
                    helper="This is typically based on investment, employment, and sector. EKATMA can help determine it later if you are not sure."
                  >
                    <RadioCardGroup
                      name="classification"
                      value={data.classification}
                      onChange={v => { onChange({ classification: v as E05Data['classification'] }); setSectionErrors(e => ({ ...e, classification: '' })) }}
                      options={[
                        { val: 'msme',     label: 'MSME',     desc: 'Micro, Small or Medium Enterprise.' },
                        { val: 'large',    label: 'Large',    desc: 'Large scale industrial project.' },
                        { val: 'mega',     label: 'Mega',     desc: 'Large strategic industrial / infrastructure project.' },
                        { val: 'not-sure', label: 'I am not sure', desc: 'EKATMA will help determine classification from project details.' },
                      ]}
                    />
                    {sectionErrors.classification && (
                      <p className="mt-2 text-xs text-red-600 flex items-center gap-1"><Icon.AlertCircle /> {sectionErrors.classification}</p>
                    )}
                    {data.classification === 'not-sure' && (
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
                        That is okay. EKATMA can use project information such as investment, sector and employment collected later to help determine the applicable classification.
                      </div>
                    )}
                  </QuestionBlock>

                  {!!data.classification && (
                    <QuestionBlock question="Is this project being considered as a Mega-project?">
                      <YesNoNotSure name="megaProject" value={data.megaProject} onChange={v => onChange({ megaProject: v as E05Data['megaProject'] })} />
                      {(data.megaProject === 'yes' || data.megaProject === 'not-sure') && (
                        <p className="mt-2 text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">
                          Additional classification information may be required later.
                        </p>
                      )}
                    </QuestionBlock>
                  )}
                </div>
              </section>
            )}

            {/* ══════════════════════════════════ SECTION 2 ══════════════════════════════════ */}
            {section === 2 && (
              <section aria-labelledby="s2-heading">
                <h2 id="s2-heading" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Business Identity</h2>
                <div className="space-y-5">
                  {/* Business name — reused from E03 */}
                  <ReusedAnswerBlock
                    label="Business / Project Name"
                    value={e03Data.name || '—'}
                    source="Captured from Create Project"
                    onEdit={onBack}
                  />

                  {/* Legal entity type */}
                  <div>
                    <p className="text-sm font-semibold text-[#1a2533] mb-1">
                      Legal Entity Type <span className="text-red-600" aria-hidden="true">*</span>
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {LEGAL_ENTITY_TYPES.map(o => (
                        <label key={o.val} className={`flex items-center gap-2 px-3 py-2.5 rounded border cursor-pointer text-sm transition-colors
                          ${data.legalEntityType === o.val ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                          <input
                            type="radio" name="legalEntityType" value={o.val}
                            checked={data.legalEntityType === o.val}
                            onChange={() => { onChange({ legalEntityType: o.val }); setSectionErrors(e => ({ ...e, legalEntityType: '' })) }}
                            className="accent-[#1a3a5c]"
                          />
                          {o.label}
                        </label>
                      ))}
                    </div>
                    {sectionErrors.legalEntityType && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><Icon.AlertCircle /> {sectionErrors.legalEntityType}</p>
                    )}
                    {data.legalEntityType === 'other' && (
                      <input
                        type="text" value={data.legalEntityTypeOther}
                        onChange={e => onChange({ legalEntityTypeOther: e.target.value })}
                        placeholder="Specify entity type"
                        className={`${inputCls()} mt-2`}
                      />
                    )}
                  </div>

                  {/* Legal entity / organisation name */}
                  <div>
                    <label className="block text-sm font-semibold text-[#1a2533] mb-1">Legal Entity / Organisation Name</label>
                    <input
                      type="text" value={data.legalEntityName}
                      onChange={e => onChange({ legalEntityName: e.target.value })}
                      placeholder="Enter registered entity name"
                      className={inputCls()}
                    />
                    <p className="mt-1 text-xs text-[#6b7a8d]">Enter the full legal registered name as it appears in official documents.</p>
                  </div>

                  {/* Legal identifiers — conditional on entity type */}
                  {data.legalEntityType && data.legalEntityType !== '' && (
                    <div>
                      <p className="text-sm font-semibold text-[#1a2533] mb-2">Legal Identifiers</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {legalIdFields().includes('PAN') && (
                          <div>
                            <label className="block text-xs font-medium text-[#374151] mb-1">PAN</label>
                            <input type="text" value={data.pan} onChange={e => onChange({ pan: e.target.value.toUpperCase().slice(0, 10) })}
                              placeholder="e.g. AAAAA0000A" maxLength={10} className={inputCls()} />
                          </div>
                        )}
                        {legalIdFields().includes('CIN') && (
                          <div>
                            <label className="block text-xs font-medium text-[#374151] mb-1">CIN</label>
                            <input type="text" value={data.cin} onChange={e => onChange({ cin: e.target.value.toUpperCase() })}
                              placeholder="Company Identification Number" className={inputCls()} />
                          </div>
                        )}
                        {legalIdFields().includes('LLPIN') && (
                          <div>
                            <label className="block text-xs font-medium text-[#374151] mb-1">LLPIN</label>
                            <input type="text" value={data.llpin} onChange={e => onChange({ llpin: e.target.value.toUpperCase() })}
                              placeholder="LLP Identification Number" className={inputCls()} />
                          </div>
                        )}
                        {legalIdFields().includes('Registration Number') && (
                          <div>
                            <label className="block text-xs font-medium text-[#374151] mb-1">Registration Number</label>
                            <input type="text" value={data.registrationNumber} onChange={e => onChange({ registrationNumber: e.target.value })}
                              placeholder="Registration / Certificate Number" className={inputCls()} />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Authorised person role */}
                  <div>
                    <label className="block text-sm font-semibold text-[#1a2533] mb-1">Authorised Person / Promoter Role</label>
                    <select
                      value={data.authorisedPersonRole}
                      onChange={e => onChange({ authorisedPersonRole: e.target.value })}
                      className={inputCls()}
                    >
                      <option value="">Select role</option>
                      {AUTHORISED_PERSON_ROLES.map(r => <option key={r}>{r}</option>)}
                    </select>
                  </div>

                  {/* Project operated by same entity */}
                  <QuestionBlock question="Is this project operated by the registered entity?">
                    <div className="flex flex-wrap gap-3">
                      {[{ val: 'yes', label: 'Yes' }, { val: 'no', label: 'No' }].map(o => (
                        <label key={o.val} className={`flex items-center gap-2 px-4 py-2.5 rounded border cursor-pointer text-sm transition-colors
                          ${data.projectOperatedBySameEntity === o.val ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                          <input
                            type="radio" name="projectOperatedBySameEntity" value={o.val}
                            checked={data.projectOperatedBySameEntity === o.val}
                            onChange={() => onChange({ projectOperatedBySameEntity: o.val as 'yes' | 'no' })}
                            className="accent-[#1a3a5c]"
                          />
                          {o.label}
                        </label>
                      ))}
                    </div>
                    {data.projectOperatedBySameEntity === 'no' && (
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-[#374151] mb-1">Operator / Project Entity</label>
                          <input type="text" value={data.operatorName} onChange={e => onChange({ operatorName: e.target.value })}
                            placeholder="Enter operator name" className={inputCls()} />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#374151] mb-1">Relationship to Registered Entity</label>
                          <input type="text" value={data.operatorRelationship} onChange={e => onChange({ operatorRelationship: e.target.value })}
                            placeholder="e.g. Subsidiary, Joint Venture" className={inputCls()} />
                        </div>
                      </div>
                    )}
                  </QuestionBlock>
                </div>
              </section>
            )}

            {/* ══════════════════════════════════ SECTION 3 ══════════════════════════════════ */}
            {section === 3 && (
              <section aria-labelledby="s3-heading">
                <h2 id="s3-heading" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Industry &amp; Activity</h2>
                <div className="space-y-5">
                  {/* Primary business nature — reuse from E04 if answered and not Not Sure */}
                  {e04Data.businessNature && e04Data.businessNature !== 'not-sure' && !editingNature ? (
                    <ReusedAnswerBlock
                      label="Primary Business Nature"
                      value={natureLabels[e04Data.businessNature] ?? e04Data.businessNature}
                      source="Answered earlier in Basic Requirements"
                      onEdit={() => setEditingNature(true)}
                    />
                  ) : (
                    <div>
                      <p className="text-sm font-semibold text-[#1a2533] mb-1">What will this business / project primarily do?</p>
                      {editingNature && <p className="text-xs text-amber-700 mb-2">You are editing a previously saved answer.</p>}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { val: 'manufacturing', label: 'Manufacturing' },
                          { val: 'processing',    label: 'Processing' },
                          { val: 'services',      label: 'Services' },
                          { val: 'trading',       label: 'Trading' },
                          { val: 'mfg-trading',   label: 'Manufacturing + Trading' },
                          { val: 'construction',  label: 'Construction / Infrastructure' },
                          { val: 'other',         label: 'Other' },
                          { val: 'not-sure',      label: 'Not sure' },
                        ].map(o => (
                          <label key={o.val} className={`flex items-center gap-2 px-3 py-2.5 rounded border cursor-pointer text-sm transition-colors
                            ${e04Data.businessNature === o.val ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                            <input
                              type="radio" name="e05Nature" value={o.val}
                              checked={e04Data.businessNature === o.val}
                              onChange={() => { setE04Data({ businessNature: o.val as E04Data['businessNature'] }); setEditingNature(false) }}
                              className="accent-[#1a3a5c]"
                            />
                            {o.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Industry / sector */}
                  <div>
                    <p className="text-sm font-semibold text-[#1a2533] mb-1">
                      Select Your Industry / Sector <span className="text-red-600" aria-hidden="true">*</span>
                    </p>
                    <SearchableSelect
                      options={INDUSTRIES}
                      value={data.industry}
                      onChange={v => { onChange({ industry: v }); setSectionErrors(e => ({ ...e, industry: '' })) }}
                      placeholder="Search industry…"
                    />
                    {sectionErrors.industry && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><Icon.AlertCircle /> {sectionErrors.industry}</p>
                    )}
                    {data.industry && (
                      <p className="mt-2 text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">
                        Additional sector-specific information may be requested in a later stage.
                      </p>
                    )}
                  </div>

                  {/* Activities */}
                  <div>
                    <p className="text-sm font-semibold text-[#1a2533] mb-1">What Activities will you Perform?</p>
                    <p className="text-xs text-[#6b7a8d] mb-2">Select all that apply.</p>
                    <MultiCheckboxGroup
                      name="activities"
                      options={ACTIVITIES_LIST}
                      selected={data.activities}
                      onChange={v => onChange({ activities: v })}
                    />
                    {data.activities.includes('Other') && (
                      <input
                        type="text" value={data.activityOther}
                        onChange={e => onChange({ activityOther: e.target.value })}
                        placeholder="Describe activity"
                        className={`${inputCls()} mt-2`}
                      />
                    )}
                    {data.activities.length > 0 && (
                      <div className="mt-2 text-xs text-[#6b7a8d]">
                        {showProcess && <span className="text-blue-700">Process section will be shown based on selected activities.</span>}
                        {!showProcess && data.activities.length > 0 && <span>Manufacturing process details are not required for the selected activities.</span>}
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* ══════════════════════════════════ SECTION 4 ══════════════════════════════════ */}
            {section === 4 && (
              <section aria-labelledby="s4-heading">
                <h2 id="s4-heading" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Products / Services &amp; Process</h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold text-[#1a2533] mb-1">What will you produce or provide?</p>
                    <p className="text-xs text-[#6b7a8d] mb-3">Add one or more products or services.</p>
                    <ProductList
                      products={data.products.length > 0 ? data.products : [{ id: 'p-init', name: '', description: '' }]}
                      onChange={v => onChange({ products: v })}
                    />
                  </div>

                  {/* Process — only shown when relevant */}
                  {showProcess ? (
                    <>
                      <div className="border-t border-[#e8edf2]" />
                      <div>
                        <p className="text-sm font-semibold text-[#1a2533] mb-1">What type of process will you perform?</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {PROCESS_TYPES.map(o => (
                            <label key={o} className={`flex items-center gap-2 px-3 py-2.5 rounded border cursor-pointer text-sm transition-colors
                              ${data.processType === o ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                              <input type="radio" name="processType" value={o} checked={data.processType === o}
                                onChange={() => onChange({ processType: o })} className="accent-[#1a3a5c]" />
                              {o}
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#1a2533] mb-1">Brief Process Description <span className="text-xs font-normal text-[#9aa5b4]">Optional</span></label>
                        <textarea
                          rows={3}
                          value={data.processDescription}
                          onChange={e => onChange({ processDescription: e.target.value })}
                          placeholder="Briefly describe the main steps involved in your process."
                          className="w-full px-3 py-2 text-sm border border-[#d1d9e0] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#1a56db] transition-colors placeholder:text-[#9aa5b4] resize-none"
                        />
                        <p className="mt-1 text-xs text-[#6b7a8d]">This description provides supplementary context. Structured regulatory applicability is based on Business DNA inputs.</p>
                      </div>
                    </>
                  ) : (
                    <div className="p-3 bg-[#f8f9fb] border border-[#d1d9e0] rounded text-xs text-[#6b7a8d]">
                      Manufacturing process details are not required based on your selected activities.
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* ══════════════════════════════════ SECTION 5 ══════════════════════════════════ */}
            {section === 5 && (
              <section aria-labelledby="s5-heading">
                <h2 id="s5-heading" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Project Stage</h2>
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-[#1a2533] mb-2">What stage is the project currently in?</p>
                  <div className="flex flex-col gap-2">
                    {PROJECT_STAGES.map(s => (
                      <label key={s} className={`flex items-center gap-3 px-4 py-3 rounded border cursor-pointer text-sm transition-colors
                        ${data.projectStage === s ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                        <input
                          type="radio" name="projectStage" value={s}
                          checked={data.projectStage === s}
                          onChange={() => onChange({ projectStage: s })}
                          className="accent-[#1a3a5c]"
                        />
                        {s}
                      </label>
                    ))}
                  </div>
                  {existingProject && (e03Data.projectType === 'expansion' || e03Data.projectType === 'modification') && (
                    <div className="p-3 bg-[#f0f4f8] border border-[#c8d6e4] rounded text-xs text-[#4a5568]">
                      <p className="font-medium">Based on: {existingProject.name}</p>
                      <p className="mt-0.5">Current stage of existing project: <span className="font-semibold">{existingProject.stage}</span></p>
                      <p className="mt-0.5 text-[#6b7a8d]">The stage above reflects the proposed expansion / modification stage.</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* ══════════════════════════════════ SECTION 6 ══════════════════════════════════ */}
            {section === 6 && (
              <section aria-labelledby="s6-heading">
                <h2 id="s6-heading" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Project Location</h2>
                <p className="text-xs text-[#6b7a8d] mb-4">Enter the location of the industrial / business project. This is the project site location, not an account or correspondence address.</p>
                <div className="space-y-4">
                  {/* MIDC answer from E04 — not re-asked */}
                  {e04Data.midc && (
                    <ReusedAnswerBlock
                      label="MIDC / Non-MIDC"
                      value={e04Data.midc === 'yes' ? 'Located in MIDC' : e04Data.midc === 'no' ? 'Not located in MIDC' : 'Not sure — to be confirmed'}
                      source="Answered earlier in Basic Requirements"
                    />
                  )}

                  {/* State fixed */}
                  <div>
                    <label className="block text-sm font-semibold text-[#1a2533] mb-1">State</label>
                    <input
                      type="text" value="Maharashtra" readOnly
                      className="w-full px-3 py-2 text-sm border border-[#d1d9e0] rounded bg-[#f8f9fb] text-[#6b7a8d] cursor-not-allowed"
                      aria-readonly="true"
                    />
                    <p className="mt-1 text-xs text-[#9aa5b4]">This portal serves industrial projects in Maharashtra.</p>
                  </div>

                  {/* District */}
                  <div>
                    <label className="block text-sm font-semibold text-[#1a2533] mb-1">District <span className="text-red-600">*</span></label>
                    <SearchableSelect
                      options={MH_DISTRICTS_EXTENDED}
                      value={data.district}
                      onChange={v => onChange({ district: v, taluka: '', village: '' })}
                      placeholder="Search district…"
                    />
                  </div>

                  {/* Taluka — dependent on district */}
                  {data.district && (
                    <div>
                      <label className="block text-sm font-semibold text-[#1a2533] mb-1">Taluka</label>
                      <SearchableSelect
                        options={MH_TALUKAS_BY_DISTRICT[data.district] ?? ['(Talukas will be available in production)']}
                        value={data.taluka}
                        onChange={v => onChange({ taluka: v, village: '' })}
                        placeholder="Search taluka…"
                      />
                    </div>
                  )}

                  {/* Village / City */}
                  {data.taluka && (
                    <div>
                      <label className="block text-sm font-semibold text-[#1a2533] mb-1">Village / City</label>
                      <input
                        type="text" value={data.village}
                        onChange={e => onChange({ village: e.target.value })}
                        placeholder="Enter village or city name"
                        className={inputCls()}
                      />
                    </div>
                  )}

                  {/* PIN */}
                  <div>
                    <label className="block text-sm font-semibold text-[#1a2533] mb-1">PIN Code</label>
                    <input
                      type="text" inputMode="numeric" maxLength={6}
                      value={data.pincode}
                      onChange={e => onChange({ pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                      placeholder="6-digit PIN code"
                      className={inputCls()}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* ══════════════════════════════════ SECTION 7 ══════════════════════════════════ */}
            {section === 7 && (() => {
              const midcStatus = e04Data.midc
              const landStatus = e04Data.landStatus
              const needLand = e04Data.needLand
              const mlidcLabels: Record<string, string> = { yes: 'Yes — Located in MIDC', no: 'No — Not in MIDC', 'not-sure': 'Not sure — Needs Verification' }
              const landStatusLabels: Record<string, string> = { possessed: 'Land already in possession', identified: 'Land identified — possession pending', 'in-progress': 'Land acquisition / allotment in progress', required: 'Land required — not yet acquired', 'not-sure': 'Not sure' }
              const showMidc = midcStatus === 'yes'
              const midcUnknown = midcStatus === 'not-sure' || !midcStatus
              const possessionReceived = landStatus === 'possessed'
              const noLand = needLand === 'no'
              const landNotAcquired = landStatus === 'required' || (!landStatus && needLand === 'yes')
              const inProgress = landStatus === 'in-progress'
              const landTypeIsMidc = data.landType === 'midc-industrial'
              const landTypeMismatch = (midcStatus === 'no' && landTypeIsMidc) || (midcStatus === 'yes' && data.landType === 'private-na')

              return (
                <section aria-labelledby="s7-heading">
                  <h2 id="s7-heading" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">MIDC &amp; Land</h2>
                  <div className="space-y-6">

                    {/* ── MIDC status from E04 ── */}
                    <div>
                      <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-2">Land Location Context</p>
                      {midcStatus && midcStatus !== 'not-sure' ? (
                        <ReusedAnswerBlock
                          label="MIDC / Non-MIDC"
                          value={mlidcLabels[midcStatus] ?? midcStatus}
                          source="Basic Requirements"
                        />
                      ) : (
                        <div>
                          <p className="text-sm font-semibold text-[#1a2533] mb-1">Is the project located in MIDC?</p>
                          <YesNoNotSure name="midcEdit" value={e04Data.midc} onChange={v => setE04Data({ midc: v as E04Data['midc'] })} />
                          {midcUnknown && (
                            <p className="mt-2 text-xs text-[#6b7a8d]">EKATMA will use project location and land information to help determine the applicable route.</p>
                          )}
                        </div>
                      )}
                      {midcStatus === 'not-sure' && (
                        <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
                          MIDC Status: Needs Verification — EKATMA will use location information to help determine the applicable route.
                        </div>
                      )}
                    </div>

                    {/* ── MIDC details — only when MIDC = YES ── */}
                    {showMidc && (
                      <div className="border border-[#c8d6e4] rounded p-4 space-y-4 bg-[#f8fbff]">
                        <p className="text-sm font-semibold text-[#1a3a5c]">MIDC Details</p>
                        <p className="text-xs text-[#6b7a8d]">Provide the available MIDC land / plot information.</p>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-medium text-[#374151] mb-1">MIDC Estate</label>
                            <SearchableSelect options={MIDC_ESTATES} value={data.midcEstate} onChange={v => onChange({ midcEstate: v })} placeholder="Search MIDC estate…" />
                            <p className="mt-1 text-xs text-[#9aa5b4]">Sample values only — complete list connected in production.</p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-[#374151] mb-1">Plot Number</label>
                              <input type="text" value={data.midcPlotNumber} onChange={e => onChange({ midcPlotNumber: e.target.value })}
                                placeholder="e.g. A-42" className={inputCls()} />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-[#374151] mb-1">Plot Area (sq.m)</label>
                              <input type="text" inputMode="numeric" value={data.midcPlotArea} onChange={e => onChange({ midcPlotArea: e.target.value.replace(/[^0-9.]/g, '') })}
                                placeholder="e.g. 4800" className={inputCls()} />
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-[#374151] mb-2">Allotment Status</p>
                            <div className="flex flex-col gap-2">
                              {['Not applied', 'Applied', 'Allotted', 'Possession received', 'Already registered'].map(o => (
                                <label key={o} className={`flex items-center gap-3 px-4 py-2.5 rounded border cursor-pointer text-sm transition-colors
                                  ${data.midcAllotmentStatus === o ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                                  <input type="radio" name="midcAllotmentStatus" value={o} checked={data.midcAllotmentStatus === o} onChange={() => onChange({ midcAllotmentStatus: o })} className="accent-[#1a3a5c]" />
                                  {o}
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── MIDC = NO — not applicable note ── */}
                    {midcStatus === 'no' && (
                      <p className="text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">
                        MIDC details are not applicable for this project. Continuing with private / non-MIDC land discovery.
                      </p>
                    )}

                    <div className="border-t border-[#e8edf2]" />

                    {/* ── Land possession — reuse from E04 ── */}
                    <div>
                      <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-2">Land Status</p>
                      {noLand ? (
                        <div className="p-3 bg-[#f8f9fb] border border-[#d1d9e0] rounded text-xs text-[#6b7a8d]">
                          Land not required for this project (from Basic Requirements).
                        </div>
                      ) : landStatus && landStatus !== 'not-sure' ? (
                        <ReusedAnswerBlock label="Current Land Status" value={landStatusLabels[landStatus] ?? landStatus} source="Basic Requirements" />
                      ) : (
                        <div>
                          <p className="text-sm font-semibold text-[#1a2533] mb-1">What is your current land status?</p>
                          <div className="flex flex-col gap-2">
                            {[
                              { val: 'possessed',   label: 'Land already in possession' },
                              { val: 'identified',  label: 'Land identified — possession pending' },
                              { val: 'in-progress', label: 'Land acquisition / allotment in progress' },
                              { val: 'required',    label: 'Land required — not yet acquired' },
                              { val: 'not-sure',    label: 'Not sure' },
                            ].map(o => (
                              <label key={o.val} className={`flex items-center gap-3 px-4 py-2.5 rounded border cursor-pointer text-sm transition-colors
                                ${e04Data.landStatus === o.val ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                                <input type="radio" name="landStatusEdit" value={o.val} checked={e04Data.landStatus === o.val}
                                  onChange={() => setE04Data({ landStatus: o.val as E04Data['landStatus'] })} className="accent-[#1a3a5c]" />
                                {o.label}
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Acquisition section — skipped if possession received */}
                      {!noLand && !possessionReceived && landNotAcquired && (
                        <div className="mt-4">
                          <p className="text-sm font-semibold text-[#1a2533] mb-1">Preferred Land Route</p>
                          <div className="flex flex-wrap gap-3">
                            {[{ val: 'midc', label: 'MIDC' }, { val: 'private', label: 'Private' }, { val: 'not-decided', label: 'Not decided' }].map(o => (
                              <label key={o.val} className={`flex items-center gap-2 px-4 py-2.5 rounded border cursor-pointer text-sm transition-colors
                                ${data.preferredLandRoute === o.val ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                                <input type="radio" name="preferredLandRoute" value={o.val} checked={data.preferredLandRoute === o.val}
                                  onChange={() => onChange({ preferredLandRoute: o.val as E05Data['preferredLandRoute'] })} className="accent-[#1a3a5c]" />
                                {o.label}
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      {!noLand && !possessionReceived && inProgress && (
                        <div className="mt-4">
                          <p className="text-sm font-semibold text-[#1a2533] mb-1">Current Acquisition / Allotment Status</p>
                          <div className="flex flex-col gap-2">
                            {['Application submitted', 'Negotiation / purchase', 'Allotment process', 'Other'].map(o => (
                              <label key={o} className={`flex items-center gap-3 px-4 py-2.5 rounded border cursor-pointer text-sm transition-colors
                                ${data.acquisitionCurrentStatus === o ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                                <input type="radio" name="acquisitionStatus" value={o} checked={data.acquisitionCurrentStatus === o}
                                  onChange={() => onChange({ acquisitionCurrentStatus: o })} className="accent-[#1a3a5c]" />
                                {o}
                              </label>
                            ))}
                            {data.acquisitionCurrentStatus === 'Other' && (
                              <input type="text" value={data.acquisitionCurrentStatusOther}
                                onChange={e => onChange({ acquisitionCurrentStatusOther: e.target.value })}
                                placeholder="Describe current status" className={`${inputCls()} mt-1`} />
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-[#e8edf2]" />

                    {/* ── Land Type ── */}
                    {!noLand && (
                      <div>
                        <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-2">Land Type</p>
                        <p className="text-sm font-semibold text-[#1a2533] mb-2">What type of land is involved?</p>
                        <div className="flex flex-col gap-2">
                          {[
                            { val: 'midc-industrial', label: 'MIDC / Industrial Estate Land' },
                            { val: 'private-na',      label: 'Private Non-Agricultural Land' },
                            { val: 'private-agri',    label: 'Private Agricultural Land' },
                            { val: 'other',           label: 'Other' },
                            { val: 'not-sure',        label: 'Not Sure' },
                          ].map(o => (
                            <label key={o.val} className={`flex items-center gap-3 px-4 py-2.5 rounded border cursor-pointer text-sm transition-colors
                              ${data.landType === o.val ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                              <input type="radio" name="landType" value={o.val} checked={data.landType === o.val}
                                onChange={() => onChange({ landType: o.val as E05Data['landType'] })} className="accent-[#1a3a5c]" />
                              {o.label}
                            </label>
                          ))}
                        </div>
                        {landTypeMismatch && (
                          <div className="mt-3 flex items-start gap-2 p-2.5 bg-amber-50 border border-amber-200 rounded">
                            <span className="text-amber-600 shrink-0 mt-0.5"><Icon.Warning /></span>
                            <p className="text-xs text-amber-800">These answers may need review. The selected land type and MIDC status appear inconsistent. Please check before continuing.</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </section>
              )
            })()}

            {/* ══════════════════════════════════ SECTION 8 ══════════════════════════════════ */}
            {section === 8 && (() => {
              const noLand = e04Data.needLand === 'no'
              const isPrivate = data.landType === 'private-na' || data.landType === 'private-agri'
              const isAgri = data.landType === 'private-agri'
              const showThresholdVerification = data.agriPurchaseAboveThreshold === 'yes' || data.agriPurchaseAboveThreshold === 'not-sure'

              return (
                <section aria-labelledby="s8-heading">
                  <h2 id="s8-heading" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Land Details &amp; Documents</h2>
                  <div className="space-y-6">

                    {/* ── Private land details ── */}
                    {isPrivate && (
                      <div>
                        <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-3">Private Land Details</p>
                        <div className="space-y-4">
                          {/* Ownership status */}
                          <div>
                            <p className="text-sm font-semibold text-[#1a2533] mb-2">Ownership Status</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {['Owned', 'Leased', 'Being Purchased', 'Jointly Owned', 'Other'].map(o => (
                                <label key={o} className={`flex items-center gap-2 px-3 py-2.5 rounded border cursor-pointer text-sm transition-colors
                                  ${data.ownershipStatus === o ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                                  <input type="radio" name="ownershipStatus" value={o} checked={data.ownershipStatus === o}
                                    onChange={() => onChange({ ownershipStatus: o })} className="accent-[#1a3a5c]" />
                                  {o}
                                </label>
                              ))}
                            </div>
                            {data.ownershipStatus === 'Other' && (
                              <input type="text" value={data.ownershipStatusOther} onChange={e => onChange({ ownershipStatusOther: e.target.value })}
                                placeholder="Describe ownership arrangement" className={`${inputCls()} mt-2`} />
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-[#374151] mb-1">Survey / Plot Number</label>
                              <input type="text" value={data.surveyPlotNumber} onChange={e => onChange({ surveyPlotNumber: e.target.value })}
                                placeholder="e.g. 124/3 or Gat No. 45" className={inputCls()} />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-[#374151] mb-1">Land Area (sq.m)</label>
                              <input type="text" inputMode="numeric" value={data.landArea} onChange={e => onChange({ landArea: e.target.value.replace(/[^0-9.]/g, '') })}
                                placeholder="e.g. 5500" className={inputCls()} />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-[#374151] mb-1">Current Land-Use Classification</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {['Industrial', 'Commercial', 'Residential', 'Agricultural', 'Other', 'Not Sure'].map(o => (
                                <label key={o} className={`flex items-center gap-2 px-3 py-2.5 rounded border cursor-pointer text-sm transition-colors
                                  ${data.landUseClassification === o ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                                  <input type="radio" name="landUseClassification" value={o} checked={data.landUseClassification === o}
                                    onChange={() => onChange({ landUseClassification: o })} className="accent-[#1a3a5c]" />
                                  {o}
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── Agricultural conditional branch ── */}
                    {isAgri && (
                      <>
                        <div className="border-t border-[#e8edf2]" />
                        <div>
                          <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-3">Agricultural Land Details</p>
                          <div className="space-y-5">
                            <QuestionBlock question="Is the land intended for industrial / business use?">
                              <YesNoNotSure name="agriIntended" value={data.agriIntendedForIndustrial} onChange={v => onChange({ agriIntendedForIndustrial: v as E05Data['agriIntendedForIndustrial'] })} />
                              {data.agriIntendedForIndustrial === 'no' && (
                                <p className="mt-2 text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">
                                  Additional land-use action may not be relevant until industrial / business use is proposed.
                                </p>
                              )}
                            </QuestionBlock>

                            {(data.agriIntendedForIndustrial === 'yes' || data.agriIntendedForIndustrial === 'not-sure') && (
                              <QuestionBlock
                                question="Do you have the applicable land-use permission?"
                                helper="This refers to any applicable permission needed to use the agricultural land for industrial / business purposes."
                              >
                                <div className="flex flex-wrap gap-3">
                                  {[
                                    { val: 'yes', label: 'Yes' },
                                    { val: 'no', label: 'No' },
                                    { val: 'in-progress', label: 'Application in progress' },
                                    { val: 'not-sure', label: 'Not sure' },
                                  ].map(o => (
                                    <label key={o.val} className={`flex items-center gap-2 px-4 py-2.5 rounded border cursor-pointer text-sm transition-colors
                                      ${data.agriLandUsePermission === o.val ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                                      <input type="radio" name="agriLandUsePermission" value={o.val} checked={data.agriLandUsePermission === o.val}
                                        onChange={() => onChange({ agriLandUsePermission: o.val as E05Data['agriLandUsePermission'] })} className="accent-[#1a3a5c]" />
                                      {o.label}
                                    </label>
                                  ))}
                                </div>
                              </QuestionBlock>
                            )}

                            {(data.agriIntendedForIndustrial === 'yes' || data.agriIntendedForIndustrial === 'not-sure') && (
                              <QuestionBlock
                                question="Is the proposed agricultural land purchase above the applicable regulatory threshold?"
                                helper="If you are unsure, select 'Not sure'. No specific threshold value is shown here — this depends on current regulatory rules."
                              >
                                <YesNoNotSure name="agriThreshold" value={data.agriPurchaseAboveThreshold} onChange={v => onChange({ agriPurchaseAboveThreshold: v as E05Data['agriPurchaseAboveThreshold'] })} />
                                {showThresholdVerification && (
                                  <div className="mt-3">
                                    <RegulatoryVerificationBanner reason="Applicability depends on land area, land type, and the current applicable regulatory rule. EKATMA will verify during regulatory journey generation." />
                                  </div>
                                )}
                                {data.agriPurchaseAboveThreshold === 'no' && (
                                  <p className="mt-2 text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">
                                    This specific threshold check is not triggered. Other land-use or regulatory requirements may still apply.
                                  </p>
                                )}
                              </QuestionBlock>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    {/* ── MIDC land — no duplicate details ── */}
                    {data.landType === 'midc-industrial' && (
                      <div className="p-3 bg-[#f0f4f8] border border-[#c8d6e4] rounded text-xs text-[#4a5568]">
                        <p className="font-medium">MIDC / Industrial Estate Land</p>
                        <p className="mt-0.5">MIDC estate and plot details were captured in the MIDC Details section above.</p>
                      </div>
                    )}

                    {/* ── Not applicable messages for hidden branches ── */}
                    {noLand && (
                      <div className="p-3 bg-[#f8f9fb] border border-[#d1d9e0] rounded text-xs text-[#6b7a8d]">
                        Land details are not applicable for this project.
                      </div>
                    )}

                    <div className="border-t border-[#e8edf2]" />

                    {/* ── Land Documents ── */}
                    <div>
                      <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-2">Land Documents</p>
                      <p className="text-sm font-semibold text-[#1a2533] mb-1">Which land documents do you already have?</p>
                      <p className="text-xs text-[#6b7a8d] mb-3">
                        Tell us which documents are available. You can upload and manage reusable documents later in the Document Centre.
                      </p>
                      <div className="space-y-2">
                        {LAND_DOCUMENTS_LIST.map(doc => (
                          <label key={doc} className={`flex items-center gap-3 px-4 py-2.5 rounded border cursor-pointer text-sm transition-colors
                            ${data.landDocuments.includes(doc) ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c]' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                            <input
                              type="checkbox"
                              checked={data.landDocuments.includes(doc)}
                              onChange={() => {
                                const next = data.landDocuments.includes(doc)
                                  ? data.landDocuments.filter(d => d !== doc)
                                  : [...data.landDocuments, doc]
                                onChange({ landDocuments: next })
                              }}
                              className="accent-[#1a3a5c] shrink-0"
                            />
                            {doc}
                          </label>
                        ))}
                      </div>
                      {data.landDocuments.length > 0 && !data.landDocuments.includes('I do not have these yet') && (
                        <div className="mt-3 p-3 bg-[#f0f4f8] border border-[#c8d6e4] rounded flex items-start gap-2">
                          <span className="text-[#6b7a8d] shrink-0"><Icon.Info /></span>
                          <p className="text-xs text-[#4a5568]">
                            Document uploads are optional at this stage. You can manage and upload all documents in the Document Centre after project creation.
                          </p>
                        </div>
                      )}
                    </div>

                  </div>
                </section>
              )
            })()}

            {/* Action bar */}
            <CreateActionBar
              onBack={handleBack}
              onSaveExit={handleSaveExit}
              onContinue={handleContinue}
              continueLabel={section < 8 ? 'Continue' : 'Continue to Next Section'}
              saved={saved}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

// ─── E05 Part 3: Scale & Operations ──────────────────────────────────────────
const EXPANSION_CHANGE_OPTIONS = [
  { val: 'production',    label: 'Production / Output Capacity' },
  { val: 'building',      label: 'Building / Civil Works' },
  { val: 'machinery',     label: 'Machinery / Plant & Equipment' },
  { val: 'boiler',        label: 'Boiler / Pressure Equipment' },
  { val: 'chemicals',     label: 'Chemicals / Hazardous Materials' },
  { val: 'product',       label: 'Product / Service Line' },
  { val: 'workforce',     label: 'Workforce / Employment' },
  { val: 'land',          label: 'Land / Plot Area' },
  { val: 'process',       label: 'Manufacturing Process' },
  { val: 'power',         label: 'Power / Connected Load' },
  { val: 'water',         label: 'Water Requirement' },
  { val: 'other',         label: 'Other' },
]

const SCALE_SUBSECTIONS = [
  { num: 1, key: 'investment',  label: 'Investment' },
  { num: 2, key: 'employment',  label: 'Employment' },
  { num: 3, key: 'production',  label: 'Production' },
  { num: 4, key: 'building',    label: 'Building' },
  { num: 5, key: 'power',       label: 'Power' },
  { num: 6, key: 'water',       label: 'Water' },
  { num: 7, key: 'wastewater',  label: 'Wastewater' },
  { num: 8, key: 'drainage',    label: 'Drainage' },
]

const OCCUPANCY_OPTIONS = ['Industrial', 'Factory / Manufacturing', 'Warehouse', 'Office', 'Commercial', 'Laboratory / R&D', 'Mixed', 'Other', 'Not Sure']
const BUILDING_RISK_FLAGS = ['Industrial Machinery', 'Hazardous Material', 'Flammable Material', 'High Fire-Load Storage', 'Public / Customer Occupancy', 'Large Workforce', 'Warehouse', 'None']
const WATER_SOURCE_OPTIONS = ['MIDC Supply', 'Municipal / Local Authority', 'Groundwater', 'Surface Water', 'Private Source', 'Other', 'Not Decided']
const DRAINAGE_TYPE_OPTIONS = ['Stormwater', 'Sewage', 'Industrial Discharge', 'Other']
const PRODUCTION_UNITS = ['tonnes/day', 'tonnes/month', 'kg/day', 'kg/month', 'litres/day', 'KL/day', 'units/day', 'units/month', 'Other']

function formatInrDisplay(raw: string): string {
  const num = parseFloat(raw.replace(/,/g, ''))
  if (isNaN(num)) return ''
  if (num >= 1_00_00_000) return `₹${(num / 1_00_00_000).toFixed(2)} Cr`
  if (num >= 1_00_000) return `₹${(num / 1_00_000).toFixed(2)} L`
  return `₹${num.toLocaleString('en-IN')}`
}

function CurrencyInput({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#374151] mb-1">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#6b7a8d] font-medium select-none">₹</span>
        <input type="text" inputMode="numeric" value={value}
          onChange={e => onChange(e.target.value.replace(/[^0-9]/g, ''))}
          placeholder={placeholder ?? '0'}
          className="w-full border border-[#c8d6e4] rounded px-3 py-2 pl-7 text-sm text-[#1a2533] focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:border-transparent bg-white" />
      </div>
      {value && <p className="mt-0.5 text-xs text-[#6b7a8d]">{formatInrDisplay(value)}</p>}
    </div>
  )
}

function CurrentProposedRow({ label, current, proposed, unit, onChangeProposed }: { label: string; current: string; proposed: string; unit?: string; onChangeProposed: (v: string) => void }) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
      <div>
        <p className="text-xs text-[#9aa5b4] mb-1">Current</p>
        <div className="px-3 py-2 bg-[#f0f4f8] border border-[#d1d9e0] rounded text-sm text-[#374151]">{current || '—'}{unit ? ` ${unit}` : ''}</div>
      </div>
      <div className="text-[#9aa5b4] text-sm font-medium pt-4">→</div>
      <div>
        <p className="text-xs text-[#374151] mb-1">Proposed</p>
        <input type="text" value={proposed} onChange={e => onChangeProposed(e.target.value)}
          className="w-full border border-[#c8d6e4] rounded px-3 py-2 text-sm text-[#1a2533] focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:border-transparent bg-white" />
      </div>
      {label && <p className="col-span-3 text-xs font-medium text-[#6b7a8d] -mt-2">{label}{unit ? ` (${unit})` : ''}</p>}
    </div>
  )
}

function ConsistencyWarning({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-2 p-2.5 bg-amber-50 border border-amber-200 rounded">
      <span className="text-amber-600 shrink-0 mt-0.5"><Icon.Warning /></span>
      <p className="text-xs text-amber-800">{message}</p>
    </div>
  )
}

function SubsectionNav({ subsections, current, onGo }: { subsections: typeof SCALE_SUBSECTIONS; current: number; onGo: (n: number) => void }) {
  return (
    <div className="flex items-center gap-1 flex-wrap mb-5">
      {subsections.map((s, i) => {
        const done = s.num < current
        const active = s.num === current
        return (
          <button key={s.num} onClick={() => s.num <= current && onGo(s.num)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors border
              ${active ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]'
                : done ? 'bg-[#e8f0fe] text-[#1a56db] border-[#c8d6e4] cursor-pointer hover:bg-[#d0e4fd]'
                : 'bg-white text-[#9aa5b4] border-[#e8edf2] cursor-not-allowed'}`}>
            {done && <span className="text-[10px]">✓</span>}
            {s.num}. {s.label}
            {i < subsections.length - 1 && <span className="ml-1.5 text-[#c8d6e4]">›</span>}
          </button>
        )
      })}
    </div>
  )
}

export function E05ScalePage({ e03Data, e04Data, setE04Data, data, onChange, onBack, onSaveExit, onContinue, expansionChangeAreas = [] }: {
  e03Data: E03Data
  e04Data: E04Data
  setE04Data: (partial: Partial<E04Data>) => void
  data: E05Data
  onChange: (partial: Partial<E05Data>) => void
  onBack: () => void
  onSaveExit: () => void
  onContinue: () => void
  expansionChangeAreas?: string[]
}) {
  const [sub, setSub] = useState(1)
  const [saved, setSaved] = useState(false)

  const isExpansion = e03Data.projectType === 'expansion' || e03Data.projectType === 'modification'
  const isExisting = e03Data.projectType === 'existing'

  // For expansion/modification, a subsection is NA if it's not in the selected change areas
  const isSubNA = (key: string) => {
    if (!isExpansion || expansionChangeAreas.length === 0) return false
    const keyMap: Record<string, string[]> = {
      production: ['production', 'process', 'machinery'],
      building: ['building'],
      employment: ['workforce'],
      power: ['power'],
      water: ['water'],
      wastewater: ['water'],
      drainage: ['water', 'building'],
      investment: ['production', 'building', 'land', 'machinery'],
    }
    const changeKeys = keyMap[key] ?? [key]
    return !changeKeys.some(k => expansionChangeAreas.includes(k))
  }

  // Manufacturing branch: show production if businessNature indicates production
  const isMfg = ['manufacturing', 'processing', 'mfg-trading', 'construction'].includes(e04Data.businessNature ?? '')
    || data.activities.some(a => ['manufacturing', 'assembly', 'processing', 'packaging', 'r&d'].some(kw => a.toLowerCase().includes(kw)))

  const inputCls = () => 'w-full border border-[#c8d6e4] rounded px-3 py-2 text-sm text-[#1a2533] focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:border-transparent bg-white'

  function handleSaveExit() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    onSaveExit()
  }

  function handleBack() {
    if (sub > 1) setSub(sub - 1)
    else onBack()
  }

  function handleContinue() {
    if (sub < 8) setSub(sub + 1)
    else onContinue()
  }

  // Investment breakdown total
  const breakdownTotal = [data.investmentLand, data.investmentBuilding, data.investmentPlantMachinery, data.investmentOther]
    .map(v => parseFloat(v) || 0).reduce((a, b) => a + b, 0)
  const totalEntered = parseFloat(data.totalInvestment) || 0
  const investmentMismatch = breakdownTotal > 0 && totalEntered > 0 && Math.abs(breakdownTotal - totalEntered) > 1

  // Workforce consistency
  const wBreakdown = (parseFloat(data.workforcePermanent) || 0) + (parseFloat(data.workforceContract) || 0) + (parseFloat(data.workforceOtherCount) || 0)
  const wTotal = parseFloat(data.workforceTotal) || 0
  const workforceMismatch = wBreakdown > 0 && wTotal > 0 && wBreakdown !== wTotal

  // Wastewater consistency
  const effluentQ = parseFloat(data.industrialEffluentQuantity) || 0
  const treatCapQ = parseFloat(data.treatmentCapacity) || 0
  const wwConsistency = effluentQ > 0 && treatCapQ > 0 && treatCapQ < effluentQ

  // Power consistency
  const powerNo = e04Data.power === 'no'
  const loadEntered = parseFloat(data.connectedLoad) || 0
  const powerMismatch = powerNo && loadEntered > 0

  // Water MIDC vs MIDC=No
  const waterMidcMismatch = e04Data.midc === 'no' && data.waterSource === 'MIDC Supply'

  // Wastewater + Drainage consistency
  const wwDrainMismatch = (data.generatesWastewater === 'yes' && (data.wastewaterType === 'industrial' || data.wastewaterType === 'both'))
    && data.requiresDrainage === 'no'

  // Plot area from land section or MIDC
  const plotAreaSource = data.midcPlotArea ? { val: data.midcPlotArea, src: 'MIDC Details' }
    : data.landArea ? { val: data.landArea, src: 'Land Details' } : null

  // Production rows management
  function addProductionRow() {
    onChange({ productionCapacities: [...data.productionCapacities, { productId: '', productName: '', capacity: '', unit: '', unitOther: '' }] })
  }
  function updateProductionRow(i: number, partial: Partial<typeof data.productionCapacities[0]>) {
    const rows = data.productionCapacities.map((r, idx) => idx === i ? { ...r, ...partial } : r)
    onChange({ productionCapacities: rows })
  }
  function removeProductionRow(i: number) {
    onChange({ productionCapacities: data.productionCapacities.filter((_, idx) => idx !== i) })
  }

  // Building risk flags
  function toggleFlag(flag: string) {
    if (flag === 'None') {
      onChange({ buildingRiskFlags: data.buildingRiskFlags.includes('None') ? [] : ['None'] })
    } else {
      const without = data.buildingRiskFlags.filter(f => f !== 'None')
      const next = without.includes(flag) ? without.filter(f => f !== flag) : [...without, flag]
      onChange({ buildingRiskFlags: next })
    }
  }

  // Drainage types
  function toggleDrainage(t: string) {
    const next = data.drainageTypes.includes(t) ? data.drainageTypes.filter(d => d !== t) : [...data.drainageTypes, t]
    onChange({ drainageTypes: next })
  }

  // Context strip data
  const ctxIndustry = data.industry || '—'
  const ctxNature = e04Data.businessNature ? e04Data.businessNature.charAt(0).toUpperCase() + e04Data.businessNature.slice(1) : '—'
  const ctxLocation = [data.district, 'Maharashtra'].filter(Boolean).join(', ') || '—'
  const ctxTypeMap: Record<string, string> = { new: 'New Business / Project', existing: 'Existing Business', expansion: 'Expansion', modification: 'Modification / Diversification' }
  const ctxType = ctxTypeMap[e03Data.projectType ?? ''] ?? '—'

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 py-5">

        {/* Breadcrumb */}
        <div className="mb-4">
          <Breadcrumb items={[
            { label: 'Home', href: '#' },
            { label: 'My Businesses', href: '#' },
            { label: 'Create Business / Project', href: '#' },
            { label: 'Business Discovery' },
          ]} />
        </div>

        <CreateStepIndicator current="e05" />

        {/* Context strip */}
        <div className="bg-white border border-[#d1d9e0] rounded mb-4 px-4 py-3 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2">
          <div>
            <p className="text-[10px] font-semibold text-[#9aa5b4] uppercase tracking-wider">Project</p>
            <p className="text-xs font-semibold text-[#1a2533] truncate">{e03Data.name || '—'}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-[#9aa5b4] uppercase tracking-wider">Type</p>
            <p className="text-xs text-[#374151]">{ctxType}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-[#9aa5b4] uppercase tracking-wider">Industry</p>
            <p className="text-xs text-[#374151] truncate">{ctxIndustry}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-[#9aa5b4] uppercase tracking-wider">Nature</p>
            <p className="text-xs text-[#374151]">{ctxNature}</p>
          </div>
        </div>

        {/* Section header */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider">Business Discovery · Project Scale &amp; Operations</p>
          <h1 className="text-lg font-bold text-[#1a2533] mt-0.5">{SCALE_SUBSECTIONS[sub - 1].label}</h1>
        </div>

        {/* Subsection nav */}
        <SubsectionNav subsections={SCALE_SUBSECTIONS} current={sub} onGo={setSub} />

        {/* NA banner for expansion/modification when current sub not selected for change */}
        {isExpansion && isSubNA(SCALE_SUBSECTIONS[sub - 1].key) && (
          <div className="mb-3">
            <NotApplicableBanner reason={`${SCALE_SUBSECTIONS[sub - 1].label} was not selected as a change area for this ${e03Data.projectType}`} />
          </div>
        )}

        {/* Form card */}
        <div className="bg-white border border-[#d1d9e0] rounded shadow-sm p-6 space-y-6">

          {/* ══════ 1. INVESTMENT ══════ */}
          {sub === 1 && (
            <section aria-labelledby="inv-heading">
              <h2 id="inv-heading" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-1 pb-2 border-b border-[#e8edf2]">Project Investment</h2>
              <p className="text-xs text-[#6b7a8d] mb-5">Provide the estimated capital investment for this project. Approximate values can be updated later.</p>
              <div className="space-y-5">
                <CurrencyInput label="Estimated Total Project Investment" value={data.totalInvestment} onChange={v => onChange({ totalInvestment: v })} placeholder="e.g. 400000000" />

                <div>
                  <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-3">Investment Breakdown <span className="normal-case font-normal">(enter estimated values where available)</span></p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <CurrencyInput label="Land" value={data.investmentLand} onChange={v => onChange({ investmentLand: v })} />
                    <CurrencyInput label="Building / Construction" value={data.investmentBuilding} onChange={v => onChange({ investmentBuilding: v })} />
                    <CurrencyInput label="Plant & Machinery" value={data.investmentPlantMachinery} onChange={v => onChange({ investmentPlantMachinery: v })} />
                    <CurrencyInput label="Other Capital Investment" value={data.investmentOther} onChange={v => onChange({ investmentOther: v })} />
                  </div>
                </div>

                {breakdownTotal > 0 && (
                  <div className="flex items-center justify-between px-3 py-2 bg-[#f0f4f8] border border-[#c8d6e4] rounded text-xs">
                    <span className="text-[#4a5568]">Calculated from breakdown</span>
                    <span className="font-semibold text-[#1a2533]">{formatInrDisplay(String(breakdownTotal))}</span>
                  </div>
                )}

                {investmentMismatch && (
                  <ConsistencyWarning message="The total investment and investment breakdown do not currently match. Please review." />
                )}

                {data.classification === 'not-sure' && (
                  <div className="flex items-start gap-2 p-2.5 bg-[#f0f4f8] border border-[#c8d6e4] rounded">
                    <span className="text-[#6b7a8d] shrink-0 mt-0.5"><Icon.Info /></span>
                    <p className="text-xs text-[#4a5568]">Investment values will be used as one of the inputs when EKATMA evaluates your project classification later.</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ══════ 2. EMPLOYMENT ══════ */}
          {sub === 2 && (
            <section aria-labelledby="emp-heading">
              <h2 id="emp-heading" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Employment</h2>
              <div className="space-y-5">
                {(isExisting || isExpansion) && (
                  <div>
                    <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-2">Current Workforce</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#374151] mb-1">Total</label>
                        <input type="text" inputMode="numeric" value={data.workforceCurrentTotal}
                          onChange={e => onChange({ workforceCurrentTotal: e.target.value.replace(/\D/g, '') })}
                          className={inputCls()} placeholder="0" />
                      </div>
                    </div>
                    {isExpansion && data.workforceCurrentTotal && (
                      <p className="mt-1.5 text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#e8edf2] rounded px-2 py-1">
                        Current value will be preserved. Enter proposed values below.
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-2">
                    {isExpansion ? 'Expected Workforce After Project' : 'Expected Workforce'}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { key: 'workforceTotal', label: 'Total' },
                      { key: 'workforcePermanent', label: 'Permanent' },
                      { key: 'workforceContract', label: 'Contract' },
                      { key: 'workforceOtherCount', label: 'Other' },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="block text-xs font-medium text-[#374151] mb-1">{f.label}</label>
                        <input type="text" inputMode="numeric" value={(data as unknown as Record<string, string>)[f.key]}
                          onChange={e => onChange({ [f.key]: e.target.value.replace(/\D/g, '') } as Partial<E05Data>)}
                          className={inputCls()} placeholder="0" />
                      </div>
                    ))}
                  </div>
                  {workforceMismatch && (
                    <div className="mt-3">
                      <ConsistencyWarning message="Workforce breakdown (Permanent + Contract + Other) does not match the Total workforce figure. Please review." />
                    </div>
                  )}
                  {isExpansion && data.workforceCurrentTotal && data.workforceTotal && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-[#4a5568] bg-[#f0f4f8] border border-[#c8d6e4] rounded px-3 py-2">
                      <span>Change:</span>
                      <span className="font-semibold text-[#1a3a5c]">
                        {(parseFloat(data.workforceTotal) - parseFloat(data.workforceCurrentTotal)) >= 0 ? '+' : ''}{parseFloat(data.workforceTotal) - parseFloat(data.workforceCurrentTotal)} persons
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ══════ 3. PRODUCTION ══════ */}
          {sub === 3 && (
            <section aria-labelledby="prod-heading">
              <h2 id="prod-heading" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Production Details</h2>
              {!isMfg ? (
                <div className="py-6 text-center">
                  <p className="text-sm text-[#6b7a8d]">Production / Manufacturing</p>
                  <p className="text-xs text-[#9aa5b4] mt-1 max-w-xs mx-auto">Not applicable based on your selected business nature and activities. Continuing to Building details.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-xs text-[#6b7a8d]">Provide the expected production capacity for the products manufactured or processed.</p>

                  {/* Process reuse */}
                  {data.processType && (
                    <ReusedAnswerBlock label="Process" value={data.processType} source="Business Discovery — Products & Process" />
                  )}

                  {/* Production capacity rows */}
                  <div>
                    <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-3">Production Capacity</p>
                    {data.productionCapacities.length === 0 && data.products.length > 0 && (
                      <p className="text-xs text-[#9aa5b4] mb-3">Products from earlier: {data.products.map(p => p.name).join(', ')}</p>
                    )}
                    <div className="space-y-3">
                      {data.productionCapacities.map((row, i) => (
                        <div key={i} className="border border-[#d1d9e0] rounded p-3 bg-[#fafbfc] space-y-3">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-medium text-[#374151]">Product {i + 1}</p>
                            <button onClick={() => removeProductionRow(i)} className="text-xs text-[#9aa5b4] hover:text-red-500 transition-colors">Remove</button>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-[#374151] mb-1">Product / Item Name</label>
                            <input type="text" value={row.productName} onChange={e => updateProductionRow(i, { productName: e.target.value })}
                              list={`prod-list-${i}`} placeholder="Select or type product name" className={inputCls()} />
                            <datalist id={`prod-list-${i}`}>{data.products.map(p => <option key={p.id} value={p.name} />)}</datalist>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-[#374151] mb-1">Capacity</label>
                              <input type="text" inputMode="numeric" value={row.capacity} onChange={e => updateProductionRow(i, { capacity: e.target.value.replace(/[^0-9.]/g, '') })}
                                placeholder="e.g. 100" className={inputCls()} />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-[#374151] mb-1">Unit</label>
                              <select value={row.unit} onChange={e => updateProductionRow(i, { unit: e.target.value })} className={inputCls()}>
                                <option value="">Select unit…</option>
                                {PRODUCTION_UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                              </select>
                            </div>
                          </div>
                          {row.unit === 'Other' && (
                            <input type="text" value={row.unitOther} onChange={e => updateProductionRow(i, { unitOther: e.target.value })}
                              placeholder="Specify unit" className={inputCls()} />
                          )}
                          {isExpansion && (
                            <div className="pt-1 border-t border-[#e8edf2]">
                              <label className="block text-xs font-medium text-[#374151] mb-1">Current Capacity (for comparison)</label>
                              <input type="text" inputMode="numeric" placeholder="e.g. 50" className={inputCls()} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <button onClick={addProductionRow}
                      className="mt-3 flex items-center gap-1.5 text-sm text-[#1a56db] hover:text-[#1a3a5c] transition-colors font-medium">
                      <span className="text-lg leading-none">+</span> Add Production Capacity
                    </button>
                  </div>

                  {/* Shifts */}
                  <div>
                    <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-2">Shifts &amp; Hours</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <p className="text-sm font-medium text-[#1a2533] mb-2">Number of Shifts</p>
                        <div className="flex flex-wrap gap-2">
                          {['1', '2', '3', 'other'].map(s => (
                            <label key={s} className={`flex items-center gap-2 px-4 py-2 rounded border cursor-pointer text-sm transition-colors
                              ${data.shifts === s ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                              <input type="radio" name="shifts" value={s} checked={data.shifts === s} onChange={() => onChange({ shifts: s })} className="accent-[#1a3a5c]" />
                              {s === 'other' ? 'Other' : s}
                            </label>
                          ))}
                        </div>
                        {data.shifts === 'other' && (
                          <input type="text" inputMode="numeric" value={data.shiftsOther} onChange={e => onChange({ shiftsOther: e.target.value.replace(/\D/g, '') })}
                            placeholder="Number of shifts" className={`${inputCls()} mt-2`} />
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1a2533] mb-2">Operating Hours / Day</label>
                        <div className="relative">
                          <input type="text" inputMode="numeric" value={data.operatingHoursPerDay}
                            onChange={e => {
                              const v = e.target.value.replace(/\D/g, '')
                              if (!v || parseInt(v) <= 24) onChange({ operatingHoursPerDay: v })
                            }}
                            placeholder="e.g. 16" className={inputCls()} />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9aa5b4]">hrs</span>
                        </div>
                        <p className="mt-0.5 text-xs text-[#9aa5b4]">0–24 hours</p>
                      </div>
                    </div>
                  </div>

                  {/* Additional process notes */}
                  <div>
                    <label className="block text-xs font-medium text-[#374151] mb-1">Additional Process Details <span className="font-normal text-[#9aa5b4]">(optional)</span></label>
                    <textarea value={data.processDetailsExtra} onChange={e => onChange({ processDetailsExtra: e.target.value })}
                      rows={2} placeholder="Any additional notes about the manufacturing or production process…"
                      className="w-full border border-[#c8d6e4] rounded px-3 py-2 text-sm text-[#1a2533] focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:border-transparent bg-white resize-none" />
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ══════ 4. BUILDING ══════ */}
          {sub === 4 && (
            <section aria-labelledby="bld-heading">
              <h2 id="bld-heading" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Building / Construction</h2>
              <div className="space-y-5">
                {/* Reuse construction from E04 */}
                <div>
                  <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-2">Construction / Premises</p>
                  {e04Data.construction && e04Data.construction !== 'not-sure' ? (
                    <ReusedAnswerBlock
                      label="Construction / Premises"
                      value={{ new: 'New Construction Planned', existing: 'Existing Premises', modification: 'Modify Existing Premises' }[e04Data.construction] ?? e04Data.construction}
                      source="Basic Requirements"
                    />
                  ) : (
                    <div className="flex flex-col gap-2">
                      {[
                        { val: 'new', label: 'New Construction Planned' },
                        { val: 'existing', label: 'Existing Premises' },
                        { val: 'modification', label: 'Modify Existing Premises' },
                        { val: 'not-sure', label: 'Not Sure' },
                      ].map(o => (
                        <label key={o.val} className={`flex items-center gap-3 px-4 py-2.5 rounded border cursor-pointer text-sm transition-colors
                          ${e04Data.construction === o.val ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                          <input type="radio" name="constructionEdit" value={o.val} checked={e04Data.construction === o.val}
                            onChange={() => setE04Data({ construction: o.val as E04Data['construction'] })} className="accent-[#1a3a5c]" />
                          {o.label}
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* New / modification building details */}
                {(e04Data.construction === 'new' || e04Data.construction === 'modification') && (
                  <div className="border border-[#c8d6e4] rounded p-4 bg-[#f8fbff] space-y-4">
                    <p className="text-sm font-semibold text-[#1a3a5c]">
                      {e04Data.construction === 'modification' ? 'Current → Proposed Building Details' : 'Building Details'}
                    </p>

                    {/* Plot area — reuse from land */}
                    {plotAreaSource ? (
                      <ReusedAnswerBlock label="Plot Area (sq.m)" value={`${plotAreaSource.val} sq.m`} source={plotAreaSource.src} />
                    ) : (
                      <div>
                        <label className="block text-xs font-medium text-[#374151] mb-1">Plot Area (sq.m)</label>
                        <input type="text" inputMode="numeric" placeholder="e.g. 4800" className={inputCls()} />
                      </div>
                    )}

                    {e04Data.construction === 'modification' ? (
                      <div className="space-y-3">
                        <CurrentProposedRow label="Built-Up Area" current={data.buildingCurrentBuiltUpArea} unit="sq.m" proposed={data.buildingBuiltUpArea} onChangeProposed={v => onChange({ buildingBuiltUpArea: v })} />
                        <CurrentProposedRow label="Number of Floors" current={data.buildingCurrentFloors} unit="" proposed={data.buildingFloors} onChangeProposed={v => onChange({ buildingFloors: v })} />
                        <CurrentProposedRow label="Height" current={data.buildingCurrentHeight} unit="m" proposed={data.buildingHeight} onChangeProposed={v => onChange({ buildingHeight: v })} />
                        <CurrentProposedRow label="Occupancy" current={data.buildingCurrentOccupancy} unit="" proposed={data.buildingOccupancy} onChangeProposed={v => onChange({ buildingOccupancy: v })} />
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-[#374151] mb-1">Built-Up Area (sq.m)</label>
                          <input type="text" inputMode="numeric" value={data.buildingBuiltUpArea} onChange={e => onChange({ buildingBuiltUpArea: e.target.value.replace(/[^0-9.]/g, '') })} placeholder="e.g. 2500" className={inputCls()} />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#374151] mb-1">Number of Floors</label>
                          <input type="text" inputMode="numeric" value={data.buildingFloors} onChange={e => onChange({ buildingFloors: e.target.value.replace(/\D/g, '') })} placeholder="e.g. 3" className={inputCls()} />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#374151] mb-1">Building Height (m)</label>
                          <input type="text" inputMode="numeric" value={data.buildingHeight} onChange={e => onChange({ buildingHeight: e.target.value.replace(/[^0-9.]/g, '') })} placeholder="e.g. 15" className={inputCls()} />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#374151] mb-1">Occupancy</label>
                          <select value={data.buildingOccupancy} onChange={e => onChange({ buildingOccupancy: e.target.value })} className={inputCls()}>
                            <option value="">Select occupancy…</option>
                            {OCCUPANCY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Construction status */}
                    <div>
                      <p className="text-xs font-medium text-[#374151] mb-2">Construction Status</p>
                      <div className="flex flex-wrap gap-2">
                        {['Not Started', 'Planning', 'Under Construction', 'Completed'].map(s => (
                          <label key={s} className={`flex items-center gap-2 px-3 py-2 rounded border cursor-pointer text-sm transition-colors
                            ${data.buildingConstructionStatus === s ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                            <input type="radio" name="bldStatus" value={s} checked={data.buildingConstructionStatus === s} onChange={() => onChange({ buildingConstructionStatus: s })} className="accent-[#1a3a5c]" />
                            {s}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {e04Data.construction === 'existing' && (
                  <p className="text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">
                    No new construction planned. Detailed building branch is not applicable for existing premises with no modification.
                  </p>
                )}

                {/* Building risk flags — always shown */}
                <div>
                  <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-2">Building / Premises Features</p>
                  <p className="text-sm text-[#374151] mb-3">Will the building / premises include any of the following?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {BUILDING_RISK_FLAGS.map(f => (
                      <label key={f} className={`flex items-center gap-3 px-3 py-2.5 rounded border cursor-pointer text-sm transition-colors
                        ${data.buildingRiskFlags.includes(f) ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c]' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                        <input type="checkbox" checked={data.buildingRiskFlags.includes(f)} onChange={() => toggleFlag(f)} className="accent-[#1a3a5c] shrink-0" />
                        {f}
                      </label>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-[#9aa5b4]">Selecting "None" clears other selections. These flags inform later regulatory routing.</p>
                </div>
              </div>
            </section>
          )}

          {/* ══════ 5. POWER ══════ */}
          {sub === 5 && (
            <section aria-labelledby="pwr-heading">
              <h2 id="pwr-heading" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Power</h2>
              <div className="space-y-5">
                {/* Reuse power from E04 */}
                <div>
                  {e04Data.power && e04Data.power !== 'not-sure' ? (
                    <ReusedAnswerBlock label="Power Required" value={{ yes: 'Yes', no: 'No' }[e04Data.power] ?? e04Data.power} source="Basic Requirements" />
                  ) : (
                    <div>
                      <p className="text-sm font-semibold text-[#1a2533] mb-2">Is power required?</p>
                      <YesNoNotSure name="powerEdit" value={e04Data.power} onChange={v => setE04Data({ power: v as E04Data['power'] })} />
                    </div>
                  )}
                </div>

                {e04Data.power === 'no' && (
                  <p className="text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">Power details are not applicable for this project.</p>
                )}

                {(e04Data.power === 'yes') && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-2">Estimated Connected Load</label>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <input type="text" inputMode="numeric" value={data.connectedLoad}
                            onChange={e => onChange({ connectedLoad: e.target.value.replace(/[^0-9.]/g, '') })}
                            placeholder="e.g. 750" className={inputCls()} />
                        </div>
                        <div className="w-24">
                          <select value={data.connectedLoadUnit} onChange={e => onChange({ connectedLoadUnit: e.target.value as E05Data['connectedLoadUnit'] })} className={inputCls()}>
                            <option value="">Unit</option>
                            <option value="kw">kW</option>
                            <option value="mw">MW</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-2">Expected Supply Type</p>
                      <div className="flex flex-wrap gap-2">
                        {[{ val: 'lt', label: 'Low Tension' }, { val: 'ht', label: 'High Tension' }, { val: 'not-sure', label: 'Not Sure' }].map(o => (
                          <label key={o.val} className={`flex items-center gap-2 px-4 py-2.5 rounded border cursor-pointer text-sm transition-colors
                            ${data.supplyType === o.val ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                            <input type="radio" name="supplyType" value={o.val} checked={data.supplyType === o.val}
                              onChange={() => onChange({ supplyType: o.val as E05Data['supplyType'] })} className="accent-[#1a3a5c]" />
                            {o.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    {data.supplyType === 'ht' && (
                      <div>
                        <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-2">HT Infrastructure Expected</p>
                        <div className="flex flex-col gap-2">
                          {['HT Connection', 'Dedicated Substation', 'Both', 'Not Sure'].map(o => (
                            <label key={o} className={`flex items-center gap-3 px-4 py-2.5 rounded border cursor-pointer text-sm transition-colors
                              ${data.htInfrastructure === o ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                              <input type="radio" name="htInfra" value={o} checked={data.htInfrastructure === o} onChange={() => onChange({ htInfrastructure: o })} className="accent-[#1a3a5c]" />
                              {o}
                            </label>
                          ))}
                        </div>
                        <p className="mt-2 text-xs text-[#9aa5b4]">HT infrastructure information will be used in regulatory routing. No approval is generated here.</p>
                      </div>
                    )}

                    {powerMismatch && (
                      <ConsistencyWarning message="Power requirement is set to No, but a connected load has been entered. Please review these answers." />
                    )}
                  </>
                )}

                {e04Data.power === 'not-sure' && (
                  <p className="text-xs text-[#6b7a8d] bg-amber-50 border border-amber-200 rounded px-3 py-2">
                    Power requirement: Needs Verification. Detailed power fields will be available once requirement is confirmed.
                  </p>
                )}
              </div>
            </section>
          )}

          {/* ══════ 6. WATER ══════ */}
          {sub === 6 && (
            <section aria-labelledby="wat-heading">
              <h2 id="wat-heading" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Water</h2>
              <div className="space-y-5">
                {e04Data.water && e04Data.water !== 'not-sure' ? (
                  <ReusedAnswerBlock label="Water Required" value={{ yes: 'Yes', no: 'No' }[e04Data.water] ?? e04Data.water} source="Basic Requirements" />
                ) : (
                  <div>
                    <p className="text-sm font-semibold text-[#1a2533] mb-2">Is water required?</p>
                    <YesNoNotSure name="waterEdit" value={e04Data.water} onChange={v => setE04Data({ water: v as E04Data['water'] })} />
                  </div>
                )}

                {e04Data.water === 'no' && (
                  <p className="text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">Water details are not applicable for this project.</p>
                )}

                {e04Data.water === 'yes' && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-2">Daily Water Requirement</label>
                      <div className="flex gap-2 items-center">
                        <input type="text" inputMode="numeric" value={data.dailyWaterRequirement}
                          onChange={e => onChange({ dailyWaterRequirement: e.target.value.replace(/[^0-9.]/g, '') })}
                          placeholder="e.g. 80" className={`${inputCls()} max-w-[160px]`} />
                        <span className="text-sm text-[#6b7a8d]">KL/day</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-2">Primary Water Source</p>
                      <div className="flex flex-col gap-2">
                        {WATER_SOURCE_OPTIONS.map(o => (
                          <label key={o} className={`flex items-center gap-3 px-4 py-2.5 rounded border cursor-pointer text-sm transition-colors
                            ${data.waterSource === o ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                            <input type="radio" name="waterSource" value={o} checked={data.waterSource === o} onChange={() => onChange({ waterSource: o, waterSourceOther: '' })} className="accent-[#1a3a5c]" />
                            {o}
                          </label>
                        ))}
                      </div>
                      {data.waterSource === 'Other' && (
                        <input type="text" value={data.waterSourceOther} onChange={e => onChange({ waterSourceOther: e.target.value })}
                          placeholder="Describe water source" className={`${inputCls()} mt-2`} />
                      )}
                      {data.waterSource === 'Private Source' && (
                        <input type="text" value={data.waterSourceDescription} onChange={e => onChange({ waterSourceDescription: e.target.value })}
                          placeholder="Source description (optional)" className={`${inputCls()} mt-2`} />
                      )}
                      {data.waterSource === 'Groundwater' && (
                        <p className="mt-2 text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">
                          Groundwater-related regulatory requirements will be evaluated later.
                        </p>
                      )}
                      {waterMidcMismatch && (
                        <div className="mt-3"><ConsistencyWarning message="MIDC status is set to No, but MIDC Supply is selected as water source. Please review these answers." /></div>
                      )}
                    </div>
                  </>
                )}

                {e04Data.water === 'not-sure' && (
                  <p className="text-xs text-[#6b7a8d] bg-amber-50 border border-amber-200 rounded px-3 py-2">
                    Water requirement: Needs Verification. Detailed water fields will be available once requirement is confirmed.
                  </p>
                )}
              </div>
            </section>
          )}

          {/* ══════ 7. WASTEWATER ══════ */}
          {sub === 7 && (() => {
            const showWw = isMfg || e04Data.water === 'yes' || data.buildingRiskFlags.some(f => ['Industrial Machinery', 'Hazardous Material'].includes(f))
            return (
              <section aria-labelledby="ww-heading">
                <h2 id="ww-heading" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Wastewater</h2>
                {!showWw ? (
                  <div className="py-5 text-center">
                    <p className="text-sm text-[#6b7a8d]">Wastewater</p>
                    <p className="text-xs text-[#9aa5b4] mt-1 max-w-xs mx-auto">Not required based on selected business nature and activities.</p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <QuestionBlock question="Will the project generate wastewater?">
                      <YesNoNotSure name="genWastewater" value={data.generatesWastewater} onChange={v => onChange({ generatesWastewater: v as E05Data['generatesWastewater'] })} />
                    </QuestionBlock>

                    {data.generatesWastewater === 'no' && (
                      <p className="text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">Wastewater details are not applicable.</p>
                    )}

                    {data.generatesWastewater === 'yes' && (
                      <>
                        <QuestionBlock question="What type of wastewater will be generated?">
                          <div className="flex flex-col gap-2">
                            {[{ val: 'domestic', label: 'Domestic Sewage' }, { val: 'industrial', label: 'Industrial Effluent' }, { val: 'both', label: 'Both' }].map(o => (
                              <label key={o.val} className={`flex items-center gap-3 px-4 py-2.5 rounded border cursor-pointer text-sm transition-colors
                                ${data.wastewaterType === o.val ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                                <input type="radio" name="wwType" value={o.val} checked={data.wastewaterType === o.val} onChange={() => onChange({ wastewaterType: o.val as E05Data['wastewaterType'] })} className="accent-[#1a3a5c]" />
                                {o.label}
                              </label>
                            ))}
                          </div>
                        </QuestionBlock>

                        {(data.wastewaterType === 'industrial' || data.wastewaterType === 'both') && (
                          <div className="border border-[#c8d6e4] rounded p-4 bg-[#f8fbff] space-y-4">
                            <p className="text-sm font-semibold text-[#1a3a5c]">Industrial Wastewater Details</p>
                            <div className="flex gap-2 items-center">
                              <input type="text" inputMode="numeric" value={data.industrialEffluentQuantity}
                                onChange={e => onChange({ industrialEffluentQuantity: e.target.value.replace(/[^0-9.]/g, '') })}
                                placeholder="e.g. 45" className={`${inputCls()} max-w-[160px]`} />
                              <span className="text-sm text-[#6b7a8d]">KL/day (estimated)</span>
                            </div>

                            <div>
                              <p className="text-xs font-medium text-[#374151] mb-2">Is treatment planned?</p>
                              <div className="flex flex-wrap gap-2">
                                {[{ val: 'yes', label: 'Yes' }, { val: 'no', label: 'No' }, { val: 'not-decided', label: 'Not Decided' }].map(o => (
                                  <label key={o.val} className={`flex items-center gap-2 px-4 py-2 rounded border cursor-pointer text-sm transition-colors
                                    ${data.treatmentPlanned === o.val ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                                    <input type="radio" name="treatmentPlanned" value={o.val} checked={data.treatmentPlanned === o.val}
                                      onChange={() => onChange({ treatmentPlanned: o.val as E05Data['treatmentPlanned'] })} className="accent-[#1a3a5c]" />
                                    {o.label}
                                  </label>
                                ))}
                              </div>
                            </div>

                            {data.treatmentPlanned === 'yes' && (
                              <>
                                <div>
                                  <label className="block text-xs font-medium text-[#374151] mb-1">Treatment System</label>
                                  <div className="flex flex-wrap gap-2">
                                    {['ETP', 'STP', 'Combined Treatment', 'Other'].map(s => (
                                      <label key={s} className={`flex items-center gap-2 px-3 py-2 rounded border cursor-pointer text-sm transition-colors
                                        ${data.treatmentSystem === s ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                                        <input type="radio" name="treatSys" value={s} checked={data.treatmentSystem === s} onChange={() => onChange({ treatmentSystem: s })} className="accent-[#1a3a5c]" />
                                        {s}
                                      </label>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex gap-2 items-center">
                                  <input type="text" inputMode="numeric" value={data.treatmentCapacity}
                                    onChange={e => onChange({ treatmentCapacity: e.target.value.replace(/[^0-9.]/g, '') })}
                                    placeholder="Treatment capacity" className={`${inputCls()} max-w-[160px]`} />
                                  <span className="text-sm text-[#6b7a8d]">KL/day</span>
                                </div>
                                {wwConsistency && (
                                  <ConsistencyWarning message={`Treatment capacity (${data.treatmentCapacity} KL/day) is lower than the stated industrial wastewater quantity (${data.industrialEffluentQuantity} KL/day). Please review.`} />
                                )}
                              </>
                            )}

                            {data.treatmentPlanned === 'not-decided' && (
                              <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded px-3 py-2">Treatment not yet decided. This will need resolution before application submission.</p>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </section>
            )
          })()}

          {/* ══════ 8. DRAINAGE ══════ */}
          {sub === 8 && (
            <section aria-labelledby="drn-heading">
              <h2 id="drn-heading" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Drainage</h2>
              <div className="space-y-5">
                <QuestionBlock question="Will drainage infrastructure be required?">
                  <YesNoNotSure name="reqDrainage" value={data.requiresDrainage} onChange={v => onChange({ requiresDrainage: v as E05Data['requiresDrainage'] })} />
                </QuestionBlock>

                {data.requiresDrainage === 'no' && (
                  <p className="text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">Drainage details are not applicable.</p>
                )}

                {data.requiresDrainage === 'yes' && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-2">Type of Drainage Required</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {DRAINAGE_TYPE_OPTIONS.map(t => (
                          <label key={t} className={`flex items-center gap-3 px-4 py-2.5 rounded border cursor-pointer text-sm transition-colors
                            ${data.drainageTypes.includes(t) ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c]' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
                            <input type="checkbox" checked={data.drainageTypes.includes(t)} onChange={() => toggleDrainage(t)} className="accent-[#1a3a5c] shrink-0" />
                            {t}
                          </label>
                        ))}
                      </div>
                      {data.drainageTypes.includes('Other') && (
                        <input type="text" value={data.drainageOtherDescription} onChange={e => onChange({ drainageOtherDescription: e.target.value })}
                          placeholder="Describe drainage requirement" className={`${inputCls()} mt-2`} />
                      )}
                    </div>

                    {wwDrainMismatch && (
                      <ConsistencyWarning message="Industrial effluent is indicated but drainage infrastructure is set to No. Please review how industrial wastewater will be handled." />
                    )}

                    {data.generatesWastewater === 'yes' && data.wastewaterType === 'domestic' && !data.drainageTypes.includes('Sewage') && data.drainageTypes.length > 0 && (
                      <ConsistencyWarning message="Domestic sewage is indicated. Consider whether sewage drainage is also required." />
                    )}

                    <div className="flex items-start gap-2 p-2.5 bg-[#f0f4f8] border border-[#c8d6e4] rounded">
                      <span className="text-[#6b7a8d] shrink-0 mt-0.5"><Icon.Info /></span>
                      <p className="text-xs text-[#4a5568]">
                        Drainage types are kept separate from wastewater generation. Selection here indicates required infrastructure, not treatment or discharge approvals.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

        </div>

        {/* Action bar */}
        <CreateActionBar
          onBack={handleBack}
          onSaveExit={handleSaveExit}
          onContinue={handleContinue}
          continueLabel={sub < 8 ? 'Continue' : 'Continue to Next Section'}
          saved={saved}
        />
      </div>
    </main>
  )
}

// ─── E05 Part 4: Environment, Safety & Existing Context ───────────────────────
const ENV_SUBSECTIONS = [
  { num: 1, key: 'environment',   label: 'Environment' },
  { num: 2, key: 'air',           label: 'Air & Emissions' },
  { num: 3, key: 'hazmat',        label: 'Hazardous Materials' },
  { num: 4, key: 'waste',         label: 'Waste' },
  { num: 5, key: 'equipment',     label: 'Equipment' },
  { num: 6, key: 'factory-fire',  label: 'Factory & Fire' },
  { num: 7, key: 'storage',       label: 'Storage & Warehouse' },
  { num: 8, key: 'trade',         label: 'Trade & Logistics' },
  { num: 9, key: 'existing-reg',  label: 'Existing Regulatory' },
  { num: 10, key: 'attrs-docs',   label: 'Attributes & Documents' },
]

const ENV_CHARACTERISTICS = ['Industrial Emissions', 'Industrial Wastewater', 'Hazardous Waste', 'Large Water Consumption', 'Large-Scale Development', 'Mining / Extraction', 'Chemical Processing', 'Other']
const HAZARD_TYPES = ['Flammable', 'Explosive', 'Toxic', 'Corrosive', 'Oxidising', 'Other', 'Unknown']
const AIR_SOURCES = ['Boiler', 'Furnace', 'DG Set', 'Process Emission', 'Chemical Process', 'Other']
const FIRE_FLAGS_LIST = ['Industrial Building', 'Large Building', 'Hazardous Materials', 'Flammable Materials', 'High Fire-Load Storage', 'Public Occupancy', 'Warehouse', 'None']
const STORAGE_CATEGORIES = ['Raw Materials', 'Finished Goods', 'Chemicals', 'Flammable Materials', 'Hazardous Materials', 'Fuel', 'Agricultural Products', 'Other', 'None']
const DOC_CATEGORIES = ['Business', 'Land', 'Technical', 'Building', 'Environmental', 'Safety', 'Existing Approvals', 'Promoter', 'Other']
const INCENTIVE_OPTIONS = ['Startup', 'MSME', 'R&D Intensive', 'Export Oriented', 'Employment Intensive', 'Environment-Focused', 'Other']
const APPROVAL_STATUSES = ['Valid', 'Expired', 'Pending Renewal', 'Unknown', 'Other']
const LOGISTICS_MODES = ['Road', 'Rail', 'Port', 'Air', 'Other']

function RepeatableSection({ title, addLabel, onAdd, children }: { title?: string; addLabel: string; onAdd: () => void; children: React.ReactNode }) {
  return (
    <div>
      {title && <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-3">{title}</p>}
      <div className="space-y-3">{children}</div>
      <button onClick={onAdd} className="mt-3 flex items-center gap-1.5 text-sm text-[#1a56db] hover:text-[#1a3a5c] transition-colors font-medium">
        <span className="text-lg leading-none">+</span> {addLabel}
      </button>
    </div>
  )
}

function RepeatableRow({ index, onRemove, children }: { index: number; onRemove: () => void; children: React.ReactNode }) {
  return (
    <div className="border border-[#d1d9e0] rounded p-3 bg-[#fafbfc] space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-[#374151]">Record {index + 1}</p>
        <button onClick={onRemove} className="text-xs text-[#9aa5b4] hover:text-red-500 transition-colors">Remove</button>
      </div>
      {children}
    </div>
  )
}

function MultiCheckGroup({ options, values, onChange, cols = 2 }: { options: string[]; values: string[]; onChange: (v: string[]) => void; cols?: number }) {
  function toggle(opt: string) {
    if (opt === 'None') { onChange(values.includes('None') ? [] : ['None']); return }
    const without = values.filter(v => v !== 'None')
    onChange(without.includes(opt) ? without.filter(v => v !== opt) : [...without, opt])
  }
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-${cols} gap-2`}>
      {options.map(o => (
        <label key={o} className={`flex items-center gap-3 px-3 py-2.5 rounded border cursor-pointer text-sm transition-colors
          ${values.includes(o) ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c]' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
          <input type="checkbox" checked={values.includes(o)} onChange={() => toggle(o)} className="accent-[#1a3a5c] shrink-0" />
          {o}
        </label>
      ))}
    </div>
  )
}

function SmallInput({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#374151] mb-1">{label}</label>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder ?? ''} className="w-full border border-[#c8d6e4] rounded px-3 py-2 text-sm text-[#1a2533] focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:border-transparent bg-white" />
    </div>
  )
}

function SimpleRadio({ name, options, value, onChange }: { name: string; options: { val: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(o => (
        <label key={o.val} className={`flex items-center gap-2 px-4 py-2.5 rounded border cursor-pointer text-sm transition-colors
          ${value === o.val ? 'border-[#1a3a5c] bg-[#ebf3ff] text-[#1a3a5c] font-medium' : 'border-[#d1d9e0] bg-white text-[#374151] hover:border-[#a0b4cc]'}`}>
          <input type="radio" name={name} value={o.val} checked={value === o.val} onChange={() => onChange(o.val)} className="accent-[#1a3a5c]" />
          {o.label}
        </label>
      ))}
    </div>
  )
}

export function E05EnvSafetyPage({ e03Data, e04Data, setE04Data, data, onChange, onBack, onSaveExit, onReviewProfile, expansionChangeAreas = [] }: {
  e03Data: E03Data
  e04Data: E04Data
  setE04Data: (partial: Partial<E04Data>) => void
  data: E05Data
  onChange: (partial: Partial<E05Data>) => void
  onBack: () => void
  onSaveExit: () => void
  onReviewProfile: () => void
  expansionChangeAreas?: string[]
}) {
  const [sub, setSub] = useState(1)
  const [saved, setSaved] = useState(false)
  const isMfg = ['manufacturing', 'processing', 'mfg-trading', 'construction'].includes(e04Data.businessNature ?? '')
  const isExpansion = e03Data.projectType === 'expansion' || e03Data.projectType === 'modification'
  const isExpansionOrExisting = isExpansion || e03Data.projectType === 'existing'

  const isEnvSubNA = (key: string) => {
    if (!isExpansion || expansionChangeAreas.length === 0) return false
    const keyMap: Record<string, string[]> = {
      environment: ['chemicals', 'production', 'machinery'],
      air: ['boiler', 'machinery', 'chemicals', 'production'],
      hazmat: ['chemicals'],
      hazwaste: ['chemicals', 'production'],
      solidwaste: ['production'],
      boiler: ['boiler'],
      equipment: ['boiler', 'machinery'],
      factory: ['production', 'building'],
      storage: ['chemicals', 'production'],
      trade: ['production'],
    }
    const changeKeys = keyMap[key] ?? [key]
    return !changeKeys.some(k => expansionChangeAreas.includes(k))
  }
  const inputCls = 'w-full border border-[#c8d6e4] rounded px-3 py-2 text-sm text-[#1a2533] focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:border-transparent bg-white'

  function handleSaveExit() { setSaved(true); setTimeout(() => setSaved(false), 2000); onSaveExit() }
  function handleBack() { if (sub > 1) setSub(sub - 1); else onBack() }
  function handleContinue() { if (sub < 10) setSub(sub + 1); else onReviewProfile() }

  // Auto-derive env characteristics from existing data
  const derivedEnvChars: string[] = []
  if (data.wastewaterType === 'industrial' || data.wastewaterType === 'both') derivedEnvChars.push('Industrial Wastewater')
  if (data.processType?.toLowerCase().includes('chemical') || data.activities.some(a => a.toLowerCase().includes('chemical'))) derivedEnvChars.push('Chemical Processing')

  // Warehouse flag from building
  const buildingHasWarehouse = data.buildingRiskFlags.includes('Warehouse')
  const warehouseMismatch = buildingHasWarehouse && data.warehouseYN === 'no'
  const boilerInAir = data.airEmissionSources.includes('Boiler') && data.boilerYN === 'no'
  const hazMatInStorage = data.storageCategories.includes('Hazardous Materials') && data.hazMatYN === 'no'

  // Effective fire flags = merge building risk flags + fire section
  const effectiveFireFlags = Array.from(new Set([...data.buildingRiskFlags.filter(f => f !== 'None'), ...data.fireFlags.filter(f => f !== 'None')]))

  function toggleFireFlag(f: string) {
    if (f === 'None') { onChange({ fireFlags: data.fireFlags.includes('None') ? [] : ['None'] }); return }
    const without = data.fireFlags.filter(x => x !== 'None')
    onChange({ fireFlags: without.includes(f) ? without.filter(x => x !== f) : [...without, f] })
  }

  // Helpers for repeatable arrays
  function addHazMat() { onChange({ hazMaterials: [...data.hazMaterials, { material: '', purpose: '', maxQuantity: '', unit: '', storageMethod: '', hazardTypes: [], hazardOther: '' }] }) }
  function updateHazMat(i: number, p: Partial<typeof data.hazMaterials[0]>) { onChange({ hazMaterials: data.hazMaterials.map((r, idx) => idx === i ? { ...r, ...p } : r) }) }
  function removeHazMat(i: number) { onChange({ hazMaterials: data.hazMaterials.filter((_, idx) => idx !== i) }) }

  function addHazWaste() { onChange({ hazWastes: [...data.hazWastes, { wasteType: '', quantity: '', unit: '', storageMethod: '', treatment: '' }] }) }
  function updateHazWaste(i: number, p: Partial<typeof data.hazWastes[0]>) { onChange({ hazWastes: data.hazWastes.map((r, idx) => idx === i ? { ...r, ...p } : r) }) }
  function removeHazWaste(i: number) { onChange({ hazWastes: data.hazWastes.filter((_, idx) => idx !== i) }) }

  function addSolidWaste() { onChange({ solidWastes: [...data.solidWastes, { wasteType: '', quantity: '', unit: '', storage: '', treatment: '' }] }) }
  function updateSolidWaste(i: number, p: Partial<typeof data.solidWastes[0]>) { onChange({ solidWastes: data.solidWastes.map((r, idx) => idx === i ? { ...r, ...p } : r) }) }
  function removeSolidWaste(i: number) { onChange({ solidWastes: data.solidWastes.filter((_, idx) => idx !== i) }) }

  function addPressure() { onChange({ pressureEquipment: [...data.pressureEquipment, { equipmentType: '', capacity: '', pressure: '' }] }) }
  function updatePressure(i: number, p: Partial<typeof data.pressureEquipment[0]>) { onChange({ pressureEquipment: data.pressureEquipment.map((r, idx) => idx === i ? { ...r, ...p } : r) }) }
  function removePressure(i: number) { onChange({ pressureEquipment: data.pressureEquipment.filter((_, idx) => idx !== i) }) }

  function addMachinery() { onChange({ dangerousMachineryItems: [...data.dangerousMachineryItems, { machineryType: '', count: '', capacityRating: '' }] }) }
  function updateMachinery(i: number, p: Partial<typeof data.dangerousMachineryItems[0]>) { onChange({ dangerousMachineryItems: data.dangerousMachineryItems.map((r, idx) => idx === i ? { ...r, ...p } : r) }) }
  function removeMachinery(i: number) { onChange({ dangerousMachineryItems: data.dangerousMachineryItems.filter((_, idx) => idx !== i) }) }

  function addStorageItem(cat: string) { onChange({ storageItems: [...data.storageItems, { category: cat, material: '', maxQuantity: '', unit: '', storageArea: '', storageLocation: '', storageType: '' }] }) }
  function updateStorageItem(i: number, p: Partial<typeof data.storageItems[0]>) { onChange({ storageItems: data.storageItems.map((r, idx) => idx === i ? { ...r, ...p } : r) }) }
  function removeStorageItem(i: number) { onChange({ storageItems: data.storageItems.filter((_, idx) => idx !== i) }) }

  function addImport() { onChange({ importedInputs: [...data.importedInputs, { material: '', description: '' }] }) }
  function addExport() { onChange({ exportedProducts: [...data.exportedProducts, { product: '', description: '' }] }) }

  function addApproval() { onChange({ existingApprovalRows: [...data.existingApprovalRows, { department: '', approvalType: '', licenceNumber: '', issueDate: '', expiryDate: '', status: '' }] }) }
  function updateApproval(i: number, p: Partial<typeof data.existingApprovalRows[0]>) { onChange({ existingApprovalRows: data.existingApprovalRows.map((r, idx) => idx === i ? { ...r, ...p } : r) }) }
  function removeApproval(i: number) { onChange({ existingApprovalRows: data.existingApprovalRows.filter((_, idx) => idx !== i) }) }

  function addApplication() { onChange({ existingApplicationRows: [...data.existingApplicationRows, { department: '', service: '', applicationId: '', submissionDate: '', currentStatus: '' }] }) }
  function updateApplication(i: number, p: Partial<typeof data.existingApplicationRows[0]>) { onChange({ existingApplicationRows: data.existingApplicationRows.map((r, idx) => idx === i ? { ...r, ...p } : r) }) }
  function removeApplication(i: number) { onChange({ existingApplicationRows: data.existingApplicationRows.filter((_, idx) => idx !== i) }) }

  function addDoc() { onChange({ docRecords: [...data.docRecords, { category: '', documentName: '' }] }) }
  function updateDoc(i: number, p: Partial<typeof data.docRecords[0]>) { onChange({ docRecords: data.docRecords.map((r, idx) => idx === i ? { ...r, ...p } : r) }) }
  function removeDoc(i: number) { onChange({ docRecords: data.docRecords.filter((_, idx) => idx !== i) }) }

  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 py-5">
        <div className="mb-4">
          <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'My Businesses', href: '#' }, { label: 'Create Business / Project', href: '#' }, { label: 'Business Discovery' }]} />
        </div>
        <CreateStepIndicator current="e05" />

        {/* Context strip */}
        <div className="bg-white border border-[#d1d9e0] rounded mb-4 px-4 py-3 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2">
          <div><p className="text-[10px] font-semibold text-[#9aa5b4] uppercase tracking-wider">Project</p><p className="text-xs font-semibold text-[#1a2533] truncate">{e03Data.name || '—'}</p></div>
          <div><p className="text-[10px] font-semibold text-[#9aa5b4] uppercase tracking-wider">Industry</p><p className="text-xs text-[#374151] truncate">{data.industry || '—'}</p></div>
          <div><p className="text-[10px] font-semibold text-[#9aa5b4] uppercase tracking-wider">Stage</p><p className="text-xs text-[#374151]">{data.projectStage || '—'}</p></div>
          <div><p className="text-[10px] font-semibold text-[#9aa5b4] uppercase tracking-wider">Nature</p><p className="text-xs text-[#374151]">{e04Data.businessNature || '—'}</p></div>
        </div>

        <div className="mb-4">
          <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider">Business Discovery · Final Section</p>
          <h1 className="text-lg font-bold text-[#1a2533] mt-0.5">{ENV_SUBSECTIONS[sub - 1].label}</h1>
        </div>

        <SubsectionNav subsections={ENV_SUBSECTIONS} current={sub} onGo={setSub} />

        {/* NA banner for expansion/modification */}
        {isExpansion && isEnvSubNA(ENV_SUBSECTIONS[sub - 1].key) && (
          <div className="mb-3">
            <NotApplicableBanner reason={`${ENV_SUBSECTIONS[sub - 1].label} was not selected as a change area for this ${e03Data.projectType}`} />
          </div>
        )}

        <div className="bg-white border border-[#d1d9e0] rounded shadow-sm p-6 space-y-6">

          {/* ══ 1. ENVIRONMENT ══ */}
          {sub === 1 && (
            <section aria-labelledby="env-h">
              <h2 id="env-h" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Environmental Characteristics</h2>
              <div className="space-y-5">
                <QuestionBlock question="Does the project involve potentially significant environmental activity?">
                  <SimpleRadio name="envTrigger" value={data.envTrigger}
                    options={[{ val: 'yes', label: 'Yes' }, { val: 'no', label: 'No' }, { val: 'unknown', label: "I don't know" }]}
                    onChange={v => onChange({ envTrigger: v as E05Data['envTrigger'] })} />
                </QuestionBlock>

                {(data.envTrigger === 'yes' || data.envTrigger === 'unknown') && (
                  <div>
                    <p className="text-sm font-medium text-[#1a2533] mb-2">
                      {data.envTrigger === 'unknown'
                        ? 'Select any characteristics you know apply. EKATMA will use your Business Profile to evaluate regulatory applicability.'
                        : 'Which of the following characteristics apply?'}
                    </p>
                    <MultiCheckGroup options={ENV_CHARACTERISTICS} values={data.envCharacteristics}
                      onChange={v => onChange({ envCharacteristics: v })} />
                    {data.envCharacteristics.includes('Other') && (
                      <input type="text" value={data.envCharOther} onChange={e => onChange({ envCharOther: e.target.value })}
                        placeholder="Describe environmental characteristic" className={`${inputCls} mt-2`} />
                    )}
                    {derivedEnvChars.length > 0 && (
                      <div className="mt-3 p-2.5 bg-[#f0f4f8] border border-[#c8d6e4] rounded">
                        <p className="text-xs font-medium text-[#4a5568] mb-1">Already identified from earlier sections:</p>
                        {derivedEnvChars.map(c => (
                          <p key={c} className="text-xs text-[#1a56db]">✓ {c}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {data.envTrigger === 'no' && (
                  <p className="text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">
                    No significant environmental activity indicated. Your Business DNA will still be evaluated by the regulatory rule engine.
                  </p>
                )}

                <div className="p-3 bg-[#f0f4f8] border border-[#c8d6e4] rounded flex items-start gap-2">
                  <span className="text-[#6b7a8d] shrink-0 mt-0.5"><Icon.Info /></span>
                  <p className="text-xs text-[#4a5568]">Environmental Clearance and MPCB Consent to Establish are separate regulatory requirements. They will be evaluated separately by the regulatory engine — no determination is made here.</p>
                </div>
              </div>
            </section>
          )}

          {/* ══ 2. AIR & EMISSIONS ══ */}
          {sub === 2 && (
            <section aria-labelledby="air-h">
              <h2 id="air-h" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Air &amp; Emissions</h2>
              <div className="space-y-5">
                <QuestionBlock question="Will your process generate air emissions?">
                  <YesNoNotSure name="airEmissions" value={data.airEmissions} onChange={v => onChange({ airEmissions: v as E05Data['airEmissions'] })} />
                </QuestionBlock>

                {data.airEmissions === 'no' && (
                  <p className="text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">Air emission details are not applicable.</p>
                )}

                {data.airEmissions === 'yes' && (
                  <>
                    <div>
                      <p className="text-sm font-medium text-[#1a2533] mb-2">Sources of air emissions</p>
                      <MultiCheckGroup options={AIR_SOURCES} values={data.airEmissionSources}
                        onChange={v => onChange({ airEmissionSources: v })} />
                      {data.airEmissionSources.includes('Other') && (
                        <input type="text" value={data.airEmissionSourceOther} onChange={e => onChange({ airEmissionSourceOther: e.target.value })}
                          placeholder="Describe emission source" className={`${inputCls} mt-2`} />
                      )}
                    </div>
                    {boilerInAir && (
                      <ConsistencyWarning message="Boiler is selected as an air emission source, but Boiler = No is set in Equipment. Please review." />
                    )}
                  </>
                )}
              </div>
            </section>
          )}

          {/* ══ 3. HAZARDOUS MATERIALS ══ */}
          {sub === 3 && (
            <section aria-labelledby="hazmat-h">
              <h2 id="hazmat-h" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Hazardous Materials</h2>
              <div className="space-y-5">
                <QuestionBlock question="Will the project manufacture, use, store or handle hazardous materials?">
                  <YesNoNotSure name="hazMatYN" value={data.hazMatYN} onChange={v => onChange({ hazMatYN: v as E05Data['hazMatYN'] })} />
                </QuestionBlock>

                {data.hazMatYN === 'no' && (
                  <p className="text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">Hazardous material inventory is not applicable.</p>
                )}

                {data.hazMatYN === 'yes' && (
                  <RepeatableSection addLabel="Add Another Material" onAdd={addHazMat} title="Hazardous Material Inventory">
                    {data.hazMaterials.map((m, i) => (
                      <RepeatableRow key={i} index={i} onRemove={() => removeHazMat(i)}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <SmallInput label="Material / Chemical" value={m.material} onChange={v => updateHazMat(i, { material: v })} placeholder="e.g. Solvent A" />
                          <SmallInput label="Purpose" value={m.purpose} onChange={v => updateHazMat(i, { purpose: v })} placeholder="e.g. Manufacturing process" />
                          <SmallInput label="Maximum Quantity" value={m.maxQuantity} onChange={v => updateHazMat(i, { maxQuantity: v.replace(/[^0-9.]/g, '') })} placeholder="e.g. 5000" />
                          <SmallInput label="Unit" value={m.unit} onChange={v => updateHazMat(i, { unit: v })} placeholder="e.g. litres, kg" />
                          <div className="sm:col-span-2"><SmallInput label="Storage Method" value={m.storageMethod} onChange={v => updateHazMat(i, { storageMethod: v })} placeholder="e.g. Dedicated chemical store, drums" /></div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-[#374151] mb-2">Hazard Type(s)</p>
                          <MultiCheckGroup options={HAZARD_TYPES} values={m.hazardTypes} onChange={v => updateHazMat(i, { hazardTypes: v })} />
                          {m.hazardTypes.includes('Other') && (
                            <input type="text" value={m.hazardOther} onChange={e => updateHazMat(i, { hazardOther: e.target.value })}
                              placeholder="Describe hazard" className={`${inputCls} mt-2`} />
                          )}
                        </div>
                      </RepeatableRow>
                    ))}
                    {data.hazMaterials.length === 0 && (
                      <p className="text-xs text-[#9aa5b4] italic">No materials added yet.</p>
                    )}
                  </RepeatableSection>
                )}
              </div>
            </section>
          )}

          {/* ══ 4. WASTE ══ */}
          {sub === 4 && (
            <section aria-labelledby="waste-h">
              <h2 id="waste-h" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Waste</h2>
              <div className="space-y-7">
                {/* Hazardous Waste */}
                <div>
                  <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-3">Hazardous Waste</p>
                  <QuestionBlock question="Will the project generate hazardous waste?">
                    <YesNoNotSure name="hazWasteYN" value={data.hazWasteYN} onChange={v => onChange({ hazWasteYN: v as E05Data['hazWasteYN'] })} />
                  </QuestionBlock>
                  {data.hazWasteYN === 'no' && <p className="mt-2 text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">Not applicable.</p>}
                  {data.hazWasteYN === 'yes' && (
                    <div className="mt-3">
                      <RepeatableSection addLabel="Add Waste Type" onAdd={addHazWaste}>
                        {data.hazWastes.map((w, i) => (
                          <RepeatableRow key={i} index={i} onRemove={() => removeHazWaste(i)}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <SmallInput label="Waste Type" value={w.wasteType} onChange={v => updateHazWaste(i, { wasteType: v })} />
                              <SmallInput label="Quantity" value={w.quantity} onChange={v => updateHazWaste(i, { quantity: v })} />
                              <SmallInput label="Unit" value={w.unit} onChange={v => updateHazWaste(i, { unit: v })} />
                              <SmallInput label="Storage Method" value={w.storageMethod} onChange={v => updateHazWaste(i, { storageMethod: v })} />
                              <div className="sm:col-span-2"><SmallInput label="Treatment / Disposal" value={w.treatment} onChange={v => updateHazWaste(i, { treatment: v })} /></div>
                            </div>
                          </RepeatableRow>
                        ))}
                        {data.hazWastes.length === 0 && <p className="text-xs text-[#9aa5b4] italic">No waste records yet.</p>}
                      </RepeatableSection>
                    </div>
                  )}
                </div>

                <div className="border-t border-[#e8edf2]" />

                {/* General Solid Waste */}
                <div>
                  <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-3">General Solid Waste</p>
                  <QuestionBlock question="Will the project generate significant solid waste?">
                    <SimpleRadio name="solidWasteYN" value={data.solidWasteYN}
                      options={[{ val: 'yes', label: 'Yes' }, { val: 'no', label: 'No' }]}
                      onChange={v => onChange({ solidWasteYN: v as E05Data['solidWasteYN'] })} />
                  </QuestionBlock>
                  {data.solidWasteYN === 'no' && <p className="mt-2 text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">Not applicable.</p>}
                  {data.solidWasteYN === 'yes' && (
                    <div className="mt-3">
                      <RepeatableSection addLabel="Add Waste Entry" onAdd={addSolidWaste}>
                        {data.solidWastes.map((w, i) => (
                          <RepeatableRow key={i} index={i} onRemove={() => removeSolidWaste(i)}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <SmallInput label="Waste Type" value={w.wasteType} onChange={v => updateSolidWaste(i, { wasteType: v })} />
                              <SmallInput label="Quantity" value={w.quantity} onChange={v => updateSolidWaste(i, { quantity: v })} />
                              <SmallInput label="Unit" value={w.unit} onChange={v => updateSolidWaste(i, { unit: v })} />
                              <SmallInput label="Storage" value={w.storage} onChange={v => updateSolidWaste(i, { storage: v })} />
                              <div className="sm:col-span-2"><SmallInput label="Treatment / Disposal" value={w.treatment} onChange={v => updateSolidWaste(i, { treatment: v })} /></div>
                            </div>
                          </RepeatableRow>
                        ))}
                        {data.solidWastes.length === 0 && <p className="text-xs text-[#9aa5b4] italic">No waste records yet.</p>}
                      </RepeatableSection>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ══ 5. EQUIPMENT ══ */}
          {sub === 5 && (
            <section aria-labelledby="equip-h">
              <h2 id="equip-h" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Equipment</h2>
              <div className="space-y-7">

                {/* Boiler */}
                <div>
                  <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-3">Boiler</p>
                  <QuestionBlock question="Will the project use a boiler?">
                    <SimpleRadio name="boilerYN" value={data.boilerYN}
                      options={[{ val: 'yes', label: 'Yes' }, { val: 'no', label: 'No' }]}
                      onChange={v => onChange({ boilerYN: v as E05Data['boilerYN'] })} />
                  </QuestionBlock>
                  {data.boilerYN === 'no' && <p className="mt-2 text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">Boiler details not applicable.</p>}
                  {data.boilerYN === 'yes' && (
                    <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <SmallInput label="Capacity" value={data.boilerCapacity} onChange={v => onChange({ boilerCapacity: v })} placeholder="e.g. 5 TPH" />
                      <SmallInput label="Fuel" value={data.boilerFuel} onChange={v => onChange({ boilerFuel: v })} placeholder="e.g. Coal, Gas" />
                      <SmallInput label="Operating Pressure" value={data.boilerPressure} onChange={v => onChange({ boilerPressure: v })} placeholder="e.g. 10 kg/cm²" />
                      <SmallInput label="Number of Boilers" value={data.boilerCount} onChange={v => onChange({ boilerCount: v.replace(/\D/g, '') })} placeholder="e.g. 2" />
                    </div>
                  )}
                  {boilerInAir && (
                    <div className="mt-2"><ConsistencyWarning message="Boiler is selected as an air emission source but Boiler is set to No. Please review." /></div>
                  )}
                </div>

                <div className="border-t border-[#e8edf2]" />

                {/* Pressure Vessel */}
                <div>
                  <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-3">Pressure Vessels / Pressurised Equipment</p>
                  <QuestionBlock question="Will the project use pressure vessels or other pressurised equipment?">
                    <YesNoNotSure name="pressureYN" value={data.pressureVesselYN} onChange={v => onChange({ pressureVesselYN: v as E05Data['pressureVesselYN'] })} />
                  </QuestionBlock>
                  {data.pressureVesselYN === 'no' && <p className="mt-2 text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">Not applicable.</p>}
                  {data.pressureVesselYN === 'yes' && (
                    <div className="mt-3">
                      <RepeatableSection addLabel="Add Equipment" onAdd={addPressure}>
                        {data.pressureEquipment.map((e, i) => (
                          <RepeatableRow key={i} index={i} onRemove={() => removePressure(i)}>
                            <div className="grid grid-cols-3 gap-3">
                              <SmallInput label="Equipment Type" value={e.equipmentType} onChange={v => updatePressure(i, { equipmentType: v })} />
                              <SmallInput label="Capacity" value={e.capacity} onChange={v => updatePressure(i, { capacity: v })} />
                              <SmallInput label="Operating Pressure" value={e.pressure} onChange={v => updatePressure(i, { pressure: v })} />
                            </div>
                          </RepeatableRow>
                        ))}
                        {data.pressureEquipment.length === 0 && <p className="text-xs text-[#9aa5b4] italic">No equipment records yet.</p>}
                      </RepeatableSection>
                    </div>
                  )}
                </div>

                <div className="border-t border-[#e8edf2]" />

                {/* Dangerous Machinery */}
                <div>
                  <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-3">Dangerous / High-Risk Machinery</p>
                  <QuestionBlock question="Will the project use dangerous or high-risk machinery?">
                    <YesNoNotSure name="dangerMachYN" value={data.dangerousMachineryYN} onChange={v => onChange({ dangerousMachineryYN: v as E05Data['dangerousMachineryYN'] })} />
                  </QuestionBlock>
                  {data.dangerousMachineryYN === 'no' && <p className="mt-2 text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">Not applicable.</p>}
                  {data.dangerousMachineryYN === 'yes' && (
                    <div className="mt-3">
                      <RepeatableSection addLabel="Add Machinery" onAdd={addMachinery}>
                        {data.dangerousMachineryItems.map((m, i) => (
                          <RepeatableRow key={i} index={i} onRemove={() => removeMachinery(i)}>
                            <div className="grid grid-cols-3 gap-3">
                              <SmallInput label="Machinery Type" value={m.machineryType} onChange={v => updateMachinery(i, { machineryType: v })} />
                              <SmallInput label="Number" value={m.count} onChange={v => updateMachinery(i, { count: v.replace(/\D/g, '') })} />
                              <SmallInput label="Capacity / Rating" value={m.capacityRating} onChange={v => updateMachinery(i, { capacityRating: v })} />
                            </div>
                          </RepeatableRow>
                        ))}
                        {data.dangerousMachineryItems.length === 0 && <p className="text-xs text-[#9aa5b4] italic">No machinery records yet.</p>}
                      </RepeatableSection>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ══ 6. FACTORY & FIRE ══ */}
          {sub === 6 && (
            <section aria-labelledby="ff-h">
              <h2 id="ff-h" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Factory &amp; Fire</h2>
              <div className="space-y-7">
                {/* Factory */}
                <div>
                  <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-3">Factory / Industrial Establishment</p>
                  {!isMfg ? (
                    <p className="text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">Factory branch not applicable for non-manufacturing activities.</p>
                  ) : (
                    <>
                      <QuestionBlock question="Will the premises function as a factory / industrial establishment?">
                        <YesNoNotSure name="factoryYN" value={data.factoryYN} onChange={v => onChange({ factoryYN: v as E05Data['factoryYN'] })} />
                      </QuestionBlock>
                      {data.factoryYN === 'yes' && (
                        <div className="mt-3 p-3 bg-[#f0f4f8] border border-[#c8d6e4] rounded">
                          <p className="text-xs font-medium text-[#4a5568] mb-1">Factory context inputs (reused from Business DNA):</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1 text-xs text-[#374151]">
                            {data.workforceTotal && <span>Workforce: {data.workforceTotal}</span>}
                            {data.shifts && <span>Shifts: {data.shifts}</span>}
                            {data.operatingHoursPerDay && <span>Hrs/Day: {data.operatingHoursPerDay}</span>}
                            {data.dangerousMachineryYN && <span>Dangerous Mach: {data.dangerousMachineryYN}</span>}
                            {data.pressureVesselYN && <span>Pressure Vessels: {data.pressureVesselYN}</span>}
                            {data.hazMatYN && <span>Hazardous Mat: {data.hazMatYN}</span>}
                          </div>
                          <p className="mt-2 text-xs text-[#9aa5b4]">Factory / DISH applicability will be evaluated by the regulatory rule engine.</p>
                        </div>
                      )}
                      {data.factoryYN === 'not-sure' && (
                        <p className="mt-2 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded px-3 py-2">Needs Verification — factory applicability will be evaluated after profile review.</p>
                      )}
                    </>
                  )}
                </div>

                <div className="border-t border-[#e8edf2]" />

                {/* Fire */}
                <div>
                  <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-3">Fire &amp; Occupancy Characteristics</p>
                  <p className="text-sm text-[#374151] mb-3">Does the project / building involve any of the following?</p>
                  {effectiveFireFlags.filter(f => f !== 'None').length > 0 && (
                    <div className="mb-3 p-2.5 bg-[#f0f4f8] border border-[#c8d6e4] rounded">
                      <p className="text-xs font-medium text-[#4a5568] mb-1">Already identified from Building section:</p>
                      {effectiveFireFlags.filter(f => f !== 'None').map(f => <p key={f} className="text-xs text-[#1a56db]">✓ {f}</p>)}
                    </div>
                  )}
                  <MultiCheckGroup options={FIRE_FLAGS_LIST} values={data.fireFlags} onChange={v => onChange({ fireFlags: v })} />
                  <p className="mt-2 text-xs text-[#9aa5b4]">Selecting "None" clears other selections. These factual characteristics inform later regulatory routing. No Fire NOC applicability is determined here.</p>
                </div>
              </div>
            </section>
          )}

          {/* ══ 7. STORAGE & WAREHOUSE ══ */}
          {sub === 7 && (
            <section aria-labelledby="store-h">
              <h2 id="store-h" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Storage &amp; Warehouse</h2>
              <div className="space-y-7">
                <div>
                  <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-3">Storage</p>
                  <p className="text-sm text-[#374151] mb-3">What will the project store?</p>
                  <MultiCheckGroup options={STORAGE_CATEGORIES} values={data.storageCategories}
                    onChange={v => { onChange({ storageCategories: v }); if (v.includes('None')) onChange({ storageItems: [] }) }} />
                  {hazMatInStorage && (
                    <div className="mt-3"><ConsistencyWarning message="Hazardous Materials is selected in Storage but Hazardous Materials = No was indicated earlier. Please review." /></div>
                  )}
                  {data.storageCategories.length > 0 && !data.storageCategories.includes('None') && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-3">Storage Details</p>
                      <RepeatableSection addLabel="Add Storage Item" onAdd={() => addStorageItem('')}>
                        {data.storageItems.map((s, i) => (
                          <RepeatableRow key={i} index={i} onRemove={() => removeStorageItem(i)}>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-[#374151] mb-1">Category</label>
                                <select value={s.category} onChange={e => updateStorageItem(i, { category: e.target.value })} className={inputCls}>
                                  <option value="">Select…</option>
                                  {STORAGE_CATEGORIES.filter(c => c !== 'None').map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                              </div>
                              <SmallInput label="Material / Item" value={s.material} onChange={v => updateStorageItem(i, { material: v })} />
                              <SmallInput label="Max Quantity" value={s.maxQuantity} onChange={v => updateStorageItem(i, { maxQuantity: v })} />
                              <SmallInput label="Unit" value={s.unit} onChange={v => updateStorageItem(i, { unit: v })} />
                              <SmallInput label="Storage Area (sq.m)" value={s.storageArea} onChange={v => updateStorageItem(i, { storageArea: v })} />
                              <SmallInput label="Storage Location" value={s.storageLocation} onChange={v => updateStorageItem(i, { storageLocation: v })} />
                              <div className="sm:col-span-3"><SmallInput label="Storage Type" value={s.storageType} onChange={v => updateStorageItem(i, { storageType: v })} placeholder="e.g. Tank, Drum, Rack" /></div>
                            </div>
                          </RepeatableRow>
                        ))}
                        {data.storageItems.length === 0 && <p className="text-xs text-[#9aa5b4] italic">No storage records added.</p>}
                      </RepeatableSection>
                    </div>
                  )}
                </div>

                <div className="border-t border-[#e8edf2]" />

                {/* Warehouse */}
                <div>
                  <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-3">Warehouse</p>
                  <QuestionBlock question="Will you operate a warehouse?">
                    <SimpleRadio name="warehouseYN" value={data.warehouseYN}
                      options={[{ val: 'yes', label: 'Yes' }, { val: 'no', label: 'No' }]}
                      onChange={v => onChange({ warehouseYN: v as E05Data['warehouseYN'] })} />
                  </QuestionBlock>
                  {data.warehouseYN === 'no' && <p className="mt-2 text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">Warehouse details not applicable.</p>}
                  {data.warehouseYN === 'yes' && (
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <SmallInput label="Warehouse Area (sq.m)" value={data.warehouseArea} onChange={v => onChange({ warehouseArea: v.replace(/[^0-9.]/g, '') })} placeholder="e.g. 1000" />
                      <SmallInput label="Material Stored" value={data.warehouseMaterial} onChange={v => onChange({ warehouseMaterial: v })} placeholder="e.g. Finished goods" />
                      <div>
                        <p className="text-xs font-medium text-[#374151] mb-1">Hazardous / Flammable Material?</p>
                        <SimpleRadio name="warehouseHaz" value={data.warehouseHazardous}
                          options={[{ val: 'yes', label: 'Yes' }, { val: 'no', label: 'No' }]}
                          onChange={v => onChange({ warehouseHazardous: v as E05Data['warehouseHazardous'] })} />
                      </div>
                    </div>
                  )}
                  {warehouseMismatch && (
                    <div className="mt-3"><ConsistencyWarning message="Building flags indicate a Warehouse, but Warehouse = No is selected here. Please review." /></div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ══ 8. TRADE & LOGISTICS ══ */}
          {sub === 8 && (
            <section aria-labelledby="trade-h">
              <h2 id="trade-h" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Trade &amp; Logistics</h2>
              <div className="space-y-6">
                <QuestionBlock question="Will the business import or export?">
                  <SimpleRadio name="importExport" value={data.importExport}
                    options={[{ val: 'import', label: 'Import' }, { val: 'export', label: 'Export' }, { val: 'both', label: 'Both' }, { val: 'neither', label: 'Neither' }]}
                    onChange={v => onChange({ importExport: v as E05Data['importExport'] })} />
                </QuestionBlock>

                {(data.importExport === 'import' || data.importExport === 'both') && (
                  <div>
                    <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-2">Major Imported Inputs</p>
                    <RepeatableSection addLabel="Add Import Input" onAdd={addImport}>
                      {data.importedInputs.map((imp, i) => (
                        <div key={i} className="border border-[#d1d9e0] rounded p-3 bg-[#fafbfc] grid grid-cols-2 gap-3">
                          <div className="flex justify-between col-span-2 items-center">
                            <p className="text-xs font-medium text-[#374151]">Input {i + 1}</p>
                            <button onClick={() => onChange({ importedInputs: data.importedInputs.filter((_, idx) => idx !== i) })} className="text-xs text-[#9aa5b4] hover:text-red-500">Remove</button>
                          </div>
                          <SmallInput label="Material / Input" value={imp.material} onChange={v => onChange({ importedInputs: data.importedInputs.map((r, idx) => idx === i ? { ...r, material: v } : r) })} />
                          <SmallInput label="Description (optional)" value={imp.description} onChange={v => onChange({ importedInputs: data.importedInputs.map((r, idx) => idx === i ? { ...r, description: v } : r) })} />
                        </div>
                      ))}
                      {data.importedInputs.length === 0 && <p className="text-xs text-[#9aa5b4] italic">No inputs added yet.</p>}
                    </RepeatableSection>
                  </div>
                )}

                {(data.importExport === 'export' || data.importExport === 'both') && (
                  <div>
                    <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-2">Major Exported Products</p>
                    {data.products.length > 0 && <p className="text-xs text-[#9aa5b4] mb-2">Existing products: {data.products.map(p => p.name).join(', ')}</p>}
                    <RepeatableSection addLabel="Add Exported Product" onAdd={addExport}>
                      {data.exportedProducts.map((exp, i) => (
                        <div key={i} className="border border-[#d1d9e0] rounded p-3 bg-[#fafbfc] grid grid-cols-2 gap-3">
                          <div className="flex justify-between col-span-2 items-center">
                            <p className="text-xs font-medium text-[#374151]">Product {i + 1}</p>
                            <button onClick={() => onChange({ exportedProducts: data.exportedProducts.filter((_, idx) => idx !== i) })} className="text-xs text-[#9aa5b4] hover:text-red-500">Remove</button>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-[#374151] mb-1">Product</label>
                            <input type="text" value={exp.product} onChange={e => onChange({ exportedProducts: data.exportedProducts.map((r, idx) => idx === i ? { ...r, product: e.target.value } : r) })}
                              list="prod-export-list" className={inputCls} />
                            <datalist id="prod-export-list">{data.products.map(p => <option key={p.id} value={p.name} />)}</datalist>
                          </div>
                          <SmallInput label="Description (optional)" value={exp.description} onChange={v => onChange({ exportedProducts: data.exportedProducts.map((r, idx) => idx === i ? { ...r, description: v } : r) })} />
                        </div>
                      ))}
                      {data.exportedProducts.length === 0 && <p className="text-xs text-[#9aa5b4] italic">No products added yet.</p>}
                    </RepeatableSection>
                  </div>
                )}

                {data.importExport === 'neither' && (
                  <p className="text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">Import / Export details not applicable.</p>
                )}

                <div className="border-t border-[#e8edf2]" />

                <QuestionBlock question="Will the project involve significant logistics movement?">
                  <SimpleRadio name="logisticsYN" value={data.logisticsYN}
                    options={[{ val: 'yes', label: 'Yes' }, { val: 'no', label: 'No' }]}
                    onChange={v => onChange({ logisticsYN: v as E05Data['logisticsYN'] })} />
                </QuestionBlock>

                {data.logisticsYN === 'no' && <p className="text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">Logistics details not applicable.</p>}
                {data.logisticsYN === 'yes' && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-2">Transport Modes</p>
                      <MultiCheckGroup options={LOGISTICS_MODES} values={data.logisticsModes} onChange={v => onChange({ logisticsModes: v })} />
                      {data.logisticsModes.includes('Other') && (
                        <input type="text" value={data.logisticsModeOther} onChange={e => onChange({ logisticsModeOther: e.target.value })}
                          placeholder="Describe transport mode" className={`${inputCls} mt-2`} />
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#374151] mb-1">Approximate Daily Vehicle Movement <span className="font-normal text-[#9aa5b4]">(optional)</span></label>
                      <div className="flex gap-2 items-center">
                        <input type="text" inputMode="numeric" value={data.vehicleMovementPerDay}
                          onChange={e => onChange({ vehicleMovementPerDay: e.target.value.replace(/\D/g, '') })}
                          placeholder="e.g. 20" className={`${inputCls} max-w-[140px]`} />
                        <span className="text-sm text-[#6b7a8d]">vehicles/day</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ══ 9. EXISTING REGULATORY ══ */}
          {sub === 9 && (
            <section aria-labelledby="reg-h">
              <h2 id="reg-h" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Existing Regulatory Context</h2>
              <div className="space-y-7">
                {/* Existing Approvals */}
                <div>
                  <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-3">Existing Approvals</p>
                  {e04Data.existingApprovals && e04Data.existingApprovals !== 'not-sure' ? (
                    <ReusedAnswerBlock label="Existing Approvals / Licences / NOCs"
                      value={{ yes: 'Yes', no: 'No', 'not-sure': 'Not Sure' }[e04Data.existingApprovals] ?? e04Data.existingApprovals}
                      source="Basic Requirements" />
                  ) : (
                    <QuestionBlock question="Does this project already have approvals, licences or NOCs?">
                      <YesNoNotSure name="existingApprovalsEdit" value={e04Data.existingApprovals}
                        onChange={value => setE04Data({ existingApprovals: value as E04Data['existingApprovals'] })} />
                    </QuestionBlock>
                  )}

                  {e04Data.existingApprovals === 'no' && (
                    <p className="mt-2 text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">No existing approval records to capture.</p>
                  )}
                  {e04Data.existingApprovals === 'not-sure' && (
                    <p className="mt-2 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded px-3 py-2">Needs Verification — you can add records if any approvals are identified.</p>
                  )}
                  {(e04Data.existingApprovals === 'yes' || e04Data.existingApprovals === 'not-sure') && (
                    <div className="mt-3">
                      <RepeatableSection addLabel="Add Existing Approval" onAdd={addApproval} title="Approval Records">
                        {data.existingApprovalRows.map((a, i) => (
                          <RepeatableRow key={i} index={i} onRemove={() => removeApproval(i)}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <SmallInput label="Department" value={a.department} onChange={v => updateApproval(i, { department: v })} placeholder="e.g. MPCB" />
                              <SmallInput label="Approval / Licence / NOC" value={a.approvalType} onChange={v => updateApproval(i, { approvalType: v })} placeholder="e.g. Consent to Establish" />
                              <SmallInput label="Licence / Certificate Number" value={a.licenceNumber} onChange={v => updateApproval(i, { licenceNumber: v })} />
                              <div>
                                <label className="block text-xs font-medium text-[#374151] mb-1">Status</label>
                                <select value={a.status} onChange={e => updateApproval(i, { status: e.target.value })} className={inputCls}>
                                  <option value="">Select…</option>
                                  {APPROVAL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                              </div>
                              <SmallInput label="Issue Date" value={a.issueDate} onChange={v => updateApproval(i, { issueDate: v })} placeholder="DD/MM/YYYY" />
                              <SmallInput label="Expiry Date (or N/A)" value={a.expiryDate} onChange={v => updateApproval(i, { expiryDate: v })} placeholder="DD/MM/YYYY or N/A" />
                            </div>
                            <p className="text-xs text-[#9aa5b4]">Certificate upload is optional — manage documents in the Document Centre after project creation.</p>
                          </RepeatableRow>
                        ))}
                        {data.existingApprovalRows.length === 0 && <p className="text-xs text-[#9aa5b4] italic">No approval records added yet.</p>}
                      </RepeatableSection>
                    </div>
                  )}
                </div>

                <div className="border-t border-[#e8edf2]" />

                {/* Existing Applications */}
                <div>
                  <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-3">Existing Applications In Progress</p>
                  {!isExpansionOrExisting && e03Data.projectType === 'new' ? (
                    <p className="text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">Typically not applicable for a completely new business with no previous applications. Add records below if any apply.</p>
                  ) : null}
                  <QuestionBlock question="Do you currently have any regulatory applications in progress?">
                    <SimpleRadio name="existingAppYN" value={data.existingApplicationYN}
                      options={[{ val: 'yes', label: 'Yes' }, { val: 'no', label: 'No' }]}
                      onChange={v => onChange({ existingApplicationYN: v as E05Data['existingApplicationYN'] })} />
                  </QuestionBlock>
                  {data.existingApplicationYN === 'no' && <p className="mt-2 text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">No in-progress application records to capture.</p>}
                  {data.existingApplicationYN === 'yes' && (
                    <div className="mt-3">
                      <RepeatableSection addLabel="Add Existing Application" onAdd={addApplication} title="Application Records">
                        {data.existingApplicationRows.map((a, i) => (
                          <RepeatableRow key={i} index={i} onRemove={() => removeApplication(i)}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <SmallInput label="Department" value={a.department} onChange={v => updateApplication(i, { department: v })} placeholder="e.g. MIDC" />
                              <SmallInput label="Service" value={a.service} onChange={v => updateApplication(i, { service: v })} placeholder="e.g. Building Amendment" />
                              <SmallInput label="Application ID" value={a.applicationId} onChange={v => updateApplication(i, { applicationId: v })} />
                              <SmallInput label="Submission Date" value={a.submissionDate} onChange={v => updateApplication(i, { submissionDate: v })} placeholder="DD/MM/YYYY" />
                              <div className="sm:col-span-2"><SmallInput label="Current Status" value={a.currentStatus} onChange={v => updateApplication(i, { currentStatus: v })} placeholder="e.g. Under Review" /></div>
                            </div>
                          </RepeatableRow>
                        ))}
                        {data.existingApplicationRows.length === 0 && <p className="text-xs text-[#9aa5b4] italic">No application records added yet.</p>}
                      </RepeatableSection>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ══ 10. ATTRIBUTES & DOCUMENTS ══ */}
          {sub === 10 && (
            <section aria-labelledby="attr-h">
              <h2 id="attr-h" className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wider mb-4 pb-2 border-b border-[#e8edf2]">Incentive Attributes &amp; Documents</h2>
              <div className="space-y-7">
                {/* Incentive Attributes */}
                <div>
                  <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-3">Incentive Attributes</p>
                  <p className="text-xs text-[#6b7a8d] mb-3">Select any characteristics that apply beyond what's already captured. The incentive engine will use your full Business Profile — sector, location, classification, investment, and employment are already known.</p>

                  {/* Show reused classification */}
                  {data.classification === 'msme' && (
                    <div className="mb-3 p-2.5 bg-[#f0f4f8] border border-[#c8d6e4] rounded">
                      <p className="text-xs text-[#4a5568]">✓ MSME — reused from classification</p>
                    </div>
                  )}
                  {(data.importExport === 'export' || data.importExport === 'both') && (
                    <div className="mb-3 p-2.5 bg-[#f0f4f8] border border-[#c8d6e4] rounded">
                      <p className="text-xs text-[#4a5568]">✓ Export Oriented — reused from Trade section</p>
                    </div>
                  )}
                  {data.activities.some(a => a.toLowerCase().includes('r&d') || a.toLowerCase().includes('research')) && (
                    <div className="mb-3 p-2.5 bg-[#f0f4f8] border border-[#c8d6e4] rounded">
                      <p className="text-xs text-[#4a5568]">✓ R&D — reused from Activities section</p>
                    </div>
                  )}

                  <MultiCheckGroup options={INCENTIVE_OPTIONS.filter(o => {
                    if (o === 'MSME' && data.classification === 'msme') return false
                    if (o === 'Export Oriented' && (data.importExport === 'export' || data.importExport === 'both')) return false
                    if (o === 'R&D Intensive' && data.activities.some(a => a.toLowerCase().includes('r&d'))) return false
                    return true
                  })} values={data.incentiveAttributes} onChange={v => onChange({ incentiveAttributes: v })} />
                  <p className="mt-2 text-xs text-[#9aa5b4]">Incentive scheme eligibility will be evaluated later — no conclusions are generated here.</p>
                </div>

                <div className="border-t border-[#e8edf2]" />

                {/* Documents */}
                <div>
                  <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-3">Project Documents</p>
                  <QuestionBlock question="Do you already have project documents?">
                    <SimpleRadio name="docAvailability" value={data.docAvailability}
                      options={[{ val: 'yes', label: 'Yes' }, { val: 'some', label: 'Some' }, { val: 'no', label: 'No' }]}
                      onChange={v => onChange({ docAvailability: v as E05Data['docAvailability'] })} />
                  </QuestionBlock>

                  {data.docAvailability === 'no' && (
                    <p className="mt-2 text-xs text-[#6b7a8d] bg-[#f8f9fb] border border-[#d1d9e0] rounded px-3 py-2">You can add documents later from the Document Centre. No documents are required to complete Business Discovery.</p>
                  )}

                  {(data.docAvailability === 'yes' || data.docAvailability === 'some') && (
                    <div className="mt-3">
                      <p className="text-xs text-[#6b7a8d] mb-3">This is optional. You can manage and reuse project documents later from the Document Centre.</p>
                      <RepeatableSection addLabel="Add Available Document" onAdd={addDoc} title="Available Documents">
                        {data.docRecords.map((d, i) => (
                          <RepeatableRow key={i} index={i} onRemove={() => removeDoc(i)}>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-[#374151] mb-1">Category</label>
                                <select value={d.category} onChange={e => updateDoc(i, { category: e.target.value })} className={inputCls}>
                                  <option value="">Select…</option>
                                  {DOC_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                              </div>
                              <SmallInput label="Document Name" value={d.documentName} onChange={v => updateDoc(i, { documentName: v })} placeholder="e.g. Project Report" />
                            </div>
                            <p className="text-xs text-[#9aa5b4]">Upload is optional at this stage — use the Document Centre later.</p>
                          </RepeatableRow>
                        ))}
                        {data.docRecords.length === 0 && <p className="text-xs text-[#9aa5b4] italic">No documents added yet.</p>}
                      </RepeatableSection>
                    </div>
                  )}
                </div>

                {/* E05 Completion message */}
                <div className="p-4 bg-[#edf4ff] border border-[#b8d0f5] rounded">
                  <p className="text-sm font-semibold text-[#1a3a5c] mb-1">Business Discovery Complete</p>
                  <p className="text-xs text-[#4a5568]">Review your information before EKATMA generates your personalised regulatory journey. You can update any section before confirming your Business Profile.</p>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Action bar */}
        <div className="mt-4 flex items-center gap-3">
          <button onClick={handleBack} className="border border-[#d1d9e0] text-[#374151] text-sm font-medium px-5 py-2.5 rounded hover:bg-[#f0f4f8] transition-colors">
            Back
          </button>
          <button onClick={handleSaveExit} className="border border-[#d1d9e0] text-[#374151] text-sm font-medium px-5 py-2.5 rounded hover:bg-[#f0f4f8] transition-colors">
            Save &amp; Exit
          </button>
          {saved && <span className="text-xs text-[#22c55e] font-medium">Draft Saved</span>}
          <div className="flex-1" />
          {sub < 10 ? (
            <button onClick={handleContinue} className="bg-[#1a3a5c] text-white text-sm font-semibold px-6 py-2.5 rounded hover:bg-[#0f2540] transition-colors">
              Continue
            </button>
          ) : (
            <button onClick={onReviewProfile} className="bg-[#1a56db] text-white text-sm font-semibold px-6 py-2.5 rounded hover:bg-[#1a3a5c] transition-colors flex items-center gap-2">
              Review Business Profile →
            </button>
          )}
        </div>
      </div>
    </main>
  )
}

// ─── E06 — Review helpers ─────────────────────────────────────────────────────
type DnaGroup = 'self-declared' | 'needs-input' | 'not-applicable' | 'needs-verification' | 'verified'

function GroupBadge({ group }: { group: DnaGroup }) {
  const cfg: Record<DnaGroup, { label: string; cls: string }> = {
    'self-declared':      { label: 'Self-declared',      cls: 'bg-[#f0fdf4] text-[#166534] border-[#bbf7d0]' },
    'needs-input':        { label: 'Needs your input',   cls: 'bg-[#fffbeb] text-[#92400e] border-[#fde68a]' },
    'not-applicable':     { label: 'Not applicable',     cls: 'bg-[#f8f9fb] text-[#6b7a8d] border-[#d1d9e0]' },
    'needs-verification': { label: 'Needs verification', cls: 'bg-[#ebf3ff] text-[#1a3a5c] border-[#b8d0f5]' },
    'verified':           { label: 'Verified',           cls: 'bg-[#f0fdf4] text-[#166534] border-[#86efac]' },
  }
  const { label, cls } = cfg[group]
  return <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${cls}`}>{label}</span>
}

function ReviewFieldRow({ label, value, isNA = false, note }: { label: string; value?: React.ReactNode; isNA?: boolean; note?: string }) {
  if (isNA) return (
    <div className="flex items-baseline gap-3 py-1.5">
      <span className="text-xs text-[#9aa5b4] w-36 shrink-0">{label}</span>
      <span className="text-xs text-[#9aa5b4] italic">Not applicable</span>
    </div>
  )
  if (!value && value !== 0) return null
  return (
    <div className="flex items-baseline gap-3 py-1.5">
      <span className="text-xs text-[#6b7a8d] w-36 shrink-0">{label}</span>
      <span className="text-sm text-[#1a2533] flex-1">{value}</span>
      {note && <span className="text-xs text-[#9aa5b4] italic">{note}</span>}
    </div>
  )
}

function ReviewSection({ title, group, children, onEdit, defaultOpen = false }: {
  title: string; group: DnaGroup; children: React.ReactNode; onEdit?: () => void; defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-[#e8edf2] rounded overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center gap-3 px-4 py-3 bg-[#f8f9fb] hover:bg-[#f0f4f8] transition-colors text-left"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className={`text-sm font-semibold text-[#1a2533] flex-1`}>{title}</span>
        <GroupBadge group={group} />
        <svg className={`w-4 h-4 text-[#9aa5b4] shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      {open && (
        <div className="px-4 py-3 bg-white divide-y divide-[#f8f9fb]">
          {children}
          {onEdit && (
            <div className="pt-3 mt-1">
              <button type="button" onClick={onEdit} className="text-xs text-[#1a56db] font-medium hover:underline">Edit this section in Business Discovery</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── E06 — Business Profile Review ───────────────────────────────────────────
export function BusinessProfileReviewPage({ e03Data, e04Data, e05Data, expansionChangeAreas, onBack, onConfirmed, e06Confirmed }: {
  e03Data: E03Data; e04Data: E04Data; e05Data: E05Data; expansionChangeAreas: string[]
  onBack: () => void; onConfirmed: () => void; e06Confirmed: boolean
}) {
  const isExpansion = e03Data.projectType === 'expansion' || e03Data.projectType === 'modification'
  const isMfg = ['manufacturing', 'processing', 'mfg-trading', 'construction'].includes(e04Data.businessNature ?? '')
  const [confirmModal, setConfirmModal] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState(0)
  const [assistantOpen, setAssistantOpen] = useState(false)
  const { openAssistant, pageContext } = useRegulatoryAssistant()

  // Simulate generation steps on confirm
  function handleConfirm() {
    setConfirmModal(false)
    setGenerating(true)
    let step = 0
    const interval = setInterval(() => {
      step++; setGenerationStep(step)
      if (step >= 5) { clearInterval(interval); setGenerating(false); onConfirmed() }
    }, 700)
  }

  const GENERATION_STEPS = [
    'Confirming Business DNA',
    'Evaluating Regulatory Applicability',
    'Building Dependency Graph',
    'Generating Personalised Journey',
    'Evaluating Incentive Attributes',
  ]

  // Derive profile completion groups for each DNA section
  type Group = 'self-declared' | 'needs-input' | 'not-applicable' | 'needs-verification'
  const sections: { label: string; group: Group; detail?: string }[] = [
    {
      label: 'Identity & Classification',
      group: e05Data.legalEntityType ? 'self-declared' : 'needs-input',
    },
    {
      label: 'Industry, Activities & Products',
      group: e05Data.industry && e05Data.activities.length > 0 ? 'self-declared' : 'needs-input',
    },
    {
      label: 'Location & Land',
      group: e05Data.district ? (e04Data.midc === 'not-sure' ? 'needs-verification' : 'self-declared') : 'needs-input',
      detail: e04Data.midc === 'not-sure' ? 'MIDC status unconfirmed' : undefined,
    },
    {
      label: 'MIDC / Land Acquisition',
      group: e04Data.midc === 'no' ? 'not-applicable'
        : e04Data.midc === 'not-sure' ? 'needs-verification'
        : e05Data.midcEstate ? 'self-declared' : 'needs-input',
      detail: e04Data.midc === 'no' ? 'MIDC = No' : e04Data.midc === 'not-sure' ? 'MIDC status not confirmed' : undefined,
    },
    {
      label: 'Investment',
      group: isExpansion && !expansionChangeAreas.includes('production') && !expansionChangeAreas.includes('land') && !expansionChangeAreas.includes('building') && !expansionChangeAreas.includes('machinery')
        ? 'not-applicable'
        : e05Data.totalInvestment ? 'self-declared' : 'needs-input',
      detail: isExpansion && !expansionChangeAreas.some(a => ['production','land','building','machinery'].includes(a)) ? 'Not a change area in this project' : undefined,
    },
    {
      label: 'Employment & Workforce',
      group: isExpansion && !expansionChangeAreas.includes('workforce') ? 'not-applicable'
        : e05Data.workforceTotal ? 'self-declared' : 'needs-input',
      detail: isExpansion && !expansionChangeAreas.includes('workforce') ? 'Not a change area in this project' : undefined,
    },
    {
      label: 'Production & Capacity',
      group: !isMfg ? 'not-applicable'
        : isExpansion && !expansionChangeAreas.includes('production') ? 'not-applicable'
        : e05Data.productionCapacities.length > 0 ? 'self-declared' : 'needs-input',
      detail: !isMfg ? 'Non-manufacturing project' : isExpansion && !expansionChangeAreas.includes('production') ? 'Not a change area in this project' : undefined,
    },
    {
      label: 'Building & Construction',
      group: e04Data.construction === 'existing' ? 'not-applicable'
        : isExpansion && !expansionChangeAreas.includes('building') ? 'not-applicable'
        : e05Data.buildingBuiltUpArea ? 'self-declared' : 'needs-input',
      detail: e04Data.construction === 'existing' ? 'Existing premises, no new construction' : undefined,
    },
    {
      label: 'Power',
      group: e04Data.power === 'no' ? 'not-applicable'
        : e04Data.power === 'not-sure' ? 'needs-verification'
        : e05Data.connectedLoad ? 'self-declared' : 'needs-input',
      detail: e04Data.power === 'no' ? 'Power = No' : e04Data.power === 'not-sure' ? 'Power requirement unconfirmed' : undefined,
    },
    {
      label: 'Water',
      group: e04Data.water === 'no' ? 'not-applicable'
        : e04Data.water === 'not-sure' ? 'needs-verification'
        : e05Data.dailyWaterRequirement ? (e05Data.waterSource === 'Not Decided' ? 'needs-verification' : 'self-declared') : 'needs-input',
      detail: e04Data.water === 'not-sure' ? 'Water requirement unconfirmed' : e05Data.waterSource === 'Not Decided' ? 'Water source not decided' : undefined,
    },
    {
      label: 'Wastewater',
      group: e05Data.generatesWastewater === 'no' ? 'not-applicable'
        : e05Data.generatesWastewater === 'not-sure' ? 'needs-verification'
        : e05Data.generatesWastewater === 'yes' ? 'self-declared' : 'needs-input',
      detail: e05Data.generatesWastewater === 'no' ? 'No wastewater generated' : undefined,
    },
    {
      label: 'Environment',
      group: e05Data.envTrigger === 'no' ? 'not-applicable'
        : e05Data.envTrigger === 'unknown' ? 'needs-verification'
        : e05Data.envTrigger === 'yes' ? 'self-declared' : 'needs-input',
      detail: e05Data.envTrigger === 'unknown' ? 'Environmental trigger status uncertain' : undefined,
    },
    {
      label: 'Air Emissions',
      group: e05Data.airEmissions === 'no' ? 'not-applicable'
        : e05Data.airEmissions === 'not-sure' ? 'needs-verification'
        : e05Data.airEmissions === 'yes' ? 'self-declared' : 'needs-input',
    },
    {
      label: 'Hazardous Materials',
      group: e05Data.hazMatYN === 'no' ? 'not-applicable'
        : e05Data.hazMatYN === 'not-sure' ? 'needs-verification'
        : e05Data.hazMatYN === 'yes' && e05Data.hazMaterials.length > 0 ? 'self-declared' : 'needs-input',
    },
    {
      label: 'Hazardous Waste',
      group: e05Data.hazWasteYN === 'no' ? 'not-applicable'
        : e05Data.hazWasteYN === 'not-sure' ? 'needs-verification'
        : e05Data.hazWasteYN === 'yes' ? 'self-declared' : 'needs-input',
    },
    {
      label: 'Boiler & Pressure Equipment',
      group: e05Data.boilerYN === 'no' && e05Data.pressureVesselYN === 'no' ? 'not-applicable'
        : e05Data.pressureVesselYN === 'not-sure' || e05Data.dangerousMachineryYN === 'not-sure' ? 'needs-verification'
        : e05Data.boilerYN ? 'self-declared' : 'needs-input',
    },
    {
      label: 'Existing Approvals',
      group: e04Data.existingApprovals === 'no' ? 'not-applicable'
        : e04Data.existingApprovals === 'not-sure' ? 'needs-verification'
        : e04Data.existingApprovals === 'yes' ? 'self-declared' : 'needs-input',
    },
    {
      label: 'Incentive Attributes',
      group: e05Data.incentiveAttributes.length > 0 ? 'self-declared' : 'needs-input',
    },
  ]

  const groupConfig: Record<Group, { label: string; color: string; icon: React.ReactNode; bg: string }> = {
    'self-declared':      { label: 'Self-declared',      color: 'text-[#22c55e]', bg: 'bg-white', icon: <Icon.CheckCircle /> },
    'needs-input':        { label: 'Needs your input',   color: 'text-[#f59e0b]', bg: 'bg-[#fffbeb]', icon: <Icon.AlertCircle /> },
    'not-applicable':     { label: 'Not applicable',      color: 'text-[#9aa5b4]', bg: 'bg-[#f8f9fb]', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg> },
    'needs-verification': { label: 'Needs verification', color: 'text-[#1a56db]', bg: 'bg-[#ebf3ff]', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
  }

  const needsInput = sections.filter(s => s.group === 'needs-input')
  const selfDeclared = sections.filter(s => s.group === 'self-declared')
  const notApplicable = sections.filter(s => s.group === 'not-applicable')
  const needsVerification = sections.filter(s => s.group === 'needs-verification')

  const natureLabel: Record<string, string> = {
    manufacturing: 'Manufacturing', processing: 'Processing', services: 'Services',
    trading: 'Trading', 'mfg-trading': 'Manufacturing + Trading',
    construction: 'Construction / Infrastructure', other: 'Other', 'not-sure': 'Not sure',
  }

  // ── Generating state ────────────────────────────────────────────────────────
  if (generating) {
    return (
      <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
        <div className="max-w-[800px] mx-auto px-6 py-12">
          <div className="bg-white border border-[#d1d9e0] rounded shadow-sm p-10 text-center">
            <div className="w-12 h-12 rounded-full bg-[#edf4ff] border border-[#b8d0f5] flex items-center justify-center text-[#1a56db] mx-auto mb-5">
              <Icon.Layers />
            </div>
            <h2 className="text-base font-bold text-[#1a2533] mb-1">Confirming Business Profile</h2>
            <p className="text-sm text-[#6b7a8d] mb-8">EKATMA is evaluating your Business DNA and generating your personalised regulatory journey.</p>
            <div className="space-y-3 max-w-xs mx-auto text-left">
              {GENERATION_STEPS.map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  {generationStep > i
                    ? <span className="text-[#22c55e] shrink-0"><Icon.CheckCircle /></span>
                    : generationStep === i
                    ? <span className="shrink-0 w-4 h-4 border-2 border-[#1a56db] border-t-transparent rounded-full animate-spin" />
                    : <span className="w-4 h-4 border border-[#d1d9e0] rounded-full shrink-0" />}
                  <span className={`text-sm ${generationStep > i ? 'text-[#374151]' : generationStep === i ? 'text-[#1a56db] font-medium' : 'text-[#9aa5b4]'}`}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  // ── Post-confirmation: four outputs ────────────────────────────────────────
  if (e06Confirmed) {
    const outputs = [
      {
        num: '01', title: 'Business DNA', status: 'Profile Confirmed', statusCls: 'text-[#22c55e]',
        desc: 'Structured project information used across EKATMA.',
        cta: 'View Master Project Dossier', onCta: undefined,
      },
      {
        num: '02', title: 'Regulatory Applicability', status: 'Evaluated', statusCls: 'text-[#22c55e]',
        desc: 'Applicability determined using validated regulatory rules and your Business DNA.',
        cta: null, onCta: undefined,
        sub: (
          <div className="mt-3 space-y-1.5">
            {[
              { label: 'Factory (Factories Act)', st: 'Applicable', cls: 'text-[#166534] bg-[#f0fdf4] border-[#bbf7d0]' },
              { label: 'MPCB Consent to Establish', st: 'Applicable', cls: 'text-[#166534] bg-[#f0fdf4] border-[#bbf7d0]' },
              { label: 'Boiler Registration', st: 'Applicable', cls: 'text-[#166534] bg-[#f0fdf4] border-[#bbf7d0]' },
              { label: 'Environmental Clearance', st: 'Needs Verification', cls: 'text-[#1a3a5c] bg-[#ebf3ff] border-[#b8d0f5]' },
              { label: 'SEZ Status', st: 'Not Applicable', cls: 'text-[#6b7a8d] bg-[#f8f9fb] border-[#d1d9e0]' },
            ].map(r => (
              <div key={r.label} className="flex items-center justify-between gap-2">
                <span className="text-xs text-[#374151]">{r.label}</span>
                <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${r.cls}`}>{r.st}</span>
              </div>
            ))}
          </div>
        ),
      },
      {
        num: '03', title: 'Personalised Regulatory Journey', status: 'Generated', statusCls: 'text-[#22c55e]',
        desc: 'Your project-specific sequence of regulatory requirements, dependencies and actions.',
        cta: 'View Regulatory Journey →', onCta: undefined,
      },
      {
        num: '04', title: 'Incentive Journey', status: 'Generated', statusCls: 'text-[#22c55e]',
        desc: 'Potential incentive opportunities evaluated from your Business DNA and applicable scheme data.',
        cta: 'View Incentive Journey (Next Phase)', onCta: undefined,
      },
    ]

    return (
      <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
        <div className="max-w-[800px] mx-auto px-6 py-5">
          <div className="mb-4">
            <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'My Businesses', href: '#' }, { label: 'Business Profile Review' }]} />
          </div>
          <div className="mb-4 p-4 bg-[#f0fdf4] border border-[#bbf7d0] rounded flex items-start gap-3">
            <span className="text-[#22c55e] shrink-0 mt-0.5"><Icon.CheckCircle /></span>
            <div>
              <p className="text-sm font-bold text-[#166534]">Business Profile Confirmed</p>
              <p className="text-xs text-[#374151] mt-0.5">Business DNA Version 1 · Confirmed in this browser tab · Self-declared by entrepreneur</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {outputs.map(o => (
              <div key={o.num} className="bg-white border border-[#d1d9e0] rounded shadow-sm p-5">
                <p className="text-[10px] font-bold text-[#9aa5b4] uppercase tracking-wider mb-1">{o.num}</p>
                <h3 className="text-sm font-bold text-[#1a2533] mb-1">{o.title}</h3>
                <p className={`text-xs font-semibold mb-2 flex items-center gap-1 ${o.statusCls}`}>
                  <Icon.CheckCircle /> {o.status}
                </p>
                <p className="text-xs text-[#6b7a8d] mb-3">{o.desc}</p>
                {o.sub}
                {o.cta && (
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={o.onCta}
                      disabled={!o.onCta}
                      className={`text-xs font-semibold px-3 py-1.5 rounded border transition-colors ${o.onCta ? 'border-[#1a56db] text-[#1a56db] hover:bg-[#ebf3ff]' : 'border-[#d1d9e0] text-[#9aa5b4] cursor-not-allowed'}`}
                    >
                      {o.cta} →
                    </button>
                    {!o.onCta && <p className="mt-2 text-xs text-[#6b7a8d]">Available when this project has a registered business identity.</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-5">
            <button onClick={onBack} className="border border-[#d1d9e0] text-[#374151] text-sm font-medium px-5 py-2.5 rounded hover:bg-[#f0f4f8] transition-colors">
              Back to Business Discovery
            </button>
          </div>
        </div>
      </main>
    )
  }

  // ── Main Review UI ─────────────────────────────────────────────────────────
  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="max-w-[820px] mx-auto px-6 py-5">
        <div className="mb-4">
          <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'My Businesses', href: '#' }, { label: 'Business Discovery', href: '#' }, { label: 'Review Business Profile' }]} />
        </div>
        <div className="mb-4 pb-4 border-b border-[#d1d9e0]">
          <h1 className="text-2xl font-bold text-[#1a3a5c]">Review Business Profile</h1>
          <p className="text-sm text-[#6b7a8d] mt-1">Review the information collected for this project before EKATMA evaluates the applicable regulatory requirements.</p>
        </div>

        {/* Project context strip */}
        <div className="mb-5 grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-white border border-[#d1d9e0] rounded shadow-sm">
          {[
            { label: 'Project', value: e03Data.name || '—' },
            { label: 'Project Type', value: ({ new: 'New Business / Project', existing: 'Existing Business', expansion: 'Expansion', modification: 'Modification / Diversification' } as Record<string, string>)[e03Data.projectType] ?? '—' },
            { label: 'Legal Entity', value: e05Data.legalEntityName || '—' },
            { label: 'Industry', value: e05Data.industry || '—' },
            { label: 'Location', value: [e05Data.district, 'Maharashtra'].filter(Boolean).join(', ') || '—' },
            { label: 'Business DNA Version', value: 'Draft Version 1' },
          ].map(f => (
            <div key={f.label}>
              <p className="text-[10px] font-semibold text-[#9aa5b4] uppercase tracking-wider">{f.label}</p>
              <p className="text-sm font-semibold text-[#1a2533] mt-0.5 truncate">{f.value}</p>
            </div>
          ))}
        </div>

        {/* Profile state summary */}
        <div className="mb-5 flex flex-wrap gap-3">
          {[
            { label: 'Needs Your Input', count: needsInput.length, cls: 'border-[#fde68a] bg-[#fffbeb] text-[#92400e]' },
            { label: 'Needs Verification', count: needsVerification.length, cls: 'border-[#b8d0f5] bg-[#ebf3ff] text-[#1a3a5c]' },
            { label: 'Self-declared', count: selfDeclared.length, cls: 'border-[#bbf7d0] bg-[#f0fdf4] text-[#166534]' },
            { label: 'Not Applicable', count: notApplicable.length, cls: 'border-[#d1d9e0] bg-[#f8f9fb] text-[#6b7a8d]' },
          ].map(g => (
            <div key={g.label} className={`flex items-center gap-2 px-3 py-2 border rounded ${g.cls}`}>
              <span className="text-lg font-bold">{g.count}</span>
              <span className="text-xs font-medium">{g.label}</span>
            </div>
          ))}
        </div>

        {/* Accordion review sections */}
        <div className="space-y-2 mb-5">

          {/* 1. Identity */}
          <ReviewSection title="1. Identity" group={e03Data.name ? 'self-declared' : 'needs-input'} defaultOpen={true}>
            <ReviewFieldRow label="Business / Project Name" value={e03Data.name || '—'} note="Create Business / Project" />
            <ReviewFieldRow label="Project Type" value={({ new: 'New Business / Project', existing: 'Existing Business', expansion: 'Expansion', modification: 'Modification / Diversification' } as Record<string, string>)[e03Data.projectType] ?? '—'} />
            {e03Data.description && <ReviewFieldRow label="Description" value={e03Data.description} />}
          </ReviewSection>

          {/* 2. Legal Entity */}
          <ReviewSection title="2. Legal Entity" group={e05Data.legalEntityType ? 'self-declared' : 'needs-input'}>
            <ReviewFieldRow label="Entity Type" value={e05Data.legalEntityType || '—'} />
            <ReviewFieldRow label="Entity Name" value={e05Data.legalEntityName} />
            <ReviewFieldRow label="PAN" value={e05Data.pan} />
            <ReviewFieldRow label="CIN" value={e05Data.cin} />
            <ReviewFieldRow label="LLPIN" value={e05Data.llpin} />
            <ReviewFieldRow label="Registration No." value={e05Data.registrationNumber} />
            <ReviewFieldRow label="Authorised Person" value={e05Data.authorisedPersonRole} />
            {e05Data.projectOperatedBySameEntity === 'no' && <ReviewFieldRow label="Operator" value={e05Data.operatorName} />}
          </ReviewSection>

          {/* 3. Classification */}
          <ReviewSection title="3. Classification" group={e05Data.classification === 'not-sure' ? 'needs-verification' : e05Data.classification ? 'self-declared' : 'needs-input'}>
            <ReviewFieldRow label="Project Classification"
              value={e05Data.classification === 'not-sure' ? 'Not sure — needs verification' : e05Data.classification ? e05Data.classification.toUpperCase() : '—'}
            />
            {e05Data.classification === 'mega' && <ReviewFieldRow label="Mega Project" value={e05Data.megaProject === 'yes' ? 'Yes' : e05Data.megaProject === 'no' ? 'No' : '—'} />}
          </ReviewSection>

          {/* 4. Industry & Activities */}
          <ReviewSection title="4. Industry & Activities" group={e05Data.industry ? 'self-declared' : 'needs-input'}>
            <ReviewFieldRow label="Primary Nature" value={natureLabel[e04Data.businessNature] ?? e04Data.businessNature} note="Basic Requirements" />
            <ReviewFieldRow label="Industry / Sector" value={e05Data.industry} />
            <ReviewFieldRow label="Activities" value={e05Data.activities.length > 0 ? e05Data.activities.join(', ') : undefined} />
          </ReviewSection>

          {/* 5. Products / Services */}
          <ReviewSection title="5. Products / Services" group={e05Data.products.length > 0 ? 'self-declared' : 'needs-input'}>
            {e05Data.products.length > 0
              ? e05Data.products.map((p, i) => <ReviewFieldRow key={p.id} label={`Product ${i + 1}`} value={p.name} note={p.description || undefined} />)
              : <p className="text-xs text-[#9aa5b4] italic py-1">No products entered yet.</p>}
            <ReviewFieldRow label="Process Type" value={e05Data.processType} />
          </ReviewSection>

          {/* 6. Project Stage */}
          <ReviewSection title="6. Project Stage" group={e05Data.projectStage ? 'self-declared' : 'needs-input'}>
            <ReviewFieldRow label="Stage" value={e05Data.projectStage || '—'} />
          </ReviewSection>

          {/* 7. Location / Jurisdiction */}
          <ReviewSection title="7. Location / Jurisdiction" group={e05Data.district ? 'self-declared' : 'needs-input'}>
            <ReviewFieldRow label="State" value="Maharashtra" />
            <ReviewFieldRow label="District" value={e05Data.district} />
            <ReviewFieldRow label="Taluka" value={e05Data.taluka} />
            <ReviewFieldRow label="Village / City" value={e05Data.village} />
            <ReviewFieldRow label="PIN" value={e05Data.pincode} />
            <ReviewFieldRow label="MIDC Status" value={e04Data.midc === 'yes' ? 'Yes' : e04Data.midc === 'no' ? 'No' : e04Data.midc === 'not-sure' ? 'Not sure' : '—'} note="Basic Requirements" />
          </ReviewSection>

          {/* 8. Land */}
          <ReviewSection title="8. Land" group={
            e04Data.midc === 'no' && e04Data.landStatus === 'possessed' ? 'self-declared'
              : e04Data.midc === 'not-sure' ? 'needs-verification'
              : e05Data.landArea ? 'self-declared' : 'needs-input'
          }>
            {e04Data.midc === 'yes' ? (
              <>
                <ReviewFieldRow label="MIDC Estate" value={e05Data.midcEstate} />
                <ReviewFieldRow label="Plot Number" value={e05Data.midcPlotNumber} />
                <ReviewFieldRow label="Plot Area" value={e05Data.midcPlotArea ? `${e05Data.midcPlotArea} sq.m` : undefined} />
                <ReviewFieldRow label="Allotment Status" value={e05Data.midcAllotmentStatus} />
              </>
            ) : e04Data.midc === 'no' ? (
              <>
                <ReviewFieldRow label="MIDC Plot Details" isNA={true} />
                <ReviewFieldRow label="Land Type" value={e05Data.landType} />
                <ReviewFieldRow label="Ownership" value={e05Data.ownershipStatus} />
                <ReviewFieldRow label="Survey / Plot No." value={e05Data.surveyPlotNumber} />
                <ReviewFieldRow label="Land Area" value={e05Data.landArea ? `${e05Data.landArea} sq.m` : undefined} />
                <ReviewFieldRow label="Land-Use" value={e05Data.landUseClassification} />
              </>
            ) : (
              <p className="text-xs text-[#9aa5b4] italic py-1">MIDC status not confirmed. Land details will be refined after verification.</p>
            )}
            <ReviewFieldRow label="Land Possession" value={e04Data.landStatus} note="Basic Requirements" />
          </ReviewSection>

          {/* 9. Investment */}
          <ReviewSection title="9. Investment" group={e05Data.totalInvestment ? 'self-declared' : 'needs-input'}>
            <ReviewFieldRow label="Total Investment" value={e05Data.totalInvestment ? formatInrDisplay(e05Data.totalInvestment) : undefined} />
            <ReviewFieldRow label="Land" value={e05Data.investmentLand ? formatInrDisplay(e05Data.investmentLand) : undefined} />
            <ReviewFieldRow label="Building" value={e05Data.investmentBuilding ? formatInrDisplay(e05Data.investmentBuilding) : undefined} />
            <ReviewFieldRow label="Plant & Machinery" value={e05Data.investmentPlantMachinery ? formatInrDisplay(e05Data.investmentPlantMachinery) : undefined} />
            <ReviewFieldRow label="Other Capital" value={e05Data.investmentOther ? formatInrDisplay(e05Data.investmentOther) : undefined} />
          </ReviewSection>

          {/* 10. Employment */}
          <ReviewSection title="10. Employment" group={e05Data.workforceTotal ? 'self-declared' : 'needs-input'}>
            <ReviewFieldRow label="Total Workforce" value={e05Data.workforceTotal} />
            <ReviewFieldRow label="Permanent" value={e05Data.workforcePermanent} />
            <ReviewFieldRow label="Contract" value={e05Data.workforceContract} />
            {isExpansion && e05Data.workforceCurrentTotal && <ReviewFieldRow label="Current Total" value={e05Data.workforceCurrentTotal} note="Before expansion" />}
          </ReviewSection>

          {/* 11. Production */}
          <ReviewSection title="11. Production" group={!isMfg ? 'not-applicable' : e05Data.productionCapacities.length > 0 ? 'self-declared' : 'needs-input'}>
            {!isMfg
              ? <ReviewFieldRow label="Production Details" isNA={true} />
              : e05Data.productionCapacities.length > 0
              ? e05Data.productionCapacities.map((p, i) => (
                  <ReviewFieldRow key={i} label={`Product ${i + 1}`} value={`${p.productName}: ${p.capacity} ${p.unit}`} />
                ))
              : <p className="text-xs text-[#9aa5b4] italic py-1">No production capacities entered.</p>}
            {isMfg && <ReviewFieldRow label="Shifts" value={e05Data.shifts} />}
            {isMfg && <ReviewFieldRow label="Operating Hours/Day" value={e05Data.operatingHoursPerDay} />}
          </ReviewSection>

          {/* 12. Process */}
          <ReviewSection title="12. Process" group={e05Data.processType ? 'self-declared' : 'needs-input'}>
            <ReviewFieldRow label="Process Type" value={e05Data.processType} />
            <ReviewFieldRow label="Description" value={e05Data.processDescription} />
          </ReviewSection>

          {/* 13. Building / Construction */}
          <ReviewSection title="13. Building / Construction" group={
            e04Data.construction === 'existing' ? 'not-applicable'
              : e05Data.buildingBuiltUpArea ? 'self-declared' : 'needs-input'
          }>
            <ReviewFieldRow label="Construction Status" value={e04Data.construction} note="Basic Requirements" />
            {e04Data.construction === 'existing'
              ? <ReviewFieldRow label="New Building Details" isNA={true} />
              : <>
                  <ReviewFieldRow label="Built-Up Area" value={e05Data.buildingBuiltUpArea ? `${e05Data.buildingBuiltUpArea} sq.m` : undefined} />
                  <ReviewFieldRow label="Floors" value={e05Data.buildingFloors} />
                  <ReviewFieldRow label="Height" value={e05Data.buildingHeight ? `${e05Data.buildingHeight} m` : undefined} />
                  <ReviewFieldRow label="Occupancy" value={e05Data.buildingOccupancy} />
                  {e05Data.buildingRiskFlags.length > 0 && <ReviewFieldRow label="Risk Flags" value={e05Data.buildingRiskFlags.join(', ')} />}
                </>}
          </ReviewSection>

          {/* 14. Power */}
          <ReviewSection title="14. Power" group={
            e04Data.power === 'no' ? 'not-applicable'
              : e04Data.power === 'not-sure' ? 'needs-verification'
              : e05Data.connectedLoad ? 'self-declared' : 'needs-input'
          }>
            <ReviewFieldRow label="Power Required" value={e04Data.power} note="Basic Requirements" />
            {e04Data.power === 'no'
              ? <ReviewFieldRow label="Power Details" isNA={true} />
              : <>
                  <ReviewFieldRow label="Connected Load" value={e05Data.connectedLoad ? `${e05Data.connectedLoad} ${e05Data.connectedLoadUnit.toUpperCase()}` : undefined} />
                  <ReviewFieldRow label="Supply Type" value={e05Data.supplyType?.toUpperCase()} />
                  {e05Data.supplyType === 'ht' && <ReviewFieldRow label="HT Infrastructure" value={e05Data.htInfrastructure} />}
                </>}
          </ReviewSection>

          {/* 15. Water */}
          <ReviewSection title="15. Water" group={
            e04Data.water === 'no' ? 'not-applicable'
              : e04Data.water === 'not-sure' ? 'needs-verification'
              : e05Data.dailyWaterRequirement ? 'self-declared' : 'needs-input'
          }>
            <ReviewFieldRow label="Water Required" value={e04Data.water} note="Basic Requirements" />
            {e04Data.water === 'no'
              ? <ReviewFieldRow label="Water Details" isNA={true} />
              : <>
                  <ReviewFieldRow label="Daily Requirement" value={e05Data.dailyWaterRequirement ? `${e05Data.dailyWaterRequirement} KL/day` : undefined} />
                  <ReviewFieldRow label="Source" value={e05Data.waterSource} />
                </>}
          </ReviewSection>

          {/* 16. Wastewater */}
          <ReviewSection title="16. Wastewater" group={
            e05Data.generatesWastewater === 'no' ? 'not-applicable'
              : e05Data.generatesWastewater === 'not-sure' ? 'needs-verification'
              : e05Data.generatesWastewater === 'yes' ? 'self-declared' : 'needs-input'
          }>
            <ReviewFieldRow label="Wastewater Generated" value={e05Data.generatesWastewater} />
            {e05Data.generatesWastewater === 'no'
              ? <ReviewFieldRow label="Wastewater Details" isNA={true} />
              : <>
                  <ReviewFieldRow label="Type" value={e05Data.wastewaterType} />
                  {(e05Data.wastewaterType === 'industrial' || e05Data.wastewaterType === 'both') && <>
                    <ReviewFieldRow label="Effluent Quantity" value={e05Data.industrialEffluentQuantity ? `${e05Data.industrialEffluentQuantity} KL/day` : undefined} />
                    <ReviewFieldRow label="Treatment Planned" value={e05Data.treatmentPlanned} />
                    <ReviewFieldRow label="Treatment System" value={e05Data.treatmentSystem} />
                  </>}
                </>}
          </ReviewSection>

          {/* 17. Drainage */}
          <ReviewSection title="17. Drainage" group={
            e05Data.requiresDrainage === 'no' ? 'not-applicable'
              : e05Data.requiresDrainage === 'yes' ? 'self-declared' : 'needs-input'
          }>
            <ReviewFieldRow label="Drainage Required" value={e05Data.requiresDrainage} />
            {e05Data.drainageTypes.length > 0 && <ReviewFieldRow label="Drainage Types" value={e05Data.drainageTypes.join(', ')} />}
          </ReviewSection>

          {/* 18. Air Emissions */}
          <ReviewSection title="18. Air Emissions" group={
            e05Data.airEmissions === 'no' ? 'not-applicable'
              : e05Data.airEmissions === 'not-sure' ? 'needs-verification'
              : e05Data.airEmissions === 'yes' ? 'self-declared' : 'needs-input'
          }>
            <ReviewFieldRow label="Air Emissions" value={e05Data.airEmissions} />
            {e05Data.airEmissions === 'no'
              ? <ReviewFieldRow label="Emission Details" isNA={true} />
              : e05Data.airEmissionSources.length > 0 && <ReviewFieldRow label="Emission Sources" value={e05Data.airEmissionSources.join(', ')} />}
          </ReviewSection>

          {/* 19. Environmental Characteristics */}
          <ReviewSection title="19. Environmental Characteristics" group={
            e05Data.envTrigger === 'no' ? 'not-applicable'
              : e05Data.envTrigger === 'unknown' ? 'needs-verification'
              : e05Data.envTrigger ? 'self-declared' : 'needs-input'
          }>
            <ReviewFieldRow label="Environmental Trigger" value={e05Data.envTrigger === 'unknown' ? "Don't know" : e05Data.envTrigger} />
            {e05Data.envCharacteristics.length > 0 && <ReviewFieldRow label="Characteristics" value={e05Data.envCharacteristics.join(', ')} />}
            {(e05Data.envTrigger === 'yes' || e05Data.envTrigger === 'unknown') && (
              <div className="py-1.5">
                <span className="text-xs text-[#6b7a8d]">Environmental Clearance: </span>
                <span className="text-xs font-semibold text-[#1a3a5c]">Needs Verification</span>
                <p className="text-xs text-[#9aa5b4] mt-0.5">Applicability will be determined using validated regulatory rules.</p>
              </div>
            )}
          </ReviewSection>

          {/* 20. Hazardous Materials */}
          <ReviewSection title="20. Hazardous Materials" group={
            e05Data.hazMatYN === 'no' ? 'not-applicable'
              : e05Data.hazMatYN === 'not-sure' ? 'needs-verification'
              : e05Data.hazMaterials.length > 0 ? 'self-declared' : 'needs-input'
          }>
            <ReviewFieldRow label="Hazardous Materials" value={e05Data.hazMatYN} />
            {e05Data.hazMatYN === 'no'
              ? <ReviewFieldRow label="Material Inventory" isNA={true} />
              : e05Data.hazMaterials.map((m, i) => (
                  <ReviewFieldRow key={i} label={`Material ${i + 1}`} value={`${m.material} — ${m.maxQuantity} ${m.unit}`} note={m.hazardTypes.join(', ')} />
                ))}
          </ReviewSection>

          {/* 21. Hazardous Waste */}
          <ReviewSection title="21. Hazardous Waste" group={
            e05Data.hazWasteYN === 'no' ? 'not-applicable'
              : e05Data.hazWasteYN === 'not-sure' ? 'needs-verification'
              : e05Data.hazWasteYN === 'yes' ? 'self-declared' : 'needs-input'
          }>
            <ReviewFieldRow label="Hazardous Waste" value={e05Data.hazWasteYN} />
            {e05Data.hazWasteYN === 'yes' && e05Data.hazWastes.map((w, i) => (
              <ReviewFieldRow key={i} label={`Waste ${i + 1}`} value={`${w.wasteType} — ${w.quantity} ${w.unit}`} note={w.treatment} />
            ))}
          </ReviewSection>

          {/* 22. Safety / Industrial */}
          <ReviewSection title="22. Safety / Industrial Establishment" group={e05Data.factoryYN ? 'self-declared' : 'needs-input'}>
            <ReviewFieldRow label="Factory Context" value={e05Data.factoryYN} />
            <ReviewFieldRow label="Boiler" value={e05Data.boilerYN} />
            {e05Data.boilerYN === 'yes' && <>
              <ReviewFieldRow label="Boiler Capacity" value={e05Data.boilerCapacity} />
              <ReviewFieldRow label="Boiler Count" value={e05Data.boilerCount} />
              <ReviewFieldRow label="Fuel" value={e05Data.boilerFuel} />
            </>}
            <ReviewFieldRow label="Pressure Vessel" value={e05Data.pressureVesselYN} />
            <ReviewFieldRow label="Dangerous Machinery" value={e05Data.dangerousMachineryYN} />
            {e05Data.fireFlags.length > 0 && <ReviewFieldRow label="Fire Characteristics" value={e05Data.fireFlags.join(', ')} />}
          </ReviewSection>

          {/* 23. Machinery / Equipment */}
          <ReviewSection title="23. Machinery / Equipment" group={
            e05Data.pressureEquipment.length > 0 || e05Data.dangerousMachineryItems.length > 0 ? 'self-declared' : 'needs-input'
          }>
            {e05Data.pressureEquipment.map((eq, i) => (
              <ReviewFieldRow key={i} label={`Pressure Eq. ${i + 1}`} value={`${eq.equipmentType} — ${eq.capacity}`} note={`${eq.pressure} bar`} />
            ))}
            {e05Data.dangerousMachineryItems.map((m, i) => (
              <ReviewFieldRow key={i} label={`Machinery ${i + 1}`} value={`${m.machineryType} × ${m.count}`} note={m.capacityRating} />
            ))}
            {e05Data.pressureEquipment.length === 0 && e05Data.dangerousMachineryItems.length === 0 && (
              <p className="text-xs text-[#9aa5b4] italic py-1">No equipment records entered.</p>
            )}
          </ReviewSection>

          {/* 24. Storage */}
          <ReviewSection title="24. Storage" group={e05Data.storageCategories.length > 0 ? 'self-declared' : 'needs-input'}>
            {e05Data.storageCategories.length > 0
              ? <ReviewFieldRow label="Storage Categories" value={e05Data.storageCategories.join(', ')} />
              : <p className="text-xs text-[#9aa5b4] italic py-1">No storage categories selected.</p>}
            {e05Data.storageItems.map((s, i) => (
              <ReviewFieldRow key={i} label={`Storage ${i + 1}`} value={`${s.category}: ${s.material} — ${s.maxQuantity} ${s.unit}`} />
            ))}
          </ReviewSection>

          {/* 25. Warehouse */}
          <ReviewSection title="25. Warehouse" group={
            e05Data.warehouseYN === 'no' ? 'not-applicable'
              : e05Data.warehouseYN === 'yes' ? 'self-declared' : 'needs-input'
          }>
            <ReviewFieldRow label="Warehouse" value={e05Data.warehouseYN} />
            {e05Data.warehouseYN === 'yes' && <>
              <ReviewFieldRow label="Area" value={e05Data.warehouseArea ? `${e05Data.warehouseArea} sq.m` : undefined} />
              <ReviewFieldRow label="Material Stored" value={e05Data.warehouseMaterial} />
              <ReviewFieldRow label="Hazardous / Flammable" value={e05Data.warehouseHazardous} />
            </>}
          </ReviewSection>

          {/* 26. Logistics */}
          <ReviewSection title="26. Logistics" group={e05Data.logisticsYN ? 'self-declared' : 'needs-input'}>
            <ReviewFieldRow label="Significant Logistics" value={e05Data.logisticsYN} />
            {e05Data.logisticsYN === 'yes' && <>
              <ReviewFieldRow label="Transport Modes" value={e05Data.logisticsModes.join(', ')} />
              <ReviewFieldRow label="Daily Vehicle Movement" value={e05Data.vehicleMovementPerDay} />
            </>}
          </ReviewSection>

          {/* 27. Import / Export */}
          <ReviewSection title="27. Import / Export" group={
            e05Data.importExport === 'neither' ? 'not-applicable'
              : e05Data.importExport ? 'self-declared' : 'needs-input'
          }>
            <ReviewFieldRow label="Trade Activity" value={e05Data.importExport} />
            {(e05Data.importExport === 'import' || e05Data.importExport === 'both') && e05Data.importedInputs.map((inp, i) => (
              <ReviewFieldRow key={i} label={`Imported Input ${i + 1}`} value={inp.material} note={inp.description} />
            ))}
            {(e05Data.importExport === 'export' || e05Data.importExport === 'both') && e05Data.exportedProducts.map((exp, i) => (
              <ReviewFieldRow key={i} label={`Exported Product ${i + 1}`} value={exp.product} note={exp.description} />
            ))}
          </ReviewSection>

          {/* 28. Existing Approvals */}
          <ReviewSection title="28. Existing Approvals" group={
            e04Data.existingApprovals === 'no' ? 'not-applicable'
              : e04Data.existingApprovals === 'not-sure' ? 'needs-verification'
              : e04Data.existingApprovals === 'yes' ? 'self-declared' : 'needs-input'
          }>
            <ReviewFieldRow label="Existing Approvals" value={e04Data.existingApprovals} note="Basic Requirements" />
            {e04Data.existingApprovals === 'no'
              ? <p className="text-xs text-[#6b7a8d] py-1">No Existing Approvals Declared</p>
              : e05Data.existingApprovalRows.map((r, i) => (
                  <ReviewFieldRow key={i} label={`${r.department}`} value={`${r.approvalType} — ${r.licenceNumber}`} note={r.status} />
                ))}
          </ReviewSection>

          {/* 29. Existing Applications */}
          <ReviewSection title="29. Existing Applications" group={
            e05Data.existingApplicationYN === 'no' ? 'not-applicable'
              : e05Data.existingApplicationYN === 'yes' && e05Data.existingApplicationRows.length > 0 ? 'self-declared'
              : 'needs-input'
          }>
            {e05Data.existingApplicationRows.map((r, i) => (
              <ReviewFieldRow key={i} label={r.department} value={`${r.service} — ${r.applicationId}`} note={r.currentStatus} />
            ))}
            {e05Data.existingApplicationRows.length === 0 && <p className="text-xs text-[#9aa5b4] italic py-1">No application records entered.</p>}
          </ReviewSection>

          {/* 30. Incentive Attributes */}
          <ReviewSection title="30. Incentive Attributes" group={e05Data.incentiveAttributes.length > 0 ? 'self-declared' : 'needs-input'}>
            {e05Data.incentiveAttributes.length > 0
              ? <ReviewFieldRow label="Attributes" value={e05Data.incentiveAttributes.join(', ')} />
              : <p className="text-xs text-[#9aa5b4] italic py-1">No incentive attributes selected.</p>}
          </ReviewSection>

          {/* 31. Document Availability */}
          <ReviewSection title="31. Document Availability" group={e05Data.docAvailability ? 'self-declared' : 'needs-input'}>
            <ReviewFieldRow label="Documents Available" value={e05Data.docAvailability === 'yes' ? 'Yes' : e05Data.docAvailability === 'some' ? 'Some' : e05Data.docAvailability === 'no' ? 'No' : '—'} />
            {e05Data.docRecords.map((d, i) => (
              <ReviewFieldRow key={i} label={d.category} value={d.documentName} />
            ))}
          </ReviewSection>
        </div>

        {/* Action bar */}
        <div className="flex flex-wrap items-center gap-3 py-4 border-t border-[#d1d9e0]">
          <button onClick={onBack} className="border border-[#d1d9e0] text-[#374151] text-sm font-medium px-5 py-2.5 rounded hover:bg-[#f0f4f8] transition-colors">
            Back
          </button>
          <button onClick={() => openAssistant({ origin: 'inline', mode: 'entity', context: inlineContext(pageContext, { pageType: 'business-dna-review', pageTitle: 'Business Profile Review', label: 'Business Profile Review' }) })} className="border border-[#d1d9e0] text-[#374151] text-sm font-medium px-5 py-2.5 rounded hover:bg-[#f0f4f8] transition-colors flex items-center gap-2">
            <Icon.Help /> Ask Assistant
          </button>
          <div className="flex-1" />
          {needsInput.length > 0 && (
            <p className="text-xs text-[#f59e0b] font-medium">{needsInput.length} section{needsInput.length !== 1 ? 's' : ''} need your input before confirming.</p>
          )}
          <button
            onClick={() => setConfirmModal(true)}
            className={`text-white text-sm font-semibold px-6 py-2.5 rounded transition-colors ${needsInput.length === 0 ? 'bg-[#1a56db] hover:bg-[#1a3a5c]' : 'bg-[#9aa5b4] cursor-not-allowed'}`}
            disabled={needsInput.length > 0}
          >
            Confirm Profile →
          </button>
        </div>
      </div>

      {/* Confirm Profile Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" role="dialog" aria-modal="true">
          <div className="bg-white border border-[#d1d9e0] rounded-lg shadow-xl max-w-sm w-full mx-4 p-6">
            <h3 className="text-base font-bold text-[#1a2533] mb-2">Confirm Business Profile?</h3>
            <p className="text-sm text-[#6b7a8d] mb-4">EKATMA will use this Business Profile to evaluate regulatory applicability and generate your personalised regulatory journey.</p>
            <p className="text-xs text-[#9aa5b4] mb-5">Confirmation creates Business DNA Version 1. This does not constitute department verification.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmModal(false)} className="px-4 py-2 text-sm border border-[#d1d9e0] text-[#374151] rounded hover:bg-[#f0f4f8]">Cancel</button>
              <button onClick={handleConfirm} className="px-4 py-2 text-sm bg-[#1a56db] text-white rounded hover:bg-[#1a3a5c] font-medium">Confirm Profile</button>
            </div>
          </div>
        </div>
      )}

      {/* Ask Assistant Drawer */}
      {assistantOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="EKATMA Assistant">
          <div className="absolute inset-0 bg-black/30" onClick={() => setAssistantOpen(false)} />
          <div className="relative bg-white w-80 max-w-full h-full shadow-2xl flex flex-col border-l border-[#d1d9e0]">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#e8edf2] bg-[#f8f9fb]">
              <div className="w-7 h-7 rounded-full bg-[#1a3a5c] flex items-center justify-center">
                <Icon.Help />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-[#1a2533]">EKATMA Regulatory Assistant</p>
                <p className="text-[10px] text-[#6b7a8d]">Business Profile Review context</p>
              </div>
              <button onClick={() => setAssistantOpen(false)} className="text-[#9aa5b4] hover:text-[#374151] text-lg leading-none">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <p className="text-xs text-[#6b7a8d] italic">The EKATMA Assistant can explain fields, terminology, and relevant government rules. It does not change your Business DNA or determine regulatory outcomes.</p>
              <div className="space-y-2">
                {[
                  'Why is this information required?',
                  'What does Needs Verification mean?',
                  'Which document supports this field?',
                  'Explain in Marathi.',
                ].map(q => (
                  <button key={q} className="w-full text-left text-xs px-3 py-2.5 border border-[#d1d9e0] rounded hover:bg-[#f0f4f8] text-[#374151]">{q}</button>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-[#e8edf2]">
              <div className="flex gap-2">
                <input className="flex-1 text-sm border border-[#d1d9e0] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a56db]" placeholder="Ask a question…" />
                <button className="px-3 py-2 bg-[#1a3a5c] text-white text-sm rounded hover:bg-[#0f2540]">Send</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
