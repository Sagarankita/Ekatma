'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { M10ScrutinyRoutePage } from '@/App';
import { ApplicationId } from '@/domain/ids';
import { ROUTES } from '@/lib/routes';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Enforce canonical ApplicationId contract
  const appId = (params.applicationId as string) as ApplicationId;
  
  return (
    <M10ScrutinyRoutePage
      applicationId={appId}
      onBackToOverview={() => router.push(ROUTES.department.application(appId))}
      onBackToPrecheck={() => router.push(ROUTES.department.applicationPrecheck(appId))}
      onBackToScrutinyWorkflow={searchParams.get('from') === 'scrutiny-workflow'
        ? () => router.push(`${ROUTES.department.applicationScrutinyWorkflow(appId)}?stage=${searchParams.get('stage') || 'route'}`)
        : undefined}
      onOpenDna={() => router.push(ROUTES.department.applicationDna(appId))}
      onOpenTimeline={() => router.push(ROUTES.department.applicationTimeline(appId))}
      onOpenScrutinyWorkflow={() => router.push(`${ROUTES.department.applicationScrutinyWorkflow(appId)}?stage=route`)}
      onOpenScrutinyWorkbench={() => router.push(ROUTES.department.applicationScrutinyWorkbench(appId))}
      onOpenBuildingScrutiny={() => router.push(ROUTES.department.applicationBuildingScrutiny(appId))}
      onOpenWaterScrutiny={() => router.push(ROUTES.department.applicationWaterScrutiny(appId))}
      onOpenConsistency={() => router.push(ROUTES.department.applicationConsistency(appId))}
      onOpenDepView={() => router.push(ROUTES.department.applicationDependencyView(appId))}
      onOpenQueryBuilder={() => router.push(ROUTES.department.applicationQueryBuilder(appId))}
      onOpenDelta={() => router.push(ROUTES.department.applicationDeltaRescrutiny(appId))}
      onOpenInspections={() => router.push(ROUTES.department.applicationInspections(appId))}
    />
  );
}
