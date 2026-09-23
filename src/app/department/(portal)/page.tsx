'use client';

import { DeptHome } from '@/App';
import { useRouter } from 'next/navigation';
import { ROUTES, DEPARTMENT_DESTINATIONS } from '@/lib/routes';

export default function PortalHomePage() {
  const router = useRouter();

  return (
    <DeptHome 
      onNavigate={dest => {
        const route = DEPARTMENT_DESTINATIONS[dest];
        if (route) router.push(route);
      }}
      onOpenApp={applicationId => router.push(ROUTES.department.application(applicationId))}
    />
  );
}
