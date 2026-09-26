'use client';

import { useParams, useRouter } from 'next/navigation';
import { GuidedScrutinyWorkflow } from '@/App';
import { ApplicationId } from '@/domain/ids';
import { ROUTES } from '@/lib/routes';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const appId = (params.applicationId as string) as ApplicationId;

  return (
    <GuidedScrutinyWorkflow
      applicationId={appId}
      initialStageKey="building"
      onBack={() => router.push(ROUTES.department.scrutiny)}
      onOpenOverview={() => router.push(ROUTES.department.application(appId))}
      onOpenPrecheck={() => router.push(ROUTES.department.applicationPrecheck(appId))}
      onOpenRoute={() => router.push(ROUTES.department.applicationScrutinyRoute(appId))}
      onOpenLandWorkbench={() => router.push(ROUTES.department.applicationScrutinyWorkbench(appId))}
      onOpenBuildingScrutiny={() => router.push(ROUTES.department.applicationBuildingScrutiny(appId))}
      onOpenWaterScrutiny={() => router.push(ROUTES.department.applicationWaterScrutiny(appId))}
      onOpenConsistency={() => router.push(ROUTES.department.applicationConsistency(appId))}
      onOpenDependencyView={() => router.push(ROUTES.department.applicationDependencyView(appId))}
      onOpenQueryBuilder={() => router.push(ROUTES.department.applicationQueryBuilder(appId))}
      onOpenDelta={() => router.push(ROUTES.department.applicationDeltaRescrutiny(appId))}
      onOpenInspectionPlanning={() => router.push(ROUTES.department.applicationInspections(appId))}
      onOpenDecisionWorkspace={() => router.push(ROUTES.department.applicationDecisionWorkspace(appId))}
    />
  );
}
