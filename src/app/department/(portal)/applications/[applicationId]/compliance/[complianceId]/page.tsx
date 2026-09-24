'use client';

import { useParams, useRouter } from 'next/navigation';
import { M28CompliancePage } from '@/App';
import { ApplicationId, createApplicationId, createDecisionId, createDependencyNodeId, createComplianceId } from '@/domain/ids';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  
  const appId = createApplicationId((params.applicationId as string) || 'unknown');
  const complianceId = createComplianceId((params.complianceId as string) || 'unknown');
  
  return (
    <M28CompliancePage 
      
      onBack={() => router.push(`/department/applications/${appId}`)}
      onOpenM26={(id: string) => router.push(`/department/applications/${appId}/decisions/${id}`)}
      onOpenM27={(id: string) => router.push(`/department/applications/${appId}/dependencies/${id}/update`)}
      onOpenM29={() => router.push(`/department/applications/${appId}/amendment-intake`)}
      onOpenInspection={(id: string) => router.push(`/department/applications/${appId}/inspections/${id}/workspace`)}
      onOpenDepView={() => router.push(`/department/applications/${appId}/dependency-view`)}
      onOpenDocReview={(id: string) => router.push(`/department/applications/${appId}/document/${id}`)}
    
    />
  );
}
