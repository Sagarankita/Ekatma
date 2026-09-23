'use client';

import { useRouter } from 'next/navigation';
import { M34ImpactPage } from '@/App';
import { ROUTES } from '@/lib/routes';

export default function Page() {
  const router = useRouter();
  
  return (
    <M34ImpactPage 
      
      onBack={() => router.push(ROUTES.department.regChanges)}
      onOpenApp={appId => router.push(ROUTES.department.application(appId))}
      onOpenRegChange={() => router.push(ROUTES.department.regChanges)}
    
    />
  );
}
