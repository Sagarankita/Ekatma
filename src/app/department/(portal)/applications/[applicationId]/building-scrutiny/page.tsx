'use client';

import { useParams, useRouter } from 'next/navigation';
import { M14BuildingScrutinyPage } from '@/App';
import { ApplicationId } from '@/domain/ids';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  
  // Enforce canonical ApplicationId contract
  const appId = (params.applicationId as string) as ApplicationId;
  
  return (
    <M14BuildingScrutinyPage 
      
      onBack={() => router.push(`/department/applications/${appId}/scrutiny-workbench`)}
      onBackToOverview={() => router.push(`/department/applications/${appId}`)}
      onOpenParamDetail={(id: string) => router.push(`/department/applications/${appId}/parameter/${id}`)}
      onOpenDocReview={(id: string) => router.push(`/department/applications/${appId}/document/${id}`)}
      onOpenConsistency={() => router.push(`/department/applications/${appId}/consistency`)}
      onOpenDepView={() => router.push(`/department/applications/${appId}/dependency-view`)}
    
    />
  );
}
