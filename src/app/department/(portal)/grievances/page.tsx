'use client';

import { useRouter } from 'next/navigation';
import { M31GrievancePage } from '@/App';
import { ROUTES } from '@/lib/routes';

export default function Page() {
  const router = useRouter();
  
  return (
    <M31GrievancePage 
      
      onBack={() => router.push(ROUTES.department.home)}
      onOpenApp={appId => router.push(ROUTES.department.application(appId))}
      onOpenSLA={() => router.push(ROUTES.department.sla)}
      onOpenQuery={appId => router.push(ROUTES.department.applicationQueryHistory(appId))}
      onOpenInspection={(appId, inspectionId) => router.push(ROUTES.department.inspectionPlan(appId, inspectionId))}
    
    />
  );
}
