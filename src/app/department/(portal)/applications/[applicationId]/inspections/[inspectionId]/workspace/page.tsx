'use client';

import { useParams, useRouter } from 'next/navigation';
import { InspectionWorkspacePage } from '@/components/department/InspectionExperience';
import { ApplicationId, InspectionId, createApplicationId, createInspectionId } from '@/domain/ids';
import { ROUTES } from '@/lib/routes';
import { SAHYADRI_DEMO, isSahyadriDemoApplication } from '@/data/fixtures/sahyadri-department-demo';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  
  const appId = createApplicationId((params.applicationId as string) || 'unknown');
  const inspId = params.inspectionId ? createInspectionId(params.inspectionId as string) : 'unknown';
  const isSahyadri = isSahyadriDemoApplication(appId);
  
  return (
    <InspectionWorkspacePage 
      applicationId={appId}
      inspectionId={inspId}
      business={isSahyadri ? SAHYADRI_DEMO.business.name : undefined}
      service={isSahyadri ? SAHYADRI_DEMO.application.service : undefined}
      inspectionDate={isSahyadri ? `${SAHYADRI_DEMO.inspection.date}, ${SAHYADRI_DEMO.inspection.time}` : undefined}
      inspector={isSahyadri ? SAHYADRI_DEMO.inspection.team : undefined}
      successfulDemo={isSahyadri}
      onBack={() => router.push(ROUTES.department.applicationInspections(appId))}
      onOpenRecords={() => router.push(ROUTES.department.applicationInspections(appId))}
      onOpenDocReview={(id: string) => router.push(ROUTES.department.applicationDocument(appId, id))}
      onOpenDecision={() => router.push(ROUTES.department.applicationDecisionWorkspace(appId))}
    />
  );
}
