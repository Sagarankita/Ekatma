'use client';

import { useParams, useRouter } from 'next/navigation';
import { M18QueryBuilderPage } from '@/App';
import { ApplicationId } from '@/domain/ids';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  
  // Enforce canonical ApplicationId contract
  const appId = (params.applicationId as string) as ApplicationId;
  
  return (
    <M18QueryBuilderPage 
      
      onBack={() => router.back()}
      onBackToOverview={() => router.push(`/department/applications/${appId}`)}
      onOpenQueryHistory={() => router.push(`/department/applications/${appId}/query-history`)}
    
    />
  );
}
