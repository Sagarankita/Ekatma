'use client';

import { useParams, useRouter } from 'next/navigation';
import { M16ConsistencyPage } from '@/App';
import { ApplicationId } from '@/domain/ids';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  
  // Enforce canonical ApplicationId contract
  const appId = (params.applicationId as string) as ApplicationId;
  
  return (
    <M16ConsistencyPage 
      
      onBack={() => router.back()}
      onBackToOverview={() => router.push(`/department/applications/${appId}`)}
      onOpenParamDetail={() => router.push(`/department/applications/${appId}/parameter/default`)}
      onOpenDocReview={() => router.push(`/department/applications/${appId}/document/default`)}
    
    />
  );
}
