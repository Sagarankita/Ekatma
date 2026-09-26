'use client';

import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { temporaryAssistantService } from './service';
import { contextKey, withTrigger } from './context';
import type { AssistantContext, AssistantMessage, AssistantMode, AssistantOrigin, AssistantService } from './types';

interface OpenOptions {
  origin: AssistantOrigin;
  mode: AssistantMode;
  context?: AssistantContext;
  preset?: string;
  presetId?: string;
}

interface AssistantState {
  isOpen: boolean;
  messages: AssistantMessage[];
  activeContext: AssistantContext;
  pageContext: AssistantContext;
  threadId: string;
  draft: string;
  loading: boolean;
  openAssistant: (options: OpenOptions) => void;
  closeAssistant: () => void;
  setPageContext: (context: AssistantContext) => void;
  setActiveContext: (context: AssistantContext) => void;
  setDraft: (draft: string) => void;
  sendMessage: (content: string) => Promise<void>;
  newConversation: () => void;
}

const AssistantStateContext = createContext<AssistantState | null>(null);
const id = () => typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;

export function RegulatoryAssistantProvider({ children, initialContext, service = temporaryAssistantService }: {
  children: React.ReactNode;
  initialContext: AssistantContext;
  service?: AssistantService;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [activeContext, setActiveContextState] = useState(initialContext);
  const [pageContext, setPageContextState] = useState(initialContext);
  const [threadId, setThreadId] = useState(id);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const activeContextRef = useRef(activeContext);
  const requestRef = useRef<{ id: string; controller: AbortController } | null>(null);

  const changeContext = useCallback((next: AssistantContext) => {
    const previous = activeContextRef.current;
    if (contextKey(previous) === contextKey(next)) {
      activeContextRef.current = next;
      setActiveContextState(next);
      return;
    }
    requestRef.current?.controller.abort();
    requestRef.current = null;
    setLoading(false);
    setDraft('');
    setMessages(current => current.length === 0 ? current : [...current, {
      id: id(), role: 'context', createdAt: Date.now(), contextSnapshot: next,
      content: previous.entities.businessId && next.entities.businessId && previous.entities.businessId !== next.entities.businessId
        ? `Context changed from ${previous.entities.businessId} to ${next.entities.businessId}`
        : previous.entities.applicationId && next.entities.applicationId && previous.entities.applicationId !== next.entities.applicationId
          ? `Context changed from ${previous.entities.applicationId} to ${next.entities.applicationId}`
          : `Context changed to ${next.label}`,
    }]);
    activeContextRef.current = next;
    setActiveContextState(next);
  }, []);

  const setPageContext = useCallback((next: AssistantContext) => {
    setPageContextState(next);
    changeContext(next);
  }, [changeContext]);

  const openAssistant = useCallback((options: OpenOptions) => {
    const base = options.context ?? pageContext;
    const next = withTrigger(base, options.origin, options.mode, options.presetId);
    changeContext(next);
    if (options.preset) setDraft(options.preset);
    setIsOpen(true);
  }, [changeContext, pageContext]);

  const sendMessage = useCallback(async (content: string) => {
    const normalized = content.trim();
    if (!normalized || loading) return;
    const snapshot = activeContextRef.current;
    const userMessage: AssistantMessage = { id: id(), role: 'user', content: normalized, createdAt: Date.now(), contextSnapshot: snapshot };
    const priorMessages = [...messages, userMessage];
    setMessages(priorMessages);
    setDraft('');
    setLoading(true);
    const requestId = id();
    const controller = new AbortController();
    requestRef.current = { id: requestId, controller };
    try {
      const response = await service.sendMessage({ message: normalized, content: normalized, context: snapshot, threadId, messages: priorMessages }, controller.signal);
      if (requestRef.current?.id !== requestId || contextKey(activeContextRef.current) !== contextKey(snapshot)) return;
      setMessages(current => [...current, {
        id: id(), role: 'assistant', content: response.content, createdAt: Date.now(), contextSnapshot: snapshot,
        citations: response.citations, needsVerification: response.needsVerification, uncertainty: response.uncertainty,
      }]);
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) throw error;
    } finally {
      if (requestRef.current?.id === requestId) {
        requestRef.current = null;
        setLoading(false);
      }
    }
  }, [loading, messages, service, threadId]);

  const newConversation = useCallback(() => {
    requestRef.current?.controller.abort();
    requestRef.current = null;
    setMessages([]); setDraft(''); setLoading(false); setThreadId(id());
  }, []);

  const value = useMemo<AssistantState>(() => ({
    isOpen, messages, activeContext, pageContext, threadId, draft, loading,
    openAssistant, closeAssistant: () => setIsOpen(false), setPageContext, setActiveContext: changeContext,
    setDraft, sendMessage, newConversation,
  }), [isOpen, messages, activeContext, pageContext, threadId, draft, loading, openAssistant, setPageContext, changeContext, sendMessage, newConversation]);

  return <AssistantStateContext.Provider value={value}>{children}</AssistantStateContext.Provider>;
}

export function useRegulatoryAssistant(): AssistantState {
  const value = useContext(AssistantStateContext);
  if (!value) throw new Error('useRegulatoryAssistant must be used within RegulatoryAssistantProvider');
  return value;
}
