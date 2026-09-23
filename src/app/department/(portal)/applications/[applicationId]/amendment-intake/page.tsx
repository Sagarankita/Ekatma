'use client';

import { useParams, useRouter } from 'next/navigation';
import { M29AmendmentIntakePage } from '@/App';
import { ApplicationId, createApplicationId, createDecisionId, createDependencyNodeId, createComplianceId } from '@/domain/ids';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  
  const appId = createApplicationId((params.applicationId as string) || 'unknown');
  
  
  return (
    <M29AmendmentIntakePage 
      
      onBack={() => router.push(`/department/applications/${appId}`)}
      onOpenM28={() => router.push(`/department/applications/${appId}/compliance/default`)}
      onOpenM26={() => router.push(`/department/applications/${appId}/decisions/default`)}
      onOpenDocReview={() => router.push(`/department/applications/${appId}/document/default`)}
      onOpenConsistency={() => router.push(`/department/applications/${appId}/consistency`)}
      onOpenDepView={() => router.push(`/department/applications/${appId}/dependency-view`)}
      onOpenDelta={() => router.push(`/department/applications/${appId}/delta-rescrutiny`)}
      onOpenInspection={() => router.push(`/department/applications/${appId}/inspections/default/workspace`)}
      onOpenDna={() => router.push(`/department/applications/${appId}/dna`)}
    
    />
  );
}
