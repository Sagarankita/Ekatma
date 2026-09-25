'use client';

import { useEffect, useState } from 'react';
import { useDisplayPreferences } from '../appearance/useDisplayPreferences';
import { E34RegAssistantPage, type RegAssistantContext } from './AssistantScreen';
import { storedAssistantContext } from './context';

export function AssistantRoute({ contextual }: { contextual: boolean }) {
  const { lang } = useDisplayPreferences();
  const [context, setContext] = useState<RegAssistantContext | undefined>();
  useEffect(() => { setContext(contextual ? storedAssistantContext() : undefined); }, [contextual]);
  return <E34RegAssistantPage lang={lang} context={context} />;
}
