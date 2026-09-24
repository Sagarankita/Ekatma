'use client';

import { useParams, useRouter } from 'next/navigation';
import { M13DocumentReviewPage } from '@/App';
import { ApplicationId } from '@/domain/ids';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  
  // Enforce canonical ApplicationId contract
  const appId = (params.applicationId as string) as ApplicationId;
  
  return (
    <M13DocumentReviewPage 
      
      onBack={() => router.back()}
      onOpenParamDetail={(id: string) => router.push(`/department/applications/${appId}/parameter/${id}`)}
    
    />
  );
}
