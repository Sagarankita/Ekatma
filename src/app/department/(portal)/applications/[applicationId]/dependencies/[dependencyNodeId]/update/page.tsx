'use client';

import { useParams, useRouter } from 'next/navigation';
import { M27DependencyUpdatePage } from '@/App';
import { ApplicationId, createApplicationId, createDecisionId, createDependencyNodeId, createComplianceId } from '@/domain/ids';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  
  const appId = createApplicationId((params.applicationId as string) || 'unknown');
  const depNodeId = createDependencyNodeId((params.dependencyNodeId as string) || 'unknown');
  
  return (
    <M27DependencyUpdatePage 
      
      onBack={() => router.push(`/department/applications/${appId}`)}
      onOpenM26={() => router.push(`/department/applications/${appId}/decisions/default`)}
      onOpenM25={() => router.push(`/department/applications/${appId}/decision-workspace`)}
      onOpenDepView={() => router.push(`/department/applications/${appId}/dependency-view`)}
      onOpenQueryHistory={() => router.push(`/department/applications/${appId}/query-history`)}
      onOpenDelta={() => router.push(`/department/applications/${appId}/delta-rescrutiny`)}
      onOpenM28={() => router.push(`/department/applications/${appId}/compliance/default`)}
    
    />
  );
}
