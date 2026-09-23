'use client';

import { useRouter } from 'next/navigation';
import { M34ImpactPage } from '@/App';

export default function Page() {
  const router = useRouter();
  
  return (
    <M34ImpactPage 
      
      onBack={() => router.push('/department/regchng')}
      onOpenApp={() => router.push('/department/applications/default')}
      onOpenRegChange={() => router.push('/department/regchng')}
    
    />
  );
}
