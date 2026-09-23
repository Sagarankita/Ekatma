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
      onOpenM26={() => router.push(`/department/applications/${appId}/decisions/default`)}
      onOpenM27={() => router.push(`/department/applications/${appId}/dependencies/default/update`)}
      onOpenM29={() => router.push(`/department/applications/${appId}/amendment-intake`)}
      onOpenInspection={() => router.push(`/department/applications/${appId}/inspections/default/workspace`)}
      onOpenDepView={() => router.push(`/department/applications/${appId}/dependency-view`)}
      onOpenDocReview={() => router.push(`/department/applications/${appId}/document/default`)}
    
    />
  );
}
