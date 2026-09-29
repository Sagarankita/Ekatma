'use client';

import { useRouter } from 'next/navigation';
import { InspectionRecordsPage } from '@/components/department/InspectionExperience';
import { ROUTES } from '@/lib/routes';
import { getWorkflowRecord } from '@/data/fixtures/workflow-records';

export default function InspectionsPage() {
  const router = useRouter();
  return (
    <InspectionRecordsPage
      onOpenWorkspace={(appId, inspId) => {
        const wf = getWorkflowRecord(appId);
        const targetInspId = inspId || wf.inspectionId;
        router.push(`${ROUTES.department.inspectionWorkspace(appId, targetInspId)}?from=inspections`);
      }}
      onOpenDecision={(appId) => {
        router.push(ROUTES.department.applicationDecisionWorkspace(appId));
      }}
      onBack={() => {
        router.push(ROUTES.department.home);
      }}
    />
  );
}
