'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { M32RegRAGPage } from '@/App';
import { ROUTES } from '@/lib/routes';
import { getApplicationContext } from '@/data/fixtures/application-contexts';

function RegulatoryAssistantContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const application = getApplicationContext(searchParams.get('applicationId') ?? '');
  
  return (
    <M32RegRAGPage 
      
      onBack={() => router.push(ROUTES.department.home)}
      onOpenRegChange={() => router.push(ROUTES.department.regChanges)}
      applicationContext={application}
    
    />
  );
}

export default function Page() { return <Suspense fallback={null}><RegulatoryAssistantContent /></Suspense>; }
