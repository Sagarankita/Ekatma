'use client';

import { useParams, useRouter } from 'next/navigation';
import { M24ObservationReinspectionPage } from '@/App';
import { ApplicationId, InspectionId, createApplicationId, createInspectionId } from '@/domain/ids';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  
  const appId = createApplicationId((params.applicationId as string) || 'unknown');
  const inspId = params.inspectionId ? createInspectionId(params.inspectionId as string) : 'unknown';
  
  return (
    <M24ObservationReinspectionPage 
      
      onBack={() => router.push(`/department/applications/${appId}/inspections`)}
      onBackToM23={() => router.push(`/department/applications/${appId}/inspections/${inspId}/workspace`)}
      onOpenM22={() => router.push(`/department/applications/${appId}/inspections/${inspId}/plan`)}
      onOpenDocReview={(id: string) => router.push(`/department/applications/${appId}/document/${id}`)}
      onOpenQueryHistory={() => router.push(`/department/applications/${appId}/query-history`)}
      onOpenDelta={() => router.push(`/department/applications/${appId}/delta-rescrutiny`)}
      onOpenDepView={() => router.push(`/department/applications/${appId}/dependency-view`)}
    
    />
  );
}
