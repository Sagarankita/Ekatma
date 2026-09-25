'use client';
import { useParams, useRouter } from 'next/navigation';
import { M09PreCheckPage } from '@/App';
import { ApplicationId } from '@/domain/ids';
import { ROUTES } from '@/lib/routes';
export default function Page() { const appId = (useParams().applicationId as string) as ApplicationId; const router = useRouter(); return <M09PreCheckPage onBackToOverview={() => router.push(ROUTES.department.application(appId))} onOpenDna={() => router.push(ROUTES.department.applicationDna(appId))} onOpenTimeline={() => router.push(ROUTES.department.applicationTimeline(appId))} onOpenScrutinyRoute={() => router.push(ROUTES.department.applicationScrutinyRoute(appId))} />; }
