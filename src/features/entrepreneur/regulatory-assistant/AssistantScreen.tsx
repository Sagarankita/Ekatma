'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '../public-auth/PublicChrome';
import { useRegulatoryAssistant } from '@/features/regulatory-assistant/Provider';
import { inlineContext } from '@/features/regulatory-assistant/context';
import { useSpeechToText, useTextToSpeech } from '@/features/regulatory-assistant/useSpeech';

const inputDefault = 'w-full px-3 py-2 text-sm border rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:border-[#1a56db] transition-colors placeholder:text-[#9aa5b4] border-[#d1d9e0]';

function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return <nav aria-label="Breadcrumb"><ol className="flex items-center gap-1 text-sm text-[#6b7a8d]">{items.map((item, i) => <li key={`${item.label}-${i}`} className="flex items-center gap-1">{i > 0 && <Icon.ChevronRight />}<span className="text-[#1a2533]">{item.label}</span></li>)}</ol></nav>;
}

type RegEntryPoint = 'requirement' | 'document' | 'application' | 'query' | 'compliance' | 'incentive' | 'reg-change' | 'general'

export interface RegAssistantContext {
  entryPoint: RegEntryPoint
  recordId?: string
  recordName?: string
  department?: string
  service?: string
  grReference?: string
  initialQuestion?: string
}

interface RegAssistantMessage {
  role: 'user' | 'assistant' | 'context'
  text: string
  source?: string
  clause?: string
  effectiveDate?: string
  related?: string
  needsVerification?: boolean
  uncertainty?: string
}

// Context-specific suggested questions per entry point
const REG_SUGGESTED_QUESTIONS: Record<RegEntryPoint, string[]> = {
  requirement: [
    'Why is this approval required?',
    'Which GR / rule supports this?',
    'What happens after I submit?',
    'Which application section is affected?',
    'Explain in Marathi',
  ],
  document: [
    'Why is this document required?',
    'What should this document contain?',
    'Where can I obtain it?',
    'Which GR / rule requires it?',
    'Can I reuse this document across services?',
  ],
  application: [
    'Which section of my application is affected?',
    'Why is this field required?',
    'Which GR supports this requirement?',
    'What happens after submission?',
    'Explain in Marathi',
  ],
  query: [
    'What does this department query mean?',
    'Which section of my application is affected?',
    'How should I respond to this query?',
    'Which rule or GR supports this?',
    'Explain in Marathi',
  ],
  compliance: [
    'What is this compliance obligation?',
    'When is the renewal due and what are the penalties?',
    'What documents are required for renewal?',
    'Which GR / rule governs this obligation?',
    'What changed in this requirement?',
  ],
  incentive: [
    'Why is this scheme applicable to my business?',
    'Which eligibility conditions am I missing?',
    'What evidence documents are required?',
    'Which GR governs this scheme?',
    'What needs verification before I apply?',
  ],
  'reg-change': [
    'What exactly changed?',
    'How does this change affect my business?',
    'Do I need to take any action?',
    'What is the effective date?',
    'Explain in Marathi',
  ],
  general: [
    'Why is this approval required?',
    'Why is this document required?',
    'What should this document contain?',
    'Which GR / rule supports this?',
    'What does this department query mean?',
    'What changed?',
    'Explain in Marathi',
  ],
}

