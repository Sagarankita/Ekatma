'use client';

import { useRouter } from 'next/navigation';
import { M21InspectionQueuePage } from '@/App';
import { ROUTES } from '@/lib/routes';

export default function InspectionsPage() {
  const router = useRouter();

  return (
    <M21InspectionQueuePage 
      onBack={() => router.push(ROUTES.department.home)}
      onPlanInspection={(appId, inspId) => router.push(ROUTES.department.inspectionPlan(appId, inspId))}
      onOpenDepView={appId => router.push(ROUTES.department.applicationDependencyView(appId))}
      onOpenQueryHistory={appId => router.push(ROUTES.department.applicationQueryHistory(appId))}
      onOpenDelta={appId => router.push(ROUTES.department.applicationDeltaRescrutiny(appId))}
    />
  );
}
