'use client';

import { M03QueuePage } from '@/App';
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ROUTES } from '@/lib/routes';

function QueueContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  return <M03QueuePage initialService={searchParams.get('service') ?? undefined} initialStatus={searchParams.get('status') ?? 'all'} onOpenApp={applicationId => router.push(ROUTES.department.applicationTab(applicationId, 'overview', 'queue'))} />;
}

export default function QueuePage() {
  return <Suspense fallback={null}><QueueContent /></Suspense>;
}
