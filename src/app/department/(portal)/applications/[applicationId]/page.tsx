'use client';

import { useParams, useRouter } from 'next/navigation';
import { M06AppOverviewPage } from '@/App';
import { ApplicationId } from '@/domain/ids';

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
      onOpenInspectionQueue={() => router.push('/department/inspection-queue')}
      onOpenDecision={() => router.push('/department/decisions')}
      onOpenCompliance={() => router.push('/department/compliance-context')}
    
    />
  );
}
