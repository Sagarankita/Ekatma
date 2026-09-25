'use client';

import { useRouter } from 'next/navigation';
import { InspectionRecords } from '@/components/department/OperationalWorklists';
import { ROUTES } from '@/lib/routes';
import { getWorkflowRecord } from '@/data/fixtures/workflow-records';

export default function InspectionsPage() {
  const router = useRouter();
  return (
    <InspectionRecords
      onOpen={(appId) => {
        const wf = getWorkflowRecord(appId);
        router.push(`${ROUTES.department.inspectionWorkspace(appId, wf.inspectionId)}?from=inspections`);
      }}
    />
  );
}

