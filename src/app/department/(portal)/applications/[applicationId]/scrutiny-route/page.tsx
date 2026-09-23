'use client';

import { useParams, useRouter } from 'next/navigation';
import { M10ScrutinyRoutePage } from '@/App';
import { ApplicationId } from '@/domain/ids';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  
  // Enforce canonical ApplicationId contract
  const appId = (params.applicationId as string) as ApplicationId;
  
  return (
    <M10ScrutinyRoutePage 
      
      onBackToOverview={() => router.push(`/department/applications/${appId}`)}
      onBackToPrecheck={() => router.push(`/department/applications/${appId}/precheck`)}
      onOpenDna={() => router.push(`/department/applications/${appId}/dna`)}
      onOpenTimeline={() => router.push(`/department/applications/${appId}/timeline`)}
      onOpenScrutinyWorkbench={() => router.push(`/department/applications/${appId}/scrutiny-workbench`)}
      onOpenDepView={() => router.push(`/department/applications/${appId}/dependency-view`)}
    
    />
  );
}
