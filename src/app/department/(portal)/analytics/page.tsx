'use client';

import { useRouter } from 'next/navigation';
import { M35AnalyticsPage } from '@/App';

export default function Page() {
  const router = useRouter();
  
  return (
    <M35AnalyticsPage 
      
      onBack={() => router.push('/department')}
      onOpenSLA={() => router.push('/department/sla')}
      onOpenInspection={() => router.push('/department/inspection-queue')}
      onOpenBottleneck={() => router.push('/department/bottleneck')}
    
    />
  );
}
