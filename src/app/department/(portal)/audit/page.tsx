'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { M38AuditPage } from '@/App';
import { ROUTES } from '@/lib/routes';

function AuditContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const applicationId = searchParams.get('applicationId') || '';

  return (
    <M38AuditPage 
      onBack={() => router.push(ROUTES.department.home)}
      onOpenApp={appId => router.push(ROUTES.department.application(appId))}
      initialSearch={applicationId}
    />
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-[#4A4A4A]">Loading audit workspace...</div>}>
      <AuditContent />
    </Suspense>
  );
}

