'use client';

import { useRouter } from 'next/navigation';
import { M38AuditPage } from '@/App';

export default function Page() {
  const router = useRouter();
  
  return (
    <M38AuditPage 
      
      onBack={() => router.push('/department')}
      onOpenApp={() => router.push('/department/applications/default')}
    
    />
  );
}
