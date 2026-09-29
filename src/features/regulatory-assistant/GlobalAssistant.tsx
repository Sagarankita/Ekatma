'use client';

import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { Icon } from '@/features/entrepreneur/public-auth/PublicChrome';
import { useRegulatoryAssistant } from './Provider';
import type { AssistantContext } from './types';
import { getAssistantPrompts } from './prompts';
import { useSpeechToText, useTextToSpeech } from './useSpeech';

export function GlobalAssistantDrawer() {
  const { isOpen, closeAssistant, activeContext, messages, draft, setDraft, sendMessage, loading, newConversation } = useRegulatoryAssistant();
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const priorFocus = useRef<HTMLElement | null>(null);
  const fullPageHref = activeContext.portal === 'department' ? '/department/regasst' : '/entrepreneur/assistant';

  const currentLang = (typeof window !== 'undefined' && sessionStorage.getItem('entrepreneur_demo_language') === 'mr') ? 'mr' : 'en';

  const { isListening, supported: micSupported, toggleListening } = useSpeechToText(
    (text) => setDraft(text),
    currentLang
  );

  const { speakingId, speak } = useTextToSpeech(currentLang);

  useEffect(() => {
    if (!isOpen) return;
    priorFocus.current = document.activeElement as HTMLElement | null;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 50);
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') closeAssistant(); };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKeyDown);
      priorFocus.current?.focus();
    };
  }, [isOpen, closeAssistant]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);
  if (!isOpen) return null;

  const prompts = getAssistantPrompts(activeContext);
  const entitySummary = Object.entries(activeContext.entities).filter(([, value]) => value).map(([key, value]) => `${key}: ${value}`).join(' · ');
  return <div className="fixed inset-0 z-[70] flex justify-end" role="dialog" aria-modal="true" aria-labelledby="global-assistant-title">
    <button type="button" className="absolute inset-0 bg-black/30" onClick={closeAssistant} aria-label="Close Regulatory Assistant" />
    <section className="relative flex h-full w-[460px] max-w-[96vw] flex-col border-l border-[#d1d9e0] bg-white shadow-2xl">
      <header className="shrink-0 bg-[#1a3a5c] px-4 py-3 text-white">
        <div className="flex items-start gap-2">
          <span className="mt-0.5"><Icon.Shield /></span>
          <div className="min-w-0 flex-1">
            <h2 id="global-assistant-title" className="text-sm font-bold">Regulatory Assistant</h2>
            <p className="text-[11px] text-white/65">Guidance only — not a statutory decision</p>
          </div>
          <Link href={fullPageHref} onClick={closeAssistant} className="rounded px-2 py-1 text-[10px] text-white/75 hover:bg-white/10 hover:text-white">Full research</Link>
          {messages.length > 0 && <button type="button" onClick={newConversation} className="rounded px-2 py-1 text-[10px] text-white/75 hover:bg-white/10 hover:text-white">New</button>}
          <button type="button" onClick={closeAssistant} className="rounded p-1 text-white/70 hover:bg-white/10 hover:text-white" aria-label="Close Regulatory Assistant"><Icon.X /></button>
        </div>
      </header>

      <div className="shrink-0 border-b border-[#bfdbfe] bg-[#eff6ff] px-4 py-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#1a56db]">Viewing</p>
        <p className="truncate text-xs font-semibold text-[#1a3a5c]">{activeContext.label}</p>
        {(activeContext.safeMetadata?.businessName || activeContext.safeMetadata?.projectName) && (
          <p className="truncate text-[10px] font-medium text-[#1a56db]">{[activeContext.safeMetadata?.businessName, activeContext.safeMetadata?.projectName].filter(Boolean).join(' — ')}</p>
        )}
        <p className="truncate text-[10px] text-[#475569]">
          {activeContext.safeMetadata?.recordTitle
            ? `${activeContext.safeMetadata.recordTitle}${entitySummary ? ` · ${entitySummary}` : ''}`
            : entitySummary || activeContext.portal}
        </p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto bg-[#f8f9fb] px-4 py-3" aria-live="polite">
        <div className="space-y-2" data-testid="assistant-prompts">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#9aa5b4]">Suggested questions</p>
          {prompts.map(prompt => <button key={`${activeContext.pageType}-${prompt.id}`} type="button" onClick={() => setDraft(prompt.text)} data-prompt-category={prompt.category} className="block w-full border border-[#d1d9e0] bg-white px-3 py-2 text-left text-xs text-[#1a56db] hover:bg-[#ebf3ff]">{prompt.text}</button>)}
        </div>
        {messages.map(message => message.role === 'context'
          ? <div key={message.id} className="flex items-center gap-2 py-1 text-[10px] text-[#6b7a8d]"><span className="h-px flex-1 bg-[#d1d9e0]"/><span>{message.content}</span><span className="h-px flex-1 bg-[#d1d9e0]"/></div>
          : <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[90%] px-3 py-2.5 text-xs leading-relaxed ${message.role === 'user' ? 'rounded-2xl rounded-tr-sm bg-[#1a3a5c] text-white' : 'rounded-2xl rounded-tl-sm border border-[#d1d9e0] bg-white text-[#1a2533]'}`}>
                {message.role === 'assistant' && <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Answer</p>}
                <p className="whitespace-pre-wrap">{message.content}</p>
                {message.needsVerification && <div className="mt-2 border border-amber-200 bg-amber-50 p-2 text-[10px] text-amber-800"><strong>Needs Verification.</strong> {message.uncertainty}</div>}
                {message.role === 'assistant' && (message.citations?.length || message.relevantRequirement) ? (
                  <dl className="mt-2 grid gap-2 border-t border-[#e8edf2] pt-2 text-[10px]">
                    {message.citations?.length ? (
                      <div>
                        <dt className="font-bold uppercase tracking-wider text-[#64748b]">Source</dt>
                        <dd className="mt-0.5 text-[#374151]">{message.citations.map(citation => [citation.source, citation.clause, citation.version].filter(Boolean).join(' · ')).join('; ')}</dd>
                      </div>
                    ) : null}
                    <div>
                      <dt className="font-bold uppercase tracking-wider text-[#64748b]">Effective date</dt>
                      <dd className="mt-0.5 text-[#374151]">{message.citations?.map(citation => citation.effectiveDate).filter(Boolean).join('; ') || 'Not provided in the configured source'}</dd>
                    </div>
                    <div>
                      <dt className="font-bold uppercase tracking-wider text-[#64748b]">Relevant requirement</dt>
                      <dd className="mt-0.5 text-[#374151]">{message.relevantRequirement ?? activeContext.label}</dd>
                    </div>
                  </dl>
                ) : null}
                {message.role === 'assistant' && (
                  <button
                    type="button"
                    onClick={() => speak(message.content, message.id)}
                    className={`mt-2 flex items-center gap-1.5 text-[10px] font-medium transition-colors ${
                      speakingId === message.id ? 'text-[#1a56db] font-bold' : 'text-[#6b7a8d] hover:text-[#1a3a5c]'
                    }`}
                    title={speakingId === message.id ? 'Stop reading' : 'Read response aloud'}
                    aria-label={speakingId === message.id ? 'Stop reading' : 'Read response aloud'}
                  >
                    {speakingId === message.id ? <Icon.VolumeX /> : <Icon.Volume2 />}
                    <span>{speakingId === message.id ? 'Stop Audio' : 'Listen Response'}</span>
                  </button>
                )}
              </div>
            </div>)}
        {loading && <div className="flex items-center gap-2 text-xs text-[#6b7a8d]"><Icon.Loader /> Consulting configured references…</div>}
        <div ref={endRef} />
      </div>

      <div className="shrink-0 border-t border-[#d1d9e0] bg-white p-3">
        <div className="flex gap-2">
          <input ref={inputRef} value={draft} onChange={event => setDraft(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); void sendMessage(draft); } }} disabled={loading} aria-label="Ask a regulatory question" placeholder={isListening ? "Listening to your voice..." : "Ask a regulatory question…"} className={`min-w-0 flex-1 border px-3 py-2 text-xs focus:outline-none focus:ring-2 ${isListening ? 'border-red-400 bg-red-50 focus:ring-red-400 placeholder:text-red-600' : 'border-[#d1d9e0] focus:ring-[#1a56db]'}`} />
          {micSupported && (
            <button
              type="button"
              onClick={toggleListening}
              disabled={loading}
              className={`px-3 py-2 border text-xs font-semibold rounded flex items-center gap-1 transition-colors ${
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
          <button type="button" onClick={() => void sendMessage(draft)} disabled={!draft.trim() || loading} className="bg-[#1a3a5c] px-4 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">Send</button>
        </div>
      </div>
    </section>
  </div>;
}

export function GlobalAssistantSurface({ pageContext, suppressed = false }: { pageContext: AssistantContext; suppressed?: boolean }) {
  const { isOpen, openAssistant, setPageContext } = useRegulatoryAssistant();
  useEffect(() => { setPageContext(pageContext); }, [pageContext, setPageContext]);
  return <>
    {!isOpen && !suppressed && <button type="button" onClick={() => openAssistant({ origin: 'circular', mode: 'page', context: pageContext })} aria-label="Open Regulatory Assistant" className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-[#1a3a5c] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#93c5fd]"><Icon.Shield /></button>}
    <GlobalAssistantDrawer />
  </>;
}
