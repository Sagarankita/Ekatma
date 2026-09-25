'use client';
import { useParams, useRouter } from 'next/navigation';
import { M08TimelinePage } from '@/App';
import { ApplicationId } from '@/domain/ids';
import { ROUTES } from '@/lib/routes';
export default function Page() { const appId = (useParams().applicationId as string) as ApplicationId; const router = useRouter(); return <M08TimelinePage onBackToOverview={() => router.push(ROUTES.department.application(appId))} onOpenAudit={() => router.push(ROUTES.department.audit)} />; }
