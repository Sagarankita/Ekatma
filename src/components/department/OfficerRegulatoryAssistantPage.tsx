'use client'

import { useEffect, useMemo, useState } from 'react'
import { M32_CHIPS, M32_SOURCES } from '@/data/fixtures/data'
import { inlineContext } from '@/features/regulatory-assistant/context'
import { useRegulatoryAssistant } from '@/features/regulatory-assistant/Provider'

export type OfficerApplicationContext = {
  id: string
  business: string
  service: string
  dnaVersion: string
  location?: string
  state?: string
  desk?: string
}

const DEFAULT_ANSWER = 'The built-up area is checked because the proposed development must comply with the applicable MIDC building controls and permitted development parameters for the plot. The check confirms that the submitted plan, declared area, and permissible development controls are consistent.'
const DEFAULT_MARATHI_ANSWER = 'प्रस्तावित विकास आराखडा लागू MIDC बांधकाम नियंत्रण आणि भूखंडासाठी परवानगी असलेल्या विकास मापदंडांशी सुसंगत आहे याची खात्री करण्यासाठी बांधकाम क्षेत्र तपासले जाते.'
const DEFAULT_PASSAGE = 'The built-up area shall be calculated in accordance with the provisions in this section. The built-up area shall include all covered areas as defined herein for the purpose of determining permissible FSI and compliance with building controls.'

const evidenceItems = [
  { label: 'Submitted building plan', action: 'Open document' },
  { label: 'Built-up area calculation', action: 'View value' },
  { label: 'Plot / land record', action: 'Open document' },
  { label: 'Application form value', action: 'View value' },
  { label: 'Relevant FSI calculation', action: 'Open document' },
]

const outlineItems = [
  { label: '3.0 Development Parameters', active: false },
  { label: '4.0 Building Controls', active: true },
  { label: '4.1 General Provisions', active: false },
  { label: '4.2 Definitions', active: false },
  { label: '4.3 Built-up Area and Floor Space Index', active: false },
  { label: '4.3.2 Built-up Area Calculation', active: true },
  { label: '4.3.3 FSI Calculation', active: false },
  { label: '4.3.4 Exclusions', active: false },
  { label: '4.4 Setbacks and Margins', active: false },
  { label: '5.0 Land Use and Zoning', active: false },
]

function readableState(state?: string) {
  if (!state) return 'Under Scrutiny'
  return state.toLowerCase().split('_').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
}

