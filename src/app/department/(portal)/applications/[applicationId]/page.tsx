'use client';
import { useParams, useRouter } from 'next/navigation';
import { M06AppOverviewPage } from '@/App';
import { ApplicationId } from '@/domain/ids';
import { ROUTES } from '@/lib/routes';
export default function Page() {
  const appId = (useParams().applicationId as string) as ApplicationId;
  const router = useRouter();
  return <M06AppOverviewPage onBack={() => router.push(ROUTES.department.queue)} onOpenDna={() => router.push(ROUTES.department.applicationDna(appId))} onOpenTimeline={() => router.push(ROUTES.department.applicationTimeline(appId))} onOpenPrecheck={() => router.push(ROUTES.department.applicationPrecheck(appId))} onOpenDeltaRescrutiny={() => router.push(ROUTES.department.applicationDeltaRescrutiny(appId))} onOpenInspectionQueue={() => router.push(ROUTES.department.applicationInspections(appId))} onOpenDecision={() => router.push(ROUTES.department.applicationDecisionWorkspace(appId))} onOpenConsistency={() => router.push(ROUTES.department.applicationConsistency(appId))} onOpenDependencyView={() => router.push(ROUTES.department.applicationDependencyView(appId))} onOpenQueries={() => router.push(ROUTES.department.applicationQueryHistory(appId))} onOpenRegAssistant={() => router.push(`${ROUTES.department.regAssistant}?applicationId=${encodeURIComponent(appId)}`)} onOpenAudit={() => router.push(ROUTES.department.audit)} />;
}
