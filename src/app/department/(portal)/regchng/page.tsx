'use client';

import { useRouter } from 'next/navigation';
import { M33RegChangePage } from '@/App';
import { ROUTES } from '@/lib/routes';

export default function Page() {
  const router = useRouter();
  
  return (
    <M33RegChangePage 
      
      onBack={() => router.push(ROUTES.department.home)}
      onOpenRAG={() => router.push(ROUTES.department.regAssistant)}
      onOpenImpact={() => router.push(ROUTES.department.regImpact)}
    
    />
  );
}