export function OfficerRegulatoryAssistantPage({ onBack, onOpenRegChange, applicationContext }: {
  onBack: () => void
  onOpenRegChange?: () => void
  applicationContext?: OfficerApplicationContext
}) {
  const [input, setInput] = useState('')
  const [lang, setLang] = useState<'en' | 'mr'>('en')
  const [selectedSrc, setSelectedSrc] = useState<typeof M32_SOURCES[0]>(M32_SOURCES[0])
  const [evidenceFocus, setEvidenceFocus] = useState<string | null>(null)
  const [sourceExpanded, setSourceExpanded] = useState(true)
  const { messages, sendMessage, setActiveContext, pageContext, loading } = useRegulatoryAssistant()

  const latestAssistant = [...messages].reverse().find(message => message.role === 'assistant')
  const latestCitation = latestAssistant?.citations?.[0]
  const answer = latestAssistant?.content ?? (lang === 'mr' ? DEFAULT_MARATHI_ANSWER : DEFAULT_ANSWER)
  const answerClause = latestCitation?.clause ?? selectedSrc.clause
  const answerVersion = latestCitation?.version ?? selectedSrc.version
  const answerSource = M32_SOURCES.find(source => source.id === latestCitation?.source) ?? selectedSrc
  const hasApplication = Boolean(applicationContext)

  useEffect(() => {
    setActiveContext({ ...inlineContext(pageContext, {
      pageType: 'assistant-research',
      pageTitle: 'Officer Regulatory Assistant',
      label: applicationContext ? `${applicationContext.id} regulatory research` : 'Department regulatory research',
      entities: { applicationId: applicationContext?.id },
      recordTitle: applicationContext?.service,
    }), origin: 'full-page', mode: 'research' })
  }, [applicationContext?.id, applicationContext?.service, pageContext, setActiveContext])

  useEffect(() => {
    if (!latestCitation?.source) return
    const source = M32_SOURCES.find(item => item.id === latestCitation.source)
    if (source) setSelectedSrc(source)
  }, [latestCitation?.source])

  const recentQuestions = useMemo(() => messages.filter(message => message.role === 'user').slice(-3), [messages])

  const ask = (text: string) => {
    if (!text.trim()) return
    setInput('')
    void sendMessage(text.trim())
  }

  const focusPassage = () => {
    setSourceExpanded(true)
    window.setTimeout(() => document.getElementById('relevant-passage')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 0)
  }

  return (
    <main className="flex-1 overflow-y-auto bg-[#f8f9fb]" id="main-content">
      <div className="mx-auto max-w-[1480px] px-6 py-5">
        <nav className="mb-3 flex items-center gap-2 text-sm text-[#4a6280]" aria-label="Breadcrumb">
          <button onClick={onBack} className="hover:text-[#1a3a5c] hover:underline">Department Home</button>
          <span aria-hidden="true">›</span>
          <span>Application</span>
          <span aria-hidden="true">›</span>
          <span className="font-semibold text-[#173b64]">Regulatory Assistant</span>
        </nav>

        <header className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#102f55]">Officer Regulatory Assistant</h1>
            <p className="mt-1 text-base text-[#4a6280]">Get source-backed regulatory context for the current review.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex rounded-lg bg-[#eef3f8] p-1" aria-label="Assistant language">
              {(['en', 'mr'] as const).map(value => (
                <button key={value} onClick={() => setLang(value)} className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${lang === value ? 'bg-[#dbeafe] text-[#1559c5]' : 'text-[#173b64] hover:bg-white'}`} aria-pressed={lang === value}>
                  {value === 'en' ? 'English' : 'मराठी'}
                </button>
              ))}
            </div>
            <button onClick={onBack} className="rounded-lg border border-[#d1dce8] bg-white px-4 py-2.5 text-sm font-semibold text-[#173b64] hover:bg-[#f5f8fb]">← Back</button>
          </div>
        </header>

        <section className="mb-5 rounded-xl border border-[#cfe0f4] bg-[#edf5ff] px-5 py-4" aria-label="Current application context">
          <div className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            <div><p className="text-xs text-[#5f7590]">Application ID</p><p className="mt-1 font-bold text-[#173b64]">{applicationContext?.id ?? 'No application selected'}</p></div>
            <div><p className="text-xs text-[#5f7590]">Business</p><p className="mt-1 font-semibold text-[#173b64]">{applicationContext?.business ?? 'Department context'}</p></div>
            <div><p className="text-xs text-[#5f7590]">Location</p><p className="mt-1 font-semibold text-[#173b64]">{applicationContext?.location ?? 'Pune'}</p></div>
            <div><p className="text-xs text-[#5f7590]">MIDC Service</p><p className="mt-1 font-semibold text-[#173b64]">{applicationContext?.service ?? 'Building / Planning'}</p></div>
            <div><p className="text-xs text-[#5f7590]">Current State</p><p className="mt-1 font-semibold text-[#173b64]">{readableState(applicationContext?.state)}</p></div>
            <div><p className="text-xs text-[#5f7590]">Current Desk</p><p className="mt-1 font-semibold text-[#173b64]">{applicationContext?.desk ?? 'Planning / Building Scrutiny'}</p></div>
            <div><p className="text-xs text-[#5f7590]">Current Review Area</p><p className="mt-1 font-semibold text-[#173b64]">{applicationContext?.service ?? 'Building / Planning'}</p></div>
          </div>
          {!hasApplication && <p className="mt-3 border-t border-[#cfe0f4] pt-3 text-xs text-[#4a6280]">Open the assistant from an application to receive application-specific regulatory references.</p>}
        </section>

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_390px]">
          <div className="space-y-5">
            <section className="rounded-xl border border-[#d9e5f0] bg-white p-5" aria-labelledby="ask-heading">
              <h2 id="ask-heading" className="text-lg font-bold text-[#173b64]">Ask about this application</h2>
              <p className="mt-1 text-sm text-[#5f7590]">Get source-backed regulatory context for the current review.</p>
              <div className="mt-4 flex gap-3">
                <input value={input} onChange={event => setInput(event.target.value)} onKeyDown={event => event.key === 'Enter' && ask(input)} placeholder="Ask a regulatory question about this application..." className="min-w-0 flex-1 rounded-lg border border-[#cddae8] px-4 py-3 text-base text-[#173b64] outline-none focus:border-[#1a56db] focus:ring-2 focus:ring-[#bfdbfe]" aria-label="Ask a regulatory question" />
                <button onClick={() => ask(input)} disabled={!input.trim() || loading} className="rounded-lg bg-[#1769e0] px-7 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#1559c5] disabled:cursor-not-allowed disabled:opacity-45">{loading ? 'Consulting…' : 'Ask'}</button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2" aria-label="Suggested officer questions">
                {M32_CHIPS.slice(0, 5).map(chip => <button key={chip} onClick={() => ask(chip)} className="rounded-full border border-[#cddae8] bg-white px-4 py-2 text-sm text-[#294d78] hover:border-[#1a56db] hover:bg-[#eff6ff]">{chip}</button>)}
                <button onClick={() => { setLang('mr'); ask('Explain in Marathi') }} className="rounded-full border border-[#cddae8] bg-white px-4 py-2 text-sm text-[#294d78] hover:border-[#1a56db] hover:bg-[#eff6ff]">Explain in Marathi</button>
              </div>
            </section>

            <section className="rounded-xl border border-[#d9e5f0] bg-white p-6" aria-labelledby="answer-heading">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e6f0ff] text-2xl text-[#1769e0]" aria-hidden="true">✦</div>
                <div className="min-w-0 flex-1">
                  <h2 id="answer-heading" className="text-xl font-bold text-[#173b64]">Regulatory Answer</h2>
                  <p className="mt-4 text-lg leading-relaxed text-[#173b64]">{answer}</p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-[#cfe0f4] bg-[#f1f7ff] p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#4d6e95]">Regulatory basis</p>
                <p className="mt-2 text-base font-bold text-[#173b64]">{answerSource.title}</p>
                <p className="mt-1 text-sm text-[#4d6e95]">{answerClause} · {answerVersion}</p>
                <button onClick={focusPassage} className="mt-3 rounded-lg bg-[#dcecff] px-4 py-2 text-sm font-bold text-[#1559c5] hover:bg-[#cbe2ff]">View {answerClause} →</button>
              </div>

              <div className="mt-7 border-t border-[#e6edf4] pt-6">
                <h3 className="text-lg font-bold text-[#173b64]">Why this applies to this application</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  {[
                    ['Application parameter', 'Built-up area'],
                    ['Current value', '4,800 sq.m'],
                    ['Applicable rule', 'MIDC Building Regulations 2019'],
                    ['Clause', '4.3.2'],
                    ['Officer check', 'Permissible FSI, land-use controls and building controls'],
                  ].map(([label, value]) => <div key={label} className="border-l-2 border-[#8bb8f0] pl-3"><p className="text-xs text-[#5f7590]">{label}</p><p className="mt-1 text-sm font-semibold text-[#173b64]">{value}</p></div>)}
                </div>
              </div>

              <div className="mt-7 border-t border-[#e6edf4] pt-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-[#173b64]">Evidence to Verify</h3>
                  <span className="text-xs text-[#5f7590]">Rule → meaning → officer check</span>
                </div>
                <div className="mt-3 divide-y divide-[#edf2f7] rounded-lg border border-[#e0e8f1]">
                  {evidenceItems.map(item => <div key={item.label} className={`flex items-center justify-between gap-4 px-4 py-3 ${evidenceFocus === item.label ? 'bg-[#eff6ff]' : 'bg-white'}`}><span className="flex items-center gap-3 text-sm font-medium text-[#173b64]"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e0f2e9] text-sm font-bold text-[#227345]">✓</span>{item.label}</span><button onClick={() => setEvidenceFocus(item.label)} className="rounded-md border border-[#b9cbe0] bg-white px-3 py-1.5 text-xs font-semibold text-[#1559c5] hover:bg-[#eff6ff]">{item.action}</button></div>)}
                </div>
              </div>

              {recentQuestions.length > 0 && <details className="mt-6 border-t border-[#e6edf4] pt-4"><summary className="cursor-pointer text-sm font-semibold text-[#4d6e95]">Recent officer questions ({recentQuestions.length})</summary><div className="mt-3 space-y-2">{recentQuestions.map((question, index) => <p key={`${question.createdAt}-${index}`} className="rounded-lg bg-[#f8fafc] px-3 py-2 text-xs text-[#4d6e95]">{question.content}</p>)}</div></details>}
            </section>
          </div>

          <aside className="space-y-5" aria-label="Regulatory reference panel">
            <section className="rounded-xl border border-[#d9e5f0] bg-white p-5">
              <div className="flex items-center justify-between gap-3"><h2 className="text-lg font-bold text-[#173b64]">Regulatory Source</h2><span className="rounded-full bg-[#e0f5e8] px-3 py-1 text-xs font-bold text-[#227345]">{selectedSrc.status}</span></div>
              <div className="mt-4 rounded-xl border border-[#dbe5ef] bg-[#f8fbff] p-4"><p className="text-base font-bold text-[#173b64]">{selectedSrc.title}</p><p className="mt-1 text-sm text-[#5f7590]">{selectedSrc.version} · Published {selectedSrc.date}</p><p className="mt-3 text-xs text-[#5f7590]">Authority: <strong className="text-[#173b64]">{selectedSrc.authority}</strong></p></div>
              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2"><div><p className="text-xs text-[#5f7590]">Document ID</p><p className="mt-1 font-semibold text-[#173b64]">{selectedSrc.version}</p></div><div><p className="text-xs text-[#5f7590]">Applicable version</p><p className="mt-1 font-semibold text-[#173b64]">Current configured version</p></div><div><p className="text-xs text-[#5f7590]">Clause</p><p className="mt-1 font-semibold text-[#173b64]">{selectedSrc.clause}</p></div><div><p className="text-xs text-[#5f7590]">Effective date</p><p className="mt-1 font-semibold text-[#173b64]">{selectedSrc.effective}</p></div></div>
              <div className="mt-5 flex flex-wrap gap-2"><button onClick={focusPassage} className="rounded-lg bg-[#1769e0] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#1559c5]">Open Source Document →</button><button onClick={focusPassage} className="rounded-lg border border-[#b9cbe0] bg-white px-4 py-2.5 text-sm font-semibold text-[#1559c5] hover:bg-[#eff6ff]">View Clause {selectedSrc.clause.replace('Clause ', '').split(' — ')[0]} →</button>{onOpenRegChange && <button onClick={onOpenRegChange} className="rounded-lg border border-transparent px-3 py-2.5 text-sm font-semibold text-[#1559c5] hover:bg-[#eff6ff]">View Regulatory Change Centre</button>}</div>
              <details className="mt-4 border-t border-[#e6edf4] pt-3"><summary className="cursor-pointer text-sm font-semibold text-[#4d6e95]">Other regulatory sources ({M32_SOURCES.length - 1})</summary><div className="mt-3 space-y-2">{M32_SOURCES.filter(source => source.id !== selectedSrc.id).map(source => <button key={source.id} onClick={() => setSelectedSrc(source)} className="block w-full rounded-lg border border-[#e0e8f1] px-3 py-2 text-left text-sm text-[#294d78] hover:border-[#8bb8f0] hover:bg-[#f8fbff]"><span className="font-semibold">{source.title}</span><span className="ml-2 text-xs text-[#7a8fa8]">{source.version}</span></button>)}</div></details>
            </section>

            <section className="rounded-xl border border-[#d9e5f0] bg-white p-5">
              <div className="flex items-center justify-between"><h2 className="text-lg font-bold text-[#173b64]">Document outline</h2><span className="text-[#5f7590]" aria-hidden="true">⌕</span></div>
              <div className="mt-3 overflow-hidden rounded-lg border border-[#e0e8f1]">{outlineItems.map(item => <button key={item.label} onClick={() => item.active && focusPassage()} className={`block w-full border-b border-[#edf2f7] px-3 py-2 text-left text-sm last:border-b-0 ${item.active ? 'bg-[#dcecff] font-semibold text-[#1559c5]' : 'text-[#294d78] hover:bg-[#f8fbff]'}`}>{item.label}<span className="float-right text-xs text-[#7a8fa8]">{item.active ? '⌃' : '⌄'}</span></button>)}</div>
            </section>

            <section id="relevant-passage" className="rounded-xl border border-[#d9e5f0] bg-white p-5">
              <div className="flex items-center justify-between gap-3"><h2 className="text-lg font-bold text-[#173b64]">Relevant Passage</h2><button onClick={() => navigator.clipboard?.writeText(DEFAULT_PASSAGE)} className="text-sm font-semibold text-[#1559c5] hover:underline">Copy</button></div>
              <div className="mt-3 rounded-xl border border-[#eadf9e] bg-[#fff9df] p-4"><p className="text-base font-bold text-[#173b64]">{selectedSrc.clause}</p><p className="mt-3 text-sm leading-relaxed text-[#384b62]">{DEFAULT_PASSAGE}</p></div>
            </section>

            <section className="rounded-xl border border-[#d9e5f0] bg-white p-5"><h2 className="text-lg font-bold text-[#173b64]">Related requirements</h2><div className="mt-3 space-y-2">{['Permissible FSI verification', 'Land-use controls', 'Building plan scrutiny', 'Plot / land record verification'].map(item => <button key={item} onClick={() => setEvidenceFocus(item)} className="block w-full rounded-lg border border-[#e0e8f1] px-3 py-2 text-left text-sm font-medium text-[#294d78] hover:border-[#8bb8f0] hover:bg-[#f8fbff]">{item} <span className="float-right">→</span></button>)}</div></section>
          </aside>
        </div>

        <p className="mt-5 rounded-lg border border-[#e0e8f1] bg-white px-4 py-3 text-xs text-[#5f7590]">AI assists. Rules govern. Humans decide. This assistant provides source-backed regulatory context and does not make, approve, or replace a statutory decision.</p>
      </div>
    </main>
  )
}
