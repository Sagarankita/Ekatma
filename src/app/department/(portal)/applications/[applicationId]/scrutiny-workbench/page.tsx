'use client';

import { useParams, useRouter } from 'next/navigation';
import { M11ScrutinyWorkbenchPage } from '@/App';
import { ApplicationId } from '@/domain/ids';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  
  // Enforce canonical ApplicationId contract
  const appId = (params.applicationId as string) as ApplicationId;
  
  return (
    <M11ScrutinyWorkbenchPage
      onBack={() => router.push(`/department/applications/${appId}/scrutiny-route`)}
      onBackToOverview={() => router.push(`/department/applications/${appId}?tab=scrutiny`)}
      onOpenDna={() => router.push(`/department/applications/${appId}?tab=business-dna`)}
      onOpenTimeline={() => router.push(`/department/applications/${appId}?tab=timeline`)}
      onOpenParamDetail={(id: string) => router.push(`/department/applications/${appId}/parameter/${id}`)}
      onOpenDocReview={(id: string) => router.push(`/department/applications/${appId}/document/${id}`)}
      onOpenBldgScrutiny={() => router.push(`/department/applications/${appId}/building-scrutiny`)}
      onOpenWaterScrutiny={() => router.push(`/department/applications/${appId}/water-scrutiny`)}
      onOpenDepView={() => router.push(`/department/applications/${appId}/dependency-view`)}
    />
  );
}
