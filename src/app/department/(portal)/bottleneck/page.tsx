'use client';

import { useRouter } from 'next/navigation';
import { M36BottleneckPage } from '@/App';

export default function Page() {
  const router = useRouter();
  
  return (
    <M36BottleneckPage 
      
      onBack={() => router.push('/department')}
      onOpenSLA={() => router.push('/department/sla')}
      onOpenInspection={() => router.push('/department/inspection-queue')}
      onOpenAnalytics={() => router.push('/department/analytics')}
    
    />
  );
}
