'use client';

import { M03QueuePage } from '@/App';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';

export default function QueuePage() {
  const router = useRouter();
  return <M03QueuePage onOpenApp={applicationId => router.push(ROUTES.department.application(applicationId))} />;
}