// Rich mock responses keyed by canonical question text
const REG_MOCK_RESPONSES: RegAssistantMessage[] = [
  {
    role: 'assistant',
    text: 'The Consent to Establish (CTE) is required under Section 25 of the Water (Prevention and Control of Pollution) Act, 1974, and Section 21 of the Air (Prevention and Control of Pollution) Act, 1981. Any new or expanded industrial unit that may cause pollution to water or air must obtain CTE before establishing the facility.\n\nAs a pharmaceutical manufacturing unit at Chakan, you generate industrial effluent exceeding 100 KLD and have air emissions from boiler stacks and process vents — both conditions independently trigger the mandatory CTE requirement from MPCB.',
    source: 'Water (Prevention and Control of Pollution) Act, 1974; Air (Prevention and Control of Pollution) Act, 1981; MPCB CTE Guidelines 2021',
    clause: 'Section 25 (Water Act 1974); Section 21 (Air Act 1981)',
    effectiveDate: 'Water Act: 23 Mar 1974; Air Act: 29 Mar 1981 (both as amended to date)',
    related: 'Consent to Operate (CTO) — required post-establishment before production begins. Environmental Clearance (EC) under EIA Notification 2006 may apply depending on total project capacity.',
    needsVerification: false,
  },
  {
    role: 'assistant',
    text: 'The IBR Certificate (Indian Boiler Regulations Certificate) is required under the Indian Boilers Act, 1923, read with IBR Rules, 1950. Any boiler with a steam generating capacity above the prescribed threshold must be inspected and certified by the Maharashtra Boiler Inspectorate before it is placed in service.\n\nFor your Factory Registration application, the Inspector of Factories (DISH) requires proof that your boiler — rated at 4 TPH at 10.5 bar — meets IBR safety standards prior to factory registration.',
    source: 'Indian Boilers Act, 1923 (as amended); Indian Boiler Regulations, 1950; Maharashtra Factories Act, 1948',
    clause: 'Section 6–8, Indian Boilers Act 1923; IBR Regulation 4; MFA 1948 Schedule III',
    effectiveDate: 'Indian Boilers Act: 1923 (last amended 2007)',
    related: 'Factory Registration Certificate (DISH); Annual IBR Renewal; Boiler Inspection Report (annual statutory requirement post-registration).',
    needsVerification: false,
  },
  {
    role: 'assistant',
    text: 'The IBR Certificate must contain the following:\n\n1. Boiler registration number issued by the Boiler Inspectorate\n2. Make, model, and manufacturer\'s serial number of the boiler\n3. Rated steam generating capacity (in TPH or kg/hr)\n4. Maximum allowable working pressure (MAWP) in bar\n5. Date of last hydraulic test and next due date\n6. Inspector\'s signature and official seal\n7. Validity period (typically one year)\n\nFor a new boiler not yet installed, submit the IBR Type Approval Certificate from the manufacturer along with the design drawings approved by the Chief Inspector of Boilers.',
    source: 'IBR 1950, Chapter II — Registration and Inspection Procedure',
    clause: 'IBR Regulation 4, 5, and 12; Form VIII (IBR Certificate of Fitness)',
    effectiveDate: 'IBR 1950 as amended; DISH Maharashtra Circular 2019-DISH-03',
    related: 'Boiler Safety Certificate; Annual IBR Renewal; Factory Plan Approval (DISH) — boiler layout must match approved plan.',
    needsVerification: false,
  },
  {
    role: 'assistant',
    text: 'The most directly applicable Government Resolution is:\n\nGR No. IND-2022/CR-119/IND-2 dated 14 March 2022, Government of Maharashtra, Industries, Energy and Labour Department — this consolidates the single-window clearance procedure for new industrial establishments under EKATMA.\n\nUnder this GR, MPCB CTE is listed as a mandatory pre-establishment clearance for Category B and C industries, and Factory Registration (DISH) is mandatory for establishments employing 10 or more workers using power.\n\nFor your pharmaceutical unit, both clearances are triggered.',
    source: 'GR No. IND-2022/CR-119/IND-2, Dt. 14 Mar 2022, MIELD; GR No. MPCB/ENV/2021/CTE-09, Dt. 22 Jun 2021',
    clause: 'Para 3.2 — Mandatory Pre-Establishment Clearances; Para 5.1 — Single Window Obligation',
    effectiveDate: '14 March 2022',
    related: 'Maharashtra Industries Policy 2019 (GR No. IND-2019/C.R.66/IND-2); EKATMA Single Window Framework (notified under same GR).',
    needsVerification: false,
  },
  {
    role: 'assistant',
    text: 'The IBR Certificate may be obtained from the Office of the Chief Inspector of Boilers (CIB), Maharashtra. The process is:\n\n1. Submit an application in Form I to the CIB / Boiler Inspectorate, Pune Regional Office\n2. Arrange for a hydraulic pressure test witnessed by a certified inspector\n3. After successful inspection, the Inspector issues Form VIII (Certificate of Fitness)\n4. For manufactured boilers, the manufacturer submits the IBR type approval; you receive a certified copy\n\nContact: Office of the Chief Inspector of Boilers, Maharashtra, Pune — Telephone: 020-XXXXXXXX\nAlternatively, apply online through DISH Maharashtra\'s single-window portal.',
    source: 'IBR 1950, Chapter II; DISH Maharashtra — Boiler Inspection Procedure Circular 2020',
    clause: 'IBR Regulation 4 and 5; Form I (Application) and Form VIII (Certificate)',
    effectiveDate: 'IBR 1950 as amended to date',
    related: 'Annual renewal required under IBR Regulation 12. Factory Registration cannot proceed without valid IBR Certificate for boilers above threshold capacity.',
    needsVerification: false,
  },
  {
    role: 'assistant',
    text: 'MPCB issued revised industrial effluent discharge standards vide Circular No. MPCB/ENV/2026/1142 dated 15 September 2026. The key changes are:\n\n1. Reduction of Total Dissolved Solids (TDS) permissible limit from 2100 mg/L to 1500 mg/L for industrial effluent discharged to MIDC drains\n2. Mandatory Zero Liquid Discharge (ZLD) for pharmaceutical units generating > 100 KLD process wastewater\n3. Revised online monitoring requirements — CEMS data must be transmitted to MPCB servers in real time for units > 500 TPD production\n\nEffective date: 15 September 2026 (immediate for new applications; 6-month transition for existing consented units).',
    source: 'MPCB Circular No. MPCB/ENV/2026/1142, Dt. 15 Sep 2026; EIA Notification Amendment 2026',
    clause: 'Schedule I — Amended Effluent Discharge Standards 2026; Annexure III — ZLD Requirements',
    effectiveDate: '15 September 2026',
    related: 'Your ETP design (150 KLD ZLD system) appears compliant with the new norms. However, the CEMS integration requirement needs verification against your current monitoring setup.',
    needsVerification: true,
    uncertainty: 'CEMS real-time transmission applicability to your specific unit capacity needs to be confirmed with MPCB\'s technical officer before the next inspection.',
  },
  {
    role: 'assistant',
    text: 'The Inspector of Factories (DISH) query regarding "boiler capacity certificate" is requesting formal proof that your boiler — rated at 4 TPH at 10.5 bar pressure — has been inspected and certified under the Indian Boilers Act. This is a standard verification step in the Factory Registration process.\n\nThe query means you must upload:\n1. IBR Certificate of Fitness (Form VIII) — from the Boiler Inspectorate\n2. Last annual inspection report (if the boiler is existing and in service)\n3. Manufacturer\'s IBR Type Approval (if the boiler is new and not yet installed)\n\nNote: The query does not indicate a deficiency in your application design — it is a routine document verification.',
    source: 'DISH Query Reference: FAC-2026-3371-Q2, Dt. 14 Sep 2026',
    clause: 'Maharashtra Factories Act, 1948 — Rule 44 (Boiler Requirements); IBR 1950 — Regulation 4',
    effectiveDate: 'Query raised: 14 Sep 2026. Response deadline: 30 Sep 2026.',
    related: 'Upload to: E11 Document Centre → Factory Registration → IBR Certificate. Once uploaded, the query status will update to "Responded."',
    needsVerification: false,
  },
  {
    role: 'assistant',
    text: 'The Factory Registration requirement is triggered by Section 2(m) and Section 6 of the Factories Act, 1948, which applies to any premises using power and employing 10 or more workers (or 20 or more workers without power). Your pharmaceutical unit employs 120 permanent workers with 1500 kW connected load — both thresholds are met.\n\nThe section of your application affected is Section 3 — Factory Details, specifically:\n- Section 3.2: Workforce and employment particulars\n- Section 3.4: Boiler and pressure vessel details\n- Section 3.6: Hazardous process declaration (Schedule to Factories Act)',
    source: 'Factories Act, 1948; Maharashtra Factories Rules, 1963; DISH Maharashtra Application Form FA-1',
    clause: 'Section 2(m), Section 6, Section 7A; Schedule I (Hazardous Processes)',
    effectiveDate: 'Factories Act: 1948 (as amended to 1987)',
    related: 'Director General of Factory Advice Service (DGFASLI) standards apply for hazardous process classification. Inspector of Factories inspection is required post-registration.',
    needsVerification: false,
  },
  {
    role: 'assistant',
    text: 'या मंजुरीची (CTE — Consent to Establish) आवश्यकता जल (प्रदूषण प्रतिबंध व नियंत्रण) अधिनियम, 1974 च्या कलम 25 आणि वायू (प्रदूषण प्रतिबंध व नियंत्रण) अधिनियम, 1981 च्या कलम 21 अंतर्गत आहे.\n\nतुमचा फार्मास्युटिकल प्रकल्प चाकण येथे औद्योगिक सांडपाणी (> 100 KLD) आणि वायू उत्सर्जन निर्माण करतो — या दोन्ही कारणांमुळे MPCB कडून CTE अनिवार्य आहे.\n\nही परवानगी कारखाना उभारणीपूर्वी घेणे आवश्यक आहे. उत्पादन सुरू करण्यापूर्वी CTO (Consent to Operate) घेणे आवश्यक असेल.',
    source: 'जल अधिनियम 1974, कलम 25; वायू अधिनियम 1981, कलम 21; MPCB CTE मार्गदर्शक सूचना 2021',
    clause: 'कलम 25 (जल अधिनियम); कलम 21 (वायू अधिनियम)',
    effectiveDate: 'जल अधिनियम: 23 मार्च 1974; वायू अधिनियम: 29 मार्च 1981',
    related: 'CTO (Consent to Operate) — उत्पादनापूर्वी आवश्यक. पर्यावरण मंजुरी (EC) — प्रकल्पाच्या क्षमतेनुसार लागू असू शकते.',
    needsVerification: false,
  },
]

