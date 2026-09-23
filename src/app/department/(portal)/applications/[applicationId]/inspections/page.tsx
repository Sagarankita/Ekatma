'use client';

import { useParams, useRouter } from 'next/navigation';
import { M21InspectionQueuePage } from '@/App';
import { ApplicationId, InspectionId, createApplicationId, createInspectionId } from '@/domain/ids';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  
  const appId = createApplicationId((params.applicationId as string) || 'unknown');
  const inspId = params.inspectionId ? createInspectionId(params.inspectionId as string) : 'unknown';
  
  return (
    <M21InspectionQueuePage 
      
      onBack={() => router.push(`/department/applications/${appId}`)}
      onPlanInspection={(appId, inspId) => router.push(`/department/applications/${appId}/inspections/${inspId}/plan`)}
      onOpenDepView={() => router.push(`/department/applications/${appId}/dependency-view`)}
      onOpenQueryHistory={() => router.push(`/department/applications/${appId}/query-history`)}
      onOpenDelta={() => router.push(`/department/applications/${appId}/delta-rescrutiny`)}
    
    />
  );
}
