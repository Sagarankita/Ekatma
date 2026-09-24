'use client';

import { useParams, useRouter } from 'next/navigation';
import { M06AppOverviewPage } from '@/App';
import { ApplicationId } from '@/domain/ids';
import { ROUTES } from '@/lib/routes';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  
  // Enforce canonical ApplicationId contract
  const appId = (params.applicationId as string) as ApplicationId;
  
  return (
    <M06AppOverviewPage 
      
      onBack={() => router.push('/department/queue')}
      onOpenDna={() => router.push(`/department/applications/${appId}/dna`)}
      onOpenTimeline={() => router.push(`/department/applications/${appId}/timeline`)}
      onOpenPrecheck={() => router.push(`/department/applications/${appId}/precheck`)}
      onOpenDeltaRescrutiny={() => router.push(`/department/applications/${appId}/delta-rescrutiny`)}
      onOpenInspectionQueue={() => router.push(ROUTES.department.applicationInspections(appId))}
      onOpenDecision={() => router.push(ROUTES.department.applicationDecisionWorkspace(appId))}
      onOpenConsistency={() => router.push(ROUTES.department.applicationConsistency(appId))}
      onOpenDependencyView={() => router.push(ROUTES.department.applicationDependencyView(appId))}
      onOpenQueries={() => router.push(ROUTES.department.applicationQueryHistory(appId))}
      onOpenRegAssistant={() => router.push(ROUTES.department.regAssistant)}
      onOpenAudit={() => router.push(ROUTES.department.audit)}
    
    />
  );
}