// Match a question to a response
function matchRegResponse(text: string, context: RegAssistantContext | null): RegAssistantMessage {
  if (!context || context.entryPoint === 'general') {
    return {
      role: 'assistant',
      text: 'This demo assistant needs a specific requirement, document, application, or notice to give a record-based explanation. Open it from the related record when that record is available. For a general question, check the applicable department guidance before acting.',
      needsVerification: true,
      uncertainty: 'No verified record or business context was supplied for this question.',
    }
  }
  const q = text.toLowerCase()
  if (q.includes('marathi') || q.includes('मराठी') || q.includes('explain in marathi')) return REG_MOCK_RESPONSES[8]
  if (q.includes('approval required') || q.includes('why is this approval') || q.includes('why is this requirement') || q.includes('why is this applicable')) return REG_MOCK_RESPONSES[0]
  if ((q.includes('document required') || q.includes('why is this doc')) && !q.includes('contain') && !q.includes('obtain')) return REG_MOCK_RESPONSES[1]
  if (q.includes('contain') || q.includes('should this document')) return REG_MOCK_RESPONSES[2]
  if (q.includes('gr') || q.includes('rule') || q.includes('government resolution') || q.includes('which rule')) return REG_MOCK_RESPONSES[3]
  if (q.includes('obtain') || q.includes('where can') || q.includes('where do')) return REG_MOCK_RESPONSES[4]
  if (q.includes('changed') || q.includes('what changed') || q.includes('what exact')) return REG_MOCK_RESPONSES[5]
  if (q.includes('query mean') || q.includes('department query') || q.includes('deficiency') || q.includes('respond')) return REG_MOCK_RESPONSES[6]
  if (q.includes('section') || q.includes('application') || q.includes('which section')) return REG_MOCK_RESPONSES[7]

  // Context-aware fallback
  if (context?.entryPoint === 'requirement') return REG_MOCK_RESPONSES[0]
  if (context?.entryPoint === 'document') return REG_MOCK_RESPONSES[1]
  if (context?.entryPoint === 'query') return REG_MOCK_RESPONSES[6]
  if (context?.entryPoint === 'reg-change') return REG_MOCK_RESPONSES[5]

  return {
    role: 'assistant',
    text: 'I can help with questions about regulatory requirements, documents, GRs, departmental queries, and regulatory changes related to your applications. Please rephrase your question, or select one of the suggested questions shown when the conversation starts.\n\nNote: I cannot approve, reject, or substitute a department decision. When applicability is unclear, I will always mark the response as Needs Verification.',
    needsVerification: false,
  }
}

