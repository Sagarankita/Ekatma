'use client';

import { useRouter } from 'next/navigation';
import { M32RegRAGPage } from '@/App';

export default function Page() {
  const router = useRouter();
  
  return (
    <M32RegRAGPage 
      
      onBack={() => router.push('/department')}
      onOpenRegChange={() => router.push('/department/regchng')}
    
    />
  );
}
