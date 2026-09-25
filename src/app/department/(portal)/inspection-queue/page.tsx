'use client';

import { M21InspectionQueuePage } from '@/App';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import { getWorkflowRecord } from '@/data/fixtures/workflow-records';

export default function InspectionQueuePage() {
  const router = useRouter();

  return (
    <M21InspectionQueuePage 
      onBack={() => router.push(ROUTES.department.home)}
      onPlanInspection={(appId, inspId) => {
        const wf = getWorkflowRecord(appId);
        const targetInspId = inspId || wf.inspectionId;
        router.push(`${ROUTES.department.inspectionPlan(appId, targetInspId)}?from=inspection-queue`);
      }}
      onOpenDepView={appId => router.push(ROUTES.department.applicationTab(appId, 'dependencies', 'inspection-queue'))}
      onOpenQueryHistory={appId => router.push(ROUTES.department.applicationTab(appId, 'queries', 'inspection-queue'))}
      onOpenDelta={appId => router.push(ROUTES.department.applicationTab(appId, 'queries', 'inspection-queue'))}
    />
  );
}
