'use client';

import { useParams, useRouter } from 'next/navigation';
import { M12ParameterDetailPage } from '@/App';
import { ApplicationId } from '@/domain/ids';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  
  // Enforce canonical ApplicationId contract
  const appId = (params.applicationId as string) as ApplicationId;
  
  return (
    <M12ParameterDetailPage 
      
      onBack={() => router.back()}
      onBackToOverview={() => router.push(`/department/applications/${appId}`)}
      onOpenDna={() => router.push(`/department/applications/${appId}/dna`)}
      onOpenDocReview={(id: string) => router.push(`/department/applications/${appId}/document/${id}`)}
      onOpenDepView={() => router.push(`/department/applications/${appId}/dependency-view`)}
    
    />
  );
}
