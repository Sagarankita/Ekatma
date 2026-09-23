'use client';

import { M04SearchPage } from '@/App';
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ROUTES } from '@/lib/routes';

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';
  return <M04SearchPage key={query} initialQuery={query} onOpenApp={applicationId => router.push(ROUTES.department.application(applicationId))} />;
}

export default function SearchPage() {
  return <Suspense fallback={null}><SearchContent /></Suspense>;
}
