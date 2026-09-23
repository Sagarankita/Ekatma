'use client';

import { useRouter } from 'next/navigation';
import { M36BottleneckPage } from '@/App';
import { ROUTES } from '@/lib/routes';

export default function Page() {
  const router = useRouter();
  
  return (
    <M36BottleneckPage 
      
      onBack={() => router.push(ROUTES.department.home)}
      onOpenSLA={() => router.push(ROUTES.department.sla)}
      onOpenInspection={() => router.push(ROUTES.department.inspectionQueue)}
      onOpenAnalytics={() => router.push(ROUTES.department.analytics)}
    
    />
  );
}
