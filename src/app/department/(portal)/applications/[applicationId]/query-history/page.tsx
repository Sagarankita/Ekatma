'use client';

import { useParams, useRouter } from 'next/navigation';
import { M19QueryHistoryPage } from '@/App';
import { ApplicationId } from '@/domain/ids';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  
  // Enforce canonical ApplicationId contract
  const appId = (params.applicationId as string) as ApplicationId;
  
  return (
    <M19QueryHistoryPage 
      
      onBack={() => router.push(`/department/applications/${appId}?tab=queries`)}
      onBackToOverview={() => router.push(`/department/applications/${appId}?tab=queries`)}
      onOpenQueryBuilder={() => router.push(`/department/applications/${appId}/query-builder`)}
      onOpenDeltaRescrutiny={() => router.push(`/department/applications/${appId}/delta-rescrutiny`)}
    
    />
  );
}
