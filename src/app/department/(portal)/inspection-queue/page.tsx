'use client';

import { InspectionRecordsPage } from '@/components/department/InspectionExperience';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import { getWorkflowRecord } from '@/data/fixtures/workflow-records';

export default function InspectionQueuePage() {
  const router = useRouter();

  return (
    <InspectionRecordsPage 
      onBack={() => router.push(ROUTES.department.home)}
      onOpenWorkspace={(appId, inspId) => {
        const wf = getWorkflowRecord(appId);
        const targetInspId = inspId || wf.inspectionId;
        router.push(`${ROUTES.department.inspectionWorkspace(appId, targetInspId)}?from=inspection-queue`);
      }}
      onOpenDecision={(appId) => {
        router.push(ROUTES.department.applicationDecisionWorkspace(appId));
      }}
    />
  );
}
