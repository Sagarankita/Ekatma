'use client';

import { Icon } from '../public-auth/PublicChrome';

export interface RegAssistantContext {
  entryPoint: 'requirement' | 'document' | 'application' | 'query' | 'compliance' | 'incentive' | 'reg-change' | 'general';
  recordId?: string;
  recordName?: string;
  department?: string;
  service?: string;
  grReference?: string;
  initialQuestion?: string;
}

export function RegAssistantTrigger({ onClick, label, lang, size = 'sm' }: {
  onClick: () => void;
  label?: string;
  lang: 'en' | 'mr';
  size?: 'sm' | 'xs';
}) {
  const defaultLabel = lang === 'mr' ? 'नियामक सहाय्यक' : 'Regulatory Assistant';
  const cls = size === 'xs'
    ? 'flex items-center gap-1.5 text-[11px] border border-[#d1d9e0] text-[#1a3a5c] px-2.5 py-1 rounded hover:bg-[#f0f4f8] font-medium transition-colors'
    : 'flex items-center gap-2 text-xs border border-[#d1d9e0] text-[#1a3a5c] px-3 py-1.5 rounded hover:bg-[#f0f4f8] font-medium transition-colors';
  return <button type="button" onClick={onClick} className={cls} aria-label="Open Regulatory Assistant"><Icon.Shield />{label ?? defaultLabel}</button>;
}
