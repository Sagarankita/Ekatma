'use client';

import { useRouter } from 'next/navigation';
import { M31GrievancePage } from '@/App';
import { ROUTES } from '@/lib/routes';

export default function Page() {
  const router = useRouter();
  
  return (
    <M31GrievancePage 
      
      onBack={() => router.push(ROUTES.department.home)}
      onOpenApp={appId => router.push(ROUTES.department.applicationTab(appId, 'overview', 'grievances'))}
      onOpenSLA={() => router.push(ROUTES.department.sla)}
      onOpenQuery={appId => router.push(ROUTES.department.applicationTab(appId, 'queries', 'grievances'))}
      onOpenInspection={(appId) => router.push(ROUTES.department.applicationTab(appId, 'inspections', 'grievances'))}
      onOpenRegAssistant={() => router.push(ROUTES.department.regAssistant)}
    
    />
  );
}
