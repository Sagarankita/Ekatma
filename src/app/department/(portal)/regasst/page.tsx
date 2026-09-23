'use client';

import { useRouter } from 'next/navigation';
import { M32RegRAGPage } from '@/App';
import { ROUTES } from '@/lib/routes';

export default function Page() {
  const router = useRouter();
  
  return (
    <M32RegRAGPage 
      
      onBack={() => router.push(ROUTES.department.home)}
      onOpenRegChange={() => router.push(ROUTES.department.regChanges)}
    
    />
  );
}
