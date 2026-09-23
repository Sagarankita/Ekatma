'use client';

import { useRouter } from 'next/navigation';
import { M30SLADashboard } from '@/App';
import { ROUTES } from '@/lib/routes';

export default function Page() {
  const router = useRouter();
  
  return (
    <M30SLADashboard 
      
      onOpenApp={appId => router.push(ROUTES.department.application(appId))}
      onOpenGrievance={() => router.push(ROUTES.department.grievances)}
    
    />
  );
}
