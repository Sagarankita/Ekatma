'use client';

import { useParams, useRouter } from 'next/navigation';
import { InspectionWorkspacePage } from '@/components/department/InspectionExperience';
import { ApplicationId, InspectionId, createApplicationId, createInspectionId } from '@/domain/ids';
import { ROUTES } from '@/lib/routes';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  
  const appId = createApplicationId((params.applicationId as string) || 'unknown');
  const inspId = params.inspectionId ? createInspectionId(params.inspectionId as string) : 'unknown';
  
  return (
    <InspectionWorkspacePage 
      applicationId={appId}
      inspectionId={inspId}
      onBack={() => router.push(ROUTES.department.applicationInspections(appId))}
      onOpenRecords={() => router.push(ROUTES.department.applicationInspections(appId))}
      onOpenDocReview={(id: string) => router.push(ROUTES.department.applicationDocument(appId, id))}
      onOpenDecision={() => router.push(ROUTES.department.applicationDecisionWorkspace(appId))}
    />
  );
}