// The "Ask Regulatory Assistant" trigger button — used inline on entry-point pages
function RegAssistantTrigger({ onClick, label, lang, size = 'sm' }: {
  onClick: () => void
  label?: string
  lang: 'en' | 'mr'
  size?: 'sm' | 'xs'
}) {
  const defaultLabel = lang === 'mr' ? 'नियामक सहाय्यक' : 'Regulatory Assistant'
  const cls = size === 'xs'
    ? 'flex items-center gap-1.5 text-[11px] border border-[#d1d9e0] text-[#1a3a5c] px-2.5 py-1 rounded hover:bg-[#f0f4f8] font-medium transition-colors'
    : 'flex items-center gap-2 text-xs border border-[#d1d9e0] text-[#1a3a5c] px-3 py-1.5 rounded hover:bg-[#f0f4f8] font-medium transition-colors'
  return (
    <button onClick={onClick} className={cls} aria-label="Open Regulatory Assistant">
      <Icon.Shield />
      {label ?? defaultLabel}
    </button>
  )
}

export function E34RegAssistantDrawer({
  isOpen,
  onClose,
  context,
  lang,
}: {
  isOpen: boolean
  onClose: () => void
  context: RegAssistantContext | null
  lang: 'en' | 'mr'
}) {
  const [messages, setMessages] = useState<RegAssistantMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionKey, setSessionKey] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { isListening, supported: micSupported, toggleListening } = useSpeechToText(
    (text) => setInput(text),
    lang === 'mr' ? 'mr' : 'en'
  );

  const { speakingId, speak } = useTextToSpeech(lang === 'mr' ? 'mr' : 'en');

  // Auto-inject initial question when drawer opens with a context
  useEffect(() => {
    if (isOpen && context?.initialQuestion && messages.length === 0) {
      const timer = setTimeout(() => sendMessage(context.initialQuestion!), 300)
      return () => clearTimeout(timer)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, sessionKey])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const t = {
    en: {
      title: 'Regulatory Assistant',
      subtitle: 'Guidance only — not a statutory decision',
      context: 'Context',
      placeholder: 'Ask a regulatory question…',
      send: 'Send',
      suggested: 'Suggested questions for this record',
      suggestedGeneral: 'Suggested questions',
      consulting: 'Consulting regulations…',
      disclaimer: 'This assistant retrieves and explains regulatory information from official sources. It does not approve, reject, or substitute a department decision. When applicability is uncertain, it will say so explicitly.',
      noApproval: 'Cannot approve, reject, or modify obligations.',
      needsVerification: 'Needs Verification',
      needsVerificationDesc: 'Confirm with the relevant authority before acting on this guidance.',
      uncertainty: 'Uncertainty',
      source: 'Source',
      clause: 'Clause / Section',
      effective: 'Effective Date',
      related: 'Related Requirement',
      clearSession: 'New session',
    },
    mr: {
      title: 'नियामक सहाय्यक',
      subtitle: 'केवळ मार्गदर्शन — वैधानिक निर्णय नाही',
      context: 'संदर्भ',
      placeholder: 'नियामक प्रश्न विचारा…',
      send: 'पाठवा',
      suggested: 'या नोंदीसाठी सुचवलेले प्रश्न',
      suggestedGeneral: 'सुचवलेले प्रश्न',
      consulting: 'नियमांचा आढावा घेत आहे…',
      disclaimer: 'हा सहाय्यक अधिकृत स्रोतांमधून नियामक माहिती पुनर्प्राप्त आणि स्पष्ट करतो. तो विभागाचा निर्णय मंजूर, नाकारू किंवा बदलू शकत नाही.',
      noApproval: 'दायित्वे मंजूर, नाकारू किंवा सुधारू शकत नाही.',
      needsVerification: 'पडताळणी आवश्यक',
      needsVerificationDesc: 'या मार्गदर्शनावर कार्य करण्यापूर्वी संबंधित प्राधिकरणाशी खात्री करा.',
      uncertainty: 'अनिश्चितता',
      source: 'स्रोत',
      clause: 'कलम / विभाग',
      effective: 'प्रभावी दिनांक',
      related: 'संबंधित आवश्यकता',
      clearSession: 'नवीन सत्र',
    },
  }[lang]

  const entryPoint = context?.entryPoint ?? 'general'
  const suggestedQs = REG_SUGGESTED_QUESTIONS[entryPoint]

  const entryPointLabel: Record<RegEntryPoint, { en: string; mr: string }> = {
    requirement:  { en: 'Requirement', mr: 'आवश्यकता' },
    document:     { en: 'Document', mr: 'दस्तऐवज' },
    application:  { en: 'Application', mr: 'अर्ज' },
    query:        { en: 'Query / Deficiency', mr: 'चौकशी / कमतरता' },
    compliance:   { en: 'Compliance', mr: 'अनुपालन' },
    incentive:    { en: 'Incentive / Scheme', mr: 'प्रोत्साहन / योजना' },
    'reg-change': { en: 'Regulatory Change', mr: 'नियामक बदल' },
    general:      { en: 'General', mr: 'सामान्य' },
  }

  function sendMessage(text: string) {
    if (!text.trim() || loading) return
    const userMsg: RegAssistantMessage = { role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    setTimeout(() => {
      const response = matchRegResponse(text, context)
      setMessages(prev => [...prev, response])
      setLoading(false)
    }, 900 + Math.random() * 400)
  }

  if (!isOpen) return null

  const contextHasRecord = context && context.recordName
  const epLabel = entryPointLabel[entryPoint][lang]

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-labelledby="reg-assistant-title">
      <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" onClick={onClose} aria-hidden="true" />
      <div className="relative bg-white w-[460px] max-w-[95vw] h-full shadow-2xl flex flex-col border-l border-[#d1d9e0]">

        {/* ── Header ── */}
        <div className="bg-[#1a3a5c] text-white px-4 pt-4 pb-3 shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-white/80 shrink-0"><Icon.Shield /></span>
                <h2 id="reg-assistant-title" className="text-sm font-bold leading-tight">{t.title}</h2>
                <span className="text-[10px] bg-white/15 border border-white/20 px-1.5 py-0.5 rounded font-mono text-white/70 shrink-0">RAG</span>
              </div>
              <p className="text-xs text-white/60 leading-tight">{t.subtitle}</p>

              {/* Context pill */}
              {contextHasRecord && (
                <div className="mt-2 flex items-start gap-2">
                  <span className="text-[10px] text-white/40 uppercase tracking-wider font-medium shrink-0 mt-0.5">{t.context}:</span>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[11px] bg-white/10 border border-white/15 px-2 py-0.5 rounded text-white/80 font-medium">{epLabel}</span>
                    <span className="text-[11px] bg-white/10 border border-white/15 px-2 py-0.5 rounded text-white/70 truncate max-w-[240px]">{context.recordName}</span>
                  </div>
                </div>
              )}
              {!contextHasRecord && context && (
                <div className="mt-1.5">
                  <span className="text-[11px] bg-white/10 border border-white/15 px-2 py-0.5 rounded text-white/70">{epLabel}</span>
                </div>
              )}
            </div>
            <div className="flex items-start gap-1 shrink-0">
              {messages.length > 0 && (
                <button onClick={() => setMessages([])} className="text-[10px] text-white/50 hover:text-white/80 px-2 py-1 rounded hover:bg-white/10 transition-colors">{t.clearSession}</button>
              )}
              <button onClick={onClose} className="p-1 text-white/60 hover:text-white transition-colors" aria-label="Close Regulatory Assistant">
                <Icon.X />
              </button>
            </div>
          </div>
        </div>

        {/* ── Boundary notice ── */}
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-start gap-2 shrink-0">
          <span className="text-amber-500 shrink-0 mt-px"><Icon.Warning /></span>
          <p className="text-[11px] text-amber-800 leading-snug">{t.disclaimer}</p>
        </div>

        {/* ── Messages area ── */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-[#f8f9fb]">

          {/* Initial state — suggested questions */}
          {messages.length === 0 && !loading && (
            <div className="space-y-2.5">
              <p className="text-[10px] text-[#9aa5b4] font-bold uppercase tracking-wider">
                {contextHasRecord ? t.suggested : t.suggestedGeneral}
              </p>
              <div className="space-y-1.5">
                {suggestedQs.map(q => (
                  <button key={q} onClick={() => sendMessage(q)}
                    className="w-full text-left text-xs text-[#1a56db] bg-white hover:bg-[#ebf3ff] border border-[#d1d9e0] hover:border-blue-200 rounded px-3 py-2 transition-colors leading-snug">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message thread */}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'user' ? (
                <div className="bg-[#1a3a5c] text-white text-xs rounded-2xl rounded-tr-sm px-3.5 py-2.5 max-w-[85%] leading-relaxed">
                  {msg.text}
                </div>
              ) : (
                <div className="bg-white border border-[#d1d9e0] rounded-2xl rounded-tl-sm p-3.5 max-w-[100%] space-y-2.5 shadow-sm">
                  {/* Answer */}
                  <p className="text-xs text-[#1a2533] leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                  {/* Needs Verification callout */}
                  {msg.needsVerification && (
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-2.5">
                      <span className="text-amber-500 shrink-0 mt-px"><Icon.Warning /></span>
                      <div>
                        <p className="text-[11px] font-bold text-amber-800">{t.needsVerification}</p>
                        <p className="text-[11px] text-amber-700 mt-0.5">{msg.uncertainty || t.needsVerificationDesc}</p>
                      </div>
                    </div>
                  )}

                  {/* Structured citation block */}
                  {(msg.source || msg.clause || msg.effectiveDate || msg.related) && (
                    <div className="border border-[#e8edf2] rounded-lg overflow-hidden bg-[#fafbfc]">
                      <div className="px-3 py-1.5 bg-[#f0f4f8] border-b border-[#e8edf2]">
                        <p className="text-[10px] font-bold text-[#6b7a8d] uppercase tracking-wider">Regulatory Reference</p>
                      </div>
                      <div className="px-3 py-2.5 space-y-2">
                        {msg.source && (
                          <div className="flex gap-2">
                            <span className="text-[10px] font-bold text-[#9aa5b4] uppercase tracking-wider w-20 shrink-0 mt-px">{t.source}</span>
                            <span className="text-[11px] text-[#374151] leading-snug flex-1">{msg.source}</span>
                          </div>
                        )}
                        {msg.clause && (
                          <div className="flex gap-2">
                            <span className="text-[10px] font-bold text-[#9aa5b4] uppercase tracking-wider w-20 shrink-0 mt-px">{t.clause}</span>
                            <span className="text-[11px] text-[#374151] leading-snug flex-1">{msg.clause}</span>
                          </div>
                        )}
                        {msg.effectiveDate && (
                          <div className="flex gap-2">
                            <span className="text-[10px] font-bold text-[#9aa5b4] uppercase tracking-wider w-20 shrink-0 mt-px">{t.effective}</span>
                            <span className="text-[11px] text-[#374151] leading-snug flex-1">{msg.effectiveDate}</span>
                          </div>
                        )}
                        {msg.related && (
                          <div className="flex gap-2">
                            <span className="text-[10px] font-bold text-[#9aa5b4] uppercase tracking-wider w-20 shrink-0 mt-px">{t.related}</span>
                            <span className="text-[11px] text-[#374151] leading-snug flex-1">{msg.related}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Inline quick follow-up chips if this isn't the last message */}
                  {i === messages.length - 1 && !loading && (
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {suggestedQs.slice(0, 3).filter(q => !messages.some(m => m.role === 'user' && m.text === q)).map(q => (
                        <button key={q} onClick={() => sendMessage(q)}
                          className="text-[10px] text-[#1a56db] bg-[#ebf3ff] hover:bg-blue-100 border border-blue-200 rounded-full px-2 py-0.5 transition-colors leading-snug">
                          {q}
                        </button>
                      ))}
                    </div>
                  )}

                  {msg.role === 'assistant' && (
                    <button
                      type="button"
                      onClick={() => speak(msg.text, `msg-${i}`)}
                      className={`mt-2 flex items-center gap-1.5 text-[10px] font-medium transition-colors ${
                        speakingId === `msg-${i}` ? 'text-[#1a56db] font-bold' : 'text-[#6b7a8d] hover:text-[#1a3a5c]'
                      }`}
                      title={speakingId === `msg-${i}` ? 'Stop reading' : 'Read response aloud'}
                      aria-label={speakingId === `msg-${i}` ? 'Stop reading' : 'Read response aloud'}
                    >
                      {speakingId === `msg-${i}` ? <Icon.VolumeX /> : <Icon.Volume2 />}
                      <span>{speakingId === `msg-${i}` ? (lang === 'mr' ? 'अॉडिओ थांबवा' : 'Stop Audio') : (lang === 'mr' ? 'उत्तर ऐका' : 'Listen Response')}</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-[#d1d9e0] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2 text-xs text-[#6b7a8d] shadow-sm">
                <Icon.Loader />
                {t.consulting}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── Input ── */}
        <div className="border-t border-[#d1d9e0] bg-white px-3 pt-2.5 pb-3 shrink-0">
          <p className="text-[10px] text-[#b0bcc9] mb-2">{t.noApproval}</p>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey && !loading) {
                  e.preventDefault()
                  sendMessage(input)
                }
              }}
              placeholder={isListening ? (lang === 'mr' ? 'तुमचा आवाज ऐकत आहे...' : 'Listening to your voice...') : t.placeholder}
              className={`${inputDefault} flex-1 text-xs ${isListening ? 'border-red-400 bg-red-50 focus:ring-red-400 placeholder:text-red-600' : ''}`}
              aria-label={t.placeholder}
              disabled={loading}
            />
            {micSupported && (
              <button
                type="button"
                onClick={toggleListening}
                disabled={loading}
                className={`px-3 py-2 border text-xs font-semibold rounded flex items-center gap-1 transition-colors shrink-0 ${
                  isListening
                    ? 'bg-red-600 text-white border-red-700 animate-pulse'
                    : 'bg-white text-[#4a5568] border-[#d1d9e0] hover:bg-[#f0f4f8] hover:text-[#1a3a5c]'
                }`}
                title={isListening ? 'Stop listening' : 'Voice Input (Speech to Text)'}
                aria-label={isListening ? 'Stop listening' : 'Start voice input'}
              >
                {isListening ? <Icon.MicOff /> : <Icon.Mic />}
              </button>
            )}
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="bg-[#1a3a5c] text-white text-xs font-semibold px-3.5 py-2 rounded hover:bg-[#0f2540] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              {t.send}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Standalone E34 page — accessible from dev toolbar and Help icon
export function E34RegAssistantPage({ lang, context = { entryPoint: 'general' } }: { lang: 'en' | 'mr'; context?: RegAssistantContext }) {
  const { openAssistant, pageContext } = useRegulatoryAssistant()
  const sharedContext = inlineContext(pageContext, {
    pageType: context.entryPoint === 'general' ? 'assistant-research' : context.entryPoint,
    pageTitle: 'Regulatory Assistant',
    label: context.recordName ?? 'Regulatory Assistant',
    recordTitle: context.recordName,
  })
  const t = {
    en: { title: 'Regulatory Assistant', intro: 'Ask questions about requirements, documents, GRs, departmental queries, and regulatory changes. The assistant is open on the right.', open: 'Open Regulatory Assistant' },
    mr: { title: 'नियामक सहाय्यक', intro: 'आवश्यकता, दस्तऐवज, GR, विभागीय चौकशी आणि नियामक बदलांबद्दल प्रश्न विचारा.', open: 'नियामक सहाय्यक उघडा' },
  }[lang]
  return (
    <main id="main-content" className="flex-1 bg-[#f8f9fb]" tabIndex={-1}>
      <div className="max-w-[960px] mx-auto px-6 py-5">
        <div className="mb-4">
          <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: t.title }]} />
        </div>
        <div className="bg-white border border-[#d1d9e0] rounded p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-[#f0f4f8] border border-[#d1d9e0] flex items-center justify-center text-[#1a3a5c] mx-auto mb-4">
            <Icon.Shield />
          </div>
          <h1 className="text-base font-semibold text-[#1a2533] mb-2">{t.title}</h1>
          <p className="text-sm text-[#6b7a8d] max-w-sm mx-auto mb-5">{t.intro}</p>
          <div className="flex flex-wrap gap-3 justify-center text-xs text-[#6b7a8d] mb-6">
            {['Requirement Detail', 'Document Detail', 'Application', 'Query', 'Compliance', 'Incentive / Scheme', 'Regulatory Change'].map(ep => (
              <span key={ep} className="bg-[#f0f4f8] border border-[#d1d9e0] rounded px-3 py-1">{ep}</span>
            ))}
          </div>
          <button onClick={() => openAssistant({ origin: 'full-page', mode: 'research', context: sharedContext, preset: context.initialQuestion })} className="bg-[#1a3a5c] text-white text-sm font-medium px-5 py-2 rounded hover:bg-[#0f2540] transition-colors">
            {t.open}
          </button>
        </div>
      </div>
    </main>
  )
}
