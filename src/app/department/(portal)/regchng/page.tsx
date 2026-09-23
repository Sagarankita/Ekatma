'use client';

import { useRouter } from 'next/navigation';
import { M33RegChangePage } from '@/App';

export default function Page() {
  const router = useRouter();
  
  return (
    <M33RegChangePage 
      
      onBack={() => router.push('/department')}
      onOpenRAG={() => router.push('/department/regasst')}
      onOpenImpact={() => router.push('/department/regchng/impact')}
    
    />
  );
}
