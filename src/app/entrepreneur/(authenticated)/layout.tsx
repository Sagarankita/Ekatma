import { AuthenticatedShell } from '@/features/entrepreneur/shell/AuthenticatedShell';
import { RegulatoryAssistantProvider } from '@/features/regulatory-assistant/Provider';
import type { AssistantContext } from '@/features/regulatory-assistant/types';
import { SahyadriDemoControls } from '@/features/demo/SahyadriDemoControls';

const initialContext: AssistantContext = {
  portal: 'entrepreneur', userRole: 'Entrepreneur', route: '/entrepreneur', pageType: 'dashboard',
  pageTitle: 'Entrepreneur workspace', label: 'Entrepreneur workspace', mode: 'page', origin: 'circular', entities: {},
};

export default function AuthenticatedEntrepreneurLayout({ children }: { children: React.ReactNode }) {
  return <RegulatoryAssistantProvider initialContext={initialContext}><AuthenticatedShell>{children}</AuthenticatedShell><SahyadriDemoControls surface="entrepreneur" /></RegulatoryAssistantProvider>;
}
