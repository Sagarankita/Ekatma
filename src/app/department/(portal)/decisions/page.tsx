'use client';

import { DecisionsDashboard } from '@/App';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';

export default function DecisionsPage() {
  const router = useRouter();
  return (
    <DecisionsDashboard 
      onOpenApp={appId => router.push(ROUTES.department.applicationDecisionWorkspace(appId))}
      onOpenCompliance={(appId, complianceId) => router.push(ROUTES.department.compliance(appId, complianceId))}
      onOpenDependencyUpdate={(appId, dependencyNodeId) => router.push(ROUTES.department.dependencyUpdate(appId, dependencyNodeId))}
    />
  );
}
