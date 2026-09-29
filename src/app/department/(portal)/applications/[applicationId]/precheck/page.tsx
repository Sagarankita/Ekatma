'use client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { M09PreCheckPage } from '@/App';
import { ApplicationId } from '@/domain/ids';
import { ROUTES } from '@/lib/routes';
export default function Page() {
  const appId = (useParams().applicationId as string) as ApplicationId;
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <M09PreCheckPage
      onBackToOverview={() => router.push(ROUTES.department.application(appId))}
      onOpenDna={() => router.push(ROUTES.department.applicationDna(appId))}
      onOpenTimeline={() => router.push(ROUTES.department.applicationTimeline(appId))}
      onOpenScrutinyRoute={() => router.push(ROUTES.department.applicationScrutinyRoute(appId))}
      onBackToScrutinyWorkflow={searchParams.get('from') === 'scrutiny-workflow'
        ? () => router.push(`${ROUTES.department.applicationScrutinyWorkflow(appId)}?stage=${searchParams.get('stage') || 'precheck'}`)
        : undefined}
      onOpenDocReview={(docId) => router.push(`${ROUTES.department.applicationDocument(appId, docId)}?from=scrutiny-workflow&stage=precheck`)}
      onOpenConsistency={() => router.push(ROUTES.department.applicationConsistency(appId))}
      onOpenDepView={() => router.push(ROUTES.department.applicationDependencyView(appId))}
      onOpenDelta={() => router.push(ROUTES.department.applicationDeltaRescrutiny(appId))}
      onOpenQueryBuilder={() => router.push(ROUTES.department.applicationQueryBuilder(appId))}
    />
  );
}
