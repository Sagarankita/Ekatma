'use client';

import { useRouter } from 'next/navigation';
import { M35AnalyticsPage } from '@/App';
import { ROUTES } from '@/lib/routes';

export default function Page() {
  const router = useRouter();
  
  return (
    <M35AnalyticsPage 
      
      onBack={() => router.push(ROUTES.department.home)}
      onOpenSLA={() => router.push(ROUTES.department.sla)}
      onOpenInspection={() => router.push(ROUTES.department.inspectionQueue)}
      onOpenBottleneck={() => router.push(ROUTES.department.bottleneck)}
    
    />
  );
}
