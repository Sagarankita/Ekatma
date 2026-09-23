'use client';

import { useParams, useRouter } from 'next/navigation';
import { M22InspectionPlanningPage } from '@/App';
import { ApplicationId, InspectionId, createApplicationId, createInspectionId } from '@/domain/ids';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  
  const appId = createApplicationId((params.applicationId as string) || 'unknown');
  const inspId = params.inspectionId ? createInspectionId(params.inspectionId as string) : 'unknown';
  
  return (
    <M22InspectionPlanningPage 
      
      onBack={() => router.push(`/department/applications/${appId}/inspections`)}
      onBackToQueue={() => router.push('/department/inspection-queue')}
      onOpenDna={() => router.push(`/department/applications/${appId}/dna`)}
      onOpenDocReview={() => router.push(`/department/applications/${appId}/document/default`)}
      onOpenDepView={() => router.push(`/department/applications/${appId}/dependency-view`)}
      onOpenDelta={() => router.push(`/department/applications/${appId}/delta-rescrutiny`)}
      onOpenQueryHistory={() => router.push(`/department/applications/${appId}/query-history`)}
      onOpenWorkspace={() => router.push(`/department/applications/${appId}/inspections/${inspId}/workspace`)}
    
    />
  );
}
