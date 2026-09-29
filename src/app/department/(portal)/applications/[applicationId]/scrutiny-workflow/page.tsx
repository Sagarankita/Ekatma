'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { GuidedScrutinyWorkflow } from '@/App';
import { ApplicationId } from '@/domain/ids';
import { ROUTES } from '@/lib/routes';
import { SAHYADRI_DEMO, isSahyadriDemoApplication } from '@/data/fixtures/sahyadri-department-demo';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const appId = (params.applicationId as string) as ApplicationId;

  return (
    <GuidedScrutinyWorkflow
      applicationId={appId}
      initialStageKey={searchParams.get('stage') ?? 'precheck'}
      onBack={() => router.push(ROUTES.department.scrutiny)}
      onOpenOverview={() => router.push(ROUTES.department.application(appId))}
      onOpenPrecheck={() => router.push(`${ROUTES.department.applicationPrecheck(appId)}?from=scrutiny-workflow&stage=precheck`)}
      onOpenRoute={() => router.push(`${ROUTES.department.applicationScrutinyRoute(appId)}?from=scrutiny-workflow&stage=route`)}
      onOpenLandWorkbench={() => router.push(ROUTES.department.applicationScrutinyWorkbench(appId))}
      onOpenParamDetail={(paramId) => router.push(ROUTES.department.applicationParameter(appId, paramId))}
      onOpenDocReview={(docId) => {
        const returnStage = docId.includes('WATER') ? 'water'
          : docId.includes('CONCORDANCE') ? 'consistency'
          : docId.includes('NOC') ? 'dependency'
          : docId.includes('FORM-D1') ? 'query'
          : docId.includes('DIFF') ? 'delta'
          : docId.includes('INSP') ? 'inspection'
          : docId.includes('DWG') ? 'building'
          : 'land';
        router.push(`${ROUTES.department.applicationDocument(appId, docId)}?from=scrutiny-workflow&stage=${returnStage}`);
      }}
      onOpenBuildingScrutiny={() => router.push(ROUTES.department.applicationBuildingScrutiny(appId))}
      onOpenWaterScrutiny={() => router.push(ROUTES.department.applicationWaterScrutiny(appId))}
      onOpenConsistency={() => router.push(ROUTES.department.applicationConsistency(appId))}
      onOpenDependencyView={() => router.push(ROUTES.department.applicationDependencyView(appId))}
      onOpenQueryBuilder={() => router.push(ROUTES.department.applicationQueryBuilder(appId))}
      onOpenDelta={() => router.push(ROUTES.department.applicationDeltaRescrutiny(appId))}
      onOpenInspectionPlanning={() => router.push(`${ROUTES.department.inspectionPlan(appId, isSahyadriDemoApplication(appId) ? SAHYADRI_DEMO.inspection.id : 'INSP-2026-00418')}?from=scrutiny-workflow`)}
      onOpenDecisionWorkspace={() => router.push(`${ROUTES.department.applicationDecisionWorkspace(appId)}?from=scrutiny-workflow&stage=inspection`)}
    />
  );
}
