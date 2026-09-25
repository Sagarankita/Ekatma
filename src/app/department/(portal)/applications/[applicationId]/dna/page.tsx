'use client';
import { useParams, useRouter } from 'next/navigation';
import { M07DnaPage } from '@/App';
import { ApplicationId } from '@/domain/ids';
import { ROUTES } from '@/lib/routes';
export default function Page() { const appId = (useParams().applicationId as string) as ApplicationId; const router = useRouter(); return <M07DnaPage onBackToOverview={() => router.push(ROUTES.department.application(appId))} />; }
