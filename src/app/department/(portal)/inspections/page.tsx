'use client';

import { useRouter } from 'next/navigation';
import { M21InspectionQueuePage } from '@/App';

export default function InspectionsPage() {
  const router = useRouter();

  return (
    <M21InspectionQueuePage 
      onBack={() => router.push('/department')}
      onPlanInspection={(appId, inspId) => router.push(`/department/applications/${appId}/inspections/${inspId}/plan`)}
      onOpenDepView={() => console.log('Open dep view')}
      onOpenQueryHistory={() => console.log('Open query history')}
      onOpenDelta={() => console.log('Open delta')}
    />
  );
}
