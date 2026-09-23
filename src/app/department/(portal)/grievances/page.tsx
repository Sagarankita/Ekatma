'use client';

import { useRouter } from 'next/navigation';
import { M31GrievancePage } from '@/App';

export default function Page() {
  const router = useRouter();
  
  return (
    <M31GrievancePage 
      
      onBack={() => router.push('/department')}
      onOpenApp={() => router.push('/department/applications/default')}
      onOpenSLA={() => router.push('/department/sla')}
      onOpenQuery={() => router.push('/department/applications/default/query-history')}
      onOpenInspection={() => router.push('/department/inspection-queue')}
    
    />
  );
}
