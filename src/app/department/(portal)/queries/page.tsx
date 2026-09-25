'use client';
import { QueryWorklist } from '@/components/department/OperationalWorklists';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';

export default function QueriesPage() {
  const router = useRouter();
  
  return (
    <QueryWorklist 
      onOpen={(applicationId) => router.push(ROUTES.department.applicationQueryHistory(applicationId))}
      onOpenBuilder={(applicationId) => router.push(ROUTES.department.applicationQueryBuilder(applicationId))}
    />
  );
}
