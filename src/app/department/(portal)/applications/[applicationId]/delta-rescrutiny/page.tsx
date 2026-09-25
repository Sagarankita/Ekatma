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
      onBackToOverview={() => router.push(`/department/applications/${appId}?tab=queries`)}
      onOpenDna={() => router.push(`/department/applications/${appId}?tab=business-dna`)}
      onOpenDocReview={(id: string) => router.push(`/department/applications/${appId}/document/${id}`)}
      onOpenConsistency={() => router.push(`/department/applications/${appId}/consistency`)}
      onOpenDepView={() => router.push(`/department/applications/${appId}/dependency-view`)}
      onOpenTimeline={() => router.push(`/department/applications/${appId}?tab=timeline`)}
    />
  );
}
