'use client';

import { useRouter } from 'next/navigation';
import { M33RegChangePage } from '@/App';
import { ROUTES } from '@/lib/routes';
import { useRegulatoryAssistant } from '@/features/regulatory-assistant/Provider';
import { inlineContext } from '@/features/regulatory-assistant/context';

export default function Page() {
  const router = useRouter();
  const { openAssistant, pageContext } = useRegulatoryAssistant();
  
  return (
    <M33RegChangePage 
      
      onBack={() => router.push(ROUTES.department.home)}
      onOpenRAG={() => openAssistant({ origin: 'inline', mode: 'entity', context: inlineContext(pageContext, { pageType: 'regulatory-changes', pageTitle: 'Regulatory Changes', label: 'Regulatory change review' }) })}
      onOpenImpact={() => router.push(ROUTES.department.regImpact)}
    
    />
  );
}
