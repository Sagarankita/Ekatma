'use client';

import { useParams, useRouter } from 'next/navigation';
import { M25DecisionWorkspacePage } from '@/App';
import { ApplicationId, createApplicationId, createDecisionId, createDependencyNodeId, createComplianceId } from '@/domain/ids';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  
  const appId = createApplicationId((params.applicationId as string) || 'unknown');
  
  
  return (
    <M25DecisionWorkspacePage 
      
      onBack={() => router.push(`/department/applications/${appId}`)}
      onOpenDocReview={() => router.push(`/department/applications/${appId}/document/default`)}
      onOpenConsistency={() => router.push(`/department/applications/${appId}/consistency`)}
      onOpenDna={() => router.push(`/department/applications/${appId}/dna`)}
      onOpenDepView={() => router.push(`/department/applications/${appId}/dependency-view`)}
      onOpenQueryHistory={() => router.push(`/department/applications/${appId}/query-history`)}
      onOpenDelta={() => router.push(`/department/applications/${appId}/delta-rescrutiny`)}
      onOpenInspection={() => router.push(`/department/applications/${appId}/inspections/default/workspace`)}
      onOpenM24={() => router.push(`/department/applications/${appId}/inspections/default/observations`)}
      onOpenScrutiny={() => router.push(`/department/applications/${appId}/scrutiny-workbench`)}
      onRecordDecision={() => router.push(`/department/applications/${appId}/decisions/default`)}
    
    />
  );
}
