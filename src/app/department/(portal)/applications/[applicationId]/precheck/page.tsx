'use client';

import { useParams, useRouter } from 'next/navigation';
import { M09PreCheckPage } from '@/App';
import { ApplicationId } from '@/domain/ids';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  
  // Enforce canonical ApplicationId contract
  const appId = (params.applicationId as string) as ApplicationId;
  
  return (
    <M09PreCheckPage 
      
      onBackToOverview={() => router.push(`/department/applications/${appId}`)}
      onOpenDna={() => router.push(`/department/applications/${appId}/dna`)}
      onOpenTimeline={() => router.push(`/department/applications/${appId}/timeline`)}
      onOpenScrutinyRoute={() => router.push(`/department/applications/${appId}/scrutiny-route`)}
    
    />
  );
}
