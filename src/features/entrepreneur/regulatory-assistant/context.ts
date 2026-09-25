import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { RegAssistantContext } from './Trigger';

const CONTEXT_KEY = 'entrepreneur_assistant_context_v1';

export function contextualAssistantDestination(context: RegAssistantContext): string {
  sessionStorage.setItem(CONTEXT_KEY, JSON.stringify(context));
  return `${ENTREPRENEUR_ROUTES.assistant()}?context=1`;
}

export function storedAssistantContext(): RegAssistantContext | undefined {
  const stored = sessionStorage.getItem(CONTEXT_KEY);
  if (!stored) return undefined;
  try {
    const context = JSON.parse(stored) as RegAssistantContext;
    return context && typeof context.entryPoint === 'string' ? context : undefined;
  } catch {
    return undefined;
  }
}
