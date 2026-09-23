'use client';

import { DeptHome } from '@/App';
import { useRouter } from 'next/navigation';

export default function PortalHomePage() {
  const router = useRouter();

  return (
    <DeptHome 
      onNavigate={(dest) => console.log('Navigate to:', dest)} 
      onOpenApp={() => console.log('Open app')} 
    />
  );
}
