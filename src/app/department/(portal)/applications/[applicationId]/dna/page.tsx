'use client';

import { useParams, useRouter } from 'next/navigation';
import { M07DnaPage } from '@/App';
import { ApplicationId } from '@/domain/ids';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  
  // Enforce canonical ApplicationId contract
  const appId = (params.applicationId as string) as ApplicationId;
  
  return (
    <M07DnaPage 
      onBackToOverview={() => router.push(`/department/applications/${appId}`)}
    />
  );
}
