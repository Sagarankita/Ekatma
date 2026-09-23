'use client';

import { useParams, useRouter } from 'next/navigation';
import { M20DeltaRescrutinyPage } from '@/App';
import { ApplicationId } from '@/domain/ids';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  
  // Enforce canonical ApplicationId contract
  const appId = (params.applicationId as string) as ApplicationId;
  
  return (
    <M20DeltaRescrutinyPage 
      
      onBackToOverview={() => router.push(`/department/applications/${appId}`)}
      onOpenDna={() => router.push(`/department/applications/${appId}/dna`)}
      onOpenDocReview={() => router.push(`/department/applications/${appId}/document/default`)}
      onOpenConsistency={() => router.push(`/department/applications/${appId}/consistency`)}
      onOpenDepView={() => router.push(`/department/applications/${appId}/dependency-view`)}
      onOpenQueryBuilder={() => router.push(`/department/applications/${appId}/query-builder`)}
      onOpenQueryHistory={() => router.push(`/department/applications/${appId}/query-history`)}
      onOpenTimeline={() => router.push(`/department/applications/${appId}/timeline`)}
    
    />
  );
}
