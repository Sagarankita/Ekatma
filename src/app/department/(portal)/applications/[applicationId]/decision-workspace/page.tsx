'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { M25DecisionWorkspacePage } from '@/App';
import { ApplicationId, createApplicationId, createDecisionId, createDependencyNodeId, createComplianceId } from '@/domain/ids';
import { ROUTES } from '@/lib/routes';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const appId = createApplicationId((params.applicationId as string) || 'unknown');
  
  
  return (
    <M25DecisionWorkspacePage 
      
      onBack={() => searchParams.get('from') === 'scrutiny-workflow'
        ? router.push(`${ROUTES.department.applicationScrutinyWorkflow(appId)}?stage=${searchParams.get('stage') || 'inspection'}`)
        : router.push(`/department/applications/${appId}`)}
      onOpenDocReview={(id: string) => router.push(`/department/applications/${appId}/document/${id}`)}
      onOpenConsistency={() => router.push(`/department/applications/${appId}/consistency`)}
      onOpenDna={() => router.push(`/department/applications/${appId}/dna`)}
      onOpenDepView={() => router.push(`/department/applications/${appId}/dependency-view`)}
      onOpenQueryHistory={() => router.push(`/department/applications/${appId}/query-history`)}
      onOpenDelta={() => router.push(`/department/applications/${appId}/delta-rescrutiny`)}
      onOpenInspection={(id: string) => router.push(`/department/applications/${appId}/inspections/${id}/workspace`)}
      onOpenM24={(id: string) => router.push(`/department/applications/${appId}/inspections/${id}/observations`)}
      onOpenScrutiny={() => router.push(`${ROUTES.department.applicationScrutinyWorkflow(appId)}?stage=inspection`)}
      onRecordDecision={(id: string) => router.push(`/department/applications/${appId}/decisions/${id}`)}
    
    />
  );
}
