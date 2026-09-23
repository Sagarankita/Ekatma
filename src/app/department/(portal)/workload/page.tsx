'use client';

import { useRouter } from 'next/navigation';
import { M37WorkloadPage } from '@/App';

export default function Page() {
  const router = useRouter();
  
  return (
    <M37WorkloadPage 
      
      onBack={() => router.push('/department')}
      onOpenSLA={() => router.push('/department/sla')}
      onOpenInspection={() => router.push('/department/inspection-queue')}
      onOpenAnalytics={() => router.push('/department/analytics')}
    
    />
  );
}
