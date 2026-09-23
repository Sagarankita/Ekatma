'use client';

import { useRouter } from 'next/navigation';
import { M38AuditPage } from '@/App';
import { ROUTES } from '@/lib/routes';

export default function Page() {
  const router = useRouter();
  
  return (
    <M38AuditPage 
      
      onBack={() => router.push(ROUTES.department.home)}
      onOpenApp={appId => router.push(ROUTES.department.application(appId))}
    
    />
  );
}
