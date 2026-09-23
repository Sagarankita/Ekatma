'use client';

import { useRouter } from 'next/navigation';
import { M37WorkloadPage } from '@/App';
import { ROUTES } from '@/lib/routes';

export default function Page() {
  const router = useRouter();
  
  return (
    <M37WorkloadPage 
      
      onBack={() => router.push(ROUTES.department.home)}
      onOpenSLA={() => router.push(ROUTES.department.sla)}
      onOpenInspection={() => router.push(ROUTES.department.inspectionQueue)}
      onOpenAnalytics={() => router.push(ROUTES.department.analytics)}
    
    />
  );
}
