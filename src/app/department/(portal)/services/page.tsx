'use client';

import { M05ServicePage } from '@/App';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';

export default function ServicesPage() {
  const router = useRouter();
  return <M05ServicePage onOpenQueue={(service, status) => router.push(ROUTES.department.queueFilter(service, status))} />;
}
