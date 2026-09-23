'use client';

import { useRouter } from 'next/navigation';
import { M30SLADashboard } from '@/App';

export default function Page() {
  const router = useRouter();
  
  return (
    <M30SLADashboard 
      
      onOpenApp={() => router.push('/department/applications/default')}
      onOpenGrievance={() => router.push('/department/grievances')}
    
    />
  );
}
