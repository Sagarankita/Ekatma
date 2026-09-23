'use client';

import { useParams, useRouter } from 'next/navigation';
import { M26DecisionRecordPage } from '@/App';
import { ApplicationId, createApplicationId, createDecisionId, createDependencyNodeId, createComplianceId } from '@/domain/ids';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  
  const appId = createApplicationId((params.applicationId as string) || 'unknown');
  const decisionId = createDecisionId((params.decisionId as string) || 'unknown');
  
  return (
    <M26DecisionRecordPage 
      
      onBack={() => router.push(`/department/applications/${appId}/decision-workspace`)}
      onBackToOverview={() => router.push(`/department/applications/${appId}`)}
      onOpenDepView={() => router.push(`/department/applications/${appId}/dependencies/default/update`)}
      onOpenDna={() => router.push(`/department/applications/${appId}/dna`)}
    
    />
  );
}
