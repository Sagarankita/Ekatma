'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { M22InspectionPlanningPage } from '@/App';
import { ApplicationId, InspectionId, createApplicationId, createInspectionId } from '@/domain/ids';
import { ROUTES } from '@/lib/routes';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const appId = createApplicationId((params.applicationId as string) || 'unknown');
  const inspId = params.inspectionId ? createInspectionId(params.inspectionId as string) : 'unknown';
  
  return (
    <M22InspectionPlanningPage 
      
      onBack={() => searchParams.get('from') === 'scrutiny-workflow'
        ? router.push(`${ROUTES.department.applicationScrutinyWorkflow(appId)}?stage=inspection`)
        : router.push(`/department/applications/${appId}/inspections`)}
      onBackToQueue={() => router.push('/department/inspection-queue')}
      onOpenDna={() => router.push(`/department/applications/${appId}/dna`)}
      onOpenDocReview={(id: string) => router.push(`/department/applications/${appId}/document/${id}`)}
      onOpenDepView={() => router.push(`/department/applications/${appId}/dependency-view`)}
      onOpenDelta={() => router.push(`/department/applications/${appId}/delta-rescrutiny`)}
      onOpenQueryHistory={() => router.push(`/department/applications/${appId}/query-history`)}
      onOpenWorkspace={() => router.push(`/department/applications/${appId}/inspections/${inspId}/workspace`)}
    
    />
  );
}
