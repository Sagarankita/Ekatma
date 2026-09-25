'use client';
import { useParams, useRouter } from 'next/navigation';
import { M21InspectionQueuePage } from '@/App';
import { createApplicationId } from '@/domain/ids';
import { ROUTES } from '@/lib/routes';
export default function Page() { const router = useRouter(); const appId = createApplicationId((useParams().applicationId as string) || 'unknown'); return <M21InspectionQueuePage key={appId} applicationId={appId} onBack={() => router.push(ROUTES.department.application(appId))} onPlanInspection={(selectedAppId, inspId) => router.push(ROUTES.department.inspectionPlan(selectedAppId, inspId))} onOpenDepView={selectedAppId => router.push(ROUTES.department.applicationDependencyView(selectedAppId))} onOpenQueryHistory={selectedAppId => router.push(ROUTES.department.applicationQueryHistory(selectedAppId))} onOpenDelta={selectedAppId => router.push(ROUTES.department.applicationDeltaRescrutiny(selectedAppId))} />; }
