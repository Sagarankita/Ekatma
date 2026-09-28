'use client';

import { M01LoginPage } from '@/App';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  return (
    <M01LoginPage 
      onSuccess={() => { localStorage.setItem('dept_auth', 'true'); router.push('/department'); }} 
      onBack={() => router.push('/')}
      lang="en"
      fontSize="md"
      highContrast={false}
    />
  );
}
