'use client';

import { useParams, useRouter } from 'next/navigation';
import { M23InspectionWorkspacePage } from '@/App';
import { ApplicationId, InspectionId, createApplicationId, createInspectionId } from '@/domain/ids';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  
  const appId = createApplicationId((params.applicationId as string) || 'unknown');
  const inspId = params.inspectionId ? createInspectionId(params.inspectionId as string) : 'unknown';
  
  return (
    <M23InspectionWorkspacePage 
      
      onBack={() => router.push(`/department/applications/${appId}/inspections/${inspId}/plan`)}
      onBackToQueue={() => router.push('/department/inspection-queue')}
      onOpenM24={() => router.push(`/department/applications/${appId}/inspections/${inspId}/observations`)}
      onOpenDocReview={() => router.push(`/department/applications/${appId}/document/default`)}
      onOpenDna={() => router.push(`/department/applications/${appId}/dna`)}
      onOpenDepView={() => router.push(`/department/applications/${appId}/dependency-view`)}
      onOpenQueryHistory={() => router.push(`/department/applications/${appId}/query-history`)}
      onOpenDelta={() => router.push(`/department/applications/${appId}/delta-rescrutiny`)}
      onOpenConsistency={() => router.push(`/department/applications/${appId}/consistency`)}
    
    />
  );
}
