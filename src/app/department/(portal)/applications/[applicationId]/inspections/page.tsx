'use client';

import { useParams, useRouter } from 'next/navigation';
import { InspectionRecordsPage } from '@/components/department/InspectionExperience';
import { ApplicationId } from '@/domain/ids';
import { ROUTES } from '@/lib/routes';
import { getWorkflowRecord } from '@/data/fixtures/workflow-records';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const appId = (params.applicationId as string) as ApplicationId;

  return (
    <InspectionRecordsPage
      applicationId={appId}
      onOpenWorkspace={(targetAppId, inspId) => {
        const wf = getWorkflowRecord(targetAppId || appId);
        const targetInspId = inspId || wf.inspectionId;
        router.push(`${ROUTES.department.inspectionWorkspace(targetAppId || appId, targetInspId)}?from=application-inspections`);
      }}
      onOpenDecision={(targetAppId) => {
        router.push(ROUTES.department.applicationDecisionWorkspace(targetAppId || appId));
      }}
      onBack={() => router.push(ROUTES.department.application(appId))}
    />
  );
}
